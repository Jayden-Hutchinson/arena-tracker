import ItemIcon from "../item/ItemIcon";

function Item({ id }) {
  return (
    <div className="relative group inline-block">
      <ItemIcon id={id} />
      <div
        className="absolute left-1/2 -translate-x-1/2 
               bottom-full mb-3
               hidden group-hover:block
               bg-gray-800 text-white text-sm 
               px-3 py-2 rounded shadow-lg"
      >
        Item Description.
        <div
          className="absolute left-1/2 -translate-x-1/2 
                    top-full -translate-y-1/2
                    w-3 h-3 bg-gray-800 rotate-45"
        ></div>
      </div>
    </div>
  );
}

export default Item;
