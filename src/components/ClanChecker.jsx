import React, { useState } from "react";
import clansData from "../data/clans.json"; // Assuming clans data is correctly imported
import "./ClanChecker.css"; // For styling

function ClanFinder() {
    const [surname1, setSurname1] = useState(""); // State to store input surname
    const [surname2, setSurname2] = useState(""); // State to store input surname
    const [result, setResult] = useState(""); // State to store search result

    // Function to handle finding clans based on surname
    const findClan = () => {
        if (surname1.trim() === "" || surname2.trim() === "") {
            setResult("Yumnak Ama Nambiyu.");
            return;
        }
    
        // Call the yek function to find clans
        const clanResult = yekThoknaba(surname1, surname2);
        // console.log(clanResult, "check");
    
        // Check if the result is a string message or an array
        if (Array.isArray(clanResult) && clanResult.length > 0) {
            // If it's an array with clans, display them
            setResult(
                <div>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#c3f7df' }}>Yek-Salai:</span> 
                    {clanResult.join(", ")}
                </div>
            );
        } else if (typeof clanResult === 'string') {
            // If it's a string message (e.g., "Not found!"), display that message
            setResult(clanResult);
        } else {
            // Fallback if no result found
            setResult("Not found!");
        }
    };
    

    return (
        <div className="clan-finder">
            <h1>Yek-Thoknaba Yengbiyu</h1>
            <p>Enter your Yumnak's:</p>
            <input
                type="text"
                placeholder="Enter Yumnak 1" 
                value={surname1}
                onChange={(e) => setSurname1(e.target.value)} // Update surname state on input change
            />
             <input
                type="text"
                placeholder="Enter Yumnak 2"
                value={surname2}
                onChange={(e) => setSurname2(e.target.value)} // Update surname state on input change
            />
            <button className="button1" onClick={findClan}>Search</button> {/* Trigger findClan function */}
            <div className="result1"><h2>{result}</h2></div> {/* Display result */}
        </div>
    );
}

// The yek function to search for the clan by surname
function yekThoknaba(yumnak1, yumnak2) {
    // Convert input surnames to lowercase
    yumnak1 = yumnak1.trim().toLowerCase(); 
    yumnak2 = yumnak2.trim().toLowerCase(); 

    const yek1 = [];
    const yek2 = [];

    // Iterate over the clansData object using Object.keys() to get the clan names
    Object.keys(clansData).forEach((clan) => {
        // Check if any surname in the clan matches the first surname (yumnak1)
        if (clansData[clan].some((surname) => surname.toLowerCase() === yumnak1)) {
            yek1.push(clan); // Add the clan to the result array if match found
        }

        // Check if any surname in the clan matches the second surname (yumnak2)
        if (clansData[clan].some((surname) => surname.toLowerCase() === yumnak2)) {
            yek2.push(clan); // Add the clan to the result array if match found
        }
    });

    // Compare the clans of yumnak1 and yumnak2
    if (yek1.length > 0 && yek2.length > 0) {
        const commonClans = yek1.filter((clan) => yek2.includes(clan));

        // If both surnames match more than one clan and they have common clans
        if ((yek1.length > 1 || yek2.length > 1) && commonClans.length > 0) {
            return "Dao yengbiyu 🍀";
        }

        // If common clans exist
        if (commonClans.length > 0) {
            return `Dashaney thoknarey 💔`;
        } else {
            return `Yek Thoknadry 💕`;
        }
    } else {
        return `Enter Yumnak's correctly!`;
    }
}



export default ClanFinder; // Export the ClanFinder component
