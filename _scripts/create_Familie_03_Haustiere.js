"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "02_Familie", "03_Haustiere");
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
        text: "A1 Kinder -- Familie -- Haustiere benennen",
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

const TOPIC = "A1_Kinder_Familie_03_Haustiere";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Haustiere benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Ergaenze die Saetze."),
    p("Benutze: einen / eine / ein"),
    empty(),
    p("a)  Ich habe _______ Hund. Er heisst Bello."),
    p("b)  Mia hat _______ Katze. Sie heisst Mimi."),
    p("c)  Wir haben _______ Kaninchen. Es heisst Flausch."),
    p("d)  Tom hat _______ Fisch. Er heisst Nemo."),
    p("e)  Hast du _______ Haustier?"),
    empty(),
    h2("Aufgabe 2: Beschreibe das Tier."),
    p("Schau auf die Informationen. Schreibe zwei Saetze."),
    empty(),
    pBold("Beispiel:  Katze / Mia / braun / 3 Jahre"),
    p("Mia hat eine Katze. Die Katze ist braun und 3 Jahre alt."),
    empty(),
    pBold("a)  Hund / Rex / schwarz / 5 Jahre"),
    writeLine(), writeLine(), empty(),
    pBold("b)  Kaninchen / Wollknaeuel / weiss / 2 Jahre"),
    writeLine(), writeLine(), empty(),
    pBold("c)  Vogel / Pieps / gelb / 1 Jahr"),
    writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Ergaenze die Luecken."),
    empty(),
    p("a)  Mein Hund heisst __________________ und ist __________________ Jahre alt."),
    p("b)  Das Haustier von Sara ist __________________."),
    p("c)  Ich habe kein __________________. Ich moechte aber einen Hund."),
    p("d)  Meine Katze ist __________________ (Farbe) und sehr __________________."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 4-5 Saetze ueber dein Haustier (oder ein Traumhaustier)."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibübung Haustiere"),
    pItalic("Hinweis: Individuelle Antworten bei Aufgaben 3 und 4 akzeptieren."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Ich habe [einen] Hund.   (mask. = einen)"),
    p("b) Mia hat [eine] Katze.    (fem. = eine)"),
    p("c) Wir haben [ein] Kaninchen.  (neutr. = ein)"),
    p("d) Tom hat [einen] Fisch.   (mask. = einen)"),
    p("e) Hast du [ein] Haustier?  (neutr. = ein)"),
    empty(),
    h2("Aufgabe 2"),
    pBold("a)"),
    p("Tom hat einen Hund. Der Hund ist schwarz und 5 Jahre alt."),
    empty(),
    pBold("b)"),
    p("Mia hat ein Kaninchen. Das Kaninchen ist weiss und 2 Jahre alt."),
    empty(),
    pBold("c)"),
    p("Er/Sie hat einen Vogel. Der Vogel ist gelb und 1 Jahr alt."),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Antworten -- Kontrolle auf korrekte Artikel."),
    empty(),
    h2("Aufgabe 4 -- Bewertungskriterien"),
    bullet("Ich habe einen/eine/ein ... korrekt"),
    bullet("Tier benannt und beschrieben (Farbe, Alter, Name)"),
    bullet("Verb haben korrekt konjugiert"),
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
    h1("Leseübung: Haustiere benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Unsere Haustiere"),
    p("Hallo! Ich heisse Sofia. Ich bin 10 Jahre alt. Bei uns zu Hause haben wir viele Haustiere!", { size: 26 }),
    p("Mein Bruder Paul hat einen Hund. Der Hund heisst Rocky. Rocky ist braun und sehr gross. Er ist 4 Jahre alt.", { size: 26 }),
    p("Ich habe eine Katze. Sie heisst Luna. Luna ist grau und weiss. Sie ist 2 Jahre alt und sehr suess.", { size: 26 }),
    p("Meine kleine Schwester hat ein Kaninchen. Das Kaninchen heisst Flausch. Es ist weiss mit braunen Flecken.", { size: 26 }),
    p("Mein Vater mag keine Tiere im Haus. Aber er liebt Rocky!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Sofia ist 10 Jahre alt.                         R  /  F"),
    p("b)  Rocky ist Sofias Hund.                          R  /  F"),
    p("c)  Die Katze heisst Luna und ist grau-weiss.       R  /  F"),
    p("d)  Das Kaninchen ist ganz weiss.                   R  /  F"),
    p("e)  Der Vater mag keine Haustiere.                  R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wer hat einen Hund?"),
    writeLine(), empty(),
    p("b)  Wie alt ist Rocky?"),
    writeLine(), empty(),
    p("c)  Was fuer ein Tier hat die kleine Schwester?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Verbinde."),
    p("Verbinde das Kind mit seinem Haustier."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Kind"), hCell("Haustier")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Katze (Luna)")] }),
        new TableRow({ children: [dCell("Sofia"), dCell("Hund (Rocky)")] }),
        new TableRow({ children: [dCell("kleine Schwester"), dCell("Kaninchen (Flausch)")] }),
      ]
    }),
    empty(),
    p("Zeichne Linien (oder schreibe die richtigen Paare unten):"),
    writeLine(), writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Haustiere"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Rocky ist Pauls Hund (Sofias Bruder)."),
    p("c) R"),
    p("d) F  Das Kaninchen ist weiss mit braunen Flecken."),
    p("e) F  Der Vater mag keine Tiere im Haus, aber er liebt Rocky."),
    empty(),
    h2("Aufgabe 2"),
    p("a) Paul (Sofias Bruder) hat einen Hund."),
    p("b) Rocky ist 4 Jahre alt."),
    p("c) Die kleine Schwester hat ein Kaninchen."),
    empty(),
    h2("Aufgabe 3 -- Loesung"),
    p("Paul --> Hund (Rocky)"),
    p("Sofia --> Katze (Luna)"),
    p("kleine Schwester --> Kaninchen (Flausch)"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["Hund", "Katze", "Fisch", "Kaninchen", "Hamster", "Vogel", "einen", "eine", "ein", "hat", "heisst", "mag"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Haustiere benennen"),
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
    p("1.  Ich habe ______________ Hund. Er heisst Max."),
    p("2.  Mia hat ______________ Katze. Sie ______________ Mimi."),
    p("3.  Wir haben ______________ Kaninchen. Es ist weiss."),
    p("4.  Ben ______________ einen Hamster. Der Hamster ist klein."),
    p("5.  Hast du einen ______________ oder eine ______________?"),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Hast du ein Haustier?"),
    p("B:  Ja! Ich habe ______________ ______________. Er heisst Bello."),
    p("A:  Wie alt ist er?"),
    p("B:  Er ist 3 Jahre alt. Er ______________ spielen und laufen."),
    p("A:  Ich habe eine ______________. Sie heisst Luna."),
    p("B:  Oh! Mein Hund ______________ Katzen. Das ist ein Problem!"),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dein Haustier."),
    p("Ergaenze mit deinen eigenen Angaben (oder einem Traumhaustier):"),
    empty(),
    p("Ich habe __________________ __________________. Es/Er/Sie heisst __________________."),
    p("Mein Haustier ist __________________ (Farbe) und __________________ Jahre alt."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Haustiere"),
    empty(),
    h2("Teil 1"),
    p("1.  Ich habe [einen] Hund.   (mask.)"),
    p("2.  Mia hat [eine] Katze. Sie [heisst] Mimi.   (fem.)"),
    p("3.  Wir haben [ein] Kaninchen.   (neutr.)"),
    p("4.  Ben [hat] einen Hamster."),
    p("5.  Hast du einen [Hund] oder eine [Katze]?"),
    empty(),
    h2("Teil 2"),
    p("B:  Ja! Ich habe [einen] [Hund]. Er heisst Bello."),
    p("B:  Er [mag] spielen und laufen."),
    p("A:  Ich habe eine [Katze]."),
    p("B:  Oh! Mein Hund [mag] Katzen nicht. Das ist ein Problem!"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren. Auf Artikel achten: einen/eine/ein."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ============================================================================
// WORTLISTE
// ============================================================================
const wortEintraege = [
  { wort: "das Haustier / -e",        wortart: "Nomen (n)",  beispiel: "Hast du ein Haustier?" },
  { wort: "der Hund / die Hunde",     wortart: "Nomen (m)",  beispiel: "Ich habe einen Hund." },
  { wort: "die Katze / -n",           wortart: "Nomen (f)",  beispiel: "Die Katze heisst Luna." },
  { wort: "das Kaninchen / -",        wortart: "Nomen (n)",  beispiel: "Wir haben ein Kaninchen." },
  { wort: "der Fisch / die Fische",   wortart: "Nomen (m)",  beispiel: "Mein Fisch ist orange." },
  { wort: "der Hamster / -",          wortart: "Nomen (m)",  beispiel: "Mein Hamster schlaeft viel." },
  { wort: "der Vogel / die Voegel",   wortart: "Nomen (m)",  beispiel: "Mein Vogel singt schoen." },
  { wort: "die Schildkroete / -n",    wortart: "Nomen (f)",  beispiel: "Meine Schildkroete ist langsam." },
  { wort: "das Meerschweinchen / -",  wortart: "Nomen (n)",  beispiel: "Das Meerschweinchen ist suess." },
  { wort: "Ich habe einen/eine/ein ...", wortart: "Satz",    beispiel: "Ich habe einen Hund." },
  { wort: "Mein Tier heisst ...",     wortart: "Satz",       beispiel: "Mein Hund heisst Bello." },
  { wort: "suess / gross / klein",    wortart: "Adjektiv",   beispiel: "Mein Kaninchen ist suess." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Haustiere benennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Haustiere"),
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
    bullet("Artikel-Schwerpunkt: der Hund/Hamster/Vogel/Fisch, die Katze/Schildkroete, das Kaninchen/Meerschweinchen."),
    bullet("Indefinitartikel im Akkusativ: einen (mask.), eine (fem.), ein (neutr.)."),
    bullet("Meerschweinchen und Schildkroete optional -- je nach Klasse."),
    bullet("Possessivpronomen (mein/meine) wird in Unterpunkt 04 vertieft."),
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
    h1("Konversation: Haustiere benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Haustier vorstellen"),
    p("Ergaenze den Dialog und uebt ihn zu zweit."),
    empty(),
    p("A:  Hast du ein Haustier?"),
    p("B:  Ja, ich habe __________. / Nein, ich habe kein Haustier."),
    p("A:  Was fuer ein Tier ist das?"),
    p("B:  Es ist __________ (Tier). Er/Sie/Es heisst __________."),
    p("A:  Wie alt ist er/sie/es?"),
    p("B:  Er/Sie/Es ist __________ Jahre alt."),
    p("A:  Wie sieht er/sie/es aus?"),
    p("B:  Er/Sie/Es ist __________ (Farbe) und __________ (gross/klein/suess)."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Traumtier"),
    p("A:  Was fuer ein Haustier moechtest du haben?"),
    p("B:  Ich moechte __________ haben."),
    p("A:  Warum?"),
    p("B:  Weil __________ suess / gross / lustig / klug ist."),
    p("A:  Ich moechte lieber __________. Das ist mein Lieblingstier."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Hast du ein Haustier?"),
    writeLine(), empty(),
    p("2.  Wie heisst dein Tier?"),
    writeLine(), empty(),
    p("3.  Wie alt ist es?"),
    writeLine(), empty(),
    p("4.  Was frisst dein Tier?"),
    writeLine(), empty(),
    p("5.  Was magst du an deinem Tier?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Tier-Umfrage"),
    p("Gehe zu 4 Mitschuelern. Frage: Hast du ein Haustier? Notiere die Antworten."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Haustier"), hCell("Name des Tieres")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
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
    h1("LOESUNG: Konversation Haustiere"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Hast du ein Haustier?"),
    p("B:  Ja, ich habe einen Hund."),
    p("A:  Was fuer ein Tier ist das?"),
    p("B:  Es ist ein Hund. Er heisst Bello."),
    p("A:  Wie alt ist er?"),
    p("B:  Er ist 3 Jahre alt."),
    p("A:  Wie sieht er aus?"),
    p("B:  Er ist braun und sehr gross."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Ich habe einen/eine/ein ... korrekt nach Genus"),
    bullet("Pronomen korrekt: er (mask.), sie (fem.), es (neutr.)"),
    bullet("Tier benannt, beschrieben (Farbe, Alter, Name)"),
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
    h1("Bildaufgaben: Haustiere benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Sechs Haustiere nebeneinander: Hund, Katze, Fisch, Kaninchen, Hamster, Vogel]"),
    empty(),
    p("Schreibe den Namen unter jedes Tier. Benutze: der / die / das"),
    p("Tier 1: ____________________"),
    p("Tier 2: ____________________"),
    p("Tier 3: ____________________"),
    p("Tier 4: ____________________"),
    p("Tier 5: ____________________"),
    p("Tier 6: ____________________"),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Ein Kind mit einem Haustier -- z.B. Maedchen mit Katze auf dem Arm]"),
    empty(),
    p("Schreibe 3 Saetze ueber das Bild."),
    writeLine(), writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Vier Tiere in verschiedenen Farben -- ein roter Fisch, ein schwarzer Hund, eine weisse Katze, ein bunter Vogel]"),
    empty(),
    p("Beschreibe jedes Tier. Benutze: ist ... (Farbe)"),
    p("a)  Der Fisch ist __________________________."),
    p("b)  Der Hund ist __________________________."),
    p("c)  Die Katze ist __________________________."),
    p("d)  Der Vogel ist __________________________."),
    empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Eine leere Sprechblase neben einem Kind]"),
    empty(),
    p("Das Kind stellt sein Haustier vor. Was sagt es? Schreibe 3 Saetze in die Sprechblase."),
    writeLine(), writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne dein Traumtier."),
    p("Zeichne dein Lieblingstier. Schreibe seinen Namen und 2 Saetze darunter."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Haustiere"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1 -- Erwartete Antworten"),
    p("der Hund / die Katze / der Fisch / das Kaninchen / der Hamster / der Vogel"),
    p("Artikel korrekt pruefen!"),
    empty(),
    h2("Aufgabe 2"),
    p("Beispiel: Das Maedchen hat eine Katze. Die Katze ist suess. Das Maedchen liebt sein Haustier."),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 3"),
    p("Antworten abhaengig von den Bildfarben."),
    p("Beispiel: a) Der Fisch ist rot. b) Der Hund ist schwarz. c) Die Katze ist weiss. d) Der Vogel ist bunt."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Ich habe einen Hund. Er heisst Bello. Er ist braun und 3 Jahre alt."),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Beschriftung auf Korrektheit pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Artikel bei Tieren oft schwierig (der Hamster, der Vogel, das Kaninchen)."),
    bullet("Pronomen: er fuer mask., sie fuer fem., es fuer neutr. Tier."),
    bullet("Farbadjektive (schwarz, braun, weiss, grau, bunt) koennen parallel geubt werden."),
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
