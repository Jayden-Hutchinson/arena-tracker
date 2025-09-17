import { Account } from "../account.js";
import { ClientApi } from "../../api/clientApi.js";

export class AccountManager {
  constructor() {
    this.accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  }

  createAccount(riotAccount, matchHistory) {
    console.log("creating account...");
    const existingAccount = this.accounts.find(
      (account) =>
        account.gameName === riotAccount.gameName &&
        account.tagLine === riotAccount.tagLine
    );

    if (existingAccount) {
      console.log("account already exists");
      return existingAccount;
    }

    const account = new Account(riotAccount, matchHistory);

    this.accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
    return account;
  }
}
