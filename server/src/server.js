import "dotenv/config";
import express from "express";
import { SERVER_ROUTES } from "./routes/serverRoutes.js";
import { URL } from "../../src/api/routes/clientRoutes.js";
import { ServerApi } from "./api/serverApi.js";

const app = express();

app.use(express.static("public"));

const PORT = 5000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

app.get("/config", (req, res) => {
  res.json({ URL });
});

app.get(URL.ACCOUNT_BY_GAME_NAME, async (req, res) => {
  const { gameName, tagLine } = req.query;
  if (!gameName || !tagLine) {
    return res.status(400).json({ error: "username and tagLine required" });
  }

  const accountJson = await ServerApi.fetchRiotAccountByName(gameName, tagLine);

  console.log(accountJson);
  res.json(accountJson);
});

app.get(URL.SUMMONER_BY_PUUID, async (req, res) => {
  const { puuid } = req.query;
  if (!puuid) {
    return res.status(400).json({ error: "puuid required" });
  }

  try {
    const encodedPuuid = encodeURIComponent(puuid);
    const url = `${SERVER_ROUTES.RIOT_API.SUMMONER_BY_PUUID}${encodedPuuid}`;
    console.log(url);
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "account fetch by name failed" });
    }

    const accountJson = await response.json();
    res.json(accountJson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.get(URL.MATCH_HISTORY_BY_PUUID, async (req, res) => {
  const { puuid } = req.query;
  if (!puuid) {
    return res.status(400).json({ error: "puuid required" });
  }
  const matchHistory = await ServerApi.fetchMatchHistoryByPuuid(puuid);
  res.json(matchHistory);
});

app.get(URL.JSON_DATA, async (req, res) => {
  const { item } = req.query;
  if (!item) {
    return res.status(400).json({ error: "item required" });
  }
  const itemJson = await ServerApi.fetchJsonData(item);
  res.json(itemJson);
});

// app.get(URL.MATCH, async (req, res) => {
//   const { matchId } = req.query;
//   if (!matchId) {
//     return res.status(400).json({ error: "no match id" });
//   }

//   try {
//     const matchUrl = `${API_ROUTES.RIOT.MATCH_BY_ID}${matchId}`;
//     console.log(matchUrl);
//     const response = await fetch(matchUrl, {
//       headers: {
//         "X-Riot-Token": RIOT_API_KEY,
//       },
//     });

//     if (!response.ok) {
//       return res
//         .status(response.status)
//         .json({ error: "account fetch by name failed" });
//     }

//     const matchData = await response.json();
//     res.json(matchData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "server error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
