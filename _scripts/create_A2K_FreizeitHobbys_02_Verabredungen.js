"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "03_FreizeitHobbys", "02_Verabredungen");
const TOPIC     = "A2_Kinder_FreizeitHobbys_02_Verabredungen";
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
      new TableRow({ children: [hCell("Wort/Phrase", { width: 3200 }), hCell("Typ", { width: 1600 }), hCell("Beispielsatz", { width: 4700 })] }),
      new TableRow({ children: [dCell("Hast du Lust zu ...?"), dCell("Einladung"), dCell("Hast du Lust, Fußball zu spielen?")] }),
      new TableRow({ children: [dCell("Wollen wir ...?"), dCell("Vorschlag"), dCell("Wollen wir zusammen ins Kino gehen?")] }),
      new TableRow({ children: [dCell("Komm doch mit!"), dCell("Einladung"), dCell("Ich gehe schwimmen – komm doch mit!")] }),
      new TableRow({ children: [dCell("Ja, gern! / Super! / Klar!"), dCell("Zusage"), dCell("Hast du Lust? – Ja, gern!")] }),
      new TableRow({ children: [dCell("Gute Idee!"), dCell("Zusage"), dCell("Wollen wir Pizza machen? – Gute Idee!")] }),
      new TableRow({ children: [dCell("Tut mir leid, ich kann nicht."), dCell("Absage"), dCell("Tut mir leid, ich muss lernen.")] }),
      new TableRow({ children: [dCell("Leider nicht. / Leider kann ich nicht."), dCell("Absage"), dCell("Leider kann ich am Samstag nicht.")] }),
      new TableRow({ children: [dCell("Vielleicht ein anderes Mal."), dCell("Absage"), dCell("Jetzt nicht, aber vielleicht ein anderes Mal.")] }),
      new TableRow({ children: [dCell("Wann treffen wir uns?"), dCell("Frage"), dCell("Wann treffen wir uns – um 3 Uhr?")] }),
      new TableRow({ children: [dCell("Wo treffen wir uns?"), dCell("Frage"), dCell("Wo treffen wir uns – vor der Schule?")] }),
      new TableRow({ children: [dCell("heute / morgen / übermorgen"), dCell("Temporaladv."), dCell("Hast du heute Lust?")] }),
      new TableRow({ children: [dCell("am Montag / am Wochenende"), dCell("Temporaladv."), dCell("Wollen wir am Samstag spielen?")] }),
      new TableRow({ children: [dCell("um ... Uhr"), dCell("Zeitangabe"), dCell("Wir treffen uns um 15 Uhr.")] }),
      new TableRow({ children: [dCell("wollen (ich will, du willst ...)"), dCell("Modalverb"), dCell("Ich will Fußball spielen. Willst du mitmachen?")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Verabredungen treffen"), empty(),
    pBold("Aufgabe 1: Zusage oder Absage? Schreib eine passende Antwort."),
    pItalic("Zusagen: Ja, gern! / Super! / Klar! / Gute Idee!"),
    pItalic("Absagen: Tut mir leid, ich kann nicht. / Leider nicht. / Vielleicht ein anderes Mal."),
    empty(),
    p("1. \"Hast du Lust, heute Nachmittag Fußball zu spielen?\""),
    writeLine(60), empty(),
    p("2. \"Wollen wir morgen zusammen Kuchen backen?\""),
    writeLine(60), empty(),
    p("3. \"Komm doch am Samstag mit ins Schwimmbad!\""),
    writeLine(60), empty(),
    p("4. \"Hast du Lust zu tanzen?\""),
    writeLine(60), empty(),
    p("5. \"Wollen wir übermorgen ins Kino gehen?\""),
    writeLine(60), empty(), empty(),
    pBold("Aufgabe 2: Schreib eine vollständige Verabredung (Vorschlag + Ort + Uhrzeit)."),
    pItalic("Muster: Hast du Lust, am Samstag Fußball zu spielen? Wir treffen uns um 15 Uhr vor der Schule."),
    empty(),
    p("Verabredung 1: ________________________________________________"),
    writeLine(60), empty(),
    p("Verabredung 2: ________________________________________________"),
    writeLine(60), empty(),
    p("Verabredung 3: ________________________________________________"),
    writeLine(60), empty(), empty(),
    pBold("Aufgabe 3: Schreib einen kurzen Dialog (6–8 Zeilen)."),
    p("Dein Freund / deine Freundin lädt dich zu einer Aktivität ein. Du sagst zuerst ab (mit Begründung), dann schlägst du einen anderen Termin vor."),
    empty(),
    ...writeLines(8, 60),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Verabredungen treffen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Musterlösungen (Zusage oder Absage offen)"),
    bullet("1. Ja, gern! / Super! Wann treffen wir uns?"),
    bullet("2. Gute Idee! Ich liebe Kuchen. / Tut mir leid, ich muss morgen lernen."),
    bullet("3. Klar, ich komme mit! / Leider nicht, ich habe am Samstag keine Zeit."),
    bullet("4. Ja, super! / Nein danke, ich tanze nicht so gern."),
    bullet("5. Ja, gern! Welchen Film wollen wir sehen? / Vielleicht ein anderes Mal – ich bin übermorgen nicht frei."),
    empty(),
    pItalic("Hinweis: Sowohl Zusagen als auch Absagen akzeptieren, solange sie grammatikalisch korrekt sind."),
    empty(),
    pBold("Aufgabe 2: Kriterien für eine vollständige Verabredung:"),
    bullet("Vorschlag: Hast du Lust, ... zu ...? / Wollen wir ... ?"),
    bullet("Zeitangabe: am Samstag / morgen / um 15 Uhr."),
    bullet("Ortsangabe: vor der Schule / im Park / bei mir zu Hause."),
    empty(),
    pBold("Aufgabe 3: Individuelle Antwort. Bewertungskriterien:"),
    bullet("Einladung mit Hast du Lust, ... zu ...? oder Wollen wir ...?"),
    bullet("Absage mit Begründung: Tut mir leid, ich muss ... / Leider kann ich nicht, weil ..."),
    bullet("Gegenvorschlag mit neuem Termin: Aber am [Tag] kann ich. Wollen wir dann ...?"),
    bullet("Mind. 6 Zeilen, beide Rollen sichtbar."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Chatnachrichten"), empty(),
    pBold("Lies die Chatnachrichten und beantworte die Fragen."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Nina an Sven, Freitagnachmittag:"),
          p("Hey Sven! Hast du morgen Lust, mit mir Fahrrad zu fahren? Das Wetter soll super sein!"),
          empty(),
          pBold("Sven:"),
          p("Hi Nina! Tut mir leid, ich kann morgen nicht. Ich muss meiner Mutter beim Einkaufen helfen."),
          empty(),
          pBold("Nina:"),
          p("Ach schade. Und am Sonntag?"),
          empty(),
          pBold("Sven:"),
          p("Am Sonntag bin ich frei! Wollen wir uns um 10 Uhr am Park treffen?"),
          empty(),
          pBold("Nina:"),
          p("Ja, super! Gute Idee. Soll ich auch Lena einladen? Sie fährt auch gern Fahrrad."),
          empty(),
          pBold("Sven:"),
          p("Klar, je mehr desto besser! Dann treffen wir uns alle drei am Sonntag um 10 Uhr am Park. Bis dann!"),
          empty(),
          pBold("Nina:"),
          p("Top! Bis Sonntag!"),
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
        new TableRow({ children: [dCell("Nina lädt Sven ein, am Samstag Fahrrad zu fahren."), dCell("")] }),
        new TableRow({ children: [dCell("Sven kann am Samstag nicht, weil er krank ist."), dCell("")] }),
        new TableRow({ children: [dCell("Am Sonntag ist Sven frei."), dCell("")] }),
        new TableRow({ children: [dCell("Sie treffen sich um 11 Uhr am Park."), dCell("")] }),
        new TableRow({ children: [dCell("Am Ende wollen drei Kinder zusammen fahren."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("1. Was schlägt Nina vor?"),
    writeLine(60), empty(),
    p("2. Warum kann Sven am Samstag nicht?"),
    writeLine(60), empty(),
    p("3. Wann und wo treffen sie sich?"),
    writeLine(60), empty(),
    p("4. Wen will Nina noch einladen?"),
    writeLine(60), empty(),
    pBold("Aufgabe 3: Suche im Text! Schreib alle Einladungs- und Vorschlagsphrasen heraus."),
    writeLine(60), empty(),
    writeLine(60),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Chatnachrichten (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Nina lädt Sven ein, am Samstag Fahrrad zu fahren."), dCell("R")] }),
        new TableRow({ children: [dCell("Sven kann am Samstag nicht, weil er krank ist."), dCell("F (er muss seiner Mutter helfen)")] }),
        new TableRow({ children: [dCell("Am Sonntag ist Sven frei."), dCell("R")] }),
        new TableRow({ children: [dCell("Sie treffen sich um 11 Uhr am Park."), dCell("F (um 10 Uhr)")] }),
        new TableRow({ children: [dCell("Am Ende wollen drei Kinder zusammen fahren."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Sie schlägt vor, am Samstag Fahrrad zu fahren."),
    bullet("2. Er muss seiner Mutter beim Einkaufen helfen."),
    bullet("3. Sie treffen sich am Sonntag um 10 Uhr am Park."),
    bullet("4. Sie will Lena einladen."),
    empty(),
    pBold("Aufgabe 3: Phrasen im Text"),
    bullet("Hast du morgen Lust, mit mir Fahrrad zu fahren?"),
    bullet("Wollen wir uns um 10 Uhr am Park treffen?"),
    bullet("Soll ich auch Lena einladen?"),
    pItalic("Weitere akzeptierbare Antworten: Klar – Gute Idee – Ja, super!"),
  ]);
}

// ── LÜCKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Verabredungen treffen"), empty(),
    pBold("Wörterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Lust – gern – will – wollen – leider – tut – treffen – Uhr – morgen – Samstag – Mal – Idee – kannst – mitkommt – einladen")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergänze die Sätze."),
    empty(),
    p("1. Hast du ______________________, heute schwimmen zu gehen?"),
    p("2. Wir ______________________ uns um 14 ______________________ am Freibad treffen."),
    p("3. ______________________ mir leid, ich kann heute nicht."),
    p("4. Vielleicht ein anderes ______________________?"),
    p("5. Ich ______________________ am Wochenende ins Kino gehen. Willst du mitkommen?"),
    p("6. Ja, ______________________ ! Das ist eine tolle ______________________!"),
    p("7. Leider ______________________ ich am Sonntag nicht. Ich muss Hausaufgaben machen."),
    empty(),
    pBold("Teil 2: Zusage oder Absage? Ergänze die passenden Wörter."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Einladung", { width: 4750 }), hCell("Antwort (ergänze)", { width: 4750 })] }),
        new TableRow({ children: [dCell("Hast du Lust, Fußball zu spielen?"), dCell("Ja, ____________________!")] }),
        new TableRow({ children: [dCell("Wollen wir am Freitag ins Kino?"), dCell("______________________, ich habe keine Zeit.")] }),
        new TableRow({ children: [dCell("Komm doch mit in den Park!"), dCell("Super! Wann ______________________ wir uns?")] }),
        new TableRow({ children: [dCell("Hast du morgen Lust zu backen?"), dCell("Vielleicht ______________________. Heute nicht.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Dialog – Ergänze und schreib den Dialog fertig."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Pia"), dCell("Hey Tom! Hast du am ______________________ Lust, ins Schwimmbad zu gehen?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("______________________ kann ich nicht. Ich gehe mit meinen Eltern weg.")] }),
        new TableRow({ children: [dCell("Pia"), dCell("Und am Sonntag?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Am Sonntag bin ich frei. Ich ______________________ gern schwimmen gehen!")] }),
        new TableRow({ children: [dCell("Pia"), dCell("Super! Sollen wir auch Ana ______________________?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Ja, klar! Je mehr, desto besser. Wo ______________________ wir uns?")] }),
        new TableRow({ children: [dCell("Pia"), dCell("Am Eingang des Schwimmbads um 11 ______________________!")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lückentext – Verabredungen treffen (LÖSUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Lust"),
    bullet("2. treffen – Uhr"),
    bullet("3. Tut"),
    bullet("4. Mal"),
    bullet("5. will"),
    bullet("6. gern – Idee"),
    bullet("7. kannst"),
    empty(),
    pBold("Teil 2: Zusage / Absage"),
    bullet("Fußball: Ja, gern! / Ja, super! / Klar!"),
    bullet("Kino: Leider / Tut mir leid, ..."),
    bullet("Park: treffen"),
    bullet("Backen: ein anderes Mal"),
    empty(),
    pBold("Teil 3: Dialog"),
    bullet("Pia: ... am Samstag Lust ..."),
    bullet("Tom: Leider / Morgen kann ich nicht ..."),
    bullet("Tom: Ich will gern ..."),
    bullet("Pia: ... einladen?"),
    bullet("Tom: ... treffen wir uns?"),
    bullet("Pia: ... um 11 Uhr!"),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Verabredungen treffen"), empty(),
    makeWortTable(),
    empty(),
    pBold("Grammatik-Hinweise: Lust haben zu + Infinitiv"),
    bullet("\"Hast du Lust, ... zu + Infinitiv?\" – Komma vor zu!"),
    bullet("Beispiel: Hast du Lust, Fußball zu spielen? (NICHT: zu spielst)"),
    bullet("Trennbare Verben: zu steht zwischen Präfix und Verb: mitzumachen, einzuladen."),
    empty(),
    pBold("Grammatik-Hinweise: wollen (Modalverb)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2500 }), hCell("wollen", { width: 3000 }), hCell("Beispiel", { width: 4000 })] }),
        new TableRow({ children: [dCell("ich"), dCell("will"), dCell("Ich will ins Kino gehen.")] }),
        new TableRow({ children: [dCell("du"), dCell("willst"), dCell("Willst du mitkommen?")] }),
        new TableRow({ children: [dCell("er / sie / es"), dCell("will"), dCell("Er will schwimmen gehen.")] }),
        new TableRow({ children: [dCell("wir"), dCell("wollen"), dCell("Wollen wir uns treffen?")] }),
        new TableRow({ children: [dCell("ihr"), dCell("wollt"), dCell("Wollt ihr mitmachen?")] }),
        new TableRow({ children: [dCell("sie / Sie"), dCell("wollen"), dCell("Sie wollen Fußball spielen.")] }),
      ],
    }),
    empty(),
    pBold("Temporaladverbien und Zeitangaben:"),
    bullet("heute / morgen / übermorgen"),
    bullet("am Montag / am Dienstag / ... / am Wochenende"),
    bullet("um + Uhrzeit: um 10 Uhr / um halb drei / um Viertel nach vier"),
    bullet("nach der Schule / am Nachmittag / am Abend"),
    empty(),
    h2("Übersetzung in deine Sprache"),
    bullet("Hast du Lust, ... zu ...? = ______________________"),
    bullet("Wollen wir ...? = ______________________"),
    bullet("Tut mir leid, ich kann nicht. = ______________________"),
    bullet("Leider nicht. = ______________________"),
    bullet("Vielleicht ein anderes Mal. = ______________________"),
    bullet("Gute Idee! = ______________________"),
    bullet("Wann / Wo treffen wir uns? = ______________________"),
    bullet("morgen = ______________________"),
    bullet("übermorgen = ______________________"),
    bullet("am Wochenende = ______________________"),
    empty(),
    pItalic("Tipp: Lern die Phrasen immer als ganzen Satz – nie nur das einzelne Wort!"),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Verabredungen treffen (LÖSUNG)"), empty(),
    makeWortTable(),
    empty(),
    pBold("Wichtigste Strukturen für die Lehrkraft:"),
    bullet("\"Hast du Lust, zu + Infinitiv?\" – Komma vor zu-Infinitiv ist Pflicht."),
    bullet("Trennbare Verben im zu-Infinitiv: mitzumachen, einzuladen, vorbeizukommen."),
    bullet("wollen: ich/er/sie/es → will (keine Endung); wie müssen/können/sollen."),
    bullet("\"Wollen wir ...?\" = Vorschlag mit wir-Form – typische Aufforderungsstruktur."),
    bullet("Zeitangaben: \"am\" + Wochentag (am Montag) vs. \"um\" + Uhrzeit (um 15 Uhr)."),
    bullet("\"morgen\" = tomorrow – Achtung: kein Großbuchstabe, da Adverb, nicht Nomen."),
    empty(),
    pItalic("Übersetzungen sind individuell. Lehrkraft prüft Sinn-Treue, besonders bei Absage-Phrasen."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Verabredungen treffen"), empty(),
    pBold("Dialog 1: Am Telefon"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lena"), dCell("Hallo Paul! Hast du heute Nachmittag Lust, in den Park zu kommen?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Hi Lena! Heute leider nicht, ich muss Hausaufgaben machen.")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Schade! Und morgen?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Morgen kann ich. Wollen wir uns um 15 Uhr treffen?")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Ja, super! Wo treffen wir uns?")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Am Eingang vom Park. Soll ich auch Jonas einladen?")] }),
        new TableRow({ children: [dCell("Lena"), dCell("Ja, gerne! Je mehr, desto besser. Bis morgen!")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Bis morgen!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Ergänze und übe mit deinem Partner / deiner Partnerin."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("A"), dCell("Hast du ______________________ Lust, ______________________ zu ______________________?")] }),
        new TableRow({ children: [dCell("B"), dCell("Ja, gern! / Tut mir leid, ich ______________________.")] }),
        new TableRow({ children: [dCell("A"), dCell("Wollen wir uns um ______________________ Uhr treffen?")] }),
        new TableRow({ children: [dCell("B"), dCell("______________________, das passt mir gut.")] }),
        new TableRow({ children: [dCell("A"), dCell("Und wo? Am ______________________ oder beim ______________________?")] }),
        new TableRow({ children: [dCell("B"), dCell("Am ______________________ ist besser.")] }),
        new TableRow({ children: [dCell("A"), dCell("Sollen wir auch ______________________ einladen?")] }),
        new TableRow({ children: [dCell("B"), dCell("______________________! Bis ______________________!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Plane eine echte Verabredung!"),
    p("Benutze diese Fragen und schreib die Antworten auf:"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Was wollen wir zusammen machen?"), dCell("")] }),
        new TableRow({ children: [dCell("Wann hast du Zeit?"), dCell("")] }),
        new TableRow({ children: [dCell("Um wie viel Uhr treffen wir uns?"), dCell("")] }),
        new TableRow({ children: [dCell("Wo treffen wir uns?"), dCell("")] }),
        new TableRow({ children: [dCell("Wen laden wir noch ein?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Verabredungs-Staffel"),
    bullet("Jede Person schreibt eine Aktivität auf einen Zettel (z. B. \"Kino\", \"Park\", \"Backen\")."),
    bullet("Person A zieht einen Zettel und lädt Person B ein: \"Hast du Lust, ... zu ...?\""),
    bullet("Person B sagt zu ODER ab (mit Begründung + Gegenvorschlag bei Absage)."),
    bullet("Ziel: jeder übt einmal einladen und einmal höflich absagen."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Verabredungen treffen (LÖSUNG)"), empty(),
    pBold("Dialog 1: Schlüsselstrukturen"),
    bullet("Hast du Lust, ... zu + Infinitiv? – Einladungsformel."),
    bullet("Heute leider nicht, ich muss ... – höfliche Absage mit Begründung."),
    bullet("Wollen wir uns um 15 Uhr treffen? – Vorschlag für Treffpunkt/Uhrzeit."),
    bullet("Wo treffen wir uns? – Rückfrage nach Ort."),
    bullet("Soll ich auch Jonas einladen? – sollen für Vorschlag/Anfrage."),
    empty(),
    pBold("Dialog 2: Mögliche Lückenfüllung (Beispiel)"),
    bullet("Hast du morgen Lust, in den Park zu kommen?"),
    bullet("Tut mir leid, ich muss lernen. / Ja, gern!"),
    bullet("Um 15 / 16 / 17 Uhr."),
    bullet("Super / Ja, das passt mir gut."),
    bullet("Am Park / beim Supermarkt."),
    bullet("Am Park-Eingang / vor der Schule."),
    bullet("Auch Mia / auch Ben."),
    bullet("Klar / Super! Bis morgen / Samstag!"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Einladung mit Hast du Lust, ... zu ...? oder Wollen wir ...? (korrekte zu-Infinitiv-Konstruktion)."),
    bullet("Bei Absage: höfliche Formulierung + Begründung mit muss / kann nicht."),
    bullet("Zeitangabe mit am + Tag oder um + Uhrzeit."),
    bullet("Antworten in ganzen Sätzen."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Verabredungen treffen"), empty(),
    pBold("Aufgabe 1: Was schlägt die Person vor? Schreib in die Sprechblase."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 4750 }), hCell("Sprechblase", { width: 4750 })] }),
        new TableRow({ children: [dCell("[BILD: Mädchen zeigt auf einen Fußball und winkt freundlich]"), dCell("Hast du Lust, ________________________?")] }),
        new TableRow({ children: [dCell("[BILD: Kind zeigt auf ein Schwimmbad-Schild]"), dCell("Wollen wir ________________________?")] }),
        new TableRow({ children: [dCell("[BILD: Kind hält eine Kinokarte hoch]"), dCell("Komm doch ________________________!")] }),
        new TableRow({ children: [dCell("[BILD: Kind backt Kekse und winkt Freund herbei]"), dCell("Hast du Lust, ________________________?")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Zusage oder Absage? Schreib eine passende Antwort ins zweite Feld."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild / Einladung", { width: 5000 }), hCell("Antwort", { width: 4500 })] }),
        new TableRow({ children: [dCell("[BILD: Kind freut sich, springt hoch – Zusage]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Kind schüttelt den Kopf, zeigt auf Bücher – Absage]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Kind überlegt, zeigt auf Kalender – Gegenvorschlag]"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: [BILD: Kalender mit einer Woche – einige Tage sind schon markiert als \"besetzt\"]"),
    p("Schau dir den Kalender an. An welchen Tagen kann die Person eine Verabredung machen?"),
    p("Schreib für jeden freien Tag einen Vorschlag:"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Freier Tag im Kalender", { width: 3000 }), hCell("Mein Vorschlag", { width: 6500 })] }),
        new TableRow({ children: [dCell("____________________"), dCell("Hast du Lust, am __________________ ____________________?")] }),
        new TableRow({ children: [dCell("____________________"), dCell("Wollen wir am __________________ ____________________?")] }),
        new TableRow({ children: [dCell("____________________"), dCell("Komm doch am __________________ mit ____________________!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Schreib eine Einladungs-Nachricht (wie eine SMS oder Chat-Nachricht)."),
    p("[BILD: Smartphone mit leerem Chatfenster]"),
    p("Lade deinen besten Freund / deine beste Freundin zu einer Aktivität ein."),
    p("Nenne: Was? Wann? Um wie viel Uhr? Wo?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [writeLine(60), empty(), writeLine(60), empty(), writeLine(60), empty(), writeLine(60)],
      })]})],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Verabredungen treffen (LÖSUNG)"), empty(),
    pBold("Aufgabe 1: Sprechblasen – Musterlösungen"),
    bullet("Fußball: Hast du Lust, Fußball zu spielen?"),
    bullet("Schwimmbad: Wollen wir ins Schwimmbad gehen?"),
    bullet("Kino: Komm doch mit ins Kino!"),
    bullet("Backen: Hast du Lust, Kekse zu backen?"),
    empty(),
    pBold("Aufgabe 2: Zusage / Absage / Gegenvorschlag"),
    bullet("Zusage: Ja, gern! / Super! / Klar, ich komme mit!"),
    bullet("Absage: Tut mir leid, ich muss Hausaufgaben machen. / Leider kann ich nicht."),
    bullet("Gegenvorschlag: Heute nicht, aber vielleicht morgen? / Vielleicht ein anderes Mal."),
    empty(),
    pBold("Aufgabe 3: Individuelle Antworten – Bewertung"),
    bullet("Korrekte Einladungsformel: Hast du Lust, am [Tag] ... zu ...? / Wollen wir am [Tag] ...?"),
    bullet("Aktivität muss benannt sein."),
    bullet("Zeitangabe mit am + Wochentag oder um + Uhrzeit."),
    empty(),
    pBold("Aufgabe 4: SMS-Nachricht – Bewertungskriterien"),
    bullet("Enthält: Aktivität, Zeitangabe, Ortsangabe."),
    bullet("Hast du Lust, ... zu ...? oder Wollen wir ... ?"),
    bullet("Freundlicher, einladender Ton."),
    pItalic("Beispiel: Hey Mia! Hast du am Samstag Lust, ins Schwimmbad zu gehen? Wir treffen uns um 11 Uhr am Eingang. Komm doch mit! LG Ben"),
    empty(),
    pBold("Hinweis Lehrkraft:"),
    bullet("Antworten hängen vom eingefügten Bildmaterial (Kalender) ab."),
    bullet("Korrekte zu-Infinitiv-Konstruktion prüfen – Komma vor 'zu' ist wichtig."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Verabredungen treffen (A2 Kinder)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
