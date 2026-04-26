"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "02_SchuleLernen", "04_HausaufgabenPruefungen");
const TOPIC     = "A2_Kinder_SchuleLernen_04_HausaufgabenPruefungen";
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
      new TableRow({ children: [hCell("Wort/Phrase", { width: 3000 }), hCell("Wortart", { width: 2000 }), hCell("Beispielsatz", { width: 4500 })] }),
      new TableRow({ children: [dCell("die Hausaufgabe, -n"), dCell("Nomen (f)"), dCell("Ich habe heute viele Hausaufgaben.")] }),
      new TableRow({ children: [dCell("die Prüfung, -en"), dCell("Nomen (f)"), dCell("Morgen schreiben wir eine Prüfung.")] }),
      new TableRow({ children: [dCell("der Test, -s"), dCell("Nomen (m)"), dCell("Der Test war leicht.")] }),
      new TableRow({ children: [dCell("die Note, -n"), dCell("Nomen (f)"), dCell("Ich habe eine gute Note bekommen.")] }),
      new TableRow({ children: [dCell("Hausaufgaben machen"), dCell("Verb-Phrase"), dCell("Ich mache jeden Tag Hausaufgaben.")] }),
      new TableRow({ children: [dCell("eine Prüfung schreiben"), dCell("Verb-Phrase"), dCell("Wir schreiben am Montag eine Prüfung.")] }),
      new TableRow({ children: [dCell("lernen"), dCell("Verb"), dCell("Ich lerne für die Mathe-Prüfung.")] }),
      new TableRow({ children: [dCell("üben"), dCell("Verb"), dCell("Ich übe Vokabeln mit Karten.")] }),
      new TableRow({ children: [dCell("vergessen"), dCell("Verb (unreg.)"), dCell("Ich habe meine Hausaufgaben vergessen!")] }),
      new TableRow({ children: [dCell("eine Note bekommen"), dCell("Verb-Phrase"), dCell("Sie bekommt immer gute Noten.")] }),
      new TableRow({ children: [dCell("bestehen"), dCell("Verb (unreg.)"), dCell("Ich habe die Prüfung bestanden!")] }),
      new TableRow({ children: [dCell("durchfallen"), dCell("Verb (unreg.)"), dCell("Lukas ist im Test durchgefallen.")] }),
      new TableRow({ children: [dCell("müssen"), dCell("Modalverb"), dCell("Ich muss noch Mathe lernen.")] }),
      new TableRow({ children: [dCell("sollen"), dCell("Modalverb"), dCell("Wir sollen die Aufgaben bis Freitag machen.")] }),
      new TableRow({ children: [dCell("können"), dCell("Modalverb"), dCell("Ich kann das Wort schreiben.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Hausaufgaben und Prüfungen"), empty(),
    pBold("Aufgabe 1: Setze das richtige Modalverb ein (müssen / sollen / können)."),
    empty(),
    p("1. Ich ______________________ heute meine Mathe-Hausaufgaben machen."),
    empty(),
    p("2. Wir ______________________ den Text bis Freitag lesen, hat die Lehrerin gesagt."),
    empty(),
    p("3. ______________________ du mir bei den Vokabeln helfen?"),
    empty(),
    p("4. Lina ______________________ jeden Tag eine Stunde üben."),
    empty(),
    p("5. Ich ______________________ schon ein bisschen Englisch sprechen."),
    empty(),
    p("6. Ihr ______________________ in der Prüfung leise sein."),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib die Sätze ab und ergänze sie sinnvoll."),
    empty(),
    p("1. Vor einer Prüfung muss ich ______________________________________________."),
    writeLine(60), empty(),
    p("2. Wenn ich eine schlechte Note bekomme, ______________________________________________."),
    writeLine(60), empty(),
    p("3. Mein Lehrer / meine Lehrerin sagt, ich soll ______________________________________________."),
    writeLine(60), empty(),
    p("4. Ich kann gut ______________________, aber ich kann nicht so gut ______________________."),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Schreib einen kurzen Text (5–6 Sätze): \"Mein Tag mit Hausaufgaben\"."),
    p("Verwende: müssen, sollen, können – Hausaufgaben machen, lernen, üben, eine Prüfung schreiben."),
    empty(),
    ...writeLines(7, 60),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Hausaufgaben und Prüfungen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Modalverben"),
    bullet("1. muss"),
    bullet("2. sollen (Auftrag der Lehrerin)"),
    bullet("3. Kannst (Bitte / Fähigkeit)"),
    bullet("4. muss / soll (beides möglich)"),
    bullet("5. kann"),
    bullet("6. müsst / sollt"),
    empty(),
    pItalic("Erklärung: müssen = Pflicht / Notwendigkeit, sollen = Auftrag von außen, können = Fähigkeit / Möglichkeit / Bitte."),
    empty(),
    pBold("Aufgabe 2: Musterlösungen"),
    bullet("1. ... viel lernen / die Vokabeln üben / mein Heft holen."),
    bullet("2. ... bin ich traurig / lerne ich mehr / muss ich es zu Hause sagen."),
    bullet("3. ... mehr lesen / leiser sein / pünktlich kommen."),
    bullet("4. ... rechnen, aber ich kann nicht so gut malen. (Beispiel)"),
    empty(),
    pBold("Aufgabe 3: Individuelle Antwort. Bewertung:"),
    bullet("Mind. 2 verschiedene Modalverben verwendet (müssen, sollen, können)."),
    bullet("Wortschatz aus dem Bereich Hausaufgaben / Prüfung."),
    bullet("Mind. 5 Sätze, einfache Hauptsätze."),
    bullet("Modalverb auf Position 2, Vollverb am Satzende (Infinitiv)."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Eine schwierige Woche"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Tarek hat diese Woche viel Stress. Am Montag muss er ein Referat über Tiere halten. Am Mittwoch schreibt seine Klasse eine Mathe-Prüfung. Am Freitag gibt es einen Englisch-Test."),
          p("Am Sonntag sitzt Tarek in seinem Zimmer und lernt. Er muss Vokabeln üben. Er soll auch das Mathe-Buch lesen. Aber Tarek ist müde."),
          p("Sein großer Bruder Karim sagt: \"Du kannst nicht alles auf einmal lernen. Mach einen Plan!\" Tarek macht einen Lernplan: Sonntag Englisch, Montag Mathe."),
          p("Am Mittwoch schreibt Tarek die Mathe-Prüfung. Es ist nicht leicht, aber er bekommt eine gute Note: eine Zwei! Am Freitag ist auch der Englisch-Test okay – eine Drei."),
          p("Tarek ist froh: Er hat alle Prüfungen bestanden. Aber das Referat über Tiere – das hat er fast vergessen!"),
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
        new TableRow({ children: [dCell("Tarek schreibt am Mittwoch eine Mathe-Prüfung."), dCell("")] }),
        new TableRow({ children: [dCell("Sein Bruder Karim hilft ihm mit einem Plan."), dCell("")] }),
        new TableRow({ children: [dCell("In Mathe bekommt Tarek eine Sechs."), dCell("")] }),
        new TableRow({ children: [dCell("Tarek ist im Englisch-Test durchgefallen."), dCell("")] }),
        new TableRow({ children: [dCell("Tarek hat das Referat fast vergessen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("1. Was muss Tarek am Montag machen?"),
    writeLine(60), empty(),
    p("2. Wer hilft Tarek mit einem Lernplan?"),
    writeLine(60), empty(),
    p("3. Welche Note bekommt Tarek in Mathe?"),
    writeLine(60), empty(),
    p("4. Warum ist Tarek am Ende froh?"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Suche im Text! Schreib 4 Verben aus dem Bereich \"Schule und Lernen\"."),
    p("____________________ – ____________________ – ____________________ – ____________________"),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Eine schwierige Woche (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Tarek schreibt am Mittwoch eine Mathe-Prüfung."), dCell("R")] }),
        new TableRow({ children: [dCell("Sein Bruder Karim hilft ihm mit einem Plan."), dCell("R")] }),
        new TableRow({ children: [dCell("In Mathe bekommt Tarek eine Sechs."), dCell("F (eine Zwei)")] }),
        new TableRow({ children: [dCell("Tarek ist im Englisch-Test durchgefallen."), dCell("F (er bekommt eine Drei)")] }),
        new TableRow({ children: [dCell("Tarek hat das Referat fast vergessen."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Er muss ein Referat über Tiere halten."),
    bullet("2. Sein großer Bruder Karim hilft ihm."),
    bullet("3. Er bekommt eine Zwei (gute Note)."),
    bullet("4. Er hat alle Prüfungen bestanden."),
    empty(),
    pBold("Aufgabe 3: Verben aus dem Text (Auswahl)"),
    p("lernen – üben – schreiben – bestehen – bekommen – lesen – machen – vergessen"),
    pItalic("Vier beliebige passende Verben akzeptieren."),
  ]);
}

// ── LÜCKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Hausaufgaben und Prüfungen"), empty(),
    pBold("Wörterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("muss – musst – muss – sollen – kann – kannst – Hausaufgaben – Prüfung – Note – lernen – üben – vergessen – bestanden – durchgefallen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Setze das richtige Modalverb ein."),
    empty(),
    p("1. Ich ______________________ am Wochenende lernen."),
    p("2. ______________________ du mir bei den Hausaufgaben helfen?"),
    p("3. Mein Bruder ______________________ schon Englisch sprechen."),
    p("4. Wir ______________________ den Text bis morgen lesen."),
    p("5. Anna ______________________ heute zwei Stunden Mathe üben."),
    empty(),
    pBold("Teil 2: Ergänze mit einem passenden Wort aus dem Kasten."),
    empty(),
    p("1. Heute haben wir viele ______________________ in Deutsch und Englisch."),
    p("2. Morgen schreibe ich eine ______________________ in Mathe."),
    p("3. Ich habe eine gute ______________________ bekommen: eine Eins!"),
    p("4. Vor einer Prüfung muss ich viel ______________________."),
    p("5. Tom hat seine Hausaufgaben zu Hause ______________________ – jetzt ist er traurig."),
    p("6. Tarek hat die Prüfung ______________________. Toll!"),
    p("7. Lukas ist leider ______________________. Er muss die Prüfung wiederholen."),
    empty(),
    pBold("Teil 3: Dialog – Vor der Prüfung"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mama"), dCell("Hast du heute viele ______________________?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Ja! Und morgen schreibe ich eine ______________________ in Englisch.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Du ______________________ jetzt lernen!")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Ich ______________________ die Vokabeln schon. Ich gehe sie noch einmal durch.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Ich hoffe, du bekommst eine gute ______________________.")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Hausaufgaben und Prüfungen (LÖSUNG)"), empty(),
    pBold("Teil 1: Modalverben"),
    bullet("1. muss"),
    bullet("2. Kannst"),
    bullet("3. kann"),
    bullet("4. sollen"),
    bullet("5. muss"),
    empty(),
    pBold("Teil 2:"),
    bullet("1. Hausaufgaben"),
    bullet("2. Prüfung"),
    bullet("3. Note"),
    bullet("4. lernen / üben"),
    bullet("5. vergessen"),
    bullet("6. bestanden"),
    bullet("7. durchgefallen"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Mama: Hast du heute viele Hausaufgaben?"),
    bullet("Kind: ... eine Prüfung in Englisch."),
    bullet("Mama: Du musst jetzt lernen!"),
    bullet("Kind: Ich kann die Vokabeln schon. (oder: übe / lerne)"),
    bullet("Mama: ... eine gute Note."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Hausaufgaben und Prüfungen"), empty(),
    makeWortTable(),
    empty(),
    pBold("Grammatik-Hinweise: Modalverben (Präsens)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("müssen", { width: 2400 }), hCell("sollen", { width: 2400 }), hCell("können", { width: 2500 })] }),
        new TableRow({ children: [dCell("ich"), dCell("muss"), dCell("soll"), dCell("kann")] }),
        new TableRow({ children: [dCell("du"), dCell("musst"), dCell("sollst"), dCell("kannst")] }),
        new TableRow({ children: [dCell("er/sie/es"), dCell("muss"), dCell("soll"), dCell("kann")] }),
        new TableRow({ children: [dCell("wir"), dCell("müssen"), dCell("sollen"), dCell("können")] }),
        new TableRow({ children: [dCell("ihr"), dCell("müsst"), dCell("sollt"), dCell("könnt")] }),
        new TableRow({ children: [dCell("sie/Sie"), dCell("müssen"), dCell("sollen"), dCell("können")] }),
      ],
    }),
    empty(),
    pBold("Wichtigste Regeln:"),
    bullet("Modalverb steht auf Position 2, Vollverb (Infinitiv) am Satzende."),
    bullet("müssen = Pflicht / Notwendigkeit: Ich muss lernen."),
    bullet("sollen = Auftrag von außen: Die Lehrerin sagt, ich soll lesen."),
    bullet("können = Fähigkeit, Möglichkeit, Bitte: Ich kann schwimmen. / Kannst du helfen?"),
    bullet("Bei ich / er / sie / es haben müssen und können KEINE Endung (-e oder -t)."),
    empty(),
    h2("Übersetzung in deine Sprache"),
    bullet("die Hausaufgabe = ______________________"),
    bullet("die Prüfung = ______________________"),
    bullet("die Note = ______________________"),
    bullet("lernen = ______________________"),
    bullet("üben = ______________________"),
    bullet("vergessen = ______________________"),
    bullet("bestehen = ______________________"),
    bullet("durchfallen = ______________________"),
    bullet("müssen = ______________________"),
    bullet("sollen = ______________________"),
    bullet("können = ______________________"),
    empty(),
    pItalic("Tipp: Notiere dir die Modalverben mit Beispielsatz auf Lernkarten – immer ganze Sätze, nie nur das Verb!"),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Hausaufgaben und Prüfungen (LÖSUNG)"), empty(),
    makeWortTable(),
    empty(),
    pBold("Wichtigste Strukturen für die Lehrkraft:"),
    bullet("Modalverb-Konjugation: ich/er/sie/es ohne Endung (muss, soll, kann)."),
    bullet("Wortstellung: Modalverb an Pos. 2, Vollverb-Infinitiv am Satzende."),
    bullet("Bedeutungsunterschied müssen / sollen oft schwer für Lerner – immer mit Beispiel kontrastieren."),
    bullet("\"vergessen\" und \"bestehen\" sind unregelmäßig (Perfekt: hat vergessen, hat bestanden)."),
    bullet("\"durchfallen\" mit sein: Lukas ist durchgefallen (Bewegungsverb-Kategorie)."),
    bullet("Schulnoten in Deutschland: 1 = sehr gut, 2 = gut, 3 = befriedigend, 4 = ausreichend, 5 = mangelhaft, 6 = ungenügend."),
    empty(),
    pItalic("Übersetzungen sind individuell. Lehrkraft prüft Sinn-Treue, nicht Wort-für-Wort-Übersetzung."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Hausaufgaben und Prüfungen"), empty(),
    pBold("Dialog 1: Nach der Schule"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Papa"), dCell("Hallo Sara, wie war die Schule?")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Hallo Papa! Wir haben heute eine Mathe-Prüfung geschrieben.")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Und? Wie war es?")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Es war schwer. Ich glaube, ich bekomme eine Drei oder eine Vier.")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Hast du genug gelernt?")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Ich muss mehr üben. Heute Nachmittag mache ich noch Hausaufgaben.")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Du sollst nicht zu viel auf einmal machen. Mach Pausen!")] }),
        new TableRow({ children: [dCell("Sara"), dCell("Ja, das kann ich machen. Ich übe eine Stunde, dann eine Pause.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Tausch die Rollen und ergänze die Lücken."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Hast du heute Hausaufgaben?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja, in ______________________ und ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Schreibst du diese Woche eine Prüfung?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja, am ______________________ in ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Wie viel musst du lernen?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ich muss ______________________ Stunden ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Kannst du heute mit mir spielen?")] }),
        new TableRow({ children: [dCell("B"), dCell("Heute kann ich nicht, weil ______________________.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Frag deinen Partner / deine Partnerin."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wann machst du normalerweise Hausaufgaben?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie lange brauchst du dafür?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du diese Woche eine Prüfung?"), dCell("")] }),
        new TableRow({ children: [dCell("In welchem Fach lernst du am meisten?"), dCell("")] }),
        new TableRow({ children: [dCell("Wer hilft dir bei den Hausaufgaben?"), dCell("")] }),
        new TableRow({ children: [dCell("Was kannst du schon richtig gut?"), dCell("")] }),
        new TableRow({ children: [dCell("Was musst du noch üben?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Lern-Staffel"),
    bullet("Die Klasse steht im Kreis. Eine Person beginnt: \"Ich muss heute Mathe lernen.\""),
    bullet("Die nächste Person wiederholt und ergänzt: \"Sie muss Mathe lernen, und ich muss Vokabeln üben.\""),
    bullet("Jede neue Person fügt eine Aufgabe hinzu (immer mit müssen / sollen / können)."),
    bullet("Wer einen Fehler macht oder etwas vergisst, scheidet aus."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Hausaufgaben und Prüfungen (LÖSUNG)"), empty(),
    pBold("Dialog 1: Schlüsselstrukturen"),
    bullet("Wir haben eine Prüfung geschrieben. (Perfekt – wird in UP 11.01 vertieft)"),
    bullet("Ich glaube, ich bekomme eine Drei. (Vermutung über Note)"),
    bullet("Ich muss mehr üben. (müssen = Notwendigkeit)"),
    bullet("Du sollst Pausen machen. (sollen = Empfehlung / Auftrag)"),
    bullet("Das kann ich machen. (können = Möglichkeit)"),
    empty(),
    pBold("Dialog 2: Mögliche Lückenfüllung (Beispiel)"),
    bullet("Hausaufgaben in Deutsch und Mathe."),
    bullet("Prüfung am Donnerstag in Englisch."),
    bullet("Ich muss zwei Stunden lernen."),
    bullet("Heute kann ich nicht, weil ich für die Prüfung lerne."),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Korrekte Modalverb-Konjugation (ich muss, du musst, ich kann ...)."),
    bullet("Wortstellung: Modalverb Pos. 2, Infinitiv am Ende."),
    bullet("Sinnvoller Wortschatz: Hausaufgaben, Prüfung, lernen, üben, Note."),
    bullet("Antworten in ganzen Sätzen, nicht nur Stichworten."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Hausaufgaben und Prüfungen"), empty(),
    pBold("Aufgabe 1: Was machen die Kinder? Schreib unter jedes Bild den passenden Satz."),
    p("Vorgaben: Hausaufgaben machen – für eine Prüfung lernen – Vokabeln üben – eine Note bekommen – ein Heft vergessen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD 1: Kind sitzt am Schreibtisch und schreibt im Heft]", { width: 4750 }), hCell("[BILD 2: Kind liest mit Konzentration ein Buch]", { width: 4750 })] }),
        new TableRow({ children: [dCell("____________________________________________"), dCell("____________________________________________")] }),
        new TableRow({ children: [hCell("[BILD 3: Kind hält Karteikarten mit Wörtern]", { width: 4750 }), hCell("[BILD 4: Kind freut sich über ein Zeugnis mit einer 1]", { width: 4750 })] }),
        new TableRow({ children: [dCell("____________________________________________"), dCell("____________________________________________")] }),
        new TableRow({ children: [hCell("[BILD 5: Kind sucht in der Schultasche – das Heft fehlt]", { width: 4750 }), hCell("[BILD 6: Lehrerin gibt Test mit roter Note zurück]", { width: 4750 })] }),
        new TableRow({ children: [dCell("____________________________________________"), dCell("____________________________________________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Was sagen die Personen? Schreib in die Sprechblase mit einem Modalverb."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Sprechblase (mit muss / soll / kann)", { width: 4750 })] }),
        new TableRow({ children: [dCell("[BILD: Mutter zeigt auf Schreibtisch, Kind ist müde]"), dCell("Du ____________________ jetzt deine Hausaufgaben machen!")] }),
        new TableRow({ children: [dCell("[BILD: Kind hebt Hand im Unterricht]"), dCell("Ich ____________________ die Antwort!")] }),
        new TableRow({ children: [dCell("[BILD: Lehrer schreibt Aufgaben an die Tafel]"), dCell("Ihr ____________________ die Aufgaben bis Freitag machen.")] }),
        new TableRow({ children: [dCell("[BILD: Kind fragt einen Mitschüler]"), dCell("____________________ du mir bitte helfen?")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Mein Lernplan"),
    p("[BILD: Wochenkalender Mo–So mit leeren Zeilen für Lernzeiten]"),
    p("Trag in den Plan ein, was du wann lernen / üben / machen musst:"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Tag", { width: 1900 }), hCell("Was muss ich machen?", { width: 5000 }), hCell("Wie lange?", { width: 2600 })] }),
        new TableRow({ children: [dCell("Montag"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Dienstag"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Mittwoch"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Donnerstag"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Freitag"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Samstag"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Sonntag"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Schreib 3 Sätze über deinen Lernplan."),
    p("Verwende: Am Montag muss ich ... – Am Mittwoch kann ich ... – Am Freitag soll ich ..."),
    empty(),
    ...writeLines(4, 60),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Hausaufgaben und Prüfungen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Sätze unter den Bildern"),
    bullet("Bild 1: Das Kind macht Hausaufgaben."),
    bullet("Bild 2: Das Kind lernt für eine Prüfung."),
    bullet("Bild 3: Das Kind übt Vokabeln."),
    bullet("Bild 4: Das Kind bekommt eine gute Note (eine Eins)."),
    bullet("Bild 5: Das Kind hat sein Heft vergessen."),
    bullet("Bild 6: Das Kind / Die Klasse bekommt einen Test mit einer Note zurück."),
    empty(),
    pBold("Aufgabe 2: Sprechblasen mit Modalverb"),
    bullet("Mutter zum Kind: \"Du musst jetzt deine Hausaufgaben machen!\""),
    bullet("Kind hebt Hand: \"Ich kann die Antwort!\""),
    bullet("Lehrer an der Tafel: \"Ihr sollt die Aufgaben bis Freitag machen.\""),
    bullet("Kind fragt Mitschüler: \"Kannst du mir bitte helfen?\""),
    empty(),
    pBold("Aufgabe 3 + 4: Individuelle Antworten – Bewertungshinweise"),
    bullet("Pro Tag mind. eine Aktivität (Hausaufgaben, Prüfung lernen, üben, Pause)."),
    bullet("Sätze enthalten Modalverb + Vollverb-Infinitiv (Am Montag muss ich Mathe lernen)."),
    bullet("Realistische Lernzeiten (15 Min – 2 Std)."),
    empty(),
    pBold("Hinweis Lehrkraft:"),
    bullet("Antworten hängen vom eingefügten Bildmaterial und persönlichen Plan ab."),
    bullet("Korrekte Stellung des Modalverbs (Pos. 2) und des Infinitivs (Satzende) prüfen."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Hausaufgaben und Pruefungen (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
