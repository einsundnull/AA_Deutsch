"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "05_KoerperGesundheit", "ABSCHLUSS");
const TOPIC = "A1_Kinder_KoerperGesundheit";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Körper & Gesundheit — Abschlussübung", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

async function abschluss() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Abschlussübung — Körper & Gesundheit"),
    studentHead(), empty(),
    pItalic("Diese Übung kombiniert: Körperteile + Einfache Krankheiten"),
    empty(),

    // Aufgabe 1: Lückentext
    h2("Aufgabe 1: Lückentext  (10 Punkte)"),
    p("Fülle die Lücken mit den richtigen Wörtern aus dem Kasten."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [
      new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [
        new Paragraph({ children: [new TextRun({ text: "Kopf  •  Bauch  •  Fieber  •  Halsschmerzen  •  Arzt  •  krank  •  gesund  •  Tabletten  •  Beine  •  Ohren", size: 24, font: "Arial" })] })
      ]})]})]
    }),
    empty(),
    p("Finn ist heute _______. Sein _______ tut sehr weh."),
    p("Er hat auch _______ — seine Temperatur ist 38,8°C."),
    p("Finn hat _______ und kann kaum schlucken."),
    p("Seine Mutter bringt ihn zum _______. Der Arzt schaut"),
    p("in Finns Mund und in seine _______. Er drückt auf"),
    p("Finns _______ und fragt: \"Tut das weh?\""),
    p("Finn sagt: \"Ja! Und meine _______ sind auch müde.\""),
    p("Der Arzt gibt Finn _______."),
    p("Nach drei Tagen ist Finn wieder _______!"),
    empty(),

    // Aufgabe 2: R/F
    h2("Aufgabe 2: Richtig oder falsch?  (6 Punkte)"),
    p("Schreibe R (richtig) oder F (falsch)."),
    empty(),
    p("___ Finn fühlt sich heute gut."),
    p("___ Finn hat Fieber."),
    p("___ Der Arzt schaut in Finns Augen."),
    p("___ Finns Beine sind müde."),
    p("___ Finn bekommt Tabletten."),
    p("___ Finn ist nach einer Woche wieder gesund."),
    empty(),

    // Aufgabe 3: Körperteile benennen
    h2("Aufgabe 3: Körperteile im Text  (4 Punkte)"),
    p("Finde alle Körperteile im Text oben. Schreibe sie mit Artikel auf."),
    pItalic("Beispiel: der Kopf"),
    ...writeLines(4),
    empty(),
    br(),

    // Aufgabe 4: Was hat Finn? Tabelle
    h2("Aufgabe 4: Gesundheitsprofil  (6 Punkte)"),
    p("Schreibe Finns Symptome und was er machen soll in die Tabelle."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [3213, 3213, 3212], rows: [
      new TableRow({ children: [hCell("Symptom / Krankheit", 3213), hCell("Körperteil betroffen", 3213), hCell("Was soll Finn tun?", 3212)] }),
      new TableRow({ children: [dCell("Fieber", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("Halsschmerzen", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("müde Beine", 3213), dCell("", 3213), dCell("", 3212)] })
    ]}),
    empty(),

    // Aufgabe 5: Schreibaufgabe
    h2("Aufgabe 5: Freies Schreiben  (8 Punkte)"),
    p("Schreibe 5–7 Sätze: Beschreibe deinen Körper und erzähle von einer Krankheit."),
    pItalic("Benutze: Körperteile mit Artikel, Krankheiten, Ich habe..., Ich bin..."),
    ...writeLines(7),
    empty(),

    // Aufgabe 6: Konversation
    h2("Aufgabe 6: Partnerinterview  (6 Punkte)"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort deines Partners / deiner Partnerin", 4819)] }),
      new TableRow({ children: [dCell("Wie viele Finger hast du?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was tut dir manchmal weh?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was machst du, wenn du krank bist?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was sagst du zu einem kranken Freund?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingsessen, wenn du krank bist?", 4819), dCell("", 4819)] })
    ]}),
    empty(),

    // Aufgabe 7: Selbstevaluation
    h2("Aufgabe 7: Selbstevaluation"),
    p("Was kann ich jetzt? Kreuze an:"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Ich kann ...", 6638), hCell("☐ gut", 1500), hCell("☐ noch üben", 1500)] }),
      new TableRow({ children: [dCell("14 Körperteile auf Deutsch nennen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Den Artikel (der/die/das) bei Körperteilen sagen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("6 Krankheiten und Symptome benennen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("Sagen, was mir wehtut: \"Ich habe Kopfschmerzen.\"", 6638), dCell("☐", 1500), dCell("☐", 1500)] }),
      new TableRow({ children: [dCell("\"Gute Besserung!\" und \"Ich bin krank/gesund.\" sagen.", 6638), dCell("☐", 1500), dCell("☐", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS.docx`);
}

async function abschluss_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Abschlussübung Körper & Gesundheit"),
    empty(),

    h2("Aufgabe 1: Lückentext  (10 Punkte — je 1 Punkt)"),
    p("Finn ist heute krank. Sein Kopf tut sehr weh."),
    p("Er hat auch Fieber — seine Temperatur ist 38,8°C."),
    p("Finn hat Halsschmerzen und kann kaum schlucken."),
    p("Seine Mutter bringt ihn zum Arzt. Der Arzt schaut"),
    p("in Finns Mund und in seine Ohren. Er drückt auf"),
    p("Finns Bauch und fragt: \"Tut das weh?\""),
    p("Finn sagt: \"Ja! Und meine Beine sind auch müde.\""),
    p("Der Arzt gibt Finn Tabletten."),
    p("Nach drei Tagen ist Finn wieder gesund!"),
    empty(),

    h2("Aufgabe 2: Richtig oder falsch?  (6 Punkte — je 1 Punkt)"),
    p("F — Finn fühlt sich heute nicht gut (er ist krank)."),
    p("R — Finn hat Fieber."),
    p("F — Der Arzt schaut in Finns Mund und Ohren (nicht Augen)."),
    p("R — Finns Beine sind müde."),
    p("R — Finn bekommt Tabletten."),
    p("F — Finn ist nach drei Tagen wieder gesund (nicht einer Woche)."),
    empty(),

    h2("Aufgabe 3: Körperteile im Text  (4 Punkte — je 0,5 Punkte)"),
    p("der Kopf / der Mund / die Ohren / der Bauch / die Beine"),
    pItalic("5 Körperteile im Text — 4 Punkte: 0,5 je richtigem Körperteil mit Artikel"),
    empty(),

    h2("Aufgabe 4: Gesundheitsprofil  (6 Punkte — je 2 Punkte pro Zeile)"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [3213, 3213, 3212], rows: [
      new TableRow({ children: [hCell("Symptom", 3213), hCell("Körperteil", 3213), hCell("Was tun?", 3212)] }),
      new TableRow({ children: [dCell("Fieber", 3213), dCell("ganzer Körper / Temperatur", 3213), dCell("schlafen, viel trinken", 3212)] }),
      new TableRow({ children: [dCell("Halsschmerzen", 3213), dCell("der Hals", 3213), dCell("warmen Tee trinken", 3212)] }),
      new TableRow({ children: [dCell("müde Beine", 3213), dCell("die Beine", 3213), dCell("ausruhen, schlafen", 3212)] })
    ]}),
    empty(),

    h2("Aufgabe 5: Freies Schreiben  (8 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Körperteile mit richtigem Artikel genannt (2 Punkte)"),
    bullet("Krankheit / Symptom korrekt beschrieben (2 Punkte)"),
    bullet("Verben richtig verwendet: haben, sein, wehtun (2 Punkte)"),
    bullet("5–7 verständliche Sätze (2 Punkte)"),
    empty(),
    p("Musterlösung:"),
    p("Ich habe zwei Augen, eine Nase und einen Mund. Meine Haare sind braun."),
    p("Letzte Woche war ich krank. Ich hatte Kopfschmerzen und Fieber."),
    p("Mein Kopf tat sehr weh. Ich musste viel schlafen und Tee trinken."),
    p("Nach drei Tagen war ich wieder gesund."),
    empty(),

    h2("Aufgabe 6: Partnerinterview  (6 Punkte — je 1,5 Punkte)"),
    p("Bewertungskriterien:"),
    bullet("Fragen auf Deutsch gestellt"),
    bullet("Antworten mit korrekten Körperteilen / Krankheitsvokabular"),
    bullet("Partner korrekt interviewt und aufgeschrieben"),
    bullet("Verständliche Kommunikation auf Deutsch"),
    empty(),
    p("Musterlösungen:"),
    p("Ich habe zehn Finger. / Mir tut manchmal der Kopf weh."),
    p("Wenn ich krank bin, schlafe ich viel. / Ich sage: Gute Besserung!"),
    empty(),

    h2("Gesamtbewertung"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [6638, 1500, 1500], rows: [
      new TableRow({ children: [hCell("Aufgabe", 6638), hCell("Möglich", 1500), hCell("Erreicht", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 1: Lückentext", 6638), dCell("10 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 2: Richtig / Falsch", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 3: Körperteile im Text", 6638), dCell("4 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 4: Gesundheitsprofil", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 5: Freies Schreiben", 6638), dCell("8 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [dCell("Aufgabe 6: Partnerinterview", 6638), dCell("6 Punkte", 1500), dCell("", 1500)] }),
      new TableRow({ children: [hCell("GESAMT", 6638), hCell("40 Punkte", 1500), hCell("", 1500)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_ABSCHLUSS_LOESUNG.docx`);
}

async function main() {
  console.log("Erstelle Abschlussübung: Körper & Gesundheit");
  console.log("Zielordner:", BASE);
  await abschluss();
  await abschluss_L();
  console.log("\nFertig! 2 Dateien erstellt.");
}
main().catch(console.error);
