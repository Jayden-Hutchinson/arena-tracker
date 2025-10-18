class Summoner {
  constructor(accountDto, summonerDto, matchHistory) {
    this.puuid = accountDto.puuid;
    this.gameName = accountDto.gameName;
    this.tagLine = accountDto.tagLine;

    this.profileIconId = summonerDto.profileIconId;
    this.summonerLevel = summonerDto.summonerLevel;

    this.matchHistory = { all: matchHistory };
    console.log(this.matchHistory.all);
  }
}

export default Summoner;
