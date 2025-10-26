import { SERVER_ROUTES } from "routes/serverRoutes.js";

export class ClientApi {
  static async fetchServerJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.log(
        response.status,
        `${response.statusText}: ${data}`,
        response.url,
      );
      return;
    }

    console.log(response.status, url, { data });
    return data;
  }

  static async fetchRiotAccountByGameName(gameName, tagLine) {
    const url = SERVER_ROUTES.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    const json = await this.fetchServerJson(url);
    return json;
  }

  static async fetchRiotSummonerByPuuid(puuid) {
    const url = SERVER_ROUTES.SUMMONER_BY_PUUID(puuid);
    const json = await this.fetchServerJson(url);
    return json;
  }

  static async fetchRiotMatchHistoryByPuuid(puuid) {
    const url = SERVER_ROUTES.MATCH_HISTORY_BY_PUUID(puuid);
    const json = await this.fetchServerJson(url);
    return json;
  }

  static async fetchMatchDataById(matchId) {
    const url = SERVER_ROUTES.MATCH_BY_ID(matchId);
    const json = await this.fetchServerJson(url);
    return json;
  }

  static async fetchAugmentData() {
    const url = SERVER_ROUTES.AUGMENT_DATA;
    const json = this.fetchServerJson(url);
    return json;
  }

  static async fetchItemData() {
    const url = SERVER_ROUTES.ITEM_DATA;
    const json = this.fetchServerJson(url);
    return json;
  }
}
