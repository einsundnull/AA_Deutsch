"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "05_Stundenplan");
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
        text: "A1 Kinder -- Schule & Lernen -- Stundenplan lesen",
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

function makeStuPlan() {
  const data = [
    ["", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
    ["1. (8-9 Uhr)", "Deutsch", "Mathe", "Deutsch", "Englisch", "Sport"],
    ["2. (9-10 Uhr)", "Mathe", "Englisch", "Mathe", "Sport", "Deutsch"],
    ["Pause (10-10:20)", "--", "--", "--", "--", "--"],
    ["3. (10:20-11:20)", "Sport", "Sachkunde", "Musik", "Deutsch", "Mathe"],
    ["4. (11:20-12:20)", "Kunst", "Sport", "Sachkunde", "Mathe", "Englisch"],
    ["5. (12:20-13:20)", "Englisch", "--", "Kunst", "--", "--"],
  ];
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [1500, 1500, 1500, 1500, 1500, 1500],
    rows: data.map(function(row, ri) {
      return new TableRow({ children: row.map(function(cell, ci) {
        const isHeader = ri === 0 || ci === 0;
        const isPause  = ri === 3;
        const fill = isPause ? "F0F0F0" : (isHeader ? LIGHT : "FFFFFF");
        return new TableCell({
          width: { size: 1500, type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cell, bold: isHeader, size: 20, font: "Arial" })] })]
        });
      })});
    })
  });
}

const TOPIC = "A1_Kinder_SchuleLernen_05_Stundenplan";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Stundenplan lesen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Der Stundenplan von Klasse 4b"),
    p("Schau dir den Stundenplan an. Beantworte dann die Fragen."),
    empty(),
    makeStuPlan(),
    empty(),
    h2("Aufgabe 1: Beantworte die Fragen."),
    empty(),
    p("a)  Welche Faecher hat die Klasse am Montag?"),
    writeLine(), empty(),
    p("b)  Wann beginnt die erste Stunde?"),
    writeLine(), empty(),
    p("c)  An welchem Tag haben die Schueler Musik?"),
    writeLine(), empty(),
    p("d)  Wie viele Stunden hat die Klasse am Mittwoch?"),
    writeLine(), empty(),
    p("e)  An welchen Tagen haben die Schueler nach der 4. Stunde frei?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 2: Ergaenze die Saetze."),
    empty(),
    p("a)  Am Montag beginnt der Unterricht um __________ Uhr."),
    p("b)  Am Dienstag haben die Schueler __________ Stunden."),
    p("c)  Die Pause ist von __________ bis __________ Uhr."),
    p("d)  Am __________ haben die Schueler Musik."),
    p("e)  In der 4. Stunde am Montag haben die Schueler __________."),
    empty(),
    h2("Aufgabe 3: Freies Schreiben"),
    p("Beschreibe deinen eigenen Stundenplan fuer einen Tag. Schreibe 3-5 Saetze."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Stundenplan lesen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Deutsch, Mathe, Sport, Kunst, Englisch."),
    p("b) Die erste Stunde beginnt um 8 Uhr."),
    p("c) Am Mittwoch haben die Schueler Musik."),
    p("d) Am Mittwoch hat die Klasse 5 Stunden."),
    p("e) Am Dienstag, Donnerstag und Freitag (kein 5. Fach)."),
    empty(),
    h2("Aufgabe 2"),
    p("a) um [8] Uhr."),
    p("b) [4] Stunden."),
    p("c) von [10] bis [10:20] Uhr."),
    p("d) Am [Mittwoch]."),
    p("e) [Kunst]."),
    empty(),
    h2("Aufgabe 3 - Bewertungskriterien"),
    bullet("Faecher korrekt genannt"),
    bullet("Zeitangaben mit um ... Uhr verwendet"),
    bullet("beginnen und enden korrekt eingesetzt"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Stundenplan lesen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Paulas Montag in der Schule"),
    p("Ich heisse Paula. Ich bin 9 Jahre alt. Heute ist Montag.", { size: 26 }),
    p("In der ersten Stunde um 8 Uhr haben wir Deutsch. Wir lesen einen Text. In der zweiten Stunde haben wir Mathe. Das ist schwer fuer mich.", { size: 26 }),
    p("Um 10 Uhr ist Pause. Wir essen unsere Brote und spielen auf dem Schulhof. Die Pause dauert 20 Minuten.", { size: 26 }),
    p("Nach der Pause haben wir Sport. Das ist mein Lieblingsfach! Wir spielen Voelkerball. Dann kommt Kunst. Ich male ein Bild.", { size: 26 }),
    p("In der letzten Stunde haben wir Englisch. Um 13:20 Uhr ist der Unterricht zu Ende. Ich gehe nach Hause.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Paula ist 9 Jahre alt.                               R  /  F"),
    p("b)  Die erste Stunde beginnt um 9 Uhr.                   R  /  F"),
    p("c)  In der zweiten Stunde haben sie Mathe.               R  /  F"),
    p("d)  Die Pause dauert 30 Minuten.                         R  /  F"),
    p("e)  Paulas Lieblingsfach ist Sport.                      R  /  F"),
    p("f)  Die letzte Stunde ist Kunst.                         R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Welches Fach hat Paula in der ersten Stunde?"),
    writeLine(), empty(),
    p("b)  Wann ist die Pause?"),
    writeLine(), empty(),
    p("c)  Was macht Paula in der Pause?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: In welcher Stunde?"),
    empty(),
    p("Deutsch:   __________.  Stunde"),
    p("Mathe:     __________.  Stunde"),
    p("Sport:     __________.  Stunde"),
    p("Kunst:     __________.  Stunde"),
    p("Englisch:  __________.  Stunde"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Was hast du in der ersten Stunde heute? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Stundenplan lesen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Die erste Stunde beginnt um 8 Uhr."),
    p("c) R"),
    p("d) F  Die Pause dauert 20 Minuten."),
    p("e) R"),
    p("f) F  Die letzte Stunde ist Englisch."),
    empty(),
    h2("Aufgabe 2"),
    p("a) In der ersten Stunde hat Paula Deutsch."),
    p("b) Die Pause ist um 10 Uhr."),
    p("c) Sie essen Brote und spielen auf dem Schulhof."),
    empty(),
    h2("Aufgabe 3"),
    p("Deutsch: 1. Stunde  |  Mathe: 2. Stunde  |  Sport: 3. Stunde"),
    p("Kunst: 4. Stunde  |  Englisch: 5. Stunde"),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Stundenplan", "Stunde", "Pause", "Unterricht", "beginnen", "enden",
                   "Wann", "Uhr", "frei", "Montag", "Mathe", "Deutsch"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Stundenplan lesen"),
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
    p("1.  Schau in den ______________! Was haben wir heute?"),
    p("2.  Der Unterricht ______________ um 8 Uhr."),
    p("3.  In der ______________ essen wir und spielen."),
    p("4.  Am ______________ haben wir zuerst ______________ und dann Mathe."),
    p("5.  Nach der Schule haben wir ______________. Ich gehe nach Hause."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  ______________ beginnt der Unterricht?"),
    p("B:  Der ______________ beginnt um 8 ______________."),
    p("A:  Was haben wir in der ersten ______________?"),
    p("B:  In der ersten Stunde haben wir ______________."),
    p("A:  Und wann ist die ______________?"),
    p("B:  Die Pause ist um 10 Uhr."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber deinen Stundenplan."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Mein __________________ beginnt um __________________ Uhr."),
    p("Heute habe ich __________________ Stunden."),
    p("In der ersten Stunde habe ich __________________."),
    p("Die __________________ ist um __________________ Uhr."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Stundenplan lesen"),
    empty(),
    h2("Teil 1"),
    p("1.  [Stundenplan]"),
    p("2.  Der Unterricht [beginnt] um 8 Uhr."),
    p("3.  In der [Pause] essen wir und spielen."),
    p("4.  Am [Montag] haben wir zuerst [Deutsch] und dann Mathe."),
    p("5.  Nach der Schule haben wir [frei]."),
    empty(),
    p("(Ablenkwoerter: enden, Wann, Uhr, Stunde, Mathe nicht alle benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("A:  [Wann] beginnt der Unterricht?"),
    p("B:  Der [Unterricht] beginnt um 8 [Uhr]."),
    p("A:  Was haben wir in der ersten [Stunde]?"),
    p("B:  In der ersten Stunde haben wir [Deutsch / Mathe]."),
    p("A:  Und wann ist die [Pause]?"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "der Stundenplan",           wortart: "Nomen (m)",   beispiel: "Schau in den Stundenplan!" },
  { wort: "die Stunde / die Stunden",  wortart: "Nomen (f)",   beispiel: "Die erste Stunde beginnt um 8 Uhr." },
  { wort: "die Pause / die Pausen",    wortart: "Nomen (f)",   beispiel: "In der Pause spielen wir." },
  { wort: "der Unterricht",            wortart: "Nomen (m)",   beispiel: "Der Unterricht beginnt um 8 Uhr." },
  { wort: "beginnen",                  wortart: "Verb",        beispiel: "Die Schule beginnt um 8 Uhr." },
  { wort: "enden",                     wortart: "Verb",        beispiel: "Der Unterricht endet um 13 Uhr." },
  { wort: "Wann?",                     wortart: "Fragewort",   beispiel: "Wann beginnt die Schule?" },
  { wort: "um ... Uhr",                wortart: "Zeitangabe",  beispiel: "Der Unterricht beginnt um 8 Uhr." },
  { wort: "die erste / zweite Stunde", wortart: "Ordinalzahl", beispiel: "In der ersten Stunde haben wir Mathe." },
  { wort: "frei haben",                wortart: "Verb-Phrase", beispiel: "Am Nachmittag haben wir frei." },
  { wort: "der Schultag",              wortart: "Nomen (m)",   beispiel: "Montag ist ein langer Schultag." },
  { wort: "nach der Schule",           wortart: "Phrase",      beispiel: "Nach der Schule gehe ich nach Hause." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Stundenplan lesen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Stundenplan lesen"),
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
    bullet("um + Uhrzeit: um 8 Uhr -- auf A1 nur volle Stunden einfuehren."),
    bullet("beginnen vs. anfangen: beide korrekt, beginnen ist formeller."),
    bullet("Ordinalzahlen: erst-, zweit-, dritt- als Vorsilbe passiv einfuehren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Stundenplan lesen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Was haben wir heute?"),
    p("Schaut zusammen auf den Stundenplan. Fuelle die Luecken aus."),
    empty(),
    p("A:  Was haben wir heute in der ersten Stunde?"),
    p("B:  In der ersten Stunde haben wir __________."),
    p("A:  Und in der zweiten Stunde?"),
    p("B:  Da haben wir __________."),
    p("A:  Wann ist die Pause?"),
    p("B:  Die Pause ist um __________ Uhr."),
    p("A:  Was machen wir in der Pause?"),
    p("B:  Wir __________ und __________."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Welche Faecher hast du wann?"),
    p("Frage deinen Partner nach seinem Stundenplan."),
    empty(),
    p("A:  Wann hast du Sport?"),
    p("B:  Sport habe ich am __________ in der __________ Stunde."),
    p("A:  Und wann beginnt der Unterricht?"),
    p("B:  Der Unterricht beginnt um __________ Uhr."),
    p("A:  Wann hast du am Freitag frei?"),
    p("B:  Am Freitag habe ich nach der __________ Stunde frei."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wann beginnt dein Unterricht?"),
    writeLine(), empty(),
    p("2.  Was ist dein Lieblingsfach im Stundenplan?"),
    writeLine(), empty(),
    p("3.  An welchem Tag hast du die meisten Stunden?"),
    writeLine(), empty(),
    p("4.  Wann hast du Pause?"),
    writeLine(), empty(),
    p("5.  Was machst du nach der Schule?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Stundenplan-Quiz"),
    p("Person A nennt ein Fach und eine Stunde. Person B nennt den Tag aus dem Stundenplan."),
    p("Beispiel: A: Musik -- 3. Stunde.  B: Das ist am Mittwoch!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Fach und Stunde"), hCell("Tag (Antwort)")] }),
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
    h1("LOESUNG: Konversation Stundenplan lesen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel (Montag)"),
    p("B:  In der ersten Stunde haben wir [Deutsch]."),
    p("B:  Da haben wir [Mathe]."),
    p("B:  Die Pause ist um [10] Uhr."),
    p("B:  Wir [essen] und [spielen]."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("B:  Sport habe ich am [Montag / Mittwoch / Freitag] in der [3.] Stunde."),
    p("B:  Der Unterricht beginnt um [8] Uhr."),
    p("B:  Am Freitag habe ich nach der [4.] Stunde frei."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Faecher und Wochentage korrekt aus dem Stundenplan gelesen"),
    bullet("um ... Uhr fuer Zeitangaben verwendet"),
    bullet("in der ersten / zweiten Stunde korrekt formuliert"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const stundenCols = [1500, 1500, 1500, 1500, 1500, 1500];
  const headerRow = ["Stunde", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
  const emptyRows = ["1.", "2.", "Pause", "3.", "4.", "5."];
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Stundenplan lesen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Schau auf den Stundenplan und beantworte die Fragen."),
    p("[BILD 1: Stundenplan Klasse 4b wie in der Schreibuebung -- Mo: Deutsch/Mathe/Sport/Kunst/Englisch, Di: Mathe/Englisch/Sachkunde/Sport/--, Mi: Deutsch/Mathe/Musik/Sachkunde/Kunst, Do: Englisch/Sport/Deutsch/Mathe/--, Fr: Sport/Deutsch/Mathe/Englisch/--]"),
    empty(),
    p("a)  Welche Faecher hat die Klasse am Mittwoch?"),
    writeLine(), empty(),
    p("b)  An welchem Tag haben die Schueler Musik?"),
    writeLine(), empty(),
    p("c)  Wie viele Stunden hat die Klasse am Dienstag?"),
    writeLine(), empty(),
    p("d)  In welcher Stunde haben sie am Freitag Sport?"),
    writeLine(), empty(),
    h2("Aufgabe 2: Verbinde Stunde und Fach (Montag)."),
    p("[BILD 2: Montags-Stundenplan links mit Nummern 1-5, rechts durcheinander: Deutsch, Mathe, Sport, Kunst, Englisch]"),
    empty(),
    p("Verbinde die Stunde mit dem richtigen Fach mit einer Linie."),
    empty(),
    br(),
    h2("Aufgabe 3: Mein eigener Stundenplan"),
    p("Trage deine Schulfaecher in diesen Stundenplan ein."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: stundenCols,
      rows: [
        new TableRow({ children: headerRow.map(function(t, ci) {
          return new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, bold: true, size: 20, font: "Arial" })] })] });
        })}),
      ].concat(emptyRows.map(function(label) {
        return new TableRow({ children: [
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty()] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty()] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty()] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty()] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty()] }),
        ]});
      }))
    }),
    empty(),
    h2("Aufgabe 4: Was sagt das Kind?"),
    p("[BILD 3: Ein Kind zeigt auf einen Stundenplan. Daneben eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind ueber seinen Stundenplan? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Mein Lieblingstag in der Schule"),
    p("Zeichne deinen Lieblingsschultag als kleinen Comic (3 Bilder: Morgen, Mittag, Nachmittag)."),
    p("Schreibe unter jedes Bild 1 Satz."),
    empty(),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Stundenplan lesen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1 -- Musterantworten"),
    p("a) Deutsch, Mathe, Musik, Sachkunde, Kunst."),
    p("b) Am Mittwoch haben die Schueler Musik."),
    p("c) Am Dienstag hat die Klasse 4 Stunden."),
    p("d) Am Freitag haben sie in der 1. Stunde Sport."),
    empty(),
    h2("Aufgabe 2"),
    p("Korrekte Zuordnung: 1. Deutsch / 2. Mathe / 3. Sport / 4. Kunst / 5. Englisch"),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Stundenplaene akzeptieren. Faecher-Namen korrekt pruefen."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Heute habe ich Sport und Deutsch. Das ist ein toller Tag!"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Comic-Zeichnungen akzeptieren. Zeitangaben pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Aufgabe 3 (eigener Stundenplan) als Gespraechsgrundlage fuer Partnerarbeit nutzen."),
    bullet("Stundenplan-Quiz (Konversation) und Aufgabe 2 gut kombinierbar."),
    bullet("um + Uhrzeit auf A1 auf volle Stunden beschraenken."),
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
