function ItemIcon({ id }) {
  return (
    <img
      className="size-8 border border-gray-700 rounded-xs"
      key={id}
      src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/item/${id}.png`}
      alt="item"
    />
  );
}

export default ItemIcon;
