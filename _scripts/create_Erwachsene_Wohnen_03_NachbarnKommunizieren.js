'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Wohnen_03_NachbarnKommunizieren';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '02_Wohnen', '03_NachbarnKommunizieren');
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '•',
      alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360, hanging: 360 } } }
    }]
  }]
};

const makeHeader = () => new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: 'A2 Erwachsene — Wohnen & Einrichten — Mit Nachbarn kommunizieren', italics: true, size: 18, color: '888888', font: 'Arial' })]
  })]
});

const makeFooter = () => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' }),
    ]
  })]
});

const pageProps = {
  page: {
    size: { width: PAGE_W, height: PAGE_H },
    margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
  }
};

const schuelerKopf = () => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ___________________________', font: 'Arial', size: 24 })] })] }),
    new TableCell({ width: { size: 4772, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ___________________________', font: 'Arial', size: 24 })] })] }),
  ]})]
});

const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, bold: true, size: 36, color: '1F4E79', font: 'Arial' })] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, bold: true, size: 28, color: '1F4E79', font: 'Arial' })] });
const p = (text, opts = {}) => new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 24, ...opts })] });
const leer = () => new Paragraph({ children: [new TextRun({ text: '', font: 'Arial', size: 24 })] });
const linie = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});
const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullet-list', level: 0 },
  children: [new TextRun({ text, font: 'Arial', size: 24 })]
});

const infoBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: '388E3C' },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: '388E3C' },
      left: { style: BorderStyle.SINGLE, size: 6, color: '388E3C' },
      right: { style: BorderStyle.SINGLE, size: 6, color: '388E3C' }
    },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, font: 'Arial', size: 22 })] }))
  })]})],
});

const grammarBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: 'E65100' },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: 'E65100' },
      left: { style: BorderStyle.SINGLE, size: 6, color: 'E65100' },
      right: { style: BorderStyle.SINGLE, size: 6, color: 'E65100' }
    },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, font: 'Arial', size: 22 })] }))
  })]})],
});

const zettelBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: 'F9A825' },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: 'F9A825' },
      left: { style: BorderStyle.SINGLE, size: 8, color: 'F9A825' },
      right: { style: BorderStyle.SINGLE, size: 8, color: 'F9A825' }
    },
    children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, font: 'Arial', size: 22 })] }))
  })]})],
});

const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{ headers: { default: makeHeader() }, footers: { default: makeFooter() }, properties: pageProps, children }]
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), buf);
  console.log('OK ', filename);
};

// ==================== SCHREIBEN ====================
const createSchreiben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Phrasen für die Nachbarschaftskommunikation:',
      'Guten Tag! / Guten Morgen! / Hallo! (informell)     Entschuldigung, darf ich kurz stören?',
      'Könnten Sie bitte …? / Würden Sie bitte …?     Ich wäre Ihnen sehr dankbar, wenn …',
      'Es tut mir leid, aber …     Das stört mich leider ein bisschen.',
      'Vielen Dank für Ihr Verständnis!     Mit freundlichen Grüßen, [Name], Wohnung [Nr.]',
    ]),
    leer(),
    h2('Aufgabe 1: Einen Zettel schreiben — Lärm'),
    p('Dein Nachbar aus Wohnung 14 macht oft laute Musik nach 22 Uhr. Du schläfst schlecht.'),
    p('Schreibe einen höflichen Zettel für den Briefkasten. Erwähne: Problem, Uhrzeit, Bitte, Dank.'),
    leer(),
    zettelBox([
      'Liebe/r Nachbar/in aus Wohnung 14,',
      '',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '',
      'Vielen Dank für Ihr Verständnis!',
      'Mit freundlichen Grüßen,',
      '_______________________,  Wohnung ___',
    ]),
    leer(),
    h2('Aufgabe 2: Eine Bitte schreiben — Paket'),
    p('Du erwartest ein Paket, bist aber den ganzen Tag nicht zu Hause. Schreibe deiner Nachbarin aus Wohnung 8 einen Zettel. Bitte sie, das Paket anzunehmen und für dich aufzubewahren.'),
    leer(),
    zettelBox([
      'Liebe Frau / Lieber Herr ___________________,',
      '',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '',
      'Herzlichen Dank!',
      'Viele Grüße,',
      '_______________________,  Wohnung ___',
    ]),
    leer(),
    h2('Aufgabe 3: Eine Antwort schreiben'),
    p('Deine Nachbarin hat dir geschrieben: „Deine Musik war gestern Abend sehr laut. Bitte achte darauf."'),
    p('Schreibe eine höfliche Antwort. Entschuldige dich und versprich Besserung.'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Freies Schreiben — Meine Nachbarn'),
    p('Schreibe 4–5 Sätze über deine Nachbarn (real oder erfunden). Sind sie nett? Gibt es Probleme? Was machst du, wenn es ein Problem gibt?'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Mit Nachbarn kommunizieren'),
    leer(),
    h2('Aufgabe 1: Zettel — Lärm (Musterlösung)'),
    zettelBox([
      'Liebe/r Nachbar/in aus Wohnung 14,',
      '',
      'ich wohne in Wohnung [Nr.] und schreibe Ihnen wegen der Musik.',
      'Leider höre ich oft nach 22 Uhr laute Musik aus Ihrer Wohnung.',
      'Ich muss früh aufstehen und schlafe deshalb sehr schlecht.',
      'Könnten Sie die Musik bitte nach 22 Uhr leiser stellen?',
      '',
      'Vielen Dank für Ihr Verständnis!',
      'Mit freundlichen Grüßen,',
      '[Name], Wohnung [Nr.]',
    ]),
    leer(),
    p('→ Bewerten: Höfliche Anrede, konkretes Problem, klare Bitte, formeller Abschluss.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Zettel — Paket (Musterlösung)'),
    zettelBox([
      'Liebe Frau / Lieber Herr [Nachname],',
      '',
      'ich erwarte heute ein Paket, bin aber leider den ganzen Tag nicht zu Hause.',
      'Dürfte ich Sie bitten, das Paket für mich anzunehmen?',
      'Ich hole es heute Abend gegen 19 Uhr bei Ihnen ab.',
      '',
      'Herzlichen Dank!',
      'Viele Grüße,',
      '[Name], Wohnung [Nr.]',
    ]),
    leer(),
    h2('Aufgabe 3: Antwort — Musterlösung'),
    p('Liebe Nachbarin,'),
    p('vielen Dank für Ihre Nachricht. Es tut mir wirklich leid — die Musik war zu laut.'),
    p('Ich werde in Zukunft besser darauf achten. Das wird nicht wieder passieren.'),
    p('Mit freundlichen Grüßen, [Name]'),
    leer(),
    h2('Aufgabe 4: Meine Nachbarn'),
    p('→ Individuelle Antworten. Auf korrekte Verwendung von höflich/formell und Zeitformen achten.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Leseübung'),
    leer(),
    h2('Lesetext: „Neue Nachbarn"'),
    leer(),
    p('Fatou Diallo kommt aus Senegal und wohnt seit einem Jahr in Hamburg. Sie hat gute Nachbarn — das ist ihr sehr wichtig. Aber am Anfang war es nicht einfach.'),
    leer(),
    p('Als Fatou eingezogen ist, hat sie einen Zettel in alle Briefkästen gelegt: „Hallo! Ich bin Fatou, Ihre neue Nachbarin in Wohnung 12. Ich freue mich auf eine nette Nachbarschaft! Ich bin Krankenpflegerin und arbeite manchmal Nachtschicht. Wenn ich schlafe, bitte ich um Ruhe — danke!"'),
    leer(),
    p('Ihr Nachbar Herr Vogel aus Wohnung 11 hat sofort geantwortet: „Herzlich willkommen! Wenn Sie etwas brauchen, klingeln Sie einfach." Seitdem grüßen sie sich jeden Tag im Treppenhaus.'),
    leer(),
    p('Einmal gab es ein Problem: Die Musik aus Wohnung 13 war sehr laut — um 23 Uhr. Fatou war müde nach der Nachtschicht. Sie hat einen höflichen Zettel geschrieben: „Könnten Sie die Musik bitte leiser stellen? Ich arbeite früh morgens." Die Nachbarin aus Wohnung 13 hat sich entschuldigt und die Musik sofort leiser gestellt.'),
    leer(),
    p('Fatou sagt: „In Deutschland gibt es klare Regeln: Ruhezeit ist von 22 bis 7 Uhr. Das ist manchmal ungewohnt für mich. Aber ich finde es gut — so gibt es weniger Konflikte."'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Fatou wohnt seit zwei Jahren in Hamburg.  ___'),
    p('2. Sie hat beim Einzug Zettel in die Briefkästen gelegt.  ___'),
    p('3. Herr Vogel wohnt in Wohnung 13.  ___'),
    p('4. Das Problem mit der Musik war um 23 Uhr.  ___'),
    p('5. Fatou hat die Nachbarin direkt angerufen.  ___'),
    p('6. Die Ruhezeit in Deutschland beginnt um 22 Uhr.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Was steht in Fatous Zettel beim Einzug?'),
    linie(), leer(),
    p('2. Was sagt Herr Vogel zu Fatou?'),
    linie(), leer(),
    p('3. Warum war die Musik ein Problem für Fatou?'),
    linie(), leer(),
    p('4. Was denkt Fatou über die deutschen Regeln?'),
    linie(), linie(), leer(),
    h2('Aufgabe 3: Wie schreibt man das höflich? Verbinde.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Direkt (unhöflich)', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 5272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Höflich', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Mach die Musik leiser!', '___________________________'],
          ['Sei ruhig!', '___________________________'],
          ['Das stört mich!', '___________________________'],
          ['Ich will schlafen!', '___________________________'],
        ].map(([d, h]) => new TableRow({ children: [
          new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: d, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 5272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: h, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Deine Erfahrung'),
    p('Hast du schon einmal ein Problem mit Nachbarn gehabt? Oder eine nette Nachbarschaftserfahrung? Erzähle in 3–4 Sätzen.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Mit Nachbarn kommunizieren'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. F — Fatou wohnt seit einem Jahr in Hamburg.'),
    p('2. R — Sie hat beim Einzug Zettel in die Briefkästen gelegt.'),
    p('3. F — Herr Vogel wohnt in Wohnung 11.'),
    p('4. R — Das Problem mit der Musik war um 23 Uhr.'),
    p('5. F — Fatou hat einen höflichen Zettel geschrieben (nicht angerufen).'),
    p('6. R — Die Ruhezeit beginnt um 22 Uhr.'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Fatou stellt sich vor, nennt ihre Wohnungsnummer und bittet um Ruhe, weil sie Nachtschicht arbeitet.'),
    p('2. Herr Vogel sagt: „Herzlich willkommen! Wenn Sie etwas brauchen, klingeln Sie einfach."'),
    p('3. Weil Fatou Nachtschicht arbeitet und früh morgens arbeiten musste — sie war müde.'),
    p('4. Sie findet die klaren Regeln gut, weil es weniger Konflikte gibt (auch wenn es ungewohnt ist).'),
    leer(),
    h2('Aufgabe 3: Höfliche Formulierungen (Beispiele)'),
    p('Mach die Musik leiser! → Könnten Sie die Musik bitte leiser stellen?'),
    p('Sei ruhig! → Würden Sie bitte etwas leiser sein?'),
    p('Das stört mich! → Das stört mich leider ein bisschen.'),
    p('Ich will schlafen! → Ich muss leider früh aufstehen.'),
    leer(),
    p('→ Individuelle höfliche Formulierungen akzeptieren. Könnten/Würden Sie … bitte …? als Mustermuster.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Lesen_LOESUNG.docx`);
};

// ==================== LÜCKEN ====================
const createLuecken = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Könnten | Würden | darf | entschuldigen | Verständnis | Briefkasten | Treppenhaus | Hausordnung',
      'Ruhezeit | Lärm | Zettel | klingeln | stören | höflich | Nachbar | beschweren',
    ]),
    leer(),
    h2('Aufgabe 1: Im Treppenhaus — Gespräch'),
    p('Ergänze die fehlenden Wörter aus dem Wörterkasten.'),
    leer(),
    p('Frau Meier trifft ihren _____________ Herrn Koch im _____________.'),
    leer(),
    p('Frau Meier:  „Guten Morgen, Herr Koch! _____________ ich Sie kurz ansprechen?"'),
    leer(),
    p('Herr Koch:  „Natürlich! Was kann ich für Sie tun?"'),
    leer(),
    p('Frau Meier:  „Es geht um den _____________ gestern Abend. Die Musik war sehr laut."'),
    leer(),
    p('Herr Koch:  „Oh, das tut mir leid! Ich hatte Besuch. Ich werde mich beim nächsten Mal besser daran _____________."  (halten / erinnern → Lücke: erinnern)'),
    leer(),
    p('Frau Meier:  „Danke! Ich weiß, dass es manchmal schwer ist. Ich wollte nur kurz _____________, dass es mich _____________ hat."'),
    leer(),
    p('Herr Koch:  „Danke für Ihr _____________! Guten Morgen!"'),
    leer(),
    h2('Aufgabe 2: Sätze mit Könnten/Würden Sie bitte …?'),
    p('Forme die Sätze höflich um. Benutze: Könnten Sie bitte … / Würden Sie bitte …'),
    leer(),
    p('1. Mach die Tür leiser zu!'),
    p('→ _______________________________________________'),
    leer(),
    p('2. Park dein Fahrrad nicht im Treppenhaus!'),
    p('→ _______________________________________________'),
    leer(),
    p('3. Nimm den Müll mit runter!'),
    p('→ _______________________________________________'),
    leer(),
    p('4. Sei nach 22 Uhr ruhig!'),
    p('→ _______________________________________________'),
    leer(),
    h2('Aufgabe 3: Die Hausordnung — Lückentext'),
    p('Ergänze den Text mit den Wörtern aus dem Wörterkasten.'),
    leer(),
    p('In unserem Haus gibt es eine _____________. Sie regelt das Zusammenleben im Haus. Die _____________ ist von 22:00 bis 07:00 Uhr und am Wochenende von 13:00 bis 15:00 Uhr. In dieser Zeit ist _____________ verboten. Bitte benutzt das _____________ auch für Informationen — dort hängen wichtige Aushänge. Wenn es ein Problem gibt, könnt ihr bei der Hausverwaltung _____________.'),
    leer(),
    h2('Aufgabe 4: Zettel ergänzen'),
    p('Ergänze den Zettel mit passenden Wörtern oder Phrasen.'),
    leer(),
    zettelBox([
      'Liebe Nachbarinnen und Nachbarn,',
      '',
      'am kommenden Samstag feiere ich meinen Geburtstag.',
      'Die Feier beginnt um 18 Uhr und endet _____________ 22 Uhr.',
      'Ich bitte um _____________ für ein bisschen mehr Lärm.',
      '_____________ Sie bitte, falls es zu laut wird.',
      'Ich freue mich auf eine gute _____________!',
      '',
      'Mit freundlichen _____________,',
      'Lisa Hoffmann, Wohnung 5',
    ]),
    leer(),
    p('Mögliche Wörter: Klingeln / Nachbarschaft / Verständnis / Grüßen / spätestens'),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Mit Nachbarn kommunizieren'),
    leer(),
    h2('Aufgabe 1: Gespräch im Treppenhaus'),
    p('Nachbar | Treppenhaus | Darf | Lärm | erinnern | sagen/erwähnen | gestört/störe | Verständnis'),
    leer(),
    p('Vollständiger Text:'),
    p('Frau Meier trifft ihren Nachbar Herrn Koch im Treppenhaus.'),
    p('„Guten Morgen, Herr Koch! Darf ich Sie kurz ansprechen?"'),
    p('„Natürlich! Was kann ich für Sie tun?"'),
    p('„Es geht um den Lärm gestern Abend. Die Musik war sehr laut."'),
    p('„Oh, das tut mir leid! Ich werde mich beim nächsten Mal besser daran erinnern."'),
    p('„Danke! Ich wollte nur kurz sagen, dass es mich gestört hat."'),
    p('„Danke für Ihr Verständnis! Guten Morgen!"'),
    leer(),
    h2('Aufgabe 2: Könnten/Würden Sie bitte …?'),
    p('1. Könnten Sie bitte die Tür leiser zumachen?'),
    p('2. Würden Sie bitte Ihr Fahrrad nicht im Treppenhaus parken?'),
    p('3. Könnten Sie bitte den Müll mit runterbringen?'),
    p('4. Würden Sie bitte nach 22 Uhr ruhig sein?'),
    leer(),
    grammarBox([
      'Grammatik: Höfliche Bitten mit Konjunktiv II',
      'Könnten Sie bitte …?   (von: können → er könnte)',
      'Würden Sie bitte …?   (von: werden → er würde)',
      'Wären Sie so freundlich …?   (gehoben / sehr formell)',
      '',
      'Diese Formen wirken höflicher als der Imperativ!',
    ]),
    leer(),
    h2('Aufgabe 3: Hausordnung'),
    p('Hausordnung | Ruhezeit | Lärm | Treppenhaus | beschweren'),
    leer(),
    h2('Aufgabe 4: Zettel'),
    p('… endet spätestens 22 Uhr.'),
    p('Ich bitte um Verständnis für …'),
    p('Klingeln Sie bitte, falls …'),
    p('… eine gute Nachbarschaft!'),
    p('Mit freundlichen Grüßen,'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const vokabDaten = [
    ['der Nachbar, -n / die Nachbarin, -nen', 'Nomen', 'Mein Nachbar ist sehr nett.'],
    ['die Hausordnung, -en', 'Nomen', 'Die Hausordnung hängt im Treppenhaus.'],
    ['das Treppenhaus, -häuser', 'Nomen', 'Wir treffen uns oft im Treppenhaus.'],
    ['der Briefkasten, Briefkästen', 'Nomen', 'Ich lege den Zettel in den Briefkasten.'],
    ['der Lärm (nur Sg.)', 'Nomen', 'Der Lärm aus Wohnung 5 stört mich.'],
    ['die Ruhezeit, -en', 'Nomen', 'Die Ruhezeit beginnt um 22 Uhr.'],
    ['der Zettel, -', 'Nomen', 'Ich schreibe einen Zettel an die Nachbarin.'],
    ['die Klingel, -n', 'Nomen', 'Bitte klingel, wenn du ankommst.'],
    ['sich beschweren über + Akk.', 'Verb (refl.)', 'Ich beschwere mich über den Lärm.'],
    ['stören', 'Verb', 'Die laute Musik stört mich sehr.'],
    ['sich entschuldigen', 'Verb (refl.)', 'Er entschuldigt sich für den Lärm.'],
    ['klingeln', 'Verb', 'Könnten Sie bitte leiser klingeln?'],
  ];

  const redePhrasen = [
    ['Könnten Sie bitte …?', 'höfliche Bitte', 'Könnten Sie bitte leiser sein?'],
    ['Würden Sie bitte …?', 'höfliche Bitte', 'Würden Sie bitte die Musik leiser stellen?'],
    ['Es tut mir leid.', 'Entschuldigung', 'Es tut mir leid wegen des Lärms.'],
    ['Ich wäre Ihnen dankbar, wenn …', 'formelle Bitte', '… wenn Sie etwas leiser wären.'],
    ['Vielen Dank für Ihr Verständnis!', 'Abschluss Zettel', 'Immer am Ende eines Briefes/Zettels.'],
    ['Mit freundlichen Grüßen,', 'Abschluss formell', 'Mit freundlichen Grüßen, [Name]'],
  ];

  const makeTable = (rows) => new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wort / Phrase', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Typ', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 4272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispielsatz / Hinweis', bold: true, font: 'Arial', size: 22 })] })] }),
      ]}),
      ...rows.map(([wort, typ, bsp]) => new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: wort, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: typ, font: 'Arial', size: 22, color: '555555' })] })] }),
        new TableCell({ width: { size: 4272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: bsp, font: 'Arial', size: 22 })] })] }),
      ]})),
    ]
  });

  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Wortliste'),
    leer(),
    h2('Teil 1: Wichtiges Vokabular'),
    makeTable(vokabDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...vokabDaten.slice(0, 8).map(([wort]) => new Paragraph({
      children: [
        new TextRun({ text: `${wort.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Redemittel — Höfliche Kommunikation'),
    makeTable(redePhrasen),
    leer(),
    grammarBox([
      'Formell vs. Informell:',
      'Formell (Sie-Form) → Nachbarn, die man nicht kennt, ältere Nachbarn, Vermieter',
      'Informell (du-Form) → gute Bekannte, Freunde im selben Haus',
      '',
      'Im Zettel/Brief: immer Sie-Form, auch wenn man sich kennt!',
      'Im Gespräch: je nach Beziehung — fragen, was bevorzugt wird.',
    ]),
    leer(),
    p('Tipp: Schreibe die Redemittel auf Karteikarten und übe sie laut!', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Mit Nachbarn kommunizieren'),
    leer(),
    p('Die Wortliste enthält Übersetzungszeilen für individuelle Sprachen.', { color: '388E3C', italics: true }),
    p('→ Individuelle Einträge der Lernenden akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Zusatz: Aufbau eines Nachbarschaftszettels'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Teil', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 7272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispiel', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Anrede', 'Liebe/r Nachbar/in, / Liebe/r Frau/Herr [Name],'],
          ['Problem / Bitte benennen', 'Ich möchte Sie auf … aufmerksam machen. / Ich bitte Sie, …'],
          ['Höfliche Bitte', 'Könnten Sie bitte …? / Würden Sie bitte …?'],
          ['Dank', 'Vielen Dank für Ihr Verständnis!'],
          ['Abschluss', 'Mit freundlichen Grüßen, [Name], Wohnung [Nr.]'],
        ].map(([t, b]) => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 7272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
  ];
  await save(children, `${TOPIC}_Wortliste_LOESUNG.docx`);
};

// ==================== KONVERSATION ====================
const createKonversation = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Konversation'),
    leer(),
    h2('Aufgabe 1: Im Treppenhaus — kleines Gespräch'),
    p('Ihr seid Nachbarn und trefft euch zufällig im Treppenhaus. Ergänzt den Dialog und übt ihn.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['A:', 'Guten _____________! Wie geht es Ihnen?'],
          ['B:', 'Danke, gut! Und Ihnen?'],
          ['A:', 'Auch gut, danke. Ich wollte Sie übrigens etwas fragen — darf ich Sie kurz _____________?'],
          ['B:', 'Natürlich, was ist los?'],
          ['A:', 'Gestern Nacht hat es sehr laut bei Ihnen _____________.'],
          ['B:', 'Oh, das tut mir leid! Ich hatte Besuch und wir haben vergessen, auf die _____________ zu achten.'],
          ['A:', 'Kein Problem — ich wollte es nur kurz _____________. Danke für Ihr Verständnis!'],
          ['B:', 'Selbstverständlich! Das wird nicht wieder _____________. Auf Wiedersehen!'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen und spielt die Situation noch einmal durch.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Rollenspiel — Problem ansprechen'),
    p('Person A hat ein Problem mit Person B (Nachbar). Spielt die Situation. Dann tauscht.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person A — Karte', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du bist Nachbar/in A.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Problem: Musik aus Wohnung B, 23 Uhr, gestern', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du: arbeitest früh, brauchst Schlaf', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '→ Sprich das Problem höflich an.', font: 'Arial', size: 22, italics: true })] }),
          ]}),
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person B — Karte', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du bist Nachbar/in B.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du hattest gestern Besuch.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du wusstest nicht, wie spät es war.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '→ Entschuldige dich und versprich Besserung.', font: 'Arial', size: 22, italics: true })] }),
          ]}),
        ]}),
      ]
    }),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Nachbarschaft'),
    p('Frag deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    leer(),
    p('1. Kennst du deine Nachbarn? Grüßt ihr euch?'),
    linie(), leer(),
    p('2. Gab es schon einmal Probleme mit Nachbarn? Was war das Problem?'),
    linie(), leer(),
    p('3. Wie würdest du auf einen zu lauten Nachbarn reagieren — Zettel, Gespräch oder nichts?'),
    linie(), leer(),
    p('4. Was sind typische Nachbarschaftsprobleme in deinem Heimatland?'),
    linie(), leer(),
    p('5. Was macht einen guten Nachbarn aus?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenübung — Der ideale Nachbar'),
    p('Diskutiert in der Gruppe: Was macht einen idealen Nachbarn aus? Sammelt Ideen und stellt sie vor.'),
    p('Benutzt: Ein guter Nachbar … | Er/Sie sollte … | Wichtig ist, dass …'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Mit Nachbarn kommunizieren'),
    leer(),
    h2('Aufgabe 1: Dialog im Treppenhaus — Lösungen'),
    p('A: „Guten Morgen / Tag! …"'),
    p('A: „… darf ich Sie kurz ansprechen/stören?"'),
    p('A: „… hat es sehr laut bei Ihnen geknallt / war es sehr laut."'),
    p('B: „… auf die Uhrzeit / Ruhezeit zu achten."'),
    p('A: „… erwähnen / sagen."'),
    p('B: „Das wird nicht wieder passieren / vorkommen."'),
    leer(),
    p('→ Auf höfliche Sie-Form achten. Konjunktiv II (dürfte ich, würden Sie) als Bonusform akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Rollenspiel — Bewertungskriterien'),
    bullet('Person A: Problem klar und höflich benennen (nicht anklagend)'),
    bullet('Person A: Bitte mit Könnten Sie …? / Würden Sie …? formulieren'),
    bullet('Person B: Sich entschuldigen: Es tut mir leid. / Das tut mir wirklich leid.'),
    bullet('Person B: Besserung versprechen: Das wird nicht wieder passieren.'),
    bullet('Beide: korrekte Sie-Form durchhalten'),
    leer(),
    h2('Aufgabe 3: Partnerinterview'),
    p('→ Individuelle Antworten. Auf Sprachfluss und korrekte Zeitformen achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 4: Idealer Nachbar — Beispielantworten'),
    bullet('Ein guter Nachbar grüßt und ist freundlich.'),
    bullet('Er/Sie hält die Ruhezeit ein.'),
    bullet('Er/Sie hilft, wenn man Hilfe braucht.'),
    bullet('Wichtig ist, dass man Probleme höflich anspricht.'),
    bullet('Ein guter Nachbar respektiert die Privatsphäre der anderen.'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Mit Nachbarn kommunizieren — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Was passiert hier? Beschreibe die Situation.'),
    p('[BILD 1: Zwei Nachbarn stehen im Treppenhaus. Eine Person hält einen Zettel in der Hand. Die andere Person sieht überrascht aus.]'),
    leer(),
    p('Was sagen die beiden Personen wahrscheinlich? Schreibe einen kurzen Dialog (4–6 Zeilen).'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    h2('Aufgabe 2: Zettel lesen und reagieren'),
    p('[BILD 2: Ein handgeschriebener Zettel an einer Tür: „Liebe Nachbarn, bitte stellt eure Fahrräder nicht im Treppenhaus ab. Es versperrt den Weg. Danke! Hausverwaltung"]'),
    leer(),
    p('1. Was ist das Problem laut dem Zettel?'),
    linie(), leer(),
    p('2. Wer hat den Zettel geschrieben?'),
    linie(), leer(),
    p('3. Was sollen die Nachbarn tun?'),
    linie(), leer(),
    p('4. Schreibe eine Antwort auf diesen Zettel (als Nachbar/in, der sein Fahrrad oft dort abstellt).'),
    leer(),
    zettelBox([
      'Liebe Hausverwaltung,',
      '',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '',
      'Mit freundlichen Grüßen,',
      '_______________________,  Wohnung ___',
    ]),
    leer(),
    h2('Aufgabe 3: Situationen einschätzen'),
    p('[BILD 3: Vier kleine Bilder mit verschiedenen Nachbarschaftssituationen:'),
    p('  A) Lautsprecherbox mit Schallwellen nachts'),
    p('  B) Fahrrad steht im Treppenhaus'),
    p('  C) Nachbarin bringt Paket für den Nachbarn rein'),
    p('  D) Mann raucht auf dem Balkon, Rauch zieht in die Nachbarwohnung]'),
    leer(),
    p('Schreibe für jede Situation: Was ist das Problem? Wie würdest du reagieren?'),
    leer(),
    p('A: _______________________________________________'),
    leer(),
    p('B: _______________________________________________'),
    leer(),
    p('C: _______________________________________________'),
    leer(),
    p('D: _______________________________________________'),
    leer(),
    h2('Aufgabe 4: Einen eigenen Zettel gestalten'),
    p('[BILD 4: Leere Zettel-Vorlage mit Rahmen]'),
    leer(),
    p('Du machst nächsten Samstag eine kleine Party (bis 22 Uhr). Schreibe einen Zettel an alle Nachbarn im Haus. Informiere über die Party und bitte um Verständnis.'),
    leer(),
    zettelBox([
      'Liebe Nachbarinnen und Nachbarn,',
      '',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '',
      '_______________________________________________,',
      '_______________________,  Wohnung ___',
    ]),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Mit Nachbarn kommunizieren'),
    leer(),
    p('Hinweis: Die Antworten hängen von den eingefügten Bildern ab. Folgende Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Dialog — Musterlösung'),
    p('A: „Guten Tag! Entschuldigung — ich wollte Ihnen diesen Zettel geben."'),
    p('B: „Oh! Worum geht es denn?"'),
    p('A: „Die Musik war gestern Abend sehr laut. Könnten Sie bitte darauf achten?"'),
    p('B: „Ja, natürlich! Das tut mir leid. Das wird nicht wieder passieren."'),
    leer(),
    h2('Aufgabe 2: Zettel lesen'),
    p('1. Das Problem: Fahrräder stehen im Treppenhaus und versperren den Weg.'),
    p('2. Den Zettel hat die Hausverwaltung geschrieben.'),
    p('3. Die Nachbarn sollen ihre Fahrräder nicht im Treppenhaus abstellen.'),
    leer(),
    p('Antwort-Musterlösung:'),
    p('Liebe Hausverwaltung,'),
    p('vielen Dank für den Hinweis. Es tut mir leid — ich habe mein Fahrrad oft dort abgestellt.'),
    p('Ich werde in Zukunft einen anderen Platz suchen.'),
    p('Mit freundlichen Grüßen, [Name], Wohnung [Nr.]'),
    leer(),
    h2('Aufgabe 3: Situationen'),
    p('A: Lärm / Musik nachts → Zettel schreiben oder höflich ansprechen'),
    p('B: Fahrrad im Weg → Zettel oder direktes Gespräch'),
    p('C: Kein Problem — nette Geste! → Bedanken'),
    p('D: Rauch stört → Höflich ansprechen, auf Nichtraucherbereiche hinweisen'),
    leer(),
    h2('Aufgabe 4: Party-Zettel — Musterlösung'),
    p('Liebe Nachbarinnen und Nachbarn,'),
    p('am nächsten Samstag, dem [Datum], feiere ich meinen Geburtstag in Wohnung [Nr.].'),
    p('Die Party beginnt um 18 Uhr und endet spätestens um 22 Uhr.'),
    p('Ich bitte um Verständnis für etwas mehr Lärm.'),
    p('Natürlich achte ich auf die Ruhezeit. Klingelt gerne, wenn etwas stört!'),
    p('Mit freundlichen Grüßen, [Name]'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Korrekte formelle Sprache: Sie-Form, höfliche Bitten'),
    bullet('Vollständiger Zettelaufbau: Anrede, Inhalt, Bitte, Abschluss'),
    bullet('Konjunktiv II für höfliche Bitten (Könnten Sie … / Würden Sie …)'),
    bullet('Korrekte Zeitangaben und Informationen'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Mit Nachbarn kommunizieren');
  console.log('Zielordner:', OUTPUT_DIR);
  await createSchreiben();
  await createSchreibenLoesung();
  await createLesen();
  await createLesenLoesung();
  await createLuecken();
  await createLueckenLoesung();
  await createWortliste();
  await createWortlisteLoesung();
  await createKonversation();
  await createKonversationLoesung();
  await createBildaufgaben();
  await createBildaufgabenLoesung();
  console.log('\nFertig! 12 Dateien erstellt.');
})();
