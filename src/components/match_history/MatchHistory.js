import { useState, useEffect } from "react";

import { Client } from "api/client";

import MatchCard from "components/match_card/MatchCard";

import Match from "objects/Match";

const EMPTY = [];

function MatchHistory({ puuid, matchHistory }) {
  const [matches, setMatches] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const matches = EMPTY;
      for (const matchId of matchHistory.all) {
        const matchDto = await Client.fetchMatchData(matchId);
        if (matchDto) {
          matches.push(new Match(matchDto));
        }
      }
      setMatches(matches);
    };
    fetchData();
  });

  return (
    <ul className="relative flex w-full flex-col gap-1">
      <div className="top-15 sticky z-10 grid w-full grid-flow-col grid-cols-[3fr_2fr_2fr_1fr_1fr] rounded-lg bg-gray-950 p-2.5 text-[12px] text-gray-300">
        <div>Champion</div>
        <div>Augments</div>
        <div>Items</div>
        <div>k/d/a</div>
        <div>Damage</div>
      </div>

      {matches &&
        matches.map((match) => {
          return (
            <MatchCard
              key={match.metadata.matchId}
              puuid={puuid}
              match={match}
            />
          );
        })}
    </ul>
  );
}

export default MatchHistory;
