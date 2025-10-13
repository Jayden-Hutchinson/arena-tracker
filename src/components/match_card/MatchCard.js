import { useState } from "react";

import ScoreCard from "components/player/ScoreCard";

import "./MatchCard.css";

function MatchCard({  matchData }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const openClass = open ? "open" : "closed";

  console.log(matchData);
  return (
    <li className={`Match ${openClass}`}>
      <div onClick={toggleOpen} className="players">
        {matchData && (
          <>
            <ScoreCard
              key={matchData.player.puuid}
              display={open}
              player={matchData.player}
            />
            <ScoreCard
              key={matchData.teammate.puuid}
              player={matchData.teammate}
            />
          </>
        )}
      </div>
    </li>
  );
}

export default MatchCard;
