import React, { useState, useEffect, useRef } from "react";
import clansData from "../data/clans.json";
import "./Autocomplete.css";

function Autocomplete({ value, onChange, placeholder }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const wrapperRef = useRef(null);
    
    // Create a flat array of all surnames from clans.json
    const allSurnames = useRef([]);
    
    useEffect(() => {
        // Flatten the clans data into a single array of unique surnames
        const surnames = [];
        Object.keys(clansData).forEach(clan => {
            clansData[clan].forEach(surname => {
                if (!surnames.includes(surname)) {
                    surnames.push(surname);
                }
            });
        });
        allSurnames.current = surnames.sort();
        
        // Add click outside listener
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    // Filter suggestions based on input
    const getSuggestions = (input) => {
        const inputValue = input.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        return inputLength === 0 
            ? [] 
            : allSurnames.current.filter(surname => 
                surname.toLowerCase().slice(0, inputLength) === inputValue
            ).slice(0, 5); // Limit to 5 suggestions
    };
    
    // Update suggestions when input changes
    const handleChange = (e) => {
        const userInput = e.target.value;
        onChange(userInput);
        
        // Update suggestions
        const filteredSuggestions = getSuggestions(userInput);
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
    };
    
    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        onChange(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };
    
    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <input
                type="text"
                className="search-input"
                onChange={handleChange}
                value={value}
                onFocus={() => {
                    setInputFocus(true);
                    if (value) {
                        setSuggestions(getSuggestions(value));
                        setShowSuggestions(true);
                    }
                }}
                onBlur={() => {
                    setTimeout(() => setInputFocus(false), 200);
                }}
                placeholder={placeholder}
            />
            
            {showSuggestions && suggestions.length > 0 && inputFocus && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Autocomplete;