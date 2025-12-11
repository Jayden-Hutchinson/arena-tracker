import { useState } from "react";

function TrackedAccounts({ riotAccounts }) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }
  return (
    <div
      className={`relative bg-cyan-950/25 ${expanded ? "w-70" : "w-0 -left-0.5"} h-full transition-all duration-300 border-r-2 border-amber-500/30`}
    >
      <button
        onClick={toggleExpanded}
        className={`absolute -right-10.5 z-1 flex size-10 items-center justify-center bg-cyan-950/25 border-2 border-l-0 border-t-0 border-amber-500/30`}
      >
        {"<"}
      </button>
      {/* <SummonerPreview /> */}
    </div>
  );
}

export default TrackedAccounts;
