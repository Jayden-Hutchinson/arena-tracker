import { useEffect } from "react";
import { useState } from "react";

import Tracker from "../tracker/Tracker";
import { storageController } from "../../controllers/StorageController";

function TrackerBoard() {
  const [riotAccounts, setRiotAccounts] = useState(
    storageController.riotAccounts,
  );

  useEffect(() => {
    const unsubscribe = storageController.subscribe(setRiotAccounts);
    return unsubscribe;
  }, []);

  return (
    <div id="TrackerBoard" className="flex size-full justify-center">
      {riotAccounts &&
        Object.entries(riotAccounts).map(([puuid, riotAccount]) => {
          return <Tracker key={puuid} {...riotAccount} />;
        })}
    </div>
  );
}
export default TrackerBoard;
