// A2_Erwachsene — Thema 09 UP 02: Telefonieren und Nachrichten schreiben
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Telefonieren und Nachrichten schreiben';
const HEADING = 'Thema 09 — Medien & Kommunikation';
const SUBHEAD = 'UP 02: Telefonieren und Nachrichten schreiben';
const PREFIX  = 'A2_Erwachsene_MedienKommunikation_02_TelefonierenNachrichten';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '09_MedienKommunikation', '02_TelefonierenNachrichten');
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
const phoneBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, left: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, right: { style: BorderStyle.SINGLE, size: 12, color: '00838F' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E0F7FA' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Telefonieren und Nachrichten schreiben — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke fürs Telefonieren und Schreiben:',
    'Telefon-Anfang: Hallo, hier ist … / Guten Tag, mein Name ist … / Spreche ich mit …?',
    'Verbinden: Einen Moment bitte. / Ich verbinde Sie. / Bleiben Sie dran.',
    'Nachfragen: Können Sie das wiederholen? / Können Sie etwas langsamer sprechen?',
    'Verabschiedung: Auf Wiederhören! / Bis später! / Tschüss!',
    'Schriftliche Nachrichten formell: Sehr geehrte Frau … / Mit freundlichen Grüßen',
    'Schriftliche Nachrichten informell: Hey! / Liebe(r) … / Liebe Grüße / LG',
    'Indirekte Rede: Sie sagt, dass … / Er meint, … / Sie hat gesagt, …',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — SMS / Kurznachricht schreiben'),
  p('Schreiben Sie drei kurze Nachrichten (je 2–3 Sätze) für verschiedene Situationen.'),
  p('a) Du kommst 20 Minuten zu spät zu einem Treffen mit Freunden:'),
  wLine(), wLine(),
  p('b) Du fragst einen Kollegen, wann der Termin morgen ist:', { before: 120 }),
  wLine(), wLine(),
  p('c) Du sagst deinem Vermieter, dass die Heizung kaputt ist:', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Formelle E-Mail'),
  p('Schreiben Sie eine formelle E-Mail an Ihren Hausarzt und bitten Sie um einen Termin. Inhalt: Anrede, Vorstellung, Anliegen, Terminwünsche, Abschluss (5–6 Sätze).'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Indirekte Rede mit dass-Sätzen'),
  grammarBox([
    'Indirekte Rede mit dass:',
    'Direkt:    Anna sagt: „Ich komme um 18 Uhr."',
    'Indirekt:  Anna sagt, dass sie um 18 Uhr kommt.',
    '→ Verb am Ende des dass-Satzes!',
    '→ Pronomen anpassen: „ich" → „sie/er" je nach Kontext.',
    'Ähnlich: ob (für ja/nein-Fragen): Sie fragt, ob ich Zeit habe.',
    'W-Wort (für offene Fragen): Er fragt, wann der Bus kommt.',
  ]),
  ...gap(1),
  p('Forme die direkte Rede in indirekte Rede um.'),
  p('a) Marek: „Ich rufe dich später an." → Marek sagt, '),
  wLine(),
  p('b) Aysha: „Hast du meine Nachricht bekommen?" → Aysha fragt, ', { before: 120 }),
  wLine(),
  p('c) Tomás: „Wann beginnt das Meeting?" → Tomás fragt, ', { before: 120 }),
  wLine(),
  p('d) Mama: „Ich habe heute viel zu tun." → Mama sagt, ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Telefonnotiz schreiben'),
  p('Sie haben einen Anruf für Ihre Kollegin entgegengenommen. Schreiben Sie eine kurze Telefonnotiz mit allen wichtigen Infos (4–5 Zeilen): Wer hat angerufen? Worum ging es? Soll zurückrufen? Wann erreichbar?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Telefonieren und Nachrichten schreiben'),
  grammarBox([
    'dass-Satz, ob-Satz, indirekte W-Frage:',
    'dass:  für Aussagen (Sie sagt, dass …)',
    'ob:    für ja/nein-Fragen (Sie fragt, ob ich komme)',
    'W-Wort: für offene Fragen (Sie fragt, wann ich komme)',
    'Wortstellung: Verb IMMER am Ende des Nebensatzes!',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Nachrichten'),
  p('a) Hey! Sorry, ich komme leider 20 Minuten zu spät — die U-Bahn hat Verspätung. Wartet bitte nicht draußen, ich bin so schnell wie möglich da!'),
  p('b) Hallo Tom, kannst du mir bitte sagen, wann der Termin morgen ist? Ich finde die Mail nicht mehr. Danke!'),
  p('c) Sehr geehrter Herr Müller, leider funktioniert die Heizung in meiner Wohnung seit gestern nicht. Können Sie bitte einen Techniker schicken? Vielen Dank, mit freundlichen Grüßen.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-E-Mail'),
  p('Sehr geehrte Damen und Herren,'),
  p('mein Name ist [Name], ich bin Patient/in in Ihrer Praxis. Ich möchte gerne einen Termin vereinbaren — am besten in der nächsten Woche, vormittags. Es geht um eine routinemäßige Untersuchung. Bitte teilen Sie mir mit, welche Zeiten möglich sind.'),
  p('Vielen Dank im Voraus.'),
  p('Mit freundlichen Grüßen, [Name]'),
  ...gap(1),
  h2('Aufgabe 3 — Indirekte Rede'),
  p('a) Marek sagt, dass er mich später anruft.'),
  p('b) Aysha fragt, ob ich ihre Nachricht bekommen habe.'),
  p('c) Tomás fragt, wann das Meeting beginnt.'),
  p('d) Mama sagt, dass sie heute viel zu tun hat.'),
  ...gap(1),
  h2('Aufgabe 4 — Muster-Telefonnotiz'),
  p('Telefonnotiz für: Frau Schmidt'),
  p('Anrufer: Herr Becker (Firma Solar GmbH, Tel. 030/123456)'),
  p('Datum/Zeit: 29.04.2026, 10:15 Uhr'),
  p('Anliegen: Frage zum Vertrag vom 15.04.'),
  p('Bitte zurückrufen: ja, am besten heute Nachmittag bis 17 Uhr.'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Telefonieren und Nachrichten schreiben — Leseübung'),
  h2('Text: Esras schwieriger Anruf'),
  p('Esra Demirci kommt aus der Türkei und lebt seit einem Jahr in Hannover. Sie arbeitet als Friseurin in einem kleinen Salon. Ihr Deutsch ist schon ziemlich gut — beim direkten Gespräch fühlt sie sich sicher. Aber Telefonieren auf Deutsch macht ihr immer noch Sorgen. „Wenn ich jemanden nicht sehe, höre ich nur die Hälfte", sagt sie. „Und dann werde ich nervös."'),
  p('Letzte Woche musste Esra einen Termin bei der Bank vereinbaren. Sie hat dreimal angerufen, bevor sie sich getraut hat, das Gespräch wirklich zu führen. „Ich habe vorher alles aufgeschrieben: Was ich sagen will, welche Fragen ich habe, sogar mein Geburtsdatum." Trotzdem war sie so aufgeregt, dass sie zuerst „Guten Morgen" gesagt hat — obwohl es schon Nachmittag war."'),
  p('Die Mitarbeiterin am Telefon, Frau Krüger, war zum Glück sehr freundlich und geduldig. „Sie hat langsam und deutlich gesprochen", erinnert sich Esra. „Als ich ein Wort nicht verstanden habe, habe ich gefragt: ‚Können Sie das bitte buchstabieren?‘ — und Frau Krüger hat das einfach gemacht." Am Ende hatte Esra einen Termin für die nächste Woche.'),
  p('Heute fühlt sich Esra schon viel sicherer am Telefon. Ihre Strategie: „Erstens: nicht Panik bekommen. Zweitens: vorher kurz aufschreiben, was ich sagen will. Drittens: höflich nachfragen, wenn ich etwas nicht verstehe." Sie sagt auch: „Die meisten Leute sind viel geduldiger, als man denkt. Man muss nur einfach anfangen — Übung macht den Meister."'),
  p('Für schriftliche Nachrichten benutzt Esra meistens WhatsApp. „Mit Freunden schreibe ich schnell und informell — viele Emojis und Abkürzungen." Aber für formelle E-Mails (zum Beispiel an die Krankenkasse oder den Vermieter) liest sie ihre Texte immer dreimal durch, bevor sie auf „Senden" klickt. „Da kann ich mir Zeit lassen — beim Telefonieren nicht."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Esra wohnt seit zwei Jahren in Hannover.', ''],
      ['Esra fühlt sich beim direkten Gespräch sicher.', ''],
      ['Esra hat den Bank-Anruf beim ersten Mal sofort geschafft.', ''],
      ['Frau Krüger hat freundlich und geduldig gesprochen.', ''],
      ['Esra hat Frau Krüger gebeten, ein Wort zu buchstabieren.', ''],
      ['Esras Strategie ist: alles auswendig lernen, dann anrufen.', ''],
      ['Bei formellen E-Mails liest Esra ihre Texte mehrmals durch.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum macht Esra Telefonieren auf Deutsch nervös?'),
  wLine(), wLine(),
  p('b) Wie hat Esra sich auf den Bank-Anruf vorbereitet?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was hat Esra gemacht, als sie ein Wort nicht verstanden hat?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was ist der Unterschied zwischen Esras Verhalten beim Schreiben und Telefonieren?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Esras Tipps zum Telefonieren'),
  p('Notiere Esras drei Tipps und ihre Begründung.'),
  stdTable(
    ['Tipp', 'Begründung / Vorteil'],
    [
      ['1.', ''],
      ['2.', ''],
      ['3.', ''],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Telefonieren und Nachrichten schreiben'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Esra wohnt seit zwei Jahren in Hannover.', 'F (seit einem Jahr)'],
      ['Esra fühlt sich beim direkten Gespräch sicher.', 'R'],
      ['Esra hat den Bank-Anruf beim ersten Mal sofort geschafft.', 'F (dreimal angerufen)'],
      ['Frau Krüger hat freundlich und geduldig gesprochen.', 'R'],
      ['Esra hat Frau Krüger gebeten, ein Wort zu buchstabieren.', 'R'],
      ['Esras Strategie ist: alles auswendig lernen, dann anrufen.', 'F (kurz aufschreiben, ruhig bleiben)'],
      ['Bei formellen E-Mails liest Esra ihre Texte mehrmals durch.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Sie sieht den Gesprächspartner nicht und versteht nur die Hälfte — dadurch wird sie nervös.'),
  p('b) Sie hat alles aufgeschrieben: was sie sagen will, ihre Fragen, sogar ihr Geburtsdatum.'),
  p('c) Sie hat höflich gefragt: „Können Sie das bitte buchstabieren?"'),
  p('d) Beim Schreiben kann sie sich Zeit lassen und mehrmals durchlesen — beim Telefonieren muss sie spontan reagieren.'),
  ...gap(1),
  h2('Aufgabe 3 — Tipps'),
  stdTable(
    ['Tipp', 'Begründung'],
    [
      ['1. Nicht Panik bekommen', 'Ruhe hilft beim Verstehen und Sprechen'],
      ['2. Vorher aufschreiben, was man sagen will', 'Man vergisst nichts Wichtiges'],
      ['3. Höflich nachfragen, wenn man etwas nicht versteht', 'Die meisten Leute sind geduldig'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Telefonieren und Nachrichten schreiben — Lückentext'),
  infoBox([
    'Wörterkasten: anrufen  |  zurückrufen  |  buchstabieren  |  Termin  |  besetzt',
    '              Anrufbeantworter  |  verbinden  |  Notiz  |  hinterlassen  |  klingelt'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Telefon-Text: Fülle die Lücken aus'),
  p('Telefonieren in einer fremden Sprache kann schwer sein. Wenn das Telefon ________, soll man freundlich antworten. Manchmal will man jemanden ________, aber die Leitung ist ________ — dann muss man später ________ oder eine Nachricht ________.'),
  p('In Firmen sagt man oft: „Ich ________ Sie weiter zu Frau X." Der Empfänger nimmt dann das Gespräch entgegen. Wenn niemand antwortet, springt der ________ an. Dort kann man eine Nachricht aufnehmen.', { before: 120 }),
  p('Wichtig ist auch, einen ________ klar zu vereinbaren. Wenn man einen Namen nicht versteht, fragt man: „Können Sie das ________?" — Buchstaben einzeln nennen. Manchmal macht man auch eine kurze ________ , um nichts zu vergessen.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Telefongespräch: Dialog ergänzen'),
  infoBox(['Wörterkasten: spreche  |  ausrichten  |  zurückrufen  |  besetzt  |  verbinden  |  Moment']),
  ...gap(1),
  p('A: „Firma Müller, guten Tag, hier ________ Schmidt. Was kann ich für Sie tun?"'),
  p('B: „Guten Tag, könnten Sie mich bitte mit Frau Bauer ________?"'),
  p('A: „Einen ________ bitte … Leider ist die Leitung gerade ________. Möchten Sie warten oder soll ich etwas ________?"'),
  p('B: „Können Sie ihr bitte sagen, dass sie mich bitte ________ soll? Meine Nummer ist 0173 / 123 456 78."'),
  p('A: „Selbstverständlich. Auf Wiederhören!"'),
  ...gap(1),
  h2('Aufgabe 3 — dass / ob / W-Wort einsetzen'),
  p('Ergänze dass, ob oder ein W-Wort (wann, wo, was).'),
  p('a) Sie fragt, ________ ich morgen Zeit habe.'),
  p('b) Er sagt, ________ er um 19 Uhr nach Hause kommt.'),
  p('c) Ich weiß nicht, ________ das Meeting genau stattfindet.'),
  p('d) Können Sie mir sagen, ________ ich anrufen kann?'),
  p('e) Sie hat erklärt, ________ der Termin verschoben wurde.'),
  p('f) Ich frage mich, ________ er die Nachricht bekommen hat.'),
  ...gap(1),
  h2('Aufgabe 4 — Indirekte Rede: Direkt → Indirekt'),
  p('Schreibe die direkte Rede als indirekte Rede mit dass.'),
  stdTable(
    ['Direkte Rede', 'Indirekte Rede mit dass'],
    [
      ['Anna: „Ich rufe dich morgen an."', 'Anna sagt, dass'],
      ['Tom: „Ich habe deine SMS gelesen."', 'Tom sagt, dass'],
      ['Mama: „Wir kommen am Wochenende."', 'Mama sagt, dass'],
      ['Lehrer: „Ich schicke euch die Hausaufgaben per E-Mail."', 'Der Lehrer sagt, dass'],
    ],
    [5500, 6206]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Telefonieren und Nachrichten schreiben'),
  h2('Aufgabe 1'),
  p('1. klingelt  2. anrufen  3. besetzt  4. zurückrufen  5. hinterlassen'),
  p('6. verbinde  7. Anrufbeantworter  8. Termin  9. buchstabieren  10. Notiz'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. spreche  2. verbinden  3. Moment  4. besetzt  5. ausrichten  6. zurückrufen'),
  ...gap(1),
  h2('Aufgabe 3 — dass / ob / W-Wort'),
  p('a) ob  (ja/nein-Frage: Hast du Zeit?)'),
  p('b) dass  (Aussage)'),
  p('c) wo  (offene Frage: Wo findet das Meeting statt?)'),
  p('d) wann  (offene Frage: Wann kann ich anrufen?)'),
  p('e) dass  (Aussage)'),
  p('f) ob  (ja/nein-Frage: Hat er die Nachricht bekommen?)'),
  ...gap(1),
  h2('Aufgabe 4 — Indirekte Rede'),
  stdTable(
    ['Direkte Rede', 'Indirekte Rede'],
    [
      ['Anna: „Ich rufe dich morgen an."', 'Anna sagt, dass sie mich morgen anruft.'],
      ['Tom: „Ich habe deine SMS gelesen."', 'Tom sagt, dass er meine SMS gelesen hat.'],
      ['Mama: „Wir kommen am Wochenende."', 'Mama sagt, dass sie am Wochenende kommen.'],
      ['Lehrer: „Ich schicke euch die Hausaufgaben per E-Mail."', 'Der Lehrer sagt, dass er uns die Hausaufgaben per E-Mail schickt.'],
    ],
    [5500, 6206]
  ),
  grammarBox([
    'Wichtig bei der indirekten Rede:',
    'Pronomen anpassen: „ich" → „er/sie" (je nach Sprecher)',
    'Possessivpronomen anpassen: „mein" → „sein/ihr"',
    'Verb ans Ende des dass-Satzes!',
    'Die Zeitform bleibt meist gleich (Präsens → Präsens, Perfekt → Perfekt).',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Telefonieren und Nachrichten schreiben — Wortliste'),
  h2('Teil A — Telefonieren'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['anrufen (trennb.)', 'Verb', 'Ich rufe dich heute Abend an.'],
      ['zurückrufen (trennb.)', 'Verb', 'Können Sie mich bitte zurückrufen?'],
      ['die Leitung, -en', 'Nomen', 'Die Leitung ist gerade besetzt.'],
      ['besetzt sein', 'Adj.', 'Sein Telefon ist immer besetzt.'],
      ['der Anrufbeantworter, -', 'Nomen', 'Hinterlassen Sie eine Nachricht auf dem Anrufbeantworter.'],
      ['verbinden (mit)', 'Verb', 'Ich verbinde Sie mit Frau Bauer.'],
      ['ausrichten', 'Verb', 'Ich werde es ihr ausrichten.'],
      ['hinterlassen', 'Verb', 'Bitte hinterlassen Sie eine Nachricht.'],
      ['die Vorwahl, -en', 'Nomen', 'Die Vorwahl von Berlin ist 030.'],
      ['buchstabieren', 'Verb', 'Können Sie Ihren Namen buchstabieren?'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Schriftliche Kommunikation'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['die SMS / Kurznachricht', 'kurze Textnachricht', 'Ich schicke dir eine SMS.'],
      ['die E-Mail, -s', 'elektronische Post', 'Ich habe eine E-Mail an den Chef geschrieben.'],
      ['der Betreff', 'Thema der E-Mail', 'Bitte schreib einen klaren Betreff.'],
      ['der Anhang, -hänge', 'angehängte Datei', 'Ich habe das Foto im Anhang.'],
      ['weiterleiten (trennb.)', 'an andere senden', 'Kannst du mir die E-Mail weiterleiten?'],
      ['antworten auf + Akk.', 'Antwort schreiben', 'Ich antworte später auf deine Nachricht.'],
      ['die Anrede, -n', 'Begrüßung im Brief', 'Die formelle Anrede lautet „Sehr geehrte/r …".'],
      ['der Gruß, Grüße', 'Verabschiedung im Brief', 'Mit freundlichen Grüßen / Liebe Grüße'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  phoneBox([
    'Wichtige Telefon-Floskeln:',
    'Sich vorstellen: „Hallo, hier ist [Name]." / „Mein Name ist …"',
    'Person erfragen: „Könnte ich bitte mit … sprechen?"',
    'Pause/Warten: „Einen Moment bitte." / „Bleiben Sie dran."',
    'Verstehen: „Wie bitte? Können Sie das wiederholen?"',
    'Verabschiedung: „Vielen Dank, auf Wiederhören!"',
    'Achtung: am Telefon sagt man „Auf Wiederhören" (nicht „Auf Wiedersehen")!',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('anrufen: ___________  |  zurückrufen: ___________  |  besetzt: ___________'),
  p('verbinden: ___________  |  hinterlassen: ___________  |  buchstabieren: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Telefonieren und Nachrichten schreiben'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Telefon-/Nachrichten-Verben — Perfekt:',
    'anrufen        → hat angerufen (trennb.)',
    'zurückrufen    → hat zurückgerufen (trennb.)',
    'verbinden      → hat verbunden',
    'hinterlassen   → hat hinterlassen',
    'ausrichten     → hat ausgerichtet (trennb.)',
    'buchstabieren  → hat buchstabiert',
    'weiterleiten   → hat weitergeleitet (trennb.)',
    'antworten      → hat geantwortet',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich habe gestern Frau Müller angerufen, aber die Leitung war besetzt — sie soll mich heute zurückrufen.'),
  p('Bitte hinterlassen Sie nach dem Signalton eine Nachricht — wir rufen Sie schnellstmöglich zurück.'),
  p('Können Sie mir bitte die E-Mail mit dem Anhang weiterleiten? Ich finde sie in meinem Posteingang nicht.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Telefonieren und Nachrichten schreiben — Konversation'),
  h2('Aufgabe 1 — Telefongespräch: Termin vereinbaren'),
  p('Zwei Personen telefonieren miteinander, um einen Termin zu vereinbaren. Ergänzt den Dialog.'),
  infoBox([
    'Telefon eröffnen: „Hallo, hier ist …" / „Guten Tag, mein Name ist …"',
    'Anliegen nennen: „Ich rufe an, weil …" / „Ich hätte gerne …"',
    'Vorschläge machen: „Wie wäre es mit …?" / „Passt Ihnen …?"',
    'Bestätigen: „Ja, das passt." / „In Ordnung, abgemacht!"',
    'Verabschieden: „Vielen Dank, auf Wiederhören!"',
  ]),
  ...gap(1),
  p('Anrufer/in: „Guten Tag, hier ________________________. Ich möchte gerne ________________________."'),
  p('Mitarbeiter/in: „Guten Tag! Wann hätten Sie denn Zeit?"'),
  p('Anrufer/in: „Am liebsten ________________________ oder ________________________."'),
  p('Mitarbeiter/in: „Am ________ um ________ Uhr wäre noch frei. Passt Ihnen das?"'),
  p('Anrufer/in: „Ja, das ist ________________________. Brauchen Sie noch weitere Infos?"'),
  p('Mitarbeiter/in: „Können Sie mir bitte ________________________?"'),
  p('Anrufer/in: „Selbstverständlich: ________________________."'),
  p('Mitarbeiter/in: „Vielen Dank, dann sehen wir uns am ________. ________________________!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Anruf entgegennehmen'),
  stdTable(
    ['Mitarbeiter/in (A)', 'Anrufer/in (B)'],
    [
      ['Melden Sie sich am Telefon (Firma/Name).', 'Stellen Sie sich vor und nennen Sie Ihr Anliegen.'],
      ['Sagen Sie, dass die gewünschte Person nicht da ist.', 'Fragen Sie, wann sie wieder erreichbar ist.'],
      ['Bieten Sie an, eine Nachricht weiterzugeben.', 'Hinterlassen Sie Ihre Telefonnummer und Bitte um Rückruf.'],
      ['Wiederholen Sie die Nummer und bestätigen Sie.', 'Bedanken Sie sich und verabschieden sich.'],
    ],
    [5703, 5703]
  ),
  phoneBox([
    'Telefonisches Buchstabieren mit dem deutschen Alphabet:',
    'A wie Anton, B wie Berta, C wie Cäsar, D wie Dora,',
    'E wie Emil, F wie Friedrich, G wie Gustav, H wie Heinrich,',
    'I wie Ida, K wie Kaufmann, L wie Ludwig, M wie Martha,',
    'N wie Nordpol, O wie Otto, P wie Paula, R wie Richard,',
    'S wie Samuel, T wie Theodor, U wie Ulrich, W wie Wilhelm.',
    'Ä wie Ärger, Ö wie Ökonom, Ü wie Übermut, ß = Eszett',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Kommunikation'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Telefonieren oder schreiben Sie lieber? Warum?', ''],
      ['Wie oft telefonieren Sie auf Deutsch? Was finden Sie schwierig?', ''],
      ['Schreiben Sie häufiger formelle E-Mails oder informelle Nachrichten?', ''],
      ['Was ist Ihr Tipp, um auf Deutsch besser zu kommunizieren?', ''],
      ['Welche App nutzen Sie am häufigsten zum Schreiben?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Stille Post am Telefon"'),
  p('Eine Person flüstert einem anderen Schüler eine Nachricht (1 Satz) ins Ohr. Diese gibt sie weiter — bis zum Ende der Reihe. Der letzte „Empfänger" sagt die Nachricht laut. Wie verändert sie sich?'),
  infoBox([
    'Vorschläge für die Nachrichten:',
    '1. Frau Schmidt soll bitte um 15 Uhr im Konferenzraum sein.',
    '2. Der Termin wurde auf Donnerstag verschoben.',
    '3. Bitte rufen Sie Herrn Becker zurück — Vorwahl 030.',
    '4. Das Paket wird morgen zwischen 10 und 12 Uhr geliefert.',
    'Ziel: aktives Zuhören und genaue Wiedergabe trainieren.',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Telefonieren und Nachrichten schreiben'),
  h2('Aufgabe 1 — Bewertungskriterien Termin-Telefonat'),
  bullet('Klare Vorstellung am Anfang'),
  bullet('Anliegen konkret formuliert'),
  bullet('Mindestens 2 Terminvorschläge / Optionen'),
  bullet('Höfliche Bestätigung der Details'),
  bullet('Korrekte Verabschiedung („Auf Wiederhören")'),
  ...gap(1),
  h2('Muster-Telefonat'),
  p('A: „Guten Tag, hier Müller. Ich möchte gerne einen Termin bei Dr. Schmidt vereinbaren."'),
  p('B: „Guten Tag! Wann hätten Sie denn Zeit?" / A: „Am liebsten Mittwoch oder Donnerstag vormittag."'),
  p('B: „Am Donnerstag um 10:30 wäre frei. Passt Ihnen das?" / A: „Ja, perfekt!"'),
  p('B: „Können Sie mir bitte Ihre Versichertennummer nennen?" / A: „Selbstverständlich: K123456789."'),
  p('B: „Vielen Dank, dann sehen wir uns am Donnerstag. Auf Wiederhören!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Rollenspiel'),
  p('A: „Firma Solar GmbH, Schmidt am Apparat."'),
  p('B: „Guten Tag, hier Becker. Könnte ich bitte mit Frau Bauer sprechen?"'),
  p('A: „Frau Bauer ist heute leider nicht im Haus." / B: „Wann ist sie wieder erreichbar?"'),
  p('A: „Morgen ab 9 Uhr. Soll ich etwas ausrichten?" / B: „Ja, sie soll mich bitte zurückrufen — meine Nummer ist 0173 / 456 78 90."'),
  p('A: „Ich wiederhole: 0173 / 456 78 90 — Herr Becker. In Ordnung." / B: „Vielen Dank, auf Wiederhören!"'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: deutliches Sprechen, korrekte Wiedergabe von Zahlen und Namen, Verständnisfragen.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Telefonieren und Nachrichten schreiben — Bildaufgaben'),
  h2('Aufgabe 1 — Kommunikationsmittel benennen'),
  p('[BILD 1: Sechs Geräte / Kommunikationsmittel: (1) Smartphone, (2) Festnetztelefon, (3) Laptop mit E-Mail-Programm, (4) Briefumschlag mit Briefmarke, (5) Faxgerät, (6) Postkarte]'),
  p('a) Wie heißt jedes Kommunikationsmittel?'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welche dieser Mittel benutzen Sie noch? Welche nicht mehr? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — WhatsApp-Nachricht analysieren'),
  p('[BILD 2: WhatsApp-Verlauf zwischen Lara und Tom: 14:32 Lara: „Hey, kommst du heute Abend?" — 14:35 Tom: „Sorry, kann nicht — habe noch viel Arbeit 😔" — 14:36 Lara: „Schade! Wann passt es dir denn?" — 14:40 Tom: „Vielleicht morgen ab 19 Uhr? Hast du Zeit?" — 14:42 Lara: „Perfekt, sehen uns morgen 👍"]'),
  p('a) Worum geht es in dem Gespräch?'),
  wLine(),
  p('b) Warum kann Tom heute nicht?', { before: 120 }),
  wLine(),
  p('c) Auf wann verschieben sie das Treffen?', { before: 120 }),
  wLine(),
  p('d) Schreibe das Gespräch in indirekte Rede um (3 Sätze mit dass / ob).', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Formelle E-Mail lesen'),
  p('[BILD 3: Eine formelle E-Mail. Betreff: „Anfrage Termin Beratungsgespräch". An: info@finanzberatung-mueller.de. Inhalt: „Sehr geehrte Damen und Herren, mein Name ist Sara Khan. Ich interessiere mich für eine Finanzberatung und möchte einen Termin vereinbaren. Ich wäre an einem Termin in der Woche vom 5. bis 9. Mai interessiert, am liebsten nachmittags. Bitte teilen Sie mir mit, welche Zeiten möglich sind. Mit freundlichen Grüßen, Sara Khan, Tel.: 0151 / 234 56 78"]'),
  p('a) Wer schreibt an wen und warum?'),
  wLine(), wLine(),
  p('b) Welche Zeiten wünscht sich Sara?', { before: 120 }),
  wLine(),
  p('c) Schreibe eine kurze Antwort der Firma (3–4 Sätze): Termin anbieten oder absagen.', { before: 120 }),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Anrufnotiz auswerten'),
  p('[BILD 4: Eine Anrufnotiz auf einem Notizblock: „Anruf von: Herr Wagner, Firma Bau-Plus. Tel.: 0211 / 567 89 12. Datum: 28.04.2026, 11:20 Uhr. Anliegen: Fragen zur Rechnung Nr. 4521. Bitte bis 16 Uhr zurückrufen — danach erst morgen wieder erreichbar."]'),
  p('a) Wer hat angerufen und worum geht es?'),
  wLine(), wLine(),
  p('b) Bis wann soll man Herrn Wagner heute zurückrufen?', { before: 120 }),
  wLine(),
  p('c) Stell dir vor, du rufst zurück. Schreibe das erste Satz des Gesprächs (Vorstellung + Bezug auf seinen Anruf).', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Telefonieren und Nachrichten schreiben'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Kommunikationsmittel'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['das Smartphone', 'das Festnetztelefon', 'der Laptop / die E-Mail', 'der Brief', 'das Faxgerät', 'die Postkarte']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Ich benutze das Smartphone und den Laptop täglich. Briefe und Faxe schreibe ich fast nie.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — WhatsApp'),
  p('a) Lara fragt Tom, ob er heute Abend kommt — Tom muss absagen und schlägt morgen vor.'),
  p('b) Er hat noch viel Arbeit.'),
  p('c) Auf morgen ab 19 Uhr.'),
  p('d) Beispiele: Lara fragt, ob Tom heute Abend kommt. / Tom sagt, dass er nicht kommen kann, weil er viel Arbeit hat. / Tom fragt, ob morgen ab 19 Uhr passt.'),
  ...gap(1),
  h2('Aufgabe 3 — Formelle E-Mail'),
  p('a) Sara Khan schreibt an die Finanzberatung Müller, weil sie einen Beratungstermin vereinbaren möchte.'),
  p('b) In der Woche vom 5. bis 9. Mai, am liebsten nachmittags.'),
  p('c) Beispiel: „Sehr geehrte Frau Khan, vielen Dank für Ihre Anfrage. Wir können Ihnen einen Termin am Mittwoch, 7. Mai, um 15:00 Uhr anbieten. Bitte bestätigen Sie kurz per E-Mail. Mit freundlichen Grüßen, Müller Finanzberatung"'),
  ...gap(1),
  h2('Aufgabe 4 — Anrufnotiz'),
  p('a) Herr Wagner von der Firma Bau-Plus — er hat Fragen zur Rechnung Nr. 4521.'),
  p('b) Bis 16 Uhr.'),
  p('c) Beispiel: „Guten Tag, hier ist [Name]. Ich rufe Sie zurück — Sie hatten heute Vormittag wegen einer Frage zur Rechnung 4521 angerufen."'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
