import Summoner from "objects/Summoner";

import Match from "./Match";
import MatchHistory from "./MatchHistory";

import { Client } from "api/client";

const KEY = {
  ACCOUNTS: "Accounts",
};

class DataManager {
  static async createAccount(account) {}

  static async getSummonerData(account, setStatus) {
    let savedAccount = JSON.parse(localStorage.getItem(account.puuid));

    if (!savedAccount) {
      setStatus("Creating new summoner");
      setStatus("Fetching Summoner:", account.puuid);
      const summonerDto = await Client.fetchSummoner(account.puuid);
      setStatus("Fetching Match History:", account.puuid);
      const matchHistoryIds = await Client.fetchMatchHistory(account.puuid);

      const matchHistory = new MatchHistory();
      for (const matchId of matchHistoryIds) {
        const match = new Match(matchId);
        matchHistory.add(match);
      }

      account = new Summoner(account, summonerDto, matchHistoryIds);

      localStorage.setItem(account.puuid, JSON.stringify(account));
    } else {
      account = savedAccount;
    }

    return account;
  }

  static getAccounts() {
    return JSON.parse(localStorage.getItem(KEY.ACCOUNTS)) || [];
  }

  static async getMatchHistoryData(puuid, matchHistory, setStatus) {
    const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
    const idsToFetch =
      savedWins.length > 0 ? savedWins : Object.entries(matchHistory);

    const matches = [];
    for (const [index, [matchId, matchData]] of idsToFetch.entries()) {
      setStatus(`loading ${index + 1} of ${idsToFetch.length}`);

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

    setStatus(null);
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

export default DataManager;
