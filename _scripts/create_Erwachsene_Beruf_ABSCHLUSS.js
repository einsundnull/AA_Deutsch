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

const TOPIC_LABEL = 'A2 Erwachsene — Beruf & Arbeit — Abschluss';
const TOPIC       = 'A2_Erwachsene_Beruf_ABSCHLUSS';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Erwachsene', '01_Beruf', 'ABSCHLUSS'
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

function checkRow(text) {
  return new TableRow({ children: [
    dCell('☐', Math.floor(CONTENT * 0.07)),
    dCell(text, Math.floor(CONTENT * 0.93))
  ]});
}

(async () => {
  console.log('Erstelle Abschluss: Beruf & Arbeit (Erwachsene)');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // ABSCHLUSS
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Beruf & Arbeit — Abschlusstest'),
    pItalic('Dieser Test wiederholt alle drei Bereiche: Beruf und Arbeitsplatz / Arbeitsbedingungen / Bewerbung.'),
    empty(),

    // AUFGABE 1 — LESETEXT
    h2('Aufgabe 1 — Lesetext: Ein neuer Anfang'),
    p('Lesen Sie den Text. Bearbeiten Sie danach die Aufgaben.', { bold: true }),
    empty(),
    p('Nadia Kovács ist 32 Jahre alt und kommt aus Ungarn. Sie lebt seit vier Jahren in Wien und arbeitet als Buchhalterin bei einer mittelgroßen Marketingfirma. Ihr Arbeitsplatz ist im dritten Bezirk — moderne Büros, nette Kollegen, gute Lage.'),
    empty(),
    p('Trotzdem ist Nadia nicht vollständig zufrieden. Das Gehalt ist okay, aber sie macht sehr oft Überstunden und bekommt dafür keine Anerkennung. Außerdem sind die Arbeitszeiten starr — kein Homeoffice, keine Flexibilität. Nadia findet es schwierig, Job und Privatleben in Balance zu halten.'),
    empty(),
    p('Deshalb hat sie entschieden: Sie bewirbt sich für eine neue Stelle. Sie hat eine interessante Stellenanzeige gefunden — eine Buchhalterin in Teilzeit bei einer internationalen NGO. Die Stelle klingt perfekt: flexibel, sinnvoll, gut bezahlt.'),
    empty(),
    p('Nadia hat ihren Lebenslauf aktualisiert und ein Anschreiben geschrieben. Zwei Wochen später hat sie eine Einladung zum Vorstellungsgespräch bekommen. Sie war sehr nervös, hat sich aber gut vorbereitet. Im Gespräch hat sie erklärt, warum sie sich bewirbt und welche Erfahrungen sie mitbringt. Am Ende hat sie eine Frage über die Möglichkeit gestellt, von zu Hause zu arbeiten.'),
    empty(),
    p('Das Gespräch ist gut gelaufen. Drei Tage später hat die NGO angerufen: Nadia kann anfangen! Ihr neuer Job beginnt in zwei Wochen. Sie ist glücklich — endlich eine Arbeit, die zu ihr passt.'),
    empty(), empty(),

    h2('Aufgabe 1a — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Nadia arbeitet als Buchhalterin in Wien.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Nadia ist vollständig zufrieden mit ihrem Job.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Die neue Stelle ist in einer internationalen NGO.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Nadia hat im Gespräch keine Fragen gestellt.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Nadia hat die neue Stelle bekommen.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),

    h2('Aufgabe 1b — Themen aus dem Text'),
    p('Finden Sie im Text ein Beispiel für jedes Thema aus dem Kapitel:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Thema', Math.floor(CONTENT * 0.35)), hCell('Beispiel oder Zitat aus dem Text', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Beruf und Arbeitsplatz', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Negative Arbeitsbedingung', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Positive Arbeitsbedingung (neue Stelle)', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Bewerbungsschritt', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Satz im Vorstellungsgespräch', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] })
      ]
    }),

    new Paragraph({ children: [new PageBreak()] }),

    // AUFGABE 2 — LUECKENTEXT
    h2('Aufgabe 2 — Lückentext: Gemischte Themen'),
    p('Setzen Sie das passende Wort ein.'),
    empty(),
    p('1.  Ich bin _______ von Beruf und arbeite _______ Buchhalter bei einer Bank.  (Beruf / als)'),
    writeLine(), empty(),
    p('2.  Das Arbeitsklima in unserer Firma ist sehr _______. Alle respektieren sich.  (Adjektiv)'),
    writeLine(), empty(),
    p('3.  Frau Koch macht fast jeden Tag _______, weil es zu viel Arbeit gibt.  (Nomen)'),
    writeLine(), empty(),
    p('4.  Er hat sich _______ die Stelle als Ingenieur beworben.  (Präposition)'),
    writeLine(), empty(),
    p('5.  Bitte schicken Sie uns Ihren _______ und ein _______.  (2 Nomen)'),
    writeLine(), empty(),
    p('6.  Meine _______ sind Zuverlässigkeit, Teamfähigkeit und schnelles Lernen.  (Nomen Pl.)'),
    writeLine(), empty(),
    p('7.  Der Job ist sehr _______ — ich arbeite 50 Stunden pro Woche.  (Adjektiv negativ)'),
    writeLine(), empty(),
    p('8.  Ich bin ab dem 1. September _______ und freue mich auf das _______.  (2 Wörter)'),
    writeLine(),
    empty(), empty(),

    // AUFGABE 3 — FEHLER KORRIGIEREN
    h2('Aufgabe 3 — Fehler finden und korrigieren'),
    p('In jedem Satz steckt ein Fehler. Unterstreichen Sie ihn und schreiben Sie den richtigen Satz.'),
    empty(),
    p('1.  Ich bin eine Ärztin.  (Bewerbungskontext)'),
    ...writeLines(1), empty(),
    p('2.  Das Gehalt ist zu niedrige für diese Arbeit.'),
    ...writeLines(1), empty(),
    p('3.  Ich bewerbe mich für Stelle als Köchin.'),
    ...writeLines(1), empty(),
    p('4.  Ich habe viel Erfahrungen als Buchhalter.'),
    ...writeLines(1), empty(),
    p('5.  Über eine Einladung freue ich mich sehr zum Vorstellungsgespräch.'),
    ...writeLines(1), empty(),
    p('6.  Ich finde mein Job sehr stressig, aber interessant.'),
    ...writeLines(1),

    new Paragraph({ children: [new PageBreak()] }),

    // AUFGABE 4 — SCHREIBEN
    h2('Aufgabe 4 — Schreiben: Mein beruflicher Weg'),
    p('Schreiben Sie einen kurzen Text (6–8 Sätze) über Ihren Beruf oder Wunschberuf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' }, children: [
        new Paragraph({ children: [new TextRun({ text: 'Checkliste für Ihren Text:', bold: true, size: 22, font: 'Arial' })], spacing: { before: 60, after: 40 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Beruf nennen (ohne Artikel nach sein: Ich bin …)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Arbeitsplatz beschreiben (bei / in / als …)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Arbeitsbedingungen bewerten (Adjektiv + Begründung mit weil)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Stärken nennen (zuverlässig / teamfähig / …)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 60 } })
      ]})] })]
    }),
    empty(),
    ...writeLines(7),
    empty(), empty(),

    // AUFGABE 5 — KONVERSATION
    h2('Aufgabe 5 — Rollenspiel: Vollständiges Vorstellungsgespräch'),
    p('Führen Sie ein vollständiges Gespräch (5–7 Minuten). Benutzen Sie alle gelernten Phrasen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Personalleiter/in muss fragen nach …', Math.floor(CONTENT * 0.5)), hCell('Bewerber/in muss antworten zu …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Vorstellung der Person', Math.floor(CONTENT * 0.5)), dCell('Name, Herkunft, Beruf, Erfahrung', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Motivation für die Stelle', Math.floor(CONTENT * 0.5)), dCell('Warum diese Firma / Stelle?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Qualifikationen und Stärken', Math.floor(CONTENT * 0.5)), dCell('Ausbildung, Fähigkeiten, Adjektive', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Verfügbarkeit und Gehaltsvorstellung', Math.floor(CONTENT * 0.5)), dCell('Ab wann? Wie viel?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Fragen des Bewerbers annehmen', Math.floor(CONTENT * 0.5)), dCell('Mind. 1 eigene Frage stellen!', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(), empty(),

    // SELBSTEVALUATION
    h2('Selbstevaluation — Das kann ich!'),
    p('Setzen Sie ein Häkchen: ☑ = Das kann ich gut   ☐ = Das übe ich noch'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('', Math.floor(CONTENT * 0.07)), hCell('Ich kann …', Math.floor(CONTENT * 0.93))] }),
        checkRow('meinen Beruf und Arbeitsplatz auf Deutsch beschreiben (Ich bin … / Ich arbeite als …).'),
        checkRow('über Arbeitsbedingungen sprechen und meine Meinung ausdrücken.'),
        checkRow('Vor- und Nachteile eines Berufs nennen und begründen (weil / obwohl).'),
        checkRow('eine einfache Bewerbung / ein Anschreiben auf Deutsch schreiben.'),
        checkRow('typische Fragen im Vorstellungsgespräch verstehen und beantworten.'),
        checkRow('die Sie-Form korrekt und durchgehend in formellen Situationen benutzen.'),
        checkRow('berufsbezogenes Vokabular (Gehalt, Überstunden, Ausbildung …) anwenden.')
      ]
    })
  ], TOPIC + '.docx');

  // ============================================================
  // ABSCHLUSS LOESUNG
  // ============================================================
  await save([
    h1('LÖSUNG — Beruf & Arbeit Abschlusstest'),
    empty(),

    h2('Aufgabe 1a — Richtig / Falsch'),
    p('1.  R'),
    p('2.  F  (sie ist nicht vollständig zufrieden — Überstunden, keine Flexibilität)'),
    p('3.  R'),
    p('4.  F  (sie hat eine Frage über Homeoffice gestellt)'),
    p('5.  R'),
    empty(),

    h2('Aufgabe 1b — Themen aus dem Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Thema', Math.floor(CONTENT * 0.35)), hCell('Beispiel aus dem Text', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Beruf und Arbeitsplatz', Math.floor(CONTENT * 0.35)), dCell('Nadia arbeitet als Buchhalterin bei einer Marketingfirma im dritten Bezirk.', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Negative Arbeitsbedingung', Math.floor(CONTENT * 0.35)), dCell('Sie macht sehr oft Überstunden / keine Flexibilität / kein Homeoffice.', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Positive Bedingung (neue Stelle)', Math.floor(CONTENT * 0.35)), dCell('flexibel, sinnvoll, gut bezahlt', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Bewerbungsschritt', Math.floor(CONTENT * 0.35)), dCell('Lebenslauf aktualisiert / Anschreiben geschrieben / Einladung bekommen', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Satz im Gespräch', Math.floor(CONTENT * 0.35)), dCell('Sie hat erklärt, warum sie sich bewirbt und welche Erfahrungen sie mitbringt.', Math.floor(CONTENT * 0.65))] })
      ]
    }),
    empty(),

    h2('Aufgabe 2 — Lückentext'),
    p('1.  Buchhalter/in / als    2.  angenehm / gut / positives Adjektiv'),
    p('3.  Überstunden    4.  für    5.  Lebenslauf / Anschreiben'),
    p('6.  Stärken    7.  stressig / anstrengend    8.  verfügbar / Vorstellungsgespräch'),
    empty(),

    h2('Aufgabe 3 — Fehler korrigieren'),
    p('1.  Ich bin eine Ärztin.  ✗  →  Ich bin Ärztin.'),
    pItalic('(Beruf nach sein ohne Artikel; mit Adjektiv geht ein Artikel: eine sehr gute Ärztin)'),
    empty(),
    p('2.  Das Gehalt ist zu niedrige …  ✗  →  Das Gehalt ist zu niedrig.'),
    pItalic('(Prädikat-Adjektiv: keine Endung nach sein)'),
    empty(),
    p('3.  Ich bewerbe mich für Stelle …  ✗  →  Ich bewerbe mich für die Stelle als Köchin.'),
    pItalic('(bestimmter Artikel: die Stelle; Präposition für verlangt Akkusativ)'),
    empty(),
    p('4.  Ich habe viel Erfahrungen …  ✗  →  Ich habe viel Erfahrung … (oder: viele Erfahrungen)'),
    pItalic('(viel + Singular ODER viele + Plural; gemischt ist falsch)'),
    empty(),
    p('5.  … freue ich mich sehr zum Vorstellungsgespräch.  ✗  →  … freue ich mich sehr auf eine Einladung zum Vorstellungsgespräch.'),
    pItalic('(feste Phrase: sich freuen auf + Akkusativ; Wortstellung prüfen)'),
    empty(),
    p('6.  Ich finde mein Job …  ✗  →  Ich finde meinen Job …'),
    pItalic('(Job = maskulin → Akkusativ nach finden: meinen Job)'),
    empty(),

    h2('Aufgabe 4 — Freies Schreiben'),
    pItalic('Individuelle Texte. Kriterien:'),
    bullet('Beruf ohne Artikel nach sein (Ich bin Arzt.)'),
    bullet('Korrekte Präpositionen (als / bei / in / für)'),
    bullet('Arbeitsbedingungen mit Adjektiv bewertet'),
    bullet('weil-Satz korrekt (Verb am Ende)'),
    bullet('Mindestens eine Stärke genannt'),
    empty(),

    h2('Aufgabe 5 — Rollenspiel'),
    pItalic('Bewertungskriterien:'),
    bullet('Sie-Form korrekt und durchgehend'),
    bullet('Vollständige Antworten mit Satzstruktur (nicht nur Stichwörter)'),
    bullet('Motivation mit weil-Satz begründet'),
    bullet('Mindestens eine eigene Frage am Ende'),
    bullet('Höfliche Begrüßung und Verabschiedung'),
    empty(),

    h2('Hinweis zur Selbstevaluation'),
    pItalic('Lernende mit mehreren ☐ erhalten gezielte Zusatzübungen aus den Einzelkapiteln. Schwerpunkt häufig: formelle Sprache (Sie-Form) und Adjektivendungen.')
  ], TOPIC + '_LOESUNG.docx');

  console.log('\nFertig! 2 Dateien erstellt.');
})();
