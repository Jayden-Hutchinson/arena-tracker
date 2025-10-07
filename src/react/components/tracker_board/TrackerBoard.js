import { useState, useEffect } from "react";

import { ClientApi } from "../../../api/clientApi";

import TrackerCard from "../tracker_card/TrackerCard";
import Summoner from "../summoner_card/SummonerCard";

import "./TrackerBoard.css";

function TrackerBoard() {
  const [summoners, setSummoners] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const accounts = [{ gameName: "Ginger Comando", tagLine: "na1" }];

  useEffect(() => {
    const fetchData = async () => {
      for (const account of accounts) {
        const riotAccount = await ClientApi.fetchRiotAccount(
          account.gameName,
          account.tagLine
        );

        let summoner =
          JSON.parse(localStorage.getItem(riotAccount.puuid)) || null;


        if (summoner === null) {
          debugger
          console.log("ENTERED")
          const summonerAccount = await ClientApi.fetchSummoner(riotAccount.puuid);
          const matchIds = await ClientApi.fetchMatchHistory(riotAccount.puuid);
          summoner = new Summoner(riotAccount, summonerAccount, matchIds);
          console.log(summoner)
        }
        debugger

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
