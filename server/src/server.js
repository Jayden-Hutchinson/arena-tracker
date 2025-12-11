require("dotenv/config");

const { RiotApi } = require("./api/RiotApi");

const cors = require("cors");
const express = require("express");

/*
 ENV VARIABLES
*/
const SERVER_PORT = process.env.SERVER_PORT;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

/*
 SERVER URLS
*/
const SERVER_BASE_URL = "/arena-tracker/api";

/*
 ACCOUNT
*/
const ACCOUNT_BY_GAME_NAME_URL = `${SERVER_BASE_URL}/riot/account/by-riot-id/`;
const ACCOUNT_BY_PUUID_URL = `${SERVER_BASE_URL}/riot/account/by-puuid/`;

/*
 MATCHES
*/
const MATCHES_BY_PUUID_URL = `${SERVER_BASE_URL}/riot/account/matches/by-puuid`;
const MATCH_BY_ID_URL = `${SERVER_BASE_URL}/riot/match/`;

class Server {
  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    RiotApi.setApiKey(RIOT_API_KEY);

    this.initializeMiddlewear();
    this.initializeRoutes();
  }

  /**
   * Initialize middlewear for the server
   */
  initializeMiddlewear() {
    this.app.use(express.static("public"));
    this.app.use(cors());
  }

  /**
   * Creates the routes for the server
   */
  initializeRoutes() {
    this.app.get(`${SERVER_BASE_URL}/`, async (req, res) => {
      log(`GET ${SERVER_BASE_URL}/`);
      res.json({ message: "server running" });
    });

    this.app.get(ACCOUNT_BY_GAME_NAME_URL, async (req, res) => {
      log(`GET ${ACCOUNT_BY_GAME_NAME_URL}`);
      const { gameName, tagLine } = req.query;

      try {
        const url = RiotApi.getAccountByGameNameUrl(gameName, tagLine);
        const response = await RiotApi.fetch(url);
        return res.json(response);
      } catch (error) {
        log(`Error ${error}`);
      }
    });

    this.app.get(ACCOUNT_BY_PUUID_URL, async (req, res) => {
      log(`GET ${ACCOUNT_BY_PUUID_URL}`);
      const { puuid } = req.query;

      try {
        const url = RiotApi.getAccountByPuuidUrl(puuid);
        const response = await RiotApi.fetch(url);
        return res.json(response);
      } catch (error) {
        log(`Error ${error}`);
      }
    });

    this.app.get(MATCHES_BY_PUUID_URL, async (req, res) => {
      log(`GET ${MATCHES_BY_PUUID_URL}`);
      const ids = req.query;

      try {
        const url = RiotApi.getMatchesByPuuidUrl(ids);
        const response = await RiotApi.fetch(url);
        return res.json(response);
      } catch (error) {
        log(`Error ${error}`);
      }
    });

    this.app.get(MATCH_BY_ID_URL, async (req, res) => {
      log(`GET ${MATCH_BY_ID_URL}`);
      const { matchId } = req.query;

      try {
        const url = RiotApi.getMatchByIdUrl(matchId);
        console.log(url);
        const response = await RiotApi.fetch(url);
        return res.json(response);
      } catch (error) {
        log(`Error ${error}`);
      }
    });
  }

  listen() {
    this.app.listen(SERVER_PORT, () => {
      log(`running on http://localhost:${SERVER_PORT}`);
    });
  }
}

function log(string) {
  console.log(`[server]`, string);
}

module.exports = Server;
