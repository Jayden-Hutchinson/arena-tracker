import { Account } from "../account.js";
import { Api } from "../api/api.js";

export class AccountManager {
    constructor() {
        this.accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    }

    async createAccount(username, tagLine) {
        console.log("creating account...")
        const existingAccount = this.accounts.find(
            (account) => account.gameName === username && account.tagLine === tagLine
        );

        if (existingAccount) {
            console.log("account already exists");
            return existingAccount;
        }

        const riotAccount = await Api.fetchRiotAccount(username, tagLine);
        const matchHistory = await Api.fetchMatches(riotAccount.puuid);

        const account = new Account(riotAccount, matchHistory);

        this.accounts.push(account);
        localStorage.setItem("accounts", JSON.stringify(this.accounts));
        return account;
    }
}