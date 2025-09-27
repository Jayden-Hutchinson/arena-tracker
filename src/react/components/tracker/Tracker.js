import { useContext, useState, useEffect } from "react";
// import TrackerSearch from "../tracker_search/TrackerSearch";
import MatchHistory from "../match_history/MatchHistory";
import Summoner from "../Summoner/Summoner.js";
import { AugmentContext, ItemContext } from "../../../App.js";
import "./Tracker.css";

import { ClientApi } from "../../../api/clientApi.js";

function Tracker() {
  const augments = useContext(AugmentContext);
  const items = useContext(ItemContext);

  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Call the api on load
  // !TO REMOVE BEFORE LAUNCH
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const account = await ClientApi.fetchRiotAccount("TannerennaT", "na1");
        const summoner = await ClientApi.fetchSummoner(
          account.puuid,
          setStatus
        );
        const matchHistory = await ClientApi.fetchMatchHistory(account.puuid);

        const trackerAccount = {
          gameName: account.gameName,
          puuid: account.puuid,
          profileIconId: summoner.profileIconId,
          summonerLevel: summoner.summonerLevel,
          matchHistory,
        };

        setApiData(trackerAccount); // save it to state
      } catch (err) {
        console.error("Failed to fetch account data:", err);
        setStatus("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // <TrackerSearch onDataFetch={setApiData} />
  return (
    <div className="Tracker">
      {apiData && <Summoner player={apiData} />}
      {apiData ? (
        <MatchHistory
          puuid={apiData.puuid}
          matchHistory={apiData.matchHistory}
        />
      ) : (
        <span>{status}</span>
      )}
    </div>
  );
}

export default Tracker;
