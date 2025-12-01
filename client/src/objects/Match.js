class Match {
  constructor({ info, metadata }) {
    Object.assign(this, { info, metadata });
  }

  getPlayer(puuid) {
    const playerIndex = this.metadata.participants.indexOf(puuid);
    return this.info.participants[playerIndex];
  }
}

export default Match;
