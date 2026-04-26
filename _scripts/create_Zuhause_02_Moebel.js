"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "10_Zuhause", "02_Moebel");
const TOPIC     = "A1_Kinder_Zuhause_02_Moebel";
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

// ── Moebel-Tabelle ────────────────────────────────────────────────────────────
function makeMoebelTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Moebel", { width: 2000 }), hCell("Artikel", { width: 1200 }), hCell("Raum", { width: 2200 }), hCell("Beispielsatz", { width: 4100 })] }),
      new TableRow({ children: [dCell("Bett"), dCell("das"), dCell("Schlafzimmer"), dCell("Ich schlafe in meinem Bett.")] }),
      new TableRow({ children: [dCell("Sofa / Couch"), dCell("das"), dCell("Wohnzimmer"), dCell("Wir sitzen auf dem Sofa.")] }),
      new TableRow({ children: [dCell("Tisch"), dCell("der"), dCell("Kueche / Esszimmer"), dCell("Wir essen am Tisch.")] }),
      new TableRow({ children: [dCell("Stuhl"), dCell("der"), dCell("Kueche / Schreibtisch"), dCell("Er sitzt auf dem Stuhl.")] }),
      new TableRow({ children: [dCell("Schrank"), dCell("der"), dCell("Schlafzimmer / Flur"), dCell("Die Kleider sind im Schrank.")] }),
      new TableRow({ children: [dCell("Regal"), dCell("das"), dCell("Kinderzimmer / Wohnzimmer"), dCell("Die Buecher stehen im Regal.")] }),
      new TableRow({ children: [dCell("Schreibtisch"), dCell("der"), dCell("Kinderzimmer / Buero"), dCell("Ich mache Hausaufgaben am Schreibtisch.")] }),
      new TableRow({ children: [dCell("Lampe"), dCell("die"), dCell("alle Raeume"), dCell("Die Lampe leuchtet hell.")] }),
      new TableRow({ children: [dCell("Fernseher"), dCell("der"), dCell("Wohnzimmer"), dCell("Wir schauen den Fernseher an.")] }),
      new TableRow({ children: [dCell("Badewanne"), dCell("die"), dCell("Badezimmer"), dCell("Ich bade in der Badewanne.")] }),
      new TableRow({ children: [dCell("Waschbecken"), dCell("das"), dCell("Badezimmer"), dCell("Ich wasche meine Haende.")] }),
      new TableRow({ children: [dCell("Kuehschrank"), dCell("der"), dCell("Kueche"), dCell("Die Milch ist im Kuehlschrank.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Moebel"), empty(),
    pBold("Aufgabe 1: Artikel ergaenzen (der / die / das)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Moebel", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Bett"), dCell(""), dCell("Schrank"), dCell("")] }),
        new TableRow({ children: [dCell("Sofa"), dCell(""), dCell("Regal"), dCell("")] }),
        new TableRow({ children: [dCell("Tisch"), dCell(""), dCell("Schreibtisch"), dCell("")] }),
        new TableRow({ children: [dCell("Stuhl"), dCell(""), dCell("Fernseher"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: In welchem Raum steht dieses Moebel? Schreib den Raum."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 3500 }), hCell("Raum", { width: 6000 })] }),
        new TableRow({ children: [dCell("das Bett"), dCell("")] }),
        new TableRow({ children: [dCell("der Kuehlschrank"), dCell("")] }),
        new TableRow({ children: [dCell("die Badewanne"), dCell("")] }),
        new TableRow({ children: [dCell("der Schreibtisch"), dCell("")] }),
        new TableRow({ children: [dCell("das Sofa"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Beschreib dein Zimmer. Schreib 4-5 Saetze."),
    p("In meinem Zimmer gibt es ... / An der Wand haengt ... / Auf dem Tisch liegt ..."),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Moebel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Moebel", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Bett"), dCell("das Bett"), dCell("Schrank"), dCell("der Schrank")] }),
        new TableRow({ children: [dCell("Sofa"), dCell("das Sofa"), dCell("Regal"), dCell("das Regal")] }),
        new TableRow({ children: [dCell("Tisch"), dCell("der Tisch"), dCell("Schreibtisch"), dCell("der Schreibtisch")] }),
        new TableRow({ children: [dCell("Stuhl"), dCell("der Stuhl"), dCell("Fernseher"), dCell("der Fernseher")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Raeume"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Moebel", { width: 3500 }), hCell("Raum", { width: 6000 })] }),
        new TableRow({ children: [dCell("das Bett"), dCell("das Schlafzimmer / Kinderzimmer")] }),
        new TableRow({ children: [dCell("der Kuehlschrank"), dCell("die Kueche")] }),
        new TableRow({ children: [dCell("die Badewanne"), dCell("das Badezimmer")] }),
        new TableRow({ children: [dCell("der Schreibtisch"), dCell("das Kinderzimmer / Buero")] }),
        new TableRow({ children: [dCell("das Sofa"), dCell("das Wohnzimmer")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("In meinem Zimmer gibt es ein Bett, einen Schreibtisch und ein Regal. An der Wand haengt ein Poster. Auf dem Schreibtisch liegt mein Buch. Im Regal stehen viele Buecher und Spielsachen."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Moebel"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Lena bekommt ein neues Zimmer! Sie ist so aufgeregt."),
          p("Zuerst stellt Papa das Bett an die Wand. Es ist weiss und hat eine blaue Decke."),
          p("Dann kommt der Schreibtisch ans Fenster. Dort macht Lena ihre Hausaufgaben."),
          p("Mama baut das Regal auf. Es hat fuenf Faecker. Lena stellt ihre Buecher und Spielsachen hinein."),
          p("Neben dem Bett steht ein kleiner Tisch mit einer Lampe."),
          p("Der Kleiderschrank ist gross und steht neben der Tuer."),
          p("Am Ende haengt Lena ihre Lieblingsbilder an die Wand."),
          p("Ich liebe mein neues Zimmer!, sagt Lena. Es ist so gemuetlich!"),
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
        new TableRow({ children: [dCell("Das Bett ist blau."), dCell("")] }),
        new TableRow({ children: [dCell("Der Schreibtisch steht am Fenster."), dCell("")] }),
        new TableRow({ children: [dCell("Das Regal hat drei Faecker."), dCell("")] }),
        new TableRow({ children: [dCell("Neben dem Bett steht eine Lampe."), dCell("")] }),
        new TableRow({ children: [dCell("Der Schrank steht neben dem Fenster."), dCell("")] }),
        new TableRow({ children: [dCell("Lena mag ihr neues Zimmer."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was stellt Papa zuerst auf?"),
    writeLine(55), empty(),
    p("2. Wo macht Lena ihre Hausaufgaben?"),
    writeLine(55), empty(),
    p("3. Was stellt Lena ins Regal?"),
    writeLine(55), empty(),
    p("4. Was haengt Lena an die Wand?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Moebel stehen im Text? Schreib sie mit Artikel."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Moebel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Das Bett ist blau."), dCell("F (weiss, mit blauer Decke)")] }),
        new TableRow({ children: [dCell("Der Schreibtisch steht am Fenster."), dCell("R")] }),
        new TableRow({ children: [dCell("Das Regal hat drei Faecker."), dCell("F (fuenf)")] }),
        new TableRow({ children: [dCell("Neben dem Bett steht eine Lampe."), dCell("R (Tisch mit Lampe)")] }),
        new TableRow({ children: [dCell("Der Schrank steht neben dem Fenster."), dCell("F (neben der Tuer)")] }),
        new TableRow({ children: [dCell("Lena mag ihr neues Zimmer."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Papa stellt zuerst das Bett auf."),
    bullet("2. Sie macht die Hausaufgaben am Schreibtisch (am Fenster)."),
    bullet("3. Sie stellt Buecher und Spielsachen ins Regal."),
    bullet("4. Sie haengt ihre Lieblingsbilder an die Wand."),
    empty(),
    pBold("Aufgabe 3: Moebel im Text"),
    p("das Bett, der Schreibtisch, das Regal, der Tisch, die Lampe, der Kleiderschrank"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Moebel"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Bett  -  Schrank  -  Tisch  -  Stuhl  -  Regal  -  Sofa  -  Lampe  -  Schreibtisch  -  Kuehlschrank  -  Badewanne  -  auf  -  in  -  an  -  neben")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze das Moebel."),
    empty(),
    p("1. Ich schlafe in meinem __________________."),
    p("2. Die Kleider haengen im __________________."),
    p("3. Wir essen am __________________."),
    p("4. Die Buecher stehen im __________________."),
    p("5. Mama sitzt auf dem __________________ und liest."),
    p("6. Ich mache Hausaufgaben am __________________."),
    p("7. Die Milch ist im __________________."),
    p("8. Ich bade in der __________________."),
    empty(),
    pBold("Teil 2: Wo ist es? Ergaenze die Praeposition (auf / in / an / neben)."),
    empty(),
    p("1. Das Buch liegt ________ dem Tisch."),
    p("2. Die Kleider haengen ________ dem Schrank."),
    p("3. Das Poster haengt ________ der Wand."),
    p("4. Der Stuhl steht ________ dem Schreibtisch."),
    p("5. Der Kuehlschrank steht ________ der Kueche."),
    empty(),
    pBold("Teil 3: Beschreibe das Zimmer. Schreib 3 Saetze."),
    p("Im Zimmer gibt es ... / Das Bett steht ... / Neben dem Bett ..."),
    empty(),
    ...writeLines(3, 55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Moebel (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Bett"), bullet("2. Schrank"), bullet("3. Tisch"), bullet("4. Regal"),
    bullet("5. Sofa"), bullet("6. Schreibtisch"), bullet("7. Kuehlschrank"), bullet("8. Badewanne"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. auf"), bullet("2. in"), bullet("3. an"), bullet("4. neben"), bullet("5. in"),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Moebel"), empty(),
    makeMoebelTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Praepositionen (Wo? = Dativ): auf dem Tisch, im Regal, an der Wand, neben dem Bett"),
    bullet("Praepositionen (Wohin? = Akkusativ): auf den Tisch, ins Regal, an die Wand, neben das Bett"),
    bullet("Es gibt + Akkusativ: In meinem Zimmer gibt es ein Bett und einen Schrank."),
    bullet("stehen (Moebel stehen) | liegen (flache Dinge liegen) | haengen (Bilder haengen)"),
    bullet("Artikel der Moebel: der Schrank/Tisch/Stuhl/Schreibtisch/Kuehlschrank/Fernseher | die Lampe/Badewanne | das Bett/Sofa/Regal/Waschbecken"),
    empty(),
    pBold("Aufgabe: Lerne 6 Moebel mit Artikel und Raum. Schreib sie auf."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Moebel (LOESUNG)"), empty(),
    makeMoebelTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Das Buch liegt auf dem Tisch. (auf + Dativ = wo)"),
    bullet("Ich lege das Buch auf den Tisch. (auf + Akkusativ = wohin)"),
    bullet("In meinem Zimmer gibt es ein Bett, einen Schreibtisch und ein Regal."),
    bullet("Das Poster haengt an der Wand. Die Kleider haengen im Schrank."),
    bullet("Der Kuehlschrank steht in der Kueche. Er ist gross und weiss."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Moebel"), empty(),
    pBold("Dialog 1: Wo ist mein...?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Tim"), dCell("Mama, wo ist mein Buch?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Es liegt auf dem Schreibtisch.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Da ist es nicht. Vielleicht im Regal?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Schau mal unter dem Bett.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ja! Es liegt unter dem Bett. Danke!")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Raeume bitte dein Zimmer auf!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Mein neues Zimmer"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Komm, ich zeige dir mein neues Zimmer!")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Oh, es ist so gross! Was hast du alles?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ein Bett, einen Schreibtisch und ein grosses Regal.")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Wo machst du Hausaufgaben?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Am Schreibtisch, am Fenster. Da ist es hell.")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Toll! Ich moechte auch ein Zimmer wie deins!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Dein Zimmer"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was gibt es in deinem Zimmer?"), dCell("")] }),
        new TableRow({ children: [dCell("Wo machst du Hausaufgaben?"), dCell("")] }),
        new TableRow({ children: [dCell("Wo schlaefst du?"), dCell("")] }),
        new TableRow({ children: [dCell("Was haengt an deiner Wand?"), dCell("")] }),
        new TableRow({ children: [dCell("Ist dein Zimmer gross oder klein?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Ich sehe was, was du nicht siehst!"),
    bullet("Ein Kind beschreibt ein Moebel im Klassenzimmer."),
    bullet("Beispiel: Es ist braun. Man sitzt darauf. Es hat vier Beine."),
    bullet("Die Gruppe raet: Ist das ein Stuhl?"),
    bullet("Wer richtig raet, ist dran!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Moebel (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wo ist...? + Praep. + Dativ: Es liegt auf dem Schreibtisch."),
    bullet("unter dem Bett - unter + Dativ"),
    bullet("Raeume bitte dein Zimmer auf! - aufraumen = trennbares Verb (Imperativ)"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was hast du alles? = What do you have? (alles = everything)"),
    bullet("Da ist es hell. = It is bright there."),
    bullet("Ich moechte auch ein Zimmer wie deins. = I would also like a room like yours."),
    empty(),
    pBold("Nuetzliche Ausdruecke:"),
    bullet("In meinem Zimmer gibt es ... + Akkusativ"),
    bullet("Das/Der/Die ... steht/liegt/haengt ... + Dativ"),
    bullet("Ich mache Hausaufgaben am Schreibtisch."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Moebel"), empty(),
    pBold("Aufgabe 1: Moebel zuordnen – In welchen Raum gehoert es?"),
    p("Schreibtisch / Badewanne / Sofa / Kuehlschrank / Bett / Fernseher / Waschbecken / Stuhl"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Kueche", { width: 2350 }), hCell("Wohnzimmer", { width: 2350 }), hCell("Schlafzimmer", { width: 2350 }), hCell("Badezimmer", { width: 2350 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Kinderzimmer-Szene mit Moebeln]"),
    p("Beschreibe das Bild. Schreib 4 Saetze."),
    p("Beispiel: Das Bett steht an der Wand. Auf dem Schreibtisch liegt ein Buch."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Zeichne und beschreibe dein Traumzimmer!"),
    p("[BILD 3: Leere Flaeche zum Zeichnen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Traumzimmer:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    pBold("Aufgabe 4: Schreib 3-4 Saetze ueber dein Traumzimmer."),
    p("In meinem Traumzimmer gibt es ... / An der Wand haengt ... / Es ist ..."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Moebel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Kueche", { width: 2350 }), hCell("Wohnzimmer", { width: 2350 }), hCell("Schlafzimmer", { width: 2350 }), hCell("Badezimmer", { width: 2350 })] }),
        new TableRow({ children: [dCell("Kuehlschrank, Stuhl"), dCell("Sofa, Fernseher"), dCell("Bett, Schreibtisch"), dCell("Badewanne, Waschbecken")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: Abhaengig vom Bild. Muster: Das Bett steht an der Wand. Auf dem Schreibtisch liegt ein Buch. Die Lampe steht neben dem Bett. Im Regal stehen viele Buecher."),
    pItalic("Aufgabe 3+4: individuell. Muster: In meinem Traumzimmer gibt es ein grosses Bett und einen riesigen Schreibtisch. An der Wand haengen viele Poster. Es gibt auch einen Fernseher."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Moebel");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
