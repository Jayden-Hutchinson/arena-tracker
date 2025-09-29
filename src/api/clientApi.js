import { CDRAGON } from "./cdragon.js";
import { DDRAGON } from "./ddragon.js";
import { SERVER_ROUTES } from "./routes/serverRoutes.js";

let augmentsCache = null;
let itemsCache = null;

export class ClientApi {
  static async fetchServer(serverRoute) {
    try {
      const response = await fetch(serverRoute);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchRiotAccount(gameName, tagLine, setStatus) {
    setStatus("getting riot account");
    const serverRoute = SERVER_ROUTES.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    return this.fetchServer(serverRoute);
  }

  static async fetchSummoner(puuid, setStatus) {
    setStatus("fetching summoner account");
    const serverRoute = SERVER_ROUTES.SUMMONER_BY_PUUID(puuid);
    return this.fetchServer(serverRoute);
  }

  static async fetchMatchHistory(puuid, setStatus) {
    setStatus("fetching match history");
    const serverRoute = SERVER_ROUTES.MATCHES_BY_PUUID(puuid);
    return this.fetchServer(serverRoute);
  }

  static async fetchMatchData(matchId) {
    const serverRoute = SERVER_ROUTES.MATCH_BY_ID(matchId);
    console.log("HERE", serverRoute)
    return this.fetchServer(serverRoute);
  }

  static async fetchAugmentData() {
    if (augmentsCache) return augmentsCache;
    const serverRoute = CDRAGON.AUGMENT_JSON;
    const data = this.fetchServer(serverRoute);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const serverRoute = DDRAGON.ITEM_JSON;
    const data = this.fetchServer(serverRoute);
    itemsCache = data;
    return data;
  }
}
