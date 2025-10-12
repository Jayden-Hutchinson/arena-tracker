import { useState } from "react";

import ScoreCard from "components/player/ScoreCard";

import "./MatchCard.css";

function MatchCard({ puuid, match }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const openClass = open ? "open" : "closed";

  const player = match.getPlayer(puuid);
  const teammate = match.getTeammate(player);

  return (
    <li className={`Match ${openClass}`}>
      <div onClick={toggleOpen} className="players">
        {player && teammate && (
          <>
            <ScoreCard key={player.puuid} display={open} player={player} />
            <ScoreCard key={teammate.puuid} player={teammate} />
          </>
        )}
      </div>
    </li>
  );
}

export default MatchCard;
