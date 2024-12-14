import React, { useState } from "react";
import ClanFinder from "./components/ClanFinder";
import ClanChecker from "./components/ClanChecker";

function App() {
    const [showClanChecker, setShowClanChecker] = useState(false);

    // Function to toggle between ClanChecker and ClanFinder
    const toggleView = () => {
        setShowClanChecker(!showClanChecker);
    };

    return (
        <div>
            {/* Fixed position button at the top center */}
            <button 
                onClick={toggleView} 
                style={{
                    position: 'fixed', 
                    top: '10px', // Adjust this for desired spacing from the top
                    left: '50%', 
                    transform: 'translateX(-50%)', // Centers the button horizontally
                    padding: '10px 20px', 
                    backgroundColor: '#677D6A', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px',
                    zIndex: '1000', // Ensures the button is above other content
                }}
            >
                {showClanChecker ? "Switch to Clan Finder" : "Switch to Clan Checker"}
            </button>

            {/* Conditionally render the component based on state */}
            {showClanChecker ? <ClanChecker /> : <ClanFinder />}
        </div>
    );
}

export default App;
