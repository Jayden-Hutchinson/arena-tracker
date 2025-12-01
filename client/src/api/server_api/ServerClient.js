import RiotAccount from "./RiotAccount";

import ServerApi from "./ServerApi";

class ServerClient {
  static async fetchRiotAccount(gameName, tagLine) {
    try {
      var url;

      url = ServerApi.getAccountByGameNameUrl(gameName, tagLine);
      const account = await fetch(url).then((res) => res.json());

      url = ServerApi.getAccountByPuuidUrl(account.puuid);
      const summoner = await fetch(url).then((res) => res.json());

      const riotAccount = new RiotAccount({ ...account, ...summoner });

      // const matchesRes = await ServerClient.fetchMatches(riotAccountRes.puuid);

      // const matchData = [];
      // for (const matchId of matchesRes) {
      //   const match = await ServerClient.fetchMatch(matchId);
      //   matchData.push(new Match(match));
      //   await this.delay(50);
      // }

      return riotAccount;
    } catch (err) {
      return err;
    }
  }

  static async fetchMatches(puuid) {
    try {
      const url = ServerApi.getMatchesByPuuidUrl({ puuid });
      const matches = await fetch(url).then((res) => res.json());
      return matches;
    } catch (err) {
      return err;
    }
  }

  static async fetchMatch(matchId) {
    try {
      const url = ServerApi.getMatchByIdUrl(matchId);
      const match = await fetch(url).then((res) => res.json());
      return match;
    } catch (err) {
      return err;
    }
  }
}

export default ServerClient;
