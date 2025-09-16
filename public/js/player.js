export class Player {
  constructor(gameName, championName, kills, deaths, assists, augments, items) {
    this.gameName = gameName;
    this.championName = championName;
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.augments = augments;
    this.items = items;
  }
}
