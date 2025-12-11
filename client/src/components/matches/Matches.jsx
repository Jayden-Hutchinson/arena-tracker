import { useEffect, useState } from "react";

import Match from "../match/Match";
import { delay } from "../../utils/utils";
import ServerClient from "../../api/server_api/ServerClient";

function Matches({ puuid }) {
  const [matches, setMatches] = useState([]);
  const [loadMessage, setLoadMessage] = useState("");

  // Augment URL
  // https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/augments.json

  useEffect(() => {
    const fetchMatches = async () => {};

    const fetchMatchData = async () => {
      const matchIds = await ServerClient.fetchMatches(puuid);
      if (!matchIds) {
        setLoadMessage("Error getting matches");
        return;
      }
      setLoadMessage("Got Matches");

      const matches = await loadMatches(20, matchIds);

      console.debug(matches);
      // var loadCount = 0;
      // for (const matchId of matchIds) {
      //   setLoadMessage(`loading matches ${loadCount++}/${matchIds.length}`);
      //   await delay(100);

      //   const loadedMatches = loadMatches(10, matchIds);
      //   const match = await ServerClient.fetchMatch(matchId);
      //   if (match.message) {
      //     console.log(match);
      //     setLoadMessage(match.message);
      //     continue;
      //   }

      //   matches.push(match);
      // }
      setMatches(matches);
    };

    fetchMatches();
    fetchMatchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {matches ? (
        matches.map((match) => <Match puuid={puuid} match={match} />)
      ) : (
        <div className="p-10">{loadMessage}</div>
      )}
    </div>
  );
}

async function loadMatches(numMatches, matchIds) {
  console.log(matchIds);
  const matches = [];
  for (var i = 0; i < numMatches; i++) {
    const matchId = matchIds[i];
    const match = await ServerClient.fetchMatch(matchId);
    console.log(match);
    matches.push(match);
    delay(500);
  }
  return matches;
}

export default Matches;
