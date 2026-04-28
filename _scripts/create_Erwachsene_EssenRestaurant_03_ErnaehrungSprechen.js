// A2_Erwachsene — Thema 04 UP 03: Ueber Ernaehrung sprechen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Ueber Ernaehrung sprechen';
const HEADING = 'Thema 04 — Essen & Restaurants';
const SUBHEAD = 'UP 03: Über Ernährung sprechen';
const PREFIX  = 'A2_Erwachsene_EssenRestaurant_03_ErnaehrungSprechen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '04_EssenRestaurant', '03_ErnaehrungSprechen');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
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
const healthBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, left: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, right: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'F1F8E9' },
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
const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: hdr(SUBHEAD),
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

// ── 1. SCHREIBEN ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Schreibübung'),
  infoBox([
    '🥗  Nützliche Ausdrücke für Ernährung:',
    'gesund / ungesund / ausgewogen / fettreich / zuckerarm / kalorienreich',
    'Ich esse gerne … / Ich versuche, weniger … zu essen.',
    'Man sollte mehr … essen / trinken. / Es ist wichtig, dass man …',
    'Ich achte auf meine Ernährung. / Ich esse (kein) Fleisch.',
    'Zum Frühstück / Mittagessen / Abendessen esse ich meistens …',
    'Das ist gut / schlecht für die Gesundheit.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Ernährungstagebuch: Ein Tag beschreiben'),
  p('Schreibe auf, was du gestern gegessen und getrunken hast. Benutze Perfekt.'),
  p('Frühstück (Morgen):', { bold: true }),
  writingLine(), writingLine(),
  p('Mittagessen:', { bold: true, before: 120 }),
  writingLine(), writingLine(),
  p('Abendessen:', { bold: true, before: 120 }),
  writingLine(), writingLine(),
  p('Getränke (den ganzen Tag):', { bold: true, before: 120 }),
  writingLine(),
  ...gap(1),
  h2('Aufgabe 2 — Gesund oder ungesund? Bewerte deine Mahlzeiten'),
  p('Schaue auf dein Ernährungstagebuch (Aufgabe 1). Beantworte die Fragen.'),
  p('a) Was war gesund? Warum?'),
  writingLine(), writingLine(),
  p('b) Was war nicht so gesund? Warum nicht?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Was würdest du beim nächsten Mal anders machen?', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Ratschläge formulieren'),
  p('Dein Freund / deine Freundin isst sehr ungesund. Schreibe 4 Ratschläge. Benutze „solltest" oder „musst".'),
  p('Beispiel: Du solltest mehr Obst und Gemüse essen.'),
  p('1. ________________________________________________________________', { before: 120 }),
  p('2. ________________________________________________________________'),
  p('3. ________________________________________________________________'),
  p('4. ________________________________________________________________'),
  ...gap(1),
  h2('Aufgabe 4 — Meine Ernährung: Freitext'),
  p('Beschreibe deine Ernährung in 4–5 Sätzen. Iss du gesund? Was magst du? Was vermeidest du? Warum?'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Über Ernährung sprechen'),
  grammarBox([
    '📌  Konjunktiv II für Ratschläge:',
    'Du solltest mehr Wasser trinken. (Empfehlung)',
    'Du müsstest mehr schlafen. (stärkere Empfehlung)',
    'Es wäre gut, wenn du mehr Gemüse essen würdest.',
    '❗ „solltest" = höflicher Rat  |  „müsstest" = notwendiger Rat',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Hinweis'),
  p('Individuelle Antworten. Auf Perfekt-Bildung achten:', { italics: true, color: '888888' }),
  p('haben + Partizip II: Ich habe Brot gegessen. / Ich habe Kaffee getrunken.'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien'),
  bullet('Meinung klar geäußert (Das war gesund, weil …)'),
  bullet('Begründung mit „weil" + Nebensatz oder kurze Erklärung'),
  bullet('Verbesserungsvorschlag realistisch und sprachlich korrekt'),
  ...gap(1),
  h2('Aufgabe 3 — Musterratschläge'),
  p('1. Du solltest mehr Obst und Gemüse essen.'),
  p('2. Du solltest weniger Süßigkeiten und Chips kaufen.'),
  p('3. Du müsstest mehr Wasser und weniger Limonade trinken.'),
  p('4. Du solltest nicht jeden Tag Fast Food essen.'),
  p('5. Es wäre gut, wenn du öfter selbst kochst.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Freitext'),
  bullet('4–5 vollständige Sätze'),
  bullet('Meinung mit Begründung (weil / denn / deshalb)'),
  bullet('Mindestens ein Komparativ (gesünder / lieber / mehr)'),
  bullet('Korrekte Verbstellung im Hauptsatz und nach „weil"'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Leseübung'),
  h2('Text: Carlos ändert seine Ernährung'),
  p('Carlos Mendez kommt aus Mexiko und lebt seit zwei Jahren in München. Er arbeitet als Ingenieur bei einer Softwarefirma. Carlos isst früher sehr ungesund: viel Fast Food, Chips, Cola und selten Gemüse. Er kocht fast nie selbst und bestellt meistens Pizza oder geht in die Kantine.'),
  p('Dann geht er zum Arzt, weil er sich oft müde und schlapp fühlt. Der Arzt sagt: „Herr Mendez, Sie sollten sich gesünder ernähren. Essen Sie mehr Obst und Gemüse, trinken Sie weniger Limonade und mehr Wasser. Außerdem sollten Sie weniger rotes Fleisch essen."'),
  p('Carlos ist überrascht, aber er nimmt den Rat ernst. Er fängt an, selbst zu kochen. Zunächst kocht er nur einfache Gerichte: Nudeln mit Tomatensoße, Gemüsesuppe oder Rührei mit Spinat. Nach und nach lernt er neue Rezepte kennen.'),
  p('Jetzt, drei Monate später, fühlt sich Carlos viel besser. Zum Frühstück isst er Müsli mit Joghurt und frischen Früchten statt Croissants. Zum Mittagessen nimmt er meistens einen Salat oder ein selbst gemachtes Sandwich mit zur Arbeit. Zum Abendessen kocht er abwechslungsreich: manchmal Fisch, manchmal Hülsenfrüchte wie Linsen oder Kichererbsen, und immer viel Gemüse.'),
  p('Carlos sagt: „Ich vermisse Fast Food manchmal noch — aber ich fühle mich so viel besser! Und Kochen macht mir sogar Spaß. Letzte Woche habe ich meinen Kollegen eine mexicanische Linsensuppe gekocht — alle haben sie geliebt!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Carlos lebt seit drei Jahren in München.', ''],
      ['Früher hat Carlos oft Fast Food gegessen.', ''],
      ['Der Arzt empfiehlt Carlos, mehr rotes Fleisch zu essen.', ''],
      ['Carlos beginnt, selbst zu kochen.', ''],
      ['Zum Frühstück isst Carlos jetzt Croissants.', ''],
      ['Carlos kocht manchmal für seine Kollegen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum geht Carlos zum Arzt?'),
  writingLine(), writingLine(),
  p('b) Was empfiehlt der Arzt Carlos zu essen / zu trinken?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Was isst Carlos jetzt zum Frühstück, Mittagessen und Abendessen?', { before: 120 }),
  writingLine(), writingLine(), writingLine(),
  p('d) Wie fühlt sich Carlos heute im Vergleich zu früher?', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Früher und heute: Vergleichstabelle'),
  p('Fülle die Tabelle mit Informationen aus dem Text.'),
  stdTable(
    ['', 'Früher (vor der Änderung)', 'Heute (nach der Änderung)'],
    [
      ['Frühstück', '', ''],
      ['Mittagessen', '', ''],
      ['Abendessen', '', ''],
      ['Gefühl / Energie', '', ''],
    ],
    [2500, 4603, 4603]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Deine Meinung'),
  p('Findest du die Ernährungsumstellung von Carlos gut? Hast du selbst schon einmal etwas an deiner Ernährung verändert? Schreibe 2–3 Sätze.'),
  writingLine(), writingLine(), writingLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Über Ernährung sprechen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Carlos lebt seit drei Jahren in München.', 'F (seit zwei Jahren)'],
      ['Früher hat Carlos oft Fast Food gegessen.', 'R'],
      ['Der Arzt empfiehlt Carlos, mehr rotes Fleisch zu essen.', 'F (weniger rotes Fleisch)'],
      ['Carlos beginnt, selbst zu kochen.', 'R'],
      ['Zum Frühstück isst Carlos jetzt Croissants.', 'F (Müsli mit Joghurt und Früchten)'],
      ['Carlos kocht manchmal für seine Kollegen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Carlos geht zum Arzt, weil er sich oft müde und schlapp fühlt.'),
  p('b) Der Arzt empfiehlt: mehr Obst und Gemüse, weniger Limonade, mehr Wasser, weniger rotes Fleisch.'),
  p('c) Frühstück: Müsli mit Joghurt und Früchten. Mittagessen: Salat oder selbst gemachtes Sandwich. Abendessen: Fisch, Hülsenfrüchte oder Gemüse.'),
  p('d) Carlos fühlt sich viel besser als früher.'),
  ...gap(1),
  h2('Aufgabe 3 — Vergleichstabelle'),
  stdTable(
    ['', 'Früher', 'Heute'],
    [
      ['Frühstück', 'Croissants (impliziert)', 'Müsli, Joghurt, Früchte'],
      ['Mittagessen', 'Pizza, Kantine', 'Salat / Sandwich aus der Dose'],
      ['Abendessen', 'Fast Food, Pizza', 'Fisch, Hülsenfrüchte, Gemüse'],
      ['Gefühl / Energie', 'oft müde und schlapp', 'viel besser'],
    ],
    [2500, 4603, 4603]
  ),
  ...gap(1),
  h2('Aufgabe 4'),
  p('Individuelle Antworten. Auf Meinung + Begründung achten. Perfekt oder Präsens je nach Kontext korrekt.', { italics: true, color: '888888' }),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Lückentext'),
  infoBox([
    'Wörterkasten: ausgewogen  |  Kalorien  |  Vitamine  |  Ballaststoffe  |  Fett',
    '              Eiweiß  |  Kohlenhydrate  |  Zucker  |  Mineralwasser  |  Portionen'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Ernährungstext: Fülle die Lücken aus'),
  p('Eine gesunde Ernährung sollte ________ sein. Das bedeutet: Man braucht genug ________ aus Getreide, Kartoffeln und Hülsenfrüchten für Energie. ________ aus Fleisch, Fisch, Eiern oder Tofu ist wichtig für die Muskeln. ________ aus Obst und Gemüse stärken das Immunsystem. ________ aus Vollkornprodukten helfen der Verdauung.'),
  p('Man sollte nicht zu viel ________ essen, zum Beispiel aus Butter, Chips oder Fast Food. Auch zu viel ________ ist ungesund — er steckt in Limonade, Süßigkeiten und vielen Fertigprodukten. Statt Limonade ist ________ die gesündere Wahl.'),
  p('Experten empfehlen, täglich fünf ________ Obst und Gemüse zu essen. Das nennt man die „5 am Tag"-Regel. Außerdem sollte man auf die ________ achten und nicht zu viel auf einmal essen.'),
  ...gap(1),
  h2('Aufgabe 2 — Ratschläge geben: Konjunktiv II'),
  p('Ergänze die Sätze mit dem richtigen Verb im Konjunktiv II.'),
  infoBox(['essen  |  trinken  |  kochen  |  kaufen  |  achten  |  machen']),
  p('a) Du ________ mehr frisches Obst und Gemüse ________ (kaufen).'),
  p('b) Man ________ täglich mindestens 1,5 Liter Wasser ________ (trinken).'),
  p('c) Ihr ________ öfter selbst ________ — das ist günstiger und gesünder (kochen).'),
  p('d) Du ________ auf die Portionsgrößen ________ (achten).'),
  p('e) Wir ________ mehr Sport ________ (machen).'),
  ...gap(1),
  h2('Aufgabe 3 — Komparativ: Vergleiche ergänzen'),
  p('Ergänze den Komparativ des Adjektivs in Klammern.'),
  p('a) Gemüse ist ________ als Chips. (gesund)'),
  p('b) Wasser ist ________ als Cola. (gut)'),
  p('c) Vollkornbrot hat ________ Ballaststoffe als Weißbrot. (viel)'),
  p('d) Ein Apfel hat ________ Kalorien als ein Croissant. (wenig)'),
  p('e) Fisch ist ________ als Wurst. (fettarm)'),
  ...gap(1),
  h2('Aufgabe 4 — Ernährungstypen zuordnen'),
  p('Welche Beschreibung passt zu welchem Ernährungstyp? Verbinde mit einem Pfeil oder schreibe die Nummer.'),
  stdTable(
    ['Ernährungstyp', 'Beschreibung'],
    [
      ['1  vegetarisch', '__ kein Fleisch, kein Fisch, keine tierischen Produkte'],
      ['2  vegan', '__ wenig Kohlenhydrate, viel Eiweiß und Fett'],
      ['3  Low-Carb', '__ kein Fleisch, aber Fisch und Milchprodukte erlaubt'],
      ['4  pescetarisch', '__ kein Fleisch, kein Fisch, Milch und Eier sind okay'],
    ],
    [4000, 7706]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Über Ernährung sprechen'),
  h2('Aufgabe 1 — Ernährungstext'),
  p('1. ausgewogen'),
  p('2. Kohlenhydrate'),
  p('3. Eiweiß'),
  p('4. Vitamine'),
  p('5. Ballaststoffe'),
  p('6. Fett'),
  p('7. Zucker'),
  p('8. Mineralwasser'),
  p('9. Portionen'),
  p('10. Kalorien'),
  ...gap(1),
  h2('Aufgabe 2 — Konjunktiv II'),
  p('a) Du solltest mehr frisches Obst und Gemüse kaufen.'),
  p('b) Man sollte täglich mindestens 1,5 Liter Wasser trinken.'),
  p('c) Ihr solltet öfter selbst kochen.'),
  p('d) Du solltest auf die Portionsgrößen achten.'),
  p('e) Wir sollten mehr Sport machen.'),
  grammarBox([
    '📌  Konjunktiv II — sollte (Formen):',
    'ich sollte / du solltest / er/sie/es sollte',
    'wir sollten / ihr solltet / sie/Sie sollten',
    'Trennbare Verben: Du solltest mehr … kaufen. (Präfix ans Ende)'
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Komparativ'),
  p('a) gesünder  b) besser  c) mehr  d) weniger  e) fettärmer'),
  grammarBox([
    '📌  Unregelmäßige Komparative:',
    'gut → besser  |  viel → mehr  |  wenig → weniger',
    'Regelmäßig: gesund → gesünder  |  fettarm → fettärmer (+Umlaut möglich)'
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Ernährungstypen'),
  p('1 vegetarisch → kein Fleisch, kein Fisch, Milch und Eier sind okay'),
  p('2 vegan → kein Fleisch, kein Fisch, keine tierischen Produkte'),
  p('3 Low-Carb → wenig Kohlenhydrate, viel Eiweiß und Fett'),
  p('4 pescetarisch → kein Fleisch, aber Fisch und Milchprodukte erlaubt'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Wortliste'),
  h2('Teil A — Nährstoffe und Lebensmittelgruppen'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Ernährung', 'Nomen', 'Eine gesunde Ernährung ist wichtig.'],
      ['die Nährstoff, -e', 'Nomen', 'Vitamine sind wichtige Nährstoffe.'],
      ['das Eiweiß', 'Nomen', 'Fleisch und Hülsenfrüchte enthalten viel Eiweiß.'],
      ['der Ballaststoff, -e', 'Nomen', 'Vollkornbrot hat viele Ballaststoffe.'],
      ['das Kohlenhydrat, -e', 'Nomen', 'Nudeln und Brot sind reich an Kohlenhydraten.'],
      ['der Fettgehalt', 'Nomen', 'Chips haben einen hohen Fettgehalt.'],
      ['die Hülsenfrucht, Hülsenfrüchte', 'Nomen', 'Linsen, Bohnen und Erbsen sind Hülsenfrüchte.'],
      ['das Vollkornprodukt, -e', 'Nomen', 'Vollkornbrot ist gesünder als Weißbrot.'],
      ['die Portion, -en', 'Nomen', 'Eine Portion Obst reicht für zwischendurch.'],
      ['die Verdauung', 'Nomen', 'Ballaststoffe helfen der Verdauung.'],
    ],
    [3800, 2200, 5706]
  ),
  ...gap(1),
  h2('Teil B — Ernährungsgewohnheiten beschreiben'),
  stdTable(
    ['Ausdruck', 'Bedeutung', 'Beispiel'],
    [
      ['ausgewogen', 'Adj.: viele verschiedene Nährstoffe', 'Sie isst sehr ausgewogen.'],
      ['kalorienreich', 'Adj.: viele Kalorien', 'Fast Food ist kalorienreich.'],
      ['zuckerarm', 'Adj.: wenig Zucker', 'Ich kaufe zuckerarme Joghurts.'],
      ['fettarm', 'Adj.: wenig Fett', 'Hühnchen ist fettärmer als Schweinefleisch.'],
      ['auf die Ernährung achten', 'Phrasalverb', 'Er achtet sehr auf seine Ernährung.'],
      ['sich ernähren', 'reflexives Verb', 'Wie ernährst du dich? — Ich esse vegetarisch.'],
      ['verzichten auf + Akk.', 'Verb + Präp.', 'Sie verzichtet auf Fleisch.'],
      ['vermeiden', 'Verb', 'Ich versuche, Zucker zu vermeiden.'],
    ],
    [3800, 3000, 4906]
  ),
  ...gap(1),
  healthBox([
    '🥦  Die 5 Lebensmittelgruppen:',
    '1. Getreide & Beilagen: Brot, Nudeln, Reis, Kartoffeln (Energie)',
    '2. Obst & Gemüse: täglich 5 Portionen (Vitamine, Mineralstoffe)',
    '3. Milch & Milchprodukte: Joghurt, Käse, Quark (Kalzium)',
    '4. Fleisch, Fisch & Eier: 2–3× pro Woche (Eiweiß)',
    '5. Fette & Öle: sparsam verwenden (Olivenöl = gesünder)',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Ernährung: ___________  |  ausgewogen: ___________  |  das Eiweiß: ___________'),
  p('die Hülsenfrucht: ___________  |  verzichten auf: ___________  |  vermeiden: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Über Ernährung sprechen'),
  p('Die Wortliste dient als Referenz. Lösungshinweise für den Unterricht:'),
  ...gap(1),
  grammarBox([
    '📌  Reflexives Verb: sich ernähren',
    'Ich ernähre mich gesund. / Du ernährst dich vegetarisch.',
    'Er/Sie ernährt sich ausgewogen. / Wir ernähren uns vegan.',
    '',
    '📌  Adjektive auf -arm / -reich:',
    'fettarm → fettärmer → am fettärmsten',
    'kalorienreich → kalorienreicher → am kalorienreichsten',
    '',
    '📌  Verzichten auf + Akkusativ:',
    'Ich verzichte auf Zucker. / Er verzichtet auf Fleisch.',
  ]),
  ...gap(1),
  h2('Übungssätze mit Wortlistenvokabular'),
  p('1. Eine ausgewogene Ernährung enthält alle wichtigen Nährstoffe.'),
  p('2. Hülsenfrüchte wie Linsen und Bohnen sind reich an Eiweiß und Ballaststoffen.'),
  p('3. Ich versuche, auf zu viel Zucker zu verzichten und kalorienarme Snacks zu wählen.'),
  p('4. Sie achtet sehr auf ihre Ernährung und isst täglich fünf Portionen Obst und Gemüse.'),
  ...gap(1),
  p('Übersetzungen: abhängig von Muttersprache — individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Konversation'),
  h2('Aufgabe 1 — Dialog: Ernährungsberatung (Rollen A und B)'),
  p('Person A ist Ernährungsberater/in. Person B möchte sich gesünder ernähren. Benutzt die Satzbausteine.'),
  infoBox([
    '💬  Person A (Berater/in):  Sie sollten … / Ich empfehle … / Es wäre gut, wenn …',
    '                              Essen Sie mehr … / Trinken Sie weniger … / Achten Sie auf …',
    '❓  Person B (Ratsuchende/r): Ich esse oft … / Ich trinke gerne … / Ich habe das Problem, dass …',
    '                              Was soll ich stattdessen essen? / Wie oft sollte ich …?',
  ]),
  ...gap(1),
  p('Person B: „Ich fühle mich oft müde und habe wenig Energie. Was soll ich tun?"'),
  p('Person A: „Erzählen Sie mir zuerst: Was essen Sie normalerweise?"'),
  p('Person B: „Zum Frühstück esse ich ________________________."'),
  p('Person A: „Das ist ________________________. Sie sollten lieber ________________________."'),
  p('Person B: „Und was sollte ich zum Mittagessen essen?"'),
  p('Person A: „Ich empfehle ________________________."'),
  p('Person B: „Was ist mit Süßigkeiten? Ich esse leider sehr gerne ________________________."'),
  p('Person A: „Das verstehe ich, aber Sie sollten auf ________________________ achten."'),
  p('Person B: „Haben Sie noch andere Tipps?"'),
  p('Person A: „Ja, trinken Sie ________________________ und machen Sie ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Meinungen über Ernährung'),
  p('Diskutiert in der Gruppe. Jede Person wählt eine Position.'),
  stdTable(
    ['Position', 'Argumente (Beispiele)'],
    [
      ['A: Vegetarische Ernährung ist besser für die Gesundheit.', 'weniger Fett / mehr Vitamine / gut für die Umwelt'],
      ['B: Ausgewogene Ernährung mit Fleisch ist am besten.', 'Eiweiß / vollständige Nährstoffe / Tradition'],
      ['C: Vegan leben ist die gesündeste Option.', 'keine tierischen Produkte / gut für Umwelt / aber Planung nötig'],
    ],
    [5500, 6206]
  ),
  p('Redemittel für die Diskussion:', { bold: true, before: 120 }),
  infoBox([
    'Meinung äußern: Ich finde, dass … / Meiner Meinung nach …',
    'Zustimmen: Da haben Sie recht. / Das stimmt. / Genau!',
    'Widersprechen: Ich bin anderer Meinung. / Das sehe ich anders. / Aber …',
    'Begründen: weil … / denn … / deshalb …',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Ernährungsgewohnheiten'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wie ernährst du dich? (vegetarisch / vegan / mit allem?)', ''],
      ['Was isst du zum Frühstück? Ist das gesund?', ''],
      ['Auf was verzichtest du gerne / ungerne?', ''],
      ['Was könntest du an deiner Ernährung verbessern?', ''],
      ['Hast du eine Lieblingsspeise, die auch gesund ist?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Ernährungs-Quiz'),
  p('Ein/e Teilnehmer/in beschreibt ein Lebensmittel (ohne den Namen zu sagen). Die anderen raten.'),
  infoBox([
    '🧩  Beschreibungsregeln:',
    '1. Farbe/Form: „Es ist orange und rund." / „Es ist lang und grün."',
    '2. Nährstoffe: „Es hat viele Vitamine." / „Es ist kalorienreich."',
    '3. Zubereitung: „Man kann es kochen oder roh essen." / „Man backt es im Ofen."',
    '4. Geschmack: „Es schmeckt süß / sauer / würzig / mild."',
    '⏱  Maximal 4 Hinweise — wer zuerst rät, bekommt einen Punkt!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Über Ernährung sprechen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Konjunktiv II korrekt gebildet: sollten / empfehlen / es wäre gut'),
  bullet('Ernährungsvokabular verwendet: Vitamine / Ballaststoffe / ausgewogen'),
  bullet('Reaktion auf Vorschläge (zustimmen / nachfragen) sprachlich korrekt'),
  bullet('Höfliche Sie-Form durchgehend eingehalten'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('B: „Zum Frühstück esse ich meistens ein Croissant und trinke Kaffee mit Zucker."'),
  p('A: „Das ist leider sehr kalorienreich und hat wenig Nährstoffe. Sie sollten lieber Müsli mit Joghurt und frischen Früchten essen."'),
  p('A: „Ich empfehle mittags einen Salat mit Hülsenfrüchten oder eine selbst gemachte Gemüsesuppe."'),
  p('A: „Trinken Sie mindestens 1,5 Liter Wasser täglich und machen Sie 30 Minuten Bewegung."'),
  ...gap(1),
  h2('Aufgabe 2 — Diskussion: Hinweise'),
  p('Lehrkraft bewertet:'),
  bullet('Meinungen klar und begründet formuliert'),
  bullet('Fachvokabular aus der Wortliste eingesetzt'),
  bullet('Reaktion auf andere Meinungen höflich und korrekt'),
  bullet('Keine Antwort ist „falsch" — Argumentation zählt'),
  ...gap(1),
  h2('Aufgabe 4 — Quiz-Beispiele'),
  p('Karotte: „Es ist orange und lang. Es hat viele Vitamine. Man kann es roh oder gekocht essen. Es schmeckt leicht süß."'),
  p('Zitrone: „Es ist gelb und rund. Es hat sehr viele Vitamine C. Man verwendet es beim Kochen. Es schmeckt sehr sauer."'),
  p('Linsen: „Es sind kleine runde Körner. Sie sind eine Hülsenfrucht. Sie haben viel Eiweiß. Man kocht Suppe oder Eintopf damit."'),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Ernährung sprechen — Bildaufgaben'),
  h2('Aufgabe 1 — Lebensmittel kategorisieren'),
  p('[BILD 1: Zehn Lebensmittel abgebildet: Apfel, Brot, Käse, Pommes, Schokolade, Brokkoli, Hühnchen, Nudeln, Joghurt, Limonade]'),
  p('Sortiere die Lebensmittel in die Tabelle. Schreibe sie in die richtige Spalte.'),
  stdTable(
    ['Gesund / empfohlen', 'In Maßen okay', 'Eher ungesund / selten'],
    [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']],
    [3902, 3902, 3902]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Ernährungspyramide beschreiben'),
  p('[BILD 2: Eine einfache Ernährungspyramide mit 5 Ebenen — unten breit: Getreide/Wasser; dann Obst/Gemüse; dann Milch/Fleisch/Fisch; oben schmal: Fette und Süßigkeiten]'),
  p('a) Was steht an der Basis der Pyramide? Was bedeutet das?'),
  writingLine(), writingLine(),
  p('b) Was steht an der Spitze der Pyramide? Warum?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Beschreibe deine eigene Ernährung: Passt sie zur Pyramide? (2–3 Sätze)', { before: 120 }),
  writingLine(), writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Nährwertangaben lesen'),
  p('[BILD 3: Nährwerttabelle auf einer Joghurtpackung: Energie 65 kcal / 100g, Eiweiß 3,8 g, Kohlenhydrate 6,2 g (davon Zucker 5,1 g), Fett 2,0 g, Ballaststoffe 0 g]'),
  p('a) Wie viele Kalorien hat der Joghurt pro 100 g?'),
  writingLine(),
  p('b) Wie viel Eiweiß und wie viel Fett hat er?', { before: 120 }),
  writingLine(),
  p('c) Wie viel Zucker ist in 200 g Joghurt? Rechne!', { before: 120 }),
  writingLine(),
  p('d) Ist dieser Joghurt gesund? Begründe mit 1–2 Sätzen.', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 4 — Wochenspeiseplan bewerten'),
  p('[BILD 4: Ein einfacher Wochenspeiseplan (Mo–Fr) mit: Montag: Pizza + Cola; Dienstag: Salat + Wasser; Mittwoch: Burger + Pommes; Donnerstag: Fisch + Gemüse + Reis; Freitag: Döner + Limonade]'),
  p('a) An welchen Tagen ist die Ernährung gesund? Warum?'),
  writingLine(), writingLine(),
  p('b) Verändere den Montag-Speiseplan: Was würdest du stattdessen empfehlen?', { before: 120 }),
  writingLine(), writingLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Über Ernährung sprechen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab. Lehrkraft fügt passende Bilder ein.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Kategorisierung (Muster)'),
  stdTable(
    ['Gesund / empfohlen', 'In Maßen okay', 'Eher ungesund / selten'],
    [
      ['Apfel, Brokkoli, Hühnchen, Joghurt, Nudeln, Brot', 'Käse', 'Pommes, Schokolade, Limonade'],
    ],
    [3902, 3902, 3902]
  ),
  p('Hinweis: Brot kann je nach Sorte (Vollkorn/Weiß) unterschiedlich bewertet werden. Beide Antworten akzeptieren.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Ernährungspyramide'),
  p('a) An der Basis stehen Getreideprodukte und Wasser. Das bedeutet: Diese Lebensmittel sollte man am häufigsten essen / trinken.'),
  p('b) An der Spitze stehen Fette und Süßigkeiten. Weil man sie nur selten und in kleinen Mengen essen sollte.'),
  p('c) Individuelle Antwort. Auf ausgewogene Begründung achten.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 3 — Nährwerte'),
  p('a) 65 Kalorien (kcal) pro 100 g.'),
  p('b) 3,8 g Eiweiß und 2,0 g Fett.'),
  p('c) In 100 g sind 5,1 g Zucker → in 200 g sind 10,2 g Zucker.'),
  p('d) Ja, dieser Joghurt ist relativ gesund: wenig Fett (2 g), gutes Eiweiß (3,8 g), moderate Kalorien. Der Zuckergehalt (5,1 g/100g) ist akzeptabel für Naturjoghurt.'),
  ...gap(1),
  h2('Aufgabe 4 — Wochenspeiseplan'),
  p('a) Dienstag (Salat + Wasser) und Donnerstag (Fisch + Gemüse + Reis) sind gesund: viele Nährstoffe, wenig Fett, gesunde Getränke.'),
  p('b) Montag-Verbesserung: Statt Pizza und Cola zum Beispiel: Vollkornpasta mit Tomatensoße und Salat + Wasser oder Tee.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
