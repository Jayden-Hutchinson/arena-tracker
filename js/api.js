import { RIOT, API_KEY } from "./config.js";

export async function fetchSummoner(name) {
  const url = `https://${RIOT.REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${RIOT.TAG}?api_key=${API_KEY}`;
  return await fetch(url).then((res) => res.json());
}

export async function fetchMatchHistory(puuid) {
  const cachedMatches = JSON.parse(localStorage.getItem("matches") || "{}");

  console.log(cachedMatches);

  const matchIdByPuuid = `https://${RIOT.MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${RIOT.ARENA_SEASON_START}&queue=${RIOT.ARENA_QUEUE_ID}&count=20&api_key=${API_KEY}`;
  const matchIdList = await fetch(matchIdByPuuid).then((res) => res.json());

  const matches = [];

  for (const matchId of matchIdList) {
    if (cachedMatches[matchId]) {
      matches.push(cachedMatches[matchId]);
      continue;
    }

    const matchDataUrl = `https://${RIOT.MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
    const match = await fetch(matchDataUrl).then((res) => res.json());
    matches.push(match);
    cachedMatches[matchId] = match;

    console.log(match);
    await new Promise((res) => setTimeout(res, 50));
  }

  localStorage.setItem("matches", JSON.stringify(cachedMatches));
  return matches;
}

export async function fetchAugments() {
  const augmentsUrl =
    "https://raw.communitydragon.org/latest/cdragon/arena/en_us.json";

  const augments = await fetch(augmentsUrl).then((res) => res.json());
  return augments;
}

export async function fetchItems() {
  const itemsUrl =
    "https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/item.json";
  const items = await fetch(itemsUrl).then((res) => res.json());
  return items;
}
