import "./MatchHistory.css";
import Match from "../match/Match.js";

function MatchHistory({ puuid, history = [] }) {
  console.log(history);
  return (
    <div className="MatchHistory">
      {history && history.length > 0 ? (
        <ul>
          {history.map((match, index) => (
            <Match key={index} puuid={puuid} data={match} />
          ))}
        </ul>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default MatchHistory;
