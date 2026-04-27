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

const TOPIC_LABEL = 'A2 Erwachsene — Beruf & Arbeit — Arbeitsbedingungen';
const TOPIC       = 'A2_Erwachsene_Beruf_02_Arbeitsbedingungen';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Erwachsene', '01_Beruf', '02_Arbeitsbedingungen'
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
const pBold   = txt => p(txt, { bold: true });
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

(async () => {
  console.log('Erstelle Unterpunkt: Über Arbeitsbedingungen sprechen');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Schreibübung'),
    infoBox([
      'Meinung ausdrücken:',
      'Ich finde meinen Job …     (interessant / stressig / gut bezahlt / …)',
      'Die Arbeitsatmosphäre ist … (angenehm / teamorientiert / unpersönlich / …)',
      'Das Gehalt ist …           (fair / zu niedrig / okay / …)',
      'Ein Vorteil ist, dass …    + Nebensatz',
      'Ein Nachteil ist, dass …   + Nebensatz',
      '',
      'Vergleiche:',
      'In meinem Beruf ist … besser / schlechter als …',
      'Früher war … stressiger als jetzt.'
    ]),
    empty(),
    h2('Aufgabe 1 — Adjektive bewerten'),
    p('Was ist für Sie bei einem Job wichtig? Ordnen Sie die Adjektive: sehr wichtig / wichtig / nicht so wichtig.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Adjektiv', Math.floor(CONTENT * 0.35)), hCell('Bedeutung', Math.floor(CONTENT * 0.35)), hCell('Für mich:', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('gut bezahlt', Math.floor(CONTENT * 0.35)), dCell('hohes Gehalt', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('flexibel', Math.floor(CONTENT * 0.35)), dCell('freie Arbeitszeiteinteilung', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('sicher', Math.floor(CONTENT * 0.35)), dCell('kein Risiko, die Stelle zu verlieren', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('abwechslungsreich', Math.floor(CONTENT * 0.35)), dCell('immer andere Aufgaben', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('teamorientiert', Math.floor(CONTENT * 0.35)), dCell('viel Zusammenarbeit', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('kreativ', Math.floor(CONTENT * 0.35)), dCell('eigene Ideen einbringen', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('sinnvoll', Math.floor(CONTENT * 0.35)), dCell('anderen Menschen helfen / etwas Gutes tun', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.3))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Vor- und Nachteile'),
    p('Wählen Sie einen Beruf und schreiben Sie 3 Vorteile und 3 Nachteile.'),
    p('Beruf: _______________________________'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Vorteile', Math.floor(CONTENT * 0.5)), hCell('Nachteile', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ein Vorteil ist, dass …', Math.floor(CONTENT * 0.5), { italic: true, color: '888888' }), dCell('Ein Nachteil ist, dass …', Math.floor(CONTENT * 0.5), { italic: true, color: '888888' })] }),
        ...['', '', ''].map(() => new TableRow({ children: [dCell('', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }))
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Mein idealer Arbeitsplatz'),
    p('Beschreiben Sie Ihren idealen Arbeitsplatz in 5–7 Sätzen. Was ist wichtig für Sie?'),
    pItalic('Ideen: Gehalt / Arbeitszeiten / Kollegen / Homeoffice / Urlaub / Aufgaben / Atmosphäre'),
    ...writeLines(6),
    empty(), empty(),
    h2('Aufgabe 4 — Vergleich'),
    p('Vergleichen Sie zwei Berufe. Schreiben Sie 3 Vergleichssätze.'),
    p('Zum Beispiel: Ein Arzt verdient mehr als ein Lehrer. / Ein Lehrer hat mehr Ferien als ein Ingenieur.'),
    empty(),
    p('Beruf 1: _______________________   Beruf 2: _______________________'),
    ...writeLines(3)
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Arbeitsbedingungen'),
    empty(),
    h2('Aufgabe 1 — Bewertung'),
    pItalic('Individuelle Antworten. Es gibt keine feste Lösung — die Bewertung ist subjektiv.'),
    p('Häufige Antworten von Lernenden: gut bezahlt und sicher gelten oft als sehr wichtig; kreativ und teamorientiert variieren stark.'),
    empty(),
    h2('Aufgabe 2 — Beispiel: Krankenpfleger'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Vorteile', Math.floor(CONTENT * 0.5)), hCell('Nachteile', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('sinnvolle Arbeit (Menschen helfen)', Math.floor(CONTENT * 0.5)), dCell('Schichtarbeit (auch nachts)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('sichere Stelle (immer gebraucht)', Math.floor(CONTENT * 0.5)), dCell('körperlich und emotional anstrengend', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('abwechslungsreiche Aufgaben', Math.floor(CONTENT * 0.5)), dCell('nicht immer gut bezahlt', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(),
    h2('Aufgabe 3 — Freies Schreiben'),
    pItalic('Individuelle Antworten. Auf korrekte weil-Sätze und Adjektivverwendung achten.'),
    empty(),
    h2('Aufgabe 4 — Vergleichsbeispiele'),
    p('Ein Arzt verdient mehr als ein Lehrer.'),
    p('Ein Lehrer hat mehr Ferien als ein Ingenieur.'),
    p('Die Arbeitszeiten eines Kochs sind unregelmäßiger als die eines Buchhalters.')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Leseübung'),
    h2('Lesetext: Jobzufriedenheit — Was sagen die Deutschen?'),
    p('Eine Umfrage unter 500 Berufstätigen in Deutschland hat interessante Ergebnisse gezeigt. Die Frage war: „Was ist Ihnen an Ihrer Arbeit am wichtigsten?"'),
    empty(),
    p('Das wichtigste Kriterium für die meisten Befragten ist ein gutes Arbeitsklima. 78% der Teilnehmer sagten, dass nette Kollegen und ein respektvoller Umgang entscheidend sind. Auf Platz zwei steht die Work-Life-Balance: 71% wollen ausreichend Freizeit und keine übermäßigen Überstunden. Das Gehalt ist erst auf Platz drei — 65% halten ein faires Gehalt für sehr wichtig.'),
    empty(),
    p('Interessant ist auch, dass flexible Arbeitszeiten immer wichtiger werden. Seit der Corona-Pandemie möchten 58% der Befragten zumindest teilweise im Homeoffice arbeiten. Besonders jüngere Arbeitnehmer zwischen 25 und 35 Jahren legen großen Wert auf Flexibilität.'),
    empty(),
    p('Was macht die Menschen unzufrieden? Auf Platz eins steht zu viel Stress: 62% fühlen sich manchmal oder oft überlastet. Auch schlechte Kommunikation mit dem Chef (54%) und fehlende Anerkennung (49%) sind häufige Beschwerden. Nur 23% sind mit ihrem aktuellen Job vollständig zufrieden.'),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Das gute Arbeitsklima ist das wichtigste Kriterium laut der Umfrage.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Das Gehalt ist für die meisten Befragten am wichtigsten.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Mehr als die Hälfte möchte teilweise im Homeoffice arbeiten.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Ältere Arbeitnehmer legen mehr Wert auf Flexibilität als jüngere.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Über die Hälfte der Befragten ist vollständig zufrieden.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Zahlen aus dem Text'),
    p('Ergänzen Sie die Prozentzahlen aus dem Text.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Kriterium', Math.floor(CONTENT * 0.7)), hCell('%', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Gutes Arbeitsklima', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Work-Life-Balance', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Faires Gehalt', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Homeoffice-Wunsch', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Fühlen sich überlastet', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] }),
        new TableRow({ children: [dCell('Vollständig zufrieden', Math.floor(CONTENT * 0.7)), dCell('_______ %', Math.floor(CONTENT * 0.3))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Fragen beantworten'),
    empty(),
    p('1.  Was ist laut Umfrage wichtiger: Gehalt oder Work-Life-Balance?'),
    ...writeLines(2), empty(),
    p('2.  Warum werden flexible Arbeitszeiten immer wichtiger?'),
    ...writeLines(2), empty(),
    p('3.  Was macht viele Arbeitnehmer unzufrieden? Nennen Sie zwei Gründe.'),
    ...writeLines(2), empty(),
    h2('Aufgabe 4 — Ihre Meinung'),
    p('Stimmen Sie mit den Umfrageergebnissen überein? Was ist Ihnen persönlich am wichtigsten? Schreiben Sie 3–4 Sätze.'),
    ...writeLines(4)
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Arbeitsbedingungen'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  R  (78% — Platz 1)'),
    p('2.  F  (Gehalt ist Platz 3 mit 65%)'),
    p('3.  R  (58% > 50%)'),
    p('4.  F  (jüngere Arbeitnehmer 25–35 legen mehr Wert auf Flexibilität)'),
    p('5.  F  (nur 23% sind vollständig zufrieden)'),
    empty(),
    h2('Aufgabe 2 — Zahlen'),
    p('Arbeitsklima: 78%    Work-Life-Balance: 71%    Gehalt: 65%'),
    p('Homeoffice: 58%      Überlastet: 62%           Vollständig zufrieden: 23%'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  Work-Life-Balance ist wichtiger (71% vs. 65%).'),
    p('2.  Seit der Corona-Pandemie möchten viele Menschen im Homeoffice arbeiten.'),
    p('3.  Zu viel Stress (62%) und schlechte Kommunikation mit dem Chef (54%).'),
    empty(),
    h2('Aufgabe 4 — Meinung'),
    pItalic('Individuelle Antworten. Auf korrekte Strukturen achten: Ich finde … wichtiger als … / weil-Sätze.')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Lückentext'),
    p('Wörterkasten:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'stressig  —  flexibel  —  fair  —  anstrengend  —  sinnvoll  —  überlastet  —  Überstunden  —  Urlaub  —  Gehalt  —  Arbeitsklima  —  Anerkennung  —  kündigen', size: 22, font: 'Arial' })] })] })] })]
    }),
    empty(),
    h2('Aufgabe 1 — Passendes Wort einsetzen'),
    empty(),
    p('1.  Ich arbeite sehr gern hier — das _____________ ist wirklich angenehm. Alle sind nett.'),
    writeLine(), empty(),
    p('2.  Der Job ist manchmal _____________, aber ich finde ihn trotzdem interessant.'),
    writeLine(), empty(),
    p('3.  Sie bekommt ein _____________ Gehalt — nicht zu viel, nicht zu wenig.'),
    writeLine(), empty(),
    p('4.  Ich mache oft _____________, weil wir zu wenig Personal haben.'),
    writeLine(), empty(),
    p('5.  Mein Beruf ist _____________ — ich helfe Menschen und das macht mich glücklich.'),
    writeLine(), empty(),
    p('6.  Wir haben 30 Tage _____________ pro Jahr. Das finde ich sehr gut.'),
    writeLine(), empty(),
    p('7.  Er ist so _____________, dass er manchmal kaum schlafen kann.'),
    writeLine(), empty(),
    p('8.  Sie arbeitet _____________ — sie kann selbst entscheiden, wann sie beginnt.'),
    writeLine(),
    empty(), empty(),
    h2('Aufgabe 2 — Meinungen ausdrücken'),
    p('Setze ein: finde / halte … für / bin … zufrieden mit / ärgere mich über'),
    empty(),
    p('1.  Ich _____________ die Arbeitszeiten zu lang.'),
    writeLine(), empty(),
    p('2.  Sie _____________ ihr Gehalt gut _____________.'),
    writeLine(), empty(),
    p('3.  Er _____________ seinen Job nicht _____________, weil es zu wenig Abwechslung gibt.'),
    writeLine(), empty(),
    p('4.  Wir _____________ die fehlende Anerkennung unseres Chefs.'),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Dialog ergänzen'),
    p('Zwei Kollegen sprechen in der Mittagspause. Ergänzen Sie.'),
    empty(),
    p('Julia:  Na, wie läuft es bei dir so im Job?'),
    p('Mark:  Ehrlich gesagt nicht so gut. Ich bin gerade sehr _____________.'),
    p('        Ich mache fast jeden Tag _____________ und das _____________ ist zu niedrig.'),
    p('Julia:  Das klingt schwierig. Was machst du dagegen?'),
    p('Mark:  Ich habe mit meinem Chef gesprochen, aber er gibt mir keine _____________. '),
    p('        Ich überlege, ob ich _____________ soll.'),
    p('Julia:  Das verstehe ich. Bei mir ist das _____________ zum Glück viel besser.'),
    p('        Die Kollegen sind nett und die Arbeitszeiten sind _____________.'),
    ...writeLines(2),
    empty(), empty(),
    h2('Aufgabe 4 — Sätze verbinden'),
    p('Verbinden Sie die Sätze mit weil oder obwohl.'),
    empty(),
    p('1.  Das Gehalt ist niedrig. Ich liebe meinen Job.'),
    p('    → Obwohl / Ich liebe meinen Job, _____________________________________________.'),
    ...writeLines(1), empty(),
    p('2.  Die Arbeitsatmosphäre ist gut. Ich bleibe in dieser Firma.'),
    p('    → Ich bleibe in dieser Firma, ________________________________________________.'),
    ...writeLines(1), empty(),
    p('3.  Er macht viele Überstunden. Er ist immer müde.'),
    p('    → Er ist immer müde, ________________________________________________________.'),
    ...writeLines(1)
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Arbeitsbedingungen'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  Arbeitsklima    2.  stressig    3.  faires'),
    p('4.  Überstunden     5.  sinnvoll    6.  Urlaub'),
    p('7.  überlastet      8.  flexibel'),
    empty(),
    h2('Aufgabe 2'),
    p('1.  finde … (zu lang)'),
    p('2.  ist … zufrieden mit / hält … für gut'),
    p('3.  ist … zufrieden mit … nicht'),
    p('4.  ärgern uns über'),
    pItalic('Hinweis: „halten … für" + Adjektiv: Ich halte das Gehalt für fair. / Ich bin zufrieden mit dem Gehalt.'),
    empty(),
    h2('Aufgabe 3 — Musterlösung'),
    p('überlastet / Überstunden / Gehalt / Anerkennung / kündigen / Arbeitsklima / flexibel'),
    pItalic('Individuelle Formulierungen akzeptieren, solange der Sinn passt.'),
    empty(),
    h2('Aufgabe 4'),
    p('1.  Obwohl das Gehalt niedrig ist, liebe ich meinen Job.  /  Ich liebe meinen Job, obwohl das Gehalt niedrig ist.'),
    p('2.  Ich bleibe in dieser Firma, weil die Arbeitsatmosphäre gut ist.'),
    p('3.  Er ist immer müde, weil er viele Überstunden macht.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Wortliste'),
    h2('Adjektive für Arbeitsbedingungen'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Adjektiv', Math.floor(CONTENT * 0.25)), hCell('Gegenteil', Math.floor(CONTENT * 0.25)), hCell('Beispielsatz', Math.floor(CONTENT * 0.35)), hCell('Übersetzung', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('stressig', Math.floor(CONTENT * 0.25)), dCell('entspannt', Math.floor(CONTENT * 0.25)), dCell('Der Job ist sehr stressig.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('flexibel', Math.floor(CONTENT * 0.25)), dCell('starr / unflexibel', Math.floor(CONTENT * 0.25)), dCell('Die Zeiten sind flexibel.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('gut bezahlt', Math.floor(CONTENT * 0.25)), dCell('schlecht bezahlt', Math.floor(CONTENT * 0.25)), dCell('Die Stelle ist gut bezahlt.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('abwechslungsreich', Math.floor(CONTENT * 0.25)), dCell('eintönig / langweilig', Math.floor(CONTENT * 0.25)), dCell('Die Aufgaben sind abwechslungsreich.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('anstrengend', Math.floor(CONTENT * 0.25)), dCell('leicht / angenehm', Math.floor(CONTENT * 0.25)), dCell('Die Arbeit ist körperlich anstrengend.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('sinnvoll', Math.floor(CONTENT * 0.25)), dCell('sinnlos', Math.floor(CONTENT * 0.25)), dCell('Ich finde meinen Beruf sehr sinnvoll.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('fair', Math.floor(CONTENT * 0.25)), dCell('unfair', Math.floor(CONTENT * 0.25)), dCell('Das Gehalt ist fair.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('teamorientiert', Math.floor(CONTENT * 0.25)), dCell('einsam / isoliert', Math.floor(CONTENT * 0.25)), dCell('Wir arbeiten sehr teamorientiert.', Math.floor(CONTENT * 0.35)), dCell('___________', Math.floor(CONTENT * 0.15))] })
      ]
    }),
    empty(), empty(),
    h2('Wichtige Nomen zum Thema Arbeit'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nomen', Math.floor(CONTENT * 0.3)), hCell('Artikel + Plural', Math.floor(CONTENT * 0.28)), hCell('Beispiel', Math.floor(CONTENT * 0.27)), hCell('Übersetzung', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('das Gehalt', Math.floor(CONTENT * 0.3)), dCell('das Gehalt / die Gehälter', Math.floor(CONTENT * 0.28)), dCell('Das Gehalt ist zu niedrig.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Überstunde', Math.floor(CONTENT * 0.3)), dCell('die Überstunde / die Überstunden', Math.floor(CONTENT * 0.28)), dCell('Ich mache oft Überstunden.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('der Urlaub', Math.floor(CONTENT * 0.3)), dCell('der Urlaub (meist kein Pl.)', Math.floor(CONTENT * 0.28)), dCell('Wir haben 28 Tage Urlaub.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Anerkennung', Math.floor(CONTENT * 0.3)), dCell('die Anerkennung (kein Pl.)', Math.floor(CONTENT * 0.28)), dCell('Ich brauche mehr Anerkennung.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('das Arbeitsklima', Math.floor(CONTENT * 0.3)), dCell('das Arbeitsklima (kein Pl.)', Math.floor(CONTENT * 0.28)), dCell('Das Arbeitsklima ist gut.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Kündigung', Math.floor(CONTENT * 0.3)), dCell('die Kündigung / die Kündigungen', Math.floor(CONTENT * 0.28)), dCell('Er hat die Kündigung bekommen.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Beförderung', Math.floor(CONTENT * 0.3)), dCell('die Beförderung / die Beförderungen', Math.floor(CONTENT * 0.28)), dCell('Sie hat eine Beförderung bekommen.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('die Work-Life-Balance', Math.floor(CONTENT * 0.3)), dCell('(kein Plural)', Math.floor(CONTENT * 0.28)), dCell('Eine gute Work-Life-Balance ist wichtig.', Math.floor(CONTENT * 0.27)), dCell('___________', Math.floor(CONTENT * 0.15))] })
      ]
    }),
    empty(), empty(),
    infoBox([
      'Nützliche Redemittel — Meinung ausdrücken:',
      '',
      'Positiv:    Ich finde es gut, dass …  /  Ein großer Vorteil ist, dass …',
      '            Mir gefällt besonders, dass …  /  Ich bin zufrieden mit …',
      '',
      'Negativ:    Ich finde es schade, dass …  /  Ein Nachteil ist, dass …',
      '            Ich ärgere mich darüber, dass …  /  Ich bin unzufrieden mit …',
      '',
      'Neutral:    Einerseits … andererseits …  /  Es kommt darauf an, ob …'
    ]),
    empty(),
    pItalic('Lernkarten-Tipp: Adjektiv auf die Vorderseite — Gegenteil + Beispielsatz auf die Rückseite.')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Arbeitsbedingungen'),
    empty(),
    h2('Adjektive — Übersetzungen (Beispiel Englisch)'),
    p('stressig = stressful    entspannt = relaxed    flexibel = flexible'),
    p('gut bezahlt = well-paid    schlecht bezahlt = poorly paid'),
    p('abwechslungsreich = varied    eintönig = monotonous'),
    p('anstrengend = exhausting / demanding    sinnvoll = meaningful'),
    p('fair = fair    unfair = unfair    teamorientiert = team-oriented'),
    empty(),
    h2('Nomen — Übersetzungen'),
    p('das Gehalt = salary    die Überstunde = overtime hour    der Urlaub = holiday / vacation'),
    p('die Anerkennung = recognition    das Arbeitsklima = work atmosphere / workplace culture'),
    p('die Kündigung = dismissal / resignation    die Beförderung = promotion'),
    p('die Work-Life-Balance = work-life balance'),
    empty(),
    pItalic('Individuelle Übersetzungen je nach Muttersprache akzeptieren.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Konversation'),
    h2('Dialog 1 — Gespräch mit dem Chef / der Chefin (formell)'),
    p('Üben Sie den Dialog zu zweit. Dann tauschen Sie die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Chef / Chefin', Math.floor(CONTENT * 0.5)), hCell('Mitarbeiter/in', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Guten Tag, Frau/Herr … Wie läuft es bei Ihnen?', Math.floor(CONTENT * 0.5)), dCell('Danke, gut. Allerdings hätte ich ein Anliegen …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Natürlich, was möchten Sie ansprechen?', Math.floor(CONTENT * 0.5)), dCell('Ich mache regelmäßig Überstunden und frage mich, ob …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ich verstehe Ihr Anliegen. Was schlagen Sie vor?', Math.floor(CONTENT * 0.5)), dCell('Ich würde mir wünschen, dass … / Wäre es möglich, dass …?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Das ist ein guter Punkt. Ich werde das prüfen.', Math.floor(CONTENT * 0.5)), dCell('Das freut mich. Vielen Dank für Ihr Verständnis.', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    pItalic('Ideen für Anliegen: Gehaltserhöhung / mehr Homeoffice / weniger Überstunden / flexiblere Zeiten'),
    empty(), empty(),
    h2('Dialog 2 — Unter Freunden: Wie läuft es im Job?'),
    p('Fülle die Lücken aus und üben Sie den Dialog.'),
    empty(),
    p('A:  Sag mal, wie ist dein neuer Job so?'),
    p('B:  Ehrlich gesagt bin ich _______ zufrieden. Das Gehalt ist _______ und die'),
    p('    Kollegen sind _______. Aber die Arbeitszeiten sind manchmal _______.'),
    p('A:  Was gefällt dir denn am besten?'),
    p('B:  Am meisten schätze ich _______, weil _______.'),
    p('A:  Und was nervt dich?'),
    p('B:  Was mich stört, ist, dass _______. Das finde ich _______.'),
    p('A:  Hast du schon mit deinem Chef gesprochen?'),
    p('B:  Ja, aber er gibt mir wenig _______. Ich überlege, ob ich _______ soll.'),
    empty(), empty(),
    h2('Partnerinterview — Arbeitsbedingungen'),
    p('Fragen Sie Ihren Partner / Ihre Partnerin und notieren Sie die Antworten.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.5)), hCell('Antwort', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was ist Ihnen / dir bei einem Job am wichtigsten?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Machen Sie / Machst du gern Überstunden?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wie wichtig ist das Gehalt für Sie / dich?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Möchten Sie / Möchtest du im Homeoffice arbeiten?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was würden Sie / würdest du an Ihrem / deinem Job ändern?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenübung — Pro und Contra Diskussion'),
    p('Diskutieren Sie in der Gruppe: Homeoffice — ja oder nein?'),
    empty(),
    pBold('Pro Homeoffice:'),
    bullet('Kein Pendeln → mehr Zeit'),
    bullet('Flexiblere Zeiten'),
    bullet('Weniger Ablenkung im Büro'),
    bullet('Bessere Work-Life-Balance'),
    empty(),
    pBold('Contra Homeoffice:'),
    bullet('Weniger Kontakt zu Kollegen'),
    bullet('Zuhause kann es ablenken (Familie, Haushalt)'),
    bullet('Technische Probleme'),
    bullet('Schwieriger, Arbeit und Freizeit zu trennen'),
    empty(),
    p('Redemittel für die Diskussion:'),
    p('Ich bin dafür, weil …  /  Ich bin dagegen, weil …  /  Einerseits … andererseits …'),
    p('Das sehe ich anders …  /  Ich stimme zu, aber …  /  Das stimmt, obwohl …')
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Arbeitsbedingungen'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Höfliche, formelle Sprache (Sie-Form korrekt)'),
    bullet('Klares Anliegen formuliert'),
    bullet('Vorschlag oder Wunsch geäußert (Konjunktiv II: würde / wäre es möglich)'),
    bullet('Natürlicher Gesprächsfluss'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('B: … bin ich ziemlich zufrieden. Das Gehalt ist okay und die Kollegen sind nett. Aber die Arbeitszeiten sind manchmal stressig.'),
    p('B: Am meisten schätze ich die Flexibilität, weil ich selbst entscheiden kann, wann ich anfange.'),
    p('B: Was mich stört, ist, dass ich zu viele Überstunden mache. Das finde ich unfair.'),
    p('B: … er gibt mir wenig Anerkennung. Ich überlege, ob ich kündigen soll.'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Individuelle Antworten. Auf korrekte Redemittel und weil-Sätze achten.'),
    empty(),
    h2('Gruppenübung — Diskussion'),
    pItalic('Keine feste Lösung. Bewertungskriterien:'),
    bullet('Argumente mit weil / obwohl begründet'),
    bullet('Auf Argumente der anderen eingegangen'),
    bullet('Korrekte Verwendung von Redemitteln (Ich bin dafür / dagegen …)')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Über Arbeitsbedingungen sprechen — Bildaufgaben'),
    h2('Aufgabe 1 — Wie sind die Arbeitsbedingungen? Beschreiben Sie.'),
    empty(),
    p('[BILD 1: Eine Person am Schreibtisch, umgeben von Papierstapeln, schaut gestresst auf die Uhr. Es ist dunkel draußen — sie arbeitet spät.]'),
    p('Adjektive: ________________________________________________________________'),
    p('Satz: Die Person _____________________________________________________________.'),
    empty(), empty(),
    p('[BILD 2: Ein helles, modernes Büro. Menschen sitzen zusammen, lachen, trinken Kaffee. Pflanzen, viel Licht, entspannte Atmosphäre.]'),
    p('Adjektive: ________________________________________________________________'),
    p('Satz: Das Arbeitsklima _______________________________________________________.'),
    empty(), empty(),
    p('[BILD 3: Eine Person arbeitet am Laptop auf einer Terrasse, Kaffeetasse daneben, entspannte Haltung — Homeoffice.]'),
    p('Vorteil: _________________________________________________________________'),
    p('Nachteil: ________________________________________________________________'),
    empty(), empty(),
    h2('Aufgabe 2 — Statistik lesen'),
    p('[BILD: Balkendiagramm — „Was ist Deutschen am Arbeitsplatz am wichtigsten?" (fiktive Werte):'),
    p('Gutes Teamklima: 82%  |  Flexible Zeiten: 68%  |  Gehalt: 63%  |  Sicherheit: 71%  |  Homeoffice: 55%]'),
    empty(),
    p('1.  Was ist laut Diagramm am wichtigsten?  → _____________________________________'),
    writeLine(), empty(),
    p('2.  Was ist weniger wichtig als Jobsicherheit?  → _________________________________'),
    writeLine(), empty(),
    p('3.  Schreiben Sie 2 Vergleichssätze über das Diagramm.'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Ihr Traumjob — Arbeitsbedingungen'),
    p('[BILD-PLATZHALTER: Leeres Rechteck — zeichnen oder beschreiben Sie Ihren idealen Arbeitsplatz.]'),
    empty(),
    p('Beschreiben Sie Ihren idealen Arbeitsplatz:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Kriterium', Math.floor(CONTENT * 0.35)), hCell('Mein idealer Job', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Arbeitszeiten:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Gehalt:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Arbeitsklima:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Aufgaben:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Homeoffice / Büro:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] })
      ]
    }),
    empty(),
    p('Schreiben Sie 3 Sätze über Ihren idealen Job:'),
    ...writeLines(3)
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Arbeitsbedingungen'),
    empty(),
    h2('Aufgabe 1 — Beispielantworten'),
    p('Bild 1: stressig, überlastet, anstrengend / Die Person macht viele Überstunden und ist sehr erschöpft.'),
    p('Bild 2: angenehm, teamorientiert, entspannt / Das Arbeitsklima ist sehr gut und die Kollegen sind nett.'),
    p('Bild 3: Vorteil: Man kann flexibel arbeiten und spart Pendelzeit. / Nachteil: Es kann schwierig sein, Arbeit und Freizeit zu trennen.'),
    pItalic('Antworten hängen von den eingefügten Bildern ab.'),
    empty(),
    h2('Aufgabe 2 — Statistik'),
    p('1.  Das Teamklima ist am wichtigsten (82%).'),
    p('2.  Homeoffice (55%) und Gehalt (63%) sind weniger wichtig als Jobsicherheit (71%).'),
    p('Vergleichssätze: Das Teamklima ist wichtiger als das Gehalt. / Homeoffice ist weniger wichtig als Jobsicherheit.'),
    empty(),
    h2('Aufgabe 3 — Traumjob'),
    pItalic('Individuelle Antworten. Auf korrekte Adjektivverwendung und Satzstruktur achten.')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
