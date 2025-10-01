import "./MatchHistory.css";
import { useEffect, useState } from "react";

import Match from "../match/Match.js";
import { ClientApi } from "../../../api/clientApi.js";

function MatchHistory({ puuid, matchIds }) {
  const [matches, setMatches] = useState([]);
  const [matchLoadCount, setMatchLoadCount] = useState(0);

  useEffect(() => {
    async function fetchMatchData() {
      if (matchIds.length === 0) {
        return;
      }

      const matches = [];
      for (const matchId of matchIds) {
        const start = Date.now();
        const match = await ClientApi.fetchMatchData(matchId);
        const fetchDuration = Date.now() - start;

        if (match && isWin(match)) {
          matches.push(match);
          setMatches(matches);
        }

        setMatchLoadCount((prev) => prev++);
        const sleepDuration = 1200 - fetchDuration;
        await sleep(sleepDuration);
      }

      const grouped = matches.reduce((acc, matchData) => {
        const player = matchData.info.participants.find(
          (player) => player.puuid === puuid
        );
        const championName = player.championName;
        if (!acc[championName]) {
          acc[championName] = [];
        }
        acc[championName].push(matchData);
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

      setMatches(oldestWinsPerChamp);
    }
    fetchMatchData();
  }, [matchIds]);

  function isWin(match) {
    const player = match.info.participants.find(
      (player) => player.puuid === puuid
    );
    return player.placement === 1;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="MatchHistory">
      <div>{`Won with ${matches.length} Champions`}</div>
      {matches &&
        matches.map((matchData, index) => {
          console.log(index, matchData);
          return <Match key={index} puuid={puuid} matchData={matchData} />;
        })}
      <div>
        loading match {matchLoadCount} of {matchIds.length}
      </div>
    </div>
  );
}

export default MatchHistory;
