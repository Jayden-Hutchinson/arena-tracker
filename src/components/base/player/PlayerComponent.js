import ChampionPortrait from "components/parts/champion_portrait/ChampionPortrait";
import Augment from "components/parts/augment/Augment";
import Item from "components/parts/item/Item";
import DamageDealtToChampions from "components/parts/damageDealtToChampions/DamageDealtToChampions";

import "./PlayerComponent.css";

function PlayerComponent({ player, dipslayName = true }) {
  return (
    <div className="PlayerComponent">
      <ChampionPortrait championName={player.championName} />
      <div className="player-names">
        {dipslayName && <div className="game-name">{player.gameName}</div>}

        <div className="champion-name">{player.championName}</div>
      </div>

      <div className="augments">
        {player.augments &&
          player.augments.map((augmentId, index) => {
            return <Augment key={index} augmentId={augmentId} />;
          })}
      </div>

      <div className="items">
        {player.items &&
          player.items.map((itemId, index) => {
            return <Item key={index} itemId={itemId} />;
          })}
      </div>

      <div>
        {player.kills}/{player.deaths}/{player.assists}
      </div>
      {/* <Items items={player.items} /> */}
      {/* <Kda kda={player.kda} /> */}
      <DamageDealtToChampions damage={player.damageDealt} />
    </div>
  );
}
export default PlayerComponent;
