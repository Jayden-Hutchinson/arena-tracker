import "./App.css";

import { ClientApi } from "./api/clientApi.js";
import Tracker from "./react/components/tracker/Tracker.js";

import { createContext, useEffect, useState } from "react";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

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

      try {
        const riotAccount = await ClientApi.fetchRiotAccount(gameName, tagLine);
        const summoner = await ClientApi.fetchSummoner(riotAccount.puuid,);
        const matches = await ClientApi.fetchMatchHistory(riotAccount.puuid,);
        const account = {
          gameName: riotAccount.gameName,
          puuid: riotAccount.puuid,
          profileIconId: summoner.profileIconId,
          summonerLevel: summoner.summonerLevel,
          matchHistory: matches,
        };

        console.log("Tracker Account:", account);
        setAccount(account); // save it to state
        setAugments(augmentData.augments);
        setItems(itemData.data);
      } catch (error) {
        console.log(error);
      }
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
