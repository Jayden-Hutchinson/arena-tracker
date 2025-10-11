import { useState, useEffect } from "react";

import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistory from "components/match_history/MatchHistory";

import { getPlacements } from "utils/utils";
import { processMatchHistory } from "utils/utils";

import "./Tracker.css";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  const [showDetails, setShowDetails] = useState(false);
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState();
  console.log(summoner)

  useEffect(() => {
    async function getMatches() {
      const matches = await processMatchHistory(
        summoner.matchHistory,
        setStatus
      );
      setMatches(matches);
    }
    getMatches();
  }, []);

  return (
    summoner && (
      <div className="Tracker">
        <SummonerProfile summoner={summoner} />
        <TrackerControls setShowDetails={setShowDetails} />
        {matches && <MatchHistory puuid={summoner.puuid} matches={matches} />}
      </div>
    )
  );
}

export default Tracker;
