import "dotenv/config";

class RateLimit {
  constructor(numRequests, timeSpan) {
    this.numRequests = numRequests;
    this.timeSpan = timeSpan;
  }
}

export class RiotApi {
  static baseUrl = {
    platform: `https://na1.api.riotgames.com`,
    regional: `https://americas.api.riotgames.com`,
  };

  static routes = {
    account: (puuid) =>
      `${this.baseUrl.regional}/riot/account/v1/accounts/by-puuid/${puuid}`,
    summoner: {
      byPuuid: (puuid) => {
        const url = new URL(
          `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
          this.baseUrl.platform
        );
        return url;
      },
    },
    match: {
      byPuuid: (
        params = {
          puuid,
          start: 0,
          count: 100,
          queue: 1700,
          startTime: null,
        }
      ) => {
        const url = new URL(
          `/lol/match/v5/matches/by-puuid/${params.puuid}/ids?`,
          this.baseUrl.regional
        );
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
        return url;
      },
      byMatchId: (matchId) => {
        const url = new URL(
          `/lol/match/v5/matches/${matchId}`,
          this.baseUrl.regional
        );
        return url;
      },
    },

    account: {
      byGameName: (gameName, tagLine) => {
        const url = new URL(
          `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
          this.baseUrl.regional
        );
        return url;
      },
      byPuuid: (puuid) =>
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    },
  };

  static apiKey = process.env.RIOT_API_KEY;

  static rateLimits = {
    perSecond: new RateLimit(20, 1000),
    perTwoMinutes: new RateLimit(100, 12000),
  };

  static arenaSeasonStartTime = 1745616000;
  static arenaQueueId = 1700;

  static async fetch(url) {
    console.log("Riot Api Request:", url.pathname);
    const res = await fetch(url, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });
    return res.json();
  }

  static async fetchAccountByPuuid(puuid) {
    const url = this.routes.account.byPuuid(puuid);
    return this.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = this.routes.account.byGameName(gameName, tagLine);
    return this.fetch(url);
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = this.routes.summoner.byPuuid(puuid);
    return this.fetch(url);
  }

  static async fetchMatchesByPuuid({
    puuid,
    start = 0,
    count = 100,
    queue = this.arenaQueueId,
    startTime = this.arenaSeasonStartTime,
  }) {
    const url = this.routes.match.byPuuid({
      puuid,
      start,
      count,
      queue,
      startTime,
    });
    return this.fetch(url);
  }

  static async fetchMatchById(matchId) {
    const url = this.routes.match.byMatchId(matchId);
    return this.fetch(url);
  }

  static async sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
