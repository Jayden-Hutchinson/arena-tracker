function SummonerIcon({ id, level }) {
  return (
    <div className="relative flex">
      <img
        className="bg-neutral-800 size-30 rounded-lg"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`}
        alt={`Icon ${id}`}
      />
      <div className="absolute py-1 px-2 bottom-0 right-0 text-xs text-amber-400 bg-gray-950 rounded-tl">
        {level ? level : "000"}
      </div>
    </div>
  );
}

export default SummonerIcon;
