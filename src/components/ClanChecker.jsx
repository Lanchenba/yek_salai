import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Autocomplete from "./Autocomplete";
import { surnameIndex } from "../utils/dataIndexer";
import "./ClanChecker.css";

const QUICK_PAIRS = [
  ["Keisham", "Yendrembam"],
  ["Naorem", "Heisnam"],
  ["Wangkhem", "Ningombam"],
];

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

function ClanChecker() {
  const [surname1, setSurname1] = useState("");
  const [surname2, setSurname2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const closeResultPopup = () => setResult(null);

  useEffect(() => {
    if (!result) return;
    const onKey = (e) => { if (e.key === "Escape") setResult(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [result]);

  const handleCheck = () => {
    setError("");
    setResult(null);
    if (!surname1.trim() || !surname2.trim()) {
      setError("Please enter both Yumnaks (surnames).");
      return;
    }
    setLoading(true);
    const clanA = surnameIndex[surname1.trim().toLowerCase()];
    const clanB = surnameIndex[surname2.trim().toLowerCase()];
    setLoading(false);
    if (!clanA || !clanB) {
      setError("Could not find one or both clans. Please check your Yumnaks.");
    } else if (clanA === clanB) {
      setResult({
        compatible: false,
        message: `Not compatible: Both belong to the ${clanA} clan.`
      });
    } else {
      setResult({
        compatible: true,
        message: `Compatible: ${surname1} (${clanA}) and ${surname2} (${clanB}) are from different clans.`
      });
    }
  };

  // Helper for random pair
  function getRandomPair() {
    const samples = [
      ["Keisham", "Yendrembam"],
      ["Ningthoujam", "Oinam"],
      ["Naorem", "Heisnam"],
      ["Khumanthem", "Moirangthem"],
      ["Wangkhem", "Ningombam"],
      ["Laishram", "Sorokhaibam"],
      ["Mayengbam", "Mutum"],
      ["Lourembam", "Sarokhaibam"],
      ["Yumkhaibam", "Wahengbam"],
      ["Ngangom", "Kshetrimayum"]
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  }

  return (
    <>
    <div className="checker-card-glass">
      <div className="checker-header">
        <span role="img" aria-label="check">💍</span>
        <h2>Check Clan Compatibility</h2>
      </div>
      <p className="checker-desc">Enter two Yumnaks to check whether they belong to different clans.</p>
      <Autocomplete
        value={surname1}
        onChange={setSurname1}
        placeholder="First Yumnak..."
      />
      <Autocomplete
        value={surname2}
        onChange={setSurname2}
        placeholder="Second Yumnak..."
      />
      <div className="quick-row" aria-label="Quick compatibility examples">
        {QUICK_PAIRS.map((pair) => (
          <button
            key={`${pair[0]}-${pair[1]}`}
            type="button"
            className="quick-chip"
            onClick={() => {
              setSurname1(pair[0]);
              setSurname2(pair[1]);
              setError("");
              setResult(null);
            }}
          >
            {pair[0]} + {pair[1]}
          </button>
        ))}
      </div>
      <button className="checker-btn" onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Check Compatibility"}
      </button>
      {error && <div className="checker-alert error"><span role="img" aria-label="error">❌</span> {error}</div>}
      <div className="checker-hint">Try: <span>{getRandomPair().join(' + ')}</span></div>
    </div>
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
          aria-label="Compatibility result"
          onClick={(e) => e.stopPropagation()}
        >
          {result.compatible ? <Confetti /> : null}
          <div className={`popup-ribbon${result.compatible ? "" : " ribbon-incompatible"}`}>
            {result.compatible
              ? <><span role="img" aria-label="compatible">💑</span> Compatible Match!</>
              : <><span role="img" aria-label="incompatible">🚫</span> Same Clan — Not Permitted</>}
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
            {result.compatible ? (
              <>
                <div className="found-header fade-up">
                  <span role="img" aria-label="compatible">💑</span>
                  <strong>Great news!</strong>
                </div>
                <div className="found-clan-name compatible fade-up delay-1">
                  {surname1.trim()} &amp; {surname2.trim()}
                </div>
                <div className="found-subline fade-up delay-2">
                  Different clans — marriage is permitted under tradition.
                </div>
                <div className="excited-message fade-up delay-3">
                  Congratulations on a compatible match! 🥳
                </div>
              </>
            ) : (
              <>
                <div className="found-header fade-up">
                  <span role="img" aria-label="incompatible">🚫</span>
                  <strong>Same Clan</strong>
                </div>
                <div className="found-clan-name incompatible fade-up delay-1">
                  {surname1.trim()} &amp; {surname2.trim()}
                </div>
                <div className="found-subline fade-up delay-2">
                  Both belong to the same clan — marriage is not permitted.
                </div>
                <div className="excited-message fade-up delay-3">
                  Try a different pair of Yumnaks. 🔍
                </div>
              </>
            )}
            <div className="found-actions fade-up delay-4">
              <button
                type="button"
                className="found-action-btn secondary"
                onClick={closeResultPopup}
              >
                Check Another
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}

export default ClanChecker;
