"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "04_ZahlenFarbenFormen", "03_Formen");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";

const PAGE_PROPS = {
  page: {
    size:   { width: 11906, height: 16838 },
    margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }
  }
};

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: "",
      alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 720, hanging: 360 } },
        run: { font: "Symbol" }
      }
    }]
  }]
};

function docHeader() {
  return new Header({ children: [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({
        text: "A1 Kinder -- Zahlen, Farben, Formen -- Formen",
        italics: true, color: GRAY, size: 18, font: "Arial"
      })]
    })
  ]});
}

function docFooter() {
  return new Footer({ children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Seite ",                     color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ children: [PageNumber.CURRENT],     color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ text: " von ",                      color: GRAY, size: 18, font: "Arial" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" }),
      ]
    })
  ]});
}

function makeDoc(children) {
  return new Document({
    numbering: NUMBERING,
    sections: [{ properties: PAGE_PROPS,
      headers: { default: docHeader() },
      footers: { default: docFooter() },
      children
    }]
  });
}

async function save(doc, filename) {
  const buf  = await Packer.toBuffer(doc);
  const dest = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(dest, buf);
  console.log("OK  " + filename);
}

function h1(text) {
  return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })] });
}
function h2(text) {
  return new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })] });
}
function p(text, opts) {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] });
}
function pBold(text)   { return p(text, { bold: true }); }
function pItalic(text) { return p(text, { italics: true }); }
function empty()       { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() {
  return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] });
}
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br()          { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text, size: 24, font: "Arial" })] });
}

function studentHead() {
  return new Table({
    width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Name: _________________________________")] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Datum: ________________________________")] })
    ]})]
  });
}

function hCell(text) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })] });
}
function dCell(text, opts) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] })] });
}

const TOPIC = "A1_Kinder_ZahlenFarbenFormen_03_Formen";

function makeFormenTable() {
  const formen = [
    ["der Kreis", "das Quadrat", "das Rechteck", "das Dreieck"],
    ["der Stern", "das Oval", "die Raute", "das Herz"],
  ];
  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: Array(4).fill(2250),
    rows: formen.map(function(row, ri) {
      return new TableRow({ children: row.map(function(cell) {
        return new TableCell({
          width: { size: 2250, type: WidthType.DXA },
          shading: { fill: ri % 2 === 0 ? LIGHT : "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cell, bold: true, size: 24, font: "Arial" })] })]
        });
      })});
    })
  });
}

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Formen -- Uebersicht"),
    makeFormenTable(),
    empty(),
    h2("Aufgabe 1: Welche Form hat das?"),
    p("Schreibe die Form auf. Benutze: Das ist ein/eine ..."),
    empty(),
    pBold("Beispiel:  ein Ball"),
    p("Ein Ball ist ein Kreis (von der Seite)."),
    empty(),
    p("a)  ein Fenster:    Das ist _________________________________________."),
    p("b)  eine Pizza:     Das ist _________________________________________."),
    p("c)  ein Stopp-Schild: Das ist _______________________________________."),
    p("d)  ein Briefumschlag: Das ist ______________________________________."),
    p("e)  ein Weihnachtsbaum: Das ist _____________________________________."),
    empty(),
    h2("Aufgabe 2: Schreibe Saetze nach dem Muster."),
    empty(),
    pBold("Muster:  Tisch / Rechteck"),
    p("Der Tisch hat die Form eines Rechtecks."),
    empty(),
    p("a)  Rad / Kreis:            _________________________________________"),
    p("b)  Flagge / Rechteck:      _________________________________________"),
    p("c)  Dachform / Dreieck:     _________________________________________"),
    p("d)  Ei / Oval:              _________________________________________"),
    p("e)  Spielkarte / Raute:     _________________________________________"),
    empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."),
    empty(),
    p("a)  Ein __________________ hat drei Ecken."),
    p("b)  Ein __________________ hat keine Ecken. Er ist rund."),
    p("c)  Ein __________________ hat vier gleiche Seiten."),
    p("d)  Ein __________________ hat vier Seiten, aber nicht alle sind gleich."),
    p("e)  Ich liebe dich! Ich zeichne ein __________________ fuer dich."),
    empty(),
    br(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schau dich im Klassenzimmer um. Welche Formen siehst du? Schreibe 3-5 Saetze."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Formen"),
    pItalic("Hinweis: Individuelle Antworten akzeptieren, wenn die Satzstruktur stimmt."),
    empty(),
    h2("Aufgabe 1"),
    p("a) Ein Fenster ist ein Rechteck."),
    p("b) Eine Pizza ist ein Kreis."),
    p("c) Ein Stopp-Schild ist ein Achteck (auf A1: auch Kreis akzeptieren)."),
    p("d) Ein Briefumschlag ist ein Rechteck."),
    p("e) Ein Weihnachtsbaum hat die Form eines Dreiecks."),
    empty(),
    h2("Aufgabe 2"),
    p("a) Das Rad hat die Form eines Kreises."),
    p("b) Die Flagge hat die Form eines Rechtecks."),
    p("c) Die Dachform hat die Form eines Dreiecks."),
    p("d) Das Ei hat die Form eines Ovals."),
    p("e) Die Spielkarte hat die Form einer Raute."),
    empty(),
    h2("Aufgabe 3"),
    p("a) Ein [Dreieck] hat drei Ecken."),
    p("b) Ein [Kreis] hat keine Ecken."),
    p("c) Ein [Quadrat] hat vier gleiche Seiten."),
    p("d) Ein [Rechteck] hat vier Seiten, aber nicht alle sind gleich."),
    p("e) Ich zeichne ein [Herz] fuer dich."),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Mindestens 3 Formen korrekt benannt"),
    bullet("Das ist ein/eine ... korrekt formuliert"),
    bullet("Artikel (der/die/das) korrekt verwendet"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Lukas baut eine Stadt aus Formen"),
    p("Ich heisse Lukas. Ich bin 8 Jahre alt. Ich baue gern Dinge aus Papier.", { size: 26 }),
    p("Heute baue ich eine Stadt. Ich schneide viele Formen aus. Ich nehme ein grosses blaues Rechteck fuer ein Haus. Das Dach ist ein rotes Dreieck.", { size: 26 }),
    p("Die Sonne ist ein gelber Kreis. Die Fenster sind kleine weisse Quadrate. Die Tuere ist ein braunes Rechteck, aber kleiner.", { size: 26 }),
    p("Ich zeichne auch einen Stern am Himmel. Er ist orange. Und ich male ein gruenes Oval fuer einen Busch vor dem Haus.", { size: 26 }),
    p("Meine kleine Schwester sieht das Bild. Sie malt ein grosses rosa Herz daneben. Jetzt ist das Bild fertig. Ich finde es sehr schoen!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Lukas ist 8 Jahre alt.                               R  /  F"),
    p("b)  Das Haus ist ein rotes Rechteck.                     R  /  F"),
    p("c)  Das Dach ist ein Dreieck.                            R  /  F"),
    p("d)  Die Fenster sind kleine weisse Kreise.               R  /  F"),
    p("e)  Der Stern ist orange.                                R  /  F"),
    p("f)  Die Schwester malt ein blaues Herz.                  R  /  F"),
    empty(),
    h2("Aufgabe 2: Welche Form und welche Farbe?"),
    p("Finde die Antworten im Text."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [3000, 3000, 3000],
      rows: [
        new TableRow({ children: [hCell("Gegenstand"), hCell("Form"), hCell("Farbe")] }),
        new TableRow({ children: [dCell("das Haus"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("das Dach"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("die Sonne"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("die Fenster"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("der Stern"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("das Herz"), dCell(""), dCell("")] }),
      ]
    }),
    empty(),
    br(),
    h2("Aufgabe 3: Beantworte die Fragen."),
    empty(),
    p("a)  Was baut Lukas heute?"),
    writeLine(), empty(),
    p("b)  Was malt die Schwester?"),
    writeLine(), empty(),
    h2("Aufgabe 4: Und du?"),
    p("Zeichne ein einfaches Haus aus Formen. Beschrifte die Formen auf Deutsch."),
    empty(),
    ...writeLines(6), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseübung Formen"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F  Das Haus ist ein blaues Rechteck."),
    p("c) R"),
    p("d) F  Die Fenster sind kleine weisse Quadrate."),
    p("e) R"),
    p("f) F  Die Schwester malt ein rosa Herz."),
    empty(),
    h2("Aufgabe 2"),
    p("das Haus     -- Rechteck   -- blau"),
    p("das Dach     -- Dreieck    -- rot"),
    p("die Sonne    -- Kreis      -- gelb"),
    p("die Fenster  -- Quadrate   -- weiss"),
    p("der Stern    -- Stern      -- orange"),
    p("das Herz     -- Herz       -- rosa"),
    empty(),
    h2("Aufgabe 3"),
    p("a) Lukas baut eine Stadt aus Papier."),
    p("b) Die Schwester malt ein grosses rosa Herz."),
    empty(),
    h2("Aufgabe 4"),
    p("Individuelle Zeichnungen akzeptieren. Formen-Namen auf Deutsch pruefen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Kreis", "Quadrat", "Rechteck", "Dreieck", "Stern", "Oval",
                   "Herz", "Raute", "Ecken", "Seiten", "Form", "rund"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: Array(6).fill(1500),
      rows: [
        new TableRow({ children: woerter.slice(0, 6).map(function(w) {
          return new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
        new TableRow({ children: woerter.slice(6).map(function(w) {
          return new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1.  Ein Ball ist ein ______________. Er hat keine Ecken."),
    p("2.  Ein ______________ hat drei Ecken und drei Seiten."),
    p("3.  Ein ______________ hat vier gleiche Seiten und vier Ecken."),
    p("4.  Ich zeichne ein ______________ fuer meine Mama. Sie mag es!"),
    p("5.  Ein Ei hat die ______________ eines Ovals."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."),
    empty(),
    p("A:  Was zeichnest du?"),
    p("B:  Ich zeichne einen ______________. Er hat fuenf Spitzen."),
    p("A:  Und was ist das hier?"),
    p("B:  Das ist ein ______________. Es hat keine ______________, es ist ______________."),
    p("A:  Wie viele ______________ hat ein Rechteck?"),
    p("B:  Ein Rechteck hat vier ______________."),
    empty(),
    br(),
    h2("Teil 3: Schreibe ueber Formen in deinem Alltag."),
    p("Ergaenze mit deinen eigenen Angaben:"),
    empty(),
    p("Ein __________________ sieht man oft bei __________________."),
    p("Das Fenster hat die Form eines __________________."),
    p("Ich mag die Form __________________ am liebsten."),
    empty(),
    ...writeLines(2), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Formen"),
    empty(),
    h2("Teil 1"),
    p("1.  [Kreis]"),
    p("2.  [Dreieck]"),
    p("3.  [Quadrat]"),
    p("4.  [Herz]"),
    p("5.  [Form]"),
    empty(),
    p("(Ablenkwoerter: Rechteck, Stern, Oval, Raute, Ecken, Seiten nicht alle benoetigt)"),
    empty(),
    h2("Teil 2"),
    p("B:  Ich zeichne einen [Stern]."),
    p("B:  Das ist ein [Kreis / Oval]. Es hat keine [Ecken], es ist [rund]."),
    p("A:  Wie viele [Seiten] hat ein Rechteck?"),
    p("B:  Ein Rechteck hat vier [Seiten]."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "der Kreis / die Kreise",       wortart: "Nomen (m)", beispiel: "Ein Rad ist ein Kreis." },
  { wort: "das Quadrat / die Quadrate",   wortart: "Nomen (n)", beispiel: "Das Quadrat hat vier gleiche Seiten." },
  { wort: "das Rechteck / die Rechtecke", wortart: "Nomen (n)", beispiel: "Das Fenster ist ein Rechteck." },
  { wort: "das Dreieck / die Dreiecke",   wortart: "Nomen (n)", beispiel: "Das Dach hat die Form eines Dreiecks." },
  { wort: "der Stern / die Sterne",       wortart: "Nomen (m)", beispiel: "Ich zeichne einen Stern." },
  { wort: "das Oval / die Ovale",         wortart: "Nomen (n)", beispiel: "Ein Ei hat die Form eines Ovals." },
  { wort: "die Raute / die Rauten",       wortart: "Nomen (f)", beispiel: "Eine Raute hat vier gleiche Seiten." },
  { wort: "das Herz / die Herzen",        wortart: "Nomen (n)", beispiel: "Ich zeichne ein Herz fuer dich." },
  { wort: "die Ecke / die Ecken",         wortart: "Nomen (f)", beispiel: "Ein Dreieck hat drei Ecken." },
  { wort: "die Seite / die Seiten",       wortart: "Nomen (f)", beispiel: "Ein Quadrat hat vier Seiten." },
  { wort: "rund",                         wortart: "Adjektiv",  beispiel: "Ein Kreis ist rund." },
  { wort: "Welche Form hat ...?",         wortart: "Frage",     beispiel: "Welche Form hat das Fenster?" },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach(function(e, i) {
    rows.push(empty());
    rows.push(new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort / Phrase", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispielsatz", bold: true, size: 22, font: "Arial" })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wort, bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wortart, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.beispiel, size: 24, font: "Arial", italics: true })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Uebersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }),
        ]}),
      ]
    }));
    if (i === 5) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Formen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Formen! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Zeichne die Form neben das Wort -- so merkst du dir den Namen besser!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Formen"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Dreieck (drei + Ecke), Rechteck (recht + Ecke), Quadrat (lat. quadratus) -- Wortbildung erklaeren."),
    bullet("Artikel merken: der Kreis/Stern, das Quadrat/Rechteck/Dreieck/Oval/Herz, die Raute."),
    bullet("Ecken zaehlen: Kreis = 0, Dreieck = 3, Quadrat/Rechteck = 4, Stern = 5 oder 6."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Ich denke an eine Form."),
    p("Person A denkt an eine Form. Person B stellt Fragen."),
    empty(),
    p("B:  Ist die Form rund?"),
    p("A:  Ja!  /  Nein."),
    p("B:  Hat sie Ecken?"),
    p("A:  Ja, __________ Ecken.  /  Nein, keine Ecken."),
    p("B:  Ist es ein __________?"),
    p("A:  Ja, genau!  /  Nein, es ist ein __________."),
    empty(),
    pBold("Rollentausch! Person B denkt jetzt an eine Form."),
    empty(),
    h2("Dialoggeruest 2: Formen in unserem Alltag"),
    p("Schau dich im Klassenzimmer um. Nenne Dinge und ihre Formen."),
    empty(),
    p("A:  Welche Form hat __________?"),
    p("B:  __________ ist ein/eine __________."),
    p("A:  Richtig!  /  Ich glaube, es ist eher ein __________."),
    p("B:  Was hat die Form eines Dreiecks in unserem Zimmer?"),
    p("A:  Ich sehe __________.  /  Ich sehe nichts mit dieser Form."),
    empty(),
    pBold("Tauscht die Rollen!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Was ist deine Lieblingsform? Warum?"),
    writeLine(), empty(),
    p("2.  Nenne drei Dinge, die rund sind."),
    writeLine(), empty(),
    p("3.  Welche Form hat dein Tisch?"),
    writeLine(), empty(),
    p("4.  Wie viele Ecken hat ein Stern?"),
    writeLine(), empty(),
    p("5.  Nenne ein Ding in der Form eines Herzens."),
    writeLine(), empty(),
    h2("Gruppenspiel: Formen-Rate-Spiel"),
    p("Eine Person beschreibt eine Form (ohne den Namen zu sagen). Die anderen raten."),
    p("Beispiel: Sie hat drei Ecken und drei Seiten. --> Das Dreieck!"),
    empty(),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [5400, 3600],
      rows: [
        new TableRow({ children: [hCell("Beschreibung"), hCell("Loesung")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 3600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Konversation Formen"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel (Dreieck)"),
    p("B:  Ist die Form rund?  -->  A: Nein."),
    p("B:  Hat sie Ecken?  -->  A: Ja, drei Ecken."),
    p("B:  Ist es ein Dreieck?  -->  A: Ja, genau!"),
    empty(),
    h2("Dialoggeruest 2 - Beispiel"),
    p("A:  Welche Form hat das Fenster?"),
    p("B:  Das Fenster ist ein Rechteck."),
    p("A:  Was hat die Form eines Dreiecks?"),
    p("B:  Das Dach hat die Form eines Dreiecks."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Formen korrekt benannt mit Artikel (der/die/das)"),
    bullet("Ecken und Seiten korrekt beschrieben"),
    bullet("Ja/Nein-Fragen und Antworten korrekt formuliert"),
    bullet("Kommuniziert verstaendlich mit dem Partner"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Formen"),
    pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Was ist das fuer eine Form?"),
    p("[BILD 1: 8 geometrische Formen nebeneinander ohne Beschriftung: Kreis, Quadrat, Rechteck, Dreieck, Stern, Oval, Raute, Herz]"),
    empty(),
    p("Schreibe den Namen unter jede Form."),
    empty(),
    p("1. __________  2. __________  3. __________  4. __________"),
    p("5. __________  6. __________  7. __________  8. __________"),
    empty(),
    h2("Aufgabe 2: Wie viele Ecken hat die Form?"),
    p("[BILD 2: 5 Formen mit sichtbaren Ecken: Dreieck, Quadrat, Rechteck, Stern (5 Spitzen), Sechseck]"),
    empty(),
    p("Zaehle die Ecken und schreibe die Zahl und den Namen."),
    empty(),
    p("Form 1:  __________ Ecken -- das ist ein __________."),
    p("Form 2:  __________ Ecken -- das ist ein __________."),
    p("Form 3:  __________ Ecken -- das ist ein __________."),
    p("Form 4:  __________ Ecken -- das ist ein __________."),
    p("Form 5:  __________ Ecken -- das ist ein __________."),
    empty(),
    br(),
    h2("Aufgabe 3: Formen in unserem Alltag"),
    p("[BILD 3: 6 Alltagsgegenstaende: Pizza, Fenster, Stoppschild, Muenze/Geldstuck, Briefmarke, Dach eines Hauses]"),
    empty(),
    p("Welche Form hat jeder Gegenstand? Schreibe je einen Satz."),
    empty(),
    p("1.  ________________________________________________"),
    p("2.  ________________________________________________"),
    p("3.  ________________________________________________"),
    p("4.  ________________________________________________"),
    p("5.  ________________________________________________"),
    p("6.  ________________________________________________"),
    empty(),
    h2("Aufgabe 4: Formen-Bild"),
    p("[BILD 4: Ein buntes Bild das nur aus geometrischen Formen besteht -- z.B. ein Haus aus Rechteck + Dreieck, Sonne als Kreis, Baum als Dreieck auf Rechteck]"),
    empty(),
    p("Welche Formen siehst du im Bild? Schreibe sie auf."),
    writeLine(), writeLine(), empty(),
    h2("Aufgabe 5: Zeichne mit Formen."),
    p("Zeichne ein Bild nur mit geometrischen Formen (mindestens 5 verschiedene)."),
    p("Schreibe die Namen der Formen daneben."),
    empty(),
    ...writeLines(7), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Formen"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("1. Kreis  2. Quadrat  3. Rechteck  4. Dreieck"),
    p("5. Stern  6. Oval     7. Raute     8. Herz"),
    p("(Reihenfolge abhaengig vom Bild)"),
    empty(),
    h2("Aufgabe 2 -- Beispiel"),
    p("Form 1:  3 Ecken -- das ist ein Dreieck."),
    p("Form 2:  4 Ecken -- das ist ein Quadrat."),
    p("Form 3:  4 Ecken -- das ist ein Rechteck."),
    p("Form 4:  5 Ecken -- das ist ein Stern."),
    p("Form 5:  6 Ecken -- das ist ein Sechseck. (Hinweis: Sechseck auf A1 passiv einfuehren)"),
    empty(),
    h2("Aufgabe 3 -- Beispielantworten"),
    p("1. Die Pizza ist ein Kreis."),
    p("2. Das Fenster ist ein Rechteck."),
    p("3. Das Stoppschild ist ein Achteck / Kreis. (Akzeptieren was Schueler sehen)"),
    p("4. Die Muenze ist ein Kreis."),
    p("5. Die Briefmarke ist ein Rechteck."),
    p("6. Das Dach ist ein Dreieck."),
    empty(),
    h2("Aufgabe 4"),
    p("Antwort abhaengig vom Bild. Formen-Namen pruefen."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnungen akzeptieren. Mindestens 5 Formen-Namen auf Deutsch pruefen."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Artikel merken: der Kreis/Stern, das Quadrat/Rechteck/Dreieck/Oval/Herz, die Raute."),
    bullet("Aufgabe 5 als kreative Hausaufgabe gut geeignet."),
    bullet("Formen-Rate-Spiel aus der Konversation gut kombinierbar mit Aufgabe 4."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Dateien fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await schreiben();
  await schreiben_L();
  await lesen();
  await lesen_L();
  await luecken();
  await luecken_L();
  await wortliste();
  await wortliste_L();
  await konversation();
  await konversation_L();
  await bildaufgaben();
  await bildaufgaben_L();
  console.log("");
  console.log("Fertig! 12 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
