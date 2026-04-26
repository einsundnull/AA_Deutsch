# CLAUDE.md — Deutschunterricht Übungsprojekt

> Diese Datei liegt im Projektordner: `C:\Users\pc\Desktop\Standard Files\AA Deutsch`
> Sie wird Claude Code bei jedem Start automatisch als Kontext übergeben.

---

## Aufgabe

Du erstellst ein vollständiges Übungsmaterial-Archiv für den Deutschunterricht (A1–B2).
Alle Materialien entstehen als `.docx`-Dateien, die ausgedruckt oder als PDF konvertiert werden können.

Den aktuellen Arbeitsstand findest du immer in `progress.txt` (gleicher Ordner).
**Lies `progress.txt` zuerst, bevor du irgendetwas tust.**

---

## Struktur-Schema — IMMER EINHALTEN

```
Zielgruppe → Niveau → Thema → Unterpunkt → Übungstypen
```

**Zielgruppen:** Kinder/Jugendliche | Erwachsene
**Niveaus:** A1, A2, B1, B2
**Themen:** z. B. „Sich selbst vorstellen", „Familie" (siehe Referenzdatei)
**Unterpunkte:** z. B. „Name sagen und erfragen", „Alter sagen und erfragen"

### Pro Unterpunkt werden IMMER genau diese 6 Materialien erstellt:

| Nr | Typ | Datei-Kürzel |
|----|-----|-------------|
| 1 | Schreibübung | `Schreiben` |
| 2 | Leseübung (kurzer Text + Aufgaben) | `Lesen` |
| 3 | Lückentext | `Luecken` |
| 4 | Wortliste (Tabelle + Übersetzungszeile) | `Wortliste` |
| 5 | Konversationsteil (Dialoggerüste, Partnerübungen) | `Konversation` |
| 6 | Bild-Arbeitsblatt (nur Aufgaben, keine Bilder) | `Bildaufgaben` |

Jede dieser 6 Dateien bekommt eine separate **Lösungsdatei** mit Suffix `_LOESUNG`.
→ Pro Unterpunkt: **12 Dateien** (6 Übungen + 6 Lösungen)

### Pro Thema (nach allen Unterpunkten):

| Nr | Typ | Datei-Kürzel |
|----|-----|-------------|
| 7 | Abschlussübung (kombiniert alle Unterpunkte des Themas) | `ABSCHLUSS` |

Die Abschlussübung hat ebenfalls eine Lösungsdatei.
→ Pro Thema zusätzlich: **2 Dateien**

---

## Dateinamen-Konvention — EXAKT EINHALTEN

```
[Niveau]_[Zielgruppe]_[Thema]_[UnterpunktNr]_[UnterpunktKurz]_[Typ].docx
[Niveau]_[Zielgruppe]_[Thema]_[UnterpunktNr]_[UnterpunktKurz]_[Typ]_LOESUNG.docx
[Niveau]_[Zielgruppe]_[Thema]_ABSCHLUSS.docx
[Niveau]_[Zielgruppe]_[Thema]_ABSCHLUSS_LOESUNG.docx
```

**Konkrete Beispiele:**
```
A1_Kinder_SichVorstellen_01_Name_Schreiben.docx
A1_Kinder_SichVorstellen_01_Name_Schreiben_LOESUNG.docx
A1_Kinder_SichVorstellen_01_Name_Lesen.docx
A1_Kinder_SichVorstellen_01_Name_Lesen_LOESUNG.docx
A1_Kinder_SichVorstellen_01_Name_Luecken.docx
A1_Kinder_SichVorstellen_01_Name_Luecken_LOESUNG.docx
A1_Kinder_SichVorstellen_01_Name_Wortliste.docx
A1_Kinder_SichVorstellen_01_Name_Wortliste_LOESUNG.docx
A1_Kinder_SichVorstellen_01_Name_Konversation.docx
A1_Kinder_SichVorstellen_01_Name_Konversation_LOESUNG.docx
A1_Kinder_SichVorstellen_01_Name_Bildaufgaben.docx
A1_Kinder_SichVorstellen_01_Name_Bildaufgaben_LOESUNG.docx
A1_Kinder_SichVorstellen_ABSCHLUSS.docx
A1_Kinder_SichVorstellen_ABSCHLUSS_LOESUNG.docx
```

**Sonderzeichen vermeiden** — kein ä/ö/ü/ß in Dateinamen. Verwende:
- ä → ae, ö → oe, ü → ue, ß → ss, Leerzeichen → kein Leerzeichen (CamelCase oder Unterstrich)

---

## Ordnerstruktur

```
AA Deutsch/
├── CLAUDE.md                                  ← diese Datei
├── progress.txt                               ← immer zuerst lesen
├── AAAA Checkliste_Deutschunterricht_A1-B2.docx  ← Referenz
├── A1_Kinder/
│   ├── 01_SichVorstellen/
│   │   ├── 01_Name/           ← 12 Dateien
│   │   ├── 02_Alter/          ← 12 Dateien
│   │   ├── 03_Wohnort/        ← 12 Dateien
│   │   ├── 04_Herkunft/       ← 12 Dateien
│   │   ├── 05_Sprachen/       ← 12 Dateien
│   │   └── ABSCHLUSS/         ← 2 Dateien
│   ├── 02_Familie/
│   ├── 03_SchuleLernen/
│   └── ... (weitere Themen)
├── A1_Erwachsene/
├── A2_Kinder/
├── A2_Erwachsene/
├── B1_Kinder_Jugendliche/
├── B1_Erwachsene/
├── B2/
└── _Vorlagen/
```

Erstelle Unterordner automatisch, wenn du neue Unterpunkte anlegst.

---

## Technische Vorgaben für .docx-Erstellung

Verwende **Node.js mit dem `docx`-npm-Paket** (`npm install docx`).

### Seitenformat
```javascript
page: {
  size: { width: 11906, height: 16838 }, // A4 in DXA
  margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }, // ~2 cm
}
```

### Schrift & Stil
- Standardschrift: **Arial, 12pt (size: 24)**
- Überschrift 1: fett, 18pt (size: 36), Farbe `1F4E79`
- Überschrift 2: fett, 14pt (size: 28), Farbe `1F4E79`
- Fließtext: 12pt
- Lesetexte für Kinder: 13pt (size: 26) für bessere Lesbarkeit

### Kopfzeile
```
A1 Kinder — [Thema] — [Unterpunkt]     (rechtsbündig, grau, kursiv)
```

### Fußzeile
```
Seite X von Y     (zentriert, grau)
```

### Schülerkopf (jedes Blatt beginnt damit)
Kleine Tabelle mit: Name | Datum

### Listen
- **NIEMALS** Unicode-Bullet-Zeichen (`•`, `\u2022`) direkt in TextRun verwenden
- Immer `LevelFormat.BULLET` mit `numbering`-Config im Document

### Tabellen
- Immer `WidthType.DXA` (nie Prozent)
- Immer `columnWidths` UND `width` pro Zelle setzen
- Immer `ShadingType.CLEAR` (nie SOLID)
- Header-Zeilen: Hintergrund `D5E8F0`

### Schreiblinien
```javascript
new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 8 } },
  spacing: { before: 240, after: 0 },
  children: [new TextRun("")]
})
```

---

## Inhaltliche Vorgaben pro Übungstyp

### [1] Schreibübung
- 3–4 Aufgaben mit steigendem Schwierigkeitsgrad
- Schreiblinien für Antworten
- Letzte Aufgabe: freies Schreiben (3–5 Sätze)
- Niveau strikt einhalten: nur Wortschatz aus der Checkliste

### [2] Leseübung
- Kurzer Text (5–10 Sätze), A1 = sehr einfach, B2 = komplex
- Text enthält nur bekannte Strukturen des aktuellen Niveaus
- Mindestens 3 Aufgaben: Richtig/Falsch, W-Fragen, Suche im Text
- Eigene Namen erfinden (nicht immer „Hans und Grete")

### [3] Lückentext
- Wörterkasten mit Auswahlwörtern (mehr Wörter als Lücken = Ablenkung)
- 3 Aufgabenblöcke: isolierte Sätze → Dialog → freier Teil
- Lücken sind `______` (6 Unterstriche)

### [4] Wortliste
- Tabelle: Wort/Phrase | Wortart/Typ | Beispielsatz
- 8–15 Einträge pro Unterpunkt
- Darunter: Zeile „Übersetzung in deine Sprache: ___" für jedes Wort
- Am Ende: Hinweis auf Lernkarten

### [5] Konversation
- Mindestens 2 Dialoggerüste mit Lücken zum Ausfüllen
- Rollentausch-Anweisung
- Partnerinterview-Aufgabe (Fragen + Schreibzeilen für Antworten)
- Optional: Gruppenspiel (z. B. Staffette, Stellenwechsel)

### [6] Bild-Arbeitsblatt
- NUR Aufgaben und Aufgabentexte — KEINE Bilder generieren
- Bildplatzhalter als: `[BILD 1: Kurze Beschreibung was das Bild zeigen soll]`
- Typische Aufgaben:
  - „Wer ist das? Schreibe den Namen unter das Bild."
  - „Verbinde Bild und Wort mit einer Linie."
  - „Was sagt die Person? Schreibe in die Sprechblase."
  - „Finde im Bild: [Liste]"
  - „Wo im Bild ist [Person/Gegenstand]?"
- Mindestens 4 verschiedene Aufgabentypen pro Blatt

### [7] Abschlussübung (pro Thema)
- Kombiniert ALLE Unterpunkte des Themas
- Mindestens 5 Aufgaben, jede deckt einen anderen Unterpunkt ab
- Enthält: Lesetext, Lückentext, Schreibaufgabe, mind. 1 Konversationsaufgabe
- Am Ende: kleine Selbstevaluation (☐ Das kann ich gut / ☐ Das übe ich noch)

---

## Lösungsdateien

- Überschrift: `LÖSUNG — [Übungstyp]`
- Immer deutlicher Hinweis: „Individuelle Antworten akzeptieren" wenn relevant
- Bei Konversation: Bewertungskriterien statt fertiger Antworten
- Bei Bildaufgaben: Hinweis „Antworten hängen von eingefügten Bildern ab"
- Grammatikfehler in Lösungen immer kommentieren (Erklärung für Lehrer)

---

## Arbeitsablauf — Session-Start

1. `progress.txt` lesen → aktuellen Stand ermitteln
2. Nächsten offenen Unterpunkt identifizieren (`[ ]` in der Fortschrittsliste)
3. 12 Dateien für diesen Unterpunkt erstellen (6 Übungen + 6 Lösungen)
4. Alle Dateien validieren
5. `progress.txt` aktualisieren:
   - Checkboxen setzen (`[X]`)
   - „Aktuell in Arbeit" anpassen
   - „Als Nächstes" aktualisieren
   - Datum aktualisieren
6. Wenn alle Unterpunkte eines Themas fertig: Abschlussübung erstellen

---

## Wichtige Regeln — NIEMALS VERGESSEN

- **Niveau strikt einhalten**: A1 = Grundwortschatz, keine komplexen Strukturen
- **Keine Bilder generieren** — nur Platzhalter mit Beschreibung
- **Jede Übung braucht eine Lösungsdatei** — keine Ausnahmen
- **Dateinamen-Konvention** — exakt wie oben definiert, keine Variationen
- **Keine Zeilenumbrüche mit `\n`** im docx-Code — separate Paragraphs verwenden
- **Keine Unicode-Bullets** direkt — immer `LevelFormat.BULLET`
- **Tabellen**: immer DXA, immer dual width (Tabelle + Zelle), immer ShadingType.CLEAR
- **PageBreak muss in einem Paragraph** sein — nicht standalone

---

## Referenzinhalt A1 Kinder — Themen-Übersicht

*(Vollständige Liste aus der Checkliste)*

**Thema 01: Sich selbst vorstellen**
1. Name sagen und erfragen
2. Alter sagen und erfragen
3. Wohnort nennen
4. Herkunft nennen
5. Sprachen nennen

**Thema 02: Familie**
1. Familienmitglieder benennen
2. Über Geschwister sprechen
3. Haustiere benennen
4. Possessivpronomen (mein/meine)

**Thema 03: Schule & Lernen**
1. Schulsachen benennen
2. Klassenzimmer
3. Schulfächer
4. Wochentage
5. Stundenplan lesen

**Thema 04: Zahlen, Farben, Formen**
1. Zahlen 1–20 (später bis 100)
2. Grundfarben
3. Formen

**Thema 05: Körper & Gesundheit**
1. Körperteile
2. Einfache Krankheiten

**Thema 06: Kleidung**
1. Kleidungsstücke
2. Farben + Kleidung kombinieren

**Thema 07: Essen & Trinken**
1. Lieblingsessen
2. Getränke
3. Mahlzeiten
4. Ich mag / Ich mag nicht

**Thema 08: Spielen & Freizeit**
1. Hobbys
2. Sportarten
3. Spielzeug

**Thema 09: Tiere**
1. Haustiere und Bauernhoftiere
2. Zootiere
3. Tierlaute

**Thema 10: Zuhause**
1. Räume
2. Möbel

**Thema 11: Wetter & Jahreszeiten**
1. Wetter
2. Jahreszeiten
3. Monate

**Thema 12: Feste & Feiern**
1. Geburtstag
2. Weihnachten, Ostern, Fasching

**Thema 13: Grammatik-Minimum A1 Kinder**
1. Verben im Präsens (sein, haben, mögen, heißen)
2. Artikel (der, die, das)
3. Plural einfacher Nomen
4. Wortstellung
5. Personalpronomen

*(Weitere Niveaus/Zielgruppen werden aufgeschlüsselt, wenn wir dort ankommen)*

---

*Letzte Aktualisierung dieser Datei: 23.04.2026*
