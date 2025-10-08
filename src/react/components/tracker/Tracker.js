import MatchHistoryCard from "../match_history/MatchHistoryCard.js";
import SummonerProfile from "../summoner_profile/SummonerProfile.js";
import "./Tracker.css";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  console.log(summoner);
  return (
    summoner && (
      <div className="Tracker">
        <SummonerProfile summoner={summoner} />
        <MatchHistoryCard
          puuid={summoner.puuid}
          matchHistory={summoner.matchHistory}
        />
      </div>
    )
  );
}

export default Tracker;
