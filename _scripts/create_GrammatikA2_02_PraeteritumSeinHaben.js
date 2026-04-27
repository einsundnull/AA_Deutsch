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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Präteritum: sein & haben';
const TOPIC       = 'A2_Kinder_GrammatikA2_02_PraeteritumSeinHaben';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '02_PraeteritumSeinHaben'
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

// Konjugationstabelle-Hilfe
const konjRow = (pronomen, sein, haben) => new TableRow({ children: [dCell(pronomen, CONTENT / 4), dCell(sein, CONTENT / 4), dCell('', CONTENT / 4), dCell(haben, CONTENT / 4)] });
const konjRowFull = (pronomen, sein, haben) => new TableRow({ children: [dCell(pronomen, CONTENT / 4), dCell(sein, CONTENT / 4), dCell(pronomen, CONTENT / 4), dCell(haben, CONTENT / 4)] });

(async () => {
  console.log('Erstelle Unterpunkt: Präteritum von sein und haben');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Präteritum: war / hatte'),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E7' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Merke: Präteritum von sein und haben', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'sein → war  |  haben → hatte  (kein ge-Präfix, kein Hilfsverb!)', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Diese Formen werden statt „ist gewesen" und „hat gehabt" benutzt.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Konjugationstabelle — ergänze die fehlenden Formen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('sein — Präteritum', CONTENT / 2), hCell('haben — Präteritum', CONTENT / 2)] }),
        new TableRow({ children: [new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [
          new Table({ width: { size: CONTENT / 2 - 200, type: WidthType.DXA }, rows: [
            new TableRow({ children: [hCell('Person', (CONTENT / 2 - 200) / 2), hCell('war / warst ...', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('ich', (CONTENT / 2 - 200) / 2), dCell('war', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('du', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('er / sie / es', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('wir', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('ihr', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('sie / Sie', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
          ]})
        ]}),
        new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [
          new Table({ width: { size: CONTENT / 2 - 200, type: WidthType.DXA }, rows: [
            new TableRow({ children: [hCell('Person', (CONTENT / 2 - 200) / 2), hCell('hatte / hattest ...', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('ich', (CONTENT / 2 - 200) / 2), dCell('hatte', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('du', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('er / sie / es', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('wir', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('ihr', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
            new TableRow({ children: [dCell('sie / Sie', (CONTENT / 2 - 200) / 2), dCell('', (CONTENT / 2 - 200) / 2)] }),
          ]})
        ]})]
        })
      ]
    }),
    empty(),

    h2('Aufgabe 2: war oder hatte? Setze die richtige Form ein.'),
    empty(),
    p('1. Gestern ______ ich sehr müde. (sein)'),
    p('2. Wir ______ keine Zeit für das Mittagessen. (haben)'),
    p('3. Das Wetter ______ gestern wunderschön. (sein)'),
    p('4. ______ du gestern in der Schule? (sein)'),
    p('5. Die Kinder ______ großen Hunger nach dem Sport. (haben)'),
    p('6. Mein Hund ______ heute Morgen Angst vor dem Gewitter. (haben)'),
    p('7. Wir ______ letztes Jahr in den Ferien in Österreich. (sein)'),
    p('8. ______ ihr viel Spaß beim Ausflug? (haben)'),
    p('9. Das Konzert ______ toll! (sein)'),
    p('10. Ich ______ als Kind keine Geschwister. (haben)'),
    empty(),

    h2('Aufgabe 3: Schreibe über einen schönen Moment.'),
    pItalic('Beschreibe einen besonderen Tag oder Moment mit war/hatte. 4–5 Sätze.'),
    pItalic('Beispiel: Letztes Jahr war ich auf einem Geburtstag. Das Wetter war super. Wir hatten viel Spaß ...'),
    ...writeLines(6),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Konjugation'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person', CONTENT / 4), hCell('sein (Präteritum)', CONTENT / 4), hCell('Person', CONTENT / 4), hCell('haben (Präteritum)', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ich', CONTENT / 4), dCell('war', CONTENT / 4), dCell('ich', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('du', CONTENT / 4), dCell('warst', CONTENT / 4), dCell('du', CONTENT / 4), dCell('hattest', CONTENT / 4)] }),
        new TableRow({ children: [dCell('er / sie / es', CONTENT / 4), dCell('war', CONTENT / 4), dCell('er / sie / es', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('wir', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('wir', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ihr', CONTENT / 4), dCell('wart', CONTENT / 4), dCell('ihr', CONTENT / 4), dCell('hattet', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sie / Sie', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('sie / Sie', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: war / hatte'),
    bullet('1. war'),
    bullet('2. hatten'),
    bullet('3. war'),
    bullet('4. Warst'),
    bullet('5. hatten'),
    bullet('6. hatte'),
    bullet('7. waren'),
    bullet('8. Hattet'),
    bullet('9. war'),
    bullet('10. hatte'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten. war/hatte korrekt konjugiert prüfen.'),
    pBold('Beispiel: Letztes Jahr war ich auf dem Schulfest. Das Wetter war warm und sonnig. Wir hatten einen tollen DJ. Ich war sehr glücklich und hatte keine Sorgen.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Präteritum: war / hatte'),

    h2('Text: Der magische Schneetag'),
    pItalic('Lies den Text genau. Achte auf die fett gedruckten Wörter.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Der magische Schneetag', bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Es ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' ein Dienstagmorgen im Januar. Das Wetter ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' eisig kalt und draußen ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' alles weiß — es hatte in der Nacht geschneit!', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Finn (10 Jahre) ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' sofort wach und aufgeregt. Schule? Er ', size: 26, font: 'Arial' }), new TextRun({ text: 'hatte', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' keine Lust — er wollte lieber draußen spielen. Seine Schwester Mia ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' anderer Meinung: „Ich ', size: 26, font: 'Arial' }), new TextRun({ text: 'hatte', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' noch nie so viel Schnee gesehen! Wir müssen einen Schneemann bauen!"', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Zum Glück ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' die Schule geschlossen — Schneetag! Die Kinder ', size: 26, font: 'Arial' }), new TextRun({ text: 'waren', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' überglücklich. Sie ', size: 26, font: 'Arial' }), new TextRun({ text: 'hatten', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' warme Jacken und Stiefel an und rannten nach draußen.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Der Schneemann ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' am Ende riesig. Er ', size: 26, font: 'Arial' }), new TextRun({ text: 'hatte', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' Knöpfe als Augen und eine Karotte als Nase. Die Kinder ', size: 26, font: 'Arial' }), new TextRun({ text: 'hatten', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' rote Wangen und kalte Finger — aber sie ', size: 26, font: 'Arial' }), new TextRun({ text: 'waren', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' so glücklich. Das ', size: 26, font: 'Arial' }), new TextRun({ text: 'war', bold: true, size: 26, font: 'Arial' }), new TextRun({ text: ' der beste Tag des Jahres.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Es war ein Mittwochmorgen im Januar.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Finn hatte Lust auf Schule.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mia hatte noch nie so viel Schnee gesehen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Schule war wegen Schnee geschlossen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Schneemann hatte Knöpfe als Augen und eine Karotte als Nase.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Kinder waren traurig am Ende des Tages.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Beantworte die Fragen.'),
    p('1. Wie war das Wetter am Dienstagmorgen?'),
    writeLine(), writeLine(),
    p('2. Warum hatten die Kinder keine Schule?'),
    writeLine(), writeLine(),
    p('3. Was hatte der Schneemann für ein Gesicht?'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Zähle alle war/waren/hatte/hatten im Text.'),
    p('war / war / war ... → insgesamt ______ Mal „war/waren"'),
    p('hatte / hatte ... → insgesamt ______ Mal „hatte/hatten"'),
    empty(),
    p('Schreibe deinen Lieblingssatz mit war oder hatte aus dem Text:'),
    writeLine(), writeLine(),
  ], `${TOPIC}_Lesen.docx`);

  // ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Leseübung'),
    h2('Aufgabe 1: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Es war ein Mittwochmorgen im Januar.', CONTENT * 4/5), dCell('F (Dienstag)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Finn hatte Lust auf Schule.', CONTENT * 4/5), dCell('F (hatte keine Lust)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Mia hatte noch nie so viel Schnee gesehen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Schule war wegen Schnee geschlossen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Schneemann hatte Knöpfe als Augen und eine Karotte als Nase.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Die Kinder waren traurig am Ende des Tages.', CONTENT * 4/5), dCell('F (glücklich)', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Fragen'),
    bullet('1. Eisig kalt, alles war weiß — es hatte in der Nacht geschneit.'),
    bullet('2. Weil es ein Schneetag war / die Schule wegen Schnee geschlossen war.'),
    bullet('3. Er hatte Knöpfe als Augen und eine Karotte als Nase.'),
    empty(),
    h2('Aufgabe 3: Zählen'),
    pBold('war/waren: 9 Mal  |  hatte/hatten: 6 Mal'),
    pItalic('Genaue Zählung kann je nach Lesart leicht variieren. Zusammen besprechen.'),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Präteritum: war / hatte'),

    h2('Aufgabe 1: war, warst, waren, wart — setze die richtige Form ein.'),
    empty(),
    p('1. Ich ______ gestern nicht in der Schule — ich war krank.'),
    p('2. Wo ______ du letzte Woche? Ich habe dich nicht gesehen.'),
    p('3. Das Konzert ______ absolut fantastisch!'),
    p('4. Wir ______ den ganzen Sommer am Meer.'),
    p('5. ______ ihr zufrieden mit dem Ausflug?'),
    p('6. Die Prüfung ______ sehr schwer für alle Schüler.'),
    p('7. Meine Großeltern ______ früher Lehrer.'),
    p('8. ______ du schon mal in Deutschland?'),
    empty(),

    h2('Aufgabe 2: hatte, hattest, hatten, hattet — setze die richtige Form ein.'),
    empty(),
    p('1. Ich ______ gestern starke Kopfschmerzen.'),
    p('2. ______ du genug Zeit für die Aufgabe?'),
    p('3. Sie ______ als Kind einen Hund namens Rex.'),
    p('4. Wir ______ keine Idee, was wir kochen sollten.'),
    p('5. ______ ihr Hunger nach dem Schwimmen?'),
    p('6. Die Mannschaft ______ großes Pech — sie haben 0:1 verloren.'),
    p('7. Er ______ immer gute Laune in der Schule.'),
    p('8. Die Kinder ______ viel Spaß auf der Party.'),
    empty(),

    h2('Aufgabe 3: war oder hatte? Dialog ergänzen.'),
    pItalic('Ergänze den Dialog mit der richtigen Form von sein oder haben (Präteritum).'),
    empty(),
    p('Nina:  Wie ______ dein Wochenende?'),
    p('Ben:   Super! Wir ______ am Samstag beim Fußballturnier.'),
    p('Nina:  Und? ______ ihr Erfolg?'),
    p('Ben:   Ja! Unser Trainer ______ eine tolle Taktik. Das Spiel ______ sehr spannend.'),
    p('       Am Ende ______ wir gewonnen!'),
    p('Nina:  Toll! ______ du müde danach?'),
    p('Ben:   Ja, ich ______ total erschöpft! Aber ich ______ glücklich.'),
    p('Nina:  ______ ihr auch Publikum dabei?'),
    p('Ben:   Ja! Viele Eltern ______ da. Die Stimmung ______ großartig.'),
    empty(),

    h2('Aufgabe 4: Schreibe 3 eigene Sätze mit war/hatte.'),
    p('1. (war) ____________________________________________.'),
    writeLine(),
    p('2. (hatte) ____________________________________________.'),
    writeLine(),
    p('3. (waren/hatten) ____________________________________________.'),
    writeLine(),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1: war/warst/waren/wart'),
    bullet('1. war  2. warst  3. war  4. waren  5. Wart  6. war  7. waren  8. Warst'),
    empty(),
    h2('Aufgabe 2: hatte/hattest/hatten/hattet'),
    bullet('1. hatte  2. Hattest  3. hatte  4. hatten  5. Hattet  6. hatte  7. hatte  8. hatten'),
    empty(),
    h2('Aufgabe 3: Dialog'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Lücke', CONTENT / 3), hCell('Form', CONTENT / 3), hCell('Verb', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Wie ______ dein Wochenende?', CONTENT / 3), dCell('war', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Wir ______ beim Fußballturnier.', CONTENT / 3), dCell('waren', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('______ ihr Erfolg?', CONTENT / 3), dCell('Hattet', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Trainer ______ eine Taktik.', CONTENT / 3), dCell('hatte', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Spiel ______ sehr spannend.', CONTENT / 3), dCell('war', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('______ du müde?', CONTENT / 3), dCell('Warst', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('ich ______ total erschöpft.', CONTENT / 3), dCell('war', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('ich ______ glücklich.', CONTENT / 3), dCell('war', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Eltern ______ da.', CONTENT / 3), dCell('waren', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('Stimmung ______ großartig.', CONTENT / 3), dCell('war', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 4'),
    pItalic('Individuelle Antworten. Korrekte Personenform prüfen.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Präteritum: war / hatte'),
    pItalic('Diese Formen sind sehr häufig in Geschichten, Berichten und Beschreibungen.'),
    empty(),

    pBold('Vollständige Konjugation'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person', CONTENT / 4), hCell('sein → war', CONTENT / 4), hCell('Person', CONTENT / 4), hCell('haben → hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ich', CONTENT / 4), dCell('war', CONTENT / 4), dCell('ich', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('du', CONTENT / 4), dCell('warst', CONTENT / 4), dCell('du', CONTENT / 4), dCell('hattest', CONTENT / 4)] }),
        new TableRow({ children: [dCell('er / sie / es', CONTENT / 4), dCell('war', CONTENT / 4), dCell('er / sie / es', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('wir', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('wir', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ihr', CONTENT / 4), dCell('wart', CONTENT / 4), dCell('ihr', CONTENT / 4), dCell('hattet', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sie / Sie', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('sie / Sie', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
      ]
    }),
    empty(),

    pBold('Häufige Ausdrücke mit war / hatte'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Ausdruck', CONTENT * 2/5), hCell('Beispielsatz', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Es war schön / toll / super.', CONTENT * 2/5), dCell('Der Urlaub war wunderschön.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Ich war müde / krank / glücklich.', CONTENT * 2/5), dCell('Nach dem Sport war ich sehr müde.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Wir waren dort / hier / zu Hause.', CONTENT * 2/5), dCell('Wir waren letztes Jahr in Spanien.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Ich hatte Hunger / Durst / Zeit.', CONTENT * 2/5), dCell('Ich hatte großen Hunger nach dem Sport.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Ich hatte Angst / Spaß / Glück.', CONTENT * 2/5), dCell('Wir hatten viel Spaß beim Spielen.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Er/Sie hatte keine Lust / Idee.', CONTENT * 2/5), dCell('Sie hatte keine Idee, was sie kochen sollte.', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Wie war ...? — Es war ...', CONTENT * 2/5), dCell('Wie war der Film? — Er war super!', CONTENT * 3/5)] }),
        new TableRow({ children: [dCell('Warst du ...? — Ja, ich war ...', CONTENT * 2/5), dCell('Warst du dabei? — Ja, ich war dabei.', CONTENT * 3/5)] }),
      ]
    }),
    empty(),

    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF0F0' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Wichtig: Wann benutze ich Perfekt — wann Präteritum?', bold: true, size: 24, color: '1F4E79', font: 'Arial' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'sein + haben → IMMER Präteritum (war/hatte), nie Perfekt in der Alltagssprache.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Alle anderen Verben → Perfekt (habe gemacht, bin gefahren etc.)', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),
    pItalic('Tipp: Übe die Tabelle laut — spreche die Formen rhythmisch: war — warst — war — waren — wart — waren!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Die Wortliste enthält keine Übersetzungslücken. Prüfe das Wissen mündlich oder mit Lernkarten.'),
    empty(),
    h2('Konjugation — Musterlösung'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person', CONTENT / 4), hCell('sein → war', CONTENT / 4), hCell('Person', CONTENT / 4), hCell('haben → hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ich', CONTENT / 4), dCell('war', CONTENT / 4), dCell('ich', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('du', CONTENT / 4), dCell('warst', CONTENT / 4), dCell('du', CONTENT / 4), dCell('hattest', CONTENT / 4)] }),
        new TableRow({ children: [dCell('er / sie / es', CONTENT / 4), dCell('war', CONTENT / 4), dCell('er / sie / es', CONTENT / 4), dCell('hatte', CONTENT / 4)] }),
        new TableRow({ children: [dCell('wir', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('wir', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
        new TableRow({ children: [dCell('ihr', CONTENT / 4), dCell('wart', CONTENT / 4), dCell('ihr', CONTENT / 4), dCell('hattet', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sie / Sie', CONTENT / 4), dCell('waren', CONTENT / 4), dCell('sie / Sie', CONTENT / 4), dCell('hatten', CONTENT / 4)] }),
      ]
    }),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Präteritum: war / hatte'),

    h2('Dialog 1: Wie war dein Wochenende?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie war dein Wochenende?', CONTENT / 2), dCell('Es war ______. Ich war ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Warst du irgendwo?', CONTENT / 2), dCell('Ja, ich war ______. / Nein, ich war zu Hause.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hattest du viel Spaß?', CONTENT / 2), dCell('Ja, ich hatte ______! / Nein, ich hatte leider ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie war das Wetter?', CONTENT / 2), dCell('Das Wetter war ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Warst du müde danach?', CONTENT / 2), dCell('Ja, ich war ______. / Nein, ich hatte noch Energie.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Als ich klein war ...'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Hattest du als Kind ein Haustier?'),
    p('B: Ja! Ich ______ einen Hund. Er ______ sehr groß und ______ schwarze Augen.'),
    p('A: Wie ______ er?'),
    p('B: Er ______ „Bello". Er ______ immer lustig und ______ viel Energie.'),
    p('A: ______ du traurig, als er nicht mehr da war?'),
    p('B: Ja, ich ______ sehr traurig. Das ______ eine schwere Zeit.'),
    p('   Aber jetzt ______ wir eine Katze. Die Situation ______ jetzt viel besser.'),
    empty(),

    h2('Partnerinterview: Früher und gestern'),
    pItalic('Frage deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie war dein Morgen heute?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann warst du zuletzt krank?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hattest du als Kind Angst vor etwas?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wo warst du in den letzten Ferien?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was war dein schönster Tag letztes Jahr?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Stelle deinen Partner / deine Partnerin vor: „_______ war ... und hatte ..."'),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('war / hatte korrekt konjugiert (Person beachten: du warst, er war, wir waren ...)'),
    bullet('war für Zustände/Eigenschaften: Das Wetter war warm.'),
    bullet('hatte für Besitz/Gefühle: Ich hatte Hunger.'),
    bullet('Fragen im Präteritum: Warst du ...? / Hattest du ...?'),
    empty(),
    h2('Dialog 2 — Mögliche Formen'),
    bullet('hatte / war / hatte'),
    bullet('hieß (unregelmäßig!) / war / hatte'),
    bullet('Warst'),
    bullet('war / war'),
    bullet('haben (Präsens — jetzt) / ist (Präsens)'),
    pItalic('Hinweis: „hieß" ist Präteritum von „heißen" (unregelmäßig) — erst bei Bedarf erklären.'),
    empty(),
    pItalic('Individuelle Antworten im Partnerinterview akzeptieren. Korrekte war/hatte-Formen prüfen.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Präteritum: war / hatte'),

    h2('Aufgabe 1: Beschreibe die Bilder mit war/hatte.'),
    pItalic('Schreibe zu jedem Bild 2 Sätze mit war oder hatte.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Mädchen liegt krank im Bett, hält sich den Kopf, Taschentücher auf dem Nachttisch]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie _______________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie _______________________________.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 160 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Fußballmannschaft jubelt, Spieler hält Pokal, alle lächeln]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie _______________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie _______________________________.', size: 22, font: 'Arial' })], spacing: { before: 40, after: 160 } }),
          ]}),
        ]})
      ]
    }),
    empty(),

    h2('Aufgabe 2: Bildgeschichte — Was ist passiert?'),
    pItalic('Schau die 4 Bilder an und schreibe eine kleine Geschichte im Präteritum (war/hatte) und Perfekt.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 4, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3a: Junge schaut traurig aus dem Fenster, draußen regnet es]', italics: true, size: 19, color: '888888', font: 'Arial' })], spacing: { before: 120, after: 120 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 4, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3b: Gleicher Junge spielt drinnen Brett-spiel mit Schwester]', italics: true, size: 19, color: '888888', font: 'Arial' })], spacing: { before: 120, after: 120 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 4, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3c: Die Sonne scheint wieder — Kinder rennen nach draußen]', italics: true, size: 19, color: '888888', font: 'Arial' })], spacing: { before: 120, after: 120 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 4, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3d: Kinder lachen und spielen auf dem Spielplatz]', italics: true, size: 19, color: '888888', font: 'Arial' })], spacing: { before: 120, after: 120 } }),
          ]}),
        ]})
      ]
    }),
    empty(),
    pItalic('Schreibe die Geschichte: Das Wetter war ... / Er hatte ... / Dann haben sie ... / Später ...'),
    ...writeLines(7),
    empty(),

    h2('Aufgabe 3: Wann benutzt man war/hatte?'),
    pItalic('Unterstreiche die richtige Option.'),
    empty(),
    p('1. Für Zustände in der Vergangenheit benutze ich:  war/hatte  |  habe gemacht / bin gegangen'),
    p('2. Für Aktionen und Ereignisse benutze ich:  war/hatte  |  habe gemacht / bin gegangen'),
    p('3. „Das Konzert ___ super."  →  war  |  hat gewesen'),
    p('4. „Ich ___ großen Hunger."  →  hatte  |  habe gehabt'),
    p('5. „Wir ___ nach Berlin."  →  waren gefahren  |  sind gefahren'),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Bilder beschreiben'),
    bullet('Bild 1: Sie war krank. / Sie hatte Kopfschmerzen (Fieber / Halsschmerzen).'),
    bullet('Bild 2: Sie waren glücklich / froh. / Sie hatten den Pokal / einen Sieg.'),
    pItalic('Andere passende Beschreibungen akzeptieren.'),
    empty(),
    h2('Aufgabe 2: Bildgeschichte'),
    pBold('Mustergeschichte:'),
    bullet('Das Wetter war schlecht. Es hatte geregnet und der Junge war traurig.'),
    bullet('Er hatte keine Lust, drinnen zu bleiben. Aber dann hat er mit seiner Schwester Brettspiele gespielt.'),
    bullet('Plötzlich war die Sonne wieder da! Die Kinder sind sofort nach draußen gelaufen.'),
    bullet('Auf dem Spielplatz hatten sie viel Spaß und waren sehr glücklich.'),
    pItalic('Individuelle Variationen akzeptieren. war/hatte + Perfekt gemischt — das ist das Ziel!'),
    empty(),
    h2('Aufgabe 3: war/hatte vs. Perfekt'),
    bullet('1. war/hatte (Zustände)'),
    bullet('2. habe gemacht / bin gegangen (Aktionen)'),
    bullet('3. war (nicht: hat gewesen)'),
    bullet('4. hatte (nicht: habe gehabt)'),
    bullet('5. sind gefahren (Perfekt — Bewegungsverb)'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
