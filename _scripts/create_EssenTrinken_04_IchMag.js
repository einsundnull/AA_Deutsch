"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "07_EssenTrinken", "04_IchMag");
const TOPIC = "A1_Kinder_EssenTrinken_04_IchMag";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Essen & Trinken — Ich mag / mag nicht", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeMagenTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2400, 3600, 3638],
    rows: [
      new TableRow({ children: [hCell("Ausdruck", 2400), hCell("Beispiel", 3600), hCell("Bedeutung", 3638)] }),
      new TableRow({ children: [dCell("Ich mag ...", 2400), dCell("Ich mag Pizza.", 3600), dCell("ich esse es gern", 3638)] }),
      new TableRow({ children: [dCell("Ich mag kein/keine ...", 2400), dCell("Ich mag keinen Fisch.", 3600), dCell("ich esse es nicht gern", 3638)] }),
      new TableRow({ children: [dCell("Ich esse gern ...", 2400), dCell("Ich esse gern Nudeln.", 3600), dCell("= Ich mag Nudeln.", 3638)] }),
      new TableRow({ children: [dCell("Ich esse nicht gern ...", 2400), dCell("Ich esse nicht gern Salat.", 3600), dCell("= Ich mag keinen Salat.", 3638)] }),
      new TableRow({ children: [dCell("Ich liebe ...", 2400), dCell("Ich liebe Eis!", 3600), dCell("sehr sehr gern (stark!)", 3638)] }),
      new TableRow({ children: [dCell("... schmeckt mir", 2400), dCell("Pizza schmeckt mir gut.", 3600), dCell("es ist lecker für mich", 3638)] }),
      new TableRow({ children: [dCell("... schmeckt mir nicht", 2400), dCell("Spinat schmeckt mir nicht.", 3600), dCell("nicht lecker für mich", 3638)] }),
      new TableRow({ children: [dCell("Ich bin allergisch gegen ...", 2400), dCell("Ich bin allergisch gegen Nüsse.", 3600), dCell("kann es nicht essen", 3638)] }),
      new TableRow({ children: [dCell("Ich bin Vegetarier/in.", 2400), dCell("Ich esse kein Fleisch.", 3600), dCell("kein Fleisch / Fisch", 3638)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Schreibübung"), studentHead(), empty(),
    h2("Mögen und Essen ausdrücken"), makeMagenTable(), empty(),
    h2("Aufgabe 1: Ich mag oder ich mag nicht?"),
    p("Schreibe Sätze mit 'Ich mag...' oder 'Ich mag kein/keine...'"),
    pItalic("kein (mask./neut.) / keine (fem./Plural)"),
    empty(),
    p("Pizza:        _______________________________________"),
    p("Spinat:       _______________________________________"),
    p("Hamburger:    _______________________________________"),
    p("Milch:        _______________________________________"),
    p("Gemüse:       _______________________________________"),
    p("Kuchen:       _______________________________________"),
    empty(),
    h2("Aufgabe 2: Kein oder keine?"),
    p("Ergänze den richtigen Artikel nach 'kein-'."),
    pItalic("kein (der/das) / keine (die/Plural)"),
    empty(),
    p("Ich mag kein_____ Fisch.         (der Fisch)"),
    p("Ich mag kein_____ Pizza.         (die Pizza)"),
    p("Ich mag kein_____ Fleisch.       (das Fleisch)"),
    p("Ich mag kein_____ Nudeln.        (Plural)"),
    p("Ich mag kein_____ Salat.         (der Salat)"),
    p("Ich mag kein_____ Suppe.         (die Suppe)"),
    empty(),
    h2("Aufgabe 3: Meine Essensliste"),
    p("Schreibe je 3 Dinge, die du magst und nicht magst."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Ich mag...", 4819), hCell("Ich mag nicht...", 4819)] }),
      new TableRow({ children: [dCell("1.", 4819), dCell("1.", 4819)] }),
      new TableRow({ children: [dCell("2.", 4819), dCell("2.", 4819)] }),
      new TableRow({ children: [dCell("3.", 4819), dCell("3.", 4819)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 4–6 Sätze: Was isst du gern und was nicht? Warum?"),
    pItalic("Ich mag... sehr gern, weil... / Ich mag kein..., weil es zu... schmeckt."),
    ...writeLines(6)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Schreibübung"), empty(),
    h2("Aufgabe 1: Ich mag oder ich mag nicht?"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Ich mag Pizza. / Ich mag keinen Spinat."),
    p("Ich mag Hamburger. / Ich mag keine Milch. / Ich mag kein Gemüse. / Ich mag Kuchen."),
    empty(),
    h2("Aufgabe 2: Kein oder keine?"),
    p("keinen Fisch      (der → keinen im Akk.)"),
    p("keine Pizza       (die → keine)"),
    p("kein Fleisch      (das → kein)"),
    p("keine Nudeln      (Plural → keine)"),
    p("keinen Salat      (der → keinen im Akk.)"),
    p("keine Suppe       (die → keine)"),
    empty(),
    pItalic("Hinweis A1: kein/keine/keinen — für A1 reicht kein (mask./neut.) / keine (fem./Plural). Akkusativ -en für Fortgeschrittenere."),
    empty(),
    h2("Aufgabe 3: Meine Essensliste"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: mögen/nicht mögen korrekt ausgedrückt, Begründung versucht.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Leseübung"), studentHead(), empty(),
    h2("Text: Das Schulessen"),
    p("Heute gibt es in der Schulkantine Gemüsesuppe und Hähnchen mit Reis.", 26),
    p("Mia (9) mag Reis sehr gern, aber sie mag kein Hähnchen.", 26),
    p("Sie isst nur die Suppe und den Reis.", 26),
    p("Ihr Freund Noah (10) liebt Hähnchen! Er isst alles auf.", 26),
    p("\"Magst du mein Hähnchen?\", fragt Mia.", 26),
    p("\"Ja, gern!\", sagt Noah. \"Und ich mag keine Suppe — magst du meine?\"", 26),
    p("Mia lacht: \"Ja! Dann tauschen wir!\"", 26),
    p("Mias Tischnachbarin Lena mag weder Suppe noch Hähnchen.", 26),
    p("Lena ist Vegetarierin. Sie isst nur Reis mit Gemüse.", 26),
    p("\"Ich liebe Gemüse!\", sagt Lena. \"Das ist das Beste!\"", 26),
    p("Alle lachen. Jeder mag etwas anderes — und das ist okay!", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Mia mag Hähnchen sehr gern."),
    p("___ Noah liebt Hähnchen."),
    p("___ Mia und Noah tauschen ihr Essen."),
    p("___ Lena ist Vegetarierin."),
    p("___ Lena mag keine Suppe und kein Hähnchen."),
    p("___ Alle mögen dasselbe Essen."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was mag Mia nicht?"), ...writeLines(1),
    p("2. Was isst Lena?"), ...writeLines(1),
    p("3. Was tauschen Mia und Noah?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Wer mag was? — Tabelle"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2413, 2413, 2412, 2400], rows: [
      new TableRow({ children: [hCell("", 2413), hCell("Mia", 2413), hCell("Noah", 2412), hCell("Lena", 2400)] }),
      new TableRow({ children: [dCell("Suppe", 2413), dCell("", 2413), dCell("", 2412), dCell("", 2400)] }),
      new TableRow({ children: [dCell("Hähnchen", 2413), dCell("", 2413), dCell("", 2412), dCell("", 2400)] }),
      new TableRow({ children: [dCell("Reis", 2413), dCell("", 2413), dCell("", 2412), dCell("", 2400)] }),
      new TableRow({ children: [dCell("Gemüse", 2413), dCell("", 2413), dCell("", 2412), dCell("", 2400)] })
    ]}),
    pItalic("Schreibe: mag / mag nicht / liebt"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Was magst du in der Schulkantine? Was magst du nicht? Schreibe 2–3 Sätze."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Mia mag kein Hähnchen."),
    p("R — Noah liebt Hähnchen."),
    p("R — Mia und Noah tauschen ihr Essen."),
    p("R — Lena ist Vegetarierin."),
    p("R — Lena mag keine Suppe und kein Hähnchen."),
    p("F — Jeder mag etwas anderes (nicht alle dasselbe)."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Mia mag kein Hähnchen."),
    p("2. Lena isst nur Reis mit Gemüse."),
    p("3. Mia gibt Noah ihr Hähnchen und bekommt dafür seine Suppe."),
    empty(),
    h2("Aufgabe 3: Wer mag was?"),
    p("Mia: Suppe (mag) / Hähnchen (mag nicht) / Reis (mag) / Gemüse (mag)"),
    p("Noah: Suppe (mag nicht) / Hähnchen (liebt) / Reis (mag) / Gemüse (mag)"),
    p("Lena: Suppe (mag nicht) / Hähnchen (mag nicht) / Reis (mag) / Gemüse (liebt)"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "mag  •  mag nicht  •  liebe  •  esse gern  •  esse nicht gern  •  schmeckt  •  schmeckt nicht  •  kein  •  keine  •  keinen  •  lecker  •  süß  •  salzig", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Ich _______ Pizza sehr gern. Sie ist mein Lieblingsessen!"),
    p("2. Ich _______ keinen Spinat. Er _______ mir nicht."),
    p("3. Ich _______ Schokolade! Sie ist so _______."),
    p("4. Ich _______ Fisch. Ich finde den Geruch nicht schön."),
    p("5. Dieser Kuchen _______ sehr gut. Darf ich noch ein Stück?"),
    p("6. Ich mag _______ Gemüse und _______ Salat."),
    empty(),
    h2("Teil B: Umschreiben"),
    pItalic("Schreibe den Satz anders. Benutze 'mögen' statt 'essen gern'."),
    empty(),
    p("Ich esse gern Nudeln.             → Ich _______ Nudeln."),
    p("Ich esse nicht gern Brokkoli.     → Ich mag _______ Brokkoli."),
    p("Er isst gern Hamburger.           → Er _______ Hamburger."),
    p("Sie isst nicht gern Suppe.        → Sie mag _______ Suppe."),
    empty(),
    h2("Teil C: Dialog — Was magst du?"),
    pItalic("Ergänze den Dialog."),
    empty(),
    p("A: Magst du Pizza?"),
    p("B: Ja, ich _______ Pizza sehr! Und du?"),
    p("A: Ich mag _______ Pizza. Ich esse lieber Nudeln."),
    p("B: Hmm, _______ dir Nudeln wirklich so gut?"),
    p("A: Ja! Nudeln _______ mir am besten von allem!"),
    p("B: Und was magst du _______ essen?"),
    p("A: Ich mag _______ Spinat. Er _______ mir überhaupt nicht."),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 3 Sätze: Was magst du? Was magst du nicht?"),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. esse gern / mag"), p("2. mag nicht / schmeckt nicht"), p("3. liebe / süß"),
    p("4. esse nicht gern / mag nicht"), p("5. schmeckt"), p("6. kein / keinen"),
    empty(),
    h2("Teil B: Umschreiben"),
    p("Ich mag Nudeln."),
    p("Ich mag keinen Brokkoli."),
    p("Er mag Hamburger."),
    p("Sie mag keine Suppe."),
    empty(),
    h2("Teil C: Dialog"),
    p("mag / keine / Schmeckt / schmeckt / nicht gern / keinen / schmeckt nicht"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["mögen", "Verb (unregelmäßig)", "Ich mag Pizza. / Er mag Eis."],
    ["ich mag", "Verbform", "Ich mag Nudeln sehr."],
    ["ich mag nicht", "Verbform + Negation", "Ich mag keinen Spinat."],
    ["ich liebe", "Verb (stark)", "Ich liebe Schokolade!"],
    ["ich esse gern", "Verb + Adverb", "Ich esse gern Salat."],
    ["ich esse nicht gern", "Verb + Negation", "Ich esse nicht gern Fleisch."],
    ["schmecken", "Verb", "Die Pizza schmeckt lecker."],
    ["schmeckt mir gut", "Ausdruck", "Der Kuchen schmeckt mir gut."],
    ["schmeckt mir nicht", "Ausdruck", "Der Spinat schmeckt mir nicht."],
    ["kein / keine / keinen", "Negationsartikel", "Ich mag keinen Fisch."],
    ["lecker", "Adjektiv", "Das Essen ist sehr lecker!"],
    ["süß", "Adjektiv", "Schokolade ist süß."],
    ["salzig", "Adjektiv", "Chips sind salzig."],
    ["Vegetarier/in sein", "Ausdruck", "Ich bin Vegetarierin. Ich esse kein Fleisch."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort / Ausdruck", 2800), hCell("Kategorie", 1600), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1600), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Wortliste"), studentHead(), empty(),
    h2("Vorlieben beim Essen ausdrücken"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1600, 5238], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    p("Ich mag ...:           _______________________________"),
    p("Ich mag nicht ...:     _______________________________"),
    p("Ich liebe ...:         _______________________________"),
    p("schmeckt mir gut:      _______________________________"),
    p("schmeckt mir nicht:    _______________________________"),
    p("lecker:                _______________________________"),
    p("süß:                   _______________________________"),
    p("salzig:                _______________________________"),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe auf eine Karte: 'Ich mag ...' und 'Ich mag kein/keine ...'"),
    p("Füge deine persönlichen Lieblingsessen und Nicht-Lieblingsessen ein!")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("mögen ist unregelmäßig: ich mag / du magst / er mag / wir mögen"),
    bullet("Negation mit kein-: kein (das/der) / keine (die/Plural) / keinen (der, Akkusativ)"),
    bullet("Ich esse gern = Ich mag (beide Ausdrücke gleichwertig auf A1)"),
    bullet("schmecken: Das Essen schmeckt mir. (Dativ — als fester Ausdruck lernen)"),
    bullet("Geschmack: süß / salzig / sauer / bitter / scharf — wichtige Adjektive"),
    bullet("Steigerung: ich mag → ich esse gern → ich esse sehr gern → ich liebe")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Essensvorlieben"),
    pItalic("Zwei Freunde reden über Essen. Fülle die Lücken aus."),
    empty(),
    p("A: Was ist dein Lieblingsessen?"),
    p("B: Ich _______ am liebsten Pizza! Und du?"),
    p("A: Ich _______ lieber Nudeln. Pizza _______ mir manchmal zu fettig."),
    p("B: Hmm. Magst du auch Salat?"),
    p("A: Ja, Salat _______ mir gut. Er ist gesund."),
    p("B: Ich _______ keinen Salat. Er schmeckt mir _______!"),
    p("A: Was _______ du gar nicht?"),
    p("B: Ich _______ überhaupt keinen Spinat. Und du?"),
    p("A: Ich mag _______ Brokkoli. Er schmeckt mir _______!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen. Wählt andere Speisen."),
    empty(),
    h2("Dialog 2: Am Esstisch"),
    pItalic("Familie beim Abendessen. Person A = Elternteil, Person B = Kind."),
    empty(),
    p("Elternteil: Hier ist dein Teller. Guten Appetit!"),
    p("Kind:       Danke! Aber... ich mag _______ Brokkoli."),
    p("Elternteil: Probier doch mal! Brokkoli ist sehr _______."),
    p("Kind:       Okay... Hmm. Er _______ mir eigentlich gar nicht so schlecht!"),
    p("Elternteil: Siehst du! Was _______ du am meisten auf dem Teller?"),
    p("Kind:       Die Nudeln! Ich _______ Nudeln sehr!"),
    p("Elternteil: Super! Dann iss alles auf. Auch den Brokkoli!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Unsere Essensvorlieben"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was magst du am liebsten?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was magst du gar nicht?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Magst du Gemüse? Welches?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was schmeckt dir am besten?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Bist du Vegetarier/in?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Daumen hoch / Daumen runter"),
    p("Lehrer nennt ein Essen. Schüler zeigen: Daumen hoch (= ich mag es) oder Daumen runter."),
    p("Dann sagt jede Person einen Satz: 'Ich mag Pizza!' oder 'Ich mag keine Pizza!'"),
    pItalic("Essen: Pizza / Spinat / Eis / Suppe / Salat / Hähnchen / Schokolade / Fisch / Nudeln / Kuchen")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Konversation"), empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("mag / esse / ist (schmeckt) / schmeckt / mag / nicht / magst / mag / keinen / nicht"),
    pItalic("Sinnvolle Alternativen mit mögen/schmecken akzeptieren."),
    empty(),
    h2("Dialog 2: Mögliche Lösungen"),
    p("keinen / gesund / schmeckt / magst / mag"),
    empty(),
    h2("Bewertungskriterien Konversation"),
    bullet("mögen / schmecken korrekt verwendet"),
    bullet("kein/keine/keinen zur Negation"),
    bullet("Verständlicher Dialog auf Deutsch"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Fokus: mögen + Negation korrekt.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Ich mag / Ich mag nicht — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Daumen hoch oder runter?"),
    p("[BILD 1: 8 Bilder von Speisen — je ein lächelndes Kind (Daumen hoch) oder ein Kind mit Grimasse (Daumen runter) daneben]"),
    pItalic("Schreibe unter jedes Bild einen Satz: 'Das Kind mag...' oder 'Das Kind mag kein/keine...'"),
    ...writeLines(8),
    empty(),
    h2("Aufgabe 2: Meine Essens-Collage"),
    p("[BILD 2: Leere Seite mit zwei Bereichen: links ein grüner Bereich 'Ich mag:', rechts ein roter Bereich 'Ich mag nicht:']"),
    pItalic("Zeichne oder schreibe Speisen in die richtigen Bereiche."),
    pItalic("Mindestens 4 Speisen pro Bereich."),
    empty(),
    h2("Aufgabe 3: Was denkt das Kind?"),
    p("[BILD 3: Kind sitzt vor einem Teller mit Gemüsesuppe und macht ein unglückliches Gesicht]"),
    pItalic("Was denkt das Kind? Schreibe in die Gedankenblase:"),
    p("[GEDANKENBLASE: ________________________________]"),
    empty(),
    p("[BILD 4: Kind sitzt vor einem Teller Pizza und strahlt]"),
    pItalic("Was denkt das Kind? Schreibe in die Gedankenblase:"),
    p("[GEDANKENBLASE: ________________________________]"),
    empty(),
    h2("Aufgabe 4: Klassen-Umfrage"),
    p("[BILD 5: Leere Tabelle für eine Umfrage in der Klasse]"),
    pItalic("Frage 3 Mitschüler: 'Was magst du gern? Was magst du nicht?' Schreibe die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2413, 3613, 3612], rows: [
      new TableRow({ children: [hCell("Name", 2413), hCell("Ich mag...", 3613), hCell("Ich mag nicht...", 3612)] }),
      new TableRow({ children: [dCell("", 2413), dCell("", 3613), dCell("", 3612)] }),
      new TableRow({ children: [dCell("", 2413), dCell("", 3613), dCell("", 3612)] }),
      new TableRow({ children: [dCell("", 2413), dCell("", 3613), dCell("", 3612)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Ich mag / mag nicht Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Daumen hoch oder runter?"),
    p("Abhängig von Bildinhalten. Schlüsselformulierungen:"),
    p("'Das Kind mag Pizza.' / 'Das Kind mag keinen Spinat.'"),
    pItalic("kein/keine/keinen beachten je nach Genus der Speise."),
    empty(),
    h2("Aufgabe 2: Meine Essens-Collage"),
    p("Individuelle Antworten. Bewertung: mögen/nicht mögen korrekt ausgedrückt, Artikel versucht."),
    empty(),
    h2("Aufgabe 3: Was denkt das Kind?"),
    p("Bild 3 (Gemüsesuppe, unglücklich): 'Ich mag keine Suppe!' / 'Suppe schmeckt mir nicht!'"),
    p("Bild 4 (Pizza, glücklich): 'Ich liebe Pizza!' / 'Pizza schmeckt mir sehr gut!'"),
    empty(),
    h2("Aufgabe 4: Klassen-Umfrage"),
    p("Individuelle Antworten. Bewertung: mögen korrekt konjugiert, kein/keine richtig verwendet.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Ich mag / Ich mag nicht");
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
