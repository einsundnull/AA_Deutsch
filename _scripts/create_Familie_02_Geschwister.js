"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "02_Familie", "02_Geschwister");
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
        text: "A1 Kinder -- Familie -- Ueber Geschwister sprechen",
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

const TOPIC = "A1_Kinder_Familie_02_Geschwister";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Ueber Geschwister sprechen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Ergaenze die Saetze."),
    p("Benutze: habe / hat | einen Bruder / eine Schwester / keine Geschwister"),
    empty(),
    p("a)  Ich _______ einen Bruder. Er heisst Markus."),
    p("b)  Mia _______ eine Schwester. Sie heisst Laura."),
    p("c)  Tom _______ keine Geschwister. Er ist Einzelkind."),
    p("d)  Hast du Geschwister? -- Ja, ich _______ zwei Schwestern."),
    p("e)  Wie viele Geschwister _______ du?"),
    empty(),
    h2("Aufgabe 2: Schreibe die Saetze um."),
    p("Beispiel:  Paul ist aelter als Lena.  -->  Lena ist juenger als Paul."),
    empty(),
    p("a)  Mein Bruder ist aelter als ich."),
    writeLine(), empty(),
    p("b)  Ich bin juenger als meine Schwester."),
    writeLine(), empty(),
    p("c)  Luisa ist 14. Max ist 10. (Schreibe zwei Saetze.)"),
    writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Beantworte die Fragen ueber dich."),
    empty(),
    p("a)  Hast du Geschwister?"),
    writeLine(), empty(),
    p("b)  Wie heissen deine Geschwister?"),
    writeLine(), empty(),
    p("c)  Wie alt sind sie?"),
    writeLine(), empty(),
    p("d)  Bist du aelter oder juenger als deine Geschwister?"),
    writeLine(), empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 4-5 Saetze ueber deine Geschwister (oder eine Person, die du kennst)."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibübung Geschwister"),
    pItalic("Hinweis: Individuelle Antworten bei Aufgaben 3 und 4 akzeptieren."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Ich [habe] einen Bruder."),
    p("b) Mia [hat] eine Schwester."),
    p("c) Tom [hat] keine Geschwister."),
    p("d) Ja, ich [habe] zwei Schwestern."),
    p("e) Wie viele Geschwister [hast] du?"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Ich bin juenger als mein Bruder."),
    p("b) Meine Schwester ist aelter als ich."),
    p("c) Luisa ist aelter als Max. Max ist juenger als Luisa."),
    empty(),
    h2("Aufgabe 3 und 4 - Bewertungskriterien"),
    bullet("haben korrekt konjugiert: ich habe, du hast, er/sie hat"),
    bullet("aelter als / juenger als korrekt verwendet"),
    bullet("Einzelkind als Begriff verstanden und eingesetzt"),
    bullet("Satzstruktur klar und verstaendlich"),
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
    h1("Leseübung: Ueber Geschwister sprechen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Ben und seine Geschwister"),
    p("Hallo! Ich heisse Ben. Ich bin 11 Jahre alt. Ich habe zwei Geschwister: eine Schwester und einen Bruder.", { size: 26 }),
    p("Meine Schwester heisst Clara. Sie ist 14 Jahre alt. Clara ist aelter als ich. Sie liest gern Buecher und hoert Musik.", { size: 26 }),
    p("Mein Bruder heisst Felix. Er ist 7 Jahre alt. Felix ist juenger als ich. Er spielt gern mit Autos und Bausteinen.", { size: 26 }),
    p("Wir spielen manchmal zusammen. Clara hilft mir manchmal bei den Hausaufgaben. Felix und ich spielen Fussball im Garten.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Ben ist 11 Jahre alt.                              R  /  F"),
    p("b)  Ben hat drei Geschwister.                          R  /  F"),
    p("c)  Clara ist juenger als Ben.                         R  /  F"),
    p("d)  Felix spielt gern mit Autos.                       R  /  F"),
    p("e)  Ben und Felix spielen Fussball im Garten.          R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wie viele Geschwister hat Ben?"),
    writeLine(), empty(),
    p("b)  Wie alt ist Clara?"),
    writeLine(), empty(),
    p("c)  Was macht Clara gern?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Ordne die Geschwister vom Aeltesten zum Juengsten."),
    empty(),
    p("Aeltestes Kind:  ________________________  (_____ Jahre alt)"),
    p("Mittleres Kind:  ________________________  (_____ Jahre alt)"),
    p("Juengstes Kind:  ________________________  (_____ Jahre alt)"),
    empty(),
    h2("Aufgabe 4: Was stimmt laut Text?"),
    p("Kreuze an: Wer hilft wem?"),
    empty(),
    p("[ ]  Ben hilft Felix bei den Hausaufgaben."),
    p("[ ]  Clara hilft Ben bei den Hausaufgaben."),
    p("[ ]  Felix hilft Clara bei den Hausaufgaben."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Geschwister"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Ben hat zwei Geschwister."),
    p("c) F  Clara ist aelter als Ben."),
    p("d) R"),
    p("e) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Ben hat zwei Geschwister."),
    p("b) Clara ist 14 Jahre alt."),
    p("c) Clara liest gern Buecher und hoert Musik."),
    empty(),
    h2("Aufgabe 3"),
    p("Aeltestes Kind:  Clara  (14 Jahre alt)"),
    p("Mittleres Kind:  Ben    (11 Jahre alt)"),
    p("Juengstes Kind:  Felix  (7 Jahre alt)"),
    empty(),
    h2("Aufgabe 4"),
    p("[X]  Clara hilft Ben bei den Hausaufgaben."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["habe", "hat", "hast", "aelter", "juenger", "als", "Bruder", "Schwester", "Geschwister", "Einzelkind", "zwei", "keine"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Ueber Geschwister sprechen"),
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
    p("1.  Ich ______________ einen Bruder und eine Schwester."),
    p("2.  Mein Bruder ______________ keine Geschwister -- er ist ______________."),
    p("3.  Wie viele Geschwister ______________ du?"),
    p("4.  Ich bin ______________ als mein Bruder. Er ist juenger."),
    p("5.  Sie ist 15, er ist 10. Sie ist ______________ ______________ er."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja! Ich ______________ einen ______________ und eine ______________."),
    p("A:  Wie alt sind sie?"),
    p("B:  Mein Bruder ist 8. Meine Schwester ist 16. Sie ist ______________ ______________ ich."),
    p("A:  Und dein Bruder?"),
    p("B:  Er ist ______________ als ich. Er ist 8, ich bin 12."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Ich habe __________________ Geschwister."),
    p("Mein __________________ heisst __________________. Er/Sie ist __________________ Jahre alt."),
    p("Er/Sie ist __________________ als ich."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Geschwister"),
    empty(),
    h2("Teil 1"),
    p("1.  Ich [habe] einen Bruder und eine Schwester."),
    p("2.  Mein Bruder [hat] keine Geschwister -- er ist [Einzelkind]."),
    p("3.  Wie viele Geschwister [hast] du?"),
    p("4.  Ich bin [aelter] als mein Bruder."),
    p("5.  Sie ist [aelter] [als] er."),
    empty(),
    p("(Ablenkwoerter: zwei, keine, juenger -- koennen je nach Kontext auch richtig sein.)"),
    empty(),
    h2("Teil 2"),
    p("B:  Ja! Ich [habe] einen [Bruder] und eine [Schwester]."),
    p("B:  Sie ist [aelter] [als] ich."),
    p("B:  Er ist [juenger] als ich."),
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
  { wort: "der Bruder / die Brueder",    wortart: "Nomen (m)",      beispiel: "Ich habe einen Bruder." },
  { wort: "die Schwester / -n",          wortart: "Nomen (f)",      beispiel: "Meine Schwester heisst Lena." },
  { wort: "die Geschwister",             wortart: "Nomen (Plural)", beispiel: "Ich habe zwei Geschwister." },
  { wort: "das Einzelkind",              wortart: "Nomen (n)",      beispiel: "Er hat keine Geschwister. Er ist Einzelkind." },
  { wort: "haben",                       wortart: "Verb",           beispiel: "Ich habe einen Bruder. Er hat eine Schwester." },
  { wort: "aelter als",                  wortart: "Ausdruck",       beispiel: "Clara ist aelter als Ben." },
  { wort: "juenger als",                 wortart: "Ausdruck",       beispiel: "Felix ist juenger als ich." },
  { wort: "gross / grosser",             wortart: "Adjektiv",       beispiel: "Mein Bruder ist groesser als ich." },
  { wort: "Hast du Geschwister?",        wortart: "Frage",          beispiel: "Hast du Geschwister? -- Ja, ich habe ..." },
  { wort: "Wie viele Geschwister ...?",  wortart: "Frage",          beispiel: "Wie viele Geschwister hast du?" },
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
    if (i === 4) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Ueber Geschwister sprechen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Geschwister"),
    pItalic("Hinweis: Uebersetzungen sind individuell und abhaengig von der Muttersprache."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("haben: ich habe / du hast / er-sie-es hat -- Konjugation einueben."),
    bullet("aelter/juenger als: Komparativ + als ist A1-Stoff, einfach halten."),
    bullet("Einzelkind: wichtiges Vokabular, da viele Schueler keine Geschwister haben."),
    bullet("Plural von Bruder: die Brueder (Umlaut!). Schwester: die Schwestern (regelmaessig)."),
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
    h1("Konversation: Ueber Geschwister sprechen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Geschwister vorstellen"),
    p("Ergaenze den Dialog und uebt ihn zu zweit."),
    empty(),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe __________. / Nein, ich bin Einzelkind."),
    p("A:  Wie heissen sie / er / sie?"),
    p("B:  Mein Bruder heisst __________. / Meine Schwester heisst __________."),
    p("A:  Wie alt sind sie?"),
    p("B:  Er/Sie ist __________ Jahre alt."),
    p("A:  Bist du aelter oder juenger?"),
    p("B:  Ich bin __________ als __________."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Vergleichen"),
    p("A:  Wie alt ist deine Schwester?"),
    p("B:  Sie ist __________ Jahre alt."),
    p("A:  Bist du aelter als sie?"),
    p("B:  Ja, ich bin aelter. / Nein, sie ist aelter als ich."),
    p("A:  Was macht sie gern?"),
    p("B:  Sie __________ gern __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Hast du Geschwister?"),
    writeLine(), empty(),
    p("2.  Wie viele Geschwister hast du?"),
    writeLine(), empty(),
    p("3.  Wie heissen deine Geschwister?"),
    writeLine(), empty(),
    p("4.  Wie alt sind sie?"),
    writeLine(), empty(),
    p("5.  Wer ist aelter -- du oder deine Geschwister?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Geschwister-Linie"),
    p("Die ganze Klasse steht auf. Stellt euch nach dem Alter eurer Geschwister in einer Linie auf."),
    p("Wer hat das aelteste Geschwister? Wer ist Einzelkind?"),
    p("Fragt einander auf Deutsch: Wie alt ist dein Bruder/deine Schwester?"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Geschwister"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe einen Bruder und eine Schwester."),
    p("A:  Wie heissen sie?"),
    p("B:  Mein Bruder heisst Max. Meine Schwester heisst Clara."),
    p("A:  Wie alt sind sie?"),
    p("B:  Max ist 8, Clara ist 14."),
    p("A:  Bist du aelter oder juenger?"),
    p("B:  Ich bin aelter als Max, aber juenger als Clara."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("haben korrekt konjugiert (ich habe, er/sie hat)"),
    bullet("aelter als / juenger als korrekt"),
    bullet("Einzel- und Plural-Formen korrekt: einen Bruder / eine Schwester"),
    bullet("Einzelkind als Alternative korrekt eingesetzt"),
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
    h1("Bildaufgaben: Ueber Geschwister sprechen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Drei Kinder nebeneinander -- das aelteste (15 J.), das mittlere (11 J.), das juengste (6 J.)]"),
    empty(),
    p("Schreibe Saetze. Wer ist aelter/juenger?"),
    p("a)  Kind A ist __________ als Kind B."),
    p("b)  Kind C ist __________ als Kind A."),
    p("c)  Kind __ ist am aeltesten."),
    p("d)  Kind __ ist am juengsten."),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Ein Kind (Einzelkind) mit seinen Eltern -- keine Geschwister]"),
    empty(),
    p("Was sagt das Kind? Schreibe 2 Saetze."),
    writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Zwei Kinder spielen zusammen (Bruder und Schwester)]"),
    empty(),
    p("Wer sind die Kinder? Schreibe einen Dialog zwischen ihnen."),
    p("Kind 1 sagt: ___________________________________________________"),
    p("Kind 2 sagt: ___________________________________________________"),
    p("Kind 1 sagt: ___________________________________________________"),
    empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Vier Portraits -- je zwei Kinder. Unter jedem Bild steht ein Name und Alter.]"),
    p("Lukas (13) | Emma (9) | Ben (13) | Mia (16)"),
    empty(),
    p("Schreibe Saetze. Benutze: aelter als / juenger als / gleich alt."),
    writeLine(), writeLine(), writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne deine Geschwister."),
    p("Zeichne deine Geschwister (oder erfinde welche). Schreibe ihren Namen und ihr Alter dazu."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Geschwister"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1 -- Beispiel (mit Alter 15 / 11 / 6)"),
    p("a) Kind A ist aelter als Kind B."),
    p("b) Kind C ist juenger als Kind A."),
    p("c) Kind A ist am aeltesten. (15 Jahre)"),
    p("d) Kind C ist am juengsten. (6 Jahre)"),
    empty(),
    h2("Aufgabe 2 -- Beispiel"),
    p("Ich habe keine Geschwister. Ich bin Einzelkind."),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Antworten akzeptieren. Kontrolle: Rollenverteilung Bruder/Schwester korrekt."),
    empty(),
    h2("Aufgabe 4 -- Loesung"),
    p("Lukas und Ben sind gleich alt. (beide 13)"),
    p("Mia ist aelter als Lukas. (16 > 13)"),
    p("Emma ist juenger als Ben. (9 < 13)"),
    p("Mia ist am aeltesten. Emma ist am juengsten."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Beschriftung auf Korrektheit pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Superlativ (am aeltesten/juengsten) passiv einfuehren -- noch kein aktiver Lernstoff bei A1."),
    bullet("gleich alt als Ausdruck einfuehren wenn im Unterricht relevant."),
    bullet("Vergleiche foerdern logisches Denken und Sprachkompetenz gleichzeitig."),
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
