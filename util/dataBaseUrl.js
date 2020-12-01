const config = require("config");

const dataBase = config.get("DATABASE"); //process.env.COVID_DATABASE;
const password = config.get("MONGO_PASSWORD");
const connectionUrl = `mongodb+srv://CHARAN:${password}@cluster0.gpybh.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

module.exports = connectionUrl;
