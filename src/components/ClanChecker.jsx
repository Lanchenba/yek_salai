import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
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
      // Simulate clan compatibility check
      // Replace with real logic
      const clans = require("../data/clans.json");
      let clanA = null, clanB = null;
      Object.entries(clans).forEach(([clan, surnames]) => {
        if (surnames.map(s => s.toLowerCase()).includes(surname1.trim().toLowerCase())) {
          clanA = clan;
        }
        if (surnames.map(s => s.toLowerCase()).includes(surname2.trim().toLowerCase())) {
          clanB = clan;
        }
      });
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
    }, 900);
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
        <div className={`checker-alert ${result.compatible ? "success" : "fail"}`}>
          {result.compatible ? (
            <><span role="img" aria-label="ok">✅</span> {result.message}</>
          ) : (
            <><span role="img" aria-label="no">🚫</span> {result.message}</>
          )}
        </div>
      )}
      <div className="checker-hint">Try: <span>{getRandomPair().join(' + ')}</span></div>
    </div>
  );
}

export default ClanChecker;
