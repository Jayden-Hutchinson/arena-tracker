import Item from "../item/Item";
import ChampionIcon from "../champion/ChampionIcon";
import ChampionName from "../champion/ChampionName";
import Augment from "../augment/Augment";
import Placement from "../placement/Placement";

function Match({ puuid, match }) {
  console.log(match);
  const player = match.getPlayer(puuid);
  console.log(player);

  const duration = match.getDuration();
  const date = match.getDate();

  return (
    <div className="w-full rounded-lg bg-black/30 p-3">
      {/* Duration and Date */}
      <div className="flex h-fit items-center justify-between text-gray-400">
        <ChampionIcon championName={player.championName} />
        <div>
          <Placement placement={player.placement} />
          <ChampionName championName={player.championName} />
          <div className="flex flex-col text-xs text-gray-600">
            <div>{duration}</div>
          </div>
        </div>
        {/* TO DO  */}
        {/* <Augments />
      <Items />
      <KDA />
      <Damage /> */}

        {/* Augments */}
        <div className="grid grid-cols-3 grid-rows-2">
          {player.augments.map((augmentId, i) => (
            <Augment key={crypto.randomUUID()} id={augmentId} />
          ))}
        </div>

        {/* Icons */}
        <div className="grid grid-cols-3 grid-rows-2">
          {player.items.map((itemId) => (
            <Item key={crypto.randomUUID()} id={itemId} />
          ))}
        </div>

        <div className="flex w-25 justify-center text-sm">
          <div>{player.kills}/</div>
          <div>{player.deaths}/</div>
          <div>{player.assists}</div>
        </div>

        <div className="text-sm font-bold text-amber-500/60">
          {player.totalDamageDealtToChampions}
        </div>
      </div>
    </div>
  );
}

export default Match;
