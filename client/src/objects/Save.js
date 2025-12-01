class Save {
  static riotAccount(riotAccount) {
    const gameName = riotAccount.gameName;
    const tagLine = riotAccount.tagLine;

    const key = `${gameName}#${tagLine}`;
    localStorage.setItem(key, JSON.stringify(riotAccount));
    console.info(`${key} Saved.`, riotAccount);
  }
}
export default Save;
