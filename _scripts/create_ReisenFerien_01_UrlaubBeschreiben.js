"use strict";
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, Header, Footer, PageNumber,
  LevelFormat, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "A2_Kinder", "07_ReisenFerien", "01_UrlaubBeschreiben");
const TOPIC     = "A2_Kinder_ReisenFerien_01_UrlaubBeschreiben";
const BLUE  = "1F4E79";
const GRAY  = "888888";
const LIGHT = "D5E8F0";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134;

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const NUMBERING = {
  config: [{
    reference: "bullets", levels: [{
      level: 0, numFmt: LevelFormat.BULLET,
      text: "u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  }]
};

function h1(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 28, color: BLUE, font: "Arial" })], spacing: { before: 200, after: 100 } }); }
function h2(t) { return new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 24, color: BLUE, font: "Arial" })], spacing: { before: 160, after: 80 } }); }
function p(t, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text: t, size: opts.size || 22, font: "Arial", color: opts.color || "000000", bold: opts.bold || false, italics: opts.italic || false })],
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 60, after: opts.after || 60 },
  });
}
function pBold(t, opts = {}) { return p(t, { ...opts, bold: true }); }
function pItalic(t, opts = {}) { return p(t, { ...opts, italic: true }); }
function empty() { return new Paragraph({ children: [new TextRun({ text: "", size: 22, font: "Arial" })], spacing: { before: 40, after: 40 } }); }
function bullet(t) { return new Paragraph({ children: [new TextRun({ text: t, size: 22, font: "Arial" })], numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 } }); }
function hCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: opts.size || 20, font: "Arial", color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
  });
}
function dCell(t, opts = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: t, size: opts.size || 20, font: "Arial" })], alignment: opts.align || AlignmentType.LEFT })],
    shading: opts.shade ? { fill: LIGHT, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    ...(opts.width ? { width: { size: opts.width, type: WidthType.DXA } } : {}),
    ...(opts.colspan ? { columnSpan: opts.colspan } : {}),
  });
}
function writeLine(n) { return new Paragraph({ children: [new TextRun({ text: "_".repeat(n || 60), size: 22, font: "Arial", color: GRAY })], spacing: { before: 60, after: 60 } }); }
function writeLines(count, n) { const arr = []; for (let i = 0; i < count; i++) { arr.push(writeLine(n)); arr.push(empty()); } return arr; }
function studentHead() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
    rows: [new TableRow({ children: [dCell("Name: ______________________________", { width: 4500 }), dCell("Klasse: ____________", { width: 2200 }), dCell("Datum: ____________", { width: 2200 })] })],
  });
}
function makeHeader() { return new Header({ children: [new Paragraph({ children: [new TextRun({ text: TOPIC, size: 18, color: GRAY, font: "Arial" })], alignment: AlignmentType.RIGHT })] }); }
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Seite ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: "Arial" }), new TextRun({ text: " von ", size: 18, color: GRAY, font: "Arial" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: "Arial" })] })] });
}
function save(fname, sections) {
  const doc = new Document({
    numbering: NUMBERING,
    sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, headers: { default: makeHeader() }, footers: { default: makeFooter() }, children: sections }]
  });
  Packer.toBuffer(doc).then(buf => { fs.writeFileSync(path.join(OUTPUT_DIR, fname), buf); console.log("OK ", fname); }).catch(e => console.error("FEHLER", fname, e.message));
}

// ── Wortliste-Tabelle ─────────────────────────────────────────────────────────
function makeWortlisteTable() {
  return new Table({
    width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
    rows: [
      new TableRow({ children: [hCell("Wort / Ausdruck", { width: 2600 }), hCell("Wortart", { width: 1400 }), hCell("Beispielsatz", { width: 5638 })] }),
      new TableRow({ children: [dCell("der Urlaub (-e)"), dCell("Nomen"), dCell("Diesen Sommer fahren wir in den Urlaub.")] }),
      new TableRow({ children: [dCell("die Ferien (Pl.)"), dCell("Nomen"), dCell("In den Ferien schlafe ich lange.")] }),
      new TableRow({ children: [dCell("der Strand (Straende)"), dCell("Nomen"), dCell("Am Strand spielen wir im Sand.")] }),
      new TableRow({ children: [dCell("das Meer (-e)"), dCell("Nomen"), dCell("Das Meer ist blau und warm.")] }),
      new TableRow({ children: [dCell("die Berge (Pl.)"), dCell("Nomen"), dCell("In den Bergen wandern wir jeden Tag.")] }),
      new TableRow({ children: [dCell("der Koffer (-)"), dCell("Nomen"), dCell("Ich packe meinen Koffer fuer den Urlaub.")] }),
      new TableRow({ children: [dCell("die Sonnencreme"), dCell("Nomen"), dCell("Vergiss nicht die Sonnencreme am Strand!")] }),
      new TableRow({ children: [dCell("die Sehenswuerdigkeit (-en)"), dCell("Nomen"), dCell("In Rom gibt es viele Sehenswuerdigkeiten.")] }),
      new TableRow({ children: [dCell("verreisen"), dCell("Verb"), dCell("Wir verreisen jedes Jahr im Sommer.")] }),
      new TableRow({ children: [dCell("Es hat Spass gemacht!"), dCell("Ausdruck"), dCell("Das Schwimmen im Meer hat so viel Spass gemacht!")] }),
      new TableRow({ children: [dCell("Es war wunderschoen."), dCell("Ausdruck"), dCell("Der Urlaub war wunderschoen — ich moechte wiederkommen.")] }),
      new TableRow({ children: [dCell("Ich war zum ersten Mal in ..."), dCell("Ausdruck"), dCell("Ich war zum ersten Mal in Oesterreich.")] }),
      new TableRow({ children: [dCell("Es hat mir gut gefallen."), dCell("Ausdruck"), dCell("Der Strand hat mir sehr gut gefallen.")] }),
    ],
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
  });
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function schreiben() {
  save(`${TOPIC}_Schreiben.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Urlaub beschreiben"), empty(),
    pBold("Aufgabe 1: Ordne die Woerter in die richtige Kategorie."),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Strand  -  Berge  -  Sonnencreme  -  Koffer  -  Wandern  -  Schwimmen  -  Sonnenschirm  -  Skipiste  -  Sandburg  -  Wanderschuhe  -  Sonnenbaden  -  Schnee")],
      })]})],
    }),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Urlaub am Meer / Strand", { width: 4700 }), hCell("Urlaub in den Bergen", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
        new TableRow({ children: [dCell("", { width: 4700 }), dCell("", { width: 4700 })] }),
      ],
    }),
    empty(), empty(),
    pBold("Aufgabe 2: Schreib Saetze im Perfekt."),
    pItalic("Muster: (wir / Koffer packen) → Wir haben den Koffer gepackt."),
    empty(),
    p("1. (ich / am Strand schwimmen)  →  ___________________________________"),
    writeLine(50), empty(),
    p("2. (wir / eine Burg aus Sand bauen)  →  ___________________________________"),
    writeLine(50), empty(),
    p("3. (mein Vater / viele Fotos machen)  →  ___________________________________"),
    writeLine(50), empty(),
    p("4. (wir / ins Hotel fahren)  →  ___________________________________"),
    writeLine(50), empty(), empty(),
    pBold("Aufgabe 3: Beschreibe deinen Traumurlaub in 5-6 Saetzen."),
    p("Wo moechtest du hinfahren? Was moechtest du dort machen? Mit wem?"),
    empty(),
    ...writeLines(6, 55),
  ]);
}

function schreiben_L() {
  save(`${TOPIC}_Schreiben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Schreiben – Urlaub beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Urlaub am Meer / Strand", { width: 4700 }), hCell("Urlaub in den Bergen", { width: 4700 })] }),
        new TableRow({ children: [dCell("Strand, Sonnencreme, Schwimmen"), dCell("Berge, Wandern, Skipiste")] }),
        new TableRow({ children: [dCell("Sonnenschirm, Sandburg, Sonnenbaden"), dCell("Wanderschuhe, Schnee")] }),
        new TableRow({ children: [dCell("Koffer (passt zu beiden)"), dCell("Koffer (passt zu beiden)")] }),
      ],
    }),
    pItalic("Hinweis: 'Koffer' kann beiden Kategorien zugeordnet werden — beide Antworten akzeptieren."),
    empty(),
    pBold("Aufgabe 2: Musterloesung Perfekt"),
    bullet("1. Ich bin am Strand geschwommen.  (sein + geschwommen — Bewegungsverb!)"),
    bullet("2. Wir haben eine Burg aus Sand gebaut."),
    bullet("3. Mein Vater hat viele Fotos gemacht."),
    bullet("4. Wir sind ins Hotel gefahren.  (sein + gefahren — Bewegungsverb!)"),
    pItalic("Achtung: schwimmen und fahren bilden Perfekt mit 'sein', nicht mit 'haben'."),
    empty(),
    pBold("Aufgabe 3: individuelle Antworten"),
    pItalic("Muster: Mein Traumurlaub ist am Meer in Spanien. Ich moechte jeden Tag schwimmen und am Strand liegen. Mit meiner Familie moechte ich ein Boot mieten. Abends moechten wir leckeres Essen probieren. Das waere wunderschoen!"),
  ]);
}

// ── LESEN ─────────────────────────────────────────────────────────────────────
function lesen() {
  save(`${TOPIC}_Lesen.docx`, [
    studentHead(), empty(),
    h1("Lesen – Urlaub beschreiben"), empty(),
    pBold("Lies den Text."), empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          p("Mein bester Urlaub"),
          empty(),
          p("Letzten Sommer sind wir nach Kroatien gefahren. Das war mein bisher bester Urlaub!"),
          p("Wir waren zwei Wochen lang am Meer. Unser Hotel war direkt am Strand — ich konnte morgens aufwachen und sofort das Wasser sehen. Das Meer war super warm und wunderschoen blau."),
          p("Jeden Tag sind mein Bruder Noah und ich schwimmen gegangen. Wir haben auch Schnorcheln ausprobiert — ich habe zum ersten Mal bunte Fische unter Wasser gesehen! Das war unglaublich."),
          p("An einem Regentag sind wir in eine alte Stadt gefahren und haben Sehenswuerdigkeiten angeschaut. Dort haben wir leckeres Eis gegessen und viele Fotos gemacht."),
          p("Am letzten Abend haben wir am Strand ein Lagerfeuer gemacht und Marshmallows gegrillt. Das hat so viel Spass gemacht — ich wuerde am liebsten sofort wieder hinfahren!"),
        ],
      })]})],
    }),
    empty(),
    pBold("Aufgabe 1: Richtig (R) oder Falsch (F)?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Sie waren drei Wochen in Kroatien."), dCell("")] }),
        new TableRow({ children: [dCell("Das Hotel war direkt am Strand."), dCell("")] }),
        new TableRow({ children: [dCell("Der Erzaehler hat zum ersten Mal Schnorcheln ausprobiert."), dCell("")] }),
        new TableRow({ children: [dCell("An einem Regentag sind sie ins Kino gegangen."), dCell("")] }),
        new TableRow({ children: [dCell("Am letzten Abend haben sie am Strand ein Lagerfeuer gemacht."), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Beantworte die Fragen."),
    empty(),
    p("1. Wohin sind sie in den Urlaub gefahren?"),
    writeLine(55), empty(),
    p("2. Was war das Besondere am Schnorcheln?"),
    writeLine(55), empty(),
    p("3. Was haben sie an dem Regentag gemacht?"),
    writeLine(55), empty(),
    p("4. Was sagt der Text darueber, ob der Erzaehler gerne wiederkommen wuerde?"),
    writeLine(55), empty(),
    pBold("Aufgabe 3: Suche im Text alle Verben im Perfekt und schreib sie hier auf."),
    pItalic("(Mindestens 5 finden)"),
    writeLine(55), writeLine(55),
  ]);
}

function lesen_L() {
  save(`${TOPIC}_Lesen_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lesen – Urlaub beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: R/F"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Aussage", { width: 7500 }), hCell("R / F", { width: 2000 })] }),
        new TableRow({ children: [dCell("Sie waren drei Wochen in Kroatien."), dCell("F (zwei Wochen)")] }),
        new TableRow({ children: [dCell("Das Hotel war direkt am Strand."), dCell("R")] }),
        new TableRow({ children: [dCell("Der Erzaehler hat zum ersten Mal Schnorcheln ausprobiert."), dCell("R")] }),
        new TableRow({ children: [dCell("An einem Regentag sind sie ins Kino gegangen."), dCell("F (in eine alte Stadt gefahren)")] }),
        new TableRow({ children: [dCell("Am letzten Abend haben sie am Strand ein Lagerfeuer gemacht."), dCell("R")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Nach Kroatien (ans Meer)."),
    bullet("2. Er hat zum ersten Mal bunte Fische unter Wasser gesehen."),
    bullet("3. Sie sind in eine alte Stadt gefahren, haben Sehenswuerdigkeiten angeschaut, Eis gegessen und Fotos gemacht."),
    bullet("4. Er wuerde am liebsten sofort wieder hinfahren — das war sein bisher bester Urlaub."),
    empty(),
    pBold("Aufgabe 3: Perfekt-Verben im Text"),
    bullet("sind ... gefahren / waren / haben ... ausprobiert / habe ... gesehen / sind ... gegangen"),
    bullet("haben ... angeschaut / haben ... gegessen / haben ... gemacht / hat ... gemacht"),
    pItalic("Hinweis: 'sein + Partizip' (gefahren, gegangen) = Bewegungsverb → Hilfsverb sein."),
    pItalic("'haben + Partizip' (gemacht, gegessen, gesehen) = kein Bewegungsverb → Hilfsverb haben."),
  ]);
}

// ── LUECKENTEXT ───────────────────────────────────────────────────────────────
function luecken() {
  save(`${TOPIC}_Luecken.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Urlaub beschreiben"), empty(),
    pBold("Woerterkasten:"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [p("Strand  -  Meer  -  gefahren  -  gemacht  -  geschwommen  -  Koffer  -  Ferien  -  wunderschoen  -  Sehenswuerdigkeiten  -  gefallen  -  Hotel  -  ersten  -  Spass  -  warm")],
      })]})],
    }),
    empty(),
    pBold("Teil 1: Ergaenze die Saetze."),
    empty(),
    p("1. In den __________________ fahren wir immer ans Meer."),
    p("2. Ich packe meinen __________________ mit Badehose, Sonnencreme und Buch."),
    p("3. Das __________________ war super __________________ — fast wie in der Badewanne!"),
    p("4. Wir haben im __________________ eine Sandburg gebaut."),
    p("5. Unser __________________ war direkt am Strand — das hat mir sehr gut __________________."),
    p("6. Der Urlaub war __________________ — ich moechte unbedingt wiederkommen!"),
    p("7. Wir sind zum __________________ Mal nach Spanien __________________."),
    p("8. In der Stadt haben wir alte __________________ angeschaut."),
    empty(),
    pBold("Teil 2: Dialog — Urlaubsgespraech"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2400 }), hCell("Was sagt sie/er?", { width: 7200 })] }),
        new TableRow({ children: [dCell("Finn"), dCell("Hey Julia! Wie waren deine __________________?")] }),
        new TableRow({ children: [dCell("Julia"), dCell("Super! Wir sind ans __________________ gefahren.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Cool! Was habt ihr da __________________ ?")] }),
        new TableRow({ children: [dCell("Julia"), dCell("Wir sind jeden Tag __________________ und haben __________________ gemacht.")] }),
        new TableRow({ children: [dCell("Finn"), dCell("Hat es dir gut __________________?")] }),
        new TableRow({ children: [dCell("Julia"), dCell("Ja, es hat so viel __________________ gemacht!")] }),
      ],
    }),
    empty(),
    pBold("Teil 3: Dein Urlaub — schreib selbst."),
    empty(),
    p("Im Urlaub bin ich nach __________________ gefahren. Das war __________________. Wir haben __________________"),
    writeLine(55),
    p("Das hat mir gut __________________, weil __________________."),
    writeLine(55),
  ]);
}

function luecken_L() {
  save(`${TOPIC}_Luecken_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Lueckentext – Urlaub beschreiben (LOESUNG)"), empty(),
    pBold("Teil 1:"),
    bullet("1. Ferien"),
    bullet("2. Koffer"),
    bullet("3. Meer — warm"),
    bullet("4. Strand"),
    bullet("5. Hotel — gefallen"),
    bullet("6. wunderschoen"),
    bullet("7. ersten — gefahren"),
    bullet("8. Sehenswuerdigkeiten"),
    pItalic("Nicht verwendet (Ablenkwoerter): gemacht, geschwommen, Spass"),
    empty(),
    pBold("Teil 2: Musterloesung Dialog"),
    bullet("Finn: Ferien"),
    bullet("Julia (1): Meer"),
    bullet("Finn: gemacht"),
    bullet("Julia (2): geschwommen — Spass / Fotos gemacht (eigene Antworten akzeptieren)"),
    bullet("Finn: gefallen"),
    bullet("Julia (3): Spass"),
    empty(),
    pBold("Teil 3: individuelle Antworten"),
    pItalic("Muster: Im Urlaub bin ich nach Italien gefahren. Das war wunderschoen. Wir haben Pasta gegessen und Sehenswuerdigkeiten besucht. Das hat mir gut gefallen, weil es so viel zu sehen gab."),
  ]);
}

// ── WORTLISTE ─────────────────────────────────────────────────────────────────
function wortliste() {
  save(`${TOPIC}_Wortliste.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Urlaub beschreiben"), empty(),
    makeWortlisteTable(),
    empty(),
    h2("Grammatik-Hinweis: Perfekt mit 'haben' oder 'sein'?"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("haben + Partizip", { width: 4700 }), hCell("sein + Partizip", { width: 4700 })] }),
        new TableRow({ children: [dCell("Ich habe gepackt."), dCell("Ich bin gefahren.")] }),
        new TableRow({ children: [dCell("Wir haben gegessen."), dCell("Wir sind geschwommen.")] }),
        new TableRow({ children: [dCell("Er hat Fotos gemacht."), dCell("Sie ist gelaufen.")] }),
        new TableRow({ children: [dCell("Sie hat Eis gekauft."), dCell("Er ist ins Hotel gegangen.")] }),
        new TableRow({ children: [dCell("→ die meisten Verben"), dCell("→ Bewegungsverben (fahren, gehen, laufen, schwimmen, fliegen...)")] }),
      ],
    }),
    empty(),
    pBold("Wichtige Ortsangaben im Urlaub:"),
    bullet("am Strand / am Meer / am See / am Pool"),
    bullet("im Hotel / im Zelt / auf dem Campingplatz"),
    bullet("in den Bergen / auf dem Berg"),
    bullet("in der Stadt / in der Altstadt"),
    bullet("an der Kueste / auf einer Insel"),
    empty(),
    pBold("Aufgabe: Schreib 5 Saetze ueber einen echten oder erfundenen Urlaub im Perfekt."),
    ...writeLines(5, 55),
  ]);
}

function wortliste_L() {
  save(`${TOPIC}_Wortliste_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Wortliste – Urlaub beschreiben (LOESUNG)"), empty(),
    makeWortlisteTable(),
    empty(),
    pBold("Lernhinweise fuer die Lehrkraft:"),
    bullet("Perfekt-Hilfsverb: haben = Verben ohne Ortswechsel (essen, machen, kaufen, sehen...)"),
    bullet("Perfekt-Hilfsverb: sein = Bewegungsverben mit Ziel (fahren, gehen, laufen, schwimmen, fliegen, kommen, steigen, reisen)"),
    bullet("Auch sein + Zustandswechsel: einschlafen, aufwachen, werden"),
    bullet("war = Praeteritum von sein (nicht Perfekt — haeufiger Fehler: 'Ich habe gewesen' ist falsch!)"),
    empty(),
    pBold("Loesung Aufgabe — Mustersaetze"),
    bullet("Wir sind nach Oesterreich gefahren."),
    bullet("Ich habe im Hotel ein leckeres Fruehstueck gegessen."),
    bullet("Meine Schwester ist im Meer geschwommen."),
    bullet("Wir haben viele Sehenswuerdigkeiten besucht."),
    bullet("Es hat so viel Spass gemacht — das war wunderschoen!"),
    pItalic("Auf Hilfsverb (haben/sein) und Partizipform achten."),
  ]);
}

// ── KONVERSATION ──────────────────────────────────────────────────────────────
function konversation() {
  save(`${TOPIC}_Konversation.docx`, [
    studentHead(), empty(),
    h1("Konversation – Urlaub beschreiben"), empty(),
    pBold("Dialog 1: Vom Urlaub erzaehlen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Hallo alle zusammen! Wie waren eure Sommerferien? Lukas, erzaehl mal!")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Wir sind ans Meer gefahren, nach Portugal. Es war super!")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Toll! Was habt ihr dort gemacht?")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Wir sind viel geschwommen und haben jeden Abend draussen gegessen. Das Essen war unglaublich lecker!")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Wie lange wart ihr da?")] }),
        new TableRow({ children: [dCell("Lukas"), dCell("Zehn Tage. Ich war traurig, als wir wieder nach Hause mussten.")] }),
        new TableRow({ children: [dCell("Lehrer"), dCell("Das verstehe ich! Und du, Mia — wo warst du?")] }),
        new TableRow({ children: [dCell("Mia"), dCell("Ich war in den Bergen bei meiner Oma. Wir haben viel gewandert und Kaese gegessen!")] }),
      ],
    }),
    empty(),
    pBold("Dialog 2: Urlaubsplaene besprechen"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Person", { width: 2200 }), hCell("Was sagt sie/er?", { width: 7300 })] }),
        new TableRow({ children: [dCell("Hanna"), dCell("Wohin faehrst du in den Sommerferien?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Wir fahren nach Frankreich — an die Atlantikkueste!")] }),
        new TableRow({ children: [dCell("Hanna"), dCell("Oh cool! Faehrst du lieber ans Meer oder in die Berge?")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Ich fahre lieber ans Meer. Das Schwimmen macht mir am meisten Spass. Und du?")] }),
        new TableRow({ children: [dCell("Hanna"), dCell("Ich fahre lieber in die Berge. Da kann man so toll wandern und die Luft ist so frisch.")] }),
        new TableRow({ children: [dCell("Ben"), dCell("Stimmt, das hat auch was. Vielleicht fahren wir naechstes Jahr in die Alpen!")] }),
      ],
    }),
    empty(),
    pBold("Partnerinterview: Urlaub"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Frage", { width: 5500 }), hCell("Antwort Partner/in", { width: 4000 })] }),
        new TableRow({ children: [dCell("Wohin faehrst du am liebsten in den Urlaub?"), dCell("")] }),
        new TableRow({ children: [dCell("Meer oder Berge?"), dCell("")] }),
        new TableRow({ children: [dCell("Was packst du immer in den Koffer?"), dCell("")] }),
        new TableRow({ children: [dCell("Was hast du im letzten Urlaub gemacht?"), dCell("")] }),
        new TableRow({ children: [dCell("Was ist dein Traumurlaub?"), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Gruppenspiel: Welches Land ist das?"),
    bullet("Eine Person denkt an ein Land / eine Urlaubsart (Meer, Berge, Stadt...)."),
    bullet("Die anderen stellen Ja/Nein-Fragen: 'Ist es warm da?' / 'Kann man dort schwimmen?'"),
    bullet("Wer das Land raet, ist als Naechstes dran."),
  ]);
}

function konversation_L() {
  save(`${TOPIC}_Konversation_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Konversation – Urlaub beschreiben (LOESUNG)"), empty(),
    pBold("Dialog 1: Schluesselstrukturen"),
    bullet("Wie waren eure Ferien? = W-Frage im Praeteritum (war = Praeteritum von sein)"),
    bullet("Wir sind ... gefahren = Perfekt mit sein (Bewegungsverb)"),
    bullet("Wir haben ... gemacht / gegessen = Perfekt mit haben"),
    bullet("Wie lange wart ihr da? = Frage nach Dauer (wart = Praeteritum von sein, 2. Person Plural)"),
    bullet("als wir ... mussten = Nebensatz mit als (Praeteritum)"),
    empty(),
    pBold("Dialog 2: Schluesselstrukturen"),
    bullet("Wohin faehrst du? = Frage nach Reiseziel (Akkusativ nach fahren)"),
    bullet("Faehrst du lieber ... oder ...? = Vergleichsfrage mit lieber"),
    bullet("macht mir am meisten Spass = Superlativ"),
    bullet("Das hat auch was. = umgangssprachlich fuer 'Das ist auch schoen.'"),
    empty(),
    pBold("Bewertungskriterien Partnerinterview:"),
    bullet("Ortsangabe korrekt (ans Meer, in die Berge, nach + Landesname)"),
    bullet("Perfekt korrekt gebildet (haben/sein + Partizip)"),
    bullet("Mindestens eine Bewertung des Urlaubs (Es war ..., Es hat Spass gemacht, Es hat mir gefallen)"),
  ]);
}

// ── BILDAUFGABEN ──────────────────────────────────────────────────────────────
function bildaufgaben() {
  save(`${TOPIC}_Bildaufgaben.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Urlaub beschreiben"), empty(),
    pBold("Aufgabe 1: Schau dir die Urlaubsbilder an und beschreibe sie."),
    p("[BILD 1: Vier Bilder — Strand mit blauem Meer, Berglandschaft mit Wanderweg, Stadtansicht mit alten Gebaeuden, Campingplatz mit Zelten]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1500 }), hCell("Was siehst du?", { width: 4000 }), hCell("Was kann man hier machen?", { width: 4000 })] }),
        new TableRow({ children: [dCell("Bild A"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Bild B"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Bild C"), dCell(""), dCell("")] }),
        new TableRow({ children: [dCell("Bild D"), dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Urlaubspostkarte lesen."),
    p("[BILD 2: Postkarte — Vorderseite: Bild vom Strand mit Palmen. Rueckseite: 'Liebe Oma, viele Gruesse aus Mallorca! Das Meer ist wunderschoen und das Wetter super. Wir schwimmen jeden Tag und essen leckere Sachen. Das Hotel ist toll. Ich vermisse dich! Deine Emilia']"),
    empty(),
    p("1. Woher schreibt Emilia die Postkarte? ____________________"),
    p("2. Wie ist das Wetter? ____________________"),
    p("3. Was macht Emilia jeden Tag? ____________________"),
    p("4. An wen schreibt sie? ____________________"),
    empty(),
    pBold("Aufgabe 3: Koffer packen — was nimmst du mit?"),
    p("[BILD 3: Offener Koffer mit Gegenstaenden rundherum: Sonnencreme, Buch, Badeanzug, Regenjacke, Kamera, Woeerterbuch, Wanderschuhe, Sandalen, Sonnenhut, Reisepass]"),
    empty(),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Urlaub am Meer", { width: 4700 }), hCell("Urlaub in den Bergen", { width: 4700 })] }),
        new TableRow({ children: [dCell("Ich packe ein: _______________"), dCell("Ich packe ein: _______________")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
        new TableRow({ children: [dCell(""), dCell("")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 4: Schreib deine eigene Urlaubspostkarte."),
    p("[BILD 4: Leere Postkarten-Vorlage (Vorder- und Rueckseite)]"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 160, right: 160 },
        width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
        children: [
          p("Liebe(r) ____________________,"),
          empty(),
          writeLine(52),
          writeLine(52),
          writeLine(52),
          writeLine(52),
          empty(),
          p("Herzliche Grueße, ____________________"),
        ],
      })]})],
    }),
  ]);
}

function bildaufgaben_L() {
  save(`${TOPIC}_Bildaufgaben_LOESUNG.docx`, [
    studentHead(), empty(),
    h1("Bildaufgaben – Urlaub beschreiben (LOESUNG)"), empty(),
    pBold("Aufgabe 1: Musterloesung (abhaengig von Bildern)"),
    new Table({
      width: { size: PAGE_W - 2 * MARGIN, type: WidthType.DXA },
      rows: [
        new TableRow({ children: [hCell("Bild", { width: 1500 }), hCell("Was siehst du?", { width: 4000 }), hCell("Was kann man hier machen?", { width: 4000 })] }),
        new TableRow({ children: [dCell("Bild A"), dCell("Strand, Meer, Sand, Wellen"), dCell("schwimmen, Sandburg bauen, sonnenbaden")] }),
        new TableRow({ children: [dCell("Bild B"), dCell("Berge, Wald, Wanderweg"), dCell("wandern, Fotos machen, Natur erleben")] }),
        new TableRow({ children: [dCell("Bild C"), dCell("Alte Gebaeude, Kirche, Gassen"), dCell("Sehenswuerdigkeiten anschauen, Eis essen, bummeln")] }),
        new TableRow({ children: [dCell("Bild D"), dCell("Zelte, Baeume, Natur"), dCell("zelten, Feuer machen, Sterne anschauen")] }),
      ],
    }),
    empty(),
    pBold("Aufgabe 2: Antworten"),
    bullet("1. Aus Mallorca (Spanien)."),
    bullet("2. Das Wetter ist super."),
    bullet("3. Sie schwimmt."),
    bullet("4. An ihre Oma."),
    empty(),
    pBold("Aufgabe 3: Musterloesung"),
    bullet("Urlaub am Meer: Sonnencreme, Badeanzug, Sonnenhut, Sandalen, Buch, Kamera"),
    bullet("Urlaub in den Bergen: Wanderschuhe, Regenjacke, Kamera, Buch"),
    bullet("Reisepass passt zu beiden. Andere begruendete Antworten akzeptieren."),
    empty(),
    pBold("Aufgabe 4: individuelle Antworten"),
    pItalic("Bewertung: Anrede, Ortsangabe (Gruesse aus ...), Wetterbeschreibung oder Aktivitaet, Abschlussgruss."),
    pItalic("Muster: Liebe Oma, viele Gruesse aus Oesterreich! Wir wandern jeden Tag in den Bergen. Die Luft ist so frisch und es ist wunderschoen hier. Heute habe ich einen Adler gesehen! Herzliche Grueße, ..."),
  ]);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
console.log("Erstelle Unterpunkt: Urlaub beschreiben");
console.log("Zielordner:", OUTPUT_DIR);
schreiben(); schreiben_L();
lesen(); lesen_L();
luecken(); luecken_L();
wortliste(); wortliste_L();
konversation(); konversation_L();
bildaufgaben(); bildaufgaben_L();
console.log("\nFertig! 12 Dateien erstellt.");
