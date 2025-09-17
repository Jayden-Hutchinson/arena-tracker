import { Api } from "../api/api.js";
import { AccountManager } from "./manager/accountManager.js";
import { UI } from "./ui.js";
import { Player } from "./player.js";

const CONTAINER = "container";
const DIV = "div";
const MATCH_HISTORY_TITLE = "match-history-title";

class Main {
  constructor() {
    this.accountManager = new AccountManager();
  }

  async createAccount(username, tagLine) {
    console.log(matchHistory);
  }

  async run() {
    console.log("app running...");
    const cachedMatches = localStorage.getItem("matches") || "{}";

    console.log("fetching augment data...");
    const augments = await fetch(
      "https://raw.communitydragon.org/latest/cdragon/arena/en_us.json"
    ).then((res) => res.json());

    const username = "Ginger Comando";
    const tagLine = "na1";

    const riotAccount = await Api.fetchRiotAccount(username, tagLine);
    const matchHistory = await Api.fetchMatches(riotAccount.puuid);
    console.log("MATCH HISTORY", matchHistory);

    const account = this.accountManager.createAccount(
      riotAccount,
      matchHistory
    );

    console.log(account);

    const container = document.getElementById(CONTAINER);
    const matchHistoryUI = UI.createMatchHistory();
    container.appendChild(matchHistoryUI);

    const matchHistoryTitle = document.createElement(DIV);
    matchHistoryTitle.className = MATCH_HISTORY_TITLE;
    matchHistoryTitle.textContent = account.gameName;
    matchHistoryUI.appendChild(matchHistoryTitle);

    const wonMatches = [];
    console.log(account.matchHistory);

    for (const match of account.matchHistory) {
      // console.log(match);
      // const playerPuuidList = match.metadata.participants;
      // const players = match.info.participants;
      // const playerIndex = playerPuuidList.indexOf(account.puuid);
      // const playerStats = players[playerIndex];
      // if (playerStats.placement === 1) {
      //   wonMatches.push(match);

      //   const winningTeam = players
      //     .filter(
      //       (player) => player.playerSubteamId === playerStats.playerSubteamId
      //     )
      //     .sort((a, b) =>
      //       a.puuid === playerStats.puuid
      //         ? -1
      //         : b.puuid === playerStats.puuid
      //         ? 1
      //         : 0
      //     );
      // }
      return;

      const winningPlayers = [];
      for (const player of winningTeam) {
        const augmentIdList = [];
        const itemIdList = [];
        player.augments = [];
        player.items = [];

        for (let i = 1; i <= 6; i++) {
          augmentIdList.push(player[`playerAugment${i}`]);
        }

        for (const augmentId of augmentIdList) {
          const augment = augments.augments.find((a) => a.id === augmentId);
          player.augments.push(augment);
        }

        for (let i = 0; i < 6; i++) {
          itemIdList.push(player[`item${i}`]);
        }

        winningPlayers.push(
          new Player(
            player.riotIdGameName,
            player.championName,
            player.kills,
            player.deaths,
            player.assists,
            player.augments,
            itemIdList
          )
        );
      }

      const matchUI = UI.createMatch(winningPlayers);
      matchHistoryUI.appendChild(matchUI);
    }
  }
}

new Main().run();
