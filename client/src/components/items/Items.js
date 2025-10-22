import Item from "components/item/Item";
import "./Items.css";

function Items({ items }) {
  return (
    <div className="Items">
      {items &&
        items.map((itemId, index) => {
          return <Item key={`${index}${itemId}`} itemId={itemId} />;
        })}
    </div>
  );
}
export default Items;
