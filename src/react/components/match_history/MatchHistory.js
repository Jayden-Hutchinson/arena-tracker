import "./MatchHistory.css";

import Match from "../match/Match.js";
import { useEffect, useState } from "react";
import { ClientApi } from "../../../api/clientApi.js";

class MatchInfo {
  constructor(puuid, { info }) {
    this.player = this.getPlayer(puuid, info);
    this.team = this.getTeam(puuid, info);
    this.duration = this.getMatchDuration(info);
    this.date = this.getDate(info);
    this.placement = this.getPlacement(info);
  }

  getDate(info) {
    const date = new Date(info.gameCreation);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  getMatchDuration(info) {
    const totalSeconds = info.gameDuration;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  getPlayer(puuid, info) {
    return info.participants.find((player) => player.puuid === puuid);
  }

  getTeam(puuid, info) {
    const teamMate = info.participants.find(
      (teamMate) =>
        teamMate.playerSubteamId === this.player.playerSubteamId &&
        teamMate.puuid !== puuid
    );

    const team = [this.player, teamMate];
    return { id: this.player.teamId, players: team };
  }

  getPlacement() {
    return this.player.placement;
  }
}
function MatchHistory({ puuid, matchIds }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    async function getMatchIds() {
      for (const id of matchIds) {
        const matchData = await ClientApi.fetchMatchData(id);
        console.log(matchData);
        await sleep(1200);
        setMatches((prev) => [...prev, new MatchInfo(puuid, matchData)]);
      }
    }
    getMatchIds();
  }, []);
  return (
    <ul className="MatchHistory">
      {matches &&
        matches.map((matchInfo, index) => {
          return <Match key={index} puuid={puuid} matchInfo={matchInfo} />;
        })}
    </ul>
  );
}

export default MatchHistory;
