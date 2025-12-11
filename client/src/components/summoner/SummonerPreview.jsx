import { storageController } from "../../controllers/StorageController";
import SummonerIconSmall from "./SummonerIconSmall";
import SummonerNameSmall from "./SummonerNameSmall";

function SummonerPreview(riotAccount) {
  const { gameName, tagLine, profileIconId } = riotAccount;

  function handleSave() {
    storageController.saveRiotAccount(riotAccount);
  }

  return (
    <div
      className="flex w-fit cursor-pointer items-center justify-center gap-5 rounded bg-black/80 px-8 py-3 hover:bg-neutral-950/80"
      onClick={handleSave}
    >
      <SummonerIconSmall id={profileIconId} />
      <SummonerNameSmall gameName={gameName} tagLine={tagLine} />
      <div>
        <div className="text-xs text-neutral-400">level</div>
      </div>
    </div>
  );
}

export default SummonerPreview;
