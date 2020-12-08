const express = require("express");
const app = express();
const config = require("config");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
app.get("/gethello", (req, res) => {
  return res.send("HELLO WORLD");
});
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});
//Listining to PORT
const port = process.env.COVID_PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
