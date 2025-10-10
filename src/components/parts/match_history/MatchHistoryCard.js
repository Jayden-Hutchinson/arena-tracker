import { useEffect, useState } from "react";

import { Client } from "api/client.js";

import Match from "objects/Match.js";

import MatchCard from "components/base/match_card/MatchCard.js";

import "./MatchHistoryCard.css";

function MatchHistoryCard({ puuid, matchHistory }) {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {

    async function getMatchIds() {
      const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
      const idsToFetch = savedWins.length > 0 ? savedWins : matchHistory;

      for (const [index, matchId] of idsToFetch.entries()) {
        setStatus(`Loading: ${index} / ${idsToFetch.length}`);
        const matchDto = await Client.fetchMatchData(matchId);
        const match = new Match(matchDto);
        setMatches((prev) => [...prev, match]);
      }
    }
    getMatchIds();
  }, []);

  return (
    <ul className="MatchHistory">
      {matches &&
        matches.map((match) => {
          return (
            <MatchCard
              key={match.metadata.matchId}
              puuid={puuid}
              match={match}
            />
          );
        })}
    </ul>
  );
}

export default MatchHistoryCard;
