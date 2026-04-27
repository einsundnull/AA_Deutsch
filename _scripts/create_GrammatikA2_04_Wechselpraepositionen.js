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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Wechselpräpositionen';
const TOPIC       = 'A2_Kinder_GrammatikA2_04_Wechselpraepositionen';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '04_Wechselpraepositionen'
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
const cCell = (txt, w, fill) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: fill || 'FFFFFF' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })] });

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
  console.log('Erstelle Unterpunkt: Wechselpräpositionen');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Wechselpräpositionen'),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E7' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Merke: Wechselpräpositionen', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Wo? (Ort/Lage) → Dativ:      Das Buch liegt auf dem Tisch.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Wohin? (Richtung) → Akkusativ:  Ich lege das Buch auf den Tisch.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Die 9 Wechselpräpositionen: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: 'an • auf • hinter • in • neben • über • unter • vor • zwischen', size: 22, font: 'Arial' })
          ], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Dativ: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: 'dem (m./n.) / der (f.)   |   ', size: 22, font: 'Arial' }),
            new TextRun({ text: 'Akkusativ: ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: 'den (m.) / die (f.) / das (n.)', size: 22, font: 'Arial' })
          ], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Wo oder Wohin? Wähle Dativ oder Akkusativ.'),
    pItalic('Schreibe den richtigen Artikel in die Lücke.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Satz', CONTENT * 3/5), hCell('Wo? / Wohin?', CONTENT / 5), hCell('Dativ / Akk.', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Katze sitzt auf _____ Sofa. (das)', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('dem Sofa', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ich hänge das Bild an _____ Wand. (die)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Heft liegt in _____ Tasche. (die)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er stellt das Glas auf _____ Tisch. (der)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Schuhe stehen vor _____ Tür. (die)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Sie legt das Buch in _____ Rucksack. (der)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Hund liegt unter _____ Bett. (das)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ich setze mich neben _____ Freund. (der)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Fahrrad steht hinter _____ Haus. (das)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er hängt die Jacke über _____ Stuhl. (der)', CONTENT * 3/5), dCell('', CONTENT / 5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: liegen/stehen/hängen vs. legen/stellen/hängen — Bilde Sätze.'),
    pItalic('Wo? → liegen/stehen/hängen (Dativ)   |   Wohin? → legen/stellen/hängen (Akkusativ)'),
    empty(),
    p('1. Das Buch / auf / der Tisch (liegen) →'),
    writeLine(),
    p('2. Ich / das Buch / auf / der Tisch (legen) →'),
    writeLine(),
    p('3. Die Lampe / über / das Sofa (hängen, Wo?) →'),
    writeLine(),
    p('4. Er / die Lampe / über / das Sofa (hängen, Wohin?) →'),
    writeLine(),
    p('5. Der Stuhl / neben / das Fenster (stehen) →'),
    writeLine(),
    p('6. Sie / den Stuhl / neben / das Fenster (stellen) →'),
    writeLine(),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Wo? / Wohin? — Dativ / Akkusativ'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Satz', CONTENT * 3/5), hCell('Wo? / Wohin?', CONTENT / 5), hCell('Lösung', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Katze sitzt auf _____ Sofa.', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('dem Sofa', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ich hänge das Bild an _____ Wand.', CONTENT * 3/5), dCell('Wohin?', CONTENT / 5), dCell('die Wand', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Heft liegt in _____ Tasche.', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('der Tasche', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er stellt das Glas auf _____ Tisch.', CONTENT * 3/5), dCell('Wohin?', CONTENT / 5), dCell('den Tisch', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Schuhe stehen vor _____ Tür.', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('der Tür', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Sie legt das Buch in _____ Rucksack.', CONTENT * 3/5), dCell('Wohin?', CONTENT / 5), dCell('den Rucksack', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Hund liegt unter _____ Bett.', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('dem Bett', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ich setze mich neben _____ Freund.', CONTENT * 3/5), dCell('Wohin?', CONTENT / 5), dCell('den Freund', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Fahrrad steht hinter _____ Haus.', CONTENT * 3/5), dCell('Wo?', CONTENT / 5), dCell('dem Haus', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er hängt die Jacke über _____ Stuhl.', CONTENT * 3/5), dCell('Wohin?', CONTENT / 5), dCell('den Stuhl', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Sätze'),
    bullet('1. Das Buch liegt auf dem Tisch.'),
    bullet('2. Ich lege das Buch auf den Tisch.'),
    bullet('3. Die Lampe hängt über dem Sofa.'),
    bullet('4. Er hängt die Lampe über das Sofa.'),
    bullet('5. Der Stuhl steht neben dem Fenster.'),
    bullet('6. Sie stellt den Stuhl neben das Fenster.'),
    pItalic('Merkhilfe: liegen/stehen/hängen (ohne Objekt bewegen) → Dativ. legen/stellen/hängen (etwas bewegen) → Akkusativ.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Wechselpräpositionen'),

    h2('Text: Chaos im Kinderzimmer'),
    pItalic('Lies den Text genau. Achte auf die fett gedruckten Präpositionen + Artikel.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Chaos im Kinderzimmer', bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Mias Zimmer sieht heute aus wie nach einem Sturm. Ihre Bücher liegen ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'auf dem', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Boden, obwohl sie eigentlich ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'im', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Regal stehen sollen. Ihr Rucksack hängt nicht ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'an der', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Tür, sondern liegt mitten ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'auf dem', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Schreibtisch.', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Mama kommt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ins', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Zimmer und seufzt. „Mia! Leg die Bücher bitte ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ins', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Regal! Stell die Schuhe ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'vor die', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Tür! Und häng den Rucksack ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'an den', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Haken!"', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Mia räumt auf. Sie legt die Bücher ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ins', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Regal, stellt die Schuhe ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'vor die', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Tür und hängt den Rucksack ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'an den', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Haken. Am Ende sieht alles wieder ordentlich aus. Die Bücher stehen jetzt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'im', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Regal, die Schuhe stehen ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'vor der', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Tür und der Rucksack hängt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'am', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Haken.', size: 26, font: 'Arial' }),
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
        new TableRow({ children: [dCell('Mias Bücher liegen auf dem Boden.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Rucksack hängt an der Tür.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mama sagt, Mia soll die Bücher ins Regal legen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Am Ende stehen die Schuhe im Regal.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Rucksack hängt am Ende am Haken.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Wo lag/stand/hing es vorher — und wo ist es nachher?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Gegenstand', CONTENT / 4), hCell('Vorher (Wo? = Dativ)', CONTENT * 3/8), hCell('Nachher (Wo? = Dativ)', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('die Bücher', CONTENT / 4), dCell('auf dem Boden', CONTENT * 3/8), dCell('', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('der Rucksack', CONTENT / 4), dCell('', CONTENT * 3/8), dCell('', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('die Schuhe', CONTENT / 4), dCell('', CONTENT * 3/8), dCell('', CONTENT * 3/8)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 3: Unterstreiche alle Wechselpräpositionen + Artikel im Text.'),
    pItalic('Trage sie hier ein und schreibe Wo? (Dativ) oder Wohin? (Akkusativ) daneben.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Präp. + Artikel', CONTENT / 2), hCell('Wo? oder Wohin?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('auf dem Boden', CONTENT / 2), dCell('Wo?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
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
        new TableRow({ children: [dCell('Mias Bücher liegen auf dem Boden.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Rucksack hängt an der Tür.', CONTENT * 4/5), dCell('F (liegt auf dem Schreibtisch)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mama sagt, Mia soll die Bücher ins Regal legen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Am Ende stehen die Schuhe im Regal.', CONTENT * 4/5), dCell('F (vor der Tür)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Rucksack hängt am Ende am Haken.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Vorher / Nachher'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Gegenstand', CONTENT / 4), hCell('Vorher', CONTENT * 3/8), hCell('Nachher', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('die Bücher', CONTENT / 4), dCell('auf dem Boden', CONTENT * 3/8), dCell('im Regal', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('der Rucksack', CONTENT / 4), dCell('auf dem Schreibtisch', CONTENT * 3/8), dCell('am Haken', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('die Schuhe', CONTENT / 4), dCell('(nicht erwähnt / irgendwo)', CONTENT * 3/8), dCell('vor der Tür', CONTENT * 3/8)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 3: Wechselpräpositionen im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Präp. + Artikel', CONTENT / 2), hCell('Wo? oder Wohin?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('auf dem Boden', CONTENT / 2), dCell('Wo? (Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('im Regal', CONTENT / 2), dCell('Wo? (Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('an der Tür', CONTENT / 2), dCell('Wo? (Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('auf dem Schreibtisch', CONTENT / 2), dCell('Wo? (Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ins Regal (= in das)', CONTENT / 2), dCell('Wohin? (Akkusativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('vor die Tür', CONTENT / 2), dCell('Wohin? (Akkusativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('an den Haken', CONTENT / 2), dCell('Wohin? (Akkusativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('am Haken (= an dem)', CONTENT / 2), dCell('Wo? (Dativ)', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Wechselpräpositionen'),

    h2('Aufgabe 1: dem oder den/die/das? Setze den richtigen Artikel ein.'),
    pItalic('Achte: Wo? → Dativ  |  Wohin? → Akkusativ'),
    empty(),
    p('1. Die Katze sitzt auf ______ Sofa. (das Sofa, Wo?)'),
    p('2. Er legt das Heft in ______ Tasche. (die Tasche, Wohin?)'),
    p('3. Das Bild hängt an ______ Wand. (die Wand, Wo?)'),
    p('4. Sie stellt die Vase auf ______ Tisch. (der Tisch, Wohin?)'),
    p('5. Der Hund schläft unter ______ Bett. (das Bett, Wo?)'),
    p('6. Ich lege den Brief vor ______ Tür. (die Tür, Wohin?)'),
    p('7. Der Ball liegt hinter ______ Tor. (das Tor, Wo?)'),
    p('8. Sie hängt den Mantel an ______ Haken. (der Haken, Wohin?)'),
    p('9. Das Kind steht zwischen ______ Eltern. (die Eltern, Pl., Wo?)'),
    p('10. Er stellt das Fahrrad neben ______ Garage. (die Garage, Wohin?)'),
    empty(),

    h2('Aufgabe 2: Wähle das richtige Verb (Wo oder Wohin?).'),
    pItalic('liegen / legen  •  stehen / stellen  •  hängen (Wo?) / hängen (Wohin?)'),
    empty(),
    p('1. Das Buch ______ auf dem Tisch. (es liegt dort schon)'),
    p('2. Ich ______ das Buch auf den Tisch. (ich bringe es dorthin)'),
    p('3. Die Jacke ______ an der Tür. (sie ist schon dort)'),
    p('4. Er ______ die Jacke an die Tür. (er bringt sie dorthin)'),
    p('5. Die Tassen ______ im Schrank. (sie sind schon dort)'),
    p('6. Sie ______ die Tassen in den Schrank. (sie bringt sie dorthin)'),
    empty(),

    h2('Aufgabe 3: Beschreibe dein Zimmer — Wo steht/liegt/hängt was?'),
    pItalic('Schreibe 4 Sätze mit Wechselpräpositionen + Dativ (Wo?).'),
    pItalic('Beispiel: Mein Bett steht neben dem Fenster. Mein Rucksack hängt an der Tür.'),
    ...writeLines(5),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1: Artikel'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nr.', CONTENT / 8), hCell('Artikel', CONTENT * 2/8), hCell('Kasus', CONTENT * 2/8), hCell('Vollständig', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('1', CONTENT / 8), dCell('dem', CONTENT * 2/8), dCell('Dativ (Wo?)', CONTENT * 2/8), dCell('auf dem Sofa', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('2', CONTENT / 8), dCell('die', CONTENT * 2/8), dCell('Akkusativ (Wohin?)', CONTENT * 2/8), dCell('in die Tasche', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('3', CONTENT / 8), dCell('der', CONTENT * 2/8), dCell('Dativ (Wo?)', CONTENT * 2/8), dCell('an der Wand', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('4', CONTENT / 8), dCell('den', CONTENT * 2/8), dCell('Akkusativ (Wohin?)', CONTENT * 2/8), dCell('auf den Tisch', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('5', CONTENT / 8), dCell('dem', CONTENT * 2/8), dCell('Dativ (Wo?)', CONTENT * 2/8), dCell('unter dem Bett', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('6', CONTENT / 8), dCell('die', CONTENT * 2/8), dCell('Akkusativ (Wohin?)', CONTENT * 2/8), dCell('vor die Tür', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('7', CONTENT / 8), dCell('dem', CONTENT * 2/8), dCell('Dativ (Wo?)', CONTENT * 2/8), dCell('hinter dem Tor', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('8', CONTENT / 8), dCell('den', CONTENT * 2/8), dCell('Akkusativ (Wohin?)', CONTENT * 2/8), dCell('an den Haken', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('9', CONTENT / 8), dCell('den', CONTENT * 2/8), dCell('Dativ Pl. (Wo?)', CONTENT * 2/8), dCell('zwischen den Eltern', CONTENT * 3/8)] }),
        new TableRow({ children: [dCell('10', CONTENT / 8), dCell('die', CONTENT * 2/8), dCell('Akkusativ (Wohin?)', CONTENT * 2/8), dCell('neben die Garage', CONTENT * 3/8)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Verb-Paare'),
    bullet('1. liegt  2. lege  3. hängt  4. hängt (er hängt sie)  5. stehen  6. stellt'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten. Dativ-Artikel nach Wechselpräposition korrekt prüfen.'),
    pBold('Beispiele: Mein Schreibtisch steht neben dem Bett. Das Poster hängt an der Wand über dem Schreibtisch.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Wechselpräpositionen'),
    empty(),

    pBold('Die 9 Wechselpräpositionen — Übersicht'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Präp.', CONTENT / 5), hCell('Wo? + Dativ (Beispiel)', CONTENT * 2/5), hCell('Wohin? + Akk. (Beispiel)', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('an', CONTENT / 5), dCell('Das Bild hängt an der Wand.', CONTENT * 2/5), dCell('Ich hänge das Bild an die Wand.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('auf', CONTENT / 5), dCell('Das Buch liegt auf dem Tisch.', CONTENT * 2/5), dCell('Ich lege das Buch auf den Tisch.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('hinter', CONTENT / 5), dCell('Die Katze sitzt hinter dem Sofa.', CONTENT * 2/5), dCell('Sie läuft hinter das Sofa.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('in', CONTENT / 5), dCell('Das Heft liegt im Rucksack.', CONTENT * 2/5), dCell('Ich lege das Heft in den Rucksack.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('neben', CONTENT / 5), dCell('Er sitzt neben dem Fenster.', CONTENT * 2/5), dCell('Er setzt sich neben das Fenster.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('über', CONTENT / 5), dCell('Die Lampe hängt über dem Tisch.', CONTENT * 2/5), dCell('Er hängt die Lampe über den Tisch.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('unter', CONTENT / 5), dCell('Der Hund liegt unter dem Bett.', CONTENT * 2/5), dCell('Er krabbelt unter das Bett.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('vor', CONTENT / 5), dCell('Die Schuhe stehen vor der Tür.', CONTENT * 2/5), dCell('Ich stelle die Schuhe vor die Tür.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('zwischen', CONTENT / 5), dCell('Das Kind sitzt zwischen den Eltern.', CONTENT * 2/5), dCell('Das Kind setzt sich zwischen die Eltern.', CONTENT * 2/5)] }),
      ]
    }),
    empty(),

    pBold('Verben-Paare: Wo? vs. Wohin?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wo? → Dativ (Zustand)', CONTENT / 2), hCell('Wohin? → Akkusativ (Bewegung)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('liegen — Das Buch liegt auf dem Tisch.', CONTENT / 2), dCell('legen — Ich lege das Buch auf den Tisch.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('stehen — Der Stuhl steht neben der Wand.', CONTENT / 2), dCell('stellen — Ich stelle den Stuhl neben die Wand.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('hängen — Die Jacke hängt an der Tür.', CONTENT / 2), dCell('hängen — Ich hänge die Jacke an die Tür.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('sitzen — Er sitzt auf dem Stuhl.', CONTENT / 2), dCell('setzen (sich) — Er setzt sich auf den Stuhl.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('stecken — Der Schlüssel steckt im Schloss.', CONTENT / 2), dCell('stecken — Ich stecke den Schlüssel ins Schloss.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    pBold('Häufige Verschmelzungen (Präp. + Artikel)'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Lang', CONTENT / 4), hCell('Kurz', CONTENT / 4), hCell('Lang', CONTENT / 4), hCell('Kurz', CONTENT / 4)] }),
        new TableRow({ children: [dCell('in dem', CONTENT / 4), dCell('im', CONTENT / 4), dCell('in das', CONTENT / 4), dCell('ins', CONTENT / 4)] }),
        new TableRow({ children: [dCell('an dem', CONTENT / 4), dCell('am', CONTENT / 4), dCell('an das', CONTENT / 4), dCell('ans', CONTENT / 4)] }),
        new TableRow({ children: [dCell('auf dem', CONTENT / 4), dCell('(kein)', CONTENT / 4), dCell('auf das', CONTENT / 4), dCell('(kein)', CONTENT / 4)] }),
      ]
    }),
    empty(),
    pItalic('Tipp: Frage immer zuerst: Bewegt sich etwas (Wohin?) oder ist es ruhig (Wo?)!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Referenztabelle ohne Lücken. Prüfe mündlich oder durch eigene Beispielsätze.'),
    empty(),
    h2('Schnell-Test: Wo oder Wohin?'),
    bullet('Das Buch liegt auf dem Tisch.  → Wo? Dativ ✓'),
    bullet('Ich lege das Buch auf den Tisch.  → Wohin? Akkusativ ✓'),
    bullet('Die Katze sitzt in der Kiste.  → Wo? Dativ ✓'),
    bullet('Die Katze springt in die Kiste.  → Wohin? Akkusativ ✓'),
    empty(),
    pBold('Merksatz: „Wo ich BIN → Dativ. Wo ich HINgehe → Akkusativ."'),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Wechselpräpositionen'),

    h2('Dialog 1: Wo ist mein ...?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hast du meinen ______ gesehen?', CONTENT / 2), dCell('Ja, er liegt auf ______. / Er steht in ______. / Er hängt an ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ach so! Und wo ist meine ______?', CONTENT / 2), dCell('Die liegt unter ______. / Die steht neben ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Kannst du ______ auf ______ legen?', CONTENT / 2), dCell('Klar! Ich lege es gleich auf ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wohin soll ich ______ stellen?', CONTENT / 2), dCell('Stell es bitte in ______ / neben ______ / vor ______.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Ein neues Zimmer einrichten'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Wohin soll ich das Bett stellen?'),
    p('B: Stell es ______ das Fenster.  (neben)'),
    p('A: Und wo hänge ich das Poster hin?'),
    p('B: Häng es ______ das Bett.  (über)'),
    p('A: Soll der Schreibtisch ______ dem Regal stehen?  (neben)'),
    p('B: Ja, genau! Und leg die Bücher ______ das Regal.  (in)'),
    p('A: Wo soll der Teppich liegen?'),
    p('B: Leg ihn ______ dem Bett.  (vor)  Dann liegt er schön ______ dem Bett.'),
    p('A: Super! Das Zimmer sieht gut aus ______ dem Schreibtisch ______ dem Fenster!'),
    empty(),

    h2('Partnerinterview: Wie sieht dein Zimmer aus?'),
    pItalic('Beschreibe deinem Partner / deiner Partnerin dein Zimmer. Benutze Wechselpräpositionen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort (mit Wo?-Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wo steht dein Bett?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hängt an deiner Wand?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was liegt auf deinem Schreibtisch?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wo hängst du deinen Rucksack hin?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was steht neben deinem Bett?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Wo? → Dativ (dem/der nach Wechselpräposition)'),
    bullet('Wohin? → Akkusativ (den/die/das nach Wechselpräposition)'),
    bullet('Verb-Paar korrekt: liegen vs. legen, stehen vs. stellen, hängen vs. hängen'),
    bullet('Verschmelzungen erkannt: im = in dem, ins = in das, am = an dem, ans = an das'),
    empty(),
    h2('Dialog 2 — Lösungen'),
    bullet('neben das Fenster (Wohin → Akk.)'),
    bullet('über das Bett (Wohin → Akk.)'),
    bullet('neben dem Regal (Wo? → Dativ)'),
    bullet('in das / ins Regal (Wohin → Akk.)'),
    bullet('vor das Bett (Wohin → Akk.) / vor dem Bett (Wo? → Dativ)'),
    bullet('mit dem Schreibtisch / neben dem Fenster'),
    empty(),
    pItalic('Individuelle Zimmerbeschreibungen akzeptieren. Hauptsache Wo?/Dativ korrekt.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Wechselpräpositionen'),

    h2('Aufgabe 1: Wo ist der Hund? Schreibe Sätze mit Wechselpräpositionen.'),
    pItalic('Benutze: auf • unter • neben • vor • hinter • in'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Hund liegt auf einem Sofa]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Der Hund liegt __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Hund sitzt vor einer Tür]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Der Hund sitzt __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3: Hund versteckt sich unter einem Bett]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Der Hund liegt __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
        ]})
      ]
    }),
    empty(),

    h2('Aufgabe 2: Zimmer-Bild — Was ist wo? Schreibe 5 Sätze.'),
    pItalic('[BILD 4: Gezeichnetes Kinderzimmer mit Bett, Schreibtisch, Regal, Poster, Rucksack, Bücher, Lampe, Teppich an verschiedenen Stellen]'),
    pItalic('Beschreibe, was wo im Zimmer ist. Benutze Wo? + Dativ.'),
    empty(),
    p('1. ______________________________________________.'),
    p('2. ______________________________________________.'),
    p('3. ______________________________________________.'),
    p('4. ______________________________________________.'),
    p('5. ______________________________________________.'),
    empty(),

    h2('Aufgabe 3: Wohin? Zeichne Pfeile und schreibe Anweisungen.'),
    pItalic('[BILD 5: Leeres Zimmer mit Möbeln-Umrissen, Gegenstände liegen ungeordnet]'),
    pItalic('Schreibe 4 Anweisungen: Wohin soll was? Benutze Wohin? + Akkusativ.'),
    empty(),
    p('1. Leg das Buch ________________________________________.'),
    p('2. Stell den Stuhl ________________________________________.'),
    p('3. Häng die Jacke ________________________________________.'),
    p('4. Stell die Schuhe ________________________________________.'),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Hundepositionen'),
    bullet('Bild 1: Der Hund liegt auf dem Sofa.'),
    bullet('Bild 2: Der Hund sitzt vor der Tür.'),
    bullet('Bild 3: Der Hund liegt unter dem Bett.'),
    empty(),
    h2('Aufgabe 2: Zimmer-Bild'),
    pItalic('Abhängig von Bildinhalt. Mögliche Antworten:'),
    bullet('Das Bett steht neben dem Fenster.'),
    bullet('Der Rucksack hängt an der Tür.'),
    bullet('Die Bücher liegen auf dem Schreibtisch.'),
    bullet('Das Poster hängt über dem Bett.'),
    bullet('Der Teppich liegt vor dem Bett.'),
    pItalic('Alle Wo?-Formen mit korrektem Dativ-Artikel akzeptieren.'),
    empty(),
    h2('Aufgabe 3: Anweisungen (Wohin? = Akkusativ)'),
    bullet('Leg das Buch ins Regal / auf den Schreibtisch / in die Tasche.'),
    bullet('Stell den Stuhl neben den Tisch / vor das Fenster.'),
    bullet('Häng die Jacke an die Tür / an den Haken.'),
    bullet('Stell die Schuhe vor die Tür / neben den Schrank.'),
    pItalic('Akkusativ-Artikel nach Wechselpräposition prüfen: den (m.) / die (f.) / das (n.)'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
