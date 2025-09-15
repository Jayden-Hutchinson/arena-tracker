import { MatchHistory } from "./matchHistory";

export class Account {
  constructor() {
    this.profile = new Profile();
    this.matchHistory = new MatchHistory();
  }
}
