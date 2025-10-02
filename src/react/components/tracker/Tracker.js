import MatchHistory from "../match_history/MatchHistory.js";
import Summoner from "../Summoner/Summoner.js";
import "./Tracker.css";

function Tracker({ summoner }) {
  if (summoner) console.log(summoner)



  return (
    <div className="Tracker">
      {summoner && <Summoner player={summoner} />}
      {summoner ? (
        <MatchHistory puuid={summoner.puuid} />
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Tracker;
