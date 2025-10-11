import "./App.css";

import { createContext, useEffect, useState } from "react";

import { Client } from "api/client.js";
import Navbar from "components/navbar/Navbar.js";
import TrackerBoard from "components/tracker_board/TrackerBoard";

export const AugmentContext = createContext(null);
export const ItemContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const augmentData = await Client.fetchAugmentData();
      const itemData = await Client.fetchItemData();
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
