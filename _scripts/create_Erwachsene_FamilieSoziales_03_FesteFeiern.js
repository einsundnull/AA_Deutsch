// A2_Erwachsene — Thema 08 UP 03: Feste und Feiern
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Feste und Feiern';
const HEADING = 'Thema 08 — Familie & soziales Leben';
const SUBHEAD = 'UP 03: Feste und Feiern';
const PREFIX  = 'A2_Erwachsene_FamilieSoziales_03_FesteFeiern';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '08_FamilieSoziales', '03_FesteFeiern');
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
const festBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'BF360C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'BF360C' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'BF360C' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'BF360C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FBE9E7' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Feste und Feiern — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Feste und Feiern:',
    'Glückwünsche: Herzlichen Glückwunsch zum Geburtstag! / Alles Gute! / Ich wünsche dir …',
    'Weihnachten: Frohe Weihnachten! / Frohes Fest! / Schöne Feiertage!',
    'Silvester/Neujahr: Guten Rutsch ins neue Jahr! / Frohes neues Jahr!',
    'Hochzeit: Herzlichen Glückwunsch zur Hochzeit! / Alles Gute für euren gemeinsamen Weg!',
    'Geburt: Herzlichen Glückwunsch zur Geburt! / Willkommen in der Welt, kleiner Schatz!',
    'Vergleich mit Heimat: Bei uns feiert man … anders als in Deutschland.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Glückwunschkarte schreiben'),
  p('Schreiben Sie eine kurze Glückwunschkarte (4–5 Sätze) zu einem Fest Ihrer Wahl (Geburtstag, Hochzeit, Weihnachten, Silvester oder ein Fest aus Ihrer Heimat). Benutzen Sie Konjunktiv II für gute Wünsche.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Ein Fest beschreiben'),
  p('Beschreiben Sie ein wichtiges Fest aus Ihrer Heimat oder aus Deutschland (5–6 Sätze). Beantworten Sie:'),
  bullet('Wie heißt das Fest und wann wird es gefeiert?'),
  bullet('Was macht man dabei? (Traditionen, Speisen, Aktivitäten)'),
  bullet('Mit wem feiert man es normalerweise?'),
  bullet('Was bedeutet dieses Fest für Sie persönlich?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Vergleichssätze: Feste in verschiedenen Kulturen'),
  grammarBox([
    'Vergleiche ausdrücken:',
    'während (Konj.): Während man in Deutschland … feiert, feiert man in … anders.',
    'wohingegen:      In Deutschland gibt es Weihnachtsmärkte, wohingegen in … …',
    'im Gegensatz zu: Im Gegensatz zu Deutschland feiert man in … …',
    'ähnlich wie:     Ähnlich wie in Deutschland gibt es auch in … … Traditionen.',
    'Präteritum in Vergleichen: Früher hat man … gefeiert / hatten wir immer …',
  ]),
  ...gap(1),
  p('Schreibe Vergleichssätze zwischen einem deutschen und einem anderen Fest.'),
  p('a) Deutschland: Weihnachten am 24. Dezember / andere Kultur: Schreiben Sie einen Vergleich.'),
  wLine(), wLine(),
  p('b) Deutschland: Silvester mit Feuerwerk / andere Kultur:', { before: 120 }),
  wLine(), wLine(),
  p('c) Deutschland: Geburtstagskind bezahlt oft selbst / andere Kulturen:', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Festbeschreibung mit Nebensätzen'),
  p('Schreiben Sie 4 Sätze über ein Fest — jeder Satz muss einen anderen Nebensatz enthalten: weil / obwohl / wenn / als.'),
  wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Feste und Feiern'),
  grammarBox([
    'Nebensatz-Übersicht für Festbeschreibungen:',
    'weil  (Grund):    Ich liebe Weihnachten, weil die ganze Familie zusammenkommt.',
    'obwohl (Gegensatz): Obwohl ich nicht religiös bin, feiere ich Weihnachten gerne.',
    'wenn  (Bedingung/Wiederholung): Wenn Ostern kommt, suchen wir Ostereier im Garten.',
    'als   (einmaliges Ereignis in Vergangenheit): Als ich zum ersten Mal Silvester in Berlin war, …',
    'Verb immer ans Ende des Nebensatzes!',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Glückwunschkarte'),
  p('Liebe Selin! Herzlichen Glückwunsch zu deinem Geburtstag! Ich wünsche dir alles Gute, viel Gesundheit und viele schöne Momente mit deiner Familie. Möge das neue Lebensjahr dir viele Freude und Erfolg bringen! Ich freue mich sehr auf euren gemeinsamen Abend. Liebe Grüße!'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Festbeschreibung'),
  bullet('Fest klar benannt (Name, Datum/Jahreszeit)'),
  bullet('Mindestens 2 Traditionen oder Aktivitäten beschrieben'),
  bullet('Soziale Komponente: mit wem man feiert'),
  bullet('Persönliche Bedeutung ausgedrückt (weil-Satz)'),
  bullet('Temporale Angaben: am … / im … / wenn … / jedes Jahr …'),
  ...gap(1),
  h2('Aufgabe 3 — Vergleichssätze'),
  p('a) Während man in Deutschland Weihnachten am 24. Dezember feiert, ist in Russland der Heilige Abend am 6. Januar nach dem orthodoxen Kalender.'),
  p('b) In Deutschland feiert man Silvester mit Feuerwerk auf der Straße, wohingegen in Japan das neue Jahr ruhig im Tempelbereich mit Gebeten begangen wird.'),
  p('c) Im Gegensatz zu Deutschland, wo das Geburtstagskind oft selbst einlädt und bezahlt, wird in vielen anderen Kulturen das Geburtstagskind von den Gästen verwöhnt.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('weil-Satz: Verb am Ende'),
  bullet('obwohl-Satz: Verb am Ende, Gegensatz erkennbar'),
  bullet('wenn-Satz: Präsens für Wiederholung oder Zukunft'),
  bullet('als-Satz: Präteritum für einmaliges Ereignis in Vergangenheit'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Feste und Feiern — Leseübung'),
  h2('Text: Mehmets erstes Weihnachten in Deutschland'),
  p('Mehmet Arslan kommt aus der Türkei und lebt seit drei Jahren in Düsseldorf. Er ist Muslim und hat in seiner Kindheit nie Weihnachten gefeiert — dieses Fest kannte er nur aus Filmen und aus dem Fernsehen. Als er nach Deutschland kam, war er sehr überrascht: Schon Anfang November beginnen die Deutschen mit der Weihnachtsdekoration in den Geschäften.'),
  p('Im ersten Jahr hat Mehmets Kollege Stefan ihn zu einem Weihnachtsmarkt eingeladen. „Ich war total begeistert", erzählt Mehmet. „Die Lichter, der Glühwein, die Musik — das war wie eine andere Welt." Er hat Lebkuchen probiert und gebratene Mandeln gekauft — beides hat ihm sehr gut geschmeckt.'),
  p('Im zweiten Jahr hat Mehmet dann selbst eine kleine Feier veranstaltet. Er hat seine deutschen und internationalen Kollegen eingeladen — insgesamt zwölf Personen. „Ich habe keinen Weihnachtsbaum aufgestellt, aber ich habe Lichter aufgehängt und ein großes Buffet vorbereitet: türkisches Essen, aber auch Weihnachtsplätzchen, die mir eine Kollegin gebacken hatte."'),
  p('Für Mehmet ist Weihnachten inzwischen nicht mehr fremd. „Ich feiere es nicht religiös, aber es ist eine schöne Zeit, um zusammenzukommen", sagt er. „In der Türkei haben wir das Zuckerfest — wenn die Familie zusammenkommt, Spezialitäten kocht und Gäste empfängt. Das ist im Gefühl sehr ähnlich wie hier das Weihnachtsfest."'),
  p('Dieses Jahr plant Mehmet, mit seiner Familie aus der Türkei zu skypen und ihnen vom deutschen Weihnachtsbrauch zu erzählen. „Meine Mutter fragt jedes Jahr: Habt ihr wieder Glühwein getrunken?", lacht er. „Ja, Mama — und er ist immer noch lecker!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Mehmet hat in der Türkei regelmäßig Weihnachten gefeiert.', ''],
      ['Weihnachtsschmuck erscheint in Deutschland oft schon im November.', ''],
      ['Mehmet hat im ersten Jahr einen Weihnachtsmarkt mit seinem Kollegen besucht.', ''],
      ['Bei seiner eigenen Feier hat Mehmet einen Weihnachtsbaum aufgestellt.', ''],
      ['Mehmet hat für die Feier nur türkisches Essen vorbereitet.', ''],
      ['Mehmet vergleicht Weihnachten mit dem Zuckerfest in der Türkei.', ''],
      ['Mehmets Mutter interessiert sich nicht für seine Zeit in Deutschland.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Was hat Mehmet beim ersten Weihnachtsmarkt-Besuch überrascht oder begeistert?'),
  wLine(), wLine(),
  p('b) Wie hat Mehmet seine eigene Feier gestaltet?', { before: 120 }),
  wLine(), wLine(),
  p('c) Warum vergleicht Mehmet Weihnachten mit dem Zuckerfest?', { before: 120 }),
  wLine(), wLine(),
  p('d) Wie zeigt die Geschichte, dass Mehmet gut in Deutschland angekommen ist?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Feste vergleichen'),
  stdTable(
    ['Merkmal', 'Weihnachten (Deutschland)', 'Zuckerfest / eigenes Fest'],
    [
      ['Zeitpunkt', '', ''],
      ['Wer feiert zusammen?', '', ''],
      ['Typisches Essen / Trinken', '', ''],
      ['Atmosphäre / Gefühl', '', ''],
    ],
    [3200, 3900, 4606]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Feste und Feiern'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Mehmet hat in der Türkei regelmäßig Weihnachten gefeiert.', 'F (nie gefeiert)'],
      ['Weihnachtsschmuck erscheint in Deutschland oft schon im November.', 'R'],
      ['Mehmet hat im ersten Jahr einen Weihnachtsmarkt mit seinem Kollegen besucht.', 'R'],
      ['Bei seiner eigenen Feier hat Mehmet einen Weihnachtsbaum aufgestellt.', 'F (keine Baum, aber Lichter)'],
      ['Mehmet hat für die Feier nur türkisches Essen vorbereitet.', 'F (auch Weihnachtsplätzchen)'],
      ['Mehmet vergleicht Weihnachten mit dem Zuckerfest in der Türkei.', 'R'],
      ['Mehmets Mutter interessiert sich nicht für seine Zeit in Deutschland.', 'F (sie fragt jedes Jahr nach)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Die Lichter, der Glühwein und die Musik haben ihn begeistert — es war wie eine andere Welt für ihn.'),
  p('b) Er hat Lichter aufgehängt, ein Buffet mit türkischem Essen und Weihnachtsplätzchen vorbereitet, ohne Weihnachtsbaum.'),
  p('c) Beide Feste verbinden Familie, besondere Speisen und Gemeinschaft — das Grundgefühl ist ähnlich.'),
  p('d) Er lädt Kollegen ein, kennt Traditionen, genießt Glühwein und bezieht seine Familie in Deutschland per Skype ein.'),
  ...gap(1),
  h2('Aufgabe 3 — Vergleich'),
  stdTable(
    ['Merkmal', 'Weihnachten', 'Zuckerfest (Beispiel)'],
    [
      ['Zeitpunkt', '24.–26. Dezember', 'nach dem Ramadan (variabler Termin)'],
      ['Wer feiert?', 'Familie, Freunde, Kollegen', 'Familie, Verwandte, Nachbarn'],
      ['Essen/Trinken', 'Glühwein, Plätzchen, Gans', 'Baklava, Spezialitäten, Süßigkeiten'],
      ['Atmosphäre', 'festlich, gemütlich, ruhig', 'festlich, familiär, Besuche'],
    ],
    [3200, 3900, 4606]
  ),
  p('Hinweis: Spalte 3 akzeptiert individuelle Antworten — andere Feste aus anderen Kulturen sind willkommen.', { italics: true, color: '888888' }),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Feste und Feiern — Lückentext'),
  infoBox([
    'Wörterkasten: Traditionen  |  schmücken  |  Glückwünsche  |  feiern  |  Bräuche',
    '              Geschenke  |  Feuerwerk  |  zusammenkommen  |  Kerzen  |  Silvester'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Feste-Text: Fülle die Lücken aus'),
  p('In Deutschland gibt es viele Feste und ________. Weihnachten ist das bekannteste Fest — man ________ die Wohnung mit einem Tannenbaum, ________ und Lichterketten. Die Familie ________ meist am 24. Dezember zusammen, tauscht ________ aus und isst zusammen.'),
  p('Am 31. Dezember feiert man ________ — den letzten Tag des Jahres. Um Mitternacht gibt es überall ________, und alle singen oder stoßen mit Sekt an. Es ist Tradition, sich gegenseitig ________ für das neue Jahr zu wünschen.', { before: 120 }),
  p('Jede Kultur hat ihre eigenen ________ — Rituale und Gewohnheiten, die man von Generation zu Generation weitergibt. Wenn man in einem anderen Land lebt, lernt man neue Feste kennen und kann eigene ________ mit neuen Freunden teilen.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Über ein Fest sprechen: Dialog ergänzen'),
  infoBox(['Wörterkasten: gefeiert  |  ähnlich  |  verschieden  |  Tradition  |  erinnere  |  Brauch']),
  ...gap(1),
  p('Person A: „Wie hast du letztes Weihnachten ________?"'),
  p('Person B: „Sehr schön — wir waren bei meinen Eltern. Es ist bei uns ________, dass die ganze Familie zusammenkommt."'),
  p('Person A: „Ist das in deiner Heimat ________ oder ________ als hier?"'),
  p('Person B: „Es ist ziemlich ________ — Familie, Essen, Geschenke. Aber der ________ ist etwas anders: Bei uns gibt es keine Weihnachtsmärkte."'),
  p('Person A: „Gibt es ein Fest, das du aus deiner Kindheit besonders gut ________?"'),
  p('Person B: „Ja, das Erntedankfest bei meinen Großeltern — das war immer magisch."'),
  ...gap(1),
  h2('Aufgabe 3 — Nebensätze mit als und wenn'),
  grammarBox([
    'als vs. wenn — Unterschied:',
    'als:  einmaliges Ereignis in der Vergangenheit',
    '  Als ich zum ersten Mal Glühwein getrunken habe, fand ich ihn zu süß.',
    '  Als ich Kind war, feierten wir Weihnachten immer bei den Großeltern.',
    'wenn: Wiederholung (Vergangenheit und Gegenwart) ODER Zukunft/Bedingung',
    '  Wenn Weihnachten kommt, kaufe ich immer einen Tannenbaum.',
    '  Wenn ich als Kind Geschenke bekam, war ich sehr aufgeregt.',
  ]),
  ...gap(1),
  p('Ergänze als oder wenn.'),
  p('a) ________ ich zum ersten Mal einen Weihnachtsmarkt besucht habe, war ich begeistert.'),
  p('b) ________ Silvester kommt, schaue ich immer das Feuerwerk am Fernsehturm.'),
  p('c) ________ wir Kinder waren, haben wir Ostern im Garten gefeiert.'),
  p('d) ________ meine Mutter Geburtstag hat, backe ich immer ihren Lieblingstorte.'),
  p('e) ________ ich das erste Mal in Deutschland Fasching erlebt habe, war ich sehr überrascht.'),
  p('f) ________ es schneit, sieht die Stadt aus wie auf einer Weihnachtskarte.'),
  ...gap(1),
  h2('Aufgabe 4 — Temporale Präpositionen: an / in / zu / an / bei'),
  grammarBox([
    'Temporale Präpositionen bei Festen:',
    'an + Dat. (Tage/Feiertage): am ersten Weihnachtstag / am Heiligen Abend / am Silvesterabend',
    'in + Dat. (Monate/Jahreszeiten/Jahre): im Dezember / im Winter / im Jahr 2025',
    'zu + Dat. (Feste als Anlass): zu Weihnachten / zu Ostern / zu meinem Geburtstag',
    'bei + Dat. (Gelegenheit): beim Feiern / bei der Feier / beim Fest',
  ]),
  ...gap(1),
  p('Ergänze die richtige Präposition (und ggf. den Artikel).'),
  p('a) ________ Weihnachten schenke ich meiner Mutter immer Blumen.'),
  p('b) ________ 24. Dezember kommt die ganze Familie zusammen.'),
  p('c) ________ Dezember sind die Weihnachtsmärkte in fast jeder Stadt geöffnet.'),
  p('d) Ich habe ________ meiner Hochzeit sehr viele Glückwünsche bekommen.'),
  p('e) ________ Silvesterfeier haben wir bis 3 Uhr getanzt.'),
  p('f) ________ Neujahr wünscht man sich gegenseitig alles Gute.'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Feste und Feiern'),
  h2('Aufgabe 1'),
  p('1. Traditionen  2. schmückt  3. Kerzen  4. kommt … zusammen  5. Geschenke'),
  p('6. Silvester  7. Feuerwerk  8. Glückwünsche  9. Bräuche  10. Traditionen / Bräuche'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. gefeiert  2. Tradition / Brauch  3. ähnlich  4. verschieden  5. ähnlich  6. Brauch  7. erinnere'),
  ...gap(1),
  h2('Aufgabe 3 — als / wenn'),
  p('a) Als  (einmalig in der Vergangenheit — erster Besuch)'),
  p('b) Wenn  (Wiederholung — jedes Jahr)'),
  p('c) Als  (einmalig abgeschlossene Zeit — Kindheit ist vorbei)'),
  p('d) Wenn  (Wiederholung — jedes Jahr wenn Geburtstag ist)'),
  p('e) Als  (einmalig — erstes Erlebnis)'),
  p('f) Wenn  (Bedingung / Wiederholung — immer wenn es schneit)'),
  grammarBox([
    'Merkhilfe als vs. wenn:',
    'als → EINMAL in der Vergangenheit: "als ich 10 war" / "als ich ankam"',
    'wenn → IMMER WIEDER (Vergangenheit): "wenn wir uns trafen"',
    'wenn → ZUKUNFT / BEDINGUNG: "wenn er kommt" / "wenn es schneit"',
    'Tipp: Kann man "jedes Mal" ergänzen? → wenn. Nur einmal? → als.',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Temporale Präpositionen'),
  p('a) Zu Weihnachten'),
  p('b) Am 24. Dezember'),
  p('c) Im Dezember'),
  p('d) Bei / Zu meiner Hochzeit  (beides akzeptieren)'),
  p('e) Bei der Silvesterfeier'),
  p('f) Zu Neujahr / An Neujahr  (beides akzeptieren)'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Feste und Feiern — Wortliste'),
  h2('Teil A — Feste und Feiern'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['das Fest, -e', 'Nomen', 'Weihnachten ist das größte Fest des Jahres.'],
      ['die Tradition, -en', 'Nomen', 'Es ist eine Tradition, an Silvester Feuerwerk zu zünden.'],
      ['der Brauch, Bräuche', 'Nomen', 'Das ist ein alter Brauch in unserer Familie.'],
      ['feiern', 'Verb', 'Wir feiern Geburtstage immer zusammen.'],
      ['schmücken', 'Verb', 'Wir schmücken den Weihnachtsbaum am 24. Dezember.'],
      ['zusammenkommen (trennb.)', 'Verb', 'Zu Ostern kommt die ganze Familie zusammen.'],
      ['Glückwünsche aussprechen', 'Ausdruck', 'Man spricht Glückwünsche zum Geburtstag aus.'],
      ['anstoßen (trennb.)', 'Verb', 'Um Mitternacht stoßen wir mit Sekt an.'],
      ['die Kerze, -n', 'Nomen', 'Auf dem Adventskranz brennen vier Kerzen.'],
      ['überreichen', 'Verb', 'Er hat ihr einen Blumenstrauß überreicht.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Deutsche Feste und Traditionen'),
  stdTable(
    ['Fest', 'Zeitpunkt', 'Typisch'],
    [
      ['Weihnachten', '24.–26. Dezember', 'Tannenbaum, Bescherung, Weihnachtsmarkt, Glühwein'],
      ['Silvester / Neujahr', '31. Dez. / 1. Jan.', 'Feuerwerk, Sektanstoßen, Guten Rutsch!'],
      ['Ostern', 'März/April', 'Ostereier suchen, Osterhase, Familienessen'],
      ['Karneval / Fasching', 'Januar–März (je nach Region)', 'Verkleidung, Umzüge, Konfetti'],
      ['Erntedankfest', 'Oktober', 'Kirche, Dekorationen aus Früchten und Getreide'],
      ['Muttertag', '2. Sonntag im Mai', 'Blumen schenken, Frühstück servieren'],
    ],
    [2800, 2800, 6106]
  ),
  ...gap(1),
  festBox([
    'Feste feiern in Deutschland — Kulturhinweise:',
    'Geburtstag: In Deutschland lädt das Geburtstagskind oft selbst ein und bezahlt.',
    'Pünktlichkeit: Zu Feiern kommt man 5–15 Minuten zu spät — nie zu früh!',
    'Mitbringsel: Blumen, Wein oder ein kleines Geschenk sind üblich.',
    'Anstoßen: Beim Anstoßen schaut man sich in die Augen — das bringt Glück!',
    'Weihnachtsmarkt: Besonders beliebt in Nürnberg, Köln, Straßburg.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('das Fest: ___________  |  feiern: ___________  |  die Tradition: ___________'),
  p('schmücken: ___________  |  anstoßen: ___________  |  der Brauch: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Feste und Feiern'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Feste-Verben — Perfekt:',
    'feiern        → hat gefeiert',
    'schmücken     → hat geschmückt',
    'zusammenkommen → ist zusammengekommen (trennb., Bewegung/Zustand)',
    'anstoßen      → hat angestoßen (trennb.)',
    'überreichen   → hat überreicht',
    'einladen      → hat eingeladen (trennb.)',
    'vorbereiten   → hat vorbereitet (trennb.)',
    'aufhängen     → hat aufgehängt (trennb.)',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Als ich zum ersten Mal einen deutschen Weihnachtsmarkt besucht habe, hat mir der Glühwein sehr gut geschmeckt.'),
  p('Zu Silvester stoßen wir um Mitternacht mit Sekt an und wünschen uns gegenseitig alles Gute.'),
  p('Es ist ein schöner Brauch, dem Geburtstagskind Blumen zu überreichen.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Feste und Feiern — Konversation'),
  h2('Aufgabe 1 — Dialog: Über ein Fest erzählen'),
  p('Zwei Personen tauschen sich über Feste in ihren Heimatländern aus. Ergänzt den Dialog.'),
  infoBox([
    'Beschreiben: Man feiert … mit … / Es ist üblich, dass … / Typisch ist …',
    'Vergleichen: Ähnlich wie hier … / Im Gegensatz dazu … / Bei uns ist es anders, weil …',
    'Fragen stellen: Wie feiert ihr …? / Was isst man bei …? / Wer nimmt daran teil?',
    'Reaktion: Das ist interessant! / Das kenne ich nicht. / Das ist ähnlich wie bei uns.',
  ]),
  ...gap(1),
  p('Person A: „Welches Fest ist bei dir zu Hause am wichtigsten?"'),
  p('Person B: „Bei uns ist ________ das größte Fest. Wir feiern es ________ und meistens ________."'),
  p('Person A: „Was macht man dabei? Gibt es besondere Traditionen?"'),
  p('Person B: „Ja, zum Beispiel ________. Außerdem ________, was bei uns ________ ist."'),
  p('Person A: „Das ist interessant! Ist das ähnlich wie ________ hier in Deutschland?"'),
  p('Person B: „Ja, ein bisschen — aber ________. Im Gegensatz zu hier ________."'),
  p('Person A: „Und wie fühlst du dich, wenn du das Fest hier in Deutschland nicht feiern kannst?"'),
  p('Person B: „Manchmal ________, aber ich freue mich, wenn ich ________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Interkulturelles Festgespräch'),
  stdTable(
    ['Person A — deutsches Fest vorstellen', 'Person B — eigenes Fest vorstellen'],
    [
      ['Stellen Sie ein deutsches Fest vor (Weihnachten / Karneval / Oktoberfest).', 'Stellen Sie ein Fest aus Ihrer Heimat vor.'],
      ['Erklären Sie 2–3 typische Traditionen.', 'Erklären Sie 2–3 typische Traditionen.'],
      ['Fragen Sie nach Gemeinsamkeiten und Unterschieden.', 'Antworten Sie und nennen Sie Parallelen.'],
      ['Welches Fest würden Sie gerne im anderen Land erleben?', 'Welches deutsche Fest würde Sie am meisten interessieren?'],
    ],
    [5703, 5703]
  ),
  festBox([
    'Bekannte deutsche Feste kurz erklärt:',
    'Weihnachten: Familie, Bescherung, Weihnachtsbaum, Tannenduft, Plätzchen',
    'Karneval/Fasching: Verkleidung, Umzüge, Prinzenpaar, besonders in Köln und Mainz',
    'Oktoberfest: München, Bier, Tracht, Volksfest, September/Oktober',
    'Erntedankfest: eher ländlich/kirchlich, Oktober, Dankbarkeit für Ernte',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Feste und Erinnerungen'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Was ist Ihr liebstes Fest und warum?', ''],
      ['Welche Festetraditionen aus Ihrer Heimat vermissen Sie in Deutschland?', ''],
      ['Haben Sie schon ein deutsches Fest gefeiert? Wie war es?', ''],
      ['Was machen Sie an Silvester normalerweise?', ''],
      ['Was würden Sie einem Deutschen über ein Fest in Ihrer Heimat erklären?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Fest raten"'),
  p('Eine Person beschreibt ein Fest (aus Deutschland oder einem anderen Land) — ohne den Namen zu nennen. Die anderen raten, welches Fest gemeint ist.'),
  infoBox([
    'Beschreibungsregeln:',
    '1. Zeitpunkt: Es ist im … / Es findet jeden … statt.',
    '2. Aktivitäten: Man … / Es ist typisch, dass …',
    '3. Essen und Trinken: Typisch ist …',
    '4. Stimmung und Bedeutung: Es geht um … / Es fühlt sich an wie …',
    'Grammatik-Ziele: als / wenn / Vergleichssätze / Temporalpräpositionen',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Feste und Feiern'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Fest klar benannt, Zeitpunkt und Teilnehmer genannt'),
  bullet('Mindestens 2 Traditionen beschrieben'),
  bullet('Vergleich mit deutschem Fest (ähnlich / im Gegensatz zu / wohingegen)'),
  bullet('als-Satz für einmalige Erfahrung oder wenn-Satz für Wiederholung'),
  bullet('Gefühle ausgedrückt (vermissen / sich freuen)'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('B: „Bei uns ist das Frühlingsfest das größte Fest. Wir feiern es im April mit der ganzen Familie."'),
  p('B: „Typisch ist das gemeinsame Kochen — jede Frau bringt ein Gericht mit. Außerdem zünden wir ein großes Feuer an, was bei uns Symbol für Reinigung ist."'),
  p('A: „Das ist interessant — ist das ähnlich wie Ostern hier in Deutschland?"'),
  p('B: „Ja, ein bisschen — aber im Gegensatz zu hier geht es weniger um Religion, mehr um Gemeinschaft."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: als vs. wenn korrekt verwendet, Temporalpräpositionen (zu Weihnachten / am 24. Dezember / im Dezember), Vergleichsstrukturen.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Feste und Feiern — Bildaufgaben'),
  h2('Aufgabe 1 — Fest-Symbole erkennen'),
  p('[BILD 1: Sechs Symbole / Bilder: (1) Weihnachtsbaum mit Kugeln und Stern, (2) Ostereier in verschiedenen Farben, (3) Silvesterfeuerwerk über einer Stadt, (4) Karnevalskostüme und bunte Masken, (5) Adventskranz mit vier Kerzen, (6) Hochzeitstorte mit Brautpaar-Figuren]'),
  p('a) Welches Fest zeigt jedes Bild? Schreibe den Namen darunter.'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welches dieser Feste gibt es auch in Ihrer Heimat? Welches nicht? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Weihnachtsmarkt-Szene'),
  p('[BILD 2: Ein typischer Weihnachtsmarkt: Holzbuden mit Lichterketten, Menschen in warmen Winterjacken, ein Stand mit Glühwein-Bechern, ein anderer mit Lebkuchen und Holzspielzeug. Im Hintergrund ein beleuchteter Weihnachtsbaum.]'),
  p('a) Beschreibe die Szene in 2–3 Sätzen.'),
  wLine(), wLine(), wLine(),
  p('b) Was würden Sie auf diesem Weihnachtsmarkt kaufen oder probieren? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Glückwunschkarte lesen'),
  p('[BILD 3: Eine handgeschriebene Glückwunschkarte: „Liebe Nina! Herzlichen Glückwunsch zu deinem 30. Geburtstag! Ich wünsche dir alles Liebe und Gute — mögen deine Träume in Erfüllung gehen. Du bist eine wunderbare Freundin, auf die ich mich immer verlassen kann. Auf viele weitere gemeinsame Jahre! In Liebe, deine Mira."]'),
  p('a) Für welchen Anlass ist die Karte?'),
  wLine(),
  p('b) Was wünscht Mira ihrer Freundin? Nenne zwei Dinge.', { before: 120 }),
  wLine(),
  p('c) Schreibe selbst einen Glückwunsch-Satz mit Konjunktiv II.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Festkalender auswerten'),
  p('[BILD 4: Ein Jahreskalender mit eingetragenen Feiertagen und Festen: 1. Jan. Neujahr, 6. Jan. Heilige Drei Könige (nur Bayern/BW), Feb/März Karneval/Fasching, März/April Ostern (Freitag–Montag), 1. Mai Tag der Arbeit, Mai/Juni Pfingsten, 3. Okt. Tag der deutschen Einheit, Nov. Volkstrauertag, 1. Nov. Allerheiligen (nur einige Bundesländer), Dez. Advent und Weihnachten, 31. Dez. Silvester.]'),
  p('a) Welche Feiertage gelten in ganz Deutschland? Nenne drei.'),
  wLine(),
  p('b) Welche Feiertage gibt es nur in bestimmten Bundesländern?', { before: 120 }),
  wLine(),
  p('c) Wann würden Sie am liebsten Urlaub in Deutschland nehmen? Warum? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Feste und Feiern'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Fest-Symbole'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['Weihnachten', 'Ostern', 'Silvester', 'Karneval/Fasching', 'Advent', 'Hochzeit']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Ostern gibt es bei uns auch, aber man sucht keine Eier. / Karneval kennen wir in dieser Form nicht.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Weihnachtsmarkt'),
  p('a) Das Bild zeigt einen stimmungsvollen Weihnachtsmarkt. Menschen gehen zwischen beleuchteten Holzbuden entlang. An einem Stand wird Glühwein verkauft, an einem anderen gibt es Lebkuchen und Holzspielzeug.'),
  p('b) Individuelle Antworten: Ich würde gerne einen heißen Glühwein trinken. / Ich möchte Lebkuchen probieren, weil ich sie noch nie gegessen habe.'),
  ...gap(1),
  h2('Aufgabe 3 — Glückwunschkarte'),
  p('a) Zum 30. Geburtstag.'),
  p('b) Mira wünscht Nina, dass ihre Träume in Erfüllung gehen, und drückt Dankbarkeit für die Freundschaft aus.'),
  p('c) Beispiele: Mögest du immer glücklich und gesund sein! / Ich würde mir wünschen, dass wir noch viele Jahre befreundet sind.'),
  ...gap(1),
  h2('Aufgabe 4 — Festkalender'),
  p('a) Neujahr, Tag der Arbeit (1. Mai), Tag der deutschen Einheit (3. Okt.), Weihnachten (25./26. Dez.).'),
  p('b) Heilige Drei Könige (Bayern, BW), Allerheiligen (Bayern, BW, NRW, Rheinland-Pfalz, Saarland).'),
  p('c) Individuelle Antworten: Ich würde gerne im Dezember Urlaub machen, weil ich dann einen Weihnachtsmarkt besuchen möchte. / Im April wäre schön — da ist Ostern und das Wetter wird besser.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
