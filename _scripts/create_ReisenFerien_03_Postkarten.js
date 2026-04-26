"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "07_ReisenFerien", "03_Postkarten");
const TOPIC     = "A2_Kinder_ReisenFerien_03_Postkarten";
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

function postkarteBox(lines) {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, right: { style: BorderStyle.SINGLE, size: 4, color: BLUE } },
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      children: lines,
    })]})],
  });
}

// ── Wortliste-Tabelle ─────────────────────────────────────────────────────────
function makeWortlisteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Ausdruck", { width: 3000 }), hCell("Funktion", { width: 1800 }), hCell("Beispiel", { width: 4838 })] }),
      new TableRow({ children: [dCell("Viele Gruesse aus ...!"), dCell("Eroefffnung"), dCell("Viele Gruesse aus Rom! / Herzliche Gruesse aus Italien!")] }),
      new TableRow({ children: [dCell("Hier ist es wunderschoen."), dCell("Ort beschreiben"), dCell("Hier ist es wunderschoen — ich liebe es!")] }),
      new TableRow({ children: [dCell("Das Wetter ist super / schlecht."), dCell("Wetter"), dCell("Das Wetter ist super! Die Sonne scheint jeden Tag.")] }),
      new TableRow({ children: [dCell("Wir haben ... gemacht."), dCell("Aktivitaet"), dCell("Wir haben heute eine Bootsfahrt gemacht.")] }),
      new TableRow({ children: [dCell("Ich vermisse dich / euch."), dCell("Gefuehl"), dCell("Ich vermisse dich, aber es ist so schoen hier!")] }),
      new TableRow({ children: [dCell("Das Essen ist / war lecker."), dCell("Bewertung"), dCell("Das Essen hier ist unglaublich lecker!")] }),
      new TableRow({ children: [dCell("Morgen fahren wir ..."), dCell("Planung"), dCell("Morgen fahren wir mit dem Boot zur Insel.")] }),
      new TableRow({ children: [dCell("Ich wuensche dir ..."), dCell("Wunsch"), dCell("Ich wuensche dir eine schoene Woche!")] }),
      new TableRow({ children: [dCell("Bis bald!"), dCell("Abschluss"), dCell("Bis bald — ich freue mich schon auf zu Hause!")] }),
      new TableRow({ children: [dCell("Herzliche Gruesse / Liebe Gruesse"), dCell("Abschluss"), dCell("Herzliche Gruesse, deine Lena")] }),
      new TableRow({ children: [dCell("die Briefmarke (-n)"), dCell("Nomen"), dCell("Ich habe eine Briefmarke auf die Postkarte geklebt.")] }),
      new TableRow({ children: [dCell("der Absender"), dCell("Nomen"), dCell("Der Absender steht oben links auf dem Umschlag.")] }),
      new TableRow({ children: [dCell("die Adresse (-n)"), dCell("Nomen"), dCell("Ich schreibe die Adresse meiner Oma auf die Postkarte.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Postkarten"), empty(),
    pBold("Aufgabe 1: Bringe die Teile einer Postkarte in die richtige Reihenfolge."),
    pItalic("Schreib die Nummern 1–6 in die Kaestchen (1 = erster Teil, 6 = letzter Teil)."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Postkartenteil", { width: 8000 }), hCell("Nr.", { width: 1638 })] }),
        new TableRow({ children: [dCell("Herzliche Gruesse, deine Sofia"), dCell("")] }),
        new TableRow({ children: [dCell("Liebe Oma,"), dCell("")] }),
        new TableRow({ children: [dCell("Ich vermisse dich! Bis naechste Woche."), dCell("")] }),
        new TableRow({ children: [dCell("Das Wetter ist super — jeden Tag Sonne!"), dCell("")] }),
        new TableRow({ children: [dCell("Viele Gruesse aus Griechenland!"), dCell("")] }),
        new TableRow({ children: [dCell("Wir waren heute am Strand und haben geschnorchelt."), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib eine Postkarte. Benutze die Informationen unten."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          p("Du bist: in Schweden, am See  |  Wetter: kuehl, aber sonnig"),
          p("Aktivitaet gestern: Kanu gefahren, Fische gesehen  |  Aktivitaet morgen: Wanderung"),
          p("An wen: dein Freund / deine Freundin Tom / Anna"),
        ],
      })]})],
    }),
    empty(),
    postkarteBox([
      p("Liebe(r) ____________________,"),
      empty(),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      empty(),
      p("____________________,"),
      p("deine(r) ____________________"),
    ]),
    empty(), empty(),
    pBold("Aufgabe 3: Erfinde selbst eine Postkarte."),
    p("Du bist irgendwo im Urlaub (real oder erfunden). Schreib eine Postkarte an deine Klasse (6-7 Saetze)."),
    empty(),
    postkarteBox([
      p("Liebe Klasse,"),
      empty(),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      writeLine(52),
      empty(),
      p("Herzliche Gruesse, ____________________"),
    ]),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Postkarten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Reihenfolge"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Postkartenteil", { width: 8000 }), hCell("Nr.", { width: 1638 })] }),
        new TableRow({ children: [dCell("Herzliche Gruesse, deine Sofia"), dCell("6")] }),
        new TableRow({ children: [dCell("Liebe Oma,"), dCell("2")] }),
        new TableRow({ children: [dCell("Ich vermisse dich! Bis naechste Woche."), dCell("5")] }),
        new TableRow({ children: [dCell("Das Wetter ist super — jeden Tag Sonne!"), dCell("4")] }),
        new TableRow({ children: [dCell("Viele Gruesse aus Griechenland!"), dCell("1")] }),
        new TableRow({ children: [dCell("Wir waren heute am Strand und haben geschnorchelt."), dCell("3")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    postkarteBox([
      p("Lieber Tom,"),
      empty(),
      p("viele Gruesse aus Schweden! Wir sind an einem wunderschoenen See. Das Wetter ist kuehl, aber die Sonne scheint."),
      p("Gestern sind wir Kanu gefahren und haben viele Fische im klaren Wasser gesehen. Das war so toll!"),
      p("Morgen machen wir eine lange Wanderung durch den Wald."),
      p("Ich wuensche dir eine schoene Woche!"),
      empty(),
      p("Herzliche Gruesse, deine(r) ..."),
    ]),
    pItalic("Pflichtteile: Gruesse aus + Ort, Anrede, Wetter, mindestens eine Aktivitaet im Perfekt, Zukunftsplan, Abschlussgruss."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Mindestanforderungen: Ort angeben, Wetter oder Ort beschreiben, eine Aktivitaet im Perfekt, Wunsch oder Vermissens-Ausdruck, Abschlussgruss."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Postkarten"), empty(),
    pBold("Lies die drei Postkarten."), empty(),
    pBold("Postkarte 1:"),
    postkarteBox([
      p("Liebe Familie,"),
      p("viele Gruesse aus Barcelona! Die Stadt ist unglaublich — bunte Gebaeude, leckeres Essen und Musik ueberall. Gestern haben wir das beruehmt Sagrada Familia besucht. Das war beeindruckend! Das Wetter ist warm und sonnig — genau richtig. Wir vermissen euch, aber es ist so schoen hier. Bis Samstag!"),
      p("Eure Pia"),
    ]),
    empty(),
    pBold("Postkarte 2:"),
    postkarteBox([
      p("Lieber Max,"),
      p("Gruesse aus den oesterreichischen Alpen! Wir sind jeden Tag gewandert — meine Beine sind muede, aber die Aussicht war wunderschoen. Gestern haben wir sogar einen Adler gesehen! Das Wetter ist kuehl, aber die Sonne scheint. Heute Abend essen wir Kaesespaetzle — ich bin gespannt. Ich wuensche dir eine schoene Woche!"),
      p("Dein Felix"),
    ]),
    empty(),
    pBold("Postkarte 3:"),
    postkarteBox([
      p("Liebe Lehrerin Frau Braun,"),
      p("herzliche Gruesse aus Japan! Ich bin mit meinen Eltern in Tokio. Alles hier ist so anders — die Schrift, das Essen, die Menschen. Gestern haben wir einen alten Tempel besucht und Sushi gegessen. Das war koestlich! Morgen fahren wir mit dem Shinkansen nach Kyoto — der Hochgeschwindigkeitszug faehrt 300 km/h! Ich freue mich schon!"),
      p("Herzliche Gruesse, Ihre Schuele rin Nora"),
    ]),
    empty(),
    pBold("Aufgabe 1: Welche Postkarte passt? Schreib 1, 2 oder 3."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 8000 }), hCell("Nr.", { width: 1638 })] }),
        new TableRow({ children: [dCell("Der Schreiber / die Schreiberin hat einen alten Tempel besucht."), dCell("")] }),
        new TableRow({ children: [dCell("Das Wetter ist warm und sonnig."), dCell("")] }),
        new TableRow({ children: [dCell("Morgen gibt es eine Zugreise mit sehr hoher Geschwindigkeit."), dCell("")] }),
        new TableRow({ children: [dCell("Der Schreiber hat einen Adler gesehen."), dCell("")] }),
        new TableRow({ children: [dCell("Die Familie wird am Samstag zurueckkehren."), dCell("")] }),
        new TableRow({ children: [dCell("Der Schreiber / die Schreiberin schreibt an eine Lehrerin."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wo ist Pia? Was hat sie gestern besucht?"),
    writeLine(55), empty(),
    p("2. Was hat Felix in den Alpen gemacht? Was hat ihn besonders beeindruckt?"),
    writeLine(55), empty(),
    p("3. Welches Transportmittel nimmt Nora nach Kyoto? Was ist besonders daran?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Postkarte gefaellt dir am besten? Schreib 2-3 Saetze."),
    writeLine(55), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Postkarten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 8000 }), hCell("Nr.", { width: 1638 })] }),
        new TableRow({ children: [dCell("Der Schreiber / die Schreiberin hat einen alten Tempel besucht."), dCell("3 (Nora)")] }),
        new TableRow({ children: [dCell("Das Wetter ist warm und sonnig."), dCell("1 (Pia)")] }),
        new TableRow({ children: [dCell("Morgen gibt es eine Zugreise mit sehr hoher Geschwindigkeit."), dCell("3 (Nora)")] }),
        new TableRow({ children: [dCell("Der Schreiber hat einen Adler gesehen."), dCell("2 (Felix)")] }),
        new TableRow({ children: [dCell("Die Familie wird am Samstag zurueckkehren."), dCell("1 (Pia)")] }),
        new TableRow({ children: [dCell("Der Schreiber / die Schreiberin schreibt an eine Lehrerin."), dCell("3 (Nora)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Pia ist in Barcelona. Sie hat die Sagrada Familia besucht."),
    bullet("2. Felix hat jeden Tag gewandert. Besonders beeindruckend war ein Adler, den er gesehen hat (und die Aussicht)."),
    bullet("3. Nora nimmt den Shinkansen (Hochgeschwindigkeitszug). Er faehrt 300 km/h."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Eigene Begruendung akzeptieren. Auf korrekte Satzstruktur achten: Mir gefaellt Postkarte ... am besten, weil ..."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Postkarten"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Gruesse  -  Wetter  -  gemacht  -  vermisse  -  lecker  -  wunderschoen  -  besucht  -  Herzliche  -  scheint  -  Morgen  -  freue  -  Briefmarke  -  Adresse  -  Liebe")],
      })]})],
    }),
    empty(),
    pBold("Ergaenze die Postkarte."),
    empty(),
    postkarteBox([
      p("__________________ Clara,"),
      empty(),
      p("viele __________________ aus Portugal! Hier ist es __________________ — das Meer ist blau und die Sonne __________________ jeden Tag."),
      p("Gestern haben wir eine Bootsfahrt __________________ und viele Fische gesehen. Das war so toll! Das Essen hier ist auch sehr __________________ — wir haben heute Abend frischen Fisch gegessen."),
      p("__________________ fahren wir in eine alte Stadt und schauen uns Sehenswuerdigkeiten an."),
      p("Ich __________________ dich sehr, aber der Urlaub ist wunderschoen. Ich __________________ mich schon auf deine Antwort!"),
      empty(),
      p("__________________ Gruesse,"),
      p("deine Mia"),
    ]),
    empty(), empty(),
    pBold("Teil 2: Was gehoert wohin? Schreib die Woerter in die richtige Postkartenspalte."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Anrede  -  Abschlussgruss  -  Adresse des Empfaengers  -  Urlaubstext  -  Briefmarke  -  Name des Absenders")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Linke Seite (Text)", { width: 4700 }), hCell("Rechte Seite (Adresse)", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Schreib selbst den Abschluss einer Postkarte."),
    pItalic("Du warst am Bodensee. Schreib die letzten 2-3 Saetze: was du morgen machst, einen Wunsch und den Abschlussgruss."),
    empty(),
    ...writeLines(3, 55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Postkarten (LOESUNG)"), empty(),
    pBold("Teil 1: Ergaenzte Postkarte"),
    bullet("Liebe Clara"),
    bullet("Gruesse"),
    bullet("wunderschoen — scheint"),
    bullet("gemacht"),
    bullet("lecker"),
    bullet("Morgen"),
    bullet("vermisse — freue"),
    bullet("Herzliche"),
    pItalic("Nicht verwendet (Ablenkwoerter): Wetter, besucht, Briefmarke, Adresse"),
    empty(),
    pBold("Teil 2: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Linke Seite (Text)", { width: 4700 }), hCell("Rechte Seite (Adresse)", { width: 4700 })] }),
        new TableRow({ children: [dCell("Anrede"), dCell("Adresse des Empfaengers")] }),
        new TableRow({ children: [dCell("Urlaubstext"), dCell("Briefmarke (oben rechts)")] }),
        new TableRow({ children: [dCell("Abschlussgruss"), dCell("Name des Absenders (optional, oft links)")] }),
        new TableRow({ children: [dCell("Name des Absenders"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Musterloesung"),
    pItalic("Morgen machen wir eine Bootsfahrt auf dem Bodensee — ich bin schon sehr gespannt! Ich wuensche dir eine schoene Woche zu Hause. Herzliche Gruesse, deine(r) ..."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Postkarten"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Aufbau einer Postkarte — Uebersicht"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Teil", { width: 1800 }), hCell("Inhalt", { width: 3000 }), hCell("Typische Formulierungen", { width: 4838 })] }),
        new TableRow({ children: [dCell("Eroeffnung"), dCell("Woher komme ich?"), dCell("Viele Gruesse aus ...! / Herzliche Gruesse aus ...!")] }),
        new TableRow({ children: [dCell("Anrede"), dCell("An wen schreibe ich?"), dCell("Liebe Oma, / Lieber Max, / Liebe Familie,")] }),
        new TableRow({ children: [dCell("Ort/Wetter"), dCell("Wie ist es hier?"), dCell("Hier ist es wunderschoen. / Das Wetter ist ...")] }),
        new TableRow({ children: [dCell("Aktivitaet"), dCell("Was habe ich gemacht?"), dCell("Wir haben ... gemacht. / Ich bin ... gefahren.")] }),
        new TableRow({ children: [dCell("Plan"), dCell("Was machen wir noch?"), dCell("Morgen fahren wir ... / Uebermorgen besuchen wir ...")] }),
        new TableRow({ children: [dCell("Gefuehl"), dCell("Wie geht es mir?"), dCell("Ich vermisse dich. / Es ist wunderschoen hier!")] }),
        new TableRow({ children: [dCell("Abschluss"), dCell("Verabschiedung"), dCell("Bis bald! / Herzliche Gruesse, deine(r) ...")] }),
      ],
    }),
    empty(),
    pBold("Adjektive fuer Postkarten:"),
    bullet("Ort: wunderschoen, beeindruckend, gross, klein, alt, bunt, modern, ruhig, lebendig"),
    bullet("Wetter: sonnig, warm, heiss, kuehl, windig, bewolkt, regnerisch, traumhaft"),
    bullet("Essen: lecker, koestlich, unglaublich gut, scharf, suess, frisch"),
    bullet("Aktivitaeten: aufregend, toll, spannend, langweilig, anstrengend, unvergesslich"),
    empty(),
    pBold("Aufgabe: Schreib eine kurze Postkarte von einem Ort, den du kennst oder erfindest."),
    ...writeLines(6, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Postkarten (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("Postkartensprache ist komprimiert: oft keine vollstaendigen Saetze (z. B. 'Wunderschoen hier!' statt 'Es ist wunderschoen hier.'). Auf A2-Niveau vollstaendige Saetze foerdern."),
    bullet("Perfekt dominiert in Postkarten fuer Vergangenheit: Wir haben ... gemacht / Ich bin ... gefahren."),
    bullet("Praesens fuer aktuelle Beschreibungen: Das Wetter ist ... / Hier gibt es ..."),
    bullet("Futur mit 'morgen + Praesens': Morgen fahren wir ... (kein Futur I noetig auf A2)"),
    empty(),
    pBold("Loesung Aufgabe — Musterpostkarte"),
    postkarteBox([
      p("Liebe Oma,"),
      p("viele Gruesse aus Wien! Die Stadt ist wunderschoen und sehr lebendig. Heute haben wir das Schloss Schoenbrunn besucht — beeindruckend! Das Wetter ist warm und sonnig. Das Essen hier ist koestlich — wir haben heute Wiener Schnitzel gegessen. Morgen fahren wir mit der U-Bahn in den Prater. Ich vermisse dich!"),
      p("Herzliche Gruesse, deine(r) ..."),
    ]),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Postkarten"), empty(),
    pBold("Dialog 1: Eine Postkarte vorlesen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Mama"), dCell("Schau mal, wir haben eine Postkarte von Oma bekommen!")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Echt? Von wo schreibt sie denn?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Aus Portugal! Sie ist mit ihrer Freundin verreist.")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Was schreibt sie? Lies mal vor!")] }),
        new TableRow({ children: [dCell("Mama"), dCell("'Liebe Familie, viele Gruesse aus Lissabon! Hier ist es traumhaft. Heute haben wir die Altstadt besucht und leckeres Essen probiert. Das Wetter ist perfekt. Ich denke an euch! Herzliche Gruesse, eure Oma.'")] }),
        new TableRow({ children: [dCell("Paul"), dCell("Wow, das klingt toll! Ich wuensche ihr schoene Ferien.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Ich schreibe ihr heute noch eine Antwort-SMS!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Postkarte oder E-Mail?"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lea"), dCell("Schreibst du im Urlaub Postkarten?")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Nein, ich schicke lieber Fotos per Handy. Das ist schneller.")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Schade! Ich finde Postkarten so viel persoenlicher. Man haelt sie in der Hand.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Stimmt, aber bis eine Postkarte ankommt, bin ich schon wieder zu Hause!")] }),
        new TableRow({ children: [dCell("Lea"), dCell("Haha! Das stimmt auch. Aber meine Oma hat noch kein Handy — fuer sie schreibe ich immer.")] }),
        new TableRow({ children: [dCell("Tom"), dCell("Das ist nett von dir! Ich schreibe meiner Oma dann auch mal wieder eine.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Postkarte vorlesen und Fragen stellen"),
    pItalic("Person A schreibt eine Postkarte (von einem erfundenen Urlaubsort) und liest sie vor. Person B stellt 3 Fragen dazu. Dann tauscht ihr."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person A: Postkarte vorlesen", { width: 9638 })] }),
        new TableRow({ children: [dCell("", { width: 9638 })] }),
        new TableRow({ children: [dCell("", { width: 9638 })] }),
      ],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person B: Fragen notieren", { width: 9638 })] }),
        new TableRow({ children: [dCell("1. ____________________"), ] }),
        new TableRow({ children: [dCell("2. ____________________"), ] }),
        new TableRow({ children: [dCell("3. ____________________"), ] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Postkarten und Urlaub"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Hast du schon mal eine Postkarte geschrieben?"), dCell("")] }),
        new TableRow({ children: [dCell("An wen schickst du lieber: Postkarte oder Nachricht?"), dCell("")] }),
        new TableRow({ children: [dCell("Von welchem Ort wuerdest du gern eine Postkarte schreiben?"), dCell("")] }),
        new TableRow({ children: [dCell("Was wuerdes du in einer Postkarte erwaehnen?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du schon eine Postkarte bekommen? Von wem?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Postkarten (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Von wo schreibt sie? = Frage nach Herkunft (Postkartenkontext)"),
    bullet("Lies mal vor! = Aufforderung mit Imperativ (Lies!)"),
    bullet("Das klingt toll! = klingen + Adjektiv (Bewertung durch Klang/Eindruck)"),
    bullet("Ich wuensche ihr schoene Ferien. = wuenschen + Dativ + Akkusativ"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Ich schicke lieber ... = Komparativ gern → lieber"),
    bullet("Das ist schneller. = Komparativ schnell → schneller"),
    bullet("Man haelt sie in der Hand. = man-Form fuer allgemeine Aussagen"),
    bullet("Das ist nett von dir. = Kompliment mit von + Dativ"),
    empty(),
    pBold("Bewertungskriterien Postkarte vorlesen:"),
    bullet("Eroefffnungsformel (Viele Gruesse aus ...)"),
    bullet("Ortsangabe klar"),
    bullet("Mindestens eine Aktivitaet im Perfekt"),
    bullet("Abschlussgruss vorhanden"),
    bullet("Fragen von Person B beziehen sich auf den Postkarteninhalt"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Postkarten"), empty(),
    pBold("Aufgabe 1: Ordne die Postkarten dem richtigen Urlaubsort zu."),
    p("[BILD 1: Vier Postkarten-Vorderseiten — (A) Strand mit Palmen und Meer, (B) schneebedeckte Berge mit Huette, (C) Grossstadt mit Skyline bei Nacht, (D) gruener Wald mit See]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung auf der Postkarte", { width: 7500 }), hCell("Bild", { width: 2000 })] }),
        new TableRow({ children: [dCell("'Viele Gruesse aus den Alpen! Jeden Tag wandern und frische Bergluft.'"), dCell("")] }),
        new TableRow({ children: [dCell("'Herzliche Gruesse aus Thailand! Das Meer ist so warm und klar.'"), dCell("")] }),
        new TableRow({ children: [dCell("'Gruesse aus New York! Die Stadt schlaeft nie — abends ist es am schoensten.'"), dCell("")] }),
        new TableRow({ children: [dCell("'Viele Gruesse aus Finnland! Wir haben Kajakfahren ausprobiert.'"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Lies die Postkarte und beantworte die Fragen."),
    p("[BILD 2: Postkarte — Vorderseite: Foto von Venedig mit Gondeln. Rueckseite: 'Lieber Jonas, viele Gruesse aus Venedig! Die Stadt auf dem Wasser ist unglaublich. Gestern sind wir mit einer Gondel gefahren — das war romantisch und toll! Heute haben wir frische Pizza gegessen und die Markuskirche besucht. Morgen fahren wir nach Hause — leider! Es hat mir so gut gefallen. Bis bald, deine Hanna']"),
    empty(),
    p("1. Wo ist Hanna?  ____________________"),
    p("2. Was hat sie gestern gemacht?  ____________________"),
    p("3. Was hat sie heute besucht?  ____________________"),
    p("4. Wann faehrt sie nach Hause?  ____________________"),
    p("5. Wie findet sie den Urlaub?  ____________________"),
    empty(),
    pBold("Aufgabe 3: Schreib eine Antwort an Hanna."),
    pItalic("Jonas antwortet auf Hannas Postkarte. Er freut sich fuer sie, stellt eine Frage und schreibt, was er gemacht hat, waehrend sie weg war. (4-5 Saetze)"),
    empty(),
    ...writeLines(5, 55),
    empty(),
    pBold("Aufgabe 4: Gestalte eine Postkarte von einem Traumziel."),
    p("[BILD 3: Leere Postkarten-Vorlage — linke Seite: leere Flaeche fuer Text, rechte Seite: Kasterl fuer Briefmarke oben rechts, Linien fuer Adresse]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, right: { style: BorderStyle.SINGLE, size: 2, color: GRAY } },
          margins: { top: 160, bottom: 160, left: 160, right: 160 },
          width: { size: 4700, type: WidthType.DXA },
          children: [
            p("Liebe(r) ____________________,"),
            empty(),
            writeLine(38),
            writeLine(38),
            writeLine(38),
            writeLine(38),
            empty(),
            p("____________________,"),
            p("deine(r) ____________________"),
          ],
        }),
        new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.SINGLE, size: 2, color: GRAY }, right: { style: BorderStyle.SINGLE, size: 4, color: BLUE } },
          margins: { top: 160, bottom: 160, left: 160, right: 160 },
          width: { size: 4938, type: WidthType.DXA },
          children: [
            p("[Briefmarke]", { align: AlignmentType.RIGHT, color: GRAY }),
            empty(), empty(),
            p("____________________"),
            p("____________________"),
            p("____________________"),
            p("____________________"),
          ],
        }),
      ]})],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Postkarten (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Beschreibung", { width: 7500 }), hCell("Bild", { width: 2000 })] }),
        new TableRow({ children: [dCell("Alpen — wandern, frische Bergluft"), dCell("B (Berge)")] }),
        new TableRow({ children: [dCell("Thailand — Meer, warm, klar"), dCell("A (Strand)")] }),
        new TableRow({ children: [dCell("New York — Stadt schlaeft nie, abends"), dCell("C (Grossstadt)")] }),
        new TableRow({ children: [dCell("Finnland — Kajak, Natur"), dCell("D (Wald/See)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. In Venedig (Italien)."),
    bullet("2. Sie ist mit einer Gondel gefahren."),
    bullet("3. Die Markuskirche."),
    bullet("4. Morgen (am naechsten Tag)."),
    bullet("5. Es hat ihr sehr gut gefallen."),
    empty(),
    pBold("Aufgabe 3: Musterloesung"),
    pItalic("Liebe Hanna, wie toll — Venedig klingt wunderschoen! Wie war die Gondolfahrt genau? Ich hoffe, du hast viele Fotos gemacht. Hier zu Hause war es ruhig — ich war mit meinem Hund im Park und habe ein Buch gelesen. Ich freue mich, wenn du erzaehlst! Bis bald, Jonas"),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Text-Seite mit Anrede, Ort, Aktivitaet und Abschlussgruss. Adress-Seite mit Name und Adresszeilen ausgefuellt."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Einfache Postkarten schreiben");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
