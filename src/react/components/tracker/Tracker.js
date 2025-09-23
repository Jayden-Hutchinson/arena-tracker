import { useState } from "react";
import TrackerSearch from "../tracker_search/TrackerSearch";
import MatchHistory from "../match_history/MatchHistory";
import "./Tracker.css";

function Tracker() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="Tracker">
      <TrackerSearch onDataFetch={setApiData} />
      {apiData && (
        <div>
          {/* <AccountProfile /> */}
          <MatchHistory history={apiData.MatchHistory} />
        </div>
      )}
    </div >
  );
}

export default Tracker;
