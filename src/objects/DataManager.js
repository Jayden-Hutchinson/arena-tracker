import Summoner from "objects/Summoner";
import Match from "./Match";

import { Client } from "api/client";

class DataManager {
  static async getSummonerData(account) {
    const key = `${account.gameName}#${account.tagLine}`;

    let summoner = JSON.parse(localStorage.getItem(key));

    if (!summoner) {
      const accountDto = await Client.fetchAccount(
        account.gameName,
        account.tagLine
      );
      const summonerDto = await Client.fetchSummoner(accountDto.puuid);
      const matchHistory = await Client.fetchMatchHistory(accountDto.puuid);

      console.log(accountDto);
      summoner = new Summoner(accountDto, summonerDto, matchHistory);

      localStorage.setItem(key, JSON.stringify(summoner));
    }

    return summoner;
  }
  static async getMatches(matchHistory, setStatus) {
    const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
    const idsToFetch = savedWins.length > 0 ? savedWins : matchHistory;
    const matches = [];

    for (const [index, matchId] of idsToFetch.entries()) {
      setStatus(`loading ${index + 1} of ${idsToFetch.length}`);
      const matchDto = await Client.fetchMatchData(matchId);
      const match = new Match(matchDto);
      matches.push(match);
    }

    setStatus(null);
    return matches;
  }

  static async processWins(puuid, matches) {
    console.log(puuid, matches);
    const wins = [];
    for (const match of matches) {
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
