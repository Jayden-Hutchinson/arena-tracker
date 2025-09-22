import { useEffect, useState } from "react";
import { fetchRiotAccount } from "../../api/clientApi.js"

function Tracker(gameName, tagLine) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchRiotAccount(gameName, tagLine).then(data => setUser(data))
    }, [])

    if (!user) return <p>Loading...</p>


    return (
        <div className="Tracker">
            <RiotAccount />
            <MatchHistory />
        </div>
    );
}
export default Tracker;
