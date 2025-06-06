// This file manages the tournament bracket logic, including team selection and progression

// Import modular data
import { teams, getTeam, getAllTeams } from './data/TeamsData.js';
import { tournamentStructure } from './data/TournamentData.js';
import { MatchResults } from './data/MatchResults.js';
import { Storage } from './data/Storage.js';

// Extract tournament structures for easy access
const {
    initialMatches,
    round2Winners: round2WinnersStructure,
    round2Losers: round2LosersStructure,
    lastChance: lastChanceStructure,
    round16: round16Structure,
    quarterFinals: quarterFinalsStructure,
    semiFinals: semiFinalsStructure,
    final: finalStructure
} = tournamentStructure;

// Initialize match results
const matchResults = new MatchResults();

// Helper function to create a team element
function createTeamElement(teamId, isSelectable = true) {
    const teamData = getTeam(teamId);
    
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.dataset.teamId = teamId;
    
    if (isSelectable) {
        teamElement.addEventListener('click', function() {
            selectWinner(this);
        });
    }
    
    const logoElement = document.createElement('img');
    logoElement.src = teamData.logo;
    logoElement.alt = teamData.name;
    logoElement.className = 'team-logo';
    logoElement.onerror = function() {
        // If logo fails to load, use the alternate logo or a fallback
        if (teamData.altLogo) {
            this.src = teamData.altLogo;
        } else {
            this.src = "https://placehold.co/30x30/black/gold?text=" + teamData.name;
        }
    };
    
    const nameElement = document.createElement('span');
    nameElement.className = 'team-name';
    nameElement.textContent = teamData.name;
    
    teamElement.appendChild(logoElement);
    teamElement.appendChild(nameElement);
    
    return teamElement;
}

// Generate a match card element
function createMatchElement(match) {
    const matchElement = document.createElement('div');
    matchElement.className = 'match-card';
    matchElement.dataset.matchId = match.id;

    // Match ID indicator
    const matchIdElement = document.createElement('div');
    matchIdElement.className = 'match-id';
    
    matchIdElement.textContent = getMatchIdWithCountdown(match);

    // Add tooltip with local time
    if (match.matchTime) {
        matchIdElement.title = formatLocalMatchTime(match.matchTime);
        matchIdElement.setAttribute("data-match-time", match.matchTime);
        matchIdElement.classList.add("has-tooltip");
    }

    matchElement.appendChild(matchIdElement);
    
    const matchInfo = document.createElement('div');
    matchInfo.className = 'match-info';
    
    // First team
    const team1Element = createTeamElement(match.team1, match.team1 !== 'TBD' && match.team2 !== 'TBD');
    
    // VS text
    const vsElement = document.createElement('span');
    vsElement.className = 'vs';
    vsElement.textContent = 'VS';
    
    // Second team
    const team2Element = createTeamElement(match.team2, match.team1 !== 'TBD' && match.team2 !== 'TBD');
    
    // Assemble match info
    matchInfo.appendChild(team1Element);
    matchInfo.appendChild(vsElement);
    matchInfo.appendChild(team2Element);
    
    matchElement.appendChild(matchInfo);
    
    return matchElement;
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

// Display the champion
function displayChampion(teamId) {
    const championNameElement = document.getElementById('championName');
    if (championNameElement) {
        const teamData = getTeam(teamId);
        championNameElement.textContent = `${teamData.name} - CHAMPION!`;
        championNameElement.classList.add('visible');
        
        // Animate trophy
        const trophyImage = document.querySelector('.trophy img');
        if (trophyImage) {
            trophyImage.style.animation = 'pulse 2s infinite';
        }
    }
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

// Update a match card with new team information
function updateMatchCard(match, bracketType = null) {
    let selector = `.match-card[data-match-id="${match.id}"]`;
    
    if (bracketType === 'winners') {
        selector = `#round2 .winners-bracket ${selector}`;
    } else if (bracketType === 'losers') {
        selector = `#round2 .losers-bracket ${selector}`;
    } else if (match.id.startsWith('LC')) {
        selector = `#lastChance ${selector}`;
    } else if (match.id.startsWith('R16')) {
        selector = `#round16 ${selector}`;
    } else if (match.id.startsWith('QF')) {
        selector = `#quarterFinals ${selector}`;
    } else if (match.id.startsWith('SF')) {
        selector = `#semiFinals ${selector}`;
    } else if (match.id === 'F') {
        selector = `#final ${selector}`;
    } else if (bracketType) {
        selector = `.${bracketType} ${selector}`;
    }
    
    const matchCard = document.querySelector(selector);
    
    if (matchCard) {
        // Get the team elements
        const teamElements = matchCard.querySelectorAll('.team');
        
        if (teamElements.length === 2) {
            // Update first team if it exists
            if (match.team1) {
                updateTeamElement(teamElements[0], match.team1);
            }
            
            // Update second team if it exists
            if (match.team2) {
                updateTeamElement(teamElements[1], match.team2);
            }
            
            // Enable team selection if both teams are known and not TBD
            const isSelectable = match.team1 && match.team2 && 
                                match.team1 !== 'TBD' && match.team2 !== 'TBD';
            
            if (isSelectable) {
                teamElements.forEach(team => {
                    // Remove previous event listeners by cloning and replacing
                    const newTeam = team.cloneNode(true);
                    newTeam.addEventListener('click', function() {
                        selectWinner(this);
                    });
                    team.parentNode.replaceChild(newTeam, team);
                });
            }
        }
    }
}

// Helper function to update team element
function updateTeamElement(element, teamId) {
    element.dataset.teamId = teamId;
    
    const team = getTeam(teamId);
    const logoElement = element.querySelector('img');
    logoElement.src = team.logo;
    logoElement.alt = team.name || 'TBD';
    logoElement.onerror = function() {
        // If logo fails to load, use the alternate logo or a fallback
        if (team.altLogo) {
            this.src = team.altLogo;
        } else {
            this.src = "https://placehold.co/30x30/black/gold?text=" + team.name;
        }
    };
    
    const nameElement = element.querySelector('.team-name');
    nameElement.textContent = team.name || 'TBD';
}

// Initialize the tournament bracket
function initializeBracket() {
    // // Generate Round 1 matches
    // const round1Container = document.querySelector('#round1 .matches-container');
    // initialMatches.forEach(match => {
    //     const matchElement = createMatchElement(match);
    //     round1Container.appendChild(matchElement);
    // });
    // Generate Round 1 matches with columns
    const round1Container = document.querySelector('#round1 .matches-container');
    // Create two column divs
    const leftColumn = document.createElement('div');
    leftColumn.className = 'column left-column';
    
    const rightColumn = document.createElement('div');
    rightColumn.className = 'column right-column';
    
    // Add columns to container
    round1Container.appendChild(leftColumn);
    round1Container.appendChild(rightColumn);
    
    // Distribute matches between columns
    initialMatches.forEach((match, index) => {
        const matchElement = createMatchElement(match);
        // Add matches alternately to left and right columns
        if (index % 2 === 0) {
            leftColumn.appendChild(matchElement);
        } else {
            rightColumn.appendChild(matchElement);
        }
    });
    
    // Generate Round 2 Winners matches
    // const round2WinnersContainer = document.querySelector('#round2 .winners');
    // round2WinnersStructure.forEach(match => {
    //     const matchElement = createMatchElement(match);
    //     round2WinnersContainer.appendChild(matchElement);
    // });

    // Similar approach for Round 2 Winners
    const round2WinnersContainer = document.querySelector('#round2 .winners-bracket .matches-container');
    
    const winnersLeftColumn = document.createElement('div');
    winnersLeftColumn.className = 'column winners-left-column';
    
    const winnersRightColumn = document.createElement('div');
    winnersRightColumn.className = 'column winners-right-column';
    
    round2WinnersContainer.appendChild(winnersLeftColumn);
    round2WinnersContainer.appendChild(winnersRightColumn);
    
    round2WinnersStructure.forEach((match, index) => {
        const matchElement = createMatchElement(match);
        if (index % 2 === 0) {
            winnersLeftColumn.appendChild(matchElement);
        } else {
            winnersRightColumn.appendChild(matchElement);
        }
    });
    
    // // Generate Round 2 Losers matches
    // const round2LosersContainer = document.querySelector('#round2 .losers.matches-container');
    // round2LosersStructure.forEach(match => {
    //     const matchElement = createMatchElement(match);
    //     round2LosersContainer.appendChild(matchElement);
    // });

    // Similar approach for Round 2 Losers
    const round2LosersContainer = document.querySelector('#round2 .losers-bracket .matches-container');
    
    const losersLeftColumn = document.createElement('div');
    losersLeftColumn.className = 'column losers-left-column';
    
    const losersRightColumn = document.createElement('div');
    losersRightColumn.className = 'column losers-right-column';
    
    round2LosersContainer.appendChild(losersLeftColumn);
    round2LosersContainer.appendChild(losersRightColumn);
    
    round2LosersStructure.forEach((match, index) => {
        const matchElement = createMatchElement(match);
        if (index % 2 === 0) {
            losersLeftColumn.appendChild(matchElement);
        } else {
            losersRightColumn.appendChild(matchElement);
        }
    });
    
    // Generate Last Chance matches
    const lastChanceContainer = document.querySelector('#lastChance .matches-container');
    lastChanceStructure.forEach(match => {
        const matchElement = createMatchElement(match);
        lastChanceContainer.appendChild(matchElement);
    });
    
    // Generate Round of 16 matches
    const round16Container = document.querySelector('#round16 .matches-container');
    round16Structure.forEach(match => {
        const matchElement = createMatchElement(match);
        round16Container.appendChild(matchElement);
    });
    
    // Generate Quarter Finals matches
    const quarterFinalsContainer = document.querySelector('#quarterFinals .matches-container');
    quarterFinalsStructure.forEach(match => {
        const matchElement = createMatchElement(match);
        quarterFinalsContainer.appendChild(matchElement);
    });
    
    // Generate Semi Finals matches
    const semiFinalsContainer = document.querySelector('#semiFinals .matches-container');
    semiFinalsStructure.forEach(match => {
        const matchElement = createMatchElement(match);
        semiFinalsContainer.appendChild(matchElement);
    });
    
    // Generate Final match
    const finalContainer = document.querySelector('#final .matches-container');
    finalStructure.forEach(match => {
        const matchElement = createMatchElement(match);
        finalContainer.appendChild(matchElement);
    });
    
    // Load saved state if available
    loadState();
}

// Save tournament state to local storage
function saveState() {
    Storage.save(matchResults.getState());
}

// Load tournament state from local storage
function loadState() {
    const savedState = Storage.load();
    
    if (savedState) {
        matchResults.setState(savedState);
        
        // Restore bracket state based on saved results
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
            }
        }
    }
}

// Add reset button
function addResetButton() {
    const container = document.querySelector('.container');
    const h1Element = document.querySelector('h1');
    
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Tournament';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the tournament? All progress will be lost.')) {
            localStorage.removeItem('kwccTournamentState');
            location.reload();
        }
    });
    
    container.insertBefore(resetButton, h1Element.nextSibling);
}

// Add navigation buttons for mobile
function addMobileNavigation() {
    const container = document.querySelector('.container');
    const resetButton = document.querySelector('.reset-button');
    
    const navContainer = document.createElement('div');
    navContainer.className = 'mobile-navigation';
    
    const rounds = [
        { id: 'round1', label: 'ROUND 1' },
        { id: 'round2', label: 'ROUND 2' },
        { id: 'lastChance', label: 'LAST CHANCE' },
        { id: 'round16', label: 'ROUND OF 16' },
        { id: 'quarterFinals', label: 'QUARTER FINALS' },
        { id: 'semiFinals', label: 'SEMI FINALS' },
        { id: 'final', label: 'FINAL' }
    ];
    
    rounds.forEach(round => {
        const button = document.createElement('button');
        button.textContent = round.label;
        button.dataset.roundId = round.id;
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Scroll to the round
            document.getElementById(round.id).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        navContainer.appendChild(button);
    });
    
    container.insertBefore(navContainer, resetButton.nextSibling);
}

// Check for image errors and replace with placeholder
function fixBrokenImages() {
    document.querySelectorAll('.team-logo').forEach(img => {
        const teamId = img.closest('.team')?.dataset.teamId;
        const team = getTeam(teamId);
        
        img.onerror = function() {
            if (team.altLogo) {
                this.src = team.altLogo;
            } else {
                this.src = "https://placehold.co/30x30/black/gold?text=" + team.name;
            }
        };
        
        // Force reload to trigger onerror for already loaded broken images
        const currentSrc = img.src;
        img.src = "";
        setTimeout(() => {
            img.src = currentSrc;
        }, 10);
    });
}

// Randomly shuffle teams for Round of 16
function shuffleAdvancer1Teams() {
    // Get all unique advancer1 teams from round16Structure
    const advancer1Teams = round16Structure.map(match => match.advancer1);
    const shuffledTeams = [...advancer1Teams];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }
    
    // Assign shuffled teams back to structure
    round16Structure.forEach((match, index) => {
        match.advancer1 = shuffledTeams[index];
    });
    
    // Update the UI
    updateRound16();
}

function shuffleAdvancer2Teams() {
    // Get all unique advancer2 teams from round16Structure
    const advancer2Teams = round16Structure.map(match => match.advancer2);
    const shuffledTeams = [...advancer2Teams];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }
    
    // Assign shuffled teams back to structure
    round16Structure.forEach((match, index) => {
        match.advancer2 = shuffledTeams[index];
    });
    
    // Update the UI
    updateRound16();
}

// Setup drag and drop functionality for Round of 16
// Setup drag and drop functionality for Round of 16
// Setup drag and drop functionality for Round of 16
function setupRound16DragDrop() {
    const round16Matches = document.querySelectorAll('#round16 .match-card');
    
    if (round16Matches.length === 0) {
        return;
    }
    
    // Add CSS for drag and drop visuals
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .team[draggable="true"] { cursor: grab; }
        .team.dragging { opacity: 0.5; background-color: #f0f0f0; }
        .team.drag-over { border: 2px dashed #3498db; }
    `;
    document.head.appendChild(styleElement);
    
    round16Matches.forEach(matchCard => {
        const teams = matchCard.querySelectorAll('.team');
        
        teams.forEach(team => {
            // Set draggable attribute
            team.setAttribute('draggable', true);
            
            // Add event listeners directly (don't clone)
            team.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    matchId: matchCard.dataset.matchId,
                    teamId: this.dataset.teamId,
                    isTeam1: Array.from(teams).indexOf(this) === 0
                }));
                this.classList.add('dragging');
            });
            
            team.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            team.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });
            
            team.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });
            
            team.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                
                try {
                    const sourceData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    
                    const targetMatchId = matchCard.dataset.matchId;
                    const isTargetTeam1 = Array.from(teams).indexOf(this) === 0;
                    
                    // Find source and target matches
                    const sourceMatch = round16Structure.find(m => m.id === sourceData.matchId);
                    const targetMatch = round16Structure.find(m => m.id === targetMatchId);
                    
                    
                    if (sourceMatch && targetMatch) {
                        // Perform swap based on positions
                        let sourceField, targetField;
                        
                        if (sourceData.isTeam1) {
                            sourceField = 'advancer1';
                        } else {
                            sourceField = 'advancer2';
                        }
                        
                        if (isTargetTeam1) {
                            targetField = 'advancer1';
                        } else {
                            targetField = 'advancer2';
                        }
                        
                        // Perform the swap
                        const temp = sourceMatch[sourceField];
                        sourceMatch[sourceField] = targetMatch[targetField];
                        targetMatch[targetField] = temp;
                        
                        // Reset later rounds
                        resetLaterRounds();
                        
                        // Update the UI
                        updateRound16();
                        
                        // Save state
                        saveState()
                    }
                } catch (error) {
                    console.error("Error processing drop:", error);
                }
            });
        });
    });
}

// Add to initializeBracket function right after generating Round of 16 matches
function addRound16ShuffleButtons() {
    const round16Section = document.querySelector('#round16');
    const matchesContainer = round16Section.querySelector('.matches-container');
    
    // Create shuffle buttons container
    const shuffleContainer = document.createElement('div');
    shuffleContainer.className = 'shuffle-buttons';
    
    // Add advancer1 shuffle button
    const shuffleAdvancer1Button = document.createElement('button');
    shuffleAdvancer1Button.className = 'shuffle-button advancer1-shuffle';
    shuffleAdvancer1Button.innerHTML = '<i class="fas fa-random"> Winners</i>';
    shuffleAdvancer1Button.addEventListener('click', function() {
        // Reset results after shuffling
        resetLaterRounds();
        // Then shuffle
        shuffleAdvancer1Teams();
    });
    
    // Add advancer2 shuffle button
    const shuffleAdvancer2Button = document.createElement('button');
    shuffleAdvancer2Button.className = 'shuffle-button advancer2-shuffle';
    shuffleAdvancer2Button.innerHTML = '<i class="fas fa-random"> Last Chance</i>';
    shuffleAdvancer2Button.addEventListener('click', function() {
        // Reset results after shuffling
        resetLaterRounds();
        // Then shuffle
        shuffleAdvancer2Teams();
    });
    
    // Assemble
    shuffleContainer.appendChild(shuffleAdvancer1Button);
    shuffleContainer.appendChild(shuffleAdvancer2Button);
    
    // Insert before matches container
    round16Section.insertBefore(shuffleContainer, matchesContainer);
    
    // Set up drag and drop
    // setTimeout(() => {
    //     setupRound16DragDrop();
    // }, 100);
}

// Add this function to clear results from Round of 16 and later rounds
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
    const championNameElement = document.getElementById('championName');
    if (championNameElement) {
        championNameElement.textContent = '';
        championNameElement.classList.remove('visible');
    }
    
    // Reset trophy animation
    const trophyImage = document.querySelector('.trophy img');
    if (trophyImage) {
        trophyImage.style.animation = 'none';
    }
    
    // Save the reset state
    saveState();
}

// Helper function to calculate countdown
function getCountdown(matchTimeString) {
    if (!matchTimeString) return "";
    
    const now = new Date();
    const matchTime = new Date(matchTimeString);
    const diff = matchTime - now;
    
    // If the match is in the past or happening now
    if (diff <= 0) {
        return "LIVE";
    }
    
    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Format the countdown string
    let countdownStr = "";
    if (days > 0) countdownStr += `${days}d `;
    if (hours > 0 || days > 0) countdownStr += `${hours}h `;
    countdownStr += `${minutes}m`;
    
    return countdownStr;
}

// Helper function to format match time to local time
function formatLocalMatchTime(matchTimeString) {
    if (!matchTimeString) return "";
    
    const matchTime = new Date(matchTimeString);
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
    };
    
    return matchTime.toLocaleString(undefined, options);
}

// Helper function to get match ID with countdown
function getMatchIdWithCountdown(match) {
    const countdown = getCountdown(match.matchTime);
    return countdown ? `${match.id} - ${countdown}` : match.id;
}

// Function to update countdown timers (call this every minute)
function updateCountdowns() {
    const matchElements = document.querySelectorAll("[data-match-time]");
    
    matchElements.forEach(element => {
        const matchTime = element.getAttribute("data-match-time");
        const matchId = element.textContent.split(" - ")[0]; // Extract match ID
        element.textContent = `${matchId} - ${getCountdown(matchTime)}`;
    });
}

// Set up interval to update countdowns every minute
setInterval(updateCountdowns, 60000);



// Add after your existing tournament code
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('tournamentContainer');
    const leftBtn = document.getElementById('scrollLeft');
    const rightBtn = document.getElementById('scrollRight');
    
    // The width to scroll by (typically the width of one round)
    const scrollAmount = 325;
    
    // Update button states initially and when scrolling
    function updateButtonStates() {
      leftBtn.classList.toggle('disabled', container.scrollLeft <= 0);
      rightBtn.classList.toggle('disabled', 
        container.scrollLeft + container.clientWidth >= container.scrollWidth);
    }
    
    // Add click handlers for the buttons
    leftBtn.addEventListener('click', function() {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(updateButtonStates, 500); // After scroll animation
    });
    
    rightBtn.addEventListener('click', function() {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateButtonStates, 500); // After scroll animation
    });
    
    // Update on scroll
    container.addEventListener('scroll', updateButtonStates);
    
    // Initial button state update
    updateButtonStates();
    
    // Handle window resize
    window.addEventListener('resize', updateButtonStates);
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBracket();
    addResetButton();
    addMobileNavigation();
    fixBrokenImages();
    addRound16ShuffleButtons();
    
    // Show current champion if exists
    const finalResult = matchResults.getFinalResult('F');
    if (finalResult && finalResult.winner) {
        displayChampion(finalResult.winner);
    }
});

