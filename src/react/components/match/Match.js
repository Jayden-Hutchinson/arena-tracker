import "./Match.css";
import { CDRAGON } from "../../../api/cdragon.js";
import { AugmentContext, ItemContext } from "../../../App.js";
import { useContext } from "react";
import { DDRAGON } from "../../../api/ddragon.js";

function Match({ puuid, data }) {
  const augments = useContext(AugmentContext);
  const items = useContext(ItemContext);

  const playerList = data.info.participants;
  const player = playerList.find((player) => player.puuid == puuid);

  const augmentIdList = [
    player.playerAugment1,
    player.playerAugment2,
    player.playerAugment3,
    player.playerAugment4,
    player.playerAugment5,
    player.playerAugment6,
  ];

  const itemIdList = [
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
    player.item6,
  ];

  const playerAugments = augmentIdList.map((id) =>
    augments.find((augment) => augment.id == id)
  );

  const playerItems = itemIdList.map((id) => items[id]);

  return (
    <li className="Match">
      <img
        className="champion-portrait"
        src={DDRAGON.CHAMPION_IMAGE(player.championName)}
        alt={player.championName}
      />
      <div className="game-names">
        <div>{player.riotIdGameName}</div>
        <div>{player.championName}</div>
      </div>
      <div className="augments">
        {playerAugments &&
          playerAugments.map((augment) =>
            augment?.iconLarge ? (
              <img
                className="augment-img"
                src={CDRAGON.AUGMENT_IMAGE(augment.iconLarge)}
                alt={augment.apiName}
              />
            ) : (
              ""
            )
          )}
      </div>
      <div className="items">
        {playerItems &&
          playerItems.map((item) =>
            item?.icon ? (
              <img
                className="augment-img"
                src={DDRAGON.ITEM_IMAGE(item.icon)}
                alt={item.apiName}
              />
            ) : (
              ""
            )
          )}
      </div>
      <div>{`${player.kills}/${player.deaths}/${player.assists}`}</div>
      <div>Damage</div>
      {/* <Player />
      <Player />
      <ChampionStats />
      <Augments />
      <Items />
      <DamageDealt /> */}
    </li>
  );
}
function getPlayerIndex(players, puuid) {
  return players.findIndex((player) => player.puuid === puuid);
}
export default Match;
