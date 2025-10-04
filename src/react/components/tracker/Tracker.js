import MatchHistory from "../match_history/MatchHistory.js";
import Summoner from "../summoner/Summoner.js";
import "./Tracker.css";

function Tracker({ summoner }) {
  return (
    <div className="Tracker">
      {summoner && (
        <>
          <Summoner player={summoner} />
          <MatchHistory puuid={summoner.puuid} />
        </>
      )}
    </div>
  );
}

export default Tracker;
