const DDRAGON = {
  VERSION: "15.19.1",
};

const BASE_URL = {
  RIOT: {
    PLATFORM: `https://na1.api.riotgames.com`,
    REGIONAL: `https://americas.api.riotgames.com`,
  },
  DDRAGON: `https://ddragon.leagueoflegends.com/cdn/${DDRAGON.VERSION}`,
};

const ENDPOINT = {
  RIOT: {
    ACCOUNTS: `${BASE_URL.RIOT.REGIONAL}/riot/account/v1/accounts`,
    SUMMONERS: `${BASE_URL.RIOT.PLATFORM}/lol/summoner/v4/summoners`,
    MATCHES: `${BASE_URL.RIOT.REGIONAL}/lol/match/v5/matches`,
  },
  DDRAGON: {
    CHAMPION: `${BASE_URL.DDRAGON}/img/champion`,
    ITEM: `${BASE_URL.DDRAGON}/img/item`,
    PROFILE_ICON: `${BASE_URL.DDRAGON}/img/profileicon`,
  },
};

export const API_ROUTE = {
  RIOT: {
    ACCOUNT: {
      BY_RIOT_ID: (gameName, tagLine) =>
        `${ENDPOINT.RIOT.ACCOUNTS}/by-riot-id/${gameName}/${tagLine}`,
      BY_PUUID: (puuid) => `${ENDPOINT.RIOT.ACCOUNTS}/by-puuid/${puuid}`,
    },
    SUMMONER: {
      BY_PUUID: (puuid) => `${ENDPOINT.RIOT.SUMMONERS}/by-puuid/${puuid}`,
    },
    MATCH: {
      BY_PUUID: (puuid, start, count, queue, startTime) => {
        const url = new URL(`${ENDPOINT.RIOT.MATCHES}/by-puuid/${puuid}/ids?`);
        if (start) url.searchParams.append("start", start);
        if (count) url.searchParams.append("count", count);
        if (queue) url.searchParams.append("queue", queue);
        if (startTime) url.searchParams.append("startTime", startTime);
        return url.href;
      },
      BY_ID: (matchId) => `${ENDPOINT.RIOT.MATCHES}/${matchId}`,
    },
  },

  DDRAGON: {
    CHAMPION: {
      IMG: (championPng) => `${ENDPOINT.DDRAGON.CHAMPION}/${championPng}`,
    },
    ITEM: {
      IMG: (itemPng) => `${ENDPOINT.DDRAGON.ITEM}/${itemPng}`,
    },
    PROFILE_ICON: {
      IMG: (iconPng) => `${ENDPOINT.DDRAGON.PROFILE_ICON}/${iconPng}`,
    },
  },
};
