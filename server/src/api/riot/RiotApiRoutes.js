const BASE_URL = {
  PLATFORM: `https://na1.api.riotgames.com`,
  REGIONAL: `https://americas.api.riotgames.com`,
};

const RIOT_API_ROUTE = {
  ACCOUNT_BY_GAME_NAME: (gameName, tagLine) =>
    `${BASE_URL.REGIONAL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
  ACCOUNT_BY_PUUID: (puuid) =>
    `${BASE_URL.REGIONAL}/riot/account/v1/accounts/by-puuid/${puuid}`,

  SUMMONER_BY_PUUID: (puuid) =>
    `${BASE_URL.PLATFORM}/lol/summoner/v4/summoners/by-puuid/${puuid}`,

  MATCH_BY_ID: (matchId) =>
    `${BASE_URL.REGIONAL}/lol/match/v5/matches/${matchId}`,

  MATCH_BY_PUUID: (puuid, start, count, queue, startTime) => {
    const url = new URL(
      `${BASE_URL.REGIONAL}/lol/match/v5/matches/by-puuid/${puuid}/ids?`
    );
    if (start) url.searchParams.append("start", start);
    if (count) url.searchParams.append("count", count);
    if (queue) url.searchParams.append("queue", queue);
    if (startTime) url.searchParams.append("startTime", startTime);
    return url.href;
  },
};
module.exports = { RIOT_API_ROUTE };
