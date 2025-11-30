import { useState } from "react";
import { useEffect } from "react";
import ServerApi from "./api/server_api";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchRiotAccount = async (gameName, tagLine) => {
      try {
        var url;

        url = ServerApi.getAccountByGameNameUrl(gameName, tagLine);
        const accountByGameNameRes = await fetch(url);
        const accountData = await accountByGameNameRes.json();

        url = ServerApi.getAccountByPuuidUrl(accountData.puuid);
        const accountByPuuidRes = await fetch(url);
        const summonerData = await accountByPuuidRes.json();

        const fullAccount = { ...accountData, ...summonerData };

        console.log("Full Account", fullAccount);

        url = ServerApi.getMatchesByPuuidUrl({
          puuid: fullAccount.puuid,
        });

        const matchesByPuuidRes = await fetch(url);
        const matchesData = await matchesByPuuidRes.json();
        console.log(matchesData);

        localStorage.setItem(fullAccount.puuid, JSON.stringify(fullAccount));
        setAccount(fullAccount);
      } catch (err) {
        console.error("Error fetching data:", err);
        setAccount("Failed to load data");
      }
    };

    fetchRiotAccount("Ginger Comando", "na1");
  }, []);

  return (
    <div className="">
      <div>{JSON.stringify(account)}</div>
      <div>{account.gameName}</div>
      <div>{account.tagLine}</div>
      <div>{account.profileIconId}</div>
      <div>{account.revisionData}</div>
      <div>{account.summonerLevel}</div>
    </div>
  );
}

export default App;
