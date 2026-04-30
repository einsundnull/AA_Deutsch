const { chromium } = require("playwright");
const fs = require("fs");

const URL = "https://preply.com/de/performance";
const CHECK_EVERY_MS = 5 * 60 * 1000; // alle 5 Minuten
const STATE_FILE = "last-values.json";
const LOG_FILE = "changes.jsonl";

function now() {
  return new Date().toISOString();
}

function loadLastValues() {
  if (!fs.existsSync(STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveLastValues(values) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(values, null, 2), "utf8");
}

function logChange(change) {
  fs.appendFileSync(LOG_FILE, JSON.stringify(change) + "\n", "utf8");
}

async function readValues(page) {
  await page.goto(URL, { waitUntil: "networkidle" });

  // Alle großen Preply-Heading-Werte sammeln
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
    number_1: numbers[0] || null, // aktuell vermutlich 1768
    number_2: numbers[1] || null, // aktuell vermutlich 155
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
        field,
        oldValue: last[field],
        newValue: current[field],
        dateTime: current.checkedAt
      };

      logChange(change);
      console.log("Änderung gefunden:", change);
    }
  }

  saveLastValues(current);
}

async function main() {
  const browser = await chromium.launchPersistentContext("./preply-profile", {
    headless: false
  });

  const page = await browser.newPage();

  console.log("Browser geöffnet.");
  console.log("Falls du nicht eingeloggt bist: Bitte einmal bei Preply einloggen.");
  console.log("Danach läuft die Kontrolle automatisch.");

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