import AugmentIcon from "./AugmentIcon";

function Augment({ id }) {
  return (
    <div className="relative group inline-block">
      <AugmentIcon id={id} />
      <div
        className="absolute left-1/2 -translate-x-1/2 
               bottom-full mb-3
               hidden group-hover:block
               bg-gray-800 text-white text-sm 
               px-3 py-2 rounded shadow-lg"
      >
        Augment Description.
        <div
          className="absolute left-1/2 -translate-x-1/2 
                    top-full -translate-y-1/2
                    w-3 h-3 bg-gray-800 rotate-45"
        ></div>
      </div>
    </div>
  );
}

export default Augment;
