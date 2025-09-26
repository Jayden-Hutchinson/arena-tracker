import { DDRAGON } from "../../../api/ddragon";
import "./Summoner.css";

function Summoner({ player }) {
  console.log(player);
  return (
    <div className="Summoner">
      <img
        className="summoner-icon"
        src={DDRAGON.SUMMONER_ICON(player.profileIconId)}
        alt={`Summoner Icon ${player.profileIconId}`}
      />
      <div className="summoner-info">
        <div className="summoner-name">{player.gameName}</div>
        <div>Level: {player.summonerLevel}</div>
      </div>
    </div>
  );
}

export default Summoner;
