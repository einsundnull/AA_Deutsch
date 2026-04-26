"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "06_Kleidung", "ABSCHLUSS");
const TOPIC = "A1_Kinder_Kleidung";
const BLUE = "1F4E79";
const GRAY = "888888";
const LIGHT = "D5E8F0";
if (!fs.existsSync(BASE)) fs.mkdirSync(BASE, { recursive: true });

const NUMBERING = { config: [{ reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] };
const PAGE = { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } };

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: BLUE, font: "Arial" })], spacing: { before: 240, after: 120 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 80 } }); }
function p(t, s) { return new Paragraph({ children: [new TextRun({ text: t, size: s || 24, font: "Arial" })], spacing: { before: 60, after: 60 } }); }
function pBold(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, font: "Arial" })], spacing: { before: 60, after: 60 } }); }
function pItalic(t) { return new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 22, color: GRAY, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function empty() { return new Paragraph({ children: [new TextRun("")], spacing: { before: 60, after: 60 } }); }
function writeLine() { return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] }); }
function writeLines(n) { const a = []; for (let i = 0; i < n; i++) a.push(writeLine()); return a; }
function br() { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: t, size: 24, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function hCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: LIGHT }, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 22, font: "Arial" })] })] }); }
function dCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFFFFF" }, children: [new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })] })] }); }
function studentHead() { return new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4500, 4500], rows: [ new TableRow({ children: [hCell("Name:", 4500), hCell("Datum:", 4500)] }), new TableRow({ children: [dCell("", 4500), dCell("", 4500)] }) ] }); }
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Kleidung — Abschlussübung", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

async function abschluss() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Abschlussübung — Kleidung"),
    studentHead(), empty(),
    pItalic("Diese Übung kombiniert: Kleidungsstücke + Farben und Kleidung"),
    empty(),

    h2("Aufgabe 1: Lückentext  (10 Punkte)"),
    p("Fülle die Lücken mit den richtigen Wörtern aus dem Kasten."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "Jacke  •  Hose  •  Schuhe  •  Kleid  •  Pullover  •  blau  •  rot  •  weiß  •  schwarz  •  grün  •  Mütze  •  Schal", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    p("Heute ist Sonntag. Jonas geht mit seiner Familie in die Stadt."),
    p("Er zieht eine _______ Hose und ein _______ T-Shirt an."),
    p("Es ist kalt draußen, also nimmt er auch einen _______ Pullover"),
    p("und eine _______ Jacke. Er trägt _______ Schuhe."),
    p("Seine Schwester Clara trägt ein _______ Kleid mit weißen Punkten."),
    p("Sie hat auch einen _______ Schal um den Hals."),
    p("Ihre Mutter trägt eine lange _______ Hose und einen _______ Mantel."),
    p("Der Vater hat eine _______ Mütze auf dem Kopf — er friert immer!"),
    p("\"Ihr seht alle toll aus!\", sagt die Großmutter."),
    empty(),

    h2("Aufgabe 2: Richtig (R) oder falsch (F)?  (6 Punkte)"),
    p("___ Jonas trägt eine rote Hose."),
    p("___ Jonas nimmt einen Pullover mit, weil es kalt ist."),
    p("___ Clara trägt ein Kleid mit schwarzen Punkten."),
    p("___ Jonas trägt schwarze Schuhe."),
    p("___ Der Vater hat eine Mütze auf."),
    p("___ Die Großmutter sagt, sie sehen toll aus."),
    empty(),

    h2("Aufgabe 3: Sommer oder Winter?  (6 Punkte)"),
    p("Schreibe jedes Kleidungsstück in die richtige Spalte."),
    pItalic("T-Shirt  •  Mütze  •  Stiefel  •  Shorts  •  Schal  •  Handschuhe  •  Kleid  •  Pullover  •  Sandalen  •  Jacke  •  Socken  •  Badeanzug"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Sommer", 4819), hCell("Winter", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    br(),

    h2("Aufgabe 4: Richtige Adjektivendung  (8 Punkte)"),
    p("Ergänze die Endung: -er, -e oder -es."),
    pItalic("Denke an den Artikel: der (mask.) → -er  |  die (fem.) → -e  |  das (neut.) → -es  |  Plural → -e"),
    empty(),
    p("1. Ich trage ein rot_____ T-Shirt.          (das T-Shirt)"),
    p("2. Er hat eine blau_____ Jacke an.          (die Jacke)"),
    p("3. Sie trägt einen grün_____ Rock.          (der Rock)"),
    p("4. Ich suche ein gelb_____ Kleid.           (das Kleid)"),
    p("5. Er trägt schwarz_____ Schuhe.            (Plural)"),
    p("6. Meine weiß_____ Socken sind neu.         (Plural)"),
    p("7. Sie hat einen rot_____ Schal.            (der Schal)"),
    p("8. Ich finde das braun_____ Hemd sehr schön. (das Hemd)"),
    empty(),

    h2("Aufgabe 5: Outfit beschreiben  (8 Punkte)"),
    p("Beschreibe das Outfit einer Person. Du kannst eine echte Person oder eine erfundene Person beschreiben."),
    p("Schreibe 5–7 Sätze. Benutze mindestens 4 Kleidungsstücke und 4 Farben."),
    pItalic("Sie/Er trägt... / Das... ist... / Die... sind..."),
    ...writeLines(7),
    empty(),

    h2("Aufgabe 6: Partnerinterview  (6 Punkte)"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort deines Partners / deiner Partnerin", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du heute?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingskleidungsstück?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Welche Farben kombinierst du gern?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du im Winter?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du zum Sport?", 4819), dCell("", 4819)] })
    ]}),
    empty(),

    h2("Aufgabe 7: Selbstevaluation"),
    p("Was kann ich jetzt? Kreuze an:"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Ich kann ...", 6638), hCell("☐ gut", 1500), hCell("☐ noch üben", 1500)] }),
      new TableRow({ children: [dCell("12 Kleidungsstücke auf Deutsch nennen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Den Artikel (der/die/das) bei Kleidung sagen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Kleidung mit Farbe beschreiben: 'ein rotes Kleid'.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Sommer- und Winterkleidung unterscheiden.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Mein Outfit auf Deutsch beschreiben.", 6638), dCell("☐", 1500), dCell("☐", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS.docx`);
}

async function abschluss_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Abschlussübung Kleidung"),
    empty(),

    h2("Aufgabe 1: Lückentext  (10 Punkte — je 1 Punkt)"),
    p("Zeile 1: blaue Hose / weißes T-Shirt"),
    p("Zeile 2: grünen Pullover  (oder: schwarzen / roten)"),
    p("Zeile 3: schwarze Jacke  (oder andere Farbe)"),
    p("Zeile 4: schwarze Schuhe  (oder weiße / braune)"),
    p("Zeile 5: rotes Kleid"),
    p("Zeile 6: weißen Schal  (oder: roten / blauen)"),
    p("Zeile 7: schwarze Hose / weißen Mantel  (oder andere Farben)"),
    p("Zeile 8: blaue Mütze  (oder: rote / grüne)"),
    pItalic("Hinweis: Farbadjektive mit unterschiedlichen Endungen akzeptieren, solange sinnvoll."),
    empty(),

    h2("Aufgabe 2: Richtig oder falsch?  (6 Punkte — je 1 Punkt)"),
    p("F — Jonas trägt eine blaue Hose (nicht rot)."),
    p("R — Jonas nimmt einen Pullover mit, weil es kalt ist."),
    p("F — Clara trägt ein Kleid mit weißen Punkten (nicht schwarzen)."),
    p("R — Jonas trägt schwarze Schuhe."),
    p("R — Der Vater hat eine Mütze auf."),
    p("R — Die Großmutter sagt, sie sehen toll aus."),
    empty(),

    h2("Aufgabe 3: Sommer oder Winter?  (6 Punkte — je 0,5 Punkte)"),
    p("Sommer: T-Shirt, Shorts, Kleid, Sandalen, Badeanzug  (und ggf. leichte Jacke/Socken)"),
    p("Winter: Mütze, Stiefel, Schal, Handschuhe, Pullover, Jacke, Socken"),
    pItalic("Jacke und Socken können für beide Jahreszeiten akzeptiert werden."),
    empty(),

    h2("Aufgabe 4: Richtige Adjektivendung  (8 Punkte — je 1 Punkt)"),
    p("1. ein rotes T-Shirt          (das → -es)"),
    p("2. eine blaue Jacke           (die → -e)"),
    p("3. einen grünen Rock          (der Akk. → -en)"),
    p("4. ein gelbes Kleid           (das → -es)"),
    p("5. schwarze Schuhe            (Plural → -e)"),
    p("6. weiße Socken               (Plural → -e)"),
    p("7. einen roten Schal          (der Akk. → -en)"),
    p("8. das braune Hemd            (das → -e nach 'das')"),
    empty(),
    pItalic("Hinweis A1: -er/-e/-es als Grundregel. Akkusativ -en für fortgeschrittenere Lernende."),
    empty(),

    h2("Aufgabe 5: Outfit beschreiben  (8 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Mindestens 4 Kleidungsstücke korrekt benannt (2 Punkte)"),
    bullet("Mindestens 4 Farbadjektive verwendet (2 Punkte)"),
    bullet("Adjektivendungen versucht — auch bei Fehlern zählt der Versuch (2 Punkte)"),
    bullet("5–7 verständliche Sätze (2 Punkte)"),
    empty(),
    p("Musterlösung: Meine Schwester trägt heute ein blaues Kleid."),
    p("Dazu hat sie weiße Schuhe und einen roten Schal an."),
    p("Ihre Mütze ist grün. Sie sieht sehr schön aus!"),
    empty(),

    h2("Aufgabe 6: Partnerinterview  (6 Punkte — je 1,5 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Kleidungsstücke korrekt auf Deutsch genannt"),
    bullet("Farben kombiniert"),
    bullet("Partner korrekt interviewt und aufgeschrieben"),
    bullet("Verständliche Kommunikation auf Deutsch"),
    empty(),

    h2("Gesamtbewertung"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Aufgabe", 6638), hCell("Möglich", 1500), hCell("Erreicht", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 1: Lückentext", 6638), dCell("10 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 2: Richtig / Falsch", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 3: Sommer oder Winter", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 4: Adjektivendungen", 6638), dCell("8 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 5: Outfit beschreiben", 6638), dCell("8 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 6: Partnerinterview", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [hCell("GESAMT", 6638), hCell("44 Punkte", 1500), hCell("", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS_LOESUNG.docx`);
}

async function main() {
  console.log("Erstelle Abschlussübung: Kleidung");
  console.log("Zielordner:", BASE);
  await abschluss();
  await abschluss_L();
  console.log("\nFertig! 2 Dateien erstellt.");
}
main().catch(console.error);
