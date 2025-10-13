import { useState, useEffect } from "react";

import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistory from "components/match_history/MatchHistory";

import { processMatchHistory } from "utils/utils";

import "./Tracker.css";
import { DDRAGON } from "api/ddragon";
import DataManager from "objects/DataManager";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  const [showDetails, setShowDetails] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]);
  const [status, setStatus] = useState();
  const [champions, setChampions] = useState();

  useEffect(() => {
    async function getMatches() {
      const matches = await DataManager.getMatchHistoryData(
        summoner.puuid,
        summoner.matchHistory,
        setStatus
      );
      summoner.matchHistory.data = matches;
      console.log(summoner);

      localStorage.setItem(
        `${summoner.gameName}#${summoner.tagLine}`,
        JSON.stringify(summoner)
      );

      // const wins = await DataManager.processWins(summoner.puuid, matches);

      setMatchHistory(summoner.matchHistory);

      const champions = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json"
      ).then((res) => res.json());
      setChampions(champions.data);
    }

    getMatches();
  }, []);

  return matchHistory ? (
    <div className="Tracker">
      <SummonerProfile summoner={summoner} />
      <TrackerControls setShowDetails={setShowDetails} />
      <MatchHistory puuid={summoner.puuid} matchHistory={matchHistory} />
      {status}

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
  ) : (
    <div>{status}</div>
  );
}

export default Tracker;
