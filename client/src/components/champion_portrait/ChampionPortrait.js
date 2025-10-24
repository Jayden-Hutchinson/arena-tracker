import "./ChampionPortrait.css";

function ChampionPortrait({ championName }) {
  return (
    <div>{championName}</div>
    // <img
    //   className="ChampionPortrait"
    //   src={DDRAGON.CHAMPION_IMAGE(championName)}
    //   alt={championName}
    // />
  );
}

export default ChampionPortrait;
