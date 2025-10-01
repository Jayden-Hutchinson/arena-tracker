import "./Match.css";

import { useState } from "react";

import TeamSummary from "../team_summary/TeamSummary.js";
import Player from "../player/Player.js";
import { DDRAGON } from "../../../api/ddragon.js";

function Match(puuid, matchData) {
  const [expanded, setExpanded] = useState(false);
  const team = getTeam(puuid, matchData.info.participants);
  const handleClick = () => setExpanded(!expanded);

  return (
    <li onClick={handleClick} className="Match">
      {team && expanded ? (
        team.map((player, index) => {
          <TeamSummary team={team} />;
          return <Player key={index} player={player} />;
        })
      ) : (
        <div className="GameBanner">
          <img
            key={team[0].championName}
            className="champion-portrait"
            src={DDRAGON.CHAMPION_IMAGE(team[0].championName)}
            alt={team[0].championName}
          />
          <strong>{team[0].championName}</strong>
        </div>
      )}
    </li>
  );
}
function getTeam(puuid, players) {
  const player = players.find((p) => p.puuid === puuid);
  const teamMate = players.find(
    (p) => p.playerSubteamId === player.playerSubteamId && p.puuid !== puuid
  );
  return [player, teamMate];
}

export default Match;
