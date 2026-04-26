'use strict';
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, PageNumber,
  NumberFormat, LevelFormat, convertInchesToTwip, Header, Footer,
  PageBreak, UnderlineType
} = require('docx');
const fs = require('fs');

// ── Konstanten ────────────────────────────────────────────────────────────────
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;
const CONTENT = PAGE_W - 2 * MARGIN;

const TOPIC_LABEL  = 'A2 Kinder — Medien — Lieblingsfilm/‑serie';
const TOPIC        = 'A2_Kinder_Medien_02_LieblingsfilmSerie';
const OUTPUT_DIR   = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '09_Medien', '02_LieblingsfilmSerie'
);

// ── Nummerierungs-Config ──────────────────────────────────────────────────────
const NUMBERING = {
  config: [{
    reference: 'bullet-list',
    levels: [{
      level: 0,
      format: LevelFormat.BULLET,
      text: '•',
      alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 720, hanging: 360 } },
        run: { font: 'Symbol' }
      }
    }]
  }]
};

// ── Hilfs-Funktionen ──────────────────────────────────────────────────────────
const h1 = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 36, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 240, after: 120 }
});
const h2 = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 28, color: '1F4E79', font: 'Arial' })],
  spacing: { before: 200, after: 80 }
});
const p = txt => new Paragraph({
  children: [new TextRun({ text: txt, size: 24, font: 'Arial' })],
  spacing: { before: 80, after: 80 }
});
const pBold = txt => new Paragraph({
  children: [new TextRun({ text: txt, bold: true, size: 24, font: 'Arial' })],
  spacing: { before: 80, after: 80 }
});
const pItalic = (txt, color) => new Paragraph({
  children: [new TextRun({ text: txt, italics: true, size: 22, color: color || '888888', font: 'Arial' })],
  spacing: { before: 60, after: 60 }
});
const empty = () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } });
const bullet = txt => new Paragraph({
  children: [new TextRun({ text: txt, size: 24, font: 'Arial' })],
  numbering: { reference: 'bullet-list', level: 0 },
  spacing: { before: 60, after: 60 }
});
const writeLine = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun('')]
});
const writeLines = n => Array.from({ length: n }, writeLine);

const hCell = (txt, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' },
  children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, size: 22, font: 'Arial' })] })]
});
const dCell = (txt, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' },
  children: [new Paragraph({ children: [new TextRun({ text: txt, size: 22, font: 'Arial' })] })]
});

const studentHead = () => new Table({
  width: { size: CONTENT, type: WidthType.DXA },
  rows: [new TableRow({ children: [
    hCell('Name:', CONTENT / 2),
    hCell('Datum:', CONTENT / 2)
  ]})]
});

const makeHeader = () => new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [new TextRun({ text: TOPIC_LABEL, italics: true, color: '888888', size: 18, font: 'Arial' })]
  })]
});

const makeFooter = () => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })
    ]
  })]
});

const save = async (children, filename) => {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
        }
      },
      headers: { default: makeHeader() },
      footers: { default: makeFooter() },
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  const fp = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(fp, buf);
  console.log('OK ', filename);
};

// ── Hauptprogramm ─────────────────────────────────────────────────────────────
(async () => {
  console.log('Erstelle Unterpunkt: Lieblingsfilm/-serie nennen');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. SCHREIBEN ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Schreibübung — Mein Lieblingsfilm / Meine Lieblingsserie'),

    h2('Aufgabe 1: Was ist das? Verbinde!'),
    pItalic('Verbinde den Filmtyp mit der richtigen Beschreibung.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Filmtyp', CONTENT / 2), hCell('Beschreibung', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Abenteuerfilm', CONTENT / 2), dCell('Ich lache sehr viel.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Zeichentrickfilm', CONTENT / 2), dCell('Es ist sehr spannend und aufregend.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Komödie', CONTENT / 2), dCell('Die Figuren sind gezeichnet.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Tierfilm', CONTENT / 2), dCell('Es gibt Detektive und Rätsel.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Krimi', CONTENT / 2), dCell('Ich lerne etwas über Tiere.', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Wähle ein Adjektiv und schreibe einen Satz.'),
    pItalic('Adjektive: spannend — lustig — traurig — gruselig — langweilig — toll — interessant'),
    empty(),
    pBold('Beispiel: Ich finde Abenteuerfilme spannend.'),
    empty(),
    p('1. Ich finde __________________ ______________.'),
    writeLine(),
    p('2. Mein Lieblingsfilm ist __________________.  Ich finde ihn ______________.'),
    writeLine(),
    p('3. Ich sehe nicht gern __________________, weil sie ______________ sind.'),
    writeLine(),
    p('4. Meine Lieblingsserie heißt __________________. Sie ist sehr ______________.'),
    writeLine(),
    empty(),

    h2('Aufgabe 3: Schreibe über deinen Lieblingsfilm oder deine Lieblingsserie.'),
    pItalic('Schreibe 4–5 Sätze. Benutze: Mein Lieblingsfilm / Meine Lieblingsserie heißt ... | Ich finde ihn/sie ... | Die Geschichte handelt von ... | Ich empfehle ...'),
    ...writeLines(6),
  ], `${TOPIC}_Schreiben.docx`);

  // ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Schreibübung'),
    h2('Aufgabe 1: Verbinde'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Filmtyp', CONTENT / 2), hCell('Beschreibung', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Abenteuerfilm', CONTENT / 2), dCell('Es ist sehr spannend und aufregend.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Zeichentrickfilm', CONTENT / 2), dCell('Die Figuren sind gezeichnet.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Komödie', CONTENT / 2), dCell('Ich lache sehr viel.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Tierfilm', CONTENT / 2), dCell('Ich lerne etwas über Tiere.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Krimi', CONTENT / 2), dCell('Es gibt Detektive und Rätsel.', CONTENT / 2)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Beispielsätze'),
    bullet('Ich finde Krimis spannend.'),
    bullet('Mein Lieblingsfilm ist „Der König der Löwen". Ich finde ihn toll.'),
    bullet('Ich sehe nicht gern Horrorfilme, weil sie gruselig sind.'),
    bullet('Meine Lieblingsserie heißt „Wickie". Sie ist sehr lustig.'),
    pItalic('Individuelle Antworten akzeptieren. Adjektiv muss grammatisch korrekt stehen.'),
    empty(),
    h2('Aufgabe 3: Individuelle Antworten'),
    pItalic('Individuelle Antworten akzeptieren. Korrekte Verwendung von Mein/Meine + Adjektiv + weil-Satz prüfen.'),
  ], `${TOPIC}_Schreiben_LOESUNG.docx`);

  // ── 2. LESEN ──────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Leseübung — Kinoabend mit der Familie'),

    h2('Text: Kinoabend mit der Familie'),
    pItalic('Lies den Text genau.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Kinoabend mit der Familie', bold: true, size: 28, font: 'Arial', color: '1F4E79' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Letzten Freitag war Kinoabend bei der Familie Müller. Lena (11 Jahre) durfte einen Film aussuchen. Sie wollte einen Abenteuerfilm sehen, weil Abenteuerfilme spannend sind. Ihr Bruder Jonas (9 Jahre) wollte lieber einen Zeichentrickfilm sehen, weil er die bunten Figuren lustig findet.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Am Ende haben sie „Drachenreiter" geschaut — einen Abenteuerfilm mit Zeichentrick-Figuren! In dem Film reitet ein Junge auf einem Drachen und erlebt viele Abenteuer. Die Geschichte handelt von Freundschaft und Mut.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Lena fand den Film wunderschön und ein bisschen traurig. Jonas lachte die ganze Zeit, weil der Drache sehr lustig war. Papa hat geschlafen, aber Mama hat auch gelacht. Nach dem Film haben die Kinder diskutiert: Lena findet Abenteuerfilme am besten, Jonas mag lieber Komödien.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Am nächsten Tag hat Lena ihrer Freundin Sophie den Film empfohlen. „Du musst „Drachenreiter" sehen!", hat sie gesagt. „Er ist wirklich toll!"', size: 26, font: 'Arial' })], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    h2('Aufgabe 1: Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Lena ist 9 Jahre alt.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Jonas wollte einen Zeichentrickfilm sehen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Sie haben einen Horrorfilm geschaut.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Drache in dem Film war lustig.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Papa hat gelacht.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Lena hat den Film ihrer Freundin empfohlen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 2: Beantworte die Fragen.'),
    p('1. Welchen Film haben Lena und Jonas geschaut?'),
    writeLine(), writeLine(),
    p('2. Warum wollte Lena einen Abenteuerfilm sehen?'),
    writeLine(), writeLine(),
    p('3. Wie hat Lena den Film gefunden?'),
    writeLine(), writeLine(),
    p('4. Was hat Lena am nächsten Tag gemacht?'),
    writeLine(), writeLine(),
    empty(),

    h2('Aufgabe 3: Suche im Text!'),
    p('Schreibe zwei Adjektive aus dem Text, die Filme beschreiben:'),
    p('1. ______________________    2. ______________________'),
    empty(),
    p('Schreibe den weil-Satz von Lena aus dem Text:'),
    writeLine(), writeLine(),
  ], `${TOPIC}_Lesen.docx`);

  // ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Leseübung'),
    h2('Aufgabe 1: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Lena ist 9 Jahre alt.', CONTENT * 4/5), dCell('F (11 Jahre)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Jonas wollte einen Zeichentrickfilm sehen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Sie haben einen Horrorfilm geschaut.', CONTENT * 4/5), dCell('F (Abenteuerfilm)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Der Drache in dem Film war lustig.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Papa hat gelacht.', CONTENT * 4/5), dCell('F (Papa hat geschlafen)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Lena hat den Film ihrer Freundin empfohlen.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
      ]
    }),
    empty(),
    h2('Aufgabe 2: Fragen'),
    bullet('„Drachenreiter" — ein Abenteuerfilm mit Zeichentrick-Figuren.'),
    bullet('Weil Abenteuerfilme spannend sind.'),
    bullet('Wunderschön und ein bisschen traurig.'),
    bullet('Sie hat ihrer Freundin Sophie den Film empfohlen.'),
    empty(),
    h2('Aufgabe 3: Suche im Text'),
    pBold('Adjektive (Beispiele): spannend, lustig, bunt, traurig, toll, wunderschön'),
    pBold('weil-Satz: „... weil Abenteuerfilme spannend sind."'),
  ], `${TOPIC}_Lesen_LOESUNG.docx`);

  // ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Lückentext — Lieblingsfilm und Serien'),

    h2('Aufgabe 1: Setze das richtige Wort ein.'),
    pItalic('Wörterkasten: Folge • empfehlen • Komödie • handelt • spannend • Serie • Staffel • ansehen • weil • Schauspieler'),
    empty(),
    p('1. Meine Lieblings______________ heißt „Die Wilden Kerle".'),
    p('2. Heute Abend möchte ich eine neue ______________  von meiner Serie ______________.'),
    p('3. Der Film ______________ von einem Jungen, der ein Drachen rettet.'),
    p('4. Ich finde Krimis sehr ______________, ______________ sie Rätsel haben.'),
    p('5. In der neuen ______________ gibt es schon 10 Episoden.'),
    p('6. Der berühmte ______________ in dem Film heißt Tom Hanks.'),
    p('7. Das ist eine ______________ — ich lache die ganze Zeit!'),
    p('8. Du musst diesen Film unbedingt sehen! Ich kann ihn dir sehr ______________.'),
    empty(),

    h2('Aufgabe 2: Dialog — Was schauen wir heute?'),
    pItalic('Ergänze den Dialog mit den Wörtern im Kasten.'),
    pItalic('Wörterkasten: empfehle • Lieblingsfilm • handelt • finde • weil • Zeichentrickfilm • langweilig'),
    empty(),
    p('Mia:    Was ist dein ______________________?'),
    p('Tim:    Ich liebe „Nemo"! Das ist ein ______________________.'),
    p('Mia:    Was ______________________ der Film?'),
    p('Tim:    Er ______________________ von einem kleinen Fisch, der seinen Vater sucht.'),
    p('Mia:    Klingt toll! Ich ______________________ Tierfilme super, ______________________'),
    p('        die Tiere so süß sind.'),
    p('Tim:    Ich ______________________ dir den Film sehr!'),
    p('Mia:    Danke! Ich schaue ihn heute Abend.'),
    empty(),

    h2('Aufgabe 3: Schreibe deinen eigenen Satz mit „weil".'),
    pItalic('Erzähle, warum du einen Filmtyp magst oder nicht magst.'),
    p('Ich mag __________________ (gern / nicht gern), weil __________________'),
    writeLine(), writeLine(),
  ], `${TOPIC}_Luecken.docx`);

  // ── 3L. LÜCKEN LÖSUNG ────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Lückentext'),
    h2('Aufgabe 1'),
    bullet('1. Serie'),
    bullet('2. Folge / ansehen'),
    bullet('3. handelt'),
    bullet('4. spannend / weil'),
    bullet('5. Staffel'),
    bullet('6. Schauspieler'),
    bullet('7. Komödie'),
    bullet('8. empfehlen'),
    empty(),
    h2('Aufgabe 2: Dialog'),
    bullet('Lieblingsfilm'),
    bullet('Zeichentrickfilm'),
    bullet('handelt'),
    bullet('handelt'),
    bullet('finde / weil'),
    bullet('empfehle'),
    empty(),
    h2('Aufgabe 3'),
    pItalic('Individuelle Antworten akzeptieren. Weil-Satz prüfen: Verb steht am Ende.'),
    pBold('Beispiel: Ich mag Komödien gern, weil sie sehr lustig sind.'),
  ], `${TOPIC}_Luecken_LOESUNG.docx`);

  // ── 4. WORTLISTE ─────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Wortliste — Lieblingsfilm und Serien'),
    pItalic('Lerne diese Wörter. Schreibe deine Übersetzung in die letzte Spalte.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          hCell('Wort / Phrase', CONTENT * 28/100),
          hCell('Artikel / Typ', CONTENT * 18/100),
          hCell('Beispielsatz', CONTENT * 36/100),
          hCell('Übersetzung', CONTENT * 18/100),
        ]}),
        new TableRow({ children: [dCell('der Film', CONTENT * 28/100), dCell('m.', CONTENT * 18/100), dCell('Ich sehe gern Filme.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('die Serie', CONTENT * 28/100), dCell('f.', CONTENT * 18/100), dCell('Meine Lieblingsserie ist toll.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('die Folge', CONTENT * 28/100), dCell('f.', CONTENT * 18/100), dCell('Ich sehe heute eine neue Folge.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('die Staffel', CONTENT * 28/100), dCell('f.', CONTENT * 18/100), dCell('Die dritte Staffel beginnt heute.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('der Zeichentrickfilm', CONTENT * 28/100), dCell('m.', CONTENT * 18/100), dCell('„Nemo" ist ein Zeichentrickfilm.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('der Abenteuerfilm', CONTENT * 28/100), dCell('m.', CONTENT * 18/100), dCell('Abenteuerfilme sind spannend.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('die Komödie', CONTENT * 28/100), dCell('f.', CONTENT * 18/100), dCell('Eine Komödie macht mich froh.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('handeln von + D.', CONTENT * 28/100), dCell('Verb', CONTENT * 18/100), dCell('Der Film handelt von einem Hund.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('empfehlen', CONTENT * 28/100), dCell('Verb', CONTENT * 18/100), dCell('Ich empfehle dir diesen Film.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('der Schauspieler / die Schauspielerin', CONTENT * 28/100), dCell('m./f.', CONTENT * 18/100), dCell('Der Schauspieler ist sehr gut.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('spannend / langweilig', CONTENT * 28/100), dCell('Adj.', CONTENT * 18/100), dCell('Der Krimi ist spannend.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('lustig / traurig', CONTENT * 28/100), dCell('Adj.', CONTENT * 18/100), dCell('Die Komödie ist lustig.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
        new TableRow({ children: [dCell('gruselig / toll', CONTENT * 28/100), dCell('Adj.', CONTENT * 18/100), dCell('Horrorfilme sind gruselig.', CONTENT * 36/100), dCell('', CONTENT * 18/100)] }),
      ]
    }),
    empty(),

    h2('Grammatik: Ich finde ... + Adjektiv'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Struktur', CONTENT / 2), hCell('Beispiel', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich finde + [Nomen] + [Adjektiv].', CONTENT / 2), dCell('Ich finde Krimis spannend.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Mein Lieblingsfilm ist + [Name].', CONTENT / 2), dCell('Mein Lieblingsfilm ist „Nemo".', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Der Film handelt von + Dativ.', CONTENT / 2), dCell('Er handelt von einem Jungen.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Ich empfehle dir + [Nomen].', CONTENT / 2), dCell('Ich empfehle dir diesen Film.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('... weil + [Subjekt] + [Verb am Ende].', CONTENT / 2), dCell('... weil er sehr spannend ist.', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Tipp: Schreibe die Wörter auf Lernkarten — Deutsch auf einer Seite, Übersetzung auf der anderen!'),
  ], `${TOPIC}_Wortliste.docx`);

  // ── 4L. WORTLISTE LÖSUNG ─────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Wortliste'),
    pItalic('Die Übersetzungen sind individuell. Hier stehen englische Beispiele als Orientierung.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Wort / Phrase', CONTENT / 2), hCell('Englisch (Beispiel)', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Film', CONTENT / 2), dCell('the film / movie', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Serie', CONTENT / 2), dCell('the series / TV show', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Folge', CONTENT / 2), dCell('the episode', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Staffel', CONTENT / 2), dCell('the season', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Zeichentrickfilm', CONTENT / 2), dCell('the animated film / cartoon', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Abenteuerfilm', CONTENT / 2), dCell('the adventure film', CONTENT / 2)] }),
        new TableRow({ children: [dCell('die Komödie', CONTENT / 2), dCell('the comedy', CONTENT / 2)] }),
        new TableRow({ children: [dCell('handeln von', CONTENT / 2), dCell('to be about', CONTENT / 2)] }),
        new TableRow({ children: [dCell('empfehlen', CONTENT / 2), dCell('to recommend', CONTENT / 2)] }),
        new TableRow({ children: [dCell('der Schauspieler / die Schauspielerin', CONTENT / 2), dCell('the actor / the actress', CONTENT / 2)] }),
        new TableRow({ children: [dCell('spannend / langweilig', CONTENT / 2), dCell('exciting / boring', CONTENT / 2)] }),
        new TableRow({ children: [dCell('lustig / traurig', CONTENT / 2), dCell('funny / sad', CONTENT / 2)] }),
        new TableRow({ children: [dCell('gruselig / toll', CONTENT / 2), dCell('scary / great', CONTENT / 2)] }),
      ]
    }),
  ], `${TOPIC}_Wortliste_LOESUNG.docx`);

  // ── 5. KONVERSATION ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Konversation — Lieblingsfilm und Serien'),

    h2('Dialog 1: Filmempfehlung'),
    pItalic('Übt zu zweit. Tauscht danach die Rollen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Person A', CONTENT / 2), hCell('Person B', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hast du einen guten Film gesehen?', CONTENT / 2), dCell('Ja! Ich habe ______ gesehen. Er ist wirklich toll!', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was für ein Film ist das?', CONTENT / 2), dCell('Das ist ein ______. Er handelt von ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie findest du den Film?', CONTENT / 2), dCell('Ich finde ihn sehr ______, weil ______.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Kannst du ihn mir empfehlen?', CONTENT / 2), dCell('Ja, ich empfehle ihn dir! Du musst ihn sehen.', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wann kann ich ihn sehen?', CONTENT / 2), dCell('Er ist auf ______ (Netflix / TV / Kino).', CONTENT / 2)] }),
      ]
    }),
    empty(),

    h2('Dialog 2: Welchen Film sehen wir?'),
    pItalic('Ergänzt den Dialog gemeinsam und übt ihn dann.'),
    empty(),
    p('A: Was sehen wir heute Abend?'),
    p('B: Ich möchte gern __________________ sehen, weil __________________.'),
    p('A: Hmm, ich finde __________________ ein bisschen __________________. Wie wäre es mit __________________?'),
    p('B: Was ist das für ein Film?'),
    p('A: Das ist ein __________________. Er handelt von __________________.'),
    p('B: Klingt gut! Ich bin gespannt.'),
    p('A: Super! Dann schauen wir __________________ zusammen.'),
    empty(),

    h2('Partnerinterview: Mein Lieblingsfilm / Meine Lieblingsserie'),
    pItalic('Frage deinen Partner / deine Partnerin. Schreibe die Antworten auf.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Frage', CONTENT / 2), hCell('Antwort', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was ist dein Lieblingsfilm?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Was für ein Film ist das?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wovon handelt der Film?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Wie findest du den Film?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Hast du eine Lieblingsserie?', CONTENT / 2), dCell('', CONTENT / 2)] }),
        new TableRow({ children: [dCell('Welchen Film empfiehlst du mir?', CONTENT / 2), dCell('', CONTENT / 2)] }),
      ]
    }),
    empty(),
    pItalic('Stellt euch gegenseitig vor: „Mein Partner / Meine Partnerin mag ______. Er/Sie findet ______."'),
  ], `${TOPIC}_Konversation.docx`);

  // ── 5L. KONVERSATION LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Konversation'),
    h2('Bewertungskriterien'),
    bullet('Korrekte Satzstruktur (Subjekt + Verb + Objekt)'),
    bullet('weil-Sätze: Verb steht am Ende'),
    bullet('Filmtypen korrekt verwendet (Artikel beachten: der/die)'),
    bullet('handeln von + Dativ: „von einem Jungen", „von einem Hund"'),
    bullet('Adjektive passend eingesetzt'),
    empty(),
    h2('Dialog 1 — Mögliche Antworten (Beispiel)'),
    bullet('Er ist wirklich toll!'),
    bullet('Das ist ein Abenteuerfilm. Er handelt von einem mutigen Jungen.'),
    bullet('Ich finde ihn sehr spannend, weil er viele Abenteuer hat.'),
    bullet('Ja, ich empfehle ihn dir!'),
    bullet('Er ist auf Netflix.'),
    empty(),
    pItalic('Individuelle Antworten akzeptieren. Kreativität belohnen.'),
    empty(),
    h2('Partnerinterview'),
    pItalic('Individuelle Antworten. Prüfe: Mein Lieblingsfilm IST (nicht: heißt ER), weil + Verb am Ende.'),
  ], `${TOPIC}_Konversation_LOESUNG.docx`);

  // ── 6. BILDAUFGABEN ──────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Bildaufgaben — Lieblingsfilm und Serien'),

    h2('Aufgabe 1: Filmplakate — Was ist das für ein Film?'),
    pItalic('Schau dir die Bilder an und beantworte die Fragen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 1: Filmplakat — ein Löwe mit Krone, bunte Farben, Zeichentrick-Stil]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Filmtyp: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Adjektiv: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 2: Filmplakat — Detektiv mit Lupe, dunkle Farben, geheimnisvoller Stil]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Filmtyp: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Adjektiv: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
          new TableCell({ width: { size: CONTENT / 3, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' }, children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 3: Filmplakat — zwei Kinder lachen, helle Farben, lustige Schrift]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 200, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Filmtyp: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: 'Adjektiv: ______________', size: 22, font: 'Arial' })], spacing: { before: 80, after: 200 } }),
          ]}),
        ]})
      ]
    }),
    empty(),

    h2('Aufgabe 2: Lieblingsfilme in der Klasse — Diagramm'),
    pItalic('Schau das Diagramm an und beantworte die Fragen.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [new TableCell({
          width: { size: CONTENT, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: 'F8F8F8' },
          children: [
            new Paragraph({ children: [new TextRun({ text: '[BILD 4: Balkendiagramm — Lieblingsfilmtypen der Klasse 5b]', italics: true, size: 20, color: '888888', font: 'Arial' })], spacing: { before: 100, after: 100 } }),
            new Paragraph({ children: [new TextRun({ text: 'Zeichentrickfilm: ████████████ 12 Schüler', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'Abenteuerfilm:   █████████ 9 Schüler', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'Komödie:         ███████ 7 Schüler', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'Tierfilm:        ████ 4 Schüler', size: 22, font: 'Arial' })], spacing: { before: 60, after: 60 } }),
            new Paragraph({ children: [new TextRun({ text: 'Krimi:           ██ 2 Schüler', size: 22, font: 'Arial' })], spacing: { before: 60, after: 100 } }),
          ]
        })]})
      ]
    }),
    empty(),
    p('1. Welcher Filmtyp ist am beliebtesten in der Klasse?'),
    writeLine(),
    p('2. Wie viele Schüler mögen Abenteuerfilme?'),
    writeLine(),
    p('3. Welcher Filmtyp ist am wenigsten beliebt?'),
    writeLine(),
    p('4. Wie viele Schüler sind in der Klasse 5b insgesamt?'),
    writeLine(),
    empty(),

    h2('Aufgabe 3: Filmrezension schreiben'),
    pItalic('[BILD 5: Vorlage einer Filmrezension mit Stern-Bewertung (1–5 Sterne)]'),
    pItalic('Fülle die Filmrezension für deinen Lieblingsfilm aus.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Meine Filmrezension', CONTENT)] }),
        new TableRow({ children: [new TableCell({ width: { size: CONTENT, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' }, children: [
          p('Filmtitel: _________________________________'),
          p('Filmtyp: _________________________________'),
          p('Der Film handelt von: _________________________________'),
          p('Ich finde den Film: _________________________________'),
          p('Weil: _________________________________'),
          p('Meine Bewertung: ☆ ☆ ☆ ☆ ☆   (Kreise ein!)'),
          p('Ich empfehle den Film: Ja ☐   Nein ☐'),
        ]})]})
      ]
    }),
    empty(),

    h2('Aufgabe 4: Erstelle dein eigenes Filmplakat!'),
    pItalic('[BILD 6: Leere Filmplakat-Vorlage (Rahmen mit Platz für Titel, Bild-Platzhalter, Bewertung)]'),
    pItalic('Male und schreibe:'),
    bullet('Titel des Films'),
    bullet('Zeichne eine Szene aus dem Film'),
    bullet('Schreibe 2 Adjektive dazu'),
    bullet('Zeichne Sterne (wie viele Sterne gibt du dem Film?)'),
  ], `${TOPIC}_Bildaufgaben.docx`);

  // ── 6L. BILDAUFGABEN LÖSUNG ──────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Bildaufgaben'),
    h2('Aufgabe 1: Filmplakate'),
    bullet('Bild 1: Zeichentrickfilm — lustig / toll / bunt'),
    bullet('Bild 2: Krimi — spannend / geheimnisvoll / dunkel'),
    bullet('Bild 3: Komödie — lustig / fröhlich / witzig'),
    pItalic('Andere passende Adjektive akzeptieren.'),
    empty(),
    h2('Aufgabe 2: Diagramm'),
    bullet('1. Zeichentrickfilm (12 Schüler)'),
    bullet('2. 9 Schüler'),
    bullet('3. Krimi (2 Schüler)'),
    bullet('4. 12 + 9 + 7 + 4 + 2 = 34 Schüler'),
    empty(),
    h2('Aufgabe 3 & 4'),
    pItalic('Individuelle Antworten akzeptieren. Auf korrekte Satzstruktur und Adjektive achten.'),
    pItalic('Aufgabe 4 (Filmplakat): Kreativität beurteilen — Titel, Szene, Adjektive und Sternebewertung prüfen.'),
  ], `${TOPIC}_Bildaufgaben_LOESUNG.docx`);

  console.log('\nFertig! 12 Dateien erstellt.');
})();
