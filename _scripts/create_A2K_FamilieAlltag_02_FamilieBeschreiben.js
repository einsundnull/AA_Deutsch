"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "01_FamilieAlltag", "02_FamilieBeschreiben");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";

const PAGE_PROPS = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } };

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: "Symbol" } } }]
  }]
};

function docHeader() {
  return new Header({ children: [
    new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "A2 Kinder -- Familie & Alltag -- Familie beschreiben",
        italics: true, color: GRAY, size: 18, font: "Arial" })] })
  ]});
}
function docFooter() {
  return new Footer({ children: [
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "Seite ",                     color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ children: [PageNumber.CURRENT],     color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ text: " von ",                      color: GRAY, size: 18, font: "Arial" }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" }),
    ]})
  ]});
}
function makeDoc(children) {
  return new Document({ numbering: NUMBERING,
    sections: [{ properties: PAGE_PROPS, headers: { default: docHeader() }, footers: { default: docFooter() }, children }] });
}
async function save(doc, filename) {
  const buf  = await Packer.toBuffer(doc);
  const dest = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(dest, buf);
  console.log("OK  " + filename);
}
function h1(text) { return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })] }); }
function h2(text) { return new Paragraph({ spacing: { before: 200, after: 80 },  children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })] }); }
function p(text, opts) { return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] }); }
function pBold(text)   { return p(text, { bold: true }); }
function pItalic(text) { return p(text, { italics: true }); }
function empty()       { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } },
    spacing: { before: 240, after: 0 }, children: [new TextRun("")] });
}
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br()          { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, size: 24, font: "Arial" })] });
}
function studentHead() {
  return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Name: _________________________________")] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
        children: [p("Datum: ________________________________")] })
    ]})]
  });
}
function hCell(text) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: "Arial" })] })] });
}
function dCell(text, opts) {
  return new TableCell({ width: { size: 0, type: WidthType.AUTO },
    shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: [new TextRun(Object.assign({ text, size: 24, font: "Arial" }, opts || {}))] })] });
}

const TOPIC = "A2_Kinder_FamilieAlltag_02_FamilieBeschreiben";

// ============================================================================
// SCHREIBEN
// ============================================================================
async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibuebung: Familienmitglieder beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Adjektive zuordnen."),
    p("Welches Wort passt? Verbinde mit einer Linie oder schreibe Paare."),
    empty(),
    p("gross   <->   _______________"),
    p("dick    <->   _______________"),
    p("alt     <->   _______________"),
    p("lang    <->   _______________"),
    p("lustig  <->   _______________"),
    empty(),
    pItalic("Auswahl: klein, kurz, jung, duenn, ernst"),
    empty(),
    h2("Aufgabe 2: Beschreibe das Aussehen."),
    p("Schreibe je 2 Saetze ueber jede Person. Benutze: ist + Adjektiv / hat + Adjektiv + Nomen."),
    empty(),
    pBold("a)  Mein Vater"),
    p("Beispiel: Mein Vater ist gross. Er hat kurze, schwarze Haare."),
    writeLine(), writeLine(), empty(),
    pBold("b)  Meine Mutter"),
    writeLine(), writeLine(), empty(),
    pBold("c)  Mein Bruder / meine Schwester"),
    writeLine(), writeLine(), empty(),
    br(),
    h2("Aufgabe 3: Charakter beschreiben."),
    p("Welche 2 Adjektive passen zu jeder Person? Schreibe jeweils einen Satz."),
    p("Auswahl: freundlich, streng, lustig, ruhig, fleissig, faul, geduldig, nervoes, hilfsbereit, schuechtern"),
    empty(),
    pBold("a)  Meine Lehrerin"),
    writeLine(), empty(),
    pBold("b)  Mein bester Freund / meine beste Freundin"),
    writeLine(), empty(),
    pBold("c)  Meine Oma"),
    writeLine(), empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Beschreibe ein Familienmitglied genau. Schreibe 8-10 Saetze."),
    p("Tipp: Aussehen (Groesse, Haare, Augen, Kleidung) UND Charakter (lustig, freundlich, ...)."),
    ...writeLines(10), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Schreibuebung Familie beschreiben"),
    pItalic("Hinweis: Aufgaben 2-4 sind individuell. Hauptkriterien: Adjektive korrekt, Verben richtig konjugiert."),
    empty(),
    h2("Aufgabe 1 - Gegensaetze"),
    p("gross  <->  klein"),
    p("dick   <->  duenn"),
    p("alt    <->  jung"),
    p("lang   <->  kurz"),
    p("lustig <->  ernst"),
    empty(),
    h2("Aufgabe 2 - Bewertungskriterien"),
    bullet("ist + Adjektiv (z.B. 'Sie ist klein.')"),
    bullet("hat + Adjektiv + Nomen (z.B. 'Er hat blaue Augen.')"),
    bullet("Adjektivendung im Akkusativ (lange Haare, blaue Augen)"),
    bullet("Pronomen er/sie passend zur Person"),
    empty(),
    h2("Aufgabe 3 - Beispielloesung"),
    p("a)  Meine Lehrerin ist freundlich und geduldig."),
    p("b)  Mein bester Freund ist lustig und hilfsbereit."),
    p("c)  Meine Oma ist ruhig und freundlich."),
    p("(Individuelle Antworten akzeptieren.)"),
    empty(),
    h2("Aufgabe 4 - Bewertungskriterien"),
    bullet("Aussehen UND Charakter beschrieben"),
    bullet("Mindestens 5 verschiedene Adjektive"),
    bullet("ist + Adjektiv vs. hat + Adjektiv + Nomen korrekt verwendet"),
    bullet("8-10 Saetze, sinnvoll geordnet"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

// ============================================================================
// LESEN
// ============================================================================
async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseuebung: Familienmitglieder beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Meine Familie - alle sind anders"),
    p("Hallo! Ich bin Lara, 12 Jahre alt. Meine Familie ist nicht gross, aber alle sind ganz unterschiedlich.", { size: 26 }),
    p("Mein Vater Markus ist 45 Jahre alt. Er ist sehr gross (1,90 m!) und ein bisschen dick. Er hat kurze, braune Haare und einen Bart. Seine Augen sind gruen. Mein Vater ist ruhig und geduldig. Er wird nie wuetend, auch wenn ich Fehler mache.", { size: 26 }),
    p("Meine Mutter Karin ist 41 Jahre alt. Sie ist klein und schlank. Sie hat lange, blonde Haare und blaue Augen. Sie traegt fast immer eine Brille. Meine Mutter ist sehr lustig. Sie macht oft Witze und wir lachen viel zusammen. Aber sie ist auch streng, wenn ich meine Hausaufgaben nicht mache.", { size: 26 }),
    p("Mein Bruder Lukas ist 16 und sieht so aus wie unser Vater: gross, mit braunen Haaren. Aber sein Charakter ist anders. Er ist nervoes und manchmal richtig faul. Er sitzt den ganzen Tag am Computer.", { size: 26 }),
    p("Meine Oma Elsa wohnt bei uns. Sie ist 75 Jahre alt. Sie hat kurze, weisse Haare und braune Augen. Sie ist sehr freundlich und kocht das beste Essen der Welt!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Laras Vater ist 1,90 m gross.                          R  /  F"),
    p("b)  Die Mutter hat kurze Haare.                            R  /  F"),
    p("c)  Die Mutter ist immer ruhig.                            R  /  F"),
    p("d)  Lukas sieht so aus wie sein Vater.                     R  /  F"),
    p("e)  Die Oma wohnt nicht bei der Familie.                   R  /  F"),
    p("f)  Die Oma kocht sehr gut.                                R  /  F"),
    empty(),
    br(),
    h2("Aufgabe 2: Beantworte die Fragen in ganzen Saetzen."),
    empty(),
    p("a)  Welche Augenfarbe hat der Vater?"),
    writeLine(), empty(),
    p("b)  Wie ist die Mutter vom Charakter her?"),
    writeLine(), empty(),
    p("c)  Was macht Lukas den ganzen Tag?"),
    writeLine(), empty(),
    p("d)  Wie alt ist die Oma und wie sieht sie aus?"),
    writeLine(), empty(),
    h2("Aufgabe 3: Tabelle ausfuellen."),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [2000, 2000, 2500, 2500],
      rows: [
        new TableRow({ children: [hCell("Person"), hCell("Aussehen"), hCell("Charakter"), hCell("Besonderes")] }),
        new TableRow({ children: [dCell("Vater"),   dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Mutter"),  dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Lukas"),   dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Oma"),     dCell(""), dCell(""), dCell("")] }),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Leseuebung Familie beschreiben"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F - Sie hat lange, blonde Haare."),
    p("c) F - Sie ist lustig, kann aber streng sein."),
    p("d) R"),
    p("e) F - Die Oma wohnt bei der Familie."),
    p("f) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a)  Der Vater hat gruene Augen."),
    p("b)  Die Mutter ist lustig, aber auch streng."),
    p("c)  Lukas sitzt den ganzen Tag am Computer."),
    p("d)  Die Oma ist 75 Jahre alt. Sie hat kurze, weisse Haare und braune Augen."),
    empty(),
    h2("Aufgabe 3"),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: [2000, 2000, 2500, 2500],
      rows: [
        new TableRow({ children: [hCell("Person"), hCell("Aussehen"), hCell("Charakter"), hCell("Besonderes")] }),
        new TableRow({ children: [dCell("Vater"),  dCell("gross, dick, kurze braune Haare, Bart, gruene Augen"), dCell("ruhig, geduldig"), dCell("wird nie wuetend")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("klein, schlank, lange blonde Haare, blaue Augen, Brille"), dCell("lustig, manchmal streng"), dCell("macht Witze")] }),
        new TableRow({ children: [dCell("Lukas"),  dCell("gross, braune Haare"), dCell("nervoes, faul"), dCell("sitzt am Computer")] }),
        new TableRow({ children: [dCell("Oma"),    dCell("75, kurze weisse Haare, braune Augen"), dCell("freundlich"), dCell("kocht super")] }),
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

// ============================================================================
// LUECKEN
// ============================================================================
async function luecken() {
  const woerter = ["gross", "klein", "dick", "duenn", "lang", "kurz", "blau", "braun", "freundlich", "lustig", "streng", "ruhig", "ist", "hat"];
  const children = [
    studentHead(), empty(),
    h1("Lueckentext: Familie beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Woerterkasten"),
    p("Achtung: Es gibt mehr Woerter als Luecken!"),
    empty(),
    new Table({
      width:        { size: 9000, type: WidthType.DXA },
      columnWidths: Array(7).fill(1285),
      rows: [
        new TableRow({ children: woerter.slice(0, 7).map(function(w) {
          return new TableCell({ width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] });
        })}),
        new TableRow({ children: woerter.slice(7).map(function(w) {
          return new TableCell({ width: { size: 1285, type: WidthType.DXA },
            shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] });
        })}),
      ]
    }),
    empty(),
    h2("Teil 1: Mein Vater - ergaenze die Beschreibung."),
    empty(),
    p("Mein Vater ______________ 40 Jahre alt. Er ist nicht ______________, sondern eher ______________. Er hat kurze, ______________ Haare und ______________ Augen. Er ______________ einen Bart. Mein Vater ist sehr ______________ und ______________ kein Kind nervoes."),
    empty(),
    h2("Teil 2: Dialog ergaenzen."),
    empty(),
    p("A:  Wie sieht deine Schwester aus?"),
    p("B:  Sie ist ______________ als ich, ungefaehr 1,40 m. Sie hat ______________ Haare bis zur Huefte."),
    p("A:  Und welche Farbe haben ihre Augen?"),
    p("B:  ______________."),
    p("A:  Ist sie eher ruhig oder ______________?"),
    p("B:  Eher ruhig. Aber wenn sie mit Freundinnen ist, kann sie auch sehr ______________ sein."),
    empty(),
    br(),
    h2("Teil 3: Personenbeschreibung."),
    p("Beschreibe eine Person aus deiner Familie. Ergaenze die Saetze."),
    empty(),
    p("Diese Person ist mein/meine __________________."),
    p("Er/Sie ist __________________ Jahre alt."),
    p("Er/Sie ist __________________ und __________________."),
    p("Er/Sie hat __________________ Haare und __________________ Augen."),
    p("Vom Charakter her ist er/sie __________________."),
    p("Was ich an ihr/ihm besonders mag: __________________."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Lueckentext Familie beschreiben"),
    empty(),
    h2("Teil 1 - Beispielloesung"),
    p("Mein Vater [ist] 40 Jahre alt. Er ist nicht [klein], sondern eher [gross]. Er hat kurze, [braune] Haare und [blaue] Augen. Er [hat] einen Bart. Mein Vater ist sehr [ruhig/freundlich] und [ist] kein Kind nervoes."),
    empty(),
    p("(Mehrere Loesungen moeglich. Wichtig: passende Adjektive und korrekte Konjugation.)"),
    empty(),
    h2("Teil 2 - Beispielloesung"),
    p("A:  Wie sieht deine Schwester aus?"),
    p("B:  Sie ist [kleiner/klein] als ich, ungefaehr 1,40 m. Sie hat [lange] Haare bis zur Huefte."),
    p("A:  Und welche Farbe haben ihre Augen?"),
    p("B:  [Braun/Blau/Gruen]."),
    p("A:  Ist sie eher ruhig oder [lustig]?"),
    p("B:  Eher ruhig. Aber wenn sie mit Freundinnen ist, kann sie auch sehr [lustig] sein."),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

// ============================================================================
// WORTLISTE
// ============================================================================
const wortEintraege = [
  { wort: "gross / klein",         wortart: "Adjektiv",  beispiel: "Mein Vater ist gross, meine Mutter ist klein." },
  { wort: "dick / duenn / schlank", wortart: "Adjektiv",  beispiel: "Sie ist sehr schlank." },
  { wort: "alt / jung",            wortart: "Adjektiv",  beispiel: "Meine Oma ist alt, mein Bruder ist jung." },
  { wort: "lang / kurz",           wortart: "Adjektiv",  beispiel: "Sie hat lange Haare." },
  { wort: "die Haare",             wortart: "Nomen (Pl.)", beispiel: "Meine Haare sind braun." },
  { wort: "die Augen",             wortart: "Nomen (Pl.)", beispiel: "Sie hat blaue Augen." },
  { wort: "der Bart",              wortart: "Nomen (m)", beispiel: "Mein Vater hat einen Bart." },
  { wort: "die Brille",            wortart: "Nomen (f)", beispiel: "Meine Mutter traegt eine Brille." },
  { wort: "freundlich / nett",     wortart: "Adjektiv",  beispiel: "Meine Tante ist sehr nett." },
  { wort: "streng",                wortart: "Adjektiv",  beispiel: "Mein Lehrer ist streng." },
  { wort: "lustig",                wortart: "Adjektiv",  beispiel: "Mein Bruder ist sehr lustig." },
  { wort: "ruhig",                 wortart: "Adjektiv",  beispiel: "Meine Schwester ist ein ruhiges Kind." },
  { wort: "fleissig / faul",       wortart: "Adjektiv",  beispiel: "Anna ist fleissig, Tom ist faul." },
  { wort: "geduldig / nervoes",    wortart: "Adjektiv",  beispiel: "Sie ist sehr geduldig mit Kindern." },
  { wort: "aussehen wie",          wortart: "Verb-Phrase", beispiel: "Ich sehe aus wie meine Mutter." },
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
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort", bold: true, size: 22, font: "Arial" })] })] }),
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
    if (i === 6) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Familie beschreiben"), pItalic("Niveau: A2 | Kinder und Jugendliche"), p("Lerne die Adjektive und Phrasen. Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Lerne immer Gegensatzpaare zusammen: gross-klein, dick-duenn, alt-jung."), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Wortliste Familie beschreiben"),
    pItalic("Hinweis: Uebersetzungen sind individuell."),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) {
          return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] });
        }))
    }),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Adjektive in praedikativer Stellung (Sie ist klein.) erst hier sicher festigen — Adjektivendungen kommen spaeter."),
    bullet("Aussehen UND Charakter in einer Lektion verbinden."),
    bullet("Gegensatzpaare bewusst nutzen: gross-klein, alt-jung, fleissig-faul."),
    bullet("'haben' bei Koerpermerkmalen: Er hat blaue Augen / lange Haare / einen Bart."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

// ============================================================================
// KONVERSATION
// ============================================================================
async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Familie beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggeruest 1: Foto zeigen"),
    p("Du zeigst deinem Freund ein Foto deiner Familie."),
    empty(),
    p("A:  Wer ist denn das auf dem Foto?"),
    p("B:  Das ist meine ______________. Sie ist ______________ Jahre alt."),
    p("A:  Wow, sie sieht ______________ aus."),
    p("B:  Ja, und sie ist auch sehr ______________."),
    p("A:  Und der Mann neben ihr?"),
    p("B:  Das ist mein ______________. Er ist ______________ und hat ______________ Haare."),
    p("A:  Und das Kind?"),
    p("B:  Das bin ich!"),
    empty(),
    pBold("Rollentausch! Beschreibe jetzt DEINE Familie."),
    empty(),
    h2("Dialoggeruest 2: Wer ist das?"),
    p("Beschreibe eine Person — die andere raet, wer es ist."),
    empty(),
    p("A:  Diese Person ist ______________ Jahre alt."),
    p("    Sie/Er hat ______________ Haare und ______________ Augen."),
    p("    Sie/Er ist sehr ______________."),
    p("    Wer ist es?"),
    p("B:  Hmm, ist es deine ______________?"),
    p("A:  Ja / Nein, das ist ______________."),
    empty(),
    pBold("Rollentausch! Mindestens 3 Personen pro Spieler/in."),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wem in deiner Familie siehst du am aehnlichsten?"),
    writeLine(), empty(),
    p("2.  Welche Person in deiner Familie ist am lustigsten?"),
    writeLine(), empty(),
    p("3.  Wer ist die ruhigste / netteste Person?"),
    writeLine(), empty(),
    p("4.  Beschreibe deinen besten Freund / deine beste Freundin (Aussehen + Charakter)."),
    writeLine(), writeLine(), empty(),
    h2("Gruppenspiel: Personenraten"),
    p("Jeder beschreibt eine bekannte Person (Schauspieler, Sportler, Lehrer ...). Die Gruppe raet."),
    p("Hinweise: Aussehen + 1-2 Charaktereigenschaften, KEIN Name verraten!"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2500, 4500, 2000],
      rows: [
        new TableRow({ children: [hCell("Beschreiber/in"), hCell("Beschreibung"), hCell("Loesung")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
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
    h1("LOESUNG: Konversation Familie beschreiben"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggeruest 1 - Beispiel"),
    p("A:  Wer ist denn das auf dem Foto?"),
    p("B:  Das ist meine [Mutter]. Sie ist [42] Jahre alt."),
    p("A:  Wow, sie sieht [jung] aus."),
    p("B:  Ja, und sie ist auch sehr [lustig]."),
    p("A:  Und der Mann neben ihr?"),
    p("B:  Das ist mein [Vater]. Er ist [gross] und hat [kurze, braune] Haare."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Vollstaendige Saetze, Verben korrekt konjugiert"),
    bullet("Adjektive sinnvoll und korrekt verwendet"),
    bullet("Personalpronomen er/sie passend zur Person"),
    bullet("hat + Akkusativ richtig (lange Haare, blaue Augen)"),
    bullet("Aktive Beteiligung beider Partner"),
    empty(),
    h2("Hinweise fuer das Personenraten"),
    bullet("Mindestens 3 Hinweise pro Beschreibung verlangen"),
    bullet("Lustige Wiedererkennung (Lehrer, Promis, Sportler) motiviert"),
    bullet("Spiel foerdert Hoerverstehen UND Wortschatz"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

// ============================================================================
// BILDAUFGABEN
// ============================================================================
async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Familie beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."),
    empty(),
    h2("Aufgabe 1: Personenbeschreibung"),
    p("[BILD 1: Portrait einer Person, deutlich sichtbar: Haare, Augen, Brille, Alter ungefaehr]"),
    empty(),
    p("Beschreibe diese Person. Schreibe 5-7 Saetze. Denke an: Alter, Aussehen, Kleidung."),
    ...writeLines(7), empty(),
    h2("Aufgabe 2: 4 Personen - Adjektive zuordnen"),
    p("[BILD 2: Vier Personen-Portraits A, B, C, D mit unterschiedlichem Aussehen]"),
    empty(),
    p("Welches Adjektiv passt zu welcher Person? Schreibe Buchstabe + Adjektiv."),
    p("Adjektive: gross, klein, alt, jung, lustig, ernst, freundlich, streng"),
    empty(),
    p("Bild A: __________________"),
    p("Bild B: __________________"),
    p("Bild C: __________________"),
    p("Bild D: __________________"),
    empty(),
    br(),
    h2("Aufgabe 3: Sprechblasen"),
    p("[BILD 3: Mutter und Tochter, beide sprechen]"),
    empty(),
    p("Was sagen sie ueber sich selbst? Schreibe in die Sprechblasen."),
    empty(),
    p("Mutter: 'Ich bin __________________. Ich habe __________________.'"),
    writeLine(),
    p("Tochter: 'Ich bin __________________. Ich habe __________________.'"),
    writeLine(),
    empty(),
    h2("Aufgabe 4: Suchbild"),
    p("[BILD 4: Suchbild mit vielen Personen — Mama, Papa, Oma, Opa, Geschwister, Freunde]"),
    empty(),
    p("Suche im Bild und schreibe die Antworten:"),
    empty(),
    p("a)  Wer ist die aelteste Person?"),
    writeLine(), empty(),
    p("b)  Wer hat eine Brille?"),
    writeLine(), empty(),
    p("c)  Wer hat lange Haare?"),
    writeLine(), empty(),
    p("d)  Wer lacht?"),
    writeLine(), empty(),
    h2("Aufgabe 5: Mein Lieblingsmensch"),
    p("Zeichne deinen Lieblingsmenschen aus deiner Familie. Beschrifte alle wichtigen Merkmale (Haare, Augen, Bart, Brille, Kleidung)."),
    p("Schreibe 3 Saetze zu Charakter und Eigenschaften."),
    ...writeLines(5), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LOESUNG: Bildaufgaben Familie beschreiben"),
    pItalic("Hinweis: Antworten haengen von den eingefuegten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Erwartet: 5-7 Saetze."),
    p("Beispiel: 'Auf dem Bild sehe ich eine Frau. Sie ist ungefaehr 30 Jahre alt. Sie hat lange, blonde Haare und blaue Augen. Sie traegt eine Brille. Sie laechelt freundlich.'"),
    p("Bewertung: Adjektive korrekt, ist + Adj. / hat + Adj. + Nomen, vollstaendige Saetze."),
    empty(),
    h2("Aufgabe 2"),
    p("Loesung haengt vom Bild ab."),
    p("Erwartet: jedes Adjektiv passt eindeutig zu genau einer Person."),
    empty(),
    h2("Aufgabe 3"),
    p("Beispielloesung:"),
    p("Mutter: 'Ich bin gross und schlank. Ich habe braune Haare und gruene Augen.'"),
    p("Tochter: 'Ich bin klein. Ich habe blonde Haare und blaue Augen.'"),
    empty(),
    h2("Aufgabe 4"),
    p("Antworten haengen vom Suchbild ab."),
    p("Erwartet: ganze Saetze, korrekte Verben (Wer hat ... = Sie/Er hat ...)."),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Wichtig: Beschriftung mit deutschen Begriffen."),
    p("Erwartet: 3 Saetze zum Charakter mit verschiedenen Adjektiven."),
    empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("Suchbild-Aufgabe foerdert konzentriertes Hin- und Hersehen + Sprechen."),
    bullet("Eigene Lieblingsmenschen zu beschreiben aktiviert Lernende emotional."),
    bullet("Adjektive in Praedikativstellung sicher festigen, bevor Adjektivendungen behandelt werden."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  console.log("Erstelle Dateien fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await schreiben();      await schreiben_L();
  await lesen();          await lesen_L();
  await luecken();        await luecken_L();
  await wortliste();      await wortliste_L();
  await konversation();   await konversation_L();
  await bildaufgaben();   await bildaufgaben_L();
  console.log("");
  console.log("Fertig! 12 Dateien erstellt.");
}

main().catch(function(err) { console.error(err); process.exit(1); });
