const { chromium } = require("playwright");
const fs = require("fs");
const ExcelJS = require("exceljs");
const notifier = require("node-notifier");

const URL = "https://preply.com/de/performance";
const CHECK_EVERY_MS = 15 * 60 * 1000;

const STATE_FILE = "last-values.json";
const LOG_FILE = "changes.jsonl";
const EXCEL_FILE = "preply-verlauf.xlsx";

function now() {
  return new Date().toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "medium"
  });
}

function loadLastValues() {
  if (!fs.existsSync(STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveLastValues(values) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(values, null, 2), "utf8");
}

function logJson(change) {
  fs.appendFileSync(LOG_FILE, JSON.stringify(change) + "\n", "utf8");
}

async function addToExcel(change) {
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(EXCEL_FILE)) {
    await workbook.xlsx.readFile(EXCEL_FILE);
  }

  let sheet = workbook.getWorksheet("Verlauf");

  if (!sheet) {
    sheet = workbook.addWorksheet("Verlauf");

    sheet.columns = [
      { header: "Datum / Zeit", key: "dateTime", width: 25 },
      { header: "Feld", key: "field", width: 20 },
      { header: "Alter Wert", key: "oldValue", width: 20 },
      { header: "Neuer Wert", key: "newValue", width: 20 }
    ];

    sheet.getRow(1).font = { bold: true };
  }

  sheet.addRow(change);

  await workbook.xlsx.writeFile(EXCEL_FILE);
}

function notify(change) {
  notifier.notify({
    title: "Preply Änderung erkannt",
    message: `${change.field}: ${change.oldValue} → ${change.newValue}`,
    sound: true
  });
}

async function readValues(page) {
  await page.goto(URL, { waitUntil: "networkidle" });

  const values = await page.$$eval(
    '[data-preply-ds-component="Heading"]',
    elements =>
      elements
        .map(e => e.textContent.trim())
        .filter(t => t.length > 0)
  );

  const dollarValue = values.find(v => /^\$\d+/.test(v));
  const numbers = values.filter(v => /^\d+$/.test(v));

  return {
    dollar: dollarValue || null,
    number_1: numbers[0] || null,
    number_2: numbers[1] || null,
    checkedAt: now()
  };
}

async function checkOnce(page) {
  const current = await readValues(page);
  const last = loadLastValues();

  if (!last) {
    saveLastValues(current);
    console.log("Startwerte gespeichert:", current);
    return;
  }

  const fields = ["dollar", "number_1", "number_2"];

  for (const field of fields) {
    if (current[field] !== last[field]) {
      const change = {
        dateTime: current.checkedAt,
        field,
        oldValue: last[field],
        newValue: current[field]
      };

      logJson(change);
      await addToExcel(change);
      notify(change);

      console.log("Änderung gefunden:", change);
    }
  }

  saveLastValues(current);
}

async function main() {
  const browser = await chromium.launchPersistentContext(
    "C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch\\MyPreply\\preply-monitor\\chrome-profile",
    {
      headless: false,
      channel: "chrome"
    }
  );

  const page = await browser.newPage();

  console.log("Preply-Monitor gestartet.");
  console.log("Check alle 15 Minuten.");
  console.log("Excel-Datei:", EXCEL_FILE);

  await checkOnce(page);

  setInterval(async () => {
    try {
      await checkOnce(page);
    } catch (err) {
      console.error("Fehler beim Prüfen:", err.message);
    }
  }, CHECK_EVERY_MS);
}

main();

 