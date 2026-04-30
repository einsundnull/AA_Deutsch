// A2_Erwachsene — Thema 10 ABSCHLUSS: Umwelt & Natur
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Umwelt & Natur — ABSCHLUSS';
const HEADING = 'Thema 10 — Umwelt & Natur';
const PREFIX  = 'A2_Erwachsene_UmweltNatur_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '10_UmweltNatur', 'ABSCHLUSS');
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
  h1('Umwelt & Natur — Abschlussübung'),
  infoBox([
    'Diese Übung kombiniert beide Unterpunkte des Themas:',
    'UP 01: Wetter und Jahreszeiten',
    'UP 02: Umweltthemen (Recycling, Energie sparen)',
  ]),
  ...gap(1),

  // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
  h2('Aufgabe 1 — Lesetext: Mariams grünes Jahr'),
  p('Mariam Adebayo kommt aus Nigeria und wohnt seit drei Jahren in Bonn. Sie arbeitet als Krankenschwester in einem großen Krankenhaus. Im letzten Jahr hat Mariam beschlossen, ihren Alltag deutlich umweltfreundlicher zu gestalten — und dabei auch das deutsche Wetter besser zu verstehen.'),
  p('„Im Frühling habe ich angefangen, mit dem Fahrrad zur Arbeit zu fahren", erzählt sie. „Bei schönem Wetter ist das wunderbar — die Sonne scheint, die Bäume blühen, die Luft ist frisch." Aber Mariam hat schnell gemerkt: Das deutsche Wetter ist sehr unbeständig. „Im April hat es manchmal innerhalb von einer Stunde geregnet, geschneit und wieder die Sonne geschienen — typisches Aprilwetter."'),
  p('Den Sommer hat sie genossen: Lange Tage bis 22 Uhr, warmes Wetter, perfekt für Picknicks. „Ich habe oft mit Freunden im Park gegessen — natürlich mit Mehrweggeschirr und Stofftüten, ohne Plastik!" Im Herbst kam die nächste Lektion: „Die Tage werden kürzer, der Wind weht stark, die Blätter fallen. Ich habe gelernt, dass man dann früher die Heizung anstellen muss — aber nicht zu hoch! Eine Grad weniger spart 6 % Energie, hat mir mein Vermieter erklärt."'),
  p('Der Winter war eine echte Herausforderung. „Ich friere schnell — und im Dezember hatten wir minus 8 Grad! Aber ich habe es geschafft: dicke Jacke, warme Wollsocken und kürzere Duschen. Wasser sparen ist auch wichtig — heißes Wasser braucht viel Energie." Im Januar hat Mariam zum ersten Mal richtigen Schnee erlebt. „Das war magisch — alles weiß und still!"'),
  p('Bei der Mülltrennung hat Mariam viel gelernt: „Am Anfang habe ich alles in eine Tonne geworfen — wie zu Hause in Lagos. Aber meine Kollegin Petra hat mir genau erklärt: blau für Papier, gelb für Plastik, braun für Bio, schwarz für Rest, Glas in den Container. Inzwischen mache ich das automatisch." Und das Pfandsystem? „Ich liebe es! Jede Woche bringe ich meine leeren Flaschen zurück — ich bekomme 3 bis 4 Euro Pfand wieder. Es ist gut für die Umwelt und für meinen Geldbeutel."'),
  p('„Mein Fazit nach einem Jahr: Das deutsche Wetter ist anders als in Nigeria — manchmal anstrengend, aber jede Jahreszeit hat ihren Reiz. Und für die Umwelt zu leben ist nicht schwer — man muss nur gute Gewohnheiten entwickeln."'),
  ...gap(1),

  // ── Aufgabe 2: R/F ────────────────────────────────────────────────────────
  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Mariam wohnt seit drei Jahren in Bonn.', ''],
      ['Im April hat sie nur Sonnenwetter erlebt.', ''],
      ['Eine Grad weniger Heizen spart 6 % Energie.', ''],
      ['Im Dezember hatte Bonn minus 8 Grad.', ''],
      ['Mariam wirft alles in eine Tonne — wie früher.', ''],
      ['Mariam bekommt jede Woche 3-4 Euro Pfand zurück.', ''],
      ['Mariam findet das deutsche Wetter immer anstrengend.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),

  // ── Aufgabe 3: Gemischter Lückentext ──────────────────────────────────────
  h2('Aufgabe 3 — Gemischter Lückentext (beide Unterpunkte)'),
  infoBox([
    'Wörterkasten: Schnee  |  Pfand  |  Frühling  |  trennen  |  Heizung',
    '              Vorhersage  |  bewölkt  |  recyceln  |  sparen  |  Umwelt'
  ]),
  ...gap(1),
  p('Felix hat letzten Winter beschlossen, mehr für die ________ zu tun. Im ________ hat er angefangen, alles zu ________: Plastik in den gelben Sack, Papier in die blaue Tonne, Bio in die braune. Auf Plastikflaschen achtet er besonders — wegen des ________ bringt er sie immer zum Automaten zurück.'),
  p('Im Winter dreht er die ________ etwas niedriger und macht das Licht aus, wenn er das Zimmer verlässt — so kann er Strom ________. Auch bei der Wäsche achtet er darauf, das Gerät immer voll zu laden, damit weniger Wasser verbraucht und mehr Stoff ________ wird.', { before: 120 }),
  p('Beim Wetter ist er flexibel: Morgens schaut er die ________ an. Wenn der Himmel ________ ist, nimmt er einen Schirm. Bei Frost trägt er warme Socken. Letzten Januar gab es viel ________ — Felix hat seinen Garten in eine kleine Winterlandschaft verwandelt.', { before: 120 }),
  ...gap(1),

  // ── Aufgabe 4: Fehlerkorrektur ────────────────────────────────────────────
  h2('Aufgabe 4 — Fehler korrigieren'),
  p('In jedem Satz steckt genau ein Fehler. Unterstreiche ihn und schreibe den korrekten Satz.'),
  ...gap(1),
  p('UP 01 — Wetter und Jahreszeiten:', { bold: true }),
  p('a)  Im Sommer es ist sehr heiß — manchmal über 30 Grad.'),
  wLine(), wLine(),
  p('b)  Bei kalten Wetter trage ich immer einen warmen Schal.', { before: 120 }),
  wLine(), wLine(),
  p('c)  Morgen werden es regnen — so sagt die Vorhersage.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 02 — Umweltthemen:', { bold: true }),
  p('d)  Wir sollen den Müll trennen werden.'),
  wLine(), wLine(),
  p('e)  Auf den Plastikflasche gibt es 25 Cent Pfand.', { before: 120 }),
  wLine(), wLine(),
  p('f)  Man sollte die Heizung niedriger zu stellen.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 5: Schreiben ──────────────────────────────────────────────────
  h2('Aufgabe 5 — Schreiben: Umweltbewusst durch das Jahr'),
  p('Beschreiben Sie, wie Sie versuchen, in jeder Jahreszeit umweltbewusst zu leben (8–10 Sätze). Benutzen Sie Elemente aus beiden Unterpunkten:'),
  bullet('UP 01: Wetter und Jahreszeit benennen (Komparativ, Präpositionen)'),
  bullet('UP 01: Wie reagieren Sie auf das Wetter? (Kleidung, Aktivitäten)'),
  bullet('UP 02: Umweltverhalten in der Jahreszeit (sollten/könnten, Passiv)'),
  bullet('UP 02: Begründungen mit weil oder damit'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 6: Rollenspiel ────────────────────────────────────────────────
  h2('Aufgabe 6 — Rollenspiel: Zwei Stationen'),
  p('Spielen Sie zwei kurze Szenen durch (je 4 Minuten).'),
  stdTable(
    ['Station', 'Person A', 'Person B'],
    [
      ['Station 1: Wetterprognose (UP 01)', 'Sie sind Wetterreporter/in. Geben Sie eine Wettervorhersage für 3 Tage.', 'Sie sind Moderator/in. Stellen Sie Fragen zu Temperaturen und Aktivitäten.'],
      ['Station 2: Hilfe beim Recyceln (UP 02)', 'Sie sind neu in Deutschland und fragen nach der Mülltrennung.', 'Sie erklären die Tonnen, das Pfand-System und Spar-Tipps.'],
    ],
    [3500, 4103, 4103]
  ),
  infoBox([
    'Sprachliche Ziele pro Station:',
    'Station 1: Futur I (Es wird … geben/sein) / Komparativ (kälter als)',
    'Station 2: Imperativ + Konjunktiv II (Du solltest … / Trenn den Müll!)',
  ]),
  ...gap(1),

  // ── Selbstevaluation ──────────────────────────────────────────────────────
  h2('Selbstevaluation — Das kann ich jetzt!'),
  stdTable(
    ['Ich kann …', 'gut', 'noch nicht sicher'],
    [
      ['über das Wetter und die Jahreszeiten sprechen.', '', ''],
      ['eine Wettervorhersage verstehen und wiedergeben.', '', ''],
      ['Komparativ und Superlativ richtig verwenden.', '', ''],
      ['über Mülltrennung und Recycling sprechen.', '', ''],
      ['Energie- und Wassersparen erklären.', '', ''],
      ['Konjunktiv II (sollte/könnte) für Empfehlungen nutzen.', '', ''],
      ['Passiv mit Modalverben bilden (soll getrennt werden).', '', ''],
    ],
    [7500, 1000, 3206]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Umwelt & Natur'),
  ...gap(1),

  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Mariam wohnt seit drei Jahren in Bonn.', 'R'],
      ['Im April hat sie nur Sonnenwetter erlebt.', 'F (April-Wetter: Regen, Schnee, Sonne)'],
      ['Eine Grad weniger Heizen spart 6 % Energie.', 'R'],
      ['Im Dezember hatte Bonn minus 8 Grad.', 'R'],
      ['Mariam wirft alles in eine Tonne — wie früher.', 'F (sie trennt jetzt richtig)'],
      ['Mariam bekommt jede Woche 3-4 Euro Pfand zurück.', 'R'],
      ['Mariam findet das deutsche Wetter immer anstrengend.', 'F (manchmal anstrengend, aber jede Jahreszeit hat ihren Reiz)'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 3 — Lückentext'),
  p('1. Umwelt  2. Frühling  3. trennen  4. Pfands  5. Heizung'),
  p('6. sparen  7. recycelt  8. Vorhersage  9. bewölkt  10. Schnee'),
  ...gap(1),

  h2('Aufgabe 4 — Fehlerkorrektur'),
  grammarBox([
    'UP 01 — Wetter (Wortstellung / Adjektivendung / Verbform):',
    'a) FEHLER: „es ist" — nach „Im Sommer" muss Verb auf Position 2!',
    '   RICHTIG: Im Sommer ist es sehr heiß.',
    '',
    'b) FEHLER: „Bei kalten Wetter" — bei + Dat., neutr. → -em',
    '   RICHTIG: Bei kaltem Wetter trage ich immer einen warmen Schal.',
    '',
    'c) FEHLER: „werden" muss Singular sein — „es" ist Singular!',
    '   RICHTIG: Morgen wird es regnen.',
  ]),
  ...gap(1),
  grammarBox([
    'UP 02 — Umwelt (Passiv / Pluralartikel / Modalverb-Konstruktion):',
    'd) FEHLER: „sollen … trennen werden" — Aktiv und Passiv vermischt!',
    '   RICHTIG aktiv:  Wir sollen den Müll trennen.',
    '   RICHTIG passiv: Der Müll soll getrennt werden.',
    '',
    'e) FEHLER: „Auf den Plastikflasche" — feminin Akk. Sg. = die!',
    '   RICHTIG: Auf die Plastikflasche gibt es 25 Cent Pfand.',
    '',
    'f) FEHLER: „zu stellen" — nach Modalverb folgt Infinitiv OHNE „zu"!',
    '   RICHTIG: Man sollte die Heizung niedriger stellen.',
  ]),
  ...gap(1),

  h2('Aufgabe 5 — Bewertungskriterien'),
  bullet('UP 01: Wetter konkret beschrieben (Temperaturen, Phänomene, Komparativ)'),
  bullet('UP 01: Präpositionen korrekt (im Sommer / bei Regen / am Wochenende)'),
  bullet('UP 02: konkretes Umweltverhalten in mind. 2 Bereichen (Müll, Strom, Wasser)'),
  bullet('UP 02: sollte/könnte korrekt + Begründung mit weil oder damit'),
  bullet('Klare Tagesstruktur, mindestens 8 zusammenhängende Sätze'),
  ...gap(1),
  h2('Muster-Text'),
  p('Im Frühling werden die Tage länger und die Sonne wärmer — das ist meine Lieblingsjahreszeit. Bei schönem Wetter fahre ich mit dem Fahrrad zur Arbeit, um weniger CO₂ zu produzieren. Im Sommer kann es manchmal sehr heiß werden — dann sollte man genug Wasser trinken und nicht zu lange duschen. Wir essen oft mit Freunden im Park, immer mit Mehrwegbechern und Stofftaschen, damit kein Plastikmüll entsteht. Im Herbst beginnt die Heizperiode — eine Grad weniger spart 6 % Energie, sagt mein Vermieter. Im Winter ist es hier oft kalt und manchmal liegt Schnee. Ich trage warme Wollsocken und drehe die Heizung herunter, wenn ich nicht zu Hause bin. Den Müll trenne ich das ganze Jahr konsequent — Plastik wird recycelt und auf Pfandflaschen gibt es Geld zurück. So lebe ich umweltbewusst durch das Jahr.'),
  ...gap(1),

  h2('Aufgabe 6 — Bewertungskriterien Rollenspiel'),
  bullet('Station 1: Futur I korrekt (Es wird regnen / sein), mindestens 1 Komparativ'),
  bullet('Station 1: konkrete Temperaturangaben + Tipp für Aktivitäten'),
  bullet('Station 2: Imperativ + Konjunktiv II für Empfehlungen'),
  bullet('Station 2: alle 4 Tonnen + Pfand-System erwähnt'),
  bullet('Beide Stationen: höflicher Ton, vollständige Sätze'),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
