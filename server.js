require("dotenv").config();
const express = require("express");
const app = require("./app"); // import routes from app.js

const PORT = process.env.PORT;
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_ACCOUNTS_BY_NAME = process.env.RIOT_ACCOUNTS_BY_NAME;
const RIOT_HISTORY_BY_PUUID = process.env.RIOT_HISTORY_BY_PUUID;
const RIOT_MATCH_BY_ID = process.env.RIOT_MATCH_BY_ID;

const ACCOUNT_ROUTE = "/account";
const MATCH_HISTORY_ROUTE = "/account/history";

app.get(ACCOUNT_ROUTE, async (req, res) => {
  const { username, tagline } = req.query;
  if (!username || !tagline) {
    return res.status(400).json({ error: "username and tagline required" });
  }

  try {
    const encodedUsername = encodeURIComponent(username);
    const encodedTagline = encodeURIComponent(tagline);
    const accountNameUrl = `${RIOT_ACCOUNTS_BY_NAME}${encodedUsername}/${encodedTagline}`;
    const response = await fetch(accountNameUrl, {
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

app.get(MATCH_HISTORY_ROUTE, async (req, res) => {
  const { puuid } = req.query;
  if (!puuid) {
    return res.status(400).json({ error: "username and tagline required" });
  }

  try {
    const matchHistoryUrl = `${RIOT_HISTORY_BY_PUUID}${puuid}/ids?start=0&count=30`;
    const response = await fetch(matchHistoryUrl, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "account fetch by name failed" });
    }

    const matchIdList = await response.json();
    res.json(matchIdList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.get("/match/data", async (req, res) => {
  const { matchId } = req.query;
  if (!matchId) {
    return res.status(400).json({ error: "no match id" });
  }

  try {
    const matchUrl = `${RIOT_MATCH_BY_ID}${matchId}`;
    console.log(matchUrl);
    const response = await fetch(matchUrl, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "account fetch by name failed" });
    }

    const matchData = await response.json();
    console.log(matchData);
    res.json(matchData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
