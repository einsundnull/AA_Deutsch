"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "04_EssenGesundheit", "01_GesundesEssen");
const TOPIC     = "A2_Kinder_EssenGesundheit_01_GesundesEssen";
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

// ── Wortliste-Tabelle ─────────────────────────────────────────────────────────
function makeWortlisteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Lebensmittel", { width: 2400 }), hCell("Kategorie", { width: 2000 }), hCell("Beispielsatz", { width: 5238 })] }),
      new TableRow({ children: [dCell("der Apfel"), dCell("Obst (gesund)"), dCell("Ein Apfel enthaelt viele Vitamine.")] }),
      new TableRow({ children: [dCell("die Banane"), dCell("Obst (gesund)"), dCell("Die Banane gibt viel Energie.")] }),
      new TableRow({ children: [dCell("die Karotte"), dCell("Gemuese (gesund)"), dCell("Karotten sind gut fuer die Augen.")] }),
      new TableRow({ children: [dCell("der Brokkoli"), dCell("Gemuese (gesund)"), dCell("Brokkoli enthaelt viel Eisen.")] }),
      new TableRow({ children: [dCell("das Vollkornbrot"), dCell("Brot (gesund)"), dCell("Vollkornbrot macht lange satt.")] }),
      new TableRow({ children: [dCell("der Joghurt"), dCell("Milchprodukt (gesund)"), dCell("Joghurt ist ein gesundes Fruehstueck.")] }),
      new TableRow({ children: [dCell("die Chips"), dCell("Snack (ungesund)"), dCell("Chips enthalten viel Fett und Salz.")] }),
      new TableRow({ children: [dCell("die Suessigkeiten"), dCell("Suesses (ungesund)"), dCell("Suessigkeiten enthalten viel Zucker.")] }),
      new TableRow({ children: [dCell("der Hamburger"), dCell("Fast Food (ungesund)"), dCell("Hamburger enthaelt sehr viel Fett.")] }),
      new TableRow({ children: [dCell("die Limonade"), dCell("Getraenk (ungesund)"), dCell("Limonade hat sehr viel Zucker.")] }),
      new TableRow({ children: [dCell("die Pommes"), dCell("Fast Food (ungesund)"), dCell("Pommes sind ungesund, wenn man sie oft isst.")] }),
      new TableRow({ children: [dCell("die Pizza"), dCell("Fast Food (ungesund)"), dCell("Pizza kann viel Fett enthalten.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Gesundes und ungesundes Essen"), empty(),
    pBold("Aufgabe 1: Sortiere die Lebensmittel in die Tabelle."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Apfel  -  Chips  -  Banane  -  Limonade  -  Karotte  -  Hamburger  -  Joghurt  -  Suessigkeiten  -  Brokkoli  -  Pommes  -  Vollkornbrot  -  Pizza")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesund", { width: 4819 }), hCell("Ungesund", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
        new TableRow({ children: [dCell("", { width: 4819 }), dCell("", { width: 4819 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib Saetze nach dem Muster."),
    pItalic("Muster: Chips sind ungesund, weil sie viel Fett enthalten."),
    pItalic("Muster: Ein Apfel ist gesund, weil er viele Vitamine enthaelt."),
    empty(),
    p("1. Brokkoli / gesund / Vitamine"),
    writeLine(55), empty(),
    p("2. Limonade / ungesund / Zucker"),
    writeLine(55), empty(),
    p("3. Joghurt / gesund / Kalzium"),
    writeLine(55), empty(),
    p("4. Pommes / ungesund / Fett"),
    writeLine(55), empty(), empty(),
    pBold("Aufgabe 3: Was isst du? Schreib 5 Saetze."),
    p("Was isst du zum Fruehstueck? Was ist gesund oder ungesund? Was solltest du oefter essen?"),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Loesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesund", { width: 4819 }), hCell("Ungesund", { width: 4819 })] }),
        new TableRow({ children: [dCell("Apfel, Banane, Karotte"), dCell("Chips, Limonade, Hamburger")] }),
        new TableRow({ children: [dCell("Joghurt, Brokkoli, Vollkornbrot"), dCell("Suessigkeiten, Pommes, Pizza")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("1. Brokkoli ist gesund, weil er viele Vitamine enthaelt."),
    bullet("2. Limonade ist ungesund, weil sie viel Zucker enthaelt."),
    bullet("3. Joghurt ist gesund, weil er viel Kalzium enthaelt."),
    bullet("4. Pommes sind ungesund, weil sie viel Fett enthalten."),
    pItalic("Hinweis: Auch andere Begruendungen akzeptieren (z. B. 'macht dick', 'schadet den Zaehnen')."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Zum Fruehstueck esse ich meistens Joghurt und ein Vollkornbrot. Das ist gesund. Manchmal esse ich auch Cornflakes — die enthalten manchmal viel Zucker. Ich sollte oefter Obst essen."),
    pItalic("Bewertung: Korrekte Verwendung von weil + Verb am Ende, soll/sollte, gesund/ungesund."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Gesundes und ungesundes Essen"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Gesund essen — aber wie?"),
          empty(),
          p("Hallo! Ich heisse Ben und ich bin 11 Jahre alt. Meine Mutter sagt immer: 'Ben, du sollst mehr Gemuese essen!' Aber ich mag lieber Chips und Hamburger."),
          p("In der Schule haben wir gelernt, was gesund ist. Obst und Gemuese enthalten viele Vitamine. Vitamine sind wichtig fuer unser Immunsystem. Vollkornbrot macht lange satt und ist besser als Weissbrot."),
          p("Ungesundes Essen ist nicht verboten, aber man sollte es nur selten essen. Chips enthalten sehr viel Fett und Salz. Limonade hat so viel Zucker wie zehn Stueck Wuerfelzucker! Das ist schlecht fuer die Zaehne."),
          p("Seit letzter Woche esse ich jeden Tag einen Apfel oder eine Banane. Das ist mein neues Ziel. Meine Mutter ist sehr stolz auf mich!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Ben mag lieber Chips und Hamburger als Gemuese."), dCell("")] }),
        new TableRow({ children: [dCell("Vitamine sind wichtig fuer die Knochen."), dCell("")] }),
        new TableRow({ children: [dCell("Limonade enthaelt viel Zucker."), dCell("")] }),
        new TableRow({ children: [dCell("Ungesundes Essen ist komplett verboten."), dCell("")] }),
        new TableRow({ children: [dCell("Ben isst jetzt jeden Tag Obst."), dCell("")] }),
        new TableRow({ children: [dCell("Bens Mutter ist unzufrieden mit ihm."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was sagt Bens Mutter immer zu ihm?"),
    writeLine(55), empty(),
    p("2. Was ist gut an Vollkornbrot?"),
    writeLine(55), empty(),
    p("3. Wie viel Zucker hat Limonade laut dem Text?"),
    writeLine(55), empty(),
    p("4. Was ist Bens neues Ziel?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Finde im Text 3 gesunde und 3 ungesunde Lebensmittel."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesund (aus dem Text)", { width: 4819 }), hCell("Ungesund (aus dem Text)", { width: 4819 })] }),
        new TableRow({ children: [dCell("1. ________________"), dCell("1. ________________")] }),
        new TableRow({ children: [dCell("2. ________________"), dCell("2. ________________")] }),
        new TableRow({ children: [dCell("3. ________________"), dCell("3. ________________")] }),
      ],
    }),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Ben mag lieber Chips und Hamburger als Gemuese."), dCell("R")] }),
        new TableRow({ children: [dCell("Vitamine sind wichtig fuer die Knochen."), dCell("F (fuer das Immunsystem)")] }),
        new TableRow({ children: [dCell("Limonade enthaelt viel Zucker."), dCell("R")] }),
        new TableRow({ children: [dCell("Ungesundes Essen ist komplett verboten."), dCell("F (nur selten essen)")] }),
        new TableRow({ children: [dCell("Ben isst jetzt jeden Tag Obst."), dCell("R")] }),
        new TableRow({ children: [dCell("Bens Mutter ist unzufrieden mit ihm."), dCell("F (sie ist stolz auf ihn)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie sagt: 'Ben, du sollst mehr Gemuese essen!'"),
    bullet("2. Vollkornbrot macht lange satt (und ist besser als Weissbrot)."),
    bullet("3. So viel Zucker wie zehn Stueck Wuerfelzucker."),
    bullet("4. Sein Ziel ist, jeden Tag einen Apfel oder eine Banane zu essen."),
    empty(),
    pBold("Aufgabe 3: Lebensmittel aus dem Text"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesund", { width: 4819 }), hCell("Ungesund", { width: 4819 })] }),
        new TableRow({ children: [dCell("Gemuese, Obst, Vollkornbrot"), dCell("Chips, Hamburger, Limonade")] }),
        new TableRow({ children: [dCell("(auch: Apfel, Banane akzeptieren)"), dCell("")] }),
      ],
    }),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Gesundes und ungesundes Essen"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("gesund  -  ungesund  -  Vitamine  -  Zucker  -  Fett  -  soll  -  sollte  -  enthaelt  -  oft  -  selten  -  Zähne  -  Energie  -  viel  -  wenig")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Obst und Gemuese enthalten viele __________________."),
    p("2. Chips enthalten sehr __________________ Fett."),
    p("3. Limonade ist __________________, weil sie viel Zucker hat."),
    p("4. Man __________________ Fast Food nur selten essen."),
    p("5. Eine Banane gibt dir viel __________________."),
    p("6. Brokkoli __________________ wenig Fett, aber viele Naehrstoffe."),
    empty(),
    pBold("Teil 2: Dialog in der Schulkantine"),
    empty(),
    p("Mia:   Was isst du heute, Felix?"),
    p("Felix: Ich nehme Pommes. Die mag ich so gern!"),
    p("Mia:   Aber Pommes sind doch __________________! Sie enthalten so viel __________________."),
    p("Felix: Ich weiss. Aber ich esse sie nur __________________. Das ist okay, oder?"),
    p("Mia:   Stimmt, man __________________ nicht alles verbieten. Aber heute nehme ich den Salat."),
    p("Felix: Salat? Das ist mir zu __________________. Ich nehme noch einen Apfel dazu."),
    p("Mia:   Super! Apfel ist __________________ und hat viele __________________."),
    empty(),
    pBold("Teil 3: Was __________ ich essen?"),
    empty(),
    p("Schreib selbst: Was solltest du oefter / seltener essen?"),
    p("Ich __________________ oefter __________________ essen, weil ..."),
    writeLine(55), empty(),
    p("Ich __________________ seltener __________________ essen, weil ..."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Vitamine"),
    bullet("2. viel"),
    bullet("3. ungesund"),
    bullet("4. soll / sollte"),
    bullet("5. Energie"),
    bullet("6. enthaelt"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Mia (1): ungesund / Fett"),
    bullet("Felix (1): selten"),
    bullet("Mia (2): sollte / soll"),
    bullet("Felix (2): wenig"),
    bullet("Mia (3): gesund / Vitamine"),
    pItalic("Nicht verwendet (Ablenkwoerter): Zucker, Zaehne"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Ich sollte oefter Gemuese essen, weil es viele Vitamine enthaelt."),
    pItalic("Muster: Ich sollte seltener Suessigkeiten essen, weil sie viel Zucker enthalten und schlecht fuer die Zaehne sind."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Gesundes und ungesundes Essen"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Woerter und Ausdrücke:"),
    bullet("gesund — ungesund"),
    bullet("enthaelt viel Fett / Zucker / Vitamine / Kalzium / Eisen"),
    bullet("macht lange satt — gibt Energie"),
    bullet("ist gut / schlecht fuer die Zaehne / das Immunsystem"),
    bullet("Man sollte ... oft / selten essen."),
    bullet("Du sollst mehr ... essen! (sollen = Aufforderung von jemand anderem)"),
    empty(),
    h2("Grammatik-Hinweise"),
    bullet("sollen (Aufforderung): Du sollst Gemuese essen. — Ich soll mehr schlafen."),
    bullet("sollte (Ratschlag): Du solltest mehr Obst essen. (= es waere besser)"),
    bullet("enthalten (Plural) vs. enthaelt (Singular): Chips enthalten Fett. / Ein Apfel enthaelt Vitamine."),
    bullet("Komparativ: gesund -> gesuender, gut -> besser"),
    bullet("Vollkornbrot ist gesuender als Weissbrot."),
    empty(),
    pBold("Aufgabe: Schreib fuer 6 Lebensmittel aus der Tabelle einen eigenen Satz."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen:"),
    bullet("... ist gesund / ungesund"),
    bullet("... enthaelt viel(e) + Nomen (Fett, Zucker, Vitamine)"),
    bullet("Man sollte ... oft / selten essen."),
    bullet("... ist besser / gesuender als ..."),
    empty(),
    pBold("Loesung Aufgabe: Mustersa tze"),
    bullet("Ein Apfel ist gesund, weil er viele Vitamine enthaelt."),
    bullet("Chips enthalten viel Fett. Man sollte sie selten essen."),
    bullet("Joghurt ist gut fuer die Knochen, weil er Kalzium enthaelt."),
    bullet("Limonade ist ungesund. Sie hat sehr viel Zucker."),
    bullet("Brokkoli ist gesuender als Pommes."),
    bullet("Vollkornbrot macht lange satt und ist besser als Weissbrot."),
    pItalic("Individuelle Saetze akzeptieren, wenn Aussage korrekt ist."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Gesundes und ungesundes Essen"), empty(),
    pBold("Dialog 1: In der Schulkantine"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lara"), dCell("Was nimmst du heute, Omar?")] }),
        new TableRow({ children: [dCell("Omar"), dCell("Ich nehme den Hamburger. Der schmeckt super!")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Aber Hamburger enthalten viel Fett. Nimmst du kein Gemuese?")] }),
        new TableRow({ children: [dCell("Omar"), dCell("Doch, ich nehme noch einen Apfel. Das ist doch gesund, oder?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Ja, Obst ist super! Ich nehme heute den Brokkolisalat.")] }),
        new TableRow({ children: [dCell("Omar"), dCell("Oh, Brokkoli mag ich nicht so gern. Ist das wirklich lecker?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Ja! Mit Zitronensaft ist er viel besser. Du solltest es mal probieren!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Beim Einkaufen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind"), dCell("Mama, kann ich die Chips kaufen? Bitte!")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Chips sind ungesund. Sie enthalten viel Fett.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Aber ich esse sie nur manchmal! Das ist okay, oder?")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Okay, aber nur eine kleine Tuete. Und nimm auch einen Apfel.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Deal! Apfel mag ich auch gern.")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Super. Gesuendes Essen und manchmal etwas Suesses — das ist die Balance!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was isst du zum Fruehstueck?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Obst oder Gemuese magst du gern?"), dCell("")] }),
        new TableRow({ children: [dCell("Was isst du selten, weil es ungesund ist?"), dCell("")] }),
        new TableRow({ children: [dCell("Was solltest du oefter essen?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein liebstes gesundes Essen?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Gesund oder ungesund?"),
    bullet("Eine Person nennt ein Lebensmittel (z. B. 'Chips')."),
    bullet("Alle anderen heben die Hand: gesund = rechte Hand, ungesund = linke Hand."),
    bullet("Wer falsch liegt, muss einen Satz mit dem Lebensmittel bilden."),
    bullet("Schwerere Variante: Begruendung mit 'weil' hinzufuegen."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("... enthalten viel + Nomen (Akkusativ): Hamburger enthalten viel Fett."),
    bullet("Das ist doch gesund, oder? = Bestaetigung suchen (Frageanhang 'oder?')"),
    bullet("Du solltest es mal probieren! = Ratschlag mit sollte"),
    bullet("Ist das wirklich lecker? = Nachfragen mit wirklich"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Kann ich ...? = Bitte / Erlaubnis (koennen)"),
    bullet("nur manchmal = Haeufigkeitsadverb zur Relativierung"),
    bullet("Das ist die Balance! = idiomatischer Ausdruck"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Verwendung von sollte / soll"),
    bullet("Begruendungen mit weil + Verb am Ende"),
    bullet("Korrekte Verwendung von enthaelt/enthalten"),
    bullet("Haeufigkeitsadverbien (oft, manchmal, selten, nie) korrekt eingesetzt"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Gesundes und ungesundes Essen"), empty(),
    pBold("Aufgabe 1: Schreib den Namen unter jedes Bild und kreuze an: gesund oder ungesund."),
    p("[BILD 1: Vier Lebensmittel: Apfel, Chips-Tuete, Karotte, Hamburger — jeweils mit Namelinie und zwei Kaestchen G/U]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 2350 }), hCell("[Bild 2]", { width: 2350 }), hCell("[Bild 3]", { width: 2350 }), hCell("[Bild 4]", { width: 2350 })] }),
        new TableRow({ children: [dCell("Name: _______"), dCell("Name: _______"), dCell("Name: _______"), dCell("Name: _______")] }),
        new TableRow({ children: [dCell("[ ] gesund"), dCell("[ ] gesund"), dCell("[ ] gesund"), dCell("[ ] gesund")] }),
        new TableRow({ children: [dCell("[ ] ungesund"), dCell("[ ] ungesund"), dCell("[ ] ungesund"), dCell("[ ] ungesund")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was ist auf dem Teller? Schreib die Lebensmittel und bewerte den Teller."),
    p("[BILD 2: Ein Teller mit verschiedenen Lebensmitteln — z. B. Pommes, Salatblaetter, eine Scheibe Brot, ein Glas Limonade]"),
    empty(),
    p("Ich sehe auf dem Teller: ___________________________________________________"),
    writeLine(55), empty(),
    p("Das ist ein __________________ Teller, weil ___________________________________"),
    writeLine(55), empty(),
    p("Ich wuerde hinzufuegen / weglassen: _________________________________________"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Zeichne deinen idealen Mittagsteller."),
    p("[BILD 3: Leere Tellerform zum Ausmalen / Bezeicnhen]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein idealer Mittagsteller:"), empty(), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Auf meinem Teller ist: ____________________________________________"),
    writeLine(55), empty(),
    pBold("Aufgabe 4: Verbinde das Lebensmittel mit dem Inhalt."),
    p("[BILD 4: Zwei Spalten — links Lebensmittel-Bilder (Apfel, Milch, Chips, Brokkoli), rechts Woerter (Fett, Vitamine, Kalzium, Eisen) — Linien ziehen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Lebensmittel", { width: 4819 }), hCell("Enthaelt vor allem ...", { width: 4819 })] }),
        new TableRow({ children: [dCell("[BILD: Apfel]"), dCell("Kalzium")] }),
        new TableRow({ children: [dCell("[BILD: Milch]"), dCell("Eisen")] }),
        new TableRow({ children: [dCell("[BILD: Chips]"), dCell("Vitamine")] }),
        new TableRow({ children: [dCell("[BILD: Brokkoli]"), dCell("Fett")] }),
      ],
    }),
    pItalic("(Linien ziehen: Apfel-Vitamine, Milch-Kalzium, Chips-Fett, Brokkoli-Eisen)"),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Gesundes und ungesundes Essen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von eingefuegten Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 2400 }), hCell("Name", { width: 2400 }), hCell("Kategorie", { width: 4838 })] }),
        new TableRow({ children: [dCell("Bild 1"), dCell("Apfel"), dCell("gesund")] }),
        new TableRow({ children: [dCell("Bild 2"), dCell("Chips"), dCell("ungesund")] }),
        new TableRow({ children: [dCell("Bild 3"), dCell("Karotte"), dCell("gesund")] }),
        new TableRow({ children: [dCell("Bild 4"), dCell("Hamburger"), dCell("ungesund")] }),
      ],
    }),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    pBold("Aufgabe 2: Musterloesung (abhaengig von Teller-Bild)"),
    pItalic("Muster: Ich sehe Pommes, Salatblaetter, ein Brot und ein Glas Limonade. Das ist kein sehr gesunder Teller, weil die Pommes viel Fett enthalten und die Limonade viel Zucker hat. Ich wuerde die Limonade weglassen und Wasser nehmen."),
    empty(),
    pBold("Aufgabe 3: Individuell"),
    pItalic("Muster-Begruendung: Auf meinem Teller ist Brokkoli, Huhnfleisch und Brot. Das ist gesund und macht satt."),
    empty(),
    pBold("Aufgabe 4: Korrekte Zuordnung"),
    bullet("Apfel - Vitamine"),
    bullet("Milch - Kalzium"),
    bullet("Chips - Fett"),
    bullet("Brokkoli - Eisen"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Gesundes und ungesundes Essen");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
