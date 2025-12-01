import { useEffect } from "react";
import Tracker from "./components/tracker/Tracker";
import TrackerForm from "./components/tracker/TrackerForm";
import ServerClient from "./api/server_api/ServerClient";
import { useState } from "react";

function App() {

  const [riotAccounts, setRiotAccounts] = useState([]);
  localStorage.setItem("Trackers", JSON.stringify([{ gameName: "Ginger Comando", tagLine: "na1" }, { gameName: "TannerennaT", tagLine: "na1" }]))

  const trackers = JSON.parse(localStorage.getItem("Trackers"));

  useEffect(() => {
    const fetchAccounts = async () => {
      // Map to promises
      const promises = trackers.map(({ gameName, tagLine }) =>
        ServerClient.fetchRiotAccount(gameName, tagLine)
      );

      const riotAccounts = await Promise.all(promises);

      setRiotAccounts(riotAccounts);
    };

    fetchAccounts();
  }, [trackers]); // add trackers as dependency if it can change

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
