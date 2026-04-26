"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "01_SichVorstellen", "04_Herkunft");
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
        text: "A1 Kinder -- Sich selbst vorstellen -- Herkunft",
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
    width: { size: 9000, type: WidthType.DXA },
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

const TOPIC = "A1_Kinder_SichVorstellen_04_Herkunft";

// ═══════════════════════════════════════════
// 1. SCHREIBUEBUNG
// ═══════════════════════════════════════════
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Herkunft nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Antworte auf die Frage."),
    p("Woher kommst du?"),
    p("Ich komme aus _________________________________________________."),
    empty(),
    h2("Aufgabe 2: Schreibe Fragen und Antworten."),
    p("Schau auf die Informationen und schreibe Fragen und Antworten."),
    empty(),
    pBold("Beispiel:  Lena - Deutschland"),
    p("Frage:   Woher kommt Lena?"),
    p("Antwort: Sie kommt aus Deutschland."),
    empty(),
    pBold("a)  Omar - Aegypten"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("b)  Yuki - Japan"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("c)  Sofia - Brasilien"),
    p("Frage:"),   writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Ich __________________ aus der Tuerkei."),
    p("b)  __________________ kommst du?"),
    p("c)  Er kommt __________________ Polen."),
    p("d)  Sie ist __________________ (Nationalitaet: aus Spanien)."),
    p("e)  Wir kommen alle aus verschiedenen __________________."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3-5 Saetze. Woher kommst du? Wo liegt dein Land?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Herkunft nennen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn Struktur und Niveau stimmen."),
    empty(),
    h2("Aufgabe 1"),
    p("Ich komme aus [Laendername].  (individuelle Antwort)"),
    empty(),
    h2("Aufgabe 2"),
    pBold("a) Omar - Aegypten"),
    p("Frage:   Woher kommt Omar?"),
    p("Antwort: Er kommt aus Aegypten."),
    empty(),
    pBold("b) Yuki - Japan"),
    p("Frage:   Woher kommt Yuki?"),
    p("Antwort: Sie kommt aus Japan."),
    empty(),
    pBold("c) Sofia - Brasilien"),
    p("Frage:   Woher kommt Sofia?"),
    p("Antwort: Sie kommt aus Brasilien."),
    empty(),
    h2("Aufgabe 3"),
    p("a)  Ich [komme] aus der Tuerkei."),
    p("b)  [Woher] kommst du?"),
    p("c)  Er kommt [aus] Polen."),
    p("d)  Sie ist [Spanierin]."),
    p("e)  Wir kommen alle aus verschiedenen [Laendern]."),
    empty(),
    p("Hinweis: Bei a) braucht die Tuerkei den Artikel 'der' -- Ausnahme wie bei der Schweiz."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Ich komme aus ... korrekt verwendet"),
    bullet("Praep. aus korrekt eingesetzt"),
    bullet("Verb kommen richtig konjugiert"),
    bullet("Laendername korrekt"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// 2. LESEUBUNG
// ═══════════════════════════════════════════
async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Herkunft nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Unsere internationale Klasse"),
    p("Hallo! Ich heisse Amara. Ich bin 10 Jahre alt. Ich komme aus Nigeria. Ich wohne jetzt in Berlin.", { size: 26 }),
    p("Mein Freund heisst David. Er kommt aus Israel. Er ist 11 Jahre alt und wohnt in Wien.", { size: 26 }),
    p("Meine Freundin heisst Lin. Sie kommt aus China. Sie wohnt in Hamburg. Lin sagt, China ist sehr gross.", { size: 26 }),
    p("Unser Lehrer heisst Herr Meier. Er kommt aus Deutschland. Er spricht Deutsch und Englisch.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Amara kommt aus Kenia.                             R  /  F"),
    p("b)  David kommt aus Israel.                            R  /  F"),
    p("c)  Lin wohnt in Berlin.                               R  /  F"),
    p("d)  China ist sehr gross.                              R  /  F"),
    p("e)  Herr Meier kommt aus Oesterreich.                  R  /  F"),
    p("f)  Herr Meier spricht Deutsch und Englisch.           R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Woher kommt Amara?"),
    writeLine(), empty(),
    p("b)  Wo wohnt David?"),
    writeLine(), empty(),
    p("c)  Was sagt Lin ueber China?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Verbinde."),
    p("Verbinde den Namen mit dem richtigen Herkunftsland."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 600, 5400],
      rows: [
        ["Amara",      "China"],
        ["David",      "Nigeria"],
        ["Lin",        "Israel"],
        ["Herr Meier", "Deutschland"],
      ].map(function(pair) {
        return new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p(pair[0])] }),
          new TableCell({ width: { size: 600,  type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("---")] }),
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p(pair[1])] }),
        ]});
      })
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Herkunft nennen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) F  -- Amara kommt aus Nigeria."),
    p("b) R"),
    p("c) F  -- Lin wohnt in Hamburg."),
    p("d) R"),
    p("e) F  -- Herr Meier kommt aus Deutschland."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Amara kommt aus Nigeria."),
    p("b) David wohnt in Wien."),
    p("c) Lin sagt, China ist sehr gross."),
    empty(),
    h2("Aufgabe 3 -- Verbinden"),
    p("Amara      -> Nigeria"),
    p("David      -> Israel"),
    p("Lin        -> China"),
    p("Herr Meier -> Deutschland"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// 3. LUECKENTEXT
// ═══════════════════════════════════════════
async function luecken() {
  const woerter = ["komme", "kommt", "aus", "woher", "Land", "Woher", "Nationalitaet", "bin", "Laendern", "kommt"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Herkunft nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: Array(5).fill(1800),
      rows: [
        new TableRow({ children: woerter.slice(0, 5).map(function(w) {
          return new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
          });
        })}),
        new TableRow({ children: woerter.slice(5).map(function(w) {
          return new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })]
          });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1.  Ich ______________ aus Deutschland."),
    p("2.  ______________ kommst du?"),
    p("3.  Er ______________ aus Mexico."),
    p("4.  Sie kommt ______________ der Schweiz."),
    p("5.  Wir kommen aus verschiedenen ______________."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Hallo! Ich heisse Kai. ______________ kommst du?"),
    p("B:  Ich heisse Priya. Ich ______________ aus Indien. Und du?"),
    p("A:  Ich komme ______________ Oesterreich. Das ist ein kleines ______________ in Europa."),
    p("B:  Cool! Mein ______________ ist indisch. Meine Familie kommt aus Mumbai."),
    p("A:  Mumbai kenne ich! Das ist eine grosse Stadt in Indien."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Ich heisse __________________. Ich komme aus __________________."),
    p("Das ist ein Land in __________________."),
    empty(),
    p("Mein Freund / Meine Freundin kommt aus __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Herkunft nennen"),
    empty(),
    h2("Teil 1"),
    p("1.  Ich [komme] aus Deutschland."),
    p("2.  [Woher] kommst du?"),
    p("3.  Er [kommt] aus Mexico."),
    p("4.  Sie kommt [aus] der Schweiz."),
    p("5.  Wir kommen aus verschiedenen [Laendern]."),
    empty(),
    p("(Ablenker: bin, Nationalitaet nicht benoetigt.)"),
    empty(),
    h2("Teil 2"),
    p("A:  [Woher] kommst du?"),
    p("B:  Ich [komme] aus Indien. Und du?"),
    p("A:  Ich komme [aus] Oesterreich. Das ist ein kleines [Land] in Europa."),
    p("B:  Cool! Mein [Land / Herkunftsland] ist indisch."),
    p("    Hinweis: Im Wörterkasten steht 'Nationalitaet' -- individuelle Antwort akzeptieren."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    p("Bewertung: Ich komme aus ... korrekt, Kontinent sinnvoll."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// 4. WORTLISTE
// ═══════════════════════════════════════════
const wortEintraege = [
  { wort: "die Herkunft",            wortart: "Nomen (f)", beispiel: "Was ist deine Herkunft?" },
  { wort: "kommen aus ...",          wortart: "Verb",      beispiel: "Ich komme aus Brasilien." },
  { wort: "Woher kommst du?",        wortart: "Frage",     beispiel: "Woher kommst du? -- Aus Polen." },
  { wort: "Ich komme aus ...",       wortart: "Satz",      beispiel: "Ich komme aus der Tuerkei." },
  { wort: "das Land / die Laender",  wortart: "Nomen (n)", beispiel: "Deutschland ist ein Land." },
  { wort: "der Kontinent",           wortart: "Nomen (m)", beispiel: "Europa ist ein Kontinent." },
  { wort: "die Nationalitaet",       wortart: "Nomen (f)", beispiel: "Meine Nationalitaet ist deutsch." },
  { wort: "international",           wortart: "Adjektiv",  beispiel: "Unsere Klasse ist international." },
  { wort: "die Flagge",              wortart: "Nomen (f)", beispiel: "Die Flagge von Deutschland ist schwarz-rot-gold." },
  { wort: "die Hauptstadt",          wortart: "Nomen (f)", beispiel: "Berlin ist die Hauptstadt von Deutschland." },
  { wort: "aus ... kommen",          wortart: "Verb",      beispiel: "Er kommt aus Japan." },
  { wort: "Europa / Asien / Afrika", wortart: "Nomen",     beispiel: "Deutschland liegt in Europa." },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach(function(e, i) {
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
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Uebersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }),
        ]}),
      ]
    }));
    if (i === 5) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Herkunft nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Herkunft nennen"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2600, 2000, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("aus + Laendername: kein Artikel (aus Deutschland, aus Japan)."),
    bullet("Ausnahmen mit Artikel: aus der Schweiz, aus der Tuerkei, aus den USA."),
    bullet("Nationalitaetsadjektive (deutsch, franzoesisch) noch nicht aktiv -- passiv einfuehren."),
    bullet("Kontinente als Orientierung: Europa, Asien, Afrika, Amerika, Australien."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// 5. KONVERSATION
// ═══════════════════════════════════════════
async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Herkunft nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Ergaenze den Dialog."),
    p("Fuelle die Luecken aus und uebe mit deinem Partner."),
    empty(),
    p("A:  Hallo! Ich heisse __________. Wie heisst du?"),
    p("B:  Ich heisse __________. Woher __________ du?"),
    p("A:  Ich komme __________ __________. Und du?"),
    p("B:  Ich komme aus __________. Das liegt in __________."),
    p("A:  Interessant! Wie ist es dort?"),
    p("B:  Es ist __________. (z.B. schoen, gross, warm)"),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Stelle eine andere Person vor."),
    p("Du hast einen Freund / eine Freundin aus einem anderen Land."),
    p("Stelle ihn/sie der Klasse vor."),
    empty(),
    p("Mein Freund / Meine Freundin heisst: ____________________________"),
    p("Er / Sie kommt aus:                  ____________________________"),
    p("Das liegt in:                        ____________________________"),
    p("Er / Sie wohnt jetzt in:             ____________________________"),
    empty(),
    p("Praesentation: Mein Freund / Meine Freundin heisst __________. Er/Sie"),
    p("kommt aus __________. Das liegt in __________. Er/Sie wohnt jetzt in __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Woher kommst du?"),
    writeLine(), empty(),
    p("2.  Wo liegt dein Heimatland?"),
    writeLine(), empty(),
    p("3.  Woher kommt deine Mutter oder dein Vater?"),
    writeLine(), empty(),
    p("4.  Kennst du jemanden aus einem anderen Land? Woher kommt er/sie?"),
    writeLine(), empty(),
    p("5.  Aus welchem Land moechtest du gerne kommen? Warum?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Flaggen-Raten"),
    p("[BILD: Flaggen verschiedener Laender -- Deutschland, Oesterreich, Schweiz, Japan, Frankreich, Brasilien]"),
    p("Zeige auf eine Flagge. Dein Partner fragt: Woher kommst du?"),
    p("Du antwortest: Ich komme aus __________."),
    p("Dann tauscht ihr die Rollen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Herkunft nennen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Hallo! Ich heisse [Name]. Wie heisst du?"),
    p("B:  Ich heisse [Name]. Woher [kommst] du?"),
    p("A:  Ich komme [aus] [Land]. Und du?"),
    p("B:  Ich komme aus [Land]. Das liegt in [Kontinent]."),
    p("A:  Interessant! Wie ist es dort?"),
    p("B:  Es ist [schoen / gross / warm / kalt]."),
    empty(),
    h2("Dialoggeruest 2 - Bewertungskriterien"),
    bullet("Korrekte Verwendung von Er/Sie kommt aus ..."),
    bullet("Herkunftsland und Wohnort korrekt unterschieden"),
    bullet("Praesentation fluessig und verstaendlich"),
    empty(),
    h2("Partnerinterview - Bewertungskriterien"),
    bullet("Woher kommst du? und Ich komme aus ... korrekt"),
    bullet("Kontinent oder Region korrekt benannt"),
    bullet("Kommuniziert verstaendlich"),
    empty(),
    h2("Flaggen-Raten - Hinweis"),
    p("Bilder muessen vom Lehrenden eingefuegt werden."),
    p("Kontrollieren Sie: aus + Laendername korrekt (ohne Artikel ausser Ausnahmen)."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// 6. BILDAUFGABEN
// ═══════════════════════════════════════════
async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Herkunft nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Weltkarte mit markierten Laendern: Deutschland, Japan, Brasilien, Aegypten, Australien]"),
    empty(),
    p("Schau auf die Karte. Auf welchem Kontinent liegt das Land?"),
    empty(),
    p("Deutschland liegt in __________________________."),
    p("Japan liegt in __________________________."),
    p("Brasilien liegt in __________________________."),
    p("Aegypten liegt in __________________________."),
    p("Australien liegt in __________________________."),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Sechs Kinder aus verschiedenen Laendern mit Nationalflaggen: Omar-Aegypten, Yuki-Japan, Sofia-Spanien, Ben-Israel, Ana-Mexiko, Mia-Deutschland]"),
    empty(),
    p("Schreibe Saetze. Woher kommt jedes Kind?"),
    empty(),
    p("Omar kommt aus __________________________."),
    p("Yuki kommt aus __________________________."),
    p("Sofia kommt aus __________________________."),
    p("Ben kommt aus __________________________."),
    p("Ana kommt aus __________________________."),
    p("Mia kommt aus __________________________."),
    empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Eine Deutschlandkarte mit Nachbarlaendern beschriftet: Frankreich, Polen, Oesterreich, Schweiz, Niederlande, Tschechien, Daenemark, Belgien, Luxemburg]"),
    empty(),
    p("Welche Laender liegen neben Deutschland?"),
    p("Schreibe 3 Nachbarlaender auf."),
    empty(),
    p("1. ________________________________________________"),
    p("2. ________________________________________________"),
    p("3. ________________________________________________"),
    empty(),
    p("Aus welchem Nachbarland moechtest du kommen? Warum?"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Ein Kind haelt eine Flagge. Neben dem Kind ist eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind? Schreibe in die Sprechblase."),
    p("Das Kind zeigt seine Herkunft. Es sagt, woher es kommt."),
    empty(),
    p("Sprechblase: ___________________________________________________"),
    writeLine(), empty(),
    h2("Aufgabe 5: Male deine Flagge."),
    p("Zeichne die Flagge deines Heimatlandes."),
    p("Schreibe darunter 2 Saetze."),
    ...writeLines(5), empty(),
    p("Ich komme aus __________. Das liegt in __________________________."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Herkunft nennen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1 -- Erwartete Antworten"),
    p("Deutschland liegt in Europa."),
    p("Japan liegt in Asien."),
    p("Brasilien liegt in Suedamerika."),
    p("Aegypten liegt in Afrika."),
    p("Australien liegt in Australien / Ozeanien."),
    empty(),
    h2("Aufgabe 2 -- Erwartete Antworten"),
    p("Omar kommt aus Aegypten."),
    p("Yuki kommt aus Japan."),
    p("Sofia kommt aus Spanien."),
    p("Ben kommt aus Israel."),
    p("Ana kommt aus Mexiko."),
    p("Mia kommt aus Deutschland."),
    empty(),
    h2("Aufgabe 3 -- Nachbarlaender Deutschlands"),
    p("Moegliche Antworten: Frankreich, Polen, Oesterreich, Schweiz, Niederlande,"),
    p("Tschechien, Daenemark, Belgien, Luxemburg."),
    p("Individuelle Auswahl von 3 Laendern akzeptieren."),
    empty(),
    h2("Aufgabe 4 -- Sprechblase"),
    p("Beispiel: Ich komme aus [Land]! Das ist in [Kontinent]."),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5 -- Flagge und Saetze"),
    p("Individuelle Antwort. Stimmt die Flagge mit dem Heimatland ueberein?"),
    p("Erwartet: Ich komme aus [Land]. Das liegt in [Kontinent/Region]."),
    empty(),
    h2("Allgemeine Hinweise fuer Lehrende"),
    bullet("aus + Laendername ohne Artikel (Ausnahmen: aus der Schweiz, aus der Tuerkei, aus den USA)."),
    bullet("Kontinente: Europa, Asien, Afrika, Nord-/Suedamerika, Australien/Ozeanien."),
    bullet("Weltkarte im Unterricht empfehlenswert."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
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
