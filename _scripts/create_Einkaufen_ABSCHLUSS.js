"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "05_Einkaufen", "ABSCHLUSS");
const TOPIC     = "A2_Kinder_Einkaufen";
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
    h1("Abschlusspruefung — Einkaufen (A2 Kinder)"),
    pItalic("Themen: Im Supermarkt, im Kiosk, beim Baecker | Taschengeld und Preise"),
    empty(),

    // Aufgabe 1: Lesetext
    h2("Aufgabe 1: Lies den Text und beantworte die Fragen."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Sophias grosser Einkaufstag"),
          empty(),
          p("Sophia ist 12 Jahre alt und bekommt jede Woche 10 Euro Taschengeld. Sie spart schon seit zwei Monaten auf eine neue Sporttasche, die 35 Euro kostet. Bisher hat sie 28 Euro gespart — sie braucht also noch 7 Euro."),
          p("Am Samstag geht Sophia alleine einkaufen. Zuerst geht sie zur Baeckerei. Dort kauft sie fuenf Broetchen und zwei Brezeln fuer ihre Familie. Das macht 4,50 Euro. Sie bezahlt mit einem 5-Euro-Schein und bekommt 50 Cent Wechselgeld."),
          p("Dann geht sie zum Supermarkt. Sie hat eine Einkaufsliste dabei: Milch, Joghurt und Aepfel. An der Kasse stellt sie fest: Die Aepfel sind heute im Angebot — statt 2,49 Euro nur 1,79 Euro pro Kilogramm. Das ist guenstiger! Sophia spart 70 Cent."),
          p("Auf dem Rueckweg sieht sie am Kiosk eine neue Ausgabe ihrer Lieblingszeitschrift. Sie kostet 3,50 Euro. Sophia rechnet schnell: Sie hat noch 5 Euro Taschengeld uebrig. Wenn sie die Zeitschrift kauft, bleiben ihr 1,50 Euro. Das reicht noch fuer die Sporttasche — naechste Woche bekommt sie ja wieder 10 Euro!"),
          p("Sophia kauft die Zeitschrift und ist sehr zufrieden mit ihrem Einkaufstag."),
        ],
      })]})],
    }),
    empty(),
    pBold("1a) Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Sophia bekommt 10 Euro Taschengeld pro Woche."), dCell("")] }),
        new TableRow({ children: [dCell("Sophia kauft in der Baeckerei Broetchen und Kuchen."), dCell("")] }),
        new TableRow({ children: [dCell("Die Aepfel sind im Supermarkt im Angebot."), dCell("")] }),
        new TableRow({ children: [dCell("Sophia kauft keine Zeitschrift, weil sie zu teuer ist."), dCell("")] }),
        new TableRow({ children: [dCell("Nach dem Einkauf hat Sophia noch 1,50 Euro Taschengeld uebrig."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("1b) Beantworte die Fragen in ganzen Saetzen."),
    p("1. Wofuer spart Sophia und wie viel braucht sie noch?"),
    writeLine(55), empty(),
    p("2. Wie viel kostet der Einkauf in der Baeckerei und wie viel Wechselgeld bekommt sie?"),
    writeLine(55), empty(),
    p("3. Wie viel spart Sophia durch das Angebot bei den Aepfeln?"),
    writeLine(40), empty(),

    // Aufgabe 2: Lückentext
    h2("Aufgabe 2: Lueckentext — beide Themen gemischt."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("haette gerne  -  macht  -  Wechselgeld  -  spare  -  Angebot  -  guenstiger  -  Schnaeppchen  -  uebrig  -  teurer als  -  Kasse  -  darf  -  ausgegeben")],
      })]})],
    }),
    empty(),
    p("1. Ich __________________ drei Broetchen und eine Brezel, bitte."),
    p("2. Das __________________ 2,80 Euro. Hier sind 3 Euro."),
    p("3. Ihr __________________ betraegt 20 Cent."),
    p("4. An der __________________ bezahlt man den Einkauf."),
    p("5. Das Buch ist __________________ die Zeitschrift — es kostet doppelt so viel."),
    p("6. Die Schuhe sind heute im __________________ — 8 Euro __________________ als normal!"),
    p("7. Ich __________________ auf eine neue Jacke. Bisher habe ich 15 Euro __________________."),
    p("8. Nach dem Kino bleibt mir noch 1 Euro __________________. Das ist wenig."),
    p("9. Diese Uhr fuer 5 Euro — das ist ein __________________ !"),
    empty(),

    // Aufgabe 3: Dialog schreiben
    h2("Aufgabe 3: Schreib den vollstaendigen Dialog."),
    pBold("Situation: Du bist beim Baecker. Du moechtest 4 Broetchen (je 0,65 Euro) und 1 Stueck Kuchen (2,80 Euro) kaufen. Du hast 6 Euro dabei."),
    pBold("Benutze: Was darf es sein? / Ich haette gerne ... / Das macht ... / Hier sind ... / Ihr Wechselgeld: ..."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagst du? (schreib selbst)", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("")] }),
        new TableRow({ children: [dCell("Du"), dCell("")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("")] }),
        new TableRow({ children: [dCell("Du"), dCell("")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("")] }),
        new TableRow({ children: [dCell("Du"), dCell("")] }),
      ],
    }),
    empty(),

    // Aufgabe 4: Rechnen und Vergleichen
    h2("Aufgabe 4: Rechnen und vergleichen."),
    pBold("Lies die Einkaufsliste und berechne."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 3500 }), hCell("Preis", { width: 2000 }), hCell("Menge", { width: 1800 }), hCell("Gesamt", { width: 2338 })] }),
        new TableRow({ children: [dCell("Broetchen"), dCell("0,65 Euro"), dCell("4 Stueck"), dCell("")] }),
        new TableRow({ children: [dCell("Milch"), dCell("1,09 Euro"), dCell("2 Liter"), dCell("")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("0,79 Euro"), dCell("3 Becher"), dCell("")] }),
        new TableRow({ children: [dCell("Aepfel"), dCell("1,99 Euro"), dCell("1 kg"), dCell("")] }),
        new TableRow({ children: [dCell("Zeitschrift"), dCell("3,50 Euro"), dCell("1 Stueck"), dCell("")] }),
        new TableRow({ children: [dCell("GESAMT", { bold: true }), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    p("Ich habe 12 Euro dabei. Kann ich alles kaufen?  [ ] Ja  [ ] Nein"),
    p("Mir bleibt __________________ Euro uebrig. / Mir fehlen __________________ Euro."),
    empty(),
    pBold("Schreib zwei Vergleichssaetze mit teurer als / guenstiger als:"),
    writeLine(55), empty(),
    writeLine(55), empty(),

    // Aufgabe 5: Schreibaufgabe
    h2("Aufgabe 5: Schreib ueber deinen letzten Einkauf (5-7 Saetze)."),
    pBold("Beantworte: Wo bist du einkaufen gegangen? Was hast du gekauft? Wie viel hat es gekostet? War es guenstig oder teuer?"),
    empty(),
    ...writeLines(7, 55),

    // Aufgabe 6: Selbstevaluation
    h2("Das kann ich jetzt!"),
    pItalic("Kreuze an."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Ich kann ...", { width: 6500 }), hCell("Das kann ich gut", { width: 1500 }), hCell("Das uebe ich noch", { width: 1500 })] }),
        new TableRow({ children: [dCell("... in der Baeckerei / am Kiosk / im Supermarkt einkaufen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... hoeflich bestellen (Ich haette gerne ...)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... Preise vergleichen (teurer als / guenstiger als)."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... ueber mein Taschengeld sprechen und Sparplaene machen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... Wechselgeld und Gesamtpreise berechnen."), dCell("[ ]"), dCell("[ ]")] }),
        new TableRow({ children: [dCell("... Akkusativ bei kaufen/nehmen korrekt verwenden."), dCell("[ ]"), dCell("[ ]")] }),
      ],
    }),
  ]);
}

function abschluss_L() {
  save(`${TOPIC}_ABSCHLUSS_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Abschlusspruefung — Einkaufen (LOESUNG)"),
    empty(),

    h2("Aufgabe 1a: Richtig / Falsch"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Sophia bekommt 10 Euro Taschengeld pro Woche."), dCell("R")] }),
        new TableRow({ children: [dCell("Sophia kauft in der Baeckerei Broetchen und Kuchen."), dCell("F (Broetchen und Brezeln)")] }),
        new TableRow({ children: [dCell("Die Aepfel sind im Supermarkt im Angebot."), dCell("R")] }),
        new TableRow({ children: [dCell("Sophia kauft keine Zeitschrift, weil sie zu teuer ist."), dCell("F (sie kauft die Zeitschrift)")] }),
        new TableRow({ children: [dCell("Nach dem Einkauf hat Sophia noch 1,50 Euro Taschengeld uebrig."), dCell("R")] }),
      ],
    }),
    empty(),
    h2("Aufgabe 1b: Antworten"),
    bullet("1. Sie spart auf eine Sporttasche (35 Euro) und braucht noch 7 Euro."),
    bullet("2. Der Einkauf kostet 4,50 Euro. Sie bekommt 50 Cent Wechselgeld."),
    bullet("3. Sie spart 70 Cent durch das Angebot (2,49 - 1,79 = 0,70 Euro)."),
    empty(),

    h2("Aufgabe 2: Loesung Lueckentext"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Nr.", { width: 600 }), hCell("Loesung", { width: 8900 })] }),
        new TableRow({ children: [dCell("1"), dCell("haette gerne")] }),
        new TableRow({ children: [dCell("2"), dCell("macht")] }),
        new TableRow({ children: [dCell("3"), dCell("Wechselgeld")] }),
        new TableRow({ children: [dCell("4"), dCell("Kasse")] }),
        new TableRow({ children: [dCell("5"), dCell("teurer als")] }),
        new TableRow({ children: [dCell("6"), dCell("Angebot — guenstiger")] }),
        new TableRow({ children: [dCell("7"), dCell("spare — ausgegeben")] }),
        new TableRow({ children: [dCell("8"), dCell("uebrig")] }),
        new TableRow({ children: [dCell("9"), dCell("Schnaeppchen")] }),
      ],
    }),
    pItalic("Nicht verwendet (Ablenkwoerter): darf"),
    empty(),

    h2("Aufgabe 3: Musterdialog"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Musterloesung", { width: 7300 })] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Guten Morgen! Was darf es sein?")] }),
        new TableRow({ children: [dCell("Du"), dCell("Guten Morgen! Ich haette gerne vier Broetchen und ein Stueck Kuchen, bitte.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Gerne. Das macht 5,40 Euro. (4 x 0,65 + 2,80)")] }),
        new TableRow({ children: [dCell("Du"), dCell("Hier sind 6 Euro.")] }),
        new TableRow({ children: [dCell("Verkaeuferin"), dCell("Ihr Wechselgeld: 60 Cent. Danke und auf Wiedersehen!")] }),
        new TableRow({ children: [dCell("Du"), dCell("Danke! Schoenen Tag noch!")] }),
      ],
    }),
    pBold("Rechenweg: 4 x 0,65 = 2,60 + 2,80 = 5,40 Euro. Wechselgeld: 6,00 - 5,40 = 0,60 Euro."),
    pItalic("Andere korrekte Formulierungen und leichte Preisabweichungen akzeptieren."),
    empty(),

    h2("Aufgabe 4: Rechenergebnisse"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Produkt", { width: 3500 }), hCell("Preis", { width: 2000 }), hCell("Menge", { width: 1800 }), hCell("Gesamt", { width: 2338 })] }),
        new TableRow({ children: [dCell("Broetchen"), dCell("0,65 Euro"), dCell("4 Stueck"), dCell("2,60 Euro")] }),
        new TableRow({ children: [dCell("Milch"), dCell("1,09 Euro"), dCell("2 Liter"), dCell("2,18 Euro")] }),
        new TableRow({ children: [dCell("Joghurt"), dCell("0,79 Euro"), dCell("3 Becher"), dCell("2,37 Euro")] }),
        new TableRow({ children: [dCell("Aepfel"), dCell("1,99 Euro"), dCell("1 kg"), dCell("1,99 Euro")] }),
        new TableRow({ children: [dCell("Zeitschrift"), dCell("3,50 Euro"), dCell("1 Stueck"), dCell("3,50 Euro")] }),
        new TableRow({ children: [dCell("GESAMT"), dCell(""), dCell(""), dCell("12,64 Euro")] }),
      ],
    }),
    bullet("12 Euro reichen NICHT — es fehlen 64 Cent."),
    bullet("Mustersaetze: Die Zeitschrift ist teurer als der Joghurt. / Die Broetchen sind guenstiger als die Milch."),
    empty(),

    h2("Aufgabe 5: Schreibaufgabe — Bewertungskriterien"),
    bullet("Perfekt korrekt: Ich bin gegangen / Ich habe gekauft / Ich habe bezahlt"),
    bullet("Ortsangabe mit Praeposition: in der Baeckerei / im Supermarkt / am Kiosk"),
    bullet("Preisangaben realistisch und sprachlich korrekt"),
    bullet("Mindestens ein Vergleich (guenstig / teuer / Angebot) oder Bewertung"),
    pItalic("Muster: Am Samstag bin ich mit meiner Mutter einkaufen gegangen. Zuerst waren wir in der Baeckerei und haben Broetchen gekauft. Dann sind wir in den Supermarkt gegangen. Ich habe Joghurt und Obst gekauft. Alles zusammen hat 9 Euro gekostet. Die Aepfel waren im Angebot — das war ein Schnaeppchen!"),
    empty(),

    h2("Grammatik-Zusammenfassung fuer Lehrkraft"),
    bullet("Akkusativ: einen (mask.) / eine (fem.) / ein (neutr.) bei kaufen, nehmen, haette gerne"),
    bullet("Ich haette gerne ... = Konjunktiv II von haben (hoefliche Bitte)"),
    bullet("Komparativ: teurer als / guenstiger als — Superlativ: am teuersten / am guenstigsten"),
    bullet("Perfekt Einkauf: kaufen -> gekauft, gehen -> gegangen, bezahlen -> bezahlt"),
    bullet("Praeposition + Dativ: in der Baeckerei, im Supermarkt, am Kiosk"),
    bullet("Taschengeld-Strukturen: spare auf + Akk., habe ausgegeben, bleibt uebrig"),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Abschluss: A2_Kinder Einkaufen");
console.log("Zielordner:", OUTPUT_DIR);
abschluss();
abschluss_L();
console.log("\nFertig! 2 Dateien erstellt.");
