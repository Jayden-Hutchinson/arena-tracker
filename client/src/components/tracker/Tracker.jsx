import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";
import { storageController } from "../../controllers/StorageController";
import { useState } from "react";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);
  // const [riotAccounts, setRiotAccounts] = useState();

  const handleDelete = (event) => {
    const riotAccounts = storageController.deleteRiotAccount(riotAccount);
    storageController.setRiotAccounts(riotAccounts);
  };

  return (
    <div className="relative flex flex-col min-w-xl w-2xl bg-cyan-950/15 border-2 border-amber-400/30 p-5 rounded-tr-lg">
      <Summoner {...riotAccount} />
      <Matches puuid={riotAccount.puuid} />
      <button
        className="absolute flex items-center justify-center cursor-pointer font-bold -top-1 -right-1 size-7 rounded-full bg-neutral-900 border-2 border-amber-400/30 text-amber-300/30"
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}

export default Tracker;
