import { useState } from "react";
import TeamInfo from "../team_info/TeamInfo.js";
import PlayerInfo from "../player_info/PlayerInfo.js";
import ChampionPortrait from "../champion_portrait/ChampionPortrait.js";

import "./Match.css";

function Match({ puuid, matchData }) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => setExpanded((prev) => !prev);
  const team = getTeam(puuid, matchData.info.participants);

  return (
    <li onClick={handleClick} className="Match">
      {matchData && expanded ? (
        <>
          <TeamInfo team={team} />
          {team.players &&
            team.players.map((player, index) => (
              <PlayerInfo key={index} player={player} />
            ))}
        </>
      ) : (
        <div className="ChampionInfo">
          <ChampionPortrait championName={team.players[0].championName} />
          <div>{team.players[0].championName}</div>
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

  players = [player, teamMate];
  return { id: player.teamId, players: players };
}

export default Match;
