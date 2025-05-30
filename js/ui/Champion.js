// Champion display functionality

import { getTeam } from '../data/TeamsData.js';

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

// Reset champion display
function resetChampionDisplay() {
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
}

export {
    displayChampion,
    resetChampionDisplay
};