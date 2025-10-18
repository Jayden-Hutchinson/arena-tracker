import { URL } from "routes/serverRoutes.js";

import { CDRAGON } from "api/cdragon.js";
import { DDRAGON } from "api/ddragon";

import AccountDTO from "objects/riot_api/AccountDTO.js";
import MatchDTO from "objects/riot_api/MatchDTO.js";
import SummonerDTO from "objects/riot_api/SummonerDTO.js";

let augmentsCache = null;
let itemsCache = null;

export class Client {
  static async fetchServerJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Error", response.status, response);
      return null;
    }

    const data = await response.json();
    console.log("Success", response.status, response.ok, data);
    return data;
  }

  static async fetchAccount(gameName, tagLine) {
    const url = URL.account(gameName, tagLine);
    const res = await this.fetchServerJson(url);
    return new AccountDTO(res);
  }

  static async fetchSummoner(puuid) {
    const url = URL.summoner(puuid);
    const json = await this.fetchServerJson(url);
    return new SummonerDTO(json);
  }

  static async fetchMatchHistory(puuid) {
    const url = URL.matches(puuid);
    const json = await this.fetchServerJson(url);
    return json;
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
