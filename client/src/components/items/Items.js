function Items(items) {
  return (
    <div className="Items">
      {augments.map((augment, index) => {
        <img
          key={index}
          className="Augment"
          src={augment.img}
          alt={augment.name}
        />;
      })}
    </div>
  );
}
export default Items;
