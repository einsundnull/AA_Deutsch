"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "03_Plural");
const TOPIC     = "A1_Kinder_GrammatikMinimum_03_Plural";
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

// ── Plural-Tabelle ───────────────────────────────────────────────────────────
function makePluralTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Singular", { width: 3166 }), hCell("Plural", { width: 3168 }), hCell("Endung", { width: 3166 })] }),
      new TableRow({ children: [dCell("der Hund"),       dCell("die Hunde"),         dCell("-e")] }),
      new TableRow({ children: [dCell("der Tisch"),      dCell("die Tische"),        dCell("-e")] }),
      new TableRow({ children: [dCell("die Katze"),      dCell("die Katzen"),        dCell("-n")] }),
      new TableRow({ children: [dCell("die Lampe"),      dCell("die Lampen"),        dCell("-n")] }),
      new TableRow({ children: [dCell("die Frau"),       dCell("die Frauen"),        dCell("-en")] }),
      new TableRow({ children: [dCell("die Tuer"),       dCell("die Tueren"),        dCell("-en")] }),
      new TableRow({ children: [dCell("das Kind"),       dCell("die Kinder"),        dCell("-er")] }),
      new TableRow({ children: [dCell("das Buch"),       dCell("die Buecher"),       dCell("-er + Umlaut")] }),
      new TableRow({ children: [dCell("der Apfel"),      dCell("die Aepfel"),        dCell("Umlaut")] }),
      new TableRow({ children: [dCell("die Mutter"),     dCell("die Muetter"),       dCell("Umlaut")] }),
      new TableRow({ children: [dCell("das Auto"),       dCell("die Autos"),         dCell("-s")] }),
      new TableRow({ children: [dCell("das Maedchen"),   dCell("die Maedchen"),      dCell("- (gleich)")] }),
      new TableRow({ children: [dCell("das Fenster"),    dCell("die Fenster"),       dCell("- (gleich)")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Plural einfacher Nomen"), empty(),
    pBold("Wichtig: Im Plural ist der Artikel IMMER 'die'!"),
    bullet("der Hund → die Hunde"),
    bullet("die Katze → die Katzen"),
    bullet("das Buch → die Buecher"),
    empty(),
    pBold("Aufgabe 1: Schreib den Plural."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Singular", { width: 4750 }), hCell("Plural", { width: 4750 })] }),
        new TableRow({ children: [dCell("der Hund"),     dCell("die ____________________")] }),
        new TableRow({ children: [dCell("die Katze"),    dCell("die ____________________")] }),
        new TableRow({ children: [dCell("das Kind"),     dCell("die ____________________")] }),
        new TableRow({ children: [dCell("der Tisch"),    dCell("die ____________________")] }),
        new TableRow({ children: [dCell("das Auto"),     dCell("die ____________________")] }),
        new TableRow({ children: [dCell("der Apfel"),    dCell("die ____________________")] }),
        new TableRow({ children: [dCell("die Mutter"),   dCell("die ____________________")] }),
        new TableRow({ children: [dCell("das Buch"),     dCell("die ____________________")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib den Singular."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Plural", { width: 4750 }), hCell("Singular (mit Artikel)", { width: 4750 })] }),
        new TableRow({ children: [dCell("die Lampen"),    dCell("____ ____________________")] }),
        new TableRow({ children: [dCell("die Frauen"),    dCell("____ ____________________")] }),
        new TableRow({ children: [dCell("die Stuehle"),   dCell("____ ____________________")] }),
        new TableRow({ children: [dCell("die Maedchen"),  dCell("____ ____________________")] }),
        new TableRow({ children: [dCell("die Hunde"),     dCell("____ ____________________")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze im Plural."),
    p("Beispiel: Die Kinder spielen im Garten. Die Hunde laufen schnell."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Plural (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Plural"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Singular", { width: 4750 }), hCell("Plural", { width: 4750 })] }),
        new TableRow({ children: [dCell("der Hund"),     dCell("die Hunde")] }),
        new TableRow({ children: [dCell("die Katze"),    dCell("die Katzen")] }),
        new TableRow({ children: [dCell("das Kind"),     dCell("die Kinder")] }),
        new TableRow({ children: [dCell("der Tisch"),    dCell("die Tische")] }),
        new TableRow({ children: [dCell("das Auto"),     dCell("die Autos")] }),
        new TableRow({ children: [dCell("der Apfel"),    dCell("die Aepfel")] }),
        new TableRow({ children: [dCell("die Mutter"),   dCell("die Muetter")] }),
        new TableRow({ children: [dCell("das Buch"),     dCell("die Buecher")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Singular"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Plural", { width: 4750 }), hCell("Singular", { width: 4750 })] }),
        new TableRow({ children: [dCell("die Lampen"),    dCell("die Lampe")] }),
        new TableRow({ children: [dCell("die Frauen"),    dCell("die Frau")] }),
        new TableRow({ children: [dCell("die Stuehle"),   dCell("der Stuhl")] }),
        new TableRow({ children: [dCell("die Maedchen"),  dCell("das Maedchen")] }),
        new TableRow({ children: [dCell("die Hunde"),     dCell("der Hund")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Die Kinder spielen im Garten. Die Hunde laufen schnell. Die Katzen schlafen auf dem Sofa. Die Aepfel liegen auf dem Tisch."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Plural"), empty(),
    pBold("Lies den Text. Markiere alle Plural-Nomen!"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute besuchen wir den Zoo. Wir sind viele Kinder!"),
          p("Im Zoo sind viele Tiere. Da sind drei grosse Elefanten."),
          p("Daneben sehen wir vier Affen. Sie spielen mit Bananen."),
          p("Die Loewen schlafen in der Sonne. Sie haben goldene Haare."),
          p("Im Wasser schwimmen zwei Pinguine."),
          p("Mama kauft uns Eis. Wir essen die Eis am Tisch."),
          p("Auf dem Tisch liegen auch viele Aepfel und Brote."),
          p("Am Ende sind alle muede, aber gluecklich. Das war ein toller Tag!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Schreib den Plural."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Singular", { width: 4750 }), hCell("Plural (aus dem Text)", { width: 4750 })] }),
        new TableRow({ children: [dCell("das Kind"),     dCell("die ____________")] }),
        new TableRow({ children: [dCell("das Tier"),     dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Elefant"),  dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Affe"),     dCell("die ____________")] }),
        new TableRow({ children: [dCell("die Banane"),   dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Loewe"),    dCell("die ____________")] }),
        new TableRow({ children: [dCell("der Apfel"),    dCell("die ____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie viele Elefanten sind im Zoo?"),
    writeLine(55), empty(),
    p("2. Womit spielen die Affen?"),
    writeLine(55), empty(),
    p("3. Was machen die Loewen?"),
    writeLine(55), empty(),
    p("4. Wie viele Pinguine schwimmen im Wasser?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Wie viele Plural-Nomen findest du im Text? Schreib 6 davon auf:"),
    writeLine(55), empty(), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Plural (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Plural"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Singular", { width: 4750 }), hCell("Plural", { width: 4750 })] }),
        new TableRow({ children: [dCell("das Kind"),     dCell("die Kinder")] }),
        new TableRow({ children: [dCell("das Tier"),     dCell("die Tiere")] }),
        new TableRow({ children: [dCell("der Elefant"),  dCell("die Elefanten")] }),
        new TableRow({ children: [dCell("der Affe"),     dCell("die Affen")] }),
        new TableRow({ children: [dCell("die Banane"),   dCell("die Bananen")] }),
        new TableRow({ children: [dCell("der Loewe"),    dCell("die Loewen")] }),
        new TableRow({ children: [dCell("der Apfel"),    dCell("die Aepfel")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Drei (grosse) Elefanten sind im Zoo."),
    bullet("2. Sie spielen mit Bananen."),
    bullet("3. Die Loewen schlafen in der Sonne."),
    bullet("4. Zwei Pinguine schwimmen im Wasser."),
    empty(),
    pBold("Aufgabe 3: Plural-Nomen im Text"),
    p("Kinder, Tiere, Elefanten, Affen, Bananen, Loewen, Haare, Pinguine, Aepfel, Brote"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Plural"), empty(),
    pBold("Woerterkasten — Pluralformen:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Hunde  -  Katzen  -  Kinder  -  Tische  -  Stuehle  -  Buecher  -  Aepfel  -  Bananen  -  Autos  -  Lampen  -  Frauen  -  Maenner")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Schreib den Plural."),
    empty(),
    p("1. Im Garten spielen drei __________________ (Hund). Sie sind sehr lustig."),
    p("2. Auf dem Tisch liegen vier __________________ (Apfel)."),
    p("3. Im Klassenzimmer sind zwoelf __________________ (Stuhl)."),
    p("4. Die __________________ (Frau) kaufen Brot."),
    p("5. Wir lesen viele __________________ (Buch) in der Schule."),
    p("6. Drei __________________ (Auto) parken vor dem Haus."),
    empty(),
    pBold("Teil 2: Singular oder Plural? Schreib das Verb richtig."),
    empty(),
    p("1. Der Hund __________________ (sein) klein."),
    p("2. Die Hunde __________________ (sein) klein."),
    p("3. Das Kind __________________ (haben) ein Buch."),
    p("4. Die Kinder __________________ (haben) Buecher."),
    p("5. Die Katze __________________ (schlafen)."),
    p("6. Die Katzen __________________ (schlafen)."),
    empty(),
    pBold("Teil 3: Dialog – Im Geschaeft"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Was moechtest du?")] }),
        new TableRow({ children: [dCell("Mia"),           dCell("Ich moechte fuenf __________________ (Apfel), bitte.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Gern! Sonst noch etwas?")] }),
        new TableRow({ children: [dCell("Mia"),           dCell("Ja, drei __________________ (Banane) und zwei __________________ (Buch).")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Buecher? Hier sind nur Lebensmittel!")] }),
        new TableRow({ children: [dCell("Mia"),           dCell("Oh, Entschuldigung! Dann nur die Aepfel und Bananen.")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Plural (LOESUNG)"), empty(),
    pBold("Teil 1: Plural"),
    bullet("1. Hunde"), bullet("2. Aepfel"), bullet("3. Stuehle"),
    bullet("4. Frauen"), bullet("5. Buecher"), bullet("6. Autos"),
    empty(),
    pBold("Teil 2: Verb"),
    bullet("1. ist (Singular)"), bullet("2. sind (Plural)"),
    bullet("3. hat (Singular)"), bullet("4. haben (Plural)"),
    bullet("5. schlaeft (Singular)"), bullet("6. schlafen (Plural)"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Mia: ... fuenf Aepfel, bitte."),
    bullet("Mia: ... drei Bananen und zwei Buecher."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Plural"), empty(),
    pBold("Wichtig: Im Plural ist der Artikel IMMER 'die' — egal welches Genus im Singular!"),
    empty(),
    h2("Die haeufigsten Pluralendungen"),
    makePluralTable(),
    empty(),
    h2("Faustregeln"),
    pBold("Endung -e (oft maskulin):"),
    bullet("der Tisch → die Tische"),
    bullet("der Hund → die Hunde"),
    bullet("der Stuhl → die Stuehle (Umlaut!)"),
    empty(),
    pBold("Endung -n / -en (oft feminin):"),
    bullet("die Lampe → die Lampen"),
    bullet("die Katze → die Katzen"),
    bullet("die Frau → die Frauen"),
    bullet("die Tuer → die Tueren"),
    empty(),
    pBold("Endung -er (oft kurze neutrum-Nomen):"),
    bullet("das Kind → die Kinder"),
    bullet("das Buch → die Buecher (Umlaut!)"),
    bullet("das Haus → die Haeuser (Umlaut!)"),
    empty(),
    pBold("Endung -s (oft Fremdwoerter):"),
    bullet("das Auto → die Autos"),
    bullet("das Foto → die Fotos"),
    bullet("der Park → die Parks"),
    empty(),
    pBold("Keine Endung (oft -er/-el/-en oder -chen/-lein):"),
    bullet("das Fenster → die Fenster"),
    bullet("der Lehrer → die Lehrer"),
    bullet("das Maedchen → die Maedchen"),
    empty(),
    pBold("Aufgabe: Schreib zu jeder Endung 3 eigene Beispiele."),
    p("-e:"), writeLine(55), empty(),
    p("-en/-n:"), writeLine(55), empty(),
    p("-er:"), writeLine(55), empty(),
    p("-s:"), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Plural (LOESUNG)"), empty(),
    makePluralTable(),
    empty(),
    pBold("Wichtige Regeln zusammengefasst:"),
    bullet("Plural-Artikel ist IMMER 'die'."),
    bullet("Plural-Form muss man auswendig lernen — keine 100% Regel!"),
    bullet("Tipp: Beim Vokabellernen IMMER Singular + Plural mitlernen."),
    empty(),
    pBold("Beispielloesungen:"),
    bullet("-e: die Tische, die Hunde, die Tage"),
    bullet("-en/-n: die Frauen, die Lampen, die Schulen"),
    bullet("-er: die Kinder, die Buecher, die Eier"),
    bullet("-s: die Autos, die Fotos, die Babys"),
    empty(),
    pBold("Achtung: Umlaute"),
    bullet("Manche Pluralformen bekommen Umlaut: a→ae, o→oe, u→ue"),
    bullet("Beispiel: der Apfel → die Aepfel, die Mutter → die Muetter"),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Plural"), empty(),
    pBold("Dialog 1: Im Klassenzimmer"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Wie viele Kinder sind heute da?")] }),
        new TableRow({ children: [dCell("Anna"),     dCell("18 Kinder, Frau Schmidt!")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Und wie viele Buecher haben wir?")] }),
        new TableRow({ children: [dCell("Tom"),      dCell("Auf dem Regal sind 30 Buecher.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Habt ihr alle eure Stifte?")] }),
        new TableRow({ children: [dCell("Tom"),      dCell("Ja! Wir haben unsere Stifte und unsere Hefte.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Sehr gut! Dann koennen wir anfangen.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Auf dem Markt"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mama"),         dCell("Wir brauchen Aepfel und Bananen.")] }),
        new TableRow({ children: [dCell("Lisa"),         dCell("Wie viele Aepfel?")] }),
        new TableRow({ children: [dCell("Mama"),         dCell("Sechs Aepfel und vier Bananen.")] }),
        new TableRow({ children: [dCell("Lisa"),         dCell("Brauchen wir auch Eier?")] }),
        new TableRow({ children: [dCell("Mama"),         dCell("Ja, zehn Eier bitte.")] }),
        new TableRow({ children: [dCell("Verkaeufer"),   dCell("Hier — sechs Aepfel, vier Bananen und zehn Eier!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Wie viele?"),
    p("Frag deinen Partner mit 'Wie viele ... hast du?' und bekomme Plural-Antworten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort (mit Plural!)", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie viele Geschwister hast du?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Buecher hast du?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Stifte hast du?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Freunde hast du?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Tiere habt ihr zu Hause?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Plural-Memo"),
    bullet("Lehrkraft sagt einen Singular: 'Hund!'"),
    bullet("Wer zuerst 'die Hunde!' ruft, bekommt einen Punkt."),
    bullet("Schwerere Variante: 'Apfel!' → 'die Aepfel!' (mit Umlaut!)"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Plural (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie viele Kinder sind heute da? — Wie viele + Plural-Nomen + sein/sind"),
    bullet("18 Kinder — Zahl + Plural-Nomen ohne Artikel"),
    bullet("Habt ihr alle eure Stifte? — eure (Plural-Possessiv) + Plural-Nomen"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wir brauchen + Plural-Akkusativ"),
    bullet("Wie viele Aepfel? — Frage nach Anzahl"),
    bullet("zehn Eier — wieder: Zahl + Plural"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Pluralform (1P)"),
    bullet("Antwort: Zahl + Plural-Nomen (z. B. 'zwei Brueder' statt nur 'zwei')"),
    bullet("Verb in Plural-Form (sind / haben)"),
    empty(),
    pBold("Beispielantworten:"),
    bullet("Ich habe einen Bruder. / Ich habe zwei Schwestern."),
    bullet("Ich habe drei Buecher in meiner Tasche."),
    bullet("Wir haben zwei Hunde und eine Katze."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Plural"), empty(),
    pBold("Aufgabe 1: [BILD 1: 6 Bilder mit jeweils einem oder mehreren Gegenstaenden]"),
    p("Schreib den Plural unter jedes Bild."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD: 3 Hunde]", { width: 3166 }), hCell("[BILD: 4 Aepfel]", { width: 3168 }), hCell("[BILD: 2 Katzen]", { width: 3166 })] }),
        new TableRow({ children: [dCell("die ____________"), dCell("die ____________"), dCell("die ____________")] }),
        new TableRow({ children: [hCell("[BILD: 5 Buecher]", { width: 3166 }), hCell("[BILD: 6 Kinder]", { width: 3168 }), hCell("[BILD: 4 Autos]", { width: 3166 })] }),
        new TableRow({ children: [dCell("die ____________"), dCell("die ____________"), dCell("die ____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Klassenzimmer-Szene mit vielen Gegenstaenden und Personen]"),
    p("Was siehst du? Schreib 5 Saetze im PLURAL."),
    p("Beispiel: Im Bild sind viele Kinder. Auf den Tischen liegen Buecher."),
    empty(),
    ...writeLines(5, 55),
    empty(),
    pBold("Aufgabe 3: Zaehl und schreib"),
    p("Schau das Bild an. Wie viele Sachen siehst du?"),
    p("[BILD 3: Korb mit Obst und Gemuese]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Sache", { width: 4750 }), hCell("Wie viele?", { width: 4750 })] }),
        new TableRow({ children: [dCell("Aepfel"),    dCell("____________")] }),
        new TableRow({ children: [dCell("Bananen"),   dCell("____________")] }),
        new TableRow({ children: [dCell("Eier"),      dCell("____________")] }),
        new TableRow({ children: [dCell("Tomaten"),   dCell("____________")] }),
        new TableRow({ children: [dCell("Karotten"),  dCell("____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Male 2 Sachen — eine im Singular, eine im Plural."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({
          shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 160, right: 160 },
          width: { size: (PAGE_W - 2 * MARGIN) / 2, type: WidthType.DXA },
          children: [p("Singular:"), empty(), empty(), p("Das ist _______________")],
        }),
        new TableCell({
          shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 160, right: 160 },
          width: { size: (PAGE_W - 2 * MARGIN) / 2, type: WidthType.DXA },
          children: [p("Plural:"), empty(), empty(), p("Das sind _______________")],
        }),
      ] })],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Plural (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Plural-Formen"),
    bullet("die Hunde, die Aepfel, die Katzen"),
    bullet("die Buecher, die Kinder, die Autos"),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("Im Bild sind viele Kinder."),
    bullet("Auf den Tischen liegen Buecher und Stifte."),
    bullet("An der Wand haengen Bilder."),
    bullet("Die Lehrerin steht vor der Tafel."),
    bullet("Die Stuehle sind blau."),
    empty(),
    pBold("Aufgabe 3: Loesung haengt vom Bild ab"),
    pItalic("Beispiel: 5 Aepfel, 3 Bananen, 6 Eier, 4 Tomaten, 2 Karotten."),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort"),
    pItalic("Beispiel Singular: Das ist ein Hund. — Beispiel Plural: Das sind drei Hunde."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Plural einfacher Nomen");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
