import { useEffect } from "react";
import { useState } from "react";

import Tracker from "../tracker/Tracker";
import { storageController } from "../../controllers/StorageController";

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
          console.log(riotAccount);
          return <Tracker key={puuid} {...riotAccount} />;
        })}
      {/* {riotAccounts &&
        riotAccounts.map((riotAccount) => {
          return <Tracker key={riotAccount.puuid} {...riotAccount} />;
        })} */}
    </div>
  );
}
export default TrackerBoard;
