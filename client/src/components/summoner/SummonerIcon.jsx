function SummonerIcon({ id, level }) {
  return (
    <div className="relative flex justify-center">
      <img
        className="bg-neutral-800 size-15 rounded-full border-2 border-amber-400/30"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`}
        alt={`Icon ${id}`}
      />
      <div className="absolute px-1 -bottom-2 text-xs text-amber-400 bg-gray-950 rounded-full border-2 border-amber-400/30">
        {level ? level : "000"}
      </div>
    </div>
  );
}

export default SummonerIcon;
