import { useEffect, useState } from "react";

import Match from "../match/Match";
import ServerClient from "../../api/server_api/ServerClient";

function Matches({ puuid }) {
  const [matches, setMatches] = useState(null);
  const [loadMessage, setLoadMessage] = useState("");

  // Augment URL
  // https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/augments.json

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchMatches = async () => {};

    const fetchMatchData = async () => {
      const matchIds = await ServerClient.fetchMatches(puuid);
      console.log(matchIds);

      if (matchIds.message) {
        setLoadMessage(matchIds.message);
        console.log(matchIds.message, matchIds.status_code);
        return;
      }

      for (const matchId of matchIds) {
        setLoadMessage(`loading matches ${loadCount++}/${matchIds.length}`);
        await delay(100);

        const match = await ServerClient.fetchMatch(matchId);
        if (match.message) {
          console.log(match);
          setLoadMessage(match.message);
          continue;
        }

        matches.push(match);
      }
      setMatches(matches);
    };

    fetchMatches();
    fetchMatchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {matches ? (
        matches.map((match) => <Match puuid={puuid} match={match} />)
      ) : (
        <div className="flex items-center h-20 p-5">{loadMessage}</div>
      )}
    </div>
  );
}

export default Matches;
