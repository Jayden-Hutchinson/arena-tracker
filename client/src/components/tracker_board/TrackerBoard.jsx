import { useEffect } from "react";
import { useState } from "react";

import { storageController } from "../../controllers/StorageController";
import Tracker from "../tracker/Tracker";
import TrackedAccounts from "../tracked_accounts/TrackedAccounts";

function TrackerBoard() {
  const [riotAccounts, setRiotAccounts] = useState(
    storageController.riotAccounts,
  );

  useEffect(() => {
    const unsubscribe = storageController.subscribe(setRiotAccounts);
    return unsubscribe;
  }, [riotAccounts]); // add trackers as dependency if it can change

  return (
    <div className="relative flex size-full bg-neutral-900">
      <TrackedAccounts {...riotAccounts} />
      <div className="flex w-full justify-center p-10">
        {riotAccounts &&
          Object.entries(riotAccounts).map(([puuid, riotAccount]) => {
            return <Tracker key={puuid} {...riotAccount} />;
          })}
      </div>
    </div>
  );
}
export default TrackerBoard;
