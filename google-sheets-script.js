/**
 * Google Apps Script for Creators College leads, enrollments and lesson feedback.
 *
 * HOW TO DEPLOY (must be done from inside the spreadsheet):
 * 1. Open the Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Delete ALL existing code, paste this whole file, click Save.
 * 4. Deploy > Manage deployments > (pencil / Edit) > Version: New version
 *    > Execute as: Me  > Who has access: Anyone  > Deploy.
 *    (Deploy > New deployment also works if there is no existing deployment.)
 * 5. Open the /exec URL in a browser — it must print {"ok":true,...}.
 *
 * NOTE: Apps Script has no way to set HTTP headers on a web app response
 * (ContentService.TextOutput has no setHeaders method). Calling one crashes the
 * whole request, which is why every response below is plain JSON only.
 */

var SHEET_ID_PROPERTY = "SHEET_ID";
var HEADERS = [
  "Timestamp",
  "Full Name",
  "Phone / Contact",
  "Email Address",
  "Selected Program",
  "Custom Message",
  "Source Module"
];

function spreadsheet_() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (err) {
    // Not bound to a spreadsheet: fall through to the script property.
  }
  var id = PropertiesService.getScriptProperties().getProperty(SHEET_ID_PROPERTY);
  if (!id) return null;
  try {
    return SpreadsheetApp.openById(id);
  } catch (err) {
    return null;
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function error_(message) {
  return json_({ result: "error", success: false, ok: false, error: String(message) });
}

// Open the /exec URL in a browser to confirm the deployment is live.
function doGet() {
  try {
    var ss = spreadsheet_();
    return json_({
      ok: true,
      success: true,
      message: "Creators College sheet webhook is live",
      spreadsheet: ss ? ss.getName() : null,
      time: new Date().toISOString()
    });
  } catch (err) {
    return error_(err && err.message ? err.message : err);
  }
}

function doPost(e) {
  try {
    return handlePost_(e);
  } catch (err) {
    return error_(err && err.message ? err.message : err);
  }
}

function doOptions() {
  return json_({ result: "ok", ok: true });
}

function sheetFor_(ss, type) {
  var name = "General Leads";
  var color = "#5f6368";

  if (type === "instant") {
    name = "⚡ Instant Callback Leads";
    color = "#0055ff";
  } else if (type === "whatsapp") {
    name = "💬 WhatsApp Inquiries";
    color = "#16a34a";
  } else if (type === "enrollment") {
    name = "🎓 Course Enrollments";
    color = "#ea580c";
  } else if (type === "feedback") {
    name = "📝 Lesson Feedback";
    color = "#7c3aed";
  }

  var sheet = ss.getSheetByName(name);
  if (sheet) return sheet;

  sheet = ss.insertSheet(name);
  sheet.appendRow(HEADERS);
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setFontColor("#ffffff");
  headerRange.setBackground(color);
  headerRange.setHorizontalAlignment("center");
  sheet.setRowHeight(1, 28);
  for (var i = 1; i <= HEADERS.length; i++) {
    sheet.autoResizeColumn(i);
  }
  return sheet;
}

function handlePost_(e) {
  var ss = spreadsheet_();
  if (!ss) {
    return error_(
      "This Apps Script is not attached to a spreadsheet. Open the Google Sheet > Extensions > Apps Script, paste this file and deploy again."
    );
  }

  if (!e || !e.postData || !e.postData.contents) {
    return error_("Empty request body");
  }

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return error_("Invalid JSON");
  }

  var type = data.type || "general";
  var sheet = sheetFor_(ss, type);

  var timestamp = new Date();
  var helpSeen = data.helpSeen === undefined ? "" : String(data.helpSeen);
  var row = [
    timestamp,
    data.name || "N/A",
    data.phone || "N/A",
    data.email || "N/A",
    data.course || "N/A",
    data.message || "N/A",
    data.source || "General Form"
  ];
  if (helpSeen) {
    row[6] = row[6] + " · helpSeen:" + helpSeen;
  }

  sheet.appendRow(row);

  var lastRow = sheet.getLastRow();
  var dataRange = sheet.getRange(lastRow, 1, 1, row.length);
  dataRange.setVerticalAlignment("middle");
  dataRange.setWrap(true);
  sheet.setRowHeight(lastRow, 22);

  return json_({ result: "success", success: true, ok: true, sheet: sheet.getName() });
}
