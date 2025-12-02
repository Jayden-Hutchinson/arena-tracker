import { useEffect, useState } from "react";
import ServerClient from "../../api/server_api/ServerClient";

function Tracker(riotAccount) {
  console.log("Tracker riot account", riotAccount);
  const [matches, setMatches] = useState(null);
  const [loadMessage, setLoadMessage] = useState("");

  // Augment URL
  // https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/augments.json

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    <div className="flex flex-col min-w-xl w-2xl bg-gray-950 rounded">
      {/* HEADER */}
      <div className="flex w-full gap-8 items-center border-b-2 border-gray-900">
        <div className="relative flex justify-center">
          <img
            className="bg-neutral-800 size-30 rounded-tl"
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${riotAccount.profileIconId}.jpg`}
            alt={`Icon ${riotAccount.profileIconId}`}
          />
          <div className="absolute py-1 px-2 bottom-0 right-0 text-xs text-amber-400 bg-gray-950 rounded-tl">
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
            const player = match.getPlayer(riotAccount.puuid);
            console.log(player);

            return (
              <div className="flex justify-between h-fit w-full pr-5 text-gray-400 items-center py-2 border-b-2 border-gray-900">
                <img
                  className="size-18 rounded"
                  src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/champion/${player.championName}.png`}
                  alt="champion portrait"
                />
                <div className="w-25">{player.championName}</div>

                <div className="grid grid-cols-3 grid-rows-2">
                  {[
                    player.playerAugment1,
                    player.playerAugment2,
                    player.playerAugment3,
                    player.playerAugment4,
                    player.playerAugment5,
                    player.playerAugment6,
                  ].map((augmentId, i) => (
                    <img
                      key={i}
                      src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/augment/${augmentId}.png`}
                      alt="augment"
                      className="size-7 border border-gray-700 rounded-full"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 grid-rows-2">
                  {[
                    player.item0,
                    player.item1,
                    player.item2,
                    player.item3,
                    player.item4,
                    player.item5,
                  ].map((itemId, i) => (
                    <img
                      className="size-8 border border-gray-700 rounded-xs"
                      key={i}
                      src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/item/${itemId}.png`}
                      alt="item"
                    />
                  ))}
                </div>

                <div className="flex w-25 justify-center">
                  <div>{player.kills}/</div>
                  <div>{player.deaths}/</div>
                  <div>{player.assists}</div>
                </div>

                <div>{player.totalDamageDealtToChampions}</div>
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
