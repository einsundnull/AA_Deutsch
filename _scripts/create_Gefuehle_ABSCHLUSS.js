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

const TOPIC_LABEL = 'A2 Kinder — Gefühle — ABSCHLUSS';
const TOPIC       = 'A2_Kinder_Gefuehle_ABSCHLUSS';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '10_Gefuehle', 'ABSCHLUSS'
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
  console.log('Erstelle ABSCHLUSS: Gefühle');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Abschlussübung — Thema 10: Gefühle'),
    pItalic('Diese Aufgaben üben alles aus Thema 10: Gefühle ausdrücken.'),
    empty(),

    // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
    h2('Aufgabe 1: Lesetext — Tausend Gefühle an einem Tag'),
    pItalic('Lies den Text genau.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Tausend Gefühle an einem Tag', bold: true, size: 28, font: 'Arial', color: '1F4E79' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Hast du gewusst, dass Menschen manchmal viele verschiedene Gefühle an einem einzigen Tag haben? Elias (12 Jahre) beschreibt seinen gestrigen Tag:', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: '„Am Morgen war ich sehr müde, weil ich bis spät gelesen hatte. Dann kam die Nachricht: Meine Mannschaft hat das Halbfinale gewonnen! Ich war sofort aufgeregt und froh. Aber dann — im Unterricht — hat der Lehrer unsere Prüfungen zurückgegeben. Ich hatte eine schlechte Note. Ich war so wütend auf mich selbst, weil ich dachte, ich hatte gut gelernt."', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: '„In der Pause hat mir meine Freundin Nora gesagt, dass sie umzieht. Ich wurde sofort traurig — Nora ist meine beste Freundin seit drei Jahren. Ich habe auch ein bisschen Angst davor, allein zu sein."', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: '„Am Nachmittag habe ich mit Papa gesprochen. Er hat mir geholfen zu verstehen: Gefühle kommen und gehen. Es ist normal, manchmal gleichzeitig froh und traurig zu sein. Am Abend war ich erschöpft, aber auch ein bisschen stolz — ich hatte einen schweren Tag gut gemeistert."', size: 26, font: 'Arial' })], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    // ── Aufgabe 1a: R/F ───────────────────────────────────────────────────────
    pBold('a) Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Elias war morgens müde, weil er bis spät gelesen hatte.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Seine Mannschaft hat das Finale verloren.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Elias war wütend auf seinen Lehrer.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Nora ist seit drei Jahren seine beste Freundin.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Vater hilft Elias, seine Gefühle zu verstehen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Am Abend fühlt sich Elias nur traurig.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    // ── Aufgabe 1b: Fragen ────────────────────────────────────────────────────
    pBold('b) Beantworte die Fragen.'),
    p('1. Warum war Elias morgens müde?'),
    writeLine(), writeLine(),
    p('2. Welche zwei Gefühle hatte Elias, als er von der Prüfungsnote hörte?'),
    writeLine(), writeLine(),
    p('3. Was hat der Vater Elias erklärt?'),
    writeLine(), writeLine(),
    empty(),

    // ── Aufgabe 2: Lückentext ─────────────────────────────────────────────────
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2: Lückentext — Gefühle beschreiben'),
    pItalic('Wörterkasten: stolz • nervös • Angst • fühle • wütend • traurig • aufgeregt • überrascht • froh • weil • müde • besser'),
    empty(),
    p('1. Ich bin so ______________, weil ich heute endlich meinen Freund besuche!'),
    p('2. Das war eine schwere Prüfung. Jetzt bin ich total ______________.'),
    p('3. Ich ______________ mich nicht wohl — ich glaube, ich bin krank.'),
    p('4. Ben hat das Ziel erreicht! Er ist sehr ______________ auf sich.'),
    p('5. Mia hat Geburtstag und weiß es noch nicht — alle sind gespannt, sie zu ______________.'),
    p('6. Ich habe ______________ vor dem Zahnarzt, ______________ er mir wehtut.'),
    p('7. Vor dem Theaterstück bin ich immer sehr ______________.'),
    p('8. Mein Lieblingsfilm ist heute nicht im Kino. Ich bin so ______________ darüber.'),
    p('9. Nach dem langen Schulweg ist Luisa sehr ______________ und möchte schlafen.'),
    p('10. Iss etwas — dann geht es dir ______________.'),
    empty(),

    // ── Aufgabe 3: Grammatik ──────────────────────────────────────────────────
    h2('Aufgabe 3: Gefühle — richtige Struktur wählen.'),
    pItalic('Unterstreiche die richtige Form. (Achtung: Angst haben vor + Dativ!)'),
    empty(),
    p('1. Ich bin   /   Ich habe   Angst vor dem Hund.'),
    p('2. Er fühlt sich   /   Er ist fühlt   heute sehr gut.'),
    p('3. Sie ist stolz auf   /   Sie ist stolz für   ihre Schwester.'),
    p('4. Ich bin wütend,   /   Ich bin wütend weil,   weil du das nicht sagst.'),
    p('5. Wir sind aufgeregt,   weil wir morgen   fahren / fahrt   in den Urlaub.'),
    empty(),

    // ── Aufgabe 4: Schreiben ──────────────────────────────────────────────────
    h2('Aufgabe 4: Mein Gefühlstagebuch'),
    pItalic('Schreibe einen Eintrag in dein Gefühlstagebuch. Beschreibe einen Tag, an dem du verschiedene Gefühle hattest.'),
    pItalic('Schreibe 7–8 Sätze. Benutze mindestens 4 verschiedene Gefühle und erkläre jeweils warum.'),
    pItalic('Tipp: Morgens ... / In der Schule ... / In der Pause ... / Nachmittags ... / Abends ...'),
    ...writeLines(9),
    empty(),

    // ── Aufgabe 5: Konversation ───────────────────────────────────────────────
    h2('Aufgabe 5: Dialog — Gefühle teilen'),
    pItalic('Ergänze den Dialog und übt ihn zu zweit. Dann tauscht die Rollen.'),
    empty(),
    p('A: Du siehst heute irgendwie __________________ aus. Alles okay?'),
    p('B: Ehrlich gesagt, ich fühle mich etwas __________________. Ich habe __________________,'),
    p('   weil __________________________________.'),
    p('A: Oh, das verstehe ich. Ich war auch mal __________________, als __________________.'),
    p('B: Wirklich? Wie bist du damit umgegangen?'),
    p('A: Ich habe __________________ und dann wurde es langsam __________________. '),
    p('B: Das ist eine gute Idee. Danke, jetzt fühle ich mich schon etwas __________________.'),
    p('A: Wenn du reden möchtest, bin ich immer da!'),
    empty(),

    // ── Aufgabe 6: Selbstevaluation ───────────────────────────────────────────
    h2('Aufgabe 6: Selbstevaluation — Was kann ich?'),
    pItalic('Kreuze an: ☑ Das kann ich gut    ☐ Das übe ich noch'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Lernziel', CONTENT * 3/4), hCell('☑ / ☐', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann mindestens 8 Gefühle auf Deutsch nennen.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann sagen, wie ich mich fühle: Ich bin ... / Ich fühle mich ...', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann Angst haben vor + Dativ korrekt verwenden.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann Ich bin stolz auf + Akkusativ korrekt verwenden.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann weil-Sätze bilden (Verb am Ende).', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann jemanden fragen, wie es ihm/ihr geht, und antworten.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
      ]
    }),
  ], `${TOPIC}.docx`);

  // ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Abschlussübung Thema 10: Gefühle'),

    h2('Aufgabe 1a: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Elias war morgens müde, weil er bis spät gelesen hatte.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Seine Mannschaft hat das Finale verloren.', CONTENT * 4/5), dCell('F (Halbfinale gewonnen)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Elias war wütend auf seinen Lehrer.', CONTENT * 4/5), dCell('F (auf sich selbst)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Nora ist seit drei Jahren seine beste Freundin.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Vater hilft Elias, seine Gefühle zu verstehen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Am Abend fühlt sich Elias nur traurig.', CONTENT * 4/5), dCell('F (erschöpft aber stolz)', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 1b: Fragen'),
    bullet('1. Weil er bis spät gelesen hatte.'),
    bullet('2. Bei der Prüfungsnote: wütend (auf sich selbst). Zuvor beim Halbfinale: aufgeregt und froh.'),
    bullet('3. Dass Gefühle kommen und gehen, und dass es normal ist, manchmal gleichzeitig froh und traurig zu sein.'),
    empty(),

    h2('Aufgabe 2: Lückentext'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nr.', CONTENT / 8), hCell('Lösung', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('1', CONTENT / 8), dCell('aufgeregt / froh', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('2', CONTENT / 8), dCell('müde', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('3', CONTENT / 8), dCell('fühle', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('4', CONTENT / 8), dCell('stolz', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('5', CONTENT / 8), dCell('überraschen / überrascht', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('6', CONTENT / 8), dCell('Angst / weil', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('7', CONTENT / 8), dCell('nervös', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('8', CONTENT / 8), dCell('wütend / traurig', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('9', CONTENT / 8), dCell('müde', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('10', CONTENT / 8), dCell('besser', CONTENT * 7/8)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 3: Richtige Struktur'),
    bullet('1. Ich habe Angst vor dem Hund.'),
    bullet('2. Er fühlt sich heute sehr gut.'),
    bullet('3. Sie ist stolz auf ihre Schwester.'),
    bullet('4. Ich bin wütend, weil du das nicht sagst.'),
    bullet('5. Wir sind aufgeregt, weil wir morgen in den Urlaub fahren.'),
    empty(),

    h2('Aufgabe 4: Gefühlstagebuch'),
    pItalic('Individuelle Antworten akzeptieren. Prüfen:'),
    bullet('Mindestens 4 Gefühle korrekt eingesetzt'),
    bullet('Adjektive nach sein/fühlen korrekt (Ich bin müde. / Ich fühle mich nervös.)'),
    bullet('weil-Sätze: Verb am Ende'),
    bullet('Angst vor + Dativ / stolz auf + Akkusativ wenn verwendet'),
    empty(),

    h2('Aufgabe 5: Dialog'),
    pItalic('Individuelle Antworten. Bewertungskriterien:'),
    bullet('Gefühlsadjektiv passend zur Situation'),
    bullet('Angst haben + weil korrekt'),
    bullet('Empathische Reaktion formuliert'),
    bullet('Verb im weil-Satz am Ende'),
    pItalic('Kreative und persönliche Antworten ausdrücklich loben.'),
    empty(),

    h2('Aufgabe 6: Selbstevaluation'),
    pItalic('Individuelle Selbsteinschätzung. Im Unterrichtsgespräch nachfragen und vertiefen.'),
  ], `${TOPIC}_LOESUNG.docx`);

  console.log('\nFertig! 2 Dateien erstellt.');
})();
