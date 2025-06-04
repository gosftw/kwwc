export const mediaConfig = {
    "TRATTORIA": {
        name: "Trattoria KL",
        image: "img/media/trattoria_kl_small.jpeg",
        alt: "Trattoria KL"
    },
    "DINASTIA": {
        name: "Dinastía Kings",
        image: "img/media/dinastia_kings_small.jpg",
        alt: "Dinastía Kings"
    },
    "TRIBUNA": {
        name: "Tribuna KL",
        image: "img/media/tribunakl.png",
        alt: "Tribuna KL"
    }
};

export function getMediaPredictions(predictions) {
    if (!predictions || !Array.isArray(predictions)) {
        return { team1: [], team2: [] };
    }
    
    return predictions.reduce((acc, pred) => {
        const mediaInfo = mediaConfig[pred.mediaId];
        if (mediaInfo) {
            if (pred.predictedWinner === "team1") {
                acc.team1.push({ ...mediaInfo, mediaId: pred.mediaId });
            } else if (pred.predictedWinner === "team2") {
                acc.team2.push({ ...mediaInfo, mediaId: pred.mediaId });
            }
        }
        return acc;
    }, { team1: [], team2: [] });
}