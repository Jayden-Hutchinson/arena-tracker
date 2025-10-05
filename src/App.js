import "./App.css";

import { createContext, useEffect, useState } from "react";

import { ClientApi } from "./api/clientApi.js";
import Navbar from "./react/components/navbar/Navbar.js";
import TrackerBoard from "./react/components/tracker_board/TrackerBoard.js";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await ClientApi.fetchAugmentData();
      const itemData = await ClientApi.fetchItemData();
      setAugments(augmentData.augments);
      setItems(itemData.data);
    };
    fetchData();
  }, []);

  return (
    <AugmentContext.Provider value={augments}>
      <ItemContext.Provider value={items}>
        <div className="App">
          <Navbar />
          <TrackerBoard />
        </div>
      </ItemContext.Provider>
    </AugmentContext.Provider>
  );
}

export default App;
