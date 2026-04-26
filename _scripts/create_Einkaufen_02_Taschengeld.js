"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "05_Einkaufen", "02_Taschengeld");
const TOPIC     = "A2_Kinder_Einkaufen_02_Taschengeld";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Kategorie", { width: 1800 }), hCell("Beispielsatz", { width: 5038 })] }),
      new TableRow({ children: [dCell("das Taschengeld"), dCell("Nomen"), dCell("Ich bekomme jede Woche 5 Euro Taschengeld.")] }),
      new TableRow({ children: [dCell("sparen"), dCell("Verb"), dCell("Ich spare seit Monaten auf ein neues Fahrrad.")] }),
      new TableRow({ children: [dCell("ausgeben"), dCell("Verb (trennb.)"), dCell("Ich habe mein ganzes Taschengeld ausgegeben.")] }),
      new TableRow({ children: [dCell("uebrig bleiben"), dCell("Verb"), dCell("Nach dem Kino bleiben mir noch 2 Euro uebrig.")] }),
      new TableRow({ children: [dCell("sich etwas leisten"), dCell("Ausdruck"), dCell("Das kann ich mir nicht leisten — es ist zu teuer.")] }),
      new TableRow({ children: [dCell("das Sparschwein"), dCell("Nomen"), dCell("In meinem Sparschwein sind schon 15 Euro.")] }),
      new TableRow({ children: [dCell("teuer"), dCell("Adjektiv"), dCell("Das Spiel kostet 45 Euro — das ist zu teuer!")] }),
      new TableRow({ children: [dCell("guenstig / billig"), dCell("Adjektiv"), dCell("Diese Schuhe sind guenstig — nur 12 Euro.")] }),
      new TableRow({ children: [dCell("im Angebot"), dCell("Ausdruck"), dCell("Die Zeitschrift ist heute im Angebot: 1,50 Euro.")] }),
      new TableRow({ children: [dCell("der Rabatt"), dCell("Nomen"), dCell("Mit dem Rabatt spare ich 3 Euro.")] }),
      new TableRow({ children: [dCell("Das ist ein Schnaeppchen!"), dCell("Ausdruck"), dCell("5 Euro fuer das Buch — das ist ein Schnaeppchen!")] }),
      new TableRow({ children: [dCell("Ich spare auf ..."), dCell("Ausdruck"), dCell("Ich spare auf einen neuen Rucksack.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Taschengeld und Preise"), empty(),
    pBold("Aufgabe 1: Vergleiche die Preise — schreib Saetze mit teurer als / guenstiger als / so teuer wie."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt A", { width: 2700 }), hCell("Preis A", { width: 1500 }), hCell("Produkt B", { width: 2700 }), hCell("Preis B", { width: 1500 }), hCell("Vergleich (Satz)", { width: 1238 })] }),
        new TableRow({ children: [dCell("Buch"), dCell("8,00 Euro"), dCell("Zeitschrift"), dCell("2,50 Euro"), dCell("")] }),
        new TableRow({ children: [dCell("Apfel (1 kg)"), dCell("1,99 Euro"), dCell("Bananen (1 kg)"), dCell("1,99 Euro"), dCell("")] }),
        new TableRow({ children: [dCell("Fahrrad"), dCell("149 Euro"), dCell("Roller"), dCell("89 Euro"), dCell("")] }),
        new TableRow({ children: [dCell("Chips (grosse Tuete)"), dCell("2,49 Euro"), dCell("Chips (kleine Tuete)"), dCell("0,99 Euro"), dCell("")] }),
      ],
    }),
    pItalic("Muster: Das Buch ist teurer als die Zeitschrift. / Das Buch kostet mehr als die Zeitschrift."),
    empty(), empty(),
    pBold("Aufgabe 2: Mein Taschengeld-Plan — fuell die Tabelle aus."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich bekomme pro Woche:", { width: 4819 }), hCell("____ Euro Taschengeld", { width: 4819 })] }),
        new TableRow({ children: [hCell("Ich spare auf:", { width: 4819 }), hCell("____________________", { width: 4819 })] }),
        new TableRow({ children: [hCell("Das kostet:", { width: 4819 }), hCell("____ Euro", { width: 4819 })] }),
        new TableRow({ children: [hCell("Ich habe schon gespart:", { width: 4819 }), hCell("____ Euro", { width: 4819 })] }),
        new TableRow({ children: [hCell("Ich brauche noch:", { width: 4819 }), hCell("____ Euro", { width: 4819 })] }),
        new TableRow({ children: [hCell("Ich muss noch ____ Wochen sparen.", { width: 4819 }), hCell("", { width: 4819 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 5 Saetze ueber dein Taschengeld."),
    p("Was bekommst du? Wofuer gibst du Geld aus? Worauf sparst du?"),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Taschengeld und Preise (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Vergleich", { width: 9638 })] }),
        new TableRow({ children: [dCell("Das Buch ist teurer als die Zeitschrift. / Die Zeitschrift ist guenstiger als das Buch.")] }),
        new TableRow({ children: [dCell("Der Apfel ist so teuer wie die Bananen. / Aepfel und Bananen kosten gleich viel.")] }),
        new TableRow({ children: [dCell("Das Fahrrad ist teurer als der Roller. / Der Roller ist guenstiger als das Fahrrad.")] }),
        new TableRow({ children: [dCell("Die grosse Tuete ist teurer als die kleine. / Die kleine Tuete ist guenstiger.")] }),
      ],
    }),
    pItalic("Weitere korrekte Formulierungen akzeptieren (z. B. kostet mehr als / kostet weniger als)."),
    empty(),
    pBold("Aufgabe 2: individuelle Antworten"),
    pItalic("Bewertung: Rechenweg korrekt (Kosten - gespart = Rest; Rest / Wochen-Taschengeld = Wochen)."),
    pItalic("Muster: 5 Euro/Woche, spare auf Spiel (35 Euro), schon 20 Euro gespart, noch 15 Euro noetig, 3 Wochen noch."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Ich bekomme 6 Euro Taschengeld pro Woche. Ich gebe oft Geld fuer Suessigkeiten aus. Manchmal spare ich fuer groessere Sachen. Gerade spare ich auf ein neues Buch. Das kostet 12 Euro — ich brauche noch 2 Wochen."),
    pItalic("Auf Komparativ und auf + Akkusativ achten."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Taschengeld und Preise"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Nikos Sparplan"),
          empty(),
          p("Niko ist 11 Jahre alt und bekommt jede Woche 8 Euro Taschengeld. Seit drei Monaten spart er auf ein neues Videospiel. Das Spiel kostet normalerweise 40 Euro."),
          p("Niko hat ein Notizbuch, in dem er aufschreibt, wie viel er spart und wofuer er Geld ausgibt. Diese Woche hat er 5 Euro gespart und 3 Euro fuer eine Zeitschrift ausgegeben."),
          p("Nach zwolf Wochen hat Niko insgesamt 24 Euro gespart. Er rechnet: 40 Euro minus 24 Euro — er braucht noch 16 Euro. Bei 8 Euro pro Woche sind das noch 2 Wochen!"),
          p("Aber dann entdeckt Niko das Spiel im Angebot: statt 40 Euro kostet es jetzt nur 30 Euro! Das ist 10 Euro guenstiger. Niko rechnet neu: Er braucht noch 6 Euro. Das hat er schon naechste Woche!"),
          p("'Das ist ein totales Schnaeppchen!', ruft Niko. Er freut sich sehr. Sparen hat sich gelohnt."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Niko bekommt 8 Euro Taschengeld pro Woche."), dCell("")] }),
        new TableRow({ children: [dCell("Niko schreibt sein Taschengeld in ein Notizbuch."), dCell("")] }),
        new TableRow({ children: [dCell("Diese Woche hat Niko 8 Euro gespart."), dCell("")] }),
        new TableRow({ children: [dCell("Nach zwoelf Wochen hat Niko 24 Euro gespart."), dCell("")] }),
        new TableRow({ children: [dCell("Das Spiel kostet im Angebot 35 Euro."), dCell("")] }),
        new TableRow({ children: [dCell("Niko braucht nach dem Angebot noch 2 Wochen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wofuer spart Niko?"),
    writeLine(55), empty(),
    p("2. Was macht Niko mit seinem Notizbuch?"),
    writeLine(55), empty(),
    p("3. Wie viel hat er insgesamt gespart (nach 12 Wochen)?"),
    writeLine(40), empty(),
    p("4. Warum freut sich Niko so sehr?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Rechne nach!"),
    empty(),
    p("a) Normaler Preis: 40 Euro — Niko hat gespart: 24 Euro — Er braucht noch: _______ Euro"),
    p("   Wie viele Wochen muss er noch sparen (je 8 Euro/Woche)? _______ Wochen"),
    empty(),
    p("b) Angebotspreis: 30 Euro — Niko hat gespart: 24 Euro — Er braucht noch: _______ Euro"),
    p("   Wie viele Wochen muss er noch sparen? _______ Woche(n)"),
    empty(),
    p("c) Wie viel spart Niko durch das Angebot? _______ Euro"),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Taschengeld und Preise (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Niko bekommt 8 Euro Taschengeld pro Woche."), dCell("R")] }),
        new TableRow({ children: [dCell("Niko schreibt sein Taschengeld in ein Notizbuch."), dCell("R")] }),
        new TableRow({ children: [dCell("Diese Woche hat Niko 8 Euro gespart."), dCell("F (er hat 5 Euro gespart)")] }),
        new TableRow({ children: [dCell("Nach zwoelf Wochen hat Niko 24 Euro gespart."), dCell("R")] }),
        new TableRow({ children: [dCell("Das Spiel kostet im Angebot 35 Euro."), dCell("F (30 Euro)")] }),
        new TableRow({ children: [dCell("Niko braucht nach dem Angebot noch 2 Wochen."), dCell("F (nur noch 1 Woche)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er spart auf ein neues Videospiel."),
    bullet("2. Er schreibt auf, wie viel er spart und wofuer er Geld ausgibt."),
    bullet("3. Er hat 24 Euro gespart."),
    bullet("4. Das Spiel ist im Angebot (10 Euro guenstiger) — er braucht nur noch 1 Woche."),
    empty(),
    pBold("Aufgabe 3: Rechenergebnisse"),
    bullet("a) 40 - 24 = 16 Euro noch benoetigt; 16 / 8 = 2 Wochen"),
    bullet("b) 30 - 24 = 6 Euro noch benoetigt; 6 / 8 < 1, also 1 Woche"),
    bullet("c) 40 - 30 = 10 Euro Ersparnis durch das Angebot"),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Taschengeld und Preise"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("spare  -  ausgegeben  -  teurer  -  guenstiger  -  Angebot  -  Schnaeppchen  -  uebrig  -  leisten  -  Taschengeld  -  Rabatt  -  kostet  -  gespart  -  als")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Ich bekomme 7 Euro __________________ pro Woche."),
    p("2. Ich __________________ auf ein neues Fahrrad — ich habe schon 30 Euro __________________."),
    p("3. Das Buch __________________ 15 Euro. Das ist zu teuer — das kann ich mir nicht __________________."),
    p("4. Diese Jacke ist __________________ als die andere — sie kostet nur 20 Euro!"),
    p("5. Die Schuhe sind heute im __________________: 10 Euro __________________ als normal."),
    p("6. Nach dem Kino habe ich mein ganzes Taschengeld __________________."),
    p("7. Mir bleibt diese Woche nichts __________________ — ich habe alles ausgegeben."),
    empty(),
    pBold("Teil 2: Dialog — Im Spielzeuggeschaeft"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Paula"), dCell("Schau mal, dieses Spiel! Das will ich haben.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Wie viel __________________ es denn?")] }),
        new TableRow({ children: [dCell("Paula"), dCell("35 Euro. Aber ich habe nur 20 Euro __________________ .")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Das ist zu __________________ fuer dein Taschengeld.")] }),
        new TableRow({ children: [dCell("Paula"), dCell("Aber schau! Es ist im __________________! Normalerweise kostet es 50 Euro.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Stimmt, das ist ein __________________ ! Ich gebe dir die restlichen 15 Euro.")] }),
        new TableRow({ children: [dCell("Paula"), dCell("Oh danke! Mit dem __________________ von 15 Euro kann ich es mir __________________ !")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Mein Sparplan"),
    empty(),
    p("Ich spare auf __________________, das __________________ Euro kostet."),
    p("Ich habe schon __________________ Euro gespart."),
    p("Ich brauche noch __________________ Euro."),
    p("Das sind noch __________________ Wochen, wenn ich __________________ Euro pro Woche spare."),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Taschengeld und Preise (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Taschengeld"),
    bullet("2. spare — gespart"),
    bullet("3. kostet — leisten"),
    bullet("4. guenstiger"),
    bullet("5. Angebot — guenstiger"),
    bullet("6. ausgegeben"),
    bullet("7. uebrig"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Mama (1): kostet"),
    bullet("Paula (1): gespart"),
    bullet("Mama (2): teuer"),
    bullet("Paula (2): Angebot"),
    bullet("Mama (3): Schnaeppchen"),
    bullet("Paula (3): Rabatt — leisten"),
    pItalic("Nicht verwendet (Ablenkwoerter): Taschengeld, uebrig, ausgegeben, als"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Ich spare auf ein Skateboard, das 45 Euro kostet. Ich habe schon 20 Euro gespart. Ich brauche noch 25 Euro. Das sind noch 5 Wochen, wenn ich 5 Euro pro Woche spare."),
    pItalic("Rechenweg pruefen: Kosten - gespart = Rest; Rest / Wochen-Rate = Wochen."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Taschengeld und Preise"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Strukturen:"),
    bullet("Ich spare auf + Akkusativ: Ich spare auf ein Fahrrad / einen Rucksack / eine Uhr."),
    bullet("Ich habe ... gespart / ausgegeben (Perfekt von sparen/ausgeben)"),
    bullet("Das kann ich mir (nicht) leisten. = I can(not) afford it."),
    bullet("... ist teurer als ... / ... ist guenstiger als ..."),
    bullet("Das ist ein Schnaeppchen! = What a bargain!"),
    bullet("Mir bleibt ... Euro uebrig. = I have ... Euro left over."),
    empty(),
    h2("Grammatik-Hinweis: Komparativ"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Grundform", { width: 2400 }), hCell("Komparativ", { width: 2400 }), hCell("Superlativ", { width: 2400 }), hCell("Beispiel", { width: 2438 })] }),
        new TableRow({ children: [dCell("teuer"), dCell("teurer"), dCell("am teuersten"), dCell("Das ist am teuersten.")] }),
        new TableRow({ children: [dCell("guenstig"), dCell("guenstiger"), dCell("am guenstigsten"), dCell("Das ist am guenstigsten.")] }),
        new TableRow({ children: [dCell("billig"), dCell("billiger"), dCell("am billigsten"), dCell("Das ist am billigsten.")] }),
        new TableRow({ children: [dCell("gut"), dCell("besser"), dCell("am besten"), dCell("Dieses Angebot ist besser.")] }),
        new TableRow({ children: [dCell("viel"), dCell("mehr"), dCell("am meisten"), dCell("Ich spare mehr als mein Bruder.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib 5 Preisvergleich-Saetze fuer Dinge aus deinem Alltag."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Taschengeld und Preise (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen — Zusammenfassung fuer Lehrkraft:"),
    bullet("sparen auf + Akkusativ: auf einen (mask.) / eine (fem.) / ein (neutr.)"),
    bullet("Perfekt: gespart (haben + gespart), ausgegeben (haben + ausgegeben)"),
    bullet("Komparativ + als: Das Buch ist teurer ALS die Zeitschrift."),
    bullet("Gleichheit: so teuer WIE — kein Komparativ (NICHT 'so teuerer wie')"),
    bullet("Dativ bei sich leisten: Das kann ich MIR nicht leisten."),
    empty(),
    pBold("Loesung Aufgabe: Mustersaetze"),
    bullet("Ein Handy ist teurer als ein Buch."),
    bullet("Ein Apfel ist guenstiger als eine Pizza."),
    bullet("Diese Schuhe sind so teuer wie jene Schuhe."),
    bullet("Am Wochenmarkt ist Gemuese billiger als im Supermarkt."),
    bullet("Das Sonderangebot ist viel besser als der normale Preis."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Taschengeld und Preise"), empty(),
    pBold("Dialog 1: Preise vergleichen beim Einkaufen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Schau mal, dieser Rucksack! Der gefaellt mir so gut.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Wie viel kostet er?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("45 Euro. Aber der da drueben kostet nur 28 Euro.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Der guenstigere ist aber auch schoener, finde ich!")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Wirklich? Der teurere hat mehr Taschen. Das ist praktischer.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Stimmt. Hast du genug Taschengeld dabei?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Ich habe 30 Euro. Ich kann mir den teureren nicht leisten.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Dann nimm den guenstigeren! Er ist ein Schnaeppchen.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Du hast recht. Und ich spare den Rest fuer etwas anderes!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Mehr Taschengeld?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Felix"), dCell("Papa, ich brauche mehr Taschengeld!")] }),
        new TableRow({ children: [dCell("Vater"), dCell("Wie viel bekommst du denn gerade?")] }),
        new TableRow({ children: [dCell("Felix"), dCell("7 Euro pro Woche. Aber das reicht nicht.")] }),
        new TableRow({ children: [dCell("Vater"), dCell("Wofuer gibst du denn das Geld aus?")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Meistens fuer Suessigkeiten und manchmal fuer Zeitschriften.")] }),
        new TableRow({ children: [dCell("Vater"), dCell("Und sparst du auch etwas?")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Ein bisschen — ich spare auf ein neues Spiel fuer 25 Euro.")] }),
        new TableRow({ children: [dCell("Vater"), dCell("Okay, wenn du weniger fuer Suessigkeiten ausgibst, bekommst du 9 Euro.")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Das ist ein Deal! Ich versuche es.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview — Mein Taschengeld"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie viel Taschengeld bekommst du?"), dCell("")] }),
        new TableRow({ children: [dCell("Wofuer gibst du am meisten Geld aus?"), dCell("")] }),
        new TableRow({ children: [dCell("Sparst du gerade auf etwas?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist das Teuerste, das du dir leisten kannst?"), dCell("")] }),
        new TableRow({ children: [dCell("Was waere fuer dich ein Schnaeppchen?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Preise schaetzen"),
    bullet("Lehrkraft nennt ein Produkt (z. B. Schulheft, Fahrrad, Apfel)."),
    bullet("Alle schreiben einen Preis auf einen Zettel."),
    bullet("Wer am naechsten an den echten Preis herankommt, gewinnt einen Punkt."),
    bullet("Dann Saetze bilden: 'Das Heft ist guenstiger als das Fahrrad.'"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Taschengeld und Preise (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("der guenstigere / der teurere = Komparativ mit Artikel (schwache Adjektivdeklination)"),
    bullet("Das ist praktischer. = Komparativ als Praedikat (ohne Nomen dahinter)"),
    bullet("Ich kann mir den teureren nicht leisten. = Akkusativ + Dativ-Reflexivpronomen"),
    bullet("Du hast recht. = Standardausdruck fuer Zustimmung"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Das reicht nicht. = That's not enough."),
    bullet("Wofuer gibst du ... aus? = trennbares Verb ausgeben + Frage mit wofuer"),
    bullet("Das ist ein Deal! = informell fuer 'Einverstanden!'"),
    bullet("Ich versuche es. = I'll try. / I'll give it a go."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Taschengeld-Betrag korrekt auf Deutsch genannt"),
    bullet("Perfekt: habe gespart / habe ausgegeben korrekt verwendet"),
    bullet("Komparativ bei Vergleichen (teurer als, guenstiger als)"),
    bullet("auf + Akkusativ bei 'sparen auf' korrekt"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Taschengeld und Preise"), empty(),
    pBold("Aufgabe 1: Lies die Preisschilder und vergleiche."),
    p("[BILD 1: Vier Preisschilder: Buch 12,99 Euro, Zeitschrift 3,50 Euro, Buntstifte 4,99 Euro, Bastelset 18,90 Euro]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 2400 }), hCell("Preis", { width: 2000 }), hCell("Vergleichssatz", { width: 5238 })] }),
        new TableRow({ children: [dCell("Buch"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Zeitschrift"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Buntstifte"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Bastelset"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    p("Was ist am guenstigsten? ________________________"),
    p("Was ist am teuersten? ________________________"),
    empty(),
    pBold("Aufgabe 2: Lies das Taschengeld-Diagramm und beantworte die Fragen."),
    p("[BILD 2: Balkendiagramm — Kinder der Klasse 5a und ihr Taschengeld: Anna 5 Euro, Ben 8 Euro, Clara 6 Euro, David 10 Euro, Emma 5 Euro]"),
    empty(),
    p("1. Wer bekommt am meisten Taschengeld? ________________________"),
    p("2. Wer bekommt am wenigsten? ________________________"),
    p("3. Wie viel bekommt die Klasse insgesamt pro Woche? _______ Euro"),
    p("4. Schreib einen Vergleichssatz:"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Sparplan-Diagramm — Fuell es aus und beschreibe es."),
    p("[BILD 3: Leere Tabelle fuer Sparplan-Wochen: Woche 1-8, Betrag pro Woche, Gesamtbetrag]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Woche", { width: 1200 }), hCell("1", { width: 1050 }), hCell("2", { width: 1050 }), hCell("3", { width: 1050 }), hCell("4", { width: 1050 }), hCell("5", { width: 1050 }), hCell("6", { width: 1050 }), hCell("7", { width: 1050 }), hCell("8", { width: 1088 })] }),
        new TableRow({ children: [dCell("Gespart"), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Gesamt"), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    p("Ich spare auf: ________________________ (Preis: _______ Euro)"),
    p("Pro Woche spare ich: _______ Euro"),
    p("Nach _______ Wochen habe ich genug Geld."),
    empty(),
    pBold("Aufgabe 4: Angebot oder normaler Preis? Schreib einen Satz."),
    p("[BILD 4: Zwei Preisschilder: Normaler Preis 24,99 Euro (durchgestrichen), Angebotspreis 17,99 Euro]"),
    empty(),
    p("Normaler Preis: _______ Euro — Angebotspreis: _______ Euro"),
    p("Ich spare durch das Angebot: _______ Euro"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Taschengeld und Preise (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von Preisschildern im Bild)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 2400 }), hCell("Preis", { width: 2000 }), hCell("Mustersatz", { width: 5238 })] }),
        new TableRow({ children: [dCell("Buch"), dCell("12,99 Euro"), dCell("Das Buch ist teurer als die Zeitschrift.")] }),
        new TableRow({ children: [dCell("Zeitschrift"), dCell("3,50 Euro"), dCell("Die Zeitschrift ist guenstiger als das Buch.")] }),
        new TableRow({ children: [dCell("Buntstifte"), dCell("4,99 Euro"), dCell("Die Buntstifte kosten mehr als die Zeitschrift.")] }),
        new TableRow({ children: [dCell("Bastelset"), dCell("18,90 Euro"), dCell("Das Bastelset ist am teuersten.")] }),
      ],
    }),
    bullet("Am guenstigsten: die Zeitschrift (3,50 Euro)"),
    bullet("Am teuersten: das Bastelset (18,90 Euro)"),
    empty(),
    pBold("Aufgabe 2: Diagramm-Antworten (Musterwerte)"),
    bullet("1. David bekommt am meisten (10 Euro)."),
    bullet("2. Anna und Emma bekommen am wenigsten (je 5 Euro)."),
    bullet("3. Gesamt: 5 + 8 + 6 + 10 + 5 = 34 Euro pro Woche."),
    bullet("4. Muster: David bekommt mehr Taschengeld als Anna."),
    pItalic("Hinweis: Antworten haengen von eingefuegten Diagrammwerten ab."),
    empty(),
    pBold("Aufgabe 3: Sparplan individuell"),
    pItalic("Muster (5 Euro/Woche, Ziel 35 Euro): Woche 1: 5, Woche 2: 10, ..., Woche 7: 35 — fertig nach 7 Wochen."),
    pItalic("Rechenweg pruefen: Preis / Sparrate = Anzahl Wochen (aufrunden)."),
    empty(),
    pBold("Aufgabe 4: Angebot"),
    bullet("Normaler Preis: 24,99 Euro"),
    bullet("Angebotspreis: 17,99 Euro"),
    bullet("Ersparnis: 24,99 - 17,99 = 7,00 Euro"),
    pItalic("Mustersatz: Das Produkt kostet im Angebot 17,99 Euro — das ist 7 Euro guenstiger als der normale Preis!"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Taschengeld und Preise");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
