"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "01_FamilieAlltag", "03_FamilienAlltag");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";

const PAGE_PROPS = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } };

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: "Symbol" } } }]
  }]
};

function docHeader() {
  return new Header({ children: [
    new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "A2 Kinder — Familie & Alltag — Familienalltag",
        italics: true, color: GRAY, size: 18, font: "Arial" })] })
  ]});
}
function docFooter() {
  return new Footer({ children: [
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "Seite ",                     color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ children: [PageNumber.CURRENT],     color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ text: " von ",                      color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" }),
    ]})
  ]});
}
function makeDoc(children) {
  return new Document({ numbering: NUMBERING,
    sections: [{ properties: PAGE_PROPS, headers: { default: docHeader() }, footers: { default: docFooter() }, children }] });
}
async function save(doc, filename) {
  const buf  = await Packer.toBuffer(doc);
  const dest = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(dest, buf);
  console.log("OK  " + filename);
}
function h1(text) { return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })] }); }
function h2(text) { return new Paragraph({ spacing: { before: 200, after: 80 },  children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })] }); }
function p(text, opts) { return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] }); }
function pBold(text)   { return p(text, { bold: true }); }
function pItalic(text) { return p(text, { italics: true }); }
function empty()       { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } },
    spacing: { before: 240, after: 0 }, children: [new TextRun("")] });
}
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br()          { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: 24, font: "Arial" })] });
}
function studentHead() {
  return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Name: _________________________________")] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Datum: ________________________________")] })
    ]})]
  });
}
function hCell(text) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })] });
}
function dCell(text, opts) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO },
    shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] })] });
}

const TOPIC = "A2_Kinder_FamilieAlltag_03_FamilienAlltag";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Über den Alltag der Familie sprechen"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Trennbare Verben."),
    p("Setze das Verb in die richtige Form ein. Achtung: Das Präfix steht am Satzende!"),
    empty(),
    p("a)  (aufstehen) Ich __________ um 7 Uhr __________ ."),
    p("b)  (anziehen) Mein Bruder __________ seine Schuluniform __________ ."),
    p("c)  (einkaufen) Meine Mutter __________ am Samstag im Supermarkt __________ ."),
    p("d)  (fernsehen) Wir __________ am Abend gemeinsam __________ ."),
    p("e)  (aufräumen) Ich __________ jeden Tag mein Zimmer __________ ."),
    empty(),
    h2("Aufgabe 2: Mein Tagesablauf."),
    p("Schreibe deinen Tagesablauf. Nutze diese Zeitwörter: zuerst, dann, danach, später, am Abend, schließlich."),
    empty(),
    pBold("Beispiel:  Zuerst stehe ich um 7 Uhr auf. Dann frühstücke ich mit meiner Familie."),
    empty(),
    ...writeLines(8), empty(),
    br(),
    h2("Aufgabe 3: Wer macht was bei euch zu Hause?"),
    p("Schreibe Sätze mit den Stichwörtern. Wer in deiner Familie macht das?"),
    empty(),
    p("a)  kochen:        ___________________________________________"),
    p("b)  einkaufen:     ___________________________________________"),
    p("c)  Wäsche waschen: __________________________________________"),
    p("d)  Müll rausbringen: ________________________________________"),
    p("e)  abwaschen:     ___________________________________________"),
    p("f)  staubsaugen:   ___________________________________________"),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe einen typischen Tag deiner Familie (10 Sätze)."),
    p("Tipp: morgens, mittags, am Nachmittag, am Abend — wer macht was?"),
    ...writeLines(10), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Schreibübung Familienalltag"),
    pItalic("Hinweis: Aufgaben 2-4 sind individuell. Hauptkriterien: trennbare Verben korrekt, Tagesabläufe sinnvoll."),
    empty(),
    h2("Aufgabe 1"),
    p("a)  Ich [stehe] um 7 Uhr [auf]."),
    p("b)  Mein Bruder [zieht] seine Schuluniform [an]."),
    p("c)  Meine Mutter [kauft] am Samstag im Supermarkt [ein]."),
    p("d)  Wir [sehen] am Abend gemeinsam [fern]."),
    p("e)  Ich [räume] jeden Tag mein Zimmer [auf]."),
    empty(),
    h2("Aufgabe 2 — Bewertungskriterien"),
    bullet("Mindestens 6 Sätze, Verben korrekt"),
    bullet("Trennbare Verben richtig getrennt (Ich stehe ... auf)"),
    bullet("Zeitausdrücke verwendet (zuerst, dann, danach, ...)"),
    bullet("Logischer Ablauf von morgens bis abends"),
    empty(),
    h2("Aufgabe 3 — Beispielsätze"),
    p("a)  Meine Mutter kocht jeden Tag das Mittagessen."),
    p("b)  Mein Vater kauft am Samstag ein."),
    p("c)  Meine Mutter wäscht die Wäsche."),
    p("d)  Mein Bruder bringt den Müll raus."),
    p("e)  Ich wasche manchmal ab."),
    p("f)  Mein Vater staubsaugt am Wochenende."),
    p("(Individuelle Antworten akzeptieren.)"),
    empty(),
    h2("Aufgabe 4 — Bewertungskriterien"),
    bullet("10 Sätze, Verben in der richtigen Form"),
    bullet("Mindestens 3 trennbare Verben verwendet"),
    bullet("Zeitstruktur erkennbar (morgens → abends)"),
    bullet("Verschiedene Familienmitglieder erwähnt"),
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
    h1("Leseübung: Familienalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Ein ganz normaler Mittwoch"),
    p("Mein Name ist Pauline und ich erzähle euch heute, wie ein normaler Tag bei uns zu Hause aussieht. Wir sind eine Familie mit vier Personen: meine Eltern, mein kleiner Bruder Max und ich.", { size: 26 }),
    p("Um 6:30 Uhr klingelt mein Wecker. Ich stehe auf, ziehe mich an und gehe ins Badezimmer. Mein Vater steht schon eine halbe Stunde früher auf, weil er weit zur Arbeit fahren muss. Er trinkt seinen Kaffee und liest die Zeitung.", { size: 26 }),
    p("Um 7:15 Uhr frühstücken wir alle zusammen in der Küche. Meine Mutter macht Brote für die Schule. Max isst nie viel zum Frühstück, nur ein Brötchen mit Marmelade. Ich trinke Kakao und esse Müsli.", { size: 26 }),
    p("Um 7:50 Uhr gehen Max und ich aus dem Haus. Wir gehen zu Fuß zur Schule, das dauert 15 Minuten. Meine Mutter arbeitet als Krankenschwester im Krankenhaus. Sie fängt um 9 Uhr an.", { size: 26 }),
    p("Am Nachmittag bin ich um 14 Uhr wieder zu Hause. Ich mache zuerst meine Hausaufgaben, dann spiele ich oder treffe Freunde. Um 18:30 Uhr essen wir Abendbrot. Danach helfen wir alle in der Küche: einer wäscht ab, einer trocknet ab, einer räumt auf.", { size: 26 }),
    p("Vor dem Schlafengehen lese ich noch ein bisschen oder höre Musik. Um 21 Uhr gehe ich ins Bett. Ich schlafe immer schnell ein, denn ich bin am Abend wirklich müde.", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Pauline steht um 6:30 Uhr auf.                                R  /  F"),
    p("b)  Der Vater frühstückt nicht mit der Familie.                   R  /  F"),
    p("c)  Max isst zum Frühstück ein Brötchen mit Marmelade.            R  /  F"),
    p("d)  Pauline und Max fahren mit dem Bus zur Schule.                R  /  F"),
    p("e)  Die Mutter ist Lehrerin.                                      R  /  F"),
    p("f)  Am Abend hilft die Familie zusammen in der Küche.             R  /  F"),
    empty(),
    br(),
    h2("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("a)  Wie viele Personen sind in Paulines Familie?"),
    writeLine(), empty(),
    p("b)  Was macht der Vater morgens, bevor die anderen aufstehen?"),
    writeLine(), empty(),
    p("c)  Wie kommen Pauline und Max zur Schule?"),
    writeLine(), empty(),
    p("d)  Was macht Pauline am Nachmittag zuerst?"),
    writeLine(), empty(),
    p("e)  Wann geht Pauline ins Bett?"),
    writeLine(), empty(),
    h2("Aufgabe 3: Tagesablauf in der richtigen Reihenfolge."),
    p("Nummeriere die Sätze (1-7) in der richtigen Reihenfolge:"),
    empty(),
    p("____  Pauline und Max gehen zur Schule."),
    p("____  Die Familie isst Abendbrot."),
    p("____  Pauline geht ins Bett."),
    p("____  Pauline steht auf."),
    p("____  Pauline macht Hausaufgaben."),
    p("____  Die Familie frühstückt zusammen."),
    p("____  Der Vater steht auf und liest Zeitung."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Leseübung Familienalltag"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F — Die Familie frühstückt um 7:15 Uhr alle zusammen."),
    p("c) R"),
    p("d) F — Sie gehen zu Fuß."),
    p("e) F — Die Mutter ist Krankenschwester."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a)  In Paulines Familie sind vier Personen."),
    p("b)  Der Vater trinkt Kaffee und liest die Zeitung."),
    p("c)  Sie gehen zu Fuß zur Schule."),
    p("d)  Sie macht zuerst ihre Hausaufgaben."),
    p("e)  Sie geht um 21 Uhr ins Bett."),
    empty(),
    h2("Aufgabe 3 — Reihenfolge"),
    p("1  Der Vater steht auf und liest Zeitung."),
    p("2  Pauline steht auf."),
    p("3  Die Familie frühstückt zusammen."),
    p("4  Pauline und Max gehen zur Schule."),
    p("5  Pauline macht Hausaufgaben."),
    p("6  Die Familie isst Abendbrot."),
    p("7  Pauline geht ins Bett."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["aufstehen", "frühstücken", "einkaufen", "kochen", "fernsehen", "ins Bett gehen", "Hausaufgaben", "abwaschen", "zusammen", "danach", "zuerst", "am Abend", "morgens", "mittags"];
  const children = [
    studentHead(), empty(),
    h1("Lückentext: Familienalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Wörterkasten"),
    p("Achtung: Es gibt mehr Wörter als Lücken!"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: Array(7).fill(1285),
      rows: [
        new TableRow({ children: woerter.slice(0, 7).map(function(w) {
          return new TableCell({ width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] });
        })}),
        new TableRow({ children: woerter.slice(7).map(function(w) {
          return new TableCell({ width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Mein Tagesablauf — ergänze die Sätze."),
    empty(),
    p("______________ stehe ich um 7 Uhr auf. Dann gehe ich ins Bad und ______________ . ______________ packe ich meine Schultasche und gehe zur Schule."),
    p("______________ esse ich in der Schulkantine. Nach der Schule mache ich meine ______________ am Schreibtisch."),
    p("______________ essen wir alle ______________ . Manchmal ______________ wir eine Serie. Um 21 Uhr ______________ ich ______________ ."),
    empty(),
    h2("Teil 2: Wer macht was? — Dialog"),
    empty(),
    p("A:  Wer ______________ bei euch zu Hause?"),
    p("B:  Meistens meine Mutter, aber am Wochenende ______________ mein Vater."),
    p("A:  Und wer geht ______________ ?"),
    p("B:  Das machen meine Eltern ______________ am Samstag."),
    p("A:  Hilfst du auch im Haushalt?"),
    p("B:  Ja, ich ______________ nach dem Essen und räume mein Zimmer auf."),
    empty(),
    br(),
    h2("Teil 3: Schreibe deinen Wochentag."),
    p("Ergänze mit deinen eigenen Angaben:"),
    empty(),
    p("____________ stehe ich um __________ Uhr auf."),
    p("Zum Frühstück esse ich __________________ und trinke __________________ ."),
    p("Ich gehe um __________ Uhr zur Schule. Ich gehe __________________ (zu Fuß / mit dem Bus / mit dem Fahrrad)."),
    p("Am Nachmittag mache ich __________________ ."),
    p("Wir essen Abendbrot um __________ Uhr. Danach __________________ ."),
    p("Ich gehe um __________ Uhr ins Bett."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Lückentext Familienalltag"),
    empty(),
    h2("Teil 1 — Beispiellösung"),
    p("[Zuerst / Morgens] stehe ich um 7 Uhr auf. Dann gehe ich ins Bad und [frühstücke]. [Danach] packe ich meine Schultasche und gehe zur Schule."),
    p("[Mittags] esse ich in der Schulkantine. Nach der Schule mache ich meine [Hausaufgaben] am Schreibtisch."),
    p("[Am Abend] essen wir alle [zusammen]. Manchmal [sehen ... fern] (sehen wir eine Serie). Um 21 Uhr [gehe] ich [ins Bett]."),
    empty(),
    p("(Mehrere Lösungen möglich. Wichtig: korrekte Konjugation, sinnvoller Tagesablauf.)"),
    empty(),
    h2("Teil 2 — Beispiellösung"),
    p("A:  Wer [kocht] bei euch zu Hause?"),
    p("B:  Meistens meine Mutter, aber am Wochenende [kocht] mein Vater."),
    p("A:  Und wer geht [einkaufen]?"),
    p("B:  Das machen meine Eltern [zusammen] am Samstag."),
    p("A:  Hilfst du auch im Haushalt?"),
    p("B:  Ja, ich [wasche ab] (oder: helfe abzuwaschen) nach dem Essen und räume mein Zimmer auf."),
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
  { wort: "aufstehen",          wortart: "Verb (trennbar)", beispiel: "Ich stehe um 7 Uhr auf." },
  { wort: "sich anziehen",      wortart: "Verb (refl./tr.)", beispiel: "Ich ziehe mich schnell an." },
  { wort: "frühstücken",        wortart: "Verb",            beispiel: "Wir frühstücken um 7:15 Uhr." },
  { wort: "zur Schule gehen",   wortart: "Verb-Phrase",     beispiel: "Mein Bruder geht um 8 Uhr zur Schule." },
  { wort: "Mittagessen kochen", wortart: "Verb-Phrase",     beispiel: "Meine Mutter kocht das Mittagessen." },
  { wort: "Hausaufgaben machen",wortart: "Verb-Phrase",     beispiel: "Ich mache jeden Tag Hausaufgaben." },
  { wort: "einkaufen",          wortart: "Verb (trennbar)", beispiel: "Wir kaufen am Samstag ein." },
  { wort: "fernsehen",          wortart: "Verb (trennbar)", beispiel: "Wir sehen am Abend fern." },
  { wort: "abwaschen",          wortart: "Verb (trennbar)", beispiel: "Ich wasche heute ab." },
  { wort: "aufräumen",          wortart: "Verb (trennbar)", beispiel: "Räum bitte dein Zimmer auf!" },
  { wort: "ins Bett gehen",     wortart: "Verb-Phrase",     beispiel: "Ich gehe um 21 Uhr ins Bett." },
  { wort: "der Tagesablauf",    wortart: "Nomen (m)",       beispiel: "Mein Tagesablauf ist immer ähnlich." },
  { wort: "morgens / mittags / abends", wortart: "Adverb",  beispiel: "Morgens trinke ich Kakao." },
  { wort: "zuerst / dann / danach", wortart: "Adverb",      beispiel: "Zuerst dusche ich, dann frühstücke ich." },
  { wort: "im Haushalt helfen", wortart: "Verb-Phrase",     beispiel: "Wir helfen alle im Haushalt." },
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
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Übersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }),
        ]}),
      ]
    }));
    if (i === 6) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Familienalltag"), pItalic("Niveau: A2 | Kinder und Jugendliche"), p("Lerne die Wörter und Wendungen rund um den Tagesablauf.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Bei trennbaren Verben immer beide Teile zusammen lernen: aufstehen → ich stehe ... auf."), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Wortliste Familienalltag"),
    pItalic("Hinweis: Übersetzungen sind individuell."),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Trennbare Verben sind A2-Schwerpunkt — bewusst markieren und üben."),
    bullet("Reihenfolgewörter (zuerst / dann / danach / schließlich) helfen beim Erzählen."),
    bullet("Tagesablauf erst chronologisch, dann mit Variation: 'Normalerweise ... aber heute ...'"),
    bullet("Reflexive Verben (sich anziehen, sich waschen) als A2-Erweiterung."),
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
    h1("Konversation: Familienalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggerüst 1: Wie sieht dein Tag aus?"),
    p("Sprich mit deinem Partner / deiner Partnerin über euren Tagesablauf."),
    empty(),
    p("A:  Wann stehst du normalerweise auf?"),
    p("B:  Ich stehe um __________ Uhr auf. Und du?"),
    p("A:  Ich stehe um __________ Uhr auf."),
    p("A:  Was machst du nach dem Aufstehen?"),
    p("B:  Zuerst __________________, dann __________________."),
    p("A:  Wann gehst du zur Schule?"),
    p("B:  Um __________ Uhr. Ich gehe __________ (zu Fuß / mit dem Bus / mit dem Fahrrad)."),
    p("A:  Was machst du am Nachmittag?"),
    p("B:  Ich __________________ und __________________."),
    empty(),
    pBold("Rollentausch! Erzählt jeweils euren ganzen Tag."),
    empty(),
    h2("Dialoggerüst 2: Wer macht was zu Hause?"),
    empty(),
    p("A:  Wer kocht bei euch?"),
    p("B:  Meistens __________________. Manchmal __________________."),
    p("A:  Hilfst du auch im Haushalt?"),
    p("B:  Ja, ich __________________ und __________________."),
    p("A:  Was nervt dich am meisten zu Hause?"),
    p("B:  __________________."),
    p("A:  Was machst du gern mit deiner Familie?"),
    p("B:  __________________."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Frühstückt deine Familie zusammen?"),
    writeLine(), empty(),
    p("2.  Wer kauft bei euch ein?"),
    writeLine(), empty(),
    p("3.  Was macht ihr am Abend gemeinsam?"),
    writeLine(), empty(),
    p("4.  Wann geht ihr ins Bett?"),
    writeLine(), empty(),
    p("5.  Was ist deine Lieblingszeit am Tag und warum?"),
    writeLine(), writeLine(), empty(),
    h2("Gruppenspiel: Tagesablauf-Pantomime"),
    p("Ein Spieler / eine Spielerin macht eine Tätigkeit pantomimisch vor (z. B. Zähne putzen, Hausaufgaben machen, einkaufen). Die anderen raten und sagen einen vollständigen Satz:"),
    p("'Du putzt dir die Zähne!' / 'Du gehst einkaufen!'"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [3000, 6000],
      rows: [
        new TableRow({ children: [hCell("Spieler/in"), hCell("Tätigkeit (Lösungssatz)")] }),
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
    h1("LÖSUNG: Konversation Familienalltag"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggerüst 1 — Beispiel"),
    p("A:  Wann stehst du normalerweise auf?"),
    p("B:  Ich stehe um [7] Uhr auf. Und du?"),
    p("A:  Ich stehe um [6:45] Uhr auf."),
    p("A:  Was machst du nach dem Aufstehen?"),
    p("B:  Zuerst [dusche ich], dann [frühstücke ich]."),
    p("A:  Wann gehst du zur Schule?"),
    p("B:  Um [7:50] Uhr. Ich gehe [zu Fuß]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Trennbare Verben korrekt verwendet (Ich stehe ... auf)"),
    bullet("Zeitangaben klar (um 7 Uhr, am Nachmittag, danach)"),
    bullet("Vollständige Sätze, korrekte Konjugation"),
    bullet("Aktive Beteiligung beider Partner"),
    bullet("Tagesablauf logisch geordnet"),
    empty(),
    h2("Hinweise für die Pantomime"),
    bullet("Lösungssätze in der 2. Person (Du ...) zur Aktivierung von Personalpronomen."),
    bullet("Auch trennbare Verben einplanen: aufstehen, anziehen, einkaufen, fernsehen, aufräumen."),
    bullet("Spielerische Wiederholung von Wortschatz und Verbformen."),
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
    h1("Bildaufgaben: Familienalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefügt."),
    empty(),
    h2("Aufgabe 1: Bilder den Tageszeiten zuordnen"),
    p("[BILD 1: 6 kleine Bilder — aufstehen, frühstücken, zur Schule gehen, Hausaufgaben, Abendbrot, ins Bett gehen]"),
    empty(),
    p("Schreibe unter jedes Bild den passenden Satz und die ungefähre Uhrzeit."),
    empty(),
    p("Bild A: __________________________________   um __________ Uhr"),
    p("Bild B: __________________________________   um __________ Uhr"),
    p("Bild C: __________________________________   um __________ Uhr"),
    p("Bild D: __________________________________   um __________ Uhr"),
    p("Bild E: __________________________________   um __________ Uhr"),
    p("Bild F: __________________________________   um __________ Uhr"),
    empty(),
    h2("Aufgabe 2: Familie in der Küche"),
    p("[BILD 2: Familie in der Küche — Mutter kocht, Vater deckt den Tisch, Kind räumt Geschirr ein, anderes Kind sitzt am Tisch]"),
    empty(),
    p("Wer macht was im Bild? Schreibe 4 Sätze."),
    p("Tipp: Verwende: kochen, den Tisch decken, abwaschen, sitzen, essen, helfen."),
    ...writeLines(5), empty(),
    br(),
    h2("Aufgabe 3: Sprechblasen"),
    p("[BILD 3: Mutter und Tochter im Bad am Morgen]"),
    empty(),
    p("Was sagen sie? Ergänze die Sprechblasen."),
    empty(),
    p("Mutter: 'Steh bitte _________________________ ! Es ist schon _________________________ .'"),
    writeLine(),
    p("Tochter: 'Ich bin schon wach. Ich _________________________ mich gleich _________________________ .'"),
    writeLine(),
    empty(),
    h2("Aufgabe 4: Wochenplan"),
    p("[BILD 4: Wochenplan-Tafel mit Aufgaben pro Wochentag und pro Person]"),
    empty(),
    p("Schau auf den Plan. Beantworte:"),
    empty(),
    p("a)  Wer kauft am Mittwoch ein?"),
    writeLine(), empty(),
    p("b)  Wann hat Mama frei?"),
    writeLine(), empty(),
    p("c)  Was macht Tom am Freitag?"),
    writeLine(), empty(),
    p("d)  Welche Aufgaben hast du in deiner Familie?"),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Mein Lieblingstag"),
    p("Zeichne deinen Lieblingstag in 4 Bildern (z. B. Frühstück, Schule, Nachmittag, Abend)."),
    p("Schreibe unter jedes Bild einen Satz."),
    ...writeLines(6), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Bildaufgaben Familienalltag"),
    pItalic("Hinweis: Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1 — Beispiellösung"),
    p("Bild A: Ich stehe auf.                  um 7 Uhr"),
    p("Bild B: Ich frühstücke.                  um 7:15 Uhr"),
    p("Bild C: Ich gehe zur Schule.             um 7:50 Uhr"),
    p("Bild D: Ich mache Hausaufgaben.          um 14:30 Uhr"),
    p("Bild E: Wir essen Abendbrot.             um 18:30 Uhr"),
    p("Bild F: Ich gehe ins Bett.               um 21 Uhr"),
    p("(Bilder/Reihenfolge können variieren.)"),
    empty(),
    h2("Aufgabe 2 — Beispiellösung"),
    p("Die Mutter kocht das Mittagessen."),
    p("Der Vater deckt den Tisch."),
    p("Das Mädchen räumt das Geschirr ein."),
    p("Der Junge sitzt am Tisch und wartet."),
    p("(Variationen je nach Bild akzeptieren.)"),
    empty(),
    h2("Aufgabe 3 — Beispiellösung"),
    p("Mutter: 'Steh bitte auf! Es ist schon spät / 7 Uhr.'"),
    p("Tochter: 'Ich bin schon wach. Ich ziehe mich gleich an.'"),
    empty(),
    h2("Aufgabe 4"),
    p("Antworten hängen vom eingefügten Wochenplan ab."),
    p("Erwartet: ganze Sätze, Personalpronomen korrekt, Wochentage richtig."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Bewertung: 4 verschiedene Tagesabschnitte, vollständige Sätze, sinnvoller Ablauf."),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Bilder zuordnen schult Wortschatz & Reihenfolge."),
    bullet("Familie-in-der-Küche-Bild erlaubt Beobachtungssprache (Wer macht was?)."),
    bullet("Wochenplan-Aufgabe verbindet Lesen + Sprechen + Personenbezug."),
    bullet("Eigener Lieblingstag motiviert + festigt Tagesablaufstruktur."),
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
  await schreiben();      await schreiben_L();
  await lesen();          await lesen_L();
  await luecken();        await luecken_L();
  await wortliste();      await wortliste_L();
  await konversation();   await konversation_L();
  await bildaufgaben();   await bildaufgaben_L();
  console.log("");
  console.log("Fertig! 12 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
