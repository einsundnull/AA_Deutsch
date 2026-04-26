"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "01_VerbenPraesens");
const TOPIC     = "A1_Kinder_GrammatikMinimum_01_VerbenPraesens";
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

// ── Konjugationstabelle ───────────────────────────────────────────────────────
function makeKonjugationsTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Pronomen", { width: 1700 }), hCell("sein", { width: 2000 }), hCell("haben", { width: 2000 }), hCell("moegen", { width: 1900 }), hCell("heissen", { width: 1900 })] }),
      new TableRow({ children: [dCell("ich"),       dCell("bin"),  dCell("habe"),  dCell("mag"),    dCell("heisse")] }),
      new TableRow({ children: [dCell("du"),        dCell("bist"), dCell("hast"),  dCell("magst"),  dCell("heisst")] }),
      new TableRow({ children: [dCell("er/sie/es"), dCell("ist"),  dCell("hat"),   dCell("mag"),    dCell("heisst")] }),
      new TableRow({ children: [dCell("wir"),       dCell("sind"), dCell("haben"), dCell("moegen"), dCell("heissen")] }),
      new TableRow({ children: [dCell("ihr"),       dCell("seid"), dCell("habt"),  dCell("moegt"),  dCell("heisst")] }),
      new TableRow({ children: [dCell("sie/Sie"),   dCell("sind"), dCell("haben"), dCell("moegen"), dCell("heissen")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Verben im Praesens"), empty(),
    pBold("Konjugation – Lerne diese 4 wichtigen Verben:"),
    makeKonjugationsTable(),
    empty(), empty(),
    pBold("Aufgabe 1: Schreib die richtige Form von SEIN."),
    empty(),
    p("1. Ich __________________ Anna."),
    p("2. Du __________________ mein Freund."),
    p("3. Er __________________ 8 Jahre alt."),
    p("4. Wir __________________ Schueler."),
    p("5. Ihr __________________ aus Deutschland."),
    p("6. Sie (Plural) __________________ in der Schule."),
    empty(),
    pBold("Aufgabe 2: Schreib die richtige Form von HABEN."),
    empty(),
    p("1. Ich __________________ einen Hund."),
    p("2. Du __________________ ein Buch."),
    p("3. Mama __________________ ein neues Auto."),
    p("4. Wir __________________ Hausaufgaben."),
    p("5. Ihr __________________ keine Zeit."),
    p("6. Die Kinder __________________ Hunger."),
    empty(),
    pBold("Aufgabe 3: Schreib die richtige Form von MOEGEN oder HEISSEN."),
    empty(),
    p("1. Ich __________________ Schokolade. (moegen)"),
    p("2. Du __________________ Pizza? (moegen)"),
    p("3. Wie __________________ du? (heissen)"),
    p("4. Mein Bruder __________________ Tom. (heissen)"),
    p("5. Wir __________________ unsere Lehrerin. (moegen)"),
    p("6. Wie __________________ ihr? (heissen)"),
    empty(),
    pBold("Aufgabe 4: Schreib 4 Saetze ueber dich. Benutze sein, haben, moegen, heissen."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Verben im Praesens (LOESUNG)"), empty(),
    pBold("Aufgabe 1: SEIN"),
    bullet("1. bin"), bullet("2. bist"), bullet("3. ist"),
    bullet("4. sind"), bullet("5. seid"), bullet("6. sind"),
    empty(),
    pBold("Aufgabe 2: HABEN"),
    bullet("1. habe"), bullet("2. hast"), bullet("3. hat"),
    bullet("4. haben"), bullet("5. habt"), bullet("6. haben"),
    empty(),
    pBold("Aufgabe 3: MOEGEN / HEISSEN"),
    bullet("1. mag"), bullet("2. magst"), bullet("3. heisst"),
    bullet("4. heisst"), bullet("5. moegen"), bullet("6. heisst"),
    empty(),
    pBold("Aufgabe 4: Musterantwort"),
    pItalic("Ich heisse Lisa. Ich bin 9 Jahre alt. Ich habe einen kleinen Bruder. Ich mag Schokolade und Pizza."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Verben im Praesens"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich heisse Marco und ich bin 9 Jahre alt."),
          p("Ich habe eine grosse Familie. Mein Vater heisst Peter und meine Mutter heisst Julia."),
          p("Wir haben zwei Hunde und eine Katze."),
          p("Mein Bruder heisst Leo. Er ist 12 Jahre alt. Er mag Fussball."),
          p("Meine Schwester heisst Mia. Sie ist erst 4 Jahre alt. Sie mag Puppen."),
          p("Ich mag Tiere und Buecher. Ich habe viele Buecher zu Hause."),
          p("Wir sind eine gluecklische Familie!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Welches Verb? Schreib (sein / haben / moegen / heissen)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz aus dem Text", { width: 6500 }), hCell("Verb", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ich heisse Marco."), dCell("")] }),
        new TableRow({ children: [dCell("Ich bin 9 Jahre alt."), dCell("")] }),
        new TableRow({ children: [dCell("Ich habe eine grosse Familie."), dCell("")] }),
        new TableRow({ children: [dCell("Er mag Fussball."), dCell("")] }),
        new TableRow({ children: [dCell("Wir sind eine glueckliche Familie."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie heisst Marco?"),
    writeLine(55), empty(),
    p("2. Wie alt ist sein Bruder?"),
    writeLine(55), empty(),
    p("3. Was mag Mia?"),
    writeLine(55), empty(),
    p("4. Was hat die Familie zu Hause?"),
    writeLine(55), empty(),
    p("5. Was mag Marco?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Markiere alle Verbformen im Text. Schreib 5 davon hier auf:"),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Verben im Praesens (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Verben zuordnen"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz", { width: 6500 }), hCell("Verb", { width: 3000 })] }),
        new TableRow({ children: [dCell("Ich heisse Marco."), dCell("heissen")] }),
        new TableRow({ children: [dCell("Ich bin 9 Jahre alt."), dCell("sein")] }),
        new TableRow({ children: [dCell("Ich habe eine grosse Familie."), dCell("haben")] }),
        new TableRow({ children: [dCell("Er mag Fussball."), dCell("moegen")] }),
        new TableRow({ children: [dCell("Wir sind eine glueckliche Familie."), dCell("sein")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er heisst Marco."),
    bullet("2. Sein Bruder ist 12 Jahre alt."),
    bullet("3. Mia mag Puppen."),
    bullet("4. Sie haben zwei Hunde und eine Katze."),
    bullet("5. Marco mag Tiere und Buecher."),
    empty(),
    pBold("Aufgabe 3: Verben im Text (Beispiele)"),
    p("heisse, bin, habe, heisst, haben, ist, mag, sind"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Verben im Praesens"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("bin  -  bist  -  ist  -  sind  -  seid  -  habe  -  hast  -  hat  -  haben  -  habt  -  mag  -  magst  -  moegen  -  heisse  -  heisst  -  heissen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze SEIN."),
    empty(),
    p("1. Ich __________________ Lukas."),
    p("2. Du __________________ meine Freundin."),
    p("3. Mama __________________ Lehrerin."),
    p("4. Wir __________________ in der Schule."),
    p("5. Ihr __________________ klein."),
    empty(),
    pBold("Teil 2: Ergaenze HABEN."),
    empty(),
    p("1. Ich __________________ einen Bruder."),
    p("2. Du __________________ einen Hund."),
    p("3. Tom __________________ ein Fahrrad."),
    p("4. Wir __________________ ein grosses Haus."),
    p("5. Ihr __________________ viele Buecher."),
    empty(),
    pBold("Teil 3: Ergaenze MOEGEN oder HEISSEN."),
    empty(),
    p("1. Wie __________________ du?"),
    p("2. Ich __________________ Sara."),
    p("3. Was __________________ ihr gern essen?"),
    p("4. Sie (Plural) __________________ Schokolade."),
    p("5. Wir __________________ Anna und Ben."),
    empty(),
    pBold("Teil 4: Dialog – Sich vorstellen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lara"), dCell("Hallo! Ich __________________ Lara. Wie __________________ du?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ich __________________ Ben. Ich __________________ 9 Jahre alt.")] }),
        new TableRow({ children: [dCell("Lara"), dCell("__________________ du Geschwister?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ja, ich __________________ einen Bruder.")] }),
        new TableRow({ children: [dCell("Lara"), dCell("__________________ du Tiere?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ja, ich __________________ Hunde sehr gern.")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Verben im Praesens (LOESUNG)"), empty(),
    pBold("Teil 1: SEIN"),
    bullet("1. bin"), bullet("2. bist"), bullet("3. ist"),
    bullet("4. sind"), bullet("5. seid"),
    empty(),
    pBold("Teil 2: HABEN"),
    bullet("1. habe"), bullet("2. hast"), bullet("3. hat"),
    bullet("4. haben"), bullet("5. habt"),
    empty(),
    pBold("Teil 3: MOEGEN / HEISSEN"),
    bullet("1. heisst"), bullet("2. heisse"), bullet("3. moegt"),
    bullet("4. moegen"), bullet("5. heissen"),
    empty(),
    pBold("Teil 4: Dialog"),
    bullet("Lara: ... heisse Lara. Wie heisst du?"),
    bullet("Ben: ... heisse Ben. Ich bin 9 Jahre alt."),
    bullet("Lara: Hast du Geschwister?"),
    bullet("Ben: ... habe einen Bruder."),
    bullet("Lara: Magst du Tiere?"),
    bullet("Ben: ... mag Hunde sehr gern."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Verben im Praesens"), empty(),
    pBold("Die 4 wichtigsten Verben fuer A1:"),
    makeKonjugationsTable(),
    empty(),
    h2("Beispielsaetze"),
    pBold("SEIN"),
    bullet("Ich bin Anna. — I am Anna."),
    bullet("Du bist mein Freund. — You are my friend."),
    bullet("Er/Sie ist 9 Jahre alt. — He/She is 9 years old."),
    bullet("Wir sind in der Schule. — We are at school."),
    empty(),
    pBold("HABEN"),
    bullet("Ich habe einen Hund. — I have a dog."),
    bullet("Du hast Hunger? — Are you hungry?"),
    bullet("Sie hat ein neues Buch. — She has a new book."),
    bullet("Wir haben Hausaufgaben. — We have homework."),
    empty(),
    pBold("MOEGEN"),
    bullet("Ich mag Pizza. — I like pizza."),
    bullet("Magst du Schokolade? — Do you like chocolate?"),
    bullet("Er mag Tiere. — He likes animals."),
    bullet("Wir moegen Musik. — We like music."),
    empty(),
    pBold("HEISSEN"),
    bullet("Ich heisse Tom. — My name is Tom."),
    bullet("Wie heisst du? — What's your name?"),
    bullet("Sie heisst Lena. — Her name is Lena."),
    bullet("Wir heissen Anna und Ben. — Our names are Anna and Ben."),
    empty(),
    pBold("Aufgabe: Schreib zu jedem Verb 2 eigene Saetze."),
    p("sein:"), writeLine(55), writeLine(55), empty(),
    p("haben:"), writeLine(55), writeLine(55), empty(),
    p("moegen:"), writeLine(55), writeLine(55), empty(),
    p("heissen:"), writeLine(55), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Verben im Praesens (LOESUNG)"), empty(),
    makeKonjugationsTable(),
    empty(),
    pBold("Wichtigste Regeln:"),
    bullet("SEIN und HABEN sind UNREGELMAESSIG — auswendig lernen!"),
    bullet("MOEGEN ist ein Modalverb — ich-Form ohne Endung: Ich mag (NICHT: ich moege)"),
    bullet("HEISSEN ist regelmaessig: Stamm 'heiss' + Endung (e/st/t/en)"),
    bullet("Bei du-Form: heissen → du heisst (nicht 'heisstst')"),
    empty(),
    pBold("Musterantworten Aufgabe:"),
    bullet("sein: Ich bin Schueler. / Wir sind 9 Jahre alt."),
    bullet("haben: Ich habe ein Fahrrad. / Du hast einen Bruder."),
    bullet("moegen: Ich mag Eis. / Wir moegen Hunde."),
    bullet("heissen: Ich heisse Mia. / Mein Lehrer heisst Herr Mueller."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Verben im Praesens"), empty(),
    pBold("Dialog 1: Sich vorstellen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"), dCell("Hallo! Wie heisst du?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich heisse Tim. Und du?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ich heisse Anna. Wie alt bist du?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich bin 8 Jahre alt. Hast du Geschwister?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ja, ich habe einen Bruder. Er heisst Max.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Magst du Tiere?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Ja, ich mag Katzen sehr gern!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ueber die Familie"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Wie heissen deine Eltern?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Mein Vater heisst Tom und meine Mutter heisst Eva.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Habt ihr Haustiere?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Ja, wir haben einen Hund. Er heisst Rex.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Magst du Hunde?")] }),
        new TableRow({ children: [dCell("Lisa"), dCell("Ja, sehr! Aber meine Schwester mag Katzen lieber.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Verben benutzen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage (mit Verb)", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie heisst du? (heissen)"), dCell("")] }),
        new TableRow({ children: [dCell("Wie alt bist du? (sein)"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du ein Haustier? (haben)"), dCell("")] }),
        new TableRow({ children: [dCell("Was magst du am liebsten? (moegen)"), dCell("")] }),
        new TableRow({ children: [dCell("Wie heissen deine Eltern? (heissen)"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Verb-Kette"),
    bullet("Lehrkraft sagt einen Satz: 'Ich bin Schuelerin.'"),
    bullet("Naechstes Kind: 'Du bist Schuelerin.'"),
    bullet("Naechstes: 'Er ist Schueler.' usw. durch alle Personen."),
    bullet("Dann mit haben / moegen / heissen wiederholen!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Verben im Praesens (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie heisst du? — Frage mit heissen (du-Form: heisst)"),
    bullet("Ich heisse ... — ich-Form (heisse)"),
    bullet("Wie alt bist du? — sein (du bist) + Adjektiv"),
    bullet("Hast du ...? — Ja/Nein-Frage mit haben"),
    bullet("Magst du ...? — Ja/Nein-Frage mit moegen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wie heissen deine Eltern? — heissen (sie-Plural-Form)"),
    bullet("Habt ihr ...? — haben (ihr-Form: habt)"),
    bullet("Mein Vater heisst ... — er-Form (heisst)"),
    bullet("Wir haben einen Hund — wir-Form (haben)"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte ich-Form (bin / habe / mag / heisse)"),
    bullet("Korrekte du-Form (bist / hast / magst / heisst)"),
    bullet("Vollstaendige Saetze, nicht nur Wortantworten"),
    bullet("Verben passend zur Frage konjugiert"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Verben im Praesens"), empty(),
    pBold("Aufgabe 1: [BILD 1: 4 verschiedene Personen mit Namensschildern und Alter]"),
    p("Schreib zu jeder Person 2 Saetze mit HEISSEN und SEIN."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2350 }), hCell("Name + Alter", { width: 3000 }), hCell("Saetze", { width: 4150 })] }),
        new TableRow({ children: [dCell("[BILD: Maedchen]"), dCell("Maria, 8"), dCell("________________")] }),
        new TableRow({ children: [dCell("[BILD: Junge]"), dCell("David, 10"), dCell("________________")] }),
        new TableRow({ children: [dCell("[BILD: Frau]"), dCell("Frau Mueller, 35"), dCell("________________")] }),
        new TableRow({ children: [dCell("[BILD: Mann]"), dCell("Herr Schmidt, 42"), dCell("________________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Kind mit verschiedenen Sachen — Buch, Hund, Eis, Fahrrad]"),
    p("Schreib Saetze mit HABEN und MOEGEN."),
    empty(),
    p("Beispiel: Das Kind hat ein Buch. Es mag Buecher."),
    empty(),
    p("1. (Hund): __________________"),
    writeLine(55), empty(),
    p("2. (Eis): __________________"),
    writeLine(55), empty(),
    p("3. (Fahrrad): __________________"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Verb-Memory"),
    p("Verbinde Pronomen + Verbform mit einer Linie."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Pronomen", { width: 4750 }), hCell("Verbform", { width: 4750 })] }),
        new TableRow({ children: [dCell("ich"), dCell("seid (sein)")] }),
        new TableRow({ children: [dCell("du"), dCell("habe (haben)")] }),
        new TableRow({ children: [dCell("er"), dCell("magst (moegen)")] }),
        new TableRow({ children: [dCell("wir"), dCell("heisst (heissen)")] }),
        new TableRow({ children: [dCell("ihr"), dCell("moegen (moegen)")] }),
        new TableRow({ children: [dCell("sie (Plural)"), dCell("ist (sein)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: [BILD 4: Familie mit Eltern und 2 Kindern]"),
    p("Schreib 4 Saetze ueber die Familie. Benutze sein, haben, moegen, heissen."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Verben im Praesens (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    bullet("Sie heisst Maria. Sie ist 8 Jahre alt."),
    bullet("Er heisst David. Er ist 10 Jahre alt."),
    bullet("Sie heisst Frau Mueller. Sie ist 35 Jahre alt."),
    bullet("Er heisst Herr Schmidt. Er ist 42 Jahre alt."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("1. Das Kind hat einen Hund. Es mag Hunde."),
    bullet("2. Das Kind hat ein Eis. Es mag Eis."),
    bullet("3. Das Kind hat ein Fahrrad. Es mag Fahrradfahren."),
    empty(),
    pBold("Aufgabe 3: Verb-Memory"),
    bullet("ich → habe (haben)"),
    bullet("du → magst (moegen)"),
    bullet("er → ist (sein)"),
    bullet("wir → moegen (moegen)"),
    bullet("ihr → seid (sein)"),
    bullet("sie (Plural) → heisst → Achtung: sie heissen! Hier ist 'heisst' fuer er/sie/es."),
    pItalic("Hinweis: 'sie (Plural)' und 'heisst' passen NICHT zusammen. Korrekt: sie heissen. Pruefe die Logik!"),
    empty(),
    pBold("Aufgabe 4: Musterantwort (Familie)"),
    pItalic("Die Familie ist gluecklich. Der Vater heisst Peter und die Mutter heisst Maria. Sie haben zwei Kinder. Die Kinder moegen ihre Eltern sehr."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Verben Praesens");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
