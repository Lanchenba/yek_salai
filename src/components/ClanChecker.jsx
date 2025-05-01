import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clansData from "../data/clans.json";
import "./ClanChecker.css";

function ClanChecker() {
    const [surname1, setSurname1] = useState("");
    const [surname2, setSurname2] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [typeEffect, setTypeEffect] = useState(true);
    const [displayText, setDisplayText] = useState("");
    const [loadingDots, setLoadingDots] = useState("");
    const [analysisStage, setAnalysisStage] = useState(0);
    const navigate = useNavigate();

    // Terminal typing effect for header
    useEffect(() => {
        if (typeEffect) {
            const text = "Enter both Yumnaks to check compatibility:";
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

    // Loading animation and analysis stages
    useEffect(() => {
        if (loading) {
            // Loading spinner
            const symbols = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
            let i = 0;
            const loadingAnimation = setInterval(() => {
                setLoadingDots(symbols[i % symbols.length]);
                i++;
            }, 100);
            
            // Analysis stages simulation
            const stages = [
                "INITIALIZING DATABASE CONNECTION...",
                "SEARCHING YEK RECORDS...",
                "CROSS-REFERENCING DATA...",
                "ANALYZING COMPATIBILITY...",
                "GENERATING RESULTS..."
            ];
            
            let stage = 0;
            const stageInterval = setInterval(() => {
                if (stage < stages.length) {
                    setAnalysisStage(stage);
                    stage++;
                } else {
                    clearInterval(stageInterval);
                }
            }, 400);
            
            return () => {
                clearInterval(loadingAnimation);
                clearInterval(stageInterval);
                setAnalysisStage(0);
            };
        }
    }, [loading]);

    const findClan = () => {
        // Reset states
        setError("");
        setResult("");
        
        if (surname1.trim() === "" || surname2.trim() === "") {
            setError("ERROR: Both Yumnaks required for analysis");
            return;
        }
        
        // Show loading indicator
        setLoading(true);
        
        // Simulate terminal processing with progressive stages
        const delayTime = Math.floor(Math.random() * 800) + 1000; // Random delay for realistic analysis
        setTimeout(() => {
            try {
                // Terminal "processing" sound effect
                try {
                    const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
                    audio.volume = 0.1;
                    audio.play();
                } catch (e) {
                    // Ignore audio errors
                }
                
                // Call the yek function to find clans
                const clanResult = yekThoknaba(surname1, surname2);
                
                // Process result with retro terminal styling
                if (typeof clanResult === 'string') {
                    // Format display based on result message
                    if (clanResult.includes("Dashaney thoknarey")) {
                        setResult(
                            <div className="result-negative">
                                <div className="result-header">
                                    <span className="analysis-symbol">!</span>
                                    <span>COMPATIBILITY ANALYSIS</span>
                                </div>
                                <div className="result-content">
                                    <div className="result-icon">⚠️</div>
                                    <div className="result-message">
                                        <div className="result-title">ALERT: SAME CLAN DETECTED</div>
                                        <div className="result-detail">Dashaney thoknarey</div>
                                        <div className="binary-decoration">10010110 01001010</div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if (clanResult.includes("Yek Thoknadry")) {
                        setResult(
                            <div className="result-positive">
                                <div className="result-header">
                                    <span className="analysis-symbol">✓</span>
                                    <span>COMPATIBILITY ANALYSIS</span>
                                </div>
                                <div className="result-content">
                                    <div className="result-icon">💕</div>
                                    <div className="result-message">
                                        <div className="result-title">MATCH APPROVED</div>
                                        <div className="result-detail">Yek Thoknadry</div>
                                        <div className="binary-decoration">11001100 01010101</div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if (clanResult.includes("Dao yengbiyu")) {
                        setResult(
                            <div className="result-warning">
                                <div className="result-header">
                                    <span className="analysis-symbol">?</span>
                                    <span>COMPATIBILITY ANALYSIS</span>
                                </div>
                                <div className="result-content">
                                    <div className="result-icon">🍀</div>
                                    <div className="result-message">
                                        <div className="result-title">FURTHER VERIFICATION NEEDED</div>
                                        <div className="result-detail">Dao yengbiyu</div>
                                        <div className="binary-decoration">10101010 01011011</div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        setError("ERROR: " + clanResult);
                    }
                } else {
                    setError("SYSTEM ERROR: Invalid analysis format");
                }
            } catch (err) {
                setError("FATAL ERROR: Analysis failed");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, delayTime);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.name === 'surname1' && surname2) {
                findClan();
            } else if (e.target.name === 'surname2' && surname1) {
                findClan();
            }
        }
    };

    const renderLoadingStage = () => {
        const stages = [
            "INITIALIZING DATABASE CONNECTION...",
            "SEARCHING YEK RECORDS...",
            "CROSS-REFERENCING DATA...",
            "ANALYZING COMPATIBILITY...",
            "GENERATING RESULTS..."
        ];
        
        if (analysisStage < stages.length) {
            return (
                <div className="analysis-stage">
                    <span className="stage-spinner">{loadingDots}</span>
                    <span className="stage-text">{stages[analysisStage]}</span>
                </div>
            );
        }
        return null;
    };

    const switchToFinder = () => {
        // Play terminal sound
        try {
            const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
            audio.volume = 0.1;
            audio.play();
        } catch (e) {
            // Ignore audio errors
        }
        navigate('/finder');
    };

    return (
        <div className="clan-finder">
            <h1 className="title">Yek-Thoknaba Analysis</h1>
            <p className="description">
                {displayText}
                {typeEffect && <span className="cursor-blink"></span>}
            </p>
            
            <div className="inputs-container">
                <input
                    type="text"
                    placeholder="> ENTER YUMNAK_1" 
                    value={surname1}
                    onChange={(e) => setSurname1(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                    name="surname1"
                />
                <input
                    type="text"
                    placeholder="> ENTER YUMNAK_2"
                    value={surname2}
                    onChange={(e) => setSurname2(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                    name="surname2"
                />
                <button 
                    className="button1" 
                    onClick={findClan}
                    disabled={loading}
                >
                    {loading ? 
                        "ANALYZING..." : 
                        "RUN COMPATIBILITY CHECK"}
                </button>
            </div>
            
            {loading && renderLoadingStage()}
            
            {error && <div className="error-message">{error}</div>}
            <div className="result1">{result}</div>
            
            <div className="hint">
                <span className="hint-prompt">CMD:</span>
                <span className="hint-text">Try "Keisham" + "Yendrembam"</span>
            </div>
            
            <div className="switch-container">
                <button 
                    className="switch-button" 
                    onClick={switchToFinder}
                >
                    <span className="switch-icon">⟸</span> YEK-SALAI FINDER
                </button>
            </div>
            
            <div className="system-info">
                <span className="data-retrieval">DATA RETRIEVAL ACTIVE</span>
                <span className="system-separator">|</span>
                <span className="system-status">SYSTEM OK</span>
            </div>
        </div>
    );
}

// The yekThoknaba function (same as your existing function)
function yekThoknaba(yumnak1, yumnak2) {
    yumnak1 = yumnak1.trim().toLowerCase(); 
    yumnak2 = yumnak2.trim().toLowerCase(); 

    const yek1 = [];
    const yek2 = [];

    Object.keys(clansData).forEach((clan) => {
        if (clansData[clan].some((surname) => surname.toLowerCase() === yumnak1)) {
            yek1.push(clan);
        }
        if (clansData[clan].some((surname) => surname.toLowerCase() === yumnak2)) {
            yek2.push(clan);
        }
    });

    if (yek1.length > 0 && yek2.length > 0) {
        const commonClans = yek1.filter((clan) => yek2.includes(clan));

        if ((yek1.length > 1 || yek2.length > 1) && commonClans.length > 0) {
            return "Dao yengbiyu 🍀";
        }

        if (commonClans.length > 0) {
            return `Dashaney thoknarey 💔`;
        } else {
            return `Yek Thoknadry 💕`;
        }
    } else {
        return `Enter Yumnak's correctly!`;
    }
}

export default ClanChecker;
