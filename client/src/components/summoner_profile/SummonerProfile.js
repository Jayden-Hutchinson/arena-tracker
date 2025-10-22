import { DDRAGON } from "../../api/ddragon";

function SummonerProfile({ summoner }) {
  console.log("PROFILE:", summoner);
  const gamesPlayed = summoner.matchHistory.all.length;

  return (
    <div className="flex justify-start w-full rounded-lg p4">
      {/* Summoner Icon */}
      <img
        className="w-[100px] h-[100px] mr-5 rounded-lg"
        src={DDRAGON.SUMMONER_ICON(summoner.profileIconId)}
        alt={`Summoner Icon ${summoner.profileIconId}`}
      />

      {/* Game Name & Summoner Level */}
      <div className="flex flex-col justify-evenly items-start">
        <div>
          <div className="text-[18px] font-bold mr-3 text-gray-300">
            {summoner.gameName}
          </div>
          <div className="text-[12px] text-yellow-400">
            {summoner.summonerLevel}
          </div>
        </div>

        {/* Games Played & Placements */}
        <div className="text-[14px] text-gray-400">Games: {gamesPlayed}</div>
        {/* <div className="text-[14px] text-gray-400 flex gap-4">
          <div>1st:</div>
          <div>2nd:</div>
          <div>3rd:</div>
          <div>4th:</div>
          <div>5th:</div>
          <div>6th:</div>
          <div>7th:</div>
          <div>8th:</div>
        </div> */}
      </div>
    </div>
  );
}

export default SummonerProfile;
