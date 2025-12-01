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
      <img
        className="bg-neutral-800 border-2 border-gray-900 size-20"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${riotAccount.profileIconId}.jpg`}
        alt={`Icon ${riotAccount.profileIconId}`}
      />
    );
    const summonerLevel = (
      <div className="absolute -bottom-2 text-xs bg-gray-950 px-1 rounded-lg border-2 border-gray-900">
        {riotAccount.summonerLevel}
      </div>
    );

    return (
      <div className="flex flex-col min-w-xl bg-gray-950 border-2 border-gray-900">
        <div className="flex w-full gap-8 items-center p-5">
          <div className="bg-white relative flex justify-center items-center">
            {profileIcon}
            {summonerLevel}
          </div>

          <div>
            <div className="text-xl text-amber-300">{riotAccount.gameName}</div>
            <div className="text-sm text-neutral-500">
              #{riotAccount.tagLine}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {matches
            ? matches.map((matchId) => (
                <div className="flex p-2 items-center h-20" key={matchId}>
                  {matchId}
                </div>
              ))
            : "Loading Matches"}
        </div>
      </div>
    );
  }
}

export default Tracker;
