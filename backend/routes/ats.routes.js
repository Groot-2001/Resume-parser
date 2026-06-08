const express = require("express");
const { analyzeATS } = require("../controllers/ats.controller");
const router = express.Router();


router.post("/",analyzeATS);

module.exports = router;