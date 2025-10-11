import "./Kda.css";
function Kda({ kda }) {
  return (
    <div className="Kda">
      {kda.kills}/{kda.deaths}/{kda.assists}
    </div>
  );
}
export default Kda;
