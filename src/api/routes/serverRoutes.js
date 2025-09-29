export const SERVER_ROUTES = {
  ACCOUNT_BY_GAME_NAME: (gameName = null, tagLine = null) =>
    gameName || tagLine
      ? `/account?gameName=${gameName}&tagLine=${tagLine}`
      : "/account",
  SUMMONER_BY_PUUID: (puuid = null) =>
    puuid ? `/summoner?puuid=${puuid}` : "/summoner",

  MATCHES_BY_PUUID: (puuid = null) =>
    puuid ? `/account/history?puuid=${puuid}` : "/account/history",
  MATCH_BY_ID: (id = null) =>
    id ? `/match/data?matchId=${id}` : "/match/data",
  JSON_DATA: (item = null) => (item ? `/data/json${item}` : "/data/json"),
};
