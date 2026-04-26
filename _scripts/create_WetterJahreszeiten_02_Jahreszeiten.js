"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "11_WetterJahreszeiten", "02_Jahreszeiten");
const TOPIC     = "A1_Kinder_WetterJahreszeiten_02_Jahreszeiten";
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

// ── Jahreszeiten-Tabelle ──────────────────────────────────────────────────────
function makeJahreszeitenTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Jahreszeit", { width: 2000 }), hCell("Wetter", { width: 2500 }), hCell("Typisches", { width: 2500 }), hCell("Beispielsatz", { width: 2500 })] }),
      new TableRow({ children: [dCell("der Fruehling"), dCell("warm, sonnig"), dCell("Blumen, Voegel singen"), dCell("Im Fruehling bluehen die Blumen.")] }),
      new TableRow({ children: [dCell("der Sommer"), dCell("heiss, sonnig"), dCell("Schwimmen, Eis essen"), dCell("Im Sommer ist es sehr heiss.")] }),
      new TableRow({ children: [dCell("der Herbst"), dCell("kuehl, windig"), dCell("bunte Blaetter, Regen"), dCell("Im Herbst fallen die Blaetter.")] }),
      new TableRow({ children: [dCell("der Winter"), dCell("kalt, schneit"), dCell("Schnee, Schlitten"), dCell("Im Winter bauen wir Schneemaenner.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Die Jahreszeiten"), empty(),
    pBold("Aufgabe 1: Welche Jahreszeit ist das? Schreib den Namen."),
    p("Fruehling  /  Sommer  /  Herbst  /  Winter"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Jahreszeit", { width: 3000 })] }),
        new TableRow({ children: [dCell("Es ist heiss. Die Kinder schwimmen im See."), dCell("")] }),
        new TableRow({ children: [dCell("Es ist kalt. Es schneit. Die Kinder fahren Schlitten."), dCell("")] }),
        new TableRow({ children: [dCell("Die Blaetter werden bunt: rot, gelb, orange. Es ist kuehl."), dCell("")] }),
        new TableRow({ children: [dCell("Alles wird gruen. Die Blumen bluehen. Die Voegel singen."), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Ergaenze mit der richtigen Jahreszeit."),
    empty(),
    p("1. _______ Fruehling / Sommer / Herbst / Winter _______ kommen nach dem Winter."),
    p("2. Im __________________ ist es am waermsten."),
    p("3. Im __________________ fallen die Blaetter von den Baeumen."),
    p("4. Im __________________ gibt es Schnee und Eis."),
    p("5. Im __________________ bluehen viele Blumen."),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4-5 Saetze ueber deine Lieblingszeit."),
    p("Meine Lieblingszeit ist ... / Im ... ist es ... / Ich mag ..., weil ..."),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Die Jahreszeiten (LOESUNG)"), empty(),
    pBold("Aufgabe 1:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Jahreszeit", { width: 3000 })] }),
        new TableRow({ children: [dCell("Es ist heiss. Die Kinder schwimmen im See."), dCell("der Sommer")] }),
        new TableRow({ children: [dCell("Es ist kalt. Es schneit. Die Kinder fahren Schlitten."), dCell("der Winter")] }),
        new TableRow({ children: [dCell("Die Blaetter werden bunt: rot, gelb, orange. Es ist kuehl."), dCell("der Herbst")] }),
        new TableRow({ children: [dCell("Alles wird gruen. Die Blumen bluehen. Die Voegel singen."), dCell("der Fruehling")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2:"),
    bullet("1. Der Fruehling kommt nach dem Winter."),
    bullet("2. Im Sommer ist es am waermsten."),
    bullet("3. Im Herbst fallen die Blaetter von den Baeumen."),
    bullet("4. Im Winter gibt es Schnee und Eis."),
    bullet("5. Im Fruehling bluehen viele Blumen."),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Meine Lieblingszeit ist der Sommer. Im Sommer ist es warm und sonnig. Ich schwimme gern im See. Ich esse auch gern Eis. Der Sommer macht mich gluecklich!"),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Die Jahreszeiten"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich bin Felix. Ich erzaehle dir von meinen Lieblingszeiten."),
          p("Im Fruehling gehe ich gern spazieren. Die Blumen bluehen und die Voegel singen. Alles wird gruen."),
          p("Im Sommer fahre ich mit meiner Familie ans Meer. Das Wasser ist warm und ich schwimme den ganzen Tag. Abends essen wir Eis."),
          p("Im Herbst sammle ich bunte Blaetter im Park. Mama macht dann heisse Suppe. Ich mag den Geruch des Herbstes."),
          p("Im Winter ist mein Geburtstag! Es schneit oft und wir bauen zusammen einen Schneemann."),
          p("Meine absolute Lieblingszeit ist der Winter. Und deine?"),
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
        new TableRow({ children: [dCell("Felix geht im Fruehling gern spazieren."), dCell("")] }),
        new TableRow({ children: [dCell("Im Sommer faehrt Felix in die Berge."), dCell("")] }),
        new TableRow({ children: [dCell("Im Herbst sammelt Felix bunte Blaetter."), dCell("")] }),
        new TableRow({ children: [dCell("Der Geburtstag von Felix ist im Sommer."), dCell("")] }),
        new TableRow({ children: [dCell("Felix liebt den Winter am meisten."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was macht Felix im Sommer?"),
    writeLine(55), empty(),
    p("2. Was macht Mama im Herbst?"),
    writeLine(55), empty(),
    p("3. Was machen Felix und seine Familie im Winter?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Jahreszeit magst du am liebsten? Warum? Schreib 2 Saetze."),
    writeLine(55), empty(), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Die Jahreszeiten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Felix geht im Fruehling gern spazieren."), dCell("R")] }),
        new TableRow({ children: [dCell("Im Sommer faehrt Felix in die Berge."), dCell("F (ans Meer)")] }),
        new TableRow({ children: [dCell("Im Herbst sammelt Felix bunte Blaetter."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Geburtstag von Felix ist im Sommer."), dCell("F (im Winter)")] }),
        new TableRow({ children: [dCell("Felix liebt den Winter am meisten."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er faehrt ans Meer, schwimmt und isst Eis."),
    bullet("2. Mama macht heisse Suppe."),
    bullet("3. Sie bauen einen Schneemann."),
    empty(),
    pBold("Aufgabe 3: individuelle Antwort — alle sinnvollen Antworten akzeptieren."),
    pItalic("Muster: Ich mag den Sommer am liebsten. Es ist warm und ich schwimme gern."),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Die Jahreszeiten"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Fruehling  -  Sommer  -  Herbst  -  Winter  -  warm  -  heiss  -  kalt  -  kuehl  -  Blaetter  -  Blumen  -  Schnee  -  Sonne  -  schwimmen  -  bluehen  -  fallen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Welche Jahreszeit passt? Schreib Fruehling / Sommer / Herbst / Winter."),
    empty(),
    p("1. Es ist sehr heiss. Wir gehen ans Meer. Das ist der __________________."),
    p("2. Es schneit viel. Wir fahren Schlitten. Das ist der __________________."),
    p("3. Die Blaetter werden bunt. Es ist kuehl und windig. Das ist der __________________."),
    p("4. Die Blumen bluehen. Die Voegel singen. Alles wird gruen. Das ist der __________________."),
    empty(),
    pBold("Teil 2: Ergaenze das richtige Wort."),
    empty(),
    p("1. Im Sommer ist es sehr __________________."),
    p("2. Im Winter liegt __________________ auf dem Boden."),
    p("3. Im Fruehling __________________ die Blumen."),
    p("4. Im Herbst __________________ die Blaetter von den Baeumen."),
    p("5. Im Sommer __________________ wir gern im See."),
    p("6. Im Fruehling und Sommer scheint oft die __________________."),
    empty(),
    pBold("Teil 3: Dialog – Lieblingszeit"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"), dCell("Was ist deine Lieblingszeit?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ich mag den __________________ am liebsten.")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Warum?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Weil es __________________ ist und ich gern __________________.")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich mag den __________________ lieber. Da bluehen die __________________!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Die Jahreszeiten (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Sommer"), bullet("2. Winter"), bullet("3. Herbst"), bullet("4. Fruehling"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. heiss"), bullet("2. Schnee"), bullet("3. bluehen"),
    bullet("4. fallen"), bullet("5. schwimmen"), bullet("6. Sonne"),
    empty(),
    pBold("Teil 3: Musterloesung"),
    bullet("Ben: Ich mag den Sommer am liebsten."),
    bullet("Ben: Weil es heiss ist und ich gern schwimme."),
    bullet("Anna: Ich mag den Fruehling lieber. Da bluehen die Blumen!"),
    pItalic("Individuelle Variationen akzeptieren — jede Jahreszeit ist moeglich."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Die Jahreszeiten"), empty(),
    makeJahreszeitenTable(),
    empty(),
    h2("Mehr Woerter zu den Jahreszeiten"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Wort", { width: 2500 }), hCell("Wortart", { width: 1300 }), hCell("Beispielsatz", { width: 5700 })] }),
        new TableRow({ children: [dCell("die Blume / Blumen"), dCell("Nomen"), dCell("Im Fruehling bluehen viele Blumen.")] }),
        new TableRow({ children: [dCell("das Blatt / Blaetter"), dCell("Nomen"), dCell("Im Herbst fallen die Blaetter.")] }),
        new TableRow({ children: [dCell("der Schneemann"), dCell("Nomen"), dCell("Wir bauen einen Schneemann.")] }),
        new TableRow({ children: [dCell("heiss / warm / kuehl / kalt"), dCell("Adjektiv"), dCell("Im Sommer ist es heiss, im Winter kalt.")] }),
        new TableRow({ children: [dCell("bluehen"), dCell("Verb"), dCell("Die Rosen bluehen im Mai.")] }),
        new TableRow({ children: [dCell("fallen"), dCell("Verb"), dCell("Die Blaetter fallen im Oktober.")] }),
        new TableRow({ children: [dCell("schwimmen"), dCell("Verb"), dCell("Im Sommer schwimme ich gern.")] }),
        new TableRow({ children: [dCell("Schlitten fahren"), dCell("Verb"), dCell("Im Winter fahren wir Schlitten.")] }),
      ],
    }),
    empty(),
    pBold("Grammatik-Hinweis:"),
    bullet("Im + Jahreszeit (Dativ): Im Fruehling / Im Sommer / Im Herbst / Im Winter"),
    bullet("Alle vier Jahreszeiten haben Artikel: DER Fruehling / Sommer / Herbst / Winter"),
    bullet("Typische Verben: bluehen (Fruehling), schwimmen (Sommer), fallen (Herbst), schneien (Winter)"),
    empty(),
    pBold("Aufgabe: Schreib zu jeder Jahreszeit 2 Saetze."),
    p("Im Fruehling: _______________________________________________"),
    empty(), writeLine(55), empty(),
    p("Im Sommer: _______________________________________________"),
    empty(), writeLine(55), empty(),
    p("Im Herbst: _______________________________________________"),
    empty(), writeLine(55), empty(),
    p("Im Winter: _______________________________________________"),
    empty(), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Die Jahreszeiten (LOESUNG)"), empty(),
    makeJahreszeitenTable(),
    empty(),
    pBold("Musterantworten Schreibaufgabe:"),
    bullet("Im Fruehling bluehen die Blumen. Die Voegel singen laut."),
    bullet("Im Sommer ist es heiss. Ich schwimme gern im See."),
    bullet("Im Herbst fallen die Blaetter. Es ist kuehl und windig."),
    bullet("Im Winter schneit es oft. Wir bauen einen Schneemann."),
    empty(),
    pBold("Grammatik-Hinweis: Im + Jahreszeit"),
    bullet("Im = in + dem (Dativ) — bleibt immer 'Im', nie 'In den' bei Jahreszeiten."),
    bullet("Muster: Im Fruehling macht man ... / Im Sommer kann man ..."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Die Jahreszeiten"), empty(),
    pBold("Dialog 1: Lieblingsjahreszeit"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Clara"), dCell("Was ist deine Lieblingsjahreszeit?")] }),
        new TableRow({ children: [dCell("Noah"), dCell("Ich mag den Sommer am liebsten! Und du?")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Ich liebe den Fruehling. Alles wird gruen und die Blumen bluehen.")] }),
        new TableRow({ children: [dCell("Noah"), dCell("Ich verstehe das. Aber im Sommer kann ich schwimmen!")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Stimmt. Aber magst du den Herbst? Die Blaetter sind so bunt.")] }),
        new TableRow({ children: [dCell("Noah"), dCell("Der Herbst ist okay. Aber der Winter macht mir Angst. Brrr!")] }),
        new TableRow({ children: [dCell("Clara"), dCell("Ha! Ich mag den Winter. Schneemaenner bauen ist toll!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Was macht man in welcher Jahreszeit?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lena"), dCell("Was machst du im Sommer?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ich fahre mit der Familie ans Meer und schwimme jeden Tag.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Und im Winter?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ich fahre Ski und baue Schneemaenner mit meiner Schwester.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Wie schoen! Ich gehe im Fruehling immer in den Park.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ich auch! Im Fruehling ist es so schoen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Jahreszeiten"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist deine Lieblingszeit?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du im Sommer?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du im Winter?"), dCell("")] }),
        new TableRow({ children: [dCell("Magst du den Herbst? Warum?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist typisch fuer den Fruehling?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Jahreszeiten-Quiz"),
    bullet("Lehrkraft beschreibt eine Jahreszeit: 'Es ist kalt, es schneit, wir bauen Schneemaenner.'"),
    bullet("Die Gruppe ruft die richtige Jahreszeit auf Deutsch."),
    bullet("Dann darf ein Kind selbst beschreiben."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Die Jahreszeiten (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Was ist deine Lieblingsjahreszeit? = Standard-Frage nach der Lieblingszeit"),
    bullet("Ich mag ... am liebsten. = Superlativ-Ausdruck (beliebteste Jahreszeit)"),
    bullet("Ich liebe ... / Ich mag ... / Ich finde ... toll. = Praeferenzausdruecke"),
    bullet("Stimmt. = Zustimmung (That's true / Right.)"),
    bullet("... macht mir Angst. = etwas macht jemandem Angst (to be scared of)"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was machst du im + Jahreszeit? = Handlungsfrage"),
    bullet("Ich fahre ... / Ich schwimme ... / Ich baue ... = Praesens-Antworten"),
    bullet("jeden Tag = every day (Zeitangabe)"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Verwendung von Im + Jahreszeit"),
    bullet("Praeferenz ausdruecken: Ich mag / Ich liebe / Ich finde ... toll"),
    bullet("Aktivitaeten nennen: schwimmen, Schlitten fahren, Blaetter sammeln"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Die Jahreszeiten"), empty(),
    pBold("Aufgabe 1: [BILD 1: Vier Bilder — je eine Jahreszeit: Blumen/Sonne, Strand/Hitze, bunte Blaetter, Schnee/Schneemann]"),
    p("Schreib unter jedes Bild die richtige Jahreszeit und einen Satz."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild A", { width: 2350 }), hCell("Bild B", { width: 2350 }), hCell("Bild C", { width: 2350 }), hCell("Bild D", { width: 2350 })] }),
        new TableRow({ children: [
          dCell("[Blumen, Sonne]", { width: 2350 }),
          dCell("[Strand, heiss]", { width: 2350 }),
          dCell("[bunte Blaetter]", { width: 2350 }),
          dCell("[Schnee, Schneemann]", { width: 2350 }),
        ]}),
        new TableRow({ children: [
          dCell("Es ist der ________", { width: 2350 }),
          dCell("Es ist der ________", { width: 2350 }),
          dCell("Es ist der ________", { width: 2350 }),
          dCell("Es ist der ________", { width: 2350 }),
        ]}),
        new TableRow({ children: [
          dCell("Satz: ____________", { width: 2350 }),
          dCell("Satz: ____________", { width: 2350 }),
          dCell("Satz: ____________", { width: 2350 }),
          dCell("Satz: ____________", { width: 2350 }),
        ]}),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Kind kleidet sich fuer eine Jahreszeit an — z.B. Wintermantel, Schal, Muetze]"),
    p("Welche Jahreszeit ist das? Was traegt das Kind? Schreib 3 Saetze."),
    empty(),
    ...writeLines(3, 55),
    empty(),
    pBold("Aufgabe 3: Verbinde Jahreszeit und Aktivitaet."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Jahreszeit", { width: 3000 }), hCell("Aktivitaet", { width: 6500 })] }),
        new TableRow({ children: [dCell("der Fruehling"), dCell("Schlitten fahren und Schneemaenner bauen")] }),
        new TableRow({ children: [dCell("der Sommer"), dCell("Blumen pflanzten und im Park spazieren")] }),
        new TableRow({ children: [dCell("der Herbst"), dCell("Am Strand schwimmen und Eis essen")] }),
        new TableRow({ children: [dCell("der Winter"), dCell("Bunte Blaetter sammeln und Drachen steigen lassen")] }),
      ],
    }),
    p("Hinweis: Verbinde mit einer Linie oder schreib die richtige Jahreszeit neben die Aktivitaet."),
    empty(),
    pBold("Aufgabe 4: Male deine Lieblingszeit und erklaere."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Meine Lieblingszeit:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Das ist der / die / das __________________."),
    p("Ich mag diese Jahreszeit, weil: __________________"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Die Jahreszeiten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1500 }), hCell("Jahreszeit", { width: 2000 }), hCell("Beispielsatz", { width: 6000 })] }),
        new TableRow({ children: [dCell("A"), dCell("der Fruehling"), dCell("Im Fruehling bluehen die Blumen.")] }),
        new TableRow({ children: [dCell("B"), dCell("der Sommer"), dCell("Im Sommer schwimmen wir am Strand.")] }),
        new TableRow({ children: [dCell("C"), dCell("der Herbst"), dCell("Im Herbst werden die Blaetter bunt.")] }),
        new TableRow({ children: [dCell("D"), dCell("der Winter"), dCell("Im Winter bauen wir einen Schneemann.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: individuelle Antwort"),
    pItalic("Abhaengig vom Bild. Muster (Winter): Das ist der Winter. Das Kind traegt einen Mantel, eine Muetze und einen Schal. Es ist kalt draussen."),
    empty(),
    pBold("Aufgabe 3: Richtige Zuordnung"),
    bullet("Fruehling → Blumen pflanzen und im Park spazieren"),
    bullet("Sommer → Am Strand schwimmen und Eis essen"),
    bullet("Herbst → Bunte Blaetter sammeln und Drachen steigen lassen"),
    bullet("Winter → Schlitten fahren und Schneemaenner bauen"),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort — alle Jahreszeiten moeglich."),
    pItalic("Alle sinnvollen Begruendungen akzeptieren."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Jahreszeiten");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
