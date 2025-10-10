import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import PlayerComponent from "components/base/player/PlayerComponent";
import { Player } from "objects/Player";

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

  const player = match.getPlayer(puuid);
  const teammate = match.getTeammate(player);

  return (
    <li className={`Match ${openClass}`}>
      <button onClick={toggleOpen} className="chevron-button">
        <FaChevronRight className={`chevron ${openClass}`} />
      </button>
      <div className="players">
        {player && teammate && (
          <>
            <PlayerComponent
              key={player.puuid}
              display={open}
              player={player}
            />
            <PlayerComponent key={teammate.puuid} player={teammate} />
          </>
        )}
      </div>
    </li>
  );
}

export default MatchCard;
