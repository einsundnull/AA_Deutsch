'use strict';
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, PageNumber,
  LevelFormat, Header, Footer, PageBreak
} = require('docx');
const fs = require('fs');

// ── Konstanten ────────────────────────────────────────────────────────────────
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;
const CONTENT = PAGE_W - 2 * MARGIN;

const TOPIC_LABEL = 'A2 Kinder — Medien — ABSCHLUSS';
const TOPIC       = 'A2_Kinder_Medien_ABSCHLUSS';
const OUTPUT_DIR  = path.join(
  'C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch',
  'A2_Kinder', '09_Medien', 'ABSCHLUSS'
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
  console.log('Erstelle ABSCHLUSS: Medien (UP 01–02)');
  console.log('Zielordner:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
  await save([
    studentHead(), empty(),
    h1('Abschlussübung — Thema 09: Medien'),
    pItalic('Diese Aufgaben üben alles aus Thema 09: Geräte & Medien und Lieblingsfilm/-serie.'),
    empty(),

    // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
    h2('Aufgabe 1: Lesetext — Luca und seine Medienregeln'),
    pItalic('Lies den Text genau.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'EBF3FB' },
        children: [
          new Paragraph({ children: [new TextRun({ text: 'Luca und seine Medienregeln', bold: true, size: 28, font: 'Arial', color: '1F4E79' })], spacing: { before: 100, after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: 'Luca ist 11 Jahre alt und mag Medien sehr. Er hat ein Handy, ein Tablet und einen Computer. Am liebsten schaut er Serien auf dem Tablet — seine Lieblingsserie heißt „Dinoabenteuer". Das ist ein Abenteuerfilm-Serie mit Zeichentrick-Figuren. Luca findet sie super spannend, weil die Dinosaurier immer neue Abenteuer erleben.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Zu Hause gibt es aber klare Medienregeln: Luca darf das Tablet nur nach den Hausaufgaben benutzen. Er darf maximal zwei Stunden pro Tag fernsehen oder surfen. Nachts muss er das Handy ausschalten. Am Tisch darf er keine Apps herunterladen oder Nachrichten schreiben.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 80 } }),
          new Paragraph({ children: [new TextRun({ text: 'Manchmal ist Luca offline — dann spielt er draußen mit seinem Freund Ben. Ben hat keine Lieblingsserie, aber er schaut gern Tierfilme. Luca hat ihm die Serie „Dinoabenteuer" empfohlen: „Du musst sie sehen! Sie handelt von einem Mädchen, das Dinosaurier rettet. Ben findet das klingt toll und möchte die erste Folge ansehen.', size: 26, font: 'Arial' })], spacing: { before: 80, after: 100 } }),
        ]
      })]})],
    }),
    empty(),

    // ── Aufgabe 1a: R/F ───────────────────────────────────────────────────────
    pBold('a) Richtig (R) oder Falsch (F)?'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Luca hat ein Handy, ein Tablet und einen Computer.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('„Dinoabenteuer" ist ein Krimi.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Luca darf das Tablet auch vor den Hausaufgaben benutzen.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er muss das Handy nachts ausschalten.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ben schaut gern Tierfilme.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
        new TableRow({ children: [dCell('„Dinoabenteuer" handelt von einem Jungen, der Dinosaurier rettet.', CONTENT * 4/5), dCell('', CONTENT / 5)] }),
      ]
    }),
    empty(),

    // ── Aufgabe 1b: Fragen ────────────────────────────────────────────────────
    pBold('b) Beantworte die Fragen.'),
    p('1. Wie viele Stunden pro Tag darf Luca fernsehen oder surfen?'),
    writeLine(), writeLine(),
    p('2. Was macht Luca, wenn er offline ist?'),
    writeLine(), writeLine(),
    p('3. Warum findet Luca die Serie „Dinoabenteuer" spannend?'),
    writeLine(), writeLine(),
    empty(),

    // ── Aufgabe 2: Lückentext ─────────────────────────────────────────────────
    new Paragraph({ children: [new PageBreak()] }),
    h2('Aufgabe 2: Lückentext — Medien und Filme'),
    pItalic('Wörterkasten: hochladen • Zeichentrickfilm • empfehle • handelt • Akku • ausschalten • Folge • weil • Serie • herunterladen • offline • spannend'),
    empty(),
    p('1. Ich muss mein Handy laden — der ______________ ist leer.'),
    p('2. Kannst du bitte das Video ______________ ? (auf YouTube stellen)'),
    p('3. Die neue ______________ von „Superdetektiv" beginnt heute Abend.'),
    p('4. Ich möchte die App ______________. Darf ich das?'),
    p('5. Abends muss ich den Computer ______________.'),
    p('6. Heute bin ich ______________ — ich spiele draußen.'),
    p('7. Mein Lieblingsfilm ist ein ______________ mit bunten Figuren.'),
    p('8. Der Film ______________ von einer mutigen Detektivin.'),
    p('9. Ich finde Krimis sehr ______________, ______________ sie Rätsel haben.'),
    p('10. Ich ______________ dir diese Serie — sie ist wirklich toll!'),
    empty(),

    // ── Aufgabe 3: Trennbare Verben ───────────────────────────────────────────
    h2('Aufgabe 3: Trennbare Verben — Bilde Sätze.'),
    pItalic('Schreibe zu jedem Verb einen Satz im Präsens und einen im Perfekt.'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          hCell('Verb', CONTENT * 22/100),
          hCell('Präsens (ich)', CONTENT * 37/100),
          hCell('Perfekt (ich habe/bin ...)', CONTENT * 41/100),
        ]}),
        new TableRow({ children: [dCell('herunterladen', CONTENT * 22/100), dCell('Ich lade ... herunter.', CONTENT * 37/100), dCell('Ich habe ... heruntergeladen.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('anschauen', CONTENT * 22/100), dCell('', CONTENT * 37/100), dCell('', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('ausschalten', CONTENT * 22/100), dCell('', CONTENT * 37/100), dCell('', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('einschalten', CONTENT * 22/100), dCell('', CONTENT * 37/100), dCell('', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('hochladen', CONTENT * 22/100), dCell('', CONTENT * 37/100), dCell('', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('abspielen', CONTENT * 22/100), dCell('', CONTENT * 37/100), dCell('', CONTENT * 41/100)] }),
      ]
    }),
    empty(),

    // ── Aufgabe 4: Schreiben ──────────────────────────────────────────────────
    h2('Aufgabe 4: Mein Medienalltag und mein Lieblingsfilm'),
    pItalic('Schreibe 7–8 Sätze. Benutze Wörter aus beiden Unterpunkten.'),
    pItalic('Tipp: Schreibe über deine Geräte, deine Medienregeln UND deinen Lieblingsfilm oder deine Lieblingsserie.'),
    pItalic('Benutze: Ich habe ... | Ich darf ... | Ich darf nicht ... | Mein Lieblingsfilm heißt ... | Er/Sie handelt von ... | Ich finde ... weil ...'),
    ...writeLines(9),
    empty(),

    // ── Aufgabe 5: Konversation ───────────────────────────────────────────────
    h2('Aufgabe 5: Dialog — Medien und Filmempfehlung'),
    pItalic('Ergänze den Dialog und übt ihn zu zweit. Dann tauscht die Rollen.'),
    empty(),
    p('A: Was machst du heute Nachmittag?'),
    p('B: Ich schaue eine neue Folge von __________________.'),
    p('A: Was ist das für eine Serie?'),
    p('B: Das ist ein __________________. Sie handelt von __________________.'),
    p('A: Wie findest du sie?'),
    p('B: Ich finde sie sehr __________________, weil __________________.'),
    p('A: Darf du so lange fernsehen?'),
    p('B: Ja, aber nur nach den Hausaufgaben. Wir haben Medienregeln:'),
    p('   Man darf __________________. Man darf nicht __________________.'),
    p('A: Kannst du mir die Serie empfehlen?'),
    p('B: Ja! Ich __________________ dir diese Serie. Du musst sie sehen!'),
    empty(),

    // ── Aufgabe 6: Selbstevaluation ───────────────────────────────────────────
    h2('Aufgabe 6: Selbstevaluation — Was kann ich?'),
    pItalic('Kreuze an: ☑ Das kann ich gut    ☐ Das übe ich noch'),
    empty(),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Lernziel', CONTENT * 3/4), hCell('☑ / ☐', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann Mediengeräte auf Deutsch benennen (Handy, Tablet, Computer, Fernseher).', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann trennbare Verben (herunterladen, ausschalten ...) im Präsens und Perfekt bilden.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann Medienregeln mit Man darf / Man darf nicht formulieren.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann Filmtypen benennen und mit Adjektiven beschreiben.', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann einen Film beschreiben: Er handelt von ... / Ich finde ihn ...', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
        new TableRow({ children: [dCell('Ich kann weil-Sätze korrekt bilden (Verb am Ende).', CONTENT * 3/4), dCell('', CONTENT / 4)] }),
      ]
    }),
  ], `${TOPIC}.docx`);

  // ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
  await save([
    h1('LÖSUNG — Abschlussübung Thema 09: Medien'),

    h2('Aufgabe 1a: Richtig / Falsch'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Aussage', CONTENT * 4/5), hCell('R / F', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Luca hat ein Handy, ein Tablet und einen Computer.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('„Dinoabenteuer" ist ein Krimi.', CONTENT * 4/5), dCell('F (Abenteuerfilm-Serie / Zeichentrick)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Luca darf das Tablet auch vor den Hausaufgaben benutzen.', CONTENT * 4/5), dCell('F (nur nach den Hausaufgaben)', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Er muss das Handy nachts ausschalten.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('Ben schaut gern Tierfilme.', CONTENT * 4/5), dCell('R', CONTENT / 5)] }),
        new TableRow({ children: [dCell('„Dinoabenteuer" handelt von einem Jungen, der Dinosaurier rettet.', CONTENT * 4/5), dCell('F (einem Mädchen)', CONTENT / 5)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 1b: Fragen'),
    bullet('1. Maximal zwei Stunden pro Tag.'),
    bullet('2. Er spielt draußen mit seinem Freund Ben.'),
    bullet('3. Weil die Dinosaurier immer neue Abenteuer erleben.'),
    empty(),

    h2('Aufgabe 2: Lückentext'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell('Nr.', CONTENT / 8), hCell('Lösung', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('1', CONTENT / 8), dCell('Akku', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('2', CONTENT / 8), dCell('hochladen', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('3', CONTENT / 8), dCell('Folge', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('4', CONTENT / 8), dCell('herunterladen', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('5', CONTENT / 8), dCell('ausschalten', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('6', CONTENT / 8), dCell('offline', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('7', CONTENT / 8), dCell('Zeichentrickfilm', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('8', CONTENT / 8), dCell('handelt', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('9', CONTENT / 8), dCell('spannend / weil', CONTENT * 7/8)] }),
        new TableRow({ children: [dCell('10', CONTENT / 8), dCell('empfehle', CONTENT * 7/8)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 3: Trennbare Verben'),
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [
          hCell('Verb', CONTENT * 22/100),
          hCell('Präsens (ich)', CONTENT * 37/100),
          hCell('Perfekt (ich habe ...)', CONTENT * 41/100),
        ]}),
        new TableRow({ children: [dCell('herunterladen', CONTENT * 22/100), dCell('Ich lade ... herunter.', CONTENT * 37/100), dCell('Ich habe ... heruntergeladen.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('anschauen', CONTENT * 22/100), dCell('Ich schaue ... an.', CONTENT * 37/100), dCell('Ich habe ... angeschaut.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('ausschalten', CONTENT * 22/100), dCell('Ich schalte ... aus.', CONTENT * 37/100), dCell('Ich habe ... ausgeschaltet.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('einschalten', CONTENT * 22/100), dCell('Ich schalte ... ein.', CONTENT * 37/100), dCell('Ich habe ... eingeschaltet.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('hochladen', CONTENT * 22/100), dCell('Ich lade ... hoch.', CONTENT * 37/100), dCell('Ich habe ... hochgeladen.', CONTENT * 41/100)] }),
        new TableRow({ children: [dCell('abspielen', CONTENT * 22/100), dCell('Ich spiele ... ab.', CONTENT * 37/100), dCell('Ich habe ... abgespielt.', CONTENT * 41/100)] }),
      ]
    }),
    empty(),

    h2('Aufgabe 4: Schreiben'),
    pItalic('Individuelle Antworten akzeptieren. Prüfen:'),
    bullet('Geräte korrekt mit Artikel genannt (das Handy, das Tablet, der Computer, der Fernseher)'),
    bullet('Medienregel: Man darf / Man darf nicht + Infinitiv'),
    bullet('Filmtyp mit Artikel (der Abenteuerfilm, die Komödie, der Zeichentrickfilm ...)'),
    bullet('handelt von + Dativ'),
    bullet('weil-Satz: Verb am Ende'),
    bullet('Mein Lieblingsfilm / Meine Lieblingsserie heißt ... (Groß- und Kleinschreibung!)'),
    empty(),

    h2('Aufgabe 5: Dialog — Mögliche Lösungen (Beispiel)'),
    bullet('„Dinoabenteuer" / eine Zeichentrick-Abenteuerserie'),
    bullet('einem Mädchen, das Dinosaurier rettet'),
    bullet('spannend / weil die Dinosaurier toll sind'),
    bullet('Man darf 2 Stunden fernsehen. / Man darf nicht am Tisch surfen.'),
    bullet('empfehle'),
    pItalic('Andere sinnvolle Antworten akzeptieren. Kreativität belohnen.'),
    empty(),

    h2('Aufgabe 6: Selbstevaluation'),
    pItalic('Individuelle Selbsteinschätzung — keine Musterlösung. Im Gespräch prüfen.'),
  ], `${TOPIC}_LOESUNG.docx`);

  console.log('\nFertig! 2 Dateien erstellt.');
})();
