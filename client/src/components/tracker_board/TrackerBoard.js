import { useEffect, useState } from "react";

import Summoner from "objects/Summoner";

import Tracker from "components/tracker/Tracker";
import { getSummonerData } from "utils/utils";
// import TrackerSearch from "components/tracker_search/TrackerSearch";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);

  const accounts = [{ gameName: "TannerennaT", tagLine: "NA1" }];

  useEffect(() => {
    const fetchSummoners = async () => {
      const summoners = [];
      for (const account of accounts) {
        const data = await getSummonerData(account.gameName, account.tagLine);

        const summoner = new Summoner(
          data.accountDto,
          data.summonerDto,
          data.matchHistory,
        );

        summoners.push(summoner);
        console.log("Summoner Added:", summoner)
      }
      setSummoners(summoners);
    };

    fetchSummoners();
  });

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
