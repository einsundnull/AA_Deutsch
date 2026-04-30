// A2_Erwachsene — Thema 09 ABSCHLUSS: Medien & Kommunikation
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Medien & Kommunikation — ABSCHLUSS';
const HEADING = 'Thema 09 — Medien & Kommunikation';
const PREFIX  = 'A2_Erwachsene_MedienKommunikation_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '09_MedienKommunikation', 'ABSCHLUSS');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle ABSCHLUSS:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ABSCHLUSS`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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

const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Medien & Kommunikation — Abschlussübung'),
  infoBox([
    'Diese Übung kombiniert beide Unterpunkte des Themas:',
    'UP 01: Nachrichten und Internet nutzen',
    'UP 02: Telefonieren und Nachrichten schreiben',
  ]),
  ...gap(1),

  // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
  h2('Aufgabe 1 — Lesetext: Sandros digitaler Tag'),
  p('Sandro Rizzo kommt aus Italien und lebt seit zwei Jahren in Düsseldorf. Er arbeitet als Architekt in einem mittelgroßen Büro. Sein Tag beginnt — wie bei vielen — mit dem Smartphone: Schon im Bett checkt er die Nachrichten der Tagesschau-App und liest die wichtigsten Schlagzeilen aus Italien.'),
  p('Auf dem Weg ins Büro hört er einen Podcast über Architektur. „Während andere Musik hören, lerne ich neue Trends kennen", sagt er. Im Büro ist er dann den ganzen Tag erreichbar: per E-Mail, Telefon und Chat. Letzte Woche hatte Sandro einen wichtigen Anruf: Ein Kunde, Herr Hofmann, wollte Änderungen am Bauplan besprechen. Sandro hatte vorher alles aufgeschrieben — wegen seines Akzents bekommt er manchmal noch ein wenig Lampenfieber am Telefon.'),
  p('„Guten Tag, hier Rizzo, vom Architekturbüro Wagner. Spreche ich mit Herrn Hofmann?" — „Ja, am Apparat." Das Gespräch verlief gut. Herr Hofmann erklärte, dass er das Wohnzimmer größer haben möchte, und fragte, ob das technisch möglich sei. Sandro versprach, ihm noch am gleichen Tag eine E-Mail mit den neuen Plänen zu schicken.'),
  p('Nach dem Telefonat hat Sandro die E-Mail vorbereitet: „Sehr geehrter Herr Hofmann, im Anhang finden Sie die überarbeiteten Pläne. Bitte teilen Sie mir mit, ob Sie weitere Änderungen wünschen. Mit freundlichen Grüßen, Sandro Rizzo." Drei E-Mails, einen Anruf bei der Stadtverwaltung und eine WhatsApp-Nachricht an einen Kollegen später war es 18 Uhr.'),
  p('Abends schaltet Sandro bewusst alle Benachrichtigungen aus. „Sonst schaue ich alle fünf Minuten auf das Handy — das macht mich nervös." Er kocht, liest oder skypt mit seiner Familie in Mailand. „So bleibe ich verbunden, ohne ständig erreichbar sein zu müssen — das ist meine Balance."'),
  ...gap(1),

  // ── Aufgabe 2: R/F ────────────────────────────────────────────────────────
  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Sandro arbeitet als Ingenieur in Düsseldorf.', ''],
      ['Auf dem Weg zur Arbeit hört er einen Podcast über Architektur.', ''],
      ['Sandro bekommt manchmal Lampenfieber am Telefon.', ''],
      ['Herr Hofmann wollte das Wohnzimmer kleiner machen.', ''],
      ['Sandro hat versprochen, am nächsten Tag eine E-Mail zu schicken.', ''],
      ['Abends schaltet Sandro die Benachrichtigungen aus.', ''],
      ['Sandro skypt mit seiner Familie in Italien.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),

  // ── Aufgabe 3: Gemischter Lückentext ──────────────────────────────────────
  h2('Aufgabe 3 — Gemischter Lückentext (beide Unterpunkte)'),
  infoBox([
    'Wörterkasten: surfen  |  zurückrufen  |  Anhang  |  Schlagzeilen  |  besetzt',
    '              hochladen  |  buchstabieren  |  hinterlassen  |  Suchmaschine  |  weitergeleitet'
  ]),
  ...gap(1),
  p('Yana arbeitet als Journalistin und nutzt das Internet jeden Tag. Morgens liest sie die ________ aus drei verschiedenen Ländern. Wenn sie Informationen sucht, gibt sie die Begriffe in eine ________ ein. Manchmal muss sie auch Fotos für ihre Artikel ________.'),
  p('Letzte Woche hatte sie einen schwierigen Anruf: Sie wollte einen Politiker erreichen, aber die Leitung war ________. Auf dem Anrufbeantworter hat sie eine Nachricht ________ und gebeten, dass er sie ________ soll. Als er endlich anrief, hat sie ihren langen Namen langsam ________ — er konnte ihn sonst nicht aufschreiben.', { before: 120 }),
  p('Nach dem Gespräch hat Yana eine E-Mail mit dem Manuskript geschickt — der ________ war 5 MB groß. Ihr Chef hat die E-Mail zur Korrektur an einen Kollegen ________. So konnte alles schnell überprüft werden, bevor der Text online ging.', { before: 120 }),
  ...gap(1),

  // ── Aufgabe 4: Fehlerkorrektur ────────────────────────────────────────────
  h2('Aufgabe 4 — Fehler korrigieren'),
  p('In jedem Satz steckt genau ein Fehler. Unterstreiche ihn und schreibe den korrekten Satz.'),
  ...gap(1),
  p('UP 01 — Nachrichten und Internet nutzen:', { bold: true }),
  p('a)  Die Nachrichten wird täglich auf dem Handy gelesen.'),
  wLine(), wLine(),
  p('b)  Im Internet werden viele Falschnachrichten verbreitet wird.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 02 — Telefonieren und Nachrichten schreiben:', { bold: true }),
  p('c)  Anna sagt, dass sie kommt morgen.'),
  wLine(), wLine(),
  p('d)  Können Sie mir sagen, dass der Termin stattfindet?', { before: 120 }),
  wLine(), wLine(),
  p('e)  Ich rufe später dich an.', { before: 120 }),
  wLine(), wLine(),
  p('f)  Bitte hinterlassen Sie eine Nachricht in dem Anrufbeantworter.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 5: Schreiben ──────────────────────────────────────────────────
  h2('Aufgabe 5 — Schreiben: Mein Mediennutzungs-Tagebuch'),
  p('Beschreiben Sie einen typischen Tag mit Medien (8–10 Sätze). Benutzen Sie Elemente aus beiden Unterpunkten:'),
  bullet('UP 01: Wie informieren Sie sich über Nachrichten? (Passiv, Konnektoren)'),
  bullet('UP 01: Welche Apps oder Plattformen nutzen Sie? (Komposita)'),
  bullet('UP 02: Mit wem telefonieren oder schreiben Sie? (indirekte Rede mit dass/ob)'),
  bullet('UP 02: Wie unterscheiden Sie formelle und informelle Kommunikation?'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 6: Rollenspiel ────────────────────────────────────────────────
  h2('Aufgabe 6 — Rollenspiel: Zwei Stationen aus dem Berufsleben'),
  p('Spielen Sie zwei Szenen durch (je 4 Minuten).'),
  stdTable(
    ['Station', 'Person A', 'Person B'],
    [
      ['Station 1: Telefonat (UP 02)', 'Sie rufen in einer Firma an, um nach einem Termin zu fragen.', 'Sie sind Mitarbeiter/in. Verbinden Sie weiter, sagen Sie ab oder bieten Sie einen Termin an.'],
      ['Station 2: Online-Hilfe (UP 01)', 'Sie haben ein Problem im Internet (Login funktioniert nicht, E-Mail kommt nicht an).', 'Sie helfen Schritt für Schritt — geben Anleitung mit Imperativ.'],
    ],
    [3500, 4103, 4103]
  ),
  infoBox([
    'Sprachliche Ziele pro Station:',
    'Station 1: Telefon-Floskeln / indirekte Rede / dass-Sätze',
    'Station 2: Imperativ / Komposita (Suchmaschine, Passwort) / Passiv',
  ]),
  ...gap(1),

  // ── Selbstevaluation ──────────────────────────────────────────────────────
  h2('Selbstevaluation — Das kann ich jetzt!'),
  stdTable(
    ['Ich kann …', 'gut', 'noch nicht sicher'],
    [
      ['über meinen Medienkonsum sprechen und schreiben.', '', ''],
      ['eine Online-Funktion mit Imperativ erklären.', '', ''],
      ['Passiv im Präsens bilden und verstehen.', '', ''],
      ['ein Telefongespräch höflich führen (eröffnen, nachfragen, beenden).', '', ''],
      ['SMS, formelle und informelle E-Mails unterscheiden.', '', ''],
      ['Indirekte Rede mit dass / ob / W-Wort verwenden.', '', ''],
      ['eine Telefonnotiz aufnehmen und weitergeben.', '', ''],
    ],
    [7500, 1000, 3206]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Medien & Kommunikation'),
  ...gap(1),

  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Sandro arbeitet als Ingenieur in Düsseldorf.', 'F (Architekt)'],
      ['Auf dem Weg zur Arbeit hört er einen Podcast über Architektur.', 'R'],
      ['Sandro bekommt manchmal Lampenfieber am Telefon.', 'R'],
      ['Herr Hofmann wollte das Wohnzimmer kleiner machen.', 'F (größer)'],
      ['Sandro hat versprochen, am nächsten Tag eine E-Mail zu schicken.', 'F (am gleichen Tag)'],
      ['Abends schaltet Sandro die Benachrichtigungen aus.', 'R'],
      ['Sandro skypt mit seiner Familie in Italien.', 'R (Mailand)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 3 — Lückentext'),
  p('1. Schlagzeilen  2. Suchmaschine  3. hochladen  4. besetzt  5. hinterlassen'),
  p('6. zurückrufen  7. buchstabiert  8. Anhang  9. weitergeleitet  10. (surfen — falls erweitert)'),
  p('Hinweis: Reihenfolge im Text entspricht der Lösung. „surfen" kann bei einer Variante eingebaut sein.', { italics: true, color: '888888' }),
  ...gap(1),

  h2('Aufgabe 4 — Fehlerkorrektur'),
  grammarBox([
    'UP 01 — Nachrichten/Internet (Passiv-Bildung):',
    'a) FEHLER: „werden" muss Plural sein, weil „Nachrichten" Plural ist!',
    '   RICHTIG: Die Nachrichten werden täglich auf dem Handy gelesen.',
    '',
    'b) FEHLER: doppeltes „werden" / „wird"!',
    '   RICHTIG: Im Internet werden viele Falschnachrichten verbreitet.',
  ]),
  ...gap(1),
  grammarBox([
    'UP 02 — Telefon/Nachrichten (indirekte Rede / dass vs. ob / Wortstellung):',
    'c) FEHLER: Verb steht nicht am Ende des dass-Satzes!',
    '   RICHTIG: Anna sagt, dass sie morgen kommt.',
    '',
    'd) FEHLER: „dass" sollte „wann" sein (offene Frage).',
    '   RICHTIG: Können Sie mir sagen, wann der Termin stattfindet?',
    '',
    'e) FEHLER: Wortstellung — Pronomen vor Verb-Partikel.',
    '   RICHTIG: Ich rufe dich später an.',
    '',
    'f) FEHLER: „in dem" → „auf dem" (man hinterlässt eine Nachricht AUF dem Anrufbeantworter).',
    '   RICHTIG: Bitte hinterlassen Sie eine Nachricht auf dem Anrufbeantworter.',
  ]),
  ...gap(1),

  h2('Aufgabe 5 — Bewertungskriterien Tagebuch'),
  bullet('UP 01: Mediennutzung beschrieben — Passiv oder Konnektoren korrekt verwendet'),
  bullet('UP 01: Konkrete Apps/Plattformen genannt + Komposita (Suchmaschine, Onlineshop)'),
  bullet('UP 02: Telefon- oder Schreibsituation erwähnt — indirekte Rede mit dass/ob'),
  bullet('UP 02: Unterscheidung formell/informell (Sehr geehrte/Hey, MfG/LG)'),
  bullet('Mindestens 8 vollständige, zusammenhängende Sätze mit klarer Tagesstruktur'),
  ...gap(1),
  h2('Muster-Tagebuch'),
  p('Mein Tag beginnt mit dem Handy: Morgens werden auf der Tagesschau-App die wichtigsten Schlagzeilen gelesen. Auf dem Weg zur Arbeit höre ich gerne einen Podcast — manchmal Wissenschaft, manchmal Musik. Im Büro nutze ich vor allem E-Mails und unsere Firmen-Suchmaschine. Gestern hat eine Kollegin angerufen — sie hat gefragt, ob ich Zeit für ein kurzes Meeting habe, und gesagt, dass der Bericht bis Freitag fertig sein muss. An meine Familie schreibe ich informelle Nachrichten per WhatsApp, mit Emojis und Abkürzungen. Dem Vermieter schreibe ich dagegen formell („Sehr geehrter Herr ..., mit freundlichen Grüßen"). Abends schalte ich oft alle Benachrichtigungen aus, damit ich mich entspannen kann. Ohne Internet könnte ich heute weder arbeiten noch mit der Familie in Verbindung bleiben — aber bewusste Pausen tun mir gut.'),
  ...gap(1),

  h2('Aufgabe 6 — Bewertungskriterien Rollenspiel'),
  bullet('Station 1: vollständige Telefonbegrüßung („Hier ist …"), Anliegen klar genannt, indirekte Rede mindestens einmal'),
  bullet('Station 1: korrekte Verabschiedung („Auf Wiederhören")'),
  bullet('Station 2: Imperativ-Form korrekt (Klick / Gib ein / Probier mal)'),
  bullet('Station 2: mindestens ein Kompositum + ein Passiv-Satz'),
  bullet('Beide Stationen: höflicher, natürlicher Gesprächsfluss'),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
