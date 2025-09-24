import { useState } from "react";

import { ClientApi } from "../../../api/clientApi";

function TrackerSearch({ onDataFetch }) {
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

    const account = await ClientApi.fetchRiotAccount(
      formData.gameName,
      formData.tagLine
    );

    const summoner = await ClientApi.fetchSummoner(account.puuid);

    const matchHistory = await ClientApi.fetchMatchHistory(account.puuid);

    const trackerAccount = {
      gameName: account.gameName,
      puuid: account.puuid,
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
      matchHistory: matchHistory,
    };

    console.log(trackerAccount);

    onDataFetch(trackerAccount);
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
