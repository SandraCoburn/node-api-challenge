const express = require("express");
const server = express();
const projectRouter = require("./data/helpers/projectRouter");
const actionsRouter = require("./data/helpers/actionsRouter");

//routes - endpoint
server.use("/api/projects", projectRouter);
server.use("api/actions", actionsRouter);

//Global middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Projects and Actions</h2>`);
});

module.exports = server;
