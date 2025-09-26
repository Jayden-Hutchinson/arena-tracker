import { ClientApi } from "./api/clientApi.js";
import "./App.css";
import Tracker from "./react/components/tracker/Tracker.js";

import { createContext, useEffect, useState } from "react";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [augmentData, itemData] = await Promise.all([
        ClientApi.fetchAugmentData(),
        ClientApi.fetchItemData(),
      ]);
      setAugments(augmentData.augments);
      setItems(itemData.data);
    }

    fetchData();
  }, []);

  return (
    <AugmentContext.Provider value={augments}>
      <ItemContext.Provider value={items}>
        <div className="App">
          <Tracker />
        </div>
      </ItemContext.Provider>
    </AugmentContext.Provider>
  );
}

export default App;
