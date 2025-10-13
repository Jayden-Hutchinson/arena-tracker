import Match from "./Match";
class Summoner {
  constructor(accountDto, summonerDto, matchHistoryIds) {
    console.log(accountDto, summonerDto);
    this.puuid = accountDto.puuid;
    this.gameName = accountDto.gameName;
    this.tagLine = accountDto.tagLine;

    this.profileIconId = summonerDto.profileIconId;
    this.summonerLevel = summonerDto.summonerLevel;

    this.matchHistory = {};
    for (const matchId of matchHistoryIds) {
      const match = new Match(matchId);
      this.matchHistory[matchId] = match;
    }
  }
}

export default Summoner;
