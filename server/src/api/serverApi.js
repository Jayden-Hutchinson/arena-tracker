import "dotenv/config";
import { SERVER_ROUTES } from "../routes/serverRoutes.js";
import { RIOT } from "../../../src/constants.js";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export class ServerApi {
  constructor() {}

  static async fetchJson(url) {
    console.log(`Server Api Fetch: ${url}`);
    try {
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      });
      return response.json();
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "server error" });
    }
  }

  static async fetchRiotAccountByName(gameName, tagLine) {
    const gameNameUri = encodeURIComponent(gameName);
    const tagLineUri = encodeURIComponent(tagLine);

    const url = `${SERVER_ROUTES.RIOT_API.ACCOUNT_BY_NAME}${gameNameUri}/${tagLineUri}`;

    const riotAccountJson = await ServerApi.fetchJson(url);
    return riotAccountJson;
  }

  static async fetchMatchHistoryByPuuid(puuid) {
    const puuidUri = encodeURIComponent(puuid);

    const url = `${SERVER_ROUTES.RIOT_API.MATCHES_BY_PUUID}${puuidUri}/ids?startTime=${RIOT.ARENA_SEASON_START}&queue=${RIOT.ARENA_QUEUE_ID}&start=0&count=5`;
    const matchIdList = await ServerApi.fetchJson(url);

    console.log(matchIdList);

    const matches = [];
    let count = 0;
    for (const matchId of matchIdList) {
      count++;
      console.log("request:" + count);

      const matchUrl = `${SERVER_ROUTES.RIOT_API.MATCH_BY_ID}${matchId}`;
      const response = await ServerApi.fetchJson(matchUrl);
      matches.push(response);
      await ServerApi.sleep(100);
    }
    return matches;
  }

  static async fetchJsonData(item) {
    const itemUri = encodeURIComponent(item);
    const url = `${SERVER_ROUTES.DDRAGON.JSON_DATA}${itemUri}.json`;
  }

  static sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
