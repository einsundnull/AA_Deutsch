'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Einkaufen_02_KleidungReklamieren';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '03_Einkaufen', '02_KleidungReklamieren');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Einkaufen & Dienstleistungen — Kleidung kaufen und reklamieren', italics: true, size: 18, color: '888888', font: 'Arial' })]
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
    h1('Kleidung kaufen und reklamieren — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Phrasen beim Kleidungskauf:',
      'Darf ich das anprobieren? / Wo ist die Umkleidekabine?',
      'Das passt mir gut. / Das ist zu groß / zu klein / zu eng / zu weit / zu lang / zu kurz.',
      'Das steht dir / Ihnen sehr gut!     Haben Sie das auch in Größe M / in Blau?',
      'Ich möchte das umtauschen. / Ich möchte das zurückgeben. / Hier ist der Kassenbon.',
      'Das ist defekt. / Die Naht ist aufgegangen. / Die Farbe ist ausgelaufen.',
    ]),
    leer(),
    h2('Aufgabe 1: Im Kleidungsgeschäft — Dialog schreiben'),
    p('Du bist im Geschäft und möchtest eine Jacke kaufen. Du probierst zwei Jacken an — eine passt, eine passt nicht. Schreibe den Dialog mit der Verkäuferin (mindestens 8 Zeilen).'),
    p('Erwähne: Größe, Farbe, Preis, Anprobieren, deine Meinung.'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Verkäuferin:  „_____________________________________________"'),
    leer(),
    h2('Aufgabe 2: Eine Reklamation schreiben'),
    p('Du hast online einen Pullover bestellt. Er ist angekommen, aber: die Farbe ist anders als auf dem Foto (dunkelblau statt hellblau), und an der Ärmelnaht ist ein Loch.'),
    p('Schreibe eine E-Mail an den Kundenservice. Erkläre das Problem und fordere Ersatz oder Rückerstattung.'),
    leer(),
    p('Betreff: Reklamation — Bestellnummer 48271', { bold: true }),
    leer(),
    p('Sehr geehrte Damen und Herren,'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    p('Mit freundlichen Grüßen,'),
    p('___________________________'),
    leer(),
    h2('Aufgabe 3: Kleidung beschreiben'),
    p('Beschreibe dein heutiges Outfit in 4–5 Sätzen. Was trägst du? Welche Farbe, welches Material, welche Größe? Was gefällt dir daran?'),
    p('Benutze Adjektive: rot, blau, gestreift, kariert, eng, weit, warm, leicht, weich …'),
    leer(),
    ...Array(5).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Freies Schreiben — Mein Kleidungsstil'),
    p('Wie ist dein Kleidungsstil? Kaufst du lieber im Geschäft oder online? Was ist dir wichtig (Preis, Qualität, Marke, Nachhaltigkeit)? Schreibe 4–5 Sätze.'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Kleidung kaufen und reklamieren'),
    leer(),
    h2('Aufgabe 1: Dialog — Musterlösung'),
    p('Du: „Entschuldigung, ich suche eine Winterjacke. Haben Sie etwas in Größe M?"'),
    p('Verkäuferin: „Natürlich! Wir haben diese blaue Jacke hier — 89,99 Euro. Und diese schwarze für 69,99 Euro."'),
    p('Du: „Darf ich die blaue anprobieren?"'),
    p('Verkäuferin: „Natürlich! Die Umkleidekabine ist dort drüben."'),
    p('Du: „Die blaue ist leider zu eng. Haben Sie die auch in Größe L?"'),
    p('Verkäuferin: „Ja, einen Moment … Hier bitte."'),
    p('Du: „Die passt perfekt! Und das Blau gefällt mir sehr gut. Ich nehme sie."'),
    p('Verkäuferin: „Sehr schön! Das steht Ihnen wirklich gut. Ich bringe Sie zur Kasse."'),
    leer(),
    p('→ Individuelle Dialoge akzeptieren. Auf korrekte Adjektivendungen achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Reklamations-E-Mail — Musterlösung'),
    p('Betreff: Reklamation — Bestellnummer 48271', { bold: true }),
    p('Sehr geehrte Damen und Herren,'),
    p('ich habe am [Datum] über Ihren Online-Shop einen Pullover bestellt (Bestellnummer 48271).'),
    p('Leider entspricht die gelieferte Ware nicht meiner Bestellung:'),
    p('1. Die Farbe ist dunkelblau, auf dem Foto war der Pullover hellblau.'),
    p('2. An der linken Ärmelnaht hat sich ein Loch gebildet.'),
    p('Ich bitte Sie, mir entweder einen Ersatz zu schicken oder den Kaufpreis zurückzuerstatten.'),
    p('Den Pullover sende ich bei Bedarf zurück. Ich füge den Kassenbon als Anhang bei.'),
    p('Mit freundlichen Grüßen, [Name]'),
    leer(),
    h2('Aufgaben 3 und 4'),
    p('→ Individuelle Antworten. Auf Adjektivendungen (ein roter Pullover / eine blaue Jacke) achten.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Kleidung kaufen und reklamieren — Leseübung'),
    leer(),
    h2('Lesetext: „Das falsche Kleid"'),
    leer(),
    p('Sofia Petrov kommt aus Bulgarien und wohnt seit drei Jahren in Hamburg. Sie liebt Mode und kauft gerne Kleidung — meistens online, weil es bequemer ist. Aber manchmal gibt es Probleme.'),
    leer(),
    p('Letzte Woche hat Sofia ein rotes Abendkleid in Größe 38 bestellt. Es sollte 45 Euro kosten und aus 100% Baumwolle sein. Als das Paket ankam, war Sofia enttäuscht: Das Kleid war nicht rot, sondern dunkelorange. Außerdem war es viel zu groß — es passte eher zu Größe 42. Und das Material? Auf dem Etikett stand „60% Polyester, 40% Baumwolle."'),
    leer(),
    p('Sofia hat sofort den Kundenservice des Online-Shops angerufen. Die Mitarbeiterin war freundlich: „Es tut uns leid! Das war ein Fehler in unserem Lager. Sie können das Kleid kostenlos zurückschicken." Sofia hat das Kleid zurückgeschickt und ihr Geld nach fünf Tagen zurückbekommen.'),
    leer(),
    p('Danach ist Sofia in ein Modegeschäft in der Innenstadt gegangen. Dort hat sie ein grünes Kleid in Größe 38 anprobiert. „Das steht Ihnen wirklich gut!", sagte die Verkäuferin. Sofia hat sich im Spiegel angeschaut und gelächelt. „Ja, das nehme ich!"'),
    leer(),
    p('Seitdem kauft Sofia wichtige Kleidungsstücke lieber im Geschäft. „Online ist praktisch, aber man kann die Qualität nicht sehen und nicht anprobieren", sagt sie.'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Sofia kauft Kleidung meistens im Geschäft.  ___'),
    p('2. Das bestellte Kleid war rot und aus Baumwolle.  ___'),
    p('3. Das gelieferte Kleid war zu klein.  ___'),
    p('4. Das Material stimmte nicht mit der Beschreibung überein.  ___'),
    p('5. Sofia musste Rücksendekosten bezahlen.  ___'),
    p('6. Im Geschäft hat Sofia ein grünes Kleid gekauft.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Was war falsch an dem gelieferten Kleid? Nenne drei Probleme.'),
    linie(), linie(), leer(),
    p('2. Wie hat der Kundenservice reagiert?'),
    linie(), leer(),
    p('3. Warum kauft Sofia jetzt lieber im Geschäft?'),
    linie(), linie(), leer(),
    h2('Aufgabe 3: Adjektive aus dem Text'),
    p('Suche im Text alle Adjektive, die Kleidung beschreiben (Farbe, Material, Größe, Passform). Trage sie in die Tabelle ein.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Adjektiv im Text', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Kategorie', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispielsatz aus dem Text', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...Array(5).fill(null).map(() => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________', font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '___________________________', font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('Kaufst du Kleidung lieber online oder im Geschäft? Was sind die Vorteile und Nachteile? Schreibe 3–4 Sätze.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Kleidung kaufen und reklamieren'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. F — Sofia kauft meistens online.'),
    p('2. F — Es sollte rot und aus 100% Baumwolle sein, aber es war orange und aus 60% Polyester.'),
    p('3. F — Das Kleid war zu groß (eher Größe 42, nicht 38).'),
    p('4. R — Das Material war 60% Polyester, nicht 100% Baumwolle.'),
    p('5. F — Das Zurückschicken war kostenlos.'),
    p('6. R — Im Geschäft hat Sofia ein grünes Kleid gekauft.'),
    leer(),
    h2('Aufgabe 2: Fragen'),
    p('1. Drei Probleme: falsche Farbe (orange statt rot), falsche Größe (zu groß), falsches Material (Polyester statt Baumwolle).'),
    p('2. Die Mitarbeiterin war freundlich, entschuldigte sich und bot kostenlosen Rückversand an.'),
    p('3. Weil man online die Qualität nicht sehen und nicht anprobieren kann.'),
    leer(),
    h2('Aufgabe 3: Adjektive aus dem Text'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Adjektiv', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Kategorie', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Textstelle', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['rotes', 'Farbe', 'ein rotes Abendkleid'],
          ['dunkelorange', 'Farbe', 'war nicht rot, sondern dunkelorange'],
          ['zu groß', 'Größe/Passform', 'es war viel zu groß'],
          ['grünes', 'Farbe', 'ein grünes Kleid'],
          ['freundlich', 'Eigenschaft', 'Die Mitarbeiterin war freundlich'],
        ].map(([a, k, t]) => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: a, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: k, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 22 })] })] }),
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
    h1('Kleidung kaufen und reklamieren — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'anprobieren | passt | steht | umtauschen | zurückgeben | Kassenbon | Größe | defekt',
      'zu eng | zu weit | Reklamation | Naht | Etikett | Umkleidekabine | Garantie | ausgelaufen',
    ]),
    leer(),
    h2('Aufgabe 1: Im Kleidungsgeschäft'),
    p('Ergänze den Text mit passenden Wörtern aus dem Wörterkasten.'),
    leer(),
    p('Kai sucht eine neue Hose. Er findet eine blaue Hose in _____________ 32. Er fragt die Verkäuferin: „Darf ich die _____________?" Sie zeigt ihm die _____________. Kai probiert die Hose an, aber sie _____________ nicht gut — sie ist _____________ an den Oberschenkeln. „Haben Sie die auch in einer Nummer größer?" fragt er. Die Verkäuferin bringt ihm Größe 34. Die _____________ ihm viel besser. Er kauft sie.'),
    leer(),
    h2('Aufgabe 2: Eine Reklamation'),
    p('Ergänze den Dialog. Wähle: Kassenbon | defekt | umtauschen | Garantie | Naht'),
    leer(),
    p('Kundin:  „Entschuldigung, ich habe diesen Pullover letzte Woche gekauft. Er ist leider _____________ — an der _____________ ist ein Loch."'),
    leer(),
    p('Verkäufer:  „Oh, das tut mir leid! Haben Sie noch den _____________?"'),
    leer(),
    p('Kundin:  „Ja, hier. Kann ich ihn _____________?"'),
    leer(),
    p('Verkäufer:  „Natürlich! Wir haben noch _____________ auf das Produkt — kein Problem."'),
    leer(),
    h2('Aufgabe 3: Adjektivendungen ergänzen'),
    p('Ergänze die richtige Adjektivendung.'),
    leer(),
    grammarBox([
      'Adjektivendungen nach unbestimmtem Artikel (ein/eine/ein):',
      '  Maskulinum:  ein rot-er Pullover   |   Akkusativ: einen rot-en Pullover',
      '  Femininum:   eine blau-e Jacke     |   Akkusativ: eine blau-e Jacke',
      '  Neutrum:     ein weiß-es Hemd      |   Akkusativ: ein weiß-es Hemd',
    ]),
    leer(),
    p('1. Ich kaufe ein___ rot___ Pullover.  (Akkusativ, Maskulinum)'),
    leer(),
    p('2. Das ist ein___ schön___ Kleid.  (Nominativ, Neutrum)'),
    leer(),
    p('3. Ich suche ein___ warm___ Jacke.  (Akkusativ, Femininum)'),
    leer(),
    p('4. Er trägt ein___ gestreift___ Hemd.  (Akkusativ, Neutrum)'),
    leer(),
    p('5. Sie hat ein___ neu___ Mantel gekauft.  (Akkusativ, Maskulinum)'),
    leer(),
    p('6. Hast du ein___ schwarz___ Hose?  (Akkusativ, Femininum)'),
    leer(),
    h2('Aufgabe 4: passen / stehen — Dativ'),
    p('Ergänze das richtige Pronomen im Dativ: mir / dir / ihm / ihr / uns / Ihnen'),
    leer(),
    p('1. „Wie gefällt _____________ das Kleid?" — „Es gefällt _____________ sehr gut!"  (ich)'),
    leer(),
    p('2. Die Jacke passt _____________ nicht — sie ist zu klein.  (er)'),
    leer(),
    p('3. Das steht _____________ wirklich gut!  (Sie — formell)'),
    leer(),
    p('4. „Passt dir die Hose?" — „Nein, sie passt _____________ nicht. Zu eng."  (ich)'),
    leer(),
    p('5. Das Hemd steht _____________ super — die Farbe passt zu deinen Augen.  (du)'),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Kleidung kaufen und reklamieren'),
    leer(),
    h2('Aufgabe 1: Im Kleidungsgeschäft'),
    p('Größe | anprobieren | Umkleidekabine | passt | zu eng | passt / steht'),
    leer(),
    p('Vollständiger Text:'),
    p('… Größe 32. Er fragt: „Darf ich die anprobieren?" Sie zeigt ihm die Umkleidekabine. … sie passt nicht gut — sie ist zu eng … Die passt ihm viel besser.'),
    leer(),
    h2('Aufgabe 2: Reklamation'),
    p('defekt | Naht | Kassenbon | umtauschen | Garantie'),
    leer(),
    h2('Aufgabe 3: Adjektivendungen'),
    p('1. einen roten Pullover  (Akkusativ Mask. → -en)'),
    p('2. ein schönes Kleid  (Nominativ Neutr. → -es)'),
    p('3. eine warme Jacke  (Akkusativ Fem. → -e)'),
    p('4. ein gestreiftes Hemd  (Akkusativ Neutr. → -es)'),
    p('5. einen neuen Mantel  (Akkusativ Mask. → -en)'),
    p('6. eine schwarze Hose  (Akkusativ Fem. → -e)'),
    leer(),
    grammarBox([
      'Zusammenfassung Adjektivendungen nach ein/eine/ein:',
      '  Nominativ:   -er (mask.) / -e (fem.) / -es (neutr.)',
      '  Akkusativ:   -en (mask.) / -e (fem.) / -es (neutr.)',
      '  Dativ:       -em (mask.) / -er (fem.) / -em (neutr.)',
    ]),
    leer(),
    h2('Aufgabe 4: passen / stehen — Dativ'),
    p('1. mir | mir  (ich → Dativ: mir)'),
    p('2. ihm  (er → Dativ: ihm)'),
    p('3. Ihnen  (Sie formell → Dativ: Ihnen)'),
    p('4. mir  (ich → Dativ: mir)'),
    p('5. dir  (du → Dativ: dir)'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const kleidungDaten = [
    ['das Kleid, -er', 'Nomen', 'Sie trägt ein rotes Kleid.'],
    ['die Jacke, -n', 'Nomen', 'Diese Jacke ist warm und praktisch.'],
    ['der Pullover, -', 'Nomen', 'Er kauft einen blauen Pullover.'],
    ['die Hose, -n', 'Nomen', 'Die schwarze Hose passt mir gut.'],
    ['das Hemd, -en', 'Nomen', 'Er trägt ein weißes Hemd.'],
    ['der Mantel, Mäntel', 'Nomen', 'Im Winter brauche ich einen Mantel.'],
    ['die Größe, -n', 'Nomen', 'Welche Größe haben Sie? — Größe 38.'],
    ['die Umkleidekabine, -n', 'Nomen', 'Darf ich die Umkleidekabine benutzen?'],
    ['anprobieren', 'Verb (trennb.)', 'Ich probiere die Jacke an.'],
    ['passen + Dativ', 'Verb', 'Die Hose passt mir nicht — zu eng.'],
    ['stehen + Dativ', 'Verb', 'Das Kleid steht dir wirklich gut!'],
    ['umtauschen', 'Verb (trennb.)', 'Ich möchte das Hemd umtauschen.'],
  ];

  const reklamDaten = [
    ['die Reklamation, -en', 'Nomen', 'Ich mache eine Reklamation.'],
    ['defekt', 'Adjektiv', 'Das Gerät ist defekt — es funktioniert nicht.'],
    ['die Naht, Nähte', 'Nomen', 'Die Naht am Ärmel ist aufgegangen.'],
    ['das Etikett, -s', 'Nomen', 'Auf dem Etikett steht die Größe.'],
    ['der Kassenbon, -s', 'Nomen', 'Ohne Kassenbon kein Umtausch.'],
    ['die Garantie, -n', 'Nomen', 'Das Produkt hat zwei Jahre Garantie.'],
    ['zurückgeben', 'Verb (trennb.)', 'Ich möchte das Kleid zurückgeben.'],
    ['auslaufen (Farbe)', 'Verb (trennb.)', 'Die Farbe ist beim Waschen ausgelaufen.'],
  ];

  const makeTable = (rows) => new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wort / Phrase', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Typ', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 4272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispielsatz', bold: true, font: 'Arial', size: 22 })] })] }),
      ]}),
      ...rows.map(([w, t, b]) => new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: w, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: t, font: 'Arial', size: 22, color: '555555' })] })] }),
        new TableCell({ width: { size: 4272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
      ]})),
    ]
  });

  const children = [
    schuelerKopf(), leer(),
    h1('Kleidung kaufen und reklamieren — Wortliste'),
    leer(),
    h2('Teil 1: Kleidungsstücke und Einkaufen'),
    makeTable(kleidungDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...kleidungDaten.slice(0, 7).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Reklamation und Rückgabe'),
    makeTable(reklamDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...reklamDaten.slice(0, 5).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    grammarBox([
      'Adjektive für Kleidung — Farbe, Material, Passform:',
      'Farben:    rot | blau | grün | schwarz | weiß | grau | gelb | lila | beige | gestreift | kariert',
      'Material:  Baumwolle | Wolle | Seide | Leinen | Polyester | Leder | Synthetik',
      'Passform:  zu eng | zu weit | zu lang | zu kurz | zu groß | zu klein | perfekt | bequem',
      '',
      'stehen + Dativ:    Das steht dir / Ihnen / ihm / ihr gut.',
      'passen + Dativ:    Das passt mir / dir / ihm / ihr / uns / Ihnen.',
    ]),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Kleidung kaufen und reklamieren'),
    leer(),
    p('→ Individuelle Übersetzungen akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Zusatz: Aufbau einer Reklamation'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Schritt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 7272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagen / schreiben?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Problem nennen', 'Ich habe … gekauft, aber leider ist … defekt / falsch / beschädigt.'],
          ['Beleg vorzeigen', 'Hier ist mein Kassenbon / meine Bestellnummer.'],
          ['Lösung fordern', 'Ich möchte das umtauschen. / Ich möchte mein Geld zurück.'],
          ['Frist setzen (E-Mail)', 'Ich bitte um eine Antwort bis zum [Datum].'],
          ['Abschluss', 'Mit freundlichen Grüßen, [Name]'],
        ].map(([s, w]) => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: s, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 7272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: w, font: 'Arial', size: 22 })] })] }),
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
    h1('Kleidung kaufen und reklamieren — Konversation'),
    leer(),
    h2('Aufgabe 1: Im Kleidungsgeschäft — Dialog'),
    p('Person A ist Kunde/Kundin, Person B ist Verkäufer/in. Ergänzt und übt den Dialog.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['B:', 'Guten Tag! Kann ich Ihnen helfen?'],
          ['A:', 'Ja, ich suche _____________ in Größe _____________.'],
          ['B:', 'Welche Farbe bevorzugen Sie?'],
          ['A:', 'Am liebsten _____________ oder _____________.'],
          ['B:', 'Hier hätten wir diese Modelle. Möchten Sie etwas _____________?'],
          ['A:', 'Ja, gerne. Wo ist die _____________?'],
          ['B:', 'Dort drüben, die zweite Tür links.'],
          ['A:', 'Das _____________ leider nicht — es ist zu _____________. Haben Sie eine Nummer _____________?'],
          ['B:', 'Ich schaue nach … Hier, Größe ___. Wie _____________ das jetzt?'],
          ['A:', 'Perfekt! Das _____________ mir gut. Wie viel _____________ das?'],
          ['B:', 'Das _____________ 59,99 Euro.'],
          ['A:', 'Gut, ich _____________ es.'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen!', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Rollenspiel — Reklamation'),
    p('Spielt die Situation. Dann tauscht die Rollen.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person A — Kundin', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Du hast vor 3 Tagen eine Hose gekauft.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Problem: Ein Knopf fehlt, Naht am Bein ist offen.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Du hast den Kassenbon noch.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Ziel: Umtausch oder Rückgabe.', font: 'Arial', size: 22, italics: true })] }),
        ]}),
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person B — Verkäufer', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Du arbeitest im Geschäft.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Das Geschäft hat 30 Tage Umtauschrecht.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Kassenbon ist Pflicht für den Umtausch.', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Biete: Umtausch oder Gutschein.', font: 'Arial', size: 22, italics: true })] }),
        ]}),
      ]})]
    }),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Kleidung und Stil'),
    p('Frag deinen Partner / deine Partnerin und notiere die Antworten.'),
    leer(),
    p('1. Was trägst du am liebsten — legere oder formelle Kleidung?'),
    linie(), leer(),
    p('2. Was war dein teuerster oder schönster Kleidungskauf?'),
    linie(), leer(),
    p('3. Hast du schon einmal eine Reklamation gemacht? Was war das Problem?'),
    linie(), leer(),
    p('4. Was kaufst du lieber — online oder im Geschäft? Warum?'),
    linie(), leer(),
    p('5. Welche Farben und Materialien magst du gerne bei Kleidung?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenspiel — Kleidung beschreiben'),
    p('Person A beschreibt ein Kleidungsstück (ohne den Namen zu nennen). Die anderen erraten, was es ist.'),
    p('Beispiel: „Es ist ein Kleidungsstück für den Oberkörper. Es hat lange Ärmel. Es ist oft aus Baumwolle oder Wolle. Man trägt es im Winter." → Pullover'),
    leer(),
    p('Benutzt: Es ist aus … / Es hat … / Man trägt es … / Es ist meistens … / Es ist zu …'),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Kleidung kaufen und reklamieren'),
    leer(),
    h2('Aufgabe 1: Dialog — mögliche Lösungen'),
    p('A: „… eine Jacke / Hose / … in Größe M / 38 / …"'),
    p('A: „… blau oder schwarz / rot oder weiß …"'),
    p('B: „… anprobieren?"'),
    p('A: „Umkleidekabine"'),
    p('A: „Das passt leider nicht — zu eng / groß / lang … größer / kleiner."'),
    p('B: „Wie passt das jetzt?"'),
    p('A: „passt / steht … kostet … nimmt"'),
    leer(),
    p('→ Auf stehen/passen + Dativ achten: Das passt mir / steht mir gut.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Reklamation — Bewertungskriterien'),
    bullet('Problem klar und höflich beschreiben (Knopf fehlt, Naht offen)'),
    bullet('Kassenbon anbieten / vorzeigen'),
    bullet('Klare Forderung: umtauschen oder zurückgeben'),
    bullet('Person B: Umtauschrecht erklären, Lösung anbieten'),
    bullet('Beide: korrekte Sie-Form'),
    leer(),
    h2('Aufgabe 4: Gruppenspiel — Beispiele'),
    p('Hemd: Oberkörper, Knöpfe vorne, oft aus Baumwolle, formell oder leger.'),
    p('Rock: Unterleib, für Frauen, kurz oder lang, kein Hosenbein.'),
    p('Mantel: Langer Oberkörper-Schutz, Winter, über anderen Kleidungsstücken.'),
    p('Strumpfhose: Beine und Unterleib, dünn, für Frauen, oft unter Kleidern/Röcken.'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Kleidung kaufen und reklamieren — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Outfits beschreiben'),
    p('[BILD 1: Vier Personen mit verschiedenen Outfits — Person A: Anzug und Krawatte; Person B: Jeans und Pullover; Person C: Kleid und Jacke; Person D: Sportkleidung]'),
    leer(),
    p('Beschreibe jedes Outfit. Welche Kleidungsstücke trägt die Person? Welche Farben? Für welchen Anlass ist das Outfit geeignet?'),
    leer(),
    p('Person A: _______________________________________________'),
    leer(),
    p('Person B: _______________________________________________'),
    leer(),
    p('Person C: _______________________________________________'),
    leer(),
    p('Person D: _______________________________________________'),
    leer(),
    h2('Aufgabe 2: Im Geschäft — was passiert?'),
    p('[BILD 2: Eine Frau steht vor einem Spiegel in einer Umkleidekabine. Sie trägt ein Kleid. Die Verkäuferin steht daneben und lächelt. Im Hintergrund sieht man Kleiderständer.]'),
    leer(),
    p('1. Was passiert auf dem Bild?'),
    linie(), leer(),
    p('2. Was sagt die Verkäuferin wahrscheinlich? Schreibe einen Satz.'),
    linie(), leer(),
    p('3. Was sagt die Kundin? Schreibe zwei mögliche Reaktionen — eine positive, eine negative.'),
    leer(),
    p('Positiv:  „_____________________________________________"'),
    leer(),
    p('Negativ:  „_____________________________________________"'),
    leer(),
    h2('Aufgabe 3: Preisschilder lesen'),
    p('[BILD 3: Drei Preisschilder an Kleidungsstücken:'),
    p('  Pullover: Größe M | Farbe: dunkelblau | Material: 80% Wolle, 20% Polyester | Preis: 49,99 €'),
    p('  Jacke: Größe L | Farbe: schwarz | Material: 100% Baumwolle | Preis: 89,99 € — Sonderangebot: 69,99 €'),
    p('  Kleid: Größe 38 | Farbe: rot | Material: 100% Seide | Preis: 129,00 €]'),
    leer(),
    p('1. Welches Kleidungsstück ist im Sonderangebot?'),
    linie(), leer(),
    p('2. Wie viel spart man beim Sonderangebot?'),
    linie(), leer(),
    p('3. Welches Kleidungsstück ist am teuersten? Warum könnte es so teuer sein?'),
    linie(), leer(),
    p('4. Du möchtest den Pullover kaufen. Schreibe 2 Sätze, in denen du ihn beschreibst.'),
    linie(), linie(), leer(),
    h2('Aufgabe 4: Defektes Kleidungsstück beschreiben'),
    p('[BILD 4: Nahaufnahme einer Jacke mit sichtbaren Mängeln: ein fehlender Knopf, eine aufgegangene Naht an der Schulter, ein Fleck am Ärmel]'),
    leer(),
    p('Du möchtest diese Jacke reklamieren. Schreibe, was du dem Verkäufer sagst.'),
    p('Nenne alle drei Mängel. Benutze: defekt / fehlt / ist aufgegangen / hat einen Fleck'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Kleidung kaufen und reklamieren'),
    leer(),
    p('Hinweis: Antworten hängen von den eingefügten Bildern ab. Folgende Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Outfits — Musterantworten'),
    p('Person A: Er trägt einen dunklen Anzug mit weißem Hemd und Krawatte. Das ist formelle Kleidung — geeignet für Arbeit oder ein Meeting.'),
    p('Person B: Sie/er trägt blaue Jeans und einen grauen Pullover. Das ist legere Kleidung für den Alltag.'),
    p('Person C: Sie trägt ein geblümtes Kleid und eine leichte Jacke — geeignet für einen Ausflug oder ein Café.'),
    p('Person D: Er/sie trägt Sportkleidung (Trainingsanzug, Turnschuhe) — für Sport oder Freizeit.'),
    leer(),
    h2('Aufgabe 2: Im Geschäft'),
    p('1. Eine Frau probiert ein Kleid in der Umkleidekabine an. Die Verkäuferin gibt ihr Feedback.'),
    p('2. Verkäuferin: „Das steht Ihnen wirklich gut! Die Farbe passt perfekt zu Ihnen."'),
    p('Positiv: „Das gefällt mir sehr! Ich nehme es."'),
    p('Negativ: „Es passt mir leider nicht — es ist zu eng. Haben Sie es in einer Größe größer?"'),
    leer(),
    h2('Aufgabe 3: Preisschilder'),
    p('1. Die Jacke ist im Sonderangebot (89,99 € → 69,99 €).'),
    p('2. Man spart 20,00 Euro.'),
    p('3. Das Kleid ist am teuersten (129,00 €) — weil es aus 100% Seide ist. Seide ist ein sehr hochwertiges Material.'),
    p('4. Ich kaufe einen dunkelblauen Pullover in Größe M. Er ist aus 80% Wolle und kostet 49,99 Euro.'),
    leer(),
    h2('Aufgabe 4: Reklamation — Musterantworten'),
    p('„Entschuldigung, ich möchte diese Jacke reklamieren. Sie hat drei Mängel:'),
    p('Erstens fehlt ein Knopf. Zweitens ist die Naht an der Schulter aufgegangen.'),
    p('Und drittens hat der Ärmel einen Fleck. Ich habe noch den Kassenbon."'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Kleidungsstücke korrekt benennen (mit Artikel)'),
    bullet('Adjektivendungen korrekt: ein dunkler Anzug, ein rotes Kleid'),
    bullet('stehen/passen + Dativ korrekt verwenden'),
    bullet('Reklamation: alle Mängel klar beschreiben, Kassenbon erwähnen'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Kleidung kaufen und reklamieren');
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
