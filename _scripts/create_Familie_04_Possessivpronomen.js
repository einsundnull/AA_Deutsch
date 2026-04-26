"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "02_Familie", "04_Possessivpronomen");
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
        text: "A1 Kinder -- Familie -- Possessivpronomen mein/meine",
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

const TOPIC = "A1_Kinder_Familie_04_Possessivpronomen";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Possessivpronomen mein / meine"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    p("Merke:  mein  (maskulin + neutrum)  |  meine  (feminin + Plural)", { bold: true }),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [2000, 3500, 3500],
      rows: [
        new TableRow({ children: [hCell("Artikel"), hCell("Nomen (Beispiel)"), hCell("Possessivpronomen")] }),
        new TableRow({ children: [dCell("der (mask.)"), dCell("der Vater, der Bruder, der Hund"), dCell("mein Vater, mein Bruder, mein Hund")] }),
        new TableRow({ children: [dCell("die (fem.)"),  dCell("die Mutter, die Schwester, die Katze"), dCell("meine Mutter, meine Schwester, meine Katze")] }),
        new TableRow({ children: [dCell("das (neutr.)"), dCell("das Kaninchen, das Haustier"), dCell("mein Kaninchen, mein Haustier")] }),
        new TableRow({ children: [dCell("Plural"),       dCell("die Eltern, die Geschwister"), dCell("meine Eltern, meine Geschwister")] }),
      ]
    }),
    empty(),
    h2("Aufgabe 1: mein oder meine?"),
    empty(),
    p("a)  Das ist _______ Vater.             (der Vater)"),
    p("b)  Das ist _______ Mutter.            (die Mutter)"),
    p("c)  Das ist _______ Bruder.            (der Bruder)"),
    p("d)  Das ist _______ Schwester.         (die Schwester)"),
    p("e)  Das ist _______ Hund.              (der Hund)"),
    p("f)  Das ist _______ Katze.             (die Katze)"),
    p("g)  Das ist _______ Kaninchen.         (das Kaninchen)"),
    p("h)  Das sind _______ Grosseltern.      (Plural)"),
    empty(),
    br(),
    h2("Aufgabe 2: Schreibe die Saetze."),
    p("Schreibe vollstaendige Saetze mit mein/meine."),
    empty(),
    pBold("Beispiel:  Opa / Hans"),
    p("Das ist mein Opa. Er heisst Hans."),
    empty(),
    pBold("a)  Schwester / Clara"),
    writeLine(), writeLine(), empty(),
    pBold("b)  Hund / Rocky"),
    writeLine(), writeLine(), empty(),
    pBold("c)  Grossmutter / Helga"),
    writeLine(), writeLine(), empty(),
    pBold("d)  Kaninchen / Flausch"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 3: Freies Schreiben"),
    p("Schreibe 5 Saetze ueber deine Familie und deine Haustiere. Benutze mein/meine."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibübung Possessivpronomen"),
    pItalic("Hinweis: Individuelle Antworten bei Aufgabe 3 akzeptieren."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Das ist [mein] Vater.       (mask. -> mein)"),
    p("b) Das ist [meine] Mutter.     (fem. -> meine)"),
    p("c) Das ist [mein] Bruder.      (mask. -> mein)"),
    p("d) Das ist [meine] Schwester.  (fem. -> meine)"),
    p("e) Das ist [mein] Hund.        (mask. -> mein)"),
    p("f) Das ist [meine] Katze.      (fem. -> meine)"),
    p("g) Das ist [mein] Kaninchen.   (neutr. -> mein)"),
    p("h) Das sind [meine] Grosseltern. (Plural -> meine)"),
    empty(),
    h2("Aufgabe 2"),
    pBold("a)"),
    p("Das ist meine Schwester. Sie heisst Clara."),
    empty(),
    pBold("b)"),
    p("Das ist mein Hund. Er heisst Rocky."),
    empty(),
    pBold("c)"),
    p("Das ist meine Grossmutter. Sie heisst Helga."),
    empty(),
    pBold("d)"),
    p("Das ist mein Kaninchen. Es heisst Flausch."),
    empty(),
    h2("Aufgabe 3 -- Bewertungskriterien"),
    bullet("mein bei maskulinen und neutralen Nomen"),
    bullet("meine bei femininen Nomen und Plural"),
    bullet("Pronomen nach Genus: er / sie / es"),
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
    h1("Leseübung: Possessivpronomen mein / meine"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Lukas stellt seine Familie vor"),
    p("Hallo! Ich heisse Lukas. Ich moechte euch meine Familie vorstellen.", { size: 26 }),
    p("Das ist mein Vater. Er heisst Stefan und ist 42 Jahre alt. Das ist meine Mutter. Sie heisst Julia und ist 39 Jahre alt. Mein Vater und meine Mutter sind meine Eltern.", { size: 26 }),
    p("Das ist mein Bruder. Er heisst Nico und ist 8 Jahre alt. Ich habe keine Schwester.", { size: 26 }),
    p("Das ist mein Hund. Er heisst Bruno. Mein Hund ist braun und sehr gross. Das ist meine Katze. Sie heisst Susi. Meine Katze ist grau. Mein Hund und meine Katze sind Freunde!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Lukas hat eine Schwester.                       R  /  F"),
    p("b)  Mein Bruder heisst Stefan.                      R  /  F"),
    p("c)  Die Mutter heisst Julia.                        R  /  F"),
    p("d)  Der Hund und die Katze sind Feinde.             R  /  F"),
    p("e)  Meine Katze ist grau.                           R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wie heisst Lukas' Bruder?"),
    writeLine(), empty(),
    p("b)  Wie alt ist Lukas' Vater?"),
    writeLine(), empty(),
    p("c)  Wie heissen Lukas' Haustiere?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Suche im Text alle mein/meine."),
    p("Schreibe alle Beispiele mit mein und meine auf."),
    empty(),
    pBold("mein + Nomen:"),
    ...writeLines(3), empty(),
    pBold("meine + Nomen:"),
    ...writeLines(3), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Possessivpronomen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) F  Lukas hat keine Schwester."),
    p("b) F  Mein Bruder heisst Nico. (Stefan ist der Vater.)"),
    p("c) R"),
    p("d) F  Der Hund und die Katze sind Freunde."),
    p("e) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Lukas' Bruder heisst Nico."),
    p("b) Lukas' Vater ist 42 Jahre alt."),
    p("c) Lukas' Haustiere heissen Bruno (Hund) und Susi (Katze)."),
    empty(),
    h2("Aufgabe 3 -- Loesung"),
    pBold("mein + Nomen (mask./neutr.):"),
    p("mein Vater | mein Bruder | mein Hund"),
    empty(),
    pBold("meine + Nomen (fem./Plural):"),
    p("meine Mutter | meine Eltern | meine Katze"),
    empty(),
    pItalic("(Satzkontext: Mein Vater und meine Mutter sind meine Eltern. -- zaehlt auch als 'meine Eltern')"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["mein", "meine", "dein", "deine", "Vater", "Mutter", "Bruder", "Schwester", "Hund", "Katze", "Kaninchen", "Eltern"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Possessivpronomen mein / meine"),
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
    h2("Teil 1: mein oder meine?"),
    empty(),
    p("1.  Das ist ______________ Opa. Er heisst Franz."),
    p("2.  Das ist ______________ Oma. Sie heisst Gerda."),
    p("3.  Das ist ______________ Hund. Er heisst Rex."),
    p("4.  Das ist ______________ Katze. Sie heisst Bella."),
    p("5.  Das sind ______________ Eltern."),
    p("6.  Das ist ______________ Kaninchen. Es heisst Schneeball."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog. (mein/meine und dein/deine)"),
    empty(),
    p("A:  Wer ist das?"),
    p("B:  Das ist ______________ Mutter."),
    p("A:  Und der Mann? Ist das ______________ Vater?"),
    p("B:  Ja! Das ist ______________ Vater. Er heisst Karl."),
    p("A:  Ist das ______________ Hund?"),
    p("B:  Ja! Das ist ______________ Hund Bruno. Und das ist ______________ Katze Susi."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber deine Familie."),
    p("Benutze mein/meine in jedem Satz:"),
    empty(),
    p("______________ Vater heisst __________________. ______________ Mutter heisst __________________."),
    p("______________ Bruder / ______________ Schwester heisst __________________."),
    p("______________ Haustier heisst __________________. Es ist __________________  (Tier)."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Possessivpronomen"),
    empty(),
    h2("Teil 1"),
    p("1.  Das ist [mein] Opa.       (mask. -> mein)"),
    p("2.  Das ist [meine] Oma.      (fem. -> meine)"),
    p("3.  Das ist [mein] Hund.      (mask. -> mein)"),
    p("4.  Das ist [meine] Katze.    (fem. -> meine)"),
    p("5.  Das sind [meine] Eltern.  (Plural -> meine)"),
    p("6.  Das ist [mein] Kaninchen. (neutr. -> mein)"),
    empty(),
    h2("Teil 2"),
    p("B:  Das ist [meine] Mutter."),
    p("A:  Ist das [dein] Vater?"),
    p("B:  Das ist [mein] Vater."),
    p("A:  Ist das [dein] Hund?"),
    p("B:  Das ist [mein] Hund Bruno. Das ist [meine] Katze Susi."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten -- Kontrolle auf mein/meine nach Genus."),
    empty(),
    h2("Hinweis: dein / deine"),
    p("dein funktioniert genauso wie mein: dein Vater, deine Mutter, dein Kaninchen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ============================================================================
// WORTLISTE
// ============================================================================
const wortEintraege = [
  { wort: "mein (mask./neutr.)",   wortart: "Possessivpron.", beispiel: "mein Vater, mein Kaninchen" },
  { wort: "meine (fem./Plural)",   wortart: "Possessivpron.", beispiel: "meine Mutter, meine Eltern" },
  { wort: "dein (mask./neutr.)",   wortart: "Possessivpron.", beispiel: "dein Bruder, dein Haustier" },
  { wort: "deine (fem./Plural)",   wortart: "Possessivpron.", beispiel: "deine Schwester, deine Eltern" },
  { wort: "Das ist mein ...",      wortart: "Satz",           beispiel: "Das ist mein Hund." },
  { wort: "Das ist meine ...",     wortart: "Satz",           beispiel: "Das ist meine Katze." },
  { wort: "Das sind meine ...",    wortart: "Satz",           beispiel: "Das sind meine Grosseltern." },
  { wort: "Ist das dein/deine ...?", wortart: "Frage",        beispiel: "Ist das dein Hund?" },
  { wort: "Wessen ... ist das?",   wortart: "Frage",          beispiel: "Wessen Hund ist das? -- Das ist mein Hund." },
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
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort / Phrase", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispiel", bold: true, size: 22, font: "Arial" })] })] }),
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
    if (i === 4) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Possessivpronomen mein / meine"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Formen! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe Beispielsaetze auf Lernkarten und uebe sie taeglich!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Possessivpronomen"),
    pItalic("Hinweis: Uebersetzungen sind individuell und abhaengig von der Muttersprache."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispiel")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Uebersichtstabelle fuer Lehrende"),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [1800, 2000, 2000, 3200],
      rows: [
        new TableRow({ children: [hCell("Genus"), hCell("Ich (mein-)"), hCell("Du (dein-)"), hCell("Beispiel")] }),
        new TableRow({ children: [dCell("maskulin"), dCell("mein"), dCell("dein"), dCell("mein/dein Vater, Hund, Bruder")] }),
        new TableRow({ children: [dCell("feminin"),  dCell("meine"), dCell("deine"), dCell("meine/deine Mutter, Katze, Schwester")] }),
        new TableRow({ children: [dCell("neutrum"),  dCell("mein"), dCell("dein"), dCell("mein/dein Kaninchen, Haustier")] }),
        new TableRow({ children: [dCell("Plural"),   dCell("meine"), dCell("deine"), dCell("meine/deine Eltern, Geschwister")] }),
      ]
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("mein/dein (ohne -e) bei mask. und neutr. -- meine/deine bei fem. und Plural."),
    bullet("Haeufiger Fehler: meine Bruder (falsch) statt mein Bruder."),
    bullet("dein/deine parallel einfuehren, da im Dialog sofort benoetigt."),
    bullet("Sein/ihr (3. Person) bewusst weglassen -- A1-Stoff, kommt in Grammatik-Thema."),
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
    h1("Konversation: Possessivpronomen mein / meine"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Familie und Haustiere vorstellen"),
    p("Ergaenze den Dialog mit mein/meine oder dein/deine."),
    empty(),
    p("A:  Wer ist das auf dem Foto?"),
    p("B:  Das ist ______________ Mutter. Und das ist ______________ Vater."),
    p("A:  Sind das ______________ Grosseltern?"),
    p("B:  Ja! Das ist ______________ Oma und ______________ Opa."),
    p("A:  Ist das ______________ Hund?"),
    p("B:  Nein! Das ist ______________ Katze. Sie heisst Mia. ______________ Hund heisst Rex."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Nachfragen"),
    p("A:  Ist das dein Bruder?"),
    p("B:  Ja, das ist ______________ Bruder Tom. / Nein, das ist ______________ Vater."),
    p("A:  Wie alt ist ______________ Bruder?"),
    p("B:  ______________ Bruder ist ________ Jahre alt."),
    p("A:  Hat ______________ Bruder ein Haustier?"),
    p("B:  Ja! Das ist ______________ Hund. Sein Name ist __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wer ist in deiner Familie? (Beschreibe mit mein/meine)"),
    writeLine(), empty(),
    p("2.  Wie heisst dein Vater / deine Mutter?"),
    writeLine(), empty(),
    p("3.  Hast du ein Haustier? Ist das dein Hund / deine Katze?"),
    writeLine(), empty(),
    p("4.  Wie heisst dein Lieblingstier?"),
    writeLine(), empty(),
    h2("Spiel: Wessen ist das?"),
    p("Jeder legt einen Gegenstand in die Mitte. Der Lehrer fragt: Wessen ... ist das?"),
    p("Die Schueler antworten: Das ist mein/meine ..."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Possessivpronomen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 -- Beispiel"),
    p("B:  Das ist [meine] Mutter. Und das ist [mein] Vater."),
    p("A:  Sind das [deine] Grosseltern?"),
    p("B:  Das ist [meine] Oma und [mein] Opa."),
    p("A:  Ist das [dein] Hund?"),
    p("B:  Das ist [meine] Katze. [Mein] Hund heisst Rex."),
    empty(),
    h2("Dialoggeruest 2 -- Beispiel"),
    p("B:  das ist [mein] Bruder Tom."),
    p("A:  [dein] Bruder?"),
    p("B:  [Mein] Bruder ist 10 Jahre alt."),
    p("B:  [mein] Hund. Sein Name ist Bello."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("mein bei mask./neutr. Nomen"),
    bullet("meine bei fem. Nomen und Plural"),
    bullet("dein/deine in Fragen korrekt verwendet"),
    bullet("Dialog natuerlich und verstaendlich"),
    bullet("Korrekte Pronomen: er/sie/es nach Genus"),
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
    h1("Bildaufgaben: Possessivpronomen mein / meine"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Ein Kind zeigt auf ein Familienfoto. Pfeile zeigen auf verschiedene Personen.]"),
    empty(),
    p("Schreibe zu jeder Person einen Satz mit mein oder meine."),
    p("a)  Person 1 (Vater):   Das ist _______ __________________."),
    p("b)  Person 2 (Mutter):  Das ist _______ __________________."),
    p("c)  Person 3 (Bruder):  Das ist _______ __________________."),
    p("d)  Person 4 (Oma):     Das ist _______ __________________."),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Ein Kind mit einem Hund, einer Katze und einem Vogel]"),
    empty(),
    p("Das Kind spricht ueber seine Haustiere. Ergaenze die Saetze."),
    p("Das ist _______ Hund. Er heisst __________________."),
    p("Das ist _______ Katze. Sie heisst __________________."),
    p("Das ist _______ Vogel. Er heisst __________________."),
    empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Zwei Kinder sprechen miteinander. Sprechblasen sind leer.]"),
    empty(),
    p("Kind A fragt. Kind B antwortet. Ergaenze die Sprechblasen."),
    p("Kind A fragt:   Ist das _______ Schwester?"),
    p("Kind B antwortet: Ja / Nein, das ist _______ __________________."),
    ...writeLines(2), empty(),
    h2("Aufgabe 4: Meine Familie -- Zeichnung"),
    p("[BILD 4: Leerer Rahmen mit Titel 'Meine Familie']"),
    empty(),
    p("Zeichne deine Familie in den Rahmen. Schreibe zu jeder Person einen Satz mit mein/meine."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Possessivpronomen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1 -- Erwartete Formen"),
    p("a) Das ist mein Vater.     (mask. -> mein)"),
    p("b) Das ist meine Mutter.   (fem. -> meine)"),
    p("c) Das ist mein Bruder.    (mask. -> mein)"),
    p("d) Das ist meine Oma.      (fem. -> meine)"),
    empty(),
    h2("Aufgabe 2 -- Erwartete Formen"),
    p("Das ist mein Hund.    (mask.)"),
    p("Das ist meine Katze.  (fem.)"),
    p("Das ist mein Vogel.   (mask.)"),
    p("Namen: individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Antworten. Kontrolle: dein/deine in Frage, mein/meine in Antwort."),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Zeichnung. Beschriftung auf mein/meine korrekt pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Bildaufgaben eignen sich gut zur Wiederholung aller Familienwoerter."),
    bullet("mein/meine-Fehler sofort korrigieren -- diese Struktur wird staendig benoetigt."),
    bullet("Aufgabe 4 kann als Hausaufgabe oder Portfolioarbeit eingesetzt werden."),
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
