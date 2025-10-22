import StorageManager from "./StorageManager";

const ACCOUNTS = "Accounts";
const EMPTY = [];

class AccountManager {
  constructor() {
    const storedAccounts = localStorage.getItem(ACCOUNTS) || EMPTY;
    if (storedAccounts != EMPTY)
      this.accounts = JSON.parse(storedAccounts) || EMPTY;
  }

  async getSummonerData(accounts) {
    const summoners = EMPTY;
    for (const account of this.accounts) {
      const summoner = await StorageManager.getSummonerData(account);
      localStorage.setItem(account.puuid, JSON.stringify(account));
    }
  }

  addAccount(account) {
    console.log("Adding", account);
    this.accounts.push(account);
  }

  static setAccounts() {
    console.log(ACCOUNTS, this.accounts);
    localStorage.setItem(ACCOUNTS, JSON.stringify(this.accounts));
  }
}

export default AccountManager;
