import "dotenv/config";

import { RIOT } from "../../../src/constants.js"


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
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    summonerByPuuid: (puuid) =>
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    matchesByPuuid: (puuid) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=100`,
    accountByGameName: (gameName, tagLine) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    matchById: (matchId) => `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
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
      response.status(500).json({ error: "Riot Api Server Error" });
    }
  }

  static async fetchByPuuid(route, { puuid }) {
    if (!route, !puuid) {
      return res.status(400).json({ error: "route and puuid required" })
    }
    let url = this.routes[route](puuid);
    const response = await this.fetchJson(url)
    return response
  }

  static async fetchMatchesByPuuid({ puuid }) {
    if (!puuid) {
    }

    const count = 100;
    let start = 0;
    let allMatchIds = [];
    while (true) {
      const url = `${this.routes.matchesByPuuid(puuid)}/ids?startTime=${RIOT.ARENA_SEASON_START}&queue=${RIOT.ARENA_QUEUE_ID}&start=${start}&count=${count}`;

      const matchIdList = await this.fetchJson(url);

      console.log(matchIdList)
      if (!matchIdList || matchIdList.length === 0) {
        break;
      }

      allMatchIds = allMatchIds.concat(matchIdList);
      start += count;
    }
    return allMatchIds;
  }
  static sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  static async fetchAccountByGameName({ gameName, tagLine }) {
    if (!gameName || !tagLine) {
    }
    const url = this.routes.accountByGameName(gameName, tagLine);
    const riotAccountJson = await this.fetchJson(url);
    return riotAccountJson;
  }

  static async fetchSummonerByPuuid(puuid) {
    if (!puuid) {
    }
    const url = this.routes.summonerByPuuid(puuid);
    const summonerJson = await this.fetchJson(url);
    return summonerJson;
  }

  static async fetchAccountByPuuid(puuid) {
    if (!gameName || !tagLine) {
    }
    const url = this.routes.accountByPuuid(puuid)
    const riotAccountJson = await this.fetchJson(url);
    return riotAccountJson;
  }


  static async fetchMatchById({ matchId }) {
    if (!matchId) {
    }
    matchId = encodeURI(matchId);
    const url = this.routes.matchById(matchId);
    const response = await this.fetchJson(url);
    return response;
  }
}
