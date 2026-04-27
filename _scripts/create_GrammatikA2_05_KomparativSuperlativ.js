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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Komparativ & Superlativ';
const TOPIC       = 'A2_Kinder_GrammatikA2_05_KomparativSuperlativ';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '05_KomparativSuperlativ'
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

const h1 = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const p = txt => new Paragraph({ children: [new TextRun({ text: txt, size: 24, font: 'Arial' })], spacing: { before: 80, after: 80 } });
const pBold = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 24, font: 'Arial' })], spacing: { before: 80, after: 80 } });
const pItalic = (txt, color) => new Paragraph({ children: [new TextRun({ text: txt, italics: true, size: 22, color: color || '888888', font: 'Arial' })], spacing: { before: 60, after: 60 } });
const empty = () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } });
const bullet = txt => new Paragraph({ children: [new TextRun({ text: txt, size: 24, font: 'Arial' })], numbering: { reference: 'bullet-list', level: 0 }, spacing: { before: 60, after: 60 } });
const writeLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const writeLines = n => Array.from({ length: n }, writeLine);

const hCell = (txt, w) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })] });
const dCell = (txt, w) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: txt, size: 22, font: 'Arial' })] })] });

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

(async () => {
  console.log('Erstelle Unterpunkt: Komparativ und Superlativ');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Komparativ und Superlativ'),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E7' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Merke: Steigerung der Adjektive', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Positiv:     schnell        |  Komparativ: schneller (als)  |  Superlativ: am schnellsten', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Vergleich:  A ist schneller als B.  |  A ist genauso schnell wie B.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Unregelmäßig:  gut → besser → am besten  |  viel → mehr → am meisten  |  gern → lieber → am liebsten', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Umlaut:  alt → älter → am ältesten  |  groß → größer → am größten  |  jung → jünger → am jüngsten', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Bilde Komparativ und Superlativ.'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 4), hCell('Komparativ', CONTENT / 4), hCell('Superlativ (am ...)', CONTENT / 4), hCell('Besonderheit', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schnell', CONTENT / 4), dCell('schneller', CONTENT / 4), dCell('am schnellsten', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('klein', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lang', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('laut', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('alt', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('groß', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('jung', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kalt', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gut', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('viel', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gern', CONTENT / 4), dCell('', CONTENT / 4), dCell('', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Schreibe Vergleichssätze.'),
    pItalic('Benutze: ... ist ... -er als ...  |  ... ist genauso ... wie ...'),
    empty(),
    p('1. (der Elefant / groß / die Maus) → Der Elefant ist __________________________________.'),
    p('2. (mein Bruder / alt / ich) → __________________________________.'),
    p('3. (ein Fahrrad / schnell / ein Auto — nein!) → __________________________________.'),
    p('4. (Sommer / warm / Winter) → __________________________________.'),
    p('5. (Mathe / interessant / Kunst — gleich!) → __________________________________.'),
    empty(),

    h2('Aufgabe 3: Bilde Superlativ-Sätze.'),
    pItalic('Benutze: ... ist am ... -sten.'),
    empty(),
    p('1. Der Nil ist lang. Welcher Fluss ist ________________________________? (lang)'),
    p('2. Das Kamel kann gut in der Wüste leben. Es kann _________________________ in der Wüste leben. (gut)'),
    p('3. Im Winter ist es kalt. Im Dezember ist es _________________________ kalt. (kalt)'),
    p('4. Mein Hund ist süß, aber Pandas sind ___________________________! (süß)'),
    ...writeLines(2),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Steigerungsformen'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 4), hCell('Komparativ', CONTENT / 4), hCell('Superlativ', CONTENT / 4), hCell('Besonderheit', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schnell', CONTENT / 4), dCell('schneller', CONTENT / 4), dCell('am schnellsten', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('klein', CONTENT / 4), dCell('kleiner', CONTENT / 4), dCell('am kleinsten', CONTENT / 4), dCell('—', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lang', CONTENT / 4), dCell('länger', CONTENT / 4), dCell('am längsten', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('laut', CONTENT / 4), dCell('lauter', CONTENT / 4), dCell('am lautesten', CONTENT / 4), dCell('-est- (auf -t)', CONTENT / 4)] }),
        new TableRow({ children: [dCell('alt', CONTENT / 4), dCell('älter', CONTENT / 4), dCell('am ältesten', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('groß', CONTENT / 4), dCell('größer', CONTENT / 4), dCell('am größten', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('jung', CONTENT / 4), dCell('jünger', CONTENT / 4), dCell('am jüngsten', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kalt', CONTENT / 4), dCell('kälter', CONTENT / 4), dCell('am kältesten', CONTENT / 4), dCell('Umlaut!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gut', CONTENT / 4), dCell('besser', CONTENT / 4), dCell('am besten', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('viel', CONTENT / 4), dCell('mehr', CONTENT / 4), dCell('am meisten', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gern', CONTENT / 4), dCell('lieber', CONTENT / 4), dCell('am liebsten', CONTENT / 4), dCell('unregelmäßig!', CONTENT / 4)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Vergleichssätze'),
    bullet('1. Der Elefant ist größer als die Maus.'),
    bullet('2. Mein Bruder ist älter als ich. / Ich bin jünger als mein Bruder.'),
    bullet('3. Ein Fahrrad ist nicht so schnell wie ein Auto. / Ein Auto ist schneller als ein Fahrrad.'),
    bullet('4. Der Sommer ist wärmer als der Winter.'),
    bullet('5. Mathe ist genauso interessant wie Kunst.'),
    empty(),
    h2('Aufgabe 3: Superlative'),
    bullet('1. Der Nil ist der längste Fluss. / am längsten.'),
    bullet('2. Es kann am besten in der Wüste leben.'),
    bullet('3. Im Dezember ist es am kältesten.'),
    bullet('4. Pandas sind am süßesten!'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Komparativ und Superlativ'),

    h2('Text: Die große Tierdiskussion'),
    pItalic('Lies den Text genau. Achte auf die fett gedruckten Komparativ- und Superlativformen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Die große Tierdiskussion', bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'In der Klasse 4c diskutieren die Kinder: Welches Tier ist das ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'interessanteste', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: '? Alle haben eine andere Meinung.', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Rico findet Geparden ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'am faszinierendsten', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: '. „Der Gepard ist das ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'schnellste', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Landtier der Welt — ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'viel schneller', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' als ein Pferd!" Mira widerspricht: „Aber Delfine sind ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'intelligenter', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' als viele andere Tiere!"', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Noah mag Elefanten am ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'liebsten', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: '. „Elefanten haben das ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'beste', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Gedächtnis aller Tiere. Und sie sind ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'viel größer', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' als Delfine!" Yara lacht: „Größe ist nicht ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'wichtiger', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' als Intelligenz. Ich finde Oktopusse ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'am klügsten', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' von allen!"', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Am Ende sind sich alle einig: Die Natur ist ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'spannender', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' als jedes Buch — und Tiere sind die ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'interessantesten', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Lebewesen der Welt!', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Rico findet Delfine am faszinierendsten.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Gepard ist das schnellste Landtier.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mira findet Delfine intelligenter als viele andere Tiere.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Noah mag Elefanten am liebsten.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Yara findet Elefanten am klügsten.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Alle sind sich am Ende einig.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Beantworte die Fragen.'),
    p('1. Welches Tier findet Rico am faszinierendsten? Warum?'),
    writeLine(), writeLine(),
    p('2. Was hat der Elefant laut Noah von allen Tieren am besten?'),
    writeLine(), writeLine(),
    p('3. Welches Tier findet Yara am klügsten?'),
    writeLine(),
    empty(),

    h2('Aufgabe 3: Suche alle Komparativ- und Superlativ-Formen im Text.'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Form im Text', CONTENT / 3), hCell('Positiv (Grundform)', CONTENT / 3), hCell('Komparativ oder Superlativ?', CONTENT / 3)] }),
        new TableRow({ children: [dCell('interessanteste', CONTENT / 3), dCell('interessant', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
        new TableRow({ children: [dCell('', CONTENT / 3), dCell('', CONTENT / 3), dCell('', CONTENT / 3)] }),
      ]
    }),
  ], `${TOPIC}_Lesen.docx`);

  // ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Leseübung'),
    h2('Aufgabe 1: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Rico findet Delfine am faszinierendsten.', CONTENT * 4/5), dCell('F (Geparden)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Gepard ist das schnellste Landtier.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mira findet Delfine intelligenter als viele andere Tiere.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Noah mag Elefanten am liebsten.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Yara findet Elefanten am klügsten.', CONTENT * 4/5), dCell('F (Oktopusse)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Alle sind sich am Ende einig.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Fragen'),
    bullet('1. Den Gepard — weil er das schnellste Landtier der Welt ist (viel schneller als ein Pferd).'),
    bullet('2. Das beste Gedächtnis aller Tiere.'),
    bullet('3. Oktopusse.'),
    empty(),
    h2('Aufgabe 3: Formen im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Form', CONTENT / 3), hCell('Positiv', CONTENT / 3), hCell('Art', CONTENT / 3)] }),
        new TableRow({ children: [dCell('interessanteste', CONTENT / 3), dCell('interessant', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('am faszinierendsten', CONTENT / 3), dCell('faszinierend', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('schnellste', CONTENT / 3), dCell('schnell', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('viel schneller', CONTENT / 3), dCell('schnell', CONTENT / 3), dCell('Komparativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('intelligenter', CONTENT / 3), dCell('intelligent', CONTENT / 3), dCell('Komparativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('am liebsten', CONTENT / 3), dCell('gern', CONTENT / 3), dCell('Superlativ (unregelm.)', CONTENT / 3)] }),
        new TableRow({ children: [dCell('beste', CONTENT / 3), dCell('gut', CONTENT / 3), dCell('Superlativ (unregelm.)', CONTENT / 3)] }),
        new TableRow({ children: [dCell('viel größer', CONTENT / 3), dCell('groß', CONTENT / 3), dCell('Komparativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('wichtiger', CONTENT / 3), dCell('wichtig', CONTENT / 3), dCell('Komparativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('am klügsten', CONTENT / 3), dCell('klug', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('spannender', CONTENT / 3), dCell('spannend', CONTENT / 3), dCell('Komparativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('interessantesten', CONTENT / 3), dCell('interessant', CONTENT / 3), dCell('Superlativ', CONTENT / 3)] }),
      ]
    }),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Komparativ und Superlativ'),

    h2('Aufgabe 1: Setze den Komparativ ein (-er als).'),
    empty(),
    p('1. Ein Hund ist ______________ als eine Katze. (groß)'),
    p('2. Im Sommer ist es ______________ als im Winter. (warm)'),
    p('3. Das Buch ist ______________ als der Film. (interessant)'),
    p('4. Meine Schwester ist ______________ als ich. (jung)'),
    p('5. Diese Aufgabe ist ______________ als die letzte. (leicht)'),
    p('6. Der Zug ist ______________ als das Fahrrad. (schnell)'),
    p('7. Ich esse ______________ Gemüse als mein Bruder. (viel → mehr)'),
    p('8. Heute lerne ich ______________ als gestern. (gern → lieber)'),
    empty(),

    h2('Aufgabe 2: Setze den Superlativ ein (am ...-sten).'),
    empty(),
    p('1. Der Mount Everest ist der ______________ Berg der Welt. (hoch)'),
    p('2. Im Januar ist es ______________ kalt. (kalt)'),
    p('3. Mein Opa ist der ______________ Mensch in unserer Familie. (alt)'),
    p('4. Diese Aufgabe hat mir ______________ gefallen. (gut → best-)'),
    p('5. Ich mag Schokolade ______________ von allen Süßigkeiten. (gern → liebst-)'),
    p('6. Im Zoo war das Känguru ______________ . (lustig)'),
    empty(),

    h2('Aufgabe 3: als oder wie? Ergänze.'),
    pItalic('Komparativ → als  |  genauso ... wie → wie'),
    empty(),
    p('1. Ein Elefant ist größer ______ ein Hund.'),
    p('2. Meine Katze ist genauso alt ______ dein Hund.'),
    p('3. Der Film war besser ______ das Buch.'),
    p('4. Sie singt genauso gut ______ ihre Schwester.'),
    p('5. Es ist heute kälter ______ gestern.'),
    p('6. Das Essen schmeckt genauso lecker ______ bei Oma.'),
    empty(),

    h2('Aufgabe 4: Schreibe 3 eigene Vergleichssätze.'),
    pItalic('Vergleiche Tiere, Personen, Jahreszeiten oder Schulfächer.'),
    p('1. ______________________________________________.'),
    writeLine(),
    p('2. ______________________________________________.'),
    writeLine(),
    p('3. ______________________________________________.'),
    writeLine(),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1: Komparativ'),
    bullet('1. größer  2. wärmer  3. interessanter  4. jünger  5. leichter  6. schneller  7. mehr  8. lieber'),
    empty(),
    h2('Aufgabe 2: Superlativ'),
    bullet('1. höchste  2. am kältesten  3. älteste  4. am besten  5. am liebsten  6. am lustigsten'),
    empty(),
    h2('Aufgabe 3: als / wie'),
    bullet('1. als  2. wie  3. als  4. wie  5. als  6. wie'),
    empty(),
    h2('Aufgabe 4'),
    pItalic('Individuelle Antworten. Komparativ mit als / genauso ... wie korrekt prüfen.'),
    pBold('Beispiele: Ein Tiger ist schneller als ein Hund. / Englisch ist genauso schwer wie Deutsch. / Der Sommer ist wärmer als der Herbst.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Komparativ und Superlativ'),
    empty(),

    pBold('Regelmäßige Steigerung: + -er / am + -sten'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 4), hCell('Komparativ', CONTENT / 4), hCell('Superlativ', CONTENT / 4), hCell('Beispiel', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schnell', CONTENT / 4), dCell('schneller', CONTENT / 4), dCell('am schnellsten', CONTENT / 4), dCell('Das Auto ist am schnellsten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('klein', CONTENT / 4), dCell('kleiner', CONTENT / 4), dCell('am kleinsten', CONTENT / 4), dCell('Die Maus ist am kleinsten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('laut', CONTENT / 4), dCell('lauter', CONTENT / 4), dCell('am lautesten', CONTENT / 4), dCell('Der Löwe ist am lautesten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('leicht', CONTENT / 4), dCell('leichter', CONTENT / 4), dCell('am leichtesten', CONTENT / 4), dCell('Diese Aufgabe ist am leichtesten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('interessant', CONTENT / 4), dCell('interessanter', CONTENT / 4), dCell('am interessantesten', CONTENT / 4), dCell('Tiere sind am interessantesten.', CONTENT / 4)] }),
      ]
    }),
    empty(),

    pBold('Umlaut-Steigerung: a → ä, o → ö, u → ü'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 4), hCell('Komparativ', CONTENT / 4), hCell('Superlativ', CONTENT / 4), hCell('Beispiel', CONTENT / 4)] }),
        new TableRow({ children: [dCell('alt', CONTENT / 4), dCell('älter', CONTENT / 4), dCell('am ältesten', CONTENT / 4), dCell('Opa ist am ältesten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('groß', CONTENT / 4), dCell('größer', CONTENT / 4), dCell('am größten', CONTENT / 4), dCell('Der Elefant ist am größten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('jung', CONTENT / 4), dCell('jünger', CONTENT / 4), dCell('am jüngsten', CONTENT / 4), dCell('Das Baby ist am jüngsten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kalt', CONTENT / 4), dCell('kälter', CONTENT / 4), dCell('am kältesten', CONTENT / 4), dCell('Januar ist am kältesten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('warm', CONTENT / 4), dCell('wärmer', CONTENT / 4), dCell('am wärmsten', CONTENT / 4), dCell('Juli ist am wärmsten.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lang', CONTENT / 4), dCell('länger', CONTENT / 4), dCell('am längsten', CONTENT / 4), dCell('Der Nil ist am längsten.', CONTENT / 4)] }),
      ]
    }),
    empty(),

    pBold('Unregelmäßige Steigerung — auswendig lernen!'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 4), hCell('Komparativ', CONTENT / 4), hCell('Superlativ', CONTENT / 4), hCell('Beispiel', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gut', CONTENT / 4), dCell('besser', CONTENT / 4), dCell('am besten', CONTENT / 4), dCell('Das schmeckt am besten!', CONTENT / 4)] }),
        new TableRow({ children: [dCell('viel', CONTENT / 4), dCell('mehr', CONTENT / 4), dCell('am meisten', CONTENT / 4), dCell('Er hat am meisten gegessen.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gern', CONTENT / 4), dCell('lieber', CONTENT / 4), dCell('am liebsten', CONTENT / 4), dCell('Ich esse am liebsten Pizza.', CONTENT / 4)] }),
        new TableRow({ children: [dCell('hoch', CONTENT / 4), dCell('höher', CONTENT / 4), dCell('am höchsten', CONTENT / 4), dCell('Der Berg ist am höchsten.', CONTENT / 4)] }),
      ]
    }),
    empty(),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'E8F8E8' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Vergleichsstrukturen', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'A ist [Komparativ] als B.         →  Ein Hund ist größer als eine Katze.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'A ist genauso [Positiv] wie B.  →  Tom ist genauso groß wie Leo.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'A ist am [Superlativ]-sten.       →  Der Gepard ist am schnellsten.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),
    pItalic('Tipp: Schreibe die unregelmäßigen Formen (gut-besser-best, viel-mehr-meist, gern-lieber-liebst) auf Lernkarten!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Referenztabelle. Prüfe mündlich: Lehrer nennt Positiv, Schüler nennt Komparativ und Superlativ.'),
    empty(),
    h2('Schnell-Test: Unregelmäßige Formen'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Positiv', CONTENT / 3), hCell('Komparativ', CONTENT / 3), hCell('Superlativ', CONTENT / 3)] }),
        new TableRow({ children: [dCell('gut', CONTENT / 3), dCell('besser', CONTENT / 3), dCell('am besten', CONTENT / 3)] }),
        new TableRow({ children: [dCell('viel', CONTENT / 3), dCell('mehr', CONTENT / 3), dCell('am meisten', CONTENT / 3)] }),
        new TableRow({ children: [dCell('gern', CONTENT / 3), dCell('lieber', CONTENT / 3), dCell('am liebsten', CONTENT / 3)] }),
        new TableRow({ children: [dCell('hoch', CONTENT / 3), dCell('höher', CONTENT / 3), dCell('am höchsten', CONTENT / 3)] }),
      ]
    }),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Komparativ und Superlativ'),

    h2('Dialog 1: Meinungsverschiedenheit — Was ist besser?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich finde ______ am besten!', CONTENT / 2), dCell('Wirklich? Ich finde ______ besser als ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Aber ______ ist doch ______er als ______!', CONTENT / 2), dCell('Das stimmt nicht! ______ ist genauso ______ wie ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was magst du am liebsten?', CONTENT / 2), dCell('Am liebsten mag ich ______. Was ist dein Lieblingstier/Lieblingsfach?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich finde ______ am interessantesten, weil ______.', CONTENT / 2), dCell('Das kann ich verstehen. Aber für mich ist ______ am wichtigsten.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Die Reiseplanung'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Wohin sollen wir in den Urlaub fahren — Berge oder Meer?'),
    p('B: Ich finde das Meer ______________ als die Berge. Es ist ______________ und ______________.'),
    p('A: Aber die Berge sind doch ______________! Die Luft ist ______________ als am Meer.'),
    p('B: Hmm. Was ist dir ______________ — Schwimmen oder Wandern?'),
    p('A: Ich wandere ______________ als ich schwimme. Also Berge!'),
    p('B: Na gut! Aber welche Berge? Die Alpen sind die ______________!'),
    p('A: Stimmt, die Alpen sind ______________ als der Schwarzwald.'),
    p('B: Einverstanden! Die Alpen sind am ______________!'),
    empty(),

    h2('Partnerinterview: Was findest du am ...?'),
    pItalic('Frage deinen Partner / deine Partnerin. Antworte mit Komparativ oder Superlativ.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort (Komparativ / Superlativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Welches Tier findest du am interessantesten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was isst du am liebsten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Welches Schulfach ist für dich am schwersten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Welche Jahreszeit ist am schönsten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was kannst du besser als dein Freund / deine Freundin?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Komparativ korrekt gebildet (+ -er, Umlaut beachten, unregelmäßige Formen)'),
    bullet('Superlativ korrekt: am + -sten (oder am besten / am liebsten / am meisten)'),
    bullet('als nach Komparativ (nicht wie!)'),
    bullet('genauso ... wie für Gleichheit'),
    bullet('Begründung mit weil möglich und erwünscht'),
    empty(),
    h2('Dialog 2 — Mögliche Formen'),
    bullet('schöner / wärmer / entspannter (o.ä.)'),
    bullet('schöner / frischer'),
    bullet('wichtiger'),
    bullet('lieber'),
    bullet('höchsten / schönsten'),
    bullet('schöner / höher'),
    bullet('schönsten / besten'),
    empty(),
    pItalic('Individuelle Antworten im Interview akzeptieren. Steigerungsform und als/wie korrekt prüfen.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Komparativ und Superlativ'),

    h2('Aufgabe 1: Vergleiche die Tiere! Schreibe Sätze.'),
    pItalic('Benutze: größer als • kleiner als • schneller als • langsamer als • am größten • am schnellsten'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [new TableCell({
          width: { size: CONTENT, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' },
          children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Drei Tiere nebeneinander mit Größenangaben: Elefant (3,5 m), Hund (0,5 m), Maus (0,1 m)]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 100, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Drei Tiere mit Geschwindigkeitsangaben: Gepard (120 km/h), Pferd (65 km/h), Schildkröte (0,3 km/h)]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 60, after: 100 } }),
          ]
        })]})
      ]
    }),
    p('1. Der Elefant ist ______________ als der Hund.'),
    p('2. Die Maus ist das ______________ Tier.'),
    p('3. Der Gepard ist ______________ als das Pferd.'),
    p('4. Die Schildkröte ist am ______________.'),
    p('5. Der Gepard ist das ______________ Tier von allen dreien.'),
    empty(),

    h2('Aufgabe 2: Klassenumfrage — Was ist am beliebtesten?'),
    pItalic('[BILD 3: Balkendiagramm — Lieblingstiere der Klasse 4a]'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Hund:      ████████████████ 16 Kinder', size: 22, font: 'Arial' })], spacing: { before: 60, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Katze:     ████████████ 12 Kinder', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Delfin:    ████████ 8 Kinder', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Pinguin:   █████ 5 Kinder', size: 22, font: 'Arial' })], spacing: { before: 40, after: 60 } }),
        ]
      })]})],
    }),
    empty(),
    p('1. Welches Tier ist am beliebtesten?  →  ____________________________'),
    p('2. Die Katze ist __________________ als der Delfin, aber __________________ als der Hund.'),
    p('3. Der Pinguin ist am _______________________.'),
    p('4. Schreibe einen vollständigen Satz mit Superlativ:'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Zeichne und vergleiche!'),
    pItalic('[BILD 4: Leerer Rahmen — Zeichne 3 Dinge / Tiere / Personen und vergleiche sie.]'),
    pItalic('Schreibe 3 Vergleichssätze mit Komparativ und 1 Superlativ-Satz.'),
    ...writeLines(4),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Tiere vergleichen'),
    bullet('1. Der Elefant ist größer als der Hund.'),
    bullet('2. Die Maus ist das kleinste Tier.'),
    bullet('3. Der Gepard ist schneller als das Pferd.'),
    bullet('4. Die Schildkröte ist am langsamsten.'),
    bullet('5. Der Gepard ist das schnellste Tier von allen dreien.'),
    empty(),
    h2('Aufgabe 2: Diagramm'),
    bullet('1. Der Hund ist am beliebtesten.'),
    bullet('2. Die Katze ist beliebter als der Delfin, aber weniger beliebt als der Hund. (oder: nicht so beliebt wie der Hund)'),
    bullet('3. Der Pinguin ist am wenigsten beliebt.'),
    bullet('4. Beispiel: Der Hund ist das beliebteste Tier in der Klasse 4a.'),
    empty(),
    h2('Aufgabe 3: Eigene Zeichnung'),
    pItalic('Individuelle kreative Antworten. Komparativ mit als / Superlativ mit am...-sten prüfen.'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
