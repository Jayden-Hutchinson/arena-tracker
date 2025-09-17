import { MatchHistory } from "./matchHistory.js";
import { RiotAccount } from "./riotAccount.js";

export class Tracker {
  constructor(riotAccount, matchHistory) {
    this.riotAccount = riotAccount;
    this.matchHistory = matchHistory;
  }
}
