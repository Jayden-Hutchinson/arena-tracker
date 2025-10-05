import { useState } from "react";

import TeamInfo from "../team_info/TeamInfo.js";
import MatchBanner from "../match_banner/MatchBanner.js";

import "./Match.css";

function Match({ matchInfo }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((prev) => !prev);

  return (
    <li onClick={handleClick} className="Match">
      {matchInfo && <MatchBanner matchInfo={matchInfo} expanded={expanded} />}
      {matchInfo.team && <TeamInfo team={matchInfo.team} expanded={expanded} />}
    </li>
  );
}

export default Match;
