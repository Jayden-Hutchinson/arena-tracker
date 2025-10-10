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
    console.log(info)
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
function MatchHistory({ puuid, matchIdList }) {
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
      const wins = JSON.parse(localStorage.getItem("wins")) || [];
      const idsToFetch = wins.length > 0 ? wins : matchIdList;

      console.log(wins);
      console.log(idsToFetch);

      for (const [index, id] of idsToFetch.entries()) {
        setStatus(`Loading: ${index} / ${idsToFetch.length}`);
        // const fetchStart = Date.now();
        const matchData = await ClientApi.fetchMatchData(id);
        // await sleep(200);

        // const fetchDuration = Date.now() - fetchStart;
        // const sleepMs = 1200 - fetchDuration;
        // await sleep(sleepMs);

        const matchInfo = new MatchInfo(puuid, matchData);

        if (matchInfo.getPlacement() === 1 && !wins.includes(id)) {
          wins.push(id);
          setWins((prev) => [...prev, matchInfo]);
        }

        setWins((prev) => [...prev, matchInfo]);
        localStorage.setItem("wins", JSON.stringify(wins));
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
