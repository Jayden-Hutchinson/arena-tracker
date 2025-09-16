import { COMMUNITY_DRAGON, DDRAGON } from "./config.js";
const IMG = "img";
const DIV = "div";
const UL = "ul";
const LI = "li";

const MATCH_HISTORY = "match-history";
const MATCH = "match";
const TEAM_INFO = "team-info";
const PLAYER_INFO = "player-info";
const NAMES = "names";
const AUGMENTS = "augments";
const AUGMENT = "augment";
const PLAYER_NAME = "player-name";
const PLAYER_KDA = "player-kda";
const CHAMPION_NAME = "champion-name";
const CHAMPION_IMAGE = "champion-image";

export class UI {
  static createMatch(match, teamPlayers) {
    const element = document.createElement(LI);
    element.className = MATCH;

    for (const player of teamPlayers) {
      const playerInfo = document.createElement(DIV);
      playerInfo.className = PLAYER_INFO;

      const playerName = document.createElement(DIV);
      playerName.className = PLAYER_NAME;
      playerName.textContent = player.gameName;

      const playerKDA = document.createElement(DIV);
      playerKDA.className = PLAYER_KDA;
      playerKDA.textContent = `${player.kills}/${player.deaths}/${player.assists}`;

      const championName = document.createElement(DIV);
      championName.className = CHAMPION_NAME;
      championName.textContent = player.championName;

      const championImage = document.createElement(IMG);
      championImage.className = CHAMPION_IMAGE;
      championImage.src = `${DDRAGON.IMG}${player.championName}.png`;
      championImage.alt = championName;

      const names = document.createElement(DIV);
      names.className = NAMES;

      names.appendChild(playerName);
      names.appendChild(championName);
      names.appendChild(playerKDA);

      playerInfo.appendChild(championImage);
      playerInfo.appendChild(names);

      const augmentGrid = document.createElement(DIV);
      augmentGrid.className = AUGMENTS;

      const itemGrid = document.createElement(DIV);
      itemGrid.className = AUGMENTS;

      for (const augment of player.augments) {
        if (augment) {
          const augmentImage = document.createElement(IMG);
          augmentImage.className = AUGMENT;
          augmentImage.src = `${
            COMMUNITY_DRAGON.AUGMENT_IMG
          }${augment.apiName.toLowerCase()}_large.png`;
          augmentGrid.appendChild(augmentImage);
        }
      }

      for (const item of player.items) {
        if (item) {
          const itemImage = document.createElement(IMG);

          itemImage.className = AUGMENT;
          itemImage.src = `https://ddragon.leagueoflegends.com/cdn/15.18.1/img/item/${item}.png`;
          itemGrid.appendChild(itemImage);
        }
      }

      playerInfo.appendChild(augmentGrid);
      playerInfo.appendChild(itemGrid);
      element.appendChild(playerInfo);
    }

    // const startTimeStamp = match.info.gameStartTimestamp;
    // const startTimeDate = new Date(startTimeStamp);
    // const date = document.createElement(DIV);
    // date.textContent = startTimeDate.toLocaleString("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: true,
    // });

    // element.appendChild(date);
    return element;
  }

  static createMatchHistory(playerName) {
    const element = document.createElement(UL);
    element.className = MATCH_HISTORY;
    return element;
  }

  static createDate(time) {
    const element = document.createElement(DIV);
    const date = new Date(time);

    element.textContent = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return element;
  }
}
