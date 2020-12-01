const express = require("express");
const app = express();
const config = require("config");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

//Listining to PORT
const port = process.env.COVID_PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
