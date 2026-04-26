"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "08_NaturUmwelt", "01_TierePflanzen");
const TOPIC     = "A2_Kinder_NaturUmwelt_01_TierePflanzen";
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
      new TableRow({ children: [hCell("Wort", { width: 2400 }), hCell("Kategorie", { width: 1600 }), hCell("Beispielsatz", { width: 5638 })] }),
      new TableRow({ children: [dCell("der Wolf (Woelfe)"), dCell("Wildtier"), dCell("Der Wolf lebt im Wald und ist ein Raubtier.")] }),
      new TableRow({ children: [dCell("der Fuchs (Fuechse)"), dCell("Wildtier"), dCell("Der Fuchs ist schlau und hat orangefarbenes Fell.")] }),
      new TableRow({ children: [dCell("das Reh (Rehe)"), dCell("Wildtier"), dCell("Das Reh lebt im Wald und frisst Pflanzen.")] }),
      new TableRow({ children: [dCell("der Adler (-)"), dCell("Vogel"), dCell("Der Adler kann sehr hoch fliegen und hat scharfe Augen.")] }),
      new TableRow({ children: [dCell("der Biber (-)"), dCell("Wildtier"), dCell("Der Biber baut Daemme aus Holz im Fluss.")] }),
      new TableRow({ children: [dCell("die Eiche (-n)"), dCell("Baum"), dCell("Die Eiche ist ein alter, grosser Baum im Wald.")] }),
      new TableRow({ children: [dCell("die Tanne (-n)"), dCell("Baum"), dCell("Im Winter bleibt die Tanne gruen.")] }),
      new TableRow({ children: [dCell("die Sonnenblume (-n)"), dCell("Blume"), dCell("Die Sonnenblume dreht sich immer zur Sonne.")] }),
      new TableRow({ children: [dCell("der Lebensraum (-raeume)"), dCell("Nomen"), dCell("Der Lebensraum des Wolfes ist der Wald.")] }),
      new TableRow({ children: [dCell("das Raubtier (-e)"), dCell("Nomen"), dCell("Raubtiere fressen andere Tiere — sie sind Fleischfresser.")] }),
      new TableRow({ children: [dCell("gefaehrdet sein"), dCell("Ausdruck"), dCell("Viele Tiere sind gefaehrdet, weil ihr Lebensraum schrumpft.")] }),
      new TableRow({ children: [dCell("sich ernaehren von"), dCell("Ausdruck"), dCell("Das Reh ernaehrt sich von Gaas und Blaettern.")] }),
      new TableRow({ children: [dCell("aussterben"), dCell("Verb"), dCell("Wenn wir nichts tun, koennen viele Tiere aussterben.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Tiere und Pflanzen"), empty(),
    pBold("Aufgabe 1: Ordne die Tiere und Pflanzen in die Tabelle."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Wolf  -  Adler  -  Eiche  -  Biber  -  Sonnenblume  -  Tanne  -  Fuchs  -  Reh  -  Rose  -  Schmetterling  -  Eule  -  Farn")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Saeugetiere", { width: 2350 }), hCell("Voegel", { width: 2350 }), hCell("Baeume", { width: 2350 }), hCell("Blumen / Pflanzen", { width: 2588 })] }),
        new TableRow({ children: [dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2588 })] }),
        new TableRow({ children: [dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2588 })] }),
        new TableRow({ children: [dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2350 }), dCell("", { width: 2588 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Beschreibe ein Tier nach dem Muster."),
    pItalic("Muster: Der Wolf ist ein Raubtier. Er lebt im Wald. Er hat braunes/graues Fell und scharfe Zaehne. Er ernaehrt sich von anderen Tieren. Er kann sehr schnell laufen."),
    empty(),
    pBold("Tier 1: Der Fuchs"),
    p("Der Fuchs ist __________________. Er lebt __________________. Er hat __________________ Fell"),
    p("und __________________. Er ernaehrt sich von __________________. Er kann __________________."),
    writeLine(55), empty(),
    pBold("Tier 2: Der Adler"),
    p("Der Adler ist __________________. Er lebt __________________. Er hat __________________"),
    p("und __________________. Er kann __________________."),
    writeLine(55), empty(), empty(),
    pBold("Aufgabe 3: Dein Lieblingstier in der Natur — schreib 5-6 Saetze."),
    p("Welches Tier in der Natur magst du am liebsten? Wo lebt es? Was kann es? Warum magst du es?"),
    empty(),
    ...writeLines(6, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Tiere und Pflanzen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Saeugetiere", { width: 2350 }), hCell("Voegel", { width: 2350 }), hCell("Baeume", { width: 2350 }), hCell("Blumen / Pflanzen", { width: 2588 })] }),
        new TableRow({ children: [dCell("Wolf, Biber, Fuchs, Reh"), dCell("Adler, Eule, Schmetterling*"), dCell("Eiche, Tanne"), dCell("Sonnenblume, Rose, Farn")] }),
      ],
    }),
    pItalic("*Schmetterling ist kein Vogel (Insekt), aber Kinder ordnen ihn oft zu Voegeln — kurze Erklaerung anbieten: Schmetterling = Insekt, kein Vogel."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    pBold("Fuchs:"),
    pItalic("Der Fuchs ist ein Raubtier / ein Wildsaeugetier. Er lebt im Wald und auf Feldern. Er hat orangefarbenes/rotbraunes Fell und einen buschigen Schwanz. Er ernaehrt sich von kleinen Tieren, Beeren und Abfall. Er kann sehr schnell laufen und gut klettern."),
    empty(),
    pBold("Adler:"),
    pItalic("Der Adler ist ein Greifvogel. Er lebt in Bergen und Waeldern. Er hat braune Federn und einen gebogenen Schnabel. Er kann sehr hoch fliegen und hat extrem scharfe Augen. Er ernaehrt sich von kleinen Tieren wie Maeuse und Hasen."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Erwartete Struktur: Tiername + Lebensraum + koerperliche Merkmale + Ernaehrung + persoenliche Begruendung."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Tiere und Pflanzen"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Der Biber — Baumeister am Fluss"),
          empty(),
          p("Der Biber ist eines der interessantesten Tiere in Europa. Er lebt an Fluessen und Seen und ist ein ausgezeichneter Schwimmer. Biber koennen bis zu funf Minuten unter Wasser bleiben!"),
          p("Das Besondere am Biber ist sein Bautalent. Mit seinen scharfen Zaehnen faellt er Baeume und baut daraus riesige Daemme im Fluss. Diese Daemme stauen das Wasser und schaffen einen tiefen Teich — das ist Bibers Schutz vor Raubtieren wie dem Wolf oder dem Fuchs. Mitten in diesem Teich baut der Biber sein Haus, die sogenannte Biberburg."),
          p("Biber sind reine Pflanzenfresser. Sie essen Rinde, Zweige, Blaetter und Wasserpflanzen. Im Herbst sammeln sie Vorraete fuer den Winter."),
          p("Lange Zeit waren Biber in Deutschland fast ausgestorben, weil sie gejagt wurden und weil ihre Lebensraeume zerstoert wurden. Heute sind sie geschuetzt und ihre Zahl waechst wieder. Das ist eine gute Nachricht fuer die Natur!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Biber koennen zehn Minuten unter Wasser bleiben."), dCell("")] }),
        new TableRow({ children: [dCell("Der Biber baut mit seinen Zaehnen Daemme aus Baeumen."), dCell("")] }),
        new TableRow({ children: [dCell("Die Biberburg steht am Ufer des Flusses."), dCell("")] }),
        new TableRow({ children: [dCell("Biber essen Fleisch und Fische."), dCell("")] }),
        new TableRow({ children: [dCell("In Deutschland sind Biber heute geschuetzt."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wo lebt der Biber?"),
    writeLine(55), empty(),
    p("2. Wozu baut der Biber einen Damm?"),
    writeLine(55), empty(),
    p("3. Was isst der Biber?"),
    writeLine(55), empty(),
    p("4. Warum waren Biber fruher fast ausgestorben?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Suche im Text alle Tiere, die erwaehnt werden, und schreib sie auf."),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Tiere und Pflanzen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Biber koennen zehn Minuten unter Wasser bleiben."), dCell("F (fuenf Minuten)")] }),
        new TableRow({ children: [dCell("Der Biber baut mit seinen Zaehnen Daemme aus Baeumen."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Biberburg steht am Ufer des Flusses."), dCell("F (sie steht mitten im Teich)")] }),
        new TableRow({ children: [dCell("Biber essen Fleisch und Fische."), dCell("F (Pflanzenfresser)")] }),
        new TableRow({ children: [dCell("In Deutschland sind Biber heute geschuetzt."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. An Fluessen und Seen."),
    bullet("2. Um das Wasser zu stauen und einen tiefen Teich zu schaffen — das schuetzt ihn vor Raubtieren."),
    bullet("3. Rinde, Zweige, Blaetter und Wasserpflanzen (Pflanzenfresser)."),
    bullet("4. Weil sie gejagt wurden und ihre Lebensraeume zerstoert wurden."),
    empty(),
    pBold("Aufgabe 3: Tiere im Text"),
    bullet("Biber, Wolf, Fuchs"),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Tiere und Pflanzen"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Wald  -  fliegen  -  Raubtier  -  Fell  -  Lebensraum  -  Pflanzenfresser  -  scharfe  -  lebt  -  ernaehrt  -  gefaehrdet  -  Federn  -  aussterben  -  Blaetter  -  Zaehne")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Der Wolf ist ein __________________ — er frisst andere Tiere."),
    p("2. Das Reh ist ein __________________ und frisst Gras und __________________."),
    p("3. Der Adler __________________ im Gebirge und kann sehr hoch __________________."),
    p("4. Der Fuchs hat orangefarbenes __________________ und sehr __________________ Zaehne."),
    p("5. Der Biber __________________ sich von Rinde und Zweigen."),
    p("6. Voegel haben __________________ statt Fell."),
    p("7. Der __________________ des Wolfes ist der __________________."),
    p("8. Viele Tiere sind __________________, weil ihr Lebensraum kleiner wird. Sie koennen sonst __________________."),
    empty(),
    pBold("Teil 2: Tier-Raetsel — ergaenze und rate."),
    empty(),
    p("a) Ich bin gross und habe graues __________________. Ich lebe im __________________ und"),
    p("   bin ein __________________. Ich heule nachts. Was bin ich? __________________."),
    empty(),
    p("b) Ich bin ein Vogel mit braunen __________________. Ich kann sehr hoch __________________."),
    p("   Ich habe __________________ Augen und fange kleine Tiere. Was bin ich? __________________."),
    empty(),
    p("c) Ich bin ein Baum. Im Winter verliere ich meine __________________. Ich wachse im __________________."),
    p("   Ich werde sehr alt und gross. Was bin ich? __________________ (Eiche oder Tanne?)"),
    empty(),
    pBold("Teil 3: Schreib selbst ein Tier-Raetsel (3-4 Saetze)."),
    empty(),
    p("Ich bin __________________. Ich __________________ und __________________. Was bin ich?"),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Tiere und Pflanzen (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Raubtier"),
    bullet("2. Pflanzenfresser — Blaetter"),
    bullet("3. lebt — fliegen"),
    bullet("4. Fell — scharfe"),
    bullet("5. ernaehrt"),
    bullet("6. Federn"),
    bullet("7. Lebensraum — Wald"),
    bullet("8. gefaehrdet — aussterben"),
    pItalic("Nicht verwendet (Ablenkwoerter): Zaehne"),
    empty(),
    pBold("Teil 2: Raetsel-Loesungen"),
    bullet("a) Fell — Wald — Raubtier → Der Wolf"),
    bullet("b) Federn — fliegen — scharfe → Der Adler"),
    bullet("c) Blaetter — Wald → Die Eiche (verliert Blaetter im Herbst; Tanne bleibt gruen)"),
    empty(),
    pBold("Teil 3: individuelle Raetsel"),
    pItalic("Muster: Ich bin ein kleines Tier mit orangefarbenem Fell. Ich lebe im Wald. Ich bin sehr schlau und fresse Maeuse und Beeren. Was bin ich? — Der Fuchs."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Tiere und Pflanzen"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Lebensraeume und ihre Bewohner"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Lebensraum", { width: 2000 }), hCell("Tiere", { width: 3800 }), hCell("Pflanzen", { width: 3838 })] }),
        new TableRow({ children: [dCell("Wald"), dCell("Wolf, Fuchs, Reh, Wildschwein, Eule"), dCell("Eiche, Tanne, Farn, Moos, Pilze")] }),
        new TableRow({ children: [dCell("Fluss / See"), dCell("Biber, Ente, Frosch, Fisch, Reiher"), dCell("Schilfrohr, Seerosen, Wasserpflanzen")] }),
        new TableRow({ children: [dCell("Wiese / Feld"), dCell("Hase, Schmetterling, Biene, Maus"), dCell("Gaensbluemchen, Klee, Sonnenblume")] }),
        new TableRow({ children: [dCell("Gebirge"), dCell("Adler, Steinbock, Murmeltier, Luchs"), dCell("Almrose, Enzian, Bergkiefer")] }),
      ],
    }),
    empty(),
    pBold("Grammatik: Tiere beschreiben"),
    bullet("Lebensraum: Der Wolf lebt im Wald. / Der Adler lebt im Gebirge."),
    bullet("Koerper: Der Fuchs hat orangefarbenes Fell. / Der Adler hat scharfe Krallen."),
    bullet("Faehigkeiten: Der Biber kann Baeume faellen. / Der Adler kann sehr hoch fliegen."),
    bullet("Ernaehrung: Das Reh ernaehrt sich von Pflanzen. / Der Wolf frisst andere Tiere."),
    bullet("Gefaehrdung: Der Wolf ist (nicht mehr) gefaehrdet. / Viele Tiere sind vom Aussterben bedroht."),
    empty(),
    pBold("Aufgabe: Beschreibe 2 Tiere aus der Tabelle in je 3 Saetzen."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Tiere und Pflanzen (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("Genus bei Tieren: oft der (maskulin) fuer maennliche Tiere, die (feminin) fuer weibliche. Neutrum: das Reh, das Pferd, das Lamm. Viele Tiere haben nur eine Form fuer beide Geschlechter."),
    bullet("leben in/an/auf + Dativ: im Wald (= in dem Wald), am Fluss (= an dem Fluss), auf der Wiese."),
    bullet("sich ernaehren von + Dativ: von Pflanzen, von kleinen Tieren, von Insekten."),
    bullet("Komparativ bei Eigenschaften: Der Adler sieht schaerfer als der Fuchs. / Der Wolf ist groesser als der Fuchs."),
    empty(),
    pBold("Loesung Aufgabe — Mustersaetze"),
    bullet("Der Biber lebt an Fluessen und Seen. Er hat scharfe Zaehne und baut Daemme. Er ernaehrt sich von Rinde und Blaettern."),
    bullet("Der Schmetterling lebt auf Wiesen und Feldern. Er hat bunte Fluegel und kann fliegen. Er ernaehrt sich von Blutennektar."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Tiere und Pflanzen"), empty(),
    pBold("Dialog 1: Im Naturkundemuseum"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lena"), dCell("Schau mal, ein ausgestopfter Wolf! Der ist so gross!")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Wusstest du, dass Woelfe in Rudeln leben? Das sind Gruppen von 5 bis 15 Tieren.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Echt? Das wusste ich nicht. Woelfe haben mich immer ein bisschen erschreckt.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ich finde sie faszinierend! Sie sind sehr intelligent und kommunizieren mit Heulen.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Stimmt, das habe ich im Fernsehen gesehen. Sind Woelfe gefaehrlich fuer Menschen?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Normalerweise nicht — sie meiden Menschen. Aber man sollte sie trotzdem in Ruhe lassen.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Gut zu wissen! Schau jetzt mal den Adler an — der ist auch beeindruckend.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Lieblingspflanze"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Was ist deine Lieblingspflanze?")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Die Sonnenblume! Sie ist so gross und leuchtend gelb. Was ist deine?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich mag am liebsten die Tanne. Im Winter ist sie gruen und riecht so schoen.")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Ah, wie zu Weihnachten! Habt ihr einen echten Weihnachtsbaum?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ja, immer! Meine Oma holt ihn jedes Jahr frisch aus dem Wald.")] }),
        new TableRow({ children: [dCell("Felix"), dCell("Das klingt schoen. Ich finde Pflanzen aus der Natur viel schoner als aus dem Laden.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Tier-Raetsel-Spiel"),
    pItalic("Denk dir ein Tier oder eine Pflanze. Beschreibe es in 3-4 Saetzen, ohne den Namen zu nennen. Die anderen raten."),
    pItalic("Hilfe: Sag wo es lebt, was es frisst/braucht, wie es aussieht, was es kann."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Meine Beschreibung", { width: 7000 }), hCell("Antwort", { width: 2638 })] }),
        new TableRow({ children: [dCell("", { width: 7000 }), dCell("", { width: 2638 })] }),
        new TableRow({ children: [dCell("", { width: 7000 }), dCell("", { width: 2638 })] }),
        new TableRow({ children: [dCell("", { width: 7000 }), dCell("", { width: 2638 })] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Natur und Tiere"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingstier in der Natur?"), dCell("")] }),
        new TableRow({ children: [dCell("Lebst du lieber in der Stadt oder in der Natur?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du schon mal ein wildes Tier gesehen?"), dCell("")] }),
        new TableRow({ children: [dCell("Welche Pflanze magst du am liebsten?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Tier findest du am faszinierendsten?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Tiere und Pflanzen (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wusstest du, dass ...? = Frage mit indirektem Nebensatz (dass + Verb am Ende)"),
    bullet("Sie meiden Menschen. = meiden = aus dem Weg gehen"),
    bullet("Man sollte sie in Ruhe lassen. = man + Konjunktiv II sollte (hoefliche Empfehlung)"),
    bullet("Das ist auch beeindruckend. = Adjektiv beeindruckend attributiv verwendet"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was ist deine Lieblingspflanze? = Fragen mit Possessivpronomen"),
    bullet("Sie riecht so schoen. = riechen + Adjektiv (Sinnesverb ohne 'nach')"),
    bullet("Ich finde ... viel schoner als ... = Vergleich mit Komparativ + als"),
    empty(),
    pBold("Bewertungskriterien Raetsel-Spiel:"),
    bullet("Lebensraum korrekt angegeben (im Wald, am Fluss, auf der Wiese ...)"),
    bullet("Koerperbeschreibung mit hat + Akkusativ"),
    bullet("Mindestens eine Faehigkeit mit koennen"),
    bullet("Beschreibung eindeutig genug, um das Tier / die Pflanze zu erkennen"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Tiere und Pflanzen"), empty(),
    pBold("Aufgabe 1: Schreib den Namen und den Lebensraum zu jedem Bild."),
    p("[BILD 1: Sechs Bilder — Wolf, Adler, Biber, Reh, Eiche (Herbst), Sonnenblume]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild A]", { width: 1580 }), hCell("[Bild B]", { width: 1580 }), hCell("[Bild C]", { width: 1580 }), hCell("[Bild D]", { width: 1580 }), hCell("[Bild E]", { width: 1580 }), hCell("[Bild F]", { width: 1738 })] }),
        new TableRow({ children: [dCell("Name: ____"), dCell("Name: ____"), dCell("Name: ____"), dCell("Name: ____"), dCell("Name: ____"), dCell("Name: ____")] }),
        new TableRow({ children: [dCell("Lebt: ____"), dCell("Lebt: ____"), dCell("Lebt: ____"), dCell("Lebt: ____"), dCell("Lebt: ____"), dCell("Lebt: ____")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was fressen diese Tiere? Verbinde und schreib Saetze."),
    p("[BILD 2: Zwei Spalten — links: Tierbilder (Wolf, Reh, Biber, Schmetterling), rechts: Nahrungsbilder (Gras/Blaetter, kleines Tier/Maus, Blumennektar, Rinde/Zweige) — Linien ziehen]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2400 }), hCell("Nahrung", { width: 3000 }), hCell("Satz", { width: 4238 })] }),
        new TableRow({ children: [dCell("Wolf"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Reh"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Biber"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Schmetterling"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Wo leben diese Tiere? Zeichne oder schreibe."),
    p("[BILD 3: Vier Lebensraum-Bilder — Wald, Fluss, Wiese, Gebirge — je mit beschrifteten Pfeilen und leeren Linien]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Wald", { width: 2350 }), hCell("Fluss", { width: 2350 }), hCell("Wiese", { width: 2350 }), hCell("Gebirge", { width: 2588 })] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Zeichne und beschreibe dein Lieblingstier aus der Natur."),
    p("[BILD 4: Leere Zeichenflaeche]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Lieblingstier:"), empty(), empty(), empty()],
      })]})],
    }),
    empty(),
    p("Das Tier heisst: ____________________________"),
    p("Es lebt: ____________________________"),
    p("Es kann: ____________________________"),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Tiere und Pflanzen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: (abhaengig von Bildreihenfolge)"),
    pItalic("Wolf — im Wald / in Waeldern und Feldern; Adler — im Gebirge; Biber — an Fluessen; Reh — im Wald; Eiche — im Wald; Sonnenblume — auf Wiesen/Feldern."),
    empty(),
    pBold("Aufgabe 2: Nahrung + Saetze"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tier", { width: 2000 }), hCell("Nahrung", { width: 3200 }), hCell("Satz", { width: 4438 })] }),
        new TableRow({ children: [dCell("Wolf"), dCell("kleines Tier / Maus"), dCell("Der Wolf frisst andere Tiere.")] }),
        new TableRow({ children: [dCell("Reh"), dCell("Gras / Blaetter"), dCell("Das Reh ernaehrt sich von Gras und Blaettern.")] }),
        new TableRow({ children: [dCell("Biber"), dCell("Rinde / Zweige"), dCell("Der Biber frisst Rinde und Zweige.")] }),
        new TableRow({ children: [dCell("Schmetterling"), dCell("Blumennektar"), dCell("Der Schmetterling trinkt Nektar aus Blueten.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Lebensraeume (Musterloesung)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Wald", { width: 2350 }), hCell("Fluss", { width: 2350 }), hCell("Wiese", { width: 2350 }), hCell("Gebirge", { width: 2588 })] }),
        new TableRow({ children: [dCell("Wolf, Fuchs, Reh, Eule"), dCell("Biber, Ente, Frosch"), dCell("Hase, Biene, Schmetterling"), dCell("Adler, Steinbock")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Tiername korrekt, Lebensraum angegeben, mindestens eine Faehigkeit genannt."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Tiere und Pflanzen");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
