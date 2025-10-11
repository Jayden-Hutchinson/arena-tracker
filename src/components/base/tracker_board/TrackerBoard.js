import { useState, useEffect } from "react";

import { getSummonerData } from "utils/utils";

import Tracker from "components/base/tracker/Tracker";

import Summoner from "objects/Summoner";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState({});

  const accounts = [{ gameName: "TannerennaT", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      for (const account of accounts) {
        const key = `${account.gameName}#${account.tagLine}`;

        let summoner = JSON.parse(localStorage.getItem(key));

        if (!summoner) {
          const summonerData = await getSummonerData(account);
          summoner = new Summoner(summonerData);
          localStorage.setItem(key, JSON.stringify(summoner));
        }
        setSummoners((prev) => ({
          ...prev,
          [summoner.puuid]: summoner,
        }));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="TrackerBoard">
      {Object.entries(summoners).map(([puuid, summoner]) => (
        <Tracker key={puuid} summoner={summoner} />
      ))}
    </div>
  );
}
export default TrackerBoard;
