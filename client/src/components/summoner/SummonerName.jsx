function SummonerName({ gameName, tagLine }) {
  return (
    <div className="flex gap-2">
      <div className="text-xl text-blue-300">{gameName}</div>
      <div className="flex items-center text-sm text-neutral-500">
        {tagLine ? `#${tagLine}` : null}
      </div>
    </div>
  );
}

export default SummonerName;
