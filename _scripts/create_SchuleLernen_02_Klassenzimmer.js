"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "02_Klassenzimmer");
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
        text: "A1 Kinder -- Schule & Lernen -- Klassenzimmer",
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

const TOPIC = "A1_Kinder_SchuleLernen_02_Klassenzimmer";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Das Klassenzimmer"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Was siehst du im Klassenzimmer?"),
    p("Schreibe 5 Dinge auf, die du in deinem Klassenzimmer siehst."),
    empty(),
    p("1.  _________________________"),
    p("2.  _________________________"),
    p("3.  _________________________"),
    p("4.  _________________________"),
    p("5.  _________________________"),
    empty(),
    h2("Aufgabe 2: Wo ist was? Schreibe Saetze."),
    p("Schau auf das Beispiel. Schreibe Saetze nach dem Muster."),
    empty(),
    pBold("Beispiel:  Tafel -- vorne"),
    p("Die Tafel ist vorne."),
    empty(),
    pBold("a)  Tuer -- hinten"),
    writeLine(),
    empty(),
    pBold("b)  Fenster -- links"),
    writeLine(),
    empty(),
    pBold("c)  Regal -- rechts"),
    writeLine(),
    empty(),
    pBold("d)  Uhr -- an der Wand"),
    writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Der __________________ sitzt am Tisch."),
    p("b)  Die __________________ schreibt an die Tafel."),
    p("c)  Die Buecher stehen im __________________."),
    p("d)  Das __________________ ist offen. Es ist warm heute."),
    p("e)  Die Uhr haengt an der __________________."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe dein Klassenzimmer. Schreibe 3-5 Saetze."),
    p("Wo ist die Tafel? Wie viele Tische gibt es? Was gefaellt dir?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Das Klassenzimmer"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("Moegliche Antworten: die Tafel, der Tisch, der Stuhl, das Fenster, die Tuere,"),
    p("die Wand, das Regal, die Uhr, der Lehrer/die Lehrerin, der Papierkorb"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Die Tuere ist hinten."),
    p("b) Das Fenster ist links."),
    p("c) Das Regal ist rechts."),
    p("d) Die Uhr ist an der Wand."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Der [Schueler / Lehrer] sitzt am Tisch."),
    p("b) Die [Lehrerin] schreibt an die Tafel."),
    p("c) Die Buecher stehen im [Regal]."),
    p("d) Das [Fenster] ist offen."),
    p("e) Die Uhr haengt an der [Wand]."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Mindestens 3 Gegenstaende korrekt benannt"),
    bullet("Positionen vorne/hinten/links/rechts oder an der Wand verwendet"),
    bullet("Verb sein oder haengen/stehen/liegen angemessen eingesetzt"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Das Klassenzimmer"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Annas Klassenzimmer"),
    p("Ich heisse Anna. Ich bin 9 Jahre alt. Ich gehe in die dritte Klasse.", { size: 26 }),
    p("Unser Klassenzimmer ist gross und hell. Vorne haengt eine grosse Tafel. Unsere Lehrerin heisst Frau Braun. Sie schreibt oft an die Tafel.", { size: 26 }),
    p("Links sind drei grosse Fenster. Rechts steht ein grosses Regal. Darin sind viele Buecher. An der Wand haengt eine Uhr. Es ist immer 8 Uhr, wenn der Unterricht beginnt.", { size: 26 }),
    p("Wir haben 20 Tische und 20 Stuehle. Ich sitze vorne links. Mein Freund Ben sitzt hinten rechts. Er findet das Klassenzimmer zu kalt.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Anna ist 9 Jahre alt.                                 R  /  F"),
    p("b)  Das Klassenzimmer ist klein und dunkel.               R  /  F"),
    p("c)  Die Tafel haengt vorne.                               R  /  F"),
    p("d)  Das Regal steht links.                                R  /  F"),
    p("e)  Anna sitzt vorne links.                               R  /  F"),
    p("f)  Ben findet das Klassenzimmer zu kalt.                 R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Wie heisst die Lehrerin?"),
    writeLine(), empty(),
    p("b)  Was ist im Regal?"),
    writeLine(), empty(),
    p("c)  Wann beginnt der Unterricht?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Wo ist was? Finde die Antworten im Text."),
    empty(),
    p("Die Tafel ist __________________________."),
    p("Die Fenster sind __________________________."),
    p("Das Regal steht __________________________."),
    p("Die Uhr haengt __________________________."),
    p("Anna sitzt __________________________."),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Beschreibe dein Klassenzimmer in 1-2 Saetzen."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Das Klassenzimmer"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Das Klassenzimmer ist gross und hell."),
    p("c) R"),
    p("d) F  Das Regal steht rechts."),
    p("e) R"),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Die Lehrerin heisst Frau Braun."),
    p("b) Im Regal sind viele Buecher."),
    p("c) Der Unterricht beginnt um 8 Uhr."),
    empty(),
    h2("Aufgabe 3"),
    p("Die Tafel ist vorne."),
    p("Die Fenster sind links."),
    p("Das Regal steht rechts."),
    p("Die Uhr haengt an der Wand."),
    p("Anna sitzt vorne links."),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Tafel", "Tisch", "Stuhl", "Fenster", "Tuere", "Wand",
                   "Regal", "Uhr", "vorne", "hinten", "Lehrerin", "Papierkorb"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Das Klassenzimmer"),
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
    p("1.  Die ______________ schreibt ein Wort an die Tafel."),
    p("2.  Ich sitze auf einem ______________."),
    p("3.  Die ______________ haengt an der Wand. Es ist 9 Uhr."),
    p("4.  Das ______________ ist offen. Frische Luft kommt herein."),
    p("5.  Ich sitze ______________. Ich sehe die Tafel gut."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Wo sitzt du?"),
    p("B:  Ich sitze ______________. Und du?"),
    p("A:  Ich sitze ______________, neben dem Fenster."),
    p("B:  Ist die ______________ vorne oder hinten?"),
    p("A:  Sie ist ______________, natuerlich! Siehst du sie gut?"),
    p("B:  Ja! Aber der ______________ neben mir ist kaputt."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("In meinem Klassenzimmer gibt es eine __________________ und viele __________________. "),
    p("Ich sitze __________________."),
    p("An der __________________ haengt eine Uhr."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Das Klassenzimmer"),
    empty(),
    h2("Teil 1"),
    p("1.  Die [Lehrerin] schreibt ein Wort an die Tafel."),
    p("2.  Ich sitze auf einem [Stuhl]."),
    p("3.  Die [Uhr] haengt an der Wand."),
    p("4.  Das [Fenster] ist offen."),
    p("5.  Ich sitze [vorne]."),
    empty(),
    p("(Ablenkwoerter: Tisch, Tuere, Regal, Papierkorb nicht benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("B:  Ich sitze [vorne / hinten]."),
    p("A:  Ich sitze [hinten / vorne / links / rechts], neben dem Fenster."),
    p("B:  Ist die [Tafel] vorne oder hinten?"),
    p("A:  Sie ist [vorne], natuerlich!"),
    p("B:  Aber der [Tisch / Stuhl] neben mir ist kaputt."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "die Tafel / die Tafeln",           wortart: "Nomen (f)", beispiel: "Die Tafel ist vorne." },
  { wort: "der Tisch / die Tische",           wortart: "Nomen (m)", beispiel: "Ich sitze an meinem Tisch." },
  { wort: "der Stuhl / die Stuehle",          wortart: "Nomen (m)", beispiel: "Der Stuhl ist bequem." },
  { wort: "das Fenster / die Fenster",        wortart: "Nomen (n)", beispiel: "Das Fenster ist offen." },
  { wort: "die Tuere / die Tueren",           wortart: "Nomen (f)", beispiel: "Die Tuere ist geschlossen." },
  { wort: "die Wand / die Waende",            wortart: "Nomen (f)", beispiel: "Das Bild haengt an der Wand." },
  { wort: "das Regal / die Regale",           wortart: "Nomen (n)", beispiel: "Die Buecher stehen im Regal." },
  { wort: "die Uhr / die Uhren",              wortart: "Nomen (f)", beispiel: "Die Uhr zeigt 8 Uhr." },
  { wort: "der Lehrer / die Lehrerin",        wortart: "Nomen (m/f)", beispiel: "Der Lehrer schreibt an die Tafel." },
  { wort: "der Schueler / die Schuelerin",    wortart: "Nomen (m/f)", beispiel: "Die Schuelerin sitzt am Tisch." },
  { wort: "vorne / hinten / links / rechts",  wortart: "Adverb",    beispiel: "Ich sitze vorne links." },
  { wort: "der Papierkorb",                   wortart: "Nomen (m)", beispiel: "Der Papierkorb steht neben dem Tisch." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Das Klassenzimmer"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Das Klassenzimmer"),
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
    bullet("haengen / stehen / liegen: Verben der Position auf A1 passiv einfuehren."),
    bullet("die Tafel: kann Schwarz- oder Whiteboard sein -- je nach Schule."),
    bullet("vorne/hinten/links/rechts: gut mit Koerperbewegung einueben."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Das Klassenzimmer"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Wo ist ...?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Wo ist die Tafel?"),
    p("B:  Die Tafel ist __________."),
    p("A:  Und wo ist das Regal?"),
    p("B:  Das Regal ist __________. Es hat viele __________."),
    p("A:  Wo sitzt du?"),
    p("B:  Ich sitze __________. Und du?"),
    p("A:  Ich sitze __________."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Was ist das?"),
    p("Partner A zeigt auf etwas im Klassenzimmer. Partner B nennt den Namen."),
    empty(),
    p("A:  Was ist das? (zeigt auf etwas)"),
    p("B:  Das ist __________ / Das sind __________."),
    p("A:  Welche Farbe hat es?"),
    p("B:  Es ist __________."),
    p("A:  Wie viele __________ gibt es im Klassenzimmer?"),
    p("B:  Es gibt __________ __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wo sitzt du im Klassenzimmer?"),
    writeLine(), empty(),
    p("2.  Was haengt an der Wand in eurem Klassenzimmer?"),
    writeLine(), empty(),
    p("3.  Wie viele Fenster hat euer Klassenzimmer?"),
    writeLine(), empty(),
    p("4.  Wo ist das Regal?"),
    writeLine(), empty(),
    p("5.  Was gefaellt dir an deinem Klassenzimmer?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Klassenzimmer-Detektiv"),
    p("Schreibe 3 Saetze ueber das Klassenzimmer. Lies sie vor. Die Klasse sagt: Richtig! oder Falsch!"),
    empty(),
    p("Satz 1:"), writeLine(),
    p("Satz 2:"), writeLine(),
    p("Satz 3:"), writeLine(),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Das Klassenzimmer"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("B:  Die Tafel ist [vorne]."),
    p("B:  Das Regal ist [rechts]. Es hat viele [Buecher]."),
    p("B:  Ich sitze [hinten rechts]. Und du?"),
    p("A:  Ich sitze [vorne links]."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("B:  Das ist [die Tafel / ein Tisch / ein Stuhl]."),
    p("B:  Es ist [schwarz / braun / grau]."),
    p("B:  Es gibt [20] [Tische / Stuehle] im Klassenzimmer."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Klassenzimmer-Woerter korrekt mit Artikel verwendet"),
    bullet("Positionsadverbien vorne/hinten/links/rechts sinnvoll eingesetzt"),
    bullet("Verb sein korrekt konjugiert"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Das Klassenzimmer"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("[BILD 1: Ein einfaches Klassenzimmer mit beschrifteten Pfeilen auf: Tafel, Tisch, Stuhl, Fenster, Regal, Uhr -- Pfeile zeigen auf die Objekte, aber ohne Beschriftung]"),
    empty(),
    p("Schreibe den richtigen Namen neben jeden Pfeil."),
    empty(),
    p("1. _________________________   2. _________________________"),
    p("3. _________________________   4. _________________________"),
    p("5. _________________________   6. _________________________"),
    empty(),
    h2("Aufgabe 2: Wo ist was? Schau auf das Bild."),
    p("[BILD 2: Grundriss eines Klassenzimmers von oben: Tafel vorne, Fenster links, Tuere hinten, Regal rechts, Tische in der Mitte]"),
    empty(),
    p("Beantworte die Fragen zum Bild."),
    empty(),
    p("Wo ist die Tafel?     Die Tafel ist __________________________."),
    p("Wo sind die Fenster?  Die Fenster sind __________________________."),
    p("Wo ist die Tuere?     Die Tuere ist __________________________."),
    p("Wo ist das Regal?     Das Regal ist __________________________."),
    empty(),
    br(),
    h2("Aufgabe 3: Richtig oder falsch? Schau auf Bild 2."),
    p("[BILD 2 erneut verwenden oder darauf verweisen]"),
    empty(),
    p("a)  Die Tafel ist hinten.                                 R  /  F"),
    p("b)  Die Fenster sind links.                               R  /  F"),
    p("c)  Das Regal ist rechts.                                 R  /  F"),
    p("d)  Die Tuere ist vorne.                                  R  /  F"),
    empty(),
    h2("Aufgabe 4: Was sagt der Lehrer?"),
    p("[BILD 3: Ein Lehrer zeigt auf die Tafel und hat eine leere Sprechblase.]"),
    empty(),
    p("Was sagt der Lehrer? Schreibe 1-2 Saetze in die Sprechblase."),
    p("Sprechblase:"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne dein Klassenzimmer."),
    p("Zeichne deinen Klassenraum. Beschrifte mindestens 5 Dinge auf Deutsch."),
    empty(),
    ...writeLines(7), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Das Klassenzimmer"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Erwartet: korrekte Zuordnung der 6 Gegenstaende."),
    p("Beispiel: 1. die Tafel  2. der Tisch  3. der Stuhl  4. das Fenster  5. das Regal  6. die Uhr"),
    empty(),
    h2("Aufgabe 2"),
    p("Die Tafel ist vorne."),
    p("Die Fenster sind links."),
    p("Die Tuere ist hinten."),
    p("Das Regal ist rechts."),
    empty(),
    h2("Aufgabe 3"),
    p("a) F  Die Tafel ist vorne."),
    p("b) R"),
    p("c) R"),
    p("d) F  Die Tuere ist hinten."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Schreibt das Wort auf! / Lest Seite 5!"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung akzeptieren."),
    p("Mindestens 5 Beschriftungen auf Deutsch pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Positionswoerter vorne/hinten/links/rechts mit Koerperbewegung festigen."),
    bullet("Klassenzimmer-Gegenstaende koennen mit Post-Its beschriftet werden."),
    bullet("haengen vs. stehen vs. liegen: auf A1 noch nicht aktiv einfordern."),
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
