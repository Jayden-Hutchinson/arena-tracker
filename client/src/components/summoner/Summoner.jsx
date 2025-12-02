import SummonerIcon from "./SummonerIcon";
import SummonerName from "./SummonerName";

function Summoner({
  puuid,
  gameName,
  tagLine,
  profileIconId,
  summonerLevel,
  revisionDate,
}) {
  console.log(gameName);
  return (
    <div className="flex w-full gap-8 items-center">
      <SummonerIcon id={profileIconId} level={summonerLevel} />
      <SummonerName gameName={gameName} tagLine={tagLine} />
    </div>
  );
}

export default Summoner;
