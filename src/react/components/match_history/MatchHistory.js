import "./MatchHistory.css";
import { useEffect, useState } from "react";

import Match from "../match/Match.js";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistory({ puuid, matchHistory = [] }) {
  const [status, setStatus] = useState(null);
  const [matchHistoryData, setMatchHistoryData] = useState([]);
  const [loadedMatches, setLoadedMatches] = useState(0);
  // const wins = matchHistory.filter((data) => {
  //   const player = data.info.participants.find(
  //     (player) => player.puuid === puuid
  //   );
  //   return player.placement === 1;
  // });
  const handleLoadMore = () => {};

  useEffect(() => {
    async function fetchMatchData() {
      if (matchHistory.length === 0) {
        return;
      }

      const data = [];
      const startTime = Date.now();
      for (const [index, matchId] of matchHistory.entries()) {
        setStatus(`Loading ${matchHistory.length} matches: ${index + 1}`);
        const start = Date.now();
        const matchData = await ClientApi.fetchMatchData(matchId);
        const fetchDuration = Date.now() - start;
        const totalTime = (Date.now() - startTime) / 1000;
        console.log(
          `Match Request ${index}: ${fetchDuration}ms, Total Time: ${totalTime.toFixed(
            2
          )}s`
        );

        if (matchData) {
          const player = matchData.info.participants.find(
            (player) => player.puuid === puuid
          );

          if (player.placement === 1) {
            data.push(matchData);
            setMatchHistoryData(data);
          }
          setLoadedMatches((prev) => prev++);
        }
        const sleepDuration = 1200 - fetchDuration;
        await sleep(sleepDuration);
      }

      const grouped = data.reduce((acc, matchData) => {
        const player = matchData.info.participants.find(
          (player) => player.puuid === puuid
        );
        const key = player.championName;
        if (!acc[key]) {
          acc[key] = [];
        }
        console.log(key);
        acc[key].push(matchData);
        return acc;
      }, {});

      const oldestWinsPerChamp = [];
      for (const champion in grouped) {
        oldestWinsPerChamp.push(
          grouped[champion].reduce((oldest, current) => {
            return current.info.gameCreation < oldest.info.gameCreation
              ? current
              : oldest;
          })
        );
      }

      setMatchHistoryData(oldestWinsPerChamp);
    }
    fetchMatchData();
  }, [matchHistory]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="MatchHistory">
      <div>{`Won with ${matchHistoryData.length} Champions`}</div>
      <div>{status}</div>
      {matchHistoryData && matchHistoryData.length > 0 ? (
        matchHistoryData.map((matchData, index) => {
          return <Match key={index} puuid={puuid} matchData={matchData} />;
        })
      ) : (
        <p>{status}</p>
      )}
      <div>Load More</div>
    </div>
  );
}

export default MatchHistory;
