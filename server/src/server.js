require("dotenv/config");
const express = require("express");

const { RiotApi } = require("./api/riot/RiotApi");
const { PATH } = require("./routes");
const { RIOT_API_ROUTE } = require("./api/riot/RiotApiRoutes");

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const PORT = process.env.PORT;

async function fetchRiotApi(url, res) {
  const response = await RiotApi.fetch(RIOT_API_KEY, url);

  const data = await response.json();

  if (response.ok) {
    res.json(data);
  }

  res.status(response.status).json(data.status.message);
}

const app = express();
app.use(express.static("public"));

app.get(PATH.ACCOUNT, async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const url = RIOT_API_ROUTE.ACCOUNT_BY_GAME_NAME(gameName, tagLine);
    await fetchRiotApi(url, res);
    // const response = await RiotApi.fetch(RIOT_API_KEY, url);
    // console.log(response);
    // if (response.ok) {
    //   const data = await response.json();
    //   res.json(data);
    // }
    // res.status(response.status).end();
  } catch (err) {
    console.log(err);
  }
});

// app.get(PATH.ACCOUNT, async (req, res) => {});

app.get(PATH.SUMMONER, async (req, res) => {
  try {
    const { puuid } = req.query;
    const url = RIOT_API_ROUTE.SUMMONER_BY_PUUID(puuid);
    const response = await RiotApi.fetch(RIOT_API_KEY, url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.get(PATH.MATCH_HISTORY, async (req, res) => {
  try {
    const { puuid } = req.query;
    const url = RIOT_API_ROUTE.MATCHES_BY_PUUID(puuid);
    const response = await RiotApi.fetch(RIOT_API_KEY, url);
    const data = await response.json();
    res.json(data);
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

// app.get(PATH.ITEMS)
// app.get(PATH.AUGMENTS)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
