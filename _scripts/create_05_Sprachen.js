"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "01_SichVorstellen", "05_Sprachen");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE="1F4E79", GRAY="888888", LIGHT="D5E8F0";
const PAGE_PROPS = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } };
const NUMBERING = { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: "Symbol" } } }] }] };

function docHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder -- Sich selbst vorstellen -- Sprachen", italics: true, color: GRAY, size: 18, font: "Arial" })] })] }); }
function docFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [ new TextRun({ text: "Seite ", color: GRAY, size: 18, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], color: GRAY, size: 18, font: "Arial" }), new TextRun({ text: " von ", color: GRAY, size: 18, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" }), ] })] }); }
function makeDoc(children) { return new Document({ numbering: NUMBERING, sections: [{ properties: PAGE_PROPS, headers: { default: docHeader() }, footers: { default: docFooter() }, children }] }); }
async function save(doc, filename) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf); console.log("OK  " + filename); }

function h1(t) { return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: t, bold: true, size: 36, color: BLUE, font: "Arial" })] }); }
function h2(t) { return new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })] }); }
function p(t, o) { return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text: t, size: 24, font: "Arial" }, o || {}))] }); }
function pBold(t) { return p(t, { bold: true }); }
function pItalic(t) { return p(t, { italics: true }); }
function empty() { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() { return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] }); }
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br() { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: t, size: 24, font: "Arial" })] }); }
function studentHead() { return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500], rows: [new TableRow({ children: [ new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Name: _________________________________")] }), new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Datum: ________________________________")] }) ]})] }); }
function hCell(t) { return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, font: "Arial" })] })] }); }
function dCell(t, o) { return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun(Object.assign({ text: t, size: 24, font: "Arial" }, o || {}))] })] }); }

const TOPIC = "A1_Kinder_SichVorstellen_05_Sprachen";

async function schreiben() {
  const c = [ studentHead(), empty(), h1("Schreibuebung: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), empty(),
    h2("Aufgabe 1: Antworte."), p("Welche Sprachen sprichst du?"), p("Ich spreche __________________________________________________."), empty(),
    h2("Aufgabe 2: Schreibe Saetze."), p("Schaue auf die Informationen und schreibe Saetze."), empty(),
    pBold("Beispiel: Lena -- Deutsch, Englisch"), p("Lena spricht Deutsch und Englisch."), empty(),
    pBold("a) Omar -- Arabisch, Englisch, Deutsch"), writeLine(), empty(),
    pBold("b) Yuki -- Japanisch, etwas Englisch"), writeLine(), empty(),
    pBold("c) Sofia -- Spanisch, Portugiesisch"), writeLine(), empty(),
    pBold("d) Ben -- Hebraeisch, Deutsch"), writeLine(), empty(),
    h2("Aufgabe 3: Ergaenze die Saetze."), empty(),
    p("a) Ich __________________ Deutsch und Englisch."),
    p("b) Welche Sprachen __________________ du?"),
    p("c) Er spricht __________________ (ein bisschen) Franzoesisch."),
    p("d) Meine Mutter spricht drei __________________."),
    p("e) In Deutschland __________________ die meisten Menschen Deutsch."),
    empty(), br(),
    h2("Aufgabe 4: Freies Schreiben"), p("Schreibe 3-5 Saetze: Welche Sprachen sprichst du? Welche moechtest du lernen?"),
    ...writeLines(5), empty() ];
  await save(makeDoc(c), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Schreibuebung Sprachen nennen"), pItalic("Individuelle Antworten akzeptieren, wenn Struktur stimmt."), empty(),
    h2("Aufgabe 1"), p("Ich spreche [Sprache(n)]."), empty(),
    h2("Aufgabe 2"),
    pBold("a)"), p("Omar spricht Arabisch, Englisch und Deutsch."), empty(),
    pBold("b)"), p("Yuki spricht Japanisch und etwas Englisch."), empty(),
    pBold("c)"), p("Sofia spricht Spanisch und Portugiesisch."), empty(),
    pBold("d)"), p("Ben spricht Hebraeisch und Deutsch."), empty(),
    h2("Aufgabe 3"),
    p("a) Ich [spreche] Deutsch und Englisch."),
    p("b) Welche Sprachen [sprichst] du?"),
    p("c) Er spricht [ein bisschen] Franzoesisch."),
    p("d) Meine Mutter spricht drei [Sprachen]."),
    p("e) In Deutschland [sprechen] die meisten Menschen Deutsch."), empty(),
    h2("Aufgabe 4 -- Bewertungskriterien"),
    bullet("Ich spreche ... korrekt verwendet"),
    bullet("Sprachnamen grossgeschrieben"),
    bullet("sprechen korrekt konjugiert"),
    bullet("und / auch / ein bisschen sinnvoll eingesetzt"), empty() ];
  await save(makeDoc(c), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const c = [ studentHead(), empty(), h1("Leseübung: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), empty(),
    h2("Lesetext: Sprachen in unserer Klasse"),
    p("Mein Name ist Nico. Ich bin 11 Jahre alt. Ich komme aus Deutschland. Ich spreche Deutsch und ein bisschen Englisch.", { size: 26 }),
    p("Meine Freundin heisst Leila. Sie kommt aus Marokko. Sie spricht Arabisch, Franzoesisch und jetzt auch Deutsch. Das sind drei Sprachen!", { size: 26 }),
    p("Mein Freund heisst Tao. Er kommt aus China. Er spricht Chinesisch und lernt gerade Deutsch. Er findet Deutsch schwer, aber er uebst jeden Tag.", { size: 26 }),
    p("Unser Lehrer Herr Koch spricht Deutsch, Englisch und Spanisch. Er sagt: Sprachen lernen macht Spass!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"), empty(),
    p("a) Nico spricht Deutsch und Englisch.                  R  /  F"),
    p("b) Leila spricht zwei Sprachen.                        R  /  F"),
    p("c) Tao kommt aus Japan.                                R  /  F"),
    p("d) Tao uebst jeden Tag Deutsch.                        R  /  F"),
    p("e) Herr Koch spricht vier Sprachen.                    R  /  F"),
    p("f) Herr Koch findet Sprachen lernen schoen.            R  /  F"),
    empty(),
    h2("Aufgabe 2: Beantworte die Fragen."), empty(),
    p("a) Welche Sprachen spricht Leila?"), writeLine(), empty(),
    p("b) Wie findet Tao die deutsche Sprache?"), writeLine(), empty(),
    p("c) Wie viele Sprachen spricht Herr Koch?"), writeLine(), empty(), br(),
    h2("Aufgabe 3: Verbinde."), p("Verbinde die Person mit den richtigen Sprachen."), empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [3000, 600, 5400],
      rows: [ ["Nico","Arabisch, Franzoesisch, Deutsch"], ["Leila","Chinesisch, lernt Deutsch"], ["Tao","Deutsch, Englisch, Spanisch"], ["Herr Koch","Deutsch, etwas Englisch"] ].map(function(pair) {
        return new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p(pair[0])] }),
          new TableCell({ width: { size: 600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("---")] }),
          new TableCell({ width: { size: 5400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p(pair[1])] }),
        ]});
      })
    }), empty() ];
  await save(makeDoc(c), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Leseübung Sprachen nennen"), empty(),
    h2("Aufgabe 1"),
    p("a) R"), p("b) F -- Leila spricht drei Sprachen: Arabisch, Franzoesisch und Deutsch."),
    p("c) F -- Tao kommt aus China."), p("d) R"),
    p("e) F -- Herr Koch spricht drei Sprachen."), p("f) R"), empty(),
    h2("Aufgabe 2"),
    p("a) Leila spricht Arabisch, Franzoesisch und Deutsch."),
    p("b) Tao findet Deutsch schwer."),
    p("c) Herr Koch spricht drei Sprachen."), empty(),
    h2("Aufgabe 3 -- Verbinden"),
    p("Nico      --> Deutsch, etwas Englisch"),
    p("Leila     --> Arabisch, Franzoesisch, Deutsch"),
    p("Tao       --> Chinesisch, lernt Deutsch"),
    p("Herr Koch --> Deutsch, Englisch, Spanisch"), empty() ];
  await save(makeDoc(c), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["spreche","spricht","Sprachen","welche","auch","lernt","bisschen","Welche","sprechen","gut"];
  const c = [ studentHead(), empty(), h1("Lueckentext: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), empty(),
    h2("Woerterkasten"), p("Achtung: Es gibt mehr Woerter als Luecken!"), empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: Array(5).fill(1800), rows: [
      new TableRow({ children: woerter.slice(0,5).map(function(w) { return new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] }); }) }),
      new TableRow({ children: woerter.slice(5).map(function(w) { return new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 24, font: "Arial" })] })] }); }) }),
    ]}), empty(),
    h2("Teil 1: Ergaenze die Saetze."), empty(),
    p("1. Ich ______________ Deutsch und Englisch."),
    p("2. ______________ Sprachen sprichst du?"),
    p("3. Er ______________ Spanisch und ein ______________ Franzoesisch."),
    p("4. Wir ______________ alle Deutsch in der Schule."),
    p("5. Mia spricht Deutsch und ______________ Tuerkisch."),
    empty(),
    h2("Teil 2: Ergaenze den Dialog."), empty(),
    p("A: Hallo! ______________ Sprachen sprichst du?"),
    p("B: Ich ______________ Russisch und Deutsch. Und du?"),
    p("A: Ich spreche Deutsch und ______________ Englisch."),
    p("B: Wie viele ______________ sprichst du insgesamt?"),
    p("A: Zwei -- Deutsch sehr ______________, Englisch ein bisschen."),
    p("B: Ich ______________ gerade auch Englisch!"),
    empty(), br(),
    h2("Teil 3: Schreibe ueber dich."), p("Ergaenze mit deinen eigenen Angaben:"), empty(),
    p("Ich spreche __________________."),
    p("Ich lerne gerade __________________."),
    p("Ich moechte noch __________________ lernen."),
    empty(), ...writeLines(2), empty() ];
  await save(makeDoc(c), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Lueckentext Sprachen nennen"), empty(),
    h2("Teil 1"),
    p("1. Ich [spreche] Deutsch und Englisch."),
    p("2. [Welche] Sprachen sprichst du?"),
    p("3. Er [spricht] Spanisch und ein [bisschen] Franzoesisch."),
    p("4. Wir [sprechen] alle Deutsch in der Schule."),
    p("5. Mia spricht Deutsch und [auch] Tuerkisch."),
    empty(), p("(Ablenker: lernt, gut nicht benoetigt.)"), empty(),
    h2("Teil 2"),
    p("A: [Welche] Sprachen sprichst du?"),
    p("B: Ich [spreche] Russisch und Deutsch. Und du?"),
    p("A: Ich spreche Deutsch und [auch] Englisch."),
    p("B: Wie viele [Sprachen] sprichst du insgesamt?"),
    p("A: Zwei -- Deutsch sehr [gut], Englisch ein bisschen."),
    p("B: Ich [lernt] gerade auch Englisch!  (Hinweis: lerne waere korrekt -- akzeptieren.)"),
    empty(), h2("Teil 3"), p("Individuelle Antworten akzeptieren."), empty() ];
  await save(makeDoc(c), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "die Sprache / die Sprachen",  wortart: "Nomen (f)", beispiel: "Deutsch ist eine Sprache." },
  { wort: "sprechen",                    wortart: "Verb",      beispiel: "Ich spreche Englisch." },
  { wort: "lernen",                      wortart: "Verb",      beispiel: "Ich lerne Deutsch." },
  { wort: "Welche Sprachen sprichst du?",wortart: "Frage",     beispiel: "Welche Sprachen sprichst du?" },
  { wort: "Ich spreche ...",             wortart: "Satz",      beispiel: "Ich spreche Deutsch und Englisch." },
  { wort: "ein bisschen",                wortart: "Adverb",    beispiel: "Ich spreche ein bisschen Spanisch." },
  { wort: "auch",                        wortart: "Adverb",    beispiel: "Ich spreche auch Franzoesisch." },
  { wort: "gut / sehr gut / ein bisschen", wortart: "Adverb",  beispiel: "Ich spreche gut Deutsch." },
  { wort: "die Muttersprache",           wortart: "Nomen (f)", beispiel: "Meine Muttersprache ist Arabisch." },
  { wort: "zweisprachig",                wortart: "Adjektiv",  beispiel: "Ich bin zweisprachig." },
  { wort: "uebersetzen",                 wortart: "Verb",      beispiel: "Kannst du das uebersetzen?" },
  { wort: "Deutsch / Englisch / Arabisch", wortart: "Sprachnamen", beispiel: "Ich lerne Englisch." },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach(function(e, i) {
    rows.push(empty());
    rows.push(new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2600, 2000, 4400], rows: [
      new TableRow({ tableHeader: true, children: [
        new TableCell({ width: { size: 2600, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort / Phrase", bold: true, size: 22, font: "Arial" })] })] }),
        new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
        new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispielsatz", bold: true, size: 22, font: "Arial" })] })] }),
      ]}),
      new TableRow({ children: [
        new TableCell({ width: { size: 2600, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wort, bold: true, size: 24, font: "Arial" })] })] }),
        new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wortart, size: 24, font: "Arial" })] })] }),
        new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.beispiel, size: 24, font: "Arial", italics: true })] })] }),
      ]}),
      new TableRow({ children: [ new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Uebersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] }) ] }),
    ]}));
    if (i === 5) rows.push(br());
  });
  const c = [studentHead(), empty(), h1("Wortliste: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), p("Lerne die Woerter! Schreibe die Uebersetzung in deine Sprache.")]
    .concat(rows).concat([empty(), p("Tipp: Schreibe die Woerter auf Lernkarten!"), empty()]);
  await save(makeDoc(c), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Wortliste Sprachen nennen"), pItalic("Uebersetzungen sind individuell."), empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2600, 2000, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort / Phrase"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(function(e) { return new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] }); }))
    }), empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("sprechen ist ein starkes Verb: ich spreche, du sprichst, er/sie spricht, wir sprechen."),
    bullet("Sprachnamen werden grossgeschrieben: Deutsch, Englisch, Arabisch."),
    bullet("Kein Artikel vor Sprachnamen: ich spreche Deutsch."),
    bullet("zweisprachig passiv einfuehren."), empty() ];
  await save(makeDoc(c), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const c = [ studentHead(), empty(), h1("Konversation: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche"), empty(),
    h2("Dialoggeruest 1: Ergaenze den Dialog."), p("Fuelle die Luecken aus und uebe mit deinem Partner."), empty(),
    p("A: Hallo! Ich heisse __________. Woher kommst du?"),
    p("B: Ich komme aus __________. Und du?"),
    p("A: Ich komme aus __________. Welche Sprachen __________ du?"),
    p("B: Ich __________ __________ und __________. Und du?"),
    p("A: Ich spreche __________ und ein bisschen __________."),
    p("B: Cool! __________ ist auch meine Lieblingssprache."),
    empty(), pBold("Rollentausch! Uebt noch einmal."), empty(),
    h2("Dialoggeruest 2: Sprachprofil vorstellen."),
    p("Fuelle dein Sprachprofil aus und stelle es der Klasse vor."), empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4000, 5000], rows: [
      new TableRow({ children: [hCell("Frage"), hCell("Meine Antwort")] }),
      new TableRow({ children: [ new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Meine Muttersprache ist:")] }), new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }) ] }),
      new TableRow({ children: [ new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Ich spreche auch:")] }), new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }) ] }),
      new TableRow({ children: [ new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Ich lerne gerade:")] }), new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }) ] }),
      new TableRow({ children: [ new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Ich moechte noch lernen:")] }), new TableCell({ width: { size: 5000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }) ] }),
    ]}), empty(),
    p("Praesentation: Meine Muttersprache ist __________. Ich spreche auch __________."),
    p("Ich lerne gerade __________. Ich moechte noch __________ lernen."),
    empty(), br(),
    h2("Partnerinterview"), empty(),
    p("1. Welche Sprachen sprichst du?"), writeLine(), empty(),
    p("2. Wie gut sprichst du Deutsch? (sehr gut / gut / ein bisschen)"), writeLine(), empty(),
    p("3. Welche Sprache ist am schwierigsten fuer dich?"), writeLine(), empty(),
    p("4. Welche Sprache moechtest du noch lernen? Warum?"), writeLine(), empty(),
    p("5. Welche Sprache klingt am schoensten?"), writeLine(), empty(),
    h2("Gruppenspiel: Sprachendetektiv"),
    p("Gehe zu 4 Mitschuelerinnen/Mitschuelern. Frage: Welche Sprachen sprichst du?"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [3000, 6000], rows: [
      new TableRow({ children: [hCell("Name"), hCell("Sprachen")] }),
      ...[0,1,2,3].map(function() { return new TableRow({ children: [
        new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
        new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
      ]}); })
    ]}), empty() ];
  await save(makeDoc(c), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Konversation Sprachen nennen"), pItalic("Keine festen Antworten. Bewertung nach Kriterien."), empty(),
    h2("Dialoggeruest 1 -- Beispiel"),
    p("A: Ich heisse [Name]. Woher kommst du?"),
    p("B: Ich komme aus [Land]. Und du?"),
    p("A: Ich komme aus [Land]. Welche Sprachen [sprichst] du?"),
    p("B: Ich [spreche] [Sprache] und [Sprache]. Und du?"),
    p("A: Ich spreche [Sprache] und ein bisschen [Sprache]."), empty(),
    h2("Bewertungskriterien"),
    bullet("Ich spreche ... und Er/Sie spricht ... korrekt"),
    bullet("Sprachnamen grossgeschrieben"),
    bullet("Muttersprache / weitere Sprachen klar unterschieden"),
    bullet("Kommuniziert verstaendlich"), empty() ];
  await save(makeDoc(c), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const c = [ studentHead(), empty(), h1("Bildaufgaben: Sprachen nennen"), pItalic("Niveau: A1 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefuegt."), empty(),
    h2("Aufgabe 1"),
    p("[BILD 1: Sechs Sprachblasen mit Begruessung: Hallo (Deutsch), Hello (Englisch), Bonjour (Franzoesisch), Hola (Spanisch), Ciao (Italienisch), Marhaba (Arabisch)]"),
    empty(), p("Welche Sprache ist das? Ordne zu."), empty(),
    p("Hallo   --> __________________________"),
    p("Hello   --> __________________________"),
    p("Bonjour --> __________________________"),
    p("Hola    --> __________________________"),
    p("Ciao    --> __________________________"),
    p("Marhaba --> __________________________"),
    empty(),
    h2("Aufgabe 2"),
    p("[BILD 2: Vier Kinder mit Sprechblasen: Kind 1: Konnichiwa! Kind 2: Shalom! Kind 3: Ola! Kind 4: Ni hao!]"),
    empty(), p("Aus welchem Land kommt jedes Kind? Schreibe Saetze."), empty(),
    pBold("Kind 2 (Shalom):"), writeLine(), empty(),
    pBold("Kind 3 (Ola):"), writeLine(), empty(),
    pBold("Kind 4 (Ni hao):"), writeLine(), empty(),
    br(),
    h2("Aufgabe 3"),
    p("[BILD 3: Weltkarte mit Sprachregionen: Deutsch -- Mitteleuropa, Arabisch -- Naher Osten/Nordafrika, Mandarin -- Ostasien, Spanisch -- Lateinamerika]"),
    empty(), p("Wo spricht man diese Sprache?"), empty(),
    p("Deutsch spricht man in __________________________."),
    p("Arabisch spricht man in __________________________."),
    p("Spanisch spricht man in __________________________."),
    p("Englisch spricht man in __________________________."),
    empty(),
    h2("Aufgabe 4"),
    p("[BILD 4: Ein Kind vor einer Tafel mit leerer Sprechblase.]"),
    empty(), p("Das Kind erklart, welche Sprachen es spricht. Schreibe in die Sprechblase."),
    p("Sprechblase: ___________________________________________________"), writeLine(), empty(),
    h2("Aufgabe 5: Mein Sprachbaum"),
    p("[BILD 5: Ein leerer Baum mit Aesten und Blaettern]"),
    p("Schreibe auf jeden Ast eine Sprache, die du sprichst oder lernen moechtest."),
    p("Schreibe darunter 2-3 Saetze ueber dein Sprachprofil."),
    ...writeLines(4), empty() ];
  await save(makeDoc(c), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const c = [ studentHead(), empty(), h1("LOESUNG: Bildaufgaben Sprachen nennen"), pItalic("Antworten haengen teilweise von den Bildern ab."), empty(),
    h2("Aufgabe 1"),
    p("Hallo   --> Deutsch"),
    p("Hello   --> Englisch"),
    p("Bonjour --> Franzoesisch"),
    p("Hola    --> Spanisch"),
    p("Ciao    --> Italienisch"),
    p("Marhaba --> Arabisch"), empty(),
    h2("Aufgabe 2"),
    p("Kind 2 (Shalom): Es kommt aus Israel. Es spricht Hebraeisch."),
    p("Kind 3 (Ola): Es kommt aus Portugal oder Brasilien. Es spricht Portugiesisch."),
    p("Kind 4 (Ni hao): Es kommt aus China. Es spricht Chinesisch."), empty(),
    h2("Aufgabe 3"),
    p("Deutsch spricht man in Deutschland, Oesterreich, der Schweiz."),
    p("Arabisch spricht man im Nahen Osten und Nordafrika."),
    p("Spanisch spricht man in Spanien und Lateinamerika."),
    p("Englisch spricht man weltweit."), empty(),
    h2("Aufgabe 4"), p("Beispiel: Ich spreche Deutsch und ein bisschen Englisch!"), empty(),
    h2("Aufgabe 5"), p("Individuelle Antwort. Sprachnamen grossgeschrieben?"), empty(),
    h2("Hinweise fuer Lehrende"),
    bullet("sprechen: starkes Verb -- Konjugation wiederholen."),
    bullet("Sprachnamen IMMER grossschreiben."),
    bullet("Mehrsprachigkeit wertschaetzen -- Klasse als Ressource nutzen."), empty() ];
  await save(makeDoc(c), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Dateien fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await schreiben(); await schreiben_L();
  await lesen();     await lesen_L();
  await luecken();   await luecken_L();
  await wortliste(); await wortliste_L();
  await konversation(); await konversation_L();
  await bildaufgaben(); await bildaufgaben_L();
  console.log(""); console.log("Fertig! 12 Dateien erstellt.");
}
main().catch(function(err) { console.error(err); process.exit(1); });
