import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface VideoStorageConfig {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  endpoint: string;
}

let client: S3Client | null = null;
const existenceCache = new Map<string, { exists: boolean; expiresAt: number }>();

function r2Config(): VideoStorageConfig | null {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !bucket) return null;

  const accountId = process.env.R2_ACCOUNT_ID;
  const endpoint =
    process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);
  if (!endpoint) return null;

  return { accessKeyId, secretAccessKey, bucket, endpoint };
}

export function isVideoStorageConfigured() {
  return Boolean(r2Config());
}

function getClient(config: VideoStorageConfig) {
  if (client) return client;
  client = new S3Client({
    region: "auto",
    endpoint: config.endpoint,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
  return client;
}

export async function getSignedVideoUrl(key: string): Promise<string | null> {
  const config = r2Config();
  if (!config) return null;

  const cacheKey = `${config.bucket}:${key}`;
  const cached = existenceCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    if (!cached.exists) return null;
  } else {
    try {
      await getClient(config).send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }));
      existenceCache.set(cacheKey, { exists: true, expiresAt: Date.now() + 60 * 60 * 1000 });
    } catch (error) {
      const status = (error as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
      if (status !== 404) {
        console.error("Unable to check video on R2:", error);
      }
      existenceCache.set(cacheKey, { exists: false, expiresAt: Date.now() + 5 * 60 * 1000 });
      return null;
    }
  }

  try {
    const command = new GetObjectCommand({ Bucket: config.bucket, Key: key });
    return await getSignedUrl(getClient(config), command, { expiresIn: 60 * 60 * 6 });
  } catch (error) {
    console.error("Unable to sign video URL from R2:", error);
    return null;
  }
}
