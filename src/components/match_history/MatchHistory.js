
import MatchCard from "components/match_card/MatchCard";

import "./MatchHistory.css";

function MatchHistory({ puuid, matches }) {
  return (
    <ul className="MatchHistory">
      <div className="list-items">
        <div>Champion</div>
        <div>Augments</div>
        <div>Items</div>
        <div>K/D/A</div>
        <div>Damage</div>
      </div>

      {matches &&
        matches.map((matchInfo, index) => {
          return <MatchCard key={index} puuid={puuid} match={matchInfo} />;
        })}
    </ul>
  );
}

export default MatchHistory;
