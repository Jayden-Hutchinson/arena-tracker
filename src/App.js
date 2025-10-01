import "./App.css";

import { ClientApi } from "./api/clientApi.js";
import Tracker from "./react/components/tracker/Tracker.js";

import { createContext, useEffect, useState } from "react";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

async function getTrackerData(gameName, tagLine) {
  const account = await ClientApi.fetchRiotAccount(gameName, tagLine);
  const summoner = await ClientApi.fetchSummoner(account.puuid);
  const matchIds = await ClientApi.fetchMatchHistory(account.puuid);

  return {
    gameName: account.gameName,
    puuid: account.puuid,
    profileIconId: summoner.profileIconId,
    summonerLevel: summoner.summonerLevel,
    matchIds: matchIds,
  };
}

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);
  const [account, setAccount] = useState(null);

  // Call the api on load
  // !TO REMOVE BEFORE LAUNCH
  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await ClientApi.fetchAugmentData();
      const itemData = await ClientApi.fetchItemData();

      const gameName = "TannerennaT";
      const tagLine = "na1";

      let account = JSON.parse(localStorage.getItem(gameName));
      if (!account) {
        account = await getTrackerData(gameName, tagLine);
      }

      setAccount(account);
      setAugments(augmentData.augments);
      setItems(itemData.data);

      localStorage.setItem(account.puuid, JSON.stringify(account));
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
