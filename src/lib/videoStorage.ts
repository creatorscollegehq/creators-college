import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface VideoStorageConfig {
  provider: "r2" | "b2";
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region: string;
  endpoint: string;
}

const clients = new Map<string, S3Client>();

function r2Config(): VideoStorageConfig | null {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !bucket) return null;

  const accountId = process.env.R2_ACCOUNT_ID;
  const endpoint =
    process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);
  if (!endpoint) return null;

  return { provider: "r2", accessKeyId, secretAccessKey, bucket, region: "auto", endpoint };
}

function b2Config(): VideoStorageConfig | null {
  const accessKeyId = process.env.B2_KEY_ID;
  const secretAccessKey = process.env.B2_APPLICATION_KEY;
  const bucket = process.env.B2_BUCKET_NAME;
  const region = process.env.B2_REGION;
  if (!accessKeyId || !secretAccessKey || !bucket || !region) return null;

  return {
    provider: "b2",
    accessKeyId,
    secretAccessKey,
    bucket,
    region,
    endpoint: process.env.B2_ENDPOINT || `https://s3.${region}.backblazeb2.com`,
  };
}

/** R2 first (cheap egress), B2 kept as a fallback so playback never breaks mid-migration. */
function videoStorageConfigs(): VideoStorageConfig[] {
  return [r2Config(), b2Config()].filter((config): config is VideoStorageConfig => Boolean(config));
}

export function isVideoStorageConfigured() {
  return videoStorageConfigs().length > 0;
}

function getClient(config: VideoStorageConfig) {
  const cacheKey = `${config.provider}:${config.endpoint}:${config.bucket}`;
  const cached = clients.get(cacheKey);
  if (cached) return cached;

  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
  clients.set(cacheKey, client);
  return client;
}

export async function getSignedVideoUrl(key: string): Promise<string | null> {
  const configs = videoStorageConfigs();
  if (!configs.length) return null;

  for (const config of configs) {
    try {
      const command = new GetObjectCommand({ Bucket: config.bucket, Key: key });
      return await getSignedUrl(getClient(config), command, { expiresIn: 60 * 60 * 6 });
    } catch (error) {
      console.error(`Unable to sign video URL from ${config.provider}:`, error);
    }
  }

  return null;
}
