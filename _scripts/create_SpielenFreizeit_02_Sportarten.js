"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, PageOrientation, Header, Footer,
  PageNumber, NumberFormat, LevelFormat, convertInchesToTwip,
  BorderStyle, ShadingType, HeadingLevel, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "08_SpielenFreizeit", "02_Sportarten");
const TOPIC     = "A1_Kinder_SpielenFreizeit_02_Sportarten";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  }]
};

function h1(t) {
  return new Paragraph({
    children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })],
    spacing: { before: 200, after: 100 },
  });
}
function h2(t) {
  return new Paragraph({
    children: [new TextRun({ text: t, bold: true, size: 24, color: BLUE, font: "Arial" })],
    spacing: { before: 160, after: 80 },
  });
}
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
function bullet(t) {
  return new Paragraph({
    children: [new TextRun({ text: t, size: 22, font: "Arial" })],
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
  });
}
function hCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: opts.size || 20, font: "Arial", color: opts.color || "FFFFFF" })], alignment: AlignmentType.CENTER })],
    shading: { fill: opts.fill || BLUE, type: ShadingType.CLEAR },
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
function writeLine(n) {
  return new Paragraph({
    children: [new TextRun({ text: "_".repeat(n || 60), size: 22, font: "Arial", color: GRAY })],
    spacing: { before: 60, after: 60 },
  });
}
function writeLines(count, n) {
  const arr = [];
  for (let i = 0; i < count; i++) { arr.push(writeLine(n)); arr.push(empty()); }
  return arr;
}
function br() { return new Paragraph({ children: [new TextRun({ text: "", size: 22 })], spacing: { before: 20, after: 20 } }); }
function studentHead() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [
      dCell("Name: ______________________________", { width: 4500 }),
      dCell("Klasse: ____________", { width: 2200 }),
      dCell("Datum: ____________", { width: 2200 }),
    ]})],
  });
}
function makeHeader(topic) {
  return new Header({ children: [new Paragraph({ children: [new TextRun({ text: topic, size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] });
}
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] });
}
function save(fname, sections) {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      headers: { default: makeHeader(TOPIC) },
      footers: { default: makeFooter() },
      children: sections,
    }]
  });
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(path.join(OUTPUT_DIR, fname), buf);
    console.log("OK ", fname);
  }).catch(e => console.error("FEHLER", fname, e.message));
}

// ── Sportarten-Übersichtstabelle ─────────────────────────────────────────────
function makeSportTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Sportart", { width: 2200 }), hCell("Verb", { width: 2200 }), hCell("Satz", { width: 5100 })] }),
      new TableRow({ children: [dCell("Fußball"), dCell("spielen"), dCell("Ich spiele gern Fußball.")] }),
      new TableRow({ children: [dCell("Basketball"), dCell("spielen"), dCell("Er spielt Basketball in der Schule.")] }),
      new TableRow({ children: [dCell("Schwimmen"), dCell("schwimmen"), dCell("Wir schwimmen am Wochenende.")] }),
      new TableRow({ children: [dCell("Radfahren"), dCell("Rad fahren"), dCell("Sie fährt jeden Tag Rad.")] }),
      new TableRow({ children: [dCell("Turnen"), dCell("turnen"), dCell("Er turnt im Sportverein.")] }),
      new TableRow({ children: [dCell("Laufen / Joggen"), dCell("laufen / joggen"), dCell("Wir joggen morgens im Park.")] }),
      new TableRow({ children: [dCell("Tennis"), dCell("spielen"), dCell("Spielst du Tennis?")] }),
      new TableRow({ children: [dCell("Tanzen"), dCell("tanzen"), dCell("Sie tanzt sehr gut.")] }),
      new TableRow({ children: [dCell("Klettern"), dCell("klettern"), dCell("Er klettert gern auf Bäume.")] }),
      new TableRow({ children: [dCell("Skifahren"), dCell("Ski fahren"), dCell("Im Winter fahren wir Ski.")] }),
      new TableRow({ children: [dCell("Yoga / Sport machen"), dCell("machen"), dCell("Ich mache jeden Abend Sport.")] }),
      new TableRow({ children: [dCell("im Team spielen"), dCell("spielen"), dCell("Ich spiele gern im Team.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  const sportArten = [
    ["Fußball", "Basketball", "Schwimmen"],
    ["Radfahren", "Turnen", "Tennis"],
    ["Laufen", "Klettern", "Skifahren"],
  ];
  const rows1 = sportArten.map(row =>
    new TableRow({ children: row.map(s => dCell(s, { width: 3000 })) })
  );
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Sportarten"), empty(),
    pBold("Aufgabe 1: Schreib das Verb. Was machst du?"),
    p("Ergänze: spielen / fahren / machen / schwimmen / laufen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sportart", { width: 3500 }), hCell("Satz", { width: 6000 })] }),
        new TableRow({ children: [dCell("Fußball"), dCell("Ich ________ Fußball.")] }),
        new TableRow({ children: [dCell("Schwimmen"), dCell("Er ________ im Freibad.")] }),
        new TableRow({ children: [dCell("Radfahren"), dCell("Sie ________ Rad.")] }),
        new TableRow({ children: [dCell("Laufen"), dCell("Wir ________ im Park.")] }),
        new TableRow({ children: [dCell("Sport"), dCell("Ich ________ Sport.")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Was machst du gern? Was machst du nicht gern?"),
    p("Schreib 4 Sätze. Benutze: Ich (spiele / schwimme / laufe / fahre) gern … / Ich … nicht gern."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Drinnen oder draußen? Sortiere die Sportarten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Drinnen (in der Halle)", { width: 4700 }), hCell("Draußen (im Freien)", { width: 4700 })] }),
        ...[1,2,3,4].map(() => new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] })),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Mein Lieblingssport"),
    p("Schreib 3–4 Sätze über deinen Lieblingssport. Wann? Mit wem? Warum magst du ihn?"),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Sportarten (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Verb ergänzen"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sportart", { width: 3500 }), hCell("Satz", { width: 6000 })] }),
        new TableRow({ children: [dCell("Fußball"), dCell("Ich spiele Fußball.")] }),
        new TableRow({ children: [dCell("Schwimmen"), dCell("Er schwimmt im Freibad.")] }),
        new TableRow({ children: [dCell("Radfahren"), dCell("Sie fährt Rad.")] }),
        new TableRow({ children: [dCell("Laufen"), dCell("Wir laufen im Park.")] }),
        new TableRow({ children: [dCell("Sport"), dCell("Ich mache Sport.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterlösungen"),
    bullet("Ich spiele gern Fußball."),
    bullet("Ich schwimme nicht gern."),
    bullet("Ich fahre gern Rad."),
    bullet("Ich laufe nicht gern morgens."),
    empty(),
    pBold("Aufgabe 3: Drinnen / Draußen (Möglichkeit)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Drinnen", { width: 4700 }), hCell("Draußen", { width: 4700 })] }),
        new TableRow({ children: [dCell("Turnen, Basketball, Tennis, Yoga"), dCell("Fußball, Radfahren, Laufen, Klettern, Skifahren")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: individuell"),
    pItalic("Mein Lieblingssport ist Fußball. Ich spiele jeden Samstag mit meinen Freunden im Park. Ich mag Fußball, weil es Spaß macht."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Sportarten"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Tom ist 10 Jahre alt und macht sehr gern Sport. Sein Lieblingssport ist Fussball."),
          p("Er spielt jeden Dienstag und Donnerstag im Sportverein. Sein Verein heisst Blau-Weiss."),
          p("Am Wochenende faehrt Tom mit seinem Vater Rad. Sie fahren oft in den Park."),
          p("Tom findet Radfahren toll, aber Fussball ist noch besser!"),
          p("Seine Schwester Lisa schwimmt gern. Sie ist im Schwimmverein und hat schon viele Medaillen gewonnen."),
          p("Mama macht jeden Morgen Yoga. Papa laeuft dreimal pro Woche im Park."),
          p("Am Wochenende macht die ganze Familie zusammen Sport - das macht allen Spass!"),
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
        new TableRow({ children: [dCell("Tom spielt Fussball im Verein."), dCell("")] }),
        new TableRow({ children: [dCell("Tom und sein Vater schwimmen am Wochenende."), dCell("")] }),
        new TableRow({ children: [dCell("Lisa ist im Schwimmverein."), dCell("")] }),
        new TableRow({ children: [dCell("Mama laeuft im Park."), dCell("")] }),
        new TableRow({ children: [dCell("Die ganze Familie macht am Wochenende zusammen Sport."), dCell("")] }),
        new TableRow({ children: [dCell("Tom findet Radfahren besser als Fussball."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was ist Toms Lieblingssport?"),
    writeLine(55), empty(),
    p("2. Wann spielt Tom im Verein?"),
    writeLine(55), empty(),
    p("3. Was macht Lisa?"),
    writeLine(55), empty(),
    p("4. Was macht Papa dreimal pro Woche?"),
    writeLine(55), empty(),
    empty(),
    pBold("Aufgabe 3: Welche Sportarten stehen im Text? Schreib sie auf."),
    writeLine(55), empty(),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Sportarten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Tom spielt Fussball im Verein."), dCell("R")] }),
        new TableRow({ children: [dCell("Tom und sein Vater schwimmen am Wochenende."), dCell("F (Radfahren)")] }),
        new TableRow({ children: [dCell("Lisa ist im Schwimmverein."), dCell("R")] }),
        new TableRow({ children: [dCell("Mama laeuft im Park."), dCell("F (Yoga)")] }),
        new TableRow({ children: [dCell("Die ganze Familie macht am Wochenende zusammen Sport."), dCell("R")] }),
        new TableRow({ children: [dCell("Tom findet Radfahren besser als Fussball."), dCell("F (Fussball ist noch besser)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sein Lieblingssport ist Fussball."),
    bullet("2. Er spielt jeden Dienstag und Donnerstag."),
    bullet("3. Lisa schwimmt gern / ist im Schwimmverein."),
    bullet("4. Papa laeuft dreimal pro Woche."),
    empty(),
    pBold("Aufgabe 3: Sportarten im Text"),
    p("Fussball, Radfahren, Schwimmen, Yoga, Laufen"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Sportarten"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("spielen  -  schwimmen  -  fahren  -  laufen  -  machen  -  Fussball  -  Sport  -  Verein  -  Lieblingssport  -  Mannschaft  -  trainieren  -  gewinnen  -  Tor  -  Spass")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Mein __________________ ist Schwimmen."),
    p("2. Tom spielt Fussball in einem __________________."),
    p("3. Wir __________________ jeden Dienstag __________________."),
    p("4. Lisa kann sehr schnell __________________."),
    p("5. Der Trainer sagt: Wir muessen mehr __________________!"),
    p("6. Unsere __________________ hat heute gewonnen!"),
    empty(),
    pBold("Teil 2: Schreib die richtigen Verben."),
    empty(),
    p("1. Er __________________ gern Rad.    (fahren)"),
    p("2. Wir __________________ dreimal pro Woche.    (trainieren)"),
    p("3. Sie __________________ das Spiel.    (gewinnen)"),
    p("4. Ich __________________ jeden Morgen Sport.    (machen)"),
    p("5. Das __________________ mir viel Spass!    (machen)"),
    empty(),
    pBold("Teil 3: Was passt? Verbinde."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sportart", { width: 3000 }), hCell("Ort", { width: 3000 }), hCell("Was braucht man?", { width: 3500 })] }),
        new TableRow({ children: [dCell("Fussball"), dCell("Hallenbad / Freibad"), dCell("Schuhe / Laufschuhe")] }),
        new TableRow({ children: [dCell("Schwimmen"), dCell("Stadion / Feld"), dCell("Ball / Tor")] }),
        new TableRow({ children: [dCell("Laufen"), dCell("Park / Strasse"), dCell("Badeanzug / Badehose")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4 (frei): Schreib ueber deine Sportart."),
    p("Ich ________ gern __________________. Ich ________ am/im __________________."),
    writeLine(55), empty(),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Sportarten (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Lieblingssport"),
    bullet("2. Verein"),
    bullet("3. spielen ... Fussball"),
    bullet("4. laufen / schwimmen"),
    bullet("5. trainieren"),
    bullet("6. Mannschaft"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. faehrt"),
    bullet("2. trainieren"),
    bullet("3. gewinnt"),
    bullet("4. mache"),
    bullet("5. macht"),
    empty(),
    pBold("Teil 3: Korrekte Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sportart", { width: 3000 }), hCell("Ort", { width: 3000 }), hCell("Was braucht man?", { width: 3500 })] }),
        new TableRow({ children: [dCell("Fussball"), dCell("Stadion / Feld"), dCell("Ball / Tor")] }),
        new TableRow({ children: [dCell("Schwimmen"), dCell("Hallenbad / Freibad"), dCell("Badeanzug / Badehose")] }),
        new TableRow({ children: [dCell("Laufen"), dCell("Park / Strasse"), dCell("Schuhe / Laufschuhe")] }),
      ],
    }),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Sportarten"), empty(),
    makeSportTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Rad fahren / Ski fahren: trennbar: Ich fahre Rad. Er faehrt Ski."),
    bullet("Sport machen: Ich mache Sport. (kein Artikel vor Sport)"),
    bullet("Verben mit Dativ: Das macht mir Spass. (mir = Dativ von ich)"),
    bullet("Mannschaft (die) = team | Verein (der) = club | Trainer (der) = coach"),
    bullet("gewinnen vs verlieren | trainieren = to train"),
    empty(),
    pBold("Aufgabe: Lerne 5 Sportarten auswendig. Schreib sie auf."),
    ...writeLines(5, 50),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Sportarten (LOESUNG)"), empty(),
    makeSportTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Ich fahre jeden Samstag Rad."),
    bullet("Wir machen dreimal pro Woche Sport."),
    bullet("Das macht mir viel Spass!"),
    bullet("Mein Verein trainiert dienstags und donnerstags."),
    bullet("Unsere Mannschaft hat das Spiel gewonnen."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Sportarten"), empty(),
    pBold("Dialog 1: Im Sportunterricht"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Heute spielen wir Fussball! Wer spielt gern Fussball?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Ich! Ich spiele im Verein.")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich spiele nicht so gern Fussball. Ich schwimme lieber.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Kein Problem! Morgen schwimmen wir.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Toll! Ich schwimme auch gern.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Beim Training"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Trainer"), dCell("Guten Tag! Machst du gern Sport?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Ja, ich spiele sehr gern Fussball!")] }),
        new TableRow({ children: [dCell("Trainer"), dCell("Wie oft trainierst du?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Zweimal pro Woche.")] }),
        new TableRow({ children: [dCell("Trainer"), dCell("Super! Bist du in einem Verein?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Noch nicht, aber ich moechte in einen Verein.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Sport in deiner Familie"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingssport?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie oft machst du Sport?"), dCell("")] }),
        new TableRow({ children: [dCell("Bist du in einem Verein?"), dCell("")] }),
        new TableRow({ children: [dCell("Was macht deine Familie gern?"), dCell("")] }),
        new TableRow({ children: [dCell("Welchen Sport findest du langweilig?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Sport-Quiz"),
    bullet("Eine Person denkt an eine Sportart."),
    bullet("Die anderen stellen Ja/Nein-Fragen:"),
    bullet("  Spielt man das in einer Mannschaft? Ja / Nein"),
    bullet("  Braucht man einen Ball? Ja / Nein"),
    bullet("  Macht man das draussen? Ja / Nein"),
    bullet("Wer die Sportart erraet, ist dran!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Sportarten (LOESUNG)"), empty(),
    pBold("Dialog 1: Analyse"),
    bullet("Anna schwimmt lieber als Fussball zu spielen - Vergleich mit lieber"),
    bullet("Kein Problem! - informelle Zustimmung"),
    empty(),
    pBold("Dialog 2: Schluesselphrasing"),
    bullet("Wie oft trainierst du? - zweimal / dreimal pro Woche"),
    bullet("Noch nicht, aber... - noch nicht = not yet"),
    bullet("moechte in einen Verein - moechten + in + Akkusativ"),
    empty(),
    pBold("Nuetzliche Ausdruecke fuer das Interview:"),
    bullet("Mein Lieblingssport ist ..."),
    bullet("Ich spiele / schwimme / laufe ... einmal / zweimal / dreimal pro Woche."),
    bullet("Ja, ich bin im Verein / Nein, ich bin in keinem Verein."),
    bullet("Das finde ich langweilig / toll / super / anstrengend."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Sportarten"), empty(),
    pBold("Aufgabe 1: Ordne die Sportarten der richtigen Gruppe zu."),
    p("Fussball / Schwimmen / Tennis / Yoga / Laufen / Basketball / Radfahren / Skifahren"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Mit Ball", { width: 2350 }), hCell("Im Wasser", { width: 2350 }), hCell("Laufen/Fahren", { width: 2350 }), hCell("Indoor", { width: 2350 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Meine Sport-Woche."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tag", { width: 1500 }), hCell("Sport / Aktivitaet", { width: 3200 }), hCell("Mit wem?", { width: 2500 }), hCell("Wie lange?", { width: 2300 })] }),
        ...["Mo","Di","Mi","Do","Fr","Sa","So"].map(d =>
          new TableRow({ children: [dCell(d), dCell(""), dCell(""), dCell("")] })
        ),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Reporter-Bericht"),
    p("Schreib 4-5 Saetze: Name / Alter / Lieblingssport / Wann / Warum"),
    empty(),
    ...writeLines(5, 55),
    empty(),
    pBold("Aufgabe 4: Klassen-Umfrage – Welche Sportart ist am beliebtesten?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Name", { width: 2500 }), hCell("Lieblingssport", { width: 3000 }), hCell("Satz", { width: 4000 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Sportarten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Mit Ball", { width: 2350 }), hCell("Im Wasser", { width: 2350 }), hCell("Laufen/Fahren", { width: 2350 }), hCell("Indoor", { width: 2350 })] }),
        new TableRow({ children: [dCell("Fussball, Tennis, Basketball"), dCell("Schwimmen"), dCell("Laufen, Radfahren, Skifahren"), dCell("Yoga, Turnen")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: Eintaege je nach persoenlichem Stundenplan"),
    pItalic("Aufgabe 3: Musterbericht - Max ist 10 Jahre alt. Sein Lieblingssport ist Fussball. Er spielt dienstags und donnerstags im Verein. Er mag Fussball, weil er gern im Team spielt."),
    pItalic("Aufgabe 4: Klassenergebnisse variieren"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Sportarten");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
