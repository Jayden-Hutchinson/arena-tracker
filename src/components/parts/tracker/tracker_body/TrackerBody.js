import { useEffect, useState } from "react";

import { processMatchHistory } from "utils/utils";

import MatchCard from "components/base/match_card/MatchCard";

import "./TrackerBody.css";
function TrackerBody({ puuid, matchHistory }) {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    async function fetchData() {
      const matchData = await processMatchHistory(matchHistory, setStatus);
      setMatches(matchData);

    }
    fetchData();
  }, []);

  return (
    <div className="TrackerBody">
      <div>{status}</div>
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
    </div>
  );
}
export default TrackerBody;
