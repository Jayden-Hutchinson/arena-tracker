import SummonerIcon from "./SummonerIcon";
import SummonerName from "./SummonerName";

function Summoner({
  gameName,
  tagLine,
  profileIconId,
  summonerLevel,
  revisionDate,
}) {
  console.log(gameName);
  return (
    <>
      <div
        id="Summoner"
        className="relative mb-5 flex w-full flex-col items-center justify-center gap-5 pt-25"
      >
        <div className="absolute -top-10">
          <SummonerIcon id={profileIconId} level={summonerLevel} />
        </div>
        <SummonerName gameName={gameName} tagLine={tagLine} />
      </div>
    </>
  );
}

export default Summoner;
