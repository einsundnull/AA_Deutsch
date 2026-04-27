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

const TOPIC_LABEL = 'A2 Erwachsene — Beruf & Arbeit — Bewerbung & Vorstellungsgespräch';
const TOPIC       = 'A2_Erwachsene_Beruf_03_Bewerbung';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Erwachsene', '01_Beruf', '03_Bewerbung'
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
  console.log('Erstelle Unterpunkt: Bewerbung und Vorstellungsgespräch');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Schreibübung'),
    infoBox([
      'Wichtige Sätze für die Bewerbung:',
      '',
      'Ich bewerbe mich für die Stelle als …',
      'Ich habe X Jahre Berufserfahrung als …',
      'Ich habe eine Ausbildung / ein Studium als … abgeschlossen.',
      'Meine Stärken sind: … / Ich bin … (zuverlässig, teamfähig, flexibel)',
      'Ich spreche Deutsch (A2/B1/…) und Englisch (gut / fließend).',
      'Ich bin ab sofort / ab dem 1. Mai verfügbar.',
      'Über eine Einladung zum Vorstellungsgespräch freue ich mich sehr.'
    ]),
    empty(),
    h2('Aufgabe 1 — Kurzbewerbung schreiben'),
    p('Lesen Sie die Stellenanzeige und schreiben Sie eine kurze Bewerbung (5–7 Sätze).'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, borders: { top: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, left: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' }, right: { style: BorderStyle.SINGLE, size: 6, color: 'CC8800' } }, children: [
        new Paragraph({ children: [new TextRun({ text: 'Stellenanzeige:', bold: true, size: 22, font: 'Arial' })], spacing: { before: 60, after: 40 } }),
        new Paragraph({ children: [new TextRun({ text: 'Wir suchen eine/n Bürokaufmann / Bürokauffrau (Teilzeit, 20 Std./Woche).', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: 'Anforderungen: abgeschlossene Ausbildung, gute Deutschkenntnisse, Computerkenntnisse (MS Office).', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: 'Wir bieten: flexible Arbeitszeiten, nettes Team, 28 Tage Urlaub.', size: 22, font: 'Arial' })], spacing: { before: 20, after: 60 } })
      ]})] })]
    }),
    empty(),
    p('Sehr geehrte Damen und Herren,'),
    ...writeLines(6),
    p('Mit freundlichen Grüßen'),
    p('_______________________________'),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2 — Lebenslauf-Stichpunkte'),
    p('Füllen Sie den Lebenslauf-Entwurf mit eigenen Informationen aus.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Kategorie', Math.floor(CONTENT * 0.3)), hCell('Meine Informationen', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Name:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Geburtsdatum:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Wohnort:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Ausbildung / Studium:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Berufserfahrung:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Sprachen:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Stärken:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] }),
        new TableRow({ children: [dCell('Verfügbar ab:', Math.floor(CONTENT * 0.3)), dCell('', Math.floor(CONTENT * 0.7))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 3 — Typische Fragen im Vorstellungsgespräch'),
    p('Schreiben Sie Ihre Antworten auf diese häufigen Fragen (2–3 Sätze je Frage).'),
    empty(),
    p('1.  „Erzählen Sie bitte etwas über sich."'),
    ...writeLines(3), empty(),
    p('2.  „Warum interessiert Sie diese Stelle?"'),
    ...writeLines(3), empty(),
    p('3.  „Was sind Ihre Stärken?"'),
    ...writeLines(2)
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Aufgabe 1 — Musterbewerbung'),
    p('Sehr geehrte Damen und Herren,'),
    empty(),
    p('ich bewerbe mich für die Stelle als Bürokauffrau in Teilzeit. Ich habe eine abgeschlossene Ausbildung als Bürokauffrau und drei Jahre Berufserfahrung. Ich arbeite sicher mit MS Office und spreche Deutsch auf B2-Niveau sowie Englisch fließend.'),
    empty(),
    p('Meine Stärken sind Zuverlässigkeit, Teamfähigkeit und eine sorgfältige Arbeitsweise. Ich bin ab sofort verfügbar und freue mich über eine Einladung zum Vorstellungsgespräch.'),
    empty(),
    p('Mit freundlichen Grüßen'),
    p('[Name]'),
    empty(),
    pItalic('Wichtige Merkmale: formelle Anrede / Bewerbungssatz / Qualifikationen / Stärken / Verfügbarkeit / Schlussformel'),
    empty(),
    h2('Aufgabe 2 — Lebenslauf'),
    pItalic('Individuelle Antworten.'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  „Mein Name ist … Ich bin … Jahre alt und komme aus … Ich habe eine Ausbildung als … und arbeite seit … Jahren als …"'),
    p('2.  „Diese Stelle interessiert mich, weil ich meine Erfahrungen im Bereich … einbringen möchte. Außerdem schätze ich die flexiblen Arbeitszeiten sehr."'),
    p('3.  „Ich bin zuverlässig, teamfähig und lerne schnell. Ich arbeite gern strukturiert und achte auf Details."')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Leseübung'),
    h2('Lesetext: Mein erstes Vorstellungsgespräch in Deutschland'),
    p('Mein Name ist Amara Diallo. Ich komme aus dem Senegal und lebe seit zwei Jahren in Deutschland. Letzten Monat hatte ich mein erstes Vorstellungsgespräch auf Deutsch — und ich war sehr nervös!'),
    empty(),
    p('Die Stelle war als Verkäuferin in einem Supermarkt. Ich habe mich online beworben und eine Woche später eine Einladung zum Gespräch bekommen. Ich habe mich gut vorbereitet: Ich habe typische Fragen geübt und meine Antworten aufgeschrieben.'),
    empty(),
    p('Das Gespräch dauerte etwa 30 Minuten. Der Personalleiter, Herr Wagner, war freundlich und hat mir viele Fragen gestellt. Er hat gefragt, warum ich mich bewerbe, welche Erfahrungen ich habe und ob ich schon einmal im Einzelhandel gearbeitet habe. Ich habe erklärt, dass ich in meinem Heimatland drei Jahre als Verkäuferin gearbeitet habe.'),
    empty(),
    p('Dann hat Herr Wagner mir die Stelle erklärt: Teilzeit, 25 Stunden pro Woche, auch samstags. Das Gehalt ist 13 Euro pro Stunde. Ich habe gefragt, ob Sprachkurse möglich sind — das war Herrn Wagner sehr wichtig, weil mein Deutsch noch nicht perfekt ist.'),
    empty(),
    p('Drei Tage später hat Herr Wagner angerufen: Ich habe die Stelle bekommen! Ich war so glücklich. Das Vorstellungsgespräch war eine wichtige Erfahrung — und jetzt weiß ich, wie es geht.'),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Amara lebt seit drei Jahren in Deutschland.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Sie hat sich für eine Stelle als Bürokauffrau beworben.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Das Gespräch hat ungefähr eine halbe Stunde gedauert.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Amara hat keine Erfahrung als Verkäuferin.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Amara hat die Stelle bekommen.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Fragen beantworten'),
    empty(),
    p('1.  Wie hat Amara sich auf das Gespräch vorbereitet?'),
    ...writeLines(2), empty(),
    p('2.  Welche Fragen hat Herr Wagner gestellt? Nennen Sie zwei.'),
    ...writeLines(2), empty(),
    p('3.  Was hat Amara beim Gespräch gefragt?'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Reihenfolge bringen'),
    p('Bringen Sie die Schritte einer Bewerbung in die richtige Reihenfolge (1–6).'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Schritt', Math.floor(CONTENT * 0.12)), hCell('Beschreibung', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Zum Vorstellungsgespräch gehen', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Eine Stellenanzeige finden', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Eine Einladung zum Gespräch bekommen', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Bewerbungsunterlagen vorbereiten (Lebenslauf, Anschreiben)', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Auf eine Antwort warten', Math.floor(CONTENT * 0.88))] }),
        new TableRow({ children: [dCell('_____', Math.floor(CONTENT * 0.12)), dCell('Bewerbung abschicken', Math.floor(CONTENT * 0.88))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 4 — Ihre Erfahrung'),
    p('Haben Sie schon einmal ein Vorstellungsgespräch gehabt? Wie war es? Oder: Welche Fragen würden Sie schwierig finden? Schreiben Sie 3–4 Sätze.'),
    ...writeLines(4)
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  F  (seit zwei Jahren)'),
    p('2.  F  (als Verkäuferin in einem Supermarkt)'),
    p('3.  R  (etwa 30 Minuten)'),
    p('4.  F  (sie hat drei Jahre Erfahrung im Heimatland)'),
    p('5.  R'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Sie hat typische Fragen geübt und ihre Antworten aufgeschrieben.'),
    p('2.  Warum sie sich bewirbt / welche Erfahrungen sie hat / ob sie im Einzelhandel gearbeitet hat.'),
    p('3.  Sie hat gefragt, ob Sprachkurse möglich sind.'),
    empty(),
    h2('Aufgabe 3 — Richtige Reihenfolge'),
    p('1 = Stellenanzeige finden'),
    p('2 = Bewerbungsunterlagen vorbereiten'),
    p('3 = Bewerbung abschicken'),
    p('4 = Auf eine Antwort warten'),
    p('5 = Einladung bekommen'),
    p('6 = Zum Vorstellungsgespräch gehen'),
    empty(),
    h2('Aufgabe 4 — Meinung'),
    pItalic('Individuelle Antworten. Auf Perfekt (Ich habe … gemacht) und weil-Sätze achten.')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Lückentext'),
    p('Wörterkasten:'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFF8E8' }, children: [new Paragraph({ children: [new TextRun({ text: 'bewerbe  —  Stelle  —  Erfahrung  —  Ausbildung  —  Lebenslauf  —  Anschreiben  —  Stärken  —  verfügbar  —  Einladung  —  Vorstellungsgespräch  —  Gehalt  —  einstellen', size: 22, font: 'Arial' })] })] })] })]
    }),
    empty(),
    h2('Aufgabe 1 — Passendes Wort einsetzen'),
    empty(),
    p('1.  Ich _____________ mich für die _____________ als Köchin in Ihrem Restaurant.'),
    writeLine(), empty(),
    p('2.  Bitte schicken Sie uns Ihren _____________ und ein _____________.'),
    writeLine(), empty(),
    p('3.  Sie hat fünf Jahre _____________ als Krankenschwester und eine abgeschlossene _____________.'),
    writeLine(), empty(),
    p('4.  Meine _____________ sind Kommunikation, Teamarbeit und Zuverlässigkeit.'),
    writeLine(), empty(),
    p('5.  Ich bin ab dem 1. Juni _____________ und freue mich auf ein _____________.'),
    writeLine(), empty(),
    p('6.  Das _____________ für diese Stelle beträgt 3.200 Euro brutto pro Monat.'),
    writeLine(), empty(),
    p('7.  Die Firma hat beschlossen, Frau Hofer _____________ — sie beginnt nächste Woche.'),
    writeLine(),
    empty(), empty(),
    h2('Aufgabe 2 — Vorstellungsgespräch: Frage und Antwort'),
    p('Welche Antwort passt zu welcher Frage? Verbinden Sie (A–E mit 1–5).'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Fragen (Personalleiter)', Math.floor(CONTENT * 0.5)), hCell('Antworten (Bewerber/in)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('A.  Warum bewerben Sie sich bei uns?', Math.floor(CONTENT * 0.5)), dCell('1.  Ich bin sehr zuverlässig und lerne schnell.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('B.  Welche Erfahrungen haben Sie?', Math.floor(CONTENT * 0.5)), dCell('2.  Ab dem 1. April bin ich verfügbar.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('C.  Was sind Ihre Stärken?', Math.floor(CONTENT * 0.5)), dCell('3.  Ich habe drei Jahre als Verkäuferin gearbeitet.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('D.  Wann können Sie anfangen?', Math.floor(CONTENT * 0.5)), dCell('4.  Ihr Unternehmen hat einen sehr guten Ruf, und die Stelle passt gut zu meiner Ausbildung.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('E.  Haben Sie noch Fragen?', Math.floor(CONTENT * 0.5)), dCell('5.  Ja — wie sind die Möglichkeiten zur Weiterbildung?', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    p('Lösungen: A – ___   B – ___   C – ___   D – ___   E – ___'),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Anschreiben ergänzen'),
    p('Ergänzen Sie das Anschreiben mit passenden Wörtern oder Phrasen.'),
    empty(),
    p('Sehr geehrte Damen und Herren,'),
    empty(),
    p('hiermit _____________ ich mich für die _____________ als Buchhalter/in,'),
    p('die ich auf Ihrer Website gefunden habe.'),
    empty(),
    p('Ich habe eine abgeschlossene _____________ als Kaufmann für Büromanagement'),
    p('und _____________ Jahre Berufserfahrung im Bereich Buchhaltung.'),
    p('Meine _____________ sind: Sorgfalt, Zahlenverständnis und Teamfähigkeit.'),
    empty(),
    p('Ich spreche Deutsch (B2) und Englisch (gut). Ich bin ab _____________ _____________.'),
    empty(),
    p('Über eine _____________ zum Vorstellungsgespräch freue ich mich sehr.'),
    empty(),
    p('Mit freundlichen Grüßen,'),
    p('_______________________________'),
    empty(), empty(),
    h2('Aufgabe 4 — Formell oder informell?'),
    p('Ordnen Sie die Sätze zu: Bewerbungsbrief (B) oder private Nachricht (P)?'),
    empty(),
    p('___  „Hey, ich finde euren Job total cool und will mich bewerben!"'),
    p('___  „Hiermit bewerbe ich mich für die ausgeschriebene Stelle."'),
    p('___  „Meine Stärken sind Kommunikation und Teamarbeit."'),
    p('___  „Ich kann super gut mit Zahlen und bin mega zuverlässig."'),
    p('___  „Über eine Einladung zum Vorstellungsgespräch freue ich mich sehr."'),
    p('___  „Schreib mir, wann ich anfangen kann!"')
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  bewerbe / Stelle    2.  Lebenslauf / Anschreiben'),
    p('3.  Erfahrung / Ausbildung    4.  Stärken'),
    p('5.  verfügbar / Vorstellungsgespräch    6.  Gehalt    7.  einstellen'),
    empty(),
    h2('Aufgabe 2 — Zuordnung'),
    p('A – 4    B – 3    C – 1    D – 2    E – 5'),
    empty(),
    h2('Aufgabe 3 — Musterlösung'),
    p('bewerbe / Stelle / Ausbildung / [Zahl] / Stärken / [Datum] / verfügbar / Einladung'),
    pItalic('Individuelle Ergänzungen bei Zahl und Datum akzeptieren.'),
    empty(),
    h2('Aufgabe 4 — Formell / Informell'),
    p('P  B  B  P  B  P'),
    pItalic('Bewerbungssprache: formell, Konjunktiv der Höflichkeit, keine Umgangssprache, vollständige Sätze.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Wortliste'),
    h2('Bewerbungsvokabular'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wort / Ausdruck', Math.floor(CONTENT * 0.32)), hCell('Bedeutung / Kontext', Math.floor(CONTENT * 0.5)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Bewerbung', Math.floor(CONTENT * 0.32)), dCell('Dokument + Prozess um einen Job zu bekommen', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('der Lebenslauf (CV)', Math.floor(CONTENT * 0.32)), dCell('Dokument mit persönlichen Daten + Berufserfahrung', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('das Anschreiben', Math.floor(CONTENT * 0.32)), dCell('Brief: Warum man sich bewirbt', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('das Vorstellungsgespräch', Math.floor(CONTENT * 0.32)), dCell('Gespräch mit dem Arbeitgeber', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Ausbildung', Math.floor(CONTENT * 0.32)), dCell('berufliche Ausbildung (3 Jahre, dual)', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Berufserfahrung', Math.floor(CONTENT * 0.32)), dCell('wie lange und was man schon gearbeitet hat', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Qualifikation', Math.floor(CONTENT * 0.32)), dCell('Fähigkeiten und Zertifikate', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Stärke / Schwäche', Math.floor(CONTENT * 0.32)), dCell('Was man gut / weniger gut kann', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('die Stelle / Position', Math.floor(CONTENT * 0.32)), dCell('die ausgeschriebene Arbeitsstelle', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('einstellen / kündigen', Math.floor(CONTENT * 0.32)), dCell('jemanden nehmen / entlassen', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('verfügbar sein', Math.floor(CONTENT * 0.32)), dCell('ab wann man anfangen kann', Math.floor(CONTENT * 0.5)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    h2('Typische Adjektive für Stärken'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Adjektiv', Math.floor(CONTENT * 0.3)), hCell('Bedeutung', Math.floor(CONTENT * 0.52)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('zuverlässig', Math.floor(CONTENT * 0.3)), dCell('man kann sich auf die Person verlassen', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('teamfähig', Math.floor(CONTENT * 0.3)), dCell('gut mit anderen zusammenarbeiten', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('kommunikativ', Math.floor(CONTENT * 0.3)), dCell('gut kommunizieren und erklären', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('belastbar', Math.floor(CONTENT * 0.3)), dCell('auch unter Stress gut arbeiten', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('sorgfältig', Math.floor(CONTENT * 0.3)), dCell('genaue, fehlerfreie Arbeit', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('lernbereit', Math.floor(CONTENT * 0.3)), dCell('möchte immer Neues lernen', Math.floor(CONTENT * 0.52)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    infoBox([
      'Nützliche Sätze im Vorstellungsgespräch:',
      '',
      'Einstieg:    Ich freue mich sehr, hier zu sein.',
      '             Vielen Dank für die Einladung.',
      '',
      'Über sich:   Ich bin … Jahre alt und komme aus …',
      '             Ich habe … Jahre Erfahrung als …',
      '',
      'Motivation:  Diese Stelle interessiert mich sehr, weil …',
      '             Ich möchte gern in Ihrem Unternehmen arbeiten, weil …',
      '',
      'Abschluss:   Haben Sie noch Fragen an mich?',
      '             Ich freue mich auf Ihre Rückmeldung.'
    ]),
    empty(),
    pItalic('Lernkarten-Tipp: Frage des Personalers auf die Vorderseite, Musterantwort auf die Rückseite.')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Bewerbungsvokabular — Übersetzungen (Beispiel Englisch)'),
    p('die Bewerbung = job application    der Lebenslauf = CV / résumé'),
    p('das Anschreiben = cover letter    das Vorstellungsgespräch = job interview'),
    p('die Ausbildung = vocational training / apprenticeship'),
    p('die Berufserfahrung = work experience    die Qualifikation = qualification'),
    p('die Stärke = strength    die Schwäche = weakness'),
    p('die Stelle = position / job    einstellen = to hire    kündigen = to dismiss / to quit'),
    p('verfügbar sein = to be available'),
    empty(),
    h2('Stärken-Adjektive — Übersetzungen'),
    p('zuverlässig = reliable    teamfähig = team player / able to work in a team'),
    p('kommunikativ = communicative    belastbar = resilient / able to work under pressure'),
    p('sorgfältig = careful / thorough    lernbereit = eager to learn'),
    empty(),
    pItalic('Individuelle Übersetzungen je nach Muttersprache akzeptieren.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Konversation'),
    h2('Dialog 1 — Rollenspiel: Vorstellungsgespräch'),
    p('Person A = Personalleiter/in   |   Person B = Bewerber/in'),
    p('Üben Sie das Gespräch. Dann tauschen Sie die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Personalleiter/in (A)', Math.floor(CONTENT * 0.5)), hCell('Bewerber/in (B)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Guten Tag, Frau/Herr … Bitte nehmen Sie Platz.', Math.floor(CONTENT * 0.5)), dCell('Guten Tag. Danke für die Einladung.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Erzählen Sie bitte kurz etwas über sich.', Math.floor(CONTENT * 0.5)), dCell('Ich bin … Jahre alt, komme aus … und habe …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Warum bewerben Sie sich bei uns?', Math.floor(CONTENT * 0.5)), dCell('Ich bewerbe mich, weil … / Diese Stelle interessiert mich, weil …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Welche Stärken bringen Sie mit?', Math.floor(CONTENT * 0.5)), dCell('Meine Stärken sind … Außerdem bin ich …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wann könnten Sie anfangen?', Math.floor(CONTENT * 0.5)), dCell('Ich bin ab … verfügbar.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Haben Sie noch Fragen?', Math.floor(CONTENT * 0.5)), dCell('Ja — wie sind … / Wäre es möglich, dass …?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Vielen Dank. Wir melden uns in den nächsten Tagen.', Math.floor(CONTENT * 0.5)), dCell('Vielen Dank. Ich freue mich auf Ihre Rückmeldung.', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(), empty(),
    h2('Dialog 2 — Nach dem Gespräch'),
    p('Zwei Freunde sprechen nach dem Vorstellungsgespräch. Ergänzen Sie.'),
    empty(),
    p('Freund/in:  Na, wie war das Gespräch?'),
    p('Bewerber:   Es war _______ — ich war zuerst sehr _______, aber dann lief es besser.'),
    p('Freund/in:  Was haben sie dich gefragt?'),
    p('Bewerber:   Sie haben gefragt, warum ich _______ und was meine _______ sind.'),
    p('Freund/in:  Und — hast du gut geantwortet?'),
    p('Bewerber:   Ich glaube schon. Ich habe erklärt, dass ich _______ Jahre Erfahrung'),
    p('             habe und sehr _______ bin.'),
    p('Freund/in:  Super! Wann erfährst du, ob du die Stelle bekommst?'),
    p('Bewerber:   Sie melden sich in _______ Tagen. Ich bin sehr _______.'),
    empty(), empty(),
    h2('Partnerinterview — Bewerbungscoaching'),
    p('Stellen Sie Ihrem Partner / Ihrer Partnerin diese Fragen wie in einem echten Bewerbungsgespräch.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.5)), hCell('Antwort notieren', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Erzählen Sie etwas über sich.', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was sind Ihre Stärken?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Welche Erfahrungen haben Sie?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Warum interessiert Sie diese Stelle?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wann sind Sie verfügbar?', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenübung — Gute oder schlechte Antwort?'),
    p('Lesen Sie die Antworten. Ist die Antwort gut (G) oder schlecht (S) für ein Vorstellungsgespräch? Diskutieren Sie.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.38)), hCell('Antwort', Math.floor(CONTENT * 0.47)), hCell('G / S?', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('Was sind Ihre Stärken?', Math.floor(CONTENT * 0.38)), dCell('„Ich habe eigentlich keine besonderen Stärken."', Math.floor(CONTENT * 0.47)), dCell('', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('Warum möchten Sie hier arbeiten?', Math.floor(CONTENT * 0.38)), dCell('„Weil ich Geld brauche."', Math.floor(CONTENT * 0.47)), dCell('', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('Welche Erfahrungen haben Sie?', Math.floor(CONTENT * 0.38)), dCell('„Ich habe drei Jahre als Buchhalterin gearbeitet und kenne MS Excel sehr gut."', Math.floor(CONTENT * 0.47)), dCell('', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('Was sind Ihre Schwächen?', Math.floor(CONTENT * 0.38)), dCell('„Ich bin manchmal zu perfektionistisch, aber ich arbeite daran."', Math.floor(CONTENT * 0.47)), dCell('', Math.floor(CONTENT * 0.15))] }),
        new TableRow({ children: [dCell('Haben Sie noch Fragen?', Math.floor(CONTENT * 0.38)), dCell('„Nein, eigentlich nicht."', Math.floor(CONTENT * 0.47)), dCell('', Math.floor(CONTENT * 0.15))] })
      ]
    })
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Formelle Sie-Form korrekt und durchgehend'),
    bullet('Klare, vollständige Antworten (keine Ein-Wort-Antworten)'),
    bullet('Mindestens eine eigene Frage am Ende gestellt'),
    bullet('Höfliche Begrüßung und Verabschiedung'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('gut/okay / nervös / mich bewerbe / Stärken / [Zahl] / zuverlässig / wenigen / gespannt / nervös'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Kriterien für gute Antworten:'),
    bullet('Vollständige Sätze (nicht nur Stichwörter)'),
    bullet('Konkrete Beispiele für Erfahrungen und Stärken'),
    bullet('Motivation klar ausgedrückt (weil-Satz)'),
    bullet('Verfügbarkeit mit Datum angegeben'),
    empty(),
    h2('Gruppenübung — Lösungen'),
    p('1.  S  (Stärken immer nennen — das ist eine Pflichtfrage)'),
    p('2.  S  (Geldmotiv nicht direkt nennen — besser: Interesse am Unternehmen, Aufgaben)'),
    p('3.  G  (konkret, relevant, mit Beispiel)'),
    p('4.  G  (ehrlich aber positiv formuliert — klassische Strategie)'),
    p('5.  S  (immer mindestens eine Frage stellen — zeigt Interesse)')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Bewerbung & Vorstellungsgespräch — Bildaufgaben'),
    h2('Aufgabe 1 — Was sehen Sie? Beschreiben Sie die Situation.'),
    empty(),
    p('[BILD 1: Eine Person sitzt einem Tisch gegenüber zwei Personen (Personalleiter). Alle tragen Business-Kleidung, der Raum ist ein Büro. Auf dem Tisch liegt ein Lebenslauf.]'),
    p('Was passiert hier? Wer sind die Personen? Schreiben Sie 2–3 Sätze.'),
    ...writeLines(3),
    empty(), empty(),
    p('[BILD 2: Eine Person am Computer tippt ein Dokument. Man sieht den Bildschirm mit dem Anfang eines Briefs: „Sehr geehrte Damen und Herren …"]'),
    p('Was schreibt die Person? Warum? Schreiben Sie 2 Sätze.'),
    ...writeLines(2),
    empty(), empty(),
    p('[BILD 3: Zwei Personen beim Händeschütteln — eine in Business-Kleidung mit Mappe, die andere hinter einem Schreibtisch. Beide lächeln.]'),
    p('Was ist passiert? Schreiben Sie 1–2 Sätze im Perfekt.'),
    ...writeLines(2),
    empty(), empty(),
    h2('Aufgabe 2 — Bewerbungsprozess als Bild'),
    p('[BILD: Eine Infografik mit 5 Schritten einer Bewerbung als Kreislauf — Pfeile zwischen den Schritten. Die Schritte sind nummeriert aber noch nicht beschriftet.]'),
    empty(),
    p('Beschriften Sie die 5 Schritte mit den richtigen Begriffen:'),
    p('Stellenanzeige finden  /  Unterlagen schicken  /  Gespräch vorbereiten  /  Gespräch führen  /  Rückmeldung abwarten'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Schritt', Math.floor(CONTENT * 0.15)), hCell('Bezeichnung', Math.floor(CONTENT * 0.5)), hCell('Was macht man konkret?', Math.floor(CONTENT * 0.35))] }),
        ...['1.', '2.', '3.', '4.', '5.'].map(n => new TableRow({ children: [dCell(n, Math.floor(CONTENT * 0.15)), dCell('', Math.floor(CONTENT * 0.5)), dCell('', Math.floor(CONTENT * 0.35))] }))
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Ihr eigenes Anschreiben'),
    p('[BILD-PLATZHALTER: Vorlage eines leeren Anschreibens mit Feldern: Absender / Empfänger / Datum / Betreff / Anrede / Text / Schluss]'),
    empty(),
    p('Schreiben Sie ein kurzes Anschreiben für diese Stelle:'),
    pItalic('„Wir suchen eine/n Mitarbeiter/in für unser internationales Büro. Kenntnisse: gute Deutschkenntnisse, Computerkenntnisse, Teamfähigkeit."'),
    empty(),
    p('Sehr geehrte Damen und Herren,'),
    ...writeLines(6),
    p('Mit freundlichen Grüßen,'),
    p('_______________________________')
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Bewerbung & Vorstellungsgespräch'),
    empty(),
    h2('Aufgabe 1 — Beispielantworten'),
    p('Bild 1: Hier findet ein Vorstellungsgespräch statt. Die Person links ist der/die Bewerber/in, die zwei Personen rechts sind die Personalleiter. Sie sprechen über die Stelle.'),
    p('Bild 2: Die Person schreibt ein Anschreiben / eine Bewerbung. Sie möchte sich für eine Stelle bewerben.'),
    p('Bild 3: Die Person hat die Stelle bekommen. Sie hat sich beworben und das Vorstellungsgespräch war erfolgreich. / Sie haben sich die Hand gegeben, weil die Person eingestellt wurde.'),
    pItalic('Antworten hängen von den eingefügten Bildern ab.'),
    empty(),
    h2('Aufgabe 2 — Bewerbungsprozess'),
    p('1 = Stellenanzeige finden'),
    p('2 = Unterlagen schicken'),
    p('3 = Rückmeldung abwarten'),
    p('4 = Gespräch vorbereiten'),
    p('5 = Gespräch führen'),
    pItalic('Reihenfolge 3 und 4 kann variieren je nach Darstellung der Infografik.'),
    empty(),
    h2('Aufgabe 3 — Anschreiben'),
    pItalic('Individuelle Antworten. Kriterien:'),
    bullet('Formelle Anrede (Sehr geehrte Damen und Herren)'),
    bullet('Bewerbungssatz (Ich bewerbe mich für …)'),
    bullet('Eigene Qualifikationen und Stärken genannt'),
    bullet('Formeller Abschluss (Mit freundlichen Grüßen)')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
