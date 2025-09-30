import "./App.css";

import { ClientApi } from "./api/clientApi.js";
import Tracker from "./react/components/tracker/Tracker.js";
import { RiotAccount } from "./react/classes/riot_account/RiotAccount.js";
import { Summoner } from "./react/classes/summoner/Summoner.js";

import { createContext, useEffect, useState } from "react";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState(null);
  const [account, setAccount] = useState(null);

  // Call the api on load
  // !TO REMOVE BEFORE LAUNCH
  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await ClientApi.fetchAugmentData();
      const itemData = await ClientApi.fetchItemData();

      const gameName = "TannerennaT";
      const tagLine = "na1";
      let trackerAccount = JSON.parse(localStorage.getItem(gameName));

      if (!trackerAccount) {
        console.log("no account");
        const riotAccountData = await ClientApi.fetchRiotAccount(
          gameName,
          tagLine
        );

        const riotAccount = new RiotAccount(riotAccountData);

        const summonerData = await ClientApi.fetchSummoner(
          riotAccount.puuid,
          setStatus
        );
        const summoner = new Summoner(summonerData);

        const matchHistory = await ClientApi.fetchMatchHistory(
          riotAccount.puuid,
          setStatus
        );

        trackerAccount = {
          gameName: riotAccount.gameName,
          puuid: riotAccount.puuid,
          profileIconId: summoner.profileIconId,
          summonerLevel: summoner.summonerLevel,
          matchHistory,
        };
      }
      console.log("Tracker Account:", trackerAccount);
      setAccount(trackerAccount); // save it to state
      setAugments(augmentData.augments);
      setItems(itemData.data);
      localStorage.setItem(
        trackerAccount.gameName,
        JSON.stringify(trackerAccount)
      );
    };

    fetchData();
  }, []);

  return (
    <AugmentContext.Provider value={augments}>
      <ItemContext.Provider value={items}>
        <div className="App">{account && <Tracker account={account} />}</div>
      </ItemContext.Provider>
    </AugmentContext.Provider>
  );
}

export default App;
