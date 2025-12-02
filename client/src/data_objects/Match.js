import Player from "./Player";

class Match {
  constructor({ info, metadata }) {
    Object.assign(this, { info, metadata });
  }

  getPlayer(puuid) {
    const playerIndex = this.metadata.participants.indexOf(puuid);
    const playerData = this.info.participants[playerIndex];
    return new Player(playerData);
  }
}

export default Match;
