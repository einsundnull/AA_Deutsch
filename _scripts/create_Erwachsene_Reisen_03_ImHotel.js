// A2_Erwachsene — Thema 07 UP 03: Im Hotel
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Im Hotel';
const HEADING = 'Thema 07 — Reisen';
const SUBHEAD = 'UP 03: Im Hotel';
const PREFIX  = 'A2_Erwachsene_Reisen_03_ImHotel';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '07_Reisen', '03_ImHotel');
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
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const hotelBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '4A148C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '4A148C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '4A148C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '4A148C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'F3E5F5' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Im Hotel — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke im Hotel:',
    'Einchecken: Ich habe eine Reservierung auf den Namen … / Ich möchte einchecken.',
    'Zimmer: Ich hätte gerne ein Einzelzimmer / Doppelzimmer mit Dusche / Balkon / Meerblick.',
    'Probleme melden: Das Zimmer ist zu laut / nicht sauber / die Heizung funktioniert nicht.',
    'Bitten: Könnten Sie mir bitte … / Ich brauche noch … / Hätten Sie vielleicht …?',
    'Auschecken: Ich möchte auschecken. / Können Sie mir die Rechnung geben?',
    'Konjunktiv II für höfliche Bitten: Ich hätte gerne … / Könnten Sie …?',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Einchecken: Lücken ergänzen'),
  p('Schreibe, was Sie an der Rezeption sagen würden. Benutze Konjunktiv II.'),
  p('a) Sie möchten einchecken und haben eine Reservierung:'),
  wLine(), wLine(),
  p('b) Sie möchten ein ruhiges Zimmer im oberen Stockwerk:', { before: 120 }),
  wLine(),
  p('c) Sie fragen, ob Frühstück inbegriffen ist:', { before: 120 }),
  wLine(),
  p('d) Sie möchten wissen, wo das Restaurant und der Parkplatz sind:', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Beschwerde-E-Mail schreiben'),
  p('Sie haben in einem Hotel übernachtet und hatten ein Problem (z. B. lautes Zimmer, schmutziges Bad, kaputte Klimaanlage). Schreiben Sie eine E-Mail (5–6 Sätze) an das Hotel. Schildern Sie das Problem, erklären Sie die Auswirkung und bitten Sie um eine Lösung oder Entschädigung.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Konjunktiv II für höfliche Bitten'),
  grammarBox([
    'Konjunktiv II — häufige Formen im Hotel:',
    'haben → ich hätte, Sie hätten: Ich hätte gerne ein ruhiges Zimmer.',
    'sein  → ich wäre, es wäre:     Es wäre schön, wenn das Zimmer größer wäre.',
    'können → ich könnte, könnten Sie: Könnten Sie mir bitte ein Handtuch bringen?',
    'werden → würde:  Würden Sie bitte die Rechnung nochmals prüfen?',
    'Merke: Konjunktiv II = höflicher als Präsens!',
  ]),
  ...gap(1),
  p('Forme die Bitte höflicher um (Konjunktiv II).'),
  p('a) „Ich will ein Zimmer." → „Ich ________ gerne ein Zimmer."'),
  p('b) „Bringen Sie mir ein Handtuch!" → „________ Sie mir bitte ein Handtuch ________?"'),
  p('c) „Ich brauche eine Quittung." → „________ ich bitte eine Quittung ________?"'),
  p('d) „Machen Sie das Zimmer sauber!" → „________ Sie das Zimmer bitte ________?"'),
  ...gap(1),
  h2('Aufgabe 4 — Hotelbewertung schreiben'),
  p('Sie haben gerade einen Hotelaufenthalt beendet. Schreiben Sie eine kurze Bewertung für eine Buchungsseite (5–6 Sätze). Beschreiben Sie: Lage, Zimmer, Personal, Frühstück — was war gut, was könnte besser sein?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Im Hotel'),
  grammarBox([
    'Konjunktiv II — Übersicht der wichtigsten Formen:',
    'können:  ich könnte / Sie könnten  →  Könnten Sie mir helfen?',
    'haben:   ich hätte / Sie hätten   →  Ich hätte gerne ein Zimmer.',
    'sein:    ich wäre / es wäre       →  Das wäre sehr nett.',
    'werden:  ich würde / würden Sie   →  Würden Sie die Rechnung prüfen?',
    'müssen:  ich müsste               →  Ich müsste eigentlich früh aufstehen.',
    'dürfen:  ich dürfte               →  Dürfte ich bitte das WLAN-Passwort haben?',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antworten'),
  p('a) Guten Tag, ich habe eine Reservierung auf den Namen Müller — ich möchte einchecken.'),
  p('b) Ich hätte gerne ein ruhiges Zimmer, wenn möglich im oberen Stockwerk.'),
  p('c) Könnten Sie mir sagen, ob das Frühstück im Preis inbegriffen ist?'),
  p('d) Entschuldigung, wo befindet sich das Restaurant? Und gibt es einen Parkplatz?'),
  ...gap(1),
  h2('Aufgabe 2 — Bewertungskriterien Beschwerde-E-Mail'),
  bullet('Formelle Anrede: Sehr geehrte Damen und Herren,'),
  bullet('Problem klar und sachlich beschrieben (Was, wann, Zimmernummer)'),
  bullet('Auswirkung: Ich konnte nicht schlafen / Das war sehr unangenehm.'),
  bullet('Höfliche Bitte um Lösung: Ich würde mich über eine Entschädigung freuen.'),
  bullet('Konjunktiv II für Bitten: Könnten Sie … / Ich hätte erwartet, dass …'),
  bullet('Formeller Abschluss: Mit freundlichen Grüßen'),
  ...gap(1),
  h2('Aufgabe 3 — Konjunktiv II'),
  p('a) Ich hätte gerne ein Zimmer.'),
  p('b) Könnten Sie mir bitte ein Handtuch bringen?'),
  p('c) Dürfte / Könnte ich bitte eine Quittung haben?'),
  p('d) Würden Sie das Zimmer bitte reinigen?'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien'),
  bullet('Lage: zentral / ruhig / nah am Bahnhof …'),
  bullet('Zimmer: sauber / geräumig / zu klein / gut ausgestattet'),
  bullet('Personal: freundlich / hilfsbereit / kompetent'),
  bullet('Frühstück: reichhaltig / frisch / teuer / enttäuschend'),
  bullet('Gesamturteil: Ich würde das Hotel (nicht) empfehlen, weil …'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Im Hotel — Leseübung'),
  h2('Text: Nataschkas Hotelprobleme in Dresden'),
  p('Natascha Petrova kommt aus Russland und lebt seit zwei Jahren in Leipzig. Sie arbeitet als Buchhalterin und war letzten Monat auf einer Fortbildung in Dresden — drei Tage, alles bezahlt von ihrer Firma. Das Hotel hatte ihr Arbeitgeber gebucht: das „Hotel am Zwinger", ein Dreisternehotel direkt neben dem berühmten Zwinger-Museum.'),
  p('Beim Einchecken lief zunächst alles glatt. Die Rezeptionistin, eine freundliche junge Frau namens Frau Kellner, hat ihr erklärt: Check-in ab 14 Uhr, Frühstück von 6:30 bis 10:00 Uhr, WLAN-Passwort auf dem Kärtchen im Zimmer. „Das Zimmer befindet sich im dritten Stock, Zimmer 312", hat sie gesagt und Natascha den Schlüssel gegeben.'),
  p('Das Zimmer selbst war ordentlich, aber kleiner als erwartet. Das größte Problem war der Lärm: Das Zimmer lag direkt an der Hauptstraße, und der Verkehr hat die ganze Nacht nicht aufgehört. Um 23 Uhr hat Natascha die Rezeption angerufen und höflich gefragt, ob sie ein ruhigeres Zimmer bekommen könnte. „Leider ist das Hotel ausgebucht", hat die Nachtrezeptionistin gesagt. „Aber ich kann Ihnen Ohrstöpsel bringen."'),
  p('Am nächsten Morgen hat Natascha beim Frühstück die Teamleiterin ihrer Fortbildung getroffen, Frau Dr. Hagen. „Wie ist Ihr Zimmer?", hat sie gefragt. „Etwas laut", hat Natascha ehrlich geantwortet. Frau Dr. Hagen hat sofort mit dem Hotelmanager gesprochen. Dieser hat sich entschuldigt und Natascha für die letzte Nacht in ein ruhigeres Zimmer im Innenhof verlegt — kostenlos.'),
  p('Nach dem Aufenthalt hat Natascha eine Online-Bewertung geschrieben: vier von fünf Sternen. „Lage und Frühstück waren ausgezeichnet. Das Personal war hilfsbereit, auch wenn es am ersten Abend ein Problem gab. Ich würde das Hotel wieder buchen — aber beim nächsten Mal ein Zimmer zur Hofseite wählen!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Natascha hat das Hotel selbst gebucht.', ''],
      ['Das Hotel liegt in der Nähe des Zwinger-Museums.', ''],
      ['Das Frühstück beginnt um 7:00 Uhr.', ''],
      ['Das Zimmer war zu laut wegen des Straßenlärms.', ''],
      ['Die Nachtrezeptionistin hat Natascha ein neues Zimmer gegeben.', ''],
      ['Frau Dr. Hagen hat dem Hotelmanager von dem Problem erzählt.', ''],
      ['Natascha hat dem Hotel drei von fünf Sternen gegeben.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Was hat die Rezeptionistin beim Einchecken erklärt?'),
  wLine(), wLine(),
  p('b) Warum konnte Natascha nicht schlafen?', { before: 120 }),
  wLine(),
  p('c) Wie wurde das Problem am Ende gelöst?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was empfiehlt Natascha in ihrer Bewertung für zukünftige Gäste?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Hotelinfos aus dem Text'),
  stdTable(
    ['Frage', 'Antwort aus dem Text'],
    [
      ['Name des Hotels', ''],
      ['Stockwerk und Zimmernummer', ''],
      ['Frühstückszeiten', ''],
      ['Problem am ersten Abend', ''],
      ['Lösung durch den Manager', ''],
      ['Gesamtbewertung (Sterne)', ''],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Im Hotel'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Natascha hat das Hotel selbst gebucht.', 'F (Arbeitgeber hat gebucht)'],
      ['Das Hotel liegt in der Nähe des Zwinger-Museums.', 'R'],
      ['Das Frühstück beginnt um 7:00 Uhr.', 'F (ab 6:30 Uhr)'],
      ['Das Zimmer war zu laut wegen des Straßenlärms.', 'R'],
      ['Die Nachtrezeptionistin hat Natascha ein neues Zimmer gegeben.', 'F (Hotel ausgebucht, nur Ohrstöpsel)'],
      ['Frau Dr. Hagen hat dem Hotelmanager von dem Problem erzählt.', 'R'],
      ['Natascha hat dem Hotel drei von fünf Sternen gegeben.', 'F (vier von fünf)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Check-in ab 14 Uhr, Frühstück 6:30–10:00 Uhr, WLAN-Passwort auf dem Kärtchen im Zimmer.'),
  p('b) Das Zimmer lag an der Hauptstraße — der Straßenverkehr war die ganze Nacht laut.'),
  p('c) Frau Dr. Hagen sprach mit dem Manager, der Natascha kostenlos in ein ruhiges Zimmer zum Innenhof verlegte.'),
  p('d) Beim nächsten Mal ein Zimmer zur Hofseite wählen, nicht zur Straße.'),
  ...gap(1),
  h2('Aufgabe 3 — Hotelinfos'),
  stdTable(
    ['Frage', 'Antwort'],
    [
      ['Name des Hotels', 'Hotel am Zwinger'],
      ['Stockwerk und Zimmernummer', '3. Stock, Zimmer 312'],
      ['Frühstückszeiten', '6:30 bis 10:00 Uhr'],
      ['Problem am ersten Abend', 'Zimmer zu laut (Hauptstraße), Hotel ausgebucht'],
      ['Lösung durch den Manager', 'Kostenloses Umzug in Zimmer zum Innenhof'],
      ['Gesamtbewertung (Sterne)', '4 von 5 Sternen'],
    ],
    [4500, 7206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Im Hotel — Lückentext'),
  infoBox([
    'Wörterkasten: Rezeption  |  Schlüssel  |  einchecken  |  Rechnung  |  Stockwerk',
    '              Frühstück  |  ausgebucht  |  Zimmerservice  |  auschecken  |  Beschwerde'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Hoteltext: Fülle die Lücken aus'),
  p('Wenn man in einem Hotel ankommt, geht man zuerst zur ________ und meldet sich an — das nennt man ________. Die Mitarbeiterin gibt einem den ________ für das Zimmer und erklärt, wo alles ist. Das Zimmer befindet sich meistens in einem bestimmten ________ — man fährt mit dem Aufzug oder nimmt die Treppe.'),
  p('Am Morgen kann man das ________ im Restaurant genießen — meistens ist es inklusive. Wenn man etwas ins Zimmer bestellt, nennt man das ________. Wenn es ein Problem gibt, zum Beispiel ein kaputtes Fenster oder laute Nachbarn, meldet man eine ________ an der Rezeption.', { before: 120 }),
  p('Wenn alle Zimmer belegt sind, ist das Hotel ________. Bevor man abreist, muss man ________ und die ________ bezahlen. Manchmal gibt es eine Minibar im Zimmer — das wird automatisch auf die Rechnung gesetzt.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — An der Rezeption: Dialog ergänzen'),
  infoBox(['Wörterkasten: Reservierung  |  inbegriffen  |  Stockwerk  |  Parkplatz  |  auschecken  |  ruhig']),
  ...gap(1),
  p('Gast: „Guten Abend. Ich habe eine ________ auf den Namen Schneider."'),
  p('Rezeptionistin: „Ja, ein Doppelzimmer für zwei Nächte. Möchten Sie ein ________ Zimmer?"'),
  p('Gast: „Ja, bitte — und wenn möglich in einem höheren ________."'),
  p('Rezeptionistin: „Ich gebe Ihnen Zimmer 407 im vierten Stock. Ist das Frühstück ________?"'),
  p('Gast: „Ja, das wäre schön. Gibt es auch einen ________?"'),
  p('Rezeptionistin: „Ja, direkt hinter dem Hotel — kostenlos für unsere Gäste. Wann möchten Sie morgen ________?"'),
  p('Gast: „Gegen 11 Uhr, wenn das möglich ist."'),
  ...gap(1),
  h2('Aufgabe 3 — Konjunktiv II: höfliche Bitten formulieren'),
  p('Forme die direkte Bitte in eine höfliche Bitte mit Konjunktiv II um.'),
  grammarBox([
    'Konjunktiv II für Bitten — Muster:',
    'Ich will ein Handtuch. → Ich hätte gerne ein Handtuch.',
    'Geben Sie mir die Rechnung! → Könnten Sie mir die Rechnung geben?',
    'Ich brauche ein Taxi. → Würden Sie mir bitte ein Taxi rufen?',
  ]),
  ...gap(1),
  stdTable(
    ['Direkte Aussage / Bitte', 'Höfliche Form (Konjunktiv II)'],
    [
      ['Ich will ein ruhiges Zimmer.', ''],
      ['Machen Sie das Bett!', ''],
      ['Ich brauche mehr Handtücher.', ''],
      ['Wecken Sie mich um 7 Uhr!', ''],
      ['Rufen Sie mir ein Taxi!', ''],
      ['Ich will früh auschecken.', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Genitiv: Hotelinfos beschreiben'),
  grammarBox([
    'Genitiv — Zugehörigkeit ausdrücken:',
    'mask./neutr.: des Hotels / des Restaurants / des Zimmers',
    'feminin:      der Rezeption / der Frühstückszeit / der Reservierung',
    'Plural:       der Gäste / der Zimmer / der Stockwerke',
    'Beispiel: Das Frühstück des Hotels ist sehr reichhaltig.',
  ]),
  ...gap(1),
  p('Forme die Wortgruppe mit Genitiv um.'),
  p('a) der Schlüssel → das Zimmer: ________ (der Schlüssel des Zimmers)'),
  p('b) die Öffnungszeiten → das Restaurant: ________'),
  p('c) der Name → der Gast: ________'),
  p('d) die Lage → das Hotel: ________'),
  p('e) die Nummer → das Stockwerk: ________'),
  p('f) die Qualität → das Frühstück: ________'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Im Hotel'),
  h2('Aufgabe 1'),
  p('1. Rezeption  2. einchecken  3. Schlüssel  4. Stockwerk  5. Frühstück'),
  p('6. Zimmerservice  7. Beschwerde  8. ausgebucht  9. auschecken  10. Rechnung'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Reservierung  2. ruhig  3. Stockwerk  4. inbegriffen  5. Parkplatz  6. auschecken'),
  ...gap(1),
  h2('Aufgabe 3 — Konjunktiv II'),
  stdTable(
    ['Direkte Bitte', 'Höfliche Form'],
    [
      ['Ich will ein ruhiges Zimmer.', 'Ich hätte gerne ein ruhiges Zimmer.'],
      ['Machen Sie das Bett!', 'Könnten Sie bitte das Bett machen?'],
      ['Ich brauche mehr Handtücher.', 'Ich hätte gerne noch ein paar Handtücher.'],
      ['Wecken Sie mich um 7 Uhr!', 'Könnten Sie mich bitte um 7 Uhr wecken?'],
      ['Rufen Sie mir ein Taxi!', 'Würden Sie mir bitte ein Taxi rufen?'],
      ['Ich will früh auschecken.', 'Ich würde gerne früh auschecken.'],
    ],
    [5500, 6206]
  ),
  p('Hinweis: Mehrere korrekte Konjunktiv-II-Formen akzeptieren (hätte/könnte/würde).', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Genitiv'),
  p('a) der Schlüssel des Zimmers'),
  p('b) die Öffnungszeiten des Restaurants'),
  p('c) der Name des Gastes'),
  p('d) die Lage des Hotels'),
  p('e) die Nummer des Stockwerks'),
  p('f) die Qualität des Frühstücks'),
  grammarBox([
    'Genitiv — Endungen kurz gefasst:',
    'mask./neutr. Nomen: +s oder +es (bei Endung auf s/sch/z/x: +es)',
    '  des Hotels / des Restaurants / des Zimmers / des Gastes',
    'feminin/Plural: keine Endung am Nomen',
    '  der Rezeption / der Gäste / der Zimmer',
    'Adjektive im Genitiv: -en (nach Artikel)',
    '  wegen des schlechten Wetters / trotz des langen Tages',
  ]),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Im Hotel — Wortliste'),
  h2('Teil A — Hotelaufenthalt'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['einchecken (trennb.)', 'Verb', 'Ich checke um 15 Uhr ein.'],
      ['auschecken (trennb.)', 'Verb', 'Bitte checkout bis 11 Uhr.'],
      ['die Rezeption, -en', 'Nomen', 'Fragen Sie bitte an der Rezeption.'],
      ['das Stockwerk, -e', 'Nomen', 'Unser Zimmer liegt im dritten Stockwerk.'],
      ['die Reservierung, -en', 'Nomen', 'Ich habe eine Reservierung für zwei Nächte.'],
      ['der Zimmerservice', 'Nomen', 'Wir bestellen Frühstück per Zimmerservice.'],
      ['ausgebucht', 'Adj.', 'Das Hotel ist leider ausgebucht.'],
      ['die Beschwerde, -n', 'Nomen', 'Ich möchte eine Beschwerde einreichen.'],
      ['die Rechnung, -en', 'Nomen', 'Kann ich bitte die Rechnung haben?'],
      ['das Doppelzimmer / Einzelzimmer', 'Nomen', 'Ich hätte gerne ein Einzelzimmer mit Dusche.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Zimmerausstattung und Services'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['die Minibar, -s', 'Kühlschrank mit Getränken', 'Die Minibar ist kostenpflichtig.'],
      ['inklusive / inbegriffen', 'im Preis enthalten', 'Das Frühstück ist inklusive.'],
      ['der Weckruf, -e', 'Telefonanruf zum Aufwachen', 'Können Sie mir einen Weckruf um 7 Uhr geben?'],
      ['die Klimaanlage, -n', 'Gerät für Raumtemperatur', 'Die Klimaanlage funktioniert nicht.'],
      ['der Aufzug, -züge', 'Fahrstuhl', 'Der Aufzug ist links neben der Rezeption.'],
      ['die Quittung, -en', 'Zahlungsbeleg', 'Ich brauche eine Quittung für meine Firma.'],
      ['verlegen (Zimmer)', 'in anderes Zimmer umziehen', 'Der Manager hat mich in ein besseres Zimmer verlegt.'],
      ['die Übernachtung, -en', 'eine Nacht im Hotel', 'Wir buchen drei Übernachtungen.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  hotelBox([
    'Typischer Ablauf eines Hotelaufenthalts:',
    '1. Ankunft: Einchecken an der Rezeption, Schlüssel erhalten',
    '2. Zimmer beziehen: Gepäck abstellen, Zimmer prüfen',
    '3. Bei Problemen: sofort an der Rezeption melden — nicht warten!',
    '4. Frühstück: Zeiten beachten, meist 6:30–10:00 Uhr',
    '5. Abreise: Rechnung prüfen, Schlüssel abgeben, auschecken',
    'Tipp: Minibar-Verbrauch und Zimmerservice werden automatisch berechnet!',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('einchecken: ___________  |  die Rezeption: ___________  |  ausgebucht: ___________'),
  p('die Beschwerde: ___________  |  inklusive: ___________  |  der Aufzug: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Im Hotel'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Hotel-Verben — Perfekt:',
    'einchecken  → hat eingecheckt',
    'auschecken  → hat ausgecheckt',
    'verlegen    → hat verlegt',
    'beschweren  → hat sich beschwert',
    'reservieren → hat reserviert',
    'buchen      → hat gebucht',
    'übernachten → hat übernachtet',
    'anrufen     → hat angerufen (trennb.)',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich habe mich an der Rezeption beschwert, weil die Klimaanlage nicht funktioniert hat.'),
  p('Der Manager hat sich entschuldigt und mich kostenlos in ein ruhigeres Zimmer verlegt.'),
  p('Das Frühstück war inklusive — wir haben jeden Morgen um 7 Uhr gegessen.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Im Hotel — Konversation'),
  h2('Aufgabe 1 — Dialog: Einchecken'),
  p('Ein Gast checkt im Hotel ein. Ergänzt den Dialog.'),
  infoBox([
    'Einchecken: Guten Abend, ich habe eine Reservierung auf den Namen …',
    'Fragen stellen: Könnten Sie mir sagen, wo … ist? / Ist … inklusive?',
    'Bitten: Ich hätte gerne ein Zimmer mit … / Wäre es möglich, …?',
    'Bestätigen: Ja, selbstverständlich. / Natürlich, kein Problem.',
  ]),
  ...gap(1),
  p('Gast: „Guten Abend. Ich habe eine Reservierung auf den Namen ________________________."'),
  p('Rezeptionistin: „Willkommen! Ja, ein ________ für ________ Nächte. Darf ich kurz Ihren Ausweis sehen?"'),
  p('Gast: „Natürlich, hier bitte. Könnten Sie mir ein ________ Zimmer geben?"'),
  p('Rezeptionistin: „Selbstverständlich. Zimmer ________ im ________ Stock ist sehr ruhig. Hier ist Ihr Schlüssel."'),
  p('Gast: „Danke. Ist das Frühstück ________?"'),
  p('Rezeptionistin: „Ja, von ________ bis ________ Uhr im Restaurant im Erdgeschoss. Benötigen Sie noch etwas?"'),
  p('Gast: „________ Sie mir bitte sagen, wo der Aufzug ist?"'),
  p('Rezeptionistin: „Natürlich — geradeaus und dann ________. Einen angenehmen Aufenthalt!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Problem im Hotel'),
  stdTable(
    ['Gast (A)', 'Rezeption / Manager (B)'],
    [
      ['Melden Sie ein Problem (Lärm / Heizung / schmutziges Bad).', 'Reagieren Sie verständnisvoll und fragen nach Details.'],
      ['Beschreiben Sie das Problem genauer (seit wann, wie schlimm).', 'Erklären Sie, was Sie tun können (Zimmer / Entschädigung / Techniker).'],
      ['Fragen Sie, ob es eine Lösung gibt.', 'Machen Sie einen konkreten Vorschlag.'],
      ['Akzeptieren Sie die Lösung oder verhandeln Sie weiter.', 'Bestätigen Sie die vereinbarte Lösung.'],
    ],
    [5703, 5703]
  ),
  hotelBox([
    'Mögliche Probleme im Hotel:',
    'Das Zimmer ist zu laut. / Die Heizung funktioniert nicht.',
    'Das Bad ist nicht sauber. / Die Klimaanlage ist kaputt.',
    'Es gibt kein heißes Wasser. / Das WLAN funktioniert nicht.',
    'Mögliche Lösungen: anderes Zimmer / Techniker schicken / Preisnachlass / Entschuldigung',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Hotelaufenthalte'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wohnen Sie auf Reisen lieber im Hotel, in einer Pension oder in einer Ferienwohnung?', ''],
      ['Hatten Sie schon einmal ein Problem in einem Hotel? Was ist passiert?', ''],
      ['Was ist Ihnen bei einem Hotel am wichtigsten? (Lage, Preis, Frühstück …)', ''],
      ['Haben Sie schon einmal eine Hotelbewertung geschrieben?', ''],
      ['Was wäre Ihr ideales Hotel — beschreiben Sie es kurz.', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Was würden Sie tun?"'),
  p('Eine Person beschreibt eine Hotelsituation — die anderen sagen, was sie tun würden. Benutze Konjunktiv II.'),
  infoBox([
    'Beispiel-Situationen:',
    '1. Ihr Zimmer ist schmutzig, aber das Hotel ist ausgebucht.',
    '2. Die Rechnung ist höher als erwartet — Sie wurden falsch berechnet.',
    '3. Ihr Nachbar im Hotel macht bis 2 Uhr nachts Lärm.',
    '4. Der Aufzug ist kaputt und Ihr Zimmer liegt im 5. Stock.',
    '5. Das Frühstücksbuffet war leer, als Sie um 9:45 Uhr ankamen.',
    'Antwortform: Ich würde … / Ich hätte … / Ich könnte …',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Im Hotel'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Konjunktiv II für höfliche Bitten (hätte / könnten / würden)'),
  bullet('Zimmerwunsch klar formuliert (ruhig / oberes Stockwerk / mit Frühstück)'),
  bullet('Frühstückszeiten erfragen'),
  bullet('Höfliche Gesprächseröffnung und -abschluss'),
  bullet('Natürlicher, formeller Ton (Sie-Form durchgehend)'),
  ...gap(1),
  h2('Muster-Einchecken-Dialog'),
  p('G: „Guten Abend. Ich habe eine Reservierung auf den Namen Richter."'),
  p('R: „Willkommen! Ja, ein Doppelzimmer für zwei Nächte. Darf ich kurz Ihren Ausweis sehen?"'),
  p('G: „Natürlich. Könnten Sie mir ein ruhiges Zimmer geben, wenn möglich?"'),
  p('R: „Zimmer 405 im vierten Stock ist sehr ruhig. Hier ist Ihr Schlüssel."'),
  p('G: „Danke. Ist das Frühstück inklusive?" / R: „Ja, von 7:00 bis 10:00 Uhr."'),
  p('G: „Könnten Sie mir bitte sagen, wo der Aufzug ist?" / R: „Geradeaus und dann links."'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Problemgespräch'),
  p('G: „Guten Abend. Ich möchte ein Problem melden — mein Zimmer ist sehr laut."'),
  p('R: „Das tut mir leid. Seit wann haben Sie das Problem?" / G: „Seit heute Nacht."'),
  p('R: „Ich könnte Sie in ein ruhigeres Zimmer verlegen — Zimmer 312 im Innenhof."'),
  p('G: „Das wäre wunderbar, vielen Dank." / R: „Ich entschuldige mich nochmals für die Unannehmlichkeiten."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Konjunktiv II korrekt (hätte/könnte/würde), höflicher Ton, Genitiv beim Beschreiben (das Problem des Zimmers / die Qualität des Hotels).', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Im Hotel — Bildaufgaben'),
  h2('Aufgabe 1 — Hotelräume benennen'),
  p('[BILD 1: Sechs Fotos aus einem Hotel: (1) Empfangsbereich mit Rezeptionstheke, (2) modernes Hotelzimmer mit Doppelbett, (3) Frühstücksbuffet mit vielen Speisen, (4) Hotelpool / Wellnessbereich, (5) Hotelbar mit Barkeeper, (6) Konferenzraum mit Tischen und Stühlen]'),
  p('a) Schreibe den Namen des Bereichs unter jedes Bild.'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welcher Bereich ist Ihrer Meinung nach am wichtigsten in einem Hotel? Warum? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Hotelrechnung lesen'),
  p('[BILD 2: Hotelrechnung — Hotel Zum Goldenen Stern, Gast: Herr A. Bauer, Zimmer 215, Anreise 10.05. / Abreise 13.05. (3 Nächte). Posten: Zimmer 3 × 79,00 € = 237,00 €. Frühstück 3 × 12,50 € = 37,50 €. Minibar: 8,90 €. Telefon: 2,30 €. Parkplatz 2 × 8,00 € = 16,00 €. Gesamtbetrag: 301,70 €. MwSt. 7 % inklusive.]'),
  p('a) Wie viele Nächte hat Herr Bauer im Hotel gewohnt?'),
  wLine(),
  p('b) Was kostet ein Zimmer pro Nacht?', { before: 120 }),
  wLine(),
  p('c) Welche Posten hätte Herr Bauer vermeiden können, um Geld zu sparen?', { before: 120 }),
  wLine(),
  p('d) Herr Bauer glaubt, er hat nur 2 Tage geparkt, aber 3 werden berechnet. Was würde er sagen? Schreibe 1 Satz im Konjunktiv II.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Hotelbewertung lesen'),
  p('[BILD 3: Online-Bewertung auf einer Buchungsseite: Benutzername: reisende_sofia — Bewertung: 3/5 Sterne — Titel: „Gute Lage, aber Mängel" — Text: „Das Hotel liegt sehr zentral, 5 Minuten vom Bahnhof. Das Personal war freundlich und hat uns schnell eingecheckt. Leider war unser Zimmer im ersten Stock sehr laut — direkt an der Straße. Außerdem war die Klimaanlage defekt. Wir haben das gemeldet, aber der Techniker ist erst nach 2 Stunden gekommen. Das Frühstück war gut und reichhaltig. Fazit: Okay für eine Nacht, aber beim nächsten Mal lieber ein ruhigeres Zimmer buchen."]'),
  p('a) Was hat Sofia positiv erwähnt? Nenne zwei Punkte.'),
  wLine(),
  p('b) Was hat Sofia negativ erwähnt? Nenne zwei Punkte.', { before: 120 }),
  wLine(),
  p('c) Warum hat Sofia 3 und nicht 1 oder 5 Sterne gegeben? Erkläre in einem Satz.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Zimmerbuchungs-Formular'),
  p('[BILD 4: Online-Buchungsformular: Felder: Anreisedatum / Abreisedatum / Anzahl Personen / Zimmertyp (Einzel / Doppel / Suite) / Extras (Frühstück / Parkplatz / Haustier erlaubt) / Zahlungsart (Kreditkarte / Überweisung / vor Ort). Schaltfläche: „Jetzt buchen — kostenlos stornierbar bis 48h vorher".]'),
  p('a) Fülle das Formular für einen fiktiven Aufenthalt aus (2 Personen, 2 Nächte, mit Frühstück).'),
  stdTable(
    ['Feld', 'Ihre Angabe'],
    [
      ['Anreisedatum', ''],
      ['Abreisedatum', ''],
      ['Anzahl Personen', ''],
      ['Zimmertyp', ''],
      ['Extras', ''],
      ['Zahlungsart', ''],
    ],
    [4000, 7706]
  ),
  p('b) Schreibe einen Satz: Bis wann können Sie die Buchung kostenlos stornieren?', { before: 120 }),
  wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Im Hotel'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Hotelräume'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5', 'Bild 6'],
    [['die Rezeption', 'das Hotelzimmer', 'das Frühstücksbuffet', 'der Pool / Wellness', 'die Bar', 'der Konferenzraum']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Die Rezeption ist am wichtigsten, weil man dort alle Informationen bekommt.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Hotelrechnung'),
  p('a) 3 Nächte (10.05. bis 13.05.).'),
  p('b) 79,00 Euro pro Nacht.'),
  p('c) Minibar (8,90 €) und Telefon (2,30 €) — das hätte er mit eigenem Handy vermeiden können.'),
  p('d) Ich hätte nur zwei Tage geparkt — könnten Sie die Rechnung bitte prüfen?'),
  ...gap(1),
  h2('Aufgabe 3 — Hotelbewertung'),
  p('a) Positiv: zentrale Lage (5 Min. vom Bahnhof), freundliches Personal, gutes Frühstück.'),
  p('b) Negativ: lautes Zimmer (Straße), defekte Klimaanlage, Techniker kam erst nach 2 Stunden.'),
  p('c) Es gab sowohl Positives (Lage, Personal, Frühstück) als auch Negatives (Lärm, Klimaanlage) — daher ein mittleres Ergebnis.'),
  ...gap(1),
  h2('Aufgabe 4 — Buchungsformular'),
  p('a) Individuelle Antworten — wichtig: Doppelzimmer, 2 Personen, 2 Nächte, Frühstück angekreuzt.', { italics: true, color: '888888' }),
  p('b) Ich kann die Buchung kostenlos stornieren, wenn ich es mindestens 48 Stunden vor der Anreise tue.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
