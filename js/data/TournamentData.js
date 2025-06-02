

export const tournamentStructure = {
    initialMatches: [
        {
            id: "A", team1: "DMG", team2: "ZAY", round: 1, match: 1,
            matchTime: "2025-06-01T16:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" },
            ],
            score: { team1: 5, team2: 3 } // Example score for match A
        },
        {
            id: "B", team1: "PRS", team2: "LCA", round: 1, match: 2,
            matchTime: "2025-06-02T22:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team2" },
            ],
            score: { team1: "(4)2", team2: "2(3)" } // Example score for match A
        },
        {
            id: "C", team1: "GFC", team2: "ULT", round: 1, match: 3,
            matchTime: "2025-06-01T20:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team2" },
            ],
            score: { team1: 1, team2: 3 }
        },
        {
            id: "D", team1: "POR", team2: "MI7", round: 1, match: 4,
            matchTime: "2025-06-01T22:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" },
            ],
            score: { team1: 5, team2: 4 }
        },
        {
            id: "E", team1: "BMR", team2: "U3D", round: 1, match: 5,
            matchTime: "2025-06-02T20:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" },
            ],
            score: { team1: 4, team2: 9 }
        },
        {
            id: "F", team1: "GDC", team2: "ERA", round: 1, match: 6,
            matchTime: "2025-06-01T19:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 5, team2: 4 }
        },
        {
            id: "G", team1: "GR7", team2: "KRS", round: 1, match: 7,
            matchTime: "2025-06-03T20:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ]
        },
        {
            id: "H", team1: "ZTA", team2: "OUN", round: 1, match: 8,
            matchTime: "2025-06-01T17:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 5, team2: 2 }
        },
        
        // Round 1 - Right Side (add similar matchTime values for all matches)
        {
            id: "I", team1: "SXB", team2: "JFC", round: 1, match: 9,
            matchTime: "2025-06-02T21:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team2" }
            ],
            score: { team1: 4, team2: 5 }
        },
        {
            id: "J", team1: "FUR", team2: "KNS", round: 1, match: 10,
            matchTime: "2025-06-01T21:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 8, team2: 4 }
        },
        {
            id: "K", team1: "TFC", team2: "TRM", round: 1, match: 11,
            matchTime: "2025-06-03T19:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ]
        },
        {
            id: "L", team1: "XBU", team2: "CHA", round: 1, match: 12,
            matchTime: "2025-06-03T21:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team2" }
            ]
        },
        {
            id: "M", team1: "FLX", team2: "FLC", round: 1, match: 13,
            matchTime: "2025-06-02T19:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 6, team2: 3 }
        },
        {
            id: "N", team1: "ULC", team2: "PAS", round: 1, match: 14,
            matchTime: "2025-06-01T18:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team2" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 4, team2: 5 }
        },
        {
            id: "O", team1: "DDL", team2: "JXZ", round: 1, match: 15,
            matchTime: "2025-06-03T22:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ]
        },
        {
            id: "P", team1: "F2R", team2: "MUR", round: 1, match: 16,
            matchTime: "2025-06-01T15:00:00+02:00",
            predictions: [
                { mediaId: "DINASTIA", predictedWinner: "team1" },
                { mediaId: "TRATTORIA", predictedWinner: "team1" }
            ],
            score: { team1: 5, team2: 3 }
        }
    ],
    
    round2Winners: [
        { id: "1", team1: "TBD", team2: "TBD", winner1: "A", winner2: "B", round: 2, match: 1 },
        { id: "2", team1: "TBD", team2: "TBD", winner1: "C", winner2: "D", round: 2, match: 2 },
        { id: "3", team1: "TBD", team2: "TBD", winner1: "E", winner2: "F", round: 2, match: 3 },
        { id: "4", team1: "TBD", team2: "TBD", winner1: "G", winner2: "H", round: 2, match: 4 },
        { id: "5", team1: "TBD", team2: "TBD", winner1: "I", winner2: "J", round: 2, match: 5 },
        { id: "6", team1: "TBD", team2: "TBD", winner1: "K", winner2: "L", round: 2, match: 6 },
        { id: "7", team1: "TBD", team2: "TBD", winner1: "M", winner2: "N", round: 2, match: 7 },
        { id: "8", team1: "TBD", team2: "TBD", winner1: "O", winner2: "P", round: 2, match: 8 }
    ],
    
    round2Losers: [
        { id: "9", team1: "TBD", team2: "TBD", loser1: "A", loser2: "B", round: 2, match: 9 },
        { id: "10", team1: "TBD", team2: "TBD", loser1: "C", loser2: "D", round: 2, match: 10 },
        { id: "11", team1: "TBD", team2: "TBD", loser1: "E", loser2: "F", round: 2, match: 11 },
        { id: "12", team1: "TBD", team2: "TBD", loser1: "G", loser2: "H", round: 2, match: 12 },
        { id: "13", team1: "TBD", team2: "TBD", loser1: "I", loser2: "J", round: 2, match: 13 },
        { id: "14", team1: "TBD", team2: "TBD", loser1: "K", loser2: "L", round: 2, match: 14 },
        { id: "15", team1: "TBD", team2: "TBD", loser1: "M", loser2: "N", round: 2, match: 15 },
        { id: "16", team1: "TBD", team2: "TBD", loser1: "O", loser2: "P", round: 2, match: 16 }
    ],
    
    lastChance: [
        { id: "LC1", team1: "TBD", team2: "TBD", loser: "1", winner: "16", round: "LC", match: 1 },
        { id: "LC2", team1: "TBD", team2: "TBD", loser: "2", winner: "15", round: "LC", match: 2 },
        { id: "LC3", team1: "TBD", team2: "TBD", loser: "3", winner: "14", round: "LC", match: 3 },
        { id: "LC4", team1: "TBD", team2: "TBD", loser: "4", winner: "13", round: "LC", match: 4 },
        { id: "LC5", team1: "TBD", team2: "TBD", loser: "5", winner: "12", round: "LC", match: 5 },
        { id: "LC6", team1: "TBD", team2: "TBD", loser: "6", winner: "11", round: "LC", match: 6 },
        { id: "LC7", team1: "TBD", team2: "TBD", loser: "7", winner: "10", round: "LC", match: 7 },
        { id: "LC8", team1: "TBD", team2: "TBD", loser: "8", winner: "9", round: "LC", match: 8 }
    ],
    
    round16: [
        { id: "R16-1", team1: "TBD", team2: "TBD", advancer1: "1", advancer2: "LC1", round: "R16", match: 1 },
        { id: "R16-2", team1: "TBD", team2: "TBD", advancer1: "2", advancer2: "LC2", round: "R16", match: 2 },
        { id: "R16-3", team1: "TBD", team2: "TBD", advancer1: "3", advancer2: "LC3", round: "R16", match: 3 },
        { id: "R16-4", team1: "TBD", team2: "TBD", advancer1: "4", advancer2: "LC4", round: "R16", match: 4 },
        { id: "R16-5", team1: "TBD", team2: "TBD", advancer1: "5", advancer2: "LC5", round: "R16", match: 5 },
        { id: "R16-6", team1: "TBD", team2: "TBD", advancer1: "6", advancer2: "LC6", round: "R16", match: 6 },
        { id: "R16-7", team1: "TBD", team2: "TBD", advancer1: "7", advancer2: "LC7", round: "R16", match: 7 },
        { id: "R16-8", team1: "TBD", team2: "TBD", advancer1: "8", advancer2: "LC8", round: "R16", match: 8 }
    ],
    
    quarterFinals: [
        { id: "QF1", team1: "TBD", team2: "TBD", winner1: "R16-1", winner2: "R16-2", round: "QF", match: 1 },
        { id: "QF2", team1: "TBD", team2: "TBD", winner1: "R16-3", winner2: "R16-4", round: "QF", match: 2 },
        { id: "QF3", team1: "TBD", team2: "TBD", winner1: "R16-5", winner2: "R16-6", round: "QF", match: 3 },
        { id: "QF4", team1: "TBD", team2: "TBD", winner1: "R16-7", winner2: "R16-8", round: "QF", match: 4 }
    ],
    
    semiFinals: [
        { id: "SF1", team1: "TBD", team2: "TBD", winner1: "QF1", winner2: "QF2", round: "SF", match: 1 },
        { id: "SF2", team1: "TBD", team2: "TBD", winner1: "QF3", winner2: "QF4", round: "SF", match: 2 }
    ],
    
    final: [
        { id: "F", team1: "TBD", team2: "TBD", winner1: "SF1", winner2: "SF2", round: "F", match: 1 }
    ]
};

export const roundConfig = {
    round1: { id: 'round1', label: 'ROUND 1' },
    round2: { id: 'round2', label: 'ROUND 2' },
    lastChance: { id: 'lastChance', label: 'LAST CHANCE' },
    round16: { id: 'round16', label: 'ROUND OF 16' },
    quarterFinals: { id: 'quarterFinals', label: 'QUARTER FINALS' },
    semiFinals: { id: 'semiFinals', label: 'SEMI FINALS' },
    final: { id: 'final', label: 'FINAL' }
};

export function getRoundStructure(roundName) {
    return tournamentStructure[roundName] || [];
}

export function getAllRounds() {
    return Object.values(roundConfig);
}