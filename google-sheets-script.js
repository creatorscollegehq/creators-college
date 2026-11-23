/**
 * Google Apps Script for Creators College Lead Management
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this script.
 * 4. Click Save (disk icon).
 * 5. Click "Deploy" > "New deployment".
 * 6. Under "Select type", choose "Web app".
 * 7. Set Description to "Creators College Lead Integration".
 * 8. Set "Execute as" to "Me".
 * 9. Set "Who has access" to "Anyone" (crucial for webhooks to work!).
 * 10. Click Deploy, authorize permissions, and copy the "Web app URL".
 * 11. Add the URL to your Next.js project as NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL.
 */

var SHEET_ID_PROPERTY = "SHEET_ID";

function spreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;
  var id = PropertiesService.getScriptProperties().getProperty(SHEET_ID_PROPERTY);
  return id ? SpreadsheetApp.openById(id) : null;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    })
    .setMimeType(ContentService.MimeType.JSON);
}

// Health check: open the web app URL in a browser to confirm the deployment.
function doGet() {
  return json_({
    ok: true,
    message: "Creators College sheet webhook is live",
    time: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    return handlePost_(e);
  } catch (err) {
    return json_({ result: "error", error: String(err && err.message ? err.message : err) });
  }
}

function handlePost_(e) {
  var ss = spreadsheet_();
  if (!ss) {
    return json_({
      result: "error",
      error: "This Apps Script is not attached to a spreadsheet. Open the Google Sheet > Extensions > Apps Script, paste this file and deploy again."
    });
  }

  if (!e || !e.postData || !e.postData.contents) {
    return json_({ result: "error", error: "Empty request body" });
  }
  
  // Parse incoming JSON payload
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: "Invalid JSON"}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  var timestamp = new Date();
  var name = data.name || "N/A";
  var phone = data.phone || "N/A";
  var email = data.email || "N/A";
  var course = data.course || "N/A";
  var message = data.message || "N/A";
  var source = data.source || "General Form";
  var type = data.type || "general"; // types: "instant", "whatsapp", "enrollment", "general"

  // Select Sheet/Tab based on Lead Type (Multiple Sections)
  var sheetName = "General Leads";
  var headerColor = "#5f6368"; // Gray default
  
  if (type === "instant") {
    sheetName = "⚡ Instant Callback Leads";
    headerColor = "#0055ff"; // Professional Blue
  } else if (type === "whatsapp") {
    sheetName = "💬 WhatsApp Inquiries";
    headerColor = "#16a34a"; // WhatsApp Green
  } else if (type === "enrollment") {
    sheetName = "🎓 Course Enrollments";
    headerColor = "#ea580c"; // Brand Orange
  } else if (type === "feedback") {
    sheetName = "📝 Lesson Feedback";
    headerColor = "#7c3aed"; // Purple
  }

  // Fetch or dynamically create the Sheet tab
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Write headers
    var headers = ["Timestamp", "Full Name", "Phone / Contact", "Email Address", "Selected Program", "Custom Message", "Source Module"];
    sheet.appendRow(headers);
    
    // Style and highlight the headers (Bold, White Text, Custom Color Background)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setFontColor("#ffffff");
    headerRange.setBackground(headerColor);
    headerRange.setHorizontalAlignment("center");
    sheet.setRowHeight(1, 28);
    
    // Auto-fit column widths
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  // Format cell alignment and write row data
  var rowData = [timestamp, name, phone, email, course, message, source];
  sheet.appendRow(rowData);
  
  // Apply clean vertical borders and text wraps on newly appended row
  var lastRow = sheet.getLastRow();
  var dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
  dataRange.setVerticalAlignment("middle");
  dataRange.setWrap(true);
  sheet.setRowHeight(lastRow, 22);

  // Auto resize column widths to fit content nicely
  for (var col = 1; col <= rowData.length; col++) {
    sheet.autoResizeColumn(col);
  }

  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
                       .setHeaders({
                         "Access-Control-Allow-Origin": "*",
                         "Access-Control-Allow-Methods": "POST",
                         "Access-Control-Allow-Headers": "Content-Type"
                       })
                       .setMimeType(ContentService.MimeType.JSON);
}

// Support pre-flight OPTIONS request (CORS safety)
function doOptions(e) {
  return ContentService.createTextOutput(JSON.stringify({result: "ok"}))
                       .setHeaders({
                         "Access-Control-Allow-Origin": "*",
                         "Access-Control-Allow-Methods": "POST, OPTIONS",
                         "Access-Control-Allow-Headers": "Content-Type"
                       })
                       .setMimeType(ContentService.MimeType.JSON);
}
