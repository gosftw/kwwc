// Image-related utility functions for the tournament bracket

import { getTeam } from '../data/TeamsData.js';

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

export {
    fixBrokenImages
};