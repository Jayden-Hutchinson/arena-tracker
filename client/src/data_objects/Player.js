class Player {
  constructor(gameData) {
    Object.assign(this, gameData);

    this.items = [
      gameData.item0,
      gameData.item1,
      gameData.item2,
      gameData.item3,
      gameData.item4,
      gameData.item5,
    ];

    this.augments = [
      gameData.playerAugment1,
      gameData.playerAugment2,
      gameData.playerAugment3,
      gameData.playerAugment4,
      gameData.playerAugment5,
      gameData.playerAugment6,
    ];
  }
}

export default Player;
