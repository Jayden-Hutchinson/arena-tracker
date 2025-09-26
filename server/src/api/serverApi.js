import "dotenv/config";
import { API_ROUTES } from "../routes/apiRoutes.js";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export class ServerApi {
  constructor() {}

  static async fetchJson(url) {
    console.log(`Server Api Fetch: ${url}`);
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }
    return response.json();
  }

  static async fetchMatchHistoryByPuuid(puuid) {
    try {
      const matchHistoryUrl = `${API_ROUTES.RIOT.MATCHES_BY_PUUID}${puuid}/ids?start=0&count=50`;
      const matchIdList = await ServerApi.fetchJson(matchHistoryUrl);

      const matches = [];
      for (const matchId of matchIdList) {
        const matchUrl = `${API_ROUTES.RIOT.MATCH_BY_ID}${matchId}`;
        const response = await ServerApi.fetchJson(matchUrl);
        matches.push(response);
      }

      return matches;
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "server error" });
    }
  }
}
