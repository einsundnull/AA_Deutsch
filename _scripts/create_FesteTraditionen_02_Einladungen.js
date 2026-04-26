"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "06_FesteTraditionen", "02_Einladungen");
const TOPIC     = "A2_Kinder_FesteTraditionen_02_Einladungen";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Typ", { width: 1600 }), hCell("Beispielsatz", { width: 5238 })] }),
      new TableRow({ children: [dCell("die Einladung (-en)"), dCell("Nomen"), dCell("Ich schreibe eine Einladung fuer meine Party.")] }),
      new TableRow({ children: [dCell("einladen"), dCell("Verb (trennbar)"), dCell("Ich lade dich herzlich zu meiner Feier ein.")] }),
      new TableRow({ children: [dCell("Hiermit lade ich dich ein zu ..."), dCell("Formel"), dCell("Hiermit lade ich dich ein zu meinem Geburtstag!")] }),
      new TableRow({ children: [dCell("Ich komme gerne!"), dCell("Zusage"), dCell("Toll, danke fuer die Einladung! Ich komme gerne.")] }),
      new TableRow({ children: [dCell("Ich kann leider nicht kommen."), dCell("Absage"), dCell("Es tut mir leid, ich kann leider nicht kommen.")] }),
      new TableRow({ children: [dCell("Ich wuerde gerne kommen, aber ..."), dCell("Absage (hoeflich)"), dCell("Ich wuerde gerne kommen, aber ich bin krank.")] }),
      new TableRow({ children: [dCell("Vielleicht"), dCell("Adverb"), dCell("Ich weiss noch nicht, vielleicht komme ich.")] }),
      new TableRow({ children: [dCell("die Feier (-n)"), dCell("Nomen"), dCell("Die Feier beginnt um 16 Uhr.")] }),
      new TableRow({ children: [dCell("die Uhrzeit"), dCell("Nomen"), dCell("Bitte komm puenktlich zur Uhrzeit.")] }),
      new TableRow({ children: [dCell("der Ort (-e)"), dCell("Nomen"), dCell("Der Ort der Feier ist bei uns zu Hause.")] }),
      new TableRow({ children: [dCell("Bitte antworte bis ..."), dCell("Formel"), dCell("Bitte antworte bis Freitag, ob du kommst.")] }),
      new TableRow({ children: [dCell("Herzliche Grueße"), dCell("Schluss"), dCell("Herzliche Grueße, deine Emma")] }),
      new TableRow({ children: [dCell("Bis bald!"), dCell("Schluss"), dCell("Ich freue mich auf dich! Bis bald!")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Einladungen"), empty(),
    pBold("Aufgabe 1: Schreib eine Einladung. Benutze die Informationen unten."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          p("Name: Ben  |  Fest: Geburtstag  |  Datum: Samstag, 15. Maerz  |  Uhrzeit: 14 Uhr"),
          p("Ort: Gartenstrasse 7, bei Ben zu Hause  |  Programm: Spiele, Pizza, Kuchen  |  Antwort bis: Mittwoch"),
        ],
      })]})],
    }),
    empty(),
    pBold("Strukturhilfe fuer die Einladung:"),
    pItalic("Anrede: Liebe ... / Lieber ..."),
    pItalic("Einleitung: Hiermit lade ich dich ein zu ..."),
    pItalic("Infos: Wann? / Wo? / Was?"),
    pItalic("Bitte antworten: Bitte antworte bis ..."),
    pItalic("Abschluss: Bis bald! / Ich freue mich! / Herzliche Grueße, ..."),
    empty(),
    ...writeLines(8, 55),
    empty(),
    pBold("Aufgabe 2: Schreib zwei Antworten auf diese Einladung."),
    pItalic("Antwort 1: Du kannst kommen (Zusage). Antwort 2: Du kannst nicht kommen (Absage)."),
    empty(),
    pBold("Antwort 1 (Zusage):"),
    ...writeLines(4, 55),
    pBold("Antwort 2 (Absage):"),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 3: Deine eigene Einladung."),
    p("Denk dir ein Fest aus (Geburtstag, Weihnachten, Silvesterparty, ...) und schreib eine eigene Einladung an eine Freundin oder einen Freund."),
    empty(),
    ...writeLines(7, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Einladungen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Liebe Lea,"),
          p("hiermit lade ich dich herzlich zu meinem Geburtstag ein!"),
          p("Wann: Samstag, 15. Maerz, um 14 Uhr"),
          p("Wo: Gartenstrasse 7, bei mir zu Hause"),
          p("Was: Wir spielen Spiele, essen Pizza und Kuchen — ich freue mich!"),
          p("Bitte antworte bis Mittwoch."),
          empty(),
          p("Bis bald und herzliche Grueße,"),
          p("dein Ben"),
        ],
      })]})],
    }),
    pItalic("Auf korrekte trennbare Verben achten: einladen -> lade ... ein; antworten ist nicht trennbar."),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    pBold("Zusage:"),
    pItalic("Lieber Ben, vielen Dank fuer die Einladung! Ich komme sehr gerne. Ich freue mich schon! Bis Samstag! Herzliche Grueße, Lea"),
    empty(),
    pBold("Absage:"),
    pItalic("Lieber Ben, vielen Dank fuer die Einladung. Es tut mir wirklich leid, aber ich kann leider nicht kommen — ich bin krank. Ich wuensche dir trotzdem einen schoenen Geburtstag! Herzliche Grueße, Lea"),
    pItalic("Hinweis: Absagen immer mit Entschuldigung und Begruendung bewerten."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Mindestanforderungen: Anrede, Einladungsformel mit Hiermit / Ich lade dich ein, Angabe von Datum + Ort, Abschlussgruss."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Einladungen"), empty(),
    pBold("Text 1: Eine Einladung"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Liebe Sara,"),
          empty(),
          p("ich feiere am Freitag, 20. Juni, meine Abschlussparty! Wir sind fertig mit dem Schuljahr — das muss gefeiert werden!"),
          p("Die Party beginnt um 16 Uhr bei mir zu Hause (Bergweg 3). Meine Eltern machen Grillen im Garten. Wir spielen Spiele, hoeren Musik und tanzen. Am Abend gibt es auch Kuchen."),
          p("Bitte bring deine gute Laune mit! Ein Geschenk brauchst du nicht — deine Anwesenheit ist genug."),
          p("Bitte sag mir bis Dienstag, ob du kommst, damit ich weiss, fuer wie viele Personen wir planen muessen."),
          empty(),
          p("Ich freue mich sehr auf dich!"),
          p("Herzliche Grueße, deine Mia"),
        ],
      })]})],
    }),
    empty(),
    pBold("Text 2: Die Antwort"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Liebe Mia,"),
          empty(),
          p("vielen Dank fuer deine Einladung! Ich komme sehr gerne zu deiner Party."),
          p("Ich freue mich schon so auf das Grillen und Tanzen! Kann ich vielleicht einen Obstsalat mitbringen? Den mache ich immer besonders gerne."),
          p("Bis Freitag!"),
          empty(),
          p("Herzliche Grueße, deine Sara"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Party ist am Donnerstag."), dCell("")] }),
        new TableRow({ children: [dCell("Mias Eltern grillen im Garten."), dCell("")] }),
        new TableRow({ children: [dCell("Sara muss ein Geschenk mitbringen."), dCell("")] }),
        new TableRow({ children: [dCell("Sara sagt die Einladung ab."), dCell("")] }),
        new TableRow({ children: [dCell("Sara moechte einen Obstsalat mitbringen."), dCell("")] }),
        new TableRow({ children: [dCell("Mia braucht Saras Antwort bis Dienstag."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Warum feiert Mia eine Party?"),
    writeLine(55), empty(),
    p("2. Was passiert alles bei der Party?"),
    writeLine(55), empty(),
    p("3. Was fragt Sara in ihrer Antwort?"),
    writeLine(55), empty(),
    p("4. Finde im Text 3 hoefliche Formulierungen und schreibe sie auf."),
    writeLine(55), writeLine(55), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Einladungen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Die Party ist am Donnerstag."), dCell("F (am Freitag)")] }),
        new TableRow({ children: [dCell("Mias Eltern grillen im Garten."), dCell("R")] }),
        new TableRow({ children: [dCell("Sara muss ein Geschenk mitbringen."), dCell("F (kein Geschenk noetig)")] }),
        new TableRow({ children: [dCell("Sara sagt die Einladung ab."), dCell("F (sie sagt zu)")] }),
        new TableRow({ children: [dCell("Sara moechte einen Obstsalat mitbringen."), dCell("R")] }),
        new TableRow({ children: [dCell("Mia braucht Saras Antwort bis Dienstag."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Das Schuljahr ist beendet — sie feiert den Abschluss."),
    bullet("2. Grillen, Spiele spielen, Musik hoeren, tanzen, Kuchen essen."),
    bullet("3. Ob sie einen Obstsalat mitbringen kann."),
    bullet("4. Z. B.: 'Ich freue mich sehr auf dich!', 'Vielen Dank fuer deine Einladung!', 'Ich komme sehr gerne.'"),
    pItalic("Andere korrekte hoefliche Formulierungen akzeptieren."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Einladungen"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("einladen  -  komme  -  Einladung  -  leider  -  herzlich  -  Ort  -  Uhrzeit  -  antworte  -  Grueße  -  Feier  -  freue  -  gerne  -  mitbringen  -  Hiermit")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Einladung."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Lieber Tom,"),
          empty(),
          p("__________________ lade ich dich __________________ zu meiner Weihnachts-__________________ ein!"),
          p("Die __________________ beginnt am Samstag, 21. Dezember, um 17 Uhr."),
          p("__________________: Bei mir zu Hause, Blumenweg 4."),
          p("Bitte __________________ bis Donnerstag, ob du kommst."),
          p("Du musst nichts __________________ — ich mache alles selbst!"),
          empty(),
          p("Ich __________________ mich sehr auf dich!"),
          p("Herzliche __________________, deine Clara"),
        ],
      })]})],
    }),
    empty(),
    pBold("Teil 2: Ergaenze die Antworten."),
    empty(),
    p("Antwort 1 (Zusage): Liebe Clara, vielen Dank fuer die __________________! Ich __________________ sehr __________________."),
    p("Bis Samstag! Herzliche __________________, Tom"),
    empty(),
    p("Antwort 2 (Absage): Liebe Clara, es tut mir leid, ich kann __________________ nicht kommen — ich bin krank."),
    p("Ich wuensche dir eine schoene Feier! Herzliche __________________, Tom"),
    empty(),
    pBold("Teil 3: Schreib selbst."),
    empty(),
    p("Du bekommst eine Einladung zu einer Osterparty. Schreib eine Zusage (3-4 Saetze)."),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Einladungen (LOESUNG)"), empty(),
    pBold("Teil 1: Einladung"),
    bullet("Hiermit — herzlich — Feier"),
    bullet("Feier (beginnt ...)"),
    bullet("Ort"),
    bullet("antworte"),
    bullet("mitbringen"),
    bullet("freue"),
    bullet("Grueße"),
    pItalic("Nicht verwendet: komme, leider, gerne, Einladung, Uhrzeit (Ablenkwoerter fuer Teil 2)"),
    empty(),
    pBold("Teil 2: Antworten"),
    bullet("Zusage: Einladung — komme — gerne — Grueße"),
    bullet("Absage: leider — Grueße"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Liebe ..., vielen Dank fuer die Einladung zu deiner Osterparty! Ich komme sehr gerne. Ich freue mich schon auf euch! Bis dann! Herzliche Grueße, ..."),
    pItalic("Auf 'komme gerne' und Schlussgruss achten."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Einladungen"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Aufbau einer Einladung — Strukturtabelle:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Teil", { width: 2000 }), hCell("Inhalt", { width: 3000 }), hCell("Beispiel", { width: 4638 })] }),
        new TableRow({ children: [dCell("Anrede"), dCell("Wer wird eingeladen?"), dCell("Liebe Sarah, / Lieber Max,")] }),
        new TableRow({ children: [dCell("Einladungsformel"), dCell("Warum schreibe ich?"), dCell("Hiermit lade ich dich herzlich ein zu ...")] }),
        new TableRow({ children: [dCell("Wann?"), dCell("Datum + Uhrzeit"), dCell("Am Samstag, 5. April, um 15 Uhr")] }),
        new TableRow({ children: [dCell("Wo?"), dCell("Ort und Adresse"), dCell("Bei mir zu Hause, Hauptstrasse 3")] }),
        new TableRow({ children: [dCell("Was?"), dCell("Programm"), dCell("Wir spielen Spiele und essen Kuchen.")] }),
        new TableRow({ children: [dCell("Bitte antworten"), dCell("Frist"), dCell("Bitte antworte bis Freitag.")] }),
        new TableRow({ children: [dCell("Abschluss"), dCell("Gruss"), dCell("Herzliche Grueße / Bis bald! / deine ...")] }),
      ],
    }),
    empty(),
    h2("Unterschied Zusage / Absage"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Zusage (= ich komme)", { width: 4500 }), hCell("Absage (= ich komme nicht)", { width: 4900 })] }),
        new TableRow({ children: [dCell("Ich komme gerne!"), dCell("Ich kann leider nicht kommen.")] }),
        new TableRow({ children: [dCell("Vielen Dank — ich freue mich!"), dCell("Es tut mir leid, aber ...")] }),
        new TableRow({ children: [dCell("Ich bin dabei!"), dCell("Ich wuerde gerne kommen, aber ich bin krank.")] }),
        new TableRow({ children: [dCell("Bis Samstag!"), dCell("Ich wuensche dir trotzdem viel Spass!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib je 2 Saetze fuer eine Zusage und eine Absage."),
    ...writeLines(4, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Einladungen (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Grammatikhinweise fuer die Lehrkraft:"),
    bullet("einladen ist trennbar: Ich lade dich ein. (Praesens) — Ich habe dich eingeladen. (Perfekt)"),
    bullet("Konjunktiv II: Ich wuerde gerne kommen, aber ... (hoefliche Absage, Niveau A2 passiv kennen)"),
    bullet("Modalverb koennen: Ich kann (nicht) kommen — typische Absage-Konstruktion"),
    bullet("leider steht nach dem Verb oder am Satzanfang: Ich kann leider nicht kommen. / Leider kann ich nicht kommen."),
    empty(),
    pBold("Loesung Aufgabe — Musterloesung:"),
    bullet("Zusage: Ich komme sehr gerne! / Vielen Dank — ich freue mich schon!"),
    bullet("Absage: Ich kann leider nicht kommen — ich habe einen anderen Termin. / Es tut mir leid, ich bin leider krank."),
    pItalic("Individuelle Formulierungen akzeptieren, wenn die Intention klar ist."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Einladungen"), empty(),
    pBold("Dialog 1: Am Telefon — Einladung annehmen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Nora"), dCell("Hallo Leo! Ich mache am Samstag eine Geburtstagsparty. Kannst du kommen?")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Oh, wie toll! Gerne! Wann genau beginnt die Party?")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Um 14 Uhr bei mir zu Hause. Weisst du, wo ich wohne?")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Ja, ich weiss es! Muss ich etwas mitbringen?")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Nein, danke — ich habe alles vorbereitet. Komm einfach so!")] }),
        new TableRow({ children: [dCell("Leo"), dCell("Super! Ich freue mich schon. Bis Samstag!")] }),
        new TableRow({ children: [dCell("Nora"), dCell("Bis dann! Herzliche Grueße!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Einladung absagen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Emma"), dCell("Hallo Jonas! Kommst du am Freitag zu meiner Feier?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Oh Emma, es tut mir wirklich leid — ich kann leider nicht kommen.")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Schade! Warum denn nicht?")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Ich muss am Freitag zum Zahnarzt. Das hatte ich vergessen.")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Das ist bloed. Kein Problem — ich lade dich naechstes Mal wieder ein!")] }),
        new TableRow({ children: [dCell("Jonas"), dCell("Danke, das ist sehr nett von dir. Ich wuensche euch viel Spass!")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Eigener Dialog — Einladung und Antwort"),
    pItalic("Person A laedt Person B zu einem Fest ein (Geburtstag, Weihnachten, Osterparty, ...)."),
    pItalic("Person B sagt zu oder ab und erklaaert warum. Benutzt mindestens 6 Zeilen."),
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
    pBold("Partnerinterview: Einladungsgewohnheiten"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Zu welchem Fest laeadst du am liebsten ein?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie viele Personen laeadst du ein?"), dCell("")] }),
        new TableRow({ children: [dCell("Was muss bei einer guten Party dabei sein?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du, wenn du absagen musst?"), dCell("")] }),
        new TableRow({ children: [dCell("Was bringst du mit, wenn du eingeladen bist?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Einladungen (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Kannst du kommen? = Einladung als Frage mit Modalverb koennen"),
    bullet("Wann genau beginnt die Party? = W-Frage nach Zeit"),
    bullet("Muss ich etwas mitbringen? = Modalverb muessen als hoefliche Frage"),
    bullet("Komm einfach so! = Imperativ + einfach (beruhigende Ergaenzung)"),
    bullet("Bis Samstag! = typische Verabschiedung mit Zeitangabe"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Es tut mir wirklich leid = betonte Entschuldigung"),
    bullet("Ich kann leider nicht kommen = koennen + leider + Negation"),
    bullet("Ich muss zum Zahnarzt = muessen + Ortsangabe"),
    bullet("Das hatte ich vergessen. = Plusquamperfekt (passiv kennen auf A2)"),
    bullet("Ich lade dich naechstes Mal wieder ein! = trennbares Verb einladen mit Zeitangabe"),
    empty(),
    pBold("Bewertungskriterien eigener Dialog:"),
    bullet("Korrekte Einladungsformel / Frage, ob die Person kommen kann"),
    bullet("Klare Zusage oder Absage mit Begruendung"),
    bullet("Mindestens eine hoefliche Formulierung (Danke, Es tut mir leid, Ich freue mich)"),
    bullet("Abschlussgruss am Ende"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Einladungen"), empty(),
    pBold("Aufgabe 1: Lies die Einladungskarte und beantworte die Fragen."),
    p("[BILD 1: Einladungskarte mit Dekoration — Text: 'Einladung! Komm zu meiner Osterparty! Wann: Samstag, 12. April, 15 Uhr. Wo: Im Garten, Lindenstrasse 9. Was: Ostereier suchen, Spiele, Buffet. Bitte antworte bis Mittwoch. Deine Luisa']"),
    empty(),
    p("1. Zu welchem Fest wird eingeladen?  ____________________"),
    p("2. Wann beginnt die Feier?  ____________________"),
    p("3. Wo findet sie statt?  ____________________"),
    p("4. Was kann man bei der Feier machen?  ____________________"),
    p("5. Bis wann muss man antworten?  ____________________"),
    empty(),
    pBold("Aufgabe 2: Zusage oder Absage? Lies die Antworten und schreib 'Zusage' oder 'Absage'."),
    p("[BILD 2: Drei kurze Antwort-Zettel mit Symbolen (Haekchen / X):]"),
    p("[Zettel A: 'Liebe Luisa, ich komme sehr gerne! Ich freue mich! Herzliche Grueße, Tom']"),
    p("[Zettel B: 'Liebe Luisa, leider kann ich nicht kommen — ich bin bei Oma. Schade! Deine Mia']"),
    p("[Zettel C: 'Liebe Luisa, ich weiss es noch nicht. Vielleicht komme ich. Deine Jana']"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Antwort", { width: 2000 }), hCell("Zusage / Absage / Unsicher", { width: 7638 })] }),
        new TableRow({ children: [dCell("Zettel A"), dCell("")] }),
        new TableRow({ children: [dCell("Zettel B"), dCell("")] }),
        new TableRow({ children: [dCell("Zettel C"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Schreib eine Antwort auf Luisas Einladung."),
    pItalic("Du kannst kommen. Schreib eine Zusage in 3-4 Saetzen."),
    ...writeLines(4, 55),
    empty(),
    pBold("Aufgabe 4: Gestalte deine eigene Einladungskarte."),
    p("[BILD 3: Vorlage einer leeren Einladungskarte mit Feldern: Anlass, Wann?, Wo?, Was?, Bitte antworte bis ...]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Einladung!", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Anlass: ____________________", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Wann: ____________________", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Wo: ____________________", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Was: ____________________", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Bitte antworte bis: ____________________", { width: PAGE_W - 2 * MARGIN })] }),
        new TableRow({ children: [dCell("Herzliche Grueße, ____________________", { width: PAGE_W - 2 * MARGIN })] }),
      ],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Einladungen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Antworten"),
    bullet("1. Osterparty"),
    bullet("2. Samstag, 12. April, um 15 Uhr"),
    bullet("3. Im Garten, Lindenstrasse 9"),
    bullet("4. Ostereier suchen, Spiele spielen, Buffet"),
    bullet("5. Bis Mittwoch"),
    empty(),
    pBold("Aufgabe 2: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Antwort", { width: 2000 }), hCell("Zusage / Absage / Unsicher", { width: 7638 })] }),
        new TableRow({ children: [dCell("Zettel A"), dCell("Zusage")] }),
        new TableRow({ children: [dCell("Zettel B"), dCell("Absage")] }),
        new TableRow({ children: [dCell("Zettel C"), dCell("Unsicher (vielleicht)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Musterloesung"),
    pItalic("Liebe Luisa, vielen Dank fuer deine Einladung! Ich komme sehr gerne zu deiner Osterparty. Ostereier suchen macht mir so viel Spass! Bis Samstag! Herzliche Grueße, ..."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: alle Pflichtfelder ausgefuellt (Anlass, Wann, Wo), mindestens ein Programmhinweis, Abschlussgruss."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Einladungen schreiben und beantworten");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
