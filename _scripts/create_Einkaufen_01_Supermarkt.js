"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "05_Einkaufen", "01_Supermarkt");
const TOPIC     = "A2_Kinder_Einkaufen_01_Supermarkt";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  }]
};

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 100 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: BLUE, font: "Arial" })], spacing: { before: 160, after: 80 } }); }
function p(t, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text: t, size: opts.size || 22, font: "Arial", color: opts.color || "000000", bold: opts.bold || false, italics: opts.italic || false })],
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60 },
  });
}
function pBold(t, opts = {}) { return p(t, { ...opts, bold: true }); }
function pItalic(t, opts = {}) { return p(t, { ...opts, italic: true }); }
function empty() { return new Paragraph({ children: [new TextRun({ text: "", size: 22, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function bullet(t) { return new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })], numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 } }); }
function hCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: opts.size || 20, font: "Arial", color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
  });
}
function dCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, size: opts.size || 20, font: "Arial" })], alignment: opts.align || AlignmentType.LEFT })],
    shading: opts.shade ? { fill: LIGHT, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
    ...(opts.colspan ? { columnSpan: opts.colspan } : {}),
  });
}
function writeLine(n) { return new Paragraph({ children: [new TextRun({ text: "_".repeat(n || 60), size: 22, font: "Arial", color: GRAY })], spacing: { before: 60, after: 60 } }); }
function writeLines(count, n) { const arr = []; for (let i = 0; i < count; i++) { arr.push(writeLine(n)); arr.push(empty()); } return arr; }
function studentHead() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [dCell("Name: ______________________________", { width: 4500 }), dCell("Klasse: ____________", { width: 2200 }), dCell("Datum: ____________", { width: 2200 })] })],
  });
}
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC, size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] });
}
function save(fname, sections) {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: sections }]
  });
  Packer.toBuffer(doc).then(buf => { fs.writeFileSync(path.join(OUTPUT_DIR, fname), buf); console.log("OK ", fname); }).catch(e => console.error("FEHLER", fname, e.message));
}

// ── Wortliste-Tabelle ─────────────────────────────────────────────────────────
function makeWortlisteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Kategorie", { width: 1800 }), hCell("Beispielsatz", { width: 5038 })] }),
      new TableRow({ children: [dCell("der Supermarkt"), dCell("Ort"), dCell("Im Supermarkt kauft man Lebensmittel aller Art.")] }),
      new TableRow({ children: [dCell("der Kiosk"), dCell("Ort"), dCell("Am Kiosk kaufe ich eine Zeitschrift und ein Eis.")] }),
      new TableRow({ children: [dCell("die Baeckerei"), dCell("Ort"), dCell("In der Baeckerei gibt es frisches Brot und Broetchen.")] }),
      new TableRow({ children: [dCell("das Broetchen"), dCell("Baeckerei"), dCell("Ich kaufe vier Broetchen fuer das Fruehstueck.")] }),
      new TableRow({ children: [dCell("die Brezel"), dCell("Baeckerei"), dCell("Eine Brezel kostet 90 Cent.")] }),
      new TableRow({ children: [dCell("die Zeitschrift"), dCell("Kiosk"), dCell("Am Kiosk gibt es Zeitschriften fuer Kinder.")] }),
      new TableRow({ children: [dCell("die Kasse"), dCell("Supermarkt"), dCell("An der Kasse bezahlt man die Einkauefe.")] }),
      new TableRow({ children: [dCell("das Regal"), dCell("Supermarkt"), dCell("Das Brot steht im Regal neben den Getraenken.")] }),
      new TableRow({ children: [dCell("das Wechselgeld"), dCell("Zahlen"), dCell("Ich bekomme 50 Cent Wechselgeld zurueck.")] }),
      new TableRow({ children: [dCell("Was darf es sein?"), dCell("Ausdruck"), dCell("Was darf es sein? — Ich haette gerne zwei Broetchen.")] }),
      new TableRow({ children: [dCell("Ich haette gerne ..."), dCell("Ausdruck"), dCell("Ich haette gerne ein Croissant, bitte.")] }),
      new TableRow({ children: [dCell("Das macht ... Euro."), dCell("Ausdruck"), dCell("Das macht 3,50 Euro, bitte.")] }),
      new TableRow({ children: [dCell("Stimmt so."), dCell("Ausdruck"), dCell("Stimmt so! (= kein Wechselgeld noetig)")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    pBold("Aufgabe 1: Sortiere die Produkte in die richtige Spalte."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Broetchen  -  Milch  -  Zeitschrift  -  Brezel  -  Chips  -  Kuchen  -  Apfel  -  Eis  -  Kaese  -  Kaugummi  -  Brot  -  Joghurt  -  Postkarte  -  Croissant")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Supermarkt", { width: 3100 }), hCell("Kiosk", { width: 3100 }), hCell("Baeckerei", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib den Dialog zu Ende."),
    pItalic("In der Baeckerei: Kunde moechte 3 Broetchen und eine Brezel kaufen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Guten Morgen! Was darf es sein?")] }),
        new TableRow({ children: [dCell("Kunde"), dCell("Guten Morgen! Ich haette gerne ___________________________________")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Drei Broetchen und eine Brezel — das macht ______________ Euro.")] }),
        new TableRow({ children: [dCell("Kunde"), dCell("Hier sind ______________ Euro.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Ihr Wechselgeld: ______________. Danke und auf Wiedersehen!")] }),
        new TableRow({ children: [dCell("Kunde"), dCell("______________________________________________")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib deinen Einkaufszettel fuer Samstag."),
    p("Du hast 10 Euro. Was kaufst du wo? Schreib: Produkt — Geschaeft — ungefaehre Menge."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 3500 }), hCell("Geschaeft", { width: 3000 }), hCell("Menge", { width: 3138 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Supermarkt", { width: 3100 }), hCell("Kiosk", { width: 3100 }), hCell("Baeckerei", { width: 3100 })] }),
        new TableRow({ children: [dCell("Milch, Apfel, Kaese"), dCell("Zeitschrift, Chips"), dCell("Broetchen, Brezel")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("Eis, Kaugummi"), dCell("Kuchen, Brot, Croissant")] }),
        new TableRow({ children: [dCell(""), dCell("Postkarte"), dCell("")] }),
      ],
    }),
    pItalic("Hinweis: Einige Produkte (z. B. Chips, Eis) gibt es auch im Supermarkt — andere sinnvolle Zuordnungen akzeptieren."),
    empty(),
    pBold("Aufgabe 2: Musterloesung Dialog"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Musterloesung", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kunde"), dCell("Ich haette gerne drei Broetchen und eine Brezel, bitte.")] }),
        new TableRow({ children: [dCell("Verkaeuferin (Preis)"), dCell("Das macht 2,70 Euro. (Muster: 3 x 0,60 + 0,90)")] }),
        new TableRow({ children: [dCell("Kunde (zahlt)"), dCell("Hier sind 3 Euro.")] }),
        new TableRow({ children: [dCell("Verkaeuferin (WG)"), dCell("Ihr Wechselgeld: 30 Cent.")] }),
        new TableRow({ children: [dCell("Kunde (Abschied)"), dCell("Danke! Auf Wiedersehen! / Schoenen Tag noch!")] }),
      ],
    }),
    pItalic("Preise variieren — alle realistischen Preise und Betraege akzeptieren."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Bewertung: Produkte korrekt mit Geschaeft und Menge verknuepft, Gesamtbetrag plausibel unter 10 Euro."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Emmas Samstag-Einkauf"),
          empty(),
          p("Jeden Samstag geht Emma mit ihrer Mutter einkaufen. Das macht sie gern, weil sie dann manchmal eine Kleinigkeit kaufen darf."),
          p("Zuerst gehen sie zur Baeckerei. Die Verkaeuferin fragt: 'Was darf es sein?' Emmas Mutter antwortet: 'Sechs Broetchen und ein Roggenbrot, bitte.' Das macht 4,20 Euro. Emma darf die Broetchen in die Papiertute legen."),
          p("Dann fahren sie zum Supermarkt. Emma schiebt den Einkaufswagen. Sie kaufen Milch, Joghurt, Aepfel, Karotten und Kaese. An der Kasse legt Emma alles aufs Band. Die Kassiererin scannt die Produkte: 'Das macht 12,80 Euro.' Emmas Mutter bezahlt mit der Karte."),
          p("Auf dem Rueckweg kommen sie am Kiosk vorbei. Emma fragt: 'Darf ich eine Zeitschrift kaufen?' Ihre Mutter sagt: 'Ja, aber nur eine guenstige.' Emma nimmt ihr Lieblingsheft fuer 2,50 Euro. Sie bezahlt selbst — sie hat noch Taschengeld dabei."),
          p("Zu Hause hilft Emma beim Ausraeumen der Einkaufstasche. Das macht sie gerne, weil dann das Fruehstueck schneller fertig ist!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Emma geht jeden Samstag mit ihrer Mutter einkaufen."), dCell("")] }),
        new TableRow({ children: [dCell("In der Baeckerei kaufen sie Broetchen und Weissbrot."), dCell("")] }),
        new TableRow({ children: [dCell("Der Supermarkt-Einkauf kostet 12,80 Euro."), dCell("")] }),
        new TableRow({ children: [dCell("Emmas Mutter bezahlt im Supermarkt bar."), dCell("")] }),
        new TableRow({ children: [dCell("Emma kauft am Kiosk eine Zeitschrift fuer 2,50 Euro."), dCell("")] }),
        new TableRow({ children: [dCell("Emma hilft zu Hause nicht beim Ausraeumen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was kaufen Emma und ihre Mutter in der Baeckerei?"),
    writeLine(55), empty(),
    p("2. Was macht Emma im Supermarkt?"),
    writeLine(55), empty(),
    p("3. Womit bezahlt Emma die Zeitschrift?"),
    writeLine(55), empty(),
    p("4. Warum hilft Emma gern beim Ausraeumen?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: In welchem Geschaeft kauft man das? Schreib: Supermarkt / Kiosk / Baeckerei."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 5000 }), hCell("Geschaeft", { width: 4638 })] }),
        new TableRow({ children: [dCell("Roggenbrot"), dCell("")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("")] }),
        new TableRow({ children: [dCell("Lieblingsheft / Zeitschrift"), dCell("")] }),
        new TableRow({ children: [dCell("Karotten"), dCell("")] }),
        new TableRow({ children: [dCell("Broetchen"), dCell("")] }),
      ],
    }),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Emma geht jeden Samstag mit ihrer Mutter einkaufen."), dCell("R")] }),
        new TableRow({ children: [dCell("In der Baeckerei kaufen sie Broetchen und Weissbrot."), dCell("F (Roggenbrot, nicht Weissbrot)")] }),
        new TableRow({ children: [dCell("Der Supermarkt-Einkauf kostet 12,80 Euro."), dCell("R")] }),
        new TableRow({ children: [dCell("Emmas Mutter bezahlt im Supermarkt bar."), dCell("F (sie bezahlt mit der Karte)")] }),
        new TableRow({ children: [dCell("Emma kauft am Kiosk eine Zeitschrift fuer 2,50 Euro."), dCell("R")] }),
        new TableRow({ children: [dCell("Emma hilft zu Hause nicht beim Ausraeumen."), dCell("F (sie hilft gerne)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie kaufen sechs Broetchen und ein Roggenbrot."),
    bullet("2. Emma schiebt den Einkaufswagen und legt alles aufs Band an der Kasse."),
    bullet("3. Sie bezahlt mit ihrem Taschengeld."),
    bullet("4. Weil dann das Fruehstueck schneller fertig ist."),
    empty(),
    pBold("Aufgabe 3: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 5000 }), hCell("Geschaeft", { width: 4638 })] }),
        new TableRow({ children: [dCell("Roggenbrot"), dCell("Baeckerei")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("Supermarkt")] }),
        new TableRow({ children: [dCell("Lieblingsheft / Zeitschrift"), dCell("Kiosk")] }),
        new TableRow({ children: [dCell("Karotten"), dCell("Supermarkt")] }),
        new TableRow({ children: [dCell("Broetchen"), dCell("Baeckerei")] }),
      ],
    }),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Wechselgeld  -  haette gerne  -  macht  -  Kasse  -  Regal  -  darf  -  kostet  -  kaufen  -  Baeckerei  -  Kiosk  -  stimmt so  -  guenstig  -  bar")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. In der __________________ gibt es frisches Brot und Broetchen."),
    p("2. Am __________________ kann man Zeitschriften und Eis __________________."),
    p("3. An der __________________ bezahlt man die Einkauefe."),
    p("4. Das Brot steht im __________________ neben der Milch."),
    p("5. Das __________________ 3,50 Euro. Hast du genug Geld dabei?"),
    p("6. Ich bekomme 70 Cent __________________ zurueck."),
    empty(),
    pBold("Teil 2: Dialog in der Baeckerei — ergaenze."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("Guten Morgen! Was darf es sein?")] }),
        new TableRow({ children: [dCell("Kundin"), dCell("Guten Morgen! Ich __________________ zwei Croissants und ein Kaesebrot.")] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("Gerne! Das __________________ 4,80 Euro.")] }),
        new TableRow({ children: [dCell("Kundin"), dCell("Darf ich __________________ zahlen?")] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("Natuerlich! Hier ist Ihr __________________ — 20 Cent.")] }),
        new TableRow({ children: [dCell("Kundin"), dCell("Ach, __________________ — behalten Sie den Rest!")] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("Vielen Dank! Einen schoenen Tag!")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Was __________________ ich kaufen?"),
    empty(),
    p("Schreib selbst: Du hast 5 Euro Taschengeld. Wo gehst du einkaufen?"),
    p("Ich __________________ zum/zur __________________ und kaufe __________________."),
    writeLine(55), empty(),
    p("Das __________________ ungefaehr __________________ Euro."),
    p("Danach gehe ich noch zum __________________ und kaufe __________________"),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Baeckerei"),
    bullet("2. Kiosk — kaufen"),
    bullet("3. Kasse"),
    bullet("4. Regal"),
    bullet("5. kostet / macht"),
    bullet("6. Wechselgeld"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Kundin (1): haette gerne"),
    bullet("Verkaeufer (1): macht"),
    bullet("Kundin (2): bar"),
    bullet("Verkaeufer (2): Wechselgeld"),
    bullet("Kundin (3): stimmt so"),
    pItalic("Nicht verwendet (Ablenkwoerter): darf, guenstig, Kiosk, Regal, Baeckerei"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Ich gehe zum Kiosk und kaufe eine Zeitschrift. Das kostet ungefaehr 2,50 Euro. Danach gehe ich noch zur Baeckerei und kaufe ein Broetchen fuer 60 Cent."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Strukturen beim Einkaufen:"),
    bullet("Hoeflich bestellen: Ich haette gerne ... / Koennte ich bitte ... haben?"),
    bullet("Nach dem Preis fragen: Was kostet ...? / Wie viel macht das?"),
    bullet("Bezahlen: Das macht ... Euro. / Stimmt so. / Hier sind ... Euro."),
    bullet("Erlaubnis fragen: Darf ich ...? (= koennen/duerfen beim Einkaufen)"),
    bullet("Kein Geld: Ich habe kein Kleingeld. / Darf ich mit Karte zahlen?"),
    empty(),
    h2("Grammatik-Hinweis: Akkusativ beim Einkaufen"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Artikel (Nom.)", { width: 2400 }), hCell("Akkusativ", { width: 2400 }), hCell("Beispiel: kaufen / nehmen", { width: 4838 })] }),
        new TableRow({ children: [dCell("der (maskulin)"), dCell("einen"), dCell("Ich kaufe einen Apfel.")] }),
        new TableRow({ children: [dCell("die (feminin)"), dCell("eine"), dCell("Ich nehme eine Brezel.")] }),
        new TableRow({ children: [dCell("das (neutrum)"), dCell("ein"), dCell("Ich haette gerne ein Broetchen.")] }),
        new TableRow({ children: [dCell("die (Plural)"), dCell("—"), dCell("Ich kaufe Aepfel. (kein Artikel noetig)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib 6 Saetze: Was kaufst du wo? Benutze Akkusativ."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen — Zusammenfassung fuer Lehrkraft:"),
    bullet("haette gerne = Konjunktiv II von haben — hoefliche Bitte (A2-Einfuehrung)"),
    bullet("Akkusativ: maskulin der -> einen (wichtig!), feminin/neutrum meist unveraendert"),
    bullet("Preisangaben: Euro und Cent getrennt (2 Euro 50) oder mit Komma (2,50 Euro)"),
    bullet("Stimmt so = umgangssprachlich 'kein Wechselgeld noetig'"),
    empty(),
    pBold("Loesung Aufgabe: Mustersaetze"),
    bullet("Ich kaufe einen Apfel im Supermarkt."),
    bullet("Ich haette gerne eine Brezel in der Baeckerei."),
    bullet("Ich nehme ein Broetchen zum Fruehstueck."),
    bullet("Am Kiosk kaufe ich eine Zeitschrift."),
    bullet("Im Supermarkt kaufe ich Joghurt und Kaese."),
    bullet("Ich haette gerne drei Croissants, bitte."),
    pItalic("Alle grammatisch korrekten Saetze mit Akkusativ akzeptieren."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    pBold("Dialog 1: In der Baeckerei"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Guten Morgen! Was darf es sein?")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Guten Morgen! Ich haette gerne vier Broetchen und zwei Brezeln.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Gerne. Noch etwas?")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Ja, haben Sie auch Mohnkuchen?")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Ja, aber nur noch ein Stueck. Moechten Sie es nehmen?")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Ja, bitte! Was macht das alles zusammen?")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Das macht 5,30 Euro.")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Hier sind 10 Euro.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Ihr Wechselgeld: 4,70 Euro. Schoenen Tag!")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Danke, Ihnen auch!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Im Supermarkt — was hast du gekauft?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Hey Finn! Was hast du im Supermarkt gekauft?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ich habe Milch, Aepfel und Kaese gekauft. Fuer das Wochenende.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Wie viel hat das gekostet?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ungefaehr 8 Euro. Die Aepfel waren im Angebot — 1 kg fuer 1,50 Euro.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Super guenstig! Ich muss auch noch zum Kiosk — ich brauche eine Zeitschrift.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ach, komm doch mit! Ich gehe sowieso in die Richtung.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Rollenspiel — Kaufladen"),
    pItalic("Person A = Verkaeufer/in, Person B = Kunde/Kundin"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Kunden-Karte", { width: 4819 }), hCell("Verkaeufer-Karte", { width: 4819 })] }),
        new TableRow({ children: [
          dCell("Du moechtest kaufen: 2 Broetchen (je 0,60 Euro), 1 Stueck Kuchen (2,50 Euro). Du hast 5 Euro dabei.", { shade: true }),
          dCell("Antwort auf 'Was darf es sein?'. Berechne den Preis. Gib Wechselgeld. Verabschiede dich hoeflich.", { shade: true }),
        ]}),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Was kostet das?"),
    bullet("Jede Person schreibt ein Produkt auf einen Zettel und erfindet einen Preis."),
    bullet("Reihum fragt eine Person: 'Was kostet ein/eine/ein ...?'"),
    bullet("Die Person mit dem Zettel antwortet: 'Das kostet ... Euro.'"),
    bullet("Variation: Wer kommt am naechsten an den echten Preis heran?"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Was darf es sein? = Standardfrage des Verkaefers"),
    bullet("Ich haette gerne ... = hoefliche Bestellung (Konjunktiv II)"),
    bullet("Noch etwas? = Rueckfrage nach weiteren Wuenschen"),
    bullet("Haben Sie auch ...? = fragen, ob ein Produkt vorhanden ist"),
    bullet("Was macht das alles zusammen? = nach dem Gesamtpreis fragen"),
    bullet("Ihr Wechselgeld = formell (Sie-Form) gegenueber Erwachsenen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was hast du gekauft? = Perfekt (A2-Grammatik: haben + Partizip II)"),
    bullet("Wie viel hat das gekostet? = Perfekt von kosten"),
    bullet("im Angebot = on sale / reduziert"),
    bullet("sowieso = anyway — verbindet zwei Aktivitaeten"),
    empty(),
    pBold("Bewertungskriterien Rollenspiel:"),
    bullet("Bestellung mit Ich haette gerne ..."),
    bullet("Preis korrekt berechnet und genannt"),
    bullet("Wechselgeld korrekt berechnet (5,00 - 3,70 = 1,30 Euro)"),
    bullet("Hoefliche Begruessung und Verabschiedung"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Im Supermarkt, im Kiosk, beim Baecker"), empty(),
    pBold("Aufgabe 1: Schreib den Namen des Geschaefts unter jedes Bild und nenne 2 Produkte."),
    p("[BILD 1: Drei Bilder — Supermarkt von aussen, Kiosk an der Strasse, Baeckerei-Auslage]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 3100 }), hCell("[Bild 2]", { width: 3100 }), hCell("[Bild 3]", { width: 3100 })] }),
        new TableRow({ children: [dCell("Name: ____________"), dCell("Name: ____________"), dCell("Name: ____________")] }),
        new TableRow({ children: [dCell("Produkt 1: ________"), dCell("Produkt 1: ________"), dCell("Produkt 1: ________")] }),
        new TableRow({ children: [dCell("Produkt 2: ________"), dCell("Produkt 2: ________"), dCell("Produkt 2: ________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Lies den Kassenbon und beantworte die Fragen."),
    p("[BILD 2: Kassenbon mit: 2x Broetchen 1,20 Euro, 1x Milch 1,09 Euro, 1x Apfel 0,49 Euro, Summe: 2,78 Euro, Gegeben: 5,00 Euro, Rueckgeld: 2,22 Euro]"),
    empty(),
    p("1. Was hat die Person gekauft? ____________________________________________"),
    writeLine(55), empty(),
    p("2. Wie viel hat der Einkauf insgesamt gekostet? _____________________________"),
    writeLine(40), empty(),
    p("3. Wie viel Wechselgeld hat sie bekommen? __________________________________"),
    writeLine(40), empty(),
    p("4. Wie viele Broetchen hat sie gekauft und was haben sie zusammen gekostet?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib den passenden Dialog zum Bild."),
    p("[BILD 3: Kundin steht an der Baeckerei-Theke, Verkaeufer dahinter, Preisschild: Broetchen 0,65 Euro]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagst du? (schreib selbst)", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("")] }),
        new TableRow({ children: [dCell("Kundin"), dCell("")] }),
        new TableRow({ children: [dCell("Verkaeufer"), dCell("")] }),
        new TableRow({ children: [dCell("Kundin"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Zeichne deinen Einkaufszettel fuer morgen."),
    p("[BILD 4: Leerer Einkaufszettel zum Ausfullen]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [pBold("Einkaufszettel fuer morgen:"), empty(), ...writeLines(5, 40)],
      })] })],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Im Supermarkt, im Kiosk, beim Baecker (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von eingefuegten Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Geschaeft", { width: 3100 }), hCell("Moegliche Produkte", { width: 6538 })] }),
        new TableRow({ children: [dCell("Supermarkt"), dCell("Milch, Joghurt, Obst, Gemuese, Kaese, Brot, Getraenke")] }),
        new TableRow({ children: [dCell("Kiosk"), dCell("Zeitschrift, Zeitung, Eis, Kaugummi, Suessigkeiten, Postkarte")] }),
        new TableRow({ children: [dCell("Baeckerei"), dCell("Broetchen, Brot, Brezel, Croissant, Kuchen, Torte")] }),
      ],
    }),
    pItalic("Hinweis: Antworten haengen von eingefuegten Bildern ab."),
    empty(),
    pBold("Aufgabe 2: Kassenbon-Antworten"),
    bullet("1. Sie hat Broetchen (2 Stueck), Milch und einen Apfel gekauft."),
    bullet("2. Der Einkauf hat 2,78 Euro gekostet."),
    bullet("3. Sie hat 2,22 Euro Wechselgeld bekommen."),
    bullet("4. Sie hat 2 Broetchen gekauft. Sie haben zusammen 1,20 Euro gekostet."),
    empty(),
    pBold("Aufgabe 3: Musterdialog (Broetchen 0,65 Euro)"),
    bullet("Verkaeufer: Guten Morgen! Was darf es sein?"),
    bullet("Kundin: Ich haette gerne drei Broetchen, bitte."),
    bullet("Verkaeufer: Das macht 1,95 Euro."),
    bullet("Kundin: Hier sind 2 Euro. — Verkaeufer: 5 Cent Wechselgeld. Danke!"),
    pItalic("Andere korrekte Dialoge akzeptieren."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Produkte realistisch, korrekte Schreibweise der Lebensmittel."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Im Supermarkt, im Kiosk, beim Baecker");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
