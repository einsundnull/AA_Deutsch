// A2_Erwachsene — Thema 07 UP 01: Reise planen und buchen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Reise planen und buchen';
const HEADING = 'Thema 07 — Reisen';
const SUBHEAD = 'UP 01: Reise planen und buchen';
const PREFIX  = 'A2_Erwachsene_Reisen_01_ReisePlanenBuchen';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '07_Reisen', '01_ReisePlanenBuchen');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle Unterpunkt:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — UP 01`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
const ftr = () => ({ default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Seite ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888', font: 'Arial' }), new TextRun({ text: ' von ', size: 18, color: '888888', font: 'Arial' }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '888888', font: 'Arial' })] })] }) });

const h1 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 36, color: '1F4E79', font: 'Arial' })], spacing: { before: 240, after: 120 } });
const h2 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: '1F4E79', font: 'Arial' })], spacing: { before: 200, after: 80 } });
const h3 = (t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: '2E75B6', font: 'Arial' })], spacing: { before: 160, after: 60 } });
const p = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: t, size: o.size || 24, font: 'Arial', bold: o.bold || false, italics: o.italics || false, color: o.color || '000000' })], spacing: { before: o.before || 80, after: o.after || 60 }, alignment: o.align || AlignmentType.LEFT });
const gap = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [new TextRun('')], spacing: { before: 60, after: 60 } }));
const wLine = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 8 } }, spacing: { before: 240, after: 0 }, children: [new TextRun('')] });
const nameDate = () => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [new TableRow({ children: [new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Name: ________________________________', size: 22, font: 'Arial' })] })] }), new TableCell({ width: { size: 5953, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: 'Datum: ________________________________', size: 22, font: 'Arial' })] })] })] })] });
const bullet = (t) => new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: t, size: 24, font: 'Arial' })], spacing: { before: 60, after: 40 } });

const infoBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '388E3C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E8F5E9' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const grammarBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, left: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'E65100' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'FFF3E0' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });
const travelBox = (lines) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: '00695C' }, bottom: { style: BorderStyle.SINGLE, size: 12, color: '00695C' }, left: { style: BorderStyle.SINGLE, size: 12, color: '00695C' }, right: { style: BorderStyle.SINGLE, size: 12, color: '00695C' }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } }, rows: [new TableRow({ children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: 'E0F2F1' }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, children: lines.map(l => new Paragraph({ children: [new TextRun({ text: l, size: 22, font: 'Arial' })], spacing: { before: 40, after: 40 } })) })] })] });

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
  h1('Reise planen und buchen — Schreibübung'),
  infoBox([
    'Nützliche Ausdrücke fürs Reisen:',
    'Planen: eine Reise planen / buchen / reservieren / recherchieren',
    'Transportmittel: mit dem Zug / Flugzeug / Auto / Bus fahren',
    'Unterkunft: ein Hotel / eine Pension / eine Ferienwohnung buchen',
    'Futur I: Wir werden … fahren / buchen / besuchen.',
    'Wenn-Satz: Wenn wir Zeit haben, werden wir … besuchen.',
    'Adjektive: ein günstiger Flug / das schöne Hotel / die lange Fahrt',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Meine Traumreise beschreiben'),
  p('Wohin möchten Sie reisen? Beantworten Sie die Fragen in ganzen Sätzen.'),
  p('a) Wohin möchten Sie reisen und warum?'),
  wLine(), wLine(),
  p('b) Wie werden Sie reisen? (Transportmittel)', { before: 120 }),
  wLine(),
  p('c) Wo werden Sie wohnen? (Hotel, Ferienwohnung, bei Freunden …)', { before: 120 }),
  wLine(),
  p('d) Was werden Sie dort machen?', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Reisevorschlag: Nachricht schreiben'),
  p('Sie möchten mit einem Freund / einer Freundin verreisen. Schreiben Sie eine Nachricht (4–5 Sätze) und schlagen Sie ein Reiseziel vor. Benutzen Sie: Futur I (werden), Infinitiv mit zu, Konjunktiv II (würde).'),
  wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Adjektivdeklination: Lücken ergänzen'),
  grammarBox([
    'Adjektiv nach bestimmtem Artikel (der/die/das):',
    'Nom.:  der günstig-e Zug  |  die lang-e Reise  |  das schön-e Hotel',
    'Akk.:  den günstig-en Zug  |  die lang-e Reise  |  das schön-e Hotel',
    'Dat.:  mit dem günstig-en Zug  |  mit der lang-en Reise  |  in dem schön-en Hotel',
    'Faustregel: Nach der/die/das meistens -e, nach den/dem immer -en.',
  ]),
  ...gap(1),
  p('Ergänze die richtige Adjektivendung.'),
  p('a) Wir nehmen den günstig_____ Sparpreis — er kostet nur 39 Euro.'),
  p('b) Die lang_____ Zugfahrt hat uns nicht gestört — wir haben gelesen.'),
  p('c) In dem schön_____ Hotel direkt am Hafen haben wir gut geschlafen.'),
  p('d) Das nett_____ Personal an der Rezeption hat uns sehr geholfen.'),
  p('e) Ich empfehle dir die interessant_____ Stadtführung — sie dauert nur eine Stunde.'),
  p('f) Mit dem schnell_____ ICE sind wir in weniger als vier Stunden in Hamburg.'),
  ...gap(1),
  h2('Aufgabe 4 — Buchungs-E-Mail schreiben'),
  p('Sie möchten ein Hotelzimmer buchen. Schreiben Sie eine formelle E-Mail (5–6 Sätze): Nennen Sie Anreisedatum, Dauer, Zimmertyp, und fragen Sie nach dem Preis und der Frühstücksoption.'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
], `${PREFIX}_Schreiben.docx`);

// ── 1L. SCHREIBEN LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Schreibübung: Reise planen und buchen'),
  grammarBox([
    'Futur I — Bildung: werden (konjugiert) + Infinitiv am Satzende',
    'ich werde … buchen       wir werden … fahren',
    'du wirst … reservieren   ihr werdet … besuchen',
    'er/sie wird … ankommen   sie/Sie werden … reisen',
    '',
    'Wenn-Satz: Wenn wir Zeit haben, werden wir die Altstadt besuchen.',
    '→ Verb im wenn-Satz ans Ende! Hauptsatz beginnt mit werden.',
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Muster-Antworten'),
  p('a) Ich möchte nach Wien reisen, weil ich die Kunstmuseen und die Kaffeehauskultur sehr interessant finde.'),
  p('b) Ich werde mit dem Zug fahren, weil das bequemer und umweltfreundlicher als Fliegen ist.'),
  p('c) Ich werde in einem kleinen Hotel in der Innenstadt wohnen — günstig und zentral.'),
  p('d) Ich werde das Kunsthistorische Museum besuchen, im Prater spazieren gehen und traditionelle Wiener Küche probieren.'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Nachricht'),
  p('Hey Jonas! Ich habe eine tolle Idee: Wir könnten ein Wochenende nach Hamburg fahren! Den günstigen Sparpreis gibt es schon ab 39 Euro — aber nur wenn wir früh buchen. Wenn wir am Freitagabend abreisen, haben wir den ganzen Samstag und Sonntag Zeit. Wir werden die Elbphilharmonie besuchen und eine Hafenrundfahrt machen. Was meinst du?'),
  ...gap(1),
  h2('Aufgabe 3 — Adjektivendungen'),
  p('a) den günstig-en Sparpreis  (mask. Akk. → -en)'),
  p('b) Die lang-e Zugfahrt  (fem. Nom. → -e)'),
  p('c) In dem schön-en Hotel  (neutr. Dat. → -en)'),
  p('d) Das nett-e Personal  (neutr. Nom. → -e)'),
  p('e) die interessant-e Stadtführung  (fem. Akk. → -e)'),
  p('f) Mit dem schnell-en ICE  (mask. Dat. → -en)'),
  ...gap(1),
  h2('Aufgabe 4 — Bewertungskriterien E-Mail'),
  bullet('Formelle Anrede: Sehr geehrte Damen und Herren,'),
  bullet('Anreisedatum und Abreisedatum klar genannt'),
  bullet('Zimmertyp: Einzel- / Doppelzimmer'),
  bullet('Frage nach Preis / Frühstück / Verfügbarkeit'),
  bullet('Freundlicher, formeller Ton — kein du, nur Sie'),
  bullet('Abschluss: Mit freundlichen Grüßen'),
], `${PREFIX}_Schreiben_LOESUNG.docx`);

// ── 2. LESEN ──────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reise planen und buchen — Leseübung'),
  h2('Text: Selins Hamburg-Trip'),
  p('Selin Kaya kommt aus der Türkei und lebt seit zwei Jahren in Köln. Sie arbeitet als Sozialarbeiterin und hat endlich zwei Wochen Urlaub bekommen. Mit ihrer besten Freundin Mina — die aus Syrien kommt und ebenfalls in Köln wohnt — plant sie einen Kurztrip nach Hamburg.'),
  p('Als erstes haben die beiden Freundinnen die Verbindungen recherchiert. Der Zug — ein IC-Direktzug von Köln nach Hamburg — dauert etwa vier Stunden und zwanzig Minuten. Der günstige Sparpreis kostet 49 Euro pro Person, aber nur wenn man mindestens drei Wochen vorher bucht. „Das ist billiger als das Flugzeug, wenn man die Anfahrt zum Flughafen rechnet", sagt Selin. Sie haben die Tickets sofort online gebucht.'),
  p('Dann haben sie ein Hotel gesucht. Selin wollte ein Hotel in der Nähe der Elbe buchen — nicht zu teuer, aber komfortabel. Nach langem Vergleichen haben sie sich für das „Hotel Elblicht" entschieden: ein Dreisterne-Hotel, 68 Euro pro Nacht und Person, inklusive Frühstück. Sie werden zwei Nächte dort bleiben.'),
  p('Das Programm steht auch schon fest: Am ersten Tag werden sie eine Führung in der Elbphilharmonie machen — Eintrittspreis 15 Euro. Am zweiten Tag möchten sie durch die Speicherstadt schlendern und eine Hafenrundfahrt buchen. „Wenn das Wetter gut ist, werden wir auch den Strandabschnitt am Elbstrand besuchen", sagt Mina.'),
  p('Das Budget für die ganze Reise liegt bei ca. 220 Euro pro Person: Zugticket 49 Euro, Hotel 136 Euro (2 Nächte), plus Essen und Aktivitäten. „Ich freue mich so sehr", schreibt Selin in ihrem Tagebuch. „Hamburg wird wunderbar sein!"'),
  ...gap(1),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Selin und Mina kommen beide aus der Türkei.', ''],
      ['Die Zugfahrt von Köln nach Hamburg dauert ca. 4,5 Stunden.', ''],
      ['Das Sparpreis-Ticket kostet 49 Euro, wenn man früh bucht.', ''],
      ['Das Hotel liegt in der Nähe des Hauptbahnhofs.', ''],
      ['Das Frühstück ist im Hotelpreis enthalten.', ''],
      ['Die Führung in der Elbphilharmonie kostet 15 Euro.', ''],
      ['Das Gesamtbudget beträgt ca. 220 Euro pro Person.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Fragen zum Text'),
  p('a) Warum ist der Zug günstiger als das Flugzeug laut Selin?'),
  wLine(), wLine(),
  p('b) Welche Kriterien hatte Selin bei der Hotelsuche?', { before: 120 }),
  wLine(), wLine(),
  p('c) Was planen die Freundinnen für den zweiten Tag?', { before: 120 }),
  wLine(), wLine(),
  p('d) Wie viel gibt jede Person für Zugticket und Hotel zusammen aus?', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Reise-Übersicht'),
  p('Fülle die Tabelle mit Informationen aus dem Text aus.'),
  stdTable(
    ['Reiseelement', 'Details aus dem Text'],
    [
      ['Reiseziel', ''],
      ['Transportmittel + Preis', ''],
      ['Hotel + Preis pro Nacht', ''],
      ['Aktivität Tag 1', ''],
      ['Aktivität Tag 2 (Plan)', ''],
      ['Gesamtbudget pro Person', ''],
    ],
    [4200, 7506]
  ),
], `${PREFIX}_Lesen.docx`);

// ── 2L. LESEN LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Leseübung: Reise planen und buchen'),
  h2('Aufgabe 1 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Selin und Mina kommen beide aus der Türkei.', 'F (Selin: Türkei, Mina: Syrien)'],
      ['Die Zugfahrt von Köln nach Hamburg dauert ca. 4,5 Stunden.', 'R (4h 20 Min.)'],
      ['Das Sparpreis-Ticket kostet 49 Euro, wenn man früh bucht.', 'R (3 Wochen vorher)'],
      ['Das Hotel liegt in der Nähe des Hauptbahnhofs.', 'F (in der Nähe der Elbe)'],
      ['Das Frühstück ist im Hotelpreis enthalten.', 'R (inklusive Frühstück)'],
      ['Die Führung in der Elbphilharmonie kostet 15 Euro.', 'R'],
      ['Das Gesamtbudget beträgt ca. 220 Euro pro Person.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),
  h2('Aufgabe 2 — Musterlösungen'),
  p('a) Weil man die Anfahrt zum Flughafen einrechnen muss — dann ist der Zug insgesamt günstiger.'),
  p('b) In der Nähe der Elbe, nicht zu teuer, aber komfortabel.'),
  p('c) Durch die Speicherstadt schlendern und eine Hafenrundfahrt buchen; wenn das Wetter gut ist, auch den Elbstrand besuchen.'),
  p('d) Zugticket 49 € + Hotel 136 € (2 × 68 €) = 185 € für Transport und Unterkunft.'),
  ...gap(1),
  h2('Aufgabe 3 — Reise-Übersicht'),
  stdTable(
    ['Reiseelement', 'Details'],
    [
      ['Reiseziel', 'Hamburg'],
      ['Transportmittel + Preis', 'IC-Zug, Sparpreis 49 Euro (3 Wochen vorher buchen)'],
      ['Hotel + Preis pro Nacht', 'Hotel Elblicht, 3 Sterne, 68 Euro/Nacht inkl. Frühstück'],
      ['Aktivität Tag 1', 'Führung Elbphilharmonie (15 Euro)'],
      ['Aktivität Tag 2 (Plan)', 'Speicherstadt, Hafenrundfahrt, evtl. Elbstrand'],
      ['Gesamtbudget pro Person', 'ca. 220 Euro (Zug + Hotel + Essen/Aktivitäten)'],
    ],
    [4200, 7506]
  ),
], `${PREFIX}_Lesen_LOESUNG.docx`);

// ── 3. LÜCKEN ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reise planen und buchen — Lückentext'),
  infoBox([
    'Wörterkasten: Sparpreis  |  reservieren  |  Unterkunft  |  Reiseführer  |  Hin- und Rückfahrt',
    '              Frühstück  |  buchen  |  vergleichen  |  Gepäck  |  Reiseziel'
  ]),
  ...gap(1),
  h2('Aufgabe 1 — Reisetext: Fülle die Lücken aus'),
  p('Bevor man verreist, muss man viel planen. Zuerst überlegt man sich das ________ — wohin soll die Reise gehen? Dann recherchiert man Verbindungen und ________ die Preise: Zug, Flugzeug oder Bus? Wer früh bucht, bekommt oft einen günstigen ________ — das spart viel Geld.'),
  p('Die ________ ist auch wichtig: Möchte man in einem Hotel, einer Pension oder einer Ferienwohnung übernachten? Am besten ________ man das Zimmer online, solange es noch verfügbar ist. Viele Hotels bieten Zimmer mit ________ an — das ist praktisch, damit man morgens gut in den Tag starten kann.', { before: 120 }),
  p('Für die Reise selbst braucht man auch einen guten ________, um die Sehenswürdigkeiten zu finden. Außerdem sollte man das ________ nicht zu voll packen — leichtes Gepäck macht das Reisen angenehmer. Wer mit dem Zug fährt, kauft am besten eine ________, damit man nicht zweimal buchen muss. Mit einer guten Planung wird jede Reise zum Erlebnis!', { before: 120 }),
  ...gap(1),
  h2('Aufgabe 2 — Im Reisebüro: Dialog ergänzen'),
  infoBox(['Wörterkasten: verfügbar  |  kostet  |  empfehlen  |  buchen  |  Doppelzimmer  |  abreisen']),
  ...gap(1),
  p('Kundin: „Guten Tag. Ich möchte ein Wochenende in München verbringen. Können Sie mir etwas ________?"'),
  p('Beraterin: „Gerne! Wann möchten Sie ________?"'),
  p('Kundin: „Am 15. Mai — und ich brauche ein ________ für zwei Personen."'),
  p('Beraterin: „Moment … ja, das Hotel Alpenblick ist noch ________. Es ________ 85 Euro pro Nacht inklusive Frühstück."'),
  p('Kundin: „Das klingt gut. Wie kann ich ________?"'),
  p('Beraterin: „Direkt hier bei mir oder online — ich schicke Ihnen den Link."'),
  ...gap(1),
  h2('Aufgabe 3 — Futur I bilden'),
  p('Bilde Sätze im Futur I mit werden.'),
  grammarBox([
    'Futur I: werden (konjugiert) + Infinitiv (am Satzende)',
    'Beispiel: Sie / das Hotel buchen → Sie wird das Hotel buchen.',
    'Mit wenn: Wenn wir früh buchen, werden wir Geld sparen.',
  ]),
  ...gap(1),
  p('a) Wir / nach Wien fahren → '),
  wLine(),
  p('b) Er / die Zugtickets online buchen → ', { before: 120 }),
  wLine(),
  p('c) Wenn das Wetter gut ist / wir / eine Bootstour machen → ', { before: 120 }),
  wLine(),
  p('d) Ich / ein Einzelzimmer reservieren → ', { before: 120 }),
  wLine(),
  p('e) Sie (Pl.) / drei Nächte im Hotel bleiben → ', { before: 120 }),
  wLine(),
  p('f) Wenn wir früh buchen / wir / viel sparen → ', { before: 120 }),
  wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Adjektivendungen ergänzen'),
  p('Ergänze die Adjektivendung (-e oder -en).'),
  p('a) Wir nehmen den schnell_____ ICE — er kostet nur 10 Euro mehr.'),
  p('b) Das gemütlich_____ Hotel liegt direkt am Stadtpark.'),
  p('c) Ich habe die günstig_____ Unterkunft online gefunden.'),
  p('d) Mit dem billig_____ Sparpreis spart man oft die Hälfte.'),
  p('e) Das interessant_____ Programm haben wir schon geplant.'),
  p('f) Die lang_____ Zugfahrt haben wir mit einem guten Buch verbracht.'),
], `${PREFIX}_Luecken.docx`);

// ── 3L. LÜCKEN LÖSUNG ─────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Lückentext: Reise planen und buchen'),
  h2('Aufgabe 1'),
  p('1. Reiseziel  2. vergleichen  3. Sparpreis  4. Unterkunft  5. reserviert/bucht'),
  p('6. Frühstück  7. Reiseführer  8. Gepäck  9. Hin- und Rückfahrt  10. (buchen)'),
  p('Hinweis: Lücke 5 akzeptiert auch „reserviert" — beide Formen sind korrekt.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Dialog'),
  p('1. empfehlen  2. abreisen  3. Doppelzimmer  4. verfügbar  5. kostet  6. buchen'),
  ...gap(1),
  h2('Aufgabe 3 — Futur I'),
  p('a) Wir werden nach Wien fahren.'),
  p('b) Er wird die Zugtickets online buchen.'),
  p('c) Wenn das Wetter gut ist, werden wir eine Bootstour machen.'),
  p('d) Ich werde ein Einzelzimmer reservieren.'),
  p('e) Sie werden drei Nächte im Hotel bleiben.'),
  p('f) Wenn wir früh buchen, werden wir viel sparen.'),
  grammarBox([
    'Futur I — Merkhilfe:',
    'werden steht immer auf Position 2 (oder nach Konjunktion ans Ende)',
    'Infinitiv steht IMMER ganz am Ende des Satzes',
    'Futur I drückt aus: Pläne / Vorhaben / Vorhersagen / Versprechen',
    'Alternativer Ausdruck mit Präsens + Zeitangabe: Wir fahren morgen nach Wien.',
    '→ Im Deutschen ist Präsens + Zeitangabe oft natürlicher als Futur I!',
  ]),
  ...gap(1),
  h2('Aufgabe 4 — Adjektivendungen'),
  p('a) den schnell-en ICE  (mask. Akk. → -en)'),
  p('b) Das gemütlich-e Hotel  (neutr. Nom. → -e)'),
  p('c) die günstig-e Unterkunft  (fem. Akk. → -e)'),
  p('d) Mit dem billig-en Sparpreis  (mask. Dat. → -en)'),
  p('e) Das interessant-e Programm  (neutr. Nom. → -e)'),
  p('f) Die lang-e Zugfahrt  (fem. Nom./Akk. → -e)'),
], `${PREFIX}_Luecken_LOESUNG.docx`);

// ── 4. WORTLISTE ──────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reise planen und buchen — Wortliste'),
  h2('Teil A — Reise und Buchung'),
  stdTable(
    ['Wort / Ausdruck', 'Wortart', 'Beispielsatz'],
    [
      ['das Reiseziel, -e', 'Nomen', 'Unser Reiseziel ist Hamburg.'],
      ['die Unterkunft, -künfte', 'Nomen', 'Wir suchen eine günstige Unterkunft.'],
      ['der Sparpreis, -e', 'Nomen', 'Den Sparpreis gibt es nur online.'],
      ['die Hin- und Rückfahrt', 'Nomen', 'Eine Hin- und Rückfahrt kostet 78 Euro.'],
      ['das Gepäck (Sg.)', 'Nomen', 'Ich packe mein Gepäck am Abend vorher.'],
      ['reservieren', 'Verb', 'Ich habe das Zimmer online reserviert.'],
      ['buchen', 'Verb', 'Hast du das Hotel schon gebucht?'],
      ['vergleichen', 'Verb', 'Ich vergleiche die Preise auf verschiedenen Websites.'],
      ['früh buchen', 'Ausdruck', 'Wenn man früh bucht, spart man viel Geld.'],
      ['das Einzelzimmer / Doppelzimmer', 'Nomen', 'Ich brauche ein Einzelzimmer mit Dusche.'],
    ],
    [3800, 2000, 5906]
  ),
  ...gap(1),
  h2('Teil B — Unterkunft und Transportmittel'),
  stdTable(
    ['Ausdruck', 'Bedeutung / Kontext', 'Beispielsatz'],
    [
      ['inklusive Frühstück', 'Frühstück im Preis', 'Das Zimmer kostet 75 Euro inklusive Frühstück.'],
      ['die Pension, -en', 'kleines, günstiges Hotel', 'In der Pension war das Essen selbst gemacht.'],
      ['die Ferienwohnung, -en', 'mieten, selbst kochen', 'Wir mieten eine Ferienwohnung für eine Woche.'],
      ['mit dem Zug / Flugzeug', 'Transportmittel + Dat.', 'Wir fahren mit dem Zug nach München.'],
      ['der Frühbucherrabatt', 'Rabatt bei frühem Buchen', 'Mit dem Frühbucherrabatt sparen wir 30 %.'],
      ['die Stornierung, -en', 'Buchung rückgängig machen', 'Kostenlose Stornierung bis 24h vorher.'],
      ['ein- / auschecken', 'Hotel betreten / verlassen', 'Check-in ab 15 Uhr / Check-out bis 11 Uhr.'],
      ['die Sehenswürdigkeit, -en', 'touristisches Ziel', 'Hamburg hat viele Sehenswürdigkeiten.'],
    ],
    [3000, 2800, 5906]
  ),
  ...gap(1),
  travelBox([
    'Reisen in Deutschland — Tipps:',
    'Bahn: Deutsche Bahn (DB) — Sparpreis ab 17,90 EUR bei Frühbuchung',
    'Billigflüge: oft günstiger, aber Gepäckkosten beachten!',
    'Fernbus: FlixBus — sehr günstig, aber langsamer',
    'Unterkunft: booking.com, HRS, Airbnb — immer Stornierungsbedingungen lesen',
    'Tipp: Mit der BahnCard 25/50 spart man bei jedem Zugticket dauerhaft.',
  ]),
  ...gap(1),
  p('Übersetzung in deine Sprache:', { bold: true }),
  p('das Reiseziel: ___________  |  reservieren: ___________  |  die Unterkunft: ___________'),
  p('der Sparpreis: ___________  |  inklusive: ___________  |  die Sehenswürdigkeit: ___________'),
], `${PREFIX}_Wortliste.docx`);

// ── 4L. WORTLISTE LÖSUNG ──────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Wortliste: Reise planen und buchen'),
  p('Vokabelliste ohne Lücken. Lösungshinweise:'),
  ...gap(1),
  grammarBox([
    'Wichtige Reiseverben — Perfekt:',
    'buchen      → hat gebucht',
    'reservieren → hat reserviert',
    'vergleichen → hat verglichen (unregelm.)',
    'reisen      → ist gereist',
    'ankommen    → ist angekommen (trennb.)',
    'abreisen    → ist abgereist (trennb.)',
    'einchecken  → hat eingecheckt (trennb.)',
    'stornieren  → hat storniert',
  ]),
  ...gap(1),
  h2('Übungssätze'),
  p('Ich habe das Hotel drei Wochen vorher gebucht und einen günstigen Sparpreis bekommen.'),
  p('Mit dem Zug von Frankfurt nach Berlin dauert die Hin- und Rückfahrt zusammen ca. 8 Stunden.'),
  p('Wenn man eine Ferienwohnung mietet, kann man selbst kochen und spart Geld beim Essen.'),
  ...gap(1),
  p('Übersetzungen: individuelle Antworten akzeptieren.', { italics: true, color: '888888' }),
], `${PREFIX}_Wortliste_LOESUNG.docx`);

// ── 5. KONVERSATION ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reise planen und buchen — Konversation'),
  h2('Aufgabe 1 — Dialog: Eine Reise planen'),
  p('Zwei Personen besprechen einen gemeinsamen Urlaub. Ergänzt den Dialog.'),
  infoBox([
    'Reiseziel vorschlagen: Wie wäre es mit …? / Ich würde gerne … besuchen.',
    'Transportmittel: Wir könnten mit dem … fahren / fliegen.',
    'Unterkunft: Sollen wir ein Hotel buchen / eine Wohnung mieten?',
    'Budget: Das ist zu teuer. / Das ist ein guter Preis! / Wir sparen, wenn wir …',
    'Futur: Wir werden … / Wenn wir …, werden wir …',
  ]),
  ...gap(1),
  p('Person A: „Ich habe zwei Wochen Urlaub — hast du Lust, zusammen zu verreisen?"'),
  p('Person B: „Ja, unbedingt! Wohin möchtest du ________________________?"'),
  p('Person A: „Wie wäre es mit ________________________? Ich habe gehört, es ist ________________________."'),
  p('Person B: „Gute Idee! Wie werden wir reisen — mit dem ________________________ oder mit dem ________________________?"'),
  p('Person A: „Ich denke, ________________________ ist günstiger, weil ________________________."'),
  p('Person B: „Und wo werden wir wohnen?"'),
  p('Person A: „Ich schaue gerade online — das Hotel ________________________ kostet ________ Euro pro Nacht."'),
  p('Person B: „Das klingt ________________________. Wann sollen wir buchen?"'),
  p('Person A: „Am besten sofort — wenn wir früh buchen, werden wir ________________________."'),
  ...gap(1),
  h2('Aufgabe 2 — Rollenspiel: Im Reisebüro'),
  stdTable(
    ['Kunde/Kundin (A)', 'Reisebüro-Mitarbeiterin (B)'],
    [
      ['Nennen Sie Ihr Reiseziel und den gewünschten Zeitraum.', 'Fragen Sie nach Details: Wie viele Personen? Welche Unterkunft?'],
      ['Fragen Sie nach dem günstigsten Transportmittel.', 'Vergleichen Sie Zug, Flugzeug und Fernbus (Preis / Dauer).'],
      ['Fragen Sie nach verfügbaren Hotels und deren Ausstattung.', 'Beschreiben Sie 2 Optionen (Preis, Lage, Frühstück).'],
      ['Entscheiden Sie sich und buchen Sie.', 'Nehmen Sie die Buchung auf und geben Sie eine Bestätigung.'],
    ],
    [5703, 5703]
  ),
  travelBox([
    'Beispiel-Angebote für das Rollenspiel:',
    'Zug (IC): Frankfurt → Köln, 1h 10 Min., 29 EUR Sparpreis',
    'Flugzeug: 45 Min., aber 70 EUR + 15 EUR Gepäck + Anfahrt Flughafen',
    'Hotel A: Stadtmitte, 3 Sterne, 75 EUR/Nacht, inkl. Frühstück',
    'Hotel B: Außenbezirk, 2 Sterne, 55 EUR/Nacht, ohne Frühstück',
  ]),
  ...gap(1),
  h2('Aufgabe 3 — Partnerinterview: Reisen'),
  stdTable(
    ['Frage', 'Antwort meines Partners / meiner Partnerin'],
    [
      ['Wohin sind Sie zuletzt gereist? Wie war es?', ''],
      ['Reisen Sie lieber mit dem Zug, dem Flugzeug oder dem Auto?', ''],
      ['Was ist Ihnen bei der Unterkunft am wichtigsten?', ''],
      ['Planen Sie schon Ihre nächste Reise?', ''],
      ['Welche Stadt in Deutschland möchten Sie noch besuchen?', ''],
    ],
    [5500, 6206]
  ),
  ...gap(1),
  h2('Aufgabe 4 — Gruppenspiel: „Meine Traumreise"'),
  p('Jede Person beschreibt kurz ihre Traumreise (3–4 Sätze). Die anderen stellen Fragen. Am Ende: Wessen Reise klingt am interessantesten?'),
  infoBox([
    'Leitfragen für die Beschreibung:',
    '1. Wohin? (Reiseziel und Zeitraum)',
    '2. Mit wem? (allein / mit Partner / mit Freunden)',
    '3. Wie? (Transportmittel und Unterkunft)',
    '4. Was? (Aktivitäten — Futur I: Ich werde … besuchen / machen)',
    '5. Warum? (weil-Satz mit Begründung)',
  ]),
], `${PREFIX}_Konversation.docx`);

// ── 5L. KONVERSATION LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Konversation: Reise planen und buchen'),
  h2('Aufgabe 1 — Bewertungskriterien Dialog'),
  bullet('Reiseziel konkret genannt mit Begründung (weil)'),
  bullet('Transportmittelvergleich mit Konjunktiv II (Ich denke, der Zug wäre günstiger …)'),
  bullet('Futur I korrekt verwendet (Wir werden … buchen / besuchen)'),
  bullet('Adjektivdeklination korrekt (den günstigen Zug / das schöne Hotel)'),
  bullet('Wenn-Satz korrekt (Wenn wir früh buchen, werden wir sparen.)'),
  ...gap(1),
  h2('Muster-Dialog (Ausschnitt)'),
  p('A: „Hast du Lust, nach Dresden zu fahren? Ich habe gehört, die Altstadt ist wunderschön."'),
  p('B: „Gute Idee! Wie werden wir reisen — mit dem Zug oder mit dem Auto?"'),
  p('A: „Ich denke, der Zug ist günstiger, weil wir einen Sparpreis buchen können."'),
  p('B: „Und das Hotel?" / A: „Das Hotel am Elbufer kostet 72 Euro pro Nacht — inkl. Frühstück."'),
  p('A: „Wenn wir jetzt buchen, werden wir noch einen Frühbucherrabatt bekommen!"'),
  ...gap(1),
  h2('Aufgabe 2 — Muster-Reisebüro-Gespräch'),
  p('A: „Ich möchte das Wochenende vom 20. bis 22. Mai in Köln verbringen, zu zweit."'),
  p('B: „Möchten Sie mit dem Zug oder dem Flugzeug reisen?"'),
  p('A: „Was ist günstiger?" / B: „Der Zug kostet 29 Euro mit Sparpreis, das Flugzeug 85 Euro."'),
  p('A: „Dann nehmen wir den Zug. Welches Hotel empfehlen Sie?"'),
  p('B: „Das Hotel Stadtmitte — 75 Euro mit Frühstück, zentrale Lage."'),
  p('A: „Perfekt. Ich würde gerne buchen." / B: „Gerne — darf ich Ihren Namen?"'),
  ...gap(1),
  h2('Aufgabe 4 — Spielhinweise'),
  p('Lehrkraft achtet auf: Futur I korrekt gebildet, Adjektivendungen, Wenn-Sätze mit Verbendstellung.', { italics: true, color: '888888' }),
], `${PREFIX}_Konversation_LOESUNG.docx`);

// ── 6. BILDAUFGABEN ───────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reise planen und buchen — Bildaufgaben'),
  h2('Aufgabe 1 — Transportmittel benennen'),
  p('[BILD 1: Fünf Bilder nebeneinander: (1) Hochgeschwindigkeitszug (ICE) auf Gleisen, (2) Flugzeug beim Start, (3) moderner Fernreisebus (FlixBus), (4) Auto auf der Autobahn, (5) Fähre auf dem Wasser]'),
  p('a) Schreibe das Transportmittel mit Artikel unter jedes Bild.'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5'],
    [['', '', '', '', '']],
    [2200, 2200, 2200, 2200, 2906]
  ),
  p('b) Welches Transportmittel benutzen Sie am liebsten für Reisen? Warum? Schreiben Sie 2 Sätze.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 2 — Zugverbindung lesen'),
  p('[BILD 2: Screenshot einer Bahnverbindung: Abfahrt München Hbf 08:32 Uhr — Ankunft Hamburg Hbf 13:44 Uhr. Zug: ICE 1207. 1 Umstieg in Hannover (10 Min. Aufenthalt). Preis: Sparpreis 49 EUR / Flexpreis 119 EUR / 1. Klasse 159 EUR. Noch 12 Plätze verfügbar. Buchbar online oder am Schalter.]'),
  p('a) Wie lange dauert die Fahrt von München nach Hamburg insgesamt?'),
  wLine(),
  p('b) Wo muss man umsteigen und wie lange ist der Aufenthalt?', { before: 120 }),
  wLine(),
  p('c) Wie viel spart man mit dem Sparpreis im Vergleich zum Flexpreis?', { before: 120 }),
  wLine(),
  p('d) Schreibe einen Satz über diese Verbindung mit einem Adjektiv im richtigen Kasus.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 3 — Hotelwebsite lesen'),
  p('[BILD 3: Ausschnitt einer Hotel-Website: „Hotel Zur Linde — Freiburg i. Br." — 3 Sterne — Zimmer: Einzelzimmer 69 EUR / Doppelzimmer 98 EUR — inkl. Frühstück — kostenlos stornierbar bis 48h vor Anreise — Lage: 800m vom Hauptbahnhof — Ausstattung: WLAN kostenlos, Parkplatz 8 EUR/Tag, Fahrradvermietung]'),
  p('a) Was kostet ein Doppelzimmer für zwei Nächte inklusive Frühstück?'),
  wLine(),
  p('b) Bis wann kann man kostenlos stornieren?', { before: 120 }),
  wLine(),
  p('c) Welche Ausstattung bietet das Hotel? Nenne drei Dinge.', { before: 120 }),
  wLine(),
  p('d) Beschreibe das Hotel in einem Satz und verwende ein Adjektiv mit Deklination.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  h2('Aufgabe 4 — Urlaubsfoto-Szene'),
  p('[BILD 4: Ein Paar steht vor einem berühmten Wahrzeichen (z. B. Brandenburger Tor / Kölner Dom / Neuschwanstein) mit einem Stadtplan in der Hand. Koffer und Rucksack stehen daneben. Beide lächeln.]'),
  p('a) Beschreibe die Szene in 2–3 Sätzen.'),
  wLine(), wLine(), wLine(),
  p('b) Was könnten die zwei Personen als nächstes machen? Schreibe 2 Sätze im Futur I.', { before: 120 }),
  wLine(), wLine(),
], `${PREFIX}_Bildaufgaben.docx`);

// ── 6L. BILDAUFGABEN LÖSUNG ───────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Bildaufgaben: Reise planen und buchen'),
  p('Hinweis: Lösungen hängen von den eingefügten Bildern ab.', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 1 — Transportmittel'),
  stdTable(
    ['Bild 1', 'Bild 2', 'Bild 3', 'Bild 4', 'Bild 5'],
    [['der Zug (ICE)', 'das Flugzeug', 'der Bus', 'das Auto', 'die Fähre']],
    [2200, 2200, 2200, 2200, 2906]
  ),
  p('b) Individuelle Antworten: Ich fahre am liebsten mit dem Zug, weil …', { italics: true, color: '888888' }),
  ...gap(1),
  h2('Aufgabe 2 — Zugverbindung'),
  p('a) Von 08:32 bis 13:44 Uhr = 5 Stunden 12 Minuten.'),
  p('b) Umstieg in Hannover, Aufenthalt 10 Minuten.'),
  p('c) Sparpreis: 49 EUR, Flexpreis: 119 EUR → Ersparnis: 70 EUR.'),
  p('d) Beispiel: Mit dem schnellen ICE kommt man in gut fünf Stunden von München nach Hamburg.'),
  ...gap(1),
  h2('Aufgabe 3 — Hotel'),
  p('a) Doppelzimmer: 98 EUR × 2 Nächte = 196 EUR (inkl. Frühstück für 2 Personen).'),
  p('b) Kostenlose Stornierung bis 48 Stunden vor Anreise.'),
  p('c) Kostenloses WLAN / Parkplatz (8 EUR/Tag) / Fahrradvermietung.'),
  p('d) Beispiel: Das günstige Hotel Zur Linde liegt nur 800 Meter vom Hauptbahnhof entfernt.'),
  ...gap(1),
  h2('Aufgabe 4 — Urlaubsfoto'),
  p('a) Ein Paar steht lächelnd vor einem bekannten Wahrzeichen. Die beiden halten einen Stadtplan und haben Koffer dabei — sie sind gerade angereist oder brechen bald auf.'),
  p('b) Beispiele: Sie werden jetzt ein Restaurant suchen und Mittagessen. / Am Nachmittag werden sie eine Stadtführung machen.'),
], `${PREFIX}_Bildaufgaben_LOESUNG.docx`);

console.log('\nFertig! 12 Dateien erstellt.');
})();
