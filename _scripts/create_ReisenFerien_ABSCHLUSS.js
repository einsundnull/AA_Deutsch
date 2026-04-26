"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "07_ReisenFerien", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_ReisenFerien";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  }]
};

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 100 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: BLUE, font: "Arial" })], spacing: { before: 160, after: 80 } }); }
function p(t, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text: t, size: opts.size || 22, font: "Arial", color: opts.color || "000000", bold: opts.bold || false, italics: opts.italic || false })],
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60 },
  });
}
function pBold(t, opts = {}) { return p(t, { ...opts, bold: true }); }
function pItalic(t, opts = {}) { return p(t, { ...opts, italic: true }); }
function empty() { return new Paragraph({ children: [new TextRun({ text: "", size: 22, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function bullet(t) { return new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })], numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 } }); }
function hCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: opts.size || 20, font: "Arial", color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
  });
}
function dCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, size: opts.size || 20, font: "Arial" })], alignment: opts.align || AlignmentType.LEFT })],
    shading: opts.shade ? { fill: LIGHT, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
    ...(opts.colspan ? { columnSpan: opts.colspan } : {}),
  });
}
function writeLine(n) { return new Paragraph({ children: [new TextRun({ text: "_".repeat(n || 60), size: 22, font: "Arial", color: GRAY })], spacing: { before: 60, after: 60 } }); }
function writeLines(count, n) { const arr = []; for (let i = 0; i < count; i++) { arr.push(writeLine(n)); arr.push(empty()); } return arr; }
function studentHead() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [dCell("Name: ______________________________", { width: 4500 }), dCell("Klasse: ____________", { width: 2200 }), dCell("Datum: ____________", { width: 2200 })] })],
  });
}
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " — ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] });
}
function save(fname, sections) {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: sections }]
  });
  Packer.toBuffer(doc).then(buf => { fs.writeFileSync(path.join(OUTPUT_DIR, fname), buf); console.log("OK ", fname); }).catch(e => console.error("FEHLER", fname, e.message));
}

function postkarteBox(lines) {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, right: { style: BorderStyle.SINGLE, size: 4, color: BLUE } },
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      children: lines,
    })]})],
  });
}

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Reisen & Ferien"), empty(),
    pItalic("Diese Abschlussübung verbindet Urlaub beschreiben, Transportmittel und Postkarten schreiben."),
    empty(),

    // AUFGABE 1: Lesetext
    h2("Aufgabe 1: Lesen und verstehen"),
    pBold("Lies den Reisebericht und beantworte die Fragen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Meine grosse Sommerreise"),
          empty(),
          p("Diesen Sommer haben wir eine lange Reise gemacht — von Muenchen bis nach Kopenhagen! Das war so aufregend."),
          p("Zuerst sind wir mit dem Zug von Muenchen nach Hamburg gefahren. Die Fahrt hat fast sechs Stunden gedauert, aber ich habe aus dem Fenster geschaut und Buecher gelesen — die Zeit ist schnell vergangen. In Hamburg haben wir eine Nacht im Hotel verbracht und die Hafenstadt erkundet. Das Wetter war bewolkt, aber wir haben trotzdem eine Hafenrundfahrt mit dem Schiff gemacht."),
          p("Am naechsten Tag sind wir mit der Faehre nach Kopenhagen gefahren. Die Faehre war riesig — wie ein schwimmendes Hotel! Es gab Restaurants, ein Kino und sogar ein Schwimmbad. Die Ueberfahrt hat ungefaehr zwanzig Stunden gedauert."),
          p("In Kopenhagen sind wir mit dem Fahrrad durch die Stadt gefahren — das ist dort ganz normal, weil es so viele Radwege gibt. Wir haben Schloss Christiansborg besucht und frischen Fisch am Hafen gegessen."),
          p("Auf dem Rueckweg sind wir mit dem Flugzeug nach Hause geflogen. In zwei Stunden waren wir wieder in Muenchen — viel schneller als mit dem Zug!"),
          p("Ich habe meiner Oma eine Postkarte aus Kopenhagen geschrieben. Sie hat sich so gefreut!"),
        ],
      })]})],
    }),
    empty(),
    pBold("a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Zugreise von Muenchen nach Hamburg hat drei Stunden gedauert."), dCell("")] }),
        new TableRow({ children: [dCell("In Hamburg haben sie eine Hafenrundfahrt gemacht."), dCell("")] }),
        new TableRow({ children: [dCell("Die Faehre nach Kopenhagen hatte kein Restaurant."), dCell("")] }),
        new TableRow({ children: [dCell("In Kopenhagen sind sie mit dem Fahrrad gefahren."), dCell("")] }),
        new TableRow({ children: [dCell("Der Rueckflug nach Muenchen hat zwei Stunden gedauert."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("b) Welche Transportmittel hat die Familie benutzt? Schreib alle auf."),
    writeLine(55), empty(),
    pBold("c) Beantworte die Frage: Warum fahren viele Menschen in Kopenhagen Fahrrad?"),
    writeLine(55), empty(),

    // AUFGABE 2: Lueckentext
    h2("Aufgabe 2: Lueckentext"),
    pBold("Ergaenze den Text mit den Woertern aus dem Kasten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("dem Zug  -  der U-Bahn  -  dem Flugzeug  -  gefahren  -  wunderschoen  -  gemacht  -  Strand  -  Gruesse  -  vermisse  -  schneller  -  Koffer  -  Abfahrt")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Wir sind mit __________________ nach Rom __________________."),
          p("Vom Bahnhof sind wir mit __________________ ins Hotel gefahren."),
          p("Das Hotel war direkt am __________________ — __________________ !"),
          p("Wir haben jeden Tag Eis __________________ und Sehenswuerdigkeiten besucht."),
          p("Das Flugzeug ist __________________ als der Zug, aber wir hatten Zeit."),
          p("Ich habe meinen __________________ mit Sonnencreme und Badezeug gepackt."),
          p("Die __________________ des Zuges ist um 14:32 Uhr auf Gleis 5."),
          p("Viele __________________ aus Italien! Ich __________________ euch."),
        ],
      })]})],
    }),
    empty(),

    // AUFGABE 3: Transportmittel vergleichen
    h2("Aufgabe 3: Transportmittel vergleichen"),
    pBold("Schreib je einen Satz mit schneller als / langsamer als / guenstiger als / umweltfreundlicher als."),
    empty(),
    p("1. Fahrrad — Auto:"),
    writeLine(55), empty(),
    p("2. Flugzeug — Zug:"),
    writeLine(55), empty(),
    p("3. Bus — Taxi:"),
    writeLine(55), empty(),
    p("4. Zug — Flugzeug (Umwelt):"),
    writeLine(55), empty(),

    // AUFGABE 4: Postkarte schreiben
    h2("Aufgabe 4: Postkarte schreiben"),
    pBold("Du bist in Amsterdam (Niederlande). Schreib eine Postkarte an deine Familie."),
    pItalic("Infos: Kanal-Rundfahrt mit dem Boot gemacht  |  Wetter: bewolkt aber trocken  |  Morgen: Fahrradtour  |  Essen: Pfannkuchen probiert"),
    empty(),
    postkarteBox([
      p("Liebe Familie,"),
      empty(),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      empty(),
      p("Herzliche Gruesse, deine(r) ____________________"),
    ]),
    empty(),

    // AUFGABE 5: Schreibaufgabe
    h2("Aufgabe 5: Meinen Traumurlaub beschreiben"),
    pBold("Beschreibe deinen Traumurlaub in 7-8 Saetzen."),
    pItalic("Denk an: Wohin faehrst du? Mit welchem Transportmittel? Was machst du dort? Wie ist das Wetter? Was isst du? An wen schickst du eine Postkarte?"),
    empty(),
    ...writeLines(8, 55),
    empty(),

    // AUFGABE 6: Selbstevaluation
    h2("Aufgabe 6: Selbstevaluation"),
    pBold("Was kannst du jetzt? Kreuze an."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7500 }), hCell("☐ gut  ☐ noch nicht", { width: 2000 })] }),
        new TableRow({ children: [dCell("... einen Urlaub auf Deutsch beschreiben (Ort, Wetter, Aktivitaeten)."), dCell("")] }),
        new TableRow({ children: [dCell("... Transportmittel mit 'mit + Dativ' korrekt benennen."), dCell("")] }),
        new TableRow({ children: [dCell("... Transportmittel mit schneller als / guenstiger als vergleichen."), dCell("")] }),
        new TableRow({ children: [dCell("... Perfekt mit haben und sein korrekt bilden."), dCell("")] }),
        new TableRow({ children: [dCell("... eine Postkarte mit allen Pflichtteilen schreiben."), dCell("")] }),
        new TableRow({ children: [dCell("... Fahrplaene und Reiseinformationen verstehen."), dCell("")] }),
      ],
    }),
  ]);
}

// ── ABSCHLUSS LOESUNG ─────────────────────────────────────────────────────────
function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Reisen & Ferien (LOESUNG)"), empty(),

    h2("Aufgabe 1a: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Zugreise von Muenchen nach Hamburg hat drei Stunden gedauert."), dCell("F (fast sechs Stunden)")] }),
        new TableRow({ children: [dCell("In Hamburg haben sie eine Hafenrundfahrt gemacht."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Faehre nach Kopenhagen hatte kein Restaurant."), dCell("F (es gab Restaurants, Kino, Schwimmbad)")] }),
        new TableRow({ children: [dCell("In Kopenhagen sind sie mit dem Fahrrad gefahren."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Rueckflug nach Muenchen hat zwei Stunden gedauert."), dCell("R")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b+c"),
    bullet("b) Transportmittel: Zug, Schiff (Hafenrundfahrt), Faehre, Fahrrad, Flugzeug"),
    bullet("c) Weil es so viele Radwege gibt."),
    empty(),

    h2("Aufgabe 2: Lueckentext"),
    bullet("dem Zug — gefahren"),
    bullet("der U-Bahn"),
    bullet("Strand — wunderschoen"),
    bullet("gemacht"),
    bullet("schneller"),
    bullet("Koffer"),
    bullet("Abfahrt"),
    bullet("Gruesse — vermisse"),
    pItalic("Nicht verwendet (Ablenkwoerter): dem Flugzeug"),
    empty(),

    h2("Aufgabe 3: Vergleiche"),
    bullet("1. Das Fahrrad ist langsamer als das Auto. / Das Auto ist schneller als das Fahrrad."),
    bullet("2. Das Flugzeug ist schneller als der Zug."),
    bullet("3. Der Bus ist guenstiger als das Taxi."),
    bullet("4. Der Zug ist umweltfreundlicher als das Flugzeug."),
    pItalic("Andere korrekte Vergleiche akzeptieren. Auf 'als' nach dem Komparativ achten."),
    empty(),

    h2("Aufgabe 4: Musterloesung Postkarte"),
    postkarteBox([
      p("Liebe Familie,"),
      p("viele Gruesse aus Amsterdam! Die Stadt ist wunderschoen. Gestern haben wir eine Kanal-Rundfahrt mit dem Boot gemacht — die vielen alten Gebaeude sehen vom Wasser aus toll aus. Das Wetter ist bewolkt, aber trocken."),
      p("Heute Abend haben wir Pfannkuchen probiert — sehr lecker! Morgen machen wir eine Fahrradtour durch die Stadt."),
      p("Ich vermisse euch! Bis bald."),
      p("Herzliche Gruesse, deine(r) ..."),
    ]),
    pItalic("Pflichtteile: Eroefffnungsgruss, Anrede, Ort/Wetter, mindestens eine Aktivitaet im Perfekt, Zukunftsplan, Abschlussgruss."),
    pItalic("Auf korrekte Perfektformen achten: Boot-Fahrt → mit dem Boot gefahren (sein) / Pfannkuchen probiert → haben + probiert."),
    empty(),

    h2("Aufgabe 5: individuelle Antworten"),
    pItalic("Erwartete Elemente: Zielort (nach + Land / ans Meer / in die Berge), Transportmittel mit mit + Dativ, Aktivitaeten im Wunschform (moechte / wuerde gerne) oder Praesens, Wetterbeschreibung, Essenserwahnung, Postkarten-Empfaenger genannt."),
    pItalic("Grammatikpunkte pruefen: mit + Dativ, Komparativ bei Transportmitteln, Perfekt vs. Praesens richtig eingesetzt."),
    empty(),

    h2("Aufgabe 6: Selbstevaluation"),
    pItalic("Keine feste Loesung — individuelle Selbsteinschaetzung. Besprich mit der Klasse, welche Lernziele noch geubt werden sollen."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle ABSCHLUSS: Reisen & Ferien (kombiniert UP 01 + 02 + 03)");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
