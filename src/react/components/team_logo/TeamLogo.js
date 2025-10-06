import { CDRAGON } from "../../../api/cdragon";

import "./TeamLogo.css";

const ARENA_TEAMS = {
  100: { name: "Krug", logo: "krugs.png" },
  200: { name: "Gromp", logo: "gromp.png" },
  300: { name: "Scuttle Crab", logo: "scuttle.png" },
  400: { name: "Wolves", logo: "wolves.png" },
};

function TeamLogo({ teamId }) {
  const teamData = ARENA_TEAMS[teamId];
  return (
    <div className="TeamLogo">
      <img className="team-logo" src={CDRAGON.TEAM_LOGO(teamData.logo)} />
      <div className="team-name">{teamData.name}</div>
    </div>
  );
}

export default TeamLogo;
