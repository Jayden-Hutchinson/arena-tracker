import Match from "../../data_objects/Match";
import RiotAccount from "./RiotAccount";

import ServerApi from "./ServerApi";

const SERVER_BASE_URL = "http://localhost:3000/arena-tracker/api";

class ServerClient {
  static async getRiotAccount(gameName, tagLine) {
    try {
      // Get account info for puuid
      const account = await this.fetchAccount(gameName, tagLine);

      // Get summoner info with puuid
      const summoner = await this.fetchSummoner(account.puuid);

      const matches = await this.fetchMatches(account.puuid);

      // Create the riot account
      const riotAccount = new RiotAccount({ ...account, ...summoner, matches });
      // console.debug(riotAccount);
      return riotAccount;
    } catch (err) {
      return err;
    }
  }

  static async fetchAccount(gameName, tagLine) {
    const url = `${ServerApi.BASE_URL}/riot/account/by-riot-id/?gameName=${gameName}&tagLine=${tagLine}`;
    const account = await fetch(url).then((res) => res.json());
    return account;
  }

  static async fetchSummoner(puuid) {
    const url = `${ServerApi.BASE_URL}/riot/account/by-puuid/?puuid=${puuid}`;
    const summoner = await fetch(url).then((res) => res.json());
    return summoner;
  }

  static async fetchMatches(puuid) {
    try {
      const url = new URL(
        `riot/account/matches/by-puuid/`,
        `${SERVER_BASE_URL}/`,
      );

      const params = {
        puuid,
        start: 0,
        count: 100,
        queue: 1700,
      };

      url.search = new URLSearchParams(params);

      console.log(url.toString());

      const matches = [];
      while (matches.length % 100 == 0) {
        const res = await fetch(url.toString()).then((res) => res.json());
        console.log(res);

        matches.push(...res);

        params.start += params.count;
        url.search = new URLSearchParams(params);
      }

      return matches;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  static async fetchMatch(matchId) {
    try {
      const url = `${ServerApi.BASE_URL}/riot/match/?matchId=${matchId}`;
      const data = await fetch(url).then((res) => res.json());
      return new Match(data);
    } catch (err) {
      return err;
    }
  }
}

export default ServerClient;
