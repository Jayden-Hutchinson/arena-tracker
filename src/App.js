import "./App.css";

import { createContext, useEffect, useState } from "react";

import { Client } from "api/client.js";
import Navbar from "components/base/navbar/Navbar.js";
import TrackerBoard from "components/base/tracker_board/TrackerBoard";
import Summoner from "objects/Summoner";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);
  const [summoners, setSummoners] = useState({});

  const accounts = [{ gameName: "TannerennaT", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await Client.fetchAugmentData();
      const itemData = await Client.fetchItemData();
      setAugments(augmentData.augments);
      setItems(itemData.data);

      for (const account of accounts) {
        const accountDTO = await Client.fetchAccount(
          account.gameName,
          account.tagLine
        );
        const summonerDTO = await Client.fetchSummoner(accountDTO.puuid);
        const matchHistory = await Client.fetchMatchHistory(accountDTO.puuid);

        const summoner = new Summoner(accountDTO, summonerDTO, matchHistory);

        setSummoners((prev) => ({
          ...prev,
          [summoner.puuid]: summoner,
        }));
      }
    };
    fetchData();
  }, []);

  return (
    <AugmentContext.Provider value={augments}>
      <ItemContext.Provider value={items}>
        <div className="App">
          <Navbar />
          <TrackerBoard summoners={summoners} />
        </div>
      </ItemContext.Provider>
    </AugmentContext.Provider>
  );
}

export default App;
