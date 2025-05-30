// Local storage management extracted from bracket.js
const STORAGE_KEY = 'kwccTournamentState';

export class Storage {
    static save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save tournament state:', error);
            return false;
        }
    }
    
    static load() {
        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            return savedState ? JSON.parse(savedState) : null;
        } catch (error) {
            console.error('Failed to load tournament state:', error);
            return null;
        }
    }
    
    static clear() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to clear tournament state:', error);
            return false;
        }
    }
    
    static exists() {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }
}

export function saveState(data) {
    return Storage.save(data);
}

export function loadState() {
    return Storage.load();
}

export function clearState() {
    return Storage.clear();
}
