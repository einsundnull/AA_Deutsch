// A2_Erwachsene — Thema 08 ABSCHLUSS: Familie & soziales Leben
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Familie & soziales Leben — ABSCHLUSS';
const HEADING = 'Thema 08 — Familie & soziales Leben';
const PREFIX  = 'A2_Erwachsene_FamilieSoziales_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '08_FamilieSoziales', 'ABSCHLUSS');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle ABSCHLUSS:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ABSCHLUSS`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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

const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Familie & soziales Leben — Abschlussübung'),
  infoBox([
    'Diese Übung kombiniert alle drei Unterpunkte des Themas:',
    'UP 01: Über Familie und Beziehungen sprechen',
    'UP 02: Soziale Kontakte und Einladungen',
    'UP 03: Feste und Feiern',
  ]),
  ...gap(1),

  // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
  h2('Aufgabe 1 — Lesetext: Olas Brief an die Familie'),
  p('Ola Nowak kommt aus Polen und lebt seit zweieinhalb Jahren in Köln. Sie arbeitet als Pflegerin in einem Altenheim und hat sich in den letzten Monaten sehr gut eingelebt. An einem Sonntag im Dezember setzt sie sich an den Schreibtisch, um einen langen Brief an ihre Familie in Krakau zu schreiben.'),
  p('„Liebe Mama, lieber Papa! Ich vermisse euch sehr — besonders jetzt vor Weihnachten. Aber ich möchte euch erzählen, wie schön mein Leben hier inzwischen ist. Ich habe einen festen Freundeskreis: Anya aus der Ukraine, die mit mir im Krankenhaus arbeitet, und Marek, ein polnischer Kollege, den ich beim Sprachcafé kennengelernt habe. Wir sehen uns mindestens einmal pro Woche."'),
  p('„Letzten Samstag habe ich Anya und Marek zu mir nach Hause eingeladen, um zusammen zu kochen. Ich habe Pierogi vorbereitet, weil ich euch zeigen wollte — also ihnen zeigen wollte —, wie polnisches Essen schmeckt. Anya hat einen Borschtsch mitgebracht, und Marek einen Kuchen. Es war ein wunderschöner Abend, an dem wir bis Mitternacht erzählt haben."'),
  p('„Nächste Woche feiern wir gemeinsam Weihnachten. Es wird natürlich nicht so wie zu Hause sein — bei euch ist die ganze Verwandtschaft da, und Oma kocht ihre berühmte Karpfensuppe. Aber meine Freunde und ich werden trotzdem ein kleines Fest organisieren. Marek bringt einen Tannenbaum mit, und Anya backt ukrainische Kekse. Ich werde versuchen, Omas Suppe nachzukochen — wünschst du mir Glück, Mama?"'),
  p('„Im Februar fliege ich nach Hause, um euch endlich wieder zu sehen. Ich freue mich so darauf! Bis dahin halten wir wie immer per Skype Kontakt — jeden Sonntag um 18 Uhr. Liebe Grüße und einen großen Kuss, eure Ola."'),
  ...gap(1),

  // ── Aufgabe 2: R/F ────────────────────────────────────────────────────────
  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Ola wohnt seit drei Jahren in Köln.', ''],
      ['Anya kommt aus der Ukraine und arbeitet mit Ola zusammen.', ''],
      ['Marek hat Ola beim Sprachcafé kennengelernt.', ''],
      ['Bei der Feier mit Freunden hat jeder etwas mitgebracht.', ''],
      ['Olas Oma kocht zu Weihnachten Karpfensuppe.', ''],
      ['Ola und ihre Familie skypen jeden Samstag.', ''],
      ['Ola fliegt im Februar nach Polen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),

  // ── Aufgabe 3: Gemischter Lückentext ──────────────────────────────────────
  h2('Aufgabe 3 — Gemischter Lückentext (alle drei Unterpunkte)'),
  infoBox([
    'Wörterkasten: vermisst  |  eingeladen  |  feiern  |  Geschwister  |  zusagen',
    '              Tradition  |  kennengelernt  |  damit  |  schmücken  |  Glückwünsche'
  ]),
  ...gap(1),
  p('Daniel hat zwei ________ — einen älteren Bruder und eine jüngere Schwester. Sie wohnen alle in verschiedenen Städten, deshalb ________ er sie sehr. Vor zwei Jahren hat Daniel beim Volleyballverein eine nette Kollegin ________, mit der er heute eng befreundet ist.'),
  p('Letzte Woche hat sie ihn zu ihrer Hochzeit ________. Daniel konnte sofort ________, weil er an dem Wochenende frei hat. Er möchte auch eine schöne Karte mit ________ schreiben, ________ sie sich auch von ihm geehrt fühlt.', { before: 120 }),
  p('Weihnachten wird Daniel dieses Jahr in Deutschland ________ — zum ersten Mal. Er hat seine Wohnung schon mit Lichterketten und Kerzen begonnen zu ________. Es ist eine alte ________ in seiner Familie, dass alle am 24. Dezember zusammenkommen — auch wenn er dieses Jahr nur per Skype dabei sein kann.', { before: 120 }),
  ...gap(1),

  // ── Aufgabe 4: Fehlerkorrektur ────────────────────────────────────────────
  h2('Aufgabe 4 — Fehler korrigieren'),
  p('In jedem Satz steckt genau ein Fehler. Unterstreiche ihn und schreibe den korrekten Satz.'),
  ...gap(1),
  p('UP 01 — Familie und Beziehungen:', { bold: true }),
  p('a)  Ich wohne noch bei meine Eltern — sie leben in Hamburg.'),
  wLine(), wLine(),
  p('b)  Mein Bruder, der seit zwei Jahren in Wien wohnt, ist sehr zuverlaessig ist.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 02 — Soziale Kontakte und Einladungen:', { bold: true }),
  p('c)  Ich schreibe dir, damit dich einzuladen.'),
  wLine(), wLine(),
  p('d)  Sie hat sowohl Blumen mitgebracht als auch eine Flasche Wein mitgebracht.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 03 — Feste und Feiern:', { bold: true }),
  p('e)  Wenn ich zum ersten Mal einen Weihnachtsmarkt besucht habe, war ich begeistert.'),
  wLine(), wLine(),
  p('f)  In Weihnachten schenke ich meiner Mutter immer Blumen.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 5: Schreiben ──────────────────────────────────────────────────
  h2('Aufgabe 5 — Schreiben: Brief an einen Freund'),
  p('Schreiben Sie einen Brief an eine gute Freundin oder einen guten Freund (8–10 Sätze). Benutzen Sie Elemente aus allen drei Unterpunkten:'),
  bullet('UP 01: Erzählen Sie von einem Familienmitglied (Relativsatz, Possessivpronomen)'),
  bullet('UP 02: Beschreiben Sie eine Einladung oder ein Treffen (um … zu / damit)'),
  bullet('UP 03: Berichten Sie von einem Fest, das Sie gefeiert haben (als / wenn / Vergleich)'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 6: Rollenspiel ────────────────────────────────────────────────
  h2('Aufgabe 6 — Rollenspiel: Drei Stationen einer Begegnung'),
  p('Spielen Sie drei kurze Szenen durch (je 3 Minuten).'),
  stdTable(
    ['Station', 'Person A', 'Person B'],
    [
      ['Station 1: Familie vorstellen', 'Erzählen Sie über Ihre Familie (3 Mitglieder, Charakter, Wohnort).', 'Stellen Gegenfragen — wer ist Ihnen am ähnlichsten? Wen vermissen Sie am meisten?'],
      ['Station 2: Einladung aussprechen', 'Laden Sie B zu einer Feier ein (Anlass, Datum, Ort).', 'Sagen Sie zu oder ab — bei Absage: Gegenvorschlag.'],
      ['Station 3: Fest aus der Heimat erklären', 'Erklären Sie ein Fest aus Ihrer Heimat — Traditionen, Essen.', 'Vergleichen Sie mit einem deutschen Fest (ähnlich / anders).'],
    ],
    [2500, 4453, 4753]
  ),
  infoBox([
    'Sprachliche Ziele pro Station:',
    'Station 1: Possessivpronomen Dativ (mit meiner Mutter) / Relativsatz / Präteritum sein/haben',
    'Station 2: trennbare Verben (einladen / mitbringen / absagen) / um … zu / damit',
    'Station 3: als vs. wenn / Vergleichssätze (während / im Gegensatz zu) / Temporalpräpositionen',
  ]),
  ...gap(1),

  // ── Selbstevaluation ──────────────────────────────────────────────────────
  h2('Selbstevaluation — Das kann ich jetzt!'),
  stdTable(
    ['Ich kann …', 'gut', 'noch nicht sicher'],
    [
      ['über meine Familie und Verwandte sprechen und schreiben.', '', ''],
      ['Charaktereigenschaften und Beziehungen beschreiben.', '', ''],
      ['Einladungen aussprechen, zusagen und höflich absagen.', '', ''],
      ['Relativsätze, Possessivpronomen und um … zu / damit verwenden.', '', ''],
      ['über Feste und Bräuche aus meiner Heimat berichten.', '', ''],
      ['Feste vergleichen (während / im Gegensatz zu / ähnlich wie).', '', ''],
      ['als und wenn richtig unterscheiden.', '', ''],
    ],
    [7500, 1000, 3206]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Familie & soziales Leben'),
  ...gap(1),

  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Ola wohnt seit drei Jahren in Köln.', 'F (seit 2,5 Jahren)'],
      ['Anya kommt aus der Ukraine und arbeitet mit Ola zusammen.', 'R'],
      ['Marek hat Ola beim Sprachcafé kennengelernt.', 'R'],
      ['Bei der Feier mit Freunden hat jeder etwas mitgebracht.', 'R'],
      ['Olas Oma kocht zu Weihnachten Karpfensuppe.', 'R'],
      ['Ola und ihre Familie skypen jeden Samstag.', 'F (jeden Sonntag um 18 Uhr)'],
      ['Ola fliegt im Februar nach Polen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 3 — Lückentext'),
  p('1. Geschwister  2. vermisst  3. kennengelernt  4. eingeladen  5. zusagen'),
  p('6. Glückwünsche  7. damit  8. feiern  9. schmücken  10. Tradition'),
  ...gap(1),

  h2('Aufgabe 4 — Fehlerkorrektur'),
  grammarBox([
    'UP 01 — Familie (Possessivpronomen Dativ / Wortstellung Relativsatz):',
    'a) FEHLER: „bei meine Eltern" — Dativ Plural fehlt!',
    '   RICHTIG: bei meinen Eltern (Pl. Dat. → -en)',
    '',
    'b) FEHLER: doppeltes „ist" am Ende des Satzes!',
    '   RICHTIG: Mein Bruder, der seit zwei Jahren in Wien wohnt, ist sehr zuverlässig.',
  ]),
  ...gap(1),
  grammarBox([
    'UP 02 — Soziale Kontakte (um … zu vs. damit / nicht doppelt):',
    'c) FEHLER: „damit dich einzuladen" — gemischt aus damit + um … zu!',
    '   RICHTIG: Ich schreibe dir, um dich einzuladen. (gleiches Subjekt = um … zu)',
    '   ODER:    Ich schreibe dir, damit du Bescheid weißt. (verschied. Subj. = damit)',
    '',
    'd) FEHLER: doppeltes „mitgebracht"',
    '   RICHTIG: Sie hat sowohl Blumen als auch eine Flasche Wein mitgebracht.',
  ]),
  ...gap(1),
  grammarBox([
    'UP 03 — Feste (als vs. wenn / Temporalpräposition):',
    'e) FEHLER: „Wenn ich zum ersten Mal" — einmaliges Ereignis = als',
    '   RICHTIG: Als ich zum ersten Mal einen Weihnachtsmarkt besucht habe, …',
    '',
    'f) FEHLER: „In Weihnachten" — Weihnachten ist Anlass = zu',
    '   RICHTIG: Zu Weihnachten schenke ich meiner Mutter immer Blumen.',
  ]),
  ...gap(1),

  h2('Aufgabe 5 — Bewertungskriterien Brief'),
  bullet('UP 01: Familienmitglied beschrieben — Relativsatz korrekt, Possessivpronomen Dat./Akk.'),
  bullet('UP 02: Einladung oder Treffen erwähnt — um … zu / damit korrekt unterschieden'),
  bullet('UP 03: Festbericht — als/wenn richtig oder Vergleichssatz (während / im Gegensatz zu)'),
  bullet('Informeller Briefstil mit Anrede und Abschluss'),
  bullet('Mindestens 8 vollständige, zusammenhängende Sätze'),
  ...gap(1),
  h2('Muster-Brief'),
  p('Liebe Sara! Wie geht es dir? Bei mir ist viel passiert in den letzten Wochen! Meine Schwester, die in Hamburg studiert, hat mich besucht — wir sind uns charakterlich sehr ähnlich, wir haben viel gelacht. Letzten Samstag habe ich Freunde zu mir nach Hause eingeladen, um meinen Geburtstag zu feiern. Marek hat einen Kuchen mitgebracht und Anya Blumen — ich habe mich riesig gefreut! Auch zu Weihnachten werden wir alle zusammen feiern. Als ich zum ersten Mal einen deutschen Weihnachtsmarkt besucht habe, war ich von den Lichtern begeistert. Im Gegensatz zu meiner Heimat gibt es hier viele kleine Holzbuden mit Glühwein. Ich freue mich, dich bald wiederzusehen! Liebe Grüße, Ola'),
  ...gap(1),

  h2('Aufgabe 6 — Bewertungskriterien Rollenspiel'),
  bullet('Station 1: 3 Familienmitglieder genannt + Charaktereigenschaft + Wohnort'),
  bullet('Station 2: vollständige Einladung (Anlass, Datum, Ort) + Reaktion mit Begründung'),
  bullet('Station 3: Fest mit mind. 2 Traditionen + Vergleichssatz (während / ähnlich wie)'),
  bullet('Alle drei Stationen: natürlicher Gesprächsfluss, korrekte Grammatik je Station'),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
