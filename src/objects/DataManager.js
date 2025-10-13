import Summoner from "objects/Summoner";

import Match from "./Match";
import MatchHistory from "./MatchHistory";

import { Client } from "api/client";

class DataManager {
  static async getSummonerData(account, setStatus) {
    const key = `${account.gameName}#${account.tagLine}`;
    let summoner = JSON.parse(localStorage.getItem(key));

    if (!summoner) {
      setStatus("Creating new summoner");
      setStatus("Fetching Account:", account.gameName, account.tagLine);
      const accountDto = await Client.fetchAccount(
        account.gameName,
        account.tagLine
      );

      setStatus("Fetching Summoner:", account.puuid);
      const summonerDto = await Client.fetchSummoner(accountDto.puuid);
      setStatus("Fetching Match History:", account.puuid);
      const matchHistoryIds = await Client.fetchMatchHistory(accountDto.puuid);

      const matchHistory = new MatchHistory(matchHistoryIds);
      summoner = new Summoner(accountDto, summonerDto, matchHistory);

      localStorage.setItem(key, JSON.stringify(summoner));
    }

    return summoner;
  }

  static async getMatchHistoryData(puuid, matchHistory, setStatus) {
    const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
    const idsToFetch = savedWins.length > 0 ? savedWins : matchHistory.ids;

    const matches = [];
    for (const [index, matchId] of idsToFetch.entries()) {
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
