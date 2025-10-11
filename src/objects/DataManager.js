import Summoner from "objects/Summoner";
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
}

export default DataManager;
