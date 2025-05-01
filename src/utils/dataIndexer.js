import clansData from '../data/clans.json';

// Create a reverse index for faster surname lookups
export function createSurnameIndex() {
    const surnameIndex = {};
    
    Object.keys(clansData).forEach(clan => {
        clansData[clan].forEach(surname => {
            const normalizedSurname = surname.toLowerCase();
            surnameIndex[normalizedSurname] = clan;
        });
    });
    
    return surnameIndex;
}

// This can be used in your components for faster lookups
export const surnameIndex = createSurnameIndex();