import { useContext, useState, useEffect } from "react";
import TrackerSearch from "../tracker_search/TrackerSearch";
import MatchHistory from "../match_history/MatchHistory";
import { AugmentContext, ItemContext } from "../../../App.js";
import "./Tracker.css";

import { ClientApi } from "../../../api/clientApi.js";

function Tracker() {
  const augments = useContext(AugmentContext);
  const items = useContext(ItemContext);

  const [status, setStatus] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const puuid = "bhCte-xYzDzNtuF7Qx6DsjHdLPI9zJpJkg-77kL4V4w6Jxcg2FKtg__Up";

  // Call the api on load
  // !TO REMOVE BEFORE LAUNCH
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const account = await ClientApi.fetchRiotAccount("TannerennaT", "na1");

        // Fetch summoner info + match history in parallel
        const [summoner, matchHistory] = await Promise.all([
          ClientApi.fetchSummoner(account.puuid),
          ClientApi.fetchMatchHistory(account.puuid),
        ]);

        const trackerAccount = {
          gameName: account.gameName,
          puuid: account.puuid,
          profileIconId: summoner.profileIconId,
          summonerLevel: summoner.summonerLevel,
          matchHistory,
        };

        console.log(trackerAccount);
        setApiData(trackerAccount); // save it to state
      } catch (err) {
        console.error("Failed to fetch account data:", err);
        setStatus("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Tracker">
      <TrackerSearch onDataFetch={setApiData} />
      {apiData && (
        <MatchHistory puuid={apiData.puuid} history={apiData.matchHistory} />
      )}
      <MatchHistory puuid={puuid} />
    </div>
  );
}

export default Tracker;
