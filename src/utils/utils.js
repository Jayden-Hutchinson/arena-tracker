import Match from "objects/Match";
import { Client } from "api/client";

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

export async function getSummonerData(account) {
  const accountDto = await Client.fetchAccount(
    account.gameName,
    account.tagLine
  );
  const summonerDto = await Client.fetchSummoner(accountDto.puuid);
  const matchHistory = await Client.fetchMatchHistory(accountDto.puuid);
  return { accountDto, summonerDto, matchHistory };
}
