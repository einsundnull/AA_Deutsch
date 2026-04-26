"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "01_SichVorstellen", "02_Alter");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Constants ────────────────────────────────────────────────────────────────
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";

const PAGE_PROPS = {
  page: {
    size:   { width: 11906, height: 16838 },
    margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }
  }
};

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: "",
      alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 720, hanging: 360 } },
        run: { font: "Symbol" }
      }
    }]
  }]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function docHeader() {
  return new Header({ children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({
        text: "A1 Kinder — Sich selbst vorstellen — Alter",
        italics: true, color: GRAY, size: 18, font: "Arial"
      })]
    })
  ]});
}

function docFooter() {
  return new Footer({ children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Seite ",            color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ children: [PageNumber.CURRENT], color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ text: " von ",             color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" }),
      ]
    })
  ]});
}

function makeDoc(children) {
  return new Document({
    numbering: NUMBERING,
    sections: [{ properties: PAGE_PROPS,
      headers: { default: docHeader() },
      footers: { default: docFooter() },
      children
    }]
  });
}

async function save(doc, filename) {
  const buf  = await Packer.toBuffer(doc);
  const dest = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(dest, buf);
  console.log("OK  " + filename);
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })]
  });
}
function h2(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })]
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 24, font: "Arial", ...opts })]
  });
}
function pBold(text)   { return p(text, { bold: true }); }
function pItalic(text) { return p(text, { italics: true }); }
function empty()       { return new Paragraph({ children: [new TextRun("")] }); }

function writeLine() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } },
    spacing: { before: 240, after: 0 },
    children: [new TextRun("")]
  });
}
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }

function br() { return new Paragraph({ children: [new PageBreak()] }); }

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: 24, font: "Arial" })]
  });
}

function studentHead() {
  return new Table({
    width:        { size: 9000, type: WidthType.DXA },
    columnWidths: [4500, 4500],
    rows: [new TableRow({ children: [
      new TableCell({
        width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Name: _________________________________")]
      }),
      new TableCell({
        width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Datum: ________________________________")]
      })
    ]})]
  });
}

function wortlisteTable(entries) {
  const hCell = (text) => new TableCell({
    width: { size: 0, type: WidthType.AUTO },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })]
  });
  const dCell = (text, opts = {}) => new TableCell({
    width: { size: 0, type: WidthType.AUTO },
    shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun({ text, size: 24, font: "Arial", ...opts })] })]
  });

  const headerRow = new TableRow({
    tableHeader: true,
    children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispielsatz")]
  });
  const dataRows = entries.map(e => new TableRow({ children: [
    dCell(e.wort, { bold: true }),
    dCell(e.wortart),
    dCell(e.beispiel, { italics: true })
  ]}));

  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [2600, 2000, 4400],
    rows: [headerRow, ...dataRows]
  });
}

// ─── Übungsinhalte ────────────────────────────────────────────────────────────

const TOPIC    = "A1_Kinder_SichVorstellen_02_Alter";

// ══════════════════════════════════════════════════════════════════════════════
// 1. SCHREIBÜBUNG
// ══════════════════════════════════════════════════════════════════════════════
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),

    h2("Aufgabe 1: Schreibe einen Satz."),
    p("Wie alt bist du?"),
    ...writeLines(3), empty(),

    h2("Aufgabe 2: Schreibe Sätze."),
    p("Schau auf die Informationen. Schreibe Fragen und Antworten."),
    empty(),
    pBold("Beispiel:  Max — 8 Jahre alt"),
    p("Frage:   Wie alt ist Max?"),
    p("Antwort: Er ist 8 Jahre alt."),
    empty(),
    pBold("a)  Lisa — 12 Jahre alt"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("b)  Ben — 6 Jahre alt"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("c)  Sofia — 15 Jahre alt"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),

    h2("Aufgabe 3: Schreibe die Zahlen als Wörter."),
    empty(),
    p("8   = ________________________"),
    p("11  = ________________________"),
    p("14  = ________________________"),
    p("17  = ________________________"),
    p("20  = ________________________"),
    empty(),

    br(),

    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3–5 Sätze. Wie alt bist du? Wie alt sind deine Freunde oder Geschwister?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Schreibübung: Alter sagen und erfragen"),
    pItalic("Hinweis für Lehrende: Individuelle Antworten akzeptieren, wenn Struktur und Niveau stimmen."),
    empty(),

    h2("Aufgabe 1 — Beispielantwort"),
    p("Ich bin 11 Jahre alt."),
    empty(),

    h2("Aufgabe 2 — Lösungen"),
    pBold("a)  Lisa — 12 Jahre alt"),
    p("Frage:   Wie alt ist Lisa?"),
    p("Antwort: Sie ist 12 Jahre alt."),
    empty(),
    pBold("b)  Ben — 6 Jahre alt"),
    p("Frage:   Wie alt ist Ben?"),
    p("Antwort: Er ist 6 Jahre alt."),
    empty(),
    pBold("c)  Sofia — 15 Jahre alt"),
    p("Frage:   Wie alt ist Sofia?"),
    p("Antwort: Sie ist 15 Jahre alt."),
    empty(),

    h2("Aufgabe 3 — Zahlen als Wörter"),
    p("8   = acht"),
    p("11  = elf"),
    p("14  = vierzehn"),
    p("17  = siebzehn"),
    p("20  = zwanzig"),
    empty(),

    h2("Aufgabe 4 — Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Bewertungskriterien:"),
    bullet("Richtige Verwendung von „Ich bin ... Jahre alt.“"),
    bullet("Richtige Verwendung von „Er/Sie ist ... Jahre alt.“"),
    bullet("Zahlen korrekt geschrieben (als Ziffer oder Wort)"),
    bullet("A1-Niveau: keine komplexen Strukturen erwartet"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. LESEÜBUNG
// ══════════════════════════════════════════════════════════════════════════════
async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),

    h2("Lesetext: Meine Klasse"),
    p("Hallo! Ich heiße Mia. Ich bin 9 Jahre alt. Mein Freund heißt Jonas. Er ist 10 Jahre alt. Meine Freundin heißt Layla. Sie ist auch 9 Jahre alt.", { size: 26 }),
    p("Mein Bruder heißt Finn. Er ist 6 Jahre alt. Er geht noch nicht in die Schule. Meine Lehrerin heißt Frau Braun. Sie ist 35 Jahre alt. Wir mögen unsere Klasse!", { size: 26 }),
    empty(),

    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    p("Kreise die richtige Antwort ein."),
    empty(),
    p("a)  Mia ist 10 Jahre alt.                          R  /  F"),
    p("b)  Jonas ist 10 Jahre alt.                        R  /  F"),
    p("c)  Layla ist 8 Jahre alt.                         R  /  F"),
    p("d)  Finn ist 6 Jahre alt.                          R  /  F"),
    p("e)  Frau Braun ist 35 Jahre alt.                   R  /  F"),
    empty(),

    h2("Aufgabe 2: Beantworte die Fragen. Schreibe ganze Sätze."),
    empty(),
    p("a)  Wie alt ist Mia?"),
    writeLine(), empty(),
    p("b)  Wie alt ist Jonas?"),
    writeLine(), empty(),
    p("c)  Wie alt ist Mias Bruder?"),
    writeLine(), empty(),
    p("d)  Wie alt ist Frau Braun?"),
    writeLine(), empty(),

    br(),

    h2("Aufgabe 3: Verbinde. Wer ist wie alt?"),
    p("Verbinde den Namen mit dem richtigen Alter."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 600, 5400],
      rows: [
        ["Mia",       "6 Jahre alt"],
        ["Jonas",     "9 Jahre alt"],
        ["Layla",     "9 Jahre alt"],
        ["Finn",      "10 Jahre alt"],
        ["Frau Braun","35 Jahre alt"],
      ].map(([name, age]) => new TableRow({ children: [
        new TableCell({
          width: { size: 3000, type: WidthType.DXA },
          shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [p(name)]
        }),
        new TableCell({
          width: { size: 600, type: WidthType.DXA },
          shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [p("―――")]
        }),
        new TableCell({
          width: { size: 5400, type: WidthType.DXA },
          shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [p(age)]
        }),
      ]}))
    }),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Leseübung: Alter sagen und erfragen"),
    empty(),

    h2("Aufgabe 1"),
    p("a) F  —  Mia ist 9 Jahre alt."),
    p("b) R  —  Jonas ist 10 Jahre alt."),
    p("c) F  —  Layla ist 9 Jahre alt."),
    p("d) R  —  Finn ist 6 Jahre alt."),
    p("e) R  —  Frau Braun ist 35 Jahre alt."),
    empty(),

    h2("Aufgabe 2"),
    p("a) Mia ist 9 Jahre alt."),
    p("b) Jonas ist 10 Jahre alt."),
    p("c) Mias Bruder (Finn) ist 6 Jahre alt."),
    p("d) Frau Braun ist 35 Jahre alt."),
    empty(),

    h2("Aufgabe 3 — Verbinden"),
    p("Mia       →  9 Jahre alt"),
    p("Jonas     →  10 Jahre alt"),
    p("Layla     →  9 Jahre alt"),
    p("Finn      →  6 Jahre alt"),
    p("Frau Braun →  35 Jahre alt"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Lesen_LOESUNG.docx`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. LÜCKENTEXT
// ══════════════════════════════════════════════════════════════════════════════
async function luecken() {
  const children = [
    studentHead(), empty(),
    h1("Lückentext — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),

    h2("Wörterkasten"),
    p("Achtung: Es gibt mehr Wörter als Lücken!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [1125, 1125, 1125, 1125, 1125, 1125, 1125, 1125],
      rows: [new TableRow({ children: [
        "alt", "bin", "ist", "Jahre", "Wie", "bist", "Sie", "zwölf", "Er", "heiße"
      ].slice(0, 8).map(w => new TableCell({
        width: { size: 1125, type: WidthType.DXA },
        shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
      }))}),
      new TableRow({ children: [
        "alt", "bin", "ist", "Jahre", "Wie", "bist", "Sie", "zwölf", "Er", "heiße"
      ].slice(8).concat(["", "", "", "", "", "", ""]).slice(0, 8).map(w => new TableCell({
        width: { size: 1125, type: WidthType.DXA },
        shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
      }))}),
      ]
    }),
    empty(),

    h2("Teil 1: Ergänze die Sätze."),
    empty(),
    p("1.  Ich ______________ 8 Jahre alt."),
    p("2.  ______________ alt bist du?"),
    p("3.  Er ______________ 11 Jahre alt."),
    p("4.  Sie ist dreizehn ______________ alt."),
    p("5.  Ich ______________ Anna."),
    empty(),

    h2("Teil 2: Ergänze den Dialog."),
    empty(),
    p("A:  Wie alt ______________ du?"),
    p("B:  Ich bin 10 Jahre alt."),
    p("A:  Wie alt ______________ deine Schwester?"),
    p("B:  ______________ ist 7 Jahre alt."),
    p("A:  Ist dein Bruder ______________ Jahre alt?"),
    p("B:  Nein, er ist dreizehn Jahre alt."),
    empty(),

    br(),

    h2("Teil 3: Schreibe über dich."),
    p("Ergänze mit deinen eigenen Angaben:"),
    empty(),
    p("Ich heiße ____________________. Ich bin __________ Jahre alt."),
    empty(),
    p("Mein Freund / Meine Freundin heißt ____________________."),
    p("Er / Sie ist __________ Jahre alt."),
    empty(),
    ...writeLines(2),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Lückentext: Alter sagen und erfragen"),
    empty(),

    h2("Teil 1"),
    p("1.  Ich »bin« 8 Jahre alt."),
    p("2.  »Wie« alt bist du?"),
    p("3.  Er »ist« 11 Jahre alt."),
    p("4.  Sie ist dreizehn »Jahre« alt."),
    p("5.  Ich »heiße« Anna."),
    empty(),
    p("(Ablenkwörter: »Er« und »zwölf« wurden nicht benötigt.)"),
    empty(),

    h2("Teil 2"),
    p("A:  Wie alt »bist« du?"),
    p("B:  Ich bin 10 Jahre alt."),
    p("A:  Wie alt »ist« deine Schwester?"),
    p("B:  »Sie« ist 7 Jahre alt."),
    p("A:  Ist dein Bruder »zwölf« Jahre alt?"),
    p("B:  Nein, er ist dreizehn Jahre alt."),
    empty(),

    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    p("Bewertung: Richtige Verwendung von „Ich bin ... Jahre alt.“ und „Er/Sie ist ... Jahre alt.“"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Luecken_LOESUNG.docx`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. WORTLISTE
// ══════════════════════════════════════════════════════════════════════════════
const wortEintraege = [
  { wort: "das Alter",                  wortart: "Nomen (n)",   beispiel: "Wie ist dein Alter?" },
  { wort: "alt",                         wortart: "Adjektiv",    beispiel: "Ich bin 9 Jahre alt." },
  { wort: "das Jahr / die Jahre",        wortart: "Nomen (n)",   beispiel: "Ich bin zehn Jahre alt." },
  { wort: "Wie alt bist du?",            wortart: "Frage",       beispiel: "Wie alt bist du? — Ich bin 12." },
  { wort: "Ich bin ... Jahre alt.",      wortart: "Satz",        beispiel: "Ich bin sieben Jahre alt." },
  { wort: "Wie alt ist er / sie?",       wortart: "Frage",       beispiel: "Wie alt ist Max?" },
  { wort: "Er / Sie ist ... Jahre alt.", wortart: "Satz",        beispiel: "Er ist acht Jahre alt." },
  { wort: "der Geburtstag",              wortart: "Nomen (m)",   beispiel: "Heute ist mein Geburtstag!" },
  { wort: "jung",                        wortart: "Adjektiv",    beispiel: "Mein Bruder ist sehr jung." },
  { wort: "der Freund / die Freundin",   wortart: "Nomen",       beispiel: "Mein Freund ist 11 Jahre alt." },
  { wort: "Wir sind beide ...",          wortart: "Satz",        beispiel: "Wir sind beide neun Jahre alt." },
  { wort: "schätzen",              wortart: "Verb",        beispiel: "Ich schätze, er ist 30." },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach((e, i) => {
    rows.push(empty());
    rows.push(new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2600, 2000, 4400],
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ width: { size: 2600, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort / Phrase", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispielsatz", bold: true, size: 22, font: "Arial" })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wort, bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wortart, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.beispiel, size: 24, font: "Arial", italics: true })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Übersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }),
        ]}),
      ]
    }));
    if (i === 5) rows.push(br());
  });

  const children = [
    studentHead(), empty(),
    h1("Wortliste — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    p("Lerne die Wörter! Schreibe die Übersetzung in deine Sprache."),
    ...rows,
    empty(),
    p("→ Tipp: Schreibe die Wörter auf Lernkarten (Deutsch vorne, Übersetzung hinten)!"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Wortliste: Alter sagen und erfragen"),
    pItalic("Hinweis: Die Übersetzungen sind individuell — je nach Muttersprache der Schüler."),
    p("Die folgende Liste zeigt die deutschen Einträge zur Kontrolle."),
    empty(),
    wortlisteTable(wortEintraege),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Zahlen 1–20 sollten parallel geübt werden."),
    bullet("„alt“ ist Adjektiv, wird aber in „Jahre alt“ nicht flektiert."),
    bullet("„der Geburtstag“: passiv einführen, kein Fokus auf A1."),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. KONVERSATION
// ══════════════════════════════════════════════════════════════════════════════
async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),

    h2("Dialoggerüst 1: Ergänze den Dialog."),
    p("Fülle die Lücken aus und übe den Dialog mit deinem Partner / deiner Partnerin."),
    empty(),
    p("A:  Hallo! Wie __________ du?"),
    p("B:  Ich heiße __________.  Wie heißt du?"),
    p("A:  Ich heiße __________. Wie __________ bist du?"),
    p("B:  Ich bin __________ Jahre alt.  Und du?"),
    p("A:  Ich bin __________ Jahre alt."),
    empty(),
    pBold("→ Rollentausch! Partner A wird Partner B, Partner B wird Partner A."),
    empty(),

    h2("Dialoggerüst 2: Frage nach dem Alter anderer."),
    p("Fülle die Lücken aus und übe den Dialog."),
    empty(),
    p("A:  Wie alt ist __________?"),
    p("B:  __________ ist __________ Jahre alt."),
    p("A:  Ist __________ jünger oder älter als du?"),
    p("B:  __________ ist __________ als ich."),
    empty(),
    pBold("→ Rollentausch!"),
    empty(),

    br(),

    h2("Partnerinterview: Frage deinen Partner / deine Partnerin."),
    p("Schreibe die Antworten auf."),
    empty(),
    p("1.  Wie alt bist du?"),
    writeLine(), empty(),
    p("2.  Wie alt ist dein bester Freund / deine beste Freundin?"),
    writeLine(), empty(),
    p("3.  Wie alt ist dein Vater oder deine Mutter? (Schätze, wenn du nicht weißt!)"),
    writeLine(), empty(),
    p("4.  Wie alt möchtest du gerne sein? Warum?"),
    writeLine(), empty(),

    h2("Gruppenspiel: „Alters-Staffette“"),
    p("Steht in einem Kreis. Der erste Schüler / die erste Schülerin sagt sein/ihr Alter:"),
    p("\"Ich bin [Alter] Jahre alt.\""),
    p("Der nächste wiederholt das erste Alter und sagt sein eigenes:"),
    p("\"[Name 1] ist [Alter 1] Jahre alt. Ich bin [Alter 2] Jahre alt.\""),
    p("Wer ein Alter vergisst, scheidet aus. Wer hält am längsten durch?"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Konversation: Alter sagen und erfragen"),
    pItalic("Hinweis: Bei Konversation gibt es keine festen Antworten. Bewertung nach Kriterien."),
    empty(),

    h2("Dialoggerüst 1 — Beispiel"),
    p("A:  Hallo! Wie »heißt« du?"),
    p("B:  Ich heiße [Name]. Wie heißt du?"),
    p("A:  Ich heiße [Name]. Wie »alt« bist du?"),
    p("B:  Ich bin [Zahl] Jahre alt. Und du?"),
    p("A:  Ich bin [Zahl] Jahre alt."),
    empty(),

    h2("Dialoggerüst 2 — Beispiel"),
    p("A:  Wie alt ist [Name]?"),
    p("B:  [Er/Sie] ist [Zahl] Jahre alt."),
    p("A:  Ist [er/sie] jünger oder älter als du?"),
    p("B:  [Er/Sie] ist [jünger/älter] als ich."),
    empty(),
    p("Hinweis: „jünger / älter“ sind Komparativformen — bei A1 genügt es, wenn die Schüler eine sinnvolle Antwort geben."),
    empty(),

    h2("Partnerinterview — Bewertungskriterien"),
    bullet("Verwendet „Ich bin ... Jahre alt.“ korrekt"),
    bullet("Verwendet „Er/Sie ist ... Jahre alt.“ korrekt"),
    bullet("Zahlen korrekt (Ziffern oder Worte)"),
    bullet("Kommuniziert verständlich, auch wenn Fehler vorhanden"),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Konversation_LOESUNG.docx`);
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. BILDAUFGABEN
// ══════════════════════════════════════════════════════════════════════════════
async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben — Alter sagen und erfragen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingügt."),
    empty(),

    h2("Aufgabe 1"),
    p("[BILD 1: Eine Familie mit 5 Personen. Jede Person hat ein Schild mit ihrem Namen und Alter: Opa (75), Mama (40), Papa (42), Kind (10), Baby (1)]"),
    empty(),
    p("Schreibe Sätze. Wie alt ist jede Person?"),
    empty(),
    p("Der Opa ist __________ Jahre alt."),
    p("Die Mama ist __________ Jahre alt."),
    p("Der Papa ist __________ Jahre alt."),
    p("Das Kind ist __________ Jahre alt."),
    p("Das Baby ist __________ Jahr alt."),
    empty(),

    h2("Aufgabe 2"),
    p("[BILD 2: Vier Kinder auf einem Schulhof, jedes Kind hält ein Schild mit einer Zahl: 7, 9, 11, 13. Die Kinder heißen: Anna, Ben, Clara, David.]"),
    empty(),
    p("Verbinde den richtigen Namen mit dem richtigen Alter."),
    p("Schreibe dann Sätze."),
    empty(),
    p("Beispiel:  Anna ist 7 Jahre alt."),
    ...writeLines(4),
    empty(),

    br(),

    h2("Aufgabe 3"),
    p("[BILD 3: Ein Geburtstagskuchen mit Kerzen]"),
    empty(),
    p("Wie viele Kerzen sind auf dem Kuchen?"),
    p("Schreibe die Zahl als Wort."),
    empty(),
    p("__________ Kerzen  =  __________________________"),
    empty(),
    p("Schreibe einen Satz:  Das Kind ist __________ Jahre alt."),
    writeLine(),
    empty(),

    h2("Aufgabe 4"),
    p("[BILD 4: Ein Kind zeigt auf sich selbst. Neben dem Kind ist eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind? Schreibe in die Sprechblase."),
    empty(),
    p("Sprechblase: _______________________________________________"),
    writeLine(),
    empty(),

    h2("Aufgabe 5: Male und schreibe."),
    p("Zeichne deinen eigenen Geburtstagskuchen mit den richtigen Kerzen."),
    p("Schreibe darunter:"),
    empty(),
    p("Ich bin __________ Jahre alt."),
    ...writeLines(4),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG — Bildaufgaben: Alter sagen und erfragen"),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),

    h2("Aufgabe 1 — Erwartete Antworten"),
    p("(Abhängig von den Alterszahlen auf den Schildern im Bild.)"),
    bullet("Der Opa ist 75 Jahre alt."),
    bullet("Die Mama ist 40 Jahre alt."),
    bullet("Der Papa ist 42 Jahre alt."),
    bullet("Das Kind ist 10 Jahre alt."),
    bullet("Das Baby ist 1 Jahr alt.  ← Hinweis: „1 Jahr“ (Singular), nicht „Jahre“!"),
    empty(),

    h2("Aufgabe 2 — Hinweis"),
    p("Antworten hängen von den eingefügten Zahlen ab."),
    p("Erwartetes Satzformat: „[Name] ist [Zahl] Jahre alt.“"),
    empty(),

    h2("Aufgabe 3 — Hinweis"),
    p("Antwort hängt von der Kerzenanzahl im Bild ab."),
    p("Kontrolle: Ist die Zahl korrekt als Wort geschrieben?"),
    p("Beispiele: 8 = acht, 10 = zehn, 12 = zwölf"),
    empty(),

    h2("Aufgabe 4 — Sprechblase"),
    p("Erwarteter Inhalt z.B.: „Ich bin 8 Jahre alt!“ oder „Hallo, ich bin 10!“"),
    p("Individuelle Antworten akzeptieren, wenn die Kernstruktur stimmt."),
    empty(),

    h2("Aufgabe 5 — Freies Malen und Schreiben"),
    p("Individuelle Antwort. Bewertung: Stimmt die Kerzenanzahl mit dem angegebenen Alter überein?"),
    empty(),

    h2("Allgemeine Hinweise für Lehrende"),
    bullet("Auf den Unterschied „1 Jahr“ (Singular) vs. „2+ Jahre“ (Plural) hinweisen."),
    bullet("Zahlen 1–20 vor dieser Übung wiederholen."),
    bullet("Bilder können aus dem Internet oder selbst gezeichnet werden."),
    empty(),
  ];
  await save(makeDoc(children), `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Erstelle Dateien fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");

  await schreiben();
  await schreiben_L();
  await lesen();
  await lesen_L();
  await luecken();
  await luecken_L();
  await wortliste();
  await wortliste_L();
  await konversation();
  await konversation_L();
  await bildaufgaben();
  await bildaufgaben_L();

  console.log("");
  console.log("Fertig! 12 Dateien erstellt.");
}

main().catch(err => { console.error(err); process.exit(1); });
