/**
 * Load is used for local host saving
 * Each method return the item save by the key created
 * Params are what is needed to make the key
 */
class Load {
  static riotAccounts() {
    const riotAccounts = localStorage.getItem("RiotAccounts");
    const data = JSON.parse(riotAccounts) || {};
    console.debug("Loaded Riot Accounts", data);
    return data;
  }
}

export default Load;
