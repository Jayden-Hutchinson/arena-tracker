import { URL } from "routes/serverRoutes.js";

import { CDRAGON } from "api/cdragon.js";
import { DDRAGON } from "api/ddragon";


export class Client {
  static async fetchServerJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Error", response.status, response);
      return null;
    }

    const json = await response.json();
    console.log("Success", response.status, url, data);
    return json;
  }

  static async fetchRiotAccountByGameName(gameName, tagLine) {
    const url = URL.account(gameName, tagLine);
    const json = await this.fetchServerJson(url);
    return json
  }

  static async fetchRiotSummonerByPuuid(puuid) {
    const url = URL.summoner(puuid);
    const json = await this.fetchServerJson(url);
    return json
  }

  static async fetchRiotMatchHistoryByPuuid(puuid) {
    const url = URL.matches(puuid);
    const json = await this.fetchServerJson(url);
    return json
  }

  static async fetchMatchDataById(matchId) {
    const url = URL.match(matchId);
    const json = await this.fetchServerJson(url);
    return json
  }

  static async fetchCDragonAugmentData() {
    const url = CDRAGON.AUGMENT_JSON;
    const json = this.fetchServerJson(url);
    return json;
  }

  static async fetchDDragonItemData() {
    const url = DDRAGON.ITEM_JSON;
    const json = this.fetchServerJson(url);
    return json;
  }
}
