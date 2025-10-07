import { useState, useEffect } from "react";
import Tracker from "../tracker/Tracker";
import { ClientApi } from "../../../api/clientApi";

import "./TrackerBoard.css";
class TrackerInfo {
  constructor(gameName, puuid, tagLine, level, iconId, matchIds) {
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
    this.level = level;
    this.iconId = iconId;
    this.matchIds = matchIds;
  }
}

function TrackerBoard() {
  const [trackers, setTrackers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const accounts = [{ gameName: "Ginger Comando", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      for (const account of accounts) {
        const riotAccount = await ClientApi.fetchRiotAccount(
          account.gameName,
          account.tagLine
        );

        let trackerInfo =
          JSON.parse(localStorage.getItem(riotAccount.puuid)) || null;

        if (!trackerInfo) {
          const summoner = await ClientApi.fetchSummoner(riotAccount.puuid);
          const matchIds = await ClientApi.fetchMatchHistory(riotAccount.puuid);

          trackerInfo = new TrackerInfo(
            riotAccount.gameName,
            riotAccount.puuid,
            riotAccount.tagLine,
            summoner.summonerLevel,
            summoner.profileIconId,
            matchIds
          );
          localStorage.setItem(trackerInfo.puuid, JSON.stringify(trackerInfo));
        }
        setTrackers((prev) => [...prev, trackerInfo]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="TrackerBoard">
      {trackers.map((trackerInfo, index) => (
        <Tracker key={index} trackerInfo={trackerInfo} />
      ))}
    </div>
  );
}
export default TrackerBoard;
