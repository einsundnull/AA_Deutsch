"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "01_FamilieAlltag", "01_FamilieErzaehlen");
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
        text: "A2 Kinder -- Familie & Alltag -- Familie erzaehlen",
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

const TOPIC = "A2_Kinder_FamilieAlltag_01_FamilieErzaehlen";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Ausfuehrlich ueber die Familie erzaehlen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Saetze verbinden mit 'und' / 'aber' / 'denn'."),
    p("Verbinde die zwei Saetze. Du darfst Verben oder Pronomen weglassen."),
    empty(),
    p("a)  Mein Bruder ist 12 Jahre alt. Er geht in die 6. Klasse."),
    writeLine(), empty(),
    p("b)  Meine Oma wohnt in Berlin. Wir sehen sie nur am Wochenende."),
    writeLine(), empty(),
    p("c)  Ich mag meine Schwester sehr. Manchmal streiten wir."),
    writeLine(), empty(),
    p("d)  Mein Vater arbeitet viel. Am Samstag spielt er mit uns Fussball."),
    writeLine(), empty(),
    h2("Aufgabe 2: Schreibe 5 Saetze ueber deine Familie."),
    p("Benutze diese Stichpunkte:"),
    bullet("Wie viele Personen?"),
    bullet("Wie heissen sie?"),
    bullet("Wie alt sind sie?"),
    bullet("Was machen sie (Beruf / Schule)?"),
    bullet("Was macht ihr zusammen?"),
    empty(),
    ...writeLines(7), empty(),
    br(),
    h2("Aufgabe 3: Vergangenheit - Was hat deine Familie gestern gemacht?"),
    p("Schreibe Saetze im Perfekt. Beispiel: Mein Vater hat gearbeitet."),
    empty(),
    p("a)  meine Mutter / kochen"),
    writeLine(), empty(),
    p("b)  mein Bruder / Fussball spielen"),
    writeLine(), empty(),
    p("c)  meine Schwester und ich / fernsehen"),
    writeLine(), empty(),
    p("d)  meine Eltern / einkaufen"),
    writeLine(), empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe einen kleinen Text (8-10 Saetze) ueber deine Familie."),
    p("Erzaehle, wer in deiner Familie ist, was die Personen gerne machen und was ihr am Wochenende gemeinsam macht."),
    ...writeLines(10), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Familie erzaehlen"),
    pItalic("Hinweis: Mehrere Loesungen moeglich. Hauptkriterium: Verstaendlichkeit und korrekte Grammatik."),
    empty(),
    h2("Aufgabe 1 - Beispielloesungen"),
    p("a)  Mein Bruder ist 12 Jahre alt und geht in die 6. Klasse."),
    p("b)  Meine Oma wohnt in Berlin, aber wir sehen sie nur am Wochenende."),
    p("c)  Ich mag meine Schwester sehr, aber manchmal streiten wir."),
    p("d)  Mein Vater arbeitet viel, aber am Samstag spielt er mit uns Fussball."),
    empty(),
    h2("Aufgabe 2 - Bewertungskriterien"),
    bullet("5 vollstaendige Saetze"),
    bullet("Verben in der richtigen Form (Praesens 3. Person Singular/Plural)"),
    bullet("Familienwortschatz korrekt eingesetzt"),
    bullet("Logischer Aufbau"),
    empty(),
    h2("Aufgabe 3 - Loesungen"),
    p("a)  Meine Mutter hat gekocht."),
    p("b)  Mein Bruder hat Fussball gespielt."),
    p("c)  Meine Schwester und ich haben ferngesehen."),
    p("d)  Meine Eltern haben eingekauft."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("8-10 Saetze, sinnvoll verbunden"),
    bullet("Mindestens 1 Satz im Perfekt"),
    bullet("Verschiedene Familienmitglieder"),
    bullet("Gemeinsame Aktivitaeten beschrieben"),
    bullet("Wenige grobe Grammatikfehler"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

// ============================================================================
// LESEN
// ============================================================================
async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseuebung: Familie erzaehlen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Lukas erzaehlt von seiner Familie"),
    p("Hallo, ich bin Lukas und ich bin 11 Jahre alt. Ich moechte euch meine Familie vorstellen.", { size: 26 }),
    p("Wir sind zu fuenft: meine Eltern, meine Schwester Mia, mein kleiner Bruder Finn und ich. Wir wohnen in einem kleinen Haus mit Garten in Muenchen.", { size: 26 }),
    p("Mein Vater heisst Stefan. Er ist 42 Jahre alt und arbeitet als Ingenieur bei BMW. Er kommt oft spaet nach Hause, aber am Wochenende ist er immer fuer uns da. Er kann sehr gut kochen und macht jeden Sonntag das Mittagessen.", { size: 26 }),
    p("Meine Mutter Sabine ist Lehrerin. Sie unterrichtet Englisch und Sport. Manchmal hilft sie mir bei den Hausaufgaben. Meine Mutter ist sehr lustig und wir lachen oft zusammen.", { size: 26 }),
    p("Mia ist 14 Jahre alt und geht aufs Gymnasium. Sie spielt Klavier und hoert gerne K-Pop. Mit ihr streite ich manchmal, weil sie nicht in mein Zimmer kommen darf. Aber meistens verstehen wir uns gut.", { size: 26 }),
    p("Mein kleiner Bruder Finn ist erst 5 Jahre alt. Er geht in den Kindergarten. Er ist manchmal anstrengend, aber auch sehr suess.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Lukas hat zwei Geschwister.                            R  /  F"),
    p("b)  Die Familie wohnt in Hamburg.                          R  /  F"),
    p("c)  Der Vater arbeitet bei VW.                             R  /  F"),
    p("d)  Die Mutter ist Lehrerin.                               R  /  F"),
    p("e)  Mia ist juenger als Lukas.                             R  /  F"),
    p("f)  Finn geht schon in die Schule.                         R  /  F"),
    empty(),
    br(),
    h2("Aufgabe 2: Beantworte die Fragen in ganzen Saetzen."),
    empty(),
    p("a)  Wie viele Personen sind in Lukas' Familie?"),
    writeLine(), empty(),
    p("b)  Was macht der Vater am Sonntag?"),
    writeLine(), empty(),
    p("c)  Welche Faecher unterrichtet die Mutter?"),
    writeLine(), empty(),
    p("d)  Warum streitet Lukas mit Mia?"),
    writeLine(), empty(),
    p("e)  Wie alt ist Finn und was macht er?"),
    writeLine(), empty(),
    h2("Aufgabe 3: Suche im Text."),
    p("Welche Adjektive benutzt Lukas, um seine Familie zu beschreiben?"),
    p("Schreibe mindestens 4 Adjektive auf."),
    ...writeLines(3), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseuebung Familie erzaehlen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R - Mia und Finn"),
    p("b) F - Sie wohnen in Muenchen."),
    p("c) F - Der Vater arbeitet bei BMW."),
    p("d) R"),
    p("e) F - Mia (14) ist aelter als Lukas (11)."),
    p("f) F - Finn geht in den Kindergarten."),
    empty(),
    h2("Aufgabe 2"),
    p("a)  In Lukas' Familie sind fuenf Personen."),
    p("b)  Am Sonntag macht der Vater das Mittagessen."),
    p("c)  Die Mutter unterrichtet Englisch und Sport."),
    p("d)  Lukas streitet mit Mia, weil sie nicht in sein Zimmer kommen darf."),
    p("e)  Finn ist 5 Jahre alt und geht in den Kindergarten."),
    empty(),
    h2("Aufgabe 3 - Beispielloesung"),
    p("klein, lustig, anstrengend, suess, gut, spaet"),
    p("(Auch akzeptabel: gross, jung, alt, neu)"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["heisst", "wohnt", "arbeitet", "spielt", "ist", "hat", "Schwester", "Bruder", "Eltern", "Grossmutter", "zusammen", "manchmal", "immer", "oft"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Familie erzaehlen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: Array(7).fill(1285),
      rows: [
        new TableRow({ children: woerter.slice(0, 7).map(function(w) {
          return new TableCell({
            width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })]
          });
        })}),
        new TableRow({ children: woerter.slice(7).map(function(w) {
          return new TableCell({
            width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })]
          });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Ergaenze den Text."),
    empty(),
    p("Meine Familie ______________ klein, aber wir sind ______________ zusammen. Mein Vater ______________ Andreas und ______________ als Mechaniker. Meine Mutter Petra ______________ in einem Buero. Ich ______________ eine ______________, sie heisst Sophia. Wir spielen ______________ Brettspiele am Abend. Meine ______________ wohnt in einer anderen Stadt, aber wir besuchen sie ______________."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Erzaehl mir von deiner Familie!"),
    p("B:  Ich habe einen ______________ und eine ______________. Mein Bruder ______________ Tobias."),
    p("A:  Was machen deine Eltern?"),
    p("B:  Mein Vater ______________ als Lehrer. Meine Mutter ______________ zu Hause und kuemmert sich um meinen kleinen Bruder."),
    p("A:  Macht ihr viel ______________?"),
    p("B:  Ja, am Wochenende ______________ wir ______________ in den Park."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber deine eigene Familie."),
    p("Ergaenze die Saetze mit deinen eigenen Angaben:"),
    empty(),
    p("Meine Familie hat __________________ Personen."),
    p("Mein Vater __________________ und arbeitet als __________________."),
    p("Meine Mutter __________________ und __________________."),
    p("Ich habe __________________ Geschwister."),
    p("Am Wochenende __________________ wir oft __________________."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Familie erzaehlen"),
    empty(),
    h2("Teil 1"),
    p("Meine Familie [ist] klein, aber wir sind [oft] zusammen. Mein Vater [heisst] Andreas und [arbeitet] als Mechaniker. Meine Mutter Petra [arbeitet] in einem Buero. Ich [habe] eine [Schwester], sie heisst Sophia. Wir spielen [manchmal] Brettspiele am Abend. Meine [Grossmutter] wohnt in einer anderen Stadt, aber wir besuchen sie [oft]."),
    empty(),
    p("(Mehrere Loesungen sind moeglich, z.B. 'manchmal' statt 'oft', 'immer' statt 'oft' usw. — wichtig ist die korrekte Grammatik.)"),
    empty(),
    h2("Teil 2"),
    p("A:  Erzaehl mir von deiner Familie!"),
    p("B:  Ich habe einen [Bruder] und eine [Schwester]. Mein Bruder [heisst] Tobias."),
    p("A:  Was machen deine Eltern?"),
    p("B:  Mein Vater [arbeitet] als Lehrer. Meine Mutter [ist] zu Hause und kuemmert sich um meinen kleinen Bruder."),
    p("A:  Macht ihr viel [zusammen]?"),
    p("B:  Ja, am Wochenende [spielt/gehen] wir [oft] in den Park."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ============================================================================
// WORTLISTE
// ============================================================================
const wortEintraege = [
  { wort: "die Familie",                  wortart: "Nomen (f)",      beispiel: "Meine Familie ist klein." },
  { wort: "die Eltern",                   wortart: "Nomen (Pl.)",    beispiel: "Meine Eltern arbeiten beide." },
  { wort: "die Geschwister",              wortart: "Nomen (Pl.)",    beispiel: "Ich habe zwei Geschwister." },
  { wort: "der/die Verwandte",            wortart: "Nomen",          beispiel: "Wir besuchen unsere Verwandten." },
  { wort: "zusammen",                     wortart: "Adverb",         beispiel: "Wir essen oft zusammen." },
  { wort: "manchmal / oft / immer",       wortart: "Adverb",         beispiel: "Wir gehen oft spazieren." },
  { wort: "sich verstehen",               wortart: "Verb (refl.)",   beispiel: "Wir verstehen uns gut." },
  { wort: "streiten",                     wortart: "Verb",           beispiel: "Wir streiten manchmal." },
  { wort: "helfen + Dativ",               wortart: "Verb",           beispiel: "Mein Vater hilft mir bei den Hausaufgaben." },
  { wort: "lieben / mögen",               wortart: "Verb",           beispiel: "Ich liebe meine Familie." },
  { wort: "der Beruf",                    wortart: "Nomen (m)",      beispiel: "Was ist dein Beruf?" },
  { wort: "arbeiten als",                 wortart: "Verb-Phrase",    beispiel: "Mein Vater arbeitet als Ingenieur." },
  { wort: "wohnen in / bei",              wortart: "Verb-Phrase",    beispiel: "Wir wohnen in Berlin." },
  { wort: "das Wochenende",               wortart: "Nomen (n)",      beispiel: "Am Wochenende sind wir zu Hause." },
  { wort: "gemeinsam",                    wortart: "Adjektiv",       beispiel: "Wir machen viele gemeinsame Ausfluege." },
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
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort", bold: true, size: 22, font: "Arial" })] })] }),
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
    if (i === 6) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Familie erzaehlen"), pItalic("Niveau: A2 | Kinder und Jugendliche"), p("Lerne die Woerter und Phrasen. Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten und ueberpruefe dich selbst!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Familie erzaehlen"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("'helfen' verlangt den Dativ — wichtig, schon hier einzufuehren."),
    bullet("'sich verstehen' als Beispiel fuer reflexive Verben."),
    bullet("Adverbien der Haeufigkeit (manchmal, oft, immer, nie) systematisch wiederholen."),
    bullet("'arbeiten als' + Beruf ohne Artikel: 'als Lehrer', 'als Aerztin'."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

// ============================================================================
// KONVERSATION
// ============================================================================
async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Familie erzaehlen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Neue Mitschuelerin / neuer Mitschueler"),
    p("Stell dir vor, ein neues Kind ist in deiner Klasse. Ihr lernt euch kennen."),
    empty(),
    p("A:  Hi! Ich bin neu hier. Erzaehl mir von deiner Familie."),
    p("B:  Klar! Wir sind ______________ Personen. Meine Mutter heisst ______________."),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe ______________. Er/Sie ist ______________ Jahre alt."),
    p("A:  Was machst du am Wochenende mit deiner Familie?"),
    p("B:  Wir machen oft ______________________. Manchmal ______________________."),
    p("A:  Das klingt schoen!"),
    empty(),
    pBold("Rollentausch! Uebt noch einmal."),
    empty(),
    h2("Dialoggeruest 2: Verwandtenbesuch"),
    empty(),
    p("A:  Wo warst du am Wochenende?"),
    p("B:  Ich war bei ______________________."),
    p("A:  Was habt ihr gemacht?"),
    p("B:  Wir haben ______________________ und ______________________."),
    p("A:  Hat es dir gefallen?"),
    p("B:  Ja, sehr! / Nicht so, weil ______________________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview: Frage deine/n Partner/in."),
    empty(),
    p("1.  Wie viele Personen sind in deiner Familie?"),
    writeLine(), empty(),
    p("2.  Was machen deine Eltern beruflich?"),
    writeLine(), empty(),
    p("3.  Mit wem in deiner Familie verstehst du dich am besten? Warum?"),
    writeLine(), empty(),
    p("4.  Was macht ihr am Wochenende zusammen?"),
    writeLine(), empty(),
    p("5.  Streitest du manchmal? Mit wem und worum?"),
    writeLine(), empty(),
    h2("Gruppenspiel: Familienraetsel"),
    p("Beschreibe ein Familienmitglied (ohne den Namen zu sagen). Die Anderen raten, wer es ist."),
    p("Beispiel: 'Diese Person ist 38 Jahre alt, sie arbeitet als Lehrerin und hilft mir oft bei den Hausaufgaben.' (Antwort: meine Mutter)"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Spieler/in"), hCell("Beschreibung & Loesung")] }),
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
    h1("LOESUNG: Konversation Familie erzaehlen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Hi! Ich bin neu hier. Erzaehl mir von deiner Familie."),
    p("B:  Klar! Wir sind [vier] Personen. Meine Mutter heisst [Anna]."),
    p("A:  Hast du Geschwister?"),
    p("B:  Ja, ich habe [eine Schwester]. Sie ist [8] Jahre alt."),
    p("A:  Was machst du am Wochenende mit deiner Familie?"),
    p("B:  Wir machen oft [Ausfluege in den Wald]. Manchmal [besuchen wir die Grosseltern]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Sinnvolle Antworten in vollstaendigen Saetzen"),
    bullet("Verben in der richtigen Form"),
    bullet("Familien- und Aktivitaetswortschatz korrekt"),
    bullet("Aktive Beteiligung beider Partner"),
    bullet("Mut zum Erzaehlen, auch wenn nicht alles perfekt ist"),
    empty(),
    h2("Hinweise fuer das Familienraetsel"),
    bullet("Mindestens 3 Hinweise pro Beschreibung verlangen."),
    bullet("Beschreibung darf Aussehen, Alter, Beruf und Eigenschaften enthalten."),
    bullet("Spiel foerdert Wortschatz und Hoerverstehen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

// ============================================================================
// BILDAUFGABEN
// ============================================================================
async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Familie erzaehlen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Familienfoto beschreiben"),
    p("[BILD 1: Familienfoto mit 4-5 Personen vor einem Haus]"),
    empty(),
    p("Schreibe 4-5 Saetze ueber das Bild. Was siehst du?"),
    p("Tipp: Wer ist auf dem Bild? Wo sind sie? Was machen sie?"),
    ...writeLines(5), empty(),
    h2("Aufgabe 2: Stammbaum lesen"),
    p("[BILD 2: Stammbaum mit Grosseltern, Eltern, Onkel/Tante, Cousin/Cousine, Kindern]"),
    empty(),
    p("Schaue auf den Stammbaum von Lina. Beantworte die Fragen."),
    empty(),
    p("a)  Wie heissen Linas Eltern?"),
    writeLine(), empty(),
    p("b)  Wie viele Geschwister hat Lina?"),
    writeLine(), empty(),
    p("c)  Wer ist Linas Tante?"),
    writeLine(), empty(),
    p("d)  Hat Lina Cousins oder Cousinen?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Sprechblasen ergaenzen"),
    p("[BILD 3: Drei Geschwister sitzen am Tisch und reden]"),
    empty(),
    p("Was sagen die Kinder ueber ihre Familie? Schreibe in die Sprechblasen."),
    empty(),
    p("Kind 1 (gross): _______________________________________________"),
    writeLine(),
    p("Kind 2 (mittel): ______________________________________________"),
    writeLine(),
    p("Kind 3 (klein): _______________________________________________"),
    writeLine(),
    empty(),
    h2("Aufgabe 4: Bilder verbinden"),
    p("[BILD 4: 4 kleine Bilder: kochen, Fussball spielen, Auto fahren, mit Hund spazieren gehen]"),
    empty(),
    p("Verbinde jedes Bild mit dem passenden Satz."),
    empty(),
    p("Bild A   ----   Mein Bruder spielt am Wochenende Fussball."),
    p("Bild B   ----   Mein Vater faehrt mich zur Schule."),
    p("Bild C   ----   Meine Mutter kocht jeden Sonntag fuer uns."),
    p("Bild D   ----   Meine Schwester geht mit dem Hund spazieren."),
    empty(),
    h2("Aufgabe 5: Mein Familienportrait"),
    p("Zeichne dich und deine Familie. Schreibe daneben einen Satz zu jeder Person."),
    p("Beispiel: 'Das ist mein Vater. Er ist 40 und arbeitet als Programmierer.'"),
    ...writeLines(7), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Familie erzaehlen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Erwartet: 4-5 Saetze, die das Bild beschreiben."),
    p("Beispiel: 'Auf dem Bild sehe ich eine Familie. Da sind Mutter, Vater und zwei Kinder. Sie stehen vor einem Haus. Sie lachen.'"),
    p("Bewertungskriterien: ganze Saetze, Familienwoerter korrekt, Verben richtig konjugiert."),
    empty(),
    h2("Aufgabe 2"),
    p("Antworten haengen vom konkreten Stammbaum ab."),
    p("Erwartet: ganze Saetze, korrekte Verwandtschaftsbeziehungen."),
    empty(),
    h2("Aufgabe 3"),
    p("Beispielloesungen:"),
    p("Kind 1: 'Wir sind drei Geschwister, und ich bin die Aelteste.'"),
    p("Kind 2: 'Mama kocht heute Pizza, das ist mein Lieblingsessen!'"),
    p("Kind 3: 'Ich liebe meine Familie sehr.'"),
    empty(),
    h2("Aufgabe 4 - Loesungen"),
    p("Bild A = Mein Bruder spielt Fussball."),
    p("Bild B = Mein Vater faehrt mich zur Schule."),
    p("Bild C = Meine Mutter kocht."),
    p("Bild D = Meine Schwester geht mit dem Hund."),
    p("(Konkrete Zuordnung haengt vom Bild ab.)"),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Beschriftung auf Korrektheit pruefen."),
    p("Erwartet: vollstaendige Saetze mit Berufsangabe oder Alter."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Stammbaum-Aufgaben helfen, Verwandtschaftsbeziehungen zu klaeren."),
    bullet("Bilder mit Aktivitaeten foerdern den Verbwortschatz im Praesens."),
    bullet("Auf 'mein/meine' nach Genus achten."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

// ============================================================================
// MAIN
// ============================================================================
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
