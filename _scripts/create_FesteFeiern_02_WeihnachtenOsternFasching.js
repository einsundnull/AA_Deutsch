"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "12_FesteFeiern", "02_WeihnachtenOsternFasching");
const TOPIC     = "A1_Kinder_FesteFeiern_02_WeihnachtenOsternFasching";
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

// ── Feste-Tabelle ─────────────────────────────────────────────────────────────
function makeFesteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Fest", { width: 2000 }), hCell("Wann?", { width: 2000 }), hCell("Typische Sachen", { width: 5500 })] }),
      new TableRow({ children: [dCell("Weihnachten"), dCell("24./25./26. Dezember"), dCell("Tannenbaum, Geschenke, Lichter, Pluetzchen, Familie")] }),
      new TableRow({ children: [dCell("Silvester / Neujahr"), dCell("31.12. / 1.1."), dCell("Feuerwerk, Sekt, neues Jahr")] }),
      new TableRow({ children: [dCell("Fasching / Karneval"), dCell("Februar / Maerz"), dCell("Kostueme, Maske, Umzug, lustig")] }),
      new TableRow({ children: [dCell("Ostern"), dCell("Maerz / April"), dCell("Eier, Osterhase, Suessigkeiten suchen")] }),
      new TableRow({ children: [dCell("der Tannenbaum"), dCell("Nomen"), dCell("Wir schmuecken den Tannenbaum.")] }),
      new TableRow({ children: [dCell("das Geschenk"), dCell("Nomen"), dCell("Unter dem Baum sind Geschenke.")] }),
      new TableRow({ children: [dCell("die Pluetzchen"), dCell("Nomen"), dCell("Mama backt Pluetzchen.")] }),
      new TableRow({ children: [dCell("das Kostuem"), dCell("Nomen"), dCell("Ich habe ein Kostuem als Pirat.")] }),
      new TableRow({ children: [dCell("die Maske"), dCell("Nomen"), dCell("Ich trage eine bunte Maske.")] }),
      new TableRow({ children: [dCell("der Osterhase"), dCell("Nomen"), dCell("Der Osterhase versteckt Eier.")] }),
      new TableRow({ children: [dCell("das Osterei"), dCell("Nomen"), dCell("Ich finde viele bunte Ostereier.")] }),
      new TableRow({ children: [dCell("schmuecken"), dCell("Verb"), dCell("Wir schmuecken den Baum.")] }),
      new TableRow({ children: [dCell("verstecken / suchen"), dCell("Verb"), dCell("Wir verstecken und suchen Eier.")] }),
      new TableRow({ children: [dCell("sich verkleiden"), dCell("Verb"), dCell("Wir verkleiden uns als Tiere.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Weihnachten, Ostern & Fasching"), empty(),
    pBold("Aufgabe 1: Welches Fest ist das? Schreib: Weihnachten / Ostern / Fasching."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Fest", { width: 3000 })] }),
        new TableRow({ children: [dCell("Wir verstecken bunte Eier im Garten."), dCell("")] }),
        new TableRow({ children: [dCell("Wir schmuecken einen Tannenbaum."), dCell("")] }),
        new TableRow({ children: [dCell("Wir verkleiden uns mit Kostuemen und Masken."), dCell("")] }),
        new TableRow({ children: [dCell("Wir essen Pluetzchen und singen Lieder."), dCell("")] }),
        new TableRow({ children: [dCell("Der Osterhase bringt Suessigkeiten."), dCell("")] }),
        new TableRow({ children: [dCell("Es gibt einen lustigen Umzug auf der Strasse."), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Ergaenze die Saetze."),
    empty(),
    p("1. Im Dezember feiern wir __________________."),
    p("2. Im Maerz oder April feiern wir __________________."),
    p("3. Im Februar feiern wir __________________."),
    p("4. An Weihnachten bekommen wir viele __________________."),
    p("5. An Ostern suchen wir __________________ im Garten."),
    p("6. An Fasching tragen wir __________________ und Masken."),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4-5 Saetze ueber dein Lieblingsfest."),
    p("Mein Lieblingsfest ist ... / An ... feiern wir ... / Ich mag besonders ..."),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    pBold("Aufgabe 1:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 6500 }), hCell("Fest", { width: 3000 })] }),
        new TableRow({ children: [dCell("Wir verstecken bunte Eier im Garten."), dCell("Ostern")] }),
        new TableRow({ children: [dCell("Wir schmuecken einen Tannenbaum."), dCell("Weihnachten")] }),
        new TableRow({ children: [dCell("Wir verkleiden uns mit Kostuemen und Masken."), dCell("Fasching")] }),
        new TableRow({ children: [dCell("Wir essen Pluetzchen und singen Lieder."), dCell("Weihnachten")] }),
        new TableRow({ children: [dCell("Der Osterhase bringt Suessigkeiten."), dCell("Ostern")] }),
        new TableRow({ children: [dCell("Es gibt einen lustigen Umzug auf der Strasse."), dCell("Fasching")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2:"),
    bullet("1. Weihnachten"), bullet("2. Ostern"), bullet("3. Fasching"),
    bullet("4. Geschenke"), bullet("5. Eier / Ostereier"), bullet("6. Kostueme"),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Mein Lieblingsfest ist Weihnachten. An Weihnachten feiern wir mit der Familie. Wir schmuecken den Tannenbaum mit bunten Lichtern. Es gibt viele Geschenke unter dem Baum. Ich liebe Weihnachten, weil alle gluecklich sind!"),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Weihnachten, Ostern & Fasching"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo, ich bin Sophie! Ich erzaehle dir von meinen Lieblingsfesten."),
          p("Weihnachten ist im Dezember. Wir schmuecken einen grossen Tannenbaum mit bunten Kugeln und Lichtern. Mama backt Pluetzchen. Am 24. Dezember bekommen wir Geschenke. Wir singen Weihnachtslieder."),
          p("Im Februar ist Fasching. Ich verkleide mich gern. Letztes Jahr war ich eine Prinzessin. Mein Bruder war ein Pirat. In der Stadt gibt es einen lustigen Umzug mit Musik."),
          p("Im April ist Ostern. Der Osterhase versteckt bunte Eier und Schokolade im Garten. Ich suche sie zusammen mit meinen Geschwistern. Wer findet die meisten?"),
          p("Mein Lieblingsfest ist Weihnachten, weil ich die Atmosphaere liebe!"),
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
        new TableRow({ children: [dCell("Weihnachten ist im November."), dCell("")] }),
        new TableRow({ children: [dCell("Sophie bekommt Geschenke am 24. Dezember."), dCell("")] }),
        new TableRow({ children: [dCell("Mama backt Pluetzchen."), dCell("")] }),
        new TableRow({ children: [dCell("Letztes Jahr war Sophie eine Hexe."), dCell("")] }),
        new TableRow({ children: [dCell("Der Osterhase versteckt Eier im Garten."), dCell("")] }),
        new TableRow({ children: [dCell("Sophies Lieblingsfest ist Ostern."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wann ist Weihnachten?"),
    writeLine(55), empty(),
    p("2. Wie schmuecken sie den Tannenbaum?"),
    writeLine(55), empty(),
    p("3. Wie hat Sophie sich an Fasching verkleidet?"),
    writeLine(55), empty(),
    p("4. Was macht der Osterhase?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welches ist Sophies Lieblingsfest und warum? Schreib einen Satz."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Weihnachten ist im November."), dCell("F (im Dezember)")] }),
        new TableRow({ children: [dCell("Sophie bekommt Geschenke am 24. Dezember."), dCell("R")] }),
        new TableRow({ children: [dCell("Mama backt Pluetzchen."), dCell("R")] }),
        new TableRow({ children: [dCell("Letztes Jahr war Sophie eine Hexe."), dCell("F (Prinzessin)")] }),
        new TableRow({ children: [dCell("Der Osterhase versteckt Eier im Garten."), dCell("R")] }),
        new TableRow({ children: [dCell("Sophies Lieblingsfest ist Ostern."), dCell("F (Weihnachten)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Weihnachten ist im Dezember."),
    bullet("2. Mit bunten Kugeln und Lichtern."),
    bullet("3. Sie war eine Prinzessin."),
    bullet("4. Er versteckt bunte Eier und Schokolade im Garten."),
    empty(),
    pBold("Aufgabe 3:"),
    p("Sophies Lieblingsfest ist Weihnachten, weil sie die Atmosphaere liebt."),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Weihnachten, Ostern & Fasching"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Weihnachten  -  Ostern  -  Fasching  -  Tannenbaum  -  Geschenke  -  Pluetzchen  -  Eier  -  Osterhase  -  Kostuem  -  Maske  -  schmuecken  -  verstecken  -  verkleiden  -  feiern")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Weihnachten"),
    empty(),
    p("1. Im Dezember feiern wir __________________."),
    p("2. Wir __________________ einen grossen Tannenbaum."),
    p("3. Mama backt leckere __________________."),
    p("4. Unter dem __________________ liegen viele __________________."),
    empty(),
    pBold("Teil 2: Ostern"),
    empty(),
    p("1. An __________________ kommt der __________________."),
    p("2. Er __________________ bunte __________________ im Garten."),
    p("3. Wir suchen die Eier und freuen uns!"),
    empty(),
    pBold("Teil 3: Fasching"),
    empty(),
    p("1. An __________________ verkleiden wir uns mit einem __________________."),
    p("2. Manchmal trage ich auch eine __________________ vor dem Gesicht."),
    p("3. Wir __________________ mit Freunden auf der Strasse."),
    empty(),
    pBold("Teil 4: Welches Fest? Schreib es."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aktivitaet", { width: 6500 }), hCell("Fest", { width: 3000 })] }),
        new TableRow({ children: [dCell("Eier suchen"), dCell("")] }),
        new TableRow({ children: [dCell("Geschenke unter dem Baum"), dCell("")] }),
        new TableRow({ children: [dCell("Sich verkleiden und Umzug"), dCell("")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    pBold("Teil 1: Weihnachten"),
    bullet("1. Weihnachten"),
    bullet("2. schmuecken"),
    bullet("3. Pluetzchen"),
    bullet("4. Tannenbaum ... Geschenke"),
    empty(),
    pBold("Teil 2: Ostern"),
    bullet("1. Ostern ... Osterhase"),
    bullet("2. versteckt ... Eier"),
    empty(),
    pBold("Teil 3: Fasching"),
    bullet("1. Fasching ... Kostuem"),
    bullet("2. Maske"),
    bullet("3. feiern"),
    empty(),
    pBold("Teil 4:"),
    bullet("Eier suchen → Ostern"),
    bullet("Geschenke unter dem Baum → Weihnachten"),
    bullet("Sich verkleiden und Umzug → Fasching"),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Weihnachten, Ostern & Fasching"), empty(),
    makeFesteTable(),
    empty(),
    pBold("Wuensche zu den Festen:"),
    bullet("Frohe Weihnachten! / Frohes Fest!"),
    bullet("Frohe Ostern!"),
    bullet("Helau! / Alaaf! (Faschingsrufe in Deutschland)"),
    bullet("Frohes neues Jahr! / Guten Rutsch! (zu Silvester)"),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("An + Fest (Dativ): an Weihnachten / an Ostern / an Fasching"),
    bullet("Im + Monat: im Dezember (Weihnachten), im Februar (Fasching), im April (Ostern)"),
    bullet("Reflexive Verben: sich verkleiden — Ich verkleide mich. Du verkleidest dich."),
    bullet("Trennbare Verben: ausblasen, einladen, schmuecken (nicht trennbar)"),
    empty(),
    pBold("Aufgabe: Schreib zu jedem Fest 2 Saetze."),
    p("Weihnachten:"), writeLine(55), empty(),
    p("Ostern:"), writeLine(55), empty(),
    p("Fasching:"), writeLine(55), empty(),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    makeFesteTable(),
    empty(),
    pBold("Musterantworten:"),
    bullet("Weihnachten: An Weihnachten schmuecken wir den Tannenbaum. Wir bekommen viele Geschenke."),
    bullet("Ostern: An Ostern versteckt der Osterhase bunte Eier. Wir suchen sie im Garten."),
    bullet("Fasching: An Fasching verkleide ich mich gern. Letztes Jahr war ich ein Pirat."),
    empty(),
    pBold("Wichtige Strukturen:"),
    bullet("Wann ist Weihnachten? - Im Dezember. / Am 25. Dezember."),
    bullet("Was machst du an Ostern? - Ich suche Eier mit meiner Familie."),
    bullet("Hast du ein Faschingskostuem? - Ja, ich bin eine Hexe."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Weihnachten, Ostern & Fasching"), empty(),
    pBold("Dialog 1: Weihnachten"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Wie feiert ihr Weihnachten?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Wir treffen uns mit der ganzen Familie. Oma kocht und Opa singt.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Habt ihr einen Tannenbaum?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ja! Wir schmuecken ihn am 23. Dezember.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Was wuenschst du dir dieses Jahr?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ein neues Fahrrad! Und du?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich wuensche mir Buecher und einen warmen Pullover!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Fasching"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Was bist du dieses Jahr an Fasching?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Ich verkleide mich als Astronaut! Und du?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ich werde ein Schmetterling. Mama macht mein Kostuem.")] }),
        new TableRow({ children: [dCell("Max"), dCell("Cool! Gehen wir zusammen zum Umzug?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ja, gern! Helau!")] }),
        new TableRow({ children: [dCell("Max"), dCell("Helau!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 3: Ostern"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Papa"), dCell("Kinder, Frohe Ostern! Sucht im Garten!")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Yippie! Wo sind die Eier?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Schau, hier ist eins unter dem Baum!")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich habe drei in den Blumen gefunden!")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Wer hat die meisten?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Lieblingsfest"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsfest?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie feierst du Weihnachten?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du an Ostern?"), dCell("")] }),
        new TableRow({ children: [dCell("Verkleidest du dich an Fasching?"), dCell("")] }),
        new TableRow({ children: [dCell("Was wuenschst du dir zu Weihnachten?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Pantomime der Feste"),
    bullet("Ein Kind spielt eine Aktivitaet eines Festes pantomimisch (z. B. Eier suchen)."),
    bullet("Die Gruppe raet das Fest und die Aktivitaet auf Deutsch."),
    bullet("Wer richtig raet, ist als naechstes dran!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie feiert ihr ...? = ihr-Form Plural"),
    bullet("Wir treffen uns = sich treffen (reflexiv): wir treffen uns / sie trifft sich"),
    bullet("Was wuenschst du dir? = sich (Dativ) etwas wuenschen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was bist du? = was sein-Frage fuer Identitaet/Verkleidung"),
    bullet("Ich verkleide mich als + Akkusativ"),
    bullet("Helau! / Alaaf! = traditionelle Faschingsrufe"),
    empty(),
    pBold("Dialog 3: Schluesselstrukturen"),
    bullet("Frohe Ostern! = Standardgruss"),
    bullet("Wo sind die Eier? = Ortsfrage mit Verb sein"),
    bullet("Ich habe ... gefunden = Perfekt mit haben + ge-Form"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Festname korrekt (1P)"),
    bullet("An + Fest oder Im + Monat verwendet (1P)"),
    bullet("Aktivitaeten passend zum Fest (2P)"),
    bullet("Reflexive Verben korrekt (verkleiden / wuenschen) (1P)"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Weihnachten, Ostern & Fasching"), empty(),
    pBold("Aufgabe 1: [BILD 1: Drei Bilder — Tannenbaum mit Geschenken / Bunte Ostereier / Faschingsumzug]"),
    p("Welches Fest ist das? Schreib unter jedes Bild den Namen und 1-2 Saetze."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild A", { width: 3166 }), hCell("Bild B", { width: 3168 }), hCell("Bild C", { width: 3166 })] }),
        new TableRow({ children: [dCell("[Tannenbaum]"), dCell("[Bunte Eier]"), dCell("[Faschingsumzug]")] }),
        new TableRow({ children: [dCell("Fest: ________"), dCell("Fest: ________"), dCell("Fest: ________")] }),
        new TableRow({ children: [dCell("Satz: ________"), dCell("Satz: ________"), dCell("Satz: ________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was gehoert zu welchem Fest? Schreib W (Weihnachten), O (Ostern) oder F (Fasching)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sache", { width: 6500 }), hCell("W / O / F", { width: 3000 })] }),
        new TableRow({ children: [dCell("Tannenbaum"), dCell("")] }),
        new TableRow({ children: [dCell("Osterhase"), dCell("")] }),
        new TableRow({ children: [dCell("Maske"), dCell("")] }),
        new TableRow({ children: [dCell("Pluetzchen"), dCell("")] }),
        new TableRow({ children: [dCell("Bunte Eier"), dCell("")] }),
        new TableRow({ children: [dCell("Kostuem"), dCell("")] }),
        new TableRow({ children: [dCell("Geschenke unter dem Baum"), dCell("")] }),
        new TableRow({ children: [dCell("Umzug auf der Strasse"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: [BILD 3: Kinder oeffnen Geschenke unter dem Tannenbaum]"),
    p("Was siehst du auf dem Bild? Welches Fest ist das? Schreib 3 Saetze."),
    empty(),
    ...writeLines(3, 55),
    empty(),
    pBold("Aufgabe 4: Male dein Lieblingsfest!"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Lieblingsfest:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Mein Lieblingsfest ist __________________."),
    p("Ich mag dieses Fest, weil: __________________"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Weihnachten, Ostern & Fasching (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Loesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1500 }), hCell("Fest", { width: 2500 }), hCell("Beispielsatz", { width: 5500 })] }),
        new TableRow({ children: [dCell("A"), dCell("Weihnachten"), dCell("An Weihnachten schmuecken wir einen Tannenbaum.")] }),
        new TableRow({ children: [dCell("B"), dCell("Ostern"), dCell("An Ostern suchen wir bunte Eier.")] }),
        new TableRow({ children: [dCell("C"), dCell("Fasching"), dCell("An Fasching verkleiden wir uns und feiern auf der Strasse.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sache", { width: 6500 }), hCell("Fest", { width: 3000 })] }),
        new TableRow({ children: [dCell("Tannenbaum"), dCell("W")] }),
        new TableRow({ children: [dCell("Osterhase"), dCell("O")] }),
        new TableRow({ children: [dCell("Maske"), dCell("F")] }),
        new TableRow({ children: [dCell("Pluetzchen"), dCell("W")] }),
        new TableRow({ children: [dCell("Bunte Eier"), dCell("O")] }),
        new TableRow({ children: [dCell("Kostuem"), dCell("F")] }),
        new TableRow({ children: [dCell("Geschenke unter dem Baum"), dCell("W")] }),
        new TableRow({ children: [dCell("Umzug auf der Strasse"), dCell("F")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Auf dem Bild sind Kinder. Sie oeffnen Geschenke unter einem Tannenbaum. Es ist Weihnachten."),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort — alle drei Feste moeglich."),
    pItalic("Muster: Mein Lieblingsfest ist Ostern. Ich mag dieses Fest, weil ich gern bunte Eier suche."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Weihnachten, Ostern, Fasching");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
