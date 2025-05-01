import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClanFinder from "./components/ClanFinder";
import ClanChecker from "./components/ClanChecker";
import "./App.css";

function App() {
    const [showClanChecker, setShowClanChecker] = useState(false);
    const [bootupComplete, setBootupComplete] = useState(false);
    const [bootText, setBootText] = useState('');
    const navigate = useNavigate();

    // Function to toggle between ClanChecker and ClanFinder
    const toggleView = () => {
        // Play terminal sound
        const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU");
        audio.volume = 0.2;
        audio.play();
        
        setShowClanChecker(!showClanChecker);
        // Update URL for deep-linking
        navigate(!showClanChecker ? '/checker' : '/finder', { replace: true });
    };

    // Simulate terminal bootup sequence
    useEffect(() => {
        const bootupMessages = [
            'INITIATING YEK-OS v1.3.8...',
            'LOADING CORE MODULES...',
            'SCANNING DATABASE...',
            'SYSTEM CLOCK SYNCHRONIZED',
            'YEK-SALAI DATABASE: CONNECTED',
            'INITIALIZING USER INTERFACE...',
            'YEK-OS BOOTUP COMPLETE.'
        ];
        
        let i = 0;
        const bootupInterval = setInterval(() => {
            if (i < bootupMessages.length) {
                setBootText(prev => prev + bootupMessages[i] + '\n');
                i++;
            } else {
                clearInterval(bootupInterval);
                setTimeout(() => {
                    setBootupComplete(true);
                }, 500);
            }
        }, 300);
        
        return () => clearInterval(bootupInterval);
    }, []);

    // Check URL path and set the right view
    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/checker') {
            setShowClanChecker(true);
        }
    }, []);

    if (!bootupComplete) {
        return (
            <div className="terminal-bootup">
                <pre className="bootup-text">
                    {bootText}
                    {bootText.endsWith('\n') ? <span className="cursor-blink"></span> : null}
                </pre>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header>
                <div className="header-decoration">
                    <div className="terminal-bar">
                        <span className="terminal-title">YEK-OS TERMINAL</span>
                        <div className="terminal-buttons">
                            <span className="terminal-button"></span>
                            <span className="terminal-button"></span>
                            <span className="terminal-button"></span>
                        </div>
                    </div>
                </div>
                
                <button onClick={toggleView} className="toggle-button">
                    {showClanChecker ? "[ Yek-Salai Finder ]" : "[ Yek-Thoknaba Checker ]"}
                </button>
            </header>
            
            <main>
                {/* Conditionally render the component based on state */}
                {showClanChecker ? <ClanChecker /> : <ClanFinder />}
            </main>
            
            <footer>
                <div className="terminal-line">
                    <span className="terminal-prompt">user@yek-os:~$</span>
                    <span className="terminal-command">get_current_year</span>
                </div>
                <p className="footer-text">
                    &copy; {new Date().getFullYear()} YEK-OS SYSTEM // ALL RIGHTS RESERVED
                    <span className="cursor-blink"></span>
                </p>
            </footer>
        </div>
    );
}

export default App;
