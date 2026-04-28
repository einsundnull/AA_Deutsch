// A2_Erwachsene — Thema 06 UP 03: Sport treiben
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Sport treiben';
const HEADING = 'Thema 06 — Freizeit & Kultur';
const SUBHEAD = 'UP 03: Sport treiben';
const PREFIX  = 'A2_Erwachsene_FreizeitKultur_03_SportTreiben';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '06_FreizeitKultur', '03_SportTreiben');
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
const h3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: '2E75B6', font: 'Arial' })], spacing: { before: 160, after: 60 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const sportBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'D84315' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'D84315' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'D84315' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'D84315' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FBE9E7' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Sport treiben — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke rund um Sport:',
    'Sport machen / treiben / betreiben  |  trainieren  |  an einem Verein teilnehmen',
    'sich anmelden bei + Dativ: Ich melde mich beim Sportverein an.',
    'seit + Dativ: Ich spiele seit drei Monaten Fußball.',
    'nach + Dativ: Nach dem Training bin ich erschöpft.',
    'vor + Dativ: Vor dem Sport sollte man sich aufwärmen.',
    'Meinung: Sport macht Spaß / hält fit / ist gut für die Gesundheit.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Meinen Sport beschreiben'),
  p('Welchen Sport treiben Sie? Oder welchen Sport möchten Sie gerne machen? Schreiben Sie 3–4 Sätze. Benutzen Sie: seit / nach / vor / weil.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Nachricht an einen Freund schreiben'),
  p('Ihr Freund / Ihre Freundin möchte mit Ihnen Sport machen. Schreiben Sie eine kurze Nachricht (3–4 Sätze): Schlagen Sie eine Sportart vor, nennen Sie einen Termin und erklären Sie, warum diese Sportart gut ist.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Komparativ: Sport vergleichen'),
  grammarBox([
    'Komparativ: schnell → schneller  |  gesund → gesünder  |  anstrengend → anstrengender',
    'Superlativ: schnell → am schnellsten  |  gesund → am gesündesten',
    'Vergleich: Schwimmen ist gesünder als Joggen.',
    'Unregelmäßig: gut → besser → am besten  |  viel → mehr → am meisten',
  ]),
  ...gap(1),
  p('Bilden Sie Sätze im Komparativ oder Superlativ.'),
  p('a) Fußball / beliebt / Tennis (Komparativ):'),
  wLine(),
  p('b) Radfahren / gesund / Autofahren (Komparativ):', { before: 120 }),
  wLine(),
  p('c) Olympiasportler / schnell / Hobbysportler (Superlativ):', { before: 120 }),
  wLine(),
  p('d) Schwimmen / entspannend / Boxen (Komparativ):', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — E-Mail an einen Sportverein schreiben'),
  p('Sie möchten einem Sportverein beitreten. Schreiben Sie eine formelle E-Mail (5–6 Sätze): Stellen Sie sich kurz vor, nennen Sie die gewünschte Sportart, fragen Sie nach Trainingszeiten und Mitgliedsbeitrag. Benutzen Sie Modalverben (möchten/können/wollen).'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Sport treiben'),
  grammarBox([
    'Komparativ — Merkliste:',
    'Einsilbige Adjektive mit a/o/u bekommen oft Umlaut: alt→älter, groß→größer, jung→jünger',
    'Ausnahmen: gut→besser, viel→mehr, gern→lieber',
    'Superlativ: am + Adjektiv + sten: am schnellsten, am gesündesten',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antwort'),
  p('Ich spiele seit sechs Monaten Tennis im Sportverein. Vor dem Training wärme ich mich immer auf, weil ich sonst Muskelschmerzen bekomme. Nach dem Training bin ich oft müde, aber auch sehr zufrieden. Tennis macht mir viel Spaß, weil ich draußen an der frischen Luft bin.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Nachricht'),
  p('Hey Sara! Hast du Lust, am Samstag mit mir Radfahren zu gehen? Der Rheinradweg ist wunderschön und nicht zu anstrengend. Wir könnten um 10 Uhr starten — was meinst du?'),
  ...gap(1),
  h2('Aufgabe 3 — Komparativ / Superlativ'),
  p('a) Fußball ist beliebter als Tennis.'),
  p('b) Radfahren ist gesünder als Autofahren.'),
  p('c) Olympiasportler sind am schnellsten. (oder: Olympiasportler trainieren am meisten.)'),
  p('d) Schwimmen ist entspannender als Boxen.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien E-Mail'),
  bullet('Formelle Anrede: Sehr geehrte Damen und Herren,'),
  bullet('Vorstellung: Name, Herkunft, aktuelle Situation'),
  bullet('Gewünschte Sportart und Erfahrungsniveau genannt'),
  bullet('Frage nach Trainingszeiten und Mitgliedsbeitrag'),
  bullet('Modalverben: Ich möchte … / Könnten Sie mir … / Ich würde gerne …'),
  bullet('Formeller Abschluss: Mit freundlichen Grüßen'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Sport treiben — Leseübung'),
  h2('Text: Mehmet und der Sportverein'),
  p('Mehmet Yilmaz kommt aus der Türkei und wohnt seit vier Jahren in Köln. Er arbeitet als Elektriker und hat nach der Arbeit oft wenig Energie. Früher hat er in Istanbul regelmäßig Fußball gespielt — in Deutschland hatte er aber lange keine Zeit und keine Möglichkeit dazu.'),
  p('Im letzten Herbst hat sein Kollege Thomas ihn zum Fußballtraining des SV Köln-Ehrenfeld mitgenommen. „Komm einfach mal mit — du musst dich nicht sofort anmelden", hat Thomas gesagt. Mehmet hat mitgespielt und sofort gemerkt: Er vermisst den Sport! Nach dem Training hat er sich direkt beim Verein angemeldet. Der Mitgliedsbeitrag beträgt 12 Euro im Monat — das fand Mehmet sehr günstig.'),
  p('Jetzt trainiert Mehmet zweimal pro Woche: dienstags und donnerstags von 19 bis 21 Uhr. Vor dem Training wärmt das Team sich immer 15 Minuten auf. Der Trainer heißt Herr Bauer und ist sehr geduldig. „Mein Deutsch wird besser, weil ich im Verein so viel spreche", sagt Mehmet. „Und Fußball ist der beste Sport der Welt — das bleibt so!"'),
  p('Im März hat der Verein ein kleines Turnier organisiert. Mehmets Mannschaft ist ins Halbfinale gekommen. Zwar haben sie das Halbfinale verloren, aber Mehmet war trotzdem sehr stolz. „Nächstes Jahr werden wir besser sein", hat er gelacht. Inzwischen hat er im Verein auch zwei neue Freunde gefunden: Jonas und Stefan. Die drei treffen sich manchmal auch außerhalb des Trainings zum Grillen oder Kino.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Mehmet wohnt seit vier Jahren in Köln.', ''],
      ['Mehmet hat in der Türkei nie Sport getrieben.', ''],
      ['Thomas hat Mehmet zum Training eingeladen.', ''],
      ['Der Mitgliedsbeitrag beträgt 20 Euro im Monat.', ''],
      ['Das Training findet zweimal pro Woche statt.', ''],
      ['Mehmets Mannschaft hat das Turnier gewonnen.', ''],
      ['Mehmet hat im Verein neue Freunde gefunden.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum hat Mehmet in Deutschland lange keinen Sport gemacht?'),
  wLine(), wLine(),
  p('b) Was passiert vor jedem Training?', { before: 120 }),
  wLine(), wLine(),
  p('c) Welchen doppelten Nutzen hat der Sportverein für Mehmet?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was macht Mehmet außerhalb des Trainings mit seinen neuen Freunden?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Sportverein-Tabelle'),
  p('Fülle die Tabelle mit Informationen aus dem Text aus.'),
  stdTable(
    ['Information', 'Antwort aus dem Text'],
    [
      ['Name des Vereins', ''],
      ['Trainingstage und Uhrzeiten', ''],
      ['Name des Trainers', ''],
      ['Monatlicher Beitrag', ''],
      ['Ergebnis des Turniers', ''],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Sport treiben'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Mehmet wohnt seit vier Jahren in Köln.', 'R'],
      ['Mehmet hat in der Türkei nie Sport getrieben.', 'F (er hat regelmäßig Fußball gespielt)'],
      ['Thomas hat Mehmet zum Training eingeladen.', 'R'],
      ['Der Mitgliedsbeitrag beträgt 20 Euro im Monat.', 'F (12 Euro)'],
      ['Das Training findet zweimal pro Woche statt.', 'R'],
      ['Mehmets Mannschaft hat das Turnier gewonnen.', 'F (Halbfinale verloren)'],
      ['Mehmet hat im Verein neue Freunde gefunden.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Er hatte nach der Arbeit wenig Energie und keine Möglichkeit / keinen Verein gefunden.'),
  p('b) Das Team wärmt sich 15 Minuten auf.'),
  p('c) Sein Deutsch verbessert sich, und er hat neue Freunde gefunden.'),
  p('d) Sie treffen sich zum Grillen oder Kino.'),
  ...gap(1),
  h2('Aufgabe 3 — Sporttabelle'),
  stdTable(
    ['Information', 'Antwort'],
    [
      ['Name des Vereins', 'SV Köln-Ehrenfeld'],
      ['Trainingstage und Uhrzeiten', 'Dienstags und donnerstags, 19–21 Uhr'],
      ['Name des Trainers', 'Herr Bauer'],
      ['Monatlicher Beitrag', '12 Euro'],
      ['Ergebnis des Turniers', 'Halbfinale — verloren'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Sport treiben — Lückentext'),
  infoBox([
    'Wörterkasten: Mitgliedsbeitrag  |  aufwärmen  |  trainieren  |  Sportverein  |  Turnier',
    '              Mannschaft  |  Trainer  |  anstrengend  |  regelmäßig  |  Halbzeit'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Sporttext: Fülle die Lücken aus'),
  p('In Deutschland gibt es tausende Sportvereine — der ________ ist oft sehr günstig und für alle erschwinglich. Wer in einem ________ Sport treibt, hat viele Vorteile: Man ________ mit anderen zusammen, bekommt Anleitung von einem ________ und lernt neue Menschen kennen.'),
  p('Vor dem Sport sollte man sich immer ________ — das schützt vor Verletzungen. Danach ist es wichtig, den Körper abzukühlen. Wenn man ________ trainiert — zum Beispiel dreimal pro Woche — bleibt man fit und gesund. Manche Sportarten sind sehr ________, aber das Körpergefühl danach ist wunderbar.', { before: 120 }),
  p('Im Fußball gibt es nach 45 Minuten eine ________. Dann erholt sich die ________ kurz, bevor es weitergeht. Viele Vereine organisieren auch ein ________ gegen andere Vereine — das macht besonders viel Spaß.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Im Sportverein: Dialog ergänzen'),
  infoBox(['Wörterkasten: anmelden  |  Mitglied  |  Probetraining  |  kostet  |  stattfindet  |  mitbringen']),
  ...gap(1),
  p('Interessentin: „Guten Tag. Ich möchte mich gerne beim Verein ________."'),
  p('Sekretärin: „Sehr gerne! Möchten Sie zuerst ein ________ machen?"'),
  p('Interessentin: „Ja, gerne. Wann ________ das nächste Training?"'),
  p('Sekretärin: „Mittwoch um 18 Uhr. Sie können einfach vorbeikommen. Was soll ich ________ als neues ________ von Ihnen?"'),
  p('Interessentin: „Was ________ die Mitgliedschaft im Monat?"'),
  p('Sekretärin: „15 Euro — und das erste Monat ist kostenlos für neue Mitglieder."'),
  ...gap(1),
  h2('Aufgabe 3 — Modalverben einsetzen'),
  p('Wähle das passende Modalverb: müssen / können / dürfen / sollen / wollen.'),
  p('a) Vor dem Training ________ man sich aufwärmen — das ist sehr wichtig.'),
  p('b) Im Hallenbad ________ man nicht essen — das ist verboten.'),
  p('c) Ich ________ nächstes Jahr an einem Marathon teilnehmen — das ist mein Ziel.'),
  p('d) Der Arzt hat gesagt, ich ________ mehr Sport machen — mindestens zweimal pro Woche.'),
  p('e) ________ du mir erklären, wie dieses Gerät im Fitnessstudio funktioniert?'),
  p('f) Kinder unter 12 ________ beim Jugendtraining mitmachen — das ist ein extra Angebot.'),
  ...gap(1),
  h2('Aufgabe 4 — Komparativ und Superlativ bilden'),
  p('Ergänze den Komparativ oder Superlativ.'),
  stdTable(
    ['Grundform', 'Komparativ (als)', 'Superlativ (am ...)'],
    [
      ['schnell', '________ als', 'am ________'],
      ['anstrengend', '________ als', 'am ________'],
      ['gesund', '________ als', 'am ________'],
      ['gut', '________ als', 'am ________'],
      ['viel', '________ als', 'am ________'],
      ['einfach', '________ als', 'am ________'],
    ],
    [3000, 3500, 5206]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Sport treiben'),
  h2('Aufgabe 1'),
  p('1. Mitgliedsbeitrag  2. Sportverein  3. trainiert  4. Trainer  5. aufwärmen'),
  p('6. regelmäßig  7. anstrengend  8. Halbzeit  9. Mannschaft  10. Turnier'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. anmelden  2. Probetraining  3. stattfindet  4. mitbringen  5. Mitglied  6. kostet'),
  ...gap(1),
  h2('Aufgabe 3 — Modalverben'),
  p('a) muss  (Pflicht/Empfehlung)'),
  p('b) darf nicht  (Verbot)'),
  p('c) will  (persönlicher Wunsch/Ziel)'),
  p('d) soll  (Anweisung vom Arzt)'),
  p('e) Kannst  (Fähigkeit / Bitte)'),
  p('f) können  (Erlaubnis / Angebot)'),
  grammarBox([
    'Modalverben — Bedeutungen:',
    'müssen: Notwendigkeit / Pflicht  (Ich muss trainieren.)',
    'sollen: Auftrag von jemandem     (Der Arzt sagt, ich soll …)',
    'dürfen: Erlaubnis / Verbot       (Man darf hier nicht rauchen.)',
    'können: Fähigkeit / Möglichkeit  (Ich kann schwimmen.)',
    'wollen: eigener Wunsch/Plan      (Ich will einen Marathon laufen.)',
    'möchten: höflicher Wunsch        (Ich möchte mich anmelden.)',
    'Satzstellung: Modalverb auf Pos. 2, Infinitiv ans Ende!',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Komparativ / Superlativ'),
  stdTable(
    ['Grundform', 'Komparativ', 'Superlativ'],
    [
      ['schnell', 'schneller als', 'am schnellsten'],
      ['anstrengend', 'anstrengender als', 'am anstrengendsten'],
      ['gesund', 'gesünder als', 'am gesündesten'],
      ['gut', 'besser als', 'am besten'],
      ['viel', 'mehr als', 'am meisten'],
      ['einfach', 'einfacher als', 'am einfachsten'],
    ],
    [3000, 3500, 5206]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Sport treiben — Wortliste'),
  h2('Teil A — Sportarten und Verben'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['der Sportverein, -e', 'Nomen', 'Ich bin Mitglied in einem Sportverein.'],
      ['das Training, -s', 'Nomen', 'Das Training findet zweimal pro Woche statt.'],
      ['der Trainer / die Trainerin', 'Nomen', 'Unser Trainer ist sehr geduldig.'],
      ['das Turnier, -e', 'Nomen', 'Der Verein organisiert ein Turnier im Sommer.'],
      ['die Mannschaft, -en', 'Nomen', 'Unsere Mannschaft hat gewonnen!'],
      ['sich aufwärmen (trennb.)', 'Verb', 'Vor dem Sport wärme ich mich immer auf.'],
      ['teilnehmen an + Dativ (trennb.)', 'Verb', 'Ich nehme an einem Kurs teil.'],
      ['trainieren', 'Verb', 'Wir trainieren jeden Dienstag zusammen.'],
      ['anstrengend', 'Adj.', 'Boxen ist sehr anstrengend.'],
      ['regelmäßig', 'Adj./Adv.', 'Man sollte regelmäßig Sport treiben.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Rund ums Fitnessstudio und Vereinssport'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['der Mitgliedsbeitrag', 'monatliche Gebühr', 'Der Mitgliedsbeitrag beträgt 15 Euro.'],
      ['das Probetraining', 'erstes Training zum Testen', 'Sie können kostenlos ein Probetraining machen.'],
      ['sich anmelden bei + Dat.', 'Mitglied werden', 'Ich melde mich beim Verein an.'],
      ['in Form kommen', 'fitter werden', 'Ich will wieder in Form kommen.'],
      ['Muskeln aufbauen', 'Kraft trainieren', 'Ich gehe ins Fitnessstudio, um Muskeln aufzubauen.'],
      ['die Halbzeit, -en', 'Pause im Spiel', 'In der Halbzeit trinken wir Wasser.'],
      ['gewinnen / verlieren', 'Spielergebnis', 'Wir haben das Spiel gewonnen / verloren.'],
      ['sich verletzen', 'sich wehtun', 'Er hat sich beim Training das Knie verletzt.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  sportBox([
    'Sport in Deutschland:',
    'Sportverein: In Deutschland gibt es über 90.000 Sportvereine — für fast jede Sportart!',
    'Beliebteste Sportarten: Fußball, Turnen, Tennis, Radfahren, Schwimmen, Leichtathletik',
    'Kosten: Viele Vereine sind sehr günstig (5–20 Euro im Monat)',
    'Anmeldung: Man braucht oft nur einen Personalausweis und ein ausgefülltes Formular',
    'Probetraining: Die meisten Vereine erlauben 1–2 Probetrainings kostenlos',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('der Sportverein: ___________  |  trainieren: ___________  |  anstrengend: ___________'),
  p('teilnehmen: ___________  |  regelmäßig: ___________  |  das Turnier: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Sport treiben'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Trennbare Verben rund um Sport:',
    'sich auf|wärmen:     Ich wärme mich auf. / Ich habe mich aufgewärmt.',
    'teil|nehmen (an):    Ich nehme teil. / Ich habe teilgenommen.',
    'an|melden:           Ich melde mich an. / Ich habe mich angemeldet.',
    'mit|machen:          Ich mache mit. / Ich habe mitgemacht.',
    'ab|kühlen:           Ich kühle mich ab. / Ich habe mich abgekühlt.',
    '',
    'Wichtig: Im Perfekt bleibt das Verb zusammen: aufgewärmt, teilgenommen, angemeldet',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich spiele seit sechs Monaten im Sportverein Fußball — es macht mir sehr viel Spaß.'),
  p('Vor jedem Training wärmen wir uns auf, weil das vor Verletzungen schützt.'),
  p('Ich nehme nächsten Monat an einem Stadtlauf teil — ich trainiere schon seit Wochen dafür.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Sport treiben — Konversation'),
  h2('Aufgabe 1 — Dialog: Über Sport sprechen'),
  p('Zwei Personen unterhalten sich über Sport und Fitness. Ergänzt den Dialog.'),
  infoBox([
    'Sport beschreiben: Ich treibe … / Ich trainiere … / Ich spiele …',
    'Häufigkeit: einmal / zweimal / dreimal pro Woche  |  jeden Montag  |  regelmäßig',
    'Meinung: Ich finde … viel besser als … / … ist gesünder als …',
    'Empfehlung: Du solltest … versuchen! / Ich empfehle dir …',
  ]),
  ...gap(1),
  p('Person A: „Machst du eigentlich regelmäßig Sport?"'),
  p('Person B: „Ja, ich ________________________ seit ________________________."'),
  p('Person A: „Oh interessant! Wie oft trainierst du?"'),
  p('Person B: „________________________ pro Woche. Und du?"'),
  p('Person A: „Ich gehe ________________________. Ich finde es ________, weil ________________________."'),
  p('Person B: „Das klingt gut! Ist das anstrengender als ________________________?"'),
  p('Person A: „Ja, ich finde ________________________ anstrengender als ________________________."'),
  p('Person B: „Sollte ich das auch mal ausprobieren?"'),
  p('Person A: „Unbedingt! Du solltest ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Im Sportverein anmelden'),
  stdTable(
    ['Interessent/in (A)', 'Vereinsmitarbeiter/in (B)'],
    [
      ['Fragen Sie, ob Sie Sport probetrainieren können.', 'Erklären Sie die Probetraining-Möglichkeit.'],
      ['Fragen Sie nach Trainingszeiten und Wochentagen.', 'Nennen Sie Zeiten für verschiedene Sportarten.'],
      ['Fragen Sie nach dem monatlichen Beitrag und Ermäßigungen.', 'Nennen Sie Preise (Normal / Student / Familie).'],
      ['Fragen Sie, was man zum ersten Training mitbringen soll.', 'Geben Sie praktische Hinweise (Sportkleidung, Ausweis).'],
    ],
    [5703, 5703]
  ),
  sportBox([
    'Preisbeispiele Sportverein (fiktiv):',
    'Erwachsene: 18 € / Monat',
    'Studenten und Schüler: 12 € / Monat (mit Ausweis)',
    'Familie (ab 2 Personen): 28 € / Monat',
    'Probetraining: kostenlos (max. 2 Einheiten)',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Sport und Bewegung'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Welchen Sport treiben Sie? Wie oft?', ''],
      ['Was ist der beliebteste Sport in Ihrem Heimatland?', ''],
      ['Haben Sie schon an einem Sportevent in Deutschland teilgenommen?', ''],
      ['Was ist Ihrer Meinung nach gesünder: Mannschaftssport oder Einzelsport?', ''],
      ['Möchten Sie einem Sportverein beitreten? Warum (nicht)?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenrunde: „Mein idealer Sport"'),
  p('Jede Person beschreibt ihren idealen Sport in 3–4 Sätzen — real oder erfunden. Die Gruppe entscheidet: Klingt das gesund / spaßig / realistisch?'),
  infoBox([
    'Leitfragen für die Beschreibung:',
    '1. Welchen Sport? (Name und kurze Erklärung)',
    '2. Wann und wie oft? (Trainingszeiten)',
    '3. Warum dieser Sport? (Komparativ: Er ist ... als ...)',
    '4. Was braucht man dafür? (Ausrüstung, Kosten)',
    '5. Empfehlung: Sollte man diesen Sport ausprobieren?',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Sport treiben'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Sportart und Häufigkeit konkret genannt'),
  bullet('Komparativ korrekt verwendet (anstrengender als / gesünder als)'),
  bullet('Begründung mit weil'),
  bullet('Empfehlung mit Konjunktiv II (Du solltest … versuchen.)'),
  bullet('Natürlicher Gesprächsfluss, abwechselnde Redeanteile'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Machst du eigentlich regelmäßig Sport?"'),
  p('B: „Ja, ich schwimme seit zwei Jahren zweimal pro Woche im Stadtbad."'),
  p('A: „Oh interessant! Wie oft trainierst du?" / B: „Zweimal pro Woche."'),
  p('A: „Ich gehe ins Fitnessstudio. Ich finde es sehr gut, weil ich dort in meinem eigenen Tempo trainieren kann."'),
  p('B: „Ist das anstrengender als Schwimmen?" / A: „Ja, ich finde Krafttraining anstrengender als Schwimmen."'),
  p('A: „Du solltest das unbedingt mal ausprobieren — das erste Monat ist oft kostenlos!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Vereinsgespräch'),
  p('A: „Guten Tag. Kann ich hier ein Probetraining machen?" / B: „Ja, natürlich — gerne!"'),
  p('A: „Wann findet das Badminton-Training statt?" / B: „Dienstags und freitags um 19 Uhr."'),
  p('A: „Was kostet die Mitgliedschaft?" / B: „18 Euro im Monat, für Studenten 12 Euro."'),
  p('A: „Was soll ich mitbringen?" / B: „Sportkleidung, Hallenschuhe und Ihren Ausweis."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Komparativ korrekt geformt, Modalverben an richtiger Position, trennbare Verben korrekt.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Sport treiben — Bildaufgaben'),
  h2('Aufgabe 1 — Sportarten benennen'),
  p('[BILD 1: Sechs Bilder in zwei Reihen: (1) jemand schwimmt im Pool, (2) zwei Personen spielen Tennis, (3) eine Gruppe spielt Fußball auf einem Rasen, (4) jemand fährt Fahrrad, (5) eine Person macht Yoga auf einer Matte, (6) jemand läuft auf einer Laufstrecke]'),
  p('a) Schreibe den Namen der Sportart unter jedes Bild.'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welche dieser Sportarten können Sie? Welche möchten Sie lernen? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Trainingsplan lesen'),
  p('[BILD 2: Ein handgeschriebener Wochentrainingsplan auf Papier: Montag: Laufen 30 Min. — Dienstag: Krafttraining 45 Min. — Mittwoch: Pause — Donnerstag: Schwimmen 45 Min. — Freitag: Yoga 60 Min. — Samstag: Radfahren 1,5 Std. — Sonntag: Pause]'),
  p('a) An welchen Tagen macht die Person Pause?'),
  wLine(),
  p('b) Welche Sportart dauert am längsten?', { before: 120 }),
  wLine(),
  p('c) Wie viele Stunden Sport macht die Person insgesamt pro Woche? (Rechne nach.)', { before: 120 }),
  wLine(),
  p('d) Schreibe einen Satz im Komparativ: Vergleiche zwei Sportarten aus dem Plan.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Fitnessstudio-Szene'),
  p('[BILD 3: Ein Fitnessstudio — vorne an der Rezeption steht eine Frau mit einem Formular in der Hand; ein Mitarbeiter erklärt ihr etwas und zeigt auf einen Zettel; im Hintergrund sind Trainingsgeräte, ein Laufband und mehrere Personen beim Training]'),
  p('a) Was passiert in dieser Szene? Beschreibe in 2–3 Sätzen.'),
  wLine(), wLine(), wLine(),
  p('b) Welche Fragen könnte die Frau an der Rezeption stellen? Schreibe 2 Fragen mit Modalverben.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Sportverein-Poster lesen'),
  p('[BILD 4: Ein Poster des SV Sonnenberg: „Mach mit beim SV Sonnenberg! Fußball | Tennis | Schwimmen | Leichtathletik. Probetraining kostenlos! Mitglieder: 350. Beitrag ab 10 € / Monat. Training täglich 17–21 Uhr. Kontakt: info@sv-sonnenberg.de | Tel. 0221-445566"]'),
  p('a) Welche vier Sportarten bietet der Verein an?'),
  wLine(),
  p('b) Was kostet die Mitgliedschaft mindestens?', { before: 120 }),
  wLine(),
  p('c) Zu welchen Uhrzeiten findet das Training statt?', { before: 120 }),
  wLine(),
  p('d) Wie würdest du diesen Verein einem Freund / einer Freundin empfehlen? Schreibe 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Sport treiben'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Sportarten'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['Schwimmen', 'Tennis', 'Fußball', 'Radfahren', 'Yoga', 'Laufen / Joggen']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Ich kann … / Ich möchte … lernen.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Trainingsplan'),
  p('a) Mittwoch und Sonntag.'),
  p('b) Radfahren (1,5 Stunden).'),
  p('c) 30 Min. + 45 Min. + 45 Min. + 60 Min. + 90 Min. = 270 Min. = 4,5 Stunden.'),
  p('d) Beispiel: Yoga dauert länger als Laufen. / Schwimmen ist so lang wie Krafttraining.'),
  ...gap(1),
  h2('Aufgabe 3 — Fitnessstudio-Szene'),
  p('a) Eine Frau meldet sich an der Rezeption eines Fitnessstudios an. Ein Mitarbeiter erklärt ihr das Anmeldeformular oder die Angebote des Studios. Im Hintergrund trainieren andere Personen.'),
  p('b) Beispiele: „Was kostet die Mitgliedschaft pro Monat?" / „Kann ich zuerst ein Probetraining machen?" / „Wann kann ich das Laufband benutzen?"'),
  ...gap(1),
  h2('Aufgabe 4 — Vereins-Poster'),
  p('a) Fußball, Tennis, Schwimmen, Leichtathletik.'),
  p('b) Ab 10 Euro pro Monat.'),
  p('c) Täglich von 17 bis 21 Uhr.'),
  p('d) Beispiel: Du solltest den SV Sonnenberg ausprobieren — das Probetraining ist kostenlos und man kann aus vier Sportarten wählen!'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
