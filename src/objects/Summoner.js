
class Summoner {
    constructor(accountDTO, summonerDTO, matchIdList) {
        console.log("here")
        this.riot = accountDTO;

        this.profile = summonerDTO;
        // this.gameName = riotAccount.gameName;
        // this.puuid = riotAccount.puuid;
        // this.tagLine = riotAccount.tagLine;
        // this.level = summonerAccount.summonerLevel;
        // this.iconId = summonerAccount.profileIconId;
        this.matchIdList = matchIdList;
    }
}

export default Summoner;