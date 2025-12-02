class Save {
  static riotAccount(riotAccount) {
    const gameName = riotAccount.gameName;
    const tagLine = riotAccount.tagLine;

    const key = `${gameName}#${tagLine}`;
    localStorage.setItem(key, JSON.stringify(riotAccount));
  }

  static trackedRiotAccounts(trackedRiotAccounts) {
    localStorage.setItem(
      "TrackedRiotAccounts",
      JSON.stringify(trackedRiotAccounts)
    );
  }
}
export default Save;
