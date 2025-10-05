import "./TeamInfo.css";

import TeamStats from "../team_stats/TeamStats.js";
import Players from "../players/Players.js";

function TeamInfo({ team, expanded }) {
  return (
    team && (
      <div className={`TeamInfo ${expanded ? "open" : null}`}>
        <TeamStats team={team} />
        <Players players={team.players} />
      </div>
    )
  );
}

export default TeamInfo;
