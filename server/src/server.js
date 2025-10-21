import "dotenv/config";
import express from "express";

import { URL } from "../../src/routes/serverRoutes.js";
import { RiotApi } from "./api/RiotApi.js";
// while (true) {
//   if (!response.ok) {
//     switch (response.status) {
//       case 429:
//         const retryAfter = parseInt(
//           response.headers.get("retry-after") || "1",
//           BASE_TEN
//         );
//         console.warn(`Rate limited — retrying after ${retryAfter}s...`);
//         await this.sleep(retryAfter);
//         continue; // retry

//       case 401:
//         console.log(response.status, response.statusText);
//         break;
//     }
//   }

//   return response;
// }

const app = express();

app.use(express.static("public"));

const PORT = 5000;

async function sleep(seconds) {
  for (let i = seconds; i > 0; i--) {
    console.log(`Retrying in ${i}s...`);
    await new Promise((res) => setTimeout(res, 1000));
  }
}

const handleRequest = (fetchHandler, getArgs) => async (req, res) => {
  try {
    console.log("HANDLE REQUEST")
    const args = getArgs(req);
    const response = await fetchHandler(...args)
    console.log(response)
    res.json(response)

  } catch (err) {
    console.log("Server:", err)
  }
}

app.get(URL.account(), handleRequest(
  RiotApi.fetchAccountByGameName,
  req => [req.query.gameName, req.query.tagLine])
)

// app.get(URL.account(), async (req, res) => {
//   try {
//     const { gameName, tagLine } = req.query;
//     const response = await RiotApi.fetchAccountByGameName(gameName, tagLine);

//     const data = await response.json();
//     res.json(data);
//   } catch (err) { }
// });

app.get(URL.summoner(), async (req, res) => {
  try {
    const { puuid } = req.query;
    const response = await RiotApi.fetchSummonerByPuuid(puuid);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

app.get(URL.matches(), async (req, res) => {
  try {
    const { puuid } = req.query;
    const response = await RiotApi.fetchMatchesByPuuid(puuid);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(err.status).json(err);
  }
});

app.get(URL.match(), async (req, res) => {
  try {
    const { matchId } = req.query;
    const response = await RiotApi.fetchMatchById(matchId);
    res.json(response);
  } catch (err) { }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
