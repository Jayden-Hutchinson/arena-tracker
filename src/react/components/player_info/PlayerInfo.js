import ChampionPortrait from "../champion_portrait/ChampionPortrait";
import Augments from "../augments/Augments";

import "./PlayerInfo.css";

function PlayerInfo({ player }) {
  console.log(player);
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
  };

  console.log(playerInfo);

  return (
    <div className="PlayerInfo">
      <div>
        <ChampionPortrait championName={playerInfo.championName} />
        <div className="player-names">
          <div className="game-name">{playerInfo.gameName}</div>
          <div className="champion-name">{playerInfo.championName}</div>
        </div>
      </div>

      <Augments augments={player.augments} />
    </div>
  );
}
export default PlayerInfo;
