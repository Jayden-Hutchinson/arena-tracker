const ACCOUNTS = "Accounts";
class AccountManager {
  constructor() {
    this.accounts = JSON.parse(localStorage.getItem(ACCOUNTS)) || [];
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
