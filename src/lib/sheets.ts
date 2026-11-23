// Single source of truth for the Google Sheets (Apps Script) web app that stores
// leads, feedback and contact submissions. Hardcoded on purpose so every
// deployment writes to the same sheet even when env vars are stale.
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzPtmA1693Rnnk9Srmfug5kHYZ7uKlWEqMClfCgOluwdaJ7Tn_c59kauvARCSceiZzC/exec";

export interface SheetsWriteResult {
  ok: boolean;
  status: number;
  error?: string;
}

interface SheetsReply {
  result?: string;
  success?: boolean;
  error?: string;
}

/**
 * Posts a row to the Apps Script web app and only reports success when the
 * script itself acknowledged the write. Google answers HTTP 200 with an HTML
 * error page when the script throws or is not bound to a spreadsheet, so a
 * plain `response.ok` check hides broken sheets.
 */
export async function postToSheets(payload: Record<string, unknown>): Promise<SheetsWriteResult> {
  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });

    const raw = await response.text();
    let parsed: SheetsReply | null = null;
    try {
      parsed = JSON.parse(raw) as SheetsReply;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: parsed?.error || `The Google Sheet responded with ${response.status}.`,
      };
    }

    if (parsed && (parsed.success === true || parsed.result === "success")) {
      return { ok: true, status: response.status };
    }

    return {
      ok: false,
      status: response.status,
      error:
        parsed?.error ||
        "The Google Sheet did not confirm the save. Redeploy the Apps Script web app from the sheet itself.",
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "Could not reach the Google Sheet.",
    };
  }
}
