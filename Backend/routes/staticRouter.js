const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// API: GET /api/dashboard → user data + URLs + stats
router.get("/dashboard", restrictTo(["free", "pro"]), async (req, res) => {
  try {
    const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    const stats = {
      totalUrls: allUrls.length,
      totalClicks: allUrls.reduce((sum, url) => sum + url.clicks.length, 0)
    };

    return res.json({
      email: req.user.email,
      userRole: req.user.role || "free",
      urlCount: allUrls.length, 
      urls: allUrls,
      stats
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// API: GET /api/admin/urls → all URLs (pro only)
router.get("/admin/urls", restrictTo(["pro"]), async (req, res) => {
  try {
    const allUrls = await URL.find({}).sort({ createdAt: -1 });
    return res.json({ urls: allUrls });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;