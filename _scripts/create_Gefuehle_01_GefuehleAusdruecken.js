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

const TOPIC_LABEL = 'A2 Kinder — Gefühle — Gefühle ausdrücken';
const TOPIC       = 'A2_Kinder_Gefuehle_01_GefuehleAusdruecken';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '10_Gefuehle', '01_GefuehleAusdruecken'
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
  console.log('Erstelle Unterpunkt: Gefühle ausdrücken');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Gefühle ausdrücken'),

    h2('Aufgabe 1: Wie fühlt sich die Person? Wähle das richtige Gefühl.'),
    pItalic('Gefühle: froh — traurig — müde — wütend — ängstlich — aufgeregt — stolz — nervös'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Situation', CONTENT * 3/5), hCell('Gefühl', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Mia hat heute Geburtstag. Alle singen für sie.', CONTENT * 3/5), dCell('Sie ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Tom hat morgen eine schwere Prüfung.', CONTENT * 3/5), dCell('Er ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Lena hat gestern schlecht geschlafen.', CONTENT * 3/5), dCell('Sie ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Max hat seinen Hund verloren.', CONTENT * 3/5), dCell('Er ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Finn hat ein Gewitter gehört und allein zu Hause ist.', CONTENT * 3/5), dCell('Er ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Sara hat 100% in der Prüfung bekommen.', CONTENT * 3/5), dCell('Sie ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Jonas darf nicht zum Konzert, obwohl er es wollte.', CONTENT * 3/5), dCell('Er ist ______________.', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Die Klasse fährt morgen in den Zoo!', CONTENT * 3/5), dCell('Alle sind ______________.', CONTENT * 2/5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Schreibe Sätze mit „weil".'),
    pItalic('Benutze: Ich bin ... / Ich fühle mich ... / Ich habe Angst, weil ...'),
    empty(),
    p('1. froh — Ich bin froh, weil ____________________.'),
    writeLine(),
    p('2. traurig — Ich bin traurig, weil ____________________.'),
    writeLine(),
    p('3. wütend — Ich bin wütend, weil ____________________.'),
    writeLine(),
    p('4. ängstlich — Ich habe Angst vor ____________________.'),
    writeLine(),
    p('5. aufgeregt — Ich bin aufgeregt, weil ____________________.'),
    writeLine(),
    empty(),

    h2('Aufgabe 3: Wie fühlst du dich? Schreibe 4–5 Sätze.'),
    pItalic('Beschreibe, wie du dich in verschiedenen Situationen fühlst. Benutze mindestens 3 verschiedene Gefühle.'),
    pItalic('Tipp: In der Schule / Vor Prüfungen / Mit meinen Freunden / Zu Hause / Wenn ich ...'),
    ...writeLines(6),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Gefühle'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Situation', CONTENT * 3/5), hCell('Gefühl (Lösung)', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Mia hat heute Geburtstag.', CONTENT * 3/5), dCell('froh / aufgeregt', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Tom hat morgen eine schwere Prüfung.', CONTENT * 3/5), dCell('nervös / ängstlich', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Lena hat schlecht geschlafen.', CONTENT * 3/5), dCell('müde', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Max hat seinen Hund verloren.', CONTENT * 3/5), dCell('traurig', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Finn ist allein beim Gewitter.', CONTENT * 3/5), dCell('ängstlich', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Sara hat 100% in der Prüfung.', CONTENT * 3/5), dCell('stolz / froh', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Jonas darf nicht zum Konzert.', CONTENT * 3/5), dCell('wütend / traurig', CONTENT * 2/5)] }),
        new TableRow({ children: [dCell('Die Klasse fährt in den Zoo.', CONTENT * 3/5), dCell('aufgeregt / froh', CONTENT * 2/5)] }),
      ]
    }),
    pItalic('Andere passende Gefühle akzeptieren und begründen lassen.'),
    empty(),
    h2('Aufgabe 2: weil-Sätze'),
    pItalic('Individuelle Antworten akzeptieren. Prüfen: Verb steht am Ende des weil-Satzes.'),
    pBold('Beispiele:'),
    bullet('Ich bin froh, weil heute Freitag ist.'),
    bullet('Ich bin traurig, weil mein Freund krank ist.'),
    bullet('Ich bin wütend, weil mein Bruder mein Buch genommen hat.'),
    bullet('Ich habe Angst vor Spinnen / vor dem Dunkeln / vor Prüfungen.'),
    bullet('Ich bin aufgeregt, weil wir morgen in den Urlaub fahren.'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten. Mindestens 3 Gefühle + korrekte Satzstruktur prüfen.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Ein aufregender Tag'),

    h2('Text: Ein aufregender Tag'),
    pItalic('Lies den Text genau.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Ein aufregender Tag', bold: true, size: 28, font: 'Arial', color: '1F4E79' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Heute ist ein ganz besonderer Tag für Klara (10 Jahre). Morgen hat sie eine Prüfung in Mathe, und am Nachmittag spielt ihre Fußballmannschaft das wichtigste Spiel des Jahres. Klara fühlt sich gleichzeitig aufgeregt und nervös.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Am Morgen lernt sie mit ihrer Freundin Yuki für die Prüfung. Yuki ist sehr ruhig und sagt: „Du schaffst das, Klara! Du bist so gut in Mathe." Das macht Klara ein bisschen froher, aber sie hat immer noch Angst vor der Prüfung.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Beim Mittagessen ist Klara müde und isst kaum etwas. Ihr Vater fragt: „Was ist los mit dir?" Klara erklärt alles. Der Vater lacht freundlich: „Das schaffen wir! Erst die Prüfung, dann das Spiel. Du bist stark."', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Beim Fußballspiel schießt Klara das entscheidende Tor — 2:1! Die ganze Mannschaft jubelt. Klara ist überglücklich und ein bisschen stolz. Zu Hause schläft sie sofort ein. Morgen kommt die Prüfung. Aber heute war ein wunderschöner Tag.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara hat morgen eine Prüfung in Deutsch.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Yuki lernt am Morgen mit Klara zusammen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara isst beim Mittagessen sehr viel.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara schießt das entscheidende Tor.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Fußballspiel endet 1:2.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara schläft zu Hause sofort ein.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Beantworte die Fragen.'),
    p('1. Wie fühlt sich Klara am Morgen? Nenne zwei Gefühle.'),
    writeLine(), writeLine(),
    p('2. Was sagt Yuki zu Klara?'),
    writeLine(), writeLine(),
    p('3. Warum ist Klara beim Mittagessen müde und isst kaum etwas?'),
    writeLine(), writeLine(),
    p('4. Wie fühlt sich Klara nach dem Fußballspiel?'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Suche im Text!'),
    p('Schreibe alle Gefühlswörter aus dem Text:'),
    writeLine(), writeLine(),
    p('Welches Gefühl kommt am häufigsten vor?  ______________________'),
  ], `${TOPIC}_Lesen.docx`);

  // ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Leseübung'),
    h2('Aufgabe 1: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara hat morgen eine Prüfung in Deutsch.', CONTENT * 4/5), dCell('F (Mathe)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Yuki lernt am Morgen mit Klara zusammen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara isst beim Mittagessen sehr viel.', CONTENT * 4/5), dCell('F (kaum etwas)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara schießt das entscheidende Tor.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Das Fußballspiel endet 1:2.', CONTENT * 4/5), dCell('F (2:1)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Klara schläft zu Hause sofort ein.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Fragen'),
    bullet('1. aufgeregt und nervös'),
    bullet('2. „Du schaffst das, Klara! Du bist so gut in Mathe."'),
    bullet('3. Sie hat Angst vor der Prüfung und dem wichtigen Fußballspiel.'),
    bullet('4. überglücklich und ein bisschen stolz'),
    empty(),
    h2('Aufgabe 3: Gefühlswörter im Text'),
    pBold('aufgeregt, nervös, froh (froher), Angst, müde, überglücklich, stolz'),
    pBold('Häufigstes Gefühl: aufgeregt / nervös (beide kommen oft indirekt vor)'),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Gefühle ausdrücken'),

    h2('Aufgabe 1: Setze das richtige Wort ein.'),
    pItalic('Wörterkasten: wütend • stolz • nervös • Angst • fühle • traurig • froh • müde • aufgeregt • überrascht'),
    empty(),
    p('1. Ich bin so ______________ — ich habe letzte Nacht kaum geschlafen.'),
    p('2. Meine Oma hat mich heute angerufen. Ich war ganz ______________, weil ich sie lange nicht gesehen habe.'),
    p('3. Vor der Prüfung bin ich immer sehr ______________.'),
    p('4. Ich habe ______________ vor Spinnen — sie sind so gruselig!'),
    p('5. Mein Bruder hat mein Lieblingsbuch zerrissen. Ich bin so ______________!'),
    p('6. Ich ______________ mich heute sehr wohl — alles ist gut.'),
    p('7. Luisa hat den ersten Preis gewonnen. Sie ist sehr ______________ auf sich.'),
    p('8. Morgen fahren wir in den Urlaub! Ich bin total ______________!'),
    p('9. Mein Hund ist krank. Ich bin sehr ______________.'),
    p('10. Nach dem langen Wandern sind alle Kinder sehr ______________.'),
    empty(),

    h2('Aufgabe 2: Dialog — Wie geht es dir?'),
    pItalic('Ergänze den Dialog.'),
    pItalic('Wörterkasten: nervös • passiert • weil • geht • fühle • Angst • aufgeregt • besser'),
    empty(),
    p('Finn:   Hey Lena, wie ______________ es dir?'),
    p('Lena:   Nicht so gut. Ich ______________ mich heute komisch.'),
    p('Finn:   Was ist ______________?'),
    p('Lena:   Ich bin ein bisschen ______________ und ______________,'),
    p('        ______________ ich morgen vor der ganzen Klasse sprechen muss.'),
    p('Finn:   Ich verstehe das. Ich habe auch manchmal ______________ davor.'),
    p('        Aber du schaffst das sicher!'),
    p('Lena:   Danke! Das macht mich schon ein bisschen ______________.'),
    empty(),

    h2('Aufgabe 3: Schreibe deinen eigenen Satz.'),
    pItalic('Beschreibe ein Gefühl mit „weil" und erkläre, warum du dich so fühlst.'),
    p('Ich bin __________________, weil __________________________________.'),
    writeLine(),
    p('Ich fühle mich __________________, wenn __________________________________.'),
    writeLine(),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nr.', CONTENT / 8), hCell('Lösung', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('1', CONTENT / 8), dCell('müde', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('2', CONTENT / 8), dCell('überrascht / froh', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('3', CONTENT / 8), dCell('nervös', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('4', CONTENT / 8), dCell('Angst', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('5', CONTENT / 8), dCell('wütend', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('6', CONTENT / 8), dCell('fühle', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('7', CONTENT / 8), dCell('stolz', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('8', CONTENT / 8), dCell('aufgeregt', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('9', CONTENT / 8), dCell('traurig', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('10', CONTENT / 8), dCell('müde', CONTENT * 7/8)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Dialog'),
    bullet('geht'),
    bullet('fühle'),
    bullet('passiert'),
    bullet('nervös / aufgeregt'),
    bullet('weil'),
    bullet('Angst'),
    bullet('besser'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten akzeptieren. Verb am Ende des weil/wenn-Satzes prüfen.'),
    pBold('Beispiel: Ich bin froh, weil heute die Sonne scheint. / Ich fühle mich müde, wenn ich früh aufstehen muss.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Gefühle ausdrücken'),
    pItalic('Lerne diese Wörter. Schreibe deine Übersetzung in die letzte Spalte.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          hCell('Gefühl', CONTENT * 22/100),
          hCell('Gegenteil', CONTENT * 22/100),
          hCell('Beispielsatz', CONTENT * 38/100),
          hCell('Übersetzung', CONTENT * 18/100),
        ]}),
        new TableRow({ children: [dCell('froh / fröhlich', CONTENT * 22/100), dCell('traurig', CONTENT * 22/100), dCell('Ich bin froh, weil heute Freitag ist.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('traurig', CONTENT * 22/100), dCell('froh', CONTENT * 22/100), dCell('Ich bin traurig, weil mein Freund krank ist.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('müde', CONTENT * 22/100), dCell('wach / fit', CONTENT * 22/100), dCell('Nach dem Sport bin ich sehr müde.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('wütend', CONTENT * 22/100), dCell('ruhig', CONTENT * 22/100), dCell('Ich bin wütend, weil das ungerecht ist.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('Angst haben (vor + D.)', CONTENT * 22/100), dCell('mutig sein', CONTENT * 22/100), dCell('Ich habe Angst vor Gewitter.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('nervös', CONTENT * 22/100), dCell('ruhig', CONTENT * 22/100), dCell('Vor der Prüfung bin ich nervös.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('aufgeregt', CONTENT * 22/100), dCell('ruhig', CONTENT * 22/100), dCell('Ich bin aufgeregt, weil wir in den Urlaub fahren.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('stolz (auf + A.)', CONTENT * 22/100), dCell('beschämt', CONTENT * 22/100), dCell('Ich bin stolz auf meine Note.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('überrascht', CONTENT * 22/100), dCell('erwartet', CONTENT * 22/100), dCell('Ich bin überrascht — das wusste ich nicht!', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('ängstlich', CONTENT * 22/100), dCell('mutig', CONTENT * 22/100), dCell('Das ängstliche Kind versteckt sich.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('sich fühlen', CONTENT * 22/100), dCell('—', CONTENT * 22/100), dCell('Ich fühle mich heute nicht gut.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('Wie geht es dir?', CONTENT * 22/100), dCell('—', CONTENT * 22/100), dCell('Wie geht es dir? — Gut, danke!', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('Es geht mir (nicht) gut.', CONTENT * 22/100), dCell('—', CONTENT * 22/100), dCell('Es geht mir heute nicht so gut.', CONTENT * 38/100), dCell('', CONTENT * 18/100)] }),
      ]
    }),
    empty(),

    h2('Grammatik: Gefühle ausdrücken'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Struktur', CONTENT / 2), hCell('Beispiel', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich bin + Adjektiv.', CONTENT / 2), dCell('Ich bin traurig / müde / wütend.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich fühle mich + Adjektiv.', CONTENT / 2), dCell('Ich fühle mich nervös.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich habe Angst vor + Dativ.', CONTENT / 2), dCell('Ich habe Angst vor Hunden.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich bin stolz auf + Akkusativ.', CONTENT / 2), dCell('Ich bin stolz auf meine Schwester.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('... weil + Subjekt + ... + Verb.', CONTENT / 2), dCell('... weil ich morgen eine Prüfung habe.', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Tipp: Schreibe jeden Gefühlsbegriff auf eine Lernkarte. Zeichne ein kleines Gesicht dazu!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Die Übersetzungen sind individuell. Englische Beispiele zur Orientierung:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wort / Phrase', CONTENT / 2), hCell('Englisch (Beispiel)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('froh / fröhlich', CONTENT / 2), dCell('happy / cheerful', CONTENT / 2)] }),
        new TableRow({ children: [dCell('traurig', CONTENT / 2), dCell('sad', CONTENT / 2)] }),
        new TableRow({ children: [dCell('müde', CONTENT / 2), dCell('tired', CONTENT / 2)] }),
        new TableRow({ children: [dCell('wütend', CONTENT / 2), dCell('angry', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Angst haben (vor + D.)', CONTENT / 2), dCell('to be afraid (of)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('nervös', CONTENT / 2), dCell('nervous', CONTENT / 2)] }),
        new TableRow({ children: [dCell('aufgeregt', CONTENT / 2), dCell('excited', CONTENT / 2)] }),
        new TableRow({ children: [dCell('stolz (auf + A.)', CONTENT / 2), dCell('proud (of)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('überrascht', CONTENT / 2), dCell('surprised', CONTENT / 2)] }),
        new TableRow({ children: [dCell('ängstlich', CONTENT / 2), dCell('anxious / scared', CONTENT / 2)] }),
        new TableRow({ children: [dCell('sich fühlen', CONTENT / 2), dCell('to feel (oneself)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie geht es dir?', CONTENT / 2), dCell('How are you?', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Es geht mir (nicht) gut.', CONTENT / 2), dCell('I am (not) well.', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Gefühle ausdrücken'),

    h2('Dialog 1: Wie geht es dir?'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hey! Wie geht es dir heute?', CONTENT / 2), dCell('Ehrlich gesagt, nicht so gut. Ich bin ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Oh nein! Was ist passiert?', CONTENT / 2), dCell('Ich fühle mich ______, weil ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Das tut mir leid. Kann ich etwas tun?', CONTENT / 2), dCell('Danke. Es hilft schon, wenn jemand fragt.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich hoffe, es wird bald besser!', CONTENT / 2), dCell('Ja, ich glaube auch. Danke!', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Jemanden aufheitern'),
    pItalic('Ergänzt den Dialog und übt ihn dann.'),
    empty(),
    p('A: Du siehst heute so ______________ aus. Was ist los?'),
    p('B: Ich bin ein bisschen ______________, weil ______________.'),
    p('A: Ich verstehe das. Ich war auch mal ______________, als ______________.'),
    p('B: Wirklich? Wie bist du damit umgegangen?'),
    p('A: Ich habe ______________ und dann wurde es ______________. Versuch das mal!'),
    p('B: Gute Idee! Danke, das macht mich schon ______________.'),
    p('A: Ich freue mich, wenn es dir besser geht!'),
    empty(),

    h2('Partnerinterview: Gefühle und Situationen'),
    pItalic('Frage deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann bist du froh?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann bist du nervös?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hast du Angst vor etwas? Wovor?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann bist du wütend?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Worauf bist du stolz?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie gehst du mit Traurigkeit um?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Stellt euch gegenseitig vor: „Mein Partner / Meine Partnerin ist froh, wenn ..."'),
    empty(),

    h2('Gruppenspiel: Gefühle-Pantomime'),
    pItalic('Karte ziehen, Gefühl vorspielen — die anderen erraten es auf Deutsch!'),
    pItalic('Wer es errät, sagt einen vollständigen Satz: „Du bist ..., weil ..."'),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Gefühlsadjektiv korrekt verwendet (nach „sein": Ich bin müde.)'),
    bullet('„sich fühlen" + Adjektiv korrekt (Ich fühle mich nervös.)'),
    bullet('Angst haben vor + Dativ korrekt (vor dem Hund / vor Prüfungen)'),
    bullet('weil-Satz: Verb am Ende'),
    bullet('Angemessene Reaktionen im Dialog (Das tut mir leid. / Ich hoffe, es wird besser.)'),
    empty(),
    h2('Dialog 1 — Mögliche Antworten'),
    bullet('B: Ich bin traurig / müde / nervös.'),
    bullet('B: Ich fühle mich schlecht, weil ich Streit mit meiner Freundin hatte.'),
    pItalic('Individuelle Antworten akzeptieren.'),
    empty(),
    h2('Dialog 2 — Mögliche Antworten'),
    bullet('traurig / nachdenklich'),
    bullet('traurig / nervös + persönlicher Grund'),
    bullet('auch traurig / nervös war, als ich ... (weil-Satz / als-Satz)'),
    bullet('mit Freunden gesprochen / Sport gemacht / ... / besser'),
    bullet('froher / besser'),
    pItalic('Kreativität und authentische Antworten ausdrücklich loben.'),
    empty(),
    h2('Partnerinterview & Pantomime'),
    pItalic('Individuelle Antworten. Auf korrekte Satzstruktur und passendes Vokabular achten.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Gefühle ausdrücken'),

    h2('Aufgabe 1: Wie fühlen sich die Personen?'),
    pItalic('Schau dir die Bilder an und schreibe das Gefühl darunter. Schreibe auch einen Satz.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Junge mit Tränen in den Augen, hält ein zerrissenes Buch]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Gefühl: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Er ist ______________, weil ______________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Mädchen mit Medaille, lacht und streckt die Faust in die Luft]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Gefühl: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Sie ist ______________, weil ______________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3: Kind versteckt sich unter der Bettdecke, draußen Blitz und Donner zu sehen]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Gefühl: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Es hat Angst vor ______________.', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
        ]})
      ]
    }),
    empty(),

    h2('Aufgabe 2: Gefühle-Diagramm der Klasse'),
    pItalic('Schau das Diagramm an und beantworte die Fragen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [new TableCell({
          width: { size: CONTENT, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' },
          children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 4: Tortendiagramm — „Wie fühlst du dich heute?" Klasse 4b (28 Schüler)]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
            new Paragraph({ children: [new TextRun({ text: 'froh/aufgeregt:   ████████████ 12 Schüler  (43%)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'müde:             ███████ 7 Schüler     (25%)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'nervös:           █████ 5 Schüler      (18%)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'traurig:          ██ 2 Schüler        (7%)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'wütend:           ██ 2 Schüler        (7%)', size: 22, font: 'Arial' })], spacing: { before: 60, after: 100 } }),
          ]
        })]})
      ]
    }),
    empty(),
    p('1. Wie fühlen sich die meisten Schüler heute?'),
    writeLine(),
    p('2. Wie viele Schüler sind nervös?'),
    writeLine(),
    p('3. Wie viele Schüler fühlen sich nicht gut (müde + traurig + wütend)?'),
    writeLine(),
    p('4. Schreibe einen Satz über das Diagramm.'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Gefühls-Postkarte schreiben'),
    pItalic('[BILD 5: Vorlage einer Postkarte mit Linien und kleinem Kästchen für ein Gesicht/Emoji]'),
    pItalic('Schreibe einer Freundin / einem Freund eine kurze Postkarte. Beschreibe, wie du dich fühlst und warum.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFFDF0' },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' },
          left: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' },
          right: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' },
        },
        children: [
          p('Liebe/r ____________________,'),
          writeLine(),
          writeLine(),
          writeLine(),
          writeLine(),
          writeLine(),
          p('Viele Grüße, ____________________'),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 4: Zeichne ein Gefühlsmonster!'),
    pItalic('[BILD 6: Leere Umrisse von 4 kleinen „Monster"-Figuren nebeneinander]'),
    pItalic('Zeichne in jedes Monster ein Gefühl: Schreibe den Namen des Gefühls darunter und male das Monster passend an!'),
    bullet('Monster 1: froh'),
    bullet('Monster 2: wütend'),
    bullet('Monster 3: ängstlich'),
    bullet('Monster 4: dein Lieblingsge fühl'),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Gefühle'),
    bullet('Bild 1: traurig / wütend — Er ist traurig/wütend, weil sein Buch zerrissen ist.'),
    bullet('Bild 2: stolz / froh — Sie ist stolz/froh, weil sie eine Medaille gewonnen hat.'),
    bullet('Bild 3: ängstlich — Es hat Angst vor dem Gewitter.'),
    pItalic('Andere passende Gefühle und Begründungen akzeptieren.'),
    empty(),
    h2('Aufgabe 2: Diagramm'),
    bullet('1. froh / aufgeregt (12 Schüler, 43%)'),
    bullet('2. 5 Schüler'),
    bullet('3. 7 + 2 + 2 = 11 Schüler'),
    bullet('4. Beispiel: Die meisten Schüler in Klasse 4b fühlen sich heute froh oder aufgeregt.'),
    empty(),
    h2('Aufgabe 3: Postkarte'),
    pItalic('Individuelle Antworten. Prüfen: Ich bin/fühle mich + Adjektiv + weil + Verb am Ende.'),
    empty(),
    h2('Aufgabe 4: Gefühlsmonster'),
    pItalic('Kreative Aufgabe — keine Musterlösung. Auf passende Farben/Mimik achten und loben.'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
