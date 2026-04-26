"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "12_FesteFeiern", "01_Geburtstag");
const TOPIC     = "A1_Kinder_FesteFeiern_01_Geburtstag";
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

// ── Geburtstag-Tabelle ────────────────────────────────────────────────────────
function makeGeburtstagTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Wortart", { width: 1400 }), hCell("Beispielsatz", { width: 5300 })] }),
      new TableRow({ children: [dCell("der Geburtstag"), dCell("Nomen"), dCell("Mein Geburtstag ist im Mai.")] }),
      new TableRow({ children: [dCell("die Geburtstagsparty"), dCell("Nomen"), dCell("Wir machen eine Geburtstagsparty.")] }),
      new TableRow({ children: [dCell("der Kuchen / die Torte"), dCell("Nomen"), dCell("Mama backt einen Kuchen.")] }),
      new TableRow({ children: [dCell("die Kerze / Kerzen"), dCell("Nomen"), dCell("Auf der Torte sind 8 Kerzen.")] }),
      new TableRow({ children: [dCell("das Geschenk / Geschenke"), dCell("Nomen"), dCell("Ich bekomme viele Geschenke.")] }),
      new TableRow({ children: [dCell("die Karte"), dCell("Nomen"), dCell("Oma schickt eine Karte.")] }),
      new TableRow({ children: [dCell("der Luftballon"), dCell("Nomen"), dCell("Bunte Luftballons haengen im Zimmer.")] }),
      new TableRow({ children: [dCell("der Gast / die Gaeste"), dCell("Nomen"), dCell("Meine Freunde sind die Gaeste.")] }),
      new TableRow({ children: [dCell("Herzlichen Glueckwunsch!"), dCell("Wunsch"), dCell("Herzlichen Glueckwunsch zum Geburtstag!")] }),
      new TableRow({ children: [dCell("Alles Gute!"), dCell("Wunsch"), dCell("Alles Gute zum Geburtstag!")] }),
      new TableRow({ children: [dCell("feiern"), dCell("Verb"), dCell("Wir feiern meinen Geburtstag.")] }),
      new TableRow({ children: [dCell("einladen"), dCell("Verb"), dCell("Ich lade meine Freunde ein.")] }),
      new TableRow({ children: [dCell("schenken"), dCell("Verb"), dCell("Mama schenkt mir ein Buch.")] }),
      new TableRow({ children: [dCell("blasen (Kerzen)"), dCell("Verb"), dCell("Ich blase die Kerzen aus.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Geburtstag"), empty(),
    pBold("Aufgabe 1: Was passt zum Geburtstag? Schreib das richtige Wort."),
    p("Kuchen / Kerzen / Geschenke / Luftballons / Gaeste / Karte"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Wort", { width: 3000 })] }),
        new TableRow({ children: [dCell("Bunte Ballons mit Luft fuer die Party."), dCell("")] }),
        new TableRow({ children: [dCell("Suess, mit Sahne und Kerzen darauf."), dCell("")] }),
        new TableRow({ children: [dCell("Sie brennen auf der Torte. Man muss sie ausblasen."), dCell("")] }),
        new TableRow({ children: [dCell("Eine Person schreibt darin: Alles Gute!"), dCell("")] }),
        new TableRow({ children: [dCell("Die Freunde, die zur Party kommen."), dCell("")] }),
        new TableRow({ children: [dCell("Bunte Pakete, die man bekommt."), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib die Saetze richtig."),
    empty(),
    p("1. ist / mein / im / Mai / Geburtstag"),
    writeLine(55), empty(),
    p("2. ich / Freunde / ein / lade / meine"),
    writeLine(55), empty(),
    p("3. backt / Mama / einen / Kuchen"),
    writeLine(55), empty(),
    p("4. blase / Kerzen / die / aus / ich"),
    writeLine(55), empty(),
    p("5. wir / die / spielen / und / Geschenke / oeffnen"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib eine Geburtstagskarte fuer einen Freund (3-4 Saetze)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          p("Liebe/r ____________________,"),
          empty(), empty(), empty(),
          p("Dein/e ____________________"),
        ],
      })] })],
    }),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Geburtstag (LOESUNG)"), empty(),
    pBold("Aufgabe 1:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Wort", { width: 3000 })] }),
        new TableRow({ children: [dCell("Bunte Ballons mit Luft fuer die Party."), dCell("Luftballons")] }),
        new TableRow({ children: [dCell("Suess, mit Sahne und Kerzen darauf."), dCell("Kuchen / Torte")] }),
        new TableRow({ children: [dCell("Sie brennen auf der Torte. Man muss sie ausblasen."), dCell("Kerzen")] }),
        new TableRow({ children: [dCell("Eine Person schreibt darin: Alles Gute!"), dCell("Karte")] }),
        new TableRow({ children: [dCell("Die Freunde, die zur Party kommen."), dCell("Gaeste")] }),
        new TableRow({ children: [dCell("Bunte Pakete, die man bekommt."), dCell("Geschenke")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Saetze sortieren"),
    bullet("1. Mein Geburtstag ist im Mai."),
    bullet("2. Ich lade meine Freunde ein."),
    bullet("3. Mama backt einen Kuchen."),
    bullet("4. Ich blase die Kerzen aus."),
    bullet("5. Wir spielen und oeffnen die Geschenke."),
    empty(),
    pBold("Aufgabe 3: Musterkarte"),
    pItalic("Liebe Anna, herzlichen Glueckwunsch zum Geburtstag! Ich wuensche dir alles Gute und viel Glueck. Ich freue mich schon auf deine Party! Deine Mia"),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Geburtstag"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute hat Lukas Geburtstag. Er wird 9 Jahre alt!"),
          p("Am Morgen kommt seine Familie ins Zimmer und singt: Happy Birthday, Lukas!"),
          p("Mama gibt ihm ein grosses Geschenk. Es ist ein neues Fahrrad!"),
          p("Am Nachmittag kommen seine Freunde. Sie sind sieben Gaeste."),
          p("Im Wohnzimmer haengen viele bunte Luftballons."),
          p("Auf dem Tisch steht eine grosse Schokoladentorte mit 9 Kerzen."),
          p("Lukas blaest die Kerzen aus und alle klatschen. Er bekommt viele Geschenke."),
          p("Die Kinder spielen, essen Kuchen und trinken Limonade."),
          p("Am Abend sind alle muede. Lukas sagt: Das war mein bester Geburtstag!"),
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
        new TableRow({ children: [dCell("Lukas wird 8 Jahre alt."), dCell("")] }),
        new TableRow({ children: [dCell("Mama schenkt ihm ein Fahrrad."), dCell("")] }),
        new TableRow({ children: [dCell("Sechs Freunde kommen zur Party."), dCell("")] }),
        new TableRow({ children: [dCell("Im Wohnzimmer sind keine Luftballons."), dCell("")] }),
        new TableRow({ children: [dCell("Auf der Torte sind 9 Kerzen."), dCell("")] }),
        new TableRow({ children: [dCell("Lukas mag seinen Geburtstag."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie alt wird Lukas?"),
    writeLine(55), empty(),
    p("2. Was bekommt Lukas von Mama?"),
    writeLine(55), empty(),
    p("3. Wie viele Gaeste kommen?"),
    writeLine(55), empty(),
    p("4. Was machen die Kinder auf der Party?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Wuensche kann man zum Geburtstag sagen? Schreib 2 Saetze."),
    writeLine(55), empty(), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Geburtstag (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Lukas wird 8 Jahre alt."), dCell("F (9 Jahre)")] }),
        new TableRow({ children: [dCell("Mama schenkt ihm ein Fahrrad."), dCell("R")] }),
        new TableRow({ children: [dCell("Sechs Freunde kommen zur Party."), dCell("F (sieben Gaeste)")] }),
        new TableRow({ children: [dCell("Im Wohnzimmer sind keine Luftballons."), dCell("F (viele bunte)")] }),
        new TableRow({ children: [dCell("Auf der Torte sind 9 Kerzen."), dCell("R")] }),
        new TableRow({ children: [dCell("Lukas mag seinen Geburtstag."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Lukas wird 9 Jahre alt."),
    bullet("2. Er bekommt ein neues Fahrrad."),
    bullet("3. Sieben Gaeste kommen."),
    bullet("4. Sie spielen, essen Kuchen und trinken Limonade."),
    empty(),
    pBold("Aufgabe 3: Geburtstagswuensche"),
    bullet("Herzlichen Glueckwunsch zum Geburtstag!"),
    bullet("Alles Gute zum Geburtstag!"),
    bullet("Ich wuensche dir viel Glueck!"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Geburtstag"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Geburtstag  -  Kuchen  -  Kerzen  -  Geschenke  -  Luftballons  -  Gaeste  -  Karte  -  Freunde  -  feiern  -  einladen  -  schenken  -  blasen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Heute habe ich __________________! Ich werde 9 Jahre alt."),
    p("2. Mama backt einen grossen __________________ mit Schokolade."),
    p("3. Auf der Torte brennen 9 __________________."),
    p("4. Ich __________________ die Kerzen aus."),
    p("5. Meine Freunde bringen viele __________________ mit."),
    p("6. Im Zimmer haengen bunte __________________."),
    p("7. Oma schickt eine schoene __________________."),
    p("8. Ich __________________ meine __________________ ein."),
    empty(),
    pBold("Teil 2: Dialog – Die Einladung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Tom"), dCell("Hallo Lisa! Am Samstag habe ich __________________.")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Oh, herzlichen __________________ schon mal!")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Danke! Ich __________________ dich ein. Kommst du?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Sehr gern! Ich bringe ein __________________ mit.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Toll! Wir __________________ ab 14 Uhr.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Schreib 2 Saetze ueber deinen letzten Geburtstag."),
    writeLine(55), empty(), writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Geburtstag (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Geburtstag"), bullet("2. Kuchen"), bullet("3. Kerzen"),
    bullet("4. blase"), bullet("5. Geschenke"), bullet("6. Luftballons"),
    bullet("7. Karte"), bullet("8. lade ... Freunde / Gaeste"),
    empty(),
    pBold("Teil 2: Dialog"),
    bullet("Tom: ... habe ich Geburtstag."),
    bullet("Lisa: Oh, herzlichen Glueckwunsch schon mal!"),
    bullet("Tom: ... Ich lade dich ein."),
    bullet("Lisa: ... Ich bringe ein Geschenk mit."),
    bullet("Tom: ... Wir feiern ab 14 Uhr."),
    empty(),
    pBold("Teil 3: individuelle Antworten — alle sinnvollen akzeptieren."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Geburtstag"), empty(),
    makeGeburtstagTable(),
    empty(),
    pBold("Wuensche zum Geburtstag:"),
    bullet("Herzlichen Glueckwunsch zum Geburtstag!"),
    bullet("Alles Gute zum Geburtstag!"),
    bullet("Ich wuensche dir viel Glueck und Gesundheit!"),
    bullet("Alles Liebe zum Geburtstag!"),
    bullet("Hab einen schoenen Tag!"),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Wann hast du Geburtstag? - Im + Monat / Am + Datum"),
    bullet("Wie alt wirst du? - Ich werde X Jahre alt."),
    bullet("einladen = trennbares Verb: Ich lade dich ein."),
    bullet("ausblasen = trennbares Verb: Ich blase die Kerzen aus."),
    bullet("schenken = jemandem etwas schenken: Ich schenke dir ein Buch."),
    empty(),
    pBold("Aufgabe: Lerne 6 Woerter mit Artikel und schreib einen Beispielsatz."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Geburtstag (LOESUNG)"), empty(),
    makeGeburtstagTable(),
    empty(),
    pBold("Musterantworten:"),
    bullet("der Geburtstag — Mein Geburtstag ist am 12. Mai."),
    bullet("der Kuchen — Mama backt einen Schokoladenkuchen."),
    bullet("die Kerze — Auf der Torte sind acht Kerzen."),
    bullet("das Geschenk — Ich bekomme viele Geschenke von meinen Freunden."),
    bullet("der Luftballon — Wir haengen bunte Luftballons im Zimmer auf."),
    bullet("der Gast — Zehn Gaeste kommen zu meiner Party."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Geburtstag"), empty(),
    pBold("Dialog 1: Glueckwunsch"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Sara"), dCell("Hallo Tim! Herzlichen Glueckwunsch zum Geburtstag!")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Vielen Dank, Sara!")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Wie alt wirst du heute?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich werde 10 Jahre alt!")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Wow! Schon zweistellig! Was hast du bekommen?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ein Skateboard und viele Buecher.")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Toll! Ich habe auch etwas fuer dich. Hier!")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Oh, danke! Du bist die Beste!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Die Einladung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Hallo Max! Ich habe am Samstag Geburtstag. Kommst du?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Klar! Wann beginnt die Party?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Um 15 Uhr bei mir zu Hause.")] }),
        new TableRow({ children: [dCell("Max"), dCell("Was wuenschst du dir denn?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ich mag Buecher und Musik. Aber bring nichts Grosses!")] }),
        new TableRow({ children: [dCell("Max"), dCell("Okay! Ich freue mich auf deine Party!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Geburtstag"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wann hast du Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie alt wirst du dieses Jahr?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie feierst du deinen Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("Was war dein bestes Geschenk?"), dCell("")] }),
        new TableRow({ children: [dCell("Was wuenschst du dir dieses Jahr?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Geburtstagslied"),
    bullet("Singt zusammen: Happy Birthday auf Deutsch."),
    bullet("'Zum Geburtstag viel Glueck, zum Geburtstag viel Glueck...'"),
    bullet("Wer Geburtstag hat, steht in der Mitte und blaest imaginaere Kerzen aus."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Geburtstag (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Herzlichen Glueckwunsch zum Geburtstag! = Standardgratulation"),
    bullet("Wie alt wirst du? - Ich werde X Jahre alt. = werden + Akkusativ"),
    bullet("Was hast du bekommen? = Perfekt von 'bekommen' (got, received)"),
    bullet("Du bist die Beste! = Superlativ als Kompliment"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Ich habe am Samstag Geburtstag. = haben + Geburtstag"),
    bullet("Wann beginnt die Party? = Frage nach Uhrzeit"),
    bullet("Was wuenschst du dir? = sich (Dativ) etwas wuenschen"),
    bullet("Ich freue mich auf + Akkusativ = vorfreude"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Geburtstag mit korrekter Praeposition (im / am)"),
    bullet("Alter mit 'werden': Ich werde 9 Jahre alt."),
    bullet("Aktivitaeten der Geburtstagsfeier nennen"),
    bullet("Wuensche und Geschenke ausdruecken"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Geburtstag"), empty(),
    pBold("Aufgabe 1: [BILD 1: Geburtstagstisch mit Torte, Kerzen, Geschenken, Luftballons]"),
    p("Was siehst du auf dem Bild? Schreib 4-5 Saetze."),
    empty(),
    ...writeLines(5, 55),
    empty(),
    pBold("Aufgabe 2: Was gehoert zum Geburtstag? Verbinde."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild]", { width: 4750 }), hCell("Wort", { width: 4750 })] }),
        new TableRow({ children: [dCell("[Bild: Torte mit Kerzen]"), dCell("der Luftballon")] }),
        new TableRow({ children: [dCell("[Bild: Bunter Ballon]"), dCell("die Geburtstagstorte")] }),
        new TableRow({ children: [dCell("[Bild: Geschenkpaket mit Schleife]"), dCell("die Karte")] }),
        new TableRow({ children: [dCell("[Bild: Brennende Kerze]"), dCell("das Geschenk")] }),
        new TableRow({ children: [dCell("[Bild: Geburtstagskarte]"), dCell("die Kerze")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: [BILD 3: Kind blaest Kerzen aus]"),
    p("Wie alt wird das Kind? Was wuenscht es sich? Schreib 3 Saetze."),
    empty(),
    ...writeLines(3, 55),
    empty(),
    pBold("Aufgabe 4: Male deine Traum-Geburtstagstorte!"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Meine Traum-Torte:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Meine Torte hat: ____________________________________________"),
    p("Auf der Torte sind ____ Kerzen."),
    p("Sie schmeckt nach ____________________________________________"),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Geburtstag (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterantwort"),
    pItalic("Auf dem Bild ist ein Geburtstagstisch. Es gibt eine grosse Torte mit Kerzen. Daneben liegen viele bunte Geschenke. An der Decke haengen Luftballons. Die Kinder freuen sich auf die Party."),
    empty(),
    pBold("Aufgabe 2: Richtige Zuordnung"),
    bullet("Torte mit Kerzen → die Geburtstagstorte"),
    bullet("Bunter Ballon → der Luftballon"),
    bullet("Geschenkpaket → das Geschenk"),
    bullet("Brennende Kerze → die Kerze"),
    bullet("Geburtstagskarte → die Karte"),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Das Kind wird 8 Jahre alt. Es blaest die Kerzen aus. Es wuenscht sich ein neues Fahrrad."),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort"),
    pItalic("Meine Torte hat Schokolade und Erdbeeren. Auf der Torte sind 9 Kerzen. Sie schmeckt nach Schokolade und Vanille."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Geburtstag");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
