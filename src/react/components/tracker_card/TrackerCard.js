import MatchHistory from "../match_history/MatchHistory.js";
import SummonerCard from "../summoner_card/SummonerCard.js";
import "./TrackerCard.css";

/**
 * 
 * @param {Summoner} summoner 
 * @returns 
 */
function TrackerCard({ summoner }) {
  console.log(summoner)
  return (
    summoner && (
      <div className="Tracker">
        <SummonerCard summoner={summoner} />
        <MatchHistory
          puuid={summoner.puuid}
          matchIds={summoner.matchIds}
        />
      </div>
    )
  );
}

export default TrackerCard;
