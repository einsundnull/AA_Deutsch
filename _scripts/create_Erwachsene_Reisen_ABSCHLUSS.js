// A2_Erwachsene — Thema 07 ABSCHLUSS: Reisen
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, WidthType, BorderStyle, ShadingType,
  PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const TOPIC   = 'Reisen — ABSCHLUSS';
const HEADING = 'Thema 07 — Reisen';
const PREFIX  = 'A2_Erwachsene_Reisen_ABSCHLUSS';
const OUT_DIR = path.join(__dirname, '..', 'A2_Erwachsene', '07_Reisen', 'ABSCHLUSS');
const PAGE_W  = 11906;
const PAGE_H  = 16838;
const MARGIN  = 1134;

fs.mkdirSync(OUT_DIR, { recursive: true });
console.log('Erstelle ABSCHLUSS:', TOPIC);
console.log('Zielordner:', OUT_DIR);

const NUMBERING = {
  config: [{ reference: 'bullet-list', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 180 } } } }] }]
};

const hdr = () => ({ default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `A2 Erwachsene — ${HEADING} — ABSCHLUSS`, size: 18, color: '888888', italics: true, font: 'Arial' })] })] }) });
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

const tblHdr = (cells, widths) => new TableRow({ tableHeader: true, children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'D5E8F0' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, bold: true, size: 22, font: 'Arial' })] })] })) });
const tblRow = (cells, widths, shade = 'FFFFFF') => new TableRow({ children: cells.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: shade }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: 'Arial' })] })] })) });
const stdTable = (headers, rows, widths) => new Table({ width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA }, borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideH: { style: BorderStyle.SINGLE, size: 4 }, insideV: { style: BorderStyle.SINGLE, size: 4 } }, rows: [tblHdr(headers, widths), ...rows.map((r, i) => tblRow(r, widths, i % 2 === 0 ? 'FFFFFF' : 'F5F5F5'))] });

const save = async (children, filename) => {
  const doc = new Document({ numbering: NUMBERING, sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } }, headers: hdr(), footers: ftr(), children }] });
  fs.writeFileSync(path.join(OUT_DIR, filename), await Packer.toBuffer(doc));
  console.log('OK ', filename);
};

(async () => {

// ── ABSCHLUSS ─────────────────────────────────────────────────────────────────
await save([
  nameDate(), ...gap(1),
  h1('Reisen — Abschlussübung'),
  infoBox([
    'Diese Übung kombiniert alle drei Unterpunkte des Themas:',
    'UP 01: Reise planen und buchen',
    'UP 02: Unterwegs (Transportmittel, Orientierung)',
    'UP 03: Im Hotel',
  ]),
  ...gap(1),

  // ── Aufgabe 1: Lesetext ───────────────────────────────────────────────────
  h2('Aufgabe 1 — Lesetext: Ivans erste Reise nach München'),
  p('Ivan Horvatič kommt aus Kroatien und lebt seit einem Jahr in Nürnberg. Er arbeitet als Koch und hatte im März endlich eine freie Woche. Er hat beschlossen, München zu besuchen — die Stadt hat er noch nie gesehen, obwohl sie nur eine Stunde entfernt ist.'),
  p('Ivan hat alles sorgfältig geplant. Er hat die Verbindungen online verglichen: Der Regionalzug kostet nur 25 Euro hin und zurück mit dem Bayern-Ticket — günstiger als das Auto, wenn man Benzin und Parkgebühren einrechnet. Er hat das Ticket drei Tage vorher gebucht und ein Hotel in der Nähe des Hauptbahnhofs reserviert: das „Hotel Münchner Hof", zwei Sterne, 59 Euro pro Nacht inklusive Frühstück.'),
  p('Die Zugfahrt verlief problemlos. Am Münchner Hauptbahnhof angekommen, hat Ivan sich kurz orientiert. „Entschuldigung, wie komme ich zur Frauenkirche?", hat er einen Passanten gefragt. Der Mann hat freundlich geantwortet: „Nehmen Sie die U-Bahn Linie 3 oder 6 bis Marienplatz — das sind nur zwei Stationen. Von dort sehen Sie die Türme schon." Ivan hat eine Tageskarte für 8,80 Euro gekauft und ist losgefahren.'),
  p('Im Hotel lief das Einchecken glatt. Die Rezeptionistin hat erklärt: Frühstück ab 7 Uhr, WLAN kostenlos, Check-out bis 11 Uhr. Das Zimmer war klein, aber sauber und ruhig — Ivan war zufrieden. Am Abend hat er im Biergarten gegessen und Weißbier getrunken. „Das hätte ich schon früher machen sollen!", hat er in sein Tagebuch geschrieben.'),
  p('Am nächsten Morgen hat Ivan die Alte Pinakothek besucht — Eintrittspreis am Sonntag nur 1 Euro — und am Nachmittag ist er mit dem Rad am Englischen Garten entlanggefahren. Auf dem Rückweg hat er sich kurz verirrt, aber eine nette Dame hat ihm den Weg zur S-Bahn gezeigt. Um 20 Uhr war Ivan zurück in Nürnberg — müde, glücklich und schon mit Plänen für den nächsten Ausflug.'),
  ...gap(1),

  // ── Aufgabe 2: R/F ────────────────────────────────────────────────────────
  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'R / F'],
    [
      ['Ivan wohnt seit einem Jahr in Nürnberg.', ''],
      ['Das Bayern-Ticket hat 35 Euro gekostet.', ''],
      ['Das Hotel liegt in der Nähe des Hauptbahnhofs.', ''],
      ['Ivan hat nach dem Weg zur Frauenkirche gefragt.', ''],
      ['Ivan hat eine Wochenkarte für den ÖPNV gekauft.', ''],
      ['Der Eintritt zur Alten Pinakothek war am Sonntag günstig.', ''],
      ['Ivan hat sich auf dem Rückweg zur S-Bahn verirrt.', ''],
    ],
    [9000, 2706]
  ),
  ...gap(1),

  // ── Aufgabe 3: Gemischter Lückentext ──────────────────────────────────────
  h2('Aufgabe 3 — Gemischter Lückentext (alle drei Unterpunkte)'),
  infoBox([
    'Wörterkasten: reserviert  |  einchecken  |  Sparpreis  |  ausgebucht  |  verirrt',
    '              abgebogen  |  Tageskarte  |  Frühstück  |  vergleichen  |  Konjunktiv'
  ]),
  ...gap(1),
  p('Lara plant eine Reise nach Hamburg. Zuerst hat sie die Zugpreise online ________ und einen günstigen ________ für 39 Euro gefunden. Sie hat auch sofort ein Hotel ________ — zum Glück, denn zwei Tage später war das Hotel ________.'),
  p('Am Reisetag ist Lara am Hamburger Hauptbahnhof angekommen und hat in der U-Bahn eine ________ gekauft, um den ganzen Tag fahren zu können. Einmal hat sie sich ________, weil sie falsch ________ ist — aber eine Passantin hat ihr geholfen.', { before: 120 }),
  p('Im Hotel war das ________ sehr reichhaltig. Beim ________ hat Lara gesagt: „Ich ________ gerne ein ruhigeres Zimmer, wenn möglich" — das ist ein typischer ________ II, mit dem man höflich bittet.', { before: 120 }),
  ...gap(1),

  // ── Aufgabe 4: Fehlerkorrektur ────────────────────────────────────────────
  h2('Aufgabe 4 — Fehler korrigieren'),
  p('In jedem Satz steckt genau ein Fehler. Unterstreiche ihn und schreibe den korrekten Satz.'),
  ...gap(1),
  p('UP 01 — Reise planen und buchen:', { bold: true }),
  p('a)  Wir werden nach Wien fahren werden — das Ticket ist schon gebucht.'),
  wLine(), wLine(),
  p('b)  Ich suche die günstige Zug — er kostet nur 29 Euro mit Sparpreis.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 02 — Unterwegs:', { bold: true }),
  p('c)  Gehen Sie geradeaus bis zum Ampel und biegen Sie dann links ab.'),
  wLine(), wLine(),
  p('d)  Ich bin in die U-Bahn eingestiegen und habe bei Marienplatz ausgestiegen.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),
  p('UP 03 — Im Hotel:', { bold: true }),
  p('e)  Ich hätte gerne ein Zimmer — könnte Sie mir bitte den Schlüssel geben?'),
  wLine(), wLine(),
  p('f)  Das Frühstück des Hotels war sehr gut — die Qualität der Speise war ausgezeichnet.', { before: 120 }),
  wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 5: Schreiben ──────────────────────────────────────────────────
  h2('Aufgabe 5 — Schreiben: Mein letzter Ausflug'),
  p('Beschreiben Sie einen Ausflug oder eine Reise (real oder erfunden) in 6–8 Sätzen. Benutzen Sie Elemente aus allen drei Unterpunkten:'),
  bullet('Reise planen/buchen: Wie haben Sie gebucht? Was hat es gekostet? (Futur I oder Perfekt)'),
  bullet('Unterwegs: Wie sind Sie gereist? Haben Sie nach dem Weg gefragt? (Imperativ, Wechselpräpositionen)'),
  bullet('Im Hotel: Wo haben Sie gewohnt? Gab es Probleme? (Konjunktiv II, Genitiv)'),
  wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(), wLine(),
  ...gap(1),

  // ── Aufgabe 6: Rollenspiel ────────────────────────────────────────────────
  h2('Aufgabe 6 — Rollenspiel: Drei Stationen einer Reise'),
  p('Spielen Sie die Reise in drei Szenen durch. Jede Szene dauert ca. 3 Minuten.'),
  stdTable(
    ['Station', 'Person A', 'Person B'],
    [
      ['Station 1: Zugticket kaufen', 'Reisender — fragt nach günstigstem Ticket, Abfahrtszeit, Gleis.', 'Bahnmitarbeiter — gibt Auskunft, nennt Optionen und Preise.'],
      ['Station 2: Nach dem Weg fragen', 'Tourist — fragt nach Weg vom Bahnhof zum Hotel.', 'Passant — beschreibt den Weg mit Imperativ und Himmelsrichtungen.'],
      ['Station 3: Im Hotel einchecken', 'Gast — checkt ein, äußert einen Zimmerwunsch, fragt nach Services.', 'Rezeptionistin — begrüßt, erklärt Zimmer und Hausregeln.'],
    ],
    [2500, 4453, 4753]
  ),
  infoBox([
    'Sprachliche Ziele pro Station:',
    'Station 1: Futur I / Adjektivdeklination (den günstigen Sparpreis)',
    'Station 2: Imperativ (Sie-Form) / Wechselpräpositionen (Wohin? / Wo?)',
    'Station 3: Konjunktiv II (Ich hätte gerne … / Könnten Sie …?) / Genitiv',
  ]),
  ...gap(1),

  // ── Selbstevaluation ──────────────────────────────────────────────────────
  h2('Selbstevaluation — Das kann ich jetzt!'),
  stdTable(
    ['Ich kann …', 'gut', 'noch nicht sicher'],
    [
      ['eine Reise planen und Tickets buchen (auf Deutsch).', '', ''],
      ['Transportmittel vergleichen und eine Wahl begründen.', '', ''],
      ['nach dem Weg fragen und eine Wegbeschreibung geben.', '', ''],
      ['in einem Hotel einchecken und Wünsche höflich äußern.', '', ''],
      ['ein Problem im Hotel melden und eine Lösung erfragen.', '', ''],
      ['Futur I korrekt bilden und verwenden.', '', ''],
      ['Konjunktiv II für höfliche Bitten einsetzen.', '', ''],
    ],
    [7500, 1000, 3206]
  ),
], `${PREFIX}.docx`);

// ── ABSCHLUSS LÖSUNG ──────────────────────────────────────────────────────────
await save([
  h1('LÖSUNG — Abschlussübung: Reisen'),
  ...gap(1),

  h2('Aufgabe 2 — Richtig oder Falsch?'),
  stdTable(
    ['Aussage', 'Lösung'],
    [
      ['Ivan wohnt seit einem Jahr in Nürnberg.', 'R'],
      ['Das Bayern-Ticket hat 35 Euro gekostet.', 'F (25 Euro)'],
      ['Das Hotel liegt in der Nähe des Hauptbahnhofs.', 'R'],
      ['Ivan hat nach dem Weg zur Frauenkirche gefragt.', 'R'],
      ['Ivan hat eine Wochenkarte für den ÖPNV gekauft.', 'F (Tageskarte, 8,80 Euro)'],
      ['Der Eintritt zur Alten Pinakothek war am Sonntag günstig.', 'R (1 Euro)'],
      ['Ivan hat sich auf dem Rückweg zur S-Bahn verirrt.', 'R'],
    ],
    [8000, 3706]
  ),
  ...gap(1),

  h2('Aufgabe 3 — Lückentext'),
  p('1. verglichen  2. Sparpreis  3. reserviert  4. ausgebucht  5. Tageskarte'),
  p('6. verirrt  7. abgebogen  8. Frühstück  9. Einchecken  10. hätte  11. Konjunktiv'),
  p('Hinweis: Lücke 10 (hätte) und 11 (Konjunktiv) gehören zum selben Satz — beide akzeptieren.', { italics: true, color: '888888' }),
  ...gap(1),

  h2('Aufgabe 4 — Fehlerkorrektur'),
  grammarBox([
    'UP 01 — Reise planen (Futur I / Adjektivdeklination):',
    'a) FEHLER: „fahren werden" — Doppeltes werden!',
    '   RICHTIG: Wir werden nach Wien fahren — nur ein werden, Infinitiv am Ende.',
    '',
    'b) FEHLER: „die günstige Zug" — Zug ist maskulin!',
    '   RICHTIG: Ich suche den günstigen Zug (mask. Akk. → -en)',
  ]),
  ...gap(1),
  grammarBox([
    'UP 02 — Unterwegs (Artikel nach Präposition / Perfekt von aussteigen):',
    'c) FEHLER: „zum Ampel" — die Ampel ist feminin!',
    '   RICHTIG: Gehen Sie geradeaus bis zur Ampel (Dat. fem.: zur = zu der)',
    '',
    'd) FEHLER: „ausgestiegen" mit haben → aussteigen bildet Perfekt mit sein!',
    '   RICHTIG: bin bei Marienplatz ausgestiegen (Bewegungsverb → sein)',
  ]),
  ...gap(1),
  grammarBox([
    'UP 03 — Im Hotel (Konjunktiv II / Genitiv Plural):',
    'e) FEHLER: „könnte Sie" — Konjunktiv II Sie-Form = könnten (nicht könnte)',
    '   RICHTIG: Könnten Sie mir bitte den Schlüssel geben?',
    '',
    'f) FEHLER: „die Qualität der Speise" — es geht um mehrere Speisen (Buffet)',
    '   RICHTIG: die Qualität der Speisen (Genitiv Plural: der Speisen)',
  ]),
  ...gap(1),

  h2('Aufgabe 5 — Bewertungskriterien Reisebericht'),
  bullet('UP 01: Buchung/Planung erwähnt — Futur I ODER Perfekt korrekt'),
  bullet('UP 01: Adjektivdeklination korrekt (den günstigen Zug / das schöne Hotel)'),
  bullet('UP 02: Transportmittel genannt, ggf. Wegbeschreibung mit Imperativ'),
  bullet('UP 02: Wechselpräposition korrekt (in die U-Bahn / am Bahnhof)'),
  bullet('UP 03: Hotel erwähnt + Konjunktiv II für Bitte oder Wunsch'),
  bullet('6–8 vollständige, zusammenhängende Sätze'),
  ...gap(1),
  h2('Muster-Reisebericht'),
  p('Letzten Monat habe ich ein Wochenende in Köln verbracht. Ich habe ein Sparpreis-Ticket für 29 Euro online gebucht und ein kleines Hotel in der Nähe des Doms reserviert. Am Hauptbahnhof angekommen, habe ich eine Tageskarte für den ÖPNV gekauft und die U-Bahn genommen. Ich habe mich kurz verirrt — ein freundlicher Passant hat mir gesagt: „Biegen Sie rechts ab und gehen Sie dann geradeaus." Im Hotel hätte ich gerne ein ruhigeres Zimmer gehabt, aber das Personal war sehr hilfsbereit und hat mir Tipps für Restaurants gegeben. Das Frühstück des Hotels war ausgezeichnet. Ich würde diese Reise jedem empfehlen!'),
  ...gap(1),

  h2('Aufgabe 6 — Bewertungskriterien Rollenspiel'),
  bullet('Station 1: Futur I korrekt / Adjektiv mit -en bei mask. Akk.'),
  bullet('Station 2: Imperativ (Sie-Form) korrekt, auch trennbare Verben'),
  bullet('Station 3: Konjunktiv II (hätte / könnten) / Genitiv in Beschreibung'),
  bullet('Alle drei Stationen: durchgehende Sie-Form, höflicher Ton'),
  bullet('Natürlicher Gesprächsfluss, alle Schritte pro Station abgedeckt'),
], `${PREFIX}_LOESUNG.docx`);

console.log('\nFertig! 2 Dateien erstellt.');
})();
