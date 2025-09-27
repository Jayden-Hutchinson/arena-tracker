import { CDRAGON } from "./cdragon.js";
import { DDRAGON } from "./ddragon.js";
import { CLIENT_ROUTES } from "./routes/clientRoutes.js";

let augmentsCache = null;
let itemsCache = null;

export class ClientApi {
  static async fetchJson(url) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchRiotAccount(gameName, tagLine, setStatus) {
    setStatus("getting riot account");
    const url = CLIENT_ROUTES.SERVER.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    return this.fetchJson(url);
  }

  static async fetchSummoner(puuid, setStatus) {
    setStatus("getting summoner account");
    const url = CLIENT_ROUTES.SERVER.SUMMONER_BY_PUUID(puuid);
    return this.fetchJson(url);
  }

  static async fetchMatchHistory(puuid, setStatus) {
    setStatus("getting match history");
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
