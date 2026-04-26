"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "04_Wochentage");
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
        text: "A1 Kinder -- Schule & Lernen -- Wochentage",
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

const TOPIC = "A1_Kinder_SchuleLernen_04_Wochentage";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Wochentage"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Schreibe die Wochentage in der richtigen Reihenfolge."),
    p("Dienstag -- Freitag -- Montag -- Donnerstag -- Mittwoch -- Samstag -- Sonntag"),
    empty(),
    p("1.  _________________________"),
    p("2.  _________________________"),
    p("3.  _________________________"),
    p("4.  _________________________"),
    p("5.  _________________________"),
    p("6.  _________________________"),
    p("7.  _________________________"),
    empty(),
    h2("Aufgabe 2: Was machst du an diesen Tagen?"),
    p("Schreibe je einen Satz. Benutze: Am __________ ..."),
    empty(),
    pBold("Beispiel:  Montag"),
    p("Am Montag gehe ich in die Schule."),
    empty(),
    pBold("a)  Mittwoch"),
    writeLine(),
    empty(),
    pBold("b)  Freitag"),
    writeLine(),
    empty(),
    pBold("c)  Samstag"),
    writeLine(),
    empty(),
    pBold("d)  Sonntag"),
    writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Nach dem Sonntag kommt der __________________."),
    p("b)  Samstag und Sonntag sind das __________________."),
    p("c)  __________________ ist Montag. Morgen ist Dienstag."),
    p("d)  Die Woche hat __________________ Tage."),
    p("e)  Montag bis Freitag sind __________________. Wir gehen in die Schule."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Was ist dein Lieblingstag? Warum? Schreibe 3-5 Saetze."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Wochentage"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("1. Montag  2. Dienstag  3. Mittwoch  4. Donnerstag"),
    p("5. Freitag  6. Samstag  7. Sonntag"),
    empty(),
    h2("Aufgabe 2"),
    p("Individuelle Antworten akzeptieren."),
    p("Pruefen: Am + Wochentag korrekt verwendet (Grossschreibung des Tages)."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Nach dem Sonntag kommt der [Montag]."),
    p("b) Samstag und Sonntag sind das [Wochenende]."),
    p("c) [Heute] ist Montag."),
    p("d) Die Woche hat [sieben / 7] Tage."),
    p("e) Montag bis Freitag sind [Werktage / Schultage]."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Lieblingstag korrekt genannt und begruendet"),
    bullet("Am + Wochentag korrekt verwendet"),
    bullet("Aktivitaeten am jeweiligen Tag beschrieben"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Wochentage"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Jonas und seine Woche"),
    p("Hallo! Ich heisse Jonas. Ich bin 10 Jahre alt.", { size: 26 }),
    p("Am Montag und Dienstag gehe ich in die Schule. Ich habe viele Faecher. Am Mittwoch habe ich Musikstunde nach der Schule. Ich spiele Gitarre.", { size: 26 }),
    p("Am Donnerstag trainiere ich Fussball. Das macht mir viel Spass! Am Freitag ist mein letzter Schultag. Nach der Schule spiele ich mit meinen Freunden.", { size: 26 }),
    p("Am Samstag schlafe ich lange. Dann helfe ich meiner Mutter beim Einkaufen. Am Sonntag ist mein Lieblingstag. Die ganze Familie ist zusammen. Wir essen gut und machen Ausfluege.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Jonas ist 10 Jahre alt.                              R  /  F"),
    p("b)  Am Mittwoch hat Jonas Sportunterricht.               R  /  F"),
    p("c)  Jonas spielt Gitarre.                                R  /  F"),
    p("d)  Am Donnerstag spielt Jonas Fussball.                 R  /  F"),
    p("e)  Der Samstag ist Jonas Lieblingstag.                  R  /  F"),
    p("f)  Am Sonntag ist die Familie zusammen.                 R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Was macht Jonas am Mittwoch?"),
    writeLine(), empty(),
    p("b)  Was macht Jonas am Freitag nach der Schule?"),
    writeLine(), empty(),
    p("c)  Warum ist Sonntag Jonas Lieblingstag?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Was macht Jonas an welchem Tag?"),
    p("Ordne zu. Schreibe den Wochentag neben die Aktivitaet."),
    empty(),
    p("Musikstunde:           ______________________"),
    p("Fussball trainieren:   ______________________"),
    p("Einkaufen helfen:      ______________________"),
    p("Mit Freunden spielen:  ______________________"),
    p("Familie + Ausflug:     ______________________"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Was machst du am Wochenende? Schreibe 2 Saetze."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Wochentage"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Am Mittwoch hat Jonas Musikstunde."),
    p("c) R"),
    p("d) R"),
    p("e) F  Der Sonntag ist Jonas Lieblingstag."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Am Mittwoch hat Jonas Musikstunde. Er spielt Gitarre."),
    p("b) Am Freitag spielt Jonas mit seinen Freunden."),
    p("c) Am Sonntag ist die ganze Familie zusammen. Sie essen gut und machen Ausfluege."),
    empty(),
    h2("Aufgabe 3"),
    p("Musikstunde:           Mittwoch"),
    p("Fussball trainieren:   Donnerstag"),
    p("Einkaufen helfen:      Samstag"),
    p("Mit Freunden spielen:  Freitag"),
    p("Familie + Ausflug:     Sonntag"),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                   "Sonntag", "Woche", "Wochenende", "heute", "morgen", "gestern"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Wochentage"),
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
    p("1.  Am ______________ beginnt die Schulwoche."),
    p("2.  ______________ ist Dienstag. Gestern war Montag."),
    p("3.  Samstag und Sonntag -- das ist das ______________."),
    p("4.  Am ______________ ist die Woche halb vorbei."),
    p("5.  ______________ war Freitag. Heute ist Samstag."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Welcher Tag ist ______________?"),
    p("B:  ______________ ist Donnerstag."),
    p("A:  Und was kommt nach dem Donnerstag?"),
    p("B:  Nach dem Donnerstag kommt der ______________."),
    p("A:  Super! Dann beginnt bald das ______________!"),
    p("B:  Ja! Am ______________ schlafe ich lange."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Mein Lieblingstag ist __________________."),
    p("Am __________________ __________________________________."),
    empty(),
    p("__________________ war __________________. Heute ist __________________."),
    p("Morgen ist __________________. Ich freue mich, weil __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Wochentage"),
    empty(),
    h2("Teil 1"),
    p("1.  Am [Montag] beginnt die Schulwoche."),
    p("2.  [Heute] ist Dienstag."),
    p("3.  Samstag und Sonntag -- das ist das [Wochenende]."),
    p("4.  Am [Mittwoch] ist die Woche halb vorbei."),
    p("5.  [Gestern] war Freitag."),
    empty(),
    p("(Ablenkwoerter: Dienstag, Donnerstag, Freitag, Sonntag, Woche, morgen nicht benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("A:  Welcher Tag ist [heute]?"),
    p("B:  [Heute] ist Donnerstag."),
    p("B:  Nach dem Donnerstag kommt der [Freitag]."),
    p("A:  Dann beginnt bald das [Wochenende]!"),
    p("B:  Am [Samstag / Sonntag] schlafe ich lange."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "Montag",                  wortart: "(kein Artikel)", beispiel: "Am Montag beginnt die Schulwoche." },
  { wort: "Dienstag",                wortart: "(kein Artikel)", beispiel: "Am Dienstag habe ich Mathe." },
  { wort: "Mittwoch",                wortart: "(kein Artikel)", beispiel: "Am Mittwoch ist die Woche halb vorbei." },
  { wort: "Donnerstag",              wortart: "(kein Artikel)", beispiel: "Am Donnerstag trainiere ich Sport." },
  { wort: "Freitag",                 wortart: "(kein Artikel)", beispiel: "Am Freitag beginnt das Wochenende." },
  { wort: "Samstag",                 wortart: "(kein Artikel)", beispiel: "Am Samstag schlafe ich lange." },
  { wort: "Sonntag",                 wortart: "(kein Artikel)", beispiel: "Am Sonntag ist die Familie zusammen." },
  { wort: "die Woche / die Wochen",  wortart: "Nomen (f)",      beispiel: "Die Woche hat sieben Tage." },
  { wort: "das Wochenende",          wortart: "Nomen (n)",      beispiel: "Das Wochenende macht Spass!" },
  { wort: "heute / morgen / gestern",wortart: "Adverb",         beispiel: "Heute ist Montag. Morgen ist Dienstag." },
  { wort: "am + Wochentag",          wortart: "Praeposition",   beispiel: "Am Freitag gehe ich schwimmen." },
  { wort: "der Werktag",             wortart: "Nomen (m)",      beispiel: "Montag bis Freitag sind Werktage." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Wochentage"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Wochentage"),
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
    bullet("Wochentage ohne Artikel, aber mit am + Dativ: am Montag (nicht am Montagen)."),
    bullet("Grossschreibung: Montag, Dienstag usw. -- immer gross im Deutschen."),
    bullet("Samstag: regional auch Sonnabend (vor allem in Norddeutschland)."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Wochentage"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Welcher Tag ist heute?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Welcher Tag ist heute?"),
    p("B:  Heute ist __________."),
    p("A:  Was machst du am __________?"),
    p("B:  Am __________ __________ ich __________. Und du?"),
    p("A:  Ich __________ am __________ immer __________."),
    p("B:  Was ist dein Lieblingstag?"),
    p("A:  Mein Lieblingstag ist __________. Da __________."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Das Wochenende"),
    p("Was machst du am Wochenende? Plane mit deinem Partner."),
    empty(),
    p("A:  Was machst du am Samstag?"),
    p("B:  Am Samstag __________ ich. Und du?"),
    p("A:  Ich __________ am Samstag."),
    p("B:  Und am Sonntag?"),
    p("A:  Am Sonntag __________ ich mit meiner Familie."),
    p("B:  Das klingt toll! Mein Lieblingstag ist der Sonntag, weil __________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Welcher Tag ist heute?"),
    writeLine(), empty(),
    p("2.  Was machst du am Freitagnachmittag?"),
    writeLine(), empty(),
    p("3.  Was ist dein Lieblingstag? Warum?"),
    writeLine(), empty(),
    p("4.  Was machst du am Wochenende?"),
    writeLine(), empty(),
    p("5.  Welcher Tag der Woche magst du nicht? Warum?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Wochentage-Kette"),
    p("Jeder nennt einen Wochentag und eine Aktivitaet. Die Kette geht weiter."),
    p("Beispiel: Am Montag gehe ich in die Schule. Am Dienstag spiele ich Fussball. ..."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Wochentag"), hCell("Aktivitaet")] }),
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
    h1("LOESUNG: Konversation Wochentage"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("B:  Heute ist [Dienstag]."),
    p("B:  Am [Dienstag] [gehe] ich [in die Schule]."),
    p("A:  Ich [spiele] am [Mittwoch] immer [Fussball]."),
    p("A:  Mein Lieblingstag ist [Samstag]. Da [schlafe ich lange]."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("B:  Am Samstag [schlafe ich lange / helfe ich meiner Mutter]."),
    p("A:  Ich [gehe einkaufen] am Samstag."),
    p("A:  Am Sonntag [esse ich] ich mit meiner Familie."),
    p("B:  Mein Lieblingstag ist der Sonntag, weil [die Familie zusammen ist]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Wochentage korrekt verwendet und grossgeschrieben"),
    bullet("Am + Wochentag korrekt formuliert"),
    bullet("Aktivitaeten am jeweiligen Tag sinnvoll beschrieben"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Wochentage"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Welcher Tag ist das?"),
    p("[BILD 1: 7 Kalenderfelder nebeneinander, jedes mit einer kleinen Zeichnung: Schultasche (Mo), Mathebuch (Di), Gitarre (Mi), Fussball (Do), Sonne/Freude (Fr), Familie am Tisch (Sa), Ausflug/Natur (So). Die Tages-Namen sind leer.]"),
    empty(),
    p("Schreibe den richtigen Wochentag unter jedes Bild."),
    empty(),
    p("1. __________  2. __________  3. __________  4. __________"),
    p("5. __________  6. __________  7. __________"),
    empty(),
    h2("Aufgabe 2: Was macht das Kind?"),
    p("[BILD 2: 4 Bilder von einem Kind bei verschiedenen Aktivitaeten an verschiedenen Tagen: Kind liest (Mittwoch), Kind spielt Fussball (Donnerstag), Kind hilft beim Kochen (Samstag), Kind schlaeft (Sonntag)]"),
    empty(),
    p("Schreibe zu jedem Bild: Am __________ __________ das Kind."),
    empty(),
    p("Bild 1:  Am __________________ __________________ das Kind."),
    p("Bild 2:  Am __________________ __________________ das Kind."),
    p("Bild 3:  Am __________________ __________________ das Kind."),
    p("Bild 4:  Am __________________ __________________ das Kind."),
    empty(),
    br(),
    h2("Aufgabe 3: Mein Wochenplan"),
    p("[BILD 3: Eine leere Wochentabelle: Spalten = Mo bis So, Zeile = Aktivitaet]"),
    empty(),
    p("Schreibe deine Aktivitaeten in den Wochenplan."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [1286, 1286, 1286, 1286, 1286, 1286, 1285],
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mo", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Di", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mi", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Do", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fr", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Sa", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1285, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "So", bold: true, size: 22, font: "Arial" })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1286, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
          new TableCell({ width: { size: 1285, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [empty(), empty()] }),
        ]}),
      ]
    }),
    empty(),
    h2("Aufgabe 4: Was sagt das Kind?"),
    p("[BILD 4: Ein Kind schaut auf einen Kalender und hat eine leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind ueber seinen Lieblingstag? Schreibe 1-2 Saetze."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Wochentage"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("1. Montag  2. Dienstag  3. Mittwoch  4. Donnerstag"),
    p("5. Freitag  6. Samstag  7. Sonntag"),
    p("(Reihenfolge abhaengig vom Bild -- pruefen, ob Tage korrekt zugeordnet)"),
    empty(),
    h2("Aufgabe 2"),
    p("Bild 1:  Am Mittwoch liest das Kind."),
    p("Bild 2:  Am Donnerstag spielt das Kind Fussball."),
    p("Bild 3:  Am Samstag hilft das Kind beim Kochen."),
    p("Bild 4:  Am Sonntag schlaeft das Kind."),
    p("(Antworten abhaengig von den eingefuegten Bildern)"),
    empty(),
    h2("Aufgabe 3"),
    p("Individuelle Antworten akzeptieren. Wochentage korrekt pruefen."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Mein Lieblingstag ist Samstag! Ich schlafe lange und spiele."),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Wochentage immer grossschreiben: Montag, Dienstag usw."),
    bullet("am + Wochentag: Am Montag (nicht: An Montag / In Montag)."),
    bullet("Aufgabe 3 (Wochenplan) kann als Gespraechsgrundlage fuer Partnerarbeit genutzt werden."),
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
