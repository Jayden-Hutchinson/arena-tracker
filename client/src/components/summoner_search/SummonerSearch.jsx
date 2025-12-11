import { useState } from "react";
import ServerClient from "../../api/server_api/ServerClient";
import SummonerPreview from "../summoner/SummonerPreview";

function SummonerSearch() {
  const [loadMessage, setLoadMessage] = useState();
  const [gameName, setGameName] = useState("Ginger Comando");
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

      setLoadMessage();
      setRiotAccount(riotAccount);
    } catch (error) {
      console.log("caught error", error);
    }
  };

  return (
    <form
      id="SummonerSearch"
      onSubmit={handleSubmit}
      className="relative m-10 flex flex-row items-center justify-center gap-2"
    >
      <input
        type="text"
        placeholder="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        className="w-60 border-b border-amber-500/30 from-neutral-950/20 to-transparent p-1"
      />

      <span>{"# |"}</span>
      <input
        type="text"
        placeholder="Tag Line"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
        className="w-25 border-b border-amber-500/30 from-neutral-950/20 to-transparent p-1"
      />

      <button
        type="submit"
        className="h-7 border-2 border-amber-500/60 bg-cyan-400/25 bg-linear-to-t px-5 text-sm font-bold text-amber-400/80 hover:from-amber-400/50 hover:to-cyan-600/30 active:from-amber-600/40 active:to-cyan-700/30"
      >
        Search
      </button>

      <div
        className="absolute -bottom-20 z-1 text-center"
        onClick={() => setRiotAccount()}
      >
        {riotAccount ? <SummonerPreview {...riotAccount} /> : loadMessage}
      </div>
    </form>
  );
}

export default SummonerSearch;
