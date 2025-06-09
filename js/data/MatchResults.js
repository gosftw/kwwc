// Match results state management
export class MatchResults {
    constructor() {
        this.results = {
            round1: {
                "P": { winner: "F2R", loser: "MUR" },
                "A": { winner: "DMG", loser: "ZAY" },
                "H": { winner: "ZTA", loser: "OUN" },
                "N": { winner: "PAS", loser: "ULC" },
                "F": { winner: "GDC", loser: "ERA" },
                "C": { winner: "ULT", loser: "GFC" },
                "J": { winner: "FUR", loser: "KNS" },
                "D": { winner: "POR", loser: "MI7" },
                "M": { winner: "FLX", loser: "FLC" },
                "E": { winner: "U3D", loser: "BMR" },
                "I": { winner: "JFC", loser: "SXB" },
                "B": { winner: "PRS", loser: "LCA" },
                "K": { winner: "TFC", loser: "TRM" },
                "G": { winner: "KRS", loser: "GR7" },
                "L": { winner: "XBU", loser: "CHA" },
                "O": { winner: "DDL", loser: "JXZ" },
            },
            round2Winners: {
                // "1": { winner: "ZAY", loser: "PRS", winnerGoals: 4, loserGoals: 2 },
                "1": { winner: "PRS", loser: "DMG" },
                "2": { winner: "POR", loser: "ULT" },
                "3": { winner: "U3D", loser: "GDC" },
                "7": { winner: "PAS", loser: "FLX" },
                "4": { winner: "ZTA", loser: "KRS" },
                "6": { winner: "TFC", loser: "XBU" },
                "8": { winner: "DDL", loser: "F2R" },
                "5": { winner: "FUR", loser: "JFC" },
            },
            round2Losers: {
                "9": { winner: "LCA", loser: "ZAY" },
                "10": { winner: "MI7", loser: "GFC" },
                "11": { winner: "BMR", loser: "ERA" },
                "15": { winner: "FLC", loser: "ULC" },
                "12": { winner: "GR7", loser: "OUN" },
                "13": { winner: "SXB", loser: "KNS" },
                "14": { winner: "CHA", loser: "TRM" },
                "16": { winner: "JXZ", loser: "MUR" },
            },
            lastChance: {
                "LC2": { winner: "FLC", loser: "ULT" },
                "LC3": { winner: "CHA", loser: "GDC" },
                "LC6": { winner: "XBU", loser: "BMR" },
                "LC7": { winner: "FLX", loser: "MI7" },
                "LC1": { winner: "DMG", loser: "JXZ" },
                "LC4": { winner: "KRS", loser: "SXB" },
                "LC5": { winner: "GR7", loser: "JFC" },
                "LC8": { winner: "F2R", loser: "LCA" },
            },
            round16: {},
            quarterFinals: {},
            semiFinals: {},
            final: {}
        };
        this.realResults = new Set([
            'round1.P', 'round1.A', 'round1.H', 'round1.N', 'round1.F', 'round1.C', 'round1.J', 'round1.D', // day 1
            'round1.E', 'round1.I', 'round1.M', 'round1.B', 'round1.K', 'round1.G', 'round1.L', 'round1.O', // day 2
            'round2Winners.2', 'round2Winners.1', 'round2Winners.3', 'round2Winners.7',
            'round2Winners.4', 'round2Winners.6', 'round2Winners.8', 'round2Winners.5',
            'round2Losers.9', 'round2Losers.10', 'round2Losers.11', 'round2Losers.15',
            'round2Losers.12', 'round2Losers.13', 'round2Losers.14', 'round2Losers.16',
            "lastChance.LC2", "lastChance.LC3", "lastChance.LC6", "lastChance.LC7",
            "lastChance.LC1", "lastChance.LC4", "lastChance.LC5", "lastChance.LC8",
            // Add more real result identifiers as needed
        ]);
    }
    
    // Generic methods
    setResult(round, matchId, result) {
        if (!this.results[round]) {
            this.results[round] = {};
        }
        this.results[round][matchId] = result;
    }
    
    getResult(round, matchId) {
        return this.results[round]?.[matchId] || null;
    }
    
    getRoundResults(round) {
        return this.results[round] || {};
    }
    
    getAllResults() {
        return this.results;
    }
    
    // Specific round methods for compatibility
    setRound1Result(matchId, result) {
        this.setResult('round1', matchId, result);
    }
    
    getRound1Result(matchId) {
        return this.getResult('round1', matchId);
    }
    
    setRound2WinnersResult(matchId, result) {
        this.setResult('round2Winners', matchId, result);
    }
    
    getRound2WinnersResult(matchId) {
        return this.getResult('round2Winners', matchId);
    }
    
    setRound2LosersResult(matchId, result) {
        this.setResult('round2Losers', matchId, result);
    }
    
    getRound2LosersResult(matchId) {
        return this.getResult('round2Losers', matchId);
    }
    
    setLastChanceResult(matchId, result) {
        this.setResult('lastChance', matchId, result);
    }
    
    getLastChanceResult(matchId) {
        return this.getResult('lastChance', matchId);
    }
    
    setRound16Result(matchId, result) {
        this.setResult('round16', matchId, result);
    }
    
    getRound16Result(matchId) {
        return this.getResult('round16', matchId);
    }
    
    setQuarterFinalsResult(matchId, result) {
        this.setResult('quarterFinals', matchId, result);
    }
    
    getQuarterFinalsResult(matchId) {
        return this.getResult('quarterFinals', matchId);
    }
    
    setSemiFinalsResult(matchId, result) {
        this.setResult('semiFinals', matchId, result);
    }
    
    getSemiFinalsResult(matchId) {
        return this.getResult('semiFinals', matchId);
    }
    
    setFinalResult(matchId, result) {
        this.setResult('final', matchId, result);
    }
    
    getFinalResult(matchId) {
        return this.getResult('final', matchId);
    }
    
    // State management
    getState() {
        return this.results;
    }
    
    setState(state) {
        // if (state && typeof state === 'object') {
        //     this.results = { ...this.results, ...state };
        // }
        if (state && typeof state === 'object') {
            // Keep existing results, only fill empty rounds
            Object.keys(state).forEach(round => {
                if (!this.results[round]) {
                    this.results[round] = {};
                }
                
                Object.keys(state[round] || {}).forEach(matchId => {
                    if (!this.results[round][matchId]) {
                        this.results[round][matchId] = state[round][matchId];
                    }
                });
            });
        }
    }

    setRealResults(realResults) {
        if (realResults && typeof realResults === 'object') {
            this.results = { ...this.results, ...realResults };
        }
    }

    isRealResult(round, matchId) {
        return this.realResults.has(`${round}.${matchId}`);
    }
    
    // Mark a result as real
    markAsReal(round, matchId) {
        this.realResults.add(`${round}.${matchId}`);
    }
    
    clearRound(round) {
        this.results[round] = {};
    }
    
    clearFromRound(startRound) {
        const rounds = ['round16', 'quarterFinals', 'semiFinals', 'final'];
        const startIndex = rounds.indexOf(startRound);
        
        if (startIndex >= 0) {
            rounds.slice(startIndex).forEach(round => {
                this.clearRound(round);
            });
        }
    }
    
    reset() {
        Object.keys(this.results).forEach(round => {
            this.results[round] = {};
        });
    }
}