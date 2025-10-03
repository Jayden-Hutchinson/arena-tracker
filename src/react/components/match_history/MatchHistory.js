import "./MatchHistory.css";

import Match from "../match/Match.js";
import { useEffect, useState } from "react";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistory({ puuid }) {
  const [matchIds, setMatchIds] = useState();
  useEffect(() => {
    async function getMatchIds() {
      const matchIds = await ClientApi.fetchMatchHistory(puuid);
      setMatchIds(matchIds);
    }
    getMatchIds();
  });
  return (
    <div className="MatchHistory">
      {matchIds &&
        matchIds.map((matchId, index) => {
          return <Match key={index} puuid={puuid} matchData={matchId} />;
        })}
    </div>
  );
}

export default MatchHistory;
