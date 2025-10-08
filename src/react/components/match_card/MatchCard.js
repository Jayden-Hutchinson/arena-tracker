import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import Player from "../player/Player.js";

import "./MatchCard.css";

/**
 *
 * @param {Match} match
 * @returns
 */
function MatchCard({ puuid, match }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const openClass = open ? "open" : "closed";

  console.log(match);
  console.log(puuid);

  const player = match.getPlayer(puuid);
  const teammate = match.getTeammate(player);

  return (
    <li className={`Match ${openClass}`}>
      <button onClick={toggleOpen} className="chevron-button">
        <FaChevronRight className={`chevron ${openClass}`} />
      </button>
      <div className="players">
        <Player key={player.puuid} player={player} />
        <Player key={teammate.puuid} player={teammate} />
      </div>
    </li>
  );
}

export default MatchCard;
