import { useState } from "react";

import { Client } from "api/client";
import "./TrackerSearch.css";

function TrackerSearch({ callback }) {
  const [formData, setFormData] = useState({
    gameName: "",
    tagLine: "",
  });

  const handleChange = (event) => {
    console.log(formData);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const account = await Client.fetchAccount(
      formData.gameName,
      formData.tagLine
    );

    if (account) {
      console.log(formData);
      callback(formData);
    }

    // onDataFetch(trackerAccount);
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
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}
export default TrackerSearch;
