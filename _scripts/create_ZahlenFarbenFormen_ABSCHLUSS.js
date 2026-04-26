"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "04_ZahlenFarbenFormen", "ABSCHLUSS");
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
        text: "A1 Kinder -- Zahlen, Farben, Formen -- Abschlussübung",
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

const TOPIC = "A1_Kinder_ZahlenFarbenFormen";

async function abschluss() {
  const woerter = ["elf", "gruen", "Dreieck", "blau", "zwanzig",
                   "Kreis", "gelb", "Rechteck", "drei", "Herz"];
  const children = [
    studentHead(), empty(),
    h1("Abschlussübung: Zahlen, Farben, Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Thema: Zahlen, Farben und Formen komplett"),
    empty(),
    h2("Lesetext: Sofias Kunstprojekt"),
    p("Ich heisse Sofia. Ich bin __________ Jahre alt. Ich mag Kunst sehr!", { size: 26 }),
    p("Heute mache ich ein Kunstprojekt. Ich schneide Formen aus buntem Papier aus. Ich nehme ein grosses __________ Rechteck fuer den Hintergrund.", { size: 26 }),
    p("Dann schneide ich __________ kleine Dreiecke aus rotem Papier. Die Dreiecke sind wie Berge.", { size: 26 }),
    p("Ich male eine __________ Sonne. Sie ist ein grosser __________. Daneben zeichne ich __________ Sterne. Die Sterne sind __________ und orange.", { size: 26 }),
    p("Unten klebe ich einen grossen __________ Baum. Er ist ein __________ auf einem braunen __________. Das Projekt hat __________ verschiedene Formen!", { size: 26 }),
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
    p("a)  Sofia ist 11 Jahre alt.                              R  /  F"),
    p("b)  Der Hintergrund ist ein blaues Rechteck.             R  /  F"),
    p("c)  Die Dreiecke sind aus blauem Papier.                 R  /  F"),
    p("d)  Die Sonne ist ein grosser Kreis.                     R  /  F"),
    p("e)  Der Baum ist gruen.                                  R  /  F"),
    p("f)  Das Projekt hat drei verschiedene Formen.            R  /  F"),
    empty(),
    h2("Aufgabe 3: Beantworte die Fragen."),
    empty(),
    p("a)  Wie viele Dreiecke schneidet Sofia aus?"),
    writeLine(), empty(),
    p("b)  Welche Farbe und Form hat die Sonne?"),
    writeLine(), empty(),
    p("c)  Welche Farbe hat der Baum?"),
    writeLine(), empty(),
    p("d)  Wie viele verschiedene Formen hat das Projekt?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 4: Mein Kunstprojekt -- Beschreibung"),
    p("Beschreibe ein eigenes Kunstprojekt mit Zahlen, Farben und Formen. Ergaenze die Tabelle."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Form"), hCell("Farbe"), hCell("Wie viele?")] }),
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
    br(),
    h2("Aufgabe 5: Schreibe ueber dein Kunstprojekt."),
    p("Benutze deine Tabelle aus Aufgabe 4. Schreibe 6-8 Saetze mit Zahlen, Farben und Formen."),
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
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wie alt bist du?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was ist deine Lieblingsfarbe?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was ist deine Lieblingsform?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was ist 9 plus 8?")] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Welche Form hat ein Fenster?")] }),
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
          "Zahlen von 1 bis 20 nennen und schreiben.",
          "Farben auf Deutsch benennen.",
          "geometrische Formen kennen und beschreiben.",
          "Zahlen, Farben und Formen kombiniert verwenden.",
          "einfache Rechenaufgaben (plus/minus) auf Deutsch loesen.",
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
    h1("LOESUNG: Abschlussübung Zahlen, Farben, Formen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn Satzstruktur und Wortschatz stimmen."),
    empty(),
    h2("Aufgabe 1: Lueckentext"),
    p("Reihenfolge im Text: elf -- blau -- drei -- gelbe -- Kreis -- zwanzig -- gruen -- gruenen -- Dreieck -- Rechteck -- drei (oder: zwanzig)"),
    empty(),
    p("Vollstaendiger Satz 1: Ich bin elf Jahre alt."),
    p("Vollstaendiger Satz 2: grosses blaues Rechteck"),
    p("Vollstaendiger Satz 3: drei kleine Dreiecke"),
    p("Vollstaendiger Satz 4: gelbe Sonne -- grosser Kreis -- zwanzig Sterne -- gruen"),
    p("Vollstaendiger Satz 5: gruenen Baum -- Dreieck -- Rechteck -- drei"),
    empty(),
    h2("Aufgabe 2: Richtig / Falsch"),
    p("a) R"),
    p("b) R"),
    p("c) F  Die Dreiecke sind aus rotem Papier."),
    p("d) R"),
    p("e) R"),
    p("f) F  Das Projekt hat drei verschiedene Formen (Dreieck, Kreis, Rechteck -- auch Stern/Herz moeglich)."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Sofia schneidet drei kleine Dreiecke aus."),
    p("b) Die Sonne ist gelb und ein grosser Kreis."),
    p("c) Der Baum ist gruen."),
    p("d) Das Projekt hat drei (oder mehr) verschiedene Formen."),
    empty(),
    h2("Aufgabe 4 + 5: Kunstprojekt -- Bewertungskriterien"),
    bullet("Mindestens 3 verschiedene Formen korrekt benannt"),
    bullet("Farben korrekt und sinnvoll zugeordnet"),
    bullet("Zahlen als Wort korrekt geschrieben"),
    bullet("Saetze grammatisch angemessen fuer A1"),
    bullet("Alle drei Themen (Zahlen, Farben, Formen) kommen vor"),
    empty(),
    h2("Aufgabe 6: Partnerinterview"),
    p("Individuelle Antworten akzeptieren."),
    p("9 + 8 = 17 (siebzehn) -- pruefen."),
    p("Fenster = Rechteck -- pruefen."),
    empty(),
    h2("Aufgabe 7: Selbstevaluation"),
    p("Individuelle Selbsteinschaetzung. Keine feste Loesung."),
    empty(),
    h2("Gesamtbewertung (Hinweis fuer Lehrende)"),
    bullet("Aufgabe 1 (Lueckentext): 10 Punkte"),
    bullet("Aufgabe 2 (R/F): 6 Punkte"),
    bullet("Aufgabe 3 (Fragen): 4 Punkte"),
    bullet("Aufgabe 4 (Tabelle): 4 Punkte"),
    bullet("Aufgabe 5 (Freies Schreiben): 5 Punkte nach Kriterien"),
    bullet("Aufgabe 6 (Interview): 5 Punkte"),
    bullet("Gesamt: 34 Punkte"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_ABSCHLUSS_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Abschlussübung fuer: A1_Kinder_ZahlenFarbenFormen");
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await abschluss();
  await abschluss_L();
  console.log("");
  console.log("Fertig! 2 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
