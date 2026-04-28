// A2_Erwachsene — Thema 08 UP 02: Soziale Kontakte und Einladungen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Soziale Kontakte und Einladungen';
const HEADING = 'Thema 08 — Familie & soziales Leben';
const SUBHEAD = 'UP 02: Soziale Kontakte und Einladungen';
const PREFIX  = 'A2_Erwachsene_FamilieSoziales_02_SozialeKontakte';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '08_FamilieSoziales', '02_SozialeKontakte');
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
const socialBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '0277BD' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '0277BD' }, left: { style: BorderStyle.SINGLE, size: 12, color: '0277BD' }, right: { style: BorderStyle.SINGLE, size: 12, color: '0277BD' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E1F5FE' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Soziale Kontakte und Einladungen — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Einladungen und soziale Kontakte:',
    'Einladen: Ich möchte Sie / dich herzlich einladen zu … / Hast du Lust zu kommen?',
    'Zusagen: Ja, ich komme sehr gerne! / Ich freue mich darauf!',
    'Absagen: Leider kann ich nicht kommen, weil … / Es tut mir leid, aber …',
    'Gegeneinladung: Dann lade ich dich nächste Woche zu mir ein!',
    'Smalltalk: Wie läuft es bei dir? / Was machst du so? / Hast du viel zu tun?',
    'Zweck: Ich schreibe dir, um … / Ich rufe an, weil …',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Einladung schreiben'),
  p('Sie möchten Freunde oder Kollegen zu einer kleinen Feier einladen (Geburtstag, Hauseinweihung, Grillabend …). Schreiben Sie eine kurze Einladung (4–5 Sätze): Anlass, Datum, Uhrzeit, Ort, was die Gäste mitbringen sollen.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Absage schreiben'),
  p('Sie haben eine Einladung zu einer Geburtstagsfeier bekommen, können aber leider nicht kommen. Schreiben Sie eine freundliche Absage (4–5 Sätze): Nennen Sie den Grund, entschuldigen Sie sich, wünschen Sie schöne Feier und schlagen Sie einen anderen Treffpunkt vor.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Nebensätze mit damit und um … zu'),
  grammarBox([
    'Finalsätze — Zweck ausdrücken:',
    'um … zu + Infinitiv (gleiches Subjekt):',
    '  Ich schreibe dir, um dich einzuladen.',
    '  Er kommt früh, um einen guten Platz zu bekommen.',
    'damit + Nebensatz (verschiedene Subjekte):',
    '  Ich schreibe dir, damit du früh Bescheid weißt.',
    '  Er ruft an, damit wir nicht warten müssen.',
  ]),
  ...gap(1),
  p('Ergänze: um … zu oder damit.'),
  p('a) Ich schreibe dir, ________ du die Einladung nicht vergisst.'),
  p('b) Sie hat früh gekocht, ________ das Essen rechtzeitig fertig zu haben.'),
  p('c) Er hat extra Getränke gekauft, ________ alle etwas zu trinken haben.'),
  p('d) Wir kommen eine Stunde früher, ________ beim Aufbau zu helfen.'),
  p('e) Ich habe eine Erinnerung geschickt, ________ niemand vergisst zu kommen.'),
  p('f) Sie hat den Kuchen bestellt, ________ ihn nicht selbst backen zu müssen.'),
  ...gap(1),
  h2('Aufgabe 4 — Einladungs-E-Mail: formell'),
  p('Ihr Arbeitgeber organisiert ein Teamessen und bittet Sie, eine formelle Einladungs-E-Mail an alle Kollegen zu schreiben (5–6 Sätze). Benutzen Sie: werden (Futur I), damit-Satz, höfliche Formulierungen.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Soziale Kontakte und Einladungen'),
  grammarBox([
    'um … zu vs. damit — Entscheidungshilfe:',
    'Gleiches Subjekt in beiden Teilsätzen → um … zu',
    '  Ich komme früh, um zu helfen.  (ich = ich)',
    'Verschiedene Subjekte → damit',
    '  Ich komme früh, damit du nicht alleine bist.  (ich ≠ du)',
    'Beides mit Infinitiv am Ende (um … zu) oder Verb am Ende (damit).',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Einladung'),
  p('Hey alle zusammen! Ich möchte euch herzlich zu meinem Geburtstag einladen. Die Feier findet am Samstag, dem 10. Mai, ab 19 Uhr bei mir zu Hause statt (Gartenstraße 12, Köln). Wenn ihr mögt, bringt bitte etwas zu trinken mit — ich kümmere mich ums Essen. Ich freue mich sehr auf euch!'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Absage'),
  p('Liebe Anna! Vielen Dank für deine Einladung zu deiner Geburtstagsfeier — leider kann ich leider nicht kommen, weil ich an dem Wochenende auf Dienstreise bin. Es tut mir wirklich leid! Ich wünsche dir einen wunderschönen Abend mit vielen lieben Menschen. Lass uns nächste Woche zusammen einen Kaffee trinken gehen — das würde ich sehr gerne nachholen!'),
  ...gap(1),
  h2('Aufgabe 3 — um … zu / damit'),
  p('a) damit  (verschiedene Subjekte: ich schreibe — du vergisst nicht)'),
  p('b) um … zu  (gleiches Subjekt: sie hat gekocht — sie hat fertig)'),
  p('c) damit  (verschiedene Subjekte: er kauft — alle haben)'),
  p('d) um … zu  (gleiches Subjekt: wir kommen — wir helfen)'),
  p('e) damit  (verschiedene Subjekte: ich schicke — niemand vergisst)'),
  p('f) um … zu  (gleiches Subjekt: sie bestellt — sie muss nicht backen)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien formelle E-Mail'),
  bullet('Formelle Anrede: Liebe Kolleginnen und Kollegen,'),
  bullet('Futur I korrekt: Das Teamessen wird … stattfinden.'),
  bullet('damit-Satz: …, damit alle rechtzeitig planen können.'),
  bullet('Bitte um Rückmeldung: Bitte geben Sie bis … Bescheid.'),
  bullet('Formeller Abschluss: Mit freundlichen Grüßen'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Soziale Kontakte und Einladungen — Leseübung'),
  h2('Text: Fatous Netzwerk in München'),
  p('Fatou Diallo kommt aus dem Senegal und lebt seit zwei Jahren in München. Sie studiert Informatik an der TU München und wohnt in einem Studentenwohnheim. Das Leben in einer fremden Stadt war am Anfang nicht leicht — Fatou kannte niemanden und hat sich manchmal sehr einsam gefühlt.'),
  p('Alles hat sich verändert, als Fatou im ersten Semester an einem internationalen Sprachcafé teilgenommen hat. Das Sprachcafé findet jeden Dienstag von 18 bis 20 Uhr in einem Café in der Innenstadt statt. Dort treffen sich Deutsche und Nicht-Deutsche, um Sprachen zu üben und neue Leute kennenzulernen. Fatou hat dort gleich zwei Freundinnen gefunden: Mei aus China und Rebeca aus Brasilien.'),
  p('Einige Wochen später hat Fatou eine Einladung von Mei bekommen: „Ich mache am Samstag eine kleine Geburtstagsfeier bei mir zu Hause — kommst du?" Fatou war sofort dabei. Die Feier war gemütlich und entspannt — Meis Wohnzimmer war voller Menschen aus acht verschiedenen Ländern. Fatou hat dort auch Jonas kennengelernt, einen deutschen Studenten, der sie später zu einer Stadtteilfeier mitgenommen hat.'),
  p('Heute hat Fatou ein kleines, aber enges soziales Netzwerk. Sie trifft sich einmal pro Woche mit Mei und Rebeca, geht manchmal mit Jonas und seinen Freunden ins Kino und ist Mitglied in einer kleinen Kochgruppe. „In Deutschland braucht man etwas Geduld, um Freundschaften zu knüpfen", sagt Fatou. „Aber wenn man erst mal dabei ist, sind die Menschen sehr herzlich und zuverlässig." Sie hat auch gelernt, dass es wichtig ist, selbst aktiv zu werden — auf Einladungen zu reagieren und selbst einzuladen.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Fatou wohnt seit zwei Jahren in München.', ''],
      ['Das Sprachcafé findet montags statt.', ''],
      ['Fatou hat beim Sprachcafé zwei Freundinnen gefunden.', ''],
      ['Meis Geburtstagsfeier war ein großes, formelles Event.', ''],
      ['Fatou hat Jonas bei Meis Feier kennengelernt.', ''],
      ['Fatou ist Mitglied in einer Sportgruppe.', ''],
      ['Fatou findet, man muss selbst aktiv sein, um Freundschaften zu knüpfen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum hat sich Fatou am Anfang einsam gefühlt?'),
  wLine(),
  p('b) Was ist das Ziel des Sprachcafés?', { before: 120 }),
  wLine(),
  p('c) Was hat Fatou bei Meis Feier überrascht?', { before: 120 }),
  wLine(),
  p('d) Was ist Fatous wichtigste Erkenntnis über soziale Kontakte in Deutschland?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Fatous soziales Netzwerk'),
  stdTable(
    ['Person', 'Herkunft', 'Wo kennengelernt?', 'Was machen sie zusammen?'],
    [
      ['Mei', '', '', ''],
      ['Rebeca', '', '', ''],
      ['Jonas', '', '', ''],
    ],
    [2800, 2200, 3000, 3706]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Soziale Kontakte und Einladungen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Fatou wohnt seit zwei Jahren in München.', 'R'],
      ['Das Sprachcafé findet montags statt.', 'F (dienstags)'],
      ['Fatou hat beim Sprachcafé zwei Freundinnen gefunden.', 'R'],
      ['Meis Geburtstagsfeier war ein großes, formelles Event.', 'F (klein, gemütlich, entspannt)'],
      ['Fatou hat Jonas bei Meis Feier kennengelernt.', 'R'],
      ['Fatou ist Mitglied in einer Sportgruppe.', 'F (Kochgruppe)'],
      ['Fatou findet, man muss selbst aktiv sein, um Freundschaften zu knüpfen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Sie kam neu in die Stadt und kannte niemanden — sie hatte noch kein soziales Netzwerk.'),
  p('b) Deutsche und Nicht-Deutsche treffen sich, um Sprachen zu üben und neue Leute kennenzulernen.'),
  p('c) Es waren Menschen aus acht verschiedenen Ländern da — eine sehr internationale, bunte Gruppe.'),
  p('d) Man braucht Geduld, muss selbst aktiv sein, auf Einladungen reagieren und selbst einladen.'),
  ...gap(1),
  h2('Aufgabe 3 — Netzwerk-Tabelle'),
  stdTable(
    ['Person', 'Herkunft', 'Wo kennengelernt?', 'Was zusammen?'],
    [
      ['Mei', 'China', 'Sprachcafé', 'wöchentliches Treffen, Geburtstagsfeiern'],
      ['Rebeca', 'Brasilien', 'Sprachcafé', 'wöchentliches Treffen'],
      ['Jonas', 'Deutschland', 'Meis Geburtstagsfeier', 'Kino, Stadtteilfeier'],
    ],
    [2800, 2200, 3000, 3706]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Soziale Kontakte und Einladungen — Lückentext'),
  infoBox([
    'Wörterkasten: einladen  |  zusagen  |  absagen  |  Gastgeber  |  mitbringen',
    '              Einladung  |  Termin  |  Gäste  |  höflich  |  verabreden'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Einladungstext: Fülle die Lücken aus'),
  p('In Deutschland ist es üblich, Freunde und Bekannte zu sich nach Hause ________. Als ________ bereitet man meistens Essen und Getränke vor. Die ________ erhalten eine ________ — entweder persönlich, per Nachricht oder per E-Mail. Es ist wichtig, rechtzeitig einen ________ zu finden, damit alle kommen können.'),
  p('Wer kommt, sagt ________. Wer nicht kommen kann, soll so früh wie möglich ________. Es ist ________ üblich, als Gast etwas ________ — zum Beispiel eine Flasche Wein, Blumen oder einen Kuchen. So bedankt man sich für die Einladung.', { before: 120 }),
  p('In der Freizeit ist es auch schön, sich spontan zu ________ — zum Beispiel für einen Spaziergang oder einen Kaffee. So pflegt man soziale Kontakte, auch ohne großen Aufwand.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Einladungs-Dialog: Lücken füllen'),
  infoBox(['Wörterkasten: freuen  |  mitbringen  |  leider  |  absagen  |  Lust  |  passt']),
  ...gap(1),
  p('Person A: „Hey! Ich mache am Samstag eine kleine Party — hast du ________?"'),
  p('Person B: „Oh ja, ich ________ mich sehr! Was soll ich ________?"'),
  p('Person A: „Einfach etwas zu trinken, wenn du magst. Um wie viel Uhr ________ dir?"'),
  p('Person B: „Ab 19 Uhr ist perfekt. Oh, aber ich muss kurz fragen — darf ich noch jemanden mitbringen?"'),
  p('Person A: „Natürlich! Je mehr, desto besser. Sag mir nur Bescheid, falls du doch ________ musst."'),
  p('Person B: „Mach ich. ________ kann ich nicht — ich freue mich wirklich sehr!"'),
  ...gap(1),
  h2('Aufgabe 3 — um … zu / damit einsetzen'),
  p('Ergänze um … zu oder damit.'),
  p('a) Ich habe früh geschrieben, ________ du noch Zeit hast, zu planen.'),
  p('b) Sie hat den Kuchen selbst gebacken, ________ alle eine Freude zu machen.'),
  p('c) Er hat extra Stühle besorgt, ________ alle einen Sitzplatz haben.'),
  p('d) Ich rufe dich heute Abend an, ________ die Details zu besprechen.'),
  p('e) Sie hat die Gäste früh informiert, ________ niemand zu spät kommt.'),
  p('f) Wir haben aufgeräumt, ________ die Wohnung schön für die Gäste zu machen.'),
  ...gap(1),
  h2('Aufgabe 4 — Zweiteilige Konjunktionen: entweder … oder / sowohl … als auch / weder … noch'),
  grammarBox([
    'Zweiteilige Konjunktionen:',
    'entweder … oder:   Entweder kommst du um 18 Uhr oder um 19 Uhr.',
    'sowohl … als auch: Sie ist sowohl freundlich als auch hilfsbereit.',
    'weder … noch:      Er kommt weder pünktlich noch meldet er sich ab.',
    'nicht nur … sondern auch: Sie hat nicht nur Essen gekocht, sondern auch gebacken.',
  ]),
  ...gap(1),
  p('Verbinde die Sätze mit der passenden Konjunktion.'),
  p('a) Sie kann freitags kommen. Sie kann samstags kommen. (entweder … oder)'),
  wLine(),
  p('b) Die Feier war lustig. Die Feier war entspannt. (sowohl … als auch)', { before: 120 }),
  wLine(),
  p('c) Er hat nicht geantwortet. Er ist nicht gekommen. (weder … noch)', { before: 120 }),
  wLine(),
  p('d) Sie hat Blumen mitgebracht. Sie hat auch eine Flasche Wein mitgebracht. (nicht nur … sondern auch)', { before: 120 }),
  wLine(),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Soziale Kontakte und Einladungen'),
  h2('Aufgabe 1'),
  p('1. einzuladen  2. Gastgeber  3. Gäste  4. Einladung  5. Termin'),
  p('6. zu  7. absagen  8. höflich  9. mitbringen  10. verabreden'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Lust  2. freue  3. mitbringen  4. passt  5. absagen  6. Leider'),
  ...gap(1),
  h2('Aufgabe 3 — um … zu / damit'),
  p('a) damit  (du = andere Person als ich)'),
  p('b) um … zu  (sie = sie)'),
  p('c) damit  (er = andere Person als alle)'),
  p('d) um … zu  (ich = ich)'),
  p('e) damit  (sie = andere Person als niemand)'),
  p('f) um … zu  (wir = wir)'),
  ...gap(1),
  h2('Aufgabe 4 — Zweiteilige Konjunktionen'),
  p('a) Sie kann entweder freitags oder samstags kommen.'),
  p('b) Die Feier war sowohl lustig als auch entspannt.'),
  p('c) Er hat weder geantwortet noch ist er gekommen.'),
  p('d) Sie hat nicht nur Blumen mitgebracht, sondern auch eine Flasche Wein.'),
  grammarBox([
    'Wortstellung bei zweiteiligen Konjunktionen:',
    'entweder … oder:     Normal — Verb bleibt auf Pos. 2.',
    'sowohl … als auch:   Beide Teile haben normales Verb.',
    'weder … noch:        Verb bleibt auf Pos. 2 in beiden Teilen.',
    'nicht nur … sondern auch: „sondern" leitet Hauptsatz ein — Verb Pos. 2.',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Soziale Kontakte und Einladungen — Wortliste'),
  h2('Teil A — Einladungen und soziale Treffen'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['einladen (trennb.)', 'Verb', 'Ich lade dich herzlich zu meiner Feier ein.'],
      ['die Einladung, -en', 'Nomen', 'Hast du meine Einladung bekommen?'],
      ['zusagen', 'Verb', 'Er hat sofort zugesagt — er kommt!'],
      ['absagen', 'Verb', 'Sie musste leider absagen — sie ist krank.'],
      ['der Gastgeber / die Gastgeberin', 'Nomen', 'Der Gastgeber hat tolles Essen vorbereitet.'],
      ['mitbringen (trennb.)', 'Verb', 'Was soll ich zur Feier mitbringen?'],
      ['sich verabreden (mit)', 'Verb (refl.)', 'Wir haben uns für Freitag verabredet.'],
      ['kennenlernen (trennb.)', 'Verb', 'Ich habe meinen besten Freund im Verein kennengelernt.'],
      ['die Verabredung, -en', 'Nomen', 'Ich habe morgen eine Verabredung mit alten Freunden.'],
      ['höflich / unhöflich', 'Adj.', 'Es ist höflich, sich für eine Einladung zu bedanken.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Soziale Kontakte und Beziehungen pflegen'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['Kontakt halten (mit)', 'in Verbindung bleiben', 'Wir halten Kontakt über WhatsApp.'],
      ['sich melden (bei)', 'schreiben/anrufen', 'Ich melde mich morgen bei dir!'],
      ['Freundschaft schließen', 'Freunde werden', 'Sie hat schnell Freundschaft geschlossen.'],
      ['ein gutes Verhältnis haben', 'gut miteinander auskommen', 'Wir haben ein sehr gutes Verhältnis.'],
      ['jemanden vermissen', 'an jemanden denken (fehlt)', 'Ich vermisse meine Kollegen aus dem alten Job.'],
      ['sich wohlfühlen (bei/in)', 'sich gut/entspannt fühlen', 'Ich fühle mich bei euch immer sehr wohl.'],
      ['einsam fühlen', 'allein, ohne Kontakte', 'Anfangs hat sie sich sehr einsam gefühlt.'],
      ['aktiv werden / aktiv sein', 'selbst Initiative ergreifen', 'Man muss selbst aktiv werden, um Kontakte zu knüpfen.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  socialBox([
    'Soziale Kontakte knüpfen in Deutschland — Tipps:',
    'Vereine und Kurse: Sport, Musik, Sprachen, Kochen — tolle Orte, Menschen zu treffen',
    'Sprachcafés und Sprachaustausch: oft kostenlos, sehr offen für Neuankömmlinge',
    'Nachbarschaft: in Deutschland grüßt man sich im Treppenhaus — ein guter Einstieg',
    'Kollegen: nach der Arbeit gemeinsam etwas trinken ist häufig und normal',
    'Knigge: pünktlich erscheinen, sich bedanken, etwas mitbringen — zeigt Respekt',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('einladen: ___________  |  zusagen: ___________  |  absagen: ___________'),
  p('die Verabredung: ___________  |  sich melden: ___________  |  höflich: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Soziale Kontakte und Einladungen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Trennbare Verben rund um soziale Kontakte:',
    'einladen:      Ich lade ein. / Ich habe eingeladen.',
    'absagen:       Ich sage ab. / Ich habe abgesagt.',
    'zusagen:       Ich sage zu. / Ich habe zugesagt.',
    'mitbringen:    Ich bringe mit. / Ich habe mitgebracht.',
    'kennenlernen:  Ich lerne kennen. / Ich habe kennengelernt.',
    'sich verabreden: Ich verabrede mich. / Ich habe mich verabredet.',
    '',
    'Reflexiv: sich melden, sich wohlfühlen, sich verabreden, sich einsam fühlen',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich habe meine neue Nachbarin zum Kaffee eingeladen — sie hat sofort zugesagt.'),
  p('Am Anfang habe ich mich sehr einsam gefühlt, aber jetzt habe ich viele neue Freunde kennengelernt.'),
  p('Es ist höflich, sich rechtzeitig zu melden, wenn man absagen muss.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Soziale Kontakte und Einladungen — Konversation'),
  h2('Aufgabe 1 — Dialog: Jemanden einladen'),
  p('Person A lädt Person B zu einer Feier ein. Ergänzt den Dialog.'),
  infoBox([
    'Einladen: Hast du am … Lust zu …? / Ich möchte dich herzlich einladen.',
    'Zusagen: Ja, sehr gerne! / Ich freue mich! / Um wie viel Uhr?',
    'Nachfragen: Was soll ich mitbringen? / Wie viele Leute kommen?',
    'Absagen: Leider kann ich nicht, weil … / Kannst du mir ein anderes Mal Bescheid geben?',
    'Gegenvorschlag: Wie wäre es nächsten …? / Dann treffen wir uns einfach zu zweit.',
  ]),
  ...gap(1),
  p('Person A: „Hey! Ich mache am ________ eine kleine ________. Hast du Lust zu kommen?"'),
  p('Person B: „Oh, das klingt toll! Ja, ich ________! Wann genau?"'),
  p('Person A: „Ab ________ Uhr bei mir zu Hause. Adresse schicke ich dir noch."'),
  p('Person B: „Super. Soll ich etwas ________?"'),
  p('Person A: „Wenn du magst, ________ — aber es ist kein Muss."'),
  p('Person B: „Klar, ich bringe ________ mit. Kommen noch andere Leute?"'),
  p('Person A: „Ja, ________ — alles nette Menschen. Ich freue mich, dass du ________!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Einladung annehmen oder absagen'),
  stdTable(
    ['Situation A — Einladung annehmen', 'Situation B — Einladung absagen'],
    [
      ['Sie werden zu einem Geburtstag eingeladen.', 'Sie werden zu einer Feier eingeladen.'],
      ['Sagen Sie zu und fragen nach Details (Was mitbringen? Wie viele Leute?).', 'Sagen Sie höflich ab und nennen Sie einen Grund.'],
      ['Schlagen Sie vor, gemeinsam etwas zum Essen vorzubereiten.', 'Bedauern Sie und schlagen Sie einen anderen Termin vor.'],
      ['Bedanken Sie sich für die Einladung.', 'Wünschen Sie eine schöne Feier.'],
    ],
    [5703, 5703]
  ),
  socialBox([
    'Typische deutsche Einladungsformen:',
    'Geburtstagsfeier: oft zu Hause, manchmal im Restaurant, Gäste bringen oft Blumen oder Wein mit',
    'Grillabend: im Garten oder auf dem Balkon, jeder bringt etwas mit (Fleisch, Salat, Getränke)',
    'Hauseinweihung (Einzugsparty): nach einem Umzug, informell, jeder bringt etwas für die Wohnung',
    'Knigge: pünktlich kommen (höchstens 5–10 Min. zu spät), sich bedanken, nicht zu früh gehen',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Soziale Kontakte'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wie haben Sie in Deutschland neue Freundschaften geschlossen?', ''],
      ['Laden Sie Freunde oft zu sich ein? Was machen Sie dann?', ''],
      ['Was machen Sie, wenn Sie eine Einladung absagen müssen?', ''],
      ['Welche Aktivitäten finden Sie gut, um Menschen kennenzulernen?', ''],
      ['Wie pflegen Sie Kontakt zu Freunden, die weit weg wohnen?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Ketteneinladung"'),
  p('Person A lädt Person B ein. Person B sagt zu und lädt dann Person C ein — mit einer kleinen Änderung (anderer Anlass, andere Uhrzeit). So weiter durch die ganze Gruppe.'),
  infoBox([
    'Jede Einladung muss enthalten:',
    '1. Anlass (Geburtstag / Grillabend / Spieleabend / Filmabend …)',
    '2. Datum und Uhrzeit',
    '3. Was mitbringen?',
    '4. Absage-Regel: Wer absagt, muss einen Gegenvorschlag machen!',
    'Grammatik-Ziele: Infinitiv mit zu / damit-Sätze / um … zu',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Soziale Kontakte und Einladungen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Einladung mit Anlass, Datum, Uhrzeit'),
  bullet('Zusage mit Freude ausgedrückt (Ich freue mich!)'),
  bullet('Frage nach Mitbringsel und Gästezahl'),
  bullet('um … zu oder damit korrekt verwendet'),
  bullet('Höflicher, informeller Ton (du-Form)'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Hey! Ich mache am Samstag eine kleine Geburtstagsfeier. Hast du Lust zu kommen?"'),
  p('B: „Oh, das klingt toll! Ja, ich komme sehr gerne! Wann genau?"'),
  p('A: „Ab 19 Uhr bei mir zu Hause — ich schicke dir die Adresse noch."'),
  p('B: „Super. Soll ich etwas mitbringen?" / A: „Ein paar Getränke wären super, aber kein Muss."'),
  p('B: „Ich bringe Wein mit. Kommen noch andere?" / A: „Ja, ca. zehn Leute — alles nette Menschen!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Absage'),
  p('B: „Vielen Dank für die Einladung — leider kann ich leider nicht kommen, weil ich an dem Abend arbeite."'),
  p('B: „Es tut mir wirklich leid! Ich wünsche euch einen wunderschönen Abend."'),
  p('B: „Können wir uns nächste Woche treffen? Ich würde dich gerne zum Kaffee einladen, um nachzuholen."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: um … zu vs. damit korrekt unterschieden, trennbare Verben (einladen/mitbringen/absagen), höflicher Ton bei Absage.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Soziale Kontakte und Einladungen — Bildaufgaben'),
  h2('Aufgabe 1 — Einladungskarten benennen und verstehen'),
  p('[BILD 1: Vier Einladungskarten nebeneinander: (1) Geburtstagskarte mit Kerzen und „Du bist eingeladen!", (2) Hochzeitseinladung mit Blumen und Datum, (3) Grillabend-Einladung, informell handgeschrieben, (4) formelle Einladung zu einem Firmenjubiläum]'),
  p('a) Beschreibe jede Einladungskarte: Was ist der Anlass? Formell oder informell?'),
  stdTable(
    ['Karte', 'Anlass', 'Formell / Informell'],
    [['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', '']],
    [800, 5500, 5406]
  ),
  p('b) Für welche Einladung würdest du förmlich mit „Sehr geehrte …" antworten? Warum?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Nachricht lesen und antworten'),
  p('[BILD 2: WhatsApp-Screenshot: Isabelle: „Hey! Wir machen am Freitag einen Spieleabend bei uns — ab 19 Uhr. Du bist herzlich eingeladen! Bring einfach gute Laune mit. Kannst du kommen? Bitte sag bis Donnerstag Bescheid." — Zeitstempel: Dienstag, 14:32 Uhr]'),
  p('a) Was ist der Anlass der Einladung und wann findet sie statt?'),
  wLine(),
  p('b) Schreibe eine Zusage (3–4 Sätze).', { before: 120 }),
  wLine(), wLine(), wLine(),
  p('c) Schreibe eine Absage (3–4 Sätze) mit Gegenvorschlag.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Tischkarte und Sitzplan'),
  p('[BILD 3: Ein Tischplan für eine Geburtstagsfeier mit 8 Plätzen — jeder Platz hat eine handgeschriebene Tischkarte mit Namen: Anna, Ben, Caro, David, Eva, Felix, Greta, Hans.]'),
  p('a) Wie viele Gäste hat die Gastgeberin eingeladen?'),
  wLine(),
  p('b) Schreibe 2 Sätze über den Abend im Futur I: Was werden die Gäste wahrscheinlich machen?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was würde ein höflicher Gast mitbringen? Nenne zwei Möglichkeiten.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Sprachcafé-Plakat lesen'),
  p('[BILD 4: Plakat: „Internationales Sprachcafé — jeden Dienstag 18–20 Uhr im Café Mondlicht, Hauptstraße 34. Komm und übe Deutsch, Englisch und mehr! Für alle offen — Anfänger und Fortgeschrittene. Eintritt frei. Getränke auf eigene Kosten. Anmeldung nicht nötig — einfach vorbeikommen!"]'),
  p('a) Wann und wo findet das Sprachcafé statt?'),
  wLine(),
  p('b) Was kostet der Eintritt und was muss man selbst zahlen?', { before: 120 }),
  wLine(),
  p('c) Schreibe 2 Sätze: Warum könnte dieses Angebot für Sie interessant sein?', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Soziale Kontakte und Einladungen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Einladungskarten'),
  stdTable(
    ['Karte', 'Anlass', 'Formell / Informell'],
    [
      ['1', 'Geburtstagsfeier', 'informell'],
      ['2', 'Hochzeit', 'formell'],
      ['3', 'Grillabend', 'sehr informell'],
      ['4', 'Firmenjubiläum', 'formell'],
    ],
    [800, 5500, 5406]
  ),
  p('b) Für Karte 4 (Firmenjubiläum) — weil es ein beruflicher/geschäftlicher Kontext ist.'),
  ...gap(1),
  h2('Aufgabe 2 — WhatsApp'),
  p('a) Anlass: Spieleabend. Zeit: Freitag ab 19 Uhr. Ort: bei Isabelle.'),
  p('b) Zusage-Beispiel: Hey Isabelle! Ja, ich komme sehr gerne — das klingt super! Ich freue mich auf den Abend. Soll ich etwas mitbringen, Snacks oder Getränke? Bis Freitag!'),
  p('c) Absage-Beispiel: Hey Isabelle! Oh nein, das tut mir so leid — leider kann ich am Freitag nicht, weil ich Überstunden machen muss. Habt einen tollen Abend! Können wir uns nächste Woche treffen? Ich würde dich gerne zum Kaffee einladen!'),
  ...gap(1),
  h2('Aufgabe 3 — Tischplan'),
  p('a) 8 Gäste (= 8 Tischkarten — die Gastgeberin selbst sitzt vielleicht auch mit dabei oder ist nicht auf dem Plan).'),
  p('b) Beispiele: Die Gäste werden Spiele spielen und lachen. / Sie werden gemeinsam essen und trinken.'),
  p('c) Blumen und eine Flasche Wein — oder ein kleines Geschenk für die Gastgeberin.'),
  ...gap(1),
  h2('Aufgabe 4 — Sprachcafé-Plakat'),
  p('a) Jeden Dienstag von 18 bis 20 Uhr im Café Mondlicht, Hauptstraße 34.'),
  p('b) Eintritt: kostenlos. Getränke: selbst zahlen.'),
  p('c) Individuelle Antworten: Das Sprachcafé wäre interessant für mich, weil ich mein Deutsch verbessern möchte. Außerdem kann ich dort neue Leute kennenlernen, ohne mich vorher anmelden zu müssen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
