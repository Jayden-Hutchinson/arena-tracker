import { DDRAGON } from "../../../api/ddragon";

import "./ChampionPortrait.css";

function ChampionPortrait({ championName }) {
  return (
    <img
      className=" ChampionPortrait"
      src={DDRAGON.CHAMPION_IMAGE(championName)}
      alt={championName}
    />
  );
}

export default ChampionPortrait;
