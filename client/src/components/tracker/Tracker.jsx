import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";
import { storageController } from "../../controllers/StorageController";

function Tracker(riotAccount) {
  const handleDelete = (event) => {
    const riotAccounts = storageController.deleteRiotAccount(riotAccount);
    storageController.setRiotAccounts(riotAccounts);
  };

  return (
    <div className="relative flex w-2xl min-w-xl flex-col border-2 border-amber-500/30 bg-cyan-950/35 p-5">
      <Summoner {...riotAccount} />
      <Matches puuid={riotAccount.puuid} />
      <button
        className="absolute top-0.5 right-0.5 flex size-8 cursor-pointer items-center justify-center text-xl font-bold text-amber-500/30 hover:text-amber-500/40"
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}

export default Tracker;
