import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);

  return (
    <div className="flex flex-col min-w-xl w-2xl p-10 bg-gray-950 rounded">
      <Summoner {...riotAccount} />
      <div className="flex w-full text-xs py-5 text-gray-400 justify-between">
        <div>Champion</div>
        <div>Augments</div>
        <div>Items</div>
        <div>KDA</div>
        <div>Damage</div>
      </div>
      <Matches puuid={riotAccount.puuid} />
    </div>
  );
}

export default Tracker;
