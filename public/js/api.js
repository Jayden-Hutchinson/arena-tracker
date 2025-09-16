export class Api {
  static async fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }
  static async fetchRiotAccount(gameName, tagline) {
    return this.fetchJson(`/account?username=${gameName}&tagline=${tagline}`);
  }

  static async fetchMatchHistory(puuid) {
    return this.fetchJson(`/account/history?puuid=${puuid}`);
  }

  static async fetchMatch(matchId) {
    return this.fetchJson(`/match/data?matchId=${matchId}`);
  }

  //   const augments = await fetchAugments();
  //   const items = await fetchItems();
}
