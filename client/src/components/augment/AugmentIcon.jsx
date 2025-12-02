function AugmentIcon(id) {
  console.log(id);
  return (
    <>
      <img
        key={id}
        src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/augment/${id}.png`}
        alt="augment"
        className="size-7 border border-gray-700 rounded-full"
      />
    </>
  );
}

export default AugmentIcon;
