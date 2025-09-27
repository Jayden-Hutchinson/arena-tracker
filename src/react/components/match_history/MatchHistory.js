import "./MatchHistory.css";

import Match from "../match/Match.js";

function MatchHistory({ puuid, matchHistory = [] }) {
  const wins = matchHistory.filter((data) => {
    const player = data.info.participants.find(
      (player) => player.puuid === puuid
    );
    return player.placement === 1;
  });

  console.log(matchHistory);
  return (
    <div className="MatchHistory">
      {matchHistory && matchHistory.length > 0 ? (
        matchHistory.map((matchData, index) => {
          return <Match key={index} puuid={puuid} matchData={matchData} />;
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default MatchHistory;
