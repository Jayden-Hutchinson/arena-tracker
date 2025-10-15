import { useState, useEffect } from "react";

import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistory from "components/match_history/MatchHistory";

import { processMatchHistory } from "utils/utils";

import "./Tracker.css";
import { DDRAGON } from "api/ddragon";
import StorageManager from "objects/StorageManager";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  console.log(summoner);
  const [status, setStatus] = useState();

  useEffect(() => {
    async function getMatches() {
      // const matches = await DataManager.getMatchHistoryData(
      //   summoner.puuid,
      //   summoner.matchHistory,
      //   setStatus
      // );
      // summoner.matchHistory.data = matches;
      // console.log(account);
      // localStorage.setItem(
      //   `${account.gameName}#${account.tagLine}`,
      //   JSON.stringify(account)
      // );
    }

    getMatches();
  }, []);

  return (
    <div className="Tracker">
      {summoner && (
        <>
          <SummonerProfile summoner={summoner} />
          <TrackerControls />
          {/* <MatchHistory puuid={summoner.puuid} matchHistory={matchHistory} /> */}
          {status}
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
