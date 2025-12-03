import { useEffect } from "react";
import { useState } from "react";

import Tracker from "../tracker/Tracker";

function TrackerBoard({ trackedRiotAccounts }) {
  console.log("Tracker Board Loaded with", trackedRiotAccounts);
  const [riotAccounts, setRiotAccounts] = useState([]);

  const deleteRiotAccount = (event) => {};

  useEffect(() => {
    const fetchAccounts = async () => {
      if (trackedRiotAccounts) {
        setRiotAccounts(trackedRiotAccounts);
        return;
      }
    };

    fetchAccounts();
  }, [trackedRiotAccounts]); // add trackers as dependency if it can change

  return (
    <div className="flex gap-5 justify-center w-full">
      {Object.entries(trackedRiotAccounts).map(([puuid, riotAccount]) => {
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
