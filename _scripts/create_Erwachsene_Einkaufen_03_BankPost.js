'use strict';
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType, BorderStyle,
  ShadingType, HeadingLevel, LevelFormat, PageBreak
} = require('docx');

const TOPIC = 'A2_Erwachsene_Einkaufen_03_BankPost';
const OUTPUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '03_Einkaufen', '03_BankPost');
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
    children: [new TextRun({ text: 'A2 Erwachsene — Einkaufen & Dienstleistungen — Bank und Post', italics: true, size: 18, color: '888888', font: 'Arial' })]
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
    h1('Bank und Post — Schreibübung'),
    leer(),
    infoBox([
      'Nützliche Phrasen bei der Bank:',
      'Ich möchte ein Konto eröffnen. | Ich möchte Geld abheben / einzahlen.',
      'Ich möchte eine Überweisung machen. | Was sind die Konditionen für ein Girokonto?',
      'Meine IBAN ist: DE__ ____ ____ ____ ____ __     |     BLZ: ___________',
      '',
      'Nützliche Phrasen bei der Post:',
      'Ich möchte dieses Paket / diesen Brief nach [Land] schicken.',
      'Wie lange dauert die Lieferung? | Was kostet das Porto? | Mit oder ohne Sendungsverfolgung?',
      'Ich möchte das als Einschreiben schicken.',
    ]),
    leer(),
    h2('Aufgabe 1: Bei der Bank — Anfrage schreiben'),
    p('Du möchtest bei einer deutschen Bank ein Girokonto eröffnen. Schreibe eine E-Mail an die Bank. Frage nach: Konditionen (Gebühren?), benötigten Dokumenten, Online-Banking, und ob du einen Termin brauchst.'),
    leer(),
    p('Betreff: Anfrage zur Kontoeröffnung', { bold: true }),
    leer(),
    p('Sehr geehrte Damen und Herren,'),
    leer(),
    ...Array(6).fill(null).map(linie),
    leer(),
    p('Mit freundlichen Grüßen,'),
    p('___________________________'),
    leer(),
    h2('Aufgabe 2: Eine Überweisung beschreiben'),
    p('Du möchtest 250 Euro an deinen Freund Markus überweisen. Fülle die Überweisungsvorlage aus (erfundene Daten sind okay).'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        ...[
          ['Empfänger (Name):', '___________________________'],
          ['IBAN des Empfängers:', 'DE__ ____ ____ ____ ____ __'],
          ['Betrag (€):', '___________________________'],
          ['Verwendungszweck:', '___________________________'],
          ['Datum:', '___________________________'],
          ['Auftraggeber (dein Name):', '___________________________'],
        ].map(([label, val]) => new TableRow({ children: [
          new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6272, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: val, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Aufgabe 3: Bei der Post — Paket beschriften'),
    p('Du schickst ein Paket nach Spanien an deinen Bruder. Schreibe die Adressfelder aus (erfundene Daten).'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Absender (Von):', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Name: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Straße: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'PLZ / Ort: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Land: Deutschland', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Empfänger (An):', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Name: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Straße: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'PLZ / Ort: ___________________________', font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Land: Spanien', font: 'Arial', size: 22 })] }),
          ]}),
        ]}),
      ]
    }),
    leer(),
    p('Schreibe 3 Sätze: Was schickst du? Wie lange dauert die Lieferung? Mit oder ohne Sendungsverfolgung?'),
    leer(),
    ...Array(3).fill(null).map(linie),
    leer(),
    h2('Aufgabe 4: Freies Schreiben'),
    p('Wie erledigst du Bankgeschäfte — in der Filiale oder online? Was findest du einfacher oder schwieriger? Schreibe 4–5 Sätze.'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Schreiben.docx`);
};

const createSchreibenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Schreibübung: Bank und Post'),
    leer(),
    h2('Aufgabe 1: E-Mail Bank — Musterlösung'),
    p('Betreff: Anfrage zur Kontoeröffnung', { bold: true }),
    p('Sehr geehrte Damen und Herren,'),
    p('ich möchte gerne ein Girokonto bei Ihrer Bank eröffnen. Ich habe einige Fragen dazu:'),
    p('Welche monatlichen Gebühren fallen für ein Girokonto an? Welche Dokumente benötige ich für die Kontoeröffnung? Bieten Sie Online-Banking an? Und brauche ich einen Termin, oder kann ich direkt in die Filiale kommen?'),
    p('Ich freue mich auf Ihre Antwort.'),
    p('Mit freundlichen Grüßen, [Name]'),
    leer(),
    p('→ Auf korrekte formelle Sprache und vollständige Fragen achten.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Überweisungsvorlage — Beispiel'),
    p('Empfänger: Markus Bauer | IBAN: DE89 3704 0044 0532 0130 00'),
    p('Betrag: 250,00 € | Verwendungszweck: Miete April | Datum: [aktuelles Datum]'),
    leer(),
    h2('Aufgaben 3 und 4'),
    p('→ Individuelle Antworten. Auf korrekte Adressangaben und Modalverben achten.', { color: '388E3C', italics: true }),
  ];
  await save(children, `${TOPIC}_Schreiben_LOESUNG.docx`);
};

// ==================== LESEN ====================
const createLesen = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Bank und Post — Leseübung'),
    leer(),
    h2('Lesetext: „Neu in Deutschland — Konto und Paket"'),
    leer(),
    p('Amir Hosseini kommt aus dem Iran und wohnt seit sechs Monaten in Frankfurt. Er hat gerade eine Stelle als Ingenieur gefunden und muss jetzt viele Dinge organisieren — unter anderem ein Bankkonto und einen Postbesuch.'),
    leer(),
    p('Zuerst geht Amir zur Sparkasse. Er möchte ein Girokonto eröffnen. Der Berater, Herr Kaufmann, erklärt ihm alles: „Sie brauchen Ihren Reisepass, Ihre Meldebestätigung und Ihren Arbeitsvertrag." Amir hat alle Dokumente dabei. Das Konto wird sofort eröffnet. Amir bekommt eine EC-Karte — die PIN kommt in ein paar Tagen per Post. Herr Kaufmann erklärt auch das Online-Banking: „Mit unserer App können Sie jederzeit Überweisungen machen und Ihren Kontoauszug einsehen."'),
    leer(),
    p('Danach geht Amir zur Post. Er möchte zwei Pakete schicken: eines nach Österreich — darin sind Bücher für seine Schwester — und eines in den Iran für seine Eltern. Das Paket nach Österreich wiegt 3 Kilogramm und kostet 9,49 Euro. Das Paket in den Iran ist schwerer: 5 Kilogramm, Standardlieferung, 28,90 Euro. Amir wählt für das Iran-Paket die Option mit Sendungsverfolgung — dann können seine Eltern sehen, wo das Paket ist.'),
    leer(),
    p('„In Deutschland läuft alles sehr strukturiert", sagt Amir. „Am Anfang war es viel auf einmal, aber jetzt verstehe ich, wie es funktioniert."'),
    leer(),
    h2('Aufgabe 1: Richtig (R) oder falsch (F)?'),
    leer(),
    p('1. Amir möchte ein Sparkonto eröffnen.  ___'),
    p('2. Er braucht drei Dokumente für die Kontoeröffnung.  ___'),
    p('3. Die EC-Karte bekommt er sofort.  ___'),
    p('4. Das Paket nach Österreich enthält Bücher.  ___'),
    p('5. Das Paket in den Iran kostet 9,49 Euro.  ___'),
    p('6. Amir wählt Sendungsverfolgung für das Iran-Paket.  ___'),
    leer(),
    h2('Aufgabe 2: Fragen zum Text'),
    p('1. Welche drei Dokumente braucht Amir für die Kontoeröffnung?'),
    linie(), leer(),
    p('2. Wann und wie bekommt Amir seine PIN?'),
    linie(), leer(),
    p('3. Was kann Amir mit der Banking-App machen?'),
    linie(), linie(), leer(),
    p('4. Warum wählt Amir die Sendungsverfolgung für das Iran-Paket?'),
    linie(), leer(),
    h2('Aufgabe 3: Kosten berechnen'),
    p('Amir bezahlt heute zwei Pakete. Wie viel zahlt er insgesamt an der Post?'),
    leer(),
    p('Paket 1 (Österreich):  _______________ €'),
    p('Paket 2 (Iran):         _______________ €'),
    p('Gesamt:                 _______________ €'),
    leer(),
    h2('Aufgabe 4: Deine Erfahrung'),
    p('Hast du schon einmal in Deutschland (oder einem anderen Land) ein Konto eröffnet oder ein Paket geschickt? Was war einfach, was war schwierig? Schreibe 3–4 Sätze.'),
    leer(),
    ...Array(4).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Lesen.docx`);
};

const createLesenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Leseübung: Bank und Post'),
    leer(),
    h2('Aufgabe 1: Richtig oder falsch?'),
    p('1. F — Amir möchte ein Girokonto eröffnen (kein Sparkonto).'),
    p('2. R — Reisepass, Meldebestätigung, Arbeitsvertrag.'),
    p('3. F — Die EC-Karte bekommt er, aber die PIN kommt in ein paar Tagen per Post.'),
    p('4. R — Im Paket nach Österreich sind Bücher für seine Schwester.'),
    p('5. F — Das Iran-Paket kostet 28,90 €. Das Österreich-Paket kostet 9,49 €.'),
    p('6. R — Amir wählt Sendungsverfolgung für das Iran-Paket.'),
    leer(),
    h2('Aufgabe 2: Fragen'),
    p('1. Reisepass, Meldebestätigung und Arbeitsvertrag.'),
    p('2. Die PIN kommt in ein paar Tagen per Post.'),
    p('3. Er kann Überweisungen machen und den Kontoauszug einsehen.'),
    p('4. Damit seine Eltern sehen können, wo das Paket ist.'),
    leer(),
    h2('Aufgabe 3: Kosten'),
    p('Paket 1: 9,49 €'),
    p('Paket 2: 28,90 €'),
    p('Gesamt: 38,39 €'),
  ];
  await save(children, `${TOPIC}_Lesen_LOESUNG.docx`);
};

// ==================== LÜCKEN ====================
const createLuecken = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Bank und Post — Lückentext'),
    leer(),
    infoBox([
      'Wörterkasten:',
      'Konto | Überweisung | Kontoauszug | IBAN | PIN | abheben | einzahlen | Geldautomat',
      'Paket | Brief | Briefmarke | Porto | Einschreiben | wiegt | schicken | Sendungsverfolgung',
    ]),
    leer(),
    h2('Aufgabe 1: Bei der Bank'),
    p('Ergänze die fehlenden Wörter.'),
    leer(),
    p('Lena möchte bei der Bank ein _____________ eröffnen. Der Berater fragt nach ihrer _____________. Das ist eine internationale Kontonummer. Lena bekommt auch eine EC-Karte mit einem _____________. Den darf sie niemandem zeigen!'),
    leer(),
    p('Einmal pro Woche schaut Lena ihren _____________ online an — so weiß sie immer, was sie ausgegeben hat. Wenn sie Geld braucht, geht sie zum _____________ und _____________ Bargeld. Wenn sie Geld auf ihr Konto legen möchte, _____________ sie es ein.'),
    leer(),
    p('Um Geld zu überweisen, macht Lena eine _____________. Dafür braucht sie die _____________ des Empfängers.'),
    leer(),
    h2('Aufgabe 2: Bei der Post — Dialog'),
    p('Ergänze den Dialog. Wähle: Porto | Einschreiben | wiegt | schicken | Sendungsverfolgung | dauert'),
    leer(),
    p('Kunde:  „Guten Tag! Ich möchte diesen Brief nach Italien _____________."'),
    leer(),
    p('Mitarbeiterin:  „Möchten Sie den Brief als normalen Brief oder als _____________?"'),
    leer(),
    p('Kunde:  „Was ist der Unterschied?"'),
    leer(),
    p('Mitarbeiterin:  „Ein Einschreiben hat _____________. Sie bekommen eine Bestätigung, wenn der Brief angekommen ist."'),
    leer(),
    p('Kunde:  „Gut, dann als Einschreiben. Was kostet das _____________?"'),
    leer(),
    p('Mitarbeiterin:  „Der Brief _____________ 45 Gramm — das macht 4,70 Euro. Wie lange _____________ es bis Italien? Etwa 5–7 Werktage."'),
    leer(),
    h2('Aufgabe 3: Abkürzungen und Begriffe erklären'),
    p('Verbinde den Begriff mit der richtigen Erklärung.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Begriff', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Erklärung (schreibe den Buchstaben)', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['IBAN', '___'],
          ['PIN', '___'],
          ['Kontoauszug', '___'],
          ['Überweisung', '___'],
          ['Einschreiben', '___'],
          ['Porto', '___'],
        ].map(([b, e]) => new TableRow({ children: [
          new TableCell({ width: { size: 3200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: b, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 6572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: e, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('A = die Kosten für das Versenden eines Briefes oder Pakets'),
    p('B = internationale Kontonummer, z. B. DE89 3704 …'),
    p('C = Übersicht über alle Ein- und Ausgänge auf dem Konto'),
    p('D = geheime Nummer für EC-Karte oder Kreditkarte'),
    p('E = Geldtransfer von einem Konto auf ein anderes'),
    p('F = Brief oder Paket mit Bestätigung der Zustellung'),
    leer(),
    h2('Aufgabe 4: Modalverben einsetzen'),
    p('Ergänze: möchte / kann / muss / darf / soll'),
    leer(),
    p('1. Ich _____________ ein Konto eröffnen. (Wunsch)'),
    leer(),
    p('2. Du _____________ deinen Ausweis mitbringen — das ist Pflicht. (Notwendigkeit)'),
    leer(),
    p('3. Man _____________ den PIN niemandem zeigen. (Verbot)'),
    leer(),
    p('4. Ich _____________ online Überweisungen machen — das ist sehr praktisch. (Möglichkeit)'),
    leer(),
    p('5. Das Paket _____________ bis Freitag ankommen. (Erwartung)'),
  ];
  await save(children, `${TOPIC}_Luecken.docx`);
};

const createLueckenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Lückentext: Bank und Post'),
    leer(),
    h2('Aufgabe 1: Bei der Bank'),
    p('Konto | IBAN | PIN | Kontoauszug | Geldautomat | hebt … ab | zahlt … ein | Überweisung | IBAN'),
    leer(),
    p('Vollständiger Text:'),
    p('… ein Konto eröffnen. … nach ihrer IBAN. … eine EC-Karte mit einem PIN.'),
    p('… ihren Kontoauszug online … Am Geldautomat hebt sie Bargeld ab. … zahlt sie es ein.'),
    p('… macht Lena eine Überweisung. … die IBAN des Empfängers.'),
    leer(),
    h2('Aufgabe 2: Postdialog'),
    p('schicken | Einschreiben | Sendungsverfolgung | Porto | wiegt | dauert'),
    leer(),
    h2('Aufgabe 3: Abkürzungen'),
    p('IBAN → B    PIN → D    Kontoauszug → C    Überweisung → E    Einschreiben → F    Porto → A'),
    leer(),
    grammarBox([
      'Wichtige Bank- und Post-Begriffe auf einen Blick:',
      'Girokonto = normales Konto für den Alltag (Gehalt, Überweisungen)',
      'Sparkonto = Konto zum Sparen, oft mit Zinsen',
      'EC-Karte = Debitkarte, direkt mit dem Konto verbunden',
      'Kreditkarte = Zahlung auf Kredit, monatliche Abrechnung',
      'IBAN = Internationale Bankkontonummer (DE + 20 Ziffern)',
      'Einschreiben = Brief/Paket mit Unterschrift des Empfängers',
      'Sendungsverfolgung = online verfolgen, wo das Paket ist',
    ]),
    leer(),
    h2('Aufgabe 4: Modalverben'),
    p('1. möchte  (Wunsch = möchten)'),
    p('2. muss    (Pflicht/Notwendigkeit = müssen)'),
    p('3. darf    (Verbot = dürfen + nicht)'),
    p('4. kann    (Möglichkeit = können)'),
    p('5. soll    (Erwartung/Auftrag = sollen)'),
  ];
  await save(children, `${TOPIC}_Luecken_LOESUNG.docx`);
};

// ==================== WORTLISTE ====================
const createWortliste = async () => {
  const bankDaten = [
    ['das Konto, Konten', 'Nomen', 'Ich eröffne ein Girokonto.'],
    ['die Überweisung, -en', 'Nomen', 'Ich mache eine Überweisung von 100 Euro.'],
    ['der Kontoauszug, -auszüge', 'Nomen', 'Der Kontoauszug zeigt alle Buchungen.'],
    ['die IBAN', 'Abkürzung', 'Meine IBAN beginnt mit DE…'],
    ['der Geldautomat, -en', 'Nomen', 'Ich hebe am Geldautomat Geld ab.'],
    ['abheben', 'Verb (trennb.)', 'Ich hebe 200 Euro ab.'],
    ['einzahlen', 'Verb (trennb.)', 'Ich zahle Geld auf mein Konto ein.'],
    ['die EC-Karte, -n', 'Nomen', 'Ich zahle mit meiner EC-Karte.'],
    ['der PIN', 'Nomen', 'Den PIN darf ich niemandem sagen.'],
    ['eröffnen', 'Verb', 'Ich möchte ein Konto eröffnen.'],
  ];

  const postDaten = [
    ['das Paket, -e', 'Nomen', 'Ich schicke ein Paket nach Spanien.'],
    ['der Brief, -e', 'Nomen', 'Ich schreibe einen Brief an meine Eltern.'],
    ['die Briefmarke, -n', 'Nomen', 'Ich brauche eine Briefmarke für diesen Brief.'],
    ['das Porto (nur Sg.)', 'Nomen', 'Das Porto für ein Paket kostet 4,99 Euro.'],
    ['das Einschreiben, -', 'Nomen', 'Ich schicke den Vertrag als Einschreiben.'],
    ['die Sendungsverfolgung', 'Nomen', 'Mit Sendungsverfolgung sehe ich, wo das Paket ist.'],
    ['der Absender, -', 'Nomen', 'Der Absender steht oben links auf dem Paket.'],
    ['der Empfänger, -', 'Nomen', 'Der Empfänger muss unterschreiben.'],
    ['wiegen', 'Verb', 'Das Paket wiegt 2 Kilogramm.'],
    ['schicken / senden', 'Verb', 'Ich schicke das Paket heute noch ab.'],
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
    h1('Bank und Post — Wortliste'),
    leer(),
    h2('Teil 1: Bank-Vokabular'),
    makeTable(bankDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...bankDaten.slice(0, 6).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    h2('Teil 2: Post-Vokabular'),
    makeTable(postDaten),
    leer(),
    p('Meine Übersetzungen:'),
    ...postDaten.slice(0, 6).map(([w]) => new Paragraph({
      children: [
        new TextRun({ text: `${w.split(',')[0]}  →  `, font: 'Arial', size: 22 }),
        new TextRun({ text: '___________________________', font: 'Arial', size: 22 }),
      ]
    })),
    leer(),
    grammarBox([
      'Modalverben — Bedeutungen im Überblick:',
      'möchten  →  Wunsch:       Ich möchte ein Konto eröffnen.',
      'müssen   →  Notwendigkeit: Du musst deinen Ausweis mitbringen.',
      'können   →  Möglichkeit:  Ich kann online überweisen.',
      'dürfen   →  Erlaubnis/Verbot: Man darf den PIN nicht zeigen.',
      'sollen   →  Auftrag/Erwartung: Das Paket soll morgen ankommen.',
      'wollen   →  Absicht:      Ich will heute zur Post gehen.',
    ]),
  ];
  await save(children, `${TOPIC}_Wortliste.docx`);
};

const createWortlisteLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Wortliste: Bank und Post'),
    leer(),
    p('→ Individuelle Übersetzungen akzeptieren.', { color: '388E3C', italics: true }),
    leer(),
    h2('Zusatz: Schritte zur Kontoeröffnung in Deutschland'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Schritt', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was tun?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['1', 'Bank aussuchen: Sparkasse, Volksbank, Deutsche Bank, Online-Bank (N26, DKB, ING)'],
          ['2', 'Dokumente vorbereiten: Reisepass/Ausweis, Meldebestätigung, ggf. Arbeitsvertrag'],
          ['3', 'Termin vereinbaren oder direkt in die Filiale gehen (oder online beantragen)'],
          ['4', 'Formular ausfüllen, Dokumente vorzeigen'],
          ['5', 'EC-Karte + PIN per Post erhalten (meist innerhalb von 1–2 Wochen)'],
          ['6', 'Online-Banking aktivieren'],
        ].map(([s, w]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: s, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: w, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    h2('Paketgrößen bei DHL (Beispiele)'),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Größe', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Max. Gewicht', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Preis (ca., Inland)', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['Päckchen S', '2 kg', 'ab 3,99 €'],
          ['Päckchen M', '2 kg', 'ab 4,99 €'],
          ['Paket S', '5 kg', 'ab 5,49 €'],
          ['Paket M', '10 kg', 'ab 7,49 €'],
          ['Paket L', '31,5 kg', 'ab 11,49 €'],
        ].map(([g, m, pr]) => new TableRow({ children: [
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: g, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: m, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 4772, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: pr, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('Hinweis: Preise können sich ändern — bitte auf der DHL-Website nachsehen.', { color: '888888', italics: true }),
  ];
  await save(children, `${TOPIC}_Wortliste_LOESUNG.docx`);
};

// ==================== KONVERSATION ====================
const createKonversation = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Bank und Post — Konversation'),
    leer(),
    h2('Aufgabe 1: Bei der Bank — Dialog'),
    p('Person A möchte ein Konto eröffnen. Person B ist Bankberater/in. Ergänzt und übt den Dialog.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Person', bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, children: [new Paragraph({ children: [new TextRun({ text: 'Was sagt er/sie?', bold: true, font: 'Arial', size: 22 })] })] }),
        ]}),
        ...[
          ['B:', 'Guten Tag! Was kann ich für Sie tun?'],
          ['A:', 'Guten Tag! Ich möchte gerne ein _____________ eröffnen.'],
          ['B:', 'Sehr gerne! Haben Sie Ihren _____________ und Ihre _____________ dabei?'],
          ['A:', 'Ja, hier sind meine Dokumente. Brauchen Sie noch etwas?'],
          ['B:', 'Haben Sie schon einen deutschen _____________?'],
          ['A:', 'Ja, ich arbeite seit drei Monaten als _____________.'],
          ['B:', 'Perfekt. Sie bekommen Ihre EC-Karte in etwa einer Woche. Die _____________ kommt separat per Post.'],
          ['A:', 'Bieten Sie auch _____________ an?'],
          ['B:', 'Ja, mit unserer App können Sie jederzeit Ihren _____________ einsehen und _____________ machen.'],
          ['A:', 'Sehr gut! Was kostet das Konto pro Monat?'],
          ['B:', 'Das Girokonto ist für Sie kostenlos, wenn Sie monatlich mindestens _____________ Euro einzahlen.'],
        ].map(([per, text]) => new TableRow({ children: [
          new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: per, bold: true, font: 'Arial', size: 22 })] })] }),
          new TableCell({ width: { size: 8572, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: text, font: 'Arial', size: 22 })] })] }),
        ]})),
      ]
    }),
    leer(),
    p('→ Tauscht die Rollen!', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 2: Bei der Post — Rollenspiel'),
    p('Spielt die Situation. Dann tauscht.'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person A — Kunde/Kundin', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Du möchtest:', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Paket nach Polen schicken (ca. 2 kg)', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Mit Sendungsverfolgung', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Brief nach Österreich (normal)', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '→ Frage nach Preis und Dauer.', font: 'Arial', size: 22, italics: true })] }),
        ]}),
        new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, children: [
          new Paragraph({ children: [new TextRun({ text: 'Person B — Post-Mitarbeiter/in', bold: true, font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: 'Informationen:', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Paket Polen 2 kg: 14,99 € + 2,50 € Tracking', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Lieferung: 5–7 Werktage', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '• Brief Österreich: 1,10 €, 3–5 Tage', font: 'Arial', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '→ Erkläre alles höflich.', font: 'Arial', size: 22, italics: true })] }),
        ]}),
      ]})]
    }),
    leer(),
    h2('Aufgabe 3: Partnerinterview — Banken und Post'),
    p('Frag deinen Partner / deine Partnerin und notiere die Antworten.'),
    leer(),
    p('1. Hast du ein deutsches Bankkonto? War die Eröffnung einfach oder schwierig?'),
    linie(), leer(),
    p('2. Wie bezahlst du meistens — bar, mit Karte oder per App?'),
    linie(), leer(),
    p('3. Hast du schon einmal ein Paket oder Einschreiben bei der Post aufgegeben?'),
    linie(), leer(),
    p('4. Was ist anders bei der Bank oder Post in deinem Heimatland?'),
    linie(), leer(),
    p('5. Was findest du in Deutschland praktisch beim Einkaufen und bei Dienstleistungen?'),
    linie(), leer(),
    h2('Aufgabe 4: Gruppenübung — Situation erkläre'),
    p('Person A zieht eine Karte und liest die Situation vor. Die Gruppe diskutiert: Was würdest du tun?'),
    leer(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF9C4' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Karte 1:', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du hast deine EC-Karte verloren. Was machst du sofort?', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF9C4' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Karte 2:', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Ein Paket kommt nicht an — nach 10 Tagen immer noch nichts. Was tust du?', font: 'Arial', size: 22 })] }),
          ]}),
        ]}),
        new TableRow({ children: [
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF9C4' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Karte 3:', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du willst 500 € nach Hause schicken. Wie machst du das?', font: 'Arial', size: 22 })] }),
          ]}),
          new TableCell({ width: { size: 4886, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF9C4' }, children: [
            new Paragraph({ children: [new TextRun({ text: 'Karte 4:', bold: true, font: 'Arial', size: 22 })] }),
            new Paragraph({ children: [new TextRun({ text: 'Du bekommst einen Brief von der Bank. Du verstehst ihn nicht. Was tust du?', font: 'Arial', size: 22 })] }),
          ]}),
        ]}),
      ]
    }),
  ];
  await save(children, `${TOPIC}_Konversation.docx`);
};

const createKonversationLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Konversation: Bank und Post'),
    leer(),
    h2('Aufgabe 1: Bankdialog — mögliche Lösungen'),
    p('A: „… Girokonto / Konto eröffnen."'),
    p('B: „… Reisepass / Ausweis … Meldebestätigung …"'),
    p('B: „… Arbeitsvertrag?"'),
    p('B: „… EC-Karte … PIN kommt … per Post."'),
    p('A: „… Online-Banking an?"'),
    p('B: „… Kontoauszug einsehen … Überweisungen machen."'),
    p('B: „… 700 / 1000 / … Euro einzahlen."'),
    leer(),
    p('→ Auf formelle Sie-Form achten. Bankbegriffe korrekt einsetzen.', { color: '388E3C', italics: true }),
    leer(),
    h2('Aufgabe 2: Post-Rollenspiel — Beispieldialog'),
    p('A: „Guten Tag! Ich möchte dieses Paket nach Polen schicken — mit Sendungsverfolgung bitte."'),
    p('B: „Kein Problem. Das Paket wiegt 2 kg — das macht 14,99 Euro plus 2,50 Euro für das Tracking, also 17,49 Euro."'),
    p('A: „Wie lange dauert die Lieferung?"'),
    p('B: „Etwa 5–7 Werktage. Möchten Sie noch etwas?"'),
    p('A: „Ja, diesen Brief nach Österreich bitte."'),
    p('B: „Das kostet 1,10 Euro. Benötigen Sie eine Quittung?"'),
    leer(),
    h2('Aufgabe 4: Situationskarten — Lösungsvorschläge'),
    p('Karte 1: Sofort die Bank anrufen und Karte sperren lassen (Sperr-Notruf 116 116). Neue Karte beantragen.'),
    p('Karte 2: Sendungsverfolgung prüfen, Post kontaktieren, Nachforschungsauftrag stellen.'),
    p('Karte 3: Überweisung via Bank oder Western Union / MoneyGram / Online-Dienste.'),
    p('Karte 4: Zur Bank gehen und Hilfe bitten, oder einen Freund / eine Beratungsstelle fragen.'),
  ];
  await save(children, `${TOPIC}_Konversation_LOESUNG.docx`);
};

// ==================== BILDAUFGABEN ====================
const createBildaufgaben = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('Bank und Post — Bildaufgaben'),
    leer(),
    h2('Aufgabe 1: Am Geldautomat — Schritte beschriften'),
    p('[BILD 1: Sechs Bilder in Reihenfolge — A) Person steckt Karte ein; B) Person gibt PIN ein; C) Person wählt Betrag; D) Geldautomat gibt Geld aus; E) Person nimmt Karte zurück; F) Person nimmt Geld]'),
    leer(),
    p('Beschrifte jeden Schritt mit einem Satz. Benutze die richtige Reihenfolge.'),
    leer(),
    p('A) _______________________________________________'),
    p('B) _______________________________________________'),
    p('C) _______________________________________________'),
    p('D) _______________________________________________'),
    p('E) _______________________________________________'),
    p('F) _______________________________________________'),
    leer(),
    h2('Aufgabe 2: Kontoauszug lesen'),
    p('[BILD 2: Ein vereinfachter Kontoauszug mit folgenden Einträgen:'),
    p('  01.04. Gehalt Mustermann GmbH  +2.100,00 €  Saldo: 2.450,00 €'),
    p('  03.04. Miete SEPA-Überweisung  -850,00 €    Saldo: 1.600,00 €'),
    p('  05.04. Supermarkt REWE          -67,34 €    Saldo: 1.532,66 €'),
    p('  08.04. Geldautomat Barabhebung  -200,00 €   Saldo: 1.332,66 €'),
    p('  10.04. Amazon.de Online-Kauf    -45,99 €    Saldo: 1.286,67 €]'),
    leer(),
    p('1. Wie viel Geld war am 1. April auf dem Konto (vor dem Gehalt)?'),
    linie(), leer(),
    p('2. Welche Buchung war am teuersten?'),
    linie(), leer(),
    p('3. Wie viel Geld ist am 10. April noch auf dem Konto?'),
    linie(), leer(),
    p('4. Schreibe alle Ausgaben (Minus-Buchungen) auf und berechne die Gesamtausgaben.'),
    linie(), linie(), leer(),
    h2('Aufgabe 3: Paketetikett lesen und ergänzen'),
    p('[BILD 3: Ein ausgefülltes DHL-Paketetikett mit Absender und Empfänger, Gewicht 1,8 kg, Versandart: Paket S, Preis: 5,49 €, Sendungsnummer: JD014600000000000001]'),
    leer(),
    p('1. Von wem kommt das Paket?'),
    linie(), leer(),
    p('2. An wen geht das Paket?'),
    linie(), leer(),
    p('3. Wie viel wiegt das Paket?'),
    linie(), leer(),
    p('4. Wie kann der Empfänger das Paket verfolgen?'),
    linie(), leer(),
    h2('Aufgabe 4: Situation beschreiben'),
    p('[BILD 4: Eine Person steht am Schalter der Post. Sie hält ein Paket in der Hand. Der Mitarbeiter hinter dem Schalter tippt etwas in den Computer. Es gibt eine Waage auf dem Schalter.]'),
    leer(),
    p('Beschreibe das Bild (3–4 Sätze). Was passiert? Was sagen die beiden Personen wahrscheinlich?'),
    leer(),
    ...Array(5).fill(null).map(linie),
  ];
  await save(children, `${TOPIC}_Bildaufgaben.docx`);
};

const createBildaufgabenLoesung = async () => {
  const children = [
    schuelerKopf(), leer(),
    h1('LÖSUNG — Bildaufgaben: Bank und Post'),
    leer(),
    p('Hinweis: Antworten hängen von den eingefügten Bildern ab. Folgende Lösungen sind Musterantworten.', { color: '888888', italics: true }),
    leer(),
    h2('Aufgabe 1: Geldautomat'),
    p('A) Die Person steckt ihre EC-Karte in den Automaten.'),
    p('B) Sie gibt ihre geheime PIN ein.'),
    p('C) Sie wählt den gewünschten Betrag aus.'),
    p('D) Der Automat gibt das Geld aus.'),
    p('E) Die Person nimmt ihre Karte zurück.'),
    p('F) Die Person nimmt das Geld.'),
    leer(),
    h2('Aufgabe 2: Kontoauszug'),
    p('1. Vor dem Gehalt: 2.450,00 € − 2.100,00 € = 350,00 €'),
    p('2. Die teuerste Buchung: Miete mit −850,00 €.'),
    p('3. Am 10. April: 1.286,67 €'),
    p('4. Ausgaben: 850,00 + 67,34 + 200,00 + 45,99 = 1.163,33 €'),
    leer(),
    h2('Aufgabe 3: Paketetikett'),
    p('→ Antworten hängen vom eingefügten Bild ab.'),
    p('4. Der Empfänger kann die Sendungsnummer auf der DHL-Website eingeben.'),
    leer(),
    h2('Aufgabe 4: Situation — Musterantworten'),
    p('Eine Person gibt an der Post ein Paket auf. Der Mitarbeiter wiegt das Paket auf der Waage.'),
    p('Kunde: „Ich möchte dieses Paket nach Italien schicken, bitte."'),
    p('Mitarbeiter: „Das Paket wiegt 1,8 kg — das macht 14,49 Euro. Möchten Sie Sendungsverfolgung?"'),
    leer(),
    h2('Bewertungskriterien'),
    bullet('Bank-Vokabular korrekt anwenden (Konto, PIN, Überweisung, Kontoauszug)'),
    bullet('Post-Vokabular korrekt anwenden (Paket, Porto, Einschreiben, Sendungsverfolgung)'),
    bullet('Modalverben korrekt einsetzen (möchten, müssen, können, dürfen)'),
    bullet('Zahlen und Beträge korrekt lesen und berechnen'),
  ];
  await save(children, `${TOPIC}_Bildaufgaben_LOESUNG.docx`);
};

// ==================== MAIN ====================
(async () => {
  console.log('Erstelle Unterpunkt: Bank und Post');
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
