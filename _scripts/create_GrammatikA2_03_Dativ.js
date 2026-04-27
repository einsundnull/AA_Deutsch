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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Dativ (Einführung)';
const TOPIC       = 'A2_Kinder_GrammatikA2_03_Dativ';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '03_Dativ'
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
const lCell = (txt, w, fill) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: fill || 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: txt, size: 22, font: 'Arial' })] })] });

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
  console.log('Erstelle Unterpunkt: Dativ (Einführung)');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Der Dativ'),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E7' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Merke: Der Dativ (Wem-Fall)', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Der Dativ antwortet auf die Frage: Wem? (Wem gibst du das Buch?)', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Artikel im Dativ:  ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: 'der → dem  |  die → der  |  das → dem  |  die (Pl.) → den + Substantiv-n', size: 22, font: 'Arial' })
          ], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Personalpronomen:  ', bold: true, size: 22, font: 'Arial' }),
            new TextRun({ text: 'mir — dir — ihm/ihr/ihm — uns — euch — ihnen', size: 22, font: 'Arial' })
          ], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Artikel im Dativ — ergänze die Tabelle.'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nominativ', CONTENT * 3/10), hCell('Genus', CONTENT * 2/10), hCell('Dativ', CONTENT * 3/10), hCell('Beispiel', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('der Vater', CONTENT * 3/10), dCell('m.', CONTENT * 2/10), dCell('dem Vater', CONTENT * 3/10), dCell('Ich helfe dem Vater.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('die Mutter', CONTENT * 3/10), dCell('f.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich gebe _____ Mutter das Buch.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('das Kind', CONTENT * 3/10), dCell('n.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich schenke _____ Kind ein Spielzeug.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('der Lehrer', CONTENT * 3/10), dCell('m.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich antworte _____ Lehrer.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('die Freundin', CONTENT * 3/10), dCell('f.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich erkläre _____ Freundin die Aufgabe.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('das Baby', CONTENT * 3/10), dCell('n.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich zeige _____ Baby das Bild.', CONTENT * 2/10)] }),
        new TableRow({ children: [dCell('die Kinder (Pl.)', CONTENT * 3/10), dCell('Pl.', CONTENT * 2/10), dCell('', CONTENT * 3/10), dCell('Ich lese _____ Kindern eine Geschichte.', CONTENT * 2/10)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Personalpronomen im Dativ — setze ein.'),
    pItalic('mir — dir — ihm — ihr — uns — euch — ihnen'),
    empty(),
    p('1. Kannst du ______ (ich) helfen? Ich verstehe das nicht.'),
    p('2. Ich schenke ______ (du) ein Buch zum Geburtstag.'),
    p('3. Der Hund gehört ______ (er). Er hat ihn gefunden.'),
    p('4. Das Kleid gefällt ______ (sie, Sg.) sehr gut.'),
    p('5. Mama hat ______ (wir) ein Eis gekauft.'),
    p('6. Ich erkläre ______ (ihr) die Grammatik noch einmal.'),
    p('7. Die Lehrerin hat ______ (sie, Pl.) die Aufgabe gezeigt.'),
    empty(),

    h2('Aufgabe 3: Schreibe Sätze mit Dativ-Verben.'),
    pItalic('Verben: geben • schenken • helfen • zeigen • erklären • gehören • gefallen'),
    empty(),
    p('1. (geben — dem Hund — das Futter)'),
    p('   Ich ______________________________________________.'),
    p('2. (schenken — meiner Schwester — ein Buch)'),
    p('   Ich ______________________________________________.'),
    p('3. (helfen — dem Kind — mit der Aufgabe)'),
    p('   Er ______________________________________________.'),
    p('4. (gefallen — mir — dieser Film)'),
    p('   ______________________________________________.'),
    p('5. (gehören — dir — dieser Stift?)'),
    p('   Gehört ____________________________________________?'),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Artikel im Dativ'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nominativ', CONTENT / 3), hCell('Dativ', CONTENT / 3), hCell('Beispiel (vollständig)', CONTENT / 3)] }),
        new TableRow({ children: [dCell('der Vater', CONTENT / 3), dCell('dem Vater', CONTENT / 3), dCell('Ich helfe dem Vater.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('die Mutter', CONTENT / 3), dCell('der Mutter', CONTENT / 3), dCell('Ich gebe der Mutter das Buch.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('das Kind', CONTENT / 3), dCell('dem Kind', CONTENT / 3), dCell('Ich schenke dem Kind ein Spielzeug.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('der Lehrer', CONTENT / 3), dCell('dem Lehrer', CONTENT / 3), dCell('Ich antworte dem Lehrer.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('die Freundin', CONTENT / 3), dCell('der Freundin', CONTENT / 3), dCell('Ich erkläre der Freundin die Aufgabe.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('das Baby', CONTENT / 3), dCell('dem Baby', CONTENT / 3), dCell('Ich zeige dem Baby das Bild.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('die Kinder (Pl.)', CONTENT / 3), dCell('den Kindern', CONTENT / 3), dCell('Ich lese den Kindern eine Geschichte.', CONTENT / 3)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Personalpronomen'),
    bullet('1. mir  2. dir  3. ihm  4. ihr  5. uns  6. euch  7. ihnen'),
    empty(),
    h2('Aufgabe 3: Sätze'),
    bullet('1. Ich gebe dem Hund das Futter.'),
    bullet('2. Ich schenke meiner Schwester ein Buch.'),
    bullet('3. Er hilft dem Kind mit der Aufgabe.'),
    bullet('4. Dieser Film gefällt mir. / Der Film gefällt mir.'),
    bullet('5. Gehört dir dieser Stift?'),
    pItalic('Satzstellung variabel — Dativ-Objekt meist vor Akkusativ-Objekt.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Der Dativ'),

    h2('Text: Ein Geschenk für Oma'),
    pItalic('Lies den Text genau. Achte auf die fett gedruckten Dativ-Formen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Ein Geschenk für Oma', bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Nächste Woche hat Oma Gertrude Geburtstag. Die Geschwister Leni und Paul überlegen zusammen, was sie ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihr', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' schenken sollen.', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: '„Ich möchte ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihr', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' ein Buch schenken", sagt Leni. „Oma liest so gern." Paul schüttelt den Kopf: „Ich habe ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihr', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' letztes Jahr schon ein Buch gegeben." — „Dann helfe ich ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'dir', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' eine andere Idee zu finden", sagt Paul.', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Sie fragen ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'dem', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' Vater um Rat. Er erklärt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihnen', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ': „Oma kocht gern. Kauft ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihr', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' doch Gewürze aus aller Welt!" Das gefällt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'den Kindern', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' sofort.', size: 26, font: 'Arial' }),
          ], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [
            new TextRun({ text: 'Am Geburtstag überreichen sie Oma das Paket. Oma lächelt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihnen', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' an und sagt: „Das gefällt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'mir', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' sehr! Danke!" Sie zeigt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'den Kindern', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ' dann ihre Küche und erklärt ', size: 26, font: 'Arial' }),
            new TextRun({ text: 'ihnen', bold: true, size: 26, font: 'Arial' }),
            new TextRun({ text: ', wie man indisches Curry kocht.', size: 26, font: 'Arial' }),
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
        new TableRow({ children: [dCell('Oma Gertrude hat nächste Woche Geburtstag.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Leni möchte Oma ein Buch schenken.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Paul hat Oma letztes Jahr ein Buch gegeben.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Vater schlägt Gewürze vor.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Geschenk gefällt Oma nicht.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Oma zeigt den Kindern, wie man Curry kocht.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Wem? — Beantworte die Fragen.'),
    p('1. Wem möchte Leni ein Buch schenken?'),
    writeLine(), writeLine(),
    p('2. Wem erklärt der Vater die Idee?'),
    writeLine(), writeLine(),
    p('3. Wem gefällt das Paket sehr gut?'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Suche im Text — alle fett gedruckten Dativ-Formen'),
    pItalic('Schreibe sie hier auf und erkläre, wer gemeint ist.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Dativ-Form', CONTENT / 2), hCell('Wer ist gemeint?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ihr (1. Mal)', CONTENT / 2), dCell('', CONTENT / 2)] }),
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
        new TableRow({ children: [dCell('Oma Gertrude hat nächste Woche Geburtstag.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Leni möchte Oma ein Buch schenken.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Paul hat Oma letztes Jahr ein Buch gegeben.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Vater schlägt Gewürze vor.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Geschenk gefällt Oma nicht.', CONTENT * 4/5), dCell('F (gefällt ihr sehr)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Oma zeigt den Kindern, wie man Curry kocht.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Wem?'),
    bullet('1. Oma (ihr)'),
    bullet('2. Den Kindern (ihnen) — Leni und Paul'),
    bullet('3. Oma / ihr'),
    empty(),
    h2('Aufgabe 3: Dativ-Formen im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Form', CONTENT / 2), hCell('Wer gemeint', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ihr (mehrfach)', CONTENT / 2), dCell('Oma Gertrude', CONTENT / 2)] }),
        new TableRow({ children: [dCell('dir', CONTENT / 2), dCell('Leni (du)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('dem Vater', CONTENT / 2), dCell('der Vater', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ihnen', CONTENT / 2), dCell('den Kindern / Leni und Paul', CONTENT / 2)] }),
        new TableRow({ children: [dCell('den Kindern', CONTENT / 2), dCell('Leni und Paul', CONTENT / 2)] }),
        new TableRow({ children: [dCell('mir', CONTENT / 2), dCell('Oma (ich)', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Der Dativ'),

    h2('Aufgabe 1: Dativ-Artikel — dem oder der?'),
    pItalic('Fülle die Lücken aus.'),
    empty(),
    p('1. Ich helfe ______ Mutter (f.) beim Kochen.'),
    p('2. Er gibt ______ Hund (m.) sein Futter.'),
    p('3. Wir zeigen ______ Kind (n.) die Bilder.'),
    p('4. Sie antwortet ______ Lehrer (m.) auf Deutsch.'),
    p('5. Ich schenke ______ Freundin (f.) Blumen.'),
    p('6. Der Ball gehört ______ Jungen (m.).'),
    p('7. Mama erklärt ______ Mädchen (n.) die Aufgabe.'),
    p('8. Der Lehrer liest ______ Klasse (f.) eine Geschichte vor.'),
    empty(),

    h2('Aufgabe 2: Personalpronomen — mir, dir, ihm, ihr, uns, euch, ihnen'),
    empty(),
    p('1. Das Buch gehört ______. (ich)'),
    p('2. Kannst du ______ (du) das Wörterbuch leihen?'),
    p('3. Der Hund folgt ______ (er) überall hin.'),
    p('4. Das Kleid gefällt ______ (sie, Sg.) nicht so gut.'),
    p('5. Mama hat ______ (wir) einen Brief geschrieben.'),
    p('6. Ich erkläre ______ (ihr) das Spiel noch einmal.'),
    p('7. Der Lehrer hat ______ (sie, Pl.) die Hausaufgaben gegeben.'),
    empty(),

    h2('Aufgabe 3: Dialog — Wem gehört das?'),
    pItalic('Ergänze den Dialog mit den richtigen Dativ-Formen.'),
    empty(),
    p('Finn:  He, gehört ______ (du) dieser Rucksack?'),
    p('Pia:   Nein, er gehört ______ (er) — schau, da ist Leos Name drauf.'),
    p('Finn:  Ach so! Ich gebe ______ (er) den Rucksack gleich zurück.'),
    p('Pia:   Gut. Kannst du ______ (er) auch sagen, dass er ______ (ich) sein Mathebuch'),
    p('       leihen soll?'),
    p('Finn:  Klar, ich erkläre ______ (er) das. Leo ist übrigens bei ______ Lehrerin (f.).'),
    p('Pia:   Danke! Du hilfst ______ (ich) immer so gut!'),
    empty(),

    h2('Aufgabe 4: Schreibe 3 eigene Sätze mit Dativ.'),
    pItalic('Benutze: geben / schenken / helfen / zeigen / gefallen / gehören'),
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
    h2('Aufgabe 1: dem / der'),
    bullet('1. der Mutter  2. dem Hund  3. dem Kind  4. dem Lehrer  5. der Freundin  6. dem Jungen  7. dem Mädchen  8. der Klasse'),
    empty(),
    h2('Aufgabe 2: Personalpronomen'),
    bullet('1. mir  2. dir  3. ihm  4. ihr  5. uns  6. euch  7. ihnen'),
    empty(),
    h2('Aufgabe 3: Dialog'),
    bullet('dir / ihm / ihm / ihm — mir / ihm / der Lehrerin / mir'),
    pItalic('Vollständiger Dialog zur Kontrolle:'),
    bullet('Gehört dir dieser Rucksack?'),
    bullet('er gehört ihm — schau, da ist Leos Name drauf.'),
    bullet('Ich gebe ihm den Rucksack gleich zurück.'),
    bullet('Kannst du ihm auch sagen, dass er mir sein Mathebuch leihen soll?'),
    bullet('ich erkläre ihm das. Leo ist übrigens bei der Lehrerin.'),
    bullet('Du hilfst mir immer so gut!'),
    empty(),
    h2('Aufgabe 4'),
    pItalic('Individuelle Antworten. Dativ-Artikel/-pronomen korrekt eingesetzt prüfen.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Der Dativ'),
    empty(),

    pBold('Artikelformen im Überblick'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Kasus', CONTENT / 5), hCell('mask. (m.)', CONTENT / 5), hCell('fem. (f.)', CONTENT / 5), hCell('neutr. (n.)', CONTENT / 5), hCell('Plural', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Nominativ (Wer?)', CONTENT / 5), dCell('der', CONTENT / 5), dCell('die', CONTENT / 5), dCell('das', CONTENT / 5), dCell('die', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Akkusativ (Wen?)', CONTENT / 5), dCell('den', CONTENT / 5), dCell('die', CONTENT / 5), dCell('das', CONTENT / 5), dCell('die', CONTENT / 5)] }),
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFE8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'Dativ (Wem?)', bold: true, size: 22, font: 'Arial' })] })] }),
          new TableCell({ width: { size: CONTENT / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFE8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'dem', bold: true, size: 22, font: 'Arial' })] })] }),
          new TableCell({ width: { size: CONTENT / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFE8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'der', bold: true, size: 22, font: 'Arial' })] })] }),
          new TableCell({ width: { size: CONTENT / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFE8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'dem', bold: true, size: 22, font: 'Arial' })] })] }),
          new TableCell({ width: { size: CONTENT / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFE8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'den + -n', bold: true, size: 22, font: 'Arial' })] })] }),
        ]}),
      ]
    }),
    empty(),

    pBold('Personalpronomen im Dativ'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nominativ', CONTENT / 3), hCell('Dativ', CONTENT / 3), hCell('Beispiel', CONTENT / 3)] }),
        new TableRow({ children: [dCell('ich', CONTENT / 3), dCell('mir', CONTENT / 3), dCell('Kannst du mir helfen?', CONTENT / 3)] }),
        new TableRow({ children: [dCell('du', CONTENT / 3), dCell('dir', CONTENT / 3), dCell('Ich schenke dir etwas.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('er', CONTENT / 3), dCell('ihm', CONTENT / 3), dCell('Ich gebe ihm das Buch.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('sie (Sg.)', CONTENT / 3), dCell('ihr', CONTENT / 3), dCell('Das gefällt ihr sehr.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('es', CONTENT / 3), dCell('ihm', CONTENT / 3), dCell('Ich zeige ihm das Bild.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('wir', CONTENT / 3), dCell('uns', CONTENT / 3), dCell('Erkläre uns das bitte!', CONTENT / 3)] }),
        new TableRow({ children: [dCell('ihr', CONTENT / 3), dCell('euch', CONTENT / 3), dCell('Ich helfe euch gern.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('sie / Sie', CONTENT / 3), dCell('ihnen / Ihnen', CONTENT / 3), dCell('Das gehört ihnen.', CONTENT / 3)] }),
      ]
    }),
    empty(),

    pBold('Häufige Verben mit Dativ-Objekt'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Verb', CONTENT / 3), hCell('Frage', CONTENT / 3), hCell('Beispiel', CONTENT / 3)] }),
        new TableRow({ children: [dCell('geben', CONTENT / 3), dCell('Wem gibst du ...?', CONTENT / 3), dCell('Ich gebe dem Hund Wasser.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('schenken', CONTENT / 3), dCell('Wem schenkst du ...?', CONTENT / 3), dCell('Er schenkt der Oma Blumen.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('helfen', CONTENT / 3), dCell('Wem hilfst du?', CONTENT / 3), dCell('Sie hilft dem Kind.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('zeigen', CONTENT / 3), dCell('Wem zeigst du ...?', CONTENT / 3), dCell('Ich zeige dir das Bild.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('erklären', CONTENT / 3), dCell('Wem erklärst du ...?', CONTENT / 3), dCell('Er erklärt uns die Regel.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('antworten', CONTENT / 3), dCell('Wem antwortest du?', CONTENT / 3), dCell('Sie antwortet dem Lehrer.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('gefallen', CONTENT / 3), dCell('Wem gefällt ...?', CONTENT / 3), dCell('Das gefällt mir gut.', CONTENT / 3)] }),
        new TableRow({ children: [dCell('gehören', CONTENT / 3), dCell('Wem gehört ...?', CONTENT / 3), dCell('Das Buch gehört ihr.', CONTENT / 3)] }),
      ]
    }),
    empty(),
    pItalic('Tipp: Frage immer „Wem?" — wenn die Antwort dem/der/den oder mir/dir/ihm... ist, steht Dativ!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Die Wortliste ist eine Referenztabelle ohne Lücken. Prüfe mündlich oder mit Karteikarten.'),
    empty(),
    h2('Kasus-Merkhilfe'),
    bullet('Nominativ: Das ist der/die/das ... (Wer oder was ist das?)'),
    bullet('Akkusativ: Ich sehe den/die/das ... (Wen oder was sehe ich?)'),
    bullet('Dativ: Ich helfe dem/der/dem ... (Wem helfe ich?)'),
    empty(),
    pBold('Eselsbrücke Dativ: „dem dem dem den" — männlich, weiblich wird zu DER, sächlich bleibt DEM, Plural: DEN + Nomen-n'),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Der Dativ'),

    h2('Dialog 1: Wem gehört das?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Gehört dir dieser ______?', CONTENT / 2), dCell('Nein, der gehört ______ (er/sie). / Ja, der gehört mir!', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Kannst du ihm/ihr ______ geben?', CONTENT / 2), dCell('Ja, klar! Ich gebe ihm/ihr ______ gleich.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Gefällt dir das eigentlich?', CONTENT / 2), dCell('Ja, es gefällt mir sehr! / Nein, es gefällt mir nicht so.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hilfst du mir bei der Aufgabe?', CONTENT / 2), dCell('Ja, ich helfe dir gern! / Tut mir leid, ich habe keine Zeit.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Geburtstag — Was schenkst du wem?'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Was schenkst du ______ Mutter zum Muttertag?'),
    p('B: Ich schenke ______ Blumen und einen Brief.'),
    p('A: Das ist eine tolle Idee! Hilfst du ______ (ich) auch eine Idee zu finden?'),
    p('B: Klar! Was gefällt ______ Mutter denn am besten?'),
    p('A: Sie kocht gern. Ich könnte ______ ein Kochbuch schenken.'),
    p('B: Super! Und du könntest ______ (sie) auch einen Gutschein geben — für ein Restaurantessen.'),
    p('A: Perfekt! Danke, du hast ______ (ich) wirklich geholfen!'),
    empty(),

    h2('Partnerinterview: Geben und Helfen'),
    pItalic('Frage deinen Partner / deine Partnerin. Benutze Dativ-Verben in den Antworten!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort (mit Dativ)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was schenkst du deiner Mutter/deinem Vater gern?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wem hilfst du oft in deiner Familie?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was gefällt dir in der Schule am besten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wem erklärst du manchmal Sachen?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was gehört dir in deinem Zimmer am liebsten?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Dativ-Artikel korrekt: dem (m./n.) / der (f.) / den + -n (Pl.)'),
    bullet('Personalpronomen korrekt: mir / dir / ihm / ihr / uns / euch / ihnen'),
    bullet('Dativ-Verben erkannt: geben, schenken, helfen, zeigen, erklären, gefallen, gehören'),
    bullet('Frage „Wem?" als Kontrollmittel eingesetzt'),
    empty(),
    h2('Dialog 2 — Lösungen'),
    bullet('deiner Mutter / ihr / mir / deiner Mutter / ihr / ihr / mir'),
    empty(),
    pItalic('Individuelle Antworten im Partnerinterview akzeptieren. Dativ-Formen korrekt prüfen.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Der Dativ'),

    h2('Aufgabe 1: Was passiert auf den Bildern? Schreibe Sätze mit Dativ.'),
    pItalic('Benutze: geben / schenken / helfen / zeigen / erklären'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Junge gibt einem Hund ein Leckerli]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            writeLine(),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Mädchen erklärt einem anderen Kind eine Aufgabe am Tisch]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            writeLine(),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3: Kind schenkt einer älteren Frau Blumen zum Geburtstag]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            writeLine(),
          ]}),
        ]})
      ]
    }),
    empty(),

    h2('Aufgabe 2: Wem-Tabelle ausfüllen'),
    pItalic('Schreibe die richtigen Dativ-Formen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Satz', CONTENT / 2), hCell('Dativ-Ergänzung (wem?)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich gebe ___ Lehrerin das Heft. (die Lehrerin)', CONTENT / 2), dCell('der Lehrerin', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Er hilft ___ Vater beim Kochen. (der Vater)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wir zeigen ___ Kind das Buch. (das Kind)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Sie schreibt ___ Oma einen Brief. (die Oma)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Kannst du ___ Schüler helfen? (die Schüler, Pl.)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Das Spiel gefällt ___ gut. (ich)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich erkläre ___ das. (du)', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Der Ball gehört ___. (er)', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 3: Zeichne und schreibe!'),
    pItalic('[BILD 4: Leerer Rahmen — Zeichne eine Szene, in der jemand jemandem etwas gibt, zeigt oder erklärt.]'),
    pItalic('Beschreibe dein Bild mit 2–3 Sätzen. Benutze mindestens einen Dativ.'),
    ...writeLines(4),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Bilder'),
    bullet('Bild 1: Der Junge gibt dem Hund ein Leckerli.'),
    bullet('Bild 2: Das Mädchen erklärt dem Kind die Aufgabe.'),
    bullet('Bild 3: Das Kind schenkt der älteren Frau / der Oma Blumen.'),
    pItalic('Andere passende Sätze mit korrektem Dativ akzeptieren.'),
    empty(),
    h2('Aufgabe 2: Wem-Tabelle'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Original', CONTENT / 2), hCell('Dativ-Form', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Lehrerin', CONTENT / 2), dCell('der Lehrerin', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Vater', CONTENT / 2), dCell('dem Vater', CONTENT / 2)] }),
        new TableRow({ children: [dCell('das Kind', CONTENT / 2), dCell('dem Kind', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Oma', CONTENT / 2), dCell('der Oma', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Schüler (Pl.)', CONTENT / 2), dCell('den Schülern', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ich', CONTENT / 2), dCell('mir', CONTENT / 2)] }),
        new TableRow({ children: [dCell('du', CONTENT / 2), dCell('dir', CONTENT / 2)] }),
        new TableRow({ children: [dCell('er', CONTENT / 2), dCell('ihm', CONTENT / 2)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle kreative Antworten. Dativ-Form korrekt prüfen.'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
