import Summoner from "../summoner/Summoner";
import Matches from "../matches/Matches";

function Tracker(riotAccount) {
  const handleDelete = (event) => {};

  return (
    <div className="relative flex h-fit p-2 w-2xl flex-col border border-amber-500/30 bg-cyan-950/25">
      <Summoner {...riotAccount} />
      <Matches puuid={riotAccount.puuid} />
      <button
        className="absolute top-0.5 right-0.5 flex size-8 cursor-pointer items-center justify-center text-xl font-bold text-amber-500/30 hover:text-amber-500/40"
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}

export default Tracker;
