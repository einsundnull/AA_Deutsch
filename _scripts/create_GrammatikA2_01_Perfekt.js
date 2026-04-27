'use strict';
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, PageNumber,
  LevelFormat, Header, Footer, PageBreak
} = require('docx');
const fs = require('fs');

// ── Konstanten ────────────────────────────────────────────────────────────────
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;
const CONTENT = PAGE_W - 2 * MARGIN;

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Perfekt';
const TOPIC       = 'A2_Kinder_GrammatikA2_01_Perfekt';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '01_Perfekt'
);

// ── Nummerierungs-Config ──────────────────────────────────────────────────────
const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '•',
      alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 720, hanging: 360 } },
        run: { font: 'Symbol' }
      }
    }]
  }]
};

// ── Hilfs-Funktionen ──────────────────────────────────────────────────────────
const h1 = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 36, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 240, after: 120 }
});
const h2 = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 28, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 200, after: 80 }
});
const p = txt => new Paragraph({
  children: [new TextRun({ text: txt, size: 24, font: 'Arial' })],
  spacing: { before: 80, after: 80 }
});
const pBold = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 24, font: 'Arial' })],
  spacing: { before: 80, after: 80 }
});
const pItalic = (txt, color) => new Paragraph({
  children: [new TextRun({ text: txt, italics: true, size: 22, color: color || '888888', font: 'Arial' })],
  spacing: { before: 60, after: 60 }
});
const empty = () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } });
const bullet = txt => new Paragraph({
  children: [new TextRun({ text: txt, size: 24, font: 'Arial' })],
  numbering: { reference: 'bullet-list', level: 0 },
  spacing: { before: 60, after: 60 }
});
const writeLine = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});
const writeLines = n => Array.from({ length: n }, writeLine);

const hCell = (txt, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' },
  children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })]
});
const dCell = (txt, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' },
  children: [new Paragraph({ children: [new TextRun({ text: txt, size: 22, font: 'Arial' })] })]
});

const studentHead = () => new Table({
  width: { size: CONTENT, type: WidthType.DXA },
  rows: [new TableRow({ children: [
    hCell('Name:', CONTENT / 2),
    hCell('Datum:', CONTENT / 2)
  ]})]
});

const makeHeader = () => new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: TOPIC_LABEL, italics: true, color: '888888', size: 18, font: 'Arial' })]
  })]
});

const makeFooter = () => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })
    ]
  })]
});

const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
        }
      },
      headers: { default: makeHeader() },
      footers: { default: makeFooter() },
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  const fp = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(fp, buf);
  console.log('OK ', filename);
};

// ── Hauptprogramm ─────────────────────────────────────────────────────────────
(async () => {
  console.log('Erstelle Unterpunkt: Perfekt');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Das Perfekt'),

    // Regelkasten
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E7' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Merke: Das Perfekt', bold: true, size: 24, font: 'Arial', color: '1F4E79' })], spacing: { before: 80, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Perfekt = haben/sein (Präsens) + Partizip II (am Satzende)', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Regelmäßig: ge- + Verbstamm + -t     →  machen → ge|mach|t', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'Unregelmäßig: ge- + (veränderter) Stamm + -en  →  fahren → ge|fahr|en', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: 'sein: Verben der Bewegung/Ortsveränderung (fahren, gehen, kommen, laufen, fliegen ...)', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Bilde das Partizip II.'),
    pItalic('Regelm. = regelmäßig  |  Unregelm. = unregelmäßig'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 4), hCell('Typ', CONTENT / 5), hCell('Partizip II', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('machen', CONTENT / 4), dCell('regelm.', CONTENT / 5), dCell('ge____t  →  gemacht', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('spielen', CONTENT / 4), dCell('regelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('lernen', CONTENT / 4), dCell('regelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('kaufen', CONTENT / 4), dCell('regelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('kochen', CONTENT / 4), dCell('regelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('arbeiten', CONTENT / 4), dCell('regelm. (+e)', CONTENT / 5), dCell('ge____et  →', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('essen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('gegessen', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('fahren', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('gehen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('sehen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('lesen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('schreiben', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('kommen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('trinken', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
        new TableRow({ children: [dCell('schlafen', CONTENT / 4), dCell('unregelm.', CONTENT / 5), dCell('', CONTENT * 11/20)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: haben oder sein? Wähle und bilde Sätze im Perfekt.'),
    pItalic('Bewegungsverben → sein.  Alle anderen → haben.'),
    empty(),
    p('1. Ich ______ gestern Fußball __________________ (spielen).'),
    p('2. Wir ______ mit dem Zug nach Berlin __________________ (fahren).'),
    p('3. Lea ______ ein Buch __________________ (lesen).'),
    p('4. Die Kinder ______ in den Park __________________ (gehen).'),
    p('5. Er ______ eine Pizza __________________ (essen).'),
    p('6. Ihr ______ einen Film __________________ (sehen).'),
    p('7. Ich ______ um 8 Uhr __________________ (kommen).'),
    p('8. Mama ______ Kuchen __________________ (backen).'),
    empty(),

    h2('Aufgabe 3: Schreibe, was du gestern gemacht hast.'),
    pItalic('Schreibe 5 Sätze im Perfekt. Benutze: Gestern habe/bin ich ...'),
    ...writeLines(6),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Partizip II'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 3), hCell('Partizip II', CONTENT / 3), hCell('Hilfsverb', CONTENT / 3)] }),
        new TableRow({ children: [dCell('machen', CONTENT / 3), dCell('gemacht', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('spielen', CONTENT / 3), dCell('gespielt', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('lernen', CONTENT / 3), dCell('gelernt', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('kaufen', CONTENT / 3), dCell('gekauft', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('kochen', CONTENT / 3), dCell('gekocht', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('arbeiten', CONTENT / 3), dCell('gearbeitet', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('essen', CONTENT / 3), dCell('gegessen', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('fahren', CONTENT / 3), dCell('gefahren', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('gehen', CONTENT / 3), dCell('gegangen', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('sehen', CONTENT / 3), dCell('gesehen', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('lesen', CONTENT / 3), dCell('gelesen', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('schreiben', CONTENT / 3), dCell('geschrieben', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('kommen', CONTENT / 3), dCell('gekommen', CONTENT / 3), dCell('sein', CONTENT / 3)] }),
        new TableRow({ children: [dCell('trinken', CONTENT / 3), dCell('getrunken', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
        new TableRow({ children: [dCell('schlafen', CONTENT / 3), dCell('geschlafen', CONTENT / 3), dCell('haben', CONTENT / 3)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: haben / sein + Partizip'),
    bullet('1. Ich habe gestern Fußball gespielt.'),
    bullet('2. Wir sind mit dem Zug nach Berlin gefahren.'),
    bullet('3. Lea hat ein Buch gelesen.'),
    bullet('4. Die Kinder sind in den Park gegangen.'),
    bullet('5. Er hat eine Pizza gegessen.'),
    bullet('6. Ihr habt einen Film gesehen.'),
    bullet('7. Ich bin um 8 Uhr gekommen.'),
    bullet('8. Mama hat Kuchen gebacken.  (gebacken = unregelmäßig)'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten. Partizip II am Satzende, haben/sein korrekt prüfen.'),
    pBold('Beispiel: Gestern habe ich Hausaufgaben gemacht. Dann bin ich in den Park gegangen.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Das Perfekt'),

    h2('Text: Was habt ihr am Wochenende gemacht?'),
    pItalic('Lies den Text genau.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Was habt ihr am Wochenende gemacht?', bold: true, size: 28, font: 'Arial', color: '1F4E79' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Am Montag fragt Frau Keller die Klasse: „Was habt ihr am Wochenende gemacht?" Die Kinder erzählen:', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Tobias sagt: „Ich bin mit meinem Vater in den Wald gefahren. Wir haben Pilze gesucht und ich habe zehn Pilze gefunden! Danach haben wir zu Hause Pilzsuppe gekocht. Sie hat super geschmeckt."', size: 26, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Priya berichtet: „Ich habe am Samstag ein Buch gelesen — das ganze Buch an einem Tag! Es hat „Sternenreise" geheißen. Danach habe ich meiner Oma einen Brief geschrieben. Sie wohnt weit weg und wir haben lange nicht telefoniert."', size: 26, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
          new Paragraph({ children: [new TextRun({ text: 'Kai sagt nichts. Frau Keller fragt ihn direkt. Er antwortet leise: „Ich bin zu Hause geblieben. Ich habe viel geschlafen und ferngesehen, weil ich krank war." Alle schauen ihn an. „Gute Besserung, Kai!", sagt die Klasse.', size: 26, font: 'Arial' })], spacing: { before: 60, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Tobias ist mit seiner Mutter in den Wald gefahren.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Tobias hat fünf Pilze gefunden.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Priya hat ein Buch in einem Tag gelesen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Priya hat ihrer Oma einen Brief geschrieben.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Kai ist am Wochenende ausgegangen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Kai war krank.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Beantworte die Fragen im Perfekt.'),
    p('1. Was hat Tobias mit seinem Vater gemacht?'),
    writeLine(), writeLine(),
    p('2. Was hat Priya am Samstag gelesen?'),
    writeLine(), writeLine(),
    p('3. Warum ist Kai zu Hause geblieben?'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Unterstreiche alle Perfekt-Formen im Text.'),
    pItalic('Schreibe sie dann hier auf und notiere den Infinitiv.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Perfektform im Text', CONTENT / 2), hCell('Infinitiv', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ist ... gefahren', CONTENT / 2), dCell('fahren', CONTENT / 2)] }),
        new TableRow({ children: [dCell('', CONTENT / 2), dCell('', CONTENT / 2)] }),
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
        new TableRow({ children: [dCell('Tobias ist mit seiner Mutter in den Wald gefahren.', CONTENT * 4/5), dCell('F (Vater)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Tobias hat fünf Pilze gefunden.', CONTENT * 4/5), dCell('F (zehn)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Priya hat ein Buch in einem Tag gelesen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Priya hat ihrer Oma einen Brief geschrieben.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Kai ist am Wochenende ausgegangen.', CONTENT * 4/5), dCell('F (zu Hause geblieben)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Kai war krank.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Fragen'),
    bullet('1. Tobias ist mit seinem Vater in den Wald gefahren. Sie haben Pilze gesucht und Pilzsuppe gekocht.'),
    bullet('2. Sie hat „Sternenreise" gelesen.'),
    bullet('3. Weil er krank war.'),
    empty(),
    h2('Aufgabe 3: Perfektformen im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Perfektform', CONTENT / 2), hCell('Infinitiv', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ist ... gefahren', CONTENT / 2), dCell('fahren (sein)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('haben ... gesucht', CONTENT / 2), dCell('suchen (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('habe ... gefunden', CONTENT / 2), dCell('finden (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('haben ... gekocht', CONTENT / 2), dCell('kochen (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('hat ... gelesen', CONTENT / 2), dCell('lesen (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('hat ... geheißen', CONTENT / 2), dCell('heißen (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('habe ... geschrieben', CONTENT / 2), dCell('schreiben (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('bin ... geblieben', CONTENT / 2), dCell('bleiben (sein)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('habe ... geschlafen', CONTENT / 2), dCell('schlafen (haben)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('(habe ... ferngesehen)', CONTENT / 2), dCell('fernsehen (haben)', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Das Perfekt'),

    h2('Aufgabe 1: Setze das Partizip II ein. Wähle auch haben oder sein.'),
    pItalic('Partizipien: gemacht • gefahren • gegessen • geschrieben • gegangen • getrunken • gespielt • gesehen • gekommen • geschlafen'),
    empty(),
    p('1. Wir ______ gestern Pizza ____________________. (essen)'),
    p('2. Die Schüler ______ einen langen Brief ____________________. (schreiben)'),
    p('3. Ich ______ letzte Nacht sehr gut ____________________. (schlafen)'),
    p('4. Tobias ______ mit dem Bus ____________________. (fahren)'),
    p('5. Habt ihr den neuen Film ____________________? (sehen)  — Ja, wir ______ ihn ____________________!'),
    p('6. Mia ______ zu Fuß in die Schule ____________________. (gehen)'),
    p('7. Wann ______ du ____________________? (kommen)  — Ich ______ um 9 Uhr ____________________!'),
    p('8. Die Kinder ______ Fußball ____________________. (spielen)'),
    p('9. Er ______ drei Gläser Wasser ____________________. (trinken)'),
    p('10. Was ______ ihr am Wochenende ____________________? (machen)'),
    empty(),

    h2('Aufgabe 2: Dialog — Wie war euer Ausflug?'),
    pItalic('Ergänze den Dialog mit den Perfektformen in Klammern.'),
    empty(),
    p('Lena:   Hallo Jonas! Wie war euer Ausflug?'),
    p('Jonas:  Super! Wir ______ mit dem Zug nach Hamburg ______. (fahren)'),
    p('Lena:   Was ______ ihr dort ______? (machen)'),
    p('Jonas:  Wir ______ das Miniaturwunderland ______. (sehen)  Es war fantastisch!'),
    p('        Danach ______ wir Fischbrötchen ______. (essen)'),
    p('Lena:   ______ ihr auch das Rathaus ______? (sehen)'),
    p('Jonas:  Ja! Wir ______ sehr viel ______. (laufen)  Abends ______ ich sofort ______. (schlafen)'),
    p('Lena:   Klingt toll! Ich ______ am Samstag auch etwas Schönes ______. (machen)'),
    p('        Ich ______ meiner Oma ______ und wir ______ Kuchen ______. (besuchen / backen)'),
    empty(),

    h2('Aufgabe 3: Schreibe drei eigene Sätze im Perfekt.'),
    pItalic('Benutze je einmal: haben + Partizip und sein + Partizip.'),
    p('1. (haben) Gestern ____________________________________________.'),
    writeLine(),
    p('2. (sein) Am Wochenende ____________________________________________.'),
    writeLine(),
    p('3. (sein oder haben) ____________________________________________.'),
    writeLine(),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nr.', CONTENT / 10), hCell('Hilfsverb', CONTENT * 2/10), hCell('Partizip II', CONTENT * 3/10), hCell('Vollständiger Satz', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('1', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('gegessen', CONTENT * 3/10), dCell('Wir haben gestern Pizza gegessen.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('2', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('geschrieben', CONTENT * 3/10), dCell('Die Schüler haben einen langen Brief geschrieben.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('3', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('geschlafen', CONTENT * 3/10), dCell('Ich habe letzte Nacht sehr gut geschlafen.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('4', CONTENT / 10), dCell('sein', CONTENT * 2/10), dCell('gefahren', CONTENT * 3/10), dCell('Tobias ist mit dem Bus gefahren.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('5', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('gesehen', CONTENT * 3/10), dCell('Habt ihr gesehen? — Ja, wir haben gesehen!', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('6', CONTENT / 10), dCell('sein', CONTENT * 2/10), dCell('gegangen', CONTENT * 3/10), dCell('Mia ist zu Fuß gegangen.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('7', CONTENT / 10), dCell('sein', CONTENT * 2/10), dCell('gekommen', CONTENT * 3/10), dCell('Wann bist du gekommen? — Ich bin um 9 Uhr gekommen!', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('8', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('gespielt', CONTENT * 3/10), dCell('Die Kinder haben Fußball gespielt.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('9', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('getrunken', CONTENT * 3/10), dCell('Er hat drei Gläser Wasser getrunken.', CONTENT * 4/10)] }),
        new TableRow({ children: [dCell('10', CONTENT / 10), dCell('haben', CONTENT * 2/10), dCell('gemacht', CONTENT * 3/10), dCell('Was habt ihr am Wochenende gemacht?', CONTENT * 4/10)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Dialog'),
    bullet('sind ... gefahren'),
    bullet('habt ... gemacht'),
    bullet('haben ... gesehen / haben ... gegessen'),
    bullet('Habt ... gesehen'),
    bullet('sind ... gelaufen / habe ... geschlafen'),
    bullet('habe ... gemacht / habe ... besucht / haben ... gebacken'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten. Partizip am Satzende, haben/sein korrekt prüfen.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Das Perfekt: Wichtige Verben'),
    pItalic('Lerne diese Verben auswendig. Das Perfekt ist die häufigste Vergangenheitsform in der gesprochenen Sprache!'),
    empty(),

    pBold('Regelmäßige Verben: haben + ge- + Stamm + -t'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 4), hCell('Partizip II', CONTENT / 4), hCell('Beispielsatz', CONTENT / 4), hCell('Übersetzung', CONTENT / 4)] }),
        new TableRow({ children: [dCell('machen', CONTENT / 4), dCell('gemacht', CONTENT / 4), dCell('Ich habe Hausaufgaben gemacht.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('spielen', CONTENT / 4), dCell('gespielt', CONTENT / 4), dCell('Wir haben Fußball gespielt.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lernen', CONTENT / 4), dCell('gelernt', CONTENT / 4), dCell('Er hat Vokabeln gelernt.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kaufen', CONTENT / 4), dCell('gekauft', CONTENT / 4), dCell('Sie hat Brot gekauft.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kochen', CONTENT / 4), dCell('gekocht', CONTENT / 4), dCell('Papa hat Suppe gekocht.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('fragen', CONTENT / 4), dCell('gefragt', CONTENT / 4), dCell('Die Lehrerin hat gefragt.', CONTENT / 4), dCell('', CONTENT / 4)] }),
      ]
    }),
    empty(),

    pBold('Unregelmäßige Verben mit haben:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 4), hCell('Partizip II', CONTENT / 4), hCell('Beispielsatz', CONTENT / 4), hCell('Übersetzung', CONTENT / 4)] }),
        new TableRow({ children: [dCell('essen', CONTENT / 4), dCell('gegessen', CONTENT / 4), dCell('Ich habe Pizza gegessen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sehen', CONTENT / 4), dCell('gesehen', CONTENT / 4), dCell('Wir haben einen Film gesehen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lesen', CONTENT / 4), dCell('gelesen', CONTENT / 4), dCell('Sie hat ein Buch gelesen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schreiben', CONTENT / 4), dCell('geschrieben', CONTENT / 4), dCell('Er hat einen Brief geschrieben.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('trinken', CONTENT / 4), dCell('getrunken', CONTENT / 4), dCell('Das Kind hat Wasser getrunken.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schlafen', CONTENT / 4), dCell('geschlafen', CONTENT / 4), dCell('Ich habe lange geschlafen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('finden', CONTENT / 4), dCell('gefunden', CONTENT / 4), dCell('Er hat den Schlüssel gefunden.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sprechen', CONTENT / 4), dCell('gesprochen', CONTENT / 4), dCell('Sie haben Deutsch gesprochen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
      ]
    }),
    empty(),

    pBold('Unregelmäßige Verben mit sein (Bewegung/Ortsveränderung):'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 4), hCell('Partizip II', CONTENT / 4), hCell('Beispielsatz', CONTENT / 4), hCell('Übersetzung', CONTENT / 4)] }),
        new TableRow({ children: [dCell('fahren', CONTENT / 4), dCell('gefahren', CONTENT / 4), dCell('Wir sind nach Berlin gefahren.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gehen', CONTENT / 4), dCell('gegangen', CONTENT / 4), dCell('Ich bin in die Schule gegangen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kommen', CONTENT / 4), dCell('gekommen', CONTENT / 4), dCell('Sie ist um 8 Uhr gekommen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('laufen', CONTENT / 4), dCell('gelaufen', CONTENT / 4), dCell('Er ist sehr weit gelaufen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('fliegen', CONTENT / 4), dCell('geflogen', CONTENT / 4), dCell('Wir sind nach Spanien geflogen.', CONTENT / 4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('bleiben', CONTENT / 4), dCell('geblieben', CONTENT / 4), dCell('Er ist zu Hause geblieben.', CONTENT / 4), dCell('', CONTENT / 4)] }),
      ]
    }),
    empty(),
    pItalic('Tipp: Lerne Partizip II immer zusammen mit dem Hilfsverb: „haben + gegessen" / „sein + gefahren"'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Die Übersetzungen sind individuell. Englische Beispiele zur Orientierung:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Infinitiv', CONTENT / 4), hCell('Partizip II', CONTENT / 4), hCell('Hilfsverb', CONTENT / 4), hCell('Englisch', CONTENT / 4)] }),
        new TableRow({ children: [dCell('machen', CONTENT / 4), dCell('gemacht', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to do / make', CONTENT / 4)] }),
        new TableRow({ children: [dCell('spielen', CONTENT / 4), dCell('gespielt', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to play', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lernen', CONTENT / 4), dCell('gelernt', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to learn', CONTENT / 4)] }),
        new TableRow({ children: [dCell('essen', CONTENT / 4), dCell('gegessen', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to eat', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sehen', CONTENT / 4), dCell('gesehen', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to see / watch', CONTENT / 4)] }),
        new TableRow({ children: [dCell('lesen', CONTENT / 4), dCell('gelesen', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to read', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schreiben', CONTENT / 4), dCell('geschrieben', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to write', CONTENT / 4)] }),
        new TableRow({ children: [dCell('trinken', CONTENT / 4), dCell('getrunken', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to drink', CONTENT / 4)] }),
        new TableRow({ children: [dCell('schlafen', CONTENT / 4), dCell('geschlafen', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to sleep', CONTENT / 4)] }),
        new TableRow({ children: [dCell('finden', CONTENT / 4), dCell('gefunden', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to find', CONTENT / 4)] }),
        new TableRow({ children: [dCell('sprechen', CONTENT / 4), dCell('gesprochen', CONTENT / 4), dCell('haben', CONTENT / 4), dCell('to speak', CONTENT / 4)] }),
        new TableRow({ children: [dCell('fahren', CONTENT / 4), dCell('gefahren', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to drive / travel', CONTENT / 4)] }),
        new TableRow({ children: [dCell('gehen', CONTENT / 4), dCell('gegangen', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to go (on foot)', CONTENT / 4)] }),
        new TableRow({ children: [dCell('kommen', CONTENT / 4), dCell('gekommen', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to come', CONTENT / 4)] }),
        new TableRow({ children: [dCell('laufen', CONTENT / 4), dCell('gelaufen', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to run / walk', CONTENT / 4)] }),
        new TableRow({ children: [dCell('fliegen', CONTENT / 4), dCell('geflogen', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to fly', CONTENT / 4)] }),
        new TableRow({ children: [dCell('bleiben', CONTENT / 4), dCell('geblieben', CONTENT / 4), dCell('sein', CONTENT / 4), dCell('to stay / remain', CONTENT / 4)] }),
      ]
    }),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Das Perfekt'),

    h2('Dialog 1: Was hast du gestern gemacht?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hast du gestern gemacht?', CONTENT / 2), dCell('Ich habe ______ und danach ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Bist du irgendwohin gegangen?', CONTENT / 2), dCell('Ja, ich bin ______. / Nein, ich bin zu Hause geblieben.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hast du gegessen?', CONTENT / 2), dCell('Ich habe ______ gegessen und ______ getrunken.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hast du ferngesehen oder gelesen?', CONTENT / 2), dCell('Ich habe ______. Es war ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann bist du schlafen gegangen?', CONTENT / 2), dCell('Ich bin um ______ Uhr schlafen gegangen.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Wie war euer Ausflug?'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Wo ______ ihr am Wochenende ______? (sein)'),
    p('B: Wir ______ nach ______ ______. (fahren)'),
    p('A: Was ______ ihr dort ______? (machen)'),
    p('B: Wir ______ ______ ______. (sehen/besuchen)'),
    p('   Dann ______ wir ______ ______. (essen)  Es ______ super ______! (schmecken)'),
    p('A: Wie lange ______ ihr dort ______? (bleiben)'),
    p('B: Wir ______ den ganzen Tag dort ______. (bleiben)'),
    p('   Abends ______ wir müde nach Hause ______. (kommen)'),
    empty(),

    h2('Partnerinterview: Letzte Woche'),
    pItalic('Frage deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort (im Perfekt!)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hast du letzte Woche gegessen?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Welches Buch/Video hast du gelesen/gesehen?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Bist du irgendwohin gefahren oder gegangen?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hast du mit Freunden gemacht?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was hast du zuhause gelernt oder geübt?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Stelle deinen Partner / deine Partnerin vor: „_______ hat letzte Woche ... und ist ..."'),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Partizip II korrekt gebildet (regelmäßig: ge-...-t, unregelmäßig: auswendig)'),
    bullet('haben/sein korrekt gewählt (sein bei Bewegungsverben)'),
    bullet('Partizip II steht am Satzende'),
    bullet('Frage im Perfekt korrekt: Hast du ...? / Bist du ...?'),
    empty(),
    h2('Dialog 2 — Mögliche Formen'),
    bullet('Wart ihr ... / Wo seid ihr ... gewesen?'),
    bullet('Wir sind nach [Stadt] gefahren.'),
    bullet('Was habt ihr ... gemacht?'),
    bullet('Wir haben ... gesehen/besucht.  /  Wir haben ... gegessen. Es hat super geschmeckt!'),
    bullet('Wie lange seid ihr ... geblieben?'),
    bullet('Wir sind den ganzen Tag ... geblieben.'),
    bullet('Abends sind wir ... nach Hause gekommen.'),
    empty(),
    pItalic('Individuelle Antworten akzeptieren. Auf korrekte Perfektbildung und Wortstellung achten.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Das Perfekt'),

    h2('Aufgabe 1: Was haben die Kinder gemacht? Schreibe Sätze im Perfekt.'),
    pItalic('Beschreibe, was du auf jedem Bild siehst. Benutze das Perfekt!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Junge sitzt am Tisch mit Büchern und Heften, schreibt]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Er hat __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Mädchen auf dem Fahrrad, fährt durch den Park]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie ist __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3: Familie am Esstisch, essen zusammen]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie haben __________________________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 4: Kind schläft im Bett, Buch liegt daneben]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 160, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Es hat ________ und dann __________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 160 } }),
          ]}),
        ]}),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Zeitstrahl — Was hat Ana gestern gemacht?'),
    pItalic('Schau den Zeitstrahl an und schreibe 5 Sätze im Perfekt.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [new TableCell({
          width: { size: CONTENT, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' },
          children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 5: Zeitstrahl mit Uhrzeiten und Aktivitäten]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: '07:00  aufwachen, frühstücken (Müsli essen, Orangensaft trinken)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: '08:30  in die Schule gehen', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: '14:00  nach Hause kommen, Hausaufgaben machen', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: '16:00  mit dem Fahrrad in den Park fahren, Freunde treffen', size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: '20:00  ein Buch lesen, schlafen gehen', size: 22, font: 'Arial' })], spacing: { before: 40, after: 80 } }),
          ]
        })]})
      ]
    }),
    empty(),
    p('1. Um 7 Uhr hat Ana __________________________________.'),
    p('2. Um halb neun __________________________________.'),
    p('3. Am Nachmittag __________________________________.'),
    p('4. Um 16 Uhr __________________________________.'),
    p('5. Am Abend __________________________________.'),
    empty(),

    h2('Aufgabe 3: Zeichne deinen eigenen Zeitstrahl!'),
    pItalic('[BILD 6: Leerer Zeitstrahl-Rahmen mit Platz für 5 Einträge]'),
    pItalic('Zeichne, was du gestern gemacht hast, und schreibe 4 Sätze im Perfekt darunter.'),
    ...writeLines(4),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Bilder'),
    bullet('Bild 1: Er hat Hausaufgaben gemacht. / Er hat etwas geschrieben.'),
    bullet('Bild 2: Sie ist mit dem Fahrrad durch den Park gefahren.'),
    bullet('Bild 3: Sie haben zusammen gegessen.'),
    bullet('Bild 4: Es hat ein Buch gelesen und dann geschlafen.'),
    pItalic('Andere passende Sätze akzeptieren. Partizip II und haben/sein prüfen.'),
    empty(),
    h2('Aufgabe 2: Zeitstrahl Ana'),
    bullet('1. Um 7 Uhr hat Ana Müsli gegessen und Orangensaft getrunken.'),
    bullet('2. Um halb neun ist sie in die Schule gegangen.'),
    bullet('3. Am Nachmittag ist sie nach Hause gekommen und hat Hausaufgaben gemacht.'),
    bullet('4. Um 16 Uhr ist sie mit dem Fahrrad in den Park gefahren und hat Freunde getroffen.'),
    bullet('5. Am Abend hat sie ein Buch gelesen und ist schlafen gegangen.'),
    empty(),
    h2('Aufgabe 3: Eigener Zeitstrahl'),
    pItalic('Individuelle Antworten. Partizip II korrekt gebildet und haben/sein korrekt eingesetzt prüfen.'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
