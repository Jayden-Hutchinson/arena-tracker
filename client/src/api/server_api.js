class ServerApi {
  static API_KEY;
  static setApiKey(apiKey) {
    this.API_KEY = apiKey;
  }
  /**
   * host url for riot api
   */
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
    const url = new URL(
      `riot/account/matches/by-puuid/?puuid=${puuid}`,
      `${this.BASE_URL}/`
    );

    const query = {};

    if (startTime !== undefined) query.startTime = startTime;
    if (endTime !== undefined) query.endTime = endTime;
    if (queue !== undefined) query.queue = queue;
    if (start !== undefined) query.start = start;
    if (count !== undefined) query.count = count;

    url.search = new URLSearchParams(query);

    return url.toString();
  }
}

function log(string) {
  console.log(`[riotapi] ${string}`);
}

export default ServerApi;
