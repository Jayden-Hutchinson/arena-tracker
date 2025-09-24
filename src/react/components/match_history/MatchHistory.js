import "./MatchHistory.css";

import Match from "../match/Match.js";

function MatchHistory({ puuid, history = [] }) {
  console.log(history);

  return (
    <div className="MatchHistory">
      {/* Load each match in match history */}
      {history && history.length > 0 ? (
        history.map((match, index) => (
          <Match key={index} puuid={puuid} data={match} />
        ))
      ) : (
        // waiting for match history
        <p>Loading</p>
      )}
    </div>
  );
}

export default MatchHistory;
