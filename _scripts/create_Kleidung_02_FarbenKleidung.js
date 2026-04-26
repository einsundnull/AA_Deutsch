"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "06_Kleidung", "02_FarbenKleidung");
const TOPIC = "A1_Kinder_Kleidung_02_FarbenKleidung";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Kleidung — Farben + Kleidung", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeAdjektivTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [1800, 1500, 2800, 3538],
    rows: [
      new TableRow({ children: [hCell("Artikel", 1800), hCell("Endung", 1500), hCell("Beispiel", 2800), hCell("Satz", 3538)] }),
      new TableRow({ children: [dCell("der (mask.)", 1800), dCell("-er", 1500), dCell("ein roter Schal", 2800), dCell("Ich habe einen roten Schal.", 3538)] }),
      new TableRow({ children: [dCell("die (fem.)", 1800), dCell("-e", 1500), dCell("eine blaue Hose", 2800), dCell("Ich trage eine blaue Hose.", 3538)] }),
      new TableRow({ children: [dCell("das (neut.)", 1800), dCell("-es", 1500), dCell("ein grünes T-Shirt", 2800), dCell("Ich habe ein grünes T-Shirt.", 3538)] }),
      new TableRow({ children: [dCell("Plural", 1800), dCell("-e", 1500), dCell("rote Schuhe", 2800), dCell("Meine Schuhe sind rot.", 3538)] })
    ]
  });
}

function makeFarbenTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [1929, 1929, 1928, 1929, 1923],
    rows: [
      new TableRow({ children: [hCell("rot", 1929), hCell("blau", 1929), hCell("gelb", 1928), hCell("grün", 1929), hCell("orange", 1923)] }),
      new TableRow({ children: [dCell("schwarz", 1929), dCell("weiß", 1929), dCell("braun", 1928), dCell("grau", 1929), dCell("rosa / pink", 1923)] }),
      new TableRow({ children: [dCell("lila / violett", 1929), dCell("beige", 1929), dCell("dunkelblau", 1928), dCell("hellgrün", 1929), dCell("türkis", 1923)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Schreibübung"), studentHead(), empty(),
    h2("Adjektivendungen bei Kleidung"),
    p("Wenn du Farben mit Kleidung kombinierst, ändert sich das Adjektiv:"),
    makeAdjektivTable(),
    empty(),
    h2("Farben zur Erinnerung"),
    makeFarbenTable(),
    empty(),
    h2("Aufgabe 1: Richtige Endung einsetzen"),
    p("Ergänze die Adjektivendung (-er / -e / -es)."),
    pItalic("Denke an den Artikel des Kleidungsstücks!"),
    empty(),
    p("Ich trage ein rot_____ T-Shirt.          (das T-Shirt)"),
    p("Ich habe eine blau_____ Jacke.           (die Jacke)"),
    p("Er trägt einen grün_____ Pullover.       (der Pullover)"),
    p("Sie hat ein gelb_____ Kleid.             (das Kleid)"),
    p("Ich suche einen schwarz_____ Schal.      (der Schal)"),
    p("Die weiß_____ Socken sind schön.         (Plural)"),
    p("Er trägt ein grau_____ Hemd.             (das Hemd)"),
    p("Sie hat eine rosa_____ Mütze.            (die Mütze)"),
    empty(),
    h2("Aufgabe 2: Outfit beschreiben"),
    p("Schreibe zu jedem Kleidungsstück einen Satz mit Farbe."),
    pItalic("Beispiel: Meine Hose ist blau. / Ich trage eine blaue Hose."),
    empty(),
    p("Hose:     _______________________________________"),
    p("Jacke:    _______________________________________"),
    p("Schuhe:   _______________________________________"),
    p("T-Shirt:  _______________________________________"),
    p("Mütze:    _______________________________________"),
    empty(),
    h2("Aufgabe 3: Mein Lieblingsoutfit"),
    p("Beschreibe dein Lieblingsoutfit. Schreibe 4–5 Sätze mit Farben."),
    pItalic("Ich trage gern... Mein Lieblingskleidungsstück ist... Es ist..."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Schreibübung"), empty(),
    h2("Aufgabe 1: Richtige Endung einsetzen"),
    p("ein rotes T-Shirt          (das → -es)"),
    p("eine blaue Jacke           (die → -e)"),
    p("einen grünen Pullover      (der → -en  ← Akkusativ!)"),
    p("ein gelbes Kleid           (das → -es)"),
    p("einen schwarzen Schal      (der → -en  ← Akkusativ!)"),
    p("Die weißen Socken          (Plural → -en nach 'die')"),
    p("ein graues Hemd            (das → -es)"),
    p("eine rosa Mütze            (rosa ist undeklinierbar — keine Endung!)"),
    empty(),
    pItalic("Hinweis: Nach 'einen' (Akk. mask.) lautet die Endung -en, nicht -er. Für A1 reicht -er/-e/-es als Grundregel."),
    pItalic("rosa, lila, beige: Diese Farbadjektive werden nicht dekliniert."),
    empty(),
    h2("Aufgabe 2: Outfit beschreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Meine Hose ist blau. / Ich trage eine rote Jacke."),
    empty(),
    h2("Aufgabe 3: Mein Lieblingsoutfit"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: Kleidung + Farbe kombiniert, Adjektivendung versucht, verständliche Sätze.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Leseübung"), studentHead(), empty(),
    h2("Text: Das Kostümfest"),
    p("Heute ist Kostümfest in der Schule. Alle Kinder kommen verkleidet!", 26),
    p("Tim kommt als Pirat. Er trägt eine schwarze Hose und ein weißes Hemd.", 26),
    p("Sein Schal ist rot und sein Hut ist schwarz.", 26),
    p("Sara kommt als Prinzessin. Sie trägt ein langes rosa Kleid.", 26),
    p("Ihre Schuhe sind silbern und ihre Krone ist gelb.", 26),
    p("Leon kommt als Superheld. Er trägt einen blauen Anzug.", 26),
    p("Sein Umhang ist rot und seine Stiefel sind schwarz.", 26),
    p("Die Lehrerin Frau Klein trägt eine grüne Jacke und eine lila Mütze.", 26),
    p("\"Ihr seht alle fantastisch aus!\", sagt sie.", 26),
    p("Am Ende wählt die Klasse das schönste Kostüm. Tim gewinnt!", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Tim kommt als Superheld."),
    p("___ Tims Hemd ist weiß."),
    p("___ Saras Kleid ist blau."),
    p("___ Leons Umhang ist rot."),
    p("___ Frau Klein trägt eine grüne Jacke."),
    p("___ Sara gewinnt das schönste Kostüm."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was trägt Tim?"), ...writeLines(2),
    p("2. Welche Farbe hat Saras Kleid?"), ...writeLines(1),
    p("3. Was sagt Frau Klein?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Farben im Text"),
    p("Finde alle Farben im Text und schreibe sie auf:"), ...writeLines(3),
    empty(),
    h2("Aufgabe 4: Dein Kostüm"),
    p("Als was würdest du gerne kommen? Beschreibe dein Kostüm mit Farben. Schreibe 3 Sätze."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Tim kommt als Pirat (nicht Superheld)."),
    p("R — Tims Hemd ist weiß."),
    p("F — Saras Kleid ist rosa (nicht blau)."),
    p("R — Leons Umhang ist rot."),
    p("R — Frau Klein trägt eine grüne Jacke."),
    p("F — Tim gewinnt das schönste Kostüm (nicht Sara)."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Tim trägt eine schwarze Hose, ein weißes Hemd, einen roten Schal und einen schwarzen Hut."),
    p("2. Saras Kleid ist rosa (lang)."),
    p("3. Frau Klein sagt: \"Ihr seht alle fantastisch aus!\""),
    empty(),
    h2("Aufgabe 3: Farben im Text"),
    p("schwarz, weiß, rot, rosa, silbern, gelb, blau, grün, lila"),
    empty(),
    h2("Aufgabe 4: Dein Kostüm"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [
      new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [
        new Paragraph({ children: [new TextRun({ text: "rotes  •  blaue  •  grünen  •  schwarze  •  weißes  •  gelbe  •  rosa  •  grauen  •  orangefarbene  •  lila  •  braune  •  weiße", size: 24, font: "Arial" })] })
      ]})]})]
    }),
    empty(),
    h2("Teil A: Farbe + Kleidung"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Im Sommer trage ich ein _______ T-Shirt und eine _______ Hose."),
    p("2. Im Winter habe ich einen _______ Pullover und eine _______ Mütze."),
    p("3. Meine Lieblingsfarbe ist Schwarz. Ich trage oft eine _______ Jacke."),
    p("4. Zum Geburtstag bekomme ich ein _______ Kleid — sehr schön!"),
    p("5. Meine Schuhe sind _______ und meine Socken sind _______."),
    empty(),
    h2("Teil B: Outfit-Beschreibung"),
    pItalic("Ergänze die Beschreibung von Ninas Outfit."),
    empty(),
    p("Nina geht heute zur Party. Sie trägt ein _______ Kleid (rosa)."),
    p("Dazu hat sie _______ Schuhe an (weiß)."),
    p("Ihre Tasche ist _______ (lila)."),
    p("Sie trägt auch einen _______ Schal (orange)."),
    p("Ihre Ohrringe sind _______ (gelb) — sehr bunt!"),
    empty(),
    h2("Teil C: Was passt nicht?"),
    pItalic("Streiche das Wort durch, das nicht passt."),
    empty(),
    p("1. Im Winter: (blaue Mütze / rote Socken / kurzes T-Shirt / warme Jacke)"),
    p("2. Im Sommer: (Sandalen / Pullover / T-Shirt / Shorts)"),
    p("3. Blau: (die blaue Hose / das blaue Kleid / der blaue Schal / die blaues Jacke)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 3 Sätze: Beschreibe das Outfit einer Person aus deiner Familie."),
    pItalic("Mein Vater / Meine Mutter / Mein Bruder / Meine Schwester trägt..."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Lückentext"), empty(),
    h2("Teil A: Farbe + Kleidung"),
    p("1. rotes T-Shirt / blaue Hose"),
    p("2. grünen Pullover (oder grauen) / gelbe Mütze (oder lila)"),
    p("3. schwarze Jacke"),
    p("4. rosa Kleid  (rosa bleibt unverändert — undeklinierbar)"),
    p("5. braune Schuhe / weiße Socken  (oder andere sinnvolle Kombination)"),
    empty(),
    h2("Teil B: Outfit-Beschreibung"),
    p("rosa Kleid / weiße Schuhe / lila Tasche / orangefarbenen Schal / gelbe Ohrringe"),
    empty(),
    h2("Teil C: Was passt nicht?"),
    p("1. kurzes T-Shirt (zu warm fürs Sommer-T-Shirt — Winter-Kontext)"),
    p("2. Pullover (zu warm für Sommer)"),
    p("3. die blaues Jacke (falsche Endung — muss 'die blaue Jacke' heißen)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["rot / rote / roter / rotes", "Adjektiv", "Ich trage eine rote Jacke."],
    ["blau / blaue / blauer / blaues", "Adjektiv", "Er hat einen blauen Rucksack."],
    ["grün / grüne / grüner / grünes", "Adjektiv", "Das grüne T-Shirt ist schön."],
    ["schwarz / schwarze...", "Adjektiv", "Sie trägt schwarze Schuhe."],
    ["weiß / weiße...", "Adjektiv", "Meine weißen Socken sind neu."],
    ["gelb / gelbe...", "Adjektiv", "Ich habe eine gelbe Mütze."],
    ["rosa (unverändert)", "Adjektiv", "Sie trägt ein rosa Kleid."],
    ["lila (unverändert)", "Adjektiv", "Mein lila Schal ist warm."],
    ["hell- / dunkel-", "Vorsilbe", "ein hellblaues Hemd / dunkelrote Hose"],
    ["tragen", "Verb (trägt)", "Er trägt eine grüne Jacke."],
    ["anziehen", "Verb (trennbar)", "Ich ziehe das rote T-Shirt an."],
    ["passen", "Verb", "Die blaue Hose passt gut."],
    ["gefallen", "Verb (gefällt)", "Das Kleid gefällt mir sehr."],
    ["kombinieren", "Verb", "Ich kombiniere Blau und Weiß."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort / Form", 3000), hCell("Wortart", 1400), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 3000), dCell(r[1], 1400), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Wortliste"), studentHead(), empty(),
    h2("Farbadjektive + Kleidungsverben"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [3000, 1400, 5238], rows: tableRows }),
    empty(),
    h2("Meine Farb-Übersetzungen"),
    p("Schreibe die Farben in deine Sprache:"),
    empty(),
    p("rot:    _______   blau:   _______   grün:    _______"),
    p("gelb:   _______   orange: _______   schwarz: _______"),
    p("weiß:   _______   braun:  _______   grau:    _______"),
    p("rosa:   _______   lila:   _______   türkis:  _______"),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe auf jede Karte: Farbe + Kleidungsstück. Zeichne es farbig!"),
    p("Beispiel: 'die rote Jacke' → Zeichne eine rote Jacke.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("Grundregel A1: ein roter (mask.) / eine rote (fem.) / ein rotes (neut.) / rote (Pl.)"),
    bullet("Nach 'einen' / 'meinen' (Akk. mask.): Endung -en → einen roten Schal"),
    bullet("rosa, lila, beige, orange: undeklinierbar — keine Endung anfügen"),
    bullet("hell- und dunkel- werden als Vorsilbe angehängt: hellblau, dunkelrot"),
    bullet("tragen hat Vokalwechsel: ich trage / du trägst / er trägt"),
    bullet("gefallen: Das Kleid gefällt mir. (Dativ — für A1 als fester Ausdruck lernen)")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Kleidung beschreiben"),
    pItalic("Person A beschreibt, Person B rät. Keine Farbe nennen — nur beschreiben!"),
    pItalic("Beispiel: A: 'Ich trage etwas. Es ist warm und lang. Es ist ein Kleidungsstück für den Winter.' B: 'Ein Schal?'"),
    empty(),
    p("Benutze diese Sätze:"),
    bullet("Es ist ein/eine/ein _______."),
    bullet("Es ist _______ (Farbe)."),
    bullet("Man trägt es im _______ (Sommer/Winter)."),
    bullet("Es ist für den _______ (Körperteil)."),
    empty(),
    pBold("Rollentausch: Mindestens 3 Runden spielen."),
    empty(),
    h2("Dialog 2: Beim Shoppen"),
    pItalic("Person A = Kunde/Kundin, Person B = Verkäufer/in."),
    empty(),
    p("Kunde:     Entschuldigung! Haben Sie diese Jacke auch in _______?"),
    p("Verkäufer: Ja, wir haben sie in _______, _______ und _______."),
    p("Kunde:     Ich nehme die _______ Jacke, bitte."),
    p("Verkäufer: Sehr gut! Die _______ Jacke kostet _______ Euro."),
    p("Kunde:     Gut. Und haben Sie auch _______ Hosen dazu?"),
    p("Verkäufer: Natürlich! Diese _______ Hose passt sehr gut dazu."),
    p("Kunde:     Super, ich nehme beides. Danke!"),
    empty(),
    pBold("Rollentausch: Sucht andere Kleidungsstücke und Farben."),
    empty(),
    h2("Partnerinterview: Unser Outfit heute"),
    pItalic("Beschreibt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was trägst du heute?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Welche Farbe hat deine Hose / dein Rock?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was ist deine Lieblingsfarbe bei Kleidung?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Welche Farben kombinierst du gern?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Trägst du heute etwas in deiner Lieblingsfarbe?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Wer bin ich?"),
    p("Eine Person denkt an jemanden in der Klasse und beschreibt die Kleidung."),
    p("Die anderen raten, wer es ist."),
    pItalic("Beispiel: 'Diese Person trägt ein blaues T-Shirt und eine schwarze Hose.' → Wer ist das?")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Konversation"), empty(),
    h2("Dialog 1 + 2: Bewertungskriterien"),
    bullet("Kleidungsstücke korrekt auf Deutsch benannt"),
    bullet("Farbadjektive verwendet und korrekt eingesetzt"),
    bullet("Verständlicher Dialog auf Deutsch"),
    bullet("Rollentausch durchgeführt"),
    bullet("Adjektivendung versucht (auch bei Fehlern: Versuch zählt positiv)"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren."),
    p("Fokus: Kleidung + Farbe korrekt kombiniert, auf Deutsch kommuniziert.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Farben + Kleidung — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Outfit beschreiben"),
    p("[BILD 1: Zwei Kinder nebeneinander — Kind A: rotes T-Shirt, blaue Hose, weiße Schuhe. Kind B: gelbes Kleid, braune Stiefel, grüne Mütze]"),
    pItalic("Beschreibe das Outfit von Kind A und Kind B. Schreibe je 3 Sätze."),
    pBold("Kind A:"),
    ...writeLines(3),
    pBold("Kind B:"),
    ...writeLines(3),
    empty(),
    h2("Aufgabe 2: Farben einzeichnen"),
    p("[BILD 2: Umrisszeichnung eines T-Shirts, einer Hose, einer Jacke, eines Schals — alle ohne Farbe]"),
    pItalic("Male die Kleidungsstücke an und schreibe darunter: 'das rote T-Shirt' usw."),
    empty(),
    h2("Aufgabe 3: Was passt zusammen?"),
    p("[BILD 3: 5 Oberteile (verschiedene Farben) links und 5 Hosen/Röcke rechts. Aufgabe: Welche Kombination sieht gut aus?]"),
    pItalic("Verbinde die Kleidungsstücke, die gut zusammenpassen. Schreibe dann 2 Sätze:"),
    pItalic("Beispiel: Das blaue T-Shirt passt gut zur weißen Hose."),
    ...writeLines(2),
    empty(),
    h2("Aufgabe 4: Suche im Bild"),
    p("[BILD 4: Klassenzimmer mit 8 Schülern — jeder trägt unterschiedliche farbige Kleidung]"),
    pItalic("Finde und schreibe auf:"),
    p("Wer trägt etwas Rotes?   _______________________________"),
    p("Wer trägt etwas Blaues?  _______________________________"),
    p("Wer trägt eine Mütze?    _______________________________"),
    p("Welche Farben siehst du? _______________________________"),
    empty(),
    h2("Aufgabe 5: Zeichne dein Outfit"),
    p("[BILD 5: Leere Umrisszeichnung einer Person]"),
    pItalic("Zeichne dein heutiges Outfit auf die Person und beschrifte alles mit Farbe + Kleidungsstück."),
    pItalic("Beispiel: die rote Jacke / das blaue T-Shirt")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Farben + Kleidung Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Outfit beschreiben"),
    p("Kind A: Es trägt ein rotes T-Shirt. / Es hat eine blaue Hose an. / Seine Schuhe sind weiß."),
    p("Kind B: Es trägt ein gelbes Kleid. / Es hat braune Stiefel an. / Es trägt eine grüne Mütze."),
    pItalic("Adjektivendungen überprüfen: rotes (neutral), blaue (feminin), weiße (Plural)"),
    empty(),
    h2("Aufgabe 2: Farben einzeichnen"),
    p("Individuelle Antworten — Bewertung: Farbe + Artikel + Kleidungsstück korrekt benannt."),
    empty(),
    h2("Aufgabe 3: Was passt zusammen?"),
    p("Individuelle Antworten akzeptieren. Sätze mit 'passt gut zu' beachten."),
    empty(),
    h2("Aufgabe 4: Suche im Bild"),
    p("Antworten abhängig von eingefügtem Bild."),
    empty(),
    h2("Aufgabe 5: Zeichne dein Outfit"),
    p("Individuelle Zeichnungen — Bewertung: mindestens 3 Kleidungsstücke benannt, Farben auf Deutsch angegeben.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Farben + Kleidung kombinieren");
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
