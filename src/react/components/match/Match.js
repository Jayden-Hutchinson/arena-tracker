import "./Match.css";

import { useEffect, useState } from "react";

import TeamSummary from "../team_summary/TeamSummary.js";
import Player from "../player/Player.js";
import { DDRAGON } from "../../../api/ddragon.js";
import { ClientApi } from "../../../api/clientApi.js";

function Match(puuid, matchId) {
  const [team, setTeam] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => setExpanded((prev) => !prev);

  useEffect(() => {
    async function getMatchData() {
      const matchData = await ClientApi.fetchMatchData(matchId);
      const team = getTeam(puuid, matchData.info.participants);
      setTeam(team);
    }
    getMatchData();
  }, []);

  return (
    <li onClick={handleClick} className="Match">
      {team &&
        expanded &&
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
