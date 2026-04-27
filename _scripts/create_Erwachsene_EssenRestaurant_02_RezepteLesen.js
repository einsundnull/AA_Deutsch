// A2_Erwachsene — Thema 04 UP 02: Rezepte lesen und erklaeren
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, NumberFormat, LevelFormat, convertInchesToTwip
} = require('docx');
const fs = require('fs');

const TOPIC    = 'Rezepte lesen und erklaeren';
const HEADING  = 'Thema 04 — Essen & Restaurants';
const SUBHEAD  = 'UP 02: Rezepte lesen und erklären';
const PREFIX   = 'A2_Erwachsene_EssenRestaurant_02_RezepteLesen';
const OUT_DIR  = path.join(__dirname, '..', 'A2_Erwachsene', '04_EssenRestaurant', '02_RezepteLesen');
const PAGE_W   = 11906;
const PAGE_H   = 16838;
const MARGIN   = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

// ── NUMBERING ────────────────────────────────────────────────────────────────
const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '•',
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360, hanging: 180 } } }
    }]
  }]
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const hdr = (label) => ({
  default: new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ${label}`, size: 18, color: '888888', italics: true, font: 'Arial' })]
    })]
  })
});

const ftr = () => ({
  default: new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' }),
      ]
    })]
  })
});

const h1 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 36, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 240, after: 120 }
});

const h2 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 28, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 200, after: 80 }
});

const h3 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 24, color: '2E75B6', font: 'Arial' })],
  spacing: { before: 160, after: 60 }
});

const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, size: opts.size || 24, font: 'Arial', bold: opts.bold || false, italics: opts.italics || false, color: opts.color || '000000' })],
  spacing: { before: opts.before || 80, after: opts.after || 60 },
  alignment: opts.align || AlignmentType.LEFT
});

const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));

const writingLine = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});

const nameDate = () => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }),
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] }),
  ]})]
});

const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullet-list', level: 0 },
  children: [new TextRun({ text, size: 24, font: 'Arial' })],
  spacing: { before: 60, after: 40 }
});

const infoBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
  })]})],
});

const grammarBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
  })]})],
});

const recipeBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'C62828' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'C62828' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'C62828' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'C62828' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'FFEBEE' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
  })]})],
});

const tblHdr = (cells, widths) => new TableRow({
  tableHeader: true,
  children: cells.map((c, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })]
  }))
});

const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({
  children: cells.map((c, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: shade },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })]
  }))
});

const stdTable = (headers, rows, widths) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } },
  rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))]
});

// ── SAVE ──────────────────────────────────────────────────────────────────────
const save = async (children, filename, labelText) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: hdr(labelText || SUBHEAD),
      footers: ftr(),
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  const fp = path.join(OUT_DIR, filename);
  fs.writeFileSync(fp, buf);
  console.log('OK ', filename);
};

// ════════════════════════════════════════════════════════════════════════════
(async () => {

// ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Schreibübung'),
  infoBox([
    '📖  Nützliche Ausdrücke für Rezepte:',
    'Zutaten: 500 g Kartoffeln, 1 TL Salz, 2 EL Öl, eine Prise Pfeffer',
    'Zubereitung: Schneide die Kartoffeln. Koche das Wasser. Füge Salz hinzu.',
    'Man braucht … / Man nimmt … / Man gibt … in die Pfanne.',
    'Zunächst … / Dann … / Danach … / Zum Schluss …',
    'Das Rezept ist für 4 Personen. / Zubereitungszeit: 30 Minuten.',
    'Das schmeckt würzig / mild / süß / sauer / cremig / knusprig.'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Imperativ: Schreibe die Kochschritte'),
  p('Formuliere jeden Schritt als Imperativ (Sie-Form). Beispiel: Kartoffeln schälen → Schälen Sie die Kartoffeln!'),
  p('a) Zwiebeln schneiden →', { before: 120 }),
  writingLine(), writingLine(),
  p('b) Wasser zum Kochen bringen →', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Salz und Pfeffer hinzufügen →', { before: 120 }),
  writingLine(), writingLine(),
  p('d) Die Suppe 20 Minuten köcheln lassen →', { before: 120 }),
  writingLine(), writingLine(),
  p('e) Mit Petersilie garnieren →', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 2 — Mengenangaben ergänzen'),
  p('Fülle die Lücken mit passenden Mengenangaben aus dem Kasten.'),
  infoBox(['500 g  |  2 EL  |  1 TL  |  eine Prise  |  3 Liter  |  250 ml']),
  p('a) _______ Kartoffeln, geschält und gewürfelt', { before: 120 }),
  p('b) _______ Olivenöl zum Anbraten'),
  p('c) _______ Salz und _______ Pfeffer'),
  p('d) _______ Gemüsebrühe'),
  p('e) _______ Sahne'),
  ...gap(1),
  h2('Aufgabe 3 — Rezept in der richtigen Reihenfolge beschreiben'),
  p('Dein Partner / Deine Partnerin kennt das Rezept nicht. Erkläre Schritt für Schritt, wie man Kartoffelsuppe kocht. Benutze: Zunächst … / Dann … / Danach … / Zum Schluss …'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 4 — Lieblingsrezept beschreiben'),
  p('Beschreibe dein Lieblingsrezept (oder ein einfaches Gericht aus deinem Heimatland). Schreibe 4–5 Sätze. Nenne: Gericht, Zutaten, 2–3 Schritte.'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ─────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Rezepte lesen und erklären'),
  grammarBox([
    '📌  Imperativ Sie-Form: Infinitiv + Sie (Verb an 1. Stelle)',
    'schälen → Schälen Sie …!  |  schneiden → Schneiden Sie …!',
    'hinzufügen → Fügen Sie … hinzu!  |  lassen → Lassen Sie …!'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Mögliche Lösungen'),
  p('a) Schneiden Sie die Zwiebeln (in kleine Würfel)!'),
  p('b) Bringen Sie das Wasser zum Kochen!'),
  p('c) Fügen Sie Salz und Pfeffer hinzu!'),
  p('d) Lassen Sie die Suppe 20 Minuten köcheln!'),
  p('e) Garnieren Sie (die Suppe) mit Petersilie!'),
  ...gap(1),
  h2('Aufgabe 2 — Lösung'),
  p('a) 500 g Kartoffeln, geschält und gewürfelt'),
  p('b) 2 EL Olivenöl zum Anbraten'),
  p('c) 1 TL Salz und eine Prise Pfeffer'),
  p('d) 3 Liter Gemüsebrühe'),
  p('e) 250 ml Sahne'),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösung'),
  p('Zunächst schälen und würfeln Sie die Kartoffeln. Dann schneiden Sie die Zwiebeln klein und braten Sie sie in Öl an. Danach fügen Sie die Kartoffeln und die Gemüsebrühe hinzu. Lassen Sie die Suppe 20 Minuten köcheln. Zum Schluss geben Sie Sahne dazu und garnieren Sie mit Petersilie.'),
  p('Hinweis: Individuelle Antworten akzeptieren. Auf Verbstellung im Imperativ und Konjunktion-Adverbien achten.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Gericht klar benannt'),
  bullet('Mindestens 3 Zutaten genannt'),
  bullet('2–3 Zubereitungsschritte mit Imperativ oder man-Konstruktion'),
  bullet('Konnektoren (zunächst / dann / danach / zum Schluss) verwendet'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Leseübung'),
  h2('Text: Mei Lin kocht zum ersten Mal Kartoffelsuppe'),
  recipeBox([
    '🍲  Kartoffelsuppe — Einfaches Rezept (für 4 Personen, ca. 35 Minuten)'
  ]),
  ...gap(1),
  p('Mei Lin kommt aus China und wohnt seit einem Jahr in Dresden. Sie lernt Deutsch im Volkshochschulkurs und hat viele neue Freunde gefunden. Ihre Nachbarin Frau Becker hat ihr ein typisch deutsches Rezept gegeben: Kartoffelsuppe.'),
  p('Mei Lin liest das Rezept sehr sorgfältig. Zuerst kauft sie alle Zutaten im Supermarkt: 500 Gramm Kartoffeln, zwei Zwiebeln, eine Karotte, einen Liter Gemüsebrühe und 200 Milliliter Sahne. Außerdem braucht sie Salz, Pfeffer und frische Petersilie.'),
  p('Zu Hause beginnt sie mit der Zubereitung. Zunächst schält und würfelt sie die Kartoffeln und die Karotte. Dann schneidet sie die Zwiebeln klein und brät sie in einem großen Topf mit etwas Öl an. Danach gibt sie die Kartoffeln und die Karotte dazu. Sie füllt alles mit der Gemüsebrühe auf und lässt die Suppe 20 Minuten köcheln.'),
  p('Zum Schluss püriert Mei Lin die Suppe mit einem Stabmixer. Sie rührt die Sahne ein und schmeckt die Suppe mit Salz und Pfeffer ab. Die Suppe riecht wunderbar! Sie garniert jede Portion mit ein bisschen frischer Petersilie.'),
  p('Mei Lin ruft Frau Becker an: „Die Suppe ist fertig! Kommen Sie zum Essen?" Frau Becker freut sich sehr. Beim Essen sagt sie: „Mei Lin, die Suppe schmeckt ausgezeichnet! Wie haben Sie das gemacht?" Mei Lin lacht und erklärt das Rezept Schritt für Schritt.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Mei Lin wohnt seit zwei Jahren in Dresden.', ''],
      ['Frau Becker hat Mei Lin das Rezept gegeben.', ''],
      ['Mei Lin kauft die Zutaten auf dem Wochenmarkt.', ''],
      ['Die Zubereitungszeit beträgt ungefähr 35 Minuten.', ''],
      ['Zum Schluss püriert Mei Lin die Suppe.', ''],
      ['Frau Becker findet die Suppe nicht lecker.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Woher kommt Mei Lin und wie lange wohnt sie in Dresden?'),
  writingLine(), writingLine(),
  p('b) Welche Zutaten braucht Mei Lin für die Kartoffelsuppe?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Was macht Mei Lin nach dem Köcheln mit der Suppe?', { before: 120 }),
  writingLine(), writingLine(),
  p('d) Wen lädt Mei Lin zum Essen ein?', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Kochschritte in der richtigen Reihenfolge'),
  p('Nummeriere die Schritte (1–6) in der Reihenfolge aus dem Text.'),
  stdTable(
    ['Schritt', 'Nr.'],
    [
      ['Suppe mit Sahne verfeinern und abschmecken', ''],
      ['Zwiebeln anbraten', ''],
      ['Kartoffeln und Karotte schälen und würfeln', ''],
      ['Suppe 20 Minuten köcheln lassen', ''],
      ['Suppe pürieren', ''],
      ['Gemüsebrühe hinzufügen', ''],
    ],
    [9600, 2106]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Deine Meinung'),
  p('Findest du Kartoffelsuppe lecker? Kochst du gerne? Schreibe 2–3 Sätze.'),
  writingLine(), writingLine(), writingLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Rezepte lesen und erklären'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Mei Lin wohnt seit zwei Jahren in Dresden.', 'F (seit einem Jahr)'],
      ['Frau Becker hat Mei Lin das Rezept gegeben.', 'R'],
      ['Mei Lin kauft die Zutaten auf dem Wochenmarkt.', 'F (im Supermarkt)'],
      ['Die Zubereitungszeit beträgt ungefähr 35 Minuten.', 'R'],
      ['Zum Schluss püriert Mei Lin die Suppe.', 'R'],
      ['Frau Becker findet die Suppe nicht lecker.', 'F (ausgezeichnet)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Mei Lin kommt aus China und wohnt seit einem Jahr in Dresden.'),
  p('b) Sie braucht: 500 g Kartoffeln, zwei Zwiebeln, eine Karotte, 1 L Gemüsebrühe, 200 ml Sahne, Salz, Pfeffer, Petersilie.'),
  p('c) Sie püriert die Suppe mit einem Stabmixer und rührt die Sahne ein.'),
  p('d) Sie lädt ihre Nachbarin Frau Becker zum Essen ein.'),
  ...gap(1),
  h2('Aufgabe 3 — Reihenfolge'),
  stdTable(
    ['Schritt', 'Nr.'],
    [
      ['Suppe mit Sahne verfeinern und abschmecken', '5'],
      ['Zwiebeln anbraten', '2'],
      ['Kartoffeln und Karotte schälen und würfeln', '1'],
      ['Suppe 20 Minuten köcheln lassen', '4'],
      ['Suppe pürieren', '6 (eigentlich vor Sahne → korrekt 5)'],
      ['Gemüsebrühe hinzufügen', '3'],
    ],
    [8400, 3306]
  ),
  p('Reihenfolge: 1 → 2 → 3 → 4 → 5 (pürieren) → 6 (Sahne)', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4'),
  p('Individuelle Antworten. Auf Zeitform (Präsens) und Meinung achten.', { italics: true, color: '888888' }),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Lückentext'),
  infoBox([
    'Wörterkasten: schälen  |  köcheln  |  würzen  |  pürieren  |  anbraten',
    '              hinzufügen  |  abschmecken  |  garnieren  |  aufkochen  |  einrühren'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Rezepttext: Fülle die Lücken aus'),
  p('Ein einfaches Rezept für Kartoffelsuppe:'),
  p('Zunächst müssen Sie die Kartoffeln ________ und in kleine Würfel schneiden.'),
  p('Dann schneiden Sie die Zwiebeln und braten Sie sie in Öl ________ , bis sie goldbraun sind.'),
  p('Danach ________ Sie die Kartoffelwürfel ________ und füllen Sie alles mit Gemüsebrühe auf.'),
  p('Bringen Sie die Suppe kurz zum ________ . Dann lassen Sie alles 20 Minuten ________ .'),
  p('Zum Schluss ________ Sie die Suppe glatt. Dann ________ Sie die Sahne ________ .'),
  p('Jetzt können Sie die Suppe mit Salz und Pfeffer ________ .'),
  p('Servieren Sie die Suppe in tiefen Tellern und ________ Sie mit Petersilie.'),
  ...gap(1),
  h2('Aufgabe 2 — Küchen-Dialog'),
  p('Timo erklärt seiner Freundin Sofia, wie man Pfannkuchen macht. Ergänze den Dialog.'),
  infoBox(['Wörterkasten: Mehl  |  Eier  |  Milch  |  Pfanne  |  wenden  |  goldbraun']),
  ...gap(1),
  p('Sofia: „Was brauche ich für Pfannkuchen?"'),
  p('Timo: „Du brauchst 150 g ________ , zwei ________ , 250 ml ________ und eine Prise Salz."'),
  p('Sofia: „Und wie mache ich den Teig?"'),
  p('Timo: „Mische alles zusammen. Dann erhitze etwas Butter in der ________ ."'),
  p('Sofia: „Wie lange backe ich den Pfannkuchen?"'),
  p('Timo: „Ungefähr zwei Minuten, bis er ________ ist. Dann musst du ihn ________ !"'),
  ...gap(1),
  h2('Aufgabe 3 — Zubereitungsverben zuordnen'),
  p('Schreibe das richtige Verb in die Lücke. Verändere wenn nötig die Form.'),
  infoBox(['hacken  |  reiben  |  braten  |  dünsten  |  rühren  |  backen']),
  p('a) Karotten ________ : Das macht man mit einer Reibe.'),
  p('b) Zwiebeln fein ________ : Das macht man mit einem Messer.'),
  p('c) Fleisch in der Pfanne ________ : Dafür braucht man heißes Öl.'),
  p('d) Gemüse in wenig Wasser ________ : Das ist gesünder als braten.'),
  p('e) Den Teig ________ : Das macht man mit einem Löffel oder Schneebesen.'),
  p('f) Kuchen im Ofen ________ : Bei 180 Grad, ca. 45 Minuten.'),
  ...gap(1),
  h2('Aufgabe 4 — Küchengeräte und ihre Funktion'),
  stdTable(
    ['Küchengerät', 'Was macht man damit? (Lücke)'],
    [
      ['Stabmixer', 'Man ________ damit Suppen und Soßen.'],
      ['Reibe', 'Man ________ damit Käse oder Karotten.'],
      ['Schneebesen', 'Man ________ damit Eier oder Sahne.'],
      ['Sieb', 'Man ________ damit Nudeln oder Gemüse ab.'],
      ['Schäler', 'Man ________ damit Kartoffeln oder Möhren.'],
    ],
    [4000, 7706]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Rezepte lesen und erklären'),
  h2('Aufgabe 1 — Rezepttext'),
  p('1. schälen'),
  p('2. anbraten'),
  p('3. hinzufügen (Kartoffeln hinzufügen)'),
  p('4. aufkochen'),
  p('5. köcheln'),
  p('6. pürieren'),
  p('7. einrühren (Sahne einrühren)'),
  p('8. abschmecken'),
  p('9. garnieren'),
  ...gap(1),
  h2('Aufgabe 2 — Küchen-Dialog'),
  p('Timo: „Du brauchst 150 g Mehl, zwei Eier, 250 ml Milch und eine Prise Salz."'),
  p('Timo: „Mische alles zusammen. Dann erhitze etwas Butter in der Pfanne."'),
  p('Timo: „Ungefähr zwei Minuten, bis er goldbraun ist. Dann musst du ihn wenden!"'),
  ...gap(1),
  h2('Aufgabe 3 — Zubereitungsverben'),
  p('a) reiben  b) hacken  c) braten  d) dünsten  e) rühren  f) backen'),
  ...gap(1),
  h2('Aufgabe 4 — Küchengeräte'),
  stdTable(
    ['Küchengerät', 'Lösung'],
    [
      ['Stabmixer', 'Man püriert damit Suppen und Soßen.'],
      ['Reibe', 'Man reibt damit Käse oder Karotten.'],
      ['Schneebesen', 'Man schlägt damit Eier oder Sahne.'],
      ['Sieb', 'Man siebt / gießt damit Nudeln oder Gemüse ab.'],
      ['Schäler', 'Man schält damit Kartoffeln oder Möhren.'],
    ],
    [4000, 7706]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Wortliste'),
  h2('Teil A — Zutaten und Küchengeräte'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Zutat, -en', 'Nomen', 'Für dieses Rezept brauchst du nur wenige Zutaten.'],
      ['die Zubereitung', 'Nomen', 'Die Zubereitung dauert ungefähr 30 Minuten.'],
      ['die Prise (eine Prise)', 'Nomen', 'Gib eine Prise Salz in die Suppe.'],
      ['der Esslöffel (EL)', 'Nomen', 'Nimm zwei Esslöffel Öl zum Anbraten.'],
      ['der Teelöffel (TL)', 'Nomen', 'Ein Teelöffel Zucker reicht für den Teig.'],
      ['der Stabmixer', 'Nomen', 'Püriere die Suppe mit dem Stabmixer.'],
      ['die Pfanne, -n', 'Nomen', 'Erhitze das Öl in der Pfanne.'],
      ['der Topf, Töpfe', 'Nomen', 'Koche das Wasser in einem großen Topf.'],
      ['das Sieb, -e', 'Nomen', 'Gieße die Nudeln durch das Sieb ab.'],
      ['die Reibe, -n', 'Nomen', 'Reibe den Käse mit der Reibe.'],
    ],
    [3500, 2500, 5706]
  ),
  ...gap(1),
  h2('Teil B — Kochverben (trennbar und untrennbar)'),
  stdTable(
    ['Infinitiv', 'Typ', 'Beispiel (Imperativ Sie-Form)'],
    [
      ['schälen', 'trennbar: nein', 'Schälen Sie die Kartoffeln!'],
      ['würfeln', 'trennbar: nein', 'Würfeln Sie die Zwiebeln klein!'],
      ['anbraten', 'trennbar: an-', 'Braten Sie das Fleisch kurz an!'],
      ['hinzufügen', 'trennbar: hinzu-', 'Fügen Sie das Salz hinzu!'],
      ['aufkochen', 'trennbar: auf-', 'Kochen Sie die Brühe kurz auf!'],
      ['pürieren', 'trennbar: nein', 'Pürieren Sie die Suppe glatt!'],
      ['einrühren', 'trennbar: ein-', 'Rühren Sie die Sahne ein!'],
      ['abschmecken', 'trennbar: ab-', 'Schmecken Sie die Suppe ab!'],
      ['garnieren', 'trennbar: nein', 'Garnieren Sie mit Petersilie!'],
      ['köcheln lassen', 'Phrasalverb', 'Lassen Sie die Suppe 20 Min. köcheln!'],
    ],
    [3500, 2800, 5406]
  ),
  ...gap(1),
  grammarBox([
    '📌  Trennbare Verben im Imperativ (Sie-Form):',
    'an|braten  → Braten Sie … an!  (Vorsilbe ans Ende)',
    'ein|rühren → Rühren Sie … ein!',
    'hinzu|fügen → Fügen Sie … hinzu!',
    '❗ Achtung: Das Präfix steht IMMER am Satzende.'
  ]),
  ...gap(1),
  h2('Teil C — Geschmack und Konsistenz'),
  stdTable(
    ['Adjektiv', 'Bedeutung', 'Beispielsatz'],
    [
      ['würzig', 'viel Gewürz / kräftig', 'Die Suppe ist sehr würzig.'],
      ['mild', 'nicht scharf, sanft', 'Das Curry schmeckt mild.'],
      ['cremig', 'wie Creme, glatt', 'Die Soße ist schön cremig.'],
      ['knusprig', 'mit fester Kruste', 'Das Brot ist knusprig.'],
      ['zart', 'weich, leicht', 'Das Fleisch ist wunderbar zart.'],
    ],
    [3000, 3500, 5206]
  ),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Zutat: ___________  |  die Prise: ___________  |  schälen: ___________'),
  p('anbraten: ___________  |  pürieren: ___________  |  abschmecken: ___________'),
  p('würzig: ___________  |  cremig: ___________  |  der Stabmixer: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Rezepte lesen und erklären'),
  p('Die Wortliste dient als Vokabelhilfe — keine Lücken zum Ausfüllen. Lösungshinweise:'),
  ...gap(1),
  h2('Hinweise zur Grammatik'),
  grammarBox([
    'Kochverben im Präsens (man-Form):',
    'Man schält die Kartoffeln. → Man brät die Zwiebeln an. → Man fügt Salz hinzu.',
    '',
    'Trennbare Verben — Präfix ans Satzende:',
    'Ich rühre die Sahne ein. / Haben Sie die Suppe abgeschmeckt?',
    '',
    'Mengenangaben — kein Artikel:',
    '500 Gramm Mehl (nicht: 500 Gramm das Mehl)',
    'eine Prise Salz / ein Esslöffel Öl / ein Teelöffel Zucker'
  ]),
  ...gap(1),
  h2('Musterlösungen — Geschmacksadjektive im Satz'),
  p('Die Kartoffelsuppe schmeckt würzig und cremig.'),
  p('Das frische Brot aus dem Ofen ist schön knusprig.'),
  p('Das Hühnchen ist so zart — es fällt fast vom Knochen.'),
  p('Dieses Curry ist sehr mild — kein Chili drin.'),
  ...gap(1),
  p('Hinweis: Übersetzungen hängen von der Muttersprache ab — individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ──────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Konversation'),
  h2('Aufgabe 1 — Dialog: Rezept erklären (Rollen A und B)'),
  p('Person A erklärt ein Rezept. Person B stellt Fragen. Benutzt die Satzbausteine unten.'),
  recipeBox([
    '🍜  Satzbausteine für Person A (erklärt):',
    'Zunächst … / Dann … / Danach … / Zum Schluss …',
    'Man braucht … / Man nimmt … / Man schneidet … / Man gibt … in …',
    'Das Gericht ist für … Personen.',
  ]),
  recipeBox([
    '❓  Satzbausteine für Person B (fragt):',
    'Was brauche ich dafür? / Wie viel … nehme ich?',
    'Wie lange kocht / backt man das? / Bei welcher Temperatur?',
    'Was mache ich zuerst / danach / zum Schluss?',
    'Kann man … auch weglassen / ersetzen?',
  ]),
  ...gap(1),
  p('Person B: „Was kochst du heute?"'),
  p('Person A: „Ich mache ________________________."'),
  p('Person B: „Was brauchst du dafür?"'),
  p('Person A: „Man braucht ________________________."'),
  p('Person B: „Wie machst du das?"'),
  p('Person A: „Zunächst ________________________."'),
  p('Person B: „Und wie lange dauert das?"'),
  p('Person A: „Das dauert ungefähr ________________________."'),
  p('Person B: „Das klingt lecker! Zeigst du mir das Rezept?"'),
  p('Person A: „Natürlich! ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Kochkurs'),
  p('Ihr macht einen kurzen Kochkurs. Person A ist Kochlehrer / Köchin, Person B ist Kursteilnehmer/in.'),
  stdTable(
    ['Kochlehrer / Köchin (A)', 'Kursteilnehmer/in (B)'],
    [
      ['Erklären Sie Schritt 1 (z. B. Zutaten vorbereiten)', 'Fragen Sie nach Mengen'],
      ['Erklären Sie Schritt 2 (anbraten / kochen)', 'Fragen Sie nach der Zeit'],
      ['Warnen Sie vor einem Fehler (z. B. nicht zu heiß)', 'Bedanken Sie sich'],
      ['Erklären Sie den letzten Schritt', 'Sagen Sie, was Ihnen gut gefallen hat'],
    ],
    [5703, 5703]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Kochen und Rezepte'),
  p('Fragt euren Partner / eure Partnerin. Schreibt die Antworten auf.'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Kochst du gerne? Wie oft kochst du?', ''],
      ['Was ist dein Lieblingsessen? Kannst du es kochen?', ''],
      ['Welche Zutaten hast du immer zu Hause?', ''],
      ['Welches typische Gericht aus deinem Heimatland magst du am liebsten?', ''],
      ['Hast du schon einmal ein deutsches Gericht gekocht? Welches?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Rezept-Staffel'),
  p('Gruppe A erklärt ein Rezept nur mündlich (ohne Aufschreiben). Gruppe B hört zu und versucht danach, die Schritte in der richtigen Reihenfolge aufzuschreiben. Dann Rollen tauschen!'),
  infoBox([
    '⏱  Zeit: 5 Minuten pro Gruppe',
    '🏆  Bonuspunkt: Wer alle Schritte in der richtigen Reihenfolge hat!',
    '💡  Tipp: Benutzt Konnektoren: zunächst / dann / danach / zum Schluss'
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Rezepte lesen und erklären'),
  h2('Aufgabe 1 — Bewertungskriterien für den Dialog'),
  bullet('Korrekte Reihenfolge der Kochschritte erklärt'),
  bullet('Konnektoren zunächst / dann / danach / zum Schluss verwendet'),
  bullet('Man-Form oder Imperativ korrekt benutzt'),
  bullet('Mengenangaben ohne Artikel (500 g Kartoffeln, ein Teelöffel Salz)'),
  bullet('Fragen von Person B sinnvoll und grammatisch korrekt'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Rollenspiel'),
  bullet('Imperativ (Sie-Form) korrekt im Kochkurs verwendet'),
  bullet('Warnungen grammatisch korrekt: „Seien Sie vorsichtig!" / „Nicht zu heiß!"'),
  bullet('Zeitangaben: ungefähr / circa / etwa + Zeitdauer'),
  bullet('Höfliche Kommunikation: Bitte / Danke / Darf ich fragen …?'),
  ...gap(1),
  h2('Aufgabe 3 — Musterantworten'),
  p('Ich koche sehr gerne — fast jeden Tag. / Mein Lieblingsessen ist Pasta, aber ich kann es noch nicht perfekt kochen.'),
  p('Zu Hause habe ich immer: Zwiebeln, Öl, Nudeln und Dosentomaten.'),
  p('Ein typisches Gericht aus meinem Heimatland: Pilaw (Reisgericht) — mit Fleisch, Zwiebeln und Karotten.'),
  ...gap(1),
  h2('Aufgabe 4 — Hinweis'),
  p('Gruppenspiel — Lehrkraft bewertet: Vollständigkeit und Reihenfolge der Schritte sowie Verwendung von Konnektoren.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Rezepte lesen und erklären — Bildaufgaben'),
  h2('Aufgabe 1 — Küchengeräte benennen'),
  p('[BILD 1: Sechs Küchengeräte auf einem Tisch: Stabmixer, Pfanne, Topf, Sieb, Reibe, Schneebesen — jedes mit einer Nummerierung 1–6]'),
  p('Schreibe das Küchengerät mit Artikel unter jede Nummer (der / die / das):'),
  stdTable(
    ['Nr.', 'Küchengerät mit Artikel'],
    [
      ['1', ''],
      ['2', ''],
      ['3', ''],
      ['4', ''],
      ['5', ''],
      ['6', ''],
    ],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Kochschritte in die richtige Reihenfolge bringen'),
  p('[BILD 2: Sechs Bilder der Schritte beim Kartoffelsuppe-Kochen — durcheinander nummeriert: (a) Pürieren mit Stabmixer, (b) Zwiebeln anbraten, (c) Kartoffeln schälen, (d) Sahne einrühren, (e) Brühe auffüllen, (f) Servieren mit Petersilie]'),
  p('Nummeriere die Bilder in der richtigen Reihenfolge (1 = zuerst):'),
  stdTable(
    ['Bild', 'Reihenfolge Nr.', 'Kochschritt (was passiert?)'],
    [
      ['(a)', '', ''],
      ['(b)', '', ''],
      ['(c)', '', ''],
      ['(d)', '', ''],
      ['(e)', '', ''],
      ['(f)', '', ''],
    ],
    [1500, 2500, 7706]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Zutatenliste lesen'),
  p('[BILD 3: Handgeschriebene Einkaufsliste für ein Rezept: „500 g Hackfleisch, 2 Zwiebeln, 1 Dose Tomaten (400 g), 200 g Nudeln, 1 TL Paprikapulver, Salz, Pfeffer, Öl"]'),
  p('a) Für welches Gericht könnten diese Zutaten sein? (Tipp: Nudeln + Hackfleisch + Tomaten)'),
  writingLine(),
  p('b) Welche Mengenangabe wird für Flüssigkeiten benutzt? Was bedeutet „g" und „TL"?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Was würdest du noch zu diesem Gericht kaufen? Schreibe 2 Zutaten.', { before: 120 }),
  writingLine(),
  ...gap(1),
  h2('Aufgabe 4 — Kochfehler erkennen'),
  p('[BILD 4: Zwei Kochszenen nebeneinander: Links: richtig — Fleisch in heißer Pfanne mit etwas Öl. Rechts: falsch — Fleisch in kalter Pfanne ohne Öl, mit Dampf/Qualm]'),
  p('Was macht die Person auf dem rechten Bild falsch? Schreibe einen Satz mit „sollte" oder „muss":'),
  writingLine(), writingLine(),
  p('Erkläre, warum das ein Fehler ist (1–2 Sätze):', { before: 120 }),
  writingLine(), writingLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Rezepte lesen und erklären'),
  p('Hinweis: Die Lösungen hängen von den eingefügten Bildern ab. Lehrkraft fügt Bilder passend ein.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Küchengeräte (erwartete Antworten)'),
  stdTable(
    ['Nr.', 'Küchengerät mit Artikel'],
    [
      ['1', 'der Stabmixer'],
      ['2', 'die Pfanne'],
      ['3', 'der Topf'],
      ['4', 'das Sieb'],
      ['5', 'die Reibe'],
      ['6', 'der Schneebesen'],
    ],
    [1500, 10206]
  ),
  p('Artikel-Merkhilfe: die Pfanne / die Reibe / die Reihenfolge — meist -e am Ende = die', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Kochschritte'),
  stdTable(
    ['Bild', 'Reihenfolge Nr.', 'Kochschritt'],
    [
      ['(a) Pürieren', '5', 'Suppe mit Stabmixer pürieren'],
      ['(b) Zwiebeln anbraten', '2', 'Zwiebeln in Öl goldbraun anbraten'],
      ['(c) Kartoffeln schälen', '1', 'Kartoffeln schälen und würfeln'],
      ['(d) Sahne einrühren', '6', 'Sahne einrühren und abschmecken'],
      ['(e) Brühe auffüllen', '3', 'Gemüsebrühe hinzufügen und aufkochen'],
      ['(f) Servieren', '7', 'Suppe servieren und garnieren'],
    ],
    [2000, 2500, 7206]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Zutatenliste'),
  p('a) Bolognese / Spaghetti Bolognese / Nudeln mit Hackfleischsoße'),
  p('b) Flüssigkeiten: ml oder l. „g" = Gramm. „TL" = Teelöffel.'),
  p('c) z. B. Knoblauch, Käse, frische Kräuter (individuelle Antworten)'),
  ...gap(1),
  h2('Aufgabe 4 — Kochfehler'),
  p('Musterlösung: „Sie sollte das Öl zuerst erhitzen, bevor sie das Fleisch in die Pfanne gibt."'),
  p('Erklärung: Wenn das Öl kalt ist, bleibt das Fleisch kleben und wird nicht knusprig angebraten.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
