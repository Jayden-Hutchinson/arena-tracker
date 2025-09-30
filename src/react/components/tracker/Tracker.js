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
      {account ? (
        <MatchHistory puuid={account.puuid} matchIds={account.matchIds} />
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Tracker;
