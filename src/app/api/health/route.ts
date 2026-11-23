import { NextResponse } from "next/server";
import { SHEETS_WEBHOOK_URL } from "@/lib/sheets";
import { pingSupabase } from "@/lib/supabase";
import { isVideoStorageConfigured } from "@/lib/videoStorage";

export const dynamic = "force-dynamic";

function videoEnvStatus() {
  const missing = ["R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME"].filter(
    (key) => !process.env[key]
  );
  if (!process.env.R2_ACCOUNT_ID && !process.env.R2_ENDPOINT) {
    missing.push("R2_ACCOUNT_ID");
  }
  return { ready: missing.length === 0, missing };
}

interface SheetsCheck {
  status: number;
  confirmed: boolean;
  error?: string;
}

async function checkSheets(): Promise<SheetsCheck> {
  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const raw = await response.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(raw) as { ok?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      return {
        status: response.status,
        confirmed: false,
        error:
          response.status === 404
            ? "The Apps Script URL does not exist. Copy the /exec URL again from Deploy → Manage deployments."
            : `The web app answered ${response.status}.`,
      };
    }

    if (!parsed) {
      return {
        status: response.status,
        confirmed: false,
        error:
          "The web app returned HTML instead of JSON. Redeploy the Apps Script from inside the sheet itself.",
      };
    }

    return { status: response.status, confirmed: parsed.ok === true, error: parsed.error };
  } catch (error) {
    return {
      status: 0,
      confirmed: false,
      error: error instanceof Error ? error.message : "Could not reach the Google Sheet.",
    };
  }
}

export async function GET(request: Request) {
  const supabase = await pingSupabase();
  const r2 = isVideoStorageConfigured();
  const videoEnv = videoEnvStatus();
  // The Sanity client falls back to a baked-in project id, so the site works
  // even when the env var is absent.
  const sanity = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hp2qnt9q");
  const cashfree = Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);
  const check = new URL(request.url).searchParams.get("check");

  return NextResponse.json(
    {
      ok: supabase,
      supabase,
      r2,
      videoEnv,
      sanity,
      cashfree,
      sheets: Boolean(SHEETS_WEBHOOK_URL),
      sheetsCheck: check === "sheets" ? await checkSheets() : undefined,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
      deployment: process.env.VERCEL_URL ?? null,
    },
    { status: supabase ? 200 : 503 }
  );
}
