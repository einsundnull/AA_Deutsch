"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "04_EssenGesundheit", "03_BeimArzt");
const TOPIC     = "A2_Kinder_EssenGesundheit_03_BeimArzt";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2800 }), hCell("Kategorie", { width: 1800 }), hCell("Beispielsatz", { width: 5038 })] }),
      new TableRow({ children: [dCell("das Bauchweh / die Bauchschmerzen"), dCell("Symptom"), dCell("Ich habe Bauchweh. Mein Bauch tut weh.")] }),
      new TableRow({ children: [dCell("das Kopfweh / die Kopfschmerzen"), dCell("Symptom"), dCell("Ich habe Kopfschmerzen seit heute Morgen.")] }),
      new TableRow({ children: [dCell("das Halsweh / die Halsschmerzen"), dCell("Symptom"), dCell("Mein Hals tut weh. Ich kann kaum schlucken.")] }),
      new TableRow({ children: [dCell("das Fieber"), dCell("Symptom"), dCell("Ich habe 38,5 Grad Fieber.")] }),
      new TableRow({ children: [dCell("der Husten"), dCell("Symptom"), dCell("Ich huste sehr oft — ich habe Husten.")] }),
      new TableRow({ children: [dCell("der Schnupfen"), dCell("Symptom"), dCell("Meine Nase laeuft. Ich habe Schnupfen.")] }),
      new TableRow({ children: [dCell("Mir ist schlecht."), dCell("Ausdruck"), dCell("Mir ist schlecht. Ich glaube, ich bin krank.")] }),
      new TableRow({ children: [dCell("Ich fuehle mich nicht gut."), dCell("Ausdruck"), dCell("Ich fuehle mich heute gar nicht gut.")] }),
      new TableRow({ children: [dCell("die Tablette(n)"), dCell("Medizin"), dCell("Nimm zweimal taeglich eine Tablette.")] }),
      new TableRow({ children: [dCell("der Sirup"), dCell("Medizin"), dCell("Dieser Sirup hilft gegen Husten.")] }),
      new TableRow({ children: [dCell("das Rezept"), dCell("Arzt-Wort"), dCell("Der Arzt schreibt ein Rezept fuer die Apotheke.")] }),
      new TableRow({ children: [dCell("die Apotheke"), dCell("Ort"), dCell("In der Apotheke kauft man Medizin.")] }),
      new TableRow({ children: [dCell("das Wartezimmer"), dCell("Ort"), dCell("Im Wartezimmer warten viele Patienten.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Beim Arzt"), empty(),
    pBold("Aufgabe 1: Verbinde Symptom und Koerperteil — schreib dann einen Satz."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Symptom", { width: 3000 }), hCell("Koerperteil", { width: 3000 }), hCell("Satz (Ich habe ... / Mir tut ... weh.)", { width: 3638 })] }),
        new TableRow({ children: [dCell("Bauchweh"), dCell("der Kopf"), dCell("")] }),
        new TableRow({ children: [dCell("Kopfschmerzen"), dCell("der Hals"), dCell("")] }),
        new TableRow({ children: [dCell("Halsschmerzen"), dCell("der Bauch"), dCell("")] }),
        new TableRow({ children: [dCell("Ohrenschmerzen"), dCell("das Ohr"), dCell("")] }),
        new TableRow({ children: [dCell("Rueckenschmerzen"), dCell("der Ruecken"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Was sagt man beim Arzt? Schreib Saetze nach dem Muster."),
    pItalic("Muster: Ich habe seit gestern Kopfschmerzen. Mir ist auch ein bisschen schlecht."),
    empty(),
    p("Situation 1: Du hast Bauchweh und Fieber seit zwei Tagen."),
    writeLine(55), writeLine(55), empty(),
    p("Situation 2: Du hast Halsschmerzen und Husten. Du kannst kaum sprechen."),
    writeLine(55), writeLine(55), empty(),
    p("Situation 3: Du fuehlt dich muede, hast Kopfschmerzen und kannst nicht schlafen."),
    writeLine(55), writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib eine Entschuldigung fuer die Schule."),
    pItalic("Schreib einen kurzen Brief: Dein Kind ist krank und kann heute nicht in die Schule kommen."),
    empty(),
    p("___________________________________, den ___________________"),
    empty(),
    p("Sehr geehrte Lehrerin / Sehr geehrter Lehrer,"),
    empty(),
    ...writeLines(5, 55),
    p("Mit freundlichen Gruessen,"),
    writeLine(40),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Beim Arzt (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Verbindung und Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Symptom", { width: 3000 }), hCell("Koerperteil", { width: 3000 }), hCell("Mustersatz", { width: 3638 })] }),
        new TableRow({ children: [dCell("Bauchweh"), dCell("der Bauch"), dCell("Ich habe Bauchweh.")] }),
        new TableRow({ children: [dCell("Kopfschmerzen"), dCell("der Kopf"), dCell("Mein Kopf tut weh.")] }),
        new TableRow({ children: [dCell("Halsschmerzen"), dCell("der Hals"), dCell("Ich habe Halsschmerzen.")] }),
        new TableRow({ children: [dCell("Ohrenschmerzen"), dCell("das Ohr"), dCell("Mein Ohr tut sehr weh.")] }),
        new TableRow({ children: [dCell("Rueckenschmerzen"), dCell("der Ruecken"), dCell("Ich habe Rueckenschmerzen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung"),
    bullet("Situation 1: Ich habe seit zwei Tagen Bauchweh und Fieber. Ich fuehle mich sehr schlecht."),
    bullet("Situation 2: Ich habe Halsschmerzen und Husten. Mir tut der Hals sehr weh und ich kann kaum sprechen."),
    bullet("Situation 3: Ich bin sehr muede und habe Kopfschmerzen. Ich kann nachts nicht schlafen."),
    pItalic("Weitere korrekte Formulierungen akzeptieren. Auf seit + Zeitangabe achten."),
    empty(),
    pBold("Aufgabe 3: Musterloesung Entschuldigung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Muenchen, den 26. April 2026"),
          empty(),
          p("Sehr geehrte Frau Müller,"),
          p("mein Kind Felix ist heute krank und kann leider nicht in die Schule kommen."),
          p("Er hat Fieber und Halsschmerzen seit gestern Abend."),
          p("Wir waren heute beim Arzt. Felix muss zwei Tage zu Hause bleiben."),
          p("Mit freundlichen Gruessen,"),
          p("Familie Schmidt"),
        ],
      })]})],
    }),
    pItalic("Entschuldigung muss enthalten: Grund (krank), Symptome, Zeitangabe, Grussformel."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Beim Arzt"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Lena ist krank"),
          empty(),
          p("Am Dienstagmorgen wacht Lena auf und fuehlt sich furchtbar. Ihr Hals tut weh, sie hat Kopfschmerzen und ihre Nase laeuft. Ihre Mutter misst die Temperatur: 38,5 Grad Fieber!"),
          p("'Du kannst heute nicht in die Schule gehen', sagt die Mutter. 'Wir gehen zum Arzt.'"),
          p("Im Wartezimmer sitzen noch fuenf andere Patienten. Lena muss 20 Minuten warten. Dann ruft die Arzthelferin: 'Lena Schmidt, bitte!'"),
          p("Die Aerztin, Dr. Bergmann, fragt: 'Guten Morgen, Lena! Was fehlt dir? Seit wann hast du die Beschwerden?'"),
          p("'Seit gestern Abend habe ich Halsschmerzen', sagt Lena. 'Und heute frueh war mein Kopf so schwer.'"),
          p("Dr. Bergmann schaut in Lenas Mund und Ohren. 'Du hast eine Halsentzuendung', erklaert sie. 'Du musst drei Tage zu Hause bleiben und viel trinken. Ich schreibe dir ein Rezept fuer Tabletten und einen Sirup gegen Husten.'"),
          p("'Darf ich Eis essen?', fragt Lena hoffnungsvoll."),
          p("Die Aerztin lacht. 'Ja, kaltes Eis kann den Hals kuehlen. Aber nur ein bisschen!' Lena laechelt — das hoert sie gern."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Lena hat am Dienstagmorgen Kopfschmerzen und Fieber."), dCell("")] }),
        new TableRow({ children: [dCell("Lena darf trotzdem in die Schule gehen."), dCell("")] }),
        new TableRow({ children: [dCell("Im Wartezimmer wartet Lena 20 Minuten."), dCell("")] }),
        new TableRow({ children: [dCell("Lena hat die Halsschmerzen seit dem Morgen."), dCell("")] }),
        new TableRow({ children: [dCell("Dr. Bergmann schreibt ein Rezept fuer Tabletten und Sirup."), dCell("")] }),
        new TableRow({ children: [dCell("Lena darf kein Eis essen."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Was sind Lenas drei Symptome am Morgen?"),
    writeLine(55), empty(),
    p("2. Wie lange muss Lena zu Hause bleiben?"),
    writeLine(55), empty(),
    p("3. Was empfiehlt Dr. Bergmann ausser Medizin?"),
    writeLine(55), empty(),
    p("4. Warum freut sich Lena am Ende?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Was sagt Dr. Bergmann? Suche im Text und schreib ab."),
    p("Die Diagnose: ___________________________________________"),
    writeLine(55), empty(),
    p("Die Empfehlung: _________________________________________"),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Beim Arzt (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Lena hat am Dienstagmorgen Kopfschmerzen und Fieber."), dCell("R")] }),
        new TableRow({ children: [dCell("Lena darf trotzdem in die Schule gehen."), dCell("F (sie muss zu Hause bleiben)")] }),
        new TableRow({ children: [dCell("Im Wartezimmer wartet Lena 20 Minuten."), dCell("R")] }),
        new TableRow({ children: [dCell("Lena hat die Halsschmerzen seit dem Morgen."), dCell("F (seit gestern Abend)")] }),
        new TableRow({ children: [dCell("Dr. Bergmann schreibt ein Rezept fuer Tabletten und Sirup."), dCell("R")] }),
        new TableRow({ children: [dCell("Lena darf kein Eis essen."), dCell("F (sie darf ein bisschen Eis essen)")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Halsschmerzen, Kopfschmerzen und Schnupfen (laufende Nase)."),
    bullet("2. Sie muss drei Tage zu Hause bleiben."),
    bullet("3. Sie soll viel trinken."),
    bullet("4. Sie darf Eis essen — kaltes Eis kuehl den Hals."),
    empty(),
    pBold("Aufgabe 3: Direkte Zitate"),
    bullet("Diagnose: 'Du hast eine Halsentzuendung.'"),
    bullet("Empfehlung: 'Du musst drei Tage zu Hause bleiben und viel trinken.'"),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Beim Arzt"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Bauchweh  -  Fieber  -  seit  -  schlucken  -  Rezept  -  Tabletten  -  musst  -  darfst  -  sollst  -  Wartezimmer  -  fehlt  -  schlecht  -  Apotheke  -  tut weh")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Mir ist __________________. Ich glaube, ich bin krank."),
    p("2. Ich habe __________________ gestern Halsschmerzen."),
    p("3. Mein Bauch __________________ sehr."),
    p("4. Ich habe __________________ — meine Temperatur ist 39 Grad."),
    p("5. Im __________________ sitzen viele Patienten."),
    p("6. Der Arzt schreibt ein __________________ fuer die __________________."),
    empty(),
    pBold("Teil 2: Dialog beim Arzt — ergaenze."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Arzt"), dCell("Guten Morgen! Was __________________ dir?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Ich habe __________________ und kann kaum __________________.")] }),
        new TableRow({ children: [dCell("Arzt"), dCell("Seit wann hast du die Schmerzen?")] }),
        new TableRow({ children: [dCell("Kind"), dCell("__________________ gestern Abend.")] }),
        new TableRow({ children: [dCell("Arzt"), dCell("Ich schaue mal in deinen Mund. Oeffne bitte weit.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("Soll ich auch __________________ nehmen?")] }),
        new TableRow({ children: [dCell("Arzt"), dCell("Ja. Du __________________ dreimal taeglich eine Tablette nehmen.")] }),
        new TableRow({ children: [dCell("Kind"), dCell("__________________ ich morgen in die Schule gehen?")] }),
        new TableRow({ children: [dCell("Arzt"), dCell("Nein, du __________________ zwei Tage zu Hause bleiben.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Was rät der Arzt? Ergaenze mit musst / sollst / darfst (nicht)."),
    empty(),
    p("1. Du __________________ viel Wasser und Tee trinken."),
    p("2. Du __________________ nicht in die Schule gehen — du bist krank."),
    p("3. Du __________________ im Bett bleiben und dich ausruhen."),
    p("4. Du __________________ nicht draussen spielen, wenn du Fieber hast."),
    p("5. Du __________________ die Tabletten regelmaessig nehmen."),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Beim Arzt (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. schlecht"),
    bullet("2. seit"),
    bullet("3. tut weh"),
    bullet("4. Fieber"),
    bullet("5. Wartezimmer"),
    bullet("6. Rezept / Apotheke"),
    empty(),
    pBold("Teil 2: Musterloesung"),
    bullet("Arzt (1): fehlt"),
    bullet("Kind (1): Bauchweh / Halsschmerzen — schlucken"),
    bullet("Kind (2): Seit"),
    bullet("Kind (3): Tabletten"),
    bullet("Arzt (2): musst / sollst"),
    bullet("Kind (4): Darf"),
    bullet("Arzt (3): musst / sollst"),
    pItalic("Nicht verwendet (Ablenkwoerter): Fieber, Rezept, Apotheke, Wartezimmer, schlecht (in Teil 2)"),
    empty(),
    pBold("Teil 3: musst / sollst / darfst"),
    bullet("1. sollst / musst (beides akzeptieren)"),
    bullet("2. darfst nicht"),
    bullet("3. musst / sollst"),
    bullet("4. darfst nicht"),
    bullet("5. musst / sollst"),
    pItalic("Grammatik-Hinweis: musst = starke Pflicht; sollst = Empfehlung/Auftrag; darfst nicht = Verbot."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Beim Arzt"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtige Strukturen beim Arzt:"),
    bullet("Symptome nennen: Ich habe + [Symptom]. / Mir tut [Koerperteil] weh."),
    bullet("Zeitangabe: seit gestern / seit zwei Tagen / seit heute Morgen"),
    bullet("Befinden: Mir ist schlecht. / Ich fuehle mich nicht gut. / Ich bin muede."),
    bullet("Arzt fragt: Was fehlt Ihnen/dir? / Seit wann? / Wo tut es weh?"),
    bullet("Diagnose: Sie haben / Du hast eine [Krankheit]."),
    bullet("Empfehlung: Du musst/sollst/darfst (nicht) ..."),
    empty(),
    h2("Grammatik-Hinweis: Modalverben bei Arzt-Empfehlungen"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Verb", { width: 1800 }), hCell("Bedeutung", { width: 2500 }), hCell("Beispiel", { width: 5338 })] }),
        new TableRow({ children: [dCell("muessen"), dCell("Pflicht / Notwendigkeit"), dCell("Du musst im Bett bleiben.")] }),
        new TableRow({ children: [dCell("sollen"), dCell("Empfehlung / Auftrag"), dCell("Du sollst viel Wasser trinken.")] }),
        new TableRow({ children: [dCell("duerfen"), dCell("Erlaubnis"), dCell("Du darfst morgen wieder rausgehen.")] }),
        new TableRow({ children: [dCell("duerfen nicht"), dCell("Verbot"), dCell("Du darfst nicht in die Schule gehen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Schreib fuer 5 Symptome je einen Satz und eine Arzt-Empfehlung."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Beim Arzt (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Wichtigste Strukturen — Zusammenfassung fuer Lehrkraft:"),
    bullet("seit + Zeitangabe (Dativ): seit gestern, seit zwei Tagen, seit einer Woche"),
    bullet("Mir tut X weh: Subjekt = Koerperteil, Dativpronomen mir"),
    bullet("Ich habe + Krankheit (kein Artikel): Ich habe Fieber. / Ich habe Husten."),
    bullet("muessen vs. sollen: muessen = innere/aeussere Notwendigkeit; sollen = Auftrag von jemandem"),
    empty(),
    pBold("Loesung Aufgabe: Mustersaetze"),
    bullet("Ich habe Bauchweh. Du musst im Bett bleiben und darfst nichts essen."),
    bullet("Ich habe Fieber. Du sollst viel trinken und darfst nicht rausgehen."),
    bullet("Ich habe Husten. Du musst Sirup nehmen und sollst warm bleiben."),
    bullet("Ich habe Schnupfen. Du sollst Nasentropfen nehmen und dich ausruhen."),
    bullet("Ich habe Kopfschmerzen. Du sollst eine Tablette nehmen und darfst nicht am Bildschirm sitzen."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Beim Arzt"), empty(),
    pBold("Dialog 1: Beim Kinderarzt"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Dr. Keller"), dCell("Guten Morgen! Was bringt dich zu mir, Tim?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Guten Morgen. Mir ist schlecht und ich habe Bauchweh.")] }),
        new TableRow({ children: [dCell("Dr. Keller"), dCell("Seit wann hast du diese Beschwerden?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Seit gestern Abend. Ich konnte heute Nacht kaum schlafen.")] }),
        new TableRow({ children: [dCell("Dr. Keller"), dCell("Hast du auch Fieber? Ich messe kurz die Temperatur.")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Ich glaube schon. Ich fuehle mich sehr heiss.")] }),
        new TableRow({ children: [dCell("Dr. Keller"), dCell("38,2 Grad. Du hast leichtes Fieber. Hast du heute etwas gegessen?")] }),
        new TableRow({ children: [dCell("Tim"), dCell("Nein, ich hatte keinen Hunger. Mir war der Gedanke an Essen eklig.")] }),
        new TableRow({ children: [dCell("Dr. Keller"), dCell("Das klingt nach einem Mageninfekt. Du sollst viel trinken und heute zu Hause bleiben.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Krankmeldung in der Schule"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Sekretaerin"), dCell("Guten Morgen, Grundschule Sonnenhof, was kann ich fuer Sie tun?")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Guten Morgen, hier ist Anna Berger. Meine Tochter Sofia ist heute krank.")] }),
        new TableRow({ children: [dCell("Sekretaerin"), dCell("Was hat sie denn?")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Sie hat hohes Fieber und Halsschmerzen. Wir waren heute Morgen beim Arzt.")] }),
        new TableRow({ children: [dCell("Sekretaerin"), dCell("Wie lange wird sie fehlen?")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Der Arzt sagt, sie soll drei Tage zu Hause bleiben.")] }),
        new TableRow({ children: [dCell("Sekretaerin"), dCell("Alles klar. Ich gebe das an Frau Huber weiter. Gute Besserung!")] }),
        new TableRow({ children: [dCell("Mutter"), dCell("Vielen Dank. Auf Wiedersehen.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Rollenspiel — Beim Arzt"),
    pItalic("Person A = Arzt/Aerztin, Person B = Patient/Patientin. Benutzt diese Karten:"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Patient-Karte 1", { width: 4819 }), hCell("Patient-Karte 2", { width: 4819 })] }),
        new TableRow({ children: [
          dCell("Du hast seit 2 Tagen Kopfschmerzen und Schnupfen. Du hast kein Fieber. Du bist muede.", { shade: true }),
          dCell("Du hast Bauchweh und dir ist schlecht seit heute Morgen. Du hast 37,8 Grad Fieber.", { shade: true }),
        ] }),
      ],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Arzt-Karte 1", { width: 4819 }), hCell("Arzt-Karte 2", { width: 4819 })] }),
        new TableRow({ children: [
          dCell("Diagnose: Erkältung. Empfehlung: viel trinken, ausruhen, Nasentropfen.", { shade: true }),
          dCell("Diagnose: Mageninfekt. Empfehlung: nichts essen, nur Tee trinken, Bettruhe.", { shade: true }),
        ] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Symptom-Raten"),
    bullet("Eine Person zeigt ein Symptom mit Gesten (z. B. den Bauch halten, husten, niesen)."),
    bullet("Die anderen raten: 'Du hast Bauchweh!' / 'Du hustest!'"),
    bullet("Wer richtig liegt, macht als naechstes eine Geste."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Beim Arzt (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Was bringt dich zu mir? = Was ist dein Problem? (formell/Arzt-Ausdruck)"),
    bullet("Seit wann hast du diese Beschwerden? = Zeitfrage mit seit + Zeitangabe"),
    bullet("konnte kaum schlafen = koennen im Praeteritum (A2-Grammatik)"),
    bullet("Das klingt nach einem Mageninfekt. = klingen nach + Dativ"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Was hat sie denn? = denn = Fragepartikel (Interesse/Mitgefuehl)"),
    bullet("hohes Fieber = Adjektiv + Nomen ohne Artikel (kein 'das hohe Fieber')"),
    bullet("Wie lange wird sie fehlen? = Zukunftsfrage mit werden"),
    bullet("Gute Besserung! = Standardausdruck beim Abschied von Kranken"),
    empty(),
    pBold("Bewertungskriterien Rollenspiel:"),
    bullet("Alle Symptome korrekt auf Deutsch genannt"),
    bullet("Zeitangabe mit seit verwendet"),
    bullet("Arzt stellt mindestens 2 Rueckfragen"),
    bullet("Empfehlung mit muessen / sollen / duerfen (nicht) formuliert"),
    bullet("Hoeflicher Abschluss (Auf Wiedersehen / Gute Besserung)"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Beim Arzt"), empty(),
    pBold("Aufgabe 1: Schreib das passende Symptom unter jedes Bild."),
    p("[BILD 1: Vier Bilder: Kind haelt Bauch (Bauchweh), Kind haelt Kopf (Kopfschmerzen), Kind haelt Hals (Halsschmerzen), Kind niest (Schnupfen)]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild 1]", { width: 2350 }), hCell("[Bild 2]", { width: 2350 }), hCell("[Bild 3]", { width: 2350 }), hCell("[Bild 4]", { width: 2350 })] }),
        new TableRow({ children: [dCell("____________"), dCell("____________"), dCell("____________"), dCell("____________")] }),
        new TableRow({ children: [dCell("Ich habe ____"), dCell("Ich habe ____"), dCell("Ich habe ____"), dCell("Ich habe ____")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Ordne die Bilder — ein Arztbesuch in der richtigen Reihenfolge."),
    p("[BILD 2: Fuenf Bilder: (a) Kind bekommt Rezept, (b) Kind im Wartezimmer, (c) Mutter ruft beim Arzt an, (d) Arzt untersucht Kind, (e) Kind geht nach Hause mit Medizin]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 800 }), hCell("Was passiert? Schreib einen Satz.", { width: 5000 }), hCell("Reihenfolge (1-5)", { width: 3838 })] }),
        new TableRow({ children: [dCell("a"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("b"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("c"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("d"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("e"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 3: Medizin — was hilft wogegen?"),
    p("[BILD 3: Vier Bilder: Tabletten, Hustensaft, Nasentropfen, Fieberthermometer]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild / Medizin", { width: 3200 }), hCell("Das hilft gegen / bei ...", { width: 6438 })] }),
        new TableRow({ children: [dCell("[BILD: Tabletten]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Hustensaft]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Nasentropfen]"), dCell("")] }),
        new TableRow({ children: [dCell("[BILD: Fieberthermometer]"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Zeichne oder beschreibe: Wie fuehlt sich ein krankes Kind?"),
    p("[BILD 4: Leere Flaeche]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Das kranke Kind:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("Es hat: _________________________________"),
    p("Es fuehlt sich: _________________________"),
    writeLine(55),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Beim Arzt (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 2350 }), hCell("Symptom", { width: 2350 }), hCell("Satz", { width: 4938 })] }),
        new TableRow({ children: [dCell("Bild 1"), dCell("Bauchweh"), dCell("Ich habe Bauchweh.")] }),
        new TableRow({ children: [dCell("Bild 2"), dCell("Kopfschmerzen"), dCell("Ich habe Kopfschmerzen.")] }),
        new TableRow({ children: [dCell("Bild 3"), dCell("Halsschmerzen"), dCell("Ich habe Halsschmerzen.")] }),
        new TableRow({ children: [dCell("Bild 4"), dCell("Schnupfen"), dCell("Ich habe Schnupfen.")] }),
      ],
    }),
    pItalic("Hinweis: Antworten haengen von eingefuegten Bildern ab."),
    empty(),
    pBold("Aufgabe 2: Richtige Reihenfolge (Arztbesuch)"),
    bullet("c (Mutter ruft an) = Schritt 1"),
    bullet("b (Wartezimmer) = Schritt 2"),
    bullet("d (Arzt untersucht) = Schritt 3"),
    bullet("a (Rezept bekommen) = Schritt 4"),
    bullet("e (nach Hause mit Medizin) = Schritt 5"),
    empty(),
    pBold("Aufgabe 3: Medizin und Wirkung"),
    bullet("Tabletten: gegen Schmerzen, Fieber, Halsentzuendung"),
    bullet("Hustensaft / Sirup: gegen Husten"),
    bullet("Nasentropfen: gegen Schnupfen"),
    bullet("Fieberthermometer: misst die Temperatur (hilft nicht direkt, aber zeigt Fieber an)"),
    pItalic("Alle sinnvollen Antworten akzeptieren."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Muster: Das kranke Kind hat Fieber und Halsschmerzen. Es fuehlt sich schlecht und muede."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Beim Arzt (Bauchweh, Kopfweh, Halsweh)");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
