"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "01_SichVorstellen", "03_Wohnort");
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
        text: "A1 Kinder -- Sich selbst vorstellen -- Wohnort",
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

const TOPIC = "A1_Kinder_SichVorstellen_03_Wohnort";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Wohnort nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Antworte auf die Frage."),
    p("Wo wohnst du?"),
    p("Ich wohne in __________________________________________________."),
    empty(),
    h2("Aufgabe 2: Schreibe Fragen und Antworten."),
    p("Schau auf die Informationen. Schreibe Fragen und Antworten."),
    empty(),
    pBold("Beispiel:  Lena - Hamburg"),
    p("Frage:   Wo wohnt Lena?"),
    p("Antwort: Sie wohnt in Hamburg."),
    empty(),
    pBold("a)  Tim - Berlin"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("b)  Mira - Wien"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("c)  Kai - Zuerich"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Ich __________________ in Muenchen."),
    p("b)  __________________ wohnst du?"),
    p("c)  Er wohnt __________________ Koeln."),
    p("d)  Sie wohnt in einer kleinen __________________."),
    p("e)  Wir wohnen in Deutschland. Das ist ein __________________."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3-5 Saetze. Wo wohnst du? Wie ist deine Stadt oder dein Dorf?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Wohnort nennen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("Ich wohne in [Stadtname]. (individuelle Antwort)"),
    empty(),
    h2("Aufgabe 2"),
    pBold("a) Tim - Berlin"),
    p("Frage:   Wo wohnt Tim?"),
    p("Antwort: Er wohnt in Berlin."),
    empty(),
    pBold("b) Mira - Wien"),
    p("Frage:   Wo wohnt Mira?"),
    p("Antwort: Sie wohnt in Wien."),
    empty(),
    pBold("c) Kai - Zuerich"),
    p("Frage:   Wo wohnt Kai?"),
    p("Antwort: Er wohnt in Zuerich."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Ich [wohne] in Muenchen."),
    p("b) [Wo] wohnst du?"),
    p("c) Er wohnt [in] Koeln."),
    p("d) Sie wohnt in einer kleinen [Stadt]."),
    p("e) Wir wohnen in Deutschland. Das ist ein [Land]."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Ich wohne in ... korrekt verwendet"),
    bullet("Stadt, Dorf oder Land korrekt eingesetzt"),
    bullet("Verb wohnen richtig konjugiert"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Wohnort nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Wo wohnen wir?"),
    p("Hallo! Ich heisse Noah. Ich bin 10 Jahre alt. Ich wohne in Hamburg. Hamburg ist eine grosse Stadt in Deutschland.", { size: 26 }),
    p("Meine Freundin heisst Sara. Sie wohnt in Wien. Wien ist die Hauptstadt von Oesterreich. Sara sagt, Wien ist sehr schoen.", { size: 26 }),
    p("Mein Freund heisst Luca. Er wohnt in einem kleinen Dorf. Das Dorf heisst Bergtal. Es ist nicht weit von Muenchen. Luca mag sein Dorf sehr.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Noah wohnt in Berlin.                              R  /  F"),
    p("b)  Hamburg ist eine Stadt in Deutschland.             R  /  F"),
    p("c)  Sara wohnt in Wien.                                R  /  F"),
    p("d)  Wien ist die Hauptstadt von Deutschland.           R  /  F"),
    p("e)  Luca wohnt in einem grossen Dorf.                  R  /  F"),
    p("f)  Das Dorf heisst Bergtal.                           R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wo wohnt Noah?"),
    writeLine(), empty(),
    p("b)  Was ist Wien?"),
    writeLine(), empty(),
    p("c)  Wo ist das Dorf Bergtal?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Finde im Text die passenden Woerter."),
    p("Suche: eine grosse Stadt, ein kleines Dorf, eine Hauptstadt."),
    p("Schreibe den Satz aus dem Text auf."),
    empty(),
    pBold("grosse Stadt:"),
    writeLine(), empty(),
    pBold("kleines Dorf:"),
    writeLine(), empty(),
    pBold("Hauptstadt:"),
    writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Wohnort nennen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) F  Noah wohnt in Hamburg."),
    p("b) R"),
    p("c) R"),
    p("d) F  Wien ist die Hauptstadt von Oesterreich."),
    p("e) F  Luca wohnt in einem kleinen Dorf."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Noah wohnt in Hamburg."),
    p("b) Wien ist die Hauptstadt von Oesterreich."),
    p("c) Das Dorf ist nicht weit von Muenchen."),
    empty(),
    h2("Aufgabe 3"),
    pBold("grosse Stadt:"),
    p("Hamburg ist eine grosse Stadt in Deutschland."),
    empty(),
    pBold("kleines Dorf:"),
    p("Er wohnt in einem kleinen Dorf."),
    empty(),
    pBold("Hauptstadt:"),
    p("Wien ist die Hauptstadt von Oesterreich."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["wohne", "wohnt", "in", "wo", "Stadt", "Dorf", "Land", "Wo", "wohnst", "Strasse"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Wohnort nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
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
    p("1.  Ich ______________ in Berlin."),
    p("2.  ______________ wohnst du?"),
    p("3.  Er ______________ in einer kleinen Stadt."),
    p("4.  Sie wohnt ______________ Muenchen."),
    p("5.  Hamburg ist eine grosse ______________."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  ______________ wohnst du?"),
    p("B:  Ich wohne ______________ Zuerich. Das ist in der Schweiz."),
    p("A:  Ist Zuerich eine Stadt oder ein ______________?"),
    p("B:  Zuerich ist eine grosse Stadt. Und du, ______________ wohnst du?"),
    p("A:  Ich wohne in einem kleinen ______________ auf dem Land."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Ich wohne in __________________. Das ist eine Stadt / ein Dorf"),
    p("in __________________."),
    empty(),
    p("Mein Freund / Meine Freundin wohnt in __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Wohnort nennen"),
    empty(),
    h2("Teil 1"),
    p("1.  Ich [wohne] in Berlin."),
    p("2.  [Wo] wohnst du?"),
    p("3.  Er [wohnt] in einer kleinen Stadt."),
    p("4.  Sie wohnt [in] Muenchen."),
    p("5.  Hamburg ist eine grosse [Stadt]."),
    empty(),
    p("(Ablenkwoerter: Dorf, Strasse nicht benoetigt.)"),
    empty(),
    h2("Teil 2"),
    p("A:  [Wo] wohnst du?"),
    p("B:  Ich wohne [in] Zuerich. Das ist in der Schweiz."),
    p("A:  Ist Zuerich eine Stadt oder ein [Dorf]?"),
    p("B:  Zuerich ist eine grosse Stadt. Und du, [wo] wohnst du?"),
    p("A:  Ich wohne in einem kleinen [Dorf] auf dem Land."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "der Wohnort",              wortart: "Nomen (m)", beispiel: "Was ist dein Wohnort?" },
  { wort: "wohnen",                   wortart: "Verb",      beispiel: "Ich wohne in Berlin." },
  { wort: "Wo wohnst du?",            wortart: "Frage",     beispiel: "Wo wohnst du? - In Hamburg." },
  { wort: "Ich wohne in ...",         wortart: "Satz",      beispiel: "Ich wohne in Wien." },
  { wort: "die Stadt / die Staedte",  wortart: "Nomen (f)", beispiel: "Berlin ist eine grosse Stadt." },
  { wort: "das Dorf / die Doerfer",   wortart: "Nomen (n)", beispiel: "Ich wohne in einem kleinen Dorf." },
  { wort: "das Land / die Laender",   wortart: "Nomen (n)", beispiel: "Deutschland ist ein Land." },
  { wort: "die Hauptstadt",           wortart: "Nomen (f)", beispiel: "Berlin ist die Hauptstadt." },
  { wort: "gross / klein",            wortart: "Adjektiv",  beispiel: "Hamburg ist gross. Das Dorf ist klein." },
  { wort: "die Adresse",              wortart: "Nomen (f)", beispiel: "Wie ist deine Adresse?" },
  { wort: "die Strasse",              wortart: "Nomen (f)", beispiel: "Ich wohne in der Hauptstrasse." },
  { wort: "in der Naehe von ...",     wortart: "Phrase",    beispiel: "Wir wohnen in der Naehe von Muenchen." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Wohnort nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Wohnort nennen"),
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
    bullet("wohnen in: kein Artikel vor Staedten/Laendern (Ausnahme: die Schweiz, die Tuerkei)."),
    bullet("gross / klein bei A1 nur in Grundform einfuehren."),
    bullet("in der Naehe von passiv einfuehren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Wohnort nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Ergaenze den Dialog."),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Hallo! Wie heisst du?"),
    p("B:  Ich heisse __________. Und du?"),
    p("A:  Ich heisse __________. Wo __________ du?"),
    p("B:  Ich wohne __________ __________. Das ist in __________."),
    p("A:  Ist das eine Stadt oder ein Dorf?"),
    p("B:  Das ist __________. Und wo wohnst du?"),
    p("A:  Ich wohne in __________. Es ist __________."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Stelle deinen Nachbarn vor."),
    p("Fuelle zuerst die Informationen aus:"),
    empty(),
    p("Mein Nachbar / Meine Nachbarin heisst: __________________________"),
    p("Er / Sie wohnt in:                     __________________________"),
    p("Das ist in:                            __________________________"),
    empty(),
    p("Stelle er/sie der Klasse vor:"),
    p("Das ist __________. Er/Sie wohnt in __________. Das ist in __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wo wohnst du?"),
    writeLine(), empty(),
    p("2.  Wohnst du in einer Stadt oder in einem Dorf?"),
    writeLine(), empty(),
    p("3.  Wie heisst deine Strasse?"),
    writeLine(), empty(),
    p("4.  Ist dein Wohnort gross oder klein?"),
    writeLine(), empty(),
    p("5.  Was magst du an deinem Wohnort?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Reise durch die Klasse"),
    p("Gehe zu 3 Mitschuelerinnen/Mitschuelern. Frage: Wo wohnst du?"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Wohnort")] }),
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
    h1("LOESUNG: Konversation Wohnort nennen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Wie heisst du?"),
    p("B:  Ich heisse [Name]. Und du?"),
    p("A:  Ich heisse [Name]. Wo [wohnst] du?"),
    p("B:  Ich wohne [in] [Ort]. Das ist in [Land]."),
    p("A:  Ist das eine Stadt oder ein Dorf?"),
    p("B:  Das ist [eine Stadt / ein Dorf]. Und wo wohnst du?"),
    p("A:  Ich wohne in [Ort]. Es ist [gross / klein]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Korrekte Verwendung von Ich wohne in ... und Er/Sie wohnt in ..."),
    bullet("Ort und Land sinnvoll ergaenzt"),
    bullet("Verb wohnen korrekt konjugiert"),
    bullet("Kommuniziert verstaendlich"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Wohnort nennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Karte von D/A/CH mit Staedten: Berlin, Hamburg, Muenchen, Wien, Zuerich]"),
    empty(),
    p("Finde die Staedte auf der Karte. In welchem Land liegt die Stadt?"),
    empty(),
    p("Berlin liegt in __________________________."),
    p("Hamburg liegt in __________________________."),
    p("Muenchen liegt in __________________________."),
    p("Wien liegt in __________________________."),
    p("Zuerich liegt in __________________________."),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Links ein Stadtbild (Hochhaeuser, Strassen), rechts ein Dorf (Natur, wenige Haeuser)]"),
    empty(),
    p("Schreibe unter jedes Bild: Das ist eine Stadt. oder Das ist ein Dorf."),
    empty(),
    p("Bild links:  ___________________________________________________"),
    p("Bild rechts: ___________________________________________________"),
    empty(),
    p("Welches gefaellt dir besser? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Vier Kinder mit Schildern: Tom - Dresden, Yuki - Wien, Carlos - Zuerich, Emma - Koeln]"),
    empty(),
    p("Schreibe: Wo wohnt jedes Kind?"),
    empty(),
    p("Tom wohnt in __________________________."),
    p("Yuki wohnt in __________________________."),
    p("Carlos wohnt in __________________________."),
    p("Emma wohnt in __________________________."),
    empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Ein Kind zeigt auf eine Weltkarte. Neben dem Kind ist eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind? Schreibe in die Sprechblase."),
    p("Sprechblase: ___________________________________________________"),
    writeLine(), empty(),
    h2("Aufgabe 5: Zeichne deinen Wohnort."),
    p("Zeichne ein Bild. Schreibe darunter 2 Saetze."),
    ...writeLines(5), empty(),
    p("Ich wohne in __________. Es ist eine __________________________."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Wohnort nennen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Berlin liegt in Deutschland."),
    p("Hamburg liegt in Deutschland."),
    p("Muenchen liegt in Deutschland."),
    p("Wien liegt in Oesterreich."),
    p("Zuerich liegt in der Schweiz."),
    empty(),
    p("Hinweis: in der Schweiz mit Artikel - Ausnahme!"),
    empty(),
    h2("Aufgabe 2"),
    p("Antwort abhaengig von den Bildern."),
    p("Erwartet: Das ist eine Stadt. / Das ist ein Dorf."),
    empty(),
    h2("Aufgabe 3"),
    p("Tom wohnt in Dresden."),
    p("Yuki wohnt in Wien."),
    p("Carlos wohnt in Zuerich."),
    p("Emma wohnt in Koeln."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Ich wohne in [Stadt]! Das ist in [Land]."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Antwort akzeptieren."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Ausnahmen beim Artikel: die Schweiz, die Tuerkei, die USA."),
    bullet("Standardfall: kein Artikel vor Staedten und Laendern."),
    bullet("D/A/CH-Karte empfehlenswert im Unterricht."),
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
