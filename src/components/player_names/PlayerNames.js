import "./PlayerNames.css";

function PlayerNames({ gameName, championName }) {
  console.log(gameName, championName);
  return (
    <div className="PlayerNames">
      {gameName && <div className="game-name">{gameName}</div>}

      <div className="champion-name">{championName}</div>
    </div>
  );
}
export default PlayerNames;
