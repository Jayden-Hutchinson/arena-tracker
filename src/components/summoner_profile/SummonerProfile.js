import { DDRAGON } from "../../api/ddragon";
import "./SummonerProfile.css";

function SummonerProfile({ summoner }) {
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
            <div>1st:</div>
            <div>2nd:</div>
            <div>3rd:</div>
            <div>4th:</div>
            <div>5th:</div>
            <div>6th:</div>
            <div>7th:</div>
            <div>8th:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummonerProfile;
