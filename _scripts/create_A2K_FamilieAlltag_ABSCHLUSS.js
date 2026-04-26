"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "01_FamilieAlltag", "ABSCHLUSS");
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
      children: [new TextRun({ text: "A2 Kinder — Familie & Alltag — ABSCHLUSS",
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
  return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [3000, 3000, 3000],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Name: ____________________")] }),
      new TableCell({ width: { size: 3000, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Klasse: __________________")] }),
      new TableCell({ width: { size: 3000, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Datum: ___________________")] })
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

const TOPIC = "A2_Kinder_FamilieAlltag_ABSCHLUSS";

// ============================================================================
// ABSCHLUSS
// ============================================================================
async function abschluss() {
  const children = [
    studentHead(), empty(),
    h1("ABSCHLUSSPRÜFUNG: Familie & Alltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    p("Diese Prüfung umfasst alle Themen der Lerneinheit:"),
    bullet("UP 01 — Ausführlich über die Familie erzählen"),
    bullet("UP 02 — Familienmitglieder beschreiben (Aussehen, Charakter)"),
    bullet("UP 03 — Über den Alltag der Familie sprechen"),
    p("Gesamt: 60 Punkte."),
    empty(),
    h2("Aufgabe 1 — Lesen (15 Punkte)"),
    pItalic("Lies den Text und beantworte die Fragen."),
    empty(),
    pBold("Familie Schmidt am Sonntag"),
    p("Die Familie Schmidt wohnt in einer großen Wohnung in Köln. Vater Klaus ist 47 Jahre alt und arbeitet als Polizist. Er ist groß, hat kurze graue Haare und einen Bart. Er ist sehr ruhig und geduldig.", { size: 26 }),
    p("Mutter Beate ist 44, schlank und hat lange braune Haare. Sie ist Lehrerin und sehr lustig. Die beiden Kinder Felix (13) und Hannah (10) sind oft in der Schule oder bei Freunden. Felix spielt Klavier, Hannah macht Ballett.", { size: 26 }),
    p("Am Sonntag ist die ganze Familie zu Hause. Vater Klaus steht zuerst auf und macht Frühstück. Er deckt den Tisch und kocht Kaffee. Um 9 Uhr frühstücken alle gemeinsam. Danach gehen sie spazieren oder spielen Brettspiele. Am Nachmittag besuchen sie oft die Großeltern.", { size: 26 }),
    empty(),
    p("Beantworte in ganzen Sätzen (je 2 Punkte, plus 1 Punkt für vollständigen Satz):"),
    empty(),
    p("a)  Wo wohnt die Familie Schmidt?"),
    writeLine(), empty(),
    p("b)  Wie sieht der Vater aus? Schreibe 2 Merkmale."),
    writeLine(), empty(),
    p("c)  Was ist die Mutter von Beruf?"),
    writeLine(), empty(),
    p("d)  Welches Hobby haben Felix und Hannah?"),
    writeLine(), empty(),
    p("e)  Wer macht am Sonntag das Frühstück?"),
    writeLine(), empty(),
    p("f)  Was machen sie am Nachmittag?"),
    writeLine(), empty(),
    br(),
    h2("Aufgabe 2 — Personenbeschreibung (10 Punkte)"),
    pItalic("Beschreibe ein Familienmitglied. Schreibe mindestens 5 Sätze."),
    p("Verwende: Alter, Aussehen (Haare, Augen, Größe), Charakter."),
    empty(),
    ...writeLines(7), empty(),
    h2("Aufgabe 3 — Trennbare Verben (10 Punkte)"),
    pItalic("Setze das richtige Verb in der korrekten Form ein. Trenne das Präfix richtig ab!"),
    p("Verben: aufstehen, anziehen, einkaufen, fernsehen, aufräumen"),
    empty(),
    p("a)  Mein Vater ______________ am Samstag im Supermarkt ______________ ."),
    p("b)  Wir ______________ jeden Abend zwei Stunden ______________ ."),
    p("c)  Ich ______________ um 7 Uhr ______________ ."),
    p("d)  Meine Schwester ______________ ihr Kleid ______________ ."),
    p("e)  Räum bitte dein Zimmer ______________ !  → Ich ______________ es schon ______________ ."),
    empty(),
    h2("Aufgabe 4 — Wortschatz (10 Punkte)"),
    pItalic("Schreibe das passende Wort. Je 1 Punkt."),
    empty(),
    p("a)  Bruder + Schwester  →  __________________"),
    p("b)  Mutter + Vater       →  __________________"),
    p("c)  Oma + Opa            →  __________________"),
    p("d)  Gegenteil von 'klein'  →  __________________"),
    p("e)  Gegenteil von 'fleißig' →  __________________"),
    p("f)  Gegenteil von 'lang'   →  __________________"),
    p("g)  Person, die sehr nett ist  →  __________________"),
    p("h)  Mahlzeit am Morgen   →  __________________"),
    p("i)  Mahlzeit am Mittag   →  __________________"),
    p("j)  Mahlzeit am Abend    →  __________________"),
    empty(),
    br(),
    h2("Aufgabe 5 — Tagesablauf schreiben (10 Punkte)"),
    pItalic("Beschreibe einen typischen Tag in deiner Familie."),
    p("Mindestens 8 Sätze. Verwende: zuerst, dann, danach, am Nachmittag, am Abend."),
    p("Mindestens 3 trennbare Verben (z. B. aufstehen, einkaufen, fernsehen)."),
    empty(),
    ...writeLines(10), empty(),
    h2("Aufgabe 6 — Sprechen (5 Punkte)"),
    pItalic("Vorbereitung für die mündliche Prüfung: Notiere Stichpunkte."),
    p("Du sollst deinem Lehrer / deiner Lehrerin in 2 Minuten von deiner Familie erzählen."),
    empty(),
    pBold("Wer ist in deiner Familie?"),
    writeLine(), empty(),
    pBold("Wie sehen sie aus?"),
    writeLine(), empty(),
    pBold("Was macht ihr gemeinsam?"),
    writeLine(), empty(),
    h2("Selbstevaluation"),
    p("Kreuze an, was du jetzt gut kannst:"),
    bullet("☐  Ich kann ausführlich über meine Familie erzählen."),
    bullet("☐  Ich kann Personen beschreiben (Aussehen + Charakter)."),
    bullet("☐  Ich kann meinen Tagesablauf erzählen."),
    bullet("☐  Ich kann trennbare Verben richtig benutzen."),
    bullet("☐  Ich kenne mindestens 30 neue Wörter aus diesem Thema."),
    empty(),
    pItalic("Punkte gesamt: ______ / 60   |   Note: ______"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + ".docx");
}

async function abschluss_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: ABSCHLUSSPRÜFUNG Familie & Alltag"),
    pItalic("Bewertung gesamt: 60 Punkte"),
    empty(),
    h2("Aufgabe 1 — Lesen (15 Punkte)"),
    p("a)  Die Familie Schmidt wohnt in Köln (in einer großen Wohnung).   (3 P.)"),
    p("b)  Der Vater ist groß und hat kurze graue Haare. / Er hat einen Bart. / Er ist 47.   (3 P. — 2 Merkmale + Satzstruktur)"),
    p("c)  Die Mutter ist Lehrerin.   (2 P.)"),
    p("d)  Felix spielt Klavier und Hannah macht Ballett.   (3 P.)"),
    p("e)  Vater Klaus macht das Frühstück.   (2 P.)"),
    p("f)  Sie besuchen oft die Großeltern.   (2 P.)"),
    empty(),
    h2("Aufgabe 2 — Personenbeschreibung (10 Punkte)"),
    pBold("Bewertungsraster:"),
    bullet("Mindestens 5 vollständige Sätze (3 P.)"),
    bullet("Aussehen: 2 Merkmale (Haare, Augen, Größe ...) (3 P.)"),
    bullet("Charakter: 1-2 Adjektive (2 P.)"),
    bullet("Korrekte Konjugation von 'sein' und 'haben' (2 P.)"),
    p("Beispiellösung: 'Mein Onkel ist 35 Jahre alt. Er ist groß und schlank. Er hat kurze schwarze Haare und braune Augen. Er ist sehr lustig und freundlich. Wir spielen oft zusammen Fußball.'"),
    empty(),
    h2("Aufgabe 3 — Trennbare Verben (10 Punkte, je 2 P.)"),
    p("a)  Mein Vater [kauft] am Samstag im Supermarkt [ein]."),
    p("b)  Wir [sehen] jeden Abend zwei Stunden [fern]."),
    p("c)  Ich [stehe] um 7 Uhr [auf]."),
    p("d)  Meine Schwester [zieht] ihr Kleid [an]."),
    p("e)  Räum bitte dein Zimmer [auf]!  → Ich [räume] es schon [auf]."),
    empty(),
    h2("Aufgabe 4 — Wortschatz (10 Punkte, je 1 P.)"),
    p("a)  die Geschwister"),
    p("b)  die Eltern"),
    p("c)  die Großeltern"),
    p("d)  groß"),
    p("e)  faul"),
    p("f)  kurz"),
    p("g)  freundlich (auch: nett, lieb)"),
    p("h)  das Frühstück"),
    p("i)  das Mittagessen"),
    p("j)  das Abendessen / das Abendbrot"),
    empty(),
    br(),
    h2("Aufgabe 5 — Tagesablauf (10 Punkte)"),
    pBold("Bewertungsraster:"),
    bullet("Mindestens 8 Sätze (3 P.)"),
    bullet("Mindestens 3 trennbare Verben korrekt (3 P.)"),
    bullet("Reihenfolgewörter verwendet (zuerst, dann, danach ...) (2 P.)"),
    bullet("Logischer Tagesablauf (2 P.)"),
    p("Beispiel: 'Zuerst stehe ich um 7 Uhr auf. Dann frühstücke ich mit meiner Familie. Danach gehe ich zur Schule. Am Nachmittag mache ich Hausaufgaben. Am Abend kauft mein Vater ein. Wir essen um 18 Uhr Abendbrot. Danach sehen wir manchmal fern. Um 21 Uhr gehe ich ins Bett.'"),
    empty(),
    h2("Aufgabe 6 — Sprechen (5 Punkte)"),
    pBold("Mündliche Bewertung:"),
    bullet("Spricht ca. 2 Minuten frei (2 P.)"),
    bullet("Benennt mindestens 4 Familienmitglieder (1 P.)"),
    bullet("Beschreibt mindestens 2 Personen genauer (1 P.)"),
    bullet("Erwähnt mindestens 1 gemeinsame Aktivität (1 P.)"),
    p("Stichpunkte sind nur Vorbereitung — keine extra Punkte für die Notizen."),
    empty(),
    h2("Notentabelle"),
    new Table({ width: { size: 6000, type: WidthType.DXA }, columnWidths: [2000, 2000, 2000],
      rows: [
        new TableRow({ children: [hCell("Punkte"), hCell("Note"), hCell("Bewertung")] }),
        new TableRow({ children: [dCell("54-60"),  dCell("1"),    dCell("sehr gut")] }),
        new TableRow({ children: [dCell("48-53"),  dCell("2"),    dCell("gut")] }),
        new TableRow({ children: [dCell("39-47"),  dCell("3"),    dCell("befriedigend")] }),
        new TableRow({ children: [dCell("30-38"),  dCell("4"),    dCell("ausreichend")] }),
        new TableRow({ children: [dCell("18-29"),  dCell("5"),    dCell("mangelhaft")] }),
        new TableRow({ children: [dCell("0-17"),   dCell("6"),    dCell("ungenügend")] }),
      ]
    }),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Aufgabe 5 (Tagesablauf) ist der zentrale Anwendungstest — hier zeigt sich der Stand am deutlichsten."),
    bullet("Trennbare Verben (Aufgabe 3) sind der Grammatik-Schwerpunkt von Thema 01 / UP 03."),
    bullet("Wenn das mündliche Format nicht möglich ist: Aufgabe 6 als kurzes geschriebenes 'Selbstporträt' werten."),
    bullet("Selbstevaluation am Ende ist optional, aber pädagogisch wertvoll."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle ABSCHLUSS-Dateien für: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await abschluss();
  await abschluss_L();
  console.log("");
  console.log("Fertig! 2 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
