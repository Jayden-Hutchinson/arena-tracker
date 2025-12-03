import Load from "../utils/Load";
import Save from "../utils/Save";
import Delete from "../utils/Delete";

class StorageController {
  constructor() {
    this.riotAccounts = Load.riotAccounts();
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  setRiotAccounts(newState) {
    console.log("setting listeners", newState);
    this.riotAccounts = { ...this.riotAccounts, ...newState };
    this.listeners.forEach((listener) => listener(this.riotAccounts));
  }

  saveRiotAccount(riotAccount) {
    if (riotAccount.puuid in this.riotAccounts) {
      console.debug("Account already exists");
      return;
    }
    this.riotAccounts[riotAccount.puuid] = riotAccount;
    return this.riotAccounts;
  }

  deleteRiotAccount(riotAccount) {
    this.riotAccounts = Load.riotAccounts();
    this.riotAccounts = Delete.riotAccount(riotAccount, this.riotAccounts);
    this.riotAccounts = Save.riotAccounts(this.riotAccounts);
    return this.riotAccounts;
  }
}

export const storageController = new StorageController();
