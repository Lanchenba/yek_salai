import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClanFinder from "./ClanFinder";
import ClanChecker from "./ClanChecker";
import "./ClanApp.css";

function pathToTab(pathname) {
  return pathname === "/checker" ? "checker" : "finder";
}

function ClanApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(() => pathToTab(window.location.pathname));

  useEffect(() => {
    setTab(pathToTab(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const titles = {
      finder: "Find My Clan | Yek Salai — Meitei Clan Finder",
      checker: "Check Compatibility | Yek Salai — Meitei Clan Checker",
    };
    document.title = titles[tab] ?? "Yek Salai | Meitei Clan Finder & Compatibility Checker";
  }, [tab]);


  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    if (nextTab === "checker") {
      navigate("/checker");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/finder");
    }
  };

  return (
    <div className="clan-app-container">
      <header className="clan-app-header">
        <h1>Meitei Yek/Salai Community Tool</h1>
        <p className="clan-app-desc">
          <strong>Welcome!</strong> Discover your clan in seconds or check compatibility with clarity. Built for the Meitei community with a calm, guided flow.
        </p>
        <div className="clan-app-badges" aria-label="Tool highlights">
          <span>Fast lookup</span>
          <span>Cultural context</span>
          <span>Mobile friendly</span>
        </div>
      </header>
      <nav className="clan-app-tabs" aria-label="Main functions">
        <button
          className={tab === "finder" ? "active" : ""}
          onClick={() => handleTabChange("finder")}
          aria-selected={tab === "finder"}
        >
          <span role="img" aria-label="search">🔍</span> Find My Clan
        </button>
        <button
          className={tab === "checker" ? "active" : ""}
          onClick={() => handleTabChange("checker")}
          aria-selected={tab === "checker"}
        >
          <span role="img" aria-label="check">💍</span> Check Compatibility
        </button>
      </nav>
      <main className="clan-app-main">
        <div className="clan-app-card">
          <section className="clan-app-tip" aria-live="polite">
            {tab === "finder"
              ? "Tip: Start typing your surname and pick from suggestions for fastest results."
              : "Tip: Use known family surnames for both fields to get an accurate compatibility check."}
          </section>
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
        <div className="clan-app-credit">
          Made with <span className="credit-heart" role="img" aria-label="love">❤️</span> by{" "}
          <a
            href="https://www.instagram.com/keisham.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            className="credit-link"
          >
            Lans Meitei
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ClanApp;
