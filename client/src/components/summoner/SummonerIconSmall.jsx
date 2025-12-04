function SummonerIconSmall({ id, level }) {
  return (
    <div className="relative flex justify-center">
      <img
        className="bg-neutral-800 size-10 rounded-full border-2 border-amber-400/30"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`}
        alt={`Icon ${id}`}
      />
    </div>
  );
}

export default SummonerIconSmall;
