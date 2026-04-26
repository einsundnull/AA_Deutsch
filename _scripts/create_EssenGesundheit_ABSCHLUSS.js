"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "04_EssenGesundheit", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_EssenGesundheit";
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
    h1("Abschlusspruefung — Essen und Gesundheit (A2 Kinder)"),
    pItalic("Themen: Gesundes und ungesundes Essen | Einfache Rezepte | Beim Arzt"),
    empty(),

    // Aufgabe 1: Lesetext
    h2("Aufgabe 1: Lies die Geschichte und beantworte die Fragen."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          pBold("Warum ist Theo krank?"),
          empty(),
          p("Theo ist 10 Jahre alt und liebt Fast Food. Am liebsten isst er Chips, Pizza und trinkt Limonade. Obst und Gemuese mag er gar nicht. Seine Mutter sagt immer: 'Theo, du sollst mehr gesund essen!' Aber Theo hoert nicht."),
          p("Eines Tages wacht Theo mit starkem Bauchweh auf. Ihm ist auch schlecht und er hat 38 Grad Fieber. Seine Mutter bringt ihn zum Arzt."),
          p("Dr. Fischer fragt: 'Was hast du in letzter Zeit gegessen, Theo?' Theo erraetet ein bisschen. 'Na ja... Chips, Pizza, Hamburger...'"),
          p("'Ahhh', sagt Dr. Fischer. 'Dein Bauch braucht mehr Vitamine und weniger Fett. Du sollst drei Tage zu Hause bleiben, viel Tee trinken und nur leichte Speisen essen — zum Beispiel Reis oder Suppe.'"),
          p("Zu Hause beschliesst Theo, es besser zu machen. Seine Mutter zeigt ihm ein einfaches Smoothie-Rezept: Zuerst schaelen sie eine Banane, dann geben sie Milch und Joghurt hinzu, und zum Schluss mixen sie alles zusammen."),
          p("Der Smoothie schmeckt Theo ueberraschend gut! 'Vielleicht ist gesundes Essen gar nicht so schlimm', denkt er."),
        ],
      })]})],
    }),
    empty(),
    pBold("1a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Theo isst am liebsten Obst und Gemuese."), dCell("")] }),
        new TableRow({ children: [dCell("Theo hat Bauchweh und Fieber."), dCell("")] }),
        new TableRow({ children: [dCell("Dr. Fischer empfiehlt Fast Food fuer die Genesung."), dCell("")] }),
        new TableRow({ children: [dCell("Theo soll drei Tage zu Hause bleiben."), dCell("")] }),
        new TableRow({ children: [dCell("Der Smoothie gefaellt Theo nicht."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("1b) Beantworte die Fragen in ganzen Saetzen."),
    p("1. Warum geht Theo zum Arzt?"),
    writeLine(55), empty(),
    p("2. Was empfiehlt Dr. Fischer zum Essen?"),
    writeLine(55), empty(),
    p("3. Was sind die drei Schritte beim Smoothie-Rezept?"),
    writeLine(55), writeLine(55), empty(),

    // Aufgabe 2: Lückentext
    h2("Aufgabe 2: Lueckentext — alle Themen gemischt"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("gesund  -  ungesund  -  Vitamine  -  Bauchweh  -  seit  -  musst  -  sollst  -  zuerst  -  dann  -  zum Schluss  -  schaelen  -  enthaelt  -  Rezept  -  Apotheke")],
      })]})],
    }),
    empty(),
    p("1. Chips sind __________________, weil sie viel Fett enthalten."),
    p("2. Obst __________________ viele __________________."),
    p("3. Ich habe __________________ gestern Abend Halsschmerzen."),
    p("4. Ich habe __________________. Mein Bauch tut weh."),
    p("5. Du __________________ viel Wasser trinken — das sagt der Arzt."),
    p("6. Der Arzt schreibt ein __________________ fuer die __________________."),
    p("7. __________________ wasche ich das Obst, __________________ schneide ich es klein,"),
    p("   __________________ mische ich alles zusammen."),
    p("8. __________________ die Banane, bevor du sie in den Mixer gibst."),
    empty(),

    // Aufgabe 3: Wortschatz-Zuordnung
    h2("Aufgabe 3: Ordne die Woerter den drei Themen zu."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Tabletten  -  mischen  -  Fieber  -  Wartezimmer  -  Zutaten  -  Vitamine  -  Sirup  -  schaelen  -  Schnupfen  -  Rezept (Arzt)  -  Zubereitung  -  Vollkornbrot")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesundes Essen", { width: 3100 }), hCell("Rezept kochen", { width: 3100 }), hCell("Beim Arzt", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
        new TableRow({ children: [dCell("", { width: 3100 }), dCell("", { width: 3100 }), dCell("", { width: 3100 })] }),
      ],
    }),
    empty(),

    // Aufgabe 4: Schreibaufgabe
    h2("Aufgabe 4: Schreib einen Gesundheits-Ratgeber fuer ein krankes Kind."),
    pBold("Dein Brief soll enthalten:"),
    bullet("Was sollte das Kind essen? (gesund / ungesund)"),
    bullet("Ein einfaches Rezept mit 3-4 Schritten (z. B. Suppe, Tee, Smoothie)"),
    bullet("Zwei Empfehlungen vom Arzt (Du musst / Du sollst / Du darfst nicht ...)"),
    empty(),
    p("Liebe/r ____________________________,"),
    empty(),
    ...writeLines(8, 55),
    p("Ich wuensche dir gute Besserung!"),
    writeLine(40),
    empty(),

    // Aufgabe 5: Konversation
    h2("Aufgabe 5: Dialog — Arzt fragt nach den Essgewohnheiten"),
    pBold("Schreib mit einer Partnerin / einem Partner. Arzt (A) fragt, Patient (P) antwortet."),
    pBold("Benutzt diese Struktur:"),
    bullet("A: Was isst du normaler weise? / Was trinkst du viel?"),
    bullet("P: Ich esse gern / lieber ... / Ich trinke oft ..."),
    bullet("A: Das ist (un)gesund, weil ... / Du solltest mehr ... essen."),
    bullet("P: Ich weiss. Ich werde ... (Vorsatz)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagst du?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Arzt/Aerztin"), dCell("")] }),
        new TableRow({ children: [dCell("Patient/in"), dCell("")] }),
        new TableRow({ children: [dCell("Arzt/Aerztin"), dCell("")] }),
        new TableRow({ children: [dCell("Patient/in"), dCell("")] }),
        new TableRow({ children: [dCell("Arzt/Aerztin"), dCell("")] }),
        new TableRow({ children: [dCell("Patient/in"), dCell("")] }),
      ],
    }),
    empty(),

    // Aufgabe 6: Selbstevaluation
    h2("Das kann ich jetzt!"),
    pItalic("Kreuze an."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 6500 }), hCell("Das kann ich gut", { width: 1500 }), hCell("Das uebe ich noch", { width: 1500 })] }),
        new TableRow({ children: [dCell("... gesunde und ungesunde Lebensmittel benennen und erklaeren."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... sagen, warum etwas gesund oder ungesund ist (weil + Inhalt)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... ein einfaches Rezept verstehen und erklaeren (zuerst/dann...)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... meine Symptome beim Arzt auf Deutsch sagen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... Modalverben muessen / sollen / duerfen richtig benutzen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... seit + Zeitangabe korrekt verwenden (seit gestern/zwei Tagen)."), dCell("[ ]"), dCell("[ ]")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusspruefung — Essen und Gesundheit (LOESUNG)"),
    empty(),

    h2("Aufgabe 1a: Richtig / Falsch"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Theo isst am liebsten Obst und Gemuese."), dCell("F (er liebt Fast Food)")] }),
        new TableRow({ children: [dCell("Theo hat Bauchweh und Fieber."), dCell("R")] }),
        new TableRow({ children: [dCell("Dr. Fischer empfiehlt Fast Food fuer die Genesung."), dCell("F (Reis oder Suppe)")] }),
        new TableRow({ children: [dCell("Theo soll drei Tage zu Hause bleiben."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Smoothie gefaellt Theo nicht."), dCell("F (er schmeckt ihm ueberraschend gut)")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b: Antworten"),
    bullet("1. Theo geht zum Arzt, weil er Bauchweh, Uebelkeit und Fieber hat."),
    bullet("2. Dr. Fischer empfiehlt Tee trinken und leichte Speisen wie Reis oder Suppe."),
    bullet("3. Zuerst schaelen sie die Banane, dann geben sie Milch und Joghurt hinzu, zum Schluss mixen sie alles zusammen."),
    empty(),

    h2("Aufgabe 2: Loesung Lueckentext"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nr.", { width: 600 }), hCell("Loesung", { width: 8900 })] }),
        new TableRow({ children: [dCell("1"), dCell("ungesund")] }),
        new TableRow({ children: [dCell("2"), dCell("enthaelt — Vitamine")] }),
        new TableRow({ children: [dCell("3"), dCell("seit")] }),
        new TableRow({ children: [dCell("4"), dCell("Bauchweh")] }),
        new TableRow({ children: [dCell("5"), dCell("sollst / musst")] }),
        new TableRow({ children: [dCell("6"), dCell("Rezept — Apotheke")] }),
        new TableRow({ children: [dCell("7"), dCell("Zuerst — dann — zum Schluss")] }),
        new TableRow({ children: [dCell("8"), dCell("Schaele")] }),
      ],
    }),
    pItalic("Nicht verwendet (Ablenkwoerter): gesund, Schnupfen, Zubereitung"),
    empty(),

    h2("Aufgabe 3: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Gesundes Essen", { width: 3100 }), hCell("Rezept kochen", { width: 3100 }), hCell("Beim Arzt", { width: 3100 })] }),
        new TableRow({ children: [dCell("Vitamine"), dCell("mischen"), dCell("Tabletten")] }),
        new TableRow({ children: [dCell("Vollkornbrot"), dCell("schaelen"), dCell("Fieber")] }),
        new TableRow({ children: [dCell(""), dCell("Zutaten"), dCell("Wartezimmer")] }),
        new TableRow({ children: [dCell(""), dCell("Zubereitung"), dCell("Sirup")] }),
        new TableRow({ children: [dCell(""), dCell(""), dCell("Schnupfen / Rezept (Arzt)")] }),
      ],
    }),
    pItalic("Hinweis: 'Rezept' kann Arzt-Rezept oder Koch-Rezept sein — je nach Kontext akzeptieren."),
    empty(),

    h2("Aufgabe 4: Schreibaufgabe — Bewertungskriterien"),
    bullet("Mindestens 2 gesunde Lebensmittel mit Begruendung (weil + enthaelt)"),
    bullet("Rezept mit mindestens 3 Schritten und Signalwoertern (zuerst/dann/zum Schluss)"),
    bullet("Mindestens 2 Arzt-Empfehlungen mit musst / sollst / darfst (nicht)"),
    bullet("Brief-Format eingehalten (Anrede, Grussformel)"),
    pItalic("Musterloesung: Liebe Sofia, du sollst viel Tee trinken und nichts Fettiges essen. Ich empfehle dir einen Bananen-Smoothie: Zuerst schael die Banane, dann gib Milch dazu, zum Schluss mix alles. Du musst im Bett bleiben und darfst nicht in die Schule gehen. Gute Besserung! Deine Freundin Mia"),
    empty(),

    h2("Aufgabe 5: Dialog — Bewertungskriterien"),
    bullet("Frage nach Essgewohnheiten korrekt gestellt"),
    bullet("Antwort mit gern / lieber / am liebsten oder Haeufigkeitsadverbien"),
    bullet("Begruendung mit weil + enthaelt / ist gesund/ungesund"),
    bullet("Mindestens eine Empfehlung mit solltest / musst"),
    bullet("Vorsatz mit ich werde ... oder ich moechte ... formuliert"),
    pItalic("Musterdialog: A: Was isst du normalerweise? P: Ich esse oft Pizza und Chips. Ich trinke viel Limonade. A: Das ist ungesund, weil Pizza viel Fett enthaelt und Limonade sehr viel Zucker hat. Du solltest mehr Obst essen. P: Ich weiss. Ich werde ab jetzt jeden Tag einen Apfel essen."),
    empty(),

    h2("Aufgabe 6: Selbstevaluation"),
    pItalic("Individuelle Selbsteinschaetzung — kein richtig oder falsch."),
    pBold("Grammatik-Zusammenfassung fuer Lehrkraft:"),
    bullet("gesund/ungesund + weil + Verb am Ende (Nebensatz)"),
    bullet("enthaelt (Sg.) / enthalten (Pl.) + viel/viele + Nomen"),
    bullet("Imperativ Rezept: Schneide! Schaele! Mische! Fuege hinzu!"),
    bullet("Signalwoerter Reihenfolge: zuerst — dann — danach — zum Schluss"),
    bullet("Ich habe + Symptom (ohne Artikel): Ich habe Bauchweh/Fieber/Schnupfen"),
    bullet("seit + Zeitangabe (Dativ): seit gestern, seit zwei Tagen, seit einer Woche"),
    bullet("muessen (Pflicht) / sollen (Empfehlung) / duerfen nicht (Verbot)"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Abschluss: A2_Kinder Essen & Gesundheit");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
