"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "09_Medien", "01_GeraeteMedien");
const TOPIC     = "A2_Kinder_Medien_01_GeraeteMedien";
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
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2600 }), hCell("Typ", { width: 1400 }), hCell("Beispielsatz", { width: 5638 })] }),
      new TableRow({ children: [dCell("das Handy (-s)"), dCell("Nomen"), dCell("Ich habe mein Handy vergessen — kein Internet!")] }),
      new TableRow({ children: [dCell("das Tablet (-s)"), dCell("Nomen"), dCell("Auf dem Tablet schaue ich Videos und lese Buecher.")] }),
      new TableRow({ children: [dCell("der Computer (-)"), dCell("Nomen"), dCell("Am Computer mache ich meine Hausaufgaben.")] }),
      new TableRow({ children: [dCell("der Fernseher (-)"), dCell("Nomen"), dCell("Wir haben einen grossen Fernseher im Wohnzimmer.")] }),
      new TableRow({ children: [dCell("die App (-s)"), dCell("Nomen"), dCell("Es gibt eine App fuer fast alles!")] }),
      new TableRow({ children: [dCell("das Internet"), dCell("Nomen"), dCell("Ohne Internet kann ich keine Videos schauen.")] }),
      new TableRow({ children: [dCell("die Nachricht (-en)"), dCell("Nomen"), dCell("Ich schicke meiner Freundin eine Nachricht.")] }),
      new TableRow({ children: [dCell("herunterladen"), dCell("Verb (trennbar)"), dCell("Ich lade die App herunter.")] }),
      new TableRow({ children: [dCell("hochladen"), dCell("Verb (trennbar)"), dCell("Ich lade ein Foto hoch.")] }),
      new TableRow({ children: [dCell("surfen"), dCell("Verb"), dCell("Ich surfe im Internet nach Informationen.")] }),
      new TableRow({ children: [dCell("zu lange / zu viel"), dCell("Ausdruck"), dCell("Man sollte nicht zu lange am Handy sein.")] }),
      new TableRow({ children: [dCell("der Akku (-s)"), dCell("Nomen"), dCell("Mein Handy-Akku ist leer — ich muss es laden.")] }),
      new TableRow({ children: [dCell("offline / online"), dCell("Adjektiv"), dCell("Ich bin gerade offline — kein WLAN hier.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Mediengeraete"), empty(),
    pBold("Aufgabe 1: Was kann man mit diesen Geraeten machen? Schreib mindestens 2 Aktivitaeten pro Geraet."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Geraet", { width: 2350 }), hCell("Man kann damit ...", { width: 7288 })] }),
        new TableRow({ children: [dCell("Handy"), dCell("")] }),
        new TableRow({ children: [dCell("Tablet"), dCell("")] }),
        new TableRow({ children: [dCell("Computer"), dCell("")] }),
        new TableRow({ children: [dCell("Fernseher"), dCell("")] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib Saetze mit trennbaren Verben."),
    pItalic("Muster: (App / herunterladen) → Ich lade die App herunter."),
    empty(),
    p("1. (Video / hochladen)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("2. (Film / anschauen)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("3. (Musik / abspielen)  →  ______________________________________________"),
    writeLine(50), empty(),
    p("4. (Computer / ausschalten)  →  ______________________________________________"),
    writeLine(50), empty(), empty(),
    pBold("Aufgabe 3: Dein Medienalltag — schreib 5-6 Saetze."),
    p("Welche Geraete benutzt du? Wann? Wie lange? Was machst du damit? Was ist dein Lieblingsgeraet?"),
    empty(),
    ...writeLines(6, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Mediengeraete (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Geraet", { width: 2350 }), hCell("Man kann damit ...", { width: 7288 })] }),
        new TableRow({ children: [dCell("Handy"), dCell("telefonieren, Nachrichten schicken, Fotos machen, im Internet surfen, Musik hoeren")] }),
        new TableRow({ children: [dCell("Tablet"), dCell("Videos schauen, Buecher lesen, Spiele spielen, zeichnen, lernen")] }),
        new TableRow({ children: [dCell("Computer"), dCell("Hausaufgaben machen, surfen, Dokumente schreiben, spielen, programmieren")] }),
        new TableRow({ children: [dCell("Fernseher"), dCell("Filme/Serien schauen, Nachrichten sehen, Sport schauen")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Musterloesung trennbare Verben"),
    bullet("1. Ich lade das Video hoch."),
    bullet("2. Ich schaue den Film an."),
    bullet("3. Ich spiele die Musik ab."),
    bullet("4. Ich schalte den Computer aus."),
    pItalic("Trennbare Verben im Praesens: Praefix ans Ende! hochladen → lade ... hoch, anschauen → schaue ... an, abspielen → spiele ... ab, ausschalten → schalte ... aus."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Ich benutze jeden Tag mein Handy. Ich schicke Nachrichten und hoere Musik. Am Abend schaue ich manchmal einen Film auf dem Tablet. Am Computer mache ich meine Hausaufgaben. Mein Lieblingsgeraet ist das Handy, weil ich es immer dabei habe."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Mediengeraete"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Zu viel Bildschirmzeit?"),
          empty(),
          p("Noah ist zwoelf Jahre alt. In seiner Freizeit benutzt er viele digitale Geraete: sein Handy, das Tablet und den Fernseher. An manchen Tagen ist er mehr als vier Stunden vor einem Bildschirm."),
          p("Mit dem Handy schreibt Noah Nachrichten an seine Freunde und schaut kurze Videos. Das Tablet benutzt er hauptsaechlich zum Spielen — er hat uber dreissig Spiele installiert. Den Fernseher schaut er meistens abends mit seiner Familie."),
          p("Noahs Eltern machen sich manchmal Sorgen. 'Du bist zu lange am Handy,' sagt seine Mutter. 'Mach manchmal eine Pause!' Noah versteht das, aber es faellt ihm schwer. 'Alle meine Freunde sind immer online,' sagt er."),
          p("In der Schule hat Noah gelernt, dass zu viel Bildschirmzeit schlechte Auswirkungen haben kann: Man schlaeft schlechter, bewegt sich weniger und hat weniger Zeit fuer echte Freundschaften. Noah hat beschlossen, sein Handy abends ab 20 Uhr wegzulegen. Das ist nicht immer einfach, aber er versucht es."),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Noah ist manchmal mehr als vier Stunden vor einem Bildschirm."), dCell("")] }),
        new TableRow({ children: [dCell("Noah hat weniger als zehn Spiele auf dem Tablet."), dCell("")] }),
        new TableRow({ children: [dCell("Noahs Vater macht sich Sorgen um die Bildschirmzeit."), dCell("")] }),
        new TableRow({ children: [dCell("Zu viel Bildschirmzeit kann den Schlaf verschlechtern."), dCell("")] }),
        new TableRow({ children: [dCell("Noah legt sein Handy abends ab 20 Uhr weg."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Welche drei Geraete benutzt Noah?"),
    writeLine(55), empty(),
    p("2. Wozu benutzt Noah hauptsaechlich das Tablet?"),
    writeLine(55), empty(),
    p("3. Warum faellt es Noah schwer, weniger am Handy zu sein?"),
    writeLine(55), empty(),
    p("4. Was hat Noah beschlossen? Findest du das eine gute Idee? Warum?"),
    writeLine(55), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Mediengeraete (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Noah ist manchmal mehr als vier Stunden vor einem Bildschirm."), dCell("R")] }),
        new TableRow({ children: [dCell("Noah hat weniger als zehn Spiele auf dem Tablet."), dCell("F (uber dreissig Spiele)")] }),
        new TableRow({ children: [dCell("Noahs Vater macht sich Sorgen um die Bildschirmzeit."), dCell("F (seine Mutter)")] }),
        new TableRow({ children: [dCell("Zu viel Bildschirmzeit kann den Schlaf verschlechtern."), dCell("R")] }),
        new TableRow({ children: [dCell("Noah legt sein Handy abends ab 20 Uhr weg."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Handy, Tablet, Fernseher."),
    bullet("2. Hauptsaechlich zum Spielen (er hat uber 30 Spiele)."),
    bullet("3. Weil alle seine Freunde immer online sind."),
    bullet("4. Er legt das Handy ab 20 Uhr weg. Eigene Meinung akzeptieren — Begruendung wichtig."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Mediengeraete"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Handy  -  Internet  -  herunterladen  -  Nachrichten  -  Akku  -  anschauen  -  hochladen  -  App  -  surfen  -  ausschalten  -  online  -  Bildschirm  -  spielen  -  laden")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. Ich schicke meiner Freundin eine __________________ auf dem __________________."),
    p("2. Mein __________________ ist fast leer — ich muss es __________________."),
    p("3. Ich __________________ im Internet nach Informationen fuer die Schule."),
    p("4. Ich lade die neue __________________ auf mein Tablet __________________."),
    p("5. Wir __________________ zusammen einen Film am Fernseher __________________."),
    p("6. Ich __________________ ein Foto vom Urlaub __________________ — damit alle es sehen koennen."),
    p("7. Bevor ich schlafe, __________________ ich den Computer __________________."),
    p("8. Ich bin gerade nicht __________________ — kein WLAN hier."),
    empty(),
    pBold("Teil 2: Dialog — Mediendiskussion"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Mama"), dCell("Lukas, wie lange bist du schon am __________________?")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Nur eine Stunde! Ich schaue gerade einen Film __________________.")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Danach bitte den __________________ ausschalten. Du brauchst eine Pause.")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Okay. Darf ich danach noch kurz im __________________ surfen?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Ja, aber nur eine halbe Stunde. Und dann __________________ das Handy weg!")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Alright. Kann ich schnell noch eine App __________________?")] }),
        new TableRow({ children: [dCell("Mama"), dCell("Welche App? Zeig mir erst, was du __________________  moechtest.")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Dein Medienalltag — schreib selbst."),
    empty(),
    p("Ich benutze am liebsten __________________, weil __________________. Ich bin taeglich ca."),
    p("__________________ Stunden __________________ (online). Das finde ich __________________."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Mediengeraete (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Nachricht — Handy"),
    bullet("2. Akku — laden"),
    bullet("3. surfe"),
    bullet("4. App — herunter (herunterladen, trennbar)"),
    bullet("5. schauen — an (anschauen, trennbar)"),
    bullet("6. lade — hoch (hochladen, trennbar)"),
    bullet("7. schalte — aus (ausschalten, trennbar)"),
    bullet("8. online"),
    pItalic("Nicht verwendet (Ablenkwort): Internet (wird in Teil 2 benutzt), Bildschirm, spielen"),
    empty(),
    pBold("Teil 2: Dialog-Loesung"),
    bullet("Mama: Bildschirm"),
    bullet("Lukas (1): an (anschauen)"),
    bullet("Mama: Bildschirm / Computer / Fernseher"),
    bullet("Lukas (2): Internet"),
    bullet("Mama: leg (weglegen) / schalte ... aus"),
    bullet("Lukas: herunterladen"),
    bullet("Mama: herunterladen"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Ich benutze am liebsten mein Handy, weil ich damit Nachrichten schreiben und Musik hoeren kann. Ich bin taeglich ca. zwei Stunden online. Das finde ich manchmal zu viel."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Mediengeraete"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Trennbare Verben rund um Medien"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Infinitiv", { width: 2200 }), hCell("Praesens (ich)", { width: 2600 }), hCell("Perfekt", { width: 2600 }), hCell("Beispiel", { width: 2238 })] }),
        new TableRow({ children: [dCell("herunterladen"), dCell("ich lade ... herunter"), dCell("heruntergeladen"), dCell("Ich lade die App herunter.")] }),
        new TableRow({ children: [dCell("hochladen"), dCell("ich lade ... hoch"), dCell("hochgeladen"), dCell("Ich lade ein Foto hoch.")] }),
        new TableRow({ children: [dCell("anschauen"), dCell("ich schaue ... an"), dCell("angeschaut"), dCell("Ich schaue den Film an.")] }),
        new TableRow({ children: [dCell("ausschalten"), dCell("ich schalte ... aus"), dCell("ausgeschaltet"), dCell("Ich schalte den PC aus.")] }),
        new TableRow({ children: [dCell("einschalten"), dCell("ich schalte ... ein"), dCell("eingeschaltet"), dCell("Ich schalte das Handy ein.")] }),
        new TableRow({ children: [dCell("abspielen"), dCell("ich spiele ... ab"), dCell("abgespielt"), dCell("Ich spiele die Musik ab.")] }),
      ],
    }),
    empty(),
    pBold("Mediennutzung — Zeitangaben:"),
    bullet("Ich bin taeglich / jeden Tag ... Stunden online."),
    bullet("Ich benutze das Handy morgens / abends / in der Pause."),
    bullet("Am Wochenende schaue ich mehr / weniger fern."),
    bullet("Ich verbringe zu viel / zu wenig Zeit am Bildschirm."),
    bullet("Ich mache eine Bildschirmpause — ich lege das Handy weg."),
    empty(),
    pBold("Aufgabe: Schreib 5 Saetze ueber deine Mediennutzung. Benutze trennbare Verben."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Mediengeraete (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("Trennbare Verben im Praesens: Praefix geht ans Satzende (Ich lade die App herunter.)"),
    bullet("Im Nebensatz bleibt das Verb zusammen: ..., weil ich die App herunterlade."),
    bullet("Perfekt trennbarer Verben: ge- wird zwischen Praefix und Stamm eingefuegt: hoch-ge-laden, an-ge-schaut, aus-ge-schaltet."),
    bullet("Ausnahmen bei nicht-trennbaren Praefixen (be-, ver-, ent-): kein ge- im Partizip — aber diese kommen hier nicht vor."),
    empty(),
    pBold("Loesung Aufgabe — Mustersaetze"),
    bullet("Ich schalte abends den Computer aus."),
    bullet("Ich lade jeden Tag neue Musik herunter."),
    bullet("Abends schaue ich mit meiner Familie Filme an."),
    bullet("Manchmal lade ich Fotos vom Urlaub hoch."),
    bullet("Ich spiele die Playlist ab, waehrend ich lerne."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Mediengeraete"), empty(),
    pBold("Dialog 1: Medienstreit zu Hause"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Papa"), dCell("Emma, leg bitte das Handy weg! Wir essen gleich.")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Ich bin gleich fertig — ich schicke nur noch eine Nachricht.")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Du sagst das jetzt schon zum dritten Mal. Das Essen wird kalt.")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Okay, okay! Ich schalte es aus. Aber darf ich nachher noch einen Film anschauen?")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Nach dem Essen und nach den Hausaufgaben. Dann eine Stunde — einverstanden?")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Eine Stunde? Das ist so kurz! Der Film dauert fast zwei Stunden.")] }),
        new TableRow({ children: [dCell("Papa"), dCell("Dann schaust du heute die Haelfte und morgen den Rest. Deal?")] }),
        new TableRow({ children: [dCell("Emma"), dCell("Na gut. Deal!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Lieblings-App"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Kim"), dCell("Was ist deine Lieblings-App?")] }),
        new TableRow({ children: [dCell("Sven"), dCell("Ich nutze am liebsten eine App fuer Musik. Ich hoere damit jeden Tag Podcasts und Musik.")] }),
        new TableRow({ children: [dCell("Kim"), dCell("Cool! Ich benutze am liebsten eine Lern-App fuer Sprachen. Ich lerne damit Spanisch.")] }),
        new TableRow({ children: [dCell("Sven"), dCell("Echt? Wie viele Minuten am Tag lernst du damit?")] }),
        new TableRow({ children: [dCell("Kim"), dCell("Meistens 15 bis 20 Minuten. Es macht Spass und ich lerne schnell!")] }),
        new TableRow({ children: [dCell("Sven"), dCell("Das klingt super. Vielleicht lerne ich auch mal eine neue Sprache so.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Klassendiskussion — Handyregeln"),
    pItalic("Diskutiert: Welche Handyregeln findet ihr sinnvoll? Stimmt ab und begruendet eure Wahl."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Regel", { width: 6500 }), hCell("Dafuer / Dagegen", { width: 3138 })] }),
        new TableRow({ children: [dCell("Kein Handy beim Essen"), dCell("")] }),
        new TableRow({ children: [dCell("Handy ab 21 Uhr weglegen"), dCell("")] }),
        new TableRow({ children: [dCell("Maximal 2 Stunden Bildschirm pro Tag"), dCell("")] }),
        new TableRow({ children: [dCell("Kein Handy in der Schule"), dCell("")] }),
        new TableRow({ children: [dCell("Eigene Regel: ____________________"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Mediennutzung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Welches Geraet benutzt du am meisten?"), dCell("")] }),
        new TableRow({ children: [dCell("Wie lange bist du taeglich online?"), dCell("")] }),
        new TableRow({ children: [dCell("Was machst du am liebsten damit?"), dCell("")] }),
        new TableRow({ children: [dCell("Hast du Regeln fuer die Handynutzung?"), dCell("")] }),
        new TableRow({ children: [dCell("Was wuerdest du tun, wenn du kein Handy haettest?"), dCell("")] }),
      ],
    }),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Mediengeraete (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Leg bitte das Handy weg! = Imperativ + weglegen (trennbar)"),
    bullet("Ich bin gleich fertig. = gleich = in einem Moment"),
    bullet("Das Essen wird kalt. = werden + Adjektiv (Zustandsveraenderung)"),
    bullet("Darf ich ... anschauen? = duerfen + Infinitiv (Erlaubnis erfragen)"),
    bullet("einverstanden? = bist du einverstanden? = okav? (Zustimmung einholen)"),
    bullet("Deal! = Abmachung / Einigung (informell, Anglizismus)"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Ich nutze am liebsten ... = Superlativ gern → am liebsten"),
    bullet("Ich lerne damit Spanisch. = damit = mit dieser App (Pronominaladverb)"),
    bullet("Wie viele Minuten am Tag ...? = Frage nach Haeufigkeit/Dauer"),
    bullet("Das klingt super. = klingen + Adjektiv (Eindrucksverb)"),
    empty(),
    pBold("Diskussion Handyregeln: keine feste Loesung"),
    pItalic("Ziel: Argumente auf Deutsch formulieren. Foerderliche Phrasen: Ich finde das sinnvoll, weil ... / Das finde ich zu streng, weil ... / Man sollte ... / Es ist wichtig, dass ..."),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Mediengeraete"), empty(),
    pBold("Aufgabe 1: Schreib den Namen des Geraetes und was man damit machen kann."),
    p("[BILD 1: Vier Bilder — Smartphone, Laptop/Computer, Tablet, Fernseher]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[Bild A]", { width: 2350 }), hCell("[Bild B]", { width: 2350 }), hCell("[Bild C]", { width: 2350 }), hCell("[Bild D]", { width: 2588 })] }),
        new TableRow({ children: [dCell("Geraet: ____"), dCell("Geraet: ____"), dCell("Geraet: ____"), dCell("Geraet: ____")] }),
        new TableRow({ children: [dCell("Man kann: ____"), dCell("Man kann: ____"), dCell("Man kann: ____"), dCell("Man kann: ____")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Diagramm — Mediennutzung von Kindern (erfunden)"),
    p("[BILD 2: Balkendiagramm — Titel: 'Wie viele Stunden pro Tag nutzen Kinder (10-13 J.) Medien?' Balken: Handy: 2,5 Std. / Fernseher: 1,5 Std. / Tablet: 1,0 Std. / Computer: 0,5 Std.]"),
    empty(),
    p("1. Welches Geraet nutzen Kinder am meisten?  ____________________"),
    p("2. Wie viele Stunden pro Tag schauen Kinder fern?  ____________________"),
    p("3. Wie viele Stunden Bildschirmzeit haben Kinder insgesamt?  ____________________"),
    p("4. Findest du das zu viel oder okay? Schreib einen Satz mit deiner Meinung:"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Lies die Handy-Regeln und bewerte sie."),
    p("[BILD 3: Aushang am schwarzen Brett: 'Unsere Klassen-Handy-Regeln: 1. Handys bleiben im Rucksack waehrend des Unterrichts. 2. In der Pause darf man das Handy benutzen. 3. Fotos von Mitschuelerinnen und Mitschuelern nur mit Erlaubnis. 4. Keine gemeinen Nachrichten schicken.']"),
    empty(),
    p("1. Wann darf man das Handy laut den Regeln benutzen?  ____________________"),
    p("2. Was braucht man, um Fotos zu machen?  ____________________"),
    p("3. Was ist verboten?  ____________________"),
    p("4. Welche Regel findest du am wichtigsten? Warum?"),
    writeLine(55), empty(),
    pBold("Aufgabe 4: Erstelle deine eigenen Klassen-Handy-Regeln."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          pBold("Unsere Handy-Regeln:"),
          empty(),
          p("1. ____________________"),
          p("2. ____________________"),
          p("3. ____________________"),
          p("4. ____________________"),
        ],
      })]})],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Mediengeraete (LOESUNG)"), empty(),
    pBold("Aufgabe 1: (abhaengig von Bildreihenfolge)"),
    pItalic("Smartphone/Handy: Nachrichten, Fotos, Internet / Laptop/Computer: Hausaufgaben, surfen, spielen / Tablet: Videos, Spiele, lesen / Fernseher: Filme, Serien, Nachrichten schauen."),
    empty(),
    pBold("Aufgabe 2: Diagramm"),
    bullet("1. Das Handy (2,5 Stunden)."),
    bullet("2. 1,5 Stunden."),
    bullet("3. 2,5 + 1,5 + 1,0 + 0,5 = 5,5 Stunden insgesamt."),
    bullet("4. Eigene Meinung — Muster: Ich finde das zu viel, weil Kinder dann weniger Sport machen."),
    empty(),
    pBold("Aufgabe 3: Regeln"),
    bullet("1. In der Pause."),
    bullet("2. Die Erlaubnis der Person."),
    bullet("3. Gemeine Nachrichten schicken / Fotos ohne Erlaubnis machen."),
    bullet("4. Eigene Meinung — akzeptieren mit Begruendung."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: 4 Regeln sprachlich korrekt, klare Verbote oder Erlaubnisse formuliert. Man sollte / Man darf (nicht) / Es ist verboten, ... zu ... als Strukturen foerdern."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Fernsehen, Handy, Tablet, Computer");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
