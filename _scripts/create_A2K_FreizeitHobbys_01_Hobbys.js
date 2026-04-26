"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "03_FreizeitHobbys", "01_Hobbys");
const TOPIC     = "A2_Kinder_FreizeitHobbys_01_Hobbys";
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
      new TableRow({ children: [hCell("Wort/Phrase", { width: 3000 }), hCell("Wortart", { width: 1800 }), hCell("Beispielsatz", { width: 4700 })] }),
      new TableRow({ children: [dCell("das Hobby, -s"), dCell("Nomen (n)"), dCell("Was ist dein Hobby?")] }),
      new TableRow({ children: [dCell("die Freizeit"), dCell("Nomen (f)"), dCell("In der Freizeit male ich gern.")] }),
      new TableRow({ children: [dCell("malen"), dCell("Verb"), dCell("Ich male am liebsten Tiere.")] }),
      new TableRow({ children: [dCell("zeichnen"), dCell("Verb"), dCell("Er zeichnet oft Comics.")] }),
      new TableRow({ children: [dCell("lesen"), dCell("Verb (unreg.)"), dCell("Sie liest lieber als fernsehen.")] }),
      new TableRow({ children: [dCell("basteln"), dCell("Verb"), dCell("Wir basteln manchmal Papierfiguren.")] }),
      new TableRow({ children: [dCell("kochen / backen"), dCell("Verb"), dCell("Ich backe selten Kuchen.")] }),
      new TableRow({ children: [dCell("tanzen"), dCell("Verb"), dCell("Sie tanzt immer am Wochenende.")] }),
      new TableRow({ children: [dCell("singen"), dCell("Verb"), dCell("Er singt gern im Chor.")] }),
      new TableRow({ children: [dCell("fotografieren"), dCell("Verb"), dCell("Ich fotografiere oft in der Natur.")] }),
      new TableRow({ children: [dCell("sammeln"), dCell("Verb"), dCell("Sie sammelt Briefmarken.")] }),
      new TableRow({ children: [dCell("Fußball spielen"), dCell("Verb-Phrase"), dCell("Ich spiele gern Fußball.")] }),
      new TableRow({ children: [dCell("Musik machen / hören"), dCell("Verb-Phrase"), dCell("Er hört am liebsten Musik.")] }),
      new TableRow({ children: [dCell("gern / lieber / am liebsten"), dCell("Adverb"), dCell("Ich lese gern. Ich male lieber. Am liebsten tanze ich.")] }),
      new TableRow({ children: [dCell("immer / oft / manchmal / selten / nie"), dCell("Häufigkeitsadv."), dCell("Ich gehe nie ins Kino.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Detaillierter über Hobbys sprechen"), empty(),
    pBold("Aufgabe 1: Setze gern, lieber oder am liebsten ein."),
    empty(),
    p("1. Ich tanze ______________________. (am meisten)"),
    p("2. Lea liest ______________________ als Fußball spielen."),
    p("3. Tim fotografiert ______________________. (er mag es)"),
    p("4. Wir backen ______________________. (am meisten von allem)"),
    p("5. ______________________ male ich oder _______________________ zeichne ich?"),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib Sätze mit dem passenden Häufigkeitsadverb."),
    pItalic("Adverbien: immer – oft – manchmal – selten – nie"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Hobby", { width: 3500 }), hCell("Wie oft?", { width: 2000 }), hCell("Dein Satz", { width: 4000 })] }),
        new TableRow({ children: [dCell("Fußball spielen"), dCell("oft"), dCell("")] }),
        new TableRow({ children: [dCell("kochen"), dCell("selten"), dCell("")] }),
        new TableRow({ children: [dCell("lesen"), dCell("immer"), dCell("")] }),
        new TableRow({ children: [dCell("tanzen"), dCell("manchmal"), dCell("")] }),
        new TableRow({ children: [dCell("zeichnen"), dCell("nie"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 3: Mein Lieblingshobby – schreib 5–6 Sätze."),
    p("Beantworte: Was ist dein Hobby? Wann und wie oft machst du es? Warum magst du es? Was magst du lieber als ...?"),
    empty(),
    ...writeLines(7, 60),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Detaillierter über Hobbys sprechen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: gern / lieber / am liebsten"),
    bullet("1. am liebsten"),
    bullet("2. lieber"),
    bullet("3. gern"),
    bullet("4. am liebsten"),
    bullet("5. Ich male gern oder ich zeichne gern? / Ich male lieber oder ich zeichne lieber?"),
    empty(),
    pItalic("Erklärung: gern = mag es / lieber = mehr als etwas anderes / am liebsten = am meisten von allem."),
    empty(),
    pBold("Aufgabe 2: Häufigkeitsadverbien – Musterlösung"),
    bullet("Ich spiele oft Fußball."),
    bullet("Ich koche selten."),
    bullet("Ich lese immer. / Ich lese immer abends."),
    bullet("Ich tanze manchmal."),
    bullet("Ich zeichne nie."),
    empty(),
    pBold("Aufgabe 3: Individuelle Antwort. Bewertungskriterien:"),
    bullet("Verwendung von gern / lieber / am liebsten (mind. je einmal)."),
    bullet("Mind. ein Häufigkeitsadverb (immer / oft / manchmal / selten / nie)."),
    bullet("Hobby klar benannt, kurze Begründung (weil / weil ich es ... finde)."),
    bullet("Vergleich mit anderem Hobby (Ich ... lieber als ...)."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Drei Kinder und ihre Hobbys"), empty(),
    pBold("Lies die drei Texte."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Emre (11 Jahre):"),
          p("In meiner Freizeit spiele ich am liebsten Fußball. Ich trainiere zweimal pro Woche mit meinem Verein. Am Wochenende schaue ich oft Fußballspiele im Fernsehen. Ich mag Fußball lieber als alle anderen Sportarten. Manchmal fotografiere ich auch – das finde ich interessant, aber Fußball ist mein Lieblingshobby."),
          empty(),
          pBold("Klara (10 Jahre):"),
          p("Ich tanze sehr gern. Ich gehe jeden Dienstag und Donnerstag in die Tanzschule. Wir tanzen Hip-Hop – das macht mir riesigen Spaß! Am liebsten tanze ich vor dem Spiegel zu Hause. Ich male auch gern, aber ich tanze lieber als malen. Kochen mag ich gar nicht – das mache ich nie freiwillig."),
          empty(),
          pBold("Felix (12 Jahre):"),
          p("Mein Hobby ist Lesen. Ich lese jeden Tag, immer bevor ich schlafe. Am liebsten lese ich Abenteuergeschichten. Ich lese lieber als fernsehen oder Videospiele spielen. Manchmal zeichne ich auch Figuren aus meinen Büchern. Meine Mutter sagt, ich soll öfter nach draußen gehen!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Wer macht was? Schreib E (Emre), K (Klara) oder F (Felix)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("E / K / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Dieses Kind liest jeden Tag vor dem Schlafen."), dCell("")] }),
        new TableRow({ children: [dCell("Dieses Kind trainiert zweimal pro Woche."), dCell("")] }),
        new TableRow({ children: [dCell("Dieses Kind tanzt Hip-Hop in einer Tanzschule."), dCell("")] }),
        new TableRow({ children: [dCell("Dieses Kind zeichnet manchmal Figuren aus Büchern."), dCell("")] }),
        new TableRow({ children: [dCell("Dieses Kind kocht nie freiwillig."), dCell("")] }),
        new TableRow({ children: [dCell("Dieses Kind schaut oft Fußball im Fernsehen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("1. Was macht Emre lieber als alle anderen Sportarten?"),
    writeLine(60), empty(),
    p("2. Wie oft geht Klara in die Tanzschule?"),
    writeLine(60), empty(),
    p("3. Welche Bücher liest Felix am liebsten?"),
    writeLine(60), empty(),
    p("4. Was liest Felix lieber als fernsehen oder Videospiele?"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Suche im Text! Schreib alle Häufigkeitsadverbien, die du findest."),
    p("____________________ – ____________________ – ____________________ – ____________________"),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Drei Kinder und ihre Hobbys (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Wer macht was?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("E / K / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Dieses Kind liest jeden Tag vor dem Schlafen."), dCell("F")] }),
        new TableRow({ children: [dCell("Dieses Kind trainiert zweimal pro Woche."), dCell("E")] }),
        new TableRow({ children: [dCell("Dieses Kind tanzt Hip-Hop in einer Tanzschule."), dCell("K")] }),
        new TableRow({ children: [dCell("Dieses Kind zeichnet manchmal Figuren aus Büchern."), dCell("F")] }),
        new TableRow({ children: [dCell("Dieses Kind kocht nie freiwillig."), dCell("K")] }),
        new TableRow({ children: [dCell("Dieses Kind schaut oft Fußball im Fernsehen."), dCell("E")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er mag Fußball lieber als alle anderen Sportarten."),
    bullet("2. Sie geht jeden Dienstag und Donnerstag in die Tanzschule (zweimal pro Woche)."),
    bullet("3. Er liest am liebsten Abenteuergeschichten."),
    bullet("4. Er liest lieber als fernsehen oder Videospiele spielen."),
    empty(),
    pBold("Aufgabe 3: Häufigkeitsadverbien im Text"),
    p("oft – manchmal – jeden Tag / immer – nie – öfter"),
    pItalic("Vier beliebige passende Adverbien akzeptieren."),
  ]);
}

// ── LÜCKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Hobbys"), empty(),
    pBold("Wörterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("gern – lieber – am liebsten – immer – oft – manchmal – selten – nie – Freizeit – Hobby – malen – tanzen – lesen – fotografieren – sammeln – basteln")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: gern, lieber oder am liebsten?"),
    empty(),
    p("1. Ich tanze ______________________. (Ich mag es sehr.)"),
    p("2. Er liest ______________________ als fernsehen. (Er bevorzugt Lesen.)"),
    p("3. Wir spielen ______________________ Fußball. (Das ist unser Nr. 1 Hobby.)"),
    p("4. Sie zeichnet ______________________. (Sie mag es ein bisschen.)"),
    p("5. Am Wochenende koche ich ______________________. (Das macht mir am meisten Spaß.)"),
    empty(),
    pBold("Teil 2: Wie oft? Setze das passende Häufigkeitsadverb ein."),
    empty(),
    p("1. Lea übt jeden Tag Klavier. Sie übt ______________________."),
    p("2. Tom geht zweimal im Jahr ins Theater. Er geht ______________________ ins Theater."),
    p("3. Felix fotografiert ein- oder zweimal pro Woche. Er fotografiert ______________________."),
    p("4. Mia backt nur an Weihnachten. Sie backt ______________________."),
    p("5. Jonas spielt überhaupt kein Schach. Er spielt ______________________ Schach."),
    empty(),
    pBold("Teil 3: Ergänze den Dialog."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Jana"), dCell("Was machst du in deiner ______________________?")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Mein ______________________ ist Fotografieren. Ich fotografiere ______________________ in der Natur.")] }),
        new TableRow({ children: [dCell("Jana"), dCell("Oh, toll! Ich ______________________ lieber als Sportarten.")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Und was machst du ______________________ am liebsten?")] }),
        new TableRow({ children: [dCell("Jana"), dCell("Am ______________________ tanze ich. Ich tanze jeden Dienstag.")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Ich tanze ______________________. Das ist nicht mein Ding!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Hobbys (LÖSUNG)"), empty(),
    pBold("Teil 1: gern / lieber / am liebsten"),
    bullet("1. gern"),
    bullet("2. lieber"),
    bullet("3. am liebsten"),
    bullet("4. gern"),
    bullet("5. am liebsten"),
    empty(),
    pBold("Teil 2: Häufigkeitsadverbien"),
    bullet("1. immer"),
    bullet("2. selten"),
    bullet("3. oft / manchmal"),
    bullet("4. selten"),
    bullet("5. nie"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Jana: ... in deiner Freizeit?"),
    bullet("Leo: Mein Hobby ist Fotografieren. Ich fotografiere oft / manchmal in der Natur."),
    bullet("Jana: Ich malen / lesen / basteln lieber als Sportarten. (passendes Verb)"),
    bullet("Leo: ... was machst du am liebsten?"),
    bullet("Jana: Am liebsten tanze ich."),
    bullet("Leo: Ich tanze nie / selten."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Hobbys und Freizeit"), empty(),
    makeWortTable(),
    empty(),
    pBold("Grammatik-Hinweise: gern – lieber – am liebsten"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Stufe", { width: 2500 }), hCell("Bedeutung", { width: 2500 }), hCell("Beispiel", { width: 4500 })] }),
        new TableRow({ children: [dCell("gern"), dCell("mag es"), dCell("Ich lese gern.")] }),
        new TableRow({ children: [dCell("lieber"), dCell("mehr als etwas anderes"), dCell("Ich lese lieber als fernsehen.")] }),
        new TableRow({ children: [dCell("am liebsten"), dCell("am meisten von allem"), dCell("Am liebsten lese ich Abenteuer.")] }),
      ],
    }),
    empty(),
    pBold("Grammatik-Hinweise: Häufigkeitsadverbien"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Adverb", { width: 2500 }), hCell("Bedeutung", { width: 2500 }), hCell("Beispiel", { width: 4500 })] }),
        new TableRow({ children: [dCell("immer"), dCell("100% – jedes Mal"), dCell("Ich lese immer vor dem Schlafen.")] }),
        new TableRow({ children: [dCell("oft"), dCell("ca. 70–80%"), dCell("Wir spielen oft Fußball.")] }),
        new TableRow({ children: [dCell("manchmal"), dCell("ca. 30–50%"), dCell("Ich backe manchmal Kuchen.")] }),
        new TableRow({ children: [dCell("selten"), dCell("ca. 10–20%"), dCell("Er fotografiert selten.")] }),
        new TableRow({ children: [dCell("nie"), dCell("0% – kein einziges Mal"), dCell("Ich tanze nie.")] }),
      ],
    }),
    empty(),
    pBold("Stellung im Satz:"),
    bullet("Häufigkeitsadverbien stehen nach dem Verb (bzw. nach dem Modalverb): Ich spiele oft Fußball."),
    bullet("gern / lieber / am liebsten stehen direkt nach dem Verb oder am Satzende: Ich lese gern."),
    empty(),
    h2("Übersetzung in deine Sprache"),
    bullet("die Freizeit = ______________________"),
    bullet("malen = ______________________"),
    bullet("zeichnen = ______________________"),
    bullet("basteln = ______________________"),
    bullet("sammeln = ______________________"),
    bullet("fotografieren = ______________________"),
    bullet("gern = ______________________"),
    bullet("lieber = ______________________"),
    bullet("am liebsten = ______________________"),
    bullet("immer = ______________________"),
    bullet("manchmal = ______________________"),
    bullet("selten = ______________________"),
    bullet("nie = ______________________"),
    empty(),
    pItalic("Tipp: Schreib auf jede Lernkarte das Adverb, die Bedeutung und einen eigenen Beispielsatz!"),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Hobbys und Freizeit (LÖSUNG)"), empty(),
    makeWortTable(),
    empty(),
    pBold("Wichtigste Strukturen für die Lehrkraft:"),
    bullet("gern / lieber / am liebsten = Steigerung der Vorliebe (Positiv / Komparativ / Superlativ von gern)."),
    bullet("Häufigkeitsadverbien stehen im Mittelfeld: nach konjugiertem Verb, vor Vollverb-Infinitiv."),
    bullet("Komparativ lieber immer mit als: Ich lese lieber ALS fernsehen."),
    bullet("Am liebsten kann auch am Satzanfang stehen (Betonung): Am liebsten tanze ich."),
    bullet("\"gern\" ersetzt bei Aktivitäten oft \"mögen\": Ich lese gern = Ich mag Lesen."),
    empty(),
    pItalic("Übersetzungen sind individuell. Lehrkraft prüft, ob das Schüler-Wort die richtige Bedeutungsnuance hat."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Über Hobbys sprechen"), empty(),
    pBold("Dialog 1: Neue Bekanntschaft"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Yuki"), dCell("Hallo! Ich bin Yuki. Was machst du gern in der Freizeit?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Hi! Ich heiße Max. Ich fotografiere gern. Und du?")] }),
        new TableRow({ children: [dCell("Yuki"), dCell("Ich tanze am liebsten. Ich gehe zweimal pro Woche zur Tanzschule.")] }),
        new TableRow({ children: [dCell("Max"), dCell("Wow! Was tanzt du?")] }),
        new TableRow({ children: [dCell("Yuki"), dCell("Ich tanze Hip-Hop, aber ich mag auch Breakdance. Was fotografierst du am liebsten?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Am liebsten fotografiere ich Tiere. Ich gehe oft in den Wald.")] }),
        new TableRow({ children: [dCell("Yuki"), dCell("Macht dir das nie Angst?")] }),
        new TableRow({ children: [dCell("Max"), dCell("Nein, nie! Ich liebe die Natur. Ich gehe lieber in den Wald als ins Kino.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ergänze die Lücken und übe mit deinem Partner / deiner Partnerin."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Was machst du ______________________ in der Freizeit?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich ______________________ sehr gern.")] }),
        new TableRow({ children: [dCell("A"), dCell("Wie oft machst du das?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich mache das ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Was magst du lieber: ______________________ oder ______________________?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich mag ______________________ lieber als ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Und was ist dein absolutes Lieblingshobby?")] }),
        new TableRow({ children: [dCell("B"), dCell("Am liebsten ______________________.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Schreib die Antworten deines Partners / deiner Partnerin auf."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingshobby?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie oft machst du es?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du lieber: ... oder ...?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du nie in der Freizeit?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du am liebsten am Wochenende?"), dCell("")] }),
        new TableRow({ children: [dCell("Was möchtest du noch lernen?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Hobbys raten"),
    bullet("Eine Person macht eine Bewegung (z. B. Fußball schießen, malen, tanzen)."),
    bullet("Die Klasse rät: \"Du spielst Fußball!\" – \"Du malst gern!\""),
    bullet("Die Person antwortet: \"Ja, ich spiele gern Fußball.\" oder \"Nein, ich ...\""),
    bullet("Wer richtig geraten hat, macht die nächste Bewegung."),
    bullet("Schwieriger: auch Häufigkeit pantomimisch zeigen (einmal / oft / immer)."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Über Hobbys sprechen (LÖSUNG)"), empty(),
    pBold("Dialog 1: Schlüsselstrukturen"),
    bullet("Was machst du gern in der Freizeit? – Standarderöffnung für Hobby-Gespräch."),
    bullet("Ich ... gern / am liebsten + Verb-Tätigkeit."),
    bullet("Ich gehe lieber in den Wald als ins Kino. – Vergleich mit lieber ... als."),
    bullet("Am liebsten + Verb (Inversion) – Verb auf Pos. 2: Am liebsten fotografiere ich Tiere."),
    bullet("Wie oft? – Zweimal pro Woche / jeden Dienstag / oft / manchmal ..."),
    empty(),
    pBold("Dialog 2: Beispielausfüllung"),
    bullet("Was machst du gern in der Freizeit?"),
    bullet("Ich fotografiere / tanze / zeichne sehr gern."),
    bullet("Ich mache das oft / manchmal / immer am Wochenende."),
    bullet("Was magst du lieber: malen oder lesen?"),
    bullet("Ich mag malen lieber als lesen."),
    bullet("Am liebsten fotografiere ich / tanze ich / ..."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Verwendung von gern / lieber / am liebsten (mind. je einmal)."),
    bullet("Mind. ein Häufigkeitsadverb korrekt eingesetzt."),
    bullet("Vergleich mit lieber ... als vollständig."),
    bullet("Antworten in ganzen Sätzen."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Hobbys"), empty(),
    pBold("Aufgabe 1: Was ist das Hobby? Schreib unter jedes Bild das Hobby und einen Satz."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD 1: Kind malt ein Bild an der Staffelei]", { width: 4750 }), hCell("[BILD 2: Kind tanzt auf einer Bühne]", { width: 4750 })] }),
        new TableRow({ children: [dCell("Hobby: ____________________"), dCell("Hobby: ____________________")] }),
        new TableRow({ children: [dCell("Satz: ____________________"), dCell("Satz: ____________________")] }),
        new TableRow({ children: [hCell("[BILD 3: Kind fotografiert mit einer Kamera in der Natur]", { width: 4750 }), hCell("[BILD 4: Kind liest ein Buch auf dem Sofa]", { width: 4750 })] }),
        new TableRow({ children: [dCell("Hobby: ____________________"), dCell("Hobby: ____________________")] }),
        new TableRow({ children: [dCell("Satz: ____________________"), dCell("Satz: ____________________")] }),
        new TableRow({ children: [hCell("[BILD 5: Kind bastelt mit Papier und Schere]", { width: 4750 }), hCell("[BILD 6: Kind sammelt Briefmarken im Album]", { width: 4750 })] }),
        new TableRow({ children: [dCell("Hobby: ____________________"), dCell("Hobby: ____________________")] }),
        new TableRow({ children: [dCell("Satz: ____________________"), dCell("Satz: ____________________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Wie oft macht die Person das? Schreib ein passendes Häufigkeitsadverb in die Sprechblase."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Sprechblase", { width: 4750 })] }),
        new TableRow({ children: [dCell("[BILD: Kind am Fußballplatz, Kalender zeigt 5x pro Woche]"), dCell("Ich spiele ____________________ Fußball.")] }),
        new TableRow({ children: [dCell("[BILD: Kind isst Kuchen, Kalender zeigt 1x im Jahr]"), dCell("Ich backe ____________________.")] }),
        new TableRow({ children: [dCell("[BILD: Kind liest, jeden Abend eine Lampe an]"), dCell("Ich lese ____________________ vor dem Schlafen.")] }),
        new TableRow({ children: [dCell("[BILD: Kind winkt ab beim Tanzen – es mag es nicht]"), dCell("Ich tanze ____________________.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Mein Hobby-Podium"),
    p("[BILD: Siegertreppchen (1. / 2. / 3. Platz) mit leeren Feldern zum Beschriften]"),
    p("Schreib deine Top-3-Hobbys auf das Podium:"),
    bullet("1. Platz (am liebsten): ______________________"),
    bullet("2. Platz (lieber): ______________________"),
    bullet("3. Platz (gern): ______________________"),
    empty(),
    p("Schreib dazu drei Sätze:"),
    writeLine(60), empty(),
    writeLine(60), empty(),
    writeLine(60), empty(),
    pBold("Aufgabe 4: Was passt zusammen? Verbinde Bild und Häufigkeitsadverb mit einer Linie."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild / Situation", { width: 5500 }), hCell("Häufigkeitsadverb", { width: 4000 })] }),
        new TableRow({ children: [dCell("[BILD: Kalender – alle 365 Tage markiert]"), dCell("manchmal")] }),
        new TableRow({ children: [dCell("[BILD: Kalender – kein einziger Tag markiert]"), dCell("immer")] }),
        new TableRow({ children: [dCell("[BILD: Kalender – etwa 3 Tage pro Monat markiert]"), dCell("selten")] }),
        new TableRow({ children: [dCell("[BILD: Kalender – 2–3 Tage pro Woche markiert]"), dCell("nie")] }),
        new TableRow({ children: [dCell("[BILD: Kalender – nur einmal im Jahr markiert]"), dCell("oft")] }),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Hobbys (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Hobbys und Sätze – Musterlösung"),
    bullet("Bild 1: malen – Sie malt gern. / Das Kind malt am liebsten Tiere."),
    bullet("Bild 2: tanzen – Er tanzt oft auf der Bühne."),
    bullet("Bild 3: fotografieren – Sie fotografiert gern in der Natur."),
    bullet("Bild 4: lesen – Er liest am liebsten auf dem Sofa."),
    bullet("Bild 5: basteln – Das Kind bastelt manchmal mit Papier."),
    bullet("Bild 6: sammeln – Sie sammelt gern Briefmarken."),
    empty(),
    pBold("Aufgabe 2: Sprechblasen"),
    bullet("5x pro Woche: oft / immer (beides möglich)"),
    bullet("1x im Jahr: selten"),
    bullet("Jeden Abend: immer"),
    bullet("Mag es nicht: nie"),
    empty(),
    pBold("Aufgabe 3: Hobby-Podium – individuelle Antworten"),
    pItalic("Musterlösung: Am liebsten tanze ich. Ich male lieber als basteln. Ich lese auch gern."),
    empty(),
    pBold("Aufgabe 4: Bild – Häufigkeitsadverb"),
    bullet("Alle 365 Tage → immer"),
    bullet("Kein einziger Tag → nie"),
    bullet("Ca. 3 Tage pro Monat → manchmal"),
    bullet("2–3 Tage pro Woche → oft"),
    bullet("Einmal im Jahr → selten"),
    empty(),
    pBold("Hinweis Lehrkraft:"),
    bullet("Antworten hängen vom eingefügten Bildmaterial ab."),
    bullet("Korrekte Satzstellung bei gern / lieber / am liebsten prüfen."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Detaillierter ueber Hobbys sprechen (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
