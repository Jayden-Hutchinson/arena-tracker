import { useState } from "react";

import { ClientApi } from "../../../api/api/clientApi";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const accountJson = await ClientApi.fetchRiotAccount(
      formData.gameName,
      formData.tagLine
    );

    console.log(accountJson);
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
