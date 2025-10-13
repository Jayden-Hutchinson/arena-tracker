class MatchHistory {
  constructor() {
    this.matches = {};
  }

  add(match) {
    this.matches[match.id] = match
  }
}

export default MatchHistory;
