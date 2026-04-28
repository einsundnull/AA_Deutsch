// A2_Erwachsene — Thema 05 ABSCHLUSS: Gesundheit
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const HEADING = 'Thema 05 — Gesundheit';
const SUBHEAD = 'ABSCHLUSS';
const PREFIX  = 'A2_Erwachsene_Gesundheit_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '05_Gesundheit', 'ABSCHLUSS');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle ABSCHLUSS: Gesundheit');
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
const pageBreak = () => new Paragraph({ children: [new TextRun({ break: 1 })], spacing: { before: 0, after: 0 } });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Abschlussübung — Gesundheit'),
  p('Diese Übung verbindet alle drei Unterpunkte des Themas:', { bold: true }),
  infoBox([
    'UP 01: Beim Arzt',
    'UP 02: Apotheke und Medikamente',
    'UP 03: Gesunder Lebensstil',
  ]),
  ...gap(1),

  // ── AUFGABE 1: LESETEXT ──
  h2('Aufgabe 1 — Lesetext: Rosas Wendepunkt'),
  p('Rosa Ferreira kommt aus Portugal und wohnt seit zwei Jahren in Hannover. Sie arbeitet als Köchin in einem portugiesischen Restaurant. Ihr Arbeitsalltag ist stressig: lange Schichten, kaum Pausen, viel Stehen. Abends ist sie so erschöpft, dass sie oft einfach nur fernsieht und dabei Chips isst.'),
  ...gap(1),
  p('Eines Tages fühlt sie sich sehr schlecht. Ihr Hals tut weh, sie hat 38,5 Grad Fieber und starken Husten. Ihre Kollegin Marta rät ihr: „Geh zum Arzt, das ist keine normale Erkältung mehr." Rosa ruft ihre Hausärztin Dr. Lange an und bekommt noch am gleichen Tag einen Termin.'),
  p('Dr. Lange untersucht Rosa gründlich: Sie schaut in den Hals, hört die Lunge ab und tastet die Lymphknoten ab. Diagnose: Bronchitis. „Sie müssen sich wirklich ausruhen — diese Woche nicht arbeiten. Ich schreibe Ihnen ein Rezept für Antibiotika und ein Attest für fünf Tage aus. Außerdem sollten Sie viel trinken und mindestens zweimal täglich inhalieren."'),
  p('Rosa geht direkt in die Apotheke. Der Apotheker Herr Grün erklärt ihr alles: Die Antibiotika muss sie dreimal täglich nach dem Essen nehmen — zehn Tage lang, auch wenn sie sich nach ein paar Tagen besser fühlt. „Und bitte keinen Alkohol während der Einnahme", sagt er. Die Zuzahlung beträgt insgesamt zehn Euro.'),
  p('Zu Hause im Bett denkt Rosa nach. Sie hat sich schon länger nicht gut gefühlt. Sie schläft zu wenig, isst unregelmäßig und treibt keinen Sport. Die Bronchitis ist für sie ein Weckruf. Kaum ist sie wieder gesund, meldet sie sich bei einem Yoga-Kurs an und beginnt, jeden Morgen zu frühstücken. Sie beschließt: mehr Schlaf, mehr Bewegung, weniger Stress.'),
  p('Drei Monate später sagt sie: „Ich habe aufgehört zu rauchen, ich schlafe sieben Stunden und ich gehe zweimal pro Woche joggen. Ich fühle mich wie ein anderer Mensch!"'),
  ...gap(1),
  h3('Aufgabe 1a — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Rosa wohnt seit drei Jahren in Hannover.', ''],
      ['Rosa hat Bronchitis.', ''],
      ['Dr. Lange stellt ein Attest für drei Tage aus.', ''],
      ['Rosa muss die Antibiotika dreimal täglich nehmen.', ''],
      ['Während der Einnahme darf Rosa keinen Alkohol trinken.', ''],
      ['Rosa meldet sich bei einem Yoga-Kurs an.', ''],
      ['Nach drei Monaten hat Rosa mit dem Rauchen aufgehört.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h3('Aufgabe 1b — Fragen zum Text'),
  p('a) Was sind Rosas Symptome und wie lautet die Diagnose?'),
  wLine(), wLine(),
  p('b) Was empfiehlt Dr. Lange Rosa? Nenne drei Punkte.', { before: 120 }),
  wLine(), wLine(), wLine(),
  p('c) Was ändert Rosa nach ihrer Krankheit in ihrem Lebensstil?', { before: 120 }),
  wLine(), wLine(), wLine(),

  pageBreak(),

  // ── AUFGABE 2: LÜCKENTEXT ──
  h2('Aufgabe 2 — Gemischter Lückentext (alle 3 Unterpunkte)'),
  infoBox([
    'Wörterkasten: Attest  |  Rezept  |  Zuzahlung  |  Nebenwirkungen  |  Lebensstil',
    '              ausruhen  |  Beipackzettel  |  Symptome  |  aufgehört  |  seit'
  ]),
  ...gap(1),
  p('Rosa hat ________ einer Woche Husten und Fieber. Beim Arzt beschreibt sie ihre ________ und bekommt ein ________ für Antibiotika sowie ein ________ für fünf Tage.'),
  p('In der Apotheke liest Rosa den ________ sorgfältig. Die ________ für das Medikament beträgt zehn Euro. Mögliche ________ sind Magenschmerzen und Übelkeit.', { before: 120 }),
  p('Seitdem hat Rosa ihren ________ geändert. Sie hat ________ zu rauchen und versucht, ________ zu leben. Abends kann sie jetzt früher ________ .', { before: 120 }),
  ...gap(1),

  // ── AUFGABE 3: FEHLERKORREKTUR ──
  h2('Aufgabe 3 — Fehler korrigieren'),
  p('Jeder Satz enthält einen Fehler. Unterstreiche ihn und schreibe den korrekten Satz.'),
  ...gap(1),
  p('a) [UP 01] Ich habe Halsschmerzen seit drei Tag.  →'),
  wLine(),
  p('b) [UP 01] Der Arzt hat mir ein Attest ausgestellt fünf Tage.  →', { before: 120 }),
  wLine(),
  p('c) [UP 02] Sie muss nehmen die Tabletten dreimal täglich.  →', { before: 120 }),
  wLine(),
  p('d) [UP 02] Das Medikament ist rezeptfrei — man kann es ohne Arzt kauft.  →', { before: 120 }),
  wLine(),
  p('e) [UP 03] Sie hat aufgehört rauchen vor drei Monaten.  →', { before: 120 }),
  wLine(),
  p('f) [UP 03] Ich fühle mich viel besser, seit ich mich regelmäßig bewegte.  →', { before: 120 }),
  wLine(),
  ...gap(1),

  // ── AUFGABE 4: SCHREIBEN ──
  h2('Aufgabe 4 — Schreiben: Brief an einen Freund'),
  p('Dein Freund / deine Freundin fühlt sich nicht wohl und fragt dich um Rat. Schreibe eine Antwort (6–8 Sätze). Gib Ratschläge zu:'),
  bullet('Arztbesuch (wann? was mitnehmen?)'),
  bullet('Medikamente (Tipps zur Einnahme)'),
  bullet('Gesunder Lebensstil (2–3 Veränderungen)'),
  p('Benutze: Konjunktiv II (solltest/könntest) + Kausalsatz (weil) + Perfekt (was du selbst geändert hast).'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── AUFGABE 5: ROLLENSPIEL ──
  h2('Aufgabe 5 — Rollenspiel: Drei Stationen'),
  p('Zu dritt: Jede Person spielt eine Rolle. Spielt alle drei Stationen durch.'),
  stdTable(
    ['Station', 'Person A', 'Person B', 'Person C'],
    [
      ['1 — Beim Arzt', 'Patient/in: Symptome beschreiben, nach Attest fragen', 'Arzt/Ärztin: untersuchen, Rezept + Attest ausstellen', '— (Beobachter/in, notiert 2 Tipps)'],
      ['2 — Apotheke', 'Kunde/Kundin: Rezept einlösen, nach Einnahme fragen', '— (Beobachter/in)', 'Apotheker/in: Einnahme erklären, auf Nebenwirkungen hinweisen'],
      ['3 — Gesundheitsgespräch', 'Freund/in: Ratschläge zum Lebensstil geben', 'Gesprächspartner/in: Probleme nennen, Tipps annehmen', '— (Beobachter/in)'],
    ],
    [2500, 3202, 3202, 2802]
  ),
  ...gap(1),

  // ── SELBSTEVALUATION ──
  h2('Selbstevaluation — Das kann ich jetzt!'),
  p('Setze ein Häkchen (✓): Das kann ich gut  /  Das übe ich noch', { italics: true, color: '888888' }),
  stdTable(
    ['Können-Aussage', 'Das kann ich gut', 'Das übe ich noch'],
    [
      ['Ich kann Symptome beim Arzt beschreiben (seit + Dativ).', '', ''],
      ['Ich kann einen Arzttermin am Telefon vereinbaren.', '', ''],
      ['Ich kann in der Apotheke nach Medikamenten fragen.', '', ''],
      ['Ich kann einen Beipackzettel auf Deutsch verstehen.', '', ''],
      ['Ich kann Einnahmeregeln mit Modalverben erklären.', '', ''],
      ['Ich kann Ratschläge zum Lebensstil mit „solltest" geben.', '', ''],
      ['Ich kann über Veränderungen in meinem Lebensstil berichten (Perfekt).', '', ''],
    ],
    [7706, 2000, 2000]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Gesundheit'),

  h2('Aufgabe 1a — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Rosa wohnt seit drei Jahren in Hannover.', 'F (seit zwei Jahren)'],
      ['Rosa hat Bronchitis.', 'R'],
      ['Dr. Lange stellt ein Attest für drei Tage aus.', 'F (für fünf Tage)'],
      ['Rosa muss die Antibiotika dreimal täglich nehmen.', 'R'],
      ['Während der Einnahme darf Rosa keinen Alkohol trinken.', 'R'],
      ['Rosa meldet sich bei einem Yoga-Kurs an.', 'R'],
      ['Nach drei Monaten hat Rosa mit dem Rauchen aufgehört.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 1b — Musterlösungen'),
  p('a) Rosa hat Halsschmerzen, 38,5 Grad Fieber und starken Husten. Diagnose: Bronchitis.'),
  p('b) Dr. Lange empfiehlt: sich ausruhen (nicht arbeiten), Antibiotika nehmen, viel trinken, zweimal täglich inhalieren.'),
  p('c) Rosa meldet sich bei einem Yoga-Kurs an, beginnt jeden Morgen zu frühstücken, schläft sieben Stunden, geht zweimal pro Woche joggen und hört mit dem Rauchen auf.'),
  ...gap(1),

  h2('Aufgabe 2 — Lückentext'),
  p('1. seit  2. Symptome  3. Rezept  4. Attest  5. Beipackzettel'),
  p('6. Zuzahlung  7. Nebenwirkungen  8. Lebensstil  9. aufgehört  10. ausruhen'),
  ...gap(1),

  h2('Aufgabe 3 — Fehlerkorrektur'),
  grammarBox([
    'Häufige Fehler — Gesundheit:',
    '"seit" + Dativ Plural: Tagen (nicht: Tag)',
    'Zeitangabe im Satz: Attest für fünf Tage (Präpositionalphrase an richtiger Stelle)',
    'Verbstellung: Modalverb 2. Position, Infinitiv ans Ende',
    'Infinitiv: kaufen (nicht: kauft) im Nebensatz',
    '"aufhören" + zu + Infinitiv: aufgehört zu rauchen',
    '"seit" + Präsens (nicht Präteritum): seit ich mich bewege',
  ]),
  ...gap(1),
  p('a) FEHLER: „seit drei Tag" → Dativ Plural: Tag → Tagen'),
  p('   KORREKT: Ich habe Halsschmerzen seit drei Tagen.'),
  p('b) FEHLER: „Attest ausgestellt fünf Tage" → Präposition fehlt: für'),
  p('   KORREKT: Der Arzt hat mir ein Attest für fünf Tage ausgestellt.'),
  p('c) FEHLER: „muss nehmen" → Modalverb an 2. Stelle, Infinitiv ans Ende'),
  p('   KORREKT: Sie muss die Tabletten dreimal täglich nehmen.'),
  p('d) FEHLER: „kauft" → Infinitiv im Nebensatz: kaufen'),
  p('   KORREKT: Das Medikament ist rezeptfrei — man kann es ohne Arzt kaufen.'),
  p('e) FEHLER: „aufgehört rauchen" → aufhören braucht „zu + Infinitiv"'),
  p('   KORREKT: Sie hat vor drei Monaten aufgehört zu rauchen.'),
  p('f) FEHLER: „bewegte" → nach „seit" steht Präsens (Zustand dauert an)'),
  p('   KORREKT: Ich fühle mich viel besser, seit ich mich regelmäßig bewege.'),
  ...gap(1),

  h2('Aufgabe 4 — Bewertungskriterien Brief'),
  bullet('Anrede und Abschlussformel vorhanden'),
  bullet('Mindestens 2 Ratschläge mit Konjunktiv II (solltest / könntest)'),
  bullet('Mindestens 1 Kausalsatz mit weil (Verb am Ende)'),
  bullet('Mindestens 1 Satz im Perfekt über eigene Erfahrung'),
  bullet('Alle drei Bereiche angesprochen: Arzt, Apotheke, Lebensstil'),
  ...gap(1),
  h2('Muster-Brief'),
  p('Liebe/r [Name], ich hoffe, es geht dir bald besser! Du solltest so schnell wie möglich zum Arzt gehen, weil eine Erkältung mit hohem Fieber behandelt werden muss. Vergiss nicht, deine Versichertenkarte mitzunehmen. Wenn der Arzt dir ein Rezept gibt, lies unbedingt den Beipackzettel, damit du weißt, wie du die Tabletten nehmen sollst. Ich habe vor einem Jahr auch aufgehört zu rauchen und ich treibe jetzt regelmäßig Sport — ich fühle mich seitdem viel besser. Du könntest zum Beispiel jeden Abend einen kurzen Spaziergang machen. Pass auf dich auf! Liebe Grüße.'),
  ...gap(1),

  h2('Aufgabe 5 — Rollenspiel: Bewertungskriterien'),
  stdTable(
    ['Station', 'Was wird bewertet?'],
    [
      ['Beim Arzt', 'Symptome mit „seit" + Dativ, Modalverben müssen/sollen/dürfen, formelles Sie'],
      ['Apotheke', 'Einnahmeregel korrekt erklären, Beipackzettel-Wortschatz, Zuzahlung nennen'],
      ['Gesundheitsgespräch', 'Konjunktiv II für Ratschläge, reflexive Verben, Kausalsätze mit weil'],
    ],
    [3000, 8706]
  ),
  ...gap(1),

  h2('Themenabdeckung — Alle 3 Unterpunkte'),
  stdTable(
    ['Unterpunkt', 'Aufgaben im ABSCHLUSS'],
    [
      ['UP 01: Beim Arzt', 'Text (Arztbesuch, Diagnose, Attest), Lücken (seit/Symptome/Rezept/Attest), Fehler a+b, Rollenspiel Station 1'],
      ['UP 02: Apotheke', 'Text (Apotheke, Beipackzettel, Zuzahlung), Lücken (Beipackzettel/Zuzahlung/NW), Fehler c+d, Rollenspiel Station 2'],
      ['UP 03: Gesunder Lebensstil', 'Text (Lebensstiländerung), Lücken (Lebensstil/aufgehört), Fehler e+f, Brief, Rollenspiel Station 3'],
    ],
    [4000, 7706]
  ),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
