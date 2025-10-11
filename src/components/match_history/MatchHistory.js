import { useState } from "react";

import MatchCard from "components/match_card/MatchCard";

import "./MatchHistory.css";

function MatchHistory({ puuid, matches }) {
  return (
    <ul className="MatchHistory">
      {matches &&
        matches.map((matchInfo, index) => {
          return <MatchCard key={index} puuid={puuid} match={matchInfo} />;
        })}
    </ul>
  );
}

export default MatchHistory;
