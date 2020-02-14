const express = require("express");
const Actions = require("./actionModel");
const router = express.Router();

router.use(express.json());

module.exports = router;
