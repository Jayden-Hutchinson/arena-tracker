import MatchHistory from "./MatchHistory";

class Summoner {
  constructor(accountDto, summonerDto, matchHistory) {
    this.account = accountDto;
    this.info = summonerDto
    this.matchHistory = new MatchHistory(matchHistory);
  }
}

export default Summoner;
