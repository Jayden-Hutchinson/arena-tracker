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
    account: (puuid) =>
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    summoner: (puuid) =>
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    matches: (puuid, start, count) =>
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${this.arenaSeasonStartTime}&queue=${this.arenaQueueId}&start=${start}&count=${count}`,

    account: {
      gameName: (gameName, tagLine) =>
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      puuid: (puuid) =>
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
    },
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

  static async fetchMatchesByPuuid(puuid, start = 0, count = 100) {
    let matches = [];
    while (true) {
      const url = this.routes.matches(puuid, start, count);

      const matchIdList = await this.fetchJson(url);
      if (!matchIdList || matchIdList.length === 0) {
        break;
      }
      matches = matches.concat(matchIdList);
      start += count;
    }
    return matches;
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = this.routes.account.gameName(gameName, tagLine);
    return this.fetchJson(url);
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = this.routes.summoner(puuid);
    return this.fetchJson(url);
  }

  static async fetchAccountByPuuid(puuid) {
    const url = this.routes.account.puuid(puuid);
    return this.fetchJson(url);
  }

  static async fetchMatchById(matchId) {
    const url = this.routes.matchById(matchId);
    return this.fetchJson(url);
  }

  static sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
