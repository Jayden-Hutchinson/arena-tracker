import { useState } from "react";
import ServerClient from "../../api/server_api/ServerClient";
import Summoner from "../summoner/Summoner";
import SummonerPreview from "../summoner/SummonerPreview";

const TrackerForm = () => {
  const [loadMessage, setLoadMessage] = useState("");
  const [gameName, setGameName] = useState("TannerennaT");
  const [tagLine, setTagLine] = useState("na1");
  const [riotAccount, setRiotAccount] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!gameName || !tagLine) return;

    try {
      setLoadMessage("Searching for riot account...");
      console.debug("fetching riot account", gameName, tagLine);
      const riotAccount = await ServerClient.fetchRiotAccount(
        gameName,
        tagLine
      );
      console.debug("fetched riot account", riotAccount);

      if (!riotAccount) {
        setLoadMessage("No account found");
      }

      setLoadMessage("Account found");
      setRiotAccount(riotAccount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 m-5 p-5 w-2xl bg-cyan-950/15 border-2 border-amber-400/30"
    >
      <div className="flex gap-1 items-center">
        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="w-full p-2 bg-neutral-950"
        />
        <input
          type="text"
          placeholder="# Tag Line"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          className="p-2 w-40 bg-neutral-950"
        />
        <button
          type="submit"
          className="h-8 px-2 bg-cyan-950/15 border-2 border-amber-400/30"
        >
          search
        </button>
      </div>

      <div className="text-center">
        {riotAccount ? <SummonerPreview {...riotAccount} /> : loadMessage}
      </div>
    </form>
  );
};

export default TrackerForm;
