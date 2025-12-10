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
const URL = {
  /* ACCOUNT */
  ACCOUNT_BY_GAME_NAME: `${SERVER_BASE_URL}/riot/account/by-riot-id/`,
  ACCOUNT_BY_PUUID: `${SERVER_BASE_URL}/riot/account/by-puuid/`,
  /* MATCHES */
  MATCHES_BY_PUUID: `${SERVER_BASE_URL}/riot/account/matches/by-puuid`,
  MATCH_BY_ID: `${SERVER_BASE_URL}/riot/match/`,
};

class Server {
  constructor() {
    RiotApi.setApiKey(RIOT_API_KEY);

    this.port = SERVER_PORT;
    this.app = express();

    this.initializeMiddlewear();
    this.initializeRoutes();
  }

  initializeMiddlewear() {
    this.app.use(express.static("public"));
    this.app.use(cors());
  }

  initializeRoutes() {
    // Base url to check the server is running
    this.app.get(`${SERVER_BASE_URL}/`, this.handlePing);

    // Account by game name
    this.app.get(URL.ACCOUNT_BY_GAME_NAME, this.getAccountByGameName);

    // Account by puuid
    this.app.get(URL.ACCOUNT_BY_PUUID, this.getAccountByPuuid);

    // Matches by puuid
    this.app.get(URL.MATCHES_BY_PUUID, this.getMatchesByPuuid);

    // Match by id
    this.app.get(URL.MATCH_BY_ID, this.getMatchById);
  }

  async handlePing(req, res) {
    res.json({ message: "Server Hit" });
  }

  async getAccountByGameName(req, res) {
    const { gameName, tagLine } = req.query;

    try {
      const url = RiotApi.getAccountByGameNameUrl(gameName, tagLine);
      const response = await RiotApi.fetch(url);
      return res.json(response);
    } catch (error) {
      log(`Error ${error}`);
    }
  }

  async getAccountByPuuid(req, res) {
    const { puuid } = req.query;

    try {
      const url = RiotApi.getAccountByPuuidUrl(puuid);
      const response = await RiotApi.fetch(url);
      return res.json(response);
    } catch (error) {
      log(`Error ${error}`);
    }
  }

  async getMatchesByPuuid(req, res) {
    const ids = req.query;

    try {
      const url = RiotApi.getMatchesByPuuidUrl(ids);
      const response = await RiotApi.fetch(url);
      return res.json(response);
    } catch (error) {
      log(`Error ${error}`);
    }
  }

  async getMatchById(req, res) {
    const { matchId } = req.query;

    try {
      const url = RiotApi.getMatchByIdUrl(matchId);
      console.log(url);
      const response = await RiotApi.fetch(url);
      return res.json(response);
    } catch (error) {
      log(`Error ${error}`);
    }
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
