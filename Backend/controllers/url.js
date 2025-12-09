const shortid = require("shortid");
const URL = require("../models/url");
const User = require("../models/user"); 

async function handleGenerateShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    if (!req.user) return res.status(401).json({ error: "Auth required" }); 

    const shortID = shortid.generate();
    const newUrl = await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      clicks: [],
      createdBy: req.user._id
    });

    // Increment user count
    await User.findByIdAndUpdate(req.user._id, { $inc: { urlCount: 1 } });

    return res.json({ 
      shortUrl: `${req.get('host')}/url/${shortID}`, 
      shortId: shortID, 
      message: "URL shortened!" 
    }); 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId }).populate('createdBy', 'email'); 
    if (!result) return res.status(404).json({ error: "URL not found" });
    return res.json({ 
      totalClicks: result.clicks.length, 
      analytics: result.clicks 
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  handleGenerateShortURL,
  handleGetAnalytics,
};