"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "02_SchuleLernen", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_SchuleLernen_ABSCHLUSS";
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

// ── ABSCHLUSS ────────────────────────────────────────────────────────────────
function abschluss() {
  save(`${TOPIC}.docx`, [
    studentHead(), empty(),
    h1("Abschluss – Schule & Lernen (A2 Kinder)"), empty(),
    pItalic("Diese Abschlussübung kombiniert alles aus den vier Unterpunkten: Schulalltag, Lieblingsfach und beste Freunde, Meinungen zu Schulfächern, Hausaufgaben und Prüfungen."),
    empty(),

    // ── Aufgabe 1: Lesetext (deckt UP 01 + UP 02 ab) ─────────────────────────
    h2("Aufgabe 1: Lesen – Mein Schulalltag"),
    pBold("Lies den Text und beantworte die Fragen."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Ich heiße Nora und ich bin 11 Jahre alt. Ich gehe in die 5. Klasse. Mein Schulalltag beginnt um 7 Uhr. Ich frühstücke schnell, dann fahre ich mit dem Bus in die Schule."),
          p("In der Schule habe ich jeden Tag sechs Stunden Unterricht. Mein Lieblingsfach ist Englisch, weil unsere Lehrerin Frau Becker sehr nett ist. Sie macht den Unterricht spannend."),
          p("Meine beste Freundin heißt Mira. Sie sitzt immer neben mir. In der Pause spielen wir zusammen. Wir essen oft ein Brot und reden über die Hausaufgaben."),
          p("Mathe finde ich schwer. Ich muss zu Hause viel üben. Aber Sport ist toll – am Mittwoch spielen wir Basketball. Das macht mir Spaß!"),
          p("Nach der Schule mache ich meine Hausaufgaben. Ich brauche etwa eine Stunde. Wenn ich eine Prüfung habe, lerne ich auch am Wochenende."),
        ],
      })]})],
    }),
    empty(),
    pBold("Beantworte die Fragen in ganzen Sätzen."),
    p("1. Wie alt ist Nora und in welche Klasse geht sie?"),
    writeLine(60), empty(),
    p("2. Wie kommt sie zur Schule?"),
    writeLine(60), empty(),
    p("3. Warum mag sie Englisch?"),
    writeLine(60), empty(),
    p("4. Wer ist Noras beste Freundin und was machen sie in der Pause?"),
    writeLine(60), empty(),
    p("5. Wann lernt Nora am Wochenende?"),
    writeLine(60), empty(),

    // ── Aufgabe 2: Lückentext mit Modalverben (deckt UP 04 ab) ───────────────
    h2("Aufgabe 2: Lückentext – Modalverben"),
    pBold("Setze die richtige Form von muss / soll / kann ein."), empty(),
    p("1. Ich ______________________ jeden Tag eine Stunde Hausaufgaben machen."),
    p("2. ______________________ du mir bei den Mathe-Aufgaben helfen?"),
    p("3. Wir ______________________ den Text bis Freitag lesen, sagt die Lehrerin."),
    p("4. Mein Bruder ______________________ schon ein bisschen Englisch sprechen."),
    p("5. Vor einer Prüfung ______________________ ich immer früh ins Bett."),
    p("6. Die Kinder ______________________ in der Schule leise sein."),
    empty(),

    // ── Aufgabe 3: Schreiben + Meinungen (deckt UP 03 ab) ────────────────────
    h2("Aufgabe 3: Schreiben – Meine Meinung zu Schulfächern"),
    pBold("Schreib zu jedem Fach einen Satz mit \"Ich finde + Schulfach + Adjektiv\"."),
    pItalic("Adjektive: toll – super – langweilig – anstrengend – leicht – schwer – interessant – lustig"),
    empty(),
    p("1. Mathe: ______________________________________________________________"),
    writeLine(60), empty(),
    p("2. Sport: ______________________________________________________________"),
    writeLine(60), empty(),
    p("3. Deutsch: ____________________________________________________________"),
    writeLine(60), empty(),
    p("4. Kunst: ______________________________________________________________"),
    writeLine(60), empty(),
    p("5. Englisch: ___________________________________________________________"),
    writeLine(60), empty(),

    // ── Aufgabe 4: Konversation (deckt UP 02 + UP 04 ab) ─────────────────────
    h2("Aufgabe 4: Konversation – Über Schule sprechen"),
    pBold("Übe diesen Dialog mit deinem Partner / deiner Partnerin und ergänze die Lücken."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Was ist dein Lieblingsfach?")] }),
        new TableRow({ children: [dCell("B"), dCell("Mein Lieblingsfach ist ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Warum?")] }),
        new TableRow({ children: [dCell("B"), dCell("Weil ich es ______________________ finde.")] }),
        new TableRow({ children: [dCell("A"), dCell("Hast du heute Hausaufgaben?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja, ich muss ______________________ machen.")] }),
        new TableRow({ children: [dCell("A"), dCell("Schreibst du diese Woche eine Prüfung?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja, in ______________________. Ich muss noch ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Wer ist deine beste Freundin / dein bester Freund?")] }),
        new TableRow({ children: [dCell("B"), dCell("Das ist ______________________. Wir ______________________ in der Pause.")] }),
      ],
    }),
    empty(),
    pItalic("Tausch dann die Rollen!"),
    empty(),

    // ── Aufgabe 5: Schreiben – kleiner Text (deckt UP 01 + 02 + 04 ab) ───────
    h2("Aufgabe 5: Mein Schultag – schreib einen kurzen Text"),
    pBold("Schreib 6–8 Sätze. Beantworte diese Fragen:"),
    bullet("Wann beginnt deine Schule und wie kommst du dorthin?"),
    bullet("Was ist dein Lieblingsfach? Warum?"),
    bullet("Wer ist deine beste Freundin / dein bester Freund?"),
    bullet("Was musst du nach der Schule machen?"),
    bullet("Was kannst du schon gut in der Schule?"),
    empty(),
    ...writeLines(8, 60),

    // ── Aufgabe 6: Wortschatz-Mix ────────────────────────────────────────────
    h2("Aufgabe 6: Wortschatz – Was passt nicht?"),
    pBold("In jeder Reihe passt EIN Wort nicht. Streiche es durch."),
    empty(),
    p("1. Mathe – Deutsch – Kuchen – Englisch – Sport"),
    p("2. lernen – üben – schwimmen – schreiben – lesen"),
    p("3. langweilig – anstrengend – schwer – schnell – interessant"),
    p("4. Pause – Hausaufgaben – Prüfung – Kino – Note"),
    p("5. Lehrer – Schüler – Pirat – Klasse – Schule"),
    empty(),

    // ── Selbstevaluation ─────────────────────────────────────────────────────
    h2("Das kann ich jetzt!"),
    pBold("Kreuze an: Wie gut kannst du das schon?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 5500 }), hCell("☺ gut", { width: 1400 }), hCell("☐ okay", { width: 1300 }), hCell("☹ noch nicht", { width: 1300 })] }),
        new TableRow({ children: [dCell("... meinen Schulalltag beschreiben."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... über mein Lieblingsfach sprechen."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... über meine beste Freundin / meinen besten Freund erzählen."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... \"finden + Adjektiv\" verwenden (Ich finde Mathe schwer)."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... meine Meinung sagen (Meine Meinung ist ...)."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... über Hausaufgaben und Prüfungen sprechen."), dCell("☐"), dCell("☐"), dCell("☐")] }),
        new TableRow({ children: [dCell("... muss / soll / kann richtig verwenden."), dCell("☐"), dCell("☐"), dCell("☐")] }),
      ],
    }),
    empty(),
    pBold("Was möchtest du noch üben?"),
    writeLine(60), empty(),
    writeLine(60),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschluss – Schule & Lernen (LÖSUNG)"), empty(),

    h2("Aufgabe 1: Lesen"),
    bullet("1. Sie ist 11 Jahre alt und geht in die 5. Klasse."),
    bullet("2. Sie fährt mit dem Bus zur Schule."),
    bullet("3. Weil ihre Lehrerin Frau Becker sehr nett ist und den Unterricht spannend macht."),
    bullet("4. Ihre beste Freundin heißt Mira. In der Pause spielen sie zusammen, essen ein Brot und reden über die Hausaufgaben."),
    bullet("5. Wenn sie eine Prüfung hat."),
    empty(),

    h2("Aufgabe 2: Modalverben"),
    bullet("1. muss"),
    bullet("2. Kannst"),
    bullet("3. sollen"),
    bullet("4. kann"),
    bullet("5. muss"),
    bullet("6. müssen / sollen (beides möglich)"),
    empty(),

    h2("Aufgabe 3: Meinungen zu Schulfächern"),
    pBold("Individuelle Antworten – Bewertungskriterien:"),
    bullet("Korrekte Struktur: Ich finde + Schulfach (ohne Artikel) + Adjektiv (endungslos)."),
    bullet("Beispiel-Lösungen:"),
    bullet("\"Ich finde Mathe schwer.\""),
    bullet("\"Ich finde Sport toll / super.\""),
    bullet("\"Ich finde Deutsch interessant.\""),
    bullet("\"Ich finde Kunst lustig / langweilig.\""),
    bullet("\"Ich finde Englisch leicht / schwer.\""),
    empty(),

    h2("Aufgabe 4: Konversation – Beispielausfüllung"),
    bullet("Mein Lieblingsfach ist Sport."),
    bullet("Weil ich es toll / spannend / lustig finde."),
    bullet("Ich muss Mathe-Hausaufgaben / Vokabeln / einen Text machen."),
    bullet("In Englisch / Mathe. Ich muss noch Vokabeln üben / Aufgaben rechnen."),
    bullet("Das ist Mira / Tom. Wir spielen / reden / essen in der Pause."),
    empty(),
    pBold("Bewertungskriterien Konversation:"),
    bullet("Vollständige Sätze, nicht nur Stichworte."),
    bullet("Richtige Modalverb-Stellung (Pos. 2 + Infinitiv am Ende)."),
    bullet("\"finden + Adjektiv\" korrekt verwendet."),
    empty(),

    h2("Aufgabe 5: Mein Schultag"),
    pBold("Individuelle Antwort. Bewertungskriterien:"),
    bullet("Mind. 6 Sätze, deckt mind. 4 der 5 Leitfragen ab."),
    bullet("Verwendung von muss / soll / kann (mind. 2 verschiedene Modalverben)."),
    bullet("Mind. 1 Satz mit \"finden + Adjektiv\" oder \"Mein Lieblingsfach ist ...\"."),
    bullet("Verständliche, einfache Hauptsätze – kleine Fehler bei Komma / Wortstellung sind okay."),
    bullet("Wortschatz aus dem Themenbereich Schule/Lernen."),
    empty(),
    pItalic("Beispiel: \"Meine Schule beginnt um 8 Uhr. Ich fahre mit dem Fahrrad. Mein Lieblingsfach ist Sport, weil wir Fußball spielen. Meine beste Freundin heißt Lina. Nach der Schule muss ich Hausaufgaben machen. Ich kann schon gut Englisch sprechen.\""),
    empty(),

    h2("Aufgabe 6: Wortschatz – Was passt nicht?"),
    bullet("1. Kuchen (kein Schulfach)"),
    bullet("2. schwimmen (kein Lern-Verb)"),
    bullet("3. schnell (kein Bewertungs-Adjektiv für Schulfächer im Bewertungs-Sinn)"),
    bullet("4. Kino (gehört nicht zur Schule)"),
    bullet("5. Pirat (gehört nicht zur Schule)"),
    empty(),

    h2("Selbstevaluation"),
    pItalic("Kreuze sind individuell – die Lehrkraft nutzt die Tabelle für ein kurzes Feedbackgespräch."),
    pItalic("Bei \"noch nicht\"-Punkten gezielt auf den entsprechenden Unterpunkt zurückgehen (UP 01–04)."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle ABSCHLUSS: Thema 02 SchuleLernen (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
abschluss(); abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
