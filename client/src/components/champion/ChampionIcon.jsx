function ChampionIcon({ championName }) {
  return (
    <img
      className="size-18 rounded"
      src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/champion/${championName}.png`}
      alt="champion portrait"
    />
  );
}

export default ChampionIcon;
