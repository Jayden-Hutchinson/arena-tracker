import ChampionPortrait from "../champion_portrait/ChampionPortrait";
import Augment from "../augment/Augment";

import "./Player.css";

class PlayerData {
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
    this.damage = totalDamageDealtToChampions;
  }
}

function Player({ player }) {
  const playerData = new PlayerData(player);

  return (
    <div className="Player">
      <ChampionPortrait championName={playerData.championName} />
      <div className="player-names">
        <div className="game-name">{playerData.gameName}</div>
        <div className="champion-name">{playerData.championName}</div>
      </div>

      <div>augments</div>
      <div>items</div>
      <div>{playerData.kda.kills}</div>
      <div>{playerData.damage}</div>
      {player.augments &&
        player.augments.map((augment, index) => {
          <Augment key={index} augment={augment} />;
        })}
      {/* <Items items={player.items} /> */}
      {/* <Kda kda={player.kda} /> */}
      {/* <Damage damage={player.damage} /> */}
    </div>
  );
}
export default Player;
