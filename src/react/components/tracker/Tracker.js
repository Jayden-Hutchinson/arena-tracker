import MatchHistory from "../match_history/MatchHistory.js";
import Summoner from "../summoner/Summoner.js";
import "./Tracker.css";

function Tracker({ trackerInfo }) {
  console.log(trackerInfo)
  return (
    trackerInfo && (
      <div className="Tracker">
        <Summoner summoner={trackerInfo} />
        <MatchHistory
          puuid={trackerInfo.puuid}
          matchIds={trackerInfo.matchIds}
        />
      </div>
    )
  );
}

export default Tracker;
