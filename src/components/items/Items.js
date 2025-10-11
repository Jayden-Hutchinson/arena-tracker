import Item from "components/item/Item";
import "./Items.css";

function Items({ items }) {
  return (
    <div className="Items">
      {items &&
        items.map((itemId) => {
          return <Item key={itemId} itemId={itemId} />;
        })}
    </div>
  );
}
export default Items;
