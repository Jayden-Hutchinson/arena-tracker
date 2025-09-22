import "dotenv/config";
import { API_ROUTES } from "../routes/apiRoutes.js";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export class ServerApi {
  constructor() {}

  static async fetchJson(url) {
    console.log("ApiManager", url);
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });

    if (!response.ok) {
      return response
        .status(response.status)
        .json({ error: `fetching match history by puuid failed ${url}` });
    }
    return response.json();
  }

  static async fetchMatchHistoryByPuuid(puuid) {
    try {
      const matchHistoryUrl = `${API_ROUTES.RIOT.MATCHES_BY_PUUID}${puuid}/ids?start=0&count=10`;
      const matchIdList = await ServerApi.fetchJson(matchHistoryUrl);
      console.log(matchIdList);

      const matches = [];
      for (const matchId of matchIdList) {
        const matchUrl = `${API_ROUTES.RIOT.MATCH_BY_ID}${matchId}`;
        const response = await ServerApi.fetchJson(matchUrl);
        matches.push(response);
      }
      console.log(matches);

      return matches;
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "server error" });
    }
  }
}
