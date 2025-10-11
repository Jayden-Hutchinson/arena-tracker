import { Client } from "api/client";

import Match from "objects/Match";

export async function processMatchHistory(matchHistory, setStatus) {
  const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
  const idsToFetch = savedWins.length > 0 ? savedWins : matchHistory;
  const matches = [];

  for (const [index, matchId] of idsToFetch.entries()) {
    setStatus(`loading ${index + 1} of ${idsToFetch.length}`);
    const matchDto = await Client.fetchMatchData(matchId);
    const match = new Match(matchDto);
    matches.push(match);
  }

  setStatus(null);
  return matches;
}

export function getPlacements(matches, puuid) {
  const placements = {};

  matches.map((match, index) => {
    const player = match.getPlayer(puuid);
    const key = player.placement;

    if (placements[key] == undefined) {
      placements[key] = [];
    }

    placements[key].push(match);
  });

  return placements;
}

export async function getSummonerData(account) {
}
