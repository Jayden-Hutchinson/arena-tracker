import "./MatchHistory.css";

import Match from "../match/Match.js";

function MatchHistory({ puuid, matchHistory = [] }) {
  const wins = matchHistory.filter((data) => {
    isWin(data, puuid);
  });

  return (
    <div className="MatchHistory">
      {matchHistory && matchHistory.length > 0 ? (
        matchHistory.map((matchData, index) => {
          const players = matchData.info.participants;
          const player = players.find((p) => p.puuid === puuid);

          console.log(player.playerSubteamId);

          const teamMate = players.find(
            (p) =>
              p.playerSubteamId === player.playerSubteamId && p.puuid !== puuid
          );

          console.log(teamMate);

          const team = [player, teamMate];
          console.log(matchData);

          return <Match key={index} team={team} data={matchData} />;
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
function isWin(data, puuid) {
  const player = data.info.participants.find(
    (player) => player.puuid === puuid
  );
  return player.placement === 1;
}

export default MatchHistory;
