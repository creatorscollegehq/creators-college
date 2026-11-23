// Single source of truth for the Google Sheets (Apps Script) web app that stores
// leads, feedback and contact submissions. Hardcoded on purpose so every
// deployment writes to the same sheet even when env vars are stale.
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzPtmA1693Rnnk9Srmfug5kHYZ7uKlWEqMClfCgOluwdaJ7Tn_c59kauvARCSceiZzC/exec";
