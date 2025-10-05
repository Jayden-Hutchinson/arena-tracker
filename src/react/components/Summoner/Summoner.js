import { DDRAGON } from "../../../api/ddragon";
import "./Summoner.css";

function Summoner({ summoner }) {
  return (
    <div className="Summoner">
      <img
        className="summoner-icon"
        src={DDRAGON.SUMMONER_ICON(summoner.iconId)}
        alt={`Summoner Icon ${summoner.iconId}`}
      />
      <div className="summoner-info">
        <div className="summoner-name">{summoner.gameName}</div>
        <div className="summoner-level">Level: {summoner.level}</div>
        <div className="games-played">
          Games Played: {summoner.matchHistory.length}
        </div>
        <div className="placements">
          <div>1sts:</div>
          <div>2nds:</div>
          <div>3rds:</div>
          <div>4th:</div>
          <div>5th:</div>
          <div>6th:</div>
          <div>7th:</div>
          <div>8th:</div>
        </div>
      </div>
    </div>
  );
}

export default Summoner;
