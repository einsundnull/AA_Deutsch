'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Wohnen';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '02_Wohnen', 'ABSCHLUSS');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Wohnen & Einrichten — Abschlussübung', italics: true, size: 18, color: '888888', font: 'Arial' })]
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

const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })] });
const p = (t, opts = {}) => new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 24, ...opts })] });
const leer = () => new Paragraph({ children: [new TextRun({ text: '', font: 'Arial', size: 24 })] });
const linie = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});
const bullet = (t) => new Paragraph({
  numbering: { reference: 'bullet-list', level: 0 },
  children: [new TextRun({ text: t, font: 'Arial', size: 24 })]
});
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

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

const checkRow = (text) => new Paragraph({
  children: [new TextRun({ text: `☐  ${text}`, font: 'Arial', size: 24 })]
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

// ==================== ABSCHLUSS ====================
const createAbschluss = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Abschlussübung: Wohnen & Einrichten'),
    p('Diese Übung kombiniert alle drei Unterpunkte des Themas Wohnen:', { color: '555555' }),
    p('UP 01: Wohnung suchen und beschreiben  |  UP 02: Wohnungseinrichtung  |  UP 03: Mit Nachbarn kommunizieren', { color: '555555', italics: true }),
    leer(),

    // ---- AUFGABE 1: Lesetext ----
    h2('Aufgabe 1: Lesetext — „Ein neues Kapitel"'),
    leer(),
    p('Marta Kovač kommt aus Kroatien und arbeitet als Lehrerin in München. Vor drei Monaten ist sie aus einer WG ausgezogen und hat ihre erste eigene Wohnung gefunden — eine 2-Zimmer-Wohnung im dritten Stock, 58 Quadratmeter, 980 Euro Kaltmiete plus 140 Euro Nebenkosten.'),
    leer(),
    p('Die Wohnungssuche war nicht einfach. Marta hat viele Anzeigen gelesen und sich um mehrere Wohnungen beworben. Beim ersten Besichtigungstermin musste sie einen Einkommensnachweis und eine Schufa-Auskunft mitbringen. Beim zweiten Termin hat der Vermieter ihr die Wohnung sofort gegeben — er fand sie sympathisch und zuverlässig.'),
    leer(),
    p('Jetzt richtet Marta die Wohnung ein. Das Schlafzimmer ist schon fertig: Ein Bett steht an der Wand, ein großer Schrank steht gegenüber der Tür. An der Wand hängt ein Foto aus ihrer kroatischen Heimat. Das Wohnzimmer ist noch fast leer — nur ein Sofa steht vor dem Fenster. Marta möchte noch ein Regal kaufen und einen Teppich.'),
    leer(),
    p('Die Nachbarn sind sehr nett. Herr und Frau Steinberg aus Wohnung 8 haben sich beim ersten Treffen im Treppenhaus vorgestellt. Als Marta einzog, haben sie ihr sogar beim Tragen geholfen. Einmal gab es ein kleines Problem: Martas Wecker hat um 6 Uhr morgens sehr laut geklingelt. Die Nachbarin aus Wohnung 6 hat einen freundlichen Zettel in den Briefkasten gelegt. Marta hat sich sofort entschuldigt.'),
    leer(),
    p('„Ich fühle mich hier sehr wohl", sagt Marta. „Eine eigene Wohnung ist viel besser als eine WG. Man hat mehr Ruhe und mehr Freiheit."'),
    leer(),

    h2('Aufgabe 1a: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Marta wohnt seit einem Jahr in München.  ___'),
    p('2. Die Wohnung hat drei Zimmer.  ___'),
    p('3. Marta musste beim Besichtigungstermin Dokumente mitbringen.  ___'),
    p('4. Das Schlafzimmer ist schon komplett eingerichtet.  ___'),
    p('5. Herr und Frau Steinberg haben Marta beim Einzug geholfen.  ___'),
    p('6. Marta hat das Lärmproblem ignoriert.  ___'),
    leer(),

    h2('Aufgabe 1b: Fragen zum Text'),
    p('1. Wie viel kostet Martas Wohnung insgesamt pro Monat (Warm)?'),
    linie(), leer(),
    p('2. Was hat Marta bei der Besichtigung mitgebracht?'),
    linie(), leer(),
    p('3. Was fehlt noch im Wohnzimmer?'),
    linie(), leer(),
    p('4. Wie hat Marta auf den Zettel der Nachbarin reagiert?'),
    linie(), leer(),

    pageBreak(),

    // ---- AUFGABE 2: Lückentext ----
    h2('Aufgabe 2: Lückentext — Wohnen'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Kaltmiete | Nebenkosten | Besichtigung | Mietvertrag | Kaution | Schufa-Auskunft',
      'steht | hängt | liegt | stelle | Treppenhaus | Ruhezeit | Hausordnung | beschweren',
    ]),
    leer(),
    p('1. Die Wohnung kostet 850 Euro _____________ plus 120 Euro _____________.'),
    leer(),
    p('2. Vor dem Einzug unterschreibe ich den _____________. Die _____________ beträgt drei Monatsmieten.'),
    leer(),
    p('3. Beim Besichtigungstermin brauche ich eine _____________.'),
    leer(),
    p('4. Das Sofa _____________ vor dem Fenster. Der Teppich _____________ auf dem Boden.'),
    leer(),
    p('5. Ich _____________ den neuen Schrank ans Fenster.'),
    leer(),
    p('6. Im _____________ treffe ich manchmal meine Nachbarn.'),
    leer(),
    p('7. Die _____________ ist von 22 bis 7 Uhr. Das steht in der _____________.'),
    leer(),
    p('8. Wenn es zu laut ist, kann ich mich bei der Hausverwaltung _____________.'),
    leer(),

    // ---- AUFGABE 3: Fehler korrigieren ----
    h2('Aufgabe 3: Fehler korrigieren'),
    p('In jedem Satz steckt ein Fehler. Schreibe den richtigen Satz auf die Linie.'),
    leer(),
    p('1. Das Sofa steht vor das Fenster.'),
    linie(), leer(),
    p('2. Ich hänge das Bild an der Wand.'),
    linie(), leer(),
    p('3. Könntest du bitte leiser zu sein?'),
    linie(), leer(),
    p('4. Die Wohnung hat 58 Quadratmeter groß.'),
    linie(), leer(),
    p('5. Ich suche eine Wohnung mit drei Zimmer.'),
    linie(), leer(),
    p('6. Der Teppich liegt auf den Boden.'),
    linie(), leer(),

    pageBreak(),

    // ---- AUFGABE 4: Schreiben ----
    h2('Aufgabe 4: Schreiben — Einen Zettel verfassen'),
    p('Du ziehst nächsten Samstag in deine neue Wohnung ein. Die Möbel kommen um 10 Uhr.'),
    p('Schreibe einen Zettel an alle Nachbarn im Haus. Informiere über den Einzug, bitte um Geduld und stelle dich kurz vor.'),
    leer(),
    zettelBox([
      'Liebe Nachbarinnen und Nachbarn,',
      '',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '_______________________________________________',
      '',
      'Ich freue mich auf eine gute Nachbarschaft!',
      'Mit freundlichen Grüßen,',
      '_______________________,  Wohnung ___',
    ]),
    leer(),
    p('Checkliste: Hast du folgendes erwähnt?', { bold: true }),
    checkRow('Datum und Uhrzeit des Einzugs'),
    checkRow('Grund für möglichen Lärm (Möbeltransport)'),
    checkRow('Kurze Vorstellung (Name, woher)'),
    checkRow('Freundlicher Abschluss'),
    leer(),

    // ---- AUFGABE 5: Rollenspiel ----
    h2('Aufgabe 5: Rollenspiel — Wohnungsbesichtigung und Nachbarschaft'),
    p('Übt zu zweit oder zu dritt. Lest eure Karten und spielt die Situation.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person A — Wohnungssuchende/r', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du besichtigst eine Wohnung.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Frag nach: Miete, Nebenkosten, Stockwerk, Nachbarn, Haustiere erlaubt?', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person B — Vermieter/in', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '2 Zi., 60 qm, 900 € KM + 130 € NK, 3. OG, ruhige Nachbarn.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Keine Haustiere. Braucht: Schufa, Einkommensnachweis.', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 3372, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person C — Nachbar/in (optional)', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du triffst Person A im Treppenhaus.', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Stelle dich vor, beschreibe das Haus kurz, gib einen Tipp.', font: 'Arial', size: 22 })] }),
          ]}),
        ]}),
      ]
    }),
    leer(),
    p('Pflichtbereiche für das Gespräch:', { bold: true }),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 5386, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Bereich', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person A', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2386, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person B', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Nach Miete und Nebenkosten fragen / antworten', '✓', '✓'],
          ['Wohnungsgröße und Lage nennen', '', '✓'],
          ['Dokumente ansprechen (Schufa, Einkommensnachweis)', '✓', '✓'],
          ['Höfliche Fragen formulieren (Könnten Sie …?)', '✓', ''],
          ['Im Treppenhaus begrüßen und vorstellen', '✓', '', ],
        ].map(([b, a, c]) => new TableRow({ children: [
          new TableCell({ width: { size: 5386, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: a, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2386, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: c, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),

    // ---- SELBSTEVALUATION ----
    h2('Selbstevaluation — Was kann ich jetzt?'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 7772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Ich kann …', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'gut', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'üben', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          'eine Wohnung suchen und beschreiben (Lage, Größe, Preis).',
          'Wohnungsanzeigen lesen und verstehen (Abkürzungen wie KM, NK, qm).',
          'Möbel benennen und sagen, wo sie stehen / hängen / liegen.',
          'Wechselpräpositionen korrekt verwenden (Dativ WO / Akkusativ WOHIN).',
          'höfliche Zettel an Nachbarn schreiben (Bitte, Entschuldigung, Information).',
          'ein Problem mit einem Nachbarn höflich ansprechen.',
          'die Hausordnung und Ruhezeiten erklären.',
        ].map(text => new TableRow({ children: [
          new TableCell({ width: { size: 7772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '☐', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '☐', font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
  ];
  await save(children, `${TOPIC}_ABSCHLUSS.docx`);
};

// ==================== ABSCHLUSS LÖSUNG ====================
const createAbschlussLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Abschlussübung: Wohnen & Einrichten'),
    leer(),

    h2('Aufgabe 1a: Richtig oder falsch?'),
    p('1. F — Marta wohnt seit drei Monaten in München (in der eigenen Wohnung).'),
    p('2. F — Die Wohnung hat 2 Zimmer.'),
    p('3. R — Sie musste Einkommensnachweis und Schufa-Auskunft mitbringen.'),
    p('4. F — Das Schlafzimmer ist eingerichtet, aber das Wohnzimmer ist noch fast leer.'),
    p('5. R — Die Steinbergs haben ihr beim Tragen geholfen.'),
    p('6. F — Marta hat sich sofort entschuldigt.'),
    leer(),

    h2('Aufgabe 1b: Fragen zum Text'),
    p('1. 980 € + 140 € = 1.120 € Warmmiete pro Monat.'),
    p('2. Einen Einkommensnachweis und eine Schufa-Auskunft.'),
    p('3. Ein Regal und ein Teppich fehlen noch.'),
    p('4. Marta hat sich sofort entschuldigt.'),
    leer(),

    h2('Aufgabe 2: Lückentext'),
    p('1. Kaltmiete | Nebenkosten'),
    p('2. Mietvertrag | Kaution'),
    p('3. Schufa-Auskunft'),
    p('4. steht | liegt'),
    p('5. stelle'),
    p('6. Treppenhaus'),
    p('7. Ruhezeit | Hausordnung'),
    p('8. beschweren'),
    leer(),

    h2('Aufgabe 3: Fehler korrigieren'),
    p('1. Fehler: vor das Fenster (Dativ nötig, da Zustand: WO?)'),
    p('   Richtig: Das Sofa steht vor dem Fenster.'),
    leer(),
    p('2. Fehler: an der Wand (Akkusativ nötig, da Bewegung: WOHIN?)'),
    p('   Richtig: Ich hänge das Bild an die Wand.'),
    leer(),
    p('3. Fehler: zu sein (Infinitiv nach Modalverb falsch gebildet)'),
    p('   Richtig: Könnten Sie bitte leiser sein?'),
    leer(),
    p('4. Fehler: hat … groß (Adjektiv nach haben nicht korrekt)'),
    p('   Richtig: Die Wohnung ist 58 Quadratmeter groß.'),
    leer(),
    p('5. Fehler: mit drei Zimmer (Dativ Plural: Zimmer → Zimmern)'),
    p('   Richtig: Ich suche eine Wohnung mit drei Zimmern.'),
    leer(),
    p('6. Fehler: auf den Boden (Dativ nötig, da Zustand: WO?)'),
    p('   Richtig: Der Teppich liegt auf dem Boden.'),
    leer(),

    h2('Aufgabe 4: Zettel — Musterlösung'),
    zettelBox([
      'Liebe Nachbarinnen und Nachbarn,',
      '',
      'ich bin Ihre neue Nachbarin / Ihr neuer Nachbar in Wohnung [Nr.].',
      'Ich ziehe am Samstag, dem [Datum], ein. Die Möbel kommen um 10 Uhr.',
      'Es kann sein, dass es etwas lauter wird — ich bitte um etwas Geduld.',
      'Gegen 16 Uhr sollte alles fertig sein.',
      '',
      'Ich komme aus [Land] und freue mich sehr auf eine gute Nachbarschaft!',
      'Bei Fragen oder Problemen: Klingeln Sie gerne.',
      '',
      'Ich freue mich auf eine gute Nachbarschaft!',
      'Mit freundlichen Grüßen,',
      '[Name], Wohnung [Nr.]',
    ]),
    leer(),

    h2('Aufgabe 5: Rollenspiel — Bewertungskriterien'),
    bullet('Person A: Höfliche Fragen mit Könnten Sie …? / Ich hätte gerne gewusst, …'),
    bullet('Person B: Korrekte Informationen (Miete, Nebenkosten, Dokumente) nennen'),
    bullet('Beide: korrekte Sie-Form durchhalten'),
    bullet('Wohnungsvokabular korrekt anwenden (Kaltmiete, Nebenkosten, Stockwerk, Schufa)'),
    bullet('Person C (falls vorhanden): Vorstellung im Treppenhaus, freundliche Begrüßung'),
    leer(),

    h2('Themen-Abdeckung (alle 3 UPs)'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Unterpunkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Abgedeckt in …', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['UP 01 Wohnung suchen', 'Lesetext (Marta sucht Wohnung), Lücken (Kaltmiete/NK/Schufa/Mietvertrag), Rollenspiel (Besichtigung)'],
          ['UP 02 Wohnungseinrichtung', 'Lesetext (Schlafzimmer/Wohnzimmer), Lücken (steht/liegt/hängt/stelle), Fehlerkorrektur (Wechselpräpositionen)'],
          ['UP 03 Nachbarn', 'Lesetext (Zettel, Entschuldigung), Schreiben (Einzugs-Zettel), Rollenspiel (Treppenhaus)'],
        ].map(([up, ab]) => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: up, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: ab, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
  ];
  await save(children, `${TOPIC}_ABSCHLUSS_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle ABSCHLUSS: Wohnen & Einrichten');
  console.log('Zielordner:', OUTPUT_DIR);
  await createAbschluss();
  await createAbschlussLoesung();
  console.log('\nFertig! 2 Dateien erstellt.');
})();
