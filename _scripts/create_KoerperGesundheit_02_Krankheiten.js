"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "05_KoerperGesundheit", "02_Krankheiten");
const TOPIC = "A1_Kinder_KoerperGesundheit_02_Krankheiten";
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
function bullet(t) { return new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: t, size: 24, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function hCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: LIGHT }, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 22, font: "Arial" })] })] }); }
function dCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFFFFF" }, children: [new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })] })] }); }
function studentHead() { return new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4500, 4500], rows: [ new TableRow({ children: [hCell("Name:", 4500), hCell("Datum:", 4500)] }), new TableRow({ children: [dCell("", 4500), dCell("", 4500)] }) ] }); }
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Körper & Gesundheit — Einfache Krankheiten", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeKrankheitenTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2600, 3438, 3600],
    rows: [
      new TableRow({ children: [hCell("Krankheit / Symptom", 2600), hCell("Satz: Ich habe...", 3438), hCell("Was tun?", 3600)] }),
      new TableRow({ children: [dCell("Fieber", 2600), dCell("Ich habe Fieber.", 3438), dCell("schlafen und viel trinken", 3600)] }),
      new TableRow({ children: [dCell("Husten", 2600), dCell("Ich habe Husten.", 3438), dCell("Tee trinken, nicht schreien", 3600)] }),
      new TableRow({ children: [dCell("Schnupfen", 2600), dCell("Ich habe Schnupfen.", 3438), dCell("Nase putzen, warm bleiben", 3600)] }),
      new TableRow({ children: [dCell("Halsschmerzen", 2600), dCell("Ich habe Halsschmerzen.", 3438), dCell("warmen Tee trinken", 3600)] }),
      new TableRow({ children: [dCell("Bauchschmerzen", 2600), dCell("Ich habe Bauchschmerzen.", 3438), dCell("ruhen, leicht essen", 3600)] }),
      new TableRow({ children: [dCell("Kopfschmerzen", 2600), dCell("Ich habe Kopfschmerzen.", 3438), dCell("schlafen, ruhig sein", 3600)] }),
      new TableRow({ children: [dCell("Ohrenschmerzen", 2600), dCell("Ich habe Ohrenschmerzen.", 3438), dCell("zum Arzt gehen", 3600)] }),
      new TableRow({ children: [dCell("krank sein", 2600), dCell("Ich bin krank.", 3438), dCell("zu Hause bleiben", 3600)] }),
      new TableRow({ children: [dCell("gesund sein", 2600), dCell("Ich bin gesund.", 3438), dCell("Sport machen", 3600)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Schreibübung"), studentHead(), empty(),
    h2("Krankheiten und Symptome"), p("Lerne diese Wörter:"), makeKrankheitenTable(), empty(),
    h2("Aufgabe 1: Was habe ich?"),
    p("Schreibe den richtigen Satz. Beispiel: Kopf → Ich habe Kopfschmerzen."),
    pItalic("Bauch / Hals / Ohr / Husten / Fieber / Schnupfen"),
    empty(),
    p("Bauch:   Ich habe _______."),
    p("Hals:    Ich habe _______."),
    p("Ohr:     Ich habe _______."),
    p("husten:  Ich habe _______."),
    p("38,5°C:  Ich habe _______."),
    p("Nase läuft: Ich habe _______."),
    empty(),
    h2("Aufgabe 2: Krank oder gesund?"),
    p("Schreibe: Ich bin krank. oder Ich bin gesund."),
    empty(),
    p("Tom liegt im Bett und hat Fieber.       → _______________________"),
    p("Lisa macht Sport und fühlt sich super.  → _______________________"),
    p("Max hat Husten und Schnupfen.           → _______________________"),
    p("Anna geht in die Schule und spielt.     → _______________________"),
    empty(),
    h2("Aufgabe 3: Was machst du?"),
    p("Schreibe, was du machst wenn du krank bist. Schreibe 3 Sätze."),
    pItalic("Wenn ich krank bin, ..."),
    ...writeLines(3),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3–5 Sätze: Wann warst du zuletzt krank? Was hattest du?"),
    pItalic("Ich hatte ... Ich musste ... Nach ... Tagen war ich wieder gesund."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Schreibübung"), empty(),
    h2("Aufgabe 1: Was habe ich?"),
    p("Bauch:      Ich habe Bauchschmerzen."),
    p("Hals:       Ich habe Halsschmerzen."),
    p("Ohr:        Ich habe Ohrenschmerzen."),
    p("husten:     Ich habe Husten."),
    p("38,5°C:     Ich habe Fieber."),
    p("Nase läuft: Ich habe Schnupfen."),
    empty(),
    h2("Aufgabe 2: Krank oder gesund?"),
    p("Tom liegt im Bett → Ich bin krank."),
    p("Lisa macht Sport  → Ich bin gesund."),
    p("Max hat Husten    → Ich bin krank."),
    p("Anna geht in die Schule → Ich bin gesund."),
    empty(),
    h2("Aufgabe 3: Was machst du?"),
    p("Musterlösungen (individuelle Antworten akzeptieren):"),
    bullet("Wenn ich krank bin, schlafe ich viel."),
    bullet("Wenn ich krank bin, trinke ich heißen Tee."),
    bullet("Wenn ich krank bin, bleibe ich zu Hause."),
    pItalic("Hinweis: 'Wenn ich krank bin...' — Verbstellung beachten (Verb am Ende des Nebensatzes)"),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: Krankheiten korrekt benannt, Verben richtig verwendet, verständliche Sätze.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Leseübung"), studentHead(), empty(),
    h2("Text: Ben ist krank"),
    p("Ben ist neun Jahre alt. Heute kann er nicht in die Schule gehen.", 26),
    p("Er hat Fieber und Halsschmerzen. Sein Kopf tut auch weh.", 26),
    p("Bens Mutter ruft die Lehrerin an: \"Ben ist krank. Er bleibt heute zu Hause.\"", 26),
    p("Die Lehrerin sagt: \"Gute Besserung! Wir wünschen Ben gute Besserung.\"", 26),
    p("Ben muss im Bett bleiben und viel Tee trinken.", 26),
    p("Seine Mutter bringt ihm Tabletten vom Arzt.", 26),
    p("Ben schläft viel. Er sieht fern und liest ein Buch.", 26),
    p("Nach zwei Tagen hat er kein Fieber mehr.", 26),
    p("Am Donnerstag geht Ben wieder in die Schule. Er ist wieder gesund!", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Ben ist sieben Jahre alt."),
    p("___ Ben hat Fieber und Halsschmerzen."),
    p("___ Bens Mutter ruft den Arzt an."),
    p("___ Ben muss viel Tee trinken."),
    p("___ Ben geht nach einem Tag wieder in die Schule."),
    p("___ Am Donnerstag ist Ben wieder gesund."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was hat Ben?"), ...writeLines(2),
    p("2. Was macht Ben zu Hause?"), ...writeLines(2),
    p("3. Wann ist Ben wieder gesund?"), ...writeLines(1),
    empty(),
    h2("Aufgabe 3: Suche im Text"),
    p("Finde alle Krankheiten und Symptome im Text:"), ...writeLines(2),
    p("Finde alle Verben (Tätigkeiten) die Ben macht:"), ...writeLines(2),
    empty(),
    h2("Aufgabe 4: Deine Erfahrung"),
    p("Schreibe 2 Sätze: Was machst du, wenn du krank bist?"),
    pItalic("Wenn ich krank bin, ..."),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Ben ist neun Jahre alt (nicht sieben)."),
    p("R — Ben hat Fieber und Halsschmerzen."),
    p("F — Bens Mutter ruft die Lehrerin an (nicht den Arzt)."),
    p("R — Ben muss viel Tee trinken."),
    p("F — Ben geht nach zwei Tagen wieder in die Schule (nicht einem Tag)."),
    p("R — Am Donnerstag ist Ben wieder gesund."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Ben hat Fieber, Halsschmerzen und Kopfschmerzen."),
    p("2. Ben bleibt im Bett, trinkt Tee, nimmt Tabletten, schläft, sieht fern und liest ein Buch."),
    p("3. Nach zwei Tagen / Am Donnerstag ist Ben wieder gesund."),
    empty(),
    h2("Aufgabe 3: Suche im Text"),
    p("Krankheiten/Symptome: Fieber, Halsschmerzen, Kopfschmerzen (tut weh)"),
    p("Verben (was Ben tut): bleiben, trinken, schlafen, fernsehen, lesen"),
    empty(),
    h2("Aufgabe 4: Deine Erfahrung"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [
      new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [
        new Paragraph({ children: [new TextRun({ text: "krank  •  gesund  •  Fieber  •  Husten  •  Schnupfen  •  Halsschmerzen  •  Bauchschmerzen  •  Tabletten  •  Arzt  •  schlafen  •  trinken  •  Besserung", size: 24, font: "Arial" })] })
      ]})]})]
    }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Ich bin _______ und muss zu Hause bleiben."),
    p("2. Mein Hals tut weh. Ich habe _______."),
    p("3. Ich niese viel. Ich habe _______."),
    p("4. Ich huste den ganzen Tag. Ich habe _______."),
    p("5. Meine Temperatur ist 39°C. Ich habe _______."),
    p("6. Der _______ gibt mir Tabletten."),
    empty(),
    h2("Teil B: Dialog beim Arzt"),
    pItalic("Ergänze den Dialog."),
    empty(),
    p("Arzt:    Guten Morgen! Was fehlt dir?"),
    p("Kind:    Ich bin _______. Ich habe _______ und _______."),
    p("Arzt:    Seit wann bist du krank?"),
    p("Kind:    Seit gestern. Mein Kopf tut auch _______."),
    p("Arzt:    Du musst viel _______ und viel _______."),
    p("Arzt:    Ich gebe dir _______ für den Hals."),
    p("Kind:    Danke, Herr Doktor!"),
    p("Arzt:    Gute _______! Komm in drei Tagen wieder."),
    empty(),
    h2("Teil C: Was ist richtig?"),
    pItalic("Wähle das richtige Wort."),
    empty(),
    p("Wenn du krank bist, musst du viel (schlafen / laufen)."),
    p("Mit Fieber sollst du (in die Schule gehen / zu Hause bleiben)."),
    p("Wenn du Schnupfen hast, putzt du deine (Ohren / Nase)."),
    p("Der (Arzt / Lehrer) hilft dir, wenn du krank bist."),
    p("Nach der Krankheit bist du wieder (krank / gesund)."),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 Sätze: Was hast du, wenn du krank bist?"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. krank"), p("2. Halsschmerzen"), p("3. Schnupfen"),
    p("4. Husten"), p("5. Fieber"), p("6. Arzt"),
    empty(),
    h2("Teil B: Dialog beim Arzt"),
    p("krank / Husten / Halsschmerzen (oder andere Krankheiten) / weh / trinken / schlafen / Tabletten / Besserung"),
    pItalic("Individuelle Krankheitskombinationen akzeptieren."),
    empty(),
    h2("Teil C: Was ist richtig?"),
    p("schlafen / zu Hause bleiben / Nase / Arzt / gesund"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["Fieber", "Nomen (das)", "Ich habe Fieber. Meine Temperatur ist hoch."],
    ["Husten", "Nomen (der)", "Ich habe Husten. Ich huste viel."],
    ["Schnupfen", "Nomen (der)", "Ich habe Schnupfen. Meine Nase läuft."],
    ["Halsschmerzen", "Nomen (Pl.)", "Ich habe Halsschmerzen. Mein Hals tut weh."],
    ["Bauchschmerzen", "Nomen (Pl.)", "Ich habe Bauchschmerzen. Mein Bauch tut weh."],
    ["Kopfschmerzen", "Nomen (Pl.)", "Ich habe Kopfschmerzen. Mein Kopf tut weh."],
    ["krank", "Adjektiv", "Ich bin krank. Ich muss zum Arzt."],
    ["gesund", "Adjektiv", "Ich bin gesund. Ich fühle mich gut."],
    ["der Arzt / die Ärztin", "Nomen", "Der Arzt hilft mir."],
    ["die Tablette", "Nomen (die)", "Ich nehme eine Tablette."],
    ["Gute Besserung!", "Ausdruck", "Sagt man zu kranken Menschen."],
    ["wehtun", "Verb", "Mein Kopf tut weh."],
    ["schlafen", "Verb", "Ich muss viel schlafen."],
    ["sich fühlen", "Verb", "Ich fühle mich nicht gut."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2800), hCell("Wortart", 1600), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1600), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Wortliste"), studentHead(), empty(),
    h2("Krankheiten und Gesundheit — Wörter"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1600, 5238], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.map(r => p(`${r[0].split("/")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe jedes Wort auf eine Karte. Vorne: Deutsch. Hinten: deine Sprache + Zeichnung."),
    p("Extra-Tipp: Schreibe auch den Satz auf die Rückseite!")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("Schmerzen: immer Plural! → Kopfschmerzen, Bauchschmerzen, Halsschmerzen, Ohrenschmerzen"),
    bullet("Fieber, Husten, Schnupfen: kein Artikel nötig bei 'Ich habe...'"),
    bullet("wehtun ist trennbar: Mein Kopf tut weh. (nicht: tutweh)"),
    bullet("sich fühlen: Ich fühle mich gut / schlecht / krank / gesund."),
    bullet("Gute Besserung! — fester Ausdruck, immer mit großem G")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Beim Arzt"),
    pItalic("Person A = Arzt/Ärztin, Person B = Patient/Patientin. Fülle die Lücken aus."),
    empty(),
    p("Arzt:     Guten Morgen! Wie geht es dir?"),
    p("Patient:  Nicht gut. Ich fühle mich _______."),
    p("Arzt:     Was tut dir weh?"),
    p("Patient:  Ich habe _______ und _______. Mein _______ tut auch weh."),
    p("Arzt:     Öffne bitte den Mund. Hmm, dein Hals ist rot."),
    p("Patient:  Muss ich _______ nehmen?"),
    p("Arzt:     Ja, und du musst viel _______ und _______."),
    p("Patient:  Danke! Wann bin ich wieder _______?"),
    p("Arzt:     In _______ Tagen geht es dir besser. Gute Besserung!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen und spielt den Dialog noch einmal."),
    empty(),
    h2("Dialog 2: In der Schule"),
    pItalic("Person A = Schüler/in, Person B = Lehrer/in."),
    empty(),
    p("Lehrer:   Warum warst du gestern nicht in der Schule?"),
    p("Schüler:  Ich war _______. Ich hatte _______."),
    p("Lehrer:   Wie geht es dir heute?"),
    p("Schüler:  Besser, danke. Aber mein _______ tut noch ein bisschen weh."),
    p("Lehrer:   Gut, dass du wieder da bist! Gute _______!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen und spielt den Dialog noch einmal."),
    empty(),
    h2("Partnerinterview: Krank sein"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    empty(),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was machst du, wenn du krank bist?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist deine häufigste Krankheit?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Wer hilft dir, wenn du krank bist?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Isst du etwas Besonderes, wenn du krank bist?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was sagst du zu einem kranken Freund?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Krank oder gesund?"),
    p("Eine Person beschreibt Symptome auf Deutsch. Die anderen raten die Krankheit."),
    pItalic("Beispiel: \"Meine Nase läuft. Ich niese viel.\" → Schnupfen!"),
    p("Wörter: Fieber / Husten / Schnupfen / Halsschmerzen / Bauchschmerzen / Kopfschmerzen")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Konversation"), empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("krank / Fieber + Halsschmerzen (oder andere) / Kopf / Tabletten / trinken / schlafen / gesund / zwei (oder drei)"),
    empty(),
    h2("Dialog 2: Mögliche Lösungen"),
    p("krank / Fieber (oder andere Krankheit) / Kopf (oder Hals) / Besserung"),
    empty(),
    h2("Bewertungskriterien Konversation"),
    bullet("Krankheiten korrekt auf Deutsch benannt"),
    bullet("Verben richtig verwendet (haben, sein, tun weh)"),
    bullet("Verständlicher Dialog auf Deutsch"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Krankheitsvokabular korrekt auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Einfache Krankheiten — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Was hat das Kind?"),
    p("[BILD 1: Sechs kleine Bilder von Kindern mit verschiedenen Symptomen: (a) Kind hält Kopf, (b) Kind hält Bauch, (c) Kind niest, (d) Kind hustet, (e) Kind hält Thermometer mit 39°C, (f) Kind hält Hals]"),
    pItalic("Schreibe unter jedes Bild: Was hat das Kind?"),
    p("(a) Das Kind hat _______________________"),
    p("(b) Das Kind hat _______________________"),
    p("(c) Das Kind hat _______________________"),
    p("(d) Das Kind hat _______________________"),
    p("(e) Das Kind hat _______________________"),
    p("(f) Das Kind hat _______________________"),
    empty(),
    h2("Aufgabe 2: Beim Arzt"),
    p("[BILD 2: Arztpraxis — Arzt und Kind sitzen sich gegenüber, Kind hält die Hand an den Bauch]"),
    pItalic("Beantworte die Fragen:"),
    p("1. Wo sind die Personen? _______________________"),
    p("2. Was tut dem Kind weh? _______________________"),
    p("3. Was sagt der Arzt? Schreibe einen Satz in die Sprechblase: [SPRECHBLASE ARZT]"),
    ...writeLines(1),
    empty(),
    h2("Aufgabe 3: Krank zu Hause"),
    p("[BILD 3: Kind liegt im Bett, neben dem Bett steht ein Glas Tee, auf dem Tisch liegt ein Buch, die Mutter bringt Tabletten]"),
    pItalic("Was siehst du? Schreibe 3 Sätze über das Bild."),
    ...writeLines(3),
    empty(),
    h2("Aufgabe 4: Verbinden"),
    p("[BILD 4: Linke Seite: 5 Bilder von Symptomen. Rechte Seite: 5 deutsche Wörter (Fieber, Husten, Schnupfen, Halsschmerzen, Bauchschmerzen)]"),
    pItalic("Verbinde jedes Bild mit dem richtigen Wort."),
    empty(),
    h2("Aufgabe 5: Was sagst du?"),
    p("[BILD 5: Zwei Kinder — eines liegt krank im Bett, das andere besucht es]"),
    pItalic("Was sagt das gesunde Kind zu dem kranken Kind? Schreibe in die Sprechblase:"),
    ...writeLines(1),
    pItalic("Was antwortet das kranke Kind? Schreibe in die Sprechblase:"),
    ...writeLines(1)
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Einfache Krankheiten Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Was hat das Kind?"),
    p("(a) Das Kind hat Kopfschmerzen."),
    p("(b) Das Kind hat Bauchschmerzen."),
    p("(c) Das Kind hat Schnupfen."),
    p("(d) Das Kind hat Husten."),
    p("(e) Das Kind hat Fieber."),
    p("(f) Das Kind hat Halsschmerzen."),
    empty(),
    h2("Aufgabe 2: Beim Arzt"),
    p("1. Beim Arzt / in der Arztpraxis."),
    p("2. Dem Kind tut der Bauch weh. / Das Kind hat Bauchschmerzen."),
    p("3. Mögliche Sprechblase: \"Was tut dir weh?\" oder \"Du musst viel schlafen.\""),
    empty(),
    h2("Aufgabe 3: Krank zu Hause"),
    p("Musterlösungen (individuelle Antworten akzeptieren):"),
    bullet("Das Kind liegt im Bett."),
    bullet("Die Mutter bringt Tabletten."),
    bullet("Neben dem Bett steht ein Glas Tee."),
    empty(),
    h2("Aufgabe 4: Verbinden"),
    p("Antworten abhängig von Bildanordnung. Vokabular: Fieber, Husten, Schnupfen, Halsschmerzen, Bauchschmerzen."),
    empty(),
    h2("Aufgabe 5: Was sagst du?"),
    p("Gesundes Kind: \"Gute Besserung!\" oder \"Was hast du? Ich hoffe, du wirst schnell gesund!\""),
    p("Krankes Kind: \"Danke! Ich habe Fieber.\" oder \"Danke, mir geht es nicht so gut.\"")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Einfache Krankheiten");
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
