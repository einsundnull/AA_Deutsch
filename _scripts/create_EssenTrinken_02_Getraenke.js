"use strict";
const path = require("path");
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, LevelFormat, PageBreak
} = require("docx");

const BASE = path.join(__dirname, "..", "A1_Kinder", "07_EssenTrinken", "02_Getraenke");
const TOPIC = "A1_Kinder_EssenTrinken_02_Getraenke";
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
function makeHeader() { return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "A1 Kinder — Essen & Trinken — Getränke", italics: true, size: 18, color: GRAY, font: "Arial" })] })] }); }
function makeFooter() { return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] }); }
async function save(doc, fn) { const buf = await Packer.toBuffer(doc); fs.writeFileSync(path.join(BASE, fn), buf); console.log("OK ", fn); }

function makeGetraenkeTable() {
  return new Table({
    width: { size: 9638, type: WidthType.DXA }, columnWidths: [2200, 1200, 2200, 4038],
    rows: [
      new TableRow({ children: [hCell("Getränk", 2200), hCell("Artikel", 1200), hCell("Plural", 2200), hCell("Beispielsatz", 4038)] }),
      new TableRow({ children: [dCell("Wasser", 2200), dCell("das", 1200), dCell("— (kein Plural)", 2200), dCell("Ich trinke Wasser.", 4038)] }),
      new TableRow({ children: [dCell("Milch", 2200), dCell("die", 1200), dCell("— (kein Plural)", 2200), dCell("Morgens trinke ich Milch.", 4038)] }),
      new TableRow({ children: [dCell("Saft", 2200), dCell("der", 1200), dCell("die Säfte", 2200), dCell("Der Apfelsaft ist lecker.", 4038)] }),
      new TableRow({ children: [dCell("Tee", 2200), dCell("der", 1200), dCell("die Tees", 2200), dCell("Ich trinke heißen Tee.", 4038)] }),
      new TableRow({ children: [dCell("Kakao", 2200), dCell("der", 1200), dCell("— (kein Plural)", 2200), dCell("Im Winter trinke ich Kakao.", 4038)] }),
      new TableRow({ children: [dCell("Limonade", 2200), dCell("die", 1200), dCell("die Limonaden", 2200), dCell("Die Limonade ist süß.", 4038)] }),
      new TableRow({ children: [dCell("Cola", 2200), dCell("die", 1200), dCell("die Colas", 2200), dCell("Cola trinke ich selten.", 4038)] }),
      new TableRow({ children: [dCell("Kaffee", 2200), dCell("der", 1200), dCell("— (kein Plural)", 2200), dCell("Meine Eltern trinken Kaffee.", 4038)] }),
      new TableRow({ children: [dCell("Sprudel", 2200), dCell("der", 1200), dCell("— (kein Plural)", 2200), dCell("Ich mag Sprudel nicht.", 4038)] }),
      new TableRow({ children: [dCell("Smoothie", 2200), dCell("der", 1200), dCell("die Smoothies", 2200), dCell("Der Smoothie ist gesund.", 4038)] }),
      new TableRow({ children: [dCell("heiß / kalt / kalt", 2200), dCell("Adjektiv", 1200), dCell("—", 2200), dCell("Der Tee ist heiß. Das Wasser ist kalt.", 4038)] })
    ]
  });
}

// 1. SCHREIBEN
async function schreiben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Schreibübung"), studentHead(), empty(),
    h2("Getränke auf Deutsch"), p("Lerne diese Wörter:"), makeGetraenkeTable(), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("Schreibe den richtigen Artikel."), pItalic("der / die / das"),
    empty(),
    p("_______ Wasser      _______ Milch       _______ Saft"),
    p("_______ Tee         _______ Kakao       _______ Limonade"),
    p("_______ Cola        _______ Kaffee      _______ Sprudel"),
    p("_______ Smoothie"),
    empty(),
    h2("Aufgabe 2: Was trinkst du wann?"),
    p("Schreibe ein Getränk für jede Situation."),
    empty(),
    p("Morgens zum Frühstück trinke ich: _______________________"),
    p("In der Schule trinke ich: _______________________"),
    p("Im Winter, wenn es kalt ist, trinke ich: _______________________"),
    p("Im Sommer, wenn es heiß ist, trinke ich: _______________________"),
    p("Wenn ich Sport mache, trinke ich: _______________________"),
    empty(),
    h2("Aufgabe 3: Heiß oder kalt?"),
    p("Sortiere die Getränke in die Tabelle."),
    pItalic("Tee • Limonade • Kakao • Wasser • Kaffee • Saft • Cola • Milch • Smoothie"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [3213, 3213, 3212], rows: [
      new TableRow({ children: [hCell("Heiß trinken", 3213), hCell("Kalt trinken", 3213), hCell("Heiß oder kalt", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] }),
      new TableRow({ children: [dCell("", 3213), dCell("", 3213), dCell("", 3212)] })
    ]}),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Schreibe 3–5 Sätze über dein Lieblingsgetränk."),
    pItalic("Mein Lieblingsgetränk ist... Ich trinke es gern, weil... Es ist..."),
    ...writeLines(5)
  ]}] });
  await save(doc, `${TOPIC}_Schreiben.docx`);
}

async function schreiben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Schreibübung"), empty(),
    h2("Aufgabe 1: Der, die oder das?"),
    p("das Wasser     die Milch      der Saft"),
    p("der Tee        der Kakao      die Limonade"),
    p("die Cola       der Kaffee     der Sprudel"),
    p("der Smoothie"),
    empty(),
    pItalic("Merkhilfe: die-Wörter: Milch, Limonade, Cola — die meisten enden auf -e oder -ade"),
    pItalic("das-Wörter: Wasser — Ausnahme, merken!"),
    empty(),
    h2("Aufgabe 2: Was trinkst du wann?"),
    p("Individuelle Antworten akzeptieren."),
    p("Musterlösung: Morgens: Milch / Schule: Wasser / Winter: Tee oder Kakao / Sommer: Wasser oder Saft / Sport: Wasser"),
    empty(),
    h2("Aufgabe 3: Heiß oder kalt?"),
    p("Heiß: Tee, Kakao, Kaffee"),
    p("Kalt: Limonade, Saft, Cola, Smoothie"),
    p("Heiß oder kalt: Wasser, Milch"),
    pItalic("Kakao kann auch kalt getrunken werden — sinnvolle Zuordnung akzeptieren."),
    empty(),
    h2("Aufgabe 4: Freies Schreiben"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Schreiben_LOESUNG.docx`);
}

// 2. LESEN
async function lesen() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Leseübung"), studentHead(), empty(),
    h2("Text: Im Café"),
    p("Heute gehen Lukas und seine Freundin Sophie ins Café.", 26),
    p("Das Café heißt \"Sonnenschein\" und ist sehr gemütlich.", 26),
    p("Die Kellnerin kommt und fragt: \"Was möchtet ihr trinken?\"", 26),
    p("Lukas sagt: \"Ich nehme einen Kakao, bitte. Es ist kalt draußen!\"", 26),
    p("Sophie sagt: \"Ich möchte einen Apfelsaft, bitte.\"", 26),
    p("Die Kellnerin bringt die Getränke. Der Kakao ist heiß und lecker.", 26),
    p("Sophie findet ihren Saft auch sehr gut.", 26),
    p("\"Darf ich auch ein Glas Wasser haben?\", fragt Lukas.", 26),
    p("\"Natürlich!\", sagt die Kellnerin und bringt das Wasser.", 26),
    p("Lukas und Sophie sitzen lange im Café und reden.", 26),
    p("Als sie gehen, sagt Sophie: \"Das war sehr schön! Wir kommen bald wieder!\"", 26),
    empty(),
    h2("Aufgabe 1: Richtig (R) oder falsch (F)?"),
    p("___ Das Café heißt 'Mondschein'."),
    p("___ Lukas bestellt einen Kakao."),
    p("___ Sophie trinkt Milch."),
    p("___ Der Kakao ist heiß."),
    p("___ Lukas bestellt auch Wasser."),
    p("___ Sophie möchte nicht wiederkommen."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Warum bestellt Lukas Kakao?"), ...writeLines(2),
    p("2. Was trinkt Sophie?"), ...writeLines(1),
    p("3. Was sagt Sophie am Ende?"), ...writeLines(2),
    empty(),
    h2("Aufgabe 3: Getränke im Text"),
    p("Finde alle Getränke im Text. Schreibe sie mit Artikel auf:"), ...writeLines(3),
    empty(),
    h2("Aufgabe 4: Im Café"),
    p("Was würdest du im Café bestellen? Schreibe 2 Sätze."),
    pItalic("Ich möchte... bestellen. / Ich trinke gern..."),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Lesen.docx`);
}

async function lesen_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Leseübung"), empty(),
    h2("Aufgabe 1: Richtig oder falsch?"),
    p("F — Das Café heißt 'Sonnenschein' (nicht 'Mondschein')."),
    p("R — Lukas bestellt einen Kakao."),
    p("F — Sophie trinkt Apfelsaft (nicht Milch)."),
    p("R — Der Kakao ist heiß."),
    p("R — Lukas bestellt auch Wasser."),
    p("F — Sophie möchte bald wiederkommen."),
    empty(),
    h2("Aufgabe 2: Fragen zum Text"),
    p("1. Lukas bestellt Kakao, weil es kalt draußen ist."),
    p("2. Sophie trinkt einen Apfelsaft."),
    p("3. Sophie sagt: 'Das war sehr schön! Wir kommen bald wieder!'"),
    empty(),
    h2("Aufgabe 3: Getränke im Text"),
    p("der Kakao / der Apfelsaft / das Wasser"),
    empty(),
    h2("Aufgabe 4: Im Café"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Lesen_LOESUNG.docx`);
}

// 3. LÜCKENTEXT
async function luecken() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Lückentext"), studentHead(), empty(),
    h2("Wörterkasten"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [9638], rows: [new TableRow({ children: [new TableCell({ width: { size: 9638, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "FFF2CC" }, children: [new Paragraph({ children: [new TextRun({ text: "Wasser  •  Milch  •  Saft  •  Tee  •  Kakao  •  Limonade  •  Kaffee  •  Cola  •  Smoothie  •  heiß  •  kalt  •  trinken  •  durstig", size: 24, font: "Arial" })] })] })] })] }),
    empty(),
    h2("Teil A: Sätze ergänzen"),
    pItalic("Fülle die Lücken mit dem richtigen Wort aus dem Kasten."),
    empty(),
    p("1. Im Winter trinke ich gern _______ Tee. Er wärmt mich."),
    p("2. Nach dem Sport bin ich _______. Ich trinke viel _______."),
    p("3. Kinder trinken oft _______ oder _______. Das ist gesund."),
    p("4. Erwachsene trinken morgens oft _______. Kinder trinken lieber _______."),
    p("5. Im Sommer ist _______ Limonade sehr erfrischend."),
    p("6. Ich mache einen _______ aus Bananen und Erdbeeren."),
    empty(),
    h2("Teil B: Im Café bestellen"),
    pItalic("Ergänze den Dialog."),
    empty(),
    p("Kellner:  Was möchtest du _______?"),
    p("Kind:     Ich möchte einen _______, bitte."),
    p("Kellner:  Mit _______ oder ohne Zucker?"),
    p("Kind:     Mit Zucker, bitte. Und ein Glas _______ auch."),
    p("Kellner:  Natürlich! Möchtest du deinen Saft _______ oder mit Eiswürfeln?"),
    p("Kind:     _______, bitte. Es ist heute sehr heiß."),
    empty(),
    h2("Teil C: Was passt nicht?"),
    pItalic("Streiche das Wort durch, das nicht passt."),
    empty(),
    p("1. Heiße Getränke: (Tee / Kakao / Cola / Kaffee)"),
    p("2. Kalte Getränke: (Limonade / Saft / Tee / Smoothie)"),
    p("3. Gesunde Getränke: (Wasser / Saft / Cola / Milch)"),
    p("4. Süße Getränke: (Limonade / Cola / Wasser / Kakao)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Was trinkst du am liebsten? Schreibe 2 Sätze."),
    ...writeLines(2)
  ]}] });
  await save(doc, `${TOPIC}_Luecken.docx`);
}

async function luecken_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Lückentext"), empty(),
    h2("Teil A: Sätze ergänzen"),
    p("1. heißen"), p("2. durstig / Wasser"), p("3. Milch / Saft"),
    p("4. Kaffee / Kakao (oder Milch)"), p("5. kalte"), p("6. Smoothie"),
    empty(),
    h2("Teil B: Im Café bestellen"),
    p("trinken / Saft (oder Kakao / Tee) / Zucker / Wasser / kalt / Kalt"),
    pItalic("Sinnvolle Geträn­ke­wahl akzeptieren."),
    empty(),
    h2("Teil C: Was passt nicht?"),
    p("1. Cola (nicht heiß)"),
    p("2. Tee (wird meist heiß getrunken)"),
    p("3. Cola (nicht besonders gesund)"),
    p("4. Wasser (nicht süß)"),
    empty(),
    h2("Teil D: Freie Aufgabe"),
    p("Individuelle Antworten akzeptieren.")
  ]}] });
  await save(doc, `${TOPIC}_Luecken_LOESUNG.docx`);
}

// 4. WORTLISTE
async function wortliste() {
  const rows = [
    ["das Wasser", "Nomen (neutral)", "Ich trinke jeden Tag viel Wasser."],
    ["die Milch", "Nomen (feminin)", "Morgens trinke ich ein Glas Milch."],
    ["der Saft", "Nomen (maskulin)", "Der Apfelsaft ist mein Lieblingsgetränk."],
    ["der Tee", "Nomen (maskulin)", "Ich trinke heißen Tee, wenn ich krank bin."],
    ["der Kakao", "Nomen (maskulin)", "Im Winter ist Kakao sehr lecker."],
    ["die Limonade", "Nomen (feminin)", "Die Limonade ist sehr süß."],
    ["die Cola", "Nomen (feminin)", "Cola trinke ich nur manchmal."],
    ["der Kaffee", "Nomen (maskulin)", "Meine Eltern trinken morgens Kaffee."],
    ["der Smoothie", "Nomen (maskulin)", "Der Smoothie ist gesund und lecker."],
    ["trinken", "Verb", "Ich trinke gern Saft."],
    ["durstig", "Adjektiv", "Nach dem Sport bin ich durstig."],
    ["heiß / kalt", "Adjektiv", "Der Tee ist heiß. Das Wasser ist kalt."],
    ["ein Glas", "Nomen (neutral)", "Ich trinke ein Glas Wasser."],
    ["eine Flasche", "Nomen (feminin)", "Ich kaufe eine Flasche Saft."]
  ];
  const tableRows = [new TableRow({ children: [hCell("Wort", 2500), hCell("Wortart", 1700), hCell("Beispielsatz", 5438)] })];
  rows.forEach(r => tableRows.push(new TableRow({ children: [dCell(r[0], 2500), dCell(r[1], 1700), dCell(r[2], 5438)] })));
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Wortliste"), studentHead(), empty(),
    h2("Getränke — Wörter und Beispiele"),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [2500, 1700, 5438], rows: tableRows }),
    empty(),
    h2("Übersetzung"),
    p("Schreibe die Übersetzung in deine Sprache:"),
    empty(),
    ...rows.slice(0, 11).map(r => p(`${r[0].split("(")[0].trim()}: _______________________________`)),
    empty(),
    h2("Lernkarten-Tipp"),
    p("Zeichne das Glas oder die Flasche auf die Karte. Schreibe den Artikel groß!"),
    p("Extra-Tipp: Schreibe 'heiß' oder 'kalt' dazu.")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste.docx`);
}

async function wortliste_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Wortliste"), empty(),
    p("Die Wortliste ist eine Lernhilfe — keine Aufgaben mit festen Lösungen."),
    empty(),
    h2("Wichtige Grammatikhinweise für den Unterricht"),
    bullet("das Wasser — Ausnahme: neutrum, obwohl viele -er-Wörter maskulin sind"),
    bullet("trinken: ich trinke / du trinkst / er trinkt — regelmäßiges Verb"),
    bullet("Mengenangaben: ein Glas Wasser, eine Flasche Saft, eine Tasse Tee"),
    bullet("Zusammensetzungen: Apfelsaft, Orangensaft, Fruchtsaft — immer der Saft"),
    bullet("durstig sein: Ich bin durstig. (Adjektiv mit 'sein', nicht 'haben')")
  ]}] });
  await save(doc, `${TOPIC}_Wortliste_LOESUNG.docx`);
}

// 5. KONVERSATION
async function konversation() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Konversation"), studentHead(), empty(),
    h2("Dialog 1: Im Café / Restaurant bestellen"),
    pItalic("Person A = Kellner/in, Person B = Gast. Fülle die Lücken aus."),
    empty(),
    p("Kellner:  Guten Tag! Was möchten Sie trinken?"),
    p("Gast:     Ich möchte _______, bitte."),
    p("Kellner:  Groß oder klein?"),
    p("Gast:     _______, bitte."),
    p("Kellner:  Möchten Sie noch etwas dazu?"),
    p("Gast:     Ja, ein Glas _______ bitte."),
    p("Kellner:  Natürlich. Hat es Ihnen geschmeckt?"),
    p("Gast:     Ja, _______ war sehr lecker! Danke."),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen. Wählt andere Getränke."),
    empty(),
    h2("Dialog 2: Was trinkst du?"),
    pItalic("Zwei Freunde reden über ihre Lieblingsgetränke."),
    empty(),
    p("A: Was trinkst du am liebsten?"),
    p("B: Ich trinke am liebsten _______."),
    p("A: Warum magst du _______ so gern?"),
    p("B: Weil es so _______ schmeckt!"),
    p("A: Trinkst du auch gern _______?"),
    p("B: Nein, _______ ist mir zu _______. Ich trinke lieber _______."),
    empty(),
    pBold("Rollentausch: Tauscht die Rollen."),
    empty(),
    h2("Partnerinterview: Trinkgewohnheiten"),
    pItalic("Fragt euch gegenseitig. Schreibt die Antworten auf."),
    new Table({ width: { size: 9638, type: WidthType.DXA }, columnWidths: [4819, 4819], rows: [
      new TableRow({ children: [hCell("Frage", 4819), hCell("Antwort (schreibe auf)", 4819)] }),
      new TableRow({ children: [dCell("Was ist dein Lieblingsgetränk?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trinkst du zum Frühstück?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Trinkst du lieber heiße oder kalte Getränke?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trinkst du beim Sport?", 4819), dCell("", 4819)] }),
      new TableRow({ children: [dCell("Was trinkst du nicht gern?", 4819), dCell("", 4819)] })
    ]}),
    empty(),
    h2("Gruppenspiel: Getränke raten"),
    p("Eine Person denkt an ein Getränk. Die anderen stellen Ja/Nein-Fragen:"),
    bullet("Ist es heiß?"),
    bullet("Ist es süß?"),
    bullet("Ist es eine Farbe? (z. B. ist es orange?)"),
    bullet("Trinkt man es morgens?"),
    p("Wer das Getränk errät, ist als nächstes dran!")
  ]}] });
  await save(doc, `${TOPIC}_Konversation.docx`);
}

async function konversation_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Konversation"), empty(),
    h2("Dialog 1 + 2: Bewertungskriterien"),
    bullet("Getränke korrekt auf Deutsch benannt"),
    bullet("Verben trinken / mögen / schmecken verwendet"),
    bullet("Verständlicher Dialog auf Deutsch geführt"),
    bullet("Rollentausch durchgeführt"),
    empty(),
    h2("Dialog 1: Mögliche Lösungen"),
    p("einen Saft (oder Tee / Kakao) / Groß (oder Klein) / Wasser / der Saft (oder Kakao)"),
    empty(),
    h2("Partnerinterview"),
    p("Individuelle Antworten akzeptieren. Fokus: Getränke-Vokabular korrekt auf Deutsch.")
  ]}] });
  await save(doc, `${TOPIC}_Konversation_LOESUNG.docx`);
}

// 6. BILDAUFGABEN
async function bildaufgaben() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("Getränke — Bildaufgaben"), studentHead(), empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("[BILD 1: 8 Bilder von Getränken in Gläsern oder Flaschen: Wasser, Milch, Apfelsaft, Tee, Kakao, Limonade, Cola, Smoothie — nummeriert 1–8]"),
    pItalic("Schreibe den deutschen Namen mit Artikel unter jedes Bild."),
    p("1. _______ 2. _______ 3. _______ 4. _______"),
    p("5. _______ 6. _______ 7. _______ 8. _______"),
    empty(),
    h2("Aufgabe 2: Im Café"),
    p("[BILD 2: Café-Szene — Kellnerin steht am Tisch, zwei Kinder sitzen, vor ihnen stehen verschiedene Getränke]"),
    pItalic("Beantworte die Fragen:"),
    p("1. Was trinkt das erste Kind?  _______________________"),
    p("2. Was trinkt das zweite Kind? _______________________"),
    p("3. Schreibe in die Sprechblase der Kellnerin:"),
    p("   [SPRECHBLASE: Was möchtet ihr _______ ?]"),
    empty(),
    h2("Aufgabe 3: Heiß oder kalt?"),
    p("[BILD 3: 6 Bilder — dampfende Tasse Tee, Glas Cola mit Eiswürfeln, heiße Kakaotasse, Flasche Wasser, Glas Apfelsaft, Tasse Kaffee]"),
    pItalic("Schreibe unter jedes Bild: heiß oder kalt."),
    p("1. _______ 2. _______ 3. _______"),
    p("4. _______ 5. _______ 6. _______"),
    empty(),
    h2("Aufgabe 4: Mein Getränketag"),
    p("[BILD 4: Tagesablauf mit 4 Uhrzeiten: 7:00, 12:00, 15:00, 19:00 — je ein leeres Glas]"),
    pItalic("Was trinkst du zu diesen Zeiten? Schreibe das Getränk ans Glas und male es an."),
    empty(),
    h2("Aufgabe 5: Speisekarte gestalten"),
    p("[BILD 5: Leere Getränkekarte mit 6 freien Feldern]"),
    pItalic("Schreibe 6 Getränke auf die Karte. Erfinde auch einen Preis (in Euro)."),
    pItalic("Beispiel: Apfelsaft 0,80 € / Kakao 1,50 €")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben.docx`);
}

async function bildaufgaben_L() {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: PAGE }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: [
    h1("LÖSUNG — Getränke Bildaufgaben"), empty(),
    pItalic("Hinweis: Die Antworten hängen von den eingefügten Bildern ab."),
    empty(),
    h2("Aufgabe 1: Was ist das?"),
    p("Erwartete Antworten: das Wasser / die Milch / der Apfelsaft / der Tee /"),
    p("der Kakao / die Limonade / die Cola / der Smoothie"),
    empty(),
    h2("Aufgabe 2: Im Café"),
    p("Antworten abhängig von Bildinhalt."),
    p("Sprechblase: 'Was möchtet ihr trinken?'"),
    empty(),
    h2("Aufgabe 3: Heiß oder kalt?"),
    p("Tee: heiß / Cola: kalt / Kakao: heiß / Wasser: kalt / Saft: kalt / Kaffee: heiß"),
    empty(),
    h2("Aufgabe 4: Mein Getränketag"),
    p("Individuelle Antworten. Bewertung: Getränke korrekt auf Deutsch benannt."),
    empty(),
    h2("Aufgabe 5: Speisekarte gestalten"),
    p("Individuelle Antworten. Bewertung: Getränke mit Artikel, sinnvolle Preise.")
  ]}] });
  await save(doc, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
}

// MAIN
async function main() {
  console.log("Erstelle Unterpunkt: Getränke");
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
