import React, { useState } from "react";
import clansData from "../data/clans.json"; // Assuming clans data is correctly imported
import "./ClanFinder.css"; // For styling

function ClanFinder() {
    const [surname, setSurname] = useState(""); // State to store input surname
    const [result, setResult] = useState(""); // State to store search result

    // Function to handle finding clans based on surname
    const findClan = () => {
        if (surname.trim() === "") {
            setResult("Yumnak Ama Nambiyu.");
            return;
        }

        // Call the yek function to find clans
        const clanResult = yek(surname);

        // Display the clans found or message if not found
        if (clanResult.length > 0) {
            setResult(<div><span style={{ fontWeight: 'bold', fontSize: '18px', color: '#c3f7df' }}>Yek-Salai:</span> {clanResult.join(", ")}</div>);
        } else {
            setResult("Not found!");
        }
    };

    return (
        <div className="clan-finder">
            <h1>Yek-salai Finder</h1>
            <p>Enter your Yumnak to find your Yek-Salai:</p>
            <input
                type="text"
                placeholder="Enter Yumnak"
                value={surname}
                onChange={(e) => setSurname(e.target.value)} // Update surname state on input change
            />
            <button className="button1" onClick={findClan}>Search</button> {/* Trigger findClan function */}
            <div className="result">{result}</div> {/* Display result */}
        </div>
    );
}

// The yek function to search for the clan by surname
function yek(yumnak) {
    const data = yumnak.toLowerCase(); // Convert input surname to lowercase for case-insensitive search
    const yek = []; // Initialize an array to hold the matching clans

    // Iterate over the clansData object using Object.keys() to get the clan names
    Object.keys(clansData).forEach((clan) => {
        // Check if any surname in the clan matches the input surname
        if (clansData[clan].some((surname) => surname.toLowerCase() === data)) {
            yek.push(clan); // Add the clan to the result array if match found
        }
    });

    return yek; // Return the array of matching clans
}

export default ClanFinder; // Export the ClanFinder component
