import { useState } from "react";
import Autocomplete from "./Autocomplete";
import { surnameIndex } from "../utils/dataIndexer";
import "./ClanFinder.css";

const QUICK_SURNAMES = ["Keisham", "Oinam", "Wangkhem", "Ningthoujam"];

function ClanFinder() {
  const [surname, setSurname] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      {result && (
        <div className="finder-alert success animated-pop">
          <span role="img" aria-label="clan">🏷️</span> <strong>Clan:</strong> {result.clan}
          <span className="confetti">🎉</span>
          <div className="excited-message">You found your clan! <span role="img" aria-label="party">🥳</span></div>
        </div>
      )}
      <div className="finder-hint">Try: <span>{getRandomSample()}</span></div>
    </div>
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
