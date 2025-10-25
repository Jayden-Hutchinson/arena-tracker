import { useEffect, useState } from "react";
import { ClientApi } from "api/clientApi";

import Summoner from "objects/Summoner";

import Tracker from "components/tracker/Tracker";
// import TrackerSearch from "components/tracker_search/TrackerSearch";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);
  const accounts = [{ gameName: "TannerennaT", tagLine: "NA1" }];

  useEffect(() => {
    const fetchSummoners = async () => {
      const summoners = [];
      for (const account of accounts) {
        const accountDto = await ClientApi.fetchRiotAccountByGameName(
          account.gameName,
          account.tagLine,
        );

        if (!accountDto) {
          console.log("No Account Found")
          return
        }

        const summonerDto = await ClientApi.fetchRiotSummonerByPuuid(
          accountDto.puuid,
        );

        if (!summonerDto) {
          console.log("No Summoner Found")
          return
        }

        const matchHistory = await ClientApi.fetchRiotMatchHistoryByPuuid(
          accountDto.puuid,
        );

        if (!matchHistory) {
          console.log("No Match History Found")
          return
        }

        const summoner = new Summoner(accountDto, summonerDto, matchHistory);
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
