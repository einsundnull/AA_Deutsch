"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "01_SichVorstellen", "ABSCHLUSS");
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
        text: "A1 Kinder -- Sich selbst vorstellen -- Abschlussübung",
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

const TOPIC = "A1_Kinder_SichVorstellen";

// ============================================================================
// ABSCHLUSSÜBUNG
// ============================================================================
async function abschluss() {
  const children = [
    studentHead(), empty(),
    h1("Abschlussübung: Sich selbst vorstellen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Thema: Name, Alter, Wohnort, Herkunft, Sprachen"),
    empty(),

    // AUFGABE 1: LESETEXT
    h2("Aufgabe 1: Lies den Text."),
    p("Hallo! Ich heisse Mia. Ich bin 11 Jahre alt. Ich wohne in Dresden. Das ist eine Stadt in Deutschland. Ich komme aus Polen. Meine Familie ist vor 3 Jahren nach Deutschland gezogen. Ich spreche Polnisch und Deutsch. Ein bisschen kann ich auch Englisch.", { size: 26 }),
    p("Mein Freund heisst Leo. Er ist 12 Jahre alt. Er wohnt auch in Dresden. Leo kommt aus Deutschland. Er spricht Deutsch und lernt Spanisch in der Schule.", { size: 26 }),
    empty(),

    h2("Aufgabe 2: Richtig (R) oder Falsch (F)?"),
    p("a)  Mia ist 12 Jahre alt.                          R  /  F"),
    p("b)  Mia wohnt in Dresden.                          R  /  F"),
    p("c)  Dresden ist eine Stadt in Oesterreich.         R  /  F"),
    p("d)  Mia kommt aus Polen.                           R  /  F"),
    p("e)  Leo spricht Polnisch.                          R  /  F"),
    p("f)  Leo lernt Spanisch in der Schule.              R  /  F"),
    empty(),

    h2("Aufgabe 3: Beantworte die Fragen zu Mia."),
    p("a)  Wie heisst das Maedchen?"),
    writeLine(), empty(),
    p("b)  Wie alt ist sie?"),
    writeLine(), empty(),
    p("c)  Wo wohnt sie?"),
    writeLine(), empty(),
    p("d)  Woher kommt sie?"),
    writeLine(), empty(),
    p("e)  Welche Sprachen spricht sie?"),
    writeLine(), empty(),

    br(),

    // AUFGABE 4: DIALOG
    h2("Aufgabe 4: Ergaenze den Dialog."),
    p("Benutze: heisse | bin | wohne | komme | spreche"),
    empty(),
    p("A:  Wie heisst du?"),
    p("B:  Ich ______________ Sofia."),
    p("A:  Wie alt bist du?"),
    p("B:  Ich ______________ 10 Jahre alt."),
    p("A:  Wo wohnst du?"),
    p("B:  Ich ______________ in Wien."),
    p("A:  Woher kommst du?"),
    p("B:  Ich ______________ aus Ungarn."),
    p("A:  Welche Sprachen sprichst du?"),
    p("B:  Ich ______________ Ungarisch und Deutsch."),
    empty(),
    pBold("Rollentausch! Uebt den Dialog noch einmal."),
    empty(),

    // AUFGABE 5: PROFIL
    h2("Aufgabe 5: Fuell dein Profil aus."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Kategorie"), hCell("Deine Angabe")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Name")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Alter")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Wohnort")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Herkunft")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Sprachen")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
      ]
    }),
    empty(),

    br(),

    // AUFGABE 6: FREIES SCHREIBEN
    h2("Aufgabe 6: Stelle dich vor."),
    p("Schreibe 5-7 Saetze. Benutze alle fuenf Themen: Name, Alter, Wohnort, Herkunft, Sprachen."),
    pItalic("Beispiel: Ich heisse ... Ich bin ... Jahre alt. Ich wohne in ..."),
    ...writeLines(7), empty(),

    // AUFGABE 7: KONVERSATION
    h2("Aufgabe 7: Partnergespraech"),
    p("Frag deinen Partner / deine Partnerin. Schreibe die Antworten auf."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [4000, 5000],
      rows: [
        new TableRow({ children: [hCell("Frage"), hCell("Antwort")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wie heisst du?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wie alt bist du?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wo wohnst du?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Woher kommst du?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Welche Sprachen sprichst du?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
      ]
    }),
    empty(),

    // SELBSTEVALUATION
    br(),
    h2("Selbstevaluation"),
    p("Wie gut kannst du das? Kreuze an."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [5400, 1200, 1200, 1200],
      rows: [
        new TableRow({ children: [
          hCell("Ich kann ..."),
          hCell("Gut"),
          hCell("OK"),
          hCell("Noch nicht"),
        ]}),
        new TableRow({ children: [
          dCell("meinen Namen sagen und erfragen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
        new TableRow({ children: [
          dCell("mein Alter sagen und erfragen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
        new TableRow({ children: [
          dCell("meinen Wohnort nennen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
        new TableRow({ children: [
          dCell("meine Herkunft nennen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
        new TableRow({ children: [
          dCell("meine Sprachen nennen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
        new TableRow({ children: [
          dCell("mich vollstaendig vorstellen."),
          dCell("[ ]"), dCell("[ ]"), dCell("[ ]")
        ]}),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_ABSCHLUSS.docx");
}

// ============================================================================
// LOESUNG
// ============================================================================
async function abschluss_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Abschlussübung Sich selbst vorstellen"),
    pItalic("Hinweis: Individuelle Antworten bei Profil, Schreiben und Konversation akzeptieren."),
    empty(),

    h2("Aufgabe 2: Richtig / Falsch"),
    p("a) F  Mia ist 11 Jahre alt."),
    p("b) R"),
    p("c) F  Dresden ist in Deutschland."),
    p("d) R"),
    p("e) F  Leo spricht Deutsch (und lernt Spanisch)."),
    p("f) R"),
    empty(),

    h2("Aufgabe 3: Fragen zu Mia"),
    p("a) Das Maedchen heisst Mia."),
    p("b) Sie ist 11 Jahre alt."),
    p("c) Sie wohnt in Dresden."),
    p("d) Sie kommt aus Polen."),
    p("e) Sie spricht Polnisch und Deutsch (und ein bisschen Englisch)."),
    empty(),

    h2("Aufgabe 4: Dialog"),
    p("B:  Ich [heisse] Sofia."),
    p("B:  Ich [bin] 10 Jahre alt."),
    p("B:  Ich [wohne] in Wien."),
    p("B:  Ich [komme] aus Ungarn."),
    p("B:  Ich [spreche] Ungarisch und Deutsch."),
    empty(),

    h2("Aufgabe 5: Profil"),
    p("Individuelle Antworten der Schuelerinnen und Schueler."),
    empty(),

    h2("Aufgabe 6: Freies Schreiben"),
    h2("Bewertungskriterien"),
    bullet("Alle fuenf Themen enthalten (Name, Alter, Wohnort, Herkunft, Sprachen)"),
    bullet("Ich heisse ... korrekt"),
    bullet("Ich bin ... Jahre alt. korrekt"),
    bullet("Ich wohne in ... korrekt"),
    bullet("Ich komme aus ... korrekt"),
    bullet("Ich spreche ... korrekt"),
    bullet("5-7 Saetze geschrieben"),
    pItalic("Musterantwort: Ich heisse Elena. Ich bin 11 Jahre alt. Ich wohne in Hamburg. Das ist eine grosse Stadt in Deutschland. Ich komme aus Russland. Ich spreche Russisch und Deutsch. Ein bisschen spreche ich auch Englisch."),
    empty(),

    h2("Aufgabe 7: Konversation"),
    pBold("Bewertungskriterien:"),
    bullet("Korrekte Verwendung der fuenf gelernten Fragen und Antwortmuster"),
    bullet("Verb konjugiert: heisse, bin, wohne, komme, spreche"),
    bullet("Verstaendlich kommuniziert"),
    bullet("Rollentausch stattgefunden"),
    empty(),

    h2("Selbstevaluation"),
    p("Individuelle Einschaetzung. Kann im Unterricht besprochen werden."),
    p("Empfehlung: Schueler mit 'Noch nicht' erhalten Zusatzuebungen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_ABSCHLUSS_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Abschlussübung fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await abschluss();
  await abschluss_L();
  console.log("");
  console.log("Fertig! 2 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
