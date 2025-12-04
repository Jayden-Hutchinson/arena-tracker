import { useEffect } from "react";
import { useState } from "react";

import { storageController } from "../../controllers/StorageController";
import Tracker from "../tracker/Tracker";

function TrackerBoard() {
  const [riotAccounts, setRiotAccounts] = useState(
    storageController.riotAccounts
  );

  useEffect(() => {
    const unsubscribe = storageController.subscribe(setRiotAccounts);
    return unsubscribe;
  }, [riotAccounts]); // add trackers as dependency if it can change

  return (
    <div className="flex gap-5 justify-center w-full">
      {riotAccounts &&
        Object.entries(riotAccounts).map(([puuid, riotAccount]) => {
          return <Tracker key={puuid} {...riotAccount} />;
        })}
    </div>
  );
}
export default TrackerBoard;
