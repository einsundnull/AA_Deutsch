// A2_Erwachsene — Thema 05 UP 02: Apotheke und Medikamente
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Apotheke und Medikamente';
const HEADING = 'Thema 05 — Gesundheit';
const SUBHEAD = 'UP 02: Apotheke und Medikamente';
const PREFIX  = 'A2_Erwachsene_Gesundheit_02_ApothekenMedikamente';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '05_Gesundheit', '02_ApothekenMedikamente');
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
const h1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const h3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: '2E75B6', font: 'Arial' })], spacing: { before: 160, after: 60 } });
const p = (t, o = {}) => new Paragraph({
  children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })],
  spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT
});
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }),
    new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] }),
  ]})]
});
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });
const infoBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })]})],
});
const grammarBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })]})],
});
const pkgBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '1565C0' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '1565C0' }, left: { style: BorderStyle.SINGLE, size: 12, color: '1565C0' }, right: { style: BorderStyle.SINGLE, size: 12, color: '1565C0' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
  rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E3F2FD' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })]})],
});
const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

// ── SAVE ──────────────────────────────────────────────────────────────────────
const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

// ════════════════════════════════════════════════════════════════════════════
(async () => {

// ── 1. SCHREIBEN ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Schreibübung'),
  infoBox([
    '💊  Nützliche Ausdrücke in der Apotheke:',
    'Ich brauche etwas gegen Kopfschmerzen / Husten / Schnupfen.',
    'Ich habe ein Rezept von meinem Arzt.',
    'Gibt es das auch ohne Rezept? / Ist das rezeptfrei?',
    'Wie oft muss ich die Tabletten nehmen? / Was sind die Nebenwirkungen?',
    'Darf ich das auch mit anderen Medikamenten nehmen?',
    'Haben Sie etwas gegen … ? / Können Sie mir etwas empfehlen?',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — In der Apotheke: Was sagst du?'),
  p('Schreibe einen vollständigen Satz für jede Situation.'),
  p('a) Du hast starke Kopfschmerzen und brauchst schnell etwas dagegen.'),
  wLine(), wLine(),
  p('b) Du hast ein Rezept vom Arzt für Antibiotika.', { before: 120 }),
  wLine(), wLine(),
  p('c) Du weißt nicht, wie oft du die Tabletten nehmen sollst.', { before: 120 }),
  wLine(), wLine(),
  p('d) Du fragst, ob das Medikament schläfrig macht (Nebenwirkungen).', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Beipackzettel lesen und zusammenfassen'),
  pkgBox([
    '📄  Beipackzettel — Ibuprofen 400 mg Tabletten',
    'Anwendung: Bei leichten bis mäßigen Schmerzen und Fieber.',
    'Dosierung: Erwachsene: 1 Tablette alle 6–8 Stunden. Maximal 3 Tabletten pro Tag.',
    'Einnahme: Mit einem Glas Wasser. Am besten nach dem Essen.',
    'Achtung: Nicht nehmen bei Magenproblemen oder Nierenerkrankungen.',
    'Kinder unter 12 Jahren: Nicht ohne Arzt anwenden.',
    'Nebenwirkungen: Manchmal Magenschmerzen oder Schwindel.',
    'Alkohol: Bitte keinen Alkohol während der Einnahme.',
  ]),
  ...gap(1),
  p('Beantworte die Fragen in vollständigen Sätzen.'),
  p('a) Wofür ist Ibuprofen? (Anwendung)'),
  wLine(), wLine(),
  p('b) Wie viele Tabletten darf man pro Tag maximal nehmen?', { before: 120 }),
  wLine(),
  p('c) Wann soll man die Tabletten nehmen? (Zeitpunkt)', { before: 120 }),
  wLine(),
  p('d) Wer darf Ibuprofen NICHT nehmen?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Einnahme-Anweisung schreiben'),
  p('Der Arzt hat dir Antibiotika verschrieben. Schreibe dem Patienten eine kurze Einnahme-Anweisung (3–4 Sätze). Benutze Modalverben: müssen / dürfen / sollen.'),
  p('Informationen: 2× täglich / nach dem Essen / 10 Tage lang / auch wenn es besser wird weiternehmen / kein Alkohol.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Apotheken-Tipp schreiben'),
  p('Dein Freund / deine Freundin hat Erkältung, aber keinen Arzttermin. Was empfiehlst du aus der Apotheke? Schreibe 3–4 Sätze mit Empfehlungen.'),
  wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Apotheke und Medikamente'),
  grammarBox([
    '📌  Modalverben für Einnahmeregeln:',
    'müssen: Sie müssen die Tabletten zweimal täglich nehmen. (Pflicht)',
    'dürfen: Sie dürfen keinen Alkohol trinken. (Verbot)',
    'sollen: Sie sollen die Tabletten nach dem Essen nehmen. (Anweisung vom Arzt)',
    'können: Sie können das Medikament auch rezeptfrei kaufen. (Möglichkeit)',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Musterlösungen'),
  p('a) Ich habe starke Kopfschmerzen — haben Sie etwas dagegen?'),
  p('b) Ich habe ein Rezept von meinem Arzt. Können Sie mir diese Tabletten geben?'),
  p('c) Wie oft muss ich die Tabletten nehmen? / Wie ist die Dosierung?'),
  p('d) Machen diese Tabletten schläfrig? / Was sind die Nebenwirkungen?'),
  ...gap(1),
  h2('Aufgabe 2 — Beipackzettel'),
  p('a) Ibuprofen ist bei leichten bis mäßigen Schmerzen und Fieber geeignet.'),
  p('b) Man darf maximal 3 Tabletten pro Tag nehmen.'),
  p('c) Man soll die Tabletten am besten nach dem Essen nehmen.'),
  p('d) Personen mit Magenproblemen oder Nierenerkrankungen und Kinder unter 12 Jahren dürfen Ibuprofen nicht nehmen.'),
  ...gap(1),
  h2('Aufgabe 3 — Musterlösung Einnahme-Anweisung'),
  p('Sie müssen die Antibiotika zweimal täglich nehmen — morgens und abends nach dem Essen. Die Einnahmedauer beträgt 10 Tage. Sie sollen die Tabletten auch dann weiternehmen, wenn Sie sich nach ein paar Tagen besser fühlen. Außerdem dürfen Sie während der Einnahme keinen Alkohol trinken.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Mindestens 2 konkrete Medikamente oder Produkte genannt (z. B. Nasenspray, Hustensaft, Ibuprofen)'),
  bullet('Konjunktiv II oder Imperativ für Empfehlungen genutzt'),
  bullet('Begründung: warum das Produkt hilft'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Leseübung'),
  h2('Text: Olga in der Apotheke'),
  p('Olga Kovalenko kommt aus der Ukraine und wohnt seit acht Monaten in Stuttgart. Sie arbeitet als Köchin in einem Restaurant. Nach dem Arztbesuch bei Dr. Bauer geht sie in die Apotheke nebenan. Sie hat zwei Rezepte dabei: eines für Antibiotika und eines für ein Nasenspray.'),
  p('In der Apotheke ist es ruhig. Ein freundlicher Apotheker, Herr Schreiber, fragt: „Guten Tag. Was kann ich für Sie tun?" Olga gibt ihm die Rezepte. Herr Schreiber schaut sie an und sagt: „Moment bitte, ich hole die Medikamente."'),
  p('Er kommt mit zwei Packungen zurück. „Hier sind Ihre Amoxicillin-Tabletten — das sind die Antibiotika. Und hier das Meersalz-Nasenspray." Er erklärt die Einnahme genau: „Die Tabletten müssen Sie dreimal täglich nehmen — morgens, mittags und abends, immer nach dem Essen. Die Packung reicht für zehn Tage. Sehr wichtig: Sie dürfen keinen Alkohol trinken, solange Sie die Antibiotika nehmen. Das Nasenspray benutzen Sie zweimal täglich — morgens und abends, je zwei Sprühstöße in jedes Nasenloch."'),
  p('Olga fragt: „Kann ich die Tabletten auch auf nüchternen Magen nehmen?" Herr Schreiber antwortet: „Das ist möglich, aber nach dem Essen verträgt man sie besser. Manche Patienten haben sonst Magenschmerzen." Olga nickt. „Und was kostet das?" Der Apotheker erklärt: „Die Zuzahlung beträgt 5 Euro pro Medikament — also zehn Euro insgesamt. Das Rezept geht an die Krankenkasse."'),
  p('Olga ist zufrieden. Sie nimmt die Tüte und bedankt sich. Herr Schreiber ruft ihr noch nach: „Gute Besserung, Frau Kovalenko!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Olga wohnt seit einem Jahr in Stuttgart.', ''],
      ['Olga hat zwei Rezepte dabei.', ''],
      ['Die Antibiotika heißen Amoxicillin.', ''],
      ['Olga muss die Tabletten zweimal täglich nehmen.', ''],
      ['Alkohol ist während der Einnahme verboten.', ''],
      ['Olga zahlt 10 Euro Zuzahlung.', ''],
      ['Herr Schreiber ist der Arzt.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Welche zwei Medikamente bekommt Olga in der Apotheke?'),
  wLine(), wLine(),
  p('b) Wie oft und wann muss Olga die Tabletten nehmen?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was passiert, wenn man Antibiotika auf nüchternen Magen nimmt?', { before: 120 }),
  wLine(), wLine(),
  p('d) Wie viel bezahlt Olga und warum nicht den vollen Preis?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Einnahme-Anweisung: Richtige Reihenfolge'),
  p('Nummeriere die Anweisungen von Herrn Schreiber in der Reihenfolge aus dem Text (1–5).'),
  stdTable(
    ['Anweisung', 'Nr.'],
    [
      ['Nasenspray je zweimal täglich benutzen', ''],
      ['Tabletten nach dem Essen nehmen', ''],
      ['Keinen Alkohol trinken', ''],
      ['Tabletten dreimal täglich nehmen (morgens, mittags, abends)', ''],
      ['Die Einnahmedauer beträgt zehn Tage', ''],
    ],
    [9600, 2106]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Apotheke und Medikamente'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Olga wohnt seit einem Jahr in Stuttgart.', 'F (seit acht Monaten)'],
      ['Olga hat zwei Rezepte dabei.', 'R'],
      ['Die Antibiotika heißen Amoxicillin.', 'R'],
      ['Olga muss die Tabletten zweimal täglich nehmen.', 'F (dreimal täglich)'],
      ['Alkohol ist während der Einnahme verboten.', 'R'],
      ['Olga zahlt 10 Euro Zuzahlung.', 'R (5 Euro x 2 Medikamente)'],
      ['Herr Schreiber ist der Arzt.', 'F (er ist Apotheker)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Olga bekommt Amoxicillin-Tabletten (Antibiotika) und ein Meersalz-Nasenspray.'),
  p('b) Sie muss die Tabletten dreimal täglich nehmen: morgens, mittags und abends, immer nach dem Essen.'),
  p('c) Auf nüchternen Magen sind sie möglich, aber manche Patienten bekommen dann Magenschmerzen.'),
  p('d) Olga zahlt 5 Euro pro Medikament = 10 Euro. Den Rest übernimmt die Krankenkasse.'),
  ...gap(1),
  h2('Aufgabe 3 — Reihenfolge'),
  stdTable(
    ['Anweisung', 'Nr.'],
    [
      ['Nasenspray je zweimal täglich benutzen', '5'],
      ['Tabletten nach dem Essen nehmen', '2'],
      ['Keinen Alkohol trinken', '3'],
      ['Tabletten dreimal täglich nehmen (morgens, mittags, abends)', '1'],
      ['Die Einnahmedauer beträgt zehn Tage', '4'],
    ],
    [9600, 2106]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Lückentext'),
  infoBox([
    'Wörterkasten: Rezept  |  Zuzahlung  |  Nebenwirkungen  |  Beipackzettel  |  verschreibungspflichtig',
    '              rezeptfrei  |  Dosierung  |  Tabletten  |  Krankenkasse  |  nüchternen'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — In der Apotheke: Fülle die Lücken aus'),
  p('Es gibt zwei Arten von Medikamenten: ________ Mittel — die kann man ohne ________ kaufen — und ________ Medikamente, die man nur mit einem Rezept vom Arzt bekommt.'),
  p('In der Apotheke gibt man das ________ ab und der Apotheker erklärt die ________ : Wie viele ________ nimmt man pro Tag und wann? Es ist wichtig, den ________ zu lesen — dort stehen alle wichtigen Informationen, zum Beispiel auch mögliche ________.', { before: 120 }),
  p('In Deutschland bezahlt man für verschreibungspflichtige Medikamente oft nur eine ________ — den Rest übernimmt die ________. Manche Medikamente darf man nicht auf ________ Magen nehmen.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Apothekendialog: Ergänze die Lücken'),
  infoBox(['Wörterkasten: empfehlen  |  nehmen  |  schläfrig  |  beachten  |  verträgt  |  allergisch']),
  ...gap(1),
  p('Kundin: „Guten Tag. Ich habe Erkältung. Können Sie mir etwas ________?"'),
  p('Apothekerin: „Gerne. Sind Sie ________ gegen irgendetwas?"'),
  p('Kundin: „Nein, keine Allergien."'),
  p('Apothekerin: „Dann empfehle ich Ihnen diesen Erkältungssaft. Sie können ihn dreimal täglich ________."'),
  p('Kundin: „Macht er ________?"'),
  p('Apothekerin: „Ja, manchmal. Bitte ________ Sie das — fahren Sie kein Auto danach."'),
  p('Kundin: „Und darf ich ihn nach dem Essen nehmen?"'),
  p('Apothekerin: „Ja, nach dem Essen ________ man ihn besser."'),
  ...gap(1),
  h2('Aufgabe 3 — Medikamente zuordnen'),
  p('Welches Medikament passt zu welchem Problem? Verbinde oder schreibe die Buchstaben.'),
  stdTable(
    ['Problem', 'Medikament (A–F)'],
    [
      ['Kopfschmerzen', ''],
      ['Husten', ''],
      ['Verstopfte Nase', ''],
      ['Kleine Wunde am Finger', ''],
      ['Sodbrennen', ''],
      ['Muskelschmerzen nach Sport', ''],
    ],
    [5000, 6706]
  ),
  infoBox([
    'A — Pflaster  |  B — Nasenspray  |  C — Ibuprofen-Tabletten',
    'D — Magentabletten / Antazida  |  E — Hustensaft  |  F — Kühlsalbe / Sportgel',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Zeitangaben für die Einnahme'),
  p('Ergänze die Einnahmeregeln. Wähle aus dem Kasten.'),
  infoBox(['zweimal täglich  |  dreimal täglich  |  alle 8 Stunden  |  einmal täglich  |  nach dem Essen']),
  p('a) Antibiotika: ________ — morgens, mittags und abends.'),
  p('b) Schmerzmittel (z. B. Ibuprofen): maximal ________ , zum Beispiel ________ .'),
  p('c) Schlaftabletten: ________ , abends vor dem Schlafen.'),
  p('d) Magenmittel: ________ , am besten 30 Minuten ________ .'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Apotheke und Medikamente'),
  h2('Aufgabe 1'),
  p('1. rezeptfrei  2. Rezept  3. verschreibungspflichtig  4. Rezept  5. Dosierung'),
  p('6. Tabletten  7. Beipackzettel  8. Nebenwirkungen  9. Zuzahlung  10. Krankenkasse  11. nüchternen'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. empfehlen  2. allergisch  3. nehmen  4. schläfrig  5. beachten  6. verträgt'),
  ...gap(1),
  h2('Aufgabe 3 — Medikamente'),
  stdTable(
    ['Problem', 'Lösung'],
    [
      ['Kopfschmerzen', 'C — Ibuprofen-Tabletten'],
      ['Husten', 'E — Hustensaft'],
      ['Verstopfte Nase', 'B — Nasenspray'],
      ['Kleine Wunde am Finger', 'A — Pflaster'],
      ['Sodbrennen', 'D — Magentabletten / Antazida'],
      ['Muskelschmerzen nach Sport', 'F — Kühlsalbe / Sportgel'],
    ],
    [5000, 6706]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Zeitangaben'),
  p('a) Antibiotika: dreimal täglich — morgens, mittags und abends.'),
  p('b) Schmerzmittel: maximal dreimal täglich / alle 8 Stunden.'),
  p('c) Schlaftabletten: einmal täglich, abends.'),
  p('d) Magenmittel: zweimal täglich / nach dem Essen (30 Minuten vor dem Essen je nach Präparat — beide Antworten akzeptieren).', { italics: false }),
  grammarBox([
    '📌  Zeitangaben für Medikamente:',
    'einmal / zweimal / dreimal täglich',
    'morgens / mittags / abends / vor dem Schlafen',
    'alle 6 / 8 Stunden (z. B. bei Schmerzmitteln)',
    'nach dem Essen / vor dem Essen / auf nüchternen Magen',
    '10 Tage lang / 2 Wochen lang (Kursdauer)',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Wortliste'),
  h2('Teil A — Medikamenten-Typen'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Tablette, -n', 'Nomen', 'Nehmen Sie zweimal täglich eine Tablette.'],
      ['der Hustensaft', 'Nomen', 'Hustensaft schmeckt süß und hilft gegen Husten.'],
      ['das Nasenspray, -s', 'Nomen', 'Das Nasenspray benutze ich zweimal täglich.'],
      ['die Salbe, -n', 'Nomen', 'Die Salbe trägt man auf die Haut auf.'],
      ['das Pflaster, -', 'Nomen', 'Ich brauche ein Pflaster für diese kleine Wunde.'],
      ['das Antibiotikum (Pl. Antibiotika)', 'Nomen', 'Antibiotika darf man nicht abbrechen.'],
      ['das Schmerzmittel, -', 'Nomen', 'Ibuprofen ist ein bekanntes Schmerzmittel.'],
      ['das Fieberzäpfchen, -', 'Nomen', 'Für Kinder gibt es oft Fieberzäpfchen.'],
    ],
    [4000, 2000, 5706]
  ),
  ...gap(1),
  h2('Teil B — In der Apotheke'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['der Beipackzettel, -', 'Nomen', 'Lesen Sie immer den Beipackzettel.'],
      ['die Dosierung, -en', 'Nomen', 'Die Dosierung steht auf der Packung.'],
      ['die Nebenwirkung, -en', 'Nomen', 'Mögliche Nebenwirkungen: Schwindel, Übelkeit.'],
      ['die Zuzahlung, -en', 'Nomen', 'Die Zuzahlung beträgt 5 Euro pro Rezept.'],
      ['rezeptfrei', 'Adj.', 'Ibuprofen ist in kleinen Mengen rezeptfrei erhältlich.'],
      ['verschreibungspflichtig', 'Adj.', 'Antibiotika sind verschreibungspflichtig.'],
      ['Gute Besserung!', 'Floskel', 'Der Apotheker wünscht: Gute Besserung!'],
      ['auf nüchternen Magen', 'Ausdruck', 'Bitte nicht auf nüchternen Magen nehmen.'],
    ],
    [4000, 2000, 5706]
  ),
  ...gap(1),
  pkgBox([
    '💡  Wichtige Unterscheidung:',
    'rezeptfrei = man kann es ohne Arzt kaufen (z. B. Ibuprofen bis 400 mg)',
    'verschreibungspflichtig = nur mit Rezept vom Arzt (z. B. Antibiotika)',
    '',
    'Zuzahlung = der Betrag, den der Patient selbst zahlt',
    'Krankenkasse = übernimmt den Rest des Preises',
    'In Deutschland: 5–10 Euro Zuzahlung pro Rezept (Stand 2026)',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Tablette: ___________  |  die Nebenwirkung: ___________  |  der Beipackzettel: ___________'),
  p('rezeptfrei: ___________  |  die Dosierung: ___________  |  die Zuzahlung: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Apotheke und Medikamente'),
  p('Vokabelliste ohne Lücken. Lösungshinweise für den Unterricht:'),
  ...gap(1),
  grammarBox([
    '📌  Adjektive: rezeptfrei vs. verschreibungspflichtig',
    'rezeptfrei (Adv./Adj.): käuflich ohne Arztrezept',
    'verschreibungspflichtig: nur nach ärztlicher Verordnung erlaubt',
    '',
    '📌  Wichtige Verben in der Apotheke:',
    'das Rezept einlösen: Ich löse das Rezept in der Apotheke ein.',
    'die Tabletten nehmen / einnehmen: zweimal täglich',
    'die Salbe auftragen: auf die betroffene Stelle',
    'den Beipackzettel lesen / beachten',
  ]),
  ...gap(1),
  h2('Übungssätze mit Wortlistenvokabular'),
  p('Bitte lesen Sie den Beipackzettel sorgfältig — dort stehen alle Dosierungen und möglichen Nebenwirkungen.'),
  p('Diese Tabletten sind verschreibungspflichtig. Sie brauchen ein Rezept vom Arzt.'),
  p('Die Zuzahlung für meine Antibiotika beträgt 5 Euro — den Rest übernimmt meine Krankenkasse.'),
  ...gap(1),
  p('Übersetzungen: abhängig von Muttersprache — individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Konversation'),
  h2('Aufgabe 1 — Dialog: In der Apotheke (Rollen A und B)'),
  p('Person A ist Kunde / Kundin. Person B ist Apotheker/in. Spielt den Dialog. Dann tauscht die Rollen.'),
  infoBox([
    '🛍  Person A (Kunde/Kundin):',
    'Ich brauche etwas gegen … / Haben Sie etwas gegen …?',
    'Ich habe ein Rezept. / Gibt es das auch ohne Rezept?',
    'Wie oft muss ich … nehmen? / Was sind die Nebenwirkungen?',
    'Darf ich das mit … zusammen nehmen?',
    '',
    '💊  Person B (Apotheker/in — formelles Sie):',
    'Was kann ich für Sie tun? / Sind Sie allergisch gegen …?',
    'Ich empfehle Ihnen … / Das ist rezeptfrei / verschreibungspflichtig.',
    'Sie müssen … täglich nehmen. / Sie dürfen keinen Alkohol trinken.',
    'Die Zuzahlung beträgt … Euro. / Gute Besserung!',
  ]),
  ...gap(1),
  p('Person B: „Guten Tag. Was kann ich für Sie tun?"'),
  p('Person A: „Ich habe ________________________ und brauche etwas dagegen."'),
  p('Person B: „Haben Sie ein Rezept, oder suchen Sie etwas rezeptfreies?"'),
  p('Person A: „________________________."'),
  p('Person B: „Ich empfehle Ihnen ________________________. Das ist sehr gut gegen ________________________."'),
  p('Person A: „Wie oft muss ich das nehmen?"'),
  p('Person B: „________________________. Bitte ________________________ beachten."'),
  p('Person A: „Was kostet das?"'),
  p('Person B: „________________________. Gute Besserung!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Beipackzettel erklären'),
  p('Person A ist Apotheker/in und erklärt einem Patienten (Person B) den Beipackzettel.'),
  pkgBox([
    '📄  Paracetamol 500 mg Tabletten (vereinfacht)',
    'Anwendung: Fieber, leichte bis mäßige Schmerzen.',
    'Dosierung: 1–2 Tabletten alle 4–6 Stunden. Maximal 8 Tabletten pro Tag.',
    'Einnahme: Mit Wasser. Kann auch auf nüchternen Magen genommen werden.',
    'Achtung: Nicht zusammen mit Alkohol. Nicht bei Leberproblemen.',
    'Nebenwirkungen: Sehr selten — Hautausschlag, Übelkeit.',
  ]),
  ...gap(1),
  stdTable(
    ['Apotheker/in (A)', 'Patient/in (B)'],
    [
      ['Erklären Sie, wofür die Tabletten sind.', 'Fragen Sie nach der Dosierung.'],
      ['Erklären Sie: maximal 8 Tabletten täglich.', 'Fragen Sie, ob Alkohol erlaubt ist.'],
      ['Erklären Sie die Alkohol-Warnung.', 'Fragen Sie nach Nebenwirkungen.'],
      ['Nennen Sie mögliche Nebenwirkungen.', 'Bedanken Sie sich höflich.'],
    ],
    [5703, 5703]
  ),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Medikamente und Apotheke'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Warst du schon in einer deutschen Apotheke? Wie war das?', ''],
      ['Was nimmst du gegen Kopfschmerzen / Erkältung?', ''],
      ['Liest du immer den Beipackzettel? Warum (nicht)?', ''],
      ['Gibt es Unterschiede zur Apotheke in deinem Heimatland?', ''],
      ['Welche Medikamente hast du zu Hause immer vorrätig?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Was ist das Medikament?'),
  p('Eine Person beschreibt ein Medikament (ohne den Namen zu sagen). Die anderen raten.'),
  infoBox([
    '💡  Beschreibungsregeln:',
    '1. Form: „Es ist eine Tablette / ein Saft / eine Salbe / ein Spray."',
    '2. Wogegen: „Es hilft gegen … / Man nimmt es bei …"',
    '3. Einnahme: „Man nimmt es … täglich / nach dem Essen."',
    '4. Hinweis: „Es ist rezeptfrei / verschreibungspflichtig."',
    '⏱  Maximal 4 Hinweise — wer zuerst rät, bekommt einen Punkt!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Apotheke und Medikamente'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Symptome klar und vollständig beschrieben'),
  bullet('Modalverben müssen / dürfen / sollen korrekt genutzt'),
  bullet('Formelle Sie-Form durchgehend eingehalten'),
  bullet('Fragen nach Dosierung und Nebenwirkungen gestellt'),
  bullet('Natürlicher Dialog mit sinnvollen Antworten'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Ich habe Erkältung seit drei Tagen — Husten und Schnupfen."'),
  p('B: „Haben Sie ein Rezept?" / A: „Nein, ich suche etwas Rezeptfreies."'),
  p('B: „Dann empfehle ich Ihnen diesen Erkältungssaft. Sie müssen ihn dreimal täglich nehmen, immer nach dem Essen. Er kann schläfrig machen — bitte kein Auto fahren danach."'),
  p('A: „Was kostet das?" / B: „9,95 Euro. Gute Besserung!"'),
  ...gap(1),
  h2('Aufgabe 4 — Beispiel-Beschreibungen'),
  p('Pflaster: „Es ist kein Saft und keine Tablette. Man klebt es auf die Haut. Es hilft bei kleinen Wunden oder Schnittwunden. Es ist immer rezeptfrei."'),
  p('Hustensaft: „Es ist eine Flüssigkeit. Man nimmt es bei Husten. Meistens dreimal täglich. Es schmeckt oft süß. Es ist rezeptfrei erhältlich."'),
  p('Nasenspray: „Man benutzt es mit der Nase. Es hilft bei Schnupfen oder verstopfter Nase. Zwei Sprühstöße pro Nasenloch. Meistens zweimal täglich."'),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Apotheke und Medikamente — Bildaufgaben'),
  h2('Aufgabe 1 — Medikamente benennen'),
  p('[BILD 1: Sechs Medikamente auf einem Tisch: Tabletten-Packung, Hustensaft-Flasche, Nasenspray, Salbe-Tube, Pflaster, Fieberthermometer — mit Nummern 1–6]'),
  p('Schreibe den richtigen Namen mit Artikel unter jede Nummer.'),
  stdTable(
    ['Nr.', 'Name mit Artikel', 'Wofür? (Kurze Erklärung)'],
    [
      ['1', '', ''],
      ['2', '', ''],
      ['3', '', ''],
      ['4', '', ''],
      ['5', '', ''],
      ['6', '', ''],
    ],
    [800, 4953, 5953]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Beipackzettel-Ausschnitt lesen'),
  p('[BILD 2: Vereinfachter Beipackzettel-Ausschnitt mit: Produktname „NasenKlar Spray", Dosierung: 3× täglich je 2 Sprühstöße pro Nasenloch, Maximalanwendung: nicht länger als 7 Tage, Hinweis: Nicht für Kinder unter 6 Jahren, Wirkstoff: Xylometazolin]'),
  p('a) Wie oft und wie viel soll man das Nasenspray benutzen?'),
  wLine(), wLine(),
  p('b) Wie lange darf man es maximal anwenden?', { before: 120 }),
  wLine(),
  p('c) Für wen ist es NICHT geeignet?', { before: 120 }),
  wLine(),
  p('d) Du hast das Spray seit 10 Tagen. Darf du es weiterverwenden? Begründe.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Apothekenszene'),
  p('[BILD 3: Eine freundliche Apothekerin steht hinter dem Tresen. Ein Kunde zeigt ihr ein Rezept. Auf dem Tresen stehen verschiedene Medikamentenpackungen. Im Hintergrund: Regale mit Produkten.]'),
  p('a) Beschreibe die Szene in 2–3 Sätzen.'),
  wLine(), wLine(), wLine(),
  p('b) Was sagt die Apothekerin vermutlich zu dem Kunden? Schreibe 1–2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Apotheken-Empfangszettel'),
  p('[BILD 4: Kassenzettel einer Apotheke: Datum 15.03.2026 / Produkt 1: Amoxicillin 500 mg (Rezept) 5,00 EUR / Produkt 2: Nasenspray (rezeptfrei) 8,95 EUR / Produkt 3: Vitamin C Brausetabletten 4,99 EUR / Gesamt: 18,94 EUR]'),
  p('a) Welches Medikament braucht ein Rezept? Wie erkennst du das?'),
  wLine(), wLine(),
  p('b) Wie viel hat der Kunde insgesamt bezahlt? Was davon übernimmt die Krankenkasse?', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Apotheke und Medikamente'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab. Lehrkraft fügt Bilder ein.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Medikamente (Muster)'),
  stdTable(
    ['Nr.', 'Name', 'Wofür?'],
    [
      ['1', 'die Tabletten-Packung', 'gegen Schmerzen / Fieber / Infektion'],
      ['2', 'der Hustensaft', 'gegen Husten und Reizhusten'],
      ['3', 'das Nasenspray', 'gegen verstopfte Nase / Schnupfen'],
      ['4', 'die Salbe', 'für die Haut, z. B. bei Muskeln oder Verletzungen'],
      ['5', 'das Pflaster', 'bei kleinen Wunden oder Schnittwunden'],
      ['6', 'das Fieberthermometer', 'zum Fiebermessen'],
    ],
    [800, 4953, 5953]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Beipackzettel'),
  p('a) Man benutzt es 3× täglich, je 2 Sprühstöße pro Nasenloch.'),
  p('b) Maximal 7 Tage anwenden.'),
  p('c) Nicht für Kinder unter 6 Jahren geeignet.'),
  p('d) Nein — 10 Tage überschreiten die maximale Anwendungsdauer von 7 Tagen. Man sollte aufhören und evtl. den Arzt fragen.'),
  ...gap(1),
  h2('Aufgabe 3 — Apothekenszene'),
  p('a) Eine Apothekerin steht an der Theke. Ein Kunde zeigt ihr sein Rezept. Sie erklärt ihm vermutlich die Einnahme des Medikaments.'),
  p('b) z. B.: „Hier sind Ihre Tabletten. Nehmen Sie bitte zweimal täglich eine — morgens und abends nach dem Essen."'),
  ...gap(1),
  h2('Aufgabe 4 — Kassenzettel'),
  p('a) Das Amoxicillin braucht ein Rezept — erkennbar daran, dass nur 5 EUR bezahlt wurden (Zuzahlung), nicht der volle Preis.'),
  p('b) Der Kunde hat insgesamt 18,94 EUR bezahlt. Das Nasenspray (8,95 EUR) und die Vitamin-C-Tabletten (4,99 EUR) bezahlt er selbst voll. Die Zuzahlung für das Rezept beträgt 5,00 EUR — den Rest übernimmt die Krankenkasse.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
