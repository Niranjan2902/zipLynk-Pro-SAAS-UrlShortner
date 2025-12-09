const { getUser } = require("../service/auth");

function checkforAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restricTo(roles) { 
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ error: "Login required" }); // JSON
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Unauthorized Access" });
    return next();
  };
}

// New: For free tier limit
function enforceFreeLimit(req, res, next) {
  if (req.user.role === "free" && req.user.urlCount >= 5) {
    return res.status(403).json({ error: "Free limit reached (5 URLs). Upgrade to Pro!" });
  }
  next();
}

module.exports = {
  checkforAuthentication,
  restrictTo: restricTo, 
  enforceFreeLimit,
};