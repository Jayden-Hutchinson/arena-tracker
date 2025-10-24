import SummonerProfile from "components/summoner_profile/SummonerProfile";
import TrackerControls from "components/tracker_controls/TrackerControls";
import MatchHistoryComponent from "components/match_history/MatchHistoryComponent";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  return (
    <div className="flex w-[800px] flex-col items-center justify-center rounded-lg bg-tracker p-5 text-white">
      {summoner && (
        <>
          <SummonerProfile summoner={summoner} />
          <TrackerControls />
          <MatchHistoryComponent
            puuid={summoner.puuid}
            matchHistory={summoner.matchHistory}
          />
        </>
      )}
    </div>
  );
}

export default Tracker;
