import "./MatchHistory.css";

import Match from "../match/Match.js";
import { useEffect, useState } from "react";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistory({ puuid, matchHistory }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    async function getMatchIds() {
      for (const id of matchHistory) {
        const matchData = await ClientApi.fetchMatchData(id);
        await sleep(1200);
        setMatches((prev) => [...prev, matchData]);
      }
    }
    getMatchIds();
  }, []);
  return (
    <ul className="MatchHistory">
      {matches &&
        matches.map((matchData, index) => {
          return <Match key={index} puuid={puuid} matchData={matchData} />;
        })}
    </ul>
  );
}

export default MatchHistory;
