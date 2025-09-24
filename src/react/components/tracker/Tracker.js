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
        <MatchHistory puuid={apiData.puuid} history={apiData.matchHistory} />
      )}
    </div>
  );
}

export default Tracker;
