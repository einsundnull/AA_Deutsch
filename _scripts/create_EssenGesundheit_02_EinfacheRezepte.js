"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "04_EssenGesundheit", "02_EinfacheRezepte");
const TOPIC     = "A2_Kinder_EssenGesundheit_02_EinfacheRezepte";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2600 }), hCell("Kategorie", { width: 2000 }), hCell("Beispielsatz", { width: 5038 })] }),
      new TableRow({ children: [dCell("waschen"), dCell("Kochverb"), dCell("Wasche das Obst zuerst gruendlich.")] }),
      new TableRow({ children: [dCell("schneiden"), dCell("Kochverb"), dCell("Schneide den Apfel in kleine Stuecke.")] }),
      new TableRow({ children: [dCell("schaelen"), dCell("Kochverb"), dCell("Schaele die Banane und die Orange.")] }),
      new TableRow({ children: [dCell("mischen"), dCell("Kochverb"), dCell("Mische alles gut in einer Schuessel.")] }),
      new TableRow({ children: [dCell("ruehren"), dCell("Kochverb"), dCell("Ruehre den Teig, bis er glatt ist.")] }),
      new TableRow({ children: [dCell("hinzufuegen"), dCell("Kochverb"), dCell("Fuege einen Essloffel Honig hinzu.")] }),
      new TableRow({ children: [dCell("die Zutat (Zutaten)"), dCell("Rezept-Wort"), dCell("Die Zutaten fuer den Salat sind Apfel und Banane.")] }),
      new TableRow({ children: [dCell("die Zubereitung"), dCell("Rezept-Wort"), dCell("Die Zubereitung dauert nur 10 Minuten.")] }),
      new TableRow({ children: [dCell("die Portion(en)"), dCell("Rezept-Wort"), dCell("Das Rezept reicht fuer 2 Portionen.")] }),
      new TableRow({ children: [dCell("der Essloffel (EL)"), dCell("Masse"), dCell("Ein Essloffel Joghurt macht den Smoothie cremig.")] }),
      new TableRow({ children: [dCell("der Teeloffel (TL)"), dCell("Masse"), dCell("Gib einen Teeloffel Honig dazu.")] }),
      new TableRow({ children: [dCell("zuerst — dann — danach — zum Schluss"), dCell("Signalwoerter"), dCell("Zuerst waschen, dann schneiden, zum Schluss mischen.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Einfache Rezepte"), empty(),
    pBold("Aufgabe 1: Bringe die Rezept-Schritte in die richtige Reihenfolge."),
    pItalic("Schreibe die Nummern 1-6 vor die Schritte."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nr.", { width: 600 }), hCell("Schritt — Obstsalat fuer 2 Personen", { width: 9038 })] }),
        new TableRow({ children: [dCell("___"), dCell("Mische alles vorsichtig in der Schuessel.")] }),
        new TableRow({ children: [dCell("___"), dCell("Wasche Apfel, Banane und Orange mit Wasser.")] }),
        new TableRow({ children: [dCell("___"), dCell("Schneide alle Fruechte in kleine Stuecke.")] }),
        new TableRow({ children: [dCell("___"), dCell("Gib einen Teeloffel Honig und etwas Zitronensaft dazu.")] }),
        new TableRow({ children: [dCell("___"), dCell("Schaele die Banane und die Orange.")] }),
        new TableRow({ children: [dCell("___"), dCell("Fertig! Serviere den Obstsalat sofort oder stelle ihn kalt.")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib das Rezept in ganzen Saetzen mit Signalwoertern."),
    pItalic("Benutze: zuerst — dann — danach — anschliessend — zum Schluss"),
    empty(),
    ...writeLines(6, 55),
    empty(),
    pBold("Aufgabe 3: Schreib dein eigenes einfaches Lieblingsrezept."),
    p("Name des Gerichts: ____________________________________"),
    p("Fuer ______ Personen   Zubereitungszeit: ______ Minuten"),
    empty(),
    pBold("Zutaten:"),
    ...writeLines(4, 45),
    pBold("Zubereitung:"),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Einfache Rezepte (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Richtige Reihenfolge"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nr.", { width: 600 }), hCell("Schritt", { width: 9038 })] }),
        new TableRow({ children: [dCell("1"), dCell("Wasche Apfel, Banane und Orange mit Wasser.")] }),
        new TableRow({ children: [dCell("2"), dCell("Schaele die Banane und die Orange.")] }),
        new TableRow({ children: [dCell("3"), dCell("Schneide alle Fruechte in kleine Stuecke.")] }),
        new TableRow({ children: [dCell("4"), dCell("Gib einen Teeloffel Honig und etwas Zitronensaft dazu.")] }),
        new TableRow({ children: [dCell("5"), dCell("Mische alles vorsichtig in der Schuessel.")] }),
        new TableRow({ children: [dCell("6"), dCell("Fertig! Serviere den Obstsalat sofort oder stelle ihn kalt.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("Zuerst waesche ich Apfel, Banane und Orange mit Wasser."),
    bullet("Dann schaele ich die Banane und die Orange."),
    bullet("Danach schneide ich alle Fruechte in kleine Stuecke."),
    bullet("Anschliessend gebe ich Honig und Zitronensaft dazu."),
    bullet("Zum Schluss mische ich alles vorsichtig und serviere den Obstsalat."),
    pItalic("Hinweis: Auch Imperativ-Form akzeptieren (Wasche! Schaele! ...)."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Bewertung: Zutaten mit Mengenangaben, Schritte mit Signalwoertern, Imperativ oder man-Form."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Einfache Rezepte"), empty(),
    pBold("Lies das Rezept."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Bananen-Smoothie fuer 2 Personen"),
          pItalic("Zubereitungszeit: 5 Minuten"),
          empty(),
          pBold("Zutaten:"),
          bullet("2 reife Bananen"),
          bullet("1 Glas Milch (ca. 200 ml)"),
          bullet("2 Essloffel Joghurt"),
          bullet("1 Teeloffel Honig"),
          bullet("ein paar Eiswuerfel (optional)"),
          empty(),
          pBold("Zubereitung:"),
          p("Zuerst schaeist du die Bananen und schneidest sie in kleine Stuecke."),
          p("Dann gibst du die Bananenstuecke in den Mixer."),
          p("Danach fuegst du die Milch und den Joghurt hinzu."),
          p("Anschliessend gibst du einen Teeloffel Honig dazu — das macht den Smoothie suess."),
          p("Zum Schluss mixt du alles ungefaehr 30 Sekunden lang. Wenn du magst, gib noch Eiswuerfel dazu."),
          p("Fertig! Der Smoothie schmeckt am besten, wenn er frisch und kalt ist. Guten Appetit!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Das Rezept ist fuer 4 Personen."), dCell("")] }),
        new TableRow({ children: [dCell("Man braucht 2 Essloffel Joghurt."), dCell("")] }),
        new TableRow({ children: [dCell("Die Bananen werden zuerst gemixt."), dCell("")] }),
        new TableRow({ children: [dCell("Honig macht den Smoothie suess."), dCell("")] }),
        new TableRow({ children: [dCell("Der Smoothie wird 1 Minute lang gemixt."), dCell("")] }),
        new TableRow({ children: [dCell("Eiswuerfel sind ein optionaler Schritt."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie lange dauert die Zubereitung?"),
    writeLine(55), empty(),
    p("2. Was macht der Smoothie suess?"),
    writeLine(55), empty(),
    p("3. Was ist der erste Schritt bei der Zubereitung?"),
    writeLine(55), empty(),
    p("4. Wann schmeckt der Smoothie am besten?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib alle Zutaten auf und markiere die Mengenangaben."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Zutat", { width: 5000 }), hCell("Menge", { width: 4638 })] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Einfache Rezepte (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Das Rezept ist fuer 4 Personen."), dCell("F (fuer 2 Personen)")] }),
        new TableRow({ children: [dCell("Man braucht 2 Essloffel Joghurt."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Bananen werden zuerst gemixt."), dCell("F (zuerst schaelen und schneiden)")] }),
        new TableRow({ children: [dCell("Honig macht den Smoothie suess."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Smoothie wird 1 Minute lang gemixt."), dCell("F (ungefaehr 30 Sekunden)")] }),
        new TableRow({ children: [dCell("Eiswuerfel sind ein optionaler Schritt."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Die Zubereitung dauert 5 Minuten."),
    bullet("2. Ein Teeloffel Honig macht den Smoothie suess."),
    bullet("3. Zuerst schaelt man die Bananen und schneidet sie in Stuecke."),
    bullet("4. Er schmeckt am besten frisch und kalt."),
    empty(),
    pBold("Aufgabe 3: Zutaten"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Zutat", { width: 5000 }), hCell("Menge", { width: 4638 })] }),
        new TableRow({ children: [dCell("Bananen"), dCell("2 (reife)")] }),
        new TableRow({ children: [dCell("Milch"), dCell("1 Glas (ca. 200 ml)")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("2 Essloffel")] }),
        new TableRow({ children: [dCell("Honig"), dCell("1 Teeloffel")] }),
        new TableRow({ children: [dCell("Eiswuerfel"), dCell("ein paar (optional)")] }),
      ],
    }),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Einfache Rezepte"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("zuerst  -  dann  -  danach  -  zum Schluss  -  schaelen  -  schneiden  -  mischen  -  hinzufuegen  -  Zutaten  -  Portionen  -  Essloffel  -  Teeloffel  -  reif  -  Minuten")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Einfacher Fruchtsalat — ergaenze das Rezept."),
    empty(),
    p("Fruchtsalat fuer 3 __________________"),
    p("Zubereitungszeit: 10 __________________"),
    empty(),
    p("__________________:"),
    p("3 Aepfel, 2 Bananen, 1 Orange, 1 __________________ Joghurt, 1 __________________ Honig"),
    empty(),
    p("Zubereitung:"),
    p("__________________ waesche ich das Obst."),
    p("__________________ schaele ich die Bananen und die Orange."),
    p("__________________ schneide ich alles in Stuecke."),
    p("Jetzt fuege ich Joghurt und Honig __________________."),
    p("__________________ mische ich alles und serviere den Salat."),
    empty(),
    pBold("Teil 2: Dialog — Ein Rezept erklaeren"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ich mache heute Pancakes! Hilfst du mir?")] }),
        new TableRow({ children: [dCell("Leni"), dCell("Klar! Was brauchen wir? Was sind die __________________?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Mehl, Eier, Milch und eine Prise Salz.")] }),
        new TableRow({ children: [dCell("Leni"), dCell("Was machen wir __________________?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Zuerst mischen wir alles zu einem Teig.")] }),
        new TableRow({ children: [dCell("Leni"), dCell("Und wie viel Milch? Einen __________________ oder mehr?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Nein, ein ganzes Glas! Ruehre bitte gut um.")] }),
        new TableRow({ children: [dCell("Leni"), dCell("Okay! __________________ braten wir die Pancakes.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Schreib selbst — ein Mini-Rezept"),
    empty(),
    p("Mein einfaches Rezept: ____________________________________"),
    p("Zuerst ____________________________________________________"),
    writeLine(55), empty(),
    p("Dann ______________________________________________________"),
    writeLine(55), empty(),
    p("Zum Schluss _______________________________________________"),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Einfache Rezepte (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("Portionen"),
    bullet("Minuten"),
    bullet("Zutaten"),
    bullet("Essloffel / Teeloffel (beide akzeptieren fuer Joghurt)"),
    bullet("Teeloffel (fuer Honig)"),
    bullet("Zuerst"),
    bullet("Dann / Danach"),
    bullet("Danach / Anschliessend"),
    bullet("hinzu"),
    bullet("Zum Schluss"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Leni (1): Zutaten"),
    bullet("Leni (2): zuerst / dann / danach"),
    bullet("Leni (3): Essloffel / Teeloffel"),
    bullet("Leni (4): Danach / Dann / Zum Schluss"),
    pItalic("Nicht verwendet (Ablenkwoerter): reif, mischen, schneiden, schaelen"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Mein einfaches Rezept: Toast mit Butter. Zuerst toaste ich das Brot. Dann streiche ich Butter drauf. Zum Schluss lege ich Kaeseoder Marmelade obendrauf."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Einfache Rezepte"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Strukturen in Rezepten:"),
    bullet("Imperativ: Schneide! Wasche! Mische! Schaele! Fuege hinzu!"),
    bullet("man-Form: Man schneidet ... / Man gibt ... hinzu."),
    bullet("du-Form: Zuerst schneidest du ... / Dann gibst du ... hinzu."),
    bullet("Mengenangaben: 2 Essloffel, 1 Teeloffel, 1 Glas, eine Prise, 100 Gramm"),
    bullet("Rezept-Frage: Was brauche ich? / Wie viel nehme ich? / Wie lange?"),
    empty(),
    h2("Grammatik-Hinweis: Imperativ"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Infinitiv", { width: 2400 }), hCell("Imperativ (du)", { width: 2400 }), hCell("Imperativ (ihr)", { width: 2400 }), hCell("man-Form", { width: 2438 })] }),
        new TableRow({ children: [dCell("waschen"), dCell("Wasche!"), dCell("Wascht!"), dCell("Man waescht ...")] }),
        new TableRow({ children: [dCell("schneiden"), dCell("Schneide!"), dCell("Schneidet!"), dCell("Man schneidet ...")] }),
        new TableRow({ children: [dCell("mischen"), dCell("Mische!"), dCell("Mischt!"), dCell("Man mischt ...")] }),
        new TableRow({ children: [dCell("hinzufuegen"), dCell("Fuege hinzu!"), dCell("Fuegt hinzu!"), dCell("Man fuegt hinzu ...")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib das Rezept deines Lieblingsgerichts mit 4-5 Schritten."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Einfache Rezepte (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen — Zusammenfassung fuer Lehrkraft:"),
    bullet("Imperativ du-Form regulaer: Stamm + e (schneide, mische, fuege)"),
    bullet("Imperativ bei Vokalwechsel: schlafen -> Schlaf! / lesen -> Lies!"),
    bullet("Signalwoerter der Reihenfolge: zuerst > dann > danach > anschliessend > zum Schluss"),
    bullet("Mengenangaben ohne Artikel: 2 Essloffel Mehl (kein 'zwei Essloffel DAS Mehl')"),
    empty(),
    pBold("Loesung Aufgabe: Muster"),
    bullet("Zuerst wasche ich die Kartoffeln."),
    bullet("Dann schaele ich sie und schneide sie in Wuerfel."),
    bullet("Danach koche ich die Kartoffeln 20 Minuten lang."),
    bullet("Zum Schluss fuege ich Butter und Salz hinzu und mische alles."),
    pItalic("Individuelle Rezepte akzeptieren bei korrektem Imperativ / man-Form und Signalwoertern."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Einfache Rezepte"), empty(),
    pBold("Dialog 1: Zusammen kochen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich mache heute Abend Pfannkuchen. Magst du kommen?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Super! Was brauchen wir?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Mehl, Eier, Milch, etwas Salz und Butter zum Braten.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Und wie machen wir das? Ich kann nicht so gut kochen.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Kein Problem! Zuerst mischst du Mehl, Eier und Milch zu einem Teig.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Wie lange ruehre ich?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Bis der Teig glatt ist — ungefaehr 2 Minuten. Dann backen wir sie in der Pfanne.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ich bringe Apfelmus mit. Das schmeckt super dazu!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ein Rezept erklaeren"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Opa"), dCell("Lara, was machst du da in der Kueche?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Ich mache einen Smoothie! Willst du das Rezept wissen?")] }),
        new TableRow({ children: [dCell("Opa"), dCell("Ja, gerne! Was kommt rein?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Zwei Bananen, ein Glas Milch und zwei Essloffel Joghurt.")] }),
        new TableRow({ children: [dCell("Opa"), dCell("Und wie machst du das?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Ganz einfach! Zuerst schaele ich die Bananen. Dann mixe ich alles zusammen.")] }),
        new TableRow({ children: [dCell("Opa"), dCell("Klingt lecker! Wie lange mixt du?")] }),
        new TableRow({ children: [dCell("Lara"), dCell("Nur 30 Sekunden. Zum Schluss probiere ich, ob er suess genug ist.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview — Mein Lieblingsrezept"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was kannst du kochen oder zubereiten?"), dCell("")] }),
        new TableRow({ children: [dCell("Was sind die Zutaten?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist der erste Schritt?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie lange dauert die Zubereitung?"), dCell("")] }),
        new TableRow({ children: [dCell("Wem kochst du das gern?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Kochverb-Kette"),
    bullet("Eine Person zeigt eine Kochbewegung (z. B. Ruehren) — ohne zu sprechen."),
    bullet("Die anderen erraten das Verb und bilden einen Satz: 'Du ruerst den Teig!'"),
    bullet("Wer richtig liegt, macht als naechstes eine Bewegung."),
    bullet("Variation: Mit Rezept-Schritt ('Das ist Schritt 2 vom Pfannkuchen-Rezept!')."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Einfache Rezepte (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Magst du kommen? = Einladung (moegen + Infinitiv)"),
    bullet("Ich kann nicht so gut kochen. = Einschraenkung mit koennen"),
    bullet("Bis der Teig glatt ist = Temporalsatz mit bis"),
    bullet("Ich bringe ... mit = trennbares Verb mitbringen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was kommt rein? = umgangssprachlich fuer 'Was sind die Zutaten?'"),
    bullet("Klingt lecker! = Reaktion auf eine Beschreibung"),
    bullet("ob er suess genug ist = indirekter Fragesatz mit ob"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Verwendung von Imperativ oder man-Form bei Schritten"),
    bullet("Signalwoerter der Reihenfolge (zuerst, dann, zum Schluss)"),
    bullet("Mengenangaben korrekt (2 Essloffel, ein Glas, eine Prise)"),
    bullet("Fragen und Antworten passen inhaltlich zusammen"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Einfache Rezepte"), empty(),
    pBold("Aufgabe 1: Kochverben — schreib das passende Verb unter jedes Bild."),
    p("[BILD 1: Vier Bilder: Haende waschen Apfel, Messer schneidet Banane, Schuessel mit Loeffel ruehren, Gemuese schaelen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 2350 }), hCell("[Bild 2]", { width: 2350 }), hCell("[Bild 3]", { width: 2350 }), hCell("[Bild 4]", { width: 2350 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Rezept-Schritte — was passiert auf den Bildern? Schreib Saetze."),
    p("[BILD 2: Vier Bilder in falscher Reihenfolge: (a) fertiger Smoothie im Glas, (b) Bananen schaelen, (c) alles in Mixer geben, (d) Mixer einschalten]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 800 }), hCell("Was passiert?", { width: 4500 }), hCell("Richtige Reihenfolge (1-4)", { width: 4338 })] }),
        new TableRow({ children: [dCell("a"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("b"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("c"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("d"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Zutaten identifizieren"),
    p("[BILD 3: Verschiedene Lebensmittel auf einem Tisch: Mehl, Eier, Milch, Butter, Zucker, Apfel — fuer Pfannkuchen markiert mit Nummern 1-6]"),
    empty(),
    p("Welche Zutaten braucht man fuer Pfannkuchen? Kreuze an und schreib die Menge."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[ ] brauche ich", { width: 1500 }), hCell("Zutat (Bild-Nr.)", { width: 3500 }), hCell("Menge", { width: 4638 })] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 1: ____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 2: ____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 3: ____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 4: ____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 5: ____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("[ ]"), dCell("Bild 6: ____________"), dCell("____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Zeichne oder beschreibe dein Lieblingsessen."),
    p("[BILD 4: Leeres Feld zum Zeichnen]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Lieblingsessen:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Das heisst: ___________________________"),
    p("Zutaten: _____________________________"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Einfache Rezepte (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Kochverben (Musterloesung — abhaengig von Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 2350 }), hCell("Verb", { width: 2350 }), hCell("Satz (Muster)", { width: 4938 })] }),
        new TableRow({ children: [dCell("Bild 1"), dCell("waschen"), dCell("Man waescht den Apfel.")] }),
        new TableRow({ children: [dCell("Bild 2"), dCell("schneiden"), dCell("Man schneidet die Banane.")] }),
        new TableRow({ children: [dCell("Bild 3"), dCell("ruehren"), dCell("Man ruehrt den Teig.")] }),
        new TableRow({ children: [dCell("Bild 4"), dCell("schaelen"), dCell("Man schaelt das Gemuese.")] }),
      ],
    }),
    pItalic("Hinweis: Antworten haengen von eingefuegten Bildern ab."),
    empty(),
    pBold("Aufgabe 2: Richtige Reihenfolge (Smoothie-Beispiel)"),
    bullet("b (Bananen schaelen) = Schritt 1"),
    bullet("c (alles in Mixer geben) = Schritt 2"),
    bullet("d (Mixer einschalten) = Schritt 3"),
    bullet("a (fertiger Smoothie im Glas) = Schritt 4"),
    empty(),
    pBold("Aufgabe 3: Zutaten fuer Pfannkuchen"),
    bullet("Mehl (z. B. 200 Gramm) — brauche ich"),
    bullet("Eier (z. B. 2 Eier) — brauche ich"),
    bullet("Milch (z. B. 1 Glas) — brauche ich"),
    bullet("Butter (zum Braten) — brauche ich"),
    bullet("Zucker (optional, nach Geschmack) — brauche ich (optional)"),
    bullet("Apfel — brauche ich NICHT (fuer klassische Pfannkuchen)"),
    pItalic("Hinweis: Mengenangaben variieren — alle realistischen Angaben akzeptieren."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: korrekte Benennung, realistische Zutaten."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Einfache Rezepte verstehen");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
