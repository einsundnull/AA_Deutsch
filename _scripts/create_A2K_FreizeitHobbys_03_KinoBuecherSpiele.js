"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "03_FreizeitHobbys", "03_KinoBuecherSpiele");
const TOPIC     = "A2_Kinder_FreizeitHobbys_03_KinoBuecherSpiele";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "•", alignment: AlignmentType.LEFT,
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

// ── Wortliste-Tabelle ────────────────────────────────────────────────────────
function makeWortTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort/Phrase", { width: 3200 }), hCell("Wortart", { width: 1600 }), hCell("Beispielsatz", { width: 4700 })] }),
      new TableRow({ children: [dCell("das Kino, -s"), dCell("Nomen (n)"), dCell("Wir gehen ins Kino.")] }),
      new TableRow({ children: [dCell("der Film, -e"), dCell("Nomen (m)"), dCell("Der Film war super spannend!")] }),
      new TableRow({ children: [dCell("das Buch, die Bücher"), dCell("Nomen (n)"), dCell("Ich lese gerade ein tolles Buch.")] }),
      new TableRow({ children: [dCell("das Spiel, -e"), dCell("Nomen (n)"), dCell("Wir spielen Brettspiele am Wochenende.")] }),
      new TableRow({ children: [dCell("der Abenteuerfilm / das Abenteuer"), dCell("Nomen (m/n)"), dCell("Ich mag Abenteuerfilme am liebsten.")] }),
      new TableRow({ children: [dCell("der Krimi, -s"), dCell("Nomen (m)"), dCell("Der Krimi war sehr spannend.")] }),
      new TableRow({ children: [dCell("die Komödie, -n"), dCell("Nomen (f)"), dCell("Komödien finde ich lustig.")] }),
      new TableRow({ children: [dCell("das Märchen, –"), dCell("Nomen (n)"), dCell("Ich lese gern Märchen.")] }),
      new TableRow({ children: [dCell("spannend"), dCell("Adjektiv"), dCell("Der Film ist sehr spannend!")] }),
      new TableRow({ children: [dCell("lustig"), dCell("Adjektiv"), dCell("Das Buch ist lustig – ich muss lachen.")] }),
      new TableRow({ children: [dCell("gruselig"), dCell("Adjektiv"), dCell("Horrorfilme finde ich gruselig.")] }),
      new TableRow({ children: [dCell("langweilig"), dCell("Adjektiv"), dCell("Das Spiel war leider langweilig.")] }),
      new TableRow({ children: [dCell("gefallen (+ Dativ)"), dCell("Verb (unreg.)"), dCell("Der Film gefällt mir sehr gut.")] }),
      new TableRow({ children: [dCell("empfehlen (+ Akk.)"), dCell("Verb (unreg.)"), dCell("Ich empfehle dieses Buch!")] }),
      new TableRow({ children: [dCell("Wie findest du ...?"), dCell("Frage-Phrase"), dCell("Wie findest du den Film?")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Kino, Bücher, Spiele"), empty(),
    pBold("Aufgabe 1: Ergänze mit dem richtigen Dativpronomen (mir / dir / ihm / ihr / uns)."),
    empty(),
    p("1. Der Film gefällt ______________________ sehr. (ich)"),
    p("2. Das Buch gefällt ______________________. (sie – Emma)"),
    p("3. Gefällt ______________________ der Krimi? (du)"),
    p("4. Das Spiel gefällt ______________________ nicht. (er – Max)"),
    p("5. Der Abenteuerfilm gefällt ______________________ beiden. (wir)"),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib eine kurze Empfehlung (3–4 Sätze) für einen Film, ein Buch oder ein Spiel."),
    pItalic("Struktur: Name – Was ist es? – Warum empfiehlst du es? – Wem gefällt es?"),
    empty(),
    p("Empfehlung 1:"),
    ...writeLines(4, 60),
    p("Empfehlung 2:"),
    ...writeLines(4, 60),
    pBold("Aufgabe 3: Was gefällt dir? Schreib 5 Sätze mit \"gefällt mir\" oder \"gefällt mir nicht\"."),
    pItalic("Beispiel: Abenteuerfilme gefallen mir sehr. Horrorfilme gefallen mir nicht."),
    empty(),
    ...writeLines(5, 60),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Kino, Bücher, Spiele (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Dativpronomen"),
    bullet("1. mir"),
    bullet("2. ihr"),
    bullet("3. dir"),
    bullet("4. ihm"),
    bullet("5. uns"),
    empty(),
    pItalic("Erklärung: gefallen steht immer mit Dativ. Ich → mir, du → dir, er → ihm, sie → ihr, wir → uns."),
    pItalic("Achtung: \"Der Film gefällt mir\" – NICHT \"Ich gefalle den Film\". Subjekt ist der Film!"),
    empty(),
    pBold("Aufgabe 2: Kriterien Empfehlung"),
    bullet("Name des Films / Buchs / Spiels klar genannt."),
    bullet("Mindestens ein Beschreibungsadjektiv: spannend / lustig / toll / interessant."),
    bullet("\"gefällt\" oder \"empfehle\" korrekt verwendet."),
    bullet("Kurze Begründung: weil es ... ist / weil ich ... mag."),
    empty(),
    pBold("Aufgabe 3: Individuelle Antworten. Kriterien:"),
    bullet("gefallen + Dativ (mir/dir/ihm/ihr/uns/euch/ihnen)."),
    bullet("Entweder: [Nomen im Plural/Sg.] gefällt/gefallen mir (sehr / nicht / überhaupt nicht)."),
    bullet("Adjektiv oder weil-Begründung als Ergänzung erwünscht."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Was empfiehlst du?"), empty(),
    pBold("Lies die drei kurzen Texte."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Zoe (11 Jahre) empfiehlt einen Film:"),
          p("Mein Lieblingsfilm heißt \"Das große Abenteuer\". Es ist ein Abenteuerfilm. Der Film gefällt mir sehr, weil er so spannend ist. Man weiß nie, was als nächstes passiert! Die Hauptfigur ist ein mutiges Mädchen. Ich empfehle den Film allen, die Abenteuer mögen."),
          empty(),
          pBold("Luca (10 Jahre) empfiehlt ein Buch:"),
          p("Ich lese gerade \"Das lustige Zauberbuch\". Es ist ein Kinderbuch über einen kleinen Zauberer. Das Buch gefällt mir, weil es sehr lustig ist – ich muss immer lachen! Die Geschichten sind kurz, aber toll. Ich empfehle das Buch besonders Kindern, die gern lachen."),
          empty(),
          pBold("Sara (12 Jahre) empfiehlt ein Spiel:"),
          p("Mein Lieblingsspiel ist \"Stadt, Land, Fluss\". Das ist ein Wortspiel für alle. Das Spiel gefällt mir, weil man dabei viel lernt. Man braucht nur einen Stift und Papier. Ich empfehle das Spiel für lange Nachmittage mit Freunden oder der Familie."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Wer empfiehlt was? Verbinde."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2500 }), hCell("Was?", { width: 2500 }), hCell("Warum gefällt es?", { width: 4500 })] }),
        new TableRow({ children: [dCell("Zoe"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Luca"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Sara"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("1. Welche Filmgattung ist \"Das große Abenteuer\"?"),
    writeLine(60), empty(),
    p("2. Warum gefällt Luca das Zauberbuch?"),
    writeLine(60), empty(),
    p("3. Was braucht man für \"Stadt, Land, Fluss\"?"),
    writeLine(60), empty(),
    p("4. Wem empfiehlt Sara ihr Lieblingsspiel?"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Suche im Text! Schreib alle Adjektive zur Beschreibung von Filmen/Büchern/Spielen."),
    p("____________________ – ____________________ – ____________________ – ____________________"),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Was empfiehlst du? (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Wer empfiehlt was?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2500 }), hCell("Was?", { width: 2500 }), hCell("Warum?", { width: 4500 })] }),
        new TableRow({ children: [dCell("Zoe"), dCell("Film: \"Das große Abenteuer\""), dCell("spannend, man weiß nie was passiert")] }),
        new TableRow({ children: [dCell("Luca"), dCell("Buch: \"Das lustige Zauberbuch\""), dCell("lustig, man muss immer lachen")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Spiel: \"Stadt, Land, Fluss\""), dCell("man lernt viel, braucht nur Stift + Papier")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Es ist ein Abenteuerfilm."),
    bullet("2. Es gefällt ihm, weil es sehr lustig ist – er muss immer lachen."),
    bullet("3. Man braucht nur einen Stift und Papier."),
    bullet("4. Sie empfiehlt es für lange Nachmittage mit Freunden oder der Familie."),
    empty(),
    pBold("Aufgabe 3: Adjektive im Text"),
    p("spannend – lustig – toll – mutig – kurz"),
    pItalic("Vier beliebige Adjektive akzeptieren."),
  ]);
}

// ── LÜCKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Kino, Bücher, Spiele"), empty(),
    pBold("Wörterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("gefällt – gefallen – mir – dir – ihm – ihr – empfehle – spannend – lustig – gruselig – langweilig – Kino – Film – Buch – Spiel – Komödie – Krimi")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: gefällt oder gefallen? Ergänze."),
    empty(),
    p("1. Der Krimi ______________________ mir sehr."),
    p("2. Komödien ______________________ mir, weil sie lustig sind."),
    p("3. Das Buch ______________________ ihr nicht – es ist zu langweilig."),
    p("4. Abenteuerfilme ______________________ uns beiden super."),
    p("5. Gefällt ______________________ der Film?"),
    empty(),
    pBold("Teil 2: Ergänze das passende Adjektiv."),
    empty(),
    p("1. Im Horrorfilm passieren viele Dinge, die Angst machen. Er ist ______________________."),
    p("2. Die Komödie macht uns zum Lachen. Sie ist ______________________."),
    p("3. Im Thriller passieren überraschende Dinge. Er ist ______________________."),
    p("4. Im Buch passiert stundenlang nichts. Es ist ______________________."),
    empty(),
    pBold("Teil 3: Dialog – Im Kino"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Ben"), dCell("Warst du schon im ______________________?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ja! Ich habe gestern einen ______________________ gesehen.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Und? Wie findest du ______________________?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Er ______________________ mir sehr! Er ist super ______________________.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ich gehe lieber in Komödien. Die ______________________ mir besser.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich ______________________ dir trotzdem diesen Film. Probier es mal!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Kino, Bücher, Spiele (LÖSUNG)"), empty(),
    pBold("Teil 1: gefällt / gefallen"),
    bullet("1. gefällt (Singular: der Krimi)"),
    bullet("2. gefallen (Plural: Komödien)"),
    bullet("3. gefällt (Singular: das Buch)"),
    bullet("4. gefallen (Plural: Abenteuerfilme)"),
    bullet("5. dir"),
    empty(),
    pItalic("Regel: gefällt = Singular-Subjekt; gefallen = Plural-Subjekt. Das Objekt steht im Dativ!"),
    empty(),
    pBold("Teil 2: Adjektive"),
    bullet("1. gruselig"),
    bullet("2. lustig"),
    bullet("3. spannend"),
    bullet("4. langweilig"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Ben: ... im Kino?"),
    bullet("Mia: ... einen Krimi / Abenteuerfilm gesehen."),
    bullet("Ben: Wie findest du ihn / den Film?"),
    bullet("Mia: Er gefällt mir sehr! Er ist super spannend / toll."),
    bullet("Ben: Die gefallen mir besser."),
    bullet("Mia: Ich empfehle dir trotzdem diesen Film."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Kino, Bücher, Spiele"), empty(),
    makeWortTable(),
    empty(),
    pBold("Grammatik-Hinweise: gefallen + Dativ"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Personalpronomen", { width: 2500 }), hCell("Dativform", { width: 2000 }), hCell("Beispiel", { width: 5000 })] }),
        new TableRow({ children: [dCell("ich"), dCell("mir"), dCell("Der Film gefällt mir.")] }),
        new TableRow({ children: [dCell("du"), dCell("dir"), dCell("Gefällt dir das Buch?")] }),
        new TableRow({ children: [dCell("er / es"), dCell("ihm"), dCell("Das Spiel gefällt ihm.")] }),
        new TableRow({ children: [dCell("sie (sg.)"), dCell("ihr"), dCell("Die Komödie gefällt ihr.")] }),
        new TableRow({ children: [dCell("wir"), dCell("uns"), dCell("Der Krimi gefällt uns.")] }),
        new TableRow({ children: [dCell("ihr"), dCell("euch"), dCell("Gefällt euch der Film?")] }),
        new TableRow({ children: [dCell("sie / Sie"), dCell("ihnen / Ihnen"), dCell("Der Thriller gefällt ihnen.")] }),
      ],
    }),
    empty(),
    pBold("Wichtige Regeln:"),
    bullet("\"gefällt\" bei Singular-Subjekt: Der Film gefällt mir."),
    bullet("\"gefallen\" bei Plural-Subjekt: Die Bücher gefallen mir."),
    bullet("Subjekt = das, was gefällt (Film, Buch, Spiel); Dativobjekt = die Person."),
    bullet("Wie findest du ...? + Antwort mit Adjektiv: Ich finde ihn spannend. / Er gefällt mir."),
    bullet("empfehlen + Akkusativ + Dativ: Ich empfehle dir diesen Film."),
    empty(),
    h2("Film- und Buchgenres"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Genre", { width: 3000 }), hCell("Beschreibung", { width: 6500 })] }),
        new TableRow({ children: [dCell("der Abenteuerfilm/-roman"), dCell("viel Action, Reisen, spannende Erlebnisse")] }),
        new TableRow({ children: [dCell("der Krimi"), dCell("Verbrechen, Detektiv sucht den Täter")] }),
        new TableRow({ children: [dCell("die Komödie"), dCell("lustig, macht zum Lachen")] }),
        new TableRow({ children: [dCell("das Märchen"), dCell("Fantasie, Zauberer, Prinzessinnen, gutes Ende")] }),
        new TableRow({ children: [dCell("der Horrorfilm"), dCell("gruselig, macht Angst")] }),
        new TableRow({ children: [dCell("der Zeichentrickfilm"), dCell("animiert, oft für Kinder")] }),
      ],
    }),
    empty(),
    h2("Übersetzung in deine Sprache"),
    bullet("gefallen (+ Dativ) = ______________________"),
    bullet("empfehlen = ______________________"),
    bullet("spannend = ______________________"),
    bullet("lustig = ______________________"),
    bullet("gruselig = ______________________"),
    bullet("langweilig = ______________________"),
    bullet("der Krimi = ______________________"),
    bullet("die Komödie = ______________________"),
    bullet("das Märchen = ______________________"),
    bullet("Wie findest du ...? = ______________________"),
    empty(),
    pItalic("Tipp: Lern \"gefallen\" immer mit einem Beispielsatz: Der Film gefällt mir. – Schreib einen eigenen Satz dazu!"),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Kino, Bücher, Spiele (LÖSUNG)"), empty(),
    makeWortTable(),
    empty(),
    pBold("Wichtigste Strukturen für die Lehrkraft:"),
    bullet("gefallen = Dativverb: das Subjekt ist das Ding (Film, Buch), die Person steht im Dativ."),
    bullet("Häufiger Fehler: \"Ich gefalle den Film\" statt \"Der Film gefällt mir\" – korrigieren!"),
    bullet("gefällt (Sg.) vs. gefallen (Pl.) – Kongruenz mit dem Subjekt, nicht mit der Person."),
    bullet("empfehlen + Dativ + Akkusativ: Ich empfehle DIR diesen FILM."),
    bullet("\"Wie findest du ...?\" = subjektive Bewertungsfrage; Antwort mit Adjektiv oder gefällt-Konstruktion."),
    bullet("Genre-Vokabular: Pluralformen beachten (der Krimi → die Krimis; die Komödie → die Komödien)."),
    empty(),
    pItalic("Übersetzungen sind individuell. Besondere Aufmerksamkeit bei 'gefallen' – viele Sprachen haben keine direkte Entsprechung."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Über Kino, Bücher und Spiele sprechen"), empty(),
    pBold("Dialog 1: Nach dem Kino"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Finn"), dCell("Hey Nora! Ich war gestern im Kino. Hast du schon \"Sternenreise\" gesehen?")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Nein, noch nicht. Was ist das?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Es ist ein Abenteuerfilm. Er gefällt mir total! So spannend!")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Wie findest du ihn im Vergleich zu Krimis?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Abenteuerfilme gefallen mir lieber als Krimis. Krimis finde ich manchmal zu gruselig.")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Ich mag Komödien am liebsten. Die gefallen mir, weil ich so viel lache.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ich empfehle dir \"Sternenreise\" trotzdem! Du wirst es lieben!")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Okay! Wollen wir nächste Woche zusammen hingehen?")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Ja, gern! Ich freue mich schon!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ergänze und übe mit deinem Partner / deiner Partnerin."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Hast du einen guten Film / ein gutes Buch / ein tolles Spiel für mich?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja! Ich empfehle ______________________ .")] }),
        new TableRow({ children: [dCell("A"), dCell("Was ist das?")] }),
        new TableRow({ children: [dCell("B"), dCell("Es ist ein/e ______________________. Es/Er/Sie gefällt mir sehr, weil ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Wie findest du ______________________ im Vergleich zu ______________________?")] }),
        new TableRow({ children: [dCell("B"), dCell("______________________ gefällt/gefallen mir ______________________ als ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Ich mag eher ______________________. Die/Der/Das gefällt/gefallen mir, weil ______________________.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Meine Lieblingsempfehlung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsfilm? Warum?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Genre gefällt dir am besten?"), dCell("")] }),
        new TableRow({ children: [dCell("Was liest du gern? Welches Buch empfiehlst du?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Spiel gefällt dir? Warum?"), dCell("")] }),
        new TableRow({ children: [dCell("Was findest du gruselig / langweilig / spannend?"), dCell("")] }),
        new TableRow({ children: [dCell("Was empfiehlst du mir diese Woche?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Empfehlungs-Runde"),
    bullet("Jede Person denkt an einen Film, ein Buch oder ein Spiel."),
    bullet("Reihum stellt jede Person eine Empfehlung vor (2–3 Sätze): Es/Er/Sie heißt ... – Es/Er/Sie ist ... – Es/Er/Sie gefällt mir, weil ..."),
    bullet("Die Klasse stellt Fragen: \"Wie findest du es im Vergleich zu ...?\" / \"Für wen empfiehlst du es?\""),
    bullet("Abstimmung: Wessen Empfehlung klingt am interessantesten?"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Kino, Bücher, Spiele (LÖSUNG)"), empty(),
    pBold("Dialog 1: Schlüsselstrukturen"),
    bullet("Er gefällt mir total! – Dativkonstruktion, Subjekt = der Film."),
    bullet("Abenteuerfilme gefallen mir lieber als Krimis. – Plural-Subjekt → gefallen."),
    bullet("Ich finde ihn/sie/es + Adjektiv: Ich finde ihn spannend. (Akkusativpronomen)"),
    bullet("Ich empfehle dir + Akkusativ: Ich empfehle dir diesen Film."),
    bullet("Du wirst es lieben! – Zukunft mit werden (Vorschau, A2-Niveau)."),
    empty(),
    pBold("Dialog 2: Mögliche Lückenfüllung"),
    bullet("Ich empfehle dir \"Das große Abenteuer\" / dieses Buch."),
    bullet("Es ist ein Abenteuerfilm / Krimi / Märchen. Es gefällt mir sehr, weil es so spannend ist."),
    bullet("Wie findest du Abenteuerfilme im Vergleich zu Krimis?"),
    bullet("Krimis gefallen mir lieber als Komödien. / Komödien gefallen mir besser als Krimis."),
    bullet("Ich mag eher Märchen. Die gefallen mir, weil sie lustig / toll / spannend sind."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("gefällt/gefallen korrekt verwendet (Singular/Plural-Kongruenz)."),
    bullet("Dativpronomen korrekt: mir / dir / ihm / ihr."),
    bullet("Beschreibungsadjektiv verwendet: spannend / lustig / gruselig / langweilig."),
    bullet("Empfehlung mit empfehlen + Dativ + Akkusativ."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Kino, Bücher, Spiele"), empty(),
    pBold("Aufgabe 1: Was ist das Genre? Schreib unter jedes Bild das Genre und ein passendes Adjektiv."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD 1: Detektiv mit Lupe, dunkle Atmosphäre]", { width: 4750 }), hCell("[BILD 2: Zwei Figuren lachen laut, Sternchen um sie herum]", { width: 4750 })] }),
        new TableRow({ children: [dCell("Genre: ____________________ – Adjektiv: ____________________"), dCell("Genre: ____________________ – Adjektiv: ____________________")] }),
        new TableRow({ children: [hCell("[BILD 3: Held springt über Abgrund in exotischer Landschaft]", { width: 4750 }), hCell("[BILD 4: Monster hinter einer Tür, Kind erschrickt]", { width: 4750 })] }),
        new TableRow({ children: [dCell("Genre: ____________________ – Adjektiv: ____________________"), dCell("Genre: ____________________ – Adjektiv: ____________________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was sagen die Personen? Ergänze die Sprechblase mit gefällt/gefallen + Dativpronomen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 5000 }), hCell("Sprechblase", { width: 4500 })] }),
        new TableRow({ children: [dCell("[BILD: Mädchen grinst, hält Buch hoch – Daumen hoch]"), dCell("Das Buch ____________________ sehr!")] }),
        new TableRow({ children: [dCell("[BILD: Junge schläft im Kino – Film ist langweilig]"), dCell("Der Film ____________________ nicht. Er ist so langweilig.")] }),
        new TableRow({ children: [dCell("[BILD: Zwei Kinder spielen ein Brettspiel und freuen sich]"), dCell("Das Spiel ____________________ uns!")] }),
        new TableRow({ children: [dCell("[BILD: Kind fragt einen Freund, zeigt auf Filmplakat]"), dCell("Gefällt ____________________ dieser Film?")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: [BILD: Filmplakat mit Titel \"Der geheimnisvolle Wald\" – Abenteuerfilm]"),
    p("Schreib eine kurze Empfehlung für diesen Film (4–5 Sätze)."),
    p("Benutze: gefällt mir – ich empfehle – spannend / lustig / toll – weil"),
    empty(),
    ...writeLines(5, 60),
    pBold("Aufgabe 4: Meine Top-3"),
    p("[BILD: Siegertreppchen mit 1. / 2. / 3. Platz und leeren Feldern]"),
    p("Schreib deine persönlichen Empfehlungen auf das Podium:"),
    bullet("1. Platz (am liebsten): ______________________"),
    bullet("2. Platz (lieber): ______________________"),
    bullet("3. Platz (gern): ______________________"),
    empty(),
    p("Schreib zu jeder Empfehlung einen Satz:"),
    writeLine(60), empty(),
    writeLine(60), empty(),
    writeLine(60),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Kino, Bücher, Spiele (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Genres und Adjektive"),
    bullet("Bild 1: Krimi – spannend / gruselig"),
    bullet("Bild 2: Komödie – lustig"),
    bullet("Bild 3: Abenteuerfilm – spannend / aufregend"),
    bullet("Bild 4: Horrorfilm – gruselig"),
    empty(),
    pBold("Aufgabe 2: Sprechblasen mit gefällt/gefallen"),
    bullet("Mädchen mit Buch: Das Buch gefällt mir sehr!"),
    bullet("Junge schläft: Der Film gefällt mir nicht."),
    bullet("Zwei Kinder spielen: Das Spiel gefällt uns!"),
    bullet("Kind fragt Freund: Gefällt dir dieser Film?"),
    empty(),
    pBold("Aufgabe 3: Empfehlung – Musterlösung"),
    pItalic("\"Der geheimnisvolle Wald\" ist ein Abenteuerfilm. Er gefällt mir sehr, weil er so spannend ist. Die Hauptfigur ist mutig und findet viele Geheimnisse im Wald. Ich empfehle dir diesen Film! Du wirst ihn toll finden."),
    empty(),
    pBold("Aufgabe 4: Top-3 – individuell"),
    bullet("1. Platz: [Lieblingsfilm/Buch/Spiel] – Er/Es/Sie gefällt mir am liebsten, weil ..."),
    bullet("2. Platz: [zweites Lieblings...] – Er/Es/Sie gefällt mir lieber als ..."),
    bullet("3. Platz: [drittes ...] – Er/Es/Sie gefällt mir auch gern."),
    empty(),
    pBold("Hinweis Lehrkraft:"),
    bullet("Antworten hängen vom eingefügten Bildmaterial ab."),
    bullet("gefällt (Sg.) vs. gefallen (Pl.) besonders prüfen."),
    bullet("Dativpronomen auf Korrektheit prüfen (mir / dir / ihm / ihr / uns)."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Ueber Kino, Buecher, Spiele sprechen (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
