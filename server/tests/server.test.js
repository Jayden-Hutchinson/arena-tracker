const assert = require("node:assert");
const test = require("node:test");

test("server is running", async () => {
  const url = `${SERVER_BASE_URL}/`;
  const actual = await fetch(url).then((res) => res.json());

  assert.deepStrictEqual(actual, { message: "server running" });
});

test("user not found", async () => {});

test("fetch riot account", async () => {
  const gameName = "Ginger Comando";
  const tagLine = "na1";
  const url = `${SERVER_BASE_URL}/riot/account/by-riot-id/?gameName=${gameName}&tagLine=${tagLine}`;
  const account = await fetch(url).then((res) => res.json());

  const expected = {
    puuid:
      "ahcRExOrdrw3uPCUVsasRIUT2pPDIyUwoEUI7e2-iqtn9zO69zEt43N3cPJkvsPhNN80MQ106KzmOA",
    gameName: "Ginger Comando",
    tagLine: "NA1",
  };

  console.log(account);
  assert.deepStrictEqual(account, expected);
});
