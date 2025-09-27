import { DDRAGON } from "../../../api/ddragon";
import "./Summoner.css";

function Summoner({ player }) {
  return (
    <div className="Summoner">
      <img
        className="summoner-icon"
        src={DDRAGON.SUMMONER_ICON(player.profileIconId)}
        alt={`Summoner Icon ${player.profileIconId}`}
      />
      <div className="summoner-info">
        <div className="summoner-name">{player.gameName}</div>
        <div className="summoner-level">Level: {player.summonerLevel}</div>
        <div className="games-played">Games Played: {player.summonerLevel}</div>
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
