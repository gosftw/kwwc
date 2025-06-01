// Time-related utility functions for the tournament bracket

// Helper function to calculate countdown
function getCountdown(matchTimeString) {
    if (!matchTimeString) return "";
    
    const now = new Date();
    const matchTime = new Date(matchTimeString);
    const diff = matchTime - now;
    
    // If the match is in the past or happening now
    if (diff <= 0) {
        const minutesPast = diff / 1000 / 60;
        if (minutesPast < -75) { return "OVER"; }
        return "LIVE";
    }
    
    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Format the countdown string
    let countdownStr = "";
    if (days > 0) countdownStr += `${days}d `;
    if (hours > 0 || days > 0) countdownStr += `${hours}h `;
    countdownStr += `${minutes}m`;
    
    return countdownStr;
}

// Helper function to format match time to local time
function formatLocalMatchTime(matchTimeString) {
    if (!matchTimeString) return "";
    
    const matchTime = new Date(matchTimeString);
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
    };
    
    return matchTime.toLocaleString(undefined, options);
}

// Helper function to get match ID with countdown
function getMatchIdWithCountdown(match) {
    const countdown = getCountdown(match.matchTime);
    return countdown ? `${match.id} - ${countdown}` : match.id;
}

// Function to update countdown timers (call this every minute)
function updateCountdowns() {
    const matchElements = document.querySelectorAll("[data-match-time]");
    
    matchElements.forEach(element => {
        const matchTime = element.getAttribute("data-match-time");
        const matchId = element.textContent.split(" - ")[0]; // Extract match ID
        element.textContent = `${matchId} - ${getCountdown(matchTime)}`;
    });
}

// Set up interval to update countdowns every minute
function startCountdownTimer() {
    setInterval(updateCountdowns, 60000);
}

export {
    getCountdown,
    formatLocalMatchTime,
    getMatchIdWithCountdown,
    updateCountdowns,
    startCountdownTimer
};