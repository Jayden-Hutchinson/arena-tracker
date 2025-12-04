import { storageController } from "../../controllers/StorageController";
import SummonerIconSmall from "./SummonerIconSmall";
import SummonerNameSmall from "./SummonerNameSmall";

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
      className="flex w-full p-2 gap-5 items-center bg-black/30 rounded cursor-pointer hover:bg-black/60"
      onClick={handleSave}
    >
      <SummonerIconSmall id={profileIconId} level={summonerLevel} />
      <SummonerNameSmall gameName={gameName} tagLine={tagLine} />
    </div>
  );
}

export default SummonerPreview;
