
class Match {
    /**
     * @param {Player} mainPlayer
     * @param {Player} teammate
     */
    constructor(mainPlayer, teammate) {
        this.players = { mainPlayer, teammate }
        this.mainPlayer = mainPlayer;
        this.teammate = teammate;
    }
}