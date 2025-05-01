import { useState } from 'react';
import clansData from '../data/clans.json';

export function useClans() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Get all unique surnames
    const getAllSurnames = () => {
        const surnames = [];
        Object.keys(clansData).forEach(clan => {
            clansData[clan].forEach(surname => {
                if (!surnames.includes(surname)) {
                    surnames.push(surname);
                }
            });
        });
        return surnames.sort();
    };
    
    // Find clan by surname
    const findClanBySurname = (surname) => {
        setLoading(true);
        setError('');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    const data = surname.trim().toLowerCase();
                    const results = [];
                    
                    Object.keys(clansData).forEach((clan) => {
                        if (clansData[clan].some((s) => s.toLowerCase() === data)) {
                            results.push(clan);
                        }
                    });
                    
                    setLoading(false);
                    resolve(results);
                } catch (err) {
                    setError('An error occurred while searching');
                    setLoading(false);
                    resolve([]);
                }
            }, 300);
        });
    };
    
    // Check if two surnames belong to the same clan
    const checkClanCompatibility = (surname1, surname2) => {
        setLoading(true);
        setError('');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    const s1 = surname1.trim().toLowerCase();
                    const s2 = surname2.trim().toLowerCase();
                    
                    const yek1 = [];
                    const yek2 = [];
                    
                    Object.keys(clansData).forEach((clan) => {
                        if (clansData[clan].some((s) => s.toLowerCase() === s1)) {
                            yek1.push(clan);
                        }
                        if (clansData[clan].some((s) => s.toLowerCase() === s2)) {
                            yek2.push(clan);
                        }
                    });
                    
                    let result = '';
                    
                    if (yek1.length > 0 && yek2.length > 0) {
                        const commonClans = yek1.filter((clan) => yek2.includes(clan));
                        
                        if ((yek1.length > 1 || yek2.length > 1) && commonClans.length > 0) {
                            result = "Dao yengbiyu 🍀";
                        } else if (commonClans.length > 0) {
                            result = "Dashaney thoknarey 💔";
                        } else {
                            result = "Yek Thoknadry 💕";
                        }
                    } else {
                        result = "Enter Yumnak's correctly!";
                    }
                    
                    setLoading(false);
                    resolve({ result, clans1: yek1, clans2: yek2 });
                } catch (err) {
                    setError('An error occurred while checking');
                    setLoading(false);
                    resolve({ result: '', clans1: [], clans2: [] });
                }
            }, 300);
        });
    };
    
    return {
        loading,
        error,
        getAllSurnames,
        findClanBySurname,
        checkClanCompatibility,
    };
}