import { ClientApi } from "./api/clientApi.js";
import "./App.css";
import Tracker from "./react/components/tracker/Tracker.js";

import { createContext, useContext, useEffect, useState } from "react";

const AugmentContext = createContext(null);

function App() {
  const [augments, setAugments] = useState(null);

  useEffect(() => {
    async function fetchAugments() {
      const augmentData = await ClientApi.fetchAugmentData();
      setAugments(augmentData);
    }

    fetchAugments();
  }, []);
  console.log(augments);

  return (
    <div className="App">
      <Tracker />
    </div>
  );
}

export default App;
