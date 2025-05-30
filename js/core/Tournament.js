// Tournament initialization and setup

import { tournamentStructure } from '../data/TournamentData.js';
import { MatchResults } from '../data/MatchResults.js';
import { createMatchElement } from '../ui/MatchRenderer.js';
import { addResetButton, addRound16ShuffleButtons } from '../ui/Controls.js';
import { addMobileNavigation, setupHorizontalNavigation } from '../ui/Navigation.js';
import { displayChampion } from '../ui/Champion.js';
import { fixBrokenImages } from '../utils/ImageUtils.js';
import { startCountdownTimer } from '../utils/TimeUtils.js';
import { setupRound16DragDrop } from '../utils/DragDrop.js';
import { 
    initializeMatchResults, 
    loadState
} from './BracketLogic.js';

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

// Initialize the tournament bracket
function initializeBracket() {
    // Initialize match results in BracketLogic
    initializeMatchResults(matchResults);
    
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

// Initialize all tournament components
function initializeTournament() {
    initializeBracket();
    addResetButton();
    addMobileNavigation();
    fixBrokenImages();
    addRound16ShuffleButtons();
    startCountdownTimer();
    
    // Show current champion if exists
    const finalResult = matchResults.getFinalResult('F');
    if (finalResult && finalResult.winner) {
        displayChampion(finalResult.winner);
    }
    
    // Setup drag and drop after a brief delay to ensure DOM is ready
    setTimeout(() => {
        setupRound16DragDrop();
    }, 100);
}

export {
    initializeBracket,
    initializeTournament,
    matchResults
};