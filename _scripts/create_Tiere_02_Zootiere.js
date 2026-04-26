"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "09_Tiere", "02_Zootiere");
const TOPIC     = "A1_Kinder_Tiere_02_Zootiere";
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

// ── Zootiere-Tabelle ──────────────────────────────────────────────────────────
function makeZooTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Tier", { width: 2000 }), hCell("Artikel", { width: 1200 }), hCell("Plural", { width: 2000 }), hCell("Besonderheit", { width: 4300 })] }),
      new TableRow({ children: [dCell("Loewe"), dCell("der"), dCell("die Loewen"), dCell("lebt in Afrika, bruellt laut")] }),
      new TableRow({ children: [dCell("Elefant"), dCell("der"), dCell("die Elefanten"), dCell("sehr gross, hat einen Ruessel")] }),
      new TableRow({ children: [dCell("Giraffe"), dCell("die"), dCell("die Giraffen"), dCell("sehr langer Hals, frisst Blaetter")] }),
      new TableRow({ children: [dCell("Zebra"), dCell("das"), dCell("die Zebras"), dCell("schwarz-weiss gestreift")] }),
      new TableRow({ children: [dCell("Affe"), dCell("der"), dCell("die Affen"), dCell("klettert gut, lebt im Dschungel")] }),
      new TableRow({ children: [dCell("Krokodil"), dCell("das"), dCell("die Krokodile"), dCell("lebt im Wasser, hat scharfe Zaehne")] }),
      new TableRow({ children: [dCell("Pinguin"), dCell("der"), dCell("die Pinguine"), dCell("lebt am Suedpol, kann nicht fliegen")] }),
      new TableRow({ children: [dCell("Baer"), dCell("der"), dCell("die Baeren"), dCell("schlaeft im Winter, mag Honig")] }),
      new TableRow({ children: [dCell("Schlange"), dCell("die"), dCell("die Schlangen"), dCell("hat keine Beine, kriecht")] }),
      new TableRow({ children: [dCell("Tiger"), dCell("der"), dCell("die Tiger"), dCell("gestreift, lebt in Asien")] }),
      new TableRow({ children: [dCell("Papagei"), dCell("der"), dCell("die Papageien"), dCell("bunt, kann sprechen lernen")] }),
      new TableRow({ children: [dCell("Delfin"), dCell("der"), dCell("die Delfine"), dCell("lebt im Meer, sehr intelligent")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Zootiere"), empty(),
    pBold("Aufgabe 1: Artikel ergaenzen (der / die / das)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Loewe"), dCell(""), dCell("Pinguin"), dCell("")] }),
        new TableRow({ children: [dCell("Elefant"), dCell(""), dCell("Baer"), dCell("")] }),
        new TableRow({ children: [dCell("Giraffe"), dCell(""), dCell("Schlange"), dCell("")] }),
        new TableRow({ children: [dCell("Zebra"), dCell(""), dCell("Papagei"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib 4 Saetze ueber Zootiere."),
    p("Benutze: hat / kann / lebt / frisst / ist"),
    empty(),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Gross oder klein? Schnell oder langsam? Sortiere."),
    p("Elefant / Maus / Giraffe / Pinguin / Loewe / Schildkroete / Adler / Schnecke"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gross", { width: 2350 }), hCell("Klein", { width: 2350 }), hCell("Schnell", { width: 2350 }), hCell("Langsam", { width: 2350 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Mein Lieblingstier im Zoo"),
    p("Schreib 3-4 Saetze. Warum magst du dieses Tier?"),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Zootiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Artikel"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 }), hCell("Tier", { width: 2350 }), hCell("mit Artikel", { width: 2350 })] }),
        new TableRow({ children: [dCell("Loewe"), dCell("der Loewe"), dCell("Pinguin"), dCell("der Pinguin")] }),
        new TableRow({ children: [dCell("Elefant"), dCell("der Elefant"), dCell("Baer"), dCell("der Baer")] }),
        new TableRow({ children: [dCell("Giraffe"), dCell("die Giraffe"), dCell("Schlange"), dCell("die Schlange")] }),
        new TableRow({ children: [dCell("Zebra"), dCell("das Zebra"), dCell("Papagei"), dCell("der Papagei")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterantworten"),
    bullet("Der Elefant hat einen langen Ruessel."),
    bullet("Der Loewe lebt in Afrika und bruellt laut."),
    bullet("Die Giraffe frisst Blaetter von hohen Baeumen."),
    bullet("Der Pinguin kann nicht fliegen."),
    empty(),
    pBold("Aufgabe 3: Gross/Klein/Schnell/Langsam (Moeglich)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gross", { width: 2350 }), hCell("Klein", { width: 2350 }), hCell("Schnell", { width: 2350 }), hCell("Langsam", { width: 2350 })] }),
        new TableRow({ children: [dCell("Elefant, Giraffe"), dCell("Maus, Pinguin"), dCell("Loewe, Adler"), dCell("Schildkroete, Schnecke")] }),
      ],
    }),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Zootiere"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute besucht die Klasse 3b den Zoo. Die Kinder sind sehr aufgeregt!"),
          p("Zuerst sehen sie die Elefanten. Der grosse Elefant heisst Max und hat einen langen Ruessel."),
          p("Er trinkt Wasser mit dem Ruessel - das ist lustig!"),
          p("Dann gehen sie zu den Loewen. Eine Loewin liegt auf einem Stein und schlaeft."),
          p("Der Loewe bruellt laut - alle Kinder bekommen einen Schreck!"),
          p("Die Giraffen sind sehr hoch. Sie fressen Blaetter von einem Baum."),
          p("Am Ende sehen die Kinder noch die Pinguine. Die Pinguine schwimmen im kalten Wasser."),
          p("Das Lieblingstier von Tim ist der Elefant. Lisa mag die Giraffe am liebsten."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Klasse besucht den Zoo."), dCell("")] }),
        new TableRow({ children: [dCell("Der Elefant heisst Max."), dCell("")] }),
        new TableRow({ children: [dCell("Die Loewin schlaeft auf einem Stein."), dCell("")] }),
        new TableRow({ children: [dCell("Die Giraffen fressen Fleisch."), dCell("")] }),
        new TableRow({ children: [dCell("Die Pinguine schwimmen im warmen Wasser."), dCell("")] }),
        new TableRow({ children: [dCell("Lisas Lieblingstier ist der Elefant."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was macht der Elefant mit dem Ruessel?"),
    writeLine(55), empty(),
    p("2. Was macht der Loewe?"),
    writeLine(55), empty(),
    p("3. Was fressen die Giraffen?"),
    writeLine(55), empty(),
    p("4. Was ist Tims Lieblingstier?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Zootiere stehen im Text? Schreib sie auf."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Zootiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Klasse besucht den Zoo."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Elefant heisst Max."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Loewin schlaeft auf einem Stein."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Giraffen fressen Fleisch."), dCell("F (Blaetter)")] }),
        new TableRow({ children: [dCell("Die Pinguine schwimmen im warmen Wasser."), dCell("F (kalten Wasser)")] }),
        new TableRow({ children: [dCell("Lisas Lieblingstier ist der Elefant."), dCell("F (die Giraffe)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er trinkt Wasser mit dem Ruessel."),
    bullet("2. Der Loewe bruellt laut."),
    bullet("3. Die Giraffen fressen Blaetter von einem Baum."),
    bullet("4. Tims Lieblingstier ist der Elefant."),
    empty(),
    pBold("Aufgabe 3: Zootiere im Text"),
    p("der Elefant, der Loewe, die Loewin, die Giraffe, der Pinguin"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Zootiere"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Loewe  -  Elefant  -  Giraffe  -  Pinguin  -  Affe  -  Zoo  -  Ruessel  -  Hals  -  bruellt  -  klettert  -  schwimmt  -  frisst  -  lebt  -  Afrika")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Der __________________ hat einen langen __________________."),
    p("2. Die __________________ hat einen sehr langen __________________."),
    p("3. Der __________________ __________________ laut im Zoo."),
    p("4. Der __________________ __________________ gut auf Baeume."),
    p("5. Der __________________ __________________ im kalten Wasser."),
    p("6. Der __________________ __________________ in __________________."),
    empty(),
    pBold("Teil 2: Welches Tier passt? Ergaenze."),
    empty(),
    p("1. Es ist schwarz-weiss gestreift. Es ist __________________."),
    p("2. Es ist sehr gross und grau. Es hat einen Ruessel. Es ist __________________."),
    p("3. Es ist bunt und kann sprechen lernen. Es ist __________________."),
    p("4. Es lebt am Suedpol und kann nicht fliegen. Es ist __________________."),
    p("5. Es schlaeft im Winter und mag Honig. Es ist __________________."),
    empty(),
    pBold("Teil 3: Verbinde richtig."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Wo lebt es?", { width: 6500 })] }),
        new TableRow({ children: [dCell("Loewe"), dCell("am Suedpol")] }),
        new TableRow({ children: [dCell("Pinguin"), dCell("im Dschungel")] }),
        new TableRow({ children: [dCell("Affe"), dCell("im Meer")] }),
        new TableRow({ children: [dCell("Delfin"), dCell("in Afrika / der Savanne")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4 (frei): Beschreibe ein Zootier."),
    p("Das __________________ lebt in __________________. Es hat __________________. Es kann __________________."),
    writeLine(55), empty(),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Zootiere (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Elefant ... Ruessel"),
    bullet("2. Giraffe ... Hals"),
    bullet("3. Loewe ... bruellt"),
    bullet("4. Affe ... klettert"),
    bullet("5. Pinguin ... schwimmt"),
    bullet("6. Loewe ... lebt ... Afrika"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. das Zebra"),
    bullet("2. der Elefant"),
    bullet("3. der Papagei"),
    bullet("4. der Pinguin"),
    bullet("5. der Baer"),
    empty(),
    pBold("Teil 3: Korrekte Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 3000 }), hCell("Wo lebt es?", { width: 6500 })] }),
        new TableRow({ children: [dCell("Loewe"), dCell("in Afrika / der Savanne")] }),
        new TableRow({ children: [dCell("Pinguin"), dCell("am Suedpol")] }),
        new TableRow({ children: [dCell("Affe"), dCell("im Dschungel")] }),
        new TableRow({ children: [dCell("Delfin"), dCell("im Meer")] }),
      ],
    }),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Zootiere"), empty(),
    makeZooTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Artikel merken: die meisten Zootiere sind der (maskulin): Loewe, Elefant, Affe, Baer, Tiger, Pinguin, Papagei, Delfin"),
    bullet("Ausnahmen: die Giraffe, die Schlange | das Zebra, das Krokodil"),
    bullet("hat + Akkusativ: Der Elefant hat einen Ruessel. (einen = maskulin Akkusativ)"),
    bullet("kann + Infinitiv: Der Papagei kann sprechen. | Der Pinguin kann nicht fliegen."),
    bullet("lebt in + Dativ: Der Loewe lebt in Afrika. / Der Affe lebt im Dschungel."),
    empty(),
    pBold("Aufgabe: Lerne 5 Zootiere auswendig. Schreib sie mit Artikel und einer Eigenschaft auf."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Zootiere (LOESUNG)"), empty(),
    makeZooTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Der Elefant hat einen langen Ruessel."),
    bullet("Die Giraffe hat einen sehr langen Hals."),
    bullet("Der Pinguin kann nicht fliegen, aber er schwimmt gut."),
    bullet("Der Affe lebt im Dschungel und klettert sehr gut."),
    bullet("Das Krokodil lebt im Wasser und hat scharfe Zaehne."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Zootiere"), empty(),
    pBold("Dialog 1: Im Zoo"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Schau mal! Der Elefant ist so gross!")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ja! Und er hat einen langen Ruessel. Wie heisst er?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Da steht es: Er heisst Kongo und ist 12 Jahre alt.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Was frisst er?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Er frisst Blaetter, Graes und Fruechte.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Toll! Mein Lieblingstier ist der Loewe. Wollen wir dahin?")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Tier-Ratespiel"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kind A"), dCell("Ich denke an ein Tier. Stell mir Fragen!")] }),
        new TableRow({ children: [dCell("Kind B"), dCell("Ist es gross?")] }),
        new TableRow({ children: [dCell("Kind A"), dCell("Ja, sehr gross.")] }),
        new TableRow({ children: [dCell("Kind B"), dCell("Hat es Streifen?")] }),
        new TableRow({ children: [dCell("Kind A"), dCell("Nein, keine Streifen.")] }),
        new TableRow({ children: [dCell("Kind B"), dCell("Lebt es in Afrika?")] }),
        new TableRow({ children: [dCell("Kind A"), dCell("Ja! Und es bruellt laut.")] }),
        new TableRow({ children: [dCell("Kind B"), dCell("Ist es der Loewe?")] }),
        new TableRow({ children: [dCell("Kind A"), dCell("Ja, richtig!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Zootiere"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingstier im Zoo?"), dCell("")] }),
        new TableRow({ children: [dCell("Warst du schon mal im Zoo?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier findest du gruselig?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier ist das groesste?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier kann fliegen?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Zoo-Raten"),
    bullet("Ein Kind denkt an ein Zootier."),
    bullet("Die anderen stellen Ja/Nein-Fragen:"),
    bullet("  Ist es gross? Lebt es in Afrika? Hat es Streifen? Kann es fliegen?"),
    bullet("Maximal 10 Fragen erlaubt!"),
    bullet("Wer richtig raet, ist dran."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Zootiere (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Schau mal! = Look! (Ausruf der Begeisterung)"),
    bullet("Da steht es: ... = It says there: ... (Hinweisschild lesen)"),
    bullet("Er frisst Blaetter. - fressen (fuer Tiere) vs. essen (fuer Menschen)"),
    bullet("Wollen wir dahin? = Sollen wir dort hingehen? (Vorschlag)"),
    empty(),
    pBold("Dialog 2: Analyse"),
    bullet("Ja/Nein-Fragen: Ist es...? Hat es...? Lebt es...? Kann es...?"),
    bullet("Verneinung: Nein, keine Streifen. (kein + Nomen)"),
    empty(),
    pBold("Nuetzliche Ausdruecke:"),
    bullet("Mein Lieblingstier ist ..."),
    bullet("Es lebt in ... / Es frisst ... / Es hat ..."),
    bullet("Ich finde ... gruselig / toll / suess / gefaehrlich."),
    bullet("fressen (Tier) vs. essen (Mensch) - wichtiger Unterschied!"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Zootiere"), empty(),
    pBold("Aufgabe 1: Ordne die Zootiere nach ihrem Lebensraum."),
    p("Loewe / Elefant / Pinguin / Affe / Delfin / Krokodil / Baer / Giraffe / Schlange / Tiger"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Afrika / Savanne", { width: 2350 }), hCell("Dschungel / Wald", { width: 2350 }), hCell("Wasser / Meer", { width: 2350 }), hCell("Kalt (Pol/Norden)", { width: 2350 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Zooplan mit verschiedenen Gehegen]"),
    p("Schreib: Welches Tier ist in welchem Gehege?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gehege Nr.", { width: 2000 }), hCell("Tier", { width: 3000 }), hCell("Was macht es?", { width: 4500 })] }),
        new TableRow({ children: [dCell("1"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("2"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("3"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("4"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Tier-Steckbrief – Schreib ueber dein Lieblingstier."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Mein Lieblingstier", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Name des Tieres: __________________       Artikel: __________________")] }),
        new TableRow({ children: [dCell("Es lebt in: __________________")] }),
        new TableRow({ children: [dCell("Es frisst: __________________")] }),
        new TableRow({ children: [dCell("Es kann: __________________")] }),
        new TableRow({ children: [dCell("Besonderheit: __________________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Klassen-Umfrage – Lieblingstier im Zoo"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Name", { width: 2500 }), hCell("Lieblingstier", { width: 3000 }), hCell("Warum?", { width: 4000 })] }),
        ...[[1],[2],[3],[4],[5],[6]].map(() => new TableRow({ children: [dCell(""), dCell(""), dCell("")] })),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Zootiere (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Afrika", { width: 2350 }), hCell("Dschungel/Wald", { width: 2350 }), hCell("Wasser/Meer", { width: 2350 }), hCell("Kalt", { width: 2350 })] }),
        new TableRow({ children: [dCell("Loewe, Elefant, Giraffe"), dCell("Affe, Schlange, Tiger"), dCell("Delfin, Krokodil"), dCell("Pinguin, Baer")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2-4: individuelle Antworten"),
    pItalic("Aufgabe 2: Abhaengig vom Bild - Tiere beschriften und beschreiben."),
    pItalic("Aufgabe 3: individuell - Muster: Mein Lieblingstier ist der Elefant. Er lebt in Afrika. Er frisst Blaetter und Fruechte. Er kann mit dem Ruessel Wasser spritzen."),
    pItalic("Aufgabe 4: Klassenergebnisse variieren."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Zootiere");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
