import ScoreCard from "components/player/ScoreCard";

import "./MatchCard.css";

function MatchCard({ puuid, match }) {
  // For when I add expanding functionality
  // const [open, setOpen] = useState(false);
  // const toggleOpen = () => setOpen((prev) => !prev);
  // const openClass = open ? "open" : "closed";
  // const teammate = match.getTeammate(puuid, player.playerSubteamId);

  const player = match.getPlayer(puuid);

  return (
    <li className="flex flex-row rounded-md bg-gray-950">
      <div className="players">
        {match && (
          <>
            <ScoreCard key={player.puuid} player={player} />
            {/* <ScoreCard key={teammate.puuid} player={teammate} /> */}
          </>
        )}
      </div>
    </li>
  );
}

export default MatchCard;
