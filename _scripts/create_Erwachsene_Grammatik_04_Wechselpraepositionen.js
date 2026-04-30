// A2_Erwachsene — Thema 11 UP 04: Wechselpräpositionen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Wechselpräpositionen';
const HEADING = 'Thema 11 — Grammatik A2 Erwachsene';
const SUBHEAD = 'UP 04: Wechselpräpositionen';
const PREFIX  = 'A2_Erwachsene_Grammatik_04_Wechselpraepositionen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '11_Grammatik', '04_Wechselpraepositionen');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 04`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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
  h1('Wechselpräpositionen — Schreibübung'),
  ruleBox([
    'WECHSELPRÄPOSITIONEN — Übersicht:',
    '9 Wechselpräpositionen: in, an, auf, über, unter, vor, hinter, neben, zwischen',
    '',
    'Akkusativ (WOHIN?) — bei Bewegung mit Richtung:',
    '  Ich gehe in die Küche. (Wohin? → Akk.)',
    '  Sie stellt die Vase auf den Tisch.',
    '',
    'Dativ (WO?) — bei Position oder Bewegung ohne Richtung:',
    '  Ich bin in der Küche. (Wo? → Dat.)',
    '  Die Vase steht auf dem Tisch.',
    '',
    'MERKHILFE:',
    'Bewegung MIT Ziel = Akkusativ (legen, stellen, hängen, gehen NACH irgendwo)',
    'Position / Bewegung im Raum = Dativ (liegen, stehen, hängen, sein)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Wohin? oder Wo?'),
  p('Frage zuerst: „Wohin?" oder „Wo?". Wähle dann den Kasus.'),
  p('a) Ich lege das Buch ________ den / dem Tisch. (auf)'),
  p('b) Das Buch liegt schon ________ den / dem Tisch. (auf)'),
  p('c) Wir gehen ________ das / dem Kino. (in)'),
  p('d) Wir sind schon ________ das / dem Kino. (in)'),
  p('e) Die Katze springt ________ den / dem Stuhl. (auf)'),
  p('f) Die Katze sitzt ________ den / dem Stuhl. (auf)'),
  ...gap(1),
  h2('Aufgabe 2 — Sätze bilden mit Wechselpräpositionen'),
  p('Bilde Sätze mit der Präposition in Klammern. Achte auf den Kasus!'),
  p('a) Das Bild / hängen / die Wand (an) → '),
  wLine(),
  p('b) Ich / hängen / das Bild / die Wand (an) → ', { before: 120 }),
  wLine(),
  p('c) Die Kinder / spielen / der Garten (in) → ', { before: 120 }),
  wLine(),
  p('d) Wir / fahren / die Stadt (in) → ', { before: 120 }),
  wLine(),
  p('e) Die Tasche / liegen / der Stuhl (unter) → ', { before: 120 }),
  wLine(),
  p('f) Sie / stellen / die Tasche / der Stuhl (unter) → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Verbpaare: legen/liegen, stellen/stehen, hängen'),
  ruleBox([
    'WICHTIGE VERBPAARE:',
    'Ich LEGE … hin (Akk.)        Es LIEGT … (Dat.)',
    'Ich STELLE … hin (Akk.)      Es STEHT … (Dat.)',
    'Ich HÄNGE … hin (Akk.)       Es HÄNGT … (Dat.)',
    'Ich SETZE mich (Akk.)        Ich SITZE … (Dat.)',
    '',
    'Bewegung → Akkusativ:        Ich lege das Buch AUF DEN Tisch.',
    'Position → Dativ:            Das Buch liegt AUF DEM Tisch.',
  ]),
  ...gap(1),
  p('Wähle das richtige Verb und ergänze den Kasus.'),
  p('a) Maria ________ (legt/liegt) ihre Brille auf ________ (den/dem) Tisch.'),
  p('b) Die Brille ________ (legt/liegt) seit gestern auf ________ (den/dem) Tisch.'),
  p('c) Ich ________ (stelle/stehe) die Vase auf ________ (das/dem) Regal.'),
  p('d) Die Vase ________ (stellt/steht) schon auf ________ (das/dem) Regal.'),
  p('e) Wir ________ (hängen ans/hängen am) das Bild ________ die Wand.'),
  p('f) Das Bild ________ (hängt) seit langem an ________ (die/der) Wand.'),
  ...gap(1),
  h2('Aufgabe 4 — Beschreibung eines Zimmers'),
  p('Beschreiben Sie ein Zimmer (5–6 Sätze) mit verschiedenen Wechselpräpositionen. Wo steht/liegt/hängt was?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Wechselpräpositionen'),
  grammarBox([
    'Verbpaare merken:',
    'AKKUSATIV (Wohin? — was tust du?):',
    '  legen, stellen, hängen (aktiv), setzen, gehen, fahren, fliegen',
    'DATIV (Wo? — wo ist es?):',
    '  liegen, stehen, hängen (passiv), sitzen, sein, bleiben, wohnen',
    '',
    'Kontraktionen:',
    'in das = ins      an das = ans      auf das = aufs',
    'in dem = im       an dem = am',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Wohin / Wo'),
  p('a) auf den Tisch  (Wohin? legen → Akk.)'),
  p('b) auf dem Tisch  (Wo? liegen → Dat.)'),
  p('c) in das (ins) Kino  (Wohin? gehen → Akk.)'),
  p('d) in dem (im) Kino  (Wo? sein → Dat.)'),
  p('e) auf den Stuhl  (Wohin? springen → Akk.)'),
  p('f) auf dem Stuhl  (Wo? sitzen → Dat.)'),
  ...gap(1),
  h2('Aufgabe 2 — Sätze'),
  p('a) Das Bild hängt an der Wand.  (hängen Position → Dat.)'),
  p('b) Ich hänge das Bild an die Wand.  (hängen Bewegung → Akk.)'),
  p('c) Die Kinder spielen in dem Garten / im Garten.  (Wo? → Dat.)'),
  p('d) Wir fahren in die Stadt.  (Wohin? → Akk.)'),
  p('e) Die Tasche liegt unter dem Stuhl.  (Wo? → Dat.)'),
  p('f) Sie stellt die Tasche unter den Stuhl.  (Wohin? → Akk.)'),
  ...gap(1),
  h2('Aufgabe 3 — Verbpaare'),
  p('a) legt … auf den Tisch  (Akk., Bewegung)'),
  p('b) liegt … auf dem Tisch  (Dat., Position)'),
  p('c) stelle … auf das (aufs) Regal  (Akk., Bewegung)'),
  p('d) steht … auf dem Regal  (Dat., Position)'),
  p('e) hängen … an die Wand  (Akk., Bewegung)'),
  p('f) hängt … an der Wand  (Dat., Position)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Zimmerbeschreibung'),
  bullet('Mindestens 5 verschiedene Wechselpräpositionen verwendet'),
  bullet('Alle im Dativ (Beschreibung = Position)'),
  bullet('Verben: stehen, liegen, hängen, sich befinden'),
  bullet('Logischer Aufbau (Wand, Boden, Möbel, Dekoration)'),
  ...gap(1),
  p('Beispiel: In meinem Zimmer steht ein großer Schreibtisch am Fenster. Über dem Schreibtisch hängt ein Bild von meiner Familie. Auf dem Schreibtisch liegen viele Bücher und ein Laptop. Neben dem Schreibtisch befindet sich ein bequemer Sessel. An der Wand hinter dem Sessel hängt ein großer Spiegel. Unter dem Sessel liegt mein roter Teppich.'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wechselpräpositionen — Leseübung'),
  h2('Text: Sumayyas neue Wohnung'),
  p('Sumayya ist letzten Monat in eine neue Wohnung in Bremen gezogen. Heute schreibt sie ihrer Schwester Aisha einen Brief, um ihr die Wohnung zu beschreiben:'),
  p('„Liebe Aisha, endlich habe ich Zeit, dir von meiner neuen Wohnung zu erzählen! Sie liegt im dritten Stock eines schönen Altbauhauses, mitten in der Stadt. Wenn man durch die Tür kommt, steht man im Flur. An der linken Wand hängt ein großer Spiegel — den habe ich von Mama bekommen!"'),
  p('„Geht man weiter geradeaus, kommt man in das Wohnzimmer. In der Mitte des Wohnzimmers steht ein gemütliches Sofa. Vor dem Sofa befindet sich ein Couchtisch — dort lege ich immer meine Bücher und Magazine. An der Wand hinter dem Sofa hängen drei Bilder von meinen Reisen. Über dem Couchtisch hängt eine schöne Lampe."'),
  p('„Neben dem Wohnzimmer ist die Küche. Sie ist klein, aber praktisch. Auf der Arbeitsfläche stehen meine Pflanzen — sie bekommen viel Licht. Im Kühlschrank ist gerade nicht viel — ich muss bald einkaufen!"'),
  p('„Mein Schlafzimmer liegt am Ende des Flurs. Mein Bett steht unter dem Fenster, damit ich morgens die Sonne ins Gesicht bekomme. Auf der Kommode neben dem Bett liegen mein Buch und mein Wecker. Im Schrank gegenüber von meinem Bett hängen alle meine Kleider. Über dem Bett hängt ein Foto von uns beiden — als wir Kinder waren!"'),
  p('„Das Bad ist klein, aber neu renoviert. Über dem Waschbecken hängt ein großer Spiegel. In der Dusche habe ich blau-weiße Fliesen — sehr schön! Ich freue mich schon darauf, dass du mich besuchst und alles selbst sehen kannst. Bis bald, deine Sumayya."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Sumayyas Wohnung liegt im dritten Stock.', ''],
      ['Im Flur hängt ein Bild von ihrer Mutter.', ''],
      ['Vor dem Sofa steht ein Couchtisch.', ''],
      ['Hinter dem Sofa hängen Bilder von Reisen.', ''],
      ['Auf der Arbeitsfläche der Küche stehen Pflanzen.', ''],
      ['Sumayyas Bett steht neben dem Fenster.', ''],
      ['Über dem Waschbecken hängt eine Lampe.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Wechselpräpositionen aus dem Text finden'),
  p('Suche im Text 8 Konstruktionen mit Wechselpräpositionen + Dativ.'),
  stdTable(
    ['Konstruktion (Beispiel aus Text)', 'Präposition'],
    [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Wo befindet sich was?'),
  p('Beantworte die Fragen mit ganzen Sätzen (Wechselpräposition + Dativ!).'),
  p('a) Wo hängt der Spiegel im Flur?'),
  wLine(),
  p('b) Wo befindet sich das Sofa?', { before: 120 }),
  wLine(),
  p('c) Wo steht das Bett im Schlafzimmer und warum?', { before: 120 }),
  wLine(), wLine(),
  p('d) Wo hängen die Kleider?', { before: 120 }),
  wLine(),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Wechselpräpositionen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Sumayyas Wohnung liegt im dritten Stock.', 'R'],
      ['Im Flur hängt ein Bild von ihrer Mutter.', 'F (ein Spiegel von Mama)'],
      ['Vor dem Sofa steht ein Couchtisch.', 'R'],
      ['Hinter dem Sofa hängen Bilder von Reisen.', 'R'],
      ['Auf der Arbeitsfläche der Küche stehen Pflanzen.', 'R'],
      ['Sumayyas Bett steht neben dem Fenster.', 'F (unter dem Fenster)'],
      ['Über dem Waschbecken hängt eine Lampe.', 'F (ein Spiegel)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Wechselpräpositionen (Beispiele)'),
  stdTable(
    ['Konstruktion', 'Präposition'],
    [
      ['im dritten Stock', 'in (Dat.)'],
      ['im Flur', 'in (Dat.)'],
      ['an der linken Wand', 'an (Dat.)'],
      ['vor dem Sofa', 'vor (Dat.)'],
      ['hinter dem Sofa', 'hinter (Dat.)'],
      ['über dem Couchtisch', 'über (Dat.)'],
      ['neben dem Wohnzimmer', 'neben (Dat.)'],
      ['unter dem Fenster', 'unter (Dat.)'],
    ],
    [8000, 3706]
  ),
  p('Hinweis: Auch andere korrekte Konstruktionen aus dem Text akzeptieren.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösungen'),
  p('a) Der Spiegel hängt an der linken Wand im Flur.'),
  p('b) Das Sofa steht in der Mitte des Wohnzimmers.'),
  p('c) Das Bett steht unter dem Fenster, damit Sumayya morgens die Sonne ins Gesicht bekommt.'),
  p('d) Die Kleider hängen im Schrank gegenüber von ihrem Bett.'),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wechselpräpositionen — Lückentext'),
  h2('Aufgabe 1 — Akkusativ oder Dativ?'),
  p('Frage dich: Wohin? (Akk.) oder Wo? (Dat.)?'),
  p('a) Ich hänge die Jacke ________ den/dem Schrank. (in)'),
  p('b) Die Jacke hängt ________ den/dem Schrank. (in)'),
  p('c) Sie geht ________ die/der Schule. (in)'),
  p('d) Sie ist ________ die/der Schule. (in)'),
  p('e) Wir setzen uns ________ den/dem Tisch. (an)'),
  p('f) Wir sitzen ________ den/dem Tisch. (an)'),
  p('g) Stell die Lampe ________ das/dem Fenster! (auf)'),
  p('h) Die Lampe steht schon ________ das/dem Fenster. (auf)'),
  ...gap(1),
  h2('Aufgabe 2 — Artikel ergänzen'),
  p('Ergänze den richtigen Artikel im Akkusativ oder Dativ.'),
  p('a) Das Bild hängt über ________ Sofa. (das)'),
  p('b) Sie legt das Buch unter ________ Tisch. (der)'),
  p('c) Die Tasche steht hinter ________ Tür. (die)'),
  p('d) Das Auto fährt zwischen ________ Häusern. (die — Pl.)'),
  p('e) Ich gehe in ________ Park. (der → ins/in den)'),
  p('f) Wir warten vor ________ Bahnhof. (der)'),
  p('g) Die Katze springt auf ________ Stuhl. (der)'),
  p('h) Die Vase steht neben ________ Lampe. (die)'),
  ...gap(1),
  h2('Aufgabe 3 — Eine Wohnungsbeschreibung'),
  ruleBox([
    'Häufige Kontraktionen:',
    'in das = ins   |   in dem = im',
    'an das = ans   |   an dem = am',
    'auf das = aufs (selten)',
  ]),
  ...gap(1),
  p('Ergänze die Wechselpräpositionen + den richtigen Artikel.'),
  p('Mein Wohnzimmer ist groß und hell. ________ (in) Mitte steht ein Sofa. ________ (vor) Sofa befindet sich ein kleiner Couchtisch. ________ (auf) Couchtisch liegt immer ein Buch oder eine Zeitung. ________ (über) Sofa hängt ein großes Bild. ________ (neben) Sofa steht eine Stehlampe. ________ (in) Ecke neben dem Fenster habe ich eine Pflanze gestellt. ________ (an) Wand gegenüber hängen drei Familienfotos.'),
  ...gap(1),
  h2('Aufgabe 4 — Verben + Wechselpräpositionen'),
  p('Wähle das richtige Verb (Akkusativ oder Dativ) und ergänze.'),
  p('a) Ich (lege/liege) das Buch auf ________ Tisch. (der)'),
  p('b) Das Buch (legt/liegt) auf ________ Tisch. (der)'),
  p('c) Sie (stellt/steht) die Schuhe vor ________ Tür. (die)'),
  p('d) Die Schuhe (stellen/stehen) vor ________ Tür. (die)'),
  p('e) Er (hängt/hängt) das Bild an ________ Wand. (die)'),
  p('f) Das Bild (hängt) an ________ Wand. (die)'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Wechselpräpositionen'),
  h2('Aufgabe 1 — Akkusativ oder Dativ'),
  p('a) in den Schrank (Akk.: hängen Bewegung)'),
  p('b) in dem (im) Schrank (Dat.: hängen Position)'),
  p('c) in die Schule (Akk.: gehen — Wohin?)'),
  p('d) in der Schule (Dat.: sein — Wo?)'),
  p('e) an den Tisch (Akk.: sich setzen — Wohin?)'),
  p('f) an dem (am) Tisch (Dat.: sitzen — Wo?)'),
  p('g) auf das (aufs) Fenster (Akk.: stellen — Wohin?)'),
  p('h) auf dem Fenster (Dat.: stehen — Wo?)'),
  ...gap(1),
  h2('Aufgabe 2 — Artikel'),
  p('a) über dem Sofa  (hängen Pos. → Dat.)'),
  p('b) unter den Tisch  (legen Bew. → Akk.)'),
  p('c) hinter der Tür  (stehen Pos. → Dat.)'),
  p('d) zwischen den Häusern  (fahren Bew./Pos. → hier Pos. = Dat.)'),
  p('e) in den Park / in den Park  (gehen Bew. → Akk.)'),
  p('f) vor dem Bahnhof  (warten = Pos. → Dat.)'),
  p('g) auf den Stuhl  (springen Bew. → Akk.)'),
  p('h) neben der Lampe  (stehen Pos. → Dat.)'),
  ...gap(1),
  h2('Aufgabe 3 — Wohnungsbeschreibung'),
  p('1. In der Mitte  2. Vor dem Sofa  3. Auf dem Couchtisch'),
  p('4. Über dem Sofa  5. Neben dem Sofa  6. In die Ecke (gestellt = Bewegung!)'),
  p('7. An der Wand'),
  ...gap(1),
  h2('Aufgabe 4 — Verben + Wechselpräp.'),
  p('a) lege … auf den Tisch  (Bewegung → Akk.)'),
  p('b) liegt … auf dem Tisch  (Position → Dat.)'),
  p('c) stellt … vor die Tür  (Bewegung → Akk.)'),
  p('d) stehen … vor der Tür  (Position → Dat.)'),
  p('e) hängt … an die Wand  (Bewegung → Akk.)'),
  p('f) hängt … an der Wand  (Position → Dat.)'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wechselpräpositionen — Wortliste'),
  h2('Teil A — Die 9 Wechselpräpositionen'),
  stdTable(
    ['Präposition', 'Bedeutung', 'Beispiel Akk. (Wohin?)', 'Beispiel Dat. (Wo?)'],
    [
      ['in', 'innerhalb', 'in das Haus (ins)', 'in dem Haus (im)'],
      ['an', 'an einer Seite', 'an die Wand', 'an der Wand'],
      ['auf', 'oben auf', 'auf den Tisch', 'auf dem Tisch'],
      ['über', 'höher als', 'über das Bett', 'über dem Bett'],
      ['unter', 'tiefer als', 'unter den Stuhl', 'unter dem Stuhl'],
      ['vor', 'davor', 'vor das Haus', 'vor dem Haus'],
      ['hinter', 'dahinter', 'hinter den Schrank', 'hinter dem Schrank'],
      ['neben', 'daneben', 'neben das Sofa', 'neben dem Sofa'],
      ['zwischen', 'dazwischen', 'zwischen die Bäume', 'zwischen den Bäumen'],
    ],
    [2200, 1800, 3700, 4006]
  ),
  ...gap(1),
  h2('Teil B — Verbpaare (Bewegung vs. Position)'),
  stdTable(
    ['Bewegung (Akk.)', 'Position (Dat.)', 'Beispiel'],
    [
      ['legen', 'liegen', 'Ich lege das Buch / Das Buch liegt'],
      ['stellen', 'stehen', 'Ich stelle die Vase / Die Vase steht'],
      ['hängen', 'hängen', 'Ich hänge das Bild / Das Bild hängt'],
      ['setzen (sich)', 'sitzen', 'Ich setze mich / Ich sitze'],
      ['gehen', 'sein', 'Ich gehe ins Kino / Ich bin im Kino'],
      ['fahren (nach …)', 'wohnen / leben', 'Ich fahre nach … / Ich wohne in …'],
    ],
    [3000, 3000, 5706]
  ),
  ...gap(1),
  ruleBox([
    'WICHTIGE KONTRAKTIONEN:',
    'in + das  = INS    (Ich gehe ins Kino.)',
    'in + dem  = IM     (Ich bin im Kino.)',
    'an + das  = ANS    (Ich gehe ans Fenster.)',
    'an + dem  = AM     (Ich stehe am Fenster.)',
    'auf + das = AUFS   (selten — Ich gehe aufs Klo.)',
    'zu + dem  = ZUM    (zu der = ZUR — beide nur Dativ)',
    '',
    'Pluralregel: Im Plural Dativ → Nomen + n!',
    'zwischen den Bäume + n = zwischen den Bäumen',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('in/auf/unter: ___________  |  vor/hinter/neben: ___________'),
  p('über/zwischen: ___________  |  Wohin? Wo?: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Wechselpräpositionen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Häufige Fehler vermeiden:',
    '✘ Ich gehe in das Hause → ✓ Ich gehe ins Haus (kein -e am Ende!)',
    '✘ Ich bin in dem Wohnzimmer → ✓ Ich bin im Wohnzimmer (Kontraktion!)',
    '✘ Das Buch ist auf den Tisch → ✓ Das Buch ist auf dem Tisch (Position = Dat.)',
    '✘ Ich gehe in den Park spazieren → ✓ in dem (im) Park spazieren (drinnen = Dat.)',
    '   ABER: Ich gehe in den Park → Akk. (Bewegung = ins Innere!)',
    '',
    'Tipp: Frage immer „Wohin?" → Akk. oder „Wo?" → Dat.',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich hänge das Bild an die Wand. (Akk.) — Das Bild hängt an der Wand. (Dat.)'),
  p('Sie geht ins Café. (Akk.) — Sie sitzt im Café. (Dat.)'),
  p('Wir fahren in die Berge. (Akk.) — Wir sind in den Bergen. (Dat. + n!)'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wechselpräpositionen — Konversation'),
  h2('Aufgabe 1 — Dialog: Wo bist du?'),
  p('Zwei Personen telefonieren. Eine ist unterwegs — die andere fragt. Ergänzt den Dialog.'),
  infoBox([
    'Wo? — Position: Ich bin in / im / an / auf / unter …',
    'Wohin? — Bewegung: Ich gehe / fahre in / zu / nach …',
    'Wegbeschreibung: Geh in den Park, dann nach links / rechts.',
    'Treffpunkt: Wir treffen uns vor / am / im …',
  ]),
  ...gap(1),
  p('A: „Hallo! Wo bist du gerade?"'),
  p('B: „Ich bin gerade ________ ________ Café an der Ecke. Komm doch auch!"'),
  p('A: „Ich kann nicht — ich muss noch schnell ________ ________ Bank gehen. Wo treffen wir uns?"'),
  p('B: „Wie wäre es, wenn wir uns ________ ________ Bahnhof treffen?"'),
  p('A: „Gute Idee! ________ ________ Bahnhof gibt es einen schönen Park."'),
  p('B: „Stimmt. Ich gehe dann jetzt los — ich bin in 15 Minuten ________ ________ Park."'),
  p('A: „Perfekt. Ich warte ________ ________ Bank ________ ________ Eingang."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Im neuen Büro'),
  p('Eine Person zeigt einer neuen Kollegin / einem neuen Kollegen das Büro. Verwendet alle 9 Wechselpräpositionen!'),
  stdTable(
    ['Person A — zeigt', 'Person B — fragt'],
    [
      ['Wo ist die Kantine?', 'Erklärt: Im 2. Stock, neben dem Konferenzraum.'],
      ['Wo kann ich meine Sachen ablegen?', 'Antworten: In den Schrank dort drüben.'],
      ['Wo finde ich die Toilette?', 'Beschreibung: Vor dem Eingang links, neben dem Aufzug.'],
      ['Wo ist mein Schreibtisch?', 'Zeigen: Hier, am Fenster zwischen den beiden Pflanzen.'],
    ],
    [5703, 5703]
  ),
  ruleBox([
    'Räume und Orte im Büro:',
    'der Eingang / die Tür / das Fenster',
    'der Schreibtisch / der Stuhl / der Computer',
    'der Schrank / das Regal / die Küche',
    'der Konferenzraum / die Kantine / die Toilette',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Mein Lieblingsort'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wo ist Ihr Lieblingsplatz in Ihrer Wohnung?', ''],
      ['Wohin gehen Sie am liebsten am Wochenende?', ''],
      ['Wo befindet sich Ihre Schule / Arbeitsstelle?', ''],
      ['Wo essen Sie am liebsten zu Mittag?', ''],
      ['Wohin würden Sie gerne reisen?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Was ist wo?"'),
  p('Eine Person beschreibt einen Gegenstand im Klassenzimmer mit Wechselpräpositionen — die anderen raten, was es ist.'),
  infoBox([
    'Beispielsätze:',
    'Es liegt auf dem Tisch und unter dem Stift.',
    'Es hängt an der Wand zwischen den Fenstern.',
    'Es steht in der Ecke neben der Tür.',
    'Es ist unter meinem Stuhl, vor meinen Füßen.',
    'Was kann das sein? Lasst die Gruppe raten!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Wechselpräpositionen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Mindestens 5 verschiedene Wechselpräpositionen'),
  bullet('Akk. bei Bewegung / Dat. bei Position korrekt unterschieden'),
  bullet('Kontraktionen verwendet (im, ins, am, ans)'),
  bullet('Natürlicher Telefonton'),
  bullet('Konkrete Treffpunkte mit Wechselpräpositionen'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Wo bist du gerade?" / B: „Ich bin im Café an der Ecke."'),
  p('A: „Ich muss noch zur Bank gehen. Wo treffen wir uns?" / B: „Treffen wir uns am Bahnhof?"'),
  p('A: „Vor dem Bahnhof gibt es einen schönen Park." / B: „Ich bin in 15 Minuten im Park."'),
  p('A: „Ich warte vor der Bank am Eingang."'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Bürorundgang'),
  p('A: „Die Kantine ist im 2. Stock, neben dem Konferenzraum."'),
  p('A: „Du kannst deine Sachen in den Schrank dort drüben legen."'),
  p('A: „Die Toilette ist vor dem Eingang links, neben dem Aufzug."'),
  p('A: „Hier ist dein Schreibtisch — am Fenster, zwischen den beiden Pflanzen."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Dativ bei Position, korrekte Artikel im Dativ (dem/der/dem/den+n), Plural mit -n.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wechselpräpositionen — Bildaufgaben'),
  h2('Aufgabe 1 — Wo ist die Katze?'),
  p('[BILD 1: Acht kleine Bilder einer Katze in verschiedenen Positionen: (1) auf dem Sofa, (2) unter dem Tisch, (3) neben der Pflanze, (4) hinter dem Vorhang, (5) vor der Tür, (6) zwischen zwei Kissen, (7) auf der Fensterbank, (8) im Karton.]'),
  p('a) Wo ist die Katze auf jedem Bild? Schreibe einen Satz.'),
  stdTable(
    ['Bild', 'Wo ist die Katze?'],
    [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', ''], ['7', ''], ['8', '']],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Zimmer beschreiben'),
  p('[BILD 2: Ein Wohnzimmer mit Sofa, Couchtisch, Lampe, Bild an der Wand, Bücherregal, Pflanze, Teppich. Alle Möbel sind klar zu sehen.]'),
  p('a) Beschreibe das Zimmer in 6–7 Sätzen mit verschiedenen Wechselpräpositionen + Dativ.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Bewegungs-Bilder'),
  p('[BILD 3: Vier Bilder mit Pfeilen, die Bewegung zeigen: (1) Person geht in die Wohnung, (2) Frau hängt Bild an die Wand, (3) Mann stellt Vase auf den Tisch, (4) Kind springt aufs Sofa.]'),
  p('a) Schreibe zu jedem Bild einen Satz im Akkusativ (Bewegung mit Ziel).'),
  stdTable(
    ['Bild', 'Satz im Akkusativ'],
    [['1', ''], ['2', ''], ['3', ''], ['4', '']],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Stadtplan'),
  p('[BILD 4: Einfacher Stadtplan: Bank in der Mitte, Park hinter der Bank, Café neben der Bank, Schule vor der Bank, Supermarkt zwischen Schule und Café.]'),
  p('a) Wo befindet sich was? Schreibe 5 Sätze mit Dativ.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  p('b) Stelle dir vor: Du gehst von der Schule zum Park. Beschreibe den Weg mit Akkusativ und Dativ-Mix.', { before: 120 }),
  wLine(), wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Wechselpräpositionen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Wo ist die Katze?'),
  stdTable(
    ['Bild', 'Beispielsatz (alle Dativ — Position!)'],
    [
      ['1', 'Die Katze ist auf dem Sofa.'],
      ['2', 'Die Katze ist unter dem Tisch.'],
      ['3', 'Die Katze ist neben der Pflanze.'],
      ['4', 'Die Katze ist hinter dem Vorhang.'],
      ['5', 'Die Katze ist vor der Tür.'],
      ['6', 'Die Katze ist zwischen den zwei Kissen.'],
      ['7', 'Die Katze ist auf der Fensterbank.'],
      ['8', 'Die Katze ist im Karton.'],
    ],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Zimmerbeschreibung'),
  p('Beispiel: In der Mitte des Zimmers steht ein gemütliches Sofa. Vor dem Sofa befindet sich ein Couchtisch. An der Wand über dem Sofa hängt ein großes Bild. Neben dem Sofa steht eine Stehlampe. In der Ecke an der Wand steht ein Bücherregal. Auf dem Couchtisch liegen einige Magazine. Unter dem Couchtisch ist ein bunter Teppich. Neben dem Bücherregal steht eine Pflanze.'),
  ...gap(1),
  h2('Aufgabe 3 — Bewegung'),
  stdTable(
    ['Bild', 'Beispielsatz (alle Akk. — Bewegung!)'],
    [
      ['1', 'Die Person geht in die Wohnung.'],
      ['2', 'Die Frau hängt das Bild an die Wand.'],
      ['3', 'Der Mann stellt die Vase auf den Tisch.'],
      ['4', 'Das Kind springt auf das (aufs) Sofa.'],
    ],
    [1500, 10206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Stadtplan'),
  p('a) Beispiele: Die Bank ist in der Mitte. / Hinter der Bank befindet sich der Park. / Neben der Bank ist das Café. / Vor der Bank liegt die Schule. / Zwischen der Schule und dem Café befindet sich der Supermarkt.'),
  p('b) Beispiel: Ich gehe aus der Schule (Dat.) heraus. Dann gehe ich an dem Supermarkt (Dat.) vorbei und an dem Café (Dat.). Dann gehe ich um die Bank (Akk.) herum und stehe schließlich im Park (Dat.).'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
