"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "11_WetterJahreszeiten", "01_Wetter");
const TOPIC     = "A1_Kinder_WetterJahreszeiten_01_Wetter";
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

// ── Wetter-Tabelle ────────────────────────────────────────────────────────────
function makeWetterTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Wortart", { width: 1400 }), hCell("Beispielsatz", { width: 5300 })] }),
      new TableRow({ children: [dCell("die Sonne"), dCell("Nomen"), dCell("Die Sonne scheint heute.")] }),
      new TableRow({ children: [dCell("der Regen"), dCell("Nomen"), dCell("Es gibt viel Regen im Oktober.")] }),
      new TableRow({ children: [dCell("der Schnee"), dCell("Nomen"), dCell("Im Winter gibt es Schnee.")] }),
      new TableRow({ children: [dCell("der Wind"), dCell("Nomen"), dCell("Der Wind weht sehr stark.")] }),
      new TableRow({ children: [dCell("die Wolke"), dCell("Nomen"), dCell("Am Himmel sind viele Wolken.")] }),
      new TableRow({ children: [dCell("das Gewitter"), dCell("Nomen"), dCell("Das Gewitter kommt schnell.")] }),
      new TableRow({ children: [dCell("der Nebel"), dCell("Nomen"), dCell("Im Herbst gibt es Nebel.")] }),
      new TableRow({ children: [dCell("sonnig"), dCell("Adjektiv"), dCell("Heute ist es sonnig und warm.")] }),
      new TableRow({ children: [dCell("regnerisch"), dCell("Adjektiv"), dCell("Das Wetter ist heute regnerisch.")] }),
      new TableRow({ children: [dCell("windig"), dCell("Adjektiv"), dCell("Es ist sehr windig draussen.")] }),
      new TableRow({ children: [dCell("bewoelkt"), dCell("Adjektiv"), dCell("Der Himmel ist bewoelkt.")] }),
      new TableRow({ children: [dCell("kalt / warm"), dCell("Adjektiv"), dCell("Im Winter ist es kalt, im Sommer warm.")] }),
      new TableRow({ children: [dCell("Es regnet."), dCell("Verb"), dCell("Es regnet. Nimm deinen Schirm!")] }),
      new TableRow({ children: [dCell("Es schneit."), dCell("Verb"), dCell("Es schneit! Die Kinder spielen draussen.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Das Wetter"), empty(),
    pBold("Aufgabe 1: Schreib das richtige Wort."),
    p("Benutze: Sonne / Regen / Schnee / Wind / Wolken / Gewitter"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 5750 }), hCell("Wort", { width: 3750 })] }),
        new TableRow({ children: [dCell("Es ist weiss und faellt vom Himmel im Winter."), dCell("")] }),
        new TableRow({ children: [dCell("Es ist gelb und scheint am Himmel."), dCell("")] }),
        new TableRow({ children: [dCell("Es ist nass und faellt vom Himmel."), dCell("")] }),
        new TableRow({ children: [dCell("Es blaest und bewegt die Baeume."), dCell("")] }),
        new TableRow({ children: [dCell("Sie sind grau oder weiss und stehen am Himmel."), dCell("")] }),
        new TableRow({ children: [dCell("Es blitzt und donnert — das ist ein ..."), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Wie ist das Wetter? Ergaenze."),
    p("Benutze: sonnig / regnerisch / windig / bewoelkt / kalt / warm"),
    empty(),
    p("1. Im Winter ist es oft __________________ und __________________."),
    p("2. Im Sommer scheint die Sonne. Es ist __________________ und __________________."),
    p("3. Es gibt viele Wolken am Himmel. Es ist __________________."),
    p("4. Der Wind blaest stark. Es ist sehr __________________."),
    p("5. Es regnet the ganze Tag. Das Wetter ist __________________."),
    empty(), empty(),
    pBold("Aufgabe 3: Schreib 4-5 Saetze ueber das Wetter heute."),
    p("Heute ist das Wetter ... / Die Sonne ... / Ich mag das Wetter, weil ..."),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Das Wetter (LOESUNG)"), empty(),
    pBold("Aufgabe 1:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 5750 }), hCell("Wort", { width: 3750 })] }),
        new TableRow({ children: [dCell("Es ist weiss und faellt vom Himmel im Winter."), dCell("der Schnee")] }),
        new TableRow({ children: [dCell("Es ist gelb und scheint am Himmel."), dCell("die Sonne")] }),
        new TableRow({ children: [dCell("Es ist nass und faellt vom Himmel."), dCell("der Regen")] }),
        new TableRow({ children: [dCell("Es blaest und bewegt die Baeume."), dCell("der Wind")] }),
        new TableRow({ children: [dCell("Sie sind grau oder weiss und stehen am Himmel."), dCell("die Wolken")] }),
        new TableRow({ children: [dCell("Es blitzt und donnert — das ist ein ..."), dCell("das Gewitter")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2:"),
    bullet("1. kalt / bewoelkt / regnerisch (individuelle Variation akzeptieren)"),
    bullet("2. sonnig / warm"),
    bullet("3. bewoelkt"),
    bullet("4. windig"),
    bullet("5. regnerisch"),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Heute ist das Wetter sonnig und warm. Die Sonne scheint hell. Es gibt keine Wolken am Himmel. Es ist nicht windig. Ich mag dieses Wetter, weil ich draussen spielen kann."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Das Wetter"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Heute ist ein super Tag! Die Sonne scheint und der Himmel ist blau."),
          p("Es ist warm — ungefaehr 22 Grad. Es gibt keine Wolken."),
          p("Mia und ihr Bruder Tom spielen im Garten."),
          p("Aber dann kommt ein Wind. Die Baeume bewegen sich."),
          p("Schnell kommen auch Wolken. Der Himmel wird dunkel."),
          p("Oh nein!, ruft Mia. Kommt ein Gewitter?"),
          p("Ja, sagt Tom. Ich hoere Donner!"),
          p("Sie laufen schnell ins Haus. Dann kommt der Regen."),
          p("Es ist jetzt kalt und nass draussen."),
          p("Aber drinnen ist es warm und gemuetlich."),
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
        new TableRow({ children: [dCell("Am Anfang ist das Wetter schlecht."), dCell("")] }),
        new TableRow({ children: [dCell("Es sind ungefaehr 22 Grad."), dCell("")] }),
        new TableRow({ children: [dCell("Mia und Tom spielen im Haus."), dCell("")] }),
        new TableRow({ children: [dCell("Der Wind kommt und dann kommen Wolken."), dCell("")] }),
        new TableRow({ children: [dCell("Die Kinder bleiben draussen im Regen."), dCell("")] }),
        new TableRow({ children: [dCell("Drinnen ist es warm."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wie ist das Wetter am Anfang?"),
    writeLine(55), empty(),
    p("2. Was spielen Mia und Tom?"),
    writeLine(55), empty(),
    p("3. Was passiert dann mit dem Himmel?"),
    writeLine(55), empty(),
    p("4. Warum laufen die Kinder ins Haus?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Woerter aus dem Text beschreiben das Wetter? Schreib sie auf."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Das Wetter (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Am Anfang ist das Wetter schlecht."), dCell("F (sonnig und warm)")] }),
        new TableRow({ children: [dCell("Es sind ungefaehr 22 Grad."), dCell("R")] }),
        new TableRow({ children: [dCell("Mia und Tom spielen im Haus."), dCell("F (im Garten)")] }),
        new TableRow({ children: [dCell("Der Wind kommt und dann kommen Wolken."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Kinder bleiben draussen im Regen."), dCell("F (sie laufen ins Haus)")] }),
        new TableRow({ children: [dCell("Drinnen ist es warm."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sonnig, warm, blauer Himmel, keine Wolken."),
    bullet("2. Sie spielen im Garten (freies Spiel)."),
    bullet("3. Es kommen Wolken, der Himmel wird dunkel."),
    bullet("4. Weil ein Gewitter kommt (Donner, Regen)."),
    empty(),
    pBold("Aufgabe 3: Wetterwörter im Text"),
    p("sonnig, warm, Wolken, Wind, Gewitter, Donner, Regen, kalt, nass"),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Das Wetter"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Sonne  -  Regen  -  Schnee  -  Wind  -  Gewitter  -  Wolken  -  kalt  -  warm  -  sonnig  -  regnerisch  -  windig  -  bewoelkt  -  regnet  -  schneit")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze das Nomen."),
    empty(),
    p("1. Im Winter faellt __________________ vom Himmel. Alles wird weiss."),
    p("2. Die __________________ scheint heute. Es ist ein schoener Tag."),
    p("3. Es gibt __________________ heute. Nimm deinen Schirm mit!"),
    p("4. Der __________________ ist sehr stark. Die Baeume bewegen sich."),
    p("5. Ich sehe viele __________________ am Himmel. Kommt Regen?"),
    p("6. Es blitzt und donnert. Das ist ein __________________."),
    empty(),
    pBold("Teil 2: Ergaenze das Adjektiv."),
    empty(),
    p("1. Die Sonne scheint. Es ist __________________."),
    p("2. Es ist Dezember und es ist sehr __________________."),
    p("3. Es regnet den ganzen Tag. Das Wetter ist __________________."),
    p("4. Es gibt viele Wolken. Der Himmel ist __________________."),
    p("5. Der Wind blaest sehr stark. Es ist sehr __________________."),
    p("6. Im Sommer ist es oft __________________ und die Kinder schwimmen."),
    empty(),
    pBold("Teil 3: Dialog – Wie ist das Wetter?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lena"), dCell("Schau mal! Es __________________ draussen!")] }),
        new TableRow({ children: [dCell("Max"), dCell("Oh nein! Und es ist so __________________!")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Morgen kommt wieder die __________________, sagt der Wetterbericht.")] }),
        new TableRow({ children: [dCell("Max"), dCell("Super! Dann spielen wir draussen. Ich mag __________________ Wetter.")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Das Wetter (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Schnee"), bullet("2. Sonne"), bullet("3. Regen"),
    bullet("4. Wind"), bullet("5. Wolken"), bullet("6. Gewitter"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. sonnig"), bullet("2. kalt"), bullet("3. regnerisch"),
    bullet("4. bewoelkt"), bullet("5. windig"), bullet("6. warm"),
    empty(),
    pBold("Teil 3: Musterloesung"),
    bullet("Lena: ... Es regnet draussen!"),
    bullet("Max: ... es ist so kalt!"),
    bullet("Lena: ... die Sonne ..., sagt der Wetterbericht."),
    bullet("Max: ... Ich mag sonniges / warmes Wetter."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Das Wetter"), empty(),
    makeWetterTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("Wie ist das Wetter? = Adjektiv-Antwort: Es ist sonnig / kalt / regnerisch."),
    bullet("Was macht das Wetter? = Verb-Antwort: Es regnet / schneit / donnert / blitzt."),
    bullet("Verb 'scheinen': Die Sonne scheint. (= to shine)"),
    bullet("Verb 'wehen': Der Wind weht. (= to blow)"),
    bullet("Komparativ: Es ist heute kaelter als gestern."),
    bullet("Artikel: der Regen / Schnee / Wind / Nebel  |  die Sonne / Wolke  |  das Gewitter / Eis"),
    empty(),
    pBold("Aufgabe: Lerne 8 Woerter zum Thema Wetter. Schreib sie mit Artikel und einem Satz."),
    ...writeLines(8, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Das Wetter (LOESUNG)"), empty(),
    makeWetterTable(),
    empty(),
    pBold("Grammatik-Hinweise (Musterloesungen):"),
    bullet("Wie ist das Wetter? — Es ist sonnig und warm."),
    bullet("Es regnet heute. Ich nehme meinen Schirm mit."),
    bullet("Im Winter schneit es oft. Die Kinder bauen einen Schneemann."),
    bullet("Der Wind weht stark. Es ist sehr windig."),
    bullet("Das Gewitter kommt. Es blitzt und donnert."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Das Wetter"), empty(),
    pBold("Dialog 1: Wie ist das Wetter?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kim"), dCell("Wie ist das Wetter heute?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Es regnet und es ist kalt. Typisches Herbstwetter!")] }),
        new TableRow({ children: [dCell("Kim"), dCell("Oh schade. Ich wollte heute draussen spielen.")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Morgen soll es besser werden. Die Sonne kommt zurueck.")] }),
        new TableRow({ children: [dCell("Kim"), dCell("Super! Magst du Sonnenwetter?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Ja, ich liebe die Sonne! Und du?")] }),
        new TableRow({ children: [dCell("Kim"), dCell("Ich mag auch Schnee! Dann koennen wir Schlitten fahren.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Das Wetter morgen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Was macht ihr morgen?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Wir wollen in den Park gehen.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Wie ist das Wetter morgen? Hast du geschaut?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ja! Es ist sonnig und warm — 25 Grad!")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Perfekt! Kommen wir auch?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Natuerlich! Je mehr, desto lustiger!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Lieblingswetter"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie ist das Wetter heute?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingswetter?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du bei Regen?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du bei Schnee?"), dCell("")] }),
        new TableRow({ children: [dCell("Magst du Gewitter? Warum (nicht)?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Wetter-Pantomime"),
    bullet("Ein Kind spielt eine Wetter-Situation pantomimisch vor (z. B. Regen: Haende ueber dem Kopf halten)."),
    bullet("Die Gruppe ruft den richtigen Begriff auf Deutsch."),
    bullet("Wer zuerst richtig ruft, ist dran!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Das Wetter (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie ist das Wetter heute? = Standardfrage nach aktuellem Wetter"),
    bullet("Typisches Herbstwetter! = adjektivisch + Nomen (Herbstwetter = autumn weather)"),
    bullet("Ich wollte ... spielen = wollen (Konjunktiv II Vergangenheit fuer Wunsch)"),
    bullet("Morgen soll es besser werden. = sollen + Infinitiv fuer Wetterbericht"),
    bullet("Ich liebe die Sonne! / Ich mag auch Schnee! = Praeferenzausdruecke"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was macht ihr morgen? = ihr-Form Plural"),
    bullet("Wir wollen in den Park gehen. = wollen + Infinitiv = Absicht"),
    bullet("Je mehr, desto lustiger! = Komparativ-Konstruktion"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Verwendung von Es ist / Es regnet / Es schneit"),
    bullet("Adjektiv-Nomen-Kombination: sonniges Wetter, kalter Wind"),
    bullet("Individuelle Praeferenzen ausdruecken: Ich mag ... / Ich liebe ..."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Das Wetter"), empty(),
    pBold("Aufgabe 1: [BILD 1: Vier Felder mit Wettersymbolen — Sonne, Wolken+Regen, Schneeflocken, Blitz+Wolken]"),
    p("Schreib unter jedes Bild: das Wetter und einen Satz."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild 1", { width: 2350 }), hCell("Bild 2", { width: 2350 }), hCell("Bild 3", { width: 2350 }), hCell("Bild 4", { width: 2350 })] }),
        new TableRow({ children: [
          dCell("[Sonne]", { width: 2350 }),
          dCell("[Regen]", { width: 2350 }),
          dCell("[Schnee]", { width: 2350 }),
          dCell("[Gewitter]", { width: 2350 }),
        ]}),
        new TableRow({ children: [
          dCell("Es ist ________", { width: 2350 }),
          dCell("Es ist ________", { width: 2350 }),
          dCell("Es ist ________", { width: 2350 }),
          dCell("Es ist ________", { width: 2350 }),
        ]}),
        new TableRow({ children: [
          dCell("Ich ________", { width: 2350 }),
          dCell("Ich ________", { width: 2350 }),
          dCell("Ich ________", { width: 2350 }),
          dCell("Ich ________", { width: 2350 }),
        ]}),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Kind schaut aus dem Fenster bei Regen]"),
    p("Was sieht das Kind? Was denkt es? Schreib 3 Saetze."),
    p("Tipp: Es regnet ... / Draussen ist es ... / Das Kind moechte ..."),
    empty(),
    ...writeLines(3, 55),
    empty(),
    pBold("Aufgabe 3: Welches Wetter passt? Verbinde."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Situation", { width: 5500 }), hCell("Wetter", { width: 4000 })] }),
        new TableRow({ children: [dCell("Die Kinder bauen einen Schneemann."), dCell("sonnig und warm")] }),
        new TableRow({ children: [dCell("Mama und Papa grillen im Garten."), dCell("es schneit")] }),
        new TableRow({ children: [dCell("Die Kinder nehmen Schirme mit."), dCell("Gewitter")] }),
        new TableRow({ children: [dCell("Alle Lichter im Haus gehen aus."), dCell("es regnet")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: [BILD 4: Leere Wettervorhersage-Tabelle]"),
    p("Male dein Lieblingswetter und schreib dazu."),
    p("Mein Lieblingswetter: __________________"),
    p("Weil: __________________"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("[Hier malen]"), empty(), empty(), empty()],
      })] })],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Das Wetter (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 2350 }), hCell("Wetter", { width: 2350 }), hCell("Satz", { width: 4800 })] }),
        new TableRow({ children: [dCell("Sonne"), dCell("sonnig / warm"), dCell("Es ist sonnig. Ich gehe spielen.")] }),
        new TableRow({ children: [dCell("Regen"), dCell("regnerisch / nass"), dCell("Es regnet. Ich nehme einen Schirm.")] }),
        new TableRow({ children: [dCell("Schnee"), dCell("verschneit / kalt"), dCell("Es schneit. Ich baue einen Schneemann.")] }),
        new TableRow({ children: [dCell("Gewitter"), dCell("Gewitter / dunkel"), dCell("Es gibt ein Gewitter. Ich bleibe drinnen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    pItalic("Es regnet draussen. Draussen ist es kalt und nass. Das Kind moechte draussen spielen, aber es kann nicht."),
    empty(),
    pBold("Aufgabe 3: Loesungen"),
    bullet("Die Kinder bauen einen Schneemann. → es schneit"),
    bullet("Mama und Papa grillen im Garten. → sonnig und warm"),
    bullet("Die Kinder nehmen Schirme mit. → es regnet"),
    bullet("Alle Lichter im Haus gehen aus. → Gewitter"),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort"),
    pItalic("Abhaengig vom Lieblingswetter des Kindes. Alle sinnvollen Antworten akzeptieren."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Wetter");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
