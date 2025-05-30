// Main entry point for the Kings League KWCC Tournament Bracket Simulator

import { initializeTournament } from './core/Tournament.js';
import { setupHorizontalNavigation } from './ui/Navigation.js';

// Add horizontal navigation setup for desktop
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('tournamentContainer');
    const leftBtn = document.getElementById('scrollLeft');
    const rightBtn = document.getElementById('scrollRight');
    
    if (container && leftBtn && rightBtn) {
        setupHorizontalNavigation();
    }
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTournament();
});
