// A2_Erwachsene — Thema 11 UP 02: Präteritum von sein, haben und Modalverben
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Präteritum von sein, haben und Modalverben';
const HEADING = 'Thema 11 — Grammatik A2 Erwachsene';
const SUBHEAD = 'UP 02: Präteritum von sein, haben und Modalverben';
const PREFIX  = 'A2_Erwachsene_Grammatik_02_Praeteritum';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '11_Grammatik', '02_Praeteritum');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 02`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
const ftr = () => ({ default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }), new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })] })] }) });

const h1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const ruleBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '4527A0' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '4527A0' }, left: { style: BorderStyle.SINGLE, size: 12, color: '4527A0' }, right: { style: BorderStyle.SINGLE, size: 12, color: '4527A0' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'EDE7F6' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── 1. SCHREIBEN ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum von sein, haben, Modalverben — Schreibübung'),
  ruleBox([
    'PRÄTERITUM — wann verwenden?',
    'Im Alltag: hauptsächlich für sein, haben und Modalverben',
    'Auch in geschriebenen Texten: Berichten, Romanen, Briefen',
    '',
    'sein:    ich war / du warst / er war / wir waren / ihr wart / sie waren',
    'haben:   ich hatte / du hattest / er hatte / wir hatten / ihr hattet / sie hatten',
    '',
    'Modalverben (oft ohne Umlaut!):',
    'können → ich konnte (kein Umlaut!)',
    'müssen → ich musste',
    'dürfen → ich durfte',
    'sollen → ich sollte',
    'wollen → ich wollte',
    'mögen  → ich mochte (Achtung: -och- statt -öch-)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — sein und haben im Präteritum'),
  p('Ergänze war/warst/waren bzw. hatte/hattest/hatten.'),
  p('a) Gestern ________ ich krank — ich ________ Kopfschmerzen.'),
  p('b) Wir ________ am Wochenende in Berlin — wir ________ viel Spaß.'),
  p('c) Sie ________ um 19 Uhr im Restaurant. Sie ________ einen Tisch reserviert.'),
  p('d) Du ________ als Kind sehr fröhlich — du ________ viele Freunde.'),
  p('e) Letzten Sommer ________ es sehr heiß. Wir ________ kein gutes Wetter zum Wandern.'),
  p('f) Mein Großvater ________ ein netter Mann. Er ________ immer Zeit für uns.'),
  ...gap(1),
  h2('Aufgabe 2 — Modalverben im Präteritum'),
  ruleBox([
    'Modalverben — Konjugation Präteritum:',
    '',
    '          können    müssen    dürfen    sollen    wollen    mögen',
    'ich       konnte    musste    durfte    sollte    wollte    mochte',
    'du        konntest  musstest  durftest  solltest  wolltest  mochtest',
    'er/sie/es konnte    musste    durfte    sollte    wollte    mochte',
    'wir       konnten   mussten   durften   sollten   wollten   mochten',
    'ihr       konntet   musstet   durftet   solltet   wolltet   mochtet',
    'sie/Sie   konnten   mussten   durften   sollten   wollten   mochten',
  ]),
  ...gap(1),
  p('Setze das Modalverb ins Präteritum.'),
  p('a) Als Kind (können) ich noch nicht schwimmen. → '),
  wLine(),
  p('b) Wir (müssen) gestern länger arbeiten. → ', { before: 120 }),
  wLine(),
  p('c) Sie (dürfen) als Schülerin nicht ins Kino gehen. → ', { before: 120 }),
  wLine(),
  p('d) Er (wollen) Pilot werden, aber jetzt ist er Lehrer. → ', { before: 120 }),
  wLine(),
  p('e) Wir (mögen) als Kinder keinen Spinat. → ', { before: 120 }),
  wLine(),
  p('f) Du (sollen) gestern den Brief schreiben — hast du das gemacht? → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Über die Kindheit erzählen'),
  p('Schreibe 5–6 Sätze über deine Kindheit. Benutze Präteritum von sein, haben und mindestens drei Modalverben.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Eine Erzählung im Präteritum'),
  p('Schreibe einen kurzen Text (6–7 Sätze): „Letzten Urlaub …". Benutze Präteritum von sein/haben + Perfekt für andere Verben.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Präteritum'),
  grammarBox([
    'Präteritum vs. Perfekt — wann was?',
    'Präteritum: sein, haben, Modalverben — auch in der Alltagssprache',
    '            Beispiel: Ich war müde. / Sie hatte Hunger. / Wir konnten nicht.',
    'Perfekt:    Vollverben (machen, gehen, essen …) in der gesprochenen Sprache',
    '            Beispiel: Ich habe gegessen. / Sie ist gekommen.',
    'Mischung im Alltag: „Gestern war ich müde, deshalb bin ich früh ins Bett gegangen."',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — sein / haben'),
  p('a) war … hatte    b) waren … hatten    c) waren … hatten'),
  p('d) warst … hattest    e) war … hatten    f) war … hatte'),
  ...gap(1),
  h2('Aufgabe 2 — Modalverben'),
  p('a) Als Kind konnte ich noch nicht schwimmen.'),
  p('b) Wir mussten gestern länger arbeiten.'),
  p('c) Sie durfte als Schülerin nicht ins Kino gehen.'),
  p('d) Er wollte Pilot werden, aber jetzt ist er Lehrer.'),
  p('e) Wir mochten als Kinder keinen Spinat.'),
  p('f) Du solltest gestern den Brief schreiben.'),
  ...gap(1),
  h2('Aufgabe 3 — Muster Kindheit'),
  p('Als Kind war ich sehr fröhlich und hatte viele Freunde. Wir wohnten auf dem Land — ich konnte den ganzen Tag draußen spielen. Ich durfte jeden Sommer zu meiner Oma fahren. Sie hatte einen großen Garten, in dem ich Tomaten pflanzen wollte. Mein Bruder mochte den Garten nicht so sehr — er musste oft zu Hause helfen. Es waren wirklich glückliche Zeiten.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Mindestens 3 Formen von sein/haben im Präteritum'),
  bullet('Mindestens 2 Modalverben im Präteritum'),
  bullet('Klarer Bezug zur Vergangenheit'),
  bullet('Mischung Präteritum + Perfekt für lebendige Erzählung'),
  bullet('Korrekte Endungen (ich war / wir waren — kein „ware"!)'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum — Leseübung'),
  h2('Text: Tante Helgas Brief aus den 70er Jahren'),
  p('Beim Aufräumen habe ich einen alten Brief von meiner Tante Helga gefunden — geschrieben im Jahr 1972. Hier ein Auszug:'),
  p('„Liebe Maria, ich muss dir einfach von meinem Sommer erzählen! Es war wunderbar. Ich war drei Wochen am Bodensee. Das Wetter war fast jeden Tag perfekt — wir hatten kaum Regen. Mein Mann und ich konnten viel schwimmen, segeln und wandern."'),
  p('„Wir hatten ein kleines Hotel direkt am See. Das Personal war sehr nett und das Essen war ausgezeichnet. Jeden Morgen mussten wir zwischen Frühstück und Schwimmen wählen — meistens haben wir beides gemacht!"'),
  p('„Unsere Kinder waren auch dabei: Klaus war damals 8 Jahre alt und Petra 6. Sie konnten beide schon schwimmen und durften jeden Tag zwei Stunden im Wasser bleiben. Klaus wollte unbedingt segeln lernen — er war so begeistert! Petra mochte das Segeln nicht so — sie war lieber am Strand und sammelte Steine."'),
  p('„Eines Abends sollten wir in einem berühmten Fischrestaurant essen — das Restaurant war voll, wir mussten 30 Minuten warten. Aber es hat sich gelohnt: Der Fisch war fantastisch! Klaus und Petra durften zum ersten Mal Limonade mit Strohhalm trinken — das war für sie das Highlight des Abends."'),
  p('„Du musst auch einmal an den Bodensee fahren. Dort kannst du wirklich entspannen. Liebe Grüße, deine Helga"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Tante Helga schrieb den Brief im Jahr 1972.', ''],
      ['Sie war eine Woche am Bodensee.', ''],
      ['Das Wetter war meistens schlecht.', ''],
      ['Klaus war 6 und Petra 8 Jahre alt.', ''],
      ['Klaus wollte segeln lernen.', ''],
      ['Petra war lieber am Strand und sammelte Steine.', ''],
      ['Im Fischrestaurant mussten sie 30 Minuten warten.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Verben aus dem Text finden'),
  p('Suche im Text 8 Verben im Präteritum. Schreibe Infinitiv und Form auf.'),
  stdTable(
    ['Form im Text', 'Infinitiv'],
    [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Fragen zum Text'),
  p('a) Wo waren Tante Helga und ihre Familie im Urlaub?'),
  wLine(),
  p('b) Wie alt waren Klaus und Petra zu der Zeit?', { before: 120 }),
  wLine(),
  p('c) Was wollte Klaus unbedingt lernen?', { before: 120 }),
  wLine(),
  p('d) Warum war der Abend im Fischrestaurant für die Kinder besonders?', { before: 120 }),
  wLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Präteritum'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Tante Helga schrieb den Brief im Jahr 1972.', 'R'],
      ['Sie war eine Woche am Bodensee.', 'F (drei Wochen)'],
      ['Das Wetter war meistens schlecht.', 'F (fast jeden Tag perfekt)'],
      ['Klaus war 6 und Petra 8 Jahre alt.', 'F (Klaus 8, Petra 6)'],
      ['Klaus wollte segeln lernen.', 'R'],
      ['Petra war lieber am Strand und sammelte Steine.', 'R'],
      ['Im Fischrestaurant mussten sie 30 Minuten warten.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Verben (Auswahl)'),
  stdTable(
    ['Form im Text', 'Infinitiv'],
    [
      ['war', 'sein'],
      ['hatten', 'haben'],
      ['konnten', 'können'],
      ['mussten', 'müssen'],
      ['durften', 'dürfen'],
      ['wollte', 'wollen'],
      ['mochte', 'mögen'],
      ['sollten', 'sollen'],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösungen'),
  p('a) Sie waren am Bodensee — drei Wochen in einem kleinen Hotel direkt am See.'),
  p('b) Klaus war 8 Jahre alt, Petra war 6.'),
  p('c) Klaus wollte segeln lernen.'),
  p('d) Sie durften zum ersten Mal Limonade mit Strohhalm trinken.'),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum — Lückentext'),
  h2('Aufgabe 1 — sein/haben im Präteritum'),
  p('Ergänze war/warst/waren oder hatte/hattest/hatten.'),
  p('a) Letztes Jahr ________ ich in Spanien — ich ________ einen wunderbaren Urlaub.'),
  p('b) Wir ________ als Kinder keine Computer, aber wir ________ viel Spaß draußen.'),
  p('c) ________ du gestern auf der Party? Wie ________ es?'),
  p('d) Mein Vater ________ Lehrer und ________ immer viele Bücher zu Hause.'),
  p('e) Ihr ________ noch zu klein, um den Film zu sehen — er ________ ab 16.'),
  p('f) Sie (Pl.) ________ ein neues Auto und ________ damit sehr glücklich.'),
  ...gap(1),
  h2('Aufgabe 2 — Modalverben'),
  p('Setze das Modalverb in der richtigen Form (Präteritum) ein.'),
  p('a) (können) Als Kind ________ ich nicht Klavier spielen.'),
  p('b) (müssen) Wir ________ gestern bis 22 Uhr arbeiten.'),
  p('c) (dürfen) Mein Bruder ________ am Sonntag nicht ausgehen.'),
  p('d) (wollen) Ich ________ schon immer Lehrerin werden.'),
  p('e) (sollen) Du ________ mich gestern anrufen — warum hast du es nicht getan?'),
  p('f) (mögen) Sie (Sg.) ________ den neuen Kollegen sofort.'),
  p('g) (können) Wir ________ leider nicht zur Hochzeit kommen.'),
  p('h) (müssen) Ihr ________ damals auch viel zu Hause helfen, oder?'),
  ...gap(1),
  h2('Aufgabe 3 — Eine Geschichte: Lücken füllen'),
  infoBox(['Verben für die Lücken: war | hatte | konnte | musste | durfte | wollte | mochte']),
  ...gap(1),
  p('Letzten Winter ________ ich krank. Ich ________ hohes Fieber und ________ nicht zur Arbeit gehen. Mein Chef ________ verstanden — ich ________ vier Tage zu Hause bleiben. Ich ________ eigentlich arbeiten, weil ich viel zu tun ________, aber das ________ nicht möglich. Ich ________ gar nichts essen — meine Mutter ________ mir aber leckere Suppe gebracht.'),
  ...gap(1),
  h2('Aufgabe 4 — Tabelle: Konjugation üben'),
  p('Fülle die Tabelle aus.'),
  stdTable(
    ['Person', 'sein', 'haben', 'können', 'müssen', 'wollen'],
    [
      ['ich', 'war', 'hatte', '________', '________', '________'],
      ['du', '________', '________', 'konntest', '________', '________'],
      ['er/sie/es', '________', '________', '________', 'musste', '________'],
      ['wir', '________', '________', '________', '________', 'wollten'],
      ['ihr', '________', '________', '________', '________', '________'],
      ['sie/Sie', '________', '________', '________', '________', '________'],
    ],
    [1700, 1900, 1900, 2000, 2000, 2206]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Präteritum'),
  h2('Aufgabe 1 — sein/haben'),
  p('a) war … hatte    b) hatten … hatten    c) Warst … war'),
  p('d) war … hatte    e) wart … war    f) hatten … waren'),
  ...gap(1),
  h2('Aufgabe 2 — Modalverben'),
  p('a) konnte    b) mussten    c) durfte    d) wollte'),
  p('e) solltest    f) mochte    g) konnten    h) musstet'),
  ...gap(1),
  h2('Aufgabe 3 — Geschichte'),
  p('1. war  2. hatte  3. konnte  4. war (verstanden)  5. durfte'),
  p('6. wollte  7. hatte  8. war  9. konnte  10. hat (gebracht)'),
  p('Hinweis: Lücke 4 + 10 = Perfekt im Kontext! Anpassung nach Verfügbarkeit der Wörter.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Konjugationstabelle'),
  stdTable(
    ['Person', 'sein', 'haben', 'können', 'müssen', 'wollen'],
    [
      ['ich', 'war', 'hatte', 'konnte', 'musste', 'wollte'],
      ['du', 'warst', 'hattest', 'konntest', 'musstest', 'wolltest'],
      ['er/sie/es', 'war', 'hatte', 'konnte', 'musste', 'wollte'],
      ['wir', 'waren', 'hatten', 'konnten', 'mussten', 'wollten'],
      ['ihr', 'wart', 'hattet', 'konntet', 'musstet', 'wolltet'],
      ['sie/Sie', 'waren', 'hatten', 'konnten', 'mussten', 'wollten'],
    ],
    [1700, 1900, 1900, 2000, 2000, 2206]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum — Wortliste'),
  h2('Teil A — sein und haben'),
  stdTable(
    ['Person', 'sein (war)', 'haben (hatte)', 'Beispielsatz'],
    [
      ['ich', 'war', 'hatte', 'Ich war müde. / Ich hatte Hunger.'],
      ['du', 'warst', 'hattest', 'Du warst gestern krank? / Hattest du Zeit?'],
      ['er/sie/es', 'war', 'hatte', 'Sie war traurig. / Er hatte Glück.'],
      ['wir', 'waren', 'hatten', 'Wir waren in Berlin. / Wir hatten Spaß.'],
      ['ihr', 'wart', 'hattet', 'Wart ihr da? / Hattet ihr ein Problem?'],
      ['sie/Sie', 'waren', 'hatten', 'Sie waren begeistert. / Sie hatten viel Geld.'],
    ],
    [2000, 2000, 2200, 5506]
  ),
  ...gap(1),
  h2('Teil B — Modalverben'),
  stdTable(
    ['Modalverb', 'ich-Form', 'Bedeutung', 'Beispielsatz'],
    [
      ['können', 'konnte', 'Fähigkeit', 'Ich konnte gut schwimmen.'],
      ['müssen', 'musste', 'Pflicht', 'Wir mussten lernen.'],
      ['dürfen', 'durfte', 'Erlaubnis', 'Sie durfte nicht ausgehen.'],
      ['sollen', 'sollte', 'Auftrag', 'Du solltest die Mail lesen.'],
      ['wollen', 'wollte', 'Wunsch', 'Er wollte Arzt werden.'],
      ['mögen', 'mochte', 'Vorliebe', 'Sie mochte den neuen Kollegen.'],
    ],
    [2500, 2200, 2500, 4506]
  ),
  ...gap(1),
  ruleBox([
    'WICHTIG — Häufige Fehler vermeiden:',
    '✘ ich konnte nicht zu schwimmen → ✓ ich konnte nicht schwimmen (kein „zu"!)',
    '✘ ich kannte das Buch lesen → ✓ ich konnte das Buch lesen (kannte = wissen!)',
    '✘ ich mochte / wollte: Vorsicht — beide bedeuten verschieden!',
    '   mochte = mag (jetzt nicht mehr Wunsch, sondern Sympathie)',
    '   wollte = mein Wunsch / Plan war',
    '✘ ich möchte (Konjunktiv II) → ✓ ich wollte (Präteritum vergangen)',
    '',
    'Modalverb-Konjugation: 1. + 3. Person Singular IMMER gleich!',
    '  ich konnte = er/sie konnte (kein -e am Ende von er/sie!)',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('ich war: ___________  |  ich hatte: ___________  |  ich konnte: ___________'),
  p('ich musste: ___________  |  ich wollte: ___________  |  ich mochte: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Präteritum'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Modalverben — Bedeutung im Präteritum:',
    'konnte = war fähig zu / hatte die Möglichkeit',
    'musste = war verpflichtet / hatte keine Wahl',
    'durfte = hatte die Erlaubnis',
    'sollte = hatte einen Auftrag (von außen)',
    'wollte = hatte den Wunsch / die Absicht',
    'mochte = mag jemanden/etwas (Vorliebe / Sympathie)',
    '',
    'Konjunktiv II (höflich): könnte / müsste / dürfte / sollte / wollte / möchte',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Als ich klein war, hatte ich einen Hund. Er war mein bester Freund. Wir konnten stundenlang im Garten spielen.'),
  p('Letzte Woche musste ich Überstunden machen. Ich wollte eigentlich früher gehen, aber mein Chef hatte zu viel Arbeit.'),
  p('Sie waren glücklich, als das Baby zur Welt kam. Sie konnten nicht aufhören zu lächeln.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum — Konversation'),
  h2('Aufgabe 1 — Dialog: Erinnerungen aus der Kindheit'),
  p('Zwei Personen sprechen über ihre Kindheit. Ergänzt den Dialog.'),
  infoBox([
    'Erinnerungen einleiten: Als ich Kind war, … / In meiner Kindheit …',
    'Erlaubnisse: Ich durfte (nicht) … / Mein/e Eltern erlaubten …',
    'Pflichten: Ich musste … / Wir mussten immer …',
    'Wünsche: Ich wollte … werden. / Ich mochte besonders …',
    'Fähigkeiten: Ich konnte schon mit 5 … / Mit 10 konnte ich …',
  ]),
  ...gap(1),
  p('A: „Wie ________ deine Kindheit? Hattest du eine schöne Zeit?"'),
  p('B: „Ja, sehr schön! Wir ________ fünf Geschwister und ________ in einem kleinen Dorf."'),
  p('A: „Was ________ du am liebsten?"'),
  p('B: „Ich ________ gerne draußen spielen. Ich ________ schon mit 6 Jahren Fahrrad fahren."'),
  p('A: „Und was ________ du nicht machen?"'),
  p('B: „Wir ________ nicht spät ins Bett gehen — meistens um 20 Uhr. Und Süßigkeiten ________ wir nur am Wochenende essen."'),
  p('A: „Was ________ du als Kind werden?"'),
  p('B: „Ich ________ immer Tierärztin werden. Aber jetzt bin ich Lehrerin — auch schön!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Interview mit den Großeltern'),
  stdTable(
    ['Enkel/in (A) — fragt', 'Großeltern (B) — antworten'],
    [
      ['Wie war es früher in eurer Schule?', 'Wir hatten/mussten/durften …'],
      ['Was wolltet ihr als Kinder werden?', 'Ich wollte …'],
      ['Was konntet ihr besonders gut?', 'Ich konnte … / Ich mochte …'],
      ['Was war damals anders als heute?', 'Wir hatten kein/e … / Wir konnten nicht …'],
      ['Was war eure schönste Erinnerung?', 'Es war … / Wir hatten …'],
    ],
    [4500, 7206]
  ),
  ruleBox([
    'Tipps für die Erzählung:',
    'sein + haben sehr häufig: war / hatte für Beschreibungen',
    'Modalverben für Möglichkeiten / Pflichten / Erlaubnisse / Wünsche',
    'Andere Verben → Perfekt: Wir haben gespielt / Sie ist gegangen.',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Vergangenheit'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wo waren Sie vor 5 Jahren? Was haben Sie damals gemacht?', ''],
      ['Was konnten Sie schon als Kind besonders gut?', ''],
      ['Mussten Sie als Schüler/in viel lernen?', ''],
      ['Was wollten Sie als Kind werden?', ''],
      ['Was mochten Sie als Kind besonders gerne essen?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Drei Wahrheiten und eine Lüge"'),
  p('Jede Person macht 4 Aussagen über ihre Kindheit im Präteritum (sein/haben/Modalverb). Eine davon ist erfunden! Die anderen raten, welche.'),
  infoBox([
    'Beispielaussagen:',
    '1. Als Kind hatte ich einen Hund namens Bello.',
    '2. Ich musste immer um 19 Uhr ins Bett.',
    '3. Ich konnte schon mit 4 Jahren lesen.',
    '4. Mein Bruder wollte Astronaut werden.',
    'Welche ist die Lüge? Lasst die Gruppe raten und begründen!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Präteritum'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Mindestens 4 Modalverben im Präteritum'),
  bullet('sein/haben in verschiedenen Personen'),
  bullet('1. + 3. Person Singular gleich (ich konnte = er konnte)'),
  bullet('Klarer Bezug zur Kindheit / Vergangenheit'),
  bullet('Natürlicher Gesprächsfluss'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Wie war deine Kindheit?" / B: „Sehr schön! Wir hatten fünf Geschwister und wohnten in einem kleinen Dorf."'),
  p('A: „Was machtest du am liebsten?" / B: „Ich wollte gerne draußen spielen. Ich konnte schon mit 6 Fahrrad fahren."'),
  p('A: „Was durftest du nicht machen?" / B: „Wir durften nicht spät ins Bett gehen — meistens um 20 Uhr."'),
  p('B: „Ich wollte immer Tierärztin werden. Aber jetzt bin ich Lehrerin — auch schön!"'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Großeltern-Interview'),
  bullet('„Wir/Ich hatten/hatte" und „mussten/durften/konnten"'),
  bullet('Mindestens 4 verschiedene Modalverben verwendet'),
  bullet('Vergleich „damals — heute" mit Konnektoren'),
  bullet('Lebendige Erzählung mit konkreten Beispielen'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: korrekte Modalverb-Formen (konnte nicht „könnte"), keine Vermischung mit Konjunktiv II, 1.+3. Person Singular gleich.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Präteritum — Bildaufgaben'),
  h2('Aufgabe 1 — Schwarzweiß-Foto „Damals"'),
  p('[BILD 1: Ein altes Schwarzweiß-Familienfoto aus den 1950er Jahren — eine Familie vor einem Haus, mit altmodischer Kleidung, drei Kinder und zwei Erwachsene, kein Auto sichtbar.]'),
  p('a) Beschreibe die Familie in 4–5 Sätzen mit Präteritum (war/hatte) + Modalverben.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Schultag früher und heute'),
  p('[BILD 2: Zwei Bilder im Vergleich: (1) Klassenzimmer 1960er Jahre — strenger Lehrer, Tafel mit Kreide, Schüler in Reihen, alle gleich angezogen. (2) Klassenzimmer 2026 — moderne Tablets, kreisförmige Sitzordnung, freundliche Atmosphäre.]'),
  p('a) Beschreibe die Unterschiede in 5–6 Sätzen. Benutze Präteritum für „damals", Präsens für „heute". Mit Modalverben!'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Spielsachen früher'),
  p('[BILD 3: Vier alte Spielsachen aus den 1970er Jahren: Holzpuppe, Kreisel, Bauklötze, Holzpferd. Daneben: Kinder, die damit spielen.]'),
  p('a) Was konnten oder mussten Kinder damals mit diesen Spielsachen machen? Schreibe 4 Sätze.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Verben zuordnen'),
  p('[BILD 4: Sechs Bilder einer Person an einem typischen Tag: (1) müde aufstehen, (2) viel arbeiten, (3) krank sein, (4) Hunger haben, (5) gut schlafen, (6) traurig sein.]'),
  p('a) Schreibe zu jedem Bild einen Satz im Präteritum (sein/haben + Adjektiv oder Modalverb).'),
  stdTable(
    ['Bild', 'Satz im Präteritum'],
    [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', '']],
    [1500, 10206]
  ),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Präteritum'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Damals-Foto'),
  p('Beispiel: Die Familie war groß — sie hatte drei Kinder. Sie wohnten in einem kleinen Haus. Die Eltern mussten viel arbeiten. Die Kinder durften draußen spielen, aber sie mussten auch im Garten helfen. Sie hatten kein Auto, aber sie waren glücklich.'),
  ...gap(1),
  h2('Aufgabe 2 — Schule früher / heute'),
  p('Beispiel: Früher mussten die Schüler in Reihen sitzen — heute können sie im Kreis sitzen. Damals durften die Schüler nicht miteinander reden, heute dürfen sie diskutieren. Früher hatten die Lehrer nur Kreide und Tafel — heute haben die Schüler Tablets und Computer. Damals mussten die Schüler alle gleiche Kleidung tragen, heute können sie tragen, was sie wollen. Insgesamt war die Schule früher strenger als heute.'),
  ...gap(1),
  h2('Aufgabe 3 — Spielsachen früher'),
  p('Beispiele: Die Kinder konnten mit der Holzpuppe Familie spielen. Sie mussten den Kreisel selbst antreiben — das brauchte Geschick. Mit Bauklötzen konnten sie Häuser und Türme bauen. Auf dem Holzpferd durften sie reiten — wie auf einem echten Pferd.'),
  ...gap(1),
  h2('Aufgabe 4 — Verben zuordnen'),
  stdTable(
    ['Bild', 'Beispielsatz'],
    [
      ['1', 'Sie war müde, als sie aufstand.'],
      ['2', 'Sie musste den ganzen Tag viel arbeiten.'],
      ['3', 'Am Mittwoch war sie krank — sie hatte Fieber.'],
      ['4', 'Sie hatte großen Hunger und brauchte etwas zu essen.'],
      ['5', 'In der Nacht konnte sie endlich gut schlafen.'],
      ['6', 'Manchmal war sie traurig und wollte nicht reden.'],
    ],
    [1500, 10206]
  ),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
