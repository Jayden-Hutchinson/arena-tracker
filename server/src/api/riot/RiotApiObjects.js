export class AccountDto {
  constructor({ gameName, puuid, tagLine }) {
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
  }
}

export class SummonerDto {
  constructor({ profileIconId, summonerLevel }) {
    this.profileIconId = profileIconId;
    this.summonerLevel = summonerLevel;
  }
}

export class MatchDto {
  constructor({ info, metadata }) {
    this.info = info;
    this.metadata = metadata;
  }
}
