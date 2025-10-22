const BASE_URL = {
    PLATFORM: `https://na1.api.riotgames.com`,
    REGIONAL: `https://americas.api.riotgames.com`,
}

const ENDPOINT = {
    ACCOUNTS: `${BASE_URL.REGIONAL}/riot/account/v1/accounts`,
    SUMMONERS: `${BASE_URL.PLATFORM}/lol/summoner/v4/summoners`,
    MATCHES: `${BASE_URL.REGIONAL}/lol/match/v5/matches`,
}

const METHOD = {
    BY_ID: "by-riot-id",
    BY_PUUID: "by-puuid",
}

const ROUTE = {
    ACCOUNT: {
        BY_ID: (gameName, tagLine) =>
            `${ENDPOINT.ACCOUNTS}/${METHOD.BY_ID}/${gameName}/${tagLine}`,
        BY_PUUID: (puuid) =>
            `${ENDPOINT.ACCOUNTS}/${METHOD.BY_PUUID}/${puuid}`,
    },

    SUMMONER: {
        BY_PUUID: (puuid) =>
            `${ENDPOINT.SUMMONERS}/${METHOD.BY_PUUID}/${puuid}`,
    },
    MATCH: {
        BY_PUUID: (
            puuid,
            start = null,
            count = null,
            queue = null,
            startTime = null
        ) => {
            const url = new URL(
                `${ENDPOINT.RIOT.MATCHES}/by-puuid/${puuid}/ids?`
            );
            if (start != null) url.searchParams.append("start", start);
            if (count != null) url.searchParams.append("count", count);
            if (queue != null) url.searchParams.append("queue", queue);
            if (startTime != null)
                url.searchParams.append("startTime", startTime);
            return url.href;
        },
        BY_ID: (matchId) => `${ENDPOINT.RIOT.MATCHES}/${matchId}`,
    },
}
