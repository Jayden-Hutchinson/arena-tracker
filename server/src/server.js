import "dotenv/config";
import express from "express";

import { SERVER_ROUTES } from "../../src/api/routes/serverRoutes.js";
import { ServerApi } from "./api/serverApi.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(SERVER_ROUTES.ACCOUNT_BY_GAME_NAME(), async (req, res) => {
  const { gameName, tagLine } = req.query
  try {
    const accountJson = await RiotApi.fetchAccountByGameName(gameName, tagLine);
    res.json(accountJson);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(SERVER_ROUTES.SUMMONER_BY_PUUID(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const summonerJson = await RiotApi.fetchSummonerByPuuid(puuid);
    res.json(summonerJson);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(SERVER_ROUTES.MATCHES_BY_PUUID(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const response = await RiotApi.fetchMatchesByPuuid(puuid);
    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(SERVER_ROUTES.MATCH_BY_ID(), async (req, res) => {
  const { matchId } = req.query;
  try {
    const response = await RiotApi.fetchMatchById(matchId);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(SERVER_ROUTES.JSON_DATA(), async (req, res) => {
  const { item } = req.query;
  try {
    const itemJson = await ServerApi.fetchJsonData(item);
    res.json(itemJson);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
