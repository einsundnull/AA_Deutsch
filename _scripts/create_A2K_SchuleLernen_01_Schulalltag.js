"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "02_SchuleLernen", "01_Schulalltag");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE = "1F4E79", GRAY = "888888", LIGHT = "D5E8F0";
const PAGE_PROPS = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } };
const NUMBERING = { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: "Symbol" } } }] }] };

function docHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A2 Kinder — Schule & Lernen — Schulalltag", italics: true, color: GRAY, size: 18, font: "Arial" })] })] }); }
function docFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: "Seite ", color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ children: [PageNumber.CURRENT], color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ text: " von ", color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" })
]})]}); }
function makeDoc(children) { return new Document({ numbering: NUMBERING, sections: [{ properties: PAGE_PROPS, headers: { default: docHeader() }, footers: { default: docFooter() }, children }] }); }
async function save(doc, filename) {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  console.log("OK  " + filename);
}
function h1(t) { return new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: t, bold: true, size: 36, color: BLUE, font: "Arial" })] }); }
function h2(t) { return new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })] }); }
function p(t, opts) { return new Paragraph({ spacing: { before: 80, after: 80 }, children: [new TextRun(Object.assign({ text: t, size: 24, font: "Arial" }, opts || {}))] }); }
function pBold(t) { return p(t, { bold: true }); }
function pItalic(t) { return p(t, { italics: true }); }
function empty() { return new Paragraph({ children: [new TextRun("")] }); }
function writeLine() { return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] }); }
function writeLines(n) { return Array.from({ length: n }, () => writeLine()); }
function br() { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: t, size: 24, font: "Arial" })] }); }
function studentHead() { return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Name: _________________________________")] }),
    new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [p("Datum: ________________________________")] })
  ]})]
}); }
function hCell(t) { return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, font: "Arial" })] })] }); }
function dCell(t, opts) { return new TableCell({ width: { size: 0, type: WidthType.AUTO }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun(Object.assign({ text: t, size: 24, font: "Arial" }, opts || {}))] })] }); }

const TOPIC = "A2_Kinder_SchuleLernen_01_Schulalltag";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Schulalltag beschreiben"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Verben in der richtigen Form."),
    p("Setze das Verb richtig ein."),
    empty(),
    p("a)  (anfangen) Mein Schultag __________ um 8 Uhr __________ ."),
    p("b)  (haben) Heute __________ wir 6 Stunden Unterricht."),
    p("c)  (sein) Die erste Stunde __________ Mathe."),
    p("d)  (essen) In der großen Pause __________ ich mein Pausenbrot."),
    p("e)  (gehen) Nach der Schule __________ ich nach Hause."),
    empty(),
    h2("Aufgabe 2: Beschreibe einen typischen Schultag."),
    p("Schreibe 6-8 Sätze. Antworte auf folgende Fragen:"),
    bullet("Wann fängt deine Schule an?"),
    bullet("Welche Fächer hast du heute?"),
    bullet("Wie viele Pausen hast du?"),
    bullet("Was machst du in der großen Pause?"),
    bullet("Wann ist die Schule zu Ende?"),
    empty(),
    ...writeLines(8), empty(),
    br(),
    h2("Aufgabe 3: Über gestern schreiben (Präteritum)."),
    p("Ergänze mit war / hatte / waren / hatten."),
    empty(),
    p("a)  Gestern __________ ich in der Schule sehr müde."),
    p("b)  Wir __________ eine Mathearbeit. Sie __________ schwer."),
    p("c)  Mein Lehrer __________ heute krank, deshalb __________ wir frei."),
    p("d)  In der Pause __________ ich Hunger und __________ ein Brötchen."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe einen kleinen Text (10 Sätze) über deinen Lieblingstag in der Schule. Was hast du gemacht? Wie war es?"),
    ...writeLines(10), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Schreibübung Schulalltag"),
    pItalic("Hinweis: Aufgaben 2 und 4 individuell. Hauptkriterien: Verben korrekt, sinnvoller Inhalt."),
    empty(),
    h2("Aufgabe 1"),
    p("a)  Mein Schultag [fängt] um 8 Uhr [an]."),
    p("b)  Heute [haben] wir 6 Stunden Unterricht."),
    p("c)  Die erste Stunde [ist] Mathe."),
    p("d)  In der großen Pause [esse] ich mein Pausenbrot."),
    p("e)  Nach der Schule [gehe] ich nach Hause."),
    empty(),
    h2("Aufgabe 2 — Bewertungskriterien"),
    bullet("6-8 vollständige Sätze"),
    bullet("Uhrzeiten korrekt (um 8 Uhr, von 9:45 bis 10:00)"),
    bullet("Mindestens 3 Schulfächer genannt"),
    bullet("Aktivitäten in der Pause beschrieben"),
    empty(),
    h2("Aufgabe 3"),
    p("a)  Gestern [war] ich in der Schule sehr müde."),
    p("b)  Wir [hatten] eine Mathearbeit. Sie [war] schwer."),
    p("c)  Mein Lehrer [war] heute krank, deshalb [hatten] wir frei."),
    p("d)  In der Pause [hatte] ich Hunger und [war]/[hatte] ein Brötchen. (richtig: aß ich ein Brötchen — hier akzeptieren wir 'hatte ein Brötchen' als A2-Vereinfachung)"),
    empty(),
    h2("Aufgabe 4 — Bewertungskriterien"),
    bullet("10 Sätze"),
    bullet("Mischung aus Präsens (regelmäßig) und Präteritum (war/hatte) für gestern"),
    bullet("Beschreibung von Fächern, Pausen, Lehrer/innen"),
    bullet("Persönliche Bewertung (toll, langweilig, lustig)"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Mein Schultag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Tims langer Donnerstag"),
    p("Hallo, ich bin Tim, 13 Jahre alt, und ich gehe in die 7. Klasse. Heute war Donnerstag und das ist immer mein längster Tag in der Woche.", { size: 26 }),
    p("Mein Schultag fängt um 7:55 Uhr an. Die erste Stunde war Englisch. Wir haben einen neuen Text gelesen und Vokabeln gelernt. Englisch ist okay, aber ich finde Grammatik manchmal kompliziert.", { size: 26 }),
    p("Danach hatten wir Mathe. Die Mathelehrerin, Frau Klein, ist sehr streng, aber sie erklärt gut. Wir haben gestern eine Klassenarbeit zurückbekommen. Ich hatte eine 2 — ich war sehr glücklich!", { size: 26 }),
    p("Um 9:35 Uhr war die erste große Pause. Ich habe mein Pausenbrot gegessen (Käsebrot mit Apfel) und mit meinem besten Freund Jonas auf dem Schulhof gequatscht.", { size: 26 }),
    p("In der dritten und vierten Stunde hatten wir Deutsch. Wir haben über das Buch 'Tschick' gesprochen. Mir hat das Buch gut gefallen. Dann kamen Sport und Musik. In Sport spielten wir Basketball, das macht mir viel Spaß.", { size: 26 }),
    p("Nach dem Mittagessen in der Mensa hatten wir noch zwei Stunden Geschichte. Das war ziemlich anstrengend, weil ich schon müde war. Endlich, um 15:30 Uhr, war Schluss. Ich bin froh, dass jetzt das Wochenende kommt!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Tim ist in der 7. Klasse.                                    R  /  F"),
    p("b)  Tims Schule fängt um 8 Uhr an.                               R  /  F"),
    p("c)  In Englisch haben sie einen Text gelesen.                    R  /  F"),
    p("d)  Tim hat eine schlechte Note in Mathe bekommen.               R  /  F"),
    p("e)  In der Pause hat Tim mit seinem Bruder gesprochen.           R  /  F"),
    p("f)  In Sport haben sie Fußball gespielt.                         R  /  F"),
    p("g)  Tim freut sich auf das Wochenende.                           R  /  F"),
    empty(),
    br(),
    h2("Aufgabe 2: Beantworte in ganzen Sätzen."),
    empty(),
    p("a)  Wie heißt Tims Mathelehrerin?"),
    writeLine(), empty(),
    p("b)  Was hat Tim in seiner Pause gegessen?"),
    writeLine(), empty(),
    p("c)  Welches Buch lesen sie in Deutsch?"),
    writeLine(), empty(),
    p("d)  Warum war Geschichte für Tim anstrengend?"),
    writeLine(), empty(),
    p("e)  Wann ist Tims Schule zu Ende?"),
    writeLine(), empty(),
    h2("Aufgabe 3: Stundenplan rekonstruieren."),
    p("Schreibe Tims Donnerstag-Stundenplan in der richtigen Reihenfolge."),
    empty(),
    p("1. Stunde: __________________"),
    p("2. Stunde: __________________"),
    p("Pause"),
    p("3.+4. Stunde: ________________"),
    p("5. Stunde: __________________"),
    p("6. Stunde: __________________"),
    p("Mittagessen"),
    p("7.+8. Stunde: ________________"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Leseübung Schulalltag"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F — Sie fängt um 7:55 Uhr an."),
    p("c) R"),
    p("d) F — Er hat eine 2 bekommen."),
    p("e) F — Er hat mit seinem besten Freund Jonas gesprochen."),
    p("f) F — Sie haben Basketball gespielt."),
    p("g) R"),
    empty(),
    h2("Aufgabe 2"),
    p("a)  Tims Mathelehrerin heißt Frau Klein."),
    p("b)  Tim hat ein Käsebrot mit einem Apfel gegessen."),
    p("c)  Sie lesen in Deutsch das Buch 'Tschick'."),
    p("d)  Geschichte war anstrengend, weil Tim schon müde war."),
    p("e)  Tims Schule ist um 15:30 Uhr zu Ende."),
    empty(),
    h2("Aufgabe 3 — Stundenplan"),
    p("1. Stunde: Englisch"),
    p("2. Stunde: Mathe"),
    p("Pause"),
    p("3.+4. Stunde: Deutsch"),
    p("5. Stunde: Sport"),
    p("6. Stunde: Musik"),
    p("Mittagessen"),
    p("7.+8. Stunde: Geschichte"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Schule", "Klasse", "Pause", "Stunde", "Lehrerin", "Klassenarbeit", "Schulhof", "Mensa", "Hausaufgaben", "anstrengend", "fängt", "war", "hatten", "esse"];
  const children = [
    studentHead(), empty(),
    h1("Lückentext: Mein Schulalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Wörterkasten"),
    p("Achtung: Es gibt mehr Wörter als Lücken!"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: Array(7).fill(1285),
      rows: [
        new TableRow({ children: woerter.slice(0, 7).map(w => new TableCell({ width: { size: 1285, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] })) }),
        new TableRow({ children: woerter.slice(7).map(w => new TableCell({ width: { size: 1285, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, size: 22, font: "Arial" })] })] })) })
      ]
    }),
    empty(),
    h2("Teil 1: Mein typischer Schultag"),
    empty(),
    p("Meine ____________ ____________ um 7:55 Uhr an. Ich gehe in die 6. ____________ . Wir haben jeden Tag 6 oder 7 Stunden Unterricht. Nach der zweiten ____________ haben wir eine große ____________ . Dann gehen wir auf den ____________ . Dort spiele ich mit meinen Freunden, oder ich ____________ mein Pausenbrot."),
    empty(),
    h2("Teil 2: Gestern in der Schule"),
    empty(),
    p("Gestern ____________ ein langer Tag. Wir ____________ eine ____________ in Englisch. Sie war wirklich ____________ . Unsere ____________, Frau Müller, hat aber gesagt, dass wir gut waren. Nach der Schule habe ich noch zwei Stunden ____________ gemacht."),
    empty(),
    br(),
    h2("Teil 3: Schreibe über deine Schule."),
    p("Ergänze die Sätze mit deinen eigenen Angaben:"),
    empty(),
    p("Meine Schule heißt __________________ ."),
    p("Ich bin in der __________ Klasse."),
    p("Mein Schultag fängt um __________ Uhr an und ist um __________ Uhr zu Ende."),
    p("Mein Lieblingsfach ist __________________ ."),
    p("In der Pause __________________ ."),
    p("Mein/e Lieblingslehrer/in ist __________________ , weil __________________ ."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Lückentext Schulalltag"),
    empty(),
    h2("Teil 1"),
    p("Meine [Schule] [fängt] um 7:55 Uhr an. Ich gehe in die 6. [Klasse]. Wir haben jeden Tag 6 oder 7 Stunden Unterricht. Nach der zweiten [Stunde] haben wir eine große [Pause]. Dann gehen wir auf den [Schulhof]. Dort spiele ich mit meinen Freunden, oder ich [esse] mein Pausenbrot."),
    empty(),
    h2("Teil 2"),
    p("Gestern [war] ein langer Tag. Wir [hatten] eine [Klassenarbeit] in Englisch. Sie war wirklich [anstrengend]. Unsere [Lehrerin], Frau Müller, hat aber gesagt, dass wir gut waren. Nach der Schule habe ich noch zwei Stunden [Hausaufgaben] gemacht."),
    empty(),
    p("(Nicht benötigt: Mensa.)"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "der Schultag",         wortart: "Nomen (m)",       beispiel: "Mein Schultag fängt um 8 Uhr an." },
  { wort: "der Stundenplan",      wortart: "Nomen (m)",       beispiel: "Heute steht Mathe im Stundenplan." },
  { wort: "die Stunde / Doppelstunde", wortart: "Nomen (f)",  beispiel: "Wir haben eine Doppelstunde Sport." },
  { wort: "die Pause",            wortart: "Nomen (f)",       beispiel: "Die große Pause dauert 20 Minuten." },
  { wort: "der Schulhof",         wortart: "Nomen (m)",       beispiel: "Wir spielen auf dem Schulhof." },
  { wort: "die Mensa",            wortart: "Nomen (f)",       beispiel: "Mittagessen gibt es in der Mensa." },
  { wort: "die Klassenarbeit",    wortart: "Nomen (f)",       beispiel: "Morgen schreiben wir eine Klassenarbeit." },
  { wort: "die Note",             wortart: "Nomen (f)",       beispiel: "Ich hatte eine gute Note." },
  { wort: "der Lehrer / die Lehrerin", wortart: "Nomen",      beispiel: "Unser Lehrer ist sehr nett." },
  { wort: "der Mitschüler / die Mitschülerin", wortart: "Nomen", beispiel: "Meine Mitschüler sind freundlich." },
  { wort: "anfangen / beginnen",  wortart: "Verb (trennb.)",  beispiel: "Die Schule fängt um 7:55 Uhr an." },
  { wort: "zu Ende sein / aus sein", wortart: "Verb-Phrase",  beispiel: "Um 13 Uhr ist die Schule aus." },
  { wort: "anstrengend / langweilig / spannend", wortart: "Adjektiv", beispiel: "Geschichte ist sehr spannend." },
  { wort: "war / hatte (Präteritum)", wortart: "Verb",        beispiel: "Gestern war ich müde. Ich hatte viel Hausaufgaben." },
  { wort: "das Pausenbrot",       wortart: "Nomen (n)",       beispiel: "Ich habe mein Pausenbrot vergessen!" },
];

async function wortliste() {
  const rows = [];
  wortEintraege.forEach((e, i) => {
    rows.push(empty());
    rows.push(new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2800, 1800, 4400],
      rows: [
        new TableRow({ tableHeader: true, children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wort", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Wortart", bold: true, size: 22, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Beispielsatz", bold: true, size: 22, font: "Arial" })] })] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wort, bold: true, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.wortart, size: 24, font: "Arial" })] })] }),
          new TableCell({ width: { size: 4400, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: e.beispiel, size: 24, font: "Arial", italics: true })] })] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 9000, type: WidthType.DXA }, columnSpan: 3, shading: { fill: "F5F5F5", type: ShadingType.CLEAR, color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: "Meine Übersetzung: ___________________________________", size: 22, font: "Arial", color: "555555" })] })] })
        ]})
      ]
    }));
    if (i === 6) rows.push(br());
  });
  const children = [studentHead(), empty(), h1("Wortliste: Schulalltag"), pItalic("Niveau: A2 | Kinder und Jugendliche"), p("Lerne die Wörter rund um den Schultag.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Nutze die Wörter sofort in einem Satz über DEINE Schule!"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Wortliste Schulalltag"),
    pItalic("Hinweis: Übersetzungen sind individuell."),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(e => new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] })))
    }),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Präteritum von sein/haben (war/hatte) ist hier neu — gezielt drillen."),
    bullet("Trennbares Verb 'anfangen' (die Stunde fängt an) bewusst markieren."),
    bullet("'die Note' bietet Anlass, das Schulnotensystem zu vergleichen."),
    bullet("Mitschüler/in / Lehrer/in: gleich beide Genera einführen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Schulalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggerüst 1: Wie war dein Schultag?"),
    p("Ihr trefft euch nach der Schule und sprecht über den Tag."),
    empty(),
    p("A:  Hi! Wie war dein Schultag?"),
    p("B:  Anstrengend. Wir hatten ____________________ ."),
    p("A:  Oje. Und wie war ____________________ ?"),
    p("B:  Eigentlich gut. Ich hatte eine ____________ in Mathe."),
    p("A:  Super! Was machst du jetzt?"),
    p("B:  Zuerst ____________________ , danach ____________________ ."),
    empty(),
    pBold("Rollentausch! Erzählt jeweils von eurem heutigen Tag."),
    empty(),
    h2("Dialoggerüst 2: Über den Stundenplan reden"),
    empty(),
    p("A:  Wie sieht dein Stundenplan am Montag aus?"),
    p("B:  Erst habe ich ____________________ , dann ____________________ ."),
    p("A:  Und was hast du am Nachmittag?"),
    p("B:  Nach der Mittagspause noch ____________________ ."),
    p("A:  Welches Fach magst du am Montag am liebsten?"),
    p("B:  Ich mag ____________________ am liebsten, weil ____________________ ."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Wann fängt deine Schule an?"),
    writeLine(), empty(),
    p("2.  Wie viele Stunden hast du heute?"),
    writeLine(), empty(),
    p("3.  Was machst du in den Pausen?"),
    writeLine(), empty(),
    p("4.  Wer ist dein/e Lieblingslehrer/in? Warum?"),
    writeLine(), empty(),
    p("5.  Welcher Tag in der Woche ist dein liebster und warum?"),
    writeLine(), writeLine(), empty(),
    h2("Gruppenspiel: Stundenplan-Memory"),
    p("Jede/r Spieler/in nennt EIN Fach, das er/sie heute hatte. Die nächste Person wiederholt alle Fächer und ergänzt eines."),
    p("Beispiel:"),
    bullet("A: 'Heute hatte ich Mathe.'"),
    bullet("B: 'Heute hatte ich Mathe und Englisch.'"),
    bullet("C: 'Heute hatte ich Mathe, Englisch und Sport.' …"),
    p("Wer ein Fach vergisst, scheidet aus."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Konversation Schulalltag"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggerüst 1 — Beispiel"),
    p("A:  Hi! Wie war dein Schultag?"),
    p("B:  Anstrengend. Wir hatten [eine Mathearbeit]."),
    p("A:  Oje. Und wie war [die Arbeit]?"),
    p("B:  Eigentlich gut. Ich hatte eine [2] in Mathe."),
    p("A:  Super! Was machst du jetzt?"),
    p("B:  Zuerst [esse ich Mittag], danach [mache ich Hausaufgaben]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("Vollständige Sätze, Verben korrekt"),
    bullet("Einsatz von 'war' / 'hatte' (Präteritum)"),
    bullet("Schul-Wortschatz (Stunde, Pause, Klassenarbeit, Note ...)"),
    bullet("Aktive Beteiligung beider Partner"),
    empty(),
    h2("Hinweise zum Stundenplan-Memory"),
    bullet("Schult Hörverstehen + Wortschatz auf engem Raum."),
    bullet("Gut für Auflockerung am Stundenanfang oder -ende."),
    bullet("Variante: 'Gestern hatte ich ...' für Präteritum-Drill."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Schulalltag"),
    pItalic("Niveau: A2 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefügt."),
    empty(),
    h2("Aufgabe 1: Stundenplan-Bild"),
    p("[BILD 1: Stundenplan einer 6. Klasse mit 5 Wochentagen und 6 Stunden]"),
    empty(),
    p("Schau auf den Stundenplan und beantworte:"),
    empty(),
    p("a)  Welche Fächer hat die Klasse am Montag?"),
    writeLine(), empty(),
    p("b)  An welchen Tagen ist Sport?"),
    writeLine(), empty(),
    p("c)  Welcher Tag hat die meisten Stunden?"),
    writeLine(), empty(),
    p("d)  Wann ist die Klasse am Freitag fertig?"),
    writeLine(), empty(),
    h2("Aufgabe 2: Klassenzimmer beschreiben"),
    p("[BILD 2: Klassenzimmer mit Tafel, Tischen, Stühlen, Lehrerin, Schülerinnen und Schülern]"),
    empty(),
    p("Was siehst du? Schreibe 5 Sätze."),
    p("Tipp: Wer ist im Bild? Was machen die Personen? Welche Gegenstände gibt es?"),
    ...writeLines(6), empty(),
    br(),
    h2("Aufgabe 3: Sprechblasen"),
    p("[BILD 3: Pausenhof mit drei Schüler/innen, die sich unterhalten]"),
    empty(),
    p("Was sagen sie? Ergänze die Sprechblasen."),
    empty(),
    p("Schüler 1: 'Wie war ____________________ ?'"),
    writeLine(),
    p("Schüler 2: 'Es war ____________________ . Wir hatten ____________________ .'"),
    writeLine(),
    p("Schüler 3: 'Ich freue mich auf die nächste Stunde, weil ____________________ .'"),
    writeLine(),
    empty(),
    h2("Aufgabe 4: Bilder zu Tagesabschnitten"),
    p("[BILD 4: 4 kleine Bilder — Schule beginnt, Unterricht, große Pause, Schulschluss]"),
    empty(),
    p("Welcher Satz passt zu welchem Bild?"),
    empty(),
    p("Bild A   ----   Endlich Pause! Wir essen unser Pausenbrot."),
    p("Bild B   ----   Die Lehrerin schreibt etwas an die Tafel."),
    p("Bild C   ----   Die Schule ist aus. Wir gehen nach Hause."),
    p("Bild D   ----   Es ist 7:55 Uhr. Der Unterricht fängt an."),
    empty(),
    p("Bild A = ____    Bild B = ____    Bild C = ____    Bild D = ____"),
    empty(),
    h2("Aufgabe 5: Mein Klassenzimmer"),
    p("Zeichne dein Klassenzimmer. Beschrifte 6 Dinge auf Deutsch (z. B. die Tafel, der Tisch, das Fenster, der Stuhl, die Tür, der Lehrer)."),
    p("Schreibe 3 Sätze über dein Klassenzimmer."),
    ...writeLines(6), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Bildaufgaben Schulalltag"),
    pItalic("Hinweis: Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1"),
    p("Antworten richten sich nach dem konkreten Stundenplan-Bild."),
    p("Erwartet: ganze Sätze, Wochentage richtig, Fächer korrekt benannt."),
    empty(),
    h2("Aufgabe 2 — Beispiellösung"),
    p("Ich sehe ein Klassenzimmer. Vorne steht die Lehrerin an der Tafel. Sie schreibt etwas. Die Schüler sitzen an ihren Tischen und hören zu. Auf den Tischen liegen Bücher und Hefte. Das Klassenzimmer ist hell und freundlich."),
    p("Bewertung: 5 Sätze, Wortschatz Klassenzimmer, Verben in Präsens."),
    empty(),
    h2("Aufgabe 3 — Beispiellösung"),
    p("Schüler 1: 'Wie war die Mathearbeit?'"),
    p("Schüler 2: 'Es war ziemlich schwer. Wir hatten 10 Aufgaben.'"),
    p("Schüler 3: 'Ich freue mich auf die nächste Stunde, weil wir Sport haben.'"),
    empty(),
    h2("Aufgabe 4 — Lösungen"),
    p("Bild A = große Pause"),
    p("Bild B = Unterricht"),
    p("Bild C = Schulschluss"),
    p("Bild D = Schule beginnt"),
    p("(Konkrete Zuordnung der Buchstaben hängt vom Bild ab.)"),
    empty(),
    h2("Aufgabe 5"),
    p("Individuelle Zeichnung. Bewertung:"),
    bullet("6 Gegenstände korrekt mit Artikel beschriftet"),
    bullet("3 Sätze in vollständigem Satzbau"),
    bullet("Genus-Fehler markieren"),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Stundenplan-Aufgabe verbindet Lesen + Beschreiben."),
    bullet("Klassenzimmer-Wortschatz wurde schon in A1 eingeführt — hier festigen + erweitern."),
    bullet("Sprechblasen-Aufgabe trainiert Konversationsstil und Vergangenheitsformen."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben_LOESUNG.docx");
}

async function main() {
  console.log("Erstelle Dateien fuer: " + TOPIC);
  console.log("Zielordner: " + OUTPUT_DIR);
  console.log("");
  await schreiben();    await schreiben_L();
  await lesen();        await lesen_L();
  await luecken();      await luecken_L();
  await wortliste();    await wortliste_L();
  await konversation(); await konversation_L();
  await bildaufgaben(); await bildaufgaben_L();
  console.log("");
  console.log("Fertig! 12 Dateien erstellt.");
}

main().catch(err => { console.error(err); process.exit(1); });
