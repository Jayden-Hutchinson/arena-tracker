export const SERVER_ROUTES = {
  ACCOUNT_BY_GAME_NAME: (gameName, tagLine) =>
    `/api/account/ids?gameName=${gameName}&tagLine=${tagLine}`,
  ACCOUNT_BY_PUUID: (puuid) => `/api/account/ids?puuid=${puuid}`,
  SUMMONER_BY_PUUID: (puuid) => `/api/summoner/ids?puuid=${puuid}`,
  MATCH_HISTORY_BY_PUUID: (puuid) => `/api/match-history/ids?puuid=${puuid}`,
  MATCH_BY_ID: (matchId) => `/api/match/ids?matchId=${matchId}`,

  ITEM_DATA: `/api/items`,
  AUGMENT_DATA: `/api/augments`,
};
