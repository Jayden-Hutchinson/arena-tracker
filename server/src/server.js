import "dotenv/config";
import express from "express";

import { URL } from "../../src/routes/serverRoutes.js";
import { RiotApi } from "./api/RiotApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;

app.get(URL.account(), async (req, res) => {
  const { gameName, tagLine } = req.query;
  const response = await RiotApi.fetchAccountByGameName(gameName, tagLine);

  if (!response.ok) {
    console.log(response);
    throw new Error();
  }

  const data = await response.json();
  return res.json(data);
});

app.get(URL.summoner(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const response = await RiotApi.fetchSummonerByPuuid(puuid);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
});
// if (!res.ok) {
//   let body;
//   try {
//     body = await res.json();
//   } catch {
//     body = { message: res.statusText };
//   }
//   const err = new Error(res.statusText);
//   err.status = res.status;
//   err.body = body;
//   throw err;
// }

app.get(URL.matches(), async (req, res) => {
  const { puuid } = req.query;
  try {
    const response = await RiotApi.fetchMatchesByPuuid(puuid);
    return res.json(response);
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
  const response = await RiotApi.fetchMatchById(matchId);
  const data = await response.json();
  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
