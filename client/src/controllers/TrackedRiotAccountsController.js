import Load from "../utils/Load";
import Save from "../utils/Save";
import Delete from "../utils/Delete";

class TrackedRiotAccountsController {
  static loadAll() {
    return Load.trackedRiotAccounts();
  }

  static saveRiotAccount(riotAccount) {
    const trackedRiotAccounts = Load.trackedRiotAccounts();
    if (riotAccount.puuid in trackedRiotAccounts) {
      console.debug("Account already exists");
    }

    Save.riotAccount(riotAccount, trackedRiotAccounts);
    console.debug("Saved", riotAccount);
  }

  static deleteRiotAccount(riotAccount) {
    console.log(riotAccount);
    const trackedRiotAccounts = Load.trackedRiotAccounts();
    Delete.riotAccount(riotAccount, trackedRiotAccounts);
    console.debug("Deleted", riotAccount);
    console.log(trackedRiotAccounts);

    Save.trackedRiotAccounts(trackedRiotAccounts);
    console.debug("Saved", trackedRiotAccounts);
  }
}

export default TrackedRiotAccountsController;
