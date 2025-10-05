import PlayerInfo from "../player_info/PlayerInfo.js";
import "./Players.css"

function Players({ players }) {
  console.log(players);
  return (
    players && (
      <div className="Players">
        {players.map((player, index) => {
          return <PlayerInfo key={index} player={player} />;
        })}
      </div>
    )
  );
}

export default Players;

{
}
