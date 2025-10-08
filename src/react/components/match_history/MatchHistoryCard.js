import "./MatchHistoryCard.css";

import MatchCard from "../match_card/MatchCard.js";
import Match from "../../../objects/Match.js";

import { useEffect, useState } from "react";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistoryCard({ puuid, matchHistory }) {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    async function getMatchIds() {
      const savedWins = JSON.parse(localStorage.getItem("wins")) || [];
      const idsToFetch = savedWins.length > 0 ? savedWins : matchHistory;

      for (const [index, matchId] of idsToFetch.entries()) {
        setStatus(`Loading: ${index} / ${idsToFetch.length}`);
        const matchDto = await ClientApi.fetchMatchData(matchId);
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
          console.log(match);
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
