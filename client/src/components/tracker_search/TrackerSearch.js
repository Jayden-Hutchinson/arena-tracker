import { useState } from "react";

import { ClientApi } from "api/clientApi";
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
    const account = await ClientApi.fetchRiotAccountByGameName(
      formData.gameName,
      formData.tagLine,
    );

    if (account) {
      console.log(formData);
      callback(formData);
    }

    // onDataFetch(trackerAccount);
  };

  return (
    <form onSubmit={handleSubmit} className="TrackerSearch">
      <label>Add Tracker</label>
      <div>
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
      </div>
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}
export default TrackerSearch;
