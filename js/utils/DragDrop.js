// Drag and drop functionality for Round of 16 team management

import { tournamentStructure } from '../data/TournamentData.js';

const { round16: round16Structure } = tournamentStructure;

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
            
            // Add event listeners
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
            
            team.addEventListener('drop', async function(e) {
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
                        const { resetLaterRounds } = await import('../core/BracketLogic.js');
                        resetLaterRounds();
                        
                        // Update Round of 16
                        const { updateRound16 } = await import('../core/BracketLogic.js');
                        updateRound16();
                        
                        // Save state
                        const { Storage } = await import('../data/Storage.js');
                        const { saveState } = await import('../core/BracketLogic.js');
                        saveState();
                    }
                } catch (error) {
                    console.error("Error processing drop:", error);
                }
            });
        });
    });
}

export {
    setupRound16DragDrop
};