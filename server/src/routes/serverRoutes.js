const version = "15.19.1";
export const SERVER_ROUTES = {
  RIOT_API: {
    ACCOUNT_BY_NAME:
      "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/",
    SUMMONER_BY_PUUID:
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/",
    MATCHES_BY_PUUID:
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
    MATCH_BY_ID: "https://americas.api.riotgames.com/lol/match/v5/matches/",
  },
  DDRAGON: {
    JSON_DATA: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/`,
  },
};
