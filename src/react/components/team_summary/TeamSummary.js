import { CDRAGON } from "../../../api/cdragon";
import "./TeamSummary.css";

const ARENA_TEAMS = {
  100: { name: "Krug", icon: "krugs.png" },
  200: { name: "Gromp", icon: "gromp.png" },
  300: { name: "Scuttle Crab", icon: "scuttle.png" },
  400: { name: "Wolves", icon: "wolves.png" },
};

class TeamStats {
  constructor({ team }) {
    this.name = ARENA_TEAMS[team[0].teamId].name;
    this.icon = ARENA_TEAMS[team[0].teamId].icon;
    this.kills = team.reduce((sum, player) => sum + player.kills, 0);
    this.deaths = team.reduce((sum, player) => sum + player.deaths, 0);
    this.assists = team.reduce((sum, player) => sum + player.assists, 0);
    this.totalDamage = team.reduce(
      (sum, player) => sum + player.totalDamageDealtToChampions,
      0
    );
  }
}

function TeamSummary(team) {
  const teamStats = new TeamStats(team);
  return (
    <>
      {teamStats && (
        <div className="TeamSummary">
          <img
            className="team-icon"
            src={CDRAGON.TEAM_ICON(teamStats.icon)}
            alt="team icon"
          />
          <div>
            {teamStats.kills}/{teamStats.deaths}/{teamStats.assists}
          </div>
          <div>{teamStats.totalDamage}</div>
        </div>
      )}
    </>
  );
}

export default TeamSummary;
