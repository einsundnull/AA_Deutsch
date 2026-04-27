import { useState } from "react";

const meals = [
  {
    id: "fruehstueck",
    name: "Das Frühstück",
    time: "morgens / frühs",
    icon: "7:00",
    typical: [
      "Brötchen mit Butter und Marmelade",
      "Brot mit Käse oder Wurst",
      "ein gekochtes Ei",
      "Müsli mit Milch",
      "Joghurt mit Obst",
      "Kaffee oder Tee",
      "Orangensaft",
    ],
    questions: [
      "Was isst man frühs in Deutschland?",
      "Was isst du zum Frühstück?",
      "Trinkst du morgens Kaffee oder Tee?",
    ],
  },
  {
    id: "mittagessen",
    name: "Das Mittagessen",
    time: "mittags",
    icon: "12:00",
    typical: [
      "Schnitzel mit Kartoffeln",
      "Suppe (Kartoffelsuppe, Gemüsesuppe)",
      "Nudeln mit Soße",
      "Fisch mit Reis",
      "Salat als Beilage",
      "Wasser oder Saft",
    ],
    questions: [
      "Was isst man mittags in Deutschland?",
      "Was isst du zum Mittagessen?",
      "Isst du mittags warm oder kalt?",
    ],
  },
  {
    id: "kaffee",
    name: "Kaffee und Kuchen",
    time: "nachmittags (ca. 15:00)",
    icon: "15:00",
    typical: [
      "Kuchen (Apfelkuchen, Käsekuchen)",
      "Torte (Schwarzwälder Kirschtorte)",
      "Kekse oder Plätzchen",
      "Kaffee oder Kakao",
    ],
    questions: [
      "Was isst man nachmittags in Deutschland?",
      "Isst du gern Kuchen? Welchen?",
      "Gibt es in deinem Land auch \"Kaffee und Kuchen\"?",
    ],
  },
  {
    id: "abendbrot",
    name: "Das Abendbrot",
    time: "abends",
    icon: "18:30",
    typical: [
      "Brot mit Aufschnitt (Wurst, Käse)",
      "Butter und verschiedene Aufstriche",
      "Gurken, Tomaten, Radieschen",
      "kalte Platte",
      "Tee oder Wasser",
    ],
    questions: [
      "Was isst man abends in Deutschland?",
      "Was isst du zum Abendbrot?",
      "Isst du abends warm oder kalt?",
    ],
  },
];

const vocab = [
  { de: "die Mahlzeit, -en", en: "meal" },
  { de: "das Frühstück", en: "breakfast" },
  { de: "das Mittagessen", en: "lunch" },
  { de: "das Abendbrot / Abendessen", en: "dinner / supper" },
  { de: "die Beilage, -n", en: "side dish" },
  { de: "der Aufschnitt", en: "cold cuts" },
  { de: "der Aufstrich, -e", en: "spread" },
  { de: "das Brötchen, -", en: "bread roll" },
  { de: "die Wurst, Würste", en: "sausage / cold cut" },
  { de: "warm essen", en: "to eat a hot meal" },
  { de: "kalt essen", en: "to eat a cold meal" },
];

const fillExercises = [
  {
    sentence: "Morgens esse ich ___ mit Butter.",
    answer: "Brötchen",
    hint: "kleine runde Brote",
  },
  {
    sentence: "Zum Mittagessen gibt es heute ___ mit Kartoffeln.",
    answer: "Schnitzel",
    hint: "paniertes Fleisch",
  },
  {
    sentence: "Nachmittags trinken viele Deutsche ___ und essen Kuchen.",
    answer: "Kaffee",
    hint: "heißes braunes Getränk",
  },
  {
    sentence: "Abends essen viele Deutsche ___ mit Aufschnitt.",
    answer: "Brot",
    hint: "Grundnahrungsmittel aus Mehl",
  },
  {
    sentence: "Zum Frühstück trinke ich gern Orangensaft oder ___.",
    answer: "Tee",
    hint: "heißes Getränk mit Beutel",
  },
  {
    sentence: "Käse und Wurst auf Brot nennt man ___.",
    answer: "Aufschnitt",
    hint: "kalte Scheiben",
  },
];

export default function MahlzeitenUebung() {
  const [tab, setTab] = useState("info");
  const [openMeal, setOpenMeal] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [showVocab, setShowVocab] = useState(false);

  const handleAnswer = (idx, val) => {
    setAnswers((p) => ({ ...p, [idx]: val }));
    setChecked((p) => ({ ...p, [idx]: false }));
  };

  const checkAnswer = (idx) => {
    setChecked((p) => ({ ...p, [idx]: true }));
  };

  const isCorrect = (idx) =>
    answers[idx]?.trim().toLowerCase() === fillExercises[idx].answer.toLowerCase();

  return (
    <div style={{
      fontFamily: "'Crimson Text', 'Georgia', serif",
      maxWidth: 640,
      margin: "0 auto",
      padding: "24px 16px",
      color: "#1a1a1a",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #faf8f3 0%, #f0ece4 100%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <header style={{ textAlign: "center", marginBottom: 32, borderBottom: "2px solid #2a2a2a", paddingBottom: 20 }}>
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.5px",
          margin: "0 0 4px",
        }}>
          Die Mahlzeiten
        </h1>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: "#888",
        }}>
          Deutsch A2 — Essen und Trinken
        </span>
      </header>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 0,
        marginBottom: 28,
        borderBottom: "1px solid #ccc",
      }}>
        {[
          { id: "info", label: "Mahlzeiten" },
          { id: "uebung", label: "Lückentext" },
          { id: "fragen", label: "Fragen" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: tab === t.id ? 600 : 400,
              padding: "10px 20px",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #1a1a1a" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              color: tab === t.id ? "#1a1a1a" : "#999",
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: Mahlzeiten Info */}
      {tab === "info" && (
        <div>
          {meals.map((meal) => (
            <div
              key={meal.id}
              style={{
                marginBottom: 12,
                border: "1px solid #d4cfc6",
                borderRadius: 6,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <button
                onClick={() => setOpenMeal(openMeal === meal.id ? null : meal.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  border: "none",
                  background: openMeal === meal.id ? "#2a2a2a" : "#fff",
                  color: openMeal === meal.id ? "#faf8f3" : "#1a1a1a",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>
                  {meal.name}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  opacity: 0.6,
                }}>
                  {meal.icon} — {meal.time}
                </span>
              </button>
              {openMeal === meal.id && (
                <div style={{ padding: "16px 18px" }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: "#999",
                    margin: "0 0 8px",
                  }}>
                    Typisch:
                  </p>
                  <ul style={{ margin: "0 0 0 16px", padding: 0, lineHeight: 1.8, fontSize: 15 }}>
                    {meal.typical.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowVocab(!showVocab)}
            style={{
              marginTop: 20,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              padding: "10px 16px",
              border: "1px solid #2a2a2a",
              borderRadius: 4,
              background: showVocab ? "#2a2a2a" : "transparent",
              color: showVocab ? "#faf8f3" : "#2a2a2a",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {showVocab ? "Wortschatz ausblenden" : "Wortschatz anzeigen"}
          </button>

          {showVocab && (
            <table style={{
              marginTop: 12,
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #2a2a2a" }}>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Deutsch</th>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>English</th>
                </tr>
              </thead>
              <tbody>
                {vocab.map((v, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e8e4dc" }}>
                    <td style={{ padding: "7px 4px" }}>{v.de}</td>
                    <td style={{ padding: "7px 4px", color: "#666" }}>{v.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB: Lückentext */}
      {tab === "uebung" && (
        <div>
          <p style={{ fontSize: 15, color: "#666", marginTop: 0, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            Ergänze die Lücken.
          </p>
          {fillExercises.map((ex, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 16,
                padding: "14px 16px",
                background: "#fff",
                border: "1px solid #d4cfc6",
                borderRadius: 6,
                borderLeft: checked[idx]
                  ? isCorrect(idx)
                    ? "4px solid #3a7d44"
                    : "4px solid #b5413a"
                  : "4px solid transparent",
              }}
            >
              <p style={{ margin: "0 0 8px", fontSize: 15, lineHeight: 1.6 }}>
                {ex.sentence.split("___")[0]}
                <input
                  type="text"
                  value={answers[idx] || ""}
                  onChange={(e) => handleAnswer(idx, e.target.value)}
                  placeholder="..."
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: 15,
                    width: 120,
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "2px solid #2a2a2a",
                    background: "transparent",
                    textAlign: "center",
                    outline: "none",
                    padding: "2px 4px",
                    margin: "0 4px",
                  }}
                />
                {ex.sentence.split("___")[1]}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#aaa", fontStyle: "italic" }}>
                  Tipp: {ex.hint}
                </span>
                <button
                  onClick={() => checkAnswer(idx)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    padding: "5px 14px",
                    border: "1px solid #2a2a2a",
                    borderRadius: 3,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  Prüfen
                </button>
              </div>
              {checked[idx] && (
                <p style={{
                  margin: "8px 0 0",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  color: isCorrect(idx) ? "#3a7d44" : "#b5413a",
                  fontWeight: 500,
                }}>
                  {isCorrect(idx) ? "Richtig!" : `Antwort: ${ex.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: Fragen */}
      {tab === "fragen" && (
        <div>
          <p style={{ fontSize: 15, color: "#666", marginTop: 0, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            Beantworte die Fragen mündlich oder schriftlich.
          </p>
          {meals.map((meal) => (
            <div key={meal.id} style={{ marginBottom: 24 }}>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#888",
                margin: "0 0 10px",
                borderBottom: "1px solid #d4cfc6",
                paddingBottom: 6,
              }}>
                {meal.name}
              </h3>
              {meal.questions.map((q, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    marginBottom: 6,
                    background: "#fff",
                    border: "1px solid #d4cfc6",
                    borderRadius: 4,
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {q}
                </div>
              ))}
            </div>
          ))}

          <div style={{
            marginTop: 16,
            padding: "14px 16px",
            background: "#2a2a2a",
            color: "#faf8f3",
            borderRadius: 6,
            fontSize: 14,
            lineHeight: 1.6,
          }}>
            <p style={{ margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
              Hilfe: Antwortstruktur
            </p>
            <p style={{ margin: 0, fontStyle: "italic" }}>
              Zum Frühstück esse ich ... / Ich esse morgens ...<br />
              Zum Mittagessen gibt es ... / Mittags esse ich ...<br />
              Zum Abendbrot esse ich meistens ...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
