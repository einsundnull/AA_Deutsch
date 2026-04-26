"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "10_Zuhause", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_Zuhause";
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
    h1("Abschlusstest – Zuhause"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 44"),
    empty(),

    h2("Aufgabe 1: Lueckentext (10 Punkte)"),
    pBold("Ergaenze die Saetze."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Kueche  -  Wohnzimmer  -  Badezimmer  -  Schlafzimmer  -  Bett  -  Schrank  -  Tisch  -  Regal  -  oben  -  kochen")],
      })]})],
    }),
    empty(),
    p("1. Mama __________________ jeden Abend in der __________________."),
    p("2. Wir schauen im __________________ zusammen fern."),
    p("3. Ich schlafe in meinem __________________ im __________________."),
    p("4. Die Kleider haengen im __________________."),
    p("5. Die Buecher stehen im __________________."),
    p("6. Wir essen am __________________ in der Kueche."),
    p("7. Das Badezimmer ist __________________, nicht unten."),
    empty(),

    h2("Aufgabe 2: Lies den Text und antworte. (8 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Ich heisse Mia und ich bin 8 Jahre alt. Ich wohne mit meiner Familie in einer Wohnung."),
          p("Unsere Wohnung hat fuenf Raeume: eine Kueche, ein Wohnzimmer, zwei Schlafzimmer und ein Badezimmer."),
          p("Ich habe mein eigenes Zimmer. Es ist nicht gross, aber sehr gemuetlich."),
          p("In meinem Zimmer stehen ein Bett, ein Schreibtisch und ein Regal mit vielen Buechern."),
          p("Mein Lieblingsraum ist das Wohnzimmer, weil wir dort zusammen sitzen und spielen."),
        ],
      })]})],
    }),
    empty(),
    p("1. Wo wohnt Mia? (Haus oder Wohnung?)"),
    writeLine(55), empty(),
    p("2. Wie viele Raeume hat die Wohnung?"),
    writeLine(55), empty(),
    p("3. Was steht in Mias Zimmer?"),
    writeLine(55), empty(),
    p("4. Was ist Mias Lieblingsraum und warum?"),
    writeLine(55), empty(),

    h2("Aufgabe 3: Wo steht das Moebel? Schreib den Raum. (6 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 3500 }), hCell("Raum", { width: 6000 })] }),
        new TableRow({ children: [dCell("die Badewanne"), dCell("")] }),
        new TableRow({ children: [dCell("der Kuehlschrank"), dCell("")] }),
        new TableRow({ children: [dCell("das Sofa"), dCell("")] }),
        new TableRow({ children: [dCell("der Schreibtisch"), dCell("")] }),
        new TableRow({ children: [dCell("das Bett"), dCell("")] }),
        new TableRow({ children: [dCell("der Fernseher"), dCell("")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Praeposition – Wo ist es? (8 Punkte)"),
    pBold("Ergaenze: auf / in / an / neben / unter"),
    empty(),
    p("1. Das Buch liegt ________ dem Tisch."),
    p("2. Die Kleider haengen ________ dem Schrank."),
    p("3. Das Poster haengt ________ der Wand."),
    p("4. Der Stuhl steht ________ dem Schreibtisch."),
    p("5. Der Ball liegt ________ dem Bett."),
    p("6. Die Lampe steht ________ dem Bett."),
    p("7. Der Kuehlschrank steht ________ der Kueche."),
    p("8. Die Schuhe stehen ________ dem Schrank."),
    empty(),

    h2("Aufgabe 5: Schreib ueber dein Zuhause. (6 Punkte)"),
    pBold("Schreib 5-6 Saetze: Wo wohnst du? Wie viele Raeume? Was steht in deinem Zimmer?"),
    empty(),
    ...writeLines(6, 55),

    h2("Aufgabe 6: Partnerinterview (6 Punkte)"),
    pBold("Frag und schreib die Antworten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wohnst du in einem Haus oder einer Wohnung?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsraum?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du ein eigenes Zimmer?"), dCell("")] }),
        new TableRow({ children: [dCell("Was steht in deinem Zimmer?"), dCell("")] }),
      ],
    }),
    empty(),

    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... Raeume im Haus mit Artikel nennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Moebel benennen und dem Raum zuordnen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... sagen, wo etwas ist (Praepositionen)."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... mein Zimmer auf Deutsch beschreiben."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... ueber mein Zuhause sprechen."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Zuhause (LOESUNG)"),
    p("Gesamtpunkte: 44"),
    empty(),

    h2("Aufgabe 1: Lueckentext (10 Punkte – je 1 Punkt)"),
    bullet("1. kocht ... Kueche"), bullet("2. Wohnzimmer"),
    bullet("3. Bett ... Schlafzimmer"), bullet("4. Schrank"),
    bullet("5. Regal"), bullet("6. Tisch"), bullet("7. oben"),
    empty(),

    h2("Aufgabe 2: Lesetext (8 Punkte – je 2 Punkte)"),
    bullet("1. Mia wohnt in einer Wohnung."),
    bullet("2. Die Wohnung hat fuenf Raeume."),
    bullet("3. In Mias Zimmer stehen ein Bett, ein Schreibtisch und ein Regal."),
    bullet("4. Ihr Lieblingsraum ist das Wohnzimmer, weil sie dort zusammen sitzt und spielt."),
    empty(),

    h2("Aufgabe 3: Raum (6 Punkte – je 1 Punkt)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 3500 }), hCell("Raum", { width: 6000 })] }),
        new TableRow({ children: [dCell("die Badewanne"), dCell("das Badezimmer")] }),
        new TableRow({ children: [dCell("der Kuehlschrank"), dCell("die Kueche")] }),
        new TableRow({ children: [dCell("das Sofa"), dCell("das Wohnzimmer")] }),
        new TableRow({ children: [dCell("der Schreibtisch"), dCell("das Kinderzimmer / Buero")] }),
        new TableRow({ children: [dCell("das Bett"), dCell("das Schlafzimmer / Kinderzimmer")] }),
        new TableRow({ children: [dCell("der Fernseher"), dCell("das Wohnzimmer")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Praeposition (8 Punkte – je 1 Punkt)"),
    bullet("1. auf"), bullet("2. in"), bullet("3. an"), bullet("4. neben"),
    bullet("5. unter"), bullet("6. neben"), bullet("7. in"), bullet("8. neben / unter"),
    empty(),

    h2("Aufgabe 5: Freies Schreiben (6 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Wohnform korrekt genannt (1P)"),
    bullet("Anzahl Raeume korrekt (1P)"),
    bullet("Zimmer-Beschreibung mit Moebeln (2P)"),
    bullet("Praepositionen korrekt verwendet (1P)"),
    bullet("5-6 vollstaendige Saetze (1P)"),
    empty(),
    pBold("Musterantwort:"),
    pItalic("Ich wohne in einem Haus. Es hat sechs Raeume. Unten gibt es die Kueche und das Wohnzimmer. Oben sind drei Schlafzimmer und das Badezimmer. In meinem Zimmer stehen ein Bett und ein Schreibtisch. Das Regal haengt an der Wand."),
    empty(),

    h2("Aufgabe 6: Partnerinterview (6 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Fragen korrekt gestellt (1P)"),
    bullet("Vollstaendige Antworten (2P)"),
    bullet("Korrekte Verbformen (2P)"),
    bullet("Thema-Wortschatz (1P)"),
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

console.log("Erstelle ABSCHLUSS: Zuhause");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
