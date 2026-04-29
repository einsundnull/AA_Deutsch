// A2_Erwachsene — Thema 09 UP 01: Nachrichten und Internet nutzen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Nachrichten und Internet nutzen';
const HEADING = 'Thema 09 — Medien & Kommunikation';
const SUBHEAD = 'UP 01: Nachrichten und Internet nutzen';
const PREFIX  = 'A2_Erwachsene_MedienKommunikation_01_NachrichtenInternet';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '09_MedienKommunikation', '01_NachrichtenInternet');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 01`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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
const mediaBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '37474F' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '37474F' }, left: { style: BorderStyle.SINGLE, size: 12, color: '37474F' }, right: { style: BorderStyle.SINGLE, size: 12, color: '37474F' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'ECEFF1' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Nachrichten und Internet nutzen — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Medien und Internet:',
    'Nachrichten konsumieren: Ich lese / schaue / höre … / Ich informiere mich über …',
    'Quellen: Nachrichtenseite / Online-Zeitung / Radio / Podcast / Social Media',
    'Internet nutzen: surfen / googeln / etwas posten / herunterladen / hochladen',
    'Häufigkeit: täglich / mehrmals am Tag / einmal die Woche / selten / nie',
    'Meinung: Ich finde, dass … / Meiner Meinung nach … / Ich halte … für (gefährlich/wichtig)',
    'Passiv: Online wird viel diskutiert. / Hier wird über … berichtet.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Mein Medienkonsum'),
  p('Beschreiben Sie Ihren Medienkonsum (4–5 Sätze). Beantworten Sie: Welche Nachrichten lesen oder schauen Sie? Wie oft? Wo informieren Sie sich am liebsten?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Eine Online-Funktion erklären'),
  p('Eine ältere Verwandte fragt Sie, wie man eine bestimmte Online-Funktion benutzt (z.B. eine E-Mail schicken, ein Foto hochladen, ein Video anschauen, online einkaufen). Schreiben Sie eine kurze Anleitung in 4–5 Schritten (Imperativ).'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Passiv im Präsens'),
  grammarBox([
    'Passiv im Präsens: werden + Partizip II',
    'Aktiv:  Viele Menschen lesen Nachrichten online.',
    'Passiv: Nachrichten werden online (von vielen Menschen) gelesen.',
    'Bildung: werden (konjugiert) + Partizip II am Satzende',
    'Ich werde gefragt / Du wirst informiert / Es wird diskutiert / Sie werden gepostet',
  ]),
  ...gap(1),
  p('Forme die Sätze ins Passiv um.'),
  p('a) Viele Menschen nutzen das Internet täglich. → '),
  wLine(),
  p('b) Junge Leute lesen die Nachrichten oft auf dem Handy. → ', { before: 120 }),
  wLine(),
  p('c) Online-Plattformen verbreiten Informationen schnell. → ', { before: 120 }),
  wLine(),
  p('d) Soziale Medien beeinflussen unsere Meinungen. → ', { before: 120 }),
  wLine(),
  p('e) Viele Eltern kontrollieren die Internetzeit ihrer Kinder. → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Meinungstext schreiben'),
  p('Schreiben Sie 5–6 Sätze zum Thema „Vor- und Nachteile des Internets". Nennen Sie zwei Vorteile und zwei Nachteile. Benutzen Sie: einerseits … andererseits / zwar … aber / trotzdem / deshalb.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Nachrichten und Internet nutzen'),
  grammarBox([
    'Passiv — Bildung und Verwendung:',
    'Präsens-Passiv: werden + Partizip II',
    '  Das Internet wird täglich genutzt.',
    'Perfekt-Passiv: ist + Partizip II + worden',
    '  Das Video ist hochgeladen worden.',
    'Mit Modalverb: Modalverb + Partizip II + werden',
    '  Das Passwort muss geändert werden.',
    'Verwendung: wenn der Täter unwichtig oder unbekannt ist.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antwort'),
  p('Ich informiere mich täglich über Nachrichten — meistens auf dem Handy. Morgens lese ich kurz die Schlagzeilen auf einer Nachrichten-App, abends höre ich gerne einen Podcast. Soziale Medien nutze ich nur einmal am Tag, weil ich mich nicht ablenken lassen will. Online-Zeitungen finde ich am verlässlichsten — Tageszeitungen lese ich nur am Wochenende.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Anleitung „E-Mail schicken"'),
  p('1. Öffne dein E-Mail-Programm.'),
  p('2. Klicke auf „Neue E-Mail" oder den Stift-Button.'),
  p('3. Trage die E-Mail-Adresse des Empfängers in das Feld „An" ein.'),
  p('4. Schreibe einen Betreff und deine Nachricht.'),
  p('5. Klicke auf „Senden" — fertig!'),
  ...gap(1),
  h2('Aufgabe 3 — Passiv'),
  p('a) Das Internet wird täglich von vielen Menschen genutzt.'),
  p('b) Die Nachrichten werden oft auf dem Handy gelesen.'),
  p('c) Informationen werden auf Online-Plattformen schnell verbreitet.'),
  p('d) Unsere Meinungen werden von sozialen Medien beeinflusst.'),
  p('e) Die Internetzeit der Kinder wird von vielen Eltern kontrolliert.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Meinungstext'),
  bullet('Mindestens 2 Vorteile und 2 Nachteile genannt'),
  bullet('Konnektoren: einerseits … andererseits / zwar … aber'),
  bullet('Eigene Meinung am Ende: Ich finde insgesamt … / Meiner Meinung nach …'),
  bullet('Beispiele für Vorteile: schnelle Information, Kontakt halten, einkaufen, lernen'),
  bullet('Beispiele für Nachteile: Datenschutz, zu viel Bildschirmzeit, Falschnachrichten'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Nachrichten und Internet nutzen — Leseübung'),
  h2('Text: Hassans digitaler Alltag'),
  p('Hassan El-Sayed kommt aus Ägypten und lebt seit anderthalb Jahren in Bremen. Er arbeitet als Lehrer für Mathematik und ist sehr internetaffin. „Ohne Internet könnte ich heute nicht leben", sagt er lachend. „Es ist mein Werkzeug für die Arbeit, mein Fenster zur Welt und meine Verbindung zu meiner Familie in Kairo."'),
  p('Ein typischer Tag beginnt für Hassan mit einem Blick auf sein Handy. Zuerst checkt er kurz seine E-Mails, dann liest er die Schlagzeilen auf der Tagesschau-App und einer ägyptischen Nachrichtenseite. „So bleibe ich in beiden Welten informiert", erklärt er. Auf dem Weg zur Arbeit hört er oft einen Podcast — meistens etwas über Wissenschaft oder Geschichte.'),
  p('In der Schule nutzt Hassan das Internet auch beruflich: Er erstellt Übungen mit interaktiven Tools, lädt Lernvideos für seine Schüler hoch und kommuniziert mit den Eltern per E-Mail. „Vor zehn Jahren wäre das alles ganz anders gewesen", sagt er. „Heute kann jeder Schüler einen Mathe-Erklärfilm zu Hause anschauen — das ist eine riesige Chance!"'),
  p('Aber Hassan sieht auch Gefahren. „Meine Schüler verbringen zu viel Zeit auf TikTok und YouTube. Die Konzentration nimmt ab — das merken wir Lehrer deutlich." In seiner Klasse hat er deshalb die Regel eingeführt, dass Handys während des Unterrichts in einer Box bleiben müssen. „Am Anfang waren die Schüler sauer", erinnert er sich, „aber jetzt sagen viele, dass sie sich besser konzentrieren können."'),
  p('Privat versucht Hassan, abends bewusst offline zu gehen. Er liest dann ein Buch oder telefoniert mit seinen Eltern. „Mit meiner Mutter skype ich jeden Sonntagabend — das ist mein Highlight der Woche. Ohne das Internet wäre die Distanz nach Kairo viel schwerer zu ertragen."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Hassan wohnt seit zwei Jahren in Bremen.', ''],
      ['Hassan liest morgens Nachrichten aus zwei Ländern.', ''],
      ['Auf dem Weg zur Arbeit hört Hassan immer Musik.', ''],
      ['Hassan benutzt Internet auch in seinem Beruf.', ''],
      ['In Hassans Klasse dürfen Handys frei benutzt werden.', ''],
      ['Hassan findet, dass Schüler sich heute schlechter konzentrieren.', ''],
      ['Hassan skypt jeden Sonntag mit seiner Mutter.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Wie informiert sich Hassan morgens über Nachrichten?'),
  wLine(), wLine(),
  p('b) Wie nutzt Hassan das Internet beruflich?', { before: 120 }),
  wLine(), wLine(),
  p('c) Welche Gefahren des Internets nennt Hassan?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was ist Hassans Strategie für einen gesunden Umgang mit Medien?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Hassans Mediennutzung'),
  stdTable(
    ['Tageszeit', 'Was macht Hassan?', 'Welches Medium?'],
    [
      ['Morgens', '', ''],
      ['Auf dem Weg zur Arbeit', '', ''],
      ['Während der Arbeit', '', ''],
      ['Im Unterricht (Regel)', '', ''],
      ['Abends', '', ''],
      ['Sonntag abend', '', ''],
    ],
    [3500, 4400, 3806]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Nachrichten und Internet nutzen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Hassan wohnt seit zwei Jahren in Bremen.', 'F (seit anderthalb Jahren)'],
      ['Hassan liest morgens Nachrichten aus zwei Ländern.', 'R (Tagesschau + ägyptische Seite)'],
      ['Auf dem Weg zur Arbeit hört Hassan immer Musik.', 'F (Podcast)'],
      ['Hassan benutzt Internet auch in seinem Beruf.', 'R'],
      ['In Hassans Klasse dürfen Handys frei benutzt werden.', 'F (Handys in Box)'],
      ['Hassan findet, dass Schüler sich heute schlechter konzentrieren.', 'R'],
      ['Hassan skypt jeden Sonntag mit seiner Mutter.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Er liest die Tagesschau-App und eine ägyptische Nachrichtenseite, um über beide Länder informiert zu sein.'),
  p('b) Er erstellt Übungen, lädt Lernvideos hoch und kommuniziert per E-Mail mit den Eltern.'),
  p('c) Schüler verbringen zu viel Zeit auf TikTok und YouTube — die Konzentration nimmt ab.'),
  p('d) Im Unterricht: Handys in einer Box. Privat: abends bewusst offline gehen, Bücher lesen, telefonieren.'),
  ...gap(1),
  h2('Aufgabe 3 — Mediennutzung'),
  stdTable(
    ['Tageszeit', 'Was?', 'Medium'],
    [
      ['Morgens', 'E-Mails checken, Schlagzeilen lesen', 'Handy / Apps'],
      ['Auf dem Weg', 'Podcast hören (Wissenschaft/Geschichte)', 'Podcast'],
      ['Arbeit', 'Übungen erstellen, Videos hochladen, E-Mails', 'PC + Internet'],
      ['Unterricht', 'Handys in Box', '— (Regel)'],
      ['Abends', 'Buch lesen, telefonieren', 'Buch / Telefon'],
      ['Sonntag abend', 'Skype mit Mutter', 'Skype'],
    ],
    [3500, 4400, 3806]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Nachrichten und Internet nutzen — Lückentext'),
  infoBox([
    'Wörterkasten: Suchmaschine  |  herunterladen  |  Passwort  |  surfen  |  posten',
    '              Nachrichten  |  Bildschirm  |  Verbindung  |  klicken  |  E-Mail'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Internet-Text: Fülle die Lücken aus'),
  p('Das Internet ist aus unserem Alltag nicht mehr wegzudenken. Wenn man im Netz ________, sucht man Informationen — meistens über eine ________ wie Google. Dann ________ man auf einen Link und liest die Seite. Manchmal will man Dokumente oder Bilder ________ , damit man sie später ohne Internet öffnen kann.'),
  p('Wenn man einer Person etwas Schriftliches schicken möchte, schreibt man eine ________. Auf sozialen Plattformen kann man auch öffentlich Fotos oder Texte ________. Wichtig ist immer ein gutes ________ — sonst können andere den Account hacken.', { before: 120 }),
  p('Viele Menschen lesen die ________ heute online. Das ist praktisch, aber man sollte nicht stundenlang vor dem ________ sitzen. Wenn das WLAN schwach ist, ist die ________ langsam — das ärgert alle.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Hilfe am Computer: Dialog ergänzen'),
  infoBox(['Wörterkasten: einloggen  |  Anhang  |  Spam  |  Browser  |  Adresse  |  abschicken']),
  ...gap(1),
  p('Person A: „Kannst du mir helfen? Ich möchte mich in mein E-Mail-Konto ________ , aber es klappt nicht."'),
  p('Person B: „Welchen ________ benutzt du? Chrome oder Firefox?"'),
  p('Person A: „Chrome. Ich habe die ________ schon eingegeben — und das Passwort auch."'),
  p('Person B: „Probier mal, das Passwort neu einzugeben. Steht da vielleicht eine Fehlermeldung?"'),
  p('Person A: „Ah, jetzt geht es! Ich möchte eine E-Mail mit ________ ________."'),
  p('Person B: „Klick auf das Büroklammer-Symbol, wähle die Datei aus und drück auf Senden. Achte aber: nicht versehentlich ins ________ schicken!"'),
  ...gap(1),
  h2('Aufgabe 3 — Aktiv und Passiv (Präsens)'),
  grammarBox([
    'Aktiv ↔ Passiv:',
    'Aktiv:   Subjekt + Verb + Objekt',
    '         Anna schickt die E-Mail.',
    'Passiv:  Objekt → Subjekt + werden + Partizip II',
    '         Die E-Mail wird (von Anna) geschickt.',
    'Tipp: Im Passiv ist der Täter oft unwichtig oder unbekannt.',
  ]),
  ...gap(1),
  p('Forme die Sätze ins Passiv um (Präsens).'),
  p('a) Der Lehrer öffnet das Lernportal. → '),
  wLine(),
  p('b) Die Schüler laden die Hausaufgaben hoch. → ', { before: 120 }),
  wLine(),
  p('c) Der Administrator ändert das Passwort. → ', { before: 120 }),
  wLine(),
  p('d) Die Firma speichert die Kundendaten. → ', { before: 120 }),
  wLine(),
  p('e) Viele Menschen lesen die Online-Nachrichten. → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Wortbildung: zusammengesetzte Nomen'),
  grammarBox([
    'Komposita (zusammengesetzte Nomen) — typisch deutsch!',
    'die Suchmaschine = das Suchen + die Maschine',
    'das Passwort     = passen + das Wort',
    'Der Artikel des LETZTEN Wortes bestimmt den Artikel des ganzen Wortes!',
    'die Internet+Verbindung → die Internetverbindung',
  ]),
  ...gap(1),
  p('Bilde Komposita aus den zwei Wörtern.'),
  p('a) das Internet + die Verbindung → '),
  wLine(),
  p('b) der Computer + das Spiel → ', { before: 120 }),
  wLine(),
  p('c) das Online + der Einkauf → ', { before: 120 }),
  wLine(),
  p('d) das Handy + die Nummer → ', { before: 120 }),
  wLine(),
  p('e) die Nachricht + die Sendung → ', { before: 120 }),
  wLine(),
  p('f) der Benutzer + der Name → ', { before: 120 }),
  wLine(),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Nachrichten und Internet nutzen'),
  h2('Aufgabe 1'),
  p('1. surft  2. Suchmaschine  3. klickt  4. herunterladen  5. E-Mail'),
  p('6. posten  7. Passwort  8. Nachrichten  9. Bildschirm  10. Verbindung'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. einloggen  2. Browser  3. Adresse  4. Anhang  5. abschicken  6. Spam'),
  ...gap(1),
  h2('Aufgabe 3 — Passiv'),
  p('a) Das Lernportal wird (vom Lehrer) geöffnet.'),
  p('b) Die Hausaufgaben werden (von den Schülern) hochgeladen.'),
  p('c) Das Passwort wird (vom Administrator) geändert.'),
  p('d) Die Kundendaten werden (von der Firma) gespeichert.'),
  p('e) Die Online-Nachrichten werden (von vielen Menschen) gelesen.'),
  ...gap(1),
  h2('Aufgabe 4 — Komposita'),
  p('a) die Internetverbindung'),
  p('b) das Computerspiel'),
  p('c) der Online-Einkauf  (auch als Onlineeinkauf akzeptiert)'),
  p('d) die Handynummer'),
  p('e) die Nachrichtensendung'),
  p('f) der Benutzername'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Nachrichten und Internet nutzen — Wortliste'),
  h2('Teil A — Internet und Computer'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Suchmaschine, -n', 'Nomen', 'Google ist die bekannteste Suchmaschine.'],
      ['der Browser, -', 'Nomen', 'Mein Browser ist Firefox.'],
      ['das Passwort, -wörter', 'Nomen', 'Bitte gib dein Passwort ein.'],
      ['surfen', 'Verb', 'Ich surfe gerne im Internet.'],
      ['herunterladen (trennb.)', 'Verb', 'Ich lade die App herunter.'],
      ['hochladen (trennb.)', 'Verb', 'Ich lade ein Foto hoch.'],
      ['klicken (auf + Akk.)', 'Verb', 'Klick einfach auf den Link!'],
      ['posten / teilen', 'Verb', 'Sie postet jeden Tag ein Foto.'],
      ['die Verbindung, -en', 'Nomen', 'Meine Internetverbindung ist langsam.'],
      ['der Bildschirm, -e', 'Nomen', 'Ich sitze zu lange am Bildschirm.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Nachrichten, Medien und Kommunikation'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['die Nachricht, -en', 'Information', 'Hast du die neuesten Nachrichten gehört?'],
      ['die Schlagzeile, -n', 'große Überschrift', 'Die Schlagzeile war auf jeder Zeitung.'],
      ['der Artikel, -', 'Zeitungstext', 'Ich habe einen guten Artikel gelesen.'],
      ['die Quelle, -n', 'wo Info herkommt', 'Achte auf seriöse Quellen!'],
      ['die Falschnachricht, -en', 'Fake News', 'Im Internet gibt es viele Falschnachrichten.'],
      ['veröffentlichen', 'publizieren', 'Der Artikel wurde gestern veröffentlicht.'],
      ['sich informieren über + Akk.', 'Infos suchen', 'Ich informiere mich über das Wetter.'],
      ['recherchieren', 'untersuchen, suchen', 'Sie recherchiert für ihre Arbeit.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  mediaBox([
    'Mediennutzung in Deutschland — Fakten:',
    'Internetnutzung: ca. 95 % der Erwachsenen sind online (2024)',
    'Mobilität: über 80 % nutzen das Internet hauptsächlich auf dem Handy',
    'Nachrichten: Tagesschau (ARD), heute (ZDF), Spiegel Online sind sehr beliebt',
    'Soziale Medien: WhatsApp, Instagram, Facebook, TikTok dominieren',
    'Vorsicht: Auf seriöse Quellen achten — Falschnachrichten erkennen lernen!',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Suchmaschine: ___________  |  surfen: ___________  |  herunterladen: ___________'),
  p('die Nachricht: ___________  |  veröffentlichen: ___________  |  sich informieren: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Nachrichten und Internet nutzen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Internet-Verben — Perfekt:',
    'surfen        → hat gesurft',
    'klicken       → hat geklickt',
    'herunterladen → hat heruntergeladen (trennb.)',
    'hochladen     → hat hochgeladen (trennb.)',
    'posten        → hat gepostet',
    'teilen        → hat geteilt',
    'einloggen     → hat sich eingeloggt (refl., trennb.)',
    'recherchieren → hat recherchiert',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich habe gestern eine wichtige E-Mail mit einem Anhang abgeschickt — hoffentlich ist sie nicht im Spam gelandet.'),
  p('In Deutschland werden die Nachrichten oft auf dem Handy gelesen, besonders auf dem Weg zur Arbeit.'),
  p('Achte immer auf seriöse Quellen, weil im Internet viele Falschnachrichten verbreitet werden.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Nachrichten und Internet nutzen — Konversation'),
  h2('Aufgabe 1 — Dialog: Über Mediennutzung sprechen'),
  p('Zwei Personen sprechen über ihre Nachrichten- und Internetgewohnheiten. Ergänzt den Dialog.'),
  infoBox([
    'Häufigkeit: Ich nutze … täglich / mehrmals am Tag / einmal pro Woche / selten.',
    'Quellen: Ich lese / höre / schaue …',
    'Meinung: Ich finde, … / Meiner Meinung nach …',
    'Vorlieben: Ich bevorzuge … / Am liebsten …',
    'Vergleich: Früher habe ich … / heute …',
  ]),
  ...gap(1),
  p('Person A: „Wie informierst du dich normalerweise über Nachrichten?"'),
  p('Person B: „Meistens über ________________________ — ich lese sie ________ am Morgen."'),
  p('Person A: „Schaust du auch Nachrichten im Fernsehen?"'),
  p('Person B: „________________________. Ich finde ________________________ aktueller."'),
  p('Person A: „Wie viel Zeit verbringst du täglich am Handy?"'),
  p('Person B: „Ungefähr ________ Stunden — das ist eigentlich ________________________."'),
  p('Person A: „Vermisst du manchmal die Zeit ohne Smartphone?"'),
  p('Person B: „Manchmal schon. Früher ________________________, heute ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Hilfe am Computer'),
  stdTable(
    ['Person A — bittet um Hilfe', 'Person B — hilft'],
    [
      ['Sagen Sie, was Sie machen wollen (z.B. ein Video herunterladen, online einkaufen, sich registrieren).', 'Fragen Sie nach Details (welches Programm, welche Webseite).'],
      ['Beschreiben Sie das Problem (klappt nicht, Fehlermeldung).', 'Geben Sie eine Anleitung Schritt für Schritt (Imperativ).'],
      ['Stellen Sie Verständnisfragen.', 'Erklären Sie noch einmal mit anderen Worten.'],
      ['Bedanken Sie sich.', 'Bieten Sie weitere Hilfe an.'],
    ],
    [5703, 5703]
  ),
  mediaBox([
    'Nützliche Sätze für die Computer-Hilfe:',
    'Klick zuerst auf … / dann auf …',
    'Gib hier deinen Benutzernamen / dein Passwort ein.',
    'Probier mal, die Seite neu zu laden.',
    'Wenn das nicht klappt, melde dich neu an.',
    'Pass auf, dass du nicht auf Werbung klickst!',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Internet und Medien'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Welche Nachrichtenquellen nutzen Sie regelmäßig?', ''],
      ['Wie viele Stunden pro Tag sind Sie online?', ''],
      ['Welche App / Webseite ist für Sie am wichtigsten? Warum?', ''],
      ['Haben Sie schon einmal eine Falschnachricht geglaubt? Was war die Folge?', ''],
      ['Würden Sie für eine Woche auf das Internet verzichten können? Warum (nicht)?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppendebatte: „Internet — Segen oder Fluch?"'),
  p('Bildet zwei Gruppen. Eine Gruppe argumentiert für die Vorteile, die andere für die Nachteile des Internets. Jede Person nennt mindestens 1 Argument.'),
  infoBox([
    'Redemittel für die Debatte:',
    'Ich finde, … / Meiner Meinung nach …',
    'Einerseits …, andererseits … / Zwar …, aber …',
    'Ich bin der gleichen / anderen Meinung wie …, weil …',
    'Das stimmt zwar, aber … / Ich sehe das anders, denn …',
    'Ein gutes Beispiel ist … / Wenn man bedenkt, dass …',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Nachrichten und Internet nutzen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Konkrete Quellen / Apps / Plattformen genannt'),
  bullet('Häufigkeit klar (täglich / mehrmals / selten)'),
  bullet('Vergleich Vergangenheit ↔ Gegenwart (früher … heute …)'),
  bullet('Eigene Meinung mit Begründung (weil-Satz)'),
  bullet('Natürlicher Gesprächsfluss'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Wie informierst du dich normalerweise über Nachrichten?"'),
  p('B: „Meistens über die Tagesschau-App — ich lese sie morgens beim Kaffee."'),
  p('A: „Schaust du auch Nachrichten im Fernsehen?" / B: „Selten. Ich finde Online-Nachrichten aktueller."'),
  p('A: „Wie viel Zeit verbringst du täglich am Handy?" / B: „Ungefähr drei Stunden — das ist eigentlich zu viel."'),
  p('B: „Früher habe ich nur Zeitung gelesen — heute checke ich ständig mein Handy."'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Computerhilfe'),
  p('A: „Ich möchte ein Foto auf Instagram hochladen, aber es klappt nicht."'),
  p('B: „Welche Fehlermeldung kommt? Probier zuerst, die App zu schließen und neu zu öffnen."'),
  p('A: „Jetzt geht es! Wie kann ich es nur an Freunde schicken?"'),
  p('B: „Klick beim Hochladen auf „Story" — dann nur „Beste Freunde" auswählen."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Konnektoren (einerseits/andererseits, zwar/aber), Passiv-Konstruktionen, höfliche Argumente.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Nachrichten und Internet nutzen — Bildaufgaben'),
  h2('Aufgabe 1 — Symbole und Apps erkennen'),
  p('[BILD 1: Sechs Symbole bekannter Funktionen / Apps: (1) Briefumschlag-Symbol (E-Mail), (2) Lupe (Suche), (3) Kamera (Fotos), (4) Sprechblase (Chat), (5) Schloss (Sicherheit/Passwort), (6) Wolke (Cloud-Speicher)]'),
  p('a) Was bedeutet jedes Symbol? Schreibe den Namen darunter.'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welche dieser Funktionen nutzen Sie am häufigsten? Warum? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Online-Zeitung lesen'),
  p('[BILD 2: Screenshot einer Online-Zeitungsseite mit der Schlagzeile: „Wetter: Sonnenschein am Wochenende — Pollenflug erwartet". Datum: 28. April 2026. Daneben: Kommentare von Lesern, ein Foto von blühenden Bäumen, Werbebanner für Allergiemittel. Unten: weitere Schlagzeilen aus Politik, Sport, Wissenschaft.]'),
  p('a) Was ist die Hauptschlagzeile?'),
  wLine(),
  p('b) Welche Information findet man auf dieser Seite zusätzlich?', { before: 120 }),
  wLine(),
  p('c) Warum gibt es vielleicht Werbung für Allergiemittel auf dieser Seite?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Smartphone-Bildschirm beschreiben'),
  p('[BILD 3: Smartphone-Startbildschirm mit App-Icons: Wetter, Karten, Kamera, WhatsApp, Instagram, E-Mail, Bank-App, Spotify, Fotos, Einstellungen. Oben: Uhrzeit 8:42, Akku 78 %, voller Empfang.]'),
  p('a) Welche Apps siehst du auf dem Bildschirm? Nenne fünf.'),
  wLine(), wLine(),
  p('b) Welche App nutzt du selbst am meisten? Warum? Schreibe 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  p('c) Schreibe 2 Sätze im Passiv: Welche Apps werden für welchen Zweck verwendet?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Sicherheit im Internet'),
  p('[BILD 4: Eine Infografik zur Internetsicherheit: 1. Sichere Passwörter verwenden (mind. 8 Zeichen, Buchstaben, Zahlen, Sonderzeichen), 2. Nicht auf verdächtige Links klicken, 3. Software regelmäßig aktualisieren, 4. Keine persönlichen Daten an Fremde weitergeben, 5. Bei öffentlichen WLANs vorsichtig sein.]'),
  p('a) Welche fünf Sicherheitsregeln werden empfohlen?'),
  wLine(), wLine(), wLine(),
  p('b) Welche dieser Regeln befolgst du? Welche nicht? Schreibe 3 Sätze.', { before: 120 }),
  wLine(), wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Nachrichten und Internet nutzen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Symbole'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['E-Mail', 'Suchen / Lupe', 'Kamera / Fotos', 'Chat / Nachricht', 'Sicherheit / Passwort', 'Cloud-Speicher']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Ich nutze E-Mails am häufigsten, weil ich sie für die Arbeit brauche.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Online-Zeitung'),
  p('a) „Wetter: Sonnenschein am Wochenende — Pollenflug erwartet"'),
  p('b) Datum, Leserkommentare, ein Bildfoto, Werbung, weitere Schlagzeilen aus anderen Bereichen.'),
  p('c) Weil im Artikel das Thema Pollenflug erwähnt wird — die Werbung passt zum Inhalt (personalisierte Werbung).'),
  ...gap(1),
  h2('Aufgabe 3 — Smartphone-Bildschirm'),
  p('a) Beispiele: WhatsApp, Wetter, Karten, Kamera, Instagram, E-Mail, Bank-App, Spotify.'),
  p('b) Individuelle Antworten: Ich nutze WhatsApp am meisten, weil ich damit mit meiner Familie schreibe.'),
  p('c) Beispiele: Mit der Wetter-App wird das Wetter gecheckt. / Mit Spotify wird Musik gehört. / Mit der Bank-App werden Überweisungen erledigt.'),
  ...gap(1),
  h2('Aufgabe 4 — Sicherheit'),
  p('a) 1. Sichere Passwörter, 2. Nicht auf verdächtige Links klicken, 3. Software aktualisieren, 4. Keine persönlichen Daten weitergeben, 5. Bei öffentlichem WLAN vorsichtig sein.'),
  p('b) Individuelle Antworten: Ich nutze sichere Passwörter und klicke nie auf unbekannte Links. Aber ich aktualisiere meine Software nicht oft genug.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
