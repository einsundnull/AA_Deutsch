"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "07_EssenTrinken", "03_Mahlzeiten");
const TOPIC = "A1_Kinder_EssenTrinken_03_Mahlzeiten";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Essen & Trinken — Mahlzeiten", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeMahlzeitenTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2000, 1600, 1800, 4238],
    rows: [
      new TableRow({ children: [hCell("Mahlzeit", 2000), hCell("Uhrzeit", 1600), hCell("Artikel", 1800), hCell("Typisches Essen / Trinken", 4238)] }),
      new TableRow({ children: [dCell("Frühstück", 2000), dCell("7–9 Uhr", 1600), dCell("das", 1800), dCell("Brot, Müsli, Milch, Saft, Ei", 4238)] }),
      new TableRow({ children: [dCell("Pausenbrot", 2000), dCell("10 Uhr", 1600), dCell("das", 1800), dCell("Brot, Obst, Joghurt", 4238)] }),
      new TableRow({ children: [dCell("Mittagessen", 2000), dCell("12–13 Uhr", 1600), dCell("das", 1800), dCell("Nudeln, Reis, Fleisch, Gemüse", 4238)] }),
      new TableRow({ children: [dCell("Nachmittagssnack", 2000), dCell("15–16 Uhr", 1600), dCell("der", 1800), dCell("Kuchen, Obst, Keks, Joghurt", 4238)] }),
      new TableRow({ children: [dCell("Abendessen", 2000), dCell("18–19 Uhr", 1600), dCell("das", 1800), dCell("Brot, Käse, Wurst, Salat", 4238)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Schreibübung"), studentHead(), empty(),
    h2("Die Mahlzeiten auf Deutsch"), makeMahlzeitenTable(), empty(),
    h2("Aufgabe 1: Welche Mahlzeit?"),
    p("Schreibe die richtige Mahlzeit. Benutze: Frühstück / Mittagessen / Abendessen / Pausenbrot / Nachmittagssnack"),
    empty(),
    p("Es ist 7:30 Uhr. Ich esse Brot und trinke Milch.           → _______________________"),
    p("Es ist 12:30 Uhr. Ich esse Nudeln mit Soße.               → _______________________"),
    p("Es ist 19:00 Uhr. Wir essen Brot und Käse.                → _______________________"),
    p("Es ist 10:00 Uhr. In der Schule esse ich einen Apfel.     → _______________________"),
    p("Es ist 15:30 Uhr. Ich esse einen Kuchen nach der Schule.  → _______________________"),
    empty(),
    h2("Aufgabe 2: Mein Essensplan"),
    p("Was isst und trinkst du bei jeder Mahlzeit? Schreibe je einen Satz."),
    empty(),
    p("Zum Frühstück esse/trinke ich: _______________________"),
    p("In der Pause esse ich: _______________________"),
    p("Zum Mittagessen esse ich: _______________________"),
    p("Als Nachmittagssnack esse ich: _______________________"),
    p("Zum Abendessen esse/trinke ich: _______________________"),
    empty(),
    h2("Aufgabe 3: Wann isst du das?"),
    p("Schreibe die Mahlzeit, zu der du das isst."),
    pItalic("zum Frühstück / zum Mittagessen / zum Abendessen / als Snack"),
    empty(),
    p("Ich esse Müsli _______________________."),
    p("Ich esse Nudeln _______________________."),
    p("Ich esse Brot mit Käse _______________________."),
    p("Ich esse Obst _______________________."),
    p("Ich esse Suppe _______________________."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Was ist deine Lieblingsmahlzeit? Schreibe 3–5 Sätze."),
    pItalic("Meine Lieblingsmahlzeit ist... Ich esse dann... Das schmeckt..."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Schreibübung"), empty(),
    h2("Aufgabe 1: Welche Mahlzeit?"),
    p("7:30 Uhr → das Frühstück"),
    p("12:30 Uhr → das Mittagessen"),
    p("19:00 Uhr → das Abendessen"),
    p("10:00 Uhr → das Pausenbrot"),
    p("15:30 Uhr → der Nachmittagssnack"),
    empty(),
    h2("Aufgabe 2: Mein Essensplan"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Zum Frühstück esse ich Brot und trinke Milch."),
    empty(),
    h2("Aufgabe 3: Wann isst du das?"),
    p("Müsli → zum Frühstück"),
    p("Nudeln → zum Mittagessen"),
    p("Brot mit Käse → zum Frühstück oder zum Abendessen"),
    p("Obst → als Snack oder zum Frühstück"),
    p("Suppe → zum Mittagessen oder zum Abendessen"),
    pItalic("Sinnvolle Varianten akzeptieren."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Leseübung"), studentHead(), empty(),
    h2("Text: Emils Essenstag"),
    p("Emil ist neun Jahre alt und isst sehr gern.", 26),
    p("Morgens um halb acht frühstückt Emil mit seiner Familie.", 26),
    p("Er isst ein Brötchen mit Marmelade und trinkt ein Glas Milch.", 26),
    p("Um zehn Uhr hat Emil Pause in der Schule.", 26),
    p("Er isst sein Pausenbrot: ein Brot mit Käse und einen Apfel.", 26),
    p("Um halb eins kommt Emil nach Hause. Es gibt Mittagessen!", 26),
    p("Heute kocht die Mutter Nudelsuppe. Emil isst zwei Teller.", 26),
    p("\"Die Suppe ist super lecker!\", sagt Emil.", 26),
    p("Um vier Uhr nachmittags bekommt Emil einen Joghurt als Snack.", 26),
    p("Abends um halb sieben gibt es Abendessen: Brot, Wurst und Salat.", 26),
    p("Emil trinkt dazu ein Glas Wasser. Nach dem Essen hilft er beim Abwaschen.", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Emil frühstückt allein."),
    p("___ Emil trinkt zum Frühstück Saft."),
    p("___ Das Pausenbrot enthält Käse und einen Apfel."),
    p("___ Zum Mittagessen gibt es Nudelsuppe."),
    p("___ Emil isst einen Teller Suppe."),
    p("___ Zum Abendessen gibt es Brot, Wurst und Salat."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was isst Emil zum Frühstück?"), ...writeLines(2),
    p("2. Was isst Emil zum Mittagessen?"), ...writeLines(1),
    p("3. Was macht Emil nach dem Abendessen?"), ...writeLines(1),
    empty(),
    h2("Aufgabe 3: Emils Essenstag — Tabelle"),
    p("Fülle die Tabelle mit Informationen aus dem Text aus."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2500, 2000, 5138], rows: [
      new TableRow({ children: [hCell("Mahlzeit", 2500), hCell("Uhrzeit", 2000), hCell("Was isst/trinkt Emil?", 5138)] }),
      new TableRow({ children: [dCell("Frühstück", 2500), dCell("", 2000), dCell("", 5138)] }),
      new TableRow({ children: [dCell("Pausenbrot", 2500), dCell("", 2000), dCell("", 5138)] }),
      new TableRow({ children: [dCell("Mittagessen", 2500), dCell("", 2000), dCell("", 5138)] }),
      new TableRow({ children: [dCell("Nachmittagssnack", 2500), dCell("", 2000), dCell("", 5138)] }),
      new TableRow({ children: [dCell("Abendessen", 2500), dCell("", 2000), dCell("", 5138)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Dein Essenstag"),
    p("Schreibe 2–3 Sätze: Was isst du an einem normalen Tag?"),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Emil frühstückt mit seiner Familie (nicht allein)."),
    p("F — Emil trinkt Milch (nicht Saft)."),
    p("R — Das Pausenbrot enthält Käse und einen Apfel."),
    p("R — Zum Mittagessen gibt es Nudelsuppe."),
    p("F — Emil isst zwei Teller Suppe (nicht einen)."),
    p("R — Zum Abendessen gibt es Brot, Wurst und Salat."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Emil isst ein Brötchen mit Marmelade und trinkt ein Glas Milch."),
    p("2. Emil isst Nudelsuppe (zwei Teller)."),
    p("3. Emil hilft beim Abwaschen."),
    empty(),
    h2("Aufgabe 3: Emils Essenstag — Tabelle"),
    p("Frühstück: 7:30 Uhr / Brötchen mit Marmelade, Milch"),
    p("Pausenbrot: 10:00 Uhr / Brot mit Käse, Apfel"),
    p("Mittagessen: 12:30 Uhr / Nudelsuppe"),
    p("Nachmittagssnack: 16:00 Uhr / Joghurt"),
    p("Abendessen: 18:30 Uhr / Brot, Wurst, Salat, Wasser"),
    empty(),
    h2("Aufgabe 4: Dein Essenstag"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "Frühstück  •  Mittagessen  •  Abendessen  •  Pausenbrot  •  Snack  •  frühstücken  •  essen  •  kochen  •  hungrig  •  satt  •  lecker  •  zusammen", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Morgens esse ich _______. Es ist die erste Mahlzeit des Tages."),
    p("2. In der Schule esse ich mein _______: ein Brot und einen Apfel."),
    p("3. Um 12 Uhr esse ich _______. Heute gibt es Nudeln."),
    p("4. Ich bin _______! Ich habe seit dem Frühstück nichts gegessen."),
    p("5. Die Pizza war sehr _______. Ich möchte noch ein Stück."),
    p("6. Meine ganze Familie isst abends _______. Das ist schön."),
    empty(),
    h2("Teil B: Ein Tag in Annas Leben"),
    pItalic("Ergänze den Text."),
    empty(),
    p("Anna steht um sieben Uhr auf. Zuerst _______  sie: Brot und Milch."),
    p("Um zehn Uhr in der Schule isst sie ihr _______."),
    p("Nach der Schule ist Anna sehr _______. Sie will sofort _______."),
    p("Ihre Mutter hat _______ und es riecht sehr gut."),
    p("Zum _______ gibt es Reissuppe. Anna isst zwei Teller — sie war sehr hungrig!"),
    p("Nach dem Essen ist sie _______. Sie braucht keinen Snack mehr."),
    empty(),
    h2("Teil C: Was passt zusammen?"),
    pItalic("Verbinde die Aussagen mit der richtigen Mahlzeit."),
    empty(),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [5638, 4000], rows: [
      new TableRow({ children: [hCell("Aussage", 5638), hCell("Mahlzeit", 4000)] }),
      new TableRow({ children: [dCell("\"Guten Morgen! Möchtest du Milch?\"", 5638), dCell("das Mittagessen", 4000)] }),
      new TableRow({ children: [dCell("\"Ich habe ein Brot für die Pause eingepackt.\"", 5638), dCell("das Frühstück", 4000)] }),
      new TableRow({ children: [dCell("\"Es ist 12 Uhr. Zeit zum Essen!\"", 5638), dCell("das Abendessen", 4000)] }),
      new TableRow({ children: [dCell("\"Nach der Schule gibt es Kuchen.\"", 5638), dCell("das Pausenbrot", 4000)] }),
      new TableRow({ children: [dCell("\"Wir essen um 19 Uhr. Komm an den Tisch!\"", 5638), dCell("der Nachmittagssnack", 4000)] })
    ]}),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 Sätze: Was ist deine Lieblingsmahlzeit?"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. Frühstück"), p("2. Pausenbrot"), p("3. Mittagessen"),
    p("4. hungrig"), p("5. lecker"), p("6. zusammen"),
    empty(),
    h2("Teil B: Ein Tag in Annas Leben"),
    p("frühstückt / Pausenbrot / hungrig / essen / gekocht (oder: sie kocht) / Mittagessen / satt"),
    empty(),
    h2("Teil C: Was passt zusammen?"),
    p("'Guten Morgen...' → das Frühstück"),
    p("'Ich habe ein Brot...' → das Pausenbrot"),
    p("'Es ist 12 Uhr...' → das Mittagessen"),
    p("'Nach der Schule...' → der Nachmittagssnack"),
    p("'Wir essen um 19 Uhr...' → das Abendessen"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["das Frühstück", "Nomen (neutral)", "Ich frühstücke um 7 Uhr."],
    ["das Pausenbrot", "Nomen (neutral)", "Ich esse mein Pausenbrot in der Schule."],
    ["das Mittagessen", "Nomen (neutral)", "Zum Mittagessen gibt es Nudeln."],
    ["der Nachmittagssnack", "Nomen (maskulin)", "Als Snack esse ich einen Joghurt."],
    ["das Abendessen", "Nomen (neutral)", "Wir essen abends zusammen."],
    ["frühstücken", "Verb", "Ich frühstücke mit meiner Familie."],
    ["kochen", "Verb", "Meine Mutter kocht das Mittagessen."],
    ["hungrig", "Adjektiv", "Nach der Schule bin ich sehr hungrig."],
    ["satt", "Adjektiv", "Nach dem Essen bin ich satt."],
    ["zusammen essen", "Ausdruck", "Wir essen abends alle zusammen."],
    ["Guten Appetit!", "Ausdruck", "Sagt man vor dem Essen."],
    ["der Tisch", "Nomen (maskulin)", "Wir sitzen am Tisch."],
    ["das Besteck", "Nomen (neutral)", "Das Besteck liegt neben dem Teller."],
    ["der Teller", "Nomen (maskulin)", "Ich esse einen Teller Suppe."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2800), hCell("Wortart", 1600), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1600), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Wortliste"), studentHead(), empty(),
    h2("Mahlzeiten — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1600, 5238], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.slice(0, 10).map(r => p(`${r[0].split("(")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Zeichne eine Uhr mit der richtigen Uhrzeit auf jede Karte!"),
    p("Extra-Tipp: Schreibe auch dein Lieblingsessen bei dieser Mahlzeit dazu.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("Alle Hauptmahlzeiten sind neutral (das): das Frühstück, das Mittagessen, das Abendessen"),
    bullet("Präposition zum: zum Frühstück / zum Mittagessen / zum Abendessen (zu + dem = zum)"),
    bullet("frühstücken: eigenes Verb — nicht 'Frühstück essen'"),
    bullet("hungrig / satt: Gegensatzpaar — Ich bin hungrig. ↔ Ich bin satt."),
    bullet("Guten Appetit! — immer vor dem Essen; Antwort: Danke, gleichfalls!")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Am Frühstückstisch"),
    pItalic("Person A = Elternteil, Person B = Kind. Fülle die Lücken aus."),
    empty(),
    p("Elternteil: Guten Morgen! Hast du gut geschlafen?"),
    p("Kind:       Ja, danke! Ich bin so _______. Was gibt es zum _______?"),
    p("Elternteil: Es gibt Brot mit _______ und ein Glas _______."),
    p("Kind:       Super! Kann ich auch einen _______ haben?"),
    p("Elternteil: Natürlich. Setz dich! Guten _______!"),
    p("Kind:       Danke, gleichfalls! Hmm, das schmeckt sehr _______!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Dialog 2: Was gibt es zum Mittagessen?"),
    pItalic("Person A = Kind, Person B = Elternteil."),
    empty(),
    p("Kind:       Mama / Papa, was gibt es heute zum _______?"),
    p("Elternteil: Heute koche ich _______. Magst du das?"),
    p("Kind:       Ja, sehr gern! Ich bin so _______."),
    p("Elternteil: Das Essen ist in 20 Minuten fertig. Kannst du den _______ decken?"),
    p("Kind:       Klar! Ich lege Teller, _______ und Gläser hin."),
    p("Elternteil: Danke! Das Essen ist fertig. Guten _______!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Mein Essenstag"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was isst du zum Frühstück?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist deine Lieblingsmahlzeit?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Wer kocht bei dir zu Hause?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Isst deine Familie zusammen?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was sagst du vor dem Essen?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Was esse ich wann?"),
    p("Eine Person nennt eine Uhrzeit. Die anderen nennen schnell die passende Mahlzeit und ein Essen."),
    pItalic("Lehrer: '7 Uhr!' — Schüler: 'Frühstück! Ich esse Brot!'"),
    p("Uhrzeiten: 7:00 / 10:00 / 12:30 / 15:30 / 19:00")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Konversation"), empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("hungrig / Frühstück / Marmelade (oder Käse) / Milch / Apfel (oder Saft) / Appetit / lecker"),
    empty(),
    h2("Dialog 2: Mögliche Lösungen"),
    p("Mittagessen / Nudeln (oder Suppe / Reis) / hungrig / Tisch / Besteck / Appetit"),
    empty(),
    h2("Bewertungskriterien Konversation"),
    bullet("Mahlzeiten korrekt auf Deutsch benannt"),
    bullet("Verben essen / kochen / frühstücken verwendet"),
    bullet("Verständlicher Dialog auf Deutsch geführt"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Gruppenspiel: Lösungen"),
    p("7:00 → Frühstück / 10:00 → Pausenbrot / 12:30 → Mittagessen"),
    p("15:30 → Nachmittagssnack / 19:00 → Abendessen")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Mahlzeiten — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Welche Mahlzeit?"),
    p("[BILD 1: 5 Bilder — (a) gedeckter Frühstückstisch mit Brot und Milch, (b) Schulkind isst Pausenbrot, (c) Familie isst Mittagessen, (d) Kind isst Kuchen am Nachmittag, (e) Familie beim Abendessen]"),
    pItalic("Schreibe unter jedes Bild die richtige Mahlzeit mit Artikel."),
    p("(a) _______ (b) _______ (c) _______ (d) _______ (e) _______"),
    empty(),
    h2("Aufgabe 2: Der gedeckte Tisch"),
    p("[BILD 2: Ein gedeckter Tisch mit Teller, Besteck, Gläsern und Speisen — von oben fotografiert]"),
    pItalic("Was siehst du auf dem Bild? Schreibe 4–5 Sätze."),
    pItalic("Auf dem Tisch liegt/steht... / Es gibt..."),
    ...writeLines(5),
    empty(),
    h2("Aufgabe 3: Mein Tagesplan"),
    p("[BILD 3: Leerer Tagesplan mit 5 Zeilen für die 5 Mahlzeiten — Uhrzeit + Mahlzeit + Essen]"),
    pItalic("Fülle den Tagesplan mit deinen eigenen Mahlzeiten aus."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [1800, 2800, 5038], rows: [
      new TableRow({ children: [hCell("Uhrzeit", 1800), hCell("Mahlzeit", 2800), hCell("Was esse/trinke ich?", 5038)] }),
      new TableRow({ children: [dCell("", 1800), dCell("Frühstück", 2800), dCell("", 5038)] }),
      new TableRow({ children: [dCell("", 1800), dCell("Pausenbrot", 2800), dCell("", 5038)] }),
      new TableRow({ children: [dCell("", 1800), dCell("Mittagessen", 2800), dCell("", 5038)] }),
      new TableRow({ children: [dCell("", 1800), dCell("Nachmittagssnack", 2800), dCell("", 5038)] }),
      new TableRow({ children: [dCell("", 1800), dCell("Abendessen", 2800), dCell("", 5038)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Familienfoto beim Essen"),
    p("[BILD 4: Familie sitzt am Esstisch beim Mittagessen, alle lächeln]"),
    pItalic("Schreibe 3 Sätze über das Bild."),
    pItalic("Was macht die Familie? Was essen sie? Wann ist das?"),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Mahlzeiten Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Welche Mahlzeit?"),
    p("(a) das Frühstück / (b) das Pausenbrot / (c) das Mittagessen /"),
    p("(d) der Nachmittagssnack / (e) das Abendessen"),
    empty(),
    h2("Aufgabe 2: Der gedeckte Tisch"),
    p("Individuelle Antworten — Bewertung: Gegenstände/Speisen korrekt auf Deutsch benannt."),
    empty(),
    h2("Aufgabe 3: Mein Tagesplan"),
    p("Individuelle Einträge akzeptieren. Uhrzeiten und Speisen sinnvoll."),
    empty(),
    h2("Aufgabe 4: Familienfoto"),
    p("Musterlösung: Die Familie isst zusammen Mittagessen. / Es gibt Nudeln. / Alle sind glücklich.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Mahlzeiten");
  console.log("Zielordner:", BASE);
  await schreiben();     await schreiben_L();
  await lesen();         await lesen_L();
  await luecken();       await luecken_L();
  await wortliste();     await wortliste_L();
  await konversation();  await konversation_L();
  await bildaufgaben();  await bildaufgaben_L();
  console.log("\nFertig! 12 Dateien erstellt.");
}
main().catch(console.error);
