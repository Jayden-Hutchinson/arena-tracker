import { useState } from "react";

const TrackerForm = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameName || !tagLine) return; // simple validation

    // add new tracker
    setTrackers([...trackers, { gameName, tagLine }]);

    // reset input fields
    setGameName("");
    setTagLine("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 m-10">
      <input
        type="text"
        placeholder="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        className="p-1 bg-neutral-900"
      />
      <input
        type="text"
        placeholder="Tag Line"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
        className="p-1 bg-neutral-900"
      />
      <button type="submit" className="bg-gray-950 border-2 border-gray-900 text-gray-200 px-3">
        search
      </button>
    </form>
  );
};

export default TrackerForm;
