// A2_Erwachsene — Thema 05 UP 01: Beim Arzt
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Beim Arzt';
const HEADING = 'Thema 05 — Gesundheit';
const SUBHEAD = 'UP 01: Beim Arzt';
const PREFIX  = 'A2_Erwachsene_Gesundheit_01_BeimArzt';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '05_Gesundheit', '01_BeimArzt');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

// ── NUMBERING ─────────────────────────────────────────────────────────────────
const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '•',
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360, hanging: 180 } } }
    }]
  }]
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const hdr = () => ({
  default: new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ${SUBHEAD}`, size: 18, color: '888888', italics: true, font: 'Arial' })]
    })]
  })
});
const ftr = () => ({
  default: new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' }),
      ]
    })]
  })
});
const h1 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 36, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 240, after: 120 }
});
const h2 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 28, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 200, after: 80 }
});
const h3 = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 24, color: '2E75B6', font: 'Arial' })],
  spacing: { before: 160, after: 60 }
});
const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, size: opts.size || 24, font: 'Arial', bold: opts.bold || false, italics: opts.italics || false, color: opts.color || '000000' })],
  spacing: { before: opts.before || 80, after: opts.after || 60 },
  alignment: opts.align || AlignmentType.LEFT
});
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const writingLine = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});
const nameDate = () => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }),
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] }),
  ]})]
});
const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullet-list', level: 0 },
  children: [new TextRun({ text, size: 24, font: 'Arial' })],
  spacing: { before: 60, after: 40 }
});
const infoBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
  })]})],
});
const grammarBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({
    shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
  })]})],
});
const tblHdr = (cells, widths) => new TableRow({
  tableHeader: true,
  children: cells.map((c, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })]
  }))
});
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({
  children: cells.map((c, i) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: shade },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })]
  }))
});
const stdTable = (headers, rows, widths) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } },
  rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))]
});

// ── SAVE ──────────────────────────────────────────────────────────────────────
const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: hdr(),
      footers: ftr(),
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  console.log('OK ', filename);
};

// ════════════════════════════════════════════════════════════════════════════
(async () => {

// ── 1. SCHREIBEN ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Schreibübung'),
  infoBox([
    '🏥  Nützliche Ausdrücke beim Arzt:',
    'Ich habe Kopfschmerzen / Halsschmerzen / Bauchschmerzen / Rückenschmerzen.',
    'Mir ist schwindelig / übel / schlecht.',
    'Ich habe Fieber / Husten / Schnupfen / Durchfall.',
    'Ich fühle mich seit drei Tagen nicht wohl.',
    'Wo tut es weh? — Hier tut es weh. / Der Hals tut mir weh.',
    'Ich bin allergisch gegen … / Ich nehme keine Medikamente.',
    'Was soll ich tun? / Müssen Sie mich untersuchen?',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Symptome beschreiben'),
  p('Schreibe für jede Situation einen vollständigen Satz. Benutze „seit" + Zeitangabe.'),
  p('Beispiel: Kopfschmerzen / 2 Tage → Ich habe seit zwei Tagen Kopfschmerzen.'),
  p('a) Fieber / 3 Tage →'),
  writingLine(),
  p('b) Halsschmerzen / gestern Abend →', { before: 120 }),
  writingLine(),
  p('c) Husten und Schnupfen / einer Woche →', { before: 120 }),
  writingLine(),
  p('d) Rückenschmerzen / dem Wochenende →', { before: 120 }),
  writingLine(),
  ...gap(1),
  h2('Aufgabe 2 — Anmeldeformular ausfüllen'),
  p('Du gehst zum ersten Mal zu einem Arzt in Deutschland. Fülle das Formular aus.'),
  stdTable(
    ['Feld', 'Deine Angaben'],
    [
      ['Vorname, Nachname:', ''],
      ['Geburtsdatum:', ''],
      ['Krankenkasse:', ''],
      ['Aktuelle Beschwerden (Was fehlt Ihnen?):', ''],
      ['Seit wann haben Sie diese Beschwerden?', ''],
      ['Haben Sie Allergien? (ja / nein / welche?)', ''],
      ['Nehmen Sie regelmäßig Medikamente? (ja / nein)', ''],
    ],
    [4500, 7206]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Arztgespräch vorbereiten'),
  p('Du gehst morgen zum Arzt. Schreibe auf, was du sagen möchtest. Beantworte diese Punkte:'),
  bullet('Was sind deine Symptome? (mindestens 3)'),
  bullet('Seit wann hast du diese Beschwerden?'),
  bullet('Hast du schon etwas dagegen gemacht? (z. B. Tee getrunken, Tabletten genommen)'),
  bullet('Was erhoffst du vom Arzt? (Attest, Rezept, Untersuchung …)'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 4 — Krankmeldungs-Nachricht schreiben'),
  p('Du bist krank und kannst nicht zur Arbeit / zum Kurs kommen. Schreibe eine kurze Nachricht (3–4 Sätze) an deinen Chef / deine Lehrerin. Erkläre, was dir fehlt und wie lange du fehlst.'),
  writingLine(), writingLine(), writingLine(), writingLine(), writingLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Beim Arzt'),
  grammarBox([
    '📌  „seit" + Dativ für Zeitdauer:',
    'seit drei Tagen (Pl. Dativ)  |  seit gestern Abend  |  seit einer Woche',
    'seit dem Wochenende (Dativ: dem)',
    '❗ „seit" steht immer mit Dativ und Präsens (nicht Perfekt)!',
    'RICHTIG: Ich habe seit drei Tagen Fieber.',
    'FALSCH:  Ich hatte seit drei Tagen Fieber. (wenn es noch anhält)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Musterlösungen'),
  p('a) Ich habe seit drei Tagen Fieber.'),
  p('b) Ich habe seit gestern Abend Halsschmerzen.'),
  p('c) Ich habe seit einer Woche Husten und Schnupfen.'),
  p('d) Ich habe seit dem Wochenende Rückenschmerzen.'),
  ...gap(1),
  h2('Aufgabe 2 — Hinweis'),
  p('Individuelle Angaben. Krankenkasse in Deutschland: z. B. AOK, TK (Techniker Krankenkasse), Barmer.', { italics: true, color: '888888' }),
  p('Beschwerden: vollständiger Satz erwartet, z. B. „Ich habe Halsschmerzen und Fieber."'),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösung'),
  p('Ich habe seit vier Tagen Halsschmerzen, Husten und leichtes Fieber (38,2 °C). Außerdem bin ich sehr müde und fühle mich schlapp. Ich habe schon Tee getrunken und Hustenbonbons genommen, aber es hilft nicht. Ich hoffe, dass der Arzt mir ein Rezept für Tabletten gibt und mir vielleicht ein Attest ausstellt, damit ich nicht arbeiten gehen muss.'),
  ...gap(1),
  h2('Aufgabe 4 — Muster-Krankmeldung'),
  p('Guten Morgen, Frau Müller,'),
  p('leider muss ich Ihnen mitteilen, dass ich heute krank bin. Ich habe hohes Fieber und starke Halsschmerzen. Ich gehe heute noch zum Arzt und schicke Ihnen das Attest so schnell wie möglich. Ich denke, dass ich morgen auch noch nicht kommen kann. Mit freundlichen Grüßen.'),
  p('Bewertungskriterien: höfliche Anrede, Symptome genannt, Zeitraum des Fehlens, Attest erwähnt.', { italics: true, color: '888888' }),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Leseübung'),
  h2('Text: Yuki beim Hausarzt'),
  p('Yuki Tanaka kommt aus Japan und wohnt seit einem Jahr in Hamburg. Sie arbeitet als Grafikdesignerin und lernt abends Deutsch an der Volkshochschule. Eines Montags wacht sie mit starken Halsschmerzen, Husten und Fieber auf. Sie fühlt sich sehr schlecht.'),
  p('Yuki ruft die Arztpraxis von Dr. Weber an: „Guten Morgen, hier ist Yuki Tanaka. Ich bin Patientin bei Dr. Weber. Ich habe hohes Fieber und starke Halsschmerzen. Kann ich heute noch einen Termin bekommen?" Die Sprechstundenhilfe antwortet: „Ja, kommen Sie um 10:30 Uhr. Bringen Sie bitte Ihre Versichertenkarte mit."'),
  p('In der Praxis füllt Yuki ein Anmeldeformular aus und wartet im Wartezimmer. Nach zwanzig Minuten kommt Dr. Weber: „Guten Morgen, Frau Tanaka. Was fehlt Ihnen?" Yuki erklärt: „Ich habe seit Sonntag Halsschmerzen und Fieber. Mein Hals tut sehr weh und ich kann kaum schlucken." Dr. Weber untersucht Yuki: Er schaut in den Hals, tastet die Lymphknoten ab und misst Fieber — 38,9 Grad.'),
  p('Dr. Weber sagt: „Sie haben eine Halsentzündung. Ich schreibe Ihnen ein Rezept für Antibiotika. Sie müssen die Tabletten zehn Tage lang nehmen — jeden Tag, auch wenn Sie sich nach drei Tagen besser fühlen. Außerdem sollten Sie viel trinken und sich ausruhen. Sie dürfen diese Woche nicht arbeiten gehen." Er stellt auch ein Attest für drei Tage aus.'),
  p('Yuki bedankt sich und geht zur Apotheke. Sie ist froh, dass sie die Rezepte und das Attest hat, und hofft, dass sie bald wieder gesund ist.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Yuki wohnt seit zwei Jahren in Hamburg.', ''],
      ['Yuki hat Halsschmerzen, Husten und Fieber.', ''],
      ['Der Termin ist um 10:00 Uhr.', ''],
      ['Yuki muss ihre Versichertenkarte mitbringen.', ''],
      ['Dr. Weber misst Yuki 38,9 Grad Fieber.', ''],
      ['Yuki hat eine Magenentzündung.', ''],
      ['Yuki darf diese Woche nicht arbeiten gehen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum ruft Yuki die Arztpraxis an? Was sind ihre Symptome?'),
  writingLine(), writingLine(),
  p('b) Was macht Dr. Weber bei der Untersuchung?', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Was empfiehlt Dr. Weber? Nenne drei Dinge.', { before: 120 }),
  writingLine(), writingLine(), writingLine(),
  p('d) Was bekommt Yuki am Ende vom Arzt?', { before: 120 }),
  writingLine(), writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Modalverben im Text finden'),
  p('Suche im Text die Sätze mit Modalverben. Trage sie in die Tabelle ein.'),
  stdTable(
    ['Modalverb', 'Satz aus dem Text', 'Bedeutung'],
    [
      ['müssen', '', ''],
      ['sollten', '', ''],
      ['dürfen', '', ''],
    ],
    [2200, 6000, 3506]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Beim Arzt'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Yuki wohnt seit zwei Jahren in Hamburg.', 'F (seit einem Jahr)'],
      ['Yuki hat Halsschmerzen, Husten und Fieber.', 'R'],
      ['Der Termin ist um 10:00 Uhr.', 'F (um 10:30 Uhr)'],
      ['Yuki muss ihre Versichertenkarte mitbringen.', 'R'],
      ['Dr. Weber misst Yuki 38,9 Grad Fieber.', 'R'],
      ['Yuki hat eine Magenentzündung.', 'F (Halsentzündung)'],
      ['Yuki darf diese Woche nicht arbeiten gehen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Yuki ruft an, weil sie sich krank fühlt. Sie hat Halsschmerzen, Husten und Fieber.'),
  p('b) Dr. Weber schaut in den Hals, tastet die Lymphknoten ab und misst Fieber.'),
  p('c) Er empfiehlt: Antibiotika nehmen (10 Tage lang), viel trinken, sich ausruhen (und nicht arbeiten).'),
  p('d) Yuki bekommt ein Rezept für Antibiotika und ein Attest für drei Tage.'),
  ...gap(1),
  h2('Aufgabe 3 — Modalverben'),
  stdTable(
    ['Modalverb', 'Satz', 'Bedeutung'],
    [
      ['müssen', 'Sie müssen die Tabletten zehn Tage lang nehmen.', 'Pflicht / Notwendigkeit'],
      ['sollten', 'Sie sollten viel trinken und sich ausruhen.', 'Empfehlung (Konjunktiv II)'],
      ['dürfen', 'Sie dürfen diese Woche nicht arbeiten gehen.', 'Verbot / Erlaubnis'],
    ],
    [2200, 6000, 3506]
  ),
  grammarBox([
    '📌  Modalverben beim Arzt:',
    'müssen + Infinitiv: Pflicht  →  Sie müssen die Tabletten nehmen.',
    'dürfen nicht + Inf.: Verbot  →  Sie dürfen nicht rauchen.',
    'sollten + Infinitiv: Rat    →  Sie sollten sich ausruhen.',
    'können + Infinitiv: Möglich  →  Sie können morgen wieder kommen.',
  ]),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Lückentext'),
  infoBox([
    'Wörterkasten: Termin  |  Wartezimmer  |  untersuchen  |  Rezept  |  Attest',
    '              Versichertenkarte  |  Symptome  |  Fieber messen  |  Blut abnehmen  |  Schmerzen'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Arztbesuch: Fülle die Lücken aus'),
  p('Wenn man krank ist, ruft man zuerst die Arztpraxis an und macht einen ________. Man kommt zur Praxis und gibt an der Anmeldung seine ________ ab. Dann wartet man im ________.'),
  p('Der Arzt fragt: „Was sind Ihre ________?" Man erklärt, was man hat: Zum Beispiel ________ im Bauch oder Kopfschmerzen. Der Arzt möchte einen ________ . Er schaut in den Hals, hört die Lunge ab oder kann auch ________.', { before: 120 }),
  p('Wenn man Fieber hat, muss der Arzt ________. Am Ende bekommt man vielleicht ein ________ für Medikamente. Wenn man nicht arbeiten kann, stellt der Arzt ein ________ aus.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Arztgespräch: Dialog ergänzen'),
  p('Dr. Hoffmann spricht mit dem Patienten Herrn Karim. Ergänze den Dialog.'),
  infoBox(['Wörterkasten: schlucken  |  nehmen  |  ausruhen  |  allergisch  |  schreibe  |  untersuchen']),
  ...gap(1),
  p('Dr. Hoffmann: „Guten Morgen. Was kann ich für Sie tun?"'),
  p('Herr Karim: „Ich habe starke Halsschmerzen. Ich kann kaum ________."'),
  p('Dr. Hoffmann: „Seit wann haben Sie diese Beschwerden?"'),
  p('Herr Karim: „Seit gestern Abend. Außerdem habe ich Fieber."'),
  p('Dr. Hoffmann: „Ich möchte Sie kurz ________. Öffnen Sie bitte den Mund."'),
  p('Herr Karim: „Okay."'),
  p('Dr. Hoffmann: „Ja, Ihr Hals ist sehr gerötet. Sind Sie ________ gegen Penicillin?"'),
  p('Herr Karim: „Nein, ich bin gegen nichts allergisch."'),
  p('Dr. Hoffmann: „Gut. Ich ________ Ihnen ein Rezept für Antibiotika. Sie müssen die Tabletten zweimal täglich ________. Außerdem sollten Sie sich ________ und viel trinken."'),
  p('Herr Karim: „Brauche ich auch ein Attest?"'),
  p('Dr. Hoffmann: „Ja, ich stelle Ihnen ein Attest für drei Tage aus."'),
  ...gap(1),
  h2('Aufgabe 3 — Körperteile und Beschwerden zuordnen'),
  p('Verbinde: Wo hat man Schmerzen? Schreibe die Buchstaben.'),
  stdTable(
    ['Körperteil', 'Beschwerde (A–F)'],
    [
      ['der Kopf', ''],
      ['der Hals', ''],
      ['der Bauch', ''],
      ['der Rücken', ''],
      ['das Ohr', ''],
      ['die Brust', ''],
    ],
    [4500, 7206]
  ),
  infoBox([
    'A — Ich habe Ohrenschmerzen.     B — Ich habe Rückenschmerzen.',
    'C — Ich habe Kopfschmerzen.      D — Ich habe Halsschmerzen.',
    'E — Ich habe Bauchschmerzen.     F — Ich habe Brustschmerzen / Husten.',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — „seit" + Dativ: Ergänze die Endung'),
  p('a) Ich habe seit drei Tag____ Fieber.'),
  p('b) Er hat seit ein____ Woche Rückenschmerzen.'),
  p('c) Sie fühlt sich seit gestern Abend____ nicht wohl.'),
  p('d) Wir warten seit zwanzig Minut____ im Wartezimmer.'),
  p('e) Ich nehme seit d____ Wochenende Tabletten.'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Beim Arzt'),
  h2('Aufgabe 1 — Arztbesuch'),
  p('Termin — Versichertenkarte — Wartezimmer — Symptome — Schmerzen — untersuchen — Blut abnehmen — Fieber messen — Rezept — Attest'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. schlucken  2. untersuchen  3. allergisch  4. schreibe  5. nehmen  6. ausruhen'),
  ...gap(1),
  h2('Aufgabe 3 — Körperteile'),
  stdTable(
    ['Körperteil', 'Antwort'],
    [
      ['der Kopf', 'C — Kopfschmerzen'],
      ['der Hals', 'D — Halsschmerzen'],
      ['der Bauch', 'E — Bauchschmerzen'],
      ['der Rücken', 'B — Rückenschmerzen'],
      ['das Ohr', 'A — Ohrenschmerzen'],
      ['die Brust', 'F — Brustschmerzen / Husten'],
    ],
    [4500, 7206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — „seit" + Dativ'),
  p('a) seit drei Tagen (Dativ Plural: Tag → Tagen)'),
  p('b) seit einer Woche (Dativ Singular f.: eine → einer)'),
  p('c) seit gestern Abend (kein Artikel, kein Dativ nötig)'),
  p('d) seit zwanzig Minuten (Dativ Plural: Minute → Minuten)'),
  p('e) seit dem Wochenende (Dativ Singular n.: das → dem)'),
  grammarBox([
    '📌  „seit" + Dativ — Übersicht:',
    'maskulin: seit einem Monat  /  seit dem Monat',
    'feminin:  seit einer Woche  /  seit der Woche',
    'neutral:  seit einem Jahr   /  seit dem Jahr',
    'Plural:   seit drei Tagen   /  seit den letzten Tagen',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Wortliste'),
  h2('Teil A — Symptome und Krankheiten'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Erkältung, -en', 'Nomen', 'Ich habe eine Erkältung — Husten und Schnupfen.'],
      ['das Fieber (kein Pl.)', 'Nomen', 'Ich habe 39 Grad Fieber.'],
      ['die Halsentzündung', 'Nomen', 'Der Arzt sagt, ich habe eine Halsentzündung.'],
      ['der Schnupfen (kein Pl.)', 'Nomen', 'Mit Schnupfen kann ich schlecht schlafen.'],
      ['der Husten (kein Pl.)', 'Nomen', 'Ich habe seit einer Woche trockenen Husten.'],
      ['die Kopfschmerzen (Pl.)', 'Nomen', 'Die Kopfschmerzen sind sehr stark.'],
      ['schwindelig sein', 'Adj. + sein', 'Mir ist schwindelig — ich muss mich setzen.'],
      ['sich krank fühlen', 'reflexiv', 'Ich fühle mich seit gestern sehr krank.'],
      ['schlucken', 'Verb', 'Mein Hals tut weh — ich kann kaum schlucken.'],
      ['untersuchen', 'Verb', 'Der Arzt untersucht die Patientin.'],
    ],
    [3800, 2200, 5706]
  ),
  ...gap(1),
  h2('Teil B — In der Arztpraxis'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Versichertenkarte', 'Nomen', 'Bringen Sie bitte Ihre Versichertenkarte mit.'],
      ['das Attest, -e', 'Nomen', 'Der Arzt stellt mir ein Attest für drei Tage aus.'],
      ['das Rezept, -e', 'Nomen', 'Mit dem Rezept hole ich die Tabletten in der Apotheke.'],
      ['die Krankenkasse, -n', 'Nomen', 'Meine Krankenkasse heißt AOK.'],
      ['der Hausarzt / die Hausärztin', 'Nomen', 'Mein Hausarzt heißt Dr. Müller.'],
      ['die Sprechstunde, -n', 'Nomen', 'Die Sprechstunde ist von 8 bis 12 Uhr.'],
      ['der Termin, -e', 'Nomen', 'Ich brauche einen Termin beim Arzt.'],
      ['ausstellen (Attest)', 'Verb trennbar', 'Der Arzt stellt ein Attest aus.'],
    ],
    [3800, 2200, 5706]
  ),
  ...gap(1),
  grammarBox([
    '📌  Körperteile mit Artikel:',
    'der Kopf / der Hals / der Bauch / der Rücken / der Arm / der Finger / der Fuß',
    'die Nase / die Schulter / die Hand / die Brust / die Zunge / die Lunge',
    'das Ohr / das Auge / das Knie / das Bein / das Herz',
    '',
    'Schmerzen beschreiben:',
    'Mir tut der Bauch weh. / Ich habe Bauchschmerzen. / Mein Bauch schmerzt.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Erkältung: ___________  |  das Fieber: ___________  |  das Rezept: ___________'),
  p('das Attest: ___________  |  schlucken: ___________  |  untersuchen: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Beim Arzt'),
  p('Die Wortliste dient als Vokabelhilfe. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    '📌  Trennbares Verb: ausstellen',
    'Der Arzt stellt ein Attest aus. (Präsens)',
    'Der Arzt hat ein Attest ausgestellt. (Perfekt)',
    '',
    '📌  Reflexives Verb: sich fühlen',
    'Ich fühle mich krank. / Wie fühlen Sie sich?',
    'Er fühlt sich besser. / Wir fühlen uns nicht wohl.',
    '',
    '📌  Wichtige Unterscheidung:',
    'Ich habe Kopfschmerzen. (= Kopfschmerzen als Symptom, Pl.)',
    'Ich habe einen Kopfschmerz. (seltener, eher umgangssprachlich)',
  ]),
  ...gap(1),
  h2('Musterlösung — Körperteile beschreiben'),
  p('Mein Rücken tut sehr weh — ich habe seit einer Woche Rückenschmerzen.'),
  p('Die Ärztin hört meine Lunge ab und misst dann Fieber.'),
  p('Ich kann nicht gut sehen — meine Augen tun weh.'),
  ...gap(1),
  p('Übersetzungen hängen von der Muttersprache ab — individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Konversation'),
  h2('Aufgabe 1 — Dialog: Beim Arzt (Rollen A und B)'),
  p('Person A ist Patient/in. Person B ist Arzt / Ärztin. Spielt den Dialog durch. Dann tauscht die Rollen.'),
  infoBox([
    '🗣  Person A (Patient/in):',
    'Ich habe … / Mir ist … / Seit … Tagen/Wochen habe ich …',
    'Mein/Meine … tut/tun weh. / Ich kann kaum … (schlafen / schlucken / arbeiten).',
    'Brauche ich ein Attest? / Müssen Sie mich untersuchen?',
    '',
    '🩺  Person B (Arzt/Ärztin — formelles Sie):',
    'Was fehlt Ihnen? / Seit wann haben Sie diese Beschwerden?',
    'Sind Sie allergisch gegen …? / Nehmen Sie Medikamente?',
    'Sie müssen … / Sie sollten … / Sie dürfen nicht …',
    'Ich schreibe Ihnen ein Rezept / ein Attest für … Tage.',
  ]),
  ...gap(1),
  p('Person B (Arzt): „Guten Morgen. Was kann ich für Sie tun?"'),
  p('Person A: „Guten Morgen, Herr/Frau Doktor. Ich ________________________."'),
  p('Person B: „Seit wann haben Sie diese Beschwerden?"'),
  p('Person A: „Seit ________________________."'),
  p('Person B: „Haben Sie auch Fieber?"'),
  p('Person A: „________________________."'),
  p('Person B: „Ich möchte Sie kurz untersuchen. Öffnen Sie bitte ________________________."'),
  p('Person A: „________________________."'),
  p('Person B: „Sie haben ________________________. Ich empfehle Ihnen ________________________."'),
  p('Person A: „Brauche ich ein Attest?"'),
  p('Person B: „________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Termin vereinbaren (Karten A und B)'),
  stdTable(
    ['Person A — Patient/in', 'Person B — Sprechstundenhilfe'],
    [
      ['Rufen Sie die Praxis an.', 'Melden Sie sich: „Praxis Dr. Schneider, guten Morgen."'],
      ['Nennen Sie Ihren Namen und Ihr Problem (Symptome).', 'Fragen Sie nach dem Problem.'],
      ['Bitten Sie um einen Termin heute noch.', 'Sagen Sie: Heute voll. Morgen 9:15 Uhr?'],
      ['Bestätigen Sie den Termin.', 'Fragen Sie nach der Versichertenkarte.'],
      ['Bedanken Sie sich und verabschieden Sie sich.', 'Verabschieden Sie sich höflich.'],
    ],
    [5703, 5703]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Gesundheit und Arzt'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Warst du schon einmal beim Arzt in Deutschland? Wie war das?', ''],
      ['Was machst du, wenn du erkältet bist?', ''],
      ['Wie oft gehst du pro Jahr zum Arzt?', ''],
      ['Was ist für dich das Schwierigste beim Arztbesuch auf Deutsch?', ''],
      ['Hast du eine Krankenversicherung? Wie heißt sie?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Symptome raten'),
  p('Eine Person denkt sich eine Krankheit oder ein Symptom aus und beschreibt es ohne den Namen zu sagen. Die anderen raten.'),
  infoBox([
    '💡  Beschreibungsregeln:',
    '1. Wo tut es weh? (Kopf, Bauch, Hals …)',
    '2. Wie fühlt man sich? (müde, schwindelig, heiß …)',
    '3. Was kann man nicht machen? (kaum schlucken, nicht arbeiten …)',
    '4. Seit wann? (seit gestern, seit einer Woche …)',
    '⏱  Maximal 4 Hinweise — wer zuerst rät, gewinnt!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Beim Arzt'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Symptome klar und vollständig beschrieben'),
  bullet('„seit" korrekt mit Dativ verwendet'),
  bullet('Modalverben müssen / sollten / dürfen korrekt eingesetzt'),
  bullet('Formelle Sie-Form beim Arzt durchgehend'),
  bullet('Natürlicher Gesprächsfluss mit Fragen und Antworten'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Ich habe seit drei Tagen Halsschmerzen und leichtes Fieber. Mir ist außerdem schwindelig."'),
  p('B: „Haben Sie auch Husten oder Schnupfen?" / A: „Ja, etwas Husten auch."'),
  p('B: „Öffnen Sie bitte den Mund und sagen Sie Aaah."'),
  p('B: „Sie haben eine Halsentzündung. Ich schreibe Ihnen ein Rezept für Antibiotika. Sie sollten viel trinken und sich ausruhen. Sie dürfen diese Woche nicht arbeiten."'),
  p('A: „Brauche ich ein Attest?" / B: „Ja, ich stelle Ihnen ein Attest für drei Tage aus."'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Telefonat'),
  p('A: „Guten Morgen, hier ist [Name]. Ich habe starke Halsschmerzen und Fieber. Kann ich heute noch einen Termin bekommen?"'),
  p('B: „Heute ist leider kein Platz mehr frei. Würde Ihnen morgen um 9:15 Uhr passen?"'),
  p('A: „Ja, das passt mir gut. Danke sehr."'),
  p('B: „Bringen Sie bitte Ihre Versichertenkarte mit. Auf Wiederhören."'),
  ...gap(1),
  h2('Aufgabe 4 — Beispiel-Beschreibungen'),
  p('Erkältung: „Mir ist kalt, aber ich habe Fieber. Meine Nase läuft. Ich habe Kopfschmerzen und fühle mich sehr müde."'),
  p('Magenschmerzen: „Mein Bauch tut weh. Mir ist übel. Ich habe seit gestern Durchfall. Ich kann nicht essen."'),
  p('Rückenschmerzen: „Ich kann kaum sitzen oder stehen. Mein Rücken schmerzt sehr. Ich habe seit dem Wochenende Probleme."'),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Beim Arzt — Bildaufgaben'),
  h2('Aufgabe 1 — Körperteile beschriften'),
  p('[BILD 1: Eine einfache Umrisszeichnung eines menschlichen Körpers — Vorderseite — mit 8 nummerierten Pfeilen auf: Kopf, Hals, Schulter, Brust, Arm, Bauch, Hand, Bein]'),
  p('Schreibe den richtigen Körperteil mit Artikel neben jede Nummer.'),
  stdTable(
    ['Nr.', 'Körperteil mit Artikel', 'Nr.', 'Körperteil mit Artikel'],
    [
      ['1', '', '5', ''],
      ['2', '', '6', ''],
      ['3', '', '7', ''],
      ['4', '', '8', ''],
    ],
    [800, 5053, 800, 5053]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Arztpraxis-Szene beschreiben'),
  p('[BILD 2: Eine Arztpraxis — der Arzt sitzt am Schreibtisch, eine Patientin sitzt ihm gegenüber. Auf dem Schreibtisch: Computer, Rezeptblock, Stethoskop. Im Hintergrund: Untersuchungsliege, Poster mit Körper-Anatomie]'),
  p('Beantworte die Fragen zum Bild:'),
  p('a) Wer ist auf dem Bild? Was machen die Personen?'),
  writingLine(), writingLine(),
  p('b) Was siehst du auf dem Schreibtisch?', { before: 120 }),
  writingLine(),
  p('c) Erfinde einen Satz, den der Arzt gerade sagt.', { before: 120 }),
  writingLine(),
  ...gap(1),
  h2('Aufgabe 3 — Krankmeldungsformular'),
  p('[BILD 3: Ein vereinfachtes deutsches Krankmeldungsformular / Attest mit ausgefüllten Feldern: Patient: Herr Ahmed Malik, Diagnose: Grippe (ICD: J11), Arbeitsunfähig vom 28.04. bis 02.05., Ausstellender Arzt: Dr. Sabine Hoffmann, Stempel]'),
  p('a) Wer ist der Patient und wie lange darf er nicht arbeiten?'),
  writingLine(), writingLine(),
  p('b) Was bedeutet „Arbeitsunfähigkeit"? Erkläre mit eigenen Worten.', { before: 120 }),
  writingLine(), writingLine(),
  p('c) Wohin muss Herr Malik dieses Formular schicken?', { before: 120 }),
  writingLine(),
  ...gap(1),
  h2('Aufgabe 4 — Was tun bei diesen Symptomen?'),
  p('[BILD 4: Vier Bilder nebeneinander — (a) Person mit rotem Gesicht und Fieberthermometer: 39°; (b) Person hält sich den Bauch; (c) Person hustet stark; (d) Person hat verbundenes Handgelenk / Arm in Schlinge]'),
  p('Was empfiehlst du für jede Situation? Schreibe einen Satz mit „sollte" oder „muss".'),
  p('(a) Fieber 39°:'),
  writingLine(),
  p('(b) Bauchschmerzen:', { before: 120 }),
  writingLine(),
  p('(c) Starker Husten:', { before: 120 }),
  writingLine(),
  p('(d) Verletztes Handgelenk:', { before: 120 }),
  writingLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Beim Arzt'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab. Lehrkraft fügt passende Bilder ein.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Körperteile (erwartete Antworten)'),
  stdTable(
    ['Nr.', 'Körperteil', 'Nr.', 'Körperteil'],
    [
      ['1', 'der Kopf', '5', 'der Arm'],
      ['2', 'der Hals', '6', 'der Bauch'],
      ['3', 'die Schulter', '7', 'die Hand'],
      ['4', 'die Brust', '8', 'das Bein'],
    ],
    [800, 5053, 800, 5053]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Arztpraxis'),
  p('a) Ein Arzt und eine Patientin sind auf dem Bild. Der Arzt sitzt am Schreibtisch und schreibt / spricht mit der Patientin. Die Patientin erklärt ihre Beschwerden.'),
  p('b) Auf dem Schreibtisch: Computer, Rezeptblock, Stethoskop.'),
  p('c) z. B.: „Was fehlt Ihnen heute?" oder „Ich schreibe Ihnen ein Rezept."'),
  ...gap(1),
  h2('Aufgabe 3 — Krankmeldungsformular'),
  p('a) Der Patient ist Herr Ahmed Malik. Er darf vom 28. April bis 2. Mai nicht arbeiten (5 Tage / Werktage).'),
  p('b) „Arbeitsunfähigkeit" bedeutet, dass man so krank ist, dass man nicht arbeiten kann.'),
  p('c) Herr Malik muss das Attest an seinen Arbeitgeber (Chef / Firma) schicken, manchmal auch an die Krankenkasse.'),
  ...gap(1),
  h2('Aufgabe 4 — Empfehlungen'),
  p('(a) Sie sollte zum Arzt gehen und sich ausruhen — 39 Grad sind hohes Fieber.'),
  p('(b) Er sollte viel Wasser trinken und zum Arzt gehen, wenn der Schmerz stark ist.'),
  p('(c) Sie muss zum Arzt gehen, wenn der Husten länger als eine Woche anhält.'),
  p('(d) Er muss sofort zum Arzt oder in die Notaufnahme gehen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
