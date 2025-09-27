import "./Match.css";
import { CDRAGON } from "../../../api/cdragon.js";
import { AugmentContext, ItemContext } from "../../../App.js";
import { useContext } from "react";
import { DDRAGON } from "../../../api/ddragon.js";

import TeamSummary from "../team_summary/TeamSummary.js";
import Player from "../player/Player.js";

function Match({ puuid, matchData }) {
  const team = getTeam(puuid, matchData.info.participants);
  console.log(team);

  return (
    <li className="Match">
      <TeamSummary team={team} />
      {team &&
        team.map((player, index) => {
          return <Player key={index} player={player} />;
        })}
    </li>
  );
}
function getTeam(puuid, players) {
  const player = players.find((p) => p.puuid === puuid);
  const teamMate = players.find(
    (p) => p.playerSubteamId === player.playerSubteamId && p.puuid !== puuid
  );
  return [player, teamMate];
}

export default Match;
