import { useState, useEffect } from "react";

import Tracker from "components/tracker/Tracker";
import TrackerSearch from "components/tracker_search/TrackerSearch";

import DataManager from "objects/DataManager";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState({});
  const [status, setStatus] = useState();

  localStorage.setItem(
    "accounts",
    JSON.stringify([{ gameName: "TannerennaT", tagLine: "NA1" }])
  );

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  function addAccount(account) {
    if (!accounts.includes(account)) {
      accounts.push(account);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const summoners = {};
      if (!accounts) {
        console.log("no saved accounts");
        return;
      }

      for (const account of accounts) {
        const summoner = await DataManager.getSummonerData(account, setStatus);
        summoners[summoner.puuid] = summoner;
        console.log(summoner);
      }
      setSummoners(summoners);
    };
    fetchData();
  }, []);

  return (
    <div className="TrackerBoard">
      {status}
      {summoners &&
        Object.entries(summoners).map(([puuid, summoner]) => (
          <Tracker key={puuid} summoner={summoner} />
        ))}
      <TrackerSearch callback={addAccount} />
    </div>
  );
}
export default TrackerBoard;
