function SummonerProfile({ summoner }) {
  console.log(summoner);
  const gamesPlayed = summoner.matchHistory.all.length;

  return (
    <div className="p4 flex w-full justify-start rounded-lg">
      {/* Summoner Icon */}
      {/* <img
        className="mr-5 h-[100px] w-[100px] rounded-lg"
        src=""
        alt={`Summoner Icon ${summoner.profileIconId}`}
      /> */}
      <div>{summoner.profileIconId}</div>

      {/* Game Name & Summoner Level */}
      <div className="flex flex-col items-start justify-evenly">
        <div>
          <div className="mr-3 text-[18px] font-bold text-gray-300">
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
