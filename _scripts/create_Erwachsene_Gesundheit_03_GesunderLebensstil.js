// A2_Erwachsene — Thema 05 UP 03: Gesunder Lebensstil
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Gesunder Lebensstil';
const HEADING = 'Thema 05 — Gesundheit';
const SUBHEAD = 'UP 03: Gesunder Lebensstil';
const PREFIX  = 'A2_Erwachsene_Gesundheit_03_GesunderLebensstil';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '05_Gesundheit', '03_GesunderLebensstil');
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
const tippBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, left: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, right: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E0F7FA' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Gesunder Lebensstil — Schreibübung'),
  infoBox([
    '🏃  Nützliche Ausdrücke für einen gesunden Lebensstil:',
    'Sport treiben / sich regelmäßig bewegen / ins Fitnessstudio gehen / spazieren gehen',
    'ausreichend schlafen / sich ausruhen / Stress abbauen / sich entspannen',
    'rauchen aufhören / weniger Alkohol trinken / mehr Wasser trinken',
    'Ich versuche, … / Ich achte darauf, dass … / Es ist wichtig, …',
    'Das ist gut / schlecht für die Gesundheit.',
    'Ich fühle mich fitter / gesünder / besser, seit ich … (Perfekt)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Reflexive Verben einsetzen'),
  p('Schreibe Sätze mit den reflexiven Verben. Wähle einen passenden Kontext.'),
  p('Beispiel: sich entspannen → Abends entspanne ich mich beim Lesen.'),
  p('a) sich bewegen →'),
  wLine(),
  p('b) sich ausruhen →', { before: 120 }),
  wLine(),
  p('c) sich ernähren →', { before: 120 }),
  wLine(),
  p('d) sich fühlen (nach einer Veränderung) →', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Gesundheitspläne mit Konjunktiv II'),
  p('Was könntest du an deinem Lebensstil verbessern? Schreibe 5 Sätze mit „sollte", „könnte" oder „würde".'),
  p('Beispiel: Ich sollte öfter zu Fuß gehen statt mit dem Auto zu fahren.'),
  p('1. ________________________________________________________________', { before: 80 }),
  p('2. ________________________________________________________________'),
  p('3. ________________________________________________________________'),
  p('4. ________________________________________________________________'),
  p('5. ________________________________________________________________'),
  ...gap(1),
  h2('Aufgabe 3 — Begründungen mit „weil" schreiben'),
  p('Verbinde den Gesundheitstipp mit einer Begründung. Benutze „weil".'),
  p('a) Man sollte täglich 30 Minuten spazieren gehen, weil ________________________.'),
  wLine(),
  p('b) Ausreichend Schlaf ist wichtig, weil ________________________.', { before: 120 }),
  wLine(),
  p('c) Rauchen ist schädlich für die Gesundheit, weil ________________________.', { before: 120 }),
  wLine(),
  p('d) Man sollte viel Wasser trinken, weil ________________________.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Mein Gesundheitsprogramm'),
  p('Schreibe ein kurzes Gesundheitsprogramm für dich selbst (5–6 Sätze). Was machst du bereits? Was möchtest du ändern? Benutze: Perfekt + Konjunktiv II + Kausalsatz (weil/denn).'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Gesunder Lebensstil'),
  grammarBox([
    '📌  Reflexive Verben — Übersicht:',
    'sich bewegen: Ich bewege mich jeden Tag 30 Minuten.',
    'sich ausruhen: Wir ruhen uns am Wochenende aus.',
    'sich ernähren: Er ernährt sich gesund und ausgewogen.',
    'sich fühlen: Ich fühle mich viel besser, seit ich mehr schlafe.',
    'sich entspannen: Sie entspannt sich abends beim Yoga.',
    'sich erholen: Wir erholen uns im Urlaub.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Musterlösungen'),
  p('a) Ich bewege mich jeden Tag — ich gehe 30 Minuten zu Fuß zur Arbeit.'),
  p('b) Nach der Arbeit ruhe ich mich kurz aus, bevor ich koche.'),
  p('c) Ich ernähre mich ausgewogen: viel Gemüse, wenig Fleisch.'),
  p('d) Ich fühle mich viel fitter, seit ich aufgehört habe zu rauchen.'),
  ...gap(1),
  h2('Aufgabe 2 — Konjunktiv II — Musterlösungen'),
  p('1. Ich sollte öfter zu Fuß gehen statt Bus zu fahren.'),
  p('2. Ich könnte abends früher schlafen gehen.'),
  p('3. Ich würde gerne mehr Sport treiben, wenn ich mehr Zeit hätte.'),
  p('4. Ich sollte weniger Kaffee und mehr Wasser trinken.'),
  p('5. Ich könnte einmal pro Woche ins Fitnessstudio gehen.'),
  ...gap(1),
  h2('Aufgabe 3 — Begründungen (Muster)'),
  p('a) … weil Bewegung das Herz stärkt und man sich danach besser fühlt.'),
  p('b) … weil der Körper im Schlaf regeneriert und Energie tankst.'),
  p('c) … weil Tabak die Lunge schädigt und das Krebsrisiko erhöht.'),
  p('d) … weil Wasser den Stoffwechsel ankurbelt und die Konzentration verbessert.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Mindestens 2 Aktivitäten im Perfekt beschrieben (was bereits gemacht wird)'),
  bullet('Mindestens 2 Verbesserungen im Konjunktiv II'),
  bullet('Mindestens 1 Kausalsatz mit weil oder denn'),
  bullet('Reflexive Verben korrekt konjugiert'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Gesunder Lebensstil — Leseübung'),
  h2('Text: Priyas neues Leben'),
  p('Priya Sharma kommt aus Indien und wohnt seit eineinhalb Jahren in Leipzig. Sie arbeitet als Buchhalterin bei einer Steuerberatungsfirma. Früher war ihr Leben sehr stressig: Sie hat lange gearbeitet, wenig geschlafen und sich kaum bewegt. Zum Frühstück hat sie oft nichts gegessen, und zum Mittagessen hat sie Fast Food gegessen. Abends war sie so müde, dass sie nur noch auf dem Sofa gelegen und ferngesehen hat.'),
  p('Dann hat Priya einen Gesundheitskurs an der Volkshochschule besucht. Der Kurs hat ihr die Augen geöffnet. Sie hat gelernt, wie wichtig Schlaf, Bewegung und Stressabbau für die Gesundheit sind. Seitdem hat sie viel verändert.'),
  p('Jetzt schläft Priya mindestens sieben Stunden pro Nacht. Sie frühstückt jeden Morgen — meistens Haferflocken mit Früchten. Dreimal pro Woche geht sie zum Yoga, und zweimal pro Woche macht sie einen langen Spaziergang im Rosental-Park. Sie hat auch aufgehört zu rauchen — das war schwer, aber sie ist sehr stolz darauf.'),
  p('Ihr Kollege Thomas hat gefragt: „Priya, du siehst so viel besser aus! Was ist dein Geheimnis?" Priya hat gelacht: „Kein Geheimnis — einfach mehr Schlaf, weniger Stress und regelmäßige Bewegung. Ich fühle mich wie ein anderer Mensch!"'),
  p('Natürlich ist nicht alles perfekt. Priya sagt: „Manchmal esse ich noch zu viel Süßes, und manchmal bleibe ich zu lange im Büro. Aber ich versuche, auf mich zu achten — Schritt für Schritt."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Priya wohnt seit zwei Jahren in Leipzig.', ''],
      ['Früher hat Priya oft Fast Food gegessen.', ''],
      ['Priya hat einen Kochkurs an der VHS besucht.', ''],
      ['Priya schläft jetzt mindestens sieben Stunden.', ''],
      ['Priya geht dreimal pro Woche zum Yoga.', ''],
      ['Priya hat mit dem Rauchen aufgehört.', ''],
      ['Priya isst jetzt nie mehr Süßes.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Was hat Priya früher falsch gemacht? Nenne drei Punkte.'),
  wLine(), wLine(), wLine(),
  p('b) Was hat Priya durch den VHS-Kurs gelernt?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was hat Priya jetzt in ihrem Alltag geändert? Nenne vier Dinge.', { before: 120 }),
  wLine(), wLine(), wLine(),
  p('d) Was macht Priya noch nicht perfekt? (laut dem letzten Absatz)', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Früher und heute: Tabelle'),
  stdTable(
    ['Bereich', 'Früher', 'Heute'],
    [
      ['Schlafen', '', ''],
      ['Frühstück', '', ''],
      ['Sport / Bewegung', '', ''],
      ['Rauchen', '', ''],
      ['Allgemeines Gefühl', '', ''],
    ],
    [3000, 4453, 4253]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Gesunder Lebensstil'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Priya wohnt seit zwei Jahren in Leipzig.', 'F (seit eineinhalb Jahren)'],
      ['Früher hat Priya oft Fast Food gegessen.', 'R'],
      ['Priya hat einen Kochkurs an der VHS besucht.', 'F (Gesundheitskurs)'],
      ['Priya schläft jetzt mindestens sieben Stunden.', 'R'],
      ['Priya geht dreimal pro Woche zum Yoga.', 'R'],
      ['Priya hat mit dem Rauchen aufgehört.', 'R'],
      ['Priya isst jetzt nie mehr Süßes.', 'F (manchmal noch zu viel Süßes)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Sie hat lange gearbeitet, wenig geschlafen und sich kaum bewegt. Zum Frühstück hat sie nichts gegessen und mittags Fast Food gegessen.'),
  p('b) Sie hat gelernt, wie wichtig Schlaf, Bewegung und Stressabbau für die Gesundheit sind.'),
  p('c) Mehr Schlaf (7 Stunden), jeden Morgen frühstücken (Haferflocken), 3× Yoga + 2× Spaziergang, aufgehört zu rauchen.'),
  p('d) Sie isst manchmal noch zu viel Süßes und bleibt manchmal zu lange im Büro.'),
  ...gap(1),
  h2('Aufgabe 3 — Früher und heute'),
  stdTable(
    ['Bereich', 'Früher', 'Heute'],
    [
      ['Schlafen', 'wenig Schlaf', 'mindestens 7 Stunden'],
      ['Frühstück', 'oft nichts', 'Haferflocken mit Früchten'],
      ['Sport / Bewegung', 'kaum Bewegung', '3× Yoga + 2× Spaziergang'],
      ['Rauchen', 'hat geraucht', 'aufgehört'],
      ['Allgemeines Gefühl', 'müde, gestresst', 'wie ein anderer Mensch / viel besser'],
    ],
    [3000, 4453, 4253]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Gesunder Lebensstil — Lückentext'),
  infoBox([
    'Wörterkasten: Bewegung  |  Stress  |  Schlaf  |  Entspannung  |  Gewohnheiten',
    '              ausreichend  |  regelmäßig  |  abnehmen  |  aufhören  |  Wohlbefinden'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Gesundheitstext: Fülle die Lücken aus'),
  p('Ein gesunder Lebensstil besteht aus mehreren Bereichen. Erstens ist ________ sehr wichtig: Experten empfehlen, sich täglich mindestens 30 Minuten zu bewegen — zum Beispiel Spazierengehen, Radfahren oder Schwimmen.'),
  p('Zweitens sollte man ________ schlafen — ungefähr sieben bis acht Stunden pro Nacht. Guter ________ hilft dem Körper, sich zu regenerieren.', { before: 100 }),
  p('Drittens ist es wichtig, ________ zu reduzieren. Zu viel Druck und Sorgen können krank machen. ________ — zum Beispiel durch Yoga, Meditation oder ein entspannendes Hobby — ist deshalb sehr wertvoll.', { before: 100 }),
  p('Schlechte ________ wie Rauchen oder übermäßiger Alkoholkonsum sollte man ________ . Viele Menschen versuchen, mit dem Rauchen ________ . Das ist schwer, aber es lohnt sich sehr für das eigene ________ . Wer Sport treibt und gesund isst, kann auch ________ — wenn das nötig ist.', { before: 100 }),
  ...gap(1),
  h2('Aufgabe 2 — Ratschläge mit Konjunktiv II'),
  p('Ergänze die Sätze mit dem Konjunktiv II von sollte / könnte / würde.'),
  p('a) Du ________ öfter zu Fuß gehen — das ist gut fürs Herz.'),
  p('b) Er ________ früher schlafen gehen, wenn er so müde ist.'),
  p('c) Wir ________ weniger Zeit vor dem Bildschirm verbringen.'),
  p('d) Sie ________ vielleicht einen Sportkurs ausprobieren.'),
  p('e) Ich ________ gerne mehr schwimmen — aber ich habe keine Zeit.'),
  ...gap(1),
  h2('Aufgabe 3 — Kausalsätze bilden'),
  p('Verbinde die Satzteile sinnvoll mit „weil". Achte auf die Verbstellung!'),
  infoBox(['Sport ist gut für die Gesundheit — Stress macht krank — Schlaf ist wichtig — Rauchen schadet der Lunge']),
  p('a) Man sollte jeden Tag Sport treiben, ________.'),
  wLine(),
  p('b) Du solltest abends früh schlafen gehen, ________.', { before: 120 }),
  wLine(),
  p('c) Es ist wichtig, Stress zu reduzieren, ________.', { before: 120 }),
  wLine(),
  p('d) Du solltest mit dem Rauchen aufhören, ________.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Aktivitäten zuordnen'),
  p('Welche Aktivität passt zu welchem Bereich? Schreibe die Buchstaben in die Tabelle.'),
  stdTable(
    ['Gesundheitsbereich', 'Aktivitäten (Buchstaben)'],
    [
      ['Bewegung / Sport', ''],
      ['Ernährung', ''],
      ['Entspannung / Stressabbau', ''],
      ['Schlaf / Erholung', ''],
    ],
    [5000, 6706]
  ),
  infoBox([
    'A: Yoga machen  |  B: Salat essen  |  C: Schwimmen gehen  |  D: Früh ins Bett gehen',
    'E: Meditation  |  F: Vollkornbrot kaufen  |  G: Radfahren  |  H: Handy weglegen vor dem Schlafen',
  ]),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Gesunder Lebensstil'),
  h2('Aufgabe 1'),
  p('1. Bewegung  2. ausreichend  3. Schlaf  4. Stress  5. Entspannung'),
  p('6. Gewohnheiten  7. regelmäßig  8. aufhören  9. Wohlbefinden  10. abnehmen'),
  ...gap(1),
  h2('Aufgabe 2 — Konjunktiv II'),
  p('a) solltest  b) sollte  c) sollten  d) könnte  e) würde'),
  grammarBox([
    '📌  Konjunktiv II — sollte / könnte / würde:',
    'sollte: Rat / Empfehlung (Du solltest mehr schlafen.)',
    'könnte: Möglichkeit / Vorschlag (Du könntest Sport ausprobieren.)',
    'würde: Hypothese / Wunsch (Ich würde gerne mehr schwimmen.)',
    '',
    'Formen: ich/er/sie/es sollte | du solltest | wir/sie/Sie sollten | ihr solltet',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Kausalsätze (Muster)'),
  p('a) … weil Sport gut für das Herz und den Kreislauf ist.'),
  p('b) … weil der Körper im Schlaf Energie sammelt und sich regeneriert.'),
  p('c) … weil zu viel Stress krank machen kann.'),
  p('d) … weil Rauchen die Lunge schädigt und das Krebsrisiko erhöht.'),
  p('Hinweis: Verb steht am Ende des weil-Satzes!', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Aktivitäten zuordnen'),
  stdTable(
    ['Bereich', 'Lösung'],
    [
      ['Bewegung / Sport', 'C (Schwimmen), G (Radfahren)'],
      ['Ernährung', 'B (Salat), F (Vollkornbrot)'],
      ['Entspannung / Stressabbau', 'A (Yoga), E (Meditation)'],
      ['Schlaf / Erholung', 'D (früh ins Bett), H (Handy weglegen)'],
    ],
    [5000, 6706]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Gesunder Lebensstil — Wortliste'),
  h2('Teil A — Sport und Bewegung'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['Sport treiben', 'Phrase', 'Sie treibt dreimal pro Woche Sport.'],
      ['sich regelmäßig bewegen', 'reflexiv', 'Er bewegt sich jeden Tag mindestens 30 Minuten.'],
      ['spazieren gehen', 'Verb', 'Ich gehe abends oft im Park spazieren.'],
      ['das Fitnessstudio, -s', 'Nomen', 'Zweimal pro Woche geht sie ins Fitnessstudio.'],
      ['die Ausdauer', 'Nomen', 'Laufen verbessert die Ausdauer.'],
      ['das Wohlbefinden', 'Nomen', 'Sport steigert das allgemeine Wohlbefinden.'],
      ['abnehmen', 'Verb trennbar', 'Er möchte 5 Kilo abnehmen.'],
      ['zunehmen', 'Verb trennbar', 'Sie hat in letzter Zeit zugenommen.'],
    ],
    [3800, 2200, 5706]
  ),
  ...gap(1),
  h2('Teil B — Stress, Schlaf und Entspannung'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['sich entspannen', 'reflexiv', 'Sie entspannt sich beim Lesen.'],
      ['sich erholen', 'reflexiv', 'Wir erholen uns im Urlaub.'],
      ['der Stress (kein Pl.)', 'Nomen', 'Zu viel Stress ist schlecht für die Gesundheit.'],
      ['ausreichend schlafen', 'Phrase', 'Man sollte ausreichend schlafen — 7–8 Stunden.'],
      ['mit dem Rauchen aufhören', 'Phrase', 'Er hat vor einem Jahr mit dem Rauchen aufgehört.'],
      ['auf sich achten', 'Phrase', 'Es ist wichtig, auf sich zu achten.'],
      ['der Lebensstil, -e', 'Nomen', 'Ein gesunder Lebensstil beugt Krankheiten vor.'],
      ['die Gewohnheit, -en', 'Nomen', 'Alte Gewohnheiten sind schwer zu ändern.'],
    ],
    [3800, 2200, 5706]
  ),
  ...gap(1),
  tippBox([
    '💡  10 Tipps für einen gesunden Lebensstil:',
    '1. Täglich 30 Min. bewegen (Spaziergang, Rad, Schwimmen)',
    '2. 7–8 Stunden schlafen',
    '3. Täglich 5 Portionen Obst und Gemüse essen',
    '4. Mindestens 1,5 Liter Wasser trinken',
    '5. Stress reduzieren (Yoga, Meditation, Hobby)',
    '6. Nicht rauchen / wenig Alkohol',
    '7. Regelmäßige Arzttermine wahrnehmen',
    '8. Bildschirmzeit abends reduzieren',
    '9. Soziale Kontakte pflegen',
    '10. Freude am Alltag finden',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('der Lebensstil: ___________  |  das Wohlbefinden: ___________  |  die Ausdauer: ___________'),
  p('sich entspannen: ___________  |  abnehmen: ___________  |  die Gewohnheit: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Gesunder Lebensstil'),
  p('Vokabelliste ohne Lücken. Lösungshinweise für den Unterricht:'),
  ...gap(1),
  grammarBox([
    '📌  Trennbare Verben: abnehmen / zunehmen',
    'Ich nehme ab. / Er hat 5 Kilo abgenommen. (Perfekt: abgenommen)',
    'Sie nimmt zu. / Du hast zugenommen. (Perfekt: zugenommen)',
    '',
    '📌  Reflexive Verben — Unterschied:',
    'sich erholen: nach Anstrengung / Krankheit (langfristig)',
    'sich ausruhen: kurze Pause machen (kurzfristig)',
    'sich entspannen: aktiv Stress abbauen (Yoga, Lesen, Musik)',
    '',
    '📌  Aufhören + zu + Infinitiv:',
    'Ich habe aufgehört zu rauchen. (trennbar: auf|gehört)',
    'Sie versucht aufzuhören. (zu zwischen Präfix und Verb)',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich versuche, täglich spazieren zu gehen, weil das gut für die Ausdauer ist.'),
  p('Seit ich mit dem Rauchen aufgehört habe, fühle ich mich viel besser.'),
  p('Ein gesunder Lebensstil bedeutet nicht Perfektion — es geht um gute Gewohnheiten.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Gesunder Lebensstil — Konversation'),
  h2('Aufgabe 1 — Dialog: Gesundheitstipps austauschen'),
  p('Zwei Freunde sprechen über ihren Lebensstil. Person A lebt gesund, Person B hat schlechte Gewohnheiten. Ergänze den Dialog.'),
  infoBox([
    '💬  Tipps geben: Du solltest … / Ich empfehle dir … / Hast du schon probiert, …?',
    '   Reaktion: Das stimmt, aber … / Ich weiß, ich versuche es. / Das ist leichter gesagt als getan.',
    '   Fragen: Wie schaffst du das? / Wann hast du angefangen? / Macht das wirklich Spaß?',
  ]),
  ...gap(1),
  p('Person B: „Ich fühle mich in letzter Zeit so müde und schlapp."'),
  p('Person A: „Das kenne ich. Schläfst du genug?"'),
  p('Person B: „Eigentlich nicht — ich schlafe nur ________________________ Stunden."'),
  p('Person A: „Das ist zu wenig! Du solltest mindestens ________________________ schlafen."'),
  p('Person B: „Ich weiß, aber ich schaffe es nicht — ich bin immer so gestresst."'),
  p('Person A: „Hast du schon probiert, ________________________ ? Das hilft mir sehr."'),
  p('Person B: „Nein, noch nicht. Machst du auch Sport?"'),
  p('Person A: „Ja, ________________________. Das gibt mir viel Energie."'),
  p('Person B: „Das klingt gut. Ich könnte vielleicht ________________________."'),
  p('Person A: „Fang einfach klein an — zum Beispiel ________________________!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Gesundheits-Coaching'),
  p('Person A ist Gesundheitsberater/in. Person B möchte einen gesünderen Lebensstil. 10 Minuten Gespräch.'),
  stdTable(
    ['Schritt', 'Gesundheitsberater/in (A)', 'Klient/in (B)'],
    [
      ['1', 'Begrüßen. Fragen: Was möchten Sie verbessern?', 'Drei Probleme nennen (Schlaf / Stress / Bewegung).'],
      ['2', 'Zu jedem Problem einen Rat geben (sollte/könnte).', 'Nachfragen: Wie oft? / Wie lange? / Wo?'],
      ['3', 'Einen konkreten Plan für eine Woche vorschlagen.', 'Einen Punkt akzeptieren, einen ablehnen mit Grund.'],
      ['4', 'Ermutigen. Abschließen: Was ist Ihr erstes Ziel?', 'Ein konkretes Ziel für diese Woche nennen.'],
    ],
    [700, 5203, 5803]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Dein Lebensstil'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wie viele Stunden schläfst du durchschnittlich?', ''],
      ['Welchen Sport oder welche Bewegung magst du?', ''],
      ['Was tust du, wenn du gestresst bist?', ''],
      ['Was war die größte Änderung in deinem Lebensstil?', ''],
      ['Was möchtest du an deinem Lebensstil noch verbessern?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Gesundheitstipps-Kette'),
  p('Jede Person nennt einen Gesundheitstipp — aber keinen, der schon genannt wurde! Die Gruppe macht eine Kette.'),
  tippBox([
    '⛓  Beispiel:',
    'Person 1: „Ich trinke jeden Morgen ein Glas Wasser, weil das den Stoffwechsel ankurbelt."',
    'Person 2: „Ich gehe dreimal pro Woche spazieren, weil Bewegung gut für das Herz ist."',
    'Person 3: „Ich lese abends ein Buch statt aufs Handy zu schauen, weil ich dann besser schlafe."',
    '🏆  Wer kann die längste Kette bilden, ohne eine Wiederholung?',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Gesunder Lebensstil'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Konjunktiv II korrekt genutzt (solltest / könntest / würdest)'),
  bullet('Kausalsätze mit weil verwendet'),
  bullet('Reaktionen auf Tipps realistisch und grammatisch korrekt'),
  bullet('Reflexive Verben korrekt konjugiert'),
  bullet('Natürlicher Gesprächsfluss zwischen A und B'),
  ...gap(1),
  h2('Muster-Ausfüllung des Dialogs'),
  p('B: „… nur fünf Stunden."'),
  p('A: „… mindestens sieben bis acht Stunden schlafen."'),
  p('A: „… abends 10 Minuten zu meditieren oder Yoga zu machen?"'),
  p('A: „… gehe dreimal pro Woche joggen / mache Yoga / schwimme."'),
  p('B: „… mit dem Radfahren anfangen / einen Yogakurs ausprobieren."'),
  p('A: „… geh jeden Abend 15 Minuten spazieren!"'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Rollenspiel'),
  bullet('Berater/in: Konjunktiv II für Ratschläge (sollte / könnte)'),
  bullet('Berater/in: Konkrete Vorschläge mit Zeitangaben'),
  bullet('Klient/in: Probleme klar beschrieben (seit + Dativ)'),
  bullet('Klient/in: Rückfragen sinnvoll gestellt'),
  bullet('Beide: Höfliche Kommunikation, vollständige Sätze'),
  ...gap(1),
  h2('Aufgabe 4 — Beispiel-Kette'),
  p('1. „Ich trinke jeden Morgen ein Glas Wasser, weil das gut für den Stoffwechsel ist."'),
  p('2. „Ich gehe dreimal pro Woche spazieren, weil Bewegung das Herz stärkt."'),
  p('3. „Ich esse jeden Abend Gemüse, weil Vitamine wichtig sind."'),
  p('4. „Ich schlafe jeden Tag 8 Stunden, weil Schlaf den Körper regeneriert."'),
  p('5. „Ich meditiere 10 Minuten am Tag, weil das Stress abbaut."'),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Gesunder Lebensstil — Bildaufgaben'),
  h2('Aufgabe 1 — Gesunde vs. ungesunde Gewohnheiten'),
  p('[BILD 1: Zwei Personen nebeneinander — links: Person A (joggt im Park, lacht, hält Wasserflasche); rechts: Person B (sitzt auf Sofa mit Chips und Cola, sieht müde aus)]'),
  p('a) Beschreibe beide Personen in je 2 Sätzen.'),
  wLine(), wLine(), wLine(), wLine(),
  p('b) Was sollte Person B ändern? Schreibe 3 Ratschläge mit „solltest".', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Wochenplan für einen gesunden Lebensstil'),
  p('[BILD 2: Ein leerer Wochenplan (Montag bis Sonntag) mit drei Zeilen: Sport/Bewegung, Entspannung, Ernährung]'),
  p('Fülle den Wochenplan mit eigenen Ideen aus. Was könntest du diese Woche tun?'),
  stdTable(
    ['Tag', 'Sport / Bewegung', 'Entspannung', 'Ernährung (1 Tipp)'],
    [
      ['Montag', '', '', ''],
      ['Dienstag', '', '', ''],
      ['Mittwoch', '', '', ''],
      ['Donnerstag', '', '', ''],
      ['Freitag', '', '', ''],
      ['Samstag', '', '', ''],
      ['Sonntag', '', '', ''],
    ],
    [2000, 3302, 3302, 3102]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Stressquellen erkennen'),
  p('[BILD 3: Eine gestresste Person am Schreibtisch — viele Papiere, Telefon klingelt, Uhr zeigt 19:30 Uhr, leere Kaffeetassen, Handy blinkt mit vielen Nachrichten]'),
  p('a) Was verursacht Stress auf dem Bild? Nenne mindestens 4 Dinge.'),
  wLine(), wLine(), wLine(),
  p('b) Was könnte die Person tun, um den Stress zu reduzieren? Schreibe 3 Tipps.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Schlafzeiten auswerten'),
  p('[BILD 4: Einfaches Balkendiagramm mit Schlafzeiten einer Person: Mo 5h / Di 6h / Mi 5,5h / Do 7h / Fr 4h / Sa 9h / So 8h — Empfehlung: 7–8h eingezeichnet als gestrichelte Linie]'),
  p('a) An welchen Tagen schläft die Person zu wenig?'),
  wLine(),
  p('b) Was ist der Durchschnitt (Summe ÷ 7)? Berechne!', { before: 120 }),
  wLine(),
  p('c) Was würdest du der Person empfehlen? (2 Sätze mit „solltest")', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Gesunder Lebensstil'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Gewohnheiten'),
  p('Person A: Sie joggt im Park und lacht. Sie hält eine Wasserflasche und sieht fit und glücklich aus.'),
  p('Person B: Sie sitzt auf dem Sofa und isst Chips. Sie trinkt Cola und sieht müde und ungesund aus.'),
  p('Ratschläge: Du solltest öfter nach draußen gehen. / Du solltest weniger Chips und Cola konsumieren. / Du solltest früher schlafen gehen.'),
  ...gap(1),
  h2('Aufgabe 2 — Wochenplan'),
  p('Individuelle Antworten. Lehrkraft prüft: Sind die Aktivitäten realistisch und gesund? Sind vollständige Sätze verwendet?', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 3 — Stressquellen'),
  p('a) Stressquellen: viele Papiere (viel Arbeit), klingendes Telefon, späte Uhrzeit (19:30 Uhr), viele Kaffeetassen (zu viel Koffein), blinkendes Handy mit vielen Nachrichten.'),
  p('b) Sie könnte das Handy abschalten. / Sie sollte früher Feierabend machen. / Sie könnte einen kurzen Spaziergang machen.'),
  ...gap(1),
  h2('Aufgabe 4 — Schlafzeiten'),
  p('a) Zu wenig: Montag (5h), Dienstag (6h), Mittwoch (5,5h), Freitag (4h) — alle unter 7 Stunden.'),
  p('b) Durchschnitt: (5 + 6 + 5,5 + 7 + 4 + 9 + 8) ÷ 7 = 44,5 ÷ 7 ≈ 6,4 Stunden — unter der Empfehlung.'),
  p('c) Du solltest unter der Woche früher ins Bett gehen. / Du solltest versuchen, jeden Tag ungefähr zur gleichen Zeit zu schlafen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
