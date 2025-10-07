
class Summoner {
    constructor(riotAccount, summonerAccount, matchIds = []) {
        this.gameName = riotAccount.gameName;
        this.puuid = riotAccount.puuid;
        this.tagLine = riotAccount.tagLine;
        this.level = summonerAccount.summonerLevel;
        this.iconId = summonerAccount.profileIconId;
        this.matchIds = matchIds;
    }
}

export default Summoner;