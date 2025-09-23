
import "./MatchHistory.css";

function MatchHistory({ history = [] }) {
    return (
        <div className="MatchHistory">
            {history.map((match) => {
                return <div>{match}</div>
            })}
        </div >
    );
}

export default MatchHistory;