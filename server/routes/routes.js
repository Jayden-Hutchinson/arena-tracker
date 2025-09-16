const DDRAGON_VERSION = "15.18.1"

export const API_ROUTES = {
    RIOT: {
        ACCOUNT_BY_NAME: "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/",
        MATCHES_BY_PUUID: "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/",
        MATCH_BY_ID: "https://americas.api.riotgames.com/lol/match/v5/matches/"
    },

    DDRAGON: {
        CHAMPIONS: `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion.json`,
        IMG: `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/`,

    },

    CDRAGON: {
        AUGMENTS: "https://raw.communitydragon.org/latest/cdragon/arena/en_us.json",
        AUGMENT_IMG:
            "https://raw.communitydragon.org/latest/game/assets/ux/cherry/augments/icons/",
    }
}
