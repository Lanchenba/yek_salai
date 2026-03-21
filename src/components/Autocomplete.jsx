import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clansData from "../data/clans.json";
import "./Autocomplete.css";

const allSurnames = Array.from(
    new Set(
        Object.values(clansData).flatMap((surnames) => surnames)
    )
).sort((a, b) => a.localeCompare(b));

function Autocomplete({ value, onChange, placeholder }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const listboxId = useRef(`suggestions-${Math.random().toString(36).slice(2)}`);
    
    useEffect(() => {
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
            : allSurnames.filter(surname => 
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
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSuggestions && suggestions.length > 0}
                aria-controls={listboxId.current}
                aria-activedescendant={activeIndex >= 0 ? `${listboxId.current}-item-${activeIndex}` : undefined}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list" role="listbox" id={listboxId.current}>
                    {suggestions.map((suggestion, idx) => (
                        <li
                            key={suggestion}
                            id={`${listboxId.current}-item-${idx}`}
                            className={`suggestion-item ${idx === activeIndex ? "active" : ""}`}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                            role="option"
                            aria-selected={idx === activeIndex}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Autocomplete.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default Autocomplete;