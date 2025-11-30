import ServerApi from "../../api/server_api.js"

export async function fetchRiotAccount(gameName, tagLine) {
    try {
        var url;

        url = ServerApi.getAccountByGameNameUrl(gameName, tagLine);
        const accountByGameNameRes = await fetch(url);
        const accountData = await accountByGameNameRes.json();

        url = ServerApi.getAccountByPuuidUrl(accountData.puuid);
        const accountByPuuidRes = await fetch(url);
        const summonerData = await accountByPuuidRes.json();

        const fullAccount = { ...accountData, ...summonerData };
        console.log("Full Account", fullAccount);

        localStorage.setItem(fullAccount.puuid, JSON.stringify(fullAccount));
        return fullAccount
    } catch (err) {
        console.error("Error fetching data:", err);
        return "Failed to load data"
    }
};
export async function fetchMatches(puuid) {
    var url;

    url = ServerApi.getMatchesByPuuidUrl(puuid)
    const matchesByPuuidRes = await fetch(url)
    const matchesData = await matchesByPuuidRes.json()

    return matchesData
}