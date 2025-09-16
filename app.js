const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  //   res.send("Hello");
});

// app.get("/api/account", async (req, res) => {
//   res.send("Account");

//   const url = `${RIOT_AMERICAS_URL}/riot/account/v1/accounts/by-riot-id/TannerennaT/NA1`;
//   console.log(url);
//   const response = await fetch(url, {
//     headers: { "X-Riot-Token": RIOT_API_KEY },
//   });

//   const data = await response.json();
//   console.log(data);
// });

module.exports = app;
