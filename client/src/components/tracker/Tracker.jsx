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
    const {matches} = this.state
    const riotAccount = this.props;

    return (
      <div className="flex flex-col min-w-xl items-center bg-neutral-900 rounded-2xl p-10">
        <div className="flex gap-8 items-center mb-10">
          <div className="relative flex justify-center">
            <img
              className="rounded-full bg-neutral-800 border-2 border-amber-400 size-20"
              src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${riotAccount.profileIconId}.png`}
              alt="Summoner Icon"
            />
            <div className="absolute -bottom-2 text-xs bg-neutral-900 px-1 rounded-lg border-2 border-amber-400">
              {riotAccount.summonerLevel}
            </div>
          </div>

          <div>
            <div className="text-lg">{riotAccount.gameName}</div>
            <div className="text-sm text-neutral-500">
              #{riotAccount.tagLine}
            </div>
          </div>
        </div>

        {matches
          ? matches.map((matchId) => <div key={matchId}>{matchId}</div>)
          : "Loading Matches"}
      </div>
    );
  }
}

export default Tracker;
