import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clansData from "../data/clans.json";
import Autocomplete from "./Autocomplete";
import "./ClanFinder.css";

function ClanFinder() {
    const [surname, setSurname] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [typeEffect, setTypeEffect] = useState(true);
    const [displayText, setDisplayText] = useState("");
    const [loadingDots, setLoadingDots] = useState("");
    const navigate = useNavigate();

    // Terminal typing effect for header
    useEffect(() => {
        if (typeEffect) {
            const text = "Enter your Yumnak to find your Yek-Salai:";
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typing);
                    setTypeEffect(false);
                }
            }, 40);
            return () => clearInterval(typing);
        }
    }, [typeEffect]);

    // Loading animation
    useEffect(() => {
        if (loading) {
            const symbols = ["|", "/", "-", "\\"];
            let i = 0;
            const loadingAnimation = setInterval(() => {
                setLoadingDots(symbols[i % symbols.length]);
                i++;
            }, 150);
            return () => clearInterval(loadingAnimation);
        }
    }, [loading]);

    const findClan = () => {
        // Reset states
        setError("");
        setResult("");
        
        if (surname.trim() === "") {
            setError("ERROR: Yumnak input required");
            return;
        }

        // Show loading indicator
        setLoading(true);
        
        // Simulate terminal processing
        const delayTime = Math.floor(Math.random() * 500) + 500; // Random delay between 500-1000ms
        setTimeout(() => {
            try {
                // Terminal "typing" sound effect
                try {
                    const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
                    audio.volume = 0.1;
                    audio.play();
                } catch (e) {
                    // Ignore audio errors
                }
                
                // Call the yek function to find clans
                const clanResult = yek(surname);
                
                // Display the clans found or message if not found
                if (clanResult.length > 0) {
                    setResult(
                        <div className="result-container">
                            <div className="search-status">
                                <span className="status-label">[STATUS]</span> MATCH FOUND
                            </div>
                            <div className="search-result">
                                <span className="result-label">Yek-Salai:</span> 
                                <span className="result-value">{clanResult.join(", ")}</span>
                            </div>
                        </div>
                    );
                } else {
                    setError("ERROR 404: Yumnak not found in database");
                }
            } catch (err) {
                setError("SYSTEM ERROR: Database query failed");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, delayTime);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            findClan();
        }
    };

    const switchToChecker = () => {
        // Play terminal sound
        try {
            const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
            audio.volume = 0.1;
            audio.play();
        } catch (e) {
            // Ignore audio errors
        }
        navigate('/checker');
    };

    return (
        <div className="clan-finder">
            <h1 className="title">Yek-salai Finder</h1>
            <p className="description">
                {displayText}
                {typeEffect && <span className="cursor-blink"></span>}
            </p>
            
            <div className="search-container">
                <Autocomplete
                    value={surname}
                    onChange={setSurname}
                    placeholder="Enter Yumnak"
                />
                <button 
                    className="button1" 
                    onClick={findClan}
                    disabled={loading}
                >
                    {loading ? 
                        <><span className="terminal-spinner">{loadingDots}</span> PROCESSING...</> : 
                        "SEARCH DATABASE"}
                </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {result && <div className="result">{result}</div>}
            
            <div className="hint">
                <span className="hint-prompt">&gt; </span>
                <span className="hint-text">Try samples: Keisham, Yendrembam</span>
            </div>
            
            <div className="switch-container">
                <button 
                    className="switch-button" 
                    onClick={switchToChecker}
                >
                    <span className="switch-icon">⟹</span> YEK-THOKNABA CHECKER
                </button>
            </div>
            
            <div className="system-info">
                <span className="memory-label">MEM:</span> 640K 
                <span className="system-separator">|</span>
                <span className="cpu-label">CPU:</span> Z80 4MHz
            </div>
        </div>
    );
}

// The yek function to search for the clan by surname
function yek(yumnak) {
    const data = yumnak.trim().toLowerCase();
    const yek = [];

    Object.keys(clansData).forEach((clan) => {
        if (clansData[clan].some((surname) => surname.toLowerCase() === data)) {
            yek.push(clan);
        }
    });

    return yek;
}

export default ClanFinder;
