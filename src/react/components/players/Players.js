import Player from "../player/Player.js";
import "./Players.css";

function Players({ players }) {
  return (
    players && (
      <div className="Players">
        {players.map((player, index) => {
          return <Player key={index} player={player} />;
        })}
      </div>
    )
  );
}

export default Players;

{
}
