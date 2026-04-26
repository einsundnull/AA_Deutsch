"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "02_Familie", "01_Familienmitglieder");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
      text: "",
      alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 720, hanging: 360 } },
        run: { font: "Symbol" }
      }
    }]
  }]
};

function docHeader() {
  return new Header({ children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({
        text: "A1 Kinder -- Familie -- Familienmitglieder",
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
        new TextRun({ text: "Seite ",                     color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ children: [PageNumber.CURRENT],     color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ text: " von ",                      color: GRAY, size: 18, font: "Arial" }),
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
function p(text, opts) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))]
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
function br()          { return new Paragraph({ children: [new PageBreak()] }); }

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

function hCell(text) {
  return new TableCell({
    width: { size: 0, type: WidthType.AUTO },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })]
  });
}
function dCell(text, opts) {
  return new TableCell({
    width: { size: 0, type: WidthType.AUTO },
    shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] })]
  });
}

const TOPIC = "A1_Kinder_Familie_01_Familienmitglieder";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Familienmitglieder"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Ergaenze die Saetze."),
    p("Benutze: mein / meine"),
    empty(),
    p("a)  Das ist _______ Vater. Er heisst Klaus."),
    p("b)  Das ist _______ Mutter. Sie heisst Petra."),
    p("c)  Das ist _______ Bruder. Er heisst Jan."),
    p("d)  Das ist _______ Schwester. Sie heisst Lena."),
    p("e)  Das sind _______ Grosseltern."),
    empty(),
    h2("Aufgabe 2: Schreibe die Fragen und Antworten."),
    p("Schau auf die Informationen. Schreibe Fragen und Antworten."),
    empty(),
    pBold("Beispiel:  Tom (Bruder von Anna)"),
    p("Frage:   Wer ist Tom?"),
    p("Antwort: Tom ist mein Bruder."),
    empty(),
    pBold("a)  Sara (Schwester von Max)"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("b)  Karl (Vater von Lena)"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("c)  Maria (Grossmutter von Tim)"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    br(),
    h2("Aufgabe 3: Ergaenze die Luecken."),
    empty(),
    p("a)  Mein __________________ und meine __________________ sind meine Eltern."),
    p("b)  Meine __________________ und mein __________________ sind meine Grosseltern."),
    p("c)  Mein Bruder und meine __________________ sind meine __________________."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 4-5 Saetze über deine Familie. Wer ist in deiner Familie?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibübung Familienmitglieder"),
    pItalic("Hinweis: Individuelle Antworten bei Aufgabe 4 akzeptieren."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Das ist [mein] Vater."),
    p("b) Das ist [meine] Mutter."),
    p("c) Das ist [mein] Bruder."),
    p("d) Das ist [meine] Schwester."),
    p("e) Das sind [meine] Grosseltern."),
    empty(),
    h2("Aufgabe 2"),
    pBold("a) Sara (Schwester von Max)"),
    p("Frage:   Wer ist Sara?"),
    p("Antwort: Sara ist meine Schwester."),
    empty(),
    pBold("b) Karl (Vater von Lena)"),
    p("Frage:   Wer ist Karl?"),
    p("Antwort: Karl ist mein Vater."),
    empty(),
    pBold("c) Maria (Grossmutter von Tim)"),
    p("Frage:   Wer ist Maria?"),
    p("Antwort: Maria ist meine Grossmutter."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Mein [Vater] und meine [Mutter] sind meine Eltern."),
    p("b) Meine [Grossmutter] und mein [Grossvater] sind meine Grosseltern."),
    p("c) Mein Bruder und meine [Schwester] sind meine [Geschwister]."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("mein/meine korrekt nach Genus verwendet"),
    bullet("Familienwoerter korrekt eingesetzt"),
    bullet("Satzstruktur: Das ist mein/meine ... Er/Sie heisst ..."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

// ============================================================================
// LESEN
// ============================================================================
async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Familienmitglieder"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Emmas Familie"),
    p("Hallo! Ich heisse Emma. Ich bin 9 Jahre alt. Ich wohne in Koeln. Meine Familie ist nicht so gross.", { size: 26 }),
    p("Mein Vater heisst Robert. Er ist 38 Jahre alt. Meine Mutter heisst Anna. Sie ist 36 Jahre alt.", { size: 26 }),
    p("Ich habe einen Bruder. Er heisst Tim. Tim ist 12 Jahre alt. Ich habe keine Schwester.", { size: 26 }),
    p("Meine Grossmutter heisst Helga. Sie wohnt in Hamburg. Mein Grossvater heisst Walter. Er wohnt auch in Hamburg.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Emma ist 9 Jahre alt.                          R  /  F"),
    p("b)  Der Vater heisst Walter.                       R  /  F"),
    p("c)  Emma hat eine Schwester.                       R  /  F"),
    p("d)  Tim ist Emmas Bruder.                          R  /  F"),
    p("e)  Die Grosseltern wohnen in Hamburg.             R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wie heisst Emmas Mutter?"),
    writeLine(), empty(),
    p("b)  Wie alt ist Emmas Bruder?"),
    writeLine(), empty(),
    p("c)  Wo wohnen Emmas Grosseltern?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Suche im Text."),
    p("Schreibe alle Familienwoerter aus dem Text auf."),
    empty(),
    pBold("Familienwoerter:"),
    ...writeLines(3), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Familienmitglieder"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Der Vater heisst Robert. (Walter ist der Grossvater.)"),
    p("c) F  Emma hat keine Schwester."),
    p("d) R"),
    p("e) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Emmas Mutter heisst Anna."),
    p("b) Emmas Bruder ist 12 Jahre alt."),
    p("c) Emmas Grosseltern wohnen in Hamburg."),
    empty(),
    h2("Aufgabe 3"),
    p("Familienwoerter im Text: Familie, Vater, Mutter, Bruder, Schwester, Grossmutter, Grossvater, Grosseltern"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["Mutter", "Vater", "Bruder", "Schwester", "Oma", "Opa", "Eltern", "Grosseltern", "Familie", "heisst", "hat", "ist"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Familienmitglieder"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: Array(6).fill(1500),
      rows: [
        new TableRow({ children: woerter.slice(0, 6).map(function(w) {
          return new TableCell({
            width: { size: 1500, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
          });
        })}),
        new TableRow({ children: woerter.slice(6).map(function(w) {
          return new TableCell({
            width: { size: 1500, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
          });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1.  Das ist meine ______________. Sie heisst Petra."),
    p("2.  Das ist mein ______________. Er heisst Klaus."),
    p("3.  Meine ______________ und mein Vater sind meine ______________."),
    p("4.  Mein ______________ heisst Tom. Er ist 14 Jahre alt."),
    p("5.  Meine ______________ heisst Lena. Sie ist 8 Jahre alt."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Wer ist das?"),
    p("B:  Das ist meine ______________, Maria."),
    p("A:  Und wer ist der Mann neben ihr?"),
    p("B:  Das ist mein ______________, Hans. Das sind meine ______________."),
    p("A:  Hast du auch Geschwister?"),
    p("B:  Ja! Ich ______________ einen Bruder. Er ______________ Leon."),
    empty(),
    br(),
    h2("Teil 3: Schreibe über deine Familie."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Mein Vater heisst __________________. Meine Mutter heisst __________________."),
    p("Ich habe __________________ Geschwister."),
    p("Meine __________________ heissen __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Familienmitglieder"),
    empty(),
    h2("Teil 1"),
    p("1.  Das ist meine [Mutter]. Sie heisst Petra."),
    p("2.  Das ist mein [Vater]. Er heisst Klaus."),
    p("3.  Meine [Mutter] und mein Vater sind meine [Eltern]."),
    p("4.  Mein [Bruder] heisst Tom. Er ist 14 Jahre alt."),
    p("5.  Meine [Schwester] heisst Lena. Sie ist 8 Jahre alt."),
    empty(),
    p("(Ablenkwoerter: Oma, Opa, Grosseltern, Familie nicht benoetigt.)"),
    empty(),
    h2("Teil 2"),
    p("A:  Wer ist das?"),
    p("B:  Das ist meine [Oma], Maria."),
    p("A:  Und wer ist der Mann neben ihr?"),
    p("B:  Das ist mein [Opa], Hans. Das sind meine [Grosseltern]."),
    p("A:  Hast du auch Geschwister?"),
    p("B:  Ja! Ich [habe] einen Bruder. Er [heisst] Leon."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ============================================================================
// WORTLISTE
// ============================================================================
const wortEintraege = [
  { wort: "die Familie",            wortart: "Nomen (f)",      beispiel: "Meine Familie ist gross." },
  { wort: "die Mutter",             wortart: "Nomen (f)",      beispiel: "Das ist meine Mutter." },
  { wort: "der Vater",              wortart: "Nomen (m)",      beispiel: "Mein Vater heisst Klaus." },
  { wort: "die Eltern",             wortart: "Nomen (Plural)", beispiel: "Meine Eltern wohnen in Berlin." },
  { wort: "der Bruder",             wortart: "Nomen (m)",      beispiel: "Ich habe einen Bruder." },
  { wort: "die Schwester",          wortart: "Nomen (f)",      beispiel: "Meine Schwester heisst Lena." },
  { wort: "die Geschwister",        wortart: "Nomen (Plural)", beispiel: "Ich habe zwei Geschwister." },
  { wort: "die Grossmutter / Oma",  wortart: "Nomen (f)",      beispiel: "Meine Oma wohnt in Hamburg." },
  { wort: "der Grossvater / Opa",   wortart: "Nomen (m)",      beispiel: "Mein Opa ist 70 Jahre alt." },
  { wort: "die Grosseltern",        wortart: "Nomen (Plural)", beispiel: "Ich besuche meine Grosseltern." },
  { wort: "die Tante",              wortart: "Nomen (f)",      beispiel: "Meine Tante heisst Bettina." },
  { wort: "der Onkel",              wortart: "Nomen (m)",      beispiel: "Mein Onkel heisst Frank." },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach(function(e, i) {
    rows.push(empty());
    rows.push(new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispielsatz", bold: true, size: 22, font: "Arial" })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wort, bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wortart, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.beispiel, size: 24, font: "Arial", italics: true })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Uebersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }),
        ]}),
      ]
    }));
    if (i === 5) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Familienmitglieder"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Familienmitglieder"),
    pItalic("Hinweis: Uebersetzungen sind individuell und abhaengig von der Muttersprache."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("mein (mask./neutr.) vs. meine (fem./Plural): auf Genus achten."),
    bullet("Grossmutter / Oma: beide Formen einfuehren, Oma ist informell."),
    bullet("Geschwister hat keinen Singular (Sammelwort)."),
    bullet("Tante/Onkel koennen optional eingefuehrt werden."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

// ============================================================================
// KONVERSATION
// ============================================================================
async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Familienmitglieder"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Familie vorstellen"),
    p("Schau auf das Familienbild. Ergaenze den Dialog."),
    empty(),
    p("A:  Wer ist das?"),
    p("B:  Das ist meine __________. Sie heisst __________."),
    p("A:  Und der Mann? Wer ist das?"),
    p("B:  Das ist mein __________. Er heisst __________."),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe __________. Er/Sie heisst __________."),
    p("   / Nein, ich habe keine Geschwister."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Grosseltern"),
    p("A:  Wie heissen deine Grosseltern?"),
    p("B:  Meine Oma heisst __________. Mein Opa heisst __________."),
    p("A:  Wo wohnen sie?"),
    p("B:  Sie wohnen in __________."),
    p("A:  Besuchst du sie oft?"),
    p("B:  Ja / Nein, __________________________________________"),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wie viele Personen sind in deiner Familie?"),
    writeLine(), empty(),
    p("2.  Wie heisst dein Vater / deine Mutter?"),
    writeLine(), empty(),
    p("3.  Hast du Geschwister? Wie heissen sie?"),
    writeLine(), empty(),
    p("4.  Hast du Tanten oder Onkel?"),
    writeLine(), empty(),
    p("5.  Was magst du an deiner Familie?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Familien-Staffette"),
    p("Steh auf und frage 3 Mitschueler: Wer ist in deiner Familie? Notiere die Antworten."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Familienmitglieder")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Familienmitglieder"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Wer ist das?"),
    p("B:  Das ist meine [Mutter]. Sie heisst [Anna]."),
    p("A:  Und der Mann? Wer ist das?"),
    p("B:  Das ist mein [Vater]. Er heisst [Robert]."),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe [einen Bruder]. Er heisst [Tim]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Korrekte Verwendung: Das ist mein/meine ..."),
    bullet("Genus beachtet: mein (Vater, Bruder, Opa) vs. meine (Mutter, Schwester, Oma)"),
    bullet("Pronomen korrekt: Er heisst .../Sie heisst ..."),
    bullet("Kommuniziert verstaendlich"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

// ============================================================================
// BILDAUFGABEN
// ============================================================================
async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Familienmitglieder"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Familienfoto mit 5 Personen: Vater, Mutter, Grossmutter, Grossvater, Kind]"),
    empty(),
    p("Wer ist wer? Schreibe unter jede Person das passende Wort."),
    p("Woerter: der Vater  |  die Mutter  |  die Grossmutter  |  der Grossvater  |  das Kind"),
    empty(),
    p("Person 1: ____________________"),
    p("Person 2: ____________________"),
    p("Person 3: ____________________"),
    p("Person 4: ____________________"),
    p("Person 5: ____________________"),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Stammbaum / Familienstammbaum mit leeren Feldern]"),
    empty(),
    p("Schreibe die richtigen Woerter in den Stammbaum."),
    p("Benutze: Grossvater, Grossmutter, Vater, Mutter, Bruder, Schwester, Ich"),
    ...writeLines(2), empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Zwei Kinder (Bruder und Schwester) mit Sprechblasen]"),
    empty(),
    p("Was sagen die Kinder? Ergaenze die Sprechblasen."),
    p("Kind 1 sagt: Das ist meine ____________________"),
    p("Kind 2 sagt: Das ist mein ____________________"),
    ...writeLines(2), empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Grosseltern mit Enkeln beim Spielen]"),
    empty(),
    p("Schreibe 2 Saetze ueber das Bild. Wer ist das?"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne deine Familie."),
    p("Zeichne deine Familie. Beschrifte jede Person."),
    ...writeLines(6), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Familienmitglieder"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Antwort abhaengig von den Positionen der Personen im Foto."),
    p("Erwartet: korrekte Familienwoerter mit Artikel (der/die)."),
    empty(),
    h2("Aufgabe 2"),
    p("Stammbaum-Loesung haengt vom eingefuegten Bild ab."),
    p("Erwartet: Grossvater/Grossmutter oben, Vater/Mutter Mitte, Kinder unten."),
    empty(),
    h2("Aufgabe 3"),
    p("Beispiel: Kind 1: Das ist meine Schwester."),
    p("          Kind 2: Das ist mein Bruder."),
    p("Individuelle Variationen akzeptieren."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Das sind meine Grosseltern. Sie spielen mit den Enkeln."),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Beschriftung auf Korrektheit pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("mein vs. meine nach Genus kontrollieren (haeufiger Fehler bei A1)."),
    bullet("Stammbaum-Aufgabe foerdert das Verstehen von Familienbeziehungen."),
    bullet("Eigene Familie als Thema motiviert Schueler."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

// ============================================================================
// MAIN
// ============================================================================
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

main().catch(function(err) { console.error(err); process.exit(1); });
