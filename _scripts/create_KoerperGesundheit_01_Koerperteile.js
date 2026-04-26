"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak, VerticalAlign
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "05_KoerperGesundheit", "01_Koerperteile");
const TOPIC = "A1_Kinder_KoerperGesundheit_01_Koerperteile";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Körper & Gesundheit — Körperteile", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }

function makeKoerperTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2200, 1200, 2200, 4038],
    rows: [
      new TableRow({ children: [hCell("Körperteil", 2200), hCell("Artikel", 1200), hCell("Plural", 2200), hCell("Beispielsatz", 4038)] }),
      new TableRow({ children: [dCell("Kopf", 2200), dCell("der", 1200), dCell("die Köpfe", 2200), dCell("Ich habe einen Kopf.", 4038)] }),
      new TableRow({ children: [dCell("Bauch", 2200), dCell("der", 1200), dCell("die Bäuche", 2200), dCell("Mein Bauch tut weh.", 4038)] }),
      new TableRow({ children: [dCell("Arm", 2200), dCell("der", 1200), dCell("die Arme", 2200), dCell("Ich habe zwei Arme.", 4038)] }),
      new TableRow({ children: [dCell("Bein", 2200), dCell("das", 1200), dCell("die Beine", 2200), dCell("Ich habe zwei Beine.", 4038)] }),
      new TableRow({ children: [dCell("Hand", 2200), dCell("die", 1200), dCell("die Hände", 2200), dCell("Meine Hand ist kalt.", 4038)] }),
      new TableRow({ children: [dCell("Fuß", 2200), dCell("der", 1200), dCell("die Füße", 2200), dCell("Mein Fuß tut weh.", 4038)] }),
      new TableRow({ children: [dCell("Auge", 2200), dCell("das", 1200), dCell("die Augen", 2200), dCell("Ich habe braune Augen.", 4038)] }),
      new TableRow({ children: [dCell("Nase", 2200), dCell("die", 1200), dCell("die Nasen", 2200), dCell("Meine Nase ist kalt.", 4038)] }),
      new TableRow({ children: [dCell("Mund", 2200), dCell("der", 1200), dCell("die Münder", 2200), dCell("Ich habe einen Mund.", 4038)] }),
      new TableRow({ children: [dCell("Ohr", 2200), dCell("das", 1200), dCell("die Ohren", 2200), dCell("Meine Ohren sind groß.", 4038)] }),
      new TableRow({ children: [dCell("Finger", 2200), dCell("der", 1200), dCell("die Finger", 2200), dCell("Ich habe zehn Finger.", 4038)] }),
      new TableRow({ children: [dCell("Knie", 2200), dCell("das", 1200), dCell("die Knie", 2200), dCell("Mein Knie tut weh.", 4038)] }),
      new TableRow({ children: [dCell("Schulter", 2200), dCell("die", 1200), dCell("die Schultern", 2200), dCell("Meine Schulter ist müde.", 4038)] })
    ]
  });
}

async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Schreibübung"), studentHead(), empty(),
    h2("Körperteile auf Deutsch"), p("Lerne diese Wörter:"), makeKoerperTable(), empty(),
    h2("Aufgabe 1: Wie viele?"),
    p("Schreibe die richtige Zahl oder den richtigen Artikel. Beispiel: Ich habe einen Kopf."),
    pItalic("Benutze: einen / eine / zwei / zehn"),
    empty(),
    p("Ich habe _______ Kopf."),    p("Ich habe _______ Augen."),
    p("Ich habe _______ Arme."),    p("Ich habe _______ Beine."),
    p("Ich habe _______ Hände."),   p("Ich habe _______ Finger."),
    p("Ich habe _______ Nase."),    p("Ich habe _______ Ohren."),
    empty(),
    h2("Aufgabe 2: Der, die oder das?"),
    p("Schreibe den richtigen Artikel vor das Wort."), pItalic("der / die / das"),
    empty(),
    p("_______ Kopf          _______ Arm          _______ Bein"),
    p("_______ Auge          _______ Nase         _______ Mund"),
    p("_______ Ohr           _______ Hand         _______ Fuß"),
    p("_______ Finger        _______ Knie         _______ Schulter"),
    empty(),
    h2("Aufgabe 3: Sätze schreiben"),
    p("Schreibe 4 Sätze mit Körperteilen. Beispiel: Mein Kopf ist groß."),
    pItalic("Mein / Meine / Ich habe..."),
    ...writeLines(4),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe deinen Körper! Schreibe 3–5 Sätze."),
    pItalic("Beispiel: Ich habe zwei blaue Augen. Meine Haare sind braun. Ich habe zehn Finger."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Schreibübung"), empty(),
    h2("Aufgabe 1: Wie viele?"),
    p("Ich habe einen Kopf."),   p("Ich habe zwei Augen."),
    p("Ich habe zwei Arme."),    p("Ich habe zwei Beine."),
    p("Ich habe zwei Hände."),   p("Ich habe zehn Finger."),
    p("Ich habe eine Nase."),    p("Ich habe zwei Ohren."),
    empty(), pItalic("Hinweis: 'einen Kopf' (maskulin Akk.) / 'eine Nase' (feminin Akk.) — Artikel beachten!"),
    empty(),
    h2("Aufgabe 2: Der, die oder das?"),
    p("der Kopf      der Arm       das Bein"),
    p("das Auge      die Nase      der Mund"),
    p("das Ohr       die Hand      der Fuß"),
    p("der Finger    das Knie      die Schulter"),
    empty(),
    h2("Aufgabe 3: Sätze schreiben"),
    p("Musterlösungen (individuelle Antworten akzeptieren):"),
    bullet("Mein Kopf ist groß."), bullet("Meine Hände sind kalt."),
    bullet("Mein Bauch tut weh."), bullet("Ich habe zwei blaue Augen."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: Körperteile korrekt benannt, Artikel beachtet, verständliche Sätze.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Leseübung"), studentHead(), empty(),
    h2("Text: Beim Arzt"),
    p("Lea ist acht Jahre alt. Heute ist sie beim Arzt.", 26),
    p("Der Arzt heißt Dr. Schmidt.", 26),
    p("Dr. Schmidt fragt: \"Was tut dir weh?\"", 26),
    p("Lea sagt: \"Mein Bauch tut weh. Und mein Kopf tut auch weh.\"", 26),
    p("Der Arzt schaut in Leas Mund und in ihre Ohren.", 26),
    p("Er sagt: \"Deine Augen und deine Nase sind okay.\"", 26),
    p("Lea hat Fieber. Sie muss viel trinken und schlafen.", 26),
    p("Ihre Arme und Beine sind sehr müde.", 26),
    p("Nach drei Tagen geht es Lea wieder gut.", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Lea ist zehn Jahre alt."),
    p("___ Der Arzt heißt Dr. Schmidt."),
    p("___ Leas Bauch tut weh."),
    p("___ Leas Augen sind krank."),
    p("___ Lea hat Fieber."),
    p("___ Nach einer Woche geht es Lea gut."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was tut Lea weh?"), ...writeLines(2),
    p("2. Was schaut der Arzt an?"), ...writeLines(2),
    p("3. Was muss Lea machen?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Körperteile im Text"),
    p("Finde alle Körperteile im Text. Schreibe sie auf:"), ...writeLines(3),
    empty(),
    h2("Aufgabe 4: Dein Körper"),
    p("Was tut dir manchmal weh? Schreibe 2 Sätze."),
    pItalic("Beispiel: Mein Kopf tut manchmal weh."),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Lea ist acht Jahre alt (nicht zehn)."),
    p("R — Der Arzt heißt Dr. Schmidt."),
    p("R — Leas Bauch tut weh."),
    p("F — Leas Augen sind okay (nicht krank)."),
    p("R — Lea hat Fieber."),
    p("F — Nach drei Tagen geht es Lea gut (nicht einer Woche)."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Leas Bauch und ihr Kopf tun weh. Auch ihre Arme und Beine sind sehr müde."),
    p("2. Der Arzt schaut in Leas Mund und in ihre Ohren. Er prüft auch Augen und Nase."),
    p("3. Lea muss viel trinken und schlafen."),
    empty(),
    h2("Aufgabe 3: Körperteile im Text"),
    p("Bauch, Kopf, Mund, Ohren, Augen, Nase, Arme, Beine"),
    empty(),
    h2("Aufgabe 4: Dein Körper"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Mein Kopf tut manchmal weh. Mein Bauch tut nach dem Sport weh.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [
      new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [
        new Paragraph({ children: [new TextRun({ text: "Bauch  •  Kopf  •  Arme  •  Beine  •  Hände  •  Augen  •  Nase  •  Mund  •  Ohren  •  Finger  •  Knie  •  Schulter  •  Fuß", size: 24, font: "Arial" })] })
      ]})]})]
    }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Ich habe zwei _______. Ich kann damit hören."),
    p("2. Mit meinen _______ kann ich sehen."),
    p("3. Ich habe einen _______. Damit esse ich."),
    p("4. Mein _______ ist müde. Ich brauche eine Pause."),
    p("5. Ich habe zehn _______. Damit schreibe ich."),
    p("6. Meine _______ tun weh. Ich laufe nicht mehr."),
    empty(),
    h2("Teil B: Dialog"),
    pItalic("Ergänze den Dialog zwischen Arzt und Kind."),
    empty(),
    p("Arzt: Was tut dir weh?"),
    p("Kind: Mein _______ tut weh. (Tipp: der Bauch)"),
    p("Arzt: Hast du auch Schmerzen in deinen _______? (Tipp: Arme)"),
    p("Kind: Ja, meine _______ sind auch müde. (Tipp: Schulter)"),
    p("Arzt: Öffne bitte deinen _______. (Tipp: Mund)"),
    p("Kind: Okay. Meine _______ tun nicht weh. (Tipp: Ohren)"),
    empty(),
    h2("Teil C: Beschreibung"),
    pItalic("Ergänze den Text mit passenden Körperteilen."),
    empty(),
    p("Ich bin ein Mensch. Ich habe einen _______ oben und zwei _______ unten."),
    p("Mit meinen _______ kann ich laufen. Meine _______ sind am Ende meiner Arme."),
    p("Ich habe eine _______ zum Riechen und einen _______ zum Sprechen."),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 eigene Sätze mit Körperteilen:"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. Ohren"), p("2. Augen"), p("3. Mund"),
    p("4. Kopf"), p("5. Fingern / Finger"), p("6. Knie / Beine"),
    empty(),
    h2("Teil B: Dialog"),
    p("Bauch / Arme / Schulter / Mund / Ohren"),
    empty(),
    h2("Teil C: Beschreibung"),
    p("Kopf / Beine / Beinen / Hände / Nase / Mund"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["Kopf", "Nomen (der)", "Mein Kopf tut weh."],
    ["Bauch", "Nomen (der)", "Mein Bauch ist voll."],
    ["Arm", "Nomen (der)", "Ich habe zwei Arme."],
    ["Bein", "Nomen (das)", "Meine Beine sind müde."],
    ["Hand", "Nomen (die)", "Meine Hand ist kalt."],
    ["Fuß", "Nomen (der)", "Mein Fuß tut weh."],
    ["Auge", "Nomen (das)", "Ich habe braune Augen."],
    ["Nase", "Nomen (die)", "Meine Nase ist kalt."],
    ["Mund", "Nomen (der)", "Öffne deinen Mund!"],
    ["Ohr", "Nomen (das)", "Meine Ohren sind groß."],
    ["Finger", "Nomen (der)", "Ich habe zehn Finger."],
    ["Knie", "Nomen (das)", "Mein Knie tut weh."],
    ["Schulter", "Nomen (die)", "Meine Schulter ist müde."],
    ["wehtun", "Verb", "Mein Bauch tut weh."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2500), hCell("Wortart", 2000), hCell("Beispielsatz", 5138)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2500), dCell(r[1], 2000), dCell(r[2], 5138)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Wortliste"), studentHead(), empty(),
    h2("Körperteile — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2500, 2000, 5138], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.map(r => p(`${r[0]}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe jedes Wort auf eine Karte. Vorne: Deutsch. Hinten: deine Sprache."),
    p("Tipp: Zeichne den Körper und beschrifte die Teile auf Deutsch!")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    p("Die Übersetzungen hängen von der Muttersprache der Schüler ab."),
    empty(),
    h2("Merkhilfen für den Unterricht"),
    bullet("der Kopf, der Mund, der Arm, der Fuß, der Finger — maskulin"),
    bullet("die Nase, die Hand, die Schulter — feminin"),
    bullet("das Auge, das Ohr, das Bein, das Knie — neutral"),
    bullet("Pluralformen oft unregelmäßig: der Fuß → die Füße, die Hand → die Hände"),
    bullet("wehtun: Mein Kopf tut weh. (trennbares Verb: tut...weh)")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Beim Arzt"),
    pItalic("Person A = Arzt, Person B = Patient. Fülle die Lücken aus."),
    empty(),
    p("Arzt:    Guten Tag! Was tut dir _______?"),
    p("Patient: Guten Tag! Mein _______ tut weh."),
    p("Arzt:    Tut auch dein _______ weh?"),
    p("Patient: Ja, und meine _______ sind auch müde."),
    p("Arzt:    Öffne bitte deinen _______. Gut!"),
    p("Patient: Wann bin ich wieder _______?"),
    p("Arzt:    In drei Tagen geht es dir wieder gut!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen und spielt den Dialog noch einmal."),
    empty(),
    h2("Dialog 2: Simon sagt"),
    pItalic("Ein Schüler ist Simon. Simon gibt Anweisungen."),
    pItalic("Die anderen machen es nur, wenn 'Simon sagt...' davor steht."),
    empty(),
    p("Beispiele:"),
    bullet("Simon sagt: Zeige auf deinen Kopf!"),
    bullet("Simon sagt: Berühre deine Nase!"),
    bullet("Simon sagt: Zeige deine Hände!"),
    bullet("Zeige auf deinen Bauch! (kein Simon sagt — wer macht es, ist raus!)"),
    empty(),
    h2("Partnerinterview: Mein Körper"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    empty(),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Welche Augenfarbe hast du?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was tut dir manchmal weh?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Wie viele Finger hast du?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was machst du, wenn dein Kopf wehtut?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Welcher Körperteil ist am stärksten bei dir?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Körper-Staffel"),
    p("Klasse steht im Kreis. Lehrer sagt einen Körperteil."),
    p("Wer zuerst den Körperteil berührt und laut sagt bekommt einen Punkt."),
    pItalic("Wörter: Kopf, Nase, Mund, Ohr, Schulter, Arm, Hand, Finger, Bauch, Bein, Knie, Fuß")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Konversation"), empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("Arzt:    Was tut dir weh?"),
    p("Patient: Mein Bauch / Kopf / Bein tut weh."),
    p("Arzt:    Tut auch dein Kopf / Arm weh?"),
    p("Patient: Ja, und meine Schultern / Beine sind auch müde."),
    p("Arzt:    Öffne bitte deinen Mund. Gut!"),
    p("Patient: Wann bin ich wieder gesund?"),
    p("Arzt:    In drei Tagen geht es dir wieder gut!"),
    empty(),
    h2("Bewertungskriterien Konversation"),
    bullet("Körperteile korrekt benannt (mit Artikel)"),
    bullet("Verständliche Sätze gebildet"),
    bullet("Auf Deutsch kommuniziert"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Körperteile und Farben korrekt auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Körperteile — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Körper beschriften"),
    p("[BILD 1: Einfache Umrisszeichnung eines Kindes von vorne, mit 8 Pfeilen auf: Kopf, Arm, Hand, Bauch, Bein, Fuß, Schulter, Knie]"),
    pItalic("Schreibe den richtigen Namen an jeden Pfeil."),
    p("Wörterkasten: Kopf — Arm — Hand — Bauch — Bein — Fuß — Schulter — Knie"),
    ...writeLines(2),
    empty(),
    h2("Aufgabe 2: Gesicht beschriften"),
    p("[BILD 2: Einfaches Gesicht (Kreis) mit Pfeilen auf: Auge, Nase, Mund, Ohr]"),
    pItalic("Schreibe den richtigen Namen an jeden Pfeil."),
    ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Verbinden"),
    p("[BILD 3: Linke Seite: 6 kleine Bilder von einzelnen Körperteilen. Rechte Seite: gemischte Liste der deutschen Wörter]"),
    pItalic("Verbinde jedes Bild mit dem richtigen deutschen Wort."),
    empty(),
    h2("Aufgabe 4: Wie viele?"),
    p("[BILD 4: Eine Person mit farbigen Markierungen: 2 rote Arme, 10 blaue Finger, 2 grüne Beine, 1 gelber Kopf]"),
    pItalic("Beantworte die Fragen:"),
    p("Wie viele Arme hat die Person? _______"),
    p("Wie viele Finger hat die Person? _______"),
    p("Wie viele Beine hat die Person? _______"),
    p("Welche Farbe hat der Kopf? _______"),
    empty(),
    h2("Aufgabe 5: Was tut weh?"),
    p("[BILD 5: Eine Person mit einem traurigen Gesicht und einer Hand am Bauch]"),
    pItalic("Was tut der Person weh? Schreibe einen Satz."),
    ...writeLines(1),
    p("[BILD 6: Eine Person mit einem Verband am Knie]"),
    pItalic("Was tut der Person weh? Schreibe einen Satz."),
    ...writeLines(1)
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Körperteile Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Körper beschriften"),
    p("Erwartete Antworten (abhängig von Pfeilpositionen):"),
    p("Kopf (oben) — Schulter — Arm — Hand — Bauch — Bein — Knie — Fuß"),
    empty(),
    h2("Aufgabe 2: Gesicht beschriften"),
    p("Auge (2×) — Nase — Mund — Ohr (2×)"),
    empty(),
    h2("Aufgabe 3: Verbinden"),
    p("Antworten abhängig von der Bildanordnung."),
    p("Sicherstellen: Artikel korrekt (der/die/das) wenn Schüler Artikel hinzufügen."),
    empty(),
    h2("Aufgabe 4: Wie viele?"),
    p("2 Arme / 10 Finger / 2 Beine / gelb"),
    empty(),
    h2("Aufgabe 5: Was tut weh?"),
    p("Bild 5: Der Bauch tut weh. / Ihr Bauch tut weh."),
    p("Bild 6: Das Knie tut weh. / Sein Knie tut weh.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Körperteile");
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
