"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "09_Tiere", "01_HaustiereBauernhoftiere");
const TOPIC     = "A1_Kinder_Tiere_01_HaustiereBauernhoftiere";
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

// ── Haustier/Bauernhof-Tabelle ────────────────────────────────────────────────
function makeTiereTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Tier", { width: 2000 }), hCell("Artikel", { width: 1200 }), hCell("Plural", { width: 2000 }), hCell("Laut", { width: 1800 }), hCell("Beispielsatz", { width: 2500 })] }),
      new TableRow({ children: [dCell("Hund"), dCell("der"), dCell("die Hunde"), dCell("bellt"), dCell("Der Hund bellt laut.")] }),
      new TableRow({ children: [dCell("Katze"), dCell("die"), dCell("die Katzen"), dCell("miaut"), dCell("Die Katze miaut leise.")] }),
      new TableRow({ children: [dCell("Maus"), dCell("die"), dCell("die Maeuse"), dCell("quietscht"), dCell("Die Maus ist sehr klein.")] }),
      new TableRow({ children: [dCell("Hase"), dCell("der"), dCell("die Hasen"), dCell("trommelt"), dCell("Der Hase hat lange Ohren.")] }),
      new TableRow({ children: [dCell("Vogel"), dCell("der"), dCell("die Voegel"), dCell("zwitschert"), dCell("Der Vogel zwitschert morgens.")] }),
      new TableRow({ children: [dCell("Fisch"), dCell("der"), dCell("die Fische"), dCell("–"), dCell("Der Fisch schwimmt im Aquarium.")] }),
      new TableRow({ children: [dCell("Kuh"), dCell("die"), dCell("die Kuehe"), dCell("muht"), dCell("Die Kuh gibt Milch.")] }),
      new TableRow({ children: [dCell("Schwein"), dCell("das"), dCell("die Schweine"), dCell("grunzt"), dCell("Das Schwein liebt den Schlamm.")] }),
      new TableRow({ children: [dCell("Huhn"), dCell("das"), dCell("die Huehner"), dCell("gackert"), dCell("Das Huhn legt Eier.")] }),
      new TableRow({ children: [dCell("Pferd"), dCell("das"), dCell("die Pferde"), dCell("wiehert"), dCell("Das Pferd laeuft sehr schnell.")] }),
      new TableRow({ children: [dCell("Schaf"), dCell("das"), dCell("die Schafe"), dCell("blaekt"), dCell("Das Schaf hat weiche Wolle.")] }),
      new TableRow({ children: [dCell("Ziege"), dCell("die"), dCell("die Ziegen"), dCell("meckert"), dCell("Die Ziege frisst Gras.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Haustiere und Bauernhoftiere"), empty(),
    pBold("Aufgabe 1: Artikel ergaenzen (der / die / das)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Hund"), dCell(""), dCell("Kuh"), dCell("")] }),
        new TableRow({ children: [dCell("Katze"), dCell(""), dCell("Schwein"), dCell("")] }),
        new TableRow({ children: [dCell("Pferd"), dCell(""), dCell("Huhn"), dCell("")] }),
        new TableRow({ children: [dCell("Schaf"), dCell(""), dCell("Hase"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Haustier oder Bauernhoftier? Sortiere."),
    p("Hund / Katze / Kuh / Maus / Pferd / Fisch / Schwein / Huhn / Hase / Schaf / Vogel / Ziege"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Haustiere (zu Hause)", { width: 4700 }), hCell("Bauernhoftiere (auf dem Bauernhof)", { width: 4700 })] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze ueber Tiere."),
    p("Benutze: haben / sein / leben / fressen / geben"),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 4: Mein Lieblingstier"),
    p("Schreib 3-4 Saetze. Was ist dein Lieblingstier? Wie sieht es aus? Was kann es?"),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Hund"), dCell("der Hund"), dCell("Kuh"), dCell("die Kuh")] }),
        new TableRow({ children: [dCell("Katze"), dCell("die Katze"), dCell("Schwein"), dCell("das Schwein")] }),
        new TableRow({ children: [dCell("Pferd"), dCell("das Pferd"), dCell("Huhn"), dCell("das Huhn")] }),
        new TableRow({ children: [dCell("Schaf"), dCell("das Schaf"), dCell("Hase"), dCell("der Hase")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Haustier / Bauernhoftier"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Haustiere", { width: 4700 }), hCell("Bauernhoftiere", { width: 4700 })] }),
        new TableRow({ children: [dCell("Hund, Katze, Maus, Fisch, Hase, Vogel"), dCell("Kuh, Pferd, Schwein, Huhn, Schaf, Ziege")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantworten"),
    bullet("Der Hund hat vier Beine und bellt laut."),
    bullet("Die Kuh lebt auf dem Bauernhof und gibt Milch."),
    bullet("Das Huhn legt Eier."),
    bullet("Der Hase hat lange Ohren und frisst Moehren."),
    empty(),
    pBold("Aufgabe 4: individuell"),
    pItalic("Mein Lieblingstier ist die Katze. Sie ist weich und klein. Sie miaut und schlaeft viel."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Haustiere und Bauernhoftiere"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Lena besucht heute den Bauernhof von Oma Hilde. Der Bauernhof ist gross und hat viele Tiere."),
          p("Im Stall stehen vier Kuehe. Sie heissen Bella, Molli, Frieda und Rosa. Die Kuehe geben Milch."),
          p("Auf dem Hof laufen zehn Huehner herum. Sie gackern laut und legen jeden Tag Eier."),
          p("Im grossen Feld stehen zwei Pferde - ein braunes und ein weisses. Lena darf das weisse Pferd streicheln."),
          p("Im Haus wohnen auch zwei Haustiere: ein grosser Hund namens Rex und eine Katze namens Mimi."),
          p("Rex bellt die Fremden an. Mimi schlaeft lieber auf dem Sofa."),
          p("Lena liebt den Bauernhof. Hier gibt es so viele Tiere!"),
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
        new TableRow({ children: [dCell("Der Bauernhof hat drei Kuehe."), dCell("")] }),
        new TableRow({ children: [dCell("Die Kuehe geben Milch."), dCell("")] }),
        new TableRow({ children: [dCell("Die Huehner legen jeden Tag Eier."), dCell("")] }),
        new TableRow({ children: [dCell("Lena darf das braune Pferd streicheln."), dCell("")] }),
        new TableRow({ children: [dCell("Der Hund heisst Mimi."), dCell("")] }),
        new TableRow({ children: [dCell("Lena mag den Bauernhof."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie viele Huehner gibt es auf dem Bauernhof?"),
    writeLine(55), empty(),
    p("2. Wie heissen die zwei Haustiere im Haus?"),
    writeLine(55), empty(),
    p("3. Was machen die Huehner?"),
    writeLine(55), empty(),
    p("4. Was macht Mimi lieber?"),
    writeLine(55), empty(),
    empty(),
    pBold("Aufgabe 3: Welche Tiere stehen im Text? Schreib sie mit Artikel auf."),
    writeLine(55), empty(),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Der Bauernhof hat drei Kuehe."), dCell("F (vier Kuehe)")] }),
        new TableRow({ children: [dCell("Die Kuehe geben Milch."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Huehner legen jeden Tag Eier."), dCell("R")] }),
        new TableRow({ children: [dCell("Lena darf das braune Pferd streicheln."), dCell("F (das weisse)")] }),
        new TableRow({ children: [dCell("Der Hund heisst Mimi."), dCell("F (Rex)")] }),
        new TableRow({ children: [dCell("Lena mag den Bauernhof."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Es gibt zehn Huehner."),
    bullet("2. Die Haustiere heissen Rex (Hund) und Mimi (Katze)."),
    bullet("3. Sie gackern laut und legen Eier."),
    bullet("4. Mimi schlaeft lieber auf dem Sofa."),
    empty(),
    pBold("Aufgabe 3: Tiere im Text"),
    p("die Kuh, das Huhn, das Pferd, der Hund, die Katze"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Haustiere und Bauernhoftiere"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Hund  -  Katze  -  Kuh  -  Pferd  -  Huhn  -  Schaf  -  Bauernhof  -  bellt  -  miaut  -  gibt  -  legt  -  frisst  -  Haustier  -  streicheln")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Der __________________ __________________ laut."),
    p("2. Die __________________ __________________ Milch."),
    p("3. Das __________________ __________________ Eier."),
    p("4. Die __________________ __________________ leise."),
    p("5. Das Schaf __________________ Gras auf der Wiese."),
    p("6. Auf dem __________________ leben viele Tiere."),
    empty(),
    pBold("Teil 2: Welches Tier ist das? Ergaenze."),
    empty(),
    p("1. Es hat lange Ohren und frisst Moehren. Es ist __________________."),
    p("2. Es gibt Milch und lebt auf dem Bauernhof. Es ist __________________."),
    p("3. Es lebt oft im Haus beim Menschen. Es ist ein __________________."),
    p("4. Es laeuft schnell und man kann darauf reiten. Es ist __________________."),
    p("5. Es hat weisse Wolle und blaekt. Es ist __________________."),
    empty(),
    pBold("Teil 3: Schreib den richtigen Satz."),
    empty(),
    p("1. [die Katze / schlaeft / auf dem Sofa]"),
    writeLine(55), empty(),
    p("2. [der Hund / bellt / den Fremden / an]"),
    writeLine(55), empty(),
    p("3. [wir / das Pferd / duerfen / streicheln]"),
    writeLine(55), empty(),
    pBold("Aufgabe 4 (frei): Schreib einen Satz ueber dein Lieblingstier."),
    writeLine(55), empty(),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Hund ... bellt"),
    bullet("2. Kuh ... gibt"),
    bullet("3. Huhn ... legt"),
    bullet("4. Katze ... miaut"),
    bullet("5. frisst"),
    bullet("6. Bauernhof"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. der Hase"),
    bullet("2. die Kuh"),
    bullet("3. Haustier (Hund oder Katze)"),
    bullet("4. das Pferd"),
    bullet("5. das Schaf"),
    empty(),
    pBold("Teil 3:"),
    bullet("1. Die Katze schlaeft auf dem Sofa."),
    bullet("2. Der Hund bellt den Fremden an."),
    bullet("3. Wir duerfen das Pferd streicheln."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Haustiere und Bauernhoftiere"), empty(),
    makeTiereTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Umlaut-Plural: Kuh → Kuehe | Huhn → Huehner | Vogel → Voegel | Maus → Maeuse"),
    bullet("Haustier (das) = pet | Bauernhoftier (das) = farm animal | Bauernhof (der) = farm"),
    bullet("streicheln (jemanden) = to pet/stroke | fuettern = to feed"),
    bullet("Tierlaute als Verben: bellen / miauen / muhen / gackern / wiehern / blaeken"),
    bullet("Artikel lernen: der Hund/Hase/Vogel/Fisch | die Katze/Kuh/Maus/Ziege | das Schwein/Huhn/Pferd/Schaf"),
    empty(),
    pBold("Aufgabe: Lerne 6 Tiere mit Artikel auswendig. Schreib sie hier."),
    ...writeLines(6, 50),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    makeTiereTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Der Hund bellt. Die Katze miaut. Die Kuh muht. Das Huhn gackert."),
    bullet("Ich streichele die Katze. Er fuettert den Hund."),
    bullet("Auf dem Bauernhof leben Kuehe, Huehner und Schafe."),
    bullet("Wir haben zwei Haustiere: einen Hund und eine Katze."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Haustiere und Bauernhoftiere"), empty(),
    pBold("Dialog 1: Hast du ein Haustier?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Clara"), dCell("Hast du ein Haustier?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ja! Ich habe einen Hund. Er heisst Bello.")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Oh toll! Was fuer ein Hund ist das?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Er ist ein Labrador. Er ist gelb und sehr gross.")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Mag er Kinder?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ja, er spielt gern mit mir. Und du?")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Ich habe eine Katze. Sie heisst Luna und schlaeft immer.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Auf dem Bauernhof"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind"), dCell("Was fuer Tiere haben Sie auf dem Bauernhof?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Wir haben Kuehe, Huehner, Schafe und zwei Pferde.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Darf ich die Pferde streicheln?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Ja, aber langsam! Die Pferde sind scheu.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Was gibt die Kuh?")] }),
        new TableRow({ children: [dCell("Bauer"), dCell("Milch! Jeden Morgen. Moechtest du frische Milch?")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Tiere"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Hast du ein Haustier? Was fuer eins?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingstier?"), dCell("")] }),
        new TableRow({ children: [dCell("Warst du schon mal auf einem Bauernhof?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier moechtest du streicheln?"), dCell("")] }),
        new TableRow({ children: [dCell("Vor welchem Tier hast du Angst?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Welches Tier bin ich?"),
    bullet("Ein Kind denkt an ein Tier und macht den Tierlaut nach."),
    bullet("Die Gruppe raet: Ist das eine Kuh? Ein Hund?"),
    bullet("Wer richtig raet, darf als naechstes mitmachen."),
    bullet("Variante: Das Kind zeigt auch die Bewegung des Tieres."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Ich habe einen Hund. (einen = Akkusativ maskulin)"),
    bullet("Er heisst Bello. = sein Name ist Bello"),
    bullet("Was fuer ein Hund? = What kind of dog?"),
    bullet("Ich habe eine Katze. (eine = Akkusativ feminin)"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was fuer Tiere...? = What kind of animals?"),
    bullet("Darf ich...? = May I...? (hoefliche Bitte)"),
    bullet("Die Pferde sind scheu. = scheu = shy/timid"),
    bullet("Moechtest du...? = Wouldst you like...?"),
    empty(),
    pBold("Nuetzliche Ausdruecke:"),
    bullet("Ich habe einen/eine/ein ..."),
    bullet("Er/Sie heisst ... / Er/Sie ist ... Jahre alt."),
    bullet("Mein Lieblingstier ist ..."),
    bullet("Ich habe Angst vor + Dativ: Ich habe Angst vor der Maus."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Haustiere und Bauernhoftiere"), empty(),
    pBold("Aufgabe 1: Wo leben die Tiere? Ordne zu."),
    p("Hund / Katze / Kuh / Fisch / Pferd / Maus / Huhn / Schaf / Vogel / Ziege"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Im Haus", { width: 3000 }), hCell("Auf dem Bauernhof", { width: 3000 }), hCell("Beides moeglich", { width: 3500 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Bauernhof-Szene mit Tieren im Stall, auf der Wiese, im Haus]"),
    p("Schreib: Wo ist welches Tier?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Wo im Bild?", { width: 6500 })] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Zeichne oder beschreibe dein Lieblingstier."),
    p("[BILD 3: Leere Flaeche zum Zeichnen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Lieblingstier ist: __________________"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    pBold("Aufgabe 4: Klassen-Umfrage – Haustiere"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Name", { width: 2500 }), hCell("Haustier?", { width: 2500 }), hCell("Name des Tieres", { width: 2500 }), hCell("Tierlaut", { width: 2000 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Haustiere und Bauernhoftiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Im Haus", { width: 3000 }), hCell("Auf dem Bauernhof", { width: 3000 }), hCell("Beides moeglich", { width: 3500 })] }),
        new TableRow({ children: [dCell("Fisch, Vogel, Maus"), dCell("Kuh, Pferd, Huhn, Schaf, Ziege"), dCell("Hund, Katze, Hase")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: abhaengig vom Bild – Tiere beschriften und lokalisieren."),
    pItalic("Aufgabe 3: individuell – Zeichnung oder Beschreibung des Lieblingstieres."),
    pItalic("Aufgabe 4: Klassenergebnisse variieren. Beispiel: Leon hat einen Hund. Er heisst Rex. Der Hund bellt."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Haustiere und Bauernhoftiere");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
