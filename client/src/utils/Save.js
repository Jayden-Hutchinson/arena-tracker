const RIOT_ACCOUNT_KEY = "RiotAccounts";

class Save {
  static riotAccount(riotAccount, trackedRiotAccounts) {
    trackedRiotAccounts[riotAccount.puuid] = riotAccount;
    return trackedRiotAccounts;
  }

  static riotAccounts(riotAccounts) {
    console.log(RIOT_ACCOUNT_KEY, riotAccounts);
    const saveData = JSON.stringify(riotAccounts);
    localStorage.setItem(RIOT_ACCOUNT_KEY, saveData);
    return riotAccounts;
  }
}
export default Save;
