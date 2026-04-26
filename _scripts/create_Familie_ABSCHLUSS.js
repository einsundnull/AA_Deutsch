"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "02_Familie", "ABSCHLUSS");
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
        text: "A1 Kinder -- Familie -- Abschlussübung",
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

const TOPIC = "A1_Kinder_Familie";

// ============================================================================
// ABSCHLUSSÜBUNG
// ============================================================================
async function abschluss() {
  const children = [
    studentHead(), empty(),
    h1("Abschlussübung: Familie"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Thema: Familienmitglieder, Geschwister, Haustiere, mein/meine"),
    empty(),

    h2("Aufgabe 1: Lies den Text."),
    p("Hallo! Ich heisse Nora. Ich bin 10 Jahre alt. Ich moechte euch meine Familie vorstellen.", { size: 26 }),
    p("Mein Vater heisst Daniel. Er ist 40 Jahre alt. Meine Mutter heisst Petra. Sie ist 38 Jahre alt. Mein Vater und meine Mutter sind meine Eltern.", { size: 26 }),
    p("Ich habe zwei Geschwister. Mein Bruder heisst Jonas. Er ist 13 Jahre alt und aelter als ich. Meine Schwester heisst Lea. Sie ist 7 Jahre alt und juenger als ich.", { size: 26 }),
    p("Wir haben auch Haustiere! Mein Bruder hat einen Hund. Der Hund heisst Finn und ist braun. Ich habe eine Katze. Meine Katze heisst Mia und ist grau. Meine Schwester hat ein Kaninchen. Das Kaninchen heisst Wuschel.", { size: 26 }),
    empty(),

    h2("Aufgabe 2: Richtig (R) oder Falsch (F)?"),
    p("a)  Nora ist 10 Jahre alt.                                R  /  F"),
    p("b)  Der Vater heisst Jonas.                               R  /  F"),
    p("c)  Nora hat zwei Geschwister.                            R  /  F"),
    p("d)  Jonas ist juenger als Nora.                           R  /  F"),
    p("e)  Noras Katze heisst Mia und ist grau.                  R  /  F"),
    p("f)  Das Kaninchen gehoert der kleinen Schwester.          R  /  F"),
    empty(),

    h2("Aufgabe 3: Beantworte die Fragen."),
    p("a)  Wie heissen Noras Eltern?"),
    writeLine(), empty(),
    p("b)  Wer ist aelter -- Jonas oder Nora?"),
    writeLine(), empty(),
    p("c)  Wie viele Haustiere hat die Familie insgesamt?"),
    writeLine(), empty(),
    p("d)  Wessen Hund ist Finn?"),
    writeLine(), empty(),

    br(),

    h2("Aufgabe 4: Ergaenze den Dialog."),
    p("Benutze: mein | meine | habe | hat | aelter | juenger"),
    empty(),
    p("A:  Wer ist das auf dem Foto?"),
    p("B:  Das ist ______________ Bruder. Er heisst Jonas."),
    p("A:  Wie alt ist er?"),
    p("B:  Er ist 13. Er ist ______________ als ich."),
    p("A:  Hast du noch mehr Geschwister?"),
    p("B:  Ja! Ich ______________ auch eine Schwester. Sie ist 7."),
    p("A:  Und Haustiere? Ist das ______________ Katze?"),
    p("B:  Ja! Das ist ______________ Katze Mia. ______________ Bruder ______________ einen Hund."),
    empty(),
    pBold("Rollentausch!"),
    empty(),

    h2("Aufgabe 5: Fuell das Familienprofil aus."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Kategorie"), hCell("Deine Angabe")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Mein Vater heisst")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Meine Mutter heisst")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Meine Geschwister")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Ich bin (aelter/juenger)")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [p("Mein Haustier")] }),
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
      ]
    }),
    empty(),

    br(),

    h2("Aufgabe 6: Stelle deine Familie vor."),
    p("Schreibe 6-8 Saetze. Benutze: Familienmitglieder, Geschwister, Haustiere und mein/meine."),
    pItalic("Beispiel: Mein Vater heisst ... Ich habe einen Bruder. Er ist ... Meine Katze heisst ..."),
    ...writeLines(8), empty(),

    h2("Aufgabe 7: Partnergespraech"),
    p("Frag deinen Partner / deine Partnerin. Schreibe die Antworten auf."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [4000, 5000],
      rows: [
        new TableRow({ children: [hCell("Frage"), hCell("Antwort")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Wer ist in deiner Familie?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Hast du Geschwister?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Bist du aelter oder juenger?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Hast du ein Haustier?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Was ist dein Lieblingstier?")] }),
          new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
      ]
    }),
    empty(),

    br(),

    h2("Selbstevaluation"),
    p("Wie gut kannst du das? Kreuze an."),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [5400, 1200, 1200, 1200],
      rows: [
        new TableRow({ children: [hCell("Ich kann ..."), hCell("Gut"), hCell("OK"), hCell("Noch nicht")] }),
        new TableRow({ children: [dCell("Familienmitglieder benennen (Vater, Mutter, ...)."), dCell("[ ]"), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("ueber Geschwister sprechen (aelter/juenger als)."), dCell("[ ]"), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("Haustiere benennen und beschreiben."), dCell("[ ]"), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("mein/meine korrekt verwenden."), dCell("[ ]"), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("meine Familie vorstellen (6-8 Saetze)."), dCell("[ ]"), dCell("[ ]"), dCell("[ ]")] }),
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
    h1("LOESUNG: Abschlussübung Familie"),
    pItalic("Hinweis: Individuelle Antworten bei Aufgaben 5, 6 und 7 akzeptieren."),
    empty(),

    h2("Aufgabe 2: Richtig / Falsch"),
    p("a) R"),
    p("b) F  Der Vater heisst Daniel. (Jonas ist der Bruder.)"),
    p("c) R"),
    p("d) F  Jonas ist aelter als Nora. (Jonas ist 13, Nora ist 10.)"),
    p("e) R"),
    p("f) R"),
    empty(),

    h2("Aufgabe 3: Fragen"),
    p("a) Noras Eltern heissen Daniel und Petra."),
    p("b) Jonas ist aelter -- er ist 13, Nora ist 10."),
    p("c) Die Familie hat drei Haustiere (Hund, Katze, Kaninchen)."),
    p("d) Finn gehoert Jonas (Noras Bruder)."),
    empty(),

    h2("Aufgabe 4: Dialog"),
    p("B:  Das ist [mein] Bruder."),
    p("B:  Er ist [aelter] als ich."),
    p("B:  Ich [habe] auch eine Schwester."),
    p("A:  Ist das [deine] Katze?"),
    p("B:  Das ist [meine] Katze Mia. [Mein] Bruder [hat] einen Hund."),
    empty(),

    h2("Aufgabe 5: Familienprofil"),
    p("Individuelle Antworten -- Kontrolle: mein/meine korrekt nach Genus."),
    empty(),

    h2("Aufgabe 6: Freies Schreiben"),
    pBold("Bewertungskriterien:"),
    bullet("6-8 Saetze vorhanden"),
    bullet("Familienmitglieder mit mein/meine korrekt"),
    bullet("Geschwister erwaehnt mit aelter/juenger als"),
    bullet("Haustier benannt mit korrektem Artikel (einen/eine/ein)"),
    bullet("Verb haben korrekt konjugiert"),
    pItalic("Musterantwort: Mein Vater heisst Frank. Meine Mutter heisst Anna. Ich habe eine Schwester. Sie heisst Clara und ist aelter als ich. Ich bin Einzelkind -- nein, ich habe eine Schwester! Meine Katze heisst Luna. Sie ist weiss und sehr suess."),
    empty(),

    h2("Aufgabe 7: Partnergespraech"),
    pBold("Bewertungskriterien:"),
    bullet("Korrekte Verwendung von mein/meine in Antworten"),
    bullet("haben korrekt konjugiert (ich habe, er/sie hat)"),
    bullet("aelter als / juenger als korrekt"),
    bullet("Haustier benannt"),
    bullet("Dialog natuerlich und verstaendlich"),
    empty(),

    h2("Selbstevaluation"),
    p("Individuelle Einschaetzung. Schueler mit 'Noch nicht' erhalten Zusatzuebungen."),
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
