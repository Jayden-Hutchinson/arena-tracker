import { useState, useEffect } from "react";

import { ClientApi } from "../../../api/clientApi";

import TrackerCard from "../tracker_card/TrackerCard";
import Summoner from "../../../objects/Summoner.js";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const accounts = [{ gameName: "Ginger Comando", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      for (const account of accounts) {
        const accountDTO = await ClientApi.fetchRiotAccount(
          account.gameName,
          account.tagLine
        );

        let summoner =
          JSON.parse(localStorage.getItem(accountDTO.puuid)) || null;


        if (summoner === null) {
          const summonerDTO = await ClientApi.fetchSummoner(accountDTO.puuid);
          const matchIdList = await ClientApi.fetchMatchHistory(accountDTO.puuid);
          summoner = new Summoner(accountDTO, summonerDTO, matchIdList);
        } else {
          summoner = new Summoner(summoner.riot, summoner.profile, summoner.matchIdList)
        }

        console.log(summoner)
        setSummoners((prev) => [...prev, summoner]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="TrackerBoard">
      {summoners.map((summoner, index) => (
        <TrackerCard key={index} summoner={summoner} />
      ))}
    </div>
  );
}
export default TrackerBoard;
