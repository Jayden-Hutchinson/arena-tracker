import { CDRAGON } from "../../../api/cdragon.js";
import { useContext } from "react";
import { AugmentContext, ItemContext } from "../../../App.js";
import { DDRAGON } from "../../../api/ddragon.js";

import "./Player.css";

function Player({ player }) {
  const augments = useContext(AugmentContext);
  const items = useContext(ItemContext);

  const augmentIdList = [
    player.playerAugment1,
    player.playerAugment2,
    player.playerAugment3,
    player.playerAugment4,
    player.playerAugment5,
    player.playerAugment6,
  ];

  const itemIdList = [
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
  ];

  const playerAugments = augmentIdList.map((id) =>
    augments.find((augment) => augment.id == id)
  );

  const playerItems = itemIdList.map((id) => items[id]);

  return (
    <div className="Player">
      {/* 
      <ChampionStats />
      <Augments />
      <Items />
      <DamageDealt /> 
      */}
      <img
        key={player.championName}
        className="champion-portrait"
        src={DDRAGON.CHAMPION_IMAGE(player.championName)}
        alt={player.championName}
      />
      <div className="game-names">
        <div className="game-name">{player.riotIdGameName}</div>
        <div className="champion-name">{player.championName}</div>
      </div>

      <div className="augments">
        {playerAugments &&
          playerAugments.map((augment, index) =>
            augment?.iconLarge ? (
              <img
                key={index}
                className="augment-img"
                src={CDRAGON.AUGMENT_IMAGE(augment.iconLarge)}
                alt={augment.apiName}
              />
            ) : (
              <div key={index} className="augment-img"></div>
            )
          )}
      </div>

      <div className="items">
        {playerItems &&
          playerItems.map((item) =>
            item?.image.full ? (
              <img
                key={item.name}
                className="augment-img"
                src={DDRAGON.ITEM_IMAGE(item.image.full)}
                alt={item.name}
              />
            ) : (
              <div className="augment-img"></div>
            )
          )}
      </div>

      <div>{`${player.kills}/${player.deaths}/${player.assists}`}</div>

      <div>{player.totalDamageDealtToChampions}</div>
    </div>
  );
}
export default Player;
