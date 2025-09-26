const version = "15.19.1"; // replace with the patch you want

export const DDRAGON = {
  // JSON endpoints
  CHAMPION_JSON: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
  ITEM_JSON: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`,

  // Images
  CHAMPION_IMAGE: (championName) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`,
  ITEM_IMAGE: (itemImage) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImage}`,
};
