class MatchHistory {
  constructor() {
    this.matches = {};
  }

  add(match) {
    console.log(match)
    this.matches[match.id] = match
  }
}

export default MatchHistory;
