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
  const [wins, setWins] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    async function getMatchIds() {
      setLoading(true);
      const wins = [];
      for (const [index, id] of matchIds.entries()) {
        setStatus(`Loading: ${index} / ${matchIds.length}`);
        const fetchStart = Date.now();
        const matchData = await ClientApi.fetchMatchData(id);
        const fetchDuration = Date.now() - fetchStart;
        const sleepMs = 1400 - fetchDuration;
        console.log(sleepMs);

        const matchInfo = new MatchInfo(puuid, matchData);

        if (matchInfo.getPlacement() === 1) {
          wins.push(matchInfo);
          setWins((prev) => [...prev, matchInfo]);
        }
        await sleep(sleepMs);
        setMatches((prev) => [...prev, matchInfo]);
      }
      setLoading(false);
      // setWins(wins);
    }
    getMatchIds();
  }, []);

  return (
    <ul className="MatchHistory">
      {loading ? (
        <div>{status}</div>
      ) : (
        matches &&
        wins.map((matchInfo, index) => {
          return <Match key={index} puuid={puuid} matchInfo={matchInfo} />;
        })
      )}
    </ul>
  );
}

export default MatchHistory;
