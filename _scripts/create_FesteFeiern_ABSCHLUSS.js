"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "12_FesteFeiern", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_FesteFeiern";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  }]
};

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 100 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: BLUE, font: "Arial" })], spacing: { before: 160, after: 80 } }); }
function p(t, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text: t, size: opts.size || 22, font: "Arial", color: opts.color || "000000", bold: opts.bold || false, italics: opts.italic || false })],
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60 },
  });
}
function pBold(t, opts = {}) { return p(t, { ...opts, bold: true }); }
function pItalic(t, opts = {}) { return p(t, { ...opts, italic: true }); }
function empty() { return new Paragraph({ children: [new TextRun({ text: "", size: 22, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function bullet(t) { return new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })], numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 } }); }
function hCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: opts.size || 20, font: "Arial", color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
  });
}
function dCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, size: opts.size || 20, font: "Arial" })], alignment: opts.align || AlignmentType.LEFT })],
    shading: opts.shade ? { fill: LIGHT, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
    ...(opts.colspan ? { columnSpan: opts.colspan } : {}),
  });
}
function writeLine(n) { return new Paragraph({ children: [new TextRun({ text: "_".repeat(n || 60), size: 22, font: "Arial", color: GRAY })], spacing: { before: 60, after: 60 } }); }
function writeLines(count, n) { const arr = []; for (let i = 0; i < count; i++) { arr.push(writeLine(n)); arr.push(empty()); } return arr; }
function studentHead() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [dCell("Name: ______________________________", { width: 4500 }), dCell("Klasse: ____________", { width: 2200 }), dCell("Datum: ____________", { width: 2200 })] })],
  });
}
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " – ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] });
}
function save(fname, sections) {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: sections }]
  });
  Packer.toBuffer(doc).then(buf => { fs.writeFileSync(path.join(OUTPUT_DIR, fname), buf); console.log("OK ", fname); }).catch(e => console.error("FEHLER", fname, e.message));
}

function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Feste & Feiern"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 50"),
    empty(),

    h2("Aufgabe 1: Geburtstag-Wortschatz (8 Punkte)"),
    pBold("Schreib das richtige Wort: Kuchen / Kerzen / Geschenke / Luftballons / Gaeste / Karte / Glueckwunsch / Geburtstag"),
    empty(),
    p("1. Mama backt einen __________________ mit Schokolade."),
    p("2. Auf der Torte brennen 9 __________________."),
    p("3. Meine Freunde sind die __________________ auf der Party."),
    p("4. Ich bekomme viele __________________ von ihnen."),
    p("5. Ueber dem Tisch haengen bunte __________________."),
    p("6. Oma schickt eine schoene __________________."),
    p("7. Sara sagt: Herzlichen __________________ zum Geburtstag!"),
    p("8. Heute habe ich __________________!"),
    empty(),

    h2("Aufgabe 2: Lesetext (10 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo, ich bin Emma und ich liebe Feste!"),
          p("Mein Geburtstag ist am 14. April. Ich werde 9 Jahre alt. Mama backt einen grossen Schokoladenkuchen. Meine Freunde kommen zur Party und bringen Geschenke."),
          p("An Weihnachten feiere ich mit der ganzen Familie. Wir schmuecken einen grossen Tannenbaum und essen leckere Pluetzchen."),
          p("An Ostern suche ich bunte Eier im Garten. Mein kleiner Bruder hilft mir."),
          p("An Fasching verkleide ich mich gern. Letztes Jahr war ich eine Hexe!"),
          p("Mein Lieblingsfest ist mein Geburtstag, weil ich an diesem Tag im Mittelpunkt stehe!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Beantworte die Fragen:"),
    p("1. Wann hat Emma Geburtstag?"),
    writeLine(55), empty(),
    p("2. Wie alt wird sie?"),
    writeLine(55), empty(),
    p("3. Was machen sie an Weihnachten?"),
    writeLine(55), empty(),
    p("4. Was war Emma letztes Jahr an Fasching?"),
    writeLine(55), empty(),
    p("5. Welches ist Emmas Lieblingsfest und warum?"),
    writeLine(55), empty(),

    h2("Aufgabe 3: Fest zuordnen (8 Punkte)"),
    pBold("Schreib W (Weihnachten), O (Ostern), F (Fasching) oder G (Geburtstag)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sache / Aktivitaet", { width: 6500 }), hCell("W/O/F/G", { width: 3000 })] }),
        new TableRow({ children: [dCell("Geburtstagstorte mit Kerzen"), dCell("")] }),
        new TableRow({ children: [dCell("Tannenbaum schmuecken"), dCell("")] }),
        new TableRow({ children: [dCell("Bunte Eier verstecken"), dCell("")] }),
        new TableRow({ children: [dCell("Sich verkleiden und auf den Umzug gehen"), dCell("")] }),
        new TableRow({ children: [dCell("Pluetzchen backen im Dezember"), dCell("")] }),
        new TableRow({ children: [dCell("Der Osterhase kommt"), dCell("")] }),
        new TableRow({ children: [dCell("Helau! / Alaaf!"), dCell("")] }),
        new TableRow({ children: [dCell("Freunde einladen und Spiele spielen"), dCell("")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Lueckentext (8 Punkte)"),
    pBold("Ergaenze die Saetze."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Im  -  An  -  am  -  feiern  -  einladen  -  schmuecken  -  verstecken  -  verkleiden")],
      })]})],
    }),
    empty(),
    p("1. __________________ Dezember __________________ wir Weihnachten."),
    p("2. Wir __________________ den Tannenbaum mit Lichtern."),
    p("3. Ich habe __________________ 12. Mai Geburtstag."),
    p("4. Ich __________________ meine Freunde zur Party __________________."),
    p("5. __________________ Ostern __________________ wir Eier im Garten."),
    p("6. An Fasching __________________ wir uns mit lustigen Kostuemen."),
    empty(),

    h2("Aufgabe 5: Schreib ueber dich (8 Punkte)"),
    pBold("Schreib 5-6 Saetze: Wann hast du Geburtstag? Wie feierst du? Was ist dein Lieblingsfest und warum?"),
    empty(),
    ...writeLines(6, 55),

    h2("Aufgabe 6: Konversation (8 Punkte)"),
    pBold("Frag deine/n Partner/in und schreib die Antworten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wann hast du Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie alt wirst du dieses Jahr?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsfest?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du an Weihnachten?"), dCell("")] }),
      ],
    }),
    empty(),

    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... sagen, wann ich Geburtstag habe."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... gratulieren (Glueckwunsch / Alles Gute)."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... typische Sachen zu Festen benennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Festen die richtigen Aktivitaeten zuordnen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... mein Lieblingsfest beschreiben."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Feste & Feiern (LOESUNG)"),
    p("Gesamtpunkte: 50"),
    empty(),

    h2("Aufgabe 1: Geburtstag-Wortschatz (8 Punkte – je 1 Punkt)"),
    bullet("1. Kuchen"), bullet("2. Kerzen"), bullet("3. Gaeste"), bullet("4. Geschenke"),
    bullet("5. Luftballons"), bullet("6. Karte"), bullet("7. Glueckwunsch"), bullet("8. Geburtstag"),
    empty(),

    h2("Aufgabe 2: Lesetext (10 Punkte – je 2 Punkte)"),
    bullet("1. Sie hat am 14. April Geburtstag."),
    bullet("2. Sie wird 9 Jahre alt."),
    bullet("3. Sie schmuecken einen Tannenbaum und essen Pluetzchen mit der Familie."),
    bullet("4. Sie war eine Hexe."),
    bullet("5. Ihr Geburtstag — weil sie an diesem Tag im Mittelpunkt steht."),
    empty(),

    h2("Aufgabe 3: Fest-Zuordnung (8 Punkte – je 1 Punkt)"),
    bullet("Geburtstagstorte mit Kerzen → G"),
    bullet("Tannenbaum schmuecken → W"),
    bullet("Bunte Eier verstecken → O"),
    bullet("Sich verkleiden und auf den Umzug gehen → F"),
    bullet("Pluetzchen backen im Dezember → W"),
    bullet("Der Osterhase kommt → O"),
    bullet("Helau! / Alaaf! → F"),
    bullet("Freunde einladen und Spiele spielen → G"),
    empty(),

    h2("Aufgabe 4: Lueckentext (8 Punkte – je 1 Punkt)"),
    bullet("1. Im ... feiern"),
    bullet("2. schmuecken"),
    bullet("3. am"),
    bullet("4. lade ... ein"),
    bullet("5. An ... verstecken / suchen"),
    bullet("6. verkleiden"),
    empty(),

    h2("Aufgabe 5: Freies Schreiben (8 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Geburtstag mit korrekter Praeposition (1P)"),
    bullet("Alter mit 'werden' (1P)"),
    bullet("Mindestens 2 Aktivitaeten zur Feier nennen (2P)"),
    bullet("Lieblingsfest mit Begruendung (2P)"),
    bullet("Korrekte Verbformen (1P)"),
    bullet("5-6 vollstaendige Saetze (1P)"),
    empty(),
    pBold("Musterantwort:"),
    pItalic("Mein Geburtstag ist am 12. Maerz. Ich werde dieses Jahr 10 Jahre alt. Ich feiere mit meiner Familie und meinen Freunden. Mama backt einen Kuchen mit Erdbeeren. Mein Lieblingsfest ist Weihnachten, weil wir alle zusammen sind und es schoen geschmueckt ist."),
    empty(),

    h2("Aufgabe 6: Konversation (8 Punkte – je 2 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Vollstaendige Antworten in ganzen Saetzen (2P pro Frage)"),
    bullet("Korrekte Strukturen: am ... / Im ... / An ..."),
    pItalic("Musterantworten: Mein Geburtstag ist am 8. Juni. / Ich werde 9 Jahre alt. / Mein Lieblingsfest ist Ostern. / An Weihnachten esse ich Pluetzchen und bekomme Geschenke."),
    empty(),

    h2("Notenspiegel (50 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2500 }), hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2000 })] }),
        new TableRow({ children: [dCell("47-50"), dCell("1 (sehr gut)"), dCell("33-39"), dCell("3 (befriedigend)")] }),
        new TableRow({ children: [dCell("40-46"), dCell("2 (gut)"), dCell("25-32"), dCell("4 (ausreichend)")] }),
        new TableRow({ children: [dCell("24 und weniger"), dCell("5/6 (nicht ausreichend)"), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

console.log("Erstelle ABSCHLUSS: FesteFeiern");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
