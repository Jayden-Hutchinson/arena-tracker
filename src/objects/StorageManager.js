
import Match from "./Match";

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

  static saveDummyAccount() {
    localStorage.setItem(
      "Accounts",
      JSON.stringify([
        new Account(
          "bhCte-xYzDzNtuF7Qx6DsjHdLPI9zJpJkg-77kL4V4w6Jxcg2FKtg__UpBfW2rtM-fkyEAK1FDMXfA",
          "TannerennaT",
          "NA1"
        ),
      ])
    );
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
