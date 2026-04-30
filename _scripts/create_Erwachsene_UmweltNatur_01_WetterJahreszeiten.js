// A2_Erwachsene — Thema 10 UP 01: Wetter und Jahreszeiten
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Wetter und Jahreszeiten';
const HEADING = 'Thema 10 — Umwelt & Natur';
const SUBHEAD = 'UP 01: Wetter und Jahreszeiten';
const PREFIX  = 'A2_Erwachsene_UmweltNatur_01_WetterJahreszeiten';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '10_UmweltNatur', '01_WetterJahreszeiten');
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
const weatherBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '0288D1' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '0288D1' }, left: { style: BorderStyle.SINGLE, size: 12, color: '0288D1' }, right: { style: BorderStyle.SINGLE, size: 12, color: '0288D1' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E3F2FD' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Wetter und Jahreszeiten — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Wetter und Jahreszeiten:',
    'Wetter beschreiben: Es ist sonnig / regnerisch / bewölkt / windig / neblig.',
    'Es regnet / schneit / friert. / Es gibt ein Gewitter / Sturm.',
    'Temperatur: Es sind 20 Grad / minus 5 Grad. / Heute ist es heiß / kalt / mild.',
    'Jahreszeiten: im Frühling / im Sommer / im Herbst / im Winter',
    'Vorhersage: Morgen wird es regnen. / Es soll schneien. / Die Temperatur fällt / steigt.',
    'Aktivitäten: bei schönem Wetter / bei Regen / wenn die Sonne scheint',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Wetter heute beschreiben'),
  p('Schauen Sie aus dem Fenster und beschreiben Sie das aktuelle Wetter (3–4 Sätze): Temperatur, Bewölkung, Niederschlag und wie Sie sich anziehen sollten.'),
  wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Lieblingsjahreszeit'),
  p('Welche Jahreszeit mögen Sie am liebsten? Schreiben Sie 4–5 Sätze. Beantworten Sie: Welche Monate? Welches Wetter ist typisch? Was machen Sie gerne in dieser Jahreszeit? Warum mögen Sie sie?'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Futur I für Wettervorhersage'),
  grammarBox([
    'Wettervorhersage — typische Zeitformen:',
    'Futur I:    Morgen wird es regnen. / Es wird windig sein.',
    'Präsens:    Morgen regnet es. / Übermorgen scheint die Sonne.',
    'Modal sollen (Vermutung): Es soll am Wochenende sonnig werden.',
    'Achtung: „werden" auf Position 2, Infinitiv ans Ende!',
  ]),
  ...gap(1),
  p('Schreibe Sätze im Futur I.'),
  p('a) Morgen / regnen / den ganzen Tag → '),
  wLine(),
  p('b) Am Wochenende / die Temperatur / steigen → ', { before: 120 }),
  wLine(),
  p('c) Im Norden / es / windig sein → ', { before: 120 }),
  wLine(),
  p('d) Übermorgen / die Sonne / scheinen → ', { before: 120 }),
  wLine(),
  p('e) In der Nacht / es / kalt werden → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Vergleich: Wetter in zwei Ländern'),
  p('Vergleichen Sie das Wetter in Deutschland mit dem Wetter in Ihrer Heimat (5–6 Sätze). Benutzen Sie: während / im Gegensatz zu / kälter/wärmer als / länger/kürzer als.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Wetter und Jahreszeiten'),
  grammarBox([
    'Komparativ und Superlativ — Wettervokabular:',
    'kalt → kälter → am kältesten',
    'warm → wärmer → am wärmsten',
    'heiß → heißer → am heißesten',
    'mild → milder → am mildesten',
    'lang → länger → am längsten',
    'kurz → kürzer → am kürzesten',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antwort'),
  p('Heute ist es bewölkt und etwa 12 Grad. Es regnet leicht und der Wind ist kühl. Man sollte einen Regenschirm und eine warme Jacke mitnehmen. Typisches Aprilwetter — sehr unbeständig!'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Lieblingsjahreszeit'),
  p('Meine Lieblingsjahreszeit ist der Herbst. Die Monate September, Oktober und November sind in Deutschland besonders schön — die Blätter werden bunt und es ist nicht zu warm. Ich gehe gerne im Wald spazieren, weil die Luft frisch und sauber ist. Außerdem mag ich es, abends mit einer warmen Decke und einem Tee auf dem Sofa zu sitzen. Der Herbst ist für mich die perfekte Übergangszeit.'),
  ...gap(1),
  h2('Aufgabe 3 — Futur I'),
  p('a) Morgen wird es den ganzen Tag regnen.'),
  p('b) Am Wochenende wird die Temperatur steigen.'),
  p('c) Im Norden wird es windig sein.'),
  p('d) Übermorgen wird die Sonne scheinen.'),
  p('e) In der Nacht wird es kalt werden.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Vergleich'),
  bullet('Beide Länder konkret benannt'),
  bullet('Mindestens 2 Komparative (kälter / wärmer / länger / trockener)'),
  bullet('Konnektoren: während / im Gegensatz zu / wohingegen'),
  bullet('Konkrete Temperaturen oder Beispiele genannt'),
  bullet('Eigene Meinung am Ende'),
  ...gap(1),
  p('Beispiel: Im Sommer ist es in Spanien viel heißer als in Deutschland — bei uns hat es oft 35 Grad, in Deutschland nur 25. Während der Winter in Deutschland sehr kalt und schneereich ist, regnet es in Spanien im Winter mehr. Im Gegensatz zu Spanien hat Deutschland einen kürzeren Sommer, aber einen viel bunteren Herbst.'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wetter und Jahreszeiten — Leseübung'),
  h2('Text: Linhs erster deutscher Winter'),
  p('Linh Nguyen kommt aus Vietnam — aus Ho-Chi-Minh-Stadt, einer Stadt im warmen, tropischen Süden. Dort gibt es nur zwei Jahreszeiten: die Trockenzeit und die Regenzeit. Die Temperatur fällt fast nie unter 25 Grad. Vor anderthalb Jahren ist Linh nach Leipzig gezogen, um Maschinenbau zu studieren — und dort hat sie zum ersten Mal richtigen Schnee gesehen.'),
  p('„Der erste Winter war ein Schock", erinnert sich Linh. „Im Oktober wurde es schon kalt, und im November sind die Blätter alle gefallen. Im Dezember sind die Tage extrem kurz — es wird schon um 16 Uhr dunkel! In Vietnam haben wir das ganze Jahr lang etwa zwölf Stunden Tageslicht."'),
  p('Linh musste viele neue Dinge lernen. Zuerst die Kleidung: dicke Winterjacke, warme Stiefel, Schal, Mütze, Handschuhe. „Ich habe einen ganzen Tag im Kaufhaus verbracht, um alles zu kaufen", lacht sie. „Die Verkäuferin war sehr geduldig — sie hat mir jedes Kleidungsstück erklärt." Dann die Heizung: „In Vietnam gibt es keine Heizungen — nur Klimaanlagen. Hier muss man wissen, wie die Heizung funktioniert und wie man richtig lüftet."'),
  p('Mitte Januar gab es den ersten richtigen Schnee. „Ich werde das nie vergessen — ich bin um 6 Uhr aufgestanden, weil ich es nicht glauben konnte. Alles war weiß! Ich habe Fotos gemacht und sie sofort meiner Familie geschickt — meine Schwester hat geweint vor Freude." Linh hat dann auch zum ersten Mal Schlittschuh laufen versucht. „Nach drei Stürzen habe ich aufgegeben — aber es war trotzdem lustig."'),
  p('Inzwischen mag Linh alle vier Jahreszeiten in Deutschland — auch wenn der Winter ihr Lieblings-Wetter immer noch nicht ist. „Im Sommer mag ich die langen Tage am liebsten — bis 22 Uhr ist es noch hell, das ist unglaublich! Aber der Frühling ist meine neue Lieblingszeit: Wenn die Bäume blühen und die Vögel wieder singen, weiß ich, dass die kalte Zeit vorbei ist."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['In Vietnam gibt es vier Jahreszeiten.', ''],
      ['Linh studiert Maschinenbau in Leipzig.', ''],
      ['Im Dezember ist es in Leipzig schon um 16 Uhr dunkel.', ''],
      ['Linh hat alle Winterkleidung selbst online gekauft.', ''],
      ['In Vietnam gibt es Heizungen in den Wohnungen.', ''],
      ['Linh hat erfolgreich Schlittschuh laufen gelernt.', ''],
      ['Der Frühling ist Linhs Lieblingsjahreszeit geworden.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Welche Jahreszeiten gibt es in Vietnam?'),
  wLine(),
  p('b) Was war der größte Schock im ersten deutschen Winter?', { before: 120 }),
  wLine(), wLine(),
  p('c) Wer hat Linh beim Kleidungskauf geholfen?', { before: 120 }),
  wLine(),
  p('d) Wie hat Linh auf den ersten Schnee reagiert?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Vergleich: Vietnam vs. Deutschland'),
  stdTable(
    ['Aspekt', 'Vietnam (Süden)', 'Deutschland (Leipzig)'],
    [
      ['Anzahl Jahreszeiten', '', ''],
      ['Niedrigste Temperatur', '', ''],
      ['Tageslicht im Winter', '', ''],
      ['Heizung im Wohnraum', '', ''],
      ['Schnee', '', ''],
    ],
    [3500, 4100, 4106]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Wetter und Jahreszeiten'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['In Vietnam gibt es vier Jahreszeiten.', 'F (zwei: Trocken-/Regenzeit)'],
      ['Linh studiert Maschinenbau in Leipzig.', 'R'],
      ['Im Dezember ist es in Leipzig schon um 16 Uhr dunkel.', 'R'],
      ['Linh hat alle Winterkleidung selbst online gekauft.', 'F (im Kaufhaus)'],
      ['In Vietnam gibt es Heizungen in den Wohnungen.', 'F (nur Klimaanlagen)'],
      ['Linh hat erfolgreich Schlittschuh laufen gelernt.', 'F (nach drei Stürzen aufgegeben)'],
      ['Der Frühling ist Linhs Lieblingsjahreszeit geworden.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Nur zwei: die Trockenzeit und die Regenzeit.'),
  p('b) Die Kälte und die kurzen Tage — schon um 16 Uhr wird es dunkel.'),
  p('c) Eine geduldige Verkäuferin im Kaufhaus.'),
  p('d) Sie ist um 6 Uhr aufgestanden, hat Fotos gemacht und sofort an die Familie geschickt.'),
  ...gap(1),
  h2('Aufgabe 3 — Vergleich'),
  stdTable(
    ['Aspekt', 'Vietnam', 'Deutschland'],
    [
      ['Jahreszeiten', '2 (Trocken- + Regenzeit)', '4 (Frühling, Sommer, Herbst, Winter)'],
      ['Niedrigste Temp.', 'fast nie unter 25 °C', 'kann unter 0 °C fallen'],
      ['Tageslicht Winter', 'ca. 12 Stunden ganzjährig', 'kurze Tage, 16 Uhr dunkel'],
      ['Heizung', 'nicht — nur Klimaanlage', 'in jeder Wohnung'],
      ['Schnee', 'kein Schnee', 'Schnee im Winter'],
    ],
    [3500, 4100, 4106]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wetter und Jahreszeiten — Lückentext'),
  infoBox([
    'Wörterkasten: Schnee  |  Sonne  |  Gewitter  |  Wind  |  Nebel',
    '              Regen  |  Hitze  |  Frost  |  Wolken  |  Vorhersage'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Wettertext: Fülle die Lücken aus'),
  p('Im Frühling scheint oft die ________ , aber es kann auch plötzlich ________ geben. Im Sommer wird es heißer und manchmal entstehen am Nachmittag ________. Im Herbst gibt es viel ________ und die Bäume verlieren ihre Blätter. Im Winter fällt manchmal ________ — besonders im Bergland.'),
  p('Wenn man die Wetter-________ sieht, weiß man schon: heute mit ________ rechnen oder die Sonnenbrille mitnehmen? Im Sommer kann die ________ unangenehm werden — über 35 Grad ist anstrengend. Im Winter dagegen muss man sich vor ________ schützen — minus 10 Grad ist nicht selten.', { before: 120 }),
  p('In manchen Regionen Deutschlands ist es im Herbst oft ________ — man kann nur wenige Meter weit sehen. Das macht das Autofahren schwierig.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Wetterbericht: Dialog ergänzen'),
  infoBox(['Wörterkasten: bewölkt  |  steigen  |  Schauer  |  windig  |  Höchstwerte  |  Niederschlag']),
  ...gap(1),
  p('„Und nun zum Wetter für morgen, Mittwoch:"'),
  p('„Im Norden wird es vor allem ________, gegen Mittag rechnen wir mit einzelnen ________."'),
  p('„Die ________ liegen zwischen 12 und 18 Grad."'),
  p('„Im Süden bleibt es trocken, aber stark ________ — bitte vorsichtig auf der Autobahn!"'),
  p('„Am Wochenende werden die Temperaturen ________ — wir erhalten Sonnenschein und kaum noch ________."'),
  p('„Damit zurück ins Studio."'),
  ...gap(1),
  h2('Aufgabe 3 — Wechselpräpositionen mit Wetter'),
  grammarBox([
    'Präpositionen bei Jahreszeiten und Wetter:',
    'IM (in dem) + Jahreszeit:    im Frühling / im Sommer / im Herbst / im Winter',
    'IM + Monat:                  im Januar / im April / im November',
    'BEI + Wetter (Dat.):         bei Regen / bei Sonne / bei Schnee / bei kaltem Wetter',
    'AM (an dem) + Tag:           am Montag / am Wochenende',
    'AB + Datum (Dat.):           ab Montag / ab dem 15. Mai',
  ]),
  ...gap(1),
  p('Ergänze die Präposition (im / am / bei / ab).'),
  p('a) ________ Sommer fahren wir oft an die Ostsee.'),
  p('b) ________ Regen fahre ich nicht mit dem Fahrrad zur Arbeit.'),
  p('c) ________ Wochenende bleiben wir zu Hause.'),
  p('d) ________ Januar war es sehr kalt — bis minus 15 Grad.'),
  p('e) ________ schönem Wetter mache ich am liebsten Picknick.'),
  p('f) ________ nächstem Sonntag soll es wieder schöner werden.'),
  ...gap(1),
  h2('Aufgabe 4 — Komparativ und Superlativ: Wettervokabular'),
  p('Bilde Komparativ und Superlativ.'),
  stdTable(
    ['Grundform', 'Komparativ', 'Superlativ'],
    [
      ['kalt', '________', 'am ________'],
      ['heiß', '________', 'am ________'],
      ['warm', '________', 'am ________'],
      ['lang (Tag)', '________', 'am ________'],
      ['windig', '________', 'am ________'],
      ['mild', '________', 'am ________'],
    ],
    [3000, 3500, 5206]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Wetter und Jahreszeiten'),
  h2('Aufgabe 1'),
  p('1. Sonne  2. Regen  3. Gewitter  4. Wind  5. Schnee'),
  p('6. Vorhersage  7. Wolken  8. Hitze  9. Frost  10. neblig (oder: Nebel)'),
  p('Hinweis: Lücke 10 = „neblig" (Adjektiv) bzw. „Nebel" (Nomen) je nach Satzbau.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Wetterbericht'),
  p('1. bewölkt  2. Schauer  3. Höchstwerte  4. windig  5. steigen  6. Niederschlag'),
  ...gap(1),
  h2('Aufgabe 3 — Präpositionen'),
  p('a) Im Sommer  (im = in dem, Dat.)'),
  p('b) Bei Regen  (bei + Dat.)'),
  p('c) Am Wochenende  (am = an dem, Dat.)'),
  p('d) Im Januar  (Monat → im)'),
  p('e) Bei schönem Wetter  (bei + Dat. mit Adjektivendung -em)'),
  p('f) Ab nächstem Sonntag  (ab + Dat.)'),
  ...gap(1),
  h2('Aufgabe 4 — Komparativ / Superlativ'),
  stdTable(
    ['Grundform', 'Komparativ', 'Superlativ'],
    [
      ['kalt', 'kälter', 'am kältesten'],
      ['heiß', 'heißer', 'am heißesten'],
      ['warm', 'wärmer', 'am wärmsten'],
      ['lang', 'länger', 'am längsten'],
      ['windig', 'windiger', 'am windigsten'],
      ['mild', 'milder', 'am mildesten'],
    ],
    [3000, 3500, 5206]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wetter und Jahreszeiten — Wortliste'),
  h2('Teil A — Wetterphänomene'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Sonne', 'Nomen', 'Heute scheint die Sonne den ganzen Tag.'],
      ['der Regen', 'Nomen', 'Der Regen hat endlich aufgehört.'],
      ['der Schnee', 'Nomen', 'Im Winter liegt oft Schnee in den Bergen.'],
      ['das Gewitter, -', 'Nomen', 'Am Nachmittag gab es ein starkes Gewitter.'],
      ['der Wind', 'Nomen', 'Der Wind ist heute sehr stark.'],
      ['der Nebel', 'Nomen', 'Im Herbst ist morgens oft Nebel.'],
      ['die Wolke, -n', 'Nomen', 'Es sind nur wenige Wolken am Himmel.'],
      ['der Frost', 'Nomen', 'In der Nacht gab es Frost — minus 5 Grad.'],
      ['die Hitze', 'Nomen', 'Bei dieser Hitze trinke ich nur Wasser.'],
      ['die Vorhersage, -n', 'Nomen', 'Die Vorhersage für morgen ist gut.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Jahreszeiten und Adjektive'),
  stdTable(
    ['Ausdruck', 'Bedeutung', 'Beispielsatz'],
    [
      ['der Frühling', 'März / April / Mai', 'Im Frühling werden die Tage länger.'],
      ['der Sommer', 'Juni / Juli / August', 'Im Sommer fahren wir an die Nordsee.'],
      ['der Herbst', 'September / Oktober / November', 'Der Herbst ist meine Lieblingsjahreszeit.'],
      ['der Winter', 'Dezember / Januar / Februar', 'Im Winter ist es kalt und dunkel.'],
      ['sonnig', 'mit viel Sonne', 'Heute ist es sonnig und warm.'],
      ['bewölkt', 'mit Wolken', 'Der Himmel ist bewölkt — vielleicht regnet es.'],
      ['regnerisch', 'mit Regen', 'In Hamburg ist es oft regnerisch.'],
      ['mild', 'angenehm warm', 'Heute Abend ist es sehr mild.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  weatherBox([
    'Wetter in Deutschland — typische Werte:',
    'Sommer: 18–28 °C, gelegentlich Hitzewellen über 35 °C',
    'Winter: -5 bis +5 °C, in den Bergen tiefer (-15 °C)',
    'Frühling: 5–18 °C, viel Wechselwetter („Aprilwetter")',
    'Herbst: 8–18 °C, oft windig und neblig',
    'Niederschlag: in Deutschland verteilt sich Regen aufs ganze Jahr',
    'Tageslicht: Sommer bis 22 Uhr hell, Winter ab 16 Uhr dunkel',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Sonne: ___________  |  der Schnee: ___________  |  das Gewitter: ___________'),
  p('die Vorhersage: ___________  |  bewölkt: ___________  |  mild: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Wetter und Jahreszeiten'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Wetter-Verben — Besonderheiten:',
    'es-Verben (immer mit „es" als Subjekt!):',
    '  Es regnet. / Es schneit. / Es hagelt. / Es stürmt. / Es donnert. / Es blitzt.',
    'Beobachtungen / Vorhersagen:',
    '  Die Sonne scheint. / Der Wind weht. / Die Temperatur steigt / fällt.',
    '  Es wird kälter. / Es bleibt mild. / Es klart auf.',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Heute Morgen war es noch neblig, aber jetzt scheint die Sonne und es ist fast 18 Grad warm.'),
  p('Im Norden Deutschlands ist es oft regnerisch und windig, im Süden meistens etwas wärmer.'),
  p('Bei dieser Hitze sollte man viel trinken und nicht in der Mittagssonne spazieren gehen.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wetter und Jahreszeiten — Konversation'),
  h2('Aufgabe 1 — Smalltalk: Übers Wetter reden'),
  p('Über das Wetter zu sprechen ist in Deutschland ein typisches Smalltalk-Thema. Ergänzt den Dialog.'),
  infoBox([
    'Smalltalk eröffnen: Schönes Wetter heute, oder? / Was für ein Sauwetter!',
    'Vorhersage: Hast du schon die Wettervorhersage gesehen?',
    'Pläne: Wir wollen am Wochenende … wenn das Wetter mitspielt.',
    'Bewertung: Endlich Sonne! / Ich kann diesen Regen nicht mehr ertragen.',
    'Tipps: Pass auf, es soll heute Nachmittag noch ein Gewitter geben!',
  ]),
  ...gap(1),
  p('Person A: „Hallo! Was für ein ________________________ heute, oder?"'),
  p('Person B: „Ja, total! Ich habe gestern noch eine ________ getragen — und heute ________________________."'),
  p('Person A: „Das wird auch in den nächsten Tagen so bleiben — ich habe die Vorhersage gesehen. Höchstwerte um die ________ Grad."'),
  p('Person B: „Super! Hast du Pläne ________________________?"'),
  p('Person A: „Ja, wir wollen ________________________ — wenn das Wetter mitmacht."'),
  p('Person B: „Pass aber auf — am Sonntag soll es ________________________."'),
  p('Person A: „Oh, das wäre schade. Trotzdem schön, dass es jetzt mal nicht ________________________!"'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Wettervorhersage präsentieren'),
  stdTable(
    ['Wetterreporter/in (A)', 'Moderator/in (B)'],
    [
      ['Geben Sie die Wettervorhersage für morgen (Norden, Süden).', 'Stellen Sie eine Frage zur Temperatur.'],
      ['Erklären Sie das Wetter am Wochenende.', 'Fragen Sie nach besten Aktivitäten bei dem Wetter.'],
      ['Geben Sie eine Tipp für die Zuhörer (Sonnenschutz, Regenschirm).', 'Bedanken Sie sich und schließen Sie das Gespräch.'],
    ],
    [5703, 5703]
  ),
  weatherBox([
    'Beispiel-Wetterdaten für das Rollenspiel:',
    'Morgen Norden: bewölkt, einzelne Schauer, 14–17 Grad, kräftiger Wind',
    'Morgen Süden:  wechselnd bewölkt, trocken, 18–22 Grad',
    'Wochenende: deutlich wärmer, Höchstwerte bis 25 Grad, sonnig',
    'Tipp: Sonnencreme nicht vergessen, viel trinken, Allergiker-Hinweis Pollen!',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Wetter und Jahreszeiten'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Welches Wetter mögen Sie am liebsten? Warum?', ''],
      ['Wie war das Wetter in Ihrer Heimat in dieser Jahreszeit?', ''],
      ['Was machen Sie bei schlechtem Wetter am liebsten?', ''],
      ['Hatten Sie schon einmal extreme Wettersituationen erlebt?', ''],
      ['Welche Jahreszeit ist in Deutschland am schönsten — Ihrer Meinung nach?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Das ideale Wetter für …"'),
  p('Eine Person nennt eine Aktivität — die Gruppe diskutiert, welches Wetter ideal dafür ist.'),
  infoBox([
    'Vorschläge:',
    '1. Eine Wanderung im Wald — am liebsten bei …',
    '2. Ein Picknick im Park — ideal wäre …',
    '3. Skifahren — perfekt wären …',
    '4. Eine lange Autofahrt — bei welchem Wetter ist es gefährlich?',
    '5. Im Garten arbeiten — was passt am besten?',
    '6. Ein Schwimmbadbesuch im Freibad — Mindesttemperatur?',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Wetter und Jahreszeiten'),
  h2('Aufgabe 1 — Bewertungskriterien Smalltalk'),
  bullet('Wetterbeschreibung mit konkreten Begriffen (Sonne / Regen / Grad)'),
  bullet('Vorhersage erwähnt (Futur I oder Modalverb sollen)'),
  bullet('Pläne genannt mit „wenn das Wetter mitspielt"'),
  bullet('Reaktionen mit Adjektiv (super / schade / leider)'),
  bullet('Natürlicher Smalltalk-Ton'),
  ...gap(1),
  h2('Muster-Smalltalk'),
  p('A: „Hallo! Was für ein schönes Wetter heute, oder?" / B: „Ja, total! Ich habe gestern noch eine Jacke getragen — und heute reicht ein T-Shirt."'),
  p('A: „Das wird auch in den nächsten Tagen so bleiben — Höchstwerte um die 24 Grad."'),
  p('B: „Hast du Pläne fürs Wochenende?" / A: „Wir wollen einen Ausflug machen — wenn das Wetter mitmacht."'),
  p('B: „Pass aber auf — am Sonntag soll es ein Gewitter geben." / A: „Trotzdem schön, dass es jetzt mal nicht regnet!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Wettervorhersage'),
  p('A: „Guten Tag, hier kommt die Wettervorhersage. Im Norden wird es morgen bewölkt — mit einzelnen Schauern und kräftigem Wind. Höchstwerte zwischen 14 und 17 Grad."'),
  p('B: „Und im Süden?" / A: „Im Süden bleibt es trocken, mit 18 bis 22 Grad."'),
  p('B: „Wie wird das Wochenende?" / A: „Deutlich wärmer — sonnig, bis zu 25 Grad. Perfekt für Outdoor-Aktivitäten!"'),
  p('A: „Vergessen Sie die Sonnencreme nicht und denken Sie an die Pollen — Allergiker müssen vorsichtig sein."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Komparative (wärmer als / kälter als), Wechselpräpositionen (im Sommer / bei Regen), Futur I.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Wetter und Jahreszeiten — Bildaufgaben'),
  h2('Aufgabe 1 — Wettersymbole erkennen'),
  p('[BILD 1: Sechs Wettersymbole: (1) Sonne, (2) Wolke mit Regen, (3) Schneeflocke, (4) Blitz/Gewitter, (5) Wolke mit Sonne (teilweise bewölkt), (6) Wind/Sturm-Symbol mit Pfeilen]'),
  p('a) Was bedeutet jedes Symbol?'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['', '', '', '', '', '']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Welches Wetter magst du am liebsten? Welches gar nicht? 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Wetterkarte Deutschland lesen'),
  p('[BILD 2: Wetterkarte von Deutschland mit Temperaturen und Wettersymbolen für 5 Städte: Hamburg 14°C bewölkt mit Schauern, Berlin 16°C bewölkt, Köln 18°C sonnig, München 20°C sonnig, Stuttgart 19°C teilweise bewölkt. Datum: 29. April 2026.]'),
  p('a) In welcher Stadt ist es am wärmsten?'),
  wLine(),
  p('b) Welche Stadt hat das schlechteste Wetter?', { before: 120 }),
  wLine(),
  p('c) Wie viel Grad Unterschied zwischen Hamburg und München?', { before: 120 }),
  wLine(),
  p('d) Schreibe einen Satz im Komparativ über zwei Städte.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Vier Jahreszeiten: Bilder zuordnen'),
  p('[BILD 3: Vier Bilder, eine Landschaft in jeder Jahreszeit: (1) blühende Bäume, grüne Wiese, Krokusse — Frühling. (2) Strand mit Sonne, blauer Himmel — Sommer. (3) bunte Bäume, Blätter am Boden — Herbst. (4) verschneite Landschaft, kahle Bäume — Winter.]'),
  p('a) Schreibe unter jedes Bild die Jahreszeit.'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4'],
    [['', '', '', '']],
    [2700, 2700, 2700, 3506]
  ),
  p('b) Beschreibe deine Lieblingsjahreszeit aus dem Bild in 2–3 Sätzen.', { before: 120 }),
  wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — App-Wetterprognose lesen'),
  p('[BILD 4: Smartphone-Screenshot einer Wetter-App für 7 Tage: Mo 17°C Sonne, Di 19°C teilweise bewölkt, Mi 16°C Regen, Do 14°C Regen, Fr 18°C Sonne, Sa 22°C Sonne, So 24°C Sonne. Aktuelle Temperatur: 16°C, Luftfeuchtigkeit 65%, Wind 12 km/h.]'),
  p('a) An welchem Tag ist die höchste Temperatur prognostiziert?'),
  wLine(),
  p('b) An welchen Tagen wird es regnen?', { before: 120 }),
  wLine(),
  p('c) Sie planen ein Wochenende-Picknick. An welchem Tag wäre es ideal? Warum?', { before: 120 }),
  wLine(), wLine(),
  p('d) Schreibe 2 Sätze im Futur I über die Wettervorhersage am Wochenende.', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Wetter und Jahreszeiten'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Wettersymbole'),
  stdTable(
    ['Symbol 1', 'Symbol 2', 'Symbol 3', 'Symbol 4', 'Symbol 5', 'Symbol 6'],
    [['Sonne / sonnig', 'Regen / regnerisch', 'Schnee / Schneefall', 'Gewitter / Blitz', 'teilweise bewölkt', 'Wind / Sturm']],
    [1800, 1800, 1800, 1800, 1800, 2706]
  ),
  p('b) Individuelle Antworten: Ich mag sonniges Wetter am liebsten. / Sturm und Gewitter mag ich gar nicht.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Wetterkarte'),
  p('a) München (20 °C).'),
  p('b) Hamburg (14 °C, bewölkt mit Schauern).'),
  p('c) 6 Grad Unterschied (20 - 14 = 6).'),
  p('d) Beispiel: München ist wärmer als Hamburg. / In Köln scheint die Sonne, während es in Hamburg regnet.'),
  ...gap(1),
  h2('Aufgabe 3 — Jahreszeiten'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4'],
    [['der Frühling', 'der Sommer', 'der Herbst', 'der Winter']],
    [2700, 2700, 2700, 3506]
  ),
  p('b) Individuelle Antworten — wichtig: konkrete Wetterbegriffe + persönliche Begründung.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 4 — Wetter-App'),
  p('a) Sonntag (24 °C).'),
  p('b) Mittwoch und Donnerstag.'),
  p('c) Sonntag — wegen 24 °C und Sonnenschein, bestes Wetter fürs Picknick.'),
  p('d) Beispiele: Am Wochenende wird die Sonne scheinen. / Die Temperaturen werden auf 24 Grad steigen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
