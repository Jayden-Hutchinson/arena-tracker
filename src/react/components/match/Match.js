import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import Player from "../player/Player.js";

import "./Match.css";

function Match({ matchInfo }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const openClass = open ? "open" : "closed";
  console.log(matchInfo);

  return (
    <li className={`Match ${openClass}`}>
      <button onClick={toggleOpen} className="chevron-button">
        <FaChevronRight className={`chevron ${openClass}`} />
      </button>
      <div className="players">
        {matchInfo.team.players.map((player, index) => (
          <Player key={index} player={player} />
        ))}
      </div>
      <div></div>
    </li>
  );
}

export default Match;
