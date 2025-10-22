
export const URL = {
  account: (gameName = null, tagLine = null) =>
    gameName || tagLine
      ? `/account?gameName=${encodeURIComponent(gameName)}&tagLine=${tagLine}`
      : "/account",
  summoner: (puuid = null) =>
    puuid ? `/summoner?puuid=${puuid}` : "/summoner",

  matches: (puuid = null) =>
    puuid ? `/account/history?puuid=${puuid}` : "/account/history",
  match: (id = null) => (id ? `/match/data?matchId=${id}` : "/match/data"),
  data: (item = null) => (item ? `/data/json${item}` : "/data/json"),
};
