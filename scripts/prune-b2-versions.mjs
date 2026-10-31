#!/usr/bin/env node
/**
 * Remove superseded versions of every file in the B2 bucket.
 *
 * B2 keeps every upload as a new version, so re-uploading an unchanged video
 * quietly duplicates storage until the account's free cap is hit. This keeps the
 * newest version of each key and deletes the rest.
 *
 *   node scripts/prune-b2-versions.mjs            # report only
 *   node scripts/prune-b2-versions.mjs --apply    # delete superseded versions
 *
 * Uses the native B2 API (the S3 API has no version listing). Needs B2_KEY_ID
 * and B2_APPLICATION_KEY with listFiles + deleteFiles in .env.local.
 */
import { existsSync, readFileSync } from "node:fs";

for (const file of [".env.local", ".env"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || line.trim().startsWith("#")) continue;
    const value = match[2].replace(/^["']|["']$/g, "");
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

const bucketName = process.env.B2_BUCKET_NAME;
const keyId = process.env.B2_KEY_ID;
const applicationKey = process.env.B2_APPLICATION_KEY;
const apply = process.argv.includes("--apply");

if (!bucketName || !keyId || !applicationKey) {
  console.error("Missing B2_BUCKET_NAME, B2_KEY_ID or B2_APPLICATION_KEY in .env.local");
  process.exit(1);
}

const authResponse = await fetch("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
  headers: {
    Authorization: `Basic ${Buffer.from(`${keyId}:${applicationKey}`).toString("base64")}`,
  },
});
if (!authResponse.ok) {
  console.error("authorize failed:", authResponse.status, JSON.stringify(await authResponse.text()));
  process.exit(1);
}
const auth = await authResponse.json();
const storage = auth.apiInfo?.storageApi ?? auth;
const api = storage.apiUrl.replace(/\/$/, "");
const account = auth.accountId;
const token = auth.authorizationToken;

async function call(endpoint, body) {
  const response = await fetch(`${api}/b2api/v3/${endpoint}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(`${endpoint}: ${payload?.code ?? response.status} ${payload?.message ?? ""}`);
    error.code = payload?.code;
    throw error;
  }
  return payload;
}

const buckets = await call("b2_list_buckets", { accountId: account, bucketName });
const bucket = buckets.buckets?.find((item) => item.bucketName === bucketName);
if (!bucket) {
  console.error(`Bucket "${bucketName}" not found for this key.`);
  process.exit(1);
}

const versions = [];
let nextFileName;
let nextFileId;
do {
  const page = await call("b2_list_file_versions", {
    bucketId: bucket.bucketId,
    maxFileCount: 1000,
    startFileName: nextFileName,
    startFileId: nextFileId,
  });
  versions.push(...(page.files || []));
  nextFileName = page.nextFileName;
  nextFileId = page.nextFileId;
} while (nextFileName);

const keep = new Map();
for (const version of versions) {
  if (version.action !== "upload") continue;
  const current = keep.get(version.fileName);
  if (!current || Number(version.uploadTimestamp) > Number(current.uploadTimestamp)) {
    keep.set(version.fileName, version);
  }
}
const stale = versions.filter((version) => keep.get(version.fileName) !== version);

const wasted = stale.reduce((total, version) => total + Number(version.contentLength || 0), 0);
console.log(`Bucket ${bucketName}: ${versions.length} version(s) across ${keep.size} file(s).`);
console.log(
  `${stale.length} superseded version(s) using ${(wasted / 1024 ** 3).toFixed(2)} GB ` +
    `(current files alone: ${(versions.filter((v) => keep.get(v.fileName) === v).reduce((t, v) => t + Number(v.contentLength || 0), 0) / 1024 ** 3).toFixed(2)} GB).`
);

const orphans = stale.filter((version) => !keep.has(version.fileName));
if (orphans.length) {
  console.log(`${orphans.length} of those are the only copy of a key that was later hidden:`);
  for (const version of orphans.slice(0, 10)) console.log(`  ${version.fileName} (${version.action})`);
}

if (!apply) {
  console.log("\nReport only. Re-run with --apply to delete superseded versions.");
  process.exit(0);
}

let deleted = 0;
for (const version of stale) {
  try {
    await call("b2_delete_file_version", {
      fileName: version.fileName,
      fileId: version.fileId,
    });
    deleted += 1;
    if (deleted % 50 === 0) console.log(`deleted ${deleted}/${stale.length}`);
  } catch (error) {
    console.error(`Failed ${version.fileName}: ${error.message}`);
    process.exitCode = 1;
    break;
  }
}
console.log(`Deleted ${deleted} superseded version(s).`);
