// A2_Erwachsene — Thema 06 ABSCHLUSS: Freizeit & Kultur
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Freizeit & Kultur — ABSCHLUSS';
const HEADING = 'Thema 06 — Freizeit & Kultur';
const PREFIX  = 'A2_Erwachsene_FreizeitKultur_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '06_FreizeitKultur', 'ABSCHLUSS');
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
  h1('Freizeit & Kultur — Abschlussübung'),
  infoBox([
    'Diese Übung kombiniert alle drei Unterpunkte des Themas:',
    'UP 01: Freizeitaktivitäten und Hobbys',
    'UP 02: Veranstaltungen besuchen (Kino, Theater, Museum)',
    'UP 03: Sport treiben',
  ]),
  ...gap(1),

  // ── Aufgabe 1: Lesetext ────────────────────────────────────────────────────
  h2('Aufgabe 1 — Lesetext: Chiomas perfektes Wochenende'),
  p('Chioma Obi kommt aus Nigeria und wohnt seit drei Jahren in Freiburg. Sie arbeitet als Lehrerin an einer Berufsschule und hat eine volle Arbeitswoche — deshalb ist das Wochenende für sie sehr wichtig. Sie hat uns erzählt, wie ihr ideales Wochenende aussieht.'),
  p('„Samstag beginne ich mit Yoga", sagt Chioma. „Seit einem Jahr mache ich das jede Woche — es ist entspannender als der Gym, und ich kann dabei den Kopf frei machen. Danach wärme ich mich ab und frühstücke ausgiebig."'),
  p('Am Samstagnachmittag besucht Chioma oft eine Ausstellung oder ein Konzert. „Freiburg hat ein tolles Kulturangebot", erklärt sie. „Letzten Monat war ich in einem Jazzkonzert, das mich wirklich beeindruckt hat — der Saxophonist, den ich dort gesehen habe, war unglaublich gut. Die Karte hat nur 16 Euro gekostet, ermäßigt als Vereinsmitglied."'),
  p('Abends trifft sie sich mit ihrem Buchclub. Die Gruppe besteht aus acht Personen — Deutsche, Franzosen und noch weitere Nationalitäten. Sie haben angefangen, jeden zweiten Samstag zusammenzukommen. „Ich lese viel lieber, seit ich im Buchclub bin", sagt Chioma lächelnd. „Und mein Deutsch ist viel besser geworden, weil wir immer auf Deutsch diskutieren."'),
  p('Am Sonntag geht Chioma Fahrrad fahren — entweder allein am Rhein oder mit Freunden im Schwarzwald. „Radfahren ist gesünder als Autofahren und macht viel mehr Spaß", findet sie. „Abends schaue ich dann einen Film, der mich zum Nachdenken bringt — am liebsten einen Dokumentarfilm, der ein interessantes Thema behandelt."'),
  p('Chioma plant, im Frühling an einem Stadtlauf in Freiburg teilzunehmen. „Ich trainiere schon seit zwei Monaten dafür. Es ist anstrengend, aber ich will es unbedingt schaffen!"'),
  ...gap(1),

  // ── Aufgabe 2: R/F ────────────────────────────────────────────────────────
  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Chioma wohnt seit drei Jahren in Freiburg.', ''],
      ['Chioma findet Yoga anstrengender als den Gym.', ''],
      ['Das Jazzkonzert hat ihr nicht gut gefallen.', ''],
      ['Der Buchclub trifft sich jeden Samstag.', ''],
      ['Chiomas Deutsch hat sich durch den Buchclub verbessert.', ''],
      ['Chioma fährt lieber Auto als Fahrrad.', ''],
      ['Chioma möchte an einem Stadtlauf teilnehmen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),

  // ── Aufgabe 3: Lückentext gemischt ────────────────────────────────────────
  h2('Aufgabe 3 — Gemischter Lückentext (alle drei Unterpunkte)'),
  infoBox([
    'Wörterkasten: Vorstellung  |  trainiert  |  sich interessiert  |  beeindruckend  |  teilzunehmen',
    '              reserviert  |  aufzuwärmen  |  Ermäßigung  |  angefangen  |  gesünder'
  ]),
  ...gap(1),
  p('Amara lebt seit einem Jahr in Deutschland und hat viel Neues entdeckt. In ihrer Freizeit ________ sie für Kunst und Kultur. Letzten Monat hat sie zwei Karten für eine Theatervorstellung online ________ — mit einer ________ als Studentin hat sie nur 12 Euro bezahlt.'),
  p('Die ________ war sehr ________ — Amara war begeistert. Danach hat sie ________, zweimal pro Woche im Sportverein Sport zu machen. Bevor sie ________, wärmt sie sich immer auf. Sie sagt: „Sport ist ________ als nur zu Hause sitzen — und ich habe so neue Freunde gefunden."', { before: 120 }),
  p('Nächsten Monat plant sie, an einem 5-km-Lauf ________. Sie hat sogar schon einen Buchclub gefunden, dem sie beitreten möchte. „Ich habe ________, regelmäßig auf Deutsch zu lesen — das hilft mir sehr!", sagt sie.', { before: 120 }),
  ...gap(1),

  // ── Aufgabe 4: Fehlerkorrektur ────────────────────────────────────────────
  h2('Aufgabe 4 — Fehler korrigieren'),
  p('In jedem Satz steckt genau ein Fehler. Unterstreiche den Fehler und schreibe den korrekten Satz.'),
  ...gap(1),
  p('UP 01 — Hobbys und Freizeit:', { bold: true }),
  p('a)  Ich habe angefangen, regelmäßig lesen.'),
  wLine(), wLine(),
  p('b)  Ich interessiere sehr für klassische Musik — ich gehe oft in Konzerte.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 02 — Veranstaltungen besuchen:', { bold: true }),
  p('c)  Das ist der Film, der ich letzten Monat im Kino gesehen habe.'),
  wLine(), wLine(),
  p('d)  Das war ein Theaterstück, das hat mich sehr bewegt.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 03 — Sport treiben:', { bold: true }),
  p('e)  Radfahren ist gesunder als Autofahren — das mache ich jeden Sonntag.'),
  wLine(), wLine(),
  p('f)  Ich wärme auf mich immer vor dem Training.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 5: Schreiben ──────────────────────────────────────────────────
  h2('Aufgabe 5 — Schreiben: Mein Freizeitprofil'),
  p('Schreiben Sie einen kurzen Text (6–8 Sätze) über Ihre Freizeitgestaltung. Benutzen Sie Elemente aus allen drei Unterpunkten:'),
  bullet('Hobbys: Was machen Sie gerne? Seit wann? (Infinitiv mit zu, weil-Satz)'),
  bullet('Veranstaltungen: Welche Veranstaltungen besuchen Sie? (Relativsatz)'),
  bullet('Sport: Welchen Sport treiben Sie? Vergleich mit Komparativ.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 6: Rollenspiel ────────────────────────────────────────────────
  h2('Aufgabe 6 — Rollenspiel: Freizeit planen'),
  p('Zwei Personen planen ein gemeinsames Wochenende. Person A schlägt Aktivitäten vor — Person B reagiert (Zustimmung, Ablehnung, Gegenvorschlag). Mindestens 3 Aktivitäten aus verschiedenen Bereichen (Hobby, Veranstaltung, Sport).'),
  stdTable(
    ['Person A — Vorschläge', 'Person B — Reaktion'],
    [
      ['Einen Sportverein besuchen (Probetraining)', ''],
      ['Ins Kino oder Theater gehen', ''],
      ['Ein neues Hobby ausprobieren (z. B. Kochen, Malen)', ''],
    ],
    [5703, 5703]
  ),
  infoBox([
    'Nützliche Redemittel:',
    'Vorschlag: Hast du Lust, … zu …? / Ich würde gerne … / Wie wäre es mit …?',
    'Zustimmung: Gute Idee! / Das klingt toll! / Ich bin dabei.',
    'Ablehnung: Leider passt das nicht. / Ich bin nicht so der Sporttyp.',
    'Gegenvorschlag: Was würdest du davon halten, stattdessen …?',
  ]),
  ...gap(1),

  // ── Selbstevaluation ──────────────────────────────────────────────────────
  h2('Selbstevaluation — Das kann ich jetzt!'),
  stdTable(
    ['Ich kann …', 'gut', 'noch nicht sicher'],
    [
      ['über Hobbys und Freizeitaktivitäten sprechen und schreiben.', '', ''],
      ['Veranstaltungen (Kino, Theater, Museum) auf Deutsch besprechen.', '', ''],
      ['Infinitiv mit zu korrekt verwenden (Lust haben zu / anfangen zu).', '', ''],
      ['Relativsätze im Nominativ und Akkusativ bilden.', '', ''],
      ['Komparativ und Superlativ korrekt einsetzen.', '', ''],
      ['Modalverben (müssen/können/dürfen/wollen) richtig verwenden.', '', ''],
      ['Einen Sportverein oder eine Veranstaltung auf Deutsch anfragen.', '', ''],
    ],
    [7500, 1000, 3206]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Freizeit & Kultur'),
  ...gap(1),

  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Chioma wohnt seit drei Jahren in Freiburg.', 'R'],
      ['Chioma findet Yoga anstrengender als den Gym.', 'F (entspannender)'],
      ['Das Jazzkonzert hat ihr nicht gut gefallen.', 'F (hat sie beeindruckt)'],
      ['Der Buchclub trifft sich jeden Samstag.', 'F (jeden zweiten Samstag)'],
      ['Chiomas Deutsch hat sich durch den Buchclub verbessert.', 'R'],
      ['Chioma fährt lieber Auto als Fahrrad.', 'F (Radfahren lieber)'],
      ['Chioma möchte an einem Stadtlauf teilnehmen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 3 — Lückentext'),
  p('1. interessiert sie sich  2. reserviert  3. Ermäßigung  4. Vorstellung  5. beeindruckend'),
  p('6. angefangen  7. trainiert  8. gesünder  9. teilzunehmen  10. aufzuwärmen'),
  p('Hinweis: Reihenfolge der Lücken im Text (von oben nach unten):'),
  p('interessiert sich (1) — reserviert (2) — Ermäßigung (3) — Vorstellung (4) — beeindruckend (5) — angefangen (6) — trainiert (7) — gesünder (8) — teilzunehmen (9) — aufzuwärmen (10)', { italics: true, color: '555555' }),
  ...gap(1),

  h2('Aufgabe 4 — Fehlerkorrektur'),
  grammarBox([
    'UP 01 — Hobbys (Infinitiv mit zu / Reflexivpronomen):',
    'a) FEHLER: „angefangen, regelmäßig lesen" → RICHTIG: „angefangen, regelmäßig zu lesen"',
    '   Regel: Nach angefangen / aufgehört / versuchen / planen usw. → Infinitiv MIT zu',
    '',
    'b) FEHLER: „Ich interessiere sehr für …" → RICHTIG: „Ich interessiere mich sehr für …"',
    '   Regel: sich interessieren für — das Reflexivpronomen mich darf nicht fehlen!',
  ]),
  ...gap(1),
  grammarBox([
    'UP 02 — Veranstaltungen (Relativpronomen / Wortstellung):',
    'c) FEHLER: „der Film, der ich gesehen habe" → RICHTIG: „der Film, den ich gesehen habe"',
    '   Regel: Film (mask.) ist Akkusativobjekt im Relativsatz → Relativpronomen = den',
    '',
    'd) FEHLER: „das Theaterstück, das hat mich sehr bewegt" → RICHTIG: „das mich sehr bewegt hat"',
    '   Regel: Im Relativsatz steht das konjugierte Verb IMMER am Ende!',
  ]),
  ...gap(1),
  grammarBox([
    'UP 03 — Sport (Komparativ Umlaut / Trennbares Verb):',
    'e) FEHLER: „gesunder als" → RICHTIG: „gesünder als"',
    '   Regel: gesund → gesünder (Umlaut! Ähnlich: jung→jünger, alt→älter, groß→größer)',
    '',
    'f) FEHLER: „Ich wärme auf mich" → RICHTIG: „Ich wärme mich … auf"',
    '   Regel: Das Reflexivpronomen steht VOR dem Verbpartikel. Partikel geht ans Satzende.',
    '   Muster: Ich wärme mich vor dem Training auf.',
  ]),
  ...gap(1),

  h2('Aufgabe 5 — Bewertungskriterien Freizeit-Text'),
  bullet('UP 01: Hobby genannt + Infinitiv mit zu korrekt verwendet (Lust haben zu / anfangen zu)'),
  bullet('UP 01: weil-Satz mit Verb am Ende'),
  bullet('UP 02: Veranstaltung genannt + Relativsatz korrekt (Verb am Ende, richtiges Pronomen)'),
  bullet('UP 03: Sport erwähnt + Komparativ korrekt (Umlaut beachten)'),
  bullet('Zeitangabe mit seit + Dativ'),
  bullet('6–8 vollständige Sätze'),
  ...gap(1),
  h2('Muster-Text'),
  p('Ich interessiere mich sehr für Musik und gehe gerne ins Konzert. Letzten Monat habe ich ein Jazzkonzert besucht, das mich sehr beeindruckt hat — der Pianist, den ich dort gehört habe, war fantastisch. Ich habe auch angefangen, Gitarre zu spielen, weil ich selbst Musik machen möchte. Seit sechs Monaten nehme ich an einem Gitarrenkurs teil. Außerdem treibe ich regelmäßig Sport: Ich laufe dreimal pro Woche, weil Laufen entspannender ist als im Fitnessstudio zu trainieren. Im Sommer möchte ich an einem Stadtlauf teilnehmen.'),
  ...gap(1),

  h2('Aufgabe 6 — Bewertungskriterien Rollenspiel'),
  bullet('Mindestens 3 Vorschläge aus verschiedenen Bereichen'),
  bullet('Redemittel für Vorschlag / Zustimmung / Ablehnung / Gegenvorschlag verwendet'),
  bullet('Infinitiv mit zu bei Vorschlägen korrekt'),
  bullet('Natürlicher Gesprächsfluss, abwechselnde Redeanteile'),
  bullet('Modalverb für Wunsch / Möglichkeit: Ich würde gerne … / Hättest du Lust …?'),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
