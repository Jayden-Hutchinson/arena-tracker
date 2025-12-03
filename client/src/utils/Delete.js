class Delete {
  static riotAccount(riotAccount, trackedRiotAccounts) {
    console.log(riotAccount);
    delete trackedRiotAccounts[riotAccount.puuid];
    return trackedRiotAccounts;
  }
}

export default Delete;
