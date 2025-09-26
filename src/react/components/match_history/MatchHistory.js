import "./MatchHistory.css";

import Match from "../match/Match.js";

function MatchHistory({ puuid, matchHistory = [] }) {
  const wins = matchHistory.filter((data) => {
    isWin(data, puuid);
  });

  console.log("wins", wins);
  console.log("history", matchHistory);

  return (
    <div className="MatchHistory">
      {matchHistory && matchHistory.length > 0 ? (
        matchHistory.map((match, index) => (
          <Match key={index} puuid={puuid} data={match} />
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
function isWin(data, puuid) {
  const player = data.info.participants.find((player) => player.puuid == puuid);
  return player.placement === 1;
}

export default MatchHistory;
