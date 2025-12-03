class Save {
  static riotAccount(riotAccount, trackedRiotAccounts) {
    trackedRiotAccounts[riotAccount.puuid] = riotAccount;
    Save.trackedRiotAccounts(trackedRiotAccounts);
  }

  static trackedRiotAccounts(trackedRiotAccounts) {
    console.log(trackedRiotAccounts);
    const saveData = JSON.stringify(trackedRiotAccounts);
    localStorage.setItem("TrackedRiotAccounts", saveData);
    console.debug("Set TrackedRiotAccounts", trackedRiotAccounts);
  }
}
export default Save;
