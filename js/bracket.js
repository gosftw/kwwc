// This file manages the tournament bracket logic, including team selection and progression

// Store results of matches
let matchResults = {
    round1: {},
    round2Winners: {},
    round2Losers: {},
    lastChance: {},
    round16: {},
    quarterFinals: {},
    semiFinals: {},
    final: {}
};

// Helper function to create a team element
function createTeamElement(teamId, isSelectable = true) {
    const team = teams[teamId] || teams.TBD;
    
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.dataset.teamId = teamId;
    
    if (isSelectable) {
        teamElement.addEventListener('click', function() {
            selectWinner(this);
        });
    }
    
    const logoElement = document.createElement('img');
    logoElement.src = team.logo;
    logoElement.alt = team.name;
    logoElement.className = 'team-logo';
    logoElement.onerror = function() {
        // If logo fails to load, use the alternate logo or a fallback
        if (team.altLogo) {
            this.src = team.altLogo;
        } else {
            this.src = "https://placehold.co/30x30/black/gold?text=" + team.name;
        }
    };
    
    const nameElement = document.createElement('span');
    nameElement.className = 'team-name';
    nameElement.textContent = team.name;
    
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
    matchIdElement.textContent = match.id;
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
        matchResults.round1[matchId] = {
            winner: teamId,
            loser: loserId
        };
        
        // Update Round 2 winners bracket
        updateRound2Winners();
        
        // Update Round 2 losers bracket
        updateRound2Losers();
    } else if (matchId.match(/^[1-8]$/)) { // Round 2 Winners
        const loserId = Array.from(teams)
            .find(team => team.dataset.teamId !== teamId)
            .dataset.teamId;
        
        // Store results
        matchResults.round2Winners[matchId] = {
            winner: teamId,
            loser: loserId
        };
        
        // Update Last Chance matches
        updateLastChance();
        
        // Update Round of 16
        updateRound16();
    } else if (matchId.match(/^(9|10|11|12|13|14|15|16)$/)) { // Round 2 Losers
        // Store results
        matchResults.round2Losers[matchId] = {
            winner: teamId
        };
        
        // Update Last Chance matches
        updateLastChance();
    } else if (matchId.match(/^LC[1-8]$/)) { // Last Chance
        // Store results
        matchResults.lastChance[matchId] = {
            winner: teamId
        };
        
        // Update Round of 16
        updateRound16();
    } else if (matchId.match(/^R16-[1-8]$/)) { // Round of 16
        // Store results
        matchResults.round16[matchId] = {
            winner: teamId
        };
        
        // Update Quarter Finals
        updateQuarterFinals();
    } else if (matchId.match(/^QF[1-4]$/)) { // Quarter Finals
        // Store results
        matchResults.quarterFinals[matchId] = {
            winner: teamId
        };
        
        // Update Semi Finals
        updateSemiFinals();
    } else if (matchId.match(/^SF[1-2]$/)) { // Semi Finals
        // Store results
        matchResults.semiFinals[matchId] = {
            winner: teamId
        };
        
        // Update Final
        updateFinal();
    } else if (matchId === 'F') { // Final
        // Store results
        matchResults.final[matchId] = {
            winner: teamId
        };
        
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
        championNameElement.textContent = `${teams[teamId].name} - CHAMPION!`;
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
        const winner1Result = matchResults.round1[match.winner1];
        const winner2Result = matchResults.round1[match.winner2];
        
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
        const loser1Result = matchResults.round1[match.loser1];
        const loser2Result = matchResults.round1[match.loser2];
        
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
        const loserResult = matchResults.round2Winners[match.loser];
        const winnerResult = matchResults.round2Losers[match.winner];
        
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
        const advancer1Result = matchResults.round2Winners[match.advancer1];
        const advancer2Result = matchResults.lastChance[`LC${match.advancer2}`];
        
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
        const winner1Result = matchResults.round16[match.winner1];
        const winner2Result = matchResults.round16[match.winner2];
        
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
        const winner1Result = matchResults.quarterFinals[match.winner1];
        const winner2Result = matchResults.quarterFinals[match.winner2];
        
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
        const winner1Result = matchResults.semiFinals[match.winner1];
        const winner2Result = matchResults.semiFinals[match.winner2];
        
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
    
    const team = teams[teamId] || teams.TBD;
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
    localStorage.setItem('kwccTournamentState', JSON.stringify(matchResults));
}

// Load tournament state from local storage
function loadState() {
    const savedState = localStorage.getItem('kwccTournamentState');
    
    if (savedState) {
        matchResults = JSON.parse(savedState);
        
        // Restore bracket state based on saved results
        restoreBracketState();
    }
}

// Restore the bracket state from saved results
function restoreBracketState() {
    // Restore Round 1 selections
    for (const matchId in matchResults.round1) {
        const result = matchResults.round1[matchId];
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
    for (const matchId in matchResults.round2Winners) {
        const result = matchResults.round2Winners[matchId];
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
    for (const matchId in matchResults.round2Losers) {
        const result = matchResults.round2Losers[matchId];
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
    for (const matchId in matchResults.lastChance) {
        const result = matchResults.lastChance[matchId];
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
    for (const matchId in matchResults.round16) {
        const result = matchResults.round16[matchId];
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
    for (const matchId in matchResults.quarterFinals) {
        const result = matchResults.quarterFinals[matchId];
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
    for (const matchId in matchResults.semiFinals) {
        const result = matchResults.semiFinals[matchId];
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
    for (const matchId in matchResults.final) {
        const result = matchResults.final[matchId];
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
        const team = teams[teamId] || teams.TBD;
        
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

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBracket();
    addResetButton();
    addMobileNavigation();
    fixBrokenImages();
    
    // Show current champion if exists
    const finalResult = matchResults.final.F;
    if (finalResult && finalResult.winner) {
        displayChampion(finalResult.winner);
    }
});
