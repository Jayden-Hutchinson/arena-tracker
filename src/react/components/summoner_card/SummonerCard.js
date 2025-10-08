import { DDRAGON } from "../../../api/ddragon";
import "./SummonerCard.css";

function SummonerCard({ summoner }) {
  console.log(summoner);
  const gamesPlayed = summoner.matchHistory.length;

  return (
    <div className="Summoner">
      <div className="summoner-icon-container">
        <img
          className="summoner-icon"
          src={DDRAGON.SUMMONER_ICON(summoner.profileIconId)}
          alt={`Summoner Icon ${summoner.iconId}`}
        />
        <div className="summoner-level">Lv. {summoner.level}</div>
      </div>
      <div className="summoner-info">
        <div className="summoner-name">{summoner.gameName}</div>
        <div className="summoner-stats">
          <div className="games-played">Games: {gamesPlayed}</div>
          <div className="placements">
            <div>1:</div>
            <div>2:</div>
            <div>3:</div>
            <div>4:</div>
            <div>5:</div>
            <div>6:</div>
            <div>7:</div>
            <div>8:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummonerCard;
