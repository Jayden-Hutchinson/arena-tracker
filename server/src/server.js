require("dotenv/config");
const express = require("express");

const { URL } = require("../../client/src/routes/serverRoutes");
const { RiotApi } = require("./api/riot/RiotApi");
const { PATH } = require("./routes");
const { RIOT_API_ROUTE } = require("./api/riot/RiotApiRoutes");
const { RIOT_API_CONFIG } = require("./api/riot/RiotApiConfig");

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const PORT = process.env.PORT;

async function fetchRiotApi(url) {
  const response = RiotApi.fetch(RIOT_API_KEY, url);
  console.log("Fetch RiotApi", url, response);
  return response;
}

const app = express();
app.use(express.static("public"));

app.get(PATH.ACCOUNT, async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const url = RIOT_API_ROUTE.ACCOUNT.BY_GAME_NAME(gameName, tagLine);
    const response = await fetchRiotApi(url);
    console.log(response);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
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
  } catch (err) {}
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
