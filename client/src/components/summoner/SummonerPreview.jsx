import TrackedRiotAccountsController from "../../controllers/TrackedRiotAccountsController";
import SummonerIconSmall from "./SummonerIconSmall";
import SummonerName from "./SummonerName";

function SummonerPreview(riotAccount) {
  const { gameName, tagLine, profileIconId, summonerLevel } = riotAccount;

  const handleSave = () => {
    TrackedRiotAccountsController.saveRiotAccount(riotAccount);
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
