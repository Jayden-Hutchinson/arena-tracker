import ChampionPortrait from "components/champion_portrait/ChampionPortrait";
import Augment from "components/augment/Augment";
import Item from "components/item/Item";
import DamageDealtToChampions from "components/damageDealtToChampions/DamageDealtToChampions";

import "./ScoreCard.css";

function ScoreCard({ player, dipslayName = true }) {
  console.log(player);
  return (
    <div className="ScoreCard">
      <ChampionPortrait championName={player.championName} />
      <div className="player-names">
        {dipslayName && <div className="game-name">{player.gameName}</div>}

        <div className="champion-name">{player.championName}</div>
      </div>

      <div className="augments">
        {player.augments &&
          player.augments.map((augmentId, index) => {
            return <Augment key={augmentId} augmentId={augmentId} />;
          })}
      </div>

      <div className="items">
        {player.items &&
          player.items.map((itemId, index) => {
            return <Item key={index} itemId={itemId} />;
          })}
      </div>

      <div className="kda">
        {player.kills}/{player.deaths}/{player.assists}
      </div>
      {/* <Items items={player.items} /> */}
      {/* <Kda kda={player.kda} /> */}
      <DamageDealtToChampions damage={player.damageDealt} />
    </div>
  );
}
export default ScoreCard;
