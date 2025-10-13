import MatchCard from "components/match_card/MatchCard";

import "./MatchHistory.css";

function MatchHistory({ puuid, matchHistory }) {
  return (
    <ul className="MatchHistory">
      <div className="list-items">
        <div>Champion</div>
        <div>Augments</div>
        <div>Items</div>
        <div>K/D/A</div>
        <div>Damage</div>
      </div>

      {matchHistory.data &&
        matchHistory.data.map((match, index) => {
          return <MatchCard key={match.id} matchData={match} />;
        })}
    </ul>
  );
}

export default MatchHistory;
