/**
 * Load is used for local host saving
 * Each method return the item save by the key created
 * Params are what is needed to make the key
 */
class Load {
  static _formattedLog(string) {
    console.log(`[load] ${string}`);
  }
  static riotAccounts() {
    const riotAccounts = localStorage.getItem("RiotAccounts");
    const data = JSON.parse(riotAccounts) || {};
    this._formattedLog("riot accounts");
    console.log(data);
    return JSON.parse(riotAccounts) || {};
  }
}

export default Load;
