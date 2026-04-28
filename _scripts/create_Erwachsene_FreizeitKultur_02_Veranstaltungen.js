// A2_Erwachsene — Thema 06 UP 02: Veranstaltungen besuchen (Kino, Theater, Museum)
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Veranstaltungen besuchen';
const HEADING = 'Thema 06 — Freizeit & Kultur';
const SUBHEAD = 'UP 02: Veranstaltungen besuchen (Kino, Theater, Museum)';
const PREFIX  = 'A2_Erwachsene_FreizeitKultur_02_Veranstaltungen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '06_FreizeitKultur', '02_Veranstaltungen');
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
const eventBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '6A1B9A' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '6A1B9A' }, left: { style: BorderStyle.SINGLE, size: 12, color: '6A1B9A' }, right: { style: BorderStyle.SINGLE, size: 12, color: '6A1B9A' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'F3E5F5' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Veranstaltungen besuchen — Schreibübung'),
  infoBox([
    '🎭  Nützliche Ausdrücke für Veranstaltungen:',
    'Kino: Ich möchte zwei Karten für … / Der Film läuft um … Uhr. / Reihe … Platz …',
    'Theater: Haben Sie noch Karten für …? / Wo ist der Eingang? / Die Vorstellung beginnt um …',
    'Museum: Was kostet der Eintritt? / Gibt es eine Ermäßigung für Studenten?',
    'Meinung: Der Film war spannend / langweilig / lustig / bewegend / enttäuschend.',
    'Empfehlung: Ich empfehle … / Das solltest du unbedingt sehen / besuchen!',
    'Ich habe den Film / die Ausstellung sehr genossen.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Kinokarten kaufen'),
  p('Du möchtest mit einem Freund / einer Freundin ins Kino gehen. Schreibe eine kurze Nachricht (3–4 Sätze): Schlage einen Film vor, erkläre warum, und frage nach der Uhrzeit.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Veranstaltungskritik schreiben'),
  p('Du warst gestern im Theater / Kino / Museum. Schreibe eine kurze Rezension (4–5 Sätze). Beantworte:'),
  bullet('Was hast du besucht? (Name, Ort)'),
  bullet('Was hat dir gut gefallen?'),
  bullet('Was hat dir nicht so gut gefallen?'),
  bullet('Würdest du es empfehlen? Warum?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze: Beschreibe den Film/die Ausstellung'),
  grammarBox([
    '📌  Relativsätze (Nominativ / Akkusativ):',
    'Der Film, der … → maskulin Nom.: der',
    'Die Ausstellung, die … → feminin Nom.: die',
    'Das Museum, das … → neutral Nom.: das',
    'Der Regisseur, den ich … → maskulin Akk.: den',
    'Verb steht am Ende des Relativsatzes!',
  ]),
  ...gap(1),
  p('Ergänze die Relativsätze sinnvoll.'),
  p('a) Das ist der Film, ________ ich letzte Woche gesehen habe.'),
  wLine(),
  p('b) Wir haben das Museum besucht, ________ gerade eine Sonderausstellung zeigt.', { before: 120 }),
  wLine(),
  p('c) Die Schauspielerin, ________ die Hauptrolle spielt, war fantastisch.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Empfehlungs-E-Mail schreiben'),
  p('Dein Freund / deine Freundin besucht demnächst deine Stadt. Schreibe eine E-Mail (5–6 Sätze) und empfiehl eine Veranstaltung (Kino, Theater, Konzert oder Museum). Benutze Relativsätze und Konjunktiv II.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Veranstaltungen besuchen'),
  grammarBox([
    '📌  Relativsätze — Schnellübersicht:',
    'Nominativ (Subjekt):  der → der  |  die → die  |  das → das  |  Pl. → die',
    'Akkusativ (Objekt):   der → den  |  die → die  |  das → das  |  Pl. → die',
    'Dativ:                der → dem  |  die → der  |  das → dem  |  Pl. → denen',
    'Verb IMMER am Ende des Relativsatzes!',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Nachricht'),
  p('Hey [Name]! Hast du Lust, am Freitagabend ins Kino zu gehen? Der neue Thriller „Das Geheimnis" soll sehr gut sein — ich habe tolle Kritiken gelesen. Er läuft um 20:15 Uhr im Cinemaxx. Passt dir das?'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Rezension'),
  p('Gestern war ich im Stadtmuseum Frankfurt in der Ausstellung über moderne Kunst. Besonders beeindruckt hat mich ein großes Gemälde, das die ganze Wand bedeckt hat. Die Führung war sehr informativ und verständlich erklärt. Weniger gut fand ich, dass die Ausstellung etwas klein war. Ich würde sie trotzdem empfehlen, weil man viel Neues lernen kann.'),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze'),
  p('a) Das ist der Film, den ich letzte Woche gesehen habe. (Akk.: den)'),
  p('b) Wir haben das Museum besucht, das gerade eine Sonderausstellung zeigt. (Nom.: das)'),
  p('c) Die Schauspielerin, die die Hauptrolle spielt, war fantastisch. (Nom.: die)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien E-Mail'),
  bullet('Anrede + Abschluss vorhanden'),
  bullet('Mindestens 1 Relativsatz korrekt gebildet'),
  bullet('Konjunktiv II für Empfehlung: Du solltest … / Das würde dir gefallen.'),
  bullet('Konkrete Infos: Name der Veranstaltung, Ort, warum empfehlenswert'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Veranstaltungen besuchen — Leseübung'),
  h2('Text: Ein Abend im Theater'),
  p('Kwame Asante kommt aus Ghana und wohnt seit zwei Jahren in Berlin. Er arbeitet als Softwareentwickler und interessiert sich sehr für Kultur. Letzte Woche ist er zum ersten Mal in ein deutsches Theater gegangen — ins Berliner Ensemble, ein berühmtes Theater in der Nähe des Alexanderplatzes.'),
  p('Kwame hatte die Karten schon zwei Wochen vorher online bestellt. Er hat zwei Plätze in der siebten Reihe reserviert — einen für sich und einen für seine Kollegin Sophia. Die Karten haben je 28 Euro gekostet.'),
  p('Das Stück hieß „Die Räuber" von Friedrich Schiller. Kwame hat das Stück vorher nicht gekannt, aber Sophia hat ihm kurz erklärt, worum es geht: um zwei Brüder, die sich streiten, und um Verrat und Gerechtigkeit. „Das klingt interessant", hat Kwame gedacht.'),
  p('Die Vorstellung hat pünktlich um 19:30 Uhr begonnen. Kwame war von Anfang an fasziniert: die Bühne, die Kostüme, die Schauspieler, die so leidenschaftlich gespielt haben. In der Pause haben Kwame und Sophia im Foyer ein Glas Sekt getrunken und über das Stück gesprochen. „Ich finde die Hauptfigur sehr interessant", hat Kwame gesagt. „Er ist gleichzeitig mutig und verzweifelt."'),
  p('Nach der Vorstellung hat Kwame gesagt: „Das war fantastisch — ich hatte keine Ahnung, dass Theater so mitreißend sein kann! Ich möchte unbedingt wiederkommen." Sophia hat gelacht: „Ich habe es gewusst, dass es dir gefallen wird!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Kwame wohnt seit drei Jahren in Berlin.', ''],
      ['Das Berliner Ensemble liegt in der Nähe des Alexanderplatzes.', ''],
      ['Kwame hat die Karten am Abend an der Kasse gekauft.', ''],
      ['Jede Karte hat 28 Euro gekostet.', ''],
      ['Das Stück heißt „Die Räuber" von Schiller.', ''],
      ['Kwame und Sophia trinken in der Pause Kaffee.', ''],
      ['Kwame hat das Theater genossen und möchte wiederkommen.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Wer ist Kwame und warum geht er ins Theater?'),
  wLine(), wLine(),
  p('b) Worum geht es in dem Stück „Die Räuber"?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was hat Kwame besonders beeindruckt?', { before: 120 }),
  wLine(), wLine(),
  p('d) Was sagt Kwame am Ende über das Theater?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze aus dem Text'),
  p('Finde im Text Relativsätze und trage sie ein.'),
  stdTable(
    ['Relativsatz aus dem Text', 'Bezugswort', 'Kasus'],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    [6000, 2500, 3206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Veranstaltungen besuchen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Kwame wohnt seit drei Jahren in Berlin.', 'F (seit zwei Jahren)'],
      ['Das Berliner Ensemble liegt in der Nähe des Alexanderplatzes.', 'R'],
      ['Kwame hat die Karten am Abend an der Kasse gekauft.', 'F (zwei Wochen vorher online)'],
      ['Jede Karte hat 28 Euro gekostet.', 'R'],
      ['Das Stück heißt „Die Räuber" von Schiller.', 'R'],
      ['Kwame und Sophia trinken in der Pause Kaffee.', 'F (Sekt)'],
      ['Kwame hat das Theater genossen und möchte wiederkommen.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Kwame ist Softwareentwickler aus Ghana und interessiert sich für Kultur. Er geht zum ersten Mal in ein deutsches Theater.'),
  p('b) Es geht um zwei Brüder, die sich streiten — das Thema ist Verrat und Gerechtigkeit.'),
  p('c) Die Bühne, die Kostüme und die leidenschaftlichen Schauspieler haben ihn beeindruckt.'),
  p('d) Kwame sagt, das Theater sei fantastisch und viel mitreißender als erwartet. Er möchte unbedingt wiederkommen.'),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze'),
  stdTable(
    ['Relativsatz', 'Bezugswort', 'Kasus'],
    [
      ['die so leidenschaftlich gespielt haben', 'die Schauspieler', 'Nominativ (Subjekt)'],
      ['die die Hauptrolle spielt (impliziert)', 'die Hauptfigur', 'Nominativ'],
      ['das so mitreißend sein kann', 'Theater (neutral)', 'Nominativ'],
    ],
    [6000, 2500, 3206]
  ),
  p('Hinweis: Auch andere Relativsätze im Text akzeptieren, z. B. „ein berühmtes Theater in der Nähe …" (kein Relativsatz, sondern Apposition).', { italics: true, color: '888888' }),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Veranstaltungen besuchen — Lückentext'),
  infoBox([
    'Wörterkasten: Vorstellung  |  Eintrittskarte  |  reservieren  |  Ermäßigung  |  Pause',
    '              Programm  |  Reihe  |  Ausstellung  |  Führung  |  beeindruckend'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Kulturtext: Fülle die Lücken aus'),
  p('In Deutschland gibt es ein reiches Kulturangebot. Im Theater kann man eine ________ besuchen — zum Beispiel ein Theaterstück, eine Oper oder ein Konzert. Vorher kauft man eine ________ — am besten online oder an der Theaterkasse. Manchmal kann man Plätze in bestimmten ________ n bevorzugen: vorne nah an der Bühne oder weiter hinten.'),
  p('In Museen kann man interessante ________ en sehen. Viele Museen bieten auch eine ________ an, bei der ein Experte die Kunstwerke erklärt. Studenten und Senioren bekommen oft eine ________ auf den Eintrittspreis.', { before: 120 }),
  p('Vor dem Besuch lohnt es sich, das ________ zu prüfen: Was läuft wann und wo? Im Theater gibt es meistens eine ________ nach einer Stunde, in der man ins Foyer gehen kann. Solche Veranstaltungen sind oft sehr ________ und bleiben lange in Erinnerung. Wichtig: Plätze für beliebte Veranstaltungen sollte man rechtzeitig ________ .', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — An der Theaterkasse: Dialog ergänzen'),
  infoBox(['Wörterkasten: verfügbar  |  empfehlen  |  Reihe  |  Ermäßigung  |  bezahlen  |  ausverkauft']),
  ...gap(1),
  p('Kunde: „Guten Tag. Haben Sie noch Karten für die Vorstellung am Freitagabend?"'),
  p('Kassiererin: „Freitag ist leider ________. Aber Samstag wäre noch ________."'),
  p('Kunde: „Samstag passt auch. Welche Plätze würden Sie ________?"'),
  p('Kassiererin: „Ich ________ Ihnen Reihe 5, Plätze 12 und 13 — gute Sicht und gute Akustik."'),
  p('Kunde: „Gibt es eine ________ für Studenten?"'),
  p('Kassiererin: „Ja, 20 Prozent mit Studentenausweis. Wie möchten Sie ________?"'),
  p('Kunde: „Mit Karte, bitte."'),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze: Ergänze das Relativpronomen'),
  p('Wähle das richtige Relativpronomen (der / die / das / den).'),
  p('a) Das ist der Film, ________ ich letztes Jahr gesehen habe.'),
  p('b) Wir haben das Theater besucht, ________ gerade renoviert wurde.'),
  p('c) Die Ausstellung, ________ wir besucht haben, war sehr modern.'),
  p('d) Der Schauspieler, ________ die Hauptrolle gespielt hat, war fantastisch.'),
  p('e) Das ist das Museum, ________ die größte Gemäldesammlung der Stadt hat.'),
  p('f) Die Regisseurin, ________ ich sehr bewundere, hat einen neuen Film gedreht.'),
  ...gap(1),
  h2('Aufgabe 4 — Meinungen ausdrücken: Adjektive zuordnen'),
  p('Welches Adjektiv passt zu welcher Meinung? Verbinde oder schreibe.'),
  stdTable(
    ['Meinung', 'Adjektiv (A–F)'],
    [
      ['Der Film hat mich sehr bewegt — ich hatte Tränen in den Augen.', ''],
      ['Die Ausstellung war kaum interessant — ich war froh, als sie vorbei war.', ''],
      ['Ich habe bei dem Stück so laut gelacht!', ''],
      ['Das Konzert war so aufregend — ich konnte kaum still sitzen.', ''],
      ['Der Schauspieler hat mich mit seiner Leistung wirklich überrascht.', ''],
      ['Das Museum war groß und beeindruckend — ich habe alles staunend angeschaut.', ''],
    ],
    [7000, 4706]
  ),
  infoBox(['A — langweilig  |  B — beeindruckend  |  C — lustig  |  D — bewegend  |  E — mitreißend  |  F — überraschend']),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Veranstaltungen besuchen'),
  h2('Aufgabe 1'),
  p('1. Vorstellung  2. Eintrittskarte  3. Reihe  4. Ausstellung  5. Führung'),
  p('6. Ermäßigung  7. Programm  8. Pause  9. beeindruckend  10. reservieren'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. ausverkauft  2. verfügbar  3. empfehlen  4. empfehle  5. Ermäßigung  6. bezahlen'),
  ...gap(1),
  h2('Aufgabe 3 — Relativpronomen'),
  p('a) den  (maskulin Akkusativ: den Film, den ich …)'),
  p('b) das  (neutral Nominativ: das Theater, das …)'),
  p('c) die  (feminin Akkusativ: die Ausstellung, die wir …)'),
  p('d) der  (maskulin Nominativ: der Schauspieler, der …)'),
  p('e) das  (neutral Nominativ: das Museum, das …)'),
  p('f) die  (feminin Akkusativ: die Regisseurin, die ich …)'),
  grammarBox([
    '📌  Relativpronomen — Tabelle:',
    '         Nom.   Akk.   Dat.',
    'mask.:   der    den    dem',
    'fem.:    die    die    der',
    'neutr.:  das    das    dem',
    'Plural:  die    die    denen',
    '❗ Verb immer ans Ende des Relativsatzes!',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Adjektive'),
  p('D — bewegend  |  A — langweilig  |  C — lustig  |  E — mitreißend  |  F — überraschend  |  B — beeindruckend'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Veranstaltungen besuchen — Wortliste'),
  h2('Teil A — Kino, Theater, Museum'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Vorstellung, -en', 'Nomen', 'Die Vorstellung beginnt um 20 Uhr.'],
      ['die Eintrittskarte, -n', 'Nomen', 'Ich kaufe die Eintrittskarten online.'],
      ['die Ermäßigung, -en', 'Nomen', 'Studenten bekommen eine Ermäßigung.'],
      ['die Pause, -n', 'Nomen', 'In der Pause trinken wir etwas im Foyer.'],
      ['die Ausstellung, -en', 'Nomen', 'Im Museum gibt es eine tolle Ausstellung.'],
      ['die Führung, -en', 'Nomen', 'Die Führung erklärt die Kunstwerke.'],
      ['das Foyer, -s', 'Nomen', 'Im Foyer kann man Getränke kaufen.'],
      ['die Reihe, -n', 'Nomen', 'Unsere Plätze sind in Reihe 7.'],
      ['reservieren', 'Verb', 'Ich habe die Plätze online reserviert.'],
      ['beeindruckend', 'Adj.', 'Die Bühnengestaltung war sehr beeindruckend.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Meinungen über Veranstaltungen'),
  stdTable(
    ['Adjektiv', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['spannend', 'aufregend, fesselnd', 'Der Thriller war sehr spannend.'],
      ['bewegend', 'emotional, zu Tränen rührend', 'Das war ein sehr bewegendes Stück.'],
      ['lustig', 'komisch, witzig', 'Die Komödie war total lustig.'],
      ['langweilig', 'uninteressant', 'Das Museum war leider etwas langweilig.'],
      ['mitreißend', 'begeisternd, packend', 'Das Konzert war absolut mitreißend.'],
      ['enttäuschend', 'nicht so gut wie erwartet', 'Der Film war leider enttäuschend.'],
      ['beeindruckend', 'großartig, imposant', 'Die Kulissen waren sehr beeindruckend.'],
      ['fesselnd', 'kann nicht wegsehen/weghören', 'Das Buch ist so fesselnd — ich kann nicht aufhören.'],
    ],
    [2800, 3000, 5906]
  ),
  ...gap(1),
  eventBox([
    '🎟  Typische Veranstaltungen in Deutschland:',
    'Kino: Blockbuster / Arthouse / Open-Air-Kino im Sommer',
    'Theater: Schauspiel / Oper / Musical / Kabarett',
    'Museum: Kunstmuseum / Naturkundemuseum / Technikmuseum / Sonderausstellung',
    'Konzert: Klassik / Pop / Jazz / Open-Air-Festival',
    'Tipp: Viele Städte haben eine Abendkasse — aber beliebte Veranstaltungen vorher reservieren!',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Vorstellung: ___________  |  die Ermäßigung: ___________  |  beeindruckend: ___________'),
  p('spannend: ___________  |  bewegend: ___________  |  reservieren: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Veranstaltungen besuchen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    '📌  Verben für Veranstaltungen:',
    'einen Film / ein Stück sehen / anschauen',
    'eine Ausstellung besuchen / sich ansehen',
    'Karten / Plätze reservieren / buchen / kaufen',
    'die Vorstellung genießen / verfolgen',
    'eine Führung machen / mitmachen',
    '',
    '📌  Meinung äußern:',
    'Ich fand den Film … / Das Stück war … / Die Ausstellung hat mir … gefallen.',
    'Was mir gut/nicht so gut gefallen hat: …',
    'Ich würde es (nicht) empfehlen, weil …',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Der Film, den ich letzte Woche gesehen habe, war sehr bewegend — ich habe sogar geweint.'),
  p('Die Ausstellung, die gerade im Kunstmuseum läuft, ist wirklich beeindruckend.'),
  p('Ich würde das Theater unbedingt empfehlen — die Schauspieler, die auf der Bühne stehen, sind fantastisch.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Veranstaltungen besuchen — Konversation'),
  h2('Aufgabe 1 — Dialog: Über eine Veranstaltung sprechen'),
  p('Zwei Personen erzählen sich von einer Veranstaltung, die sie besucht haben. Ergänzt den Dialog.'),
  infoBox([
    '💬  Erlebnis erzählen: Ich war letzte Woche in … / Ich habe … gesehen / besucht.',
    '    Meinung: Es war … / Ich fand es … / Was mich beeindruckt hat, war …',
    '    Nachfragen: Worum geht es? / Wer hat mitgespielt? / Würdest du es empfehlen?',
    '    Empfehlung: Du solltest das unbedingt … / Ich empfehle dir …',
  ]),
  ...gap(1),
  p('Person A: „Ich war am Wochenende im ________________________."'),
  p('Person B: „Ach wirklich? Was hast du gesehen / besucht?"'),
  p('Person A: „________________________. Es war ________________________."'),
  p('Person B: „Worum geht es / Was war das Thema?"'),
  p('Person A: „________________________."'),
  p('Person B: „Das klingt interessant. Was hat dir besonders gut gefallen?"'),
  p('Person A: „________________________, weil ________________________."'),
  p('Person B: „Und gab es etwas, das dir nicht gefallen hat?"'),
  p('Person A: „________________________."'),
  p('Person B: „Würdest du es empfehlen?"'),
  p('Person A: „________________________! ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: An der Theaterkasse'),
  stdTable(
    ['Kunde/Kundin (A)', 'Kassiererin / Kassierer (B)'],
    [
      ['Fragen Sie nach verfügbaren Karten für ein Stück Ihrer Wahl.', 'Nennen Sie verfügbare Termine und Plätze.'],
      ['Fragen Sie nach dem Preis und möglichen Ermäßigungen.', 'Erklären Sie Preise und Ermäßigungen (Studi / Senior / Gruppe).'],
      ['Wählen Sie Ihre Plätze (Reihe und Anzahl).', 'Bestätigen Sie die Wahl und fragen nach Zahlungsart.'],
      ['Bezahlen Sie und fragen nach dem Eingang / der Garderobe.', 'Geben Sie praktische Informationen zum Haus.'],
    ],
    [5703, 5703]
  ),
  eventBox([
    '🎭  Preisbeispiele Stadttheater:',
    'Kategorie A (vorne): 38 € (ermäßigt: 19 €)',
    'Kategorie B (Mitte): 26 € (ermäßigt: 13 €)',
    'Kategorie C (hinten): 16 € (ermäßigt: 8 €)',
    'Ermäßigt: Studenten, Senioren, Schwerbehinderte (mit Ausweis)',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Kultur und Veranstaltungen'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Welche Veranstaltungen besucht du gerne? (Kino / Theater / Konzert …)', ''],
      ['Was war die letzte Veranstaltung, die du besucht hast?', ''],
      ['Gibt es einen Film / ein Stück, das dich sehr beeindruckt hat?', ''],
      ['Wie ist das Kulturangebot in deiner Heimatstadt im Vergleich zu hier?', ''],
      ['Möchtest du eine typisch deutsche Veranstaltung besuchen? Welche?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: Filmkritik-Runde'),
  p('Jede Person beschreibt kurz einen Film / ein Stück / eine Ausstellung aus der Erinnerung — ohne den Titel zu nennen. Die anderen raten, was es ist.'),
  infoBox([
    '💡  Beschreibungsregeln:',
    '1. Genre: „Es ist ein Thriller / eine Komödie / ein Dokumentarfilm / ein Musical."',
    '2. Inhalt: „Es geht um … / Die Hauptfigur ist …"',
    '3. Meinung: „Ich fand es … / Es hat mich … / Die Szene, die …"',
    '4. Empfehlung: „Ich empfehle es / nicht, weil …"',
    '⏱  Maximal 5 Sätze — wer den Titel zuerst nennt, gewinnt!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Veranstaltungen besuchen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Veranstaltung konkret benannt (Name, Ort, Datum)'),
  bullet('Meinung mit Adjektiv + Begründung (weil)'),
  bullet('Mindestens 1 Relativsatz verwendet'),
  bullet('Empfehlung mit Konjunktiv II (Du solltest …)'),
  bullet('Natürlicher Gesprächsfluss'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Ich war am Samstag im Kino — ich habe den neuen Film von Fatih Akin gesehen."'),
  p('B: „Worum geht es?" / A: „Es geht um eine türkisch-deutsche Familie, die viele Probleme hat. Es war sehr bewegend."'),
  p('A: „Was mich besonders beeindruckt hat, war die Hauptdarstellerin, die so realistisch gespielt hat."'),
  p('A: „Ich würde ihn unbedingt empfehlen — du solltest ihn dir ansehen!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Kassengespräch'),
  p('A: „Haben Sie noch Karten für Freitag, die Vorstellung von Fidelio?"'),
  p('B: „Ja, in Kategorie B sind noch Plätze frei — 26 Euro, ermäßigt 13 Euro."'),
  p('A: „Gibt es eine Ermäßigung für Studenten?" / B: „Ja, mit Studentenausweis 50 %."'),
  p('A: „Dann hätte ich gerne zwei ermäßigte Karten in Reihe 8." / B: „Gerne. Bar oder Karte?"'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: vollständige Sätze, korrekte Relativsätze, Meinungsadjektive aus der Wortliste.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Veranstaltungen besuchen — Bildaufgaben'),
  h2('Aufgabe 1 — Veranstaltungsorte benennen'),
  p('[BILD 1: Vier Bilder nebeneinander: (1) Kinoleinwand mit Publikum, (2) Theaterbühne mit Schauspielern und Kulisse, (3) Museumsraum mit Gemälden an den Wänden, (4) Konzertsaal mit Orchester]'),
  p('a) Benenne jeden Ort und schreibe je einen Satz, was man dort macht.'),
  stdTable(
    ['Bild', 'Ort (mit Artikel)', 'Was macht man dort?'],
    [['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', '']],
    [800, 3500, 7406]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Veranstaltungsplakat lesen'),
  p('[BILD 2: Ein Konzertplakat: „Jazz Night im Kulturzentrum Köln" — Samstag, 14. Juni 2026, 20:00 Uhr — Einlass: 19:30 Uhr — Tickets: 22 € / ermäßigt 14 € — Kartenvorverkauf: online oder an der Abendkasse — Programm: 3 Bands, 2 Pausen — Adresse: Kulturzentrum Köln, Ehrenstraße 47]'),
  p('Beantworte die Fragen.'),
  p('a) Wann beginnt die Veranstaltung und wann öffnet der Einlass?'),
  wLine(),
  p('b) Was kostet eine normale Karte und eine ermäßigte?', { before: 120 }),
  wLine(),
  p('c) Wo kann man Karten kaufen?', { before: 120 }),
  wLine(),
  p('d) Du bist Student. Wie viel sparst du im Vergleich zum vollen Preis?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Theaterprogramm-Szene'),
  p('[BILD 3: Zwei Personen im Foyer eines Theaters — eine Person hält ein Programmheft, die andere schaut auf ihr Handy. Im Hintergrund: elegante Einrichtung, Garderobentresen, andere Theaterbesucher in festlicher Kleidung]'),
  p('a) Beschreibe die Szene in 2–3 Sätzen.'),
  wLine(), wLine(), wLine(),
  p('b) Was könnten die zwei Personen gerade besprechen? Schreibe 2–3 Dialogsätze.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Kinoticket lesen'),
  p('[BILD 4: Ein Kinoticket: Film: „Das stille Haus" (OmU), Datum: Freitag 25.04.2026, Uhrzeit: 20:30 Uhr, Saal 3, Reihe G, Platz 14, Preis: 11,50 €, Kino: Filmpalast Mainz]'),
  p('a) Wann und wo findet der Film statt?'),
  wLine(),
  p('b) Was bedeutet „OmU"? (Tipp: Original mit Untertiteln)', { before: 120 }),
  wLine(),
  p('c) Du möchtest dieselbe Vorstellung mit einem Freund besuchen. Wie viel zahlst du insgesamt?', { before: 120 }),
  wLine(),
  p('d) Schreibe einen Satz: Was erwartest du von diesem Film? (Relativsatz benutzen)', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Veranstaltungen besuchen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Veranstaltungsorte'),
  stdTable(
    ['Bild', 'Ort', 'Was macht man dort?'],
    [
      ['1', 'das Kino', 'Man sieht Filme auf einer großen Leinwand.'],
      ['2', 'das Theater', 'Man schaut Theaterstücke, Opern oder Musicals.'],
      ['3', 'das Museum', 'Man betrachtet Kunstwerke, Exponate und Ausstellungen.'],
      ['4', 'der Konzertsaal', 'Man hört klassische Musik oder andere Live-Konzerte.'],
    ],
    [800, 3500, 7406]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Konzertplakat'),
  p('a) Die Veranstaltung beginnt um 20:00 Uhr. Der Einlass ist um 19:30 Uhr.'),
  p('b) Eine normale Karte kostet 22 Euro, ermäßigt 14 Euro.'),
  p('c) Karten gibt es online oder an der Abendkasse.'),
  p('d) Als Student spart man 8 Euro (22 - 14 = 8 Euro).'),
  ...gap(1),
  h2('Aufgabe 3 — Theaterprogramm'),
  p('a) Zwei Personen stehen im eleganten Foyer eines Theaters. Eine Person liest das Programmheft, die andere schaut auf ihr Handy. Im Hintergrund sieht man andere Besucher in festlicher Kleidung.'),
  p('b) z. B.: A: „Was steht im Programm?" / B: „Das Stück dauert 2,5 Stunden mit einer Pause." / A: „Super, dann haben wir Zeit für ein Getränk."'),
  ...gap(1),
  h2('Aufgabe 4 — Kinoticket'),
  p('a) Der Film läuft am Freitag, 25. April 2026 um 20:30 Uhr im Filmpalast Mainz, Saal 3.'),
  p('b) OmU = Original mit Untertiteln — der Film läuft in der Originalsprache mit deutschen Untertiteln.'),
  p('c) Zwei Tickets: 2 × 11,50 € = 23,00 €.'),
  p('d) Beispiel: Das ist ein Film, der hoffentlich sehr spannend ist. / Das ist ein Film, den ich mir schon lange ansehen wollte.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
