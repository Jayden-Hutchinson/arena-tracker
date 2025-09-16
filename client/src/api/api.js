import { APP_ROUTES } from "../config.js";

export class Api {
  static async fetchJson(url) {
    console.log("fetching", url)
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  static async fetchRiotAccount(gameName, tagLine) {
    const url = `${APP_ROUTES.ACCOUNT}?username=${gameName}&tagLine=${tagLine}`
    return this.fetchJson(url);
  }

  static async fetchMatches(puuid) {
    const url = `${APP_ROUTES.MATCH_HISTORY}?puuid=${puuid}`
    return this.fetchJson(url);
  }

  static async fetchMatch(matchId) {
    const url = `${APP_ROUTES.MATCH}?matchId=${matchId}`
    return this.fetchJson(url);
  }

}
