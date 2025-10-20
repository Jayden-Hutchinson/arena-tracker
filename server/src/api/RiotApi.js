import "dotenv/config";
import { API } from "./ApiRoutes.js";

const BASE_TEN = 10;

class RateLimit {
  constructor(numRequests, timeSpan) {
    this.numRequests = numRequests;
    this.timeSpan = timeSpan;
  }

  check() {}
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
    while (true) {
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": this.apiKey,
        },
      });

      // Return if there is a successful request
      if (response.ok) {
        return response;
      }

      // Handle rate limit
      switch (response.status) {
        case API.RIOT.ERROR_STATUS.RATE_LIMIT:
          const retryAfter = parseInt(
            response.headers.get("retry-after") || "1",
            BASE_TEN,
          );
          console.warn(`Rate limited — retrying after ${retryAfter}s...`);
          await new Promise((res) => setTimeout(res, retryAfter * 1000));
          continue;

        case API.RIOT.ERROR_STATUS.UNAUTHORIZED:
          console.log(response);
          const err = new Error("Unauthorized: Invalid API Key");
          err.status = response.status;
          throw err;
      }

      const err = new Error("UNCAUGHT ERROR");
      err.status = response.status;
      throw err;
    }
  }

  static async fetchAccountByPuuid(puuid) {
    const url = API.RIOT.PATH.ACCOUNT.BY_PUUID(puuid);
    return this.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = API.RIOT.PATH.ACCOUNT.BY_RIOT_ID(gameName, tagLine);
    const response = await this.fetch(url);
    return response;
  }

  static async fetchSummonerByPuuid(puuid) {
    const url = API.RIOT.PATH.SUMMONER.BY_PUUID(puuid);
    return this.fetch(url);
  }

  static async fetchMatchesByPuuid(
    puuid,
    start = 0,
    count = 50,
    queue = this.arenaQueueId,
    startTime = this.arenaSeasonStartTime,
  ) {
    let allMatchIds = [];
    while (true) {
      const url = API.RIOT.PATH.MATCH.BY_PUUID(
        puuid,
        start,
        count,
        queue,
        startTime,
      );

      const res = await this.fetch(url);
      const data = await res.json();

      if (data.length === 0) {
        break;
      }

      allMatchIds.push(...data);

      // start += count;
      console.log("RIOT API LOOP");
      break;
    }
    return allMatchIds;
  }

  static async fetchMatchById(matchId) {
    const url = API.RIOT.PATH.MATCH.BY_ID(matchId);
    return this.fetch(url);
  }
}
