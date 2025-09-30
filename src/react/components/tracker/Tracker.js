// import TrackerSearch from "../tracker_search/TrackerSearch";
import { useState } from "react";
import MatchHistory from "../match_history/MatchHistory.js";
import Summoner from "../Summoner/Summoner.js";
import "./Tracker.css";

function Tracker({ account }) {
  // <TrackerSearch onDataFetch={setPlayerAccount} />
  return (
    <div className="Tracker">
      {account && <Summoner player={account} />}
      {account ? <MatchHistory account={account} /> : <span></span>}
    </div>
  );
}

export default Tracker;
