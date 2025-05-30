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

// Helper function to get team logo
function getTeamLogo(teamId) {
    const team = teams[teamId] || teams.TBD;
    return team.logo || team.altLogo || "https://placehold.co/40x40/333/gold?text=" + team.name;
}

// Export only teams data and helper function
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        teams,
        getTeamLogo
    };
}
