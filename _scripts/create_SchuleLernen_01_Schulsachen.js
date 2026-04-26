"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "03_SchuleLernen", "01_Schulsachen");
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
        text: "A1 Kinder -- Schule & Lernen -- Schulsachen",
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

const TOPIC = "A1_Kinder_SchuleLernen_01_Schulsachen";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Schulsachen benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Was brauchst du fuer die Schule?"),
    p("Schreibe 5 Schulsachen auf."),
    empty(),
    p("1.  _________________________"),
    p("2.  _________________________"),
    p("3.  _________________________"),
    p("4.  _________________________"),
    p("5.  _________________________"),
    empty(),
    h2("Aufgabe 2: Schreibe Fragen und Antworten."),
    p("Schau auf die Informationen. Schreibe Fragen und Antworten."),
    empty(),
    pBold("Beispiel:  blau / Rucksack"),
    p("Frage:   Was ist blau?"),
    p("Antwort: Der Rucksack ist blau."),
    empty(),
    pBold("a)  rot / Heft"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("b)  gruen / Maeppchen"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    pBold("c)  gelb / Lineal"),
    p("Frage:"), writeLine(),
    p("Antwort:"), writeLine(),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Ich __________________ einen Stift fuer die Schule."),
    p("b)  Das ist ein __________________. Ich schreibe damit."),
    p("c)  Die Stifte sind in meinem __________________."),
    p("d)  Ich zeichne eine Linie mit dem __________________."),
    p("e)  Der __________________ ist rot. Ich trage ihn auf dem Ruecken."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3-5 Saetze. Was hast du in deinem Rucksack? Was brauchst du?"),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Schulsachen benennen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("Moegliche Antworten (beliebige 5):"),
    p("der Rucksack, das Heft, das Buch, der Stift, der Bleistift, das Lineal,"),
    p("die Schere, der Radiergummi, das Maeppchen, der Kleber, der Spitzer"),
    empty(),
    h2("Aufgabe 2"),
    pBold("a) rot / Heft"),
    p("Frage:   Was ist rot?"),
    p("Antwort: Das Heft ist rot."),
    empty(),
    pBold("b) gruen / Maeppchen"),
    p("Frage:   Was ist gruen?"),
    p("Antwort: Das Maeppchen ist gruen."),
    empty(),
    pBold("c) gelb / Lineal"),
    p("Frage:   Was ist gelb?"),
    p("Antwort: Das Lineal ist gelb."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Ich [brauche] einen Stift fuer die Schule."),
    p("b) Das ist ein [Stift / Bleistift]. Ich schreibe damit."),
    p("c) Die Stifte sind in meinem [Maeppchen]."),
    p("d) Ich zeichne eine Linie mit dem [Lineal]."),
    p("e) Der [Rucksack] ist rot. Ich trage ihn auf dem Ruecken."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Mindestens 3 Schulsachen korrekt benannt"),
    bullet("Verb haben oder brauchen korrekt verwendet"),
    bullet("Artikel (der/die/das) angemessen eingesetzt"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Schulsachen benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Max packt seinen Rucksack"),
    p("Hallo! Ich heisse Max. Ich bin 8 Jahre alt. Morgen ist Schule!", { size: 26 }),
    p("Ich packe meinen Rucksack. Ich nehme zwei Hefte und ein Buch. Dann nehme ich mein Maeppchen. Im Maeppchen sind Bleistifte, ein Radiergummi und ein Spitzer.", { size: 26 }),
    p("Meine Freundin Lisa hat ein rotes Maeppchen. Darin hat sie viele bunte Stifte. Sie hat auch eine Schere und einen Kleber.", { size: 26 }),
    p("Mein Lineal ist lang und blau. Es ist in meinem Rucksack. Ich bin fertig! Der Rucksack ist schwer.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Max ist 8 Jahre alt.                                 R  /  F"),
    p("b)  Max nimmt drei Hefte.                                R  /  F"),
    p("c)  Im Maeppchen sind Bleistifte und ein Radiergummi.    R  /  F"),
    p("d)  Lisa hat ein blaues Maeppchen.                       R  /  F"),
    p("e)  Das Lineal ist kurz und blau.                        R  /  F"),
    p("f)  Der Rucksack ist schwer.                             R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("a)  Was ist in Max Maeppchen?"),
    writeLine(), empty(),
    p("b)  Was hat Lisa in ihrem Maeppchen?"),
    writeLine(), empty(),
    p("c)  Wie ist das Lineal von Max?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Finde im Text."),
    p("Suche alle Schulsachen im Text. Schreibe sie auf."),
    empty(),
    p("Schulsachen im Text:"),
    ...writeLines(3), empty(),
    h2("Aufgabe 4: Schreibe ueber dich."),
    p("Was packst du in deinen Rucksack? Schreibe 2 Saetze."),
    writeLine(), writeLine(), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Schulsachen benennen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Max nimmt zwei Hefte."),
    p("c) R"),
    p("d) F  Lisa hat ein rotes Maeppchen."),
    p("e) F  Das Lineal ist lang und blau."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a) Im Maeppchen sind Bleistifte, ein Radiergummi und ein Spitzer."),
    p("b) Lisa hat bunte Stifte, eine Schere und einen Kleber."),
    p("c) Das Lineal ist lang und blau."),
    empty(),
    h2("Aufgabe 3"),
    p("Rucksack, Hefte, Buch, Maeppchen, Bleistifte, Radiergummi, Spitzer,"),
    p("Stifte, Schere, Kleber, Lineal"),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Rucksack", "Heft", "Stift", "Lineal", "Schere", "Buch",
                   "Radiergummi", "Maeppchen", "Bleistift", "Kleber", "Spitzer", "brauche"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Schulsachen benennen"),
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
    p("1.  Ich ______________ einen Stift und ein Heft."),
    p("2.  Das ist ein ______________. Ich schreibe damit."),
    p("3.  Ich trage meine Buecher im ______________."),
    p("4.  Ich zeichne Linien mit dem ______________."),
    p("5.  Meine Stifte sind im ______________."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Was hast du in deinem Maeppchen?"),
    p("B:  Ich habe einen ______________ und einen ______________."),
    p("A:  Hast du auch eine ______________?"),
    p("B:  Ja, und ich habe einen ______________. Den brauche ich zum Kleben."),
    p("A:  Ich habe meinen ______________ vergessen!"),
    p("B:  Hier, du kannst meinen nehmen."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber dich."),
    p("Was hast du in deinem Maeppchen? Ergaenze:"),
    empty(),
    p("In meinem Maeppchen habe ich __________________,"),
    p("__________________ und __________________."),
    empty(),
    p("Mein Lieblings-Schulgegenstand ist __________________,"),
    p("weil ____________________________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Schulsachen benennen"),
    empty(),
    h2("Teil 1"),
    p("1.  Ich [brauche] einen Stift und ein Heft."),
    p("2.  Das ist ein [Stift / Bleistift]. Ich schreibe damit."),
    p("3.  Ich trage meine Buecher im [Rucksack]."),
    p("4.  Ich zeichne Linien mit dem [Lineal]."),
    p("5.  Meine Stifte sind im [Maeppchen]."),
    empty(),
    p("(Ablenkwoerter: Schere, Buch nicht benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("B:  Ich habe einen [Bleistift] und einen [Radiergummi / Spitzer]."),
    p("A:  Hast du auch eine [Schere]?"),
    p("B:  Ja, und ich habe einen [Kleber]. Den brauche ich zum Kleben."),
    p("A:  Ich habe meinen [Stift / Bleistift / Radiergummi] vergessen!"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "der Rucksack / die Rucksaecke",     wortart: "Nomen (m)", beispiel: "Mein Rucksack ist blau." },
  { wort: "das Heft / die Hefte",              wortart: "Nomen (n)", beispiel: "Ich schreibe in mein Heft." },
  { wort: "das Buch / die Buecher",            wortart: "Nomen (n)", beispiel: "Das Buch ist interessant." },
  { wort: "der Stift / die Stifte",            wortart: "Nomen (m)", beispiel: "Ich brauche einen Stift." },
  { wort: "der Bleistift / die Bleistifte",    wortart: "Nomen (m)", beispiel: "Zeichne mit dem Bleistift." },
  { wort: "das Lineal / die Lineale",          wortart: "Nomen (n)", beispiel: "Ich messe mit dem Lineal." },
  { wort: "die Schere / die Scheren",          wortart: "Nomen (f)", beispiel: "Die Schere schneidet gut." },
  { wort: "der Radiergummi",                   wortart: "Nomen (m)", beispiel: "Ich brauche den Radiergummi." },
  { wort: "das Maeppchen / die Maeppchen",     wortart: "Nomen (n)", beispiel: "Die Stifte sind im Maeppchen." },
  { wort: "der Kleber / die Kleber",           wortart: "Nomen (m)", beispiel: "Klebe das Bild mit dem Kleber." },
  { wort: "der Spitzer / die Spitzer",         wortart: "Nomen (m)", beispiel: "Ich spitze den Bleistift an." },
  { wort: "das Blatt / die Blaetter",          wortart: "Nomen (n)", beispiel: "Schreib auf ein Blatt Papier." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Schulsachen benennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten (Deutsch vorne, Uebersetzung hinten)!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Schulsachen benennen"),
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
    bullet("der Stift (allgemein) vs. der Bleistift (zum Zeichnen/Schreiben mit Mine) unterscheiden."),
    bullet("das Maeppchen -- Diminutiv von Mappe, daher neutrum (das)."),
    bullet("Plural: die Hefte, die Buecher (Umlaut!), die Blaetter (Umlaut!)."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Schulsachen benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Was hast du dabei?"),
    p("Fuelle die Luecken aus und uebe den Dialog mit deinem Partner."),
    empty(),
    p("A:  Was hast du in deinem Maeppchen?"),
    p("B:  Ich habe __________, __________ und __________."),
    p("A:  Hast du auch einen __________?"),
    p("B:  Ja!  /  Nein, ich habe keinen __________."),
    p("A:  Kann ich deinen __________ nehmen?"),
    p("B:  Ja, natuerlich!  /  Nein, tut mir leid, ich brauche ihn."),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Was fehlt?"),
    p("Schau in deinen Rucksack. Was brauchst du?"),
    empty(),
    p("A:  Hast du ein Heft dabei?"),
    p("B:  Ja, ich habe ein Heft.  /  Nein, ich habe kein Heft."),
    p("A:  Was hast du vergessen?"),
    p("B:  Ich habe __________ vergessen."),
    p("A:  Brauchst du meinen / meine / mein __________?"),
    p("B:  Ja, bitte! Danke!"),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Was hast du in deinem Rucksack?"),
    writeLine(), empty(),
    p("2.  Was ist in deinem Maeppchen?"),
    writeLine(), empty(),
    p("3.  Welche Farbe hat dein Rucksack?"),
    writeLine(), empty(),
    p("4.  Was ist dein Lieblings-Schulgegenstand?"),
    writeLine(), empty(),
    p("5.  Was brauchst du heute fuer die Schule?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Wer hat ...?"),
    p("Gehe zu 3 Mitschuelerinnen/Mitschuelern. Frage: Hast du einen/eine/ein ...?"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Name"), hCell("Schulsache"), hCell("Farbe")] }),
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
    h1("LOESUNG: Konversation Schulsachen benennen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Was hast du in deinem Maeppchen?"),
    p("B:  Ich habe [Bleistifte], [einen Radiergummi] und [einen Spitzer]."),
    p("A:  Hast du auch einen [Kleber]?"),
    p("B:  Ja!  /  Nein, ich habe keinen [Kleber]."),
    p("A:  Kann ich deinen [Stift] nehmen?"),
    p("B:  Ja, natuerlich!"),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("B:  Ich habe [das Lineal] vergessen."),
    p("A:  Brauchst du mein Lineal?"),
    p("B:  Ja, bitte! Danke!"),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Schulsachen korrekt mit Artikel verwendet"),
    bullet("haben korrekt konjugiert (habe / hast / hat)"),
    bullet("Ja/Nein-Antworten korrekt formuliert"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Schulsachen benennen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("[BILD 1: 6 einzelne Schulsachen nebeneinander: Rucksack, Heft, Bleistift, Lineal, Schere, Radiergummi -- nummeriert 1 bis 6]"),
    empty(),
    p("Schreibe den Namen unter jedes Bild."),
    empty(),
    p("1. _________________________   2. _________________________"),
    p("3. _________________________   4. _________________________"),
    p("5. _________________________   6. _________________________"),
    empty(),
    h2("Aufgabe 2: Verbinde Bild und Wort."),
    p("[BILD 2: 4 Bilder auf der linken Seite (Maeppchen, Buch, Kleber, Spitzer) und 4 Woerter auf der rechten Seite -- durcheinander]"),
    empty(),
    p("Verbinde das Bild mit dem richtigen Wort mit einer Linie."),
    empty(),
    h2("Aufgabe 3: Was fehlt im Rucksack?"),
    p("[BILD 3: Ein offener Rucksack mit nur 3 Sachen darin (Heft, Buch, Lineal). Daneben eine Liste: Heft, Buch, Lineal, Maeppchen, Stift, Radiergummi]"),
    empty(),
    p("Was ist NICHT im Rucksack? Schreibe die fehlenden Sachen auf."),
    empty(),
    p("Fehlt:   _________________________,  _________________________"),
    p("         _________________________"),
    empty(),
    br(),
    h2("Aufgabe 4: Was sagt das Kind?"),
    p("[BILD 4: Ein Kind haelt einen Rucksack hoch. Neben dem Kind ist eine grosse leere Sprechblase.]"),
    empty(),
    p("Was sagt das Kind? Schreibe 1-2 Saetze in die Sprechblase."),
    p("Sprechblase:"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne deinen Schulranzen."),
    p("Zeichne deinen Rucksack oder deine Schultasche. Was ist drin?"),
    p("Schreibe die Namen der Sachen auf Deutsch dazu."),
    empty(),
    ...writeLines(6), empty(),
    p("In meinem Rucksack habe ich: __________________________________________"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Schulsachen benennen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Erwartet: 1. der Rucksack  2. das Heft  3. der Bleistift"),
    p("          4. das Lineal    5. die Schere  6. der Radiergummi"),
    p("Artikel muessen nicht zwingend genannt werden auf A1-Niveau."),
    empty(),
    h2("Aufgabe 2"),
    p("Antwort abhaengig von den Bildern."),
    p("Erwartet: korrekte Zuordnung der 4 Schulsachen."),
    empty(),
    h2("Aufgabe 3"),
    p("Fehlt: das Maeppchen, der Stift, der Radiergummi."),
    empty(),
    h2("Aufgabe 4"),
    p("Beispiel: Das ist mein Rucksack! Er ist schwer."),
    p("Oder: Ich habe viele Schulsachen. Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung und Antwort akzeptieren."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Artikel gezielt ueberpruefen: der Stift, das Heft, die Schere."),
    bullet("Plural-Formen als Bonus: die Stifte, die Hefte, die Scheren."),
    bullet("Aufgabe 5 eignet sich als Einstiegsaktivitaet fuer die Stunde."),
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
