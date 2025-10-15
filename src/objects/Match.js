import { Player } from "objects/Player";

class Match {
  constructor(id) {
    this.id = id;
    this.player = null;
    this.teammate = null;

    // this.metadata = metadata;
    // this.info = info;
  }

  getPlayer(puuid, participantIds, participantData) {
    const playerIndex = participantIds.indexOf(puuid);
    const player = participantData[playerIndex];
    return new Player(player);
  }

  getTeammate(puuid, playerSubteamId, participantData) {
    const teammate = participantData.find(
      (teammate) =>
        teammate.puuid !== puuid && teammate.playerSubteamId === playerSubteamId
    );
    return new Player(teammate);
  }

  getDate(info) {
    const date = new Date(info.gameCreation);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  getMatchDuration(info) {
    const totalSeconds = info.gameDuration;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export default Match;
