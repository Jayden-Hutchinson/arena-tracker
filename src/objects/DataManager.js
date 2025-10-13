import Summoner from "objects/Summoner";

import Match from "./Match";
import MatchHistory from "./MatchHistory";

import { Client } from "api/client";

class DataManager {
  static async createAccount(account) {

  }

  static async getSummonerData(account, setStatus) {
    let savedAccount = JSON.parse(localStorage.getItem(account.puuid));
    console.log(savedAccount)

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
      console.log(matchHistory)


      account = new Summoner(account, summonerDto, matchHistoryIds);

      localStorage.setItem(account.puuid, JSON.stringify(account));
    } else {
      account = savedAccount
    }

    return account;
  }

  static async getMatchHistoryData(puuid, matchHistory, setStatus) {
    const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
    console.log(matchHistory)
    const idsToFetch = savedWins.length > 0 ? savedWins : Object.entries(matchHistory);

    const matches = [];
    console.log(idsToFetch)
    for (const [index, [matchId, matchData]] of idsToFetch.entries()) {
      setStatus(`loading ${index + 1} of ${idsToFetch.length}`);

      const matchDto = await Client.fetchMatchData(matchId);
      console.log(matchDto);

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
    console.log(puuid, matchHistoryIds);

    const wins = [];
    for (const match of matchHistoryIds) {
      const player = match.getPlayer(puuid);
      if (player.placement === 1) {
        wins.push(match);
      }
    }

    console.log(wins);
    return wins;
  }
}

export default DataManager;
