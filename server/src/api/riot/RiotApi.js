class RiotApi {
  static async fetch(apiKey, url) {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
    return response;
  }

  static async fetchAccountByPuuid(puuid) {
    const url = RIOT_API_ROUTE.RIOT.PATH.ACCOUNT.BY_PUUID(puuid);
    return RiotApi.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = RIOT_API_ROUTE.RIOT.PATH.ACCOUNT.BY_RIOT_ID(gameName, tagLine);
    const response = await RiotApi.fetch(url);
    return response;
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = RIOT_API_ROUTE.RIOT.PATH.SUMMONER.BY_PUUID(puuid);
    return RiotApi.fetch(url);
  }

  static async fetchMatchesByPuuid(
    puuid,
    start = 0,
    count = 50,
    queue = RIOT_API_CONFIG.ARENA_QUEUE_ID,
    startTime = RIOT_API_CONFIG.ARENA_SEASON_START
  ) {
    let allMatchIds = [];
    while (true) {
      const url = RIOT_API_ROUTE.RIOT.PATH.MATCH.BY_PUUID(
        puuid,
        start,
        count,
        queue,
        startTime
      );

      const res = await RiotApi.fetch(url);
      const data = await res.json();

      if (data.length === 0) {
        break;
      }

      allMatchIds.push(...data);

      // start += count;
      break;
    }
    return allMatchIds;
  }

  static async fetchMatchById(matchId) {
    const url = RIOT_API_ROUTE.RIOT.PATH.MATCH.BY_ID(matchId);
    return RiotApi.fetch(url);
  }
}

module.exports = { RiotApi };
