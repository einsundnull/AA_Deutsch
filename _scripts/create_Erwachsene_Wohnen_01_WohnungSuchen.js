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

const TOPIC_LABEL = 'A2 Erwachsene — Wohnen & Einrichten — Wohnung suchen';
const TOPIC       = 'A2_Erwachsene_Wohnen_01_WohnungSuchen';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Erwachsene', '02_Wohnen', '01_WohnungSuchen'
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

const h1      = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2      = txt => new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const p       = (txt, opts = {}) => new Paragraph({ children: [new TextRun({ text: txt, size: opts.size || 24, font: 'Arial', bold: opts.bold || false, italics: opts.italic || false, color: opts.color || '000000' })], spacing: { before: opts.before || 80, after: opts.after || 80 } });
const pItalic = (txt, opts = {}) => p(txt, { italic: true, color: opts.color || '888888', size: 22 });
const empty   = () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } });
const bullet  = txt => new Paragraph({ children: [new TextRun({ text: txt, size: 24, font: 'Arial' })], numbering: { reference: 'bullet-list', level: 0 }, spacing: { before: 60, after: 60 } });
const writeLine  = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const writeLines = n => Array.from({ length: n }, writeLine);

const hCell = (txt, w) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })] });
const dCell = (txt, w, opts = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: opts.fill || 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: txt, size: opts.size || 22, font: 'Arial', bold: opts.bold || false, italics: opts.italic || false, color: opts.color || '000000' })] })] });

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

function infoBox(lines) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'E8F4E8' },
        borders: { top: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, bottom: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, left: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, right: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' } },
        children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 24, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
      })]
    })]
  });
}

// Wohnungsanzeige als farbige Box
function anzeigenBox(zeilen) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' },
        borders: { top: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, left: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, right: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' } },
        children: zeilen.map((z, i) => new Paragraph({ children: [new TextRun({ text: z, size: i === 0 ? 26 : 22, font: 'Arial', bold: i === 0 })], spacing: { before: i === 0 ? 80 : 30, after: 30 } }))
      })]
    })]
  });
}

(async () => {
  console.log('Erstelle Unterpunkt: Wohnung suchen und beschreiben');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Schreibübung'),
    infoBox([
      'Wohnung beschreiben:',
      'Die Wohnung hat 3 Zimmer / 75 qm / einen Balkon.',
      'Sie liegt im 2. Obergeschoss / im Erdgeschoss.',
      'Die Kaltmiete beträgt 900 Euro. / Die Warmmiete ist 1.050 Euro.',
      'Die Wohnung ist hell / ruhig / zentral gelegen / möbliert.',
      '',
      'Wohnungssuche:',
      'Ich suche eine 2-Zimmer-Wohnung in der Nähe von …',
      'Die Miete darf maximal … Euro betragen.',
      'Wichtig ist mir: Balkon / Aufzug / Tiefgarage / ruhige Lage.'
    ]),
    empty(),
    h2('Aufgabe 1 — Wohnungsanzeige lesen und beschreiben'),
    p('Lesen Sie die Anzeige und beschreiben Sie die Wohnung in 5 Sätzen.'),
    empty(),
    anzeigenBox([
      '3-Zimmer-Wohnung zu vermieten — München Schwabing',
      '72 qm, 2. OG, Aufzug vorhanden',
      'Kaltmiete: 1.350 € | NK: 180 € | Kaution: 2.700 €',
      'Ausstattung: Einbauküche, Balkon Richtung Süden, Parkettboden',
      'Haustiere auf Anfrage | ab sofort frei | Nichtraucher bevorzugt',
      'Kontakt: immo@beispiel.de'
    ]),
    empty(),
    ...writeLines(5),
    empty(), empty(),
    h2('Aufgabe 2 — Eigene Wohnsituation beschreiben'),
    p('Beschreiben Sie Ihre aktuelle oder eine frühere Wohnung (5–6 Sätze).'),
    pItalic('Ideen: Zimmer / qm / Lage / Miete / was Ihnen gefällt oder nicht gefällt'),
    ...writeLines(5),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Traumwohnung beschreiben'),
    p('Schreiben Sie eine kurze Traumwohnungs-Anzeige aus Ihrer Sicht als Suchender.'),
    pItalic('Beispiel: „Ich suche eine helle 2-Zimmer-Wohnung mit Balkon in zentraler Lage. Die Miete darf maximal 900 Euro kalt betragen …"'),
    ...writeLines(5),
    empty(), empty(),
    h2('Aufgabe 4 — Vergleich zweier Wohnungen'),
    p('Vergleichen Sie die zwei Wohnungen. Schreiben Sie 3 Vergleichssätze.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('', Math.floor(CONTENT * 0.25)), hCell('Wohnung A', Math.floor(CONTENT * 0.375)), hCell('Wohnung B', Math.floor(CONTENT * 0.375))] }),
        new TableRow({ children: [dCell('Größe', Math.floor(CONTENT * 0.25)), dCell('58 qm', Math.floor(CONTENT * 0.375)), dCell('82 qm', Math.floor(CONTENT * 0.375))] }),
        new TableRow({ children: [dCell('Kaltmiete', Math.floor(CONTENT * 0.25)), dCell('750 €', Math.floor(CONTENT * 0.375)), dCell('1.100 €', Math.floor(CONTENT * 0.375))] }),
        new TableRow({ children: [dCell('Lage', Math.floor(CONTENT * 0.25)), dCell('Stadtrand, ruhig', Math.floor(CONTENT * 0.375)), dCell('Zentrum, lebhaft', Math.floor(CONTENT * 0.375))] }),
        new TableRow({ children: [dCell('Ausstattung', Math.floor(CONTENT * 0.25)), dCell('Balkon, Keller', Math.floor(CONTENT * 0.375)), dCell('Einbauküche, Aufzug', Math.floor(CONTENT * 0.375))] })
      ]
    }),
    empty(),
    ...writeLines(3)
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Wohnung suchen und beschreiben'),
    empty(),
    h2('Aufgabe 1 — Musterlösung'),
    p('Die Wohnung liegt in München Schwabing im 2. Obergeschoss. Sie hat 3 Zimmer und ist 72 qm groß. Die Kaltmiete beträgt 1.350 Euro, dazu kommen 180 Euro Nebenkosten. Die Wohnung hat eine Einbauküche und einen Balkon nach Süden. Sie ist ab sofort frei.'),
    empty(),
    h2('Aufgabe 2 + 3 — Freies Schreiben'),
    pItalic('Individuelle Antworten. Auf korrekte Satzstruktur und Vokabular achten.'),
    empty(),
    h2('Aufgabe 4 — Vergleichsbeispiele'),
    p('Wohnung B ist größer als Wohnung A (82 qm vs. 58 qm).'),
    p('Die Miete für Wohnung A ist günstiger als für Wohnung B.'),
    p('Wohnung B liegt zentraler, aber Wohnung A ist ruhiger.')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Leseübung'),
    h2('Lesetext: Wohnungssuche in Deutschland — ein Erfahrungsbericht'),
    p('Ich heiße Tomás Novák und komme aus Tschechien. Vor zwei Jahren bin ich nach Frankfurt gezogen, weil ich dort eine Arbeit gefunden habe. Die Wohnungssuche war sehr schwierig — Frankfurt ist eine teure Stadt.'),
    empty(),
    p('Zuerst habe ich online gesucht: auf Immobilienportalen wie ImmobilienScout24 oder Immonet. Ich habe viele Anzeigen gelesen und einige Besichtigungen gemacht. Die meisten Wohnungen waren entweder zu teuer oder zu klein.'),
    empty(),
    p('Nach drei Wochen habe ich endlich eine passende Wohnung gefunden: eine 2-Zimmer-Wohnung im 3. Obergeschoss, 55 qm, mit Balkon. Die Kaltmiete beträgt 980 Euro, plus 160 Euro Nebenkosten. Die Wohnung liegt in Sachsenhausen — nicht weit vom Zentrum, aber trotzdem ruhig.'),
    empty(),
    p('Beim ersten Gespräch mit der Vermieterin musste ich viele Dokumente vorzeigen: Gehaltsnachweis, Mieterselbstauskunft und Schufa-Auskunft. Das war für mich neu — in Tschechien ist das einfacher. Zum Glück hatte ich alles dabei.'),
    empty(),
    p('Jetzt wohne ich seit fast zwei Jahren in dieser Wohnung und bin sehr zufrieden. Die Nachbarn sind freundlich, und vom Balkon hat man einen schönen Blick auf den Innenhof. Der einzige Nachteil: Es gibt keinen Aufzug — und ich wohne im dritten Stock!'),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Tomás kommt aus der Slowakei.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Er hat sofort eine passende Wohnung gefunden.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Die Wohnung kostet 980 Euro Kaltmiete.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Die Wohnung hat keinen Balkon.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Ein Nachteil der Wohnung ist der fehlende Aufzug.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Fragen beantworten'),
    p('1.  Warum ist die Wohnungssuche in Frankfurt schwierig?'),
    ...writeLines(2), empty(),
    p('2.  Welche Dokumente musste Tomás zeigen? Nennen Sie drei.'),
    ...writeLines(2), empty(),
    p('3.  Was gefällt Tomás an seiner Wohnung? Was nicht?'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Wohnungsbeschreibung aus dem Text'),
    p('Füllen Sie die Steckbrief-Tabelle mit Informationen aus dem Text aus.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Merkmal', Math.floor(CONTENT * 0.35)), hCell('Information aus dem Text', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Zimmerzahl', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Größe', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Stockwerk', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Kaltmiete', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Nebenkosten', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Stadtteil', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Besonderheit / Extra', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Nachteil', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 4 — Ihre Erfahrung'),
    p('Haben Sie in Deutschland schon eine Wohnung gesucht? Was war schwierig oder einfach? Schreiben Sie 3–4 Sätze.'),
    ...writeLines(4)
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Wohnung suchen und beschreiben'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  F  (er kommt aus Tschechien)'),
    p('2.  F  (er hat drei Wochen gesucht)'),
    p('3.  R'),
    p('4.  F  (die Wohnung hat einen Balkon)'),
    p('5.  R'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Frankfurt ist eine teure Stadt, deshalb ist die Wohnungssuche schwierig.'),
    p('2.  Gehaltsnachweis, Mieterselbstauskunft und Schufa-Auskunft.'),
    p('3.  Gefällt: freundliche Nachbarn, Blick auf den Innenhof. Nicht gefällt: kein Aufzug im 3. Stock.'),
    empty(),
    h2('Aufgabe 3 — Steckbrief'),
    p('Zimmerzahl: 2   Größe: 55 qm   Stockwerk: 3. OG'),
    p('Kaltmiete: 980 €   Nebenkosten: 160 €   Stadtteil: Sachsenhausen'),
    p('Extra: Balkon, ruhige Lage   Nachteil: kein Aufzug'),
    empty(),
    h2('Aufgabe 4'),
    pItalic('Individuelle Antworten.')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Lückentext'),
    p('Wörterkasten:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'Kaltmiete  —  Nebenkosten  —  Kaution  —  Zimmer  —  Quadratmeter  —  Balkon  —  Aufzug  —  Einbauküche  —  Erdgeschoss  —  Obergeschoss  —  möbliert  —  Besichtigung  —  Vermieter', size: 22, font: 'Arial' })] })] })] })]
    }),
    empty(),
    h2('Aufgabe 1 — Passendes Wort einsetzen'),
    empty(),
    p('1.  Die Wohnung hat 3 _______ und ist 78 _______ groß.'),
    writeLine(), empty(),
    p('2.  Die _______ beträgt 850 Euro, plus 120 Euro _______ für Heizung und Wasser.'),
    writeLine(), empty(),
    p('3.  Beim Einzug muss man normalerweise drei Monatsmieten als _______ zahlen.'),
    writeLine(), empty(),
    p('4.  Die Wohnung liegt im 4. _______ — leider ohne _______.'),
    writeLine(), empty(),
    p('5.  Das Apartment ist komplett _______: Bett, Sofa, Schränke — alles ist schon da.'),
    writeLine(), empty(),
    p('6.  Der _______ möchte nur ruhige, zuverlässige Mieter ohne Haustiere.'),
    writeLine(), empty(),
    p('7.  Wir haben eine _______ gemacht und die Wohnung ist wirklich schön — hell und mit _______.'),
    writeLine(),
    empty(), empty(),
    h2('Aufgabe 2 — Wohnungsanzeige verstehen'),
    p('Lesen Sie die Abkürzungen und schreiben Sie die volle Bedeutung.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Abkürzung', Math.floor(CONTENT * 0.2)), hCell('Volle Bedeutung', Math.floor(CONTENT * 0.45)), hCell('Erklärung', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('qm / m²', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Größe der Wohnung', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('KM', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Miete ohne Heizung/Wasser', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('WM', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Miete inkl. Nebenkosten', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('NK', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Heizung, Wasser etc.', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('EG', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Stockwerk auf Straßenniveau', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('OG', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Stockwerk über dem EG', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('EBK', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('Küche ist fest eingebaut', Math.floor(CONTENT * 0.35))] }),
        new TableRow({ children: [dCell('WG', Math.floor(CONTENT * 0.2)), dCell('', Math.floor(CONTENT * 0.45)), dCell('mehrere Personen teilen Wohnung', Math.floor(CONTENT * 0.35))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Telefonat mit dem Vermieter'),
    p('Ergänzen Sie das Telefongespräch.'),
    empty(),
    p('Vermieter:   Guten Tag, Schmidt am Apparat.'),
    p('Suchender:   Guten Tag, mein Name ist _______ . Ich rufe wegen der Anzeige für'),
    p('             die _______ -Zimmer-Wohnung in _______ an.'),
    p('Vermieter:   Ja, die Wohnung ist noch frei. Was möchten Sie wissen?'),
    p('Suchender:   Wie hoch ist die _______? Und sind _______ schon inklusive?'),
    p('Vermieter:   Die Kaltmiete ist _______ Euro, Nebenkosten kommen noch dazu.'),
    p('Suchender:   Gibt es einen _______? Und ist ein _______ vorhanden?'),
    p('Vermieter:   Ja, es gibt einen Balkon. Leider keinen Aufzug — die Wohnung liegt im _______.'),
    p('Suchender:   Wann könnte ich eine _______ machen?'),
    p('Vermieter:   Wie wäre es mit Samstag um 11 Uhr?'),
    p('Suchender:   Das passt gut. Vielen Dank!'),
    ...writeLines(2),
    empty(), empty(),
    h2('Aufgabe 4 — Sätze umformen'),
    p('Schreiben Sie die Informationen als vollständige Sätze.'),
    empty(),
    p('1.  3 Zimmer / 68 qm / 2. OG'),
    ...writeLines(1), empty(),
    p('2.  Kaltmiete 900 € / NK 130 € / Kaution 1.800 €'),
    ...writeLines(1), empty(),
    p('3.  Balkon + EBK / kein Aufzug / Haustiere erlaubt'),
    ...writeLines(2)
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Wohnung suchen und beschreiben'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  Zimmer / Quadratmeter    2.  Kaltmiete / Nebenkosten'),
    p('3.  Kaution    4.  Obergeschoss / Aufzug'),
    p('5.  möbliert    6.  Vermieter    7.  Besichtigung / Balkon'),
    empty(),
    h2('Aufgabe 2 — Abkürzungen'),
    p('qm / m² = Quadratmeter    KM = Kaltmiete    WM = Warmmiete'),
    p('NK = Nebenkosten    EG = Erdgeschoss    OG = Obergeschoss'),
    p('EBK = Einbauküche    WG = Wohngemeinschaft'),
    empty(),
    h2('Aufgabe 3 — Musterlösung'),
    p('[Name] / [Zahl] / [Stadtname] / Kaltmiete / Nebenkosten / [Betrag] / Balkon / Aufzug / [Stockwerk] / Besichtigung'),
    pItalic('Individuelle Angaben für Name, Zimmerzahl, Ort und Betrag akzeptieren.'),
    empty(),
    h2('Aufgabe 4 — Musterlösungen'),
    p('1.  Die Wohnung hat 3 Zimmer, ist 68 qm groß und liegt im 2. Obergeschoss.'),
    p('2.  Die Kaltmiete beträgt 900 Euro, die Nebenkosten sind 130 Euro. Die Kaution beträgt 1.800 Euro.'),
    p('3.  Die Wohnung hat einen Balkon und eine Einbauküche. Es gibt keinen Aufzug. Haustiere sind erlaubt.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Wortliste'),
    h2('Wohnungstypen und Räume'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wort', Math.floor(CONTENT * 0.3)), hCell('Artikel + Plural', Math.floor(CONTENT * 0.32)), hCell('Bedeutung / Beispiel', Math.floor(CONTENT * 0.23)), hCell('Übersetzung', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Wohnung', Math.floor(CONTENT * 0.3)), dCell('die Wohnung / -en', Math.floor(CONTENT * 0.32)), dCell('Apartment in einem Gebäude', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('das Zimmer', Math.floor(CONTENT * 0.3)), dCell('das Zimmer / -', Math.floor(CONTENT * 0.32)), dCell('Raum in einer Wohnung', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('der Balkon', Math.floor(CONTENT * 0.3)), dCell('der Balkon / -e', Math.floor(CONTENT * 0.32)), dCell('Plattform außen am Gebäude', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('der Keller', Math.floor(CONTENT * 0.3)), dCell('der Keller / -', Math.floor(CONTENT * 0.32)), dCell('unterirdischer Raum', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('der Aufzug / Fahrstuhl', Math.floor(CONTENT * 0.3)), dCell('der Aufzug / -züge', Math.floor(CONTENT * 0.32)), dCell('Lift im Gebäude', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Einbauküche (EBK)', Math.floor(CONTENT * 0.3)), dCell('die Einbauküche / -n', Math.floor(CONTENT * 0.32)), dCell('fest installierte Küche', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Wohngemeinschaft (WG)', Math.floor(CONTENT * 0.3)), dCell('die WG / -s', Math.floor(CONTENT * 0.32)), dCell('mehrere Personen teilen sich eine Wohnung', Math.floor(CONTENT * 0.23)), dCell('___________', Math.floor(CONTENT * 0.15))] })
      ]
    }),
    empty(), empty(),
    h2('Miet-Vokabular'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Begriff', Math.floor(CONTENT * 0.3)), hCell('Bedeutung', Math.floor(CONTENT * 0.52)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Kaltmiete', Math.floor(CONTENT * 0.3)), dCell('Miete ohne Heizung und Wasser', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Warmmiete', Math.floor(CONTENT * 0.3)), dCell('Kaltmiete + Nebenkosten', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Nebenkosten (NK)', Math.floor(CONTENT * 0.3)), dCell('Heizung, Wasser, Müll, Hausmeister', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Kaution', Math.floor(CONTENT * 0.3)), dCell('Sicherheit (meist 2–3 Monatsmieten)', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Vermieter / die Vermieterin', Math.floor(CONTENT * 0.3)), dCell('Person, die die Wohnung besitzt und vermietet', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Mieter / die Mieterin', Math.floor(CONTENT * 0.3)), dCell('Person, die die Wohnung mietet', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Besichtigung', Math.floor(CONTENT * 0.3)), dCell('Termin, um die Wohnung anzusehen', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Mietvertrag', Math.floor(CONTENT * 0.3)), dCell('rechtlicher Vertrag zwischen Mieter und Vermieter', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Schufa-Auskunft', Math.floor(CONTENT * 0.3)), dCell('Dokument zur Kreditwürdigkeit (Bonität)', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    infoBox([
      'Nützliche Sätze bei der Wohnungssuche:',
      '',
      'Ich suche eine … -Zimmer-Wohnung in … / in der Nähe von …',
      'Die Miete darf maximal … Euro (kalt) betragen.',
      'Ist ein Balkon / Aufzug / Kellerabteil vorhanden?',
      'Wann wäre eine Besichtigung möglich?',
      'Ist die Wohnung noch frei?  /  Ab wann ist die Wohnung frei?',
      'Was ist in den Nebenkosten enthalten?'
    ]),
    empty(),
    pItalic('Lernkarten-Tipp: Deutsche Abkürzung (EBK, NK, WG …) auf die Vorderseite, voller Begriff + Bedeutung auf die Rückseite.')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Wohnung suchen und beschreiben'),
    empty(),
    h2('Wohnungsvokabular — Übersetzungen (Beispiel Englisch)'),
    p('die Wohnung = apartment / flat    das Zimmer = room    der Balkon = balcony'),
    p('der Keller = cellar / basement    der Aufzug = elevator / lift'),
    p('die Einbauküche = fitted kitchen    die WG = shared flat / flat share'),
    empty(),
    h2('Miet-Vokabular — Übersetzungen'),
    p('die Kaltmiete = rent (excl. utilities)    die Warmmiete = rent (incl. utilities)'),
    p('die Nebenkosten = utilities / service charges    die Kaution = deposit'),
    p('der Vermieter = landlord    der Mieter = tenant    die Besichtigung = viewing'),
    p('der Mietvertrag = rental contract    die Schufa = German credit rating agency'),
    empty(),
    pItalic('Individuelle Übersetzungen je nach Muttersprache akzeptieren.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Konversation'),
    h2('Dialog 1 — Anfrage beim Vermieter (formell)'),
    p('Üben Sie den Dialog. Dann tauschen Sie die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Vermieter/in', Math.floor(CONTENT * 0.5)), hCell('Wohnungssuchende/r', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Guten Tag, was kann ich für Sie tun?', Math.floor(CONTENT * 0.5)), dCell('Ich rufe wegen der Anzeige an — die 2-Zimmer-Wohnung in …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ja, die ist noch frei. Was möchten Sie wissen?', Math.floor(CONTENT * 0.5)), dCell('Wie hoch ist die Kaltmiete? Sind Nebenkosten inklusive?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Die Kaltmiete ist … Euro, NK kommen extra.', Math.floor(CONTENT * 0.5)), dCell('Gibt es einen Balkon / Aufzug / Keller?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('[Antworten auf Fragen]', Math.floor(CONTENT * 0.5)), dCell('Wann wäre eine Besichtigung möglich?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wie wäre es mit … um … Uhr?', Math.floor(CONTENT * 0.5)), dCell('Das passt gut. Vielen Dank!', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(), empty(),
    h2('Dialog 2 — Wohnungen vergleichen (informell)'),
    p('Zwei Freunde sprechen über Wohnungen. Ergänzen Sie.'),
    empty(),
    p('A:  Ich suche gerade eine neue Wohnung. Hast du Tipps?'),
    p('B:  Ich habe letzte Woche zwei Wohnungen besichtigt. Eine war _______ als die andere.'),
    p('A:  Was hat dir besser gefallen?'),
    p('B:  Die erste Wohnung war _______, aber sie hatte _______ Zimmer.'),
    p('    Die zweite war _______. Außerdem hatte sie _______ und _______.'),
    p('A:  Wie war die Miete?'),
    p('B:  Die erste kostet _______ Euro kalt, die zweite _______. Das ist _______ für mich.'),
    p('A:  Was ist dir wichtiger — Größe oder Lage?'),
    p('B:  Mir ist _______ am wichtigsten, weil _______.'),
    empty(), empty(),
    h2('Partnerinterview — Meine Wohnsituation'),
    p('Stellen Sie Ihrem Partner / Ihrer Partnerin diese Fragen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.5)), hCell('Antwort notieren', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wo wohnen Sie / wohnst du?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wie viele Zimmer hat Ihre / deine Wohnung?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was gefällt Ihnen / dir an der Wohnung?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was würden Sie / würdest du gern ändern?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was ist Ihnen / dir bei einer Wohnung am wichtigsten?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenübung — Wohnungsmarkt-Simulation'),
    p('3 Personen sind Vermieter/innen, alle anderen suchen eine Wohnung. Jede/r Vermieter/in hat eine Anzeige-Karte. Die Suchenden gehen herum und fragen nach Wohnungen.'),
    empty(),
    p('Anzeige-Karte A:'),
    anzeigenBox(['2-Zi-Wohnung, 50 qm, EG, 750 € KM + 100 € NK, kein Balkon, Haustiere erlaubt, ab 1. Mai frei']),
    empty(),
    p('Anzeige-Karte B:'),
    anzeigenBox(['3-Zi-Wohnung, 80 qm, 3. OG, Aufzug, 1.200 € KM + 180 € NK, Balkon, EBK, Nichtraucher']),
    empty(),
    p('Anzeige-Karte C:'),
    anzeigenBox(['1-Zi-Apartment, 35 qm, möbliert, 600 € WM inkl. NK, zentrale Lage, ab sofort frei'])
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Wohnung suchen und beschreiben'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Formelle Sie-Form korrekt'),
    bullet('Mindestens 3 Fragen zur Wohnung gestellt (Miete / Ausstattung / Besichtigung)'),
    bullet('Höfliche Formulierungen verwendet'),
    bullet('Besichtigungstermin vereinbart'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('größer / heller / nur 2 / teurer / einen Balkon / eine Einbauküche / mehr / zu teuer / die Lage / ich nicht so viel pendeln möchte'),
    pItalic('Individuelle Formulierungen akzeptieren, solange Komparativ und Begründungen korrekt sind.'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Individuelle Antworten. Auf korrekte Verwendung von Wohnungsvokabular und weil-Sätzen achten.'),
    empty(),
    h2('Gruppenübung — Hinweise'),
    p('Lehrperson achtet auf:'),
    bullet('Formelle Anrede (Sie) in Vermieter-Gesprächen'),
    bullet('Korrekte Fragen zur Wohnung (Gibt es …? / Wie hoch ist …? / Wann …?)'),
    bullet('Vergleiche mit Komparativ bei mehreren Wohnungen')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Wohnung suchen und beschreiben — Bildaufgaben'),
    h2('Aufgabe 1 — Wohnung beschreiben'),
    p('Schauen Sie sich die Bilder an und beschreiben Sie jede Wohnung in 2–3 Sätzen.'),
    empty(),
    p('[BILD 1: Eine helle, moderne Wohnung: weißeWände, große Fenster, offene Küche, Holzboden, kleiner Balkon mit Stadtblick.]'),
    ...writeLines(3),
    empty(), empty(),
    p('[BILD 2: Eine ältere Wohnung: niedrige Decken, wenig Licht, kleines Fenster, keine Einbauküche, günstige Lage am Stadtrand.]'),
    ...writeLines(3),
    empty(), empty(),
    h2('Aufgabe 2 — Grundriss lesen'),
    p('[BILD: Ein einfacher Grundriss einer 3-Zimmer-Wohnung: Eingang, Flur, Wohnzimmer (groß), Schlafzimmer 1 (mittel), Schlafzimmer 2 (klein), Küche, Bad, WC, Balkon.]'),
    empty(),
    p('Beantworten Sie die Fragen zum Grundriss:'),
    empty(),
    p('1.  Wie viele Zimmer hat die Wohnung?  → _____________________________________'),
    p('2.  Hat die Wohnung einen Balkon?  → _________________________________________'),
    p('3.  Gibt es ein separates WC?  → _____________________________________________'),
    p('4.  Welches Zimmer ist am größten?  → ________________________________________'),
    p('5.  Schreiben Sie eine kurze Anzeige für diese Wohnung (3 Sätze):'),
    ...writeLines(3),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Traumwohnung zeichnen'),
    p('[BILD-PLATZHALTER: Leeres Rechteck — zeichnen Sie den Grundriss Ihrer Traumwohnung.]'),
    empty(),
    p('Beschriften Sie die Räume auf Deutsch. Schreiben Sie dann 4 Sätze über Ihre Traumwohnung.'),
    ...writeLines(4),
    empty(), empty(),
    h2('Aufgabe 4 — Wohnungsanzeige schreiben'),
    p('[BILD: Foto einer Wohnung — hell, 3 Zimmer, Balkon, moderne Küche, 4. OG, Aufzug]'),
    empty(),
    p('Schreiben Sie eine Anzeige für diese Wohnung. Erfinden Sie Größe, Miete und Lage selbst.'),
    empty(),
    anzeigenBox(['[Ihre Anzeige hier]', '', '', '', ''])
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Wohnung suchen und beschreiben'),
    empty(),
    h2('Aufgabe 1 — Beispielantworten'),
    p('Bild 1: Die Wohnung ist sehr hell und modern. Sie hat große Fenster und einen Balkon mit Stadtblick. Der Holzboden und die offene Küche sind sehr schön.'),
    p('Bild 2: Die Wohnung ist älter und etwas dunkel. Sie hat wenig Licht und keine Einbauküche. Sie liegt am Stadtrand, was ruhig ist, aber weit vom Zentrum.'),
    pItalic('Antworten hängen von den eingefügten Bildern ab.'),
    empty(),
    h2('Aufgabe 2 — Grundriss'),
    p('1.  3 Zimmer (Wohnzimmer + 2 Schlafzimmer)'),
    p('2.  Ja, die Wohnung hat einen Balkon.'),
    p('3.  Ja, es gibt ein separates WC.'),
    p('4.  Das Wohnzimmer ist am größten.'),
    p('5.  Beispiel-Anzeige: 3-Zimmer-Wohnung mit Balkon, Küche und Bad + sep. WC. Helle, gut geschnittene Wohnung. Auf Anfrage.'),
    empty(),
    h2('Aufgabe 3 — Traumwohnung'),
    pItalic('Individuelle Antworten. Räume auf Deutsch beschriften und mindestens 4 Sätze schreiben.'),
    empty(),
    h2('Aufgabe 4 — Wohnungsanzeige'),
    p('Beispiel: 3-Zi-Wohnung, 75 qm, 4. OG mit Aufzug, Balkon, moderne EBK. Zentrale Lage. KM 1.100 € + 150 € NK. Ab sofort frei. Kontakt: …'),
    pItalic('Individuelle Anzeigen akzeptieren. Auf korrekte Abkürzungen und Struktur achten.')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
