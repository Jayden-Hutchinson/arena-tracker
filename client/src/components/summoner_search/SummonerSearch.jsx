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
    <div className="mb-5 flex w-full justify-center border-2 border-amber-500/30 bg-cyan-950/25 p-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-xl flex-col justify-center gap-2"
      >
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full border-b border-amber-500/30 bg-gradient-to-t from-neutral-950/20 to-transparent p-1"
          />

          <input
            type="text"
            placeholder="# Tag Line"
            value={tagLine}
            onChange={(e) => setTagLine(e.target.value)}
            className="w-40 border-b border-amber-500/30 bg-gradient-to-t from-neutral-950/20 to-transparent p-1"
          />

          <button
            type="submit"
            className="h-8 border-2 border-amber-500/60 bg-cyan-600/30 px-5 text-sm font-bold text-amber-400/80 hover:bg-cyan-400/20 hover:bg-gradient-to-t hover:from-amber-500/40 hover:to-cyan-600/30 active:from-amber-600/40 active:to-cyan-700/30"
          >
            Search
          </button>
        </div>
      </form>
      <div className="text-center" onClick={() => setRiotAccount(null)}>
        {riotAccount ? <SummonerPreview {...riotAccount} /> : loadMessage}
      </div>
    </div>
  );
}

export default SummonerSearch;
