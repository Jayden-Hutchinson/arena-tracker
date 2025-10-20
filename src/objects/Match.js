import { Player } from "objects/Player";

const FIRST = 1;

class Match {
  constructor({ metadata, info }) {
    this.metadata = metadata;
    this.info = info;
  }

  getPlayer(puuid) {
    const playerIndex = this.metadata.participants.indexOf(puuid);
    const player = this.info.participants[playerIndex];
    return new Player(player);
  }

  getTeammate(puuid, playerSubteamId) {
    console.log(puuid, playerSubteamId);
    const teammate = this.info.participants.find(
      (teammate) =>
        teammate.puuid !== puuid &&
        teammate.playerSubteamId === playerSubteamId,
    );
    console.log(teammate);
    return new Player(teammate);
  }

  getDate(info) {
    const date = new Date(this.info.gameCreation);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  getMatchDuration(info) {
    const totalSeconds = this.info.gameDuration;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  /**
   *
   * Check if the game is a win by player puuid
   *
   * @param {string} puuid
   */
  isFirst(puuid) {
    const player = this.getPlayer(puuid);
    return player.placement === FIRST;
  }
}

export default Match;
