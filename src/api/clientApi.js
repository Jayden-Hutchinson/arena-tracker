import { APP_ROUTES } from "./routes/app_routes.js";
import { CDRAGON_ROUTES } from "./routes/cdragon_routes.js";

let augmentsCache = null;
let itemsCache = null;

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

  static async fetchAugmentData() {
    if (augmentsCache) return augmentsCache;
    const url = `${CDRAGON_ROUTES.AUGMENTS}`;
    const data = this.fetchJson(url);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const url = `${CDRAGON_ROUTES.ITEMS}`;
    const data = this.fetchJson(url);
    itemsCache = data;
    return data;
  }
}
