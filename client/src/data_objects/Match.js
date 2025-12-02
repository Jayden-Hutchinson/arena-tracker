import Player from "./Player";

class Match {
  constructor({ info, metadata }) {
    Object.assign(this, { info, metadata });
  }

  getDuration() {
    const totalSeconds = this.info.gameDuration;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const duration = `${minutes}:${seconds}`;
    return duration;
  }

  getDate() {
    const date = new Date(this.info.gameCreation);

    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    console.log(formattedDate);
    return formattedDate;
  }

  getPlayer(puuid) {
    const playerIndex = this.metadata.participants.indexOf(puuid);
    const playerData = this.info.participants[playerIndex];
    return new Player(playerData);
  }
}

export default Match;
