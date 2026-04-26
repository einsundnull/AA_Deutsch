"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "04_Wortstellung");
const TOPIC     = "A1_Kinder_GrammatikMinimum_04_Wortstellung";
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

// ── Wortstellung-Tabelle (Aussagesatz) ────────────────────────────────────────
function makeAussagesatzTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Position 1", { width: 2375 }), hCell("Position 2 (VERB!)", { width: 2375 }), hCell("Position 3", { width: 2375 }), hCell("Position 4", { width: 2375 })] }),
      new TableRow({ children: [dCell("Ich"),       dCell("heisse"),  dCell("Anna."),       dCell("")] }),
      new TableRow({ children: [dCell("Tom"),       dCell("spielt"),  dCell("Fussball."),   dCell("")] }),
      new TableRow({ children: [dCell("Wir"),       dCell("essen"),   dCell("einen Apfel."),dCell("")] }),
      new TableRow({ children: [dCell("Heute"),     dCell("ist"),     dCell("das Wetter"),  dCell("schoen.")] }),
      new TableRow({ children: [dCell("Im Sommer"), dCell("schwimme"),dCell("ich"),         dCell("im See.")] }),
      new TableRow({ children: [dCell("Mama"),      dCell("kauft"),   dCell("Brot"),        dCell("im Geschaeft.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

function makeFrageTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("W-Wort / Verb", { width: 2375 }), hCell("Verb / Subjekt", { width: 2375 }), hCell("Subjekt / Rest", { width: 2375 }), hCell("Rest", { width: 2375 })] }),
      new TableRow({ children: [dCell("Wie"),       dCell("heisst"),  dCell("du?"),         dCell("")] }),
      new TableRow({ children: [dCell("Wo"),        dCell("wohnst"),  dCell("du?"),         dCell("")] }),
      new TableRow({ children: [dCell("Wann"),      dCell("kommst"),  dCell("du"),          dCell("nach Hause?")] }),
      new TableRow({ children: [dCell("Was"),       dCell("isst"),    dCell("du"),          dCell("zum Fruehstueck?")] }),
      new TableRow({ children: [dCell("Bist"),      dCell("du"),      dCell("muede?"),      dCell("")] }),
      new TableRow({ children: [dCell("Spielst"),   dCell("du"),      dCell("Fussball?"),   dCell("")] }),
      new TableRow({ children: [dCell("Hat"),       dCell("er"),      dCell("einen Hund?"), dCell("")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Wortstellung"), empty(),
    pBold("Goldene Regel: Im Aussagesatz steht das VERB IMMER auf POSITION 2!"),
    empty(),
    h2("So sieht ein deutscher Satz aus:"),
    makeAussagesatzTable(),
    empty(),
    pBold("Aufgabe 1: Schreib die Saetze richtig (Verb auf Position 2!)."),
    empty(),
    p("1. spielt / Tom / Fussball"),
    writeLine(55), empty(),
    p("2. ich / Schokolade / mag"),
    writeLine(55), empty(),
    p("3. wir / Hausaufgaben / haben"),
    writeLine(55), empty(),
    p("4. heisse / Anna / ich"),
    writeLine(55), empty(),
    p("5. ein Buch / liest / Mama"),
    writeLine(55), empty(),
    p("6. Eis / die Kinder / essen"),
    writeLine(55), empty(),
    pBold("Aufgabe 2: Mit Zeitangabe am Anfang — Verb bleibt auf Position 2!"),
    empty(),
    p("1. ich / im Sommer / schwimme / im See"),
    writeLine(55), empty(),
    p("2. spielen / heute / wir / Fussball"),
    writeLine(55), empty(),
    p("3. fahren / morgen / wir / nach Berlin"),
    writeLine(55), empty(),
    p("4. ich / am Montag / habe / Schule"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze. Beginn jeden Satz anders!"),
    p("Satz 1: mit 'Ich' beginnen."),
    p("Satz 2: mit 'Heute' beginnen."),
    p("Satz 3: mit 'Im Sommer' beginnen."),
    p("Satz 4: mit deinem Namen beginnen."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Wortstellung (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Saetze sortieren"),
    bullet("1. Tom spielt Fussball."),
    bullet("2. Ich mag Schokolade."),
    bullet("3. Wir haben Hausaufgaben."),
    bullet("4. Ich heisse Anna."),
    bullet("5. Mama liest ein Buch."),
    bullet("6. Die Kinder essen Eis."),
    empty(),
    pBold("Aufgabe 2: Mit Zeitangabe"),
    bullet("1. Im Sommer schwimme ich im See."),
    bullet("2. Heute spielen wir Fussball."),
    bullet("3. Morgen fahren wir nach Berlin."),
    bullet("4. Am Montag habe ich Schule."),
    pItalic("Achtung: Verb steht IMMER an Position 2 — auch wenn der Satz mit einer Zeitangabe beginnt!"),
    empty(),
    pBold("Aufgabe 3: Musterantworten"),
    bullet("Ich gehe in die Schule."),
    bullet("Heute ist das Wetter schoen."),
    bullet("Im Sommer fahre ich ans Meer."),
    bullet("Lisa hat einen Hund."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Wortstellung"), empty(),
    pBold("Lies den Text. Markiere alle Verben!"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute ist Samstag. Ich habe frei!"),
          p("Am Morgen esse ich Fruehstueck mit meiner Familie."),
          p("Mama macht Pfannkuchen. Sie schmecken super!"),
          p("Um 10 Uhr gehe ich zu meinem Freund Tom."),
          p("Wir spielen Fussball im Park."),
          p("Am Nachmittag kommt meine Schwester. Sie bringt Eis mit."),
          p("Wir sehen einen Film und essen das Eis."),
          p("Am Abend lese ich ein Buch in meinem Zimmer."),
          p("Ich liebe Samstage!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Welches Verb steht auf Position 2? Schreib es."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz", { width: 6500 }), hCell("Verb (Position 2)", { width: 3000 })] }),
        new TableRow({ children: [dCell("Heute ist Samstag."),                     dCell("")] }),
        new TableRow({ children: [dCell("Am Morgen esse ich Fruehstueck."),        dCell("")] }),
        new TableRow({ children: [dCell("Mama macht Pfannkuchen."),                dCell("")] }),
        new TableRow({ children: [dCell("Um 10 Uhr gehe ich zu meinem Freund."),   dCell("")] }),
        new TableRow({ children: [dCell("Wir spielen Fussball im Park."),          dCell("")] }),
        new TableRow({ children: [dCell("Am Abend lese ich ein Buch."),            dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen. Achte auf die Wortstellung!"),
    empty(),
    p("1. Was isst der Junge am Morgen?"),
    writeLine(55), empty(),
    p("2. Was machen Tom und der Junge im Park?"),
    writeLine(55), empty(),
    p("3. Was bringt die Schwester mit?"),
    writeLine(55), empty(),
    p("4. Was macht der Junge am Abend?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schau dir den Text genau an. Was steht im Text immer auf Position 1? Schreib 4 Beispiele:"),
    writeLine(55),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Wortstellung (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Verben auf Position 2"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satz", { width: 6500 }), hCell("Verb", { width: 3000 })] }),
        new TableRow({ children: [dCell("Heute ist Samstag."),                     dCell("ist")] }),
        new TableRow({ children: [dCell("Am Morgen esse ich Fruehstueck."),        dCell("esse")] }),
        new TableRow({ children: [dCell("Mama macht Pfannkuchen."),                dCell("macht")] }),
        new TableRow({ children: [dCell("Um 10 Uhr gehe ich zu meinem Freund."),   dCell("gehe")] }),
        new TableRow({ children: [dCell("Wir spielen Fussball im Park."),          dCell("spielen")] }),
        new TableRow({ children: [dCell("Am Abend lese ich ein Buch."),            dCell("lese")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Am Morgen isst er Pfannkuchen."),
    bullet("2. Sie spielen Fussball."),
    bullet("3. Sie bringt Eis mit."),
    bullet("4. Am Abend liest er ein Buch."),
    empty(),
    pBold("Aufgabe 3: Position 1 im Text"),
    p("Position 1 ist NICHT immer das Subjekt!"),
    bullet("Heute (Zeitangabe)"),
    bullet("Am Morgen (Zeitangabe)"),
    bullet("Um 10 Uhr (Zeitangabe)"),
    bullet("Am Abend (Zeitangabe)"),
    pItalic("Wichtig: Wenn eine Zeitangabe an Position 1 steht, kommt das SUBJEKT NACH dem Verb!"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Wortstellung"), empty(),
    pBold("Teil 1: Schreib die Saetze in der richtigen Reihenfolge."),
    empty(),
    p("1. Subjekt: ich  /  Verb: spiele  /  Objekt: Klavier"),
    writeLine(55), empty(),
    p("2. Subjekt: Mama  /  Verb: kocht  /  Objekt: das Essen"),
    writeLine(55), empty(),
    p("3. Subjekt: Tom und Lisa  /  Verb: lernen  /  Objekt: Deutsch"),
    writeLine(55), empty(),
    pBold("Teil 2: Frage oder Aussage? Schreib das Verb in die Luecke."),
    empty(),
    p("1. Aussage: Anna __________________ in die Schule. (gehen)"),
    p("2. Frage: __________________ Anna in die Schule? (gehen)"),
    p("3. Aussage: Tom __________________ einen Hund. (haben)"),
    p("4. Frage: __________________ Tom einen Hund? (haben)"),
    p("5. Aussage: Wir __________________ heute Pizza. (essen)"),
    p("6. Frage: __________________ wir heute Pizza? (essen)"),
    empty(),
    pBold("Teil 3: W-Fragen — Schreib das richtige W-Wort."),
    empty(),
    p("Woerter: Wer / Was / Wo / Wann / Wie"),
    empty(),
    p("1. __________________ heisst du?"),
    p("2. __________________ wohnst du?"),
    p("3. __________________ ist das? (eine Person)"),
    p("4. __________________ machst du am Wochenende?"),
    p("5. __________________ kommst du nach Hause?"),
    empty(),
    pBold("Teil 4: Position 1 — Setz die Zeitangabe an den Anfang!"),
    empty(),
    p("Beispiel: Ich gehe heute in die Schule. → Heute gehe ich in die Schule."),
    empty(),
    p("1. Wir spielen am Samstag Fussball."),
    writeLine(55), empty(),
    p("2. Mama backt im Dezember Pluetzchen."),
    writeLine(55), empty(),
    p("3. Ich fahre morgen ans Meer."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Wortstellung (LOESUNG)"), empty(),
    pBold("Teil 1: Saetze bauen"),
    bullet("1. Ich spiele Klavier."),
    bullet("2. Mama kocht das Essen."),
    bullet("3. Tom und Lisa lernen Deutsch."),
    empty(),
    pBold("Teil 2: Aussage / Frage"),
    bullet("1. Anna geht in die Schule."),
    bullet("2. Geht Anna in die Schule?"),
    bullet("3. Tom hat einen Hund."),
    bullet("4. Hat Tom einen Hund?"),
    bullet("5. Wir essen heute Pizza."),
    bullet("6. Essen wir heute Pizza?"),
    empty(),
    pBold("Teil 3: W-Fragen"),
    bullet("1. Wie heisst du?"),
    bullet("2. Wo wohnst du?"),
    bullet("3. Wer ist das?"),
    bullet("4. Was machst du am Wochenende?"),
    bullet("5. Wann kommst du nach Hause?"),
    empty(),
    pBold("Teil 4: Position 1 — Zeitangabe"),
    bullet("1. Am Samstag spielen wir Fussball."),
    bullet("2. Im Dezember backt Mama Pluetzchen."),
    bullet("3. Morgen fahre ich ans Meer."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Wortstellung"), empty(),
    pBold("Drei Satzarten — drei Wortstellungen:"),
    empty(),
    h2("1) Aussagesatz: Verb auf Position 2"),
    makeAussagesatzTable(),
    empty(),
    h2("2) Fragesatz mit W-Wort: W-Wort + Verb auf Position 2"),
    h2("3) Ja/Nein-Frage: Verb auf Position 1"),
    makeFrageTable(),
    empty(),
    h2("Die wichtigsten W-Woerter"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("W-Wort", { width: 2500 }), hCell("Bedeutung", { width: 3000 }), hCell("Beispielfrage", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wer?"),    dCell("welche Person"),    dCell("Wer ist das?")] }),
        new TableRow({ children: [dCell("Was?"),    dCell("welche Sache"),     dCell("Was machst du?")] }),
        new TableRow({ children: [dCell("Wo?"),     dCell("welcher Ort"),      dCell("Wo wohnst du?")] }),
        new TableRow({ children: [dCell("Wann?"),   dCell("welche Zeit"),      dCell("Wann kommst du?")] }),
        new TableRow({ children: [dCell("Wie?"),    dCell("Art und Weise"),    dCell("Wie geht es dir?")] }),
        new TableRow({ children: [dCell("Warum?"),  dCell("Grund"),            dCell("Warum bist du muede?")] }),
        new TableRow({ children: [dCell("Wohin?"),  dCell("Richtung"),         dCell("Wohin gehst du?")] }),
        new TableRow({ children: [dCell("Woher?"),  dCell("Herkunft"),         dCell("Woher kommst du?")] }),
      ],
    }),
    empty(),
    h2("Wichtige Regeln"),
    bullet("Aussage: SUBJEKT + VERB + REST  ODER  ZEITANGABE + VERB + SUBJEKT + REST"),
    bullet("Verb steht IMMER auf Position 2 — egal was auf Position 1 steht."),
    bullet("W-Frage: W-WORT + VERB + SUBJEKT + REST?"),
    bullet("Ja/Nein-Frage: VERB + SUBJEKT + REST?"),
    empty(),
    pBold("Aufgabe: Bilde 2 Saetze, 2 W-Fragen und 2 Ja/Nein-Fragen."),
    p("Aussagesaetze:"),
    writeLine(55), writeLine(55), empty(),
    p("W-Fragen:"),
    writeLine(55), writeLine(55), empty(),
    p("Ja/Nein-Fragen:"),
    writeLine(55), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Wortstellung (LOESUNG)"), empty(),
    pBold("Goldene Regeln"),
    bullet("AUSSAGE: Verb steht IMMER auf Position 2."),
    bullet("W-FRAGE: W-Wort auf 1, Verb auf 2."),
    bullet("JA/NEIN-FRAGE: Verb auf Position 1."),
    empty(),
    pBold("Beispielloesungen"),
    pBold("Aussagesaetze:"),
    bullet("Ich gehe in die Schule."),
    bullet("Heute ist das Wetter schoen."),
    empty(),
    pBold("W-Fragen:"),
    bullet("Wie heisst du?"),
    bullet("Wo wohnst du?"),
    empty(),
    pBold("Ja/Nein-Fragen:"),
    bullet("Hast du einen Hund?"),
    bullet("Spielst du gern Fussball?"),
    empty(),
    pBold("Haeufige Fehler:"),
    bullet("FALSCH: Heute ich gehe in die Schule. (ich auf Pos. 2 — falsch!)"),
    bullet("RICHTIG: Heute gehe ich in die Schule. (gehe auf Pos. 2 — richtig!)"),
    bullet("FALSCH: Du hast einen Hund? (Verb muss auf Position 1!)"),
    bullet("RICHTIG: Hast du einen Hund?"),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Wortstellung"), empty(),
    pBold("Dialog 1: W-Fragen kennenlernen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Wie heisst du?")] }),
        new TableRow({ children: [dCell("Ben"),   dCell("Ich heisse Ben.")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Wo wohnst du?")] }),
        new TableRow({ children: [dCell("Ben"),   dCell("Ich wohne in Berlin.")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Was machst du gern?")] }),
        new TableRow({ children: [dCell("Ben"),   dCell("Ich spiele gern Fussball.")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Wann gehst du ins Bett?")] }),
        new TableRow({ children: [dCell("Ben"),   dCell("Um 21 Uhr gehe ich ins Bett.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ja/Nein-Fragen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lisa"),  dCell("Hast du Geschwister?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ja, ich habe einen Bruder.")] }),
        new TableRow({ children: [dCell("Lisa"),  dCell("Magst du Tiere?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ja, ich liebe Hunde!")] }),
        new TableRow({ children: [dCell("Lisa"),  dCell("Spielst du ein Instrument?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Nein, aber ich singe gern.")] }),
        new TableRow({ children: [dCell("Lisa"),  dCell("Bist du heute muede?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ja, ein bisschen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Frag und antworte!"),
    p("Stell deinem Partner W-Fragen UND Ja/Nein-Fragen. Der Partner antwortet."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage (Schreib SELBST eine Frage!)", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("W-Frage 1: ____________________________?"), dCell("")] }),
        new TableRow({ children: [dCell("W-Frage 2: ____________________________?"), dCell("")] }),
        new TableRow({ children: [dCell("W-Frage 3: ____________________________?"), dCell("")] }),
        new TableRow({ children: [dCell("Ja/Nein-Frage 1: _______________________?"), dCell("")] }),
        new TableRow({ children: [dCell("Ja/Nein-Frage 2: _______________________?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Satz-Wuerfel"),
    bullet("Lehrkraft sagt 3 Woerter ohne Reihenfolge: 'spielt — Tom — Fussball'."),
    bullet("Wer zuerst den richtigen Satz baut, ruft: 'Tom spielt Fussball!'"),
    bullet("Schwerer: 'gehe — heute — Schule — in die — ich' → 'Heute gehe ich in die Schule.'"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Wortstellung (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("W-Wort + Verb + Subjekt + Rest = Standard-W-Frage"),
    bullet("'Um 21 Uhr gehe ich ins Bett.' — Zeitangabe an Position 1, Subjekt nach Verb!"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Verb + Subjekt + Rest = Ja/Nein-Frage"),
    bullet("Antwort: Ja, ich ... / Nein, aber ich ..."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("W-Fragen korrekt (W-Wort + Verb + ...) — 1P"),
    bullet("Ja/Nein-Fragen korrekt (Verb auf Position 1!) — 1P"),
    bullet("Antworten in vollstaendigen Saetzen mit Verb auf Position 2"),
    empty(),
    pBold("Beispielfragen fuer Partnerinterview:"),
    bullet("W-Frage: Wie alt bist du? / Was machst du am Wochenende?"),
    bullet("Ja/Nein-Frage: Hast du Haustiere? / Magst du Mathe?"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Wortstellung"), empty(),
    pBold("Aufgabe 1: [BILD 1: 4 Bilder mit verschiedenen Aktivitaeten — Kind isst, Kind spielt, Kind liest, Kind schlaeft]"),
    p("Schreib unter jedes Bild einen vollstaendigen Satz. Verb auf Position 2!"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD: isst]", { width: 2375 }), hCell("[BILD: spielt]", { width: 2375 }), hCell("[BILD: liest]", { width: 2375 }), hCell("[BILD: schlaeft]", { width: 2375 })] }),
        new TableRow({ children: [dCell("Das Kind ____________"), dCell("Das Kind ____________"), dCell("Das Kind ____________"), dCell("Das Kind ____________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Kind und Lehrerin im Klassenzimmer]"),
    p("Was fragt die Lehrerin? Schreib 4 W-Fragen."),
    empty(),
    p("1. (Wie?)"),
    writeLine(55), empty(),
    p("2. (Wo?)"),
    writeLine(55), empty(),
    p("3. (Was?)"),
    writeLine(55), empty(),
    p("4. (Wann?)"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Sortier-Aufgabe — Bilde Saetze und Fragen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Woerter (in falscher Reihenfolge)", { width: 5500 }), hCell("Richtiger Satz / Frage", { width: 4000 })] }),
        new TableRow({ children: [dCell("Hund / spielt / Garten / im / der"), dCell("")] }),
        new TableRow({ children: [dCell("heisst / wie / du / ?"), dCell("")] }),
        new TableRow({ children: [dCell("ein Eis / du / magst / ?"), dCell("")] }),
        new TableRow({ children: [dCell("morgen / ich / fahre / nach Berlin"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: [BILD 4: Comic mit 3 Bildern und Sprechblasen]"),
    p("Was sagen die Personen? Schreib 3 Saetze in die Sprechblasen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          p("Sprechblase 1: ____________________________________________"),
          empty(),
          p("Sprechblase 2: ____________________________________________"),
          empty(),
          p("Sprechblase 3: ____________________________________________"),
        ],
      })] })],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Wortstellung (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Saetze unter Bildern"),
    bullet("Das Kind isst (einen Apfel)."),
    bullet("Das Kind spielt (Fussball)."),
    bullet("Das Kind liest (ein Buch)."),
    bullet("Das Kind schlaeft."),
    empty(),
    pBold("Aufgabe 2: W-Fragen — Beispiele"),
    bullet("1. Wie heisst du?"),
    bullet("2. Wo wohnst du?"),
    bullet("3. Was machst du in den Ferien?"),
    bullet("4. Wann hast du Geburtstag?"),
    empty(),
    pBold("Aufgabe 3: Sortier-Aufgabe"),
    bullet("Der Hund spielt im Garten."),
    bullet("Wie heisst du?"),
    bullet("Magst du ein Eis?"),
    bullet("Morgen fahre ich nach Berlin."),
    empty(),
    pBold("Aufgabe 4: Sprechblasen — individuelle Antworten"),
    pItalic("Beispiel: Hallo, wie geht es dir? / Mir geht es gut, danke! / Was machst du heute?"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Wortstellung");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
