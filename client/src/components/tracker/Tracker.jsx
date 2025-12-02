import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);

  return (
    <div className="flex flex-col min-w-xl w-2xl bg-gray-950 rounded">
      <Summoner {...riotAccount} />
      <Matches puuid={riotAccount.puuid} />
    </div>
  );
}

export default Tracker;
