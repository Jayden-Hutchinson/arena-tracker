const express = require('express');
const router = express.Router();

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const matchCache = {};

router.get('/account', async (req, res) => {
  const { username, tagline } = req.query;
  if (!username || !tagline) {
    return res.status(400).json({ error: "username and tagline required" });
  }

  try {
    const uriUsername = encodeURIComponent(username)
    const uriTagline = encodeURIComponent(tagline)
    const accountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${uriUsername}/${uriTagline}`

    const response = await fetch(accountUrl,
      { headers: { "X-Riot-Token": RIOT_API_KEY } }
    );
    console.log(response)


    const data = await response.json();
    console.log(data)

    console.log(accountUrl)
    console.log(data)

    if (!data.puuid) return res.status(404).json({ error: "Account not found" });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch account" });
  }
});

// router.get('/matches/:puuid', async (req, res) => {
//   const { puuid } = req.params;

//   // Check cache
//   const cached = matchCache[puuid];
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return res.json(cached.data);
//   }

//   try {
//     const response = await fetch(
//       `${MATCH_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
//       { headers: { "X-Riot-Token": RIOT_API_KEY } }
//     );
//     const data = await response.json();

//     // Store in cache
//     matchCache[puuid] = { data, timestamp: Date.now() };

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch matches" });
//   }
// });

module.exports = router;// import { RIOT } from "./config.js";

// export async function fetchSummoner(name) {
//   const url = `https://${RIOT.REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${RIOT.TAG}?api_key=${API_KEY}`;
//   return await fetch(url).then((res) => res.json());
// }

// export async function fetchMatchHistory(puuid) {
//   const cachedMatches = JSON.parse(localStorage.getItem("matches") || "{}");

//   console.log(cachedMatches);

//   const matchIdByPuuid = `https://${RIOT.MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${RIOT.ARENA_SEASON_START}&queue=${RIOT.ARENA_QUEUE_ID}&count=20&api_key=${API_KEY}`;
//   const matchIdList = await fetch(matchIdByPuuid).then((res) => res.json());

//   const matches = [];

//   for (const matchId of matchIdList) {
//     if (cachedMatches[matchId]) {
//       matches.push(cachedMatches[matchId]);
//       continue;
//     }

//     const matchDataUrl = `https://${RIOT.MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;
//     const match = await fetch(matchDataUrl).then((res) => res.json());
//     matches.push(match);
//     cachedMatches[matchId] = match;

//     console.log(match);
//     await new Promise((res) => setTimeout(res, 50));
//   }

//   localStorage.setItem("matches", JSON.stringify(cachedMatches));
//   return matches;
// }

// export async function fetchAugments() {
//   const augmentsUrl =
//     "https://raw.communitydragon.org/latest/cdragon/arena/en_us.json";

//   const augments = await fetch(augmentsUrl).then((res) => res.json());
//   return augments;
// }

// export async function fetchItems() {
//   const itemsUrl =
//     "https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/item.json";
//   const items = await fetch(itemsUrl).then((res) => res.json());
//   return items;
// }
