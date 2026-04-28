// A2_Erwachsene — Thema 04 ABSCHLUSS: Essen & Restaurants
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const HEADING  = 'Thema 04 — Essen & Restaurants';
const SUBHEAD  = 'ABSCHLUSS';
const PREFIX   = 'A2_Erwachsene_EssenRestaurant_ABSCHLUSS';
const OUT_DIR  = path.join(__dirname, '..', 'A2_Erwachsene', '04_EssenRestaurant', 'ABSCHLUSS');
const PAGE_W   = 11906;
const PAGE_H   = 16838;
const MARGIN   = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle ABSCHLUSS: Essen & Restaurants');
console.log('Zielordner:', OUT_DIR);

// ── NUMBERING ─────────────────────────────────────────────────────────────────
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

// ── HELPERS ───────────────────────────────────────────────────────────────────
const hdr = () => ({
  default: new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ${SUBHEAD}`, size: 18, color: '888888', italics: true, font: 'Arial' })]
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
const menuBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '8D6E63' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '8D6E63' }, left: { style: BorderStyle.SINGLE, size: 12, color: '8D6E63' }, right: { style: BorderStyle.SINGLE, size: 12, color: '8D6E63' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'FFF8E1' },
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
const pageBreak = () => new Paragraph({ children: [new TextRun({ break: 1 })], spacing: { before: 0, after: 0 } });

// ── SAVE ──────────────────────────────────────────────────────────────────────
const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: hdr(),
      footers: ftr(),
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  console.log('OK ', filename);
};

// ════════════════════════════════════════════════════════════════════════════
(async () => {

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Abschlussübung — Essen & Restaurants'),
  p('Diese Übung verbindet alle drei Unterpunkte des Themas:', { bold: true }),
  infoBox([
    'UP 01: Im Restaurant bestellen',
    'UP 02: Rezepte lesen und erklären',
    'UP 03: Über Ernährung sprechen',
  ]),
  ...gap(1),

  // ── AUFGABE 1: LESETEXT ──
  h2('Aufgabe 1 — Lesetext: Fatimas kulinarisches Tagebuch'),
  p('Fatima El-Amin kommt aus Marokko und lebt seit sechs Monaten in Frankfurt. Sie schreibt in ihrem Blog über ihre Erlebnisse mit der deutschen Esskultur.'),
  ...gap(1),
  p('Eintrag 1 — Mein erster Restaurantbesuch', { bold: true }),
  p('Letzte Woche war ich mit meiner Deutschkurs-Kollegin Sandra im Restaurant „Zum Adler" — ein typisch deutsches Lokal in der Altstadt. Der Kellner hat uns die Karte gebracht und ich habe lange überlegt. Zum Schluss habe ich Schnitzel mit Pommes und Salat bestellt. Sandra hat Forelle mit Kartoffeln gewählt. Als wir fertig gegessen haben, hat der Kellner gefragt: „Hat es geschmeckt?" — „Ja, sehr gut, danke!" Beim Bezahlen habe ich „Stimmt so" gesagt — Sandra hat mir vorher erklärt, was das bedeutet.'),
  ...gap(1),
  p('Eintrag 2 — Ich lerne ein deutsches Rezept', { bold: true }),
  p('Sandra hat mir ihr Lieblingsrezept gegeben: Linsensuppe. Das Rezept klingt einfach, aber ich habe viele neue Wörter gelernt: „dünsten", „abschmecken", „köcheln lassen". Zunächst schneide ich die Zwiebeln und brate sie an. Dann füge ich Linsen, Karotten und Gemüsebrühe hinzu. Nach 25 Minuten köcheln püriere ich einen Teil der Suppe und schmecke alles mit Salz, Pfeffer und einem Spritzer Zitrone ab. Mein Mann Tariq sagt: „Das ist das Beste, was du je gekocht hast!"'),
  ...gap(1),
  p('Eintrag 3 — Gesund essen in Deutschland', { bold: true }),
  p('Ich habe bemerkt, dass die Deutschen sehr auf ihre Ernährung achten. Im Supermarkt sehe ich viele Bio-Produkte und Vollkornprodukte. Meine Kollegin Sandra isst vegetarisch — sie verzichtet auf Fleisch, weil sie findet, dass das gesünder und besser für die Umwelt ist. Ich selbst esse ausgewogen: viel Gemüse und Hülsenfrüchte — das kenne ich gut aus Marokko — aber auch manchmal Fisch oder Hühnchen. Was ich noch vermisse: die würzigen Gewürze aus meiner Heimat! Hier in Deutschland ist das Essen oft milder.'),
  ...gap(1),
  h3('Aufgabe 1a — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Fatima lebt seit einem Jahr in Frankfurt.', ''],
      ['Im Restaurant hat Fatima Forelle bestellt.', ''],
      ['„Stimmt so" bedeutet, dass man kein Wechselgeld möchte.', ''],
      ['Das Linsensuppen-Rezept enthält Karotten und Gemüsebrühe.', ''],
      ['Tariq findet die Linsensuppe sehr lecker.', ''],
      ['Sandra isst kein Fleisch.', ''],
      ['Fatima vermisst das milde Essen aus Marokko.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h3('Aufgabe 1b — Fragen zum Text'),
  p('a) In welchem Restaurant war Fatima, und was hat sie bestellt?'),
  writingLine(), writingLine(),
  p('b) Welche Kochschritte beschreibt Fatima bei der Linsensuppe?', { before: 120 }),
  writingLine(), writingLine(), writingLine(),
  p('c) Wie ernährt sich Fatima? Wie ernährt sich Sandra?', { before: 120 }),
  writingLine(), writingLine(),

  pageBreak(),

  // ── AUFGABE 2: LÜCKENTEXT ──
  h2('Aufgabe 2 — Gemischter Lückentext (alle 3 Unterpunkte)'),
  infoBox([
    'Wörterkasten: bestellen  |  Speisekarte  |  köcheln  |  Trinkgeld  |  ausgewogen',
    '              Zutaten  |  Konjunktiv  |  abschmecken  |  vegetarisch  |  Portion'
  ]),
  ...gap(1),
  p('Im Restaurant fragt der Kellner: „Was darf ich Ihnen bringen?" Man schaut auf die ________ und überlegt, was man ________. Wenn das Essen sehr gut war, gibt man manchmal ________ — in Deutschland sind 5–10 % üblich.'),
  p('Für die Linsensuppe braucht man diese ________ : Linsen, Zwiebeln, Karotten und Brühe. Man lässt die Suppe 25 Minuten ________ . Zum Schluss kann man die Suppe mit Salz und Zitrone ________ .', { before: 120 }),
  p('Eine gesunde Ernährung sollte ________ sein. Wer kein Fleisch isst, ernährt sich ________ . Experten empfehlen täglich fünf ________ en Obst und Gemüse. Im ________ II sagt man: „Du solltest mehr Gemüse essen."', { before: 120 }),
  ...gap(1),

  // ── AUFGABE 3: FEHLERKORREKTUR ──
  h2('Aufgabe 3 — Fehler korrigieren'),
  p('Jeder Satz enthält einen Fehler. Unterstreiche den Fehler und schreibe den korrekten Satz.'),
  ...gap(1),
  p('a) [UP 01] Ich hätte gerne die gegrillte Fisch mit Salat.  →'),
  writingLine(),
  p('b) [UP 01] Der Kellner hat uns die Karte gebringt.  →', { before: 120 }),
  writingLine(),
  p('c) [UP 02] Schneide Sie die Zwiebeln klein!  →', { before: 120 }),
  writingLine(),
  p('d) [UP 02] Man braucht 500 Gramm die Kartoffeln und zwei Zwiebeln.  →', { before: 120 }),
  writingLine(),
  p('e) [UP 03] Du sollst mehr Obst essen — das ist gesünder.  →', { before: 120 }),
  writingLine(),
  p('f) [UP 03] Sie ernährt sich vegetarischen und verzichtet auf Fleisch.  →', { before: 120 }),
  writingLine(),
  ...gap(1),

  // ── AUFGABE 4: SCHREIBEN ──
  h2('Aufgabe 4 — Schreiben: Ein kulinarisches Erlebnis'),
  p('Schreibe einen kurzen Blogeintrag (5–7 Sätze) über ein Erlebnis mit Essen. Das kann sein:'),
  bullet('ein Restaurantbesuch (was hast du bestellt? wie war es?)'),
  bullet('ein Rezept, das du ausprobiert hast (was hast du gekocht? wie war es?)'),
  bullet('eine Änderung in deiner Ernährung (was isst du jetzt anders?)'),
  p('Benutze mindestens: Perfekt (Vergangenheit) + einen Ratschlag (solltest / empfehle) + einen Vergleich (gesünder / besser als).'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
  ...gap(1),

  // ── AUFGABE 5: ROLLENSPIEL ──
  h2('Aufgabe 5 — Rollenspiel: Ein Abend im Restaurant'),
  p('Zu dritt: Person A und B sind Gäste, Person C ist Kellner/Kellnerin. Spielt die Situation durch.'),
  ...gap(1),
  stdTable(
    ['Person A — Gast 1', 'Person B — Gast 2', 'Person C — Kellner/in'],
    [
      ['Sie möchten einen Tisch für zwei Personen.', 'Sie sind allergisch gegen Nüsse — fragen Sie nach.', 'Begrüßen Sie die Gäste höflich.'],
      ['Bestellen Sie eine Vorspeise und ein Hauptgericht.', 'Bestellen Sie nur ein Hauptgericht — Sie haben keinen großen Hunger.', 'Empfehlen Sie das Tagesgericht.'],
      ['Fragen Sie nach dem Rezept eines Gerichts, das Ihnen schmeckt.', 'Reklamieren Sie höflich: Ihr Essen ist kalt.', 'Reagieren Sie professionell auf die Reklamation.'],
      ['Fragen Sie nach der Rechnung.', 'Möchten Sie getrennt bezahlen.', 'Bringen Sie zwei separate Rechnungen.'],
    ],
    [3635, 3635, 4436]
  ),
  ...gap(1),
  menuBox([
    'Restaurant „Zur goldenen Gabel" — Tagesgericht:',
    'Gebratener Lachs mit Dillsoße, Salzkartoffeln und Blattsalat — 14,90 €',
    'Vegetarisch: Gefüllte Paprika mit Quinoa und Tomatenpesto — 12,50 €',
  ]),
  ...gap(1),

  // ── SELBSTEVALUATION ──
  h2('Selbstevaluation — Das kann ich jetzt!'),
  p('Setze ein Häkchen (✓): Das kann ich gut  /  Das übe ich noch', { italics: true, color: '888888' }),
  stdTable(
    ['Können-Aussage', 'Das kann ich gut', 'Das übe ich noch'],
    [
      ['Ich kann im Restaurant höflich bestellen (Ich hätte gerne …).', '', ''],
      ['Ich kann eine Tischreservierung am Telefon machen.', '', ''],
      ['Ich kann ein einfaches Rezept lesen und die Schritte erklären.', '', ''],
      ['Ich kann Kochverben im Imperativ (Sie-Form) korrekt benutzen.', '', ''],
      ['Ich kann über meine Ernährungsgewohnheiten sprechen.', '', ''],
      ['Ich kann Ratschläge zur Ernährung mit „solltest" formulieren.', '', ''],
      ['Ich kann gesunde und ungesunde Lebensmittel auf Deutsch benennen.', '', ''],
    ],
    [7706, 2000, 2000]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Essen & Restaurants'),
  ...gap(1),

  h2('Aufgabe 1a — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Fatima lebt seit einem Jahr in Frankfurt.', 'F (seit sechs Monaten)'],
      ['Im Restaurant hat Fatima Forelle bestellt.', 'F (Schnitzel mit Pommes und Salat)'],
      ['„Stimmt so" bedeutet, dass man kein Wechselgeld möchte.', 'R'],
      ['Das Linsensuppen-Rezept enthält Karotten und Gemüsebrühe.', 'R'],
      ['Tariq findet die Linsensuppe sehr lecker.', 'R'],
      ['Sandra isst kein Fleisch.', 'R (sie ernährt sich vegetarisch)'],
      ['Fatima vermisst das milde Essen aus Marokko.', 'F (sie vermisst die würzigen Gewürze)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 1b — Musterlösungen'),
  p('a) Fatima war im Restaurant „Zum Adler". Sie hat Schnitzel mit Pommes und Salat bestellt.'),
  p('b) Zwiebeln anbraten → Linsen, Karotten und Brühe hinzufügen → 25 Minuten köcheln → Teil pürieren → mit Salz, Pfeffer und Zitrone abschmecken.'),
  p('c) Fatima isst ausgewogen: viel Gemüse und Hülsenfrüchte, manchmal Fisch oder Hühnchen. Sandra isst vegetarisch — sie verzichtet auf Fleisch.'),
  ...gap(1),

  h2('Aufgabe 2 — Lückentext'),
  p('1. Speisekarte  2. bestellen  3. Trinkgeld  4. Zutaten  5. köcheln'),
  p('6. abschmecken  7. ausgewogen  8. vegetarisch  9. Portion  10. Konjunktiv'),
  ...gap(1),

  h2('Aufgabe 3 — Fehlerkorrektur'),
  grammarBox([
    'Häufige Fehler bei Essen & Restaurants:',
    'Adjektiv nach Artikel → bestimmter Artikel + Adj. + Nomen: Endung -e/-en',
    'Starkes Verb Partizip II: bringen → gebracht (NICHT gebringt)',
    'Imperativ Sie-Form: Verb an 1. Stelle + Sie: Schneiden Sie …!',
    'Mengenangaben: OHNE Artikel → 500 Gramm Kartoffeln (nicht: die Kartoffeln)',
    'Konjunktiv II Ratschlag: solltest (nicht: sollst = Präsens Indikativ)',
    'Adverb vs. Adjektiv: sich vegetarisch ernähren (Adverb, nicht Adjektivendung)',
  ]),
  ...gap(1),
  p('a) FEHLER: „die gegrillte Fisch" → Fisch ist maskulin: „den gegrillten Fisch"'),
  p('   KORREKT: Ich hätte gerne den gegrillten Fisch mit Salat.'),
  p('b) FEHLER: „gebringt" → unregelmäßiges Verb: bringen → gebracht'),
  p('   KORREKT: Der Kellner hat uns die Karte gebracht.'),
  p('c) FEHLER: „Schneide Sie" → Imperativ Sie-Form = Infinitiv + Sie'),
  p('   KORREKT: Schneiden Sie die Zwiebeln klein!'),
  p('d) FEHLER: „die Kartoffeln" nach Mengenangabe → kein Artikel'),
  p('   KORREKT: Man braucht 500 Gramm Kartoffeln und zwei Zwiebeln.'),
  p('e) FEHLER: „sollst" = Präsens Indikativ, kein Ratschlag → Konjunktiv II: „solltest"'),
  p('   KORREKT: Du solltest mehr Obst essen — das ist gesünder.'),
  p('f) FEHLER: „vegetarischen" → Adverb nach ernähren: keine Adjektivendung'),
  p('   KORREKT: Sie ernährt sich vegetarisch und verzichtet auf Fleisch.'),
  ...gap(1),

  h2('Aufgabe 4 — Bewertungskriterien Blogeintrag'),
  bullet('5–7 vollständige Sätze mit Inhalt aus einem der drei Bereiche'),
  bullet('Perfekt korrekt gebildet (haben/sein + Partizip II)'),
  bullet('Mindestens ein Konjunktiv-II-Ratschlag (solltest / empfehle)'),
  bullet('Mindestens ein Komparativ (gesünder / leckerer / besser als)'),
  bullet('Klarer roter Faden: Was? Wie war es? Fazit / Empfehlung'),
  ...gap(1),

  h2('Aufgabe 5 — Rollenspiel: Bewertungskriterien'),
  stdTable(
    ['Bereich', 'Was wird bewertet?'],
    [
      ['Person A — Gast 1', 'Höfliche Bestellung (Ich hätte gerne …), Frage nach Rezept'],
      ['Person B — Gast 2', 'Allergie-Nachfrage (Enthält das Gericht Nüsse?), höfliche Reklamation'],
      ['Person C — Kellner/in', 'Formelle Sie-Form, professionelle Reaktion, Empfehlung mit Adjektiv'],
      ['Alle', 'Korrekte Verbformen, angemessene Höflichkeit, flüssiger Dialog'],
    ],
    [4000, 7706]
  ),
  p('Hinweis: Rollenspiele werden nach Kommunikationsfähigkeit bewertet, nicht nach Perfektion.', { italics: true, color: '888888' }),
  ...gap(1),

  h2('Themenabdeckung — Alle 3 Unterpunkte'),
  stdTable(
    ['Unterpunkt', 'Aufgaben im ABSCHLUSS'],
    [
      ['UP 01: Im Restaurant bestellen', 'Text Eintrag 1, Lücken (Speisekarte/bestellen/Trinkgeld), Fehler a+b, Rollenspiel'],
      ['UP 02: Rezepte lesen und erklären', 'Text Eintrag 2, Lücken (Zutaten/köcheln/abschmecken), Fehler c+d'],
      ['UP 03: Über Ernährung sprechen', 'Text Eintrag 3, Lücken (ausgewogen/vegetarisch/Portion), Fehler e+f, Schreiben'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
