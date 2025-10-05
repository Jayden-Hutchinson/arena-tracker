import ChampionPortrait from "../champion_portrait/ChampionPortrait";

import "./PlayerInfo.css";

class PlayerData {
  constructor(player) {
    console.log(player);
    this.championName = player.championName;
    this.gameName = player.riotIdGameName;

    this.augments = [
      player.playerAugment1,
      player.playerAugment2,
      player.playerAugment3,
      player.playerAugment4,
      player.playerAugment5,
      player.playerAugment6,
    ];

    this.items = [
      player.item0,
      player.item1,
      player.item2,
      player.item3,
      player.item4,
      player.item5,
    ];

    this.kda = [player.kills, player.deaths, player.assists];

    this.damage = player.damageDealtToChampions;
  }
}

function PlayerInfo({ player }) {
  console.log(player);
  const playerData = new PlayerData(player);
  console.log(playerData);

  return (
    <div className="PlayerInfo">
      <div>
        <ChampionPortrait championName={playerData.championName} />
        <div className="player-names">
          <div className="game-name">{playerData.gameName}</div>
          <div className="champion-name">{playerData.championName}</div>
        </div>
      </div>

      <div>augments</div>
      <div>items</div>
      <div>kda</div>
      <div>damage</div>
      {/* <Augments augments={player.augments} />
      <Items items={player.items} />
      <Kda kda={player.kda} />
      <Damage damage={player.damage} /> */}
    </div>
  );
}
export default PlayerInfo;
