class ServerApi {
  static BASE_URL = "http://localhost:3000/arena-tracker/api";

  static getAccountByGameNameUrl(gameName, tagLine) {
    return `${ServerApi.BASE_URL}/riot/account/by-riot-id/?gameName=${gameName}&tagLine=${tagLine}`;
  }

  static getAccountByPuuidUrl(puuid) {
    return `${ServerApi.BASE_URL}/riot/account/by-puuid/?puuid=${puuid}`;
  }

  static getMatchesByPuuidUrl({
    puuid,
    startTime,
    endTime,
    queue,
    start,
    count,
  }) {
    const url = new URL(`riot/account/matches/by-puuid/`, `${this.BASE_URL}/`);

    const query = {};
    if (puuid !== undefined) query.puuid = puuid;
    if (startTime !== undefined) query.startTime = startTime;
    if (endTime !== undefined) query.endTime = endTime;
    if (queue !== undefined) query.queue = queue;
    if (start !== undefined) query.start = start;
    if (count !== undefined) query.count = count;

    url.search = new URLSearchParams(query);
    console.log(url.toString());
    return url.toString();
  }

  static getMatchByIdUrl(matchId) {
    return `${ServerApi.BASE_URL}/riot/match/?matchId=${matchId}`;
  }
}

export default ServerApi;
