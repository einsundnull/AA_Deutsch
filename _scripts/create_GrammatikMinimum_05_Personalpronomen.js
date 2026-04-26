"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A1_Kinder", "13_GrammatikMinimum", "05_Personalpronomen");
const TOPIC     = "A1_Kinder_GrammatikMinimum_05_Personalpronomen";
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

// ── Personalpronomen-Tabelle ──────────────────────────────────────────────────
function makePronomenTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Person", { width: 1700 }), hCell("Pronomen", { width: 2000 }), hCell("Bedeutung", { width: 2800 }), hCell("Beispielsatz", { width: 3000 })] }),
      new TableRow({ children: [dCell("1. P. Sg."),  dCell("ich"),       dCell("ich selbst (1 Person)"),         dCell("Ich heisse Anna.")] }),
      new TableRow({ children: [dCell("2. P. Sg."),  dCell("du"),        dCell("eine andere Person (informell)"),dCell("Du bist mein Freund.")] }),
      new TableRow({ children: [dCell("3. P. Sg."),  dCell("er"),        dCell("ein Mann / Junge"),              dCell("Er ist 9 Jahre alt.")] }),
      new TableRow({ children: [dCell("3. P. Sg."),  dCell("sie"),       dCell("eine Frau / ein Maedchen"),      dCell("Sie heisst Lisa.")] }),
      new TableRow({ children: [dCell("3. P. Sg."),  dCell("es"),        dCell("ein Kind / Ding (Neutrum)"),     dCell("Es regnet heute.")] }),
      new TableRow({ children: [dCell("1. P. Pl."),  dCell("wir"),       dCell("ich + andere"),                  dCell("Wir spielen Fussball.")] }),
      new TableRow({ children: [dCell("2. P. Pl."),  dCell("ihr"),       dCell("mehrere andere (informell)"),    dCell("Ihr seid lustig.")] }),
      new TableRow({ children: [dCell("3. P. Pl."),  dCell("sie"),       dCell("mehrere Personen / Dinge"),      dCell("Sie kommen aus Berlin.")] }),
      new TableRow({ children: [dCell("Hoeflich"),   dCell("Sie"),       dCell("formell (immer gross!)"),        dCell("Wie heissen Sie?")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Personalpronomen"), empty(),
    pBold("Personalpronomen ersetzen Personen oder Dinge."),
    bullet("Anna ist 8. → Sie ist 8."),
    bullet("Tom mag Pizza. → Er mag Pizza."),
    bullet("Das Buch ist neu. → Es ist neu."),
    empty(),
    h2("Lerne diese Pronomen:"),
    makePronomenTable(),
    empty(),
    pBold("Aufgabe 1: Schreib das richtige Pronomen (ich / du / er / sie / es / wir / ihr / sie)."),
    empty(),
    p("1. __________________ heisse Lukas."),
    p("2. Wie heisst __________________?"),
    p("3. Mama ist Lehrerin. __________________ ist sehr nett."),
    p("4. Mein Bruder spielt Klavier. __________________ ist 12 Jahre alt."),
    p("5. Das Buch ist gross. __________________ ist auf dem Tisch."),
    p("6. Anna und ich gehen zur Schule. __________________ sind Freunde."),
    p("7. __________________ Kinder, kommt schnell hierher!"),
    p("8. Tom und Lisa singen. __________________ singen schoen."),
    empty(),
    pBold("Aufgabe 2: Ersetze die Person/Sache mit einem Pronomen."),
    empty(),
    p("Beispiel: Anna geht in die Schule. → Sie geht in die Schule."),
    empty(),
    p("1. Tom hat einen Hund."),
    writeLine(55), empty(),
    p("2. Mama und Papa fahren ans Meer."),
    writeLine(55), empty(),
    p("3. Das Auto ist rot."),
    writeLine(55), empty(),
    p("4. Lisa und Sara spielen Tennis."),
    writeLine(55), empty(),
    p("5. Mein Vater liest ein Buch."),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Schreib 4 Saetze ueber dich und deine Familie. Benutze verschiedene Pronomen!"),
    empty(),
    ...writeLines(4, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Personalpronomen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Pronomen einsetzen"),
    bullet("1. Ich"), bullet("2. du"), bullet("3. Sie"),
    bullet("4. Er"), bullet("5. Es"), bullet("6. Wir"),
    bullet("7. Ihr"), bullet("8. Sie"),
    empty(),
    pBold("Aufgabe 2: Person/Sache ersetzen"),
    bullet("1. Er hat einen Hund."),
    bullet("2. Sie fahren ans Meer."),
    bullet("3. Es ist rot."),
    bullet("4. Sie spielen Tennis."),
    bullet("5. Er liest ein Buch."),
    empty(),
    pBold("Aufgabe 3: Musterantwort"),
    pItalic("Ich heisse Lisa und ich bin 9 Jahre alt. Mein Bruder ist juenger. Er ist 6 Jahre alt. Meine Eltern arbeiten viel — sie sind sehr beschaeftigt. Aber wir essen jeden Abend zusammen."),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Personalpronomen"), empty(),
    pBold("Lies den Text. Markiere alle Personalpronomen!"), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Hallo! Ich heisse Marie und ich bin 9 Jahre alt."),
          p("Ich habe einen Bruder. Er heisst Felix und er ist 11 Jahre alt."),
          p("Wir gehen zusammen zur Schule. Sie ist nicht weit weg."),
          p("Meine beste Freundin heisst Lara. Sie ist sehr lustig."),
          p("Lara hat einen Hund. Er heisst Bello und er ist sehr gross."),
          p("Am Wochenende gehen wir oft in den Park. Dort ist es schoen."),
          p("Manchmal kommt auch unser Cousin. Er wohnt in Berlin."),
          p("Wir spielen alle zusammen. Es macht viel Spass!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Wer/Was ist gemeint? Schreib den Namen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Pronomen aus dem Text", { width: 4750 }), hCell("Wer / Was?", { width: 4750 })] }),
        new TableRow({ children: [dCell("'Ich heisse Marie' → 'Ich' = ?"),               dCell("")] }),
        new TableRow({ children: [dCell("'Er heisst Felix' → 'Er' = ?"),                  dCell("")] }),
        new TableRow({ children: [dCell("'Sie ist nicht weit weg' → 'Sie' = ?"),          dCell("")] }),
        new TableRow({ children: [dCell("'Sie ist sehr lustig' → 'Sie' = ?"),             dCell("")] }),
        new TableRow({ children: [dCell("'Er heisst Bello' → 'Er' = ?"),                  dCell("")] }),
        new TableRow({ children: [dCell("'Wir spielen alle' → 'Wir' = ?"),                dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen mit Pronomen."),
    empty(),
    p("1. Wie alt ist Marie?"),
    writeLine(55), empty(),
    p("2. Wo wohnt der Cousin?"),
    writeLine(55), empty(),
    p("3. Wer ist Bello?"),
    writeLine(55), empty(),
    p("4. Wie ist Lara?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welche Pronomen sind im Text? Schreib alle, die du findest:"),
    writeLine(55),
    writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Personalpronomen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Wer / Was?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Pronomen", { width: 4750 }), hCell("Wer / Was?", { width: 4750 })] }),
        new TableRow({ children: [dCell("Ich heisse Marie"),       dCell("Marie (die Erzaehlerin)")] }),
        new TableRow({ children: [dCell("Er heisst Felix"),         dCell("der Bruder")] }),
        new TableRow({ children: [dCell("Sie ist nicht weit weg"),  dCell("die Schule")] }),
        new TableRow({ children: [dCell("Sie ist sehr lustig"),     dCell("Lara")] }),
        new TableRow({ children: [dCell("Er heisst Bello"),         dCell("der Hund")] }),
        new TableRow({ children: [dCell("Wir spielen"),             dCell("Marie, Felix, Lara, Cousin")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten mit Pronomen"),
    bullet("1. Sie ist 9 Jahre alt."),
    bullet("2. Er wohnt in Berlin."),
    bullet("3. Er ist der Hund von Lara."),
    bullet("4. Sie ist sehr lustig."),
    empty(),
    pBold("Aufgabe 3: Pronomen im Text"),
    p("ich, er, wir, sie, es, unser (Possessiv)"),
    pItalic("Beispiele: 'Ich heisse...', 'Er heisst Felix', 'Wir gehen zur Schule', 'Sie ist nicht weit', 'Es macht viel Spass'."),
  ]);
}

// ── LUECKENTEXT ────────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Personalpronomen"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("ich  -  du  -  er  -  sie  -  es  -  wir  -  ihr  -  sie  -  Sie")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Singular"),
    empty(),
    p("1. __________________ bin Sara."),
    p("2. Wie heisst __________________?"),
    p("3. Tom ist mein Freund. __________________ ist sehr nett."),
    p("4. Mama kocht. __________________ macht Pizza."),
    p("5. Das Auto ist neu. __________________ ist rot."),
    empty(),
    pBold("Teil 2: Plural"),
    empty(),
    p("1. Anna und ich sind Freunde. __________________ gehen zusammen zur Schule."),
    p("2. Kinder, was macht __________________ heute?"),
    p("3. Tom, Lisa und Max kommen. __________________ sind meine Freunde."),
    empty(),
    pBold("Teil 3: Hoefliche Anrede 'Sie'"),
    empty(),
    p("1. Frau Schmidt, wie heissen __________________?"),
    p("2. Herr Mueller, wo wohnen __________________?"),
    p("3. Entschuldigung, koennen __________________ mir helfen?"),
    empty(),
    pBold("Teil 4: Welches Pronomen passt? Setz ein."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person/Sache", { width: 4750 }), hCell("Pronomen", { width: 4750 })] }),
        new TableRow({ children: [dCell("Mein Vater"),                dCell("____")] }),
        new TableRow({ children: [dCell("Meine Schwester"),           dCell("____")] }),
        new TableRow({ children: [dCell("Das Maedchen (das Kind)"),   dCell("____")] }),
        new TableRow({ children: [dCell("Tom und ich"),               dCell("____")] }),
        new TableRow({ children: [dCell("Anna und Lisa"),             dCell("____")] }),
        new TableRow({ children: [dCell("Du und deine Schwester"),    dCell("____")] }),
      ],
    }),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Personalpronomen (LOESUNG)"), empty(),
    pBold("Teil 1: Singular"),
    bullet("1. Ich"), bullet("2. du"), bullet("3. Er"),
    bullet("4. Sie"), bullet("5. Es"),
    empty(),
    pBold("Teil 2: Plural"),
    bullet("1. Wir"), bullet("2. ihr"), bullet("3. Sie"),
    empty(),
    pBold("Teil 3: Hoefliche Anrede"),
    bullet("1. Sie (immer gross!)"),
    bullet("2. Sie"),
    bullet("3. Sie"),
    pItalic("Wichtig: Das hoefliche 'Sie' wird IMMER grossgeschrieben — auch in der Mitte des Satzes!"),
    empty(),
    pBold("Teil 4: Pronomen-Zuordnung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person/Sache", { width: 4750 }), hCell("Pronomen", { width: 4750 })] }),
        new TableRow({ children: [dCell("Mein Vater"),                dCell("er")] }),
        new TableRow({ children: [dCell("Meine Schwester"),           dCell("sie")] }),
        new TableRow({ children: [dCell("Das Maedchen (das Kind)"),   dCell("es (Achtung: 'das Maedchen' ist neutrum!)")] }),
        new TableRow({ children: [dCell("Tom und ich"),               dCell("wir")] }),
        new TableRow({ children: [dCell("Anna und Lisa"),             dCell("sie (Plural)")] }),
        new TableRow({ children: [dCell("Du und deine Schwester"),    dCell("ihr")] }),
      ],
    }),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Personalpronomen"), empty(),
    makePronomenTable(),
    empty(),
    h2("So funktioniert's"),
    pBold("Singular (eine Person/Sache):"),
    bullet("ICH = die sprechende Person (z. B. ich, Anna)"),
    bullet("DU = die Person, mit der man spricht (Freund, Familie, Kind)"),
    bullet("ER = ein Mann, ein Junge, ein maennliches Tier (DER Hund → er)"),
    bullet("SIE = eine Frau, ein Maedchen (DIE Katze → sie)"),
    bullet("ES = ein Kind, ein Ding mit Artikel DAS (das Auto → es)"),
    empty(),
    pBold("Plural (mehrere):"),
    bullet("WIR = ich + andere (ich und Tom = wir)"),
    bullet("IHR = mehrere Personen, mit denen man spricht (Kinder, Freunde)"),
    bullet("SIE = mehrere Personen/Dinge ueber die man spricht (Tom und Lisa = sie)"),
    empty(),
    pBold("Hoefliche Form 'SIE' (immer gross!):"),
    bullet("Verwendet man fuer fremde Erwachsene"),
    bullet("Beispiel: 'Wie heissen Sie, Frau Mueller?'"),
    bullet("Im Singular UND Plural gleich!"),
    empty(),
    h2("Tipp zum Lernen"),
    bullet("Bei Tieren und Dingen: Schau auf den Artikel — der/die/das gibt das Pronomen!"),
    bullet("der → er  |  die → sie  |  das → es  |  die (Plural) → sie"),
    empty(),
    pBold("Aufgabe: Schreib zu jedem Pronomen einen Satz."),
    p("ich:"), writeLine(55), empty(),
    p("du:"), writeLine(55), empty(),
    p("er:"), writeLine(55), empty(),
    p("sie (Singular):"), writeLine(55), empty(),
    p("es:"), writeLine(55), empty(),
    p("wir:"), writeLine(55), empty(),
    p("ihr:"), writeLine(55), empty(),
    p("sie (Plural):"), writeLine(55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Personalpronomen (LOESUNG)"), empty(),
    makePronomenTable(),
    empty(),
    pBold("Wichtigste Regeln zusammengefasst:"),
    bullet("Pronomen ersetzen Nomen: 'der Hund' → 'er'."),
    bullet("Beim Pronomen muss das Verb dazupassen: ich BIN, du BIST, er IST, ..."),
    bullet("'sie' kann 3 Bedeutungen haben: 1) sie (Singular Frau), 2) sie (Plural), 3) Sie (hoeflich)"),
    bullet("Welche Bedeutung? → Verbform und Kontext zeigen es: 'sie ist' (1 Frau) vs. 'sie sind' (mehrere)"),
    empty(),
    pBold("Beispielsaetze (Loesung):"),
    bullet("ich: Ich heisse Anna."),
    bullet("du: Du bist mein bester Freund."),
    bullet("er: Mein Bruder ist 10. Er spielt Fussball."),
    bullet("sie (Singular): Mama kocht. Sie macht Pizza."),
    bullet("es: Das Auto ist neu. Es ist rot."),
    bullet("wir: Tom und ich sind Freunde. Wir spielen zusammen."),
    bullet("ihr: Kinder, kommt! Wann kommt ihr?"),
    bullet("sie (Plural): Anna und Lisa sind Schwestern. Sie sind klein."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Personalpronomen"), empty(),
    pBold("Dialog 1: Du-Form (informell)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Hallo! Wie heisst du?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ich heisse Tom. Und du?")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Ich bin Anna. Wie alt bist du?")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ich bin 9. Hast du Geschwister?")] }),
        new TableRow({ children: [dCell("Anna"),  dCell("Ja, ich habe einen Bruder. Er heisst Max.")] }),
        new TableRow({ children: [dCell("Tom"),   dCell("Ich habe eine Schwester. Sie ist 6.")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Sie-Form (hoeflich)"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lisa"),         dCell("Guten Tag, Frau Schmidt! Wie geht es Ihnen?")] }),
        new TableRow({ children: [dCell("Frau Schmidt"), dCell("Danke, mir geht es gut. Und dir?")] }),
        new TableRow({ children: [dCell("Lisa"),         dCell("Danke, auch gut! Was machen Sie hier?")] }),
        new TableRow({ children: [dCell("Frau Schmidt"), dCell("Ich kaufe Brot. Sind Sie auch hier zum Einkaufen?")] }),
        new TableRow({ children: [dCell("Lisa"),         dCell("Ja, ich kaufe Milch fuer meine Mama.")] }),
      ],
    }),
    pItalic("Hinweis: Die Erwachsene sagt zum Kind 'du', das Kind sagt zur Erwachsenen 'Sie'."),
    empty(),
    pBold("Dialog 3: Wir / Ihr"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Was macht ihr in den Ferien?")] }),
        new TableRow({ children: [dCell("Tom"),       dCell("Wir fahren nach Italien!")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Toll! Habt ihr Hotelzimmer schon?")] }),
        new TableRow({ children: [dCell("Tom"),       dCell("Ja, wir haben ein grosses Zimmer am Meer.")] }),
        new TableRow({ children: [dCell("Lehrerin"), dCell("Wann kommt ihr zurueck?")] }),
        new TableRow({ children: [dCell("Tom"),       dCell("Wir kommen am 30. August zurueck.")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe: Partnerinterview – Pronomen ueben"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage (mit Pronomen!)", { width: 5500 }), hCell("Antwort", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wie alt bist DU?"), dCell("ICH bin ____")] }),
        new TableRow({ children: [dCell("Wie heisst dein Bruder/deine Schwester?"), dCell("ER/SIE heisst ____")] }),
        new TableRow({ children: [dCell("Was machst DU am Wochenende?"), dCell("ICH ____")] }),
        new TableRow({ children: [dCell("Was macht ihr in den Ferien?"), dCell("WIR ____")] }),
        new TableRow({ children: [dCell("Wie sind deine Eltern?"), dCell("SIE sind ____")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Pronomen-Quiz"),
    bullet("Lehrkraft sagt eine Person: 'Mama' → Schueler sagt 'sie'."),
    bullet("'Tom und ich' → 'wir'. 'Das Auto' → 'es'."),
    bullet("Wer am schnellsten ist, bekommt einen Punkt!"),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Personalpronomen (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("ich-du-Form: informell, fuer Freunde, Kinder, Familie"),
    bullet("Verben: ich heisse, du heisst — ich bin, du bist"),
    bullet("Er-sie-Antwort: 'Mein Bruder' → 'er heisst' / 'meine Schwester' → 'sie ist'"),
    empty(),
    pBold("Dialog 2: Sie-Form (hoeflich)"),
    bullet("Sie wird IMMER grossgeschrieben — auch in der Mitte"),
    bullet("Verb: Sie sind / Sie haben / Sie heissen (gleich wie 3. Person Plural)"),
    bullet("Hoefliche Frage: 'Wie geht es Ihnen?' (NICHT 'wie geht es dir?')"),
    empty(),
    pBold("Dialog 3: Wir / Ihr"),
    bullet("WIR = ich + andere (Plural): wir fahren / wir haben / wir kommen"),
    bullet("IHR = mehrere Personen, mit denen man spricht: ihr macht / ihr habt / ihr kommt"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Pronomen passt zur Person/Sache (1P)"),
    bullet("Verbform stimmt mit Pronomen ueberein (1P)"),
    bullet("Antwort beginnt mit dem richtigen Pronomen"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Personalpronomen"), empty(),
    pBold("Aufgabe 1: [BILD 1: 6 verschiedene Personen/Tiere/Dinge — Mann, Frau, Junge, Maedchen, Hund, Auto]"),
    p("Schreib unter jedes Bild das richtige Pronomen."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("[BILD: Mann]", { width: 3166 }), hCell("[BILD: Frau]", { width: 3168 }), hCell("[BILD: Junge]", { width: 3166 })] }),
        new TableRow({ children: [dCell("Pronomen: ____"), dCell("Pronomen: ____"), dCell("Pronomen: ____")] }),
        new TableRow({ children: [hCell("[BILD: Maedchen]", { width: 3166 }), hCell("[BILD: Hund]", { width: 3168 }), hCell("[BILD: Auto]", { width: 3166 })] }),
        new TableRow({ children: [dCell("Pronomen: ____"), dCell("Pronomen: ____"), dCell("Pronomen: ____")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: [BILD 2: Familienbild — Eltern und 2 Kinder]"),
    p("Wer ist auf dem Bild? Schreib Saetze mit Pronomen."),
    empty(),
    p("Beispiel: Das ist die Mutter. Sie ist sehr nett."),
    empty(),
    p("1. (Vater)"),
    writeLine(55), empty(),
    p("2. (Mutter)"),
    writeLine(55), empty(),
    p("3. (das Kind)"),
    writeLine(55), empty(),
    p("4. (alle zusammen)"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Welches Pronomen passt? Markiere das Richtige."),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Satzanfang", { width: 5500 }), hCell("Pronomen-Wahl", { width: 4000 })] }),
        new TableRow({ children: [dCell("Mein Bruder Tom ist hier."),       dCell("Er  /  Sie  /  Es")] }),
        new TableRow({ children: [dCell("Die Katze schlaeft."),               dCell("Er  /  Sie  /  Es")] }),
        new TableRow({ children: [dCell("Das Maedchen heisst Lara."),         dCell("Er  /  Sie  /  Es")] }),
        new TableRow({ children: [dCell("Anna und Tom kommen."),              dCell("Wir  /  Ihr  /  Sie")] }),
        new TableRow({ children: [dCell("Frau Mueller ist Lehrerin."),         dCell("du  /  sie  /  Sie")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Male deine Familie und schreib zu jeder Person einen Satz mit Pronomen."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [p("Meine Familie:"), empty(), empty(), empty()],
      })] })],
    }),
    empty(),
    p("1. ____________________"),
    p("2. ____________________"),
    p("3. ____________________"),
    p("4. ____________________"),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Personalpronomen (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Pronomen zu Bildern"),
    bullet("Mann → er"),
    bullet("Frau → sie"),
    bullet("Junge → er"),
    bullet("Maedchen → sie (auf Person bezogen) oder es (mit Artikel: das Maedchen)"),
    bullet("Hund → er"),
    bullet("Auto → es (das Auto)"),
    empty(),
    pBold("Aufgabe 2: Familienbild — Musterantworten"),
    bullet("1. Das ist der Vater. Er ist gross."),
    bullet("2. Das ist die Mutter. Sie ist sehr lieb."),
    bullet("3. Das ist das Kind. Es ist klein."),
    bullet("4. Sie sind eine glueckliche Familie."),
    empty(),
    pBold("Aufgabe 3: Pronomen-Wahl"),
    bullet("Mein Bruder Tom → ER"),
    bullet("Die Katze → SIE"),
    bullet("Das Maedchen → SIE oder ES (beide moeglich; grammatisch korrekt: ES)"),
    bullet("Anna und Tom → SIE (Plural)"),
    bullet("Frau Mueller (formell) → SIE (hoeflich)"),
    empty(),
    pBold("Aufgabe 4: individuelle Antwort"),
    pItalic("Beispiel: Das ist mein Vater. Er heisst Peter. / Das ist meine Mutter. Sie heisst Eva. / Das ist mein Bruder. Er ist 6. / Wir sind eine Familie."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Personalpronomen");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
