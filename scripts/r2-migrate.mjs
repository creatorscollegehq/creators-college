#!/usr/bin/env node
/**
 * Copy course videos from Backblaze B2 to Cloudflare R2 (server to server).
 *
 * Keys stay exactly the same, so playback code does not change:
 *   courses/content-creation/module-01/lesson-001.mp4
 *
 * Usage:
 *   node scripts/r2-migrate.mjs --dry-run
 *   node scripts/r2-migrate.mjs
 *
 * Requires in .env.local:
 *   B2_KEY_ID, B2_APPLICATION_KEY, B2_BUCKET_NAME, B2_REGION [, B2_ENDPOINT]
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

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

const dryRun = process.argv.includes("--dry-run");
const concurrency = Math.min(12, Math.max(1, Number(process.env.COPY_CONCURRENCY) || 3));
const prefix = (process.env.B2_VIDEO_PREFIX || "courses/content-creation").replace(/^\/+|\/+$/g, "");

const contentTypes = {
  ".mp4": "video/mp4",
  ".m4v": "video/x-m4v",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

const b2KeyId = process.env.B2_KEY_ID;
const b2AppKey = process.env.B2_APPLICATION_KEY;
const b2Bucket = process.env.B2_BUCKET_NAME;
const b2Region = process.env.B2_REGION;
const b2Endpoint = process.env.B2_ENDPOINT || (b2Region ? `https://s3.${b2Region}.backblazeb2.com` : undefined);

const r2Account = process.env.R2_ACCOUNT_ID;
const r2KeyId = process.env.R2_ACCESS_KEY_ID;
const r2Secret = process.env.R2_SECRET_ACCESS_KEY;
const r2Bucket = process.env.R2_BUCKET_NAME;
const r2Endpoint = process.env.R2_ENDPOINT || (r2Account ? `https://${r2Account}.r2.cloudflarestorage.com` : undefined);

for (const [name, value] of Object.entries({
  B2_KEY_ID: b2KeyId,
  B2_APPLICATION_KEY: b2AppKey,
  B2_BUCKET_NAME: b2Bucket,
  R2_ACCESS_KEY_ID: r2KeyId,
  R2_SECRET_ACCESS_KEY: r2Secret,
  R2_BUCKET_NAME: r2Bucket,
})) {
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
}

function makeClient(endpoint, region, accessKeyId, secretAccessKey) {
  return new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

const source = makeClient(b2Endpoint, b2Region || "us-east-005", b2KeyId, b2AppKey);
const target = makeClient(r2Endpoint, "auto", r2KeyId, r2Secret);

async function listAll(client, bucket) {
  const objects = [];
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
    for (const object of page.Contents || []) {
      objects.push({ key: object.Key, size: Number(object.Size) });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return objects;
}

async function streamBody(body) {
  if (!body) return Buffer.alloc(0);
  if (typeof body.transformToByteArray === "function") {
    return Buffer.from(await body.transformToByteArray());
  }
  const chunks = [];
  for await (const chunk of body) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

const sourceObjects = (await listAll(source, b2Bucket))
  .filter((object) => object.key && !object.key.endsWith("/"))
  .sort((a, b) => a.key.localeCompare(b.key));

const targetSizes = new Map();
try {
  for (const object of await listAll(target, r2Bucket)) targetSizes.set(object.key, object.size);
} catch (error) {
  console.error("Unable to list the R2 bucket:", error.message || error);
  process.exit(1);
}

const totalBytes = sourceObjects.reduce((sum, object) => sum + object.size, 0);
const pending = sourceObjects.filter((object) => targetSizes.get(object.key) !== object.size);

console.log(
  `B2: ${sourceObjects.length} object(s), ${(totalBytes / (1024 * 1024 * 1024)).toFixed(2)} GB ` +
    `in bucket "${b2Bucket}" under ${prefix}/`
);
console.log(
  `R2: ${targetSizes.size} object(s) in bucket "${r2Bucket}" — ` +
    `${pending.length} file(s) to copy (${(
      pending.reduce((sum, object) => sum + object.size, 0) /
      (1024 * 1024)
    ).toFixed(0)} MB).`
);

if (dryRun) {
  for (const object of pending.slice(0, 20)) {
    console.log(`  would copy ${object.key} (${(object.size / (1024 * 1024)).toFixed(1)} MB)`);
  }
  if (pending.length > 20) console.log(`  ...and ${pending.length - 20} more`);
  console.log("\nDry run only. Re-run without --dry-run to copy.");
  process.exit(0);
}

if (!pending.length) {
  console.log("Everything is already on R2 — nothing to copy.");
  process.exit(0);
}

let index = 0;
let copied = 0;
async function worker() {
  while (index < pending.length) {
    const object = pending[index++];
    const started = Date.now();
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        const result = await source.send(new GetObjectCommand({ Bucket: b2Bucket, Key: object.key }));
        const body = await streamBody(result.Body);
        await target.send(
          new PutObjectCommand({
            Bucket: r2Bucket,
            Key: object.key,
            Body: body,
            ContentLength: body.length,
            ContentType: contentTypes[path.extname(object.key).toLowerCase()] || "application/octet-stream",
            CacheControl: "private, max-age=0",
            Metadata: { migratedFrom: "b2" },
          })
        );
        copied++;
        done = true;
        console.log(
          `[${copied}/${pending.length}] ${object.key} (${(body.length / (1024 * 1024)).toFixed(1)} MB) ` +
            `${((Date.now() - started) / 1000).toFixed(1)}s`
        );
      } catch (error) {
        console.error(`Attempt ${attempt} failed ${object.key}:`, error.message || error);
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        else process.exitCode = 1;
      }
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
console.log(`\nCopy finished: ${copied}/${pending.length} file(s) moved to R2.`);
