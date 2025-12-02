/**
 * Load is used for local host saving
 * Each method return the item save by the key created
 * Params are what is needed to make the key
 */
class Load {
  /**
   * Load the riot account object saved at "{gameName}#{tagLine}"
   * @param {string} gameName
   * @param {string} tagLine
   * @returns
   */
  static riotAccount(gameName, tagLine) {
    const key = `${gameName}#${tagLine}`;
    return JSON.parse(localStorage.getItem(key));
  }

  static trackedRiotAccounts() {
    return JSON.parse(localStorage.getItem("TrackedRiotAccounts"));
  }
}

export default Load;
