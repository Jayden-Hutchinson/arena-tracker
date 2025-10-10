import Tracker from "components/base/tracker/Tracker";

import "./TrackerBoard.css";

function TrackerBoard({ summoners }) {
  return (
    <div className="TrackerBoard">
      {Object.entries(summoners).map(([puuid, summoner]) => (
        <Tracker key={puuid} summoner={summoner} />
      ))}
    </div>
  );
}
export default TrackerBoard;
