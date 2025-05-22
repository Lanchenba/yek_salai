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

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };

    // Handle keyboard navigation
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            onChange(suggestions[activeIndex]);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <input
                type="text"
                value={value}
                onChange={e => {
                    onChange(e.target.value);
                    setSuggestions(getSuggestions(e.target.value));
                    setShowSuggestions(true);
                    setActiveIndex(-1);
                }}
                onFocus={() => {
                    setSuggestions(getSuggestions(value));
                    setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="autocomplete-input"
                autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="autocomplete-suggestions">
                    {suggestions.map((suggestion, idx) => (
                        <li
                            key={suggestion}
                            className={idx === activeIndex ? "active" : ""}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
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