const BASE_URL = {
  PLATFORM: `https://na1.api.riotgames.com`,
  REGIONAL: `https://americas.api.riotgames.com`,
};

const RIOT_API_ROUTE = {
  ACCOUNT: {
    BY_GAME_NAME: (gameName, tagLine) =>
      `${BASE_URL.REGIONAL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    BY_PUUID: (puuid) =>
      `${BASE_URL.REGIONAL}/riot/account/v1/accounts/by-puuid/${puuid}`,
  },

  SUMMONER: {
    BY_PUUID: (puuid) =>
      `${BASE_URL.PLATFORM}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
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
        `${BASE_URL.REGIONAL}/lol/match/v5/matches/by-puuid/${puuid}/ids?`
      );
      if (start != null) url.searchParams.append("start", start);
      if (count != null) url.searchParams.append("count", count);
      if (queue != null) url.searchParams.append("queue", queue);
      if (startTime != null) url.searchParams.append("startTime", startTime);
      return url.href;
    },
    BY_ID: (matchId) => `${BASE_URL.REGIONAL}/lol/match/v5/matches/${matchId}`,
  },
};

module.exports = { RIOT_API_ROUTE };
