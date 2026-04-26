"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "08_SpielenFreizeit", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_SpielenFreizeit";
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

// ── ABSCHLUSS ────────────────────────────────────────────────────────────────
function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Spielen und Freizeit"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 42"),
    empty(),

    // Aufgabe 1: Lueckentext (10P)
    h2("Aufgabe 1: Lueckentext (10 Punkte)"),
    pBold("Ergaenze die Saetze mit den richtigen Woertern."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("spiele  -  schwimme  -  fahre  -  Hobby  -  Lieblingssport  -  Puppe  -  Verein  -  zusammen  -  gern  -  Freizeit")],
      })]})],
    }),
    empty(),
    p("1. In der __________________ spiele ich mit meinen Freunden."),
    p("2. Mein __________________ ist Lesen. Ich lese jeden Tag."),
    p("3. Tom __________________ Fussball in einem __________________."),
    p("4. Lisa __________________ sehr gern. Sie ist im Schwimmverein."),
    p("5. Wir __________________ am Wochenende __________________ Karten."),
    p("6. Mein __________________ ist Tennis. Ich spiele es zweimal pro Woche."),
    p("7. Sie schlaeft mit ihrer __________________ im Bett."),
    empty(),

    // Aufgabe 2: Lesetext (6P)
    h2("Aufgabe 2: Lies den Text und antworte. (6 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich bin Finn, 10 Jahre alt. In meiner Freizeit mache ich sehr gern Sport."),
          p("Mein Lieblingssport ist Fussball. Ich trainiere dienstags und donnerstags im Verein."),
          p("Am Wochenende spiele ich mit meinen Freunden draussen. Wir spielen oft Fussball oder fahren Rad."),
          p("Ich habe auch viel Spielzeug: Lego, ein Puzzle und viele Karten."),
          p("Am liebsten spiele ich mit meinen Freunden - allein macht es nicht so viel Spass!"),
        ],
      })]})],
    }),
    empty(),
    p("1. Wie alt ist Finn?"),
    writeLine(55), empty(),
    p("2. Wann trainiert er im Verein?"),
    writeLine(55), empty(),
    p("3. Was macht er am Wochenende mit Freunden?"),
    writeLine(55), empty(),
    p("4. Welches Spielzeug hat er?"),
    writeLine(55), empty(),
    empty(),

    // Aufgabe 3: Kategorien (6P)
    h2("Aufgabe 3: Sortiere! (6 Punkte)"),
    pBold("Schreib in die richtige Spalte: tanzen / Fussball / Lego / lesen / Schwimmen / Puppe / malen / Tennis / Teddy"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Hobbys", { width: 3000 }), hCell("Sportarten", { width: 3000 }), hCell("Spielzeug", { width: 3000 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    // Aufgabe 4: Verb-Formen (8P)
    h2("Aufgabe 4: Verb-Formen ergaenzen (8 Punkte)"),
    pBold("Schreib die richtige Form des Verbs."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz", { width: 6500 }), hCell("Verb", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ich __________ gern Fussball."), dCell("spielen")] }),
        new TableRow({ children: [dCell("Er __________ jeden Dienstag im Park."), dCell("laufen")] }),
        new TableRow({ children: [dCell("Wir __________ am Wochenende Rad."), dCell("fahren")] }),
        new TableRow({ children: [dCell("Sie __________ sehr gut."), dCell("tanzen")] }),
        new TableRow({ children: [dCell("Ich __________ gern Buecher."), dCell("lesen")] }),
        new TableRow({ children: [dCell("Er __________ im Verein."), dCell("trainieren")] }),
        new TableRow({ children: [dCell("Wir __________ zusammen Karten."), dCell("spielen")] }),
        new TableRow({ children: [dCell("Sie __________ ein Schloss aus Lego."), dCell("bauen")] }),
      ],
    }),
    empty(),

    // Aufgabe 5: Freies Schreiben (8P)
    h2("Aufgabe 5: Schreib ueber deine Freizeit. (8 Punkte)"),
    pBold("Schreib 5-6 Saetze. Beantworte: Was machst du gern? Wann? Mit wem? Welchen Sport/welches Hobby hast du?"),
    empty(),
    ...writeLines(6, 55),

    // Aufgabe 6: Konversation (8P)
    h2("Aufgabe 6: Partnerinterview – Freizeit (8 Punkte)"),
    pBold("Frage deinen Partner / deine Partnerin und schreib die Antworten auf."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingshobby?"), dCell("")] }),
        new TableRow({ children: [dCell("Welchen Sport machst du gern?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsspielzeug?"), dCell("")] }),
        new TableRow({ children: [dCell("Spielst du in einem Verein?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du am Wochenende?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du lieber: drinnen oder draussen?"), dCell("")] }),
      ],
    }),
    empty(),

    // Selbstevaluation
    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... Hobbys auf Deutsch nennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Sportarten benennen und Saetze bilden."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Spielzeug mit Artikel nennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Verben richtig konjugieren (spielen, fahren, laufen)."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... ueber meine Freizeit sprechen."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

// ── LOESUNG ──────────────────────────────────────────────────────────────────
function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Spielen und Freizeit (LOESUNG)"),
    p("Gesamtpunkte: 42"),
    empty(),

    h2("Aufgabe 1: Lueckentext (10 Punkte – je 1 Punkt)"),
    bullet("1. Freizeit"),
    bullet("2. Hobby"),
    bullet("3. spielt ... Verein"),
    bullet("4. schwimmt"),
    bullet("5. spielen ... zusammen"),
    bullet("6. Lieblingssport"),
    bullet("7. Puppe"),
    empty(),

    h2("Aufgabe 2: Lesetext (6 Punkte – je 1,5 Punkte)"),
    bullet("1. Er ist 10 Jahre alt."),
    bullet("2. Er trainiert dienstags und donnerstags."),
    bullet("3. Sie spielen Fussball oder fahren Rad."),
    bullet("4. Er hat Lego, ein Puzzle und viele Karten."),
    empty(),

    h2("Aufgabe 3: Kategorien (6 Punkte – je 0,5 pro richtigem Wort)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Hobbys", { width: 3000 }), hCell("Sportarten", { width: 3000 }), hCell("Spielzeug", { width: 3000 })] }),
        new TableRow({ children: [dCell("tanzen, lesen, malen"), dCell("Fussball, Schwimmen, Tennis"), dCell("Lego, Puppe, Teddy")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Verb-Formen (8 Punkte – je 1 Punkt)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz", { width: 6500 }), hCell("Loesung", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ich __ gern Fussball."), dCell("spiele")] }),
        new TableRow({ children: [dCell("Er __ jeden Dienstag im Park."), dCell("laeuft")] }),
        new TableRow({ children: [dCell("Wir __ am Wochenende Rad."), dCell("fahren")] }),
        new TableRow({ children: [dCell("Sie __ sehr gut."), dCell("tanzt")] }),
        new TableRow({ children: [dCell("Ich __ gern Buecher."), dCell("lese")] }),
        new TableRow({ children: [dCell("Er __ im Verein."), dCell("trainiert")] }),
        new TableRow({ children: [dCell("Wir __ zusammen Karten."), dCell("spielen")] }),
        new TableRow({ children: [dCell("Sie __ ein Schloss aus Lego."), dCell("baut")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 5: Freies Schreiben (8 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Inhalt vollstaendig (3P): Hobby + Sport + Spielzeug erwaehnt"),
    bullet("Grammatik (2P): Verbformen korrekt"),
    bullet("Wortschatz (2P): Vokabular aus dem Thema verwendet"),
    bullet("Saetze vollstaendig (1P): mind. 5 vollstaendige Saetze"),
    empty(),
    pBold("Musterantwort:"),
    pItalic("In meiner Freizeit spiele ich gern Fussball. Ich trainiere dienstags im Verein. Mein Lieblingshobby ist Lesen. Am Wochenende fahre ich mit meinem Vater Rad. Ich habe auch viel Spielzeug: Lego und Karten. Am liebsten spiele ich mit meinen Freunden."),
    empty(),

    h2("Aufgabe 6: Partnerinterview (8 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Verstaendliche Fragen gestellt (2P)"),
    bullet("Vollstaendige Antworten gegeben (2P)"),
    bullet("Korrekte Verbformen (2P)"),
    bullet("Wortschatz aus dem Thema verwendet (2P)"),
    empty(),

    h2("Notenspiegel (42 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2500 }), hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2000 })] }),
        new TableRow({ children: [dCell("40-42"), dCell("1 (sehr gut)"), dCell("28-33"), dCell("3 (befriedigend)")] }),
        new TableRow({ children: [dCell("35-39"), dCell("2 (gut)"), dCell("21-27"), dCell("4 (ausreichend)")] }),
        new TableRow({ children: [dCell("34 und weniger"), dCell("5/6 (nicht ausreichend)"), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle ABSCHLUSS: SpielenFreizeit");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
