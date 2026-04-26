"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "03_Schulfaecher");
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
        text: "A1 Kinder -- Schule & Lernen -- Schulfaecher",
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

const TOPIC = "A1_Kinder_SchuleLernen_03_Schulfaecher";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Schulfaecher"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Welche Faecher kennst du?"),
    p("Schreibe 5 Schulfaecher auf."),
    empty(),
    p("1.  _________________________"),
    p("2.  _________________________"),
    p("3.  _________________________"),
    p("4.  _________________________"),
    p("5.  _________________________"),
    empty(),
    h2("Aufgabe 2: Was machst du in dem Fach?"),
    p("Verbinde das Fach mit der Aktivitaet. Schreibe dann einen Satz."),
    empty(),
    pBold("Beispiel:  Sport -- laufen und springen"),
    p("In Sport laufe und springe ich."),
    empty(),
    pBold("a)  Musik -- singen und spielen"),
    writeLine(),
    empty(),
    pBold("b)  Kunst -- zeichnen und malen"),
    writeLine(),
    empty(),
    pBold("c)  Deutsch -- lesen und schreiben"),
    writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Mein __________________ ist Sport. Ich liebe Sport!"),
    p("b)  __________________ ist schwer. Ich rechne nicht gern."),
    p("c)  In __________________ lernen wir Woerter auf Englisch."),
    p("d)  Das Fach ist interessant. Wir lesen viele Buecher. Das ist __________________."),
    p("e)  Ich mag __________________ nicht. Es ist langweilig fuer mich."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Was ist dein Lieblingsfach? Warum? Schreibe 3-5 Saetze."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Schulfaecher"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("Moegliche Antworten: Deutsch, Mathematik, Englisch, Sport, Kunst, Musik,"),
    p("Sachkunde, Geschichte, Biologie, Erdkunde"),
    empty(),
    h2("Aufgabe 2"),
    p("a) In Musik singe und spiele ich."),
    p("b) In Kunst zeichne und male ich."),
    p("c) In Deutsch lese und schreibe ich."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Mein [Lieblingsfach] ist Sport."),
    p("b) [Mathematik / Mathe] ist schwer."),
    p("c) In [Englisch] lernen wir Woerter auf Englisch."),
    p("d) Das Fach ist interessant. Das ist [Deutsch]."),
    p("e) Ich mag [Geschichte / Sachkunde / ...] nicht. (individuelle Antwort)"),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Lieblingsfach korrekt genannt"),
    bullet("Begruendung mit weil oder wegen versucht (auf A1 auch einfache Begruendung akzeptieren)"),
    bullet("Adjektive interessant / toll / schwer / leicht sinnvoll verwendet"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Schulfaecher"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Lenas Lieblingsfaecher"),
    p("Ich heisse Lena. Ich bin 10 Jahre alt. Ich gehe in die vierte Klasse.", { size: 26 }),
    p("Mein Lieblingsfach ist Sport. Wir laufen, springen und spielen Fussball. Sport macht mir viel Spass.", { size: 26 }),
    p("Ich mag auch Kunst. In Kunst zeichnen und malen wir. Mein Lehrer heisst Herr Fischer. Er ist sehr nett.", { size: 26 }),
    p("Mathematik finde ich schwer. Ich rechne nicht so gern. Aber Deutsch ist leicht fuer mich. Ich lese viele Buecher.", { size: 26 }),
    p("Englisch ist neu fuer mich. Wir lernen neue Woerter. Das ist interessant!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Lena ist 10 Jahre alt.                               R  /  F"),
    p("b)  Lenas Lieblingsfach ist Mathematik.                  R  /  F"),
    p("c)  In Sport spielen sie Fussball.                       R  /  F"),
    p("d)  Herr Fischer ist der Sportlehrer.                    R  /  F"),
    p("e)  Mathematik ist leicht fuer Lena.                     R  /  F"),
    p("f)  Lena findet Englisch interessant.                    R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Was macht Lena in Sport?"),
    writeLine(), empty(),
    p("b)  Wie findet Lena Mathematik?"),
    writeLine(), empty(),
    p("c)  Was macht Lena in Deutsch?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Wie findet Lena die Faecher?"),
    p("Schreibe das richtige Adjektiv neben das Fach: toll / schwer / leicht / interessant / neu"),
    empty(),
    p("Sport:       __________________________"),
    p("Kunst:       __________________________"),
    p("Mathematik:  __________________________"),
    p("Deutsch:     __________________________"),
    p("Englisch:    __________________________"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Was ist dein Lieblingsfach? Wie findest du Mathematik?"),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Schulfaecher"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Lenas Lieblingsfach ist Sport."),
    p("c) R"),
    p("d) F  Herr Fischer ist der Kunstlehrer."),
    p("e) F  Mathematik ist schwer fuer Lena."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) In Sport laufen, springen und spielen sie Fussball."),
    p("b) Lena findet Mathematik schwer."),
    p("c) In Deutsch liest Lena viele Buecher."),
    empty(),
    h2("Aufgabe 3"),
    p("Sport:       toll / Spass"),
    p("Kunst:       (nett -- individuelle Interpretation akzeptieren)"),
    p("Mathematik:  schwer"),
    p("Deutsch:     leicht"),
    p("Englisch:    interessant / neu"),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Deutsch", "Mathe", "Englisch", "Sport", "Kunst", "Musik",
                   "Sachkunde", "Geschichte", "Lieblingsfach", "interessant", "schwer", "leicht"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Schulfaecher"),
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
    p("1.  Mein __________________ ist Musik. Ich singe gern."),
    p("2.  __________________ ist mein schwerstes Fach. Ich rechne nicht gern."),
    p("3.  In __________________ lesen und schreiben wir."),
    p("4.  In __________________ spielen wir oft Fussball."),
    p("5.  __________________ finde ich __________________. Wir lernen viele neue Woerter."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Was ist dein __________________?"),
    p("B:  Mein Lieblingsfach ist __________________. Ich male gern."),
    p("A:  Und was findest du __________________?"),
    p("B:  __________________ finde ich schwer. So viele Zahlen!"),
    p("A:  Ich auch! Aber __________________ ist leicht fuer mich."),
    p("B:  Ja, ich lese auch gern. Wir lesen tolle Geschichten."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Mein Lieblingsfach ist __________________."),
    p("Es ist __________________ fuer mich."),
    p("In diesem Fach __________________________________."),
    empty(),
    p("Das schwerste Fach fuer mich ist __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Schulfaecher"),
    empty(),
    h2("Teil 1"),
    p("1.  Mein [Lieblingsfach] ist Musik."),
    p("2.  [Mathe] ist mein schwerstes Fach."),
    p("3.  In [Deutsch] lesen und schreiben wir."),
    p("4.  In [Sport] spielen wir oft Fussball."),
    p("5.  [Englisch] finde ich [interessant]. (oder: leicht)"),
    empty(),
    p("(Ablenkwoerter: Sachkunde, Geschichte nicht benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("A:  Was ist dein [Lieblingsfach]?"),
    p("B:  Mein Lieblingsfach ist [Kunst]. Ich male gern."),
    p("A:  Und was findest du [schwer]?"),
    p("B:  [Mathe] finde ich schwer."),
    p("A:  Aber [Deutsch] ist leicht fuer mich."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "das Fach / die Faecher",       wortart: "Nomen (n)",  beispiel: "Welche Faecher hast du heute?" },
  { wort: "Deutsch",                       wortart: "(kein Artikel)", beispiel: "In Deutsch lesen wir viel." },
  { wort: "Mathematik (Mathe)",            wortart: "(kein Artikel)", beispiel: "Mathe ist mein schwerstes Fach." },
  { wort: "Englisch",                      wortart: "(kein Artikel)", beispiel: "Englisch finde ich interessant." },
  { wort: "Sport",                         wortart: "(kein Artikel)", beispiel: "In Sport spielen wir Fussball." },
  { wort: "Kunst",                         wortart: "(kein Artikel)", beispiel: "In Kunst zeichnen und malen wir." },
  { wort: "Musik",                         wortart: "(kein Artikel)", beispiel: "In Musik singen wir Lieder." },
  { wort: "Sachkunde",                     wortart: "(kein Artikel)", beispiel: "In Sachkunde lernen wir ueber die Natur." },
  { wort: "das Lieblingsfach",             wortart: "Nomen (n)",  beispiel: "Mein Lieblingsfach ist Sport." },
  { wort: "interessant / langweilig",      wortart: "Adjektiv",  beispiel: "Englisch ist interessant." },
  { wort: "schwer / leicht",               wortart: "Adjektiv",  beispiel: "Mathematik ist schwer fuer mich." },
  { wort: "Spass machen",                  wortart: "Verb-Phrase", beispiel: "Sport macht mir Spass." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Schulfaecher"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Schulfaecher"),
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
    bullet("Schulfaecher haben auf Deutsch keinen Artikel (kein der/die/das)."),
    bullet("Spass machen: Ich mag Deutsch. / Deutsch macht mir Spass. -- beide Formen einfuehren."),
    bullet("leicht / schwer vs. einfach / schwierig: beide Varianten sind korrekt."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Schulfaecher"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Was ist dein Lieblingsfach?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Was ist dein Lieblingsfach?"),
    p("B:  Mein Lieblingsfach ist __________. Und deins?"),
    p("A:  Ich mag __________ am liebsten."),
    p("B:  Was machst du in __________?"),
    p("A:  In __________ __________ wir. Das macht Spass!"),
    p("B:  Ich finde __________ schwer. Magst du es?"),
    p("A:  Ja, es ist interessant!  /  Nein, ich mag es nicht so."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Wann hast du welches Fach?"),
    p("Schau auf deinen eigenen Stundenplan und beantworte die Fragen."),
    empty(),
    p("A:  Welche Faecher hast du heute?"),
    p("B:  Heute habe ich __________, __________ und __________."),
    p("A:  Hast du Mathe heute?"),
    p("B:  Ja, um __________ Uhr.  /  Nein, heute nicht."),
    p("A:  Was ist dein schwerstes Fach?"),
    p("B:  __________ ist fuer mich am schwersten."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Was ist dein Lieblingsfach? Warum?"),
    writeLine(), empty(),
    p("2.  Welches Fach findest du schwer?"),
    writeLine(), empty(),
    p("3.  Was machst du in Kunstunterricht?"),
    writeLine(), empty(),
    p("4.  Wie viele Faecher hast du pro Woche?"),
    writeLine(), empty(),
    p("5.  Welches Fach moechtest du neu lernen?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Faecher-Umfrage"),
    p("Frage 3 Mitschueler: Was ist dein Lieblingsfach?"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Lieblingsfach"), hCell("Begruendung")] }),
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
    h1("LOESUNG: Konversation Schulfaecher"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("B:  Mein Lieblingsfach ist [Musik]. Und deins?"),
    p("A:  Ich mag [Sport] am liebsten."),
    p("B:  Was machst du in [Sport]?"),
    p("A:  In [Sport] [laufen und spielen] wir."),
    p("B:  Ich finde [Mathe] schwer."),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("B:  Heute habe ich [Deutsch], [Mathe] und [Sport]."),
    p("B:  [Mathe] ist fuer mich am schwersten."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Schulfaecher ohne Artikel korrekt verwendet"),
    bullet("Mein Lieblingsfach ist ... korrekt formuliert"),
    bullet("Adjektive schwer / leicht / interessant sinnvoll eingesetzt"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Schulfaecher"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Welches Fach ist das?"),
    p("[BILD 1: 6 Bilder -- je ein Symbol fuer ein Schulfach: Zahlensymbole (Mathe), Buchstaben/Text (Deutsch), Noten/Geige (Musik), Fussball/Sporthalle (Sport), Pinsel/Malpalette (Kunst), englische Fahne (Englisch)]"),
    empty(),
    p("Schreibe den Fach-Namen unter jedes Bild."),
    empty(),
    p("1. _________________________   2. _________________________"),
    p("3. _________________________   4. _________________________"),
    p("5. _________________________   6. _________________________"),
    empty(),
    h2("Aufgabe 2: Was macht das Kind?"),
    p("[BILD 2: 4 Bilder von Kindern bei verschiedenen Schulaktivitaeten: Kind rechnet an Tafel, Kind liest Buch, Kind singt, Kind malt]"),
    empty(),
    p("Schreibe zu jedem Bild: In __________ __________ das Kind."),
    empty(),
    p("Bild 1:  In __________________ __________________ das Kind."),
    p("Bild 2:  In __________________ __________________ das Kind."),
    p("Bild 3:  In __________________ __________________ das Kind."),
    p("Bild 4:  In __________________ __________________ das Kind."),
    empty(),
    br(),
    h2("Aufgabe 3: Wie findet das Kind das Fach?"),
    p("[BILD 3: Zwei Kinder mit Gedankenblasen: Kind A denkt an Mathe-Aufgaben mit traurigem Gesicht, Kind B denkt an Sport mit freudigem Gesicht]"),
    empty(),
    p("Was denkt Kind A? Was denkt Kind B? Schreibe je 1-2 Saetze."),
    empty(),
    p("Kind A:"), writeLine(), writeLine(),
    empty(),
    p("Kind B:"), writeLine(), writeLine(),
    empty(),
    h2("Aufgabe 4: Mein Stundenplan-Bild"),
    p("[BILD 4: Ein leerer Stundenplan mit 5 Spalten (Mo-Fr) und 5 Zeilen (Stunden 1-5). Daneben Bilder/Symbole der Faecher.]"),
    empty(),
    p("Schneide die Fach-Symbole aus und klebe sie in deinen Stundenplan."),
    p("Oder: Schreibe die Faecher direkt in den Plan."),
    empty(),
    h2("Aufgabe 5: Mein Lieblingsfach -- zeichne es!"),
    p("Zeichne ein Bild von deinem Lieblingsfach. Was machst du dort?"),
    p("Schreibe 2 Saetze dazu."),
    empty(),
    ...writeLines(6), empty(),
    p("Mein Lieblingsfach ist __________. In diesem Fach _________________________."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Schulfaecher"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Erwartet (je nach Bild): 1. Mathe  2. Deutsch  3. Musik  4. Sport  5. Kunst  6. Englisch"),
    p("Variationen akzeptieren, wenn sinnvoll."),
    empty(),
    h2("Aufgabe 2"),
    p("Bild 1:  In Mathe rechnet das Kind."),
    p("Bild 2:  In Deutsch liest das Kind."),
    p("Bild 3:  In Musik singt das Kind."),
    p("Bild 4:  In Kunst malt das Kind."),
    p("(Antworten abhaengig von den eingefuegten Bildern)"),
    empty(),
    h2("Aufgabe 3"),
    p("Kind A: Ich finde Mathe schwer. / Mathe macht mir keinen Spass."),
    p("Kind B: Ich liebe Sport! / Sport macht mir viel Spass."),
    p("Individuelle Formulierungen akzeptieren."),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antwort -- korrekte Faecher-Namen pruefen."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung und Saetze akzeptieren."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Schulfaecher ohne Artikel: kein der/die/das vor Mathe, Sport, Deutsch usw."),
    bullet("In + Dativ: In Sport, in Deutsch, in Musik -- passiv einfuehren."),
    bullet("Aufgabe 4 (Stundenplan) kann als Hausaufgabe oder Projekt gegeben werden."),
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
