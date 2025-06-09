import { getTeam } from '../data/TeamsData.js';
import { getMatchIdWithCountdown, formatLocalMatchTime } from '../utils/TimeUtils.js';

// Function to get mock player data based on team codes
function getMockPlayerData(matchLink) {
    // Extract team codes from the URL
    const urlParts = matchLink.split('-');
    const team1Code = urlParts[urlParts.length - 3]?.toUpperCase() || 'TEAM1';
    const team2Code = urlParts[urlParts.length - 1]?.toUpperCase() || 'TEAM2';
    
    // Mock player data for different teams
    const mockTeams = {
        'ULT': ['ElRubius', 'TheGrefg', 'ElMariana', 'Spreen', 'Carrera', 'Ampeter', 'Outconsumer', 'Rivers', 'Zorman', 'Papi Gavi', 'Nissaxter'],
        'FLC': ['Zorman', 'Outconsumer', 'Papi Gavi', 'Ampeter', 'Rivers', 'ElRubius', 'TheGrefg', 'ElMariana', 'Spreen', 'Carrera', 'Nissaxter'],
        'PRC': ['Ibai', 'Reven', 'Carre', 'Fokura', 'Nadeshot', 'Mixwell', 'Beniju', 'Cristinini', 'Perxitaa', 'Gerardromero', 'Djmariio'],
        'KOI': ['TheGrefg', 'Gerardromero', 'Djmariio', 'Perxitaa', 'Cristinini', 'Ibai', 'Reven', 'Carre', 'Fokura', 'Nadeshot', 'Mixwell'],
        'XBU': ['xBuyer', 'Konvy', 'Alkapone', 'Akawi', 'Outconsumer', 'Rivers', 'Zorman', 'Papi Gavi', 'Ampeter', 'ElRubius', 'TheGrefg'],
        '1K': ['ElCracks', 'Gonza', 'Coscu', 'Frankkaster', 'Fargan', 'ElMariana', 'Spreen', 'Carrera', 'Ampeter', 'Outconsumer', 'Rivers'],
        'SAI': ['Saiyans', 'Vegetta', 'Rubius', 'Mangel', 'Auron', 'Zorman', 'Papi Gavi', 'Ampeter', 'ElRubius', 'TheGrefg', 'ElMariana'],
        'KUN': ['Kun Aguero', 'Coscu', 'ElSpreen', 'Rivers', 'Slakun10', 'Spreen', 'Carrera', 'Ampeter', 'Outconsumer', 'Rivers', 'Zorman']
    };
    
    return {
        team1: {
            name: team1Code,
            players: mockTeams[team1Code] || ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11']
        },
        team2: {
            name: team2Code,
            players: mockTeams[team2Code] || ['Player 12', 'Player 13', 'Player 14', 'Player 15', 'Player 16', 'Player 17', 'Player 18', 'Player 19', 'Player 20', 'Player 21', 'Player 22']
        }
    };
}

// Function to scrape player data from Kings League API
async function scrapeKingsLeagueAPI(matchLink) {
    try {
        let matchId;
        
        // Check if matchLink is already an API URL or a regular match URL
        if (matchLink.includes('/api/v1/competition/matches/')) {
            // Extract from API URL: https://kingsleague.pro/api/v1/competition/matches/1881?...
            const apiMatch = matchLink.match(/\/matches\/(\d+)/);
            matchId = apiMatch ? apiMatch[1] : null;
        } else {
            // Extract from regular URL: https://kingsleague.pro/es/world-cup/partidos/1881-jfc-vs-gr7
            const urlParts = matchLink.split('/');
            const lastPart = urlParts[urlParts.length - 1]; // Get "1881-jfc-vs-gr7" 
            matchId = lastPart.split('-')[0]; // Extract just "1881"
        }
        
        if (!matchId || isNaN(matchId)) {
            console.error('Could not extract valid match ID from:', matchLink);
            return getMockPlayerData(matchLink);
        }
        
        console.log('Extracted match ID:', matchId);
        
        // Build the API URL correctly
        const apiUrl = `https://kingsleague.pro/api/v1/competition/matches/${matchId}?live=false&competitionId=8&competitionId=9`;
        console.log('API URL:', apiUrl);
        
        // Headers based on the provided fetch request - simplified for CORS
        const headers = {
            "accept": "*/*",
            "accept-language": "es-ES,es;q=0.9",
            "cache-control": "no-cache"
        };
        
        // Try direct API call first
        try {
            console.log('Attempting direct API call...');
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,
                mode: 'cors'
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Direct API response:', data);
                return parseKingsLeagueData(data);
            }
        } catch (directError) {
            console.log('Direct API call failed:', directError.message);
        }
        
        // If direct call fails, try with CORS proxies
        const corsProxies = [
            {
                url: 'https://api.allorigins.win/get',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: apiUrl,
                    format: 'raw'
                }),
                parseResponse: async (response) => {
                    const text = await response.text();
                    if (!text) {
                        throw new Error('Empty response');
                    }
                    const jsonData = JSON.parse(text);
                    return JSON.parse(jsonData.contents);
                }
            },
            {
                url: `https://cors-anywhere.herokuapp.com/${apiUrl}`,
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                parseResponse: async (response) => {
                    return await response.json();
                }
            }
        ];
        
        for (const proxy of corsProxies) {
            try {
                console.log(`Trying proxy: ${proxy.url}`);
                
                const fetchOptions = {
                    method: proxy.method || 'GET',
                    headers: proxy.headers || {}
                };
                
                if (proxy.body) {
                    fetchOptions.body = proxy.body;
                }
                
                const response = await fetch(proxy.url, fetchOptions);
                
                if (response.ok) {
                    const data = await proxy.parseResponse(response);
                    console.log('Proxy API response:', data);
                    return parseKingsLeagueData(data);
                }
            } catch (proxyError) {
                console.log(`Proxy ${proxy.url} failed:`, proxyError.message);
                continue;
            }
        }
        
        // If all fails, return mock data
        console.log('All API attempts failed, using mock data');
        return getMockPlayerData(matchLink);
        
    } catch (error) {
        console.error('Error in scrapeKingsLeagueAPI:', error);
        return getMockPlayerData(matchLink);
    }
}

// Function to parse Kings League API data
function parseKingsLeagueData(data) {
    try {
        console.log('Parsing Kings League data:', data);
        
        const teams = {
            team1: { name: '', players: [] },
            team2: { name: '', players: [] }
        };
        
        // Check different possible data structures
        if (data.match && data.match.teams) {
            // Structure: data.match.teams
            const matchTeams = data.match.teams;
            if (matchTeams.length >= 2) {
                teams.team1.name = matchTeams[0].name || matchTeams[0].shortName || 'Team 1';
                teams.team2.name = matchTeams[1].name || matchTeams[1].shortName || 'Team 2';
                
                // Extract players
                teams.team1.players = extractPlayers(matchTeams[0]);
                teams.team2.players = extractPlayers(matchTeams[1]);
            }
        } else if (data.teams) {
            // Structure: data.teams
            if (data.teams.length >= 2) {
                teams.team1.name = data.teams[0].name || data.teams[0].shortName || 'Team 1';
                teams.team2.name = data.teams[1].name || data.teams[1].shortName || 'Team 2';
                
                teams.team1.players = extractPlayers(data.teams[0]);
                teams.team2.players = extractPlayers(data.teams[1]);
            }
        } else if (data.homeTeam && data.awayTeam) {
            // Structure: data.homeTeam / data.awayTeam
            teams.team1.name = data.homeTeam.name || data.homeTeam.shortName || 'Home Team';
            teams.team2.name = data.awayTeam.name || data.awayTeam.shortName || 'Away Team';
            
            teams.team1.players = extractPlayers(data.homeTeam);
            teams.team2.players = extractPlayers(data.awayTeam);
        } else {
            // Check for direct structure with team properties
            const teamKeys = Object.keys(data).filter(key => 
                key.includes('team') || key.includes('Team') || 
                key.includes('home') || key.includes('away')
            );
            
            if (teamKeys.length >= 2) {
                teams.team1.name = data[teamKeys[0]].name || data[teamKeys[0]].shortName || 'Team 1';
                teams.team2.name = data[teamKeys[1]].name || data[teamKeys[1]].shortName || 'Team 2';
                
                teams.team1.players = extractPlayers(data[teamKeys[0]]);
                teams.team2.players = extractPlayers(data[teamKeys[1]]);
            }
        }
        
        console.log('Parsed teams:', teams);
        return teams;
        
    } catch (error) {
        console.error('Error parsing Kings League data:', error);
        return null;
    }
}

// Function to extract players from team data
function extractPlayers(teamData) {
    const players = [];
    
    try {
        if (!teamData) return players;
        
        // Check different possible player data structures
        const playerArrays = [
            teamData.lineup,
            teamData.players,
            teamData.squad,
            teamData.roster,
            teamData.jugadores,
            teamData.alineacion
        ];
        
        for (const playerArray of playerArrays) {
            if (Array.isArray(playerArray) && playerArray.length > 0) {
                playerArray.forEach(player => {
                    let playerName = '';
                    
                    if (typeof player === 'string') {
                        playerName = player;
                    } else if (typeof player === 'object') {
                        playerName = player.name || 
                                   player.displayName || 
                                   player.nickname || 
                                   player.jugador ||
                                   `${player.firstName || ''} ${player.lastName || ''}`.trim() ||
                                   `${player.nombre || ''} ${player.apellido || ''}`.trim();
                    }
                    
                    if (playerName && playerName.trim() !== '' && playerName !== ' ') {
                        players.push(playerName.trim());
                    }
                });
                break; // Use the first valid array found
            }
        }
        
        console.log(`Extracted ${players.length} players:`, players);
        
    } catch (error) {
        console.error('Error extracting players:', error);
    }
    
    return players;
}

// Enhanced function to try multiple scraping strategies
async function scrapeKingsLeagueData(matchLink) {
    try {
        console.log('Starting Kings League data scraping for:', matchLink);
        
        // For now, since CORS is blocking everything, let's use mock data based on URL
        console.log('Using mock data due to CORS restrictions');
        return getMockPlayerData(matchLink);
        
        /* Commented out API attempts due to CORS restrictions
        // Try the API-based approach first
        const apiResult = await scrapeKingsLeagueAPI(matchLink);
        
        if (apiResult && (apiResult.team1.players.length > 0 || apiResult.team2.players.length > 0)) {
            console.log('Successfully got data from API');
            return apiResult;
        }
        
        // If API fails, fall back to mock data
        console.log('API failed, using mock data');
        return getMockPlayerData(matchLink);
        */
        
    } catch (error) {
        console.error('All scraping strategies failed:', error);
        return getMockPlayerData(matchLink);
    }
}

// Function to create player list element
function createPlayerList(players, teamName) {
    const playerListContainer = document.createElement('div');
    playerListContainer.className = 'player-list-container';
    
    const teamTitle = document.createElement('h4');
    teamTitle.className = 'player-list-title';
    teamTitle.textContent = `${teamName} Squad`;
    
    const playerList = document.createElement('ul');
    playerList.className = 'player-list';
    
    if (players && players.length > 0) {
        players.forEach((player, index) => {
            const playerItem = document.createElement('li');
            playerItem.className = 'player-item';
            playerItem.innerHTML = `
                <span class="player-number">${index + 1}</span>
                <span class="player-name">${player}</span>
            `;
            playerList.appendChild(playerItem);
        });
    } else {
        const noPlayersItem = document.createElement('li');
        noPlayersItem.className = 'no-players';
        noPlayersItem.textContent = 'No player data available';
        playerList.appendChild(noPlayersItem);
    }
    
    playerListContainer.appendChild(teamTitle);
    playerListContainer.appendChild(playerList);
    
    return playerListContainer;
}

// Function to show match modal
function showMatchModal(match) {
    console.log('Showing match modal for:', match);
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    
    // Create modal header
    const modalHeader = document.createElement('h3');
    modalHeader.textContent = 'Match Details';
    
    // Create match details section
    const matchDetails = document.createElement('div');
    matchDetails.className = 'modal-match-details';
    
    const team1Data = getTeam(match.team1);
    const team2Data = getTeam(match.team2);
    
    // Team 1
    const team1Section = document.createElement('div');
    team1Section.className = 'modal-team';
    team1Section.innerHTML = `
        <img src="${team1Data.logo}" alt="${team1Data.name}" class="modal-team-logo" 
             onerror="this.src='https://placehold.co/60x60/black/gold?text=${team1Data.name}'">
        <div class="modal-team-name">${team1Data.name}</div>
    `;
    
    // VS
    const vsSection = document.createElement('div');
    vsSection.className = 'modal-vs';
    vsSection.textContent = 'VS';
    
    // Team 2
    const team2Section = document.createElement('div');
    team2Section.className = 'modal-team';
    team2Section.innerHTML = `
        <img src="${team2Data.logo}" alt="${team2Data.name}" class="modal-team-logo"
             onerror="this.src='https://placehold.co/60x60/black/gold?text=${team2Data.name}'">
        <div class="modal-team-name">${team2Data.name}</div>
    `;
    
    matchDetails.appendChild(team1Section);
    matchDetails.appendChild(vsSection);
    matchDetails.appendChild(team2Section);
    
    // Create football field
    const footballField = document.createElement('div');
    footballField.className = 'football-field';
    footballField.innerHTML = `
        <div class="penalty-area-left"></div>
        <div class="penalty-area-right"></div>
        <div class="goal-area-left"></div>
        <div class="goal-area-right"></div>
        <div class="goal-left"></div>
        <div class="goal-right"></div>
        <div class="corner-arc top-left"></div>
        <div class="corner-arc top-right"></div>
        <div class="corner-arc bottom-left"></div>
        <div class="corner-arc bottom-right"></div>
    `;
    
    // Create additional match info
    const matchInfo = document.createElement('div');
    matchInfo.className = 'modal-match-info';
    matchInfo.innerHTML = `
        <p><strong>Match ID:</strong> ${match.id}</p>
        ${match.matchTime ? `<p><strong>Time:</strong> ${formatLocalMatchTime(match.matchTime)}</p>` : ''}
        ${match.score ? `<p><strong>Score:</strong> ${match.score.team1} - ${match.score.team2}</p>` : ''}
        ${match.matchLink ? `<p><strong>Match Link:</strong> <a href="${match.matchLink}" target="_blank" rel="noopener noreferrer">View Details</a></p>` : ''}
    `;
    
    // Create player lists container
    const playerListsContainer = document.createElement('div');
    playerListsContainer.className = 'player-lists-container';
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(matchDetails);
    modalContent.appendChild(footballField);
    modalContent.appendChild(matchInfo);
    modalContent.appendChild(playerListsContainer);
    modalOverlay.appendChild(modalContent);
    
    // Add event listeners to close modal
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
    
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });
    
    // Add modal to page
    document.body.appendChild(modalOverlay);
    
    // If match has a link, try to scrape player data
    if (match.matchLink) {
        // Show loading indicator
        playerListsContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading player information...</p>
            </div>
        `;
        
        // Use enhanced scraping function
        scrapeKingsLeagueData(match.matchLink).then(playerData => {
            playerListsContainer.innerHTML = ''; // Clear loading indicator
            
            if (playerData && (playerData.team1.players.length > 0 || playerData.team2.players.length > 0)) {
                const playersSection = document.createElement('div');
                playersSection.className = 'players-section';
                
                const sectionTitle = document.createElement('h3');
                sectionTitle.className = 'players-section-title';
                sectionTitle.textContent = 'Team Squads';
                
                const playerListsGrid = document.createElement('div');
                playerListsGrid.className = 'player-lists-grid';
                
                // Create player lists for both teams
                const team1PlayerList = createPlayerList(playerData.team1.players, team1Data.name);
                const team2PlayerList = createPlayerList(playerData.team2.players, team2Data.name);
                
                playerListsGrid.appendChild(team1PlayerList);
                playerListsGrid.appendChild(team2PlayerList);
                
                playersSection.appendChild(sectionTitle);
                playersSection.appendChild(playerListsGrid);
                playerListsContainer.appendChild(playersSection);
            } else {
                playerListsContainer.innerHTML = `
                    <div class="error-message">
                        <p>Unable to load player information from Kings League API.</p>
                        <p>Showing mock data for demonstration purposes.</p>
                    </div>
                `;
            }
        }).catch(error => {
            console.error('Error loading player data:', error);
            playerListsContainer.innerHTML = `
                <div class="error-message">
                    <p>Error loading player information.</p>
                    <p>You can view the match details directly on the <a href="${match.matchLink}" target="_blank">Kings League website</a>.</p>
                </div>
            `;
        });
    }
}

export {
    showMatchModal
};