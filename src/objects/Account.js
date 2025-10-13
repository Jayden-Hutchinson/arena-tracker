class Account {
  constructor(gameName, tagLIne) {
    this.key = `${gameName}#${tagLIne}`;
    this.gameName = gameName;
    this.tagLine = tagLIne;
  }
}

export default Account;
