export class Player {
  constructor({
    championName,
    riotIdGameName,
    playerAugment1,
    playerAugment2,
    playerAugment3,
    playerAugment4,
    playerAugment5,
    playerAugment6,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    kills,
    deaths,
    assists,
    totalDamageDealtToChampions,
  }) {
    console.log(championName);
    this.championName = championName;
    this.gameName = riotIdGameName;
    this.augments = [
      playerAugment1,
      playerAugment2,
      playerAugment3,
      playerAugment4,
      playerAugment5,
      playerAugment6,
    ];
    this.items = [item0, item1, item2, item3, item4, item5];
    this.kills = kills;
    this.deaths = deaths;
    this.assists = assists;
    this.damageDealt = totalDamageDealtToChampions;
  }
}
