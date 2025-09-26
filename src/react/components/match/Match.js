import "./Match.css";
import { CDRAGON } from "../../../api/cdragon.js";
import { AugmentContext, ItemContext } from "../../../App.js";
import { useContext } from "react";
import { DDRAGON } from "../../../api/ddragon.js";

const ARENA_TEAMS = {
  100: { name: "Krug", icon: "krug.png" },
  200: { name: "Gromp", icon: "gromp.png" },
  300: { name: "Scuttle Crab", icon: "scuttle.png" },
  400: { name: "Murk Wolf", icon: "murkwolf.png" },
};

function Match({ team, data }) {
  const augments = useContext(AugmentContext);
  const items = useContext(ItemContext);
  console.log(data);

  console.log(team[0].kills + team[1].kills);
  const teamKills = team[0].kills + team[1].kills;
  const teamDeaths = team[0].deaths + team[1].deaths;
  const teamAssists = team[0].assists + team[1].assists;
  return (
    <li className="Match">
      <div className="match-info">
        <div>Team</div>
        <div>
          {teamKills}/{teamDeaths}/{teamAssists}
        </div>
        <div>total Damage</div>
      </div>

      {team &&
        team.map((player, index) => {
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
            <div key={index} className="player-display">
              <img
                key={player.championName}
                className="champion-portrait"
                src={DDRAGON.CHAMPION_IMAGE(player.championName)}
                alt={player.championName}
              />

              <div className="game-names">
                <strong>{player.riotIdGameName}</strong>
                <div>{player.championName}</div>
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
                      <div className="augment-img"></div>
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
        })}
      {/* <Player />
      <Player />
      <ChampionStats />
      <Augments />
      <Items />
      <DamageDealt /> */}
    </li>
  );
}

export default Match;
