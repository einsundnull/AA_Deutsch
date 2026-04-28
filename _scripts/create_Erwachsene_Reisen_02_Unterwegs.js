// A2_Erwachsene — Thema 07 UP 02: Unterwegs (Transportmittel, Orientierung)
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Unterwegs (Transportmittel, Orientierung)';
const HEADING = 'Thema 07 — Reisen';
const SUBHEAD = 'UP 02: Unterwegs (Transportmittel, Orientierung)';
const PREFIX  = 'A2_Erwachsene_Reisen_02_Unterwegs';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '07_Reisen', '02_Unterwegs');
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
const h3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: '2E75B6', font: 'Arial' })], spacing: { before: 160, after: 60 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const mapBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '283593' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '283593' }, left: { style: BorderStyle.SINGLE, size: 12, color: '283593' }, right: { style: BorderStyle.SINGLE, size: 12, color: '283593' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8EAF6' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Unterwegs — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Orientierung und Wegbeschreibung:',
    'Nach dem Weg fragen: Entschuldigung, wie komme ich zu …? / Wo ist der/die/das …?',
    'Wegbeschreibung geben: Gehen Sie geradeaus. / Biegen Sie links/rechts ab.',
    '  An der Kreuzung / Ampel / Ecke … / Nehmen Sie die erste/zweite Straße links.',
    '  Das Gebäude ist gegenüber von … / neben … / hinter … / vor …',
    'ÖPNV: Nehmen Sie die U-Bahn / Straßenbahn / den Bus Linie …',
    '  Fahren Sie bis zur Haltestelle … / Steigen Sie bei … um / aus.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Weg beschreiben'),
  p('Sie stehen am Hauptbahnhof. Beschreiben Sie jemandem den Weg zu diesen Zielen (je 2–3 Sätze). Benutzen Sie den Imperativ.'),
  p('a) Zum nächsten Supermarkt:'),
  wLine(), wLine(), wLine(),
  p('b) Zu Ihrer Wohnung / Ihrem Arbeitsplatz:', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Nachricht: Wegbeschreibung schicken'),
  p('Ihr Freund / Ihre Freundin besucht Sie zum ersten Mal. Schreiben Sie eine kurze Nachricht (4–5 Sätze): Beschreiben Sie den Weg vom Bahnhof zu Ihrer Wohnung. Benutzen Sie den Imperativ und Wegbeschreibungs-Präpositionen.'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Imperativ üben'),
  grammarBox([
    'Imperativ (Sie-Form): Infinitiv + Sie — Verb auf Position 1!',
    'gehen → Gehen Sie!  |  nehmen → Nehmen Sie!  |  abbiegen → Biegen Sie ab!',
    'fahren → Fahren Sie!  |  aussteigen → Steigen Sie aus!  |  umsteigen → Steigen Sie um!',
    'Bitte beachten: trennbare Verben trennen sich auch im Imperativ.',
  ]),
  ...gap(1),
  p('Schreibe den Satz im Imperativ (Sie-Form).'),
  p('a) (geradeaus gehen) ________ Sie ________ bis zur Ampel.'),
  p('b) (links abbiegen) ________ Sie dann ________.'),
  p('c) (die U-Bahn nehmen) ________ Sie ________ Linie 3.'),
  p('d) (bei der Haltestelle aussteigen) ________ Sie bei Marienplatz ________.'),
  p('e) (an der Kreuzung rechts abbiegen) ________ Sie an der Kreuzung rechts ________.'),
  p('f) (in Richtung Rathaus fahren) ________ Sie in Richtung Rathaus ________.'),
  ...gap(1),
  h2('Aufgabe 4 — Postkarte schreiben'),
  p('Sie sind unterwegs und schreiben eine Postkarte an einen Freund / eine Freundin (5–6 Sätze). Erzählen Sie: Wo sind Sie? Wie sind Sie hingekommen? Was haben Sie schon gesehen? Was machen Sie als nächstes?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Unterwegs'),
  grammarBox([
    'Wegbeschreibung — typische Satzstruktur:',
    '1. Orientierungspunkt nennen: An der Ampel / An der Kreuzung / Beim Supermarkt …',
    '2. Richtung angeben: biegen Sie links/rechts ab / gehen Sie geradeaus',
    '3. Ziel beschreiben: Das Gebäude ist auf der linken/rechten Seite.',
    '   gegenüber von + Dativ: gegenüber vom Bahnhof (= gegenüber von dem)',
    '   neben + Dativ: neben der Apotheke',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Wegbeschreibung'),
  p('a) Gehen Sie aus dem Hauptbahnhof heraus und biegen Sie rechts ab. Dann gehen Sie geradeaus bis zur zweiten Ampel. Der Supermarkt ist auf der linken Seite, gegenüber von der Post.'),
  p('b) Individuelle Antworten — Hauptsache: Imperativ korrekt, Präpositionen mit richtigem Kasus.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Nachricht'),
  p('Hey! Am besten nimmst du am Bahnhof die U2 Richtung Innenstadt — fahre bis zur Haltestelle Marktplatz (4 Stationen). Steige dort aus und gehe die Hauptstraße geradeaus. An der Kreuzung biege links ab — mein Haus ist das dritte auf der rechten Seite, Hausnummer 17. Klingel einfach!'),
  ...gap(1),
  h2('Aufgabe 3 — Imperativ'),
  p('a) Gehen Sie geradeaus bis zur Ampel.'),
  p('b) Biegen Sie dann links ab.'),
  p('c) Nehmen Sie die U-Bahn Linie 3.'),
  p('d) Steigen Sie bei Marienplatz aus.'),
  p('e) Biegen Sie an der Kreuzung rechts ab.'),
  p('f) Fahren Sie in Richtung Rathaus.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Postkarte'),
  bullet('Informeller Ton (du-Form, Ausrufe)'),
  bullet('Perfekt für vergangene Aktivitäten: Ich bin … gefahren / Ich habe … gesehen.'),
  bullet('Futur I oder Präsens + Zeitangabe für Pläne'),
  bullet('Mindestens ein Transportmittel erwähnt'),
  bullet('Kurze Abschlussformel: Viele Grüße / Bis bald!'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Unterwegs — Leseübung'),
  h2('Text: Bashirs Ausflug nach Heidelberg'),
  p('Bashir Rahimi kommt aus Afghanistan und lebt seit drei Jahren in Frankfurt. Er arbeitet als IT-Techniker und erkundet in seiner Freizeit gerne Deutschland. An einem Samstag im April hat er einen Tagesausflug nach Heidelberg gemacht — eine historische Stadt am Neckar, ca. 80 Kilometer südlich von Frankfurt.'),
  p('Vom Frankfurter Hauptbahnhof hat Bashir die S-Bahn Richtung Heidelberg genommen. Die Fahrt hat ungefähr eine Stunde gedauert. Am Heidelberger Hauptbahnhof angekommen, hat er sich zuerst orientiert: „Der Bahnhof liegt nicht in der Innenstadt", hat er auf dem Stadtplan gesehen. „Ich muss die Straßenbahn nehmen."'),
  p('Er hat einen älteren Herrn gefragt: „Entschuldigung, wie komme ich zur Altstadt?" Der Mann hat freundlich geantwortet: „Nehmen Sie die Straßenbahn Linie 21 oder 23 — Richtung Bismarckplatz. Fahren Sie bis zur Haltestelle Universitätsplatz, das sind vier Stationen. Von dort gehen Sie einfach geradeaus zur Alten Brücke."'),
  p('Bashir hat die Anweisung befolgt und war nach zehn Minuten mitten in der wunderschönen Altstadt. Er hat das Heidelberger Schloss besucht — die Eintrittskarte hat 9 Euro gekostet — und ist dann zu Fuß die Hauptstraße entlanggegangen, die längste Fußgängerzone Deutschlands. Zum Mittagessen hat er sich in ein kleines Restaurant gesetzt und Schnitzel mit Kartoffelsalat gegessen.'),
  p('Auf dem Rückweg hat sich Bashir kurz verirrt. „Ich dachte, ich muss links abbiegen, aber es war rechts", hat er gelacht. Eine junge Frau hat ihm geholfen und den Weg zur Straßenbahn gezeigt. „Die Deutschen helfen gern, wenn man höflich fragt", findet Bashir. Um 19 Uhr war er wieder in Frankfurt — müde, aber sehr zufrieden.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Heidelberg liegt ca. 80 km nördlich von Frankfurt.', ''],
      ['Bashir hat die S-Bahn von Frankfurt nach Heidelberg genommen.', ''],
      ['Der Heidelberger Hauptbahnhof liegt direkt in der Altstadt.', ''],
      ['Bashir hat nach dem Weg gefragt und eine Antwort auf Englisch bekommen.', ''],
      ['Die Eintrittskarte fürs Schloss hat 9 Euro gekostet.', ''],
      ['Auf dem Rückweg hat Bashir sich kurz verirrt.', ''],
      ['Bashir war um 19 Uhr wieder in Frankfurt.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Wie hat Bashir vom Bahnhof in die Altstadt gefunden?'),
  wLine(), wLine(),
  p('b) Welche Wegbeschreibung hat der alte Herr gegeben?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was hat Bashir in der Altstadt gemacht?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was findet Bashir positiv an den Deutschen, wenn man Hilfe braucht?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Reise-Übersicht'),
  stdTable(
    ['Reiseelement', 'Details aus dem Text'],
    [
      ['Ausgangspunkt', ''],
      ['Transportmittel (Hinfahrt)', ''],
      ['Fahrzeit', ''],
      ['Transportmittel in der Stadt', ''],
      ['Besichtigtes Ziel + Kosten', ''],
      ['Problem unterwegs', ''],
    ],
    [4200, 7506]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Unterwegs'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Heidelberg liegt ca. 80 km nördlich von Frankfurt.', 'F (südlich)'],
      ['Bashir hat die S-Bahn von Frankfurt nach Heidelberg genommen.', 'R'],
      ['Der Heidelberger Hauptbahnhof liegt direkt in der Altstadt.', 'F (nicht in der Innenstadt)'],
      ['Bashir hat nach dem Weg gefragt und eine Antwort auf Englisch bekommen.', 'F (auf Deutsch)'],
      ['Die Eintrittskarte fürs Schloss hat 9 Euro gekostet.', 'R'],
      ['Auf dem Rückweg hat Bashir sich kurz verirrt.', 'R'],
      ['Bashir war um 19 Uhr wieder in Frankfurt.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Er hat einen älteren Herrn gefragt und die Straßenbahn genommen.'),
  p('b) Straßenbahn Linie 21 oder 23 bis Universitätsplatz (4 Stationen), dann geradeaus zur Alten Brücke.'),
  p('c) Er hat das Schloss besucht (9 EUR), die Hauptstraße entlanggegangen, zu Mittag gegessen.'),
  p('d) Die Deutschen helfen gern, wenn man höflich fragt.'),
  ...gap(1),
  h2('Aufgabe 3 — Reise-Übersicht'),
  stdTable(
    ['Reiseelement', 'Details'],
    [
      ['Ausgangspunkt', 'Frankfurt Hauptbahnhof'],
      ['Transportmittel (Hinfahrt)', 'S-Bahn Richtung Heidelberg'],
      ['Fahrzeit', 'Ca. eine Stunde'],
      ['Transportmittel in der Stadt', 'Straßenbahn Linie 21 oder 23'],
      ['Besichtigtes Ziel + Kosten', 'Heidelberger Schloss, 9 Euro'],
      ['Problem unterwegs', 'Auf dem Rückweg verirrt (falsche Abbiegung)'],
    ],
    [4200, 7506]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Unterwegs — Lückentext'),
  infoBox([
    'Wörterkasten: Haltestelle  |  umsteigen  |  geradeaus  |  abbiegen  |  Fahrplan',
    '              Fahrkarte  |  Richtung  |  Kreuzung  |  gegenüber  |  aussteigen'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Orientierungstext: Fülle die Lücken aus'),
  p('In einer neuen Stadt braucht man oft Hilfe bei der Orientierung. Am besten schaut man zuerst auf den ________ der Busse und Bahnen — dort sieht man, welche Linie wohin fährt und wie lange man fährt. Man kauft sich eine ________ am Automaten oder in der App und steigt dann ein.'),
  p('Wenn man den Weg zu Fuß beschreibt, sagt man: „Gehen Sie ________ bis zur ________. Dann ________ Sie rechts ________ und gehen Sie noch 200 Meter. Das Hotel liegt ________ vom Supermarkt."', { before: 120 }),
  p('In der U-Bahn oder im Bus hört man oft: „Nächste ________: Marienplatz." Wenn man dort ________ muss, um eine andere Linie zu nehmen, sollte man gut aufpassen. Beim Verlassen fährt man immer in die richtige ________, damit man nicht auf der falschen Seite herauskommt.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Wegbeschreibungs-Dialog: Lücken füllen'),
  infoBox(['Wörterkasten: Entschuldigung  |  geradeaus  |  Minuten  |  links  |  verpassen  |  Straße']),
  ...gap(1),
  p('Tourist: „________, können Sie mir helfen? Wo ist der Dom?"'),
  p('Passantin: „Ja, natürlich! Gehen Sie diese ________ geradeaus bis zum Ende."'),
  p('Tourist: „Und dann?"'),
  p('Passantin: „Dann biegen Sie ________ ab. Nach ca. fünf ________ sehen Sie den Dom schon."'),
  p('Tourist: „Kann ich den Dom ________?"'),
  p('Passantin: „Nein, er ist sehr groß — gehen Sie einfach ________, Sie können ihn nicht verfehlen!"'),
  ...gap(1),
  h2('Aufgabe 3 — Imperativ (Sie-Form) bilden'),
  p('Schreibe den Imperativ aus dem Infinitiv.'),
  grammarBox([
    'Imperativ Sie-Form: Infinitiv bleibt, + Sie, Verb auf Position 1.',
    'abbiegen (trennb.): Biegen Sie … ab!',
    'aussteigen (trennb.): Steigen Sie … aus!',
    'umsteigen (trennb.): Steigen Sie … um!',
  ]),
  ...gap(1),
  stdTable(
    ['Infinitiv + Ergänzung', 'Imperativ (Sie-Form)'],
    [
      ['(links) abbiegen', ''],
      ['(an der Haltestelle Markt) aussteigen', ''],
      ['(in die U-Bahn) einsteigen', ''],
      ['(in Richtung Bahnhof) gehen', ''],
      ['(die Linie 7) nehmen', ''],
      ['(bei Rathaus) umsteigen', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Wechselpräpositionen: Bewegung oder Position?'),
  grammarBox([
    'Wechselpräpositionen: in / an / auf / über / unter / vor / hinter / neben / zwischen',
    'BEWEGUNG (Akkusativ): Wohin? → Ich gehe in den Park. / Er fährt an den Bahnhof.',
    'POSITION (Dativ):     Wo?    → Ich stehe im Park. / Er wartet am Bahnhof.',
    'Merkhilfe: Bewegung = Akkusativ (Wohin?), Ruhe = Dativ (Wo?)',
  ]),
  ...gap(1),
  p('Ergänze den, die, das, dem, der (Dativ oder Akkusativ).'),
  p('a) Ich gehe in ________ (das) Museum. [Wohin?]'),
  p('b) Wir warten an ________ (die) Haltestelle. [Wo?]'),
  p('c) Das Hotel liegt neben ________ (der) Hauptbahnhof. [Wo?]'),
  p('d) Fahren Sie über ________ (die) Brücke. [Wohin?]'),
  p('e) Das Café ist hinter ________ (das) Theater. [Wo?]'),
  p('f) Stellen Sie das Gepäck vor ________ (der) Eingang. [Wohin?]'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Unterwegs'),
  h2('Aufgabe 1'),
  p('1. Fahrplan  2. Fahrkarte  3. geradeaus  4. Kreuzung  5. biegen  6. ab  7. gegenüber'),
  p('8. Haltestelle  9. aussteigen / umsteigen  10. Richtung'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Entschuldigung  2. Straße  3. links  4. Minuten  5. verpassen  6. geradeaus'),
  ...gap(1),
  h2('Aufgabe 3 — Imperativ'),
  stdTable(
    ['Infinitiv', 'Imperativ (Sie-Form)'],
    [
      ['(links) abbiegen', 'Biegen Sie links ab!'],
      ['(an der Haltestelle Markt) aussteigen', 'Steigen Sie an der Haltestelle Markt aus!'],
      ['(in die U-Bahn) einsteigen', 'Steigen Sie in die U-Bahn ein!'],
      ['(in Richtung Bahnhof) gehen', 'Gehen Sie in Richtung Bahnhof!'],
      ['(die Linie 7) nehmen', 'Nehmen Sie die Linie 7!'],
      ['(bei Rathaus) umsteigen', 'Steigen Sie bei Rathaus um!'],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Wechselpräpositionen'),
  p('a) in das Museum → ins Museum  (Akk. — Wohin?)'),
  p('b) an der Haltestelle  (Dat. — Wo?)'),
  p('c) neben dem Hauptbahnhof  (Dat. — Wo?)'),
  p('d) über die Brücke  (Akk. — Wohin?)'),
  p('e) hinter dem Theater  (Dat. — Wo?)'),
  p('f) vor den Eingang  (Akk. — Wohin?)'),
  grammarBox([
    'Wechselpräpositionen — Kurzform im Alltag:',
    'in das → ins  |  in dem → im  |  an dem → am  |  an das → ans',
    'zu dem → zum  |  zu der → zur  (zu immer Dativ!)',
    'Richtung / nach / gegenüber von → immer Dativ!',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Unterwegs — Wortliste'),
  h2('Teil A — Orientierung und Wegbeschreibung'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['geradeaus', 'Adverb', 'Gehen Sie geradeaus bis zur Ampel.'],
      ['abbiegen (trennb.)', 'Verb', 'Biegen Sie an der Kreuzung rechts ab.'],
      ['die Kreuzung, -en', 'Nomen', 'An der nächsten Kreuzung links abbiegen.'],
      ['die Ampel, -n', 'Nomen', 'Warten Sie bei Rot an der Ampel.'],
      ['gegenüber von + Dat.', 'Präp.', 'Die Post ist gegenüber vom Bahnhof.'],
      ['die Ecke, -n', 'Nomen', 'Das Café ist um die Ecke.'],
      ['sich verirren', 'Verb (refl.)', 'Ich habe mich in der Stadt verirrt.'],
      ['der Stadtplan, -pläne', 'Nomen', 'Ich schaue kurz auf den Stadtplan.'],
      ['die Richtung, -en', 'Nomen', 'Fahren Sie in Richtung Innenstadt.'],
      ['hinweisen auf + Akk.', 'Verb', 'Er hat mich auf den richtigen Weg hingewiesen.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Öffentlicher Nahverkehr (ÖPNV)'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['die Haltestelle, -n', 'wo man ein-/aussteigt', 'Die nächste Haltestelle ist Marienplatz.'],
      ['einsteigen / aussteigen', 'in/aus Verkehrsmittel', 'Steigen Sie bitte ein! / Aussteigen!'],
      ['umsteigen', 'Linie wechseln', 'Sie müssen bei Hauptbahnhof umsteigen.'],
      ['der Fahrplan, -pläne', 'Zeiten der Verbindungen', 'Der Fahrplan hängt an der Haltestelle.'],
      ['die Fahrkarte, -n', 'Ticket', 'Ich kaufe die Fahrkarte am Automaten.'],
      ['der Anschluss, -schlüsse', 'nächste Verbindung', 'Ich habe den Anschluss verpasst.'],
      ['die Linie, -n', 'Bus-/Bahnnummer', 'Nehmen Sie die Linie 5 bis Rathaus.'],
      ['verpassen', 'zu spät kommen', 'Ich habe den Bus verpasst — 5 Minuten zu spät!'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  mapBox([
    'ÖPNV in Deutschland — Übersicht:',
    'U-Bahn (U):          Unterirdische Stadtbahn — schnell und häufig',
    'S-Bahn (S):          Schnellbahn — Stadt und Umgebung',
    'Straßenbahn (Tram):  Oberirdisch, mitten in der Stadt',
    'Bus:                 Flexibel, auch in Randgebieten',
    'Tickets: Einzelticket / Tageskarte / Wochenkarte / Monatskarte',
    'Tipp: Die Tageskarte lohnt sich ab 3 Fahrten pro Tag!',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('geradeaus: ___________  |  abbiegen: ___________  |  die Haltestelle: ___________'),
  p('umsteigen: ___________  |  verpassen: ___________  |  die Fahrkarte: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Unterwegs'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Imperativ (Sie-Form) — trennbare Verben:',
    'einsteigen  → Steigen Sie ein!',
    'aussteigen  → Steigen Sie aus!',
    'umsteigen   → Steigen Sie um!',
    'abbiegen    → Biegen Sie ab!',
    'weitergehen → Gehen Sie weiter!',
    'anhalten    → Halten Sie an!',
    '',
    'Nicht trennbar: nehmen → Nehmen Sie! | gehen → Gehen Sie! | fahren → Fahren Sie!',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Gehen Sie geradeaus bis zur Kreuzung, biegen Sie dann rechts ab — die Haltestelle ist gleich auf der linken Seite.'),
  p('Ich habe den Bus um 18:42 Uhr verpasst — zum Glück kam der nächste schon fünf Minuten später.'),
  p('Für die Fahrt in die Innenstadt empfehle ich die U-Bahn Linie 3 — sie fährt direkt bis zum Marienplatz.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Unterwegs — Konversation'),
  h2('Aufgabe 1 — Dialog: Nach dem Weg fragen'),
  p('Person A fragt nach dem Weg, Person B beschreibt ihn. Ergänzt den Dialog.'),
  infoBox([
    'Fragen: Entschuldigung, wie komme ich zu …? / Wo ist die nächste …?',
    'Beschreiben: Gehen / Fahren / Nehmen Sie … / Biegen Sie … ab.',
    'Entfernung: Es sind nur 5 Minuten. / ca. 200 Meter geradeaus.',
    'Bestätigen: Alles klar, danke! / Ich habe es verstanden.',
    'Wiederholen: Könnten Sie das bitte wiederholen? / Etwas langsamer, bitte.',
  ]),
  ...gap(1),
  p('Person A: „Entschuldigung! Ich suche ________________________. Können Sie mir helfen?"'),
  p('Person B: „Ja, natürlich. Sie sind hier ________________________. Gehen Sie zuerst ________________________."'),
  p('Person A: „Geradeaus bis ________________________?"'),
  p('Person B: „Genau. Dann ________ Sie bei der ________ ________ ab."'),
  p('Person A: „Wie lange dauert das zu Fuß?"'),
  p('Person B: „Ungefähr ________ Minuten — oder Sie nehmen die ________ Linie ________."'),
  p('Person A: „Vielen Dank! Das war sehr hilfreich."'),
  p('Person B: „Gern geschehen! ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Stadtplan-Navigation'),
  p('[SCHEMATISCHER STADTPLAN: Eine einfache Karte mit folgenden Gebäuden: Bahnhof (unten links), Hotel (oben links), Museum (oben Mitte), Supermarkt (Mitte rechts), Apotheke (unten Mitte), Restaurant (oben rechts). Straßen verbinden alle Gebäude. Haltestellen sind markiert.]'),
  stdTable(
    ['Tourist/in (A)', 'Einheimische/r (B)'],
    [
      ['Starten Sie am Bahnhof. Fragen Sie nach dem Weg zum Museum.', 'Beschreiben Sie den Weg mit Imperativ und Himmelsrichtungen.'],
      ['Fragen Sie, ob es einen Bus gibt.', 'Erklären Sie die Buslinie und wo man einsteigt.'],
      ['Fragen Sie nach der Fahrtzeit.', 'Geben Sie eine ungefähre Zeit an.'],
      ['Bedanken Sie sich und wiederholen Sie den Weg.', 'Bestätigen Sie oder korrigieren Sie.'],
    ],
    [5703, 5703]
  ),
  mapBox([
    'Nützliche Wegbeschreibungs-Konnektoren:',
    'zuerst … dann … danach … schließlich …',
    'nach 200 Metern / nach der zweiten Kreuzung / am Ende der Straße',
    'Sie können den … nicht verfehlen — er ist sehr groß / sehr bekannt.',
    'Auf der linken / rechten Seite / geradeüber auf der anderen Straßenseite',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Unterwegs'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wie fahren Sie normalerweise zur Arbeit / zur Schule?', ''],
      ['Haben Sie sich in Deutschland schon einmal verirrt? Was ist passiert?', ''],
      ['Welches Verkehrsmittel nutzen Sie am liebsten in der Stadt?', ''],
      ['Fragen Sie gerne nach dem Weg oder nutzen Sie lieber eine App?', ''],
      ['Wie ist das öffentliche Verkehrssystem in Ihrem Heimatland?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Wie komme ich dahin?"'),
  p('Eine Person denkt an ein Ziel in der Stadt (oder in der Schule/im Gebäude) und gibt Wegbeschreibungen. Die anderen raten, wo das Ziel ist.'),
  infoBox([
    'Regeln: Nur Wegbeschreibungen — keine Namen nennen!',
    'Erlaubt: Gehen Sie geradeaus / biegen Sie links ab / das Gebäude ist groß und rot.',
    'Nicht erlaubt: „Das ist das Museum" oder Straßennamen nennen.',
    'Wer zuerst das Ziel nennt, gibt die nächste Wegbeschreibung.',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Unterwegs'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Ziel klar benannt (Wohin?)'),
  bullet('Imperativ korrekt gebildet (auch trennbare Verben: Biegen Sie ab / Steigen Sie aus)'),
  bullet('Wechselpräpositionen korrekt (in die U-Bahn / an der Haltestelle)'),
  bullet('Entfernung / Dauer angegeben'),
  bullet('Höfliche Gesprächseröffnung und -abschluss'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Entschuldigung! Ich suche das Stadtmuseum. Können Sie mir helfen?"'),
  p('B: „Ja, natürlich. Sie sind hier am Marktplatz. Gehen Sie zuerst die Hauptstraße geradeaus."'),
  p('A: „Geradeaus bis zur Ampel?" / B: „Genau. Dann biegen Sie bei der zweiten Kreuzung links ab."'),
  p('A: „Wie lange dauert das zu Fuß?" / B: „Ungefähr zehn Minuten — oder Sie nehmen die Linie 3."'),
  p('A: „Vielen Dank!" / B: „Gern geschehen! Guten Aufenthalt!"'),
  ...gap(1),
  h2('Aufgabe 2 — Typische Wegbeschreibung (Stadtplan)'),
  p('Bahnhof → Museum: Verlassen Sie den Bahnhof und nehmen Sie die erste Straße links. Gehen Sie geradeaus bis zur großen Kreuzung. Biegen Sie dort rechts ab. Das Museum ist auf der linken Seite, ca. 300 Meter weiter.'),
  p('Mit Bus: Nehmen Sie die Linie 8 Richtung Stadtmitte, Haltestelle Museumsinsel (3 Stationen).'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Imperativ korrekt gebildet, Wechselpräpositionen (Akk./Dat.), Konnektoren für Reihenfolge (zuerst / dann / danach).', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Unterwegs — Bildaufgaben'),
  h2('Aufgabe 1 — Straßenschilder und Symbole'),
  p('[BILD 1: Sechs Verkehrssymbole / Schilder: (1) U-Bahn-Symbol (U im Kreis), (2) Bushaltestellenschild, (3) Pfeil geradeaus, (4) Pfeil links, (5) Fußgängerzone-Schild, (6) Fahrkartenautomat-Symbol]'),
  p('a) Was bedeutet jedes Symbol? Schreibe den Namen darunter.'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welches Symbol ist am wichtigsten für Sie als Neuankömmlinge in einer Stadt? Warum?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Fahrplan lesen'),
  p('[BILD 2: Auszug eines Busfahrplans, Linie 14 Richtung Hauptbahnhof: Haltestelle Goethestraße: 08:15 / 08:45 / 09:15 / 09:45. Haltestelle Rathaus: 08:22 / 08:52 / 09:22 / 09:52. Haltestelle Marktplatz: 08:27 / 08:57 / 09:27 / 09:57. Haltestelle Hauptbahnhof: 08:35 / 09:05 / 09:35 / 10:05. Hinweis: kein Service Sonntag 0–6 Uhr.]'),
  p('a) Wie lange dauert die Fahrt von der Goethestraße bis zum Hauptbahnhof?'),
  wLine(),
  p('b) Sie stehen um 08:50 Uhr an der Haltestelle Rathaus. Wann kommt der nächste Bus?', { before: 120 }),
  wLine(),
  p('c) Wie oft fährt der Bus pro Stunde?', { before: 120 }),
  wLine(),
  p('d) Sie müssen um 9:30 Uhr am Hauptbahnhof sein. Welchen Bus nehmen Sie von der Goethestraße?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Wegbeschreibung anhand eines Stadtplans'),
  p('[BILD 3: Einfacher Stadtplan mit: Hauptbahnhof (unten links), Hotel Zentral (oben links), Stadtmuseum (oben rechts), Marktplatz (Mitte), Apotheke (unten rechts). Straßen verbinden alle Punkte; Pfeile markieren Einbahnstraßen.]'),
  p('a) Beschreibe den Weg vom Hauptbahnhof zum Stadtmuseum in 3–4 Sätzen (Imperativ).'),
  wLine(), wLine(), wLine(), wLine(),
  p('b) Dein Freund steht am Marktplatz und sucht die Apotheke. Schreibe eine kurze Nachricht mit dem Weg (2–3 Sätze).', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Fahrkartenautomat'),
  p('[BILD 4: Bildschirm eines Fahrkartenautomaten mit Optionen: Einzelticket 2,90 EUR / Tageskarte 7,80 EUR / 4er-Karte 10,40 EUR / Monatskarte 68,00 EUR. Auswahl: Zone A / Zone A+B / Gesamtnetz. Zahlungsarten: Münzen / EC-Karte / Kreditkarte.]'),
  p('a) Welches Ticket kaufen Sie, wenn Sie heute dreimal fahren möchten?'),
  wLine(),
  p('b) Was kostet eine Fahrt mit der 4er-Karte im Vergleich zum Einzelticket?', { before: 120 }),
  wLine(),
  p('c) Sie brauchen den Bus jeden Tag für einen Monat. Was ist günstiger — täglich Einzeltickets oder die Monatskarte?', { before: 120 }),
  wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Unterwegs'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Verkehrssymbole'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['die U-Bahn', 'die Bushaltestelle', 'geradeaus', 'links', 'Fußgängerzone', 'Fahrkartenautomat']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten — z.B.: Das Bushaltestellenschild, weil ich damit weiß, wo ich warten muss.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Fahrplan'),
  p('a) Von 08:15 bis 08:35 = 20 Minuten.'),
  p('b) Der nächste Bus kommt um 08:52 Uhr.'),
  p('c) Zweimal pro Stunde (alle 30 Minuten).'),
  p('d) Den Bus um 09:15 Uhr ab Goethestraße (Ankunft Hauptbahnhof 09:35 Uhr).'),
  ...gap(1),
  h2('Aufgabe 3 — Stadtplan'),
  p('a) Verlassen Sie den Hauptbahnhof und gehen Sie die Hauptstraße geradeaus. An der Kreuzung biegen Sie rechts ab. Gehen Sie dann geradeaus bis zum Ende der Straße. Das Stadtmuseum liegt auf der linken Seite.'),
  p('b) Hey, geh vom Marktplatz geradeaus in Richtung Bahnhof. Biege dann rechts ab. Die Apotheke ist gleich auf der rechten Seite.'),
  ...gap(1),
  h2('Aufgabe 4 — Fahrkartenautomat'),
  p('a) Die Tageskarte (7,80 EUR) — sie ist günstiger als drei Einzeltickets (3 × 2,90 = 8,70 EUR).'),
  p('b) 4er-Karte: 10,40 ÷ 4 = 2,60 EUR pro Fahrt. Einzelticket: 2,90 EUR. Ersparnis: 0,30 EUR pro Fahrt.'),
  p('c) Täglich Einzeltickets: 2,90 × 30 = 87,00 EUR. Monatskarte: 68,00 EUR. Die Monatskarte spart 19 EUR.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
