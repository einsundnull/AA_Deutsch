"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "02_Artikel");
const TOPIC     = "A1_Kinder_GrammatikMinimum_02_Artikel";
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

// ── Artikel-Tabelle ───────────────────────────────────────────────────────────
function makeArtikelTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("der (maskulin)", { width: 3166 }), hCell("die (feminin)", { width: 3168 }), hCell("das (neutrum)", { width: 3166 })] }),
      new TableRow({ children: [dCell("der Vater"),    dCell("die Mutter"),    dCell("das Kind")] }),
      new TableRow({ children: [dCell("der Hund"),     dCell("die Katze"),     dCell("das Pferd")] }),
      new TableRow({ children: [dCell("der Apfel"),    dCell("die Banane"),    dCell("das Brot")] }),
      new TableRow({ children: [dCell("der Tisch"),    dCell("die Lampe"),     dCell("das Buch")] }),
      new TableRow({ children: [dCell("der Stuhl"),    dCell("die Tuer"),      dCell("das Fenster")] }),
      new TableRow({ children: [dCell("der Ball"),     dCell("die Schule"),    dCell("das Auto")] }),
      new TableRow({ children: [dCell("der Sommer"),   dCell("die Sonne"),     dCell("das Haus")] }),
      new TableRow({ children: [dCell("der Junge"),    dCell("die Frau"),      dCell("das Maedchen")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Artikel (der, die, das)"), empty(),
    pBold("Wichtig: Im Deutschen hat jedes Nomen einen Artikel!"),
    bullet("der = maskulin (z. B. der Mann)"),
    bullet("die = feminin (z. B. die Frau)"),
    bullet("das = neutrum (z. B. das Kind)"),
    empty(),
    h2("Lerne diese Beispiele:"),
    makeArtikelTable(),
    empty(),
    pBold("Aufgabe 1: Schreib den richtigen Artikel (der / die / das)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 }), hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Buch"),     dCell(""), dCell("Schule"),  dCell("")] }),
        new TableRow({ children: [dCell("Hund"),     dCell(""), dCell("Apfel"),   dCell("")] }),
        new TableRow({ children: [dCell("Katze"),    dCell(""), dCell("Auto"),    dCell("")] }),
        new TableRow({ children: [dCell("Mutter"),   dCell(""), dCell("Vater"),   dCell("")] }),
        new TableRow({ children: [dCell("Lampe"),    dCell(""), dCell("Fenster"), dCell("")] }),
        new TableRow({ children: [dCell("Stuhl"),    dCell(""), dCell("Tuer"),    dCell("")] }),
        new TableRow({ children: [dCell("Maedchen"), dCell(""), dCell("Junge"),   dCell("")] }),
        new TableRow({ children: [dCell("Brot"),     dCell(""), dCell("Banane"),  dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Sortiere die Nomen in die richtige Spalte."),
    p("Tisch / Sonne / Haus / Mann / Frau / Kind / Hund / Katze / Pferd"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("DER", { width: 3166 }), hCell("DIE", { width: 3168 }), hCell("DAS", { width: 3166 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze. Verwende Nomen mit Artikel."),
    p("Beispiel: Der Hund ist klein. Die Katze schlaeft."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Artikel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 }), hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Buch"),     dCell("das"), dCell("Schule"),  dCell("die")] }),
        new TableRow({ children: [dCell("Hund"),     dCell("der"), dCell("Apfel"),   dCell("der")] }),
        new TableRow({ children: [dCell("Katze"),    dCell("die"), dCell("Auto"),    dCell("das")] }),
        new TableRow({ children: [dCell("Mutter"),   dCell("die"), dCell("Vater"),   dCell("der")] }),
        new TableRow({ children: [dCell("Lampe"),    dCell("die"), dCell("Fenster"), dCell("das")] }),
        new TableRow({ children: [dCell("Stuhl"),    dCell("der"), dCell("Tuer"),    dCell("die")] }),
        new TableRow({ children: [dCell("Maedchen"), dCell("das"), dCell("Junge"),   dCell("der")] }),
        new TableRow({ children: [dCell("Brot"),     dCell("das"), dCell("Banane"),  dCell("die")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Sortierung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("DER", { width: 3166 }), hCell("DIE", { width: 3168 }), hCell("DAS", { width: 3166 })] }),
        new TableRow({ children: [dCell("Tisch, Mann, Hund"), dCell("Sonne, Frau, Katze"), dCell("Haus, Kind, Pferd")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Der Hund spielt im Garten. Die Katze schlaeft auf dem Sofa. Das Kind liest ein Buch. Die Mutter kocht das Essen."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Artikel (der, die, das)"), empty(),
    pBold("Lies den Text. Achte auf die Artikel!"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Das ist mein Zimmer. Es ist klein, aber gemuetlich."),
          p("In der Mitte steht der Tisch. Darauf liegt ein Buch."),
          p("Neben dem Tisch ist der Stuhl. Auf dem Stuhl sitzt die Katze."),
          p("Die Katze heisst Mimi. Sie schlaeft den ganzen Tag."),
          p("An der Wand haengt das Bild von meiner Familie."),
          p("Vor dem Fenster steht die Lampe. Sie ist gelb."),
          p("Im Schrank liegen die Buecher. Ich lese gern."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Welcher Artikel? Schreib (der / die / das)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nomen aus dem Text", { width: 6500 }), hCell("Artikel", { width: 3000 })] }),
        new TableRow({ children: [dCell("____ Zimmer"),    dCell("")] }),
        new TableRow({ children: [dCell("____ Tisch"),     dCell("")] }),
        new TableRow({ children: [dCell("____ Stuhl"),     dCell("")] }),
        new TableRow({ children: [dCell("____ Katze"),     dCell("")] }),
        new TableRow({ children: [dCell("____ Bild"),      dCell("")] }),
        new TableRow({ children: [dCell("____ Fenster"),   dCell("")] }),
        new TableRow({ children: [dCell("____ Lampe"),     dCell("")] }),
        new TableRow({ children: [dCell("____ Schrank"),   dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wo steht der Tisch?"),
    writeLine(55), empty(),
    p("2. Wer sitzt auf dem Stuhl?"),
    writeLine(55), empty(),
    p("3. Wie heisst die Katze?"),
    writeLine(55), empty(),
    p("4. Welche Farbe hat die Lampe?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib 3 DER-Nomen, 3 DIE-Nomen und 3 DAS-Nomen aus dem Text."),
    p("DER:"), writeLine(55), empty(),
    p("DIE:"), writeLine(55), empty(),
    p("DAS:"), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Artikel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nomen", { width: 6500 }), hCell("Artikel", { width: 3000 })] }),
        new TableRow({ children: [dCell("Zimmer"),    dCell("das")] }),
        new TableRow({ children: [dCell("Tisch"),     dCell("der")] }),
        new TableRow({ children: [dCell("Stuhl"),     dCell("der")] }),
        new TableRow({ children: [dCell("Katze"),     dCell("die")] }),
        new TableRow({ children: [dCell("Bild"),      dCell("das")] }),
        new TableRow({ children: [dCell("Fenster"),   dCell("das")] }),
        new TableRow({ children: [dCell("Lampe"),     dCell("die")] }),
        new TableRow({ children: [dCell("Schrank"),   dCell("der")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Der Tisch steht in der Mitte."),
    bullet("2. Die Katze sitzt auf dem Stuhl."),
    bullet("3. Die Katze heisst Mimi."),
    bullet("4. Die Lampe ist gelb."),
    empty(),
    pBold("Aufgabe 3: Beispielloesung"),
    bullet("DER: der Tisch, der Stuhl, der Schrank"),
    bullet("DIE: die Katze, die Lampe, die Wand"),
    bullet("DAS: das Zimmer, das Buch, das Bild, das Fenster"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Artikel"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("der  -  die  -  das  (jedes mehrmals verwenden!)")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Familie"),
    empty(),
    p("1. __________ Vater heisst Tom."),
    p("2. __________ Mutter ist Lehrerin."),
    p("3. __________ Kind ist 8 Jahre alt."),
    p("4. __________ Bruder spielt Fussball."),
    p("5. __________ Schwester liest ein Buch."),
    empty(),
    pBold("Teil 2: Schule"),
    empty(),
    p("1. __________ Lehrer ist sehr nett."),
    p("2. __________ Tafel ist gross."),
    p("3. __________ Buch liegt auf dem Tisch."),
    p("4. __________ Stift ist neu."),
    p("5. __________ Klasse ist laut."),
    empty(),
    pBold("Teil 3: Im Garten"),
    empty(),
    p("1. __________ Hund laeuft im Garten."),
    p("2. __________ Katze sitzt auf dem Baum."),
    p("3. __________ Pferd ist sehr gross."),
    p("4. __________ Sonne scheint hell."),
    p("5. __________ Wetter ist heute schoen."),
    empty(),
    pBold("Teil 4: Mein Tag"),
    empty(),
    p("Heute ist __________ Sonne hell. Ich gehe in __________ Schule."),
    p("__________ Lehrer fragt: 'Wo ist __________ Buch?'"),
    p("Ich antworte: '__________ Buch liegt zu Hause auf __________ Tisch.'"),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Artikel (LOESUNG)"), empty(),
    pBold("Teil 1: Familie"),
    bullet("1. Der Vater"), bullet("2. Die Mutter"), bullet("3. Das Kind"),
    bullet("4. Der Bruder"), bullet("5. Die Schwester"),
    empty(),
    pBold("Teil 2: Schule"),
    bullet("1. Der Lehrer"), bullet("2. Die Tafel"), bullet("3. Das Buch"),
    bullet("4. Der Stift"), bullet("5. Die Klasse"),
    empty(),
    pBold("Teil 3: Im Garten"),
    bullet("1. Der Hund"), bullet("2. Die Katze"), bullet("3. Das Pferd"),
    bullet("4. Die Sonne"), bullet("5. Das Wetter"),
    empty(),
    pBold("Teil 4: Mein Tag"),
    p("Heute ist DIE Sonne hell. Ich gehe in DIE Schule."),
    p("DER Lehrer fragt: 'Wo ist DAS Buch?'"),
    p("Ich antworte: 'DAS Buch liegt zu Hause auf DEM Tisch.'"),
    pItalic("Hinweis: 'auf dem Tisch' = der Tisch im Dativ → DEM. (Vorbereitung Praeposition!)"),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Artikel (der, die, das)"), empty(),
    pBold("Die wichtigste Regel:"),
    bullet("der = MASKULIN (Maenner, Tage, Monate, viele Tiere)"),
    bullet("die = FEMININ (Frauen, viele Pflanzen, Endung -ung/-heit/-keit)"),
    bullet("das = NEUTRUM (Kinder, Verkleinerungsformen -chen/-lein, viele Materialien)"),
    empty(),
    makeArtikelTable(),
    empty(),
    h2("Hilfreiche Faustregeln"),
    pBold("DER (maskulin) — typisch fuer:"),
    bullet("Maennliche Personen: der Vater, der Onkel, der Junge, der Mann"),
    bullet("Tage und Monate: der Montag, der Januar"),
    bullet("Jahreszeiten: der Sommer, der Winter"),
    bullet("Wetter: der Regen, der Schnee, der Wind"),
    empty(),
    pBold("DIE (feminin) — typisch fuer:"),
    bullet("Weibliche Personen: die Mutter, die Tante, die Frau, die Lehrerin"),
    bullet("Endung -ung: die Wohnung, die Zeitung"),
    bullet("Endung -heit / -keit: die Gesundheit, die Freundlichkeit"),
    bullet("Viele Pflanzen und Blumen: die Rose, die Tulpe"),
    empty(),
    pBold("DAS (neutrum) — typisch fuer:"),
    bullet("Kinder und Jungtiere: das Kind, das Baby, das Kalb"),
    bullet("Verkleinerung -chen / -lein: das Maedchen, das Brueterchen"),
    bullet("Verben als Nomen: das Schwimmen, das Lesen"),
    empty(),
    pBold("Aufgabe: Schreib zu jedem Artikel 3 Beispiele aus deinem Alltag."),
    p("DER:"), writeLine(55), writeLine(55), writeLine(55), empty(),
    p("DIE:"), writeLine(55), writeLine(55), writeLine(55), empty(),
    p("DAS:"), writeLine(55), writeLine(55), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Artikel (LOESUNG)"), empty(),
    makeArtikelTable(),
    empty(),
    pBold("Wichtige Regeln zusammengefasst:"),
    bullet("Jedes deutsche Nomen hat einen Artikel — IMMER mitlernen!"),
    bullet("Bei Plural: alle Nomen werden zu DIE (die Maenner, die Frauen, die Kinder)"),
    bullet("Verkleinerung -chen ist immer DAS: das Maedchen (auch wenn es weiblich ist!)"),
    empty(),
    pBold("Beispiele zur Aufgabe:"),
    bullet("DER: der Lehrer, der Hund, der Sommer"),
    bullet("DIE: die Mutter, die Banane, die Schule"),
    bullet("DAS: das Buch, das Auto, das Maedchen"),
    empty(),
    pBold("Eselsbruecke fuer Anfaenger:"),
    pItalic("Beim Lernen neuer Nomen IMMER den Artikel mitsprechen: nicht 'Hund' sondern 'der Hund', nicht 'Tasche' sondern 'die Tasche'."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Artikel"), empty(),
    pBold("Dialog 1: Was ist das?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Was ist das?")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Das ist ein Buch.")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Richtig! Welcher Artikel?")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Das Buch — es ist neutrum.")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Sehr gut! Und das hier?")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Das ist eine Tasche. Die Tasche ist feminin.")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Perfekt! Du lernst sehr schnell.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: In der Klasse"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Tom"),  dCell("Wo ist mein Buch?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Das Buch liegt auf dem Tisch!")] }),
        new TableRow({ children: [dCell("Tom"),  dCell("Und wo ist der Stift?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Der Stift ist in der Tasche.")] }),
        new TableRow({ children: [dCell("Tom"),  dCell("Danke! Hast du auch die Hausaufgaben?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Ja, die Hausaufgaben sind in meiner Mappe.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Was ist das?"),
    p("Schau dich im Klassenzimmer um. Frag deinen Partner: 'Was ist das?' und antworte mit Artikel."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort mit Artikel", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist das? (zeige auf 1)"), dCell("Das ist _______")] }),
        new TableRow({ children: [dCell("Was ist das? (zeige auf 2)"), dCell("Das ist _______")] }),
        new TableRow({ children: [dCell("Was ist das? (zeige auf 3)"), dCell("Das ist _______")] }),
        new TableRow({ children: [dCell("Was ist das? (zeige auf 4)"), dCell("Das ist _______")] }),
        new TableRow({ children: [dCell("Was ist das? (zeige auf 5)"), dCell("Das ist _______")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Artikel-Wettkampf"),
    bullet("Lehrkraft sagt ein Nomen ohne Artikel: 'Apfel!'"),
    bullet("Wer zuerst 'der Apfel!' ruft, bekommt einen Punkt."),
    bullet("Wer am Ende die meisten Punkte hat, gewinnt."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Artikel (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Was ist das? — Standardfrage zur Identifikation"),
    bullet("Das ist ein/eine ... — unbestimmter Artikel (Vorstellung)"),
    bullet("Welcher Artikel? — Frage nach dem Genus"),
    bullet("Antwort: Das Buch — bestimmter Artikel mit Nomen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wo ist mein Buch? — Possessivpronomen mein vor neutrum"),
    bullet("Der Stift ist in der Tasche — Praeposition + Dativ (in DER Tasche)"),
    bullet("Hast du die Hausaufgaben? — Plural: alle Artikel werden DIE"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekter Artikel zum Nomen (1P)"),
    bullet("Vollstaendiger Satz: 'Das ist ein/das ...' (1P)"),
    bullet("Korrekte Aussprache der Artikel"),
    empty(),
    pBold("Beispielantworten:"),
    bullet("Das ist der Tisch. / Das ist die Tafel."),
    bullet("Das ist das Fenster. / Das ist der Stuhl."),
    bullet("Das ist die Lampe. / Das ist das Buch."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Artikel"), empty(),
    pBold("Aufgabe 1: [BILD 1: 9 verschiedene Gegenstaende — Buch, Hund, Auto, Tasche, Apfel, Kind, Sonne, Stuhl, Maedchen]"),
    p("Schreib unter jedes Bild den richtigen Artikel und das Wort."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD: Buch]", { width: 3166 }), hCell("[BILD: Hund]", { width: 3168 }), hCell("[BILD: Auto]", { width: 3166 })] }),
        new TableRow({ children: [dCell("____ Buch"), dCell("____ Hund"), dCell("____ Auto")] }),
        new TableRow({ children: [hCell("[BILD: Tasche]", { width: 3166 }), hCell("[BILD: Apfel]", { width: 3168 }), hCell("[BILD: Kind]", { width: 3166 })] }),
        new TableRow({ children: [dCell("____ Tasche"), dCell("____ Apfel"), dCell("____ Kind")] }),
        new TableRow({ children: [hCell("[BILD: Sonne]", { width: 3166 }), hCell("[BILD: Stuhl]", { width: 3168 }), hCell("[BILD: Maedchen]", { width: 3166 })] }),
        new TableRow({ children: [dCell("____ Sonne"), dCell("____ Stuhl"), dCell("____ Maedchen")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Klassenzimmer mit vielen Sachen]"),
    p("Schreib 5 Saetze. Verwende verschiedene Artikel."),
    p("Beispiel: Der Tisch ist gross. Die Tafel ist schwarz."),
    empty(),
    ...writeLines(5, 55),
    empty(),
    pBold("Aufgabe 3: Sortier-Spiel"),
    p("Schau das Bild an. Sortiere die Sachen in der Tabelle."),
    p("[BILD 3: Verschiedene Gegenstaende und Personen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("DER", { width: 3166 }), hCell("DIE", { width: 3168 }), hCell("DAS", { width: 3166 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Male 3 Sachen aus deinem Zimmer und schreib den Artikel dazu."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          p("Sache 1: ____________________"),
          empty(), empty(),
          p("Sache 2: ____________________"),
          empty(), empty(),
          p("Sache 3: ____________________"),
        ],
      })] })],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Artikel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel zu Bildern"),
    bullet("das Buch / der Hund / das Auto"),
    bullet("die Tasche / der Apfel / das Kind"),
    bullet("die Sonne / der Stuhl / das Maedchen"),
    empty(),
    pBold("Aufgabe 2: Musterantworten Klassenzimmer"),
    bullet("Der Tisch ist gross. Die Tafel ist schwarz."),
    bullet("Das Fenster ist offen. Der Stuhl ist klein."),
    bullet("Die Lehrerin ist nett. Das Buch liegt auf dem Tisch."),
    bullet("Die Tasche ist rot. Der Stift ist gelb."),
    empty(),
    pBold("Aufgabe 3: Beispiel-Sortierung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("DER", { width: 3166 }), hCell("DIE", { width: 3168 }), hCell("DAS", { width: 3166 })] }),
        new TableRow({ children: [dCell("Tisch"), dCell("Tafel"), dCell("Buch")] }),
        new TableRow({ children: [dCell("Stuhl"), dCell("Lampe"), dCell("Fenster")] }),
        new TableRow({ children: [dCell("Hund"), dCell("Katze"), dCell("Pferd")] }),
        new TableRow({ children: [dCell("Apfel"), dCell("Banane"), dCell("Brot")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort"),
    pItalic("Beispiel: das Bett, der Schreibtisch, die Lampe"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Artikel");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
