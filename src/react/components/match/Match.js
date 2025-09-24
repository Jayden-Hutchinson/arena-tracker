import "./Match.css";
import { CDRAGON_ROUTES } from "../../../api/routes/cdragon_routes.js";
import { DDRAGON } from "../../../api/routes/ddragon_routes.js";
import { ClientApi } from "../../../api/clientApi.js";

function Match({ puuid, data }) {
  const playerList = data.info.participants;

  const playerIndex = getPlayerIndex(playerList, puuid);
  const player = playerList[playerIndex];

  const augmentIdLIst = [
    player.playerAugment1,
    player.playerAugment2,
    player.playerAugment3,
    player.playerAugment4,
    player.playerAugment5,
    player.playerAugment6,
  ];

  console.log(augments);

  return (
    <li className="Match">
      <img
        className="champion-portrait"
        src={`${DDRAGON.IMG}${player.championName}.png`}
        alt={player.championName}
      />
      <div className="game-names">
        <div>{player.riotIdGameName}</div>
        <div>{player.championName}</div>
      </div>
      <div className="augments">
        <img
          src={`${CDRAGON_ROUTES.AUGMENT_IMG}${player.playerAugment1}.png`}
          alt="augment"
        />
        <div>Augment</div>
        <div>Augment</div>
        <div>Augment</div>
        <div>Augment</div>
        <div>Augment</div>
      </div>
      <div className="items">
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
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
