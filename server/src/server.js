import "dotenv/config";
import express from "express";

import { URL } from "../../src/api/routes/serverRoutes.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(URL.account(), async (req, res) => {
  const { gameName, tagLine } = req.query;
  try {
    const account = await RiotApi.fetchAccountByGameName(gameName, tagLine);
    return res.json(account);
  } catch (err) {
    console.log(err);
    return res.status(err.status).json(err.message);
  }
});

app.get(URL.summoner(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const summoner = await RiotApi.fetchSummonerByPuuid(puuid);
    return res.json(summoner);
  } catch (err) {
    console.log(err);
  }
});

app.get(URL.matches(), async (req, res) => {
  const puuid = req.query;
  const matches = await RiotApi.fetchMatchesByPuuid(puuid);
  return res.json(matches);
});

app.get(URL.match(), async (req, res) => {
  const { matchId } = req.query;
  try {
    const match = await RiotApi.fetchMatchById(matchId);
    res.json(match);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
