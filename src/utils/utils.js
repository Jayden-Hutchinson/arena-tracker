import { Client } from "api/client";

import Match from "objects/Match";


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
