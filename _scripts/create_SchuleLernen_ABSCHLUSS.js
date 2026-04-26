"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "ABSCHLUSS");
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
        text: "A1 Kinder -- Schule & Lernen -- Abschlussübung",
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

const TOPIC = "A1_Kinder_SchuleLernen";

async function abschluss() {
  const woerter = ["Rucksack", "Tafel", "Montag", "Pause", "Sport",
                   "Stunde", "vorne", "Maeppchen", "Wochenende", "Klasse"];
  const children = [
    studentHead(), empty(),
    h1("Abschlussübung: Schule & Lernen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Thema: Schule & Lernen komplett"),
    empty(),
    h2("Lesetext: Kims Schultag"),
    p("Hallo! Ich heisse Kim. Ich bin 10 Jahre alt und gehe in die vierte __________ in Koeln.", { size: 26 }),
    p("Jeden Morgen packe ich meinen __________. Ich nehme mein __________ mit Bleistiften und einem Radiergummi, zwei Hefte und mein Lineal.", { size: 26 }),
    p("Unser Klassenzimmer ist gross und hell. Die __________ ist __________. Links sind drei grosse Fenster. Rechts steht ein Regal mit Buechern.", { size: 26 }),
    p("Mein Lieblingsfach ist __________. Wir laufen und spielen. Mathe finde ich schwer, aber Deutsch mag ich.", { size: 26 }),
    p("Am __________ habe ich fuenf Stunden. Die erste __________ beginnt um 8 Uhr. Um 10 Uhr ist __________. Am Freitag beginnt das __________!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Fuell die Luecken im Lesetext aus."),
    p("Benutze den Woerterkasten:"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: Array(5).fill(1800),
      rows: [
        new TableRow({ children: woerter.slice(0, 5).map(function(w) {
          return new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
        new TableRow({ children: woerter.slice(5).map(function(w) {
          return new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
      ]
    }),
    empty(),
    h2("Aufgabe 2: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Kim ist 10 Jahre alt.                                R  /  F"),
    p("b)  Kim packt jeden Morgen seine Schultasche.            R  /  F"),
    p("c)  Die Tafel ist hinten im Klassenzimmer.               R  /  F"),
    p("d)  Kims Lieblingsfach ist Mathe.                        R  /  F"),
    p("e)  Die erste Stunde beginnt um 8 Uhr.                   R  /  F"),
    p("f)  Am Freitag beginnt das Wochenende.                   R  /  F"),
    empty(),
    h2("Aufgabe 3: Beantworte die Fragen."),
    empty(),
    p("a)  Was hat Kim im Maeppchen?"),
    writeLine(), empty(),
    p("b)  Wie ist das Klassenzimmer von Kim?"),
    writeLine(), empty(),
    p("c)  Welches Fach findet Kim schwer?"),
    writeLine(), empty(),
    p("d)  Wie viele Stunden hat Kim am Montag?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 4: Kims Schulprofil -- und dein Profil."),
    p("Lies den Text und ergaenze die Spalte fuer Kim. Ergaenze dann dein eigenes Profil."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell(""), hCell("Kim"), hCell("Ich")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Lieblings-Schulsache", { bold: true })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Lieblingsfach", { bold: true })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Schwertes Fach", { bold: true })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Unterricht beginnt um", { bold: true })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Lieblingstag", { bold: true })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
      ]
    }),
    empty(),
    br(),
    h2("Aufgabe 5: Schreibe ueber deine Schule."),
    p("Schreibe 6-8 Saetze. Erwaehne: Schulsachen, Klassenzimmer, Lieblingsfach, Wochentag, Stundenplan."),
    ...writeLines(8), empty(),
    h2("Aufgabe 6: Partnerinterview"),
    p("Frage deinen Partner. Schreibe die Antworten auf."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Frage"), hCell("Antwort meines Partners")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was hast du in deinem Maeppchen?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wo sitzt du im Klassenzimmer?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was ist dein Lieblingsfach?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was machst du am Wochenende?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wann beginnt dein Unterricht?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
      ]
    }),
    empty(),
    h2("Aufgabe 7: Selbstevaluation"),
    p("Wie gut kannst du das? Kreuze an."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [5400, 1200, 1200, 1200],
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Ich kann ...", { bold: true })] }),
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gut", bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OK", bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Noch nicht", bold: true, size: 22, font: "Arial" })] })] }),
        ]}),
        ...[
          "Schulsachen auf Deutsch benennen.",
          "das Klassenzimmer beschreiben (vorne / hinten / links / rechts).",
          "ueber Schulfaecher sprechen (Lieblingsfach, schwer / leicht).",
          "alle Wochentage nennen und am + Wochentag verwenden.",
          "einen Stundenplan lesen und Fragen dazu beantworten.",
        ].map(function(text) {
          return new TableRow({ children: [
            new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p(text)] }),
            new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "[ ]", size: 24, font: "Arial" })] })] }),
            new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "[ ]", size: 24, font: "Arial" })] })] }),
            new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "[ ]", size: 24, font: "Arial" })] })] }),
          ]});
        }),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_ABSCHLUSS.docx");
}

async function abschluss_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Abschlussübung Schule & Lernen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn Satzstruktur und Wortschatz stimmen."),
    empty(),
    h2("Aufgabe 1: Lueckentext (Lesetext)"),
    p("Klasse -- Rucksack -- Maeppchen -- Tafel -- vorne -- Sport -- Montag -- Stunde -- Pause -- Wochenende"),
    empty(),
    h2("Aufgabe 2: Richtig / Falsch"),
    p("a) R"),
    p("b) R"),
    p("c) F  Die Tafel ist vorne."),
    p("d) F  Kims Lieblingsfach ist Sport."),
    p("e) R"),
    p("f) R"),
    empty(),
    h2("Aufgabe 3: Fragen"),
    p("a) Im Maeppchen hat Kim Bleistifte und einen Radiergummi."),
    p("b) Das Klassenzimmer ist gross und hell. Die Tafel ist vorne, Fenster links, Regal rechts."),
    p("c) Kim findet Mathe schwer."),
    p("d) Kim hat am Montag fuenf Stunden."),
    empty(),
    h2("Aufgabe 4: Schulprofil -- Kim"),
    p("Lieblings-Schulsache:   Maeppchen / Bleistift (individuelle Interpretation)"),
    p("Lieblingsfach:          Sport"),
    p("Schwertes Fach:         Mathe"),
    p("Unterricht beginnt um:  8 Uhr"),
    p("Lieblingstag:           Freitag (Wochenende beginnt am Freitag -- Texthinweis)"),
    empty(),
    p("Spalte Ich: individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5: Freies Schreiben -- Bewertungskriterien"),
    bullet("Mindestens 3 Schulsachen korrekt genannt"),
    bullet("Klassenzimmer mit Positionsangaben beschrieben"),
    bullet("Lieblingsfach genannt und begruendet"),
    bullet("Am + Wochentag korrekt verwendet"),
    bullet("Zeitangabe mit um ... Uhr fuer Stundenplan"),
    bullet("Saetze verstaendlich und grammatisch angemessen fuer A1"),
    empty(),
    h2("Aufgabe 6: Partnerinterview"),
    p("Individuelle Antworten akzeptieren."),
    p("Pruefen: Schulsachen mit Artikel, Klassenzimmer-Position, Lieblingsfach, Wochentag, Uhrzeit."),
    empty(),
    h2("Aufgabe 7: Selbstevaluation"),
    p("Individuelle Selbsteinschaetzung. Keine feste Loesung."),
    p("Lehrende koennen die Selbstevaluation mit eigenem Eindruck vergleichen."),
    empty(),
    h2("Gesamtbewertung (Hinweis fuer Lehrende)"),
    bullet("Aufgabe 1 (Lueckentext): 10 Punkte -- 1 pro Luecke"),
    bullet("Aufgabe 2 (R/F): 6 Punkte -- 1 pro Item"),
    bullet("Aufgabe 3 (Fragen): 4 Punkte -- 1 pro Antwort"),
    bullet("Aufgabe 4 (Profil Kim): 5 Punkte -- 1 pro Zeile"),
    bullet("Aufgabe 5 (Freies Schreiben): 6 Punkte -- je 1 fuer die Kriterien oben"),
    bullet("Aufgabe 6 (Interview): 5 Punkte -- 1 pro Frage"),
    bullet("Gesamt: 36 Punkte"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_ABSCHLUSS_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Abschlussübung fuer: A1_Kinder_SchuleLernen");
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await abschluss();
  await abschluss_L();
  console.log("");
  console.log("Fertig! 2 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
