class RiotApi {
  static API_KEY;

  static setApiKey(apiKey) {
    this.API_KEY = apiKey;
  }
  /**
   * host url for riot api
   */
  static BASE_URL = "api.riotgames.com";

  /**
   * Platform
   * na1.api.riotgames.com
   */
  static PLATFORM_URL = `https://na1.${RiotApi.BASE_URL}`;

  /**
   * Region
   * americas.api.riotgames.com
   */
  static REGION_URL = `https://americas.${RiotApi.BASE_URL}`;

  static getAccountByGameNameUrl(gameName, tagLine) {
    const encodedGameName = encodeURIComponent(gameName);
    const encodedTagLine = encodeURIComponent(tagLine);
    return `${RiotApi.REGION_URL}/riot/account/v1/accounts/by-riot-id/${encodedGameName}/${encodedTagLine}`;
  }

  static getAccountByPuuidUrl(puuid) {
    const encodedPuuid = encodeURIComponent(puuid);
    return `${RiotApi.PLATFORM_URL}/lol/summoner/v4/summoners/by-puuid/${encodedPuuid}`;
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
      `/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      this.REGION_URL,
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

  static getMatchByIdUrl(matchId) {
    const encodedMatchId = encodeURIComponent(matchId);
    return `${RiotApi.REGION_URL}/lol/match/v5/matches/${encodedMatchId}`;
  }

  static async fetch(url) {
    const header = { headers: { "X-Riot-Token": this.API_KEY } };
    const response = await fetch(url, header);

    const data = await response.json();
    if (!response.ok) {
      log(`Error (${response.status}): ${data.status.message}\n${url}`);
    }

    return data;
  }
}

function log(string) {
  console.log(`[riotapi] ${string}`);
}

module.exports = { RiotApi };
