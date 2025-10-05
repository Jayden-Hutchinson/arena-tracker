import ChampionPortrait from "../champion_portrait/ChampionPortrait";
import Augments from "../augments/Augments";

import "./PlayerInfo.css";

function PlayerInfo({ player }) {
  const playerInfo = {
    championName: player.championName,
    gameName: player.riotIdGameName,
    augments: [
      player.playerAugment1,
      player.playerAugment2,
      player.playerAugment3,
      player.playerAugment4,
      player.playerAugment5,
      player.playerAugment6,
    ],

    items: [
      player.item0,
      player.item1,
      player.item2,
      player.item3,
      player.item4,
      player.item5,
    ],
    kda: [player.kills, player.deaths, player.assists],
    damage: player.damageDealtToChampions,
  };

  return (
    <div className="PlayerInfo">
      <div>
        <ChampionPortrait championName={playerInfo.championName} />
        <div className="player-names">
          <div className="game-name">{playerInfo.gameName}</div>
          <div className="champion-name">{playerInfo.championName}</div>
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
