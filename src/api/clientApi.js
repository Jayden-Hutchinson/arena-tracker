import { APP_ROUTES } from "./routes/app_routes.js";

export class ClientApi {
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

  static async fetchSummoner(puuid) {
    const url = `${APP_ROUTES.SUMMONER}?puuid=${puuid}`;
    return this.fetchJson(url);
  }

  static async fetchMatchHistory(puuid) {
    const url = `${APP_ROUTES.MATCH_HISTORY}?puuid=${puuid}`;
    return this.fetchJson(url);
  }

  static async fetchMatchData(matchId) {
    const url = `${APP_ROUTES.MATCH}?matchId=${matchId}`;
    return this.fetchJson(url);
  }
}
