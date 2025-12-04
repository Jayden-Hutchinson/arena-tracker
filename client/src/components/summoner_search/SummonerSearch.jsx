import { useState } from "react";
import ServerClient from "../../api/server_api/ServerClient";
import SummonerPreview from "../summoner/SummonerPreview";

function SummonerSearch() {
  const [loadMessage, setLoadMessage] = useState("");
  const [gameName, setGameName] = useState("TannerennaT");
  const [tagLine, setTagLine] = useState("na1");
  const [riotAccount, setRiotAccount] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!gameName || !tagLine) return;

    try {
      const riotAccount = await ServerClient.getRiotAccount(gameName, tagLine);

      if (riotAccount.status) {
        console.log(riotAccount.status);
        setLoadMessage("No account found");
        return;
      }

      setLoadMessage(null);
      setRiotAccount(riotAccount);
    } catch (error) {
      console.log("caught error", error);
    }
  };

  return (
    <div className="border-3 border-amber-400/30 m-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-2 p-5 w-2xl bg-cyan-950/25 border-3 border-cyan-900"
      >
        <div className="flex gap-1 items-center">
          <input
            type="text"
            placeholder="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full p-1 border-b-2 border-amber-400/30 text-neutral-400"
          />

          <input
            type="text"
            placeholder="# Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            className="p-1 w-40 text-neutral-400"
          />

          <button
            type="submit"
            className="h-8 text-amber-300/80 text-sm px-5 bg-cyan-950/15 border-2 border-amber-400/50"
          >
            Search
          </button>
        </div>

        <div className="text-center" onClick={() => setRiotAccount(null)}>
          {riotAccount ? <SummonerPreview {...riotAccount} /> : loadMessage}
        </div>
      </form>
    </div>
  );
}

export default SummonerSearch;
