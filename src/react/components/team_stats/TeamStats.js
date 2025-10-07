import "./TeamStats.css";

function TeamStats({ team }) {
  const players = team.players;
  const teamStats = {
    kills: players.reduce((sum, player) => sum + player.kills, 0),
    deaths: players.reduce((sum, player) => sum + player.deaths, 0),
    assists: players.reduce((sum, player) => sum + player.assists, 0),
    damage: players.reduce(
      (sum, player) => sum + player.totalDamageDealtToChampions,
      0
    ),
  };
  return (
    <div className="TeamStats">
      <div>
        <div>{teamStats.kills}/</div>
        <div>{teamStats.deaths}/</div>
        <div>{teamStats.assists}</div>
      </div>
      <div>{teamStats.damage}</div>
    </div>
  );
}

export default TeamStats;
