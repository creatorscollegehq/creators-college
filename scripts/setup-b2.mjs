#!/usr/bin/env node
/**
 * Authorize with Backblaze B2, create the private video bucket if needed, and
 * write B2_BUCKET_NAME / B2_REGION / B2_ENDPOINT into .env.local.
 *
 * Requires B2_KEY_ID and B2_APPLICATION_KEY in .env.local (or the environment).
 * Usage: node scripts/setup-b2.mjs
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

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

function upsertEnv(updates) {
  const file = ".env.local";
  const lines = existsSync(file) ? readFileSync(file, "utf8").split(/\r?\n/) : [];
  for (const [key, value] of Object.entries(updates)) {
    const index = lines.findIndex((line) => line.startsWith(`${key}=`));
    const next = `${key}=${value}`;
    if (index >= 0) lines[index] = next;
    else lines.push(next);
  }
  writeFileSync(file, lines.join("\n"));
}

loadEnv();

const keyId = process.env.B2_KEY_ID;
const applicationKey = process.env.B2_APPLICATION_KEY;
const bucketName = process.env.B2_BUCKET_NAME || "creators-college-videos";

if (!keyId || !applicationKey) {
  console.error("Set B2_KEY_ID and B2_APPLICATION_KEY in .env.local first.");
  process.exit(1);
}

const basic = Buffer.from(`${keyId}:${applicationKey}`).toString("base64");
const authResponse = await fetch("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
  headers: { Authorization: `Basic ${basic}` },
});

if (!authResponse.ok) {
  const body = await authResponse.text();
  console.error(`B2 authorization failed (${authResponse.status}): ${body.slice(0, 300)}`);
  process.exit(1);
}

const auth = await authResponse.json();
const storage = auth.apiInfo?.storageApi ?? auth;
const apiUrl = storage.apiUrl;
const s3ApiUrl = storage.s3ApiUrl;
const accountId = auth.accountId || storage.accountId || keyId;

if (!apiUrl || !s3ApiUrl) {
  console.error("B2 response did not include apiUrl/s3ApiUrl. Check the application key.");
  process.exit(1);
}

const region = new URL(s3ApiUrl).hostname.replace(/^s3\./, "").replace(/\.backblazeb2\.com$/, "");
const endpoint = s3ApiUrl.replace(/\/+$/, "");
const headers = { Authorization: auth.authorizationToken };

const listResponse = await fetch(`${apiUrl}/b2api/v3/b2_list_buckets`, {
  method: "POST",
  headers: { ...headers, "Content-Type": "application/json" },
  body: JSON.stringify({ accountId, bucketName }),
});
if (!listResponse.ok) {
  console.error(`Unable to list buckets (${listResponse.status}): ${(await listResponse.text()).slice(0, 300)}`);
  process.exit(1);
}

const listed = await listResponse.json();
let bucket = (listed.buckets || []).find((item) => item.bucketName === bucketName);

if (!bucket) {
  const createResponse = await fetch(`${apiUrl}/b2api/v3/b2_create_bucket`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, bucketName, bucketType: "allPrivate" }),
  });
  if (!createResponse.ok) {
    console.error(`Unable to create bucket (${createResponse.status}): ${(await createResponse.text()).slice(0, 300)}`);
    process.exit(1);
  }
  bucket = await createResponse.json();
  console.log(`Created private bucket "${bucket.bucketName}".`);
}

upsertEnv({ B2_BUCKET_NAME: bucket.bucketName, B2_REGION: region, B2_ENDPOINT: endpoint });
console.log(`Bucket: ${bucket.bucketName} (${bucket.bucketType})`);
console.log(`Region: ${region}`);
console.log(`Endpoint: ${endpoint}`);

// The master application key cannot be used with the S3-compatible API, so
// create a bucket-scoped key for uploads and signed playback.
const keyResponse = await fetch(`${apiUrl}/b2api/v3/b2_create_key`, {
  method: "POST",
  headers: { ...headers, "Content-Type": "application/json" },
  body: JSON.stringify({
    accountId,
    bucketId: bucket.bucketId,
    capabilities: ["listBuckets", "listFiles", "readFiles", "writeFiles", "deleteFiles"],
    keyName: `s3-${bucket.bucketName}`,
  }),
});

if (!keyResponse.ok) {
  console.error(`Unable to create S3 key (${keyResponse.status}): ${(await keyResponse.text()).slice(0, 300)}`);
  console.error("If you are re-running with an already-scoped key, S3 credentials are already in .env.local.");
  process.exit(1);
}

const createdKey = await keyResponse.json();
upsertEnv({ B2_KEY_ID: createdKey.applicationKeyId, B2_APPLICATION_KEY: createdKey.applicationKey });
console.log(`Created bucket-scoped S3 key "${createdKey.keyName}".`);
console.log("Saved B2_KEY_ID and B2_APPLICATION_KEY (scoped S3 key) to .env.local.");
