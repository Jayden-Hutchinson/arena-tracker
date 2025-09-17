import { APP_ROUTES } from "../routes/app_routes.js";

export class Api {
  static async fetchJson(url) {
    console.log("Client Api", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  }

  static async fetchRiotAccount(gameName, tagLine) {
    const url = `${APP_ROUTES.ACCOUNT}?username=${gameName}&tagLine=${tagLine}`;
    return this.fetchJson(url);
  }

  static async fetchMatches(puuid) {
    const url = `${APP_ROUTES.MATCH_HISTORY}?puuid=${puuid}`;
    return this.fetchJson(url);
  }

  static async fetchMatch(matchId) {
    const url = `${APP_ROUTES.MATCH}?matchId=${matchId}`;
    return this.fetchJson(url);
  }
}
