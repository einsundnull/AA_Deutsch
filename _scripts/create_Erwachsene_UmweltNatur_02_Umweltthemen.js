// A2_Erwachsene — Thema 10 UP 02: Umweltthemen (Recycling, Energie sparen)
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Umweltthemen (Recycling, Energie sparen)';
const HEADING = 'Thema 10 — Umwelt & Natur';
const SUBHEAD = 'UP 02: Umweltthemen (Recycling, Energie sparen)';
const PREFIX  = 'A2_Erwachsene_UmweltNatur_02_Umweltthemen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '10_UmweltNatur', '02_Umweltthemen');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 02`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
const ftr = () => ({ default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }), new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })] })] }) });

const h1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const ecoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, left: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, right: { style: BorderStyle.SINGLE, size: 12, color: '2E7D32' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'C8E6C9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── 1. SCHREIBEN ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke für Umwelt und Recycling:',
    'Müll trennen: Plastik in den gelben Sack / Papier in die blaue Tonne',
    '              Glas in den Glascontainer / Bioabfall in die braune Tonne',
    'Energie sparen: Licht ausschalten / die Heizung herunterdrehen / Stromsparen',
    'Wasser sparen: Wasserhahn zudrehen / kürzer duschen',
    'Verkehr: zu Fuß gehen / Fahrrad fahren / öffentliche Verkehrsmittel nutzen',
    'sollte / sollten (Empfehlung): Man sollte mehr … / Wir sollten weniger …',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Umweltverhalten beschreiben'),
  p('Was machen Sie persönlich für die Umwelt? Schreiben Sie 4–5 Sätze. Benutzen Sie: Ich trenne … / Ich spare … / Ich vermeide …'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Empfehlungen mit „sollte"'),
  p('Schreiben Sie fünf Empfehlungen für umweltbewusstes Verhalten. Benutzen Sie „Man sollte …" oder „Wir sollten …"'),
  grammarBox([
    'Konjunktiv II für Empfehlungen:',
    'sollte / sollten — höfliche Empfehlung, was richtig wäre',
    'könnte / könnten — Vorschlag, Möglichkeit',
    'Beispiel: Man sollte weniger Plastik benutzen.',
    'Beispiel: Wir könnten öfter mit dem Fahrrad fahren.',
  ]),
  ...gap(1),
  p('a) ', { before: 80 }),
  wLine(),
  p('b) ', { before: 120 }),
  wLine(),
  p('c) ', { before: 120 }),
  wLine(),
  p('d) ', { before: 120 }),
  wLine(),
  p('e) ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Argumente: weil-Sätze für Umweltthemen'),
  p('Verbinde die Sätze mit „weil".'),
  p('a) Wir müssen Müll trennen. Müll wird recycelt.'),
  wLine(),
  p('b) Ich nehme den Bus. Ich will weniger CO₂ produzieren.', { before: 120 }),
  wLine(),
  p('c) Sie kauft regionale Produkte. Der Transport ist kürzer.', { before: 120 }),
  wLine(),
  p('d) Er duscht kürzer. Er möchte Wasser sparen.', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Forderungstext schreiben'),
  p('Schreiben Sie einen kurzen Text (5–6 Sätze): „Was sollten wir alle für die Umwelt tun?". Benutzen Sie Passiv und sollte/könnte.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Umweltthemen'),
  grammarBox([
    'Konjunktiv II — Empfehlungen für Umwelt:',
    'sollte:    Pflicht / dringende Empfehlung    Wir sollten Plastik vermeiden.',
    'könnte:    Möglichkeit / Vorschlag           Man könnte mehr Fahrrad fahren.',
    'müsste:    eigentlich notwendig              Eigentlich müsste mehr getan werden.',
    'würde:     Höfliche Form                     Ich würde Müll trennen.',
    'Mit dass:  Es wäre gut, dass / wenn man …',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antwort'),
  p('Ich versuche, im Alltag möglichst umweltfreundlich zu leben. Ich trenne den Müll konsequent — Plastik, Papier, Glas und Bioabfall kommen in verschiedene Tonnen. Außerdem spare ich Strom: Wenn ich aus dem Zimmer gehe, schalte ich das Licht aus. Zur Arbeit fahre ich mit dem Fahrrad, weil das gesund und klimafreundlich ist. Plastiktüten beim Einkaufen vermeide ich — ich nehme immer eine Stofftasche mit.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Empfehlungen'),
  p('a) Man sollte den Müll richtig trennen.'),
  p('b) Wir sollten weniger Plastik kaufen und mehr Mehrwegprodukte verwenden.'),
  p('c) Man könnte öfter mit dem Fahrrad fahren statt mit dem Auto.'),
  p('d) Wir sollten beim Verlassen eines Raumes immer das Licht ausschalten.'),
  p('e) Man könnte regionale und saisonale Lebensmittel kaufen.'),
  ...gap(1),
  h2('Aufgabe 3 — weil-Sätze'),
  p('a) Wir müssen Müll trennen, weil Müll recycelt wird. (Verb am Ende!)'),
  p('b) Ich nehme den Bus, weil ich weniger CO₂ produzieren will.'),
  p('c) Sie kauft regionale Produkte, weil der Transport kürzer ist.'),
  p('d) Er duscht kürzer, weil er Wasser sparen möchte.'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien Forderungstext'),
  bullet('Mindestens 3 konkrete Vorschläge'),
  bullet('Konjunktiv II (sollte/könnte) korrekt verwendet'),
  bullet('Mindestens ein Passiv-Satz: Müll sollte getrennt werden.'),
  bullet('Konnektoren: außerdem / zudem / auch'),
  bullet('Begründung mit weil oder denn'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Leseübung'),
  h2('Text: Yusufs neuer Alltag in Hamburg'),
  p('Yusuf Aydın kommt aus der Türkei und lebt seit zwei Jahren in Hamburg. Er arbeitet als Buchhalter bei einer Reederei. Vor seinem Umzug hat er sich kaum Gedanken über Umweltschutz gemacht. „In meiner Heimatstadt Antalya gab es nur eine Tonne für allen Müll", erinnert er sich. „Hier in Deutschland habe ich am ersten Tag drei Tonnen vor dem Haus gesehen — eine blaue, eine gelbe und eine schwarze. Ich war total verwirrt."'),
  p('Seine Vermieterin, Frau Hartmann, hat Yusuf am ersten Wochenende alles genau erklärt: „Papier kommt in die blaue Tonne, Verpackungen mit dem Grünen Punkt — also Plastik, Konserven und Tetrapak — in den gelben Sack. Restmüll in die schwarze Tonne. Bioabfall in die braune. Und Glas bringen Sie zum Container an der Ecke." Yusuf hat alles aufgeschrieben und einen Zettel an den Kühlschrank geklebt.'),
  p('Inzwischen ist das Mülltrennen für Yusuf Routine. Aber er hat noch mehr gelernt: „In Deutschland gibt es Pfand auf Plastikflaschen — 25 Cent pro Flasche! Im Supermarkt habe ich einen Automaten entdeckt, in den man die leeren Flaschen wirft. Man bekommt einen Bon und kann beim Einkaufen damit zahlen." Diese Idee findet er großartig: „So bleibt der Müll nicht in der Natur — und man bekommt sogar Geld zurück!"'),
  p('Auch sein Stromverbrauch ist gesunken. „Mein Vermieter hat mir gezeigt, wie man Stand-by-Geräte ausschaltet. Der Fernseher und der Computer ziehen sonst die ganze Nacht Strom — das wusste ich nicht!" Auf der letzten Stromrechnung hat Yusuf 18 Euro pro Monat weniger bezahlt — über das Jahr macht das fast 220 Euro Ersparnis.'),
  p('„Was mir am besten gefällt: viele kleine Aktionen ergeben zusammen viel", sagt Yusuf. „Ich fahre jetzt mit dem Fahrrad zur Arbeit, kaufe samstags auf dem Wochenmarkt regionales Gemüse, und meine Stofftasche habe ich immer dabei. Diese Routinen sind gut für die Umwelt — und auch für meinen Geldbeutel."'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Yusuf wohnt seit zwei Jahren in Hamburg.', ''],
      ['In Antalya gab es nur eine Tonne für allen Müll.', ''],
      ['Frau Hartmann ist Yusufs Kollegin.', ''],
      ['Plastikflaschen werden mit Pfand zurückgegeben.', ''],
      ['Yusufs Stromverbrauch ist um 18 Euro pro Monat gesunken.', ''],
      ['Yusuf fährt mit dem Auto zur Arbeit.', ''],
      ['Yusuf kauft auf dem Wochenmarkt regionales Gemüse.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Welche Mülltonnen gibt es vor Yusufs Haus? Was kommt jeweils rein?'),
  wLine(), wLine(), wLine(),
  p('b) Wie funktioniert das Pfandsystem in Deutschland?', { before: 120 }),
  wLine(), wLine(),
  p('c) Wie viel spart Yusuf pro Jahr durch weniger Stand-by?', { before: 120 }),
  wLine(),
  p('d) Welche drei Routinen für die Umwelt nennt Yusuf am Ende?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Yusufs Umweltverhalten: Übersicht'),
  stdTable(
    ['Bereich', 'Was macht Yusuf?'],
    [
      ['Mülltrennung', ''],
      ['Pfandsystem', ''],
      ['Stromsparen', ''],
      ['Verkehr', ''],
      ['Einkaufen', ''],
    ],
    [3500, 8206]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Umweltthemen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Yusuf wohnt seit zwei Jahren in Hamburg.', 'R'],
      ['In Antalya gab es nur eine Tonne für allen Müll.', 'R'],
      ['Frau Hartmann ist Yusufs Kollegin.', 'F (Vermieterin)'],
      ['Plastikflaschen werden mit Pfand zurückgegeben.', 'R (25 Cent)'],
      ['Yusufs Stromverbrauch ist um 18 Euro pro Monat gesunken.', 'R'],
      ['Yusuf fährt mit dem Auto zur Arbeit.', 'F (mit dem Fahrrad)'],
      ['Yusuf kauft auf dem Wochenmarkt regionales Gemüse.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Blau = Papier, Gelb = Verpackungen (Plastik/Konserven/Tetrapak), Schwarz = Restmüll, Braun = Bioabfall, Glas = Container.'),
  p('b) Man bekommt 25 Cent pro Plastikflasche zurück. Man wirft die Flaschen in einen Automaten und bekommt einen Bon zum Einlösen.'),
  p('c) Fast 220 Euro pro Jahr (18 € × 12 Monate ≈ 216 €).'),
  p('d) Mit dem Fahrrad zur Arbeit fahren, regionales Gemüse auf dem Wochenmarkt kaufen, eigene Stofftasche mitnehmen.'),
  ...gap(1),
  h2('Aufgabe 3 — Übersicht'),
  stdTable(
    ['Bereich', 'Was macht Yusuf?'],
    [
      ['Mülltrennung', 'Trennt nach 5 Kategorien (Papier/Plastik/Rest/Bio/Glas)'],
      ['Pfandsystem', 'Bringt Plastikflaschen zum Automaten und bekommt Bon'],
      ['Stromsparen', 'Schaltet Stand-by-Geräte aus → 18 €/Monat weniger'],
      ['Verkehr', 'Fährt mit dem Fahrrad zur Arbeit'],
      ['Einkaufen', 'Wochenmarkt regionales Gemüse, eigene Stofftasche'],
    ],
    [3500, 8206]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Lückentext'),
  infoBox([
    'Wörterkasten: Plastik  |  Pfand  |  trennen  |  Strom  |  Container',
    '              Recycling  |  Umwelt  |  Energie  |  Tonne  |  Verpackung'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Umwelttext: Fülle die Lücken aus'),
  p('In Deutschland ist der Schutz der ________ ein wichtiges Thema. Die Menschen ________ ihren Müll genau: Papier, ________, Bioabfall und Restmüll kommen in verschiedene Tonnen. Glasflaschen bringt man zum ________ an der Ecke.'),
  p('Auf manche Flaschen gibt es ________ — das ist ein Geldbetrag, den man beim Kauf zahlt und beim Zurückgeben wieder bekommt. So entsteht weniger Müll, und das ________ wird einfacher.', { before: 120 }),
  p('Auch ________ und Wasser sind wichtige Themen. Man kann ________ sparen, indem man die Heizung herunterdreht und Stand-by-Geräte ausschaltet. Bei Lebensmitteln ist ________ oft das Problem — viele Produkte sind unnötig in Plastik eingepackt. Wer eine eigene ________ benutzt, hilft schon mit.', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Im Supermarkt: Dialog ergänzen'),
  infoBox(['Wörterkasten: Pfand  |  zurückgeben  |  Stofftasche  |  Verpackung  |  brauche  |  vermeiden']),
  ...gap(1),
  p('A: „Möchten Sie eine Plastiktüte für Ihre Einkäufe?"'),
  p('B: „Nein danke, ich habe meine eigene ________ dabei."'),
  p('A: „Sehr gut! Auf die Flasche hier zahlen Sie 25 Cent ________."'),
  p('B: „Okay, ich werde die Flasche später ________. Übrigens — ich versuche, Plastik zu ________."'),
  p('A: „Eine gute Idee! Wir bieten auch viele Produkte ohne ________ an — schauen Sie mal in unsere Bio-Ecke."'),
  p('B: „Danke, das ________ ich genau!"'),
  ...gap(1),
  h2('Aufgabe 3 — Passiv mit Modalverben'),
  grammarBox([
    'Passiv mit Modalverb (sollen / müssen / können):',
    'Modalverb (konjugiert) + Partizip II + werden (Infinitiv am Ende!)',
    'Aktiv:    Wir sollen den Müll trennen.',
    'Passiv:   Der Müll soll getrennt werden.',
    'Aktiv:    Man muss Strom sparen.',
    'Passiv:   Strom muss gespart werden.',
  ]),
  ...gap(1),
  p('Forme die Sätze ins Passiv um.'),
  p('a) Man muss Plastiktüten vermeiden. → '),
  wLine(),
  p('b) Wir sollen das Licht ausschalten. → ', { before: 120 }),
  wLine(),
  p('c) Man kann Glasflaschen recyceln. → ', { before: 120 }),
  wLine(),
  p('d) Wir müssen die Heizung niedriger stellen. → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Tonne und Müll zuordnen'),
  p('In welche Tonne kommt der Müll? Trage den Buchstaben (A–D) ein.'),
  p('A — blaue Tonne (Papier)  |  B — gelber Sack (Verpackungen)  |  C — schwarze Tonne (Restmüll)  |  D — braune Tonne (Bio)'),
  ...gap(1),
  stdTable(
    ['Müll', 'Tonne (A–D)'],
    [
      ['leere Joghurtbecher', ''],
      ['alte Zeitungen', ''],
      ['Kartoffelschalen', ''],
      ['kaputte Kugelschreiber', ''],
      ['Plastikflasche ohne Pfand', ''],
      ['Eierschalen', ''],
      ['benutzte Taschentücher', ''],
      ['leere Konservendosen', ''],
    ],
    [7000, 4706]
  ),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Umweltthemen'),
  h2('Aufgabe 1'),
  p('1. Umwelt  2. trennen  3. Plastik  4. Container  5. Pfand'),
  p('6. Recycling  7. Energie/Strom  8. Strom/Energie  9. Verpackung  10. Tonne (Stofftasche)'),
  p('Hinweis: Lücke 7+8 sind austauschbar (Energie/Strom). Lücke 10 = „Stofftasche" laut Wörterkasten — alternativ akzeptiert: Tonne.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. Stofftasche  2. Pfand  3. zurückgeben  4. vermeiden  5. Verpackung  6. brauche'),
  ...gap(1),
  h2('Aufgabe 3 — Passiv mit Modalverb'),
  p('a) Plastiktüten müssen vermieden werden.'),
  p('b) Das Licht soll ausgeschaltet werden.'),
  p('c) Glasflaschen können recycelt werden.'),
  p('d) Die Heizung muss niedriger gestellt werden.'),
  ...gap(1),
  h2('Aufgabe 4 — Mülltrennung'),
  stdTable(
    ['Müll', 'Tonne'],
    [
      ['leere Joghurtbecher', 'B (gelber Sack)'],
      ['alte Zeitungen', 'A (blau)'],
      ['Kartoffelschalen', 'D (braun, Bio)'],
      ['kaputte Kugelschreiber', 'C (schwarz, Rest)'],
      ['Plastikflasche ohne Pfand', 'B (gelber Sack)'],
      ['Eierschalen', 'D (braun, Bio)'],
      ['benutzte Taschentücher', 'C (schwarz, Rest)'],
      ['leere Konservendosen', 'B (gelber Sack)'],
    ],
    [7000, 4706]
  ),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Wortliste'),
  h2('Teil A — Müll und Recycling'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['die Umwelt', 'Nomen', 'Wir müssen die Umwelt schützen.'],
      ['der Müll', 'Nomen', 'Bitte werfen Sie den Müll in die richtige Tonne.'],
      ['die Mülltonne, -n', 'Nomen', 'Vor dem Haus stehen vier Mülltonnen.'],
      ['trennen', 'Verb', 'In Deutschland trennt man den Müll konsequent.'],
      ['das Recycling', 'Nomen', 'Recycling spart Rohstoffe.'],
      ['das Pfand', 'Nomen', 'Auf der Flasche sind 25 Cent Pfand.'],
      ['die Verpackung, -en', 'Nomen', 'Die Verpackung gehört in den gelben Sack.'],
      ['der Container, -', 'Nomen', 'Glasflaschen kommen in den Glascontainer.'],
      ['die Plastiktüte, -n', 'Nomen', 'Plastiktüten sollte man vermeiden.'],
      ['vermeiden', 'Verb', 'Man sollte unnötigen Müll vermeiden.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Energie und Klima'),
  stdTable(
    ['Ausdruck', 'Bedeutung', 'Beispielsatz'],
    [
      ['der Strom', 'Elektrizität', 'Strom sparen ist gut für die Umwelt.'],
      ['die Energie', 'Energie / Strom / Wärme', 'Erneuerbare Energie ist umweltfreundlich.'],
      ['die Heizung, -en', 'Wärmesystem', 'Im Winter heizt die Heizung die Wohnung.'],
      ['sparen', 'weniger verbrauchen', 'Wir sparen jeden Monat 18 Euro Strom.'],
      ['das Klima', 'langfristiges Wetter', 'Das Klima verändert sich weltweit.'],
      ['der Klimawandel', 'Klimaänderung', 'Der Klimawandel ist eine große Bedrohung.'],
      ['umweltfreundlich', 'gut für die Umwelt', 'Fahrradfahren ist sehr umweltfreundlich.'],
      ['nachhaltig', 'langfristig sinnvoll', 'Wir sollten nachhaltig leben.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  ecoBox([
    'Mülltrennung in Deutschland — Übersicht:',
    'Blaue Tonne:  Papier, Pappe, Karton',
    'Gelber Sack:  Plastik, Verpackungen, Konservendosen, Tetrapak',
    'Schwarze Tonne: Restmüll (kaputte Stifte, Hygieneartikel, Asche)',
    'Braune Tonne: Bioabfall (Obst, Gemüse, Eierschalen, Kaffeesatz)',
    'Glascontainer: Glasflaschen, Marmeladengläser (nach Farbe sortieren!)',
    'Pfand-Automat: Plastik- und Glasflaschen mit Pfand-Symbol',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('die Umwelt: ___________  |  der Müll: ___________  |  trennen: ___________'),
  p('das Pfand: ___________  |  Strom sparen: ___________  |  umweltfreundlich: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Umweltthemen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Umwelt-Verben — Perfekt:',
    'trennen      → hat getrennt',
    'sparen       → hat gespart',
    'recyceln     → hat recycelt',
    'vermeiden    → hat vermieden',
    'verbrauchen  → hat verbraucht',
    'wegwerfen    → hat weggeworfen (trennb.)',
    'wiederverwenden → hat wiederverwendet (trennb.)',
    'schützen     → hat geschützt',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Wir haben gestern den Müll getrennt — Plastik, Papier und Bioabfall in verschiedene Tonnen.'),
  p('In Deutschland werden Plastikflaschen mit Pfand zurückgegeben und recycelt.'),
  p('Man sollte Strom sparen, indem man Stand-by-Geräte ausschaltet und kürzer duscht.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Konversation'),
  h2('Aufgabe 1 — Dialog: Tipps zum Umweltschutz'),
  p('Zwei Personen tauschen Tipps zum Umweltschutz aus. Ergänzt den Dialog.'),
  infoBox([
    'Tipps geben: Du solltest … / Ich empfehle dir, … / Es wäre gut, wenn du …',
    'Frage stellen: Wie machst du das mit …? / Was machst du gegen …?',
    'Begründen: weil / damit / um … zu',
    'Zustimmen: Stimmt! / Das mache ich auch! / Gute Idee!',
    'Widersprechen: Ich finde … / Aber das ist schwierig, weil …',
  ]),
  ...gap(1),
  p('A: „Du, ich habe in letzter Zeit so viel Müll — wie machst du das?"'),
  p('B: „Ich trenne alles ganz konsequent: ________________________ in die blaue Tonne, ________________________ in den gelben Sack."'),
  p('A: „Und wie sparst du Strom?"'),
  p('B: „Ich ________________________, wenn ich aus dem Zimmer gehe. Außerdem ________________________ — das spart noch mehr."'),
  p('A: „Hast du auch einen Tipp gegen zu viel Plastik?"'),
  p('B: „Ja, ich nehme immer eine ________________________ mit. So ________________________."'),
  p('A: „Eine gute Idee! Ich sollte das auch versuchen. Was ist mit deinem Verkehrsmittel?"'),
  p('B: „Ich fahre meistens mit ________________________, weil ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Beim Hausmeister'),
  stdTable(
    ['Mieter/in (A) — neu eingezogen', 'Hausmeister/in (B)'],
    [
      ['Sie wissen nicht, wie die Mülltrennung funktioniert. Fragen Sie.', 'Erklären Sie die 4 Tonnen und was rein gehört.'],
      ['Fragen Sie nach Glasflaschen.', 'Erklären Sie den Glascontainer und das Pfandsystem.'],
      ['Fragen Sie, was bei Sperrmüll zu tun ist.', 'Geben Sie Auskunft (Termin / Anruf / Container).'],
      ['Bedanken Sie sich.', 'Wünschen Sie viel Erfolg.'],
    ],
    [5703, 5703]
  ),
  ecoBox([
    'Tipps für das Rollenspiel:',
    'Sperrmüll: alte Möbel, große Geräte — nicht in normale Mülltonne!',
    'Anmeldung beim Wertstoffhof oder Termin mit der Stadt vereinbaren.',
    'Elektrogeräte: zur Sammelstelle bringen — nicht in den Hausmüll!',
    'Sondermüll: Batterien, Farben, Medikamente — gehören in spezielle Sammelboxen.',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Umwelt im Alltag'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wie trennen Sie zu Hause den Müll?', ''],
      ['Was tun Sie, um Strom oder Wasser zu sparen?', ''],
      ['Wie war Mülltrennung in Ihrem Heimatland?', ''],
      ['Welcher Umwelttipp ist Ihrer Meinung nach am wichtigsten?', ''],
      ['Glauben Sie, dass kleine Aktionen wirklich helfen? Warum?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppendebatte: „Reicht individuelles Handeln gegen den Klimawandel?"'),
  p('Bildet zwei Gruppen — eine für „Ja, jeder einzelne hilft mit", eine für „Nein, die Politik muss entscheiden". Jede Person bringt mindestens ein Argument.'),
  infoBox([
    'Redemittel:',
    'Pro individuell: Wenn jeder mitmacht … / Kleine Schritte ergeben Großes.',
    'Pro Politik: Politik kann Gesetze machen … / Industrie verursacht 70 % der Emissionen.',
    'Vermitteln: Sowohl als auch … / Beide Seiten haben Recht, weil …',
    'Vergleich: Im Vergleich zu früher … / Heute ist es anders, weil …',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Umweltthemen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Konkrete Tipps mit Imperativ oder „Du solltest …"'),
  bullet('weil/damit-Sätze für Begründungen'),
  bullet('Mindestens 3 Themenbereiche (Müll/Strom/Plastik/Verkehr)'),
  bullet('Reaktion auf Tipps (Zustimmung oder Frage)'),
  bullet('Natürlicher Gesprächsfluss'),
  ...gap(1),
  h2('Muster-Dialog'),
  p('A: „Du, wie machst du das mit dem Müll?" / B: „Ich trenne alles: Papier in die blaue Tonne, Plastik und Verpackungen in den gelben Sack."'),
  p('B: „Außerdem schalte ich Stand-by-Geräte aus — das spart auch viel Strom."'),
  p('B: „Ich nehme immer eine Stofftasche mit, damit ich keine Plastiktüten brauche."'),
  p('B: „Ich fahre mit dem Fahrrad zur Arbeit, weil das gesund und klimafreundlich ist."'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Hausmeister-Gespräch'),
  p('A: „Guten Tag, ich bin neu hier. Können Sie mir die Mülltrennung erklären?"'),
  p('B: „Gerne. Wir haben vier Tonnen: blau für Papier, gelb für Plastik und Verpackungen, schwarz für Restmüll und braun für Bioabfall."'),
  p('A: „Und Glasflaschen?" / B: „Glas kommt in den Container an der Ecke — nach Farbe getrennt: weiß, grün, braun. Plastikflaschen mit Pfand bringen Sie zum Supermarkt zurück."'),
  p('A: „Was ist mit alten Möbeln?" / B: „Sperrmüll müssen Sie bei der Stadt anmelden — er wird dann abgeholt."'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Konjunktiv II für Empfehlungen (sollte/könnte), Passiv mit Modalverb (Müll soll getrennt werden), Konnektoren (außerdem/zudem/sowohl als auch).', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Umweltthemen — Bildaufgaben'),
  h2('Aufgabe 1 — Mülltonnen erkennen'),
  p('[BILD 1: Vier Mülltonnen in verschiedenen Farben: (1) blaue Tonne mit Papier-Symbol, (2) gelbe Tonne mit Verpackungs-Symbol, (3) schwarze Tonne (Restmüll), (4) braune Tonne mit Bio-Symbol.]'),
  p('a) Welche Farbe hat welche Tonne und was kommt rein?'),
  stdTable(
    ['Tonne', 'Farbe', 'Was kommt rein?'],
    [['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', '']],
    [1500, 2500, 7706]
  ),
  p('b) Welche Tonne füllt sich bei Ihnen am schnellsten? Schreibe einen Satz.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Pfand-Automat'),
  p('[BILD 2: Pfand-Rückgabe-Automat im Supermarkt mit Schlitz für Flaschen. Daneben: Anweisungen — „1. Flasche einlegen, 2. Pfand-Bon ausdrucken, 3. Bon an der Kasse einlösen". Eine Person legt gerade eine leere Plastikflasche ein.]'),
  p('a) Wie funktioniert der Pfandautomat? Beschreibe in 3 Schritten (Imperativ).'),
  wLine(), wLine(), wLine(),
  p('b) Du hast 12 leere Plastikflaschen (je 25 Cent Pfand). Wie viel Geld bekommst du zurück?', { before: 120 }),
  wLine(),
  p('c) Warum ist das Pfandsystem gut für die Umwelt? Schreibe 1 Satz mit weil.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Stromrechnung verstehen'),
  p('[BILD 3: Auszug einer Stromrechnung — Vergleich: Letztes Jahr 280 kWh/Monat, dieses Jahr 220 kWh/Monat. Ersparnis: 60 kWh × 0,30 €/kWh = 18 €/Monat. Jährliche Ersparnis: 216 €. Tipps unten: Stand-by ausschalten, LED-Lampen, Geräte voll laden.]'),
  p('a) Wie viel Strom hat die Person dieses Jahr pro Monat verbraucht?'),
  wLine(),
  p('b) Wie viel hat sie pro Jahr gespart?', { before: 120 }),
  wLine(),
  p('c) Welche drei Tipps gibt die Stromrechnung?', { before: 120 }),
  wLine(), wLine(),
  p('d) Schreibe 2 Tipps zum Stromsparen mit „Man sollte ...".', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Plakat „Umweltschutz im Alltag"'),
  p('[BILD 4: Ein Informationsplakat mit 6 Tipps und Symbolen: (1) Fahrrad fahren statt Auto, (2) Mehrwegflasche statt Plastik, (3) regionales Obst statt importiertes, (4) Stofftasche statt Plastiktüte, (5) Heizung niedriger stellen, (6) kürzer duschen.]'),
  p('a) Welche sechs Tipps zeigt das Plakat? Liste sie auf.'),
  wLine(), wLine(), wLine(), wLine(),
  p('b) Welche zwei Tipps befolgst du schon? Welche zwei könntest du auch noch machen? Schreibe 4 Sätze.', { before: 120 }),
  wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Umweltthemen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Mülltonnen'),
  stdTable(
    ['Tonne', 'Farbe', 'Was?'],
    [
      ['1', 'blau', 'Papier, Pappe, Karton'],
      ['2', 'gelb', 'Plastik, Verpackungen, Konserven'],
      ['3', 'schwarz', 'Restmüll (Hygiene, Asche, kaputte Stifte)'],
      ['4', 'braun', 'Bioabfall (Obst, Gemüse, Eierschalen)'],
    ],
    [1500, 2500, 7706]
  ),
  p('b) Individuelle Antworten — z.B.: Bei mir füllt sich der gelbe Sack am schnellsten, weil ich oft Joghurt esse.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Pfand-Automat'),
  p('a) 1. Legen Sie die leere Flasche in den Schlitz. / 2. Drücken Sie den grünen Knopf, um den Bon auszudrucken. / 3. Geben Sie den Bon an der Kasse ab und lösen Sie ihn ein.'),
  p('b) 12 × 0,25 € = 3,00 € zurück.'),
  p('c) Beispiel: Das Pfandsystem ist gut, weil weniger Plastikflaschen in der Natur landen.'),
  ...gap(1),
  h2('Aufgabe 3 — Stromrechnung'),
  p('a) 220 kWh pro Monat.'),
  p('b) 216 Euro pro Jahr (18 € × 12 Monate).'),
  p('c) Stand-by ausschalten, LED-Lampen verwenden, Geräte voll laden.'),
  p('d) Beispiele: Man sollte Stand-by-Geräte abends ausschalten. / Man sollte LED-Lampen statt Glühbirnen benutzen.'),
  ...gap(1),
  h2('Aufgabe 4 — Umweltschutz-Plakat'),
  p('a) 1. Fahrrad fahren statt Auto. 2. Mehrwegflasche statt Plastik. 3. Regionales Obst statt importiert. 4. Stofftasche statt Plastiktüte. 5. Heizung niedriger stellen. 6. Kürzer duschen.'),
  p('b) Individuelle Antworten — z.B.: Ich fahre schon Fahrrad und nehme eine Stofftasche mit. Ich könnte zusätzlich kürzer duschen und mehr regionales Obst kaufen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
