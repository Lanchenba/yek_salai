import React, { useState } from "react";
import ClanFinder from "./ClanFinder";
import ClanChecker from "./ClanChecker";
import "./ClanApp.css";

function ClanApp() {
  const [tab, setTab] = useState("finder");

  return (
    <div className="clan-app-container">
      <header className="clan-app-header">
        <h1>Meitei Yek/Salai Community Tool</h1>
        <p className="clan-app-desc">
          <strong>Welcome!</strong> This tool helps you discover your clan (Yek/Salai) or check marriage compatibility within the Meitei community. Enter your surname (Yumnak) to find your clan, or check if two surnames are compatible for marriage.
        </p>
      </header>
      <nav className="clan-app-tabs" aria-label="Main functions">
        <button
          className={tab === "finder" ? "active" : ""}
          onClick={() => setTab("finder")}
          aria-selected={tab === "finder"}
        >
          <span role="img" aria-label="search">🔍</span> Find My Clan
        </button>
        <button
          className={tab === "checker" ? "active" : ""}
          onClick={() => setTab("checker")}
          aria-selected={tab === "checker"}
        >
          <span role="img" aria-label="check">💍</span> Check Compatibility
        </button>
      </nav>
      <main className="clan-app-main">
        <div className="clan-app-card">
          {tab === "finder" && <ClanFinder />}
          {tab === "checker" && <ClanChecker />}
        </div>
      </main>
      <footer className="clan-app-footer">
        <div>
          <span role="img" aria-label="community">🤝</span> Proudly serving the Meitei community. Data is for cultural reference only.
        </div>
        <div className="clan-app-footer-links">
          <a href="https://en.wikipedia.org/wiki/Meitei_people" target="_blank" rel="noopener noreferrer">Learn about Meitei</a>
        </div>
        <div className="clan-app-about">
          <strong>About:</strong> In Meitei tradition, marriage within the same clan (Yek/Salai) is not permitted. This tool helps you respect and understand this important cultural practice.
        </div>
      </footer>
    </div>
  );
}

export default ClanApp;
