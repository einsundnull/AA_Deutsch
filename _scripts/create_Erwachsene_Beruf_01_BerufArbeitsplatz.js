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

const TOPIC_LABEL = 'A2 Erwachsene — Beruf & Arbeit — Beruf und Arbeitsplatz';
const TOPIC       = 'A2_Erwachsene_Beruf_01_BerufArbeitsplatz';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Erwachsene', '01_Beruf', '01_BerufArbeitsplatz'
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
  console.log('Erstelle Unterpunkt: Beruf und Arbeitsplatz beschreiben');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Schreibübung'),
    infoBox([
      'Wie sagt man es auf Deutsch?',
      '',
      'Ich bin Arzt. / Ich bin Ärztin.           (Beruf = Nomen, kein Artikel!)',
      'Ich arbeite als Ingenieur.',
      'Ich arbeite bei Siemens / bei einer Bank.',
      'Ich arbeite in einem Büro / in einer Schule / in einem Krankenhaus.',
      'Ich arbeite Vollzeit / Teilzeit.',
      'Mein Arbeitsplatz ist in München / im Stadtzentrum.',
      '',
      'Frage:  Was machen Sie beruflich?  /  Was sind Sie von Beruf?',
      'Antwort: Ich bin … / Ich arbeite als …'
    ]),
    empty(),
    h2('Aufgabe 1 — Stellen Sie sich vor'),
    p('Schreiben Sie 4–5 Sätze über Ihren Beruf oder einen Wunschberuf.'),
    p('Benutzen Sie: Ich bin … / Ich arbeite als … / Ich arbeite bei … / Mein Arbeitsplatz ist …'),
    ...writeLines(5),
    empty(), empty(),
    h2('Aufgabe 2 — Berufsprofil schreiben'),
    p('Schreiben Sie ein kurzes Berufsprofil für eine dieser Personen:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person', Math.floor(CONTENT * 0.3)), hCell('Informationen', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('A: Sandra K.', Math.floor(CONTENT * 0.3)), dCell('Krankenschwester | Stadtspital Hamburg | Vollzeit | Intensivstation', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('B: Thomas M.', Math.floor(CONTENT * 0.3)), dCell('Softwareentwickler | IT-Firma Berlin | Homeoffice | Teilzeit', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('C: Fatima B.', Math.floor(CONTENT * 0.3)), dCell('Lehrerin | Grundschule Frankfurt | Vollzeit | Klasse 3', Math.floor(CONTENT * 0.7))] })
      ]
    }),
    empty(),
    p('Person _______ — Berufsprofil:'),
    ...writeLines(4),
    empty(), empty(),
    h2('Aufgabe 3 — Fragen und Antworten'),
    p('Schreiben Sie Fragen und passende Antworten zum Thema Beruf.'),
    empty(),
    p('Frage 1: Was _______________________________________?'),
    p('Antwort: ___________________________________________'),
    empty(),
    p('Frage 2: Wo _________________________________________?'),
    p('Antwort: ___________________________________________'),
    empty(),
    p('Frage 3: Wie lange _____________________________________?'),
    p('Antwort: ___________________________________________')
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Beruf und Arbeitsplatz'),
    empty(),
    h2('Aufgabe 1 — Musterlösung'),
    p('Ich bin Lehrerin. Ich arbeite als Deutschlehrerin in einer Sprachschule. Ich arbeite bei der Berliner Sprachakademie. Mein Arbeitsplatz ist im Stadtzentrum. Ich arbeite Vollzeit, von Montag bis Freitag.'),
    pItalic('Individuelle Antworten akzeptieren. Auf korrekte Struktur achten: kein Artikel vor dem Beruf nach sein.'),
    empty(),
    h2('Aufgabe 2 — Musterlösung (Person A)'),
    p('Sandra K. ist Krankenschwester. Sie arbeitet als Krankenschwester im Stadtspital Hamburg. Sie arbeitet auf der Intensivstation und arbeitet Vollzeit.'),
    empty(),
    h2('Aufgabe 3 — Beispielfragen'),
    p('Frage 1: Was machen Sie beruflich? / Was sind Sie von Beruf?'),
    p('Frage 2: Wo arbeiten Sie? / In welcher Firma arbeiten Sie?'),
    p('Frage 3: Wie lange arbeiten Sie schon dort? / Wie viele Stunden arbeiten Sie?'),
    pItalic('Individuelle Antworten akzeptieren.')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Leseübung'),
    h2('Lesetext: Drei Menschen, drei Berufe'),
    p('Mein Name ist Kenan Yıldız. Ich bin 34 Jahre alt und Ingenieur. Ich arbeite als Maschinenbauingenieur bei einer großen Firma in Stuttgart. Mein Büro ist modern — wir haben flexible Arbeitszeiten und ich kann zwei Tage pro Woche im Homeoffice arbeiten. Das finde ich sehr praktisch, weil ich so weniger Zeit im Zug verbringe.', { size: 24 }),
    empty(),
    p('Ich heiße Miriam Schulz. Ich bin Ärztin und arbeite in einer kleinen Praxis in München. Mein Arbeitsalltag beginnt um 8 Uhr. Ich sehe viele Patienten pro Tag und muss viele Entscheidungen treffen. Der Beruf ist anstrengend, aber ich helfe gern Menschen. Mein Arbeitsplatz ist manchmal stressig, aber ich liebe meinen Beruf.', { size: 24 }),
    empty(),
    p('Ich bin David Müller, 28 Jahre alt. Ich arbeite als Koch in einem Restaurant im Stadtzentrum von Hamburg. Meine Arbeitszeiten sind unregelmäßig — ich arbeite oft abends und am Wochenende. Das ist manchmal schwierig, aber die Arbeit macht mir viel Spaß. Ich koche am liebsten mediterrane Gerichte.', { size: 24 }),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Kenan arbeitet als Ingenieur in Stuttgart.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Kenan kann jeden Tag im Homeoffice arbeiten.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Miriam beginnt ihre Arbeit um 9 Uhr.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Miriam findet ihren Beruf manchmal anstrengend.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('David arbeitet meistens morgens und am Wochenende.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Wer macht was? Notieren Sie den Namen.'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.75)), hCell('Person', Math.floor(CONTENT * 0.25))] }),
        new TableRow({ children: [dCell('… arbeitet am liebsten mit Maschinen und Technik.', Math.floor(CONTENT * 0.75)), dCell('', Math.floor(CONTENT * 0.25))] }),
        new TableRow({ children: [dCell('… liebt es, Menschen zu helfen.', Math.floor(CONTENT * 0.75)), dCell('', Math.floor(CONTENT * 0.25))] }),
        new TableRow({ children: [dCell('… kocht mediterrane Gerichte.', Math.floor(CONTENT * 0.75)), dCell('', Math.floor(CONTENT * 0.25))] }),
        new TableRow({ children: [dCell('… hat flexible Arbeitszeiten.', Math.floor(CONTENT * 0.75)), dCell('', Math.floor(CONTENT * 0.25))] }),
        new TableRow({ children: [dCell('… arbeitet in einer Praxis.', Math.floor(CONTENT * 0.75)), dCell('', Math.floor(CONTENT * 0.25))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Fragen beantworten'),
    p('Beantworten Sie die Fragen in vollständigen Sätzen.'),
    empty(),
    p('1.  Was ist der Vorteil von Kenans Arbeitssituation?'),
    ...writeLines(2), empty(),
    p('2.  Warum liebt Miriam ihren Beruf, obwohl er stressig ist?'),
    ...writeLines(2), empty(),
    p('3.  Was ist ein Nachteil von Davids Arbeitszeiten?'),
    ...writeLines(2), empty(),
    h2('Aufgabe 4 — Ihr Beruf'),
    p('Schreiben Sie 3 Sätze über Ihren eigenen Beruf oder einen Beruf, den Sie interessant finden.'),
    ...writeLines(3)
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Beruf und Arbeitsplatz'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  R'),
    p('2.  F  (er kann zwei Tage pro Woche im Homeoffice arbeiten, nicht jeden Tag)'),
    p('3.  F  (sie beginnt um 8 Uhr)'),
    p('4.  R'),
    p('5.  F  (er arbeitet oft abends und am Wochenende, nicht morgens)'),
    empty(),
    h2('Aufgabe 2'),
    p('1.  Kenan    2.  Miriam    3.  David    4.  Kenan    5.  Miriam'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  Der Vorteil ist, dass Kenan flexible Arbeitszeiten hat und im Homeoffice arbeiten kann.'),
    p('2.  Miriam liebt ihren Beruf, weil sie gern Menschen hilft.'),
    p('3.  Ein Nachteil ist, dass David oft abends und am Wochenende arbeitet.'),
    empty(),
    h2('Aufgabe 4'),
    pItalic('Individuelle Antworten. Auf korrekte Struktur achten.')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Lückentext'),
    p('Wörterkasten:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'als  —  bei  —  in  —  von Beruf  —  Vollzeit  —  Teilzeit  —  Arbeitsplatz  —  Kollegen  —  Arbeitszeiten  —  Büro  —  Schicht  —  Homeoffice', size: 22, font: 'Arial' })] })] })] })]
    }),
    empty(),
    h2('Aufgabe 1 — Lücken füllen'),
    empty(),
    p('1.  „Was sind Sie _______ ________?" — „Ich bin Buchhalter."'),
    writeLine(), empty(),
    p('2.  Herr Kaiser arbeitet _______ Ingenieur bei einer Automobilfirma.'),
    writeLine(), empty(),
    p('3.  Frau Petrov arbeitet _______ einem Krankenhaus in Berlin.'),
    writeLine(), empty(),
    p('4.  Ich arbeite _______ — nur 20 Stunden pro Woche.'),
    writeLine(), empty(),
    p('5.  Mein _______ ist sehr modern. Wir haben große Fenster und viel Licht.'),
    writeLine(), empty(),
    p('6.  Die Krankenschwester arbeitet in der Nacht_______ von 22 bis 6 Uhr.'),
    writeLine(), empty(),
    p('7.  Ich arbeite zwei Tage pro Woche im _______, der Rest im Büro.'),
    writeLine(), empty(),
    p('8.  Meine _______ sind nett — wir essen oft zusammen Mittagspause.'),
    writeLine(),
    empty(), empty(),
    h2('Aufgabe 2 — Berufsvorstellungen'),
    p('Setze das richtige Wort ein: als / bei / in / für'),
    empty(),
    p('1.  Clara arbeitet _______ Lehrerin _______ einer Berufsschule.'),
    writeLine(), empty(),
    p('2.  Er ist Programmierer und arbeitet _______ einem Start-up.'),
    writeLine(), empty(),
    p('3.  Sie ist Anwältin und arbeitet _______ eine große Kanzlei.'),
    writeLine(), empty(),
    p('4.  Mein Bruder arbeitet _______ Koch _______ einem Hotelrestaurant.'),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Dialog ergänzen'),
    p('Ergänzen Sie das Gespräch auf einer Netzwerkveranstaltung.'),
    empty(),
    p('Anna:   Guten Abend! Mein Name ist Anna Berger. Und Sie?'),
    p('Klaus:  Guten Abend, ich heiße Klaus Zimmermann.'),
    p('Anna:   Was machen Sie beruflich, Herr Zimmermann?'),
    p('Klaus:  Ich bin _______ von Beruf. Ich arbeite als _______ bei _______.'),
    p('Anna:   Interessant! Und wo ist Ihr Arbeitsplatz?'),
    p('Klaus:  Mein Arbeitsplatz ist _______. Ich arbeite _______ (Vollzeit/Teilzeit).'),
    p('Anna:   Und wie sind Ihre Arbeitszeiten?'),
    p('Klaus:  Meine Arbeitszeiten sind _______. Was machen Sie beruflich?'),
    p('Anna:   Ich bin _______ und arbeite _______.'),
    ...writeLines(2),
    empty(), empty(),
    h2('Aufgabe 4 — Über sich selbst schreiben'),
    p('Füllen Sie das Steckbrief-Formular aus.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Feld', Math.floor(CONTENT * 0.35)), hCell('Meine Antwort', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Beruf:', Math.floor(CONTENT * 0.35)), dCell('Ich bin / Ich arbeite als …', Math.floor(CONTENT * 0.65), { italic: true, color: '888888' })] }),
        new TableRow({ children: [dCell('Arbeitgeber / Firma:', Math.floor(CONTENT * 0.35)), dCell('Ich arbeite bei …', Math.floor(CONTENT * 0.65), { italic: true, color: '888888' })] }),
        new TableRow({ children: [dCell('Arbeitsort:', Math.floor(CONTENT * 0.35)), dCell('Ich arbeite in …', Math.floor(CONTENT * 0.65), { italic: true, color: '888888' })] }),
        new TableRow({ children: [dCell('Arbeitszeit:', Math.floor(CONTENT * 0.35)), dCell('Ich arbeite Vollzeit / Teilzeit …', Math.floor(CONTENT * 0.65), { italic: true, color: '888888' })] }),
        new TableRow({ children: [dCell('Das mag ich an meinem Beruf:', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] })
      ]
    })
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Beruf und Arbeitsplatz'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  von Beruf    2.  als    3.  in    4.  Teilzeit'),
    p('5.  Büro / Arbeitsplatz    6.  Schicht    7.  Homeoffice    8.  Kollegen'),
    empty(),
    h2('Aufgabe 2'),
    p('1.  als … in    2.  bei    3.  für    4.  als … in'),
    pItalic('Hinweis: „arbeiten bei" = Arbeitgeber (Firma/Institution); „arbeiten in" = Ort/Gebäude; „arbeiten als" = Berufsbezeichnung; „arbeiten für" = im Auftrag von'),
    empty(),
    h2('Aufgabe 3 — Beispielantwort'),
    p('Individuelle Antworten akzeptieren. Kriterien:'),
    bullet('Beruf ohne Artikel nach sein: Ich bin Arzt. (nicht: Ich bin ein Arzt.)'),
    bullet('Korrekte Präposition: als + Beruf, bei + Firma, in + Ort'),
    bullet('Vollzeit / Teilzeit korrekt verwendet'),
    empty(),
    h2('Aufgabe 4 — Steckbrief'),
    pItalic('Individuelle Antworten.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Wortliste'),
    h2('Berufe'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Beruf (m)', Math.floor(CONTENT * 0.28)), hCell('Beruf (f)', Math.floor(CONTENT * 0.28)), hCell('Arbeitsort', Math.floor(CONTENT * 0.26)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Arzt', Math.floor(CONTENT * 0.28)), dCell('die Ärztin', Math.floor(CONTENT * 0.28)), dCell('Krankenhaus, Praxis', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Lehrer', Math.floor(CONTENT * 0.28)), dCell('die Lehrerin', Math.floor(CONTENT * 0.28)), dCell('Schule', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Ingenieur', Math.floor(CONTENT * 0.28)), dCell('die Ingenieurin', Math.floor(CONTENT * 0.28)), dCell('Büro, Fabrik', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Pfleger', Math.floor(CONTENT * 0.28)), dCell('die Pflegerin', Math.floor(CONTENT * 0.28)), dCell('Krankenhaus, Pflegeheim', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Koch', Math.floor(CONTENT * 0.28)), dCell('die Köchin', Math.floor(CONTENT * 0.28)), dCell('Restaurant, Hotel', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Verkäufer', Math.floor(CONTENT * 0.28)), dCell('die Verkäuferin', Math.floor(CONTENT * 0.28)), dCell('Geschäft, Supermarkt', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Anwalt', Math.floor(CONTENT * 0.28)), dCell('die Anwältin', Math.floor(CONTENT * 0.28)), dCell('Kanzlei', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Buchhalter', Math.floor(CONTENT * 0.28)), dCell('die Buchhalterin', Math.floor(CONTENT * 0.28)), dCell('Büro, Firma', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Programmierer', Math.floor(CONTENT * 0.28)), dCell('die Programmiererin', Math.floor(CONTENT * 0.28)), dCell('Büro, Homeoffice', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Fahrer', Math.floor(CONTENT * 0.28)), dCell('die Fahrerin', Math.floor(CONTENT * 0.28)), dCell('unterwegs', Math.floor(CONTENT * 0.26)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    h2('Wichtige Ausdrücke am Arbeitsplatz'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Ausdruck', Math.floor(CONTENT * 0.45)), hCell('Bedeutung / Beispiel', Math.floor(CONTENT * 0.37)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('Vollzeit arbeiten', Math.floor(CONTENT * 0.45)), dCell('40 h/Woche, z. B. Mo–Fr', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('Teilzeit arbeiten', Math.floor(CONTENT * 0.45)), dCell('weniger als 40 h/Woche', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('im Homeoffice arbeiten', Math.floor(CONTENT * 0.45)), dCell('von zu Hause aus arbeiten', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Schicht', Math.floor(CONTENT * 0.45)), dCell('Früh-, Spät-, Nachtschicht', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Kollege / die Kollegin', Math.floor(CONTENT * 0.45)), dCell('Person, mit der man zusammenarbeitet', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Chef / die Chefin', Math.floor(CONTENT * 0.45)), dCell('Vorgesetzte/r', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Arbeitszeit', Math.floor(CONTENT * 0.45)), dCell('wann und wie lange man arbeitet', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('das Gehalt', Math.floor(CONTENT * 0.45)), dCell('monatlicher Lohn', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Pause / Mittagspause', Math.floor(CONTENT * 0.45)), dCell('Zeit zum Ausruhen und Essen', Math.floor(CONTENT * 0.37)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    infoBox([
      'Grammatik-Tipp: Berufe nach sein ohne Artikel!',
      '',
      'Ich bin Arzt.  ✓         (kein Artikel)',
      'Ich bin ein Arzt.  ✗     (falsch!)',
      '',
      'Aber: Ich suche einen Arzt.  ✓  (Akkusativ mit Artikel = korrekt)',
      '',
      'Mit Adjektiv: Er ist ein sehr guter Arzt.  ✓  (Artikel + Adjektiv = korrekt)'
    ]),
    empty(),
    pItalic('Lernkarten-Tipp: Beruf (m) auf die Vorderseite — Beruf (f) + Arbeitsort auf die Rückseite.')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Beruf und Arbeitsplatz'),
    empty(),
    h2('Berufe — Übersetzungen (Beispiel Englisch)'),
    p('der Arzt / die Ärztin = doctor'),
    p('der Lehrer / die Lehrerin = teacher'),
    p('der Ingenieur / die Ingenieurin = engineer'),
    p('der Pfleger / die Pflegerin = nurse / caregiver'),
    p('der Koch / die Köchin = cook / chef'),
    p('der Verkäufer / die Verkäuferin = salesperson / shop assistant'),
    p('der Anwalt / die Anwältin = lawyer'),
    p('der Buchhalter / die Buchhalterin = accountant'),
    p('der Programmierer / die Programmiererin = programmer / developer'),
    p('der Fahrer / die Fahrerin = driver'),
    empty(),
    h2('Ausdrücke — Übersetzungen'),
    p('Vollzeit = full-time    Teilzeit = part-time    Homeoffice = working from home'),
    p('die Schicht = shift    der Kollege = colleague    der Chef = boss / manager'),
    p('die Arbeitszeit = working hours    das Gehalt = salary    die Pause = break'),
    empty(),
    pItalic('Individuelle Übersetzungen je nach Muttersprache der Lernenden akzeptieren.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Konversation'),
    h2('Dialog 1 — Erstes Kennenlernen (formell: Sie)'),
    p('Üben Sie den Dialog zu zweit. Dann tauschen Sie die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', Math.floor(CONTENT * 0.5)), hCell('Person B', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Guten Tag! Mein Name ist … Was machen Sie beruflich?', Math.floor(CONTENT * 0.5)), dCell('Guten Tag! Ich bin … von Beruf. Ich arbeite als …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Interessant! Wo arbeiten Sie?', Math.floor(CONTENT * 0.5)), dCell('Ich arbeite bei … / in … Und Sie?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ich bin … Ich arbeite Vollzeit / Teilzeit. Wie sind Ihre Arbeitszeiten?', Math.floor(CONTENT * 0.5)), dCell('Meine Arbeitszeiten sind … Was gefällt Ihnen an Ihrem Beruf?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Mir gefällt … weil …', Math.floor(CONTENT * 0.5)), dCell('Das kann ich verstehen! Mir auch …', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(), empty(),
    h2('Dialog 2 — Unter Kollegen (informell: du)'),
    p('Füllen Sie die Lücken aus und üben Sie.'),
    empty(),
    p('A:  Hey, seit wann arbeitest du hier?'),
    p('B:  Ich arbeite seit _______ hier. Und du?'),
    p('A:  Ich bin seit _______ dabei. Was machst du genau?'),
    p('B:  Ich bin _______ und bin zuständig für _______.'),
    p('A:  Und wie findest du die Arbeitszeiten hier?'),
    p('B:  Die Arbeitszeiten sind _______. Am liebsten mag ich _______, weil _______.'),
    p('A:  Ich finde auch _______ gut. Möchtest du in der Pause zusammen Kaffee trinken?'),
    p('B:  Ja, gern!'),
    empty(), empty(),
    h2('Partnerinterview — Beruf und Arbeit'),
    p('Fragen Sie Ihren Partner / Ihre Partnerin. Schreiben Sie die Antworten auf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.45)), hCell('Antwort', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was sind Sie / bist du von Beruf?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Wo arbeiten Sie / arbeitest du?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Wie sind Ihre / deine Arbeitszeiten?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was gefällt Ihnen / dir an Ihrem / deinem Beruf?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Was ist schwierig an Ihrem / deinem Beruf?', Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenübung — Berufe-Quiz'),
    p('Eine Person wählt einen Beruf und beschreibt ihn. Die anderen raten!'),
    empty(),
    pBold('Beschreibungsregeln:'),
    bullet('Ich arbeite in / bei / als …'),
    bullet('Ich muss … (täglich tun)'),
    bullet('Ich helfe / unterrichte / baue / verkaufe …'),
    bullet('Meine Arbeitszeiten sind …'),
    bullet('Man braucht für diesen Beruf …'),
    empty(),
    pBold('Beispiel:'),
    p('„Ich arbeite in einem Krankenhaus. Ich helfe kranken Menschen. Ich muss oft nachts arbeiten. Meine Arbeitszeiten sind in Schichten. Man braucht für diesen Beruf ein Studium."  →  Antwort: Arzt / Ärztin')
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Beruf und Arbeitsplatz'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Korrekte Berufsbezeichnung ohne Artikel nach sein: Ich bin Arzt. ✓'),
    bullet('Korrekte Präposition: arbeite als … / bei … / in …'),
    bullet('Höfliche Sie-Form korrekt verwendet'),
    bullet('Natürlicher Gesprächsfluss'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('B:  Ich arbeite seit zwei Jahren hier.'),
    p('B:  Ich bin Projektmanagerin und bin zuständig für das Marketingteam.'),
    p('B:  Die Arbeitszeiten sind flexibel. Am liebsten mag ich die Gleitzeit, weil ich dann auch morgens Sport machen kann.'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Individuelle Antworten. Auf korrekte Präpositionen und Berufsnennung ohne Artikel achten.'),
    empty(),
    h2('Berufe-Quiz — Lösungshinweis'),
    p('Die Lehrperson korrigiert, wenn eine falsche Präposition oder kein Artikel korrekt verwendet wird. Kreative Beschreibungen ermutigen!')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf und Arbeitsplatz — Bildaufgaben'),
    h2('Aufgabe 1 — Welcher Beruf ist das?'),
    p('Schauen Sie sich die Bilder an und schreiben Sie den Beruf (m/f) und den Arbeitsort.'),
    empty(),
    p('[BILD 1: Eine Person im weißen Kittel mit Stethoskop in einem Behandlungszimmer.]'),
    p('Beruf (m): _________________________  Beruf (f): _________________________'),
    p('Arbeitsort: ________________________'),
    empty(), empty(),
    p('[BILD 2: Eine Person vor einer Klasse, zeigt auf eine Tafel mit Zahlen.]'),
    p('Beruf (m): _________________________  Beruf (f): _________________________'),
    p('Arbeitsort: ________________________'),
    empty(), empty(),
    p('[BILD 3: Eine Person in Kochkleidung (weiße Jacke, Mütze) in einer Großküche.]'),
    p('Beruf (m): _________________________  Beruf (f): _________________________'),
    p('Arbeitsort: ________________________'),
    empty(), empty(),
    p('[BILD 4: Eine Person sitzt vor mehreren Computerbildschirmen mit Code.]'),
    p('Beruf (m): _________________________  Beruf (f): _________________________'),
    p('Arbeitsort: ________________________'),
    empty(), empty(),
    h2('Aufgabe 2 — Arbeitsplatz beschreiben'),
    p('[BILD: Ein modernes Büro: offener Grundriss, viele Schreibtische, große Fenster, Pflanzen, ein Besprechungsraum mit Glaswand, Kaffeemaschine in der Ecke, Menschen arbeiten am Computer.]'),
    empty(),
    p('Beschreiben Sie das Büro. Schreiben Sie 4–5 Sätze.'),
    p('Benutzen Sie: Es gibt … / Das Büro hat … / Die Mitarbeiter … / Am Fenster …'),
    ...writeLines(5),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Berufe verbinden'),
    p('[BILD: Zwei Spalten. Links: Bilder von 6 Berufen (Arzt, Lehrer, Koch, Anwalt, Ingenieur, Pfleger). Rechts: Arbeitsorte (Krankenhaus, Schule, Restaurant, Kanzlei, Fabrik/Büro, Pflegeheim). Verbinden Sie mit Linien.]'),
    empty(),
    p('Schreiben Sie zu jedem Beruf auch einen Satz:'),
    p('Ein _______ / Eine _______ arbeitet in / bei / als …'),
    ...writeLines(4),
    empty(), empty(),
    h2('Aufgabe 4 — Traumjob zeichnen und beschreiben'),
    p('[BILD-PLATZHALTER: Leeres Rechteck — zeichnen Sie Ihren Traumjob oder Arbeitsplatz.]'),
    empty(),
    p('Mein Traumjob:'),
    p('Ich möchte _______ werden.'),
    p('Ich würde als _______ in / bei / für _______ arbeiten.'),
    p('Das gefällt mir daran: _______________________________________________________'),
    ...writeLines(2)
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Beruf und Arbeitsplatz'),
    empty(),
    h2('Aufgabe 1 — Berufe und Arbeitsorte'),
    p('1.  Arzt / Ärztin — Krankenhaus oder Praxis'),
    p('2.  Lehrer / Lehrerin — Schule'),
    p('3.  Koch / Köchin — Restaurant, Hotel'),
    p('4.  Programmierer / Programmiererin — Büro, Homeoffice'),
    pItalic('Antworten hängen von den eingefügten Bildern ab.'),
    empty(),
    h2('Aufgabe 2 — Büro-Beschreibung'),
    p('Das Büro ist modern und hell. Es gibt viele Schreibtische und große Fenster. Die Mitarbeiter arbeiten am Computer. In der Ecke steht eine Kaffeemaschine. Es gibt auch einen Besprechungsraum mit Glaswand.'),
    pItalic('Individuelle Beschreibungen akzeptieren.'),
    empty(),
    h2('Aufgabe 3 — Verbindungen'),
    p('Arzt → Krankenhaus    Lehrer → Schule    Koch → Restaurant'),
    p('Anwalt → Kanzlei    Ingenieur → Fabrik / Büro    Pfleger → Pflegeheim / Krankenhaus'),
    empty(),
    h2('Aufgabe 4 — Traumjob'),
    pItalic('Individuelle Antworten. Grammatikkontrolle: Beruf ohne Artikel nach sein / werden.')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
