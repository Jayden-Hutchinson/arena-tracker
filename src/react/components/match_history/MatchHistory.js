import "./MatchHistory.css";
import { useEffect, useState } from "react";

import Match from "../match/Match.js";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistory({ account }) {
  const [status, setStatus] = useState(null);
  const [matchHistoryData, setMatchHistoryData] = useState([]);
  const [loadedMatches, setLoadedMatches] = useState(0);

  useEffect(() => {
    async function fetchMatchData() {
      if (account.matchHistory.length === 0) {
        return;
      }

      const data = [];
      const startTime = Date.now();
      let index = 0;

      for (const matchId of Object.keys(account.matchHistory)) {
        index++;

        if (!account.matchHistory[matchId]) {
          setStatus(`Loading ${account.matchHistory.length} matches: ${index}`);

          const start = Date.now();
          const matchData = await ClientApi.fetchMatchData(matchId);

          const fetchDuration = Date.now() - start;
          const totalTime = (Date.now() - startTime) / 1000;
          console.log(
            `Match Request ${index}: ${fetchDuration}ms, Total Time: ${totalTime.toFixed(
              2
            )}s`
          );
          account.matchHistory[matchId] = matchData;
          if (matchData) {
            const player = matchData.info.participants.find(
              (player) => player.puuid === account.puuid
            );

            if (player.placement === 1) {
              data.push(matchData);
              setMatchHistoryData(data);
            }
            setLoadedMatches((prev) => prev++);
            localStorage.setItem(account.gameName, JSON.stringify(account));
          }
          const sleepDuration = 1200 - fetchDuration;
          await sleep(sleepDuration);
        }
      }

      const grouped = data.reduce((acc, matchData) => {
        const player = matchData.info.participants.find(
          (player) => player.puuid === account.puuid
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
  }, [account.matchHistory]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="MatchHistory">
      <div>{`Won with ${matchHistoryData.length} Champions`}</div>
      <div>{status}</div>
      {matchHistoryData && matchHistoryData.length > 0 ? (
        matchHistoryData.map((matchData, index) => {
          return <Match key={index} account={account} matchData={matchData} />;
        })
      ) : (
        <p>{status}</p>
      )}
      <div>Load More</div>
    </div>
  );
}

export default MatchHistory;
