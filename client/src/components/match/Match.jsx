import Item from "../item/Item";
import ChampionIcon from "../champion/ChampionIcon";
import ChampionName from "../champion/ChampionName";
import Augment from "../augment/Augment";

function Match({ puuid, match }) {
  console.log(match);
  const player = match.getPlayer(puuid);
  console.log(player);

  const duration = match.getDuration();
  const date = match.getDate();

  return (
    <div className="bg-black/30 rounded p-3 w-full">
      <div className="flex justify-between h-fit text-gray-400 items-center">
        <ChampionIcon championName={player.championName} />
        <div>
          <ChampionName championName={player.championName} />
        </div>
        {/* TO DO  */}
        {/* <Augments />
      <Items />
      <KDA />
      <Damage /> */}

        {/* Augments */}
        <div className="grid grid-cols-3 grid-rows-2">
          {player.augments.map((augmentId, i) => (
            <Augment key={augmentId} id={augmentId} />
          ))}
        </div>

        {/* Icons */}
        <div className="grid grid-cols-3 grid-rows-2">
          {player.items.map((itemId) => (
            <Item key={itemId} id={itemId} />
          ))}
        </div>

        <div className="flex w-25 text-sm justify-center">
          <div>{player.kills}/</div>
          <div>{player.deaths}/</div>
          <div>{player.assists}</div>
        </div>

        <div className="text-amber-500/60 text-sm font-bold">
          {player.totalDamageDealtToChampions}
        </div>
      </div>
      <div className="w-full text-xs flex justify-between text-gray-600">
        <div>{duration}</div>
        <div>{date}</div>
      </div>
    </div>
  );
}

export default Match;
