import ChampionPortrait from "components/champion_portrait/ChampionPortrait";
import PlayerNames from "components/player_names/PlayerNames";
import Augments from "components/augments/Augments";
import Items from "components/items/Items";
import Kda from "components/kda/Kda";
import DamageDealt from "components/damage_dealt/DamageDealt";

import "./ScoreCard.css";

function ScoreCard({ player, showDetails = true }) {
  console.log(player);
  return (
    <div className="ScoreCard">
      <div>
        <ChampionPortrait championName={player.championName} />
        <PlayerNames
          gameName={player.gameName}
          championName={player.championName}
        />
      </div>
      <Augments augments={player.augments} />
      <Items items={player.items} />
      <Kda kda={player.kda} />
      <DamageDealt damage={player.damageDealt} />
    </div>
  );
}
export default ScoreCard;
