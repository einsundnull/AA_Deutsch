"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "ABSCHLUSS");
const TOPIC     = "A1_Kinder_GrammatikMinimum";
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
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " – ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
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

function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Grammatik-Minimum"),
    p("Name: ___________________________     Datum: ___________________     Punkte: ______ / 60"),
    pItalic("Dieser Test prueft die Grundgrammatik: Verben, Artikel, Plural, Wortstellung und Personalpronomen."),
    empty(),

    h2("Aufgabe 1: Verben Praesens (10 Punkte)"),
    pBold("Schreib die richtige Form von SEIN, HABEN, MOEGEN oder HEISSEN."),
    empty(),
    p("1. Ich __________________ Marie. (heissen)"),
    p("2. Du __________________ einen Hund. (haben)"),
    p("3. Tom __________________ 9 Jahre alt. (sein)"),
    p("4. Wir __________________ Pizza. (moegen)"),
    p("5. Wie __________________ ihr? (heissen)"),
    p("6. Anna und Ben __________________ Geschwister. (sein)"),
    p("7. Mama __________________ ein neues Auto. (haben)"),
    p("8. Was __________________ du gern? (moegen)"),
    p("9. Mein Bruder __________________ Max. (heissen)"),
    p("10. Ihr __________________ in der Schule. (sein)"),
    empty(),

    h2("Aufgabe 2: Artikel der/die/das (10 Punkte)"),
    pBold("Schreib den richtigen Artikel."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 }), hCell("Nomen", { width: 2350 }), hCell("Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Hund"),     dCell(""), dCell("Schule"),  dCell("")] }),
        new TableRow({ children: [dCell("Buch"),     dCell(""), dCell("Apfel"),   dCell("")] }),
        new TableRow({ children: [dCell("Katze"),    dCell(""), dCell("Auto"),    dCell("")] }),
        new TableRow({ children: [dCell("Vater"),    dCell(""), dCell("Mutter"),  dCell("")] }),
        new TableRow({ children: [dCell("Tisch"),    dCell(""), dCell("Maedchen"),dCell("")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 3: Plural (10 Punkte)"),
    pBold("Schreib den Plural mit Artikel."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Singular", { width: 4750 }), hCell("Plural", { width: 4750 })] }),
        new TableRow({ children: [dCell("der Hund"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("die Katze"),   dCell("die ____________")] }),
        new TableRow({ children: [dCell("das Buch"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("das Kind"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Apfel"),   dCell("die ____________")] }),
        new TableRow({ children: [dCell("die Mutter"),  dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Tisch"),   dCell("die ____________")] }),
        new TableRow({ children: [dCell("das Auto"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("die Frau"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("das Maedchen"),dCell("die ____________")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Wortstellung (10 Punkte)"),
    pBold("Schreib die Saetze in der richtigen Reihenfolge."),
    empty(),
    p("1. spielt / Tom / Fussball"),
    writeLine(55), empty(),
    p("2. ich / Schokolade / mag"),
    writeLine(55), empty(),
    p("3. wir / heute / spielen / Fussball"),
    writeLine(55), empty(),
    p("4. heisst / wie / du / ?"),
    writeLine(55), empty(),
    p("5. einen Hund / hast / du / ?"),
    writeLine(55), empty(),
    pItalic("Hinweis: Verb auf Position 2 (Aussage) oder Position 1 (Ja/Nein-Frage)!"),
    empty(),

    h2("Aufgabe 5: Personalpronomen (10 Punkte)"),
    pBold("Schreib das richtige Pronomen."),
    empty(),
    p("1. __________________ heisse Lisa."),
    p("2. Wie heisst __________________?"),
    p("3. Mama ist Lehrerin. __________________ ist nett."),
    p("4. Mein Bruder spielt. __________________ ist 12 Jahre alt."),
    p("5. Das Buch ist neu. __________________ ist auf dem Tisch."),
    p("6. Tom und ich sind Freunde. __________________ spielen zusammen."),
    p("7. Kinder, was macht __________________ heute?"),
    p("8. Anna und Lisa sind klein. __________________ sind 6 Jahre alt."),
    p("9. Frau Mueller, wie heissen __________________?"),
    p("10. Das Maedchen heisst Lara. __________________ ist sehr lustig."),
    empty(),

    h2("Aufgabe 6: Lesetext + Antworten (10 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo, ich heisse Sophie und ich bin 9 Jahre alt."),
          p("Meine Familie ist gross. Wir sind 5 Personen."),
          p("Mein Vater heisst Tom. Er ist Lehrer."),
          p("Meine Mutter heisst Eva. Sie arbeitet im Krankenhaus."),
          p("Ich habe einen Bruder. Er heisst Max und ist 6 Jahre alt."),
          p("Ich habe auch eine Schwester. Sie heisst Mia und ist 12 Jahre alt."),
          p("Wir haben eine Katze. Sie heisst Mimi und ist sehr lieb."),
        ],
      })]})],
    }),
    empty(),
    pBold("Beantworte die Fragen — nutze die richtigen Pronomen!"),
    p("1. Wie heisst die Erzaehlerin?"),
    writeLine(55), empty(),
    p("2. Wie viele Personen sind in der Familie?"),
    writeLine(55), empty(),
    p("3. Was macht der Vater?"),
    writeLine(55), empty(),
    p("4. Wie alt ist Max?"),
    writeLine(55), empty(),
    p("5. Wer ist Mimi?"),
    writeLine(55), empty(),

    h2("Selbstevaluation"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7000 }), hCell("super", { width: 1000 }), hCell("gut", { width: 1000 }), hCell("noch nicht", { width: 1000 })] }),
        new TableRow({ children: [dCell("... sein, haben, moegen, heissen konjugieren."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... den richtigen Artikel (der/die/das) waehlen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... den Plural von Nomen bilden."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... das Verb in Aussagesaetzen richtig stellen."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... W-Fragen und Ja/Nein-Fragen bilden."), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("... Personalpronomen richtig verwenden."), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusstest – Grammatik-Minimum (LOESUNG)"),
    p("Gesamtpunkte: 60"),
    empty(),

    h2("Aufgabe 1: Verben (10 Punkte – je 1 Punkt)"),
    bullet("1. heisse"), bullet("2. hast"), bullet("3. ist"),
    bullet("4. moegen"), bullet("5. heisst"), bullet("6. sind"),
    bullet("7. hat"), bullet("8. magst"), bullet("9. heisst"),
    bullet("10. seid"),
    empty(),

    h2("Aufgabe 2: Artikel (10 Punkte – je 1 Punkt)"),
    bullet("der Hund / die Schule"),
    bullet("das Buch / der Apfel"),
    bullet("die Katze / das Auto"),
    bullet("der Vater / die Mutter"),
    bullet("der Tisch / das Maedchen"),
    empty(),

    h2("Aufgabe 3: Plural (10 Punkte – je 1 Punkt)"),
    bullet("die Hunde"),
    bullet("die Katzen"),
    bullet("die Buecher"),
    bullet("die Kinder"),
    bullet("die Aepfel"),
    bullet("die Muetter"),
    bullet("die Tische"),
    bullet("die Autos"),
    bullet("die Frauen"),
    bullet("die Maedchen"),
    empty(),

    h2("Aufgabe 4: Wortstellung (10 Punkte – je 2 Punkte)"),
    bullet("1. Tom spielt Fussball."),
    bullet("2. Ich mag Schokolade."),
    bullet("3. Heute spielen wir Fussball. (Verb auf Pos. 2!)"),
    bullet("4. Wie heisst du?"),
    bullet("5. Hast du einen Hund?"),
    empty(),

    h2("Aufgabe 5: Pronomen (10 Punkte – je 1 Punkt)"),
    bullet("1. Ich"), bullet("2. du"), bullet("3. Sie"),
    bullet("4. Er"), bullet("5. Es"), bullet("6. Wir"),
    bullet("7. ihr"), bullet("8. Sie"), bullet("9. Sie (gross!)"),
    bullet("10. Sie (oder: Es — beide moeglich, das Maedchen ist neutrum)"),
    empty(),

    h2("Aufgabe 6: Lesetext (10 Punkte – je 2 Punkte)"),
    bullet("1. Sie heisst Sophie."),
    bullet("2. Sie sind 5 Personen."),
    bullet("3. Er ist Lehrer."),
    bullet("4. Er ist 6 Jahre alt."),
    bullet("5. Sie ist die Katze (von der Familie)."),
    empty(),

    h2("Notenspiegel (60 Punkte)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2500 }), hCell("Punkte", { width: 2500 }), hCell("Note", { width: 2000 })] }),
        new TableRow({ children: [dCell("57-60"), dCell("1 (sehr gut)"), dCell("39-46"), dCell("3 (befriedigend)")] }),
        new TableRow({ children: [dCell("47-56"), dCell("2 (gut)"),       dCell("30-38"), dCell("4 (ausreichend)")] }),
        new TableRow({ children: [dCell("29 und weniger"), dCell("5/6 (nicht ausreichend)"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    pBold("Bewertungs-Hinweis fuer Lehrer:"),
    bullet("Bei Aufgabe 4 (Wortstellung): Achte besonders darauf, ob das Verb wirklich auf Position 2 steht."),
    bullet("Bei Aufgabe 5 (Pronomen): 'das Maedchen' ist grammatisch neutrum (es), aber Schueler sagen oft 'sie' (semantisch korrekt) — beide akzeptieren."),
    bullet("Bei Aufgabe 6 (Antworten): Vollstaendige Saetze mit Pronomen und Verb auf Pos. 2 belohnen."),
  ]);
}

console.log("Erstelle ABSCHLUSS: GrammatikMinimum");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
