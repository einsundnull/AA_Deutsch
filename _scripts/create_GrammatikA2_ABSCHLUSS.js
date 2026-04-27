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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Abschluss';
const TOPIC       = 'A2_Kinder_GrammatikA2_ABSCHLUSS';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', 'ABSCHLUSS'
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

// Checklisten-Zeile
function checkRow(text) {
  return new TableRow({ children: [
    dCell('☐', Math.floor(CONTENT * 0.07)),
    dCell(text, Math.floor(CONTENT * 0.93))
  ]});
}

(async () => {
  console.log('Erstelle Abschluss: Grammatik A2 Kinder');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // ABSCHLUSS
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Grammatik A2 — Abschlusstest'),
    pItalic('Dieser Test wiederholt alle 7 Grammatikthemen aus diesem Kapitel.'),
    empty(),

    // ---- AUFGABE 1: LESETEXT ----
    h2('Aufgabe 1 — Lesetext: Die Klassenreise'),
    p('Lies den Text. Beantworte danach die Fragen.', { bold: true }),
    empty(),
    p('Letzte Woche ist die Klasse 5b nach Hamburg gefahren. Alle Kinder waren sehr aufgeregt, weil es ihre erste Klassenreise war. Das Hotel war schön und hatte einen großen Garten. Die Koffer standen im Zimmer, und die Jacken hingen an den Haken an der Wand.'),
    empty(),
    p('Am ersten Tag haben die Schüler das Rathaus besucht. Es war das größte Gebäude, das Jonas je gesehen hatte. „Hamburg ist viel größer als unsere Stadt!", sagte er. Mia fand den Hafen interessanter als das Rathaus, weil die Schiffe so riesig waren.'),
    empty(),
    p('Am zweiten Tag wollten alle ins Miniatur Wunderland. Aber Leo konnte nicht mitkommen, weil er Bauchschmerzen hatte. Er musste im Hotel bleiben. Seine Lehrerin hat ihm ein Buch gebracht und ihm erklärt, wie er sich die Zeit vertreiben konnte. Leo war traurig, aber am Abend ging es ihm besser.'),
    empty(),
    p('Am letzten Tag haben alle Souvenirs gekauft. Jonas hat seiner Schwester eine Postkarte geschrieben und ihr eine kleine Flagge mitgebracht. Mia hat ihrer besten Freundin ein Lesezeichen gegeben. Sie mussten um 16 Uhr am Bus sein. Die Klassenreise war die beste Reise, die sie je gemacht hatten!'),
    empty(), empty(),

    h2('Aufgabe 1a — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Die Kinder waren aufgeregt, weil es ihre erste Klassenreise war.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas fand den Hafen interessanter als das Rathaus.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Leo konnte nicht ins Miniatur Wunderland, weil er krank war.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Jonas hat seiner Schwester eine Flagge mitgebracht.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Die Klasse musste um 18 Uhr am Bus sein.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),

    h2('Aufgabe 1b — Grammatik im Text'),
    p('Finde im Text je ein Beispiel für diese Grammatikformen:'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Grammatikform', Math.floor(CONTENT * 0.35)), hCell('Beispiel aus dem Text', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Perfekt mit sein', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Perfekt mit haben', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('war / hatte (Präteritum)', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Dativ (Wem?)', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Wechselpräposition (Wo?)', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Komparativ (-er als)', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Nebensatz mit weil', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Modalverb Präteritum', Math.floor(CONTENT * 0.35)), dCell('', Math.floor(CONTENT * 0.65))] })
      ]
    }),

    new Paragraph({ children: [new PageBreak()] }),

    // ---- AUFGABE 2: LUECKEN ----
    h2('Aufgabe 2 — Lückentext: Gemischte Grammatik'),
    p('Setze die richtige Form ein. Der Grammatiktyp steht in Klammern.'),
    empty(),
    p('1.  Gestern _______ wir ins Kino gegangen.  (Perfekt — sein)'),
    writeLine(), empty(),
    p('2.  Das Kino _______ sehr voll.  (Präteritum: sein)'),
    writeLine(), empty(),
    p('3.  Ich habe _______ Freund ein Popcorn gekauft.  (Dativ: mein)'),
    writeLine(), empty(),
    p('4.  Die Tasche liegt _______ Stuhl.  (Wechselpräp. Wo? → auf + Dativ)'),
    writeLine(), empty(),
    p('5.  Wir legen die Bücher _______ Regal.  (Wechselpräp. Wohin? → in + Akkusativ)'),
    writeLine(), empty(),
    p('6.  Der Film war _______ als der letzte.  (Komparativ: spannend)'),
    writeLine(), empty(),
    p('7.  Es war der _______ Film des Jahres!  (Superlativ: gut)'),
    writeLine(), empty(),
    p('8.  Wir haben gelacht, weil der Film so lustig _______.  (weil-Satz: sein)'),
    writeLine(), empty(),
    p('9.  Ich _______ leider nicht mitkommen, weil ich krank war.  (Modalverb Prät.: können)'),
    writeLine(), empty(),
    p('10. Sie _______ früh nach Hause gehen.  (Modalverb Prät.: müssen)'),
    writeLine(),
    empty(), empty(),

    // ---- AUFGABE 3: FEHLER FINDEN ----
    h2('Aufgabe 3 — Fehler finden und korrigieren'),
    p('In jedem Satz steckt ein Grammatikfehler. Unterstreiche ihn und schreibe den richtigen Satz.'),
    empty(),
    p('1.  Ich habe gestern ins Kino gegangen.'),
    ...writeLines(1), empty(),
    p('2.  Das Hotel war sehr schöner als unser Haus.'),
    ...writeLines(1), empty(),
    p('3.  Ich gebe dem Lehrerin das Heft.'),
    ...writeLines(1), empty(),
    p('4.  Die Katze sitzt auf den Tisch.'),
    ...writeLines(1), empty(),
    p('5.  Ich bleibe zu Hause, weil ich bin krank.'),
    ...writeLines(1), empty(),
    p('6.  Er könnte gestern nicht kommen.  (Präteritum gemeint)'),
    ...writeLines(1),

    new Paragraph({ children: [new PageBreak()] }),

    // ---- AUFGABE 4: SCHREIBEN ----
    h2('Aufgabe 4 — Freies Schreiben: Ein toller Tag'),
    p('Schreibe einen kurzen Text (5–8 Sätze) über einen besonderen Tag. Benutze möglichst viele Grammatikformen aus diesem Kapitel!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' }, children: [
        new Paragraph({ children: [new TextRun({ text: 'Checkliste für deinen Text:', bold: true, size: 22, font: 'Arial' })], spacing: { before: 60, after: 40 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  mindestens 1 Satz im Perfekt  (Ich bin … / Ich habe …)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  war oder hatte  (Präteritum)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Dativ  (… dem/der …)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  weil-Satz  (Verb am Ende!)', size: 22, font: 'Arial' })], spacing: { before: 20, after: 20 } }),
        new Paragraph({ children: [new TextRun({ text: '☐  Komparativ oder Superlativ', size: 22, font: 'Arial' })], spacing: { before: 20, after: 60 } })
      ]})] })]
    }),
    empty(),
    ...writeLines(7),
    empty(), empty(),

    // ---- AUFGABE 5: KONVERSATION ----
    h2('Aufgabe 5 — Konversation: Über die Vergangenheit sprechen'),
    p('Übt den Dialog zu zweit. Benutzt möglichst viele Grammatikformen aus dem Kapitel.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', Math.floor(CONTENT * 0.5)), hCell('Person B', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was hast du letztes Wochenende gemacht?', Math.floor(CONTENT * 0.5)), dCell('Ich habe … / Ich bin … Und du?', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wie war es? War es besser als die Woche davor?', Math.floor(CONTENT * 0.5)), dCell('Es war … Es war … -er als … , weil …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was konntest du machen? Was musstest du machen?', Math.floor(CONTENT * 0.5)), dCell('Ich konnte … / Ich musste …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Was hast du jemandem gegeben oder gezeigt?', Math.floor(CONTENT * 0.5)), dCell('Ich habe … dem/der … gegeben.', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(), empty(),

    // ---- SELBSTEVALUATION ----
    h2('Selbstevaluation — Das kann ich!'),
    p('Setze ein Häkchen: ☑ = Das kann ich gut   ☐ = Das übe ich noch'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('', Math.floor(CONTENT * 0.07)), hCell('Ich kann …', Math.floor(CONTENT * 0.93))] }),
        checkRow('das Perfekt bilden (Ich habe gemacht / Ich bin gegangen).'),
        checkRow('war und hatte als Präteritum benutzen.'),
        checkRow('den Dativ benutzen (Ich gebe dem Freund / der Freundin …).'),
        checkRow('Wechselpräpositionen mit Wo? (Dativ) und Wohin? (Akkusativ) benutzen.'),
        checkRow('Komparativ (-er als) und Superlativ (am -sten) bilden.'),
        checkRow('Sätze mit weil bilden (Verb am Ende!).'),
        checkRow('Modalverben im Präteritum benutzen (konnte / musste / wollte).'),
        checkRow('einen kurzen Text über die Vergangenheit schreiben.')
      ]
    })
  ], TOPIC + '.docx');

  // ============================================================
  // ABSCHLUSS LOESUNG
  // ============================================================
  await save([
    h1('LÖSUNG — Grammatik A2 Abschlusstest'),
    empty(),

    h2('Aufgabe 1a — Richtig / Falsch'),
    p('1.  R'),
    p('2.  F  (Mia fand den Hafen interessanter, nicht Jonas)'),
    p('3.  R  (Leo hatte Bauchschmerzen)'),
    p('4.  R'),
    p('5.  F  (sie mussten um 16 Uhr am Bus sein)'),
    empty(),

    h2('Aufgabe 1b — Grammatik im Text'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Grammatikform', Math.floor(CONTENT * 0.35)), hCell('Beispiel aus dem Text', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Perfekt mit sein', Math.floor(CONTENT * 0.35)), dCell('ist die Klasse 5b nach Hamburg gefahren', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Perfekt mit haben', Math.floor(CONTENT * 0.35)), dCell('haben die Schüler das Rathaus besucht / hat Jonas … geschrieben', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('war / hatte', Math.floor(CONTENT * 0.35)), dCell('Das Hotel war schön / hatte einen großen Garten', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Dativ', Math.floor(CONTENT * 0.35)), dCell('seiner Schwester / seiner Lehrerin / ihrer Freundin', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Wechselpräp. (Wo?)', Math.floor(CONTENT * 0.35)), dCell('Die Koffer standen im Zimmer / hingen an den Haken', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Komparativ', Math.floor(CONTENT * 0.35)), dCell('viel größer als unsere Stadt / interessanter als das Rathaus', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('weil-Satz', Math.floor(CONTENT * 0.35)), dCell('weil es ihre erste Klassenreise war / weil er Bauchschmerzen hatte', Math.floor(CONTENT * 0.65))] }),
        new TableRow({ children: [dCell('Modalverb Prät.', Math.floor(CONTENT * 0.35)), dCell('wollten alle ins Miniatur Wunderland / konnte nicht mitkommen / musste im Hotel bleiben', Math.floor(CONTENT * 0.65))] })
      ]
    }),
    empty(),

    h2('Aufgabe 2 — Lückentext'),
    p('1.  sind  (Perfekt mit sein: wir sind gegangen)'),
    p('2.  war  (Präteritum von sein)'),
    p('3.  meinem  (Dativ maskulin: dem Freund → meinem Freund)'),
    p('4.  dem  (auf + Dativ: dem Stuhl)'),
    p('5.  das  (in + Akkusativ: das Regal)'),
    p('6.  spannender  (Komparativ: spannend → spannender)'),
    p('7.  beste  (Superlativ: gut → der beste)'),
    p('8.  war  (weil-Satz: Verb ans Ende → war)'),
    p('9.  konnte  (Modalverb Präteritum: können → konnte)'),
    p('10. mussten  (Modalverb Präteritum: müssen → mussten)'),
    empty(),

    h2('Aufgabe 3 — Fehler korrigieren'),
    p('1.  „habe … gegangen" ✗  →  bin gestern ins Kino gegangen.'),
    pItalic('(gehen = Bewegungsverb → Perfekt mit sein)', { color: '888888' }),
    empty(),
    p('2.  „schöner als" ✗  →  Das Hotel war viel schöner als unser Haus.'),
    pItalic('(Komparativ: schön → schöner, nicht schöner als mit „sehr")', { color: '888888' }),
    empty(),
    p('3.  „dem Lehrerin" ✗  →  Ich gebe der Lehrerin das Heft.'),
    pItalic('(Lehrerin = feminin → Dativ: der Lehrerin)', { color: '888888' }),
    empty(),
    p('4.  „auf den Tisch" ✗  →  Die Katze sitzt auf dem Tisch.'),
    pItalic('(Wo? = Dativ → auf dem Tisch)', { color: '888888' }),
    empty(),
    p('5.  „weil ich bin krank" ✗  →  weil ich krank bin.'),
    pItalic('(weil-Satz: Verb ans Ende)', { color: '888888' }),
    empty(),
    p('6.  „könnte" ✗  →  Er konnte gestern nicht kommen.'),
    pItalic('(Präteritum von können: konnte — ohne Umlaut)', { color: '888888' }),
    empty(),

    h2('Aufgabe 4 — Freies Schreiben'),
    pItalic('Individuelle Texte akzeptieren. Kriterien:', { color: '888888' }),
    bullet('Mindestens 5 vollständige Sätze'),
    bullet('Perfekt korrekt gebildet (sein/haben-Auswahl)'),
    bullet('war/hatte als Präteritum (nicht im Perfekt)'),
    bullet('Dativform korrekt (dem/der)'),
    bullet('weil: Verb am Ende'),
    bullet('Komparativ/Superlativ ohne Umlautfehler'),
    bullet('Modalverb im Präteritum ohne Umlaut'),
    empty(),

    h2('Aufgabe 5 — Konversation'),
    pItalic('Bewertungskriterien:', { color: '888888' }),
    bullet('Korrekte Verwendung von Perfekt (nicht Präsens für Vergangenes)'),
    bullet('war/hatte statt Perfekt von sein/haben'),
    bullet('Dativform nach geben/schenken/zeigen/helfen'),
    bullet('weil-Satz mit Verb am Ende'),
    bullet('Komparativ -er + als'),
    bullet('Modalverb Präteritum ohne Umlaut'),
    empty(),

    h2('Hinweis zur Selbstevaluation'),
    pItalic('Die Selbstevaluation ist ehrlich auszufüllen. Schüler, die viele ☐ haben, bekommen gezielte Zusatzübungen aus den Einzelkapiteln.')
  ], TOPIC + '_LOESUNG.docx');

  console.log('\nFertig! 2 Dateien erstellt.');
})();
