// A2_Erwachsene — Thema 11 UP 01: Perfekt
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Perfekt';
const HEADING = 'Thema 11 — Grammatik A2 Erwachsene';
const SUBHEAD = 'UP 01: Perfekt';
const PREFIX  = 'A2_Erwachsene_Grammatik_01_Perfekt';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '11_Grammatik', '01_Perfekt');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 01`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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
  h1('Perfekt — Schreibübung'),
  ruleBox([
    'GRAMMATIK PERFEKT — Übersicht:',
    'Bildung: haben/sein (konjugiert) + Partizip II (am Satzende!)',
    'Verwendung: Vergangenheit in der gesprochenen Sprache und in Briefen',
    '',
    'Regelmäßige Verben (schwach): ge- + Verbstamm + -t',
    '  machen → gemacht / lernen → gelernt / kaufen → gekauft',
    '',
    'Unregelmäßige Verben (stark): ge- + Verbstamm + -en (oft mit Vokalwechsel)',
    '  gehen → gegangen / sehen → gesehen / kommen → gekommen',
    '',
    'sein-Verben (Bewegung / Zustandsänderung):',
    '  gehen, kommen, fahren, fliegen, schwimmen, reisen, sterben, werden',
    '  Beispiel: Ich bin nach Berlin gefahren.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Tagesablauf im Perfekt'),
  p('Schreiben Sie 5 Sätze über Ihren gestrigen Tag. Beginnen Sie jeden Satz mit einem Zeitausdruck.'),
  p('a) Gestern Morgen ', { before: 100 }),
  wLine(),
  p('b) Vormittags ', { before: 120 }),
  wLine(),
  p('c) Mittags ', { before: 120 }),
  wLine(),
  p('d) Am Nachmittag ', { before: 120 }),
  wLine(),
  p('e) Abends ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Verben ins Perfekt setzen'),
  p('Bilde Sätze im Perfekt mit den vorgegebenen Verben.'),
  p('a) ich / einen Brief / schreiben → '),
  wLine(),
  p('b) wir / gestern / nach Wien / fahren → ', { before: 120 }),
  wLine(),
  p('c) sie (Sg.) / einen Kuchen / backen → ', { before: 120 }),
  wLine(),
  p('d) er / das Auto / waschen → ', { before: 120 }),
  wLine(),
  p('e) ihr / ins Kino / gehen → ', { before: 120 }),
  wLine(),
  p('f) ich / schon / das Buch / lesen → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — haben oder sein?'),
  ruleBox([
    'haben oder sein? — Faustregel:',
    'sein: Bewegung von A nach B (gehen, fahren, fliegen, reisen, kommen)',
    'sein: Zustandsänderung (aufstehen, einschlafen, sterben, werden)',
    'sein-Sonderfälle: sein, bleiben, passieren',
    'haben: alle anderen Verben (ca. 90 % der Verben!)',
    'Tipp: Bei Bewegung ohne klares Ziel (tanzen, schwimmen): meistens haben.',
  ]),
  ...gap(1),
  p('Ergänze haben oder sein im Perfekt.'),
  p('a) Ich ________ gestern lange geschlafen.'),
  p('b) Wir ________ um 7 Uhr aufgestanden.'),
  p('c) Sie ________ einen interessanten Film gesehen.'),
  p('d) Er ________ nach Frankreich gefahren.'),
  p('e) Du ________ pünktlich angekommen.'),
  p('f) Ihr ________ gestern viel gelernt.'),
  ...gap(1),
  h2('Aufgabe 4 — Aus dem Wochenende erzählen'),
  p('Schreiben Sie 6–8 Sätze über Ihr letztes Wochenende. Benutzen Sie mindestens 4 verschiedene Verben im Perfekt — sowohl mit haben als auch mit sein.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Perfekt'),
  grammarBox([
    'Wichtige unregelmäßige Verben — Partizip II:',
    'sein → gewesen   |  haben → gehabt   |  werden → geworden',
    'gehen → gegangen |  fahren → gefahren |  kommen → gekommen',
    'sehen → gesehen  |  essen → gegessen |  trinken → getrunken',
    'lesen → gelesen  |  schreiben → geschrieben',
    'sprechen → gesprochen | nehmen → genommen',
    'finden → gefunden | bringen → gebracht',
    'fliegen → geflogen | bleiben → geblieben',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Tagesablauf'),
  p('a) Gestern Morgen bin ich um 7 Uhr aufgestanden und habe gefrühstückt.'),
  p('b) Vormittags habe ich im Büro gearbeitet und viele E-Mails geschrieben.'),
  p('c) Mittags habe ich mit Kollegen in der Kantine gegessen.'),
  p('d) Am Nachmittag habe ich Sport gemacht und bin im Park gelaufen.'),
  p('e) Abends habe ich mit meiner Familie telefoniert und einen Film gesehen.'),
  ...gap(1),
  h2('Aufgabe 2 — Perfekt-Sätze'),
  p('a) Ich habe einen Brief geschrieben.'),
  p('b) Wir sind gestern nach Wien gefahren. (sein: Bewegung)'),
  p('c) Sie hat einen Kuchen gebacken.'),
  p('d) Er hat das Auto gewaschen.'),
  p('e) Ihr seid ins Kino gegangen. (sein: Bewegung)'),
  p('f) Ich habe schon das Buch gelesen.'),
  ...gap(1),
  h2('Aufgabe 3 — haben / sein'),
  p('a) habe   (schlafen → haben, kein Bewegung)'),
  p('b) sind   (aufstehen → sein, Zustandsänderung)'),
  p('c) hat    (sehen → haben)'),
  p('d) ist    (fahren → sein, Bewegung)'),
  p('e) bist   (ankommen → sein, Bewegung)'),
  p('f) habt   (lernen → haben)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Mindestens 6 Sätze, alle im Perfekt'),
  bullet('Mindestens 2 sein-Verben (z. B. gefahren, gegangen, gekommen)'),
  bullet('Partizip II korrekt am Satzende'),
  bullet('Mindestens 1 trennbares Verb (eingekauft, aufgestanden, angefangen)'),
  bullet('Klarer Bezug zur Vergangenheit (Wochenende, gestern, letztes …)'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Perfekt — Leseübung'),
  h2('Text: Davids verrückter Sonntag'),
  p('Letzten Sonntag hat David einen wirklich verrückten Tag erlebt. Er ist um 5 Uhr morgens aufgewacht — viel zu früh! Sein Wecker hat geklingelt, obwohl er ihn am Abend gar nicht gestellt hatte. „Wahrscheinlich habe ich aus Versehen einen Knopf gedrückt", hat er später gedacht.'),
  p('Da er nicht mehr einschlafen konnte, ist David um 6 Uhr aufgestanden und hat einen Kaffee gekocht. Dann hat er beschlossen, einen langen Spaziergang zu machen. Er hat seinen Hund Bruno mitgenommen — Bruno war total aufgeregt. Im Park haben sie einen Mann getroffen, der seine Schlüssel verloren hatte. David hat ihm geholfen, die Schlüssel im Gras zu finden — der Mann war so dankbar, dass er David zum Frühstück eingeladen hat!'),
  p('Beim Frühstück haben sie sich lange unterhalten. Der Mann heißt Karl und ist Architekt. Er hat David erzählt, dass er gerade ein Haus in der Nähe baut und einen Helfer für Gartenarbeit sucht. „Hast du Interesse?", hat Karl gefragt. David, der seit Wochen einen Nebenjob suchte, hat sofort zugesagt.'),
  p('Am Nachmittag ist David nach Hause gefahren und hat seiner Frau alles erzählt. Sie hat zuerst gelacht: „So fängt jeder Krimi an!" Aber sie hat sich auch sehr gefreut. Am Abend haben sie zusammen italienisch gekocht — Davids berühmte Pasta — und einen Film geschaut. Vor dem Schlafengehen hat David noch einmal zu seinem Wecker geschaut: Er war ausgeschaltet. „Komisch", hat er gedacht. „Aber dieser kaputte Wecker hat mein Leben vielleicht verändert."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Davids Wecker hat um 5 Uhr morgens geklingelt.', ''],
      ['David ist sofort wieder eingeschlafen.', ''],
      ['Davids Hund heißt Karl.', ''],
      ['Im Park hat David einen Mann getroffen, der Schlüssel verloren hatte.', ''],
      ['Karl ist Architekt und sucht einen Helfer für Gartenarbeit.', ''],
      ['Davids Frau war sauer, als er ihr alles erzählt hat.', ''],
      ['Am Abend haben David und seine Frau zusammen gekocht.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Verben aus dem Text finden'),
  p('Suche im Text 8 Verben im Perfekt und schreibe sie auf — mit Hilfsverb (haben/sein) und Partizip II.'),
  stdTable(
    ['Hilfsverb', 'Partizip II', 'Infinitiv'],
    [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']],
    [3500, 4500, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Fragen zum Text'),
  p('a) Wann ist David aufgewacht und warum?'),
  wLine(),
  p('b) Wen hat David im Park getroffen?', { before: 120 }),
  wLine(),
  p('c) Was hat Karl David angeboten?', { before: 120 }),
  wLine(),
  p('d) Was haben David und seine Frau am Abend gemacht?', { before: 120 }),
  wLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Perfekt'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Davids Wecker hat um 5 Uhr morgens geklingelt.', 'R'],
      ['David ist sofort wieder eingeschlafen.', 'F (er konnte nicht mehr einschlafen)'],
      ['Davids Hund heißt Karl.', 'F (Bruno; Karl ist der Mann)'],
      ['Im Park hat David einen Mann getroffen, der Schlüssel verloren hatte.', 'R'],
      ['Karl ist Architekt und sucht einen Helfer für Gartenarbeit.', 'R'],
      ['Davids Frau war sauer, als er ihr alles erzählt hat.', 'F (sie hat gelacht und sich gefreut)'],
      ['Am Abend haben David und seine Frau zusammen gekocht.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Verben (Auswahl)'),
  stdTable(
    ['Hilfsverb', 'Partizip II', 'Infinitiv'],
    [
      ['hat', 'erlebt', 'erleben'],
      ['ist', 'aufgewacht', 'aufwachen'],
      ['hat', 'geklingelt', 'klingeln'],
      ['ist', 'aufgestanden', 'aufstehen'],
      ['hat', 'gekocht', 'kochen'],
      ['hat', 'mitgenommen', 'mitnehmen'],
      ['haben', 'getroffen', 'treffen'],
      ['hat', 'eingeladen', 'einladen'],
    ],
    [3500, 4500, 3706]
  ),
  p('Hinweis: Auch andere korrekte Verben aus dem Text sind möglich (gefragt, zugesagt, gefahren, erzählt, gefreut, gekocht, geschaut).', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösungen'),
  p('a) David ist um 5 Uhr morgens aufgewacht — sein Wecker hat geklingelt, obwohl er ihn nicht gestellt hatte.'),
  p('b) Er hat einen Mann namens Karl getroffen, der seine Schlüssel verloren hatte.'),
  p('c) Karl hat David einen Nebenjob als Helfer für Gartenarbeit angeboten.'),
  p('d) Sie haben zusammen italienisch gekocht und einen Film angeschaut.'),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Perfekt — Lückentext'),
  h2('Aufgabe 1 — Verben im Perfekt einsetzen'),
  p('Setze die Verben in Klammern ins Perfekt.'),
  p('a) Letztes Wochenende ________ wir nach Berlin ________ . (fahren)'),
  p('b) Ich ________ einen tollen Film ________ . (sehen)'),
  p('c) Sie ________ den ganzen Tag im Garten ________ . (arbeiten)'),
  p('d) Wir ________ im Restaurant Pizza ________ . (essen)'),
  p('e) Mein Bruder ________ um Mitternacht ________ . (ankommen — trennb.)'),
  p('f) Ihr ________ schon Hausaufgaben ________ ? (machen)'),
  p('g) Die Kinder ________ im Park ________ . (spielen)'),
  p('h) Du ________ den Bus ________ . (verpassen)'),
  ...gap(1),
  h2('Aufgabe 2 — Hilfsverb wählen (haben/sein)'),
  p('Wähle das richtige Hilfsverb.'),
  p('a) Ich ________ ( habe / bin ) gestern eine SMS bekommen.'),
  p('b) Wir ________ ( haben / sind ) ins Schwimmbad gegangen.'),
  p('c) Sie ________ ( hat / ist ) einen Kaffee getrunken.'),
  p('d) Er ________ ( hat / ist ) einen Brief geschrieben.'),
  p('e) Ihr ________ ( habt / seid ) zu spät aufgestanden.'),
  p('f) Du ________ ( hast / bist ) im Sommer in Spanien gewesen.'),
  p('g) Sie ________ ( hat / ist ) sehr früh eingeschlafen.'),
  p('h) Wir ________ ( haben / sind ) das Geschenk vergessen.'),
  ...gap(1),
  h2('Aufgabe 3 — Tagesablauf-Text mit Lücken'),
  infoBox(['Verben für die Lücken: aufgestanden | gefrühstückt | gefahren | gearbeitet | gegessen | gegangen | gesehen | geschlafen']),
  ...gap(1),
  p('Maja erzählt: „Heute bin ich um 6 Uhr ________. Ich habe schnell ________, dann bin ich mit dem Bus zur Arbeit ________. Ich habe bis 17 Uhr ________ — es war ein langer Tag. In der Mittagspause habe ich mit Kollegen ________. Nach der Arbeit bin ich noch kurz ins Kino ________ — ich habe einen tollen Film ________. Um 23 Uhr bin ich endlich ins Bett gegangen und habe gut ________."'),
  ...gap(1),
  h2('Aufgabe 4 — Trennbare Verben im Perfekt'),
  ruleBox([
    'Trennbare Verben — Perfekt:',
    'Vorsilbe + ge + Verbstamm + (t/en)',
    'auf|stehen → aufgestanden',
    'an|rufen → angerufen',
    'ein|kaufen → eingekauft',
    'mit|kommen → mitgekommen',
    'aus|machen → ausgemacht',
    '',
    'Untrennbare Verben (be-, ge-, er-, ver-, zer-, ent-, emp-): kein „ge"!',
    'bezahlen → bezahlt | verstehen → verstanden | erklären → erklärt',
  ]),
  ...gap(1),
  p('Bilde das Partizip II.'),
  stdTable(
    ['Infinitiv', 'Partizip II'],
    [
      ['einkaufen', '________'],
      ['anrufen', '________'],
      ['mitnehmen', '________'],
      ['aufmachen', '________'],
      ['bezahlen', '________'],
      ['verstehen', '________'],
      ['erklären', '________'],
      ['besuchen', '________'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Perfekt'),
  h2('Aufgabe 1 — Verben im Perfekt'),
  p('a) sind … gefahren  (sein: Bewegung)'),
  p('b) habe … gesehen'),
  p('c) hat … gearbeitet'),
  p('d) haben … gegessen'),
  p('e) ist … angekommen  (sein: Bewegung; trennb.)'),
  p('f) habt … gemacht'),
  p('g) haben … gespielt'),
  p('h) hast … verpasst  (untrennb. → kein „ge"!)'),
  ...gap(1),
  h2('Aufgabe 2 — Hilfsverb'),
  p('a) habe   b) sind   c) hat   d) hat   e) seid   f) bist   g) ist   h) haben'),
  ...gap(1),
  h2('Aufgabe 3 — Tagesablauf'),
  p('1. aufgestanden  2. gefrühstückt  3. gefahren  4. gearbeitet'),
  p('5. gegessen  6. gegangen  7. gesehen  8. geschlafen'),
  ...gap(1),
  h2('Aufgabe 4 — Partizip II'),
  stdTable(
    ['Infinitiv', 'Partizip II'],
    [
      ['einkaufen', 'eingekauft'],
      ['anrufen', 'angerufen'],
      ['mitnehmen', 'mitgenommen'],
      ['aufmachen', 'aufgemacht'],
      ['bezahlen', 'bezahlt  (untrennb. — kein ge!)'],
      ['verstehen', 'verstanden  (untrennb.)'],
      ['erklären', 'erklärt  (untrennb.)'],
      ['besuchen', 'besucht  (untrennb.)'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Perfekt — Wortliste'),
  h2('Teil A — Wichtige unregelmäßige Verben (Auswahl)'),
  stdTable(
    ['Infinitiv', 'Hilfsverb', 'Partizip II'],
    [
      ['sein', 'sein', 'gewesen'],
      ['haben', 'haben', 'gehabt'],
      ['werden', 'sein', 'geworden'],
      ['gehen', 'sein', 'gegangen'],
      ['fahren', 'sein', 'gefahren'],
      ['kommen', 'sein', 'gekommen'],
      ['bleiben', 'sein', 'geblieben'],
      ['fliegen', 'sein', 'geflogen'],
      ['sehen', 'haben', 'gesehen'],
      ['lesen', 'haben', 'gelesen'],
      ['essen', 'haben', 'gegessen'],
      ['trinken', 'haben', 'getrunken'],
      ['schreiben', 'haben', 'geschrieben'],
      ['sprechen', 'haben', 'gesprochen'],
      ['nehmen', 'haben', 'genommen'],
      ['geben', 'haben', 'gegeben'],
    ],
    [4500, 2500, 4706]
  ),
  ...gap(1),
  h2('Teil B — Trennbare und untrennbare Verben'),
  stdTable(
    ['Infinitiv', 'Partizip II', 'Beispielsatz'],
    [
      ['aufstehen (trennb.)', 'aufgestanden', 'Ich bin um 6 Uhr aufgestanden.'],
      ['anrufen (trennb.)', 'angerufen', 'Ich habe meine Mutter angerufen.'],
      ['einkaufen (trennb.)', 'eingekauft', 'Wir haben eingekauft.'],
      ['mitkommen (trennb.)', 'mitgekommen', 'Sie ist mitgekommen.'],
      ['ankommen (trennb.)', 'angekommen', 'Der Zug ist angekommen.'],
      ['bezahlen (untrennb.)', 'bezahlt', 'Ich habe die Rechnung bezahlt.'],
      ['besuchen (untrennb.)', 'besucht', 'Wir haben Oma besucht.'],
      ['verstehen (untrennb.)', 'verstanden', 'Hast du das verstanden?'],
      ['vergessen (untrennb.)', 'vergessen', 'Ich habe das Buch vergessen.'],
      ['erzählen (untrennb.)', 'erzählt', 'Sie hat eine Geschichte erzählt.'],
    ],
    [3800, 2500, 5406]
  ),
  ...gap(1),
  ruleBox([
    'Faustregeln Perfekt — Zusammenfassung:',
    '1. ge + Verbstamm + t  → regelmäßig (gemacht, gelernt, gespielt)',
    '2. ge + Verbstamm + en → unregelmäßig (gegangen, gesehen, gegessen)',
    '3. trennbar: ge zwischen Vorsilbe und Stamm (auf-ge-standen, ein-ge-kauft)',
    '4. untrennbar (be-/ge-/er-/ver-/zer-/ent-/emp-): KEIN ge! (bezahlt, verstanden)',
    '5. -ieren-Verben: kein ge (studiert, telefoniert, fotografiert)',
    '6. sein bei Bewegung/Zustandsänderung (gegangen, aufgestanden, geworden)',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('Ich bin gegangen: ___________  |  Ich habe gegessen: ___________'),
  p('Ich habe geschlafen: ___________  |  Ich bin angekommen: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Perfekt'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Häufige Fehler vermeiden:',
    '✘ ich habe gegangen → ✓ ich BIN gegangen (Bewegung!)',
    '✘ ich bin geschlafen → ✓ ich HABE geschlafen (kein Bewegungsverb)',
    '✘ ich habe verstandet → ✓ ich habe verstanden (unregelm.)',
    '✘ ich habe getelefoniert → ✓ ich habe telefoniert (-ieren ohne ge!)',
    '✘ er hat aufgestanden → ✓ er IST aufgestanden (Zustandsänderung)',
  ]),
  ...gap(1),
  h2('Sätze zum Üben'),
  p('Ich bin um 7 Uhr aufgestanden, habe gefrühstückt und bin dann zur Arbeit gefahren.'),
  p('Wir haben gestern einen Film gesehen, etwas getrunken und sind spät ins Bett gegangen.'),
  p('Sie hat ihre Familie besucht und drei Tage bei ihren Eltern geblieben.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Perfekt — Konversation'),
  h2('Aufgabe 1 — Dialog: Was hast du gemacht?'),
  p('Zwei Personen unterhalten sich über das Wochenende. Ergänzt den Dialog.'),
  infoBox([
    'Frage stellen: Was hast du gemacht? / Wo bist du gewesen? / Wann …?',
    'Erzählen: Ich bin / habe … / Letzten Samstag …',
    'Reaktion: Wirklich? / Echt? / Das klingt toll! / Wie war das?',
    'Weiterführen: Und dann …? / Was hast du danach gemacht?',
  ]),
  ...gap(1),
  p('A: „Hallo! Was ________ du am Wochenende ________?"'),
  p('B: „Ich ________ am Samstag in die Stadt ________ und ________ etwas ________."'),
  p('A: „Wirklich? Was ________ du ________?"'),
  p('B: „Ich ________ neue Schuhe und ein Buch ________. Und du?"'),
  p('A: „Ich ________ zu Hause ________ — ich war krank. Aber ich ________ einen tollen Film ________."'),
  p('B: „Welchen Film ________ du ________?"'),
  p('A: „________________________ — der war wirklich gut."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Vom letzten Urlaub erzählen'),
  stdTable(
    ['Person A — fragt', 'Person B — erzählt'],
    [
      ['Wo bist du gewesen?', 'Land, Stadt, Hotel'],
      ['Wann bist du angekommen / abgereist?', 'Daten, Dauer'],
      ['Was hast du dort gemacht?', '3 Aktivitäten erzählen'],
      ['Was hast du gegessen?', 'Spezialitäten beschreiben'],
      ['Wie war das Wetter?', 'Temperatur, Phänomene'],
      ['Was hast du erlebt?', 'eine Anekdote im Perfekt'],
    ],
    [4500, 7206]
  ),
  ruleBox([
    'Tipps für die Erzählung:',
    'Bewegung: Ich bin nach … geflogen / gefahren / gekommen.',
    'Aktivitäten: Ich habe … besucht / gesehen / gegessen / probiert.',
    'Erlebnisse: Ich bin … gegangen / habe … kennengelernt / habe getanzt.',
    'Wetter: Es hat geregnet / Es hat geschneit / Die Sonne hat geschienen.',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Erinnerungen'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wo sind Sie geboren? Wo sind Sie aufgewachsen?', ''],
      ['Wann haben Sie Deutsch zu lernen begonnen?', ''],
      ['Welche Stadt in Deutschland haben Sie schon besucht?', ''],
      ['Was haben Sie als Kind besonders gerne gemacht?', ''],
      ['Was haben Sie gestern gegessen / gemacht / erlebt?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Was bin ich gestern gewesen?"'),
  p('Eine Person beschreibt 3 Aktivitäten von gestern (im Perfekt) — eine davon ist erfunden! Die anderen müssen raten, welche nicht stimmt.'),
  infoBox([
    'Beispiele:',
    '1. Gestern habe ich Pasta gekocht.',
    '2. Ich bin um 6 Uhr aufgestanden.',
    '3. Ich habe einen Politiker getroffen.',
    'Welche ist die Lüge? Lasst die Gruppe raten!',
    'Ziel: Üben von haben/sein + Partizip II in spielerischer Form.',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Perfekt'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Mindestens 5 Verben im Perfekt verwendet'),
  bullet('haben und sein korrekt unterschieden'),
  bullet('Partizip II am Satzende'),
  bullet('Natürlicher Gesprächsfluss mit Reaktionen'),
  bullet('Mindestens 1 trennbares Verb (eingekauft, ausgegangen, …)'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Hallo! Was hast du am Wochenende gemacht?"'),
  p('B: „Ich bin am Samstag in die Stadt gegangen und habe etwas eingekauft."'),
  p('A: „Wirklich? Was hast du gekauft?"'),
  p('B: „Ich habe neue Schuhe und ein Buch gekauft. Und du?"'),
  p('A: „Ich bin zu Hause geblieben — ich war krank. Aber ich habe einen tollen Film gesehen."'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Urlaubserzählung'),
  bullet('Land/Stadt + Hotel im Perfekt erwähnt'),
  bullet('Bewegungs-Verben mit sein (geflogen, gefahren, gekommen)'),
  bullet('Aktivitäten mit haben (besucht, gesehen, gegessen)'),
  bullet('Mindestens eine kleine Anekdote im Perfekt'),
  bullet('Weather: Es hat geregnet/geschneit; die Sonne hat geschienen'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: korrekte haben/sein-Wahl, Partizip II in der richtigen Form, Wortstellung mit Partizip am Ende.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Perfekt — Bildaufgaben'),
  h2('Aufgabe 1 — Tagesablauf-Bilder beschreiben'),
  p('[BILD 1: Sechs Bilder eines Tagesablaufs: (1) Person wacht auf (Wecker klingelt), (2) Person frühstückt am Tisch, (3) Person geht ins Büro/zur Arbeit, (4) Person arbeitet am Computer, (5) Person isst zu Mittag, (6) Person geht ins Bett]'),
  p('a) Schreibe zu jedem Bild einen Satz im Perfekt.'),
  stdTable(
    ['Bild', 'Satz im Perfekt'],
    [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', '']],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Familienfoto vom Urlaub'),
  p('[BILD 2: Familienfoto am Strand mit fünf Personen — Eltern und drei Kindern. Sandburgen im Vordergrund, Meer im Hintergrund, alle lachen und tragen Sommerkleidung.]'),
  p('a) Beschreibe in 4–5 Sätzen, was die Familie wahrscheinlich gemacht hat. Benutze Perfekt.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Reiseblog mit Bildern'),
  p('[BILD 3: Drei Reisefotos einer Person: (1) am Brandenburger Tor in Berlin, (2) auf einem Boot in Hamburg, (3) im Englischen Garten in München]'),
  p('a) Schreibe einen kurzen Reiseblog (5–6 Sätze): Wo ist die Person gewesen? Was hat sie gemacht?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Verben aus Bildern erkennen'),
  p('[BILD 4: Sechs Aktionsbilder: (1) jemand kocht in der Küche, (2) jemand fährt Fahrrad, (3) jemand telefoniert, (4) jemand schreibt am Schreibtisch, (5) jemand kauft im Supermarkt ein, (6) jemand tanzt auf einer Party]'),
  p('a) Welches Verb passt? Schreibe den Infinitiv und das Partizip II.'),
  stdTable(
    ['Bild', 'Infinitiv', 'Partizip II', 'Hilfsverb (haben/sein)'],
    [
      ['1', '', '', ''],
      ['2', '', '', ''],
      ['3', '', '', ''],
      ['4', '', '', ''],
      ['5', '', '', ''],
      ['6', '', '', ''],
    ],
    [1200, 3500, 3500, 3506]
  ),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Perfekt'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Tagesablauf'),
  stdTable(
    ['Bild', 'Beispielsatz'],
    [
      ['1', 'Sie ist um 6 Uhr aufgewacht.'],
      ['2', 'Sie hat gefrühstückt — Brot mit Marmelade und Kaffee.'],
      ['3', 'Sie ist mit dem Bus zur Arbeit gefahren.'],
      ['4', 'Sie hat den ganzen Vormittag am Computer gearbeitet.'],
      ['5', 'Mittags hat sie in der Kantine gegessen.'],
      ['6', 'Abends ist sie früh ins Bett gegangen.'],
    ],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Familienfoto'),
  p('Beispiel: Die Familie ist in den Sommerferien an die Nordsee gefahren. Sie hat zwei Wochen am Meer verbracht. Die Kinder haben Sandburgen gebaut und sind im Meer geschwommen. Die Eltern haben sich in der Sonne ausgeruht und Bücher gelesen. Abends haben sie zusammen Eis gegessen.'),
  ...gap(1),
  h2('Aufgabe 3 — Reiseblog'),
  p('Beispiel: Letzte Woche bin ich auf eine Deutschland-Reise gegangen. Zuerst bin ich nach Berlin geflogen und habe das Brandenburger Tor besucht. Dann bin ich mit dem Zug nach Hamburg gefahren und habe eine Hafenrundfahrt gemacht. Als Letztes bin ich nach München gekommen und habe den Englischen Garten besichtigt. Es hat mir sehr gut gefallen — ich habe viele Fotos gemacht und neue Leute kennengelernt!'),
  ...gap(1),
  h2('Aufgabe 4 — Verben'),
  stdTable(
    ['Bild', 'Infinitiv', 'Partizip II', 'Hilfsverb'],
    [
      ['1', 'kochen', 'gekocht', 'haben'],
      ['2', 'Fahrrad fahren', 'Fahrrad gefahren', 'sein (Bewegung)'],
      ['3', 'telefonieren', 'telefoniert', 'haben (-ieren ohne ge!)'],
      ['4', 'schreiben', 'geschrieben', 'haben'],
      ['5', 'einkaufen', 'eingekauft', 'haben (trennb.)'],
      ['6', 'tanzen', 'getanzt', 'haben (kein klares Bewegungsziel)'],
    ],
    [1200, 3500, 3500, 3506]
  ),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
