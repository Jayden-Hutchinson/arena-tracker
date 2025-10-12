import { useContext } from "react";
import { DDRAGON } from "api/ddragon";
import { ItemContext } from "App";

import "./Item.css";

function Item({ itemId }) {
  const items = useContext(ItemContext);
  const itemData = items[itemId];

  return (
    itemId > 0 && (
      <>
        <img
          className="Item"
          src={DDRAGON.ITEM_IMAGE(itemData.image.full)}
          alt={itemData.name}
        />
        {/* <div className="description"></div> */}
      </>
    )
  );
}
export default Item;
