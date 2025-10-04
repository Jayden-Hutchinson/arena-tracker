import TeamLogo from "../team_logo/TeamLogo";
import "./TeamInfo.css";

//     this.kills = team.reduce((sum, player) => sum + player.kills, 0);
//     this.deaths = team.reduce((sum, player) => sum + player.deaths, 0);
//     this.assists = team.reduce((sum, player) => sum + player.assists, 0);
//     this.totalDamage = team.reduce(
//       (sum, player) => sum + player.totalDamageDealtToChampions,
//       0
//     );

function TeamInfo({ team }) {
  return (
    team && (
      <div className="TeamInfo">
        <TeamLogo teamId={team.id} />
        {/* <TeamKDA team={team} /> */}
      </div>
    )
  );
}

export default TeamInfo;
