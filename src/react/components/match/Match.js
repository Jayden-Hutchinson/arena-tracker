import { useEffect, useState } from "react";
import { DDRAGON } from "../../../api/ddragon.js";
import TeamSummary from "../team_summary/TeamSummary.js";
import Player from "../player/Player.js";

import "./Match.css";

function Match({ puuid, matchData }) {
  const [team, setTeam] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => setExpanded((prev) => !prev);

  useEffect(() => {
    const team = getTeam(puuid, matchData.info.participants);
    console.log(team);
    setTeam(team);
  }, []);

  return (
    <li onClick={handleClick} className="Match">
      {matchData &&
        team &&
        team.map((player, index) => {
          <TeamSummary team={team} />;
          <Player key={index} player={player} />;
          <div className="GameBanner">
            <img
              key={team[0].championName}
              className="champion-portrait"
              src={DDRAGON.CHAMPION_IMAGE(team[0].championName)}
              alt={team[0].championName}
            />
            <strong>{team[0].championName}</strong>
          </div>;
        })}
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
