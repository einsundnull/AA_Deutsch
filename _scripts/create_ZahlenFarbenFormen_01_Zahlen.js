"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "04_ZahlenFarbenFormen", "01_Zahlen");
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
        text: "A1 Kinder -- Zahlen, Farben, Formen -- Zahlen 1-20",
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
  return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })] });
}
function h2(text) {
  return new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })] });
}
function p(text, opts) {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] });
}
function pBold(text)   { return p(text, { bold: true }); }
function pItalic(text) { return p(text, { italics: true }); }
function empty()       { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() {
  return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] });
}
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br()          { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text, size: 24, font: "Arial" })] });
}

function studentHead() {
  return new Table({
    width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Name: _________________________________")] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Datum: ________________________________")] })
    ]})]
  });
}

function hCell(text) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })] });
}
function dCell(text, opts) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] })] });
}

const TOPIC = "A1_Kinder_ZahlenFarbenFormen_01_Zahlen";

function makeZahlenTable() {
  const zahlen = [
    ["1 -- eins", "2 -- zwei", "3 -- drei", "4 -- vier", "5 -- fuenf"],
    ["6 -- sechs", "7 -- sieben", "8 -- acht", "9 -- neun", "10 -- zehn"],
    ["11 -- elf", "12 -- zwoelf", "13 -- dreizehn", "14 -- vierzehn", "15 -- fuenfzehn"],
    ["16 -- sechzehn", "17 -- siebzehn", "18 -- achtzehn", "19 -- neunzehn", "20 -- zwanzig"],
  ];
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: Array(5).fill(1800),
    rows: zahlen.map(function(row, ri) {
      return new TableRow({ children: row.map(function(cell) {
        return new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: ri % 2 === 0 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cell, bold: true, size: 22, font: "Arial" })] })]
        });
      })});
    })
  });
}

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Zahlen 1-20"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Zahlen 1-20 -- Uebersicht"),
    makeZahlenTable(),
    empty(),
    h2("Aufgabe 1: Schreibe die Zahlen als Wort."),
    empty(),
    p("a)   3  = __________________________"),
    p("b)   7  = __________________________"),
    p("c)  12  = __________________________"),
    p("d)  15  = __________________________"),
    p("e)  19  = __________________________"),
    p("f)  20  = __________________________"),
    empty(),
    h2("Aufgabe 2: Schreibe die Zahl als Ziffer."),
    empty(),
    p("a)  acht         = _____"),
    p("b)  dreizehn     = _____"),
    p("c)  siebzehn     = _____"),
    p("d)  zwoelf       = _____"),
    p("e)  fuenf        = _____"),
    p("f)  neunzehn     = _____"),
    empty(),
    h2("Aufgabe 3: Ergaenze die Luecken."),
    empty(),
    p("a)  Ich bin __________________ Jahre alt."),
    p("b)  In meiner Klasse sind __________________ Schueler."),
    p("c)  Ich habe __________________ Bleistifte in meinem Maeppchen."),
    p("d)  Das Buch hat __________________ Seiten."),
    p("e)  Wir haben __________________ Faecher in der Schule."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3-5 Saetze mit Zahlen. Benutze: Wie viele ...? / Ich habe ... / Es gibt ..."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Zahlen 1-20"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("a) drei  b) sieben  c) zwoelf  d) fuenfzehn  e) neunzehn  f) zwanzig"),
    empty(),
    h2("Aufgabe 2"),
    p("a) 8  b) 13  c) 17  d) 12  e) 5  f) 19"),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Antworten akzeptieren. Zahlen muessen als Wort oder Ziffer korrekt sein."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Mindestens 3 verschiedene Zahlen korrekt als Wort geschrieben"),
    bullet("Satzstruktur mit haben oder es gibt korrekt"),
    bullet("Wie viele? als Frage sinnvoll verwendet"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Zahlen 1-20"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Toms Zimmer"),
    p("Hallo! Ich heisse Tom. Ich bin 11 Jahre alt.", { size: 26 }),
    p("In meinem Zimmer habe ich viele Sachen. Ich habe 3 Regale mit Buechern. In einem Regal stehen 20 Buecher! Ich lese sehr gern.", { size: 26 }),
    p("An meiner Wand haengen 15 Bilder. 7 davon sind von Fussballspielern. Ich mag Fussball sehr. Ich habe auch 12 Fussballkarten.", { size: 26 }),
    p("Auf meinem Schreibtisch liegen 5 Stifte, 2 Hefte und 1 Lineal. Ich mache dort meine Hausaufgaben.", { size: 26 }),
    p("Meine Klasse hat 19 Schueler. 10 sind Maedchen und 9 sind Jungen. Wir sind eine tolle Klasse!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Tom ist 11 Jahre alt.                                R  /  F"),
    p("b)  Tom hat 2 Regale mit Buechern.                       R  /  F"),
    p("c)  In einem Regal stehen 20 Buecher.                    R  /  F"),
    p("d)  An der Wand haengen 15 Bilder.                       R  /  F"),
    p("e)  Auf dem Schreibtisch liegen 3 Stifte.                R  /  F"),
    p("f)  In Toms Klasse sind 19 Schueler.                     R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wie viele Fussballkarten hat Tom?"),
    writeLine(), empty(),
    p("b)  Was liegt auf dem Schreibtisch?"),
    writeLine(), empty(),
    p("c)  Wie viele Maedchen sind in Toms Klasse?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Schreibe alle Zahlen aus dem Text als Wort."),
    p("Finde alle Zahlen im Text und schreibe sie auf."),
    empty(),
    p("Ziffer --> Wort:"),
    p("11 --> __________________   3 --> __________________"),
    p("20 --> __________________   15 --> __________________"),
    p("7  --> __________________   12 --> __________________"),
    p("5  --> __________________   2 --> __________________"),
    p("1  --> __________________   19 --> __________________"),
    p("10 --> __________________   9 --> __________________"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Wie viele Buecher hast du? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Zahlen 1-20"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R  b) F (3 Regale)  c) R  d) R  e) F (5 Stifte)  f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Tom hat 12 Fussballkarten."),
    p("b) Auf dem Schreibtisch liegen 5 Stifte, 2 Hefte und 1 Lineal."),
    p("c) In Toms Klasse sind 10 Maedchen."),
    empty(),
    h2("Aufgabe 3"),
    p("11 --> elf          3 --> drei"),
    p("20 --> zwanzig     15 --> fuenfzehn"),
    p(" 7 --> sieben      12 --> zwoelf"),
    p(" 5 --> fuenf        2 --> zwei"),
    p(" 1 --> eins        19 --> neunzehn"),
    p("10 --> zehn         9 --> neun"),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["eins", "drei", "sieben", "zwoelf", "fuenfzehn", "zwanzig",
                   "neun", "elf", "vierzehn", "achtzehn", "Wie viele", "Jahre"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Zahlen 1-20"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: Array(6).fill(1500),
      rows: [
        new TableRow({ children: woerter.slice(0, 6).map(function(w) {
          return new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
        new TableRow({ children: woerter.slice(6).map(function(w) {
          return new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1.  Ich habe ______________ Katzen. (1)"),
    p("2.  Das Buch hat ______________ Seiten. (15)"),
    p("3.  Meine Schwester ist ______________ Jahre alt. (7)"),
    p("4.  In meiner Klasse sind ______________ Schueler. (20)"),
    p("5.  ______________ Stifte hast du?  --  Ich habe ______________ Stifte. (12)"),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  ______________ alt bist du?"),
    p("B:  Ich bin ______________ ______________ alt. (11)"),
    p("A:  Und dein Bruder?"),
    p("B:  Er ist ______________ Jahre alt. (9)"),
    p("A:  Wie viele Buecher hast du?"),
    p("B:  Ich habe ______________ Buecher. (18)"),
    p("A:  Wow! Ich habe nur ______________. (3)"),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Ich bin __________________ Jahre alt."),
    p("In meiner Klasse sind __________________ Schueler."),
    p("Ich habe __________________ Stifte in meinem Maeppchen."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Zahlen 1-20"),
    empty(),
    h2("Teil 1"),
    p("1.  [eins]"),
    p("2.  [fuenfzehn]"),
    p("3.  [sieben]"),
    p("4.  [zwanzig]"),
    p("5.  [Wie viele] ... [zwoelf]"),
    empty(),
    p("(Ablenkwoerter: drei, neun, elf, vierzehn, achtzehn, Jahre nicht alle benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("A:  Wie [alt] bist du?"),
    p("B:  Ich bin [elf] [Jahre] alt."),
    p("B:  Er ist [neun] Jahre alt."),
    p("B:  Ich habe [achtzehn] Buecher."),
    p("A:  Ich habe nur [drei]."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "eins, zwei, drei ...",         wortart: "Zahl",      beispiel: "Ich zaehle: eins, zwei, drei." },
  { wort: "vier, fuenf, sechs",           wortart: "Zahl",      beispiel: "Vier plus fuenf ist neun." },
  { wort: "sieben, acht, neun, zehn",     wortart: "Zahl",      beispiel: "Zehn minus drei ist sieben." },
  { wort: "elf, zwoelf",                  wortart: "Zahl",      beispiel: "Ich bin zwoelf Jahre alt." },
  { wort: "dreizehn bis neunzehn",        wortart: "Zahl",      beispiel: "Sie ist fuenfzehn Jahre alt." },
  { wort: "zwanzig (20)",                 wortart: "Zahl",      beispiel: "In meiner Klasse sind zwanzig Schueler." },
  { wort: "Wie viele?",                   wortart: "Fragewort", beispiel: "Wie viele Stifte hast du?" },
  { wort: "Wie alt bist du?",             wortart: "Frage",     beispiel: "Wie alt bist du? -- Ich bin zehn." },
  { wort: "Ich bin ... Jahre alt.",       wortart: "Satz",      beispiel: "Ich bin neun Jahre alt." },
  { wort: "Es gibt ...",                  wortart: "Phrase",    beispiel: "Es gibt 20 Schueler in der Klasse." },
  { wort: "zaehlen",                      wortart: "Verb",      beispiel: "Wir zaehlen von eins bis zwanzig." },
  { wort: "plus / minus / gleich",        wortart: "Rechenzeichen", beispiel: "Drei plus vier gleich sieben." },
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
    if (i === 5) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Zahlen 1-20"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Zahlen! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Zahlen auf Lernkarten (Ziffer vorne, deutsches Wort hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Zahlen 1-20"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
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
    bullet("eins wird zu ein vor Nomen: ein Buch, eine Katze (nicht eins Buch)."),
    bullet("zwoelf: Aussprache und Schreibung besonders ueben (haeufig Fehler)."),
    bullet("siebzehn (nicht siebzehn): das -en in sieben entfaellt."),
    bullet("Zahlen 1-12 einzeln lernen, 13-19 folgen dem Muster -zehn."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Zahlen 1-20"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Wie alt bist du?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Wie alt bist du?"),
    p("B:  Ich bin __________ Jahre alt. Und du?"),
    p("A:  Ich bin __________ Jahre alt."),
    p("B:  Wie alt ist dein Bruder / deine Schwester?"),
    p("A:  Er / Sie ist __________ Jahre alt."),
    p("B:  Wie viele Geschwister hast du?"),
    p("A:  Ich habe __________ Geschwister.  /  Ich bin Einzelkind."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Rechenaufgaben"),
    p("Stelle deinem Partner Rechenaufgaben. Er antwortet."),
    empty(),
    p("A:  Wie viel ist __________ plus __________?"),
    p("B:  __________ plus __________ ist __________."),
    p("A:  Und __________ minus __________?"),
    p("B:  __________ minus __________ ist __________."),
    p("A:  Richtig!  /  Falsch! Die Antwort ist __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wie alt bist du?"),
    writeLine(), empty(),
    p("2.  Wie viele Personen sind in deiner Familie?"),
    writeLine(), empty(),
    p("3.  Wie viele Schueler sind in deiner Klasse?"),
    writeLine(), empty(),
    p("4.  Wie viele Faecher hast du heute?"),
    writeLine(), empty(),
    p("5.  Was ist 8 plus 7?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Zahlen-Staffel"),
    p("Zaehlt in der Gruppe von 1 bis 20. Jeder nennt eine Zahl der Reihe nach."),
    p("Wer eine falsche Zahl sagt oder zu lange wartet, scheidet aus."),
    empty(),
    p("Variante: Zaehlt rueckwaerts von 20 bis 1."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Letzte Zahl (Rekord)")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
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
    h1("LOESUNG: Konversation Zahlen 1-20"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("B:  Ich bin [zehn] Jahre alt."),
    p("A:  Ich bin [elf] Jahre alt."),
    p("A:  Er / Sie ist [sieben] Jahre alt."),
    p("A:  Ich habe [zwei] Geschwister."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("A:  Wie viel ist [acht] plus [fuenf]?"),
    p("B:  Acht plus fuenf ist [dreizehn]."),
    p("A:  Und [zwanzig] minus [neun]?"),
    p("B:  Zwanzig minus neun ist [elf]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Zahlen korrekt als Wort ausgesprochen und geschrieben"),
    bullet("Wie alt bist du? -- Ich bin ... Jahre alt. korrekt formuliert"),
    bullet("Rechenaufgaben korrekt geloest (plus / minus / gleich)"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Zahlen 1-20"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Wie viele sind es?"),
    p("[BILD 1: 6 Felder mit je einer Gruppe von Gegenstaenden zum Zaehlen: z.B. 3 Aepfel, 7 Sterne, 12 Punkte, 5 Buecher, 15 Kreise, 20 kleine Quadrate]"),
    empty(),
    p("Zaehle und schreibe die Zahl als Wort."),
    empty(),
    p("Bild 1:  _________________________"),
    p("Bild 2:  _________________________"),
    p("Bild 3:  _________________________"),
    p("Bild 4:  _________________________"),
    p("Bild 5:  _________________________"),
    p("Bild 6:  _________________________"),
    empty(),
    h2("Aufgabe 2: Verbinde Ziffer und Wort."),
    p("[BILD 2: Linke Spalte mit Ziffern (4, 9, 13, 17, 20), rechte Spalte mit Woertern (neunzehn, vier, siebzehn, zwanzig, dreizehn, neun) -- eines mehr als Ablenkung]"),
    empty(),
    p("Verbinde die Ziffer mit dem richtigen Wort."),
    empty(),
    br(),
    h2("Aufgabe 3: Rechenbilder"),
    p("[BILD 3: Vier einfache Rechenaufgaben als Bild -- z.B. 3 Aepfel + 5 Aepfel = ?, 10 Sterne - 4 Sterne = ?, 6 Punkte + 8 Punkte = ?, 15 Kreise - 7 Kreise = ?]"),
    empty(),
    p("Schreibe die Rechenaufgabe und die Loesung auf Deutsch."),
    empty(),
    p("1.  __________ plus __________ ist __________."),
    p("2.  __________ minus __________ ist __________."),
    p("3.  __________ plus __________ ist __________."),
    p("4.  __________ minus __________ ist __________."),
    empty(),
    h2("Aufgabe 4: Was sagt das Kind?"),
    p("[BILD 4: Ein Kind haelt 14 Luftballons. Daneben eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne und zaehle."),
    p("Zeichne 8 Sterne, 5 Kreise und 12 Punkte. Schreibe darunter:"),
    p("Ich habe __________ Sterne, __________ Kreise und __________ Punkte gezeichnet."),
    empty(),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Zahlen 1-20"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Antworten abhaengig von den Bildern. Zahlen als Wort korrekt pruefen."),
    p("Beispiel: drei, sieben, zwoelf, fuenf, fuenfzehn, zwanzig"),
    empty(),
    h2("Aufgabe 2"),
    p("4 --> vier  |  9 --> neun  |  13 --> dreizehn  |  17 --> siebzehn  |  20 --> zwanzig"),
    p("Ablenkwort: neunzehn -- wird nicht benoetigt."),
    empty(),
    h2("Aufgabe 3 -- Beispiel"),
    p("1.  drei plus fuenf ist acht."),
    p("2.  zehn minus vier ist sechs."),
    p("3.  sechs plus acht ist vierzehn."),
    p("4.  fuenfzehn minus sieben ist acht."),
    p("(Antworten abhaengig von den eingefuegten Bildern)"),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Ich habe vierzehn Luftballons!"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Korrekte Saetze: Ich habe acht Sterne, fuenf Kreise und zwoelf Punkte gezeichnet."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("eins wird zu ein vor Nomen: ein Stern, eine Linie (nicht eins Stern)."),
    bullet("zwoelf und siebzehn besonders ueben -- haeufige Schreibfehler."),
    bullet("Rechenaufgaben koennen muendlich als Wettbewerb genutzt werden."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

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
