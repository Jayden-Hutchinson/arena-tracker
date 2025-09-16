import { Api } from "./api.js";
import { Account } from "./account.js";
import { UI } from "./ui.js";
import { Player } from "./player.js";

const CONTAINER = "container";
const DIV = "div";
const MATCH_HISTORY_TITLE = "match-history-title";

class Main {
  constructor() {}

  async run() {
    console.log("Running app");
    const cachedMatches = localStorage.getItem("matches") || "{}";

    const augments = await fetch(
      "https://raw.communitydragon.org/latest/cdragon/arena/en_us.json"
    ).then((res) => res.json());

    const account = await this.createAccount("TannerennaT", "NA1");

    console.log(account);
    const container = document.getElementById(CONTAINER);
    const matchHistoryUI = UI.createMatchHistory();
    container.appendChild(matchHistoryUI);

    const matchHistoryTitle = document.createElement(DIV);
    matchHistoryTitle.className = MATCH_HISTORY_TITLE;
    matchHistoryTitle.textContent = account.gameName;
    matchHistoryUI.appendChild(matchHistoryTitle);

    const wonMatches = [];
    for (const match of account.matchHistory) {
      const matchData = await Api.fetchMatch(match);
      const playerPuuidList = matchData.metadata.participants;
      const players = matchData.info.participants;

      const playerIndex = playerPuuidList.indexOf(account.puuid);
      const playerStats = players[playerIndex];

      if (playerStats.placement === 1) {
        wonMatches.push(matchData);

        const winningTeam = players
          .filter(
            (player) => player.playerSubteamId === playerStats.playerSubteamId
          )
          .sort((a, b) =>
            a.puuid === playerStats.puuid
              ? -1
              : b.puuid === playerStats.puuid
              ? 1
              : 0
          );

        const winningPlayers = [];
        for (const player of winningTeam) {
          const augmentIdList = [];
          const itemIdList = [];
          player.augments = [];
          player.items = [];
          console.log("player", player);

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

        console.log(winningPlayers);

        const matchUI = UI.createMatch(match, winningPlayers);
        matchHistoryUI.appendChild(matchUI);
      }
    }
  }

  async createAccount(username, tagline) {
    const storedAccounts = localStorage.getItem("accounts") || "{}";
    console.log(storedAccounts);

    const riotAccount = await Api.fetchRiotAccount(username, tagline);
    const matchHistory = await Api.fetchMatchHistory(riotAccount.puuid);

    const account = new Account(riotAccount, matchHistory);
    return account;
  }
}

new Main().run();
