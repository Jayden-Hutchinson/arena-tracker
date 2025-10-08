import { useState, useEffect } from "react";

import { ClientApi } from "../../../api/clientApi";

import Tracker from "../tracker/Tracker.js";
import Summoner from "../../../objects/Summoner.js";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState({});

  const accounts = [{ gameName: "Ginger Comando", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      for (const account of accounts) {
        const accountDTO = await ClientApi.fetchAccount(
          account.gameName,
          account.tagLine
        );

        const summonerDTO = await ClientApi.fetchSummoner(accountDTO.puuid);
        const matchHistory = await ClientApi.fetchMatchHistory(
          accountDTO.puuid
        );

        const summoner = new Summoner(accountDTO, summonerDTO, matchHistory);
        console.log(summoner);

        setSummoners((prev) => ({
          ...prev,
          [summoner.puuid]: summoner,
        }));
      }
    };
    fetchData();
  }, []);

  console.log(summoners);
  return (
    <div className="TrackerBoard">
      {Object.entries(summoners).map(([puuid, summoner]) => (
        <Tracker key={puuid} summoner={summoner} />
      ))}
    </div>
  );
}
export default TrackerBoard;
