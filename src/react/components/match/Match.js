import { useState } from "react";

import TeamInfo from "../team_info/TeamInfo.js";
import PlayerInfo from "../player_info/PlayerInfo.js";
import MatchBanner from "./match_banner/MatchBanner.js";

import "./Match.css";

class MatchInfo {
  constructor(puuid, { info }) {
    this.team = this.getTeam(puuid, info);
    this.duration = this.getMatchDuration(info);
    this.date = this.getDate(info);
  }

  getDate(info) {
    const date = new Date(info.gameCreation);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  getMatchDuration(info) {
    const totalSeconds = info.gameDuration;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  getTeam(puuid, info) {
    const players = info.participants;
    const player = players.find((p) => p.puuid === puuid);
    const teamMate = players.find(
      (p) => p.playerSubteamId === player.playerSubteamId && p.puuid !== puuid
    );

    const team = [player, teamMate];
    return { id: player.teamId, players: team };
  }
}

function Match({ puuid, matchData }) {
  const [expanded, setExpanded] = useState(false);

  const matchInfo = new MatchInfo(puuid, matchData);
  const handleClick = () => setExpanded((prev) => !prev);

  return (
    <li onClick={handleClick} className="Match">
      {matchInfo && <MatchBanner matchInfo={matchInfo} expanded={expanded} />}

      {matchInfo.team.players && (
        <div className={`match-data ${expanded ? "open" : "closed"}`}>
          <TeamInfo team={matchInfo.team} />
          {matchInfo.team.players.map((player, index) => (
            <PlayerInfo key={index} player={player} />
          ))}
        </div>
      )}
    </li>
  );
}

export default Match;
