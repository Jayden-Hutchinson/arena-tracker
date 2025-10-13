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
function Tracker({ account }) {
  const [showDetails, setShowDetails] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]);
  const [status, setStatus] = useState();
  const [champions, setChampions] = useState();
  const [summoner, setSummoner] = useState();

  useEffect(() => {
    async function getMatches() {
      const summoner = await DataManager.getSummonerData(account, setStatus);
      console.log(summoner);
      setSummoner(summoner);

      const matches = await DataManager.getMatchHistoryData(
        summoner.puuid,
        summoner.matchHistory,
        setStatus
      );
      summoner.matchHistory.data = matches;
      console.log(account);

      localStorage.setItem(
        `${account.gameName}#${account.tagLine}`,
        JSON.stringify(account)
      );

      // const wins = await DataManager.processWins(summoner.puuid, matches);

      setMatchHistory(account.matchHistory);

      const champions = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json"
      ).then((res) => res.json());
      setChampions(champions.data);
    }

    getMatches();
  }, []);

  return matchHistory ? (
    <div className="Tracker">
      {summoner && <SummonerProfile summoner={summoner} />}
      <TrackerControls setShowDetails={setShowDetails} />
      <MatchHistory puuid={account.puuid} matchHistory={matchHistory} />
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
