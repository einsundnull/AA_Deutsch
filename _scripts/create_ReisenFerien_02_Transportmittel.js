"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "07_ReisenFerien", "02_Transportmittel");
const TOPIC     = "A2_Kinder_ReisenFerien_02_Transportmittel";
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

// ── Wortliste-Tabelle ─────────────────────────────────────────────────────────
function makeWortlisteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Transportmittel", { width: 2600 }), hCell("Artikel", { width: 800 }), hCell("mit + Dativ", { width: 2000 }), hCell("Beispielsatz", { width: 4238 })] }),
      new TableRow({ children: [dCell("das Auto"), dCell("das"), dCell("mit dem Auto"), dCell("Wir fahren mit dem Auto in den Urlaub.")] }),
      new TableRow({ children: [dCell("der Zug"), dCell("der"), dCell("mit dem Zug"), dCell("Ich fahre mit dem Zug nach Berlin.")] }),
      new TableRow({ children: [dCell("der Bus"), dCell("der"), dCell("mit dem Bus"), dCell("Mit dem Bus bin ich zur Schule gefahren.")] }),
      new TableRow({ children: [dCell("das Flugzeug"), dCell("das"), dCell("mit dem Flugzeug"), dCell("Mit dem Flugzeug fliegen wir nach Spanien.")] }),
      new TableRow({ children: [dCell("das Fahrrad"), dCell("das"), dCell("mit dem Fahrrad"), dCell("Ich fahre mit dem Fahrrad zum Park.")] }),
      new TableRow({ children: [dCell("das Schiff"), dCell("das"), dCell("mit dem Schiff"), dCell("Mit dem Schiff dauert die Reise laenger.")] }),
      new TableRow({ children: [dCell("die U-Bahn"), dCell("die"), dCell("mit der U-Bahn"), dCell("In Wien fahre ich mit der U-Bahn.")] }),
      new TableRow({ children: [dCell("die Strassenbahn"), dCell("die"), dCell("mit der Strassenbahn"), dCell("Die Strassenbahn haelt direkt vor dem Hotel.")] }),
      new TableRow({ children: [dCell("zu Fuss"), dCell("—"), dCell("zu Fuss (kein mit)"), dCell("Zum Baecker gehe ich immer zu Fuss.")] }),
      new TableRow({ children: [dCell("der Bahnhof (-hoefe)"), dCell("der"), dCell("—"), dCell("Wir treffen uns am Bahnhof um 9 Uhr.")] }),
      new TableRow({ children: [dCell("der Flughafen (-)"), dCell("der"), dCell("—"), dCell("Der Flughafen ist ausserhalb der Stadt.")] }),
      new TableRow({ children: [dCell("umsteigen"), dCell("—"), dCell("—"), dCell("In Muenchen muessen wir umsteigen.")] }),
      new TableRow({ children: [dCell("die Abfahrt / Ankunft"), dCell("die"), dCell("—"), dCell("Die Abfahrt ist um 8:15, die Ankunft um 11:30.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Transportmittel"), empty(),
    pBold("Aufgabe 1: Schreib Saetze mit 'mit + Dativ'."),
    pItalic("Muster: (Zug / Hamburg) → Wir fahren mit dem Zug nach Hamburg."),
    empty(),
    p("1. (Flugzeug / Paris)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("2. (Fahrrad / Schule)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("3. (U-Bahn / Stadtzentrum)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("4. (Schiff / Insel)  →  ______________________________________________"),
    writeLine(50), empty(), empty(),
    pBold("Aufgabe 2: Vergleiche zwei Transportmittel. Benutze schneller als / langsamer als / so schnell wie / guenstiger als / teurer als."),
    pItalic("Muster: Das Flugzeug ist schneller als der Zug."),
    empty(),
    p("1. Das Auto / das Fahrrad  →  ________________________________________________"),
    writeLine(50), empty(),
    p("2. Der Zug / der Bus  →  ________________________________________________"),
    writeLine(50), empty(),
    p("3. Das Flugzeug / das Schiff  →  ________________________________________________"),
    writeLine(50), empty(), empty(),
    pBold("Aufgabe 3: Dein Schulweg — schreib 4-5 Saetze."),
    p("Wie kommst du zur Schule? Wie lange dauert es? Faehrst du lieber mit dem Bus oder zu Fuss? Warum?"),
    empty(),
    ...writeLines(5, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Transportmittel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    bullet("1. Wir fliegen mit dem Flugzeug nach Paris. / Wir fahren mit dem Flugzeug nach Paris."),
    bullet("2. Ich fahre mit dem Fahrrad zur Schule."),
    bullet("3. Wir fahren mit der U-Bahn ins Stadtzentrum."),
    bullet("4. Wir fahren mit dem Schiff zur Insel."),
    pItalic("Dativ-Regel: mit + dem (maskulin/neutral) / mit + der (feminin). U-Bahn ist feminin → mit der U-Bahn."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("1. Das Auto ist schneller als das Fahrrad. / Das Fahrrad ist langsamer als das Auto."),
    bullet("2. Der Zug ist schneller als der Bus. / Der Zug ist teurer als der Bus."),
    bullet("3. Das Flugzeug ist schneller als das Schiff. / Das Schiff ist langsamer als das Flugzeug."),
    pItalic("Komparativ: schnell → schneller, langsam → langsamer, teuer → teurer, guenstig → guenstiger. Immer als nach dem Komparativ."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Ich fahre mit dem Bus zur Schule. Der Bus haelt direkt vor meinem Haus. Die Fahrt dauert etwa zehn Minuten. Ich fahre lieber mit dem Bus als zu Fuss, weil es schneller ist. Im Sommer fahre ich manchmal mit dem Fahrrad."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Transportmittel"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Eine lange Reise"),
          empty(),
          p("Letzten Sommer sind Clara und ihre Familie von Hamburg nach Lissabon gereist. Das war eine lange, aber spannende Reise!"),
          p("Zuerst sind sie mit dem Zug zum Flughafen Hamburg gefahren. Der Zug war voll, aber sie hatten gluecklicherweise Sitzplaetze reserviert. Am Flughafen mussten sie zwei Stunden warten — Claras kleiner Bruder fand das sehr langweilig und fragte alle zehn Minuten: 'Wann fliegen wir endlich?'"),
          p("Der Flug nach Lissabon hat ungefaehr zweieinhalb Stunden gedauert. Clara hat aus dem Fenster geschaut und die Wolken beobachtet. Beim Landen hat sie zum ersten Mal das Meer und die Stadt von oben gesehen — das war so aufregend!"),
          p("In Lissabon sind sie vom Flughafen mit der Metro ins Hotel gefahren. Die Metro war sehr modern und sauber. Ihr Hotel war direkt am Meer, und sie konnten von ihrem Zimmer aus den Atlantik sehen."),
          p("Am naechsten Tag haben sie die Stadt zu Fuss erkundet. Lissabon hat viele Huegel — Claras Beine haben am Abend geschmerzt! Aber es war wunderschoen."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Clara ist mit dem Auto zum Flughafen gefahren."), dCell("")] }),
        new TableRow({ children: [dCell("Sie haben am Flughafen zwei Stunden gewartet."), dCell("")] }),
        new TableRow({ children: [dCell("Der Flug hat mehr als drei Stunden gedauert."), dCell("")] }),
        new TableRow({ children: [dCell("Vom Flughafen zum Hotel sind sie mit der Metro gefahren."), dCell("")] }),
        new TableRow({ children: [dCell("Am naechsten Tag sind sie mit der Strassenbahn gefahren."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Welche Transportmittel hat die Familie auf der Reise benutzt? (alle nennen)"),
    writeLine(55), empty(),
    p("2. Warum hat Claras Bruder gefragt 'Wann fliegen wir endlich?'"),
    writeLine(55), empty(),
    p("3. Was hat Clara beim Landen gesehen?"),
    writeLine(55), empty(),
    p("4. Warum haben Claras Beine am Abend geschmerzt?"),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Transportmittel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Clara ist mit dem Auto zum Flughafen gefahren."), dCell("F (mit dem Zug)")] }),
        new TableRow({ children: [dCell("Sie haben am Flughafen zwei Stunden gewartet."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Flug hat mehr als drei Stunden gedauert."), dCell("F (ca. 2,5 Stunden)")] }),
        new TableRow({ children: [dCell("Vom Flughafen zum Hotel sind sie mit der Metro gefahren."), dCell("R")] }),
        new TableRow({ children: [dCell("Am naechsten Tag sind sie mit der Strassenbahn gefahren."), dCell("F (zu Fuss)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Zug, Flugzeug, Metro, zu Fuss"),
    bullet("2. Weil das Warten am Flughafen langweilig war."),
    bullet("3. Das Meer und die Stadt von oben."),
    bullet("4. Lissabon hat viele Huegel — sie waren den ganzen Tag zu Fuss unterwegs."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Transportmittel"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("dem Auto  -  der U-Bahn  -  dem Zug  -  dem Flugzeug  -  dem Fahrrad  -  Fuss  -  Bahnhof  -  Flughafen  -  umsteigen  -  schneller  -  dauert  -  Abfahrt  -  guenstiger")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze mit 'mit + Dativ' oder dem richtigen Wort."),
    empty(),
    p("1. Wir fliegen mit __________________ nach London."),
    p("2. In der Stadt fahre ich meistens mit __________________."),
    p("3. Zum Supermarkt fahre ich mit __________________ — das ist gut fuer die Umwelt!"),
    p("4. Die Reise mit dem Bus __________________ zwei Stunden."),
    p("5. Wir fahren mit __________________ bis Frankfurt, dann muessen wir __________________."),
    p("6. Den langen Weg zur Oma gehen wir zu __________________."),
    p("7. Das Flugzeug ist __________________ als der Zug, aber auch teurer."),
    p("8. Der Bus ist __________________ als das Taxi."),
    empty(),
    pBold("Teil 2: Wo bin ich? Ergaenze Bahnhof oder Flughafen."),
    empty(),
    p("a) 'Bitte begeben Sie sich zu Gate 14.' — Ich bin am __________________."),
    p("b) 'Der ICE nach Berlin faehrt auf Gleis 7 ab.' — Ich bin am __________________."),
    p("c) 'Bitte zeigen Sie Ihren Reisepass.' — Ich bin am __________________."),
    p("d) 'Die __________________ des Zuges ist um 14:22 Uhr.' — Ich bin am __________________."),
    empty(),
    pBold("Teil 3: Schreib selbst."),
    empty(),
    p("Ich fahre am liebsten mit __________________, weil __________________."),
    p("Ich fahre nicht so gerne mit __________________, weil __________________."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Transportmittel (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. dem Flugzeug"),
    bullet("2. der U-Bahn"),
    bullet("3. dem Fahrrad"),
    bullet("4. dauert"),
    bullet("5. dem Zug — umsteigen"),
    bullet("6. Fuss"),
    bullet("7. schneller"),
    bullet("8. guenstiger"),
    pItalic("Nicht verwendet (Ablenkwoerter): dem Auto, Bahnhof, Flughafen, Abfahrt"),
    empty(),
    pBold("Teil 2:"),
    bullet("a) Flughafen (Gate)"),
    bullet("b) Bahnhof (Gleis, ICE)"),
    bullet("c) Flughafen (Reisepass)"),
    bullet("d) Abfahrt — Bahnhof"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Ich fahre am liebsten mit dem Zug, weil ich dabei lesen kann und es bequem ist. Ich fahre nicht so gerne mit dem Bus, weil er oft zu voll ist."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Transportmittel"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Grammatik: mit + Dativ"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Artikel (Nominativ)", { width: 2400 }), hCell("mit + Dativ", { width: 2400 }), hCell("Beispiel", { width: 4838 })] }),
        new TableRow({ children: [dCell("der Zug (m.)"), dCell("mit dem Zug"), dCell("Ich fahre mit dem Zug.")] }),
        new TableRow({ children: [dCell("das Auto (n.)"), dCell("mit dem Auto"), dCell("Wir fahren mit dem Auto.")] }),
        new TableRow({ children: [dCell("die U-Bahn (f.)"), dCell("mit der U-Bahn"), dCell("Er faehrt mit der U-Bahn.")] }),
        new TableRow({ children: [dCell("Sonderfall: zu Fuss"), dCell("(kein Artikel)"), dCell("Ich gehe zu Fuss — kein 'mit'!")] }),
      ],
    }),
    empty(),
    pBold("Komparativ — Transportmittel vergleichen:"),
    bullet("schnell → schneller als  (Das Flugzeug ist schneller als der Zug.)"),
    bullet("langsam → langsamer als  (Das Fahrrad ist langsamer als das Auto.)"),
    bullet("teuer → teurer als  (Das Taxi ist teurer als der Bus.)"),
    bullet("guenstig → guenstiger als  (Der Bus ist guenstiger als das Flugzeug.)"),
    bullet("umweltfreundlich → umweltfreundlicher als  (Das Fahrrad ist umweltfreundlicher als das Auto.)"),
    empty(),
    pBold("Aufgabe: Schreib 4 Vergleichssaetze mit verschiedenen Transportmitteln."),
    ...writeLines(4, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Transportmittel (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("mit + Dativ: der → dem, das → dem, die → der (Plural: den). Kein Umlaut bei dem/der."),
    bullet("zu Fuss = Sonderfall ohne Artikel und ohne 'mit'. Haeufiger Fehler: 'mit dem Fuss' ist falsch."),
    bullet("fliegen vs. fahren: Mit dem Flugzeug 'fliegt' man, mit allen anderen Transportmitteln 'faehrt' man (oder geht zu Fuss)."),
    bullet("Perfekt: fahren/fliegen = sein + gefahren/geflogen (Bewegungsverben!)"),
    empty(),
    pBold("Loesung Aufgabe — Mustersaetze"),
    bullet("Der Zug ist schneller als der Bus."),
    bullet("Das Fahrrad ist guenstiger als das Auto."),
    bullet("Das Schiff ist langsamer als das Flugzeug."),
    bullet("Die U-Bahn ist umweltfreundlicher als das Taxi."),
    pItalic("Andere korrekte Vergleiche akzeptieren. Auf 'als' nach dem Komparativ achten."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Transportmittel"), empty(),
    pBold("Dialog 1: Wie kommst du dahin?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Tina"), dCell("Hey Jonas! Wie bist du heute zur Schule gekommen?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Mit dem Fahrrad. Es war so schoenes Wetter heute!")] }),
        new TableRow({ children: [dCell("Tina"), dCell("Cool! Ich nehme immer den Bus. Wie lange brauchst du mit dem Fahrrad?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ungefaehr 15 Minuten. Mit dem Bus dauert es laenger, glaube ich.")] }),
        new TableRow({ children: [dCell("Tina"), dCell("Ja, mit dem Bus brauche ich 20 Minuten — aber ich muss nicht treten!")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Haha, stimmt! Aber Fahrradfahren ist gesund und gut fuer die Umwelt.")] }),
        new TableRow({ children: [dCell("Tina"), dCell("Du hast Recht. Vielleicht probiere ich es morgen auch mal.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Am Bahnhof"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Entschuldigung! Wo faehrt der Zug nach Wien ab?")] }),
        new TableRow({ children: [dCell("Mann"), dCell("Der Zug nach Wien? Der faehrt auf Gleis 3 ab.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Danke! Und wann ist die Abfahrt?")] }),
        new TableRow({ children: [dCell("Mann"), dCell("Um 10:45 Uhr. Sie haben noch zehn Minuten.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Muss ich umsteigen?")] }),
        new TableRow({ children: [dCell("Mann"), dCell("Nein, das ist ein Direktzug. Sie kommen direkt in Wien an.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Super, vielen Dank!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Eigener Dialog — am Bahnhof oder Flughafen"),
    pItalic("Person A fragt nach dem richtigen Transportmittel / Gleis / Gate. Person B hilft. Mindestens 6 Zeilen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagst du?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Person A"), dCell("")] }),
        new TableRow({ children: [dCell("Person B"), dCell("")] }),
        new TableRow({ children: [dCell("Person A"), dCell("")] }),
        new TableRow({ children: [dCell("Person B"), dCell("")] }),
        new TableRow({ children: [dCell("Person A"), dCell("")] }),
        new TableRow({ children: [dCell("Person B"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Transportgewohnheiten"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie kommst du zur Schule?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Lieblingstransportmittel?"), dCell("")] }),
        new TableRow({ children: [dCell("Bist du schon mal mit dem Flugzeug geflogen?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist schneller: Bus oder Zug bei euch?"), dCell("")] }),
        new TableRow({ children: [dCell("Mit welchem Transportmittel bist du noch nie gefahren?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Transportmittel (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie bist du ... gekommen? = Perfekt mit sein (Bewegungsverb kommen)"),
    bullet("Ich nehme immer den Bus. = Akk. Obj. nach nehmen (den Bus = Akkusativ maskulin)"),
    bullet("Wie lange brauchst du mit dem Fahrrad? = mit + Dativ, Frage nach Dauer"),
    bullet("Mit dem Bus dauert es laenger. = Komparativ lang → laenger"),
    bullet("gut fuer die Umwelt = feste Wendung"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wo faehrt der Zug ... ab? = Frage nach Abfahrtsort (trennbares Verb abfahren)"),
    bullet("auf Gleis 3 = typische Bahnhofsphrase"),
    bullet("Wann ist die Abfahrt? = Frage nach Uhrzeit mit Substantiv"),
    bullet("Sie haben noch ... Minuten. = Restzeit angeben"),
    bullet("Muss ich umsteigen? = Modalverb muessen + trennbares Verb umsteigen"),
    bullet("ein Direktzug = kein Umsteigen noetig"),
    empty(),
    pBold("Bewertungskriterien eigener Dialog:"),
    bullet("Korrekte Frageform nach Ort/Zeit/Richtung"),
    bullet("mit + Dativ korrekt verwendet"),
    bullet("mindestens eine hoefliche Formel (Entschuldigung, Danke, Bitte)"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Transportmittel"), empty(),
    pBold("Aufgabe 1: Schreib das richtige Transportmittel unter jedes Bild."),
    p("[BILD 1: Sechs Bilder — Zug, Flugzeug, Fahrrad, U-Bahn, Schiff, Bus]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 1580 }), hCell("[Bild 2]", { width: 1580 }), hCell("[Bild 3]", { width: 1580 }), hCell("[Bild 4]", { width: 1580 }), hCell("[Bild 5]", { width: 1580 }), hCell("[Bild 6]", { width: 1738 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("mit ________"), dCell("mit ________"), dCell("mit ________"), dCell("mit ________"), dCell("mit ________"), dCell("mit ________")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Fahrplan lesen."),
    p("[BILD 2: Fahrplan-Ausschnitt — Strecke Hamburg–Muenchen. Drei Zuege: ICE 501 Abfahrt 07:15 Ankunft 11:42 (kein Umstieg). RE 24 Abfahrt 08:30 Ankunft 14:05 (Umstieg in Frankfurt). IC 88 Abfahrt 10:00 Ankunft 15:30 (kein Umstieg).]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Zug", { width: 1500 }), hCell("Abfahrt", { width: 1500 }), hCell("Ankunft", { width: 1500 }), hCell("Umstieg?", { width: 1800 }), hCell("Dauer", { width: 3338 })] }),
        new TableRow({ children: [dCell("ICE 501"), dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("RE 24"), dCell(""), dCell(""), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("IC 88"), dCell(""), dCell(""), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    p("1. Welcher Zug ist am schnellsten?  ____________________"),
    p("2. Welcher Zug muss umsteigen?  ____________________"),
    p("3. Du faehrst um 10 Uhr ab. Wann kommst du an?  ____________________"),
    empty(),
    pBold("Aufgabe 3: Zeichne deinen Schulweg und beschreibe ihn."),
    p("[BILD 3: Leere Karte mit Startpunkt 'Mein Haus' und Zielpunkt 'Schule']"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Mein Schulweg:"), empty(), empty(), empty()],
      })]})],
    }),
    empty(),
    p("Ich fahre mit __________________ zur Schule."),
    p("Die Fahrt dauert __________________ Minuten."),
    p("Ich __________________, weil __________________."),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Transportmittel (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Transportmittel (abhaengig von Bildreihenfolge)"),
    pItalic("Loesungen je nach eingesetzten Bildern: Zug / mit dem Zug, Flugzeug / mit dem Flugzeug, Fahrrad / mit dem Fahrrad, U-Bahn / mit der U-Bahn, Schiff / mit dem Schiff, Bus / mit dem Bus."),
    pItalic("Auf korrekte Dativformen achten: mit dem (m./n.) vs. mit der (f.)."),
    empty(),
    pBold("Aufgabe 2: Fahrplan"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Zug", { width: 1500 }), hCell("Abfahrt", { width: 1500 }), hCell("Ankunft", { width: 1500 }), hCell("Umstieg?", { width: 1800 }), hCell("Dauer", { width: 3338 })] }),
        new TableRow({ children: [dCell("ICE 501"), dCell("07:15"), dCell("11:42"), dCell("Nein"), dCell("4 Std. 27 Min.")] }),
        new TableRow({ children: [dCell("RE 24"), dCell("08:30"), dCell("14:05"), dCell("Ja (Frankfurt)"), dCell("5 Std. 35 Min.")] }),
        new TableRow({ children: [dCell("IC 88"), dCell("10:00"), dCell("15:30"), dCell("Nein"), dCell("5 Std. 30 Min.")] }),
      ],
    }),
    bullet("1. Der ICE 501 ist am schnellsten (4 Std. 27 Min.)."),
    bullet("2. Der RE 24 muss umsteigen (in Frankfurt)."),
    bullet("3. Abfahrt 10:00 mit IC 88 → Ankunft 15:30 Uhr."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Bewertung: mit + korrekte Dativform, Zeitangabe, Begruendung. Zeichnung optional."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Transportmittel");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
