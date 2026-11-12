#!/usr/bin/env node
/**
 * Upload course videos to the private Cloudflare R2 bucket.
 *
 * Arrange files like this before running:
 *   videos/module-01/lesson-01.mp4
 *   videos/module-01/lesson-02.mp4
 *   videos/module-02/lesson-01.mp4
 *
 * Then:
 *   node scripts/upload-course-videos.mjs videos
 *   node scripts/upload-course-videos.mjs videos --dry-run
 *
 * Keys become courses/content-creation/<relative path>. Override the prefix
 * with R2_VIDEO_PREFIX if needed. Nothing is made public; the app serves
 * short-lived signed URLs only.
 *
 * Requires in .env.local:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 *   (optional R2_ENDPOINT)
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match || line.trim().startsWith("#")) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (process.env[match[1]] === undefined) process.env[match[1]] = value;
    }
  }
}

loadEnv();

const sourceDir = process.argv[2];
const dryRun = process.argv.includes("--dry-run");

if (!sourceDir || !existsSync(sourceDir) || !statSync(sourceDir).isDirectory()) {
  console.error("Usage: node scripts/upload-course-videos.mjs <videos-folder> [--dry-run]");
  process.exit(1);
}

const keyId = process.env.R2_ACCESS_KEY_ID;
const applicationKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET_NAME;
const accountId = process.env.R2_ACCOUNT_ID;
const endpoint = process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);

if (!dryRun && (!keyId || !applicationKey || !bucket || !endpoint)) {
  console.error("Missing R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME or R2_ACCOUNT_ID in .env.local");
  process.exit(1);
}

const prefix = (process.env.R2_VIDEO_PREFIX || "courses/content-creation").replace(/^\/+|\/+$/g, "");
const extensions = new Set([".mp4", ".m4v", ".mov", ".webm"]);
const contentTypes = {
  ".mp4": "video/mp4",
  ".m4v": "video/x-m4v",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

const client = dryRun
  ? null
  : new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId: keyId, secretAccessKey: applicationKey },
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    });

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(full)));
    } else if (extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function uploadOne(file, key) {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: createReadStream(file),
      ContentLength: statSync(file).size,
      ContentType: contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
      CacheControl: "private, max-age=0",
    })
  );
}

const files = (await collect(sourceDir))
  .filter((file) => !path.basename(file).includes(".partial."))
  .filter((file) => {
    const ageSeconds = (Date.now() - statSync(file).mtimeMs) / 1000;
    if (ageSeconds < 30) {
      console.log(`Skipping ${path.relative(sourceDir, file)} (still encoding)`);
      return false;
    }
    return true;
  })
  .sort();

if (!files.length) {
  console.log("No stable video files to upload right now.");
  process.exit(0);
}

const jobs = files.map((file) => ({
  file,
  key: `${prefix}/${path.relative(sourceDir, file).split(path.sep).join("/")}`,
}));

// B2 keeps every upload as a new version, so re-sending an identical file quietly
// duplicates storage. One list call tells us what is already there; HeadObject would
// cost one Class B transaction per file and can be blocked by the daily cap.
async function existingSizes() {
  const sizes = new Map();
  let token;
  do {
    const page = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: `${prefix}/`,
        MaxKeys: 1000,
        ContinuationToken: token,
      })
    );
    for (const object of page.Contents || []) sizes.set(object.Key, Number(object.Size));
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return sizes;
}

let uploaded = new Map();
if (!dryRun) {
  try {
    uploaded = await existingSizes();
  } catch (error) {
    console.error("Unable to list bucket contents:", error.message || error);
    console.error("Skipping this pass rather than risk duplicate uploads.");
    process.exit(1);
  }
}

const pending = jobs.filter((job) => uploaded.get(job.key) !== statSync(job.file).size);
const alreadyUploaded = jobs.length - pending.length;

if (!pending.length) {
  console.log(`All ${jobs.length} video(s) already in bucket "${bucket}" — nothing to upload.`);
  process.exit(0);
}

console.log(
  `${dryRun ? "Would upload" : "Uploading"} ${pending.length} video(s) to bucket "${bucket || "(dry run)"}"` +
    (alreadyUploaded ? ` (skipping ${alreadyUploaded} already uploaded):` : ":")
);
for (const job of pending) {
  console.log(`  ${job.key}  (${(statSync(job.file).size / (1024 * 1024)).toFixed(1)} MB)`);
}

if (dryRun) {
  console.log("\nDry run only. Re-run without --dry-run to upload.");
  process.exit(0);
}

let index = 0;
async function worker() {
  while (index < pending.length) {
    const job = pending[index++];
    const started = Date.now();
    let sent = false;
    for (let attempt = 1; attempt <= 3 && !sent; attempt++) {
      try {
        await uploadOne(job.file, job.key);
        sent = true;
      } catch (error) {
        console.error(
          `Attempt ${attempt} failed ${job.key}:`,
          error.message || error
        );
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 5000 * attempt));
      }
    }
    if (sent) {
      console.log(`Done ${job.key} in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    } else {
      process.exitCode = 1;
    }
  }
}

await Promise.all([worker(), worker(), worker()]);
console.log("Upload finished.");
