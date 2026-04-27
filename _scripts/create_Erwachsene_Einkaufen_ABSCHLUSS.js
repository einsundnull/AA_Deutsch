'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Einkaufen';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '03_Einkaufen', 'ABSCHLUSS');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Einkaufen & Dienstleistungen — Abschlussübung', italics: true, size: 18, color: '888888', font: 'Arial' })]
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
    h1('Abschlussübung: Einkaufen & Dienstleistungen'),
    p('Diese Übung kombiniert alle drei Unterpunkte des Themas:', { color: '555555' }),
    p('UP 01: Im Supermarkt und auf dem Markt  |  UP 02: Kleidung kaufen und reklamieren  |  UP 03: Bank und Post', { color: '555555', italics: true }),
    leer(),

    // ---- AUFGABE 1: Lesetext ----
    h2('Aufgabe 1: Lesetext — „Ein Samstag in der Stadt"'),
    leer(),
    p('Nora Blum wohnt seit einem Jahr in Stuttgart und hat ihren Samstag gut geplant: Markt, Kleidergeschäft, Bank und Post — alles auf einmal erledigen.'),
    leer(),
    p('Zuerst geht Nora auf den Wochenmarkt. Sie kauft ein Kilo Tomaten für 2,20 Euro, eine Packung Bio-Erdbeeren für 3,50 Euro und ein großes Vollkornbrot für 4,80 Euro. Am Käsestand fragt sie: „Was kosten diese Bergkäse-Scheiben?" — „5,50 Euro das halbe Pfund." Nora findet das etwas teuer, kauft aber trotzdem 200 Gramm — der Käse schmeckt ihr gut.'),
    leer(),
    p('Danach geht sie in ein Kleidergeschäft. Sie sucht eine blaue Winterjacke in Größe 38. Sie probiert zwei Jacken an: Eine ist zu eng, die andere passt perfekt. Die Jacke kostet 89,90 Euro — im Sonderangebot, eigentlich 120 Euro. Nora ist zufrieden. An der Kasse fragt sie noch: „Kann ich die Jacke umtauschen, wenn sie zu Hause nicht mehr gefällt?" Die Kassiererin lächelt: „Natürlich, innerhalb von 30 Tagen mit Kassenbon."'),
    leer(),
    p('Nach dem Einkaufen geht Nora zur Bank. Sie möchte 300 Euro abheben und eine Überweisung für die Miete machen. Am Geldautomat gibt sie ihren PIN ein. Die Überweisung macht sie später zuhause über das Online-Banking — das ist einfacher.'),
    leer(),
    p('Zuletzt geht Nora zur Post. Sie schickt ein Paket an ihre Mutter in München (1,5 kg, 5,49 Euro) und kauft fünf Briefmarken für Postkarten ins Ausland. Müde, aber zufrieden, fährt sie nach Hause.'),
    leer(),

    h2('Aufgabe 1a: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Nora kauft auf dem Markt vier verschiedene Produkte.  ___'),
    p('2. Der Bergkäse kostet 5,50 Euro pro Kilo.  ___'),
    p('3. Die erste Jacke passt Nora zu gut.  ___'),
    p('4. Die Jacke war ursprünglich 120 Euro teuer.  ___'),
    p('5. Nora hebt 300 Euro ab und macht die Überweisung am Automaten.  ___'),
    p('6. Das Paket nach München wiegt 1,5 Kilogramm.  ___'),
    leer(),

    h2('Aufgabe 1b: Fragen zum Text'),
    p('1. Was kostet Noras Einkauf auf dem Markt insgesamt? Rechne nach.'),
    linie(), leer(),
    p('2. Was muss Nora mitbringen, wenn sie die Jacke umtauschen möchte?'),
    linie(), leer(),
    p('3. Warum macht Nora die Überweisung nicht an der Bank, sondern zuhause?'),
    linie(), leer(),

    pageBreak(),

    // ---- AUFGABE 2: Lückentext ----
    h2('Aufgabe 2: Lückentext — gemischt'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Kilo | Packung | Sonderangebot | anprobieren | passt | Kassenbon | umtauschen',
      'Überweisung | PIN | Geldautomat | Porto | Sendungsverfolgung | Briefmarke | Einschreiben',
    ]),
    leer(),
    p('1. Ich kaufe ein _____________ Äpfel und eine _____________ Nudeln.'),
    leer(),
    p('2. Diese Jacke ist im _____________: nur 49 Euro statt 80 Euro.'),
    leer(),
    p('3. Darf ich die Hose _____________? — Natürlich, die Kabine ist dort.'),
    leer(),
    p('4. Die Hose _____________ mir gut — ich nehme sie.'),
    leer(),
    p('5. Wenn etwas nicht stimmt, kann ich es mit dem _____________ innerhalb von 30 Tagen _____________.'),
    leer(),
    p('6. Am _____________ gebe ich meinen _____________ ein und hebe 200 Euro ab.'),
    leer(),
    p('7. Ich mache eine _____________ für die Miete über das Online-Banking.'),
    leer(),
    p('8. Das Paket kostet 7,99 Euro plus 2,50 Euro für die _____________.'),
    leer(),
    p('9. Für den Brief nach Frankreich brauche ich eine _____________. Das _____________ beträgt 1,10 Euro.'),
    leer(),

    // ---- AUFGABE 3: Fehler korrigieren ----
    h2('Aufgabe 3: Fehler korrigieren'),
    p('In jedem Satz steckt ein Fehler. Schreibe den korrekten Satz auf die Linie.'),
    leer(),
    p('1. Ich kaufe ein Kilo der Tomaten.'),
    linie(), leer(),
    p('2. Das steht du sehr gut!'),
    linie(), leer(),
    p('3. Ich möchte einen roten Pullover kaufen. — Er zeigt mir einen roter Pullover.'),
    linie(), leer(),
    p('4. Ich muss den PIN niemanden zeigen.'),
    linie(), leer(),
    p('5. Das Brief kostet 1,10 Euro Porto.'),
    linie(), leer(),
    p('6. Ich habe die Jacke gekauft, aber sie ist zu eng — sie passt mir keine.'),
    linie(), leer(),

    pageBreak(),

    // ---- AUFGABE 4: Schreiben ----
    h2('Aufgabe 4: Schreiben — Eine E-Mail an den Kundenservice'),
    p('Du hast online eine Hose in Größe M bestellt. Geliefert wurde Größe XL. Außerdem fehlt ein Knopf. Schreibe eine E-Mail an den Kundenservice. Fordere Ersatz oder Rückerstattung.'),
    leer(),
    p('Checkliste:', { bold: true }),
    checkRow('Bestellnummer nennen'),
    checkRow('Beide Probleme klar beschreiben'),
    checkRow('Lösung fordern (Umtausch oder Rückgabe)'),
    checkRow('Höflicher Ton, formelle Sprache'),
    leer(),
    p('Betreff: Reklamation — Bestellung Nr. 77523', { bold: true }),
    leer(),
    p('Sehr geehrte Damen und Herren,'),
    leer(),
    ...Array(7).fill(null).map(linie),
    leer(),
    p('Mit freundlichen Grüßen,'),
    p('___________________________'),
    leer(),

    // ---- AUFGABE 5: Rollenspiel ----
    h2('Aufgabe 5: Rollenspiel — Ein Einkaufstag'),
    p('Übt zu zweit oder zu dritt. Jede Person liest ihre Karte und spielt die Situation.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person A — Kunde/Kundin', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Auf dem Markt: kaufe 2 kg Äpfel + Preis fragen. Im Geschäft: suche blauen Pullover Gr. L, probiere an, frage Preis + Umtausch. An der Post: schicke Päckchen nach Polen, frage Kosten + Dauer.', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person B — Marktverkäufer/in & Verkäufer/in', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Markt: Äpfel 2,20 €/kg, frisch. Geschäft: Pullover blau Gr. L vorhanden, 49,90 €, 30 Tage Umtausch mit Bon.', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 3372, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Person C — Post-Mitarbeiter/in', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Päckchen Polen unter 2 kg: 9,99 €. Mit Tracking: +2,50 €. Lieferung: 5–7 Werktage. Einschreiben möglich.', font: 'Arial', size: 22 })] }),
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
          new TableCell({ width: { size: 6572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Bereich', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Verwendete Phrasen', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Preise erfragen und nennen (Was kostet …? / Das macht …)'],
          ['Kleidung anprobieren und bewerten (passt / zu eng / steht dir gut)'],
          ['Mengenangaben korrekt (ein Kilo … / zwei Packungen …)'],
          ['Post-Fachvokabular (Porto / Tracking / Lieferzeit)'],
          ['Formelle und höfliche Sprache (Ich hätte gerne … / Könnten Sie …?)'],
        ].map(([b]) => new TableRow({ children: [
          new TableCell({ width: { size: 6572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: '☐ erledigt', font: 'Arial', size: 22 })] })] }),
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
          'im Supermarkt und auf dem Markt einkaufen (Preise, Mengen, Vergleiche).',
          'Wochenmarkt- und Supermarkt-Vokabular verwenden.',
          'Kleidung beschreiben (Farbe, Größe, Material, Passform).',
          'im Kleidungsgeschäft fragen, anprobieren und bezahlen.',
          'eine Reklamation höflich formulieren (mündlich und schriftlich).',
          'ein Bankkonto eröffnen und Bankbegriffe verstehen (IBAN, PIN, Überweisung).',
          'ein Paket oder einen Brief bei der Post aufgeben.',
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
    h1('LÖSUNG — Abschlussübung: Einkaufen & Dienstleistungen'),
    leer(),

    h2('Aufgabe 1a: Richtig oder falsch?'),
    p('1. R — vier Produkte: Tomaten, Erdbeeren, Brot, Käse.'),
    p('2. F — 5,50 € pro halbes Pfund (= 250 g), nicht pro Kilo.'),
    p('3. F — Die erste Jacke ist zu eng (passt nicht gut).'),
    p('4. R — Die Jacke kostete ursprünglich 120 Euro.'),
    p('5. F — Die Überweisung macht sie zuhause über Online-Banking.'),
    p('6. R — Das Paket wiegt 1,5 kg.'),
    leer(),

    h2('Aufgabe 1b: Fragen'),
    p('1. 2,20 + 3,50 + 4,80 + (5,50 / 2 × 0,4 = 2,20 für 200g) = 12,70 €'),
    p('   Hinweis: 200g Käse = 2/5 von 500g. 5,50 € pro 250g → pro 500g = 11 € → 200g = 4,40 €. Gesamt: 2,20 + 3,50 + 4,80 + 4,40 = 14,90 €'),
    p('   → Rechenweg akzeptieren. Korrekt: ca. 14,90 € (je nach Interpretation des Preises).', { color: '388E3C', italics: true }),
    p('2. Den Kassenbon muss sie mitbringen.'),
    p('3. Weil Online-Banking einfacher ist.'),
    leer(),

    h2('Aufgabe 2: Lückentext'),
    p('1. Kilo | Packung'),
    p('2. Sonderangebot'),
    p('3. anprobieren'),
    p('4. passt'),
    p('5. Kassenbon | umtauschen'),
    p('6. Geldautomat | PIN'),
    p('7. Überweisung'),
    p('8. Sendungsverfolgung'),
    p('9. Briefmarke | Porto'),
    leer(),

    h2('Aufgabe 3: Fehler korrigieren'),
    p('1. Fehler: „ein Kilo der Tomaten" — kein Artikel nach Mengenangabe.'),
    p('   Richtig: Ich kaufe ein Kilo Tomaten.'),
    leer(),
    p('2. Fehler: „Das steht du" — stehen braucht Dativ.'),
    p('   Richtig: Das steht dir sehr gut!'),
    leer(),
    p('3. Fehler: „einen roter Pullover" — Akkusativ Mask. → -en.'),
    p('   Richtig: Er zeigt mir einen roten Pullover.'),
    leer(),
    p('4. Fehler: „niemandem" ist korrekt; aber „niemanden" (Dativ falsch hier) → korrekt ist Dativ: niemandem.'),
    p('   Richtig: Ich muss den PIN niemandem zeigen. (dürfen wäre natürlicher: Ich darf den PIN niemandem zeigen.)'),
    leer(),
    p('5. Fehler: „Das Brief" — Brief ist maskulin: der Brief.'),
    p('   Richtig: Der Brief kostet 1,10 Euro Porto.'),
    leer(),
    p('6. Fehler: „passt mir keine" — korrekt: passt mir nicht.'),
    p('   Richtig: … sie passt mir nicht.'),
    leer(),

    h2('Aufgabe 4: Reklamations-E-Mail — Musterlösung'),
    p('Betreff: Reklamation — Bestellung Nr. 77523', { bold: true }),
    p('Sehr geehrte Damen und Herren,'),
    p('ich habe am [Datum] über Ihren Online-Shop eine Hose in Größe M bestellt (Bestellnummer 77523).'),
    p('Leider habe ich eine Hose in Größe XL erhalten. Außerdem fehlt an der Hose ein Knopf.'),
    p('Ich bitte Sie, mir die richtige Größe M zu schicken oder den Kaufpreis zurückzuerstatten.'),
    p('Die fehlerhafte Hose sende ich bei Bedarf gerne zurück.'),
    p('Mit freundlichen Grüßen, [Name]'),
    leer(),

    h2('Aufgabe 5: Rollenspiel — Bewertungskriterien'),
    bullet('Markt: korrekte Mengenangaben (zwei Kilo Äpfel, nicht: zwei Kilos Äpfel)'),
    bullet('Preise erfragen und nennen: Was kostet …? / Das macht … Euro.'),
    bullet('Kleidung: passt / steht + Dativ, Adjektivendung (einen blauen Pullover)'),
    bullet('Post: Fachvokabular (Porto, Tracking, Werktage, Einschreiben)'),
    bullet('Formelle Sprache: Ich hätte gerne … / Könnten Sie …?'),
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
          ['UP 01 Supermarkt & Markt', 'Lesetext (Markt), Lücken (Kilo/Packung/Sonderangebot), Fehler (Mengenangabe ohne Artikel), Rollenspiel (Marktstand)'],
          ['UP 02 Kleidung & Reklamation', 'Lesetext (Jacke kaufen), Lücken (anprobieren/passt/Kassenbon), Fehler (Adjektivendung/stehen+Dativ), E-Mail Reklamation, Rollenspiel'],
          ['UP 03 Bank & Post', 'Lesetext (Geldautomat/Post), Lücken (PIN/Überweisung/Porto/Briefmarke), Fehler (Brief = der), Rollenspiel (Post)'],
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
  console.log('Erstelle ABSCHLUSS: Einkaufen & Dienstleistungen');
  console.log('Zielordner:', OUTPUT_DIR);
  await createAbschluss();
  await createAbschlussLoesung();
  console.log('\nFertig! 2 Dateien erstellt.');
})();
