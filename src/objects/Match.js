import { Player } from "objects/Player";

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

    getTeammate(player) {
        if (!player) return null;
        const teammate = this.info.participants.find(
            (teammate) =>
                teammate.playerSubteamId === player.playerSubteamId &&
                teammate.puuid !== player.puuid
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
