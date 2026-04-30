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
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  const text = await page.locator("body").innerText();

  console.log("==== SEITENTEXT START ====");
  console.log(text);
  console.log("==== SEITENTEXT ENDE ====");

  const dollarMatch = text.match(/\$\s*\d+/);

  const profilePositionMatch =
    text.match(/Profilposition[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Profile position[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Position[\s\S]{0,100}?(\d+)/i);

  const secondNumberMatch =
    text.match(/Aufrufe[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Views[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Besucher[\s\S]{0,100}?(\d+)/i);

  return {
    dollar: dollarMatch ? dollarMatch[0].replace(/\s+/g, "") : null,
    number_1: profilePositionMatch ? profilePositionMatch[1] : null,
    number_2: secondNumberMatch ? secondNumberMatch[1] : null,
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

async function readValues(page) {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  const text = await page.locator("body").innerText();

  console.log("==== SEITENTEXT START ====");
  console.log(text);
  console.log("==== SEITENTEXT ENDE ====");

  const dollarMatch = text.match(/\$\s*\d+/);

  const profilePositionMatch =
    text.match(/Profilposition[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Profile position[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Position[\s\S]{0,100}?(\d+)/i);

  const secondNumberMatch =
    text.match(/Aufrufe[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Views[\s\S]{0,100}?(\d+)/i) ||
    text.match(/Besucher[\s\S]{0,100}?(\d+)/i);

  return {
    dollar: dollarMatch ? dollarMatch[0].replace(/\s+/g, "") : null,
    number_1: profilePositionMatch ? profilePositionMatch[1] : null,
    number_2: secondNumberMatch ? secondNumberMatch[1] : null,
    checkedAt: now()
  };
}

 