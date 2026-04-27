'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_EssenRestaurant_01_RestaurantBestellen';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '04_EssenRestaurant', '01_RestaurantBestellen');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Essen & Restaurants — Im Restaurant bestellen', italics: true, size: 18, color: '888888', font: 'Arial' })]
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

// Speisekarten-Box (beige/warm)
const menuBox = (lines) => new Table({
  width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: 'FFF8E1' },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: '8D6E63' },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: '8D6E63' },
      left: { style: BorderStyle.SINGLE, size: 8, color: '8D6E63' },
      right: { style: BorderStyle.SINGLE, size: 8, color: '8D6E63' }
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
    h1('Im Restaurant bestellen — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Phrasen im Restaurant:',
      'Haben Sie einen Tisch für zwei Personen frei?  |  Ich habe einen Tisch reserviert. (Name: …)',
      'Kann ich bitte die Speisekarte haben?  |  Was empfehlen Sie?  |  Was ist das Tagesgericht?',
      'Ich hätte gerne …  |  Ich nehme …  |  Für mich bitte …  |  Ich bin Vegetarier/in.',
      'Das Fleisch ist nicht durch. / Das Essen ist zu kalt / zu salzig.  |  Darf ich reklamieren?',
      'Die Rechnung bitte!  |  Stimmt so!  |  Getrennt oder zusammen?  |  Mit Karte oder bar?',
    ]),
    leer(),
    h2('Aufgabe 1: Ein Tisch reservieren — Telefongespräch schreiben'),
    p('Du möchtest einen Tisch für Freitagabend, 19:30 Uhr, für 4 Personen reservieren. Schreibe das Telefongespräch zwischen dir und dem Restaurantmitarbeiter (6–8 Zeilen).'),
    p('Erwähne: Anzahl der Personen, Datum/Uhrzeit, deinen Namen, besondere Wünsche (z. B. Fensterplatz, vegetarisches Menü).'),
    leer(),
    p('Restaurant:  „Guten Abend, Restaurant Zum goldenen Hirschen, was kann ich für Sie tun?"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Restaurant:  „_____________________________________________"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Restaurant:  „_____________________________________________"'),
    leer(),
    p('Du:  „_____________________________________________"'),
    leer(),
    p('Restaurant:  „Sehr gut, bis Freitag!"'),
    leer(),
    h2('Aufgabe 2: Im Restaurant — Bestellung schreiben'),
    p('Schau dir die Speisekarte an und wähle:  eine Vorspeise, ein Hauptgericht und ein Getränk.'),
    p('Schreibe Sätze: Was bestellst du und warum? Benutze: Ich nehme … / Ich hätte gerne … / weil …'),
    leer(),
    menuBox([
      'SPEISEKARTE — Restaurant Zum goldenen Hirschen',
      '',
      'Vorspeisen:',
      '  Tomatensuppe mit Basilikum  4,50 €',
      '  Gemischter Salat            5,80 €',
      '  Lachs-Carpaccio             8,90 €',
      '',
      'Hauptgerichte:',
      '  Schweinebraten mit Knödeln und Sauerkraut   14,90 €',
      '  Gegrillte Lachsforelle mit Kartoffeln        17,50 €',
      '  Gemüsepfanne vegetarisch                    12,80 €',
      '  Wiener Schnitzel mit Pommes                 15,90 €',
      '',
      'Getränke:',
      '  Wasser (0,5 l)  2,80 €  |  Apfelschorle  3,20 €  |  Bier (0,3 l)  3,50 €  |  Wein (0,2 l)  4,80 €',
    ]),
    leer(),
    p('Meine Bestellung:'),
    linie(), leer(),
    linie(), leer(),
    linie(), leer(),
    h2('Aufgabe 3: Einen Restaurantbesuch beschreiben'),
    p('Beschreibe einen Restaurantbesuch — real oder erfunden. Was hast du gegessen? Wie war das Essen? Wie war der Service? Schreibe 5–6 Sätze im Perfekt.'),
    p('Benutze: Das Essen war … / Der Service war … / Ich habe … bestellt. / Das hat mir gut gefallen.'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Reklamation im Restaurant schreiben'),
    p('Du hast ein Steak „medium" bestellt, aber es kam „well done". Außerdem war die Suppe kalt. Schreibe, was du dem Kellner sagst (3–4 Sätze, höflich aber bestimmt).'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Im Restaurant bestellen'),
    leer(),
    h2('Aufgabe 1: Tischreservierung — Musterlösung'),
    p('Du: „Guten Abend! Ich möchte gerne einen Tisch für Freitagabend reservieren."'),
    p('Restaurant: „Für wie viele Personen und um wie viel Uhr?"'),
    p('Du: „Für vier Personen um 19:30 Uhr, bitte."'),
    p('Restaurant: „Und auf welchen Namen?"'),
    p('Du: „Auf [Name]. Wäre es möglich, einen Tisch am Fenster zu bekommen?"'),
    p('Restaurant: „Ich schaue … Ja, das ist möglich. Gibt es noch besondere Wünsche?"'),
    p('Du: „Ja, eine Person isst vegetarisch. Gibt es vegetarische Gerichte?"'),
    p('Restaurant: „Ja, natürlich. Sehr gut, bis Freitag!"'),
    leer(),
    p('→ Individuelle Varianten akzeptieren. Auf höfliche Sie-Form achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Bestellung — Beispiel'),
    p('Ich nehme die Tomatensuppe als Vorspeise, weil ich Suppe sehr mag.'),
    p('Als Hauptgericht hätte ich gerne den Schweinebraten mit Knödeln — das ist ein typisch deutsches Gericht.'),
    p('Dazu bitte ein Wasser und ein Glas Weißwein.'),
    leer(),
    h2('Aufgaben 3 und 4'),
    p('→ Individuelle Antworten. Perfekt korrekt einsetzen. Reklamation höflich, aber klar.', { color: '388E3C', italics: true }),
    p('Beispiel Reklamation: „Entschuldigung, ich habe das Steak medium bestellt, aber es ist durch. Könnten Sie es bitte zurückbringen? Außerdem war die Suppe leider kalt."'),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Restaurant bestellen — Leseübung'),
    leer(),
    h2('Lesetext: „Das erste Mal in einem deutschen Restaurant"'),
    leer(),
    p('Ibrahim Al-Rashid kommt aus dem Irak und wohnt seit acht Monaten in Köln. Letzte Woche hat sein Kollege Jonas ihn zum Abendessen eingeladen — in ein typisch deutsches Restaurant in der Altstadt.'),
    leer(),
    p('Als sie ankamen, bat Jonas den Kellner um einen Tisch für zwei. Der Kellner führte sie zu einem gemütlichen Tisch am Fenster. Kurz danach brachte er die Speisekarte. Ibrahim schaute sie neugierig an: „Was ist ein Sauerbraten?" Jonas erklärte: „Das ist Rindfleisch, das mehrere Tage in Essig und Gewürzen mariniert wird. Es schmeckt leicht sauer und süß — sehr lecker!"'),
    leer(),
    p('Ibrahim bestellte den Sauerbraten mit Kartoffelklößen und Rotkohl. Jonas nahm das Tagesgericht: Forelle mit Mandelbutter und Petersilienkartoffeln. Als Vorspeise teilten sie sich eine Portion Brezel mit Obatzda — eine bayrische Käsecreme.'),
    leer(),
    p('Das Essen war ausgezeichnet. Ibrahim war begeistert: „Der Sauerbraten ist wirklich besonders — ich habe so etwas noch nie gegessen." Jonas lächelte: „Deutsche Küche ist oft Soulfood — herzhaft, warm und sättigend."'),
    leer(),
    p('Als die Rechnung kam, wollte Ibrahim die Hälfte zahlen. „Nein, nein — heute lade ich ein!", sagte Jonas. Der Kellner fragte: „Zusammen oder getrennt?" — „Zusammen, bitte", antwortete Jonas. Er gab dem Kellner 60 Euro für eine Rechnung von 54,30 Euro: „Stimmt so!"'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Ibrahim und Jonas sitzen an einem Tisch in der Mitte des Restaurants.  ___'),
    p('2. Sauerbraten ist Rindfleisch in Essig mariniert.  ___'),
    p('3. Ibrahim bestellt Forelle als Hauptgericht.  ___'),
    p('4. Sie teilen sich eine Vorspeise.  ___'),
    p('5. Ibrahim bezahlt die Rechnung.  ___'),
    p('6. „Stimmt so" bedeutet: das Wechselgeld behalten.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Was erklärt Jonas über den Sauerbraten?'),
    linie(), linie(), leer(),
    p('2. Was hat Ibrahim bestellt? Was hat Jonas bestellt?'),
    linie(), linie(), leer(),
    p('3. Was bedeutet „Soulfood" laut Jonas?'),
    linie(), leer(),
    p('4. Wie viel Trinkgeld hat Jonas gegeben?'),
    linie(), leer(),
    h2('Aufgabe 3: Im Restaurant — Reihenfolge'),
    p('Bringe die Schritte eines Restaurantbesuchs in die richtige Reihenfolge. Schreibe die Zahlen 1–7.'),
    leer(),
    p('___ Die Rechnung bezahlen.'),
    p('___ Die Speisekarte bekommen und lesen.'),
    p('___ Das Essen genießen.'),
    p('___ Einen Tisch bekommen.'),
    p('___ Bestellen.'),
    p('___ Ins Restaurant kommen und begrüßt werden.'),
    p('___ Das Essen wird gebracht.'),
    leer(),
    h2('Aufgabe 4: Deine Meinung'),
    p('Warst du schon einmal in einem deutschen Restaurant oder Café? Was hast du gegessen? Wie war es? Schreibe 3–4 Sätze.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Im Restaurant bestellen'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. F — Sie sitzen an einem Tisch am Fenster.'),
    p('2. R — Rindfleisch in Essig und Gewürzen mariniert.'),
    p('3. F — Ibrahim bestellt Sauerbraten. Jonas bestellt Forelle.'),
    p('4. R — Sie teilen sich eine Portion Brezel mit Obatzda.'),
    p('5. F — Jonas bezahlt und lädt ein.'),
    p('6. R — „Stimmt so" = das Wechselgeld kann der Kellner behalten (= Trinkgeld).'),
    leer(),
    h2('Aufgabe 2: Fragen'),
    p('1. Jonas erklärt: Sauerbraten ist Rindfleisch, mehrere Tage in Essig und Gewürzen mariniert. Es schmeckt leicht sauer und süß.'),
    p('2. Ibrahim: Sauerbraten mit Kartoffelklößen und Rotkohl. Jonas: Forelle mit Mandelbutter und Petersilienkartoffeln.'),
    p('3. Soulfood = herzhaft, warm und sättigend.'),
    p('4. Trinkgeld: 60 − 54,30 = 5,70 Euro.'),
    leer(),
    h2('Aufgabe 3: Reihenfolge'),
    p('7 — 2 — 5 — 3 — 4 — 1 — 6'),
    p('Richtige Reihenfolge:'),
    p('1. Ins Restaurant kommen und begrüßt werden.'),
    p('2. Einen Tisch bekommen.'),
    p('3. Die Speisekarte bekommen und lesen.'),
    p('4. Bestellen.'),
    p('5. Das Essen wird gebracht.'),
    p('6. Das Essen genießen.'),
    p('7. Die Rechnung bezahlen.'),
  ];
  await save(children, `${TOPIC}_Lesen_LOESUNG.docx`);
};

// ==================== LÜCKEN ====================
const createLuecken = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Restaurant bestellen — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Speisekarte | Vorspeise | Hauptgericht | Nachspeise | Kellner | Rechnung | Tagesgericht',
      'bestellen | empfehlen | reservieren | schmeckt | getrennt | Trinkgeld | vegetarisch | durch',
    ]),
    leer(),
    h2('Aufgabe 1: Im Restaurant — Lückentext'),
    p('Ergänze die fehlenden Wörter aus dem Wörterkasten.'),
    leer(),
    p('Mia und Luca gehen heute Abend in ein Restaurant. Luca hat vorher einen Tisch für zwei Personen _____________. Als sie ankommen, bringt der _____________ sofort die _____________. „Was nimmst du?", fragt Mia. „Ich weiß noch nicht — was kannst du mir _____________?" antwortet Luca.'),
    leer(),
    p('Die Kellnerin kommt: „Darf ich _____________ erklären: Heute haben wir als _____________ eine Kürbissuppe und als _____________ ein gebratenes Hähnchen mit Gemüse." Luca nimmt das Hähnchen. Mia wählt die Kürbissuppe als _____________ und die Lachspasta als _____________. Als _____________ teilen sie sich ein Stück Apfelstrudel.'),
    leer(),
    p('Das Essen _____________ beiden sehr gut. Am Ende bittet Luca um die _____________. „_____________ oder zusammen?" fragt die Kellnerin. „Zusammen, bitte." Luca gibt 10% _____________.'),
    leer(),
    h2('Aufgabe 2: Im Restaurant — Dialog'),
    p('Ergänze den Dialog. Wähle: hätte gerne | nehme | empfehlen | durch | Rechnung | Trinkgeld'),
    leer(),
    p('Kellner:  „Haben Sie schon gewählt?"'),
    leer(),
    p('Gast A:  „Ja, ich _____________ die Tomatensuppe als Vorspeise."'),
    leer(),
    p('Gast B:  „Und ich _____________ das Tagesgericht, bitte."'),
    leer(),
    p('Kellner:  „Sehr gerne. Und was darf ich zum Trinken _____________?"'),
    leer(),
    p('Gast A:  „Können Sie mir einen Wein _____________? Ich trinke gerne Rotwein."'),
    leer(),
    p('Kellner:  „Den Grauburgunder empfehle ich gerne. Wie möchten Sie das Steak — medium oder _______________?"'),
    leer(),
    p('Gast B:  „Medium, bitte."'),
    leer(),
    p('[Später] Gast A:  „Entschuldigung — die _______________, bitte!"'),
    leer(),
    h2('Aufgabe 3: Speisen beschreiben — Adjektivendungen'),
    p('Ergänze die richtige Adjektivendung nach dem bestimmten Artikel (der/die/das/die).'),
    leer(),
    grammarBox([
      'Adjektivendungen nach bestimmtem Artikel:',
      '  Nominativ:  der rot-e Wein | die frisch-e Suppe | das gebrat-ene Hähnchen',
      '  Akkusativ:  den rot-en Wein | die frisch-e Suppe | das gebrat-ene Hähnchen',
    ]),
    leer(),
    p('1. Ich nehme den gebrat_____ Lachs. (Maskulinum, Akkusativ)'),
    leer(),
    p('2. Die frisch_____ Tomatensuppe ist sehr lecker. (Femininum, Nominativ)'),
    leer(),
    p('3. Das gegrillte Hähnchen schmeckt gut. Das gebrat_____ Gemüse auch. (Neutrum, Nominativ)'),
    leer(),
    p('4. Ich empfehle den heiß_____ Apfelstrudel. (Maskulinum, Akkusativ)'),
    leer(),
    p('5. Die kalt_____ Gurkensuppe ist eine Spezialität. (Femininum, Nominativ)'),
    leer(),
    h2('Aufgabe 4: Geschmack beschreiben'),
    p('Verbinde das Gericht mit dem passenden Geschmack. Schreibe einen Satz.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Gericht', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Geschmack', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Dein Satz', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Zitronentarte', 'süß und sauer', ''],
          ['Chilisoße', 'sehr scharf', ''],
          ['Sauerbraten', 'leicht sauer und herzhaft', ''],
          ['Käsekuchen', 'cremig und süß', ''],
        ].map(([g, gs, s]) => new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: g, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: gs, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 3772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: s || '___________________________', font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Im Restaurant bestellen'),
    leer(),
    h2('Aufgabe 1: Restauranttext'),
    p('reserviert | Kellner | Speisekarte | empfehlen | Tagesgericht | Vorspeise | Hauptgericht | Vorspeise | Hauptgericht | Nachspeise | schmeckt | Rechnung | Getrennt | Trinkgeld'),
    leer(),
    h2('Aufgabe 2: Dialog'),
    p('nehme | hätte gerne | bringen | empfehlen | durch | Rechnung'),
    leer(),
    h2('Aufgabe 3: Adjektivendungen'),
    p('1. den gebratenen Lachs  (Mask., Akk. → -en)'),
    p('2. Die frische Tomatensuppe  (Fem., Nom. → -e)'),
    p('3. Das gebratene Gemüse  (Neutr., Nom. → -e)'),
    p('4. den heißen Apfelstrudel  (Mask., Akk. → -en)'),
    p('5. Die kalte Gurkensuppe  (Fem., Nom. → -e)'),
    leer(),
    grammarBox([
      'Adjektivendungen nach bestimmtem Artikel — Zusammenfassung:',
      '  Nom. Mask.:  -e     Nom. Fem.:  -e     Nom. Neutr.:  -e',
      '  Akk. Mask.:  -en    Akk. Fem.:  -e     Akk. Neutr.:  -e',
      '  → Nach dem bestimmten Artikel: fast immer -e oder -en (außer Dativ: -en)',
    ]),
    leer(),
    h2('Aufgabe 4: Geschmack'),
    p('Die Zitronentarte schmeckt süß und sauer.'),
    p('Die Chilisoße ist sehr scharf.'),
    p('Der Sauerbraten schmeckt leicht sauer und herzhaft.'),
    p('Der Käsekuchen ist cremig und süß.'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const restaurantDaten = [
    ['die Speisekarte, -n', 'Nomen', 'Kann ich bitte die Speisekarte haben?'],
    ['die Vorspeise, -n', 'Nomen', 'Als Vorspeise nehme ich die Suppe.'],
    ['das Hauptgericht, -e', 'Nomen', 'Das Hauptgericht kommt gleich.'],
    ['die Nachspeise / das Dessert', 'Nomen', 'Als Dessert hätte ich gerne Eis.'],
    ['der Kellner / die Kellnerin', 'Nomen', 'Der Kellner bringt die Speisekarte.'],
    ['das Tagesgericht, -e', 'Nomen', 'Was ist heute das Tagesgericht?'],
    ['bestellen', 'Verb', 'Ich möchte das Schnitzel bestellen.'],
    ['empfehlen', 'Verb', 'Was können Sie mir empfehlen?'],
    ['reservieren', 'Verb', 'Ich habe einen Tisch reserviert.'],
    ['das Trinkgeld (nur Sg.)', 'Nomen', 'In Deutschland gibt man ca. 10% Trinkgeld.'],
    ['getrennt / zusammen', 'Adjektiv/Adverb', 'Zahlen Sie getrennt oder zusammen?'],
    ['Stimmt so!', 'Ausdruck', 'Das Wechselgeld dürfen Sie behalten.'],
  ];

  const geschmackDaten = [
    ['scharf', 'Adjektiv', 'Das Curry ist sehr scharf.'],
    ['süß', 'Adjektiv', 'Der Kuchen schmeckt süß.'],
    ['sauer', 'Adjektiv', 'Die Zitrone ist sauer.'],
    ['salzig', 'Adjektiv', 'Die Suppe ist zu salzig.'],
    ['bitter', 'Adjektiv', 'Der Kaffee ohne Zucker schmeckt bitter.'],
    ['herzhaft', 'Adjektiv', 'Braten ist ein herzhaftes Gericht.'],
    ['gebraten', 'Partizip (Adj.)', 'Ich nehme das gebratene Hähnchen.'],
    ['gegrillt', 'Partizip (Adj.)', 'Die gegrillte Forelle ist heute frisch.'],
    ['gekocht', 'Partizip (Adj.)', 'Die Kartoffeln sind gekocht.'],
    ['vegetarisch', 'Adjektiv', 'Gibt es auch vegetarische Gerichte?'],
  ];

  const makeTable = (rows) => new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [
        new TableCell({ width: { size: 3700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Wort / Phrase', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 1700, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Typ', bold: true, font: 'Arial', size: 22 })] })] }),
        new TableCell({ width: { size: 4372, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Beispielsatz', bold: true, font: 'Arial', size: 22 })] })] }),
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
    h1('Im Restaurant bestellen — Wortliste'),
    leer(),
    h2('Teil 1: Im Restaurant'),
    makeTable(restaurantDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...restaurantDaten.slice(0, 7).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0].split('/')[0].trim()}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Geschmack und Zubereitung'),
    makeTable(geschmackDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...geschmackDaten.slice(0, 6).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    infoBox([
      'Nützliche Sätze im Restaurant:',
      'Bestellen:       Ich hätte gerne … / Ich nehme … / Für mich bitte … / Was empfehlen Sie?',
      'Nachfragen:     Was ist …? / Ist das vegetarisch? / Enthält das Gluten?',
      'Reklamieren:    Das ist zu kalt/salzig. / Das ist nicht durch. / Könnten Sie das bitte …?',
      'Bezahlen:       Die Rechnung bitte! / Getrennt oder zusammen? / Stimmt so! / Hier bitte.',
      'Reservieren:    Ich möchte einen Tisch für … Personen reservieren. / Um … Uhr. / Auf den Namen …',
    ]),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Im Restaurant bestellen'),
    leer(),
    p('→ Individuelle Übersetzungen akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Zusatz: Typische deutsche Gerichte'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Gericht', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Region', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Kurze Beschreibung', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Sauerbraten', 'Rheinland', 'Mariniertes Rindfleisch, süß-sauer, mit Klößen'],
          ['Wiener Schnitzel', 'Wien/Bayern', 'Paniertes Kalbfleisch, flach gebraten'],
          ['Bratwurst', 'Franken/D-weit', 'Gegrillte Wurst, mit Senf und Brot'],
          ['Käsespätzle', 'Schwaben', 'Nudeln mit Käse überbacken, mit Röstzwiebeln'],
          ['Labskaus', 'Hamburg/Norden', 'Fleisch-Kartoffel-Rüben-Gericht, mit Spiegelei'],
          ['Apfelstrudel', 'Bayern/Österreich', 'Gebäck mit Apfelfüllung, warm mit Vanillesauce'],
        ].map(([g, r, b]) => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: g, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: r, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
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
    h1('Im Restaurant bestellen — Konversation'),
    leer(),
    h2('Aufgabe 1: Im Restaurant — vollständiger Dialog'),
    p('Person A und B sind Gäste. Person C ist Kellner/in. Ergänzt und übt den Dialog.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['C:', 'Guten Abend! Haben Sie _____________ oder kommen Sie ohne Reservierung?'],
          ['A:', 'Wir haben einen Tisch für zwei Personen reserviert. Auf den Namen _____________.'],
          ['C:', 'Ja, einen Moment … Hier bitte, Ihr Tisch. Ich bringe Ihnen gleich die _____________.'],
          ['A:', 'Danke! Was ist heute das _____________?'],
          ['C:', 'Heute empfehle ich die gegrillte _____________ mit Kräuterbutter. Sehr frisch!'],
          ['B:', 'Klingt gut! Ich bin allerdings _____________ — gibt es auch etwas ohne Fleisch?'],
          ['C:', 'Natürlich! Wir haben eine _____________ und Käsespätzle.'],
          ['A:', 'Ich hätte gerne _____________ und als Getränk ein _____________.'],
          ['B:', 'Für mich bitte die _____________ und ein Wasser.'],
          ['C:', 'Sehr gerne. Einen Moment, bitte.'],
          ['A:', 'Entschuldigung — könnten Sie uns noch etwas _____________ bringen?'],
          ['A:', 'Die _____________, bitte! … Stimmt _____________!'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen!', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Rollenspiel — Tischreservierung am Telefon'),
    p('Person A ruft im Restaurant an. Person B ist der Restaurantmitarbeiter / die Restaurantmitarbeiterin.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person A — Gast', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Reserviere einen Tisch:', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Samstag, 20:00 Uhr', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• 6 Personen', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• 2 Personen vegetarisch', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Frage nach Parkmöglichkeiten', font: 'Arial', size: 22, italics: true })] }),
        ]}),
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person B — Restaurant', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Informationen:', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Samstag 20 Uhr: Tisch frei', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Vegetarisches Menü vorhanden', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Parkplatz: 200m entfernt', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Frage nach dem Namen', font: 'Arial', size: 22, italics: true })] }),
        ]}),
      ]})]
    }),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Essen und Restaurant'),
    p('Frag deinen Partner / deine Partnerin und notiere die Antworten.'),
    leer(),
    p('1. Gehst du gerne in Restaurants? Was ist dein Lieblingsrestaurant oder deine Lieblingsküche?'),
    linie(), leer(),
    p('2. Was isst du lieber — zu Hause oder im Restaurant? Warum?'),
    linie(), leer(),
    p('3. Hast du schon einmal eine Bestellung reklamiert? Was war das Problem?'),
    linie(), leer(),
    p('4. Was ist das teuerste oder ungewöhnlichste Essen, das du je probiert hast?'),
    linie(), leer(),
    p('5. Was ist typisches Essen aus deinem Heimatland? Würdest du es gerne in einem Restaurant anbieten?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenspiel — Restaurant-Simulation'),
    p('Spielt ein komplettes Restaurant-Szenario:'),
    bullet('1 Person = Kellner/in (erklärt die Karte, nimmt Bestellungen auf)'),
    bullet('2–4 Personen = Gäste (bestellen, fragen, reklamieren, bezahlen)'),
    p('Die Gruppe bewertet: War die Bestellung korrekt? War die Kommunikation höflich?', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Im Restaurant bestellen'),
    leer(),
    h2('Aufgabe 1: Dialog — mögliche Lösungen'),
    p('C: „… eine Reservierung …"'),
    p('A: „… [Name]."'),
    p('C: „… die Speisekarte."'),
    p('A: „… das Tagesgericht?"'),
    p('C: „… die Forelle / den Lachs …"'),
    p('B: „… vegetarisch …"'),
    p('C: „… Gemüsepfanne / Vegipasta …"'),
    p('A: „… [Hauptgericht] … [Getränk]."'),
    p('B: „… Gemüsepfanne / Vegispätzle …"'),
    p('A: „… Brot / Wasser …"'),
    p('A: „… Rechnung … so!"'),
    leer(),
    p('→ Auf Höflichkeitsform achten. Bestellungen klar formulieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Korrekte Bestellformeln: Ich hätte gerne … / Für mich bitte … / Ich nehme …'),
    bullet('Höfliche Rückfragen: Was empfehlen Sie? / Ist das vegetarisch?'),
    bullet('Korrekte Adjektivendungen bei Gerichtsbeschreibungen'),
    bullet('Bezahlen: Rechnung, Trinkgeld, Stimmt so / Zusammen oder getrennt?'),
    bullet('Tischreservierung: Datum, Uhrzeit, Personenzahl, Name nennen'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Im Restaurant bestellen — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Im Restaurant — was passiert?'),
    p('[BILD 1: Ein Restaurant-Innenraum — ein Paar sitzt am Tisch, der Kellner steht daneben mit Notizblock, auf dem Tisch liegt die Speisekarte, auf einem anderen Tisch stehen Weingläser]'),
    leer(),
    p('Beschreibe das Bild (3–4 Sätze). Was passiert gerade? Was sagen die Personen wahrscheinlich?'),
    leer(),
    ...Array(4).fill(null).map(linie),
    leer(),
    h2('Aufgabe 2: Speisekarte lesen und reagieren'),
    p('[BILD 2: Eine einfache Speisekarte mit diesen Einträgen:'),
    p('  Tagessuppe (Linsensuppe, vegan) ............... 4,50 €'),
    p('  Wiener Schnitzel mit Pommes ..................... 15,90 €'),
    p('  Lachs auf Spinat mit Reis ......................... 18,50 €'),
    p('  Vegetarische Gemüsepfanne ...................... 12,80 €'),
    p('  Tiramisu ................................................... 5,80 €'),
    p('  Apfelstrudel warm mit Vanillesauce ............. 6,20 €]'),
    leer(),
    p('1. Du bist Vegetarier/in. Was kannst du bestellen?'),
    linie(), leer(),
    p('2. Du hast ein Budget von 25 Euro (inkl. Getränk für 3 Euro). Was bestellst du?'),
    linie(), linie(), leer(),
    p('3. Schreibe deine Bestellung als Dialog mit dem Kellner (4 Zeilen).'),
    leer(),
    ...Array(4).fill(null).map(linie),
    leer(),
    h2('Aufgabe 3: Tisch gedeckt — beschriften'),
    p('[BILD 3: Ein gedeckter Tisch mit: Teller, Messer, Gabel, Löffel, Weinglas, Wasserglas, Serviette, Brotkorb, Salz- und Pfefferstreuer]'),
    leer(),
    p('Beschrifte alle Gegenstände auf dem Bild. Schreibe dann 3 Sätze mit: liegt / steht / ist.'),
    leer(),
    p('1. _______________________________________________'),
    p('2. _______________________________________________'),
    p('3. _______________________________________________'),
    leer(),
    h2('Aufgabe 4: Situation beurteilen'),
    p('[BILD 4: Ein Gast schaut unzufrieden auf seinen Teller. Das Steak sieht sehr dunkel/durch aus. Der Kellner steht daneben mit fragendem Gesichtsausdruck.]'),
    leer(),
    p('Was ist das Problem? Was sagt der Gast wahrscheinlich? Schreibe 4–5 Zeilen Dialog.'),
    leer(),
    p('Gast:  „_____________________________________________"'),
    leer(),
    p('Kellner:  „_____________________________________________"'),
    leer(),
    p('Gast:  „_____________________________________________"'),
    leer(),
    p('Kellner:  „_____________________________________________"'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Im Restaurant bestellen'),
    leer(),
    p('Hinweis: Antworten hängen von den eingefügten Bildern ab. Folgende Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Restaurantszene — Musterantworten'),
    p('Ein Paar sitzt in einem gemütlichen Restaurant. Der Kellner steht am Tisch und hält einen Notizblock in der Hand.'),
    p('Wahrscheinlich nimmt er gerade die Bestellung auf.'),
    p('Kellner: „Was darf ich Ihnen bringen?" | Gast: „Ich hätte gerne das Tagesgericht, bitte."'),
    leer(),
    h2('Aufgabe 2: Speisekarte'),
    p('1. Als Vegetarier/in: Tagessuppe (vegan), Vegetarische Gemüsepfanne, Tiramisu, Apfelstrudel.'),
    p('2. Budget 25 €: z. B. Gemüsepfanne (12,80) + Getränk (3,00) + Tiramisu (5,80) = 21,60 € → passt.'),
    p('   Oder: Wiener Schnitzel (15,90) + Getränk (3,00) = 18,90 € → auch möglich.'),
    p('3. Beispiel-Dialog:'),
    p('Gast: „Ich hätte gerne die Gemüsepfanne, bitte."'),
    p('Kellner: „Sehr gerne. Und zu trinken?"'),
    p('Gast: „Ein Wasser, bitte."'),
    p('Kellner: „Kommt sofort!"'),
    leer(),
    h2('Aufgabe 3: Gedeckter Tisch'),
    p('Der Teller liegt in der Mitte. Die Gabel liegt links, das Messer liegt rechts.'),
    p('Das Weinglas steht rechts oben, das Wasserglas steht daneben.'),
    p('Die Serviette liegt links neben der Gabel.'),
    leer(),
    h2('Aufgabe 4: Reklamation — Musterdialog'),
    p('Gast: „Entschuldigung — ich habe das Steak medium bestellt, aber es ist komplett durch."'),
    p('Kellner: „Das tut mir leid! Soll ich es zurückbringen und neu machen lassen?"'),
    p('Gast: „Ja, bitte. Und könnten Sie bitte auch etwas Brot bringen, während ich warte?"'),
    p('Kellner: „Selbstverständlich! Ich kümmere mich sofort darum."'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Bestellungen mit Ich hätte gerne / Ich nehme / Für mich bitte'),
    bullet('Reklamation höflich: Das ist leider … / Könnten Sie bitte …?'),
    bullet('Gegenstände korrekt benennen (der Teller, die Gabel, das Glas …)'),
    bullet('Reihenfolge Restaurantbesuch einhalten'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Im Restaurant bestellen');
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
