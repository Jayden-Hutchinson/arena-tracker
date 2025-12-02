import { useEffect, useState } from "react";
import ServerClient from "../../api/server_api/ServerClient";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);
  const [matches, setMatches] = useState(null);
  const [loadMessage, setLoadMessage] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      const matchIds = await ServerClient.fetchMatches(riotAccount.puuid);

      if (matchIds.message) {
        setLoadMessage(matchIds.message);
        console.error(matchIds.message);
        return;
      }

      const matches = [];
      var loadCount = 0;
      for (const matchId of matchIds) {
        setLoadMessage(`loading matches ${loadCount++}/${matchIds.length}`);

        await delay(100);

        const match = await ServerClient.fetchMatch(matchId);

        if (match.message) {
          setLoadMessage(match.message);
          return;
        }

        matches.push(match);
      }
      setMatches(matches);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-w-xl bg-gray-950 border-2 border-gray-700 rounded">
      {/* HEADER */}
      <div className="flex w-full gap-8 items-center p-5 border-b-2 border-gray-900">
        <div className="relative flex justify-center">
          <img
            className="bg-neutral-800 border-2 border-gray-700 size-20 rounded"
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${riotAccount.profileIconId}.jpg`}
            alt={`Icon ${riotAccount.profileIconId}`}
          />
          <div className="absolute -bottom-2 text-xs text-amber-400 bg-gray-950 px-1 rounded-lg border-2 border-gray-700">
            {riotAccount.summonerLevel ? riotAccount.summonerLevel : "000"}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="text-xl text-blue-300">{riotAccount.gameName}</div>
          <div className="flex items-center text-sm text-neutral-500">
            {riotAccount.tagLine ? `#${riotAccount.tagLine}` : null}
          </div>
        </div>
      </div>

      {/* MATCHES */}
      <div className="flex flex-col items-center">
        {matches ? (
          matches.map((match) => {
            console.log(match);
            const player = match.getPlayer(puuid);
            console.log(player);

            return (
              <div className="flex justify-between w-full text-gray-400 p-5 items-center h-22 border-b-2 border-gray-900">
                <img
                  src=""
                  alt="champion portrait"
                  className="size-18 border-2 border-gray-700 rounded"
                />
                <div className="w-25">{player.championName}</div>

                <div className="grid grid-cols-3 grid-rows-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <img
                      key={i}
                      src=""
                      alt="augment"
                      className="size-7 border border-gray-700 rounded-full"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 grid-rows-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <img
                      key={i}
                      src=""
                      alt="item"
                      className="size-8 border border-gray-700 rounded-xs"
                    />
                  ))}
                </div>

                <div>k/d/a</div>
                <div>damage</div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center h-20 p-5">{loadMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Tracker;
