export class Player {
  constructor(riotId, championName, kills, deaths, assists, augments, items) {
    this.riotId = riotId;
    this.championName = championName;
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.augments = augments;
    this.items = items;
  }
}
