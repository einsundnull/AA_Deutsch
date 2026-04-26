"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "06_FesteTraditionen", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_FesteTraditionen";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "u2022", alignment: AlignmentType.LEFT,
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
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC + " — ABSCHLUSS", size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
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

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
function abschluss() {
  save(`${TOPIC}_ABSCHLUSS.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Feste & Traditionen"), empty(),
    pItalic("In dieser Abschlussübung zeigst du, was du ueber Feste, Traditionen und Einladungen gelernt hast."),
    empty(),

    // AUFGABE 1: Lesetext
    h2("Aufgabe 1: Lesen und verstehen"),
    pBold("Lies den Brief und beantworte die Fragen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Liebe Sophie,"),
          empty(),
          p("ich hoffe, es geht dir gut! Ich schreibe dir, weil bei uns gerade ganz viel los ist. Naechste Woche feiern wir gleich zwei Feste — das ist so aufregend!"),
          p("Zuerst ist am Freitag mein Geburtstag. Ich werde 12! Meine Mama backt einen grossen Schokoladenkuchen und ich lade sechs Freunde ein. Wir spielen Spiele und tanzen im Wohnzimmer. Das Schoenste ist immer das Kerzen ausblasen und sich etwas wuenschen!"),
          p("Und dann ist am Sonntag Ostersonntag! Der Osterhase kommt dieses Jahr zu uns in den Garten. Mein kleiner Bruder Paul ist erst 5 Jahre alt und weiss noch nicht, dass Mama und Papa die Eier verstecken. Das ist so suess! Wir faerben heute schon die Eier — ich mache meine am liebsten in Blau und Gelb."),
          p("Bitte komm doch zu meiner Geburtstagsparty! Es beginnt am Freitag um 15 Uhr bei mir zu Hause (Rosenweg 12). Bitte sag mir bis Donnerstag Bescheid, ob du kommst. Ich freue mich so!"),
          empty(),
          p("Herzliche Grueße und bis bald,"),
          p("deine Emma"),
        ],
      })]})],
    }),
    empty(),
    pBold("a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Emma wird am Freitag 13 Jahre alt."), dCell("")] }),
        new TableRow({ children: [dCell("Emmas Mama backt einen Kuchen."), dCell("")] }),
        new TableRow({ children: [dCell("Die Party beginnt um 16 Uhr."), dCell("")] }),
        new TableRow({ children: [dCell("Pauls Lieblingsfarbe fuer Ostereier ist Blau."), dCell("")] }),
        new TableRow({ children: [dCell("Sophie soll bis Donnerstag antworten."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("b) Beantworte die Fragen."),
    empty(),
    p("1. Welche zwei Feste feiert Emma naechste Woche?"),
    writeLine(55), empty(),
    p("2. Was macht Emma am liebsten bei ihrem Geburtstag?"),
    writeLine(55), empty(),
    p("3. Warum faerben Emma und Paul schon heute Ostereier?"),
    writeLine(55), empty(),

    // AUFGABE 2: Lueckentext
    h2("Aufgabe 2: Lueckentext"),
    pBold("Ergaenze den Text mit den Woertern aus dem Kasten."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("einlade  -  Frohe  -  schmuecken  -  versteckt  -  Geburtstag  -  komme  -  werde  -  Kerzen  -  Herzliche  -  auspacken  -  leider  -  gerne")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Zu Weihnachten __________________ wir den Weihnachtsbaum zusammen. Am Abend darf ich die Geschenke __________________."),
          p("Morgen ist mein __________________! Ich __________________ 11 Jahre alt. Ich __________________ alle meine Freunde zur Party __________________. Auf dem Kuchen sind elf __________________."),
          p("Zu Ostern __________________ der Osterhase Suessigkeiten im Garten."),
          p("Einladung: Hiermit lade ich dich herzlich ein. Ich __________________ mich sehr auf dich!"),
          p("Absage: Es tut mir leid, ich kann __________________ nicht __________________."),
          p("Einladungsantwort: __________________ Weihnachten und __________________ Grueße!"),
        ],
      })]})],
    }),
    empty(),

    // AUFGABE 3: Einladung schreiben
    h2("Aufgabe 3: Eine Einladung schreiben"),
    pBold("Du machst eine Weihnachtsfeier. Schreib eine Einladung an deinen Freund / deine Freundin."),
    pItalic("Denk an: Anrede — Einladungsformel — Wann? — Wo? — Was? — Bitte antworte bis ... — Abschluss"),
    empty(),
    ...writeLines(8, 55),
    empty(),

    // AUFGABE 4: Antwort auf Einladung
    h2("Aufgabe 4: Auf eine Einladung antworten"),
    pBold("Lies diese Einladung und schreib eine Antwort. Du kannst nicht kommen (Absage)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          p("Liebe(r) ...,"),
          p("hiermit lade ich dich herzlich zu meiner Osterparty ein! Wann: Samstag, 19. April, 14 Uhr. Wo: Bei mir zu Hause. Was: Ostereier suchen, Grillen, Spiele. Bitte antworte bis Donnerstag. Herzliche Grueße, Max"),
        ],
      })]})],
    }),
    empty(),
    pBold("Deine Absage (4-5 Saetze):"),
    ...writeLines(5, 55),
    empty(),

    // AUFGABE 5: Schreibaufgabe
    h2("Aufgabe 5: Dein Lieblingsfest beschreiben"),
    pBold("Schreibe 6-8 Saetze ueber dein Lieblingsfest."),
    pItalic("Hilfe: Welches Fest? Wann? Was macht deine Familie? Was isst ihr? Was faellt dir am besten? Hast du schon mal jemanden eingeladen?"),
    empty(),
    ...writeLines(8, 55),
    empty(),

    // AUFGABE 6: Selbstevaluation
    h2("Aufgabe 6: Selbstevaluation"),
    pBold("Was kannst du jetzt? Kreuze an."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 7500 }), hCell("☐ gut  ☐ noch nicht", { width: 2000 })] }),
        new TableRow({ children: [dCell("... Geburtstag, Weihnachten und Ostern auf Deutsch beschreiben."), dCell("")] }),
        new TableRow({ children: [dCell("... die Praeposition zu/an bei Festen richtig benutzen."), dCell("")] }),
        new TableRow({ children: [dCell("... trennbare Verben wie 'einladen' und 'auspacken' verwenden."), dCell("")] }),
        new TableRow({ children: [dCell("... eine Einladung auf Deutsch schreiben."), dCell("")] }),
        new TableRow({ children: [dCell("... auf eine Einladung mit Zusage oder Absage antworten."), dCell("")] }),
        new TableRow({ children: [dCell("... mein Lieblingsfest in mehreren Saetzen beschreiben."), dCell("")] }),
      ],
    }),
  ]);
}

// ── ABSCHLUSS LOESUNG ─────────────────────────────────────────────────────────
function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlussübung – Feste & Traditionen (LOESUNG)"), empty(),

    h2("Aufgabe 1a: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Emma wird am Freitag 13 Jahre alt."), dCell("F (sie wird 12)")] }),
        new TableRow({ children: [dCell("Emmas Mama backt einen Kuchen."), dCell("R")] }),
        new TableRow({ children: [dCell("Die Party beginnt um 16 Uhr."), dCell("F (um 15 Uhr)")] }),
        new TableRow({ children: [dCell("Pauls Lieblingsfarbe fuer Ostereier ist Blau."), dCell("F (Emma mag Blau — Paul wird nicht erwaehnt)")] }),
        new TableRow({ children: [dCell("Sophie soll bis Donnerstag antworten."), dCell("R")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b: Antworten"),
    bullet("1. Geburtstag (Freitag) und Ostersonntag (Sonntag)"),
    bullet("2. Das Schoenste ist das Kerzen ausblasen und sich etwas wuenschen."),
    bullet("3. Sie wollen rechtzeitig fertig sein, bevor der Ostersonntag kommt (Eier muessen trocknen / Vorbereitung)."),
    pItalic("Frage 3: Auch akzeptieren: 'Damit die Eier fertig sind.' / 'Weil Ostersonntag bald ist.'"),
    empty(),

    h2("Aufgabe 2: Lueckentext"),
    bullet("schmuecken — auspacken"),
    bullet("Geburtstag — werde — einlade — ein — Kerzen"),
    bullet("versteckt"),
    bullet("freue"),
    bullet("leider — kommen"),
    bullet("Frohe — Herzliche"),
    pItalic("Nicht verwendet (Ablenkwoerter): gerne, komme"),
    empty(),

    h2("Aufgabe 3: Musterloesung Einladung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Liebe Anna,"),
          p("hiermit lade ich dich herzlich zu meiner Weihnachtsfeier ein!"),
          p("Wann: Freitag, 20. Dezember, um 16 Uhr"),
          p("Wo: Bei mir zu Hause, Birkenweg 5"),
          p("Was: Wir schmuecken den Weihnachtsbaum, singen Lieder und essen Plaetzchen."),
          p("Bitte antworte bis Mittwoch."),
          p("Ich freue mich sehr! Herzliche Grueße, (Name)"),
        ],
      })]})],
    }),
    pItalic("Mindestanforderungen: Anrede, Einladungsformel, Wann + Wo, mindestens ein Programmhinweis, Bitte-antworten-Formel, Abschlussgruss."),
    empty(),

    h2("Aufgabe 4: Musterloesung Absage"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Lieber Max,"),
          p("vielen Dank fuer deine Einladung! Es tut mir wirklich leid, aber ich kann leider nicht kommen — ich fahre an dem Wochenende mit meiner Familie weg."),
          p("Ich wuensche euch viel Spass bei der Osterparty und viele bunte Eier!"),
          p("Herzliche Grueße, (Name)"),
        ],
      })]})],
    }),
    pItalic("Bewertung: Dankesformel, Entschuldigung + Begruendung, Wunsch, Abschlussgruss. Koennen + leider + nicht kommen korrekt."),
    empty(),

    h2("Aufgabe 5: individuelle Antworten"),
    pItalic("Erwartete Struktur: Festname + Zeitangabe (zu Weihnachten / an Ostern / an meinem Geburtstag) + mindestens 2 Aktivitaeten + persoenliche Bewertung (Das gefaellt mir, weil ...) + optional Einladungsaspekt."),
    pItalic("Grammatikpunkte pruefen: trennbare Verben (lade ... ein, packe ... aus, schmuecke), Praepositionen zu/an, Perfekt fuer vergangene Erlebnisse."),
    empty(),

    h2("Aufgabe 6: Selbstevaluation"),
    pItalic("Keine feste Loesung — individuelle Selbsteinschaetzung. Besprich mit der Klasse, welche Lernziele noch geubt werden sollen."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle ABSCHLUSS: Feste & Traditionen (kombiniert UP 01 + UP 02)");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
