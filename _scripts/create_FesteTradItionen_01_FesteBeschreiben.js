"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "06_FesteTraditionen", "01_FesteBeschreiben");
const TOPIC     = "A2_Kinder_FesteTraditionen_01_FesteBeschreiben";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Fest", { width: 1600 }), hCell("Beispielsatz", { width: 5238 })] }),
      new TableRow({ children: [dCell("der Geburtstag"), dCell("Geburtstag"), dCell("Heute ist mein Geburtstag — ich werde 11!")] }),
      new TableRow({ children: [dCell("die Geburtstagsparty"), dCell("Geburtstag"), dCell("Ich lade alle Freunde zu meiner Party ein.")] }),
      new TableRow({ children: [dCell("das Geschenk"), dCell("alle Feste"), dCell("Ich bekomme viele Geschenke zu Weihnachten.")] }),
      new TableRow({ children: [dCell("die Kerze(n)"), dCell("alle Feste"), dCell("Auf dem Kuchen sind zehn Kerzen.")] }),
      new TableRow({ children: [dCell("der Weihnachtsbaum"), dCell("Weihnachten"), dCell("Wir schmuecken den Weihnachtsbaum zusammen.")] }),
      new TableRow({ children: [dCell("das Weihnachtslied"), dCell("Weihnachten"), dCell("Wir singen Weihnachtslieder in der Kirche.")] }),
      new TableRow({ children: [dCell("der Osterhase"), dCell("Ostern"), dCell("Der Osterhase versteckt Ostereier im Garten.")] }),
      new TableRow({ children: [dCell("das Osterei (Ostereier)"), dCell("Ostern"), dCell("Wir faerben Ostereier in bunten Farben.")] }),
      new TableRow({ children: [dCell("feiern"), dCell("alle Feste"), dCell("Wir feiern Weihnachten mit der ganzen Familie.")] }),
      new TableRow({ children: [dCell("einladen"), dCell("Geburtstag"), dCell("Ich lade meine Freunde zur Party ein.")] }),
      new TableRow({ children: [dCell("schmuecken"), dCell("alle Feste"), dCell("Wir schmuecken das Zimmer mit bunten Luftballons.")] }),
      new TableRow({ children: [dCell("Frohe Weihnachten!"), dCell("Weihnachten"), dCell("Frohe Weihnachten und ein gutes neues Jahr!")] }),
      new TableRow({ children: [dCell("Frohe Ostern!"), dCell("Ostern"), dCell("Ich wuensche dir frohe Ostern!")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Feste beschreiben"), empty(),
    pBold("Aufgabe 1: Ordne die Woerter und Aktivitaeten den richtigen Festen zu."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Kerzen ausblasen  -  Ostereier faerben  -  Weihnachtsbaum schmuecken  -  Geschenke auspacken  -  Osterhase  -  Kuchen mit Kerzen  -  Weihnachtslieder singen  -  Eier verstecken  -  Freunde einladen  -  Christkind  -  Party feiern  -  Advent")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Geburtstag", { width: 3100 }), hCell("Weihnachten", { width: 3100 }), hCell("Ostern", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib Saetze nach dem Muster."),
    pItalic("Muster: Zu Weihnachten schmuecken wir den Weihnachtsbaum."),
    pItalic("Muster: An meinem Geburtstag lade ich meine Freunde ein."),
    empty(),
    p("1. Zu Ostern ___________________________________________________"),
    writeLine(55), empty(),
    p("2. Zu Weihnachten ______________________________________________"),
    writeLine(55), empty(),
    p("3. An meinem Geburtstag ________________________________________"),
    writeLine(55), empty(),
    p("4. Mein Lieblingsfest ist __________________, weil _______________"),
    writeLine(55), empty(), empty(),
    pBold("Aufgabe 3: Beschreibe dein Lieblingsfest in 5-6 Saetzen."),
    p("Wann ist es? Was macht deine Familie? Was isst ihr? Was gefeaellt dir am besten?"),
    empty(),
    ...writeLines(6, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Feste beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Geburtstag", { width: 3100 }), hCell("Weihnachten", { width: 3100 }), hCell("Ostern", { width: 3100 })] }),
        new TableRow({ children: [dCell("Kerzen ausblasen"), dCell("Weihnachtsbaum schmuecken"), dCell("Ostereier faerben")] }),
        new TableRow({ children: [dCell("Kuchen mit Kerzen"), dCell("Weihnachtslieder singen"), dCell("Osterhase")] }),
        new TableRow({ children: [dCell("Freunde einladen"), dCell("Geschenke auspacken"), dCell("Eier verstecken")] }),
        new TableRow({ children: [dCell("Party feiern"), dCell("Advent / Christkind"), dCell("")] }),
      ],
    }),
    pItalic("Hinweis: 'Geschenke auspacken' auch zu Geburtstag akzeptieren."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("1. Zu Ostern faerben wir Ostereier und suchen sie im Garten."),
    bullet("2. Zu Weihnachten schmuecken wir den Weihnachtsbaum und singen Lieder."),
    bullet("3. An meinem Geburtstag lade ich meine Freunde ein und backe einen Kuchen."),
    bullet("4. Mein Lieblingsfest ist Weihnachten, weil wir viele Geschenke bekommen."),
    pItalic("Andere korrekte Saetze akzeptieren. Auf Praeposition zu + Dativ achten (zu Weihnachten, zu Ostern, an meinem Geburtstag)."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Mein Lieblingsfest ist Weihnachten. Es ist am 24. Dezember. Wir schmuecken zusammen den Weihnachtsbaum. Am Abend singen wir Weihnachtslieder. Dann packen wir die Geschenke aus. Wir essen Plaetzchen und trinken heissen Kakao. Das gefaellt mir am besten!"),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Feste beschreiben"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Meine Lieblingsfeste"),
          empty(),
          p("Ich heisse Klara und ich habe drei Lieblingsfeste im Jahr: Geburtstag, Weihnachten und Ostern."),
          p("Meinen Geburtstag feiere ich immer im Mai. Ich lade meine Freunde zu einer Party ein. Wir spielen Spiele, tanzen und essen Kuchen mit Kerzen. Das Schoenste ist, die Kerzen auszublasen und sich etwas zu wuenschen!"),
          p("Weihnachten feiern wir am 24. Dezember. Den ganzen Dezember lang hoere ich Weihnachtslieder und esse Plaetzchen. Am Heiligen Abend schmuecken wir zusammen den Weihnachtsbaum. Dann singen wir und packen Geschenke aus. Mein Lieblingsgeschenk war letztes Jahr ein Buch ueber Tiere."),
          p("Ostern finde ich auch wunderschoen. Der Osterhase versteckt Ostereier und Suessigkeiten im Garten. Wir faerben vorher die Eier in bunten Farben — das macht so viel Spass! Ich finde meistens mehr Eier als mein kleiner Bruder."),
          p("Alle drei Feste sind besonders, aber Weihnachten gefaellt mir am besten, weil die ganze Familie zusammenkommt."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Klara feiert ihren Geburtstag im Juni."), dCell("")] }),
        new TableRow({ children: [dCell("An Klaras Geburtstag gibt es Kuchen mit Kerzen."), dCell("")] }),
        new TableRow({ children: [dCell("Weihnachten feiern sie am 25. Dezember."), dCell("")] }),
        new TableRow({ children: [dCell("Letztes Jahr hat Klara ein Buch bekommen."), dCell("")] }),
        new TableRow({ children: [dCell("Klara findet beim Ostereiersuchen weniger Eier als ihr Bruder."), dCell("")] }),
        new TableRow({ children: [dCell("Klaras Lieblingsfest ist Weihnachten."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was macht Klara an ihrem Geburtstag?"),
    writeLine(55), empty(),
    p("2. Was passiert am Heiligen Abend bei Klaras Familie?"),
    writeLine(55), empty(),
    p("3. Was machen Klara und ihr Bruder zu Ostern?"),
    writeLine(55), empty(),
    p("4. Warum ist Weihnachten Klaras Lieblingsfest?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welches Fest? Schreib Geburtstag / Weihnachten / Ostern."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("Fest", { width: 2000 })] }),
        new TableRow({ children: [dCell("Man blaest Kerzen auf dem Kuchen aus."), dCell("")] }),
        new TableRow({ children: [dCell("Man schmueckt einen Baum mit Kugeln."), dCell("")] }),
        new TableRow({ children: [dCell("Ein Hase versteckt bunte Eier."), dCell("")] }),
        new TableRow({ children: [dCell("Man singt Lieder und isst Plaetzchen."), dCell("")] }),
        new TableRow({ children: [dCell("Man laedt Freunde zu einer Party ein."), dCell("")] }),
      ],
    }),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Feste beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Klara feiert ihren Geburtstag im Juni."), dCell("F (im Mai)")] }),
        new TableRow({ children: [dCell("An Klaras Geburtstag gibt es Kuchen mit Kerzen."), dCell("R")] }),
        new TableRow({ children: [dCell("Weihnachten feiern sie am 25. Dezember."), dCell("F (am 24. Dezember)")] }),
        new TableRow({ children: [dCell("Letztes Jahr hat Klara ein Buch bekommen."), dCell("R (ein Buch ueber Tiere)")] }),
        new TableRow({ children: [dCell("Klara findet beim Ostereiersuchen weniger Eier als ihr Bruder."), dCell("F (sie findet mehr)")] }),
        new TableRow({ children: [dCell("Klaras Lieblingsfest ist Weihnachten."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie laedt Freunde ein, spielt Spiele, tanzt und isst Kuchen. Sie blaest Kerzen aus."),
    bullet("2. Sie schmuecken den Weihnachtsbaum, singen und packen Geschenke aus."),
    bullet("3. Sie faerben Eier und suchen sie im Garten."),
    bullet("4. Weil die ganze Familie zusammenkommt."),
    empty(),
    pBold("Aufgabe 3: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("Fest", { width: 2000 })] }),
        new TableRow({ children: [dCell("Man blaest Kerzen auf dem Kuchen aus."), dCell("Geburtstag")] }),
        new TableRow({ children: [dCell("Man schmueckt einen Baum mit Kugeln."), dCell("Weihnachten")] }),
        new TableRow({ children: [dCell("Ein Hase versteckt bunte Eier."), dCell("Ostern")] }),
        new TableRow({ children: [dCell("Man singt Lieder und isst Plaetzchen."), dCell("Weihnachten")] }),
        new TableRow({ children: [dCell("Man laedt Freunde zu einer Party ein."), dCell("Geburtstag")] }),
      ],
    }),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Feste beschreiben"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("feiern  -  einladen  -  schmuecken  -  faerben  -  verstecken  -  auspacken  -  wuenschen  -  Geschenke  -  Kerzen  -  Weihnachtsbaum  -  Ostereier  -  Geburtstag  -  Frohe  -  weil")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Heute ist mein __________________ — ich werde 12 Jahre alt!"),
    p("2. Ich __________________ alle meine Freunde zur Party __________________."),
    p("3. Auf dem Kuchen sind zwoelf __________________ — eine fuer jedes Jahr."),
    p("4. Zu Weihnachten __________________ wir den __________________ mit bunten Kugeln."),
    p("5. Am Morgen darf ich die __________________ unter dem Baum __________________."),
    p("6. Zu Ostern __________________ wir die Eier in vielen bunten Farben."),
    p("7. Der Osterhase __________________ die __________________ im Garten."),
    p("8. Weihnachten gefaellt mir am besten, __________________ die ganze Familie zusammenkommt."),
    empty(),
    pBold("Teil 2: Dialog — Geburtstagswuensche"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Hey Mia! Herzlichen Glueckwunsch zum __________________!")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Danke! Ich bin so aufgeregt — heute Abend __________________ wir.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ich habe ein __________________ fuer dich mitgebracht!")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Oh wie nett! Darf ich es gleich __________________?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Natuerlich! Und mach einen __________________ — was wuenschst du dir?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich __________________ mir, dass das Wetter heute schoeen bleibt!")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Dein Lieblingsfest — schreib selbst."),
    empty(),
    p("Mein Lieblingsfest ist __________________. Ich feiere es __________________ (Zeitangabe)."),
    p("Wir __________________ und __________________. Das gefaellt mir, weil __________________"),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Feste beschreiben (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Geburtstag"),
    bullet("2. lade — ein (einladen, trennbar)"),
    bullet("3. Kerzen"),
    bullet("4. schmuecken — Weihnachtsbaum"),
    bullet("5. Geschenke — auspacken"),
    bullet("6. faerben"),
    bullet("7. versteckt — Ostereier"),
    bullet("8. weil"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Jonas (1): Geburtstag"),
    bullet("Mia (1): feiern"),
    bullet("Jonas (2): Geschenk"),
    bullet("Mia (2): auspacken"),
    bullet("Jonas (3): Wunsch / Wuenschen"),
    bullet("Mia (3): wuensche"),
    pItalic("Nicht verwendet (Ablenkwoerter): Frohe, Ostereier, Weihnachtsbaum, Kerzen, schmuecken, faerben"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Mein Lieblingsfest ist Ostern. Ich feiere es im Fruehling. Wir faerben Eier und suchen sie im Garten. Das gefaellt mir, weil ich immer viele Suessigkeiten finde."),
    pItalic("Auf trennbare Verben achten: einladen -> lade ... ein; auspacken -> packe ... aus."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Feste beschreiben"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Strukturen:"),
    bullet("Zeitangabe: zu Weihnachten / zu Ostern / an meinem Geburtstag / am 24. Dezember"),
    bullet("Aktivitaeten: Wir ... + Verb (schmuecken, singen, faerben, einladen, auspacken)"),
    bullet("Begruendung: ... gefaellt mir, weil ... / Das ist besonders, weil ..."),
    bullet("Wunsch aeussern: Ich wuensche mir ... / Ich wuensche dir frohe ..."),
    bullet("Perfekt bei Festen: Ich habe bekommen / Wir haben gefeiert / Ich bin gegangen"),
    empty(),
    h2("Grammatik-Hinweis: Praeposition zu/an bei Festen"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Fest", { width: 2400 }), hCell("Praeposition", { width: 2000 }), hCell("Beispiel", { width: 5238 })] }),
        new TableRow({ children: [dCell("Weihnachten"), dCell("zu"), dCell("Zu Weihnachten singen wir Lieder.")] }),
        new TableRow({ children: [dCell("Ostern"), dCell("zu"), dCell("Zu Ostern faerben wir Eier.")] }),
        new TableRow({ children: [dCell("Geburtstag"), dCell("an / zu"), dCell("An meinem Geburtstag / Zu meinem Geburtstag ...")] }),
        new TableRow({ children: [dCell("Silvester"), dCell("an"), dCell("An Silvester gibt es Feuerwerk.")] }),
        new TableRow({ children: [dCell("Heiliger Abend"), dCell("an"), dCell("Am Heiligen Abend packen wir Geschenke aus.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib zu jedem der drei Feste 2 Saetze."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Feste beschreiben (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen — Zusammenfassung fuer Lehrkraft:"),
    bullet("zu + Fest (Dativ, aber unveraendert): zu Weihnachten, zu Ostern"),
    bullet("an + Dativ: an meinem Geburtstag, am Heiligen Abend (am = an + dem)"),
    bullet("Trennbare Verben: ein|laden, aus|packen, schmuec|ken (nicht trennbar), ver|stecken (nicht trennbar)"),
    bullet("Perfekt: feiern -> gefeiert, einladen -> eingeladen, schmuecken -> geschmueckt"),
    empty(),
    pBold("Loesung Aufgabe: Mustersaetze"),
    bullet("Zu Weihnachten schmuecken wir den Baum. / Wir singen Weihnachtslieder."),
    bullet("Zu Ostern faerben wir Eier. / Der Osterhase versteckt Suessigkeiten im Garten."),
    bullet("An meinem Geburtstag lade ich Freunde ein. / Wir essen Kuchen und spielen Spiele."),
    pItalic("Individuelle Saetze akzeptieren bei korrekter Praeposition und Verbform."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Feste beschreiben"), empty(),
    pBold("Dialog 1: Geburtstagsvorbereitung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lena"), dCell("Mein Geburtstag ist naechste Woche! Ich bin so aufgeregt.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Wie alt wirst du denn?")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Ich werde 12. Ich mache eine Party — kommst du auch?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Natuerlich! Was gibt es denn?")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Kuchen, Spiele und ich blase Kerzen aus. Und du bringst ein Geschenk mit!")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Haha, klar! Was wuenschst du dir?")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Ein Buch oder Buentstifte waere super. Ich male so gern.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Alles klar — ich komme gerne! Herzlichen Glueckwunsch schon mal!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Weihnachten in der Familie"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Oma"), dCell("Was macht ihr dieses Jahr zu Weihnachten?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Wir kommen zu euch! Mama backt schon Plaetzchen.")] }),
        new TableRow({ children: [dCell("Oma"), dCell("Toll! Ich schmuecke schon den Weihnachtsbaum.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Darf ich helfen? Ich haenge so gerne Kugeln auf.")] }),
        new TableRow({ children: [dCell("Oma"), dCell("Natuerlich! Und am Abend singen wir zusammen Weihnachtslieder.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Super! Und die Geschenke — wann packen wir die aus?")] }),
        new TableRow({ children: [dCell("Oma"), dCell("Immer am Abend des 24. Dezember — das ist Tradition bei uns.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview — Deine Feste"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsfest?"), dCell("")] }),
        new TableRow({ children: [dCell("Wann feierst du deinen Geburtstag?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du zu Weihnachten?"), dCell("")] }),
        new TableRow({ children: [dCell("Was isst du gern bei Festen?"), dCell("")] }),
        new TableRow({ children: [dCell("Was wuenschst du dir zum Geburtstag?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Welches Fest ist das?"),
    bullet("Eine Person beschreibt ein Fest, ohne den Namen zu nennen."),
    bullet("Beispiel: 'Man faerbt Eier. Ein Hase versteckt Suessigkeiten. Es ist im Fruehling.'"),
    bullet("Die anderen raten: 'Das ist Ostern!'"),
    bullet("Wer richtig raet, beschreibt das naechste Fest."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Feste beschreiben (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie alt wirst du? = Frage nach dem kommenden Alter (werden + Zahl)"),
    bullet("Ich werde 12. = Antwort mit werden (Zukunft)"),
    bullet("kommst du auch? = Einladung als Frage"),
    bullet("... waere super. = Konjunktiv II fuer hoeflichen Wunsch"),
    bullet("Herzlichen Glueckwunsch! = Standardglueckwunsch zum Geburtstag"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was macht ihr ... zu Weihnachten? = Frage nach Festtraditionen"),
    bullet("Darf ich helfen? = Erlaubnis fragen mit duerfen"),
    bullet("Ich haenge ... auf = trennbares Verb aufhaengen"),
    bullet("Das ist Tradition bei uns. = familiaere Gewohnheit beschreiben"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Praeposition zu/an bei Festen korrekt verwendet"),
    bullet("Mindestens eine Zeitangabe (Monat, Jahreszeit, Datum)"),
    bullet("Aktivitaeten im Praesens oder Perfekt korrekt beschrieben"),
    bullet("Wunsch mit Ich wuensche mir ... oder Ich moechte ..."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Feste beschreiben"), empty(),
    pBold("Aufgabe 1: Schreib das Fest und zwei Aktivitaeten zu jedem Bild."),
    p("[BILD 1: Drei Bilder — Geburtstagskuchen mit Kerzen, geschmueckter Weihnachtsbaum, bunte Ostereier im Gras]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 3100 }), hCell("[Bild 2]", { width: 3100 }), hCell("[Bild 3]", { width: 3100 })] }),
        new TableRow({ children: [dCell("Fest: ____________"), dCell("Fest: ____________"), dCell("Fest: ____________")] }),
        new TableRow({ children: [dCell("Aktivitaet 1: _____"), dCell("Aktivitaet 1: _____"), dCell("Aktivitaet 1: _____")] }),
        new TableRow({ children: [dCell("Aktivitaet 2: _____"), dCell("Aktivitaet 2: _____"), dCell("Aktivitaet 2: _____")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Lies die Einladung und beantworte die Fragen."),
    p("[BILD 2: Einladungskarte: 'Komm zu meiner Geburtstagsparty! Wann: Samstag, 10. Mai, 15 Uhr. Wo: Bei mir zu Hause, Rosenstr. 5. Was: Spiele, Kuchen, Musik! Bitte antworte bis Freitag. Deine Zoe']"),
    empty(),
    p("1. Wann ist die Party? ____________________"),
    p("2. Wo findet sie statt? ____________________"),
    p("3. Was gibt es bei der Party? ____________________"),
    p("4. Bis wann muss man antworten? ____________________"),
    p("5. Schreib eine kurze Antwort an Zoe (2-3 Saetze):"),
    writeLine(55), writeLine(55), empty(),
    pBold("Aufgabe 3: Was gehoert zusammen? Verbinde."),
    p("[BILD 3: Zwei Spalten — links: Fest-Namen (Geburtstag, Weihnachten, Ostern), rechts: Bilder/Symbole (Osterhase, Weihnachtsbaum, Geburtstagskuchen) — Linien ziehen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Fest", { width: 3200 }), hCell("Symbol / Bild", { width: 6438 })] }),
        new TableRow({ children: [dCell("Geburtstag"), dCell("")] }),
        new TableRow({ children: [dCell("Weihnachten"), dCell("")] }),
        new TableRow({ children: [dCell("Ostern"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Zeichne oder beschreibe dein Lieblingsfest."),
    p("[BILD 4: Leere Flaeche]"),
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
    p("Das Fest heisst: ____________________________"),
    p("Das machen wir: _____________________________"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Feste beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1500 }), hCell("Fest", { width: 2000 }), hCell("Aktivitaeten", { width: 6138 })] }),
        new TableRow({ children: [dCell("Bild 1"), dCell("Geburtstag"), dCell("Kerzen ausblasen, Kuchen essen / Freunde einladen")] }),
        new TableRow({ children: [dCell("Bild 2"), dCell("Weihnachten"), dCell("Baum schmuecken, Lieder singen / Geschenke auspacken")] }),
        new TableRow({ children: [dCell("Bild 3"), dCell("Ostern"), dCell("Eier faerben, Eier suchen / Suessigkeiten finden")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Am Samstag, 10. Mai, um 15 Uhr."),
    bullet("2. Bei Zoe zu Hause, Rosenstrasse 5."),
    bullet("3. Spiele, Kuchen und Musik."),
    bullet("4. Bis Freitag."),
    bullet("5. Muster: Liebe Zoe! Ich komme sehr gerne zu deiner Party. Ich freue mich schon! Ich bringe ein Geschenk mit. Bis Samstag! (Name)"),
    empty(),
    pBold("Aufgabe 3: Zuordnung"),
    bullet("Geburtstag — Geburtstagskuchen (mit Kerzen)"),
    bullet("Weihnachten — Weihnachtsbaum"),
    bullet("Ostern — Osterhase"),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Fest korrekt benannt, mindestens eine Aktivitaet beschrieben."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Feste beschreiben (Geburtstag, Weihnachten, Ostern)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
