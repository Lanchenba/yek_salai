import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { surnameIndex } from "../utils/dataIndexer";
import "./ClanChecker.css";

function ClanChecker() {
  const [surname1, setSurname1] = useState("");
  const [surname2, setSurname2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setError("");
    setResult(null);
    if (!surname1.trim() || !surname2.trim()) {
      setError("Please enter both Yumnaks (surnames).");
      return;
    }
    setLoading(true);
    setTimeout(() => {
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
    }, 400);
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
    <div className="checker-card-glass">
      <div className="checker-header">
        <span role="img" aria-label="check">💍</span>
        <h2>Check Clan Compatibility</h2>
      </div>
      <p className="checker-desc">Enter two Yumnaks (surnames) to check if they are compatible for marriage (not from the same clan).</p>
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
      <button className="checker-btn" onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Check Compatibility"}
      </button>
      {error && <div className="checker-alert error"><span role="img" aria-label="error">❌</span> {error}</div>}
      {result && (
        <div className={`checker-alert ${result.compatible ? "success animated-pop" : "fail animated-pop"}`}>
          {result.compatible ? (
            <>
              <span role="img" aria-label="ok">✅</span> {result.message}
              <span className="confetti">🎊</span>
              <div className="excited-message">Congratulations! You are compatible! <span role="img" aria-label="celebrate">💑</span></div>
            </>
          ) : (
            <>
              <span role="img" aria-label="no">🚫</span> {result.message}
              <span className="confetti">💔</span>
              <div className="excited-message">Sorry, not compatible. <span role="img" aria-label="sad">😢</span></div>
            </>
          )}
        </div>
      )}
      <div className="checker-hint">Try: <span>{getRandomPair().join(' + ')}</span></div>
    </div>
  );
}

export default ClanChecker;
