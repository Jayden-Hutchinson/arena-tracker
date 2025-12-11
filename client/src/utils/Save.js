const RIOT_ACCOUNT_KEY = "RiotAccounts";

class Save {
  static riotAccount(riotAccount) {
    trackedRiotAccounts[riotAccount.puuid] = riotAccount;
    const saveData = JSON.stringify(trackedRiotAccounts);
    localStorage.setItem(RIOT_ACCOUNT_KEY, saveData);
    return trackedRiotAccounts;
  }

  static riotAccounts(riotAccounts) {
    const saveData = JSON.stringify(riotAccounts);
    localStorage.setItem(RIOT_ACCOUNT_KEY, saveData);
    console.debug("Saved Riot Accounts", riotAccounts);
    return riotAccounts;
  }
}
export default Save;
