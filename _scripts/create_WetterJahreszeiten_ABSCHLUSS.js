"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "11_WetterJahreszeiten", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_WetterJahreszeiten";
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
    h1("Abschlusstest – Wetter, Jahreszeiten & Monate"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 48"),
    empty(),

    h2("Aufgabe 1: Wetter-Wortschatz (8 Punkte)"),
    pBold("Schreib das richtige Adjektiv: sonnig / regnerisch / windig / bewoelkt / kalt / warm / heiss / verschneit"),
    empty(),
    p("1. Die Sonne scheint hell. Es ist __________________."),
    p("2. Es regnet den ganzen Tag. Es ist __________________."),
    p("3. Im Sommer in Italien sind es 35 Grad. Es ist sehr __________________."),
    p("4. Der Wind blaest stark. Es ist __________________."),
    p("5. Im Januar liegt Schnee. Es ist __________________."),
    p("6. Viele Wolken am Himmel. Es ist __________________."),
    p("7. Es schneit und es ist sehr __________________."),
    p("8. Im Mai sind es 22 Grad. Es ist __________________."),
    empty(),

    h2("Aufgabe 2: Lesetext (10 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo, ich bin Anna! Ich erzaehle dir von meinem Lieblingsjahr."),
          p("Im Januar feiere ich Neujahr und es ist sehr kalt. Manchmal schneit es."),
          p("Im Maerz beginnt der Fruehling. Die ersten Blumen bluehen und die Voegel singen."),
          p("Im Juli haben wir Sommerferien. Wir fahren ans Meer und ich schwimme jeden Tag."),
          p("Im Oktober gehe ich gern im Wald spazieren. Die Blaetter sind rot, gelb und orange."),
          p("Im Dezember ist Weihnachten und es schneit oft."),
          p("Mein Lieblingsmonat ist der Juli, weil ich die Sonne und das Meer liebe!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Beantworte die Fragen:"),
    p("1. Wann feiert Anna Neujahr und wie ist das Wetter?"),
    writeLine(55), empty(),
    p("2. Was passiert im Maerz?"),
    writeLine(55), empty(),
    p("3. Was macht Anna im Juli?"),
    writeLine(55), empty(),
    p("4. Welche Farben haben die Blaetter im Oktober?"),
    writeLine(55), empty(),
    p("5. Welcher ist Annas Lieblingsmonat und warum?"),
    writeLine(55), empty(),

    h2("Aufgabe 3: Jahreszeiten zuordnen (8 Punkte)"),
    pBold("Schreib zu jedem Monat die richtige Jahreszeit."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Monat", { width: 4750 }), hCell("Jahreszeit", { width: 4750 })] }),
        new TableRow({ children: [dCell("Januar"), dCell("")] }),
        new TableRow({ children: [dCell("April"), dCell("")] }),
        new TableRow({ children: [dCell("Juli"), dCell("")] }),
        new TableRow({ children: [dCell("September"), dCell("")] }),
        new TableRow({ children: [dCell("Oktober"), dCell("")] }),
        new TableRow({ children: [dCell("Dezember"), dCell("")] }),
        new TableRow({ children: [dCell("Mai"), dCell("")] }),
        new TableRow({ children: [dCell("August"), dCell("")] }),
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
        children: [p("Schnee  -  Sonne  -  Blumen  -  Blaetter  -  Fruehling  -  Sommer  -  Herbst  -  Winter  -  Im  -  am")],
      })]})],
    }),
    empty(),
    p("1. __________________ Winter faellt __________________ vom Himmel."),
    p("2. Im Sommer scheint die __________________ und es ist heiss."),
    p("3. Im __________________ bluehen die ersten __________________."),
    p("4. Im __________________ werden die __________________ bunt."),
    p("5. Mein Geburtstag ist __________________ 15. Mai."),
    empty(),

    h2("Aufgabe 5: Schreib ueber dich (8 Punkte)"),
    pBold("Schreib 5-6 Saetze: Wann hast du Geburtstag? Was ist dein Lieblingswetter? Was machst du in deiner Lieblingsjahreszeit?"),
    empty(),
    ...writeLines(6, 55),

    h2("Aufgabe 6: Konversation (6 Punkte)"),
    pBold("Frag deine/n Partner/in und schreib die Antworten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie ist das Wetter heute?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist deine Lieblingsjahreszeit?"), dCell("")] }),
        new TableRow({ children: [dCell("Wann hast du Geburtstag?"), dCell("")] }),
      ],
    }),
    empty(),

    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... das Wetter beschreiben (Adjektive + Verben)."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... alle vier Jahreszeiten benennen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... alle 12 Monate in der richtigen Reihenfolge sagen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Monate den Jahreszeiten zuordnen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... ueber meinen Geburtstag und mein Lieblingswetter sprechen."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Wetter, Jahreszeiten & Monate (LOESUNG)"),
    p("Gesamtpunkte: 48"),
    empty(),

    h2("Aufgabe 1: Wetter-Adjektive (8 Punkte – je 1 Punkt)"),
    bullet("1. sonnig"), bullet("2. regnerisch"), bullet("3. heiss"), bullet("4. windig"),
    bullet("5. verschneit / kalt"), bullet("6. bewoelkt"), bullet("7. kalt"), bullet("8. warm"),
    empty(),

    h2("Aufgabe 2: Lesetext (10 Punkte – je 2 Punkte)"),
    bullet("1. Sie feiert Neujahr im Januar. Es ist sehr kalt, manchmal schneit es."),
    bullet("2. Der Fruehling beginnt. Die ersten Blumen bluehen und die Voegel singen."),
    bullet("3. Sie hat Sommerferien, faehrt ans Meer und schwimmt jeden Tag."),
    bullet("4. Rot, gelb und orange."),
    bullet("5. Der Juli — weil sie die Sonne und das Meer liebt."),
    empty(),

    h2("Aufgabe 3: Monate / Jahreszeiten (8 Punkte – je 1 Punkt)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Monat", { width: 4750 }), hCell("Jahreszeit", { width: 4750 })] }),
        new TableRow({ children: [dCell("Januar"), dCell("Winter")] }),
        new TableRow({ children: [dCell("April"), dCell("Fruehling")] }),
        new TableRow({ children: [dCell("Juli"), dCell("Sommer")] }),
        new TableRow({ children: [dCell("September"), dCell("Herbst")] }),
        new TableRow({ children: [dCell("Oktober"), dCell("Herbst")] }),
        new TableRow({ children: [dCell("Dezember"), dCell("Winter")] }),
        new TableRow({ children: [dCell("Mai"), dCell("Fruehling")] }),
        new TableRow({ children: [dCell("August"), dCell("Sommer")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Lueckentext (8 Punkte – je 1 Punkt)"),
    bullet("1. Im ... Schnee"),
    bullet("2. Sonne"),
    bullet("3. Fruehling ... Blumen"),
    bullet("4. Herbst ... Blaetter"),
    bullet("5. am"),
    empty(),

    h2("Aufgabe 5: Freies Schreiben (8 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Geburtstag korrekt mit 'im' + Monat (1P)"),
    bullet("Lieblingswetter mit Adjektiv (1P)"),
    bullet("Lieblingsjahreszeit nennen (1P)"),
    bullet("Aktivitaet zur Jahreszeit (2P)"),
    bullet("Korrekte Verbformen (2P)"),
    bullet("5-6 vollstaendige Saetze (1P)"),
    empty(),
    pBold("Musterantwort:"),
    pItalic("Mein Geburtstag ist im Mai. Mein Lieblingswetter ist sonnig und warm. Meine Lieblingsjahreszeit ist der Sommer. Im Sommer schwimme ich gern im See. Ich esse auch viel Eis. Ich liebe die langen Sommertage!"),
    empty(),

    h2("Aufgabe 6: Konversation (6 Punkte – je 2 Punkte)"),
    pBold("Bewertungskriterien:"),
    bullet("Vollstaendige Antworten in ganzen Saetzen (2P pro Frage)"),
    bullet("Korrekte Strukturen: Es ist ... / Im ... / Am ..."),
    pItalic("Musterantworten: Heute ist es sonnig und warm. / Meine Lieblingsjahreszeit ist der Sommer. / Mein Geburtstag ist am 12. Maerz."),
    empty(),

    h2("Notenspiegel (48 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2500 }), hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2000 })] }),
        new TableRow({ children: [dCell("46-48"), dCell("1 (sehr gut)"), dCell("31-38"), dCell("3 (befriedigend)")] }),
        new TableRow({ children: [dCell("39-45"), dCell("2 (gut)"), dCell("24-30"), dCell("4 (ausreichend)")] }),
        new TableRow({ children: [dCell("23 und weniger"), dCell("5/6 (nicht ausreichend)"), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

console.log("Erstelle ABSCHLUSS: WetterJahreszeiten");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
