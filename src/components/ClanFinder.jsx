import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import { surnameIndex } from "../utils/dataIndexer";
import "./ClanFinder.css";

const QUICK_SURNAMES = ["Keisham", "Oinam", "Wangkhem", "Ningthoujam"];

const CONFETTI_COLORS = [
  "#f59e0b", "#10b981", "#3b82f6", "#ef4444",
  "#8b5cf6", "#ec4899", "#f97316", "#14b8a6",
];

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: 8 + (i * 3.15) % 84,
      delay: parseFloat(((i * 0.042) % 0.55).toFixed(3)),
      duration: parseFloat((0.65 + (i % 6) * 0.1).toFixed(2)),
      width: 7 + (i % 4) * 2,
      height: 4 + (i % 3),
    })), []
  );
  return (
    <div className="confetti-wrapper" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function ClanFinder() {
  const navigate = useNavigate();
  const [surname, setSurname] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const closeResultPopup = () => {
    setResult(null);
  };

  useEffect(() => {
    if (!result) return;
    const onKey = (e) => { if (e.key === "Escape") setResult(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [result]);

  const handleSearch = () => {
    setError("");
    setResult(null);
    if (!surname.trim()) {
      setError("Please enter your Yumnak (surname).");
      return;
    }
    setLoading(true);
    const clan = surnameIndex[surname.trim().toLowerCase()];
    setLoading(false);
    if (clan) {
      setResult({ clan });
    } else {
      setError("No clan found for this Yumnak. Please check your spelling or try another.");
    }
  };

  return (
    <>
      <div className="finder-card-glass">
      <div className="finder-header">
        <span role="img" aria-label="search">🔍</span>
        <h2>Find My Clan</h2>
      </div>
      <p className="finder-desc">Type your Yumnak to instantly see your clan (Yek/Salai).</p>
      <Autocomplete
        value={surname}
        onChange={setSurname}
        placeholder="Type your Yumnak..."
      />
      <div className="quick-row" aria-label="Quick surname examples">
        {QUICK_SURNAMES.map((name) => (
          <button
            key={name}
            type="button"
            className="quick-chip"
            onClick={() => {
              setSurname(name);
              setError("");
              setResult(null);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <button className="finder-btn" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Find Clan"}
      </button>
      {error && <div className="finder-alert error"><span role="img" aria-label="error">❌</span> {error}</div>}
      {result && createPortal(
        <div
          className="found-popup-backdrop"
          onClick={closeResultPopup}
          role="presentation"
        >
          <div
            className="found-popup-card animated-pop"
            role="dialog"
            aria-modal="true"
            aria-label="Clan found result"
            onClick={(event) => event.stopPropagation()}
          >
            <Confetti />
            <div className="popup-ribbon">
              <span role="img" aria-label="party">🎉</span> Your Clan is Revealed!
            </div>
            <button
              type="button"
              className="found-popup-close"
              onClick={closeResultPopup}
              aria-label="Close result popup"
            >
              ×
            </button>
            <div className="popup-body">
              <div className="found-header fade-up">
                <span role="img" aria-label="clan">🏷️</span>
                <strong>Clan Identified</strong>
              </div>
              <div className="found-clan-name fade-up delay-1">{result.clan}</div>
              <div className="found-subline fade-up delay-2">
                Your Yumnak <strong>{surname.trim()}</strong> belongs to this clan.
              </div>
              <div className="excited-message fade-up delay-3">
                You are part of a proud lineage. Explore what this means for you.
              </div>
              <div className="found-actions fade-up delay-4">
                <button
                  type="button"
                  className="found-action-btn"
                  onClick={() => navigate("/checker")}
                >
                  ❤️ Check Compatibility
                </button>
                <button
                  type="button"
                  className="found-action-btn secondary"
                  onClick={() => {
                    setSurname("");
                    setResult(null);
                    setError("");
                  }}
                >
                  🔍 Search Another
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
      <div className="finder-hint">Try: <span>{getRandomSample()}</span></div>
      </div>
    </>
  );
}

// Helper for random sample
function getRandomSample() {
  const samples = [
    "Keisham", "Yendrembam", "Ningthoujam", "Oinam", "Naorem", "Heisnam", "Khumanthem", "Moirangthem", "Wangkhem", "Ningombam"
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

export default ClanFinder;
