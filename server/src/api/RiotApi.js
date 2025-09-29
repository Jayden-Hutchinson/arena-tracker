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

  static routes = {
    accountByPuuid: (puuid) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${puuid}`,
    summonerByPuuid:
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/",
    matchesByPuuid:
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
    accountByGameName: (gameName, tagLine) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    matchById: "https://americas.api.riotgames.com/lol/match/v5/matches/",
  };

  static async fetchJson(url) {
    console.log(`Riot Api Fetching: ${url}`);
    try {
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": this.apiKey,
        },
      });
      return response.json();
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Riot Api Server Error" });
    }
  }

  static async fetchByPuuid(route, puuid) {
    console.log(route);
    let url = this.routes[route];
    console.log(url);
    return await this.fetchJson(url);
  }

  static async fetchAccountByGameName({ gameName, tagLine }) {
    if (!gameName || !tagLine) {
      return res.status(400).json({ error: "username and tagLine required" });
    }
    gameName = encodeURIComponent(gameName);
    tagLine = encodeURIComponent(tagLine);
    const url = this.routes.accountByGameName(gameName, tagLine);
    console.log(url);
    const riotAccountJson = await this.fetchJson(url);
    return riotAccountJson;
  }

  static async fetchSummonerByPuuid(puuid) {
    if (!puuid) {
      return res.status(400).json({ error: "puuid required" });
    }
    const encodedPuuid = encodeURIComponent(puuid);
    const url = `${SERVER_ROUTES.RIOT_API.SUMMONER_BY_PUUID}${encodedPuuid}`;
    const summonerJson = await this.fetchJson(url);
    return summonerJson;
  }

  static async fetchAccountByPuuid(puuid) {
    if (!gameName || !tagLine) {
      return res.status(400).json({ error: "username and tagLine required" });
    }
    const gameNameUri = encodeURIComponent(gameName);
    const tagLineUri = encodeURIComponent(tagLine);
    const url = `${SERVER_ROUTES.RIOT_API.ACCOUNT_BY_NAME}${gameNameUri}/${tagLineUri}`;
    const riotAccountJson = await this.fetchJson(url);
    return riotAccountJson;
  }

  static async fetchMatchesByPuuid(puuid) {
    if (!puuid) {
      return res.status(400).json({ error: "puuid required" });
    }
    const puuidUri = encodeURIComponent(puuid);
    const count = 100;

    let start = 0;
    let allMatchIds = [];
    while (true) {
      const url = `${SERVER_ROUTES.RIOT_API.MATCHES_BY_PUUID}${puuidUri}/ids?startTime=${RIOT.ARENA_SEASON_START}&queue=${RIOT.ARENA_QUEUE_ID}&start=${start}&count=${count}`;
      const matchIdList = await this.fetchJson(url);
      console.log(puuid);
      console.log(matchIdList);

      if (!matchIdList || matchIdList.length === 0) {
        break;
      }

      allMatchIds = allMatchIds.concat(matchIdList);
      start += count;
    }
    return allMatchIds;
  }

  static async fetchMatchById({ matchId }) {
    if (!matchId) {
      return res.status(400).json({ error: "mathId required" });
    }
    matchId = encodeURI(matchId);
    const url = `${this.routes.matchById}${matchId}`;
    const response = await this.fetchJson(url);
    return response;
  }
}
