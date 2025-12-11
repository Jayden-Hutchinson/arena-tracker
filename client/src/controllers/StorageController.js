import Load from "../utils/Load";
import Save from "../utils/Save";

class StorageController {
  constructor() {
    this.riotAccounts = Load.riotAccounts();
    this.listeners = [];
  }

  subscribe(listener) {
    console.log("Subscribed");
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    console.debug("Riot Accounts Set", this.riotAccounts);
    this.listeners.forEach((listener) => {
      listener(this.riotAccounts);
    });
  }

  saveRiotAccount(riotAccount) {
    const puuid = riotAccount.puuid;

    if (puuid in this.riotAccounts) {
      console.debug("Account already exists");
      return;
    }

    this.riotAccounts[puuid] = riotAccount;
    Save.riotAccounts(this.riotAccounts);

    console.debug(
      "Riot account saved",
      riotAccount,
      "Saved Accounts",
      this.riotAccounts,
    );

    this.notifyListeners();
  }

  deleteRiotAccount(riotAccount) {
    const puuid = riotAccount.puuid;
    delete this.riotAccounts[puuid];
    Save.riotAccounts(this.riotAccounts);
    this.notifyListeners();
  }
}

export const storageController = new StorageController();
