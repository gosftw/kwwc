// Core tournament bracket logic and state management

import { tournamentStructure } from '../data/TournamentData.js';
import { MatchResults } from '../data/MatchResults.js';
import { Storage } from '../data/Storage.js';
import { updateMatchCard } from '../ui/MatchRenderer.js';
import { displayChampion, resetChampionDisplay } from '../ui/Champion.js';

// Extract tournament structures for easy access
const {
    round2Winners: round2WinnersStructure,
    round2Losers: round2LosersStructure,
    lastChance: lastChanceStructure,
    round16: round16Structure,
    quarterFinals: quarterFinalsStructure,
    semiFinals: semiFinalsStructure,
    final: finalStructure
} = tournamentStructure;

// Initialize match results (will be imported from main)
let matchResults;

// Initialize match results instance
function initializeMatchResults(matchResultsInstance) {
    matchResults = matchResultsInstance;
}

// Handle winner selection
function selectWinner(teamElement) {
    const matchCard = teamElement.closest('.match-card');
    const matchId = matchCard.dataset.matchId;
    const teamId = teamElement.dataset.teamId;
    const teams = matchCard.querySelectorAll('.team');
    
    // Remove selected class from both teams
    teams.forEach(team => team.classList.remove('selected'));
    
    // Add selected class to the clicked team
    teamElement.classList.add('selected');
    
    // Determine round and update match results
    if (matchId.match(/^[A-P]$/)) { // Round 1
        const loserId = Array.from(teams)
            .find(team => team.dataset.teamId !== teamId)
            .dataset.teamId;
        
        // Store results
        matchResults.setRound1Result(matchId, {
            winner: teamId,
            loser: loserId
        });
        
        // Update Round 2 winners bracket
        updateRound2Winners();
        
        // Update Round 2 losers bracket
        updateRound2Losers();
    } else if (matchId.match(/^[1-8]$/)) { // Round 2 Winners
        const loserId = Array.from(teams)
            .find(team => team.dataset.teamId !== teamId)
            .dataset.teamId;
        
        // Store results
        matchResults.setRound2WinnersResult(matchId, {
            winner: teamId,
            loser: loserId
        });
        
        // Update Last Chance matches
        updateLastChance();
        
        // Update Round of 16
        updateRound16();
    } else if (matchId.match(/^(9|10|11|12|13|14|15|16)$/)) { // Round 2 Losers
        // Store results
        matchResults.setRound2LosersResult(matchId, {
            winner: teamId
        });
        
        // Update Last Chance matches
        updateLastChance();
    } else if (matchId.match(/^LC[1-8]$/)) { // Last Chance
        // Store results
        matchResults.setLastChanceResult(matchId, {
            winner: teamId
        });
        
        // Update Round of 16
        updateRound16();
    } else if (matchId.match(/^R16-[1-8]$/)) { // Round of 16
        // Store results
        matchResults.setRound16Result(matchId, {
            winner: teamId
        });
        
        // Update Quarter Finals
        updateQuarterFinals();
    } else if (matchId.match(/^QF[1-4]$/)) { // Quarter Finals
        // Store results
        matchResults.setQuarterFinalsResult(matchId, {
            winner: teamId
        });
        
        // Update Semi Finals
        updateSemiFinals();
    } else if (matchId.match(/^SF[1-2]$/)) { // Semi Finals
        // Store results
        matchResults.setSemiFinalsResult(matchId, {
            winner: teamId
        });
        
        // Update Final
        updateFinal();
    } else if (matchId === 'F') { // Final
        // Store results
        matchResults.setFinalResult(matchId, {
            winner: teamId
        });
        
        // Display champion
        displayChampion(teamId);
    }
    
    // Save tournament state to local storage
    saveState();
}

// Update Round 2 Winners bracket based on Round 1 results
function updateRound2Winners() {
    round2WinnersStructure.forEach(match => {
        const winner1Result = matchResults.getRound1Result(match.winner1);
        const winner2Result = matchResults.getRound1Result(match.winner2);
        
        // Update the match even if only one winner is known
        if (winner1Result || winner2Result) {
            // Update team1 if winner1 is known
            if (winner1Result) {
                match.team1 = winner1Result.winner;
            }
            
            // Update team2 if winner2 is known
            if (winner2Result) {
                match.team2 = winner2Result.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match, 'winners');
        }
    });
}

// Update Round 2 Losers bracket based on Round 1 results
function updateRound2Losers() {
    round2LosersStructure.forEach(match => {
        const loser1Result = matchResults.getRound1Result(match.loser1);
        const loser2Result = matchResults.getRound1Result(match.loser2);
        
        // Update the match even if only one loser is known
        if (loser1Result || loser2Result) {
            // Update team1 if loser1 is known
            if (loser1Result) {
                match.team1 = loser1Result.loser;
            }
            
            // Update team2 if loser2 is known
            if (loser2Result) {
                match.team2 = loser2Result.loser;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match, 'losers');
        }
    });
}

// Update Last Chance matches
function updateLastChance() {
    lastChanceStructure.forEach(match => {
        const loserResult = matchResults.getRound2WinnersResult(match.loser);
        const winnerResult = matchResults.getRound2LosersResult(match.winner);
        
        // Update the match even if only one team is known
        if (loserResult || winnerResult) {
            // Update team1 if loser is known
            if (loserResult) {
                match.team1 = loserResult.loser;
            }
            
            // Update team2 if winner is known
            if (winnerResult) {
                match.team2 = winnerResult.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match);
        }
    });
}

// Update Round of 16 matches
function updateRound16() {
    round16Structure.forEach(match => {
        const advancer1Result = matchResults.getRound2WinnersResult(match.advancer1);
        // Fix: Check if advancer2 already has LC prefix
        const lcKey = match.advancer2.startsWith('LC') ? match.advancer2 : `LC${match.advancer2}`;
        const advancer2Result = matchResults.getLastChanceResult(lcKey);
        
        // Update the match even if only one team is known
        if (advancer1Result || advancer2Result) {
            // Update team1 if advancer1 is known
            if (advancer1Result) {
                match.team1 = advancer1Result.winner;
            }
            
            // Update team2 if advancer2 is known
            if (advancer2Result) {
                match.team2 = advancer2Result.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match);
        }
    });
}

// Update Quarter Finals matches
function updateQuarterFinals() {
    quarterFinalsStructure.forEach(match => {
        const winner1Result = matchResults.getRound16Result(match.winner1);
        const winner2Result = matchResults.getRound16Result(match.winner2);
        
        // Update the match even if only one winner is known
        if (winner1Result || winner2Result) {
            // Update team1 if winner1 is known
            if (winner1Result) {
                match.team1 = winner1Result.winner;
            }
            
            // Update team2 if winner2 is known
            if (winner2Result) {
                match.team2 = winner2Result.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match);
        }
    });
}

// Update Semi Finals matches
function updateSemiFinals() {
    semiFinalsStructure.forEach(match => {
        const winner1Result = matchResults.getQuarterFinalsResult(match.winner1);
        const winner2Result = matchResults.getQuarterFinalsResult(match.winner2);
        
        // Update the match even if only one winner is known
        if (winner1Result || winner2Result) {
            // Update team1 if winner1 is known
            if (winner1Result) {
                match.team1 = winner1Result.winner;
            }
            
            // Update team2 if winner2 is known
            if (winner2Result) {
                match.team2 = winner2Result.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match);
        }
    });
}

// Update Final match
function updateFinal() {
    finalStructure.forEach(match => {
        const winner1Result = matchResults.getSemiFinalsResult(match.winner1);
        const winner2Result = matchResults.getSemiFinalsResult(match.winner2);
        
        // Update the match even if only one winner is known
        if (winner1Result || winner2Result) {
            // Update team1 if winner1 is known
            if (winner1Result) {
                match.team1 = winner1Result.winner;
            }
            
            // Update team2 if winner2 is known
            if (winner2Result) {
                match.team2 = winner2Result.winner;
            }
            
            // Find and update the corresponding match card
            updateMatchCard(match);
        }
    });
}

// Save tournament state to local storage
function saveState() {
    const stateToSave = {
        matchResults: matchResults.getState(),
        tournamentStructure: {
            round16: round16Structure.map(match => ({
                id: match.id,
                advancer1: match.advancer1,
                advancer2: match.advancer2
            }))
        }
    };
    Storage.save(stateToSave);
}

// Load tournament state from local storage
function loadState() {
    const savedState = Storage.load();
    
    if (savedState) {
        // Handle legacy format (just match results) and new format (object with matchResults and tournamentStructure)
        if (savedState.matchResults) {
            // New format
            matchResults.setState(savedState.matchResults);
            
            // Restore tournament structure if available
            if (savedState.tournamentStructure && savedState.tournamentStructure.round16) {
                savedState.tournamentStructure.round16.forEach(savedMatch => {
                    const structureMatch = round16Structure.find(match => match.id === savedMatch.id);
                    if (structureMatch) {
                        structureMatch.advancer1 = savedMatch.advancer1;
                        structureMatch.advancer2 = savedMatch.advancer2;
                    }
                });
            }
        } else {
            // Legacy format (just match results)
            matchResults.setState(savedState);
        }
        
        // Restore bracket state based on saved results
        restoreBracketState();
    } else {
        // No saved state, but we might have real results from constructor
        // Still need to restore UI state to show real results
        restoreBracketState();
    }
}

// Restore the bracket state from saved results
function restoreBracketState() {
    // Restore Round 1 selections
    const round1Results = matchResults.getRoundResults('round1');
    for (const matchId in round1Results) {
        const result = round1Results[matchId];
        const matchCard = document.querySelector(`#round1 .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('round1', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Round 2 Winners
    updateRound2Winners();
    
    // Update Round 2 Losers
    updateRound2Losers();
    
    // Restore Round 2 Winners selections
    const round2WinnersResults = matchResults.getRoundResults('round2Winners');
    for (const matchId in round2WinnersResults) {
        const result = round2WinnersResults[matchId];
        // Updated selector to find in column structure
        const matchCard = document.querySelector(`#round2 .winners-bracket .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('round2Winners', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Restore Round 2 Losers selections
    const round2LosersResults = matchResults.getRoundResults('round2Losers');
    for (const matchId in round2LosersResults) {
        const result = round2LosersResults[matchId];
        // Updated selector to find in column structure
        const matchCard = document.querySelector(`#round2 .losers-bracket .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('round2Losers', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Last Chance
    updateLastChance();
    
    // Restore Last Chance selections
    const lastChanceResults = matchResults.getRoundResults('lastChance');
    for (const matchId in lastChanceResults) {
        const result = lastChanceResults[matchId];
        const matchCard = document.querySelector(`#lastChance .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('lastChance', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Round of 16
    updateRound16();
    
    // Restore Round of 16 selections
    const round16Results = matchResults.getRoundResults('round16');
    for (const matchId in round16Results) {
        const result = round16Results[matchId];
        const matchCard = document.querySelector(`#round16 .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('round16', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Quarter Finals
    updateQuarterFinals();
    
    // Restore Quarter Finals selections
    const quarterFinalsResults = matchResults.getRoundResults('quarterFinals');
    for (const matchId in quarterFinalsResults) {
        const result = quarterFinalsResults[matchId];
        const matchCard = document.querySelector(`#quarterFinals .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('quarterFinals', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Semi Finals
    updateSemiFinals();
    
    // Restore Semi Finals selections
    const semiFinalsResults = matchResults.getRoundResults('semiFinals');
    for (const matchId in semiFinalsResults) {
        const result = semiFinalsResults[matchId];
        const matchCard = document.querySelector(`#semiFinals .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('semiFinals', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
    
    // Update Final
    updateFinal();
    
    // Restore Final selection
    const finalResults = matchResults.getRoundResults('final');
    for (const matchId in finalResults) {
        const result = finalResults[matchId];
        const matchCard = document.querySelector(`#final .match-card[data-match-id="${matchId}"]`);
        
        if (matchCard) {
            const winnerTeam = matchCard.querySelector(`.team[data-team-id="${result.winner}"]`);
            if (winnerTeam) {
                winnerTeam.classList.add('selected');

                // Add real-result class if this is a real result
                if (matchResults.isRealResult('final', matchId)) {
                    winnerTeam.classList.add('real-result');
                }
            }
        }
    }
}

// Randomly shuffle teams for Round of 16
function shuffleAdvancer1Teams() {
    // Get all advancer1 teams and shuffle them
    const advancer1Teams = round16Structure.map(match => match.advancer1);
    
    // Fisher-Yates shuffle
    for (let i = advancer1Teams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [advancer1Teams[i], advancer1Teams[j]] = [advancer1Teams[j], advancer1Teams[i]];
    }
    
    // Assign shuffled teams back to matches
    round16Structure.forEach((match, index) => {
        match.advancer1 = advancer1Teams[index];
    });
    
    // Update the UI
    updateRound16();
    
    // Save state
    saveState();
}

function shuffleAdvancer2Teams() {
    // Get all advancer2 teams and shuffle them
    const advancer2Teams = round16Structure.map(match => match.advancer2);
    
    // Fisher-Yates shuffle
    for (let i = advancer2Teams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [advancer2Teams[i], advancer2Teams[j]] = [advancer2Teams[j], advancer2Teams[i]];
    }
    
    // Assign shuffled teams back to matches
    round16Structure.forEach((match, index) => {
        match.advancer2 = advancer2Teams[index];
    });
    
    // Update the UI
    updateRound16();
    
    // Save state
    saveState();
}

// Clear results from Round of 16 and later rounds
function resetLaterRounds() {
    // Clear Round of 16 results
    matchResults.clearRound('round16');
    
    // Clear Quarter Finals results
    matchResults.clearRound('quarterFinals');
    
    // Clear Semi Finals results
    matchResults.clearRound('semiFinals');
    
    // Clear Final results
    matchResults.clearRound('final');
    
    // Reset teams in the structures as well
    quarterFinalsStructure.forEach(match => {
        match.team1 = 'TBD';
        match.team2 = 'TBD';
    });
    
    semiFinalsStructure.forEach(match => {
        match.team1 = 'TBD';
        match.team2 = 'TBD';
    });
    
    finalStructure.forEach(match => {
        match.team1 = 'TBD';
        match.team2 = 'TBD';
    });
    
    // Remove selected class from all teams in these rounds
    document.querySelectorAll('#round16 .team, #quarterFinals .team, #semiFinals .team, #final .team')
        .forEach(team => team.classList.remove('selected'));
    
    // Update the match cards to reflect the reset teams
    quarterFinalsStructure.forEach(match => {
        updateMatchCard(match);
    });
    
    semiFinalsStructure.forEach(match => {
        updateMatchCard(match);
    });
    
    finalStructure.forEach(match => {
        updateMatchCard(match);
    });
    
    // Reset champion display
    resetChampionDisplay();
    
    // Save the reset state
    saveState();
}

export {
    initializeMatchResults,
    selectWinner,
    updateRound2Winners,
    updateRound2Losers,
    updateLastChance,
    updateRound16,
    updateQuarterFinals,
    updateSemiFinals,
    updateFinal,
    saveState,
    loadState,
    restoreBracketState,
    shuffleAdvancer1Teams,
    shuffleAdvancer2Teams,
    resetLaterRounds
};