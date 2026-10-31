#!/usr/bin/env node
/**
 * Upload course videos to the private Backblaze B2 bucket.
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
 * with B2_VIDEO_PREFIX if needed. Nothing is made public; the app serves
 * short-lived signed URLs only.
 *
 * Requires in .env.local:
 *   B2_KEY_ID, B2_APPLICATION_KEY, B2_BUCKET_NAME, B2_REGION
 *   (optional B2_ENDPOINT if the region endpoint differs)
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

const keyId = process.env.B2_KEY_ID;
const applicationKey = process.env.B2_APPLICATION_KEY;
const bucket = process.env.B2_BUCKET_NAME;
const region = process.env.B2_REGION;

if (!dryRun && (!keyId || !applicationKey || !bucket || !region)) {
  console.error("Missing B2_KEY_ID, B2_APPLICATION_KEY, B2_BUCKET_NAME or B2_REGION in .env.local");
  process.exit(1);
}

const endpoint = process.env.B2_ENDPOINT || `https://s3.${region}.backblazeb2.com`;
const prefix = (process.env.B2_VIDEO_PREFIX || "courses/content-creation").replace(/^\/+|\/+$/g, "");
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
      region,
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

const files = (await collect(sourceDir)).sort();

if (!files.length) {
  console.error("No video files found. Use .mp4/.m4v/.mov/.webm files inside module folders.");
  process.exit(1);
}

const jobs = files.map((file) => ({
  file,
  key: `${prefix}/${path.relative(sourceDir, file).split(path.sep).join("/")}`,
}));

console.log(`${dryRun ? "Would upload" : "Uploading"} ${jobs.length} video(s) to bucket "${bucket || "(dry run)"}":`);
for (const job of jobs) console.log(`  ${job.key}  (${(statSync(job.file).size / (1024 * 1024)).toFixed(1)} MB)`);

if (dryRun) {
  console.log("\nDry run only. Re-run without --dry-run to upload.");
  process.exit(0);
}

let index = 0;
async function worker() {
  while (index < jobs.length) {
    const job = jobs[index++];
    const started = Date.now();
    try {
      await uploadOne(job.file, job.key);
      console.log(`Done ${job.key} in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    } catch (error) {
      console.error(`Failed ${job.key}:`, error.message || error);
      process.exitCode = 1;
    }
  }
}

await Promise.all([worker(), worker(), worker()]);
console.log("Upload finished.");
