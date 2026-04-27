'use strict';
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, PageNumber,
  LevelFormat, Header, Footer, PageBreak
} = require('docx');
const fs = require('fs');

const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;
const CONTENT = PAGE_W - 2 * MARGIN;

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Modalverben im Präteritum';
const TOPIC       = 'A2_Kinder_GrammatikA2_07_ModalverbenPraeteritum';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '07_ModalverbenPraeteritum'
);

const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: 'Symbol' } }
    }]
  }]
};

const h1      = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2      = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const p       = (txt, opts = {}) => new Paragraph({ children: [new TextRun({ text: txt, size: opts.size || 24, font: 'Arial', bold: opts.bold || false, italics: opts.italic || false, color: opts.color || '000000' })], spacing: { before: opts.before || 80, after: opts.after || 80 } });
const pBold   = txt => p(txt, { bold: true });
const pItalic = (txt, opts = {}) => p(txt, { italic: true, color: opts.color || '888888', size: 22 });
const empty   = () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } });
const bullet  = txt => new Paragraph({ children: [new TextRun({ text: txt, size: 24, font: 'Arial' })], numbering: { reference: 'bullet-list', level: 0 }, spacing: { before: 60, after: 60 } });
const writeLine  = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const writeLines = n => Array.from({ length: n }, writeLine);

const hCell = (txt, w) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })] });
const dCell = (txt, w, opts = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: opts.fill || 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: txt, size: opts.size || 22, font: 'Arial', bold: opts.bold || false, italics: opts.italic || false, color: opts.color || '000000' })] })] });

const studentHead = () => new Table({
  width: { size: CONTENT, type: WidthType.DXA },
  rows: [new TableRow({ children: [hCell('Name:', CONTENT / 2), hCell('Datum:', CONTENT / 2)] })]
});

const makeHeader = () => new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: TOPIC_LABEL, italics: true, color: '888888', size: 18, font: 'Arial' })] })] });
const makeFooter = () => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }), new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })] })] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children }] });
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

function ruleBox(lines) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'E8F4E8' },
        borders: { top: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, bottom: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, left: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, right: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' } },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Regel', bold: true, size: 26, font: 'Arial', color: '1F4E79' })], spacing: { before: 80, after: 60 } }),
          ...lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 24, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
        ]
      })]
    })]
  });
}

// Konjugationstabelle für ein Modalverb (Präsens | Präteritum)
function konjTabelle(praesens, praeteritum, formsPraes, formsPraet) {
  const persons = ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'];
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell('Person', Math.floor(CONTENT * 0.28)), hCell(`Präsens: ${praesens}`, Math.floor(CONTENT * 0.36)), hCell(`Präteritum: ${praeteritum}`, Math.floor(CONTENT * 0.36))] }),
      ...persons.map((per, i) => new TableRow({ children: [dCell(per, Math.floor(CONTENT * 0.28), { bold: true }), dCell(formsPraes[i], Math.floor(CONTENT * 0.36)), dCell(formsPraet[i], Math.floor(CONTENT * 0.36), { fill: 'FFF8E8' })] }))
    ]
  });
}

(async () => {
  console.log('Erstelle Unterpunkt: Modalverben im Präteritum');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Schreibübung'),
    ruleBox([
      'Modalverben im Präteritum — kein Umlaut, kein ge-!',
      '',
      'können  →  konnte    (Ich konnte schwimmen.)',
      'müssen  →  musste    (Ich musste lernen.)',
      'wollen  →  wollte    (Ich wollte spielen.)',
      'dürfen  →  durfte    (Ich durfte nicht gehen.)',
      'sollen  →  sollte    (Ich sollte aufräumen.)',
      '',
      'Merksatz: Im Präteritum haben Modalverben KEINEN Umlaut!'
    ]),
    empty(),
    h2('Aufgabe 1 — Konjugationstabelle ausfüllen'),
    p('Fülle die Tabelle aus. Die Präteritumformen stehen im Regelkasten.'),
    empty(),
    konjTabelle('können', 'konnte',
      ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
      ['konnte', '______', '______', '______', '______', '______']
    ),
    empty(),
    konjTabelle('müssen', 'musste',
      ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
      ['musste', '______', '______', '______', '______', '______']
    ),
    empty(),
    konjTabelle('wollen', 'wollte',
      ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
      ['wollte', '______', '______', '______', '______', '______']
    ),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2 — Präteritum einsetzen'),
    p('Schreibe den Satz im Präteritum. Benutze die Vergangenheitsform!'),
    empty(),
    p('1.  Ich kann heute nicht kommen.  →  Ich __________ gestern nicht kommen.'),
    ...writeLines(1), empty(),
    p('2.  Du musst dein Zimmer aufräumen.  →  Du __________ dein Zimmer aufräumen.'),
    ...writeLines(1), empty(),
    p('3.  Er will ein Eis kaufen.  →  Er __________ ein Eis kaufen.'),
    ...writeLines(1), empty(),
    p('4.  Wir müssen früh aufstehen.  →  Wir __________ früh aufstehen.'),
    ...writeLines(1), empty(),
    p('5.  Ihr könnt nicht mitspielen.  →  Ihr __________ nicht mitspielen.'),
    ...writeLines(1), empty(),
    p('6.  Sie wollen ins Kino gehen.  →  Sie __________ ins Kino gehen.'),
    ...writeLines(1),
    empty(), empty(),
    h2('Aufgabe 3 — Sätze schreiben'),
    p('Schreibe vollständige Sätze im Präteritum. Benutze die Vorgaben.'),
    empty(),
    p('1.  Lena / wollen / ein Buch lesen'),
    ...writeLines(2), empty(),
    p('2.  wir / müssen / um 8 Uhr in der Schule sein'),
    ...writeLines(2), empty(),
    p('3.  Paul / nicht können / schwimmen, weil er krank war'),
    ...writeLines(2), empty(),
    h2('Aufgabe 4 — Über früher schreiben'),
    p('Schreibe 3 Sätze darüber, was du als kleines Kind wolltest, konntest oder musstest.'),
    pItalic('Als ich klein war, …'),
    ...writeLines(3)
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Modalverben im Präteritum'),
    empty(),
    h2('Aufgabe 1 — Konjugationstabellen'),
    p('konnte: konnte / konntest / konnte / konnten / konntet / konnten', { bold: true }),
    p('musste: musste / musstest / musste / mussten / musstet / mussten', { bold: true }),
    p('wollte: wollte / wolltest / wollte / wollten / wolltet / wollten', { bold: true }),
    pItalic('Muster für alle drei: Stamm + te / test / te / ten / tet / ten — kein Umlaut!'),
    empty(),
    h2('Aufgabe 2 — Präteritum'),
    p('1.  konnte    2.  musstest    3.  wollte'),
    p('4.  mussten   5.  konntet     6.  wollten'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  Lena wollte ein Buch lesen.'),
    p('2.  Wir mussten um 8 Uhr in der Schule sein.'),
    p('3.  Paul konnte nicht schwimmen, weil er krank war.'),
    empty(),
    h2('Aufgabe 4 — Freies Schreiben'),
    pItalic('Individuelle Antworten. Auf korrekte Präteritumform achten (kein Umlaut).')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Leseübung'),
    h2('Lesetext: Ein unvergesslicher Schultag'),
    p('Letzte Woche war ein sehr besonderer Tag für Jonas (11 Jahre). Er wollte eigentlich zu Hause bleiben, weil er sich nicht so gut fühlte. Aber er musste in die Schule, denn seine Klasse hatte eine wichtige Präsentation.'),
    empty(),
    p('In der Schule konnte Jonas zum Glück an der Präsentation teilnehmen. Er wollte zuerst nicht sprechen, weil er nervös war. Aber sein Lehrer sagte: „Du kannst das!" Dann konnte Jonas doch sprechen — und alle klatschten.'),
    empty(),
    p('Nach der Schule wollten Jonas und seine Freundin Mia ins Schwimmbad gehen. Aber sie konnten nicht, weil das Schwimmbad geschlossen war. Sie mussten also zu Hause bleiben. Mia wollte einen Film schauen, aber Jonas wollte lieber draußen spielen.'),
    empty(),
    p('Am Ende spielten sie im Garten. Jonas durfte sogar länger draußen bleiben, weil seine Eltern so froh über seine Präsentation waren. Es war ein langer, aber schöner Tag.'),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas wollte zu Hause bleiben, weil er krank war.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas musste nicht in die Schule gehen.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas konnte bei der Präsentation sprechen.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas und Mia konnten ins Schwimmbad gehen.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas durfte länger draußen bleiben.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Fragen beantworten'),
    p('Beantworte die Fragen in vollständigen Sätzen.'),
    empty(),
    p('1.  Warum wollte Jonas zu Hause bleiben?'),
    ...writeLines(2), empty(),
    p('2.  Warum musste er trotzdem in die Schule?'),
    ...writeLines(2), empty(),
    p('3.  Warum konnten Jonas und Mia nicht ins Schwimmbad?'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Modalverben im Text markieren'),
    p('Suche im Text alle Modalverben im Präteritum. Schreibe sie in die Tabelle.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Satz im Text (Modalverb + Infinitiv)', Math.floor(CONTENT * 0.55)), hCell('Modalverb', Math.floor(CONTENT * 0.22)), hCell('Infinitiv', Math.floor(CONTENT * 0.23))] }),
        ...['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.'].map(n => new TableRow({ children: [dCell(n, Math.floor(CONTENT * 0.55)), dCell('', Math.floor(CONTENT * 0.22)), dCell('', Math.floor(CONTENT * 0.23))] }))
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 4 — Vergangenheit oder Gegenwart?'),
    p('Schreibe das unterstrichene Verb im Präsens. Was ist der Unterschied?'),
    empty(),
    p('1.  Jonas wollte zu Hause bleiben.   →  Jonas __________ zu Hause bleiben.'),
    p('2.  Er musste in die Schule.          →  Er __________ in die Schule.'),
    p('3.  Sie konnten nicht schwimmen.      →  Sie __________ nicht schwimmen.')
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Modalverben im Präteritum'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  R  (er fühlte sich nicht gut)'),
    p('2.  F  (er musste in die Schule)'),
    p('3.  R'),
    p('4.  F  (das Schwimmbad war geschlossen)'),
    p('5.  R'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Jonas wollte zu Hause bleiben, weil er sich nicht gut fühlte.'),
    p('2.  Er musste in die Schule, weil seine Klasse eine wichtige Präsentation hatte.'),
    p('3.  Sie konnten nicht ins Schwimmbad, weil es geschlossen war.'),
    empty(),
    h2('Aufgabe 3 — Modalverben im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Satz', Math.floor(CONTENT * 0.55)), hCell('Modalverb', Math.floor(CONTENT * 0.22)), hCell('Infinitiv', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Er wollte zu Hause bleiben.', Math.floor(CONTENT * 0.55)), dCell('wollte', Math.floor(CONTENT * 0.22)), dCell('bleiben', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Er musste in die Schule.', Math.floor(CONTENT * 0.55)), dCell('musste', Math.floor(CONTENT * 0.22)), dCell('gehen (implizit)', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Jonas konnte teilnehmen.', Math.floor(CONTENT * 0.55)), dCell('konnte', Math.floor(CONTENT * 0.22)), dCell('teilnehmen', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Er wollte nicht sprechen.', Math.floor(CONTENT * 0.55)), dCell('wollte', Math.floor(CONTENT * 0.22)), dCell('sprechen', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Jonas konnte sprechen.', Math.floor(CONTENT * 0.55)), dCell('konnte', Math.floor(CONTENT * 0.22)), dCell('sprechen', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Sie wollten ins Schwimmbad gehen.', Math.floor(CONTENT * 0.55)), dCell('wollten', Math.floor(CONTENT * 0.22)), dCell('gehen', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Sie konnten nicht.', Math.floor(CONTENT * 0.55)), dCell('konnten', Math.floor(CONTENT * 0.22)), dCell('gehen', Math.floor(CONTENT * 0.23))] }),
        new TableRow({ children: [dCell('Jonas durfte länger draußen bleiben.', Math.floor(CONTENT * 0.55)), dCell('durfte', Math.floor(CONTENT * 0.22)), dCell('bleiben', Math.floor(CONTENT * 0.23))] })
      ]
    }),
    empty(),
    h2('Aufgabe 4'),
    p('1.  will    2.  muss    3.  können')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Lückentext'),
    p('Wörterkasten:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'konnte  —  konnten  —  konntest  —  musste  —  mussten  —  musstet  —  wollte  —  wollten  —  wolltest  —  durfte  —  sollte', size: 22, font: 'Arial' })] })] })] })]
    }),
    empty(),
    h2('Aufgabe 1 — Richtige Form einsetzen'),
    p('Setze die passende Präteritumform ein.'),
    empty(),
    p('1.  Gestern __________ ich nicht schlafen, weil es so laut war.  (können)'),
    writeLine(), empty(),
    p('2.  Wir __________ früh aufstehen, weil wir einen Zug hatten.  (müssen)'),
    writeLine(), empty(),
    p('3.  Leon __________ unbedingt das neue Spiel kaufen.  (wollen)'),
    writeLine(), empty(),
    p('4.  __________ du gestern nicht kommen? Warum nicht?  (können)'),
    writeLine(), empty(),
    p('5.  Die Kinder __________ nicht draußen spielen, weil es regnete.  (dürfen)'),
    writeLine(), empty(),
    p('6.  Ihr __________ die Aufgabe bis Freitag abgeben.  (sollen)'),
    writeLine(), empty(),
    p('7.  Mia __________ nicht singen, weil sie Halsschmerzen hatte.  (können)'),
    writeLine(), empty(),
    p('8.  Wir __________ alle mithelfen, weil so viel zu tun war.  (müssen)'),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2 — Präsens oder Präteritum?'),
    p('Welche Form passt? Unterstreiche die richtige Form.'),
    empty(),
    p('1.  Gestern  [kann / konnte]  ich das Rätsel nicht lösen.'),
    p('2.  Heute  [muss / musste]  ich früh aufstehen.'),
    p('3.  Letztes Jahr  [will / wollte]  er Pilot werden.'),
    p('4.  Morgen  [können / konnten]  wir ins Schwimmbad gehen.'),
    p('5.  Früher  [darf / durfte]  sie nicht so spät aufbleiben.'),
    empty(), empty(),
    h2('Aufgabe 3 — Sätze ergänzen'),
    p('Ergänze den Satz mit einer passenden Präteritumform.'),
    empty(),
    p('1.  Als ich 5 Jahre alt war, __________ ich noch kein Fahrrad fahren.'),
    writeLine(), empty(),
    p('2.  Letzten Sommer __________ wir jeden Tag ins Freibad gehen.'),
    writeLine(), empty(),
    p('3.  Gestern Abend __________ ich nicht schlafen, weil ___________________.'),
    writeLine(), empty(),
    p('4.  Früher __________ meine Oma immer Kuchen backen.'),
    writeLine(),
    empty(), empty(),
    h2('Aufgabe 4 — Kurzgeschichte'),
    p('Ergänze die Lücken mit den Modalverben im Präteritum: konnte / musste / wollte / durfte.'),
    empty(),
    p('Lena __________ gestern unbedingt ihr Lieblingsbuch zu Ende lesen.'),
    p('Aber sie __________ erst ihr Zimmer aufräumen.'),
    p('Danach __________ sie endlich lesen — bis 22 Uhr!'),
    p('Normalerweise __________ sie nicht so lange aufbleiben,'),
    p('aber heute hatte ihre Mama eine Ausnahme gemacht.'),
    ...writeLines(2)
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Modalverben im Präteritum'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  konnte    2.  mussten    3.  wollte'),
    p('4.  Konntest  5.  durften    6.  solltet'),
    p('7.  konnte    8.  mussten'),
    empty(),
    h2('Aufgabe 2 — Präsens oder Präteritum'),
    p('1.  konnte  (Vergangenheit: gestern)'),
    p('2.  muss    (Gegenwart: heute)'),
    p('3.  wollte  (Vergangenheit: letztes Jahr)'),
    p('4.  können  (Zukunft / Gegenwart: morgen)'),
    p('5.  durfte  (Vergangenheit: früher)'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  konnte    2.  wollten / konnten    3.  konnte / wollte'),
    p('4.  konnte / wollte'),
    pItalic('Individuelle Ergänzungen akzeptieren, wenn die Präteritumform korrekt ist.'),
    empty(),
    h2('Aufgabe 4 — Kurzgeschichte'),
    p('Lena wollte gestern unbedingt ihr Lieblingsbuch zu Ende lesen.'),
    p('Aber sie musste erst ihr Zimmer aufräumen.'),
    p('Danach konnte sie endlich lesen — bis 22 Uhr!'),
    p('Normalerweise durfte sie nicht so lange aufbleiben,'),
    p('aber heute hatte ihre Mama eine Ausnahme gemacht.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Wortliste'),
    h2('Präsens → Präteritum'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', Math.floor(CONTENT * 0.18)), hCell('Präsens (ich)', Math.floor(CONTENT * 0.2)), hCell('Präteritum (ich)', Math.floor(CONTENT * 0.22)), hCell('Beispielsatz (Präteritum)', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('können', Math.floor(CONTENT * 0.18)), dCell('kann', Math.floor(CONTENT * 0.2)), dCell('konnte', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Ich konnte gestern nicht kommen.', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('müssen', Math.floor(CONTENT * 0.18)), dCell('muss', Math.floor(CONTENT * 0.2)), dCell('musste', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Er musste früh aufstehen.', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('wollen', Math.floor(CONTENT * 0.18)), dCell('will', Math.floor(CONTENT * 0.2)), dCell('wollte', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Sie wollte Ärztin werden.', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('dürfen', Math.floor(CONTENT * 0.18)), dCell('darf', Math.floor(CONTENT * 0.2)), dCell('durfte', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Wir durften länger aufbleiben.', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('sollen', Math.floor(CONTENT * 0.18)), dCell('soll', Math.floor(CONTENT * 0.2)), dCell('sollte', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Du solltest das Buch lesen.', Math.floor(CONTENT * 0.4))] }),
        new TableRow({ children: [dCell('mögen', Math.floor(CONTENT * 0.18)), dCell('mag', Math.floor(CONTENT * 0.2)), dCell('mochte', Math.floor(CONTENT * 0.22), { bold: true, fill: 'FFF8E8' }), dCell('Ich mochte früher kein Gemüse.', Math.floor(CONTENT * 0.4))] })
      ]
    }),
    empty(),
    p('Übersetzung in deine Sprache:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Deutsch', Math.floor(CONTENT * 0.3)), hCell('Meine Sprache', Math.floor(CONTENT * 0.35)), hCell('Meine Sprache', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('konnte (können)', Math.floor(CONTENT * 0.3)), dCell('___________', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('musste (müssen)', Math.floor(CONTENT * 0.3)), dCell('___________', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('wollte (wollen)', Math.floor(CONTENT * 0.3)), dCell('___________', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('durfte (dürfen)', Math.floor(CONTENT * 0.3)), dCell('___________', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('sollte (sollen)', Math.floor(CONTENT * 0.3)), dCell('___________', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.35))] })
      ]
    }),
    empty(), empty(),
    h2('Vollständige Konjugation: konnte / musste / wollte'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person', Math.floor(CONTENT * 0.28)), hCell('konnte', Math.floor(CONTENT * 0.24)), hCell('musste', Math.floor(CONTENT * 0.24)), hCell('wollte', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('ich', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konnte', Math.floor(CONTENT * 0.24)), dCell('musste', Math.floor(CONTENT * 0.24)), dCell('wollte', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('du', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konntest', Math.floor(CONTENT * 0.24)), dCell('musstest', Math.floor(CONTENT * 0.24)), dCell('wolltest', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('er / sie / es', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konnte', Math.floor(CONTENT * 0.24)), dCell('musste', Math.floor(CONTENT * 0.24)), dCell('wollte', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('wir', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konnten', Math.floor(CONTENT * 0.24)), dCell('mussten', Math.floor(CONTENT * 0.24)), dCell('wollten', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('ihr', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konntet', Math.floor(CONTENT * 0.24)), dCell('musstet', Math.floor(CONTENT * 0.24)), dCell('wolltet', Math.floor(CONTENT * 0.24))] }),
        new TableRow({ children: [dCell('sie / Sie', Math.floor(CONTENT * 0.28), { bold: true }), dCell('konnten', Math.floor(CONTENT * 0.24)), dCell('mussten', Math.floor(CONTENT * 0.24)), dCell('wollten', Math.floor(CONTENT * 0.24))] })
      ]
    }),
    empty(), empty(),
    ruleBox([
      'Wichtig: Kein Umlaut im Präteritum!',
      'können → konnte  (NICHT: könnte — das ist Konjunktiv II!)',
      'müssen → musste  (NICHT: müsste)',
      'dürfen → durfte  (NICHT: dürfte)',
      '',
      'Endung: -te / -test / -te / -ten / -tet / -ten'
    ]),
    empty(),
    pItalic('Lernkarten-Tipp: Präsens auf die Vorderseite, Präteritum auf die Rückseite schreiben!')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Modalverben im Präteritum'),
    empty(),
    h2('Übersetzungen (Beispiel Englisch)'),
    p('konnte = could / was able to'),
    p('musste = had to'),
    p('wollte = wanted to'),
    p('durfte = was allowed to'),
    p('sollte = was supposed to / should have'),
    p('mochte = liked (to)'),
    empty(),
    h2('Häufiger Fehler: Konjunktiv II vs. Präteritum'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Präteritum (Vergangenheit)', Math.floor(CONTENT * 0.5)), hCell('Konjunktiv II (hypothetisch)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ich konnte nicht kommen.  ✓', Math.floor(CONTENT * 0.5)), dCell('Ich könnte kommen, wenn…  (anderes Thema!)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Er musste arbeiten.  ✓', Math.floor(CONTENT * 0.5)), dCell('Er müsste eigentlich…  (anderes Thema!)', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    pItalic('Hinweis: Konjunktiv II wird auf B1 Niveau behandelt — hier nur als Information.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Konversation'),
    h2('Dialog 1 — Was war früher anders?'),
    p('Übt den Dialog zu zweit. Dann tauscht die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', Math.floor(CONTENT * 0.5)), hCell('Person B', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was konntest du als kleines Kind nicht?', Math.floor(CONTENT * 0.5)), dCell('Als ich klein war, konnte ich nicht … Und du?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was musstest du als Kind immer machen?', Math.floor(CONTENT * 0.5)), dCell('Ich musste immer … Was wolltest du werden?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ich wollte … werden. Und du?', Math.floor(CONTENT * 0.5)), dCell('Ich wollte … werden, weil …', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    pItalic('Ideen: schwimmen / lesen / Fahrrad fahren / kochen / allein ins Kino / lange aufbleiben'),
    empty(), empty(),
    h2('Dialog 2 — Was ist gestern passiert?'),
    p('Fülle die Lücken aus und übt den Dialog.'),
    empty(),
    p('A:  Warum bist du gestern nicht zur Party gekommen?'),
    p('B:  Ich konnte nicht kommen, weil ich _________________________________.'),
    empty(),
    p('A:  Und danach? Was hast du gemacht?'),
    p('B:  Ich musste _________________________________, und dann wollte ich _________________________________.'),
    empty(),
    p('A:  Schade! Durftest du gar nicht kommen?'),
    p('B:  Nein, ich durfte nicht, weil _________________________________.'),
    empty(), empty(),
    h2('Partnerinterview — Früher und heute'),
    p('Stellt euch gegenseitig die Fragen. Schreibt die Antworten auf!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.45)), hCell('Antwort meines Partners / meiner Partnerin', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was konntest du mit 5 Jahren noch nicht?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was musstest du als Kind jeden Tag machen?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was wolltest du früher werden?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was durftest du früher nicht, was du jetzt darfst?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was wolltest du letztes Wochenende machen?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenspiel — Früher-konnte/musste/wollte-Kette'),
    p('Person 1 sagt einen Satz. Person 2 wiederholt ihn und fügt einen eigenen Satz hinzu. Wer den Faden verliert, scheidet aus!'),
    empty(),
    pBold('Beispiel:'),
    p('Person 1:  Als ich klein war, konnte ich kein Fahrrad fahren.'),
    p('Person 2:  Als du klein warst, konntest du kein Fahrrad fahren. Als ich klein war, musste ich immer früh ins Bett.'),
    p('Person 3:  Als du klein warst, musstest du immer früh ins Bett. Als ich …'),
    empty(),
    pItalic('Tipp: Langsam sprechen ist erlaubt — auf die richtige Form kommt es an!')
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Modalverben im Präteritum'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Korrekte Präteritumform (konnte / musste / wollte / durfte)'),
    bullet('Kein Umlaut in der Präteritumform'),
    bullet('Infinitiv am Satzende (Ich konnte nicht schwimmen.)'),
    bullet('Sinnvolle Antworten auf die Fragen'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('Ich konnte nicht kommen, weil ich krank war.'),
    p('Ich musste zu Hause bleiben, und dann wollte ich einen Film schauen.'),
    p('Nein, ich durfte nicht, weil meine Eltern nein sagten.'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Individuelle Antworten. Hauptkriterium: korrekte Präteritumform der Modalverben.'),
    empty(),
    h2('Gruppenspiel — Hinweise für Lehrperson'),
    p('Fehlertypen die häufig auftreten:'),
    bullet('Umlaut im Präteritum: „könnte" statt „konnte" → sofort korrigieren'),
    bullet('Infinitiv fehlt: „Ich konnte nicht." (ohne Infinitiv) → Satz akzeptieren, aber Vollform zeigen'),
    bullet('Perfekt statt Präteritum: „Ich habe gekonnt" → für A2 noch nicht nötig, Präteritum bevorzugen')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Modalverben im Präteritum — Bildaufgaben'),
    h2('Aufgabe 1 — Was konnte / musste / wollte die Person?'),
    p('Schau dir die Bilder an und schreibe je einen Satz im Präteritum.'),
    empty(),
    p('[BILD 1: Ein Kind versucht, auf einem Fahrrad zu fahren, und fällt hin. Es ist sehr klein und hat Stützräder.]'),
    p('Als das Kind klein war, __________________________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 2: Ein Schüler sitzt an einem Schreibtisch und lernt, obwohl draußen die Sonne scheint und Kinder spielen.]'),
    p('Der Schüler __________________________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 3: Ein Kind steht vor einem Eisstand und zeigt auf das Eis, aber der Erwachsene schüttelt den Kopf.]'),
    p('Das Kind __________________________________________________________, aber __________________________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 4: Eine Person schläft auf dem Sofa, obwohl der Tisch noch nicht abgeräumt ist.]'),
    p('Die Person __________________________________________________________, weil __________________________________________________________.'),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2 — Zeitlinie'),
    p('[BILD: Eine Zeitlinie mit 4 Punkten: Alter 4 / Alter 7 / Alter 10 / Heute. An jedem Punkt steht ein Bild: 4 = Baby mit Flasche; 7 = Kind mit Schulranzen; 10 = Kind auf Fahrrad; Heute = Teenager mit Handy]'),
    empty(),
    p('Schreibe zu jedem Alter einen Satz mit konnte / musste / wollte / durfte.'),
    empty(),
    p('Mit 4 Jahren: _____________________________________________________________.'),
    ...writeLines(1), empty(),
    p('Mit 7 Jahren: _____________________________________________________________.'),
    ...writeLines(1), empty(),
    p('Mit 10 Jahren: _____________________________________________________________.'),
    ...writeLines(1), empty(),
    p('Heute: _____________________________________________________________.'),
    ...writeLines(1),
    empty(), empty(),
    h2('Aufgabe 3 — Eigene Zeitlinie zeichnen und schreiben'),
    p('[BILD-PLATZHALTER: Leere Zeitlinie mit 3 Punkten zum Ausfüllen.]'),
    empty(),
    p('Zeichne deine eigene Zeitlinie. Schreibe zu jedem Punkt einen Satz.'),
    empty(),
    p('Alter ______: Ich konnte / musste / wollte _________________________________.'),
    ...writeLines(1), empty(),
    p('Alter ______: Ich konnte / musste / wollte _________________________________.'),
    ...writeLines(1), empty(),
    p('Heute:       Ich kann / muss / will _________________________________.'),
    ...writeLines(1)
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Modalverben im Präteritum'),
    empty(),
    h2('Aufgabe 1 — Beispielantworten'),
    p('1.  Als das Kind klein war, konnte es noch kein Fahrrad fahren.'),
    p('2.  Der Schüler musste lernen, obwohl er lieber spielen wollte.'),
    p('3.  Das Kind wollte ein Eis, aber es durfte keins bekommen.'),
    p('4.  Die Person wollte nicht aufräumen, weil sie so müde war.'),
    pItalic('Antworten hängen von den eingefügten Bildern ab. Inhaltlich passende Antworten akzeptieren.'),
    empty(),
    h2('Aufgabe 2 — Zeitlinie Beispielantworten'),
    p('Mit 4 Jahren: Ich konnte noch nicht lesen.'),
    p('Mit 7 Jahren: Ich musste jeden Tag in die Schule.'),
    p('Mit 10 Jahren: Ich wollte unbedingt ein Fahrrad haben.'),
    p('Heute: Ich darf länger aufbleiben als früher.'),
    empty(),
    h2('Aufgabe 3 — Eigene Zeitlinie'),
    pItalic('Individuelle Antworten. Kriterien:'),
    bullet('Korrekte Präteritumform (kein Umlaut!)'),
    bullet('Infinitiv am Ende des Satzes'),
    bullet('Sinnvolle Aussage zum genannten Alter')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
