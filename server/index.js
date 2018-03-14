// [LOAD PACKAGES]
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// [CONFIGURE SOCKET]
const server = require("http").createServer(app);
var socketio = require("./socket")(server);

// [CONFIGURE EXPRESS VIEW ENGINE]
const publicPath = path.resolve(__dirname,"../build");
//app.set("views", publicPath );

// [CONFIGURE EXPRESS BODYPARSER ENGINE]
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE ROUTER]
var router = require("./router")(app);

// [console]
console.log("sketch module start")

module.exports = app;