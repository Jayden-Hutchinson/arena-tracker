import "./MatchHistory.css";

import Match from "../match/Match.js";

function MatchHistory({ puuid, matchIds }) {
  return (
    <div className="MatchHistory">
      {matchIds.map((matchId, index) => {
        return <Match key={index} puuid={puuid} matchData={matchId} />;
      })}
    </div>
  );
}

export default MatchHistory;
