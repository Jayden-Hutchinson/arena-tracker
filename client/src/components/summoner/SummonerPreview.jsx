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
      className="flex w-fit cursor-pointer items-center justify-center gap-5 border border-amber-500/30 bg-black/30 px-8 py-3 hover:bg-black/60"
      onClick={handleSave}
    >
      <SummonerIconSmall id={profileIconId} level={summonerLevel} />
      <SummonerNameSmall gameName={gameName} tagLine={tagLine} />
      <div>
        <div className="text-xs text-neutral-400">level</div>
        <div className="text-sm text-amber-400">{summonerLevel}</div>
      </div>
    </div>
  );
}

export default SummonerPreview;
