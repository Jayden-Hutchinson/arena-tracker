import "dotenv/config";
import express from "express";

import { URL } from "../../client/src/routes/serverRoutes.js";
import { RiotApi } from "./api/riot/RiotApi.js";
import { PATH } from "./routes.js"

const app = express();


app.use(express.static("public"));

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const PORT = process.env.PORT;

function fetchRiotApi(url) {

}

app.get(URL.account(), async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const response = await RiotApi.fetchAccountByGameName(gameName, tagLine);

    const data = await response.json();
    res.json(data);
  } catch (err) { }
});

app.get(PATH.SUMMONER, async (req, res) => {
  try {
    const { puuid } = req.query;
    const response = await RiotApi.fetchSummonerByPuuid(puuid);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

app.get(PATH.MATCH_HISTORY, async (req, res) => {
  try {
    const { puuid } = req.query;
    const response = await RiotApi.fetchMatchesByPuuid(puuid);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(err.status).json(err);
  }
});

app.get(PATH.MATCH, async (req, res) => {
  try {
    const { matchId } = req.query;
    const response = await RiotApi.fetchMatchById(matchId);
    res.json(response);
  } catch (err) { }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
