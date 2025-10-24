import "./Item.css";

function Item({ itemId }) {
  return (
    itemId && (
      <>
        {itemId}
        {/* <img
          className="Item"
          src={DDRAGON.ITEM_IMAGE(itemData.image.full)}
          alt={itemData.name}
        /> */}
        {/* <div className="description"></div> */}
      </>
    )
  );
}
export default Item;
