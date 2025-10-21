import { URL } from "routes/serverRoutes.js";

import { CDRAGON } from "api/cdragon.js";
import { DDRAGON } from "api/ddragon";

import AccountDTO from "objects/riot_api/AccountDTO.js";
import MatchDTO from "objects/riot_api/MatchDTO.js";
import SummonerDTO from "objects/riot_api/SummonerDTO.js";
import MatchHistory from "objects/MatchHistory";

let augmentsCache = null;
let itemsCache = null;

export class Client {
  static async fetchServerJson(url) {
    const response = await fetch(url);
    console.log("Server Response:", response);

    if (!response.ok) {
      console.log("Error", response.status, response);
      return null;
    }

    const data = await response.json();
    console.log("Success", response.status, url, data);
    return data;
  }

  static async fetchAccount(gameName, tagLine) {
    const url = URL.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    const json = await this.fetchServerJson(url);
    return new AccountDTO(json);
  }

  static async fetchSummoner(puuid) {
    const url = URL.SUMMONER_BY_PUUID(puuid);
    const json = await this.fetchServerJson(url);
    return new SummonerDTO(json);
  }

  static async fetchMatchHistory(puuid) {
    const url = URL.MATCH_HISTORY_BY_PUUID(puuid);
    const json = await this.fetchServerJson(url);
    return new MatchHistory(json);
  }

  static async fetchMatchData(matchId) {
    const url = URL.MATCH_DATA_BY_ID(matchId);
    const json = await this.fetchServerJson(url);
    return new MatchDTO(json);
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
