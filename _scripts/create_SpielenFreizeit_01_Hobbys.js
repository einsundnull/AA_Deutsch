"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "08_SpielenFreizeit", "01_Hobbys");
const TOPIC = "A1_Kinder_SpielenFreizeit_01_Hobbys";
const BLUE = "1F4E79";
const GRAY = "888888";
const LIGHT = "D5E8F0";
if (!fs.existsSync(BASE)) fs.mkdirSync(BASE, { recursive: true });

const NUMBERING = { config: [{ reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] };
const PAGE = { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } };

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: BLUE, font: "Arial" })], spacing: { before: 240, after: 120 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 80 } }); }
function p(t, s) { return new Paragraph({ children: [new TextRun({ text: t, size: s || 24, font: "Arial" })], spacing: { before: 60, after: 60 } }); }
function pBold(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, font: "Arial" })], spacing: { before: 60, after: 60 } }); }
function pItalic(t) { return new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 22, color: GRAY, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function empty() { return new Paragraph({ children: [new TextRun("")], spacing: { before: 60, after: 60 } }); }
function writeLine() { return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun("")] }); }
function writeLines(n) { const a = []; for (let i = 0; i < n; i++) a.push(writeLine()); return a; }
function br() { return new Paragraph({ children: [new PageBreak()] }); }
function bullet(t) { return new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: t, size: 24, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function hCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: LIGHT }, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 22, font: "Arial" })] })] }); }
function dCell(t, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFFFFF" }, children: [new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })] })] }); }
function studentHead() { return new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4500, 4500], rows: [ new TableRow({ children: [hCell("Name:", 4500), hCell("Datum:", 4500)] }), new TableRow({ children: [dCell("", 4500), dCell("", 4500)] }) ] }); }
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Spielen & Freizeit — Hobbys", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeHobbyTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2400, 2400, 4838],
    rows: [
      new TableRow({ children: [hCell("Hobby", 2400), hCell("Verb", 2400), hCell("Satz", 4838)] }),
      new TableRow({ children: [dCell("lesen", 2400), dCell("lesen", 2400), dCell("Ich lese gern Bücher.", 4838)] }),
      new TableRow({ children: [dCell("malen / zeichnen", 2400), dCell("malen / zeichnen", 2400), dCell("Ich male gern Bilder.", 4838)] }),
      new TableRow({ children: [dCell("Musik hören", 2400), dCell("hören", 2400), dCell("Ich höre gern Musik.", 4838)] }),
      new TableRow({ children: [dCell("singen", 2400), dCell("singen", 2400), dCell("Ich singe in einem Chor.", 4838)] }),
      new TableRow({ children: [dCell("tanzen", 2400), dCell("tanzen", 2400), dCell("Ich tanze gern.", 4838)] }),
      new TableRow({ children: [dCell("kochen / backen", 2400), dCell("kochen / backen", 2400), dCell("Ich backe gern Kuchen.", 4838)] }),
      new TableRow({ children: [dCell("spielen (Spiele)", 2400), dCell("spielen", 2400), dCell("Ich spiele gern Brettspiele.", 4838)] }),
      new TableRow({ children: [dCell("basteln", 2400), dCell("basteln", 2400), dCell("Ich bastle gern.", 4838)] }),
      new TableRow({ children: [dCell("fotografieren", 2400), dCell("fotografieren", 2400), dCell("Ich fotografiere gern.", 4838)] }),
      new TableRow({ children: [dCell("ins Kino gehen", 2400), dCell("gehen", 2400), dCell("Ich gehe gern ins Kino.", 4838)] }),
      new TableRow({ children: [dCell("fernsehen", 2400), dCell("fernsehen", 2400), dCell("Ich sehe gern fern.", 4838)] }),
      new TableRow({ children: [dCell("Computer spielen", 2400), dCell("spielen", 2400), dCell("Ich spiele gern am Computer.", 4838)] }),
      new TableRow({ children: [dCell("mit Freunden treffen", 2400), dCell("treffen", 2400), dCell("Ich treffe mich gern mit Freunden.", 4838)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Schreibübung"), studentHead(), empty(),
    h2("Hobbys auf Deutsch"), makeHobbyTable(), empty(),
    h2("Aufgabe 1: Was machst du gern?"),
    p("Schreibe Sätze mit 'Ich ... gern'."),
    pItalic("Beispiel: lesen → Ich lese gern."),
    empty(),
    p("malen:        _______________________________________"),
    p("tanzen:       _______________________________________"),
    p("singen:       _______________________________________"),
    p("backen:       _______________________________________"),
    p("fernsehen:    _______________________________________"),
    p("basteln:      _______________________________________"),
    empty(),
    h2("Aufgabe 2: Meine Hobbys"),
    p("Beantworte die Fragen in ganzen Sätzen."),
    empty(),
    p("Was ist dein Lieblingshobby?"), ...writeLines(1),
    p("Was machst du am Wochenende?"), ...writeLines(1),
    p("Was machst du mit deinen Freunden?"), ...writeLines(1),
    p("Was möchtest du gern lernen?"), ...writeLines(1),
    empty(),
    h2("Aufgabe 3: Drinnen oder draußen?"),
    p("Sortiere die Hobbys in die richtige Spalte."),
    pItalic("lesen • malen • Fußball spielen • fernsehen • basteln • im Park spielen • singen • fotografieren • klettern • kochen"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Drinnen (zu Hause)", 4819), hCell("Draußen (im Freien)", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 4–6 Sätze über deine Hobbys."),
    pItalic("Mein Lieblingshobby ist... Ich mache es gern, weil... Am Wochenende..."),
    ...writeLines(6)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Schreibübung"), empty(),
    h2("Aufgabe 1: Was machst du gern?"),
    p("Ich male gern. / Ich tanze gern. / Ich singe gern."),
    p("Ich backe gern. / Ich sehe gern fern. / Ich bastle gern."),
    pItalic("Hinweis: fernsehen ist trennbar → ich sehe fern (nicht: ich fernsehe)"),
    empty(),
    h2("Aufgabe 2: Meine Hobbys"),
    p("Individuelle Antworten akzeptieren."),
    empty(),
    h2("Aufgabe 3: Drinnen oder draußen?"),
    p("Drinnen: lesen, malen, fernsehen, basteln, singen, kochen"),
    p("Draußen: Fußball spielen, im Park spielen, fotografieren, klettern"),
    pItalic("fotografieren kann auch drinnen sein — sinnvolle Zuordnung akzeptieren."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Leseübung"), studentHead(), empty(),
    h2("Text: Meine Freizeit"),
    p("Hallo! Ich bin Klara und ich bin 10 Jahre alt.", 26),
    p("In meiner Freizeit mache ich viele verschiedene Dinge.", 26),
    p("Am liebsten lese ich Bücher. Ich habe schon 20 Bücher gelesen!", 26),
    p("Dienstags gehe ich zum Tanzkurs. Tanzen macht mir sehr viel Spaß.", 26),
    p("Donnerstags male ich mit meiner Freundin Sophie.", 26),
    p("Wir malen zusammen Bilder und basteln auch manchmal.", 26),
    p("Am Wochenende sehe ich manchmal fern oder spiele am Computer.", 26),
    p("Aber am liebsten treffe ich mich mit meinen Freunden.", 26),
    p("Dann gehen wir in den Park oder ins Kino.", 26),
    p("Was ist mein Lieblingshobby? Das Lesen — natürlich!", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Klara ist 11 Jahre alt."),
    p("___ Klara liest gern Bücher."),
    p("___ Klara geht montags zum Tanzkurs."),
    p("___ Klara malt mit Sophie."),
    p("___ Klara geht nie ins Kino."),
    p("___ Klaras Lieblingshobby ist Lesen."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Was macht Klara dienstags?"), ...writeLines(1),
    p("2. Was macht Klara mit Sophie?"), ...writeLines(2),
    p("3. Was macht Klara am Wochenende?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Hobbys im Text"),
    p("Finde alle Hobbys im Text. Schreibe sie auf:"), ...writeLines(4),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Was machst du in deiner Freizeit? Schreibe 2–3 Sätze."),
    ...writeLines(3)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Klara ist 10 Jahre alt (nicht 11)."),
    p("R — Klara liest gern Bücher."),
    p("F — Klara geht dienstags zum Tanzkurs (nicht montags)."),
    p("R — Klara malt mit Sophie."),
    p("F — Klara geht manchmal ins Kino."),
    p("R — Klaras Lieblingshobby ist Lesen."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Dienstags geht Klara zum Tanzkurs."),
    p("2. Klara malt Bilder und bastelt manchmal mit Sophie."),
    p("3. Am Wochenende sieht Klara manchmal fern, spielt am Computer oder trifft Freunde."),
    empty(),
    h2("Aufgabe 3: Hobbys im Text"),
    p("lesen / tanzen / malen / basteln / fernsehen / Computer spielen / Freunde treffen / in den Park gehen / ins Kino gehen"),
    empty(),
    h2("Aufgabe 4: Und du?"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "lesen  •  malen  •  tanzen  •  singen  •  basteln  •  backen  •  fernsehen  •  fotografieren  •  Hobby  •  Freizeit  •  Spaß  •  gern  •  zusammen  •  treffen", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. In meiner _______ male ich gern Bilder."),
    p("2. Mein Lieblings_______ ist Lesen. Ich lese jeden Tag."),
    p("3. Wir _______ uns am Samstag. Dann spielen wir zusammen."),
    p("4. Ich _______ gern Fotos von Tieren und Natur."),
    p("5. Das _______ macht mir sehr viel _______."),
    p("6. Meine Schwester und ich _______ oft _______. Wir lieben Musik!"),
    empty(),
    h2("Teil B: Was macht Jonas?"),
    pItalic("Ergänze den Text über Jonas."),
    empty(),
    p("Jonas ist 9 Jahre alt. Er hat viele Hobbys."),
    p("Nach der Schule _______ er oft Bücher. Er liebt Abenteuergeschichten."),
    p("Dienstags _______ er in einem Chor. Er hat eine schöne Stimme."),
    p("Donnerstags _______ er mit seiner Oma Kuchen. Das ist sehr lecker!"),
    p("Am Wochenende _______ er gern fern oder _______ am Computer."),
    p("Am liebsten trifft er sich _______ mit seinen Freunden."),
    p("Dann _______ sie manchmal Bilder oder _______ aus Papier."),
    empty(),
    h2("Teil C: Was passt nicht?"),
    pItalic("Streiche das Wort durch, das nicht zu den anderen passt."),
    empty(),
    p("1. Hobbys drinnen: (lesen / malen / basteln / klettern / fernsehen)"),
    p("2. Kreative Hobbys: (malen / zeichnen / basteln / fernsehen / fotografieren)"),
    p("3. Musik-Hobbys: (singen / tanzen / Musik hören / lesen / ein Instrument spielen)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Schreibe 2 Sätze: Was ist dein Lieblingshobby?"),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. Freizeit"), p("2. Hobby"), p("3. treffen"),
    p("4. fotografiere"), p("5. Tanzen / Spaß"), p("6. singen / zusammen"),
    empty(),
    h2("Teil B: Was macht Jonas?"),
    p("liest / singt / backt / sieht / spielt / zusammen / malen / basteln"),
    empty(),
    h2("Teil C: Was passt nicht?"),
    p("1. klettern (draußen, nicht drinnen)"),
    p("2. fernsehen (nicht kreativ)"),
    p("3. lesen (kein Musik-Hobby)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["das Hobby", "Nomen (neutral)", "Was ist dein Lieblingshobby?"],
    ["die Freizeit", "Nomen (feminin)", "In meiner Freizeit lese ich gern."],
    ["lesen", "Verb", "Ich lese gern Bücher und Comics."],
    ["malen / zeichnen", "Verb", "Ich male gern Tiere."],
    ["tanzen", "Verb", "Ich tanze jeden Dienstag."],
    ["singen", "Verb", "Ich singe in einem Chor."],
    ["basteln", "Verb", "Wir basteln aus Papier und Kleber."],
    ["backen", "Verb", "Ich backe gern Kuchen mit Oma."],
    ["fernsehen", "Verb (trennbar)", "Ich sehe gern fern."],
    ["Musik hören", "Verb + Nomen", "Ich höre gern Musik."],
    ["fotografieren", "Verb", "Ich fotografiere gern Tiere."],
    ["Spaß machen", "Ausdruck", "Tanzen macht mir Spaß."],
    ["gern machen", "Ausdruck", "Ich male gern. (= ich mag malen)"],
    ["sich treffen", "Verb (reflexiv)", "Ich treffe mich mit Freunden."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2800), hCell("Kategorie", 1600), hCell("Beispielsatz", 5238)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2800), dCell(r[1], 1600), dCell(r[2], 5238)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Wortliste"), studentHead(), empty(),
    h2("Hobbys — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2800, 1600, 5238], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.slice(0, 12).map(r => p(`${r[0].split("/")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Schreibe auf jede Karte das Hobby + ein Bild davon."),
    p("Extra-Tipp: Schreibe auch den Satz 'Ich ... gern' auf die Rückseite.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("fernsehen ist trennbar: Ich sehe fern. (nicht: Ich fernsehe.)"),
    bullet("Spaß machen: Das Tanzen macht mir Spaß. (Dativ — als fester Ausdruck)"),
    bullet("gern: Ich lese gern. = Ich mag lesen. — beide Ausdrücke gleichwertig"),
    bullet("sich treffen (reflexiv): Ich treffe mich. / Du triffst dich. / Er trifft sich."),
    bullet("Hobbys oft als Verben: lesen, malen, tanzen — oder als Nomen: das Lesen, das Malen")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Neue Freunde"),
    pItalic("Zwei Kinder lernen sich kennen. Fülle die Lücken aus."),
    empty(),
    p("A: Hallo! Ich bin _______. Wie heißt du?"),
    p("B: Hi! Ich heiße _______. Was machst du gern in deiner Freizeit?"),
    p("A: Ich _______ gern und ich _______ auch gern. Und du?"),
    p("B: Ich _______ sehr gern. Das macht mir großen Spaß!"),
    p("A: Cool! Machst du das allein oder _______?"),
    p("B: Meistens _______. Mit meiner Freundin / meinem Freund _______."),
    p("A: Wir können das vielleicht mal _______ machen!"),
    p("B: Ja, gerne! Das wäre toll!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen. Wählt andere Hobbys."),
    empty(),
    h2("Dialog 2: Was machen wir heute?"),
    pItalic("Person A und B planen ihren Nachmittag."),
    empty(),
    p("A: Was machen wir heute Nachmittag?"),
    p("B: Ich möchte gern _______."),
    p("A: Hmm, ich _______ lieber _______. Das macht mir mehr Spaß."),
    p("B: Okay! Zuerst _______ wir und dann _______?"),
    p("A: Super Idee! Um wie viel Uhr _______?"),
    p("B: Um _______ Uhr? Ist das okay?"),
    p("A: Ja, perfekt! Bis dann!"),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Unsere Hobbys"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingshobby?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was machst du am Wochenende?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Machst du deine Hobbys allein oder mit anderen?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Welches Hobby möchtest du lernen?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was machst du nach der Schule?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Hobby-Pantomime"),
    p("Eine Person mimt ein Hobby ohne Worte. Die anderen raten."),
    pItalic("'Du liest!' / 'Du tanzt!' / 'Du malst!'"),
    p("Wer richtig rät, ist als nächstes dran. Nur Hobbys aus der Wortliste!")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Konversation"), empty(),
    h2("Dialog 1 + 2: Bewertungskriterien"),
    bullet("Hobbys korrekt auf Deutsch genannt"),
    bullet("Verben richtig konjugiert"),
    bullet("Verständlicher Dialog auf Deutsch"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("lese / male (oder andere Hobbys) / tanze (oder singt) / zusammen / zusammen / "),
    p("Individuelle Namen und Hobbys akzeptieren."),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Fokus: Hobbyverben korrekt konjugiert.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Hobbys — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Was ist das Hobby?"),
    p("[BILD 1: 8 Bilder von Kindern bei verschiedenen Hobbys: lesen, malen, tanzen, singen, basteln, fotografieren, fernsehen, backen — nummeriert 1–8]"),
    pItalic("Schreibe das deutsche Hobby unter jedes Bild."),
    p("1. _______ 2. _______ 3. _______ 4. _______"),
    p("5. _______ 6. _______ 7. _______ 8. _______"),
    empty(),
    h2("Aufgabe 2: Was macht das Kind?"),
    p("[BILD 2: Ein Kind sitzt an einem Tisch mit Pinsel, Farben und Papier und malt ein Bild]"),
    pItalic("Schreibe 3 Sätze über das Bild."),
    pItalic("Was macht das Kind? Was braucht es? Macht es ihm Spaß?"),
    ...writeLines(3),
    empty(),
    h2("Aufgabe 3: Meine Hobby-Woche"),
    p("[BILD 3: Leerer Wochenplan Mon–So mit je einem Feld pro Tag]"),
    pItalic("Schreibe dein Lieblingshobby für jeden Tag ein."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [1377, 1377, 1376, 1376, 1376, 1376, 1400], rows: [
      new TableRow({ children: [hCell("Mo", 1377), hCell("Di", 1377), hCell("Mi", 1376), hCell("Do", 1376), hCell("Fr", 1376), hCell("Sa", 1376), hCell("So", 1400)] }),
      new TableRow({ children: [dCell("", 1377), dCell("", 1377), dCell("", 1376), dCell("", 1376), dCell("", 1376), dCell("", 1376), dCell("", 1400)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Klassen-Umfrage — Lieblingshobby"),
    p("[BILD 4: Leeres Balkendiagramm mit Hobbys auf der X-Achse]"),
    pItalic("Frage 5 Mitschüler nach ihrem Lieblingshobby. Trage die Ergebnisse ein."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [3213, 3213, 3212], rows: [
      new TableRow({ children: [hCell("Name", 3213), hCell("Lieblingshobby", 3213), hCell("Satz", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] })
    ]})
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Hobbys Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Was ist das Hobby?"),
    p("Erwartete Antworten: lesen / malen / tanzen / singen / basteln / fotografieren / fernsehen / backen"),
    empty(),
    h2("Aufgabe 2: Was macht das Kind?"),
    p("Musterlösung: Das Kind malt ein Bild. / Es hat Pinsel und Farben. / Das macht ihm Spaß."),
    empty(),
    h2("Aufgabe 3: Meine Hobby-Woche"),
    p("Individuelle Antworten. Bewertung: Hobbys korrekt auf Deutsch."),
    empty(),
    h2("Aufgabe 4: Klassen-Umfrage"),
    p("Individuelle Antworten. Bewertung: 'Sein/Ihr Lieblingshobby ist...' korrekt formuliert.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Hobbys");
  console.log("Zielordner:", BASE);
  await schreiben();     await schreiben_L();
  await lesen();         await lesen_L();
  await luecken();       await luecken_L();
  await wortliste();     await wortliste_L();
  await konversation();  await konversation_L();
  await bildaufgaben();  await bildaufgaben_L();
  console.log("\nFertig! 12 Dateien erstellt.");
}
main().catch(console.error);
