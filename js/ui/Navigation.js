// Navigation components for mobile and desktop

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

// Setup horizontal scrolling navigation for desktop
function setupHorizontalNavigation() {
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
}

export {
    addMobileNavigation,
    setupHorizontalNavigation
};