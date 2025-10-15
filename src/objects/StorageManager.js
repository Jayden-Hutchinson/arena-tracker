import Summoner from "objects/Summoner";

import Match from "./Match";
import MatchHistory from "./MatchHistory";

import { Client } from "api/client";
import Account from "./Account";

const KEY = {
  ACCOUNTS: "Accounts",
};

class StorageManager {
  static getAccounts() {
    const json = JSON.parse(localStorage.getItem(KEY.ACCOUNTS)) || [];
    const accounts = json.map(
      (account) => new Account(account.puuid, account.gameName, account.tagLine)
    );
    return accounts;
  }

  static async createAccount(account) {}

  static async getSummonerData(accounts, setStatus) {
    const summoners = [];
    for (const account of accounts) {
      // setStatus("Creating new summoner");
      // setStatus("Fetching Summoner:", account.puuid);
      const summonerDto = await Client.fetchSummoner(account.puuid);

      // setStatus("Fetching Match History:", account.puuid);
      const matchIds = await Client.fetchMatchHistory(account.puuid);

      const matchHistory = new MatchHistory();
      for (const matchId of matchIds) {
        matchHistory.all.push(matchId);
      }

      const summoner = new Summoner(account, summonerDto, matchHistory);

      summoners.push(summoner);
    }

    return summoners;
  }

  static async getMatchHistoryData(puuid, matchHistory, setStatus) {
    const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
    const idsToFetch =
      savedWins.length > 0 ? savedWins : Object.entries(matchHistory);

    const matches = [];
    for (const [index, [matchId, matchData]] of idsToFetch.entries()) {
      // setStatus(`loading ${index + 1} of ${idsToFetch.length}`);

      const matchDto = await Client.fetchMatchData(matchId);

      const match = new Match(matchDto.metadata.matchId);
      match.player = match.getPlayer(
        puuid,
        matchDto.metadata.participants,
        matchDto.info.participants
      );

      match.teammate = match.getTeammate(
        puuid,
        match.player.playerSubteamId,
        matchDto.info.participants
      );

      matches.push(match);
    }

    // setStatus(null);
    return matches;
  }

  static async processWins(puuid, matchHistoryIds) {
    const wins = [];
    for (const match of matchHistoryIds) {
      const player = match.getPlayer(puuid);
      if (player.placement === 1) {
        wins.push(match);
      }
    }

    return wins;
  }
}

export default StorageManager;
