"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "09_Tiere", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_Tiere";
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
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " – ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
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

function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Tiere"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 44"),
    empty(),

    // Aufgabe 1: Lueckentext (10P)
    h2("Aufgabe 1: Lueckentext (10 Punkte)"),
    pBold("Ergaenze die Saetze mit den richtigen Woertern."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("bellt  -  miaut  -  muht  -  bruellt  -  Haustier  -  Bauernhof  -  Zoo  -  Ruessel  -  Streifen  -  frisst")],
      })]})],
    }),
    empty(),
    p("1. Der Hund __________________ laut, wenn er einen Fremden sieht."),
    p("2. Die Katze __________________ leise."),
    p("3. Die Kuh __________________ auf der Wiese."),
    p("4. Der Loewe __________________ im __________________."),
    p("5. Der Elefant hat einen langen __________________."),
    p("6. Das Zebra hat schwarz-weisse __________________."),
    p("7. Auf dem __________________ leben Kuehe, Pferde und Huehner."),
    p("8. Ein Hund oder eine Katze ist ein __________________."),
    p("9. Die Giraffe __________________ Blaetter von hohen Baeumen."),
    empty(),

    // Aufgabe 2: Lesetext (8P)
    h2("Aufgabe 2: Lies den Text und antworte. (8 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Mein Name ist Sophie. Ich bin 9 Jahre alt und liebe Tiere sehr!"),
          p("Wir haben zwei Haustiere: einen Hund namens Balu und eine Katze namens Perle."),
          p("Balu bellt jeden Morgen, wenn der Postbote kommt. Perle miaut nur, wenn sie Hunger hat."),
          p("Letzten Sommer war ich auf einem Bauernhof. Dort habe ich Kuehe, Pferde und Huehner gesehen."),
          p("Die Kuh Frieda hat mich mit ihrem Kopf gestossen - das war ein Schreck!"),
          p("Mein Lieblingstier im Zoo ist der Elefant. Er ist so gross und klug!"),
        ],
      })]})],
    }),
    empty(),
    p("1. Wie heissen Sophies Haustiere?"),
    writeLine(55), empty(),
    p("2. Wann bellt Balu?"),
    writeLine(55), empty(),
    p("3. Wann miaut Perle?"),
    writeLine(55), empty(),
    p("4. Was ist Sophies Lieblingstier im Zoo?"),
    writeLine(55), empty(),
    empty(),

    // Aufgabe 3: Kategorien (6P)
    h2("Aufgabe 3: Sortiere die Tiere! (6 Punkte)"),
    pBold("Schreib in die richtige Spalte: Hund / Elefant / Katze / Loewe / Kuh / Giraffe / Pferd / Pinguin / Fisch / Huhn / Affe / Schaf"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Haustiere", { width: 3000 }), hCell("Bauernhoftiere", { width: 3000 }), hCell("Zootiere", { width: 3500 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    // Aufgabe 4: Tierlaute (8P)
    h2("Aufgabe 4: Welches Tier macht welchen Laut? (8 Punkte)"),
    pBold("Schreib das Tier und das Verb."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Lautmalerei", { width: 2500 }), hCell("Tier (mit Artikel)", { width: 3500 }), hCell("Satz", { width: 3500 })] }),
        new TableRow({ children: [dCell("Wau wau!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Miau!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Muh!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Maeh!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Quak quak!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Piep piep!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Hieh!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Roaar!"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    // Aufgabe 5: Tier-Steckbrief (6P)
    h2("Aufgabe 5: Schreib einen Tier-Steckbrief. (6 Punkte)"),
    pBold("Waehle ein Tier. Schreib 5-6 Saetze: Name / Artikel / Wo lebt es? / Was frisst es? / Was kann es? / Tierlaut"),
    empty(),
    ...writeLines(6, 55),

    // Aufgabe 6: Konversation (6P)
    h2("Aufgabe 6: Partnerinterview – Tiere (6 Punkte)"),
    pBold("Frag deinen Partner / deine Partnerin und schreib die Antworten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Hast du ein Haustier?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingstier?"), dCell("")] }),
        new TableRow({ children: [dCell("Welchen Tierlaut findest du lustig?"), dCell("")] }),
        new TableRow({ children: [dCell("Warst du schon mal im Zoo?"), dCell("")] }),
      ],
    }),
    empty(),

    // Selbstevaluation
    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... Haustiere und Bauernhoftiere benennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Zootiere beschreiben (lebt in / frisst / hat)."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Tierlaute und Verben zuordnen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Tiere mit Artikel nennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... ueber mein Lieblingstier sprechen."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Tiere (LOESUNG)"),
    p("Gesamtpunkte: 44"),
    empty(),

    h2("Aufgabe 1: Lueckentext (10 Punkte – je 1 Punkt)"),
    bullet("1. bellt"), bullet("2. miaut"), bullet("3. muht"), bullet("4. bruellt ... Zoo"),
    bullet("5. Ruessel"), bullet("6. Streifen"), bullet("7. Bauernhof"),
    bullet("8. Haustier"), bullet("9. frisst"),
    empty(),

    h2("Aufgabe 2: Lesetext (8 Punkte – je 2 Punkte)"),
    bullet("1. Sophies Haustiere heissen Balu (Hund) und Perle (Katze)."),
    bullet("2. Balu bellt jeden Morgen, wenn der Postbote kommt."),
    bullet("3. Perle miaut nur, wenn sie Hunger hat."),
    bullet("4. Ihr Lieblingstier im Zoo ist der Elefant."),
    empty(),

    h2("Aufgabe 3: Kategorien (6 Punkte – je 0,5 Punkt)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Haustiere", { width: 3000 }), hCell("Bauernhoftiere", { width: 3000 }), hCell("Zootiere", { width: 3500 })] }),
        new TableRow({ children: [dCell("Hund, Katze, Fisch"), dCell("Kuh, Pferd, Huhn, Schaf"), dCell("Elefant, Loewe, Giraffe, Pinguin, Affe")] }),
      ],
    }),
    pItalic("Hinweis: Einige Tiere koennen in mehrere Kategorien passen (z.B. Pferd auch Haustier). Akzeptable Antworten diskutieren."),
    empty(),

    h2("Aufgabe 4: Tierlaute (8 Punkte – je 1 Punkt)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Lautmalerei", { width: 2500 }), hCell("Tier", { width: 3500 }), hCell("Satz", { width: 3500 })] }),
        new TableRow({ children: [dCell("Wau wau!"), dCell("der Hund"), dCell("Der Hund bellt.")] }),
        new TableRow({ children: [dCell("Miau!"), dCell("die Katze"), dCell("Die Katze miaut.")] }),
        new TableRow({ children: [dCell("Muh!"), dCell("die Kuh"), dCell("Die Kuh muht.")] }),
        new TableRow({ children: [dCell("Maeh!"), dCell("das Schaf"), dCell("Das Schaf blaekt.")] }),
        new TableRow({ children: [dCell("Quak quak!"), dCell("der Frosch"), dCell("Der Frosch quakt.")] }),
        new TableRow({ children: [dCell("Piep piep!"), dCell("der Vogel"), dCell("Der Vogel zwitschert.")] }),
        new TableRow({ children: [dCell("Hieh!"), dCell("das Pferd"), dCell("Das Pferd wiehert.")] }),
        new TableRow({ children: [dCell("Roaar!"), dCell("der Loewe"), dCell("Der Loewe bruellt.")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 5: Tier-Steckbrief (6 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Tier mit Artikel korrekt (1P)"),
    bullet("Lebensraum korrekt (1P)"),
    bullet("Ernaehrung / Besonderheit (1P)"),
    bullet("Tierlaut korrekt (1P)"),
    bullet("Grammatik / Verbformen (1P)"),
    bullet("5-6 vollstaendige Saetze (1P)"),
    empty(),
    pBold("Musterantwort:"),
    pItalic("Mein Lieblingstier ist der Elefant. Der Elefant lebt in Afrika. Er hat einen langen Ruessel und grosse Ohren. Er frisst Blaetter und Fruechte. Der Elefant ist sehr klug. Er macht keinen typischen Laut wie unsere Haustiere - er trompetet!"),
    empty(),

    h2("Aufgabe 6: Partnerinterview (6 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Fragen verstaendlich gestellt (1P)"),
    bullet("Vollstaendige Antworten (2P)"),
    bullet("Korrekte Verbformen (2P)"),
    bullet("Thema-Wortschatz verwendet (1P)"),
    empty(),

    h2("Notenspiegel (44 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2500 }), hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2000 })] }),
        new TableRow({ children: [dCell("42-44"), dCell("1 (sehr gut)"), dCell("29-35"), dCell("3 (befriedigend)")] }),
        new TableRow({ children: [dCell("37-41"), dCell("2 (gut)"), dCell("22-28"), dCell("4 (ausreichend)")] }),
        new TableRow({ children: [dCell("36 und weniger"), dCell("5/6 (nicht ausreichend)"), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

console.log("Erstelle ABSCHLUSS: Tiere");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
