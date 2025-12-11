function SummonerIcon({ id, level }) {
  return (
    <div className="relative flex justify-center">
      <img
        className="size-30 rounded-full border-3 border-amber-500/30 bg-neutral-800"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`}
        alt={`Icon ${id}`}
      />
      <div className="absolute -bottom-2 rounded-full border-2 border-amber-400/30 bg-gray-950 px-2 text-sm text-amber-400">
        {level ? level : "000"}
      </div>
    </div>
  );
}

export default SummonerIcon;
