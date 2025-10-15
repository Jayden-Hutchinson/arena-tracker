import { useState, useEffect } from "react";

import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistory from "components/match_history/MatchHistory";

import "./Tracker.css";
import { Client } from "api/client";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  const [matchHistory, setMatchHistory] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const matchHistory = [];
      for (const matchId of summoner.matchHistory.all) {
        const matchDto = await Client.fetchMatchData(matchId);
        matchHistory.push(matchDto);
      }
      setMatchHistory(matchHistory);
    };
    fetchData();
  });
  console.log(matchHistory);

  return (
    <div className="Tracker">
      {matchHistory && (
        <>
          <SummonerProfile summoner={summoner} />
          <TrackerControls />
          <MatchHistory
            puuid={summoner.puuid}
            matchHistory={summoner.matchHistory}
          />
        </>
      )}

      {/* <div className="champions">
          {champions &&
            Object.entries(champions).map(([id, champion]) => {
              return (
                <img
                  className="remaining-champion"
                  src={DDRAGON.CHAMPION_IMAGE(id)}
                  alt={id}
                />
              );
            })}
        </div> */}
    </div>
  );
}

export default Tracker;
