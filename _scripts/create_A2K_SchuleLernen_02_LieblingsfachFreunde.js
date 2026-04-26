"use strict";
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, PageBreak,
  AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat
} = require("docx");
const fs   = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "02_SchuleLernen", "02_LieblingsfachFreunde");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const BLUE = "1F4E79", GRAY = "888888", LIGHT = "D5E8F0";
const PAGE_PROPS = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } };
const NUMBERING = { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: "Symbol" } } }] }] };

function docHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A2 Kinder — Schule & Lernen — Lieblingsfach & Freunde", italics: true, color: GRAY, size: 18, font: "Arial" })] })] }); }
function docFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: "Seite ", color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ children: [PageNumber.CURRENT], color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ text: " von ", color: GRAY, size: 18, font: "Arial" }),
  new TextRun({ children: [PageNumber.TOTAL_PAGES], color: GRAY, size: 18, font: "Arial" })
]})]}); }
function makeDoc(children) { return new Document({ numbering: NUMBERING, sections: [{ properties: PAGE_PROPS, headers: { default: docHeader() }, footers: { default: docFooter() }, children }] }); }
async function save(doc, filename) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf); console.log("OK  " + filename); }
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

const TOPIC = "A2_Kinder_SchuleLernen_02_LieblingsfachFreunde";

async function schreiben() {
  const children = [
    studentHead(), empty(),
    h1("Schreibübung: Lieblingsfach & beste Freunde"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Aufgabe 1: Steigerung mit gern – lieber – am liebsten."),
    p("Sortiere die Aktivitäten von 'gern' bis 'am liebsten'."),
    empty(),
    p("a)  Mathe lernen   /   Englisch lernen   /   Deutsch lernen"),
    p("Ich lerne ____________________ gern, ____________________ noch lieber, am liebsten ____________________ ."),
    empty(),
    p("b)  Fußball spielen   /   Schwimmen   /   Basketball spielen"),
    p("Ich spiele ____________________ gern, ____________________ lieber, am liebsten ____________________ ."),
    empty(),
    p("c)  Bücher lesen   /   Filme schauen   /   Musik hören"),
    p("____________________________________________________________"),
    empty(),
    h2("Aufgabe 2: Schreibe über dein Lieblingsfach."),
    p("Beantworte in 5-6 Sätzen:"),
    bullet("Welches Fach magst du am liebsten?"),
    bullet("Wer ist dein/e Lehrer/in in diesem Fach?"),
    bullet("Was macht ihr im Unterricht?"),
    bullet("Warum magst du dieses Fach?"),
    empty(),
    ...writeLines(7), empty(),
    br(),
    h2("Aufgabe 3: Sätze mit weil."),
    p("Verbinde die zwei Sätze mit 'weil'. Achtung: Verb am Ende!"),
    empty(),
    pBold("Beispiel:  Ich mag Mathe. Es macht Spaß."),
    p("→ Ich mag Mathe, weil es Spaß macht."),
    empty(),
    p("a)  Ich mag Sport. Ich kann mich bewegen."),
    writeLine(), empty(),
    p("b)  Ich mag Englisch nicht. Es ist schwer."),
    writeLine(), empty(),
    p("c)  Lisa ist meine beste Freundin. Sie ist immer für mich da."),
    writeLine(), empty(),
    p("d)  Mein Lieblingsfach ist Musik. Wir singen viel."),
    writeLine(), empty(),
    h2("Aufgabe 4: Beschreibe deine/n beste/n Freund/in."),
    p("Schreibe einen Text (8-10 Sätze) über deine/n beste/n Freund/in."),
    p("Tipp: Wie heißt sie/er? Wie alt? Wie sieht sie/er aus? Was macht ihr zusammen? Warum ist sie/er deine/r Beste/r?"),
    ...writeLines(10), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben.docx");
}

async function schreiben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Schreibübung Lieblingsfach & Freunde"),
    pItalic("Hinweis: Aufgaben 1, 2, 4 sind individuell. Aufgabe 3 hat eine eindeutige Lösung (weil-Satz)."),
    empty(),
    h2("Aufgabe 1 — Beispiellösung"),
    p("a)  Ich lerne Mathe gern, Englisch noch lieber, am liebsten Deutsch."),
    p("b)  Ich spiele Fußball gern, Schwimmen lieber, am liebsten Basketball."),
    p("c)  Ich lese Bücher gern, Filme schaue ich lieber, am liebsten höre ich Musik."),
    p("(Reihenfolge ist persönliche Wahl — Hauptkriterium: gern / lieber / am liebsten korrekt verwendet.)"),
    empty(),
    h2("Aufgabe 2 — Bewertungskriterien"),
    bullet("5-6 Sätze, Lieblingsfach klar genannt"),
    bullet("Lehrer/in erwähnt"),
    bullet("Mindestens 1 Aktivität aus dem Unterricht"),
    bullet("Begründung warum (mit weil-Satz oder einfach mit 'denn' / 'es ist ...')"),
    empty(),
    h2("Aufgabe 3 — Lösungen"),
    p("a)  Ich mag Sport, weil ich mich bewegen kann."),
    p("b)  Ich mag Englisch nicht, weil es schwer ist."),
    p("c)  Lisa ist meine beste Freundin, weil sie immer für mich da ist."),
    p("d)  Mein Lieblingsfach ist Musik, weil wir viel singen."),
    p("Wichtig: Komma vor 'weil', Verb am Satzende!"),
    empty(),
    h2("Aufgabe 4 — Bewertungskriterien"),
    bullet("8-10 Sätze"),
    bullet("Aussehen + Charakter beschrieben"),
    bullet("Mindestens 2 gemeinsame Aktivitäten"),
    bullet("Mindestens 1 weil-Satz für 'warum beste/r Freund/in'"),
    bullet("Adjektive: lustig, hilfsbereit, klug, ehrlich ..."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Schreiben_LOESUNG.docx");
}

async function lesen() {
  const children = [
    studentHead(), empty(),
    h1("Leseübung: Meine beste Freundin und mein Lieblingsfach"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Lesetext: Sophie und Mira"),
    p("Hallo, ich bin Sophie und ich bin 12 Jahre alt. Heute möchte ich euch von meiner besten Freundin Mira und meinem Lieblingsfach Kunst erzählen.", { size: 26 }),
    p("Mira und ich kennen uns seit der ersten Klasse. Wir sind also schon seit sechs Jahren beste Freundinnen! Mira hat lange braune Haare und grüne Augen. Sie ist klein, aber sehr sportlich. Sie ist immer fröhlich und macht oft Witze. Ich mag sie sehr, weil sie ehrlich und hilfsbereit ist. Wenn ich traurig bin, hört sie mir zu.", { size: 26 }),
    p("In der Schule sitzen wir natürlich nebeneinander. In den Pausen reden wir über alles: über Bücher, Musik, Lehrer und manchmal auch über Probleme. Nach der Schule machen wir oft zusammen Hausaufgaben. Am Wochenende treffen wir uns und gehen ins Kino oder in den Park.", { size: 26 }),
    p("Mein Lieblingsfach ist Kunst. Ich mag Kunst am liebsten, weil ich gern male und kreativ bin. Unsere Kunstlehrerin, Frau Berger, ist sehr nett und lustig. Sie zeigt uns viele Techniken: Aquarell, Bleistift, Kohle, sogar digitale Kunst am Tablet. Letzte Woche haben wir Selbstporträts gemalt. Das war super!", { size: 26 }),
    p("Mira mag Kunst nicht so gern. Sie liebt Sport, weil sie gut Volleyball spielt. Aber das ist okay — wir müssen ja nicht alles gleich finden. Hauptsache, wir sind füreinander da!", { size: 26 }),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    empty(),
    p("a)  Sophie und Mira kennen sich seit 6 Jahren.                   R  /  F"),
    p("b)  Mira hat lange blonde Haare.                                 R  /  F"),
    p("c)  Sophie und Mira sitzen in der Schule zusammen.               R  /  F"),
    p("d)  Sophies Lieblingsfach ist Mathematik.                        R  /  F"),
    p("e)  Frau Berger ist die Kunstlehrerin.                           R  /  F"),
    p("f)  Mira mag Sport, weil sie gut Basketball spielt.              R  /  F"),
    p("g)  Sophie und Mira machen alles gleich gern.                    R  /  F"),
    empty(),
    br(),
    h2("Aufgabe 2: Beantworte in ganzen Sätzen."),
    empty(),
    p("a)  Wie sieht Mira aus? Schreibe 2 Merkmale."),
    writeLine(), empty(),
    p("b)  Warum mag Sophie ihre beste Freundin?"),
    writeLine(), empty(),
    p("c)  Was machen die zwei am Wochenende?"),
    writeLine(), empty(),
    p("d)  Warum mag Sophie Kunst am liebsten?"),
    writeLine(), empty(),
    p("e)  Was haben sie letzte Woche im Kunstunterricht gemacht?"),
    writeLine(), empty(),
    h2("Aufgabe 3: Suche im Text."),
    p("Welche 3 weil-Sätze findest du im Text? Schreibe sie heraus."),
    empty(),
    p("1)  ____________________________________________________________"),
    p("2)  ____________________________________________________________"),
    p("3)  ____________________________________________________________"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen.docx");
}

async function lesen_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Leseübung Lieblingsfach & Freunde"),
    empty(),
    h2("Aufgabe 1"),
    p("a) R"),
    p("b) F — Mira hat lange braune Haare."),
    p("c) R"),
    p("d) F — Sophies Lieblingsfach ist Kunst."),
    p("e) R"),
    p("f) F — Mira spielt gut Volleyball."),
    p("g) F — Sophie und Mira mögen verschiedene Fächer."),
    empty(),
    h2("Aufgabe 2"),
    p("a)  Mira hat lange braune Haare und grüne Augen. Sie ist klein und sportlich."),
    p("b)  Sophie mag Mira, weil sie ehrlich und hilfsbereit ist."),
    p("c)  Am Wochenende gehen sie ins Kino oder in den Park."),
    p("d)  Sophie mag Kunst am liebsten, weil sie gern malt und kreativ ist."),
    p("e)  Sie haben Selbstporträts gemalt."),
    empty(),
    h2("Aufgabe 3 — weil-Sätze im Text"),
    p("1)  Ich mag sie sehr, weil sie ehrlich und hilfsbereit ist."),
    p("2)  Ich mag Kunst am liebsten, weil ich gern male und kreativ bin."),
    p("3)  Sie liebt Sport, weil sie gut Volleyball spielt."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Lesen_LOESUNG.docx");
}

async function luecken() {
  const woerter = ["Lieblingsfach", "Freundin", "Mathe", "Kunst", "weil", "lieber", "am liebsten", "lustig", "hilfsbereit", "kreativ", "macht", "ist", "sind", "kennen"];
  const children = [
    studentHead(), empty(),
    h1("Lückentext: Lieblingsfach & beste Freunde"),
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
    h2("Teil 1: Mein Lieblingsfach"),
    empty(),
    p("Mein ____________ ist ____________ . Ich mag es, ____________ wir viel malen und basteln. Mathe mag ich auch, aber ich mache Kunst ____________ . ____________ noch mehr mache ich Sport!"),
    empty(),
    h2("Teil 2: Über meine beste Freundin"),
    empty(),
    p("Meine beste ____________ heißt Anna. Wir ____________ uns seit der dritten Klasse. Sie ____________ sehr ____________ und ____________ . Wenn ich ein Problem habe, ____________ sie immer Zeit für mich. Wir ____________ einfach ein super Team!"),
    empty(),
    br(),
    h2("Teil 3: Schreibe über DEIN Lieblingsfach und DEINE/N beste/n Freund/in."),
    p("Ergänze die Sätze:"),
    empty(),
    p("Mein Lieblingsfach ist __________________ ."),
    p("Ich mag dieses Fach, weil __________________ ."),
    p("Mein/e Lehrer/in heißt __________________ und ist __________________ ."),
    empty(),
    p("Mein/e beste/r Freund/in heißt __________________ ."),
    p("Wir kennen uns seit __________________ ."),
    p("Er/Sie ist __________________ und __________________ ."),
    p("Am liebsten __________________ wir zusammen __________________ ."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken.docx");
}

async function luecken_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Lückentext Lieblingsfach & Freunde"),
    empty(),
    h2("Teil 1"),
    p("Mein [Lieblingsfach] ist [Kunst]. Ich mag es, [weil] wir viel malen und basteln. Mathe mag ich auch, aber ich mache Kunst [lieber]. [Am liebsten] noch mehr mache ich Sport!"),
    p("(Anmerkung: Akzeptiere auch andere Varianten der Steigerung, solange gern–lieber–am liebsten korrekt verwendet sind.)"),
    empty(),
    h2("Teil 2"),
    p("Meine beste [Freundin] heißt Anna. Wir [kennen] uns seit der dritten Klasse. Sie [ist] sehr [lustig] und [hilfsbereit]. Wenn ich ein Problem habe, [macht] sie immer Zeit für mich. Wir [sind] einfach ein super Team!"),
    p("(Nicht benötigt: Mathe, kreativ.)"),
    empty(),
    h2("Teil 3"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Luecken_LOESUNG.docx");
}

const wortEintraege = [
  { wort: "das Lieblingsfach",     wortart: "Nomen (n)",   beispiel: "Mein Lieblingsfach ist Englisch." },
  { wort: "der/die beste Freund/in", wortart: "Nomen",     beispiel: "Sie ist meine beste Freundin." },
  { wort: "Mathe / Mathematik",    wortart: "Nomen (f)",   beispiel: "Mathe ist nicht so leicht." },
  { wort: "Deutsch / Englisch / Französisch", wortart: "Nomen (n)", beispiel: "Englisch macht mir Spaß." },
  { wort: "Sport / Kunst / Musik", wortart: "Nomen",       beispiel: "In Sport spielen wir Basketball." },
  { wort: "Biologie / Chemie / Physik", wortart: "Nomen (f)", beispiel: "Biologie finde ich spannend." },
  { wort: "Erdkunde / Geschichte", wortart: "Nomen (f)",   beispiel: "Geschichte ist mein Lieblingsfach." },
  { wort: "gern / lieber / am liebsten", wortart: "Adverb (Steigerung)", beispiel: "Am liebsten esse ich Pizza." },
  { wort: "Spaß machen",           wortart: "Verb-Phrase", beispiel: "Mathe macht mir keinen Spaß." },
  { wort: "lustig",                wortart: "Adjektiv",    beispiel: "Mein Freund ist sehr lustig." },
  { wort: "hilfsbereit",           wortart: "Adjektiv",    beispiel: "Lisa ist immer hilfsbereit." },
  { wort: "ehrlich",               wortart: "Adjektiv",    beispiel: "Ein guter Freund ist ehrlich." },
  { wort: "klug / intelligent",    wortart: "Adjektiv",    beispiel: "Mein Banknachbar ist sehr klug." },
  { wort: "weil",                  wortart: "Konjunktion (Verb am Ende!)", beispiel: "Ich mag Sport, weil es Spaß macht." },
  { wort: "sich verstehen",        wortart: "Verb (refl.)", beispiel: "Wir verstehen uns seit Jahren gut." },
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
  const children = [studentHead(), empty(), h1("Wortliste: Lieblingsfach & Freunde"), pItalic("Niveau: A2 | Kinder und Jugendliche"), p("Lerne den Wortschatz rund um Schulfächer, Freundschaft und Vorlieben.")]
    .concat(rows)
    .concat([empty(), p("Tipp: Bilde mit jedem Adjektiv einen weil-Satz: 'Anna ist meine beste Freundin, weil sie ehrlich ist.'"), empty()]);
  await save(makeDoc(children), TOPIC + "_Wortliste.docx");
}

async function wortliste_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Wortliste Lieblingsfach & Freunde"),
    pItalic("Hinweis: Übersetzungen sind individuell."),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2800, 1800, 4400],
      rows: [new TableRow({ tableHeader: true, children: [hCell("Wort"), hCell("Wortart"), hCell("Beispielsatz")] })]
        .concat(wortEintraege.map(e => new TableRow({ children: [dCell(e.wort, { bold: true }), dCell(e.wortart), dCell(e.beispiel, { italics: true })] })))
    }),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("'gern – lieber – am liebsten' systematisch einführen — Vorbereitung auf Komparativ/Superlativ."),
    bullet("'weil' kommt hier vor — Verbendstellung sofort markieren (Vorbereitung Thema 11)."),
    bullet("Schulfächer alle einmal nennen, auch wenn nicht alle aktiv geübt werden."),
    bullet("Adjektive für Freunde (ehrlich, hilfsbereit, klug) sind A2-typisch."),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Wortliste_LOESUNG.docx");
}

async function konversation() {
  const children = [
    studentHead(), empty(),
    h1("Konversation: Lieblingsfach & Freunde"),
    pItalic("Niveau: A2 | Kinder und Jugendliche"),
    empty(),
    h2("Dialoggerüst 1: Was magst du in der Schule?"),
    empty(),
    p("A:  Was ist dein Lieblingsfach?"),
    p("B:  Mein Lieblingsfach ist ____________________ ."),
    p("A:  Warum magst du das?"),
    p("B:  Weil ____________________ ."),
    p("A:  Welches Fach magst du nicht so gern?"),
    p("B:  Ich mag ____________________ nicht so gern, weil ____________________ ."),
    p("A:  Und welche Note hast du in deinem Lieblingsfach?"),
    p("B:  Eine ____________________ ."),
    empty(),
    pBold("Rollentausch! Fragt euch gegenseitig nach allen Schulfächern."),
    empty(),
    h2("Dialoggerüst 2: Über deine/n beste/n Freund/in"),
    empty(),
    p("A:  Wer ist dein/e beste/r Freund/in?"),
    p("B:  Mein/e beste/r Freund/in heißt ____________________ ."),
    p("A:  Wie lange kennt ihr euch schon?"),
    p("B:  Wir kennen uns seit ____________________ ."),
    p("A:  Was macht ihr gern zusammen?"),
    p("B:  Wir ____________________ und ____________________ ."),
    p("A:  Warum ist sie/er deine/r beste/r Freund/in?"),
    p("B:  Weil ____________________ ."),
    empty(),
    pBold("Rollentausch!"),
    empty(),
    br(),
    h2("Partnerinterview"),
    empty(),
    p("1.  Welches Fach magst du am liebsten und warum?"),
    writeLine(), empty(),
    p("2.  Welches Fach findest du am schwierigsten?"),
    writeLine(), empty(),
    p("3.  Wer ist dein/e Lieblingslehrer/in? Beschreibe sie/ihn kurz."),
    writeLine(), empty(),
    p("4.  Hast du viele Freunde in der Klasse?"),
    writeLine(), empty(),
    p("5.  Was ist für dich an einer Freundschaft am wichtigsten?"),
    writeLine(), writeLine(), empty(),
    h2("Gruppenspiel: Wer bin ich?"),
    p("Eine Person aus der Klasse wird beschrieben (ohne Name!). Hinweise:"),
    bullet("Aussehen (Haare, Größe, Brille)"),
    bullet("Lieblingsfach"),
    bullet("Eine Eigenschaft (lustig, ruhig, klug)"),
    bullet("Eine Sache, die er/sie gern macht"),
    p("Wer als Erste/r richtig rät, beschreibt als Nächste/r jemanden."),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [2500, 4500, 2000],
      rows: [
        new TableRow({ children: [hCell("Beschreiber/in"), hCell("Hinweise"), hCell("Lösung")] }),
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" }, children: [writeLine()] })
        ]})
      ]
    }),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation.docx");
}

async function konversation_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Konversation Lieblingsfach & Freunde"),
    pItalic("Hinweis: Keine festen Antworten. Bewertung nach Kriterien."),
    empty(),
    h2("Dialoggerüst 1 — Beispiel"),
    p("A:  Was ist dein Lieblingsfach?"),
    p("B:  Mein Lieblingsfach ist [Sport]."),
    p("A:  Warum magst du das?"),
    p("B:  Weil [ich mich gern bewege]."),
    p("A:  Welches Fach magst du nicht so gern?"),
    p("B:  Ich mag [Mathe] nicht so gern, weil [es zu schwer ist]."),
    p("A:  Und welche Note hast du in deinem Lieblingsfach?"),
    p("B:  Eine [1] / [2]."),
    empty(),
    h2("Bewertungskriterien"),
    bullet("weil-Sätze mit Verb am Ende"),
    bullet("Fächernamen korrekt"),
    bullet("Konjunktion 'weil' nicht mit Komma vergessen"),
    bullet("Aktive Beteiligung beider Partner"),
    bullet("Mut zur persönlichen Antwort"),
    empty(),
    h2("Hinweise für 'Wer bin ich?'"),
    bullet("Mindestens 4 Hinweise pro Beschreibung"),
    bullet("Spiel funktioniert nur, wenn Personen gut bekannt sind"),
    bullet("Auch geeignet für Promis, Lehrer, Klassentiere"),
    empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Konversation_LOESUNG.docx");
}

async function bildaufgaben() {
  const children = [
    studentHead(), empty(),
    h1("Bildaufgaben: Lieblingsfach & Freunde"),
    pItalic("Niveau: A2 | Kinder und Jugendliche | Bilder werden vom Lehrenden eingefügt."),
    empty(),
    h2("Aufgabe 1: Schulfächer-Symbole"),
    p("[BILD 1: 8 Symbole für Schulfächer — Buch, Globus, Pinsel, Ball, Note, Reagenzglas, Tafel mit Zahlen, Mikrofon]"),
    empty(),
    p("Welches Fach passt zu welchem Symbol?"),
    p("Wähle aus: Mathe, Deutsch, Englisch, Erdkunde, Kunst, Sport, Musik, Chemie."),
    empty(),
    p("Bild 1: ____________   Bild 2: ____________   Bild 3: ____________   Bild 4: ____________"),
    p("Bild 5: ____________   Bild 6: ____________   Bild 7: ____________   Bild 8: ____________"),
    empty(),
    h2("Aufgabe 2: Schulfächer-Steckbrief"),
    p("[BILD 2: Tabelle/Steckbrief mit Lieblingsfach und Begründung]"),
    empty(),
    p("Fülle den Steckbrief aus:"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [4500, 4500],
      rows: [
        new TableRow({ children: [hCell("Frage"), hCell("Deine Antwort")] }),
        new TableRow({ children: [dCell("Mein Lieblingsfach ist ..."), dCell("")] }),
        new TableRow({ children: [dCell("Ich mag es, weil ..."), dCell("")] }),
        new TableRow({ children: [dCell("Mein/e Lehrer/in heißt ..."), dCell("")] }),
        new TableRow({ children: [dCell("Wir haben das Fach ___ Mal pro Woche."), dCell("")] }),
        new TableRow({ children: [dCell("Meine Note in diesem Fach: ..."), dCell("")] })
      ]
    }),
    empty(),
    br(),
    h2("Aufgabe 3: Sprechblasen"),
    p("[BILD 3: Zwei Mädchen sitzen nebeneinander in der Schule und reden]"),
    empty(),
    p("Was sagen sie über ihre Freundschaft? Ergänze die Sprechblasen."),
    empty(),
    p("Mädchen 1: 'Du bist meine beste Freundin, weil ____________________ .'"),
    writeLine(),
    p("Mädchen 2: 'Und du bist meine beste Freundin, weil ____________________ .'"),
    writeLine(),
    empty(),
    h2("Aufgabe 4: Steckbrief deine/r beste/r Freund/in"),
    p("[BILD 4: Steckbriefkarte mit Foto-Platzhalter und Feldern]"),
    empty(),
    p("Fülle den Steckbrief deines/r besten Freundes/in aus:"),
    empty(),
    new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: [3500, 5500],
      rows: [
        new TableRow({ children: [hCell("Feld"), hCell("Antwort")] }),
        new TableRow({ children: [dCell("Name"), dCell("")] }),
        new TableRow({ children: [dCell("Alter"), dCell("")] }),
        new TableRow({ children: [dCell("Aussehen (Haare, Augen)"), dCell("")] }),
        new TableRow({ children: [dCell("Charakter (3 Adjektive)"), dCell("")] }),
        new TableRow({ children: [dCell("Lieblingsfach"), dCell("")] }),
        new TableRow({ children: [dCell("Was wir zusammen gern machen"), dCell("")] }),
        new TableRow({ children: [dCell("Warum sie/er meine/r Beste/r ist"), dCell("")] })
      ]
    }),
    empty(),
    h2("Aufgabe 5: Stimmungsbilder zu Fächern"),
    p("[BILD 5: 3 Smileys — fröhlich, neutral, traurig — daneben 6 Schulfächer]"),
    empty(),
    p("Ordne 6 Schulfächer einem Smiley zu und schreibe je einen Satz."),
    p("Beispiel: 'Ich mag Mathe sehr — Smiley fröhlich. Ich mag Mathe, weil sie logisch ist.'"),
    ...writeLines(7), empty(),
  ];
  await save(makeDoc(children), TOPIC + "_Bildaufgaben.docx");
}

async function bildaufgaben_L() {
  const children = [
    studentHead(), empty(),
    h1("LÖSUNG: Bildaufgaben Lieblingsfach & Freunde"),
    pItalic("Hinweis: Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1 — typische Zuordnung"),
    p("Buch = Deutsch / Globus = Erdkunde / Pinsel = Kunst / Ball = Sport"),
    p("Note = Musik / Reagenzglas = Chemie / Tafel mit Zahlen = Mathe / Mikrofon = Englisch"),
    p("(Konkrete Reihenfolge je nach Bild.)"),
    empty(),
    h2("Aufgabe 2"),
    p("Individuelle Antworten. Bewertung:"),
    bullet("Alle 5 Felder ausgefüllt"),
    bullet("Begründung als weil-Satz oder mit 'denn'/'es ist ...'"),
    bullet("Lehrer/in vollständig (Frau/Herr + Name)"),
    empty(),
    h2("Aufgabe 3 — Beispiel"),
    p("Mädchen 1: 'Du bist meine beste Freundin, weil du immer für mich da bist.'"),
    p("Mädchen 2: 'Und du bist meine beste Freundin, weil du mich immer zum Lachen bringst.'"),
    empty(),
    h2("Aufgabe 4"),
    p("Individueller Steckbrief. Bewertung:"),
    bullet("Alle 7 Felder ausgefüllt"),
    bullet("3 Adjektive für Charakter"),
    bullet("Begründung 'warum beste/r' als ganzer Satz"),
    empty(),
    h2("Aufgabe 5"),
    p("Beispiel:"),
    p("Mathe — Smiley neutral. Ich mag Mathe ein bisschen, weil ich gut rechnen kann."),
    p("Sport — Smiley fröhlich. Ich liebe Sport, weil wir Basketball spielen."),
    p("Chemie — Smiley traurig. Ich mag Chemie nicht, weil sie schwer ist."),
    empty(),
    h2("Hinweise für Lehrende"),
    bullet("Steckbrief-Aufgabe ist hervorragender Anlass für Vorlese-Runde."),
    bullet("'Wer bin ich?'-Variante: Steckbrief vorlesen lassen, Klasse rät, wer es ist."),
    bullet("Stimmungsbilder + weil-Satz festigen Begründungsstrukturen."),
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
