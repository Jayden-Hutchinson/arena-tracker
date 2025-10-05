import { useState, useEffect } from "react";

import { ClientApi } from "../../../api/clientApi.js";
import MatchHistory from "../match_history/MatchHistory.js";
import Summoner from "../summoner/Summoner.js";
import "./Tracker.css";

function Tracker({ account }) {
  const [summoner, setSummoner] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const accountData = await ClientApi.fetchRiotAccount(
        account.gameName,
        account.tagLine
      );
      const summonerData = await ClientApi.fetchSummoner(accountData.puuid);
      const matchIds = await ClientApi.fetchMatchHistory(accountData.puuid);

      const tracker = {
        gameName: accountData.gameName,
        puuid: accountData.puuid,
        tagLine: accountData.tagLine,
        level: summonerData.summonerLevel,
        iconId: summonerData.profileIconId,
        matchHistory: matchIds,
      };
      setSummoner(tracker);
    };

    async function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    // async function getMatchIds() {
    //   for (const id of matchIds) {
    //     const matchData = await ClientApi.fetchMatchData(id);
    //     await sleep(1200);
    //     setMatches((prev) => [...prev, matchData]);
    //   }
    // }

    // getMatchIds();
    fetchData();
  }, []);
  return (
    summoner && (
      <div className="Tracker">
        <Summoner summoner={summoner} />
        <MatchHistory
          puuid={summoner.puuid}
          matchHistory={summoner.matchHistory}
        />
      </div>
    )
  );
}

export default Tracker;
