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

const TOPIC_LABEL = 'A2 Kinder — Grammatik A2 — Nebensätze mit weil';
const TOPIC       = 'A2_Kinder_GrammatikA2_06_NebensaetzeWeil';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '11_GrammatikA2', '06_NebensaetzeWeil'
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
const dCell = (txt, w, opts = {}) => new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: txt, size: opts.size || 22, font: 'Arial', bold: opts.bold || false, italics: opts.italic || false, color: opts.color || '000000' })] })] });

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

function ruleBox(lines) {
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'E8F4E8' },
        borders: { top: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, bottom: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, left: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' }, right: { style: BorderStyle.SINGLE, size: 8, color: '2D7D2D' } },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Regel', bold: true, size: 26, font: 'Arial', color: '1F4E79' })], spacing: { before: 80, after: 60 } }),
          ...lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 24, font: 'Arial' })], spacing: { before: 40, after: 40 } }))
        ]
      })]
    })]
  });
}

(async () => {
  console.log('Erstelle Unterpunkt: Nebensätze mit weil');
  console.log('Zielordner:', OUTPUT_DIR);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ============================================================
  // SCHREIBEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Schreibübung'),
    ruleBox([
      'weil = weil / da / denn',
      'Nach weil steht das Verb AM ENDE des Satzes!',
      '',
      'Ich bin müde.  +  Ich habe wenig geschlafen.',
      '→  Ich bin müde, weil ich wenig geschlafen habe.',
      '',
      'Ich lerne Deutsch.  +  Es macht mir Spaß.',
      '→  Ich lerne Deutsch, weil es mir Spaß macht.',
      '',
      'Merksatz: Hauptsatz + KOMMA + weil + … + VERB (am Ende)'
    ]),
    empty(),
    h2('Aufgabe 1 — Verbinde die Sätze mit weil'),
    p('Schreibe einen neuen Satz. Das Verb steht am Ende!'),
    empty(),
    p('1.  Leo ist glücklich. Er hat eine gute Note bekommen.'),
    p('    → ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(),
    p('2.  Mia bleibt zu Hause. Sie ist krank.'),
    p('    → ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(),
    p('3.  Wir essen kein Fleisch. Wir finden das ungesund.'),
    p('    → ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(),
    p('4.  Finn lernt viel. Er will eine gute Note schreiben.'),
    p('    → ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(),
    p('5.  Das Kind weint. Es hat sein Spielzeug verloren.'),
    p('    → ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(), empty(),
    h2('Aufgabe 2 — Steigerung: weil am Anfang'),
    p('Wenn weil am Anfang steht, kommt das Verb im Hauptsatz nach vorn.'),
    p('Beispiel:  Weil es regnet, bleibe ich zu Hause.'),
    empty(),
    p('Schreibe die Sätze so um, dass weil am Anfang steht.'),
    empty(),
    p('1.  Ich bin müde, weil ich wenig geschlafen habe.'),
    p('    → Weil ________________________________________________________________', { color: '888888' }),
    writeLine(), empty(),
    p('2.  Sie lacht, weil der Film lustig ist.'),
    p('    → Weil ________________________________________________________________', { color: '888888' }),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Wortstellung kontrollieren'),
    p('Ordne das Verb richtig ein. Schreibe den Satz korrekt auf.'),
    empty(),
    p('1.  Ich mag Hunde, weil sie [sind] treu und lieb.'),
    ...writeLines(2), empty(),
    p('2.  Wir fahren gern in die Berge, weil es dort frische Luft [gibt].'),
    ...writeLines(2), empty(),
    p('3.  Leon hat Hunger, weil er heute noch nichts [gegessen hat].'),
    ...writeLines(2), empty(), empty(),
    h2('Aufgabe 4 — Freies Schreiben'),
    p('Schreibe 4 eigene Sätze mit weil. Erkläre deine Gründe!'),
    empty(),
    pItalic('Ideen: Ich lerne gern Deutsch / Ich mag … / Ich bin froh / Ich finde … toll'),
    empty(),
    ...writeLines(4), empty(),
    pItalic('Tipp: Kontrolliere immer — steht das Verb am Ende deines weil-Satzes?')
  ], TOPIC + '_Schreiben.docx');

  // SCHREIBEN LOESUNG
  await save([
    h1('LÖSUNG — Schreibübung Nebensätze mit weil'),
    empty(),
    h2('Aufgabe 1 — Musterlösungen'),
    p('1.  Leo ist glücklich, weil er eine gute Note bekommen hat.'),
    p('2.  Mia bleibt zu Hause, weil sie krank ist.'),
    p('3.  Wir essen kein Fleisch, weil wir das ungesund finden.'),
    p('4.  Finn lernt viel, weil er eine gute Note schreiben will.'),
    p('5.  Das Kind weint, weil es sein Spielzeug verloren hat.'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Weil ich wenig geschlafen habe, bin ich müde.'),
    p('2.  Weil der Film lustig ist, lacht sie.'),
    pItalic('Hinweis: Nach weil-Satz am Anfang steht im Hauptsatz das Verb vor dem Subjekt.'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen'),
    p('1.  Ich mag Hunde, weil sie treu und lieb sind.'),
    p('2.  Wir fahren gern in die Berge, weil es dort frische Luft gibt.'),
    p('3.  Leon hat Hunger, weil er heute noch nichts gegessen hat.'),
    empty(),
    h2('Aufgabe 4 — Freies Schreiben'),
    pItalic('Individuelle Antworten akzeptieren. Wichtig: Verb am Ende des weil-Satzes!'),
    p('Typische Fehler beim Korrigieren prüfen:', { bold: true }),
    bullet('weil ich lerne gern Deutsch  ✗  → weil ich gern Deutsch lerne  ✓'),
    bullet('weil das ist interessant  ✗  → weil das interessant ist  ✓'),
    bullet('Komma vor weil nicht vergessen!')
  ], TOPIC + '_Schreiben_LOESUNG.docx');

  // ============================================================
  // LESEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Leseübung'),
    h2('Lesetext: Warum? Weil!'),
    p('Emma ist 11 Jahre alt und hat heute einen langen Schultag. Sie ist müde, weil sie gestern Abend lange gelesen hat. Aber sie freut sich, weil ihre beste Freundin Lena auch in der Klasse ist.'),
    empty(),
    p('In der Mathestunde ist Emma sehr konzentriert, weil sie die Aufgaben wirklich verstehen will. Sie fragt den Lehrer, weil ihr eine Aufgabe unklar ist. Der Lehrer ist froh, weil Emma so fleißig ist.'),
    empty(),
    p('In der Pause isst Emma ihr Pausenbrot nicht, weil sie noch keinen Hunger hat. Lena isst aber viel, weil sie schon seit dem Morgen nichts gegessen hat. Die beiden lachen, weil das so lustig klingt.'),
    empty(),
    p('Nach der Schule lernt Emma noch eine Stunde Vokabeln, weil sie morgen einen Test hat. Dann geht sie früh ins Bett, weil sie morgen ausgeschlafen sein will. Sie schläft schnell ein, weil sie so müde ist.'),
    empty(), empty(),
    h2('Aufgabe 1 — Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', Math.floor(CONTENT * 0.8)), hCell('R / F', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Emma ist müde, weil sie heute viel Sport gemacht hat.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Emma freut sich, weil Lena in ihrer Klasse ist.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Emma fragt den Lehrer, weil eine Aufgabe unklar ist.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Emma isst ihr Pausenbrot, weil sie Hunger hat.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] }),
        new TableRow({ children: [dCell('Emma lernt Vokabeln, weil sie morgen einen Test hat.', Math.floor(CONTENT * 0.8)), dCell('', Math.floor(CONTENT * 0.2))] })
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 2 — Beantworte die Fragen mit weil'),
    p('Schreibe vollständige Sätze!'),
    empty(),
    p('1.  Warum ist Emma müde?'),
    ...writeLines(2), empty(),
    p('2.  Warum fragt Emma den Lehrer?'),
    ...writeLines(2), empty(),
    p('3.  Warum lernt Emma nach der Schule Vokabeln?'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Hauptsatz und Nebensatz'),
    p('Finde im Text 5 Sätze mit weil. Schreibe sie in die Tabelle.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Hauptsatz', Math.floor(CONTENT * 0.45)), hCell('weil + Nebensatz (Verb am Ende)', Math.floor(CONTENT * 0.55))] }),
        ...['1.', '2.', '3.', '4.', '5.'].map(n => new TableRow({ children: [dCell(n, Math.floor(CONTENT * 0.45)), dCell('', Math.floor(CONTENT * 0.55))] }))
      ]
    }),
    empty(), empty(),
    h2('Aufgabe 4 — weil-Sätze im Text markieren'),
    p('Unterstreiche im Text alle Verben, die am Ende eines weil-Satzes stehen.'),
    p('Wie viele hast du gefunden? _______ Verben')
  ], TOPIC + '_Lesen.docx');

  // LESEN LOESUNG
  await save([
    h1('LÖSUNG — Leseübung Nebensätze mit weil'),
    empty(),
    h2('Aufgabe 1'),
    p('1.  F  (Sie ist müde, weil sie gestern Abend lange gelesen hat.)'),
    p('2.  R'),
    p('3.  R'),
    p('4.  F  (Sie isst nicht, weil sie noch keinen Hunger hat.)'),
    p('5.  R'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Emma ist müde, weil sie gestern Abend lange gelesen hat.'),
    p('2.  Emma fragt den Lehrer, weil ihr eine Aufgabe unklar ist.'),
    p('3.  Emma lernt Vokabeln, weil sie morgen einen Test hat.'),
    empty(),
    h2('Aufgabe 3 — Musterlösungen (5 aus dem Text)'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Hauptsatz', Math.floor(CONTENT * 0.45)), hCell('weil + Nebensatz', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Sie ist müde,', Math.floor(CONTENT * 0.45)), dCell('weil sie gestern Abend lange gelesen hat.', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Sie freut sich,', Math.floor(CONTENT * 0.45)), dCell('weil ihre beste Freundin Lena in der Klasse ist.', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Emma ist konzentriert,', Math.floor(CONTENT * 0.45)), dCell('weil sie die Aufgaben verstehen will.', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Sie fragt den Lehrer,', Math.floor(CONTENT * 0.45)), dCell('weil ihr eine Aufgabe unklar ist.', Math.floor(CONTENT * 0.55))] }),
        new TableRow({ children: [dCell('Emma lernt Vokabeln,', Math.floor(CONTENT * 0.45)), dCell('weil sie morgen einen Test hat.', Math.floor(CONTENT * 0.55))] })
      ]
    }),
    empty(),
    h2('Aufgabe 4'),
    p('Im Text stehen 10 weil-Sätze. Endverben (Beispiele): gelesen hat, ist, verstehen will, unklar ist, ist (froh), gegessen hat, klingt, hat, sein will, müde ist.')
  ], TOPIC + '_Lesen_LOESUNG.docx');

  // ============================================================
  // LUECKEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Lückentext'),
    h2('Aufgabe 1 — Schreibe das Verb an die richtige Stelle'),
    p('Das Verb im weil-Satz steht immer am Ende! Füge das Verb in Klammern richtig ein.'),
    empty(),
    p('1.  Ich bin froh, weil das Wetter heute so schön ______ (sein).'),
    writeLine(), empty(),
    p('2.  Wir können nicht spielen, weil wir noch Hausaufgaben ______ (machen müssen).'),
    writeLine(), empty(),
    p('3.  Tim lacht, weil sein Freund einen lustigen Witz ______ (erzählen).'),
    writeLine(), empty(),
    p('4.  Ich esse gern Pizza, weil sie so lecker ______ (schmecken).'),
    writeLine(), empty(),
    p('5.  Sophie lernt Gitarre, weil sie Musikerin ______ (werden wollen).'),
    writeLine(), empty(),
    p('6.  Das Kind schläft noch, weil es sehr müde ______ (sein).'),
    writeLine(), empty(),
    p('7.  Ben trinkt viel Wasser, weil das gesund ______ (sein).'),
    writeLine(), empty(),
    p('8.  Wir lieben dieses Buch, weil die Geschichte so spannend ______ (sein).'),
    writeLine(), empty(), empty(),
    h2('Aufgabe 2 — Verbinde mit weil'),
    p('Schreibe einen Satz. Verwende weil und achte auf die Wortstellung.'),
    empty(),
    p('1.  Ich bin traurig. Mein Hund ist krank.'),
    ...writeLines(2), empty(),
    p('2.  Sie geht früh schlafen. Sie muss morgen früh aufstehen.'),
    ...writeLines(2), empty(),
    p('3.  Wir fahren in den Urlaub. Wir haben Ferien.'),
    ...writeLines(2), empty(),
    p('4.  Er macht Sport. Er will fit bleiben.'),
    ...writeLines(2),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — weil oder denn?'),
    pItalic('Merke: weil → Verb am Ende | denn → normale Wortstellung (kein Nebensatz)'),
    p('Setze weil oder denn ein und beachte die Wortstellung!'),
    empty(),
    p('1.  Ich bleibe zu Hause, _______ ich bin krank.'),
    writeLine(), empty(),
    p('2.  Ich bleibe zu Hause, _______ ich krank bin.'),
    writeLine(), empty(),
    p('3.  Wir lachen, _______ der Clown so lustig ist.'),
    writeLine(), empty(),
    p('4.  Wir lachen, _______ der Clown ist so lustig.'),
    writeLine(), empty(), empty(),
    h2('Aufgabe 4 — Dialog ergänzen'),
    p('Ergänze den Dialog mit weil und einem passenden Grund.'),
    empty(),
    p('Lara:  Warum bist du so aufgeregt?'),
    p('Jonas: Ich bin aufgeregt, weil ___________________________________________.'),
    writeLine(), empty(),
    p('Lara:  Warum hast du so viel gelernt?'),
    p('Jonas: Ich habe viel gelernt, weil ___________________________________________.'),
    writeLine(), empty(),
    p('Lara:  Warum kommst du zu spät?'),
    p('Jonas: Ich komme zu spät, weil ___________________________________________.'),
    writeLine()
  ], TOPIC + '_Luecken.docx');

  // LUECKEN LOESUNG
  await save([
    h1('LÖSUNG — Lückentext Nebensätze mit weil'),
    empty(),
    h2('Aufgabe 1 — Verb am Ende'),
    p('1.  weil das Wetter heute so schön ist.'),
    p('2.  weil wir noch Hausaufgaben machen müssen.'),
    p('3.  weil sein Freund einen lustigen Witz erzählt.'),
    p('4.  weil sie so lecker schmeckt.'),
    p('5.  weil sie Musikerin werden will.'),
    p('6.  weil es sehr müde ist.'),
    p('7.  weil das gesund ist.'),
    p('8.  weil die Geschichte so spannend ist.'),
    empty(),
    h2('Aufgabe 2 — Musterlösungen'),
    p('1.  Ich bin traurig, weil mein Hund krank ist.'),
    p('2.  Sie geht früh schlafen, weil sie morgen früh aufstehen muss.'),
    p('3.  Wir fahren in den Urlaub, weil wir Ferien haben.'),
    p('4.  Er macht Sport, weil er fit bleiben will.'),
    empty(),
    h2('Aufgabe 3 — weil oder denn'),
    p('1.  denn  (normale Wortstellung: ich bin krank)'),
    p('2.  weil  (Verb am Ende: krank bin)'),
    p('3.  weil  (Verb am Ende: ist)'),
    p('4.  denn  (normale Wortstellung: der Clown ist so lustig)'),
    pItalic('Merksatz: weil + Verb am Ende | denn + Verb an Position 2'),
    empty(),
    h2('Aufgabe 4 — Dialog'),
    pItalic('Individuelle Antworten akzeptieren. Auf korrekte Wortstellung achten (Verb am Ende nach weil).'),
    p('Beispiele:'),
    p('... weil ich morgen einen Test schreibe.'),
    p('... weil der Test sehr schwer war.'),
    p('... weil der Bus zu spät gekommen ist.')
  ], TOPIC + '_Luecken_LOESUNG.docx');

  // ============================================================
  // WORTLISTE
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Wortliste'),
    h2('Konjunktionen und Satzverbinder'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wort', Math.floor(CONTENT * 0.18)), hCell('Typ', Math.floor(CONTENT * 0.22)), hCell('Beispielsatz', Math.floor(CONTENT * 0.42)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('weil', Math.floor(CONTENT * 0.18)), dCell('Konjunktion (Nebensatz)', Math.floor(CONTENT * 0.22)), dCell('Ich lerne, weil der Test morgen ist.', Math.floor(CONTENT * 0.42)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('denn', Math.floor(CONTENT * 0.18)), dCell('Konjunktion (Hauptsatz)', Math.floor(CONTENT * 0.22)), dCell('Ich lerne, denn der Test ist morgen.', Math.floor(CONTENT * 0.42)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('deshalb', Math.floor(CONTENT * 0.18)), dCell('Adverb (Hauptsatz)', Math.floor(CONTENT * 0.22)), dCell('Der Test ist morgen, deshalb lerne ich.', Math.floor(CONTENT * 0.42)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('darum', Math.floor(CONTENT * 0.18)), dCell('Adverb (Hauptsatz)', Math.floor(CONTENT * 0.22)), dCell('Er ist krank, darum bleibt er zu Hause.', Math.floor(CONTENT * 0.42)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    h2('Häufige Gründe und Ursachen'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Ausdruck', Math.floor(CONTENT * 0.38)), hCell('Beispiel mit weil', Math.floor(CONTENT * 0.44)), hCell('Übersetzung', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('müde sein', Math.floor(CONTENT * 0.38)), dCell('…, weil ich müde bin.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('krank sein', Math.floor(CONTENT * 0.38)), dCell('…, weil er krank ist.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('Hunger haben', Math.floor(CONTENT * 0.38)), dCell('…, weil ich Hunger habe.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('Spaß machen', Math.floor(CONTENT * 0.38)), dCell('…, weil es Spaß macht.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('wichtig sein', Math.floor(CONTENT * 0.38)), dCell('…, weil das wichtig ist.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('lernen wollen', Math.floor(CONTENT * 0.38)), dCell('…, weil ich lernen will.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('spät aufstehen', Math.floor(CONTENT * 0.38)), dCell('…, weil ich spät aufgestanden bin.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] }),
        new TableRow({ children: [dCell('Zeit haben', Math.floor(CONTENT * 0.38)), dCell('…, weil wir Zeit haben.', Math.floor(CONTENT * 0.44)), dCell('___________', Math.floor(CONTENT * 0.18))] })
      ]
    }),
    empty(), empty(),
    h2('Grammatik: Wortstellung mit weil'),
    ruleBox([
      'Hauptsatz:  Subjekt  +  Verb (Pos. 2)  +  …',
      'Nebensatz:  weil  +  Subjekt  +  …  +  Verb (am Ende)',
      '',
      'Beispiel:',
      'Ich gehe schlafen,   weil   ich müde   bin.',
      '     HS                        NS → Verb am Ende',
      '',
      'Mit Perfekt:',
      'Ich freue mich,   weil   ich gewonnen   habe.',
      '',
      'Mit Modalverb:',
      'Ich lerne,   weil   ich gut schreiben   will.'
    ]),
    empty(), empty(),
    pItalic('Lernkarten-Tipp: Schreibe auf eine Karte: „Warum …?“ und auf die Rückseite: „…, weil … [Verb].“')
  ], TOPIC + '_Wortliste.docx');

  // WORTLISTE LOESUNG
  await save([
    h1('LÖSUNG — Wortliste Nebensätze mit weil'),
    empty(),
    h2('Konjunktionen — Übersetzungen (Beispiel Englisch)'),
    p('weil = because (Nebensatz, Verb am Ende)'),
    p('denn = because / for (Hauptsatz, normale Wortstellung)'),
    p('deshalb = therefore / that’s why'),
    p('darum = therefore / that’s why'),
    empty(),
    h2('Wichtiger Unterschied: weil vs. denn'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('weil (Nebensatz)', Math.floor(CONTENT * 0.5)), hCell('denn (Hauptsatz)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Ich lerne, weil der Test morgen ist.', Math.floor(CONTENT * 0.5)), dCell('Ich lerne, denn der Test ist morgen.', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('→ Verb am Ende (ist)', Math.floor(CONTENT * 0.5)), dCell('→ Verb an Pos. 2 (ist)', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Wortstellung geändert!', Math.floor(CONTENT * 0.5), { bold: true, color: 'CC0000' }), dCell('Wortstellung normal.', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    empty(),
    pItalic('Individuelle Übersetzungen akzeptieren — Hauptsprache des Kindes berücksichtigen.')
  ], TOPIC + '_Wortliste_LOESUNG.docx');

  // ============================================================
  // KONVERSATION
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Konversation'),
    h2('Dialog 1 — Warum kommst du zu spät?'),
    p('Übt den Dialog zu zweit. Dann tauscht die Rollen!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A: Lehrer/in', Math.floor(CONTENT * 0.5)), hCell('Person B: Schüler/in', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Warum kommst du zu spät?', Math.floor(CONTENT * 0.5)), dCell('Ich komme zu spät, weil …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Das ist schade. Warum hast du die Hausaufgaben nicht gemacht?', Math.floor(CONTENT * 0.5)), dCell('Ich habe sie nicht gemacht, weil …', Math.floor(CONTENT * 0.5))] }),
        new TableRow({ children: [dCell('Verstehst du den Stoff nicht?', Math.floor(CONTENT * 0.5)), dCell('Doch, ich verstehe ihn, weil …', Math.floor(CONTENT * 0.5))] })
      ]
    }),
    pItalic('Ideen: der Bus hatte Verspätung / ich verschlafen habe / ich keine Zeit hatte / du gut erklärst'),
    empty(), empty(),
    h2('Dialog 2 — Meinungen begründen'),
    p('Fülle die Lücken aus und übt den Dialog.'),
    empty(),
    p('A:  Was ist dein Lieblingsschulfach?'),
    p('B:  Mein Lieblingsschulfach ist ________, weil ________________________________.'),
    empty(),
    p('A:  Was magst du gar nicht?'),
    p('B:  Ich mag ________ nicht, weil ________________________________.'),
    empty(),
    p('A:  Warum lernst du Deutsch?'),
    p('B:  Ich lerne Deutsch, weil ________________________________.'),
    empty(),
    p('A:  Was machst du am liebsten in der Freizeit?'),
    p('B:  Ich ________ am liebsten, weil ________________________________.'),
    empty(), empty(),
    h2('Partnerinterview — Warum?'),
    p('Stellt euch gegenseitig die Fragen. Schreibt die Antworten auf!'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', Math.floor(CONTENT * 0.4)), hCell('Antwort meines Partners / meiner Partnerin', Math.floor(CONTENT * 0.6))] }),
        new TableRow({ children: [dCell('Warum lernst du Deutsch?', Math.floor(CONTENT * 0.4)), dCell('', Math.floor(CONTENT * 0.6))] }),
        new TableRow({ children: [dCell('Warum bist du heute hier?', Math.floor(CONTENT * 0.4)), dCell('', Math.floor(CONTENT * 0.6))] }),
        new TableRow({ children: [dCell('Was magst du sehr? Warum?', Math.floor(CONTENT * 0.4)), dCell('', Math.floor(CONTENT * 0.6))] }),
        new TableRow({ children: [dCell('Was magst du nicht? Warum?', Math.floor(CONTENT * 0.4)), dCell('', Math.floor(CONTENT * 0.6))] }),
        new TableRow({ children: [dCell('Warum bist du heute gut / nicht gut drauf?', Math.floor(CONTENT * 0.4)), dCell('', Math.floor(CONTENT * 0.6))] })
      ]
    }),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Gruppenspiel — weil-Kette'),
    p('Alle sitzen im Kreis. Person 1 sagt einen Satz. Person 2 ergänzt mit weil. Person 3 macht weiter!'),
    empty(),
    pBold('Beispiel:'),
    p('Person 1:  Ich esse gern Pizza.'),
    p('Person 2:  Du isst gern Pizza, weil sie so lecker schmeckt.'),
    p('Person 3:  Sie schmeckt lecker, weil der Teig so dünn ist.'),
    p('Person 4:  Der Teig ist dünn, weil der Koch so gut ist.'),
    p('           usw. …'),
    empty(),
    p('Wer nicht weiter weiß oder einen Fehler macht, scheidet aus. Wer zuletzt übrig bleibt, gewinnt!')
  ], TOPIC + '_Konversation.docx');

  // KONVERSATION LOESUNG
  await save([
    h1('LÖSUNG — Konversation Nebensätze mit weil'),
    empty(),
    h2('Dialog 1 — Bewertungskriterien'),
    bullet('Verwendet weil korrekt (nicht mit denn verwechselt)'),
    bullet('Verb steht am Ende des weil-Satzes'),
    bullet('Sinnvolle Begründung (inhaltlich passend)'),
    bullet('Flüssige Aussprache und natürlicher Tonfall'),
    empty(),
    h2('Dialog 2 — Beispielantworten'),
    p('Mein Lieblingsschulfach ist Kunst, weil ich gern male.'),
    p('Ich mag Mathematik nicht, weil die Aufgaben schwer sind.'),
    p('Ich lerne Deutsch, weil ich in Deutschland leben möchte.'),
    p('Ich spiele am liebsten Fußball, weil das Spaß macht.'),
    empty(),
    h2('Partnerinterview — Bewertung'),
    pItalic('Individuelle Antworten. Auf korrekte weil-Struktur achten:'),
    bullet('Komma vor weil'),
    bullet('Verb am Ende des weil-Satzes'),
    bullet('Grammatisch korrekte Verbform (Präsens / Perfekt)'),
    empty(),
    h2('Gruppenspiel — Hinweise für Lehrperson'),
    p('Bei Fehler freundlich korrigieren: „Das Verb muss ans Ende!“ Dann darf die Person nochmal versuchen, bevor sie ausscheidet.')
  ], TOPIC + '_Konversation_LOESUNG.docx');

  // ============================================================
  // BILDAUFGABEN
  // ============================================================
  await save([
    studentHead(), empty(),
    h1('Nebensätze mit weil — Bildaufgaben'),
    h2('Aufgabe 1 — Was siehst du? Schreibe einen weil-Satz!'),
    empty(),
    p('[BILD 1: Ein Kind sitzt am Tisch mit Büchern und lernt. Es schaut konzentriert auf ein Heft.]'),
    p('Das Kind lernt, weil _____________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 2: Ein Kind liegt im Bett und schläft. Die Augen sind geschlossen, es ist dunkel draußen.]'),
    p('Das Kind schläft, weil _____________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 3: Ein Kind lacht und hält ein Eis in der Hand. Die Sonne scheint.]'),
    p('Das Kind lacht, weil _____________________________________________.'),
    writeLine(), empty(), empty(),
    p('[BILD 4: Ein Kind sitzt allein auf einer Bank. Es schaut traurig.]'),
    p('Das Kind ist traurig, weil _____________________________________________.'),
    writeLine(), empty(), empty(),
    h2('Aufgabe 2 — Bildgeschichte: Warum?'),
    p('[BILD: Eine Bildgeschichte in 4 Feldern: 1. Ben wacht auf und schaut auf die Uhr (8:45). 2. Ben rennt zur Schule. 3. Ben kommt in die Klasse — alle schauen ihn an. 4. Ben sitzt erleichtert und erklärt der Lehrerin etwas.]'),
    empty(),
    p('Schreibe zu jedem Bild einen Satz mit weil:'),
    empty(),
    p('Bild 1: Ben erschrickt, weil _____________________________________________.'),
    writeLine(), empty(),
    p('Bild 2: Ben rennt, weil _____________________________________________.'),
    writeLine(), empty(),
    p('Bild 3: Alle schauen Ben an, weil _____________________________________________.'),
    writeLine(), empty(),
    p('Bild 4: Ben ist erleichtert, weil _____________________________________________.'),
    writeLine(),
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 3 — Warum-Diagramm'),
    p('[BILD: Ein Mind-Map mit „Ich lerne Deutsch“ in der Mitte. Vier Pfeile zeigen nach außen — Felder zum Ausfüllen.]'),
    empty(),
    p('Fülle das Diagramm aus: Schreibe 4 Gründe, warum du Deutsch lernst.'),
    p('Schreibe danach 4 vollständige weil-Sätze:'),
    empty(),
    p('1.  Ich lerne Deutsch, weil _____________________________________________.'),
    writeLine(), empty(),
    p('2.  Ich lerne Deutsch, weil _____________________________________________.'),
    writeLine(), empty(),
    p('3.  Ich lerne Deutsch, weil _____________________________________________.'),
    writeLine(), empty(),
    p('4.  Ich lerne Deutsch, weil _____________________________________________.'),
    writeLine(), empty(), empty(),
    h2('Aufgabe 4 — Zeichnen und schreiben'),
    p('[BILD-PLATZHALTER: Großes leeres Rechteck für eine eigene Zeichnung.]'),
    empty(),
    p('Zeichne eine Person und eine Situation. Schreibe 3 Sätze mit weil dazu.'),
    empty(),
    p('Auf dem Bild ist _________________________________________________________________.'),
    empty(),
    p('… , weil _____________________________________________.'),
    writeLine(), empty(),
    p('… , weil _____________________________________________.'),
    writeLine(), empty(),
    p('… , weil _____________________________________________.'),
    writeLine()
  ], TOPIC + '_Bildaufgaben.docx');

  // BILDAUFGABEN LOESUNG
  await save([
    h1('LÖSUNG — Bildaufgaben Nebensätze mit weil'),
    empty(),
    h2('Aufgabe 1 — Beispielantworten'),
    p('1.  Das Kind lernt, weil es morgen einen Test hat.'),
    p('2.  Das Kind schläft, weil es müde ist. / weil es spät ist.'),
    p('3.  Das Kind lacht, weil das Eis so lecker ist. / weil die Sonne scheint.'),
    p('4.  Das Kind ist traurig, weil es allein ist. / weil es seinen Freund vermisst.'),
    pItalic('Antworten hängen von den eingefügten Bildern ab. Inhaltlich passende Antworten akzeptieren.'),
    empty(),
    h2('Aufgabe 2 — Beispielantworten Bildgeschichte'),
    p('1.  Ben erschrickt, weil er verschlafen hat.'),
    p('2.  Ben rennt, weil er zu spät ist.'),
    p('3.  Alle schauen Ben an, weil er zu spät kommt.'),
    p('4.  Ben ist erleichtert, weil die Lehrerin nicht böse ist.'),
    empty(),
    h2('Aufgabe 3 — Warum-Diagramm'),
    pItalic('Individuelle Antworten. Auf korrekte weil-Struktur achten.'),
    p('Typische Gründe:'),
    bullet('… weil ich in Deutschland wohnen möchte.'),
    bullet('… weil meine Familie Deutsch spricht.'),
    bullet('… weil Deutsch in der Schule wichtig ist.'),
    bullet('… weil ich deutsche Bücher lesen will.'),
    bullet('… weil ich deutsche Freunde habe.'),
    empty(),
    h2('Aufgabe 4 — Zeichnen'),
    pItalic('Antworten hängen von der Zeichnung des Kindes ab. Kriterien:'),
    bullet('Verb steht am Ende des weil-Satzes'),
    bullet('Komma vor weil'),
    bullet('Inhaltlich zur Zeichnung passend')
  ], TOPIC + '_Bildaufgaben_LOESUNG.docx');

  console.log('\nFertig! 12 Dateien erstellt.');
})();
