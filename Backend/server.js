require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 
const { connectToMongoDB } = require("./connection");
// Routes
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const { checkforAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner-app") 
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("Mongo Error:", err));

// Middlewares
app.use(cors({ origin: "http://localhost:5174", credentials: true })); // For Vite + cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);

// API Routes
app.use("/api/user", userRoute);
app.use("/api/url", urlRoute);
app.use("/api", staticRoute); 

// Redirect route
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        clicks: {
          timestamp: Date.now(),
          userAgent: req.get("User-Agent")
        },
      },
    },
    { new: true }
  );
  if (!entry) return res.status(404).json({ error: "Short URL not found" });
  res.redirect(entry.redirectURL);
});

// AI route
const { summarizeAnalytics } = require("./utils/ai");
app.post("/api/ai/summary", restrictTo(["pro"]), async (req, res) => {
  try {
    const summary = await summarizeAnalytics(req.body.data);
    res.json({ insight: summary });
  } catch (err) {
    res.status(500).json({ error: "AI service unavailable" });
  }
});

app.listen(port, () => console.log(`Server started at PORT ${port}`));