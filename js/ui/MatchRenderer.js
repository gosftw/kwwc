// Match and team rendering components

import { getTeam } from '../data/TeamsData.js';
import { getMatchIdWithCountdown, formatLocalMatchTime } from '../utils/TimeUtils.js';
import { getMediaPredictions, mediaConfig } from '../data/MediaData.js';
import { showMatchModal } from './MatchModal.js';

// Helper function to create a team element
function createTeamElement(teamId, isSelectable = true) {
    const teamData = getTeam(teamId);
    
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.dataset.teamId = teamId;
    
    if (isSelectable) {
        teamElement.addEventListener('click', async function() {
            const { selectWinner } = await import('../core/BracketLogic.js');
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

// Helper function to create media prediction icons
function createMediaPredictions(mediaPredictions) {
    const predictionsContainer = document.createElement('div');
    predictionsContainer.className = 'media-predictions';
    
    mediaPredictions.forEach(media => {
        const mediaIcon = document.createElement('div');
        mediaIcon.className = 'media-icon';
        mediaIcon.setAttribute('data-media-name', media.name);
        
        const mediaImg = document.createElement('img');
        mediaImg.src = media.image;
        mediaImg.alt = media.alt;
        mediaImg.onerror = function() {
            // Fallback for missing media images
            this.src = "https://placehold.co/20x20/333/fff?text=" + media.mediaId.charAt(0);
        };
        
        // const tooltip = document.createElement('div');
        // tooltip.className = 'media-tooltip';
        // tooltip.textContent = media.name;
        
        mediaIcon.appendChild(mediaImg);
        // mediaIcon.appendChild(tooltip);
        predictionsContainer.appendChild(mediaIcon);
    });
    
    return predictionsContainer;
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
    // Score display
    let scoreElement = null;
    if (match.score) {
        scoreElement = document.createElement('div');
        scoreElement.className = 'match-score';
        
        const score1 = document.createElement('span');
        score1.className = 'score-team1';
        score1.textContent = match.score.team1 || 0;
        
        const scoreSeparator = document.createElement('span');
        scoreSeparator.className = 'score-separator';
        scoreSeparator.textContent = ':';
        
        const score2 = document.createElement('span');
        score2.className = 'score-team2';
        score2.textContent = match.score.team2 || 0;
        
        scoreElement.appendChild(score1);
        scoreElement.appendChild(scoreSeparator);
        scoreElement.appendChild(score2);
    }
    
    // VS text
    const vsElement = document.createElement('span');
    vsElement.className = 'vs';
    vsElement.textContent = scoreElement ? '' : 'VS';

    // Add click event to show modal
    // if (!scoreElement) { // Only add click if it's showing "VS" text
    //     vsElement.style.cursor = 'pointer';
    //     vsElement.addEventListener('click', function(event) {
    //         event.stopPropagation(); // Prevent event bubbling
    //         showMatchModal(match);
    //     });
    // }
    
    // Second team
    const team2Element = createTeamElement(match.team2, match.team1 !== 'TBD' && match.team2 !== 'TBD');
    
    // Assemble match info
    matchInfo.appendChild(team1Element);
    if (scoreElement) {
        matchInfo.appendChild(scoreElement);
    } else {
        matchInfo.appendChild(vsElement);
    }
    matchInfo.appendChild(team2Element);
    
    matchElement.appendChild(matchInfo);

    // Add predictions section if predictions exist
    if (match.predictions && match.predictions.length > 0) {
        const predictions = getMediaPredictions(match.predictions);
        
        const predictionsSection = document.createElement('div');
        predictionsSection.className = 'predictions-section';
        
        // Team 1 predictions
        const team1Predictions = document.createElement('div');
        team1Predictions.className = 'team1-predictions';
        team1Predictions.appendChild(createMediaPredictions(predictions.team1));
        
        // Spacer to maintain alignment with VS section
        const predictionsSpacer = document.createElement('div');
        predictionsSpacer.className = 'predictions-spacer';
        
        // Team 2 predictions
        const team2Predictions = document.createElement('div');
        team2Predictions.className = 'team2-predictions';
        team2Predictions.appendChild(createMediaPredictions(predictions.team2));
        
        predictionsSection.appendChild(team1Predictions);
        predictionsSection.appendChild(predictionsSpacer);
        predictionsSection.appendChild(team2Predictions);
        
        matchElement.appendChild(predictionsSection);
    }
    
    return matchElement;
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
                    newTeam.addEventListener('click', async function() {
                        const { selectWinner } = await import('../core/BracketLogic.js');
                        selectWinner(this);
                    });
                    team.parentNode.replaceChild(newTeam, team);
                });
            }
        }
    }
}

export {
    createTeamElement,
    createMatchElement,
    updateTeamElement,
    updateMatchCard
};