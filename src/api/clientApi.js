import { CDRAGON } from "./cdragon.js";
import { DDRAGON } from "./ddragon.js";
import { CLIENT_ROUTES } from "./routes/clientRoutes.js";

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
    const url = CLIENT_ROUTES.SERVER.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    console.log(url);
    return this.fetchJson(url);
  }

  static async fetchSummoner(puuid) {
    const url = CLIENT_ROUTES.SERVER.SUMMONER_BY_PUUID(puuid);
    return this.fetchJson(url);
  }

  static async fetchMatchHistory(puuid) {
    const url = CLIENT_ROUTES.SERVER.MATCH_HISTORY_BY_PUUID(puuid);
    return this.fetchJson(url);
  }

  static async fetchMatchData(matchId) {
    const url = CLIENT_ROUTES.SERVER.MATCH_BY_ID(matchId);
    return this.fetchJson(url);
  }

  static async fetchAugmentData() {
    if (augmentsCache) return augmentsCache;
    const url = CDRAGON.AUGMENT_JSON;
    const data = this.fetchJson(url);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const url = DDRAGON.ITEM_JSON;
    const data = this.fetchJson(url);
    itemsCache = data;
    return data;
  }
}
