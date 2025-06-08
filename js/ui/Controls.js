// UI control components (buttons, inputs, etc.)

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

// Add Round 16 shuffle buttons
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
    shuffleAdvancer1Button.addEventListener('click', async function() {
        // Reset results after shuffling
        const { resetLaterRounds } = await import('../core/BracketLogic.js');
        resetLaterRounds();
        // Then shuffle
        const { shuffleAdvancer1Teams } = await import('../core/BracketLogic.js');
        shuffleAdvancer1Teams();
    });
    
    // Add advancer2 shuffle button
    const shuffleAdvancer2Button = document.createElement('button');
    shuffleAdvancer2Button.className = 'shuffle-button advancer2-shuffle';
    shuffleAdvancer2Button.innerHTML = '<i class="fas fa-random"> Last Chance</i>';
    shuffleAdvancer2Button.addEventListener('click', async function() {
        // Reset results after shuffling
        const { resetLaterRounds } = await import('../core/BracketLogic.js');
        resetLaterRounds();
        // Then shuffle
        const { shuffleAdvancer2Teams } = await import('../core/BracketLogic.js');
        shuffleAdvancer2Teams();
    });
    
    // Assemble
    // shuffleContainer.appendChild(shuffleAdvancer1Button);
    // shuffleContainer.appendChild(shuffleAdvancer2Button);
    
    // Insert before matches container
    round16Section.insertBefore(shuffleContainer, matchesContainer);
}

export {
    addResetButton,
    addRound16ShuffleButtons
};