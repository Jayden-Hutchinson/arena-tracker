import "dotenv/config";
import express from "express";
import { SERVER_ROUTES } from "../../src/api/routes/serverRoutes.js";
import { ServerApi } from "./api/serverApi.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(SERVER_ROUTES.ACCOUNT_BY_GAME_NAME(), async (req, res) => {
  const accountJson = await RiotApi.fetchAccountByGameName(req.query);
  res.json(accountJson);
});

app.get(SERVER_ROUTES.SUMMONER_BY_PUUID(), async (req, res) => {
  const summonerJson = await RiotApi.fetchByPuuid("summonerByPuuid", req.query);
  res.json(summonerJson);
});

app.get(SERVER_ROUTES.MATCH_HISTORY_BY_PUUID(), async (req, res) => {
  const response = await RiotApi.fetchByPuuid("matchesByPuuid", req.query);
  res.send(response);
});

app.get(SERVER_ROUTES.MATCH_BY_ID(), async (req, res) => {
  const response = await RiotApi.fetchMatchById(req.query);
  res.json(response);
});

app.get(SERVER_ROUTES.JSON_DATA(), async (req, res) => {
  const { item } = req.query;
  if (!item) {
    return res.status(400).json({ error: "item required" });
  }
  const itemJson = await ServerApi.fetchJsonData(item);
  res.json(itemJson);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
