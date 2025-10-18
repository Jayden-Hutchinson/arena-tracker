export class Player {
  constructor({
    riotIdGameName,
    championName,
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
    placement,
    playerSubteamId,
  }) {
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

    this.kda = {
      kills: kills,
      deaths: deaths,
      assists: assists,
    };

    this.damageDealt = totalDamageDealtToChampions;
    this.placement = placement;
    this.playerSubteamId = playerSubteamId;
  }
}
