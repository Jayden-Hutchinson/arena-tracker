import { useState, useEffect } from "react";

import Tracker from "components/tracker/Tracker";
import TrackerSearch from "components/tracker_search/TrackerSearch";

import DataManager from "objects/DataManager";
import Account from "objects/Account";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState({});
  const [status, setStatus] = useState();

  localStorage.setItem(
    "accounts",
    JSON.stringify([new Account("bhCte-xYzDzNtuF7Qx6DsjHdLPI9zJpJkg-77kL4V4w6Jxcg2FKtg__UpBfW2rtM-fkyEAK1FDMXfA", "TannerennaT", "NA1")])
  );

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  console.log(accounts)

  function addAccount(account) {
    if (!account.includes(account)) {
      accounts.push(account);
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      if (!accounts) {
        return;
      }


      const summoners = {};
      for (const account of accounts) {
        console.log(account)
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
