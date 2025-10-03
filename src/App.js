import "./App.css";

import { ClientApi } from "./api/clientApi.js";
import Tracker from "./react/components/tracker/Tracker.js";

import { createContext, useEffect, useState } from "react";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);
  const [summoner, setSummoner] = useState(null);

  const gameName = "TannerennaT";
  const tagLine = "na1";

  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await ClientApi.fetchAugmentData();
      const itemData = await ClientApi.fetchItemData();
      const account = await ClientApi.fetchRiotAccount(gameName, tagLine);
      const summoner = await ClientApi.fetchSummoner(account.puuid);

      setSummoner(summoner);
      setAugments(augmentData.augments);
      setItems(itemData.data);
    };
    fetchData();
  }, []);

  return (
    <AugmentContext.Provider value={augments}>
      <ItemContext.Provider value={items}>
        <div className="App">{summoner && <Tracker summoner={summoner} />}</div>
      </ItemContext.Provider>
    </AugmentContext.Provider>
  );
}

export default App;
