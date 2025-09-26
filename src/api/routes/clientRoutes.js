export const URL = {
  ACCOUNT_BY_GAME_NAME: "/account",
  SUMMONER_BY_PUUID: "/summoner",
  MATCH_HISTORY_BY_PUUID: "/acount/history",
  MATCH_BY_ID: "/match/data",
  JSON_DATA: "/data/json",
};

export const CLIENT_ROUTES = {
  SERVER: {
    ACCOUNT_BY_GAME_NAME: (gameName, tagLine) =>
      `${URL.ACCOUNT_BY_GAME_NAME}?gameName=${gameName}&tagLine=${tagLine}`,

    SUMMONER_BY_PUUID: (puuid) => `${URL.SUMMONER_BY_PUUID}?puuid=${puuid}`,

    MATCH_HISTORY_BY_PUUID: (puuid) =>
      `${URL.MATCH_HISTORY_BY_PUUID}?puuid=${puuid}`,

    MATCH_BY_ID: (id) => `${URL.MATCH_BY_ID}?matchId=${id}`,

    JSON_DATA: (item) => `${URL.JSON_DATA}${item}`,
  },
};
