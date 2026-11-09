#!/usr/bin/env node
/**
 * Upload course videos from a local folder to Cloudflare R2.
 *
 * Usage:
 *   node scripts/r2-upload.mjs "$HOME/Desktop/cc-videos/ready" --dry-run
 *   node scripts/r2-upload.mjs "$HOME/Desktop/cc-videos/ready" --limit 3
 *   node scripts/r2-upload.mjs "$HOME/Desktop/cc-videos/ready"
 *
 * Local folder layout maps straight to the bucket key:
 *   ready/module-03/lesson-003.mp4 -> courses/content-creation/module-03/lesson-003.mp4
 *
 * Requires in .env.local: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
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

const args = process.argv.slice(2);
const sourceDir = args.find((arg) => !arg.startsWith("--"));
const dryRun = args.includes("--dry-run");
const limitIndex = args.indexOf("--limit");
const limit = limitIndex >= 0 ? Number(args[limitIndex + 1]) || 0 : 0;
const prefixArg = args.includes("--prefix") ? args[args.indexOf("--prefix") + 1] : undefined;

if (!sourceDir || !existsSync(sourceDir) || !statSync(sourceDir).isDirectory()) {
  console.error("Usage: node scripts/r2-upload.mjs <videos-folder> [--dry-run] [--limit N] [--prefix p]");
  process.exit(1);
}

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET_NAME;
const endpoint = process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);

if (!accessKeyId || !secretAccessKey || !bucket || !endpoint) {
  console.error("Missing R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME or R2_ACCOUNT_ID in .env.local");
  process.exit(1);
}

const prefix = (prefixArg || "courses/content-creation").replace(/^\/+|\/+$/g, "");
const extensions = new Set([".mp4", ".m4v", ".mov", ".webm"]);
const contentTypes = {
  ".mp4": "video/mp4",
  ".m4v": "video/x-m4v",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

const client = new S3Client({
  region: "auto",
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(full)));
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function existingSizes() {
  const sizes = new Map();
  let token;
  do {
    const page = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: `${prefix}/`, MaxKeys: 1000, ContinuationToken: token })
    );
    for (const object of page.Contents || []) sizes.set(object.Key, Number(object.Size));
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return sizes;
}

const files = (await collect(sourceDir))
  .filter((file) => !path.basename(file).includes(".partial."))
  .filter((file) => (Date.now() - statSync(file).mtimeMs) / 1000 >= 20)
  .sort();

const jobs = files.map((file) => ({
  file,
  key: `${prefix}/${path.relative(sourceDir, file).split(path.sep).join("/")}`,
}));

if (limit) jobs.splice(limit);

let uploaded = new Map();
try {
  uploaded = await existingSizes();
} catch (error) {
  console.error("Unable to list R2 bucket:", error.message || error);
  process.exit(1);
}

const pending = jobs.filter((job) => uploaded.get(job.key) !== statSync(job.file).size);
console.log(
  `Local: ${jobs.length} video(s). R2 already has ${jobs.length - pending.length}. Uploading ${pending.length} ` +
    `(${(pending.reduce((sum, job) => sum + statSync(job.file).size, 0) / (1024 * 1024)).toFixed(0)} MB).`
);

if (dryRun) {
  for (const job of pending.slice(0, 10)) console.log(`  would upload ${job.key}`);
  process.exit(0);
}

let index = 0;
let done = 0;
async function worker() {
  while (index < pending.length) {
    const job = pending[index++];
    const size = statSync(job.file).size;
    const started = Date.now();
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: job.key,
            Body: createReadStream(job.file),
            ContentLength: size,
            ContentType: contentTypes[path.extname(job.file).toLowerCase()] || "application/octet-stream",
            CacheControl: "private, max-age=0",
          })
        );
        ok = true;
        done++;
        const seconds = (Date.now() - started) / 1000;
        const rate = (size / (1024 * 1024) / seconds).toFixed(2);
        console.log(`[${done}/${pending.length}] ${job.key} (${(size / (1024 * 1024)).toFixed(1)} MB) ${seconds.toFixed(1)}s ${rate} MB/s`);
      } catch (error) {
        console.error(`Attempt ${attempt} failed ${job.key}:`, error.message || error);
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
      }
    }
    if (!ok) process.exitCode = 1;
  }
}

const workers = Math.min(8, Math.max(1, Number(process.env.R2_CONCURRENCY) || 4));
await Promise.all(Array.from({ length: workers }, () => worker()));
console.log(`\nUpload finished: ${done}/${pending.length}.`);
