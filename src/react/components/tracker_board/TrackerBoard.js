import { useState, useEffect } from "react";
import Tracker from "../tracker/Tracker";
import { ClientApi } from "../../../api/clientApi";

import "./TrackerBoard.css";
class TrackerInfo {
  constructor(
    { gameName, tagLine, puuid },
    { summonerLevel, profileIconId },
    matchIds
  ) {
    console.log(gameName)
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
    this.level = summonerLevel;
    this.iconId = profileIconId;
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


        const summoner = await ClientApi.fetchSummoner(riotAccount.puuid);
        const matchIds = await ClientApi.fetchMatchHistory(riotAccount.puuid);

        console.log(matchIds)

        trackerInfo = new TrackerInfo(
          riotAccount,
          summoner,
          matchIds
        );

        console.log(trackerInfo)

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
