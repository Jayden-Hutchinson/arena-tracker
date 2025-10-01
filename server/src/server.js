import "dotenv/config";
import express from "express";

import { URL } from "../../src/api/routes/serverRoutes.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(URL.account(), async (req, res) => {
  const { gameName, tagLine } = req.query
  try {
    const accountJson = await RiotApi.fetchAccountByGameName(gameName, tagLine);
    res.json(accountJson);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(URL.summoner(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const summonerJson = await RiotApi.fetchSummonerByPuuid(puuid);
    res.json(summonerJson);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(URL.matches(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const response = await RiotApi.fetchMatchesByPuuid(puuid);
    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
});

app.get(URL.match(), async (req, res) => {
  const { matchId } = req.query;
  try {
    const response = await RiotApi.fetchMatchById(matchId);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
