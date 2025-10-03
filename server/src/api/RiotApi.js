import "dotenv/config";
import { API_ROUTE } from "./ApiRoutes.js";

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

  static async fetch(url) {
    console.log("Riot Api Request:", url);
    await this.sleep(1200);
    const res = await fetch(url, {
      headers: {
        "X-Riot-Token": this.apiKey,
      },
    });

    if (!res.ok) {
      let body;
      try {
        body = await res.json();
      } catch {
        body = { message: res.statusText };
      }
      const err = new Error(res.statusText);
      err.status = res.status;
      err.body = body;
      throw err;
    }

    return res.json();
  }

  static async fetchAccountByPuuid(puuid) {
    const url = API_ROUTE.RIOT.ACCOUNT.BY_PUUID(puuid);
    return this.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = API_ROUTE.RIOT.ACCOUNT.BY_RIOT_ID(gameName, tagLine);
    return this.fetch(url);
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = API_ROUTE.RIOT.SUMMONER.BY_PUUID(puuid);
    return this.fetch(url);
  }

  static async fetchMatchesByPuuid(
    puuid,
    start = 0,
    count = 100,
    queue = this.arenaQueueId,
    startTime = this.arenaSeasonStartTime
  ) {
    const url = API_ROUTE.RIOT.MATCH.BY_PUUID(
      puuid,
      start,
      count,
      queue,
      startTime
    );
    return this.fetch(url);
  }

  static async fetchMatchById(matchId) {
    const url = API_ROUTE.RIOT.MATCH.BY_ID(matchId);
    return this.fetch(url);
  }

  static async sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
