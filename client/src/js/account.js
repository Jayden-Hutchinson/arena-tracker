export class Account {
  constructor({ gameName, puuid, tagLine }, matchHistory) {
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
    this.icon = null;

    this.level = 0;
    this.arenaWins = 0;
    this.arenaGamesPlayed = 0;
    this.matchHistory = matchHistory;
  }
}
