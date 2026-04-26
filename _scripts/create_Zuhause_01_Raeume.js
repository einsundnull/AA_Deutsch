"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "10_Zuhause", "01_Raeume");
const TOPIC     = "A1_Kinder_Zuhause_01_Raeume";
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

// ── Raeume-Tabelle ────────────────────────────────────────────────────────────
function makeRaeumeTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Raum", { width: 2200 }), hCell("Artikel", { width: 1200 }), hCell("Was macht man dort?", { width: 4000 }), hCell("Beispielsatz", { width: 2100 })] }),
      new TableRow({ children: [dCell("Kueche"), dCell("die"), dCell("kochen, essen, Getraenke holen"), dCell("Mama kocht in der Kueche.")] }),
      new TableRow({ children: [dCell("Wohnzimmer"), dCell("das"), dCell("fernsehen, lesen, spielen"), dCell("Wir sitzen im Wohnzimmer.")] }),
      new TableRow({ children: [dCell("Schlafzimmer"), dCell("das"), dCell("schlafen, ausruhen"), dCell("Ich schlafe im Schlafzimmer.")] }),
      new TableRow({ children: [dCell("Kinderzimmer"), dCell("das"), dCell("spielen, lernen, schlafen"), dCell("Mein Kinderzimmer ist gross.")] }),
      new TableRow({ children: [dCell("Badezimmer"), dCell("das"), dCell("duschen, baden, Zaehne putzen"), dCell("Ich dusche im Badezimmer.")] }),
      new TableRow({ children: [dCell("Toilette / WC"), dCell("die"), dCell("–"), dCell("Die Toilette ist neben dem Bad.")] }),
      new TableRow({ children: [dCell("Flur / Gang"), dCell("der"), dCell("ankommen, Schuhe ausziehen"), dCell("Der Flur ist schmal.")] }),
      new TableRow({ children: [dCell("Keller"), dCell("der"), dCell("lagern, spielen"), dCell("Der Keller ist dunkel.")] }),
      new TableRow({ children: [dCell("Dachboden"), dCell("der"), dCell("lagern, Dinge aufbewahren"), dCell("Alte Sachen sind auf dem Dachboden.")] }),
      new TableRow({ children: [dCell("Garten"), dCell("der"), dCell("spielen, pflanzen, grillen"), dCell("Wir spielen im Garten.")] }),
      new TableRow({ children: [dCell("Balkon / Terrasse"), dCell("der/die"), dCell("sitzen, Luft schnappen"), dCell("Papa sitzt auf dem Balkon.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Raeume im Haus"), empty(),
    pBold("Aufgabe 1: Artikel ergaenzen (der / die / das)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Raum", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Raum", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Kueche"), dCell(""), dCell("Badezimmer"), dCell("")] }),
        new TableRow({ children: [dCell("Wohnzimmer"), dCell(""), dCell("Flur"), dCell("")] }),
        new TableRow({ children: [dCell("Schlafzimmer"), dCell(""), dCell("Keller"), dCell("")] }),
        new TableRow({ children: [dCell("Kinderzimmer"), dCell(""), dCell("Garten"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Was macht man in diesem Raum? Schreib einen Satz."),
    empty(),
    p("1. die Kueche:"),
    writeLine(55), empty(),
    p("2. das Wohnzimmer:"),
    writeLine(55), empty(),
    p("3. das Badezimmer:"),
    writeLine(55), empty(),
    p("4. der Garten:"),
    writeLine(55), empty(),
    empty(),
    pBold("Aufgabe 3: Wie viele Raeume hat dein Zuhause? Schreib eine Liste."),
    p("Beispiel: Ich habe eine Kueche, ein Wohnzimmer, ..."),
    empty(),
    ...writeLines(3, 55),
    empty(),
    pBold("Aufgabe 4: Beschreib deinen Lieblingsraum. Schreib 3-4 Saetze."),
    p("Mein Lieblingsraum ist ... Dort ... Es gibt ... Ich ... dort gern."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Raeume im Haus (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Raum", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Raum", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Kueche"), dCell("die Kueche"), dCell("Badezimmer"), dCell("das Badezimmer")] }),
        new TableRow({ children: [dCell("Wohnzimmer"), dCell("das Wohnzimmer"), dCell("Flur"), dCell("der Flur")] }),
        new TableRow({ children: [dCell("Schlafzimmer"), dCell("das Schlafzimmer"), dCell("Keller"), dCell("der Keller")] }),
        new TableRow({ children: [dCell("Kinderzimmer"), dCell("das Kinderzimmer"), dCell("Garten"), dCell("der Garten")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterantworten"),
    bullet("1. In der Kueche kocht man / isst man."),
    bullet("2. Im Wohnzimmer sieht man fern / liest man."),
    bullet("3. Im Badezimmer duscht man / badet man."),
    bullet("4. Im Garten spielt man / pflanzt man Blumen."),
    empty(),
    pBold("Aufgabe 3+4: individuelle Antworten"),
    pItalic("Aufgabe 4 Muster: Mein Lieblingsraum ist das Kinderzimmer. Dort spiele ich mit meinem Lego. Es gibt ein Bett und einen grossen Schreibtisch. Ich lese dort gern Buecher."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Raeume im Haus"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich bin Jonas und ich zeige euch mein Zuhause."),
          p("Wir wohnen in einem Haus mit sieben Raeumen."),
          p("Unten gibt es die Kueche, das Wohnzimmer und ein kleines Gaestebad."),
          p("In der Kueche kocht Mama jeden Abend. Sie kocht sehr gut!"),
          p("Im Wohnzimmer haben wir ein grosses Sofa und einen Fernseher."),
          p("Freitagabend schaut die ganze Familie einen Film zusammen."),
          p("Oben sind drei Schlafzimmer und das Badezimmer."),
          p("Mein Kinderzimmer ist blau. Dort habe ich mein Bett, meinen Schreibtisch und viele Buecher."),
          p("Am liebsten bin ich in meinem Zimmer - dort ist es gemuetlich!"),
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
        new TableRow({ children: [dCell("Jonas wohnt in einem Haus mit sieben Raeumen."), dCell("")] }),
        new TableRow({ children: [dCell("Die Kueche ist oben."), dCell("")] }),
        new TableRow({ children: [dCell("Mama kocht jeden Abend."), dCell("")] }),
        new TableRow({ children: [dCell("Im Wohnzimmer gibt es ein Sofa und einen Fernseher."), dCell("")] }),
        new TableRow({ children: [dCell("Jonas Zimmer ist gruen."), dCell("")] }),
        new TableRow({ children: [dCell("Jonas Lieblingsraum ist sein Kinderzimmer."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie viele Raeume hat das Haus?"),
    writeLine(55), empty(),
    p("2. Was macht die Familie freitagabends?"),
    writeLine(55), empty(),
    p("3. Was gibt es in Jonas Kinderzimmer?"),
    writeLine(55), empty(),
    p("4. Warum mag Jonas sein Zimmer?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Raeume stehen im Text? Schreib sie mit Artikel."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Raeume im Haus (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Jonas wohnt in einem Haus mit sieben Raeumen."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Kueche ist oben."), dCell("F (unten)")] }),
        new TableRow({ children: [dCell("Mama kocht jeden Abend."), dCell("R")] }),
        new TableRow({ children: [dCell("Im Wohnzimmer gibt es ein Sofa und einen Fernseher."), dCell("R")] }),
        new TableRow({ children: [dCell("Jonas Zimmer ist gruen."), dCell("F (blau)")] }),
        new TableRow({ children: [dCell("Jonas Lieblingsraum ist sein Kinderzimmer."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Das Haus hat sieben Raeume."),
    bullet("2. Die Familie schaut einen Film zusammen."),
    bullet("3. Es gibt ein Bett, einen Schreibtisch und viele Buecher."),
    bullet("4. Es ist gemuetlich dort."),
    empty(),
    pBold("Aufgabe 3: Raeume im Text"),
    p("die Kueche, das Wohnzimmer, das Gaestebad, das Schlafzimmer, das Badezimmer, das Kinderzimmer"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Raeume im Haus"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Kueche  -  Wohnzimmer  -  Schlafzimmer  -  Badezimmer  -  Kinderzimmer  -  Flur  -  Garten  -  Keller  -  oben  -  unten  -  kochen  -  schlafen  -  spielen  -  duschen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. In der __________________ kocht Mama das Mittagessen."),
    p("2. Wir schauen im __________________ zusammen fern."),
    p("3. Ich __________________ in meinem __________________."),
    p("4. Morgens __________________ ich im __________________."),
    p("5. Meine Sachen sind im __________________, unten im Haus."),
    p("6. Im __________________ spiele ich mit meinen Spielsachen."),
    p("7. Die Schlafzimmer sind __________________, die Kueche ist __________________."),
    empty(),
    pBold("Teil 2: Wo bin ich? Ergaenze den Raum."),
    empty(),
    p("1. Ich putze die Zaehne. Ich bin im __________________."),
    p("2. Ich koche Nudeln. Ich bin in der __________________."),
    p("3. Ich schlafe. Ich bin im __________________."),
    p("4. Ich komme nach Hause und ziehe die Schuhe aus. Ich bin im __________________."),
    p("5. Ich giesse die Blumen. Ich bin im __________________."),
    empty(),
    pBold("Teil 3: Beschreibe dein Haus. Schreib 3 Saetze."),
    p("Mein Haus hat ... / Bei uns gibt es ... / Mein Lieblingsraum ist ..."),
    empty(),
    ...writeLines(3, 55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Raeume im Haus (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Kueche"), bullet("2. Wohnzimmer"), bullet("3. schlafe ... Schlafzimmer"),
    bullet("4. dusche ... Badezimmer"), bullet("5. Keller"), bullet("6. Kinderzimmer"),
    bullet("7. oben ... unten"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. Badezimmer"), bullet("2. Kueche"), bullet("3. Schlafzimmer"),
    bullet("4. Flur"), bullet("5. Garten"),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Raeume im Haus"), empty(),
    makeRaeumeTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("in + Dativ: Ich bin in der Kueche. / im Wohnzimmer. (im = in dem)"),
    bullet("in + Akkusativ (Bewegung): Ich gehe in die Kueche. / ins Zimmer. (ins = in das)"),
    bullet("Artikel merken: die Kueche, die Toilette | das Wohnzimmer/Schlafzimmer/Badezimmer/Kinderzimmer | der Flur/Keller/Garten/Balkon"),
    bullet("oben (upstairs) vs. unten (downstairs) | gross vs. klein | hell vs. dunkel | gemuetlich = cosy"),
    bullet("wohnen in (+ Dativ): Wir wohnen in einem Haus / in einer Wohnung."),
    empty(),
    pBold("Aufgabe: Lerne alle Raeume mit Artikel. Schreib sie auf."),
    ...writeLines(6, 50),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Raeume im Haus (LOESUNG)"), empty(),
    makeRaeumeTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Ich bin in der Kueche. (Wo? = Dativ)"),
    bullet("Ich gehe in die Kueche. (Wohin? = Akkusativ)"),
    bullet("Wir wohnen in einem Haus mit fuenf Raeumen."),
    bullet("Mein Kinderzimmer ist oben. Es ist klein aber gemuetlich."),
    bullet("Im Keller ist es dunkel und kalt."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Raeume im Haus"), empty(),
    pBold("Dialog 1: Hausbesichtigung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Willkommen! Das ist mein Zuhause.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Wow, das Haus ist gross! Wie viele Zimmer habt ihr?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Wir haben sechs Zimmer. Unten die Kueche und das Wohnzimmer.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Und oben?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Drei Schlafzimmer und das Badezimmer. Komm, ich zeige dir mein Zimmer!")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Oh, dein Zimmer ist sehr gemuetlich. Ich mag die blaue Farbe.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Wo ist...?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind"), dCell("Mama, wo ist mein Rucksack?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Im Flur, neben der Tuer.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Danke! Und wo ist Papa?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Papa ist im Garten. Er grillt.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Super! Ich helfe ihm. Wo ist die Kueche?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Links, nach dem Flur.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Dein Zuhause"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wohnst du in einem Haus oder einer Wohnung?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Raeume hast du?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsraum?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du ein eigenes Zimmer?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du in deinem Zimmer?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Wo bin ich?"),
    bullet("Ein Kind beschreibt einen Raum ohne den Namen zu sagen."),
    bullet("Beispiel: Hier schlaefe ich. Es gibt ein Bett und einen Schrank."),
    bullet("Die Gruppe raet: Ist das das Schlafzimmer?"),
    bullet("Wer richtig raet, beschreibt den naechsten Raum."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Raeume im Haus (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Willkommen! = Welcome!"),
    bullet("Wie viele Zimmer habt ihr? = How many rooms do you have? (ihr = plural du)"),
    bullet("Komm, ich zeige dir ... = Come, I'll show you ... (zeigen + Dativ)"),
    bullet("Ich mag die blaue Farbe. = Ich finde die Farbe schoen."),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wo ist...? (Wo = statisch, Dativ) vs. Wohin gehst du? (Bewegung, Akkusativ)"),
    bullet("im Flur, neben der Tuer - Praepositionen mit Dativ"),
    bullet("Links / rechts / geradeaus = left / right / straight ahead"),
    empty(),
    pBold("Nuetzliche Ausdruecke:"),
    bullet("Ich wohne in einem Haus / einer Wohnung."),
    bullet("Mein Lieblingsraum ist ... weil er ... ist."),
    bullet("Ich habe ein eigenes Zimmer. / Ich teile mein Zimmer mit ..."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Raeume im Haus"), empty(),
    pBold("Aufgabe 1: [BILD 1: Querschnitt eines Hauses mit verschiedenen Raeumen]"),
    p("Beschrifte die Raeume im Bild. Schreib den Namen und den Artikel."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Raum-Nr.", { width: 1500 }), hCell("Name des Raums", { width: 3500 }), hCell("Artikel", { width: 1500 }), hCell("Was macht man dort?", { width: 3000 })] }),
        new TableRow({ children: [dCell("1"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("2"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("3"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("4"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("5"), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Zeichne deinen Grundriss!"),
    p("[BILD 2: Leere Flaeche - Schueler zeichnen den Grundriss ihrer Wohnung / ihres Hauses]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Zuhause:"), empty(), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze ueber deinen Grundriss."),
    p("Beispiel: Unten habe ich die Kueche und das Wohnzimmer."),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 4: Klassen-Umfrage – Wie wohnst du?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Name", { width: 2000 }), hCell("Haus oder Wohnung?", { width: 2500 }), hCell("Anzahl Raeume", { width: 2000 }), hCell("Lieblingsraum", { width: 3000 })] }),
        ...[[1],[2],[3],[4],[5],[6]].map(() => new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] })),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Raeume im Haus (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Hinweis fuer Lehrkraft"),
    pItalic("Abhaengig vom verwendeten Bild - Raeume beschriften. Typische Raeume: Kueche (unten), Wohnzimmer (unten), Badezimmer (oben), Schlafzimmer (oben), Kinderzimmer (oben)."),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: Grundriss individuell je nach Wohnsituation."),
    pItalic("Aufgabe 3: Muster - Mein Haus hat fuenf Raeume. Unten gibt es die Kueche und das Wohnzimmer. Oben sind zwei Schlafzimmer und das Badezimmer. Mein Lieblingsraum ist mein Kinderzimmer."),
    pItalic("Aufgabe 4: Klassenergebnisse variieren."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Raeume");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
