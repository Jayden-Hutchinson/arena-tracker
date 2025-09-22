import "dotenv/config";
import express from "express";
import { API_ROUTES } from "./routes/apiRoutes.js";
import { APP_ROUTES } from "../../client/routes/app_routes.js";
import { ServerApi } from "./api/serverApi.js";

const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

app.get("/config", (req, res) => {
  res.json({ APP_ROUTES });
});

app.get(APP_ROUTES.ACCOUNT, async (req, res) => {
  const { username, tagLine } = req.query;
  if (!username || !tagLine) {
    return res.status(400).json({ error: "username and tagLine required" });
  }

  try {
    const encGameName = encodeURIComponent(username);
    const encTagLine = encodeURIComponent(tagLine);
    const url = `${API_ROUTES.RIOT.ACCOUNT_BY_NAME}${encGameName}/${encTagLine}`;
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

    const account = await response.json();
    res.json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.get(APP_ROUTES.MATCH_HISTORY, async (req, res) => {
  const { puuid } = req.query;
  if (!puuid) {
    return res.status(400).json({ error: "puuid required" });
  }
  const matchHistory = await ServerApi.fetchMatchHistoryByPuuid(puuid);
  console.log(matchHistory);
  res.json(matchHistory);
});

// app.get(APP_ROUTES.MATCH, async (req, res) => {
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
