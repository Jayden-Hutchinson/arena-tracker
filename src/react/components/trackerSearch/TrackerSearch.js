import { useState } from "react";

function TrackerSearch() {
  const [formData, setFormData] = useState({
    gameName: "",
    tagLine: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="TrackerSearch">
      <input
        className="gameNameInput"
        name="gameName"
        type="text"
        onChange={handleChange}
        placeholder="Summoner name"
      />
      <input
        className="tagLineInput"
        name="tagLine"
        type="text"
        onChange={handleChange}
        placeholder="#tag"
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default TrackerSearch;
