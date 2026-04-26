"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "02_SchuleLernen", "03_MeinungenSchulfaecher");
const TOPIC     = "A2_Kinder_SchuleLernen_03_MeinungenSchulfaecher";
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

// ── Bewertungswort-Tabelle ────────────────────────────────────────────────────
function makeBewertungenTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort/Phrase", { width: 2800 }), hCell("Wortart", { width: 1800 }), hCell("Beispielsatz", { width: 4900 })] }),
      new TableRow({ children: [dCell("toll"), dCell("Adjektiv (+)"), dCell("Ich finde Sport toll.")] }),
      new TableRow({ children: [dCell("super"), dCell("Adjektiv (+)"), dCell("Musik ist super!")] }),
      new TableRow({ children: [dCell("klasse"), dCell("Adjektiv (+)"), dCell("Englisch finde ich klasse.")] }),
      new TableRow({ children: [dCell("interessant"), dCell("Adjektiv (+)"), dCell("Ich finde Geschichte interessant.")] }),
      new TableRow({ children: [dCell("lustig"), dCell("Adjektiv (+)"), dCell("Kunst ist lustig.")] }),
      new TableRow({ children: [dCell("leicht"), dCell("Adjektiv (+)"), dCell("Mathe ist für mich leicht.")] }),
      new TableRow({ children: [dCell("langweilig"), dCell("Adjektiv (–)"), dCell("Ich finde Religion langweilig.")] }),
      new TableRow({ children: [dCell("anstrengend"), dCell("Adjektiv (–)"), dCell("Sport ist sehr anstrengend.")] }),
      new TableRow({ children: [dCell("schwer"), dCell("Adjektiv (–)"), dCell("Ich finde Physik schwer.")] }),
      new TableRow({ children: [dCell("doof"), dCell("Adjektiv (–)"), dCell("Hausaufgaben sind doof.")] }),
      new TableRow({ children: [dCell("Meine Meinung ist ..."), dCell("Phrase"), dCell("Meine Meinung ist: Englisch ist wichtig.")] }),
      new TableRow({ children: [dCell("Ich finde / glaube / denke"), dCell("Verb-Phrase"), dCell("Ich denke, Mathe ist nützlich.")] }),
      new TableRow({ children: [dCell("(macht) Spaß"), dCell("Phrase"), dCell("Musik macht mir Spaß.")] }),
      new TableRow({ children: [dCell("(macht) keinen Spaß"), dCell("Phrase"), dCell("Geschichte macht mir keinen Spaß.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Meine Meinung zu Schulfächern"), empty(),
    pBold("Aufgabe 1: Ergänze die Sätze mit einem passenden Adjektiv."),
    p("Wörter: toll – super – langweilig – anstrengend – leicht – schwer – interessant"),
    empty(),
    p("1. Ich finde Mathe ______________________, weil ich gut rechnen kann."),
    empty(),
    p("2. Sport ist ______________________, aber ich mag es trotzdem."),
    empty(),
    p("3. Geschichte ist ______________________, weil wir viel über früher lernen."),
    empty(),
    p("4. Ich finde Englisch ______________________, ich verstehe oft nichts."),
    empty(),
    p("5. Musik macht mir Spaß. Ich finde Musik ______________________."),
    empty(),
    p("6. Religion finde ich ______________________. Da passiert nicht viel."),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib eigene Sätze mit \"Ich finde + Schulfach + Adjektiv\"."),
    pItalic("Beispiel: Ich finde Deutsch interessant."),
    empty(),
    p("1. ______________________________________________________________________"),
    writeLine(60), empty(),
    p("2. ______________________________________________________________________"),
    writeLine(60), empty(),
    p("3. ______________________________________________________________________"),
    writeLine(60), empty(),
    p("4. ______________________________________________________________________"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Mein Lieblingsfach – schreib 4–5 Sätze."),
    p("Verwende: Mein Lieblingsfach ist ... – Ich finde es ... – ... macht mir Spaß – Meine Lehrerin / Mein Lehrer heißt ... – Ich mag (nicht), wenn ..."),
    empty(),
    ...writeLines(6, 60),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Meine Meinung zu Schulfächern (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Musterlösung (mehrere Adjektive möglich)"),
    bullet("1. leicht / interessant"),
    bullet("2. anstrengend"),
    bullet("3. interessant / toll"),
    bullet("4. schwer"),
    bullet("5. toll / super"),
    bullet("6. langweilig"),
    empty(),
    pItalic("Hinweis: Solange das Adjektiv inhaltlich zum Satz passt, ist es richtig."),
    empty(),
    pBold("Aufgabe 2 + 3: Individuelle Antworten akzeptieren."),
    pBold("Bewertungskriterien:"),
    bullet("Satzbau: Subjekt + finden + Akkusativ-Objekt + Adjektiv (Ich finde Mathe toll)."),
    bullet("Schulfach ohne Artikel: Mathe, Deutsch, Sport (NICHT: \"das Mathe\")."),
    bullet("Adjektiv steht nach finden im Akkusativ – aber endungslos (Ich finde Mathe toll, NICHT \"tolles\")."),
    bullet("Lehrkraft kommentiert Wortwiederholungen und schlägt Synonyme vor."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Drei Kinder erzählen"), empty(),
    pBold("Lies die drei kurzen Texte."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Lina (10 Jahre):"),
          p("Ich gehe in die 4. Klasse. Mein Lieblingsfach ist Kunst. Ich finde Kunst toll, weil ich gerne male und bastle. Mathe finde ich schwer. Die Aufgaben sind oft anstrengend. Aber meine Lehrerin ist nett und hilft mir."),
          empty(),
          pBold("Tarek (11 Jahre):"),
          p("Ich mag Sport am liebsten. Sport ist super, wir spielen oft Fußball. Englisch ist auch interessant, aber manchmal schwer. Musik finde ich ein bisschen langweilig, weil wir nur singen. Mein Lieblingsfach ist klar: Sport!"),
          empty(),
          pBold("Sophie (10 Jahre):"),
          p("Ich liebe Deutsch. Wir lesen viele Geschichten und das macht mir Spaß. Geschichte finde ich auch klasse, ich lerne gern über früher. Mathe ist für mich leicht, aber langweilig. Sport mag ich nicht, das ist zu anstrengend."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Wer sagt das? Schreib L (Lina), T (Tarek) oder S (Sophie)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("L / T / S", { width: 2000 })] }),
        new TableRow({ children: [dCell("Mein Lieblingsfach ist Kunst."), dCell("")] }),
        new TableRow({ children: [dCell("Ich finde Sport zu anstrengend."), dCell("")] }),
        new TableRow({ children: [dCell("Wir spielen oft Fußball im Sportunterricht."), dCell("")] }),
        new TableRow({ children: [dCell("Mathe ist leicht, aber langweilig."), dCell("")] }),
        new TableRow({ children: [dCell("Meine Lehrerin ist nett."), dCell("")] }),
        new TableRow({ children: [dCell("Musik finde ich ein bisschen langweilig."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("1. Warum mag Lina Kunst?"),
    writeLine(60), empty(),
    p("2. Welches Fach findet Tarek interessant, aber manchmal schwer?"),
    writeLine(60), empty(),
    p("3. Was macht Sophie im Deutschunterricht gerne?"),
    writeLine(60), empty(),
    p("4. Welches Fach findet Sophie leicht, aber langweilig?"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Suche im Text! Schreib 3 Adjektive zur Bewertung von Schulfächern."),
    p("____________________ – ____________________ – ____________________"),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Drei Kinder erzählen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Wer sagt das?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("L / T / S", { width: 2000 })] }),
        new TableRow({ children: [dCell("Mein Lieblingsfach ist Kunst."), dCell("L")] }),
        new TableRow({ children: [dCell("Ich finde Sport zu anstrengend."), dCell("S")] }),
        new TableRow({ children: [dCell("Wir spielen oft Fußball im Sportunterricht."), dCell("T")] }),
        new TableRow({ children: [dCell("Mathe ist leicht, aber langweilig."), dCell("S")] }),
        new TableRow({ children: [dCell("Meine Lehrerin ist nett."), dCell("L")] }),
        new TableRow({ children: [dCell("Musik finde ich ein bisschen langweilig."), dCell("T")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie mag Kunst, weil sie gerne malt und bastelt."),
    bullet("2. Englisch ist interessant, aber manchmal schwer."),
    bullet("3. Sie liest gerne Geschichten."),
    bullet("4. Sie findet Mathe leicht, aber langweilig."),
    empty(),
    pBold("Aufgabe 3: Adjektive aus den Texten (Auswahl)"),
    p("toll – schwer – anstrengend – super – interessant – langweilig – klasse – leicht"),
    pItalic("Drei beliebige passende Adjektive akzeptieren."),
  ]);
}

// ── LÜCKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Meine Meinung zu Schulfächern"), empty(),
    pBold("Wörterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("finde – ist – sind – Spaß – Meinung – langweilig – schwer – toll – anstrengend – interessant – Lieblingsfach – denke – glaube")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergänze die Sätze."),
    empty(),
    p("1. Ich ______________________ Mathe schwer."),
    p("2. Sport macht mir ______________________."),
    p("3. Englisch ______________________ wichtig für später."),
    p("4. Mein ______________________ ist Kunst."),
    p("5. Hausaufgaben sind oft ______________________."),
    p("6. Meine ______________________: Musik ist super!"),
    p("7. Ich ______________________, Geschichte ist sehr interessant."),
    empty(),
    pBold("Teil 2: Setze das passende Adjektiv ein."),
    empty(),
    p("1. Wir lernen viele neue Wörter im Englischunterricht – das ist ______________________."),
    p("2. Beim Sport laufen wir 30 Minuten. Das ist ______________________."),
    p("3. Wir lesen ein Buch in Deutsch. Ich finde das ______________________ (positiv!)."),
    p("4. Im Religionsunterricht passiert für mich nicht viel – das ist ______________________."),
    p("5. Mathe-Tests sind oft ______________________ – ich brauche viel Zeit."),
    empty(),
    pBold("Teil 3: Dialog – Ergänze die Lücken."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"), dCell("Was ist dein ______________________?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Mein Lieblingsfach ist Sport. Ich ______________________ Sport toll!")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Wirklich? Ich finde Sport ______________________.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Und welches Fach magst du?")] }),
        new TableRow({ children: [dCell("Anna"), dCell("Meine ______________________: Mathe ist super! Ich ______________________ Mathe leicht.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Mathe macht mir keinen ______________________. Es ist zu schwer!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Meine Meinung zu Schulfächern (LÖSUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. finde"),
    bullet("2. Spaß"),
    bullet("3. ist"),
    bullet("4. Lieblingsfach"),
    bullet("5. anstrengend"),
    bullet("6. Meinung"),
    bullet("7. denke / glaube"),
    empty(),
    pBold("Teil 2: Musterlösung (mehrere Adjektive möglich)"),
    bullet("1. interessant / toll"),
    bullet("2. anstrengend"),
    bullet("3. toll / super / klasse"),
    bullet("4. langweilig"),
    bullet("5. schwer / anstrengend"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Anna: Was ist dein Lieblingsfach?"),
    bullet("Ben: ... Ich finde Sport toll!"),
    bullet("Anna: ... Ich finde Sport anstrengend / langweilig / doof."),
    bullet("Anna: Meine Meinung: Mathe ist super! Ich finde Mathe leicht."),
    bullet("Ben: Mathe macht mir keinen Spaß."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Meinungen zu Schulfächern"), empty(),
    makeBewertungenTable(),
    empty(),
    pBold("Grammatik-Hinweise:"),
    bullet("\"finden\" + Akkusativ + Adjektiv: Ich finde Mathe schwer. (Schulfächer haben keinen Artikel!)"),
    bullet("Das Adjektiv nach finden ist endungslos: Ich finde Englisch interessant. (NICHT: \"interessantes\")"),
    bullet("Mit Artikel: Ich finde DEN Englischunterricht interessant. (Akkusativ: den/das/die)"),
    bullet("\"Meine Meinung ist ...\" leitet die eigene Position ein: Meine Meinung ist: Sport ist wichtig."),
    bullet("\"Ich denke / glaube\" + Komma + Hauptsatz: Ich denke, Mathe ist nützlich."),
    bullet("\"... macht (mir) Spaß\" / \"... macht (mir) keinen Spaß\": Musik macht mir Spaß."),
    empty(),
    h2("Übersetzung in deine Sprache"),
    p("Schreib für jedes Wort die Übersetzung auf:"),
    bullet("toll = ______________________"),
    bullet("super = ______________________"),
    bullet("klasse = ______________________"),
    bullet("interessant = ______________________"),
    bullet("lustig = ______________________"),
    bullet("leicht = ______________________"),
    bullet("langweilig = ______________________"),
    bullet("anstrengend = ______________________"),
    bullet("schwer = ______________________"),
    bullet("doof = ______________________"),
    bullet("Meine Meinung = ______________________"),
    bullet("Spaß machen = ______________________"),
    empty(),
    pItalic("Tipp: Schreib dir aus jeder Spalte 5 Wörter auf eine Lernkarte (Vorderseite Deutsch, Rückseite deine Sprache)."),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Meinungen zu Schulfächern (LÖSUNG)"), empty(),
    makeBewertungenTable(),
    empty(),
    pBold("Wichtigste Strukturen für die Lehrkraft:"),
    bullet("Ich finde + Akkusativ + Adjektiv (Adjektiv endungslos)."),
    bullet("Schulfächer ohne Artikel verwenden: Mathe, Deutsch, Sport."),
    bullet("Mit Unterricht: der/den Mathematikunterricht (mask. → Akk. \"den\")."),
    bullet("\"Meine Meinung ist: ...\" + Hauptsatz – sehr typische Einleitung."),
    bullet("\"Ich denke / glaube, ...\" + Komma + Hauptsatz (Verb auf Position 2)."),
    bullet("Achtung Aussprache: Spaß /ʃpaːs/ – langes a, scharfes s."),
    empty(),
    pItalic("Übersetzungen sind individuell. Die Lehrkraft kontrolliert nur, ob das Schüler-Wort wirklich das deutsche Wort meint."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Meinungen zu Schulfächern"), empty(),
    pBold("Dialog 1: Auf dem Schulhof"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mia"), dCell("Hey Jonas, was ist dein Lieblingsfach?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Mein Lieblingsfach ist Englisch. Ich finde es super!")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Wirklich? Englisch finde ich schwer. Die Wörter sind so komisch.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Was magst du am liebsten?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Meine Meinung: Kunst ist toll. Ich male sehr gern.")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Kunst macht mir keinen Spaß, ich kann nicht malen.")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Aber Mathe magst du, oder?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Nein, Mathe ist langweilig und anstrengend. Ich denke, Mathe brauche ich später nicht.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Tausch die Rollen und ergänze die Lücken."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Was ist dein Lieblingsfach?")] }),
        new TableRow({ children: [dCell("B"), dCell("Mein Lieblingsfach ist ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Warum?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich finde ______________________ ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Welches Fach magst du nicht?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich mag ______________________ nicht. Das ist ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Was meinst du zu ______________________?")] }),
        new TableRow({ children: [dCell("B"), dCell("Meine Meinung: ______________________.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Frag deinen Partner / deine Partnerin."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingsfach?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Fach findest du langweilig?"), dCell("")] }),
        new TableRow({ children: [dCell("Was findest du an Mathe (toll/schwer)?"), dCell("")] }),
        new TableRow({ children: [dCell("In welchem Fach hast du gute Noten?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Fach macht dir Spaß? Warum?"), dCell("")] }),
        new TableRow({ children: [dCell("Welches Fach ist deiner Meinung nach wichtig?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Meinungs-Express"),
    bullet("Die Lehrkraft sagt ein Schulfach: \"Mathe!\""),
    bullet("Die Klasse antwortet im Chor mit einem Adjektiv + Begründung."),
    bullet("Beispiel: \"Ich finde Mathe schwer, weil viele Zahlen sind!\""),
    bullet("Wer am schnellsten einen ganzen Satz sagt, sucht das nächste Fach aus."),
    bullet("Variante: jedes Adjektiv darf nur einmal verwendet werden!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Meinungen zu Schulfächern (LÖSUNG)"), empty(),
    pBold("Dialog 1: Schlüsselstrukturen"),
    bullet("Was ist dein Lieblingsfach? – Standardfrage."),
    bullet("Mein Lieblingsfach ist + Schulfach (kein Artikel)."),
    bullet("Ich finde + Schulfach + Adjektiv (endungslos): Ich finde Englisch super."),
    bullet("Meine Meinung: + Hauptsatz – persönliche Bewertung einleiten."),
    bullet("... macht mir (keinen) Spaß – über Freude / Abneigung sprechen."),
    bullet("Ich denke, ... – Komma + Hauptsatz, Verb auf Position 2."),
    empty(),
    pBold("Dialog 2: Mögliche Lückenfüllung (Beispiel)"),
    bullet("Mein Lieblingsfach ist Sport."),
    bullet("Ich finde Sport toll."),
    bullet("Ich mag Religion nicht. Das ist langweilig."),
    bullet("Was meinst du zu Mathe? – Meine Meinung: Mathe ist wichtig."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrektes finden + Akkusativ + Adjektiv (endungslos)."),
    bullet("Verwendung von Meinungs-Phrasen: Ich finde / denke / glaube; Meine Meinung ist."),
    bullet("Kurze Begründung mit weil oder Komma + Hauptsatz."),
    bullet("Höfliches Reagieren auf andere Meinung (\"Ich auch / Ich nicht.\")."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Meinungen zu Schulfächern"), empty(),
    pBold("Aufgabe 1: Verbinde Bild und Schulfach mit einer Linie."),
    p("[BILD 1: Taschenrechner und Zahlen] – [BILD 2: Fußball] – [BILD 3: Buch und Stift] – [BILD 4: Pinsel und Farben] – [BILD 5: Globus] – [BILD 6: Notenschlüssel]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Schulfach", { width: 4750 })] }),
        new TableRow({ children: [dCell("[BILD 1: Taschenrechner und Zahlen]"), dCell("Sport")] }),
        new TableRow({ children: [dCell("[BILD 2: Fußball]"), dCell("Erdkunde")] }),
        new TableRow({ children: [dCell("[BILD 3: Buch und Stift]"), dCell("Mathe")] }),
        new TableRow({ children: [dCell("[BILD 4: Pinsel und Farben]"), dCell("Musik")] }),
        new TableRow({ children: [dCell("[BILD 5: Globus]"), dCell("Deutsch")] }),
        new TableRow({ children: [dCell("[BILD 6: Notenschlüssel]"), dCell("Kunst")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was sagen die Kinder? Schreib in die Sprechblase."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Sprechblase (\"Ich finde ...\")", { width: 4750 })] }),
        new TableRow({ children: [dCell("[BILD: Mädchen lacht beim Malen]"), dCell("Ich finde ____________________ ____________________.")] }),
        new TableRow({ children: [dCell("[BILD: Junge gähnt im Religionsunterricht]"), dCell("Ich finde ____________________ ____________________.")] }),
        new TableRow({ children: [dCell("[BILD: Kind schwitzt beim Sport]"), dCell("Sport ist ____________________!")] }),
        new TableRow({ children: [dCell("[BILD: Kind freut sich über gute Mathe-Note]"), dCell("Mathe macht mir ____________________!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Notenspiegel – Wer findet was wie?"),
    p("[BILD: Notenzeugnis mit verschiedenen Fächern und Smileys]"),
    p("Schau das Zeugnis an und schreib zu jedem Fach einen Satz mit einer Bewertung."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Fach", { width: 2500 }), hCell("Smiley im Bild", { width: 2500 }), hCell("Mein Satz", { width: 4500 })] }),
        new TableRow({ children: [dCell("Mathe"), dCell("[😊]"), dCell("")] }),
        new TableRow({ children: [dCell("Deutsch"), dCell("[😐]"), dCell("")] }),
        new TableRow({ children: [dCell("Sport"), dCell("[😊]"), dCell("")] }),
        new TableRow({ children: [dCell("Musik"), dCell("[😞]"), dCell("")] }),
        new TableRow({ children: [dCell("Englisch"), dCell("[😊]"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Mein Stundenplan-Bild"),
    p("[BILD: Leerer Stundenplan-Raster mit Wochentagen Mo–Fr und 5 Stunden]"),
    p("Trag deine echten Schulfächer ein und markiere sie mit Symbolen:"),
    bullet("☺ = Das mag ich"),
    bullet("☹ = Das mag ich nicht"),
    bullet("? = Das ist mir egal"),
    empty(),
    p("Schreib darunter 3 Sätze über deinen Stundenplan:"),
    writeLine(60), empty(),
    writeLine(60), empty(),
    writeLine(60),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Meinungen zu Schulfächern (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Bild – Schulfach"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Schulfach", { width: 4750 })] }),
        new TableRow({ children: [dCell("Taschenrechner und Zahlen"), dCell("Mathe")] }),
        new TableRow({ children: [dCell("Fußball"), dCell("Sport")] }),
        new TableRow({ children: [dCell("Buch und Stift"), dCell("Deutsch")] }),
        new TableRow({ children: [dCell("Pinsel und Farben"), dCell("Kunst")] }),
        new TableRow({ children: [dCell("Globus"), dCell("Erdkunde")] }),
        new TableRow({ children: [dCell("Notenschlüssel"), dCell("Musik")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Sprechblasen (Musterlösung)"),
    bullet("Mädchen lacht beim Malen: \"Ich finde Kunst toll / super.\""),
    bullet("Junge gähnt im Religionsunterricht: \"Ich finde Religion langweilig.\""),
    bullet("Kind schwitzt beim Sport: \"Sport ist anstrengend!\""),
    bullet("Kind freut sich über gute Mathe-Note: \"Mathe macht mir Spaß!\""),
    empty(),
    pBold("Aufgabe 3: Notenspiegel (Musterlösung)"),
    bullet("Mathe ☺ – Ich finde Mathe leicht / toll."),
    bullet("Deutsch ☐ – Deutsch ist okay, aber nicht mein Lieblingsfach."),
    bullet("Sport ☺ – Sport macht mir Spaß / Ich finde Sport super."),
    bullet("Musik ☹ – Musik finde ich langweilig / nicht so gut."),
    bullet("Englisch ☺ – Ich finde Englisch interessant."),
    empty(),
    pBold("Aufgabe 4: Stundenplan – individuell"),
    pItalic("Mustersätze: \"Am Montag habe ich Sport, das mag ich.\" – \"Mein Lieblingstag ist Mittwoch, weil wir Kunst haben.\" – \"Mathe ist am Freitag in der ersten Stunde, das ist anstrengend.\""),
    empty(),
    pBold("Hinweis Lehrkraft:"),
    bullet("Antworten hängen vom eingefügten Bildmaterial und persönlichen Stundenplan ab."),
    bullet("Korrekte Verwendung von \"finden + Akkusativ + Adjektiv\" prüfen."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Einfache Meinungen zu Schulfaechern (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
