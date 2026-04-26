"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "07_EssenTrinken", "ABSCHLUSS");
const TOPIC = "A1_Kinder_EssenTrinken";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Essen & Trinken — Abschlussübung", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

async function abschluss() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Abschlussübung — Essen & Trinken"),
    studentHead(), empty(),
    pItalic("Diese Übung kombiniert: Lieblingsessen + Getränke + Mahlzeiten + Ich mag / mag nicht"),
    empty(),

    h2("Aufgabe 1: Lückentext  (10 Punkte)"),
    p("Fülle die Lücken mit den richtigen Wörtern aus dem Kasten."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "Frühstück  •  Mittagessen  •  mag  •  mag nicht  •  schmeckt  •  lecker  •  hungrig  •  Wasser  •  Nudeln  •  Salat  •  Kuchen  •  trinkt", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    p("Heute ist Samstag. Familie Hoffmann isst den ganzen Tag zusammen."),
    p("Morgens gibt es _______: Brot, Ei und Orangensaft."),
    p("Die kleine Tina _______ keinen Orangensaft. Sie _______ lieber Milch."),
    p("Mittags gibt es _______. Tina _______ Nudeln sehr!"),
    p("\"Die Nudeln _______ mir super!\", sagt sie."),
    p("Ihr Bruder Max _______ keinen _______. Er isst nur die Nudeln."),
    p("Am Nachmittag ist Tina wieder _______. Sie isst einen _______."),
    p("Abends trinkt die Familie viel _______ — das ist gesund!"),
    empty(),

    h2("Aufgabe 2: Richtig (R) oder falsch (F)?  (6 Punkte)"),
    p("___ Die Familie isst am Samstag zusammen."),
    p("___ Tina mag Orangensaft sehr gern."),
    p("___ Zum Mittagessen gibt es Nudeln."),
    p("___ Max isst gern Salat."),
    p("___ Tina isst einen Kuchen als Nachmittagssnack."),
    p("___ Abends trinkt die Familie Cola."),
    empty(),

    h2("Aufgabe 3: Mahlzeiten zuordnen  (5 Punkte)"),
    p("Schreibe die richtige Mahlzeit zu jeder Uhrzeit und einem passenden Essen."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [1800, 3000, 4838], rows: [
      new TableRow({ children: [hCell("Uhrzeit", 1800), hCell("Mahlzeit", 3000), hCell("Beispiel-Essen", 4838)] }),
      new TableRow({ children: [dCell("7:30", 1800), dCell("", 3000), dCell("", 4838)] }),
      new TableRow({ children: [dCell("10:00", 1800), dCell("", 3000), dCell("", 4838)] }),
      new TableRow({ children: [dCell("12:30", 1800), dCell("", 3000), dCell("", 4838)] }),
      new TableRow({ children: [dCell("15:30", 1800), dCell("", 3000), dCell("", 4838)] }),
      new TableRow({ children: [dCell("19:00", 1800), dCell("", 3000), dCell("", 4838)] })
    ]}),
    empty(),
    br(),

    h2("Aufgabe 4: Ich mag / Ich mag nicht  (6 Punkte)"),
    p("Schreibe je 3 Sätze mit 'Ich mag...' und 3 Sätze mit 'Ich mag kein/keine...'"),
    pItalic("Benutze Essen und Getränke aus dem Thema."),
    empty(),
    pBold("Ich mag..."),
    ...writeLines(3),
    empty(),
    pBold("Ich mag kein/keine..."),
    ...writeLines(3),
    empty(),

    h2("Aufgabe 5: Freies Schreiben  (8 Punkte)"),
    p("Beschreibe deinen Lieblingsessenstag. Schreibe 5–7 Sätze."),
    pItalic("Was isst du zum Frühstück, Mittag- und Abendessen? Was trinkst du? Was magst du am liebsten?"),
    ...writeLines(7),
    empty(),

    h2("Aufgabe 6: Partnerinterview  (6 Punkte)"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort deines Partners / deiner Partnerin", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingsessen?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was magst du gar nicht?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trinkst du am liebsten?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was isst du zum Frühstück?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was schmeckt dir am besten?", 4819), dCell("", 4819)] })
    ]}),
    empty(),

    h2("Aufgabe 7: Selbstevaluation"),
    p("Was kann ich jetzt? Kreuze an:"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Ich kann ...", 6638), hCell("☐ gut", 1500), hCell("☐ noch üben", 1500)] }),
      new TableRow({ children: [dCell("12 Speisen und Getränke auf Deutsch nennen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Die 5 Mahlzeiten und ihre Uhrzeiten nennen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Sagen, was ich mag: 'Ich mag Pizza.'", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Sagen, was ich nicht mag: 'Ich mag keinen Spinat.'", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Im Restaurant / Café bestellen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS.docx`);
}

async function abschluss_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Abschlussübung Essen & Trinken"),
    empty(),

    h2("Aufgabe 1: Lückentext  (10 Punkte — je 1 Punkt)"),
    p("Frühstück / trinkt / mag / Nudeln / mag / schmeckt / mag nicht / Salat / hungrig / Kuchen / Wasser"),
    pItalic("Hinweis: 'trinkt' statt 'mag' bei Getränken akzeptieren."),
    empty(),

    h2("Aufgabe 2: Richtig oder falsch?  (6 Punkte — je 1 Punkt)"),
    p("R — Die Familie isst am Samstag zusammen."),
    p("F — Tina mag keinen Orangensaft (sie trinkt lieber Milch)."),
    p("R — Zum Mittagessen gibt es Nudeln."),
    p("F — Max mag keinen Salat."),
    p("R — Tina isst einen Kuchen als Nachmittagssnack."),
    p("F — Abends trinkt die Familie Wasser (nicht Cola)."),
    empty(),

    h2("Aufgabe 3: Mahlzeiten zuordnen  (5 Punkte — je 1 Punkt)"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [1800, 3000, 4838], rows: [
      new TableRow({ children: [hCell("Uhrzeit", 1800), hCell("Mahlzeit", 3000), hCell("Beispiel-Essen", 4838)] }),
      new TableRow({ children: [dCell("7:30", 1800), dCell("das Frühstück", 3000), dCell("Brot, Milch, Müsli, Ei", 4838)] }),
      new TableRow({ children: [dCell("10:00", 1800), dCell("das Pausenbrot", 3000), dCell("Brot, Obst, Joghurt", 4838)] }),
      new TableRow({ children: [dCell("12:30", 1800), dCell("das Mittagessen", 3000), dCell("Nudeln, Reis, Suppe", 4838)] }),
      new TableRow({ children: [dCell("15:30", 1800), dCell("der Nachmittagssnack", 3000), dCell("Kuchen, Joghurt, Obst", 4838)] }),
      new TableRow({ children: [dCell("19:00", 1800), dCell("das Abendessen", 3000), dCell("Brot, Käse, Salat", 4838)] })
    ]}),
    empty(),

    h2("Aufgabe 4: Ich mag / Ich mag nicht  (6 Punkte — je 1 Punkt)"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Ich mag Pizza. / Ich mag Eis. / Ich mag Nudeln."),
    p("Ich mag keinen Spinat. / Ich mag keine Suppe. / Ich mag kein Gemüse."),
    pItalic("kein/keine/keinen je nach Genus beachten — Versuch zählt."),
    empty(),

    h2("Aufgabe 5: Freies Schreiben  (8 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Mindestens 3 Mahlzeiten beschrieben (2 Punkte)"),
    bullet("Mindestens 2 Getränke genannt (2 Punkte)"),
    bullet("mögen/nicht mögen verwendet (2 Punkte)"),
    bullet("5–7 verständliche Sätze (2 Punkte)"),
    empty(),
    p("Musterlösung: Morgens esse ich Brot und trinke Milch. Zum Mittagessen mag ich Nudeln sehr."),
    p("Nachmittags esse ich gern Kuchen. Abends mag ich Brot mit Käse."),
    p("Ich mag keine Suppe. Mein Lieblingsgetränk ist Apfelsaft."),
    empty(),

    h2("Aufgabe 6: Partnerinterview  (6 Punkte — je 1,5 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Speisen und Getränke korrekt auf Deutsch genannt"),
    bullet("mögen / schmecken korrekt verwendet"),
    bullet("Partner korrekt interviewt und aufgeschrieben"),
    bullet("Verständliche Kommunikation auf Deutsch"),
    empty(),

    h2("Gesamtbewertung"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Aufgabe", 6638), hCell("Möglich", 1500), hCell("Erreicht", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 1: Lückentext", 6638), dCell("10 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 2: Richtig / Falsch", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 3: Mahlzeiten zuordnen", 6638), dCell("5 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 4: Ich mag / mag nicht", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 5: Freies Schreiben", 6638), dCell("8 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 6: Partnerinterview", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [hCell("GESAMT", 6638), hCell("41 Punkte", 1500), hCell("", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS_LOESUNG.docx`);
}

async function main() {
  console.log("Erstelle Abschlussübung: Essen & Trinken");
  console.log("Zielordner:", BASE);
  await abschluss();
  await abschluss_L();
  console.log("\nFertig! 2 Dateien erstellt.");
}
main().catch(console.error);
