import TrackerHeader from "components/parts/tracker/tracker_header/TrackerHeader.js";
import TrackerBody from "components/parts/tracker/tracker_body/TrackerBody";

import "./Tracker.css";

/**
 *
 * @param {Summoner} summoner
 * @returns
 */
function Tracker({ summoner }) {
  return (
    summoner && (
      <div className="Tracker">
        <TrackerHeader summoner={summoner} />
        <TrackerBody
          puuid={summoner.puuid}
          matchHistory={summoner.matchHistory}
        />
      </div>
    )
  );
}

export default Tracker;
