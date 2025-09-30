import "dotenv/config";

import { RIOT } from "../../../src/constants.js";

class RateLimit {
  constructor(numRequests, timeSpanMs) {
    this.numRequests = numRequests;
    this.timeSpanMs = timeSpanMs;
  }
}

export class RiotApi {
  static numRequests = 0;
  static requestTimer = 0;
  static apiKey = process.env.RIOT_API_KEY;

  static rateLimits = {
    perSecond: new RateLimit(20, 1000),
    perTwoMinutes: new RateLimit(100, 12000),
  };

  static arenaSeasonStartTime = 1745616000;
  static arenaQueueId = 1700;

  static routes = {
    accountByPuuid: (puuid) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    summonerByPuuid: (puuid) =>
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    matchHistoyrByPuuid: (puuid, start, count) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${this.arenaSeasonStartTime}&queue=${this.arenaQueueId}&start=${start}&count=${count}`,
    accountByGameName: (gameName, tagLine) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    matchById: (matchId) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  };

  static async fetchJson(url) {
    console.log(`Riot Api Fetching: ${url}`);
    try {
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(
          `RiotApi Error ${response.status}: ${response.statusText} - ${response.url}`
        );
      }

      return response.json();
    } catch (err) {
      throw err;
    }
  }

  static async fetchMatchHistoryByPuuid({ puuid }) {
    if (!puuid) {
      throw new Error(
        "RiotApi.fetchMatchHistoryByPuuid() required gameName and tagLine"
      );
    }

    let start = 0;
    const count = 100;
    let matchHistory = [];
    while (true) {
      const url = this.routes.matchHistoyrByPuuid(puuid, start, count);

      const matchIdList = await this.fetchJson(url);
      if (!matchIdList || matchIdList.length === 0) {
        break;
      }
      matchHistory = matchHistory.concat(matchIdList);
      start += count;
    }
    console.log(matchHistory);
    return matchHistory.reduce((acc, v) => {
      acc[v] = null;
      return acc;
    }, {});
  }

  static async fetchAccountByGameName({ gameName, tagLine }) {
    if (!gameName || !tagLine) {
      throw new Error(
        "RiotApi.fetchAccountByGameName() requires gameName and tagLine"
      );
    }
    const url = this.routes.accountByGameName(gameName, tagLine);
    return this.fetchJson(url);
  }

  static async fetchSummonerByPuuid({ puuid }) {
    if (!puuid) {
      throw new Error("RiotApi.fetchSummonerByPuuid() requires puuid");
    }
    const url = this.routes.summonerByPuuid(puuid);
    return this.fetchJson(url);
  }

  static async fetchAccountByPuuid(puuid) {
    if (!puuid) {
      throw new Error("RiotApi.fetchAccountByPuuid() requires puuid");
    }
    const url = this.routes.accountByPuuid(puuid);
    return this.fetchJson(url);
  }

  static async fetchMatchById({ matchId }) {
    if (!matchId) {
      throw new Error("RiotApi.fetchMatchById() requires matchId");
    }
    const url = this.routes.matchById(matchId);
    return this.fetchJson(url);
  }

  static sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
