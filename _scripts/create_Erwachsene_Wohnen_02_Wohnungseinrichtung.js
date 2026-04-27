'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Wohnen_02_Wohnungseinrichtung';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '02_Wohnen', '02_Wohnungseinrichtung');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Wohnen & Einrichten — Wohnungseinrichtung', italics: true, size: 18, color: '888888', font: 'Arial' })]
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
    h1('Wohnungseinrichtung — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Sätze für die Wohnungsbeschreibung:',
      'Das Sofa steht im Wohnzimmer. | Das Bett steht neben dem Schrank.',
      'Das Regal hängt an der Wand. | Der Teppich liegt auf dem Boden.',
      'Ich stelle den Stuhl ans Fenster. | Ich hänge das Bild an die Wand.',
      'Ich lege das Kissen auf das Sofa. | Die Küche ist modern eingerichtet.',
    ]),
    leer(),
    h2('Aufgabe 1: Mein Zimmer beschreiben'),
    p('Beschreibe dein Zimmer oder deine Wohnung. Welche Möbel hast du? Wo stehen/hängen/liegen sie?'),
    p('Benutze: stehen / hängen / liegen und die richtigen Präpositionen (im, an der, auf dem, neben dem …)'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    h2('Aufgabe 2: Das Traumzimmer einrichten'),
    p('Du kannst dein Zimmer komplett neu einrichten. Was kaufst du? Wo stellst/hängst/legst du alles hin?'),
    p('Schreibe mindestens 5 Sätze. Benutze: ich stelle … / ich hänge … / ich lege …'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    h2('Aufgabe 3: Eine E-Mail schreiben — Möbel kaufen'),
    p('Du siehst diese Anzeige online: „Schreibtisch, Holz, 120x60 cm, guter Zustand, 60 Euro, Selbstabholung."'),
    p('Schreibe eine kurze E-Mail (4–5 Sätze). Frage nach Farbe, genauem Zustand und Abholtermin.'),
    leer(),
    p('Betreff: Anfrage zum Schreibtisch-Angebot', { bold: true }),
    leer(),
    p('Hallo,'),
    leer(),
    ...Array(5).fill(null).map(linie),
    leer(),
    p('Viele Grüße,'),
    p('___________________________'),
    leer(),
    h2('Aufgabe 4: Vergleich — alte und neue Wohnung'),
    p('Deine alte Wohnung war klein und dunkel. Deine neue Wohnung ist größer und heller. Vergleiche die beiden Wohnungen in 4–5 Sätzen.'),
    p('Benutze: größer als / kleiner als / heller als / mehr Platz / weniger Möbel / gemütlicher / moderner'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Wohnungseinrichtung'),
    leer(),
    h2('Aufgabe 1: Mein Zimmer — Musterlösung'),
    p('In meinem Zimmer steht ein Bett an der Wand. Neben dem Bett steht ein kleiner Nachttisch.'),
    p('An der Wand hängen zwei Bilder. Auf dem Boden liegt ein großer Teppich.'),
    p('Mein Schreibtisch steht am Fenster — dort habe ich gutes Licht.'),
    leer(),
    p('→ Individuelle Antworten akzeptieren. Korrekte Verwendung von stehen/hängen/liegen und Dativ-Präpositionen bewerten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Das Traumzimmer — Beispielsätze'),
    bullet('Ich stelle ein großes Bett ans Fenster.'),
    bullet('Ich hänge ein modernes Bild an die Wand.'),
    bullet('Ich lege einen weichen Teppich auf den Boden.'),
    bullet('Ich kaufe einen bequemen Schreibtisch und stelle ihn in die Ecke.'),
    bullet('Ich hänge ein Regal über den Schreibtisch.'),
    leer(),
    p('→ Akkusativ nach Bewegungsverben beachten: ich stelle … ans Fenster (= an + das Fenster).', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 3: E-Mail — Musterlösung'),
    p('Betreff: Anfrage zum Schreibtisch-Angebot', { bold: true }),
    leer(),
    p('Hallo,'),
    p('ich habe Ihr Angebot gesehen und interessiere mich für den Schreibtisch.'),
    p('Welche Farbe hat das Holz genau — hell oder dunkel? Gibt es Kratzer oder andere Schäden?'),
    p('Wann könnte ich den Tisch abholen? Ich könnte am Wochenende kommen.'),
    p('Viele Grüße, [Name]'),
    leer(),
    h2('Aufgabe 4: Vergleich — Beispielsätze'),
    bullet('Meine neue Wohnung ist viel größer als die alte.'),
    bullet('Das Wohnzimmer ist heller, weil es mehr Fenster hat.'),
    bullet('Ich habe jetzt mehr Platz für meine Möbel.'),
    bullet('Die alte Küche war kleiner und dunkler als die neue.'),
    bullet('In der neuen Wohnung fühle ich mich viel wohler.'),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Wohnungseinrichtung — Leseübung'),
    leer(),
    h2('Lesetext: „Ein neues Zuhause in Berlin"'),
    leer(),
    p('Yasmin Özdemir kommt aus der Türkei und wohnt jetzt in Berlin. Sie hat eine neue Wohnung gefunden: drei Zimmer, eine Küche und ein Badezimmer. Die Wohnung war leer — Yasmin musste sie komplett einrichten.'),
    leer(),
    p('Zuerst hat sie das Schlafzimmer eingerichtet. Sie hat ein Bett, einen Kleiderschrank und eine Kommode gekauft. Das Bett steht in der Mitte des Zimmers, der Schrank steht an der Wand gegenüber der Tür. Auf die Kommode hat sie ein Foto ihrer Familie gestellt.'),
    leer(),
    p('Im Wohnzimmer hat Yasmin ein großes Sofa aufgestellt. Das Sofa steht vor dem Fenster und ist sehr bequem. An der Wand hängt ein Fernseher. Auf dem Boden liegt ein bunter Teppich — den hat sie aus der Türkei mitgebracht.'),
    leer(),
    p('Die Küche war schon teilweise eingerichtet: Es gab einen Herd und einen Kühlschrank. Yasmin hat noch einen Esstisch mit vier Stühlen gekauft. Den Tisch hat sie in die Mitte der Küche gestellt.'),
    leer(),
    p('Nach zwei Wochen war die Wohnung fertig. Yasmin ist sehr zufrieden. „Es fühlt sich jetzt wie zu Hause an", sagt sie.'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Yasmins Wohnung hat vier Zimmer.  ___'),
    p('2. Das Bett steht an der Wand.  ___'),
    p('3. Das Sofa steht vor dem Fenster.  ___'),
    p('4. Den Teppich hat Yasmin in Deutschland gekauft.  ___'),
    p('5. Die Küche war komplett leer.  ___'),
    p('6. Yasmin ist zufrieden mit ihrer Wohnung.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Woher kommt Yasmin?'),
    linie(), leer(),
    p('2. Was steht in Yasmins Schlafzimmer?'),
    linie(), leer(),
    p('3. Was hängt an der Wand im Wohnzimmer?'),
    linie(), leer(),
    p('4. Was war schon in der Küche?'),
    linie(), leer(),
    p('5. Was hat Yasmin aus der Türkei mitgebracht?'),
    linie(), leer(),
    h2('Aufgabe 3: Wo steht / liegt / hängt was? Ergänze die Tabelle.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Möbel/Gegenstand', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'steht / liegt / hängt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wo?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...['das Sofa', 'der Teppich', 'der Fernseher', 'das Foto', 'der Esstisch'].map(item => new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: item, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________________________', font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('Wie richtest du dein Wohnzimmer oder Schlafzimmer ein? Was ist dir wichtig? Schreibe 3–4 Sätze.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Wohnungseinrichtung'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. F — Die Wohnung hat drei Zimmer (+ Küche + Bad).'),
    p('2. F — Das Bett steht in der Mitte des Zimmers.'),
    p('3. R — Das Sofa steht vor dem Fenster.'),
    p('4. F — Den Teppich hat Yasmin aus der Türkei mitgebracht.'),
    p('5. F — Es gab schon einen Herd und einen Kühlschrank.'),
    p('6. R — Yasmin ist sehr zufrieden.'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Yasmin kommt aus der Türkei.'),
    p('2. Im Schlafzimmer stehen ein Bett, ein Kleiderschrank und eine Kommode.'),
    p('3. An der Wand hängt ein Fernseher.'),
    p('4. In der Küche gab es schon einen Herd und einen Kühlschrank.'),
    p('5. Sie hat einen bunten Teppich aus der Türkei mitgebracht.'),
    leer(),
    h2('Aufgabe 3: Tabelle'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Möbel', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Verb', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wo?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['das Sofa', 'steht', 'vor dem Fenster'],
          ['der Teppich', 'liegt', 'auf dem Boden (Wohnzimmer)'],
          ['der Fernseher', 'hängt', 'an der Wand'],
          ['das Foto', 'steht', 'auf der Kommode'],
          ['der Esstisch', 'steht', 'in der Mitte der Küche'],
        ].map(([m, v, wo]) => new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: m, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: v, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: wo, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('→ Individuelle Antworten. Auf korrekte Präpositionen und Verbwahl achten.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Lesen_LOESUNG.docx`);
};

// ==================== LÜCKEN ====================
const createLuecken = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Wohnungseinrichtung — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten: Wähle das passende Wort.',
      'hängt | steht | liegt | stelle | hänge | lege | Schrank | Teppich | Regal | Sofa | Kommode | Herd | Bett | Vorhänge | Lampe',
    ]),
    leer(),
    h2('Aufgabe 1: Was steht, hängt oder liegt wo?'),
    p('Ergänze: steht / hängt / liegt'),
    leer(),
    p('1. Das Sofa _____________ im Wohnzimmer.'),
    leer(),
    p('2. Der Teppich _____________ auf dem Boden.'),
    leer(),
    p('3. Das Bild _____________ an der Wand.'),
    leer(),
    p('4. Der Kühlschrank _____________ in der Küche.'),
    leer(),
    p('5. Die Decke (Bettdecke) _____________ auf dem Bett.'),
    leer(),
    p('6. Die Uhr _____________ über der Tür.'),
    leer(),
    h2('Aufgabe 2: Wohin stelle / hänge / lege ich es?'),
    p('Ergänze: stelle / hänge / lege (ich)'),
    leer(),
    p('1. Ich _____________ das Buch auf den Tisch.'),
    leer(),
    p('2. Ich _____________ den Stuhl ans Fenster.'),
    leer(),
    p('3. Ich _____________ das Bild an die Wand.'),
    leer(),
    p('4. Ich _____________ die Vase auf das Regal.'),
    leer(),
    p('5. Ich _____________ den Teppich auf den Boden.'),
    leer(),
    h2('Aufgabe 3: Wohnungsbeschreibung — Lückentext'),
    p('Ergänze die fehlenden Wörter aus dem Wörterkasten oben.'),
    leer(),
    p('Meine Wohnung hat zwei Zimmer. Im Schlafzimmer gibt es ein _____________ und einen _____________. Das _____________ ist groß und hat viele Schubladen. Im Wohnzimmer steht ein großes _____________ vor dem Fenster. An der Wand hängt ein _____________ mit vielen Büchern. Auf dem Boden liegt ein dicker _____________. In der Küche steht natürlich ein _____________ — ich koche sehr gerne!'),
    leer(),
    h2('Aufgabe 4: Dialog — Wohnung zeigen'),
    p('Ergänze den Dialog. Wähle die passenden Wörter:  hell | Schlafzimmer | Schrank | gemütlich | Wohnzimmer'),
    leer(),
    p('Lars:  „Das hier ist mein _____________."'),
    leer(),
    p('Sofia:  „Oh, das ist aber _____________! Wie viele Fenster hast du?"'),
    leer(),
    p('Lars:  „Zwei. Es ist sehr _____________ hier — besonders morgens."'),
    leer(),
    p('Sofia:  „Und das nebenan — ist das das _____________?"'),
    leer(),
    p('Lars:  „Ja. Dort steht mein Bett und ein großer _____________."'),
    leer(),
    h2('Aufgabe 5: Sätze umformen'),
    p('Schreibe den Satz neu mit dem angegebenen Verb.'),
    leer(),
    p('Beispiel:  Das Buch ist auf dem Tisch. (liegen) → Das Buch liegt auf dem Tisch.'),
    leer(),
    p('1. Die Vase ist auf dem Regal. (stehen) → _____________________________________________'),
    leer(),
    p('2. Das Foto ist an der Wand. (hängen) → _____________________________________________'),
    leer(),
    p('3. Der Teppich ist auf dem Boden. (liegen) → _____________________________________________'),
    leer(),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Wohnungseinrichtung'),
    leer(),
    h2('Aufgabe 1: steht / hängt / liegt'),
    p('1. steht   2. liegt   3. hängt   4. steht   5. liegt   6. hängt'),
    leer(),
    h2('Aufgabe 2: stelle / hänge / lege'),
    p('1. lege   2. stelle   3. hänge   4. stelle   5. lege'),
    leer(),
    grammarBox([
      'Grammatik-Tipp — Wechselpräpositionen:',
      'WO? (Dativ) → Das Sofa steht im (= in dem) Wohnzimmer. | Das Bild hängt an der Wand.',
      'WOHIN? (Akkusativ) → Ich stelle das Sofa ins (= in das) Wohnzimmer. | Ich hänge das Bild an die Wand.',
      'stehen / liegen / hängen = Zustand (WO?)   |   stellen / legen / hängen = Bewegung (WOHIN?)',
    ]),
    leer(),
    h2('Aufgabe 3: Wohnungsbeschreibung'),
    p('Meine Wohnung hat zwei Zimmer. Im Schlafzimmer gibt es ein Bett und einen Schrank. Die Kommode ist groß und hat viele Schubladen. Im Wohnzimmer steht ein großes Sofa vor dem Fenster. An der Wand hängt ein Regal mit vielen Büchern. Auf dem Boden liegt ein dicker Teppich. In der Küche steht natürlich ein Herd — ich koche sehr gerne!'),
    leer(),
    h2('Aufgabe 4: Dialog'),
    p('Lars: „Das hier ist mein Wohnzimmer."'),
    p('Sofia: „Oh, das ist aber gemütlich! Wie viele Fenster hast du?"'),
    p('Lars: „Zwei. Es ist sehr hell hier — besonders morgens."'),
    p('Sofia: „Und das nebenan — ist das das Schlafzimmer?"'),
    p('Lars: „Ja. Dort steht mein Bett und ein großer Schrank."'),
    leer(),
    h2('Aufgabe 5: Sätze umformen'),
    p('1. Die Vase steht auf dem Regal.'),
    p('2. Das Foto hängt an der Wand.'),
    p('3. Der Teppich liegt auf dem Boden.'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const moebelDaten = [
    ['das Bett, -en', 'Nomen', 'Das Bett steht im Schlafzimmer.'],
    ['der Schrank, Schränke', 'Nomen', 'Im Schrank hängen meine Kleider.'],
    ['die Kommode, -n', 'Nomen', 'Die Kommode hat vier Schubladen.'],
    ['das Sofa, -s', 'Nomen', 'Das Sofa ist sehr bequem.'],
    ['der Tisch, -e', 'Nomen', 'Wir essen am Tisch in der Küche.'],
    ['das Regal, -e', 'Nomen', 'Auf dem Regal stehen viele Bücher.'],
    ['der Teppich, -e', 'Nomen', 'Der Teppich liegt auf dem Boden.'],
    ['der Vorhang, Vorhänge', 'Nomen', 'Die Vorhänge hängen am Fenster.'],
    ['die Lampe, -n', 'Nomen', 'Die Lampe steht neben dem Bett.'],
    ['die Einrichtung, -en', 'Nomen', 'Die Einrichtung ist modern und hell.'],
  ];
  const verbDaten = [
    ['stehen', 'Verb', 'Das Sofa steht vor dem Fenster.'],
    ['liegen', 'Verb', 'Das Buch liegt auf dem Tisch.'],
    ['hängen', 'Verb', 'Das Bild hängt an der Wand.'],
    ['stellen', 'Verb', 'Ich stelle den Stuhl an den Tisch.'],
    ['legen', 'Verb', 'Ich lege die Zeitung auf den Tisch.'],
    ['einrichten', 'Verb (trennb.)', 'Ich richte meine Wohnung ein.'],
    ['gemütlich', 'Adjektiv', 'Das Sofa ist sehr gemütlich.'],
    ['praktisch', 'Adjektiv', 'Der Schreibtisch ist sehr praktisch.'],
  ];

  const makeTable = (rows) => new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wort / Phrase', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Typ', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 4472, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispielsatz', bold: true, font: 'Arial', size: 22 })] })] }),
      ]}),
      ...rows.map(([wort, typ, bsp]) => new TableRow({ children: [
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: wort, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: typ, font: 'Arial', size: 22, color: '555555' })] })] }),
        new TableCell({ width: { size: 4472, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: bsp, font: 'Arial', size: 22 })] })] }),
      ]})),
    ]
  });

  const children = [
    schuelerKopf(), leer(),
    h1('Wohnungseinrichtung — Wortliste'),
    leer(),
    h2('Teil 1: Möbel und Gegenstände'),
    makeTable(moebelDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...moebelDaten.map(([wort]) => new Paragraph({
      children: [
        new TextRun({ text: `${wort}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Verben und Adjektive zur Einrichtung'),
    makeTable(verbDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...verbDaten.map(([wort]) => new Paragraph({
      children: [
        new TextRun({ text: `${wort}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    grammarBox([
      'Wechselpräpositionen — Übersicht:',
      'an, auf, hinter, in, neben, über, unter, vor, zwischen',
      '',
      'WO? → Dativ:   Das Sofa steht im Wohnzimmer. | Das Bild hängt an der Wand.',
      'WOHIN? → Akkusativ:   Ich stelle das Sofa ins Wohnzimmer. | Ich hänge das Bild an die Wand.',
      '',
      'Merktrick: stehen/liegen/hängen = WO? (Zustand) | stellen/legen/hängen = WOHIN? (Bewegung)',
    ]),
    leer(),
    p('Tipp: Schreibe die Wörter auf Karteikarten — Vorderseite Deutsch, Rückseite deine Sprache!', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Wohnungseinrichtung'),
    leer(),
    p('Die Wortliste enthält Übersetzungszeilen für individuelle Sprachen.', { color: '388E3C', italics: true }),
    p('→ Keine vorgegebene Lösung — individuelle Einträge der Lernenden akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Grammatik-Vertiefung: stehen vs. stellen'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Zustandsverb (WO?)', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Bewegungsverb (WOHIN?)', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispiel Zustand → Bewegung', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['stehen', 'stellen', 'Das Buch steht im Regal. → Ich stelle das Buch ins Regal.'],
          ['liegen', 'legen', 'Das Kissen liegt auf dem Sofa. → Ich lege das Kissen auf das Sofa.'],
          ['hängen', 'hängen', 'Das Bild hängt an der Wand. → Ich hänge das Bild an die Wand.'],
        ].map(([z, b, bsp]) => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: z, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: bsp, font: 'Arial', size: 22 })] })] }),
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
    h1('Wohnungseinrichtung — Konversation'),
    leer(),
    h2('Aufgabe 1: Die neue Wohnung zeigen'),
    p('Person A zeigt Person B die neue Wohnung. Ergänze den Dialog und übt ihn zu zweit.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['A:', 'Komm rein! Das hier ist mein _____________. (Wohnzimmer / Schlafzimmer)'],
          ['B:', '________________________________! Das ist wirklich _____________.'],
          ['A:', 'Ja, das Sofa habe ich gebraucht gekauft. Es steht _____________ dem Fenster.'],
          ['B:', 'Und was hängt dort _____________ der Wand?'],
          ['A:', 'Das ist ein Bild von meiner Familie. Ich habe es _____________ die Wand gehängt.'],
          ['B:', 'Sehr schön! Wie lange hast du die Wohnung schon?'],
          ['A:', 'Erst zwei Monate. Ich richte sie noch _____________.'],
          ['B:', 'Wenn du Hilfe brauchst, helfe ich dir gerne!'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, font: 'Arial', size: 22, bold: true })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen! Person B spielt jetzt die Gastgeberin.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Freunde vergleichen Wohnungen'),
    p('Lest die Informationen und diskutiert: Welche Wohnung ist besser? Warum?'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF9C4' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Wohnung 1 — Lisa', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• 45 qm, 1 Zimmer + Küche', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• Modern eingerichtet', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• 650 € Warmmiete', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• Zentrum, viel Lärm', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Wohnung 2 — Tobias', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• 70 qm, 3 Zimmer', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• Alte Möbel, gemütlich', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• 850 € Warmmiete', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: '• Außenbezirk, ruhig', font: 'Arial', size: 22 })] }),
          ]}),
        ]}),
      ]
    }),
    leer(),
    p('Diskutiert: Was ist besser? Nutzt: … ist größer / kleiner / teurer / billiger / ruhiger / lauter als …'),
    leer(),
    ...Array(4).fill(null).map(linie),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Meine Wohnung'),
    p('Frag deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    leer(),
    p('1. Wie viele Zimmer hat deine Wohnung?'),
    linie(), leer(),
    p('2. Was steht in deinem Wohnzimmer?'),
    linie(), leer(),
    p('3. Hast du einen Lieblingsplatz zu Hause? Wo ist er?'),
    linie(), leer(),
    p('4. Was fehlt noch in deiner Wohnung? Was möchtest du kaufen?'),
    linie(), leer(),
    p('5. Wie hast du deine Wohnung eingerichtet — eher modern oder gemütlich?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenspiel — Möbel-Staffette'),
    p('Macht eine Kette. Person A nennt ein Möbelstück + Zimmer. Person B wiederholt und ergänzt eins. Usw.'),
    p('Beispiel: „Im Schlafzimmer steht ein Bett." — „Im Schlafzimmer stehen ein Bett und ein Schrank." — …'),
    leer(),
    p('Wer macht einen Fehler, scheidet aus. Wer bleibt am längsten dabei?', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Wohnungseinrichtung'),
    leer(),
    h2('Aufgabe 1: Dialog — mögliche Lösungen'),
    p('A: „… mein Wohnzimmer."'),
    p('B: „Wow! Das ist wirklich gemütlich / schön / groß."'),
    p('A: „… Es steht vor dem Fenster."'),
    p('B: „… an der Wand?"'),
    p('A: „… Ich habe es an die Wand gehängt."'),
    p('A: „Ich richte sie noch ein."'),
    leer(),
    p('→ Grammatik bewerten: Dativ WO (vor dem Fenster, an der Wand) vs. Akkusativ WOHIN (an die Wand).', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Wohnungsvergleich — Diskussionspunkte'),
    bullet('Wohnung 1 ist kleiner, aber billiger und zentral.'),
    bullet('Wohnung 2 hat mehr Platz und ist ruhiger, aber teurer.'),
    bullet('Wohnung 1 ist moderner eingerichtet.'),
    bullet('Wohnung 2 ist gemütlicher (alte Möbel).'),
    leer(),
    p('→ Kein eindeutig richtiges Ergebnis — Argumentation und Sprachkompetenz bewerten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Bewertungskriterien Konversation'),
    bullet('Korrekte Verwendung von stehen/hängen/liegen (Zustand) und stellen/hängen/legen (Bewegung)'),
    bullet('Korrekte Wechselpräpositionen: Dativ (WO) / Akkusativ (WOHIN)'),
    bullet('Vergleiche mit Komparativ: größer als / ruhiger als / moderner als'),
    bullet('Satzfluss und kommunikative Kompetenz'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Wohnungseinrichtung — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Das Wohnzimmer beschreiben'),
    p('[BILD 1: Ein Wohnzimmer mit Sofa, Couchtisch, Fernseher an der Wand, Teppich auf dem Boden, Regal mit Büchern, Fenster mit Vorhängen]'),
    leer(),
    p('Beschreibe das Bild. Was siehst du? Wo steht / liegt / hängt was?'),
    p('Benutze: steht / liegt / hängt / vor / an / auf / neben / über'),
    leer(),
    ...Array(5).fill(null).map(linie),
    leer(),
    h2('Aufgabe 2: Grundriss beschriften'),
    p('[BILD 2: Einfacher Grundriss einer 2-Zimmer-Wohnung — Schlafzimmer, Wohnzimmer, Küche, Badezimmer, Flur sind eingezeichnet aber nicht beschriftet]'),
    leer(),
    p('Schreibe die richtigen Raumnamen in den Grundriss:'),
    bullet('das Schlafzimmer'),
    bullet('das Wohnzimmer'),
    bullet('die Küche'),
    bullet('das Badezimmer'),
    bullet('der Flur'),
    leer(),
    p('Ergänze dann: In welchem Zimmer stehen diese Möbel?'),
    leer(),
    p('Das Bett steht im _____________.'),
    p('Das Sofa steht im _____________.'),
    p('Der Herd steht in der _____________.'),
    p('Die Waschmaschine steht im _____________.'),
    leer(),
    h2('Aufgabe 3: Meine Traumwohnung zeichnen und beschreiben'),
    p('[BILD 3: Leere Vorlage — leeres Rechteck als Grundriss zum Einzeichnen]'),
    leer(),
    p('Zeichne deine Traumwohnung in den Grundriss. Beschrifte die Zimmer und Möbel.'),
    p('Schreibe dann 5 Sätze: Was steht wo? Was gefällt dir an deiner Traumwohnung?'),
    leer(),
    ...Array(5).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Bild vergleichen — vorher und nachher'),
    p('[BILD 4a: Ein leeres, uneingerichtetes Zimmer]'),
    p('[BILD 4b: Dasselbe Zimmer, jetzt mit Möbeln eingerichtet — Bett, Schrank, Teppich, Lampe, Bilder an der Wand]'),
    leer(),
    p('Was hat sich verändert? Vergleiche die beiden Bilder. Schreibe 4–5 Sätze.'),
    p('Benutze: Jetzt steht … | Früher war … leer. | An der Wand hängt jetzt … | Es gibt jetzt …'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Wohnungseinrichtung'),
    leer(),
    p('Hinweis: Die Antworten hängen von den eingefügten Bildern ab. Die folgenden Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Wohnzimmer beschreiben — Musterantworten'),
    bullet('Das Sofa steht vor dem Fenster.'),
    bullet('Auf dem Boden liegt ein großer Teppich.'),
    bullet('An der Wand hängt ein Fernseher.'),
    bullet('Auf dem Regal stehen viele Bücher.'),
    bullet('Vor dem Sofa steht ein kleiner Couchtisch.'),
    leer(),
    h2('Aufgabe 2: Grundriss'),
    p('Erwartete Raumnamen: Schlafzimmer, Wohnzimmer, Küche, Badezimmer, Flur.'),
    p('Das Bett steht im Schlafzimmer.'),
    p('Das Sofa steht im Wohnzimmer.'),
    p('Der Herd steht in der Küche.'),
    p('Die Waschmaschine steht im Badezimmer.'),
    leer(),
    h2('Aufgabe 3: Traumwohnung'),
    p('→ Individuelle Zeichnungen und Texte. Korrekte Verwendung der Wechselpräpositionen und stehen/hängen/liegen bewerten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 4: Vorher-nachher — Musterantworten'),
    bullet('Früher war das Zimmer leer. Jetzt ist es eingerichtet.'),
    bullet('Jetzt steht ein Bett an der Wand.'),
    bullet('An der Wand hängen jetzt zwei Bilder.'),
    bullet('Auf dem Boden liegt jetzt ein Teppich.'),
    bullet('Neben dem Bett steht eine Lampe.'),
    leer(),
    p('→ Auf korrekten Gebrauch von Dativ (WO?) und Akkusativ (WOHIN?) achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Wechselpräpositionen korrekt (Dativ = WO? / Akkusativ = WOHIN?)'),
    bullet('Verben stehen / liegen / hängen korrekt angewendet'),
    bullet('Beschreibung klar und vollständig'),
    bullet('Komparativ bei Vergleichen: größer als / moderner als'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Wohnungseinrichtung');
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
