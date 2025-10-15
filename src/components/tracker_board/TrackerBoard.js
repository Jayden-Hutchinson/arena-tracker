import Tracker from "components/tracker/Tracker";
import TrackerSearch from "components/tracker_search/TrackerSearch";
import Account from "objects/Account";

import "./TrackerBoard.css";
import StorageManager from "objects/StorageManager";
import { useEffect, useState } from "react";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);

  // FOR TESTING
  localStorage.setItem(
    "Accounts",
    JSON.stringify([
      new Account(
        "bhCte-xYzDzNtuF7Qx6DsjHdLPI9zJpJkg-77kL4V4w6Jxcg2FKtg__UpBfW2rtM-fkyEAK1FDMXfA",
        "TannerennaT",
        "NA1"
      ),
    ])
  );

  useEffect(() => {
    const fetchData = async () => {
      const accounts = await StorageManager.getAccounts();
      const summoners = await StorageManager.getSummonerData(accounts);

      setSummoners(summoners);
    };

    fetchData();
  }, []);

  console.log(summoners);
  return (
    <div className="TrackerBoard">
      {summoners &&
        summoners.map((summoner) => {
          return <Tracker key={summoner.puuid} summoner={summoner} />;
        })}
      {/* <TrackerSearch callback={accountManager.addAccount} /> */}
    </div>
  );
}
export default TrackerBoard;
