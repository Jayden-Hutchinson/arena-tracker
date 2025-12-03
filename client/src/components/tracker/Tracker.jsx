import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);

  return (
    <div className="flex flex-col min-w-xl w-2xl bg-cyan-950/15 border-2 border-amber-400/30">
      <Summoner {...riotAccount} />
      <Matches puuid={riotAccount.puuid} />
    </div>
  );
}

export default Tracker;
