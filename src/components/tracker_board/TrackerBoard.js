import { useEffect, useState } from "react";
import { Client } from "api/client";

import StorageManager from "objects/StorageManager";
import Summoner from "objects/Summoner";

import Tracker from "components/tracker/Tracker";
import TrackerSearch from "components/tracker_search/TrackerSearch";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);

  StorageManager.saveDummyAccount();
  const accounts = StorageManager.getAccounts();

  useEffect(() => {
    const fetchSummoners = async () => {
      const summoners = [];
      for (const account of accounts) {
        const summonerDto = await Client.fetchSummoner(account.puuid);
        const matchHistory = await Client.fetchMatchHistory(account.puuid);

        const summoner = new Summoner(account, summonerDto, matchHistory);
        summoners.push(summoner);
      }
      setSummoners(summoners);
    };

    fetchSummoners();
  }, []);

  return (
    <div className="mt-20 pt-10">
      {summoners &&
        summoners.map((summoner) => {
          return <Tracker key={summoner.puuid} summoner={summoner} />;
        })}
      {/* <TrackerSearch callback={accountManager.addAccount} /> */}
    </div>
  );
}
export default TrackerBoard;
