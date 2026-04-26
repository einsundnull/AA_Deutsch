"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "03_FreizeitHobbys", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_FreizeitHobbys";
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
    h1("Abschlusspruefung — Freizeit und Hobbys (A2 Kinder)"),
    pItalic("Themen: Hobbys | Verabredungen | Kino, Buecher und Spiele"),
    empty(),

    h2("Aufgabe 1: Lies den Brief und beantworte die Fragen."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo Nora!"),
          p("Wie geht es dir? Ich schreibe dir, weil ich dir von meiner Freizeit erzaehlen moechte."),
          p("In meiner Freizeit male ich sehr gern. Am liebsten male ich Tiere und Landschaften. Manchmal male ich auch Portraets von meiner Familie. Lesen mag ich auch, aber nicht so oft wie Malen."),
          p("Letzte Woche hat mich meine Freundin Sophia gefragt: 'Hast du Lust, am Samstag ins Kino zu gehen?' Ich habe sofort 'Ja!' gesagt. Wir haben den neuen Zeichentrickfilm gesehen. Er hat mir sehr gut gefallen!"),
          p("Nach dem Kino haben wir noch ein Brettspiel gespielt. Sophia gewinnt immer, aber das macht mir nichts. Das Spiel heisst 'Labyrinth' und wir spielen es sehr oft."),
          p("Was machst du in deiner Freizeit? Schreib mir bald!"),
          p("Liebe Gruesse, Luisa"),
        ],
      })]})],
    }),
    empty(),
    pBold("1a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Luisa malt am liebsten Tiere und Landschaften."), dCell("")] }),
        new TableRow({ children: [dCell("Luisa liest haeufiger als sie malt."), dCell("")] }),
        new TableRow({ children: [dCell("Sophia hat Luisa ins Kino eingeladen."), dCell("")] }),
        new TableRow({ children: [dCell("Der Film hat Luisa nicht gefallen."), dCell("")] }),
        new TableRow({ children: [dCell("Sophia gewinnt beim Brettspiel immer."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("1b) Beantworte die Fragen in ganzen Saetzen."),
    p("1. Was malt Luisa am liebsten?"),
    writeLine(55), empty(),
    p("2. Wohin gehen Luisa und Sophia am Samstag?"),
    writeLine(55), empty(),
    p("3. Wie oft spielen die Maedchen 'Labyrinth'?"),
    writeLine(55), empty(),

    h2("Aufgabe 2: Lueckentext — Verabredung per Nachricht"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Hast du Lust  -  Wollen  -  am liebsten  -  gern  -  manchmal  -  gefaellt  -  lieber  -  oft  -  immer  -  selten")],
      })]})],
    }),
    empty(),
    p("Tim:   Hey Jonas! __________________ wir heute Nachmittag Fussball spielen?"),
    p("Jonas: Hmm, eigentlich spiele ich __________________ Videospiele. Aber __________________ spiele ich auch Fussball."),
    p("Tim:   __________________ nach dem Fussball noch ein Spiel zu machen?"),
    p("Jonas: Super Idee! Ich spiele __________________ das Spiel 'FIFA'. Das __________________ mir total gut!"),
    p("Tim:   Ich spiele __________________ Strategie-Spiele. Aber FIFA ist auch cool."),
    p("Jonas: Dann spielen wir __________________ FIFA zusammen!"),
    empty(),

    h2("Aufgabe 3: Ordne die Woerter den richtigen Kategorien zu."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Zeichentrickfilm  -  Abenteuerroman  -  Schach  -  Karte kaufen  -  Brettspiel  -  Fantasy-Buch  -  Popcorn  -  Wuerfel  -  Leinwand  -  Spielfigur  -  Kapitel  -  Vorstellung")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Kino", { width: 3100 }), hCell("Buecher", { width: 3100 }), hCell("Spiele", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Meine Freizeit — schreib 5-7 Saetze."),
    pBold("Benutze diese Woerter: gern / lieber / am liebsten / immer / oft / manchmal / selten"),
    p("Was machst du in deiner Freizeit? Was magst du besonders? Was machst du am liebsten?"),
    empty(),
    ...writeLines(7, 55),

    h2("Aufgabe 5: Schreib einen Dialog — Verabredung treffen"),
    pBold("Schreib mit einer Partnerin / einem Partner. Benutzt diese Saetze:"),
    bullet("Hast du Lust, ... zu ...?"),
    bullet("Wollen wir ...?"),
    bullet("Das gefaellt mir (nicht / sehr gut / total)."),
    bullet("Ich ... lieber / am liebsten ..."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagst du?", { width: 7300 })] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    h2("Das kann ich jetzt!"),
    pItalic("Bewerte dich selbst: Kreuze an."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 6500 }), hCell("Das kann ich gut", { width: 1500 }), hCell("Das uebe ich noch", { width: 1500 })] }),
        new TableRow({ children: [dCell("... ueber meine Hobbys und Freizeit sprechen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... gern / lieber / am liebsten richtig verwenden."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... eine Verabredung treffen (Hast du Lust, ... zu ...?)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... ueber Kino, Buecher und Spiele sprechen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... gefallen + Dativ benutzen (Das gefaellt mir)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... Haeufigkeitsadverbien benutzen (immer / oft / manchmal)."), dCell("[ ]"), dCell("[ ]")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusspruefung — Freizeit und Hobbys (LOESUNG)"),
    empty(),

    h2("Aufgabe 1a: Richtig / Falsch"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Luisa malt am liebsten Tiere und Landschaften."), dCell("R")] }),
        new TableRow({ children: [dCell("Luisa liest haeufiger als sie malt."), dCell("F (sie malt haeufiger)")] }),
        new TableRow({ children: [dCell("Sophia hat Luisa ins Kino eingeladen."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Film hat Luisa nicht gefallen."), dCell("F (er hat ihr sehr gut gefallen)")] }),
        new TableRow({ children: [dCell("Sophia gewinnt beim Brettspiel immer."), dCell("R")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b: Antworten"),
    bullet("1. Sie malt am liebsten Tiere und Landschaften."),
    bullet("2. Sie gehen ins Kino. / Sie sehen den neuen Zeichentrickfilm."),
    bullet("3. Sie spielen es sehr oft."),
    empty(),

    h2("Aufgabe 2: Loesung Lueckentext"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Luecke", { width: 4750 }), hCell("Loesung", { width: 4750 })] }),
        new TableRow({ children: [dCell("Tim (1)"), dCell("Wollen")] }),
        new TableRow({ children: [dCell("Jonas (1)"), dCell("lieber")] }),
        new TableRow({ children: [dCell("Jonas (2)"), dCell("manchmal")] }),
        new TableRow({ children: [dCell("Tim (2)"), dCell("Hast du Lust")] }),
        new TableRow({ children: [dCell("Jonas (3)"), dCell("am liebsten")] }),
        new TableRow({ children: [dCell("Jonas (4)"), dCell("gefaellt")] }),
        new TableRow({ children: [dCell("Tim (3)"), dCell("gern")] }),
        new TableRow({ children: [dCell("Jonas (5)"), dCell("oft")] }),
      ],
    }),
    pItalic("Nicht verwendet (Ablenkwoerter): immer, selten"),
    empty(),

    h2("Aufgabe 3: Zuordnung Kino / Buecher / Spiele"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Kino", { width: 3100 }), hCell("Buecher", { width: 3100 }), hCell("Spiele", { width: 3100 })] }),
        new TableRow({ children: [dCell("Zeichentrickfilm"), dCell("Abenteuerroman"), dCell("Schach")] }),
        new TableRow({ children: [dCell("Karte kaufen"), dCell("Fantasy-Buch"), dCell("Brettspiel")] }),
        new TableRow({ children: [dCell("Popcorn"), dCell("Kapitel"), dCell("Wuerfel")] }),
        new TableRow({ children: [dCell("Leinwand"), dCell(""), dCell("Spielfigur")] }),
        new TableRow({ children: [dCell("Vorstellung"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),

    h2("Aufgabe 4: Schreibaufgabe — individuelle Antworten"),
    pBold("Bewertungskriterien:"),
    bullet("Mindestens 5 Saetze"),
    bullet("gern / lieber / am liebsten korrekt eingesetzt (Steigerung beachten)"),
    bullet("Mindestens 2 Haeufigkeitsadverbien verwendet"),
    bullet("Grammatisch korrekte Wortstellung"),
    pItalic("Muster: In meiner Freizeit lese ich gern. Am liebsten spiele ich aber Fussball. Manchmal gehe ich auch schwimmen. Computer spielen mag ich lieber als Fernsehen. Ich gehe immer am Wochenende mit meiner Familie spazieren."),
    empty(),

    h2("Aufgabe 5: Dialog — Bewertungskriterien"),
    bullet("'Hast du Lust, ... zu + Infinitiv?' korrekt verwendet"),
    bullet("'Wollen wir ...?' korrekt verwendet"),
    bullet("'Das gefaellt mir (sehr gut / nicht).' korrekt verwendet"),
    bullet("Steigerung gern / lieber / am liebsten korrekt"),
    bullet("Zusammenhaengender Dialog (mindestens 6 Turns insgesamt)"),
    pItalic("Musterdialog: A: Hast du Lust, heute ins Kino zu gehen? B: Hmm, ich gehe lieber ins Schwimmbad. Das gefaellt mir besser. A: OK! Wollen wir zuerst schwimmen und dann ein Spiel spielen? B: Super Idee! Ich spiele am liebsten Karten."),
    empty(),

    h2("Grammatik-Zusammenfassung fuer Lehrkraft"),
    bullet("gern / lieber / am liebsten = Steigerungsformen des Adverbs gern"),
    bullet("Haeufigkeitsadverbien: immer > oft > manchmal > selten > nie"),
    bullet("Hast du Lust, ... zu + Infinitiv? = Einladung / Vorschlag"),
    bullet("gefallen + Dativ: Das gefaellt MIR (Dativ, nicht Akkusativ: nicht 'mich')"),
    bullet("wollen + Infinitiv: Wollen wir schwimmen gehen?"),
    bullet("zu-Infinitiv: Ich habe Lust, Fussball zu spielen."),
    empty(),
    h2("Aufgabe 6 — Selbstevaluation"),
    pItalic("Individuelle Selbsteinschaetzung — kein richtig oder falsch."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Abschluss: A2_Kinder Freizeit & Hobbys");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
