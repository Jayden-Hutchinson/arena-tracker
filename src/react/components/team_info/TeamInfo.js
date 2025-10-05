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
  const teamData = {
    kills: team.players.reduce((sum, player) => sum + player.kills, 0),
    deaths: team.players.reduce((sum, player) => sum + player.deaths, 0),
    assists: team.players.reduce((sum, player) => sum + player.assists, 0),
    damage: team.players.reduce(
      (sum, player) => sum + player.totalDamageDealtToChampions,
      0
    ),
  };
  return (
    team && (
      <div className="TeamInfo">
        <TeamLogo teamId={team.id} />
        <div>{teamData.kills}</div>
        <div>{teamData.deaths}</div>
        <div>{teamData.assists}</div>
        <div>{teamData.damage}</div>
        {/* <TeamKDA team={team} /> */}
      </div>
    )
  );
}

export default TeamInfo;
