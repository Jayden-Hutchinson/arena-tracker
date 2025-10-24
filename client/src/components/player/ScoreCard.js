import ChampionPortrait from "components/champion_portrait/ChampionPortrait";
// import PlayerNames from "components/player_names/PlayerNames";
import Augments from "components/augments/Augments";
import Items from "components/items/Items";
import Kda from "components/kda/Kda";
import DamageDealt from "components/damage_dealt/DamageDealt";

import "./ScoreCard.css";

function ScoreCard({ player, showDetails = true }) {
  return (
    <div className="ScoreCard">
      <div className="flex items-center justify-start">
        <ChampionPortrait championName={player.championName} />
        <div className="w-[150px] text-sm text-gray-400">
          {player.championName}
        </div>
        {/* <PlayerNames
          gameName={player.gameName}
          championName={player.championName}
        /> */}
      </div>
      {/* <Champion championName={player.championName} /> */}
      <Augments augments={player.augments} />
      <Items items={player.items} />
      <Kda kda={player.kda} />
      <DamageDealt damage={player.damageDealt} />
    </div>
  );
}
export default ScoreCard;
