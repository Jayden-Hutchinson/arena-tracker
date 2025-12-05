import { useState } from "react";

function TrackedAccounts({ riotAccounts }) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }
  return (
    <div
      className={`relative bg-gray-600 ${expanded ? "w-70" : "w-0"} h-full transition-all duration-300`}
    >
      <button
        onClick={toggleExpanded}
        className={`absolute -right-10 z-1 flex size-10 items-center justify-center bg-red-900`}
      >
        {"<"}
      </button>
      {/* <SummonerPreview /> */}
    </div>
  );
}

export default TrackedAccounts;
