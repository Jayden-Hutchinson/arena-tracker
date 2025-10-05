import { useState } from "react";

import TeamInfo from "../team_info/TeamInfo.js";
import PlayerInfo from "../player_info/PlayerInfo.js";
import MatchBanner from "./match_banner/MatchBanner.js";

import "./Match.css";

function Match({ matchInfo }) {
  const [expanded, setExpanded] = useState(false);

  console.log(matchInfo);
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
