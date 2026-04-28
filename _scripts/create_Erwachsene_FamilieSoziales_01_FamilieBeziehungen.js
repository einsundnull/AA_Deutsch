// A2_Erwachsene — Thema 08 UP 01: Über Familie und Beziehungen sprechen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Über Familie und Beziehungen sprechen';
const HEADING = 'Thema 08 — Familie & soziales Leben';
const SUBHEAD = 'UP 01: Über Familie und Beziehungen sprechen';
const PREFIX  = 'A2_Erwachsene_FamilieSoziales_01_FamilieBeziehungen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '08_FamilieSoziales', '01_FamilieBeziehungen');
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
const familyBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'AD1457' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'AD1457' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'AD1457' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'AD1457' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FCE4EC' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Über Familie und Beziehungen sprechen — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Familie und Beziehungen:',
    'Familienmitglieder: der/die Verwandte, die Geschwister, der Schwager / die Schwägerin',
    'Beziehungen: verheiratet sein / verlobt sein / zusammenleben / sich trennen / geschieden sein',
    'Über Charaktereigenschaften: Er ist geduldig / hilfsbereit / zuverlässig / temperamentvoll.',
    'Relativsätze: Meine Schwester, die in Wien wohnt, … / Mein Bruder, den ich sehr vermisse, …',
    'seit + Dativ: Wir sind seit drei Jahren verheiratet.',
    'Possessivpronomen (Dativ): mit meinem Vater / von meiner Mutter / bei unseren Eltern',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Meine Familie beschreiben'),
  p('Beschreiben Sie ein Familienmitglied in 3–4 Sätzen. Benutzen Sie einen Relativsatz und Charaktereigenschaften.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Familienstruktur erklären'),
  p('Schreiben Sie 4–5 Sätze über Ihre Familie oder eine fiktive Familie. Beantworten Sie:'),
  bullet('Wie viele Personen gehören zu Ihrer Kernfamilie?'),
  bullet('Wo wohnen Ihre Familienmitglieder?'),
  bullet('Was machen sie beruflich?'),
  bullet('Wie oft sehen Sie sich?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Possessivpronomen im Dativ'),
  grammarBox([
    'Possessivpronomen im Dativ:',
    'mask./neutr.:  mit meinem Vater / Bruder / Kind',
    'feminin:       mit meiner Mutter / Schwester / Tante',
    'Plural:        mit meinen Eltern / Geschwistern / Freunden',
    'Kurzform: „bei meinen Eltern" = zu Hause bei meinen Eltern',
  ]),
  ...gap(1),
  p('Ergänze das Possessivpronomen im Dativ (mein-/dein-/sein-/ihr- usw.).'),
  p('a) Ich wohne noch bei ________ Eltern — sie leben in Hamburg.'),
  p('b) Meine Schwester hat sich von ________ Mann getrennt.'),
  p('c) Er versteht sich sehr gut mit ________ Schwiegermutter.'),
  p('d) Wir besuchen ________ Großeltern jeden Sommer in Polen.'),
  p('e) Hast du ein gutes Verhältnis zu ________ Geschwistern?'),
  p('f) Sie kümmert sich liebevoll um ________ kleinen Sohn.'),
  ...gap(1),
  h2('Aufgabe 4 — Brief an eine Freundin / einen Freund'),
  p('Sie haben gerade Neuigkeiten aus Ihrer Familie gehört. Schreiben Sie einen kurzen Brief oder eine Nachricht (5–6 Sätze) an eine gute Freundin / einen guten Freund. Erzählen Sie von einem Familienereignis (Hochzeit, Geburt, Umzug, Jubiläum …) und Ihren Gefühlen dazu.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Familie und Beziehungen'),
  grammarBox([
    'Possessivpronomen — Übersicht Dativ:',
    '           mask./neutr.   feminin    Plural',
    'mein-:     meinem         meiner     meinen',
    'dein-:     deinem         deiner     deinen',
    'sein-:     seinem         seiner     seinen',
    'ihr-:      ihrem          ihrer      ihren',
    'unser-:    unserem        unserer    unseren',
    'Ihr-:      Ihrem          Ihrer      Ihren',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antwort'),
  p('Mein älterer Bruder Tomás, der seit fünf Jahren in Berlin lebt, ist Ingenieur. Er ist sehr zuverlässig und hilfsbereit — wenn ich ein Problem habe, rufe ich immer ihn an. Leider sehen wir uns nur zweimal im Jahr, aber wir schreiben uns jeden Tag Nachrichten.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Familienvorstellung'),
  p('Meine Kernfamilie besteht aus vier Personen: meinen Eltern, meiner jüngeren Schwester und mir. Meine Eltern wohnen noch in Warschau, wo mein Vater als Arzt und meine Mutter als Lehrerin arbeitet. Meine Schwester studiert in Krakau. Wir sehen uns meistens zu Weihnachten und im Sommer — manchmal skypen wir auch unter der Woche.'),
  ...gap(1),
  h2('Aufgabe 3 — Possessivpronomen Dativ'),
  p('a) bei meinen Eltern  (Pl. Dat.)'),
  p('b) von ihrem Mann  (mask. Dat. — sie = Schwester)'),
  p('c) mit seiner Schwiegermutter  (fem. Dat.)'),
  p('d) unsere Großeltern  (hier Akk. — besuchen → wen?)'),
  p('e) zu deinen Geschwistern  (Pl. Dat.)'),
  p('f) um ihren kleinen Sohn  (mask. Akk. — sich kümmern um → wen?)'),
  p('Hinweis: d) und f) sind Akkusativ — darauf achten, dass Schüler den richtigen Kasus erkennen!', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Brief'),
  bullet('Informeller Ton (du-Form), aber vollständige Sätze'),
  bullet('Ereignis konkret benannt und beschrieben'),
  bullet('Gefühle ausgedrückt: Ich freue mich so sehr! / Das war eine Überraschung.'),
  bullet('Mindestens ein Relativsatz: Meine Schwester, die … / Das Baby, das …'),
  bullet('seit + Dativ oder Perfekt korrekt eingesetzt'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Familie und Beziehungen sprechen — Leseübung'),
  h2('Text: Amiras Familie in zwei Ländern'),
  p('Amira Benali kommt aus Tunesien und lebt seit vier Jahren in Stuttgart. Sie arbeitet als Ärztin in einem Krankenhaus und ist seit zwei Jahren mit ihrem Mann Karim verheiratet, der ebenfalls aus Tunesien stammt und als Ingenieur bei einer deutschen Firma arbeitet. Die beiden haben eine kleine Tochter namens Yasmin — sie ist gerade eineinhalb Jahre alt.'),
  p('Amiras Eltern leben noch in Tunis. Ihr Vater, der früher als Lehrer gearbeitet hat, ist jetzt im Ruhestand. Ihre Mutter kümmert sich hauptsächlich um den Haushalt und die Gartenpflege. Amira vermisst ihre Eltern sehr, besonders ihre Mutter, mit der sie jeden Sonntag telefoniert. „Sie fragt immer zuerst nach Yasmin", lacht Amira.'),
  p('Karim hat eine ältere Schwester namens Leila, die in Frankreich wohnt und als Übersetzerin arbeitet. Die Geschwister sind sich sehr ähnlich — beide sind ruhig, fleißig und zuverlässig. Einmal im Jahr fliegen Amira und Karim mit Yasmin nach Tunesien, um die ganze Familie zu treffen. „Das ist jedes Mal wie ein kleines Fest", sagt Amira. „Meine Mutter kocht tagelang vor."'),
  p('In Stuttgart hat Amira auch eine enge Freundin, Elena, die aus Rumänien kommt. Die beiden haben sich im Krankenhaus kennengelernt und verstehen sich sehr gut. „Elena ist wie eine Schwester für mich — sie ist die erste Person, die ich anrufe, wenn ich Hilfe brauche", sagt Amira. Für sie ist Familie nicht nur Blutsverwandtschaft, sondern auch enge Freundschaft.'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Amira ist seit vier Jahren mit Karim verheiratet.', ''],
      ['Karims Eltern leben in Tunesien.', ''],
      ['Amira telefoniert jeden Sonntag mit ihrer Mutter.', ''],
      ['Karims Schwester Leila wohnt in Deutschland.', ''],
      ['Amira und Karim besuchen ihre Familien einmal im Jahr.', ''],
      ['Elena kommt aus Polen und arbeitet im gleichen Krankenhaus.', ''],
      ['Für Amira gehören auch enge Freunde zur Familie.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Beschreiben Sie Amiras Eltern kurz. Was machen sie?'),
  wLine(), wLine(),
  p('b) Wie sind Karim und seine Schwester Leila charakterlich?', { before: 120 }),
  wLine(),
  p('c) Warum beschreibt Amira den Familienbesuch in Tunesien als „kleines Fest"?', { before: 120 }),
  wLine(),
  p('d) Warum ist Elena für Amira wie eine Schwester?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Familien-Stammbaum ergänzen'),
  p('Fülle die Tabelle mit Informationen aus dem Text aus.'),
  stdTable(
    ['Person', 'Beziehung zu Amira', 'Wohnort', 'Beruf / Info'],
    [
      ['Karim', '', '', ''],
      ['Yasmin', '', '', ''],
      ['Amiras Vater', '', '', ''],
      ['Amiras Mutter', '', '', ''],
      ['Leila', '', '', ''],
      ['Elena', '', '', ''],
    ],
    [2500, 2500, 2500, 4206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Familie und Beziehungen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Amira ist seit vier Jahren mit Karim verheiratet.', 'F (seit zwei Jahren)'],
      ['Karims Eltern leben in Tunesien.', 'F (nicht erwähnt — Karims Schwester ist in Frankreich)'],
      ['Amira telefoniert jeden Sonntag mit ihrer Mutter.', 'R'],
      ['Karims Schwester Leila wohnt in Deutschland.', 'F (in Frankreich)'],
      ['Amira und Karim besuchen ihre Familien einmal im Jahr.', 'R'],
      ['Elena kommt aus Polen und arbeitet im gleichen Krankenhaus.', 'F (aus Rumänien)'],
      ['Für Amira gehören auch enge Freunde zur Familie.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Ihr Vater ist pensionierter Lehrer. Ihre Mutter kümmert sich um den Haushalt und Garten.'),
  p('b) Beide sind ruhig, fleißig und zuverlässig.'),
  p('c) Amiras Mutter kocht tagelang vor — es ist ein besonderer, festlicher Anlass mit der ganzen Familie.'),
  p('d) Elena ist die erste Person, die Amira bei Problemen anruft — sie versteht sich mit ihr wie mit einer Schwester.'),
  ...gap(1),
  h2('Aufgabe 3 — Stammbaum-Tabelle'),
  stdTable(
    ['Person', 'Beziehung', 'Wohnort', 'Beruf / Info'],
    [
      ['Karim', 'Ehemann', 'Stuttgart', 'Ingenieur'],
      ['Yasmin', 'Tochter', 'Stuttgart', '1,5 Jahre alt'],
      ['Amiras Vater', 'Vater', 'Tunis', 'pensionierter Lehrer'],
      ['Amiras Mutter', 'Mutter', 'Tunis', 'Haushalt / Garten'],
      ['Leila', 'Schwägerin (Karims Schwester)', 'Frankreich', 'Übersetzerin'],
      ['Elena', 'enge Freundin', 'Stuttgart', 'Ärztin (gleiches KH)'],
    ],
    [2500, 2500, 2500, 4206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Familie und Beziehungen sprechen — Lückentext'),
  infoBox([
    'Wörterkasten: verheiratet  |  Geschwister  |  versteht sich  |  Verwandte  |  vermisst',
    '              getrennt  |  Schwiegermutter  |  aufgewachsen  |  Einzelkind  |  Haushalt'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Familientext: Fülle die Lücken aus'),
  p('Jede Familie ist anders. Manche Menschen haben viele ________ — Brüder, Schwestern, Cousins und Cousinen. Andere sind ________ und haben keine Geschwister. Wenn man heiratet, bekommt man neue ________ — zum Beispiel eine ________ oder einen Schwiegervater.'),
  p('Wer im Ausland lebt, ________ oft die Familie zu Hause. Man ________ zwar regelmäßig, aber es ist nicht dasselbe wie persönliche Treffen. Manche Familien führen einen gemeinsamen ________ — jeder hilft beim Kochen, Putzen und Einkaufen.', { before: 120 }),
  p('Manchmal trennen sich Paare, und die Familie ________ sich. Trotzdem ________ man ________ oft noch gut, besonders wenn gemeinsame Kinder da sind. Viele Menschen sind in einer kleinen Stadt ________, haben aber inzwischen die Familie über ganz Europa verteilt.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Über die Familie sprechen: Dialog ergänzen'),
  infoBox(['Wörterkasten: Einzelkind  |  ausgekommen  |  vermisse  |  kümmert sich  |  aufgewachsen  |  ähnlich']),
  ...gap(1),
  p('Person A: „Hast du Geschwister?"'),
  p('Person B: „Nein, ich bin ________. Und du?"'),
  p('Person A: „Ich habe einen älteren Bruder. Wir sind zusammen in einer kleinen Stadt ________."'),
  p('Person B: „Versteht ihr euch gut?"'),
  p('Person A: „Ja, wir sind uns charakterlich sehr ________ — beide ruhig und ordentlich. Früher haben wir manchmal gestritten, aber insgesamt sind wir immer gut ________."'),
  p('Person B: „Vermisst du deine Familie?"'),
  p('Person A: „Ja, ich ________ meine Mutter am meisten. Sie ________ sich immer um alle — sie ist das Herz der Familie."'),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze: Familienmitglieder beschreiben'),
  grammarBox([
    'Relativsätze — Erinnerung:',
    'mask. Nom.: der Vater, der …     mask. Akk.: den Vater, den ich …',
    'fem. Nom.:  die Mutter, die …    fem. Akk.:  die Mutter, die ich …',
    'neutr. Nom.: das Kind, das …     neutr. Akk.: das Kind, das ich …',
    'Verb steht immer am Ende des Relativsatzes!',
  ]),
  ...gap(1),
  p('Verbinde die zwei Sätze zu einem Relativsatz.'),
  p('a) Meine Schwester wohnt in Wien. Ich rufe sie jede Woche an.'),
  wLine(), wLine(),
  p('b) Mein Bruder ist Arzt. Er hilft immer allen in der Familie.', { before: 120 }),
  wLine(), wLine(),
  p('c) Unsere Tante kommt aus Portugal. Wir sehen sie einmal im Jahr.', { before: 120 }),
  wLine(), wLine(),
  p('d) Das Baby ist gerade drei Monate alt. Es schläft die ganze Nacht durch.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Präteritum von sein und haben'),
  grammarBox([
    'Präteritum (Vergangenheit in Texten / Erzählungen):',
    'sein:  ich war / du warst / er-sie-es war / wir waren / ihr wart / sie-Sie waren',
    'haben: ich hatte / du hattest / er hatte / wir hatten / ihr hattet / sie hatten',
    'Verwendung: für Zustände und Fakten in der Vergangenheit (schriftlich und mündlich)',
  ]),
  ...gap(1),
  p('Ergänze war / waren / hatte / hatten.'),
  p('a) Als Kind ________ ich drei Geschwister — jetzt wohnen alle in verschiedenen Städten.'),
  p('b) Meine Großeltern ________ ein großes Haus auf dem Land.'),
  p('c) Früher ________ wir jeden Sonntag zusammen beim Mittagessen.'),
  p('d) Mein Vater ________ sehr streng, aber auch sehr fair.'),
  p('e) Die Kinder ________ damals noch klein und ________ keine Smartphones.'),
  p('f) Es ________ eine glückliche Zeit, obwohl wir nicht viel Geld ________.'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Familie und Beziehungen'),
  h2('Aufgabe 1'),
  p('1. Geschwister  2. Einzelkind  3. Verwandte  4. Schwiegermutter  5. vermisst'),
  p('6. versteht sich  7. Haushalt  8. getrennt  9. ausgekommen / versteht sich  10. aufgewachsen'),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Einzelkind  2. aufgewachsen  3. ähnlich  4. ausgekommen  5. vermisse  6. kümmert sich'),
  ...gap(1),
  h2('Aufgabe 3 — Relativsätze'),
  p('a) Meine Schwester, die in Wien wohnt, rufe ich jede Woche an.'),
  p('   (oder: Meine Schwester, die ich jede Woche anrufe, wohnt in Wien.)'),
  p('b) Mein Bruder, der Arzt ist, hilft immer allen in der Familie.'),
  p('c) Unsere Tante, die aus Portugal kommt, sehen wir einmal im Jahr.'),
  p('d) Das Baby, das gerade drei Monate alt ist, schläft die ganze Nacht durch.'),
  grammarBox([
    'Relativpronomen — Kurzübersicht:',
    'Der Vater, der … (Nom.) / den ich … (Akk.) / dem ich … (Dat.)',
    'Die Mutter, die … (Nom./Akk.) / der ich … (Dat.)',
    'Das Kind, das … (Nom./Akk.) / dem ich … (Dat.)',
    'Verb ans Ende! Trennbare Verben bleiben zusammen: die ich anrufe / das schläft.',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Präteritum'),
  p('a) hatte  b) hatten  c) waren  d) war  e) waren / hatten  f) war / hatten'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Familie und Beziehungen sprechen — Wortliste'),
  h2('Teil A — Familienmitglieder und Beziehungen'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['der/die Verwandte, -n', 'Nomen', 'Ich habe viele Verwandte in der Türkei.'],
      ['die Geschwister (Pl.)', 'Nomen', 'Ich habe zwei Geschwister — einen Bruder und eine Schwester.'],
      ['der Schwager / die Schwägerin', 'Nomen', 'Mein Schwager arbeitet als Lehrer.'],
      ['die Schwiegermutter / der Schwiegervater', 'Nomen', 'Meine Schwiegermutter wohnt bei uns.'],
      ['verheiratet / verlobt sein', 'Adj./Verb', 'Wir sind seit zwei Jahren verheiratet.'],
      ['sich trennen (von)', 'Verb (refl.)', 'Sie hat sich von ihrem Mann getrennt.'],
      ['das Einzelkind, -er', 'Nomen', 'Er ist Einzelkind — er hat keine Geschwister.'],
      ['aufwachsen (trennb.)', 'Verb', 'Ich bin in einer kleinen Stadt aufgewachsen.'],
      ['sich kümmern um', 'Verb (refl.)', 'Sie kümmert sich liebevoll um ihre Eltern.'],
      ['vermissen', 'Verb', 'Ich vermisse meine Familie sehr.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Charaktereigenschaften und Beziehungsbeschreibung'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['geduldig', 'ruhig, wartet gern', 'Meine Mutter ist sehr geduldig mit den Kindern.'],
      ['zuverlässig', 'man kann sich drauf verlassen', 'Er ist zuverlässig — er kommt immer pünktlich.'],
      ['hilfsbereit', 'hilft gerne', 'Meine Nachbarin ist sehr hilfsbereit.'],
      ['temperamentvoll', 'lebhaft, emotional', 'Sie ist temperamentvoll und lacht viel.'],
      ['sich (gut) verstehen mit', 'gute Beziehung haben', 'Ich verstehe mich gut mit meiner Schwiegermutter.'],
      ['auskommen mit', 'gut miteinander leben', 'Früher bin ich gut mit meinem Bruder ausgekommen.'],
      ['eng befreundet sein', 'sehr gute Freundschaft', 'Wir sind seit der Schule eng befreundet.'],
      ['im Ruhestand sein', 'pensioniert sein', 'Mein Vater ist seit fünf Jahren im Ruhestand.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  familyBox([
    'Familien in Deutschland — ein paar Fakten:',
    'Durchschnittliche Kinderzahl: ca. 1,5 Kinder pro Frau (2024)',
    'Patchworkfamilien (getrennte/geschiedene Eltern mit neuen Partnern) nehmen zu.',
    'Viele junge Erwachsene wohnen erst mit 25–28 Jahren aus.',
    'Großeltern spielen oft eine wichtige Rolle bei der Kinderbetreuung.',
    'Familien mit Migrationshintergrund: ca. 27 % der Bevölkerung in Deutschland.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Geschwister: ___________  |  verheiratet: ___________  |  vermissen: ___________'),
  p('zuverlässig: ___________  |  sich kümmern um: ___________  |  aufwachsen: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Familie und Beziehungen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Reflexive Verben rund um Familie:',
    'sich trennen (von):    Ich trenne mich von ihm. / Sie hat sich getrennt.',
    'sich kümmern (um):     Er kümmert sich um die Kinder.',
    'sich verstehen (mit):  Wir verstehen uns gut.',
    'sich ähneln:           Die Geschwister ähneln sich sehr.',
    'sich verloben (mit):   Sie haben sich verlobt.',
    'sich scheiden lassen:  Sie lassen sich scheiden.',
    '',
    'Perfekt mit haben: sich getrennt / sich gekümmert / sich verstanden',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Mein Vater, der seit letztem Jahr im Ruhestand ist, kümmert sich jetzt um den Garten.'),
  p('Ich vermisse meine Geschwister — wir sind alle gut miteinander ausgekommen, solange wir zusammen gewohnt haben.'),
  p('Sie ist sehr zuverlässig und hilfsbereit — man kann sich immer auf sie verlassen.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Familie und Beziehungen sprechen — Konversation'),
  h2('Aufgabe 1 — Dialog: Über die Familie erzählen'),
  p('Zwei Personen stellen sich gegenseitig ihre Familien vor. Ergänzt den Dialog.'),
  infoBox([
    'Familie vorstellen: Ich habe … Geschwister / Meine Familie besteht aus …',
    'Charakterbeschreibung: Er/Sie ist sehr … / Wir sind uns ähnlich / verschieden.',
    'Beziehung: Wir verstehen uns gut / nicht immer / sehr gut.',
    'Entfernung: Wir wohnen weit voneinander entfernt / in der Nähe.',
    'Relativsatz: Meine Mutter, die … / Mein Bruder, den ich …',
  ]),
  ...gap(1),
  p('Person A: „Erzähl mir etwas über deine Familie. Hast du Geschwister?"'),
  p('Person B: „Ja, ich habe ________ Geschwister — ________ und ________."'),
  p('Person A: „Verstehst du dich gut mit ihnen?"'),
  p('Person B: „Ja, besonders mit ________, ________ in ________ wohnt. Wir ________."'),
  p('Person A: „Und deine Eltern — was machen sie?"'),
  p('Person B: „Mein Vater ________ und meine Mutter ________. Sie sind ________ Jahre alt."'),
  p('Person A: „Vermisst du sie?"'),
  p('Person B: „Ja, sehr. Besonders ________, weil ________."'),
  p('Person A: „Das kenne ich gut — bei mir ist es ähnlich. Meine Familie ________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Familienfoto beschreiben'),
  p('[Stellen Sie sich vor, Sie zeigen jemandem ein Foto Ihrer Familie auf Ihrem Handy.]'),
  stdTable(
    ['Person A — zeigt das Foto', 'Person B — fragt nach'],
    [
      ['Zeigen Sie das Foto und stellen Sie die Personen vor.', 'Fragen Sie nach Namen, Alter, Beruf.'],
      ['Beschreiben Sie die Charaktereigenschaften einer Person.', 'Fragen Sie, wie Ihre Beziehung zu dieser Person ist.'],
      ['Erzählen Sie eine kurze Anekdote über die Familie.', 'Reagieren Sie und stellen Sie eine Folgefrage.'],
    ],
    [5703, 5703]
  ),
  familyBox([
    'Nützliche Redemittel zur Familienbeschreibung:',
    'Das ist meine …, die … / Das sind meine Eltern, die …',
    'Sie/Er sieht meiner Mutter / meinem Vater ähnlich.',
    'Wir streiten uns manchmal, aber im Großen und Ganzen kommen wir gut aus.',
    'Sie ist die Person in der Familie, auf die ich mich immer verlassen kann.',
    'Er war schon immer der Humorvollste / Ruhigste / Sportlichste in der Familie.',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Meine Familie'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Aus wie vielen Personen besteht Ihre Kernfamilie?', ''],
      ['Haben Sie Geschwister? Verstehen Sie sich gut?', ''],
      ['Wie oft sehen Sie Ihre Familie? Wie halten Sie Kontakt?', ''],
      ['Welches Familienmitglied ist Ihnen am ähnlichsten?', ''],
      ['Was bedeutet Familie für Sie persönlich?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Wer bin ich?"'),
  p('Eine Person beschreibt ein Familienmitglied (oder eine bekannte Figur aus Film/Literatur) — die anderen raten, wer es ist.'),
  infoBox([
    'Beschreibungsregeln — nur diese Infos erlaubt:',
    '1. Beziehung zur beschreibenden Person: Sie ist meine … / Er ist …',
    '2. Charaktereigenschaften (3 Adjektive)',
    '3. Beruf oder Hobby',
    '4. Ein Relativsatz: Er ist jemand, der … / Sie ist die Person, die …',
    'Nicht erlaubt: Name oder sehr spezifische Fakten nennen!',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Familie und Beziehungen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Geschwisterzahl und Namen / Charakterisierung genannt'),
  bullet('Relativsatz korrekt gebildet (Verb am Ende)'),
  bullet('Possessivpronomen korrekt (mit meiner Mutter / bei meinen Eltern)'),
  bullet('Gefühle ausgedrückt (vermissen, freuen, schätzen)'),
  bullet('Präteritum für Vergangenheit: Als Kind waren wir … / Wir hatten …'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Hast du Geschwister?" / B: „Ja, ich habe zwei Geschwister — einen Bruder und eine Schwester."'),
  p('B: „Besonders gut verstehe ich mich mit meiner Schwester, die in Madrid wohnt. Wir skypen jede Woche."'),
  p('A: „Und deine Eltern?" / B: „Mein Vater ist Pensionär und meine Mutter arbeitet noch als Krankenschwester."'),
  p('B: „Ich vermisse sie sehr, besonders meine Mutter, weil sie sich immer um alle gekümmert hat."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Relativsätze korrekt gebildet, Possessivpronomen im richtigen Kasus, Präteritum von sein/haben bei Vergangenheitserzählungen.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Über Familie und Beziehungen sprechen — Bildaufgaben'),
  h2('Aufgabe 1 — Familienstammbaum lesen'),
  p('[BILD 1: Ein Familienstammbaum mit vier Generationen: Oben: Großvater Hans (78) + Großmutter Inge (75). Mitte links: Sohn Karl (52, Arzt) + Ehefrau Maria (49, Lehrerin). Mitte rechts: Tochter Petra (48) — geschieden. Unten links: Karls Kinder: Julia (22, Studentin) + Felix (18, Schüler). Unten rechts: Petras Sohn: Lukas (14, Schüler).]'),
  p('a) Wie viele Personen gehören zu dieser Familie?'),
  wLine(),
  p('b) Was ist die Beziehung zwischen Julia und Lukas?', { before: 120 }),
  wLine(),
  p('c) Wer ist Marias Schwiegervater?', { before: 120 }),
  wLine(),
  p('d) Schreibe zwei Sätze über diese Familie mit Relativsätzen.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Familienfoto beschreiben'),
  p('[BILD 2: Ein Familienfoto beim Weihnachtsessen: Eine Gruppe von ca. 8 Personen verschiedenen Alters sitzt am festlich gedeckten Tisch — Großeltern, Eltern, junge Erwachsene und ein kleines Kind. Alle lachen und schauen in die Kamera.]'),
  p('a) Beschreibe das Bild in 2–3 Sätzen: Wer ist zu sehen? Was machen die Personen?'),
  wLine(), wLine(), wLine(),
  p('b) Welche Familienmitglieder kannst du vermuten? Schreibe 3 Sätze mit Relativsätzen.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Annonce lesen'),
  p('[BILD 3: Eine Heiratsanzeige in einer Zeitung: „Wir haben geheiratet! Ahmad Karimi (32) und Lisa Bauer (29) geben ihre Hochzeit bekannt. Gefeiert wird am 15. Juni 2026 mit Familie und Freunden in Frankfurt. Wir freuen uns über Glückwünsche!"]'),
  p('a) Was erfährst du aus der Anzeige? Nenne vier Informationen.'),
  wLine(), wLine(),
  p('b) Schreibe einen Glückwunsch-Satz an das Brautpaar (mit Konjunktiv II oder Futur I).', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Postkarte von Verwandten lesen'),
  p('[BILD 4: Eine handgeschriebene Postkarte: „Liebe Elena! Wir sind jetzt seit drei Wochen in unserer neuen Wohnung in München. Die Kinder gewöhnen sich langsam ein — Mia geht schon in den Kindergarten und Max hat zwei neue Freunde gefunden. Wir vermissen euch sehr! Bitte besucht uns bald. Herzliche Grüße, Deine Schwester Anna"]'),
  p('a) Was hat sich für Annas Familie verändert?'),
  wLine(),
  p('b) Wie geht es den Kindern?', { before: 120 }),
  wLine(),
  p('c) Schreibe eine kurze Antwort an Anna (3–4 Sätze).', { before: 120 }),
  wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Familie und Beziehungen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Stammbaum'),
  p('a) 8 Personen: Hans, Inge, Karl, Maria, Petra, Julia, Felix, Lukas.'),
  p('b) Julia und Lukas sind Cousine und Cousin (ihre Mütter Maria und Petra sind Schwestern / ihre Väter Geschwister).'),
  p('c) Marias Schwiegervater ist Hans (Karls Vater).'),
  p('d) Beispiele: Karl, der als Arzt arbeitet, ist mit Maria verheiratet. / Petra, die geschieden ist, hat einen Sohn namens Lukas.'),
  ...gap(1),
  h2('Aufgabe 2 — Familienfoto'),
  p('a) Das Foto zeigt eine große Familie beim Weihnachtsessen. Alle sitzen am festlich gedeckten Tisch und lächeln in die Kamera. Man sieht verschiedene Generationen — von Großeltern bis zu einem kleinen Kind.'),
  p('b) Beispiele: Das ist die Oma, die das Essen vorbereitet hat. / Das sind die Eltern, die in der Mitte sitzen. / Das ist das Kind, das am Ende des Tisches sitzt.'),
  ...gap(1),
  h2('Aufgabe 3 — Heiratsanzeige'),
  p('a) Namen: Ahmad Karimi und Lisa Bauer. Alter: 32 und 29. Datum: 15. Juni 2026. Ort: Frankfurt.'),
  p('b) Beispiele: Ich wünsche euch viel Glück und Liebe! / Möge eure Ehe lang und glücklich sein! / Ich freue mich sehr für euch und wünsche euch alles Gute!'),
  ...gap(1),
  h2('Aufgabe 4 — Postkarte'),
  p('a) Die Familie ist nach München umgezogen und wohnt jetzt in einer neuen Wohnung.'),
  p('b) Mia geht in den Kindergarten, Max hat zwei neue Freunde gefunden — beide gewöhnen sich ein.'),
  p('c) Individuelle Antworten — Beispiel: Liebe Anna! Wir freuen uns, dass ihr euch gut eingelebt habt. Es klingt wunderbar, dass die Kinder schon neue Freunde gefunden haben. Wir kommen euch bestimmt bald besuchen! Liebe Grüße, Elena'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
