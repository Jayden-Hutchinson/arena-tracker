import "dotenv/config";
import express from "express";

import { URL } from "../../src/routes/serverRoutes.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(URL.account(), async (req, res) => {
  const { gameName, tagLine } = req.query;
  const account = await RiotApi.fetchAccountByGameName(gameName, tagLine);
  return res.json(account);
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
  const { puuid } = req.query;
  try {
    const matches = await RiotApi.fetchMatchesByPuuid(puuid);
    return res.json(matches);
  } catch (err) {
    console.log(err);

    if (err.status && err.body) {
      return res.status(err.status).json(err.body);
    }

    return res
      .status(500)
      .json({ error: err.message || "ME: Internal Server Error" });
  }
});

app.get(URL.match(), async (req, res) => {
  const { matchId } = req.query;
  const matchData = await RiotApi.fetchMatchById(matchId);
  return res.json(matchData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
