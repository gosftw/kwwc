// Match results state management
export class MatchResults {
    constructor() {
        this.results = {
            round1: {},
            round2Winners: {},
            round2Losers: {},
            lastChance: {},
            round16: {},
            quarterFinals: {},
            semiFinals: {},
            final: {}
        };
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
        if (state && typeof state === 'object') {
            this.results = { ...this.results, ...state };
        }
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