function PlayerInfo(championImage, gameName, championName) {
  return (
    <div className="PlayerInfo">
      <img className="ChampionImage" src={championImage} alt={championName} />
      <div className="PlayerNames">
        <div className="GameName">{gameName}</div>
        <div className="ChampionName">{championName}</div>
      </div>
    </div>
  );
}
export default PlayerInfo;
