import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistory from "components/match_history/MatchHistory";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  console.log(summoner);
  return (
    <div className="flex w-[800px] flex-col items-center justify-center rounded-lg bg-gray-900 p-5 text-white">
      {summoner && (
        <>
          <SummonerProfile summoner={summoner} />
          <TrackerControls />
          <MatchHistory
            puuid={summoner.puuid}
            matchHistory={summoner.matchHistory}
          />
        </>
      )}
    </div>
  );
}

export default Tracker;
