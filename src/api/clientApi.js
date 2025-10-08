import { CDRAGON } from "./cdragon.js";
import { DDRAGON } from "./ddragon.js";
import { URL } from "../routes/serverRoutes.js";
import AccountDTO from "../objects/riot_api/AccountDTO.js";
import MatchDTO from "../objects/riot_api/MatchDTO.js";
import SummonerDTO from "../objects/riot_api/SummonerDTO.js";

let augmentsCache = null;
let itemsCache = null;

export class ClientApi {
  static async fetchServerJson(url) {
    try {
      const data = await fetch(url).then((res) => res.json());
      console.log("Server responded with:", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAccount(gameName, tagLine) {
    const url = URL.account(gameName, tagLine);
    const res = await this.fetchServerJson(url);
    return new AccountDTO(res);
  }

  static async fetchSummoner(puuid) {
    const url = URL.summoner(puuid);
    const res = await this.fetchServerJson(url);
    return new SummonerDTO(res);
  }

  static async fetchMatchHistory(puuid) {
    const url = URL.matches(puuid);
    return this.fetchServerJson(url);
  }

  static async fetchMatchData(matchId) {
    const url = URL.match(matchId);
    const res = await this.fetchServerJson(url);
    return new MatchDTO(res);
  }

  static async fetchAugmentData() {
    if (augmentsCache) return augmentsCache;
    const url = CDRAGON.AUGMENT_JSON;
    const data = this.fetchServerJson(url);
    augmentsCache = data;
    return data;
  }

  static async fetchItemData() {
    if (itemsCache) return itemsCache;
    const url = DDRAGON.ITEM_JSON;
    const data = this.fetchServerJson(url);
    itemsCache = data;
    return data;
  }
}
