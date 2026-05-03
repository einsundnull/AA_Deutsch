# Universal Web Guidelines
*Extrahiert aus: Guide Lines-UI-.txt · Guide Lines Premium UI-.txt · GUIDELINE_NEW_STYLING · GUIDELINE_NEW_ARCHITECTURE*
*Stand: April 2026*

---

## LAYOUT

### Grid & Container
- **12-column grid.** Content in 8 von 12 Spalten auf Desktop.
- **Container:** `max-width: 1280px`, `margin-inline: auto`, `padding-inline: 32px`
- Spaltenaufteilung: Volle Breite = 12/12 · Content + Sidebar = 8+4 · Zwei gleich = 6+6

### Spacing — 8pt Grid
- Alle Abstände durch **4 oder 8 teilbar** — keine Ausnahmen (15px, 22px, 7px → verboten)
- Skala: 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px

### Proximity-Prinzip
- **16px** = Elemente innerhalb einer Gruppe (Label über Input, Icon neben Text)
- **32px** = zwischen verschiedenen Gruppen / Komponenten
- **64px+** = zwischen Sections

### Seitenstruktur
- Standard: `app-shell → main.page → page-header`
- Navbar: 64px Höhe, sticky, `border-bottom: 1px solid neutral-200`, `bg: neutral-0`
- Sichtbarkeit nur via CSS-Klasse (`.is-hidden`), niemals `el.style.display = 'none'`

### Basisklassen für wiederkehrende Komponenten
- Navbars, Dialoge, Modals, Toasts, Cards, Formulare — immer als **Basisklasse** implementieren
- Basisklassen definieren Struktur, Spacing und States — Seiten-spezifische Varianten **erweitern** sie (z.B. `.dialog--wide`, `.navbar--transparent`)
- Keine Komponente mehrfach neu implementieren — erst prüfen ob eine Basisklasse existiert oder erweitert werden kann
- Basisklassen leben in einer eigenen CSS-Datei (z.B. `components.css`) — niemals in seitenspezifischem CSS

### Responsive Breakpoints (alle durch 8 teilbar)
480px · 768px · 1024px · 1280px · 1536px

### Ausrichtung
- Body-Copy **linksbündig** — Zentrierung nur für kurze Hero-Headlines
- Eine primäre Aktion pro Section — nie mit sich selbst konkurrieren

### Touch & Hover
- Hover-States nur in `@media (hover: hover) and (pointer: fine)` (verhindert "sticky hover" auf Touch)
- Touch Targets: min. **44px** Höhe für alle Buttons und Links

---

## ARCHITEKTUR

### No-Build-Strategie
- Kein Webpack, kein Vite, kein Babel — direkte Browser-Ausführung
- **ES5-Syntax:** `var`, `function(){}`, String-Konkatenation — kein `let/const`, keine Arrow Functions, kein Template Literals, kein Destructuring, kein Spread
- **Kein `import/export`** — IIFE-Pattern für alle Module:
  ```js
  var MyModule = (function() {
    'use strict';
    var _private = null;
    function publicMethod() {}
    return { publicMethod: publicMethod };
  }());
  ```
- HTML, CSS und JS immer in **getrennten Dateien**

### Schichten-Architektur
```
UI-Layer (teacher.js, student.js …)
    ↓ AppService.method(params, callback)
AppService (app-service.js)
    ↓ delegiert an aktiven Adapter
LocalStorageAdapter / FirestoreAdapter
    ↓ einziger direkter Zugriff
Store / ProfileStore / ChatStore
```
- Consumer-Code greift **niemals** direkt auf `Store.*` oder `localStorage` zu — immer `AppService.*`
- Adapter-Swap = **eine Zeile** in `app-config.js`

### Async-Konvention
- Alle Callbacks folgen Node.js-Konvention: `function(err, result)`
- Fehler nie verschlucken — Adapter liefert immer `callback(err, null)` bei Fehler

### Asset-Versioning
- `APP_VERSION` bei **jeder** inhaltlichen Änderung an .js oder .css erhöhen (Format: `YYYY-MM-DD-{n}`)
- Assets werden über `app-config.js` injiziert — niemals hardcoded `?v=` in HTML
- CSS-Ladereihenfolge: `tokens → base → components → navbar → [page-specific]`
- Script-Ladereihenfolge: `app-config.js` immer zuerst

### Locale — Sprache / Währung / Zeitzone
Prioritäts-Hierarchie (niedrig → hoch, letzter Wert gewinnt):
1. **Browser-Erkennung** beim ersten Öffnen: `navigator.language`, `Intl.DateTimeFormat().resolvedOptions().timeZone`, Währung aus Sprach-Region
2. **localStorage** — falls der User die Einstellung in der App manuell gesetzt hat
3. **Nutzerprofil aus der DB** — nach dem Einloggen, falls das Profil Locale-Felder enthält (überschreibt localStorage)

```js
/* Reihenfolge beim App-Start */
var locale = _detectFromBrowser();           // 1. Basis
var stored  = localStorage.getItem('locale');
if (stored) locale = JSON.parse(stored);     // 2. überschreibt Browser
/* nach Login: */
AppService.getProfile(uid, function(err, profile) {
  if (profile && profile.locale) locale = profile.locale; // 3. überschreibt alles
  App.applyLocale(locale);
});
```
- Locale-Objekt: `{ language: 'de', currency: 'EUR', timezone: 'Europe/Berlin' }`
- `localStorage` nur beschreiben wenn der User aktiv eine Einstellung setzt — nie beim bloßen Browser-Detect
- Währungs-Formatierung immer über `Intl.NumberFormat` — niemals manuell

### Datenschema
- Flache Arrays als Collections — max. 1 Ebene Verschachtelung (Firestore-kompatibel)
- Codes statt Klartexte: `'de'` statt `'Deutsch'`
- Bestehende Schemas sind **unveränderlich** — nur additive Felder erlaubt

### Sicherheit
- `_esc(str)` bei jedem User-Daten-Output in `innerHTML` — kein Ausnahme (XSS-Schutz)
- `window.alert()` / `window.confirm()` / `window.prompt()` → immer `Modal.show()` oder `Toast.*` statt Browser-Dialoge

### Mockup-Workflow
- **Erst Mockup erstellen, vom User freigeben lassen, dann implementieren**
- Kein UI-Code ohne vorheriges Mockup

---

## SIMPLE

### Tokens — keine hardcoded Werte
- Alle Farben, Schriftgrößen, Abstände ausschließlich als **CSS Custom Properties** (`var(--...)`)
- Hex-Werte und px-Werte nur in `tokens.css` innerhalb `:root` — nirends sonst
- Kein Inline-CSS im HTML (`style="..."`) — Ausnahme: dynamische JS-Laufzeitwerte

### Farbsystem
- **Keine Gradients** — nur flache, einfarbige Fills
- Tiefe entsteht durch Spacing und Kontrast, nicht durch Texturen oder Verläufe
- Nur **eine Hue** — alle Farben als Tints/Shades aus einer Basis

### Typografie
- Max. **4 Schriftgrößen** (Display 48 · Heading 24 · Body 16 · Caption 12)
- Max. **2 Gewichte** (400 Regular · 600 Semibold) — kein drittes Gewicht, auch nicht per `opacity` simuliert
- Keine Emojis

### Icons
- Eine einzige Icon-Library — keine gemischten Styles
- Größen: **16px oder 24px** (beide durch 8 teilbar)
- Primäre Aktionen: Icon immer **mit Textlabel** kombiniert

### Motion
- Kein Bounce, kein Spring, kein Elastic
- Keine Layout-Animationen (`width`, `height`, `top`) — nur `transform` und `opacity`
- Smooth Scroll nur unter `prefers-reduced-motion: no-preference`

### Copywriting
- **CTAs: max. 3 Wörter**, Verb-First (Anmelden · Speichern · Weiter · Fertig)
- Navigation: 1 Wort wo möglich (Preise · Docs · Blog)
- Keine Füllwörter: kein "Bitte", "Einfach", "Hier klicken"
- Kein Passiv: "Gespeichert" statt "Wurde erfolgreich gespeichert"
- Fehlermeldungen: Was passiert ist + was zu tun ist — nicht was intern fehlschlug

---

## PREMIUM

### Philosophie
> Premium-Interfaces sind durch Zurückhaltung definiert. Jedes Element verdient seinen Platz. Das Ziel ist nicht zu beeindrucken — sondern dass der User sich sofort handlungsfähig fühlt. (Stripe · Linear · Vercel · Apple)

### Farbsystem — Single-Hue (Eric D. Kennedy)
- Basis: `#060f1c` (Navy, HSL 216, 65%, 7%)
- Tints (heller) reduzieren Sättigung · Shades (dunkler) halten oder erhöhen sie leicht
- **60-30-10 Verteilung:**
  - 60 % Neutral → Seitenhintergründe, Card-Surfaces, White-Space
  - 30 % Komplementär → Text, Navigation, Footer, Sidebar
  - 10 % Accent → CTAs, Links, Focus-Ringe, aktive Indikatoren

### Typografie
- Font: **Figtree** (400 Regular + 600 Semibold) — kein zweiter Font
- Headings niemals grau — immer `neutral-900` oder `color-900`
- `neutral-500` (Muted) nur für wirklich sekundäre Inhalte

### Kontrast & Barrierefreiheit
- Kontrast ≥ **4.5:1** für Fließtext (WCAG AA)
- Focus-Ring: immer sichtbar, niemals unterdrückt — `outline: none` nur mit `box-shadow`-Ersatz
- `:focus-visible` verwenden (mit Fallback)

### Interaktive Zustände — alle 5 Pflicht
Jedes interaktive Element braucht: **default · hover · active · focus · disabled**
- Hover: eine Stufe nach unten auf der Farbskala (color-400 → color-500)
- Disabled: `opacity: 0.4; cursor: not-allowed`

### Transitions
- **120ms ease** — Hover-States, Icon-Wechsel
- **200ms ease** — Panels, Drawers, Modals einblenden

### Schatten & Tiefe
- Kein starker Drop-Shadow — subtil: `0 1px 3px rgba(6,15,28,0.08)`
- Cards: `1px solid neutral-200` liest sich sauberer als ein Shadow auf Weiß
- Tiefe kommt von **Spacing-Hierarchie und Kontrast** — nicht von Schatten, Gradients oder Texturen
