import Item from "../item/Item";
import ChampionIcon from "../champion/ChampionIcon";
import ChampionName from "../champion/ChampionName";
import Augment from "../augment/Augment";

function Match({ puuid, match }) {
  const player = match.getPlayer(puuid);
  console.log(player);

  return (
    <div className="flex justify-between h-fit w-full pr-5 text-gray-400 items-center py-2">
      <ChampionIcon championName={player.championName} />
      <ChampionName championName={player.championName} />

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

      <div className="flex w-25 justify-center">
        <div>{player.kills}/</div>
        <div>{player.deaths}/</div>
        <div>{player.assists}</div>
      </div>

      <div>{player.totalDamageDealtToChampions}</div>
    </div>
  );
}

export default Match;
