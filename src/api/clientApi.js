import { APP_ROUTES } from "./routes/app_routes.js";

let augmentsCache = null;
let itemsCache = null;

export class ClientApi {
  static async fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} when trying to fetch ${url} from the server`
      );
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
    const data = this.fetchJson(APP_ROUTES.AUGMENT_JSON);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const url = `${APP_ROUTES.ITEM_JSON}`;
    const data = this.fetchJson(url);
    itemsCache = data;
    return data;
  }
}
