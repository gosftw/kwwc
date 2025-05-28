// Team data with their logos - Using better fallbacks for logo paths
const teams = {
    // Round 1 - Group A to H - Left side
    "DMG": {
        name: "DMG",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/e366a07d-c7c2-4b33-a301-2399458ae670/52359314.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=DMG"
    },
    "ZAY": {
        name: "ZAY",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/681284661.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=ZAY"
    },
    "PRS": {
        name: "PRS",
        logo: "https://kingsleague.pro/_ipx/s_40x40/https://s3.eu-central-2.wasabisys.com/kama.sport/account/production/team/346885788.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=PRS"
    },
    "LCA": {
        name: "LCA",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/668657080.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=LCA"
    },
    "GFC": {
        name: "GFC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/572359116.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=GFC"
    },
    "ULT": {
        name: "ULT",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/27891359.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=ULT"
    },
    "POR": {
        name: "POR",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/image/560492363.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=POR"
    },
    "MI7": {
        name: "MI7",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/dd35d248-af57-4c32-a061-f47794313fa9/15722558.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=MI7"
    },
    "BMR": {
        name: "BMR",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/104687956.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=BMR"
    },
    "U3D": {
        name: "U3D",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/e68031f0-29f8-4a42-afbf-6b1e0f1794e2/887547525.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=U3D"
    },
    "GDC": {
        name: "GDC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/27106216.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=GDC"
    },
    "ERA": {
        name: "ERA",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/714239575.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=ERA"
    },
    "GR7": {
        name: "GR7",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/320327393.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=GR7"
    },
    "KRS": {
        name: "KRS",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/72a6c478-4a8c-4603-93aa-935c53d338a9/236260830.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=KRS"
    },
    "ZTA": {
        name: "ZTA",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/408060857.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=ZTA"
    },
    "OUN": {
        name: "OUN",
        logo: "https://kingsleague.pro/_ipx/s_40x40/https://s3.eu-central-2.wasabisys.com/kama.sport/account/production/team/637264544.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=OUN"
    },
    
    // Round 1 - Group I to P - Right side
    "SXB": {
        name: "SXB",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/145317631.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=SXB"
    },
    "JFC": {
        name: "JFC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/image/784325114.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=JFC"
    },
    "FUR": {
        name: "FUR",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/248545336.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=FUR"
    },
    "KNS": {
        name: "KNS",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/637312369.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=KNS"
    },
    "TFC": {
        name: "TFC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/image/183436923.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=TFC"
    },
    "TRM": {
        name: "TRM",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/885226793.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=TRM"
    },
    "XBU": {
        name: "XBU",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/928519974.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=XBU"
    },
    "CHA": {
        name: "CHA",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/150123981.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=CHA"
    },
    "FLX": {
        name: "FLX",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/38688186-97e4-4a4e-8642-ef44cd83ba67/6416982.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=FLX"
    },
    "FLC": {
        name: "FLC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/711324762.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=FLC"
    },
    "ULC": {
        name: "ULC",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/824452906.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=ULC"
    },
    "PAS": {
        name: "PAS",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/d47580eb-c28b-475c-b0b6-3326472d6d52/965968627.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=PAS"
    },
    "DDL": {
        name: "DDL",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/club/9f1d670a-b1f7-49c3-9bab-c5c1e211a0f9/34418918.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=DDL"
    },
    "JXZ": {
        name: "JXZ",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/348445629.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=JXZ"
    },
    "F2R": {
        name: "F2R",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/917300602.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=F2R"
    },
    "MUR": {
        name: "MUR",
        logo: "https://kingsleague.pro/_ipx/s_40x40/kama/production/team/85098229.png",
        altLogo: "https://placehold.co/40x40/black/gold?text=MUR"
    },
    
    // Placeholder for TBD teams
    "TBD": {
        name: "TBD",
        logo: "https://kingsleague.pro/_ipx/s_40x40/img/world-cup/placeholder-team-kwc.png",
        altLogo: "https://placehold.co/40x40/333/gold?text=TBD"
    }
};

// Initial matches structure for Round 1
const initialMatches = [
    // Round 1 - Left Side
    { id: "A", team1: "DMG", team2: "ZAY", round: 1, match: 1 },
    { id: "B", team1: "PRS", team2: "LCA", round: 1, match: 2 },
    { id: "C", team1: "GFC", team2: "ULT", round: 1, match: 3 },
    { id: "D", team1: "POR", team2: "MI7", round: 1, match: 4 },
    { id: "E", team1: "BMR", team2: "U3D", round: 1, match: 5 },
    { id: "F", team1: "GDC", team2: "ERA", round: 1, match: 6 },
    { id: "G", team1: "GR7", team2: "KRS", round: 1, match: 7 },
    { id: "H", team1: "ZTA", team2: "OUN", round: 1, match: 8 },
    
    // Round 1 - Right Side
    { id: "I", team1: "SXB", team2: "JFC", round: 1, match: 9 },
    { id: "J", team1: "FUR", team2: "KNS", round: 1, match: 10 },
    { id: "K", team1: "TFC", team2: "TRM", round: 1, match: 11 },
    { id: "L", team1: "XBU", team2: "CHA", round: 1, match: 12 },
    { id: "M", team1: "FLX", team2: "FLC", round: 1, match: 13 },
    { id: "N", team1: "ULC", team2: "PAS", round: 1, match: 14 },
    { id: "O", team1: "DDL", team2: "JXZ", round: 1, match: 15 },
    { id: "P", team1: "F2R", team2: "MUR", round: 1, match: 16 }
];

// Round 2 structure - Winners bracket
const round2WinnersStructure = [
    { id: "1", team1: "TBD", team2: "TBD", winner1: "A", winner2: "B", round: 2, match: 1 },
    { id: "2", team1: "TBD", team2: "TBD", winner1: "C", winner2: "D", round: 2, match: 2 },
    { id: "3", team1: "TBD", team2: "TBD", winner1: "E", winner2: "F", round: 2, match: 3 },
    { id: "4", team1: "TBD", team2: "TBD", winner1: "G", winner2: "H", round: 2, match: 4 },
    { id: "5", team1: "TBD", team2: "TBD", winner1: "I", winner2: "J", round: 2, match: 5 },
    { id: "6", team1: "TBD", team2: "TBD", winner1: "K", winner2: "L", round: 2, match: 6 },
    { id: "7", team1: "TBD", team2: "TBD", winner1: "M", winner2: "N", round: 2, match: 7 },
    { id: "8", team1: "TBD", team2: "TBD", winner1: "O", winner2: "P", round: 2, match: 8 }
];

// Round 2 structure - Losers bracket
const round2LosersStructure = [
    { id: "9", team1: "TBD", team2: "TBD", loser1: "A", loser2: "B", round: 2, match: 9 },
    { id: "10", team1: "TBD", team2: "TBD", loser1: "C", loser2: "D", round: 2, match: 10 },
    { id: "11", team1: "TBD", team2: "TBD", loser1: "E", loser2: "F", round: 2, match: 11 },
    { id: "12", team1: "TBD", team2: "TBD", loser1: "G", loser2: "H", round: 2, match: 12 },
    { id: "13", team1: "TBD", team2: "TBD", loser1: "I", loser2: "J", round: 2, match: 13 },
    { id: "14", team1: "TBD", team2: "TBD", loser1: "K", loser2: "L", round: 2, match: 14 },
    { id: "15", team1: "TBD", team2: "TBD", loser1: "M", loser2: "N", round: 2, match: 15 },
    { id: "16", team1: "TBD", team2: "TBD", loser1: "O", loser2: "P", round: 2, match: 16 }
];

// Last chance structure
const lastChanceStructure = [
    { id: "LC1", team1: "TBD", team2: "TBD", loser: "1", winner: "16", round: "LC", match: 1 },
    { id: "LC2", team1: "TBD", team2: "TBD", loser: "2", winner: "15", round: "LC", match: 2 },
    { id: "LC3", team1: "TBD", team2: "TBD", loser: "3", winner: "14", round: "LC", match: 3 },
    { id: "LC4", team1: "TBD", team2: "TBD", loser: "4", winner: "13", round: "LC", match: 4 },
    { id: "LC5", team1: "TBD", team2: "TBD", loser: "5", winner: "12", round: "LC", match: 5 },
    { id: "LC6", team1: "TBD", team2: "TBD", loser: "6", winner: "11", round: "LC", match: 6 },
    { id: "LC7", team1: "TBD", team2: "TBD", loser: "7", winner: "10", round: "LC", match: 7 },
    { id: "LC8", team1: "TBD", team2: "TBD", loser: "8", winner: "9", round: "LC", match: 8 }
];

// Round of 16 structure
const round16Structure = [
    { id: "R16-1", team1: "TBD", team2: "TBD", advancer1: "1", advancer2: "LC1", round: "R16", match: 1 },
    { id: "R16-2", team1: "TBD", team2: "TBD", advancer1: "2", advancer2: "LC2", round: "R16", match: 2 },
    { id: "R16-3", team1: "TBD", team2: "TBD", advancer1: "3", advancer2: "LC3", round: "R16", match: 3 },
    { id: "R16-4", team1: "TBD", team2: "TBD", advancer1: "4", advancer2: "LC4", round: "R16", match: 4 },
    { id: "R16-5", team1: "TBD", team2: "TBD", advancer1: "5", advancer2: "LC5", round: "R16", match: 5 },
    { id: "R16-6", team1: "TBD", team2: "TBD", advancer1: "6", advancer2: "LC6", round: "R16", match: 6 },
    { id: "R16-7", team1: "TBD", team2: "TBD", advancer1: "7", advancer2: "LC7", round: "R16", match: 7 },
    { id: "R16-8", team1: "TBD", team2: "TBD", advancer1: "8", advancer2: "LC8", round: "R16", match: 8 }
];

// Quarter Finals structure
const quarterFinalsStructure = [
    { id: "QF1", team1: "TBD", team2: "TBD", winner1: "R16-1", winner2: "R16-2", round: "QF", match: 1 },
    { id: "QF2", team1: "TBD", team2: "TBD", winner1: "R16-3", winner2: "R16-4", round: "QF", match: 2 },
    { id: "QF3", team1: "TBD", team2: "TBD", winner1: "R16-5", winner2: "R16-6", round: "QF", match: 3 },
    { id: "QF4", team1: "TBD", team2: "TBD", winner1: "R16-7", winner2: "R16-8", round: "QF", match: 4 }
];

// Semi Finals structure
const semiFinalsStructure = [
    { id: "SF1", team1: "TBD", team2: "TBD", winner1: "QF1", winner2: "QF2", round: "SF", match: 1 },
    { id: "SF2", team1: "TBD", team2: "TBD", winner1: "QF3", winner2: "QF4", round: "SF", match: 2 }
];

// Final structure
const finalStructure = [
    { id: "F", team1: "TBD", team2: "TBD", winner1: "SF1", winner2: "SF2", round: "F", match: 1 }
];

// Helper function to get team logo
function getTeamLogo(teamId) {
    const team = teams[teamId] || teams.TBD;
    return team.logo || team.altLogo || "https://placehold.co/40x40/333/gold?text=" + team.name;
}

// Export necessary functions and data
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        teams,
        initialMatches,
        round2WinnersStructure,
        round2LosersStructure,
        lastChanceStructure,
        round16Structure,
        quarterFinalsStructure,
        semiFinalsStructure,
        finalStructure,
        getTeamLogo
    };
}
