import MatchHistoryCard from "../match_history/MatchHistoryCard.js";
import SummonerCard from "../summoner_card/SummonerCard.js";
import "./TrackerCard.css";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function TrackerCard({ summoner }) {
  console.log(summoner);
  return (
    summoner && (
      <div className="TrackerCard">
        <SummonerCard summoner={summoner} />
        <MatchHistoryCard
          puuid={summoner.puuid}
          matchHistory={summoner.matchHistory}
        />
      </div>
    )
  );
}

export default TrackerCard;
