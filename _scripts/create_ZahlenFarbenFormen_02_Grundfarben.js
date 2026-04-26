"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "04_ZahlenFarbenFormen", "02_Grundfarben");
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
        text: "A1 Kinder -- Zahlen, Farben, Formen -- Grundfarben",
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

const TOPIC = "A1_Kinder_ZahlenFarbenFormen_02_Grundfarben";

function makeFarbenTable() {
  const farben = [
    ["rot", "blau", "gelb", "gruen", "orange"],
    ["schwarz", "weiss", "braun", "grau", "rosa"],
    ["lila", "pink", "hellblau", "dunkelblau", ""],
  ];
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: Array(5).fill(1800),
    rows: farben.map(function(row, ri) {
      return new TableRow({ children: row.map(function(cell) {
        return new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: ri % 2 === 0 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cell, bold: !!cell, size: 24, font: "Arial" })] })]
        });
      })});
    })
  });
}

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Grundfarben"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Farben -- Uebersicht"),
    makeFarbenTable(),
    empty(),
    h2("Aufgabe 1: Welche Farbe hat das?"),
    p("Schreibe die Farbe auf. Benutze: Das ist ... / Der/Die/Das ... ist ..."),
    empty(),
    pBold("Beispiel:  Gras"),
    p("Das Gras ist gruen."),
    empty(),
    p("a)  der Schnee:    __________________________________________"),
    p("b)  die Sonne:     __________________________________________"),
    p("c)  die Nacht:     __________________________________________"),
    p("d)  das Blut:      __________________________________________"),
    p("e)  der Himmel:    __________________________________________"),
    p("f)  die Erde:      __________________________________________"),
    empty(),
    h2("Aufgabe 2: Schreibe Saetze nach dem Muster."),
    empty(),
    pBold("Muster:  Rucksack / blau"),
    p("Mein Rucksack ist blau."),
    empty(),
    p("a)  Heft / rot:         ___________________________________"),
    p("b)  Lineal / gelb:      ___________________________________"),
    p("c)  Maeppchen / gruen:  ___________________________________"),
    p("d)  Stift / schwarz:    ___________________________________"),
    p("e)  Buch / braun:       ___________________________________"),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Welche __________________ hat dein Rucksack?"),
    p("b)  Das Feuer ist __________________. Pass auf!"),
    p("c)  Der Elefant ist __________________."),
    p("d)  Die Banane ist __________________."),
    p("e)  __________________ und __________________ ergibt Gruen."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe 3 Dinge in deinem Klassenzimmer mit Farben. Schreibe 3-5 Saetze."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Grundfarben"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Der Schnee ist weiss."),
    p("b) Die Sonne ist gelb (oder orange)."),
    p("c) Die Nacht ist schwarz (oder dunkel)."),
    p("d) Das Blut ist rot."),
    p("e) Der Himmel ist blau."),
    p("f) Die Erde ist braun."),
    empty(),
    h2("Aufgabe 2"),
    p("a) Mein Heft ist rot."),
    p("b) Mein Lineal ist gelb."),
    p("c) Mein Maeppchen ist gruen."),
    p("d) Mein Stift ist schwarz."),
    p("e) Mein Buch ist braun."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Welche [Farbe] hat dein Rucksack?"),
    p("b) Das Feuer ist [rot / orange]."),
    p("c) Der Elefant ist [grau]."),
    p("d) Die Banane ist [gelb]."),
    p("e) [Blau] und [gelb] ergibt Gruen."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Mindestens 3 Farben korrekt verwendet"),
    bullet("Artikel (der/die/das) mit Farbadjektiv korrekt kombiniert"),
    bullet("Satzstruktur: Der/Die/Das ... ist ... korrekt"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Grundfarben"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Mias buntes Zimmer"),
    p("Ich heisse Mia. Ich bin 9 Jahre alt. Mein Zimmer ist sehr bunt!", { size: 26 }),
    p("Die Waende sind weiss. Aber ich habe viele bunte Bilder. Ein Bild zeigt einen roten Apfel, eine gelbe Banane und eine gruene Birne.", { size: 26 }),
    p("Mein Bett ist blau. Die Decke ist dunkelblau mit kleinen weissen Sternen. Das sieht aus wie der Himmel bei Nacht!", { size: 26 }),
    p("Mein Schreibtisch ist braun. Darauf liegt mein Maeppchen. Es ist rosa mit lila Punkten. Ich mag es sehr.", { size: 26 }),
    p("Mein Lieblingsding in meinem Zimmer ist ein grauer Elefant aus Stoff. Er heisst Grauchen. Er sitzt immer auf meinem Bett.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Mias Waende sind gelb.                               R  /  F"),
    p("b)  Das Bett ist blau.                                   R  /  F"),
    p("c)  Die Decke hat weisse Sterne.                         R  /  F"),
    p("d)  Das Maeppchen ist gruen mit rosa Punkten.            R  /  F"),
    p("e)  Der Elefant heisst Grauchen.                         R  /  F"),
    p("f)  Grauchen sitzt auf dem Schreibtisch.                 R  /  F"),
    empty(),
    h2("Aufgabe 2: Welche Farbe hat das? Finde die Antwort im Text."),
    empty(),
    p("a)  die Waende:     __________________"),
    p("b)  das Bett:       __________________"),
    p("c)  die Decke:      __________________"),
    p("d)  das Maeppchen:  __________________"),
    p("e)  der Elefant:    __________________"),
    empty(),
    h2("Aufgabe 3: Beantworte die Fragen."),
    empty(),
    p("a)  Was zeigt das Bild an Mias Wand?"),
    writeLine(), empty(),
    p("b)  Was mag Mia sehr?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 4: Und du?"),
    p("Welche Farbe hat dein Zimmer? Schreibe 2-3 Saetze."),
    writeLine(), writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Grundfarben"),
    empty(),
    h2("Aufgabe 1"),
    p("a) F  Die Waende sind weiss."),
    p("b) R"),
    p("c) R"),
    p("d) F  Das Maeppchen ist rosa mit lila Punkten."),
    p("e) R"),
    p("f) F  Grauchen sitzt auf dem Bett."),
    empty(),
    h2("Aufgabe 2"),
    p("a) weiss  b) blau  c) dunkelblau (mit weissen Sternen)  d) rosa (mit lila Punkten)  e) grau"),
    empty(),
    h2("Aufgabe 3"),
    p("a) Das Bild zeigt einen roten Apfel, eine gelbe Banane und eine gruene Birne."),
    p("b) Mia mag ihr Maeppchen sehr."),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["rot", "blau", "gelb", "gruen", "schwarz", "weiss",
                   "braun", "grau", "rosa", "orange", "Farbe", "bunt"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Grundfarben"),
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
    p("1.  Das Gras ist ______________."),
    p("2.  Die Sonne ist ______________."),
    p("3.  Die Nacht ist ______________. Alles ist dunkel."),
    p("4.  Der Himmel ist ______________."),
    p("5.  Mein Rucksack ist ______________. Er hat viele Farben!"),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Welche ______________ hat dein Stift?"),
    p("B:  Mein Stift ist ______________. Und deiner?"),
    p("A:  Ich habe einen ______________ Stift und einen ______________ Stift."),
    p("B:  Oh! Mein Radiergummi ist ______________. Wie ein Schwan!"),
    p("A:  Cool! Und dein Heft?"),
    p("B:  Das Heft ist ______________ mit ______________ Linien."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Mein Lieblingsstift ist __________________."),
    p("Mein Rucksack ist __________________."),
    p("Die Waende in meinem Zimmer sind __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Grundfarben"),
    empty(),
    h2("Teil 1"),
    p("1.  [gruen]"),
    p("2.  [gelb] (oder orange -- akzeptieren)"),
    p("3.  [schwarz]"),
    p("4.  [blau]"),
    p("5.  [bunt]"),
    empty(),
    p("(Ablenkwoerter: rot, braun, grau, rosa, orange, Farbe nicht alle benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("A:  Welche [Farbe] hat dein Stift?"),
    p("B:  Mein Stift ist [rot / blau / schwarz / ...]."),
    p("A:  Ich habe einen [roten / blauen] Stift und einen [gelben / gruenen] Stift."),
    p("B:  Mein Radiergummi ist [weiss]."),
    p("B:  Das Heft ist [blau / rot] mit [weissen / blauen] Linien."),
    p("(Individuelle Antworten bei Farben akzeptieren, wenn Kontext stimmt)"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "rot",                  wortart: "Adjektiv", beispiel: "Das Feuer ist rot." },
  { wort: "blau",                 wortart: "Adjektiv", beispiel: "Der Himmel ist blau." },
  { wort: "gelb",                 wortart: "Adjektiv", beispiel: "Die Sonne ist gelb." },
  { wort: "gruen",                wortart: "Adjektiv", beispiel: "Das Gras ist gruen." },
  { wort: "orange",               wortart: "Adjektiv", beispiel: "Die Orange ist orange." },
  { wort: "schwarz",              wortart: "Adjektiv", beispiel: "Die Nacht ist schwarz." },
  { wort: "weiss",                wortart: "Adjektiv", beispiel: "Der Schnee ist weiss." },
  { wort: "braun",                wortart: "Adjektiv", beispiel: "Der Schreibtisch ist braun." },
  { wort: "grau",                 wortart: "Adjektiv", beispiel: "Der Elefant ist grau." },
  { wort: "rosa / pink",          wortart: "Adjektiv", beispiel: "Das Maeppchen ist rosa." },
  { wort: "lila",                 wortart: "Adjektiv", beispiel: "Die Blume ist lila." },
  { wort: "Welche Farbe hat ...?", wortart: "Frage",   beispiel: "Welche Farbe hat dein Rucksack?" },
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
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Farbe", bold: true, size: 22, font: "Arial" })] })] }),
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
  const children = [studentHead(), empty(), h1("Wortliste: Grundfarben"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Farben! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Male ein Kaeestchen in der Farbe neben das Wort -- so lernst du es besser!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Grundfarben"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Farbe"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Farbadjektive bleiben unveraendert nach sein: Das Buch ist rot. (kein -er/-e/-es)"),
    bullet("Adjektivdeklination (ein roter Stift) auf A1 passiv einfuehren."),
    bullet("lila und rosa sind undeklinierbar (kein Plural, keine Endung)."),
    bullet("Mischfarben als Erweiterung: Blau + Gelb = Gruen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Grundfarben"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Welche Farbe ist das?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Welche Farbe hat dein Rucksack?"),
    p("B:  Mein Rucksack ist __________. Und deiner?"),
    p("A:  Meiner ist __________."),
    p("B:  Welche Farbe mag ich am liebsten?"),
    p("A:  Ich wette, __________."),
    p("B:  Richtig!  /  Falsch! Ich mag __________ am liebsten."),
    p("A:  Ich mag __________ am liebsten. Das ist meine Lieblingsfarbe."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Was ist ... Farbe?"),
    p("Partner A nennt eine Farbe. Partner B nennt 3 Dinge in dieser Farbe."),
    empty(),
    p("A:  Was ist __________?"),
    p("B:  __________ ist __________, __________ und __________!"),
    p("A:  Super! Jetzt du. Was ist __________?"),
    p("B:  Hmm ... __________ ist __________, __________ und __________!"),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Welche Farbe hat dein Lieblingstier?"),
    writeLine(), empty(),
    p("2.  Welche Farbe magst du nicht? Warum?"),
    writeLine(), empty(),
    p("3.  Was in deiner Klasse ist blau?"),
    writeLine(), empty(),
    p("4.  Welche Farbe hat dein Haus / deine Wohnung?"),
    writeLine(), empty(),
    p("5.  Was ist deine Lieblingsfarbe?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Farben-Detektiv"),
    p("Eine Person denkt an einen Gegenstand im Klassenzimmer. Die anderen fragen: Welche Farbe hat es?"),
    p("Die Person antwortet nur mit der Farbe. Wer den Gegenstand errät, ist als naechstes dran."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Person"), hCell("Farbe"), hCell("Gegenstand (Loesung)")] }),
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
    h1("LOESUNG: Konversation Grundfarben"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("B:  Mein Rucksack ist [blau]."),
    p("A:  Meiner ist [rot]."),
    p("A:  Ich wette, [blau / rot]."),
    p("B:  Ich mag [gruen] am liebsten."),
    p("A:  Ich mag [lila] am liebsten."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("A:  Was ist [rot]?"),
    p("B:  [Rot] ist [ein Apfel], [Feuer] und [Tomaten]!"),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Farben korrekt und fluessig verwendet"),
    bullet("Welche Farbe hat ...? korrekt formuliert"),
    bullet("Adjektiv nach sein ohne Endung: ist rot / ist blau"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Grundfarben"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Welche Farbe ist das?"),
    p("[BILD 1: 8 einfarbige Farbfelder (Rechtecke) nebeneinander: rot, blau, gelb, gruen, schwarz, weiss, braun, grau -- ohne Beschriftung]"),
    empty(),
    p("Schreibe die Farbe unter jedes Feld."),
    empty(),
    p("1. __________  2. __________  3. __________  4. __________"),
    p("5. __________  6. __________  7. __________  8. __________"),
    empty(),
    h2("Aufgabe 2: Welche Farbe hat das?"),
    p("[BILD 2: 6 bekannte Gegenstaende oder Tiere in ihrer typischen Farbe: Banane (gelb), Himmel (blau), Apfel (rot), Frog/Frosch (gruen), Elefant (grau), Schneemann (weiss)]"),
    empty(),
    p("Schreibe einen Satz fuer jedes Bild: Der/Die/Das ... ist ..."),
    empty(),
    p("1.  _____________________________________________"),
    p("2.  _____________________________________________"),
    p("3.  _____________________________________________"),
    p("4.  _____________________________________________"),
    p("5.  _____________________________________________"),
    p("6.  _____________________________________________"),
    empty(),
    br(),
    h2("Aufgabe 3: Male und beschrifte."),
    p("[BILD 3: 5 leere Umrisszeichnungen: Apfel, Sonne, Baum, Wolke, Auto -- ohne Farbe]"),
    empty(),
    p("Male die Bilder an. Schreibe dann die Farbe dazu."),
    empty(),
    p("Der Apfel ist __________.       Die Sonne ist __________."),
    p("Der Baum ist __________.        Die Wolke ist __________."),
    p("Das Auto ist __________."),
    empty(),
    h2("Aufgabe 4: Was sagt das Kind?"),
    p("[BILD 4: Ein Kind malt ein buntes Bild. Daneben eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind ueber sein Bild? Schreibe 2 Saetze."),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Mein Regenbogen"),
    p("Zeichne einen Regenbogen. Schreibe alle Farben auf Deutsch dazu."),
    p("Tipp: Ein Regenbogen hat 7 Farben: rot, orange, gelb, gruen, blau, indigo, violett."),
    empty(),
    ...writeLines(7), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Grundfarben"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("1. rot  2. blau  3. gelb  4. gruen  5. schwarz  6. weiss  7. braun  8. grau"),
    p("(Reihenfolge abhaengig vom Bild)"),
    empty(),
    h2("Aufgabe 2 -- Beispielantworten"),
    p("1. Die Banane ist gelb."),
    p("2. Der Himmel ist blau."),
    p("3. Der Apfel ist rot."),
    p("4. Der Frosch ist gruen."),
    p("5. Der Elefant ist grau."),
    p("6. Der Schneemann ist weiss."),
    p("(Artikel pruefen: der Apfel m., die Banane f., der Frosch m., der Elefant m.)"),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Farben akzeptieren (z.B. roten, gruenen oder gelben Apfel)."),
    p("Pruefen: Satzstruktur Der/Die/Das ... ist ... korrekt."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Ich male einen blauen Himmel und gruenes Gras. Das Bild ist bunt!"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Regenbogenfarben in Reihenfolge: rot, orange, gelb, gruen, blau, indigo, violett/lila"),
    p("Individuelle Zeichnungen akzeptieren. Farbnamen auf Deutsch pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Adjektiv nach sein ohne Endung: Das Buch ist rot. (nicht rotes)"),
    bullet("Adjektiv vor Nomen mit Endung: ein roter Apfel -- passiv auf A1 einfuehren."),
    bullet("Aufgabe 5 (Regenbogen) eignet sich als kreative Hausaufgabe."),
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
