"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, PageOrientation, Header, Footer,
  PageNumber, NumberFormat, LevelFormat, convertInchesToTwip,
  BorderStyle, ShadingType, HeadingLevel, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "08_SpielenFreizeit", "03_Spielzeug");
const TOPIC     = "A1_Kinder_SpielenFreizeit_03_Spielzeug";
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

// ── Spielzeug-Uebersichtstabelle ─────────────────────────────────────────────
function makeSpielzeugTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Spielzeug", { width: 2500 }), hCell("Artikel", { width: 1400 }), hCell("Plural", { width: 2000 }), hCell("Beispielsatz", { width: 3600 })] }),
      new TableRow({ children: [dCell("Ball"), dCell("der"), dCell("die Baelle"), dCell("Ich werfe den Ball.")] }),
      new TableRow({ children: [dCell("Puppe"), dCell("die"), dCell("die Puppen"), dCell("Sie spielt mit ihrer Puppe.")] }),
      new TableRow({ children: [dCell("Auto (Spielzeug)"), dCell("das"), dCell("die Autos"), dCell("Er faehrt mit dem kleinen Auto.")] }),
      new TableRow({ children: [dCell("Baustein / Lego"), dCell("der"), dCell("die Bausteine"), dCell("Wir bauen eine Burg aus Bausteinen.")] }),
      new TableRow({ children: [dCell("Teddy"), dCell("der"), dCell("die Teddys"), dCell("Sie schlaeft mit dem Teddy.")] }),
      new TableRow({ children: [dCell("Puzzle"), dCell("das"), dCell("die Puzzles"), dCell("Das Puzzle hat 100 Teile.")] }),
      new TableRow({ children: [dCell("Spiel / Brettspiel"), dCell("das"), dCell("die Spiele"), dCell("Wir spielen ein Brettspiel.")] }),
      new TableRow({ children: [dCell("Karte / Spielkarte"), dCell("die"), dCell("die Karten"), dCell("Wir spielen Karten.")] }),
      new TableRow({ children: [dCell("Fahrrad"), dCell("das"), dCell("die Fahrraeder"), dCell("Er faehrt mit dem Fahrrad.")] }),
      new TableRow({ children: [dCell("Roller"), dCell("der"), dCell("die Roller"), dCell("Sie faehrt Roller im Park.")] }),
      new TableRow({ children: [dCell("Computer / Tablet"), dCell("der/das"), dCell("die Computer"), dCell("Er spielt am Computer.")] }),
      new TableRow({ children: [dCell("Kreisel"), dCell("der"), dCell("die Kreisel"), dCell("Der Kreisel dreht sich schnell.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Spielzeug"), empty(),
    pBold("Aufgabe 1: Artikel ergaenzen (der / die / das)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Spielzeug", { width: 3000 }), hCell("mit Artikel", { width: 3000 }), hCell("Spielzeug", { width: 3000 }), hCell("mit Artikel", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ball"), dCell(""), dCell("Puzzle"), dCell("")] }),
        new TableRow({ children: [dCell("Puppe"), dCell(""), dCell("Teddy"), dCell("")] }),
        new TableRow({ children: [dCell("Auto"), dCell(""), dCell("Fahrrad"), dCell("")] }),
        new TableRow({ children: [dCell("Baustein"), dCell(""), dCell("Roller"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib 4 Saetze. Was spielst du gern?"),
    p("Benutze: Ich spiele gern mit ... / Ich mag ... / Mein Lieblingsspielzeug ist ..."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Alt oder neu? Sortiere das Spielzeug."),
    p("Schreib in die Tabelle: Ball / Puppe / Tablet / Lego / Karte / Fahrrad / Kreisel / Brettspiel"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Klassisches Spielzeug (kein Strom)", { width: 4700 }), hCell("Modernes Spielzeug (mit Strom)", { width: 4700 })] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Mein Lieblingsspielzeug"),
    p("Schreib 3-4 Saetze. Was ist dein Lieblingsspielzeug? Warum magst du es?"),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Spielzeug (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Spielzeug", { width: 3000 }), hCell("mit Artikel", { width: 3000 }), hCell("Spielzeug", { width: 3000 }), hCell("mit Artikel", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ball"), dCell("der Ball"), dCell("Puzzle"), dCell("das Puzzle")] }),
        new TableRow({ children: [dCell("Puppe"), dCell("die Puppe"), dCell("Teddy"), dCell("der Teddy")] }),
        new TableRow({ children: [dCell("Auto"), dCell("das Auto"), dCell("Fahrrad"), dCell("das Fahrrad")] }),
        new TableRow({ children: [dCell("Baustein"), dCell("der Baustein"), dCell("Roller"), dCell("der Roller")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterantworten"),
    bullet("Ich spiele gern mit dem Ball."),
    bullet("Ich mag das Puzzle."),
    bullet("Mein Lieblingsspielzeug ist das Fahrrad."),
    bullet("Ich spiele gern mit meiner Puppe."),
    empty(),
    pBold("Aufgabe 3: Klassisch / Modern"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Klassisch", { width: 4700 }), hCell("Modern", { width: 4700 })] }),
        new TableRow({ children: [dCell("Ball, Puppe, Lego, Karte, Fahrrad, Kreisel, Brettspiel"), dCell("Tablet, Computer")] }),
      ],
    }),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Spielzeug"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute ist Sonntag. Das Wetter ist schlecht - es regnet. Ben (8) und Mia (6) spielen zu Hause."),
          p("Ben baut mit seinen Legosteinen ein riesiges Schloss. Er hat schon 500 Steine!"),
          p("Mia spielt mit ihren Puppen. Sie hat eine Puppenfamilie: Mama, Papa und drei Kinder."),
          p("Nach dem Mittagessen spielen sie zusammen. Ben und Mia spielen Karten - Memory und dann Snap."),
          p("Am Abend darf Ben noch 30 Minuten am Computer spielen."),
          p("Mia moechte auch, aber sie ist noch zu klein. Mama sagt: Erst wenn du 8 bist!"),
          p("Ben lacht und hilft Mia beim Puzzeln. Das Puzzle hat 100 Teile und zeigt einen Bauernhof."),
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
        new TableRow({ children: [dCell("Ben baut mit Legosteinen."), dCell("")] }),
        new TableRow({ children: [dCell("Mia spielt mit dem Ball."), dCell("")] }),
        new TableRow({ children: [dCell("Sie spielen zusammen Karten."), dCell("")] }),
        new TableRow({ children: [dCell("Mia darf am Computer spielen."), dCell("")] }),
        new TableRow({ children: [dCell("Das Puzzle hat 100 Teile."), dCell("")] }),
        new TableRow({ children: [dCell("Das Wetter ist schoen heute."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was baut Ben?"),
    writeLine(55), empty(),
    p("2. Wie viele Puppen hat Mia?"),
    writeLine(55), empty(),
    p("3. Was spielen Ben und Mia zusammen nach dem Mittag?"),
    writeLine(55), empty(),
    p("4. Wie lange darf Ben am Computer spielen?"),
    writeLine(55), empty(),
    empty(),
    pBold("Aufgabe 3: Welches Spielzeug steht im Text? Schreib es auf."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Spielzeug (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Ben baut mit Legosteinen."), dCell("R")] }),
        new TableRow({ children: [dCell("Mia spielt mit dem Ball."), dCell("F (Puppen)")] }),
        new TableRow({ children: [dCell("Sie spielen zusammen Karten."), dCell("R")] }),
        new TableRow({ children: [dCell("Mia darf am Computer spielen."), dCell("F (noch zu klein)")] }),
        new TableRow({ children: [dCell("Das Puzzle hat 100 Teile."), dCell("R")] }),
        new TableRow({ children: [dCell("Das Wetter ist schoen heute."), dCell("F (es regnet)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er baut ein Schloss."),
    bullet("2. Sie hat eine Puppenfamilie: Mama, Papa und drei Kinder."),
    bullet("3. Sie spielen Karten (Memory und Snap)."),
    bullet("4. Er darf 30 Minuten spielen."),
    empty(),
    pBold("Aufgabe 3: Spielzeug im Text"),
    p("Lego/Legosteine, Puppen, Karten/Memory/Snap, Computer, Puzzle"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Spielzeug"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("spielen  -  bauen  -  Puppe  -  Ball  -  Puzzle  -  Teddy  -  Fahrrad  -  Lieblingsspielzeug  -  Teile  -  zusammen  -  draussen  -  Geschenk  -  Geburtstag  -  kaputt")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Mein __________________ ist das Fahrrad."),
    p("2. Das Puzzle hat 200 __________________."),
    p("3. Sie schlaeft mit ihrem __________________ im Bett."),
    p("4. Wir __________________ draussen mit dem __________________."),
    p("5. Er hat zum __________________ ein neues Spiel bekommen."),
    p("6. Das Auto ist __________________ - es faehrt nicht mehr."),
    empty(),
    pBold("Teil 2: Schreib die richtige Form."),
    empty(),
    p("1. Ich __________________ mit meiner Puppe.    (spielen)"),
    p("2. Ben __________________ ein Schloss aus Lego.    (bauen)"),
    p("3. Wir __________________ heute __________________ Fussball.    (spielen / draussen)"),
    p("4. Hast du ein neues __________________ bekommen?    (Geschenk)"),
    empty(),
    pBold("Teil 3: Was passt zusammen? Verbinde."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Spielzeug", { width: 3000 }), hCell("Was macht man damit?", { width: 6500 })] }),
        new TableRow({ children: [dCell("Ball"), dCell("Man baut damit Schloesser und Haeuser.")] }),
        new TableRow({ children: [dCell("Puzzle"), dCell("Man wirft ihn oder tritt dagegen.")] }),
        new TableRow({ children: [dCell("Lego"), dCell("Man legt die Teile zusammen.")] }),
        new TableRow({ children: [dCell("Fahrrad"), dCell("Man faehrt damit draussen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4 (frei): Schreib ueber dein Spielzeug."),
    p("Ich spiele gern mit __________________. Es ist __________________ und __________________."),
    writeLine(55), empty(),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Spielzeug (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Lieblingsspielzeug"),
    bullet("2. Teile"),
    bullet("3. Teddy"),
    bullet("4. spielen ... Ball"),
    bullet("5. Geburtstag"),
    bullet("6. kaputt"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. spiele"),
    bullet("2. baut"),
    bullet("3. spielen ... draussen"),
    bullet("4. Geschenk"),
    empty(),
    pBold("Teil 3: Korrekte Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Spielzeug", { width: 3000 }), hCell("Was macht man damit?", { width: 6500 })] }),
        new TableRow({ children: [dCell("Ball"), dCell("Man wirft ihn oder tritt dagegen.")] }),
        new TableRow({ children: [dCell("Puzzle"), dCell("Man legt die Teile zusammen.")] }),
        new TableRow({ children: [dCell("Lego"), dCell("Man baut damit Schloesser und Haeuser.")] }),
        new TableRow({ children: [dCell("Fahrrad"), dCell("Man faehrt damit draussen.")] }),
      ],
    }),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Spielzeug"), empty(),
    makeSpielzeugTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("mit + Dativ: Ich spiele MIT dem Ball. / MIT meiner Puppe."),
    bullet("Possessivpronomen: mein Ball (der) / meine Puppe (die) / mein Auto (das)"),
    bullet("Umlaut im Plural: Ball → Baelle, Fahrrad → Fahrraeder"),
    bullet("spielen mit (+ Dativ) | bauen aus (+ Dativ) | fahren mit (+ Dativ)"),
    bullet("kaputt = broken | neu = new | alt = old | gross = big | klein = small"),
    empty(),
    pBold("Aufgabe: Lerne 5 Spielzeuge auswendig. Schreib sie mit Artikel auf."),
    ...writeLines(5, 50),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Spielzeug (LOESUNG)"), empty(),
    makeSpielzeugTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Ich spiele mit dem Ball. (mit + Dativ: dem statt der)"),
    bullet("Ich spiele mit meiner Puppe. (mein → meine + r im Dativ)"),
    bullet("Er baut aus Bausteinen. (aus + Dativ Plural)"),
    bullet("Mein Lieblingsspielzeug ist das Fahrrad."),
    bullet("Das Puzzle hat 100 Teile. Das ist viel!"),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Spielzeug"), empty(),
    pBold("Dialog 1: Beim Spielen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"), dCell("Was spielst du gern?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich spiele gern mit Lego. Und du?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich mag Puppen und Karten.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Wollen wir zusammen spielen?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ja, gern! Was haben wir hier?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich habe ein Puzzle - 200 Teile!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Im Spielzeugladen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind"), dCell("Entschuldigung! Wo sind die Puzzles?")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Die Puzzles sind da drueben, im Regal.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Danke! Haben Sie auch Lego?")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Ja, Lego ist im Regal rechts.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Super! Das ist ein Geschenk fuer meinen Bruder.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Wie alt ist er? Ich kann helfen!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Spielzeug"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsspielzeug?"), dCell("")] }),
        new TableRow({ children: [dCell("Spielst du lieber drinnen oder draussen?"), dCell("")] }),
        new TableRow({ children: [dCell("Spielst du allein oder mit Freunden?"), dCell("")] }),
        new TableRow({ children: [dCell("Was moechtest du zum Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du ein kaputtes Spielzeug?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Was ist im Beutel?"),
    bullet("Stecke ein Spielzeug in einen Beutel."),
    bullet("Ein Kind fassen hinein (ohne hinzuschauen)."),
    bullet("Es beschreibt was es fuerchtet: gross? klein? rund? weich?"),
    bullet("Die Gruppe raet: Ist es ein Ball? Ein Teddy?"),
    bullet("Wer richtig raet, ist dran!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Spielzeug (LOESUNG)"), empty(),
    pBold("Dialog 1: Analyse"),
    bullet("Wollen wir zusammen spielen? = hoefliche Einladung mit wollen"),
    bullet("Ich habe ein Puzzle - Possessiv + Akkusativ"),
    empty(),
    pBold("Dialog 2: Schluesselphrasing"),
    bullet("Entschuldigung! = Excuse me (im Laden)"),
    bullet("da drueben = over there | rechts = on the right"),
    bullet("Das ist ein Geschenk fuer meinen Bruder. - fuer + Akkusativ"),
    empty(),
    pBold("Nuetzliche Ausdruecke fuer das Interview:"),
    bullet("Mein Lieblingsspielzeug ist ..."),
    bullet("Ich spiele lieber drinnen / draussen."),
    bullet("Ich spiele am liebsten mit meinen Freunden."),
    bullet("Zum Geburtstag moechte ich ..."),
    bullet("Ja, mein _________ ist kaputt."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Spielzeug"), empty(),
    pBold("Aufgabe 1: Ordne das Spielzeug."),
    p("Schreib in die Tabelle: Ball / Puppe / Lego / Fahrrad / Puzzle / Teddy / Computer / Karten"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Fur alle", { width: 2350 }), hCell("Eher fuer Maedchen", { width: 2350 }), hCell("Eher fuer Jungen", { width: 2350 }), hCell("Fuer Gross und Klein", { width: 2350 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Mein Zimmer – was ist drin? Zeichne oder schreib."),
    p("[BILD 1: Kinderzimmer mit Regalen. Die Schueler zeichnen oder schreiben ihr Spielzeug hinein.]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [new TableCell({
          shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 160, right: 160 },
          width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
          children: [
            p("In meinem Zimmer habe ich:"),
            empty(), empty(), empty(),
          ],
        })] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Schreib einen Wunschzettel."),
    p("Zum Geburtstag moechte ich ..."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 4: Klassen-Umfrage – Was ist euer Lieblingsspielzeug?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Name", { width: 2500 }), hCell("Lieblingsspielzeug", { width: 3000 }), hCell("Satz", { width: 4000 })] }),
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
    h1("Bildaufgaben – Spielzeug (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Hinweis fuer Lehrkraft"),
    pItalic("Keine Musterloesung - die Kategorisierung ist subjektiv. Diskussion im Plenum empfohlen. Wichtig: darauf hinweisen, dass Spielzeug kein Geschlecht hat."),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: Je nach Zimmer und Spielzeug verschieden."),
    pItalic("Aufgabe 3: Muster - Zum Geburtstag moechte ich ein neues Fahrrad, ein grosses Lego-Set und viele Karten."),
    pItalic("Aufgabe 4: Klassenergebnisse variieren. Satzbeispiel: Mein Lieblingsspielzeug ist das Fahrrad."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Spielzeug");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
