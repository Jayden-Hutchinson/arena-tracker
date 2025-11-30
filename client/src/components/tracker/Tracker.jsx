import { useState } from "react";
import { useEffect } from "react";
import { fetchRiotAccount, fetchMatches } from "./query";


function Tracker() {
  const [account, setAccount] = useState("");
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const getData = async (gameName, tagLine) => {
      const account = await fetchRiotAccount(gameName, tagLine)
      setAccount(account)

      const matches = await fetchMatches(account.puuid)
      setMatches(matches)
    };
    getData("Ginger Comando", "na1");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>Tracker</div>
      <div className="flex">
        <div>Icon {account.profileIconId}</div>
        <div>{account.gameName}</div>
        <div>{account.tagLine}</div>
      </div>
      <div>Level {account.summonerLevel}</div>
      <div>{JSON.stringify(matches)}</div>
    </div>
  );
}
export default Tracker