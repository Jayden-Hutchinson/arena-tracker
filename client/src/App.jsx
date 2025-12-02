import { useEffect } from "react";
import { useState } from "react";

import Tracker from "./components/tracker/Tracker";
import TrackerForm from "./components/tracker/TrackerForm";

import ServerClient from "./api/server_api/ServerClient";

import Save from "./utils/Save";
import Load from "./utils/Load";

function App() {
  const [riotAccounts, setRiotAccounts] = useState([]);

  const trackedRiotAccounts = Load.trackedRiotAccounts();
  // const trackedRiotAccounts = [{ gameName: "Ginger Comando", tagLine: "na1" }];
  console.log("tracked riot accounts loaded", trackedRiotAccounts);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (trackedRiotAccounts) {
        setRiotAccounts(trackedRiotAccounts);
        return;
      }

      const promises = trackedRiotAccounts.map(({ gameName, tagLine }) => {
        console.log("fetching riot account", gameName, tagLine);
        return ServerClient.fetchRiotAccount(gameName, tagLine);
      });

      const riotAccounts = await Promise.all(promises);
      console.log("fetched riot accounts", riotAccounts);

      if (!riotAccounts) {
        setRiotAccounts(trackedRiotAccounts);
        return;
      }

      Save.trackedRiotAccounts(riotAccounts);
      console.log("saved riot accounts", riotAccounts);

      riotAccounts.map(Save.riotAccount);

      setRiotAccounts(riotAccounts);
    };

    fetchAccounts();
  }, [trackedRiotAccounts]); // add trackers as dependency if it can change

  return (
    <div className="flex flex-col items-center">
      <TrackerForm />

      <div className="flex gap-5 justify-center w-full">
        {riotAccounts.map((riotAccount) => {
          return <Tracker key={riotAccount.puuid} {...riotAccount} />;
        })}
      </div>
    </div>
  );
}

export default App;
