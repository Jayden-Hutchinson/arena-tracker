function Match({ puuid, data }) {
  console.log(data);

  const playerInfo = getPlayer(data.info.participants, puuid);
  console.log(playerInfo);
  return (
    <li className="Match">
      {data && (
        <div>
          <p>{data.info.gameMode}</p>
          <p>{puuid}</p>
        </div>
      )}
      {/* <Player />
      <Player />
      <ChampionStats />
      <Augments />
      <Items />
      <DamageDealt /> */}
    </li>
  );
}
function getPlayer(players, puuid) {
  const playerIndex = players.findIndex((player) => player.puuid === puuid);
  return playerIndex;
}
export default Match;
