"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "08_NaturUmwelt", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_NaturUmwelt";
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
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " — ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
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

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Natur & Umwelt"), empty(),
    pItalic("Diese Abschlussübung verbindet Tiere und Pflanzen mit Umweltthemen."),
    empty(),

    // AUFGABE 1: Lesetext
    h2("Aufgabe 1: Lesen und verstehen"),
    pBold("Lies den Text und beantworte die Fragen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Der Wald braucht uns — und wir brauchen den Wald"),
          empty(),
          p("Der Wald ist einer der wichtigsten Lebensraeume auf der Erde. In einem deutschen Wald leben viele Tiere: Rehe, Fuechse, Woelfe, Eulen, Spechte und viele andere. Aber auch zahlreiche Pflanzen wachsen dort: Eichen, Tannen, Farne und Pilze."),
          p("Der Wald ist wichtig fuer unsere Luft. Baeume nehmen CO2 auf und geben Sauerstoff ab — das brauchen alle Lebewesen zum Atmen. Ein einziger Baum kann pro Jahr so viel Sauerstoff produzieren wie ein Mensch in einem Jahr einatmet."),
          p("Leider sind viele Waelder heute in Gefahr. Durch den Klimawandel gibt es laengere Trockenperioden, und viele Baeume sterben. Ausserdem wird Wald fuer Landwirtschaft und Strassenbau abgeholzt."),
          p("Was koennen wir tun? Wir koennen Papier sparen, damit weniger Baeume gefaellt werden. Wir koennen Muell im Wald aufheben, statt ihn liegen zu lassen. Wir koennen seltene Tiere schuetzen, indem wir ihren Lebensraum erhalten."),
          p("Der Wald braucht unsere Hilfe — und wenn wir gut auf ihn aufpassen, wird er uns noch lange mit frischer Luft, sauberem Wasser und einem schoenen Lebensraum fuer Tiere versorgen."),
        ],
      })]})],
    }),
    empty(),
    pBold("a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Im deutschen Wald leben unter anderem Rehe und Eulen."), dCell("")] }),
        new TableRow({ children: [dCell("Baeume nehmen Sauerstoff auf und geben CO2 ab."), dCell("")] }),
        new TableRow({ children: [dCell("Viele Waelder sind durch den Klimawandel in Gefahr."), dCell("")] }),
        new TableRow({ children: [dCell("Papier sparen hilft, Baeume zu schuetzen."), dCell("")] }),
        new TableRow({ children: [dCell("Der Text sagt, wir sollen Muell im Wald liegen lassen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("b) Beantworte die Fragen."),
    empty(),
    p("1. Warum sind Baeume wichtig fuer unsere Luft?"),
    writeLine(55), empty(),
    p("2. Nenne zwei Gruende, warum Waelder in Gefahr sind."),
    writeLine(55), empty(),
    p("3. Nenne zwei Dinge, die wir tun koennen, um den Wald zu schuetzen."),
    writeLine(55), empty(),

    // AUFGABE 2: Lueckentext
    h2("Aufgabe 2: Lueckentext"),
    pBold("Ergaenze den Text mit den richtigen Woertern."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Lebensraum  -  Raubtier  -  ernaehrt  -  Muelltonne  -  recyceln  -  wichtig  -  gefaehrdet  -  Strom  -  sollte  -  schadet  -  aussterben  -  Pflanzenfresser")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Der Wolf ist ein __________________ und __________________ sich von anderen Tieren."),
          p("Das Reh ist ein __________________ — es frisst Gras und Blaetter."),
          p("Viele Tiere sind __________________, weil ihr __________________ zerstoert wird."),
          p("Wenn wir nicht aufpassen, koennen sie __________________."),
          p("Plastikmuell in der Natur __________________ Tieren und Pflanzen."),
          p("Man __________________ Papier in die blaue __________________ werfen, damit man es __________________ kann."),
          p("Es ist __________________, dass wir __________________ sparen und das Licht ausschalten."),
        ],
      })]})],
    }),
    empty(),

    // AUFGABE 3: Tier beschreiben
    h2("Aufgabe 3: Ein Tier beschreiben"),
    pBold("Waehle ein Tier aus und beschreibe es in 5-6 Saetzen."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Wolf  |  Adler  |  Biber  |  Fuchs  |  Schmetterling  |  Reh  |  eigene Wahl")],
      })]})],
    }),
    pItalic("Hilfe: Name und Artikel  |  Lebensraum  |  Aussehen  |  Ernaehrung  |  Faehigkeiten  |  Ist es gefaehrdet?"),
    empty(),
    ...writeLines(6, 55),
    empty(),

    // AUFGABE 4: Umwelttipps schreiben
    h2("Aufgabe 4: Umwelttipps fuer die Schule"),
    pBold("Schreib 4 Umwelttipps fuer deine Schule. Benutze: Man sollte ... / Man kann ... / Es ist wichtig, dass ..."),
    empty(),
    p("1. ____________________________________________________________"),
    writeLine(50), empty(),
    p("2. ____________________________________________________________"),
    writeLine(50), empty(),
    p("3. ____________________________________________________________"),
    writeLine(50), empty(),
    p("4. ____________________________________________________________"),
    writeLine(50), empty(),

    // AUFGABE 5: Schreibaufgabe
    h2("Aufgabe 5: Natur und Umwelt — meine Meinung"),
    pBold("Schreib 7-8 Saetze. Beantworte diese Fragen:"),
    bullet("Welches Tier in der Natur magst du am liebsten? Beschreibe es kurz."),
    bullet("Was tust du fuer die Umwelt?"),
    bullet("Was findest du am wichtigsten fuer den Schutz der Natur?"),
    empty(),
    ...writeLines(8, 55),
    empty(),

    // AUFGABE 6: Selbstevaluation
    h2("Aufgabe 6: Selbstevaluation"),
    pBold("Was kannst du jetzt? Kreuze an."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7500 }), hCell("☐ gut  ☐ noch nicht", { width: 2000 })] }),
        new TableRow({ children: [dCell("... Tiere und Pflanzen ihrem Lebensraum zuordnen."), dCell("")] }),
        new TableRow({ children: [dCell("... ein Tier mit Lebensraum, Aussehen und Ernaehrung beschreiben."), dCell("")] }),
        new TableRow({ children: [dCell("... Woerter wie 'Raubtier', 'Pflanzenfresser' und 'gefaehrdet' erklaeren."), dCell("")] }),
        new TableRow({ children: [dCell("... Muell den richtigen Muelltonnen zuordnen."), dCell("")] }),
        new TableRow({ children: [dCell("... Umwelttipps mit 'Man sollte ...' formulieren."), dCell("")] }),
        new TableRow({ children: [dCell("... erklaeren, warum Natur und Umweltschutz wichtig sind."), dCell("")] }),
      ],
    }),
  ]);
}

// ── ABSCHLUSS LOESUNG ─────────────────────────────────────────────────────────
function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Natur & Umwelt (LOESUNG)"), empty(),

    h2("Aufgabe 1a: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Im deutschen Wald leben unter anderem Rehe und Eulen."), dCell("R")] }),
        new TableRow({ children: [dCell("Baeume nehmen Sauerstoff auf und geben CO2 ab."), dCell("F (umgekehrt: CO2 aufnehmen, Sauerstoff abgeben)")] }),
        new TableRow({ children: [dCell("Viele Waelder sind durch den Klimawandel in Gefahr."), dCell("R")] }),
        new TableRow({ children: [dCell("Papier sparen hilft, Baeume zu schuetzen."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Text sagt, wir sollen Muell im Wald liegen lassen."), dCell("F (wir sollen ihn aufheben)")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b: Antworten"),
    bullet("1. Baeume nehmen CO2 auf und geben Sauerstoff ab — den brauchen alle Lebewesen zum Atmen."),
    bullet("2. Klimawandel / laengere Trockenperioden / Abholzung fuer Landwirtschaft und Strassenbau."),
    bullet("3. Papier sparen / Muell im Wald aufheben / seltene Tiere und ihren Lebensraum schuetzen."),
    empty(),

    h2("Aufgabe 2: Lueckentext"),
    bullet("Raubtier — ernaehrt"),
    bullet("Pflanzenfresser"),
    bullet("gefaehrdet — Lebensraum"),
    bullet("aussterben"),
    bullet("schadet"),
    bullet("sollte — Muelltonne — recyceln"),
    bullet("wichtig — Strom"),
    pItalic("Alle 12 Woerter verwendet."),
    empty(),

    h2("Aufgabe 3: individuelle Antworten"),
    pItalic("Musterbeschreibung Wolf: Der Wolf ist ein Raubtier. Er lebt im Wald und auf Feldern. Er hat graues oder braunes Fell und scharfe Zaehne. Er ernaehrt sich von anderen Tieren wie Rehen oder Hasen. Er kann sehr schnell laufen und lebt in Rudeln. Der Wolf war fruher fast ausgestorben, heute ist er wieder geschuetzt."),
    pItalic("Auf Genus, Dativ nach 'in' (im Wald) und 'von' (von anderen Tieren) achten."),
    empty(),

    h2("Aufgabe 4: Musterloesung Umwelttipps"),
    bullet("1. Man sollte das Licht ausschalten, wenn man den Raum verlaesst."),
    bullet("2. Man kann Trinkflaschen statt Einwegplastikflaschen benutzen."),
    bullet("3. Es ist wichtig, dass wir den Muell in der Schule richtig trennen."),
    bullet("4. Man sollte Papier auf beiden Seiten bedrucken, um Ressourcen zu sparen."),
    pItalic("Andere korrekte Tipps akzeptieren. Auf Satzstruktur achten: Man sollte + Infinitiv; Es ist wichtig, dass + Nebensatz (Verb am Ende)."),
    empty(),

    h2("Aufgabe 5: individuelle Antworten"),
    pItalic("Erwartete Elemente: Tierbeschreibung (Lebensraum + Ernaehrung + eine Eigenschaft), mindestens zwei eigene Umwelthandlungen, eine begruendete Meinung zum Umweltschutz."),
    pItalic("Grammatikpunkte pruefen: Dativ nach 'in/an/von', Perfekt fuer Vergangenheit, Man sollte/koennte fuer Empfehlungen, weil-Saetze."),
    empty(),

    h2("Aufgabe 6: Selbstevaluation"),
    pItalic("Keine feste Loesung — individuelle Selbsteinschaetzung. Klassendiskussion: Welche Lernziele sollen noch vertieft werden?"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle ABSCHLUSS: Natur & Umwelt (kombiniert UP 01 + UP 02)");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
