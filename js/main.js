// Main entry point for the Kings League KWCC Tournament Bracket Simulator

import { initializeTournament } from './core/Tournament.js';
import { setupHorizontalNavigation } from './ui/Navigation.js';

// Function to scroll to a specific round in the tournament
function scrollToRound(roundId) {
    const tournamentContainer = document.getElementById('tournamentContainer');
    const targetRound = document.getElementById(roundId);
    
    if (tournamentContainer && targetRound) {
        const containerRect = tournamentContainer.getBoundingClientRect();
        const targetRect = targetRound.getBoundingClientRect();
        const scrollLeft = targetRect.left - containerRect.left + tournamentContainer.scrollLeft;
        
        tournamentContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Add horizontal navigation setup for desktop
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('tournamentContainer');
    const leftBtn = document.getElementById('scrollLeft');
    const rightBtn = document.getElementById('scrollRight');
    
    if (container && leftBtn && rightBtn) {
        setupHorizontalNavigation();
    }
    setTimeout(() => {
        scrollToRound('lastChance'); // or 'round2', 'lastChance', 'round16', etc.
    }, 100);
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTournament();
});
