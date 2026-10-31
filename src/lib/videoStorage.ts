import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let client: S3Client | null = null;

interface VideoStorageConfig {
  keyId: string;
  applicationKey: string;
  bucket: string;
  region: string;
  endpoint: string;
}

function videoStorageConfig(): VideoStorageConfig | null {
  const keyId = process.env.B2_KEY_ID;
  const applicationKey = process.env.B2_APPLICATION_KEY;
  const bucket = process.env.B2_BUCKET_NAME;
  const region = process.env.B2_REGION;

  if (!keyId || !applicationKey || !bucket || !region) return null;

  return {
    keyId,
    applicationKey,
    bucket,
    region,
    endpoint: process.env.B2_ENDPOINT || `https://s3.${region}.backblazeb2.com`,
  };
}

export function isVideoStorageConfigured() {
  return Boolean(videoStorageConfig());
}

function getClient(config: VideoStorageConfig) {
  if (!client) {
    client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: { accessKeyId: config.keyId, secretAccessKey: config.applicationKey },
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    });
  }

  return client;
}

export async function getSignedVideoUrl(key: string): Promise<string | null> {
  const config = videoStorageConfig();
  if (!config) return null;

  try {
    const command = new GetObjectCommand({ Bucket: config.bucket, Key: key });
    return await getSignedUrl(getClient(config), command, { expiresIn: 60 * 60 * 6 });
  } catch (error) {
    console.error("Unable to sign video URL:", error);
    return null;
  }
}
