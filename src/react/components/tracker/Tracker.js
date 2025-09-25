import { useContext, useState } from "react";
import TrackerSearch from "../tracker_search/TrackerSearch";
import MatchHistory from "../match_history/MatchHistory";
import { AugmentContext, ItemContext } from "../../../App.js"
import "./Tracker.css";

function Tracker() {
  const augments = useContext(AugmentContext)
  const items = useContext(ItemContext)

  const [status, setStatus] = useState(null);
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
