import "./MatchBanner.css";
import { FaChevronRight } from "react-icons/fa";
import ChampionPortrait from "../champion_portrait/ChampionPortrait";

function MatchBanner({ matchInfo, expanded }) {
  return (
    <div className="MatchBanner">
      <div className="chevron-wrapper">
        <FaChevronRight className={`chevron ${expanded ? "open" : "closed"}`} />

        {matchInfo.team && (
          <div className={`ChampionInfo ${expanded ? "open" : "closed"}`}>
            <ChampionPortrait
              championName={matchInfo.team.players[0].championName}
            />
            <div>{matchInfo.team.players[0].championName}</div>
          </div>
        )}
      </div>
      <div className="time-info">
        <div>{matchInfo.duration}</div>
        <div>{matchInfo.date}</div>
      </div>
    </div>
  );
}
export default MatchBanner;
