const version = "15.19.1"; // replace with the patch you want

export const DDRAGON = {
  // JSON endpoints
  ITEM_JSON: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`,

  // Images
  CHAMPION_IMAGE: (championName) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`,

  ITEM_IMAGE: (itemImage) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImage}`,
  SUMMONER_ICON: (summonerIconId) =>
    `https://ddragon.leagueoflegends.com/cdn/15.19.1/img/profileicon/${summonerIconId}.png`,
};
