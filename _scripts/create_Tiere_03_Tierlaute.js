"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "09_Tiere", "03_Tierlaute");
const TOPIC     = "A1_Kinder_Tiere_03_Tierlaute";
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
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC, size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
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

// ── Tierlaute-Tabelle ─────────────────────────────────────────────────────────
function makeTierlauteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Tier", { width: 2000 }), hCell("Laut", { width: 1800 }), hCell("Verb", { width: 2000 }), hCell("Lautmalerei", { width: 1800 }), hCell("Beispielsatz", { width: 1900 })] }),
      new TableRow({ children: [dCell("Hund"), dCell("bellt"), dCell("bellen"), dCell("Wau wau!"), dCell("Der Hund bellt laut.")] }),
      new TableRow({ children: [dCell("Katze"), dCell("miaut"), dCell("miauen"), dCell("Miau!"), dCell("Die Katze miaut.")] }),
      new TableRow({ children: [dCell("Kuh"), dCell("muht"), dCell("muhen"), dCell("Muh!"), dCell("Die Kuh muht auf der Wiese.")] }),
      new TableRow({ children: [dCell("Schwein"), dCell("grunzt"), dCell("grunzen"), dCell("Oink oink!"), dCell("Das Schwein grunzt.")] }),
      new TableRow({ children: [dCell("Huhn"), dCell("gackert"), dCell("gackern"), dCell("Gack gack!"), dCell("Das Huhn gackert laut.")] }),
      new TableRow({ children: [dCell("Pferd"), dCell("wiehert"), dCell("wiehern"), dCell("Hieh!"), dCell("Das Pferd wiehert.")] }),
      new TableRow({ children: [dCell("Schaf"), dCell("blaekt"), dCell("blaeken"), dCell("Maeh!"), dCell("Das Schaf blaekt.")] }),
      new TableRow({ children: [dCell("Frosch"), dCell("quakt"), dCell("quaken"), dCell("Quak quak!"), dCell("Der Frosch quakt am Teich.")] }),
      new TableRow({ children: [dCell("Vogel"), dCell("zwitschert"), dCell("zwitschern"), dCell("Piep piep!"), dCell("Der Vogel zwitschert morgens.")] }),
      new TableRow({ children: [dCell("Loewe"), dCell("bruellt"), dCell("bruellen"), dCell("Roaar!"), dCell("Der Loewe bruellt im Zoo.")] }),
      new TableRow({ children: [dCell("Schlange"), dCell("zischt"), dCell("zischen"), dCell("Ssss!"), dCell("Die Schlange zischt.")] }),
      new TableRow({ children: [dCell("Biene"), dCell("summt"), dCell("summen"), dCell("Bzzz!"), dCell("Die Biene summt.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Tierlaute"), empty(),
    pBold("Aufgabe 1: Welches Verb passt? Ergaenze."),
    p("bellen / miauen / muhen / gackern / wiehern / blaeken / quaken / bruellen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Das Tier ...", { width: 6500 })] }),
        new TableRow({ children: [dCell("der Hund"), dCell("Der Hund __________________.")] }),
        new TableRow({ children: [dCell("die Katze"), dCell("Die Katze __________________.")] }),
        new TableRow({ children: [dCell("die Kuh"), dCell("Die Kuh __________________.")] }),
        new TableRow({ children: [dCell("das Pferd"), dCell("Das Pferd __________________.")] }),
        new TableRow({ children: [dCell("der Frosch"), dCell("Der Frosch __________________.")] }),
        new TableRow({ children: [dCell("der Loewe"), dCell("Der Loewe __________________.")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Lautmalerei – Was sagt das Tier? Verbinde und schreib."),
    p("Wau wau! / Miau! / Muh! / Maeh! / Quak quak! / Bzzz! / Piep piep! / Hieh!"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Laut", { width: 3000 }), hCell("Satz", { width: 3500 })] }),
        new TableRow({ children: [dCell("Katze"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Kuh"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Schaf"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Biene"), dCell(""), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze ueber Tierlaute."),
    p("Beispiel: Der Hund bellt, wenn er einen Fremden sieht."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 4: Welcher Tierlaut weckt dich morgens? Schreib 2-3 Saetze."),
    empty(),
    ...writeLines(3, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Tierlaute (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Verb-Loesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Das Tier ...", { width: 6500 })] }),
        new TableRow({ children: [dCell("der Hund"), dCell("Der Hund bellt.")] }),
        new TableRow({ children: [dCell("die Katze"), dCell("Die Katze miaut.")] }),
        new TableRow({ children: [dCell("die Kuh"), dCell("Die Kuh muht.")] }),
        new TableRow({ children: [dCell("das Pferd"), dCell("Das Pferd wiehert.")] }),
        new TableRow({ children: [dCell("der Frosch"), dCell("Der Frosch quakt.")] }),
        new TableRow({ children: [dCell("der Loewe"), dCell("Der Loewe bruellt.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Lautmalerei-Loesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Laut", { width: 3000 }), hCell("Satz", { width: 3500 })] }),
        new TableRow({ children: [dCell("Katze"), dCell("Miau!"), dCell("Die Katze sagt: Miau!")] }),
        new TableRow({ children: [dCell("Kuh"), dCell("Muh!"), dCell("Die Kuh sagt: Muh!")] }),
        new TableRow({ children: [dCell("Schaf"), dCell("Maeh!"), dCell("Das Schaf sagt: Maeh!")] }),
        new TableRow({ children: [dCell("Biene"), dCell("Bzzz!"), dCell("Die Biene sagt: Bzzz!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantworten"),
    bullet("Der Hund bellt, wenn er einen Fremden sieht."),
    bullet("Die Kuh muht morgens auf der Wiese."),
    bullet("Der Frosch quakt am Abend am Teich."),
    bullet("Der Vogel zwitschert frueh morgens."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Tierlaute"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Es ist frueh morgens auf dem Bauernhof von Familie Gruber."),
          p("Um 6 Uhr kraecht der Hahn: Kikeriki! Er weckt alle auf dem Bauernhof."),
          p("Die Kuehe im Stall muhen laut: Muh! Muh! Sie haben Hunger."),
          p("Die Huehner gackern und laufen auf den Hof: Gack gack gack!"),
          p("Der Hund Rex bellt die Katze an: Wau wau! Die Katze miaut zurueck: Miau!"),
          p("Draussen auf der Wiese blaeken die Schafe: Maeh! Maeh!"),
          p("Am Teich quaken die Froesche: Quak quak!"),
          p("Klein-Luisa (7 Jahre) schlaeft noch. Aber mit so vielen Tierlauten - unmoeglich!"),
          p("Sie lacht und sagt: Der Bauernhof ist mein bester Wecker!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Der Hahn kraecht um 6 Uhr."), dCell("")] }),
        new TableRow({ children: [dCell("Die Kuehe haben Durst."), dCell("")] }),
        new TableRow({ children: [dCell("Rex ist eine Katze."), dCell("")] }),
        new TableRow({ children: [dCell("Die Schafe sind auf der Wiese."), dCell("")] }),
        new TableRow({ children: [dCell("Luisa schlaeft am Anfang noch."), dCell("")] }),
        new TableRow({ children: [dCell("Luisa findet den Bauernhof langweilig."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Welches Tier macht welchen Laut? Schreib es auf."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Laut im Text", { width: 3000 }), hCell("Tier", { width: 3000 }), hCell("Verb", { width: 3500 })] }),
        new TableRow({ children: [dCell("Kikeriki!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Muh!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Gack gack!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Wau wau!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Maeh!"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Quak quak!"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Was sagt Luisa am Ende? Schreib es auf."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Tierlaute (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Der Hahn kraecht um 6 Uhr."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Kuehe haben Durst."), dCell("F (Hunger)")] }),
        new TableRow({ children: [dCell("Rex ist eine Katze."), dCell("F (ein Hund)")] }),
        new TableRow({ children: [dCell("Die Schafe sind auf der Wiese."), dCell("R")] }),
        new TableRow({ children: [dCell("Luisa schlaeft am Anfang noch."), dCell("R")] }),
        new TableRow({ children: [dCell("Luisa findet den Bauernhof langweilig."), dCell("F (sie lacht)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Tier + Verb"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Laut", { width: 3000 }), hCell("Tier", { width: 3000 }), hCell("Verb", { width: 3500 })] }),
        new TableRow({ children: [dCell("Kikeriki!"), dCell("der Hahn"), dCell("kraehen")] }),
        new TableRow({ children: [dCell("Muh!"), dCell("die Kuh"), dCell("muhen")] }),
        new TableRow({ children: [dCell("Gack gack!"), dCell("das Huhn"), dCell("gackern")] }),
        new TableRow({ children: [dCell("Wau wau!"), dCell("der Hund"), dCell("bellen")] }),
        new TableRow({ children: [dCell("Maeh!"), dCell("das Schaf"), dCell("blaeken")] }),
        new TableRow({ children: [dCell("Quak quak!"), dCell("der Frosch"), dCell("quaken")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3:"),
    p("Luisa sagt: Der Bauernhof ist mein bester Wecker!"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Tierlaute"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("bellt  -  miaut  -  muht  -  gackert  -  wiehert  -  blaekt  -  quakt  -  zwitschert  -  bruellt  -  summt  -  Wau  -  Miau  -  Muh  -  Maeh")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze das Verb."),
    empty(),
    p("1. Der Hund __________________ laut."),
    p("2. Die Katze __________________ leise."),
    p("3. Die Kuh __________________ auf der Wiese."),
    p("4. Das Pferd __________________ im Stall."),
    p("5. Der Frosch __________________ am Teich."),
    p("6. Der Vogel __________________ morgens."),
    p("7. Das Schaf __________________ auf der Wiese."),
    p("8. Der Loewe __________________ laut im Zoo."),
    empty(),
    pBold("Teil 2: Was sagt das Tier? Ergaenze den Laut."),
    empty(),
    p("1. Der Hund sagt: __________________ __________________!"),
    p("2. Die Katze sagt: __________________!"),
    p("3. Die Kuh sagt: __________________!"),
    p("4. Das Schaf sagt: __________________!"),
    empty(),
    pBold("Teil 3: Schreib den richtigen Satz."),
    empty(),
    p("1. [der Vogel / zwitschert / frueh morgens]"),
    writeLine(55), empty(),
    p("2. [die Biene / summt / in der Blume]"),
    writeLine(55), empty(),
    p("3. [alle Tiere / machen / verschiedene Laute]"),
    writeLine(55), empty(),
    pBold("Aufgabe 4 (frei): Welchen Tierlaut findest du lustig? Warum?"),
    writeLine(55), empty(),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Tierlaute (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. bellt"), bullet("2. miaut"), bullet("3. muht"), bullet("4. wiehert"),
    bullet("5. quakt"), bullet("6. zwitschert"), bullet("7. blaekt"), bullet("8. bruellt"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. Wau Wau!"), bullet("2. Miau!"), bullet("3. Muh!"), bullet("4. Maeh!"),
    empty(),
    pBold("Teil 3:"),
    bullet("1. Der Vogel zwitschert frueh morgens."),
    bullet("2. Die Biene summt in der Blume."),
    bullet("3. Alle Tiere machen verschiedene Laute."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Tierlaute"), empty(),
    makeTierlauteTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Tierlaute als Verben: bellen, miauen, muhen, gackern, wiehern, blaeken, quaken, zwitschern, bruellen, summen, zischen"),
    bullet("3. Person Singular: Der Hund bell-t. Die Katze miau-t. Das Schaf blaek-t."),
    bullet("Lautmalerei (Onomatopoeie): Wau! Miau! Muh! Maeh! Quak! Bzzz! Piep! Hieh!"),
    bullet("Achtung: fressen (Tiere) vs. essen (Menschen) | kraehen = to crow (der Hahn = rooster)"),
    bullet("der Hahn kraecht | die Ente schnattert | die Taube gurrt"),
    empty(),
    pBold("Aufgabe: Lerne 8 Tierlaute. Schreib Tier + Verb + Lautmalerei auf."),
    ...writeLines(8, 50),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Tierlaute (LOESUNG)"), empty(),
    makeTierlauteTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Der Hund bellt: Wau wau!"),
    bullet("Die Katze miaut: Miau!"),
    bullet("Die Kuh muht: Muh!"),
    bullet("Der Frosch quakt: Quak quak!"),
    bullet("Der Loewe bruellt: Roaar!"),
    bullet("Die Biene summt: Bzzz!"),
    bullet("Der Vogel zwitschert: Piep piep!"),
    bullet("Das Pferd wiehert: Hieh!"),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Tierlaute"), empty(),
    pBold("Dialog 1: Tier-Ratespiel"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ich denke an ein Tier. Es macht einen Laut. Raet mal!")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Macht es Wau wau?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Nein!")] }),
        new TableRow({ children: [dCell("Nina"), dCell("Macht es Muh?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ja! Was ist es?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Eine Kuh!")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Richtig! Die Kuh muht. Du bist dran!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Auf dem Bauernhof"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind"), dCell("Was macht das Tier da?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Das ist ein Hahn. Er kraecht jeden Morgen.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Kikeriki? So laut?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Ja! Der Hahn weckt alle auf dem Bauernhof.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Und die Schafe? Was machen die?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Die Schafe blaeken. Hoer mal: Maeh maeh!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Tierlaute"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Welchen Tierlaut findest du lustig?"), dCell("")] }),
        new TableRow({ children: [dCell("Welchen Tierlaut findest du gruselig?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier macht den lautesten Laut?"), dCell("")] }),
        new TableRow({ children: [dCell("Kannst du einen Tierlaut nachmachen?"), dCell("")] }),
        new TableRow({ children: [dCell("Weckt dich morgens ein Tier?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Tierlaut-Chor"),
    bullet("Jedes Kind bekommt heimlich ein Tier-Kaertchen."),
    bullet("Alle machen gleichzeitig ihren Tierlaut nach."),
    bullet("Wer den gleichen Laut hoert, bildet eine Gruppe."),
    bullet("Ziel: Gruppen nach Tierlaut sortieren (alle Hunde zusammen etc.)"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Tierlaute (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Es macht einen Laut. - unbestimmter Artikel 'einen' (maskulin Akkusativ)"),
    bullet("Raet mal! = Guess! (Imperativ Plural / Aufforderung)"),
    bullet("Du bist dran! = It's your turn!"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Hoer mal! = Listen! (Imperativ Singular)"),
    bullet("kraehen = to crow | blaeken = to bleat"),
    bullet("weckt alle auf = wakes everyone up (aufwecken = trennbares Verb)"),
    empty(),
    pBold("Nuetzliche Ausdruecke:"),
    bullet("Ich finde den Laut lustig / gruselig / suess / nervig."),
    bullet("Das Tier macht: Wau! / Miau! / Muh! etc."),
    bullet("Das klingt wie ... = That sounds like ..."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Tierlaute"), empty(),
    pBold("Aufgabe 1: Verbinde Tier, Laut und Verb."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("Lautmalerei", { width: 2350 }), hCell("Verb", { width: 4800 })] }),
        new TableRow({ children: [dCell("Hund"), dCell("Maeh!"), dCell("zwitschern")] }),
        new TableRow({ children: [dCell("Katze"), dCell("Wau wau!"), dCell("muhen")] }),
        new TableRow({ children: [dCell("Kuh"), dCell("Piep piep!"), dCell("bellen")] }),
        new TableRow({ children: [dCell("Schaf"), dCell("Miau!"), dCell("blaeken")] }),
        new TableRow({ children: [dCell("Vogel"), dCell("Muh!"), dCell("miauen")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Bauernhof am Morgen mit verschiedenen Tieren]"),
    p("Schreib: Welches Tier macht welchen Laut? Schreib Saetze."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Komische Tierwelt! Welcher Laut passt NICHT?"),
    p("Schreib das richtige Verb dazu."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier macht...", { width: 4000 }), hCell("Richtig oder falsch?", { width: 2000 }), hCell("Richtiger Laut", { width: 3500 })] }),
        new TableRow({ children: [dCell("Die Katze bellt."), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Der Hund miaut."), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Die Kuh muht."), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Das Pferd gackert."), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Der Frosch zwitschert."), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Schreib ein kurzes Gedicht ueber Tierlaute. 4 Zeilen."),
    p("Tipp: Benutze die Lautmalerei: Wau, Miau, Muh, Maeh, Quak, Bzzz..."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Tierlaute (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Korrekte Verbindung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("Lautmalerei", { width: 2350 }), hCell("Verb", { width: 4800 })] }),
        new TableRow({ children: [dCell("Hund"), dCell("Wau wau!"), dCell("bellen")] }),
        new TableRow({ children: [dCell("Katze"), dCell("Miau!"), dCell("miauen")] }),
        new TableRow({ children: [dCell("Kuh"), dCell("Muh!"), dCell("muhen")] }),
        new TableRow({ children: [dCell("Schaf"), dCell("Maeh!"), dCell("blaeken")] }),
        new TableRow({ children: [dCell("Vogel"), dCell("Piep piep!"), dCell("zwitschern")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Komische Tierwelt – Loesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier macht...", { width: 4000 }), hCell("R/F", { width: 2000 }), hCell("Richtig", { width: 3500 })] }),
        new TableRow({ children: [dCell("Die Katze bellt."), dCell("F"), dCell("Die Katze miaut.")] }),
        new TableRow({ children: [dCell("Der Hund miaut."), dCell("F"), dCell("Der Hund bellt.")] }),
        new TableRow({ children: [dCell("Die Kuh muht."), dCell("R"), dCell("")] }),
        new TableRow({ children: [dCell("Das Pferd gackert."), dCell("F"), dCell("Das Pferd wiehert.")] }),
        new TableRow({ children: [dCell("Der Frosch zwitschert."), dCell("F"), dCell("Der Frosch quakt.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2 + 4: individuelle Antworten"),
    pItalic("Aufgabe 2: Muster - Der Hund bellt: Wau wau! Die Kuh muht: Muh!"),
    pItalic("Aufgabe 4: Muster-Gedicht: Wau sagt der Hund, Miau die Katz, Quak quak der Frosch auf seinem Platz!"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Tierlaute");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
