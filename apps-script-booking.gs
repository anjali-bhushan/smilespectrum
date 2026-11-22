// SmileSpectrum (PROTOTYPE) booking receiver: paste into Google Apps Script
// (Google Sheet > Extensions > Apps Script), then Deploy > New deployment > Web app,
// Execute as: Me, Who has access: Anyone. Paste the /exec link into BOOKING_URL in app.js.
//
// Each booking: 1) adds a row to the "Bookings" tab, 2) emails you (the clinic owner),
// 3) emails the patient a confirmation that clearly says it is a PROTOTYPE.
// A daily cap stops the form from being misused to send lots of emails.

const DAILY_EMAIL_LIMIT = 30;

function doPost(e) {
  const b = JSON.parse(e.postData.contents);
  const clip = function (v, n) { return String(v || "").slice(0, n || 100); };

  // 1) Save to the sheet
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName("Bookings") || book.insertSheet("Bookings");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Received", "Booking ID", "Department", "Specialist", "Treatment", "Date", "Time", "Name", "Phone", "Email", "Notes"]);
  }
  sheet.appendRow([new Date(), clip(b.id, 20), clip(b.deptName), clip(b.doctor), clip(b.treatment), clip(b.date, 10), clip(b.time, 10),
    clip(b.name, 60), clip(b.phone, 20), clip(b.email, 100), clip(b.notes, 300)]);

  // 2) + 3) Emails, with a daily limit
  const props = PropertiesService.getScriptProperties();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const count = props.getProperty("day") === today ? Number(props.getProperty("count") || 0) : 0;
  if (count < DAILY_EMAIL_LIMIT) {
    const details =
      "Booking ID: " + clip(b.id, 20) + "\nDepartment: " + clip(b.deptName) + "\nSpecialist: " + clip(b.doctor) +
      "\nTreatment: " + clip(b.treatment) + "\nDate: " + clip(b.date, 10) + "\nTime: " + clip(b.time, 10);

    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), "New prototype booking " + clip(b.id, 20),
      details + "\nName: " + clip(b.name, 60) + "\nPhone: " + clip(b.phone, 20) + "\nEmail: " + clip(b.email) + "\nNotes: " + clip(b.notes, 300));

    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(b.email || ""))) {
      MailApp.sendEmail(String(b.email), "Your SmileSpectrum booking " + clip(b.id, 20) + " (PROTOTYPE, not a real appointment)",
        "Hi " + clip(b.name, 60) + ",\n\nThank you for trying the SmileSpectrum Dental prototype.\n\n" + details +
        "\n\nPlease note: SmileSpectrum is a fictional clinic built as a portfolio prototype. No real appointment has been made.\n");
    }
    props.setProperties({ day: today, count: String(count + 2) });
  }
  return ContentService.createTextOutput("ok");
}
