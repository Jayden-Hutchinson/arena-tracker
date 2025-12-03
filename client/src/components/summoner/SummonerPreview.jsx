import { storageController } from "../../controllers/StorageController";
import SummonerIconSmall from "./SummonerIconSmall";
import SummonerName from "./SummonerName";

function SummonerPreview(riotAccount) {
  const { gameName, tagLine, profileIconId, summonerLevel } = riotAccount;

  const handleSave = () => {
    const saveState = {};
    saveState[riotAccount.puuid] = riotAccount;

    const riotAccounts = storageController.saveRiotAccount(riotAccount);
    if (!riotAccounts) {
      return;
    }

    storageController.setRiotAccounts(riotAccounts);
  };

  return (
    <div
      className="flex w-full p-5 gap-8 items-center bg-black/30 rounded cursor-pointer hover:bg-black/40"
      onClick={handleSave}
    >
      <SummonerIconSmall id={profileIconId} level={summonerLevel} />
      <SummonerName gameName={gameName} tagLine={tagLine} />
    </div>
  );
}

export default SummonerPreview;
