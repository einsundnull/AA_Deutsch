"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "11_WetterJahreszeiten", "03_Monate");
const TOPIC     = "A1_Kinder_WetterJahreszeiten_03_Monate";
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

// ── Monate-Tabelle ────────────────────────────────────────────────────────────
function makeMonateTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Nr", { width: 800 }), hCell("Monat", { width: 2000 }), hCell("Jahreszeit", { width: 2200 }), hCell("Beispielsatz", { width: 4500 })] }),
      new TableRow({ children: [dCell("1"), dCell("Januar"), dCell("Winter"), dCell("Im Januar ist es sehr kalt.")] }),
      new TableRow({ children: [dCell("2"), dCell("Februar"), dCell("Winter"), dCell("Im Februar feiern wir Fasching.")] }),
      new TableRow({ children: [dCell("3"), dCell("Maerz"), dCell("Fruehling"), dCell("Im Maerz beginnt der Fruehling.")] }),
      new TableRow({ children: [dCell("4"), dCell("April"), dCell("Fruehling"), dCell("Im April regnet es oft.")] }),
      new TableRow({ children: [dCell("5"), dCell("Mai"), dCell("Fruehling"), dCell("Im Mai bluehen viele Blumen.")] }),
      new TableRow({ children: [dCell("6"), dCell("Juni"), dCell("Sommer"), dCell("Im Juni beginnt der Sommer.")] }),
      new TableRow({ children: [dCell("7"), dCell("Juli"), dCell("Sommer"), dCell("Im Juli haben wir Ferien.")] }),
      new TableRow({ children: [dCell("8"), dCell("August"), dCell("Sommer"), dCell("Im August fahren wir ans Meer.")] }),
      new TableRow({ children: [dCell("9"), dCell("September"), dCell("Herbst"), dCell("Im September beginnt die Schule.")] }),
      new TableRow({ children: [dCell("10"), dCell("Oktober"), dCell("Herbst"), dCell("Im Oktober werden die Blaetter bunt.")] }),
      new TableRow({ children: [dCell("11"), dCell("November"), dCell("Herbst"), dCell("Im November ist es oft neblig.")] }),
      new TableRow({ children: [dCell("12"), dCell("Dezember"), dCell("Winter"), dCell("Im Dezember feiern wir Weihnachten.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Die Monate"), empty(),
    pBold("Aufgabe 1: Schreib die Monate in der richtigen Reihenfolge."),
    p("Januar / Februar / Maerz / April / Mai / Juni / Juli / August / September / Oktober / November / Dezember"),
    empty(),
    p("1. ____________________   2. ____________________   3. ____________________"),
    empty(),
    p("4. ____________________   5. ____________________   6. ____________________"),
    empty(),
    p("7. ____________________   8. ____________________   9. ____________________"),
    empty(),
    p("10. ____________________  11. ____________________  12. ____________________"),
    empty(), empty(),
    pBold("Aufgabe 2: Welcher Monat kommt davor und danach?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("davor", { width: 3166 }), hCell("Monat", { width: 3168 }), hCell("danach", { width: 3166 })] }),
        new TableRow({ children: [dCell(""), dCell("April"), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("Juli"), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("Oktober"), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("Februar"), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("September"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib zu jedem Monat einen Satz."),
    p("Mein Geburtstag ist im __________________."),
    writeLine(55), empty(),
    p("Im Sommer mag ich besonders den Monat __________________, weil ..."),
    writeLine(55), empty(),
    p("Im Winter ist mein Lieblingsmonat __________________, weil ..."),
    writeLine(55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Die Monate (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Reihenfolge"),
    bullet("1. Januar  2. Februar  3. Maerz"),
    bullet("4. April   5. Mai      6. Juni"),
    bullet("7. Juli    8. August   9. September"),
    bullet("10. Oktober  11. November  12. Dezember"),
    empty(),
    pBold("Aufgabe 2: davor / danach"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("davor", { width: 3166 }), hCell("Monat", { width: 3168 }), hCell("danach", { width: 3166 })] }),
        new TableRow({ children: [dCell("Maerz"), dCell("April"), dCell("Mai")] }),
        new TableRow({ children: [dCell("Juni"), dCell("Juli"), dCell("August")] }),
        new TableRow({ children: [dCell("September"), dCell("Oktober"), dCell("November")] }),
        new TableRow({ children: [dCell("Januar"), dCell("Februar"), dCell("Maerz")] }),
        new TableRow({ children: [dCell("August"), dCell("September"), dCell("Oktober")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten — alle Monate akzeptieren."),
    pItalic("Muster: Mein Geburtstag ist im Mai. / Im Sommer mag ich Juli, weil wir Ferien haben."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Die Monate"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich bin Mara. Ich erzaehle dir von meinem Jahr."),
          p("Im Januar feiere ich Neujahr mit meiner Familie. Es ist sehr kalt."),
          p("Im Maerz beginnt der Fruehling. Die ersten Blumen kommen."),
          p("Im Mai habe ich Geburtstag. Ich werde 9 Jahre alt."),
          p("Im Juli beginnen die Sommerferien. Wir fahren nach Italien."),
          p("Im September gehe ich wieder in die Schule. Ich bin in Klasse 4."),
          p("Im Oktober werden die Blaetter bunt. Ich gehe gern im Wald spazieren."),
          p("Im Dezember ist Weihnachten. Ich bekomme viele Geschenke."),
          p("Mein Lieblingsmonat ist der Juli. Was ist dein Lieblingsmonat?"),
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
        new TableRow({ children: [dCell("Mara feiert Neujahr im Februar."), dCell("")] }),
        new TableRow({ children: [dCell("Im Mai hat Mara Geburtstag."), dCell("")] }),
        new TableRow({ children: [dCell("Im Juli faehrt Mara nach Italien."), dCell("")] }),
        new TableRow({ children: [dCell("Im September ist Weihnachten."), dCell("")] }),
        new TableRow({ children: [dCell("Maras Lieblingsmonat ist der Juli."), dCell("")] }),
        new TableRow({ children: [dCell("Mara wird 10 Jahre alt."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wann hat Mara Geburtstag?"),
    writeLine(55), empty(),
    p("2. Was passiert im September?"),
    writeLine(55), empty(),
    p("3. Was macht Mara im Oktober gern?"),
    writeLine(55), empty(),
    p("4. Wie viele Geschenke bekommt Mara im Dezember?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib die Monate aus dem Text in der richtigen Reihenfolge."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Die Monate (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Mara feiert Neujahr im Februar."), dCell("F (im Januar)")] }),
        new TableRow({ children: [dCell("Im Mai hat Mara Geburtstag."), dCell("R")] }),
        new TableRow({ children: [dCell("Im Juli faehrt Mara nach Italien."), dCell("R")] }),
        new TableRow({ children: [dCell("Im September ist Weihnachten."), dCell("F (im Dezember)")] }),
        new TableRow({ children: [dCell("Maras Lieblingsmonat ist der Juli."), dCell("R")] }),
        new TableRow({ children: [dCell("Mara wird 10 Jahre alt."), dCell("F (9 Jahre alt)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie hat im Mai Geburtstag."),
    bullet("2. Sie geht wieder in die Schule (Klasse 4)."),
    bullet("3. Sie geht gern im Wald spazieren."),
    bullet("4. Sie bekommt viele Geschenke (genaue Zahl steht nicht im Text)."),
    empty(),
    pBold("Aufgabe 3: Monate im Text in Reihenfolge"),
    p("Januar, Maerz, Mai, Juli, September, Oktober, Dezember"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Die Monate"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Januar  -  Februar  -  Maerz  -  April  -  Mai  -  Juni  -  Juli  -  August  -  September  -  Oktober  -  November  -  Dezember  -  zwoelf  -  Monate  -  Jahr  -  im")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Welcher Monat fehlt?"),
    empty(),
    p("1. Januar - __________________ - Maerz"),
    p("2. April - Mai - __________________"),
    p("3. __________________ - Juli - August"),
    p("4. September - __________________ - November"),
    p("5. November - __________________ - Januar"),
    empty(),
    pBold("Teil 2: Ergaenze."),
    empty(),
    p("1. Ein Jahr hat __________________ Monate."),
    p("2. Die ersten drei __________________ heissen: Januar, Februar, Maerz."),
    p("3. __________________ Dezember feiern wir Weihnachten."),
    p("4. __________________ Mai ist es schon warm."),
    p("5. Der erste Monat im Jahr ist der __________________."),
    p("6. Der letzte Monat im Jahr ist der __________________."),
    empty(),
    pBold("Teil 3: Dialog – Wann hast du Geburtstag?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Sara"), dCell("Wann hast du Geburtstag?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Mein Geburtstag ist __________________ Juli.")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Oh, dann hast du in den Sommer__________________!")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ja! Und du? Wann ist dein Geburtstag?")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Ich habe im __________________ Geburtstag. Da ist es kalt!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Die Monate (LOESUNG)"), empty(),
    pBold("Teil 1: Fehlende Monate"),
    bullet("1. Februar"), bullet("2. Juni"), bullet("3. Juni"),
    bullet("4. Oktober"), bullet("5. Dezember"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. zwoelf"), bullet("2. Monate"), bullet("3. Im"),
    bullet("4. Im"), bullet("5. Januar"), bullet("6. Dezember"),
    empty(),
    pBold("Teil 3: Musterloesung"),
    bullet("Tim: Mein Geburtstag ist im Juli."),
    bullet("Sara: Oh, dann hast du in den Sommerferien!"),
    bullet("Sara: Ich habe im Januar / Dezember Geburtstag (oder anderer Wintermonat)."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Die Monate"), empty(),
    makeMonateTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Alle Monate sind MASKULIN: der Januar, der Februar, der Maerz ..."),
    bullet("Im + Monat (Dativ): im Januar, im Februar, im Maerz ..."),
    bullet("Frage: Wann ist ...? - Antwort: Im + Monat."),
    bullet("Mein Geburtstag ist im Mai. = My birthday is in May."),
    bullet("Ein Jahr hat 12 Monate. Ein Monat hat 28-31 Tage."),
    empty(),
    h2("Eselsbruecken zum Lernen"),
    bullet("Januar bis Maerz = Winter / Fruehling Anfang"),
    bullet("April bis Juni = Fruehling"),
    bullet("Juli bis September = Sommer / Herbst Anfang"),
    bullet("Oktober bis Dezember = Herbst / Winter Anfang"),
    bullet("Merksatz: 'Dreissig Tage hat September, April, Juni und November...'"),
    empty(),
    pBold("Aufgabe: Schreib alle 12 Monate auf und markiere deinen Geburtstagsmonat."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Die Monate (LOESUNG)"), empty(),
    makeMonateTable(),
    empty(),
    pBold("Wichtigste Strukturen:"),
    bullet("der + Monat (alle Monate sind maskulin)"),
    bullet("im + Monat (im = in + dem Dativ): im Januar / im Februar ..."),
    bullet("Wann hast du Geburtstag? - Im Mai. / Mein Geburtstag ist im Mai."),
    bullet("Was machst du im Sommer? - Im Juli fahre ich ans Meer."),
    empty(),
    pBold("Loesung Aufgabe (Reihenfolge):"),
    p("Januar, Februar, Maerz, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember"),
    pItalic("Geburtstagsmonat individuell markieren."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Die Monate"), empty(),
    pBold("Dialog 1: Geburtstag"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Wann hast du Geburtstag, Leon?")] }),
        new TableRow({ children: [dCell("Leon"), dCell("Mein Geburtstag ist am 15. Mai. Und du?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich habe am 3. November Geburtstag.")] }),
        new TableRow({ children: [dCell("Leon"), dCell("Oh, dann ist dein Geburtstag im Herbst!")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ja! Es ist meistens kalt und es regnet oft.")] }),
        new TableRow({ children: [dCell("Leon"), dCell("Im Mai ist es viel schoener — die Sonne scheint!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ferienplaene"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Vater"), dCell("Wann fahren wir in die Ferien?")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Im August. Da haben die Kinder Ferien.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Toll! Aber im Juni haben wir auch frei!")] }),
        new TableRow({ children: [dCell("Vater"), dCell("Ja, aber Mama arbeitet im Juni noch.")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Im Juli kann ich Urlaub nehmen.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Super! Dann fahren wir im Juli weg!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Monate und Aktivitaeten"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wann hast du Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("In welchem Monat sind die Sommerferien?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsmonat?"), dCell("")] }),
        new TableRow({ children: [dCell("In welchem Monat schneit es bei dir?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du im Dezember?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Monats-Kette"),
    bullet("Ein Kind sagt einen Monat: 'Januar.'"),
    bullet("Das naechste Kind sagt den naechsten Monat: 'Februar.'"),
    bullet("Wer einen Fehler macht, faengt von vorne an!"),
    bullet("Schwerere Variante: rueckwaerts!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Die Monate (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wann hast du Geburtstag? = Standardfrage nach dem Geburtsdatum"),
    bullet("Mein Geburtstag ist am 15. Mai. = am + Datum (am + Akkusativ)"),
    bullet("Ich habe am 3. November Geburtstag. = Alternative Konstruktion"),
    bullet("dann ist dein Geburtstag im + Jahreszeit/Monat"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wann fahren wir ...? = Wann + Verb (Frage nach Zeitpunkt)"),
    bullet("Im + Monat = Standard-Antwort fuer Zeitangabe"),
    bullet("Urlaub nehmen = to take vacation"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Verwendung von im + Monat"),
    bullet("Bei Datumsangabe: am + Tag + Monat (am 15. Mai)"),
    bullet("Aktivitaeten passend zur Jahreszeit/Monat nennen"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Die Monate"), empty(),
    pBold("Aufgabe 1: [BILD 1: Kalender mit 12 Feldern - eines fuer jeden Monat]"),
    p("Schreib unter jedes Kalenderfeld den richtigen Monatsnamen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 2350 }), hCell("[Bild 2]", { width: 2350 }), hCell("[Bild 3]", { width: 2350 }), hCell("[Bild 4]", { width: 2350 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
        new TableRow({ children: [hCell("[Bild 5]", { width: 2350 }), hCell("[Bild 6]", { width: 2350 }), hCell("[Bild 7]", { width: 2350 }), hCell("[Bild 8]", { width: 2350 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
        new TableRow({ children: [hCell("[Bild 9]", { width: 2350 }), hCell("[Bild 10]", { width: 2350 }), hCell("[Bild 11]", { width: 2350 }), hCell("[Bild 12]", { width: 2350 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: In welchem Monat passiert das? Schreib den Monat."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild / Situation", { width: 6500 }), hCell("Monat", { width: 3000 })] }),
        new TableRow({ children: [dCell("[BILD: Weihnachtsbaum mit Geschenken]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Neujahrsfeuerwerk]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Kind mit Schultuete - erster Schultag]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Bunte Herbstblaetter]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Kinder am Strand bei heissem Wetter]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Erste Bluemchen im Garten]"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Mein Lieblingsmonat"),
    p("[BILD 3: Leere Flaeche zum Zeichnen]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Lieblingsmonat:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Mein Lieblingsmonat ist der __________________."),
    p("In diesem Monat: __________________"),
    writeLine(55), empty(),
    pBold("Aufgabe 4: Schreib 4 Saetze ueber dein Jahr."),
    p("Im Januar ... / Im April ... / Im Juli ... / Im Oktober ..."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Die Monate (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Loesung haengt vom Lehrer-Kalender ab"),
    pItalic("Standardloesung 1-12: Januar, Februar, Maerz, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember"),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild / Situation", { width: 6500 }), hCell("Monat", { width: 3000 })] }),
        new TableRow({ children: [dCell("Weihnachtsbaum mit Geschenken"), dCell("Dezember")] }),
        new TableRow({ children: [dCell("Neujahrsfeuerwerk"), dCell("Januar (oder Dezember Silvester)")] }),
        new TableRow({ children: [dCell("Kind mit Schultuete - erster Schultag"), dCell("September (oder August)")] }),
        new TableRow({ children: [dCell("Bunte Herbstblaetter"), dCell("Oktober")] }),
        new TableRow({ children: [dCell("Kinder am Strand bei heissem Wetter"), dCell("Juli oder August")] }),
        new TableRow({ children: [dCell("Erste Bluemchen im Garten"), dCell("Maerz oder April")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3 + 4: individuelle Antworten"),
    pItalic("Muster: Mein Lieblingsmonat ist der Juli. In diesem Monat haben wir Sommerferien und ich fahre ans Meer."),
    pItalic("Muster Aufgabe 4: Im Januar ist es kalt und es schneit. Im April regnet es oft. Im Juli habe ich Sommerferien. Im Oktober gehe ich im Wald spazieren."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Monate");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
