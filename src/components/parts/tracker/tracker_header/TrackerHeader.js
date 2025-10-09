import SummonerProfile from "components/parts/tracker/summoner_profile/SummonerProfile";
import TrackerControls from "components/parts/tracker/tracker_controls/TrackerControls";

import "./TrackerHeader.css";

function TrackerHeader({ summoner }) {
  return (
    <div className="TrackerHeader">
      <SummonerProfile summoner={summoner} />
      <TrackerControls />
    </div>
  );
}

export default TrackerHeader;
