"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "07_EssenTrinken", "01_Lieblingsessen");
const TOPIC = "A1_Kinder_EssenTrinken_01_Lieblingsessen";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Essen & Trinken — Lieblingsessen", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeEssenTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2200, 1200, 2200, 4038],
    rows: [
      new TableRow({ children: [hCell("Essen", 2200), hCell("Artikel", 1200), hCell("Plural", 2200), hCell("Beispielsatz", 4038)] }),
      new TableRow({ children: [dCell("Pizza", 2200), dCell("die", 1200), dCell("die Pizzen", 2200), dCell("Ich esse gern Pizza.", 4038)] }),
      new TableRow({ children: [dCell("Nudeln", 2200), dCell("die (Pl.)", 1200), dCell("die Nudeln", 2200), dCell("Nudeln sind mein Lieblingsessen.", 4038)] }),
      new TableRow({ children: [dCell("Hamburger", 2200), dCell("der", 1200), dCell("die Hamburger", 2200), dCell("Der Hamburger schmeckt lecker.", 4038)] }),
      new TableRow({ children: [dCell("Suppe", 2200), dCell("die", 1200), dCell("die Suppen", 2200), dCell("Die Suppe ist heiß.", 4038)] }),
      new TableRow({ children: [dCell("Reis", 2200), dCell("der", 1200), dCell("— (kein Plural)", 2200), dCell("Ich esse Reis mit Gemüse.", 4038)] }),
      new TableRow({ children: [dCell("Brot", 2200), dCell("das", 1200), dCell("die Brote", 2200), dCell("Zum Frühstück esse ich Brot.", 4038)] }),
      new TableRow({ children: [dCell("Salat", 2200), dCell("der", 1200), dCell("die Salate", 2200), dCell("Der Salat ist frisch.", 4038)] }),
      new TableRow({ children: [dCell("Obst", 2200), dCell("das", 1200), dCell("— (kein Plural)", 2200), dCell("Ich esse jeden Tag Obst.", 4038)] }),
      new TableRow({ children: [dCell("Gemüse", 2200), dCell("das", 1200), dCell("— (kein Plural)", 2200), dCell("Gemüse ist gesund.", 4038)] }),
      new TableRow({ children: [dCell("Fleisch", 2200), dCell("das", 1200), dCell("— (kein Plural)", 2200), dCell("Ich esse kein Fleisch.", 4038)] }),
      new TableRow({ children: [dCell("Fisch", 2200), dCell("der", 1200), dCell("die Fische", 2200), dCell("Fisch ist gesund.", 4038)] }),
      new TableRow({ children: [dCell("Kuchen", 2200), dCell("der", 1200), dCell("die Kuchen", 2200), dCell("Der Kuchen schmeckt süß.", 4038)] }),
      new TableRow({ children: [dCell("Eis", 2200), dCell("das", 1200), dCell("— (kein Plural)", 2200), dCell("Im Sommer esse ich Eis.", 4038)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Schreibübung"), studentHead(), empty(),
    h2("Essen auf Deutsch"), p("Lerne diese Wörter:"), makeEssenTable(), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("Schreibe den richtigen Artikel."), pItalic("der / die / das"),
    empty(),
    p("_______ Pizza        _______ Hamburger    _______ Suppe"),
    p("_______ Reis         _______ Brot         _______ Salat"),
    p("_______ Obst         _______ Gemüse       _______ Fleisch"),
    p("_______ Fisch        _______ Kuchen       _______ Eis"),
    empty(),
    h2("Aufgabe 2: Mein Lieblingsessen"),
    p("Beantworte die Fragen. Schreibe ganze Sätze."),
    empty(),
    p("Was ist dein Lieblingsessen?"), ...writeLines(1),
    p("Was isst du nicht gern?"), ...writeLines(1),
    p("Was isst du zum Mittagessen?"), ...writeLines(1),
    p("Was isst du als Snack?"), ...writeLines(1),
    empty(),
    h2("Aufgabe 3: Gesund oder ungesund?"),
    p("Schreibe jedes Essen in die richtige Spalte."),
    pItalic("Pizza • Salat • Gemüse • Hamburger • Obst • Kuchen • Fisch • Eis • Reis • Suppe"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Gesund", 4819), hCell("Eher ungesund", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3–5 Sätze über dein Lieblingsessen."),
    pItalic("Mein Lieblingsessen ist... Es schmeckt... Ich esse es gern, weil..."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Schreibübung"), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("die Pizza       der Hamburger    die Suppe"),
    p("der Reis        das Brot         der Salat"),
    p("das Obst        das Gemüse       das Fleisch"),
    p("der Fisch       der Kuchen       das Eis"),
    empty(),
    pItalic("Merkhilfe: das-Wörter oft bei Sammelbegriffen: das Obst, das Gemüse, das Fleisch, das Eis"),
    empty(),
    h2("Aufgabe 2: Mein Lieblingsessen"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Mein Lieblingsessen ist Pizza. / Ich esse nicht gern Gemüse."),
    empty(),
    h2("Aufgabe 3: Gesund oder ungesund?"),
    p("Gesund: Salat, Gemüse, Obst, Fisch, Reis, Suppe"),
    p("Eher ungesund: Pizza, Hamburger, Kuchen, Eis"),
    pItalic("Diskussionsgrundlage: Pizza und Suppe können je nach Zubereitung gesund sein — Diskussion akzeptieren."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren."),
    p("Kriterien: Essen korrekt benannt, Artikel versucht, verständliche Sätze.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Leseübung"), studentHead(), empty(),
    h2("Text: Was essen wir heute?"),
    p("Heute ist Samstag. Familie Braun isst zusammen zu Mittag.", 26),
    p("Der Vater kocht. Er fragt: \"Was wollt ihr heute essen?\"", 26),
    p("Die Tochter Nina (10 Jahre) sagt: \"Ich möchte Pizza!\"", 26),
    p("Der Sohn Felix (8 Jahre) sagt: \"Nein! Ich will Nudeln!\"", 26),
    p("Die Mutter lacht: \"Wie wäre es mit Nudeln mit Tomatensauce?\"", 26),
    p("\"Das ist fast wie Pizza!\", sagt der Vater.", 26),
    p("Nina und Felix sind einverstanden.", 26),
    p("Nach dem Essen gibt es Obst: Äpfel, Bananen und Erdbeeren.", 26),
    p("\"Das Essen war sehr lecker!\", sagt Felix.", 26),
    p("\"Mein Lieblingsessen ist Eis!\", ruft Nina. \"Können wir auch Eis haben?\"", 26),
    p("Der Vater lacht. \"Nur ein kleines Eis — ihr habt schon Obst gegessen!\"", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Heute ist Sonntag."),
    p("___ Der Vater kocht das Mittagessen."),
    p("___ Nina möchte Nudeln."),
    p("___ Sie essen Nudeln mit Tomatensauce."),
    p("___ Nach dem Essen gibt es Kuchen."),
    p("___ Ninas Lieblingsessen ist Eis."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was möchte Felix essen?"), ...writeLines(1),
    p("2. Was gibt es nach dem Essen?"), ...writeLines(1),
    p("3. Warum darf Nina nur ein kleines Eis haben?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Essen im Text"),
    p("Finde alle Speisen im Text. Schreibe sie mit Artikel auf:"), ...writeLines(4),
    empty(),
    h2("Aufgabe 4: Deine Familie"),
    p("Was isst deine Familie gern? Schreibe 2–3 Sätze."),
    pItalic("Meine Familie isst gern... Mein Lieblingsessen ist..."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Heute ist Samstag (nicht Sonntag)."),
    p("R — Der Vater kocht das Mittagessen."),
    p("F — Nina möchte Pizza (Felix möchte Nudeln)."),
    p("R — Sie essen Nudeln mit Tomatensauce."),
    p("F — Nach dem Essen gibt es Obst (nicht Kuchen)."),
    p("R — Ninas Lieblingsessen ist Eis."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Felix möchte Nudeln."),
    p("2. Nach dem Essen gibt es Obst: Äpfel, Bananen und Erdbeeren."),
    p("3. Nina darf nur ein kleines Eis haben, weil sie schon Obst gegessen hat."),
    empty(),
    h2("Aufgabe 3: Essen im Text"),
    p("die Pizza / die Nudeln / die Tomatensauce / das Obst / der Apfel / die Banane / die Erdbeere / das Eis"),
    empty(),
    h2("Aufgabe 4: Deine Familie"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "Pizza  •  Nudeln  •  Salat  •  Obst  •  Suppe  •  Brot  •  Kuchen  •  Eis  •  Reis  •  Fleisch  •  Fisch  •  lecker  •  gesund  •  Lieblingsessen", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Ich esse gern _______. Es ist rund und hat Käse drauf."),
    p("2. Zum Frühstück esse ich _______ mit Butter und Marmelade."),
    p("3. Im Sommer esse ich gern _______. Es ist kalt und süß."),
    p("4. _______ und Gemüse sind sehr _______ für den Körper."),
    p("5. Mein _______ sind _______. Ich esse sie fast jeden Tag."),
    p("6. Die _______ ist heiß. Ich warte, bis sie kalt ist."),
    empty(),
    h2("Teil B: Was esse ich wann?"),
    pItalic("Ergänze den Tagesplan mit passenden Speisen."),
    empty(),
    p("Morgens zum Frühstück esse ich _______ und trinke Milch."),
    p("In der Schule habe ich einen Apfel dabei — das ist _______."),
    p("Mittags esse ich _______ mit Tomatensauce."),
    p("Nachmittags gibt es ein Stück _______ — heute ist Geburtstag!"),
    p("Abends macht Mama eine _______ aus Karotten."),
    empty(),
    h2("Teil C: Richtig oder falsch?"),
    pItalic("Korrigiere den Fehler, wenn der Satz falsch ist."),
    empty(),
    p("1. Pizza ist ein Getränk.                → _______________________"),
    p("2. Obst und Gemüse sind gesund.          → _______________________"),
    p("3. Eis ist heiß.                         → _______________________"),
    p("4. Nudeln isst man mit einer Gabel.      → _______________________"),
    p("5. Salat ist ein süßes Dessert.          → _______________________"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 Sätze: Was ist dein Lieblingsessen und warum?"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. Pizza"), p("2. Brot"), p("3. Eis"),
    p("4. Obst / gesund"), p("5. Lieblingsessen / Nudeln (oder anderes Essen)"), p("6. Suppe"),
    empty(),
    h2("Teil B: Was esse ich wann?"),
    p("Brot (oder Obst) / gesund / Nudeln / Kuchen / Suppe"),
    pItalic("Sinnvolle Alternativen akzeptieren."),
    empty(),
    h2("Teil C: Richtig oder falsch?"),
    p("1. Falsch — Pizza ist ein Essen / eine Speise (kein Getränk)."),
    p("2. Richtig."),
    p("3. Falsch — Eis ist kalt."),
    p("4. Richtig."),
    p("5. Falsch — Salat ist eine Beilage / ein Gemüsegericht (kein süßes Dessert)."),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["die Pizza", "Nomen (feminin)", "Ich esse gern Pizza mit Käse."],
    ["die Nudeln (Pl.)", "Nomen (Plural)", "Nudeln sind mein Lieblingsessen."],
    ["der Hamburger", "Nomen (maskulin)", "Der Hamburger schmeckt lecker."],
    ["die Suppe", "Nomen (feminin)", "Die Suppe ist heiß und lecker."],
    ["der Reis", "Nomen (maskulin)", "Ich esse Reis mit Gemüse."],
    ["das Brot", "Nomen (neutral)", "Zum Frühstück esse ich Brot."],
    ["der Salat", "Nomen (maskulin)", "Der Salat ist frisch und gesund."],
    ["das Obst", "Nomen (neutral, kein Pl.)", "Obst ist sehr gesund."],
    ["das Gemüse", "Nomen (neutral, kein Pl.)", "Ich esse jeden Tag Gemüse."],
    ["der Kuchen", "Nomen (maskulin)", "Der Kuchen schmeckt süß."],
    ["das Eis", "Nomen (neutral, kein Pl.)", "Im Sommer esse ich gern Eis."],
    ["lecker", "Adjektiv", "Die Pizza ist sehr lecker!"],
    ["gesund", "Adjektiv", "Obst und Gemüse sind gesund."],
    ["das Lieblingsessen", "Nomen (neutral)", "Was ist dein Lieblingsessen?"]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2800), hCell("Wortart", 1800), hCell("Beispielsatz", 5038)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1800), dCell(r[2], 5038)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Wortliste"), studentHead(), empty(),
    h2("Essen — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1800, 5038], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.slice(0, 12).map(r => p(`${r[0].split("(")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe jede Speise auf eine Karte und zeichne sie. Artikel nicht vergessen!"),
    p("Extra-Tipp: Schreibe auch 'lecker' oder 'nicht lecker' auf die Rückseite.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("Sammelsubstantive ohne Plural: das Obst, das Gemüse, das Fleisch, das Eis, der Reis"),
    bullet("Nudeln: nur Plural, kein Singular im Alltagsgebrauch"),
    bullet("essen (isst): ich esse / du isst / er isst — unregelmäßiges Verb"),
    bullet("schmecken: Die Pizza schmeckt lecker. (Verb für Geschmack)"),
    bullet("mögen: Ich mag Pizza. / Ich mag kein Gemüse. — für UP 04 vertiefen")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Im Restaurant"),
    pItalic("Person A = Kellner/in, Person B = Gast. Fülle die Lücken aus."),
    empty(),
    p("Kellner:  Guten Appetit! Was möchten Sie bestellen?"),
    p("Gast:     Ich möchte _______, bitte."),
    p("Kellner:  Gerne. Und was trinken Sie dazu?"),
    p("Gast:     Ich nehme _______, bitte."),
    p("Kellner:  Sehr gut. Möchten Sie auch ein Dessert?"),
    p("Gast:     Ja, ich nehme _______."),
    p("Kellner:  Hat es Ihnen geschmeckt?"),
    p("Gast:     Ja, es war sehr _______! Danke."),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen. Wählt andere Speisen."),
    empty(),
    h2("Dialog 2: Was ist dein Lieblingsessen?"),
    pItalic("Person A fragt, Person B antwortet."),
    empty(),
    p("A: Was ist dein Lieblingsessen?"),
    p("B: Mein Lieblingsessen ist _______."),
    p("A: Warum magst du _______ so gern?"),
    p("B: Weil es sehr _______ schmeckt!"),
    p("A: Isst du auch gern _______?"),
    p("B: Nein, _______ mag ich nicht. Ich esse lieber _______."),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Essen"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingsessen?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was isst du nicht gern?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was isst du zum Frühstück?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was isst du am liebsten im Sommer?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was kochst du gern? (oder: Was kocht deine Familie gern?)", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Ich packe mein Picknick"),
    p("Alle sitzen im Kreis. Die erste Person sagt:"),
    p("\"Ich packe mein Picknick und nehme Pizza mit.\""),
    p("Die zweite Person wiederholt und fügt etwas hinzu:"),
    p("\"Ich packe mein Picknick und nehme Pizza und Salat mit.\""),
    pItalic("Wer eine Speise vergisst, scheidet aus. Nur Essen aus der Wortliste verwenden!")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Konversation"), empty(),
    h2("Dialog 1 + 2: Bewertungskriterien"),
    bullet("Speisen korrekt auf Deutsch benannt"),
    bullet("Verben essen / mögen / schmecken verwendet"),
    bullet("Verständlicher Dialog auf Deutsch geführt"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("Pizza / Wasser (oder Saft) / Eis / lecker (oder toll / super)"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Fokus: Essens-Vokabular korrekt auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Lieblingsessen — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("[BILD 1: 8 Bilder von Speisen nebeneinander: Pizza, Nudeln, Suppe, Salat, Brot, Kuchen, Obst, Eis — nummeriert 1–8]"),
    pItalic("Schreibe den deutschen Namen mit Artikel unter jedes Bild."),
    p("1. _______ 2. _______ 3. _______ 4. _______"),
    p("5. _______ 6. _______ 7. _______ 8. _______"),
    empty(),
    h2("Aufgabe 2: Lecker oder nicht lecker?"),
    p("[BILD 2: Sechs Kinder mit verschiedenen Gesichtsausdrücken beim Essen — manche lachen, manche verzeihen das Gesicht]"),
    pItalic("Schreibe unter jedes Kind: Was isst das Kind? Schmeckt es ihm/ihr?"),
    pItalic("Beispiel: Das Kind isst Salat. Es schmeckt ihm lecker!"),
    ...writeLines(6),
    empty(),
    h2("Aufgabe 3: Gedeckter Tisch"),
    p("[BILD 3: Ein gedeckter Tisch mit verschiedenen Speisen und Getränken]"),
    pItalic("Was siehst du auf dem Tisch? Schreibe 4–5 Sätze."),
    pItalic("Auf dem Tisch steht/liegt... / Es gibt..."),
    ...writeLines(5),
    empty(),
    h2("Aufgabe 4: Speisekarte"),
    p("[BILD 4: Eine einfache Speisekarte mit 6 Gerichten und Preisen, aber ohne Namen — nur Bilder der Speisen]"),
    pItalic("Schreibe den Namen der Speise neben das Bild auf der Speisekarte."),
    empty(),
    h2("Aufgabe 5: Mein Lieblingsteller"),
    p("[BILD 5: Ein leerer Teller]"),
    pItalic("Zeichne dein Lieblingsessen auf den Teller und beschrifte alles auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Lieblingsessen Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("Erwartete Antworten: die Pizza / die Nudeln / die Suppe / der Salat /"),
    p("das Brot / der Kuchen / das Obst / das Eis"),
    empty(),
    h2("Aufgabe 2: Lecker oder nicht lecker?"),
    p("Individuelle Antworten — abhängig von Bildinhalt."),
    p("Schlüsselformulierungen: 'schmeckt lecker' / 'schmeckt nicht gut' / 'mag es nicht'"),
    empty(),
    h2("Aufgabe 3: Gedeckter Tisch"),
    p("Individuelle Antworten. Bewertung: Speisen korrekt benannt, Artikel versucht."),
    empty(),
    h2("Aufgabe 4: Speisekarte"),
    p("Abhängig von Bildanordnung. Vokabular aus Wortliste verwenden."),
    empty(),
    h2("Aufgabe 5: Mein Lieblingsteller"),
    p("Individuelle Zeichnungen. Bewertung: Speisen auf Deutsch benannt, Artikel versucht.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Lieblingsessen");
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
