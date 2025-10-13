import "dotenv/config";
import { API_ROUTE } from "./ApiRoutes.js";
import AccountDto from "./AccountDto.js";

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

  static async sleep(seconds) {
    for (let i = seconds; i > 0; i--) {
      console.log(`Retrying in ${i}s...`);
      await new Promise((res) => setTimeout(res, 1000));
    }
  }

  static async fetch(url) {
    while (true) {
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": this.apiKey,
        },
      });
      console.log("RiotApi Response:", response.status, response.url);

      if (!response.ok) {
        if (response.status == 429) {
          const retryAfter = parseInt(
            response.headers.get("retry-after") || "1",
            10
          );
          console.warn(`Rate limited — retrying after ${retryAfter}s...`);
          await this.sleep(retryAfter);
          continue; // retry
        }
      }
      return response;
    }
  }

  static async fetchAccountByPuuid(puuid) {
    const url = API_ROUTE.RIOT.ACCOUNT.BY_PUUID(puuid);
    return this.fetch(url);
  }

  static async fetchAccountByGameName(gameName, tagLine) {
    const url = API_ROUTE.RIOT.ACCOUNT.BY_RIOT_ID(gameName, tagLine);
    const response = await this.fetch(url);
    const data = await response.json();
    console.log(data);
    const account = new AccountDto(data);
    console.log(account);

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
    let allMatchIds = [];
    while (true) {
      const url = API_ROUTE.RIOT.MATCH.BY_PUUID(
        puuid,
        start,
        count,
        queue,
        startTime
      );

      const res = await this.fetch(url);
      const data = await res.json();

      if (data.length === 0) {
        break;
      }

      allMatchIds.push(...data);

      start += count;
      break;
    }
    return allMatchIds;
  }

  static async fetchMatchById(matchId) {
    const url = API_ROUTE.RIOT.MATCH.BY_ID(matchId);
    return this.fetch(url);
  }
}
