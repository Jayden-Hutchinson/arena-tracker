import React from "react";
import ServerClient from "../../api/server_api/ServerClient";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: null,
    };
  }

  async componentDidMount() {
    const { puuid } = this.props;
    const matches = await ServerClient.fetchMatches(puuid);
    this.setState({ matches });
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  render() {
    const { matches } = this.state;
    const riotAccount = this.props;

    const profileIcon = (
      <div className="relative flex justify-center">
        <img
          className="bg-neutral-800 border-2 border-gray-700 size-20 rounded"
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${riotAccount.profileIconId}.jpg`}
          alt={`Icon ${riotAccount.profileIconId}`}
        />
        <div className="absolute -bottom-2 text-xs text-amber-400 bg-gray-950 px-1 rounded-lg border-2 border-gray-700">
          {riotAccount.summonerLevel}
        </div>
      </div>
    );

    const gameName = (
      <div className="flex gap-2">
        <div className="text-xl text-blue-300">{riotAccount.gameName}</div>
        <div className="flex items-center text-sm text-neutral-500">
          #{riotAccount.tagLine}
        </div>
      </div>
    )

    return (
      <div className="flex flex-col min-w-xl bg-gray-950 border-2 border-gray-700 rounded">
        {/* HEADER */}
        <div className="flex w-full gap-8 items-center p-5 border-b-2 border-gray-900">
          {profileIcon}
          {gameName}
        </div>

        {/* MATCHES */}
        <div className="flex flex-col">
          {matches
            ? matches.map((matchId) => (
              <div className="flex justify-between text-gray-400 p-5 items-center h-22 border-b-2 border-gray-900" key={matchId}>
                <img src="" alt="champion portrait" className="size-18 border-2 border-gray-700 rounded" />
                <div>champion name</div>
                <div className="grid grid-cols-3 grid-rows-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <img src="" alt="augment" className="size-7 border border-gray-700 rounded-xs" />
                  ))}
                </div>

                <div className="grid grid-cols-3 grid-rows-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <img src="" alt="item" className="size-8 border border-gray-700 rounded-xs" />
                  ))}
                </div>
                <div>k/d/a</div>
                <div>damage</div>
              </div>
            ))
            : "Loading Matches"}
        </div>
      </div >
    );
  }
}

export default Tracker;
