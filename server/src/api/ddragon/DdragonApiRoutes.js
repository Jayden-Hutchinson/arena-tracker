const VERSION = "15.19.1";

const BASE_URL = {
    DDRAGON: `https://ddragon.leagueoflegends.com/cdn/${VERSION}`,
};

const ENDPOINT = {
    CHAMPION: `${BASE_URL.DDRAGON}/img/champion`,
    ITEM: `${BASE_URL.DDRAGON}/img/item`,
    PROFILE_ICON: `${BASE_URL.DDRAGON}/img/profileicon`,
};

export const ROUTE = {
    IMG: {
        CHAMPION: (championName) =>
            `${ENDPOINT.CHAMPION}/${championName}.png`,
        ITEM: (itemPng) =>
            `${ENDPOINT.ITEM}/${itemPng}`,
        PROFILE_ICON: (iconPng) =>
            `${ENDPOINT.PROFILE_ICON}/${iconPng}`,
    },
};