import Match from "../../data_objects/Match";
import RiotAccount from "./RiotAccount";

import ServerApi from "./ServerApi";

const SERVER_BASE_URL = "http://localhost:3000/arena-tracker/api";

class ServerClient {
  static async getRiotAccount(gameName, tagLine) {
    try {
      var url;

      // Get account info for puuid
      url = `${ServerApi.BASE_URL}/riot/account/by-riot-id/?gameName=${gameName}&tagLine=${tagLine}`;
      const account = await fetch(url).then((res) => res.json());

      // Get summoner info with puuid
      url = `${ServerApi.BASE_URL}/riot/account/by-puuid/?puuid=${account.puuid}`;
      const summoner = await fetch(url).then((res) => res.json());

      // Create the riot account
      const riotAccount = new RiotAccount({ ...account, ...summoner });
      return riotAccount;
    } catch (err) {
      return err;
    }
  }

  static async fetchMatches(puuid) {
    try {
      const url = new URL(
        `riot/account/matches/by-puuid/`,
        `${SERVER_BASE_URL}/`
      );

      const params = {};
      params.count = 100;
      params.queue = 1700;

      if (puuid !== undefined) params.puuid = puuid;
      if (startTime !== undefined) params.startTime = startTime;
      if (endTime !== undefined) params.endTime = endTime;
      if (queue !== undefined) params.queue = queue;
      if (start !== undefined) params.start = start;
      if (count !== undefined) params.count = count;
      url.search = new URLSearchParams(params);

      console.log(url.toString());

      var start = 0;
      var count = 100;
      const matches = [];
      while (matches.length % 100 == 0) {
        const res = await fetch(url.toString()).then((res) => res.json());
      }

      return matches;
    } catch (err) {
      return err;
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
