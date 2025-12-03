class Delete {
  static riotAccount(riotAccount, trackedRiotAccounts) {
    console.log(riotAccount);
    delete trackedRiotAccounts[riotAccount.puuid];
    console.debug("DELETE", trackedRiotAccounts);
  }
}

export default Delete;
