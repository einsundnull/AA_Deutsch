// A2_Erwachsene — Thema 11 UP 03: Dativ
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Dativ';
const HEADING = 'Thema 11 — Grammatik A2 Erwachsene';
const SUBHEAD = 'UP 03: Dativ';
const PREFIX  = 'A2_Erwachsene_Grammatik_03_Dativ';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '11_Grammatik', '03_Dativ');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 03`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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
  h1('Dativ — Schreibübung'),
  ruleBox([
    'DATIV — Übersicht:',
    'Frage:  Wem? (Personen) / Was? (Sachen)',
    '',
    'Artikel im Dativ:',
    '          mask.    fem.    neutr.   Plural',
    'bestimmt: dem      der     dem      den + n',
    'unbest.:  einem    einer   einem    keinen + n',
    '',
    'Personalpronomen Dativ:',
    'ich → mir   du → dir   er → ihm   sie → ihr   es → ihm',
    'wir → uns   ihr → euch   sie/Sie → ihnen / Ihnen',
    '',
    'Wann Dativ?',
    '1. Indirektes Objekt (Wem? — geben, schenken, helfen)',
    '2. Nach Dativpräpositionen (mit, bei, von, zu, nach, aus, seit, gegenüber)',
    '3. Nach Dativ-Verben (helfen, danken, gehören, gefallen, …)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Dativ-Verben'),
  ruleBox([
    'Wichtige Dativ-Verben (immer mit Dativ!):',
    'helfen + Dat.:    Ich helfe meiner Mutter.',
    'danken + Dat.:    Ich danke dir.',
    'gehören + Dat.:   Das Buch gehört mir.',
    'gefallen + Dat.:  Das Bild gefällt mir.',
    'antworten + Dat.: Er antwortet seinem Chef.',
    'glauben + Dat.:   Ich glaube dir.',
    'passen + Dat.:    Der Termin passt mir.',
    'schmecken + Dat.: Das Essen schmeckt mir.',
  ]),
  ...gap(1),
  p('Bilde Sätze mit den Dativ-Verben.'),
  p('a) helfen / die Schwester / ich → '),
  wLine(),
  p('b) gefallen / das neue Auto / mein Freund → ', { before: 120 }),
  wLine(),
  p('c) gehören / dieses Buch / die Lehrerin → ', { before: 120 }),
  wLine(),
  p('d) schmecken / der Kuchen / die Kinder (Pl.) → ', { before: 120 }),
  wLine(),
  p('e) antworten / er / die Frage → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Geben, schenken, schicken (Dativ + Akkusativ)'),
  ruleBox([
    'Verben mit zwei Objekten — Reihenfolge:',
    'Wenn beides ein Nomen: Dativ VOR Akkusativ',
    '  Ich gebe meiner Mutter (Dat.) das Geschenk (Akk.).',
    'Wenn ein Pronomen dabei ist: Pronomen ZUERST',
    '  Ich gebe es (Akk. Pron.) meiner Mutter (Dat.).',
    '  Ich gebe ihr (Dat. Pron.) das Geschenk (Akk.).',
    'Wenn beides Pronomen: Akkusativ VOR Dativ',
    '  Ich gebe es ihr.',
  ]),
  ...gap(1),
  p('Schreibe die Sätze mit Dativ + Akkusativ.'),
  p('a) Ich schenke (mein Bruder) (ein Buch). → '),
  wLine(),
  p('b) Sie schickt (ihre Mutter) (eine Postkarte). → ', { before: 120 }),
  wLine(),
  p('c) Wir geben (die Lehrerin) (die Hausaufgaben). → ', { before: 120 }),
  wLine(),
  p('d) Er erklärt (sein Sohn) (das Spiel). → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Dativpräpositionen'),
  ruleBox([
    'Präpositionen IMMER mit Dativ:',
    'mit:        mit dem Bus / mit meinem Freund',
    'bei:        bei der Arbeit / bei mir zu Hause',
    'von:        von meiner Tante / vom Chef (von dem)',
    'zu:         zu meinem Bruder / zur Schule (zu der)',
    'nach:       nach Hause / nach dem Essen',
    'aus:        aus dem Haus / aus Polen',
    'seit:       seit drei Jahren / seit dem Sommer',
    'gegenüber:  gegenüber von der Bank',
    'außer:      außer mir und dir',
  ]),
  ...gap(1),
  p('Ergänze die richtige Dativform.'),
  p('a) Ich fahre mit ________ Bus zur Arbeit. (der)'),
  p('b) Wir wohnen seit ________ Jahr in Hamburg. (ein)'),
  p('c) Sie kommt aus ________ Türkei. (die)'),
  p('d) Wir treffen uns bei ________ Eltern. (meine, Pl.)'),
  p('e) Nach ________ Frühstück gehe ich zur Arbeit. (das)'),
  p('f) Das Geschenk ist von ________ Tante. (meine)'),
  ...gap(1),
  h2('Aufgabe 4 — Eine Geschichte schreiben'),
  p('Schreiben Sie 6–7 Sätze: „Ein typischer Sonntag bei mir". Benutzen Sie mindestens 5 Dativ-Konstruktionen (Dativ-Verben, Dativ-Präpositionen, indirektes Objekt).'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Dativ'),
  grammarBox([
    'Dativ erkennen — Schnellcheck:',
    '1. Frage „Wem?" stellen — passt die Antwort?',
    '2. Steht eine Dativ-Präposition davor (mit/bei/von/zu/nach/aus/seit)?',
    '3. Ist das Verb ein Dativ-Verb (helfen/danken/gehören/gefallen)?',
    '4. Hat der Satz ein indirektes Objekt (Wem? gebe ich was?)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Dativ-Verben'),
  p('a) Ich helfe der Schwester.  (fem. Dat.: der)'),
  p('b) Das neue Auto gefällt meinem Freund.  (mask. Dat.: -em)'),
  p('c) Dieses Buch gehört der Lehrerin.  (fem. Dat.: der)'),
  p('d) Der Kuchen schmeckt den Kindern.  (Pl. Dat.: -n!)'),
  p('e) Er antwortet der Frage.  (fem. Dat.: der)'),
  ...gap(1),
  h2('Aufgabe 2 — Dativ + Akkusativ'),
  p('a) Ich schenke meinem Bruder ein Buch.  (mask. Dat. + neutr. Akk.)'),
  p('b) Sie schickt ihrer Mutter eine Postkarte.  (fem. Dat. + fem. Akk.)'),
  p('c) Wir geben der Lehrerin die Hausaufgaben.  (fem. Dat. + fem. Akk.)'),
  p('d) Er erklärt seinem Sohn das Spiel.  (mask. Dat. + neutr. Akk.)'),
  ...gap(1),
  h2('Aufgabe 3 — Dativpräpositionen'),
  p('a) mit dem Bus  (mask.)'),
  p('b) seit einem Jahr  (neutr.)'),
  p('c) aus der Türkei  (fem.)'),
  p('d) bei meinen Eltern  (Pl. + n!)'),
  p('e) Nach dem Frühstück  (neutr.)'),
  p('f) von meiner Tante  (fem.)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Sonntags-Text'),
  bullet('Mindestens 5 Dativ-Konstruktionen'),
  bullet('Dativ-Verb mind. 1× (helfen / gefallen / schmecken …)'),
  bullet('Dativ-Präposition mind. 2× (mit / bei / nach / zu)'),
  bullet('Indirektes Objekt mind. 1× (geben/schicken/erklären)'),
  bullet('Korrekte Dativ-Endungen (-em / -er / -en + n im Plural)'),
  ...gap(1),
  p('Beispiel: Sonntags stehe ich spät auf und frühstücke mit meinem Mann (Dat.). Nach dem Frühstück (Dat.) gehen wir zu meiner Mutter (Dat.) — sie wohnt nur 5 Minuten von uns entfernt. Wir helfen ihr (Dat. Pron.) im Garten, weil sie schon 75 Jahre alt ist. Mittags isst sie immer mit uns (Dat.) — und ihr Essen schmeckt uns (Dat.) immer fantastisch! Nachmittags spiele ich mit meinen Kindern (Pl. Dat.) im Park.'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Dativ — Leseübung'),
  h2('Text: Adams Geburtstag'),
  p('Letzten Samstag hatte Adam Geburtstag — er wurde 30. Seine Familie und seine Freunde haben für ihn eine wunderbare Überraschung organisiert. Hier erzählt Adam, wie der Tag verlief:'),
  p('„Am Morgen hat mir meine Frau Anna mit einem Kuss gratuliert. Sie hat mir das Frühstück ans Bett gebracht — Pancakes mit Sirup, Kaffee und Orangensaft. Es hat mir wirklich gut geschmeckt!"'),
  p('„Dann hat meine Mutter aus Polen angerufen. Sie hat mit mir lange am Telefon gesprochen und mir ein Lied vorgesungen — wie immer an meinem Geburtstag. Auch mein Bruder hat mir geschrieben — er konnte nicht kommen, weil er weit weg in Wien wohnt."'),
  p('„Am Nachmittag hat mir Anna gesagt, dass wir zu ihren Eltern fahren. Aber als wir aus dem Auto stiegen, sah ich, dass mindestens 20 Autos vor dem Haus parkten. Es war eine Überraschungsparty! Alle meine Freunde standen im Garten und riefen: Herzlichen Glückwunsch!"'),
  p('„Mein bester Freund Tomas hat mir ein selbstgebautes Vogelhaus geschenkt — er weiß, dass ich Vögel liebe. Mein Schwiegervater hat mir eine Flasche Wein aus seinem Lieblingsweingut gegeben. Und meine Schwiegermutter hat für mich einen riesigen Schokoladenkuchen gebacken — der hat allen geschmeckt!"'),
  p('„Am Abend habe ich mit Anna und einigen Freunden im Garten getanzt. Ich habe ihnen allen gedankt: Ihr seid die besten — das vergesse ich euch nie! Dieser Tag wird mir immer im Gedächtnis bleiben."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Adam wurde an seinem Geburtstag 30 Jahre alt.', ''],
      ['Anna hat ihm das Frühstück ans Bett gebracht.', ''],
      ['Adams Bruder hat ihn besucht.', ''],
      ['Es war eine Überraschungsparty bei Annas Eltern.', ''],
      ['Tomas hat Adam ein gekauftes Geschenk gegeben.', ''],
      ['Schwiegermutter hat einen Schokoladenkuchen gebacken.', ''],
      ['Adam hat sich bei seinen Freunden bedankt.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Dativ-Konstruktionen finden'),
  p('Suche im Text 6 Dativ-Konstruktionen und schreibe sie auf — mit Hinweis: Dativ-Verb, Dativ-Präposition oder indirektes Objekt.'),
  stdTable(
    ['Dativ-Konstruktion (Beispiel aus Text)', 'Typ'],
    [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
    [7000, 4706]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Fragen zum Text'),
  p('a) Was hat Anna Adam zum Frühstück gebracht?'),
  wLine(),
  p('b) Wer hat angerufen und was hat sie gemacht?', { before: 120 }),
  wLine(), wLine(),
  p('c) Welche Geschenke hat Adam von wem bekommen?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was hat Adam am Ende seinen Freunden gesagt?', { before: 120 }),
  wLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Dativ'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Adam wurde an seinem Geburtstag 30 Jahre alt.', 'R'],
      ['Anna hat ihm das Frühstück ans Bett gebracht.', 'R'],
      ['Adams Bruder hat ihn besucht.', 'F (er wohnt in Wien — hat geschrieben)'],
      ['Es war eine Überraschungsparty bei Annas Eltern.', 'R'],
      ['Tomas hat Adam ein gekauftes Geschenk gegeben.', 'F (selbstgebautes Vogelhaus)'],
      ['Schwiegermutter hat einen Schokoladenkuchen gebacken.', 'R'],
      ['Adam hat sich bei seinen Freunden bedankt.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Dativ-Konstruktionen (Beispiele)'),
  stdTable(
    ['Dativ-Konstruktion', 'Typ'],
    [
      ['mir mit einem Kuss', 'indirektes Objekt + Präp. mit'],
      ['mir das Frühstück gebracht', 'indirektes Objekt'],
      ['mit mir gesprochen', 'Dativ-Präposition mit'],
      ['mir ein Lied vorgesungen', 'indirektes Objekt'],
      ['aus dem Auto', 'Dativ-Präposition aus'],
      ['das Vogelhaus geschenkt (mir)', 'indirektes Objekt'],
      ['allen geschmeckt', 'Dativ-Verb (schmecken)'],
      ['ihnen gedankt', 'Dativ-Verb (danken)'],
    ],
    [7000, 4706]
  ),
  p('Hinweis: Auch andere korrekte Dativ-Konstruktionen aus dem Text akzeptieren.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösungen'),
  p('a) Pancakes mit Sirup, Kaffee und Orangensaft.'),
  p('b) Seine Mutter aus Polen hat angerufen, mit ihm gesprochen und ihm ein Lied vorgesungen.'),
  p('c) Vom besten Freund Tomas: ein selbstgebautes Vogelhaus. Vom Schwiegervater: eine Flasche Wein. Von der Schwiegermutter: ein Schokoladenkuchen.'),
  p('d) „Ihr seid die besten — das vergesse ich euch nie!"'),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Dativ — Lückentext'),
  h2('Aufgabe 1 — Bestimmter Artikel im Dativ'),
  p('Ergänze: dem / der / dem / den (+ n).'),
  p('a) Ich helfe ________ Mutter im Garten. (die)'),
  p('b) Sie wohnt seit zwei Jahren bei ________ Onkel. (der)'),
  p('c) Wir fahren mit ________ Auto in den Urlaub. (das)'),
  p('d) Das Geschenk gehört ________ Kindern. (die — Pl.)'),
  p('e) Ich gebe das Buch ________ Lehrer. (der)'),
  p('f) Nach ________ Konzert gehen wir essen. (das)'),
  ...gap(1),
  h2('Aufgabe 2 — Possessivpronomen im Dativ'),
  p('Ergänze: meinem / meiner / meinen.'),
  p('a) Ich gebe ________ Vater den Brief.'),
  p('b) Sie kommt zu ________ Schwester zum Essen.'),
  p('c) Er fährt mit ________ Eltern in den Urlaub.'),
  p('d) Wir helfen ________ Großmutter im Haushalt.'),
  p('e) Das Auto gehört ________ Onkel.'),
  p('f) Sie schreibt ________ Freundin eine SMS.'),
  ...gap(1),
  h2('Aufgabe 3 — Personalpronomen im Dativ'),
  ruleBox([
    'Personalpronomen Dativ:',
    'ich → mir       wir → uns',
    'du → dir        ihr → euch',
    'er → ihm        sie/Sie → ihnen / Ihnen',
    'sie → ihr',
    'es → ihm',
  ]),
  ...gap(1),
  p('Ersetze die unterstrichenen Wörter durch ein Personalpronomen.'),
  p('a) Ich gebe MEINER MUTTER ein Geschenk. → Ich gebe ________ ein Geschenk.'),
  p('b) Er hilft SEINEM BRUDER. → Er hilft ________.'),
  p('c) Wir antworten DEM LEHRER. → Wir antworten ________.'),
  p('d) Sie schreibt IHREN ELTERN. → Sie schreibt ________.'),
  p('e) Das Geschenk gefällt MIR UND MEINER FRAU. → Das Geschenk gefällt ________.'),
  p('f) Der Termin passt DIR UND DEINEM MANN. → Der Termin passt ________.'),
  ...gap(1),
  h2('Aufgabe 4 — Lückentext: Brief an die Tante'),
  p('Ergänze die Dativformen.'),
  ...gap(1),
  p('Liebe Tante Eva,'),
  p('herzlichen Dank für die Einladung. Ich schreibe ________ (du), um ________ (du) mitzuteilen, dass ich gerne komme. Ich werde mit ________ (mein Mann) und ________ (unser Sohn) bei ________ (du) sein. Ich freue mich besonders auf das Essen — ________ (mein Mann) gefällt deine Küche immer sehr. Bitte sage auch ________ (Onkel Karl), dass wir uns auf ihn freuen.'),
  p('Wir bringen ________ (du) ein kleines Geschenk mit. Vielen Dank schon im Voraus für alles!'),
  p('Liebe Grüße, deine Lara'),
  ...gap(1),
  h2('Aufgabe 5 — Plural Dativ'),
  ruleBox([
    'WICHTIG: Im Plural Dativ bekommt das Nomen ein -n!',
    '(Außer Nomen, die schon auf -n oder -s enden.)',
    'die Kinder → den Kindern',
    'die Frauen → den Frauen (schon -n)',
    'die Männer → den Männern',
    'die Autos → den Autos (Fremdwort -s)',
  ]),
  ...gap(1),
  p('Setze in den Plural Dativ.'),
  p('a) das Kind → mit ________ '),
  p('b) der Freund → bei ________ '),
  p('c) das Buch → in ________ '),
  p('d) die Schwester → mit ________ '),
  p('e) der Tag → seit ________ '),
  p('f) das Foto → von ________ '),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Dativ'),
  h2('Aufgabe 1 — Bestimmter Artikel'),
  p('a) der  b) dem  c) dem  d) den (+ n: Kindern)  e) dem  f) dem'),
  ...gap(1),
  h2('Aufgabe 2 — Possessivpronomen'),
  p('a) meinem  b) meiner  c) meinen (+ n: Eltern)  d) meiner  e) meinem  f) meiner'),
  ...gap(1),
  h2('Aufgabe 3 — Personalpronomen'),
  p('a) ihr  b) ihm  c) ihm  d) ihnen  e) uns  f) euch'),
  ...gap(1),
  h2('Aufgabe 4 — Brief'),
  p('1. dir  2. dir  3. meinem Mann  4. unserem Sohn  5. dir'),
  p('6. meinem Mann  7. Onkel Karl  8. dir'),
  ...gap(1),
  h2('Aufgabe 5 — Plural Dativ'),
  p('a) mit den Kindern (-n!)'),
  p('b) bei den Freunden (-en, da Plural „Freunde" → +n)'),
  p('c) in den Büchern'),
  p('d) mit den Schwestern (-n)'),
  p('e) seit den Tagen (-n)'),
  p('f) von den Fotos (Fremdwort, kein -n!)'),
  grammarBox([
    'Plural-Dativ — die wichtige Regel:',
    'Im Plural Dativ ENDET das Nomen IMMER auf -n,',
    'außer es endet schon auf -n, -nen oder -s.',
    'die Kinder → den Kindern  (Kinder + n)',
    'die Frauen → den Frauen   (schon auf -n)',
    'die Autos  → den Autos    (Fremdwort auf -s)',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Dativ — Wortliste'),
  h2('Teil A — Dativ-Verben (häufige)'),
  stdTable(
    ['Verb', 'Beispielsatz'],
    [
      ['helfen + Dat.', 'Ich helfe meiner Mutter beim Kochen.'],
      ['danken + Dat.', 'Ich danke dir für das Geschenk.'],
      ['gefallen + Dat.', 'Das Bild gefällt mir.'],
      ['gehören + Dat.', 'Das Auto gehört meinem Vater.'],
      ['schmecken + Dat.', 'Der Kuchen schmeckt den Kindern.'],
      ['antworten + Dat.', 'Er antwortet seinem Lehrer.'],
      ['glauben + Dat.', 'Glaubst du mir?'],
      ['passen + Dat.', 'Der Termin passt mir gut.'],
      ['gratulieren + Dat.', 'Ich gratuliere dir zum Geburtstag!'],
      ['begegnen + Dat.', 'Ich bin meinem Chef begegnet.'],
    ],
    [3500, 8206]
  ),
  ...gap(1),
  h2('Teil B — Dativpräpositionen'),
  stdTable(
    ['Präposition', 'Beispielsatz'],
    [
      ['mit', 'Ich fahre mit dem Bus.'],
      ['bei', 'Ich wohne bei meinen Eltern.'],
      ['von', 'Das Geschenk ist von meiner Tante.'],
      ['zu', 'Ich gehe zur Schule. (zu der)'],
      ['nach', 'Nach dem Essen trinke ich Kaffee.'],
      ['aus', 'Ich komme aus der Türkei.'],
      ['seit', 'Ich wohne seit drei Jahren in Berlin.'],
      ['gegenüber', 'Die Bank ist gegenüber von der Post.'],
      ['außer', 'Außer mir kommt niemand.'],
    ],
    [3000, 8706]
  ),
  ...gap(1),
  h2('Teil C — Dativ-Personalpronomen'),
  stdTable(
    ['Nominativ', 'Dativ', 'Beispielsatz'],
    [
      ['ich', 'mir', 'Das gefällt mir.'],
      ['du', 'dir', 'Ich helfe dir.'],
      ['er', 'ihm', 'Ich gebe ihm das Buch.'],
      ['sie (Sg.)', 'ihr', 'Ich danke ihr.'],
      ['es', 'ihm', 'Es schmeckt ihm.'],
      ['wir', 'uns', 'Es geht uns gut.'],
      ['ihr', 'euch', 'Ich gebe euch den Schlüssel.'],
      ['sie (Pl.)', 'ihnen', 'Es geht ihnen gut.'],
      ['Sie', 'Ihnen', 'Ich danke Ihnen.'],
    ],
    [3000, 2200, 6506]
  ),
  ...gap(1),
  ruleBox([
    'Dativ — Endungen Übersicht (Adjektivendungen):',
    'Mit bestimmtem Artikel: dem alt-EN Mann / der alt-EN Frau / den alt-EN Kindern',
    'Mit unbestimmtem Artikel: einem alt-EN Mann / einer alt-EN Frau / alt-EN Kindern',
    'Im Dativ ist die Adjektiv-Endung IMMER -en (sehr einfach!)',
    'Häufige Wendungen: Es geht mir gut. / Tut mir leid. / Mir ist kalt.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('Wem? — wem: ___________  |  Es gefällt mir: ___________'),
  p('Ich helfe dir: ___________  |  mit dem Bus: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Dativ'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Häufige Fehler vermeiden:',
    '✘ Ich helfe meine Mutter → ✓ Ich helfe meiner Mutter (Dat.!)',
    '✘ mit den Kinder → ✓ mit den Kindern (Pl. Dat. + n)',
    '✘ Ich danke für dich → ✓ Ich danke dir (kein „für"!)',
    '✘ Es gefällt mich → ✓ Es gefällt mir',
    '✘ Mit du fahre ich → ✓ Mit dir fahre ich',
    '',
    'Faustregel: Sobald „mit/bei/von/zu/nach/aus/seit" → Dativ!',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich danke dir herzlich für deine Hilfe — du hast mir wirklich sehr geholfen.'),
  p('Wir fahren mit dem Auto zu meiner Schwester — sie wohnt bei den Eltern in Hamburg.'),
  p('Das Buch gehört meinem Bruder — kannst du es ihm bitte zurückgeben?'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Dativ — Konversation'),
  h2('Aufgabe 1 — Dialog: Geschenke und Wünsche'),
  p('Zwei Personen sprechen über Geschenke und ihre Familie. Ergänzt den Dialog.'),
  infoBox([
    'Geschenkideen: Ich schenke meiner Mutter / meinem Bruder …',
    'Wer-was-wem: Ich gebe / schicke / kaufe ihm/ihr …',
    'Vorlieben: Ihr/Ihm gefällt … / Ihr/Ihm schmeckt …',
    'Hilfe anbieten: Kann ich dir / Ihnen helfen?',
  ]),
  ...gap(1),
  p('A: „Was schenkst du ________ (deine Mutter) zum Geburtstag?"'),
  p('B: „Ich schenke ________ ein Buch — sie liest gerne. Und du?"'),
  p('A: „Ich kaufe ________ (mein Vater) ein Werkzeug. Er liebt es, im Garten zu arbeiten."'),
  p('B: „Schickst du auch ________ (deine Großeltern) etwas?"'),
  p('A: „Ja, ich schicke ________ Blumen. Sie wohnen weit weg, deshalb können wir nicht kommen."'),
  p('B: „Das ist schön! Hilfst du auch ________ (sie, Pl.) manchmal?"'),
  p('A: „Ja, ich rufe ________ jede Woche an — das gefällt ________ besonders."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Im Restaurant'),
  stdTable(
    ['Gast (A)', 'Kellner/in (B)'],
    [
      ['Bestellen Sie ein Essen für sich und Ihren Partner. (Wem? — Akkusativ-Objekt + indirektes Objekt)', 'Empfehlen Sie etwas. „Ich kann Ihnen … empfehlen."'],
      ['Reagieren Sie: „Das schmeckt mir/uns!"', 'Fragen Sie: „Schmeckt es Ihnen?"'],
      ['Bitten Sie um die Rechnung.', 'Bringen Sie die Rechnung und sagen: „Hier, bitte!"'],
      ['Bedanken Sie sich beim Kellner.', 'Antworten Sie höflich.'],
    ],
    [5703, 5703]
  ),
  ruleBox([
    'Typische Restaurantsätze mit Dativ:',
    'Was kann ich Ihnen bringen?',
    'Schmeckt es Ihnen?',
    'Kann ich Ihnen die Rechnung bringen?',
    'Tut mir leid, das gibt es heute nicht.',
    'Ich bringe ihnen die Karte sofort.',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Familie und Freunde'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wem schicken Sie regelmäßig Nachrichten?', ''],
      ['Wem helfen Sie oft? Womit?', ''],
      ['Wem haben Sie zuletzt etwas geschenkt? Was?', ''],
      ['Mit wem fahren Sie gerne in den Urlaub?', ''],
      ['Was schmeckt Ihnen besonders gut?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Wem gehört das?"'),
  p('Ein/e Schüler/in zeigt einen Gegenstand (z.B. Stift, Heft, Schal). Die anderen raten, wem er gehört. Antworten im Dativ!'),
  infoBox([
    'Beispielsätze:',
    'A zeigt einen blauen Stift: „Wem gehört das?"',
    'B: „Vielleicht gehört er Maria. — Sie hat heute eine blaue Tasche dabei."',
    'C: „Das gehört der Lehrerin — sie hat heute mit einem blauen Stift geschrieben."',
    'A: „Stimmt — das gehört ihr!"',
    'Fokus: gehören + Dativ / Personalpronomen Dativ',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Dativ'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Mindestens 5 Dativ-Konstruktionen verwendet'),
  bullet('Possessivpronomen im Dativ korrekt (meiner/meinem/meinen)'),
  bullet('Personalpronomen im Dativ korrekt (ihr/ihm/ihnen)'),
  bullet('Dativ-Verben (gefallen/schmecken) korrekt verwendet'),
  bullet('Natürlicher Gesprächsfluss'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Was schenkst du deiner Mutter zum Geburtstag?" / B: „Ich schenke ihr ein Buch — sie liest gerne."'),
  p('A: „Ich kaufe meinem Vater ein Werkzeug." / B: „Schickst du auch deinen Großeltern etwas?"'),
  p('A: „Ja, ich schicke ihnen Blumen." / B: „Hilfst du ihnen manchmal?"'),
  p('A: „Ja, ich rufe sie jede Woche an — das gefällt ihnen besonders."'),
  ...gap(1),
  h2('Aufgabe 2 — Restaurant-Rollenspiel'),
  p('A: „Können Sie uns die Speisekarte bringen?" / B: „Ja, sofort. Was kann ich Ihnen empfehlen?"'),
  p('A: „Ich nehme den Salat." / B: „Schmeckt es Ihnen?" / A: „Ja, das schmeckt uns gut!"'),
  p('A: „Können Sie uns die Rechnung bringen?" / B: „Gerne, einen Moment."'),
  p('A: „Vielen Dank!" / B: „Bitte sehr — kommen Sie gut nach Hause!"'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: gehören + Dativ (gehört mir / dir / ihm), Possessivpronomen-Endungen, Plural mit -n.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Dativ — Bildaufgaben'),
  h2('Aufgabe 1 — Wem gehört das?'),
  p('[BILD 1: Sechs Bilder — jedes zeigt einen Gegenstand und eine Person daneben: (1) Mann mit Hund, (2) Frau mit Tasche, (3) Kind mit Ball, (4) Junge mit Buch, (5) Mädchen mit Puppe, (6) älterer Mann mit Hut.]'),
  p('a) Schreibe zu jedem Bild einen Satz: „Der/Das/Die … gehört …"'),
  stdTable(
    ['Bild', 'Wem gehört das?'],
    [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', '']],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Geben/Schenken-Szene'),
  p('[BILD 2: Geburtstagsszene — eine Frau überreicht einem Mann ein eingepacktes Geschenk. Im Hintergrund: Geburtstagskuchen mit Kerzen, andere Leute lachen und klatschen.]'),
  p('a) Beschreibe die Szene in 4–5 Sätzen mit Dativ-Konstruktionen.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  p('b) Was könnten die Personen sagen? Schreibe 3 Sätze in direkter Rede mit Dativ.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Postkarten-Szene'),
  p('[BILD 3: Eine Person sitzt am Strand und schreibt eine Postkarte. Auf der Postkarte stehen: „Liebe Mama, …". Daneben: ein Stempel mit Adresse: „Frau Anna Schmidt, Hauptstraße 12, 10115 Berlin".]'),
  p('a) Wem schreibt die Person? An wen ist die Postkarte adressiert?'),
  wLine(),
  p('b) Schreibe selbst eine kurze Postkarte (4–5 Sätze) mit Dativ-Konstruktionen.', { before: 120 }),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Hilfe-Szene'),
  p('[BILD 4: Verschiedene Hilfssituationen: (1) Kind hilft Oma im Garten, (2) junger Mann hilft alter Frau mit Einkaufstüten, (3) Lehrer erklärt Schülern eine Aufgabe, (4) Kind dankt seiner Mutter.]'),
  p('a) Schreibe zu jedem Bild einen Satz mit Dativ-Verb (helfen / erklären / danken / antworten).'),
  stdTable(
    ['Bild', 'Satz mit Dativ-Verb'],
    [['1', ''], ['2', ''], ['3', ''], ['4', '']],
    [1500, 10206]
  ),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Dativ'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Wem gehört das?'),
  stdTable(
    ['Bild', 'Beispielsatz'],
    [
      ['1', 'Der Hund gehört dem Mann.'],
      ['2', 'Die Tasche gehört der Frau.'],
      ['3', 'Der Ball gehört dem Kind.'],
      ['4', 'Das Buch gehört dem Jungen.'],
      ['5', 'Die Puppe gehört dem Mädchen.'],
      ['6', 'Der Hut gehört dem älteren Mann.'],
    ],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Geburtstagsszene'),
  p('Beispiel: Eine Frau gibt einem Mann ein Geschenk — vielleicht ist es sein Geburtstag. Im Hintergrund steht ein Kuchen mit Kerzen. Die Gäste klatschen ihm zu. Das Geschenk gefällt dem Mann sehr — er bedankt sich bei ihr mit einer Umarmung.'),
  p('Direkte Rede Beispiele: „Herzlichen Glückwunsch! Das ist für dich!" / „Vielen Dank, das gefällt mir sehr!" / „Schmeckt dir der Kuchen?"'),
  ...gap(1),
  h2('Aufgabe 3 — Postkarte'),
  p('a) Die Person schreibt ihrer Mutter (Frau Anna Schmidt in Berlin).'),
  p('b) Beispiel: Liebe Mama, ich schreibe dir aus dem Urlaub! Hier in Italien gefällt es mir sehr gut — das Wetter ist toll. Heute Morgen war ich am Strand und habe an dich gedacht. Ich bringe dir bestimmt etwas Schönes mit. Bis bald, deine Sara'),
  ...gap(1),
  h2('Aufgabe 4 — Hilfe-Szene'),
  stdTable(
    ['Bild', 'Beispielsatz'],
    [
      ['1', 'Das Kind hilft seiner Oma im Garten.'],
      ['2', 'Der junge Mann hilft der alten Frau mit den Einkaufstüten.'],
      ['3', 'Der Lehrer erklärt seinen Schülern die Aufgabe.'],
      ['4', 'Das Kind dankt seiner Mutter für das Essen.'],
    ],
    [1500, 10206]
  ),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
