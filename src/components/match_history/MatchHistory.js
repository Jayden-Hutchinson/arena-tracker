import MatchCard from "components/match_card/MatchCard";

import "./MatchHistory.css";

function MatchHistory(summoner) {
  debugger;
  return (
    <ul className="MatchHistory">
      <div className="list-items">
        <div>Champion</div>
        <div>Augments</div>
        <div>Items</div>
        <div>K/D/A</div>
        <div>Damage</div>
      </div>

      {summoner.matchHistory.data &&
        summoner.matchHistory.data.map((match) => {
          return <MatchCard key={match.id} matchData={match} />;
        })}
    </ul>
  );
}

export default MatchHistory;
