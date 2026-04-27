'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Einkaufen_01_Supermarkt';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '03_Einkaufen', '01_Supermarkt');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Einkaufen & Dienstleistungen — Im Supermarkt und auf dem Markt', italics: true, size: 18, color: '888888', font: 'Arial' })]
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
    h1('Im Supermarkt und auf dem Markt — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Phrasen beim Einkaufen:',
      'Was kostet …? / Wie viel kostet …? / Das macht … Euro.',
      'Haben Sie …? / Wo finde ich …? / Ich hätte gerne … / Ich nehme …',
      'Ein Kilo Äpfel | eine Flasche Öl | eine Packung Mehl | ein Glas Marmelade | eine Dose Tomaten',
      'im Angebot | Bio | regional | frisch | günstig | teuer | das Sonderangebot',
    ]),
    leer(),
    h2('Aufgabe 1: Einen Einkaufszettel schreiben'),
    p('Du möchtest ein einfaches Abendessen kochen: Pasta mit Tomatensauce und Salat. Du brauchst außerdem Frühstückssachen für morgen.'),
    p('Schreibe einen Einkaufszettel mit mindestens 8 Produkten. Gib die Menge an (z. B. 500 g, 1 Flasche, 2 Dosen …).'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' }, children: [new Paragraph({ children: [new TextRun({ text: 'Einkaufszettel', bold: true, font: 'Arial', size: 24 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' }, children: [new Paragraph({ children: [new TextRun({ text: 'Menge', bold: true, font: 'Arial', size: 24 })] })] }),
        ]}),
        ...Array(8).fill(null).map(() => new TableRow({ children: [
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '', font: 'Arial', size: 24 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '', font: 'Arial', size: 24 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 2: Preise vergleichen'),
    p('Schau dir die Preise an und schreibe Vergleichssätze. Benutze: teurer als / billiger als / genauso teuer wie.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Produkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Supermarkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wochenmarkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Dein Vergleich', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Tomaten (1 kg)', '1,29 €', '2,50 €', ''],
          ['Äpfel (1 kg)', '1,99 €', '1,99 €', ''],
          ['Brot (500 g)', '1,59 €', '3,20 €', ''],
          ['Eier (10 Stück)', '2,49 €', '3,80 €', ''],
        ].map(([p1, p2, p3, p4]) => new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p1, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p2, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p3, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p4, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('Schreibe jetzt 3 Vergleichssätze:'),
    linie(), leer(),
    linie(), leer(),
    linie(), leer(),
    h2('Aufgabe 3: Am Marktstand — Dialog schreiben'),
    p('Schreibe einen Dialog zwischen einem Kunden (du) und einer Marktverkäuferin. Der Kunde kauft Äpfel, Tomaten und frische Kräuter. Frage nach Preis und Herkunft.'),
    p('Mindestens 6 Zeilen. Benutze: Ich hätte gerne … / Was kostet …? / Woher kommen die …?'),
    leer(),
    p('Kunde:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    p('Kunde:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    p('Kunde:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    h2('Aufgabe 4: Supermarkt oder Wochenmarkt?'),
    p('Wo kaufst du lieber ein — im Supermarkt oder auf dem Wochenmarkt? Schreibe 4–5 Sätze und begründe deine Meinung.'),
    p('Benutze: Ich kaufe lieber … weil … / Der Supermarkt ist … als der Markt. / Auf dem Markt gibt es …'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Im Supermarkt und auf dem Markt'),
    leer(),
    h2('Aufgabe 1: Einkaufszettel — Beispiel'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' }, children: [new Paragraph({ children: [new TextRun({ text: 'Einkaufszettel', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' }, children: [new Paragraph({ children: [new TextRun({ text: 'Menge', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Pasta (Spaghetti)', '500 g'],
          ['Tomaten (Dose)', '2 Dosen'],
          ['Zwiebeln', '2 Stück'],
          ['Knoblauch', '1 Knolle'],
          ['Olivenöl', '1 Flasche'],
          ['Salat (Kopfsalat)', '1 Kopf'],
          ['Gurke', '1 Stück'],
          ['Brot', '1 Laib'],
          ['Butter', '1 Packung (250 g)'],
          ['Milch', '1 Liter'],
        ].map(([p1, p2]) => new TableRow({ children: [
          new TableCell({ width: { size: 6000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p1, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: p2, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Individuelle Einkaufszettel akzeptieren. Auf korrekte Mengenangaben achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Preisvergleiche'),
    p('Tomaten: Die Tomaten auf dem Wochenmarkt sind teurer als im Supermarkt.'),
    p('Äpfel: Die Äpfel im Supermarkt sind genauso teuer wie auf dem Wochenmarkt.'),
    p('Brot: Das Brot auf dem Wochenmarkt ist teurer als im Supermarkt.'),
    p('Eier: Die Eier auf dem Wochenmarkt sind teurer als im Supermarkt.'),
    leer(),
    h2('Aufgabe 3: Dialog — Musterlösung'),
    p('Kunde: „Guten Tag! Ich hätte gerne ein Kilo Äpfel, bitte."'),
    p('Verkäuferin: „Gerne! Das macht 1,99 Euro."'),
    p('Kunde: „Und was kosten die Tomaten?"'),
    p('Verkäuferin: „2,50 Euro das Kilo. Sehr frisch — von einem Hof hier aus der Region."'),
    p('Kunde: „Woher kommen die Kräuter?"'),
    p('Verkäuferin: „Die Petersilie kommt aus Bayern. Darf es noch etwas sein?"'),
    p('Kunde: „Nein danke, das war alles. Was macht das zusammen?"'),
    p('Verkäuferin: „Das macht 6,49 Euro, bitte."'),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('→ Individuelle Antworten. Komparativ und weil-Sätze bewerten.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Supermarkt und auf dem Markt — Leseübung'),
    leer(),
    h2('Lesetext: „Samstag auf dem Viktualienmarkt"'),
    leer(),
    p('Emre Yilmaz kommt aus der Türkei und lebt seit zwei Jahren in München. Jeden Samstag geht er auf den Viktualienmarkt — das ist ein berühmter Wochenmarkt im Zentrum Münchens. Emre liebt frisches Gemüse und Obst, und auf dem Markt findet er alles in bester Qualität.'),
    leer(),
    p('Heute kauft er bei seinem Lieblingsstand Tomaten, Paprika und Zucchini. Die Verkäuferin, Frau Huber, kennt ihn schon gut. „Guten Morgen, Herr Yilmaz! Die Tomaten sind heute besonders schön — direkt vom Bauernhof aus dem Chiemgau." Emre nimmt ein Kilo Tomaten und eine Packung Paprika. Das kostet zusammen 4,80 Euro.'),
    leer(),
    p('Danach geht Emre zum Brotstand. Er kauft ein großes Bauernbrot für 3,50 Euro. Im Supermarkt würde dasselbe Brot vielleicht 1,60 Euro kosten — aber Emre findet: „Der Geschmack ist viel besser. Und ich weiß, woher das Brot kommt."'),
    leer(),
    p('Am Ende geht Emre noch kurz in den Supermarkt um die Ecke. Dort kauft er Nudeln, Öl und Milch — das ist günstiger als auf dem Markt. An der Kasse bezahlt er mit Karte. Die Kassiererin gibt ihm den Kassenbon. Emre schaut ihn durch: Alles stimmt.'),
    leer(),
    p('„Supermarkt und Wochenmarkt — ich brauche beides", sagt Emre lachend.'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Emre geht jeden Samstag auf den Markt.  ___'),
    p('2. Er kauft Tomaten, Paprika und Kartoffeln.  ___'),
    p('3. Die Tomaten kommen aus dem Chiemgau.  ___'),
    p('4. Das Bauernbrot kostet im Supermarkt mehr als auf dem Markt.  ___'),
    p('5. Im Supermarkt kauft Emre Nudeln, Öl und Milch.  ___'),
    p('6. Emre bezahlt auf dem Markt mit Karte.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Was kauft Emre bei Frau Huber?'),
    linie(), leer(),
    p('2. Was kostet sein Einkauf beim Gemüsestand?'),
    linie(), leer(),
    p('3. Warum kauft Emre das Brot auf dem Markt, obwohl es teurer ist?'),
    linie(), linie(), leer(),
    p('4. Was kauft Emre im Supermarkt? Warum?'),
    linie(), linie(), leer(),
    h2('Aufgabe 3: Mengenangaben im Text finden'),
    p('Schreibe alle Mengenangaben aus dem Text heraus.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Menge', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Produkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Preis', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...Array(4).fill(null).map(() => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('Gehst du lieber auf einen Markt oder in den Supermarkt? Oder beides? Erkläre in 3–4 Sätzen.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Im Supermarkt und auf dem Markt'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. R — Emre geht jeden Samstag auf den Markt.'),
    p('2. F — Er kauft Tomaten, Paprika und Zucchini (nicht Kartoffeln).'),
    p('3. R — Die Tomaten kommen aus dem Chiemgau.'),
    p('4. F — Das Brot ist auf dem Markt teurer als im Supermarkt (3,50 € vs. 1,60 €).'),
    p('5. R — Im Supermarkt kauft er Nudeln, Öl und Milch.'),
    p('6. F — Emre bezahlt im Supermarkt mit Karte (nicht auf dem Markt).'),
    leer(),
    h2('Aufgabe 2: Fragen'),
    p('1. Er kauft Tomaten, Paprika und Zucchini.'),
    p('2. 4,80 Euro (ein Kilo Tomaten + eine Packung Paprika).'),
    p('3. Weil der Geschmack besser ist und er weiß, woher das Brot kommt.'),
    p('4. Er kauft Nudeln, Öl und Milch — weil das günstiger ist als auf dem Markt.'),
    leer(),
    h2('Aufgabe 3: Mengenangaben'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Menge', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Produkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Preis', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['ein Kilo', 'Tomaten', '(Teil von 4,80 €)'],
          ['eine Packung', 'Paprika', '(Teil von 4,80 €)'],
          ['ein großes', 'Bauernbrot', '3,50 €'],
          ['(nicht genannt)', 'Nudeln, Öl, Milch', '(nicht genannt)'],
        ].map(([m, pr, prs]) => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: m, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: pr, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: prs, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
  ];
  await save(children, `${TOPIC}_Lesen_LOESUNG.docx`);
};

// ==================== LÜCKEN ====================
const createLuecken = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Supermarkt und auf dem Markt — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Kasse | Kassenbon | Sonderangebot | Abteilung | wiegt | kostet | Pfund | Dose | Flasche | Glas',
      'frisch | Bio | günstiger | teurer | im Angebot | Wechselgeld | bezahlen | Quittung',
    ]),
    leer(),
    h2('Aufgabe 1: Im Supermarkt — Lückentext'),
    p('Ergänze die fehlenden Wörter aus dem Wörterkasten.'),
    leer(),
    p('Lena geht in den Supermarkt. Sie braucht Tomaten, Olivenöl und Joghurt. Die Tomaten sind heute _____________ — zwei Kilo für den Preis von einem! Sie nimmt zwei _____________ Tomaten aus der Gemüse-_____________. Das Olivenöl findet sie in der Küchen-_____________. Es gibt eine große _____________ für 4,99 Euro.'),
    leer(),
    p('An der _____________ zahlt Lena mit Bargeld. Sie gibt 20 Euro. Die Kassiererin gibt ihr das _____________ zurück und druckt den _____________ aus. Lena schaut den Bon durch: Alles stimmt.'),
    leer(),
    h2('Aufgabe 2: Auf dem Wochenmarkt — Dialog'),
    p('Ergänze den Dialog. Wähle: kostet | nehme | hätte gerne | macht | Woher | frisch'),
    leer(),
    p('Kunde:  „Guten Morgen! Ich _____________ ein Kilo Erdbeeren, bitte."'),
    leer(),
    p('Verkäufer:  „Gerne! Die Erdbeeren sind sehr _____________ — heute Morgen gepflückt."'),
    leer(),
    p('Kunde:  „Super! _____________ kommen die her?"'),
    leer(),
    p('Verkäufer:  „Von einem Hof hier aus der Region. Ein Kilo _____________ 3,50 Euro."'),
    leer(),
    p('Kunde:  „Dann _____________ ich zwei Kilo."'),
    leer(),
    p('Verkäufer:  „Das _____________ 7,00 Euro, bitte."'),
    leer(),
    h2('Aufgabe 3: Mengenangaben zuordnen'),
    p('Verbinde die Menge mit dem passenden Produkt. Es gibt mehrere richtige Antworten — schreibe je ein Beispiel.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Mengenangabe', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Produkt (Beispiel)', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['ein Kilo', '___________________________'],
          ['eine Flasche', '___________________________'],
          ['eine Dose', '___________________________'],
          ['ein Glas', '___________________________'],
          ['eine Packung', '___________________________'],
          ['ein halbes Pfund', '___________________________'],
        ].map(([m, b]) => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: m, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Preisvergleich — Sätze ergänzen'),
    p('Ergänze mit: teurer als / billiger als / genauso teuer wie / am teuersten / am günstigsten'),
    leer(),
    p('1. Das Bio-Gemüse auf dem Markt ist _____________ das Gemüse im Discounter.'),
    leer(),
    p('2. Die Milch im Supermarkt ist _____________ die Milch beim Bauern.'),
    leer(),
    p('3. Im Discounter ist das Brot _____________ — es kostet nur 99 Cent.'),
    leer(),
    p('4. Frische Kräuter auf dem Markt sind _____________ getrocknete Kräuter im Supermarkt.'),
    leer(),
    grammarBox([
      'Grammatik — Mengenangaben:',
      'Nach Mengenangaben steht das Substantiv OHNE Artikel und meist im Nominativ:',
      '  ein Kilo Tomaten (nicht: ein Kilo die/der Tomaten)',
      '  eine Flasche Olivenöl | eine Dose Tomaten | ein Glas Marmelade',
      '  500 Gramm Käse | ein halbes Pfund Butter | zwei Liter Milch',
    ]),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Im Supermarkt und auf dem Markt'),
    leer(),
    h2('Aufgabe 1: Im Supermarkt'),
    p('im Angebot | Kilo (oder: kg) | Abteilung | Abteilung | Flasche | Kasse | Wechselgeld | Kassenbon'),
    leer(),
    p('Vollständiger Text:'),
    p('… Die Tomaten sind heute im Angebot — zwei Kilo für den Preis von einem! Sie nimmt zwei Kilo Tomaten aus der Gemüse-Abteilung. Das Olivenöl findet sie in der Küchen-Abteilung. Es gibt eine große Flasche für 4,99 Euro. An der Kasse zahlt Lena mit Bargeld. Die Kassiererin gibt ihr das Wechselgeld zurück und druckt den Kassenbon aus.'),
    leer(),
    h2('Aufgabe 2: Marktdialog'),
    p('hätte gerne | frisch | Woher | kostet | nehme | macht'),
    leer(),
    h2('Aufgabe 3: Mengenangaben — Beispiele'),
    p('ein Kilo → Äpfel / Tomaten / Kartoffeln / Mehl'),
    p('eine Flasche → Öl / Wein / Milch / Wasser'),
    p('eine Dose → Tomaten / Bohnen / Fisch / Suppe'),
    p('ein Glas → Marmelade / Honig / Gurken / Nutella'),
    p('eine Packung → Nudeln / Reis / Butter / Mehl'),
    p('ein halbes Pfund → Hackfleisch / Käse / Butter'),
    leer(),
    h2('Aufgabe 4: Preisvergleich'),
    p('1. teurer als'),
    p('2. billiger als'),
    p('3. am günstigsten'),
    p('4. teurer als'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const vokabDaten = [
    ['der Supermarkt, -märkte', 'Nomen', 'Ich kaufe Milch im Supermarkt.'],
    ['der Wochenmarkt, -märkte', 'Nomen', 'Samstags gehe ich auf den Wochenmarkt.'],
    ['die Kasse, -n', 'Nomen', 'An der Kasse bezahle ich mit Karte.'],
    ['der Kassenbon, -s', 'Nomen', 'Ich prüfe den Kassenbon.'],
    ['das Sonderangebot, -e', 'Nomen', 'Diese Äpfel sind im Sonderangebot.'],
    ['die Abteilung, -en', 'Nomen', 'Die Backwaren sind in Abteilung 3.'],
    ['die Mengenangabe, -n', 'Nomen', 'Ein Kilo ist eine Mengenangabe.'],
    ['wiegen', 'Verb', 'Die Tomaten wiegen 500 Gramm.'],
    ['kosten', 'Verb', 'Was kostet ein Kilo Äpfel?'],
    ['bezahlen', 'Verb', 'Ich bezahle an der Kasse.'],
    ['frisch', 'Adjektiv', 'Das Gemüse auf dem Markt ist sehr frisch.'],
    ['günstig', 'Adjektiv', 'Im Discounter ist es günstiger.'],
    ['Bio-', 'Präfix', 'Bio-Produkte kommen aus kontrolliertem Anbau.'],
    ['regional', 'Adjektiv', 'Ich kaufe gerne regionale Produkte.'],
  ];

  const mengenDaten = [
    ['ein Kilo (= 1 kg)', 'Gewicht', 'ein Kilo Kartoffeln'],
    ['ein halbes Pfund (= 250 g)', 'Gewicht', 'ein halbes Pfund Butter'],
    ['ein Liter (= 1 l)', 'Volumen', 'ein Liter Milch'],
    ['eine Flasche', 'Behälter', 'eine Flasche Öl'],
    ['eine Dose', 'Behälter', 'eine Dose Tomaten'],
    ['ein Glas', 'Behälter', 'ein Glas Honig'],
    ['eine Packung', 'Verpackung', 'eine Packung Nudeln'],
    ['ein Stück', 'Einheit', 'drei Stück Kuchen'],
  ];

  const makeTable = (rows) => new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wort / Phrase', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Typ', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 4372, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispiel', bold: true, font: 'Arial', size: 22 })] })] }),
      ]}),
      ...rows.map(([w, t, b]) => new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: w, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 22, color: '555555' })] })] }),
        new TableCell({ width: { size: 4372, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
      ]})),
    ]
  });

  const children = [
    schuelerKopf(), leer(),
    h1('Im Supermarkt und auf dem Markt — Wortliste'),
    leer(),
    h2('Teil 1: Einkaufs-Vokabular'),
    makeTable(vokabDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...vokabDaten.slice(0, 8).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Mengenangaben'),
    makeTable(mengenDaten),
    leer(),
    grammarBox([
      'Mengenangaben + Substantiv — KEIN Artikel, KEIN Genitiv:',
      '  ✓  ein Kilo Tomaten     ✗  ein Kilo der Tomaten / ein Kilo von Tomaten',
      '  ✓  eine Flasche Öl       ✗  eine Flasche des Öls',
      '  ✓  zwei Liter Milch      ✗  zwei Liter von Milch',
      '',
      'Ausnahme: Mit Adjektiv → Genitiv möglich: eine Flasche guten Weins (sehr formell/selten)',
    ]),
    leer(),
    infoBox([
      'Nützliche Sätze beim Einkaufen:',
      'Was kostet …? / Wie viel kostet …?     →  Das kostet … Euro.',
      'Ich hätte gerne … / Ich nehme …        →  Gerne! Das macht … Euro.',
      'Haben Sie …? / Wo finde ich …?         →  In Abteilung … / Dort drüben.',
      'Woher kommen die …?                    →  Aus der Region / aus Bayern / aus …',
      'Das ist alles, danke.                  →  Das macht … Euro, bitte.',
    ]),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Im Supermarkt und auf dem Markt'),
    leer(),
    p('Die Wortliste enthält Übersetzungszeilen für individuelle Sprachen.', { color: '388E3C', italics: true }),
    p('→ Individuelle Einträge der Lernenden akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Zusatz: Supermarkt vs. Wochenmarkt — Vergleich'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Merkmal', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Supermarkt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wochenmarkt', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Preis', 'günstiger', 'oft teurer'],
          ['Qualität', 'variiert', 'oft frischer, regionaler'],
          ['Öffnungszeit', 'täglich, lange', 'nur 1–2x pro Woche'],
          ['Auswahl', 'sehr groß', 'saisonale Produkte'],
          ['Atmosphäre', 'anonym', 'persönlich, Kontakt zum Erzeuger'],
        ].map(([m, s, w]) => new TableRow({ children: [
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: m, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: s, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: w, font: 'Arial', size: 22 })] })] }),
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
    h1('Im Supermarkt und auf dem Markt — Konversation'),
    leer(),
    h2('Aufgabe 1: Am Marktstand — Dialog'),
    p('Person A ist Kunde/Kundin, Person B ist Marktverkäufer/in. Ergänzt den Dialog und übt ihn zu zweit.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['A:', 'Guten Morgen! Ich hätte gerne _____________ Kilo Tomaten, bitte.'],
          ['B:', 'Gerne! Die Tomaten sind heute besonders _____________ — direkt vom Hof.'],
          ['A:', 'Woher kommen die denn?'],
          ['B:', 'Aus _____________. Darf es noch etwas sein?'],
          ['A:', 'Ja — was _____________ die Erdbeeren?'],
          ['B:', 'Die kosten 3,50 Euro das Kilo. Heute im _____________.'],
          ['A:', 'Dann nehme ich auch ein Kilo. Was _____________ das zusammen?'],
          ['B:', 'Das macht _____________ Euro, bitte. Möchten Sie eine Tüte?'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen! Person B spielt jetzt Kunden/Kundin.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Im Supermarkt — nach etwas fragen'),
    p('Person A sucht im Supermarkt drei Produkte. Person B ist ein Mitarbeiter/eine Mitarbeiterin.'),
    p('Benutzt: Entschuldigung, wo finde ich …? / In welcher Abteilung ist …? / Haben Sie auch …?'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person A — Einkaufszettel', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Bio-Joghurt', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Dinkelmehl (Typ 630)', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Kokosmilch (Dose)', font: 'Arial', size: 22 })] }),
        ]}),
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person B — Abteilungsplan', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Joghurt → Kühlregal, Abt. 2', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Mehl → Backwaren, Abt. 5', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Kokosmilch → Weltkost, Abt. 7', font: 'Arial', size: 22 })] }),
        ]}),
      ]})]
    }),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Einkaufsgewohnheiten'),
    p('Frag deinen Partner / deine Partnerin und schreibe die Antworten auf.'),
    leer(),
    p('1. Wo kaufst du normalerweise ein — Supermarkt, Discounter oder Markt?'),
    linie(), leer(),
    p('2. Was kaufst du am häufigsten? Was steht fast immer auf deinem Einkaufszettel?'),
    linie(), leer(),
    p('3. Wie oft gehst du einkaufen? Planst du deinen Einkauf vorher?'),
    linie(), leer(),
    p('4. Was ist dir beim Einkaufen wichtig — Preis, Qualität oder Herkunft?'),
    linie(), leer(),
    p('5. Gibt es in deiner Heimat einen Markt oder ein Geschäft, das dir besonders fehlt?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenübung — Einkaufs-Staffette'),
    p('Macht eine Kette. Person A nennt ein Produkt + Menge. Person B wiederholt und ergänzt. Usw.'),
    p('Beispiel: „Ich kaufe ein Kilo Äpfel." — „Ich kaufe ein Kilo Äpfel und eine Flasche Öl." — …'),
    leer(),
    p('Wer macht einen Fehler (falsche Mengenangabe oder falsches Produkt), scheidet aus!', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Im Supermarkt und auf dem Markt'),
    leer(),
    h2('Aufgabe 1: Marktdialog — mögliche Lösungen'),
    p('A: „… ein / zwei Kilo Tomaten …"'),
    p('B: „… frisch …"'),
    p('B: „Aus Bayern / der Region / …"'),
    p('A: „… kosten die Erdbeeren?"'),
    p('B: „… Sonderangebot / Angebot."'),
    p('A: „… macht das zusammen?"'),
    p('B: „Das macht [Summe] Euro …"'),
    leer(),
    p('→ Auf korrekte Mengenangaben achten (ein Kilo, nicht: einen Kilo).', { color: '388E3C', italics: true }),
    p('→ Auf Höflichkeit und Gesprächsfluss achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Im Supermarkt — Beispieldialog'),
    p('A: „Entschuldigung, wo finde ich Bio-Joghurt?"'),
    p('B: „Im Kühlregal, das ist Abteilung 2 — dort drüben."'),
    p('A: „Und Dinkelmehl?"'),
    p('B: „Mehl finden Sie in der Backwaren-Abteilung, Nummer 5."'),
    p('A: „Haben Sie auch Kokosmilch in Dosen?"'),
    p('B: „Ja, das ist in der Weltküche-Abteilung, ganz hinten links."'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Korrekte Mengenangaben ohne Artikel (ein Kilo Tomaten)'),
    bullet('Höfliche Fragen: Ich hätte gerne … / Was kostet …? / Entschuldigung, wo …?'),
    bullet('Preise korrekt nennen (macht / kostet)'),
    bullet('Flüssiges Gespräch mit natürlichen Übergängen'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Supermarkt und auf dem Markt — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Den Supermarkt beschreiben'),
    p('[BILD 1: Ein Supermarkt-Innenraum — Gemüseabteilung mit Tomaten, Paprika, Salat; Regale mit Konserven; eine Kasse im Hintergrund; Kunden mit Einkaufswagen]'),
    leer(),
    p('Beschreibe das Bild. Was siehst du? Wo sind die Produkte?'),
    p('Benutze: Im Vordergrund … / Auf der linken Seite … / Im Hintergrund … / Es gibt …'),
    leer(),
    ...Array(5).fill(null).map(linie),
    leer(),
    h2('Aufgabe 2: Was kauft die Person?'),
    p('[BILD 2: Eine Person steht an der Kasse. Im Einkaufskorb sind sichtbar: ein Brot, Tomaten, eine Flasche Wein, Joghurt, eine Packung Pasta]'),
    leer(),
    p('Was hat die Person gekauft? Schreibe Sätze mit Mengenangaben.'),
    p('Beispiel: Die Person kauft ein Brot und …'),
    leer(),
    ...Array(4).fill(null).map(linie),
    leer(),
    p('Was könnte die Person heute kochen? Schreibe eine Idee.'),
    linie(), leer(),
    h2('Aufgabe 3: Wochenmarkt-Szene'),
    p('[BILD 3: Ein bunter Wochenmarkt — mehrere Stände mit Gemüse, Obst, Brot, Käse; Verkäufer hinter dem Stand; Kunden kaufen ein; Schilder mit Preisen]'),
    leer(),
    p('1. Was wird auf dem Markt verkauft? Nenne 5 Produkte, die du siehst.'),
    leer(),
    p('1. _____________  2. _____________  3. _____________  4. _____________  5. _____________'),
    leer(),
    p('2. Beschreibe einen Stand genauer: Was wird verkauft? Wie viel kostet es?'),
    linie(), leer(),
    p('3. Schreibe einen kurzen Dialog zwischen Kunde und Verkäufer an diesem Stand (4 Zeilen).'),
    leer(),
    ...Array(4).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Preisschild lesen und reagieren'),
    p('[BILD 4: Drei Preisschilder: „Bio-Tomaten 1 kg — 2,80 €", „Tomaten aus Spanien 1 kg — 0,99 €", „Tomaten regional 1 kg — 1,80 €"]'),
    leer(),
    p('1. Welche Tomaten sind am teuersten? Welche sind am günstigsten?'),
    linie(), leer(),
    p('2. Welche würdest du kaufen? Warum? Schreibe 3 Sätze.'),
    leer(),
    ...Array(3).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Im Supermarkt und auf dem Markt'),
    leer(),
    p('Hinweis: Die Antworten hängen von den eingefügten Bildern ab. Folgende Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Supermarkt beschreiben — Musterantworten'),
    bullet('Im Vordergrund sehe ich die Gemüseabteilung mit Tomaten, Paprika und Salat.'),
    bullet('Auf der linken Seite stehen Regale mit Konserven und Dosen.'),
    bullet('Im Hintergrund ist die Kasse — dort steht ein Kunde mit einem Einkaufswagen.'),
    bullet('Die Produkte sind übersichtlich sortiert und gut beschriftet.'),
    leer(),
    h2('Aufgabe 2: Was kauft die Person?'),
    p('Die Person kauft ein Brot, ein Kilo Tomaten, eine Flasche Wein, einen Joghurt und eine Packung Pasta.'),
    p('Mögliches Gericht: Pasta mit Tomatensauce.'),
    leer(),
    h2('Aufgabe 3: Wochenmarkt'),
    p('→ Individuelle Antworten je nach Bild. Auf Mengenangaben und Vokabular achten.', { color: '388E3C', italics: true }),
    p('Beispiel-Dialog:'),
    p('Kunde: „Was kosten die Äpfel?"'),
    p('Verkäufer: „2,00 Euro das Kilo — Bio, aus der Region."'),
    p('Kunde: „Gut, ich nehme zwei Kilo."'),
    p('Verkäufer: „Das macht 4,00 Euro, bitte."'),
    leer(),
    h2('Aufgabe 4: Preisschilder'),
    p('Am teuersten: Bio-Tomaten (2,80 €). Am günstigsten: Tomaten aus Spanien (0,99 €).'),
    p('Individuelle Kaufentscheidung — Argumente bewerten:'),
    bullet('Günstig → Tomaten aus Spanien (0,99 €)'),
    bullet('Regional und Mittelklasse → regionale Tomaten (1,80 €)'),
    bullet('Bio und nachhaltig → Bio-Tomaten (2,80 €)'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Korrekte Mengenangaben in den Beschreibungen'),
    bullet('Beschreibungssprache: Im Vordergrund / links / rechts / hinten'),
    bullet('Preisvergleich: am teuersten / am günstigsten / teurer als'),
    bullet('Begründungen mit weil-Sätzen'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Im Supermarkt und auf dem Markt');
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
