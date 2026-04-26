"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "08_NaturUmwelt", "02_Umweltthemen");
const TOPIC     = "A2_Kinder_NaturUmwelt_02_Umweltthemen";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Typ", { width: 1400 }), hCell("Beispielsatz", { width: 5438 })] }),
      new TableRow({ children: [dCell("der Muell"), dCell("Nomen"), dCell("Wir muessen unseren Muell richtig trennen.")] }),
      new TableRow({ children: [dCell("die Muelltonne (-n)"), dCell("Nomen"), dCell("Die gelbe Muelltonne ist fuer Plastik und Verpackungen.")] }),
      new TableRow({ children: [dCell("Muell trennen"), dCell("Ausdruck"), dCell("In Deutschland muss man Muell trennen.")] }),
      new TableRow({ children: [dCell("recyceln"), dCell("Verb"), dCell("Papier und Glas koennen wir gut recyceln.")] }),
      new TableRow({ children: [dCell("Wasser sparen"), dCell("Ausdruck"), dCell("Wir koennen Wasser sparen, indem wir kurz duschen.")] }),
      new TableRow({ children: [dCell("der Strom"), dCell("Nomen"), dCell("Wir sparen Strom, wenn wir das Licht ausschalten.")] }),
      new TableRow({ children: [dCell("die Umwelt"), dCell("Nomen"), dCell("Wir muessen die Umwelt schuetzen.")] }),
      new TableRow({ children: [dCell("umweltfreundlich"), dCell("Adjektiv"), dCell("Das Fahrrad ist umweltfreundlicher als das Auto.")] }),
      new TableRow({ children: [dCell("der Kompost"), dCell("Nomen"), dCell("Essensreste kommen auf den Kompost, nicht in den Restmuell.")] }),
      new TableRow({ children: [dCell("die Einwegflasche"), dCell("Nomen"), dCell("Einwegflaschen sind schlechter fuer die Umwelt als Mehrwegflaschen.")] }),
      new TableRow({ children: [dCell("Man sollte ..."), dCell("Ausdruck"), dCell("Man sollte nicht zu lange duschen.")] }),
      new TableRow({ children: [dCell("Es ist wichtig, dass ..."), dCell("Ausdruck"), dCell("Es ist wichtig, dass wir Strom sparen.")] }),
      new TableRow({ children: [dCell("Das schadet der Umwelt."), dCell("Ausdruck"), dCell("Plastikmuell im Meer schadet der Umwelt.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Umweltthemen"), empty(),
    pBold("Aufgabe 1: Wohin kommt der Muell? Ordne zu."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Zeitungen  -  Plastikflasche  -  Bananenschale  -  Joghurtbecher  -  Glasflasche  -  Butterbrotpapier  -  Apfelkerngehaeuse  -  Alufolie  -  Karton  -  altes Handy  -  Blechdose  -  Weinkorken")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Blaue Tonne (Papier)", { width: 2350 }), hCell("Gelbe Tonne (Plastik/Metall)", { width: 2350 }), hCell("Glascontainer", { width: 2350 }), hCell("Biomuell / Kompost", { width: 2588 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    pItalic("Hinweis: Das alte Handy gehoert zum Sondermuell (Wertstoffhof). Schreib es dort hin."),
    empty(), empty(),
    pBold("Aufgabe 2: Was kannst du tun? Schreib Saetze mit 'Man kann ...' oder 'Man sollte ...'."),
    pItalic("Muster: (Licht ausschalten) → Man sollte das Licht ausschalten, wenn man das Zimmer verlaesst."),
    empty(),
    p("1. (kuerzer duschen)  →  ________________________________________________"),
    writeLine(50), empty(),
    p("2. (Fahrrad statt Auto)  →  ________________________________________________"),
    writeLine(50), empty(),
    p("3. (Muell trennen)  →  ________________________________________________"),
    writeLine(50), empty(),
    p("4. (Wasser beim Zaehneputzen abdrehen)  →  ________________________________"),
    writeLine(50), empty(), empty(),
    pBold("Aufgabe 3: Was machst du selbst fuer die Umwelt? Schreib 5-6 Saetze."),
    p("Was tust du schon? Was moechtest du noch tun? Was findest du schwierig?"),
    empty(),
    ...writeLines(6, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Umweltthemen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Blaue Tonne (Papier)", { width: 2350 }), hCell("Gelbe Tonne (Plastik/Metall)", { width: 2350 }), hCell("Glascontainer", { width: 2350 }), hCell("Biomuell / Kompost", { width: 2588 })] }),
        new TableRow({ children: [dCell("Zeitungen, Karton, Butterbrotpapier"), dCell("Plastikflasche, Joghurtbecher, Alufolie, Blechdose"), dCell("Glasflasche, Weinkorken*"), dCell("Bananenschale, Apfelkerngehaeuse")] }),
      ],
    }),
    pItalic("*Weinkorken: je nach Region Restmuell oder Glascontainer — beide Antworten akzeptieren."),
    pItalic("Altes Handy → Sondermuell / Wertstoffhof (nicht in normale Tonnen)."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("1. Man sollte kuerzer duschen, um Wasser zu sparen."),
    bullet("2. Man kann das Fahrrad nehmen statt des Autos — das ist umweltfreundlicher."),
    bullet("3. Man sollte Muell immer richtig trennen, damit er recycelt werden kann."),
    bullet("4. Man sollte das Wasser beim Zaehneputzen abdrehen."),
    pItalic("Auf 'Man sollte + Infinitiv' und 'Man kann + Infinitiv' achten. Begruendung mit 'damit' oder 'weil' ist ein Bonus."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Ich trenne zu Hause immer den Muell. Wir haben vier verschiedene Tonnen. Ich dusche auch nicht zu lange. Was ich noch tun moechte: mehr mit dem Fahrrad fahren statt mit dem Auto. Das finde ich manchmal schwierig, weil der Weg weit ist."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Umweltthemen"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Leas gruener Alltag"),
          empty(),
          p("Lea ist zwoelf Jahre alt und denkt viel an die Umwelt. In ihrer Familie haben sie viele Regeln, die helfen, die Natur zu schuetzen."),
          p("Muell trennen ist bei Leas Familie selbstverstaendlich. Sie haben fuenf verschiedene Behaelter in der Kueche: fuer Papier, Plastik, Glas, Biomuell und Restmuell. 'Am Anfang war das kompliziert,' sagt Lea, 'aber jetzt machen wir es automatisch.'"),
          p("Auch beim Wasser achten sie auf den Verbrauch. Lea duscht hoechstens fuenf Minuten und dreht das Wasser beim Zaehneputzen ab. Ihr Vater hat im Garten eine Regenwassertonne aufgestellt — damit giesst er die Pflanzen, ohne Leitungswasser zu benutzen."),
          p("Strom sparen ist auch wichtig. Wenn Lea ihr Zimmer verlaesst, schaltet sie immer das Licht aus. Ihr Computer geht nach zehn Minuten automatisch in den Schlafmodus."),
          p("'Jeder Mensch kann etwas tun,' sagt Lea. 'Kleine Dinge zaehlen auch!' Sie hofft, dass mehr Menschen so denken."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Leas Familie hat drei Behaelter fuer Muell."), dCell("")] }),
        new TableRow({ children: [dCell("Lea findet Muelltrennen von Anfang an einfach."), dCell("")] }),
        new TableRow({ children: [dCell("Lea duscht maximal fuenf Minuten."), dCell("")] }),
        new TableRow({ children: [dCell("Der Vater nutzt Regenwasser fuer den Garten."), dCell("")] }),
        new TableRow({ children: [dCell("Leas Computer laeuft die ganze Nacht."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was macht Leas Familie beim Thema Muell?"),
    writeLine(55), empty(),
    p("2. Wie spart Leas Familie Wasser? Nenne zwei Beispiele."),
    writeLine(55), empty(),
    p("3. Was macht Lea beim Verlassen des Zimmers?"),
    writeLine(55), empty(),
    p("4. Was wuenscht sich Lea von anderen Menschen?"),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Umweltthemen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Leas Familie hat drei Behaelter fuer Muell."), dCell("F (fuenf Behaelter)")] }),
        new TableRow({ children: [dCell("Lea findet Muelltrennen von Anfang an einfach."), dCell("F (am Anfang kompliziert)")] }),
        new TableRow({ children: [dCell("Lea duscht maximal fuenf Minuten."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Vater nutzt Regenwasser fuer den Garten."), dCell("R")] }),
        new TableRow({ children: [dCell("Leas Computer laeuft die ganze Nacht."), dCell("F (Schlafmodus nach 10 Minuten)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie haben fuenf Behaelter und trennen Muell in Papier, Plastik, Glas, Biomuell und Restmuell."),
    bullet("2. Lea duscht maximal 5 Minuten / dreht Wasser beim Zaehneputzen ab. Vater nutzt Regenwassertonne fuer den Garten."),
    bullet("3. Sie schaltet das Licht aus."),
    bullet("4. Sie hofft, dass mehr Menschen auch umweltbewusst denken und handeln."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Umweltthemen"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("trennen  -  sparen  -  Umwelt  -  recyceln  -  Muelltonne  -  Strom  -  wichtig  -  schadet  -  sollte  -  umweltfreundlich  -  Kompost  -  ausschalten  -  kurz  -  Wasser")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Wir muessen unseren Muell __________________, damit er __________________ werden kann."),
    p("2. Die gelbe __________________ ist fuer Plastik und Verpackungen."),
    p("3. Essensreste kommen nicht in den Restmuell, sondern auf den __________________."),
    p("4. Man __________________ das Licht __________________, wenn man das Zimmer verlaesst."),
    p("5. Das Fahrrad ist __________________ als das Auto."),
    p("6. Plastikmuell im Meer __________________ der __________________."),
    p("7. Es ist __________________, dass wir __________________ und __________________ sparen."),
    p("8. Dusch __________________ — das spart viel Wasser!"),
    empty(),
    pBold("Teil 2: Dialog — Umweltgespraech in der Schule"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Was koennt ihr zu Hause fuer die __________________ tun?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Wir __________________ immer den Muell. Das machen wir schon lange.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich __________________ das Licht aus, wenn ich mein Zimmer verlasse.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Sehr gut! Was noch? Denkt an __________________ sparen.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ich dusche sehr __________________. Maximal vier Minuten!")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Toll! Jeder kleine Schritt ist __________________ fuer unsere Erde.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Deine Meinung — schreib selbst."),
    empty(),
    p("Das Wichtigste fuer die Umwelt ist meiner Meinung nach __________________, weil __________________."),
    p("Ich selbst __________________ schon fuer die Umwelt. Was ich noch tun moechte: __________________."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Umweltthemen (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. trennen — recyceln"),
    bullet("2. Muelltonne"),
    bullet("3. Kompost"),
    bullet("4. sollte — ausschalten"),
    bullet("5. umweltfreundlich"),
    bullet("6. schadet — Umwelt"),
    bullet("7. wichtig — Strom — Wasser"),
    bullet("8. kurz"),
    pItalic("Nicht verwendet (Ablenkwort): sparen (erscheint in 7, aber als Verb im Satz, nicht als Nomen)"),
    empty(),
    pBold("Teil 2: Dialog-Loesung"),
    bullet("Lehrerin: Umwelt"),
    bullet("Ben: trennen"),
    bullet("Mia: schalte ... aus (ausschalten, trennbar)"),
    bullet("Lehrerin: Wasser"),
    bullet("Tom: kurz"),
    bullet("Lehrerin: wichtig"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Das Wichtigste ist meiner Meinung nach Muell trennen, weil so viele Materialien wiederverwendet werden koennen. Ich schalte schon immer das Licht aus und dusche kurz. Was ich noch tun moechte: oefters mit dem Fahrrad fahren."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Umweltthemen"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Die Muelltonnen in Deutschland"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tonne / Container", { width: 2200 }), hCell("Farbe", { width: 1400 }), hCell("Was kommt rein?", { width: 6038 })] }),
        new TableRow({ children: [dCell("Papiertonne"), dCell("blau"), dCell("Zeitungen, Karton, Bucher, Papier")] }),
        new TableRow({ children: [dCell("Wertstofftonne"), dCell("gelb"), dCell("Plastik, Metall, Verpackungen, Joghurtbecher")] }),
        new TableRow({ children: [dCell("Biotonne"), dCell("braun/gruen"), dCell("Essensreste, Obst- und Gemuseschalen, Kaffeesatz")] }),
        new TableRow({ children: [dCell("Restmuelltonne"), dCell("schwarz/grau"), dCell("Alles andere: Windeln, Staubsaugerbeutel ...")] }),
        new TableRow({ children: [dCell("Glascontainer"), dCell("weiss/gruen/braun"), dCell("Glasflaschen und -glaeser (nach Farbe getrennt)")] }),
        new TableRow({ children: [dCell("Sondermuell"), dCell("—"), dCell("Batterien, alte Handys, Farben, Medikamente → Wertstoffhof")] }),
      ],
    }),
    empty(),
    pBold("10 Tipps fuer die Umwelt:"),
    bullet("1. Licht ausschalten, wenn du das Zimmer verlaesst."),
    bullet("2. Kurz duschen (max. 5 Minuten)."),
    bullet("3. Wasser beim Zaehneputzen abdrehen."),
    bullet("4. Muell trennen und recyceln."),
    bullet("5. Fahrrad oder Bus statt Auto nehmen."),
    bullet("6. Keine Einwegplastikprodukte kaufen."),
    bullet("7. Lebensmittel nicht verschwenden."),
    bullet("8. Stecker ziehen bei Geraeten im Standby."),
    bullet("9. Gebrauchte Sachen reparieren statt wegwerfen."),
    bullet("10. In der Natur keinen Muell liegen lassen."),
    empty(),
    pBold("Aufgabe: Schreib 5 Saetze darueber, was du fuer die Umwelt tust oder tun moechtest."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Umweltthemen (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("Man sollte + Infinitiv = Empfehlung/Ratschlag (schwaecher als muss, staerker als kann)"),
    bullet("Es ist wichtig, dass + Nebensatz (Verb am Ende): Es ist wichtig, dass wir Muell trennen."),
    bullet("Das schadet + Dativ: Das schadet der Umwelt / dem Tier / dem Wasser."),
    bullet("Muell trennen: trennbarer Charakter — aber 'Muell' ist hier ein festes Kompositum im Ausdruck, kein trennbares Verb."),
    bullet("umweltfreundlich = umwelt + freundlich; Komparativ: umweltfreundlicher als"),
    empty(),
    pBold("Loesung Aufgabe — Mustersaetze"),
    bullet("Ich trenne immer den Muell in unserer Kueche."),
    bullet("Ich schalte das Licht aus, wenn ich mein Zimmer verlasse."),
    bullet("Ich moechte oefter mit dem Fahrrad fahren statt mit dem Auto."),
    bullet("Man sollte keine Einwegplastikflaschen kaufen."),
    bullet("Es ist wichtig, dass wir Wasser und Strom sparen."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Umweltthemen"), empty(),
    pBold("Dialog 1: Muell trennen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Hey, du wirfst doch nicht die Plastikflasche in den Papiermuell?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Oh, stimmt! Ich war gerade nicht aufmerksam. Wohin kommt sie denn?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("In die gelbe Tonne — die ist fuer Plastik und Verpackungen.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ach so! Und wohin kommen Essensreste?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Die kommen auf den Kompost oder in die braune Biotonne.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ich finde Muelltrennen manchmal verwirrend. So viele verschiedene Tonnen!")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Am Anfang schon, aber man gewoehnt sich schnell daran. Es lohnt sich fuer die Umwelt!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Umwelttipps geben"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Klasse"), dCell("Wir machen ein Umweltprojekt. Was koennen Kinder fuer die Umwelt tun?")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Man sollte kuerzer duschen. Ich dusche nur fuenf Minuten — das spart viel Wasser!")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Man kann auch das Fahrrad nehmen statt des Autos. Das ist umweltfreundlicher.")] }),
        new TableRow({ children: [dCell("Klasse"), dCell("Gute Ideen! Was noch?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Es ist wichtig, dass wir kein Essen wegwerfen. So viele Lebensmittel landen im Muell!")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Und immer das Licht ausschalten! Das kostet wirklich viel Strom.")] }),
        new TableRow({ children: [dCell("Klasse"), dCell("Super! Wir schreiben alles auf fuer unser Plakat.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Umwelt-Debatte"),
    pItalic("Gruppe A: 'Das Wichtigste fuer die Umwelt ist Muell trennen.'"),
    pItalic("Gruppe B: 'Das Wichtigste fuer die Umwelt ist Wasser und Strom sparen.'"),
    pItalic("Jede Gruppe sammelt 3 Argumente und praesentiert sie. Dann diskutiert ihr: Was ist wirklich am wichtigsten?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gruppe A — Muell trennen", { width: 4700 }), hCell("Gruppe B — Wasser/Strom sparen", { width: 4700 })] }),
        new TableRow({ children: [dCell("1. ____________________"), dCell("1. ____________________")] }),
        new TableRow({ children: [dCell("2. ____________________"), dCell("2. ____________________")] }),
        new TableRow({ children: [dCell("3. ____________________"), dCell("3. ____________________")] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Umwelt im Alltag"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Trennt deine Familie den Muell?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du, um Wasser zu sparen?"), dCell("")] }),
        new TableRow({ children: [dCell("Faehrst du manchmal Fahrrad statt Auto?"), dCell("")] }),
        new TableRow({ children: [dCell("Was findest du am schwierigsten beim Umweltschutz?"), dCell("")] }),
        new TableRow({ children: [dCell("Was moechtest du noch fuer die Umwelt tun?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Umweltthemen (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("du wirfst ... nicht ... in = Verneinung + trennbares Verb werfen"),
    bullet("Ich war nicht aufmerksam. = war = Praeteritum von sein"),
    bullet("Wohin kommt sie? = Frage nach Zielort (Wohin? → Akkusativ/Bewegung)"),
    bullet("Man gewoehnt sich daran. = sich gewoehnen an + Akkusativ (reflexives Verb)"),
    bullet("Es lohnt sich fuer die Umwelt. = es lohnt sich = es ist es wert"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Man sollte + Infinitiv = Empfehlung"),
    bullet("Das spart viel Wasser. = sparen ohne Reflexivpronomen"),
    bullet("Es ist wichtig, dass + Nebensatz (Verb am Ende)"),
    bullet("So viele Lebensmittel landen im Muell! = landen = enden / ankommen (bildlich)"),
    empty(),
    pBold("Moegliche Argumente fuer die Debatte:"),
    bullet("Gruppe A: Recycling spart Rohstoffe / weniger Muell in der Natur / einfach im Alltag"),
    bullet("Gruppe B: Wasser ist lebenswichtig / Strom aus fossilen Brennstoffen schadet Klima / sofortiger Effekt"),
    pItalic("Ziel der Debatte: Argumente formulieren und verteidigen. Kein 'richtiges' Ergebnis — Prozess ist wichtig."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Umweltthemen"), empty(),
    pBold("Aufgabe 1: Welche Muelltonne ist das? Schreib die Farbe und was hineinkommt."),
    p("[BILD 1: Vier Muelltonnen in verschiedenen Farben (blau, gelb, braun, schwarz) mit Fragezeichen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tonne", { width: 1500 }), hCell("Farbe", { width: 1800 }), hCell("Was kommt rein?", { width: 6338 })] }),
        new TableRow({ children: [dCell("Tonne A"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Tonne B"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Tonne C"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Tonne D"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Gut oder schlecht fuer die Umwelt? Kreuze an und schreib einen Satz."),
    p("[BILD 2: Sechs Bilder — Fahrrad fahren, Plastikflasche wegwerfen, Licht anlassen, kurz duschen, Muell trennen, Auto fuer kurze Strecken nehmen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1200 }), hCell("Gut fuer Umwelt", { width: 1800 }), hCell("Schlecht fuer Umwelt", { width: 1800 }), hCell("Dein Satz", { width: 4838 })] }),
        new TableRow({ children: [dCell("A"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("B"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("C"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("D"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("E"), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("F"), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Lies das Umwelt-Plakat und beantworte die Fragen."),
    p("[BILD 3: Schulplakat mit Titel 'Unsere Klasse schuetzt die Umwelt!' — drei Punkte: 1. Wir trennen Muell in der Schule. 2. Wir nehmen Trinkflaschen statt Plastikflaschen. 3. Wir drehen das Licht aus, wenn wir den Raum verlassen.]"),
    empty(),
    p("1. Was macht die Klasse mit Muell?  ____________________"),
    p("2. Wie spart die Klasse Plastik?  ____________________"),
    p("3. Was machen die Schueler, wenn sie den Raum verlassen?  ____________________"),
    p("4. Schreib einen weiteren Tipp fuer das Plakat:  ____________________"),
    empty(),
    pBold("Aufgabe 4: Entwirf dein eigenes Umwelt-Plakat."),
    p("[BILD 4: Leeres Plakat-Rahmen mit Titel-Zeile und Platz fuer 4 Tipps]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          pBold("Titel: ____________________"),
          empty(),
          p("1. Wir ____________________"),
          p("2. Wir ____________________"),
          p("3. Man sollte ____________________"),
          p("4. Es ist wichtig, dass ____________________"),
        ],
      })]})],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Umweltthemen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Muelltonnen (abhaengig von Bildreihenfolge)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tonne", { width: 1500 }), hCell("Farbe", { width: 1800 }), hCell("Was kommt rein?", { width: 6338 })] }),
        new TableRow({ children: [dCell("Papiertonne"), dCell("blau"), dCell("Zeitungen, Karton, Papier")] }),
        new TableRow({ children: [dCell("Wertstofftonne"), dCell("gelb"), dCell("Plastik, Metall, Verpackungen")] }),
        new TableRow({ children: [dCell("Biotonne"), dCell("braun"), dCell("Essensreste, Schalen, Kaffeesatz")] }),
        new TableRow({ children: [dCell("Restmuelltonne"), dCell("schwarz/grau"), dCell("Alles andere")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Gut/Schlecht (abhaengig von Bildreihenfolge)"),
    pItalic("Fahrrad fahren = gut / Plastikflasche wegwerfen = schlecht / Licht anlassen = schlecht / kurz duschen = gut / Muell trennen = gut / Auto fuer kurze Strecken = schlecht"),
    pItalic("Mustersaetze: Das Fahrradfahren ist gut fuer die Umwelt. / Das Lichtanlassen schadet der Umwelt."),
    empty(),
    pBold("Aufgabe 3: Antworten"),
    bullet("1. Sie trennen den Muell in der Schule."),
    bullet("2. Sie nehmen Trinkflaschen statt Plastikflaschen."),
    bullet("3. Sie drehen das Licht aus."),
    bullet("4. Eigene Antwort — z. B.: Wir nehmen das Fahrrad zur Schule."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Titel sinnvoll, 4 Tipps sprachlich korrekt, Man sollte + Infinitiv und Es ist wichtig, dass + Nebensatz korrekt verwendet."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Einfache Umweltthemen (Muell trennen, Wasser sparen)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
