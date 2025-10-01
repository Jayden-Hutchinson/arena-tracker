import "dotenv/config";

class RateLimit {
  constructor(numRequests, timeSpan) {
    this.numRequests = numRequests;
    this.timeSpan = timeSpan;
  }
}

export class RiotApi {
  static apiKey = process.env.RIOT_API_KEY;

  static rateLimits = {
    perSecond: new RateLimit(20, 1000),
    perTwoMinutes: new RateLimit(100, 12000),
  };

  static arenaSeasonStartTime = 1745616000;
  static arenaQueueId = 1700;

  static routes = {
    account: (puuid) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    summoner: (puuid) =>
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    matchesByPuuid: (puuid, start, count, queue, startTime) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&queue=${queue}&startTime=${startTime}`,

    account: {
      gameName: (gameName, tagLine) =>
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      puuid: (puuid) =>
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    },
    matchById: (matchId) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  };

  static async fetch(url) {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });
    return response;
  }

  static async fetchMatchesByPuuid(
    puuid,
    start = 0,
    count = 100,
    queue = this.arenaQueueId,
    startTime = this.arenaSeasonStartTime
  ) {
    const url = this.routes.matchesByPuuid(
      puuid,
      start,
      count,
      queue,
      startTime
    );
    return this.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = this.routes.account.gameName(gameName, tagLine);
    return this.fetch(url);
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = this.routes.summoner(puuid);
    return this.fetch(url);
  }

  static async fetchAccountByPuuid(puuid) {
    const url = this.routes.account.puuid(puuid);
    return this.fetch(url);
  }

  static async fetchMatchById(matchId) {
    const url = this.routes.matchById(matchId);
    return this.fetch(url);
  }

  static async sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
