import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import Player from "../player/Player.js";

import "./Match.css";

/**
 * 
 * @param {Match} match 
 * @returns 
 */
function Match(match) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const openClass = open ? "open" : "closed";

  return (
    <li className={`Match ${openClass}`}>
      <button onClick={toggleOpen} className="chevron-button">
        <FaChevronRight className={`chevron ${openClass}`} />
      </button>
      <div className="players">
        {match.team.players.map((player, index) => (
          <Player key={index} player={player} />
        ))}
      </div>
    </li>
  );
}

export default Match;
