const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics } = require("../controllers/url");
const { restrictTo, enforceFreeLimit } = require("../middlewares/auth"); // Add imports

const router = express.Router();

// POST /api/url/shorten
router.post("/shorten", restrictTo(["free", "pro"]), enforceFreeLimit, handleGenerateShortURL);

// GET /api/url/analytics/:shortId (restrict to owner?)
router.get("/analytics/:shortId", restrictTo(["free", "pro"]), handleGetAnalytics);

module.exports = router;