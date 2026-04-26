"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "06_Kleidung", "01_Kleidungsstuecke");
const TOPIC = "A1_Kinder_Kleidung_01_Kleidungsstuecke";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Kleidung — Kleidungsstücke", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeKleidungTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2200, 1200, 2200, 4038],
    rows: [
      new TableRow({ children: [hCell("Kleidungsstück", 2200), hCell("Artikel", 1200), hCell("Plural", 2200), hCell("Beispielsatz", 4038)] }),
      new TableRow({ children: [dCell("T-Shirt", 2200), dCell("das", 1200), dCell("die T-Shirts", 2200), dCell("Ich trage ein T-Shirt.", 4038)] }),
      new TableRow({ children: [dCell("Hose", 2200), dCell("die", 1200), dCell("die Hosen", 2200), dCell("Meine Hose ist blau.", 4038)] }),
      new TableRow({ children: [dCell("Jacke", 2200), dCell("die", 1200), dCell("die Jacken", 2200), dCell("Ich brauche eine Jacke.", 4038)] }),
      new TableRow({ children: [dCell("Schuh", 2200), dCell("der", 1200), dCell("die Schuhe", 2200), dCell("Meine Schuhe sind neu.", 4038)] }),
      new TableRow({ children: [dCell("Socke", 2200), dCell("die", 1200), dCell("die Socken", 2200), dCell("Ich habe rote Socken.", 4038)] }),
      new TableRow({ children: [dCell("Kleid", 2200), dCell("das", 1200), dCell("die Kleider", 2200), dCell("Das Kleid ist schön.", 4038)] }),
      new TableRow({ children: [dCell("Rock", 2200), dCell("der", 1200), dCell("die Röcke", 2200), dCell("Sie trägt einen Rock.", 4038)] }),
      new TableRow({ children: [dCell("Pullover", 2200), dCell("der", 1200), dCell("die Pullover", 2200), dCell("Der Pullover ist warm.", 4038)] }),
      new TableRow({ children: [dCell("Mütze", 2200), dCell("die", 1200), dCell("die Mützen", 2200), dCell("Im Winter trage ich eine Mütze.", 4038)] }),
      new TableRow({ children: [dCell("Schal", 2200), dCell("der", 1200), dCell("die Schals", 2200), dCell("Mein Schal ist gelb.", 4038)] }),
      new TableRow({ children: [dCell("Handschuh", 2200), dCell("der", 1200), dCell("die Handschuhe", 2200), dCell("Ich habe warme Handschuhe.", 4038)] }),
      new TableRow({ children: [dCell("Stiefel", 2200), dCell("der", 1200), dCell("die Stiefel", 2200), dCell("Meine Stiefel sind braun.", 4038)] }),
      new TableRow({ children: [dCell("Hemd", 2200), dCell("das", 1200), dCell("die Hemden", 2200), dCell("Er trägt ein weißes Hemd.", 4038)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Schreibübung"), studentHead(), empty(),
    h2("Kleidungsstücke auf Deutsch"), p("Lerne diese Wörter:"), makeKleidungTable(), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("Schreibe den richtigen Artikel vor das Kleidungsstück."),
    pItalic("der / die / das"),
    empty(),
    p("_______ T-Shirt       _______ Hose        _______ Jacke"),
    p("_______ Schuh         _______ Socke        _______ Kleid"),
    p("_______ Rock          _______ Pullover     _______ Mütze"),
    p("_______ Schal         _______ Handschuh    _______ Stiefel"),
    empty(),
    h2("Aufgabe 2: Was trägst du?"),
    p("Schreibe Sätze. Beispiel: Ich trage eine Jacke."),
    pItalic("Ich trage... / Mein... ist... / Meine... sind..."),
    empty(),
    p("Heute trage ich: _______________________"),
    p("Im Winter trage ich: _______________________"),
    p("Im Sommer trage ich: _______________________"),
    p("In der Schule trage ich: _______________________"),
    empty(),
    h2("Aufgabe 3: Sommer oder Winter?"),
    p("Schreibe die Kleidungsstücke in die richtige Spalte."),
    pItalic("T-Shirt / Mütze / Schal / Shorts / Stiefel / Kleid / Handschuhe / Pullover / Sandalen / Jacke"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Sommer", 4819), hCell("Winter", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe deine Lieblingskleidung! Schreibe 3–5 Sätze."),
    pItalic("Mein Lieblingskleidungsstück ist... Es ist... Ich trage es gern, wenn..."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Schreibübung"), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("das T-Shirt     die Hose       die Jacke"),
    p("der Schuh       die Socke      das Kleid"),
    p("der Rock        der Pullover   die Mütze"),
    p("der Schal       der Handschuh  der Stiefel"),
    empty(),
    pItalic("Merkhilfe: die-Wörter: Hose, Jacke, Socke, Mütze — alle auf -e"),
    pItalic("das-Wörter: T-Shirt, Kleid, Hemd — oft neutrale Kleidung"),
    empty(),
    h2("Aufgabe 2: Was trägst du?"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Heute trage ich eine Hose und ein T-Shirt."),
    p("Im Winter trage ich eine Jacke, Stiefel und eine Mütze."),
    empty(),
    h2("Aufgabe 3: Sommer oder Winter?"),
    p("Sommer: T-Shirt, Shorts, Kleid, Sandalen (und ggf. leichte Jacke)"),
    p("Winter: Mütze, Schal, Stiefel, Handschuhe, Pullover, Jacke"),
    pItalic("Jacke kann für beide Jahreszeiten akzeptiert werden."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: Kleidungsstück mit Artikel, Farbe/Eigenschaft genannt, verständliche Sätze.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Leseübung"), studentHead(), empty(),
    h2("Text: Der erste Schultag"),
    p("Heute ist Emmas erster Schultag. Sie ist sehr aufgeregt!", 26),
    p("Morgens steht Emma vor dem Schrank. Was soll sie anziehen?", 26),
    p("Sie wählt ein rotes Kleid mit weißen Punkten.", 26),
    p("Dazu trägt sie weiße Socken und schwarze Schuhe.", 26),
    p("Ihre Mutter sagt: \"Es ist heute kalt. Nimm eine Jacke mit!\"", 26),
    p("Emma nimmt ihre blaue Jacke und ihren grünen Rucksack.", 26),
    p("In der Schule sieht Emma ihre neue Freundin Mia.", 26),
    p("Mia trägt eine gelbe Hose und ein weißes T-Shirt.", 26),
    p("\"Dein Kleid ist sehr schön!\", sagt Mia.", 26),
    p("\"Danke! Deine Hose gefällt mir auch!\", sagt Emma.", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Heute ist Emmas erster Schultag."),
    p("___ Emma trägt eine blaue Hose."),
    p("___ Emmas Socken sind weiß."),
    p("___ Es ist heute warm."),
    p("___ Emmas Rucksack ist grün."),
    p("___ Mia trägt ein gelbes Kleid."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was trägt Emma heute?"), ...writeLines(2),
    p("2. Was sagt Emmas Mutter?"), ...writeLines(2),
    p("3. Was trägt Mia?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Kleidung im Text"),
    p("Finde alle Kleidungsstücke im Text. Schreibe sie mit Artikel und Farbe auf:"),
    ...writeLines(5),
    empty(),
    h2("Aufgabe 4: Deine Kleidung"),
    p("Was trägst du heute? Schreibe 2–3 Sätze."),
    pItalic("Ich trage... Meine... ist/sind..."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("R — Heute ist Emmas erster Schultag."),
    p("F — Emma trägt ein rotes Kleid (keine blaue Hose)."),
    p("R — Emmas Socken sind weiß."),
    p("F — Es ist heute kalt (nicht warm)."),
    p("R — Emmas Rucksack ist grün."),
    p("F — Mia trägt eine gelbe Hose (kein gelbes Kleid)."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Emma trägt ein rotes Kleid mit weißen Punkten, weiße Socken, schwarze Schuhe und eine blaue Jacke."),
    p("2. Emmas Mutter sagt, es ist kalt, und Emma soll eine Jacke mitnehmen."),
    p("3. Mia trägt eine gelbe Hose und ein weißes T-Shirt."),
    empty(),
    h2("Aufgabe 3: Kleidung im Text"),
    p("das rote Kleid (mit weißen Punkten) / weiße Socken / schwarze Schuhe / blaue Jacke / gelbe Hose / weißes T-Shirt"),
    empty(),
    h2("Aufgabe 4: Deine Kleidung"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [
      new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [
        new Paragraph({ children: [new TextRun({ text: "Jacke  •  Hose  •  Schuhe  •  Pullover  •  Mütze  •  Kleid  •  Socken  •  Schal  •  T-Shirt  •  Stiefel  •  Handschuhe  •  Rock", size: 24, font: "Arial" })] })
      ]})]})]
    }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Im Sommer trage ich ein _______ und eine kurze _______."),
    p("2. Im Winter brauche ich einen _______ und eine _______."),
    p("3. Meine Füße sind kalt — ich brauche warme _______."),
    p("4. Es regnet. Ich ziehe meine _______ an."),
    p("5. Das Mädchen trägt ein schönes rotes _______ zur Party."),
    p("6. Meine _______ sind zu klein. Ich brauche neue."),
    empty(),
    h2("Teil B: Morgenroutine"),
    pItalic("Emma zieht sich an. Ergänze den Text."),
    empty(),
    p("Emma steht auf. Zuerst zieht sie _______ an (für die Füße)."),
    p("Dann zieht sie eine _______ an — es ist warm heute."),
    p("Sie nimmt auch einen _______ aus dem Schrank."),
    p("Draußen ist es kalt, also braucht sie noch einen _______"),
    p("und _______ für ihre Hände."),
    p("Zuletzt zieht sie ihre _______ an und geht zur Schule."),
    empty(),
    h2("Teil C: Was passt zusammen?"),
    pItalic("Wähle das richtige Wort."),
    empty(),
    p("Im Sommer trage ich (Stiefel / Sandalen)."),
    p("Im Winter trage ich eine (Mütze / Badekappe)."),
    p("Zum Schlafen trage ich einen (Pyjama / Pullover)."),
    p("Bei Regen ziehe ich (Gummistiefel / Sandalen) an."),
    p("Zum Sport trage ich (Sportschuhe / Stiefel)."),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 Sätze: Was trägst du heute?"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. T-Shirt / Hose"),
    p("2. Pullover / Mütze  (oder: Schal / Jacke — varianten akzeptieren)"),
    p("3. Socken"),
    p("4. Jacke  (oder: Stiefel / Schuhe — varianten akzeptieren)"),
    p("5. Kleid"),
    p("6. Schuhe  (oder: Stiefel)"),
    empty(),
    h2("Teil B: Morgenroutine"),
    p("Socken / T-Shirt (oder Hose) / Pullover / Schal / Handschuhe / Schuhe (oder Stiefel)"),
    pItalic("Sinnvolle Varianten akzeptieren."),
    empty(),
    h2("Teil C: Was passt zusammen?"),
    p("Sandalen / Mütze / Pyjama / Gummistiefel / Sportschuhe"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["das T-Shirt", "Nomen (neutral)", "Ich trage ein T-Shirt."],
    ["die Hose", "Nomen (feminin)", "Meine Hose ist blau."],
    ["die Jacke", "Nomen (feminin)", "Ich brauche eine warme Jacke."],
    ["der Schuh / die Schuhe", "Nomen (maskulin)", "Meine Schuhe sind neu."],
    ["die Socke / die Socken", "Nomen (feminin)", "Ich habe rote Socken an."],
    ["das Kleid", "Nomen (neutral)", "Das Kleid ist sehr schön."],
    ["der Rock", "Nomen (maskulin)", "Sie trägt einen langen Rock."],
    ["der Pullover", "Nomen (maskulin)", "Der Pullover ist warm."],
    ["die Mütze", "Nomen (feminin)", "Im Winter trage ich eine Mütze."],
    ["der Schal", "Nomen (maskulin)", "Mein Schal ist rot und blau."],
    ["der Handschuh", "Nomen (maskulin)", "Ich habe meine Handschuhe verloren."],
    ["der Stiefel", "Nomen (maskulin)", "Meine Stiefel sind wasserdicht."],
    ["anziehen", "Verb (trennbar)", "Ich ziehe meine Jacke an."],
    ["tragen", "Verb", "Er trägt ein weißes Hemd."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2800), hCell("Wortart", 1600), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1600), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Wortliste"), studentHead(), empty(),
    h2("Kleidungsstücke — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1600, 5238], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.slice(0, 12).map(r => p(`${r[0].split("/")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe jedes Kleidungsstück auf eine Karte. Zeichne es dazu!"),
    p("Extra-Tipp: Schreibe auch die Farbe dazu, z. B. 'die rote Jacke'.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("die-Wörter (feminin): Hose, Jacke, Socke, Mütze — alle enden auf -e"),
    bullet("das-Wörter (neutral): T-Shirt, Kleid, Hemd"),
    bullet("der-Wörter (maskulin): Schuh, Rock, Pullover, Schal, Handschuh, Stiefel"),
    bullet("anziehen ist trennbar: Ich ziehe die Jacke an. (nicht: Ich anziehe)"),
    bullet("tragen hat Vokalwechsel: ich trage / du trägst / er trägt"),
    bullet("Plural Besonderheiten: der Rock → die Röcke (Umlaut), die Hose → die Hosen")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Beim Einkaufen"),
    pItalic("Person A = Verkäufer/in, Person B = Kunde/Kundin. Fülle die Lücken aus."),
    empty(),
    p("Verkäufer: Guten Tag! Kann ich Ihnen helfen?"),
    p("Kunde:     Ja, ich suche eine _______."),
    p("Verkäufer: Welche _______ möchten Sie? Blau, rot oder grün?"),
    p("Kunde:     Ich möchte eine _______ Jacke, bitte."),
    p("Verkäufer: Hier ist eine schöne _______. Wie gefällt sie Ihnen?"),
    p("Kunde:     Sie ist sehr _______! Was kostet sie?"),
    p("Verkäufer: Sie kostet _______ Euro."),
    p("Kunde:     Gut, ich nehme sie. Danke!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen und sucht ein anderes Kleidungsstück."),
    empty(),
    h2("Dialog 2: Was ziehst du an?"),
    pItalic("Person A fragt, Person B antwortet."),
    empty(),
    p("A: Was ziehst du heute an?"),
    p("B: Ich ziehe _______ und _______ an."),
    p("A: Welche Farbe hat deine _______?"),
    p("B: Meine _______ ist _______."),
    p("A: Das klingt schön! Hast du auch eine _______?"),
    p("B: Ja, meine _______ ist _______."),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Deine Kleidung"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du am liebsten?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du im Winter?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist deine Lieblingsfarbe bei Kleidung?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du zum Sport?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du heute?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Kleidungs-Detektiv"),
    p("Eine Person denkt an ein Kleidungsstück von jemandem in der Klasse."),
    p("Die anderen stellen Ja/Nein-Fragen:"),
    bullet("Ist es blau?"),
    bullet("Ist es eine Jacke?"),
    bullet("Trägt es ein Mädchen?"),
    p("Wer das Kleidungsstück errät, ist als nächstes dran!")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Konversation"), empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("Jacke (oder ein anderes Kleidungsstück) / Farbe / blaue (oder andere Farbe) / Jacke / schön / 20 (beliebige Zahl)"),
    pItalic("Individuelle Kleidungsstück- und Farbwahl akzeptieren."),
    empty(),
    h2("Dialog 2: Mögliche Lösungen"),
    p("Individuelle Antworten — beliebige Kleidungsstücke und Farben akzeptieren."),
    empty(),
    h2("Bewertungskriterien Konversation"),
    bullet("Kleidungsstücke korrekt auf Deutsch benannt"),
    bullet("Artikel beachtet (ein/eine/einen je nach Genus)"),
    bullet("Farben korrekt kombiniert"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Kleidungsvokabular korrekt auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Kleidungsstücke — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Kleidung benennen"),
    p("[BILD 1: 8 einzelne Kleidungsstücke gezeichnet: T-Shirt, Hose, Jacke, Schuhe, Mütze, Kleid, Pullover, Schal — nummeriert 1–8]"),
    pItalic("Schreibe den deutschen Namen mit Artikel unter jedes Bild."),
    p("1. _______ 2. _______ 3. _______ 4. _______"),
    p("5. _______ 6. _______ 7. _______ 8. _______"),
    empty(),
    h2("Aufgabe 2: Was trägt die Person?"),
    p("[BILD 2: Ein Kind ist von vorne zu sehen. Es trägt: rotes T-Shirt, blaue Hose, weiße Socken, grüne Schuhe, gelbe Mütze]"),
    pItalic("Beschreibe die Kleidung der Person. Schreibe 4–5 Sätze."),
    pItalic("Beispiel: Das Kind trägt ein rotes T-Shirt."),
    ...writeLines(5),
    empty(),
    h2("Aufgabe 3: Sommer oder Winter?"),
    p("[BILD 3: Linke Seite — Sommerbild (Sonne, Strand). Rechte Seite — Winterbild (Schnee, Kälte). 8 Kleidungsstücke in der Mitte]"),
    pItalic("Schreibe jedes Kleidungsstück in die richtige Spalte (Sommer / Winter)."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Sommer", 4819), hCell("Winter", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Verbinden"),
    p("[BILD 4: Linke Spalte — 6 Bilder von Kleidungsstücken. Rechte Spalte — 6 deutsche Wörter gemischt]"),
    pItalic("Verbinde jedes Bild mit dem richtigen deutschen Wort mit einer Linie."),
    empty(),
    h2("Aufgabe 5: Zeichnen und beschriften"),
    p("[BILD 5: Leere Umrisszeichnung einer Person]"),
    pItalic("Zeichne Kleidung auf die Person und beschrifte alles auf Deutsch."),
    pItalic("Schreibe auch die Farben dazu: z. B. 'die rote Jacke'")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Kleidungsstücke Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Kleidung benennen"),
    p("Erwartete Antworten mit Artikel: das T-Shirt / die Hose / die Jacke / der Schuh /"),
    p("die Mütze / das Kleid / der Pullover / der Schal"),
    empty(),
    h2("Aufgabe 2: Was trägt die Person?"),
    p("Musterlösungen: Das Kind trägt ein rotes T-Shirt. / Es trägt eine blaue Hose."),
    p("Es hat weiße Socken an. / Seine Schuhe sind grün. / Es trägt eine gelbe Mütze."),
    pItalic("Artikel und Adjektivendungen bei Korrekturen beachten."),
    empty(),
    h2("Aufgabe 3: Sommer oder Winter?"),
    p("Sommer: T-Shirt, Shorts/Kleid, Sandalen, leichte Hose"),
    p("Winter: Mütze, Schal, Handschuhe, Pullover, Stiefel, Jacke"),
    empty(),
    h2("Aufgabe 4: Verbinden"),
    p("Antworten abhängig von Bildanordnung."),
    empty(),
    h2("Aufgabe 5: Zeichnen und beschriften"),
    p("Individuelle Antworten. Bewertung: Kleidungsstücke korrekt benannt, Artikel vorhanden, Farben auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Kleidungsstücke");
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
