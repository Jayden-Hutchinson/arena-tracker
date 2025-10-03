import { CDRAGON } from "./cdragon.js";
import { DDRAGON } from "./ddragon.js";
import { URL } from "./routes/serverRoutes.js";

let augmentsCache = null;
let itemsCache = null;

export class ClientApi {
  static async fetchServer(url) {
    const data = await fetch(url).then((res) => res.json());
    console.log("Server responded with:", data);
    return data;
  }

  static async fetchRiotAccount(gameName, tagLine) {
    const url = URL.account(gameName, tagLine);
    return await this.fetchServer(url);
  }

  static async fetchSummoner(puuid) {
    const url = URL.summoner(puuid);
    return await this.fetchServer(url);
  }

  static async fetchMatchHistory(puuid) {
    const url = URL.matches(puuid);
    return this.fetchServer(url);
  }

  static async fetchMatchData(matchId) {
    const url = URL.match(matchId);
    return this.fetchServer(url);
  }

  static async fetchAugmentData() {
    if (augmentsCache) return augmentsCache;
    const url = CDRAGON.AUGMENT_JSON;
    const data = this.fetchServer(url);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const url = DDRAGON.ITEM_JSON;
    const data = this.fetchServer(url);
    itemsCache = data;
    return data;
  }
}
