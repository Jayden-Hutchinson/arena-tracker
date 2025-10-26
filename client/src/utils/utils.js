import { ClientApi } from "api/clientApi";

export function getPlacements(matches, puuid) {
  const placements = {};

  matches.map((match, index) => {
    const player = match.getPlayer(puuid);
    const key = player.placement;

    if (placements[key] === undefined) {
      placements[key] = [];
    }

    placements[key].push(match);
  });

  return placements;
}

export async function getSummonerData(gameName, tagLine) {
  const accountDto = await ClientApi.fetchRiotAccountByGameName(
    gameName,
    tagLine,
  );

  const summonerDto = await ClientApi.fetchRiotSummonerByPuuid(
    accountDto.puuid,
  );

  const matchHistory = await ClientApi.fetchRiotMatchHistoryByPuuid(
    accountDto.puuid,
  );
  return { accountDto, summonerDto, matchHistory };
}
