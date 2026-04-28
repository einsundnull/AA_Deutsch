// A2_Erwachsene — Thema 06 UP 01: Freizeitaktivitaeten und Hobbys
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Freizeitaktivitaeten und Hobbys';
const HEADING = 'Thema 06 — Freizeit & Kultur';
const SUBHEAD = 'UP 01: Freizeitaktivitäten und Hobbys';
const PREFIX  = 'A2_Erwachsene_FreizeitKultur_01_FreizeitHobbys';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '06_FreizeitKultur', '01_FreizeitHobbys');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ${SUBHEAD}`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
const ftr = () => ({ default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }), new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })] })] }) });

const h1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const h3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: '2E75B6', font: 'Arial' })], spacing: { before: 160, after: 60 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Freizeitaktivitäten und Hobbys — Schreibübung'),
  infoBox([
    '🎨  Nützliche Ausdrücke für Freizeit und Hobbys:',
    'In meiner Freizeit … / Als Hobby … / Ich interessiere mich für …',
    'Ich spiele gerne … / Ich lese gerne … / Ich treffe mich gerne mit …',
    'Das macht mir (viel) Spaß. / Ich finde das entspannend / aufregend / kreativ.',
    'Ich mache das seit … Jahren / Monaten.',
    'Am Wochenende … / Nach der Arbeit … / In den Ferien …',
    'Ich würde gerne … ausprobieren. / Leider habe ich keine Zeit für …',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Mein Hobby beschreiben'),
  p('Schreibe 4 Sätze über ein Hobby, das du hast oder das du gerne hättest. Beantworte:'),
  bullet('Was ist dein Hobby?'),
  bullet('Seit wann machst du das?'),
  bullet('Warum magst du es?'),
  bullet('Wie oft machst du es?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Verabredung treffen'),
  p('Du möchtest deinen Freund / deine Freundin am Wochenende treffen. Schreibe eine Nachricht (4–5 Sätze). Schlage eine Aktivität vor und erkläre, warum du sie magst.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Vor- und Nachteile eines Hobbys'),
  p('Wähle ein Hobby aus der Liste. Schreibe je 2 Vorteile und 2 Nachteile.'),
  infoBox(['Lesen  |  Videospiele spielen  |  Wandern  |  Malen  |  Kochen  |  Tanzen']),
  p('Ich habe gewählt: ________________________', { before: 120 }),
  stdTable(
    ['Vorteile', 'Nachteile'],
    [['', ''], ['', '']],
    [5953, 5753]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Freizeitpläne: Ein Wochenende beschreiben'),
  p('Beschreibe dein ideales Wochenende in 5–6 Sätzen. Benutze Zeitangaben: frühstücken / morgens / nachmittags / abends. Verwende Perfekt für vergangene Aktivitäten und Präsens für Pläne.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Freizeitaktivitäten und Hobbys'),
  grammarBox([
    '📌  Hobbys beschreiben — Struktur:',
    'Ich [Verb] gerne [Aktivität]. → Ich lese gerne Krimis.',
    'Das macht mir [viel / großen] Spaß.',
    'Ich mache das seit [Zeit + Dativ]: seit zwei Jahren / seit einem Monat.',
    'Ich interessiere mich für [Akk.]: für Fotografie / für Musik.',
    '❗ „interessieren für" braucht Akkusativ!',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Musterlösung'),
  p('Mein Hobby ist Fotografie. Ich mache das seit drei Jahren. Ich mag es, weil ich kreativ sein und die Welt um mich herum besser beobachten kann. Ich fotografiere meistens am Wochenende — in der Natur oder in der Stadt.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Nachricht'),
  p('Hallo [Name]! Hast du am Samstagnachmittag Zeit? Ich würde gerne mit dir ins Kino gehen — der neue Film soll sehr gut sein. Ich mag Kino sehr, weil man einfach abschalten kann. Wir könnten danach noch etwas essen gehen. Schreib mir, ob das passt!'),
  ...gap(1),
  h2('Aufgabe 3 — Bewertungskriterien'),
  p('Vorteile und Nachteile sollen inhaltlich zum Hobby passen und grammatisch korrekte Sätze bilden.'),
  p('Beispiel Wandern: Vorteil: Man bewegt sich an der frischen Luft. / Man kann Natur erleben. Nachteil: Man braucht gutes Wetter. / Es kann anstrengend sein.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Zeitangaben korrekt eingesetzt (morgens / nachmittags / abends)'),
  bullet('Perfekt für vergangene Aktivitäten korrekt gebildet'),
  bullet('Freizeitaktivitäten thematisch passend und abwechslungsreich'),
  bullet('Mindestens 5 vollständige Sätze'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Freizeitaktivitäten und Hobbys — Leseübung'),
  h2('Text: Lenas neue Hobbys in Deutschland'),
  p('Lena Kovac kommt aus Kroatien und wohnt seit anderthalb Jahren in Düsseldorf. Sie arbeitet als Grafikdesignerin bei einer Werbeagentur. Nach der Arbeit hatte sie am Anfang wenig Kontakte und fühlte sich manchmal einsam. Deshalb hat sie beschlossen, neue Hobbys auszuprobieren.'),
  p('Zuerst hat sie sich einem Buchclub angeschlossen. Jeden zweiten Dienstag treffen sich acht Personen — Männer und Frauen zwischen 25 und 60 Jahren — in einem Café in der Altstadt. Sie lesen gemeinsam Romane, meistens auf Deutsch, manchmal auch Übersetzungen. Lena findet das toll: „Es ist nicht nur gut für mein Deutsch — ich lerne auch viele interessante Menschen kennen."'),
  p('Außerdem hat Lena angefangen, Aquarellmalerei zu lernen. Sie geht jeden Samstag in einen Kurs im Kulturzentrum. Der Kurs dauert zwei Stunden und kostet 15 Euro pro Einheit. Die Lehrerin Frau Hofer ist sehr geduldig und lobt Lenas Fortschritte. „Ich hatte keine Ahnung, dass ich malen kann", sagt Lena lachend. „Aber es macht mir riesig Spaß und ich kann dabei wunderbar abschalten."'),
  p('Am Wochenende geht Lena manchmal mit einer Kollegin wandern. Der Schwarzwald ist nicht weit von Düsseldorf entfernt — mit dem Auto etwa zwei Stunden. Lena liebt die frische Luft und die Ruhe. „In Kroatien habe ich auch viel draußen verbracht. Hier in Deutschland vermisse ich das manchmal — aber der Buchclub und der Malkurs helfen mir sehr."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Lena wohnt seit zwei Jahren in Düsseldorf.', ''],
      ['Der Buchclub trifft sich jede Woche.', ''],
      ['Im Buchclub lesen sie immer auf Deutsch.', ''],
      ['Der Aquarellkurs findet samstags statt.', ''],
      ['Der Kurs kostet 15 Euro pro Einheit.', ''],
      ['Lena geht jeden Sonntag wandern.', ''],
      ['Der Schwarzwald ist etwa zwei Stunden entfernt.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum hat Lena neue Hobbys gesucht?'),
  wLine(), wLine(),
  p('b) Was macht Lena im Buchclub und was gefällt ihr daran?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was sagt Lena über die Aquarellmalerei?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was vermisst Lena aus Kroatien?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Hobbys und Aktivitäten: Tabelle'),
  p('Fülle die Tabelle mit Informationen aus dem Text.'),
  stdTable(
    ['Hobby', 'Wann / Wie oft?', 'Kosten', 'Was gefällt Lena?'],
    [
      ['Buchclub', '', '', ''],
      ['Aquarellmalerei', '', '', ''],
      ['Wandern', '', '', ''],
    ],
    [2800, 2800, 1900, 4206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Freizeitaktivitäten und Hobbys'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Lena wohnt seit zwei Jahren in Düsseldorf.', 'F (seit anderthalb Jahren)'],
      ['Der Buchclub trifft sich jede Woche.', 'F (jeden zweiten Dienstag)'],
      ['Im Buchclub lesen sie immer auf Deutsch.', 'F (meistens Deutsch, manchmal Übersetzungen)'],
      ['Der Aquarellkurs findet samstags statt.', 'R'],
      ['Der Kurs kostet 15 Euro pro Einheit.', 'R'],
      ['Lena geht jeden Sonntag wandern.', 'F (manchmal am Wochenende)'],
      ['Der Schwarzwald ist etwa zwei Stunden entfernt.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Sie hatte wenig Kontakte und fühlte sich manchmal einsam.'),
  p('b) Im Buchclub lesen sie Romane und diskutieren darüber. Es ist gut für ihr Deutsch und sie lernt interessante Menschen kennen.'),
  p('c) Sie hatte keine Ahnung, dass sie malen kann — aber es macht ihr riesig Spaß und sie kann dabei abschalten.'),
  p('d) Lena vermisst die Zeit draußen in der Natur aus Kroatien.'),
  ...gap(1),
  h2('Aufgabe 3 — Tabelle'),
  stdTable(
    ['Hobby', 'Wann / Wie oft?', 'Kosten', 'Was gefällt Lena?'],
    [
      ['Buchclub', 'jeden 2. Dienstag', 'nicht genannt', 'Deutsch üben, Menschen kennenlernen'],
      ['Aquarellmalerei', 'jeden Samstag, 2 h', '15 EUR/Einheit', 'kreativ sein, abschalten'],
      ['Wandern', 'manchmal am WE', 'nicht genannt', 'frische Luft, Ruhe'],
    ],
    [2800, 2800, 1900, 4206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Freizeitaktivitäten und Hobbys — Lückentext'),
  infoBox([
    'Wörterkasten: Freizeit  |  Hobby  |  interessieren  |  Spaß  |  anmelden',
    '              ausprobieren  |  treffen  |  langweilig  |  kreativ  |  Verein'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Freizeittext: Fülle die Lücken aus'),
  p('In der ________ kann man viel machen: Sport treiben, lesen, kochen oder ein neues ________ entdecken. Viele Menschen ________ sich für Kunst, Musik oder Fotografie. Andere lieben es, sich mit Freunden zu ________ und gemeinsam Zeit zu verbringen.'),
  p('Wer ein neues Hobby ________ möchte, kann sich zum Beispiel bei einem ________ oder Kurs ________ . Manchmal denkt man: „Das ist nichts für mich" — aber dann macht es plötzlich ________ ! Und wer sagt, ein Hobby sei ________ , hat es vielleicht noch nicht richtig ausprobiert.', { before: 120 }),
  p('Besonders beliebt sind ________ Hobbys wie Malen, Basteln oder Fotografieren — dabei kann man seine eigenen Ideen verwirklichen.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Verabredungs-Dialog: Ergänze'),
  infoBox(['Wörterkasten: Lust  |  vorschlagen  |  treffen  |  passen  |  absagen  |  einverstanden']),
  ...gap(1),
  p('Kai: „Hey Mia, hast du am Samstag ________ , ins Kino zu gehen?"'),
  p('Mia: „Samstag? Moment … nein, das geht leider nicht. Ich muss ________ — ich habe einen anderen Termin."'),
  p('Kai: „Schade. Darf ich etwas anderes ________ ? Wie wäre es mit Sonntagnachmittag?"'),
  p('Mia: „Sonntag würde mir gut ________ . Was möchtest du machen?"'),
  p('Kai: „Wir könnten uns im Park ________ und danach ein Eis essen."'),
  p('Mia: „Das klingt super! Ich bin ________ . Um wie viel Uhr?"'),
  ...gap(1),
  h2('Aufgabe 3 — Nebensätze mit „weil": Ergänze die Begründung'),
  p('Schreibe eine sinnvolle Begründung mit „weil" (Verb am Ende!).'),
  p('a) Ich lese gerne Bücher, weil ________________________.'),
  wLine(),
  p('b) Sport macht mir Spaß, weil ________________________.', { before: 120 }),
  wLine(),
  p('c) Ich gehe manchmal ins Konzert, weil ________________________.', { before: 120 }),
  wLine(),
  p('d) Ich spiele kein Instrument, weil ________________________.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Infinitiv mit „zu": Ergänze'),
  grammarBox([
    '📌  Infinitiv mit zu:',
    'Ich versuche, mehr Sport zu machen.',
    'Es macht Spaß, Gitarre zu spielen.',
    'Ich habe keine Zeit, ins Kino zu gehen.',
    'Ich habe angefangen, Spanisch zu lernen.',
    '❗ Bei trennbaren Verben: zu steht zwischen Präfix und Verb: aufzuhören / anzufangen',
  ]),
  ...gap(1),
  p('Ergänze den Satz mit dem Infinitiv + zu.'),
  p('a) Es macht mir Spaß, ________ (Fotos machen).'),
  p('b) Ich versuche, jeden Tag ________ (lesen).'),
  p('c) Sie hat keine Zeit, ________ (ins Fitnessstudio gehen).'),
  p('d) Er hat angefangen, ________ (Gitarre spielen).'),
  p('e) Wir planen, am Wochenende ________ (wandern gehen).'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Freizeitaktivitäten und Hobbys'),
  h2('Aufgabe 1'),
  p('1. Freizeit  2. Hobby  3. interessieren  4. treffen  5. ausprobieren'),
  p('6. Verein  7. anmelden  8. Spaß  9. langweilig  10. kreativ'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Lust  2. absagen  3. vorschlagen  4. passen  5. treffen  6. einverstanden'),
  ...gap(1),
  h2('Aufgabe 3 — weil-Sätze (Muster)'),
  p('a) … weil ich dabei entspannen und in andere Welten eintauchen kann.'),
  p('b) … weil ich danach viel Energie habe und mich gut fühle.'),
  p('c) … weil mir Livemusik sehr gut gefällt.'),
  p('d) … weil ich nie gelernt habe, eines zu spielen. / … weil ich keine Zeit zum Üben habe.'),
  p('Hinweis: Verb steht am Ende des weil-Satzes!', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Infinitiv mit zu'),
  p('a) Fotos zu machen'),
  p('b) zu lesen'),
  p('c) ins Fitnessstudio zu gehen'),
  p('d) Gitarre zu spielen'),
  p('e) wandern zu gehen'),
  grammarBox([
    '📌  Infinitiv mit zu — Ausnahmen (kein „zu"):',
    'Nach Modalverben: Ich kann Gitarre spielen. (KEIN zu)',
    'Nach lassen, sehen, hören: Ich höre ihn singen. (KEIN zu)',
    'Nach werden (Futur): Ich werde Tennis spielen. (KEIN zu)',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Freizeitaktivitäten und Hobbys — Wortliste'),
  h2('Teil A — Freizeitaktivitäten'),
  stdTable(
    ['Aktivität', 'Verb', 'Beispielsatz'],
    [
      ['Lesen', 'lesen', 'Ich lese gerne Krimis und Biografien.'],
      ['Malen / Zeichnen', 'malen / zeichnen', 'Sie malt in ihrer Freizeit Aquarelle.'],
      ['Fotografieren', 'fotografieren', 'Er fotografiert Stadtlandschaften.'],
      ['Kochen / Backen', 'kochen / backen', 'Am Wochenende backe ich gerne Kuchen.'],
      ['Wandern', 'wandern gehen', 'Wir gehen jeden Monat wandern.'],
      ['Tanzen', 'tanzen', 'Sie geht donnerstags zum Tanzkurs.'],
      ['Musik machen', 'spielen / singen', 'Er spielt Gitarre in einer Band.'],
      ['Reisen', 'reisen / verreisen', 'In den Ferien reise ich gerne.'],
      ['Gartenarbeit', 'im Garten arbeiten', 'Gartenarbeit entspannt mich.'],
      ['Ehrenamtlich arbeiten', 'sich engagieren', 'Sie engagiert sich beim Roten Kreuz.'],
    ],
    [2800, 2800, 6106]
  ),
  ...gap(1),
  h2('Teil B — Verabredungen und Pläne'),
  stdTable(
    ['Ausdruck', 'Bedeutung', 'Beispiel'],
    [
      ['Hast du Lust, … zu …?', 'Einladung / Vorschlag', 'Hast du Lust, ins Kino zu gehen?'],
      ['Ich schlage vor, …', 'Vorschlag machen', 'Ich schlage vor, ins Museum zu gehen.'],
      ['Das passt mir gut.', 'Zustimmung', 'Samstag? Das passt mir gut!'],
      ['Ich muss leider absagen.', 'Ablehnung', 'Tut mir leid, ich muss absagen.'],
      ['Wäre das okay für dich?', 'Rückfrage', 'Wir treffen uns um 15 Uhr — wäre das okay?'],
      ['Ich bin dabei!', 'enthusiastische Zusage', 'Kino und Pizza danach? Ich bin dabei!'],
      ['sich verabreden mit', 'reflexiv', 'Ich verabrede mich mit Freunden.'],
      ['sich anmelden für', 'reflexiv + Präp.', 'Er meldet sich für einen Kochkurs an.'],
    ],
    [3500, 2800, 5406]
  ),
  ...gap(1),
  grammarBox([
    '📌  Verben mit Infinitiv + zu:',
    'Lust haben zu: Ich habe Lust, ins Kino zu gehen.',
    'anfangen zu: Ich habe angefangen, Yoga zu machen.',
    'aufhören zu: Er hat aufgehört, Videospiele zu spielen.',
    'versuchen zu: Ich versuche, jeden Tag zu lesen.',
    'planen zu: Wir planen, am Wochenende wandern zu gehen.',
    'vergessen zu: Ich habe vergessen, das Buch zurückzugeben.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Freizeit: ___________  |  das Hobby: ___________  |  sich verabreden: ___________'),
  p('sich anmelden: ___________  |  ausprobieren: ___________  |  kreativ: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Freizeitaktivitäten und Hobbys'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    '📌  Reflexive Verben mit Präpositionen:',
    'sich interessieren für + Akk.: Ich interessiere mich für Musik.',
    'sich anmelden für + Akk.: Er meldet sich für den Kurs an.',
    'sich verabreden mit + Dat.: Ich verabrede mich mit meiner Freundin.',
    'sich freuen auf + Akk.: Wir freuen uns auf das Konzert.',
    '',
    '📌  Trennbare Verben:',
    'ausprobieren: Ich probiere das neue Hobby aus.',
    'anmelden: Sie meldet sich beim Verein an.',
    'vorbereiten: Er bereitet das Konzert vor.',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich interessiere mich sehr für Fotografie — ich probiere immer neue Techniken aus.'),
  p('Hast du Lust, dich am Wochenende mit mir zu verabreden? Ich habe mich für einen Tanzkurs angemeldet!'),
  p('In meiner Freizeit lese ich viel, male manchmal und gehe einmal pro Woche wandern.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Freizeitaktivitäten und Hobbys — Konversation'),
  h2('Aufgabe 1 — Dialog: Hobbys vorstellen und nachfragen'),
  p('Zwei Personen lernen sich kennen und reden über ihre Freizeit. Ergänzt den Dialog und spielt ihn durch.'),
  infoBox([
    '💬  Tipps für das Gespräch:',
    'Interessen nennen: Ich interessiere mich sehr für … / Mein Lieblingshobbys ist …',
    'Nachfragen: Wie lange machst du das schon? / Was gefällt dir daran?',
    'Reaktionen: Das klingt interessant! / Das kenne ich auch! / Das habe ich noch nie ausprobiert.',
    'Einladung: Hast du Lust, das mal zusammen auszuprobieren?',
  ]),
  ...gap(1),
  p('Person A: „Was machst du eigentlich in deiner Freizeit?"'),
  p('Person B: „Ich ________________________. Und du?"'),
  p('Person A: „Ich ________________________. Das mache ich schon seit ________________________."'),
  p('Person B: „Interessant! Was gefällt dir daran?"'),
  p('Person A: „________________________, weil ________________________."'),
  p('Person B: „Das klingt toll. Ich habe noch nie ________________________ ausprobiert."'),
  p('Person A: „Hast du Lust, das mal ________________________?"'),
  p('Person B: „________________________. Wann und wo?"'),
  p('Person A: „Am besten ________________________. Passt dir das?"'),
  p('Person B: „________________________!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Verabredung treffen (Karten A und B)'),
  stdTable(
    ['Person A', 'Person B'],
    [
      ['Ruf Person B an.', 'Nimm das Telefon ab: „Hallo?"'],
      ['Schlage eine Freizeitaktivität vor (z. B. Kino, Wandern, Museum, Konzert).', 'Reagiere: Zustimmung oder Ablehnung mit Begründung.'],
      ['Falls B ablehnt: schlage eine Alternative vor.', 'Stimme der Alternative zu oder schlage selbst etwas vor.'],
      ['Kläre Details: Wann? Wo? Wie kommen wir hin?', 'Bestätige die Details.'],
      ['Verabschiede dich bis zum Treffen.', 'Verabschiede dich fröhlich.'],
    ],
    [5703, 5703]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Freizeit und Hobbys'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Was ist dein Lieblingshobbys und seit wann?', ''],
      ['Was machst du am liebsten am Wochenende?', ''],
      ['Welches Hobby würdest du gerne ausprobieren?', ''],
      ['Was hast du früher in deiner Heimat in der Freizeit gemacht?', ''],
      ['Gehst du in Deutschland in einen Verein oder Kurs?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Zwei Lügen, eine Wahrheit"'),
  p('Jede Person nennt drei Aussagen über ihre Hobbys — zwei davon sind gelogen, eine ist wahr. Die Gruppe rät, welche wahr ist.'),
  infoBox([
    '💡  Beispiel:',
    '1. „Ich spiele seit fünf Jahren Schach." (wahr/gelogen?)',
    '2. „Ich habe einen Tanzkurs auf Kuba gemacht." (wahr/gelogen?)',
    '3. „Ich kann keine einzige Note lesen." (wahr/gelogen?)',
    'Gruppe: „Ich glaube, Aussage 2 ist wahr, weil …"',
    'Dann aufdecken: Welche ist wirklich wahr?',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Freizeitaktivitäten und Hobbys'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Hobbys konkret und vollständig beschrieben'),
  bullet('Infinitiv mit zu korrekt verwendet (Lust haben zu / versuchen zu)'),
  bullet('Begründungen mit weil (Verb am Ende)'),
  bullet('Natürliche Reaktionen und Rückfragen'),
  bullet('Korrekte Verbformen (Präsens + Perfekt)'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('B: „Ich male gerne Aquarelle und gehe manchmal wandern. Und du?"'),
  p('A: „Ich fotografiere gerne. Das mache ich schon seit drei Jahren."'),
  p('B: „Interessant! Was gefällt dir daran?"'),
  p('A: „Ich mag es, weil ich dabei kreativ sein kann und die Welt anders sehe."'),
  p('B: „Das klingt toll. Ich habe noch nie professionell fotografiert."'),
  p('A: „Hast du Lust, das mal zusammen auszuprobieren?" / B: „Ja, sehr gerne! Wann und wo?"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Verabredung'),
  p('A: „Hast du am Samstag Lust, ins Museum zu gehen?" / B: „Samstag passt mir leider nicht — ich habe einen anderen Termin."'),
  p('A: „Wie wäre es mit Sonntagnachmittag?" / B: „Sonntag ist perfekt! Um wie viel Uhr?"'),
  p('A: „Um 14 Uhr vor dem Eingang. Das Museum ist mit der U-Bahn gut erreichbar."'),
  p('B: „Super, ich bin dabei! Bis Sonntag!"'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweis'),
  p('Lehrkraft achtet auf: vollständige Sätze, korrekte Verbformen, glaubwürdige Lügen. Auch Korrektheit der ratenden Gruppe bewerten (weil-Begründung).', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Freizeitaktivitäten und Hobbys — Bildaufgaben'),
  h2('Aufgabe 1 — Freizeitaktivitäten benennen'),
  p('[BILD 1: Acht Personen bei verschiedenen Freizeitaktivitäten: (1) Person liest ein Buch, (2) Person malt, (3) Person spielt Gitarre, (4) Person wandert in der Natur, (5) Person kocht, (6) Person fotografiert, (7) Person tanzt, (8) Person gärtnert]'),
  p('Beschreibe jede Person in einem Satz. Benutze: „Die Person …" oder „Er/Sie …"'),
  stdTable(
    ['Nr.', 'Aktivität (vollständiger Satz)'],
    [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', ''], ['7', ''], ['8', '']],
    [800, 10906]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Freizeitangebot: Flyer lesen'),
  p('[BILD 2: Ein Flyer des Kulturzentrums Düsseldorf-Mitte mit folgenden Kursen: Aquarellmalerei (Sa 10–12 Uhr, 15 €/Einheit, ab 5 Personen) / Spanisch für Anfänger (Di + Do 18–19:30 Uhr, 89 €/Monat) / Buchclub (jeden 2. Di, kostenlos, Anmeldung erforderlich) / Yoga (Mo + Mi 19–20 Uhr, 60 €/Monat)]'),
  p('Beantworte die Fragen zum Flyer.'),
  p('a) Welcher Kurs ist kostenlos?'),
  wLine(),
  p('b) An welchen Tagen findet der Yoga-Kurs statt?', { before: 120 }),
  wLine(),
  p('c) Du möchtest malen lernen. Was musst du beachten?', { before: 120 }),
  wLine(), wLine(),
  p('d) Welchen Kurs würdest du wählen? Warum? (2 Sätze)', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Wochenend-Szene beschreiben'),
  p('[BILD 3: Eine Gruppe von vier Freunden im Park an einem sonnigen Samstag: zwei spielen Frisbee, eine Person liegt auf einer Decke und liest, eine Person macht Fotos. Im Hintergrund: Picknickkörbe, Fahrräder, Bäume.]'),
  p('a) Beschreibe die Szene in 3–4 Sätzen. Was machen die Personen?'),
  wLine(), wLine(), wLine(), wLine(),
  p('b) Was könnte die Gruppe danach noch machen? Schreibe 2 Vorschläge mit „könnten".', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Terminkalender'),
  p('[BILD 4: Ein Wochenkalender einer Person: Mo: Yogakurs 19 Uhr / Di: Buchclub 20 Uhr / Mi: frei / Do: Spanischkurs 18 Uhr / Fr: Konzert mit Maria 20 Uhr / Sa: Wanderung mit Lars, 9 Uhr / So: zu Hause — Malen]'),
  p('a) An welchem Tag hat die Person keine geplante Aktivität?'),
  wLine(),
  p('b) Welche Aktivität macht die Person alleine, welche mit anderen?', { before: 120 }),
  wLine(), wLine(),
  p('c) Du möchtest dich am Donnerstagabend verabreden. Geht das? Begründe.', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Freizeitaktivitäten und Hobbys'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Freizeitaktivitäten (Muster)'),
  p('1. Die Person liest ein Buch. / Sie liest in ihrer Freizeit.'),
  p('2. Die Person malt ein Bild. / Er malt Aquarelle.'),
  p('3. Die Person spielt Gitarre. / Er macht Musik.'),
  p('4. Die Person wandert in der Natur. / Sie geht wandern.'),
  p('5. Die Person kocht. / Er kocht in der Küche.'),
  p('6. Die Person fotografiert. / Sie macht Fotos.'),
  p('7. Die Person tanzt. / Er tanzt.'),
  p('8. Die Person arbeitet im Garten. / Sie gärtnert.'),
  ...gap(1),
  h2('Aufgabe 2 — Flyer'),
  p('a) Der Buchclub ist kostenlos.'),
  p('b) Yoga findet montags und mittwochs statt (19–20 Uhr).'),
  p('c) Der Aquarellkurs findet samstags von 10–12 Uhr statt und kostet 15 € pro Einheit. Mindestens 5 Personen müssen angemeldet sein.'),
  p('d) Individuelle Antwort. z. B.: „Ich würde den Buchclub wählen, weil er kostenlos ist und ich Deutsch üben kann."'),
  ...gap(1),
  h2('Aufgabe 3 — Park-Szene'),
  p('a) Eine Gruppe von vier Freunden verbringt einen sonnigen Samstag im Park. Zwei Personen spielen Frisbee. Eine Person liegt auf einer Decke und liest. Eine andere Person macht Fotos. Im Hintergrund sieht man Fahrräder und Picknickkörbe.'),
  p('b) Sie könnten danach zusammen essen gehen. / Sie könnten noch eine Runde Fahrrad fahren.'),
  ...gap(1),
  h2('Aufgabe 4 — Kalender'),
  p('a) Am Mittwoch hat die Person keine geplante Aktivität.'),
  p('b) Alleine: Yoga (Mo), Malen (So). Mit anderen: Buchclub (Di), Spanischkurs (Do), Konzert mit Maria (Fr), Wanderung mit Lars (Sa).'),
  p('c) Nein, das geht nicht — am Donnerstag hat sie den Spanischkurs von 18 Uhr an.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
