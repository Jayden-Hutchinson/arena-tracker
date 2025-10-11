import "./MatchHistory.css";

import Match from "objects/Match";
import { useEffect, useState } from "react";
import { ClientApi } from "../../../api/clientApi.js";
import { processMatchHistory } from "utils/utils";

function MatchHistory({ puuid, matchHistory }) {
  const [matches, setMatches] = useState([]);
  const [wins, setWins] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    async function getMatchIds() {
      setLoading(true);
      const wins = JSON.parse(localStorage.getItem("wins")) || [];
      const idsToFetch = wins.length > 0 ? wins : matchIdList;

      console.log(wins);
      console.log(idsToFetch);

      const matches = await processMatchHistory(matchHistory);
      for (const [index, id] of idsToFetch.entries()) {
        setStatus(`Loading: ${index} / ${idsToFetch.length}`);
        // const fetchStart = Date.now();
        const matchData = await ClientApi.fetchMatchData(id);
        // await sleep(200);

        // const fetchDuration = Date.now() - fetchStart;
        // const sleepMs = 1200 - fetchDuration;
        // await sleep(sleepMs);

        const matchInfo = new Match(puuid, matchData);

        if (matchInfo.getPlacement() === 1 && !wins.includes(id)) {
          wins.push(id);
          setWins((prev) => [...prev, matchInfo]);
        }

        setWins((prev) => [...prev, matchInfo]);
        localStorage.setItem("wins", JSON.stringify(wins));
        setMatches((prev) => [...prev, matchInfo]);
      }

      setLoading(false);
      // setWins(wins);
    }
    getMatchIds();
  }, []);

  return (
    <ul className="MatchHistory">
      {loading ? (
        <div>{status}</div>
      ) : (
        matches &&
        wins.map((matchInfo, index) => {
          return <Match key={index} puuid={puuid} matchInfo={matchInfo} />;
        })
      )}
    </ul>
  );
}

export default MatchHistory;
